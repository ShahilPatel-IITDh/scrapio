
            if ($('.slick-dynamic-slider').length > 0) {
                $('.slick-dynamic-slider').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    infinite: false,
                    swipeToSlide: true,
                    variableWidth: false,
                    responsive: [
                        {
                            breakpoint: 1230,
                            settings: {
                                slidesToShow: 5
                            }
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: "unslick"
                        }
                    ]
                });
            }

            if ($('.exploreTopSliderDynamicSlider').length > 0) {
                $('.exploreTopSliderDynamicSlider').slick({
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    infinite: false,
                    swipeToSlide: true,
                    variableWidth: false,
                    responsive: [
                        {
                            breakpoint: 1230,
                            settings: {
                                slidesToShow: 5
                            }
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 6
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 6
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: "unslick"
                        }
                    ]
                });
            }
        