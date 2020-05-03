let questions=document.getElementsByClassName("stats");
console.log(questions[1].parentElement);
function activate_stats(questions_id){
  if(questions_id-1>=0){
    remove_stats(questions_id-1)
  }
  questions[questions_id].classList.remove("inactive");
  questions[questions_id].classList.add("active");
}

function remove_stats(questions_id){
  questions[questions_id].classList.add("inactive")
}