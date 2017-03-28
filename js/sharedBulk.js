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

  if(document.getElementById("industryCode").value !== ""){
    document.getElementById("industryCode2").disabled = true;
  }


var alphabet = [["A"],
                ["B"],
                ["C"],
                ["C"],
                ["D"],
                ["E"],
                ["F"],
                ["G"],
                ["H"],
                ["I"],
                ["J"],
                ["K"],
                ["L"],
                ["M"],
                ["N"],
                ["O"]];

$("#employmentBand").change(function(e){
  $("#employmentBand2").val("");
  for (var i in alphabet){
    $("#employmentBand2 option[value="+alphabet[i]+"]").prop("disabled",false);
  }
  var choice = $(this).val();
  for (var j in alphabet){
    $("#employmentBand2 option[value="+alphabet[j]+"]").prop("disabled",true);
    if (choice === alphabet[j].toString()){
      break;
    }
  }
});

$("#turnover").change(function(e){
  $("#turnover2").val("");
  for (var k in alphabet){
    $("#turnover2 option[value="+alphabet[k]+"]").prop("disabled",false);
  }
  var choice = $(this).val();
  for (var l in alphabet){
    $("#turnover2 option[value="+alphabet[l]+"]").prop("disabled",true);
    if (choice === alphabet[l].toString()){
      break;
    }
  }
});
