		function slideInit() {
    			$('.mp-slider-lbl,.mp-slider-lbl-a,.mp-slider-lbl-b,.btn-a').css('opacity','0');
    			$('.mp-slider-lbl,.mp-slider-lbl-a,.mp-slider-lbl-b,.btn-a').css('top','20px');
      			var $slide = $('.swiper-slide-active');
      			$slide.find('.mp-slider-lbl').animate({
      				opacity: 1,
      				top: '0'
      			}, 360);
      			$slide.find('.mp-slider-lbl-a').delay(110).animate({
      				opacity: 1,
      				top: '0'
      			}, 360);
      			$slide.find('.mp-slider-lbl-b').delay(150).animate({
      				opacity: 1,
      				top: '0'
      			}, 360);
      			$slide.find('.btn-a').delay(200).animate({
      				opacity: 1,
      				top: '0'
      			}, 360);
		}

window.onload = function() {

  			var mySwiper = new Swiper('.swiper-container',{
    			mode:'horizontal',
    			loop: true,
    			autoplay: 7000,
    			speed:1000,
    			paginationClickable:true,
    			speed:1000,
    			createPagination:true,
    			pagination:'.swiper-pagination',
    			onSwiperCreated: function(swiper){
    				slideInit();
    				$('.swiper-preloader-bg').fadeOut();
    				$('#preloader').remove();
    			},
    			onSlideChangeEnd: function(swiper){slideInit();}
  			});  
			$('.arrow-left').on('click', function(e){
				e.preventDefault()
				mySwiper.swipePrev()
			});
			$('.arrow-right').on('click', function(e){
				e.preventDefault()
				mySwiper.swipeNext()
			});
		}

		$(window).resize(function(){
"use strict";
			slideInit();
		});
		$(window).focus(function(){
"use strict";
			slideInit();
		});
