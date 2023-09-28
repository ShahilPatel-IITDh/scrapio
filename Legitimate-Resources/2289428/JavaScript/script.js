jQuery( document ).ready( function($){
   "use strict";

   
   /**-------------------------------------------------
     *Fixed Header
     *----------------------------------------------------**/
    $(window).on('scroll', function () {

      /**Fixed header**/
      if ($(window).scrollTop() > 250) {
      $('.navbar-sticky').addClass('sticky fade_down_effect');
      } else {
      $('.navbar-sticky').removeClass('sticky fade_down_effect');
      }
});


  /* ----------------------------------------------------------- */
  /*  Menu
  /* ----------------------------------------------------------- */
   $('.dropdown > a').on('click', function(e) {
      e.preventDefault();
      if($(window).width() > 991)
      {
         location.href = this.href; 
      } 
      var dropdown = $(this).parent('.dropdown');
      dropdown.find('>.dropdown-menu').slideToggle('show');
      $(this).toggleClass('opened');
      return false;
    });

    $('.digiqole-elementskit-menu').each(function(){
        $(this).parents('.navbar').addClass('digiqole-elementskit-menu-container');
    });

    /*==========================================================
                    39. scroll bar
        ======================================================================*/

    //     if ($(".video-tab-scrollbar").length > 0) {
    //      $(".video-tab-scrollbar").mCustomScrollbar({
    //          mouseWheel: true,
    //          scrollButtons: {
    //              enable: true
    //          }
    //      });
    //  }

   
   /* ----------------------------------------------------------- */
   /*  tooltip
   /* ----------------------------------------------------------- */
   $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
   });

    /*==========================================================
                   search popup
        ======================================================================*/
        if ($('.xs-modal-popup').length > 0) {
            $('.xs-modal-popup').magnificPopup({
                type: 'inline',
                fixedContentPos: false,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: false,
                callbacks: {
                    beforeOpen: function beforeOpen() {
                        this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup";
                    }
                }
            });
        }

    /* ----------------------------------------------------------- */
   /*  Video popup
   /* ----------------------------------------------------------- */

  if ($('.ts-play-btn').length > 0) {
   $('.ts-play-btn').magnificPopup({
       type: 'iframe',
       mainClass: 'mfp-with-zoom',
       zoom: {
           enabled: true, // By default it's false, so don't forget to enable it

           duration: 300, // duration of the effect, in milliseconds
           easing: 'ease-in-out', // CSS transition easing function

           opener: function (openerElement) {
               return openerElement.is('img') ? openerElement : openerElement.find('img');
           }
       }
   });
}

  if ($('.play-btn').length > 0) {
   $('.play-btn').magnificPopup({
       type: 'iframe',
       mainClass: 'mfp-with-zoom',
       zoom: {
           enabled: true, // By default it's false, so don't forget to enable it

           duration: 300, // duration of the effect, in milliseconds
           easing: 'ease-in-out', // CSS transition easing function

           opener: function (openerElement) {
               return openerElement.is('img') ? openerElement : openerElement.find('img');
           }
       }
   });
}


   /* ----------------------------------------------------------- */
   /*  Back to top
   /* ----------------------------------------------------------- */

   $(window).on('scroll', function () {
    if ($(window).scrollTop() > $(window).height()) {
       $(".BackTo").fadeIn('slow');
    } else {
       $(".BackTo").fadeOut('slow');
    }

    });
    $("body, html").on("click", ".BackTo", function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 800);
    });

    $(".popular-grid-slider").owlCarousel(
           {
            items: 3,
            dots: false,
            loop: true,
            nav: true,
            margin: 30,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 1,
                },
                // breakpoint from 480 up
                480: {
                    items: 2,
                },
                // breakpoint from 768 up
                768: {
                    items: 2,
                },
                // breakpoint from 768 up
                1200: {
                    items: 3,
                }
            }
        }
    );

    $(".category-feature-slider").owlCarousel(
           {
            items: 1,
            dots: false,
            loop: false,
            nav: true,
            margin: 30,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        }
    );

    /*==========================================================
                     scroll bar
        ======================================================================*/

        $('.video-tab-list .post-tab-list li').on('click',function(){
            $('.video-index').html($(this).data('index'));
        });

        if ($(".video-tab-scrollbar").length > 0) {

         $(".video-tab-scrollbar").mCustomScrollbar({
             mouseWheel: true,
             scrollButtons: {
                 enable: true
             }
         });
         
     }
    
          /*==========================================================
                    review rating circle
        ======================================================================*/
        $(function() {
            $('.review-chart').easyPieChart({
              scaleColor: "",
              lineWidth: 5,
              lineCap: 'butt',
              barColor: '#1abc9c',
              trackColor:	"rgba(34,34,34, .4)",
              size: 70,
              animate: 70
            });
          });

         /*==========================================================
                   reading progressbar
        ======================================================================*/  
       
        window.onscroll = function() { reading_progressbar() };

         function reading_progressbar() {
               var digiqole_winScroll = document.body.scrollTop || document.documentElement.scrollTop;
               var digiqole_height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
               var digiqole_scrolled = (digiqole_winScroll / digiqole_height) * 100;
               if (document.getElementById("readingProgressbar")) {
                document.getElementById("readingProgressbar").style.width = digiqole_scrolled + "%";
            }
         }
       
        reading_progress_bar_post();
  
         function reading_progress_bar_post() {
           
            var progressWrap = $('.digiqole_progress_container');
            
       
            if ( progressWrap.length > 0 ) {
                var didScroll = false,
                    windowWrap = $(window),

                    contentWrap = $('.entry-content'),
                    contentHeight = contentWrap.height(),
                    windowHeight = windowWrap.height() * .85;
      
                $(window).scroll(function() {
                    didScroll = true;
                });
      
                $(window).on('resize', function(){
                    windowHeight = windowWrap.height() * .85;
                    progressReading();
                });
      
                setInterval(function() {
                    if ( didScroll ) {
                        didScroll = false;
                        progressReading();
                    }
                }, 150);
      
                var progressReading = function() {
      
                    var windowScroll = windowWrap.scrollTop(),
                        contentOffset = contentWrap.offset().top,
                        contentScroll = ( windowHeight - contentOffset ) + windowScroll,
                        progress = 0;
      
                    if ( windowHeight > contentHeight + contentOffset ) {
                        progressWrap.find('.progress-bar').width(0);
                    } else {
                        if ( contentScroll > contentHeight ) {
                            progress = 100;
                        } else if ( contentScroll > 0 ) {
                            progress = ( contentScroll / contentHeight ) * 100 ;
                           
                        }
      
                        progressWrap.find('.progress-bar').width(progress + '%');
                    }
                }
            }
        }

        // Sticky sidebar

      if(digiqole_ajax.blog_sticky_sidebar == 'yes' && $('#sidebar').length>0){
               
        var top = $('#sidebar').offset().top - parseFloat($('#sidebar').css('marginTop').replace(/auto/, 0));
        var footTop = null;
        if($('.newsletter-area').length>0){
             footTop = $('.newsletter-area').offset().top - parseFloat($('.newsletter-area').css('marginTop').replace(/auto/, 0));
        } else if($('.ts-footer').length>0){
            footTop = $('.ts-footer').offset().top - parseFloat($('.ts-footer').css('marginTop').replace(/auto/, 0));
       }
        else{
            footTop = $('.copy-right').offset().top - parseFloat($('.copy-right').css('marginTop').replace(/auto/, 0));  
        }
       

        var maxY = footTop - $('#sidebar').outerHeight();

        $(window).scroll(function(evt) {
           var y = $(this).scrollTop();

           if($(window).width() > 991)
           {
            if (y > top) {

                if (y < maxY) {
                      $('#sidebar').addClass('fixed').removeAttr('style');
                } else {
                      
  
                      $('#sidebar').removeClass('fixed').css({
                        
                         top: (maxY - top) + 'px',
                         position: 'relative',
                      });
                }
             } else {
  
              $('#sidebar').removeClass('fixed');
             }
           }
         
        });

  }


    /* ----------------------------------------------------------- */
            /*single  post gallery  slider
            /* ----------------------------------------------------------- */
       if($('#single-post-sync-slider1').length > 0){
            
                var sync1 = $("#single-post-sync-slider1");
                var sync2 = $("#single-post-sync-slider2");
                var syncedSecondary = true;
              
                sync1.owlCarousel({
                  items : 1,
                  slideSpeed : 2000,
                  autoplayHoverPause:false,
                  nav: true,
                  autoplay: false,
                  dots: false,
                  loop: true,
                  navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                  responsiveRefreshRate : 200,
              }).on('changed.owl.carousel', syncPosition);
              
                sync2
                  .on('initialized.owl.carousel', function () {
                    sync2.find(".owl-item").eq(0).addClass("current");
                  })
                  .owlCarousel({
                  items : 4,
                  dots: false,
                  nav: false,
                  smartSpeed: 200,
                  slideSpeed : 500,
                  slideBy: 1,
                  margin: 10,
                  responsiveRefreshRate : 100,
                  responsive: {
                   0: {
                      items: 3,
                   },
                   500: {
                      items: 3,
                   },
                   768: {
                      items: 3,
                   },
                   1000: {
                      items:4,
                   }
                }
 
                }).on('changed.owl.carousel', syncPosition2);
              
                function syncPosition(el) {
                
                  var count = el.item.count-1;
                  var current = Math.round(el.item.index - (el.item.count/2) - .5);
                  
                  if(current < 0) {
                    current = count;
                  }
                  if(current > count)Â {
                    current = 0;
                  }
                  
                  //end block
              
                  sync2
                    .find(".owl-item")
                    .removeClass("current")
                    .eq(current)
                    .addClass("current");
                      var onscreen = sync2.find('.owl-item.active').length - 1;
                      var start = sync2.find('.owl-item.active').first().index();
                      var end = sync2.find('.owl-item.active').last().index();
                  
                  if (current > end) {
                    sync2.data('owl.carousel').to(current, 100, true);
                  }
                  if (current < start) {
                    sync2.data('owl.carousel').to(current - onscreen, 100, true);
                  }
                }
                
                function syncPosition2(el) {
                  if(syncedSecondary) {
                    var number = el.item.index;
                    sync1.data('owl.carousel').to(number, 100, true);
                  }
                }
                
                sync2.on("click", ".owl-item", function(e){
                  e.preventDefault();
                  var number = $(this).index();
                  sync1.data('owl.carousel').to(number, 300, true);
                });
           
            }


      /*==========================================================
                        Preloader
      ======================================================================*/
      $(window).on('load', function () {
         
        setTimeout(() => {
           $('#preloader').addClass('loaded');
        }, 1000);
        
        });
        
     // preloader close
     $('.preloader-cancel-btn').on('click', function (e) {
        e.preventDefault();
        if (!($('#preloader').hasClass('loaded'))) {
           $('#preloader').addClass('loaded');
        }
     });


} );

  