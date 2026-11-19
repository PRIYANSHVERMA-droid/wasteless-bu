# WasteLess BU — Student Survey Instrument (Google Forms Blueprint)

**Course:** BU100 – BMI TREP Semester 1 • SDG Action Lab  
**Target Sample:** 50–100 anonymous student responses across multiple meal times, hostels, and dining cohorts (prevents sampling & confirmation bias).  
**Selected Venue:** Bennett University — Main Student Dining Hall / Mess *(edit venue name if targeting another dining area)*

---

## Form Settings Checklist
- [ ] **Collect email addresses:** OFF (keep survey strictly anonymous)
- [ ] **Limit to 1 response:** Optional (if using Bennett email login, ensure emails are NOT recorded in responses)
- [ ] **Form Description:** *"This anonymous 2-minute survey is part of WasteLess BU, a BU100 SDG 12 Action Lab initiative studying avoidable plate waste in the Bennett University Main Student Dining Hall / Mess. No personally identifiable information is collected."*

---

## Survey Questions (Exact Q1–Q8)

### Q1. How frequently do you eat at the selected cafeteria / dining hall?
- **Type:** Multiple choice (Required)
- **Options:**
  - `Daily`
  - `3–4x per week`
  - `Weekly`
  - `Rarely`

### Q2. Do you sometimes leave edible food unfinished on your plate?
- **Type:** Multiple choice (Required)
- **Options:**
  - `Yes`
  - `Sometimes`
  - `No`

### Q3. What is your most common reason for leaving food unfinished?
- **Type:** Multiple choice (Required)
- **Options:**
  - `Portion size`
  - `Taste`
  - `Time rush`
  - `Appetite`
  - `Other`

### Q4. Do you sometimes take more food initially than you can consume?
- **Type:** Multiple choice (Required)
- **Options:**
  - `Yes`
  - `Sometimes`
  - `No`

### Q5. Do you think food waste is a significant issue on campus?
- **Type:** Linear scale 1–5 (Required)
- **Labels:** `1 = Strongly Disagree` to `5 = Strongly Agree`

### Q6. Would taking smaller initial portions (with refill options) help reduce waste?
- **Type:** Multiple choice (Required)
- **Options:**
  - `Yes`
  - `Maybe`
  - `No`

### Q7. Would visual waste data and counter awareness displays influence your choices?
- **Type:** Multiple choice (Required)
- **Options:**
  - `Yes`
  - `Maybe`
  - `No`

### Q8. What practical changes would encourage you to waste less food?
- **Type:** Short answer / Paragraph text (Optional)

---

## Exporting Responses into the WasteLess BU Website
1. After collecting 50–100 responses in Google Forms, click **Responses → Link to Sheets → File → Download → CSV**.
2. Use the header format in `templates/survey_responses_template.csv` and import the CSV directly inside the **Field Data Editor** on `index.html` to update all charts live.
