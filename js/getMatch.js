var multiBulkQuery = [];
var firstRun = 1;

function getInputs(){
  var selectCategory;
  if (firstRun === 1){
    selectCategory = document.getElementById("select").value.toString();
    multiBulkQuery.push(selectCategory+"\n");
    firstRun=0;
  }
}

function createBulkList(toAdd){
  multiBulkQuery.forEach(function(x){
    if (multiBulkQuery.indexOf(x) !== 0){
      var replaced = x.replace(/}|{|,|"|"|\)|\(/g,"");
      toAdd += "<h3>" + multiBulkQuery.indexOf(x) + "." + replaced + "</h3><button type='button' class='btn btn-primary' onclick='deleteBulk("+x+");'>Delete</button><br>";
    }
  });
  toAdd += "</div>";
  document.getElementById("bulkList").innerHTML = toAdd;
}

function addBulk(query){
  var toAdd = [];
  toAdd += "<label>List of Queries</label>";
  multiBulkQuery.push(query+ "\n");
  createBulkList(toAdd);
}

function deleteBulk(currentIndex){
  var toAdd = [];
  toAdd += "<label>List of Queries</label>";
  multiBulkQuery.splice(currentIndex,1);
  if (multiBulkQuery.length === 1){
    toAdd = "";
  }
  createBulkList(toAdd);
}

function generateList(values) {
  var arr = [];
  var firstUse = true;

  values.forEach(function(x){
   if (x[1] !== ""){
      arr.push(x[1]);
      arr.push(" AND ");
    }
  })
  arr.pop();
  var query = arr.join("");
  if (query !== ""){
    addBulk(query);
  }
}

function getBulkMatch(){
  getInputs();
  var selectCategory = document.getElementById("select").value.toString();
  var selectValue = document.getElementById("selectEntry").value.toString();
  var valid = document.getElementById("selectEntry").checkValidity();
  var values = [[selectCategory+"=",selectValue]];
  if (valid || selectCategory === "BusinessName"){
    generateList(values);
  }
  else {
    //alert or red highlight
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

/*********HTML Match Functionality**************/

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
      document.getElementById("selectEntry").setAttribute("data-content","Please enter a 12 digit VAT Number");
      break;
    case "PayeRefs":
      document.getElementById("selectEntry").maxLength = 10;
      document.getElementById("selectEntry").pattern = ".{10,10}";
      document.getElementById("selectEntry").setAttribute("data-content","Please enter a 10 digit PAYE Reference");
      break;
    case "CompanyNo":
      document.getElementById("selectEntry").maxLength = 8;
      document.getElementById("selectEntry").pattern = "[a-zA-Z]{2}[0-9]{6}|[0-9]{8}";
      document.getElementById("selectEntry").setAttribute("data-content","Please enter a 8 digit Company Reference Number");
      break;
    default:
      document.getElementById("selectEntry").maxLength = 50;
      document.getElementById("selectEntry").pattern = ".{1,50}";
      document.getElementById("selectEntry").setAttribute("data-content","Please enter a 1-50 character Business Name");
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
