jQuery(document).ready(function () {  
  jQuery(window).scroll(function() {
    if (jQuery(window).scrollTop() > jQuery('#wrapper').offset().top && !(jQuery('#header').hasClass('sticky'))) {
        jQuery('#header').addClass('sticky');
    } else if (jQuery(window).scrollTop() == 0) {
        jQuery('#header').removeClass('sticky');
    }
  });

  // 添加向下滚动按钮  luogengbo 20210305
  jQuery('#back-top').after('<a href="#" id="back-bottom" style="display: block;"></a>')
  window.onscroll = function () {
    jQuery(document).scrollTop() >= (jQuery(document).height() - jQuery(window).height()-100) ? jQuery('#back-bottom').fadeOut(400) : jQuery('#back-bottom').fadeIn(400)

  }
  jQuery('#back-bottom').on('click', function (e) {
    jQuery('html, body').animate({
      scrollTop: "+=520"
    }, 500)
    e.preventDefault();
  });

  //修改向上滚动逻辑  luogengbo 20210305
  jQuery('#back-top').on('click', function (e) {
    if (jQuery(document).scrollTop() >= (jQuery(document).height() - jQuery(window).height()-100)) {
        jQuery('html, body').animate({
          scrollTop: 0
        }, 800);
        e.preventDefault();
    }else{
      jQuery('html, body').animate({
        scrollTop: "-=520"
      }, 500)
      e.preventDefault();
    }
  });

});
