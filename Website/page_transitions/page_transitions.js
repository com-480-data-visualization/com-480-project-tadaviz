// Options

var slide_time = 1200; // The time it takes to complete an entire transition
var change_point = slide_time / 2; // Calculates when the slide should change
var next_button = $('.easytransitions_navigation_next'); // Element that trigger move right

/*
Transitions list :
split_diamond
split_vertical
split_diagonal
split_horizontal
split_diagonal_alt
wipe_top
wipe_left
wipe_right
wipe_bottom
*/

async function transition(page_id){
  console.log("okok");
  console.log(page_id);
  set_transition("split_diamond");
  //await new Promise(r => setTimeout(r, 600));
  //window.location.href = "index.html";
  setTimeout(function(){
    $('.active_page').hide().removeClass('active_page');
    $(page_id).addClass('active_page').show();
  },change_point);
};

// Set transition type
function set_transition(transition_type){
  $('.easytransitions_transition div').addClass(transition_type);
};
