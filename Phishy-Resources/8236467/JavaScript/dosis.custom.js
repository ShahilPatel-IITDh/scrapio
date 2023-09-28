/* 
Dosis Minimal Agency Portfolio
Author - design_mylife
Project Version - v1.2
 */
(function ($) {
    "use strict";
    /**Preloader*/
    $(window).preloader({
        delay: 500
    });
    /* Bootstrap tooltips / toast / popovers */
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('.toast').toast('show')
    //auto close navbar-collapse on click a
    $('.navbar .nav-item>.anchor-scroll').on('click', function () {
        $('.navbar-toggler:visible').click();
    });
    /*sticky navbar*/
    $("#navbar-sticky").sticky({ topSpacing: 0 });
    /**transparent header fixed-top */
    /*header shrink*/
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 90) {
            $("#navbar-fixed-top").addClass("sticky-active");
        } else {
            $("#navbar-fixed-top").removeClass("sticky-active");
        }
    });
    /*Tetimonials swiper*/
    var swiper = new Swiper('.swiper-testimonials', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 8000,
        },
    });
    /* Partners swiper slider */
    var swiper = new Swiper('.swiper-partners', {
        slidesPerView: 5,
        slidesPerColumn: 3,
        slidesPerGroup: 5,
        spaceBetween: 50,
        grabCursor: true,
        autoplay: {
            delay: '3000'
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30,
            },
            640: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 20,
            },
            320: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 10,
            }
        },
    });


    /* Home Slider */
    var swiper = new Swiper('.swiper-hero', {
        direction: 'vertical',
        loop:true,
        autoplay: {
            delay: '5000'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    /*back to top*/
    /** --------------------------------back to top-----------------------------------**/
    var btn = $('.scrollToTop');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });
    $('.scrollToTop').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
    /*smooth scroll*/
    $('.anchor-scroll').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 68
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    /* Parallax */
    $('.parallax-me').parallaxBackground();
})(jQuery);

$(function () {
    "use strict";
    if ($('.scrollReveal').length && !$('html.ie9').length) {
        $('.scrollReveal').parent().css('overflow', 'hidden');
        window.sr = ScrollReveal({
            reset: true,
            distance: '25px',
            mobile: true,
            duration: 850,
            scale: 1,
            viewFactor: 0.3,
            easing: 'ease-in-out'
        });
        sr.reveal('.sr-top', { origin: 'top' });
        sr.reveal('.sr-bottom', { origin: 'bottom' });
        sr.reveal('.sr-left', { origin: 'left' });
        sr.reveal('.sr-long-left', { origin: 'left', distance: '70px', duration: 1000 });
        sr.reveal('.sr-right', { origin: 'right' });
        sr.reveal('.sr-scaleUp', { scale: '0.8' });
        sr.reveal('.sr-scaleDown', { scale: '1.15' });

        sr.reveal('.sr-delay-1', { delay: 200 });
        sr.reveal('.sr-delay-2', { delay: 400 });
        sr.reveal('.sr-delay-3', { delay: 600 });
        sr.reveal('.sr-delay-4', { delay: 800 });
        sr.reveal('.sr-delay-5', { delay: 1000 });
        sr.reveal('.sr-delay-6', { delay: 1200 });
        sr.reveal('.sr-delay-7', { delay: 1400 });
        sr.reveal('.sr-delay-8', { delay: 1600 });

        sr.reveal('.sr-ease-in-out-quad', { easing: 'cubic-bezier(0.455,  0.030, 0.515, 0.955)' });
        sr.reveal('.sr-ease-in-out-cubic', { easing: 'cubic-bezier(0.645,  0.045, 0.355, 1.000)' });
        sr.reveal('.sr-ease-in-out-quart', { easing: 'cubic-bezier(0.770,  0.000, 0.175, 1.000)' });
        sr.reveal('.sr-ease-in-out-quint', { easing: 'cubic-bezier(0.860,  0.000, 0.070, 1.000)' });
        sr.reveal('.sr-ease-in-out-sine', { easing: 'cubic-bezier(0.445,  0.050, 0.550, 0.950)' });
        sr.reveal('.sr-ease-in-out-expo', { easing: 'cubic-bezier(1.000,  0.000, 0.000, 1.000)' });
        sr.reveal('.sr-ease-in-out-circ', { easing: 'cubic-bezier(0.785,  0.135, 0.150, 0.860)' });
        sr.reveal('.sr-ease-in-out-back', { easing: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)' });
    }
});


