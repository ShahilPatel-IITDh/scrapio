$(function () {
    'use strict';
     // jQuery.noConflict();

    $(document).ready(function () {
        var $carousel = $('#slideshowWrap .owl-carousel');
        $carousel = allSlideshows[$carousel.attr('id')];

        var addAnimation = (function (event) {
            var item = $(event.target).find('.item')[event.item.index];
            $(item).find('.content').addClass('animation');
            setTimeout(function(){
                $(item).find('.content').addClass('caption');
            }, 500);
        });
        var removeAnimation = (function (event) {
            $(event.target).find('.content').removeClass('caption animation');
        });

        $carousel.on('initialized.owl.carousel', addAnimation);
        $carousel.on('translate.owl.carousel', removeAnimation);
        $carousel.on('translated.owl.carousel', addAnimation);

        // Display first caption
        let it = $('.owl-item.active .item')[0];
        $(it).find('.content').addClass('animation');
        $(it).find('.content').addClass('caption');
    });
});