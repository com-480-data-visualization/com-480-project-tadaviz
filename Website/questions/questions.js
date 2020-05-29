//code to load the question

const NBR_ANSWER = 5;
const personalities = ["EXT", "EST", "AGR", "CSN", "OPN"];
let questions = document.getElementsByClassName("stats");
let graph_questions = d3.selectAll(".stats");
let container = document.getElementById("placeholder");
let test = document.getElementsByClassName("radio_group");
let add_else = document.getElementById("buttons");
let questions_step = 1;

//// QUESTION CLASS

class Question {

  constructor(name, question_id, id){
    this.name = name;
    this.question_id = question_id;
    this.id = id;
    this.output = [];
    this.add_name(this.output, this.name);
    this.add_radio_group(this.output, this.name, this.id);
  }

  add_name(output){
    output.push('<p class ="question_text">'+ this.question_id + " : " + this.name +'</p>');
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
    const question_HTML = new Question(data[i].name, data[i].id, i).get_HTML();
    questions_HTML.push(question_HTML);
  }
  container.innerHTML = questions_HTML.join('');
}

async function next_questions(){
  set_transition("split_horizontal");
  // Update the questions
  await new Promise(r => setTimeout(r, 400));
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
    '<button class="submit-button button trigger" onclick="submit()" id="submit_button">Submit</button>'+
    '<div class="modal-overlay">'+
      '<div class="modal">'+
        '<a class="close-modal">'+
        '<svg class="bi bi-x-circle" viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg">'+
          '<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>'+
          '<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>'+
          '<path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>'+
        '</svg>'+
        '</a>' + // close modal
        '<div class="modal-content" id="m_content">'+
        '</div>' + // content
      '</div>' + // modal
    '</div>'; // overlay
  }
}

async function submit(){



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

  // Compute the matching country
  let matching_country = '';
  let best_distance = 10000.0;
  for(cs in country_raw_mean_score){
    let l2_distance = 0;
    for(p in personalities){
      const s = parseFloat(scores[personalities[p]]);
      const c_s = parseFloat(country_raw_mean_score[cs][personalities[p]]);
      l2_distance += (s-c_s)**2;
    }
    if (Math.sqrt(l2_distance) < best_distance){
      ISO2_code.forEach((item, i) => {
        if (item['Code']==cs){
          matching_country = item['Name']
        }
      });
      best_distance = Math.sqrt(l2_distance);
    }
  }
Object.keys(scores).forEach((item, i) => {
  console.log(item)
  localStorage.setItem(item, scores[item])
});

country_to_display=''
matching_country+='!'
matching_country.split("").forEach((item, i) => {
  country_to_display+='<b>'+item+'</b>'
});

  // Display the matching country
  let modal_content = document.getElementById("m_content");
  m_content.innerHTML =
  '<section class="container">'+

    '<div id="first" class="title">'+
      "<span class='text'>Congratulations !</span>"+
    '</div>'+

    '<div id="second" class="title">'+
      "<span class='text'>The country</span>"+
      "<span class='text'>That fits you best</span>"+
      "<span class='text'>is ...</span>"+
    '</div>'+
    '<div class="animate response">'+

  			country_to_display+'</br>'+
        '<button id="resultbutton" class = "qbutton" onclick="window.location.href = '+"'results/results.html'"+';">Learn more </button>'+
  	'</div>'+

  '</section>';

  await new Promise(r => setTimeout(r, 200));

  // Deactivate the submit button
  let submit_button = document.getElementById("submit_button");
  submit_button.onclick = function(){};

}
