
/*---------------------------------

	0. svg

---------------------------------*/
window.addEventListener('load', function(){	deSVG('.svg', true); });

/*---------------------------------

	1. hamburger

---------------------------------*/
$(function(){
	$("#btn_hamburger").on('click',function() {
		$("body").toggleClass("is_fix");
		$(this).toggleClass("is_open");
		$(".hamburger").toggleClass("is_open");
	});
});
$(function(){
	$(".hamburger_text_list_item_btn").each(function() {
		var wrap = $(this);
		var btn = $(this).find('u');
		var content = $(this).next('ul');
		btn.on('click',function() {
			wrap.toggleClass("is_open");
			content.slideToggle();
		});
	});
	$(".hamburger_text_list_item_menu_item_btn").each(function() {
		var wrap = $(this);
		var btn = $(this).find('u');
		var content = $(this).next('ul');
		btn.on('click',function() {
			wrap.toggleClass("is_open");
			content.slideToggle();
		});
	});
	
	$(window).resize(function () {
		if($(window).width() > 768){
			$('.hamburger_text_list_item_menu').show();
			
		}else{
			$('.hamburger_text_list_item_menu').hide();
			
			
			if ($('.hamburger_text_list_item_btn').hasClass('is_open')) {
				$('.hamburger_text_list_item_btn.is_open + .hamburger_text_list_item_menu').css('display', 'block');
			}else{
				$('.hamburger_text_list_item_menu').css('display', 'none');
				
			}
		}
	});
	
});

/*---------------------------------

	2. header

---------------------------------*/
$(window).on('scroll', function () {
	if($(window).scrollTop() > 0) {
		$('.header').addClass('is_fix');
	} else {
		$('.header').removeClass('is_fix');
	}
});
// var start_pos = 0;
// $(window).on('scroll', function(){
// 	var current_pos = $(this).scrollTop() - 50;
// 	if (current_pos > start_pos) {
// 		$('.header').addClass('is_hide');
// 	}
// 	if (current_pos < start_pos) {
// 		$('.header').removeClass('is_hide');
// 	}
// 	if (current_pos < 0) {
// 		$('.header').removeClass('is_hide');
// 	}
// 	start_pos = current_pos;
// });

/*---------------------------------

	3. footer

---------------------------------*/
// $(window).on('load', function() {
// 	if (window.matchMedia("(max-width: 767px)").matches) {
// 		$(".footer_list_item dt").removeClass('is_open');
// 		$(".footer_list_item dd").stop().slideUp();
// 		$(".footer_list_item dt").on('click',function() {
// 			if($(this).hasClass('is_open')){
// 				$(this).removeClass('is_open');
// 				$(this).next('dd').stop().slideUp();
// 			} else {
// 				$(this).addClass('is_open');
// 				$(this).next('dd').stop().slideDown();
// 			}
// 		});
// 	} else {
// 		$(".footer_list_item dt").addClass('is_open');
// 		$(".footer_list_item dd").stop().slideDown();
// 	}
// });

$(function(){
	$(".footer_list.is_sp .footer_list_item dt").on('click',function() {
		if($(window).width() < 768){
			$(this).next().slideToggle();
		}
	});
});

/*---------------------------------

	4. font size change

---------------------------------*/
$(function(){
	var history = $.cookie('fontSize');
	if(!history){
		$('html').addClass('fontM')
		$('.header_sub').addClass('fontM')
		$('.hamburger_text_sub').addClass('fontM')
		$('.header_fontsize').find('.fontM').addClass('is_current');
	} else {
		$('html').removeClass('fontS fontM fontL').addClass(history);
		$('.header_sub').removeClass('fontS fontM fontL').addClass(history);
		$('.hamburger_text_sub').removeClass('fontS fontM fontL').addClass(history);
		$('.header_fontsize dd ul li').removeClass('is_current');
		$('.header_fontsize').find('.' + history).addClass('is_current');
	}
	$('.header_fontsize dd ul li').on('click',function(){
		var classes = $(this).attr('class');
		var setFontSize = classes.replace(/ is_current/g,'');
		$.cookie('fontSize', setFontSize,{path:'/'});
		$('html').removeClass('fontS fontM fontL').addClass(setFontSize);
		$('.header_sub').removeClass('fontS fontM fontL').addClass(setFontSize);
		$('.hamburger_text_sub').removeClass('fontS fontM fontL').addClass(setFontSize);
		$('.header_fontsize dd ul li').removeClass('is_current');
		$('.header_fontsize').find('.' + setFontSize).addClass('is_current');
	});
});

/*---------------------------------

	5. pagetop

---------------------------------*/
$(function(){
	$('.pagetop').on('click', function(){
		var speed = 400;
		//var position = $('html').offset().top;
		var position = 0;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
});
$(function(){
	$(window).on('scroll', function(){
		if($(window).scrollTop() > 0){
			$('.pagetop').removeClass('is_hide');
		} else {
			$('.pagetop').addClass('is_hide');
		}
	});
});

/*---------------------------------

	6. bread 既存HTMLを元にパンくずを動的に構造化マークアップ対応

---------------------------------*/
$(function(){
	$('.bread').each(function(i) {
		var jsonData = [];

		var breadData = {};
		breadData["@context"] = "https://schema.org";
		breadData["@type"] = "BreadcrumbList";
		var itemListElement = [];
		$('.bread li').each(function(i) {
			var breadItemList = {};
			breadItemList["@type"] = 'ListItem';
			breadItemList["position"] = i + 1;
			breadItemList["name"] = $(this).text();
			var linkTag = $(this).children("a").attr('href');
			var hrefUrl = "";
			if(linkTag == null) {
				hrefUrl = $(location).attr('href');
			} else {
				hrefUrl = $(location).attr('protocol') + $(location).attr('host') + linkTag;
			}
			breadItemList["item"] = hrefUrl;
			itemListElement.push(breadItemList);
		});

		breadData["itemListElement"] = itemListElement;
		jsonData.push(breadData);
		jsonData = JSON.stringify(jsonData);
		var jsonElement = document.createElement("script");
		jsonElement.type = "application\/ld+json";
		jsonElement.innerText = jsonData;
		document.body.appendChild(jsonElement);
	});
});

/*---------------------------------

	6. common_information

---------------------------------*/
$(window).on('load', function() {
	var infoSwiper = document.querySelectorAll('.common_information_content_swiper');
	var infoSwiperBtnNext = document.querySelectorAll('.common_information_content_swiper_navi_button_next');
	var infoSwiperBtnPrev = document.querySelectorAll('.common_information_content_swiper_navi_button_prev');
	if(infoSwiper.length > 0){
		for (let i = 0; i < infoSwiper.length; i++) {
			infoSwiper[i].className += ' common_information_content_swiper' + i;
			infoSwiperBtnNext[i].className += ' common_information_content_swiper_navi_button_next' + i;
			infoSwiperBtnPrev[i].className += ' common_information_content_swiper_navi_button_prev' + i;
			if ($('.common_information_content_swiper' + i + ' .common_information_content_list_item').length > 1) {
				var swiper = new Swiper('.common_information_content_swiper' + i, {
					centeredSlides: true,
					speed: 1000,
					loop: true,
					direction: 'horizontal',
					slidesPerView: 1.35,
					autoplay: {
						delay: 7000,
						disableOnInteraction: false,
					},
					navigation: {
						nextEl: '.common_information_content_swiper_navi_button_next' + i,
						prevEl: '.common_information_content_swiper_navi_button_prev' + i,
					},
					breakpoints: {
						768: {
							slidesPerView: 2.2,
						},
						960: {
							slidesPerView: 2.6,
						},
						1160: {
							slidesPerView: 4.15,
						},
					},
				});
			} else {
				var swiper = new Swiper('.common_information_content_swiper' + i, {
					centeredSlides: true,
					speed: 1000,
					direction: 'horizontal',
					slidesPerView: 1.35,
					navigation: {
						nextEl: '.common_information_content_swiper_navi_button_next' + i,
						prevEl: '.common_information_content_swiper_navi_button_prev' + i,
					},
					breakpoints: {
						768: {
							slidesPerView: 2.2,
						},
						960: {
							slidesPerView: 2.6,
						},
						1160: {
							slidesPerView: 4.15,
						},
					},
				});
			}
			// var swiper = new Swiper('.common_information_content_swiper' + i, {
			// 	centeredSlides: true,
			// 	speed: 1000,
			// 	loop: true,
			// 	direction: 'horizontal',
			// 	slidesPerView: 1.35,
			// 	autoplay: {
			// 		delay: 7000,
			// 		disableOnInteraction: false,
			// 	},
			// 	navigation: {
			// 		nextEl: '.common_information_content_swiper_navi_button_next' + i,
			// 		prevEl: '.common_information_content_swiper_navi_button_prev' + i,
			// 	},
			// 	breakpoints: {
			// 		768: {
			// 			slidesPerView: 2.2,
			// 		},
			// 		960: {
			// 			slidesPerView: 2.6,
			// 		},
			// 		1160: {
			// 			slidesPerView: 4.15,
			// 		},
			// 	},
			// });


			// var options = {};
			// if ( $("#mainSlider .swiper-container").length == 1 ) { //スライドが1枚以上だったら
			// 	options = { //下記のオプションで動かしてね
			// 		loop: true,
			// 		effect: 'slide',
			// 		slidesPerView: 1,
			// 		speed: 2000,
			// 		centeredSlides : true,
			// 		autoplay: {
			// 			delay: 4000,
			// 			disableOnInteraction: false,
			// 		},
			// 		navigation: {
			// 			nextEl: '.swiper-button-next',
			// 			prevEl: '.swiper-button-prev',
			// 		}
			// 	}
			// } else { //それ以外（つまり1枚だった）の場合
			// 	options = {
			// 		loop: false, //ループしない
			// 		autoplay: false,　//オートプレイしない
			// 	}
			// }
			// new Swiper('#mainSlider .swiper-container', swipeOption); //ここはデフォのswiper宣言
		}
	}
});

/*---------------------------------

	7. common_motorway

---------------------------------*/
$(window).on('load', function() {
	// console.log($('.common_motorway_bnr_swiper .common_motorway_bnr_list_item').length);
	if ($('.common_motorway_bnr_swiper .common_motorway_bnr_list_item').length > 1) {
		var motorwaySwiper = new Swiper('.common_motorway_bnr_swiper', {
			centeredSlides: true,
			speed: 1000,
			loop: true,
			direction: 'horizontal',
			slidesPerView: 1.35,
			autoplay: {
				delay: 7000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.common_motorway_bnr_swiper_navi_button_next',
				prevEl: '.common_motorway_bnr_swiper_navi_button_prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 2.2,
				},
				960: {
					slidesPerView: 2.6,
				},
				1160: {
					slidesPerView: 4.15,
				},
			},
		});
	} else {
		var motorwaySwiper = new Swiper('.common_motorway_bnr_swiper', {
			centeredSlides: true,
			speed: 1000,
			direction: 'horizontal',
			slidesPerView: 1.35,
			navigation: {
				nextEl: '.common_motorway_bnr_swiper_navi_button_next',
				prevEl: '.common_motorway_bnr_swiper_navi_button_prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 2.2,
				},
				960: {
					slidesPerView: 2.6,
				},
				1160: {
					slidesPerView: 4.15,
				},
			},
		});
	}

	// var motorwaySwiper = new Swiper('.common_motorway_bnr_swiper', {
	// 	centeredSlides: true,
	// 	speed: 1000,
	// 	loop: true,
	// 	direction: 'horizontal',
	// 	slidesPerView: 1.35,
	// 	autoplay: {
	// 		delay: 7000,
	// 		disableOnInteraction: false,
	// 	},
	// 	navigation: {
	// 		nextEl: '.common_motorway_bnr_swiper_navi_button_next',
	// 		prevEl: '.common_motorway_bnr_swiper_navi_button_prev',
	// 	},
	// 	breakpoints: {
	// 		768: {
	// 			slidesPerView: 2.2,
	// 		},
	// 		960: {
	// 			slidesPerView: 2.6,
	// 		},
	// 		1160: {
	// 			slidesPerView: 4.15,
	// 		},
	// 	},
	// });
});

/*---------------------------------

	8. disaster_prevention / snavi

---------------------------------*/
$(window).on('load', function(){
	var scrollStopEvent = new $.Event("scrollstop");
	var delay = 1000;
	var timer;
	function scrollStopEventTrigger(){
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(function(){$(window).trigger(scrollStopEvent)}, delay);
	}
	$(window).on("scroll", scrollStopEventTrigger);
	$("body").on("touchmove", scrollStopEventTrigger);
});
$(function(){
	var SwiperTicker = new Swiper('.disaster_prevention_swiper', {
		spaceBetween: 40,
		centeredSlides: true,
		speed: 15000,
		autoplay: {
			delay: 1,
		},
		loop: true,
		slidesPerView:'auto',
		allowTouchMove: false,
		disableOnInteraction: true
	});
	$(window).on("load",function(){
		$('.disaster_prevention').stop().addClass('is_show');
		$('.snavi').stop().removeClass('is_hide');
	});
	$(window).on("scroll",function(){
		$('.disaster_prevention').stop().removeClass('is_show');
		$('.snavi').stop().addClass('is_hide');
	});
	$(window).on("scrollstop",function(){
		$('.disaster_prevention').stop().addClass('is_show');
		$('.snavi').stop().removeClass('is_hide');
	});
});

/*---------------------------------

	8. html addClass

---------------------------------*/
$(window).on('load', function(){
	var dir = location.href.split("/");
	var dir2 = dir[4];
	var dir3 = dir[5];
	var middleArray = ['traffic','guide','etc','safety','kanko_event','sapa'];
	if(middleArray.includes(dir2)) {
		if(dir3 != 'ryokin-guide') {
			$('html').addClass('is_' + dir2);
			$('.middle_ttl').addClass('is_' + dir2);
		} else {
			$('html').addClass('is_' + dir3);
			$('.middle_ttl').addClass('is_' + dir3);
		}
	}
	$('aside').each(function(){
		var activeUrl = location.pathname.split("/")[3];
		navList = $(".sidebar_list").find("a");
		navList.each(function(){
			if( $(this).attr("href").replace(/\?.*$/,"").split("/")[3] == activeUrl && activeUrl != 'customer_topics_type') {
				$(this).parent("li").addClass("is_current");
			};
			var topicsArray = ['customer_topics','corp_news','corp_press'];
			if(topicsArray.includes(location.pathname.split("/")[2])) {
				if(typeof activeUrl !== "undefined") {
					if($(this).attr("href").replace(/\?.*$/,"").split("/")[3].slice(-4) == activeUrl.slice(-4)) {
						$(this).parent("li").addClass("is_current");
					};
				}
			}
			if( location.search == '' && activeUrl == 'customer_topics_type') {
				$('.sidebar_list_item_menu_item:first-of-type').addClass("is_current");
			};
			
			var activeUrl2 = location.pathname.split("/")[2];
			var navList2 = $(".sidebar_list li").hasClass('ratesearch');
			if( navList2 && activeUrl2 == 'ratesearch' ) {
				$(this).parent("li.ratesearch").addClass("is_current");
			};
			
		});
		// console.log(activeUrl);
		// console.log(activeUrl2);
		// console.log(location.pathname.split("/")[2]);
		// console.log(location.pathname.split("/")[3]);
		if(typeof activeUrl === "undefined" && location.pathname.replace(/\?.*$/,"").split("/")[2] == 'customer_topics') {
			$('.sidebar_list_item_menu_item:first-of-type').addClass("is_current");
		};
	});
});
