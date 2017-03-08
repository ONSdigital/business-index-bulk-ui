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
  var industryCode;
  var payeReference;
  var vatNumber;
  var values = [];
  var arr = [];
  var query;
  var valid = false;
  bulkType = bulkType;

switch(bulkType){
  case "single":
    industryCode = document.getElementById("IndustryCode").value.toString();
    payeReference = document.getElementById("Paye").value.toString();
    vatNumber = document.getElementById("Vat").value.toString();
    values = [["PayeRefs=",payeReference,"\""],
              ["VatRefs=",vatNumber,"\""],
              ["IndustryCode=",industryCode],"\""];
  break;

  case "multi":
    industryCode = document.getElementById("IndustryCode").value.toString();
    var businessName = document.getElementById("BusinessName").value.toString();
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
                  ["PostCode=",postCode],"\""];
  break;
}
    arr.push("{\"request\": \"");
    // Form the query:
    for(var x in values){
      // Check to see if inputs are empty
      if (values[x][1] !== "" && values[x][1] !== undefined){
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
    var modifiedString = joinQuery.replace(/,\s*$/, "\n"+"]");
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
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulkList' style='width: 30em; float:right; margin-right:20%'>";
  toAdd += "<label>List of Queries</label>";
  if (query !== ""){
      multiBulkQuery.push(query+"\n");
    }
  createBulkList(toAdd);
}

// When entering a value that is not 0-9 the field resets
$("#IndustryCode").keyup(function() {
    $("#IndustryCode").val(this.value.match(/[0-9]*/));
});
