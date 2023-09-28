jQuery.noConflict(); 
jQuery(document).ready(function() { 
 jQuery('a.lightbox').fancybox({ 
  'titlePosition' : 'over', 
  'overlayColor' : '#AAA', 
  'overlayOpacity' : '0.5', 
  'hideOnContentClick' : 'true', 
  'speedIn' : '100', 
  'speedOut' : '100', 
  'transitionIn' : 'elastic', 
  'transitionOut' : 'elastic'
 }); 
});