//** Oxygen Composite Elements Settings Section **//
//** Edit the variables below to change the behavior of the element. **//

var scrollDistance = 300; // Set this to the scroll distance at which you want the button to appear.

//** That's it, stop editing! **/

jQuery(document).ready( function() {
  
  // If we're in the builder, do not execute.
  var url_string = window.location.href;
  var url = new URL(url_string);
  var param = url.searchParams.get("ct_builder");
  
  if( param ) { return; }
  
  jQuery('.oxel_back_to_top_container').addClass('oxel_back_to_top_container--hidden');
  
})

jQuery(window).on('scroll', function() {
  
  var topPos = jQuery(window).scrollTop();
  
  if( topPos > scrollDistance ) {
   jQuery('.oxel_back_to_top_container').removeClass('oxel_back_to_top_container--hidden'); 
  } else {
   jQuery('.oxel_back_to_top_container').addClass('oxel_back_to_top_container--hidden');
  }
  
})