function onFormSubmit(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Form Responses 1");
    var lastRow = sheet.getLastRow();

    // Get all values from the form
    var invoiceNo = sheet.getRange(lastRow, 2).getValue();
    var date = sheet.getRange(lastRow, 3).getValue();
    var name = sheet.getRange(lastRow, 4).getValue();
    var email = sheet.getRange(lastRow, 5).getValue();
    var product = sheet.getRange(lastRow, 6).getValue();
    var qty = sheet.getRange(lastRow, 7).getValue();
    var price = sheet.getRange(lastRow, 8).getValue();
    var total = qty * price;

    Logger.log("===== INVOICE PROCESSING START =====");
    Logger.log("Invoice No: " + invoiceNo);
    Logger.log("Email: " + email);
    Logger.log("Customer: " + name);

    // ===== STEP 1: VALIDATE EMAIL =====
    var emailTrimmed = String(email).trim();

    if (!emailTrimmed || emailTrimmed === "" || emailTrimmed === "undefined") {
      Logger.log("ERROR: Email is empty. No invoice sent.");
      return;
    }

    if (!emailTrimmed.includes("@")) {
      Logger.log("ERROR: Invalid email format: " + emailTrimmed);
      return;
    }

    Logger.log("✓ Email validation passed: " + emailTrimmed);

    // ===== STEP 2: CREATE OR UPDATE INVOICE SHEET =====
    var sheetName = "Invoice_" + invoiceNo;
    var invoiceSheet = null;

    try {
      // Try to get existing sheet
      invoiceSheet = ss.getSheetByName(sheetName);
      Logger.log("Sheet already exists, clearing old data");
      invoiceSheet.clearContents();
    } catch (sheetError) {
      // Sheet doesn't exist, create new one
      invoiceSheet = ss.insertSheet(sheetName);
      Logger.log("✓ Created new invoice sheet: " + sheetName);
    }

    // ===== STEP 3: FILL INVOICE DATA =====
    invoiceSheet.getRange("A1").setValue("INVOICE");
    invoiceSheet.getRange("A1").setFontWeight("bold");
    invoiceSheet.getRange("A1").setFontSize(16);

    invoiceSheet.getRange("A3").setValue("Invoice No:");
    invoiceSheet.getRange("B3").setValue(invoiceNo);

    invoiceSheet.getRange("A4").setValue("Customer Name:");
    invoiceSheet.getRange("B4").setValue(name);

    invoiceSheet.getRange("A5").setValue("Date:");
    invoiceSheet.getRange("B5").setValue(date);

    invoiceSheet.getRange("A6").setValue("Product:");
    invoiceSheet.getRange("B6").setValue(product);

    invoiceSheet.getRange("A7").setValue("Quantity:");
    invoiceSheet.getRange("B7").setValue(qty);

    invoiceSheet.getRange("A8").setValue("Unit Price:");
    invoiceSheet.getRange("B8").setValue(price);

    invoiceSheet.getRange("A9").setValue("Total Amount:");
    invoiceSheet.getRange("B9").setValue(total);
    invoiceSheet.getRange("B9").setFontWeight("bold");

    Logger.log("✓ Invoice data filled in sheet");

    // ===== STEP 4: GENERATE PDF =====
    var url =
      ss.getUrl().replace(/edit$/, "") +
      "export?format=pdf&gid=" +
      invoiceSheet.getSheetId();

    Logger.log("PDF URL: " + url);

    var token = ScriptApp.getOAuthToken();
    Logger.log("✓ OAuth token obtained");

    var response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
      muteHttpExceptions: true,
    });

    var responseCode = response.getResponseCode();
    Logger.log("PDF fetch response code: " + responseCode);

    if (responseCode !== 200) {
      Logger.log("ERROR: PDF generation failed with code " + responseCode);
      return;
    }

    var blob = response.getBlob().setName("Invoice_" + invoiceNo + ".pdf");
    var blobSize = blob.getBytes().length;
    Logger.log("✓ PDF generated successfully, size: " + blobSize + " bytes");

    // ===== STEP 5: SAVE PDF TO GOOGLE DRIVE =====
    try {
      var file = DriveApp.createFile(blob);
      Logger.log("✓ PDF saved to Google Drive: " + file.getName());
    } catch (driveError) {
      Logger.log(
        "WARNING: Could not save PDF to Drive - " + driveError.toString(),
      );
      // Don't return - still send email even if Drive save fails
    }

    // ===== STEP 6: SEND EMAIL WITH PDF ATTACHMENT =====
    Logger.log("--- ATTEMPTING TO SEND EMAIL ---");
    Logger.log("To: " + emailTrimmed);
    Logger.log("Subject: Your Invoice #" + invoiceNo);
    Logger.log(
      "Attachment: Invoice_" + invoiceNo + ".pdf (" + blobSize + " bytes)",
    );

    var emailSubject = "Your Invoice #" + invoiceNo;
    var emailBody =
      "Dear " +
      name +
      ",\n\n" +
      "Thank you for your business. Please find attached your invoice.\n\n" +
      "========== INVOICE DETAILS ==========\n" +
      "Invoice No: " +
      invoiceNo +
      "\n" +
      "Date: " +
      date +
      "\n" +
      "Product: " +
      product +
      "\n" +
      "Quantity: " +
      qty +
      "\n" +
      "Unit Price: " +
      price +
      "\n" +
      "Total Amount: " +
      total +
      "\n" +
      "=====================================\n\n" +
      "If you have any questions, please feel free to contact us.\n\n" +
      "Best regards,\nInvoice System";

    try {
      GmailApp.sendEmail(emailTrimmed, emailSubject, emailBody, {
        attachments: [blob],
      });

      Logger.log("✓✓✓ EMAIL SENT SUCCESSFULLY ✓✓✓");
      Logger.log("Email delivered to: " + emailTrimmed);
      Logger.log("===== INVOICE PROCESSING COMPLETE =====");
    } catch (emailError) {
      Logger.log("❌ ERROR SENDING EMAIL");
      Logger.log("Error details: " + emailError.toString());
      Logger.log("Error message: " + emailError.message);
      Logger.log("===== INVOICE PROCESSING FAILED AT EMAIL STEP =====");
      throw emailError;
    }
  } catch (mainError) {
    Logger.log("❌ CRITICAL ERROR IN INVOICE PROCESSING");
    Logger.log("Error: " + mainError.toString());
    Logger.log("Message: " + mainError.message);
    Logger.log("===== INVOICE PROCESSING HALTED =====");
  }
}
