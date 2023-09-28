if(window.innerWidth > 767){
$('.bxslider').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 240,
        slideMargin: 10
    });
}
if(window.innerWidth < 767){
$('.bxslider').bxSlider({
        minSlides: 2,
        maxSlides: 2,
        slideWidth: 220,
        slideMargin: 10
    });
}

$(".mob-btn").click(function(){
	$(".mob-btn").toggleClass("close-btn");
	$("nav").slideToggle();
});

$(document).ready(function () {
    "use strict";
	var myNav = {
		init: function () {
			this.cacheDOM();
			this.browserWidth();
			this.bindEvents();
		},
		cacheDOM: function () {
			this.navBars = $(".navBars");
			this.toggle = $("#toggle");
			this.navMenu = $(".header_top");
		},
		browserWidth: function () {
			$(window).resize(this.bindEvents.bind(this));
		},
		bindEvents: function () {
			var width = window.innerWidth;

			if (width < 1023) {
				this.navBars.click(this.animate.bind(this));
				this.navMenu.hide();
				this.toggle[0].checked = false;
			} else {
				this.resetNav();
			}
		},
		animate: function (e) {
			var checkbox = this.toggle[0];

			if (!checkbox.checked) {
				this.navMenu.slideDown();
			} else {
				this.navMenu.slideUp();
			}

		},
		resetNav: function () {
			this.navMenu.show();
		}
	};
	myNav.init();
});
