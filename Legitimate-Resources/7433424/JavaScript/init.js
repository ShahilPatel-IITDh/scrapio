"use strict";
var BSI = BSI || {};

BSI.init = function () {

    $.root = $(document.body);

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [
            220,
            901
        ]
    });
    $(window).bind('enterBreakpoint220', function () {
        BSI.collapseMenu();
        BSI.collapseSubMenu
        BSI.collapseSearchFilters();
        BSI.responsiveImages('small');
    });

    $(window).bind('exitBreakpoint901', function () {
        BSI.responsiveImages('small');
    });

    $(window).bind('enterBreakpoint901', function () {

        BSI.unCollapseMenu();
        BSI.unCollapseSubMenu
        BSI.unCollapseSearchFilters();
        BSI.responsiveImages('large');
        SFR.Utils.clearOddFloaters('.standards-list');
        SFR.Utils.clearOddFloaters('.resources ul');

    });

    SFR.Utils.scaleFix();
    SFR.Utils.niceUpInPageNav('.local');

    if ($.root.find('.drop-down').length) {
        BSI.accessifyDropDownLists();
    }
    if ($.root.find('.drop-down').length) {
        BSI.accessifySubMenuDropDownLists();
    }
    if ($.root.find('.main-nav-item').length) {
        BSI.accessifyMenu();
    }
    if ($.root.find('.sub-menu-nav-item').length) {
        BSI.accessifySubMenu();
    }

    SFR.Utils.setUpCollapsibles();
    BSI.setUpNameInputs();
    BSI.setupMenuToggle();
    BSI.setupSubMenuToggle();
    BSI.setupSubSubMenuToggle();
    BSI.setupAutocompleteSearch();
    BSI.setUpTelephoneLinks();
    BSI.subMenuCollapseAndExpandForMobileDevice();

    var breakpoint = 900;
    window.onresize = function (event) {
        if (window.innerWidth >= breakpoint) {
            BSI.hideSubMenu();
        }
    };

    window.onresize = function (event) {
        if (window.innerWidth >= breakpoint) {
            BSI.hideSubSubMenu();
        }
    };

    if ($.root.find('.pcode-lookup').length) {
        BSI.setUpPcodeLookup('/data/pcode_results.json', 'json');
    }
    if ($.root.find('.address-fields').length) {
        BSI.setUpAddressFields('.address-fields');
    }

    BSI.setupSelectBoxes();

    BSI.setupFormValidation();

    BSI.setupCustomCheckboxes();

    BSI.responsiveTables();

    BSI.trainingResults();

    $.root.find('.breakpoint-901 .courses-list .l-grid-2').equalHeight();

    $(window).bind('enterBreakpoint901', function (e) {
        $(this).unbind(e);
        post_breakpoint_init();
    });

    $(window).bind('enterBreakpoint220', function (e) {
        $(this).unbind(e);
        post_breakpoint_init();
    });

    function post_breakpoint_init() {

        BSI.initialiseSlideshows();

        BSI.setupTabs();

        if (window.location.hostname != 'www.bsi-supplychainsolutions.com') {
            BSI.setupCountrySelector();
        }

        BSI.setUpSearchFilters();
    }

    $(function () {

        $(".main-nav-item").on('click', function (event) {            
            var $clicked = $(this);
            if (screen.width < 901) {
                $clicked.find(".sub-nav").css('display', 'block');
            }            
            var headerTitle = $clicked.children(".main-nav-link").text();
            $(".header-slide label").html(headerTitle);
            $(".main-nav-container .main-nav-item .sub-nav").addClass('menu-aligns');
            $('body').trigger('click');
        });

        $(".close-x, .back").click(function (event) {
            event.stopPropagation();  // do not forget this
            $(".utility-nav-header").css("overflow", "hidden");
            $(this).closest("#country-selector").hide();
            $(this).closest(".country-selector").hide();
            $(this).closest(".sub-nav").attr("style", "display: none");
            $('.localisation-links .country-nav-item').removeClass('active');
            $('body').trigger('click');
        });

    });


    $(document).ready(function () {
        $(".checkbox-replaced").click(function () {
            $('#SearchForm').submit();
        });
        $(".select-box-container").on("click", function () {
            $('#ddlTopicMobile').hide();
        });
        $(".filter-cancel-bt").on("click", function () {
            $('#ddlTopicMobile').show();
        });

        if (screen.width < 901) {
            var elemHeight = $(".bsi-hero-title").height();
            elemHeight = elemHeight + 285;
            $(".bsi-single-hero").height(elemHeight);
        }

        if (screen.width < 901) {
            var elemHeight = $(".bsi-single-hero.heroblock-grey-bg-layout").height();
            elemHeight = elemHeight + 95;
            $(".bsi-single-hero.heroblock-grey-bg-layout").height(elemHeight);
        }

        if (screen.width < 901) {
            var elemHeight2 = $(".ef-banner .page-title.seo-title").height();
            elemHeight2 = elemHeight2 + 40;
            $(".ef-banner").height(elemHeight2);
        }

    });    

};

$(function () { BSI.init(); });

$(function () {

    function scrollHeaderfun(flag) {
        if ($('#country-selector-dialog').css('display') === 'none' && flag === 0) {
            if ($(window).width() > 900) {
                var $height = $(window).scrollTop();
                if ($height > 40) {
                    if (!$('.header-parent-container').is('.scroll-header-bar2')) {
                        $('.headerMenuItems').css('display', 'none');
                        $(".header-parent-container").addClass("scroll-header-bar2");
                    }
                } else {
                    $(".header-parent-container").removeClass("scroll-header-bar2");
                    $('.headerMenuItems').css('display', 'block');
                }
                return false;
            }
        }
    }
    function scrollAnchorfun() {
        var anchorLinks = $('.anchor-links-panel')[0];
        var tabSelector = $('.anchor-links-panel-list-item.selector');
        var overlay = $('.search-filter-tabs-overlay');
        if (anchorLinks.getBoundingClientRect().top < 0) {
            $(anchorLinks).addClass('fixed');
        }

        if ($(document).scrollTop() <= anchorLinks.getBoundingClientRect().top) {
            $(anchorLinks).removeClass('fixed');
            overlay.removeClass('active');
            tabSelector.removeClass('open');
        }
        var anchorArray = [];
        $('.anchor-links-panel-list li').each(function () {
            var anchorID = $(this).attr('id');
            anchorArray.push(anchorID);
        });
        for (var i = 1; i < anchorArray.length; i++) {

            $('.anchor-links-panel-list-item').removeClass('active');
            if (screen.width < 901) {
                if ($('#' + (anchorArray[i]).substring(1)).isInViewport()) {
                    $("#" + anchorArray[i]).addClass("active");
                    overlay.removeClass('active');
                    tabSelector.removeClass('open').find('a').text($("#" + anchorArray[i]).find('a').text());
                    break;
                }
            }
            else {

                if ($('#' + (anchorArray[i]).substring(1)).isInViewport()) {

                    $("#" + anchorArray[i]).addClass("active");
                    break;

                }
            }

        }


    }

    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        if (screen.width > 900) {
            var viewportTop = $(window).scrollTop() + $('.anchor-links-panel').outerHeight();
            var viewportBottom = viewportTop + $(window).height();
            return elementBottom - 130 > viewportTop && elementTop + $(".anchor-links-panel").outerHeight() < viewportBottom;
        }
        else {
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
                        if (document.querySelector('.bsi-single-hero') !== null) {
                return elementBottom > viewportTop + $(this).outerHeight() && elementTop < viewportBottom;
            }
            return elementBottom > viewportTop + $(this).outerHeight()-60 && elementTop < viewportBottom;

        }

    };


    function animation() {

        $('.trending-animate').addClass('animate-active', { duration: 1000 });

    }

    function animationBanner() {
        if (screen.width < 901) {
            $('.bsi-hero .bsi-hero-image img.bsi-hero-background').hide().fadeIn(1000).delay(200);
            $('.bsi-hero .bsi-hero-overlay-small').animate({ top: '30%' }, { duration: 1500 });
            $('.bsi-hero .bsi-hero-title').animate({ left: '0%', opacity: '1' }, { duration: 2000 });
            return false;
        }
        else {
            var pageURL = window.location.href;
            if (pageURL.toLowerCase().indexOf("ar-ae") !== -1) {
                $('.bsi-hero .bsi-hero-overlay-large').animate({ right: '0px' }, { duration: 2000 });
                $('.bsi-hero .bsi-hero-title').animate({ top: '44%', opacity: '1' }, { duration: 2000 });
                $('.wrapper.wrapper-fluid .bsi-hero .bsi-hero-title.no-class').animate({ top: '-63px', opacity: '1' }, { duration: 2000 });
            }
            else {
                $('.bsi-hero .bsi-hero-overlay-large').animate({ left: '0px' }, { duration: 2000 });
                $('.bsi-hero .bsi-hero-title').animate({ top: '44%', opacity: '1' }, { duration: 2000 });
                $('.wrapper.wrapper-fluid .bsi-hero .bsi-hero-title .no-class').animate({ top: '44%', opacity: '1' }, { duration: 2000 });
            }
            return false;
        }
    }


    $(document).ready(function () {

        animationBanner();
    });

    $(window).on("load resize", function () {
        scrollHeaderfun(0);
        if (document.querySelector('.anchor-links-panel') !== null) {
            scrollAnchorfun();
        }
        animation();

    });

    $(window).on("scroll", function () {
        var $height = $(window).scrollTop();
        var flag;

        flag = 0;

        scrollHeaderfun(flag);
        if (document.querySelector('.anchor-links-panel') !== null) {
            scrollAnchorfun();
        }
    });

    $(document).ready(searchToggle768);
    $(document).ready(searchToggle767);
    $(document).ready(searchToggleAuto);
    $(window).resize(searchToggleAuto);
    function searchToggleAuto() {
        $(document).ready(function () {
            if (Modernizr.mq('(min-width: 901px)')) {
                $("div#search-toggle-icon").show();
                $("#searchform-wrapper").hide();
                $("#horizontal").show();
            }
        });
    }

    function searchToggle768() {
        if (Modernizr.mq('(min-width: 901px)')) {
            $('div#search-toggle-icon .bt').click(function () {
                if ($("#searchform-wrapper").show()) {
                    $("#horizontal").hide();
                    //$('#bsiMaincontainer').removeClass('container-map');
                    //$('#container2').removeClass('container2');
                    $('.header-wrapper-container').addClass('search-faded');
					$('.container2').addClass('body-faded');
                    $('#MainContentArea').addClass('body-faded');
                    $('.header-parent-container').addClass('search-layout');
                    $('.headerMenuItems').css("display", "none");
                    $('.bsi-course-crumb').css("display", "none");
                    $('#bsiMaincontainer').css({ "position": "absolute", "z-index": "9999" });
                    $('#SearchTextBox').focus();
                    var $height = $(window).scrollTop();
                    if ($height > 40) {
                        $('#MainContentArea').removeClass('search-top');
                    }
                    else {
                        $('#MainContentArea').addClass('search-top');
                    }
                    $('#bsiDefaultcontainer').css({ "position": "absolute", "z-index": "9999" });


                }

                $("div#search-toggle-icon").hide();
            });
            $('div#site-search span,.close-icone-since').click(function () {

                if ($("#searchform-wrapper").hide()) {
                    $("#searchform-wrapper").css("top", "5px");
                    $("#horizontal").show();
                    $('#bsiMaincontainer').addClass('container-map');
                    $('#container2').addClass('container2');
                    $('.header-wrapper-container').removeClass('search-faded');
					$('.header-parent-container').removeClass('search-layout');
                    $('.container2').removeClass('body-faded');
                    $('#MainContentArea').removeClass('body-faded');
                    $('.headerMenuItems').css("display", "block");
                    $('#MainContentArea').removeClass('search-top');
                    $('#bsiMaincontainer').removeAttr('style');
                    $('#bsiDefaultcontainer').removeAttr('style');
                    $('.bsi-course-crumb').css("display", "block");
                }
                $("div#search-toggle-icon").show();
            });
            $(".close-icone-since").keypress(function (e) {
                if (e.which == 13) {
                    if ($("#searchform-wrapper").hide()) {
                        $("#searchform-wrapper").css("top", "5px");
                        $("#horizontal").show();
                        $('#bsiMaincontainer').addClass('container-map');
                        $('#container2').addClass('container2');
                        $('.header-wrapper-container').removeClass('search-faded');
                        $('.header-parent-container').removeClass('search-layout');
                        $('.container2').removeClass('body-faded');
                        $('#MainContentArea').removeClass('body-faded');
                        $('.headerMenuItems').css("display", "block");
                        $('#MainContentArea').removeClass('search-top');
                        $('#bsiMaincontainer').removeAttr('style');
                        $('#bsiDefaultcontainer').removeAttr('style');
                        $('.bsi-course-crumb').css("display", "block");
                    }
                    $("div#search-toggle-icon").show();
                }
            });
            $('#MainContentArea').click(function () {
                if ($("#searchform-wrapper").hide()) {
                    if ($('.header-parent-container').hasClass('search-layout')) {
                        $("#horizontal").hide();
                        $("#searchform-wrapper").css("top", "45px");
                        $("#searchform-wrapper").show();
                        $("div#search-toggle-icon").hide();
                    }
                    else {
                        $("#horizontal").show();
                        $('#bsiMaincontainer').addClass('container-map');
                        $('#container2').addClass('container2');
                        $("div#search-toggle-icon").show();
                    }

                }
                
            });
        }
    }


    function searchToggle767() {
        if (Modernizr.mq('(max-width: 900px)')) {
            $('div#search-toggle-icon .bt').click(function () {
                $("#searchform-wrapper").show();
                $("div#search-toggle-icon").hide();
                $(".logo-innerDiv").hide();
                $(".menu-bt").hide();
                $(".label-ico-mobile").hide();
                $(".search-fluid").hide();
				$('.container2').addClass('body-faded');
                $('.header-parent-container').addClass('search-layout');
                $('.bsi-course-crumb').css("display", "none");
                $('#MainContentArea').addClass('search-top');
                $('#bsiMaincontainer').css({ "position": "absolute", "z-index": "9999" });
                $('#bsiDefaultcontainer').css({ "position": "absolute", "z-index": "9999" });
                $('#SearchTextBox').focus();
            });

            $('div#site-search span,.close-icone-since').click(function () {
                $("#searchform-wrapper").hide();
                $("div#search-toggle-icon").show();
                $(".logo-innerDiv").show();
                $(".menu-bt").show();
                $(".label-ico-mobile").show();
                $(".search-fluid").show();
				$('.container2').removeClass('body-faded');
                $('.header-parent-container').removeClass('search-layout');
                $('#MainContentArea').removeClass('search-top');
                $('#bsiMaincontainer').removeAttr('style');
                $('#bsiDefaultcontainer').removeAttr('style');
                $('.bsi-course-crumb').css("display", "block");
            });

            $('div.menu-data-data-bt #Img1').click(function () {
                $("div#search-toggle-icon").show();
                $("#searchform-wrapper").hide();
				$('.container2').removeClass('body-faded');
                $('.header-parent-container').removeClass('search-layout');
                $('#MainContentArea').removeClass('search-top');
                $('#bsiMaincontainer').removeAttr('style');
                $('#bsiDefaultcontainer').removeAttr('style');
                $('.bsi-course-crumb').css("display", "block");
            });


        }
    }

});

$(function ($) {
    var num_cols = 3,
        container = $('.strds-teaser-block'),
        listItem = 'li',
        listClass = 'standards-list1';

    container.each(function () {
        var items_per_col = new Array(),
            items = $(this).find(listItem),
            min_items_per_col = Math.floor(items.length / num_cols),
            difference = items.length - (min_items_per_col * num_cols);
        for (var i = 0; i < num_cols; i++) {
            if (i < difference) {
                items_per_col[i] = min_items_per_col + 1;
            } else {
                items_per_col[i] = min_items_per_col;
            }
        }
        for (var i = 0; i < num_cols; i++) {
            +
                $(this).append($('<ul ></ul>').addClass(listClass));
            for (var j = 0; j < items_per_col[i]; j++) {
                var pointer = 0;
                for (var k = 0; k < i; k++) {
                    pointer += items_per_col[k];
                }
                $(this).find('.' + listClass).last().append(items[j + pointer]);
            }
        }
    });

});

$(function ($) {
    $('.localisation-links').keypress(function (e) {
        $('.country-nav-item').trigger('click');

    });

    $('.search-country-comp').keypress(function (e) {
        $('div#search-toggle-icon .bt').trigger('click');

    });
    var idFromElement = $(".fecth-id").each(function () {
        return $(this).attr("id");
    });

    for (var i = 0; i < idFromElement.length; i++) {
        targetElement(idFromElement[i].id);
    }

    function targetElement(idFromElement) {

        var elementUlSt, containerGrid, count, findTextvalue, featureFind_crs, featureFind_st, no_gridcontainer;

        containerGrid = $('#' + idFromElement + '  .container_grid').text();
        findTextvalue = $('#' + idFromElement + '  .container_count').text();
        featureFind_crs = $('#' + idFromElement + '  .featureFind-crs').text();
        featureFind_st = $('#' + idFromElement + '  .featureFind-st').text();


        if (containerGrid === "Keep to grid") {
            if (findTextvalue === '4') {
                count = 'link-list link-list-feature-four';
            } else if (findTextvalue === '3' || findTextvalue === '5' || findTextvalue === '6') {
                count = 'link-list link-list-feature';
            } else if (findTextvalue === '2') {
                count = 'link-list link-list-feature-two';
            } else if (findTextvalue === '1') {
                count = 'link-list link-list-feature-one';
            } else {
                count = 'link-list link-list-feature-four';
            }

        }

        elementUlSt = '<ul class="' + count + '"></ul>';
        var num_cols = 1,
            container = $('#' + idFromElement + ' .panel-merg-crs'),
            listItem = 'li',
            listClass = featureFind_crs;

        container.each(function () {
            var items_per_col = new Array(),
                items = $(this).find(listItem),
                min_items_per_col = Math.floor(items.length / num_cols),
                difference = items.length - (min_items_per_col * num_cols);
            for (var i = 0; i < num_cols; i++) {
                if (i < difference) {
                    items_per_col[i] = min_items_per_col + 1;
                } else {
                    items_per_col[i] = min_items_per_col;
                }
            }
            for (var i = 0; i < num_cols; i++) {
                +
                    $(this).append($(elementUlSt).addClass(listClass));
                for (var j = 0; j < items_per_col[i]; j++) {
                    var pointer = 0;
                    for (var k = 0; k < i; k++) {
                        pointer += items_per_col[k];
                    }
                    $(this).find('.' + listClass).last().append(items[j + pointer]);
                }
            }
        });


        var num_cols_st = 1,
            container_st = $('#' + idFromElement + ' .panel-merg-st'),
            listItem_st = 'li',
            listClass_st = featureFind_st;

        container_st.each(function () {
            var items_per_col = new Array(),
                items = $(this).find(listItem_st),
                min_items_per_col = Math.floor(items.length / num_cols_st),
                difference = items.length - (min_items_per_col * num_cols_st);
            for (var i = 0; i < num_cols_st; i++) {
                if (i < difference) {
                    items_per_col[i] = min_items_per_col + 1;
                } else {
                    items_per_col[i] = min_items_per_col;
                }
            }
            for (var i = 0; i < num_cols; i++) {
                +
                    $(this).append($(elementUlSt).addClass(listClass_st));
                for (var j = 0; j < items_per_col[i]; j++) {
                    var pointer = 0;
                    for (var k = 0; k < i; k++) {
                        pointer += items_per_col[k];
                    }
                    $(this).find('.' + listClass_st).last().append(items[j + pointer]);
                }
            }
        });
    }

});

function resizeHieght(mainClass, childClass) {
    $(mainClass).each(function () {
        var $columns = $(childClass, this);
        var maxHeight = Math.max.apply(Math, $columns.map(function () {
            return $(this).height();
        }).get());
        $columns.height(maxHeight);
    });
}

function removeHieght(childClass) {
    $(childClass).height('auto');
}

function autoresize(mainClass, childClass) {
    if ($(childClass).height('auto')) {
        resizeHieght(mainClass, childClass);
    }
}


$(window).on("load resize ", function () {
    //------adding for class  icon List Ul Li------ 
    $("#icon-content ul li").addClass('icon-content-li');
    //-----------------------------------------------------
    var classArray = [];
    classArray['mainClass'] = ['.tire-grid-box', '.tire-grid-box', '.two-column-fifty-fifty', '.st-feature', '.also-list', '.shop-box', '.shop-box', '.shop-box', '.featured-course', '#icon-content ul', '.tiles-no-bg ul.link-main-container', '.resource-link-list', '.shop-result-box', '.shop-result-box', '.srvc-teaser-block', '.srvc-teaser-block', '.srvc-teaser-block'];
    classArray['childClass'] = ['.top-content', '.three-tire-box', '.panel-title', '.st-feature-li', '.also-li', '.shop-list-title', '.shopbox-content', '.shop-box-li', '.course-features-li', '.icon-content-li', '.tiles-no-bg-list-li', '.resource-link-list-li', '.shop-result-box-li', '.shop-result-li', '.cpi'/*'.cpi-content', '.cpi-title', '.cpi-intro', '.cpi-links'*/];
    var i;
    for (i = 0; i < classArray['mainClass'].length; i++) {
        removeHieght(classArray['childClass'][i]);
        autoresize(classArray['mainClass'][i], classArray['childClass'][i]);
    }
});

$(window).resize(function () {
    var idFromloop = $(".asw").each(function () {
        return $(this).attr("id");
    });
    if ($('.st-li-m').height('auto')) {
        autoload(idFromloop);
    }
});

$(window).on('load', function () {
    var idFromloop = $(".asw").each(function () {
        return $(this).attr("id");
    });
    if ($('.st-li-m').height('auto')) {
        autoload(idFromloop);
    }

});
function removeHieghtst() {
    $('.st-li-m').height('auto');
}

function autoload(idFromloop) {
    var i, firstcolumns, secondcolumns, thirdcolumns, allColumns, allchildcolumns;
    allColumns =
        allchildcolumns = ' .st-li-m';

    for (i = 0; i < idFromloop.length; i++) {
        firstcolumns = '#' + idFromloop[i].id + ' .standards-list1:nth-of-type(1)';
        secondcolumns = '#' + idFromloop[i].id + ' .standards-list1:nth-of-type(2)';
        thirdcolumns = '#' + idFromloop[i].id + ' .standards-list1:nth-of-type(3)';
        allColumns = '#' + idFromloop[i].id + ' .standards-list1';
        resizeHieghtDom(firstcolumns, secondcolumns, thirdcolumns, allColumns, allchildcolumns);
    }

}

var heighestData, maxHeightC, maxHeightA, maxHeightB;
function resizeHieghtDom(firstcolumns, secondcolumns, thirdcolumns, allColumns, allchildcolumns) {
    $(firstcolumns).each(function () {
        var $columns = $('.st-li-m', this);
        maxHeightA = Math.max.apply(Math, $columns.map(function () {
            return $(this).height();
        }).get());
    });

    $(secondcolumns).each(function () {
        var $columns = $('.st-li-m', this);
        maxHeightB = Math.max.apply(Math, $columns.map(function () {
            return $(this).height();
        }).get());
    });

    $(thirdcolumns).each(function () {
        var $columns = $('.st-li-m', this);
        maxHeightC = Math.max.apply(Math, $columns.map(function () {
            return $(this).height();
        }).get());
    });

    heighestData = Math.max(maxHeightC, maxHeightA, maxHeightB);
    appendHeight(heighestData, allColumns);
}

function appendHeight(heighestData, allColumns) {
    $(allColumns).each(function () {
        var $columns = $('.st-li-m', this);
        $columns.height(heighestData);
    });
}



function reply_click(CountryName) {
    if (Modernizr.mq('(max-width: 767px)')) {
        $(".header-slide-country label").html(CountryName);
       $('.localisation-links .country-nav-item').removeClass('active');
    }

    $(".country-selector-dialog").toggle();
    if ($('.header-parent-container').is('.scroll-header-bar2')) {
        $('html, body').animate({ scrollTop: 0 }, '1200');
        $(".header-parent-container").removeClass("scroll-header-bar2");
        $('.headerMenuItems').css('display', 'block');
        $('.main-nav').css('width', 'auto');
    }

}
$(function () {
    $(".close-btn-country ").click(function () {
        $("#country-selector-dialog").hide();
        $(".header-parent-container").removeClass("scroll-header-bar2");
        $('.headerMenuItems').css('display', 'block');
        $('.main-nav').css('width', 'auto');
    });
});

$(function () {
    var m = $('.utility-header-container .quick-links ul li:last-child');
    m.on('keydown', m, function (e) {
        if (e.which == 9) {
            $(".utility-nav-header").css("overflow", "visible");
            $('.utility-nav-header').css('height', 'auto');
        }
    });
});


$(function () {
    var personImage = $("#person-feature-image").height();
    var imgBar = $('.left-bar-span').height();
    if (personImage !== 0) {
        $('.left-bar-span').css('height', personImage);
    }
    else {
        $('.left-bar-span').css('height', "160px");
    }
});

function verticalScroll(windowHieght) {
    if (Modernizr.mq('(min-width: 901px)')) {
        var elementsheight = $('ul#horizontal li .sub-nav');
        $(elementsheight).each(function (index) {
            if ($(this).css('max-height', 'auto')) {
                if ($(this).height() > windowHieght) {
                    $(this).css('overflow-y', 'scroll');
                    $(this).addClass('right-padding-reduce');
                    $(this).css('max-height', windowHieght - 73);
                } else if ($(this).height() < windowHieght && $(this).height() != windowHieght) {
                    $(this).css('max-height', windowHieght - 73);
                    if ($(this).css('overflow-y', 'hidden')) {
                        $(this).removeClass('right-padding-reduce');
                    }
                    if ($(this).height() === windowHieght - 73 || $(this).height() > windowHieght) {
                        $(this).css('overflow-y', 'scroll');
                        $(this).addClass('right-padding-reduce');
                    }
                }
            }
        });
    }
}

function scrollTargetfunction(getId) {

    if (Modernizr.mq('(min-width: 901px)')) {
        $('html, body').animate({
                scrollTop: $("#" + getId).position().top - 80
            }, 2);
    }
    else {
        $('html, body').animate({
            scrollTop: $("#" + getId).position().top + 60
        }, 2);
    }


}

function sizeControll() {
    if (Modernizr.mq('(min-width: 901px)')) {
        var w = 0;
        var mw = $("#horizontal").width() - 0;
        var i = 0;
        var $height = $(window).scrollTop();
        jQuery.each($("#horizontal").children(), function () {
            i++;
            w += $(this).outerWidth(true);
            if (mw < w) {
                $('.main-nav-container .main-nav li').addClass('font-adjust');
            }
        });
    } else {
        $('.main-nav-container .main-nav li').removeClass('font-adjust');

    }
}

$(document).ready(function () {
    var windowHieght = $(window).height();
    verticalScroll(windowHieght);
    sizeControll();
});

$(window).resize(function () {
    var windowHieght = $(window).height();
    verticalScroll(windowHieght);
    sizeControll();
});

//====================================================================  NONE EQUAL HEIGHT ===============================================================

(function (window, factory) {

    if (typeof define == 'function' && define.amd) {
        define('jquery-bridget/jquery-bridget', ['jquery'], function (jQuery) {
            return factory(window, jQuery);
        });
    } else if (typeof module == 'object' && module.exports) {
        module.exports = factory(
            window,
            require('jquery')
        );
    } else {
        window.jQueryBridget = factory(
            window,
            window.jQuery
        );
    }

}(window, function factory(window, jQuery) {
    'use strict';

    // ----- utils ----- //

    var arraySlice = Array.prototype.slice;
    var console = window.console;
    var logError = typeof console == 'undefined' ? function () { } :
        function (message) {
            console.error(message);
        };

    // ----- jQueryBridget ----- //

    function jQueryBridget(namespace, PluginClass, $) {
        $ = $ || jQuery || window.jQuery;
        if (!$) {
            return;
        }

        // add option method -> $().plugin('option', {...})
        if (!PluginClass.prototype.option) {
            // option setter
            PluginClass.prototype.option = function (opts) {
                // bail out if not an object
                if (!$.isPlainObject(opts)) {
                    return;
                }
                this.options = $.extend(true, this.options, opts);
            };
        }

        // make jQuery plugin
        $.fn[namespace] = function (arg0 /*, arg1 */) {
            if (typeof arg0 == 'string') {
                // method call $().plugin( 'methodName', { options } )
                // shift arguments by 1
                var args = arraySlice.call(arguments, 1);
                return methodCall(this, arg0, args);
            }
            // just $().plugin({ options })
            plainCall(this, arg0);
            return this;
        };

        // $().plugin('methodName')
        function methodCall($elems, methodName, args) {
            var returnValue;
            var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

            $elems.each(function (i, elem) {
                // get instance
                var instance = $.data(elem, namespace);
                if (!instance) {
                    logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
                        pluginMethodStr);
                    return;
                }

                var method = instance[methodName];
                if (!method || methodName.charAt(0) == '_') {
                    logError(pluginMethodStr + ' is not a valid method');
                    return;
                }

                // apply method, get return value
                var value = method.apply(instance, args);
                // set return value if value is returned, use only first value
                returnValue = returnValue === undefined ? value : returnValue;
            });

            return returnValue !== undefined ? returnValue : $elems;
        }

        function plainCall($elems, options) {
            $elems.each(function (i, elem) {
                var instance = $.data(elem, namespace);
                if (instance) {
                    // set options & init
                    instance.option(options);
                    instance._init();
                } else {
                    // initialize new instance
                    instance = new PluginClass(elem, options);
                    $.data(elem, namespace, instance);
                }
            });
        }

        updateJQuery($);

    }

    // ----- updateJQuery ----- //

    // set $.bridget for v1 backwards compatibility
    function updateJQuery($) {
        if (!$ || ($ && $.bridget)) {
            return;
        }
        $.bridget = jQueryBridget;
    }

    updateJQuery(jQuery || window.jQuery);

    // -----  ----- //

    return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, window */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('ev-emitter/ev-emitter', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory();
    } else {
        // Browser globals
        global.EvEmitter = factory();
    }

}(typeof window != 'undefined' ? window : this, function () {



    function EvEmitter() { }

    var proto = EvEmitter.prototype;

    proto.on = function (eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // set events hash
        var events = this._events = this._events || {};
        // set listeners array
        var listeners = events[eventName] = events[eventName] || [];
        // only add once
        if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
        }

        return this;
    };

    proto.once = function (eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        var onceEvents = this._onceEvents = this._onceEvents || {};
        // set onceListeners object
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        // set flag
        onceListeners[listener] = true;

        return this;
    };

    proto.off = function (eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var index = listeners.indexOf(listener);
        if (index != -1) {
            listeners.splice(index, 1);
        }

        return this;
    };

    proto.emitEvent = function (eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        // copy over to avoid interference if .off() in listener
        listeners = listeners.slice(0);
        args = args || [];
        // once stuff
        var onceListeners = this._onceEvents && this._onceEvents[eventName];

        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i]
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
        }

        return this;
    };

    proto.allOff = function () {
        delete this._events;
        delete this._onceEvents;
    };

    return EvEmitter;

}));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

(function (window, factory) {
    /* jshint strict: false */ /* globals define, module */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('get-size/get-size', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // browser global
        window.getSize = factory();
    }

})(window, function factory() {
    'use strict';

    // -------------------------- helpers -------------------------- //

    // get a number from a string, not a percentage
    function getStyleSize(value) {
        var num = parseFloat(value);
        // not a percent like '100%', and a number
        var isValid = value.indexOf('%') == -1 && !isNaN(num);
        return isValid && num;
    }

    function noop() { }

    var logError = typeof console == 'undefined' ? noop :
        function (message) {
            console.error(message);
        };

    // -------------------------- measurements -------------------------- //

    var measurements = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth'
    ];

    var measurementsLength = measurements.length;

    function getZeroSize() {
        var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            size[measurement] = 0;
        }
        return size;
    }

    // -------------------------- getStyle -------------------------- //

    /**
     * getStyle, get style of element, check for Firefox bug
     * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
     */
    function getStyle(elem) {
        var style = getComputedStyle(elem);
        if (!style) {
            logError('Style returned ' + style +
                '. Are you running this code in a hidden iframe on Firefox? ' +
                'See https://bit.ly/getsizebug1');
        }
        return style;
    }

    // -------------------------- setup -------------------------- //

    var isSetup = false;

    var isBoxSizeOuter;

    /**
     * setup
     * check isBoxSizerOuter
     * do on first getSize() rather than on page load for Firefox bug
     */
    function setup() {
        // setup once
        if (isSetup) {
            return;
        }
        isSetup = true;

        // -------------------------- box sizing -------------------------- //

        /**
         * Chrome & Safari measure the outer-width on style.width on border-box elems
         * IE11 & Firefox<29 measures the inner-width
         */
        var div = document.createElement('div');
        div.style.width = '200px';
        div.style.padding = '1px 2px 3px 4px';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px 2px 3px 4px';
        div.style.boxSizing = 'border-box';

        var body = document.body || document.documentElement;
        body.appendChild(div);
        var style = getStyle(div);
        // round value for browser zoom. desandro/masonry#928
        isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
        getSize.isBoxSizeOuter = isBoxSizeOuter;

        body.removeChild(div);
    }

    // -------------------------- getSize -------------------------- //

    function getSize(elem) {
        setup();

        // use querySeletor if elem is string
        if (typeof elem == 'string') {
            elem = document.querySelector(elem);
        }

        // do not proceed on non-objects
        if (!elem || typeof elem != 'object' || !elem.nodeType) {
            return;
        }

        var style = getStyle(elem);

        // if hidden, everything is 0
        if (style.display == 'none') {
            return getZeroSize();
        }

        var size = {};
        size.width = elem.offsetWidth;
        size.height = elem.offsetHeight;

        var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

        // get all measurements
        for (var i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            var value = style[measurement];
            var num = parseFloat(value);
            // any 'auto', 'medium' value will be 0
            size[measurement] = !isNaN(num) ? num : 0;
        }

        var paddingWidth = size.paddingLeft + size.paddingRight;
        var paddingHeight = size.paddingTop + size.paddingBottom;
        var marginWidth = size.marginLeft + size.marginRight;
        var marginHeight = size.marginTop + size.marginBottom;
        var borderWidth = size.borderLeftWidth + size.borderRightWidth;
        var borderHeight = size.borderTopWidth + size.borderBottomWidth;

        var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

        // overwrite width and height if we can get it from style
        var styleWidth = getStyleSize(style.width);
        if (styleWidth !== false) {
            size.width = styleWidth +
                // add padding and border unless it's already including it
                (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
        }

        var styleHeight = getStyleSize(style.height);
        if (styleHeight !== false) {
            size.height = styleHeight +
                // add padding and border unless it's already including it
                (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
        }

        size.innerWidth = size.width - (paddingWidth + borderWidth);
        size.innerHeight = size.height - (paddingHeight + borderHeight);

        size.outerWidth = size.width + marginWidth;
        size.outerHeight = size.height + marginHeight;

        return size;
    }

    return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
    /*global define: false, module: false */
    'use strict';
    // universal module definition
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('desandro-matches-selector/matches-selector', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // browser global
        window.matchesSelector = factory();
    }

}(window, function factory() {
    'use strict';

    var matchesMethod = (function () {
        var ElemProto = window.Element.prototype;
        // check for the standard method name first
        if (ElemProto.matches) {
            return 'matches';
        }
        // check un-prefixed
        if (ElemProto.matchesSelector) {
            return 'matchesSelector';
        }
        // check vendor prefixes
        var prefixes = ['webkit', 'moz', 'ms', 'o'];

        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var method = prefix + 'MatchesSelector';
            if (ElemProto[method]) {
                return method;
            }
        }
    })();

    return function matchesSelector(elem, selector) {
        return elem[matchesMethod](selector);
    };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

(function (window, factory) {
    // universal module definition
    /*jshint strict: false */ /*globals define, module, require */

    if (typeof define == 'function' && define.amd) {
        // AMD
        define('fizzy-ui-utils/utils', [
            'desandro-matches-selector/matches-selector'
        ], function (matchesSelector) {
            return factory(window, matchesSelector);
        });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            window,
            require('desandro-matches-selector')
        );
    } else {
        // browser global
        window.fizzyUIUtils = factory(
            window,
            window.matchesSelector
        );
    }

}(window, function factory(window, matchesSelector) {



    var utils = {};

    // ----- extend ----- //

    // extends objects
    utils.extend = function (a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    };

    // ----- modulo ----- //

    utils.modulo = function (num, div) {
        return ((num % div) + div) % div;
    };

    // ----- makeArray ----- //

    var arraySlice = Array.prototype.slice;

    // turn element or nodeList into an array
    utils.makeArray = function (obj) {
        if (Array.isArray(obj)) {
            // use object if already an array
            return obj;
        }
        // return empty array if undefined or null. #6
        if (obj === null || obj === undefined) {
            return [];
        }

        var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
        if (isArrayLike) {
            // convert nodeList to array
            return arraySlice.call(obj);
        }

        // array of single index
        return [obj];
    };

    // ----- removeFrom ----- //

    utils.removeFrom = function (ary, obj) {
        var index = ary.indexOf(obj);
        if (index != -1) {
            ary.splice(index, 1);
        }
    };

    // ----- getParent ----- //

    utils.getParent = function (elem, selector) {
        while (elem.parentNode && elem != document.body) {
            elem = elem.parentNode;
            if (matchesSelector(elem, selector)) {
                return elem;
            }
        }
    };

    // ----- getQueryElement ----- //

    // use element as selector string
    utils.getQueryElement = function (elem) {
        if (typeof elem == 'string') {
            return document.querySelector(elem);
        }
        return elem;
    };

    // ----- handleEvent ----- //

    // enable .ontype to trigger from .addEventListener( elem, 'type' )
    utils.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

    // ----- filterFindElements ----- //

    utils.filterFindElements = function (elems, selector) {
        // make array of elems
        elems = utils.makeArray(elems);
        var ffElems = [];

        elems.forEach(function (elem) {
            // check that elem is an actual element
            if (!(elem instanceof HTMLElement)) {
                return;
            }
            // add elem if no selector
            if (!selector) {
                ffElems.push(elem);
                return;
            }
            // filter & find items if we have a selector
            // filter
            if (matchesSelector(elem, selector)) {
                ffElems.push(elem);
            }
            // find children
            var childElems = elem.querySelectorAll(selector);
            // concat childElems to filterFound array
            for (var i = 0; i < childElems.length; i++) {
                ffElems.push(childElems[i]);
            }
        });

        return ffElems;
    };

    // ----- debounceMethod ----- //

    utils.debounceMethod = function (_class, methodName, threshold) {
        threshold = threshold || 100;
        // original method
        var method = _class.prototype[methodName];
        var timeoutName = methodName + 'Timeout';

        _class.prototype[methodName] = function () {
            var timeout = this[timeoutName];
            clearTimeout(timeout);

            var args = arguments;
            var _this = this;
            this[timeoutName] = setTimeout(function () {
                method.apply(_this, args);
                delete _this[timeoutName];
            }, threshold);
        };
    };

    // ----- docReady ----- //

    utils.docReady = function (callback) {
        var readyState = document.readyState;
        if (readyState == 'complete' || readyState == 'interactive') {
            // do async to allow for other scripts to run. metafizzy/flickity#441
            setTimeout(callback);
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    };

    // ----- htmlInit ----- //

    // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
    utils.toDashed = function (str) {
        return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
            return $1 + '-' + $2;
        }).toLowerCase();
    };

    var console = window.console;
    /**
     * allow user to initialize classes via [data-namespace] or .js-namespace class
     * htmlInit( Widget, 'widgetName' )
     * options are parsed from data-namespace-options
     */
    utils.htmlInit = function (WidgetClass, namespace) {
        utils.docReady(function () {
            var dashedNamespace = utils.toDashed(namespace);
            var dataAttr = 'data-' + dashedNamespace;
            var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
            var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
            var elems = utils.makeArray(dataAttrElems)
                .concat(utils.makeArray(jsDashElems));
            var dataOptionsAttr = dataAttr + '-options';
            var jQuery = window.jQuery;

            elems.forEach(function (elem) {
                var attr = elem.getAttribute(dataAttr) ||
                    elem.getAttribute(dataOptionsAttr);
                var options;
                try {
                    options = attr && JSON.parse(attr);
                } catch (error) {
                    // log error, do not initialize
                    if (console) {
                        console.error('Error parsing ' + dataAttr + ' on ' + elem.className +
                            ': ' + error);
                    }
                    return;
                }
                // initialize
                var instance = new WidgetClass(elem, options);
                // make available via $().data('namespace')
                if (jQuery) {
                    jQuery.data(elem, namespace, instance);
                }
            });

        });
    };

    // -----  ----- //

    return utils;

}));

/**
 * Outlayer Item
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('outlayer/item', [
            'ev-emitter/ev-emitter',
            'get-size/get-size'
        ],
            factory
        );
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory(
            require('ev-emitter'),
            require('get-size')
        );
    } else {
        // browser global
        window.Outlayer = {};
        window.Outlayer.Item = factory(
            window.EvEmitter,
            window.getSize
        );
    }

}(window, function factory(EvEmitter, getSize) {
    'use strict';

    // ----- helpers ----- //

    function isEmptyObj(obj) {
        for (var prop in obj) {
            return false;
        }
        prop = null;
        return true;
    }

    // -------------------------- CSS3 support -------------------------- //


    var docElemStyle = document.documentElement.style;

    var transitionProperty = typeof docElemStyle.transition == 'string' ?
        'transition' : 'WebkitTransition';
    var transformProperty = typeof docElemStyle.transform == 'string' ?
        'transform' : 'WebkitTransform';

    var transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        transition: 'transitionend'
    }[transitionProperty];

    // cache all vendor properties that could have vendor prefix
    var vendorProperties = {
        transform: transformProperty,
        transition: transitionProperty,
        transitionDuration: transitionProperty + 'Duration',
        transitionProperty: transitionProperty + 'Property',
        transitionDelay: transitionProperty + 'Delay'
    };

    // -------------------------- Item -------------------------- //

    function Item(element, layout) {
        if (!element) {
            return;
        }

        this.element = element;
        // parent layout class, i.e. Masonry, Isotope, or Packery
        this.layout = layout;
        this.position = {
            x: 0,
            y: 0
        };

        this._create();
    }

    // inherit EvEmitter
    var proto = Item.prototype = Object.create(EvEmitter.prototype);
    proto.constructor = Item;

    proto._create = function () {
        // transition objects
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        };

        this.css({
            position: 'absolute'
        });
    };

    // trigger specified handler for event type
    proto.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

    proto.getSize = function () {
        this.size = getSize(this.element);
    };

    /**
     * apply CSS styles to element
     * @param {Object} style
     */
    proto.css = function (style) {
        var elemStyle = this.element.style;

        for (var prop in style) {
            // use vendor property if available
            var supportedProp = vendorProperties[prop] || prop;
            elemStyle[supportedProp] = style[prop];
        }
    };

    // measure position, and sets it
    proto.getPosition = function () {
        var style = getComputedStyle(this.element);
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');
        var xValue = style[isOriginLeft ? 'left' : 'right'];
        var yValue = style[isOriginTop ? 'top' : 'bottom'];
        var x = parseFloat(xValue);
        var y = parseFloat(yValue);
        // convert percent to pixels
        var layoutSize = this.layout.size;
        if (xValue.indexOf('%') != -1) {
            x = (x / 100) * layoutSize.width;
        }
        if (yValue.indexOf('%') != -1) {
            y = (y / 100) * layoutSize.height;
        }
        // clean up 'auto' or other non-integer values
        x = isNaN(x) ? 0 : x;
        y = isNaN(y) ? 0 : y;
        // remove padding from measurement
        x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
        y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

        this.position.x = x;
        this.position.y = y;
    };

    // set settled position, apply padding
    proto.layoutPosition = function () {
        var layoutSize = this.layout.size;
        var style = {};
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');

        // x
        var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
        var xProperty = isOriginLeft ? 'left' : 'right';
        var xResetProperty = isOriginLeft ? 'right' : 'left';

        var x = this.position.x + layoutSize[xPadding];
        // set in percentage or pixels
        style[xProperty] = this.getXValue(x);
        // reset other property
        style[xResetProperty] = '';

        // y
        var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
        var yProperty = isOriginTop ? 'top' : 'bottom';
        var yResetProperty = isOriginTop ? 'bottom' : 'top';

        var y = this.position.y + layoutSize[yPadding];
        // set in percentage or pixels
        style[yProperty] = this.getYValue(y);
        // reset other property
        style[yResetProperty] = '';

        this.css(style);
        this.emitEvent('layout', [this]);
    };

    proto.getXValue = function (x) {
        var isHorizontal = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && !isHorizontal ?
            ((x / this.layout.size.width) * 100) + '%' : x + 'px';
    };

    proto.getYValue = function (y) {
        var isHorizontal = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && isHorizontal ?
            ((y / this.layout.size.height) * 100) + '%' : y + 'px';
    };

    proto._transitionTo = function (x, y) {
        this.getPosition();
        // get current x & y from top/left
        var curX = this.position.x;
        var curY = this.position.y;

        var didNotMove = x == this.position.x && y == this.position.y;

        // save end position
        this.setPosition(x, y);

        // if did not move and not transitioning, just go to layout
        if (didNotMove && !this.isTransitioning) {
            this.layoutPosition();
            return;
        }

        var transX = x - curX;
        var transY = y - curY;
        var transitionStyle = {};
        transitionStyle.transform = this.getTranslate(transX, transY);

        this.transition({
            to: transitionStyle,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: true
        });
    };

    proto.getTranslate = function (x, y) {
        // flip cooridinates if origin on right or bottom
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');
        x = isOriginLeft ? x : -x;
        y = isOriginTop ? y : -y;
        return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    };

    // non transition + transform support
    proto.goTo = function (x, y) {
        this.setPosition(x, y);
        this.layoutPosition();
    };

    proto.moveTo = proto._transitionTo;

    proto.setPosition = function (x, y) {
        this.position.x = parseFloat(x);
        this.position.y = parseFloat(y);
    };

    // ----- transition ----- //

    /**
     * @param {Object} style - CSS
     * @param {Function} onTransitionEnd
     */

    // non transition, just trigger callback
    proto._nonTransition = function (args) {
        this.css(args.to);
        if (args.isCleaning) {
            this._removeStyles(args.to);
        }
        for (var prop in args.onTransitionEnd) {
            args.onTransitionEnd[prop].call(this);
        }
    };

    /**
     * proper transition
     * @param {Object} args - arguments
     *   @param {Object} to - style to transition to
     *   @param {Object} from - style to start transition from
     *   @param {Boolean} isCleaning - removes transition styles after transition
     *   @param {Function} onTransitionEnd - callback
     */
    proto.transition = function (args) {
        // redirect to nonTransition if no transition duration
        if (!parseFloat(this.layout.options.transitionDuration)) {
            this._nonTransition(args);
            return;
        }

        var _transition = this._transn;
        // keep track of onTransitionEnd callback by css property
        for (var prop in args.onTransitionEnd) {
            _transition.onEnd[prop] = args.onTransitionEnd[prop];
        }
        // keep track of properties that are transitioning
        for (prop in args.to) {
            _transition.ingProperties[prop] = true;
            // keep track of properties to clean up when transition is done
            if (args.isCleaning) {
                _transition.clean[prop] = true;
            }
        }

        // set from styles
        if (args.from) {
            this.css(args.from);
            // force redraw. http://blog.alexmaccaw.com/css-transitions
            var h = this.element.offsetHeight;
            // hack for JSHint to hush about unused var
            h = null;
        }
        // enable transition
        this.enableTransition(args.to);
        // set styles that are transitioning
        this.css(args.to);

        this.isTransitioning = true;

    };

    // dash before all cap letters, including first for
    // WebkitTransform => -webkit-transform
    function toDashedAll(str) {
        return str.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
        });
    }

    var transitionProps = 'opacity,' + toDashedAll(transformProperty);

    proto.enableTransition = function (/* style */) {
        // HACK changing transitionProperty during a transition
        // will cause transition to jump
        if (this.isTransitioning) {
            return;
        }

        // make `transition: foo, bar, baz` from style object
        // HACK un-comment this when enableTransition can work
        // while a transition is happening
        // var transitionValues = [];
        // for ( var prop in style ) {
        //   // dash-ify camelCased properties like WebkitTransition
        //   prop = vendorProperties[ prop ] || prop;
        //   transitionValues.push( toDashedAll( prop ) );
        // }
        // munge number to millisecond, to match stagger
        var duration = this.layout.options.transitionDuration;
        duration = typeof duration == 'number' ? duration + 'ms' : duration;
        // enable transition styles
        this.css({
            transitionProperty: transitionProps,
            transitionDuration: duration,
            transitionDelay: this.staggerDelay || 0
        });
        // listen for transition end event
        this.element.addEventListener(transitionEndEvent, this, false);
    };

    // ----- events ----- //

    proto.onwebkitTransitionEnd = function (event) {
        this.ontransitionend(event);
    };

    proto.onotransitionend = function (event) {
        this.ontransitionend(event);
    };

    // properties that I munge to make my life easier
    var dashedVendorProperties = {
        '-webkit-transform': 'transform'
    };

    proto.ontransitionend = function (event) {
        // disregard bubbled events from children
        if (event.target !== this.element) {
            return;
        }
        var _transition = this._transn;
        // get property name of transitioned property, convert to prefix-free
        var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;

        // remove property that has completed transitioning
        delete _transition.ingProperties[propertyName];
        // check if any properties are still transitioning
        if (isEmptyObj(_transition.ingProperties)) {
            // all properties have completed transitioning
            this.disableTransition();
        }
        // clean style
        if (propertyName in _transition.clean) {
            // clean up style
            this.element.style[event.propertyName] = '';
            delete _transition.clean[propertyName];
        }
        // trigger onTransitionEnd callback
        if (propertyName in _transition.onEnd) {
            var onTransitionEnd = _transition.onEnd[propertyName];
            onTransitionEnd.call(this);
            delete _transition.onEnd[propertyName];
        }

        this.emitEvent('transitionEnd', [this]);
    };

    proto.disableTransition = function () {
        this.removeTransitionStyles();
        this.element.removeEventListener(transitionEndEvent, this, false);
        this.isTransitioning = false;
    };

    /**
     * removes style property from element
     * @param {Object} style
    **/
    proto._removeStyles = function (style) {
        // clean up transition styles
        var cleanStyle = {};
        for (var prop in style) {
            cleanStyle[prop] = '';
        }
        this.css(cleanStyle);
    };

    var cleanTransitionStyle = {
        transitionProperty: '',
        transitionDuration: '',
        transitionDelay: ''
    };

    proto.removeTransitionStyles = function () {
        // remove transition
        this.css(cleanTransitionStyle);
    };

    // ----- stagger ----- //

    proto.stagger = function (delay) {
        delay = isNaN(delay) ? 0 : delay;
        this.staggerDelay = delay + 'ms';
    };

    // ----- show/hide/remove ----- //

    // remove element from DOM
    proto.removeElem = function () {
        this.element.parentNode.removeChild(this.element);
        // remove display: none
        this.css({ display: '' });
        this.emitEvent('remove', [this]);
    };

    proto.remove = function () {
        // just remove element if no transition support or no transition
        if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
            this.removeElem();
            return;
        }

        // start transition
        this.once('transitionEnd', function () {
            this.removeElem();
        });
        this.hide();
    };

    proto.reveal = function () {
        delete this.isHidden;
        // remove display: none
        this.css({ display: '' });

        var options = this.layout.options;

        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
        onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;

        this.transition({
            from: options.hiddenStyle,
            to: options.visibleStyle,
            isCleaning: true,
            onTransitionEnd: onTransitionEnd
        });
    };

    proto.onRevealTransitionEnd = function () {
        // check if still visible
        // during transition, item may have been hidden
        if (!this.isHidden) {
            this.emitEvent('reveal');
        }
    };

    /**
     * get style property use for hide/reveal transition end
     * @param {String} styleProperty - hiddenStyle/visibleStyle
     * @returns {String}
     */
    proto.getHideRevealTransitionEndProperty = function (styleProperty) {
        var optionStyle = this.layout.options[styleProperty];
        // use opacity
        if (optionStyle.opacity) {
            return 'opacity';
        }
        // get first property
        for (var prop in optionStyle) {
            return prop;
        }
    };

    proto.hide = function () {
        // set flag
        this.isHidden = true;
        // remove display: none
        this.css({ display: '' });

        var options = this.layout.options;

        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
        onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;

        this.transition({
            from: options.visibleStyle,
            to: options.hiddenStyle,
            // keep hidden stuff hidden
            isCleaning: true,
            onTransitionEnd: onTransitionEnd
        });
    };

    proto.onHideTransitionEnd = function () {
        // check if still hidden
        // during transition, item may have been un-hidden
        if (this.isHidden) {
            this.css({ display: 'none' });
            this.emitEvent('hide');
        }
    };

    proto.destroy = function () {
        this.css({
            position: '',
            left: '',
            right: '',
            top: '',
            bottom: '',
            transition: '',
            transform: ''
        });
    };

    return Item;

}));

/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

(function (window, factory) {
    'use strict';
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('outlayer/outlayer', [
            'ev-emitter/ev-emitter',
            'get-size/get-size',
            'fizzy-ui-utils/utils',
            './item'
        ],
            function (EvEmitter, getSize, utils, Item) {
                return factory(window, EvEmitter, getSize, utils, Item);
            }
        );
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory(
            window,
            require('ev-emitter'),
            require('get-size'),
            require('fizzy-ui-utils'),
            require('./item')
        );
    } else {
        // browser global
        window.Outlayer = factory(
            window,
            window.EvEmitter,
            window.getSize,
            window.fizzyUIUtils,
            window.Outlayer.Item
        );
    }

}(window, function factory(window, EvEmitter, getSize, utils, Item) {
    'use strict';

    // ----- vars ----- //

    var console = window.console;
    var jQuery = window.jQuery;
    var noop = function () { };

    // -------------------------- Outlayer -------------------------- //

    // globally unique identifiers
    var GUID = 0;
    // internal store of all Outlayer intances
    var instances = {};


    /**
     * @param {Element, String} element
     * @param {Object} options
     * @constructor
     */
    function Outlayer(element, options) {
        var queryElement = utils.getQueryElement(element);
        if (!queryElement) {
            //if (console) {
            //    console.error('Bad element for ' + this.constructor.namespace +
            //        ': ' + (queryElement || element));
            //}
            return;
        }
        this.element = queryElement;
        // add jQuery
        if (jQuery) {
            this.$element = jQuery(this.element);
        }

        // options
        this.options = utils.extend({}, this.constructor.defaults);
        this.option(options);

        // add id for Outlayer.getFromElement
        var id = ++GUID;
        this.element.outlayerGUID = id; // expando
        instances[id] = this; // associate via id

        // kick it off
        this._create();

        var isInitLayout = this._getOption('initLayout');
        if (isInitLayout) {
            this.layout();
        }
    }

    // settings are for internal use only
    Outlayer.namespace = 'outlayer';
    Outlayer.Item = Item;

    // default options
    Outlayer.defaults = {
        containerStyle: {
            position: 'relative'
        },
        initLayout: true,
        originLeft: true,
        originTop: true,
        resize: true,
        resizeContainer: true,
        // item options
        transitionDuration: '0.4s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        }
    };

    var proto = Outlayer.prototype;
    // inherit EvEmitter
    utils.extend(proto, EvEmitter.prototype);

    /**
     * set options
     * @param {Object} opts
     */
    proto.option = function (opts) {
        utils.extend(this.options, opts);
    };

    /**
     * get backwards compatible option value, check old name
     */
    proto._getOption = function (option) {
        var oldOption = this.constructor.compatOptions[option];
        return oldOption && this.options[oldOption] !== undefined ?
            this.options[oldOption] : this.options[option];
    };

    Outlayer.compatOptions = {
        // currentName: oldName
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer'
    };

    proto._create = function () {
        // get items from children
        this.reloadItems();
        // elements that affect layout, but are not laid out
        this.stamps = [];
        this.stamp(this.options.stamp);
        // set container style
        utils.extend(this.element.style, this.options.containerStyle);

        // bind resize method
        var canBindResize = this._getOption('resize');
        if (canBindResize) {
            this.bindResize();
        }
    };

    // goes through all children again and gets bricks in proper order
    proto.reloadItems = function () {
        // collection of item elements
        this.items = this._itemize(this.element.children);
    };


    /**
     * turn elements into Outlayer.Items to be used in layout
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - collection of new Outlayer Items
     */
    proto._itemize = function (elems) {

        var itemElems = this._filterFindItemElements(elems);
        var Item = this.constructor.Item;

        // create new Outlayer Items for collection
        var items = [];
        for (var i = 0; i < itemElems.length; i++) {
            var elem = itemElems[i];
            var item = new Item(elem, this);
            items.push(item);
        }

        return items;
    };

    /**
     * get item elements to be used in layout
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - item elements
     */
    proto._filterFindItemElements = function (elems) {
        return utils.filterFindElements(elems, this.options.itemSelector);
    };

    /**
     * getter method for getting item elements
     * @returns {Array} elems - collection of item elements
     */
    proto.getItemElements = function () {
        return this.items.map(function (item) {
            return item.element;
        });
    };

    // ----- init & layout ----- //

    /**
     * lays out all items
     */
    proto.layout = function () {
        this._resetLayout();
        this._manageStamps();

        // don't animate first layout
        var layoutInstant = this._getOption('layoutInstant');
        var isInstant = layoutInstant !== undefined ?
            layoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, isInstant);

        // flag for initalized
        this._isLayoutInited = true;
    };

    // _init is alias for layout
    proto._init = proto.layout;

    /**
     * logic before any new layout
     */
    proto._resetLayout = function () {
        this.getSize();
    };


    proto.getSize = function () {
        this.size = getSize(this.element);
    };

    /**
     * get measurement from option, for columnWidth, rowHeight, gutter
     * if option is String -> get element from selector string, & get size of element
     * if option is Element -> get size of element
     * else use option as a number
     *
     * @param {String} measurement
     * @param {String} size - width or height
     * @private
     */
    proto._getMeasurement = function (measurement, size) {
        var option = this.options[measurement];
        var elem;
        if (!option) {
            // default to 0
            this[measurement] = 0;
        } else {
            // use option as an element
            if (typeof option == 'string') {
                elem = this.element.querySelector(option);
            } else if (option instanceof HTMLElement) {
                elem = option;
            }
            // use size of element, if element
            this[measurement] = elem ? getSize(elem)[size] : option;
        }
    };

    /**
     * layout a collection of item elements
     * @api public
     */
    proto.layoutItems = function (items, isInstant) {
        items = this._getItemsForLayout(items);

        this._layoutItems(items, isInstant);

        this._postLayout();
    };

    /**
     * get the items to be laid out
     * you may want to skip over some items
     * @param {Array} items
     * @returns {Array} items
     */
    proto._getItemsForLayout = function (items) {
        return items.filter(function (item) {
            return !item.isIgnored;
        });
    };

    /**
     * layout items
     * @param {Array} items
     * @param {Boolean} isInstant
     */
    proto._layoutItems = function (items, isInstant) {
        this._emitCompleteOnItems('layout', items);

        if (!items || !items.length) {
            // no items, emit event with empty array
            return;
        }

        var queue = [];

        items.forEach(function (item) {
            // get x/y object from method
            var position = this._getItemLayoutPosition(item);
            // enqueue
            position.item = item;
            position.isInstant = isInstant || item.isLayoutInstant;
            queue.push(position);
        }, this);

        this._processLayoutQueue(queue);
    };

    /**
     * get item layout position
     * @param {Outlayer.Item} item
     * @returns {Object} x and y position
     */
    proto._getItemLayoutPosition = function ( /* item */) {
        return {
            x: 0,
            y: 0
        };
    };

    /**
     * iterate over array and position each item
     * Reason being - separating this logic prevents 'layout invalidation'
     * thx @paul_irish
     * @param {Array} queue
     */
    proto._processLayoutQueue = function (queue) {
        this.updateStagger();
        queue.forEach(function (obj, i) {
            this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
        }, this);
    };

    // set stagger from option in milliseconds number
    proto.updateStagger = function () {
        var stagger = this.options.stagger;
        if (stagger === null || stagger === undefined) {
            this.stagger = 0;
            return;
        }
        this.stagger = getMilliseconds(stagger);
        return this.stagger;
    };

    /**
     * Sets position of item in DOM
     * @param {Outlayer.Item} item
     * @param {Number} x - horizontal position
     * @param {Number} y - vertical position
     * @param {Boolean} isInstant - disables transitions
     */
    proto._positionItem = function (item, x, y, isInstant, i) {
        if (isInstant) {
            // if not transition, just set CSS
            item.goTo(x, y);
        } else {
            item.stagger(i * this.stagger);
            item.moveTo(x, y);
        }
    };

    /**
     * Any logic you want to do after each layout,
     * i.e. size the container
     */
    proto._postLayout = function () {
        this.resizeContainer();
    };

    proto.resizeContainer = function () {
        var isResizingContainer = this._getOption('resizeContainer');
        if (!isResizingContainer) {
            return;
        }
        var size = this._getContainerSize();
        if (size) {
            this._setContainerMeasure(size.width, true);
            this._setContainerMeasure(size.height, false);
        }
    };

    /**
     * Sets width or height of container if returned
     * @returns {Object} size
     *   @param {Number} width
     *   @param {Number} height
     */
    proto._getContainerSize = noop;

    /**
     * @param {Number} measure - size of width or height
     * @param {Boolean} isWidth
     */
    proto._setContainerMeasure = function (measure, isWidth) {
        if (measure === undefined) {
            return;
        }

        var elemSize = this.size;
        // add padding and border width if border box
        if (elemSize.isBorderBox) {
            measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
                elemSize.borderLeftWidth + elemSize.borderRightWidth :
                elemSize.paddingBottom + elemSize.paddingTop +
                elemSize.borderTopWidth + elemSize.borderBottomWidth;
        }

        measure = Math.max(measure, 0);
        this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
    };

    /**
     * emit eventComplete on a collection of items events
     * @param {String} eventName
     * @param {Array} items - Outlayer.Items
     */
    proto._emitCompleteOnItems = function (eventName, items) {
        var _this = this;
        function onComplete() {
            _this.dispatchEvent(eventName + 'Complete', null, [items]);
        }

        var count = items.length;
        if (!items || !count) {
            onComplete();
            return;
        }

        var doneCount = 0;
        function tick() {
            doneCount++;
            if (doneCount == count) {
                onComplete();
            }
        }

        // bind callback
        items.forEach(function (item) {
            item.once(eventName, tick);
        });
    };

    /**
     * emits events via EvEmitter and jQuery events
     * @param {String} type - name of event
     * @param {Event} event - original event
     * @param {Array} args - extra arguments
     */
    proto.dispatchEvent = function (type, event, args) {
        // add original event to arguments
        var emitArgs = event ? [event].concat(args) : args;
        this.emitEvent(type, emitArgs);

        if (jQuery) {
            // set this.$element
            this.$element = this.$element || jQuery(this.element);
            if (event) {
                // create jQuery event
                var $event = jQuery.Event(event);
                $event.type = type;
                this.$element.trigger($event, args);
            } else {
                // just trigger with type if no event available
                this.$element.trigger(type, args);
            }
        }
    };

    // -------------------------- ignore & stamps -------------------------- //


    /**
     * keep item in collection, but do not lay it out
     * ignored items do not get skipped in layout
     * @param {Element} elem
     */
    proto.ignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
            item.isIgnored = true;
        }
    };

    /**
     * return item to layout collection
     * @param {Element} elem
     */
    proto.unignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
            delete item.isIgnored;
        }
    };

    /**
     * adds elements to stamps
     * @param {NodeList, Array, Element, or String} elems
     */
    proto.stamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
            return;
        }

        this.stamps = this.stamps.concat(elems);
        // ignore
        elems.forEach(this.ignore, this);
    };

    /**
     * removes elements to stamps
     * @param {NodeList, Array, or Element} elems
     */
    proto.unstamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
            return;
        }

        elems.forEach(function (elem) {
            // filter out removed stamp elements
            utils.removeFrom(this.stamps, elem);
            this.unignore(elem);
        }, this);
    };

    /**
     * finds child elements
     * @param {NodeList, Array, Element, or String} elems
     * @returns {Array} elems
     */
    proto._find = function (elems) {
        if (!elems) {
            return;
        }
        // if string, use argument as selector string
        if (typeof elems == 'string') {
            elems = this.element.querySelectorAll(elems);
        }
        elems = utils.makeArray(elems);
        return elems;
    };

    proto._manageStamps = function () {
        if (!this.stamps || !this.stamps.length) {
            return;
        }

        this._getBoundingRect();

        this.stamps.forEach(this._manageStamp, this);
    };

    // update boundingLeft / Top
    proto._getBoundingRect = function () {
        // get bounding rect for container element
        var boundingRect = this.element.getBoundingClientRect();
        var size = this.size;
        this._boundingRect = {
            left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
            top: boundingRect.top + size.paddingTop + size.borderTopWidth,
            right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
            bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
        };
    };

    /**
     * @param {Element} stamp
    **/
    proto._manageStamp = noop;

    /**
     * get x/y position of element relative to container element
     * @param {Element} elem
     * @returns {Object} offset - has left, top, right, bottom
     */
    proto._getElementOffset = function (elem) {
        var boundingRect = elem.getBoundingClientRect();
        var thisRect = this._boundingRect;
        var size = getSize(elem);
        var offset = {
            left: boundingRect.left - thisRect.left - size.marginLeft,
            top: boundingRect.top - thisRect.top - size.marginTop,
            right: thisRect.right - boundingRect.right - size.marginRight,
            bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
        };
        return offset;
    };

    // -------------------------- resize -------------------------- //

    // enable event handlers for listeners
    // i.e. resize -> onresize
    proto.handleEvent = utils.handleEvent;

    /**
     * Bind layout to window resizing
     */
    proto.bindResize = function () {
        window.addEventListener('resize', this);
        this.isResizeBound = true;
    };

    /**
     * Unbind layout to window resizing
     */
    proto.unbindResize = function () {
        window.removeEventListener('resize', this);
        this.isResizeBound = false;
    };

    proto.onresize = function () {
        this.resize();
    };

    utils.debounceMethod(Outlayer, 'onresize', 100);

    proto.resize = function () {
        // don't trigger if size did not change
        // or if resize was unbound. See #9
        if (!this.isResizeBound || !this.needsResizeLayout()) {
            return;
        }

        this.layout();
    };

    /**
     * check if layout is needed post layout
     * @returns Boolean
     */
    proto.needsResizeLayout = function () {
        var size = getSize(this.element);
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var hasSizes = this.size && size;
        return hasSizes && size.innerWidth !== this.size.innerWidth;
    };

    // -------------------------- methods -------------------------- //

    /**
     * add items to Outlayer instance
     * @param {Array or NodeList or Element} elems
     * @returns {Array} items - Outlayer.Items
    **/
    proto.addItems = function (elems) {
        var items = this._itemize(elems);
        // add items to collection
        if (items.length) {
            this.items = this.items.concat(items);
        }
        return items;
    };

    /**
     * Layout newly-appended item elements
     * @param {Array or NodeList or Element} elems
     */
    proto.appended = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
            return;
        }
        // layout and reveal just the new items
        this.layoutItems(items, true);
        this.reveal(items);
    };

    /**
     * Layout prepended elements
     * @param {Array or NodeList or Element} elems
     */
    proto.prepended = function (elems) {
        var items = this._itemize(elems);
        if (!items.length) {
            return;
        }
        // add items to beginning of collection
        var previousItems = this.items.slice(0);
        this.items = items.concat(previousItems);
        // start new layout
        this._resetLayout();
        this._manageStamps();
        // layout new stuff without transition
        this.layoutItems(items, true);
        this.reveal(items);
        // layout previous items
        this.layoutItems(previousItems);
    };

    /**
     * reveal a collection of items
     * @param {Array of Outlayer.Items} items
     */
    proto.reveal = function (items) {
        this._emitCompleteOnItems('reveal', items);
        if (!items || !items.length) {
            return;
        }
        var stagger = this.updateStagger();
        items.forEach(function (item, i) {
            item.stagger(i * stagger);
            item.reveal();
        });
    };

    /**
     * hide a collection of items
     * @param {Array of Outlayer.Items} items
     */
    proto.hide = function (items) {
        this._emitCompleteOnItems('hide', items);
        if (!items || !items.length) {
            return;
        }
        var stagger = this.updateStagger();
        items.forEach(function (item, i) {
            item.stagger(i * stagger);
            item.hide();
        });
    };

    /**
     * reveal item elements
     * @param {Array}, {Element}, {NodeList} items
     */
    proto.revealItemElements = function (elems) {
        var items = this.getItems(elems);
        this.reveal(items);
    };

    /**
     * hide item elements
     * @param {Array}, {Element}, {NodeList} items
     */
    proto.hideItemElements = function (elems) {
        var items = this.getItems(elems);
        this.hide(items);
    };

    /**
     * get Outlayer.Item, given an Element
     * @param {Element} elem
     * @param {Function} callback
     * @returns {Outlayer.Item} item
     */
    proto.getItem = function (elem) {
        // loop through items to get the one that matches
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.element == elem) {
                // return item
                return item;
            }
        }
    };

    /**
     * get collection of Outlayer.Items, given Elements
     * @param {Array} elems
     * @returns {Array} items - Outlayer.Items
     */
    proto.getItems = function (elems) {
        elems = utils.makeArray(elems);
        var items = [];
        elems.forEach(function (elem) {
            var item = this.getItem(elem);
            if (item) {
                items.push(item);
            }
        }, this);

        return items;
    };

    /**
     * remove element(s) from instance and DOM
     * @param {Array or NodeList or Element} elems
     */
    proto.remove = function (elems) {
        var removeItems = this.getItems(elems);

        this._emitCompleteOnItems('remove', removeItems);

        // bail if no items to remove
        if (!removeItems || !removeItems.length) {
            return;
        }

        removeItems.forEach(function (item) {
            item.remove();
            // remove item from collection
            utils.removeFrom(this.items, item);
        }, this);
    };

    // ----- destroy ----- //

    // remove and disable Outlayer instance
    proto.destroy = function () {
        // clean up dynamic styles
        var style = this.element.style;
        style.height = '';
        style.position = '';
        style.width = '';
        // destroy items
        this.items.forEach(function (item) {
            item.destroy();
        });

        this.unbindResize();

        var id = this.element.outlayerGUID;
        delete instances[id]; // remove reference to instance by id
        delete this.element.outlayerGUID;
        // remove data for jQuery
        if (jQuery) {
            jQuery.removeData(this.element, this.constructor.namespace);
        }

    };

    // -------------------------- data -------------------------- //

    /**
     * get Outlayer instance from element
     * @param {Element} elem
     * @returns {Outlayer}
     */
    Outlayer.data = function (elem) {
        elem = utils.getQueryElement(elem);
        var id = elem && elem.outlayerGUID;
        return id && instances[id];
    };


    // -------------------------- create Outlayer class -------------------------- //

    /**
     * create a layout class
     * @param {String} namespace
     */
    Outlayer.create = function (namespace, options) {
        // sub-class Outlayer
        var Layout = subclass(Outlayer);
        // apply new options and compatOptions
        Layout.defaults = utils.extend({}, Outlayer.defaults);
        utils.extend(Layout.defaults, options);
        Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);

        Layout.namespace = namespace;

        Layout.data = Outlayer.data;

        // sub-class Item
        Layout.Item = subclass(Item);

        // -------------------------- declarative -------------------------- //

        utils.htmlInit(Layout, namespace);

        // -------------------------- jQuery bridge -------------------------- //

        // make into jQuery plugin
        if (jQuery && jQuery.bridget) {
            jQuery.bridget(namespace, Layout);
        }

        return Layout;
    };

    function subclass(Parent) {
        function SubClass() {
            Parent.apply(this, arguments);
        }

        SubClass.prototype = Object.create(Parent.prototype);
        SubClass.prototype.constructor = SubClass;

        return SubClass;
    }

    // ----- helpers ----- //

    // how many milliseconds are in each unit
    var msUnits = {
        ms: 1,
        s: 1000
    };

    // munge time-like parameter into millisecond number
    // '0.4s' -> 40
    function getMilliseconds(time) {
        if (typeof time == 'number') {
            return time;
        }
        var matches = time.match(/(^\d*\.?\d*)(\w*)/);
        var num = matches && matches[1];
        var unit = matches && matches[2];
        if (!num.length) {
            return 0;
        }
        num = parseFloat(num);
        var mult = msUnits[unit] || 1;
        return num * mult;
    }

    // ----- fin ----- //

    // back in global
    Outlayer.Item = Item;

    return Outlayer;

}));

/*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define([
            'outlayer/outlayer',
            'get-size/get-size'
        ],
            factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('outlayer'),
            require('get-size')
        );
    } else {
        // browser global
        window.Masonry = factory(
            window.Outlayer,
            window.getSize
        );
    }

}(window, function factory(Outlayer, getSize) {

    // -------------------------- masonryDefinition -------------------------- //

    // create an Outlayer layout class
    var Masonry = Outlayer.create('masonry');
    // isFitWidth -> fitWidth
    Masonry.compatOptions.fitWidth = 'isFitWidth';

    var proto = Masonry.prototype;

    proto._resetLayout = function () {
        this.getSize();
        this._getMeasurement('columnWidth', 'outerWidth');
        this._getMeasurement('gutter', 'outerWidth');
        this.measureColumns();

        // reset column Y
        this.colYs = [];
        for (var i = 0; i < this.cols; i++) {
            this.colYs.push(0);
        }

        this.maxY = 0;
        this.horizontalColIndex = 0;
    };

    proto.measureColumns = function () {
        this.getContainerWidth();
        // if columnWidth is 0, default to outerWidth of first item
        if (!this.columnWidth) {
            var firstItem = this.items[0];
            var firstItemElem = firstItem && firstItem.element;
            // columnWidth fall back to item of first element
            this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth ||
                // if first elem has no width, default to size of container
                this.containerWidth;
        }

        var columnWidth = this.columnWidth += this.gutter;

        // calculate columns
        var containerWidth = this.containerWidth + this.gutter;
        var cols = containerWidth / columnWidth;
        // fix rounding errors, typically with gutters
        var excess = columnWidth - containerWidth % columnWidth;
        // if overshoot is less than a pixel, round up, otherwise floor it
        var mathMethod = excess && excess < 1 ? 'round' : 'floor';
        cols = Math[mathMethod](cols);
        this.cols = Math.max(cols, 1);
    };

    proto.getContainerWidth = function () {
        // container is parent if fit width
        var isFitWidth = this._getOption('fitWidth');
        var container = isFitWidth ? this.element.parentNode : this.element;
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var size = getSize(container);
        this.containerWidth = size && size.innerWidth;
    };

    proto._getItemLayoutPosition = function (item) {
        item.getSize();
        // how many columns does this brick span
        var remainder = item.size.outerWidth % this.columnWidth;
        remainder;
        var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
        // round if off by 1 pixel, otherwise use ceil
        var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
        colSpan = Math.min(colSpan, this.cols);
        // use horizontal or top column position
        var colPosMethod = this.options.horizontalOrder ?
            '_getHorizontalColPosition' : '_getTopColPosition';
        var colPosition = this[colPosMethod](colSpan, item);
        // position the brick

        colPosition.y
        var position = {
            x: 132.5 * colPosition.col,
            y: colPosition.y
        };
        // apply setHeight to necessary columns
        var setHeight = colPosition.y + item.size.outerHeight;
        var setMax = colSpan + colPosition.col;

        for (var i = colPosition.col; i < setMax; i++) {
            this.colYs[i] = setHeight;
        }

        return position;
    };

    proto._getTopColPosition = function (colSpan) {
        var colGroup = this._getTopColGroup(colSpan);
        // get the minimum Y value from the columns
        var minimumY = Math.min.apply(Math, colGroup);

        return {
            col: colGroup.indexOf(minimumY),
            y: minimumY,
        };
    };

    /**
     * @param {Number} colSpan - number of columns the element spans
     * @returns {Array} colGroup
     */
    proto._getTopColGroup = function (colSpan) {
        if (colSpan < 2) {
            // if brick spans only one column, use all the column Ys
            return this.colYs;
        }

        var colGroup = [];
        // how many different places could this brick fit horizontally
        var groupCount = this.cols + 1 - colSpan;
        // for each group potential horizontal position
        for (var i = 0; i < groupCount; i++) {
            colGroup[i] = this._getColGroupY(i, colSpan);
        }
        return colGroup;
    };

    proto._getColGroupY = function (col, colSpan) {
        if (colSpan < 2) {
            return this.colYs[col];
        }
        // make an array of colY values for that one group
        var groupColYs = this.colYs.slice(col, col + colSpan);
        // and get the max value of the array
        return Math.max.apply(Math, groupColYs);
    };

    // get column position based on horizontal index. #873
    proto._getHorizontalColPosition = function (colSpan, item) {
        var col = this.horizontalColIndex % this.cols;
        var isOver = colSpan > 1 && col + colSpan > this.cols;
        // shift to next row if item can't fit on current row
        col = isOver ? 0 : col;
        // don't let zero-size items take up space
        var hasSize = item.size.outerWidth && item.size.outerHeight;
        this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

        return {
            col: col,
            y: this._getColGroupY(col, colSpan),
        };
    };

    proto._manageStamp = function (stamp) {
        var stampSize = getSize(stamp);
        var offset = this._getElementOffset(stamp);
        // get the columns that this stamp affects
        var isOriginLeft = this._getOption('originLeft');
        var firstX = isOriginLeft ? offset.left : offset.right;
        var lastX = firstX + stampSize.outerWidth;
        var firstCol = Math.floor(firstX / this.columnWidth);
        firstCol = Math.max(0, firstCol);
        var lastCol = Math.floor(lastX / this.columnWidth);
        // lastCol should not go over if multiple of columnWidth #425
        lastCol -= lastX % this.columnWidth ? 0 : 1;
        lastCol = Math.min(this.cols - 1, lastCol);
        // set colYs to bottom of the stamp

        var isOriginTop = this._getOption('originTop');
        var stampMaxY = (isOriginTop ? offset.top : offset.bottom) +
            stampSize.outerHeight;
        for (var i = firstCol; i <= lastCol; i++) {
            this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
        }
    };

    proto._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var size = {
            height: this.maxY
        };

        if (this._getOption('fitWidth')) {
            size.width = this._getContainerFitWidth();
        }

        return size;
    };

    proto._getContainerFitWidth = function () {
        var unusedCols = 0;
        // count unused columns
        var i = this.cols;
        while (--i) {
            if (this.colYs[i] !== 0) {
                break;
            }
            unusedCols++;
        }
        // fit container to columns that have been used
        return (this.cols - unusedCols) * this.columnWidth - this.gutter;
    };

    proto.needsResizeLayout = function () {
        var previousWidth = this.containerWidth;
        this.getContainerWidth();
        return previousWidth != this.containerWidth;
    };

    return Masonry;

}));

//====================================================================  NONE END ===============================================================

//------- Testimonial start------------------
$(window).on("load resize", function () {
    var width = $(".testimonialclass .flex-control-nav").width();
    $(".testimonialclass .flex-direction-nav").css({
        'width': width + 'px'
    });
});
//------- Testimonial end------------------