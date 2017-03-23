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
  var values = [[selectCategory+"=",selectValue]];
  generateList(values, bulkType);
}

function getRange(bulkType){
  getInputs(bulkType);
  var industryCode1 = document.getElementById("industryCode").value.toString();
  var industryCode2 = document.getElementById("industryCode2").value.toString();
  var values = [["IndustryCode:",industryCode1,industryCode2]];
  generateList(values, bulkType);
}

function getBulkQuery(bulkType){
  getInputs(bulkType);
  var values = [];
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

  values = [["BusinessName:","("+businessName+")"],
            ["IndustryCode:",industryCode],
            ["VatRefs:",vatNumber],
            ["CompanyNo:",companyNumber],
            ["PayeRefs:",payeReference],
            ["EmploymentBands:",employmentBand],
            ["LegalStatus:",legalStatus],
            ["Turnover:",turnover],
            ["TradingStatus:",tradingStatus],
            ["PostCode:",postCode]];
  generateList(values, bulkType);
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

var listener = document.getElementById("selectEntry");
listener.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    getBulkMatch("single");
    disableMatch();
    clearMatch();
  }
});
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
