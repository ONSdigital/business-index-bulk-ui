//global variable for array used throughout
var multiBulkQuery = [];
multiBulkQuery.push("["+"\n");

/**
  * @function getBulkQuery(bulkType)
  *
  * @param {String} bulkType - Type of bulk being sent to the API
  *
  * @description Gets user input and formats it for download
  *
  * @return {String} query - query string
  *
*/
function getBulkQuery(bulkType){
  var values = [];
  var arr = [];
  var query;
  var queryEnd = "";
  var firstUse = true;

  var businessName = document.getElementById("businessName").value.toString();
  var industryCode = document.getElementById("industryCode").value.toString();
  var vatNumber = document.getElementById("vatNumber").value.toString();
  var companyNumber = document.getElementById("companyNumber").value.toString();
  var payeReference = document.getElementById("payeReference").value.toString();
  var employmentBand = document.getElementById("employmentband").value.toString();
  var legalStatus = document.getElementById("legalStatus").value.toString();
  var turnover = document.getElementById("turnover").value.toString();
  var tradingStatus = document.getElementById("tradingstatus").value.toString();
  var postCode = document.getElementById("PostCode").value.toString();
  queryEnd = "\"},";
  values = [["BusinessName=",businessName],
            ["IndustryCode=",industryCode],
            ["VatRefs=",vatNumber],
            ["CompanyNo=",companyNumber],
            ["PayeRefs=",payeReference],
            ["EmploymentBands=",employmentBand],
            ["LegalStatus=",legalStatus],
            ["Turnover=",turnover],
            ["TradingStatus=",tradingStatus],
            ["PostCode=",postCode]];
  generateList(values, queryEnd, bulkType, firstUse);
}


function downloadJSON(){
  if (multiBulkQuery.length !== 0)
  {
    var joinQuery =  multiBulkQuery.join("");
    var modifiedString = joinQuery.replace(/,\s*$/, "\n"+"]");
    var JSON = modifiedString;
    var uri = "data:text/json;charset=utf-8," + escape(JSON);
    var link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", "my_data.json");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
  }
}


// When entering a value that is not 0-9 the field resets
$("#industryCode").keyup(function() {
  $("#industryCode").val(this.value.match(/[0-9]*/));
});

$("#vatNumber").keyup(function() {
  $("#vatNumber").val(this.value.match(/[0-9]*/));
});
