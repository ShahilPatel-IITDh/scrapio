$(document).ready(function(){

  var conf = {
    center: true,
    backgroundControl: false
  };

  var cache = {
    $carouselContainer: $('.thumbnails-carousel').parent(),
    $thumbnailsLi: $('.thumbnails-carousel li'),
    $controls: $('.thumbnails-carousel').parent().find('.carousel-control')
  };

  function init() {
    cache.$carouselContainer.find('ol.carousel-indicators').addClass('indicators-fix');
    cache.$thumbnailsLi.first().addClass('active-thumbnail');

    if(!conf.backgroundControl) {
      cache.$carouselContainer.find('.carousel-control').addClass('controls-background-reset');
    }
    else {
      cache.$controls.height(cache.$carouselContainer.find('.carousel-inner').height());
    }
  }

  function refreshOpacities(domEl) {
    cache.$thumbnailsLi.removeClass('active-thumbnail');
    cache.$thumbnailsLi.eq($(domEl).index()).addClass('active-thumbnail');
  }

  function bindUiActions() {
    cache.$carouselContainer.on('slide.bs.carousel', function(e) {
      refreshOpacities(e.relatedTarget);
    });

    cache.$thumbnailsLi.click(function(){
      cache.$carouselContainer.carousel($(this).index());
    });
  }

  $.fn.thumbnailsCarousel = function(options) {
    conf = $.extend(conf, options);

    init();
    bindUiActions();

    return this;
  }

  $('.thumbnails-carousel').thumbnailsCarousel();
});