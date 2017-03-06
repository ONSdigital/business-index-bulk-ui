//global variable for array used throughout
var multiBulkQuery = [];
multiBulkQuery.push("["+"\n");


/**
  * @function add_bulk(bulkType)
  *
  * @param {String} bulkType - Type of bulk being sent to the API
  *
  * @description Gets user input and formats it for download
  *
  * @return {String} query - query string
  *
*/
function get_bulk_query(bulkType){
  var industryCode;
  var payeReference;
  var vatNumber;
  var values = [];
  var arr = [];
  bulkType = bulkType;

  if (bulkType === "single")
  {
    industryCode = document.getElementById("IndustryCode").value.toString();
    payeReference = document.getElementById("Paye").value.toString();
    vatNumber = document.getElementById("Vat").value.toString();
    values = [["PayeRefs=",payeReference,"\""],
              ["VatRefs=",vatNumber,"\""],
              ["IndustryCode=",industryCode],"\""];
  }
  else if (bulkType === "multi"){
    industryCode = document.getElementById("IndustryCode").value.toString();
    var businessName = document.getElementById("BusinessName").value.toString();
    var employmentBand = document.getElementById("employmentband").value.toString();
    var legalStatus = document.getElementById("legalStatus").value.toString();
    var turnover = document.getElementById("turnover").value.toString();
    var tradingStatus = document.getElementById("tradingstatus").value.toString();
    var postCode = document.getElementById("PostCode").value.toString();
    var valid = false;
    values = [["EmploymentBands=",employmentBand,"\""],
                  ["LegalStatus=",legalStatus,"\""],
                  ["Turnover=",turnover,"\""],
                  ["TradingStatus=",tradingStatus,"\""],
                  ["BusinessName=",businessName,"\""],
                  ["IndustryCode=",industryCode,"\""],
                  ["PostCode=",postCode],"\""];
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
      var query = arr.join(""); // Join the array with no seperator
    }
  return query;
}


/**
  * @function create_bulk_list(toAdd, bulkType)
  *
  * @param 1 {String} toAdd - The intial foundation for the list of queries
  *
  * @param 2 {Array} bulkType - The bulk type
  *
  * @description Generates the list of queries from user input w/ delete button
  *
*/
function create_bulk_list(toAdd){
  toAdd = toAdd;
  var x;
    for (x = 1; x < multiBulkQuery.length; x++){
      var replaced = multiBulkQuery[x].replace(/}|{|,|:|"|"|request/g,"");
      toAdd += "<h3>" +x.toString() + "." + replaced + "</h3>";
      toAdd += "<button type='button' class='btn btn-primary' id='search' onclick='delete_bulk(' + x.toString() + ');'>Delete</button>";
      toAdd += "<br>";
  }
  toAdd += "</div>";
  document.getElementById("bulk_list").innerHTML = toAdd;
}


/**
  * @function delete_bulk (current_index, bulkType)
  *
  * @param {Int} current_index - The selected index
  *
  * @param 2 {String} bulkType - type of bulk
  *
  * @description Deletes the selected query
  *
*/
function delete_bulk(current_index){
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulk_list' style='width: 25em; float:right; margin-right:20%'>";
  toAdd += "<label>List of Queries</label>";
  current_index = current_index;
  multiBulkQuery.splice(current_index,1);
  create_bulk_list(toAdd,multiBulkQuery);
}


/**
  * @function download_CSV/JSON()
  *
  * @description Downloads the generated list of queries as a CSV file
  *
*/
function download_CSV(){
  if (multiBulkQuery.length !== 0)
  {
    var join_query = multiBulkQuery.join("");
    var modifiedString = join_query.replace(/,\s*$/, "\n"+"]");
    var CSV = modifiedString;
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);
    var link = document.createElement("a");
    link.href = uri;
    var filename = "Sample" + ".csv";
    link.download = filename;
    link.click();
  }
}


function download_JSON(){
  if (multiBulkQuery.length !== 0)
  {
    var join_query =  multiBulkQuery.join("");
    var modifiedString = join_query.replace(/,\s*$/, "\n"+"]");
    var JSON = modifiedString;
    var uri = "data:text/json;charset=utf-8," + escape(JSON);
    var link = document.createElement("a");
    link.href = uri;
    var filename = "Sample" + ".json";
    link.download = filename;
    link.click();
  }
}

/**
  * @function add_bulk(bulkType)
  *
  * @param {String} bulkType - Type of bulk
  *
  * @description Recieves user input and adds it to the
  * bulk search and query lists where they will be injected into the HTML page
  *
*/
function add_bulk(bulkType){
  var query = get_bulk_query(bulkType);
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulk_list' style='width: 30em; float:right; margin-right:20%'>";
  toAdd += "<label>List of Queries</label>";
  if (query !== ""){
      multiBulkQuery.push(query+"\n");
    }
  create_bulk_list(toAdd);
}

// When entering a value that is not 0-9 the field resets
$("#IndustryCode").keyup(function() {
    $("#IndustryCode").val(this.value.match(/[0-9]*/));
});
