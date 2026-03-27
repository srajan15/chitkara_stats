// ─────────────────────────────────────────────────────
// EXPENSE TRACKER — AUTO SETUP SCRIPT
// Run setupExpenseTracker() once to create everything
// ─────────────────────────────────────────────────────

const EMAIL = "your@email.com"; // 🔁 Change this to your email

// ── MAIN SETUP FUNCTION — Run this once ──
function setupExpenseTracker() {
  const ss = createSheet();
  const form = createForm(ss);
  setupTriggers(ss, form);

  // Show confirmation with links
  const sheetUrl = ss.getUrl();
  const formUrl = form.getPublishedUrl();

  Logger.log("✅ Setup Complete!");
  Logger.log("📊 Sheet URL: " + sheetUrl);
  Logger.log("📝 Form URL: " + formUrl);

  // Email yourself the links
  MailApp.sendEmail({
    to: EMAIL,
    subject: "✅ Expense Tracker is Ready!",
    body:
      `Your Expense Tracker has been set up successfully!\n\n` +
      `📊 Google Sheet: ${sheetUrl}\n` +
      `📝 Google Form: ${formUrl}\n\n` +
      `Share the form link to start logging expenses.\n` +
      `You'll receive a weekly summary every Monday at 8am.`,
  });
}

// ── 1. CREATE GOOGLE SHEET ──
function createSheet() {
  const ss = SpreadsheetApp.create("Expense Tracker");

  // Rename default sheet to "Expenses"
  const expSheet = ss.getActiveSheet();
  expSheet.setName("Expenses");

  // Add headers to Expenses sheet
  const headers = ["Timestamp", "Name", "Category", "Amount (₹)", "Notes"];
  expSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  expSheet
    .getRange(1, 1, 1, headers.length)
    .setBackground("#1a73e8")
    .setFontColor("white")
    .setFontWeight("bold");
  expSheet.setFrozenRows(1);

  // Create Summary sheet
  const sumSheet = ss.insertSheet("Summary");

  // Summary headers
  const sumHeaders = ["Category", "Total Spent (₹)", "Budget (₹)", "Status"];
  sumSheet.getRange(1, 1, 1, sumHeaders.length).setValues([sumHeaders]);
  sumSheet
    .getRange(1, 1, 1, sumHeaders.length)
    .setBackground("#1a73e8")
    .setFontColor("white")
    .setFontWeight("bold");

  // Default categories and budgets
  const categories = [
    ["Food", 0, 3000],
    ["Transport", 0, 1500],
    ["Shopping", 0, 2000],
    ["Entertainment", 0, 1000],
    ["Other", 0, 1000],
  ];
  sumSheet.getRange(2, 1, categories.length, 3).setValues(categories);
  sumSheet.setFrozenRows(1);

  // Auto-resize columns
  expSheet.autoResizeColumns(1, 5);
  sumSheet.autoResizeColumns(1, 4);

  Logger.log("✅ Sheet created: " + ss.getUrl());
  return ss;
}

// ── 2. CREATE GOOGLE FORM ──
function createForm(ss) {
  const form = FormApp.create("Log My Expense");
  form.setDescription("Track your daily expenses easily.");
  form.setConfirmationMessage(
    "✅ Expense logged! Keep tracking your spending.",
  );

  // Question 1: Name
  form.addTextItem().setTitle("Your Name").setRequired(true);

  // Question 2: Category (dropdown)
  form
    .addListItem()
    .setTitle("Category")
    .setChoiceValues([
      "Food",
      "Transport",
      "Shopping",
      "Entertainment",
      "Other",
    ])
    .setRequired(true);

  // Question 3: Amount
  const amountItem = form.addTextItem();
  amountItem.setTitle("Amount (₹)").setRequired(true);

  // Question 4: Notes
  form.addTextItem().setTitle("Notes (optional)").setRequired(false);

  // Link form responses to the Expenses sheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // Rename the auto-created response sheet to "Expenses"
  // (Google creates a new tab — we'll handle merging in the trigger)

  Logger.log("✅ Form created: " + form.getPublishedUrl());
  return form;
}

// ── 3. SETUP TRIGGERS ──
function setupTriggers(ss, form) {
  // Remove any existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach((t) => ScriptApp.deleteTrigger(t));

  // Trigger 1: On form submit → update summary + check budget
  ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();

  // Trigger 2: Weekly email report every Monday at 8am
  ScriptApp.newTrigger("sendWeeklyReport")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(8)
    .create();

  Logger.log("✅ Triggers set up successfully");
}

// ── 4. ON FORM SUBMIT — Update Summary & Check Budget ──
function onFormSubmit(e) {
  updateSummary();
  checkBudgetAlert();
}

// ── 5. UPDATE SUMMARY SHEET ──
function updateSummary() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || getTrackerSheet();

  // Find the responses sheet (linked by form)
  let expSheet =
    ss.getSheetByName("Form Responses 1") || ss.getSheetByName("Expenses");

  const sumSheet = ss.getSheetByName("Summary");
  if (!expSheet || !sumSheet) return;

  const data = expSheet.getDataRange().getValues();
  const totals = {};

  for (let i = 1; i < data.length; i++) {
    // Form response columns: Timestamp, Name, Category, Amount, Notes
    const category = data[i][2];
    const amount = parseFloat(data[i][3]) || 0;
    if (category) totals[category] = (totals[category] || 0) + amount;
  }

  const categories = sumSheet.getRange("A2:A6").getValues();

  categories.forEach((row, index) => {
    const cat = row[0];
    const total = totals[cat] || 0;
    const budget = parseFloat(sumSheet.getRange(index + 2, 3).getValue()) || 0;
    const rowRef = index + 2;

    // Write total
    sumSheet.getRange(rowRef, 2).setValue(total);

    // Status column
    if (total > budget) {
      sumSheet
        .getRange(rowRef, 2)
        .setBackground("#FF4C4C")
        .setFontColor("white");
      sumSheet.getRange(rowRef, 4).setValue("⚠️ Over Budget");
    } else if (total > budget * 0.8) {
      sumSheet
        .getRange(rowRef, 2)
        .setBackground("#FFA500")
        .setFontColor("white");
      sumSheet.getRange(rowRef, 4).setValue("⚡ Near Limit");
    } else {
      sumSheet
        .getRange(rowRef, 2)
        .setBackground("#C6EFCE")
        .setFontColor("#276221");
      sumSheet.getRange(rowRef, 4).setValue("✅ On Track");
    }
  });
}

// ── 6. BUDGET ALERT EMAIL ──
function checkBudgetAlert() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sumSheet = ss.getSheetByName("Summary");
  if (!sumSheet) return;

  const data = sumSheet.getRange("A2:C6").getValues();
  let alertMsg = "";

  data.forEach((row) => {
    const [category, spent, budget] = row;
    if (parseFloat(spent) > parseFloat(budget)) {
      alertMsg += `⚠️ ${category}: Spent ₹${spent} / Budget ₹${budget}\n`;
    }
  });

  if (alertMsg) {
    MailApp.sendEmail({
      to: EMAIL,
      subject: "🚨 Budget Alert — Expense Tracker",
      body: `You've exceeded your budget!\n\n${alertMsg}\nLog in to review your expenses.`,
    });
  }
}

// ── 7. WEEKLY REPORT EMAIL ──
function sendWeeklyReport() {
  const files = DriveApp.getFilesByName("Expense Tracker");
  if (!files.hasNext()) return;

  const ss = SpreadsheetApp.openById(files.next().getId());
  const sumSheet = ss.getSheetByName("Summary");
  if (!sumSheet) return;

  const data = sumSheet.getRange("A2:C6").getValues();
  let body = "📊 Weekly Expense Summary\n";
  body += "─────────────────────────\n";
  let total = 0;

  data.forEach((row) => {
    const [cat, spent, budget] = row;
    const s = parseFloat(spent) || 0;
    const b = parseFloat(budget) || 0;
    const status = s > b ? "🔴 OVER" : s > b * 0.8 ? "🟡 NEAR" : "🟢 OK";
    body += `${cat}: ₹${s} / ₹${b}  ${status}\n`;
    total += s;
  });

  body += `─────────────────────────\n`;
  body += `Total This Week: ₹${total}\n\nKeep it up! 💪`;

  MailApp.sendEmail({ to: EMAIL, subject: "📊 Weekly Expense Report", body });
}
