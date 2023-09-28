/* =============== */
/* SNR Legacy - JS */
/* =============== */

jQuery(function($) {
  //vars
  var $body = $('body'),
    $slider = $('.slider'),
    $horzSlider = $('.horz-slider'),
    endResizing;

	$('.bx-clone').removeAttr('href');

	$('.slider').keyup(function(e) {
		var tabCode = (e.keyCode ? e.keyCode : e.which) == 9,
				ifShift = (e.shiftKey);
		var focusedElem = $(document.activeElement),
				focusedElemActiveParent = $(focusedElem).parent();
		var bxCurrSlideIndex = $slider.getCurrentSlide(),
				bxSlideCount = $slider.getSlideCount() - 1;

		if (!$(focusedElemActiveParent).hasClass('bx-clone') && bxCurrSlideIndex !== bxSlideCount) {
			// check if tab or shift + tab
			if (tabCode && !ifShift && bxCurrSlideIndex != bxSlideCount) {
				$slider.goToNextSlide();
				console.log('Current Index: ' + bxCurrSlideIndex);
				console.log('Slide Count: ' + bxSlideCount);
			} else if (tabCode && ifShift && bxCurrSlideIndex != 0) {
				$slider.goToPrevSlide();
				console.log('Current Index: ' + bxCurrSlideIndex);
				console.log('Slide Count: ' + bxSlideCount);
			}
		}
	});

  // ** BLOG SLIDER COMPONENT
  if ($('.cycle-slider').length > 0) {
    var fx;
    if ($(window).width() >= 768) {
      fx = 'carousel';
    } else {
      fx = 'scrollHorz';
    }
    $('.slider-container').cycle({
      fx: fx,
      slides: '> .slide',
      timeout: 0,
      autoHeight: 'container',
      pager: '~ .slider-pager',
			pagerTemplate: '<a href="javascript:;" title="pager">&bull;</a>',
      swipe: true,
      carouselVisible: 1,
      carouselFluid: true,
      log: false
    });

    // removes generated cycle slides
    var cycleGenContentRemove = $('.cycle-carousel-wrap').each(function() {
      // find the total number of slides
      var cycleLength = Math.floor($(this).children().length);

			console.log('Length: ' + cycleLength);

      // find num for index manipulation
      var dummySlideNumBefore = cycleLength / 3;
      var dummySlideNumAfter = dummySlideNumBefore - 1;

      // target generated slides based on the number and remove the content
      $(this).children('.slide:lt(' + dummySlideNumBefore + ')').remove();
      $(this).children('.slide:gt(' + dummySlideNumAfter + ')').remove();

			console.log(dummySlideNumBefore);
			console.log(dummySlideNumAfter);

			$(this).css({ left: 0 });
    });

    // listen for tab inside .slider-container
    $('.slider-container').keyup(function (e) {
      var tabCode = (e.keyCode ? e.keyCode : e.which) == 9,
          ifShift = (e.shiftKey);
      var focusedElem = $(document.activeElement),
          focusedElemActiveParent = $(focusedElem).closest('.slide');
      var cycleCurrSlideIndex = $(this).data('cycle.opts').currSlide,
          cycleSlideCount = $(this).data('cycle.opts').slideCount - 1;

      // check if focus is in active slide or other slide
      if (!$(focusedElemActiveParent).hasClass('cycle-slide-active')) {
        // check if tab or shift + tab
        if (tabCode && !ifShift && cycleCurrSlideIndex !== cycleSlideCount) {
					$(this).cycle('next');
        } else if (tabCode && ifShift && cycleCurrSlideIndex !== 0) {
					$(this).cycle('prev');
        }
      }
    });
  } // end blog post component (cycle)

  // horizontal slider (media kits and story pages): test window size: if >= 768, show 3 slides at a time, else only show 1
  var maxSlidesNum,
    infiniteLoop;
  if ($(window).width() >= 768) {
    maxSlidesNum = 3;
    infiniteLoop = true;
  } else {
    maxSlidesNum = 1;
    infiniteLoop = false;
  }
  if ($horzSlider.length > 0) {
    $horzSlider.each(function(index){
      $(this).bxSlider({
        adaptiveHeight: true,
        infiniteLoop: infiniteLoop,
        hideControlOnEnd: true,
        minSlides: 1,
        maxSlides: maxSlidesNum,
        nextText: '',
        prevText: '',
        moveSlides: 1,
        slideMargin: 10,
        slideWidth: 182,
        pager: false
      });
    });
  }

  // bxSlider 'Prev' text Cato issue
  $('.bx-prev').attr('aria-label', 'previous');
  $('.bx-next').attr('aria-label', 'next');

  // photo viewer slider (commonly found on story pages):
  if ($('.photo-viewer-container').length > 0) {
    $('.slideshow').on('cycle-initialized', function(e, opts) {
      for (var i = 0; i < opts.slides.length; i++) {
        $(opts.slides[i]).attr('data-idx', i);
      }
    });
    $('.photo-viewer').cycle({
      fx: 'scrollHorz',
      autoHeight: 'container',
      timeout: 0,
      swipe: true,
      allowWrap: false,
      prev: '> .viewer-nav .prev',
      next: '> .viewer-nav .next'
    });
    $('.pager').each(function() {
      var $this = $(this),
        cv = $this.children().length;
      if (cv > 5) {
        cv = 5;
      }
      $this.cycle({
        fx: 'carousel',
        carouselVisible: cv,
        timeout: 0,
        //allowWrap: false,
        prev: '~ .pager-nav .prev',
        next: '~ .pager-nav .next'
      });
    });
    var slideshows = $('.slideshow').on('cycle-next cycle-prev', function(e, opts) {
      // advance the other slideshow
      $(this).siblings('.slideshow').cycle('goto', opts.currSlide);
    });
    $body.on('click', '.pager .cycle-slide', function() {
      var $this = $(this),
        index = $this.attr('data-idx');
      $this.parents('.pager').siblings('.slideshow').cycle('goto', index);
      $this.parents('.pager').cycle('goto', index);
    });
  }

  //find first container, and apply class
  var $modContainer = $('#modules .container');
  $modContainer.first().addClass('first-child'); /* find first module in container, and apply class */
  $modContainer.each(function() {
    var $this = $(this);
    $this.find('.module').first().addClass('first-child');
    $this.find('.col-half').first().addClass('first-child');
  });
  $('ul.horz').each(function() {
    $(this).find('li').first().addClass('first-child');
  });
  // test if enquire plugin is included
  if (typeof enquire != 'undefined') {
    if ($('.mk').length > 0 || $('#story').length > 0) {
      enquire.register("screen and (min-width:768px)", {
        match: function() {
          initSliders();
        },
        unmatch: function() {}
      }, true).listen();
    }
    enquire.register("screen and (min-width:768px)", {
      match: function() {
        function fancyboxInit() {
          $('.lightbox').fancybox({
            'opacity': true,
            'overlayShow': true,
            'overlayOpacity': 0.89,
            'overlayColor': '#000',
            'padding': 0,
            'titleShow': false,
            'transitionIn': 'elastic',
            'transitionOut': 'none',
            'width': 946,
            'height': 432,
            smallBtn: true,
            buttons: ["close"]
          });
        }
        fancyboxInit();
        $body.on('click', '.lightbox', function(e) {
          e.preventDefault();
          fancyboxInit();
        });
      },
      unmatch: function() {}
    }, true).listen();
  } else {}
});
