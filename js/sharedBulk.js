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
  alphabet.some(function(i){
    $("#employmentBand2 option[value="+i+"]").prop("disabled",false);
  });
  alphabet.some(function(j){
    if (choice !== j.toString()){
      $("#employmentBand2 option[value="+j+"]").prop("disabled",true);
    }
    else if (choice === j.toString()){
      return true;
    }
  });
});

$("#turnover").change(function(e){
  $("#turnover2").val("");
  var choice = $(this).val();
  alphabet.some(function(k){
    $("#turnover2 option[value="+k+"]").prop("disabled",false);
  });
  alphabet.some(function(l){
    if (choice !== l.toString()){
      $("#turnover2 option[value="+l+"]").prop("disabled",true);
    }
    else if (choice === l.toString()){
      return true;
    }
  });
});
