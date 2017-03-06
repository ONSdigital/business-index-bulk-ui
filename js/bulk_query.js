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
      multi_bulk_query.push(query+"\n");
    }
  create_bulk_list(to_add);
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
  var values;
  if (bulk_type == "single")
  {
    industry_code = document.getElementById('IndustryCode').value.toString();
    paye_code = document.getElementById('Paye').value.toString();
    vat_code = document.getElementById('Vat').value.toString();
    var arr = [];
    var values = [["PayeRefs=",paye_code,"\""],
                  ["VatRefs=",vat_code,"\""],
                  ["IndustryCode=",industry_code],"\""];
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
  * @function create_bulk_list(to_add, bulk_type)
  *
  * @param 1 {String} to_add - The intial foundation for the list of queries
  *
  * @param 2 {Array} bulk_type - The bulk type
  *
  * @description Generates the list of queries from user input w/ delete button
  *
*/
function create_bulk_list(to_add){
  to_add = to_add;
  var x;
    for (x = 1; x < multi_bulk_query.length; x++){
      var replaced = multi_bulk_query[x].replace(/}|{|,|:|"|"|request/g,'');
      to_add += "<h3>" +x.toString() + "." + replaced + "</h3>";
      to_add += '<button type="button" class="btn btn-primary" id="search" onclick="delete_bulk(' + x.toString() + ');">Delete</button>';
      to_add += "<br>";
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
function delete_bulk(current_index){
  var to_add = [];
  to_add += '<div class="form-group"  id="bulk_list" style="width: 25em; float:right; margin-right:20%">';
  to_add += '<label>List of Queries</label>';
  current_index = current_index;
  multi_bulk_query.splice(current_index,1);
  create_bulk_list(to_add,multi_bulk_query);
}


/**
  * @function download_CSV/JSON()
  *
  * @description Downloads the generated list of queries as a CSV file
  *
*/
function download_CSV(){
  if (multi_bulk_query.length !== 0)
  {
    var join_query = multi_bulk_query.join('');
    var modifiedString = join_query.replace(/,\s*$/, '\n'+']');
    var CSV = modifiedString;
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

// When entering a value that is not 0-9 the field resets
$("#IndustryCode").keyup(function() {
    $("#IndustryCode").val(this.value.match(/[0-9]*/));
});
