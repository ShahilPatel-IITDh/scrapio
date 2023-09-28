/* Template Name: DCode - Saas & Software Landing Page Templates
   Author: SacredThemes
   Author URL: https://sacredthemes.net
   Created: August 2020
   Version: 1.6
   File Description: Main JS file of the template
*/
(function($) {
    "use strict";
    /*---------------------------------------------*
     // Loader 
    *---------------------------------------------*/ 
    $(window).on('load', function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    });
    /*---------------------------------------------*
     // WOW Animation 
    *---------------------------------------------*/ 
    var wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
        }
    );
    wow.init();
    /*---------------------------------------------*
     // Theme Option
    *---------------------------------------------*/ 
    $("#theme-option .switcher-btn a.settings").click(function(e){
        e.preventDefault();
        var div = $("#theme-option");
        if (div.css("left") === "-200px") {
            $("#theme-option").animate({
                left: "0px"
            }); 
        } else {
            $("#theme-option").animate({
                left: "-200px"
            });
        }
    });
    $(document).click(function(event) {
        if (!$(event.target).closest("#theme-option").length) {
            $("body").find("#theme-option").animate({"left":"-200px"});
        }
    });
    $(".pattern-color-list a" ).click(function(e){
        e.preventDefault();
        var ThemeColorFile = $(this).data('url');
        $("#theme-color").attr("href", 'css/colors/' + ThemeColorFile + '.css');
        $('.pattern-color-list a').removeClass('active');
        $(this).addClass('active');
        changeImagePath(ThemeColorFile);
        return false;
    });
    function changeImagePath(colorValue){
        var img = $("img").each(function() {
            var src = $(this).attr("src");
            var path = src.substring(0,src.lastIndexOf('/')); 
            var fileName = src.substring(src.lastIndexOf('/'));
            var newSrc = path+"/large"+fileName;
            if(path !== "images"){
                var newSrc = "images/" + colorValue + fileName;
                $(this).attr("src",newSrc);
            }
        });
    }
    $(".layout-option a" ).click(function(e){
        e.preventDefault();
        if($(this).hasClass('rtl-version')){
            $("#rtl-theme-default").removeAttr("disabled");
        }else{
            $("#rtl-theme-default").attr("disabled", "disabled");
        }
        $('.layout-option a').addClass('enable');
        $(this).removeClass('enable');
        return false;
    });
    
    /*---------------------------------------------*
     // Search Option
    *---------------------------------------------*/ 
    $('.search-btn a').click(function(e){
        e.preventDefault();
        $('.overlay.overlay-search').addClass('open');
    });
    $('.close-search').click(function(e){
        e.preventDefault();
        $('.overlay.overlay-search').removeClass('open');
    });
    
    $(document).keydown(function(e) {
        // ESCAPE key pressed
        if (e.keyCode === 27) {
            if ($('.overlay.overlay-search').hasClass('open')){
                $('.overlay.overlay-search').removeClass('open');
            }
        }
    });
    /*---------------------------------------------*
     // Sticky Nav
    *---------------------------------------------*/ 
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 150) {
            $("header.navbar").addClass("menu-fixed");
        }else{
            $("header.navbar").removeClass("menu-fixed");
        }
    });
    /*---------------------------------------------*
     // Mobile Menu
    *---------------------------------------------*/
    $(window).load(function() {
        var viewportWidth = $(window).width();
        if (viewportWidth < 992) {
            $(".navbar-right").appendTo("#navigation");
            $('<span class="close-btn"></span>').prependTo("#navigation");
        }
        $(window).resize(function () {
            if (viewportWidth < 992) {
                $(".navbar-right").appendTo("#navigation");
                $('<span class="close-btn"></span>').prependTo("#navigation");
            }
        });
    });
    $('.menu-toggle-btn').click(function() {
        $(this).addClass('active');
        $('#navigation').addClass('open');
        $('body').addClass('navigation-in');
    });
    $(document).on("click","#navigation .close-btn, #navigation a",function() {
        $('.menu-toggle-btn').removeClass('active');
        $('#navigation').removeClass('open');
        $('body').removeClass('navigation-in');
    });
    $(document).keydown(function(e) {
        // ESCAPE key pressed
        if (e.keyCode === 27) {
            $('.menu-toggle-btn').removeClass('active');
            $('#navigation').removeClass('open');
            $('body').removeClass('navigation-in');
        }
    });
    jQuery('#navigation ul li.menu-item-has-children > a').after('<span class="child-link"><i class="fas fa-chevron-down"></i></span>');

    jQuery('span.child-link').click(function() {
        jQuery(this).parent().siblings('li.menu-item-has-children').find('span.child-link').removeClass('active');
        jQuery(this).parent().siblings('li.menu-item-has-children').find('ul').slideUp(350);
        jQuery(this).next('ul').slideToggle(350);
        jQuery(this).next('ul').children('li').find('ul').slideUp(350);
        jQuery(this).next('ul').children('li').find('span.child-link').removeClass('active');
        jQuery(this).toggleClass('active');
        return false;
    });
    /*---------------------------------------------*
     // Testimonial slider
    *---------------------------------------------*/ 
    $('.theme-one .testimonial-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
    });
    $('.theme-two .testimonial-slider').slick({
        dots: false,
        arrows: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
            breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.theme-three .testimonial-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 2000,
        slidesToShow: 1,
    });
    $('.theme-four .testimonial-slider').slick({
        dots: false,
        arrows: true,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 600,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    /*---------------------------------------------*
     // Screen Shot slider
    *---------------------------------------------*/ 
    $('.screenshot-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: 'linear',
    });
    /*---------------------------------------------*
     // companies-logo slider
    *---------------------------------------------*/
    $('.companies-logo').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
            breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
            breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
            breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.companies-logo.grid-view').slick('unslick');
    /*---------------------------------------------*
     // Timeline slider
    *---------------------------------------------*/
    $('.timeline-slider').slick({
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                }
            },
            {
            breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
            breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
            breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    /*---------------------------------------------*
     // Fact Counter + Text Count
    *---------------------------------------------*/ 
    if($('.counter').length){
        $('.counter').appear(function(){
            var $t = $(this),
                n = $t.find(".counter-number").attr("data-stop"),
                r = parseInt($t.find(".counter-number").attr("data-speed"), 10);
                if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".counter-number").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".counter-number").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".counter-number").text(this.countNum);
                    }
                });
            }
        },{accY: 0});
    }
    /*---------------------------------------------*
     // Filter
    *---------------------------------------------*/ 
    if($('.grid').length > 0){
        var $grid = jQuery('.grid').isotope({
            // options
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
        });

        // change is-checked class on buttons
        var $buttonGroup = $('.filters');
        $buttonGroup.on( 'click', 'li', function( event ) {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            var $button = $( event.currentTarget );
            $button.addClass('is-checked');
            var filterValue = $button.attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
        jQuery(window).load(function(){
            jQuery('.filters ul .is-checked').click();
        });
    }

    
    /*---------------------------------------------*
     // CountDown
    *---------------------------------------------*/ 
    if($('#clock').length > 0){
        var DateTime = $('#clock').data('date');
        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;
            let countDown = new Date(DateTime).getTime(),
            x = setInterval(function() {    
            let now = new Date().getTime(),
                distance = countDown - now;
            document.getElementById('days').innerText = Math.floor(distance / (day)),
            document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
        }, second);
    }
    /*---------------------------------------------*
     // Upload
    *---------------------------------------------*/ 
    jQuery('input#upload').change(function(){
        var tmpval = jQuery(this).val();
        var ms = this.value.replace(/^.*\\/, '');
        jQuery('.upload-path #upload-res').text(ms)
        if(tmpval == '') {
            jQuery('.upload-path').removeClass('not-empty');
        } else {
            jQuery('.upload-path').addClass('not-empty');
        }
    });
    jQuery('.upload-close').click(function(){
        jQuery('.upload-path #upload-res').text('');
        jQuery('#upload').val('');
        jQuery('.upload-path').removeClass('not-empty');
    });
    /*---------------------------------------------*
     // Mobile Tabs
    *---------------------------------------------*/
    if($(window).width() < 767 ){
        $('.st-tab-btn').each(function(){
            var ActiveTabName = $(this).find('.nav-link.active').text();
            $('<div class="select-filter">'+ActiveTabName+'</div>').prependTo(this).find('.st-tab-btn');
        });
        $('.select-filter').click(function() {
            $(this).next('ul').slideToggle('600');
        });
        $('.st-tab-btn ul.nav a').click(function() {
            var text = $(this).text();
            $(this).parents('ul').prev('.select-filter').text(text);
            $(".st-tab-btn ul.nav").hide();
        });
    }
    /*---------------------------------------------*
     // Add Class to section on scroll
    *---------------------------------------------*/
    $(window).on('scroll', function() {
        $(".enquiry-section").each(function() {
            if (isScrolledIntoView($(this))) {
                $(this).addClass("animation-in");
            }
        });
    });
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
})(jQuery);
/*---------------------------------------------*
 // eQual Height
*---------------------------------------------*/
equalheight = function(container){
var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
    jQuery(container).each(function() {
        $el = jQuery(this);
        jQuery($el).height('auto')
        topPostion = $el.position().top;
        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}
jQuery(window).load(function() {
    equalheight('.theme-two .testimonial-text');
});
jQuery(window).resize(function(){
    equalheight('.theme-two .testimonial-text');
});