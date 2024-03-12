function autoEntry() {


  var wrkBk = SpreadsheetApp.getActiveSpreadsheet(); 
  var wrkSht = wrkBk.getSheetByName("Data");

  var formURL = ""
  var formData = ""

  var ageConf = ""
  var ageB = ""
  var gender = ""
  var physDisability = ""
  var areaRes = ""
  var houseExpenditure = ""
  var personalVeh = ""
  var houseMembers = ""
  var amenities1 = ""
  var amenities2 = ""
  var amenities3 = ""
  var amenities4 = ""
  var amenities5 = ""
  var modeTransport1 = ""
  var modeTransport2 = ""
  var footQual = ""
  var changeWalk = ""
  var connectivity = ""
  var connectivityChange = ""
  var visit = ""
  var openChange = ""
  var amenitiesImp1 = ""
  var amenitiesImp2 = ""
  var amenitiesImp3 = ""
  var amenitiesImp4 = ""
  var amenitiesImp5 = ""
  var neighBetter = ""
  var digiTool = ""
  var neighProj = ""

  var noOfRows = 26;

  for (i=2;i<=noOfRows;i++)
  {
    ageConf = wrkSht.getRange("A" + i).getDisplayValue();
    ageB = wrkSht.getRange("B" + i).getDisplayValue();
    gender = wrkSht.getRange("C" + i).getDisplayValue();
    physDisability = wrkSht.getRange("D" + i).getDisplayValue();
    areaRes = wrkSht.getRange("E" + i).getDisplayValue();
    houseExpenditure = wrkSht.getRange("F" + i).getDisplayValue();
    personalVeh = wrkSht.getRange("G" + i).getDisplayValue();
    houseMembers = wrkSht.getRange("H" + i).getDisplayValue();
    amenities1 = wrkSht.getRange("I" + i).getDisplayValue();
    amenities2 = wrkSht.getRange("J" + i).getDisplayValue();
    amenities3 = wrkSht.getRange("K" + i).getDisplayValue();
    amenities4 = wrkSht.getRange("L" + i).getDisplayValue();
    amenities5 = wrkSht.getRange("M" + i).getDisplayValue();
    modeTransport1 = wrkSht.getRange("N" + i).getDisplayValue();
    modeTransport2 = wrkSht.getRange("O" + i).getDisplayValue();
    footQual = wrkSht.getRange("P" + i).getDisplayValue();
    changeWalk = wrkSht.getRange("Q" + i).getDisplayValue();
    connectivity = wrkSht.getRange("R" + i).getDisplayValue();
    connectivityChange = wrkSht.getRange("S" + i).getDisplayValue();
    visit = wrkSht.getRange("T" + i).getDisplayValue();
    openChange = wrkSht.getRange("U" + i).getDisplayValue();
    amenitiesImp1 = wrkSht.getRange("V" + i).getDisplayValue();
    amenitiesImp2 = wrkSht.getRange("W" + i).getDisplayValue();
    amenitiesImp3 = wrkSht.getRange("X" + i).getDisplayValue();
    amenitiesImp4 = wrkSht.getRange("Y" + i).getDisplayValue();
    amenitiesImp5 = wrkSht.getRange("Z" + i).getDisplayValue();
    neighBetter = wrkSht.getRange("AA" + i).getDisplayValue();
    digiTool = wrkSht.getRange("AB" + i).getDisplayValue();
    neighProj = wrkSht.getRange("AC" + i).getDisplayValue();

    formURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdObuORbUzDXjAszW1XtcU-yFFlYvRUmG8JmAeRND85Y0mRdw/formResponse?&pageHistory=0,1";
    formData = "&entry.1624901588="+ ageConf + "&entry.1977454013="+ ageB + "&entry.1092411006="+ gender + "&entry.942327380="+ physDisability + "&entry.536800224="+ areaRes + "&entry.1614513875="+ houseExpenditure + "&entry.1029624330="+ personalVeh + "&entry.280942386="+ houseMembers + "&entry.1964120190="+ amenities1 + "&entry.2098921428="+ amenities2 + "&entry.2110606122="+ amenities3 + "&entry.1524012522="+ amenities4 + "&entry.1055178596="+ amenities5 + "&entry.1239952442="+ modeTransport1 + "&entry.1395941803="+ modeTransport2 + "&entry.1846853843="+ footQual + "&entry.1555114485="+ changeWalk + "&entry.1277503721="+ connectivity + "&entry.878648443="+ connectivityChange + "&entry.548964918="+ visit + "&entry.1198942516="+ openChange + "&entry.1471417721="+ amenitiesImp1 + "&entry.624818708="+ amenitiesImp2 + "&entry.626246987="+ amenitiesImp3 + "&entry.1124819633="+ amenitiesImp4 + "&entry.77527059="+ amenitiesImp5 + "&entry.365700531="+ neighBetter + "&entry.1593046912="+ digiTool + "&entry.285126952="+ neighProj;

    var finalURL = formURL + formData
    finalURL = encodeURI(finalURL);
    var options = {
      "method" : "post"
  };
            var urlEncoded = encodeURI(finalURL) 
            UrlFetchApp.fetch(finalURL, options);
  }
  
}