(function ($) {
    'use strict';

    $(document).ready(function () {
        if (document.getElementById('innerSlider') !== null) {
            var swiper = new Swiper('#innerSlider', {
                slidesPerView: 1,
                spaceBetween: 0,
                autoplay: false,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
        }
    });

})(jQuery);
