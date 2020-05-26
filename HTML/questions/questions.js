//// VARIABLES

const NBR_ANSWER = 5;
const personalities = ["EXT", "EST", "AGR", "CSN", "OPN"];
let questions = document.getElementsByClassName("stats");
let graph_questions = d3.selectAll(".stats");
let container = document.getElementById("placeholder");
let test = document.getElementsByClassName("radio_group");
let add_else = document.getElementById("buttons");
let questions_step = 1;

//Vector image of the upward arrow in uri form
//Prevents multiple unecessary request to other servers
let up_arrow_data="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ1MS44NDZweCIgaGVpZ2h0PSI0NTEuODQ3cHgiIHZpZXdCb3g9IjAgMCA0NTEuODQ2IDQ1MS44NDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1MS44NDYgNDUxLjg0NzsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTM0NS40NDEsMjQ4LjI5MkwxNTEuMTU0LDQ0Mi41NzNjLTEyLjM1OSwxMi4zNjUtMzIuMzk3LDEyLjM2NS00NC43NSwwYy0xMi4zNTQtMTIuMzU0LTEyLjM1NC0zMi4zOTEsMC00NC43NDQNCgkJTDI3OC4zMTgsMjI1LjkyTDEwNi40MDksNTQuMDE3Yy0xMi4zNTQtMTIuMzU5LTEyLjM1NC0zMi4zOTQsMC00NC43NDhjMTIuMzU0LTEyLjM1OSwzMi4zOTEtMTIuMzU5LDQ0Ljc1LDBsMTk0LjI4NywxOTQuMjg0DQoJCWM2LjE3Nyw2LjE4LDkuMjYyLDE0LjI3MSw5LjI2MiwyMi4zNjZDMzU0LjcwOCwyMzQuMDE4LDM1MS42MTcsMjQyLjExNSwzNDUuNDQxLDI0OC4yOTJ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==";

//// QUESTION CLASS

class Question {

  constructor(name,id){
    this.name = name;
    this.id = id;
    this.output = [];
    this.add_name(this.output, this.name);
    this.add_radio_group(this.output, this.name, this.id);
  }

  add_name(output){
    output.push('<p class ="question_text">'+ this.name +'</p>');
  }

  add_radio_group(output){
    let radio_group=[];
    for(let i = 1; i <= NBR_ANSWER; i++){
      // default active radio button
      if (i == 3){
        radio_group.push('<div class="rb-tab rb-tab-active" data-value="' + i.toString() +
        '"><div class="rb-spot"><span class="rb-txt">'+ i.toString() + '</span></div></div>');
      }
      else{
        radio_group.push('<div class="rb-tab" data-value="' + i.toString() +
        '"><div class="rb-spot"><span class="rb-txt">'+ i.toString() + '</span></div></div>');
      }
    }
    radio_group = '<div id="rb-'+ this.id.toString() + '" class="rb">' + radio_group.join('') + '</div></div>'
    output.push(radio_group);
  }

  get_HTML(){
    return '<div id = q' + this.id + 'class="question">' + this.output.join('') +'</div>';
  }

}

//// ON LOAD

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

whenDocumentLoaded(() => {
  let data = [];
  for (k in questions_corpus){
    if (k.substring(0,3) == personalities[questions_step - 1]){
      let distribution = [];
      for (n in ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"]){
        distribution.push(global_distributions[k][n]);
      }
      data.push({"name": questions_corpus[k], "id":k, "time": 0, "distribution": distribution, "x": ["0", "1", "2", "3", "4", "5"]});
    }
  }
  add_questions(data);
});


//// FUNCTIONS

function add_questions(data){
  let questions_HTML=[];
  for(let i=0; i<data.length; i++){
    const question_HTML = new Question(data[i].name,i).get_HTML();
    questions_HTML.push(question_HTML);
  }
  container.innerHTML = questions_HTML.join('');
}


async function next_questions(){
  // Update the questions
  await new Promise(r => setTimeout(r, 50));
  questions_step += 1;
  let data = [];
  for (k in questions_corpus){
    if (k.substring(0,3) == personalities[questions_step-1]){
      let distribution = [];
      for (n in ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"]){
        distribution.push(global_distributions[k][n]);
      }
      data.push({"name": questions_corpus[k], "id":k, "time": 0, "distribution": distribution, "x": ["0", "1", "2", "3", "4", "5"]});
    }
  }
  add_questions(data);

  // If it's the final update, change the button
  if (questions_step == 5){
    document.getElementById("button-box").innerHTML =
    '<button class="submit-button button trigger" onclick="submit()">Submit</button>'

  }
}

async function submit(){
  // Save the last answers
  save_data();

  // Let the other js file compute the last answers
  await new Promise(r => setTimeout(r, 50));

  // Compute the score of the participant
  let scores = {'EXT':0, 'EST':0, 'AGR':0, 'CSN':0, 'OPN':0}
  let question_idx = 0;
  for(s in data_scoring){
    const answer = survey[question_idx][1];
    let category;
    if (question_idx%10 == 9){
      // Cases when 'EXT10' for instance
      category = s.substring(0, s.length - 2);
    }
    else{
      category = s.substring(0, s.length - 1);
    }
    scores[category] += (parseInt(answer,10) * parseInt(data_scoring[s]['score'], 10));
    question_idx += 1;
  }

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
/*function activate_stats(question_id, question_value){
  if (question_id - 1 >= 0) {
    //remove_stats(questions_id-1);
  }
  if (questions[question_id].classList.contains("inactive")) {
    questions[question_id].classList.remove("inactive");
    questions[question_id].classList.add("active");


    questions[question_id].classList.innerHTML = "<div id='container'><svg viewBox='0 0 800 600'/></div>";
    console.log(questions[question_id].classList);
    // Barplot for EXT1
    console.log("okok");
    bar_plot = new Barplot({"name": "I am the life of the party.", "id": "EXT1", "distribution": [0.1,0.3,0.4,0.5,0.6], "x": ["0", "1", "2", "3", "4", "5"]}, 80, 700, 600);
    bar_plot.make_plot();
    //make_graph(question_id);
  }
}*/
/*async function remove_stats(question_id){
  questions[question_id].classList.remove("active");
  questions[question_id].classList.add("deactivate");
  questions[question_id].classList.add("inactive");
  await new Promise(r => setTimeout(r, 1000));
  questions[question_id].classList.remove("deactivate");
}*/
