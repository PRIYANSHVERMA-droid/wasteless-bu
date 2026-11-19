/**
 * WasteLess BU — 1-Click Google Form Generator (BU100 SDG 12 Action Lab)
 *
 * HOW TO RUN (takes ~15 seconds):
 * 1. Go to https://script.new (signed into your Google account)
 * 2. Delete the default empty function and paste this entire script
 * 3. Click "Save" (Ctrl+S), then click "Run"
 * 4. Click "Review Permissions" -> choose your account -> Advanced -> Go to project -> Allow
 * 5. Copy the "SHARE WITH STUDENTS" link from the Execution Log at the bottom!
 */
function createWasteLessBUForm() {
  var form = FormApp.create('WasteLess BU — Campus Dining Plate-Waste Survey');

  form.setTitle('WasteLess BU — Campus Dining Plate-Waste Survey');
  form.setDescription(
    'This anonymous 1-minute survey is part of WasteLess BU (BU100 – BMI TREP Semester 1, SDG 12 Action Lab) at Bennett University.\n\n' +
    'We are investigating avoidable plate waste in the Main Student Dining Hall / Mess to design practical portion and awareness improvements. ' +
    'No email address, roll number, or personal identity is collected.'
  );

  // Strict BU100 anonymity settings
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Thank you! Your anonymous response has been recorded for WasteLess BU (SDG 12 Action Lab). Take What You Need. Eat What You Take.'
  );

  // Q1
  form.addMultipleChoiceItem()
    .setTitle('1. How frequently do you eat at the Main Student Dining Hall / Mess?')
    .setChoiceValues(['Daily', '3–4x per week', 'Weekly', 'Rarely'])
    .setRequired(true);

  // Q2
  form.addMultipleChoiceItem()
    .setTitle('2. Do you sometimes leave edible food unfinished on your plate?')
    .setChoiceValues(['Yes', 'Sometimes', 'No'])
    .setRequired(true);

  // Q3
  form.addMultipleChoiceItem()
    .setTitle('3. What is your most common reason for leaving food unfinished?')
    .setChoiceValues(['Portion size', 'Taste', 'Time rush', 'Appetite', 'Other'])
    .setRequired(true);

  // Q4
  form.addMultipleChoiceItem()
    .setTitle('4. Do you sometimes take more food initially than you can consume?')
    .setChoiceValues(['Yes', 'Sometimes', 'No'])
    .setRequired(true);

  // Q5
  form.addScaleItem()
    .setTitle('5. Do you think food waste is a significant issue on campus?')
    .setBounds(1, 5)
    .setLabels('Strongly Disagree', 'Strongly Agree')
    .setRequired(true);

  // Q6
  form.addMultipleChoiceItem()
    .setTitle('6. Would taking smaller initial portions (with refill options) help reduce waste?')
    .setChoiceValues(['Yes', 'Maybe', 'No'])
    .setRequired(true);

  // Q7
  form.addMultipleChoiceItem()
    .setTitle('7. Would visual waste data and counter awareness displays influence your choices?')
    .setChoiceValues(['Yes', 'Maybe', 'No'])
    .setRequired(true);

  // Q8
  form.addParagraphTextItem()
    .setTitle('8. What practical changes would encourage you to waste less food?')
    .setHelpText('Optional — e.g., half-scoop options, tasting unfamiliar dishes first, visible daily menu, counter reminders')
    .setRequired(false);

  Logger.log('====================================================');
  Logger.log('FORM CREATED SUCCESSFULLY!');
  Logger.log('SHARE WITH STUDENTS (Live Form Link): ' + form.getPublishedUrl());
  Logger.log('EDIT / VIEW RESPONSES LINK: ' + form.getEditUrl());
  Logger.log('====================================================');
}
