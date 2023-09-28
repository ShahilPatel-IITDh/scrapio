$(function() {
  'use strict';
  $('.hero-slide').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,
    dots: true,
    fade: true,
    pauseOnHover: false,
    swipe: false
  });
  $('.list-card-slide').slick({
    infinite: false,
    prevArrow: '<img src="//image.card.jp.rakuten-static.com/card_corp/lay2.0/common/ico_arrow_l_gray01.png" class="slick-arrow slick-prev">',
    nextArrow: '<img src="//image.card.jp.rakuten-static.com/card_corp/lay2.0/common/ico_arrow_r_gray01.png" class="slick-arrow slick-next">',
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: false
  });
  $('.list-bnr-col03').slick({
    arrows: true,
    prevArrow: '<img src="//image.card.jp.rakuten-static.com/card_corp/lay2.0/common/ico_arrow_l_gray02.png" class="slick-arrow slick-prev">',
    nextArrow: '<img src="//image.card.jp.rakuten-static.com/card_corp/lay2.0/common/ico_arrow_r_gray02.png" class="slick-arrow slick-next">',
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    swipe: false
  });
});
