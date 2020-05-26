$(document).delegate(".submit-button",'click',async function(){
  await new Promise(r => setTimeout(r, 100));
  var elements = $('.modal-overlay, .modal');
  elements.addClass('active');
});

$(document).delegate(".close-modal",'click',async function(){
  var elements = $('.modal-overlay, .modal');
  elements.removeClass('active');
});
