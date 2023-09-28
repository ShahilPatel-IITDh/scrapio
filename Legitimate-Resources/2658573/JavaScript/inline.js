
		/**
		 * swiper.js の初期化処理
		 */
		window.addEventListener( 'load', function () {
			var swiper = new Swiper( '.swiper-container', {
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: true
				},
				slidesPerView: 'auto',
				spaceBetween: 10,
				speed: 2000
//				breakpoints: {
//					767: {
//						slidesPerView: 1,
//						spaceBetween: 0
//					}
//				}
//				 autoplay: 2000
			} );
		}, false );
	