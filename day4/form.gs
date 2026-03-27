function createInvoiceForm() {
  // Create Google Form
  var form = FormApp.create("Invoice Entry Form");

  form.addTextItem().setTitle("Invoice No");
  form.addDateItem().setTitle("Date");
  form.addTextItem().setTitle("Customer Name");
  form.addTextItem().setTitle("Customer Email");
  form.addTextItem().setTitle("Product");
  form.addTextItem().setTitle("Quantity");
  form.addTextItem().setTitle("Price");

  // Create Google Sheet to store responses
  var sheet = SpreadsheetApp.create("Invoice Responses");

  // Link form to sheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log("Form Link: " + form.getPublishedUrl());
  Logger.log("Sheet Link: " + sheet.getUrl());
}
