# Business Index DemoUI Dev Toolkit

## Intended use

This Demo UI has been created with external stakeholders in mind, to help them quickly begin querying the Business Index API. The Javascript is documented in such a way that it should be very easy to understand. The section below will give an 'English' explanation of what happens when the user submits a query.

## How it works

This Demo UI has been made using Javascript, HTML and CSS. All API access functionality has been made using the XMLHttpRequest web API in Javascript.

The screenshot below shows the UBRN query page, which allows the user to input a UBRN, which will then be matched exactly.

![ubrn](https://raw.githubusercontent.com/ONSdigital/business-index-ui/master/img/ubrn.png "Example UBRN Query")

When the user clicks the 'Submit' button, this is what happens:

1. Inside accessAPI.js, ubrn_lookup() is called.

  ```javascript
  /**
    * @function ubrn_lookup()
    *
    * @description This method is called when the "Submit" button on the UBRN
    * lookup page is pressed. It gets the UPRN user input creates the query that
    * is passed to send_request().
    *
  */
  function ubrn_lookup(){
    var search_string = "UPRN:"
    var ubrn = document.getElementById('ubrnentry').value.toString();
    var query = search_string.concat(ubrn)
    send_request(query)
  }
  ```

  As the @description mentions, this function simply gets the UBRN the user input, concatenates the results with the search_string, which tells the Business Index API what to query on, in this case it is UBRN. This query is then passed into send_request().

2. This is the send_request() function.

  ```javascript
  /**
    * @function send_request(query)
    *
    * @param {String} query - The query that will be sent to the API.
    *
    * @description This method accepts a query as a parameter, and adds this into
    * a URL that will be used to query the API. The plain response, the JSON
    * conversion of that response and the search_query are passed into
    * results_format().
    *
  */
  function send_request(query){
    // Defining the hosts/version:
    var host = "http://localhost:9000";
    var version = "v1";
    var param = "search?query=";

    var xmlHttp = new XMLHttpRequest();

    // Concatenate and send the search_query
    var search_query = host + "/" + version + "/" + param + query;
    xmlHttp.open("GET",search_query,false); // false for synchronous request
    xmlHttp.send(null);
    var json_response = JSON.parse(xmlHttp.responseText); // For the table/list
    var response_header = xmlHttp.getResponseHeader("Content-Type");
    var http_code = xmlHttp.status;
    console.log("Query: ",search_query)
    console.log("Content-Type: ",response_header)
    console.log("HTTP Response Code: ",http_code)
    results_format(json_response,search_query,response_header,http_code)
  }
  ```

  The `send_request()` function takes only a query as a parameter, which is then used to create the search url, which is made up of the host, version, parameter, and the query submitted by the user.

  For external users, the host variable will point to an internal ONS URL, not localhost.

  Once the search_query has been created, xmlHttp is used to send a GET request to the address. The JSON response can then be retrieved, along with the headers and HTTP status code. These are logged before being sent to `results_format()`.

3. The results_format() function displays the query results

  ```javascript
  /**
    * @function results_format(jsonResponse,search_query)
    *
    * @param {JSON} json_response - The JSON API query result.
    * @param {String} search_query - The query was sent to the API.
    * @param {String} response_header - The HTTP response header.
    * @param {String} http_code - The HTTP response code.
    *
    * @description This method accepts a JSON object, json_response and a
    * search_query and displays them.
    * The JSON is displayed either in a table/list/raw depending
    * on the radio button the user selects. The functions display_table/list/json
    * parse the JSON and return a string which is then put in the HTML.
    * The search_query, response_header and http_code are also displayed.
    *
  */
  function results_format(json_response,search_query,response_header,http_code){
    var table_checked = document.getElementById("radio1").checked;
    var list_checked = document.getElementById("radio2").checked;
    var json_checked = document.getElementById("radio3").checked;
    var new_div = "";

    // Check the API response status
    if (json_response["status"]!== 500){
      if (table_checked){
        new_div = display_table(json_response);
      } else if (list_checked){
        new_div = display_list(json_response);
      } else if (json_checked){
        new_div = display_json(json_response);
      }
    } else { // Display below if status is not 500 (OK)
      new_div =  "<h2>No Results Found</h2><p>Please try another input.</p>";
    }

    // Format layout of HTTP response code/query/type
    var developer_view = "Query: " + search_query +
                          "<br>" +
                          "Response Header: " + response_header +
                          "<br>" +
                          "HTTP Response Code: " + http_code;

    // Replace the divs with the query results and the actual query
    document.getElementById('prod').innerHTML =  new_div;
    document.getElementById('query').innerHTML = developer_view;
  }
  ```

  The above function looks at which checkbox has been selected, and calls the corresponding function to display data in either a table (default), list or as raw JSON.
