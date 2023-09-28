
	var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		loop: true,
		slidesPerView: 5,
		spaceBetween: 15,
		autoplay: {
			delay: 2700,
		},
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		},
		breakpoints: {
              1024: {
				slidesPerView: 4,
				spaceBetween: 15,
			},
              767: {
				slidesPerView: 2,
				spaceBetween: 10,
				centeredSlides : true,
				autoplay: {
					delay: 4200,
				},
			}
        }
	});
	
	var mySwiper2 = new Swiper ('.swiper-container2', {
	// Optional parameters
		loop: true,
		slidesPerView: 3,
		spaceBetween: 17,
		centeredSlides : true,
		autoplay: {
			delay: 4000,
		},

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		},

		breakpoints: {
			767: {
				slidesPerView: 2,
				spaceBetween: 10,
				centeredSlides : true,
				autoplay: {
					delay: 4200,
				},
			}
		}
	});

