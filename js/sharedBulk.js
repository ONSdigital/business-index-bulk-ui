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
  var vatNumberValid = document.getElementById("vatNumber").checkValidity();
  var companyNumberValid = document.getElementById("companyNumber").checkValidity();
  var payeReferenceValid = document.getElementById("payeReference").checkValidity();
  var postCodeValid = document.getElementById("PostCode").checkValidity();

  if (industryCodeValid && vatNumberValid && companyNumberValid && payeReferenceValid && postCodeValid){
    return true;
  }
  else {
    return false;
  }
}

function createBulkList(toAdd){
  for (var x = 1; x < multiBulkQuery.length; x++){
    var replaced = multiBulkQuery[x].replace(/}|{|,|"|"|\)|\(/g,"");
    toAdd += "<h3>" + x.toString() + "." + replaced + "</h3><button type='button' class='btn btn-primary' onclick='deleteBulk("+x.toString()+");'>Delete</button><br>";
  }
  toAdd += "</div>";
  document.getElementById("bulkList").innerHTML = toAdd;
}

function addBulk(query, bulkType){
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulkList' style='width: 30em; float:right; margin-right:20%'><label>List of Queries</label>";
  multiBulkQuery.push(query+ "\n");
  createBulkList(toAdd);
}

function generateList(values, bulkType)
{
  var arr = [];
  var firstUse = true;
  var queryEnd = "";
  // Form the query:
  for(var x in values){
    if (bulkType === "multi" && firstUse &&  values[x][1] !== "" && values[x][1] !== "()"){
      arr.push("\"");
      firstUse = false;
      queryEnd = "\"";
      arr.push(values[x][0]);
      arr.push(values[x][1]);
      arr.push(" AND ");
    }
    else if (bulkType === "multi" && values[x][1] !== "" && values[x][1] !== "()"){
      arr.push(values[x][0]);
      arr.push(values[x][1]);
      arr.push(" AND ");
    }
    else if (bulkType === "single" && values[x][1] !== ""){
      arr.push(values[x][1]);
      arr.push(" AND ");
    }
    else if (bulkType === "range" && values[x][1] !== "" && values[x][2] !== ""){
      arr.push(values[x][0]+"[");
      arr.push(values[x][1]+" TO ");
      arr.push(values[x][2]+"]");
      arr.push(" AND ");
    }
  }
  arr.pop();
  arr.push(queryEnd);
  var query = arr.join("");
  if (query !== queryEnd && query !== ""){
    addBulk(query, bulkType);
  }
}

function deleteBulk(currentIndex){
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulkList' style='width: 30em; float:right; margin-right:20%'><label>List of Queries</label>";
  multiBulkQuery.splice(currentIndex,1);
  if (multiBulkQuery.length === 1){
    toAdd = "";
  }
  createBulkList(toAdd);
}

function getBulkMatch(bulkType){
  getInputs(bulkType);
  var selectCategory = document.getElementById("select").value.toString();
  var selectValue = document.getElementById("selectEntry").value.toString();
  var valid = document.getElementById("selectEntry").checkValidity();
  var values = [[selectCategory+"=",selectValue]];
  if (valid || selectCategory === "BusinessName"){
    generateList(values, bulkType);
  }
  else {
    //alert or red highlight
  }
}

function getRange(bulkType){
  getInputs(bulkType);
  var industryCode1 = document.getElementById("industryCode").value.toString();
  var industryCode2 = document.getElementById("industryCode2").value.toString();
  var valid = document.getElementById("industryCode").checkValidity();
  var valid2 = document.getElementById("industryCode2").checkValidity();
  var values = [["IndustryCode:",industryCode1,industryCode2]];
  if (valid && valid2){
    generateList(values, bulkType);
  }
  else {
    //alert or red highlight
  }
}

function getBulkQuery(bulkType){
  getInputs(bulkType);
  var values = [];
  var businessName = document.getElementById("businessName").value.toString();
  var industryCode = document.getElementById("industryCode").value.toString();
  var vatNumber = document.getElementById("vatNumber").value.toString();
  var companyNumber = document.getElementById("companyNumber").value.toString();
  var payeReference = document.getElementById("payeReference").value.toString();
  var postCode = document.getElementById("PostCode").value.toString();
  var valid = queryValidation();
  var employmentBand = document.getElementById("employmentband").value.toString();
  var legalStatus = document.getElementById("legalStatus").value.toString();
  var turnover = document.getElementById("turnover").value.toString();
  var tradingStatus = document.getElementById("tradingstatus").value.toString();

  values = [["BusinessName:","("+businessName+")"],
            ["IndustryCode:",industryCode],
            ["VatRefs:",vatNumber],
            ["CompanyNo:",companyNumber],
            ["PayeRefs:",payeReference],
            ["EmploymentBands:",employmentBand],
            ["LegalStatus:",legalStatus],
            ["Turnover:",turnover],
            ["TradingStatus:",tradingStatus],
            ["PostCode:","("+postCode+")"]];
  if (valid){
    generateList(values, bulkType);
  }
  else {
    //alert or display error message
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

/*********HTML User Functionality**************/

function disableMatch(){
  if(document.getElementById("selectEntry").value !== ""){
    document.getElementById("select").disabled = true;
  }
}

function clearMatch(){
  var field= document.getElementById("selectEntry");
  field.value= field.defaultValue;
}

function changeMaxInput(){
  var selectChoice = document.getElementById("select").value;
  switch(selectChoice){
    case "VatRefs":
      document.getElementById("selectEntry").maxLength = 12;
      document.getElementById("selectEntry").pattern = "[0-9]{12,12}";
      document.getElementById("selectEntry").setAttribute("data-content",'VAT Reference');
      break;
    case "PayeRefs":
      document.getElementById("selectEntry").maxLength = 10;
      document.getElementById("selectEntry").pattern = ".{10,10}";
      document.getElementById("selectEntry").setAttribute("data-content",'PAYE Reference');
      break;
    case "CompanyNo":
      document.getElementById("selectEntry").maxLength = 10;
      document.getElementById("selectEntry").pattern = ".{10,10}";
      document.getElementById("selectEntry").setAttribute("data-content",'Company Name');
      break;
    default:
      document.getElementById("selectEntry").maxLength = 50;
      document.getElementById("selectEntry").pattern = ".{1,50}";
      document.getElementById("selectEntry").setAttribute("data-content",'Business Name');
      break;
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

var listener = document.getElementById("selectEntry");
listener.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    getBulkMatch("single");
    disableMatch();
    clearMatch();
  }
});
