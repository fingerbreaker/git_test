function getNextSoaNumber(soaFormatPrefix, folderId) {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var maxSoaNumber = 0;
    
    while (files.hasNext()) {
      var file = files.next();
      var fileName = file.getName().replace(".pdf", "").trim(); // Remove extension and trim spaces
      
      // Match the prefix followed by exactly 3 digits
      var match = fileName.match(new RegExp("^" + soaFormatPrefix + "(\\d{3})$"));
      
      if (match) {
        var existingNumber = parseInt(match[1], 10);
        if (existingNumber > maxSoaNumber) {
          maxSoaNumber = existingNumber;
        }
      }
    }
    
    // Increment the maximum found SOA number
    var newSoaNumber = (maxSoaNumber + 1).toString().padStart(3, "0");
  
    return newSoaNumber; // Returns the next available 3-digit SOA number
  }