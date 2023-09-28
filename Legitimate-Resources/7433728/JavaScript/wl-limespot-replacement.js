/** Shopify CDN: Minification failed

Line 27:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 28:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 29:4 Transforming let to the configured target environment ("es5") is not supported yet

**/
document.addEventListener("DOMContentLoaded", function() {
  $('.wl-recommendation-box-item.ctl,.wl-recommendation-box-item.rvp')
    .on('mouseenter', function() { $(this).find('.quick-shop').fadeIn(100);})
    .on('mouseleave',function() { $(this).find('.quick-shop').fadeOut(100)});
  
  $('.wl-recommendation-box-item.ctl .quick-shop,.wl-recommendation-box-item.rvp .quick-shop').on('click', function() { 
    $('.quick-shop-wrapper').fadeOut(100);
    $(this).next('.quick-shop-wrapper').fadeIn(100);
  });

  $('.wl-recommendation-box-item.ctl .quick-shop-close,.wl-recommendation-box-item.rvp .quick-shop-close').on('click', function() { 
    $('.quick-shop-wrapper').fadeOut(100);
  });

  $('.wl-recommendation-box-item.ctl .quick-shop-select,.wl-recommendation-box-item.rvp .quick-shop-select').on('change', function() { 
    $(this).val() == 'choose-size' ? $(this).next('.quick-shop-add').prop('disabled',true) : $(this).next('.quick-shop-add').prop('disabled',false);
  });
  
  $('.wl-recommendation-box-item.ctl .quick-shop-add,.wl-recommendation-box-item.rvp .quick-shop-add').on('click', function() { 
    let x = $(this).attr('data-id');
    let variant = $('.quick-shop-select[data-id="'+x+'"]').val();
    let submitButton = $(this);
    submitButton.attr('disabled', true);
    submitButton.addClass('loading');

    addToCart(variant,1,submitButton);
  });

  $('#wl-box.rvp .wl-right-arrow').on('click', function(){
    $('#wl-box.rvp .wl-ul-container').scrollLeft() == 0 ? $('#wl-box.rvp .wl-ul-container').scrollLeft(1920) : $('#wl-box.rvp .wl-ul-container').scrollLeft(0);
    $(this).addClass('wl-animate-hide');
    $('#wl-box.rvp .wl-left-arrow').removeClass('wl-animate-hide');
  });

  $('#wl-box.rvp .wl-left-arrow').on('click', function(){
    $('#wl-box.rvp .wl-ul-container').scrollLeft() == 0 ? $('#wl-box.rvp .wl-ul-container').scrollLeft(1920) : $('#wl-box.rvp .wl-ul-container').scrollLeft(0);
    $(this).addClass('wl-animate-hide');
    $('#wl-box.rvp .wl-right-arrow').removeClass('wl-animate-hide');
  });

  $('#wl-box.ctl .wl-right-arrow').on('click', function(){
    $('#wl-box.ctl .wl-ul-container').scrollLeft() == 0 ? $('#wl-box.ctl .wl-ul-container').scrollLeft(1920) : $('#wl-box.ctl .wl-ul-container').scrollLeft(0);
    $(this).addClass('wl-animate-hide');
    $('#wl-box.ctl .wl-left-arrow').removeClass('wl-animate-hide');
  });

  $('#wl-box.ctl .wl-left-arrow').on('click', function(){
    $('#wl-box.ctl .wl-ul-container').scrollLeft() == 0 ? $('#wl-box.ctl .wl-ul-container').scrollLeft(1920) : $('#wl-box.ctl .wl-ul-container').scrollLeft(0);
    $(this).addClass('wl-animate-hide');
    $('#wl-box.ctl .wl-right-arrow').removeClass('wl-animate-hide');
  });
});