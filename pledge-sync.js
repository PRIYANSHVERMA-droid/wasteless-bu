/**
 * WasteLess BU — Real-Time Cross-Device Campus Pledge Synchronizer
 * Connects mobile devices across campus over Secure WebSockets (MQTT-over-WSS)
 * Enables instant counter increment, real-time live ledger updates, and retained snapshots.
 */
(function (global) {
  "use strict";

  const PRIMARY_BROKER = "wss://broker.emqx.io:8084/mqtt";
  const BACKUP_BROKER = "wss://broker.hivemq.com:8884/mqtt";
  const TOPIC_EVENTS = "wasteless_bu_bennett_v2/events";
  const TOPIC_SNAPSHOT = "wasteless_bu_bennett_v2/snapshot";
  const STORAGE_KEY = "wasteless_bu_state_v5";

  // Generate unique client ID for this browser tab/device
  const CLIENT_ID = "bu_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);

  let mqttClient = null;
  let connectionState = "connecting"; // "connected" | "connecting" | "offline"
  let usingBackup = false;
  let reconnectTimer = null;
  let hasReceivedSnapshot = false;

  const statusCallbacks = [];
  const newPledgeCallbacks = [];
  const snapshotCallbacks = [];

  function setStatus(st, msg) {
    connectionState = st;
    statusCallbacks.forEach((cb) => {
      try { cb(st, msg); } catch (e) { console.warn("[Sync] status callback error:", e); }
    });
  }

  function getStoredState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveStoredState(st) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    } catch {}
  }

  function connect() {
    if (typeof global.mqtt !== "object" || typeof global.mqtt.connect !== "function") {
      console.warn("[Sync] MQTT library not available. Falling back to local offline mode.");
      setStatus("offline", "Offline mode");
      return;
    }

    const brokerUrl = usingBackup ? BACKUP_BROKER : PRIMARY_BROKER;
    setStatus("connecting", usingBackup ? "Connecting to backup relay..." : "Connecting to campus network...");

    try {
      mqttClient = global.mqtt.connect(brokerUrl, {
        clientId: CLIENT_ID,
        clean: true,
        connectTimeout: 7000,
        reconnectPeriod: 4000,
        keepalive: 45
      });

      mqttClient.on("connect", () => {
        setStatus("connected", "Live Sync Active");
        console.log(`[Sync] Connected to ${usingBackup ? "backup" : "primary"} broker as ${CLIENT_ID}`);

        // Subscribe to real-time events and retained snapshot
        mqttClient.subscribe([TOPIC_EVENTS, TOPIC_SNAPSHOT], { qos: 1 }, (err) => {
          if (err) console.warn("[Sync] Subscription error:", err);
        });

        // Announce presence or check if we should push any unsynced local real pledges
        syncLocalPledgesToNetwork();
      });

      mqttClient.on("message", (topic, payload) => {
        try {
          const data = JSON.parse(payload.toString());
          if (topic === TOPIC_EVENTS) {
            handleEventMessage(data);
          } else if (topic === TOPIC_SNAPSHOT) {
            handleSnapshotMessage(data);
          }
        } catch (err) {
          console.warn("[Sync] Message parse error:", err);
        }
      });

      mqttClient.on("error", (err) => {
        console.warn("[Sync] Broker connection error:", err && err.message);
        if (!usingBackup) {
          console.log("[Sync] Switching to backup broker...");
          usingBackup = true;
          try { mqttClient.end(true); } catch {}
          connect();
        } else {
          setStatus("offline", "Local mode (reconnecting...)");
        }
      });

      mqttClient.on("offline", () => {
        setStatus("offline", "Reconnecting...");
      });

      mqttClient.on("close", () => {
        if (connectionState === "connected") setStatus("offline", "Disconnected");
      });

    } catch (e) {
      console.warn("[Sync] Failed to initialize MQTT client:", e);
      setStatus("offline", "Offline mode");
    }
  }

  function handleEventMessage(data) {
    if (!data || data.type !== "NEW_PLEDGE" || !data.pledge) return;
    const isRemote = data.senderId !== CLIENT_ID;
    const pledge = data.pledge;

    // Notify listeners so UI updates in real time
    newPledgeCallbacks.forEach((cb) => {
      try { cb(pledge, isRemote); } catch (e) { console.warn("[Sync] newPledge callback error:", e); }
    });
  }

  function handleSnapshotMessage(data) {
    if (!data || !Array.isArray(data.pledges)) return;
    hasReceivedSnapshot = true;
    snapshotCallbacks.forEach((cb) => {
      try { cb(data); } catch (e) { console.warn("[Sync] snapshot callback error:", e); }
    });
  }

  function syncLocalPledgesToNetwork() {
    const local = getStoredState();
    if (!local || !Array.isArray(local.pledges)) return;
    const realLocal = local.pledges.filter((p) => !p.isTemplate);
    if (!realLocal.length) return;

    // If we have real pledges locally, ensure network snapshot knows about them after a brief delay
    setTimeout(() => {
      if (!mqttClient || !mqttClient.connected) return;
      publishSnapshot(realLocal);
    }, 1200);
  }

  function publishSnapshot(pledgesList) {
    if (!mqttClient || !mqttClient.connected) return;
    try {
      const snapshot = {
        baseCount: 60,
        pledges: pledgesList,
        updatedAt: Date.now(),
        updatedBy: CLIENT_ID
      };
      mqttClient.publish(TOPIC_SNAPSHOT, JSON.stringify(snapshot), { retain: true, qos: 1 });
    } catch (e) {
      console.warn("[Sync] Failed to publish snapshot:", e);
    }
  }

  /**
   * Public API
   */
  const WasteLessSync = {
    clientId: CLIENT_ID,

    init: function () {
      connect();

      // Mobile lifecycle helpers: wake up connection when phone is unlocked or screen turned back on
      if (typeof window !== "undefined") {
        window.addEventListener("online", () => {
          if (!mqttClient || !mqttClient.connected) connect();
        });
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible" && (!mqttClient || !mqttClient.connected)) {
            connect();
          }
        });
      }
      return this;
    },

    getStatus: function () {
      return connectionState;
    },

    onStatusChange: function (fn) {
      if (typeof fn === "function") {
        statusCallbacks.push(fn);
        fn(connectionState);
      }
      return this;
    },

    onNewPledge: function (fn) {
      if (typeof fn === "function") newPledgeCallbacks.push(fn);
      return this;
    },

    onSnapshot: function (fn) {
      if (typeof fn === "function") snapshotCallbacks.push(fn);
      return this;
    },

    broadcastPledge: function (pledge, allCurrentPledges) {
      // Ensure pledge has unique id
      if (!pledge.id) {
        pledge.id = "p_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
      }

      // 1. Broadcast event immediately to all active devices
      if (mqttClient && mqttClient.connected) {
        try {
          mqttClient.publish(TOPIC_EVENTS, JSON.stringify({
            type: "NEW_PLEDGE",
            pledge: pledge,
            senderId: CLIENT_ID
          }), { qos: 1 });
        } catch (e) {
          console.warn("[Sync] Error broadcasting pledge event:", e);
        }

        // 2. Publish updated retained snapshot for future visitors
        if (Array.isArray(allCurrentPledges)) {
          publishSnapshot(allCurrentPledges);
        }
      }
      return pledge;
    }
  };

  global.WasteLessSync = WasteLessSync;
})(typeof window !== "undefined" ? window : global);
