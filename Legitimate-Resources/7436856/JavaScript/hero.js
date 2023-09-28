if(document.getElementById('hero-slider') !== null) {
    var swiper = new Swiper('#hero-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            550: {
                slidesPerView: 1,
                spaceBetween: 0,
            }
        }
    });
}
