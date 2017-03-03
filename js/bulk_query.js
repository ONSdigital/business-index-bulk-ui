var bulk_query = [];
bulk_query.push("IndustryCode"+"\n");

var multi_bulk_query = [];
multi_bulk_query.push("["+"\n");
/**
  * @function add_bulk(bulk_type)
  *
  * @param {String} bulk_type - Type of bulk
  *
  * @description Recieves user input and adds it to the
  * bulk search and query lists where they will be injected into the HTML page
  *
*/
function add_bulk(bulk_type){
  var query = get_bulk_query(bulk_type);
  var to_add = [];
  to_add += '<div class="form-group"  id="bulk_list" style="width: 30em; float:right; margin-right:20%">';
  to_add += '<label>List of Queries</label>';
  if (query !== ""){
    if (bulk_type == "single"){
      bulk_query.push(query+"\n");
    }
    else if (bulk_type == "multi"){
      multi_bulk_query.push(query+"\n");
    }
  }
  create_bulk_list(to_add, bulk_type);
}


/**
  * @function add_bulk(bulk_type)
  *
  * @param {String} bulk_type - Type of bulk being sent to the API
  *
  * @description Gets user input and formats it for download
  *
  * @return {String} query - query string
  *
*/
function get_bulk_query(bulk_type){
  var industry_code;
  bulk_type = bulk_type;
  var query;
  if (bulk_type == "single")
  {
    industry_code = document.getElementById('IndustryCode').value.toString();
    query = industry_code;
  }
  else if (bulk_type == "multi"){
    industry_code = document.getElementById('IndustryCode').value.toString();
    var business_name = document.getElementById('BusinessName').value.toString();
    var employment_band = document.getElementById('employmentband').value.toString();
    var legal_status = document.getElementById('legalStatus').value.toString();
    var turn_over = document.getElementById('turnover').value.toString();
    var trading_status = document.getElementById('tradingstatus').value.toString();
    var post_code = document.getElementById('PostCode').value.toString();
    var valid = false;
    var arr = []; // Array to hold the search query
    var values = [["EmploymentBands=",employment_band,"\""],
                  ["LegalStatus=",legal_status,"\""],
                  ["Turnover=",turn_over,"\""],
                  ["TradingStatus=",trading_status,"\""],
                  ["BusinessName=",business_name,"\""],
                  ["IndustryCode=",industry_code,"\""],
                  ["PostCode=",post_code],"\""];

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
  }
    return query;
}


/**
  * @function create_bulk_list(to_add, bulk_type)
  *
  * @param 1 {String} to_add - The intial foundation for the list of queries
  *
  * @param 2 {Array} bulk_type - The bulk type
  *
  * @description Generates the list of queries from user input w/ delete button
  *
*/
function create_bulk_list(to_add, bulk_type){
  bulk_type = bulk_type;
  to_add = to_add;
  var x;
  if (bulk_type == "single"){
    for (x = 1; x < bulk_query.length; x++){
      to_add += "<h3>" +x.toString() + ". IndustryCode: " + bulk_query[x].toString() + "</h3>";
      to_add += '<button type="button" class="btn btn-primary" id="search" onclick="delete_bulk(' + x.toString() +","+bulk_type+ ');">Delete</button>';
      to_add += "<br>";
    }
  }
  else if (bulk_type == "multi"){
    for (x = 1; x < multi_bulk_query.length; x++){
      var replaced = multi_bulk_query[x].replace(/}|{|,|:|"|"|request/g,'');
      to_add += "<h3>" +x.toString() + "." + replaced + "</h3>";
      to_add += '<button type="button" class="btn btn-primary" id="search" onclick="delete_bulk(' + x.toString() +","+bulk_type+ ');">Delete</button>';
      to_add += "<br>";
    }
  }
  to_add += '</div>';
  document.getElementById("bulk_list").innerHTML = to_add;
}


/**
  * @function delete_bulk (current_index, bulk_type)
  *
  * @param {Int} current_index - The selected index
  *
  * @param 2 {String} bulk_type - type of bulk
  *
  * @description Deletes the selected query
  *
*/
function delete_bulk(current_index, bulk_type){
  var to_add = [];
  to_add += '<div class="form-group"  id="bulk_list" style="width: 25em; float:right; margin-right:20%">';
  to_add += '<label>List of Queries</label>';
  current_index = current_index;
  if (bulk_type == "single"){
    bulk_query.splice(current_index,1);
    create_bulk_list(to_add,bulk_query);
  }
  else if (bulk_type == "multi"){
    multi_bulk_query.splice(current_index,1);
    create_bulk_list(to_add,multi_bulk_query);
  }
}

/**
  * @function download_CSV/JSON()
  *
  * @description Downloads the generated list of queries as a CSV file
  *
*/
function download_CSV(){
  if (bulk_query.length !== 0)
  {
    var join_query = bulk_query.join('');
    var CSV = join_query;
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");
    link.href = uri;
    var filename = "Sample" + ".csv";
    link.download = filename;
    link.click();
  }
}

function download_JSON(){
  if (multi_bulk_query.length !== 0)
  {
    var join_query =  multi_bulk_query.join("");
    var modifiedString = join_query.replace(/,\s*$/, '\n'+']');
    var JSON = modifiedString;
    var uri = 'data:text/json;charset=utf-8,' + escape(JSON);
    var link = document.createElement("a");
    link.href = uri;
    var filename = "Sample" + ".json";
    link.download = filename;
    link.click();
  }
}

/**
  *
  * Bulk Matching
  *
  * Bulk Matching
  *
  * Bulk Matching
  *
  * Bulk Matching
  *
  * Bulk Matching
  *
  * Bulk Matching
  *
  * Bulk Matching
  *
*/
/**
  * @function (progressEvent)
  *
  * @description On file upload from the user processes the queries
  * and displays the query in a table
  *
*/
document.getElementById('csv').onchange = function(){
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent){
    document.getElementById('prod').innerHTML = null;
    var lines = this.result.split('\n');
    var results = lines.length-1;
    for(var i = 1; i < results; i++){
      if (lines[i].includes(",")){
        lines[i] = lines[i].replace(",","");
      }
      search_query = form_query(lines[i]);
      var bulk_return = display_bulk(json_response);
      var display = bulk_return[0];
      var div = document.createElement("div");
      div.innerHTML = "<h3>"+lines[i]+"</h3>"+display+"<br>";
      document.getElementById("prod").appendChild(div);
    }
  };
  reader.readAsText(file);
};


/**
  * @function form_query(query)
  *
  * @param {String} query - Search query
  *
  * @description String together variables to create the search query
  * that will be sent to the API
  *
  * @return {String} search_query - Completed search query
  *
*/
function form_query(query){
  var host = "http://localhost:9000";
  var version = "v1";
  var param = "search?query=";
  search_query = host + "/" + version + "/" + param + query;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET",search_query,false); // false for synchronous request
  xmlHttp.send(null);
  http_code = xmlHttp.status;
  json_response = JSON.parse(xmlHttp.responseText); // For the table/list
  response_text = xmlHttp.responseText;
  response_header = xmlHttp.getResponseHeader("Content-Type");
  if (http_code == 200){
    number_of_results = xmlHttp.getResponseHeader("X-Total-Count");
    if (number_of_results === null){
      number_of_results = 0;
    }
  }
  if (number_of_results > 10000){
    uncapped_results = number_of_results;
    number_of_results = 10000;
  }
}


/**
  * @function display_bulk(jsonResponse)
  *
  * @param {JSON} jsonResponse - The JSON API query result
  *
  * @description Display function for displaying the results of bulk query
  *
  * @return {Array} {String} [new_div, developer_view] - For displaying
  *
  */
function display_bulk(jsonResponse){

  var business_div = "";
  var arr = [];
  var to_add = "";

  var developer_view = "Query: " + search_query +
                        "<br>" +
                        "Response Header: " + response_header +
                        "<br>" +
                        "HTTP Response Code: " + http_code +
                        "<br>" +
                        "Number of Returned Matches: " + number_of_results;

  var start = "<div class='table-responsive'><table class='table table-striped'><thead><tr>";

  var headers = //"<th>ID</th>"+
          "<th>Business Name</th>"+
          "<th>UBRN</th>"+
          "<th>Industry Code</th>"+
          "<th>Legal Status</th>"+
          "<th>Trading Status</th>"+
          "<th>Turnover</th>"+
          "<th>Employment</th>"+
          "</tr>"+
          "</thead>"+
          "<tbody>";

  var end = "</tbody></table></div>";
  if (http_code !== 200){
    to_add = "<h2>"+response_text+"</h2>";
    new_div = start+to_add +end;
  }
  else if (number_of_results === 0){
    to_add = "<h2>"+"No results found"+"</h2>";
    new_div = start+to_add +end;
  }

  else if(http_code == 200) {
  for (var i in jsonResponse){
    arr.push(jsonResponse[i]);
    business_div = "<tr>" +
           //"<td>" + arr[i].id + "</td>" +
           "<td>" + arr[i].businessName + "</td>" +
           "<td>" + arr[i].uprn + "</td>" +
           "<td>" + arr[i].industryCode + "</td>" +
           "<td>" + convert_LegalStatus(arr[i].legalStatus) + "</td>" +
           "<td>" + convert_TradingStatus(arr[i].tradingStatus) + "</td>" +
           "<td>" + convert_Turnover(arr[i].turnover) + "</td>" +
           "<td>" + convert_Employment(arr[i].employmentBands) + "</td>" +
           "</tr>";
    to_add += business_div;
    }
  new_div = start + headers + to_add + end;
  }
  return [new_div, developer_view];
}

// When entering a value that is not 0-9 the field resets
$("#IndustryCode").keyup(function() {
    $("#IndustryCode").val(this.value.match(/[0-9]*/));
});
