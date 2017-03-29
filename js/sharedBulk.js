/****************JQUERY*****************/

$("#select").change(function () {
  document.getElementById("selectEntry").placeholder="Enter "+ document.getElementById("select").value.toString();
});

$("#industryCode").keyup(function() {
  $("#industryCode").val(this.value.match(/[0-9]*/));
});

$("#industryCode2").keyup(function() {
  $("#industryCode2").val(this.value.match(/[0-9]*/));
});

$("#vatNumber").keyup(function() {
  $("#vatNumber").val(this.value.match(/[0-9]*/));
});

$(document).ready(function(){
  $("[data-toggle='popover']").popover();
});

$(document).on("blur","[data-toggle='popover']", function() {
   $(this).popover("hide");
});

var alphabet = [["A"],["B"],["C"],
                ["C"],["D"],["E"],
                ["F"],["G"],["H"],
                ["I"],["J"],["K"],
                ["L"],["M"],["N"],
                ["O"]];

$("#employmentBand").change(function(e){
  $("#employmentBand2").val("");
  var choice = $(this).val();
  for (var i in alphabet){
    if (alphabet.hasOwnProperty(i)) {
      $("#employmentBand2 option[value="+alphabet[i]+"]").prop("disabled",false);
    }
  }
  for (var j in alphabet){
    if (choice !== alphabet[j].toString()){
      $("#employmentBand2 option[value="+alphabet[j]+"]").prop("disabled",true);
    }
    else if (choice === alphabet[j].toString()){
      break;
    }
  }
});

$("#turnover").change(function(e){
  $("#turnover2").val("");
  var choice = $(this).val();
  for (var k in alphabet){
    if (alphabet.hasOwnProperty(k)) { 
      $("#turnover2 option[value="+alphabet[k]+"]").prop("disabled",false);
    }
  }
  for (var l in alphabet){
    if (choice !== alphabet[l].toString()){
      $("#turnover2 option[value="+alphabet[l]+"]").prop("disabled",true);
    }
    else if (choice === alphabet[l].toString()){
      break;
    }
  }
});
