//global variable for array used throughout
var multiBulkQuery = [];
var selectHeader = document.getElementById("select").value.toString();
multiBulkQuery.push(selectHeader+"\n");

function getBulkMatch(bulkType){
  var queryEnd = "";
  var query;
  var firstUse = true;
  var selectCategory = document.getElementById("select").value.toString();
  var selectValue = document.getElementById("selectEntry").value.toString();
  var values = [[selectCategory+"=",selectValue]];
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

function disableMatch(){
  document.getElementById("select").disabled = true;
}

$("#select").change(function () {
       document.getElementById("selectEntry").placeholder="Enter "+ document.getElementById("select").value.toString();
   });
