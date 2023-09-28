// makes sure whole site is loaded
jQuery(window).on('load', function() {
    jQuery(".pk-loader").fadeOut();
    jQuery("body").addClass("loaded");
    jQuery(".preloader").delay(100).fadeOut("slow").remove();
});
/****/
$(function () {
    $("#datepicker").datepicker({
        dateFormat: 'dd-mm-yy',
        minDate:    0
    });
});
$(function () {
    $("#datepickerCms").datepicker({
        dateFormat: 'dd-mm-yy',
        minDate:    0
    });
});
/****/
jQuery(document).ready(function (e) {

    // Lazy load
    $(function() {
        $('.lazy').lazy();
    });

    // Homepage banner carousel - Disable on mobile
    if ($(window).width() > 767) {
        $('#home-carousel').carousel();
        $(".left.carousel-control").click(function(){
            $("#home-carousel").carousel('prev');
        });
        $(".right.carousel-control").click(function(){
            $("#home-carousel").carousel('next');
        });
        $(".carousel-thumbs ol li").click(function(){
            var number = $(this).attr('data-slide-to');
            console.log(number);
            $("#home-carousel").carousel(parseInt(number));
        });
    }

    //cms form submit
    if ( jQuery('.cms-form').length ) {
        jQuery('.cms-form').submit(function (e) {
            e.preventDefault();
            //cms post
            jQuery.ajax({
                url: '/cms-form',
                type: "POST",
                data: jQuery(this).serialize(),
                success: confirm(),
                dataType: 'json'
            });
        });
    }

        var confirm = function () {
            jQuery('.cms-form').hide();
            jQuery('#sending').show('fast', function() {
                setTimeout(function() {
                    jQuery('.conftext').show();
                    jQuery('#sending').hide();
                }, 1000);
            });
    };

    //newsletter form submit
    if ( jQuery('.newsletter-form').length ) {
        jQuery('.newsletter-form').submit(function (e) {

            e.preventDefault();
            $('#label_newsletter_offers span.error').html('');
            $('#label_newsletter_tcs span.error').html('');

            // check gdpr checkboxes
            if($("#newsletter_offers").is(':checked') && $("#newsletter_tcs").is(':checked')) {
                jQuery.ajax({
                    url: '/newsletter-signup-form',
                    type: "POST",
                    data: jQuery(this).serialize(),
                    success: nl_confirm(),
                    dataType: 'json'
                });
            } else {
                if (!$("#newsletter_offers").is(':checked')) {
                    $('#label_newsletter_offers span.error').html('<i class="fa fa-exclamation-circle"></i> please accept to continue. ');
                }
                if (!$("#newsletter_tcs").is(':checked')) {
                    $('#label_newsletter_tcs span.error').html('<i class="fa fa-exclamation-circle"></i> please accept to continue. ');
                }
            }
        });
        var nl_confirm = function () {
            jQuery('.newsletter-form').hide();
            jQuery('.newsletter-conftext').show();
        }
    }


    jQuery("[data-target='#topnav']").click(function(e) {
        jQuery(".header").toggleClass("menu_up");
    });

    jQuery("#locations").click(function (e) {
        jQuery(this).toggleClass("closed");
        jQuery("#locations-pane").slideToggle();
    });
    /****/
    jQuery("#departments").click(function (e) {
        jQuery(this).toggleClass("closed");
        jQuery("#departments-pane").slideToggle();
    });

    jQuery("#facilities").click(function (e) {
        jQuery(this).toggleClass("closed");
        jQuery("#facilities-pane").slideToggle();
    });
    /****/
    jQuery("#show-pc").click(function (e) {
        jQuery(".pc-area").toggleClass('open');
    });
    /****/
    jQuery('#rooms').change(function () {
        if (parseInt($(this).val()) >= 10) {
            jQuery(".room-details").hide();
            jQuery(".more-rooms").show();
        }
        else {
            jQuery(".room-details").show();
            jQuery(".more-rooms").hide();
        }
    });

    jQuery('#roomsEnquiry button.close').on('click', function() {
        jQuery('.cms-form').show();
        jQuery('.conftext').hide();
        jQuery('#sending').hide();
    });

    $('#home-carousel .carousel-inner .home-banner-item:first-child').addClass('active');
});
/****/
jQuery(window).on("load resize scroll",function(e){
    if ($(window).width() > 960) {
        var mapHeight = jQuery(".inner-wrap").height();
        jQuery(".map-iframe").height(mapHeight);

    }
});
/****/
jQuery(document).ready(function (e) {
    jQuery("#call-us h3").click(function (e) {
        jQuery(".collap-area").slideToggle();
        jQuery(this).toggleClass('closed');
    });
    jQuery("#form_toggle").click(function (e) {
        jQuery(".overlay-form form").slideToggle();
        jQuery(this).toggleClass('closed');
    });
});
/****/
var fig_height = jQuery('.thing-to-do figure').height();
jQuery('.thing-to-do figcaption').css('min-height', fig_height);


/****/
jQuery("a#single").click(function(e) {
    jQuery("#single-area").slideToggle();
});
jQuery("a#close-this-area").click(function(e) {
    jQuery(this).parent().slideToggle();
});


if ($(window).width() < 767) {
    jQuery('.blog-list-wrap .blog-post').each(function () {
        var post_meta = jQuery(this).find('figcaption').find('.post-meta');
        jQuery(this).find('figure').detach().insertAfter(post_meta);
    });
    /****/
    jQuery('.offers-wrap .bh-offer').each(function () {
        var title = jQuery(this).find('aside').find('h3');
        var fig = jQuery(this).find('figure');
        jQuery(this).find('figure').detach().insertAfter(title);
        jQuery(this).find('.offer-price').detach().appendTo(fig);
    });
    /****/
    jQuery('#filter-hotels').click(function () {
        jQuery(this).toggleClass('open');
        jQuery('#hotels-filtered').slideToggle();
    });
    jQuery('#filter-by').click(function () {
        jQuery(this).toggleClass('open');
        jQuery('#toggle-filter').slideToggle();
    });
    /****/
    //var h_nav = jQuery(".hotels-subnav").detach();
    jQuery(".hotels-slider-form").find(".overlay-form").detach().prependTo("main").attr('id','hotels_slider');
    //h_nav.insertBefore(".hotels-hdr");
    jQuery(".hotels-sidebar-area .facilities-offered").detach().insertBefore(".hotels-main-area .hotel-info:first-child .columns");
    jQuery(".hotels-sidebar-area .hotel-location-map").detach().insertBefore(".hotels-main-area .hotel-info:first-child h3");

    /****/
    var roomsTitle = jQuery(".rooms-type-wrapper").prev("h2").text();
    jQuery(".room-types-page h1").attr("data-name","room_types").append(roomsTitle);


    var thingsTitle = jQuery(".things-to-do-wrapper").prev("h2").text();

    jQuery(".things-to-do-page h1").empty().append(thingsTitle);


    var wedding_title = jQuery(".wedding-page h1");
    var title_to_add = jQuery(".wedding-slider").prev("h2").text();
    wedding_title.empty().append(title_to_add).attr("id","wedding_title");


    /****/
    jQuery(".bp-chota-container .bp-confirmation-details .bp-details-right").detach().insertAfter(".bp-chota-container .bp-looking-forward");

    /****/

    var hotel_subnav = jQuery(".hotels-subnav");
    //var location_subnav = jQuery(".locations-subnav");
    //hotel_subnav.detach().insertAfter("#hotels_slider");
    //hotel_subnav.detach().insertBefore(location_subnav);

    var overview_subnav = jQuery(".hotels-subnav.overview-page");
    var placer = jQuery(".hotels-main-area").find("a.green-btn").first();
    //overview_subnav.detach().insertAfter(placer);

    /** remove all empty p tags **/
    jQuery('p').each(function() {
        var  p_tag =  jQuery(this);
        if(p_tag.html().replace(/\s|&nbsp;/g, '').length == 0)
            p_tag.remove();
    });


};
/****/
jQuery('.listing-details').each(function () {
    var more = jQuery(this).find('#more_info');
    var more_data = jQuery(this).find('.more-toggle-info');
    more.click(function () {
        more_data.slideToggle();
        jQuery(this).toggleClass('less');
    });
});
/****/
$(document).ready(function () {
    $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).siblings('.rr-accordion-group .panel-heading').addClass('open');
    });
    $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).siblings('.rr-accordion-group .panel-heading').removeClass('open');
    });
});

/****/
var width = jQuery(window).width();
var height = jQuery(window).height();
if (width <= 767) {
    jQuery('.room-and-rates-outer.rr-main-outer .bp-sidebar').each(function () {
        jQuery(this).insertBefore(jQuery(this).prev('.rr-left'));
    });
    /****/
    jQuery('.bp-sidebar').each(function () {
        jQuery(this).addClass('up');
    });
    /****/
    jQuery(".enhance-stay .rr-left .pull-right").detach().insertAfter(".bp-sidebar");

    jQuery(".bp-sidebar .booking-total").detach().insertAfter(".bp-sidebar .current-booking-info .booking-arrival-nights");

    jQuery(".cn-booking .bp-sidebar").detach().insertAfter(".cn-booking .payment-section");

    jQuery('.enhance-stay-opt-list article').each(function () {
        var room_info = jQuery(this).find(".opt-room-info").detach();
        var room_img = jQuery(this).find(".opt-room-img");
        var room_sel = jQuery(this).find(".opt-room-select");
        var room_price = jQuery(this).find(".opt-room-price");

        room_info.insertBefore(room_img);
        room_price.append(room_sel);
    });
}
/****/
jQuery(document).ready(function () {
    jQuery("h4.close-details").click(function () {
        jQuery(this).toggleClass("up-closed");
        jQuery(".current-booking-info").slideToggle();
    });
});
/****/
jQuery('.room-list article').each(function () {
    var more_khap = jQuery(this).find("span.khap");
    var more_data_khap = jQuery(this);
    more_khap.click(function () {
        jQuery(more_data_khap).toggleClass('selected');
    });
});
/****/
var tabwidth = jQuery(window).width();

if(tabwidth < 991){
    jQuery('figure.area-map').detach().prependTo('.themed-content');
};

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();

    /* Add carousel for the other hotels list */
    if ( $(".other-hotels-inner .other-hotel").length > 1 && jQuery(window).width() > 767 ) {
        $(".other-hotels-inner").slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            dots: true,
            lazyLoad: 'ondemand',
            slidesToScroll: 1,
            slidesToShow: 3
        });
    }

    /* Slick slider for hotels */
    $('.hotel_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        // lazyLoad: 'ondemand',
        asNavFor: '.hotel_slider_nav'
    });
    $('.hotel_slider_nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.hotel_slider',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        // lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /* PDF viewer */
    // $('a[href$=".pdf"]').each(function(){
    //
    //     // Get the PDF full URL
    //     var link = $(this);
    //     var url = link.attr('href');
    //
    //     // Remove the base url
    //     var websiteName = window.location.protocol + '//' + window.location.hostname;
    //     pdf_file = url.replace(websiteName, '');
    //
    //     // Change the URL for the viewer
    //     new_url = window.location.origin + '/pdf/index.html?file=' + pdf_file;
    //     link.attr('href', new_url);
    //     link.attr('data-path', url);
    //
    // });

});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});
