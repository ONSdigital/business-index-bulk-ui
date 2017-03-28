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

function deleteBulk(currentIndex){
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulkList' style='width: 30em; float:right; margin-right:20%'><label>List of Queries</label>";
  multiBulkQuery.splice(currentIndex,1);
  if (multiBulkQuery.length === 1){
    toAdd = "";
  }
  createBulkList(toAdd);
}

function generateList(values, bulkType) {
  var arr = [];
  var firstUse = true;
  var queryEnd = "";
  // Form the query:
  for(var x in values){
   if (bulkType === "single" && values[x][1] !== ""){
      arr.push(values[x][1]);
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

function getBulkMatch(bulkType){
  getInputs(bulkType);
  var selectCategory = document.getElementById("select").value.toString();
  var selectValue = document.getElementById("selectEntry").value.toString();
  var valid = document.getElementById("selectEntry").checkValidity();
  var values = [[selectCategory+"=",selectValue]];
  if (valid || selectCategory === "BusinessName"){
    generateList(values, bulkType);
  }
  else {
    //alert or red highlight
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
      document.getElementById("selectEntry").setAttribute("data-content","VAT Reference");
      break;
    case "PayeRefs":
      document.getElementById("selectEntry").maxLength = 10;
      document.getElementById("selectEntry").pattern = ".{10,10}";
      document.getElementById("selectEntry").setAttribute("data-content","PAYE Reference");
      break;
    case "CompanyNo":
      document.getElementById("selectEntry").maxLength = 10;
      document.getElementById("selectEntry").pattern = ".{10,10}";
      document.getElementById("selectEntry").setAttribute("data-content","Company Name");
      break;
    default:
      document.getElementById("selectEntry").maxLength = 50;
      document.getElementById("selectEntry").pattern = ".{1,50}";
      document.getElementById("selectEntry").setAttribute("data-content","Business Name");
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
