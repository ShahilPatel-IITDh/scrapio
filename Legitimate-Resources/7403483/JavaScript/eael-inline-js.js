jQuery(document).ready(function($) {
 
 function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
};
 
 $(window).scroll(function () {
 
 var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
 
  if (isScrolledIntoView($('#first'))) {
    
    $('#first').addClass('fadeInAnimated');
  }
   if (isScrolledIntoView($('#second'))) {
    
    $('#second').addClass('fadeInAnimated');
  }
   if (isScrolledIntoView($('#third'))) {
    
    $('#third').addClass('fadeInAnimated');
  }
}
  /*  if (isScrolledIntoView($('.n-uc-1b06293d4a3bc'))) {
    
    $('.n-uc-1b06293d4a3bc').addClass('fadeInAnimated');
  }*/
  
  

   if (isScrolledIntoView($('#second-line'))) {
    
    $('#second-line').addClass('fadeInAnimated');
  }  
   if (isScrolledIntoView($('.n-uc-16c88d4923bf9'))) {
    
    $('.n-uc-16c88d4923bf9').addClass('fadeInAnimated');
  }
   if (isScrolledIntoView($('.n-uc-1d03b3ab97ea7'))) {
    
    $('.n-uc-1d03b3ab97ea7').addClass('fadeInAnimated');
  }
  
  
});
 
 
});