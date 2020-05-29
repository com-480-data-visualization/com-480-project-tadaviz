

var slide_time = 1200; // The time it takes to complete an entire transition
var change_point = slide_time / 2; // Calculates when the slide should change
var next_button = $('.easytransitions_navigation_next'); // Element that trigger move right


async function transition(page_id){
  set_transition("split_diamond");
  setTimeout(function(){
    $('.active_page').hide().removeClass('active_page');
    $(page_id).addClass('active_page').show();
  },change_point);
};

// Set transition type
async function set_transition(transition_type){
  $('.easytransitions_transition div').addClass(transition_type);
  await new Promise(r => setTimeout(r, 1200));
  $('.easytransitions_transition div').removeClass(transition_type);

};
