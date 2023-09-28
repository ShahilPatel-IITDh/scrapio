/**
 * @package Helix3 Framework
 * @template Shaper Empire
 * @author JoomShaper http://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2016 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */
jQuery(function ($) {

    $('#offcanvas-toggler').on('click', function (event) {
        event.preventDefault();
        $('body').addClass('offcanvas');
    });

    $('<div class="offcanvas-overlay"></div>').insertBefore('.body-innerwrapper > .offcanvas-menu');

    $('.close-offcanvas, .offcanvas-overlay').on('click', function (event) {
        event.preventDefault();
        $('body').removeClass('offcanvas');
    });

    var stopBubble = function (e) {
        e.stopPropagation();
        return true;
    };

    //Mega Menu
    $('.sp-megamenu-wrapper').parent().parent().css('position', 'static').parent().css('position', 'relative');
    $('.sp-menu-full').each(function () {
        $(this).parent().addClass('menu-justify');
    });

    //Sticky Menu
    $(document).ready(function () {
        $("body.sticky-header").find('#sp-header').sticky({topSpacing: 0})
    });

    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $(document).on('click', '.sp-rating .star', function (event) {
        event.preventDefault();

        var data = {
            'action': 'voting',
            'user_rating': $(this).data('number'),
            'id': $(this).closest('.post_rating').attr('id')
        };

        var request = {
            'option': 'com_ajax',
            'plugin': 'helix3',
            'data': data,
            'format': 'json'
        };

        $.ajax({
            type: 'POST',
            data: request,
            beforeSend: function () {
                $('.post_rating .ajax-loader').show();
            },
            success: function (response) {
                var data = $.parseJSON(response.data);

                $('.post_rating .ajax-loader').hide();

                if (data.status == 'invalid') {
                    $('.post_rating .voting-result').text('You have already rated this entry!').fadeIn('fast');
                } else if (data.status == 'false') {
                    $('.post_rating .voting-result').text('Somethings wrong here, try again!').fadeIn('fast');
                } else if (data.status == 'true') {
                    var rate = data.action;
                    $('.voting-symbol').find('.star').each(function (i) {
                        if (i < rate) {
                            $(".star").eq(-(i + 1)).addClass('active');
                        }
                    });

                    $('.post_rating .voting-result').text('Thank You!').fadeIn('fast');
                }

            },
            error: function () {
                $('.post_rating .ajax-loader').hide();
                $('.post_rating .voting-result').text('Failed to rate, try again!').fadeIn('fast');
            }
        });
    });

    // testimonial pro
    $('.sppb-testimonial-pro .sppb-item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        //next.children(':first-child').clone().appendTo($(this));

        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
        } else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });

    //Thumb Slider
    if ($('#carousel').is('.flexslider')) {

        // Thumb Gallery
        var $sppbTgOptions = $('.sppb-tg-slider');

        // Autoplay
        var $autoplay = $sppbTgOptions.data('sppb-tg-autoplay');
        //if ($autoplay == 'true') { var $autoplay = true; } else { var $autoplay = false};

        // arrows
        var $arrows = $sppbTgOptions.data('sppb-tg-arrows');
        //if ($arrows == 'true') { var $arrows = true; } else { var $arrows = false};

        $(window).load(function () {
            $('#carousel').flexslider({
                animation: 'slide',
                controlNav: true,
                directionNav: $arrows,
                animationLoop: false,
                slideshow: $autoplay,
                itemWidth: 320,
                itemMargin: 0,
                asNavFor: '#slider'
            });

            $('#slider').flexslider({
                animation: "fade",
                controlNav: false,
                directionNav: $arrows,
                animationLoop: false,
                slideshow: $autoplay,
                sync: "#carousel"
            });
        });

    }
    ; // END:: Thumb Slider


});