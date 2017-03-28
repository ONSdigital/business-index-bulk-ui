function getRangeInputs(){
  var industryCode1 = document.getElementById("industryCode").value.toString();
  var industryCode2 = document.getElementById("industryCode2").value.toString();
  var employmentBand1 = document.getElementById("employmentBand").value.toString();
  var employmentBand2 = document.getElementById("employmentBand2").value.toString();
  var turnover1 = document.getElementById("turnover").value.toString();
  var turnover2 = document.getElementById("turnover2").value.toString();
  var industryCode;
  var employmentBand;
  var turnover;

  var rangeValues = [["[",industryCode1, " TO ", industryCode2,"]"],
                     ["[",employmentBand1, " TO ", employmentBand2,"]"],
                     ["[",turnover1, " TO ", turnover2,"]"]];

  if(rangeValues[0][1] !== "" && rangeValues[0][3] === ""){
    industryCode = rangeValues[0][1];
  }
  else if(rangeValues[0][1] !== "" && rangeValues[0][3] !== ""){
    industryCode = rangeValues[0];
  }

  if(rangeValues[1][1] !== "" && rangeValues[1][3] === ""){
    employmentBand = rangeValues[1][1];
  }
  else if(rangeValues[1][1] !== "" && rangeValues[1][3] !== ""){
    employmentBand = rangeValues[1];
  }

  if(rangeValues[2][1] !== "" && rangeValues[2][3] === ""){
    turnover = rangeValues[2][1];
  }
  else if(rangeValues[2][1] !== "" && rangeValues[2][3] !== ""){
    turnover = rangeValues[2];
  }
  return [industryCode,employmentBand,turnover];
}

function getBulkQuery(bulkType){
  getInputs(bulkType);
  var values = [];
  var businessName = document.getElementById("businessName").value.toString();
  var vatNumber = document.getElementById("vatNumber").value.toString();
  var companyNumber = document.getElementById("companyNumber").value.toString();
  var payeReference = document.getElementById("payeReference").value.toString();
  var postCode = document.getElementById("PostCode").value.toString();
  var valid = queryValidation();
  var rangeValues = getRangeInputs();
  var industryCode = rangeValues[0];
  var employmentBand = rangeValues[1];
  var turnover = rangeValues[2];

  // get checkbox inputs
  // var legalStatus = document.getElementById("legalStatus").value.toString();
  // var tradingStatus = document.getElementById("tradingstatus").value.toString();
  // ["LegalStatus:",legalStatus],
  // ["TradingStatus:",tradingStatus],

  values = [["BusinessName:","("+businessName+")"],
            ["IndustryCode:",industryCode],
            ["EmploymentBands:",employmentBand],
            ["Turnover:",turnover],
            ["VatRefs:",vatNumber],
            ["CompanyNo:",companyNumber],
            ["PayeRefs:",payeReference],
            ["PostCode:","("+postCode+")"]];
  if (valid){
    //download queryCSV
  }
  else {
    //alert or display error message
  }
}

function getCheckBoxInputs(boxParam){
  var checkboxes = document.getElementsByName(boxParam+'[]');
  var checkboxesChecked = [];

  for (var i in checkboxes)
  if (checkboxes[i].checked){
      checkboxesChecked.push(boxParam+":");
      checkboxesChecked.push(checkboxes[i].value);
      checkboxesChecked.push(" OR ");
    }
    checkboxesChecked.pop();
    var checkQuery = checkboxesChecked.join("");
    return checkQuery;
}
