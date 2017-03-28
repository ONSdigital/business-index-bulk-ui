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
                ['I'],
                ["J"],
                ["K"],
                ["L"],
                ["M"],
                ["N"],
                ["O"]];

$('#employmentBand').change(function(e){
  for (x in alphabet){
    $("#employmentBand2 option[value="+alphabet[x]+"]").prop('disabled',false);
  }
  var choice = $(this).val();
  for (x in alphabet){
    $("#employmentBand2 option[value="+alphabet[x]+"]").prop('disabled',true);
    if (choice === alphabet[x].toString()){
      break;
    }
  }
});

$('#turnover').change(function(e){
  for (x in alphabet){
    $("#turnover2 option[value="+alphabet[x]+"]").prop('disabled',false);
  }
  var choice = $(this).val();
  for (x in alphabet){
    $("#turnover2 option[value="+alphabet[x]+"]").prop('disabled',true);
    if (choice === alphabet[x].toString()){
      break;
    }
  }
});
