// Modal

var elements = $('.explanation_modal-overlay, .explanation_modal');

$('.explanation_button').click(function(){
    elements.addClass('active');
});

$('.close-explanation_modal').click(function(){
    elements.removeClass('active');
});
