(function ($) {
    'use strict';

    var mySwiper = undefined;

    function initSwiper() {
        var screenWidth = $(window).width();
        if (screenWidth < 1000 && mySwiper == undefined) {
            mySwiper = new Swiper('#carousel-slider', {
                slidesPerView: 2,
                spaceBetween: 0,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    600: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                }
            });
        } else if (screenWidth > 991 && mySwiper != undefined) {
            mySwiper.destroy();
            mySwiper = undefined;
            $('.swiper-wrapper').removeAttr('style');
            $('.swiper-slide').removeAttr('style');
        }
    }

//Swiper plugin initialization
    initSwiper();

//Swiper plugin initialization on window resize
    $(window).on('resize', function () {
        initSwiper();
    });

})(jQuery);