function generateList(values, queryEnd, bulkType, firstUse)
{
  var arr = [];
  // Form the query:
  for(var x in values){
      // Check to see if inputs are empty
      if (values[x][1] !== ""){
        if (bulkType === "multi" && firstUse){
          arr.push("{\"request\": \"");
          firstUse = false;
        }
        arr.push(values[x][0]);
        arr.push(values[x][1]);
        arr.push(" AND ");
    }
    else {
    }
  }
  arr.pop();
  arr.push(queryEnd);
  query = arr.join(""); // Join the array with no seperator
  if (query !== queryEnd && query !== ""){
    addBulk(query, bulkType)
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
function addBulk(query, bulkType){
  if (bulkType === "single"){
    document.getElementById("select").disabled = true;
  }
  var toAdd = [];
  toAdd += "<div class='form-group'  id='bulkList' style='width: 30em; float:right; margin-right:20%'>";
  toAdd += "<label>List of Queries</label>";
  if (query !== "" || typeof query !== "undefined"){
      multiBulkQuery.push(query+ "\n");
    }
    for (var x = 1; x < multiBulkQuery.length; x++){
      var replaced = multiBulkQuery[x].replace(/}|{|,|:|"|"|request/g,"");
      toAdd += "<h3>" +x.toString() + "." + replaced + "</h3>";
      toAdd += "<button type='button' class='btn btn-primary' onclick='deleteBulk("+x.toString()+");'>Delete</button>";
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
  multiBulkQuery.splice(currentIndex,1);
  createBulkList(toAdd,multiBulkQuery);
}
