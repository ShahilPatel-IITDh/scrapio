(function($) {
  "use strict";
function homemain() {
  var Homemain = new Swiper('.homemain', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });              
}
homemain(); 
// featured post
function editorchoice() {
  var Editorchoice = new Swiper('.editorchoice', {
    direction: 'horizontal',
    loop: false,
    autoplay: true,
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
      },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }
  });   
}
editorchoice(); 
// featured post
// featured post
function postcrousel() {
  var postcrousel = new Swiper('.postcrousel', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });              
}
postcrousel(); 
// featuredcat crowsel
// featuredcat crowsel
function featuredcat() {
  var featuredcat = new Swiper('.featuredcat', {
    direction: 'horizontal',
    loop: false,
    autoplay: true,
    slidesPerView: 1,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }
  });              
}
featuredcat(); 
// featuredcat crowsel
// colmnthree crousel
function colmnthree() {
  var colmnthree = new Swiper('.colmnthree', {
    direction: 'horizontal',
    loop: false,
    autoplay: true,
    slidesPerView: 1,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }
  });              
}
colmnthree(); 

function marquee() {
  jQuery('.marquee').marquee({
  speed: 50,
  direction: 'left', 
  delayBeforeStart: 0,
  duplicated: true,
  pauseOnHover: true,
  startVisible: true
  });
}
marquee();

/* =================================
===         SCROLL TOP       ====
=================================== */
jQuery(".ta_upscr").hide(); 
function taupr() {
  jQuery(window).on('scroll', function() {
    if ($(this).scrollTop() > 500) {
        $('.ta_upscr').fadeIn();
    } else {
      $('.ta_upscr').fadeOut();
    }
  });   
  $('a.ta_upscr').on('click', function()  {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
}    
taupr();
})(jQuery);