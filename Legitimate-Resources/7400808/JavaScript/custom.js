jQuery(function() {
    
	var $ = jQuery;
    
  $('body').addClass('postload');


    $(document).ready(function() {

    
        // Mobile menu
        
        $(".hamburger").click(function(){
          $("body").toggleClass("menu-open");
        });
        
        
        // Sticky Nav Collapse
        $('body:not(.splash-page)').waypoint(function() {
          $(this).toggleClass('collapse');
        }, { offset: -150 });
        
        $('body:not(.splash-page) #main-content').css({"padding-top" : $("#header-wrap").height() + "px"});
      	
      	// --------------------------------------------------------------------------------------//
        
        // Add fullwidth class to gallery thumbs if less than 6

      	$('.imageGallery').each(function(){
      	  if ($(this).children('div').length <= 6) {
      	    $(this).children('div').addClass('fullwidth-mobile');
      	  }
      	});
          	
        // --------------------------------------------------------------------------------------//
        
        // Add current class to store gallery thumb
        
        $("#wsite-com-product-images-strip a:first").addClass("current");

        $("#wsite-com-product-images-strip a").click(function(){
          $(".current").removeClass("current");
          $(this).addClass("current");
        });
        
        // --------------------------------------------------------------------------------------//
        
        // Add swipe to fancybox mobile 

        var swipeGallery = function(){
          setTimeout(function(){
          var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
          var mc = new Hammer(touchGallery);
          mc.on("panleft panright", function(ev) {
            if (ev.type == "panleft") {
              $("a.fancybox-next").trigger("click");
            }
            else if (ev.type == "panright") {
              $("a.fancybox-prev").trigger("click");
            }
            swipeGallery();
          });
          }, 500);
        }
        if ('ontouchstart' in window) {
          $("body").on( "click", "a.w-fancybox", function() {
            swipeGallery();
          });
      	}

        
        // --------------------------------------------------------------------------------------//
      
        // Watch for changes on non-mobile nav

        if ($(window).width() < 768) {

          var mainNav = '#nav',
              mobileNav = "#navmobile";

          $(mainNav).on('DOMSubtreeModified propertychange', function() {
            $(mainNav + " li a").each(function(){
              // Differentiating post-load nav elements by the presence of an id
              if ($(this).attr("id") && $(this).attr("id") != "wsite-nav-cart-a") {
                var navLinkId = $(this).attr("id");
                var navLinkParent = $(this).parent().detach();

                // Append to mobile nav if new element
                if (!$(mobileNav + " #"+navLinkId).length) {
                  $(mobileNav + " .wsite-menu-default").append(navLinkParent);
                  var newheight = $(mobileNav + " .wsite-menu-default").height();
                  $(".wsite-mobile-menu").height(newheight);
                }
              }
            });
          });          
        }

        // --------------------------------------------------------------------------------------//
      
    });
});

