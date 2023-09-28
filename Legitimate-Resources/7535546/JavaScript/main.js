(function ($) {
 "use strict";
 /*----------------------------
  Header Top JS
------------------------------ */
 	$(".slide-toggle").on('click', function(){
        $(".show-toggle").slideToggle();
		$(".show-toggle-2").css("display","none");
		$(".show-toggle-3").css("display","none");
    });
 	$(".slide-toggle-2").on('click', function(){
        $(".show-toggle-2").slideToggle();
		$(".show-toggle").css("display","none");
		$(".show-toggle-3").css("display","none");
    });
 	$(".slide-toggle-3").on('click', function(){
        $(".show-toggle-3").slideToggle();
		$(".show-toggle").css("display","none");
		$(".show-toggle-2").css("display","none");
    });

/*-------------------------
  showlogin toggle function
--------------------------*/
	 $( '#showlogin' ).on('click', function() {
        $( '#checkout-login' ).slideToggle(900);
     }); 
	
/*-------------------------
  showcoupon toggle function
--------------------------*/
	 $( '#showcoupon' ).on('click', function() {
        $( '#checkout_coupon' ).slideToggle(900);
     });
	 
/*-------------------------
  Create an account toggle function
--------------------------*/
	 $( '#cbox' ).on('click', function() {
        $( '#cbox_info' ).slideToggle(900);
     });
	 
/*-------------------------
  Create an account toggle function
--------------------------*/
	 $( '#ship-box' ).on('click', function() {
        $( '#ship-box-info' ).slideToggle(1000);
     });	
		
	
	
/*----------------------------
 jQuery mainmenu
------------------------------ */
	$(".product-menu-title").on("click", function() {
		$(".product_vmegamenu").slideToggle(500);
	});

/*----------------------------
 jQuery MeanMenu
------------------------------ */
jQuery('#mobile-menu').meanmenu();		
	
	
	
})(jQuery);  