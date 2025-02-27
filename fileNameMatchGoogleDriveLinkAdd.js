function matchFilesWithSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  if (!sheet) {
    Logger.log("Sheet not found");
    return;
  }
  var folderId = '1Bmh84B-GHm19KAOQjqFuzoS29bIJUHWT'; // Replace with the actual folder ID
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  
  var fileMap = {};
  while (files.hasNext()) {
    var file = files.next();
    fileMap[file.getName()] = file.getUrl();
  }
  
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) { // Assuming first row is headers
    var trxnId = data[i][13]; // Adjusted for column N (index 14)
    if (fileMap[trxnId]) {
      sheet.getRange(i + 1, 15).setValue(fileMap[trxnId]); // Adjusted for column O (index 15)
    }
  }
}

