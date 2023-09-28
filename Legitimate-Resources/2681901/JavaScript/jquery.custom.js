/*-----------------------------------------------------------------------------------

 	Custom JS - All front-end jQuery
 
-----------------------------------------------------------------------------------*/
 


jQuery(document).ready(function() {
								
								
 if (jQuery().superfish) {	
 
  jQuery('ul#nav').superfish({ 
            delay:       0,                            // one second delay on mouseout 
            animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
			disableHI: true,
            speed:       'fast'                          // faster animation speed 
        }); 
}

selectnav('nav', {
    nested: true,
	indent: '-',
    label: false
});

});

jQuery(document).ready(function(a){
	a("a[href=#scroll-top]").click(function(){
	a("html, body").animate({scrollTop:0},"slow");return false}
	
	)});

jQuery(window).load(function() {
    jQuery('.flexslider').flexslider( {
	directionNav: true,
	controlNav: false,
	animationLoop: true
	 });
  });

jQuery(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    jQuery("#content_container").fitVids();
  });