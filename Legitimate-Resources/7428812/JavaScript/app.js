'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var initialize = '';

(function ($) {
    "use strict";

    var _this = this;

    initialize = function initialize() {

        stm_unclickable();

        stm_switcher();
        stm_tabs();
        stm_sticky_footer();
        js_active_switch();
        js_active_trigger();
        stm_light_gallery();
        stm_share_url();
        stm_header_dropdown_mobile();
        stm_header_dropdown_vertical_nav();
        stm_header_dropdown_post_filter();
        stm_header_dropdown_socials();
        stm_select_style();
        rowExpand();
        stm_inputs_style();
        titleBoxExpand();
        closeMessageBox();
        stm_load_posts();
        stm_scroll_to();
        stm_datepicker();
        stm_timepicker();
        stm_mobileStickyHeader();
        stm_load_scripts();
        stm_image_placeholder();

        stm_scroll_top();
        stm_scroll_to_top();

        stm_post_thumbnail_before_content();
        stm_post_archive_sidebars();
        stm_post_video_hover();

        stm_envato_preview_control();

        set_fullwidth();
        stm_audio_modal();
        stm_stretch_column();
        stm_kenburns();
        productTabs();
    };

    $(document).ready(function () {

        initialize();
    });

    $(window).on('load', function () {
        stm_sticky_footer();
        stm_site_prealoder();
        titleBoxExpand();

        set_fullwidth();
        stm_hamburger();
    });

    $(window).on('resize', function () {
        stm_sticky_footer();
        titleBoxExpand();
        rowExpand();
        stm_mobileStickyHeader();
        stm_post_thumbnail_before_content();

        set_fullwidth();
    });

    $(window).on('scroll', function () {
        if ($(".pearl_arrow_top").length) {
            var trigger_height = $(window).scrollTop() + $(window).height() + $('.stm-footer').height();

            if (trigger_height > $(document).height()) {
                $(".pearl_arrow_top").addClass("arrowShow");
            }

            if ($(window).scrollTop() === 0) {
                $(".pearl_arrow_top").removeClass("arrowShow");
            }
        }
    });

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        stm_animate_block();
    } else {
        $(".stm_animation").css('opacity', 1);
    }

    jQuery(window).on('scroll', function () {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            stm_animate_block();
        } else {
            $(".stm_animation").css('opacity', 1);
        }
    });

    function stm_animate_block() {
        jQuery('.stm_animation').each(function () {
            if (jQuery(this).attr('data-animate')) {
                var animation_blocks = jQuery(this).children('*');
                var animationName = jQuery(this).attr('data-animate'),
                    animationDuration = jQuery(this).attr('data-animation-duration') + 's',
                    animationDelay = jQuery(this).attr('data-animation-delay');
                var style = 'opacity:1;-webkit-animation-delay:' + animationDelay + 's;-webkit-animation-duration:' + animationDuration + '; -moz-animation-delay:' + animationDelay + 's;-moz-animation-duration:' + animationDuration + '; animation-delay:' + animationDelay + 's;';
                var container_style = 'opacity:1;-webkit-transition-delay: ' + animationDelay + 's; -moz-transition-delay: ' + animationDelay + 's; transition-delay: ' + animationDelay + 's;';
                if (isAppear(jQuery(this))) {
                    jQuery(this).attr('style', container_style);
                    jQuery.each(animation_blocks, function (index, value) {
                        var existing_style = jQuery(this).attr('style');
                        var updated_style = style + existing_style;
                        jQuery(this).attr('style', updated_style);
                        jQuery(this).addClass('animated').addClass(animationName);
                    });
                }
            }
        });
    }
    function isAppear(id) {
        var window_scroll = jQuery(window).scrollTop();
        var window_height = jQuery(window).height();

        if (jQuery(id).hasClass('stm_viewport')) {
            var start_effect = jQuery(id).data('viewport_position');
        }

        if (typeof start_effect === 'undefined' || start_effect == '') {
            var percentage = 2;
        } else {
            var percentage = 100 - start_effect;
        }
        var element_top = jQuery(id).offset().top;
        var position = element_top - window_scroll;

        var cut = window_height - window_height * (percentage / 100);
        if (position <= cut) {
            return true;
        } else {
            return false;
        }
    }

    function set_fullwidth() {
        var width = $(window).width();
        var elements = ['.stm_slider_style_9 .owl-nav'];
        $.each(elements, function () {
            var $element = $(this);
            var stm_site_width_custom = $element.closest('.container').width();
            if ($element.length) {
                var offset = (width - stm_site_width_custom) / 2;
                $element.css('margin-left', '-' + offset + 'px');
                $element.width(width);
            }
        });
    }

    function stm_unclickable() {
        $('body').on('click', '.unclickable', function (e) {
            e.preventDefault();
        });
    }

    function stm_switcher() {
        $('.stm-switcher__trigger').on('click', function () {
            $(this).closest('.stm-switcher').find('.stm-switcher__list').toggleClass('active');
            $(this).toggleClass('active');
        });

        $('.stm-switcher__option').on('click', function () {
            var stm_switch = $(this).data('switch');

            $(this).closest('.stm-switcher').parent().find('.js-switcher').addClass('js-switcher__hidden');
            $(this).closest('.stm-switcher').parent().find('.js-switcher_' + stm_switch).removeClass('js-switcher__hidden');

            $(this).closest('.stm-switcher').find('.stm-switcher__text').text($(this).text());

            $(this).closest('.stm-switcher__list').removeClass('active');
            $(this).closest('.stm-switcher').find('.stm-switcher__trigger').removeClass('active');
        });
    }

    function stm_sticky_footer() {
        var windowH = $(window).height();
        var footerH = $('.stm-footer').outerHeight();

        if ($('#wpadminbar').length) {
            footerH += $('#wpadminbar').outerHeight();
        }

        $('#wrapper').css('min-height', windowH - footerH + 'px');
    }

    function stm_tabs() {

        $("ul.nav-tabs > li > a").on("click", function (e) {
            var id = $(this).attr("href").substr(1);
            window.location.hash = id;
        });

        var hash = window.location.hash;
        $('#products__tabs a[href="' + hash + '"]').tab('show');
    }

    function js_active_switch() {
        $('.js_active_switcher .js_active_switcher__a').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.js_active_switcher').find('.js_active_switcher__a').removeClass('active');
            $(this).addClass('active');
        });
    }

    function js_active_trigger() {
        var opened = false;
        var dataToggle = '';
        var $element = '';
        var $this = '';
        $('.js_trigger__click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            $this = $(this);

            dataToggle = $(this).attr('data-toggle');
            if (typeof dataToggle == 'undefined') dataToggle = true;

            $element = $(this).closest('.js_trigger').find('.js_trigger__unit');
            var element = $(this).attr('data-element');
            if (typeof element !== 'undefined') $element = $(element);

            if (dataToggle && dataToggle !== 'false') {
                $element.slideToggle('fast');
            } else {
                $element.toggleClass('active');
            }

            $(this).toggleClass('active');
            opened = $(this).hasClass('active') ? true : false;
            var view_ = $(this).attr('data-text-more');
            var close_ = $(this).attr('data-text-close');
            if (opened) {
                $(this).text(close_);
            } else {
                $(this).text(view_);
            }
        });
    }

    function stm_share_url() {
        $('.stm_js__shareble a').on('click', function (e) {
            e.preventDefault();
            var url = $(this).data('share');
            var social = $(this).data('social') + '_share';
            window.open(url, social, 'width=580,height=296');
        });
    }

    function stm_header_dropdown_mobile() {
        var windowW = $(window).width();

        $('.stm_mobile__switcher').on('each', function (e) {
            if ($(this).hasClass('active')) {
                $(this).parent().addClass('href_empty');
            }
        });

        $('.stm-header .stm-navigation__default li:not(.menu-item-has-children) a').on('click', function (e) {
            $('.stm-header__overlay').removeClass('active');
            $('.stm_mobile__header').removeClass('active');
            $('.stm_mobile__switcher').removeClass('active');
            $('.stm-header').removeClass('active');
            $('body').removeClass('active');
        });

        $('.stm-navigation li.menu-item-has-children > a').each(function () {
            var href = $(this).attr("href");
            if (href == "#") {
                $(this).parent().addClass('href_empty');
            }

            $(this).append('<span class="stm_mobile__dropdown"></span>');
        });

        $('.stm-navigation_hamburger_full li.menu-item-has-children > a > .stm_mobile__dropdown').each(function () {
            $(this).remove();
            $('body').addClass('hamburger_full');
        });

        $('.stm-navigation_hamburger_full').find('.href_empty>a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var dd = $(this);
            dd.closest('li').toggleClass('active');
            if (dd.parents('.navigation_hamburger_full').length === 0 || window.innerWidth < 1024) {
                dd.closest('li').children('.sub-menu').toggle();
            }
        });

        $('body').find('.stm_mobile__dropdown').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var dd = $(this);
            dd.closest('li').toggleClass('active');
        });

        if (typeof $.fn.swipe === 'function' && windowW < 992) {
            $(".stm-header").swipe({
                swipe: function swipe(event, direction, distance, duration, fingerCount, fingerData) {
                    if (direction == 'left' && distance > 50) {
                        $('.stm-header').removeClass('active');
                        $('.stm-header__overlay').removeClass('active');
                        $('.stm_mobile__header').removeClass('active');
                        $('.stm_mobile__switcher').removeClass('active');
                    }
                },
                allowPageScroll: "vertical"
            });
        }

        $('.stm-header__overlay').on('click', function () {
            $(this).removeClass('active');
            $('.stm_mobile__header').removeClass('active');
            $('.stm_mobile__switcher').removeClass('active');
            $('.stm-header').removeClass('active');
            $('body').removeClass('active');
        });
    }

    function stm_header_dropdown_vertical_nav() {
        $('.stm-header .stm-navigation__vertical_left li.menu-item-has-children').on('click', function (e) {
            if (!$(this).hasClass('active')) {
                $('.stm-header .stm-navigation__vertical_left li.menu-item-has-children.active').removeClass('active');
                $(this).addClass('active');
            } else {
                $('.stm-header .stm-navigation__vertical_left li.menu-item-has-children.active').removeClass('active');
            }
        });
        $('.stm-header .stm-navigation__vertical_left .stm_mobile__switcher').on('click', function (e) {
            $('.stm-navigation__vertical').toggleClass('active');
        });
    }

    function stm_header_dropdown_post_filter() {
        $('.stm-header .stm-post-filter .stm_mobile__switcher').on('click', function () {
            $('.stm-header .stm-socials-hidden').removeClass('active');
            $(this).parents().find('.post-filter').each(function () {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });
        });
    }

    function stm_header_dropdown_socials() {
        $('.stm-header .stm-socials-hidden .stm-socials-btn').on('click', function () {
            $('.stm-header .post-filter').removeClass('active');
            $('.stm-header .stm_mobile__switcher').removeClass('active');
            $(this).parents().find('.stm-socials-hidden').each(function () {
                if ($(this).hasClass('active')) {
                    $('.stm-socials-btn').removeClass('active');
                    $(this).removeClass('active');
                } else {
                    $('.stm-socials-btn').addClass('active');
                    $(this).addClass('active');
                }
            });
        });
    }

    function stm_site_prealoder() {
        if ($('html').hasClass('stm-site-loader')) {
            $('html').addClass('loaded');

            var prevent = false;
            $('a[href^=mailto], a[href^=skype], a[href^=tel]').on('click', function (e) {
                prevent = true;
                $('html').addClass('loaded');
            });

            $(window).on('beforeunload', function (e, k) {
                if (!prevent) {
                    $('html').removeClass('loaded');
                } else {
                    prevent = false;
                }
            });
        }
    }

    function productTabs() {
        $('#products__tab .mobile_tab a').on('click', function (e) {
            var target = $(this).attr("href");
            $('body, html').css('transition-delay', '0s');
            setTimeout(function () {
                $('body, html').animate({
                    scrollTop: $(target).offset().top
                }, 100);
            }, 10);
        });
    }

    function titleBoxExpand() {
        var box = $('.stm_titlebox');
        var container = box.parents('.container');

        if (box.length === 0 || container.length === 0) {
            return;
        }

        var ww = $(document).width() - stm_site_paddings * 2;
        var w = container.width();
        var offset = (ww - w) * 0.5;

        box.css({
            width: ww,
            'margin-left': '-' + offset + 'px'
        });
    }

    var rowExpand = function rowExpand() {

        var sidebarEnabled = $('.site-content .stm_markup__sidebar').length > 0;
        var forceContainer = $('.site-content .vc_container-fluid-force').length > 0;

        if (sidebarEnabled && !forceContainer) {
            return;
        }


        $('.stm_markup__content .vc_container-fluid, .vc_container-fluid-force').each(function () {

            var row = $(this);
            var container = row.parents('.container');
            if (row.length === 0 || container.length === 0) {
                return;
            }

            var ww = $(document).width() - stm_site_paddings * 2;
            var w = container.width();

            var margin = $(this).attr('data-margin');
            if (typeof margin === 'undefined') margin = 0;

            var offset = (ww - w) * 0.5 - margin;

            row.css({
                width: ww - margin * 2,
                'margin-left': '-' + offset + 'px'
            });

            var position = $(this).offset().left;
            if (position != stm_site_paddings && stm_site_paddings > position) {
                offset = offset - (stm_site_paddings - position);
                row.css({
                    'margin-left': '-' + offset + 'px'
                });
            }
        });
    };

    function closeMessageBox() {
        $('body').on('click', '.vc_message_box .close', function (e) {
            e.preventDefault();
            var messageBox = $(this).parents('.vc_message_box');
            messageBox.fadeOut(300, function () {
                $(this).remove();
            });
        });
    }

    $.fn.is_on_screen = function () {
        var win = $(window);
        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
    };

    var stm_select_style = function stm_select_style() {
        var select = $('select').not('.no_wrap, [multiple], [data-attribute_name], .woocommerce select, [data-field-id]');

        select.each(function () {
            var select = $(this);

            var options = select.find('option');
            var values = [];
            options.each(function (v, k) {
                values.push($(k).text());
            });
            var choicesList = '<ul class="stm_select__dropdown">';
            values.forEach(function (v) {
                choicesList += '<li><span>' + v + '</span></li>';
            });
            choicesList += '</ul>';
            var wrapperStructure = '<div class="stm_select"></div>';
            var wrapper = select.wrap(wrapperStructure).parent();
            var selectVal = $('<span class="stm-select__val"></span>').appendTo(wrapper);
            choicesList = $(choicesList).appendTo(wrapper);
            choicesList.find('li').on('click', function (e) {
                e.stopPropagation();
                var choice = $(this).text();
                selectVal.text(choice);
                select.val(choice);
                select.find('option').remove();
                select.append('<option value="' + choice + '" selected>');
                select.trigger('change');
                wrapper.removeClass('open');
            });

            $('.stm-select__val').on('click', function (el) {
                el.stopPropagation();
                $(this).find('option').remove();
                $(this).closest('.stm_select').addClass('open');
            });
            $('body').on('click', function (e) {
                wrapper.removeClass('open');
            });
            selectVal.text(select.find('option:selected').text());
        });
    };

    var stm_inputs_style = function stm_inputs_style() {

        var inputs = $('input[type="checkbox"], input[type="radio"]').filter(function () {
            return !$(_this).hasClass('no_wrap') && $(_this).closest('.ipt_fsqm_form').length == 0 && $(_this).closest('.rpress-section').length != 0;
        });
        inputs.each(function () {
            var input = $(this);
            var type = input[0].type;
            var wrapperStructure = '<div class="stm_input_wrapper ' + 'stm_input_wrapper_' + type + '"></div>';
            input.wrapAll(wrapperStructure);
        });

        inputs.each(function () {
            if ($(this).is(':checked')) {
                $(this).parent().addClass('active');
            }
        });

        $(document).on('change', inputs, function (e) {
            var $this = $(e.target);
            var type = $this[0].type;
            var $wrapper = $this.closest('.stm_input_wrapper');
            if ($this.is(':checked')) {
                $wrapper.addClass('active');
                if (type === 'radio') {
                    $('[name="' + $this[0].name + '"]').not($this).each(function () {
                        $(this).parents('.stm_input_wrapper').removeClass('active');
                    });
                    $wrapper.siblings().removeClass('active');
                }
            } else {
                $wrapper.removeClass('active');
            }
        });
    };

    function stm_stretch_column() {
        $('.wpb_column[data-stretch]').each(function () {
            var el = $(this);
            var stretch = el.data('stretch');
            var stretchContent = el.data('stretch-content');
            var xPos = el.offset().left;
            var wW = $(window).width();
            var xW = el.width();
            var wrapper = el.find('.wpb_wrapper').first();
            var container = el.parents('.container, .vc_container');
            var col = el.find('.vc_column-inner').first();
            var colLeftOffset = el.offset().left;
            if (stretch === 'left') {
                wrapper.css({
                    'margin-left': 'auto'
                });
                col.css({
                    'width': el.width() + colLeftOffset + 'px',
                    'margin-left': '-' + colLeftOffset + 'px'
                });
            } else {
                var margin = window.innerWidth - colLeftOffset - el.width();
                col.css({
                    'width': window.innerWidth - colLeftOffset + 'px',
                    'margin-right': '-' + margin + 'px'
                });
            }

            if (stretchContent !== true) {
                wrapper.css('width', el.width() - 30 + 'px');
            }

            if (stm_check_mobile() || window.innerWidth <= 1024) {
                col.css({
                    'width': window.innerWidth + 'px',
                    'margin-left': '-' + (window.innerWidth - col.outerWidth()) + 'px'
                });
            }
        });
    }

    function stm_load_posts() {
        $('body').on('click', '.stm_load_posts', function (e) {
            e.preventDefault();

            $.ajax({
                url: stm_ajaxurl,
                dataType: 'json',
                context: this,
                data: {
                    'page': $(this).attr('data-page'),
                    'per_page': $(this).attr('data-per_page'),
                    'style': $(this).attr('data-style'),
                    'view': $(this).attr('data-view'),
                    'past': $(this).attr('data-past'),
                    'upcoming': $(this).attr('data-upcoming'),
                    'post_type': $(this).attr('data-post_type'),
                    'action': 'pearl_load_more_posts',
                    'security': pearl_load_more_posts
                },
                beforeSend: function beforeSend() {
                    $(this).addClass('loading');
                },
                complete: function complete(data) {
                    $(this).removeClass('loading');
                    var dt = data.responseJSON;
                    var $items = $(dt.content);

                    var contentWrapper = $($(this).attr('data-element'));
                    contentWrapper.append($items);

                    if (dt.page) {
                        $(this).attr('data-page', dt.page);
                    } else {
                        $(this).remove();
                    }
                }
            });
        });
    }

    function stm_scroll_to() {
        var $anchor_selector = $('a[href*="#"]:not(.no_scroll):not(.vc_carousel-control)');
        if ($anchor_selector.length) {

            $anchor_selector.on('click', function (e) {
                var href = $(this).attr('href');
                var animationTime = 1000;
                if ($(this).parent().hasClass('mobile_tab')) {
                    animationTime = 50;
                }
                var hash_index = href.indexOf("#");
                if (hash_index != -1) {
                    if (href.length === 1) e.preventDefault();

                    var vc = $(this).attr('data-vc-container');
                    if (!vc) {
                        var hash = href.substring(hash_index + 1);
                        var $element = $('#' + hash);

                        if ($(this).hasClass('self_scroll')) {
                            $element = $(this);
                        }

                        if ($element.length) {
                            e.preventDefault();

                            var frame_height = 54;
                            var header_height = $('.stm-header').height();

                            var scrollValue = $element.offset().top;

                            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                                if ($('body').hasClass('envato-preview-visible')) {
                                    scrollValue -= frame_height;
                                } else if ($('body').hasClass('stm_header_sticky_center')) {
                                    scrollValue -= header_height;
                                }

                                if ($('body').hasClass('stm_header_sticky_center') & $('body').hasClass('envato-preview-visible')) {
                                    scrollValue -= header_height;
                                }
                            }

                            $('html, body').animate({
                                scrollTop: scrollValue
                            }, animationTime);
                        }
                    }
                }
            });
        }
    }

    function stm_datepicker() {
        var $datepicker = $('.stm_datepicker');
        if (typeof $.fn.datepicker === 'function' && $datepicker.length) {
            $datepicker.datepicker({
                dateFormat: stm_date_format,
                beforeShow: function beforeShow(input, inst) {
                    var inputField = inst.input;
                    var inputWidth = inputField.outerWidth();
                    var calendar = inst.dpDiv;

                    if (inputWidth > 170) {
                        setTimeout(function () {
                            calendar.css({ 'width': inputWidth + 'px' });
                        }, 10);
                    }
                }
            });
        }
    }

    function stm_timepicker() {
        var $timepicker = $('.stm_timepicker');
        if (_typeof($.fn.timepicker) && $timepicker.length) {
            $timepicker.timepicker({
                timeFormat: stm_time_format
            });
        }
    }

    var stm_mobileStickyHeader = function stm_mobileStickyHeader() {
        var headerPlaceholder = $('.stm_sticky_header_placeholder');

        if (headerPlaceholder.length > 0 && window.innerWidth > 550) {
            headerPlaceholder.remove();
        }
        if (!$('body').hasClass('stm_sticky_header_mobile') || window.innerWidth > 550) {
            return;
        }

        var mobileHeader = $('.stm_mobile__header');
        var headerHeight = mobileHeader.outerHeight();

        if (headerPlaceholder.length === 0) {
            var holder = $('<div class="stm_sticky_header_placeholder"></div>').prependTo('#wrapper').css({ 'height': headerHeight });
        }


        var to = null;
        var lastScroll = 0;
        $(window).on('scroll', function (e) {

            var scroll = $(this).scrollTop();
            if (scroll > lastScroll && scroll > headerHeight + 200) {
                mobileHeader.css({
                    'transform': 'translateY(-100%)'
                });
            } else {
                mobileHeader.css({
                    'transform': 'translateY(0)'
                });
            }

            lastScroll = scroll;
        });
    };

    function stm_load_scripts() {
        $('script[data-src]').each(function () {
            $(this).attr('src', $(this).data('src'));
        });
    }

    function stm_image_placeholder() {
        var deferImage = function deferImage(element) {
            var i, len, attr;
            var img = new Image();
            var placehold = element.children[0];

            element.className += ' is-loading';

            img.onload = function () {
                element.className = element.className.replace('is-loading', 'is-loaded');
                element.replaceChild(img, placehold);
            };

            for (i = 0, len = placehold.attributes.length; i < len; i++) {
                attr = placehold.attributes[i];
                if (attr.name.match(/^data-/)) {
                    img.setAttribute(attr.name.replace('data-', ''), attr.value);
                }
            }
        };
    }

    function stm_scroll_top() {
        $("a[href='#top']").on('click', function () {
            $("html, body").animate({ scrollTop: 0 }, 300);
            return false;
        });
    }

    function stm_scroll_to_top() {
        $(".pearl_arrow_top").on("click", function () {
            var scroll_pos = 0;
            $('html, body').animate({ scrollTop: scroll_pos }, '5000', function () {
                $(".arrow_top").removeClass("arrowShow");
            });
        });
    }

    function stm_post_thumbnail_before_content() {
        $('.stm_single_post_layout_18').each(function () {
            var height = $(this).find('.post_thumbnail').height();
            $(this).css('padding-top', height);
        });
    }

    function stm_post_archive_sidebars() {
        $('.stm_layout_viral.blog.stm_post_view_grid .stm_markup_left .stm_markup__sidebar_archive').insertBefore('.stm_layout_viral.blog.stm_post_view_grid .site-content .stm_markup__content');
        $('.stm_layout_viral.blog.stm_post_view_grid .stm_markup_right .stm_markup__sidebar_archive').insertBefore('.stm_layout_viral.blog.stm_post_view_grid .site-content .stm_markup__content');
        $('.stm_layout_viral.archive.stm_post_view_grid .stm_markup_left .stm_markup__sidebar_archive').insertBefore('.stm_layout_viral.archive.stm_post_view_grid .site-content .stm_markup__content');
        $('.stm_layout_viral.archive.stm_post_view_grid .stm_markup_right .stm_markup__sidebar_archive').insertBefore('.stm_layout_viral.archive.stm_post_view_grid .site-content .stm_markup__content');
        $('.stm_layout_viral.search.stm_post_view_grid .stm_markup_left .stm_markup__sidebar_archive').insertBefore('.stm_layout_viral.search.stm_post_view_grid .site-content .stm_markup__content');
        $('.stm_layout_viral.search.stm_post_view_grid .stm_markup_right .stm_markup__sidebar_archive').insertBefore('.stm_layout_viral.search.stm_post_view_grid .site-content .stm_markup__content');
    }

    function stm_post_video_hover() {
        $(".post_video .stc_h").on('mouseenter', function () {
            $(this).parents('.post_video').find('.stc_h').addClass('stc');
        });
        $(".post_video .stc_h").on('mouseleave', function () {
            $(this).parents('.post_video').find('.stc_h').removeClass('stc');
        });
    }

    function stm_envato_preview_control() {
        var preview = $('.pearl-envato-preview');

        $('.preview__action--close').on('click', function () {
            $('.pearl-envato-preview').slideUp();
            $('.pearl-envato-preview-holder').slideUp();
            $('body').removeClass('envato-preview-visible');
        });

        if (preview.length) {
        }
    }

    function stm_audio_modal() {
        var modal = $('.stm_audio_modal');
        if (modal.length === 0) return;

        modal.each(function () {
            var modal = moveModal($(this));
            var audio = modal.find('audio')[0];
            modal.on('show.bs.modal', function () {
                audio.play();
            });

            modal.on('hide.bs.modal', function () {
                audio.pause();
            });
        });
    }

    var stm_kenburns = function stm_kenburns() {
        var rows = $('[data-stm-kenburns]');

        rows.each(function () {
            var el = $(this);
            var kenBurnsHtml = '<div class="stm_kenburns"><div class="stm_kenburns__image"></div></div>';
            if (el.data('stm-kenburns') === 'enable') {
                var parentContainer = el.parents('[class*="vc_container"]');
                var bgi = parentContainer.css('background-image');
                parentContainer.attr('style', parentContainer.attr('style') + ';' + 'background-image: none !important');
                var kenBurnsEl = $(kenBurnsHtml).appendTo(parentContainer);
                var kenBurnsImage = kenBurnsEl.find('.stm_kenburns__image');
                kenBurnsImage.css('background-image', bgi);
            }
        });
    };

    var stm_hamburger = function stm_hamburger() {
        var menu = $('.stm-navigation__hamburger > ul');
        var menuItem = menu.find('li.menu-item-has-children');
    };
})(jQuery);

function initGoogleScripts() {
    var stmGmap = new CustomEvent("stm_gmap_api_loaded");
    document.body.dispatchEvent(stmGmap);
    if (typeof stm_init_map_barba !== 'undefined') window.stm_init_map_barba();
}

function stmOffsetCenter(map, latlng, offsetx, offsety) {

    var scale = Math.pow(2, map.getZoom());

    var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
    var pixelOffset = new google.maps.Point(offsetx / scale || 0, offsety / scale || 0);

    var worldCoordinateNewCenter = new google.maps.Point(worldCoordinateCenter.x - pixelOffset.x, worldCoordinateCenter.y + pixelOffset.y);

    var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

    map.setCenter(newCenter);
}

var uniqid = function uniqid() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function stm_light_gallery() {
    var reinit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var $ = jQuery;
    if (typeof $.fn.lightGallery === 'function') {

        var galleries = $('.stm_lightgallery');

        galleries.each(function () {
            var gallery = $(this);

            if (reinit) {
                try {
                    gallery.data('lightGallery').destroy(true);
                } catch (e) {
                    console.log(e.message);
                }
            }
            gallery.lightGallery({
                'selector': '.stm_lightgallery__selector'
            });
        });

        $('.stm_lightgallery__iframe').lightGallery({
            selector: 'this',
            iframeMaxWidth: '70%'
        });
    }
}

var StmInfoBox = function () {
    function StmInfoBox(options, container) {
        _classCallCheck(this, StmInfoBox);

        var $ = jQuery;

        this.container = $(container);
        this.box = '.stm_infobox';

        this.init(options);
        this.parseStyle();
    }

    _createClass(StmInfoBox, [{
        key: 'init',
        value: function init(options) {
            this.content = options.content || '';
            this.maxWidth = options.maxWidth || 200;
            this.pixelOffset = options.pixelOffset || [0, 0];
            this.zIndex = options.zIndex || 0;
            this.boxStyle = options.boxStyle || {};
            this.style = '';
        }
    }, {
        key: 'parseStyle',
        value: function parseStyle() {
            var $ = jQuery;
            var style = '';
            style += 'zindex: ' + this.zIndex + ';';
            style += 'left: ' + this.pixelOffset[0] + ';';
            style += 'top: ' + this.pixelOffset[1] + ';';
            style += 'maxWidth: ' + this.maxWidth + 'px;';

            if (Object.keys(this.boxStyle).length > 0) {
                for (var rule in this.boxStyle) {
                    style += rule + ' : ' + this.boxStyle[rule] + ';';
                }
            }

            this.style = style;
        }
    }, {
        key: 'open',
        value: function open() {
            var html = '<div class="stm_infobox">' + '<div class="stm_infobox__content">' + this.content + '</div>' + '</div>';
            if (this.container.find('.stm_infobox').length === 0 && this.content.length !== 0) {
                this.container.append(html);
            }
        }
    }, {
        key: 'close',
        value: function close() {
            if (this.container.find('.stm_infobox').length > 0) {
                this.container.find('.stm_infobox').remove();
            }
        }
    }]);

    return StmInfoBox;
}();

function stm_check_mobile() {
    "use strict";

    var isMobile = false; 
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
    return isMobile;
}

function createCookie(name, value, days) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function moveModal(el) {
    var newEl = el.clone(true, true);
    el.remove();
    newEl.appendTo('body');
    return newEl;
}

function isNumeric(value) {
    return value == Number(value) ? "number" : "string";
}

(function ($) {
    var action = '';
    $.ajaxSetup({
        beforeSend: function beforeSend(jqXHR, settings) {
            if (settings["data"]) {
                if (settings["data"].toString().indexOf("nf_ajax_submit") >= 0) return 0;
            }
            if (settings.data && $('body').hasClass('rpress') && $("#rpressModal").length) {
                var q = JSON.parse('{"' + decodeURI(settings.data.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
                if (q.action && q.action === "rpress_edit_cart_fooditem") {
                    action = 'rpress_edit_cart_fooditem';
                }
            }
        },
        complete: function complete(data) {
            if (action == 'rpress_edit_cart_fooditem') {
                var r = JSON.parse(data.responseText);

                var qty = $(document).find('#rpressModal').find('.qty').val();
                if (qty && r.data && r.data.price_raw) {
                    var price = r.data.price_raw;
                    var total_price = price * qty;

                    if (rp_scripts && rp_scripts.currency_sign) {
                        $(document).find('#rpressModal').find('.cart-item-price').html(rp_scripts.currency_sign + total_price.toFixed(2));
                    }
                    $(document).find('#rpressModal').find('.cart-item-price').attr('data-current', price);
                    $(document).find('#rpressModal').find('.cart-item-price').attr('data-price', price);
                }
            }
        }
    });
})(jQuery);

function findTable(widget_id) {
    var rid = document.getElementById('rid-' + widget_id).value.replace(/[^0-9]/g, '');
    var restref = document.getElementById('restref-' + widget_id).value.replace(/[^0-9]/g, '');
    var partysize = document.getElementById('partysize-' + widget_id).value.replace(/[^0-9]/g, '');
    var date = document.getElementById('date-' + widget_id).value;
    var time = document.getElementById('time-' + widget_id).value.replace(/[^:0-9]/gim, '');
    var newtime = '';

    if (time.replace(/[^a-zа-яё]/gi, '') == 'pm') {
        newtime = Number(time.substr(0, time.indexOf(':'))) + 12;
    } else {
        if (time.indexOf(':') < 2) {
            newtime = '0' + time.substr(0, time.indexOf(':'));
        } else {
            newtime = time.substr(0, time.indexOf(':'));
        }
    }
    time = newtime + ":" + time.substr(time.indexOf(':') + 1);

    var request = '?rid=' + rid + '&restref=' + restref + "&partysize=" + partysize + "&datetime=" + date + "T" + time;
    window.open('//opentable.com/restref/client/' + request);
}

jQuery(window).load(function () {
    var $ = jQuery;
    if (!stm_check_mobile()) {
        $('.stm_markup__sidebar-sticky .sidebar_inner').stick_in_parent({
            parent: '.stm_markup'
        });
    }
});