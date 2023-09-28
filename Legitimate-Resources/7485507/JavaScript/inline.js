
         var swiper_slider = new Swiper('.swiper-container-logos', {
            slidesPerView: 5,
            loop: false,
            autoplay: {
               delay: 80000,
               disableOnInteraction: false,
            },
            paginationClickable: true,
            spaceBetween: 10,
            pagination: {
               el: '.swiper-pagination',
               clickable: true,
            },
            breakpoints: {
               780: {
                  slidesPerView: 1,
                  spaceBetween: 5
              },
               480: {
                  slidesPerView: 1,
                  spaceBetween: 05
               }
            },
            navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            },
         });
      