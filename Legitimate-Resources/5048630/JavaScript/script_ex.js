  jQuery(function() {
		jQuery( ".datepicker" ).datepicker({
				dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true

		}).datepicker('widget').wrap('<div class="ll-skin-cangas"/>');
 });
jQuery(document).ready(function() {

	jQuery('.datepicker').keydown(function() {
	  return false;
	});
});

jQuery(window).load(function(){
      jQuery('.flexslider').flexslider({
        animation: "fade",
		prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>',          
    	nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>',  
        start: function(slider){
          jQuery('.flexslider').removeClass('loading');
        }
      });
});
	
jQuery(document).ready(function(e) {
 jQuery(".btn_animation_click").click(function(){
	 jQuery(this).addClass('btn_animation_click_active');
	  setTimeout(function () {
		jQuery(".btn_animation_click").removeClass('btn_animation_click_active');
	  }, 300);  
});
});

jQuery(document).ready(function(e) {
	jQuery('.footer-col > h4').append('<span class="toggle"></span>');
	if (jQuery(this).find('span').attr('class') == 'toggle opened') { 
				jQuery(this).find('span').removeClass('opened').parents('.footer-col').find('.footer-col-content').slideToggle(300); 
			}
		jQuery('.footer-col h4').on("click", function(){
			if (jQuery(this).find('span').attr('class') == 'toggle opened') { 
				jQuery(this).find('span').removeClass('opened').parents('.footer-col').find('.footer-col-content').slideToggle(300); 
			}
			else {
				jQuery(this).find('span').addClass('opened').parents('.footer-col').find('.footer-col-content').slideToggle(300);
			}
		});
		
		jQuery('.footer-col>.footer-col-content>ul').filter(function(){
			 if( jQuery(this).children("li").length==0)
			 {
				jQuery(this).parents('.footer-col').addClass('display_none_more');
			}
	 
		});
});
	
jQuery(function () {
jQuery('body').append('<div id="back-top"><i class="fa fa-angle-up"></i></div>');
jQuery('#back-top').hide();
if (jQuery(this).offset()>200)
{
	jQuery('#back-top').fadeIn();
}
else
{
 jQuery('#back-top').fadeOut();
}
 jQuery(window).scroll(function () {
  if (jQuery(this).scrollTop() > 200) {
   jQuery('#back-top').fadeIn();
  } else {
   jQuery('#back-top').fadeOut();
  }
 });
 jQuery(window).load(function () {
  if (jQuery(this).scrollTop() > 200) {
   jQuery('#back-top').fadeIn();
  } else {
   jQuery('#back-top').fadeOut();
  }
 });
 // scroll body to 0px on click
 jQuery('#back-top').click(function () {
	  jQuery('body,html').stop(false, false).animate({
	   scrollTop: 0
	  }, 800);
	  return false;
	 });
});


$(".menu_left").click(function(){
    $(".menu_position_mobile").toggle();
});

$(document).ready(function(){
			$('.menu_dropdown').find('li.parent').append('<strong></strong>');
			
			$('.menu_dropdown li.parent strong').on("click", function(){
							
			//Kiểm tra có trước nếu có thì xoá và ẩn còn không thì add và hiện
			if ($(this).attr('class') == 'opened')
			{ 
				$(this).removeClass().parent('li.parent').find('> ul').slideUp('fast'); 
			} 
			else
			{
				$(this).addClass('opened').parent('li.parent').find('> ul').slideDown('fast');
			}
		});
		$('ul.menu_dropdown>li.parent>ul').filter(function(){
			 if( $(this).children("li").length==0)
				 {
					$(this).parents('li.parent').addClass('display_none_more');

				}
			});
	});

 jQuery('.map-container')
    .click(function(){
            jQuery(this).find('iframe').addClass('clicked')})
    .mouseleave(function(){
            jQuery(this).find('iframe').removeClass('clicked')});
$('.owl-our_logo').owlCarousel({
			loop:false,
			margin:5,
			items:7,
			nav:false,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			autoplaySpeed: 1500,
			autoplay:true,
			dots:false,
			navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ],
			responsiveClass:true,
			responsive:{
				0:{
					items:2
				},
				600:{
					items:4
				},
				1000:{
					items:7
				}
			}
});		

$('.owl-product-slider').owlCarousel({
			loop:true,
			margin:20,
			nav:true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			autoplaySpeed: 1500,
			autoplay:false,
			dots:false,
			navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ],
			responsiveClass:true,
			responsive:{
				0:{
					items:2
				},
				600:{
					items:3
				},
				1000:{
					items:4
				}
			}
});	


$('.owl-product-sale').owlCarousel({
			loop:true,
			margin:20,
			nav:false,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			autoplaySpeed: 1500,
			autoplay:true,
			dots:false,
			navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ],
			responsiveClass:true,
			responsive:{
				0:{
					items:2
				},
				600:{
					items:3
				},
				1000:{
					items:5
				}
			}
});		

jQuery(document).ready(function() {
	$("#id-menu-main").click(function(){
		jQuery('.id-menu-main').toggle();
	});
	//Default Action
	jQuery(".tab_content").hide(); //Hide all content
	jQuery("ul.tabs li:first").addClass("active").show(); //Activate first tab
	jQuery(".tab_content:first").show(); //Show first tab content
	
	//On Click Event
	jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(); //Fade in the active content
		return false;
	});
	});
	
		$('#owl-pro_detail').owlCarousel({
								loop:true,
								margin:10,
								pagination:false,
								nav:true,
								loop:true,
								navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ],
								responsiveClass:true,
								responsive:{
									0:{
										items:2
									},
									600:{
										items:3
									},
									1000:{
										items:4
									}
								}
							});
							
	jQuery(document).ready(function(){
		var menu_search_fixed = jQuery('.menu-search-fixed').offset().top;
		jQuery(window).scroll(function(){
			if(jQuery(window).scrollTop() > menu_search_fixed)
			{
				jQuery('.menu-search-fixed').addClass('fix_top');
			}
			else
			{
				jQuery('.menu-search-fixed').removeClass('fix_top');
			}
		});
		jQuery(window).load(function(){
			if(jQuery(window).scrollTop() > menu_search_fixed)
				{
					jQuery('.menu-search-fixed').addClass('fix_top');
				}
		});
	});