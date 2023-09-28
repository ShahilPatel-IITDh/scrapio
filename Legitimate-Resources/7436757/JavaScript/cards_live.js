(function() {

    var swiper = new Swiper('.dsg_o_cards_live_wrapper', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
        loopFillGroupWithBlank: true,
        normalizeSlideIndex: true,
        watchOverflow: true,
        navigation: {
            nextEl: '.dsg_o_cards_live .-dsg_button_right',
            prevEl: '.dsg_o_cards_live .-dsg_button_left',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1080: {
                slidesPerView: 2,
                spaceBetween: 32,
                slidesPerGroup: 2,
                slideBlankClass: 'swiper-slide-invisible-blank'
            },
            768: {
                spaceBetween: 16,
                slidesPerView: '1.1',
                slidesPerGroup: '1',
                slideBlankClass: 'swiper-slide-invisible-blank',
                navigation: false,
            }
        }
    });

    const cardWrapper = document.getElementsByClassName("dsg_atc_cards_wrapper")[0];
    if (cardWrapper) {
        var swiper2 = new Swiper('.dsg_atc_cards_wrapper', {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 19,
            loopFillGroupWithBlank: true,
            normalizeSlideIndex: true,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                1080: {
                    slidesPerView: '2',
                    spaceBetween: 16,
                    slidesPerGroup: 2,
                    slideBlankClass: 'swiper-slide-invisible-blank'
                },
                768: {
                    spaceBetween: 16,
                    slidesPerView: '1.1',
                    slidesPerGroup: '1',
                    slideBlankClass: 'swiper-slide-invisible-blank',
                    navigation: false,
                }
            }
        });
    }

})();