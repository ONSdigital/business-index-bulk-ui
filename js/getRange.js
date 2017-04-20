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

  var rangeOutput = [[industryCode],
                     [employmentBand],
                     [turnover]];

  var rangeValues = [["%5B",industryCode1, " TO ", industryCode2,"%5D"],
                     ["%5B",employmentBand1, " TO ", employmentBand2,"%5D"],
                     ["%5B",turnover1, " TO ", turnover2,"%5D"]];

  rangeValues.forEach(function(y){
     if(y[1] !== "" && y[3] === ""){
       rangeOutput[rangeValues.indexOf(y)] = y[1].toString();
     }
     else if(y[1] !== "" && y[3] !== ""){
       var joinedQuery = y.join("");
       rangeOutput[rangeValues.indexOf(y)] = joinedQuery;
     }
     else {
       rangeOutput[rangeValues.indexOf(y)] = "";
     }
  });
  return rangeOutput;
}

function compareIndustryCode(){
  var industryCode1 = document.getElementById("industryCode").value;
  var industryCode2 = document.getElementById("industryCode2").value;
  if (industryCode1 > industryCode2){
    alert("Error: Industry Code Max Range is less than Industry Code Min Range");
    return false;
  }
  else{
    return true;
  }
}

function queryValidation(){
  var industryCodeValid = document.getElementById("industryCode").checkValidity();
  var industryCode2Valid = document.getElementById("industryCode2").checkValidity();
  var vatNumberValid = document.getElementById("vatNumber").checkValidity();
  var companyNumberValid = document.getElementById("companyNumber").checkValidity();
  var payeReferenceValid = document.getElementById("payeReference").checkValidity();
  var postCodeValid = document.getElementById("PostCode").checkValidity();
  var minMaxValidation = compareIndustryCode();

  if (minMaxValidation && industryCodeValid && industryCode2Valid && vatNumberValid && companyNumberValid && payeReferenceValid && postCodeValid){
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
  checkedValues.forEach(function(x){
      var checkboxes = document.getElementsByName(x+"[]");
      var emptyCheckBox = true;
      checkboxesChecked.push("(");
      checkboxes.forEach(function(i){
      if (i.checked){
        checkboxesChecked.push(x+":");
        checkboxesChecked.push(i.value);
        checkboxesChecked.push(" OR ");
        emptyCheckBox = false;
      }
    });
    if (!emptyCheckBox){
      checkboxesChecked.pop();
      checkboxesChecked.push(")");
      checkboxesChecked.push(" AND ");
    }
    else{
      checkboxesChecked.pop();
    }
  });
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
  if (boxQuery !== ""){
    bulkQuery.push(boxQuery);
    bulkQuery.push(" AND ");
  }
  values.forEach(function(x){
   if (x[1] !== "" && x[1] !== "()" && typeof x[1] !== "undefined"){
      bulkQuery.push(x[0]);
      bulkQuery.push(x[1]);
      bulkQuery.push(" AND ");
    }
  });
  bulkQuery.pop();
  downloadFile(bulkQuery);
}

function getBulkQuery(bulkType){
  var values = [];
  var businessName = document.getElementById("businessName").value.toString();
  var vatNumber = document.getElementById("vatNumber").value.toString();
  var companyNumber = document.getElementById("companyNumber").value.toString().toUpperCase();
  var payeReference = document.getElementById("payeReference").value.toString().toUpperCase();
  var postCode = document.getElementById("PostCode").value.toString().toUpperCase();
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
}
