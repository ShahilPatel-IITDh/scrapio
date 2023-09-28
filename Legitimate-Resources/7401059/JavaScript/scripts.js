(function ($, root, undefined) {
	
	$(function () {
		
		'use strict';
		
		//  ****** Mega Menu script start *********
		$('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
        //Checks if li has sub (ul) and adds class for toggle icon - just an UI
    
    
        $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
        //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)
    
        $(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\"></a>");
    
        //Adds menu-mobile class (for mobile toggle menu) before the normal menu
        //Mobile menu is hidden if width is more then 991px, but normal menu is displayed
        //Normal menu is hidden if width is below 991px, and jquery adds mobile menu
        //Done this way so it can be used with wordpress without any trouble
    
        $(".menu > ul > li").hover(function (e) {
            if ($(window).width() > 991) {
                $(this).children("ul").stop(true, false).fadeToggle(150);
                e.preventDefault();
            }
        });
        $(".menu > ul > li").mouseleave(function (e) { // this is to prevent dropdown shown even if we leave the mouse from menu
            if ($(window).width() > 991) {
                $(this).children("ul").hide();
                e.preventDefault();
            }
        });
        //If width is more than 991px dropdowns are displayed on hover
        $(".menu > ul").removeClass('show-on-mobile');
        $(".menu > ul > li").click(function () {
            if ($(window).width() <= 991) {
                $(this).children("ul").fadeToggle(150);
            }
        });
        //If width is less or equal to 991px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)
        
        $(".menu-mobile").click(function (e) {
            $(".menu > ul").toggleClass("show-on-mobile");
            e.preventDefault();
        });
        //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)
        
        //////////////////////////////////////
        
        // sticky header on scroll
        
        window.onscroll = function() {stickyheaderFunction()};

        var header = document.getElementById("header");
        var sticky = header.offsetTop;
        
        function stickyheaderFunction() {
          if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
          } else {
            header.classList.remove("sticky");
          }
        }
        
        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        // $('#back-to-top').tooltip('show');
        
        // animated button
       /* $('.threedx').mouseover(function() {
            $(this).addClass('animated flipInX');
        });
        $('.threedx').mouseout(function() {
            $(this).removeClass('animated flipInX');
        }); */
        
        /* lazy load background images */
        $.fn.visible = function(partial) {
              if (this.nodeName == "BODY") { return; }
              var $t            = $(this),
                  $w            = $(window),
                  viewTop       = $w.scrollTop(),
                  viewBottom    = viewTop + $w.height(),
                  _top          = $t.offset().top,
                  _bottom       = _top + $t.height(),
                  compareTop    = partial === true ? _bottom : _top,
                  compareBottom = partial === true ? _top : _bottom;
            
            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        
          };
        $(window).scroll(function(event) {
  
          $(".bg-image").each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
              el.removeClass("lazy"); 
            }
          });
          
        });
        /* owl carousel prev next button text change */
        $('.industries-carousel .owl-theme .owl-controls div.owl-prev').text('');
        $('.industries-carousel .owl-theme .owl-controls div.owl-prev').addClass('fa-arrow-left');
        $('.industries-carousel .owl-theme .owl-controls div.owl-next').text('');
        $('.industries-carousel .owl-theme .owl-controls div.owl-next').addClass('fa-arrow-right');
        
        /* arrow button adjustement */
        $('.full-btn .kc_button .fa-arrow-right').hide();
        $('.full-btn .kc_button').mouseover(function(){
            $('.full-btn .kc_button .fa-arrow-right').css('display','inline');
        });
        $('.full-btn .kc_button').mouseout(function(){
            $('.full-btn .kc_button .fa-arrow-right').css('display','none');
        });
        
        /* Defer CSS */
        // var giftofspeed = document.createElement('link');
        // giftofspeed.rel = 'stylesheet';
        // giftofspeed.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
        // giftofspeed.type = 'text/css';
        // var godefer = document.getElementsByTagName('link')[0];
        // godefer.parentNode.insertBefore(giftofspeed, godefer);
        
        /* modal popup form */
        // $('.quoteform').attr('data-toggle', 'modal');
        // $('.quoteform').attr('data-target', '#quoteform');
		
	});
	
})(jQuery, this);

/* jQuery(document).ready(function(){
    jQuery(".imgradio img.data1").click(function(event) {
        setTimeout(function() { jQuery("button.data1" ).trigger( "click" );}, 500);
      });
      jQuery(".imgradio img.data2").click(function(event) {
        setTimeout(function() { jQuery("button.data2" ).trigger( "click" );}, 500);
      });
}); */