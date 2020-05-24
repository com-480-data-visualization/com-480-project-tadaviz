// Variables
let NBR_ANSWER = 5;
let questions = document.getElementsByClassName("stats");
let graphQuestions = d3.selectAll(".stats");
let container = document.getElementById("placeholder");
let test = document.getElementsByClassName("radio_group");
let add_else = document.getElementById("buttons");
//let answers = [];


//Vector image of the upward arrow in uri form
//Prevents multiple unecessary request to other servers
let upArrowData="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ1MS44NDZweCIgaGVpZ2h0PSI0NTEuODQ3cHgiIHZpZXdCb3g9IjAgMCA0NTEuODQ2IDQ1MS44NDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1MS44NDYgNDUxLjg0NzsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTM0NS40NDEsMjQ4LjI5MkwxNTEuMTU0LDQ0Mi41NzNjLTEyLjM1OSwxMi4zNjUtMzIuMzk3LDEyLjM2NS00NC43NSwwYy0xMi4zNTQtMTIuMzU0LTEyLjM1NC0zMi4zOTEsMC00NC43NDQNCgkJTDI3OC4zMTgsMjI1LjkyTDEwNi40MDksNTQuMDE3Yy0xMi4zNTQtMTIuMzU5LTEyLjM1NC0zMi4zOTQsMC00NC43NDhjMTIuMzU0LTEyLjM1OSwzMi4zOTEtMTIuMzU5LDQ0Ljc1LDBsMTk0LjI4NywxOTQuMjg0DQoJCWM2LjE3Nyw2LjE4LDkuMjYyLDE0LjI3MSw5LjI2MiwyMi4zNjZDMzU0LjcwOCwyMzQuMDE4LDM1MS42MTcsMjQyLjExNSwzNDUuNDQxLDI0OC4yOTJ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==";

// Question class

class Question {

  constructor(questionName,questionID){
    this.questionName = questionName;
    this.questionID = questionID;
    this.output = [];
    this.addQuestionName(this.output, this.questionName);
    this.addRadioGroup(this.output, this.questionName, this.questionID);
    this.addStats(this.output, this.questionID);
    //container.innerHTML=output.join('');
    //questions=document.getElementsByClassName("stats");
    //graphQuestions=d3.selectAll(".stats");
    //console.log(questions);
  }

  addQuestionName(inVec){
    inVec.push('<p class ="question_text">'+ this.questionName +'</p>');
  }

  addRadioGroup(inVec){
    let radioGroup=[];
    for(let i = 0; i < NBR_ANSWER; i++){
      radioGroup.push('<input type="radio" name=' + this.questionName+' class="circle" value=' + i +
      ' onclick="activate_stats('+ this.questionID +','+i+')"> ');
    }
    radioGroup='<div class="radio_group">' + radioGroup.join('') + '</div></div>';
    inVec.push(radioGroup);
  }

  addStats(invec){
    invec.push('<div id=stat' + this.questionID + ' class="stats inactive"><img alt="up button" src=' + upArrowData +
    ' class="up_arrow" onclick="remove_stats(' + this.questionID + ')"></div>');
  }

  getHTML(){
    return '<div class="question">'+ this.output.join('') +'</div>';
  }

}

// Functions

function addQuestions(data){
  let questionsHTML=[];
  for(let i=0; i<data.length; i++){
    const questionHTML = new Question(data[i].questionName,i).getHTML();
    questionsHTML.push(questionHTML);
  }
  container.innerHTML=questionsHTML.join('');
}

function activate_stats(question_id, question_value){
  if (question_id - 1 >= 0) {
    //remove_stats(questions_id-1);
  }
  if (questions[question_id].classList.contains("inactive")) {
    questions[question_id].classList.remove("inactive");
    questions[question_id].classList.add("active");
    make_graph(question_id);
  }
  //questions[questions_id].classList.add("fadeIn");
  //questions[questions_id].
}

function remove_stats(question_id){
  questions[question_id].classList.remove("active");
  questions[question_id].classList.add("inactive");
}

function updateValue(id,value){
  answers[id] = value;
}

function submit(){
  // questions[questions_id].classList.remove("active");
 document.getElementsByClassName("submit-display")[0].classList.remove("inactive");
}

/*
function ComputeScore(){
  const AGR=10;
  const EXT=20;
  const OPN=30;
  const CSN=40;
  const EST=50;
  for(i=0;i<40,i++){

}
*/

// On load

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

whenDocumentLoaded(() => {
  /* <3 Salut mon super-poto voila un Exemple de comment remplir le vecteur data <3 :
   <3 Noublie pas de supprimer cette section quand tu auras remplie avec les vraies données <3*/
  let data = [];
  data.push({"questionName": "Paul","time": 5, "answers":[0.1,0.3,0.3,0.4,0.5,0.4]});
  data.push({"questionName": "Prout","time": 6, "answers":[0.1,0.5,0.3,0.6,0.5,0.4]});
  addQuestions(data);
});

function make_graph(id){
  //let time=data[id].time;
  //let data_point=data[id].answers;
  let data_point=[0.1,0.1,0.2,0.3,0.4,0.5];
  let time=10.3;
  let xticks=["NA",1,2,3,4,5];
  let h=250;
  let w=300;
  let spaceBetweenBars=w/50;
  let margin=w/10;
  let barWidth=(w-margin-spaceBetweenBars*7)/6;

  let graphQuestions=d3.select('#stat'+id);

  const yScale = d3.scaleLinear()
        .range([h, margin])
        .domain([0, 100]);

  const xScale = d3.scaleBand()
        .range([0, w-margin])
        .domain(xticks)
        .padding(0.2);

  /*const svg=d3.select(".stats")
        .append("svg")
        .attr("class","graph")
        .attr("height",h+h/10)
        ;*/
  //graphQuestions=d3.select(".stats");
  const svg=graphQuestions
        .append("svg")
        .attr("class","graph")
        .attr("height",h+h/10)
        ;
  const info_box=d3.select(".stats")
        .append("div")
        .attr("class","info_box")
        ;

   info_box.append('p')
    .text(time +"s")
    .attr("class","text-time")
  ;
  info_box.append('p')
    .text("Average time taken to answer the question")
    .attr("class","text-time-explanation")
  ;


  svg.append('g')
    .attr('transform', `translate(30, 0)`)
    .call(d3.axisLeft(yScale))
   ;

  svg.append('g')
    .attr('transform', `translate(30, 0)`)
    .attr('class', 'grid')
    .attr("class","custom_grid")
    .call(d3.axisLeft()
        .scale(yScale)
        .tickSize(-w+margin , 0, 0)
        .tickFormat(''))
       ;

  svg.append('g')
    .attr('transform', `translate(30, ${h})`)
    .call(d3.axisBottom()
         .scale(xScale))
        ;


  let hGraph=h-margin;
  svg.selectAll("rect")
    .data(data_point)
    .enter()
    .append("rect")
    .attr("height",(d) => hGraph*d)
    .attr("x",(d,i) => margin+i*barWidth+(i+1)*spaceBetweenBars)
    .attr("y",(d,i)=> h-d*hGraph)
    .attr("width",barWidth)
    .attr("class","bar")
   ;


  svg.append("text")
    .attr('x', w / 2 + margin)
    .attr('y', margin/2)
    .attr('text-anchor', 'middle')
    .text('Answers of the other participants')
  ;
  svg.append("text")
    .attr('x',  margin/2)
    .attr('y', margin/2)
    .attr('text-anchor', 'middle')
    .text('[%]')
  ;
  /*
  svg.data(data_point)
    .enter()
    .append("text")
    .attr("x",(d,i) => margin+i*barWidth+(i+1)*spaceBetweenBars)
    //.attr("y",(d,i)=> h-d*hGraph-4)
    .text((d)=>d)
    .attr('text-anchor', 'middle')
   ;*/
  /*
    svg
       .data(data_point)
       .enter()
       .append("text")
       .text((d) => d)
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - (d * 3 + 3))
  ;
  */

}
