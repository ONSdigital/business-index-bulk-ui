//global variable for array used throughout
var multiBulkQuery = [];
var firstUse = 1;

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
  var selectCategory;
  if (bulkType === "single" && firstUse === 1){
    selectCategory = document.getElementById("select").value.toString();
    multiBulkQuery.push(selectCategory+"\n");
  }
  else if (bulkType ==="multi" && firstUse ===1){
    multiBulkQuery.push("["+"\n");
  }
  firstUse=0;
  var values = [];
  var arr = [];
  var query;
  var valid = false;

  switch(bulkType){
    case "single":
      selectCategory = document.getElementById("select").value.toString();
      var selectValue = document.getElementById("selectEntry").value.toString();
      values = [[selectCategory+"=",selectValue]];
    break;

    case "multi":
      var businessName = document.getElementById("businessName").value.toString();
      var industryCode = document.getElementById("industryCode").value.toString();
      var vatNumber = document.getElementById("vatNumber").value.toString();
      var payeReference = document.getElementById("payeReference").value.toString();
      var employmentBand = document.getElementById("employmentband").value.toString();
      var legalStatus = document.getElementById("legalStatus").value.toString();
      var turnover = document.getElementById("turnover").value.toString();
      var tradingStatus = document.getElementById("tradingstatus").value.toString();
      var postCode = document.getElementById("PostCode").value.toString();
      values = [["EmploymentBands=",employmentBand,"\""],
                    ["LegalStatus=",legalStatus,"\""],
                    ["Turnover=",turnover,"\""],
                    ["TradingStatus=",tradingStatus,"\""],
                    ["BusinessName=",businessName,"\""],
                    ["IndustryCode=",industryCode,"\""],
                    ["VatRefs=",vatNumber,"\""],
                    ["PayeRefs=",payeReference,"\""],
                    ["PostCode=",postCode],"\""];
    break;
  }
  if (bulkType === "multi"){
    arr.push("{\"request\": \"");
  }
  // Form the query:
  for(var x in values){
    // Check to see if inputs are empty
    if (values[x][1] !== "" && typeof values[x][1] !== "undefined"){
      valid = true;
      arr.push(values[x][0]);
      arr.push(values[x][1]);
      arr.push(" AND ");
    }
  }
  arr.pop();
  if (valid){
    arr.push("\"},");
    query = arr.join(""); // Join the array with no seperator
  }
  return query;
}


/**
  * @function createBulkList(toAdd, bulkType)
  *
  * @param 1 {String} toAdd - The intial foundation for the list of queries
  *
  * @param 2 {Array} bulkType - The bulk type
  *
  * @description Generates the list of queries from user input w/ delete button
  *
*/
function createBulkList(toAdd){
  toAdd = toAdd;
  var x;
    for (x = 1; x < multiBulkQuery.length; x++){
      var replaced = multiBulkQuery[x].replace(/}|{|,|:|"|"|request/g,"");
      toAdd += "<h3>" +x.toString() + "." + replaced + "</h3>";
      toAdd += "<button type='button' class='btn btn-primary' id='search' onclick='deleteBulk(' + x.toString() + ');'>Delete</button>";
      toAdd += "<br>";
  }
  toAdd += "</div>";
  document.getElementById("bulkList").innerHTML = toAdd;
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
  toAdd += "<div class='form-group'  id='bulkList' style='width: 25em; float:right; margin-right:20%'>";
  toAdd += "<label>List of Queries</label>";
  currentIndex = currentIndex;
  multiBulkQuery.splice(currentIndex,1);
  createBulkList(toAdd,multiBulkQuery);
}


/**
  * @function downloadCSV/JSON()
  *
  * @description Downloads the generated list of queries as a CSV file
  *
*/
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

/**
  * @function addBulk(bulkType)
  *
  * @param {String} bulkType - Type of bulk
  *
  * @description Recieves user input and adds it to the
  * bulk search and query lists where they will be injected into the HTML page
  *
*/
function addBulk(bulkType){
  var query = getBulkQuery(bulkType);
  if (bulkType === "single"){
    document.getElementById("select").disabled = true;
  }
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulkList' style='width: 30em; float:right; margin-right:20%'>";
  toAdd += "<label>List of Queries</label>";
  if (query !== ""){
      multiBulkQuery.push(query+"\n");
    }
  createBulkList(toAdd);
}

// When entering a value that is not 0-9 the field resets
$("#industryCode").keyup(function() {
    $("#industryCode").val(this.value.match(/[0-9]*/));
});

$("#vatNumber").keyup(function() {
    $("#vatNumber").val(this.value.match(/[0-9]*/));
});

$("#select").change(function () {
       document.getElementById("selectEntry").placeholder="Enter "+ document.getElementById("select").value.toString();
   });
