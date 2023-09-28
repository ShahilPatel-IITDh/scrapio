/*-----------------------------------------------------------------------------------
 Theme Name: WICON
 Author: Nibase
 Author URI: https://themeforest.net/user/nibase
 Version: 1.3.1
 Description: A Beautiful, Professional and Multipurpose Theme Made by Viki Team
 -----------------------------------------------------------------------------------*/

/* ----------------------------------------------------------------
 [Table of contents]

 - PreLoader
 - AnimationScrollPage
 - CountTo
 - ParallaxBackground
 - Slider
 - MenuMobile
 - InputFile
 - MegaMenu
 - ScrollToTop
 - LightBox
 - CustomTheme
 - MediaPlayer
 - PriceRange
 - CalcQuantity

 ------------------------------------------------------------------*/

'use strict';
jQuery(document).ready(function ($) {
    jQuery('.trangslide').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        dots: true
    });
    jQuery('.slide-lastest').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots:true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots:true,
                }
            }
        ]
    });
    jQuery('.slide-homeservice').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            }
        ]

    });

    /*Jquery validate form contact*/
    $('#contactform').submit(function () {

        var action = $(this).attr('action');

        $("#message-contact").slideUp(750, function () {
            $('#message-contact').hide();

            $('#submit-contact')
                .after('<i class="icon-spin4 animate-spin loader"></i>')
                .attr('disabled', 'disabled');

            $.post(action, {
                    name_contact: $('#name_contact').val(),
                    email_contact: $('#email_contact').val(),
                    phone_contact: $('#phone_contact').val(),
                    message_contact: $('#message_contact').val(),
                    subject: $('#subject').val(),
                },
                function (data) {
                    document.getElementById('message-contact').innerHTML = data;
                    $('#message-contact').slideDown('slow');
                    $('#contactform .loader').fadeOut('slow', function () {
                        $(this).remove()
                    });
                    $('#submit-contact').removeAttr('disabled');
                    if (data.match('success') != null) $('#contactform').slideUp('slow');

                }
            );

        });
        return false;
    });

    $('#contactcareer').submit(function () {

        var action = $(this).attr('action');

        $("#message-career").slideUp(750, function () {
            $('#message-career').hide();

            $('#submit-career')
                .after('<i class="icon-spin4 animate-spin loader"></i>')
                .attr('disabled', 'disabled');

            $.post(action, {
                    name_career: $('#name_career').val(),
                    email_career: $('#email_career').val(),
                    phone_career: $('#phone_career').val(),
                    message_career: $('#message_career').val(),

                },
                function (data) {
                    document.getElementById('message-career').innerHTML = data;
                    $('#message-career').slideDown('slow');
                    $('#contactcareer .loader').fadeOut('slow', function () {
                        $(this).remove()
                    });
                    $('#submit-career').removeAttr('disabled');
                    if (data.match('success') != null) $('#contactcareer').slideUp('slow');

                }
            );

        });
        return false;
    });
});
/*preloader*/
var PreLoader = function () {
    var _initInstances = function () {
        $('.animsition').animsition({
            inDuration: 900,
            outDuration: 500,
            linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="cc-btn cc-dismiss"]):not([class^="nolink"]):not([class^="swipebox"]):not([class^="vk-btn vk-btn-icon vk-btn-s vk-btn-default swipebox-video"]):not([class^="d-ortala swipebox"]):not([href^="javascript:void(0);"])',
        });
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

/*animation scroll page*/
var AnimationScrollPage = function () {
    var _initInstances = function () {
        $('.animation').waypoint(function (direction) {
            $(this).addClass('animation-active');
        }, {
            offset: '100%',
            triggerOnce: true
        });
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

/*count to*/
var CountTo = function () {
    var _initInstances = function () {
        var itemCount = $('.vk-counter .number-count');
        $(itemCount).waypoint({
            handler: function (direction) {
                $(this.element).countTo({
                    from: 0,
                    speed: 2000,
                    refreshInterval: 50
                });
            },
            offset: '100%',
            triggerOnce: true,
        });
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

// parallax background
var ParallaxBackground = function () {
    var _initInstances = function () {
        $('.vk-parallax').attr('data-stellar-background-ratio', '0.1');
        $.stellar({
            verticalOffset: 1,
            horizontalScrolling: false,
        });
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

// slider
var Slider = function () {
    var singleProjectSlider = function () {
        $('.vk-slider-project .slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
            fade: true,
            asNavFor: '.slider-nav',
            focusOnSelect: true,
        });
        $('.vk-slider-project .slider-nav').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            arrows: false,
            responsive: [{

                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }

            }]
        });
    };

    var singleProductSlider = function () {
        $('.vk-slider-shop .slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            arrows: false,
            asNavFor: '.slider-nav',
            adaptiveHeight: true,
        });
        $('.vk-slider-shop .slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
        });
    };

    var imageSlider = function () {
        $('.vk-slick-slider').slick({
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
            centerPadding: 0,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: true,
                    }

                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        centerMode: true,
                        centerPadding: '50px',
                    }

                }]
        });
    };

    var homepageSlider = function () {

        $('.recent-blog-slider').slick({
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
            slidesToShow: 2,
            dots: true,
            dotsClass: 'vk-arrow-dots',
            responsive: [{

                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }

            }]
        })
            .on('setPosition', function (event, slick) {
                arrowDotNav();
            });


    };

    var aboutPageSlider = function () {
        $('.customer-slider').slick({
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
            adaptiveHeight: true,
            responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: false
                }

            }]
        });
    };

    var homeShopSlider = function () {

        $('.vk-list-client-shop > .vk-list').slick({
            slidesToShow: 6,
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fas fa-caret-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fas fa-caret-left"></i></button>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }

            },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }

                }]
        });
    };

    var arrowDotNav = function () {
        var arrowDots = $('.vk-arrow-dots');
        if (arrowDots.length > 0) {
            var dots = arrowDots.find('>li');
            var numDots = dots.length;

            dots.css('width', 'calc(100% / ' + numDots + ')')

        }
    };

    var homeOnePage = function () {

        var currentWidth = $(window).outerWidth();

        if (currentWidth >= 768) {

            $('.slick-slider-one-page').addClass('_pc');

            if ($('.slick-slider-one-page.slick-slider').length == 1 && $('.slick-slider-one-page._mobile').length == 1) {
                $('.slick-slider-one-page').slick('destroy');
                $('.slick-slider-one-page').removeClass('_mobile');

            }

            if ($('.slick-slider-one-page._pc').length == 1 && $('.slick-slider-one-page.slick-slider').length == 0) {

                $('.slick-slider-one-page').slick({
                    nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                    prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                    slidesToShow: 3,
                    rows: 2,
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2,
                            }
                        }],
                });
            }

        }

        if (currentWidth < 768) {

            $('.slick-slider-one-page').addClass('_mobile');

            if ($('.slick-slider-one-page.slick-slider').length == 1 && $('.slick-slider-one-page._pc').length == 1) {
                $('.slick-slider-one-page').slick('destroy');
                $('.slick-slider-one-page').removeClass('_pc');
            }

            if ($('.slick-slider-one-page._mobile').length == 1 && $('.slick-slider-one-page.slick-slider').length == 0) {
                console.log('MB');
                $('.slick-slider-one-page').slick({
                    nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                    prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                    slidesToShow: 1,
                    rows: 1,
                });
            }
        }

        if (currentWidth >= 1068) {
            $('.slick-slider-left-menu').addClass('_pc');

            if ($('.slick-slider-left-menu.slick-slider').length == 1 && $('.slick-slider-left-menu._mobile').length == 1) {
                $('.slick-slider-left-menu').slick('destroy');
                $('.slick-slider-left-menu').removeClass('_mobile');
            }

            if ($('.slick-slider-left-menu._pc').length == 1 && $('.slick-slider-left-menu.slick-slider').length == 0) {

                $('.slick-slider-left-menu').slick({
                    nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                    prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                    slidesToShow: 3,
                    rows: 2,
                    responsive: [
                        {
                            breakpoint: 1291,
                            settings: {
                                slidesToShow: 2,
                            }
                        }],
                });
            }
        }

    };

    var homeOnePageExtra = function () {
        $('.vk-slider-testimonial').slick({
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="ti-angle-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="ti-angle-left"></i></button>',
            adaptiveHeight: true
        });

        $('.vk-pricing-table-slider').slick({
            arrows: false,
            adaptiveHeight: true,
            slidesToShow: 4,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ],
        });

    }

    var homeSlider = function () {

        var slider = $('.vk-baner-slider');
        var imageArrow = function () {
            var itemSlider = slider.find('.slick-slide');
            var itemSliderCurrent = slider.find('.slick-slide.slick-current');
            var totalSlider = itemSlider.length;
            var imageNext = '';
            var imagePrev = '';

            if (itemSliderCurrent.attr('data-slick-index') == 0) {
                imagePrev = $(itemSlider.last()).css('background-image');
                imageNext = $(itemSliderCurrent).next().css('background-image');
            } else if (itemSliderCurrent.attr('data-slick-index') == totalSlider - 1) {
                imageNext = $(itemSlider.first()).css('background-image');
                imagePrev = $(itemSliderCurrent).prev().css('background-image');
            } else {
                imageNext = $(itemSliderCurrent).next().css('background-image');
                imagePrev = $(itemSliderCurrent).prev().css('background-image');
            }

            return {
                imageNext: imageNext,
                imagePrev: imagePrev,
            }
        }

        // slick initial
        slider.on('init', function (event, slick) {

            //option slider fade: false
            var imageNext = $('.slick-slide.slick-current').next().css('background-image');
            var imagePrev = $('.slick-slide.slick-current').prev().css('background-image');

            $(this).find('.vk-arrow.next .image-preview-thumbnail').css('background-image', imageNext);
            $(this).find('.vk-arrow.prev .image-preview-thumbnail').css('background-image', imagePrev);

            var $firstAnimatingElements = $('.slick-slide').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });

        slider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
            console.log(currentSlide, nextSlide)
        });

        //slick run
        slider.slick({
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="icon ti-angle-right"></i><span class="image-preview-thumbnail"></span></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="icon ti-angle-left"></i><span class="image-preview-thumbnail"></span></button>',
            dotsClass: 'vk-list vk-dots-nav',
            dots: true,
            fade: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    }
                }
            ],
        });


        //after Change slide change
        slider.on('afterChange', function (event, slick, currentSlide) {
            //option slider fade: false
            var imageNext = $('.slick-slide.slick-current').next().css('background-image');
            var imagePrev = $('.slick-slide.slick-current').prev().css('background-image');

            $(this).find('.vk-arrow.next .image-preview-thumbnail').css('background-image', imageNext);
            $(this).find('.vk-arrow.prev .image-preview-thumbnail').css('background-image', imagePrev);
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay,
                    'display': 'inline-block',
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }

    }


    var _initInstances = function () {
        imageSlider();
        homepageSlider();
        singleProjectSlider();
        aboutPageSlider();
        homeShopSlider();
        singleProductSlider();
        homeOnePage();
        homeOnePageExtra();
        homeSlider();
    };

    return {
        init: function () {
            _initInstances();
        },
        responsive: function () {
            homeOnePage();
        }
    };
}();

// masonry item
var MasonryItem = function () {
    var masonry_item = ['.vk-masonry-layout',];
    var slider_filter = ['.vk-slider-filter',];
    var listFilterFix = ['.vk-filter-fix']

    var buttonFilter = '.vk-filter';
    var buttonFilterDefault = '.vk-filter-button';
    var buttonFilterFix = '.vk-filter-button-fix';

    var sliderFilter = function () {

        $('.slick-slider-homepage').slick({
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
            slidesToShow: 3,
            rows: 2,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        arrows: false,
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                }, {

                    breakpoint: 768,
                    settings: "unslick",

                }],
        });

        $('.slick-slider-project-left-menu').slick({
            nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
            prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
            slidesToShow: 3,
            rows: 2,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 2,
                    }
                }, {

                    breakpoint: 768,
                    settings: "unslick",

                }],
        });


        $(slider_filter.toString()).isotope({
            filter: '.all',
        });
        $(buttonFilterDefault)
            .on('click', ' li', function () {
                var filterValue = $(this).attr('data-filter');
                $(slider_filter.toString()).isotope({
                    filter: filterValue,
                });

                return false;
            });
    };

    var sliderResponsiveFilter = function () {

        var currentWidth = $(window).outerWidth();

        if (currentWidth > 992 && $('.vk-slider-what-we-do.slick-slider').length == 0) {
            $('.vk-slider-what-we-do.vk-filter-fix').isotope('destroy');
            $('.vk-slider-what-we-do').removeClass('vk-filter-fix');

            $('.vk-slider-what-we-do .item').css('display', 'block');
            $('.vk-slider-what-we-do').slick({
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
            });
        }
        if (currentWidth < 992 && $('.vk-slider-what-we-do.vk-filter-fix').length == 0) {
            if ($('.vk-slider-what-we-do.slick-slider').length == 1) {
                $('.vk-slider-what-we-do').slick('destroy');
            }

            $('.vk-slider-what-we-do').addClass('vk-filter-fix');
            filterFix();

        }
    };

    var filterFix = function () {
        $(listFilterFix.toString()).isotope({
            filter: '.first',
        });
        $(buttonFilterFix)
            .on('click', 'li', function () {
                var filterValue = $(this).attr('data-filter');
                $(listFilterFix.toString()).isotope({
                    filter: filterValue,
                });

                return false;
            })
            .on('change', function () {
                // get filter value from option value
                var filterValue = this.value;
                $(listFilterFix.toString()).isotope({
                    filter: filterValue,

                });

                return false;
            });
    }

    var masonryLayout = function () {
        for (var i = 0; i < masonry_item.length; i++) {

            $(masonry_item[i]).isotope({
                // options...
                itemSelector: '.item',
                masonry: {
                    columnWidth: '.item',
                }
            });
        }

        //filter items on button click
        $(buttonFilterDefault)
            .on('click', 'li', function () {
                var filterValue = $(this).attr('data-filter');
                //console.log(filterValue);
                $(masonry_item.toString()).isotope({
                    filter: filterValue,

                });

                return false;
            })
            .on('change', function () {
                // get filter value from option value
                var filterValue = this.value;
                $(masonry_item.toString()).isotope({
                    filter: filterValue,

                });

                return false;
            });
    };

    var clickActive = function () {
        $(buttonFilter).find('li:first-child').addClass('active');
        $(buttonFilter).on('click', 'li', function (e) {

            $(this).siblings('.active').removeClass('active');

            $(this).addClass('active');

            return false;
        });
    };

    var _initInstances = function () {
        clickActive();
        masonryLayout();
        sliderFilter();
        filterFix();
        sliderResponsiveFilter();

    };

    return {
        init: function () {
            _initInstances();
        },

        responsive: function () {
            sliderResponsiveFilter();
        }
    };
}();


// input file
var InputFile = function () {
    var _initInstances = function () {
        var inputs = document.querySelectorAll('.vk-input-file');
        Array.prototype.forEach.call(inputs, function (input) {
            var label = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener('change', function (e) {
                var fileName = '';
                if (this.files && this.files.length > 1)
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else
                    fileName = e.target.value.split('\\').pop();

                if (fileName)
                    label.querySelector('span').innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });

            // Firefox bug fix
            input.addEventListener('focus', function () {
                input.classList.add('has-focus');
            });
            input.addEventListener('blur', function () {
                input.classList.remove('has-focus');
            });
        });
    }
    return {
        init: function () {
            _initInstances();
        }
    };
}();

// menu mobile
var MenuMobile = function () {
    var _initInstances = function () {

        $('#menu').slicknav({
            label: '.vk-navbar-toggle',
            duration: 500,
            prependTo: 'section'
        });
    };
    return {
        init: function () {
            _initInstances();
        }
    };
}();

// mega menu
var MegaMenu = function () {

    var _initInstances = function () {

        var menu = $('.vk-navbar-nav.child');
        var valueAction = 'shortcodes';
        var target = '.vk-header .container';

        var array = menu.siblings();

        for (var i = 0; i < array.length; i++) {

            var itemCurrent = $(array[i]).text().toLowerCase();

            if (itemCurrent == valueAction) {

                $(array[i]).siblings().addClass('vk-mega-menu');

            }
        }

    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

//scroll up
var ScrollToTop = function () {

    var _initInstances = function () {
        $.scrollUp({
            scrollText: '<i class="fa fa-angle-up"></i>',
            scrollSpeed: 500,
            zIndex: 1,

        });
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

//lightbox otion
var LightBox = function () {

    var _initInstances = function () {
        lightbox.option({
            disableScrolling: true,
            showImageNumberLabel: false,
            wrapAround: true,
            alwaysShowNavOnTouchDevices: true
        })
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

// custom theme
var MediaPlayer = function () {
    var _initInstances = function () {
        $('audio').mediaelementplayer({
            audioWidth: '100%',
            audioHeight: 60,

        });
        $('video').mediaelementplayer({
            defaultVideoWidth: 800,
            defaultVideoHeight: 400,
        });
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

// price range
var PriceRange = function () {
    var _initInstances = function () {
        var slider_range = '#slider-range';
        var amount1 = '#amount1';
        var amount2 = '#amount2';
        $(slider_range).slider({
            range: true,
            min: 0,
            max: 1000,
            values: [59, 799],
            slide: function (event, ui) {
                $(amount1).val(ui.values[0]);
                $(amount2).val(ui.values[1]);
            }
        });
        $(amount1).val($(slider_range).slider("values", 0));
        $(amount2).val($(slider_range).slider("values", 1));
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

// calculator quantity
var CalcQuantity = function () {
    var _initInstances = function () {
        $(".quantity button").on("click", function () {
            var $button = $(this);
            var oldValue = $button.parent().siblings().find("input").val();

            if ($button.text() == "+") {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }

            $button.parent().siblings().find("input").val(newVal);

            return false;
        });
    };

    return {
        init: function () {
            _initInstances();
        }
    };
}();

// Tooltip
var Tooltip = function () {
    var _initInstances = function () {
        $('[data-toggle="tooltip"]').tooltip();
    }

    return {
        init: function () {
            _initInstances();
        }
    };
}();
function goBack() {
   window.history.back();
}
// custom theme
var CustomTheme = function () {

    var custom = function () {
        if ($('.vk-home-dark').length) {
            $('#scrollUp').addClass('inverse');
        }

        if ($('.vk-header-left-menu').length) {
            $('body').addClass('vk-left-menu');


            $('#menu .child').prepend('<li class="back"> <span class="fa fa-angle-double-left"></span></li>');
            $('#menu .vk-navbar-nav:not(.child)').on('click', 'li', function () {
                console.log($(this));
                $(this).find('.child').fadeIn();
                $('#menu').css('transform', 'translateX(-95%)');

                $('.back').on('click', function () {
                    $('#menu').css('transform', 'translateX(0%)');
                    $(this).parent().fadeOut();
                    return false;
                });

            });

        }

        if ($('.vk-home-one-page').length) {
            $('body').addClass('vk-one-page');
        }

        $("#navScroll2Id a").mPageScroll2id();


    }

    var customByDevice = function () {
        $('.vk-one-page .section').css('min-height', $(window).height());
    }

    var _initInstances = function () {
        custom();
    };

    return {
        init: function () {
            _initInstances();
            customByDevice();
        },
        responsive: function () {
            customByDevice();
        }
    };
}();

//action
$(window).on('load', function () {
// $(window).load(function () {
    MasonryItem.init();
});

$(window).resize(function () {
    MasonryItem.responsive();
    Slider.responsive();
    CustomTheme.responsive();

});

$(document).ready(function () {
    PreLoader.init();
    AnimationScrollPage.init();
    CountTo.init();
    ParallaxBackground.init();
    Slider.init();
    MenuMobile.init();
    InputFile.init();
    MegaMenu.init();
    ScrollToTop.init();
    LightBox.init();
    CustomTheme.init();
    MediaPlayer.init();
    PriceRange.init();
    CalcQuantity.init();
    Tooltip.init();
});








