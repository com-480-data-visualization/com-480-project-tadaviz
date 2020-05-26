var elements = $('.modal-overlay, .modal');

$('.submit-button').click(function(){
    elements.addClass('active');
});

$('.close-modal').click(function(){
    elements.removeClass('active');
});
