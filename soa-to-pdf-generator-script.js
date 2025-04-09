function generatePDF() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("soa_generator"); // Change to your sheet name
  var folderId = "148SS9cQf5Z_zK_yfw4468r3JEYqNOXPE"; // Replace with your Google Drive folder ID

  // Get values from the last row
  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

  var date = data[0]; // Column A (Date)
  var repaymentDate = data[1]; // Column B (Repayment Date)
  var repaymentAmount = data[2]; // Column C (Repayment Amount)
  var soaNumber = data[3]; // Column D (SOA Number)
  var nbfcName = data[4]; // Column E (NBFC Name)
  var partnerName = data[5]; // Column F (Partner Name)
  var partnerLegalName = data[6]; // Column G (Partner Legal Name)
  var partnerAddress = data[7]; // Column H (Partner Address)
  var soaFormatPrefix = data[8]; // Column I (File Header - Prefix) **Used as PDF Title & Filename**
  var bankAccountNumber = data[9]; // Column J (Bank Account Number)
  var bankName = data[10]; // Column K (Bank Name)
  var bankAddress = data[11]; // Column L (Bank Address)
  var ifscRtgsCode = data[12]; // Column M (IFSC / RTGS Code)

  // Get the next SOA number based on existing files in Drive
  var newSoaNumber = getNextSoaNumber(soaFormatPrefix, folderId);
  
  // Full SOA identifier: <soaFormatPrefix><soaNumber>
  var fullSoaIdentifier = soaFormatPrefix + newSoaNumber;

  // Store the generated SOA Number in column "O" (15th column)
  // sheet.getRange(lastRow, 15).setValue(newSoaNumber);

  // Generate HTML content for the PDF
  var html = "<html><head><style>";
  html += "body { font-family: Arial, sans-serif; }";
  html += "h2 { text-align: center; font-size: 16px; }";
  html += "h3 { text-align: center; font-size: 12px; }";
  html += "table { border-collapse: collapse; width: 100%; }";
  html += "th, td { border: 1px solid black; padding: 8px; text-align: left; }";
  html += "th { background-color: #f2f2f2; }";
  html += "strong { font-weight: bold; }";
  html += "</style></head><body>";

  // PDF Header (from bankName)
  html += "<h2>" + fullSoaIdentifier + "</h2>";

  // Partner details (Top Left)
  html += "<p><strong>To,</strong><br>" + partnerLegalName + ",<br>" + partnerAddress + "</p>";

  // Date (Top Right)
  html += "<p style='text-align: left;'><strong>" + date + "</strong></p>";

  // Repayment Table
  html += "<table><tr><th>Description</th><th>Repayment Amount</th><th>Due Date</th></tr>";
  html += "<tr><td>Repayment</td><td>" + repaymentAmount + "</td><td>" + repaymentDate + "</td></tr>";
  html += "<tr><td><strong>Total</strong></td><td><strong>" + repaymentAmount + "</strong></td><td></td></tr>";
  html += "</table><br>";

  // Note
  html += "<p><strong>Note: Since this is a repayment and not an Invoice, no TDS is applicable on the same. In case of any clarification kindly contact account@karmalife.ai.</strong></p>";
  html += "<p>We request you to make the payment on or before the due date to the below mentioned account.</p>";

  // Bank Details
  html += "<p><strong>Beneficiary Bank Account No.:</strong> " + bankAccountNumber + "</p>";
  html += "<p><strong>Bank Name:</strong> " + bankName + "</p>";
  html += "<p><strong>Branch Address:</strong> " + bankAddress + "</p>";
  html += "<p><strong>IFSC/RTGS Code:</strong> " + ifscRtgsCode + "</p>";
  html += "<h3>*** This is a computer-generated document. No signature is required. ***</h3>";

  html += "</body></html>";

  // Use fullSoaIdentifier as the file name and header
  var pdfFilename = fullSoaIdentifier + ".pdf";

  var blob = HtmlService.createHtmlOutput(html).getAs('application/pdf').setName(pdfFilename);
  
  // Save PDF to Google Drive
  var folder = DriveApp.getFolderById(folderId);
  var file = folder.createFile(blob);
  
  // Insert file URL in the next available column in the same row
  //var pdfUrlColumn = sheet.getLastRow() + 1;
  //sheet.getRange(lastRow + 1, pdfUrlColumn).setValue(file.getUrl());
}