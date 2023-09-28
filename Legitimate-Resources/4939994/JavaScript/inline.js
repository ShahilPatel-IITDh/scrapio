
        $(function () {
            $('.image-gallery').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                centerMode: true,
                variableWidth: true,
                centerPadding: '60px',
                prevArrow: '<button type="button" class="btn slick-prev btn-slick"><i class="icon icon-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="btn slick-next btn-slick"><i class="icon icon-chevron-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            centerPadding: '20px',
                            slidesToShow: 1,
                            variableWidth: false,
                        }
                    },
                ],
            });

            $('.closeAlert').click(function () {
                $(this).parent().slideUp();
                window.localStorage.setItem('alert_box_cookies', true);
            })
            $(document).ready(function () {
                if (!window.localStorage.getItem('alert_box_cookies')) {
                    $('#alertBox').css('display', 'block');
                }
            });
        })
        AOS.init();
    