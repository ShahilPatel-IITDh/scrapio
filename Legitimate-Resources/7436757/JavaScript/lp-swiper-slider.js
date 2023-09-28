var mq = window.matchMedia("(max-width: 861px)");

// ajouter un écouteur de changement à ce point d'arrêt
mq.addListener(handleWithChange);

// first page load
handleWithChange(mq);

// changement de requête média
function handleWithChange(mq) {
  if (mq.matches) {
    var newSwiper = new Swiper(".wrap--col3_swiper", {
      slidesPerView: 3,
      spaceBetween: 32,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        560: {
          slidesPerView: 1.1,
          spaceBetween: 16,
        },
        860: {
          slidesPerView: 2.1,
          spaceBetween: 24,
        },
      },
    });
  }
}

var newSwiper = new Swiper(".slider-container", {
  cssMode: true,
  slidesPerView: 1,
  spaceBetween: 24,
  slidesPerGroup: 1,
  loopFillGroupWithBlank: true,
  normalizeSlideIndex: true,
  allowTouchMove: false,
  watchOverflow: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: false,
  keyboard: true,
});