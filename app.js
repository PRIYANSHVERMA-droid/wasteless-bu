/* WasteLess BU — Complete Interactive Web App, Dashboard, Live Survey, Tally Clicker & QR Workbench */

(function () {
  "use strict";

  const STORAGE_KEY = "wasteless_bu_state_v4";
  const LIVE_PLEDGE_URL = "https://priyanshverma-droid.github.io/wasteless-bu/pledge.html";
  const LIVE_GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScOoRConX5wNlVfREDtCTBRBOau9e4KdhgqO_7IbWvxtvu-oQ/viewform";

  const BUILTIN_FIELD_PHOTOS = [
    {
      dataUrl: "photos/field-7-dining-hall-overview.jpg",
      tag: "Dining Hall Scale",
      pos: "50% 62%",
      caption: "Bennett University Main Student Dining Hall during peak weekday lunch showing high seating volume and serving queue (student faces blurred per BU100 privacy protocol).",
      builtin: true
    },
    {
      dataUrl: "photos/field-1-serving-counter.jpg",
      tag: "Serving Line",
      caption: "Main Mess buffet serving counter: fixed large ladles and rice/gravy spillage during peak lunch service.",
      builtin: true
    },
    {
      dataUrl: "photos/field-2-tray-comparison.jpg",
      tag: "Day 1: Paneer Menu",
      caption: "Side-by-side student trays showing full initial lunch portions vs. unfinished paneer curry and roti.",
      builtin: true
    },
    {
      dataUrl: "photos/field-6-rajma-trays.jpg",
      tag: "Day 2: Rajma Menu",
      caption: "Three post-lunch trays on a second weekday menu (rajma-chawal, roti & curd), confirming recurring edible leftovers across different menus.",
      builtin: true
    },
    {
      dataUrl: "photos/field-3-plate-leftovers.jpg",
      tag: "Eligible Plate Waste",
      caption: "Close-up of avoidable edible plate waste left behind: unfinished rice, paneer gravy, and half a roti.",
      builtin: true
    },
    {
      dataUrl: "photos/field-4-dish-drop-trays.jpg",
      tag: "Dish-Drop Audit",
      caption: "Dish-drop return trays with uneaten food and paper tissues — demonstrating why non-food tissues are excluded in our protocol.",
      builtin: true
    },
    {
      dataUrl: "photos/field-5-existing-signage-gap.jpg",
      tag: "Signage Gap Insight",
      pos: "50% 18%",
      caption: "Returned trays piled with leftovers directly beneath an existing generic 'Please Don't Waste Food' sign — proving passive dish-drop reminders fail.",
      builtin: true
    }
  ];

  const DEFAULT_TEAM = [
    { num: 1, role: "Project Coordinator", member: "[Student 1 Name]", proof: "Coordinates meetings, 15-day sprint timeline, approvals, and final deliverable integration.", comp: "Leadership" },
    { num: 2, role: "Research & SDG Lead", member: "[Student 2 Name]", proof: "Maps SDG 12/11/13 targets, frames problem scope, and embeds 4 BU100 reading concepts.", comp: "Critical Thinking" },
    { num: 3, role: "Survey & Interview Lead", member: "[Student 3 Name]", proof: "Builds anonymous Google Form (Q1–Q8), drives 50–100 responses, and runs staff interviews.", comp: "Communication" },
    { num: 4, role: "Field Observation Lead", member: "[Student 4 Name]", proof: "Leads 3 baseline & 3 post-pilot observations, timestamped notes, and authorised weighing/tally.", comp: "Research" },
    { num: 5, role: "Data Analysis Lead", member: "[Student 5 Name]", proof: "Cleans survey datasets, computes normalised baseline vs. post-pilot metrics, charts & limitations.", comp: "Analytical Thinking" },
    { num: 6, role: "Creative & Campaign Lead", member: "[Student 6 Name]", proof: "Designs 4 awareness posters, table-top portion nudges, QR cards, and 8-page dossier layouts.", comp: "Creativity" },
    { num: 7, role: "Technology Lead", member: "[Student 7 Name]", proof: "Builds responsive WasteLess BU website (HTML/CSS/JS), offline QR pledge & live dashboard.", comp: "Digital Literacy" },
    { num: 8, role: "Implementation & Impact Lead", member: "[Student 8 Name]", proof: "Executes live pilot rollout, logs QR/pledge engagement, manages Twist Adaptation & evaluation.", comp: "Adaptability" }
  ];

  const DEFAULT_STATE = {
    mode: "template", // "template" | "verified"
    protocol: "weight", // "weight" | "tally"
    venueName: "Main Student Dining Hall / Mess",
    qrUrl: LIVE_PLEDGE_URL,
    pledgePageUrl: LIVE_PLEDGE_URL,
    googleFormUrl: LIVE_GOOGLE_FORM_URL,
    qrPreset: "pledge", // "pledge" | "survey"
    sessions: [
      { phase: "baseline", label: "Baseline 1", dateMeal: "Day 3 — Mon Lunch (12:30–14:30)", meals: 320, grossKg: 31.36, tareKg: 3.2, tallyPlates: 118 },
      { phase: "baseline", label: "Baseline 2", dateMeal: "Day 4 — Tue Lunch (12:30–14:30)", meals: 340, grossKg: 34.48, tareKg: 3.2, tallyPlates: 131 },
      { phase: "baseline", label: "Baseline 3", dateMeal: "Day 5 — Wed Lunch (12:30–14:30)", meals: 320, grossKg: 30.08, tareKg: 3.2, tallyPlates: 112 },
      { phase: "post", label: "Post-Pilot 1", dateMeal: "Day 11 — Mon Lunch (12:30–14:30)", meals: 325, grossKg: 27.9, tareKg: 3.2, tallyPlates: 96 },
      { phase: "post", label: "Post-Pilot 2", dateMeal: "Day 12 — Tue Lunch (12:30–14:30)", meals: 340, grossKg: 27.68, tareKg: 3.2, tallyPlates: 94 },
      { phase: "post", label: "Post-Pilot 3", dateMeal: "Day 13 — Wed Lunch (12:30–14:30)", meals: 325, grossKg: 25.3, tareKg: 3.2, tallyPlates: 87 }
    ],
    survey: {
      n: 122,
      verifiedSurvey: true,
      likertMean: 4.21,
      q1: { daily: 34, threeFour: 44, weekly: 12, rarely: 32 },
      q3: { portion: 23, taste: 55, rush: 15, appetite: 22, other: 7 },
      q2Pct: 75.4,
      q4Pct: 71.3,
      q6Pct: 65.6,
      q6MaybePct: 29.5,
      q7Pct: 32.0,
      q7MaybePct: 59.8,
      q8Quotes: [
        { title: "Tasting unfamiliar dishes first (10+ mentions)", text: "“Tasting samples for unfamiliar items so it is easy to decide whether to take that dish or not.”" },
        { title: "Consistent taste & seasoning (14+ mentions)", text: "“Consistent taste in curries and rice, better seasoning, warm food, and better quality chapatis and dal.”" },
        { title: "Visible daily menu & spice labels (8+ mentions)", text: "“Visible daily menu with ingredients and clear labeling of spicy or unfamiliar dishes before entering the line.”" },
        { title: "Smaller scoops & shorter refill lines (10+ mentions)", text: "“Serve smaller scoops initially, smaller serving spoons, and shorter refill lines so students don’t overfill plates.”" }
      ]
    },
    staffQuotes: [
      { quote: "“Rice, dal, and unfamiliar seasonal sabzis generate the heaviest leftovers during the 1:00 PM lecture rush.”", tag: "— Serving Counter Prompt 1 & 2" },
      { quote: "“Very few students ask for half-servings unless counters actively offer smaller initial scoops with easy refills.”", tag: "— Portion Request Prompt 3" },
      { quote: "“Standard serving ladles speed up peak queues, so table reminders and quick verbal prompts work better than slowing lines.”", tag: "— Operational Barrier Prompt 4 & 5" }
    ],
    pledgeBaseCount: 60,
    offlinePledges: 0,
    pledges: [
      { name: "Aarav S.", cohort: "B.Tech CSE • C-Block", commitments: ["Start with smaller initial portions and refill only if hungry"], ts: "Template log", isTemplate: true },
      { name: "Ananya M.", cohort: "BBA • B-Block", commitments: ["Try a small spoonful of unfamiliar menu items first"], ts: "Template log", isTemplate: true },
      { name: "Anonymous", cohort: "B.Tech AI • D-Block", commitments: ["Match portion size to available time before classes"], ts: "Template log", isTemplate: true },
      { name: "Rohan K.", cohort: "BAJMC • A-Block", commitments: ["Start with smaller initial portions and refill only if hungry"], ts: "Template log", isTemplate: true }
    ],
    fieldPhotos: BUILTIN_FIELD_PHOTOS,
    team: DEFAULT_TEAM
  };

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function defaultPledgeUrl() {
    if (window.location && /^https?:\/\//i.test(window.location.href)) {
      const base = window.location.href.replace(/[#?].*$/, "").replace(/[^/]*$/, "");
      return base + "pledge.html";
    }
    return LIVE_PLEDGE_URL;
  }

  function loadState() {
    const base = clone(DEFAULT_STATE);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const parsed = JSON.parse(raw);
      const merged = Object.assign(base, parsed);
      merged.survey = Object.assign(clone(DEFAULT_STATE.survey), parsed.survey || {});
      if (!Array.isArray(merged.survey.q8Quotes) || !merged.survey.q8Quotes.length) {
        merged.survey.q8Quotes = clone(DEFAULT_STATE.survey.q8Quotes);
      }
      if (!Array.isArray(merged.staffQuotes) || !merged.staffQuotes.length) {
        merged.staffQuotes = clone(DEFAULT_STATE.staffQuotes);
      }
      if (!Array.isArray(merged.team) || merged.team.length !== 8) {
        merged.team = clone(DEFAULT_TEAM);
      }
      if (!Array.isArray(merged.fieldPhotos) || !merged.fieldPhotos.length) {
        merged.fieldPhotos = clone(BUILTIN_FIELD_PHOTOS);
      } else {
        // Keep user-uploaded custom photos while refreshing the 7 verified campus field photos in canonical order
        const customPhotos = merged.fieldPhotos.filter((p) => !p.builtin);
        merged.fieldPhotos = [...clone(BUILTIN_FIELD_PHOTOS), ...customPhotos];
      }
      if (!merged.googleFormUrl) merged.googleFormUrl = LIVE_GOOGLE_FORM_URL;
      if (!merged.pledgePageUrl || merged.pledgePageUrl.includes("wasteless-bu.github.io")) {
        merged.pledgePageUrl = LIVE_PLEDGE_URL;
      }
      if (!merged.qrUrl || merged.qrUrl.includes("wasteless-bu.github.io")) {
        merged.qrUrl = LIVE_PLEDGE_URL;
        merged.qrPreset = "pledge";
      }
      return merged;
    } catch {
      return base;
    }
  }

  let state = loadState();
  let lastSignedPledge = null;
  let toastTimer = null;

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch {
      showToast("Browser storage is full — try removing a large photo or exporting a JSON backup.");
      return false;
    }
  }

  /* ---------- Toast & Tooltips ---------- */
  function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.hidden = true;
    }, 3400);
  }

  function setupChartTooltips() {
    const tip = document.getElementById("chart-tooltip");
    if (!tip) return;
    document.addEventListener("mousemove", (e) => {
      const hit = e.target.closest ? e.target.closest("[data-tip]") : null;
      if (!hit) {
        tip.hidden = true;
        return;
      }
      tip.textContent = hit.getAttribute("data-tip");
      tip.hidden = false;
      const pad = 14;
      let left = e.clientX + pad;
      let top = e.clientY - 38;
      if (left + 260 > window.innerWidth) left = e.clientX - 260 - pad;
      if (top < 8) top = e.clientY + pad;
      tip.style.left = `${Math.max(8, left)}px`;
      tip.style.top = `${Math.max(8, top)}px`;
    });
    document.addEventListener("scroll", () => {
      tip.hidden = true;
    }, { passive: true });
  }

  /* ---------- Core Calculations ---------- */
  function sessionNetKg(s) {
    return Math.max(0, Number((s.grossKg - s.tareKg).toFixed(2)));
  }

  function sessionGramsPerMeal(s) {
    if (!s.meals || s.meals <= 0) return 0;
    return (sessionNetKg(s) * 1000) / s.meals;
  }

  function sessionTallyPct(s) {
    if (!s.meals || s.meals <= 0) return 0;
    return (s.tallyPlates / s.meals) * 100;
  }

  function computeSummary() {
    const base = state.sessions.filter((s) => s.phase === "baseline");
    const post = state.sessions.filter((s) => s.phase === "post");

    const baseMeals = base.reduce((a, b) => a + b.meals, 0);
    const postMeals = post.reduce((a, b) => a + b.meals, 0);
    const baseKg = base.reduce((a, b) => a + sessionNetKg(b), 0);
    const postKg = post.reduce((a, b) => a + sessionNetKg(b), 0);

    const baseGpm = base.length ? base.reduce((a, b) => a + sessionGramsPerMeal(b), 0) / base.length : 0;
    const postGpm = post.length ? post.reduce((a, b) => a + sessionGramsPerMeal(b), 0) / post.length : 0;

    const baseTally = base.length ? base.reduce((a, b) => a + sessionTallyPct(b), 0) / base.length : 0;
    const postTally = post.length ? post.reduce((a, b) => a + sessionTallyPct(b), 0) / post.length : 0;

    const isTally = state.protocol === "tally";
    const bAvg = isTally ? baseTally : baseGpm;
    const pAvg = isTally ? postTally : postGpm;
    const pctReduction = bAvg > 0 ? ((bAvg - pAvg) / bAvg) * 100 : 0;

    const baseSeed = state.mode === "template" ? Number(state.pledgeBaseCount || 0) : 0;
    const totalPledges = baseSeed + Number(state.offlinePledges || 0) + state.pledges.length;

    return {
      base, post, baseMeals, postMeals, baseKg, postKg,
      baseGpm, postGpm, baseTally, postTally, bAvg, pAvg, pctReduction, totalPledges
    };
  }

  /* ---------- Pure-JS Offline QR SVG & Direct-Canvas PNG (Zero Taint on file://) ---------- */
  function createQrMatrix(text) {
    if (typeof window.qrcode !== "function") return null;
    const qr = window.qrcode(0, "M");
    qr.addData(text || defaultPledgeUrl());
    qr.make();
    return qr;
  }

  function buildQrSvg(text, fgColor) {
    const qr = createQrMatrix(text);
    if (!qr) {
      return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#fff"/><text x="50" y="54" text-anchor="middle" font-size="10">QR</text></svg>';
    }
    const count = qr.getModuleCount();
    const pad = 2;
    const size = count + pad * 2;
    let paths = "";
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) paths += `M${c + pad},${r + pad}h1v1h-1z`;
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#FFFFFF"/><path d="${paths}" fill="${fgColor || "#14452F"}"/></svg>`;
  }

  function downloadQrPng(url) {
    const qr = createQrMatrix(url);
    if (!qr) {
      showToast("QR generator library not loaded.");
      return;
    }
    const count = qr.getModuleCount();
    const pad = 3;
    const totalModules = count + pad * 2;
    const scale = Math.max(16, Math.floor(860 / totalModules));
    const px = totalModules * scale;

    const canvas = document.createElement("canvas");
    canvas.width = px;
    canvas.height = px + 90;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#14452F";
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect((c + pad) * scale, (r + pad) * scale, scale, scale);
        }
      }
    }

    ctx.fillStyle = "#14452F";
    ctx.font = "700 28px Cambria, Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("WasteLess BU — Take What You Need. Eat What You Take.", canvas.width / 2, px + 36);
    ctx.fillStyle = "#4B5E54";
    ctx.font = "600 18px Segoe UI, sans-serif";
    ctx.fillText(url.length > 62 ? url.slice(0, 59) + "..." : url, canvas.width / 2, px + 68);

    const a = document.createElement("a");
    a.download = "WasteLess_BU_QR.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
    showToast("Downloaded high-res printable QR PNG.");
  }

  function renderQrCodes() {
    const svg = buildQrSvg(state.qrUrl, "#14452F");
    const heroQr = document.getElementById("hero-qr");
    const pledgeQr = document.getElementById("pledge-qr");
    if (heroQr) heroQr.innerHTML = svg;
    if (pledgeQr) pledgeQr.innerHTML = svg;
    const input = document.getElementById("qr-url-input");
    if (input && document.activeElement !== input) input.value = state.qrUrl;

    const isSurveyPreset = state.qrPreset === "survey";
    const pBtn = document.getElementById("qr-preset-pledge");
    const sBtn = document.getElementById("qr-preset-survey");
    if (pBtn) pBtn.classList.toggle("active", !isSurveyPreset);
    if (sBtn) sBtn.classList.toggle("active", isSurveyPreset);

    const heroTitle = document.getElementById("hero-qr-title");
    const heroDesc = document.getElementById("hero-qr-desc");
    const cardCap = document.getElementById("qr-card-caption");
    if (isSurveyPreset && state.googleFormUrl) {
      if (heroTitle) heroTitle.textContent = "QR-Linked Student Survey";
      if (heroDesc) heroDesc.innerHTML = 'Scan to open the 45-second anonymous survey or <a href="pledge.html" style="font-weight:700;">open Pledge Page</a>.';
      if (cardCap) cardCap.textContent = "Scan to open the anonymous 8-question WasteLess BU survey.";
    } else {
      if (heroTitle) heroTitle.textContent = "QR-Linked Interactive Pledge";
      if (heroDesc) heroDesc.innerHTML = 'Scan at the dining counter or <a href="pledge.html" style="font-weight:700;">open the interactive Pledge Page</a>.';
      if (cardCap) cardCap.textContent = "Scan to sign the 20-second interactive WasteLess BU pledge & get your badge.";
    }
  }

  /* ---------- Interactive SVG Charts (with Hover Tooltips) ---------- */
  function renderWasteComparisonChart(sum) {
    const el = document.getElementById("chart-waste-compare");
    if (!el) return;
    const isTally = state.protocol === "tally";
    const unit = isTally ? "%" : " g";

    const groups = [0, 1, 2].map((i) => {
      const bs = sum.base[i];
      const ps = sum.post[i];
      const bVal = bs ? (isTally ? sessionTallyPct(bs) : sessionGramsPerMeal(bs)) : 0;
      const pVal = ps ? (isTally ? sessionTallyPct(ps) : sessionGramsPerMeal(ps)) : 0;
      return {
        label: `Session ${i + 1}`,
        b: bVal,
        p: pVal,
        bTip: bs ? `${bs.label} (${bs.dateMeal}): ${bVal.toFixed(1)}${unit} across ${bs.meals} meals` : "",
        pTip: ps ? `${ps.label} (${ps.dateMeal}): ${pVal.toFixed(1)}${unit} across ${ps.meals} meals` : ""
      };
    });
    groups.push({
      label: "Mean Avg",
      b: sum.bAvg,
      p: sum.pAvg,
      bTip: `3-Session Baseline Mean: ${sum.bAvg.toFixed(1)}${unit}`,
      pTip: `3-Session Post-Pilot Mean: ${sum.pAvg.toFixed(1)}${unit} (${sum.pctReduction >= 0 ? "-" : "+"}${Math.abs(sum.pctReduction).toFixed(1)}%)`,
      highlight: true
    });

    const maxVal = Math.max(10, ...groups.flatMap((g) => [g.b, g.p]));
    const yMax = Math.ceil((maxVal * 1.22) / 10) * 10;

    const W = 540, H = 250;
    const pad = { top: 24, right: 18, bottom: 38, left: 46 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top - pad.bottom;

    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Plus Jakarta Sans, Segoe UI, sans-serif">`;

    for (let i = 0; i <= 4; i++) {
      const val = (yMax / 4) * i;
      const y = pad.top + ch - (val / yMax) * ch;
      svg += `<line x1="${pad.left}" y1="${y.toFixed(1)}" x2="${W - pad.right}" y2="${y.toFixed(1)}" stroke="${i === 0 ? "#B8CBC0" : "#E5EEE8"}" stroke-width="1"/>`;
      svg += `<text x="${pad.left - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#4B5E54">${Math.round(val)}</text>`;
    }

    const groupW = cw / groups.length;
    const barW = Math.min(34, groupW * 0.28);
    const gap = 8;

    groups.forEach((g, idx) => {
      const cx = pad.left + groupW * idx + groupW / 2;
      if (g.highlight) {
        svg += `<rect x="${(cx - barW - gap - 10).toFixed(1)}" y="${pad.top - 8}" width="${((barW + gap + 10) * 2).toFixed(1)}" height="${ch + 12}" rx="4" fill="#F3F7F4"/>`;
      }
      const bh = (g.b / yMax) * ch;
      const ph = (g.p / yMax) * ch;
      const bx = cx - barW - gap / 2;
      const px = cx + gap / 2;
      const by = pad.top + ch - bh;
      const py = pad.top + ch - ph;

      svg += `<rect class="chart-bar-hit" data-tip="${escapeAttr(g.bTip)}" x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW}" height="${Math.max(1, bh).toFixed(1)}" rx="3" fill="#D9822B"/>`;
      svg += `<text x="${(bx + barW / 2).toFixed(1)}" y="${(by - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#8E4F0E">${g.b.toFixed(1)}${unit}</text>`;

      svg += `<rect class="chart-bar-hit" data-tip="${escapeAttr(g.pTip)}" x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${barW}" height="${Math.max(1, ph).toFixed(1)}" rx="3" fill="#2E7D52"/>`;
      svg += `<text x="${(px + barW / 2).toFixed(1)}" y="${(py - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#14452F">${g.p.toFixed(1)}${unit}</text>`;

      svg += `<text x="${cx.toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="12" font-weight="${g.highlight ? "700" : "500"}" fill="${g.highlight ? "#14452F" : "#4B5E54"}">${g.label}</text>`;
    });

    svg += `</svg>`;
    el.innerHTML = svg;
  }

  function renderDriversChart() {
    const el = document.getElementById("chart-drivers");
    if (!el) return;
    const d = state.survey.q3;
    const total = Math.max(1, d.portion + d.taste + d.rush + d.appetite + d.other);
    const items = [
      { label: "Portion size too large", val: d.portion, color: "#14452F" },
      { label: "Taste / menu mismatch", val: d.taste, color: "#2E7D52" },
      { label: "Time rush before class", val: d.rush, color: "#D9822B" },
      { label: "Misjudged appetite", val: d.appetite, color: "#5C8A72" },
      { label: "Other factors", val: d.other, color: "#9CB3A6" }
    ].sort((a, b) => b.val - a.val);

    const W = 500, rowH = 42, topPad = 8;
    const H = items.length * rowH + 16;
    const labelW = 165, rightPad = 82, barMaxW = W - labelW - rightPad;

    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Plus Jakarta Sans, Segoe UI, sans-serif">`;
    items.forEach((it, i) => {
      const pct = (it.val / total) * 100;
      const y = topPad + i * rowH;
      const bw = Math.max(4, (pct / 100) * barMaxW);
      const tip = `${it.label}: ${it.val} of ${total} respondents (${pct.toFixed(1)}%)`;
      svg += `<text x="0" y="${y + 20}" font-size="12.5" font-weight="600" fill="#18221D">${it.label}</text>`;
      svg += `<rect x="${labelW}" y="${y + 7}" width="${barMaxW}" height="18" rx="3" fill="#EEF4F0"/>`;
      svg += `<rect class="chart-bar-hit" data-tip="${escapeAttr(tip)}" x="${labelW}" y="${y + 7}" width="${bw.toFixed(1)}" height="18" rx="3" fill="${it.color}"/>`;
      svg += `<text x="${labelW + barMaxW + 10}" y="${y + 20}" font-size="12" font-weight="700" fill="#18221D">${pct.toFixed(1)}% (${it.val})</text>`;
    });
    svg += `</svg>`;
    el.innerHTML = svg;
  }

  function renderReadinessChart() {
    const el = document.getElementById("chart-readiness");
    if (!el) return;
    const s = state.survey;
    const rows = [
      { label: "Q2: Leave food unfinished (Yes / Sometimes)", pct: s.q2Pct, color: "#D9822B", extra: "" },
      { label: "Q4: Take more initially than eaten (Yes / Sometimes)", pct: s.q4Pct, color: "#C97524", extra: "" },
      { label: "Q6: Smaller initial portions + refills help (Yes | +29.5% Maybe)", pct: s.q6Pct, color: "#14452F", extra: s.q6MaybePct ? ` (${(s.q6Pct + s.q6MaybePct).toFixed(1)}% Yes+Maybe)` : "" },
      { label: "Q7: Visual waste displays influence choice (Yes | +59.8% Maybe)", pct: s.q7Pct, color: "#2E7D52", extra: s.q7MaybePct ? ` (${(s.q7Pct + s.q7MaybePct).toFixed(1)}% Yes+Maybe)` : "" }
    ];

    const W = 500, rowH = 54, barW = 435;
    const H = rows.length * rowH + 10;
    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Plus Jakarta Sans, Segoe UI, sans-serif">`;
    rows.forEach((r, i) => {
      const y = 6 + i * rowH;
      const clamped = Math.max(0, Math.min(100, Number(r.pct) || 0));
      const w = (clamped / 100) * barW;
      const tip = `${r.label}: ${clamped.toFixed(1)}%${r.extra} (n = ${s.n})`;
      svg += `<text x="0" y="${y + 14}" font-size="11.5" font-weight="600" fill="#18221D">${r.label}</text>`;
      svg += `<rect x="0" y="${y + 23}" width="${barW}" height="14" rx="3" fill="#EEF4F0"/>`;
      svg += `<rect class="chart-bar-hit" data-tip="${escapeAttr(tip)}" x="0" y="${y + 23}" width="${w.toFixed(1)}" height="14" rx="3" fill="${r.color}"/>`;
      svg += `<text x="${barW + 10}" y="${y + 34}" font-size="12.5" font-weight="700" fill="#14452F">${clamped.toFixed(1)}%</text>`;
    });
    svg += `</svg>`;
    el.innerHTML = svg;
  }

  function renderFrequencyChart() {
    const el = document.getElementById("chart-frequency");
    if (!el) return;
    const q1 = state.survey.q1;
    const total = Math.max(1, q1.daily + q1.threeFour + q1.weekly + q1.rarely);
    const segs = [
      { label: "Daily", val: q1.daily, color: "#14452F" },
      { label: "3–4x/wk", val: q1.threeFour, color: "#2E7D52" },
      { label: "Weekly", val: q1.weekly, color: "#76A88D" },
      { label: "Rarely", val: q1.rarely, color: "#C2D7CA" }
    ];

    const W = 500, H = 215;
    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Plus Jakarta Sans, Segoe UI, sans-serif">`;
    svg += `<text x="0" y="18" font-size="12.5" font-weight="700" fill="#18221D">Q1: Dining Hall Visit Frequency (n = ${state.survey.n})</text>`;

    let xCursor = 0;
    segs.forEach((sg) => {
      const w = (sg.val / total) * W;
      const pct = ((sg.val / total) * 100).toFixed(1);
      const tip = `${sg.label} diners: ${sg.val} students (${pct}%)`;
      svg += `<rect class="chart-bar-hit" data-tip="${escapeAttr(tip)}" x="${xCursor.toFixed(1)}" y="30" width="${Math.max(2, w - 2).toFixed(1)}" height="28" rx="3" fill="${sg.color}"/>`;
      if (w > 54) {
        svg += `<text x="${(xCursor + w / 2).toFixed(1)}" y="48" text-anchor="middle" font-size="11.5" font-weight="700" fill="${sg.color === "#C2D7CA" ? "#18221D" : "#FFFFFF"}">${Math.round((sg.val / total) * 100)}%</text>`;
      }
      xCursor += w;
    });

    segs.forEach((sg, idx) => {
      const lx = idx * 124;
      svg += `<rect x="${lx}" y="70" width="10" height="10" rx="2" fill="${sg.color}"/>`;
      svg += `<text x="${lx + 15}" y="79" font-size="11.5" fill="#4B5E54">${sg.label}: ${sg.val} (${((sg.val / total) * 100).toFixed(0)}%)</text>`;
    });

    const score = Math.max(1, Math.min(5, Number(state.survey.likertMean) || 4.2));
    const fillW = ((score - 1) / 4) * 280;
    svg += `<rect x="0" y="106" width="${W}" height="96" rx="6" fill="#F3F7F4" stroke="#D6E2DB"/>`;
    svg += `<text x="18" y="132" font-size="12.5" font-weight="700" fill="#18221D">Q5: “Food waste is a significant issue on campus” (1–5 Likert)</text>`;
    svg += `<text x="18" y="176" font-family="Source Serif 4, Cambria, serif" font-size="34" font-weight="700" fill="#14452F">${score.toFixed(1)}<tspan font-size="16" fill="#4B5E54"> / 5.0</tspan></text>`;

    svg += `<rect x="175" y="156" width="280" height="14" rx="7" fill="#DCE8E1"/>`;
    svg += `<rect class="chart-bar-hit" data-tip="Mean Likert Severity: ${score.toFixed(1)} out of 5.0 (n = ${state.survey.n})" x="175" y="156" width="${fillW.toFixed(1)}" height="14" rx="7" fill="#D9822B"/>`;
    svg += `<text x="175" y="186" font-size="10.5" fill="#4B5E54">1 Strongly Disagree</text>`;
    svg += `<text x="455" y="186" text-anchor="end" font-size="10.5" fill="#4B5E54">5 Strongly Agree</text>`;

    svg += `</svg>`;
    el.innerHTML = svg;
  }

  /* ---------- Render Tables, Quotes, Photos & Team ---------- */
  function renderAuditTable(sum) {
    const tbody = document.getElementById("audit-tbody");
    if (!tbody) return;
    const isTally = state.protocol === "tally";

    document.getElementById("th-col5").textContent = isTally ? "Plates w/ Leftovers" : "Gross (kg)";
    document.getElementById("th-col6").textContent = isTally ? "Clean Plates" : "Tare (kg)";
    document.getElementById("th-col7").textContent = isTally ? "Protocol" : "Net Waste (kg)";
    document.getElementById("th-col8").textContent = isTally ? "Leftover Rate (%)" : "Waste / Meal (g)";

    tbody.innerHTML = state.sessions
      .map((s) => {
        const net = sessionNetKg(s);
        const gpm = sessionGramsPerMeal(s);
        const tallyPct = sessionTallyPct(s);
        const cleanPlates = Math.max(0, s.meals - s.tallyPlates);
        const phaseBadge = s.phase === "baseline"
          ? '<span class="phase-tag baseline">Baseline</span>'
          : '<span class="phase-tag post">Post-Pilot</span>';

        return `<tr>
          <td>${phaseBadge}</td>
          <td><strong>${escapeHtml(s.label)}</strong></td>
          <td>${escapeHtml(s.dateMeal)}</td>
          <td class="num">${s.meals}</td>
          <td class="num">${isTally ? s.tallyPlates : s.grossKg.toFixed(2)}</td>
          <td class="num">${isTally ? cleanPlates : s.tareKg.toFixed(2)}</td>
          <td class="num">${isTally ? "Twist Tally" : `<strong>${net.toFixed(2)}</strong>`}</td>
          <td class="num"><strong>${isTally ? `${tallyPct.toFixed(1)}%` : `${gpm.toFixed(1)} g`}</strong></td>
        </tr>`;
      })
      .join("");

    const totalsEl = document.getElementById("audit-totals-label");
    if (totalsEl) {
      totalsEl.textContent = isTally
        ? `Baseline Avg: ${sum.baseTally.toFixed(1)}% plates with leftovers | Post-Pilot Avg: ${sum.postTally.toFixed(1)}%`
        : `Baseline: ${sum.baseMeals} meals (${sum.baseKg.toFixed(2)} kg) | Post-Pilot: ${sum.postMeals} meals (${sum.postKg.toFixed(2)} kg)`;
    }
  }

  function renderQuotes() {
    const staffEl = document.getElementById("staff-quotes-list");
    if (staffEl) {
      staffEl.innerHTML = state.staffQuotes
        .map((q) => `<li>${escapeHtml(q.quote)} <span>${escapeHtml(q.tag)}</span></li>`)
        .join("");
    }
    const q8El = document.getElementById("q8-quotes-list");
    if (q8El) {
      q8El.innerHTML = state.survey.q8Quotes
        .slice(0, 6)
        .map((q) => `<li><strong>${escapeHtml(q.title)}:</strong> ${escapeHtml(q.text)}</li>`)
        .join("");
    }
  }

  function renderPledgeWall(sum) {
    const wall = document.getElementById("pledge-wall");
    const countA = document.getElementById("hero-pledge-count");
    const countB = document.getElementById("pledge-wall-count");
    if (countA) countA.textContent = String(sum.totalPledges);
    if (countB) countB.textContent = String(sum.totalPledges);
    if (!wall) return;

    if (!state.pledges.length) {
      wall.innerHTML = `<li style="grid-column:1/-1;opacity:0.85;">No digital pledges logged yet. Be the first student to sign above!</li>`;
      return;
    }

    wall.innerHTML = state.pledges
      .slice(0, 6)
      .map(
        (p) => `<li>
          <strong>${escapeHtml(p.name || "Anonymous Diner")}${p.cohort ? ` · ${escapeHtml(p.cohort)}` : ""}</strong>
          ${escapeHtml(p.commitments[0] || "Committed to responsible portions")} <span style="opacity:0.7">(${escapeHtml(p.ts)})</span>
        </li>`
      )
      .join("");
  }

  function renderFieldPhotos() {
    const grid = document.getElementById("field-photos-grid");
    if (!grid) return;
    if (!state.fieldPhotos.length) {
      grid.innerHTML = `<div class="field-photo-empty">No campus photos uploaded yet. Click <strong>Upload Extra Photos</strong> above to add dining hall photos (no student faces).</div>`;
      return;
    }
    grid.innerHTML = state.fieldPhotos
      .map(
        (ph, i) => `<article class="field-photo-card">
          <div class="field-photo-img-wrap">
            <img class="field-photo-thumb" src="${ph.dataUrl}" alt="${escapeAttr(ph.caption)}" data-photo-idx="${i}" loading="lazy"${ph.pos ? ` style="object-position:${ph.pos}"` : ""} />
            ${ph.tag ? `<span class="photo-tag">${escapeHtml(ph.tag)}</span>` : ""}
          </div>
          <div class="field-photo-meta">
            ${
              ph.builtin
                ? `<p class="field-photo-cap">${escapeHtml(ph.caption)}</p>`
                : `<input type="text" value="${escapeAttr(ph.caption)}" data-photo-cap="${i}" aria-label="Photo caption" />
                   <button type="button" class="photo-del-btn" data-photo-del="${i}">Remove photo</button>`
            }
          </div>
        </article>`
      )
      .join("");
  }

  function renderTeamRoster() {
    const tbody = document.getElementById("team-roster-tbody");
    if (!tbody) return;
    tbody.innerHTML = state.team
      .map(
        (m, idx) => `<tr>
          <td>${m.num}</td>
          <td><strong>${escapeHtml(m.role)}</strong></td>
          <td><input type="text" class="team-name-input" data-team-idx="${idx}" value="${escapeAttr(m.member)}" aria-label="Student ${m.num} name" /></td>
          <td>${escapeHtml(m.proof)}</td>
          <td>${escapeHtml(m.comp)}</td>
        </tr>`
      )
      .join("");
  }

  function renderAll() {
    const sum = computeSummary();
    const isVerified = state.mode === "verified";
    const isTally = state.protocol === "tally";

    document.querySelectorAll('[data-bind="venueName"]').forEach((el) => {
      el.textContent = state.venueName;
    });
    document.querySelectorAll('[data-bind="surveyN"]').forEach((el) => {
      el.textContent = `n = ${state.survey.n}`;
    });

    const dot = document.getElementById("header-status-dot");
    const headerMode = document.getElementById("header-mode-label");
    const heroBadge = document.getElementById("hero-mode-badge");
    const banner = document.getElementById("honesty-banner");
    const hTitle = document.getElementById("honesty-title");
    const hText = document.getElementById("honesty-text");
    const footerNote = document.getElementById("footer-mode-note");

    if (dot) dot.classList.toggle("verified", isVerified);
    if (headerMode) headerMode.textContent = isVerified ? "All Data Verified" : "Survey Verified (n=" + state.survey.n + ")";
    if (heroBadge) {
      heroBadge.textContent = isVerified ? "Verified Field Data" : `Survey Verified (n=${state.survey.n}) • Weighing Template`;
      heroBadge.classList.toggle("verified", isVerified);
    }
    if (banner) banner.classList.toggle("verified", isVerified);
    if (hTitle) {
      hTitle.textContent = isVerified
        ? "Displaying Full Verified Campus Field Data"
        : `Verified Student Survey (n = ${state.survey.n}) + 7 Mess Photos Active • Weighing Log in Template Mode`;
    }
    if (hText) {
      hText.innerHTML = isVerified
        ? `Showing verified survey and weighing/tally measurements for <strong>${escapeHtml(state.venueName)}</strong>. All charts and printable posters reflect this dataset.`
        : `<strong>Survey charts (Q1–Q8, n = ${state.survey.n}) and all 7 dining hall photos (multi-menu, privacy-screened) are 100% verified primary data</strong> from Bennett University. Per BU100 anti-fabrication safeguards, the 3+3 weighing comparison remains clearly tagged as an illustrative protocol template until physical weighing/tally sessions are logged via <strong>Enter / Edit Field Data</strong>.`;
    }
    if (footerNote) {
      footerNote.textContent = isVerified
        ? "Full Verified Field Data active"
        : `Verified Survey (n = ${state.survey.n}) & Photos • Weighing Log in Template Mode`;
    }

    const pctEl = document.getElementById("hero-pct-change");
    const signPrefix = sum.pctReduction >= 0 ? "-" : "+";
    if (pctEl) pctEl.textContent = `${signPrefix}${Math.abs(sum.pctReduction).toFixed(1)}%`;

    document.getElementById("hero-change-label").textContent = isTally
      ? "Plate-Leftover Incidence Change (Twist Tally)"
      : "Normalised Plate Waste Change";

    document.getElementById("hero-change-note").textContent = isVerified
      ? `Measured across 3 comparable baseline and 3 post-pilot slots at ${state.venueName}.`
      : "Template preview across 3 comparable weekday lunch slots. Replace with verified scale or tally logs.";

    document.getElementById("hero-base-label").textContent = isTally ? "Baseline Leftover Rate" : "Baseline Mean";
    document.getElementById("hero-post-label").textContent = isTally ? "Post-Pilot Leftover Rate" : "Post-Pilot Mean";
    document.getElementById("hero-base-val").textContent = isTally ? `${sum.baseTally.toFixed(1)}%` : `${sum.baseGpm.toFixed(1)} g/meal`;
    document.getElementById("hero-post-val").textContent = isTally ? `${sum.postTally.toFixed(1)}%` : `${sum.postGpm.toFixed(1)} g/meal`;
    document.getElementById("hero-survey-n").textContent = `n = ${state.survey.n}`;

    const protoBtn = document.getElementById("toggle-protocol-btn");
    if (protoBtn) {
      protoBtn.textContent = isTally ? "Switch to Scale Weighing (g/meal)" : "Switch to Twist Tally View";
    }
    document.getElementById("chart1-title").textContent = isTally
      ? "Baseline vs. Post-Pilot Plates with Leftovers (% — Twist Tally)"
      : "Baseline vs. Post-Pilot Waste per Meal (g)";
    document.getElementById("chart1-sub").textContent = isTally
      ? "Anonymous observation tally used when direct bin weighing is restricted (hover bars for details)"
      : "3 comparable weekday lunch sessions before and after counter nudges (hover bars for details)";

    document.getElementById("formula-per-meal").textContent = isTally
      ? "Leftover Rate (%) = (Plates with Edible Leftovers ÷ Observed Plates) × 100"
      : "Waste per Meal (g) = Total Eligible Waste (g) ÷ Meals Served";

    const dirWord = sum.pctReduction >= 0 ? "reduction" : "increase";
    document.getElementById("formula-pct-change").textContent =
      `% Change = ((${sum.bAvg.toFixed(1)} − ${sum.pAvg.toFixed(1)}) ÷ ${sum.bAvg.toFixed(1)}) × 100 = ${Math.abs(sum.pctReduction).toFixed(1)}% ${dirWord}`;

    renderWasteComparisonChart(sum);
    renderDriversChart();
    renderReadinessChart();
    renderFrequencyChart();
    renderAuditTable(sum);
    renderQuotes();
    renderPledgeWall(sum);
    renderFieldPhotos();
    renderTeamRoster();
    renderQrCodes();
  }

  /* ---------- Modals Helper ---------- */
  function closeAllOverlays() {
    ["lightbox-backdrop", "survey-backdrop", "tally-backdrop", "editor-backdrop", "editor-drawer"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.hidden = true;
    });
    document.body.style.overflow = "";
  }

  /* ---------- Interactive 8-Question Anonymous Survey Modal ---------- */
  function setupSurveyModal() {
    const backdrop = document.getElementById("survey-backdrop");
    const extBar = document.getElementById("survey-ext-bar");
    const extLink = document.getElementById("survey-ext-link");
    const form = document.getElementById("live-survey-form");

    function openSurvey() {
      if (state.googleFormUrl) {
        extBar.hidden = false;
        extLink.href = state.googleFormUrl;
      } else {
        extBar.hidden = true;
      }
      backdrop.hidden = false;
      document.body.style.overflow = "hidden";
    }

    ["open-survey-btn", "qual-take-survey-btn"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener("click", openSurvey);
    });
    document.getElementById("close-survey-btn").addEventListener("click", closeAllOverlays);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeAllOverlays();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q1 = document.getElementById("sv-q1").value;
      const q2 = document.getElementById("sv-q2").value;
      const q3 = document.getElementById("sv-q3").value;
      const q4 = document.getElementById("sv-q4").value;
      const q5 = Number(document.getElementById("sv-q5").value) || 4;
      const q6 = document.getElementById("sv-q6").value;
      const q7 = document.getElementById("sv-q7").value;
      const q8 = document.getElementById("sv-q8").value.trim();

      const oldN = Math.max(1, state.survey.n);
      const newN = oldN + 1;

      if (q1 === "Daily") state.survey.q1.daily++;
      else if (q1.startsWith("3")) state.survey.q1.threeFour++;
      else if (q1 === "Weekly") state.survey.q1.weekly++;
      else state.survey.q1.rarely++;

      if (q3 === "Portion size") state.survey.q3.portion++;
      else if (q3 === "Taste") state.survey.q3.taste++;
      else if (q3 === "Time rush") state.survey.q3.rush++;
      else if (q3 === "Appetite") state.survey.q3.appetite++;
      else state.survey.q3.other++;

      const updatePct = (oldPct, isHit) => {
        const oldHits = (oldPct / 100) * oldN;
        return Number((((oldHits + (isHit ? 1 : 0)) / newN) * 100).toFixed(1));
      };

      state.survey.q2Pct = updatePct(state.survey.q2Pct, q2 === "Yes" || q2 === "Sometimes");
      state.survey.q4Pct = updatePct(state.survey.q4Pct, q4 === "Yes" || q4 === "Sometimes");
      state.survey.q6Pct = updatePct(state.survey.q6Pct, q6 === "Yes");
      state.survey.q7Pct = updatePct(state.survey.q7Pct, q7 === "Yes");
      state.survey.likertMean = Number((((state.survey.likertMean * oldN) + q5) / newN).toFixed(1));
      state.survey.n = newN;

      if (q8) {
        state.survey.q8Quotes.unshift({ title: "Student response", text: q8 });
        state.survey.q8Quotes = state.survey.q8Quotes.slice(0, 8);
      }

      saveState();
      renderAll();
      form.reset();
      closeAllOverlays();
      showToast(`Anonymous survey response recorded! Sample updated to n = ${newN}.`);
    });
  }

  /* ---------- Live Mess Plate-Tally Clicker Modal ---------- */
  function setupTallyModal() {
    const backdrop = document.getElementById("tally-backdrop");
    const select = document.getElementById("tally-session-select");
    let history = []; // "clean" | "leftover"

    function renderCounter() {
      const total = history.length;
      const leftovers = history.filter((x) => x === "leftover").length;
      const rate = total ? (leftovers / total) * 100 : 0;
      document.getElementById("tally-total-out").textContent = String(total);
      document.getElementById("tally-leftover-out").textContent = String(leftovers);
      document.getElementById("tally-rate-out").textContent = `${rate.toFixed(1)}%`;
    }

    function openTally() {
      select.innerHTML = state.sessions
        .map((s, i) => `<option value="${i}">${escapeHtml(s.label)} — ${escapeHtml(s.dateMeal)}</option>`)
        .join("");
      history = [];
      renderCounter();
      backdrop.hidden = false;
      document.body.style.overflow = "hidden";
    }

    document.getElementById("open-tally-btn").addEventListener("click", openTally);
    document.getElementById("close-tally-btn").addEventListener("click", closeAllOverlays);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeAllOverlays();
    });

    document.getElementById("tally-add-clean").addEventListener("click", () => {
      history.push("clean");
      renderCounter();
    });
    document.getElementById("tally-add-leftover").addEventListener("click", () => {
      history.push("leftover");
      renderCounter();
    });
    document.getElementById("tally-undo-btn").addEventListener("click", () => {
      history.pop();
      renderCounter();
    });
    document.getElementById("tally-clear-btn").addEventListener("click", () => {
      history = [];
      renderCounter();
    });

    document.getElementById("tally-save-btn").addEventListener("click", () => {
      if (!history.length) {
        showToast("Tap at least one plate before saving to a session.");
        return;
      }
      const idx = Number(select.value) || 0;
      const leftovers = history.filter((x) => x === "leftover").length;
      state.sessions[idx].meals = history.length;
      state.sessions[idx].tallyPlates = leftovers;
      state.protocol = "tally";
      state.mode = "verified";
      saveState();
      renderAll();
      closeAllOverlays();
      showToast(`Saved ${history.length} observed plates (${leftovers} with leftovers) to ${state.sessions[idx].label}.`);
    });
  }

  /* ---------- Poster Lightbox & Campus Field Photos ---------- */
  function setupLightboxAndPhotos() {
    const backdrop = document.getElementById("lightbox-backdrop");
    const lbImg = document.getElementById("lightbox-img");
    const lbCap = document.getElementById("lightbox-caption");

    function openLightbox(src, caption) {
      lbImg.src = src;
      lbImg.alt = caption || "Preview";
      lbCap.textContent = caption || "Preview";
      backdrop.hidden = false;
      document.body.style.overflow = "hidden";
    }

    document.querySelectorAll(".poster-preview-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        openLightbox(btn.dataset.src, btn.dataset.caption);
      });
    });

    document.getElementById("close-lightbox-btn").addEventListener("click", closeAllOverlays);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeAllOverlays();
    });

    const photoGrid = document.getElementById("field-photos-grid");
    photoGrid.addEventListener("click", (e) => {
      const img = e.target.closest(".field-photo-thumb");
      if (img) {
        const idx = Number(img.dataset.photoIdx);
        const ph = state.fieldPhotos[idx];
        if (ph) openLightbox(ph.dataUrl, ph.caption);
        return;
      }
      const del = e.target.closest(".photo-del-btn");
      if (del) {
        const idx = Number(del.dataset.photoDel);
        state.fieldPhotos.splice(idx, 1);
        saveState();
        renderFieldPhotos();
        showToast("Photo removed from field gallery.");
      }
    });

    photoGrid.addEventListener("change", (e) => {
      const inp = e.target.closest("[data-photo-cap]");
      if (!inp) return;
      const idx = Number(inp.dataset.photoCap);
      if (state.fieldPhotos[idx]) {
        state.fieldPhotos[idx].caption = inp.value.trim() || "Campus dining hall photo";
        saveState();
      }
    });

    document.getElementById("field-photo-input").addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []).slice(0, 8);
      if (!files.length) return;
      let loaded = 0;
      files.forEach((file) => {
        compressImageFile(file, 960, 0.78, (dataUrl) => {
          const cleanName = file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
          state.fieldPhotos.push({ dataUrl, caption: cleanName || "Dining hall observation photo" });
          loaded++;
          if (loaded === files.length) {
            if (saveState()) {
              renderFieldPhotos();
              showToast(`Added ${loaded} field photo${loaded > 1 ? "s" : ""} to gallery.`);
            }
          }
        });
      });
      e.target.value = "";
    });
  }

  function compressImageFile(file, maxDim, quality, cb) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          const scale = maxDim / Math.max(w, h);
          w = Math.round(w * scale);
          h = Math.round(h * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        cb(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  }

  /* ---------- Pledge Handling & QR Controls ---------- */
  function setupPledge() {
    const form = document.getElementById("pledge-form");
    const confirmBox = document.getElementById("pledge-confirm");
    const badgeBtn = document.getElementById("download-badge-btn");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("pledge-name").value.trim() || "Anonymous Diner";
      const cohort = document.getElementById("pledge-cohort").value.trim();
      const checked = Array.from(form.querySelectorAll('input[name="commitment"]:checked')).map((el) => el.value);

      if (!checked.length) {
        confirmBox.hidden = false;
        confirmBox.textContent = "Select at least one dining counter commitment to record your pledge.";
        return;
      }

      const now = new Date();
      const ts = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      const entry = { name, cohort, commitments: checked, ts, isTemplate: false };
      state.pledges.unshift(entry);
      lastSignedPledge = entry;
      saveState();
      renderAll();

      confirmBox.hidden = false;
      confirmBox.textContent = `Pledge recorded for ${name}. Thank you for backing responsible dining at ${state.venueName}.`;
      badgeBtn.hidden = false;
      form.reset();
      showToast(`Student pledge signed for ${name}.`);
    });

    badgeBtn.addEventListener("click", () => {
      if (!lastSignedPledge) return;
      downloadPledgeBadgePng(lastSignedPledge);
    });

    document.getElementById("export-pledges-csv").addEventListener("click", () => {
      const header = "name,cohort,commitments,logged_at\n";
      const rows = state.pledges
        .map((p) => [p.name, p.cohort, p.commitments.join(" | "), p.ts].map(csvEscape).join(","))
        .join("\n");
      downloadText("wasteless_bu_pledges.csv", header + rows, "text/csv");
      showToast("Exported student pledges CSV.");
    });

    document.getElementById("qr-preset-pledge").addEventListener("click", () => {
      state.qrPreset = "pledge";
      state.qrUrl = defaultPledgeUrl();
      document.getElementById("qr-url-input").value = state.qrUrl;
      saveState();
      renderQrCodes();
      showToast("QR switched to Student Pledge link.");
    });

    document.getElementById("qr-preset-survey").addEventListener("click", () => {
      state.qrPreset = "survey";
      if (state.googleFormUrl) {
        state.qrUrl = state.googleFormUrl;
        document.getElementById("qr-url-input").value = state.qrUrl;
        saveState();
        renderQrCodes();
        showToast("QR switched to your Google Form survey link.");
      } else {
        const inp = document.getElementById("qr-url-input");
        inp.value = "";
        inp.focus();
        renderQrCodes();
        showToast("Paste your Google Form URL below and click Update QR.");
      }
    });

    document.getElementById("update-qr-btn").addEventListener("click", () => {
      const val = document.getElementById("qr-url-input").value.trim();
      if (!val) {
        showToast("Enter a valid URL starting with https://");
        return;
      }
      state.qrUrl = val;
      if (state.qrPreset === "survey" || /forms\.gle|docs\.google\.com\/forms/i.test(val)) {
        state.googleFormUrl = val;
        state.qrPreset = "survey";
      }
      saveState();
      renderQrCodes();
      showToast("Live QR code updated (synced with printable posters).");
    });

    document.getElementById("download-qr-png").addEventListener("click", () => {
      downloadQrPng(state.qrUrl);
    });

    document.getElementById("copy-qr-url").addEventListener("click", () => {
      const url = state.qrUrl;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(
          () => showToast("Copied QR target URL to clipboard."),
          () => fallbackCopy(url)
        );
      } else {
        fallbackCopy(url);
      }
    });
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); showToast("Copied QR target URL."); } catch {}
    document.body.removeChild(ta);
  }

  function downloadPledgeBadgePng(entry) {
    const canvas = document.createElement("canvas");
    canvas.width = 920;
    canvas.height = 520;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#14452F";
    ctx.fillRect(0, 0, 920, 520);

    ctx.strokeStyle = "#D9822B";
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 872, 472);

    ctx.fillStyle = "#CFE6D8";
    ctx.font = "600 19px Segoe UI, sans-serif";
    ctx.fillText("WASTELESS BU • BENNETT UNIVERSITY • SDG 12 ACTION LAB", 56, 78);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 42px Cambria, Georgia, serif";
    ctx.fillText("Student Responsible Dining Pledge", 56, 142);

    const who = `${entry.name}${entry.cohort ? " (" + entry.cohort + ")" : ""}`;
    ctx.fillStyle = "#F5D0A9";
    ctx.font = "700 26px Segoe UI, sans-serif";
    ctx.fillText(`Signed by: ${who.slice(0, 48)}`, 56, 206);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "400 20px Segoe UI, sans-serif";
    let y = 262;
    entry.commitments.slice(0, 3).forEach((c) => {
      ctx.fillText(`✓  ${c}`, 56, y);
      y += 38;
    });

    ctx.fillStyle = "#CFE6D8";
    ctx.font = "italic 600 21px Cambria, Georgia, serif";
    ctx.fillText("“Take What You Need. Eat What You Take.”", 56, 444);

    const a = document.createElement("a");
    a.download = "WasteLess_BU_Pledge_Card.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
    showToast("Downloaded WasteLess BU Pledge Card PNG.");
  }

  /* ---------- Personal Calculator ---------- */
  function setupCalculator() {
    const mealsEl = document.getElementById("calc-meals");
    const gramsEl = document.getElementById("calc-grams");
    function update() {
      const m = Number(mealsEl.value);
      const g = Number(gramsEl.value);
      document.getElementById("calc-meals-out").textContent = `${m} meals`;
      document.getElementById("calc-grams-out").textContent = `${g} g`;
      const semKg = (m * g * 16) / 1000;
      document.getElementById("calc-semester-kg").textContent = `${semKg.toFixed(1)} kg saved`;
      document.getElementById("calc-cohort-kg").textContent = `${Math.round(semKg * 100)} kg saved`;
    }
    mealsEl.addEventListener("input", update);
    gramsEl.addEventListener("input", update);
    update();
  }

  /* ---------- Tabs, Editable Team & Active Scroll-Spy Nav ---------- */
  function setupTabsAndNav() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll(".tab-panel").forEach((p) => {
          p.classList.remove("active");
          p.hidden = true;
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        const panel = document.getElementById(btn.dataset.tab);
        if (panel) {
          panel.classList.add("active");
          panel.hidden = false;
        }
      });
    });

    // Inline editable 8-student roster
    const teamBody = document.getElementById("team-roster-tbody");
    teamBody.addEventListener("input", (e) => {
      const inp = e.target.closest("[data-team-idx]");
      if (!inp) return;
      const idx = Number(inp.dataset.teamIdx);
      if (state.team[idx]) {
        state.team[idx].member = inp.value;
        saveState();
      }
    });

    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Active section highlight while scrolling
    const navLinks = Array.from(nav.querySelectorAll("a"));
    const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    window.addEventListener("scroll", () => {
      const pos = window.scrollY + 120;
      let activeId = "";
      sections.forEach((sec) => {
        if (sec.offsetTop <= pos) activeId = sec.id;
      });
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${activeId}`);
      });
    }, { passive: true });
  }

  /* ---------- Interactive Field Data Editor ---------- */
  function setupEditor() {
    const drawer = document.getElementById("editor-drawer");
    const backdrop = document.getElementById("editor-backdrop");
    const sessionsWrap = document.getElementById("editor-sessions-list");
    const importStatus = document.getElementById("import-status");

    function populateForm() {
      document.getElementById("ed-mode").value = state.mode;
      document.getElementById("ed-protocol").value = state.protocol;
      document.getElementById("ed-venue").value = state.venueName;
      document.getElementById("ed-google-form").value = state.googleFormUrl || "";
      document.getElementById("ed-survey-n").value = state.survey.n;
      document.getElementById("ed-likert").value = state.survey.likertMean;
      document.getElementById("ed-d-portion").value = state.survey.q3.portion;
      document.getElementById("ed-d-taste").value = state.survey.q3.taste;
      document.getElementById("ed-d-rush").value = state.survey.q3.rush;
      document.getElementById("ed-d-appetite").value = state.survey.q3.appetite;
      document.getElementById("ed-d-other").value = state.survey.q3.other;
      document.getElementById("ed-q2").value = state.survey.q2Pct;
      document.getElementById("ed-q4").value = state.survey.q4Pct;
      document.getElementById("ed-q6").value = state.survey.q6Pct;
      document.getElementById("ed-q7").value = state.survey.q7Pct;
      document.getElementById("ed-offline-pledges").value = state.offlinePledges || 0;

      sessionsWrap.innerHTML = state.sessions
        .map(
          (s, idx) => `<div class="session-edit-card">
            <div class="session-edit-head">${escapeHtml(s.label)} (${s.phase === "baseline" ? "Baseline" : "Post-Pilot"})</div>
            <div class="session-edit-grid">
              <div class="field-light"><label>Date &amp; Meal</label><input type="text" data-si="${idx}" data-sf="dateMeal" value="${escapeAttr(s.dateMeal)}" /></div>
              <div class="field-light"><label>Meals</label><input type="number" min="1" data-si="${idx}" data-sf="meals" value="${s.meals}" /></div>
              <div class="field-light"><label>Gross kg</label><input type="number" step="0.01" min="0" data-si="${idx}" data-sf="grossKg" value="${s.grossKg}" /></div>
              <div class="field-light"><label>Tare kg</label><input type="number" step="0.01" min="0" data-si="${idx}" data-sf="tareKg" value="${s.tareKg}" /></div>
              <div class="field-light"><label>Tally Plates</label><input type="number" min="0" data-si="${idx}" data-sf="tallyPlates" value="${s.tallyPlates}" /></div>
            </div>
          </div>`
        )
        .join("");
    }

    function openDrawer() {
      populateForm();
      importStatus.textContent = "";
      drawer.hidden = false;
      backdrop.hidden = false;
      document.body.style.overflow = "hidden";
    }

    ["open-editor-btn", "hero-edit-btn", "dash-open-editor", "footer-edit-btn"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener("click", openDrawer);
    });

    document.getElementById("close-editor-btn").addEventListener("click", closeAllOverlays);
    backdrop.addEventListener("click", closeAllOverlays);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllOverlays();
    });

    document.getElementById("toggle-protocol-btn").addEventListener("click", () => {
      state.protocol = state.protocol === "weight" ? "tally" : "weight";
      saveState();
      renderAll();
      showToast(state.protocol === "tally" ? "Switched to Twist Observation Tally (%) view." : "Switched to Direct Scale Weighing (g/meal) view.");
    });

    document.getElementById("clear-template-pledges-btn").addEventListener("click", () => {
      state.pledgeBaseCount = 0;
      state.pledges = state.pledges.filter((p) => !p.isTemplate);
      saveState();
      renderAll();
      importStatus.textContent = "Cleared template pledges — live counter now shows only real pledges.";
      showToast("Cleared template pledges.");
    });

    document.getElementById("save-editor-btn").addEventListener("click", () => {
      state.mode = document.getElementById("ed-mode").value;
      state.protocol = document.getElementById("ed-protocol").value;
      state.venueName = document.getElementById("ed-venue").value.trim() || DEFAULT_STATE.venueName;
      state.googleFormUrl = document.getElementById("ed-google-form").value.trim();
      state.survey.n = Math.max(1, Number(document.getElementById("ed-survey-n").value) || 1);
      state.survey.likertMean = Number(document.getElementById("ed-likert").value) || 4.0;
      state.survey.q3.portion = Math.max(0, Number(document.getElementById("ed-d-portion").value) || 0);
      state.survey.q3.taste = Math.max(0, Number(document.getElementById("ed-d-taste").value) || 0);
      state.survey.q3.rush = Math.max(0, Number(document.getElementById("ed-d-rush").value) || 0);
      state.survey.q3.appetite = Math.max(0, Number(document.getElementById("ed-d-appetite").value) || 0);
      state.survey.q3.other = Math.max(0, Number(document.getElementById("ed-d-other").value) || 0);
      state.survey.q2Pct = Number(document.getElementById("ed-q2").value) || 0;
      state.survey.q4Pct = Number(document.getElementById("ed-q4").value) || 0;
      state.survey.q6Pct = Number(document.getElementById("ed-q6").value) || 0;
      state.survey.q7Pct = Number(document.getElementById("ed-q7").value) || 0;
      state.offlinePledges = Math.max(0, Number(document.getElementById("ed-offline-pledges").value) || 0);

      sessionsWrap.querySelectorAll("[data-si]").forEach((inp) => {
        const i = Number(inp.dataset.si);
        const f = inp.dataset.sf;
        state.sessions[i][f] = f === "dateMeal" ? inp.value.trim() : Number(inp.value) || 0;
      });

      saveState();
      renderAll();
      closeAllOverlays();
      showToast("Field data updated across dashboard and printable posters.");
    });

    document.getElementById("reset-template-btn").addEventListener("click", () => {
      state = clone(DEFAULT_STATE);
      saveState();
      populateForm();
      renderAll();
      importStatus.textContent = "Restored illustrative pilot template defaults.";
      showToast("Reset to Illustrative Pilot Template defaults.");
    });

    document.getElementById("export-json-btn").addEventListener("click", () => {
      downloadText("wasteless_bu_backup.json", JSON.stringify(state, null, 2), "application/json");
      showToast("Exported full WasteLess BU JSON backup.");
    });

    document.getElementById("import-json-file").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (!parsed.sessions || !parsed.survey) throw new Error("Invalid WasteLess BU backup JSON.");
          state = Object.assign(clone(DEFAULT_STATE), parsed);
          saveState();
          populateForm();
          renderAll();
          importStatus.textContent = `Restored full project dataset from ${file.name}.`;
          showToast("Restored backup dataset successfully.");
        } catch (err) {
          importStatus.textContent = `JSON import failed: ${err.message}`;
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    document.getElementById("export-audit-csv").addEventListener("click", () => {
      const header = "phase,session_label,date_meal,meals_served,gross_weight_kg,tare_weight_kg,net_waste_kg,grams_per_meal,observation_tally_plates,leftover_rate_pct\n";
      const rows = state.sessions
        .map((s) =>
          [
            s.phase,
            s.label,
            s.dateMeal,
            s.meals,
            s.grossKg.toFixed(2),
            s.tareKg.toFixed(2),
            sessionNetKg(s).toFixed(2),
            sessionGramsPerMeal(s).toFixed(1),
            s.tallyPlates,
            sessionTallyPct(s).toFixed(1)
          ]
            .map(csvEscape)
            .join(",")
        )
        .join("\n");
      downloadText("wasteless_bu_audit_log.csv", header + rows, "text/csv");
      showToast("Exported measurement audit log CSV.");
    });

    // Audit CSV Import
    document.getElementById("import-audit-file").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const rows = parseCsv(String(reader.result));
          const parsed = rows
            .filter((r) => r.phase && (r.phase.toLowerCase().startsWith("base") || r.phase.toLowerCase().startsWith("post")))
            .slice(0, 6)
            .map((r, i) => ({
              phase: r.phase.toLowerCase().startsWith("base") ? "baseline" : "post",
              label: r.session_label || `Session ${i + 1}`,
              dateMeal: r.date_meal || "Recorded slot",
              meals: Math.max(1, Number(r.meals_served) || 1),
              grossKg: Number(r.gross_weight_kg) || Number(r.net_waste_kg) || 0,
              tareKg: Number(r.tare_weight_kg) || 0,
              tallyPlates: Number(r.observation_tally_plates) || 0
            }));
          if (!parsed.length) throw new Error("No valid baseline/post rows found.");
          state.sessions = parsed;
          state.mode = "verified";
          saveState();
          populateForm();
          renderAll();
          importStatus.textContent = `Imported ${parsed.length} verified sessions from ${file.name}.`;
          showToast(`Imported ${parsed.length} audit sessions.`);
        } catch (err) {
          importStatus.textContent = `Could not parse audit CSV: ${err.message}`;
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    // Survey CSV Import (supports BOTH template headers AND raw Google Forms CSV exports!)
    document.getElementById("import-survey-file").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const rows = parseCsv(String(reader.result));
          if (!rows.length) throw new Error("Empty survey CSV.");
          const n = rows.length;
          const q1 = { daily: 0, threeFour: 0, weekly: 0, rarely: 0 };
          const q3 = { portion: 0, taste: 0, rush: 0, appetite: 0, other: 0 };
          const q8List = [];
          let q2Yes = 0, q4Yes = 0, q6Yes = 0, q7Yes = 0, likertSum = 0;

          const findVal = (row, keys) => {
            for (const k of keys) {
              if (row[k] !== undefined) return row[k];
            }
            const rowKeys = Object.keys(row);
            for (const k of keys) {
              const hit = rowKeys.find((rk) => rk.includes(k));
              if (hit && row[hit] !== undefined) return row[hit];
            }
            return "";
          };

          rows.forEach((r) => {
            const f = findVal(r, ["q1_frequency", "frequently"]).toLowerCase();
            if (f.includes("daily")) q1.daily++;
            else if (f.includes("3")) q1.threeFour++;
            else if (f.includes("week")) q1.weekly++;
            else q1.rarely++;

            const c2 = findVal(r, ["q2_leave_food", "unfinished"]).toLowerCase();
            if (c2.startsWith("y") || c2.startsWith("s")) q2Yes++;

            const c3 = findVal(r, ["q3_reason", "most common reason", "reason"]).toLowerCase();
            if (c3.includes("portion")) q3.portion++;
            else if (c3.includes("taste")) q3.taste++;
            else if (c3.includes("time") || c3.includes("rush")) q3.rush++;
            else if (c3.includes("appetite")) q3.appetite++;
            else q3.other++;

            const c4 = findVal(r, ["q4_take_more", "more food initially", "initially"]).toLowerCase();
            if (c4.startsWith("y") || c4.startsWith("s")) q4Yes++;

            const c5 = Number(findVal(r, ["q5_issue_likert", "significant issue", "issue"]));
            likertSum += c5 >= 1 && c5 <= 5 ? c5 : 4;

            if (findVal(r, ["q6_smaller_portions", "smaller initial"]).toLowerCase().startsWith("y")) q6Yes++;
            if (findVal(r, ["q7_visual_displays", "visual waste"]).toLowerCase().startsWith("y")) q7Yes++;

            const c8 = findVal(r, ["q8_suggestion", "practical changes", "encourage you"]).trim();
            if (c8 && q8List.length < 6) {
              q8List.push({ title: "Student suggestion", text: c8 });
            }
          });

          state.survey = {
            n,
            likertMean: Number((likertSum / n).toFixed(1)),
            q1,
            q3,
            q2Pct: Number(((q2Yes / n) * 100).toFixed(1)),
            q4Pct: Number(((q4Yes / n) * 100).toFixed(1)),
            q6Pct: Number(((q6Yes / n) * 100).toFixed(1)),
            q7Pct: Number(((q7Yes / n) * 100).toFixed(1)),
            q8Quotes: q8List.length ? q8List : clone(DEFAULT_STATE.survey.q8Quotes)
          };
          state.mode = "verified";
          saveState();
          populateForm();
          renderAll();
          importStatus.textContent = `Imported ${n} anonymous survey responses from ${file.name}.`;
          showToast(`Imported ${n} real survey responses!`);
        } catch (err) {
          importStatus.textContent = `Could not parse survey CSV: ${err.message}`;
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });
  }

  /* ---------- Helpers ---------- */
  function parseCsv(text) {
    const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
    const lines = clean.split("\n").filter((l) => l.trim().length > 0);
    if (lines.length < 2) return [];
    const headers = splitCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
    return lines.slice(1).map((line) => {
      const cols = splitCsvLine(line);
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = (cols[i] || "").trim();
      });
      return obj;
    });
  }

  function splitCsvLine(line) {
    const out = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (ch === "," && !inQ) {
        out.push(cur); cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur);
    return out;
  }

  function csvEscape(v) {
    const s = String(v == null ? "" : v);
    return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }

  function downloadText(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    setupChartTooltips();
    setupTabsAndNav();
    setupCalculator();
    setupPledge();
    setupSurveyModal();
    setupTallyModal();
    setupLightboxAndPhotos();
    setupEditor();
    renderAll();
  });
})();
