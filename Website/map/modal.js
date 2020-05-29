// Modal

var modalelem = $('.modal-overlay, .modal');
var mapelem = $('#mapid');
$('#expbutton').click(function(){
    modalelem.addClass('active');
    mapelem.css('z-index','-1');
});

$('.close-modal').click(function(){
    modalelem.removeClass('active');
    mapelem.css('z-index','0');
});
