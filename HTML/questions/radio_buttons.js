//Global:
var survey = []; //Bidimensional array: [ [1,3], [2,4] ]


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
    survey.push([i + (questions_step - 1)*10, rbValue]); //Bidimensional array: [ [1,3], [2,4] ]
  };
  debug();
});

function save_data(){
  //Push data:
  for (i=1; i<=$(".rb").length; i++) {
    var rb = "rb" + (i-1);
    var rbValue = parseInt($("#rb-"+(i-1)).find(".rb-tab-active").attr("data-value"));
    //Bidimensional array push:
    survey.push([i + (questions_step - 1)*10, rbValue]); //Bidimensional array: [ [1,3], [2,4] ]
  }
  /*
  //Debug:
  debug();
  */
};

//Debug:
function debug(){
  var debug = "";
  for (i=0; i<survey.length; i++) {
    debug += "Nº " + survey[i][0] + " = " + survey[i][1] + "\n";
  };
  alert(debug);
};
