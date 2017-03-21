var multiBulkQuery = [];
var firstRun = 1;

function getInputs(bulkType){
  var selectCategory;
  if (bulkType === "single" && firstRun === 1){
    selectCategory = document.getElementById("select").value.toString();
    multiBulkQuery.push(selectCategory+"\n");
  }
  else if (bulkType ==="multi" && firstRun ===1){
    multiBulkQuery.push("["+"\n");
  }
}


function createBulkList(toAdd){
    for (var x = 1; x < multiBulkQuery.length; x++){
      var replaced = multiBulkQuery[x].replace(/}|{|,|:|"|"|request/g,"");
      toAdd += "<h3>" + x.toString() + "." + replaced + "</h3><button type='button' class='btn btn-primary' onclick='deleteBulk("+x.toString()+");'>Delete</button><br>";
  }
  toAdd += "</div>";
  document.getElementById("bulkList").innerHTML = toAdd;
}

/**
  * @function addBulk(bulkType)
  *
  * @param {String} bulkType - Type of bulk
  *
  * @description Recieves user input and adds it to the
  * bulk search and query lists where they will be injected into the HTML page
  *
*/
function addBulk(query, bulkType){
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulkList' style='width: 30em; float:right; margin-right:20%'><label>List of Queries</label>";
  multiBulkQuery.push(query+ "\n");
  createBulkList(toAdd);
}

function generateList(values, queryEnd, bulkType, firstUse)
{
  var arr = [];
  // Form the query:
  for(var x in values){
    // Check to see if inputs are empty
    if (bulkType === "multi" && firstUse &&  values[x][1] !== ""){
      arr.push("{\"request\": \"");
      firstUse = false;
      arr.push(values[x][0]);
      arr.push(values[x][1]);
      arr.push(" AND ");
    }
    else if (values[x][1] !== ""){
      arr.push(values[x][0]);
      arr.push(values[x][1]);
      arr.push(" AND ");
    }
  }
  arr.pop();
  arr.push(queryEnd);
  var query = arr.join(""); // Join the array with no seperator
  if (query !== queryEnd && query !== ""){
    addBulk(query, bulkType);
  }
}

/**
  * @function deleteBulk (currentIndex, bulkType)
  *
  * @param {Int} currentIndex - The selected index
  *
  * @param 2 {String} bulkType - type of bulk
  *
  * @description Deletes the selected query
  *
*/
function deleteBulk(currentIndex){
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulkList' style='width: 30em; float:right; margin-right:20%'><label>List of Queries</label>";
  multiBulkQuery.splice(currentIndex,1);
  createBulkList(toAdd);
}

function getBulkMatch(bulkType){
  getInputs(bulkType);
  firstRun=0;
  var queryEnd = "";
  var query;
  var firstUse = true;
  var selectCategory = document.getElementById("select").value.toString();
  var selectValue = document.getElementById("selectEntry").value.toString();
  var values = [[selectCategory+"=",selectValue]];
  generateList(values, queryEnd, bulkType, firstUse);
}

function getBulkQuery(bulkType){
  getInputs(bulkType);
  firstRun=0;
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

function downloadCSV(){
  if (multiBulkQuery.length !== 0)
  {
    var joinQuery = multiBulkQuery.join("");
    var modifiedString = joinQuery.replace(/[}",]/g, "");
    var CSV = modifiedString;
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);
    var link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
  }
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

function clearMatch(){
  var field= document.getElementById('selectEntry');
  field.value= field.defaultValue;
}

function changeMaxInput(){
  var selectChoice = document.getElementById("select").value;
  switch(selectChoice){
    case "IndustryCode":
      document.getElementById("selectEntry").maxLength = 5;
      break;
    case "VatRefs":
      document.getElementById("selectEntry").maxLength = 12;
      break;
    case "PayeRefs":
      document.getElementById("selectEntry").maxLength = 10;
      break;
    case "CompanyNo":
      document.getElementById("selectEntry").maxLength = 10;
      break;
    default:
      document.getElementById("selectEntry").maxLength = 50;
      break;
  }
}

function disableMatch(){
  document.getElementById("select").disabled = true;
}

$("#select").change(function () {
   document.getElementById("selectEntry").placeholder="Enter "+ document.getElementById("select").value.toString();
});

$("#industryCode").keyup(function() {
 $("#industryCode").val(this.value.match(/[0-9]*/));
});

$("#vatNumber").keyup(function() {
 $("#vatNumber").val(this.value.match(/[0-9]*/));
});
