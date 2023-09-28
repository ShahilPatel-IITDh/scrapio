$(function() {
    var containerId = '.error-404-recently-viewed-wrapper .swiper-container';
    var recentlySwiper = new Swiper(containerId, {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: containerId + ' .swiper-button-next',
            prevEl: containerId + ' .swiper-button-prev',
        },
        breakpoints: {
            768: { //当宽度小于等于640  
                slidesPerView: "auto",
                slidesPerGroup: 3,
                spaceBetween: 10,
            }
        }
    });
})