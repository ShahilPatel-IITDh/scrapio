$(document).ready(function(){
    if($('#swiper-main').length > 0) {
        var swiper = new Swiper('#swiper-main', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 600,
            parallax: true,
            keyboard: {
                enabled: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-main-next',
                prevEl: '.swiper-main-prev',
            },
        });
    }
});
