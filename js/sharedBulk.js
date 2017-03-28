var multiBulkQuery = [];
var firstRun = 1;

function getInputs(bulkType){
  var selectCategory;
  if (bulkType === "single" && firstRun === 1){
    selectCategory = document.getElementById("select").value.toString();
    multiBulkQuery.push(selectCategory+"\n");
    firstRun=0;
  }
  else if (bulkType ==="multi" && firstRun === 1 || bulkType === "range" && firstRun === 1){
    multiBulkQuery.push("Request"+"\n");
    firstRun=0;
  }
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

function downloadCSV(){
  if (multiBulkQuery.length !== 0 && multiBulkQuery.length !== 1)
  {
    var joinQuery = multiBulkQuery.join("");
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

/****************JQUERY*****************/

$("#select").change(function () {
  document.getElementById("selectEntry").placeholder="Enter "+ document.getElementById("select").value.toString();
});

$("#industryCode").keyup(function() {
  $("#industryCode").val(this.value.match(/[0-9]*/));
});

$("#industryCode2").keyup(function() {
  $("#industryCode2").val(this.value.match(/[0-9]*/));
});

$("#vatNumber").keyup(function() {
  $("#vatNumber").val(this.value.match(/[0-9]*/));
});

$(document).ready(function(){
  $("[data-toggle='popover']").popover();
});

$(document).on("blur","[data-toggle='popover']", function() {
   $(this).popover("hide");
});
