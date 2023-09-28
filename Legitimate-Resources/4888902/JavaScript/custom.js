// shows and hides filtered items
jQuery(".filter-simple-button").click(function() {
    
  var value = jQuery(this).attr('data-filter');
  if(value === "all") {
    jQuery('.filter-simple-item').show('1000');
  } else {
    jQuery(".filter-simple-item").not('.'+value).hide('3000');
    jQuery('.filter-simple-item').filter('.'+value).show('3000');
  }
});

// changes active class on filter buttons
jQuery('.filter-simple-button').click(function () {
  jQuery(this).siblings().removeClass('is-active');
  jQuery(this).addClass('is-active');
});



//
//
////$(window).scroll(function(e){
//  parallax();
//});
//
//function parallax(){
//  var scrolled = $(window).scrollTop();
//  $('.parallax-bg').css('background-position','center ' + -(scrolled*0.35)+'px');
//}


//
//
////jQuery(document).ready(function(){
//
//        jQuery('#sizes a').click(function(event) {
//            event.preventDefault();
//            
//            var current = jQuery(this);
//            
//            jQuery( '#sizes a' ).each(function( index ) {
//                jQuery( this ).removeClass('selected');
//            });
//            current.addClass('selected');
//            
//            jQuery('.woocommerce-product-gallery__image img').fadeOut('fast', function(){
//			
//
//                jQuery('.woocommerce-product-gallery__image img').attr("src", current.attr('href'));
//
//
//                jQuery('.woocommerce-product-gallery__image img').attr("title", current.attr('title'));
//                jQuery('.woocommerce-product-gallery__image img').attr("data-caption", current.attr('data-caption'));
//                jQuery('.woocommerce-product-gallery__image img').attr("data-src", current.attr('data-src'));
//                jQuery('.woocommerce-product-gallery__image img').attr("data-large_image", current.attr('data-large_image'));
//                jQuery('.woocommerce-product-gallery__image img').attr("data-large_image_width", current.attr('data-large_image_width'));
//                jQuery('.woocommerce-product-gallery__image img').attr("data-large_image_height", current.attr('data-large_image_height'));
//                jQuery('.woocommerce-product-gallery__image img').attr("data-thumb", current.attr('data-thumb'));
//                jQuery('.woocommerce-product-gallery__image img').attr("srcset", current.attr('srcset'));
//                
//		jQuery('.woocommerce-product-gallery__image img').fadeIn();
//            });
//            
//            //console.log(current.attr('href'));
//        });
//        
//	
//        jQuery('.small-slide').slick({
//            slidesToShow: 4,
//            slidesToScroll: 1,
//            autoplay: false
//        });
//        
//	jQuery('.slider-nav').slick({
//		slidesToShow: 4,
//		slidesToScroll: 1,
//		asNavFor: '.slider-for',
//		dots: true,
//		centerMode: false,
//		focusOnSelect: true,
//		autoplay: true,
//		autoplaySpeed: 2000,
//	}); 
//	 
//});
//
//(function ($) {
//
//    //console.log('star');
//    var isTablet = window.matchMedia && window.matchMedia('(min-width: 768px)').matches;
//
//    if (!isTablet) {
//        return;
//    }
//
//    // Only use the first slider on the page
//    var $slider = $('.desktop-slider:first');
//
//    if (!$slider.length) {
//        return;
//    }
//
//    if ($slider.children().length < 2) {
//        return;
//    }
//
//    var $body = $('body');
//
//    // Only on front page
//    if (!$body.hasClass('home')) {
//
//        // Activate normal slider feature when we're not on the front page
//        $slider.addClass('slider');
//
//        return;
//    }
//
//    // Every other slider gets the regular slider feature
//    else {
//        $('.desktop-slider:not(:first)').addClass('slider');
//    }
//
//    var currentSlide;
//    var lastSlide;
//    var offsets = [];
//    var $placeholder;
//    var $nextElement;
//
//    // Stupid margin is stupid
//    var stupidMargin = 6;
//
//    function removeNextElementFixed() {
//        $placeholder.css({display: 'none'});
//        $nextElement.css({
//            position: 'relative',
//            top: 0
//        });
//        
//    }
//
//    function setNextElementFixed() {
//        var offsetTop = $slider.find('.slide:first').outerHeight();
//
//        $nextElement.css({
//            position: 'fixed',
//            top: offsetTop - stupidMargin
//        });
//
//        $placeholder.css({display: 'block'});
//    }
//
//    function updateNextElementPosition() {
//        var $firstSlide = $slider.find('.slide:first');
//        var top = 0;
//
//        // As long as we're above the first slide the fixed next element needs to be moved upwards
//        if (currentSlide === undefined) {
//            var margin = $firstSlide.offset().top - $(window).scrollTop();
//            var firstSlideHeight = $firstSlide.outerHeight();
//
//            top = firstSlideHeight + margin - stupidMargin;
//        }
//
//        // As long as we're not at the last slide, just stick the element where the first slide ends
//        else if (currentSlide < lastSlide) {
//            top = $firstSlide.outerHeight() - stupidMargin;
//        }
//
//        $nextElement.css('top', top);
//    }
//
//    function calculateSlideOffsets() {
//        offsets = [];
//
//        $slider.children().each(function () {
//            var $slide = $(this);
//
//            offsets.push($slide.offset().top);
//        });
//
//        //console.log('found offsets', offsets);
//    }
//
//    function setup() {
//        $slider.css('height', $slider.outerHeight());
//        $slider.css('position', 'relative');
//
//        var index = 0;
//
//        calculateSlideOffsets();
//
//        lastSlide = offsets.length - 1;
//
//        $slider.children().each(function () {
//            var $slide = $(this);
//            var zIndex = 1000 - (10 * index);
//            var isFirstSlide = index === 0;
//            var position = isFirstSlide ? 'absolute' : 'fixed';
//
//            $slide.css({
//                position: position,
//                zIndex: zIndex
//            });
//
//            if (index > 0) {
//                $slide.css({top: 0, display: 'none'});
//            }
//
//            index++;
//        });
//    }
//
//    function createPlaceholder() {
//        $placeholder = $('<div>');
//
//        $placeholder.css({
//            height: $nextElement.outerHeight(),
//            width: '100%'
//        });
//
//        $nextElement.after($placeholder);
//        //console.log('create placeholder', $nextElement.outerHeight());
//    }
//
//    function moveNextElementInPlace() {
//        $nextElement = $slider.next();
//        //console.log('next', $nextElement);
//
//        createPlaceholder();
//        setNextElementFixed();
//    }
//
//    function updatePlaceholderHeight() {
//        $placeholder.css({height: $nextElement.outerHeight()});
//    }
//
//    function sliderEndTop() {
//
//        var isFirst = true;
//
//        $slider.children().each(function () {
//            var $slide = $(this);
//
//            if (!isFirst) {
//                $slide.css({display: 'none'});
//            }
//
//            isFirst = false;
//        });
//    }
//
//    function setCurrentSlide(currentSlide) {
//        var index = 0;
//        var offsetTop = $slider.offset().top;
//
//        $slider.children().each(function () {
//            var $slide = $(this);
//
//            // Ensure that every slide that's been passed is absolutely positioned
//            // This makes sure that fast scrolling doesn't skip any slide
//            if (index < currentSlide) {
//                $slide.css({
//                    position: 'absolute',
//                    display: 'block'
//                });
//            }
//
//            // Absolutely position current slide att the correct offset from the top
//            if (index === currentSlide) {
//                var top = offsets[currentSlide] - offsetTop;
//
//                $slide.css({
//                    position: 'absolute',
//                    top: top,
//                    display: 'block'
//                });
//                $slider.find('.slide').find('.text').css({display: 'block'});
//            }
//
//            // Display next as fixed at the top of the page
//            if (index === currentSlide + 1) {
//                $slide.css({
//                    display: 'block',
//                    position: 'fixed',
//                    top: 0
//                });
//            }
//
//            // Hide everything after next slide
//            if (index > currentSlide + 1) {
//                $slide.css({display: 'none'});
//            }
//
//            index++;
//        });
//    }
//
//    function sliderEndBottom() {
//        removeNextElementFixed();
//    }
//
//    function sliderStartBottom() {
//        setNextElementFixed();
//    }
//
//    function onScroll() {
//        var scrollTop = $(window).scrollTop();
//        var changeToSlide;
//
//        for (var index = 0; index < offsets.length; index++) {
//            if (scrollTop >= offsets[index]) {
//                changeToSlide = index;
//            }
//        }
//
//        if (changeToSlide !== currentSlide) {
//            currentSlide = changeToSlide;
//            //console.log('now at slide', currentSlide);
//
//            if (currentSlide === undefined) {
//                //console.log('slider end top');
//                sliderEndTop();
//            }
//
//            else {
//                setCurrentSlide(currentSlide);
//            }
//
//            if (currentSlide === lastSlide) {
//                //console.log('slider end bottom');
//                sliderEndBottom();
//            }
//
//            if (currentSlide === lastSlide - 1) {
//                //console.log('slider start bottom');
//                sliderStartBottom();
//            }
//        }
//
//        // Should not be debounced for smooth scrolling
//        updateNextElementPosition();
//
//        // Should be debounced but it doesn't work atm??
//        updatePlaceholderHeight();
//    }
//
//    function updateSliderHeight() {
//        // Make all slides stack again with their natural heights
//        $slider.children().each(function () {
//            var $slide = $(this);
//
//            $slide.css({
//                position: 'static',
//                display: 'block'
//            });
//        });
//
//        // Let slider container get its new height
//        $slider.css('height', 'auto');
//
//        // Set new height of slider container
//        var height = $slider.height();
//        $slider.css('height', height - stupidMargin);
//
//        //console.log('set slider height to', height);
//
//        // Calculate new slide offsets from page top
//        calculateSlideOffsets();
//
//        // Re-position slides with new offsets
//        setCurrentSlide(currentSlide);
//    }
//
//    function onReady() {
//        //console.log('ready?');
//        updateSliderHeight();
//
//        // Should not be debounced for smooth scrolling
//        updateNextElementPosition();
//
//        // Should be debounced but it doesn't work atm??
//        updatePlaceholderHeight();
//    }
//
//    function onLoad() {
//        //console.log('load?');
//        onReady();
//    }
//
//    function onResize() {
//        //console.log('resize?');
//        onReady();
//    }
//
//    function start() {
//        setup();
//        moveNextElementInPlace();
//        onScroll();
//
//        $(window)
//            .on('scroll', onScroll)
//            .on('load', onLoad)
//            .on('resize', onResize)
//        ;
//
//        // Re-calculate slider height again after video data has loaded
//        $slider.find('video').on('loadeddata', function () {
//            //console.log('now loadeddata');
//            onReady();
//        });
//
//        $(document).on('ready', onReady);
//    }
//    //console.log('starting');
//    // Start immediately if splash isn't active
////    if (!$body.hasClass('splash')) {
////        start();
////    } else {
////        // â€¦otherwise start after splash is done
////        $(window).on('sachajuan.did-splash', function () {
////            start();
////        });
////    }
//
//    start();
//    
//    
//    var slideNext = function() {
//        var slide = $(this).parents('.slide-small, .slide-big').find('.image-holder');
//
//        slide.slick('slickNext');
//    };
//
//    var slidePrev = function(){
//        var slide = $(this).parents('.slide-small, .slide-big').find('.image-holder');
//
//        slide.slick('slickPrev');
//    };
//    $(document).on('click', '.next-slide, .slick-next', slideNext);
//    $(document).on('click', '.prev-slide, .slick-prev', slidePrev);
//
//}(jQuery));
