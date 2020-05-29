// Code for the button of the quizz part
var survey = [];


$(document).delegate(".rb-tab",'click',function(){
  //Spot switcher:
  $(this).parent().find(".rb-tab").removeClass("rb-tab-active");
  $(this).addClass("rb-tab-active");
});

$(document).delegate(".trigger",'click',function(){
  //Push data:
  for (i=1; i<=$(".rb").length; i++) {
    var rb = "rb" + (i-1);
    var rbValue = parseInt($("#rb-"+(i-1)).find(".rb-tab-active").attr("data-value"));
    //Bidimensional array push:
    survey.push([i + (questions_step - 1)*10, rbValue]);
  };
});
