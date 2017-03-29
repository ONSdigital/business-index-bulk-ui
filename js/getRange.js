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
    industryCode = rangeValues[0].join("");
  }

  if(rangeValues[1][1] !== "" && rangeValues[1][3] === ""){
    employmentBand = rangeValues[1][1];
  }
  else if(rangeValues[1][1] !== "" && rangeValues[1][3] !== ""){
    employmentBand = rangeValues[1].join("");
  }

  if(rangeValues[2][1] !== "" && rangeValues[2][3] === ""){
    turnover = rangeValues[2][1];
  }
  else if(rangeValues[2][1] !== "" && rangeValues[2][3] !== ""){
    turnover = rangeValues[2].join("");
  }
  return [industryCode,employmentBand,turnover];
}

function queryValidation(){
  var industryCodeValid = document.getElementById("industryCode").checkValidity();
  var industryCode2Valid = document.getElementById("industryCode2").checkValidity();
  var vatNumberValid = document.getElementById("vatNumber").checkValidity();
  var companyNumberValid = document.getElementById("companyNumber").checkValidity();
  var payeReferenceValid = document.getElementById("payeReference").checkValidity();
  var postCodeValid = document.getElementById("PostCode").checkValidity();

  if (industryCodeValid && industryCode2Valid && vatNumberValid && companyNumberValid && payeReferenceValid && postCodeValid){
    return true;
  }
  else {
    return false;
  }
}

function getCheckBoxInputs(){
  var checkboxesChecked = [];
  var checkedValues = [["LegalStatus"],
                       ["TradingStatus"]];
  for (var x in checkedValues){
      var empty = true;
      var checkboxes = document.getElementsByName(checkedValues[x]+"[]");
      checkboxesChecked.push("(");
      for (var i =0; i < checkboxes.length; i++){
      if (checkboxes[i].checked){
        checkboxesChecked.push(checkedValues[x]+":");
        checkboxesChecked.push(checkboxes[i].value);
        checkboxesChecked.push(" OR ");
        empty = false;
      }
    }
    if (!empty){
      checkboxesChecked.pop();
      checkboxesChecked.push(")");
    }
    checkboxesChecked.push(" AND ");
  }
  checkboxesChecked.pop();
  var checkQuery = checkboxesChecked.join("");
  return checkQuery;
}

function downloadFile(bulkQuery){
  if (bulkQuery.length !== 0 && bulkQuery.length !== 1)
  {
  var joinQuery = bulkQuery.join("");
  var modifiedString = joinQuery.replace(/[}",]/g, "");
  var CSV = modifiedString;
  var uri = "data:text/csv;charset=utf-8," + escape(CSV);
  var link = document.createElement("a");
  link.setAttribute("href", uri);
  link.setAttribute("download", "query_list.csv");
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "my_data.csv".
  }
}

function getQuery(values){
  var bulkQuery = [];
  bulkQuery.push("Request"+"\n");
  var boxQuery = getCheckBoxInputs();
  if (boxQuery !== "" && boxQuery !== "( AND ("){
    bulkQuery.push(boxQuery);
    bulkQuery.push(" AND ");
  }
  for(var x in values){
   if (values[x][1] !== "" && values[x][1] !== "()" && typeof values[x][1] !== "undefined"){
      bulkQuery.push(values[x][0]);
      bulkQuery.push(values[x][1]);
      bulkQuery.push(" AND ");
    }
  }
  bulkQuery.pop();
  downloadFile(bulkQuery);
}

function getBulkQuery(bulkType){
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
    getQuery(values);
  }
  else {
    //alert or display error message
  }
}
