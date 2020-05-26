//// VARIABLES

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
    '<button class="submit-button button trigger" onclick="submit()" id="submit_button">Submit</button>'+
    '<div class="modal-overlay">'+
      '<div class="modal">'+
        '<a class="close-modal"><svg viewBox="0 0 20 20">'+
        '<path fill="#000000" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path></svg>'+
        '</a>' + // close modal
        '<div class="modal-content" id="m_content">'+
          '<h3>Some content here</h3>'+
        '</div>' + // content
      '</div>' + // modal
    '</div>'; // overlay
  }
}

async function submit(){

  /*
  // Save the last answers
  save_data();
  */

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
      matching_country = cs;
      best_distance = Math.sqrt(l2_distance);
    }
  }
  console.log(survey);
  console.log(scores);
  console.log(country_raw_mean_score['KH'])
  console.log(best_distance);
  console.log(matching_country);

  // Display the matching country
  let modal_content = document.getElementById("m_content");
  m_content.innerHTML = "Congratulations ! The country that best matches your personality is..." + matching_country.toUpperCase() +" !";

  await new Promise(r => setTimeout(r, 200));

  // Deactivate the submit button
  let submit_button = document.getElementById("submit_button");
  submit_button.onclick = function(){};

  /*
  // OR
  document.getElementById("button-box").innerHTML =
  '<button class="submit-button button trigger" id="submit_button">Submit</button>';
  */
}
