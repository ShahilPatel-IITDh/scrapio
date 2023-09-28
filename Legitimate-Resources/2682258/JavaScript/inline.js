
/* Default comment here */ 

jQuery('#fixed-bottom-bar').ready(function( $ ){
//   setTimeout(function() {
    let height = $('#fixed-bottom-bar').outerHeight();
  	$('footer').css('margin-bottom', height+'px');
//   },5000);
});