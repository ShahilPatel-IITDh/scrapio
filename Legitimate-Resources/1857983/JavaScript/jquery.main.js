; (function detectDeviceType() {
    var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    var documentClass = isTouchDevice ? 'touchdevice' : 'desktopdevice';
    document.documentElement.className += ' ' + documentClass;
})();

if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) || navigator.userAgent.indexOf("Trident/") > -1) {


    $('html').addClass('is-ie');
}

// page init
jQuery(function () {
    // mxm
    initAddRemove();

    initAnchorScrollTo();
    clickAnchorScrollTo();
    initCollapseScrollTo();

    initTableToDiv();
    initKenticoDatePicker();
    initKenticoForm();
    initSearch();
    initSearchFilter();
    initIsotope();

    initInterestCalc();
    initToggleCardCompare();

    initMultiLine();

    initTodoList('.mandatoryitems', 'enable-mandatory');
    initFancyBox();

    initMobileStickyScroll();
    initHoverImages();

    initBreadcrumb();

    clickSmoothScroll('.nav-anchor-smooth a[href^="#"]');
    initScrollUpButton();


    // // extern
    initMobileTable();
    initOpenClose();
    initSlickCarousel();
    initRetinaCover();
    initCloseCollapse();
    initPopover();
    initCustomForms();
    initFixedTable();
    initTBResizeFix();
    initFormValidation();
    initNavDrop();
    initBootstrapDatePicker();
    initYoutubeOverlay();
    initAjaxModal();
    stopVideosOnModalClose();
    initCustomTabs();
    initDisableScroll();
    initProgressAnimation();
    initInputMask();
    initAddItems();
    initAutoShowAlerts();
    initMasterpass();    
});

// mxm
function initScrollUpButton(){
    if (window.matchMedia("(max-width: 768px)").matches) {
            $(window).scroll(function() {
                if ($(this).scrollTop() >= 150) {        // If page is scrolled more than 50px
                    $('#scrollUpButton').fadeIn(200);    // Fade in the arrow
                } else {
                    $('#scrollUpButton').fadeOut(200);   // Else fade out the arrow
                }
            });
            $('#scrollUpButton, .scrollUpButtonWrapper').click(function() {      // When arrow is clicked
                $('body,html').animate({
                    scrollTop : 0                       // Scroll to top of body
                }, 600);
            });
        } else {
            $('#scrollUpButton').hide();
        }
}

var $videoHeader = $('.videoheader');

$videoHeader.each(function(){
    var $video = $(this).find('video');
    var autoplay = $video[0].play();

    if(autoplay !== undefined){
                         
        autoplay.then(function () {

        }).catch(function (error) {
            console.log(error)
        });
    }
});

function initRegisterStartupScript() {
    // do not delete, used directly from UpdatePanels
    initTodoList('.mandatoryitems', 'enable-mandatory');
    initFancyBox();
    initPopover(); 
    selectorSmoothScroll('.complaint-wrapper'); 
    initAddTransaction(); 
    initKenticoDatePicker();
    initBootstrapDatePicker();
}

function initAddTransaction() {
    if ($('[data-list-action]') || $('[data-list-action]').length > 0) {
        if ($('[data-list-action="item"]').length == 0) {
            $('[data-list-action="add"]').trigger('click');
        }
    }
}

function initAddRemove() {
    // add row
    $(document).on('click', '[data-list-action="add"]', function(event) {
        var list = $(event.target).data('list');
        var template = $('[data-list="'+list+'"][data-list-action="template"]');
        var clone = template.clone();
        clone.attr('data-list-action', 'item');
		var select = clone.find("select.jcf-ignore");
		select.removeClass("jcf-ignore");
        clone.show();
        $(event.target).closest('.row').before(clone);
        initKenticoDatePicker();
        initBootstrapDatePicker();
		initCustomForms();
    });

    // remove row
    $(document).on('click', '[data-list-action="remove"]', function (event) {
        event.preventDefault();
        var item = $(event.target).closest('.row-group');
        var isTemplate = item.data('list-action') == 'template';
        if (!isTemplate) {
            item.remove();
        }
    });
}

function initTodoList(checkboxParent, enableTarget) {
    var parent = $(checkboxParent);
    if (!parent || !parent.length) {
        $('[data-enable-fancybox]').addClass('show-fancybox');
        initFancyBox();
    }
    $(document).on('click', '[data-enable="' + enableTarget + '"]', function (event) {
        var parent = $(checkboxParent);
        if (!parent || !parent.length) {
            $('[data-enable="enable-closed"]').removeClass('disabled');
            return;
        }
        var allChecked = parent.find('input[type="checkbox"]').not(':checked').length === 0;
        var errorLabel = parent.find('.EditingFormErrorLabel-custom');
        if (allChecked) {
            errorLabel.addClass('hide');
            $('[data-enable="enable-closed"]').removeClass('disabled');
            $('[data-enable-fancybox]').addClass('show-fancybox');
            initFancyBox();
        } else {
            event.preventDefault();
            errorLabel.removeClass('hide');
            $('[data-enable-fancybox]').removeClass('show-fancybox');
            $('[data-enable-fancybox]').unbind('click.fb-start');
        }
    });
    $(document).on('change', checkboxParent + ' input[type = "checkbox"]', function () {
        var allChecked = $(checkboxParent + ' input[type="checkbox"]').not(':checked').length === 0;
        if (allChecked) {
            $(checkboxParent + ' .EditingFormErrorLabel-custom').addClass('hide');
            $('[data-enable-fancybox]').addClass('show-fancybox');
            initFancyBox();
        }  else {
            $('[data-enable-fancybox]').removeClass('show-fancybox');
            $('[data-enable-fancybox]').unbind('click.fb-start');
        }
    });
}

function initAnchorScrollTo(){
    $(document).ready(function(){
        
        var hashStr = location.hash;        
        if(hashStr.length > 0){
            var head = $(".panel-title" + hashStr);
            if(head.length == 0){
                return;
            }
            setTimeout(function(){
                var hTop = head.offset().top;
                var scrollY = hTop;
                var  navbar = $("header.header .navbar.navbar-default");
                var pos = navbar.css("position");            
                if(pos == "fixed"){
                    scrollY -= navbar.outerHeight(true);
                }

                $("html, body").animate({ scrollTop: scrollY });

                var collapseEl = head.find("[data-toggle='collapse']");
                var sel = collapseEl.attr("href");
                $(sel).collapse("show");                
            },100);
        }
    });
}

function clickAnchorScrollTo() {
  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault();
    var clicked = $(this);
    var target = $(this).attr('href');

    if (target === "#" || $(this).data('toggle') == 'collapse') {
        return;
    }

    var offset = $(target).offset().top;
    
    if ($(target).is(":hidden") || offset == 0) {
        offset = clicked.offset().top;
    }

    var scrolltop = offset - 25;

    if ($(window).width() <= 767) {
        scrolltop = scrolltop - $('header .navbar').outerHeight();
    }

    $('html, body').animate({
        scrollTop: scrolltop
    }, 500);
  });
}

function initCollapseScrollTo() {
    $('.panel').on('shown.bs.collapse', function () {
        var scrolltop = $(this).offset().top;
        $('html, body').animate({
        scrollTop: scrolltop
        }, 500);
    });
}

function clickSmoothScroll(selector) {
    $(selector).on("click", function (event) {
        if ($('[name="' + this.hash.replace("#", "") + '"]').length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $('[name="' + this.hash.replace("#", "") + '"]').offset().top - $('#header .navbar').outerHeight() - 15
            }, 500);
        }
    });
}

function selectorSmoothScroll(targetSelector) {
    var target = $(targetSelector);
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - 15
        }, 500);
    }
}

function initKenticoForm(){
    $(".EditingFormTable").find("input,select,textarea").each(function(){
        var tRef = $(this);
        var pRef = tRef.closest(".tr");
        
        var type = tRef.attr("type");
        if(type == undefined){
            type = "";
        }else{
            type = "-"+type;
        }
        if(tRef.closest(".checkbox-list-vertical,.radio-list-vertical").length > 0){
            type += "-list"

        }
        pRef.addClass("form-control-" + this.nodeName.toLowerCase() +type);

    });
}
function initBreadcrumb() {

    if(Sys.WebForms.PageRequestManager != 'undefined'){
        var prm = Sys.WebForms.PageRequestManager.getInstance();
        prm.add_endRequest(function (s, e) {
            console.log("add_endRequest");
            initCustomForms();
            initKenticoDatePicker();

            initBootstrapDatePicker();

            $(document).trigger("ajaxformreload");

            /*$("input.CalendarTextBox").each(function(){
        
                $(this).datepicker();
            });*/

        });
    }


    $(".breadcrumb li a").on("click", function (event) {
        var vw = $(document).width();

        if (vw < 768) {
            event.preventDefault();
            var pLink = $(event.target).closest("li").prev().find("a");

            window.location.href = pLink.attr("href");

        }
    });
}


function initMasterpass() {
    var mpForm = $("#main-masterpass .EditingFormTable");
    if (mpForm.length == 0) {
        return;
    }


    $(".toggle_sec").on("click", toggleSec);

    $("#main-masterpass .EditingFormTable input[type='radio']").on("change", mpRadioChange);
    $("#main-masterpass .EditingFormTable input[type='radio']").each(function () {
        $(this).trigger("change");
    });

    var submitBtn = mpForm.find("input[type='submit']");
    var form = submitBtn.closest("form");
    console.log(form, submitBtn);
    form.on("submit", validateMasterPass);
}
function validateMasterPass(event) {
    var valid = true;
    var Firstname = $("#main-masterpass .EditingFormTable #Firstname input");
    var Surname = $("#main-masterpass .EditingFormTable #Surname input");
    var StreetAndNum = $("#main-masterpass .EditingFormTable #StreetAndNum input");
    var PostalCode = $("#main-masterpass .EditingFormTable #PostalCode input");
    var Town = $("#main-masterpass .EditingFormTable #Town input");
    var Email = $("#main-masterpass .EditingFormTable #Email input");

    var Terms = $("#main-masterpass .EditingFormTable #Terms input");

    var requiredMsg = $("#ValidationmessageRequired .FieldLabel .EditingFormLabel").html();
    var requiredMsgTerms = $("#ValidationmessageRequiredTerms .FieldLabel .EditingFormLabel").html();

    var errCount = 0;

    var fieldList = [Firstname, Surname, StreetAndNum, PostalCode, Town, Email];

    for (var i = 0; i < fieldList.length; i++) {
        if (fieldList[i].val() != "") {
            valid = false;
            break;
        }
    }
    if (!valid) {
        valid = true;
        for (var i = 0; i < fieldList.length; i++) {
            var field = fieldList[i];
            var pRef = field.closest(".tr");
            pRef.find(".Error").remove();

            if (field.val() == "") {
                valid = false;

                pRef.append("<div class='EditingFormControlNestedControl editing-form-control-nested-control Error'><span class='EditingFormErrorLabel'>" + requiredMsg + "</span></div>");
            }
        }
        var pRef = Terms.closest(".tr");
        pRef.find(".Error").remove();
        if (!Terms.is(":checked")) {

            pRef.append("<div class='EditingFormControlNestedControl editing-form-control-nested-control Error'><span class='EditingFormErrorLabel'>" + requiredMsgTerms + "</span></div>");
            valid = false;
        }
    }




    if (!valid) {
        event.preventDefault();
    }

    //event.preventDefault();
}




function toggleSec(event) {
    var tRef = $(event.target);
    event.preventDefault();
    tRef.closest(".tr").toggleClass("sec");



}
function mpRadioChange(event) {

    var targ = $(event.target);
    var tr = targ.closest(".tr");
    var chk = tr.find("input[type='radio']");
    var idStr = tr.attr("id");
    var idRel = "#" + idStr + "Reason";
    var relField = $(idRel);
    relField.removeClass("visible");
    tr.removeClass("sec");

    if (chk.eq(1).is(":checked")) {
        relField.addClass("visible");
        tr.addClass("sec");
    }

}

function spinalCase(str) {
    // "It's such a fine line between stupid, and clever."
    // --David St. Hubbins
    var regex = /[^a-z]/g;

    // Convert thisIsSpinal to 'this Is Spinal' by searching for
    // lowerUPPER pairs 'sI'. Use matching groups $1 and $2 to 
    // create a space between the two groups.
    var spaced = str.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Convert the spaced string to lower and replace any
    // non a-z chars with '-'
    return spaced.toLowerCase().replace(regex, '-');
}

function tilesSliderHeight(e) {
    var slider = $('.tiles-carousel');
    var $els = slider.find('.post-item');
    $els.height('auto');
    window.setTimeout(function () {
        var height = $els.parent().innerHeight();
        $els.css('height', height + 'px');
    }, 10);
}

// Same height for tiles slider in all browsers
$(function () {
    $(window).on('resize', tilesSliderHeight);
    tilesSliderHeight();
});

// Fix mobile nav behaviour
$(function () {
    var hasTouch = $('html').hasClass('touchdevice');
    var cls = 'hover';
    var $mainNavLinks = $('.main-nav > ul > li');
    $(document).on('click', '.main-nav > ul > li > a', function (e) {
        var $clickedLink = $(e.currentTarget);
        var $li = $clickedLink.closest('li');

        // Don't do this on desktop
        if (!hasTouch) {
            $mainNavLinks.removeClass(cls);
            return;
        }


        var $subNav = $clickedLink.siblings('ul.sub-nav');

        // Close other open sub navis
        $li.siblings().removeClass(cls);

        // Add control class to link to first open subnav, then follow link
        if ($subNav.length && !$li.hasClass(cls)) {
            // Prevent from following link and bubbling to body (which removes class immediately)
            e.preventDefault();
            e.stopPropagation();
            $li.addClass(cls);
            // Register one time event handler, so user can close navi with void click
            $(document).one('click', function () { $mainNavLinks.removeClass(cls); });
        }
    });
});

function initMobileStickyScroll() {
    var sticky = false;


    window.onscroll = function (event) {


        var scrollVal = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollVal > 60 && !sticky) {
            sticky = true;
            $("body").addClass("sticky-nav");
        }
        if (scrollVal <= 60 && sticky) {
            $("body").removeClass("sticky-nav");
            sticky = false;
        }
    }

    window.addEventListener("touchmove", function () {
        window.onscroll();
    });
    window.addEventListener("touchstart", function () {
        window.onscroll();
    });
    window.addEventListener("touchend", function () {
        window.onscroll();
    });

    window.onscroll();

}

function initHoverImages() {
    $('[data-hover-image]').each(function () {
        var img = $(this).prev();
        var hoverImg = $(this);
        $(this).closest('div').hover(function () {
            $(this).find('[data-hover-image]').prev().addClass('hidden');
            $(this).find('[data-hover-image]').removeClass('hidden');
        }, function () {
            $(this).find('[data-hover-image]').addClass('hidden');
            $(this).find('[data-hover-image]').prev().removeClass('hidden');
        });
    });

}


function initFancyBox() {
    if ($(".show-fancybox").length == 0) {
        return;
    }


    $(".show-fancybox").each(function () {
        var tref = $(this);
        //tref.attr("data-fancybox","images");
        tref.attr("href", tref.attr("src"));
        tref.attr("data-caption", tref.attr("alt"));
        //tref.attr("data-fancybox","modal");
        //tref.attr("href","https://www.youtube.com/embed/wTFs52v86XA");
    });
    $(".show-fancybox").fancybox({
        infobar: false,
        buttons: true,
        thumbs: false,
        slideShow: false,
        fullScreen: false,
        parentEl : 'form',
        onActivate: function () {
            $('[data-enable="enable-closed"]').removeClass('disabled');
        }
    });

    /*$("main img").fancybox({
        baseClass   : 'quick-view-container',
        infobar     : false,
        buttons     : false,
        thumbs      : false,
        margin      : 0,
        //padding:30,
        //smallBtn : true
        //infobar      : false,
        //buttons     : false,
        //thumbs      : false,
        //margin: 0,
        baseTpl : '<div class="fancybox-container" role="dialog">' +
                    '<div class="quick-view-content">' +
                        '<div class="quick-view-carousel">' +
                            '<div class="fancybox-slider-wrap"><ul class="fancybox-slider"></ul></div>' +
                        '</div>' +                        
                        '<button data-fancybox-close class="quick-view-close">×</button>' +
                    '</div>' +
                '</div>'
        //autoScale:false,
       

    });*/

}

function initToggleCardCompare() {
    $(document).on("click", ".toggle-card-compare", function (event) {
        event.preventDefault();
        $(".card-compare").toggleClass("behind");
    });

}

function initInterestCalc() {
    var calcEl = $(".interest-calculator");
    if (calcEl.length == 0) {
        return;
    }


    var selectBox = calcEl.find("select");
    var inputText = calcEl.find("input");

    selectBox.on("change", CalculateCredit);
    inputText.on("keydown", InterestKeydown);
    inputText.on("keyup", CalculateCredit);
}
function InterestKeydown(event) {


    var allowedKeys = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 188, 190, 8, 35, 36, 37, 38, 39, 40, 46];
    //console.log(event.keyCode,event.key)
    if (allowedKeys.indexOf(event.keyCode) == -1) {
        event.preventDefault();
        return;
    }
    //CalculateCredit();


}
function CalculateCredit() {
    var calcEl = $(".interest-calculator");
    var selectBox = calcEl.find("select");
    var inputText = calcEl.find("input");


    var procent = calcEl.attr("data-interest-percent");
    //var txtAmount = document.getElementById(InputBetrag);
    var lblTotalInterest = document.getElementById("lblResTotalInterest");
    var lblMonthlyRate = document.getElementById("lblResMonthlyCosts");
    var lblTotalAmount = document.getElementById("lblResTotalCosts");
    //var ddlDuration = document.getElementById(SelectMonths);

    var SelectedVal = selectBox.val();
    var betrag = parseFloat(inputText.val());
    var isValid = !isNaN(betrag);

    //console.log(SelectedVal,betrag,isValid);
    if (SelectedVal > 0 && isValid) {


        var selectedMonths = SelectedVal;
        var totalInterest = 0;
        var rounded = 0;
        if (betrag > 0 && SelectedVal > 1) {
            totalInterest = Math.round((15 * selectedMonths - 1) * betrag * procent * 20) / 20;
        }

        var monthlyRate = (Math.round((totalInterest + betrag) / selectedMonths * 20) / 20);
        lblMonthlyRate.innerHTML = FormatNumber(monthlyRate.toFixed(2)) + " CHF";

        lblTotalAmount.innerHTML = FormatNumber(totalInterest + betrag) + " CHF";
        lblTotalInterest.innerHTML = FormatNumber(totalInterest) + " CHF";
    }
    else {
        lblTotalAmount.innerHTML = "0.00 CHF";
        lblTotalInterest.innerHTML = "0.00 CHF";
        lblMonthlyRate.innerHTML = "0.00 CHF";
    }
    return false;
}

function FormatMoney(n, c, d, t) { c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0; return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ""); };

function FormatNumber(result) {
    return FormatMoney(result, 2, '.', '\'');
}

function initIsotope() {
    var item1 = $("#sitemap_list .navigation-holder .row > .list-item:nth-child(1)");
    var item2 = $("#sitemap_list .navigation-holder .row > .list-item:nth-child(2)");

    item1.append(item2);

    //dont use isotope anymore
    /*return;

    var navHolder = $('.navigation-holder .row');
    $(document).on("click","[href='#sitemap_list']",function(){        
        setTimeout(function(){
            iso.isotope('layout');
        },100);
    });
    
    $('#sitemap_list').addClass('in');
    var iso = navHolder.isotope({
            itemSelector: '.list-item',
            layoutMode: 'masonry'
        });
    $('#sitemap_list').removeClass('in');*/

}

function initSearchFilter() {
    $(document).on('click', '[data-filter]', function () {
        var filterValue = $(this).attr('data-filter');
        $('.filter-item').hide();
        $(filterValue).show();
    });
}


function initSearch() {
    // search bar in navigation

    var cStr = ".search-form.navbar-form.autocomplete-form,.search-form.mobile-form.autocomplete-form";
    var searchForm = $(cStr);

    

    if (searchForm.length == 0) {

        return;
    }


    var searchInput = searchForm.find("input");
    var searchBtn = searchForm.find("button");
    var dataAutoComplete = JSON.parse(searchInput.attr("data-autocomplete"));




    var searchUrl = dataAutoComplete.source;
    var targetContainer = $(dataAutoComplete.appendTo);




    targetContainer.append("<div class='search-result-wrapper'></div>");
    var searchResults = searchForm.find(".search-result-wrapper");

    var searchTimeoutID = 0;

    searchBtn.on("click", function (event) {
        event.preventDefault();
        var searchPath = searchBtn.attr("data-searchpage");
        var param = '';
        if (event.add_param) {
            param = '&' + event.add_param;
        }
        var sInput = $(event.target).prev();
        

        var url = location.origin + "" + searchPath + "?s=" + sInput.val() + param;
        window.location.href = url;
    });
    var mobileSearchInput = $(".search-form.mobile-form input");
    mobileSearchInput.on("focus",function(event){
        $("body").addClass("mobile-search-focus");
        setTimeout(function(){            
            var mNav = $("nav.main-nav")
            mNav.scrollTop(0);            
            var navTop  = mNav.offset().top;
            var tTop  = $(event.target).offset().top;
            var relativeY = tTop - navTop;
            var cScroll = mNav.scrollTop();            
            
            mNav.scrollTop(relativeY);
        },700);
    });    

    mobileSearchInput.on("blur",function(){
        $("body").removeClass("mobile-search-focus");
    });

    var liSelected;
    var liSelectedNumber = 0;

    searchInput.on("keydown", function (event) {

        if (event.keyCode == 13) {
            event.preventDefault();
            //searchBtn.trigger("click");
            $(event.target).next().trigger("click");
            return;
        }

        var li = $('.search-result-wrapper li');
        var liCount = li.length / 2;

        if (event.which === 40) {
            if (liSelected) {

                li.eq(liSelectedNumber).removeClass('search-background');
                liSelectedNumber = liSelectedNumber + 1;
                next = li.eq(liSelectedNumber)

                if (liSelectedNumber < liCount) {
                    liSelected = next.addClass('search-background');
                } else {
                    liSelectedNumber = 0;
                    liSelected = li.eq(liSelectedNumber).addClass('search-background');                  
                }
            } else {
                liSelected = li.eq(liSelectedNumber).addClass('search-background');
            }

            return;

        } else if (event.which === 38) {
            if (liSelected) {
                li.eq(liSelectedNumber).removeClass('search-background');

                if (liSelectedNumber == 0) {
                    liSelectedNumber = liCount - 1;
                }
                else {
                    liSelectedNumber = liSelectedNumber - 1;
                }

                liSelected = li.eq(liSelectedNumber).addClass('search-background');
            } else {
                liSelectedNumber = liCount - 1;
                liSelected = li.eq(liSelectedNumber).addClass('search-background');
            }

            return;
        }

        var input = $(event.target);

        var len = parseInt(input.attr("data-char-trigger-start"));
        var pSize = parseInt(input.attr("data-page-size"));

        searchResults.html("");

        if (input.val().length >= len) {

            clearTimeout(searchTimeoutID);
            searchTimeoutID = setTimeout(function () {
                var sData = {};
                sData.timestamp = new Date().getTime();
                sData.search = input.val();
                sData.count = pSize;
                sData.page = 1;
                sData.type = dataAutoComplete.type;

                $.ajax({
                    url: searchUrl,
                    method: "GET",
                    data: sData,
                    success: function (result) {
                        var buff = "";

                        $.each(result, function (key, values) {
                            if (values.length <= 0 || key == "hasResults") {
                                return;
                            }

                            buff += "<div class='search-result'>";
                            buff += "<h2>" + values[0].type + "</h2>";
                            buff += "<ul>";

                            for (var i = 0; i < values.length; i++) {
                                var item = values[i];
                                buff += "<li class='search-item'><a href='" + item.url + "'>" + item.name + "</a></li>";
                            }

                            buff += "</ul>";
                            buff += "</div>";
                        });

                        searchResults.html(buff);
                    }
                });
            }, 300);

        }      
    });

    //mobile search

    var mobileSearchBtn = $(".mobile-search-btn");
    var mobileSearchContainer = mobileSearchBtn.closest(".open-close");

    mobileSearchBtn.on("click", function (event) {
        if (mobileSearchContainer.hasClass("active")) {
            return;
        }
        mobileSearchContainer.addClass("active");


        event.preventDefault();

        setTimeout(function () {
            searchInput.focus();
        }, 50);

    });

    // search site
    var pageForm = $(".search-form.autocomplete-form.search-form--default");

    if (pageForm.length == 0) {
        return;
    }



    var pageResults = pageForm.find(".page-search-results");
    var resultTmpl = pageResults.html();

    if (resultTmpl == undefined) {
        resultTmpl = "";
    }
    var noResultsText = $(".page-search-results .page-search-no-results").html();
    if (noResultsText == undefined) {
        noResultsText = "";

    }
    var filterTab = pageForm.find(".filter-tab ul");
    var filterTabAllTmpl = filterTab.html();
    var currentFilterTab = null;
    var currentFilterHash = '';
    var pageInput = pageForm.find("input");
    var pageBtn = pageForm.find("button");

    var pageSize = parseInt(pageInput.attr("data-search-page-size"));

    var faqSearchElem = pageInput.closest(".faq-search");
    var faqSearchResultsElem = faqSearchElem.find(".search-results-container");


    var currentSearchStr = null;
    var pageSearchTimeoutID = null;
    var types = [];
    var loadMoreType = null;

    var pgNum = 1;
    var prevResult = null;


    pageInput.on("keydown", function (event) {
        if (event.keyCode == 13) {

            event.preventDefault();
            pageBtn.trigger({
                type: "click",
                extraParam: "enter"
            });
            return;
        }
        clearTimeout(pageSearchTimeoutID);

        pageSearchTimeoutID = setTimeout(function () {
            pageBtn.trigger({
                type: "click"
            });
        }, 300);
    });


    pageBtn.on("click", function (event) {

        event.preventDefault();


        if (faqSearchElem.length > 0) {
            if (event.isTrigger == undefined || event.extraParam != undefined) {
                searchInput.val(pageInput.val());
                searchBtn.trigger({
                    type: "click",
                    add_param: pageInput.attr('data-urlparam')
                });
                return;
            }
        }


        var sData = {};
        sData.timestamp = new Date().getTime();
        sData.search = pageInput.val();

        if (currentSearchStr != sData.search) {
            pgNum = 1;
            prevResult = null;
        }

        currentFilterTab = pageForm.find('.filter-tab .info-item.active > a');
        currentFilterHash = currentFilterTab.length > 0 ? currentFilterTab.attr('href') : '';
        currentSearchStr = sData.search;

        sData.count = pageSize;
        sData.page = pgNum;
        sData.type = dataAutoComplete.type;

        var activeTab = pageInput.attr('data-activetab');

        var searchModel = { 'searchText': sData.search };

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Maxomedia/SearchLog.aspx/Insert",
            data: JSON.stringify(searchModel),
            datatype: "json",
            success: function () {}
        });

        $.ajax({
            url: searchUrl,
            method: "GET",
            data: sData,
            success: function (result) {

                if (pgNum != 1) {

                    var tmp = {};

                    for (var i in prevResult) {
                        if (Array.isArray(prevResult[i])) {
                            if (String(i) != loadMoreType) {
                                result[String(i)] = prevResult[String(i)]
                            }
                        }
                    }
                    result[loadMoreType] = prevResult[loadMoreType].concat(result[loadMoreType]);
                }
                prevResult = result;

                pageResults.html("");
                filterTab.html("");
                types = [];

                var resultCount = 0;



                faqSearchResultsElem.html("");


                $.each(result, function (key, values) {
                    if ((activeTab && key.indexOf(activeTab) == 0) || typeof activeTab === 'undefined') {
                        if (values.length <= 0 || key == "hasResults") {
                            return;
                        }
                        resultCount += values.length;

                        var buff = "";
                        buff += "<ul>";

                        for (var i = 0; i < values.length; i++) {
                            var item = values[i];
                            buff += "<li><a href='" + item.url + "'><strong>" + item.name + "</strong><p>" + item.description + "</p></a></li>";
                        }

                        buff += "</ul>";

                        types.push({ type: values[0].type, page: 1 });



                        if (faqSearchElem.length > 0) {

                            if (key.indexOf("faq") > -1) {
                                var faqBuff = "<div class='search-result-wrapper'><div class='search-result'>";
                                //faqBuff +="<h2>" + values[0].type+"</h2>";
                                faqBuff += "<ul>";
                                for (var i = 0; i < values.length; i++) {
                                    var item = values[i];
                                    faqBuff += "<li><a href='" + item.url + "' target='_self'><span>" + item.name + "</span></a></li>";
                                }
                                faqBuff += "</ul></div></div>";
                            }
                            faqSearchResultsElem.html(faqBuff);







                        } else {
                            var tmpl = resultTmpl;




                            tmpl = tmpl
                                .replace(/\(\(count\)\)/gi, values.length)
                                .replace(/\(\(title\)\)/gi, values[0].type)
                                .replace(/\(\(list\)\)/gi, buff)
                                .replace(/\(\(type\)\)/gi, spinalCase(values[0].type))
                                .replace(/\(\(type_name\)\)/gi, key);

                            tmpl = $(tmpl);

                            // Hide load more button if there are less results than pageSize (5) or show it if there are 5
                            tmpl.find('div.page-search-loadmore').toggle(values.length >= pageSize * pgNum);

                            // Skip irrelevant results if there is an active filter
                            if (currentFilterHash) {
                                if (currentFilterHash !== '#' + spinalCase(values[0].type) && currentFilterHash !== '#all') {
                                    // tmpl.find('.result-type-tmpl').hide();
                                }
                            }

                            pageResults.append(tmpl);
                        }
                    }
                });



                if (result.faq_private.concat(result.faq_business, result.pages_private, result.pages_business).length == 0 && currentSearchStr != "") {
                    var tmpl = resultTmpl;

                    tmpl = tmpl
                        .replace(/\(\(count\)\)/gi, "0")
                        .replace(/\(\(title\)\)/gi, "")
                        .replace(/\(\(list\)\)/gi, "")
                        .replace(/\(\(type\)\)/gi, "")
                        .replace(/\(\(type_name\)\)/gi, "");

                    pageResults.append(tmpl);

                }

                var buff = "";

                for (var i = 0; i < types.length; i++) {
                    var item = types[i].type;
                    var spinalItem = spinalCase(item);
                    var activeClass = currentFilterHash === '#' + spinalItem ? ' active' : '';
                    buff += "<li class='info-item" + activeClass + " info-item--bordered'><a class='item-box' aria-controls='all' role='tab' data-toggle='tab' data-filter='.filter-" + spinalItem + "' href='#" + spinalItem + "'>" + item + "</a></li>";
                }
                filterTab.append(filterTabAllTmpl);
                filterTab.append(buff);
                if (currentFilterTab.length > 0) {
                    var filterValue = currentFilterTab.attr('data-filter');
                    $('.filter-item').hide();
                    $(filterValue).show();
                }

                if (resultCount == 0) {
                    $(".page-search-loadmore").addClass("hidden");

                    $(".page-search-results .page-search-summary").addClass("hidden");
                    var currNoResultsText = noResultsText.split("((searchterm))").join(currentSearchStr);
                    $(".page-search-results .page-search-no-results").removeClass("hidden").html(currNoResultsText);
                }


            }
        });
    });

    $(document).on("click", ".page-search-loadmore a", function (event) {
        loadMoreType = $(this).attr("data-type-name");
        pgNum = (prevResult[loadMoreType].length / pageSize) + 1;
        event.preventDefault();
        pageBtn.trigger("click");
    });

    pageBtn.trigger("click");


}


function initKenticoDatePicker() {
    $('.complaint-wrapper input.CalendarTextBox').each(function (index) {
        $(this).attr("readonly", "readonly");        
    });

    $('input.CalendarTextBox').each(function (index) {
        //$(this).attr('data-tb-datepicker', JSON.stringify({format: "dd.mm.yyyy", autoclose: true, closeOnDateSelect: true, container: '#Birthdate' }));
        //$(this).attr('data-tb-datepicker', JSON.stringify({ autoclose: true, closeOnDateSelect: true, container: '#Birthdate' }));
        var id = $(this).attr("id") + "-datepicker-" + index;
        $(this).closest(".tr").attr("id", id);
        $(this).attr('data-tb-datepicker', JSON.stringify({format: "dd.mm.yyyy", autoclose: true, closeOnDateSelect: true, container: "#" + id }));
    });
}

function initTableToDiv() {
    $('table.pricing-table').each(function (i, tableEl) {
        var table = $(tableEl);
        var isFixed = table.hasClass('js-fixed-table');

        // replace table tags with divs
        table.wrap('<div class="table-holder pricing-table-holder table-holder_' + i + '" data-table-holder=""></div>');
        table.replaceWith(
            table.closest('.table-holder').html()
                .replace(/<table/gi, "<div class='table pricing-table' data-table")
                .replace(/<\/table>/gi, "</div>'")

                .replace(/<thead/gi, "<div class='table-header' data-table-header")
                .replace(/<\/thead>/gi, "</div>")

                .replace(/<th/gi, "<div class='table-item table-item--header' data-table-item")
                .replace(/<\/th>/gi, "</div>")

                .replace(/<tbody/gi, "<div class='table-body' data-table-body")
                .replace(/<\/tbody>/gi, "</div")

                .replace(/<tr/gi, "<div class='table-row' data-table-row")
                .replace(/<\/tr>/gi, "</div>")

                .replace(/<td/gi, "<div class='table-item' data-table-item")
                .replace(/<\/td>/gi, "</div>")
        );

        // add fluid container
        $('.table-holder_' + i + ' .table-header, .table-holder_' + i + ' .table-body').wrapInner('<div class="container-fluid"></div>');

        // add fixed stuff
        if (isFixed) {
            $('.table-holder_' + i + ' .pricing-table').attr('data-fixed-table', '');
            $('.table-holder_' + i + ' .pricing-table .table-header').attr('data-fixed-header', '');
        }

        // make first td ready for title
        $('.table-holder .table-body .table-row .table-item:first-child').addClass('table-item--title').wrapInner('<strong></strong>');
    });

}

// extern
function initAutoShowAlerts() {
    jQuery('[data-sliding-alert]').each(function () {
        var holder = jQuery(this);
        var autoShowTime = holder.data('slidingAlert').autoShowTime;
        setTimeout(function () {
            holder.collapse('show');
        }, autoShowTime);
    });
}

function initAddItems() {
    jQuery('[data-add-items]').addCloneItem({
        btnAdd: '[data-btn-add]',
        baseItem: '[data-base-item]',
        maxCloneCount: 10,
        onAdd: function (self, item) {
            item.find('input').each(function () {
                this.value = this.defaultValue;
            });
            initInputMask(item);
            refreshNameIndex(item, this.addedItems.length + 1);
        },
        onRemove: function (self, item) {
            var itemIndex = this.addedItems.index(item);

            for (var i = itemIndex + 1; i < this.addedItems.length; i++) {
                refreshNameIndex(this.addedItems.eq(i), i);
            }
        }
    });
    function refreshNameIndex(item, index) {
        item.find('input[name]').each(function () {
            var field = jQuery(this);
            var fieldName = field.attr('name');
            if (fieldName) {
                field.attr('name', fieldName.replace(/\[[0-9]\]+/, '[' + index + ']'));
            }
        });
    }
}

function initInputMask(context) {
    if (context) {
        if (typeof context === 'string') {
            context = jQuery(context);
        }
    } else {
        context = jQuery('body');
    }
    context.find('input[data-inputmask]').inputmask()
        .on('mouseleave', function () {
            jQuery(this).trigger('mouseenter');
        })
        .on('blur', function () {
            jQuery(this).trigger('mouseenter');
        })
        .trigger('mouseenter');
}

function initProgressAnimation() {
    jQuery('[data-progress]').progressAnimation({
        activeClass: 'loading',
        startAnimationBtn: '[data-start-animation]',
        progressBlock: '[data-progress-block]'
    }).on('animEnd.progressAnimation', function (e, self) {
        var defaultAnimSpeed = self.progressBlock.css('animation-duration');

        self.progressBlock.css({ 'animation-duration': '0s' });
        self.holder.removeClass(self.options.activeClass);
        self.progressBlock.css({ 'animation-duration': defaultAnimSpeed });
    });
}

function initDisableScroll() {
    jQuery('#header_dropdown_menu').disablePageScroll({
        attachEventsOnInit: false,
        enableScrollBlock: '.main-nav'
    });
}

function initCustomTabs() {
    var win = jQuery(window);
    var isMobileWidth = (function () {
        var query = '(max-width: 767px)';
        var nativeMatchMedia = false;

        if (window.matchMedia) {
            if (window.Window && window.matchMedia === Window.prototype.matchMedia) {
                nativeMatchMedia = true;
            } else if (window.matchMedia.toString().indexOf('native') > -1) {
                nativeMatchMedia = true;
            }
        }

        return function () {
            if (window.matchMedia && nativeMatchMedia) {
                return matchMedia(query).matches;
            } else if (window.styleMedia) {
                return styleMedia.matchMedium(query);
            } else if (window.media) {
                return media.matchMedium(query);
            } else {
                return window.innerWidth < 767;
            }
        };
    })();

    jQuery('[data-custom-tabset]').customTabset({
        activeClass: 'active',
        addToParent: true,
        animSpeed: 300,
        tabLinks: '[data-tab-link]',
        attrib: 'href',
        event: 'click',
        tabHiddenClass: 'js-tab-hidden',
        tabActiveClass: 'js-tab-active',
        onInit: function (self) {
            self.tabsHolder = self.$holder.closest('[data-custom-tabs-holder]');
            self.tabsHolder.on('click', '[data-btn-close]', function (e) {
                e.preventDefault();
                var currentMode = self.getCurrentMode();
                self.hideTab(jQuery(this).closest('[data-js-tab]'), {
                    mode: currentMode,
                    effect: 'slide'
                });
            });
        },
        onOpenedClick: function (self, $tab) {
            if (isMobileWidth()) {
                self.hideTab($tab, {
                    mode: 'multiline',
                    effect: 'slide'
                });
            }
        },
        onTabShow: function (self, tab) {
            clearTimeout(self.resizeTimer);
            self.resizeTimer = setTimeout(function () {
                win.trigger('refreshFixedTable');
            }, 100);


            var offset = 0;
            if (isMobileWidth()) {
                offset -= 87;
            }

            if (window.location.hash == "#faqdetail") {
                history.replaceState({}, document.title, window.location.href.split('#')[0]);

                $('html,body').animate({
                    scrollTop: $("#faqdetail").offset().top + offset
                }, 200);


            } else {


                $('html,body').animate({
                    //scrollTop: $(".tab-item.active").offset().top + offset
                }, 200);
            }




        },
        onTabHide: function (self, tab) {
            clearTimeout(self.resizeTimer);
            self.resizeTimer = setTimeout(function () {
                win.trigger('refreshFixedTable');
            }, 100);
        }
    });
}

function stopVideosOnModalClose() {
    jQuery(document).on('hidden.bs.modal', function (e) {
        var modalBlock = jQuery(e.target);
        // stop html5 video
        modalBlock.find('video').each(function () {
            this.pause();
        });
        // stop yutube iframe video
        modalBlock.find('[data-youtube-overlay] iframe').each(function () {
            var iframe = jQuery(this);
            iframe.off('load');
            playPauseIframeYoutube(iframe, 'pauseVideo');
        });
        if (modalBlock.hasClass('js-ajax-modal')) {
            modalBlock.removeData('bs.modal').find('.modal-content').empty();
        }
    });
}

function initAjaxModal() {
    jQuery(document).on('loaded.bs.modal', function (e) {
        e.preventDefault();
        jQuery(e.target).addClass('js-ajax-modal').find('.bg-cover').retinaCover();
    });
}

function initYoutubeOverlay() {
    jQuery(document).on('click', '[data-youtube-overlay] [data-play-button]', function (e) {
        e.preventDefault();
        var videoHolder = jQuery(this).closest('[data-youtube-overlay]');
        var videoIframe = videoHolder.find('iframe');

        videoHolder.addClass('js-video-active');
        playPauseIframeYoutube(videoIframe, 'playVideo', function () {
            videoIframe.one('load', function () {
                playPauseIframeYoutube(videoIframe, 'playVideo');
            });
        });
    });
}

function playPauseIframeYoutube(iframe, func, fallback) {
    if (!iframe.length) return;

    var youtubeCommand;
    if (iframe[0].contentWindow && iframe[0].contentWindow.postMessage) {
        youtubeCommand = JSON.stringify({ event: 'command', func: func });
        iframe[0].contentWindow.postMessage(youtubeCommand, 'https://www.youtube.com');

    } else if (jQuery.isFunction(fallback)) {
        fallback(iframe);
    }
}

function initBootstrapDatePicker() {

    var lang = $("body").attr("lang");

    if (lang == undefined) {
        console.warn("lang attribute missing on BODY tag");
    }

    var defaultOptions = {
        weekStart: 1,
        language: lang,
    };
    jQuery('[data-tb-datepicker]').each(function () {
        var dpInput = jQuery(this);
        var options = jQuery.extend(defaultOptions, {}, dpInput.data('tbDatepicker'));

        var datepicker = dpInput.datepicker(options);
        if (window.innerWidth < 768) {
            dpInput.datepicker().on('show', function () {
                $(document).unbind('touchstart');
            });
        }
    });
}

function initNavDrop() {
    if ($(window).width() >= 1365) {
        return;
    }
    var win = jQuery(window);
    var doc = jQuery(document);
    var page = jQuery('body');
    var openedClass = 'js-opened-state';

    var lastWinScroll = null;


    jQuery('#header_dropdown_menu').on('show.bs.collapse', function (e) {

        lastWinScroll = win.scrollTop();
        
        
        var collapseDrop = jQuery(this);
        var opener = jQuery('[data-toggle="collapse"][data-target="#' + collapseDrop.attr('id') + '"]');
        var scrollHolder = collapseDrop.find('.main-nav');

        page.addClass(openedClass);



        //scrollHolder.focus();

        doc.on('click touchstart', outsideClickHandler);
        collapseDrop.data('outsideClickHandler', outsideClickHandler);
        collapseDrop.disablePageScroll('attachEvents');

        $(".dropdown--secondary").on("hidden.bs.collapse hide.bs.collapse",function(){            
            setMaxHeight(scrollHolder);
        });

        setTimeout(function () {
            setMaxHeight(scrollHolder);
            win.on('resize.scroll-height orientationchange.scroll-height', function () {
                setMaxHeight(scrollHolder);
            });
        }, 10);
        
        function outsideClickHandler(e) {
            var target = jQuery(e.target);
            // sub sub menu fix
            if (e.type == "touchstart") {
                var isTouchDevice = $("html").hasClass("touchdevice");
                if (isTouchDevice) {
                    if ($(e.target).closest("ul").parent().parent().hasClass("sub-nav")) {
                        var url = target.attr("href");
                        if (url != undefined) {
                            if (url.toLowerCase().indexOf("http") == 0) {
                                window.location.href == url;
                            } else {
                                window.location.pathname = url;
                            }
                            return;
                        }

                    }
                }
            }

            if (!target.closest(collapseDrop).length && !target.closest(opener).length) {
                collapseDrop.collapse('hide');
            }
        }
    }).on('shown.bs.collapse', function (e) { 
            var mNav = $("nav.main-nav")
        setMaxHeight(mNav);     
        mNav.css("overflow-y","hidden");
        mNav.css("overflow-y","scroll");

        
        

    }).on('hide.bs.collapse', function (e) {        
        $(".main-nav").addClass("start-hide");        
        if($(e.target).attr("id") !="header_dropdown_menu"){
            return;
        }

        var collapseDrop = jQuery(this);
        page.removeClass(openedClass);
        win.off('.scroll-height');
        if (collapseDrop.data('outsideClickHandler')) {
            doc.off('click touchstart', collapseDrop.data('outsideClickHandler'));
            collapseDrop.removeData('outsideClickHandler');
            collapseDrop.disablePageScroll('detachEvents');
        }
        win.scrollTop(lastWinScroll);
    }).on("hidden.bs.collapse",function(e){
        $(".main-nav").removeClass("start-hide");        
        
        win.scrollTop(lastWinScroll);
    });

    function setMaxHeight(blocks) {
        var winTop = win.scrollTop();
        var winHeight = getWindowHeight();
        blocks.each(function () {
            var block = jQuery(this);
            var blockTop = block.offset().top;
            var mh =  winHeight - blockTop + winTop;
            block.css({ maxHeight: mh});            
            //console.log(mh);
        });
    }
    function getWindowHeight() {
        return window.innerHeight || document.documentElement.clientHeight;
    }
}

function initFormValidation() {
    jQuery('[data-form-validation]').formValidation({
        errorClass: 'input-error',
        errorFormClass: 'form-invalid',
        addClassToParent: '[data-validation-item]'
    });
}



// initialize custom form elements
function initCustomForms() {
    jcf.setOptions('Select', {
        wrapNative: false,
        fakeDropInBody: false,
        dropHideDelay: 300
    });
    jcf.replaceAll();
}

function initTBResizeFix() {
    var win = jQuery(window);

    jQuery(document).on('hidden.bs.tab shown.bs.tab shown.bs.collapse hidden.bs.collapse', function (event) {
        win.trigger('resize');
    });
}

// create mobile carousel from desktop table
function initMobileTable() {
    jQuery('[data-table-holder]').each(function () {
        var holder = jQuery(this);
        var table = holder.find('[data-table]');
        var rows = table.find('[data-table-row]');
        var columnsCount = rows.eq(0).find('[data-table-item]').length;
        var columns = [];
        var mobileTable = jQuery('<div class="js-mobile-table carousel"></div>').addClass(table.prop('className'));
        var galleryControls = jQuery('<div class="gallery-controls"></div>').appendTo(mobileTable);

        // create columns list
        rows.each(function () {
            var row = jQuery(this);
            var cells = row.find('[data-table-item]');

            for (var i = 1; i < columnsCount; i++) {
                if (!columns[i]) columns[i] = jQuery();
                columns[i] = columns[i].add(cells.eq(0).clone().addClass('js-mobile-table-title'));
                columns[i] = columns[i].add(cells.eq(i).clone());
            }
        });

        // append elements to DOM
        columns.forEach(function (columnItems) {
            var column = jQuery('<div class="js-mobile-table-column"></div>');
            column.append(columnItems).appendTo(mobileTable);
        });
        mobileTable.insertAfter(table);

        // init carousel slider
        if (jQuery.fn && jQuery.isFunction(jQuery.fn.slick)) {
            // handle layout resize
            ResponsiveHelper.addRange({
                '..767': {
                    on: function () {
                        mobileTable.slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: false,
                            prevArrow: '<a href="#" class="btn-prev"></a>',
                            nextArrow: '<a href="#" class="btn-next"></a>',
                            dots: true,
                            slide: '.js-mobile-table-column',
                            appendDots: galleryControls,
                            appendArrows: galleryControls,
                            dotsClass: 'slick-dots'
                        });
                    }
                },
                '768..': {
                    on: function () {
                        mobileTable.each(function () {
                            if (this.slick && jQuery.isFunction(this.slick.unslick)) this.slick.unslick();
                        });
                    }
                }
            });
        }
    });
}

// initialize fixed blocks on scroll
function initFixedTable() {
    var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    if (isTouchDevice) return;

    jQuery('[data-fixed-table]').fixedTable({
        slideBlock: '[data-fixed-header]',
        positionType: 'fixed',
        fixedActiveClass: 'table-header--fixed',
        fakeBlock: '<div class="fake-table-header"></div>',
        extraBottom: 0,
        onResize: function (self) {
            // self.options.extraBottom = self.slideBlock.outerHeight(true);
        }
    });
}

function initPopover() {
    jQuery('[data-toggle="popover"]').popover({
        html: true,
        placement: function (ref) {
            var pos = $(this.$element).offset();
            var rect = this.$element[0].getBoundingClientRect();
            var wh = $(window).height();
            if (rect.top > wh / 2) {
                return "top";
            }
            return "bottom";
        }
    });
}


function initCloseCollapse() {
    jQuery(document).on('click', 'a[data-close="tab"]', function (e) {

        e.preventDefault();
        var btn = jQuery(this);
        var tab = btn.closest('[data-tab-panel]');
        var accordion = btn.closest('[data-accordion-panel]');

        hideTab(tab);
        hideAccoddion(accordion);

    });
    function hideTab(tab) {
        var tabOpener;

        if (!tab.length) return;
        setTimeout(function () {
            tab.removeClass('active');
            win.trigger('resize');
        }, 150);

        tab.removeClass('in');
        tabOpener = jQuery('a[data-toggle="tab"][href="#' + tab.attr("id") + '"]');
        tabOpener.attr('aria-expanded', false).closest('li').removeClass('active');
    }
    function hideAccoddion(box) {

        box.collapse('hide');
    }
}

function initRetinaCover() {
    jQuery('.bg-cover').retinaCover();
}

function initMultiLine() {
    jQuery(document).on('keydown', '.jump-next-line', function(e)
    {
        console.log(e.keyCode + " " + e.key);
        if (e.keyCode == 13)//Enter
        {
            e.preventDefault();
            $(this).next('.jump-next-line').focus();
        }
        else if (e.keyCode == 8 && $(this).val() == '')//Backspace
        {
            $(this).prev('.jump-next-line').focus();
        }
        else if (e.keyCode == 38)//Up
        {
            $(this).prev('.jump-next-line').focus();
        }
        else if (e.keyCode == 40)//Down
        {
            $(this).next('.jump-next-line').focus();
        }
        else if (e.keyCode > 64 && $(this).val().length >= $(this).prop("maxlength"))
        {
            e.preventDefault();
            var next = $(this).next('.jump-next-line');
            if (next.length > 0)
            {
                next.focus();
                if (next.val() == '')
                {
                    next.val(e.key);
                }
            }
        }
    });
}

// slick init
function initSlickCarousel() {
    jQuery('[data-slick-carousel]').each(function () {
        var holder = jQuery(this);
        var slickSlider = holder.find('[data-slideset]');
        var controlsHolder = holder.find('[data-gallery-controls]');

        slickSlider.slick({
            slidesToScroll: 1,
            prevArrow: '<a href="#" class="btn-prev"></a>',
            nextArrow: '<a href="#" class="btn-next"></a>',
            dots: true,
            slide: '.tiles-slide',
            appendDots: controlsHolder,
            appendArrows: controlsHolder,
            dotsClass: 'slick-dots',
            adaptiveHeight: false,
            centerMode: true,
            centerPadding: '25px',
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 482,
                    settings: {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: false,
                        centerPadding: '160px'
                    }
                },
                {
                    breakpoint: 786,
                    settings: {
                        centerMode: false,
                        slidesToScroll: 3,
                        slidesToShow: 3,
                        variableWidth: false
                    }
                }
            ]
        });
    });
    jQuery('[data-slick-carousel-masterpass]').each(function () {
        var holder = jQuery(this);
        var slickSlider = holder.find('[data-slideset]');
        var controlsHolder = holder.find('[data-gallery-controls]');

        slickSlider.slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            prevArrow: '<a href="#" class="btn-prev"></a>',
            nextArrow: '<a href="#" class="btn-next"></a>',
            dots: true,
            slide: '.tiles-slide',
            asNavFor: '[data-slick-carousel-masterpassmobile] [data-slideset]',
            appendDots: controlsHolder,
            appendArrows: controlsHolder,
            dotsClass: 'slick-dots',
            adaptiveHeight: false,
            centerMode: false,
            centerPadding: '25px',
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: false,
                        centerPadding: '160px'
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        centerMode: false,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: false
                    }
                }
            ]
        });
    });
    jQuery('[data-slick-carousel-masterpassmobile]').each(function () {
        var holder = jQuery(this);
        var slickSlider = holder.find('[data-slideset]');

        slickSlider.slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            asNavFor: '[data-slick-carousel-masterpass] [data-slideset]',
            slide: '.tiles-slide',
            dotsClass: 'slick-dots',
            adaptiveHeight: false,
            arrows: false,
            centerMode: false,
            centerPadding: '25px',
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: false,
                        centerPadding: '160px'
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        centerMode: false,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: false
                    }
                }
            ]
        });
    });
    jQuery('[data-large-carousel-holder]').each(function () {
        var holder = jQuery(this);
        var image = holder.find('[data-large-carousel-image]>[data-slideset]');
        var content = holder.find('[data-large-carousel-content]>[data-slideset]');
        var slickImage = holder.find(image);
        var slickContent = holder.find(content);
        var controlsHolder = holder.find('[data-gallery-controls]');

        slickImage.slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: false,
            slide: '.image-slide',
            fade: true,
            cssEase: 'ease-in-out',
            swipeToSlide: true,
            swipe: true,
            asNavFor: content
        });
        slickContent.slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            infinite: true,
            adaptiveHeight: true,
            prevArrow: '<a href="#" class="btn-prev"></a>',
            nextArrow: '<a href="#" class="btn-next"></a>',
            dots: true,
            slide: '.gallery-slide',
            appendDots: controlsHolder,
            appendArrows: controlsHolder,
            dotsClass: 'slick-dots',
            fade: true,
            cssEase: 'ease-in-out',
            asNavFor: image
        });
    });

    jQuery('[data-slick-carousel-images]').each(function () {
        var holder = jQuery(this);
        var slickSlider = holder.find('[data-slideset]');
        var controlsHolder = holder.find('[data-gallery-controls]');

        slickSlider.slick({
            prevArrow: '<a href="#" class="btn-prev"></a>',
            nextArrow: '<a href="#" class="btn-next"></a>',
            dots: true,
            slide: '.tiles-slide',
            appendDots: controlsHolder,
            appendArrows: controlsHolder,
            dotsClass: 'slick-dots'
        });

        jQuery('[data-slick-carousel-logos]').each(function () {
            var holder = jQuery(this);
            var slickSlider = holder.find('[data-slideset]');
            var controlsHolder = holder.find('[data-gallery-controls]');

            slickSlider.slick({
                slidesToScroll: 1,
                prevArrow: '<a href="#" class="btn-prev"></a>',
                nextArrow: '<a href="#" class="btn-next"></a>',
                dots: true,
                slide: '.tiles-slide',
                appendDots: controlsHolder,
                appendArrows: controlsHolder,
                dotsClass: 'slick-dots',
                mobileFirst: true,
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToScroll: 2,
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 1023,
                        settings: {
                            slidesToScroll: 4,
                            slidesToShow: 4,
                        }
                    }
                ]
            });
        });
    });




    $(".slick-slider img").on("load", function () {
        clearTimeout(window.imgLoadIntervalID);
        window.imgLoadIntervalID = setTimeout(function () {
            $(window).trigger("resize");
        }, 150);
    });


}

// add classes on hover/touch
function initCustomHover() {
    jQuery('.nav li').touchHover();
}

// open-close init
function initOpenClose() {
    var win = jQuery(window);
    jQuery('[data-open-close]').openClose({
        hideOnClickOutside: true,
        activeClass: 'active',
        opener: '[data-open-close-opener]',
        slider: '[data-open-close-slide]',
        animSpeed: 300,
        effect: 'none',
        animEnd: function () {
            win.trigger('resize');
        }
    });
}

// AddClonedItem plugin
; (function ($, window) {
    'use strict';

    // custom map init
    function AddCloneItem(opt) {
        this.options = $.extend({
            btnAdd: '[data-btn-add]',
            baseItem: '[data-base-item]',
            clonedClass: 'js-item-cloned',
            maxCloneCount: 3,
            animSpeed: 300,
            maxCountClass: 'js-max-count-state',
            btnRemove: '[data-btn-remove]'
        }, opt);
        this.init();
    }
    AddCloneItem.prototype = {
        init: function () {
            if (this.options.holder) {
                $.data(this.options.holder, 'AddCloneItem', this);
                this.findElements();
                this.attachEvents();
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
            this.baseItem = this.holder.find(this.options.baseItem);
            this.btnAdd = this.holder.find(this.options.btnAdd);
            this.addedItems = $();
        },
        attachEvents: function () {
            if (!this.initial) {
                this.bindHandlers();
                this.initial = true;
            }
            this.btnAdd.on('click', this.onAddHandler);
            this.holder.on('click', this.options.btnRemove, this.onRemoveHandler);
        },
        detachEvents: function () {
            this.btnAdd.off('click', this.onAddHandler);
            this.holder.off('click', this.options.btnRemove, this.onRemoveHandler);
        },
        addItem: function () {
            var item;
            if (this.addedItems.length < this.options.maxCloneCount) {
                item = this.baseItem.clone().removeAttr('data-base-item').addClass(this.options.clonedClass).hide();
                this.makeCallback('onAdd', this, item);
                item
                    .insertAfter(this.getInsertTarget())
                    .slideDown(this.options.animSpeed);
                this.addedItems = this.addedItems.add(item);
                this.refreshState();
            }
        },
        getInsertTarget: function () {
            return this.addedItems.length ? this.addedItems.eq(this.addedItems.length - 1) : this.baseItem;
        },
        removeItem: function (item) {
            item.slideUp(this.options.animSpeed, function () {
                item.remove();
            });
            this.makeCallback('onRemove', this, item);
            this.addedItems = this.addedItems.not(item);
            this.refreshState();
        },
        onAddHandler: function (e) {
            e.preventDefault();
            this.addItem();
        },
        onRemoveHandler: function (e) {
            e.preventDefault();
            var item = jQuery(e.currentTarget).closest('.' + this.options.clonedClass);
            if (this.addedItems.index(item) !== -1) {
                this.removeItem(item);
            }
        },
        refreshState: function () {
            if (this.addedItems.length < this.options.maxCloneCount) {
                this.holder.removeClass(this.options.maxCountClass);
            } else {
                this.holder.addClass(this.options.maxCountClass);
            }
        },
        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        bindHandlers: function () {
            var self = this;
            $.each(self, function (propName, propValue) {
                if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
                    self[propName] = function () {
                        return propValue.apply(self, arguments);
                    };
                }
            });
        },
        destroy: function () {
            this.detachEvents();
            this.holder.removeData('AddCloneItem');
        }
    };

    // jQuery plugin interface
    $.fn.addCloneItem = function (options) {
        var args = arguments;
        return this.each(function () {
            var params;
            var instance;
            if (typeof options === 'string') {
                instance = $(this).data('AddCloneItem');
                if (instance && $.isFunction(instance[options])) {
                    instance[options].apply(instance, Array.prototype.slice.call(args, [1]));
                }
            } else {
                params = $.extend({}, options, { holder: this });
                new AddCloneItem(params);
            }
        });
    };

    // module exports
    window.AddCloneItem = AddCloneItem;
}(jQuery, this));

// Progress Animation plugin
; (function ($, window) {
    'use strict';

    var eventsName = '.progressAnimation';

    function ProgressAnimation(opt) {
        this.options = $.extend({
            activeClass: 'js-active-progress',
            startAnimationBtn: '.js-btn-start'
        }, opt);
        this.init();
    }
    ProgressAnimation.prototype = {
        init: function () {
            if (this.options.holder) {
                $.data(this.options.holder, 'ProgressAnimation', this);
                this.findElements();
                this.attachEvents();
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
            $.extend(this.options, this.holder.data('progress'));
            this.progressBlock = this.options.progressBlock ? this.holder.find(this.options.progressBlock) : this.holder;
            if (!this.progressBlock.length) this.progressBlock = this.holder;
            this.startAnimationBtn = this.holder.find(this.options.startAnimationBtn);
        },
        attachEvents: function () {
            if (!this.initial) {
                this.bindHandlers();
                this.initial = true;
            }
            this.startAnimationBtn.on('click' + eventsName, this.onBtnClick);
            this.holder.on('start' + eventsName, this.startAnimation);
        },
        detachEvents: function () {
            this.startAnimationBtn.off('click' + eventsName, onBtnClick);
            this.holder.off('start' + eventsName, this.startAnimation);
        },
        onBtnClick: function (e) {
            e.preventDefault();
            this.startAnimation();
        },
        startAnimation: function () {
            var self = this;
            this.holder.removeClass(this.options.activeClass);
            this.holder.trigger('animStart' + eventsName, this);
            CssAnimationHelper.addAnimation({
                item: this.progressBlock,
                type: 'animation',
                complete: function (element) {
                    self.holder.trigger('animEnd' + eventsName, self);
                }
            });
            this.holder.addClass(this.options.activeClass);
        },
        bindHandlers: function () {
            var self = this;
            $.each(self, function (propName, propValue) {
                if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
                    self[propName] = function () {
                        return propValue.apply(self, arguments);
                    };
                }
            });
        },
        destroy: function () {
            this.detachEvents();
            this.holder
                .removeData('ProgressAnimation')
                .removeClass(this.options.activeClass);
        }
    };

    // jQuery plugin interface
    $.fn.progressAnimation = function (options) {
        var args = arguments;
        return this.each(function () {
            var params;
            var instance;
            if (typeof options === 'string') {
                instance = $(this).data('ProgressAnimation');
                if (instance && $.isFunction(instance[options])) {
                    instance[options].apply(instance, Array.prototype.slice.call(args, [1]));
                }
            } else {
                params = $.extend({}, options, { holder: this });
                new ProgressAnimation(params);
            }
        });
    };
}(jQuery, this));

; (function (window) {
    window.CssAnimationHelper = {
        init: function () {
            this.transitionEvent = this.getTransitionEvent();
            this.animationEvent = this.getAnimationEvent();
        },
        getTransitionEvent: function () {
            var t,
                el = document.documentElement,
                transitions = {
                    'transition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'MozTransition': 'transitionend',
                    'WebkitTransition': 'webkitTransitionEnd'
                };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        },
        getAnimationEvent: function () {
            var t,
                el = document.documentElement,
                transitions = {
                    'animation': 'animationend',
                    'OAnimation': 'oAnimationEnd',
                    'MozAnimation': 'animationend',
                    'webkitAnimation': 'webkitAnimationEnd'
                };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        },
        addAnimation: function (obj) {
            if (!this.transitionEvent || !this.animationEvent) {
                this.init();
            }
            var self = this;
            var animFunction = function (e) {
                var target = jQuery(e.target);
                if (target.is(obj.item)) {
                    obj.item.off(obj.type === 'animation' ? self.animationEvent : self.transitionEvent, animFunction);
                    if (jQuery.isFunction(obj.complete)) obj.complete();
                }
            };
            obj.item.on(obj.type === 'animation' ? self.animationEvent : self.transitionEvent, animFunction);
        }
    };
}(window));

/*
 * Responsive Layout helper
 */
ResponsiveHelper = (function ($) {
    // init variables
    var handlers = [],
        prevWinWidth,
        win = $(window),
        nativeMatchMedia = false;

    // detect match media support
    if (window.matchMedia) {
        if (window.Window && window.matchMedia === Window.prototype.matchMedia) {
            nativeMatchMedia = true;
        } else if (window.matchMedia.toString().indexOf('native') > -1) {
            nativeMatchMedia = true;
        }
    }

    // prepare resize handler
    function resizeHandler(event) {
        var winWidth = win.width();
        if (winWidth !== prevWinWidth) {
            prevWinWidth = winWidth;
            // loop through range groups
            $.each(handlers, function (index, rangeObject) {
                // disable current active area if needed
                $.each(rangeObject.data, function (property, item) {
                    if (item.currentActive && !matchRange(item.range[0], item.range[1])) {
                        item.currentActive = false;
                        if (typeof item.disableCallback === 'function') {
                            item.disableCallback();
                        }
                    }
                });

                // enable areas that match current width
                $.each(rangeObject.data, function (property, item) {
                    if (!item.currentActive && matchRange(item.range[0], item.range[1])) {
                        // make callback
                        item.currentActive = true;
                        if (typeof item.enableCallback === 'function') {
                            item.enableCallback();
                        }
                    }
                });
            });
        }
    }
    win.bind('load resize orientationchange', resizeHandler);

    // test range
    function matchRange(r1, r2) {
        var mediaQueryString = '';
        if (r1 > 0) {
            mediaQueryString += '(min-width: ' + r1 + 'px)';
        }
        if (r2 < Infinity) {
            mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
        }
        return matchQuery(mediaQueryString, r1, r2);
    }

    // media query function
    function matchQuery(query, r1, r2) {
        if (window.matchMedia && nativeMatchMedia) {
            return matchMedia(query).matches;
        } else if (window.styleMedia) {
            return styleMedia.matchMedium(query);
        } else if (window.media) {
            return media.matchMedium(query);
        } else {
            return prevWinWidth >= r1 && prevWinWidth <= r2;
        }
    }

    // range parser
    function parseRange(rangeStr) {
        var rangeData = rangeStr.split('..');
        var x1 = parseInt(rangeData[0], 10) || -Infinity;
        var x2 = parseInt(rangeData[1], 10) || Infinity;
        return [x1, x2].sort(function (a, b) {
            return a - b;
        });
    }

    // export public functions
    return {
        addRange: function (ranges) {
            // parse data and add items to collection
            var result = { data: {} };
            $.each(ranges, function (property, data) {
                result.data[property] = {
                    range: parseRange(property),
                    enableCallback: data.on,
                    disableCallback: data.off
                };
            });
            handlers.push(result);

            // call resizeHandler to recalculate all events
            prevWinWidth = null;
            resizeHandler();
        }
    };
}(jQuery));

// DisableIOSScroll plugin
; (function ($, window) {
    'use strict';

    var doc = jQuery(document);

    // custom map init
    function DisablePageScroll(opt) {
        this.options = jQuery.extend({
            attachEventsOnInit: true
        }, opt);
        this.init();
    }
    DisablePageScroll.prototype = {
        init: function () {
            if (this.options.holder) {
                $.data(this.options.holder, 'DisablePageScroll', this);
                this.findElements();
                if (this.options.attachEventsOnInit) {
                    this.attachEvents();
                }
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
            this.scrollBlock = this.options.enableScrollBlock ? this.holder.find(this.options.enableScrollBlock) : this.holder;
            if (!this.scrollBlock.length) this.scrollBlock = this.holder;
        },
        attachEvents: function () {
            if (!this.initial) {
                this.bindHandlers();
                this.initial = true;
            }
            doc.on('touchmove.disable-scroll', this.onTouchmove);
            this.scrollBlock.on('touchstart.disable-scroll', this.onTouchstart);
        },
        detachEvents: function () {
            doc.off('touchmove.disable-scroll', this.onTouchmove);
            this.scrollBlock.off('touchstart.disable-scroll', this.onTouchstart);
        },
        onTouchmove: function (e) {
            if (!e) return;
            var target = $(e.target);
            var isScrollable = true;

            if (target.closest(this.scrollBlock).length) {
                isScrollable = this.scrollBlock.prop('scrollHeight') > this.scrollBlock.innerHeight();
            } else {
                isScrollable = false;
            }
            if (!isScrollable) {
                e.preventDefault();
            }
        },
        onTouchstart: function () {
            var top = this.scrollBlock.scrollTop();
            var maxTop = this.scrollBlock.prop('scrollHeight') - this.scrollBlock.innerHeight();

            if (top === 0) {
                this.scrollBlock.scrollTop(1);
            } else if (top === maxTop) {
                this.scrollBlock.scrollTop(top - 1);
            }
        },
        bindHandlers: function () {
            var self = this;
            $.each(self, function (propName, propValue) {
                if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
                    self[propName] = function () {
                        return propValue.apply(self, arguments);
                    };
                }
            });
        },
        destroy: function () {
            this.detachEvents();
            this.holder.removeData('DisableScroll');
        }
    };

    // jQuery plugin interface
    $.fn.disablePageScroll = function (options) {
        var args = arguments;
        return this.each(function () {
            var params;
            var instance;
            if (typeof options === 'string') {
                instance = $(this).data('DisablePageScroll');
                if (instance && $.isFunction(instance[options])) {
                    instance[options].apply(instance, Array.prototype.slice.call(args, [1]));
                }
            } else {
                params = $.extend({}, options, { holder: this });
                new DisablePageScroll(params);
            }
        });
    };

    // module exports
    window.DisablePageScroll = DisablePageScroll;
}(jQuery, this));

/*
 * Custom Tabs
 */
; (function ($, $win) {
    'use strict';

    function CustomTabset($holder, options) {
        this.$holder = $holder;
        this.options = options;

        this.init();
    }

    CustomTabset.prototype = {
        init: function () {
            this.$tabLinks = this.$holder.find(this.options.tabLinks);
            this.bindHandlers();
            this.attachEvents();
            this.makeCallback('onInit', this);

        },


        attachEvents: function () {
            var self = this;

            $win.on('resize orientationchange', this.onWindowResize);

            this.$tabLinks.each(function (i, link) {
                var $link = $(link);
                var $classTarget = self.getClassTarget($link);
                var $tab = $($link.attr(self.options.attrib));

                $tab.data({
                    $link: $link,
                    tabHolder: $tab.parent()
                });

                if ($classTarget.hasClass(self.options.activeClass)) {
                    self.showTab($tab, { initital: true });
                } else {
                    self.hideTab($tab, { initital: true });
                }
                self.attachTabLink($link);
            });
        },

        attachTabLink: function ($link) {
            var self = this;
            var $classTarget = self.getClassTarget($link);
            var $tab = $($link.attr(self.options.attrib));

            $link.on(this.options.event + '.customTabset', function (e) {
                e.preventDefault();
                if ($classTarget.hasClass(self.options.activeClass)) {
                    self.makeCallback('onOpenedClick', self, $tab);
                } else {
                    if (!self.isBusy) {
                        self.switchTabs($tab);
                    }
                }
            });
        },

        showTab: function (tab, options) {
            var self = this;
            var tabLink = tab.data('$link');
            var lastInRow;

            this.isBusy = true;
            if (!options) options = {};
            if (!options.mode) options.mode = this.getCurrentMode();

            this.getClassTarget(tabLink).addClass(this.options.activeClass);

            if (options.mode === 'singleline') {
                if (!tab.parent().is(tab.data('tabHolder'))) {
                    tab.appendTo(tab.data('tabHolder'));
                }
                tab
                    .stop()
                    .hide()
                    .fadeIn(options.initital ? 0 : this.options.animSpeed, function () {
                        self.isBusy = false;
                        if ($.isFunction(options.callback)) options.callback();
                        self.makeCallback('onTabShow', self, tab);
                    })
                    .removeClass(this.options.tabHiddenClass)
                    .addClass(this.options.tabActiveClass);
            } else {
                lastInRow = this.getClassTarget(this.getLastInRow(tabLink));
                if (options.effect === 'fade') {
                    tab
                        .stop()
                        .hide()
                        .insertAfter(lastInRow)
                        .fadeIn(options.initital ? 0 : this.options.animSpeed, function () {
                            self.isBusy = false;
                            if ($.isFunction(options.callback)) options.callback();
                            self.makeCallback('onTabShow', self, tab);
                        })
                        .removeClass(this.options.tabHiddenClass)
                        .addClass(this.options.tabActiveClass);
                } else {
                    tab
                        .stop()
                        .hide()
                        .insertAfter(lastInRow)
                        .slideDown(options.initital ? 0 : this.options.animSpeed, function () {
                            self.isBusy = false;
                            if ($.isFunction(options.callback)) options.callback();
                            self.makeCallback('onTabShow', self, tab);
                        })
                        .removeClass(this.options.tabHiddenClass)
                        .addClass(this.options.tabActiveClass);
                }
            }
        },

        hideTab: function (tab, options) {
            var self = this;
            var tabLink = tab.data('$link');

            this.isBusy = true;
            if (!options) options = {};
            if (!options.mode) options.mode = this.getCurrentMode();

            self.getClassTarget(tabLink).removeClass(this.options.activeClass);

            if (options.mode === 'singleline') {
                tab
                    .stop()
                    .fadeOut(options.initital ? 0 : this.options.animSpeed, function () {
                        self.isBusy = false;
                        if (!tab.parent().is(tab.data('tabHolder'))) {
                            tab.appendTo(tab.data('tabHolder'));
                        }
                        if ($.isFunction(options.callback)) options.callback();
                        tab.removeClass(self.options.tabActiveClass);
                        self.makeCallback('onTabHide', self, tab);
                    })
                    .addClass(this.options.tabHiddenClass);
            } else {
                if (options.effect === 'fade') {
                    tab
                        .stop()
                        .fadeOut(options.initital ? 0 : this.options.animSpeed, function () {
                            self.isBusy = false;
                            if (!tab.parent().is(tab.data('tabHolder'))) {
                                tab.appendTo(tab.data('tabHolder'));
                            }
                            if ($.isFunction(options.callback)) options.callback();
                            tab.removeClass(self.options.tabActiveClass);
                            self.makeCallback('onTabHide', self, tab);
                        })
                        .addClass(this.options.tabHiddenClass);
                } else {
                    tab
                        .stop()
                        .slideUp(options.initital ? 0 : this.options.animSpeed, function () {
                            self.isBusy = false;
                            if (!tab.parent().is(tab.data('tabHolder'))) {
                                tab.appendTo(tab.data('tabHolder'));
                            }
                            if ($.isFunction(options.callback)) options.callback();
                            tab.removeClass(self.options.tabActiveClass);
                            self.makeCallback('onTabHide', self, tab);
                        })
                        .addClass(this.options.tabHiddenClass);
                }
            }
        },

        switchTabs: function (tab) {
            var self = this;
            var $prevTab = this.getActiveTab();
            var $prevLink;
            if ($prevTab.length) {
                $prevLink = $prevTab.data('$link');
            }

            var $newTab = tab;
            var $newLink = $newTab.data('$link');
            var currentMode = this.getCurrentMode();

            if (currentMode === 'multiline') {
                if (this.isSameRow($newLink, $prevLink)) {
                    if ($prevTab.length) {
                        this.hideTab($prevTab, {
                            effect: 'fade',
                            callback: function () {
                                self.showTab(tab, { effect: 'fade' });
                            }
                        });
                    } else {
                        this.showTab(tab, { effect: 'slide' });
                    }
                } else {
                    this.hideTab($prevTab, { effect: 'slide' });
                    this.showTab($newTab, { effect: 'slide' });
                }
            } else {
                if ($prevTab.length) {
                    this.hideTab($prevTab, {
                        callback: function () {
                            self.showTab(tab);
                        }
                    });
                } else {
                    this.showTab(tab);
                }
            }
        },

        resizeHolder: function (height) {
            var self = this;

            if (height) {
                this.$tabHolder.height(height);
                setTimeout(function () {
                    self.$tabHolder.addClass('transition');
                }, 10);
            } else {
                self.$tabHolder.removeClass('transition').height('');
            }
        },

        onWindowResize: function (event) {
            var $activeTab = this.getActiveTab();


            if ($activeTab.length) {

                this.repositionTab($activeTab);

            }

        },

        isSameRow: function () {
            var baseTop = arguments[0].offset().top;
            var sameRow = true;

            for (var i = arguments.length - 1; i >= 1; i--) {
                if (arguments[i] && baseTop !== arguments[i].offset().top) {
                    sameRow = false;
                    break;
                }
            }
            return sameRow;
        },

        getLastInRow: function (tabLink) {
            var baseTop = tabLink.offset().top;
            var lastInRow = tabLink;

            this.$tabLinks.each(function () {
                var link = jQuery(this);
                if (baseTop === link.offset().top) {
                    lastInRow = link;
                }
            });
            return lastInRow;
        },

        getCurrentMode: function () {
            var currentMode = 'singleline';
            var sameRow = this.isSameRow(this.$tabLinks.eq(0), this.$tabLinks.eq(this.$tabLinks.length - 1));
            if (!sameRow) {
                currentMode = 'multiline';
            }
            return currentMode;
        },

        repositionTab: function (tab) {
            var beforeScroll = $("html").scrollTop();
            var currentMode;
            var lastInRow;
            var tabLink;

            tab.hide();
            currentMode = this.getCurrentMode();

            if (currentMode === 'singleline') {
                if (!tab.parent().is(tab.data('tabHolder'))) {
                    tab.appendTo(tab.data('tabHolder'));
                }
            } else {
                tabLink = tab.data('$link');
                lastInRow = this.getClassTarget(this.getLastInRow(tabLink));
                tab.insertAfter(lastInRow);
            }
            tab.show();

            //fix for IE and FF jump
            $("html").scrollTop(beforeScroll);

        },

        getClassTarget: function ($link) {
            return this.options.addToParent ? $link.parent() : $link;
        },

        getActiveTab: function () {
            var $classTargets = this.getClassTarget(this.$tabLinks);
            var $activeClassTarget = $classTargets.filter('.' + this.options.activeClass);

            if (!$activeClassTarget.length) {
                return jQuery();
            }
            return this.getTab(this.$tabLinks.eq($classTargets.index($activeClassTarget)));
        },

        getTab: function ($link) {
            return $($link.attr(this.options.attrib));
        },

        bindHandlers: function () {
            var self = this;
            $.each(self, function (propName, propValue) {
                if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
                    // dont use $.proxy here because it doesn't create unique handler
                    self[propName] = function () {
                        return propValue.apply(self, arguments);
                    };
                }
            });
        },

        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },

        destroy: function () {
            var self = this;

            this.$tabLinks.off('.customTabset').each(function () {
                var $link = $(this);
                var $tab = $($link.attr(self.options.attrib));

                self.getClassTarget($link).removeClass(self.options.activeClass);
                $tab
                    .removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass)
                    .removeData('$link');
            });
            $win.off('resize orientationchange', this.onWindowResize);
            this.$holder.removeData('CustomTabset');
        }
    };

    $.fn.customTabset = function (options) {
        options = $.extend({
            activeClass: 'active',
            addToParent: false,
            animSpeed: 500,
            tabLinks: 'a',
            attrib: 'href',
            event: 'click',
            tabHiddenClass: 'js-tab-hidden',
            tabActiveClass: 'js-tab-active'
        }, options);
        options.autoHeight = options.autoHeight && $.support.opacity;

        return this.each(function () {
            var $holder = $(this);

            if (!$holder.data('CustomTabset')) {
                $holder.data('CustomTabset', new CustomTabset($holder, options));
            }
        });
    };
}(jQuery, jQuery(window)));


/*
 * Mobile hover plugin
 */
; (function ($) {

    // detect device type
    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);

    // define events
    var eventOn = (isTouchDevice && 'touchstart') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerdown') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerDown') || 'mouseenter',
        eventOff = (isTouchDevice && 'touchend') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerup') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerUp') || 'mouseleave';

    // event handlers
    var toggleOn, toggleOff, preventHandler;
    if (isTouchDevice || isWinPhoneDevice) {
        // prevent click handler
        preventHandler = function (e) {
            e.preventDefault();
        };

        // touch device handlers
        toggleOn = function (e) {
            
            var options = e.data, element = $(this);

            var toggleOff = function (e) {
                var target = $(e.target);
                if (!target.is(element) && !target.closest(element).length) {
                    element.removeClass(options.hoverClass);
                    element.off('click', preventHandler);
                    if (options.onLeave) options.onLeave(element);
                    $(document).off(eventOn, toggleOff);
                }
            };

            if (!element.hasClass(options.hoverClass)) {
                element.addClass(options.hoverClass);
                element.one('click', preventHandler);
                $(document).on(eventOn, toggleOff);
                if (options.onHover) options.onHover(element);
            }
        };
    } else {
        // desktop browser handlers
        toggleOn = function (e) {
            var options = e.data, element = $(this);
            element.addClass(options.hoverClass);
            $(options.context).on(eventOff, options.selector, options, toggleOff);
            if (options.onHover) options.onHover(element);
        };
        toggleOff = function (e) {
            var options = e.data, element = $(this);
            element.removeClass(options.hoverClass);
            $(options.context).off(eventOff, options.selector, toggleOff);
            if (options.onLeave) options.onLeave(element);
        };
    }

    // jQuery plugin
    $.fn.touchHover = function (opt) {
        var options = $.extend({
            context: this.context,
            selector: this.selector,
            hoverClass: 'hover'
        }, opt);

        $(this.context).on(eventOn, this.selector, options, toggleOn);
        return this;
    };
}(jQuery));

/*
 * FixedTable
 */
; (function ($, window) {
    'use strict';
    var isMobileDevice = ('ontouchstart' in window) ||
        (window.DocumentTouch && document instanceof DocumentTouch) ||
        /Windows Phone/.test(navigator.userAgent);

    function FixedTable(options) {
        this.options = $.extend({
            fixedActiveClass: 'fixed-position',
            slideBlock: '[data-scroll-block]',
            positionType: 'auto',
            fixedOnlyIfFits: true,
            container: null,
            animDelay: 100,
            animSpeed: 200,
            extraBottom: 0,
            extraTop: 0
        }, options);
        this.initStructure();
        this.attachEvents();
    }
    FixedTable.prototype = {
        initStructure: function () {
            // find elements
            this.win = $(window);
            this.container = $(this.options.container).addClass('fixed-ready');
            this.slideBlock = this.container.find(this.options.slideBlock);
            this.fakeBlock = $(this.options.fakeBlock).insertAfter(this.slideBlock);

            // detect method
            if (this.options.positionType === 'auto') {
                this.options.positionType = isMobileDevice ? 'absolute' : 'fixed';
            }
        },
        attachEvents: function () {
            var self = this;

            // bind events
            this.onResize = function () {
                self.resizeHandler();
            };
            this.onScroll = function () {
                self.scrollHandler();
            };

            // handle events
            this.win.on({
                resize: this.onResize,
                load: this.onResize,
                scroll: this.onScroll,
                refreshFixedTable: this.onResize
            });

            // initial handler call
            this.resizeHandler();
        },
        recalculateOffsets: function () {
            var defaultOffset = this.fakeBlock.offset(),
                defaultPosition = this.fakeBlock.position(),
                holderOffset = this.container.offset();

            this.data = {
                windowHeight: this.win.height(),
                windowWidth: this.win.width(),

                blockPositionLeft: defaultPosition.left,
                blockPositionTop: defaultPosition.top,

                blockOffsetLeft: defaultOffset.left,
                blockOffsetTop: defaultOffset.top,
                blockHeight: this.fakeBlock.innerHeight(),

                holderOffsetLeft: holderOffset.left,
                holderOffsetTop: holderOffset.top,
                holderHeight: this.container.innerHeight()
            };
        },
        isVisible: function () {
            return this.fakeBlock.prop('offsetHeight');
        },
        fitsInViewport: function () {
            if (this.options.fixedOnlyIfFits && this.data) {
                return this.data.blockHeight + this.options.extraTop <= this.data.windowHeight;
            } else {
                return true;
            }
        },
        resizeHandler: function () {
            this.fakeBlock.css({
                height: this.slideBlock.outerHeight(true)
            });
            this.makeCallback('onResize', this);
            if (this.isVisible()) {
                FixedTable.stickyMethods[this.options.positionType].onResize.apply(this, arguments);
                this.scrollHandler();
            }
        },
        scrollHandler: function () {
            if (this.isVisible()) {
                if (!this.data) {
                    this.resizeHandler();
                    return;
                }
                this.currentScrollTop = this.win.scrollTop();
                this.currentScrollLeft = this.win.scrollLeft();
                FixedTable.stickyMethods[this.options.positionType].onScroll.apply(this, arguments);
            }
        },
        refresh: function () {
            // refresh dimensions and state if needed
            if (this.data) {
                this.data.holderHeight = this.container.innerHeight();
                this.data.blockHeight = this.slideBlock.innerHeight();
                this.scrollHandler();
            }
        },
        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
            // remove event handlers and styles
            this.fakeBlock.remove();
            this.slideBlock.removeAttr('style').removeClass(this.options.fixedActiveClass).removeClass('fixed-ready');
            this.win.off({
                resize: this.onResize,
                load: this.onResize,
                scroll: this.onScroll,
                refreshFixedTable: this.onResize
            });
        }
    };

    // sticky methods
    FixedTable.stickyMethods = {
        fixed: {
            onResize: function () {
                this.recalculateOffsets();
            },
            onScroll: function () {
                var isEnoughContainerHeight = this.data.holderHeight >= 2 * this.options.extraBottom;
                if (isEnoughContainerHeight && this.fitsInViewport() && this.currentScrollTop + this.options.extraTop > this.data.blockOffsetTop) {
                    if (this.currentScrollTop + this.options.extraTop + this.data.blockHeight > this.data.holderOffsetTop + this.data.holderHeight - this.options.extraBottom) {
                        this.slideBlock.css({
                            position: 'absolute',
                            top: this.data.blockPositionTop + this.data.holderHeight - this.data.blockHeight - this.options.extraBottom - (this.data.blockOffsetTop - this.data.holderOffsetTop),
                            left: this.data.blockPositionLeft
                        });
                    } else {
                        this.slideBlock.css({
                            position: 'fixed',
                            top: this.options.extraTop,
                            left: this.data.blockOffsetLeft - this.currentScrollLeft
                        });
                    }
                    this.slideBlock.addClass(this.options.fixedActiveClass);
                } else {
                    this.slideBlock.removeClass(this.options.fixedActiveClass).removeAttr('style');
                }
            }
        },
        absolute: {
            onResize: function () {
                this.slideBlock.removeAttr('style');
                this.recalculateOffsets();

                this.slideBlock.css({
                    position: 'absolute',
                    top: this.data.blockPositionTop,
                    left: this.data.blockPositionLeft
                });

                this.slideBlock.addClass(this.options.fixedActiveClass);
            },
            onScroll: function () {
                var self = this;
                clearTimeout(this.animTimer);
                this.animTimer = setTimeout(function () {
                    var currentScrollTop = self.currentScrollTop + self.options.extraTop,
                        initialPosition = self.data.blockPositionTop - (self.data.blockOffsetTop - self.data.holderOffsetTop),
                        maxTopPosition = self.data.holderHeight - self.data.blockHeight - self.options.extraBottom,
                        currentTopPosition = initialPosition + Math.min(currentScrollTop - self.data.holderOffsetTop, maxTopPosition),
                        calcTopPosition = self.fitsInViewport() && currentScrollTop > self.data.blockOffsetTop ? currentTopPosition : self.data.blockPositionTop;

                    self.slideBlock.stop().animate({
                        top: calcTopPosition
                    }, self.options.animSpeed);
                }, this.options.animDelay);
            }
        }
    };

    // jQuery plugin interface
    $.fn.fixedTable = function (options) {
        return this.each(function () {
            var params = $.extend({}, options, { container: this }),
                instance = new FixedTable(params);
            $.data(this, 'FixedTable', instance);
        });
    };

    // module exports
    window.FixedTable = FixedTable;
}(jQuery, this));

/*
 * jQuery Open/Close plugin
 */
; (function ($) {
    function OpenClose(options) {
        this.options = $.extend({
            addClassBeforeAnimation: true,
            hideOnClickOutside: false,
            activeClass: 'active',
            opener: '.opener',
            slider: '.slide',
            animSpeed: 400,
            effect: 'fade',
            event: 'click'
        }, options);
        this.init();
    }
    OpenClose.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
            this.opener = this.holder.find(this.options.opener);
            this.slider = this.holder.find(this.options.slider);
        },
        attachEvents: function () {
            // add handler
            var self = this;
            this.eventHandler = function (e) {
                e.preventDefault();
                if (self.slider.hasClass(slideHiddenClass)) {
                    self.showSlide();
                } else {
                    self.hideSlide();
                }
            };
            self.opener.bind(self.options.event, this.eventHandler);

            // hover mode handler
            if (self.options.event === 'over') {
                self.opener.bind('mouseenter', function () {
                    if (!self.holder.hasClass(self.options.activeClass)) {
                        self.showSlide();
                    }
                });
                self.holder.bind('mouseleave', function () {
                    self.hideSlide();
                });
            }

            // outside click handler
            self.outsideClickHandler = function (e) {
                if (self.options.hideOnClickOutside) {
                    var target = $(e.target);
                    if (!target.is(self.holder) && !target.closest(self.holder).length) {
                        self.hideSlide();
                    }
                }
            };

            // set initial styles
            if (this.holder.hasClass(this.options.activeClass)) {
                $(document).bind('click touchstart', self.outsideClickHandler);
            } else {
                this.slider.addClass(slideHiddenClass);
            }
        },
        showSlide: function () {
            var self = this;
            if (self.options.addClassBeforeAnimation) {
                self.holder.addClass(self.options.activeClass);
            }
            self.slider.removeClass(slideHiddenClass);
            $(document).bind('click touchstart', self.outsideClickHandler);

            self.makeCallback('animStart', true);
            toggleEffects[self.options.effect].show({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function () {
                    if (!self.options.addClassBeforeAnimation) {
                        self.holder.addClass(self.options.activeClass);
                    }
                    self.makeCallback('animEnd', true);
                }
            });
        },
        hideSlide: function () {
            var self = this;
            if (self.options.addClassBeforeAnimation) {
                self.holder.removeClass(self.options.activeClass);
            }
            $(document).unbind('click touchstart', self.outsideClickHandler);

            self.makeCallback('animStart', false);
            toggleEffects[self.options.effect].hide({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function () {
                    if (!self.options.addClassBeforeAnimation) {
                        self.holder.removeClass(self.options.activeClass);
                    }
                    self.slider.addClass(slideHiddenClass);
                    self.makeCallback('animEnd', false);
                }
            });
        },
        destroy: function () {
            this.slider.removeClass(slideHiddenClass).css({ display: '' });
            this.opener.unbind(this.options.event, this.eventHandler);
            this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
            $(document).unbind('click touchstart', this.outsideClickHandler);
        },
        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    };

    // add stylesheet for slide on DOMReady
    var slideHiddenClass = 'js-slide-hidden';
    (function () {
        var tabStyleSheet = $('<style type="text/css">')[0];
        var tabStyleRule = '.' + slideHiddenClass;
        tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
        if (tabStyleSheet.styleSheet) {
            tabStyleSheet.styleSheet.cssText = tabStyleRule;
        } else {
            tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
        }
        $('head').append(tabStyleSheet);
    }());

    // animation effects
    var toggleEffects = {
        slide: {
            show: function (o) {
                o.box.stop(true).hide().slideDown(o.speed, o.complete);
            },
            hide: function (o) {
                o.box.stop(true).slideUp(o.speed, o.complete);
            }
        },
        fade: {
            show: function (o) {
                o.box.stop(true).hide().fadeIn(o.speed, o.complete);
            },
            hide: function (o) {
                o.box.stop(true).fadeOut(o.speed, o.complete);
            }
        },
        none: {
            show: function (o) {
                o.box.hide().show(0, o.complete);
            },
            hide: function (o) {
                o.box.hide(0, o.complete);
            }
        }
    };

    // jQuery plugin interface
    $.fn.openClose = function (opt) {
        return this.each(function () {
            jQuery(this).data('OpenClose', new OpenClose($.extend(opt, { holder: this })));
        });
    };
}(jQuery));


/*
 * jQuery retina cover plugin
 */
; (function ($) {
    'use strict';

    var styleRules = {};
    var templates = {
        '2x': [
            '(-webkit-min-device-pixel-ratio: 1.5)',
            '(min-resolution: 192dpi)',
            '(min-device-pixel-ratio: 1.5)',
            '(min-resolution: 1.5dppx)'
        ],
        '3x': [
            '(-webkit-min-device-pixel-ratio: 3)',
            '(min-resolution: 384dpi)',
            '(min-device-pixel-ratio: 3)',
            '(min-resolution: 3dppx)'
        ]
    };

    function addSimple(imageSrc, media, id) {
        var style = buildRule(id, imageSrc);

        addRule(media, style);
    }

    function addRetina(imageData, media, id) {
        var currentRules = templates[imageData[1]].slice();
        var patchedRules = currentRules;
        var style = buildRule(id, imageData[0]);

        if (media !== 'default') {
            patchedRules = $.map(currentRules, function (ele, i) {
                return ele + ' and ' + media;
            });
        }

        media = patchedRules.join(',');

        addRule(media, style);
    }

    function buildRule(id, src) {
        return '#' + id + '{background-image: url("' + src + '");}';
    }

    function addRule(media, rule) {
        var $styleTag = styleRules[media];
        var styleTagData;
        var rules = '';

        if (media === 'default') {
            rules = rule + ' ';
        } else {
            rules = '@media ' + media + '{' + rule + '}';
        }

        if (!$styleTag) {
            styleRules[media] = $('<style>').text(rules).appendTo('head');
        } else {
            styleTagData = $styleTag.text();
            styleTagData = styleTagData.substring(0, styleTagData.length - 2) + ' }' + rule + '}';
            $styleTag.text(styleTagData);
        }
    }

    $.fn.retinaCover = function () {
        return this.each(function () {
            var $block = $(this);
            var $items = $block.children('[data-srcset]');
            var id = 'bg-stretch' + Date.now() + (Math.random() * 1000).toFixed(0);

            if ($items.length) {
                $block.attr('id', id);

                $items.each(function () {
                    var $item = $(this);
                    var data = $item.data('srcset').split(', ');
                    var media = $item.data('media') || 'default';
                    var dataLength = data.length;
                    var itemData;
                    var i;

                    for (i = 0; i < dataLength; i++) {
                        itemData = data[i].split(' ');

                        if (itemData.length === 1) {
                            addSimple(itemData[0], media, id);
                        } else {
                            addRetina(itemData, media, id);
                        }
                    }
                });
            }

            $items.detach();
        });
    };
}(jQuery));


/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.jcf = factory(jQuery);
    }
}(this, function ($) {
    'use strict';

    // define version
    var version = '1.1.3';

    // private variables
    var customInstances = [];

    // default global options
    var commonOptions = {
        optionsKey: 'jcf',
        dataKey: 'jcf-instance',
        rtlClass: 'jcf-rtl',
        focusClass: 'jcf-focus',
        pressedClass: 'jcf-pressed',
        disabledClass: 'jcf-disabled',
        hiddenClass: 'jcf-hidden',
        resetAppearanceClass: 'jcf-reset-appearance',
        unselectableClass: 'jcf-unselectable'
    };

    // detect device type
    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
        isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
    commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

    var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
    if (isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
    commonOptions.ios = isIOS;

    // create global stylesheet if custom forms are used
    var createStyleSheet = function () {
        var styleTag = $('<style>').appendTo('head'),
            styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

        // crossbrowser style handling
        var addCSSRule = function (selector, rules, index) {
            if (styleSheet.insertRule) {
                styleSheet.insertRule(selector + '{' + rules + '}', index);
            } else {
                styleSheet.addRule(selector, rules, index);
            }
        };

        // add special rules
        addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
        addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
        addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
        addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

        // detect rtl pages
        var html = $('html'), body = $('body');
        if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
            html.addClass(commonOptions.rtlClass);
        }

        // handle form reset event
        html.on('reset', function () {
            setTimeout(function () {
                api.refreshAll();
            }, 0);
        });

        // mark stylesheet as created
        commonOptions.styleSheetCreated = true;
    };

    // simplified pointer events handler
    (function () {
        var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
            touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
            eventList, eventMap = {}, eventPrefix = 'jcf-';

        // detect events to attach
        if (pointerEventsSupported) {
            eventList = {
                pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
                pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
                pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
                pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
            };
        } else {
            eventList = {
                pointerover: 'mouseover',
                pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
                pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
                pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
            };
        }

        // create event map
        $.each(eventList, function (targetEventName, fakeEventList) {
            $.each(fakeEventList.split(' '), function (index, fakeEventName) {
                eventMap[fakeEventName] = targetEventName;
            });
        });

        // jQuery event hooks
        $.each(eventList, function (eventName, eventHandlers) {
            eventHandlers = eventHandlers.split(' ');
            $.event.special[eventPrefix + eventName] = {
                setup: function () {
                    var self = this;
                    $.each(eventHandlers, function (index, fallbackEvent) {
                        if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
                        else self['on' + fallbackEvent] = fixEvent;
                    });
                },
                teardown: function () {
                    var self = this;
                    $.each(eventHandlers, function (index, fallbackEvent) {
                        if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
                        else self['on' + fallbackEvent] = null;
                    });
                }
            };
        });

        // check that mouse event are not simulated by mobile browsers
        var lastTouch = null;
        var mouseEventSimulated = function (e) {
            var dx = Math.abs(e.pageX - lastTouch.x),
                dy = Math.abs(e.pageY - lastTouch.y),
                rangeDistance = 25;

            if (dx <= rangeDistance && dy <= rangeDistance) {
                return true;
            }
        };

        // normalize event
        var fixEvent = function (e) {
            var origEvent = e || window.event,
                touchEventData = null,
                targetEventName = eventMap[origEvent.type];

            e = $.event.fix(origEvent);
            e.type = eventPrefix + targetEventName;

            if (origEvent.pointerType) {
                switch (origEvent.pointerType) {
                    case 2: e.pointerType = 'touch'; break;
                    case 3: e.pointerType = 'pen'; break;
                    case 4: e.pointerType = 'mouse'; break;
                    default: e.pointerType = origEvent.pointerType;
                }
            } else {
                e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
            }

            if (!e.pageX && !e.pageY) {
                touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
                e.pageX = touchEventData.pageX;
                e.pageY = touchEventData.pageY;
            }

            if (origEvent.type === 'touchend') {
                lastTouch = { x: e.pageX, y: e.pageY };
            }
            if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
                return;
            } else {
                return ($.event.dispatch || $.event.handle).call(this, e);
            }
        };
    }());

    // custom mousewheel/trackpad handler
    (function () {
        var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
            shimEventName = 'jcf-mousewheel';

        $.event.special[shimEventName] = {
            setup: function () {
                var self = this;
                $.each(wheelEvents, function (index, fallbackEvent) {
                    if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
                    else self['on' + fallbackEvent] = fixEvent;
                });
            },
            teardown: function () {
                var self = this;
                $.each(wheelEvents, function (index, fallbackEvent) {
                    if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
                    else self['on' + fallbackEvent] = null;
                });
            }
        };

        var fixEvent = function (e) {
            var origEvent = e || window.event;
            e = $.event.fix(origEvent);
            e.type = shimEventName;

            // old wheel events handler
            if ('detail' in origEvent) { e.deltaY = -origEvent.detail; }
            if ('wheelDelta' in origEvent) { e.deltaY = -origEvent.wheelDelta; }
            if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
            if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

            // modern wheel event handler
            if ('deltaY' in origEvent) {
                e.deltaY = origEvent.deltaY;
            }
            if ('deltaX' in origEvent) {
                e.deltaX = origEvent.deltaX;
            }

            // handle deltaMode for mouse wheel
            e.delta = e.deltaY || e.deltaX;
            if (origEvent.deltaMode === 1) {
                var lineHeight = 16;
                e.delta *= lineHeight;
                e.deltaY *= lineHeight;
                e.deltaX *= lineHeight;
            }

            return ($.event.dispatch || $.event.handle).call(this, e);
        };
    }());

    // extra module methods
    var moduleMixin = {
        // provide function for firing native events
        fireNativeEvent: function (elements, eventName) {
            $(elements).each(function () {
                var element = this, eventObject;
                if (element.dispatchEvent) {
                    eventObject = document.createEvent('HTMLEvents');
                    eventObject.initEvent(eventName, true, true);
                    element.dispatchEvent(eventObject);
                } else if (document.createEventObject) {
                    eventObject = document.createEventObject();
                    eventObject.target = element;
                    element.fireEvent('on' + eventName, eventObject);
                }
            });
        },
        // bind event handlers for module instance (functions beggining with "on")
        bindHandlers: function () {
            var self = this;
            $.each(self, function (propName, propValue) {
                if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
                    // dont use $.proxy here because it doesn't create unique handler
                    self[propName] = function () {
                        return propValue.apply(self, arguments);
                    };
                }
            });
        }
    };

    // public API
    var api = {
        version: version,
        modules: {},
        getOptions: function () {
            return $.extend({}, commonOptions);
        },
        setOptions: function (moduleName, moduleOptions) {
            if (arguments.length > 1) {
                // set module options
                if (this.modules[moduleName]) {
                    $.extend(this.modules[moduleName].prototype.options, moduleOptions);
                }
            } else {
                // set common options
                $.extend(commonOptions, moduleName);
            }
        },
        addModule: function (proto) {
            // add module to list
            var Module = function (options) {
                // save instance to collection
                if (!options.element.data(commonOptions.dataKey)) {
                    options.element.data(commonOptions.dataKey, this);
                }
                customInstances.push(this);

                // save options
                this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

                // bind event handlers to instance
                this.bindHandlers();

                // call constructor
                this.init.apply(this, arguments);
            };

            // parse options from HTML attribute
            var getInlineOptions = function (element) {
                var dataOptions = element.data(commonOptions.optionsKey),
                    attrOptions = element.attr(commonOptions.optionsKey);

                if (dataOptions) {
                    return dataOptions;
                } else if (attrOptions) {
                    try {
                        return $.parseJSON(attrOptions);
                    } catch (e) {
                        // ignore invalid attributes
                    }
                }
            };

            // set proto as prototype for new module
            Module.prototype = proto;

            // add mixin methods to module proto
            $.extend(proto, moduleMixin);
            if (proto.plugins) {
                $.each(proto.plugins, function (pluginName, plugin) {
                    $.extend(plugin.prototype, moduleMixin);
                });
            }

            // override destroy method
            var originalDestroy = Module.prototype.destroy;
            Module.prototype.destroy = function () {
                this.options.element.removeData(this.options.dataKey);

                for (var i = customInstances.length - 1; i >= 0; i--) {
                    if (customInstances[i] === this) {
                        customInstances.splice(i, 1);
                        break;
                    }
                }

                if (originalDestroy) {
                    originalDestroy.apply(this, arguments);
                }
            };

            // save module to list
            this.modules[proto.name] = Module;
        },
        getInstance: function (element) {
            return $(element).data(commonOptions.dataKey);
        },
        replace: function (elements, moduleName, customOptions) {
            var self = this,
                instance;

            if (!commonOptions.styleSheetCreated) {
                createStyleSheet();
            }

            $(elements).each(function () {
                var moduleOptions,
                    element = $(this);

                instance = element.data(commonOptions.dataKey);
                if (instance) {
                    instance.refresh();
                } else {
                    if (!moduleName) {
                        $.each(self.modules, function (currentModuleName, module) {
                            if (module.prototype.matchElement.call(module.prototype, element)) {
                                moduleName = currentModuleName;
                                return false;
                            }
                        });
                    }
                    if (moduleName) {
                        moduleOptions = $.extend({ element: element }, customOptions);
                        instance = new self.modules[moduleName](moduleOptions);
                    }
                }
            });
            return instance;
        },
        refresh: function (elements) {
            $(elements).each(function () {
                var instance = $(this).data(commonOptions.dataKey);
                if (instance) {
                    instance.refresh();
                }
            });
        },
        destroy: function (elements) {
            $(elements).each(function () {
                var instance = $(this).data(commonOptions.dataKey);
                if (instance) {
                    instance.destroy();
                }
            });
        },
        replaceAll: function (context) {
            var self = this;
            $.each(this.modules, function (moduleName, module) {
                $(module.prototype.selector, context).each(function () {
                    if (this.className.indexOf('jcf-ignore') < 0) {
                        self.replace(this, moduleName);
                    }
                });
            });
        },
        refreshAll: function (context) {
            if (context) {
                $.each(this.modules, function (moduleName, module) {
                    $(module.prototype.selector, context).each(function () {
                        var instance = $(this).data(commonOptions.dataKey);
                        if (instance) {
                            instance.refresh();
                        }
                    });
                });
            } else {
                for (var i = customInstances.length - 1; i >= 0; i--) {
                    customInstances[i].refresh();
                }
            }
        },
        destroyAll: function (context) {
            if (context) {
                $.each(this.modules, function (moduleName, module) {
                    $(module.prototype.selector, context).each(function (index, element) {
                        var instance = $(element).data(commonOptions.dataKey);
                        if (instance) {
                            instance.destroy();
                        }
                    });
                });
            } else {
                while (customInstances.length) {
                    customInstances[0].destroy();
                }
            }
        }
    };

    // always export API to the global window object
    window.jcf = api;

    return api;
}));

/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($, window) {
    'use strict';

    jcf.addModule({
        name: 'Select',
        selector: 'select',
        options: {
            element: null,
            multipleCompactStyle: false
        },
        plugins: {
            ListBox: ListBox,
            ComboBox: ComboBox,
            SelectList: SelectList
        },
        matchElement: function (element) {
            return element.is('select');
        },
        init: function () {
            this.element = $(this.options.element);
            this.createInstance();
        },
        isListBox: function () {
            return this.element.is('[size]:not([jcf-size]), [multiple]');
        },
        createInstance: function () {
            if (this.instance) {
                this.instance.destroy();
            }
            if (this.isListBox() && !this.options.multipleCompactStyle) {
                this.instance = new ListBox(this.options);
            } else {
                this.instance = new ComboBox(this.options);
            }
        },
        refresh: function () {
            var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) ||
                (!this.isListBox() && this.instance instanceof ListBox);

            if (typeMismatch) {
                this.createInstance();
            } else {
                this.instance.refresh();
            }
        },
        destroy: function () {
            this.instance.destroy();
        }
    });

    // combobox module
    function ComboBox(options) {
        this.options = $.extend({
            wrapNative: true,
            wrapNativeOnMobile: true,
            fakeDropInBody: true,
            useCustomScroll: true,
            flipDropToFit: true,
            maxVisibleItems: 10,
            fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
            fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
            optionClassPrefix: 'jcf-option-',
            selectClassPrefix: 'jcf-select-',
            dropContentSelector: '.jcf-select-drop-content',
            selectTextSelector: '.jcf-select-text',
            dropActiveClass: 'jcf-drop-active',
            flipDropClass: 'jcf-drop-flipped',
            dropShowDelay: 0,
            dropHideDelay: 0,
            dropShownClass: 'jcf-select-drop-shown'
        }, options);
        this.init();
    }
    $.extend(ComboBox.prototype, {
        init: function () {
            this.initStructure();
            this.bindHandlers();
            this.attachEvents();
            this.refresh();
        },
        initStructure: function () {
            // prepare structure
            this.win = $(window);
            this.doc = $(document);
            this.realElement = $(this.options.element);
            this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
            this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
            this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
            makeUnselectable(this.fakeElement);

            // copy classes from original select
            this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));

            // handle compact multiple style
            if (this.realElement.prop('multiple')) {
                this.fakeElement.addClass('jcf-compact-multiple');
            }

            // detect device type and dropdown behavior
            if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
                this.options.wrapNative = true;
            }

            if (this.options.wrapNative) {
                // wrap native select inside fake block
                this.realElement.prependTo(this.fakeElement).css({
                    position: 'absolute',
                    height: '100%',
                    width: '100%'
                }).addClass(this.options.resetAppearanceClass);
            } else {
                // just hide native select
                this.realElement.addClass(this.options.hiddenClass);
                this.fakeElement.attr('title', this.realElement.attr('title'));
                this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
            }
        },
        attachEvents: function () {
            // delayed refresh handler
            var self = this;
            this.delayedRefresh = function () {
                setTimeout(function () {
                    self.refresh();
                    if (self.list) {
                        self.list.refresh();
                        self.list.scrollToActiveOption();
                    }
                }, 1);
            };

            // native dropdown event handlers
            if (this.options.wrapNative) {
                this.realElement.on({
                    focus: this.onFocus,
                    change: this.onChange,
                    click: this.onChange,
                    keydown: this.onChange
                });
            } else {
                // custom dropdown event handlers
                this.realElement.on({
                    focus: this.onFocus,
                    change: this.onChange,
                    keydown: this.onKeyDown
                });
                this.fakeElement.on({
                    'jcf-pointerdown': this.onSelectAreaPress
                });
            }
        },
        onKeyDown: function (e) {
            if (e.which === 13) {
                this.toggleDropdown();
            } else if (this.dropActive) {
                this.delayedRefresh();
            }
        },
        onChange: function () {
            this.refresh();
        },
        onFocus: function () {
            if (!this.pressedFlag || !this.focusedFlag) {
                this.fakeElement.addClass(this.options.focusClass);
                this.realElement.on('blur', this.onBlur);
                this.toggleListMode(true);
                this.focusedFlag = true;
            }
        },
        onBlur: function () {
            if (!this.pressedFlag) {
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off('blur', this.onBlur);
                this.toggleListMode(false);
                this.focusedFlag = false;
            }
        },
        onResize: function () {
            if (this.dropActive) {
                this.hideDropdown();
            }
        },
        onSelectDropPress: function () {
            this.pressedFlag = true;
        },
        onSelectDropRelease: function (e, pointerEvent) {
            this.pressedFlag = false;
            if (pointerEvent.pointerType === 'mouse') {
                this.realElement.focus();
            }
        },
        onSelectAreaPress: function (e) {
            // skip click if drop inside fake element or real select is disabled
            var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
            if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
                return;
            }

            // toggle dropdown visibility
            this.selectOpenedByEvent = e.pointerType;
            this.toggleDropdown();

            // misc handlers
            if (!this.focusedFlag) {
                if (e.pointerType === 'mouse') {
                    this.realElement.focus();
                } else {
                    this.onFocus(e);
                }
            }
            this.pressedFlag = true;
            this.fakeElement.addClass(this.options.pressedClass);
            this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
        },
        onSelectAreaRelease: function (e) {
            if (this.focusedFlag && e.pointerType === 'mouse') {
                this.realElement.focus();
            }
            this.pressedFlag = false;
            this.fakeElement.removeClass(this.options.pressedClass);
            this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
        },
        onOutsideClick: function (e) {
            var target = $(e.target),
                clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;

            if (!clickedInsideSelect) {
                this.hideDropdown();
            }
        },
        onSelect: function () {
            this.refresh();

            if (this.realElement.prop('multiple')) {
                this.repositionDropdown();
            } else {
                this.hideDropdown();
            }

            this.fireNativeEvent(this.realElement, 'change');
        },
        toggleListMode: function (state) {
            if (!this.options.wrapNative) {
                if (state) {
                    // temporary change select to list to avoid appearing of native dropdown
                    this.realElement.attr({
                        size: 4,
                        'jcf-size': ''
                    });
                } else {
                    // restore select from list mode to dropdown select
                    if (!this.options.wrapNative) {
                        this.realElement.removeAttr('size jcf-size');
                    }
                }
            }
        },
        createDropdown: function () {
            // destroy previous dropdown if needed
            if (this.dropdown) {
                this.list.destroy();
                this.dropdown.remove();
            }

            // create new drop container
            this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
            this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
            makeUnselectable(this.dropdown);

            // handle compact multiple style
            if (this.realElement.prop('multiple')) {
                this.dropdown.addClass('jcf-compact-multiple');
            }

            // set initial styles for dropdown in body
            if (this.options.fakeDropInBody) {
                this.dropdown.css({
                    position: 'absolute',
                    top: -9999
                });
            }

            // create new select list instance
            this.list = new SelectList({
                useHoverClass: true,
                handleResize: false,
                alwaysPreventMouseWheel: true,
                maxVisibleItems: this.options.maxVisibleItems,
                useCustomScroll: this.options.useCustomScroll,
                holder: this.dropdown.find(this.options.dropContentSelector),
                multipleSelectWithoutKey: this.realElement.prop('multiple'),
                element: this.realElement
            });
            $(this.list).on({
                select: this.onSelect,
                press: this.onSelectDropPress,
                release: this.onSelectDropRelease
            });
        },
        repositionDropdown: function () {
            var selectOffset = this.fakeElement.offset(),
                selectWidth = this.fakeElement.outerWidth(),
                selectHeight = this.fakeElement.outerHeight(),
                dropHeight = this.dropdown.css('width', selectWidth).outerHeight(),
                winScrollTop = this.win.scrollTop(),
                winHeight = this.win.height(),
                calcTop, calcLeft, bodyOffset, needFlipDrop = false;

            // check flip drop position
            if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
                needFlipDrop = true;
            }

            if (this.options.fakeDropInBody) {
                bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
                if (this.options.flipDropToFit && needFlipDrop) {
                    // calculate flipped dropdown position
                    calcLeft = selectOffset.left;
                    calcTop = selectOffset.top - dropHeight - bodyOffset;
                } else {
                    // calculate default drop position
                    calcLeft = selectOffset.left;
                    calcTop = selectOffset.top + selectHeight - bodyOffset;
                }

                // update drop styles
                this.dropdown.css({
                    width: selectWidth,
                    left: calcLeft,
                    top: calcTop
                });
            }

            // refresh flipped class
            this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
        },
        showDropdown: function () {
            // do not show empty custom dropdown
            if (!this.realElement.prop('options').length) {
                return;
            }

            // CSS3 animation show effect
            var self = this;
            clearTimeout(this.hideShowTimer);

            // create options list if not created
            if (!this.dropdown) {
                this.createDropdown();
            }

            // CSS3 animation show effect
            this.dropdown.removeClass(this.options.dropShownClass);

            // show dropdown
            this.dropActive = true;
            this.dropdown.appendTo(this.fakeDropTarget);
            this.fakeElement.addClass(this.options.dropActiveClass);
            this.refreshSelectedText();
            this.repositionDropdown();
            this.list.setScrollTop(this.savedScrollTop);
            this.list.refresh();

            // add temporary event handlers
            this.win.on('resize', this.onResize);
            this.doc.on('jcf-pointerdown', this.onOutsideClick);

            // CSS3 animation show effect
            this.hideShowTimer = setTimeout(function () {
                self.dropdown.addClass(self.options.dropShownClass);
            }, this.options.dropShowDelay);
        },
        hideDropdown: function () {
            // CSS3 animation hide effect
            var self = this;

            if (this.dropdown) {
                // CSS3 animation hide effect
                var self = this;
                clearTimeout(this.hideShowTimer);

                this.savedScrollTop = this.list.getScrollTop();
                this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);

                this.dropdown.removeClass(this.options.flipDropClass);

                // CSS3 animation hide effect
                this.dropdown.removeClass(this.options.dropShownClass);
                this.hideShowTimer = setTimeout(function () {
                    self.dropdown.detach();
                }, this.options.dropHideDelay);

                this.doc.off('jcf-pointerdown', this.onOutsideClick);
                this.win.off('resize', this.onResize);
                this.dropActive = false;
                if (this.selectOpenedByEvent === 'touch') {
                    this.onBlur();
                }
            }
        },
        toggleDropdown: function () {
            if (this.dropActive) {
                this.hideDropdown();
            } else {
                this.showDropdown();
            }
        },
        refreshSelectedText: function () {
            // redraw selected area
            var selectedIndex = this.realElement.prop('selectedIndex'),
                selectedOption = this.realElement.prop('options')[selectedIndex],
                selectedOptionImage = selectedOption ? selectedOption.getAttribute('data-image') : null,
                selectedOptionText = '',
                selectedOptionClasses,
                self = this;

            if (this.realElement.prop('multiple')) {
                $.each(this.realElement.prop('options'), function (index, option) {
                    if (option.selected) {
                        selectedOptionText += (selectedOptionText ? ', ' : '') + option.innerHTML;
                    }
                });
                if (!selectedOptionText) {
                    selectedOptionText = self.realElement.attr('placeholder') || '';
                }
                this.selectText.removeAttr('class').html(selectedOptionText);
            } else if (!selectedOption) {
                if (this.selectImage) {
                    this.selectImage.hide();
                }
                this.selectText.removeAttr('class').empty();
            } else if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
                selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
                this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);

                if (selectedOptionImage) {
                    if (!this.selectImage) {
                        this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
                    }
                    this.selectImage.attr('src', selectedOptionImage).show();
                } else if (this.selectImage) {
                    this.selectImage.hide();
                }

                this.currentSelectedText = selectedOption.innerHTML;
                this.currentSelectedImage = selectedOptionImage;
            }
        },
        refresh: function () {
            // refresh fake select visibility
            if (this.realElement.prop('style').display === 'none') {
                this.fakeElement.hide();
            } else {
                this.fakeElement.show();
            }

            // refresh selected text
            this.refreshSelectedText();

            // handle disabled state
            this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
        },
        destroy: function () {
            // restore structure
            if (this.options.wrapNative) {
                this.realElement.insertBefore(this.fakeElement).css({
                    position: '',
                    height: '',
                    width: ''
                }).removeClass(this.options.resetAppearanceClass);
            } else {
                this.realElement.removeClass(this.options.hiddenClass);
                if (this.realElement.is('[jcf-size]')) {
                    this.realElement.removeAttr('size jcf-size');
                }
            }

            // removing element will also remove its event handlers
            this.fakeElement.remove();

            // remove other event handlers
            this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
            this.realElement.off({
                focus: this.onFocus
            });
        }
    });

    // listbox module
    function ListBox(options) {
        this.options = $.extend({
            wrapNative: true,
            useCustomScroll: true,
            fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
            selectClassPrefix: 'jcf-select-',
            listHolder: '.jcf-list-wrapper'
        }, options);
        this.init();
    }
    $.extend(ListBox.prototype, {
        init: function () {
            this.bindHandlers();
            this.initStructure();
            this.attachEvents();
        },
        initStructure: function () {
            this.realElement = $(this.options.element);
            this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
            this.listHolder = this.fakeElement.find(this.options.listHolder);
            makeUnselectable(this.fakeElement);

            // copy classes from original select
            this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
            this.realElement.addClass(this.options.hiddenClass);

            this.list = new SelectList({
                useCustomScroll: this.options.useCustomScroll,
                holder: this.listHolder,
                selectOnClick: false,
                element: this.realElement
            });
        },
        attachEvents: function () {
            // delayed refresh handler
            var self = this;
            this.delayedRefresh = function (e) {
                if (e && e.which === 16) {
                    // ignore SHIFT key
                    return;
                } else {
                    clearTimeout(self.refreshTimer);
                    self.refreshTimer = setTimeout(function () {
                        self.refresh();
                        self.list.scrollToActiveOption();
                    }, 1);
                }
            };

            // other event handlers
            this.realElement.on({
                focus: this.onFocus,
                click: this.delayedRefresh,
                keydown: this.delayedRefresh
            });

            // select list event handlers
            $(this.list).on({
                select: this.onSelect,
                press: this.onFakeOptionsPress,
                release: this.onFakeOptionsRelease
            });
        },
        onFakeOptionsPress: function (e, pointerEvent) {
            this.pressedFlag = true;
            if (pointerEvent.pointerType === 'mouse') {
                this.realElement.focus();
            }
        },
        onFakeOptionsRelease: function (e, pointerEvent) {
            this.pressedFlag = false;
            if (pointerEvent.pointerType === 'mouse') {
                this.realElement.focus();
            }
        },
        onSelect: function () {
            this.fireNativeEvent(this.realElement, 'change');
            this.fireNativeEvent(this.realElement, 'click');
        },
        onFocus: function () {
            if (!this.pressedFlag || !this.focusedFlag) {
                this.fakeElement.addClass(this.options.focusClass);
                this.realElement.on('blur', this.onBlur);
                this.focusedFlag = true;
            }
        },
        onBlur: function () {
            if (!this.pressedFlag) {
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off('blur', this.onBlur);
                this.focusedFlag = false;
            }
        },
        refresh: function () {
            this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
            this.list.refresh();
        },
        destroy: function () {
            this.list.destroy();
            this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
            this.fakeElement.remove();
        }
    });

    // options list module
    function SelectList(options) {
        this.options = $.extend({
            holder: null,
            maxVisibleItems: 10,
            selectOnClick: true,
            useHoverClass: false,
            useCustomScroll: false,
            handleResize: true,
            multipleSelectWithoutKey: false,
            alwaysPreventMouseWheel: false,
            indexAttribute: 'data-index',
            cloneClassPrefix: 'jcf-option-',
            containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
            containerSelector: '.jcf-list-content',
            captionClass: 'jcf-optgroup-caption',
            disabledClass: 'jcf-disabled',
            optionClass: 'jcf-option',
            groupClass: 'jcf-optgroup',
            hoverClass: 'jcf-hover',
            selectedClass: 'jcf-selected',
            scrollClass: 'jcf-scroll-active'
        }, options);
        this.init();
    }
    $.extend(SelectList.prototype, {
        init: function () {
            this.initStructure();
            this.refreshSelectedClass();
            this.attachEvents();
        },
        initStructure: function () {
            this.element = $(this.options.element);
            this.indexSelector = '[' + this.options.indexAttribute + ']';
            this.container = $(this.options.containerStructure).appendTo(this.options.holder);
            this.listHolder = this.container.find(this.options.containerSelector);
            this.lastClickedIndex = this.element.prop('selectedIndex');
            this.rebuildList();
        },
        attachEvents: function () {
            this.bindHandlers();
            this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
            this.listHolder.on('jcf-pointerdown', this.onPress);

            if (this.options.useHoverClass) {
                this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
            }
        },
        onPress: function (e) {
            $(this).trigger('press', e);
            this.listHolder.on('jcf-pointerup', this.onRelease);
        },
        onRelease: function (e) {
            $(this).trigger('release', e);
            this.listHolder.off('jcf-pointerup', this.onRelease);
        },
        onHoverItem: function (e) {
            var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
            this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
        },
        onItemPress: function (e) {
            if (e.pointerType === 'touch' || this.options.selectOnClick) {
                // select option after "click"
                this.tmpListOffsetTop = this.list.offset().top;
                this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
            } else {
                // select option immediately
                this.onSelectItem(e);
            }
        },
        onItemRelease: function (e) {
            // remove event handlers and temporary data
            this.listHolder.off('jcf-pointerup', this.indexSelector, this.onItemRelease);

            // simulate item selection
            if (this.tmpListOffsetTop === this.list.offset().top) {
                this.listHolder.on('click', this.indexSelector, { savedPointerType: e.pointerType }, this.onSelectItem);
            }
            delete this.tmpListOffsetTop;
        },
        onSelectItem: function (e) {
            var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),
                pointerType = e.data && e.data.savedPointerType || e.pointerType || 'mouse',
                range;

            // remove click event handler
            this.listHolder.off('click', this.indexSelector, this.onSelectItem);

            // ignore clicks on disabled options
            if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
                return;
            }

            if (this.element.prop('multiple')) {
                if (e.metaKey || e.ctrlKey || pointerType === 'touch' || this.options.multipleSelectWithoutKey) {
                    // if CTRL/CMD pressed or touch devices - toggle selected option
                    this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
                } else if (e.shiftKey) {
                    // if SHIFT pressed - update selection
                    range = [this.lastClickedIndex, clickedIndex].sort(function (a, b) {
                        return a - b;
                    });
                    this.realOptions.each(function (index, option) {
                        option.selected = (index >= range[0] && index <= range[1]);
                    });
                } else {
                    // set single selected index
                    this.element.prop('selectedIndex', clickedIndex);
                }
            } else {
                this.element.prop('selectedIndex', clickedIndex);
            }

            // save last clicked option
            if (!e.shiftKey) {
                this.lastClickedIndex = clickedIndex;
            }

            // refresh classes
            this.refreshSelectedClass();

            // scroll to active item in desktop browsers
            if (pointerType === 'mouse') {
                this.scrollToActiveOption();
            }

            // make callback when item selected
            $(this).trigger('select');
        },
        rebuildList: function () {
            // rebuild options
            var self = this,
                rootElement = this.element[0];

            // recursively create fake options
            this.storedSelectHTML = rootElement.innerHTML;
            this.optionIndex = 0;
            this.list = $(this.createOptionsList(rootElement));
            this.listHolder.empty().append(this.list);
            this.realOptions = this.element.find('option');
            this.fakeOptions = this.list.find(this.indexSelector);
            this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
            delete this.optionIndex;

            // detect max visible items
            var maxCount = this.options.maxVisibleItems,
                sizeValue = this.element.prop('size');
            if (sizeValue > 1 && !this.element.is('[jcf-size]')) {
                maxCount = sizeValue;
            }

            // handle scrollbar
            var needScrollBar = this.fakeOptions.length > maxCount;
            this.container.toggleClass(this.options.scrollClass, needScrollBar);
            if (needScrollBar) {
                // change max-height
                this.listHolder.css({
                    maxHeight: this.getOverflowHeight(maxCount),
                    overflow: 'auto'
                });

                if (this.options.useCustomScroll && jcf.modules.Scrollable) {
                    // add custom scrollbar if specified in options
                    jcf.replace(this.listHolder, 'Scrollable', {
                        handleResize: this.options.handleResize,
                        alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
                    });
                    return;
                }
            }

            // disable edge wheel scrolling
            if (this.options.alwaysPreventMouseWheel) {
                this.preventWheelHandler = function (e) {
                    var currentScrollTop = self.listHolder.scrollTop(),
                        maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight();

                    // check edge cases
                    if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
                        e.preventDefault();
                    }
                };
                this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
            }
        },
        refreshSelectedClass: function () {
            var self = this,
                selectedItem,
                isMultiple = this.element.prop('multiple'),
                selectedIndex = this.element.prop('selectedIndex');

            if (isMultiple) {
                this.realOptions.each(function (index, option) {
                    self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
                });
            } else {
                this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
                selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
                if (this.options.useHoverClass) {
                    selectedItem.addClass(this.options.hoverClass);
                }
            }
        },
        scrollToActiveOption: function () {
            // scroll to target option
            var targetOffset = this.getActiveOptionOffset();
            if (typeof targetOffset === 'number') {
                this.listHolder.prop('scrollTop', targetOffset);
            }
        },
        getSelectedIndexRange: function () {
            var firstSelected = -1, lastSelected = -1;
            this.realOptions.each(function (index, option) {
                if (option.selected) {
                    if (firstSelected < 0) {
                        firstSelected = index;
                    }
                    lastSelected = index;
                }
            });
            return [firstSelected, lastSelected];
        },
        getChangedSelectedIndex: function () {
            var selectedIndex = this.element.prop('selectedIndex'),
                targetIndex;

            if (this.element.prop('multiple')) {
                // multiple selects handling
                if (!this.previousRange) {
                    this.previousRange = [selectedIndex, selectedIndex];
                }
                this.currentRange = this.getSelectedIndexRange();
                targetIndex = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1];
                this.previousRange = this.currentRange;
                return targetIndex;
            } else {
                // single choice selects handling
                return selectedIndex;
            }
        },
        getActiveOptionOffset: function () {
            // calc values
            var dropHeight = this.listHolder.height(),
                dropScrollTop = this.listHolder.prop('scrollTop'),
                currentIndex = this.getChangedSelectedIndex(),
                fakeOption = this.fakeOptions.eq(currentIndex),
                fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
                fakeOptionHeight = fakeOption.innerHeight();

            // scroll list
            if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
                // scroll down (always scroll to option)
                return fakeOptionOffset - dropHeight + fakeOptionHeight;
            } else if (fakeOptionOffset < dropScrollTop) {
                // scroll up to option
                return fakeOptionOffset;
            }
        },
        getOverflowHeight: function (sizeValue) {
            var item = this.fakeListItems.eq(sizeValue - 1),
                listOffset = this.list.offset().top,
                itemOffset = item.offset().top,
                itemHeight = item.innerHeight();

            return itemOffset + itemHeight - listOffset;
        },
        getScrollTop: function () {
            return this.listHolder.scrollTop();
        },
        setScrollTop: function (value) {
            this.listHolder.scrollTop(value);
        },
        createOption: function (option) {
            var newOption = document.createElement('span');
            newOption.className = this.options.optionClass;
            newOption.innerHTML = option.innerHTML;
            newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

            var optionImage, optionImageSrc = option.getAttribute('data-image');
            if (optionImageSrc) {
                optionImage = document.createElement('img');
                optionImage.src = optionImageSrc;
                newOption.insertBefore(optionImage, newOption.childNodes[0]);
            }
            if (option.disabled) {
                newOption.className += ' ' + this.options.disabledClass;
            }
            if (option.className) {
                newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
            }
            return newOption;
        },
        createOptGroup: function (optgroup) {
            var optGroupContainer = document.createElement('span'),
                optGroupName = optgroup.getAttribute('label'),
                optGroupCaption, optGroupList;

            // create caption
            optGroupCaption = document.createElement('span');
            optGroupCaption.className = this.options.captionClass;
            optGroupCaption.innerHTML = optGroupName;
            optGroupContainer.appendChild(optGroupCaption);

            // create list of options
            if (optgroup.children.length) {
                optGroupList = this.createOptionsList(optgroup);
                optGroupContainer.appendChild(optGroupList);
            }

            optGroupContainer.className = this.options.groupClass;
            return optGroupContainer;
        },
        createOptionContainer: function () {
            var optionContainer = document.createElement('li');
            return optionContainer;
        },
        createOptionsList: function (container) {
            var self = this,
                list = document.createElement('ul');

            $.each(container.children, function (index, currentNode) {
                var item = self.createOptionContainer(currentNode),
                    newNode;

                switch (currentNode.tagName.toLowerCase()) {
                    case 'option': newNode = self.createOption(currentNode); break;
                    case 'optgroup': newNode = self.createOptGroup(currentNode); break;
                }
                list.appendChild(item).appendChild(newNode);
            });
            return list;
        },
        refresh: function () {
            // check for select innerHTML changes
            if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
                this.rebuildList();
            }

            // refresh custom scrollbar
            var scrollInstance = jcf.getInstance(this.listHolder);
            if (scrollInstance) {
                scrollInstance.refresh();
            }

            // refresh selectes classes
            this.refreshSelectedClass();
        },
        destroy: function () {
            this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
            this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
            this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
            this.listHolder.off('jcf-pointerdown', this.onPress);
        }
    });

    // helper functions
    var getPrefixedClasses = function (className, prefixToAdd) {
        return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
    };
    var makeUnselectable = (function () {
        var unselectableClass = jcf.getOptions().unselectableClass;
        function preventHandler(e) {
            e.preventDefault();
        }
        return function (node) {
            node.addClass(unselectableClass).on('selectstart', preventHandler);
        };
    }());

}(jQuery, this));

/*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($) {
    'use strict';

    jcf.addModule({
        name: 'Radio',
        selector: 'input[type="radio"]',
        options: {
            wrapNative: true,
            checkedClass: 'jcf-checked',
            uncheckedClass: 'jcf-unchecked',
            labelActiveClass: 'jcf-label-active',
            fakeStructure: '<span class="jcf-radio"><span></span></span>'
        },
        matchElement: function (element) {
            return element.is(':radio');
        },
        init: function () {
            this.initStructure();
            this.attachEvents();
            this.refresh();
        },
        initStructure: function () {
            // prepare structure
            this.doc = $(document);
            this.realElement = $(this.options.element);
            this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
            this.labelElement = this.getLabelFor();

            if (this.options.wrapNative) {
                // wrap native radio inside fake block
                this.realElement.prependTo(this.fakeElement).css({
                    position: 'absolute',
                    opacity: 0
                });
            } else {
                // just hide native radio
                this.realElement.addClass(this.options.hiddenClass);
            }
        },
        attachEvents: function () {
            // add event handlers
            this.realElement.on({
                focus: this.onFocus,
                click: this.onRealClick
            });
            this.fakeElement.on('click', this.onFakeClick);
            this.fakeElement.on('jcf-pointerdown', this.onPress);
        },
        onRealClick: function (e) {
            // redraw current radio and its group (setTimeout handles click that might be prevented)
            var self = this;
            this.savedEventObject = e;
            setTimeout(function () {
                self.refreshRadioGroup();
            }, 0);
        },
        onFakeClick: function (e) {
            // skip event if clicked on real element inside wrapper
            if (this.options.wrapNative && this.realElement.is(e.target)) {
                return;
            }

            // toggle checked class
            if (!this.realElement.is(':disabled')) {
                delete this.savedEventObject;
                this.currentActiveRadio = this.getCurrentActiveRadio();
                this.stateChecked = this.realElement.prop('checked');
                this.realElement.prop('checked', true);
                this.fireNativeEvent(this.realElement, 'click');
                if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
                    this.realElement.prop('checked', this.stateChecked);
                    this.currentActiveRadio.prop('checked', true);
                } else {
                    this.fireNativeEvent(this.realElement, 'change');
                }
                delete this.savedEventObject;
            }
        },
        onFocus: function () {
            if (!this.pressedFlag || !this.focusedFlag) {
                this.focusedFlag = true;
                this.fakeElement.addClass(this.options.focusClass);
                this.realElement.on('blur', this.onBlur);
            }
        },
        onBlur: function () {
            if (!this.pressedFlag) {
                this.focusedFlag = false;
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off('blur', this.onBlur);
            }
        },
        onPress: function (e) {
            if (!this.focusedFlag && e.pointerType === 'mouse') {
                this.realElement.focus();
            }
            this.pressedFlag = true;
            this.fakeElement.addClass(this.options.pressedClass);
            this.doc.on('jcf-pointerup', this.onRelease);
        },
        onRelease: function (e) {
            if (this.focusedFlag && e.pointerType === 'mouse') {
                this.realElement.focus();
            }
            this.pressedFlag = false;
            this.fakeElement.removeClass(this.options.pressedClass);
            this.doc.off('jcf-pointerup', this.onRelease);
        },
        getCurrentActiveRadio: function () {
            return this.getRadioGroup(this.realElement).filter(':checked');
        },
        getRadioGroup: function (radio) {
            // find radio group for specified radio button
            var name = radio.attr('name'),
                parentForm = radio.parents('form');

            if (name) {
                if (parentForm.length) {
                    return parentForm.find('input[name="' + name + '"]');
                } else {
                    return $('input[name="' + name + '"]:not(form input)');
                }
            } else {
                return radio;
            }
        },
        getLabelFor: function () {
            var parentLabel = this.realElement.closest('label'),
                elementId = this.realElement.prop('id');

            if (!parentLabel.length && elementId) {
                parentLabel = $('label[for="' + elementId + '"]');
            }
            return parentLabel.length ? parentLabel : null;
        },
        refreshRadioGroup: function () {
            // redraw current radio and its group
            this.getRadioGroup(this.realElement).each(function () {
                jcf.refresh(this);
            });
        },
        refresh: function () {
            // redraw current radio button
            var isChecked = this.realElement.is(':checked'),
                isDisabled = this.realElement.is(':disabled');

            this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
                .toggleClass(this.options.uncheckedClass, !isChecked)
                .toggleClass(this.options.disabledClass, isDisabled);

            if (this.labelElement) {
                this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
            }
        },
        destroy: function () {
            // restore structure
            if (this.options.wrapNative) {
                this.realElement.insertBefore(this.fakeElement).css({
                    position: '',
                    width: '',
                    height: '',
                    opacity: '',
                    margin: ''
                });
            } else {
                this.realElement.removeClass(this.options.hiddenClass);
            }

            // removing element will also remove its event handlers
            this.fakeElement.off('jcf-pointerdown', this.onPress);
            this.fakeElement.remove();

            // remove other event handlers
            this.doc.off('jcf-pointerup', this.onRelease);
            this.realElement.off({
                blur: this.onBlur,
                focus: this.onFocus,
                click: this.onRealClick
            });
        }
    });

}(jQuery));

/*!
 * JavaScript Custom Forms : Checkbox Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($) {
    'use strict';

    jcf.addModule({
        name: 'Checkbox',
        selector: 'input[type="checkbox"]',
        options: {
            wrapNative: true,
            checkedClass: 'jcf-checked',
            uncheckedClass: 'jcf-unchecked',
            labelActiveClass: 'jcf-label-active',
            fakeStructure: '<span class="jcf-checkbox"><span></span></span>'
        },
        matchElement: function (element) {
            return element.is(':checkbox');
        },
        init: function () {
            this.initStructure();
            this.attachEvents();
            this.refresh();
        },
        initStructure: function () {
            // prepare structure
            this.doc = $(document);
            this.realElement = $(this.options.element);
            this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
            this.labelElement = this.getLabelFor();

            if (this.options.wrapNative) {
                // wrap native checkbox inside fake block
                this.realElement.appendTo(this.fakeElement).css({
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    opacity: 0,
                    margin: 0
                });
            } else {
                // just hide native checkbox
                this.realElement.addClass(this.options.hiddenClass);
            }
        },
        attachEvents: function () {
            // add event handlers
            this.realElement.on({
                focus: this.onFocus,
                click: this.onRealClick
            });
            this.fakeElement.on('click', this.onFakeClick);
            this.fakeElement.on('jcf-pointerdown', this.onPress);
        },
        onRealClick: function (e) {
            // just redraw fake element (setTimeout handles click that might be prevented)
            var self = this;
            this.savedEventObject = e;
            setTimeout(function () {
                self.refresh();
            }, 0);
        },
        onFakeClick: function (e) {
            // skip event if clicked on real element inside wrapper
            if (this.options.wrapNative && this.realElement.is(e.target)) {
                return;
            }

            // toggle checked class
            if (!this.realElement.is(':disabled')) {
                delete this.savedEventObject;
                this.stateChecked = this.realElement.prop('checked');
                this.realElement.prop('checked', !this.stateChecked);
                this.fireNativeEvent(this.realElement, 'click');
                if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
                    this.realElement.prop('checked', this.stateChecked);
                } else {
                    this.fireNativeEvent(this.realElement, 'change');
                }
                delete this.savedEventObject;
            }
        },
        onFocus: function () {
            if (!this.pressedFlag || !this.focusedFlag) {
                this.focusedFlag = true;
                this.fakeElement.addClass(this.options.focusClass);
                this.realElement.on('blur', this.onBlur);
            }
        },
        onBlur: function () {
            if (!this.pressedFlag) {
                this.focusedFlag = false;
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off('blur', this.onBlur);
            }
        },
        onPress: function (e) {
            if (!this.focusedFlag && e.pointerType === 'mouse') {
                this.realElement.focus();
            }
            this.pressedFlag = true;
            this.fakeElement.addClass(this.options.pressedClass);
            this.doc.on('jcf-pointerup', this.onRelease);
        },
        onRelease: function (e) {
            if (this.focusedFlag && e.pointerType === 'mouse') {
                this.realElement.focus();
            }
            this.pressedFlag = false;
            this.fakeElement.removeClass(this.options.pressedClass);
            this.doc.off('jcf-pointerup', this.onRelease);
        },
        getLabelFor: function () {
            var parentLabel = this.realElement.closest('label'),
                elementId = this.realElement.prop('id');

            if (!parentLabel.length && elementId) {
                parentLabel = $('label[for="' + elementId + '"]');
            }
            return parentLabel.length ? parentLabel : null;
        },
        refresh: function () {
            // redraw custom checkbox
            var isChecked = this.realElement.is(':checked'),
                isDisabled = this.realElement.is(':disabled');

            this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
                .toggleClass(this.options.uncheckedClass, !isChecked)
                .toggleClass(this.options.disabledClass, isDisabled);

            if (this.labelElement) {
                this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
            }
        },
        destroy: function () {
            // restore structure
            if (this.options.wrapNative) {
                this.realElement.insertBefore(this.fakeElement).css({
                    position: '',
                    width: '',
                    height: '',
                    opacity: '',
                    margin: ''
                });
            } else {
                this.realElement.removeClass(this.options.hiddenClass);
            }

            // removing element will also remove its event handlers
            this.fakeElement.off('jcf-pointerdown', this.onPress);
            this.fakeElement.remove();

            // remove other event handlers
            this.doc.off('jcf-pointerup', this.onRelease);
            this.realElement.off({
                focus: this.onFocus,
                click: this.onRealClick
            });
        }
    });

}(jQuery));


/*
 * jQuery form validation plugin
 */
; (function ($) {
    'use strict';

    var FormValidation = (function () {
        var Validator = function ($field, $fields) {
            this.$field = $field;
            this.$fields = $fields;
        };

        Validator.prototype = {
            reg: {
                email: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$',
                number: '^[0-9]+$'
            },

            checkField: function () {
                return {
                    state: this.run(),
                    $fields: this.$field.add(this.additionalFields)
                }
            },

            run: function () {
                var fieldType;

                switch (this.$field.get(0).tagName.toUpperCase()) {
                    case 'SELECT':
                        fieldType = 'select';
                        break;

                    case 'TEXTAREA':
                        fieldType = 'text';
                        break;

                    default:
                        fieldType = this.$field.data('type') || this.$field.attr('type');
                }

                var functionName = 'check_' + fieldType;
                var state = true;

                if ($.isFunction(this[functionName])) {
                    state = this[functionName]();

                    if (state && this.$field.data('confirm')) {
                        state = this.check_confirm();
                    }
                }

                return state;
            },

            check_email: function () {
                var value = this.getValue();
                var required = this.$field.data('required');
                var requiredOrValue = required || value.length;

                if ((requiredOrValue && !this.check_regexp(value, this.reg.email))) {
                    return false;
                }

                return requiredOrValue ? true : null;
            },

            check_number: function () {
                var value = this.getValue();
                var required = this.$field.data('required');
                var isNumber = this.check_regexp(value, this.reg.number);
                var requiredOrValue = required || value.length;

                if (requiredOrValue && !isNumber) {
                    return false;
                }

                var min = this.$field.data('min');
                var max = this.$field.data('max');
                value = +value;

                if ((min && (value < min || !isNumber)) || (max && (value > max || !isNumber))) {
                    return false;
                }

                return (requiredOrValue || min || max) ? true : null;
            },

            check_password: function () {
                return this.check_text();
            },

            check_text: function () {
                var value = this.getValue();
                var required = this.$field.data('required');

                if (this.$field.data('required') && !value.length) {
                    return false;
                }

                var min = +this.$field.data('min');
                var max = +this.$field.data('max');

                if ((min && value.length < min) || (max && value.length > max)) {
                    return false;
                }

                var regExp = this.$field.data('regexp');

                if (regExp && !this.check_regexp(value, regExp)) {
                    return false;
                }

                return (required || min || max || regExp) ? true : null;
            },

            check_confirm: function () {
                var value = this.getValue();
                var $confirmFields = this.$fields.filter('[data-confirm="' + this.$field.data('confirm') + '"]');
                var confirmState = true;

                for (var i = $confirmFields.length - 1; i >= 0; i--) {
                    if ($confirmFields.eq(i).val() !== value || !value.length) {
                        confirmState = false;
                        break;
                    }
                }

                this.additionalFields = $confirmFields;

                return confirmState;
            },

            check_select: function () {
                var required = this.$field.data('required');

                if (required && this.$field.get(0).selectedIndex === 0) {
                    return false;
                }

                return required ? true : null;
            },

            check_radio: function () {
                var $fields = this.$fields.filter('[name="' + this.$field.attr('name') + '"]');
                var required = this.$field.data('required');

                if (required && !$fields.filter(':checked').length) {
                    return false;
                }

                this.additionalFields = $fields;

                return required ? true : null;
            },

            check_checkbox: function () {
                var required = this.$field.data('required');

                if (required && !this.$field.prop('checked')) {
                    return false;
                }

                return required ? true : null;
            },

            check_at_least_one: function () {
                var $fields = this.$fields.filter('[data-name="' + this.$field.data('name') + '"]');

                if (!$fields.filter(':checked').length) {
                    return false;
                }

                this.additionalFields = $fields;

                return true;
            },

            check_regexp: function (val, exp) {
                return new RegExp(exp).test(val);
            },

            getValue: function () {
                if (this.$field.data('trim')) {
                    this.$field.val($.trim(this.$field.val()));
                }

                return this.$field.val();
            }
        };

        var publicClass = function (form, options) {
            this.$form = $(form).attr('novalidate', 'novalidate');
            this.options = options;
        };

        publicClass.prototype = {
            buildSelector: function (input) {
                return ':input:not(' + this.options.skipDefaultFields + (this.options.skipFields ? ',' + this.options.skipFields : '') + ')';
            },

            init: function () {
                this.fieldsSelector = this.buildSelector(':input');

                this.$form
                    .on('submit', this.submitHandler.bind(this))
                    .on('keyup blur', this.fieldsSelector, this.changeHandler.bind(this))
                    .on('change', this.buildSelector('select'), this.changeHandler.bind(this))
                    .on('focus', this.fieldsSelector, this.focusHandler.bind(this));
            },

            submitHandler: function (e) {
                var self = this;
                var $fields = this.getFormFields();

                this.getClassTarget($fields)
                    .removeClass(this.options.errorClass + ' ' + this.options.successClass);

                this.setFormState(true);

                $fields.each(function (i, input) {
                    var $field = $(input);
                    var $classTarget = self.getClassTarget($field);

                    // continue iteration if $field has error class already
                    if ($classTarget.hasClass(self.options.errorClass)) {
                        return;
                    }

                    self.setState(new Validator($field, $fields).checkField());
                });

                return this.checkSuccess($fields, e);
            },

            checkSuccess: function ($fields, e) {
                var self = this;
                var success = this.getClassTarget($fields || this.getFormFields())
                    .filter('.' + this.options.errorClass).length === 0;

                if (e && success && this.options.successSendClass) {
                    e.preventDefault();

                    $.ajax({
                        url: this.$form.removeClass(this.options.successSendClass).attr('action') || '/',
                        type: this.$form.attr('method') || 'POST',
                        data: this.$form.serialize(),
                        success: function () {
                            self.$form.addClass(self.options.successSendClass);
                        }
                    });
                }

                this.setFormState(success);

                return success;
            },

            changeHandler: function (e) {
                var $field = $(e.target);

                if ($field.data('interactive')) {
                    this.setState(new Validator($field, this.getFormFields()).checkField());
                }

                this.checkSuccess();
            },

            focusHandler: function (e) {
                var $field = $(e.target);

                this.getClassTarget($field)
                    .removeClass(this.options.errorClass + ' ' + this.options.successClass);

                this.checkSuccess();
            },

            setState: function (result) {
                this.getClassTarget(result.$fields)
                    .toggleClass(this.options.errorClass, result.state !== null && !result.state)
                    .toggleClass(this.options.successClass, result.state !== null && this.options.successClass && !!result.state);
            },

            setFormState: function (state) {
                if (this.options.errorFormClass) {
                    this.$form.toggleClass(this.options.errorFormClass, !state);
                }
            },

            getClassTarget: function ($input) {
                return (this.options.addClassToParent ? $input.closest(this.options.addClassToParent) : $input);
            },

            getFormFields: function () {
                return this.$form.find(this.fieldsSelector);
            }
        };

        return publicClass;
    }());

    $.fn.formValidation = function (options) {
        options = $.extend({}, {
            errorClass: 'input-error',
            successClass: '',
            errorFormClass: '',
            addClassToParent: '',
            skipDefaultFields: ':button, :submit, :image, :hidden, :reset',
            skipFields: '',
            successSendClass: ''
        }, options);

        return this.each(function () {
            new FormValidation(this, options).init();
        });
    };
}(jQuery));



/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
!function (e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) }(function (e) { function t(t, n) { var s, o, u, r = t.nodeName.toLowerCase(); return "area" === r ? (s = t.parentNode, o = s.name, t.href && o && "map" === s.nodeName.toLowerCase() ? (u = e("img[usemap='#" + o + "']")[0], !!u && i(u)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r ? t.href || n : n) && i(t) } function i(t) { return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () { return "hidden" === e.css(this, "visibility") }).length } e.ui = e.ui || {}, e.extend(e.ui, { version: "1.11.4", keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 } }), e.fn.extend({ scrollParent: function (t) { var i = this.css("position"), n = "absolute" === i, s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/, o = this.parents().filter(function () { var t = e(this); return n && "static" === t.css("position") ? !1 : s.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x")) }).eq(0); return "fixed" !== i && o.length ? o : e(this[0].ownerDocument || document) }, uniqueId: function () { var e = 0; return function () { return this.each(function () { this.id || (this.id = "ui-id-" + ++e) }) } }(), removeUniqueId: function () { return this.each(function () { /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id") }) } }), e.extend(e.expr[":"], { data: e.expr.createPseudo ? e.expr.createPseudo(function (t) { return function (i) { return !!e.data(i, t) } }) : function (t, i, n) { return !!e.data(t, n[3]) }, focusable: function (i) { return t(i, !isNaN(e.attr(i, "tabindex"))) }, tabbable: function (i) { var n = e.attr(i, "tabindex"), s = isNaN(n); return (s || n >= 0) && t(i, !s) } }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (t, i) { function n(t, i, n, o) { return e.each(s, function () { i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), o && (i -= parseFloat(e.css(t, "margin" + this)) || 0) }), i } var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], o = i.toLowerCase(), u = { innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight }; e.fn["inner" + i] = function (t) { return void 0 === t ? u["inner" + i].call(this) : this.each(function () { e(this).css(o, n(this, t) + "px") }) }, e.fn["outer" + i] = function (t, s) { return "number" != typeof t ? u["outer" + i].call(this, t) : this.each(function () { e(this).css(o, n(this, t, !0, s) + "px") }) } }), e.fn.addBack || (e.fn.addBack = function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) { return function (i) { return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this) } }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({ focus: function (t) { return function (i, n) { return "number" == typeof i ? this.each(function () { var t = this; setTimeout(function () { e(t).focus(), n && n.call(t) }, i) }) : t.apply(this, arguments) } }(e.fn.focus), disableSelection: function () { var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown"; return function () { return this.bind(e + ".ui-disableSelection", function (e) { e.preventDefault() }) } }(), enableSelection: function () { return this.unbind(".ui-disableSelection") }, zIndex: function (t) { if (void 0 !== t) return this.css("zIndex", t); if (this.length) for (var i, n, s = e(this[0]); s.length && s[0] !== document;) { if (i = s.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (n = parseInt(s.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n; s = s.parent() } return 0 } }), e.ui.plugin = { add: function (t, i, n) { var s, o = e.ui[t].prototype; for (s in n) o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([i, n[s]]) }, call: function (e, t, i, n) { var s, o = e.plugins[t]; if (o && (n || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)) for (s = 0; s < o.length; s++)e.options[o[s][0]] && o[s][1].apply(e.element, i) } } });

/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
!function (e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) }(function (e) { var t = 0, i = Array.prototype.slice; e.cleanData = function (t) { return function (i) { var n, s, a; for (a = 0; null != (s = i[a]); a++)try { n = e._data(s, "events"), n && n.remove && e(s).triggerHandler("remove") } catch (o) { } t(i) } }(e.cleanData), e.widget = function (t, i, n) { var s, a, o, r, u = {}, l = t.split(".")[0]; return t = t.split(".")[1], s = l + "-" + t, n || (n = i, i = e.Widget), e.expr[":"][s.toLowerCase()] = function (t) { return !!e.data(t, s) }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function (e, t) { return this._createWidget ? void (arguments.length && this._createWidget(e, t)) : new o(e, t) }, e.extend(o, a, { version: n.version, _proto: e.extend({}, n), _childConstructors: [] }), r = new i, r.options = e.widget.extend({}, r.options), e.each(n, function (t, n) { return e.isFunction(n) ? void (u[t] = function () { var e = function () { return i.prototype[t].apply(this, arguments) }, s = function (e) { return i.prototype[t].apply(this, e) }; return function () { var t, i = this._super, a = this._superApply; return this._super = e, this._superApply = s, t = n.apply(this, arguments), this._super = i, this._superApply = a, t } }()) : void (u[t] = n) }), o.prototype = e.widget.extend(r, { widgetEventPrefix: a ? r.widgetEventPrefix || t : t }, u, { constructor: o, namespace: l, widgetName: t, widgetFullName: s }), a ? (e.each(a._childConstructors, function (t, i) { var n = i.prototype; e.widget(n.namespace + "." + n.widgetName, o, i._proto) }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o }, e.widget.extend = function (t) { for (var n, s, a = i.call(arguments, 1), o = 0, r = a.length; r > o; o++)for (n in a[o]) s = a[o][n], a[o].hasOwnProperty(n) && void 0 !== s && (t[n] = e.isPlainObject(s) ? e.isPlainObject(t[n]) ? e.widget.extend({}, t[n], s) : e.widget.extend({}, s) : s); return t }, e.widget.bridge = function (t, n) { var s = n.prototype.widgetFullName || t; e.fn[t] = function (a) { var o = "string" == typeof a, r = i.call(arguments, 1), u = this; return o ? this.each(function () { var i, n = e.data(this, s); return "instance" === a ? (u = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (u = i && i.jquery ? u.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + a + "'") }) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function () { var t = e.data(this, s); t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new n(a, this)) })), u } }, e.Widget = function () { }, e.Widget._childConstructors = [], e.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { disabled: !1, create: null }, _createWidget: function (i, n) { n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = t++ , this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), n !== this && (e.data(n, this.widgetFullName, this), this._on(!0, this.element, { remove: function (e) { e.target === n && this.destroy() } }), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init() }, _getCreateOptions: e.noop, _getCreateEventData: e.noop, _create: e.noop, _init: e.noop, destroy: function () { this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus") }, _destroy: e.noop, widget: function () { return this.element }, option: function (t, i) { var n, s, a, o = t; if (0 === arguments.length) return e.widget.extend({}, this.options); if ("string" == typeof t) if (o = {}, n = t.split("."), t = n.shift(), n.length) { for (s = o[t] = e.widget.extend({}, this.options[t]), a = 0; a < n.length - 1; a++)s[n[a]] = s[n[a]] || {}, s = s[n[a]]; if (t = n.pop(), 1 === arguments.length) return void 0 === s[t] ? null : s[t]; s[t] = i } else { if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t]; o[t] = i } return this._setOptions(o), this }, _setOptions: function (e) { var t; for (t in e) this._setOption(t, e[t]); return this }, _setOption: function (e, t) { return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this }, enable: function () { return this._setOptions({ disabled: !1 }) }, disable: function () { return this._setOptions({ disabled: !0 }) }, _on: function (t, i, n) { var s, a = this; "boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = s = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), e.each(n, function (n, o) { function r() { return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0 } "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++); var u = n.match(/^([\w:-]*)\s*(.*)$/), l = u[1] + a.eventNamespace, h = u[2]; h ? s.delegate(h, l, r) : i.bind(l, r) }) }, _off: function (t, i) { i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get()) }, _delay: function (e, t) { function i() { return ("string" == typeof e ? n[e] : e).apply(n, arguments) } var n = this; return setTimeout(i, t || 0) }, _hoverable: function (t) { this.hoverable = this.hoverable.add(t), this._on(t, { mouseenter: function (t) { e(t.currentTarget).addClass("ui-state-hover") }, mouseleave: function (t) { e(t.currentTarget).removeClass("ui-state-hover") } }) }, _focusable: function (t) { this.focusable = this.focusable.add(t), this._on(t, { focusin: function (t) { e(t.currentTarget).addClass("ui-state-focus") }, focusout: function (t) { e(t.currentTarget).removeClass("ui-state-focus") } }) }, _trigger: function (t, i, n) { var s, a, o = this.options[t]; if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) for (s in a) s in i || (i[s] = a[s]); return this.element.trigger(i, n), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented()) } }, e.each({ show: "fadeIn", hide: "fadeOut" }, function (t, i) { e.Widget.prototype["_" + t] = function (n, s, a) { "string" == typeof s && (s = { effect: s }); var o, r = s ? s === !0 || "number" == typeof s ? i : s.effect || i : t; s = s || {}, "number" == typeof s && (s = { duration: s }), o = !e.isEmptyObject(s), s.complete = a, s.delay && n.delay(s.delay), o && e.effects && e.effects.effect[r] ? n[t](s) : r !== t && n[r] ? n[r](s.duration, s.easing, a) : n.queue(function (i) { e(this)[t](), a && a.call(n[0]), i() }) } }); e.widget });

/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
!function (e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) }(function (e) { !function () { function t(e, t, i) { return [parseFloat(e[0]) * (m.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (m.test(e[1]) ? i / 100 : 1)] } function i(t, i) { return parseInt(e.css(t, i), 10) || 0 } function s(t) { var i = t[0]; return 9 === i.nodeType ? { width: t.width(), height: t.height(), offset: { top: 0, left: 0 } } : e.isWindow(i) ? { width: t.width(), height: t.height(), offset: { top: t.scrollTop(), left: t.scrollLeft() } } : i.preventDefault ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } } : { width: t.outerWidth(), height: t.outerHeight(), offset: t.offset() } } e.ui = e.ui || {}; var n, a, o = Math.max, r = Math.abs, u = Math.round, l = /left|center|right/, h = /top|center|bottom/, c = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, m = /%$/, p = e.fn.position; e.position = { scrollbarWidth: function () { if (void 0 !== n) return n; var t, i, s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), a = s.children()[0]; return e("body").append(s), t = a.offsetWidth, s.css("overflow", "scroll"), i = a.offsetWidth, t === i && (i = s[0].clientWidth), s.remove(), n = t - i }, getScrollInfo: function (t) { var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"), s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"), n = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth, a = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight; return { width: a ? e.position.scrollbarWidth() : 0, height: n ? e.position.scrollbarWidth() : 0 } }, getWithinInfo: function (t) { var i = e(t || window), s = e.isWindow(i[0]), n = !!i[0] && 9 === i[0].nodeType; return { element: i, isWindow: s, isDocument: n, offset: i.offset() || { left: 0, top: 0 }, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: s || n ? i.width() : i.outerWidth(), height: s || n ? i.height() : i.outerHeight() } } }, e.fn.position = function (n) { if (!n || !n.of) return p.apply(this, arguments); n = e.extend({}, n); var m, f, v, g, _, y, b = e(n.of), k = e.position.getWithinInfo(n.within), D = e.position.getScrollInfo(k), x = (n.collision || "flip").split(" "), w = {}; return y = s(b), b[0].preventDefault && (n.at = "left top"), f = y.width, v = y.height, g = y.offset, _ = e.extend({}, g), e.each(["my", "at"], function () { var e, t, i = (n[this] || "").split(" "); 1 === i.length && (i = l.test(i[0]) ? i.concat(["center"]) : h.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = l.test(i[0]) ? i[0] : "center", i[1] = h.test(i[1]) ? i[1] : "center", e = c.exec(i[0]), t = c.exec(i[1]), w[this] = [e ? e[0] : 0, t ? t[0] : 0], n[this] = [d.exec(i[0])[0], d.exec(i[1])[0]] }), 1 === x.length && (x[1] = x[0]), "right" === n.at[0] ? _.left += f : "center" === n.at[0] && (_.left += f / 2), "bottom" === n.at[1] ? _.top += v : "center" === n.at[1] && (_.top += v / 2), m = t(w.at, f, v), _.left += m[0], _.top += m[1], this.each(function () { var s, l, h = e(this), c = h.outerWidth(), d = h.outerHeight(), p = i(this, "marginLeft"), y = i(this, "marginTop"), M = c + p + i(this, "marginRight") + D.width, T = d + y + i(this, "marginBottom") + D.height, C = e.extend({}, _), I = t(w.my, h.outerWidth(), h.outerHeight()); "right" === n.my[0] ? C.left -= c : "center" === n.my[0] && (C.left -= c / 2), "bottom" === n.my[1] ? C.top -= d : "center" === n.my[1] && (C.top -= d / 2), C.left += I[0], C.top += I[1], a || (C.left = u(C.left), C.top = u(C.top)), s = { marginLeft: p, marginTop: y }, e.each(["left", "top"], function (t, i) { e.ui.position[x[t]] && e.ui.position[x[t]][i](C, { targetWidth: f, targetHeight: v, elemWidth: c, elemHeight: d, collisionPosition: s, collisionWidth: M, collisionHeight: T, offset: [m[0] + I[0], m[1] + I[1]], my: n.my, at: n.at, within: k, elem: h }) }), n.using && (l = function (e) { var t = g.left - C.left, i = t + f - c, s = g.top - C.top, a = s + v - d, u = { target: { element: b, left: g.left, top: g.top, width: f, height: v }, element: { element: h, left: C.left, top: C.top, width: c, height: d }, horizontal: 0 > i ? "left" : t > 0 ? "right" : "center", vertical: 0 > a ? "top" : s > 0 ? "bottom" : "middle" }; c > f && r(t + i) < f && (u.horizontal = "center"), d > v && r(s + a) < v && (u.vertical = "middle"), u.important = o(r(t), r(i)) > o(r(s), r(a)) ? "horizontal" : "vertical", n.using.call(this, e, u) }), h.offset(e.extend(C, { using: l })) }) }, e.ui.position = { fit: { left: function (e, t) { var i, s = t.within, n = s.isWindow ? s.scrollLeft : s.offset.left, a = s.width, r = e.left - t.collisionPosition.marginLeft, u = n - r, l = r + t.collisionWidth - a - n; t.collisionWidth > a ? u > 0 && 0 >= l ? (i = e.left + u + t.collisionWidth - a - n, e.left += u - i) : e.left = l > 0 && 0 >= u ? n : u > l ? n + a - t.collisionWidth : n : u > 0 ? e.left += u : l > 0 ? e.left -= l : e.left = o(e.left - r, e.left) }, top: function (e, t) { var i, s = t.within, n = s.isWindow ? s.scrollTop : s.offset.top, a = t.within.height, r = e.top - t.collisionPosition.marginTop, u = n - r, l = r + t.collisionHeight - a - n; t.collisionHeight > a ? u > 0 && 0 >= l ? (i = e.top + u + t.collisionHeight - a - n, e.top += u - i) : e.top = l > 0 && 0 >= u ? n : u > l ? n + a - t.collisionHeight : n : u > 0 ? e.top += u : l > 0 ? e.top -= l : e.top = o(e.top - r, e.top) } }, flip: { left: function (e, t) { var i, s, n = t.within, a = n.offset.left + n.scrollLeft, o = n.width, u = n.isWindow ? n.scrollLeft : n.offset.left, l = e.left - t.collisionPosition.marginLeft, h = l - u, c = l + t.collisionWidth - o - u, d = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0, m = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0, p = -2 * t.offset[0]; 0 > h ? (i = e.left + d + m + p + t.collisionWidth - o - a, (0 > i || i < r(h)) && (e.left += d + m + p)) : c > 0 && (s = e.left - t.collisionPosition.marginLeft + d + m + p - u, (s > 0 || r(s) < c) && (e.left += d + m + p)) }, top: function (e, t) { var i, s, n = t.within, a = n.offset.top + n.scrollTop, o = n.height, u = n.isWindow ? n.scrollTop : n.offset.top, l = e.top - t.collisionPosition.marginTop, h = l - u, c = l + t.collisionHeight - o - u, d = "top" === t.my[1], m = d ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0, p = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0, f = -2 * t.offset[1]; 0 > h ? (s = e.top + m + p + f + t.collisionHeight - o - a, (0 > s || s < r(h)) && (e.top += m + p + f)) : c > 0 && (i = e.top - t.collisionPosition.marginTop + m + p + f - u, (i > 0 || r(i) < c) && (e.top += m + p + f)) } }, flipfit: { left: function () { e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments) }, top: function () { e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments) } } }, function () { var t, i, s, n, o, r = document.getElementsByTagName("body")[0], u = document.createElement("div"); t = document.createElement(r ? "div" : "body"), s = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }, r && e.extend(s, { position: "absolute", left: "-1000px", top: "-1000px" }); for (o in s) t.style[o] = s[o]; t.appendChild(u), i = r || document.documentElement, i.insertBefore(t, i.firstChild), u.style.cssText = "position: absolute; left: 10.7432222px;", n = e(u).offset().left, a = n > 10 && 11 > n, t.innerHTML = "", i.removeChild(t) }() }(); e.ui.position });

/*!
 * jQuery UI Autocomplete 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 */
!function (e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) }(function (e) { e.widget("ui.autocomplete", { version: "1.11.4", defaultElement: "<input>", options: { appendTo: null, autoFocus: !1, delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null }, requestIndex: 0, pending: 0, _create: function () { var t, i, s, n = this.element[0].nodeName.toLowerCase(), o = "textarea" === n, u = "input" === n; this.isMultiLine = o ? !0 : u ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || u ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, { keydown: function (n) { if (this.element.prop("readOnly")) return t = !0, s = !0, void (i = !0); t = !1, s = !1, i = !1; var o = e.ui.keyCode; switch (n.keyCode) { case o.PAGE_UP: t = !0, this._move("previousPage", n); break; case o.PAGE_DOWN: t = !0, this._move("nextPage", n); break; case o.UP: t = !0, this._keyEvent("previous", n); break; case o.DOWN: t = !0, this._keyEvent("next", n); break; case o.ENTER: this.menu.active && (t = !0, n.preventDefault(), this.menu.select(n)); break; case o.TAB: this.menu.active && this.menu.select(n); break; case o.ESCAPE: this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault()); break; default: i = !0, this._searchTimeout(n) } }, keypress: function (s) { if (t) return t = !1, void ((!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault()); if (!i) { var n = e.ui.keyCode; switch (s.keyCode) { case n.PAGE_UP: this._move("previousPage", s); break; case n.PAGE_DOWN: this._move("nextPage", s); break; case n.UP: this._keyEvent("previous", s); break; case n.DOWN: this._keyEvent("next", s) } } }, input: function (e) { return s ? (s = !1, void e.preventDefault()) : void this._searchTimeout(e) }, focus: function () { this.selectedItem = null, this.previous = this._value() }, blur: function (e) { return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(e), void this._change(e)) } }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance"), this._on(this.menu.element, { mousedown: function (t) { t.preventDefault(), this.cancelBlur = !0, this._delay(function () { delete this.cancelBlur }); var i = this.menu.element[0]; e(t.target).closest(".ui-menu-item").length || this._delay(function () { var t = this; this.document.one("mousedown", function (s) { s.target === t.element[0] || s.target === i || e.contains(i, s.target) || t.close() }) }) }, menufocus: function (t, i) { var s, n; return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function () { e(t.target).trigger(t.originalEvent) })) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, { item: n }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, void (s && e.trim(s).length && (this.liveRegion.children().hide(), e("<div>").text(s).appendTo(this.liveRegion)))) }, menuselect: function (e, t) { var i = t.item.data("ui-autocomplete-item"), s = this.previous; this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function () { this.previous = s, this.selectedItem = i })), !1 !== this._trigger("select", e, { item: i }) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i } }), this.liveRegion = e("<span>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, { beforeunload: function () { this.element.removeAttr("autocomplete") } }) }, _destroy: function () { clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove() }, _setOption: function (e, t) { this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort() }, _appendTo: function () { var t = this.options.appendTo; return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t }, _initSource: function () { var t, i, s = this; e.isArray(this.options.source) ? (t = this.options.source, this.source = function (i, s) { s(e.ui.autocomplete.filter(t, i.term)) }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (t, n) { s.xhr && s.xhr.abort(), s.xhr = e.ajax({ url: i, data: t, dataType: "json", success: function (e) { n(e) }, error: function () { n([]) } }) }) : this.source = this.options.source }, _searchTimeout: function (e) { clearTimeout(this.searching), this.searching = this._delay(function () { var t = this.term === this._value(), i = this.menu.element.is(":visible"), s = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey; (!t || t && !i && !s) && (this.selectedItem = null, this.search(null, e)) }, this.options.delay) }, search: function (e, t) { return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : void 0 }, _search: function (e) { this.pending++ , this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({ term: e }, this._response()) }, _response: function () { var t = ++this.requestIndex; return e.proxy(function (e) { t === this.requestIndex && this.__response(e), this.pending-- , this.pending || this.element.removeClass("ui-autocomplete-loading") }, this) }, __response: function (e) { e && (e = this._normalize(e)), this._trigger("response", null, { content: e }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close() }, close: function (e) { this.cancelSearch = !0, this._close(e) }, _close: function (e) { this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e)) }, _change: function (e) { this.previous !== this._value() && this._trigger("change", e, { item: this.selectedItem }) }, _normalize: function (t) { return t.length && t[0].label && t[0].value ? t : e.map(t, function (t) { return "string" == typeof t ? { label: t, value: t } : e.extend({}, t, { label: t.label || t.value, value: t.value || t.label }) }) }, _suggest: function (t) { var i = this.menu.element.empty(); this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next() }, _resizeMenu: function () { var e = this.menu.element; e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth())) }, _renderMenu: function (t, i) { var s = this; e.each(i, function (e, i) { s._renderItemData(t, i) }) }, _renderItemData: function (e, t) { return this._renderItem(e, t).data("ui-autocomplete-item", t) }, _renderItem: function (t, i) { return e("<li>").text(i.label).appendTo(t) }, _move: function (e, t) { return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[e](t) : void this.search(null, t) }, widget: function () { return this.menu.element }, _value: function () { return this.valueMethod.apply(this.element, arguments) }, _keyEvent: function (e, t) { (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault()) } }), e.extend(e.ui.autocomplete, { escapeRegex: function (e) { return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") }, filter: function (t, i) { var s = RegExp(e.ui.autocomplete.escapeRegex(i), "i"); return e.grep(t, function (e) { return s.test(e.label || e.value || e) }) } }), e.widget("ui.autocomplete", e.ui.autocomplete, { options: { messages: { noResults: "No search results.", results: function (e) { return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate." } } }, __response: function (t) { var i; this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), e("<div>").text(i).appendTo(this.liveRegion)) } }); e.ui.autocomplete });

/*!
 * jQuery UI Menu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 */
!function (e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) }(function (e) { e.widget("ui.menu", { version: "1.11.4", defaultElement: "<ul>", delay: 300, options: { icons: { submenu: "ui-icon-carat-1-e" }, items: "> *", menus: "ul", position: { my: "left-1 top", at: "right top" }, role: "menu", blur: null, focus: null, select: null }, _create: function () { this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({ role: this.options.role, tabIndex: 0 }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({ "mousedown .ui-menu-item": function (e) { e.preventDefault() }, "click .ui-menu-item": function (t) { var i = e(t.target); !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && e(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer))) }, "mouseenter .ui-menu-item": function (t) { if (!this.previousFilter) { var i = e(t.currentTarget); i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i) } }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function (e, t) { var i = this.active || this.element.find(this.options.items).eq(0); t || this.focus(e, i) }, blur: function (t) { this._delay(function () { e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t) }) }, keydown: "_keydown" }), this.refresh(), this._on(this.document, { click: function (e) { this._closeOnDocumentClick(e) && this.collapseAll(e), this.mouseHandled = !1 } }) }, _destroy: function () { this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () { var t = e(this); t.data("ui-menu-submenu-carat") && t.remove() }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content") }, _keydown: function (t) { var i, s, n, a, o = !0; switch (t.keyCode) { case e.ui.keyCode.PAGE_UP: this.previousPage(t); break; case e.ui.keyCode.PAGE_DOWN: this.nextPage(t); break; case e.ui.keyCode.HOME: this._move("first", "first", t); break; case e.ui.keyCode.END: this._move("last", "last", t); break; case e.ui.keyCode.UP: this.previous(t); break; case e.ui.keyCode.DOWN: this.next(t); break; case e.ui.keyCode.LEFT: this.collapse(t); break; case e.ui.keyCode.RIGHT: this.active && !this.active.is(".ui-state-disabled") && this.expand(t); break; case e.ui.keyCode.ENTER: case e.ui.keyCode.SPACE: this._activate(t); break; case e.ui.keyCode.ESCAPE: this.collapse(t); break; default: o = !1, s = this.previousFilter || "", n = String.fromCharCode(t.keyCode), a = !1, clearTimeout(this.filterTimer), n === s ? a = !0 : n = s + n, i = this._filterMenuItems(n), i = a && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(t.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(t, i), this.previousFilter = n, this.filterTimer = this._delay(function () { delete this.previousFilter }, 1e3)) : delete this.previousFilter }o && t.preventDefault() }, _activate: function (e) { this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(e) : this.select(e)) }, refresh: function () { var t, i, s = this, n = this.options.icons.submenu, a = this.element.find(this.options.menus); this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" }).each(function () { var t = e(this), i = t.parent(), s = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0); i.attr("aria-haspopup", "true").prepend(s), t.attr("aria-labelledby", i.attr("id")) }), t = a.add(this.element), i = t.find(this.options.items), i.not(".ui-menu-item").each(function () { var t = e(this); s._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider") }), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({ tabIndex: -1, role: this._itemRole() }), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur() }, _itemRole: function () { return { menu: "menuitem", listbox: "option" }[this.options.role] }, _setOption: function (e, t) { "icons" === e && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t) }, focus: function (e, t) { var i, s; this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), s = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), e && "keydown" === e.type ? this._close() : this.timer = this._delay(function () { this._close() }, this.delay), i = t.children(".ui-menu"), i.length && e && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, { item: t }) }, _scrollIntoView: function (t) { var i, s, n, a, o, r; this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, n = t.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = t.outerHeight(), 0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r)) }, blur: function (e, t) { t || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, { item: this.active })) }, _startOpening: function (e) { clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function () { this._close(), this._open(e) }, this.delay)) }, _open: function (t) { var i = e.extend({ of: this.active }, this.options.position); clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i) }, collapseAll: function (t, i) { clearTimeout(this.timer), this.timer = this._delay(function () { var s = i ? this.element : e(t && t.target).closest(this.element.find(".ui-menu")); s.length || (s = this.element), this._close(s), this.blur(t), this.activeMenu = s }, this.delay) }, _close: function (e) { e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active") }, _closeOnDocumentClick: function (t) { return !e(t.target).closest(".ui-menu").length }, _isDivider: function (e) { return !/[^\-\u2014\u2013\s]/.test(e.text()) }, collapse: function (e) { var t = this.active && this.active.parent().closest(".ui-menu-item", this.element); t && t.length && (this._close(), this.focus(e, t)) }, expand: function (e) { var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first(); t && t.length && (this._open(t.parent()), this._delay(function () { this.focus(e, t) })) }, next: function (e) { this._move("next", "first", e) }, previous: function (e) { this._move("prev", "last", e) }, isFirstItem: function () { return this.active && !this.active.prevAll(".ui-menu-item").length }, isLastItem: function () { return this.active && !this.active.nextAll(".ui-menu-item").length }, _move: function (e, t, i) { var s; this.active && (s = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[t]()), this.focus(i, s) }, nextPage: function (t) { var i, s, n; return this.active ? void (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () { return i = e(this), i.offset().top - s - n < 0 }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(t) }, previousPage: function (t) { var i, s, n; return this.active ? void (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () { return i = e(this), i.offset().top - s + n > 0 }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first()))) : void this.next(t) }, _hasScroll: function () { return this.element.outerHeight() < this.element.prop("scrollHeight") }, select: function (t) { this.active = this.active || e(t.target).closest(".ui-menu-item"); var i = { item: this.active }; this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i) }, _filterMenuItems: function (t) { var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), s = RegExp("^" + i, "i"); return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () { return s.test(e.trim(e(this).text())) }) } }) });


/*! Picturefill - v3.0.1 - 2015-09-30
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function (a) { var b = navigator.userAgent; a.HTMLPictureElement && /ecko/.test(b) && b.match(/rv\:(\d+)/) && RegExp.$1 < 41 && addEventListener("resize", function () { var b, c = document.createElement("source"), d = function (a) { var b, d, e = a.parentNode; "PICTURE" === e.nodeName.toUpperCase() ? (b = c.cloneNode(), e.insertBefore(b, e.firstElementChild), setTimeout(function () { e.removeChild(b) })) : (!a._pfLastSize || a.offsetWidth > a._pfLastSize) && (a._pfLastSize = a.offsetWidth, d = a.sizes, a.sizes += ",100vw", setTimeout(function () { a.sizes = d })) }, e = function () { var a, b = document.querySelectorAll("picture > img, img[srcset][sizes]"); for (a = 0; a < b.length; a++)d(b[a]) }, f = function () { clearTimeout(b), b = setTimeout(e, 99) }, g = a.matchMedia && matchMedia("(orientation: landscape)"), h = function () { f(), g && g.addListener && g.addListener(f) }; return c.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? h() : document.addEventListener("DOMContentLoaded", h), f }()) }(window), function (a, b, c) { "use strict"; function d(a) { return " " === a || "	" === a || "\n" === a || "\f" === a || "\r" === a } function e(b, c) { var d = new a.Image; return d.onerror = function () { z[b] = !1, aa() }, d.onload = function () { z[b] = 1 === d.width, aa() }, d.src = c, "pending" } function f() { L = !1, O = a.devicePixelRatio, M = {}, N = {}, s.DPR = O || 1, P.width = Math.max(a.innerWidth || 0, y.clientWidth), P.height = Math.max(a.innerHeight || 0, y.clientHeight), P.vw = P.width / 100, P.vh = P.height / 100, r = [P.height, P.width, O].join("-"), P.em = s.getEmValue(), P.rem = P.em } function g(a, b, c, d) { var e, f, g, h; return "saveData" === A.algorithm ? a > 2.7 ? h = c + 1 : (f = b - c, e = Math.pow(a - .6, 1.5), g = f * e, d && (g += .1 * e), h = a + g) : h = c > 1 ? Math.sqrt(a * b) : a, h > c } function h(a) { var b, c = s.getSet(a), d = !1; "pending" !== c && (d = r, c && (b = s.setRes(c), s.applySetCandidate(b, a))), a[s.ns].evaled = d } function i(a, b) { return a.res - b.res } function j(a, b, c) { var d; return !c && b && (c = a[s.ns].sets, c = c && c[c.length - 1]), d = k(b, c), d && (b = s.makeUrl(b), a[s.ns].curSrc = b, a[s.ns].curCan = d, d.res || _(d, d.set.sizes)), d } function k(a, b) { var c, d, e; if (a && b) for (e = s.parseSet(b), a = s.makeUrl(a), c = 0; c < e.length; c++)if (a === s.makeUrl(e[c].url)) { d = e[c]; break } return d } function l(a, b) { var c, d, e, f, g = a.getElementsByTagName("source"); for (c = 0, d = g.length; d > c; c++)e = g[c], e[s.ns] = !0, f = e.getAttribute("srcset"), f && b.push({ srcset: f, media: e.getAttribute("media"), type: e.getAttribute("type"), sizes: e.getAttribute("sizes") }) } function m(a, b) { function c(b) { var c, d = b.exec(a.substring(m)); return d ? (c = d[0], m += c.length, c) : void 0 } function e() { var a, c, d, e, f, i, j, k, l, m = !1, o = {}; for (e = 0; e < h.length; e++)f = h[e], i = f[f.length - 1], j = f.substring(0, f.length - 1), k = parseInt(j, 10), l = parseFloat(j), W.test(j) && "w" === i ? ((a || c) && (m = !0), 0 === k ? m = !0 : a = k) : X.test(j) && "x" === i ? ((a || c || d) && (m = !0), 0 > l ? m = !0 : c = l) : W.test(j) && "h" === i ? ((d || c) && (m = !0), 0 === k ? m = !0 : d = k) : m = !0; m || (o.url = g, a && (o.w = a), c && (o.d = c), d && (o.h = d), d || c || a || (o.d = 1), 1 === o.d && (b.has1x = !0), o.set = b, n.push(o)) } function f() { for (c(S), i = "", j = "in descriptor"; ;) { if (k = a.charAt(m), "in descriptor" === j) if (d(k)) i && (h.push(i), i = "", j = "after descriptor"); else { if ("," === k) return m += 1, i && h.push(i), void e(); if ("(" === k) i += k, j = "in parens"; else { if ("" === k) return i && h.push(i), void e(); i += k } } else if ("in parens" === j) if (")" === k) i += k, j = "in descriptor"; else { if ("" === k) return h.push(i), void e(); i += k } else if ("after descriptor" === j) if (d(k)); else { if ("" === k) return void e(); j = "in descriptor", m -= 1 } m += 1 } } for (var g, h, i, j, k, l = a.length, m = 0, n = []; ;) { if (c(T), m >= l) return n; g = c(U), h = [], "," === g.slice(-1) ? (g = g.replace(V, ""), e()) : f() } } function n(a) { function b(a) { function b() { f && (g.push(f), f = "") } function c() { g[0] && (h.push(g), g = []) } for (var e, f = "", g = [], h = [], i = 0, j = 0, k = !1; ;) { if (e = a.charAt(j), "" === e) return b(), c(), h; if (k) { if ("*" === e && "/" === a[j + 1]) { k = !1, j += 2, b(); continue } j += 1 } else { if (d(e)) { if (a.charAt(j - 1) && d(a.charAt(j - 1)) || !f) { j += 1; continue } if (0 === i) { b(), j += 1; continue } e = " " } else if ("(" === e) i += 1; else if (")" === e) i -= 1; else { if ("," === e) { b(), c(), j += 1; continue } if ("/" === e && "*" === a.charAt(j + 1)) { k = !0, j += 2; continue } } f += e, j += 1 } } } function c(a) { return k.test(a) && parseFloat(a) >= 0 ? !0 : l.test(a) ? !0 : "0" === a || "-0" === a || "+0" === a ? !0 : !1 } var e, f, g, h, i, j, k = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i; for (f = b(a), g = f.length, e = 0; g > e; e++)if (h = f[e], i = h[h.length - 1], c(i)) { if (j = i, h.pop(), 0 === h.length) return j; if (h = h.join(" "), s.matchesMedia(h)) return j } return "100vw" } b.createElement("picture"); var o, p, q, r, s = {}, t = function () { }, u = b.createElement("img"), v = u.getAttribute, w = u.setAttribute, x = u.removeAttribute, y = b.documentElement, z = {}, A = { algorithm: "" }, B = "data-pfsrc", C = B + "set", D = navigator.userAgent, E = /rident/.test(D) || /ecko/.test(D) && D.match(/rv\:(\d+)/) && RegExp.$1 > 35, F = "currentSrc", G = /\s+\+?\d+(e\d+)?w/, H = /(\([^)]+\))?\s*(.+)/, I = a.picturefillCFG, J = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", K = "font-size:100%!important;", L = !0, M = {}, N = {}, O = a.devicePixelRatio, P = { px: 1, "in": 96 }, Q = b.createElement("a"), R = !1, S = /^[ \t\n\r\u000c]+/, T = /^[, \t\n\r\u000c]+/, U = /^[^ \t\n\r\u000c]+/, V = /[,]+$/, W = /^\d+$/, X = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, Y = function (a, b, c, d) { a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c) }, Z = function (a) { var b = {}; return function (c) { return c in b || (b[c] = a(c)), b[c] } }, $ = function () { var a = /^([\d\.]+)(em|vw|px)$/, b = function () { for (var a = arguments, b = 0, c = a[0]; ++b in a;)c = c.replace(a[b], a[++b]); return c }, c = Z(function (a) { return "return " + b((a || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";" }); return function (b, d) { var e; if (!(b in M)) if (M[b] = !1, d && (e = b.match(a))) M[b] = e[1] * P[e[2]]; else try { M[b] = new Function("e", c(b))(P) } catch (f) { } return M[b] } }(), _ = function (a, b) { return a.w ? (a.cWidth = s.calcListLength(b || "100vw"), a.res = a.w / a.cWidth) : a.res = a.d, a }, aa = function (a) { var c, d, e, f = a || {}; if (f.elements && 1 === f.elements.nodeType && ("IMG" === f.elements.nodeName.toUpperCase() ? f.elements = [f.elements] : (f.context = f.elements, f.elements = null)), c = f.elements || s.qsa(f.context || b, f.reevaluate || f.reselect ? s.sel : s.selShort), e = c.length) { for (s.setupRun(f), R = !0, d = 0; e > d; d++)s.fillImg(c[d], f); s.teardownRun(f) } }; o = a.console && console.warn ? function (a) { console.warn(a) } : t, F in u || (F = "src"), z["image/jpeg"] = !0, z["image/gif"] = !0, z["image/png"] = !0, z["image/svg+xml"] = b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1"), s.ns = ("pf" + (new Date).getTime()).substr(0, 9), s.supSrcset = "srcset" in u, s.supSizes = "sizes" in u, s.supPicture = !!a.HTMLPictureElement, s.supSrcset && s.supPicture && !s.supSizes && !function (a) { u.srcset = "data:,a", a.src = "data:,a", s.supSrcset = u.complete === a.complete, s.supPicture = s.supSrcset && s.supPicture }(b.createElement("img")), s.selShort = "picture>img,img[srcset]", s.sel = s.selShort, s.cfg = A, s.supSrcset && (s.sel += ",img[" + C + "]"), s.DPR = O || 1, s.u = P, s.types = z, q = s.supSrcset && !s.supSizes, s.setSize = t, s.makeUrl = Z(function (a) { return Q.href = a, Q.href }), s.qsa = function (a, b) { return a.querySelectorAll(b) }, s.matchesMedia = function () { return a.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? s.matchesMedia = function (a) { return !a || matchMedia(a).matches } : s.matchesMedia = s.mMQ, s.matchesMedia.apply(this, arguments) }, s.mMQ = function (a) { return a ? $(a) : !0 }, s.calcLength = function (a) { var b = $(a, !0) || !1; return 0 > b && (b = !1), b }, s.supportsType = function (a) { return a ? z[a] : !0 }, s.parseSize = Z(function (a) { var b = (a || "").match(H); return { media: b && b[1], length: b && b[2] } }), s.parseSet = function (a) { return a.cands || (a.cands = m(a.srcset, a)), a.cands }, s.getEmValue = function () { var a; if (!p && (a = b.body)) { var c = b.createElement("div"), d = y.style.cssText, e = a.style.cssText; c.style.cssText = J, y.style.cssText = K, a.style.cssText = K, a.appendChild(c), p = c.offsetWidth, a.removeChild(c), p = parseFloat(p, 10), y.style.cssText = d, a.style.cssText = e } return p || 16 }, s.calcListLength = function (a) { if (!(a in N) || A.uT) { var b = s.calcLength(n(a)); N[a] = b ? b : P.width } return N[a] }, s.setRes = function (a) { var b; if (a) { b = s.parseSet(a); for (var c = 0, d = b.length; d > c; c++)_(b[c], a.sizes) } return b }, s.setRes.res = _, s.applySetCandidate = function (a, b) { if (a.length) { var c, d, e, f, h, k, l, m, n, o = b[s.ns], p = s.DPR; if (k = o.curSrc || b[F], l = o.curCan || j(b, k, a[0].set), l && l.set === a[0].set && (n = E && !b.complete && l.res - .1 > p, n || (l.cached = !0, l.res >= p && (h = l))), !h) for (a.sort(i), f = a.length, h = a[f - 1], d = 0; f > d; d++)if (c = a[d], c.res >= p) { e = d - 1, h = a[e] && (n || k !== s.makeUrl(c.url)) && g(a[e].res, c.res, p, a[e].cached) ? a[e] : c; break } h && (m = s.makeUrl(h.url), o.curSrc = m, o.curCan = h, m !== k && s.setSrc(b, h), s.setSize(b)) } }, s.setSrc = function (a, b) { var c; a.src = b.url, "image/svg+xml" === b.set.type && (c = a.style.width, a.style.width = a.offsetWidth + 1 + "px", a.offsetWidth + 1 && (a.style.width = c)) }, s.getSet = function (a) { var b, c, d, e = !1, f = a[s.ns].sets; for (b = 0; b < f.length && !e; b++)if (c = f[b], c.srcset && s.matchesMedia(c.media) && (d = s.supportsType(c.type))) { "pending" === d && (c = d), e = c; break } return e }, s.parseSets = function (a, b, d) { var e, f, g, h, i = b && "PICTURE" === b.nodeName.toUpperCase(), j = a[s.ns]; (j.src === c || d.src) && (j.src = v.call(a, "src"), j.src ? w.call(a, B, j.src) : x.call(a, B)), (j.srcset === c || d.srcset || !s.supSrcset || a.srcset) && (e = v.call(a, "srcset"), j.srcset = e, h = !0), j.sets = [], i && (j.pic = !0, l(b, j.sets)), j.srcset ? (f = { srcset: j.srcset, sizes: v.call(a, "sizes") }, j.sets.push(f), g = (q || j.src) && G.test(j.srcset || ""), g || !j.src || k(j.src, f) || f.has1x || (f.srcset += ", " + j.src, f.cands.push({ url: j.src, d: 1, set: f }))) : j.src && j.sets.push({ srcset: j.src, sizes: null }), j.curCan = null, j.curSrc = c, j.supported = !(i || f && !s.supSrcset || g), h && s.supSrcset && !j.supported && (e ? (w.call(a, C, e), a.srcset = "") : x.call(a, C)), j.supported && !j.srcset && (!j.src && a.src || a.src !== s.makeUrl(j.src)) && (null === j.src ? a.removeAttribute("src") : a.src = j.src), j.parsed = !0 }, s.fillImg = function (a, b) { var c, d = b.reselect || b.reevaluate; a[s.ns] || (a[s.ns] = {}), c = a[s.ns], (d || c.evaled !== r) && ((!c.parsed || b.reevaluate) && s.parseSets(a, a.parentNode, b), c.supported ? c.evaled = r : h(a)) }, s.setupRun = function () { (!R || L || O !== a.devicePixelRatio) && f() }, s.supPicture ? (aa = t, s.fillImg = t) : !function () { var c, d = a.attachEvent ? /d$|^c/ : /d$|^c|^i/, e = function () { var a = b.readyState || ""; f = setTimeout(e, "loading" === a ? 200 : 999), b.body && (s.fillImgs(), c = c || d.test(a), c && clearTimeout(f)) }, f = setTimeout(e, b.body ? 9 : 99), g = function (a, b) { var c, d, e = function () { var f = new Date - d; b > f ? c = setTimeout(e, b - f) : (c = null, a()) }; return function () { d = new Date, c || (c = setTimeout(e, b)) } }, h = y.clientHeight, i = function () { L = Math.max(a.innerWidth || 0, y.clientWidth) !== P.width || y.clientHeight !== h, h = y.clientHeight, L && s.fillImgs() }; Y(a, "resize", g(i, 99)), Y(b, "readystatechange", e) }(), s.picturefill = aa, s.fillImgs = aa, s.teardownRun = t, aa._ = s, a.picturefillCFG = { pf: s, push: function (a) { var b = a.shift(); "function" == typeof s[b] ? s[b].apply(s, a) : (A[b] = a[0], R && s.fillImgs({ reselect: !0 })) } }; for (; I && I.length;)a.picturefillCFG.push(I.shift()); a.picturefill = aa, "object" == typeof module && "object" == typeof module.exports ? module.exports = aa : "function" == typeof define && define.amd && define("picturefill", function () { return aa }), s.supPicture || (z["image/webp"] = e("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==")) }(window, document);


/*
 _ _      _       _
 ___| (_) ___| | __  (_)___
 / __| | |/ __| |/ /  | / __|
 \__ \ | | (__|   < _ | \__ \
 |___/_|_|\___|_|\_(_)/ |___/
 |__/

 Version: 1.6.0
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick
 Issues: http://github.com/kenwheeler/slick/issues

 */
!function (a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function (a) {
    "use strict"; var b = window.Slick || {}; b = function () { function c(c, d) { var f, e = this; e.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: a(c), appendDots: a(c), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (b, c) { return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, e.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++ , e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0) } var b = 0; return c }(), b.prototype.activateADA = function () { var a = this; a.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) { var e = this; if ("boolean" == typeof c) d = c, c = null; else if (0 > c || c >= e.slideCount) return !1; e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) { a(c).attr("data-slick-index", b) }), e.$slidesCache = e.$slides, e.reinit() }, b.prototype.animateHeight = function () { var a = this; if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) { var b = a.$slides.eq(a.currentSlide).outerHeight(!0); a.$list.animate({ height: b }, a.options.speed) } }, b.prototype.animateSlide = function (b, c) { var d = {}, e = this; e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({ animStart: e.currentLeft }).animate({ animStart: b }, { duration: e.options.speed, easing: e.options.easing, step: function (a) { a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d)) }, complete: function () { c && c.call() } })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () { e.disableTransition(), c.call() }, e.options.speed)) }, b.prototype.getNavTarget = function () { var b = this, c = b.options.asNavFor; return c && null !== c && (c = a(c).not(b.$slider)), c }, b.prototype.asNavFor = function (b) { var c = this, d = c.getNavTarget(); null !== d && "object" == typeof d && d.each(function () { var c = a(this).slick("getSlick"); c.unslicked || c.slideHandler(b, !0) }) }, b.prototype.applyTransition = function (a) { var b = this, c = {}; b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.autoPlay = function () { var a = this; a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed)) }, b.prototype.autoPlayClear = function () { var a = this; a.autoPlayTimer && clearInterval(a.autoPlayTimer) }, b.prototype.autoPlayIterator = function () { var a = this, b = a.currentSlide + a.options.slidesToScroll; a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b)) }, b.prototype.buildArrows = function () { var b = this; b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, b.prototype.buildDots = function () { var c, d, b = this; if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) { for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1)d.append(a("<li />").append(b.options.customPaging.call(this, b, c))); b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false") } }, b.prototype.buildOut = function () { var b = this; b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) { a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "") }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable") }, b.prototype.buildRows = function () { var b, c, d, e, f, g, h, a = this; if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) { for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) { var i = document.createElement("div"); for (c = 0; c < a.options.rows; c++) { var j = document.createElement("div"); for (d = 0; d < a.options.slidesPerRow; d++) { var k = b * h + (c * a.options.slidesPerRow + d); g.get(k) && j.appendChild(g.get(k)) } i.appendChild(j) } e.appendChild(i) } a.$slider.empty().append(e), a.$slider.children().children().children().css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" }) } }, b.prototype.checkResponsive = function (b, c) { var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width(); if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) { f = null; for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e])); null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h]) } }, b.prototype.changeSlide = function (b, c) { var f, g, h, d = this, e = a(b.currentTarget); switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) { case "previous": g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c); break; case "next": g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c); break; case "index": var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll; d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus"); break; default: return } }, b.prototype.checkNavigable = function (a) { var c, d, b = this; if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1]; else for (var e in c) { if (a < c[e]) { a = d; break } d = c[e] } return a }, b.prototype.cleanUpEvents = function () { var b = this; b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.cleanUpSlideEvents = function () { var b = this; b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1)) }, b.prototype.cleanUpRows = function () { var b, a = this; a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b)) }, b.prototype.clickHandler = function (a) { var b = this; b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault()) }, b.prototype.destroy = function (b) { var c = this; c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () { a(this).attr("style", a(this).data("originalStyling")) }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c]) }, b.prototype.disableTransition = function (a) { var b = this, c = {}; c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.fadeSlide = function (a, b) { var c = this; c.cssTransitions === !1 ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }), b && setTimeout(function () { c.disableTransition(a), b.call() }, c.options.speed)) }, b.prototype.fadeSlideOut = function (a) { var b = this; b.cssTransitions === !1 ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 })) }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) { var b = this; null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit()) }, b.prototype.focusHandler = function () { var b = this; b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) { c.stopImmediatePropagation(); var d = a(this); setTimeout(function () { b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay()) }, 0) }) }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () { var a = this; return a.currentSlide }, b.prototype.getDotCount = function () { var a = this, b = 0, c = 0, d = 0; if (a.options.infinite === !0) for (; b < a.slideCount;)++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else if (a.options.centerMode === !0) d = a.slideCount; else if (a.options.asNavFor) for (; b < a.slideCount;)++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll); return d - 1 }, b.prototype.getLeft = function (a) { var c, d, f, b = this, e = 0; return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c }, b.prototype.getOption = b.prototype.slickGetOption = function (a) { var b = this; return b.options[a] }, b.prototype.getNavigableIndexes = function () { var e, a = this, b = 0, c = 0, d = []; for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;)d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; return d }, b.prototype.getSlick = function () { return this }, b.prototype.getSlideCount = function () { var c, d, e, b = this; return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) { return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0 }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) { var c = this; c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b) }, b.prototype.init = function (b) { var c = this; a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay()) }, b.prototype.initADA = function () { var b = this; b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) { a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c }) }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) { a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c }) }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA() }, b.prototype.initArrowEvents = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, a.changeSlide)) }, b.prototype.initDotEvents = function () { var b = this; b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1)) }, b.prototype.initSlideEvents = function () { var b = this; b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1))) }, b.prototype.initializeEvents = function () { var b = this; b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.initUI = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show() }, b.prototype.keyHandler = function (a) { var b = this; a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({ data: { message: b.options.rtl === !0 ? "next" : "previous" } }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: b.options.rtl === !0 ? "previous" : "next" } })) }, b.prototype.lazyLoad = function () { function g(c) { a("img[data-lazy]", c).each(function () { var c = a(this), d = a(this).attr("data-lazy"), e = document.createElement("img"); e.onload = function () { c.animate({ opacity: 0 }, 100, function () { c.attr("src", d).animate({ opacity: 1 }, 200, function () { c.removeAttr("data-lazy").removeClass("slick-loading") }), b.$slider.trigger("lazyLoaded", [b, c, d]) }) }, e.onerror = function () { c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d]) }, e.src = d }) } var c, d, e, f, b = this; b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e-- , f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d)) }, b.prototype.loadSlider = function () { var a = this; a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad() }, b.prototype.next = b.prototype.slickNext = function () { var a = this; a.changeSlide({ data: { message: "next" } }) }, b.prototype.orientationChange = function () { var a = this; a.checkResponsive(), a.setPosition() }, b.prototype.pause = b.prototype.slickPause = function () { var a = this; a.autoPlayClear(), a.paused = !0 }, b.prototype.play = b.prototype.slickPlay = function () { var a = this; a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1 }, b.prototype.postSlide = function (a) { var b = this; b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA()) }, b.prototype.prev = b.prototype.slickPrev = function () { var a = this; a.changeSlide({ data: { message: "previous" } }) }, b.prototype.preventDefault = function (a) { a.preventDefault() }, b.prototype.progressiveLazyLoad = function (b) { b = b || 1; var e, f, g, c = this, d = a("img[data-lazy]", c.$slider); d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () { e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad() }, g.onerror = function () { 3 > b ? setTimeout(function () { c.progressiveLazyLoad(b + 1) }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad()) }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c]) }, b.prototype.refresh = function (b) { var d, e, c = this; e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, { currentSlide: d }), c.init(), b || c.changeSlide({ data: { message: "index", index: d } }, !1) }, b.prototype.registerBreakpoints = function () { var c, d, e, b = this, f = b.options.responsive || null; if ("array" === a.type(f) && f.length) { b.respondTo = b.options.respondTo || "window"; for (c in f) if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) { for (; e >= 0;)b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--; b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings } b.breakpoints.sort(function (a, c) { return b.options.mobileFirst ? a - c : c - a }) } }, b.prototype.reinit = function () { var b = this; b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b]) }, b.prototype.resize = function () { var b = this; a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () { b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition() }, 50)) }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) { var d = this; return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit()) }, b.prototype.setCSS = function (a) { var d, e, b = this, c = {}; b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c))) }, b.prototype.setDimensions = function () { var a = this; a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length))); var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width(); a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b) }, b.prototype.setFade = function () { var c, b = this; b.$slides.each(function (d, e) { c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) }), b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 }) }, b.prototype.setHeight = function () { var a = this; if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) { var b = a.$slides.eq(a.currentSlide).outerHeight(!0); a.$list.css("height", b) } }, b.prototype.setOption = b.prototype.slickSetOption = function () { var c, d, e, f, h, b = this, g = !1; if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f; else if ("multiple" === h) a.each(e, function (a, c) { b.options[a] = c }); else if ("responsive" === h) for (d in f) if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]]; else { for (c = b.options.responsive.length - 1; c >= 0;)b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--; b.options.responsive.push(f[d]) } g && (b.unload(), b.reinit()) }, b.prototype.setPosition = function () { var a = this; a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]) }, b.prototype.setProps = function () { var a = this, b = document.body.style; a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1 }, b.prototype.setSlideClasses = function (a) {
        var c, d, e, f, b = this; d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
            d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function () { var c, d, e, b = this; if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) { for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1)d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned"); for (c = 0; e > c; c += 1)d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned"); b.$slideTrack.find(".slick-cloned").find("[id]").each(function () { a(this).attr("id", "") }) } }, b.prototype.interrupt = function (a) { var b = this; a || b.autoPlay(), b.interrupted = a }, b.prototype.selectHandler = function (b) { var c = this, d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"), e = parseInt(d.attr("data-slick-index")); return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e) }, b.prototype.slideHandler = function (a, b, c) { var d, e, f, g, j, h = null, i = this; return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () { i.postSlide(d) }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () { i.postSlide(d) }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () { i.postSlide(e) })) : i.postSlide(e), void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function () { i.postSlide(e) }) : i.postSlide(e)))) }, b.prototype.startLoad = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading") }, b.prototype.swipeDirection = function () { var a, b, c, d, e = this; return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical" }, b.prototype.swipeEnd = function (a) { var c, d, b = this; if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1; if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) { switch (d = b.swipeDirection()) { case "left": case "down": c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0; break; case "right": case "up": c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1 }"vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d])) } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {}) }, b.prototype.swipeHandler = function (a) { var b = this; if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) { case "start": b.swipeStart(a); break; case "move": b.swipeMove(a); break; case "end": b.swipeEnd(a) } }, b.prototype.swipeMove = function (a) { var d, e, f, g, h, b = this; return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0) }, b.prototype.swipeStart = function (a) { var c, b = this; return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void (b.dragging = !0)) }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () { var a = this; null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit()) }, b.prototype.unload = function () { var b = this; a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, b.prototype.unslick = function (a) { var b = this; b.$slider.trigger("unslick", [b, a]), b.destroy() }, b.prototype.updateArrows = function () { var b, a = this; b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, b.prototype.updateDots = function () { var a = this; null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false")) }, b.prototype.visibility = function () { var a = this; a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1) }, a.fn.slick = function () { var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length; for (f = 0; e > f; f++)if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g; return a }
});


/*!
 * Datepicker for Bootstrap v1.7.0-dev (https://github.com/uxsolutions/bootstrap-datepicker)
 *
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */

!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery) }(function (a, b) {
    function c() { return new Date(Date.UTC.apply(Date, arguments)) } function d() { var a = new Date; return c(a.getFullYear(), a.getMonth(), a.getDate()) } function e(a, b) { return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate() } function f(a) { return function () { return this[a].apply(this, arguments) } } function g(a) { return a && !isNaN(a.getTime()) } function h(b, c) { function d(a, b) { return b.toLowerCase() } var e, f = a(b).data(), g = {}, h = new RegExp("^" + c.toLowerCase() + "([A-Z])"); c = new RegExp("^" + c.toLowerCase()); for (var i in f) c.test(i) && (e = i.replace(h, d), g[e] = f[i]); return g } function i(b) { var c = {}; if (q[b] || (b = b.split("-")[0], q[b])) { var d = q[b]; return a.each(p, function (a, b) { b in d && (c[b] = d[b]) }), c } } var j = function () { var b = { get: function (a) { return this.slice(a)[0] }, contains: function (a) { for (var b = a && a.valueOf(), c = 0, d = this.length; d > c; c++)if (0 <= this[c].valueOf() - b && this[c].valueOf() - b < 864e5) return c; return -1 }, remove: function (a) { this.splice(a, 1) }, replace: function (b) { b && (a.isArray(b) || (b = [b]), this.clear(), this.push.apply(this, b)) }, clear: function () { this.length = 0 }, copy: function () { var a = new j; return a.replace(this), a } }; return function () { var c = []; return c.push.apply(c, arguments), a.extend(c, b), c } }(), k = function (b, c) { a.data(b, "datepicker", this), this._process_options(c), this.dates = new j, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = a(b), this.isInput = this.element.is("input"), this.inputField = this.isInput ? this.element : this.element.find("input"), this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.component && 0 === this.component.length && (this.component = !1), this.isInline = !this.component && this.element.is("div"), this.picker = a(r.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.o.calendarWeeks && this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function (a, b) { return Number(b) + 1 }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted), this.setDatesDisabled(this.o.datesDisabled), this.setViewMode(this.o.startView), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.isInline && this.show() }; k.prototype = { constructor: k, _resolveViewName: function (b) { return a.each(r.viewModes, function (c, d) { return b === c || -1 !== a.inArray(b, d.names) ? (b = c, !1) : void 0 }), b }, _resolveDaysOfWeek: function (b) { return a.isArray(b) || (b = b.split(/[,\s]*/)), a.map(b, Number) }, _check_template: function (c) { try { if (c === b || "" === c) return !1; if ((c.match(/[<>]/g) || []).length <= 0) return !0; var d = a(c); return d.length > 0 } catch (e) { return !1 } }, _process_options: function (b) { this._o = a.extend({}, this._o, b); var e = this.o = a.extend({}, this._o), f = e.language; q[f] || (f = f.split("-")[0], q[f] || (f = o.language)), e.language = f, e.startView = this._resolveViewName(e.startView), e.minViewMode = this._resolveViewName(e.minViewMode), e.maxViewMode = this._resolveViewName(e.maxViewMode), e.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, e.startView)), e.multidate !== !0 && (e.multidate = Number(e.multidate) || !1, e.multidate !== !1 && (e.multidate = Math.max(0, e.multidate))), e.multidateSeparator = String(e.multidateSeparator), e.weekStart %= 7, e.weekEnd = (e.weekStart + 6) % 7; var g = r.parseFormat(e.format); e.startDate !== -(1 / 0) && (e.startDate ? e.startDate instanceof Date ? e.startDate = this._local_to_utc(this._zero_time(e.startDate)) : e.startDate = r.parseDate(e.startDate, g, e.language, e.assumeNearbyYear) : e.startDate = -(1 / 0)), e.endDate !== 1 / 0 && (e.endDate ? e.endDate instanceof Date ? e.endDate = this._local_to_utc(this._zero_time(e.endDate)) : e.endDate = r.parseDate(e.endDate, g, e.language, e.assumeNearbyYear) : e.endDate = 1 / 0), e.daysOfWeekDisabled = this._resolveDaysOfWeek(e.daysOfWeekDisabled || []), e.daysOfWeekHighlighted = this._resolveDaysOfWeek(e.daysOfWeekHighlighted || []), e.datesDisabled = e.datesDisabled || [], a.isArray(e.datesDisabled) || (e.datesDisabled = e.datesDisabled.split(",")), e.datesDisabled = a.map(e.datesDisabled, function (a) { return r.parseDate(a, g, e.language, e.assumeNearbyYear) }); var h = String(e.orientation).toLowerCase().split(/\s+/g), i = e.orientation.toLowerCase(); if (h = a.grep(h, function (a) { return /^auto|left|right|top|bottom$/.test(a) }), e.orientation = { x: "auto", y: "auto" }, i && "auto" !== i) if (1 === h.length) switch (h[0]) { case "top": case "bottom": e.orientation.y = h[0]; break; case "left": case "right": e.orientation.x = h[0] } else i = a.grep(h, function (a) { return /^left|right$/.test(a) }), e.orientation.x = i[0] || "auto", i = a.grep(h, function (a) { return /^top|bottom$/.test(a) }), e.orientation.y = i[0] || "auto"; else; if (e.defaultViewDate) { var j = e.defaultViewDate.year || (new Date).getFullYear(), k = e.defaultViewDate.month || 0, l = e.defaultViewDate.day || 1; e.defaultViewDate = c(j, k, l) } else e.defaultViewDate = d() }, _events: [], _secondaryEvents: [], _applyEvents: function (a) { for (var c, d, e, f = 0; f < a.length; f++)c = a[f][0], 2 === a[f].length ? (d = b, e = a[f][1]) : 3 === a[f].length && (d = a[f][1], e = a[f][2]), c.on(e, d) }, _unapplyEvents: function (a) { for (var c, d, e, f = 0; f < a.length; f++)c = a[f][0], 2 === a[f].length ? (e = b, d = a[f][1]) : 3 === a[f].length && (e = a[f][1], d = a[f][2]), c.off(d, e) }, _buildEvents: function () { var b = { keyup: a.proxy(function (b) { -1 === a.inArray(b.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update() }, this), keydown: a.proxy(this.keydown, this), paste: a.proxy(this.paste, this) }; this.o.showOnFocus === !0 && (b.focus = a.proxy(this.show, this)), this.isInput ? this._events = [[this.element, b]] : this.component && this.inputField.length ? this._events = [[this.inputField, b], [this.component, { click: a.proxy(this.show, this) }]] : this._events = [[this.element, { click: a.proxy(this.show, this), keydown: a.proxy(this.keydown, this) }]], this._events.push([this.element, "*", { blur: a.proxy(function (a) { this._focused_from = a.target }, this) }], [this.element, { blur: a.proxy(function (a) { this._focused_from = a.target }, this) }]), this.o.immediateUpdates && this._events.push([this.element, { "changeYear changeMonth": a.proxy(function (a) { this.update(a.date) }, this) }]), this._secondaryEvents = [[this.picker, { click: a.proxy(this.click, this) }], [this.picker, ".prev, .next", { click: a.proxy(this.navArrowsClick, this) }], [a(window), { resize: a.proxy(this.place, this) }], [a(document), { "mousedown touchstart": a.proxy(function (a) { this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.isInline || this.hide() }, this) }]] }, _attachEvents: function () { this._detachEvents(), this._applyEvents(this._events) }, _detachEvents: function () { this._unapplyEvents(this._events) }, _attachSecondaryEvents: function () { this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents) }, _detachSecondaryEvents: function () { this._unapplyEvents(this._secondaryEvents) }, _trigger: function (b, c) { var d = c || this.dates.get(-1), e = this._utc_to_local(d); this.element.trigger({ type: b, date: e, viewMode: this.viewMode, dates: a.map(this.dates, this._utc_to_local), format: a.proxy(function (a, b) { 0 === arguments.length ? (a = this.dates.length - 1, b = this.o.format) : "string" == typeof a && (b = a, a = this.dates.length - 1), b = b || this.o.format; var c = this.dates.get(a); return r.formatDate(c, b, this.o.language) }, this) }) }, show: function () { return this.inputField.prop("disabled") || this.inputField.prop("readonly") && this.o.enableOnReadonly === !1 ? void 0 : (this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && a(this.element).blur(), this) }, hide: function () { return this.isInline || !this.picker.is(":visible") ? this : (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(), this._trigger("hide"), this) }, destroy: function () { return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this }, paste: function (b) { var c; if (b.originalEvent.clipboardData && b.originalEvent.clipboardData.types && -1 !== a.inArray("text/plain", b.originalEvent.clipboardData.types)) c = b.originalEvent.clipboardData.getData("text/plain"); else { if (!window.clipboardData) return; c = window.clipboardData.getData("Text") } this.setDate(c), this.update(), b.preventDefault() }, _utc_to_local: function (a) { if (!a) return a; var b = new Date(a.getTime() + 6e4 * a.getTimezoneOffset()); return b.getTimezoneOffset() !== a.getTimezoneOffset() && (b = new Date(a.getTime() + 6e4 * b.getTimezoneOffset())), b }, _local_to_utc: function (a) { return a && new Date(a.getTime() - 6e4 * a.getTimezoneOffset()) }, _zero_time: function (a) { return a && new Date(a.getFullYear(), a.getMonth(), a.getDate()) }, _zero_utc_time: function (a) { return a && c(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()) }, getDates: function () { return a.map(this.dates, this._utc_to_local) }, getUTCDates: function () { return a.map(this.dates, function (a) { return new Date(a) }) }, getDate: function () { return this._utc_to_local(this.getUTCDate()) }, getUTCDate: function () { var a = this.dates.get(-1); return a !== b ? new Date(a) : null }, clearDates: function () { this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide() }, setDates: function () { var b = a.isArray(arguments[0]) ? arguments[0] : arguments; return this.update.apply(this, b), this._trigger("changeDate"), this.setValue(), this }, setUTCDates: function () { var b = a.isArray(arguments[0]) ? arguments[0] : arguments; return this.setDates.apply(this, a.map(b, this._utc_to_local)), this }, setDate: f("setDates"), setUTCDate: f("setUTCDates"), remove: f("destroy"), setValue: function () { var a = this.getFormattedDate(); return this.inputField.val(a), this }, getFormattedDate: function (c) { c === b && (c = this.o.format); var d = this.o.language; return a.map(this.dates, function (a) { return r.formatDate(a, c, d) }).join(this.o.multidateSeparator) }, getStartDate: function () { return this.o.startDate }, setStartDate: function (a) { return this._process_options({ startDate: a }), this.update(), this.updateNavArrows(), this }, getEndDate: function () { return this.o.endDate }, setEndDate: function (a) { return this._process_options({ endDate: a }), this.update(), this.updateNavArrows(), this }, setDaysOfWeekDisabled: function (a) { return this._process_options({ daysOfWeekDisabled: a }), this.update(), this }, setDaysOfWeekHighlighted: function (a) { return this._process_options({ daysOfWeekHighlighted: a }), this.update(), this }, setDatesDisabled: function (a) { return this._process_options({ datesDisabled: a }), this.update(), this }, place: function () { if (this.isInline) return this; var b = this.picker.outerWidth(), c = this.picker.outerHeight(), d = 10, e = a(this.o.container), f = e.width(), g = "body" === this.o.container ? a(document).scrollTop() : e.scrollTop(), h = e.offset(), i = []; this.element.parents().each(function () { var b = a(this).css("z-index"); "auto" !== b && 0 !== b && i.push(parseInt(b)) }); var j = Math.max.apply(Math, i) + this.o.zIndexOffset, k = this.component ? this.component.parent().offset() : this.element.offset(), l = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1), m = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), n = k.left - h.left, o = k.top - h.top; "body" !== this.o.container && (o += g), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (n -= b - m)) : k.left < 0 ? (this.picker.addClass("datepicker-orient-left"), n -= k.left - d) : n + b > f ? (this.picker.addClass("datepicker-orient-right"), n += m - b) : this.o.rtl ? this.picker.addClass("datepicker-orient-right") : this.picker.addClass("datepicker-orient-left"); var p, q = this.o.orientation.y; if ("auto" === q && (p = -g + o - c, q = 0 > p ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + q), "top" === q ? o -= c + parseInt(this.picker.css("padding-top")) : o += l, this.o.rtl) { var r = f - (n + m); this.picker.css({ top: o, right: r, zIndex: j }) } else this.picker.css({ top: o, left: n, zIndex: j }); return this }, _allow_update: !0, update: function () { if (!this._allow_update) return this; var b = this.dates.copy(), c = [], d = !1; return arguments.length ? (a.each(arguments, a.proxy(function (a, b) { b instanceof Date && (b = this._local_to_utc(b)), c.push(b) }, this)), d = !0) : (c = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val(), c = c && this.o.multidate ? c.split(this.o.multidateSeparator) : [c], delete this.element.data().date), c = a.map(c, a.proxy(function (a) { return r.parseDate(a, this.o.format, this.o.language, this.o.assumeNearbyYear) }, this)), c = a.grep(c, a.proxy(function (a) { return !this.dateWithinRange(a) || !a }, this), !0), this.dates.replace(c), this.o.updateViewDate && (this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate), d ? (this.setValue(), this.element.change()) : this.dates.length && String(b) !== String(this.dates) && d && (this._trigger("changeDate"), this.element.change()), !this.dates.length && b.length && (this._trigger("clearDate"), this.element.change()), this.fill(), this }, fillDow: function () { var b = this.o.weekStart, c = "<tr>"; for (this.o.calendarWeeks && (c += '<th class="cw">&#160;</th>'); b < this.o.weekStart + 7;)c += '<th class="dow', -1 !== a.inArray(b, this.o.daysOfWeekDisabled) && (c += " disabled"), c += '">' + q[this.o.language].daysMin[b++ % 7] + "</th>"; c += "</tr>", this.picker.find(".datepicker-days thead").append(c) }, fillMonths: function () { for (var a = this._utc_to_local(this.viewDate), b = "", c = 0; 12 > c;) { var d = a && a.getMonth() === c ? " focused" : ""; b += '<span class="month' + d + '">' + q[this.o.language].monthsShort[c++] + "</span>" } this.picker.find(".datepicker-months td").html(b) }, setRange: function (b) { b && b.length ? this.range = a.map(b, function (a) { return a.valueOf() }) : delete this.range, this.fill() }, getClassNames: function (b) { var c = [], f = this.viewDate.getUTCFullYear(), g = this.viewDate.getUTCMonth(), h = d(); return b.getUTCFullYear() < f || b.getUTCFullYear() === f && b.getUTCMonth() < g ? c.push("old") : (b.getUTCFullYear() > f || b.getUTCFullYear() === f && b.getUTCMonth() > g) && c.push("new"), this.focusDate && b.valueOf() === this.focusDate.valueOf() && c.push("focused"), this.o.todayHighlight && e(b, h) && c.push("today"), -1 !== this.dates.contains(b) && c.push("active"), this.dateWithinRange(b) || c.push("disabled"), this.dateIsDisabled(b) && c.push("disabled", "disabled-date"), -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekHighlighted) && c.push("highlighted"), this.range && (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"), -1 !== a.inArray(b.valueOf(), this.range) && c.push("selected"), b.valueOf() === this.range[0] && c.push("range-start"), b.valueOf() === this.range[this.range.length - 1] && c.push("range-end")), c }, _fill_yearsView: function (c, d, e, f, g, h, i, j) { var k, l, m, n, o, p, q, r, s, t, u; for (k = "", l = this.picker.find(c), m = parseInt(g / e, 10) * e, o = parseInt(h / f, 10) * f, p = parseInt(i / f, 10) * f, n = a.map(this.dates, function (a) { return parseInt(a.getUTCFullYear() / f, 10) * f }), l.find(".datepicker-switch").text(m + "-" + (m + 9 * f)), q = m - f, r = -1; 11 > r; r += 1)s = [d], t = null, -1 === r ? s.push("old") : 10 === r && s.push("new"), -1 !== a.inArray(q, n) && s.push("active"), (o > q || q > p) && s.push("disabled"), q === this.viewDate.getFullYear() && s.push("focused"), j !== a.noop && (u = j(new Date(q, 0, 1)), u === b ? u = {} : "boolean" == typeof u ? u = { enabled: u } : "string" == typeof u && (u = { classes: u }), u.enabled === !1 && s.push("disabled"), u.classes && (s = s.concat(u.classes.split(/\s+/))), u.tooltip && (t = u.tooltip)), k += '<span class="' + s.join(" ") + '"' + (t ? ' title="' + t + '"' : "") + ">" + q + "</span>", q += f; l.find("td").html(k) }, fill: function () { var d, e, f = new Date(this.viewDate), g = f.getUTCFullYear(), h = f.getUTCMonth(), i = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0), j = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0), k = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, m = q[this.o.language].today || q.en.today || "", n = q[this.o.language].clear || q.en.clear || "", o = q[this.o.language].titleFormat || q.en.titleFormat; if (!isNaN(g) && !isNaN(h)) { this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(f, o, this.o.language)), this.picker.find("tfoot .today").text(m).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot .clear").text(n).toggle(this.o.clearBtn !== !1), this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title), this.updateNavArrows(), this.fillMonths(); var p = c(g, h, 0), s = p.getUTCDate(); p.setUTCDate(s - (p.getUTCDay() - this.o.weekStart + 7) % 7); var t = new Date(p); p.getUTCFullYear() < 100 && t.setUTCFullYear(p.getUTCFullYear()), t.setUTCDate(t.getUTCDate() + 42), t = t.valueOf(); for (var u, v, w = []; p.valueOf() < t;) { if (u = p.getUTCDay(), u === this.o.weekStart && (w.push("<tr>"), this.o.calendarWeeks)) { var x = new Date(+p + (this.o.weekStart - u - 7) % 7 * 864e5), y = new Date(Number(x) + (11 - x.getUTCDay()) % 7 * 864e5), z = new Date(Number(z = c(y.getUTCFullYear(), 0, 1)) + (11 - z.getUTCDay()) % 7 * 864e5), A = (y - z) / 864e5 / 7 + 1; w.push('<td class="cw">' + A + "</td>") } v = this.getClassNames(p), v.push("day"), this.o.beforeShowDay !== a.noop && (e = this.o.beforeShowDay(this._utc_to_local(p)), e === b ? e = {} : "boolean" == typeof e ? e = { enabled: e } : "string" == typeof e && (e = { classes: e }), e.enabled === !1 && v.push("disabled"), e.classes && (v = v.concat(e.classes.split(/\s+/))), e.tooltip && (d = e.tooltip)), v = a.isFunction(a.uniqueSort) ? a.uniqueSort(v) : a.unique(v), w.push('<td class="' + v.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + (this.o.dateCells ? ' data-date="' + p.getTime().toString() + '"' : "") + ">" + p.getUTCDate() + "</td>"), d = null, u === this.o.weekEnd && w.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1) } this.picker.find(".datepicker-days tbody").html(w.join("")); var B = q[this.o.language].monthsTitle || q.en.monthsTitle || "Months", C = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? B : g).end().find("tbody span").removeClass("active"); if (a.each(this.dates, function (a, b) { b.getUTCFullYear() === g && C.eq(b.getUTCMonth()).addClass("active") }), (i > g || g > k) && C.addClass("disabled"), g === i && C.slice(0, j).addClass("disabled"), g === k && C.slice(l + 1).addClass("disabled"), this.o.beforeShowMonth !== a.noop) { var D = this; a.each(C, function (c, d) { var e = new Date(g, c, 1), f = D.o.beforeShowMonth(e); f === b ? f = {} : "boolean" == typeof f ? f = { enabled: f } : "string" == typeof f && (f = { classes: f }), f.enabled !== !1 || a(d).hasClass("disabled") || a(d).addClass("disabled"), f.classes && a(d).addClass(f.classes), f.tooltip && a(d).prop("title", f.tooltip) }) } this._fill_yearsView(".datepicker-years", "year", 10, 1, g, i, k, this.o.beforeShowYear), this._fill_yearsView(".datepicker-decades", "decade", 100, 10, g, i, k, this.o.beforeShowDecade), this._fill_yearsView(".datepicker-centuries", "century", 1e3, 100, g, i, k, this.o.beforeShowCentury) } }, updateNavArrows: function () { if (this._allow_update) { var a, b, c = new Date(this.viewDate), d = c.getUTCFullYear(), e = c.getUTCMonth(); switch (this.viewMode) { case 0: a = this.o.startDate !== -(1 / 0) && d <= this.o.startDate.getUTCFullYear() && e <= this.o.startDate.getUTCMonth(), b = this.o.endDate !== 1 / 0 && d >= this.o.endDate.getUTCFullYear() && e >= this.o.endDate.getUTCMonth(); break; case 1: case 2: case 3: case 4: a = this.o.startDate !== -(1 / 0) && d <= this.o.startDate.getUTCFullYear(), b = this.o.endDate !== 1 / 0 && d >= this.o.endDate.getUTCFullYear() }this.picker.find(".prev").toggleClass("disabled", a), this.picker.find(".next").toggleClass("disabled", b) } }, click: function (b) { b.preventDefault(), b.stopPropagation(); var e, f, g, h, i; e = a(b.target), e.hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1), e.hasClass("today") && !e.hasClass("day") && (this.setViewMode(0), this._setDate(d(), "linked" === this.o.todayBtn ? null : "view")), e.hasClass("clear") && this.clearDates(), e.hasClass("disabled") || (e.hasClass("day") && (g = Number(e.text()), h = this.viewDate.getUTCFullYear(), i = this.viewDate.getUTCMonth(), (e.hasClass("old") || e.hasClass("new")) && (f = e.hasClass("old") ? -1 : 1, i = (i + f + 12) % 12, (-1 === f && 11 === i || 1 === f && 0 === i) && (h += f, this.o.updateViewDate && this._trigger("changeYear", this.viewDate)), this.o.updateViewDate && this._trigger("changeMonth", this.viewDate)), this._setDate(c(h, i, g))), (e.hasClass("month") || e.hasClass("year") || e.hasClass("decade") || e.hasClass("century")) && (this.viewDate.setUTCDate(1), g = 1, 1 === this.viewMode ? (i = e.parent().find("span").index(e), h = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(i)) : (i = 0, h = Number(e.text()), this.viewDate.setUTCFullYear(h)), this._trigger(r.viewModes[this.viewMode - 1].e, this.viewDate), this.viewMode === this.o.minViewMode ? this._setDate(c(h, i, g)) : (this.setViewMode(this.viewMode - 1), this.fill()))), this.picker.is(":visible") && this._focused_from && this._focused_from.focus(), delete this._focused_from }, navArrowsClick: function (b) { var c = a(b.target), d = c.hasClass("prev") ? -1 : 1; 0 !== this.viewMode && (d *= 12 * r.viewModes[this.viewMode].navStep), this.viewDate = this.moveMonth(this.viewDate, d), this._trigger(r.viewModes[this.viewMode].e, this.viewDate), this.fill() }, _toggle_multidate: function (a) { var b = this.dates.contains(a); if (a || this.dates.clear(), -1 !== b ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(b) : this.o.multidate === !1 ? (this.dates.clear(), this.dates.push(a)) : this.dates.push(a), "number" == typeof this.o.multidate) for (; this.dates.length > this.o.multidate;)this.dates.remove(0) }, _setDate: function (a, b) { b && "date" !== b || this._toggle_multidate(a && new Date(a)), (!b && this.o.updateViewDate || "view" === b) && (this.viewDate = a && new Date(a)), this.fill(), this.setValue(), b && "view" === b || this._trigger("changeDate"), this.inputField.trigger("change"), !this.o.autoclose || b && "date" !== b || this.hide() }, moveDay: function (a, b) { var c = new Date(a); return c.setUTCDate(a.getUTCDate() + b), c }, moveWeek: function (a, b) { return this.moveDay(a, 7 * b) }, moveMonth: function (a, b) { if (!g(a)) return this.o.defaultViewDate; if (!b) return a; var c, d, e = new Date(a.valueOf()), f = e.getUTCDate(), h = e.getUTCMonth(), i = Math.abs(b); if (b = b > 0 ? 1 : -1, 1 === i) d = -1 === b ? function () { return e.getUTCMonth() === h } : function () { return e.getUTCMonth() !== c }, c = h + b, e.setUTCMonth(c), c = (c + 12) % 12; else { for (var j = 0; i > j; j++)e = this.moveMonth(e, b); c = e.getUTCMonth(), e.setUTCDate(f), d = function () { return c !== e.getUTCMonth() } } for (; d();)e.setUTCDate(--f), e.setUTCMonth(c); return e }, moveYear: function (a, b) { return this.moveMonth(a, 12 * b) }, moveAvailableDate: function (a, b, c) { do { if (a = this[c](a, b), !this.dateWithinRange(a)) return !1; c = "moveDay" } while (this.dateIsDisabled(a)); return a }, weekOfDateIsDisabled: function (b) { return -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled) }, dateIsDisabled: function (b) { return this.weekOfDateIsDisabled(b) || a.grep(this.o.datesDisabled, function (a) { return e(b, a) }).length > 0 }, dateWithinRange: function (a) { return a >= this.o.startDate && a <= this.o.endDate }, keydown: function (a) { if (!this.picker.is(":visible")) return void ((40 === a.keyCode || 27 === a.keyCode) && (this.show(), a.stopPropagation())); var b, c, d = !1, e = this.focusDate || this.viewDate; switch (a.keyCode) { case 27: this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), a.preventDefault(), a.stopPropagation(); break; case 37: case 38: case 39: case 40: if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break; b = 37 === a.keyCode || 38 === a.keyCode ? -1 : 1, 0 === this.viewMode ? a.ctrlKey ? (c = this.moveAvailableDate(e, b, "moveYear"), c && this._trigger("changeYear", this.viewDate)) : a.shiftKey ? (c = this.moveAvailableDate(e, b, "moveMonth"), c && this._trigger("changeMonth", this.viewDate)) : 37 === a.keyCode || 39 === a.keyCode ? c = this.moveAvailableDate(e, b, "moveDay") : this.weekOfDateIsDisabled(e) || (c = this.moveAvailableDate(e, b, "moveWeek")) : 1 === this.viewMode ? ((38 === a.keyCode || 40 === a.keyCode) && (b = 4 * b), c = this.moveAvailableDate(e, b, "moveMonth")) : 2 === this.viewMode && ((38 === a.keyCode || 40 === a.keyCode) && (b = 4 * b), c = this.moveAvailableDate(e, b, "moveYear")), c && (this.focusDate = this.viewDate = c, this.setValue(), this.fill(), a.preventDefault()); break; case 13: if (!this.o.forceParse) break; e = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(e), d = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (a.preventDefault(), a.stopPropagation(), this.o.autoclose && this.hide()); break; case 9: this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide() }d && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField.trigger("change")) }, setViewMode: function (a) { this.viewMode = a, this.picker.children("div").hide().filter(".datepicker-" + r.viewModes[this.viewMode].clsName).show(), this.updateNavArrows(), this._trigger("changeViewMode", new Date(this.viewDate)) } }; var l = function (b, c) { a.data(b, "datepicker", this), this.element = a(b), this.inputs = a.map(c.inputs, function (a) { return a.jquery ? a[0] : a }), delete c.inputs, this.keepEmptyValues = c.keepEmptyValues, delete c.keepEmptyValues, n.call(a(this.inputs), c).on("changeDate", a.proxy(this.dateUpdated, this)), this.pickers = a.map(this.inputs, function (b) { return a.data(b, "datepicker") }), this.updateDates() }; l.prototype = { updateDates: function () { this.dates = a.map(this.pickers, function (a) { return a.getUTCDate() }), this.updateRanges() }, updateRanges: function () { var b = a.map(this.dates, function (a) { return a.valueOf() }); a.each(this.pickers, function (a, c) { c.setRange(b) }) }, dateUpdated: function (c) { if (!this.updating) { this.updating = !0; var d = a.data(c.target, "datepicker"); if (d !== b) { var e = d.getUTCDate(), f = this.keepEmptyValues, g = a.inArray(c.target, this.inputs), h = g - 1, i = g + 1, j = this.inputs.length; if (-1 !== g) { if (a.each(this.pickers, function (a, b) { b.getUTCDate() || b !== d && f || b.setUTCDate(e) }), e < this.dates[h]) for (; h >= 0 && e < this.dates[h];)this.pickers[h--].setUTCDate(e); else if (e > this.dates[i]) for (; j > i && e > this.dates[i];)this.pickers[i++].setUTCDate(e); this.updateDates(), delete this.updating } } } }, destroy: function () { a.map(this.pickers, function (a) { a.destroy() }), a(this.inputs).off("changeDate", this.dateUpdated), delete this.element.data().datepicker }, remove: f("destroy") }; var m = a.fn.datepicker, n = function (c) { var d = Array.apply(null, arguments); d.shift(); var e; if (this.each(function () { var b = a(this), f = b.data("datepicker"), g = "object" == typeof c && c; if (!f) { var j = h(this, "date"), m = a.extend({}, o, j, g), n = i(m.language), p = a.extend({}, o, n, j, g); b.hasClass("input-daterange") || p.inputs ? (a.extend(p, { inputs: p.inputs || b.find("input").toArray() }), f = new l(this, p)) : f = new k(this, p), b.data("datepicker", f) } "string" == typeof c && "function" == typeof f[c] && (e = f[c].apply(f, d)) }), e === b || e instanceof k || e instanceof l) return this; if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + c + " function)"); return e }; a.fn.datepicker = n; var o = a.fn.datepicker.defaults = { assumeNearbyYear: !1, autoclose: !1, beforeShowDay: a.noop, beforeShowMonth: a.noop, beforeShowYear: a.noop, beforeShowDecade: a.noop, beforeShowCentury: a.noop, calendarWeeks: !1, clearBtn: !1, toggleActive: !1, daysOfWeekDisabled: [], daysOfWeekHighlighted: [], datesDisabled: [], endDate: 1 / 0, forceParse: !0, format: "mm/dd/yyyy", keepEmptyValues: !1, keyboardNavigation: !0, language: "en", minViewMode: 0, maxViewMode: 4, multidate: !1, multidateSeparator: ",", orientation: "auto", rtl: !1, startDate: -(1 / 0), startView: 0, todayBtn: !1, todayHighlight: !1, updateViewDate: !0, weekStart: 0, disableTouchKeyboard: !1, enableOnReadonly: !0, showOnFocus: !0, zIndexOffset: 10, container: "body", immediateUpdates: !1, dateCells: !1, title: "", templates: { leftArrow: "&#x00AB;", rightArrow: "&#x00BB;" } }, p = a.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"]; a.fn.datepicker.Constructor = k; var q = a.fn.datepicker.dates = { en: { days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], today: "Today", clear: "Clear", titleFormat: "MM yyyy" } }, r = { viewModes: [{ names: ["days", "month"], clsName: "days", e: "changeMonth" }, { names: ["months", "year"], clsName: "months", e: "changeYear", navStep: 1 }, { names: ["years", "decade"], clsName: "years", e: "changeDecade", navStep: 10 }, { names: ["decades", "century"], clsName: "decades", e: "changeCentury", navStep: 100 }, { names: ["centuries", "millennium"], clsName: "centuries", e: "changeMillennium", navStep: 1e3 }], validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g, nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g, parseFormat: function (a) { if ("function" == typeof a.toValue && "function" == typeof a.toDisplay) return a; var b = a.replace(this.validParts, "\x00").split("\x00"), c = a.match(this.validParts); if (!b || !b.length || !c || 0 === c.length) throw new Error("Invalid date format."); return { separators: b, parts: c } }, parseDate: function (e, f, g, h) { function i(a, b) { return b === !0 && (b = 10), 100 > a && (a += 2e3, a > (new Date).getFullYear() + b && (a -= 100)), a } function j() { var a = this.slice(0, l[o].length), b = l[o].slice(0, a.length); return a.toLowerCase() === b.toLowerCase() } if (!e) return b; if (e instanceof Date) return e; if ("string" == typeof f && (f = r.parseFormat(f)), f.toValue) return f.toValue(e, f, g); var l, m, n, o, p, s = { d: "moveDay", m: "moveMonth", w: "moveWeek", y: "moveYear" }, t = { yesterday: "-1d", today: "+0d", tomorrow: "+1d" }; if (e in t && (e = t[e]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(e)) { for (l = e.match(/([\-+]\d+)([dmwy])/gi), e = new Date, o = 0; o < l.length; o++)m = l[o].match(/([\-+]\d+)([dmwy])/i), n = Number(m[1]), p = s[m[2].toLowerCase()], e = k.prototype[p](e, n); return c(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()) } l = e && e.match(this.nonpunctuation) || [], e = new Date; var u, v, w = {}, x = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], y = { yyyy: function (a, b) { return a.setUTCFullYear(h ? i(b, h) : b) }, m: function (a, b) { if (isNaN(a)) return a; for (b -= 1; 0 > b;)b += 12; for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() !== b;)a.setUTCDate(a.getUTCDate() - 1); return a }, d: function (a, b) { return a.setUTCDate(b) } }; y.yy = y.yyyy, y.M = y.MM = y.mm = y.m, y.dd = y.d, e = d(); var z = f.parts.slice(); if (l.length !== z.length && (z = a(z).filter(function (b, c) { return -1 !== a.inArray(c, x) }).toArray()), l.length === z.length) { var A; for (o = 0, A = z.length; A > o; o++) { if (u = parseInt(l[o], 10), m = z[o], isNaN(u)) switch (m) { case "MM": v = a(q[g].months).filter(j), u = a.inArray(v[0], q[g].months) + 1; break; case "M": v = a(q[g].monthsShort).filter(j), u = a.inArray(v[0], q[g].monthsShort) + 1 }w[m] = u } var B, C; for (o = 0; o < x.length; o++)C = x[o], C in w && !isNaN(w[C]) && (B = new Date(e), y[C](B, w[C]), isNaN(B) || (e = B)) } return e }, formatDate: function (b, c, d) { if (!b) return ""; if ("string" == typeof c && (c = r.parseFormat(c)), c.toDisplay) return c.toDisplay(b, c, d); var e = { d: b.getUTCDate(), D: q[d].daysShort[b.getUTCDay()], DD: q[d].days[b.getUTCDay()], m: b.getUTCMonth() + 1, M: q[d].monthsShort[b.getUTCMonth()], MM: q[d].months[b.getUTCMonth()], yy: b.getUTCFullYear().toString().substring(2), yyyy: b.getUTCFullYear() }; e.dd = (e.d < 10 ? "0" : "") + e.d, e.mm = (e.m < 10 ? "0" : "") + e.m, b = []; for (var f = a.extend([], c.separators), g = 0, h = c.parts.length; h >= g; g++)f.length && b.push(f.shift()), b.push(e[c.parts[g]]); return b.join("") }, headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>', contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>', footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>' }; r.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + r.headTemplate + "<tbody></tbody>" + r.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + "</table></div></div>",
        a.fn.datepicker.DPGlobal = r, a.fn.datepicker.noConflict = function () { return a.fn.datepicker = m, this }, a.fn.datepicker.version = "1.7.0-dev", a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (b) { var c = a(this); c.data("datepicker") || (b.preventDefault(), n.call(c, "show")) }), a(function () { n.call(a('[data-provide="datepicker-inline"]')) })
});

! function (a) {


    a.fn.datepicker.dates.de = {
        days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
        daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        today: "Heute",
        monthsTitle: "Monate",
        clear: "Löschen",
        weekStart: 1,
        format: "dd.mm.yyyy"
    };

    /*a.fn.datepicker.dates['en'] = {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: "Today",
        monthsTitle: "Months",
        clear: "Clear",
        weekStart: 1,
        format: "mm/dd/yyyy"
    };*/

    a.fn.datepicker.dates['fr'] = {
        days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        daysMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
        months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Déc"],
        today: "Aujourd'hui",
        monthsTitle: "Mois",
        clear: "Effacer",
        weekStart: 1,
        format: "dd.mm.yyyy"
    };

    a.fn.datepicker.dates['it'] = {
        days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
        daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
        daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
        months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
        today: "Oggi",
        clear: "Cancella",
        weekStart: 1,
        format: "dd.mm.yyyy"
    };






}(jQuery);




/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.5-33
*/
!function (a) {
    function b(d, e, f) { return this instanceof b ? (this.el = void 0, this.events = {}, this.maskset = void 0, this.refreshValue = !1, void (f !== !0 && (a.isPlainObject(d) ? e = d : (e = e || {}, e.alias = d), this.opts = a.extend(!0, {}, this.defaults, e), this.noMasksCache = e && void 0 !== e.definitions, this.userOptions = e || {}, this.isRTL = this.opts.numericInput, c(this.opts.alias, e, this.opts)))) : new b(d, e, f) } function c(d, e, f) { var g = b.prototype.aliases[d]; return g ? (g.alias && c(g.alias, void 0, f), a.extend(!0, f, g), a.extend(!0, f, e), !0) : (null === f.mask && (f.mask = d), !1) } function d(c, d) { function e(c, e, f) { if (null !== c && "" !== c) { if (1 === c.length && f.greedy === !1 && 0 !== f.repeat && (f.placeholder = ""), f.repeat > 0 || "*" === f.repeat || "+" === f.repeat) { var g = "*" === f.repeat ? 0 : "+" === f.repeat ? 1 : f.repeat; c = f.groupmarker.start + c + f.groupmarker.end + f.quantifiermarker.start + g + "," + f.repeat + f.quantifiermarker.end } var h; return void 0 === b.prototype.masksCache[c] || d === !0 ? (h = { mask: c, maskToken: b.prototype.analyseMask(c, f), validPositions: {}, _buffer: void 0, buffer: void 0, tests: {}, metadata: e, maskLength: void 0 }, d !== !0 && (b.prototype.masksCache[f.numericInput ? c.split("").reverse().join("") : c] = h, h = a.extend(!0, {}, b.prototype.masksCache[f.numericInput ? c.split("").reverse().join("") : c]))) : h = a.extend(!0, {}, b.prototype.masksCache[f.numericInput ? c.split("").reverse().join("") : c]), h } } var f; if (a.isFunction(c.mask) && (c.mask = c.mask(c)), a.isArray(c.mask)) { if (c.mask.length > 1) { c.keepStatic = null === c.keepStatic || c.keepStatic; var g = c.groupmarker.start; return a.each(c.numericInput ? c.mask.reverse() : c.mask, function (b, d) { g.length > 1 && (g += c.groupmarker.end + c.alternatormarker + c.groupmarker.start), g += void 0 === d.mask || a.isFunction(d.mask) ? d : d.mask }), g += c.groupmarker.end, e(g, c.mask, c) } c.mask = c.mask.pop() } return c.mask && (f = void 0 === c.mask.mask || a.isFunction(c.mask.mask) ? e(c.mask, c.mask, c) : e(c.mask.mask, c.mask, c)), f } function e(c, d, f) {
        function k(a, b, c) { b = b || 0; var d, e, g, h = [], i = 0, j = n(); S = void 0 !== V ? V.maxLength : void 0, S === -1 && (S = void 0); do a === !0 && l().validPositions[i] ? (g = l().validPositions[i], e = g.match, d = g.locator.slice(), h.push(c === !0 ? g.input : c === !1 ? e.nativeDef : F(i, e))) : (g = q(i, d, i - 1), e = g.match, d = g.locator.slice(), (f.jitMasking === !1 || i < j || "number" == typeof f.jitMasking && isFinite(f.jitMasking) && f.jitMasking > i) && h.push(c === !1 ? e.nativeDef : F(i, e))), i++; while ((void 0 === S || i < S) && (null !== e.fn || "" !== e.def) || b > i); return "" === h[h.length - 1] && h.pop(), l().maskLength = i + 1, h } function l() { return d } function m(a) { var b = l(); b.buffer = void 0, a !== !0 && (b._buffer = void 0, b.validPositions = {}, b.p = 0) } function n(a, b, c) { var d = -1, e = -1, f = c || l().validPositions; void 0 === a && (a = -1); for (var g in f) { var h = parseInt(g); f[h] && (b || f[h].generatedInput !== !0) && (h <= a && (d = h), h >= a && (e = h)) } return d !== -1 && a - d > 1 || e < a ? d : e } function o(b, c, d, e) { function g(a) { var b = l().validPositions[a]; if (void 0 !== b && null === b.match.fn) { var c = l().validPositions[a - 1], d = l().validPositions[a + 1]; return void 0 !== c && void 0 !== d } return !1 } var h, i = b, j = a.extend(!0, {}, l().validPositions), k = !1; for (l().p = b, h = c - 1; h >= i; h--)void 0 !== l().validPositions[h] && (d !== !0 && (!l().validPositions[h].match.optionality && g(h) || f.canClearPosition(l(), h, n(), e, f) === !1) || delete l().validPositions[h]); for (m(!0), h = i + 1; h <= n();) { for (; void 0 !== l().validPositions[i];)i++; if (h < i && (h = i + 1), void 0 === l().validPositions[h] && A(h)) h++; else { var o = q(h); k === !1 && j[i] && j[i].match.def === o.match.def ? (l().validPositions[i] = a.extend(!0, {}, j[i]), l().validPositions[i].input = o.input, delete l().validPositions[h], h++) : s(i, o.match.def) ? z(i, o.input || F(h), !0) !== !1 && (delete l().validPositions[h], h++ , k = !0) : A(h) || (h++ , i--), i++ } } m(!0) } function p(a, b) { for (var c, d = a, e = n(), g = l().validPositions[e] || t(0)[0], h = void 0 !== g.alternation ? g.locator[g.alternation].toString().split(",") : [], i = 0; i < d.length && (c = d[i], !(c.match && (f.greedy && c.match.optionalQuantifier !== !0 || (c.match.optionality === !1 || c.match.newBlockMarker === !1) && c.match.optionalQuantifier !== !0) && (void 0 === g.alternation || g.alternation !== c.alternation || void 0 !== c.locator[g.alternation] && y(c.locator[g.alternation].toString().split(","), h))) || b === !0 && (null !== c.match.fn || /[0-9a-bA-Z]/.test(c.match.def))); i++); return c } function q(a, b, c) { return l().validPositions[a] || p(t(a, b ? b.slice() : b, c)) } function r(a) { return l().validPositions[a] ? l().validPositions[a] : t(a)[0] } function s(a, b) { for (var c = !1, d = t(a), e = 0; e < d.length; e++)if (d[e].match && d[e].match.def === b) { c = !0; break } return c } function t(b, c, d) { function e(c, d, g, h) { function j(g, h, m) { function p(b, c) { var d = 0 === a.inArray(b, c.matches); return d || a.each(c.matches, function (a, e) { if (e.isQuantifier === !0 && (d = p(b, c.matches[a - 1]))) return !1 }), d } function r(b, c, d) { var e, f; return (l().tests[b] || l().validPositions[b]) && a.each(l().tests[b] || [l().validPositions[b]], function (a, b) { var g = void 0 !== d ? d : b.alternation, h = void 0 !== b.locator[g] ? b.locator[g].toString().indexOf(c) : -1; (void 0 === f || h < f) && h !== -1 && (e = b, f = h) }), e ? e.locator.slice((void 0 !== d ? d : e.alternation) + 1) : void 0 !== d ? r(b, c) : void 0 } function s(a, c) { return null === a.match.fn && null !== c.match.fn && c.match.fn.test(a.match.def, l(), b, !1, f, !1) } if (k > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + l().mask; if (k === b && void 0 === g.matches) return n.push({ match: g, locator: h.reverse(), cd: q }), !0; if (void 0 !== g.matches) { if (g.isGroup && m !== g) { if (g = j(c.matches[a.inArray(g, c.matches) + 1], h)) return !0 } else if (g.isOptional) { var t = g; if (g = e(g, d, h, m)) { if (i = n[n.length - 1].match, !p(i, t)) return !0; o = !0, k = b } } else if (g.isAlternator) { var u, v = g, w = [], x = n.slice(), y = h.length, z = d.length > 0 ? d.shift() : -1; if (z === -1 || "string" == typeof z) { var A, B = k, C = d.slice(), D = []; if ("string" == typeof z) D = z.split(","); else for (A = 0; A < v.matches.length; A++)D.push(A); for (var E = 0; E < D.length; E++) { if (A = parseInt(D[E]), n = [], d = r(k, A, y) || C.slice(), g = j(v.matches[A] || c.matches[A], [A].concat(h), m) || g, g !== !0 && void 0 !== g && D[D.length - 1] < v.matches.length) { var F = a.inArray(g, c.matches) + 1; c.matches.length > F && (g = j(c.matches[F], [F].concat(h.slice(1, h.length)), m), g && (D.push(F.toString()), a.each(n, function (a, b) { b.alternation = h.length - 1 }))) } u = n.slice(), k = B, n = []; for (var G = 0; G < u.length; G++) { var H = u[G], I = !1; H.alternation = H.alternation || y; for (var J = 0; J < w.length; J++) { var K = w[J]; if (("string" != typeof z || a.inArray(H.locator[H.alternation].toString(), D) !== -1) && (H.match.def === K.match.def || s(H, K))) { I = H.match.nativeDef === K.match.nativeDef, H.alternation == K.alternation && K.locator[K.alternation].toString().indexOf(H.locator[H.alternation]) === -1 && (K.locator[K.alternation] = K.locator[K.alternation] + "," + H.locator[H.alternation], K.alternation = H.alternation, null == H.match.fn && (K.na = K.na || H.locator[H.alternation].toString(), K.na.indexOf(H.locator[H.alternation]) === -1 && (K.na = K.na + "," + H.locator[H.alternation]))); break } } I || w.push(H) } } "string" == typeof z && (w = a.map(w, function (b, c) { if (isFinite(c)) { var d, e = b.alternation, f = b.locator[e].toString().split(","); b.locator[e] = void 0, b.alternation = void 0; for (var g = 0; g < f.length; g++)d = a.inArray(f[g], D) !== -1, d && (void 0 !== b.locator[e] ? (b.locator[e] += ",", b.locator[e] += f[g]) : b.locator[e] = parseInt(f[g]), b.alternation = e); if (void 0 !== b.locator[e]) return b } })), n = x.concat(w), k = b, o = n.length > 0, d = C.slice() } else g = j(v.matches[z] || c.matches[z], [z].concat(h), m); if (g) return !0 } else if (g.isQuantifier && m !== c.matches[a.inArray(g, c.matches) - 1]) for (var L = g, M = d.length > 0 ? d.shift() : 0; M < (isNaN(L.quantifier.max) ? M + 1 : L.quantifier.max) && k <= b; M++) { var N = c.matches[a.inArray(L, c.matches) - 1]; if (g = j(N, [M].concat(h), N)) { if (i = n[n.length - 1].match, i.optionalQuantifier = M > L.quantifier.min - 1, p(i, N)) { if (M > L.quantifier.min - 1) { o = !0, k = b; break } return !0 } return !0 } } else if (g = e(g, d, h, m)) return !0 } else k++ } for (var m = d.length > 0 ? d.shift() : 0; m < c.matches.length; m++)if (c.matches[m].isQuantifier !== !0) { var p = j(c.matches[m], [m].concat(g), h); if (p && k === b) return p; if (k > b) break } } function g(b) { var c = []; return a.isArray(b) || (b = [b]), b.length > 0 && (void 0 === b[0].alternation ? (c = p(b.slice()).locator.slice(), 0 === c.length && (c = b[0].locator.slice())) : a.each(b, function (a, b) { if ("" !== b.def) if (0 === c.length) c = b.locator.slice(); else for (var d = 0; d < c.length; d++)b.locator[d] && c[d].toString().indexOf(b.locator[d]) === -1 && (c[d] += "," + b.locator[d]) })), c } function h(a) { return f.keepStatic && b > 0 && a.length > 1 + ("" === a[a.length - 1].match.def ? 1 : 0) && a[0].match.optionality !== !0 && a[0].match.optionalQuantifier !== !0 && null === a[0].match.fn && !/[0-9a-bA-Z]/.test(a[0].match.def) ? [p(a)] : a } var i, j = l().maskToken, k = c ? d : 0, m = c ? c.slice() : [0], n = [], o = !1, q = c ? c.join("") : ""; if (b > -1) { if (void 0 === c) { for (var r, s = b - 1; void 0 === (r = l().validPositions[s] || l().tests[s]) && s > -1;)s--; void 0 !== r && s > -1 && (m = g(r), q = m.join(""), k = s) } if (l().tests[b] && l().tests[b][0].cd === q) return h(l().tests[b]); for (var t = m.shift(); t < j.length; t++) { var u = e(j[t], m, [t]); if (u && k === b || k > b) break } } return (0 === n.length || o) && n.push({ match: { fn: null, cardinality: 0, optionality: !0, casing: null, def: "", placeholder: "" }, locator: [], cd: q }), void 0 !== c && l().tests[b] ? h(a.extend(!0, [], n)) : (l().tests[b] = a.extend(!0, [], n), h(l().tests[b])) } function u() { return void 0 === l()._buffer && (l()._buffer = k(!1, 1), void 0 === l().buffer && l()._buffer.slice()), l()._buffer } function v(a) { return void 0 !== l().buffer && a !== !0 || (l().buffer = k(!0, n(), !0)), l().buffer } function w(a, b, c) { var d; if (a === !0) m(), a = 0, b = c.length; else for (d = a; d < b; d++)delete l().validPositions[d]; for (d = a; d < b; d++)m(!0), c[d] !== f.skipOptionalPartCharacter && z(d, c[d], !0, !0) } function x(a, c, d) { switch (f.casing || c.casing) { case "upper": a = a.toUpperCase(); break; case "lower": a = a.toLowerCase(); break; case "title": var e = l().validPositions[d - 1]; a = 0 === d || e && e.input === String.fromCharCode(b.keyCode.SPACE) ? a.toUpperCase() : a.toLowerCase() }return a } function y(b, c, d) { for (var e, g = f.greedy ? c : c.slice(0, 1), h = !1, i = void 0 !== d ? d.split(",") : [], j = 0; j < i.length; j++)(e = b.indexOf(i[j])) !== -1 && b.splice(e, 1); for (var k = 0; k < b.length; k++)if (a.inArray(b[k], g) !== -1) { h = !0; break } return h } function z(c, d, e, g, h) { function i(a) { var b = W ? a.begin - a.end > 1 || a.begin - a.end === 1 && f.insertMode : a.end - a.begin > 1 || a.end - a.begin === 1 && f.insertMode; return b && 0 === a.begin && a.end === l().maskLength ? "full" : b } function j(b, d, e) { var h = !1; return a.each(t(b), function (j, k) { for (var p = k.match, q = d ? 1 : 0, r = "", s = p.cardinality; s > q; s--)r += D(b - (s - 1)); if (d && (r += d), v(!0), h = null != p.fn ? p.fn.test(r, l(), b, e, f, i(c)) : (d === p.def || d === f.skipOptionalPartCharacter) && "" !== p.def && { c: F(b, p, !0) || p.def, pos: b }, h !== !1) { var t = void 0 !== h.c ? h.c : d; t = t === f.skipOptionalPartCharacter && null === p.fn ? F(b, p, !0) || p.def : t; var y = b, A = v(); if (void 0 !== h.remove && (a.isArray(h.remove) || (h.remove = [h.remove]), a.each(h.remove.sort(function (a, b) { return b - a }), function (a, b) { o(b, b + 1, !0) })), void 0 !== h.insert && (a.isArray(h.insert) || (h.insert = [h.insert]), a.each(h.insert.sort(function (a, b) { return a - b }), function (a, b) { z(b.pos, b.c, !0, g) })), h.refreshFromBuffer) { var B = h.refreshFromBuffer; if (e = !0, w(B === !0 ? B : B.start, B.end, A), void 0 === h.pos && void 0 === h.c) return h.pos = n(), !1; if (y = void 0 !== h.pos ? h.pos : b, y !== b) return h = a.extend(h, z(y, t, !0, g)), !1 } else if (h !== !0 && void 0 !== h.pos && h.pos !== b && (y = h.pos, w(b, y, v().slice()), y !== b)) return h = a.extend(h, z(y, t, !0)), !1; return (h === !0 || void 0 !== h.pos || void 0 !== h.c) && (j > 0 && m(!0), u(y, a.extend({}, k, { input: x(t, p, y) }), g, i(c)) || (h = !1), !1) } }), h } function k(b, c, d) { var e, h, i, j, k, o, p, q, r = a.extend(!0, {}, l().validPositions), s = !1, u = n(); for (j = l().validPositions[u]; u >= 0; u--)if (i = l().validPositions[u], i && void 0 !== i.alternation) { if (e = u, h = l().validPositions[e].alternation, j.locator[i.alternation] !== i.locator[i.alternation]) break; j = i } if (void 0 !== h) { q = parseInt(e); var v = void 0 !== j.locator[j.alternation || h] ? j.locator[j.alternation || h] : p[0]; v.length > 0 && (v = v.split(",")[0]); var w = l().validPositions[q], x = l().validPositions[q - 1]; a.each(t(q, x ? x.locator : void 0, q - 1), function (e, i) { p = i.locator[h] ? i.locator[h].toString().split(",") : []; for (var j = 0; j < p.length; j++) { var t = [], u = 0, x = 0, y = !1; if (v < p[j] && (void 0 === i.na || a.inArray(p[j], i.na.split(",")) === -1)) { l().validPositions[q] = a.extend(!0, {}, i); var A = l().validPositions[q].locator; for (l().validPositions[q].locator[h] = parseInt(p[j]), null == i.match.fn ? (w.input !== i.match.def && (y = !0, w.generatedInput !== !0 && t.push(w.input)), x++ , l().validPositions[q].generatedInput = !/[0-9a-bA-Z]/.test(i.match.def), l().validPositions[q].input = i.match.def) : l().validPositions[q].input = w.input, k = q + 1; k < n(void 0, !0) + 1; k++)o = l().validPositions[k], o && o.generatedInput !== !0 && /[0-9a-bA-Z]/.test(o.input) ? t.push(o.input) : k < b && u++ , delete l().validPositions[k]; for (y && t[0] === i.match.def && t.shift(), m(!0), s = !0; t.length > 0;) { var B = t.shift(); if (B !== f.skipOptionalPartCharacter && !(s = z(n(void 0, !0) + 1, B, !1, g, !0))) break } if (s) { l().validPositions[q].locator = A; var C = n(b) + 1; for (k = q + 1; k < n() + 1; k++)o = l().validPositions[k], (void 0 === o || null == o.match.fn) && k < b + (x - u) && x++; b += x - u, s = z(b > C ? C : b, c, d, g, !0) } if (s) return !1; m(), l().validPositions = a.extend(!0, {}, r) } } }) } return s } function r(b, c) { var d = l().validPositions[c]; if (d) for (var e = d.locator, f = e.length, g = b; g < c; g++)if (void 0 === l().validPositions[g] && !A(g, !0)) { var h = t(g).slice(), i = p(h, !0), k = -1; "" === h[h.length - 1].match.def && h.pop(), a.each(h, function (a, b) { for (var c = 0; c < f; c++) { if (void 0 === b.locator[c] || !y(b.locator[c].toString().split(","), e[c].toString().split(","), b.na)) { var d = e[c], g = i.locator[c], h = b.locator[c]; d - g > Math.abs(d - h) && (i = b); break } k < c && (k = c, i = b) } }), i = a.extend({}, i, { input: F(g, i.match, !0) || i.match.def }), i.generatedInput = !0, u(g, i, !0), l().validPositions[c] = void 0, j(c, d.input, !0) } } function u(b, c, d, e) { if (e || f.insertMode && void 0 !== l().validPositions[b] && void 0 === d) { var g, h = a.extend(!0, {}, l().validPositions), i = n(void 0, !0); for (g = b; g <= i; g++)delete l().validPositions[g]; l().validPositions[b] = a.extend(!0, {}, c); var j, k = !0, o = l().validPositions, p = !1, q = l().maskLength; for (g = j = b; g <= i; g++) { var r = h[g]; if (void 0 !== r) for (var t = j; t < l().maskLength && (null === r.match.fn && o[g] && (o[g].match.optionalQuantifier === !0 || o[g].match.optionality === !0) || null != r.match.fn);) { if (t++ , p === !1 && h[t] && h[t].match.def === r.match.def) l().validPositions[t] = a.extend(!0, {}, h[t]), l().validPositions[t].input = r.input, C(t), j = t, k = !0; else if (s(t, r.match.def)) { var u = z(t, r.input, !0, !0); k = u !== !1, j = u.caret || u.insert ? n() : t, p = !0 } else if (k = r.generatedInput === !0, !k && t >= l().maskLength - 1) break; if (l().maskLength < q && (l().maskLength = q), k) break } if (!k) break } if (!k) return l().validPositions = a.extend(!0, {}, h), m(!0), !1 } else l().validPositions[b] = a.extend(!0, {}, c); return m(!0), !0 } function C(b) { for (var c = b - 1; c > -1 && !l().validPositions[c]; c--); var d, e; for (c++; c < b; c++)void 0 === l().validPositions[c] && (f.jitMasking === !1 || f.jitMasking > c) && (e = t(c, q(c - 1).locator, c - 1).slice(), "" === e[e.length - 1].match.def && e.pop(), d = p(e), d && (d.match.def === f.radixPointDefinitionSymbol || !A(c, !0) || a.inArray(f.radixPoint, v()) < c && d.match.fn && d.match.fn.test(F(c), l(), c, !1, f)) && (G = j(c, F(c, d.match, !0) || (null == d.match.fn ? d.match.def : "" !== F(c) ? F(c) : v()[c]), !0), G !== !1 && (l().validPositions[G.pos || c].generatedInput = !0))) } e = e === !0; var E = c; void 0 !== c.begin && (E = W && !i(c) ? c.end : c.begin); var G = !1, H = a.extend(!0, {}, l().validPositions); if (C(E), i(c) && (M(void 0, b.keyCode.DELETE, c), E = l().p), E < l().maskLength && (G = j(E, d, e), (!e || g === !0) && G === !1)) { var I = l().validPositions[E]; if (!I || null !== I.match.fn || I.match.def !== d && d !== f.skipOptionalPartCharacter) { if ((f.insertMode || void 0 === l().validPositions[B(E)]) && !A(E, !0)) for (var J = E + 1, K = B(E); J <= K; J++)if (G = j(J, d, e), G !== !1) { r(E, void 0 !== G.pos ? G.pos : J), E = J; break } } else G = { caret: B(E) } } return G === !1 && f.keepStatic && !e && h !== !0 && (G = k(E, d, e)), G === !0 && (G = { pos: E }), a.isFunction(f.postValidation) && G !== !1 && !e && g !== !0 && (G = !!f.postValidation(v(!0), G, f) && G), void 0 === G.pos && (G.pos = E), G === !1 && (m(!0), l().validPositions = a.extend(!0, {}, H)), G } function A(a, b) { var c; if (b ? (c = q(a).match, "" === c.def && (c = r(a).match)) : c = r(a).match, null != c.fn) return c.fn; if (b !== !0 && a > -1) { var d = t(a); return d.length > 1 + ("" === d[d.length - 1].match.def ? 1 : 0) } return !1 } function B(a, b) { var c = l().maskLength; if (a >= c) return c; for (var d = a; ++d < c && (b === !0 && (r(d).match.newBlockMarker !== !0 || !A(d)) || b !== !0 && !A(d));); return d } function C(a, b) { var c, d = a; if (d <= 0) return 0; for (; --d > 0 && (b === !0 && r(d).match.newBlockMarker !== !0 || b !== !0 && !A(d) && (c = t(d), c.length < 2 || 2 === c.length && "" === c[1].match.def));); return d } function D(a) { return void 0 === l().validPositions[a] ? F(a) : l().validPositions[a].input } function E(b, c, d, e, g) { if (e && a.isFunction(f.onBeforeWrite)) { var h = f.onBeforeWrite(e, c, d, f); if (h) { if (h.refreshFromBuffer) { var i = h.refreshFromBuffer; w(i === !0 ? i : i.start, i.end, h.buffer || c), c = v(!0) } void 0 !== d && (d = void 0 !== h.caret ? h.caret : d) } } b.inputmask._valueSet(c.join("")), void 0 === d || void 0 !== e && "blur" === e.type ? O(b, c, d) : I(b, d), g === !0 && (Y = !0, a(b).trigger("input")) } function F(b, c, d) { if (c = c || r(b).match, void 0 !== c.placeholder || d === !0) return a.isFunction(c.placeholder) ? c.placeholder(f) : c.placeholder; if (null === c.fn) { if (b > -1 && void 0 === l().validPositions[b]) { var e, g = t(b), h = []; if (g.length > 1 + ("" === g[g.length - 1].match.def ? 1 : 0)) for (var i = 0; i < g.length; i++)if (g[i].match.optionality !== !0 && g[i].match.optionalQuantifier !== !0 && (null === g[i].match.fn || void 0 === e || g[i].match.fn.test(e.match.def, l(), b, !0, f) !== !1) && (h.push(g[i]), null === g[i].match.fn && (e = g[i]), h.length > 1 && /[0-9a-bA-Z]/.test(h[0].match.def))) return f.placeholder.charAt(b % f.placeholder.length) } return c.def } return f.placeholder.charAt(b % f.placeholder.length) } function G(c, d, e, g, h, i) { function j() { var a = !1, b = u().slice(p, B(p)).join("").indexOf(o); if (b !== -1 && !A(p)) { a = !0; for (var c = u().slice(p, p + b), d = 0; d < c.length; d++)if (" " !== c[d]) { a = !1; break } } return a } var k = g.slice(), o = "", p = 0, r = void 0; if (m(), l().p = B(-1), !e) if (f.autoUnmask !== !0) { var s = u().slice(0, B(-1)).join(""), t = k.join("").match(new RegExp("^" + b.escapeRegex(s), "g")); t && t.length > 0 && (k.splice(0, t.length * s.length), p = B(p)) } else p = B(p); if (a.each(k, function (b, d) { if (void 0 !== d) { var g = new a.Event("keypress"); g.which = d.charCodeAt(0), o += d; var h = n(void 0, !0), i = l().validPositions[h], k = q(h + 1, i ? i.locator.slice() : void 0, h); if (!j() || e || f.autoUnmask) { var s = e ? b : null == k.match.fn && k.match.optionality && h + 1 < l().p ? h + 1 : l().p; r = aa.keypressEvent.call(c, g, !0, !1, e, s), p = s + 1, o = "" } else r = aa.keypressEvent.call(c, g, !0, !1, !0, h + 1); if (!e && a.isFunction(f.onBeforeWrite) && (r = f.onBeforeWrite(g, v(), r.forwardPosition, f), r && r.refreshFromBuffer)) { var t = r.refreshFromBuffer; w(t === !0 ? t : t.start, t.end, r.buffer), m(!0), r.caret && (l().p = r.caret) } } }), d) { var x = void 0, y = n(); document.activeElement === c && (h || r) && (x = I(c).begin, h && r === !1 && (x = B(n(x))), r && i !== !0 && (x < y + 1 || y === -1) && (x = f.numericInput && void 0 === r.caret ? C(r.forwardPosition) : r.forwardPosition)), E(c, v(), x, h || new a.Event("checkval")) } } function H(b) { if (b) { if (void 0 === b.inputmask) return b.value; b.inputmask && b.inputmask.refreshValue && aa.setValueEvent.call(b) } var c = [], d = l().validPositions; for (var e in d) d[e].match && null != d[e].match.fn && c.push(d[e].input); var g = 0 === c.length ? "" : (W ? c.reverse() : c).join(""); if (a.isFunction(f.onUnMask)) { var h = (W ? v().slice().reverse() : v()).join(""); g = f.onUnMask(h, g, f) || g } return g } function I(a, b, c, d) { function e(a) { if (d !== !0 && W && "number" == typeof a && (!f.greedy || "" !== f.placeholder)) { var b = v().join("").length; a = b - a } return a } var h; if ("number" != typeof b) return a.setSelectionRange ? (b = a.selectionStart, c = a.selectionEnd) : window.getSelection ? (h = window.getSelection().getRangeAt(0), h.commonAncestorContainer.parentNode !== a && h.commonAncestorContainer !== a || (b = h.startOffset, c = h.endOffset)) : document.selection && document.selection.createRange && (h = document.selection.createRange(), b = 0 - h.duplicate().moveStart("character", -a.inputmask._valueGet().length), c = b + h.text.length), { begin: e(b), end: e(c) }; b = e(b), c = e(c), c = "number" == typeof c ? c : b; var i = parseInt(((a.ownerDocument.defaultView || window).getComputedStyle ? (a.ownerDocument.defaultView || window).getComputedStyle(a, null) : a.currentStyle).fontSize) * c; if (a.scrollLeft = i > a.scrollWidth ? i : 0, g || f.insertMode !== !1 || b !== c || c++ , a.setSelectionRange) a.selectionStart = b, a.selectionEnd = c; else if (window.getSelection) { if (h = document.createRange(), void 0 === a.firstChild || null === a.firstChild) { var j = document.createTextNode(""); a.appendChild(j) } h.setStart(a.firstChild, b < a.inputmask._valueGet().length ? b : a.inputmask._valueGet().length), h.setEnd(a.firstChild, c < a.inputmask._valueGet().length ? c : a.inputmask._valueGet().length), h.collapse(!0); var k = window.getSelection(); k.removeAllRanges(), k.addRange(h) } else a.createTextRange && (h = a.createTextRange(), h.collapse(!0), h.moveEnd("character", c), h.moveStart("character", b), h.select()); O(a, void 0, { begin: b, end: c }) } function J(b) { var c, d, e = v(), f = e.length, g = n(), h = {}, i = l().validPositions[g], j = void 0 !== i ? i.locator.slice() : void 0; for (c = g + 1; c < e.length; c++)d = q(c, j, c - 1), j = d.locator.slice(), h[c] = a.extend(!0, {}, d); var k = i && void 0 !== i.alternation ? i.locator[i.alternation] : void 0; for (c = f - 1; c > g && (d = h[c], (d.match.optionality || d.match.optionalQuantifier || k && (k !== h[c].locator[i.alternation] && null != d.match.fn || null === d.match.fn && d.locator[i.alternation] && y(d.locator[i.alternation].toString().split(","), k.toString().split(",")) && "" !== t(c)[0].def)) && e[c] === F(c, d.match)); c--)f--; return b ? { l: f, def: h[f] ? h[f].match : void 0 } : f } function K(a) { for (var b, c = J(), d = a.length; c < d && !A(c + 1) && (b = r(c + 1)) && b.match.optionality !== !0 && b.match.optionalQuantifier !== !0;)c++; for (; (b = r(c - 1)) && b.match.optionality && b.input === f.skipOptionalPartCharacter;)c--; return a.splice(c), a } function L(b) { if (a.isFunction(f.isComplete)) return f.isComplete(b, f); if ("*" !== f.repeat) { var c = !1, d = J(!0), e = C(d.l); if (void 0 === d.def || d.def.newBlockMarker || d.def.optionality || d.def.optionalQuantifier) { c = !0; for (var g = 0; g <= e; g++) { var h = q(g).match; if (null !== h.fn && void 0 === l().validPositions[g] && h.optionality !== !0 && h.optionalQuantifier !== !0 || null === h.fn && b[g] !== F(g, h)) { c = !1; break } } } return c } } function M(c, d, e, g) { function h() { if (f.keepStatic) { for (var b = [], d = n(-1, !0), e = a.extend(!0, {}, l().validPositions), g = l().validPositions[d]; d >= 0; d--) { var h = l().validPositions[d]; if (h) { if (h.generatedInput !== !0 && /[0-9a-bA-Z]/.test(h.input) && b.push(h.input), delete l().validPositions[d], void 0 !== h.alternation && h.locator[h.alternation] !== g.locator[h.alternation]) break; g = h } } if (d > -1) for (l().p = B(n(-1, !0)); b.length > 0;) { var i = new a.Event("keypress"); i.which = b.pop().charCodeAt(0), aa.keypressEvent.call(c, i, !0, !1, !1, l().p) } else l().validPositions = a.extend(!0, {}, e) } } if ((f.numericInput || W) && (d === b.keyCode.BACKSPACE ? d = b.keyCode.DELETE : d === b.keyCode.DELETE && (d = b.keyCode.BACKSPACE), W)) { var i = e.end; e.end = e.begin, e.begin = i } d === b.keyCode.BACKSPACE && (e.end - e.begin < 1 || f.insertMode === !1) ? (e.begin = C(e.begin), void 0 === l().validPositions[e.begin] || l().validPositions[e.begin].input !== f.groupSeparator && l().validPositions[e.begin].input !== f.radixPoint || e.begin--) : d === b.keyCode.DELETE && e.begin === e.end && (e.end = A(e.end, !0) ? e.end + 1 : B(e.end) + 1, void 0 === l().validPositions[e.begin] || l().validPositions[e.begin].input !== f.groupSeparator && l().validPositions[e.begin].input !== f.radixPoint || e.end++), o(e.begin, e.end, !1, g), g !== !0 && h(); var j = n(e.begin, !0); j < e.begin ? l().p = B(j) : g !== !0 && (l().p = e.begin) } function N(b) { function c(a) { var c, d = document.createElement("span"); for (var e in g) isNaN(e) && e.indexOf("font") !== -1 && (d.style[e] = g[e]); d.style.textTransform = g.textTransform, d.style.letterSpacing = g.letterSpacing, d.style.position = "absolute", d.style.height = "auto", d.style.width = "auto", d.style.visibility = "hidden", d.style.whiteSpace = "nowrap", document.body.appendChild(d); var f, h = b.inputmask._valueGet(), i = 0; for (c = 0, f = h.length; c <= f; c++) { if (d.innerHTML += h.charAt(c) || "_", d.offsetWidth >= a) { var j = a - i, k = d.offsetWidth - a; d.innerHTML = h.charAt(c), j -= d.offsetWidth / 3, c = j < k ? c - 1 : c; break } i = d.offsetWidth } return document.body.removeChild(d), c } function d() { T.style.position = "absolute", T.style.top = e.top + "px", T.style.left = e.left + "px", T.style.width = parseInt(b.offsetWidth) - parseInt(g.paddingLeft) - parseInt(g.paddingRight) - parseInt(g.borderLeftWidth) - parseInt(g.borderRightWidth) + "px", T.style.height = parseInt(b.offsetHeight) - parseInt(g.paddingTop) - parseInt(g.paddingBottom) - parseInt(g.borderTopWidth) - parseInt(g.borderBottomWidth) + "px", T.style.lineHeight = T.style.height, T.style.zIndex = isNaN(g.zIndex) ? -1 : g.zIndex - 1, T.style.webkitAppearance = "textfield", T.style.mozAppearance = "textfield", T.style.Appearance = "textfield" } var e = a(b).position(), g = (b.ownerDocument.defaultView || window).getComputedStyle(b, null); b.parentNode; T = document.createElement("div"), document.body.appendChild(T); for (var h in g) isNaN(h) && "cssText" !== h && h.indexOf("webkit") == -1 && (T.style[h] = g[h]); b.style.backgroundColor = "transparent", b.style.color = "transparent", b.style.webkitAppearance = "caret", b.style.mozAppearance = "caret", b.style.Appearance = "caret", d(), a(window).on("resize", function (c) { e = a(b).position(), g = (b.ownerDocument.defaultView || window).getComputedStyle(b, null), d() }), a(b).on("click", function (a) { return I(b, c(a.clientX)), aa.clickEvent.call(this, [a]) }), a(b).on("keydown", function (a) { a.shiftKey || f.insertMode === !1 || setTimeout(function () { O(b) }, 0) }) } function O(a, b, c) { function d() { g || null !== i.fn && void 0 !== j.input ? g && null !== i.fn && void 0 !== j.input && (g = !1, e += "</span>") : (g = !0, e += "<span class='im-static''>") } if (void 0 !== T) { b = b || v(), void 0 === c ? c = I(a) : void 0 === c.begin && (c = { begin: c, end: c }); var e = "", g = !1; if ("" != b) { var h, i, j, k = 0, m = n(); do k === c.begin && document.activeElement === a && (e += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>"), l().validPositions[k] ? (j = l().validPositions[k], i = j.match, h = j.locator.slice(), d(), e += j.input) : (j = q(k, h, k - 1), i = j.match, h = j.locator.slice(), (f.jitMasking === !1 || k < m || "number" == typeof f.jitMasking && isFinite(f.jitMasking) && f.jitMasking > k) && (d(), e += F(k, i))), k++; while ((void 0 === S || k < S) && (null !== i.fn || "" !== i.def) || m > k) } T.innerHTML = e } } function P(b) { function c(b, c) { function d(b) { function d(b) { if (a.valHooks && (void 0 === a.valHooks[b] || a.valHooks[b].inputmaskpatch !== !0)) { var d = a.valHooks[b] && a.valHooks[b].get ? a.valHooks[b].get : function (a) { return a.value }, e = a.valHooks[b] && a.valHooks[b].set ? a.valHooks[b].set : function (a, b) { return a.value = b, a }; a.valHooks[b] = { get: function (a) { if (a.inputmask) { if (a.inputmask.opts.autoUnmask) return a.inputmask.unmaskedvalue(); var b = d(a); return n(void 0, void 0, a.inputmask.maskset.validPositions) !== -1 || c.nullable !== !0 ? b : "" } return d(a) }, set: function (b, c) { var d, f = a(b); return d = e(b, c), b.inputmask && f.trigger("setvalue"), d }, inputmaskpatch: !0 } } } function e() { return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : n() !== -1 || c.nullable !== !0 ? document.activeElement === this && c.clearMaskOnLostFocus ? (W ? K(v().slice()).reverse() : K(v().slice())).join("") : h.call(this) : "" : h.call(this) } function f(b) { i.call(this, b), this.inputmask && a(this).trigger("setvalue") } function g(b) { _.on(b, "mouseenter", function (b) { var c = a(this), d = this, e = d.inputmask._valueGet(); e !== v().join("") && c.trigger("setvalue") }) } var h, i; if (!b.inputmask.__valueGet) { if (c.noValuePatching !== !0) { if (Object.getOwnPropertyDescriptor) { "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function (a) { return a.__proto__ } : function (a) { return a.constructor.prototype }); var j = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(b), "value") : void 0; j && j.get && j.set ? (h = j.get, i = j.set, Object.defineProperty(b, "value", { get: e, set: f, configurable: !0 })) : "INPUT" !== b.tagName && (h = function () { return this.textContent }, i = function (a) { this.textContent = a }, Object.defineProperty(b, "value", { get: e, set: f, configurable: !0 })) } else document.__lookupGetter__ && b.__lookupGetter__("value") && (h = b.__lookupGetter__("value"), i = b.__lookupSetter__("value"), b.__defineGetter__("value", e), b.__defineSetter__("value", f)); b.inputmask.__valueGet = h, b.inputmask.__valueSet = i } b.inputmask._valueGet = function (a) { return W && a !== !0 ? h.call(this.el).split("").reverse().join("") : h.call(this.el) }, b.inputmask._valueSet = function (a, b) { i.call(this.el, null === a || void 0 === a ? "" : b !== !0 && W ? a.split("").reverse().join("") : a) }, void 0 === h && (h = function () { return this.value }, i = function (a) { this.value = a }, d(b.type), g(b)) } } var e = b.getAttribute("type"), f = "INPUT" === b.tagName && a.inArray(e, c.supportsInputType) !== -1 || b.isContentEditable || "TEXTAREA" === b.tagName; if (!f) if ("INPUT" === b.tagName) { var g = document.createElement("input"); g.setAttribute("type", e), f = "text" === g.type, g = null } else f = "partial"; return f !== !1 && d(b), f } var d = c(b, f); if (d !== !1 && (V = b, R = a(V), ("rtl" === V.dir || f.rightAlign) && (V.style.textAlign = "right"), ("rtl" === V.dir || f.numericInput) && (V.dir = "ltr", V.removeAttribute("dir"), V.inputmask.isRTL = !0, W = !0), f.colorMask === !0 && N(V), j && (V.hasOwnProperty("inputmode") && (V.inputmode = f.inputmode, V.setAttribute("inputmode", f.inputmode)), "rtfm" === f.androidHack && (f.colorMask !== !0 && N(V), V.type = "password")), _.off(V), d === !0 && (_.on(V, "submit", aa.submitEvent), _.on(V, "reset", aa.resetEvent), _.on(V, "mouseenter", aa.mouseenterEvent), _.on(V, "blur", aa.blurEvent), _.on(V, "focus", aa.focusEvent), _.on(V, "mouseleave", aa.mouseleaveEvent), f.colorMask !== !0 && _.on(V, "click", aa.clickEvent), _.on(V, "dblclick", aa.dblclickEvent), _.on(V, "paste", aa.pasteEvent), _.on(V, "dragdrop", aa.pasteEvent), _.on(V, "drop", aa.pasteEvent), _.on(V, "cut", aa.cutEvent), _.on(V, "complete", f.oncomplete), _.on(V, "incomplete", f.onincomplete), _.on(V, "cleared", f.oncleared), j && f.inputEventOnly === !0 || (_.on(V, "keydown", aa.keydownEvent), _.on(V, "keypress", aa.keypressEvent)), _.on(V, "compositionstart", a.noop), _.on(V, "compositionupdate", a.noop), _.on(V, "compositionend", a.noop), _.on(V, "keyup", a.noop), _.on(V, "input", aa.inputFallBackEvent), _.on(V, "beforeinput", a.noop)), _.on(V, "setvalue", aa.setValueEvent), u(), "" !== V.inputmask._valueGet() || f.clearMaskOnLostFocus === !1 || document.activeElement === V)) { var e = a.isFunction(f.onBeforeMask) ? f.onBeforeMask(V.inputmask._valueGet(), f) || V.inputmask._valueGet() : V.inputmask._valueGet(); G(V, !0, !1, e.split("")); var g = v().slice(); Q = g.join(""), L(g) === !1 && f.clearIncomplete && m(), f.clearMaskOnLostFocus && document.activeElement !== V && (n() === -1 ? g = [] : K(g)), E(V, g), document.activeElement === V && I(V, B(n())) } } d = d || this.maskset, f = f || this.opts; var Q, R, S, T, U, V = this.el, W = this.isRTL, X = !1, Y = !1, Z = !1, $ = !1, _ = { on: function (c, d, e) { var g = function (c) { if (void 0 === this.inputmask && "FORM" !== this.nodeName) { var d = a.data(this, "_inputmask_opts"); d ? new b(d).mask(this) : _.off(this) } else { if ("setvalue" === c.type || "FORM" === this.nodeName || !(this.disabled || this.readOnly && !("keydown" === c.type && c.ctrlKey && 67 === c.keyCode || f.tabThrough === !1 && c.keyCode === b.keyCode.TAB))) { switch (c.type) { case "input": if (Y === !0) return Y = !1, c.preventDefault(); break; case "keydown": X = !1, Y = !1; break; case "keypress": if (X === !0) return c.preventDefault(); X = !0; break; case "click": if (h || i) { var g = this, j = arguments; return setTimeout(function () { e.apply(g, j) }, 0), !1 } }var k = e.apply(this, arguments); return k === !1 && (c.preventDefault(), c.stopPropagation()), k } c.preventDefault() } }; c.inputmask.events[d] = c.inputmask.events[d] || [], c.inputmask.events[d].push(g), a.inArray(d, ["submit", "reset"]) !== -1 ? null != c.form && a(c.form).on(d, g) : a(c).on(d, g) }, off: function (b, c) { if (b.inputmask && b.inputmask.events) { var d; c ? (d = [], d[c] = b.inputmask.events[c]) : d = b.inputmask.events, a.each(d, function (c, d) { for (; d.length > 0;) { var e = d.pop(); a.inArray(c, ["submit", "reset"]) !== -1 ? null != b.form && a(b.form).off(c, e) : a(b).off(c, e) } delete b.inputmask.events[c] }) } } }, aa = {
            keydownEvent: function (c) {
                function d(a) { var b = document.createElement("input"), c = "on" + a, d = c in b; return d || (b.setAttribute(c, "return;"), d = "function" == typeof b[c]), b = null, d } var e = this, g = a(e), h = c.keyCode, j = I(e); if (h === b.keyCode.BACKSPACE || h === b.keyCode.DELETE || i && h === b.keyCode.BACKSPACE_SAFARI || c.ctrlKey && h === b.keyCode.X && !d("cut")) c.preventDefault(), M(e, h, j), E(e, v(!0), l().p, c, e.inputmask._valueGet() !== v().join("")), e.inputmask._valueGet() === u().join("") ? g.trigger("cleared") : L(v()) === !0 && g.trigger("complete"); else if (h === b.keyCode.END || h === b.keyCode.PAGE_DOWN) { c.preventDefault(); var k = B(n()); f.insertMode || k !== l().maskLength || c.shiftKey || k-- , I(e, c.shiftKey ? j.begin : k, k, !0) } else h === b.keyCode.HOME && !c.shiftKey || h === b.keyCode.PAGE_UP ? (c.preventDefault(), I(e, 0, c.shiftKey ? j.begin : 0, !0)) : (f.undoOnEscape && h === b.keyCode.ESCAPE || 90 === h && c.ctrlKey) && c.altKey !== !0 ? (G(e, !0, !1, Q.split("")), g.trigger("click")) : h !== b.keyCode.INSERT || c.shiftKey || c.ctrlKey ? f.tabThrough === !0 && h === b.keyCode.TAB ? (c.shiftKey === !0 ? (null === r(j.begin).match.fn && (j.begin = B(j.begin)), j.end = C(j.begin, !0), j.begin = C(j.end, !0)) : (j.begin = B(j.begin, !0), j.end = B(j.begin, !0), j.end < l().maskLength && j.end--), j.begin < l().maskLength && (c.preventDefault(),
                    I(e, j.begin, j.end))) : c.shiftKey || f.insertMode === !1 && (h === b.keyCode.RIGHT ? setTimeout(function () { var a = I(e); I(e, a.begin) }, 0) : h === b.keyCode.LEFT && setTimeout(function () { var a = I(e); I(e, W ? a.begin + 1 : a.begin - 1) }, 0)) : (f.insertMode = !f.insertMode, I(e, f.insertMode || j.begin !== l().maskLength ? j.begin : j.begin - 1)); f.onKeyDown.call(this, c, v(), I(e).begin, f), Z = a.inArray(h, f.ignorables) !== -1
            }, keypressEvent: function (c, d, e, g, h) { var i = this, j = a(i), k = c.which || c.charCode || c.keyCode; if (!(d === !0 || c.ctrlKey && c.altKey) && (c.ctrlKey || c.metaKey || Z)) return k === b.keyCode.ENTER && Q !== v().join("") && (Q = v().join(""), setTimeout(function () { j.trigger("change") }, 0)), !0; if (k) { 46 === k && c.shiftKey === !1 && "" !== f.radixPoint && (k = f.radixPoint.charCodeAt(0)); var n, o = d ? { begin: h, end: h } : I(i), p = String.fromCharCode(k); l().writeOutBuffer = !0; var q = z(o, p, g); if (q !== !1 && (m(!0), n = void 0 !== q.caret ? q.caret : d ? q.pos + 1 : B(q.pos), l().p = n), e !== !1) { var r = this; if (setTimeout(function () { f.onKeyValidation.call(r, k, q, f) }, 0), l().writeOutBuffer && q !== !1) { var s = v(); E(i, s, f.numericInput && void 0 === q.caret ? C(n) : n, c, d !== !0), d !== !0 && setTimeout(function () { L(s) === !0 && j.trigger("complete") }, 0) } } if (c.preventDefault(), d) return q.forwardPosition = n, q } }, pasteEvent: function (b) { var c, d = this, e = b.originalEvent || b, g = a(d), h = d.inputmask._valueGet(!0), i = I(d); W && (c = i.end, i.end = i.begin, i.begin = c); var j = h.substr(0, i.begin), k = h.substr(i.end, h.length); if (j === (W ? u().reverse() : u()).slice(0, i.begin).join("") && (j = ""), k === (W ? u().reverse() : u()).slice(i.end).join("") && (k = ""), W && (c = j, j = k, k = c), window.clipboardData && window.clipboardData.getData) h = j + window.clipboardData.getData("Text") + k; else { if (!e.clipboardData || !e.clipboardData.getData) return !0; h = j + e.clipboardData.getData("text/plain") + k } var l = h; if (a.isFunction(f.onBeforePaste)) { if (l = f.onBeforePaste(h, f), l === !1) return b.preventDefault(); l || (l = h) } return G(d, !1, !1, W ? l.split("").reverse() : l.toString().split("")), E(d, v(), B(n()), b, Q !== v().join("")), L(v()) === !0 && g.trigger("complete"), b.preventDefault() }, inputFallBackEvent: function (c) { var d = this, e = d.inputmask._valueGet(); if (v().join("") !== e) { var f = I(d); if (e = e.replace(new RegExp("(" + b.escapeRegex(u().join("")) + ")*"), ""), h) { var g = e.replace(v().join(""), ""); if (1 === g.length) { var i = new a.Event("keypress"); return i.which = g.charCodeAt(0), aa.keypressEvent.call(d, i, !0, !0, !1, l().validPositions[f.begin - 1] ? f.begin : f.begin - 1), !1 } } if (f.begin > e.length && (I(d, e.length), f = I(d)), v().length - e.length !== 1 || e.charAt(f.begin) === v()[f.begin] || e.charAt(f.begin + 1) === v()[f.begin] || A(f.begin)) { for (var j = n() + 1, k = u().join(""); null === e.match(b.escapeRegex(k) + "$");)k = k.slice(1); e = e.replace(k, ""), e = e.split(""), G(d, !0, !1, e, c, f.begin < j), L(v()) === !0 && a(d).trigger("complete") } else c.keyCode = b.keyCode.BACKSPACE, aa.keydownEvent.call(d, c); c.preventDefault() } }, setValueEvent: function (b) { this.inputmask.refreshValue = !1; var c = this, d = c.inputmask._valueGet(); G(c, !0, !1, (a.isFunction(f.onBeforeMask) ? f.onBeforeMask(d, f) || d : d).split("")), Q = v().join(""), (f.clearMaskOnLostFocus || f.clearIncomplete) && c.inputmask._valueGet() === u().join("") && c.inputmask._valueSet("") }, focusEvent: function (a) { var b = this, c = b.inputmask._valueGet(); f.showMaskOnFocus && (!f.showMaskOnHover || f.showMaskOnHover && "" === c) && (b.inputmask._valueGet() !== v().join("") ? E(b, v(), B(n())) : $ === !1 && I(b, B(n()))), f.positionCaretOnTab === !0 && aa.clickEvent.apply(b, [a, !0]), Q = v().join("") }, mouseleaveEvent: function (a) { var b = this; if ($ = !1, f.clearMaskOnLostFocus && document.activeElement !== b) { var c = v().slice(), d = b.inputmask._valueGet(); d !== b.getAttribute("placeholder") && "" !== d && (n() === -1 && d === u().join("") ? c = [] : K(c), E(b, c)) } }, clickEvent: function (b, c) { function d(b) { if ("" !== f.radixPoint) { var c = l().validPositions; if (void 0 === c[b] || c[b].input === F(b)) { if (b < B(-1)) return !0; var d = a.inArray(f.radixPoint, v()); if (d !== -1) { for (var e in c) if (d < e && c[e].input !== F(e)) return !1; return !0 } } } return !1 } var e = this; setTimeout(function () { if (document.activeElement === e) { var b = I(e); if (c && (b.begin = b.end), b.begin === b.end) switch (f.positionCaretOnClick) { case "none": break; case "radixFocus": if (d(b.begin)) { var g = a.inArray(f.radixPoint, v().join("")); I(e, f.numericInput ? B(g) : g); break } default: var h = b.begin, i = n(h, !0), j = B(i); if (h < j) I(e, A(h) || A(h - 1) ? h : B(h)); else { var k = F(j); ("" !== k && v()[j] !== k && r(j).match.optionalQuantifier !== !0 || !A(j) && r(j).match.def === k) && (j = B(j)), I(e, j) } } } }, 0) }, dblclickEvent: function (a) { var b = this; setTimeout(function () { I(b, 0, B(n())) }, 0) }, cutEvent: function (c) { var d = this, e = a(d), f = I(d), g = c.originalEvent || c, h = window.clipboardData || g.clipboardData, i = W ? v().slice(f.end, f.begin) : v().slice(f.begin, f.end); h.setData("text", W ? i.reverse().join("") : i.join("")), document.execCommand && document.execCommand("copy"), M(d, b.keyCode.DELETE, f), E(d, v(), l().p, c, Q !== v().join("")), d.inputmask._valueGet() === u().join("") && e.trigger("cleared") }, blurEvent: function (b) { var c = a(this), d = this; if (d.inputmask) { var e = d.inputmask._valueGet(), g = v().slice(); Q !== g.join("") && setTimeout(function () { c.trigger("change"), Q = g.join("") }, 0), "" !== e && (f.clearMaskOnLostFocus && (n() === -1 && e === u().join("") ? g = [] : K(g)), L(g) === !1 && (setTimeout(function () { c.trigger("incomplete") }, 0), f.clearIncomplete && (m(), g = f.clearMaskOnLostFocus ? [] : u().slice())), E(d, g, void 0, b)) } }, mouseenterEvent: function (a) { var b = this; $ = !0, document.activeElement !== b && f.showMaskOnHover && b.inputmask._valueGet() !== v().join("") && E(b, v()) }, submitEvent: function (a) { Q !== v().join("") && R.trigger("change"), f.clearMaskOnLostFocus && n() === -1 && V.inputmask._valueGet && V.inputmask._valueGet() === u().join("") && V.inputmask._valueSet(""), f.removeMaskOnSubmit && (V.inputmask._valueSet(V.inputmask.unmaskedvalue(), !0), setTimeout(function () { E(V, v()) }, 0)) }, resetEvent: function (a) { V.inputmask.refreshValue = !0, setTimeout(function () { R.trigger("setvalue") }, 0) }
        }; if (void 0 !== c) switch (c.action) { case "isComplete": return V = c.el, L(v()); case "unmaskedvalue": return void 0 !== V && void 0 === c.value || (U = c.value, U = (a.isFunction(f.onBeforeMask) ? f.onBeforeMask(U, f) || U : U).split(""), G(void 0, !1, !1, W ? U.reverse() : U), a.isFunction(f.onBeforeWrite) && f.onBeforeWrite(void 0, v(), 0, f)), H(V); case "mask": P(V); break; case "format": return U = (a.isFunction(f.onBeforeMask) ? f.onBeforeMask(c.value, f) || c.value : c.value).split(""), G(void 0, !1, !1, W ? U.reverse() : U), a.isFunction(f.onBeforeWrite) && f.onBeforeWrite(void 0, v(), 0, f), c.metadata ? { value: W ? v().slice().reverse().join("") : v().join(""), metadata: e.call(this, { action: "getmetadata" }, d, f) } : W ? v().slice().reverse().join("") : v().join(""); case "isValid": c.value ? (U = c.value.split(""), G(void 0, !1, !0, W ? U.reverse() : U)) : c.value = v().join(""); for (var ba = v(), ca = J(), da = ba.length - 1; da > ca && !A(da); da--); return ba.splice(ca, da + 1 - ca), L(ba) && c.value === v().join(""); case "getemptymask": return u().join(""); case "remove": if (V) { R = a(V), V.inputmask._valueSet(H(V)), _.off(V); var ea; Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (ea = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(V), "value"), ea && V.inputmask.__valueGet && Object.defineProperty(V, "value", { get: V.inputmask.__valueGet, set: V.inputmask.__valueSet, configurable: !0 })) : document.__lookupGetter__ && V.__lookupGetter__("value") && V.inputmask.__valueGet && (V.__defineGetter__("value", V.inputmask.__valueGet), V.__defineSetter__("value", V.inputmask.__valueSet)), V.inputmask = void 0 } return V; case "getmetadata": if (a.isArray(d.metadata)) { var fa = k(!0, 0, !1).join(""); return a.each(d.metadata, function (a, b) { if (b.mask === fa) return fa = b, !1 }), fa } return d.metadata }
    } var f = navigator.userAgent, g = /mobile/i.test(f), h = /iemobile/i.test(f), i = /iphone/i.test(f) && !h, j = /android/i.test(f) && !h; return b.prototype = { dataAttribute: "data-inputmask", defaults: { placeholder: "_", optionalmarker: { start: "[", end: "]" }, quantifiermarker: { start: "{", end: "}" }, groupmarker: { start: "(", end: ")" }, alternatormarker: "|", escapeChar: "\\", mask: null, oncomplete: a.noop, onincomplete: a.noop, oncleared: a.noop, repeat: 0, greedy: !0, autoUnmask: !1, removeMaskOnSubmit: !1, clearMaskOnLostFocus: !0, insertMode: !0, clearIncomplete: !1, alias: null, onKeyDown: a.noop, onBeforeMask: null, onBeforePaste: function (b, c) { return a.isFunction(c.onBeforeMask) ? c.onBeforeMask(b, c) : b }, onBeforeWrite: null, onUnMask: null, showMaskOnFocus: !0, showMaskOnHover: !0, onKeyValidation: a.noop, skipOptionalPartCharacter: " ", numericInput: !1, rightAlign: !1, undoOnEscape: !0, radixPoint: "", radixPointDefinitionSymbol: void 0, groupSeparator: "", keepStatic: null, positionCaretOnTab: !0, tabThrough: !1, supportsInputType: ["text", "tel", "password"], ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229], isComplete: null, canClearPosition: a.noop, postValidation: null, staticDefinitionSymbol: void 0, jitMasking: !1, nullable: !0, inputEventOnly: !1, noValuePatching: !1, positionCaretOnClick: "lvp", casing: null, inputmode: "verbatim", colorMask: !1, androidHack: !1 }, definitions: { 9: { validator: "[0-9]", cardinality: 1, definitionSymbol: "*" }, a: { validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", cardinality: 1, definitionSymbol: "*" }, "*": { validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", cardinality: 1 } }, aliases: {}, masksCache: {}, mask: function (f) { function g(b, d, e, f) { function g(a, c) { c = void 0 !== c ? c : b.getAttribute(f + "-" + a), null !== c && ("string" == typeof c && (0 === a.indexOf("on") ? c = window[c] : "false" === c ? c = !1 : "true" === c && (c = !0)), e[a] = c) } var h, i, j, k, l = b.getAttribute(f); if (l && "" !== l && (l = l.replace(new RegExp("'", "g"), '"'), i = JSON.parse("{" + l + "}")), i) { j = void 0; for (k in i) if ("alias" === k.toLowerCase()) { j = i[k]; break } } g("alias", j), e.alias && c(e.alias, e, d); for (h in d) { if (i) { j = void 0; for (k in i) if (k.toLowerCase() === h.toLowerCase()) { j = i[k]; break } } g(h, j) } return a.extend(!0, d, e), d } var h = this; return "string" == typeof f && (f = document.getElementById(f) || document.querySelectorAll(f)), f = f.nodeName ? [f] : f, a.each(f, function (c, f) { var i = a.extend(!0, {}, h.opts); g(f, i, a.extend(!0, {}, h.userOptions), h.dataAttribute); var j = d(i, h.noMasksCache); void 0 !== j && (void 0 !== f.inputmask && f.inputmask.remove(), f.inputmask = new b((void 0), (void 0), (!0)), f.inputmask.opts = i, f.inputmask.noMasksCache = h.noMasksCache, f.inputmask.userOptions = a.extend(!0, {}, h.userOptions), f.inputmask.isRTL = h.isRTL, f.inputmask.el = f, f.inputmask.maskset = j, a.data(f, "_inputmask_opts", i), e.call(f.inputmask, { action: "mask" })) }), f && f[0] ? f[0].inputmask || this : this }, option: function (b, c) { return "string" == typeof b ? this.opts[b] : "object" == typeof b ? (a.extend(this.userOptions, b), this.el && c !== !0 && this.mask(this.el), this) : void 0 }, unmaskedvalue: function (a) { return this.maskset = this.maskset || d(this.opts, this.noMasksCache), e.call(this, { action: "unmaskedvalue", value: a }) }, remove: function () { return e.call(this, { action: "remove" }) }, getemptymask: function () { return this.maskset = this.maskset || d(this.opts, this.noMasksCache), e.call(this, { action: "getemptymask" }) }, hasMaskedValue: function () { return !this.opts.autoUnmask }, isComplete: function () { return this.maskset = this.maskset || d(this.opts, this.noMasksCache), e.call(this, { action: "isComplete" }) }, getmetadata: function () { return this.maskset = this.maskset || d(this.opts, this.noMasksCache), e.call(this, { action: "getmetadata" }) }, isValid: function (a) { return this.maskset = this.maskset || d(this.opts, this.noMasksCache), e.call(this, { action: "isValid", value: a }) }, format: function (a, b) { return this.maskset = this.maskset || d(this.opts, this.noMasksCache), e.call(this, { action: "format", value: a, metadata: b }) }, analyseMask: function (c, d) { function e(a, b, c, d) { this.matches = [], this.openGroup = a || !1, this.isGroup = a || !1, this.isOptional = b || !1, this.isQuantifier = c || !1, this.isAlternator = d || !1, this.quantifier = { min: 1, max: 1 } } function f(a, c, e) { var f = (d.definitions ? d.definitions[c] : void 0) || b.prototype.definitions[c]; e = void 0 !== e ? e : a.matches.length; var g = a.matches[e - 1]; if (f && !r) { for (var h = f.prevalidator, i = h ? h.length : 0, j = 1; j < f.cardinality; j++) { var k = i >= j ? h[j - 1] : [], l = k.validator, m = k.cardinality; a.matches.splice(e++, 0, { fn: l ? "string" == typeof l ? new RegExp(l) : new function () { this.test = l } : new RegExp("."), cardinality: m ? m : 1, optionality: a.isOptional, newBlockMarker: void 0 === g || g.def !== (f.definitionSymbol || c), casing: f.casing, def: f.definitionSymbol || c, placeholder: f.placeholder, nativeDef: c }), g = a.matches[e - 1] } a.matches.splice(e++, 0, { fn: f.validator ? "string" == typeof f.validator ? new RegExp(f.validator) : new function () { this.test = f.validator } : new RegExp("."), cardinality: f.cardinality, optionality: a.isOptional, newBlockMarker: void 0 === g || g.def !== (f.definitionSymbol || c), casing: f.casing, def: f.definitionSymbol || c, placeholder: f.placeholder, nativeDef: c }) } else a.matches.splice(e++, 0, { fn: null, cardinality: 0, optionality: a.isOptional, newBlockMarker: void 0 === g || g.def !== c, casing: null, def: d.staticDefinitionSymbol || c, placeholder: void 0 !== d.staticDefinitionSymbol ? c : void 0, nativeDef: c }), r = !1 } function g(b) { b && b.matches && a.each(b.matches, function (a, c) { var e = b.matches[a + 1]; (void 0 === e || void 0 === e.matches || e.isQuantifier === !1) && c && c.isGroup && (c.isGroup = !1, f(c, d.groupmarker.start, 0), c.openGroup !== !0 && f(c, d.groupmarker.end)), g(c) }) } function h() { if (t.length > 0) { if (m = t[t.length - 1], f(m, k), m.isAlternator) { n = t.pop(); for (var a = 0; a < n.matches.length; a++)n.matches[a].isGroup = !1; t.length > 0 ? (m = t[t.length - 1], m.matches.push(n)) : s.matches.push(n) } } else f(s, k) } function i(a) { function b(a) { return a === d.optionalmarker.start ? a = d.optionalmarker.end : a === d.optionalmarker.end ? a = d.optionalmarker.start : a === d.groupmarker.start ? a = d.groupmarker.end : a === d.groupmarker.end && (a = d.groupmarker.start), a } a.matches = a.matches.reverse(); for (var c in a.matches) if (a.matches.hasOwnProperty(c)) { var e = parseInt(c); if (a.matches[c].isQuantifier && a.matches[e + 1] && a.matches[e + 1].isGroup) { var f = a.matches[c]; a.matches.splice(c, 1), a.matches.splice(e + 1, 0, f) } void 0 !== a.matches[c].matches ? a.matches[c] = i(a.matches[c]) : a.matches[c] = b(a.matches[c]) } return a } for (var j, k, l, m, n, o, p, q = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, r = !1, s = new e, t = [], u = []; j = q.exec(c);)if (k = j[0], r) h(); else switch (k.charAt(0)) { case d.escapeChar: r = !0; break; case d.optionalmarker.end: case d.groupmarker.end: if (l = t.pop(), l.openGroup = !1, void 0 !== l) if (t.length > 0) { if (m = t[t.length - 1], m.matches.push(l), m.isAlternator) { n = t.pop(); for (var v = 0; v < n.matches.length; v++)n.matches[v].isGroup = !1; t.length > 0 ? (m = t[t.length - 1], m.matches.push(n)) : s.matches.push(n) } } else s.matches.push(l); else h(); break; case d.optionalmarker.start: t.push(new e((!1), (!0))); break; case d.groupmarker.start: t.push(new e((!0))); break; case d.quantifiermarker.start: var w = new e((!1), (!1), (!0)); k = k.replace(/[{}]/g, ""); var x = k.split(","), y = isNaN(x[0]) ? x[0] : parseInt(x[0]), z = 1 === x.length ? y : isNaN(x[1]) ? x[1] : parseInt(x[1]); if ("*" !== z && "+" !== z || (y = "*" === z ? 0 : 1), w.quantifier = { min: y, max: z }, t.length > 0) { var A = t[t.length - 1].matches; j = A.pop(), j.isGroup || (p = new e((!0)), p.matches.push(j), j = p), A.push(j), A.push(w) } else j = s.matches.pop(), j.isGroup || (p = new e((!0)), p.matches.push(j), j = p), s.matches.push(j), s.matches.push(w); break; case d.alternatormarker: t.length > 0 ? (m = t[t.length - 1], o = m.matches.pop()) : o = s.matches.pop(), o.isAlternator ? t.push(o) : (n = new e((!1), (!1), (!1), (!0)), n.matches.push(o), t.push(n)); break; default: h() }for (; t.length > 0;)l = t.pop(), s.matches.push(l); return s.matches.length > 0 && (g(s), u.push(s)), d.numericInput && i(u[0]), u } }, b.extendDefaults = function (c) { a.extend(!0, b.prototype.defaults, c) }, b.extendDefinitions = function (c) { a.extend(!0, b.prototype.definitions, c) }, b.extendAliases = function (c) { a.extend(!0, b.prototype.aliases, c) }, b.format = function (a, c, d) { return b(c).format(a, d) }, b.unmask = function (a, c) { return b(c).unmaskedvalue(a) }, b.isValid = function (a, c) { return b(c).isValid(a) }, b.remove = function (b) { a.each(b, function (a, b) { b.inputmask && b.inputmask.remove() }) }, b.escapeRegex = function (a) { var b = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"]; return a.replace(new RegExp("(\\" + b.join("|\\") + ")", "gim"), "\\$1") }, b.keyCode = { ALT: 18, BACKSPACE: 8, BACKSPACE_SAFARI: 127, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91, X: 88 }, window.Inputmask = b, b
}(jQuery), function (a, b) { return void 0 === a.fn.inputmask && (a.fn.inputmask = function (c, d) { var e, f = this[0]; if (void 0 === d && (d = {}), "string" == typeof c) switch (c) { case "unmaskedvalue": return f && f.inputmask ? f.inputmask.unmaskedvalue() : a(f).val(); case "remove": return this.each(function () { this.inputmask && this.inputmask.remove() }); case "getemptymask": return f && f.inputmask ? f.inputmask.getemptymask() : ""; case "hasMaskedValue": return !(!f || !f.inputmask) && f.inputmask.hasMaskedValue(); case "isComplete": return !f || !f.inputmask || f.inputmask.isComplete(); case "getmetadata": return f && f.inputmask ? f.inputmask.getmetadata() : void 0; case "setvalue": a(f).val(d), f && void 0 === f.inputmask && a(f).triggerHandler("setvalue"); break; case "option": if ("string" != typeof d) return this.each(function () { if (void 0 !== this.inputmask) return this.inputmask.option(d) }); if (f && void 0 !== f.inputmask) return f.inputmask.option(d); break; default: return d.alias = c, e = new b(d), this.each(function () { e.mask(this) }) } else { if ("object" == typeof c) return e = new b(c), void 0 === c.mask && void 0 === c.alias ? this.each(function () { return void 0 !== this.inputmask ? this.inputmask.option(c) : void e.mask(this) }) : this.each(function () { e.mask(this) }); if (void 0 === c) return this.each(function () { e = new b(d), e.mask(this) }) } }), a.fn.inputmask }(jQuery, Inputmask), function (a, b) { }(jQuery, Inputmask), function (a, b) { function c(a) { return isNaN(a) || 29 === new Date(a, 2, 0).getDate() } return b.extendAliases({ "dd/mm/yyyy": { mask: "1/2/y", placeholder: "dd/mm/yyyy", regex: { val1pre: new RegExp("[0-3]"), val1: new RegExp("0[1-9]|[12][0-9]|3[01]"), val2pre: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|[12][0-9]|3[01])" + c + "[01])") }, val2: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|[12][0-9])" + c + "(0[1-9]|1[012]))|(30" + c + "(0[13-9]|1[012]))|(31" + c + "(0[13578]|1[02]))") } }, leapday: "29/02/", separator: "/", yearrange: { minyear: 1900, maxyear: 2099 }, isInYearRange: function (a, b, c) { if (isNaN(a)) return !1; var d = parseInt(a.concat(b.toString().slice(a.length))), e = parseInt(a.concat(c.toString().slice(a.length))); return !isNaN(d) && (b <= d && d <= c) || !isNaN(e) && (b <= e && e <= c) }, determinebaseyear: function (a, b, c) { var d = (new Date).getFullYear(); if (a > d) return a; if (b < d) { for (var e = b.toString().slice(0, 2), f = b.toString().slice(2, 4); b < e + c;)e--; var g = e + f; return a > g ? a : g } if (a <= d && d <= b) { for (var h = d.toString().slice(0, 2); b < h + c;)h--; var i = h + c; return i < a ? a : i } return d }, onKeyDown: function (c, d, e, f) { var g = a(this); if (c.ctrlKey && c.keyCode === b.keyCode.RIGHT) { var h = new Date; g.val(h.getDate().toString() + (h.getMonth() + 1).toString() + h.getFullYear().toString()), g.trigger("setvalue") } }, getFrontValue: function (a, b, c) { for (var d = 0, e = 0, f = 0; f < a.length && "2" !== a.charAt(f); f++) { var g = c.definitions[a.charAt(f)]; g ? (d += e, e = g.cardinality) : e++ } return b.join("").substr(d, e) }, postValidation: function (a, b, d) { var e, f, g = a.join(""); return 0 === d.mask.indexOf("y") ? (f = g.substr(0, 4), e = g.substr(4, 11)) : (f = g.substr(6, 11), e = g.substr(0, 6)), b && (e !== d.leapday || c(f)) }, definitions: { 1: { validator: function (a, b, c, d, e) { var f = e.regex.val1.test(a); return d || f || a.charAt(1) !== e.separator && "-./".indexOf(a.charAt(1)) === -1 || !(f = e.regex.val1.test("0" + a.charAt(0))) ? f : (b.buffer[c - 1] = "0", { refreshFromBuffer: { start: c - 1, end: c }, pos: c, c: a.charAt(0) }) }, cardinality: 2, prevalidator: [{ validator: function (a, b, c, d, e) { var f = a; isNaN(b.buffer[c + 1]) || (f += b.buffer[c + 1]); var g = 1 === f.length ? e.regex.val1pre.test(f) : e.regex.val1.test(f); if (!d && !g) { if (g = e.regex.val1.test(a + "0")) return b.buffer[c] = a, b.buffer[++c] = "0", { pos: c, c: "0" }; if (g = e.regex.val1.test("0" + a)) return b.buffer[c] = "0", c++ , { pos: c } } return g }, cardinality: 1 }] }, 2: { validator: function (a, b, c, d, e) { var f = e.getFrontValue(b.mask, b.buffer, e); f.indexOf(e.placeholder[0]) !== -1 && (f = "01" + e.separator); var g = e.regex.val2(e.separator).test(f + a); return d || g || a.charAt(1) !== e.separator && "-./".indexOf(a.charAt(1)) === -1 || !(g = e.regex.val2(e.separator).test(f + "0" + a.charAt(0))) ? g : (b.buffer[c - 1] = "0", { refreshFromBuffer: { start: c - 1, end: c }, pos: c, c: a.charAt(0) }) }, cardinality: 2, prevalidator: [{ validator: function (a, b, c, d, e) { isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]); var f = e.getFrontValue(b.mask, b.buffer, e); f.indexOf(e.placeholder[0]) !== -1 && (f = "01" + e.separator); var g = 1 === a.length ? e.regex.val2pre(e.separator).test(f + a) : e.regex.val2(e.separator).test(f + a); return d || g || !(g = e.regex.val2(e.separator).test(f + "0" + a)) ? g : (b.buffer[c] = "0", c++ , { pos: c }) }, cardinality: 1 }] }, y: { validator: function (a, b, c, d, e) { return e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear) }, cardinality: 4, prevalidator: [{ validator: function (a, b, c, d, e) { var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear); if (!d && !f) { var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0").toString().slice(0, 1); if (f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(0), { pos: c }; if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0").toString().slice(0, 2), f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(0), b.buffer[c++] = g.charAt(1), { pos: c } } return f }, cardinality: 1 }, { validator: function (a, b, c, d, e) { var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear); if (!d && !f) { var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2); if (f = e.isInYearRange(a[0] + g[1] + a[1], e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(1), { pos: c }; if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2), f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c - 1] = g.charAt(0), b.buffer[c++] = g.charAt(1), b.buffer[c++] = a.charAt(0), { refreshFromBuffer: { start: c - 3, end: c }, pos: c } } return f }, cardinality: 2 }, { validator: function (a, b, c, d, e) { return e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear) }, cardinality: 3 }] } }, insertMode: !1, autoUnmask: !1 }, "mm/dd/yyyy": { placeholder: "mm/dd/yyyy", alias: "dd/mm/yyyy", regex: { val2pre: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])") }, val2: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)") }, val1pre: new RegExp("[01]"), val1: new RegExp("0[1-9]|1[012]") }, leapday: "02/29/", onKeyDown: function (c, d, e, f) { var g = a(this); if (c.ctrlKey && c.keyCode === b.keyCode.RIGHT) { var h = new Date; g.val((h.getMonth() + 1).toString() + h.getDate().toString() + h.getFullYear().toString()), g.trigger("setvalue") } } }, "yyyy/mm/dd": { mask: "y/1/2", placeholder: "yyyy/mm/dd", alias: "mm/dd/yyyy", leapday: "/02/29", onKeyDown: function (c, d, e, f) { var g = a(this); if (c.ctrlKey && c.keyCode === b.keyCode.RIGHT) { var h = new Date; g.val(h.getFullYear().toString() + (h.getMonth() + 1).toString() + h.getDate().toString()), g.trigger("setvalue") } } }, "dd.mm.yyyy": { mask: "1.2.y", placeholder: "dd.mm.yyyy", leapday: "29.02.", separator: ".", alias: "dd/mm/yyyy" }, "dd-mm-yyyy": { mask: "1-2-y", placeholder: "dd-mm-yyyy", leapday: "29-02-", separator: "-", alias: "dd/mm/yyyy" }, "mm.dd.yyyy": { mask: "1.2.y", placeholder: "mm.dd.yyyy", leapday: "02.29.", separator: ".", alias: "mm/dd/yyyy" }, "mm-dd-yyyy": { mask: "1-2-y", placeholder: "mm-dd-yyyy", leapday: "02-29-", separator: "-", alias: "mm/dd/yyyy" }, "yyyy.mm.dd": { mask: "y.1.2", placeholder: "yyyy.mm.dd", leapday: ".02.29", separator: ".", alias: "yyyy/mm/dd" }, "yyyy-mm-dd": { mask: "y-1-2", placeholder: "yyyy-mm-dd", leapday: "-02-29", separator: "-", alias: "yyyy/mm/dd" }, datetime: { mask: "1/2/y h:s", placeholder: "dd/mm/yyyy hh:mm", alias: "dd/mm/yyyy", regex: { hrspre: new RegExp("[012]"), hrs24: new RegExp("2[0-4]|1[3-9]"), hrs: new RegExp("[01][0-9]|2[0-4]"), ampm: new RegExp("^[a|p|A|P][m|M]"), mspre: new RegExp("[0-5]"), ms: new RegExp("[0-5][0-9]") }, timeseparator: ":", hourFormat: "24", definitions: { h: { validator: function (a, b, c, d, e) { if ("24" === e.hourFormat && 24 === parseInt(a, 10)) return b.buffer[c - 1] = "0", b.buffer[c] = "0", { refreshFromBuffer: { start: c - 1, end: c }, c: "0" }; var f = e.regex.hrs.test(a); if (!d && !f && (a.charAt(1) === e.timeseparator || "-.:".indexOf(a.charAt(1)) !== -1) && (f = e.regex.hrs.test("0" + a.charAt(0)))) return b.buffer[c - 1] = "0", b.buffer[c] = a.charAt(0), c++ , { refreshFromBuffer: { start: c - 2, end: c }, pos: c, c: e.timeseparator }; if (f && "24" !== e.hourFormat && e.regex.hrs24.test(a)) { var g = parseInt(a, 10); return 24 === g ? (b.buffer[c + 5] = "a", b.buffer[c + 6] = "m") : (b.buffer[c + 5] = "p", b.buffer[c + 6] = "m"), g -= 12, g < 10 ? (b.buffer[c] = g.toString(), b.buffer[c - 1] = "0") : (b.buffer[c] = g.toString().charAt(1), b.buffer[c - 1] = g.toString().charAt(0)), { refreshFromBuffer: { start: c - 1, end: c + 6 }, c: b.buffer[c] } } return f }, cardinality: 2, prevalidator: [{ validator: function (a, b, c, d, e) { var f = e.regex.hrspre.test(a); return d || f || !(f = e.regex.hrs.test("0" + a)) ? f : (b.buffer[c] = "0", c++ , { pos: c }) }, cardinality: 1 }] }, s: { validator: "[0-5][0-9]", cardinality: 2, prevalidator: [{ validator: function (a, b, c, d, e) { var f = e.regex.mspre.test(a); return d || f || !(f = e.regex.ms.test("0" + a)) ? f : (b.buffer[c] = "0", c++ , { pos: c }) }, cardinality: 1 }] }, t: { validator: function (a, b, c, d, e) { return e.regex.ampm.test(a + "m") }, casing: "lower", cardinality: 1 } }, insertMode: !1, autoUnmask: !1 }, datetime12: { mask: "1/2/y h:s t\\m", placeholder: "dd/mm/yyyy hh:mm xm", alias: "datetime", hourFormat: "12" }, "mm/dd/yyyy hh:mm xm": { mask: "1/2/y h:s t\\m", placeholder: "mm/dd/yyyy hh:mm xm", alias: "datetime12", regex: { val2pre: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])") }, val2: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)") }, val1pre: new RegExp("[01]"), val1: new RegExp("0[1-9]|1[012]") }, leapday: "02/29/", onKeyDown: function (c, d, e, f) { var g = a(this); if (c.ctrlKey && c.keyCode === b.keyCode.RIGHT) { var h = new Date; g.val((h.getMonth() + 1).toString() + h.getDate().toString() + h.getFullYear().toString()), g.trigger("setvalue") } } }, "hh:mm t": { mask: "h:s t\\m", placeholder: "hh:mm xm", alias: "datetime", hourFormat: "12" }, "h:s t": { mask: "h:s t\\m", placeholder: "hh:mm xm", alias: "datetime", hourFormat: "12" }, "hh:mm:ss": { mask: "h:s:s", placeholder: "hh:mm:ss", alias: "datetime", autoUnmask: !1 }, "hh:mm": { mask: "h:s", placeholder: "hh:mm", alias: "datetime", autoUnmask: !1 }, date: { alias: "dd/mm/yyyy" }, "mm/yyyy": { mask: "1/y", placeholder: "mm/yyyy", leapday: "donotuse", separator: "/", alias: "mm/dd/yyyy" }, shamsi: { regex: { val2pre: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "[0-3])") }, val2: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + c + "30)|((0[1-6])" + c + "31)") }, val1pre: new RegExp("[01]"), val1: new RegExp("0[1-9]|1[012]") }, yearrange: { minyear: 1300, maxyear: 1499 }, mask: "y/1/2", leapday: "/12/30", placeholder: "yyyy/mm/dd", alias: "mm/dd/yyyy", clearIncomplete: !0 }, "yyyy-mm-dd hh:mm:ss": { mask: "y-1-2 h:s:s", placeholder: "yyyy-mm-dd hh:mm:ss", alias: "datetime", separator: "-", leapday: "-02-29", regex: { val2pre: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])") }, val2: function (a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)") }, val1pre: new RegExp("[01]"), val1: new RegExp("0[1-9]|1[012]") }, onKeyDown: function (a, b, c, d) { } } }), b }(jQuery, Inputmask), function (a, b) { return b.extendDefinitions({ A: { validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", cardinality: 1, casing: "upper" }, "&": { validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", cardinality: 1, casing: "upper" }, "#": { validator: "[0-9A-Fa-f]", cardinality: 1, casing: "upper" } }), b.extendAliases({ url: { definitions: { i: { validator: ".", cardinality: 1 } }, mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}", insertMode: !1, autoUnmask: !1, inputmode: "url" }, ip: { mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]", definitions: { i: { validator: function (a, b, c, d, e) { return c - 1 > -1 && "." !== b.buffer[c - 1] ? (a = b.buffer[c - 1] + a, a = c - 2 > -1 && "." !== b.buffer[c - 2] ? b.buffer[c - 2] + a : "0" + a) : a = "00" + a, new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a) }, cardinality: 1 } }, onUnMask: function (a, b, c) { return a }, inputmode: "numeric" }, email: { mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]", greedy: !1, onBeforePaste: function (a, b) { return a = a.toLowerCase(), a.replace("mailto:", "") }, definitions: { "*": { validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]", cardinality: 1, casing: "lower" }, "-": { validator: "[0-9A-Za-z-]", cardinality: 1, casing: "lower" } }, onUnMask: function (a, b, c) { return a }, inputmode: "email" }, mac: { mask: "##:##:##:##:##:##" }, vin: { mask: "V{13}9{4}", definitions: { V: { validator: "[A-HJ-NPR-Za-hj-npr-z\\d]", cardinality: 1, casing: "upper" } }, clearIncomplete: !0, autoUnmask: !0 } }), b }(jQuery, Inputmask), function (a, b) {
    return b.extendAliases({
        numeric: {
            mask: function (a) { function c(b) { for (var c = "", d = 0; d < b.length; d++)c += a.definitions[b.charAt(d)] || a.optionalmarker.start === b.charAt(d) || a.optionalmarker.end === b.charAt(d) || a.quantifiermarker.start === b.charAt(d) || a.quantifiermarker.end === b.charAt(d) || a.groupmarker.start === b.charAt(d) || a.groupmarker.end === b.charAt(d) || a.alternatormarker === b.charAt(d) ? "\\" + b.charAt(d) : b.charAt(d); return c } if (0 !== a.repeat && isNaN(a.integerDigits) && (a.integerDigits = a.repeat), a.repeat = 0, a.groupSeparator === a.radixPoint && ("." === a.radixPoint ? a.groupSeparator = "," : "," === a.radixPoint ? a.groupSeparator = "." : a.groupSeparator = ""), " " === a.groupSeparator && (a.skipOptionalPartCharacter = void 0), a.autoGroup = a.autoGroup && "" !== a.groupSeparator, a.autoGroup && ("string" == typeof a.groupSize && isFinite(a.groupSize) && (a.groupSize = parseInt(a.groupSize)), isFinite(a.integerDigits))) { var d = Math.floor(a.integerDigits / a.groupSize), e = a.integerDigits % a.groupSize; a.integerDigits = parseInt(a.integerDigits) + (0 === e ? d - 1 : d), a.integerDigits < 1 && (a.integerDigits = "*") } a.placeholder.length > 1 && (a.placeholder = a.placeholder.charAt(0)), "radixFocus" === a.positionCaretOnClick && "" === a.placeholder && a.integerOptional === !1 && (a.positionCaretOnClick = "lvp"), a.definitions[";"] = a.definitions["~"], a.definitions[";"].definitionSymbol = "~", a.numericInput === !0 && (a.positionCaretOnClick = "radixFocus" === a.positionCaretOnClick ? "lvp" : a.positionCaretOnClick, a.digitsOptional = !1, isNaN(a.digits) && (a.digits = 2), a.decimalProtect = !1); var f = "[+]"; if (f += c(a.prefix), f += a.integerOptional === !0 ? "~{1," + a.integerDigits + "}" : "~{" + a.integerDigits + "}", void 0 !== a.digits) { a.radixPointDefinitionSymbol = a.decimalProtect ? ":" : a.radixPoint; var g = a.digits.toString().split(","); isFinite(g[0] && g[1] && isFinite(g[1])) ? f += a.radixPointDefinitionSymbol + ";{" + a.digits + "}" : (isNaN(a.digits) || parseInt(a.digits) > 0) && (f += a.digitsOptional ? "[" + a.radixPointDefinitionSymbol + ";{1," + a.digits + "}]" : a.radixPointDefinitionSymbol + ";{" + a.digits + "}") } return f += c(a.suffix), f += "[-]", a.greedy = !1, null !== a.min && (a.min = a.min.toString().replace(new RegExp(b.escapeRegex(a.groupSeparator), "g"), ""), "," === a.radixPoint && (a.min = a.min.replace(a.radixPoint, "."))), null !== a.max && (a.max = a.max.toString().replace(new RegExp(b.escapeRegex(a.groupSeparator), "g"), ""), "," === a.radixPoint && (a.max = a.max.replace(a.radixPoint, "."))), f }, placeholder: "", greedy: !1, digits: "*", digitsOptional: !0, radixPoint: ".", positionCaretOnClick: "radixFocus", groupSize: 3, groupSeparator: "", autoGroup: !1, allowPlus: !0, allowMinus: !0, negationSymbol: { front: "-", back: "" }, integerDigits: "+", integerOptional: !0, prefix: "", suffix: "", rightAlign: !0, decimalProtect: !0, min: null, max: null, step: 1, insertMode: !0, autoUnmask: !1, unmaskAsNumber: !1, inputmode: "numeric", postFormat: function (c, d, e) {
                e.numericInput === !0 && (c = c.reverse(), isFinite(d) && (d = c.join("").length - d - 1)); var f, g; d = d >= c.length ? c.length - 1 : d < 0 ? 0 : d; var h = c[d], i = c.slice(); h === e.groupSeparator && d > e.prefix.length && d < c.length - e.suffix.length && (i.splice(d--, 1), h = i[d]); var j = i.join("").match(new RegExp("^" + b.escapeRegex(e.negationSymbol.front))); j = null !== j && 1 === j.length, d > (j ? e.negationSymbol.front.length : 0) + e.prefix.length && d < i.length - e.suffix.length && (i[d] = "!"); var k = i.join(""), l = i.join(); if (j && (k = k.replace(new RegExp("^" + b.escapeRegex(e.negationSymbol.front)), ""), k = k.replace(new RegExp(b.escapeRegex(e.negationSymbol.back) + "$"), "")), k = k.replace(new RegExp(b.escapeRegex(e.suffix) + "$"), ""), k = k.replace(new RegExp("^" + b.escapeRegex(e.prefix)), ""), k.length > 0 && e.autoGroup || k.indexOf(e.groupSeparator) !== -1) {
                    var m = b.escapeRegex(e.groupSeparator); k = k.replace(new RegExp(m, "g"), ""); var n = k.split(h === e.radixPoint ? "!" : e.radixPoint); if (k = "" === e.radixPoint ? k : n[0], h !== e.negationSymbol.front && (k = k.replace("!", "?")), k.length > e.groupSize) for (var o = new RegExp("([-+]?[\\d?]+)([\\d?]{" + e.groupSize + "})"); o.test(k) && "" !== e.groupSeparator;)k = k.replace(o, "$1" + e.groupSeparator + "$2"), k = k.replace(e.groupSeparator + e.groupSeparator, e.groupSeparator); k = k.replace("?", "!"), "" !== e.radixPoint && n.length > 1 && (k += (h === e.radixPoint ? "!" : e.radixPoint) + n[1])
                } k = e.prefix + k + e.suffix, j && (k = e.negationSymbol.front + k + e.negationSymbol.back); var p = l !== k.split("").join(), q = a.inArray("!", k); if (q === -1 && (q = d), p) { for (c.length = k.length, f = 0, g = k.length; f < g; f++)c[f] = k.charAt(f); c[q] = h } return q = e.numericInput && isFinite(d) ? c.join("").length - q - 1 : q, e.numericInput && (c = c.reverse(), a.inArray(e.radixPoint, c) < q && c.join("").length - e.suffix.length !== q && (q -= 1)), { pos: q, refreshFromBuffer: p, buffer: c, isNegative: j }
            }, onBeforeWrite: function (c, d, e, f) { var g; if (c && ("blur" === c.type || "checkval" === c.type || "keydown" === c.type)) { var h = f.numericInput ? d.slice().reverse().join("") : d.join(""), i = h.replace(f.prefix, ""); i = i.replace(f.suffix, ""), i = i.replace(new RegExp(b.escapeRegex(f.groupSeparator), "g"), ""), "," === f.radixPoint && (i = i.replace(f.radixPoint, ".")); var j = i.match(new RegExp("[-" + b.escapeRegex(f.negationSymbol.front) + "]", "g")); if (j = null !== j && 1 === j.length, i = i.replace(new RegExp("[-" + b.escapeRegex(f.negationSymbol.front) + "]", "g"), ""), i = i.replace(new RegExp(b.escapeRegex(f.negationSymbol.back) + "$"), ""), isNaN(f.placeholder) && (i = i.replace(new RegExp(b.escapeRegex(f.placeholder), "g"), "")), i = i === f.negationSymbol.front ? i + "0" : i, "" !== i && isFinite(i)) { var k = parseFloat(i), l = j ? k * -1 : k; if ("blur" === c.type && (null !== f.min && isFinite(f.min) && l < parseFloat(f.min) ? (k = Math.abs(f.min), j = f.min < 0, h = void 0) : null !== f.max && isFinite(f.max) && l > parseFloat(f.max) && (k = Math.abs(f.max), j = f.max < 0, h = void 0)), i = k.toString().replace(".", f.radixPoint).split(""), isFinite(f.digits)) { var m = a.inArray(f.radixPoint, i), n = a.inArray(f.radixPoint, h); m === -1 && (i.push(f.radixPoint), m = i.length - 1); for (var o = 1; o <= f.digits; o++)f.digitsOptional || void 0 !== i[m + o] && i[m + o] !== f.placeholder.charAt(0) ? n !== -1 && void 0 !== h[n + o] && (i[m + o] = i[m + o] || h[n + o]) : i[m + o] = "0"; i[i.length - 1] === f.radixPoint && delete i[i.length - 1] } if (k.toString() !== i && k.toString() + "." !== i || j) return i = (f.prefix + i.join("")).split(""), !j || 0 === k && "blur" === c.type || (i.unshift(f.negationSymbol.front), i.push(f.negationSymbol.back)), f.numericInput && (i = i.reverse()), g = f.postFormat(i, f.numericInput ? e : e - 1, f), g.buffer && (g.refreshFromBuffer = g.buffer.join("") !== d.join("")), g } } if (f.autoGroup) return g = f.postFormat(d, f.numericInput ? e : e - 1, f), g.caret = e < (g.isNegative ? f.negationSymbol.front.length : 0) + f.prefix.length || e > g.buffer.length - (g.isNegative ? f.negationSymbol.back.length : 0) ? g.pos : g.pos + 1, g }, regex: { integerPart: function (a) { return new RegExp("[" + b.escapeRegex(a.negationSymbol.front) + "+]?\\d+") }, integerNPart: function (a) { return new RegExp("[\\d" + b.escapeRegex(a.groupSeparator) + b.escapeRegex(a.placeholder.charAt(0)) + "]+") } }, signHandler: function (a, b, c, d, e) { if (!d && e.allowMinus && "-" === a || e.allowPlus && "+" === a) { var f = b.buffer.join("").match(e.regex.integerPart(e)); if (f && f[0].length > 0) return b.buffer[f.index] === ("-" === a ? "+" : e.negationSymbol.front) ? "-" === a ? "" !== e.negationSymbol.back ? { pos: 0, c: e.negationSymbol.front, remove: 0, caret: c, insert: { pos: b.buffer.length - 1, c: e.negationSymbol.back } } : { pos: 0, c: e.negationSymbol.front, remove: 0, caret: c } : "" !== e.negationSymbol.back ? { pos: 0, c: "+", remove: [0, b.buffer.length - 1], caret: c } : { pos: 0, c: "+", remove: 0, caret: c } : b.buffer[0] === ("-" === a ? e.negationSymbol.front : "+") ? "-" === a && "" !== e.negationSymbol.back ? { remove: [0, b.buffer.length - 1], caret: c - 1 } : { remove: 0, caret: c - 1 } : "-" === a ? "" !== e.negationSymbol.back ? { pos: 0, c: e.negationSymbol.front, caret: c + 1, insert: { pos: b.buffer.length, c: e.negationSymbol.back } } : { pos: 0, c: e.negationSymbol.front, caret: c + 1 } : { pos: 0, c: a, caret: c + 1 } } return !1 }, radixHandler: function (b, c, d, e, f) { if (!e && f.numericInput !== !0 && b === f.radixPoint && void 0 !== f.digits && (isNaN(f.digits) || parseInt(f.digits) > 0)) { var g = a.inArray(f.radixPoint, c.buffer), h = c.buffer.join("").match(f.regex.integerPart(f)); if (g !== -1 && c.validPositions[g]) return c.validPositions[g - 1] ? { caret: g + 1 } : { pos: h.index, c: h[0], caret: g + 1 }; if (!h || "0" === h[0] && h.index + 1 !== d) return c.buffer[h ? h.index : d] = "0", { pos: (h ? h.index : d) + 1, c: f.radixPoint } } return !1 }, leadingZeroHandler: function (b, c, d, e, f, g) { if (!e) { var h = d, i = f.numericInput === !0 ? c.buffer.slice("").reverse() : c.buffer.slice(""); f.numericInput && (d = i.join("").length - d - 1), i.splice(0, f.prefix.length), i.splice(i.length - f.suffix.length, f.suffix.length), d -= f.prefix.length; var j = a.inArray(f.radixPoint, i), k = i.slice(0, j !== -1 ? j : void 0).join("").match(f.regex.integerNPart(f)); if (k && (j === -1 || d <= j || f.numericInput)) { var l = j === -1 ? 0 : parseInt(i.slice(j + 1).join("")), m = 0 === k[0].indexOf("" !== f.placeholder ? f.placeholder.charAt(0) : "0"); if (f.numericInput) { if (m && 0 !== l && g !== !0) return c.buffer.splice(i.length - k.index - 1 + f.suffix.length, 1), { pos: h, remove: i.length - k.index - 1 + f.suffix.length } } else { if (m && (k.index + 1 === d || g !== !0 && 0 === l)) return c.buffer.splice(k.index + f.prefix.length, 1), { pos: k.index + f.prefix.length, remove: k.index + f.prefix.length }; if ("0" === b && d <= k.index && k[0] !== f.groupSeparator) return !1 } } } return !0 }, definitions: { "~": { validator: function (c, d, e, f, g, h) { var i = g.signHandler(c, d, e, f, g); if (!i && (i = g.radixHandler(c, d, e, f, g), !i && (i = f ? new RegExp("[0-9" + b.escapeRegex(g.groupSeparator) + "]").test(c) : new RegExp("[0-9]").test(c), i === !0 && (i = g.leadingZeroHandler(c, d, e, f, g, h), i === !0 && g.numericInput !== !0)))) { var j = a.inArray(g.radixPoint, d.buffer); i = j !== -1 && (g.digitsOptional === !1 || d.validPositions[e]) && g.numericInput !== !0 && e > j && !f ? { pos: e, remove: e } : { pos: e } } return i }, cardinality: 1 }, "+": { validator: function (a, b, c, d, e) { var f = e.signHandler(a, b, c, d, e); return !f && (d && e.allowMinus && a === e.negationSymbol.front || e.allowMinus && "-" === a || e.allowPlus && "+" === a) && (f = !(!d && "-" === a) || ("" !== e.negationSymbol.back ? { pos: c, c: "-" === a ? e.negationSymbol.front : "+", caret: c + 1, insert: { pos: b.buffer.length, c: e.negationSymbol.back } } : { pos: c, c: "-" === a ? e.negationSymbol.front : "+", caret: c + 1 })), f }, cardinality: 1, placeholder: "" }, "-": { validator: function (a, b, c, d, e) { var f = e.signHandler(a, b, c, d, e); return !f && d && e.allowMinus && a === e.negationSymbol.back && (f = !0), f }, cardinality: 1, placeholder: "" }, ":": { validator: function (a, c, d, e, f) { var g = f.signHandler(a, c, d, e, f); if (!g) { var h = "[" + b.escapeRegex(f.radixPoint) + "]"; g = new RegExp(h).test(a), g && c.validPositions[d] && c.validPositions[d].match.placeholder === f.radixPoint && (g = { caret: d + 1 }) } return g }, cardinality: 1, placeholder: function (a) { return a.radixPoint } } }, onUnMask: function (a, c, d) { if ("" === c && d.nullable === !0) return c; var e = a.replace(d.prefix, ""); return e = e.replace(d.suffix, ""), e = e.replace(new RegExp(b.escapeRegex(d.groupSeparator), "g"), ""), d.unmaskAsNumber ? ("" !== d.radixPoint && e.indexOf(d.radixPoint) !== -1 && (e = e.replace(b.escapeRegex.call(this, d.radixPoint), ".")), Number(e)) : e }, isComplete: function (a, c) { var d = a.join(""), e = a.slice(); if (c.postFormat(e, 0, c), e.join("") !== d) return !1; var f = d.replace(c.prefix, ""); return f = f.replace(c.suffix, ""), f = f.replace(new RegExp(b.escapeRegex(c.groupSeparator), "g"), ""), "," === c.radixPoint && (f = f.replace(b.escapeRegex(c.radixPoint), ".")), isFinite(f) }, onBeforeMask: function (a, c) { if (a = a.toString(), c.numericInput === !0 && (a = a.split("").reverse().join("")), "" !== c.radixPoint && isFinite(a)) { var d = a.split("."), e = "" !== c.groupSeparator ? parseInt(c.groupSize) : 0; 2 === d.length && (d[0].length > e || d[1].length > e) && (a = a.replace(".", c.radixPoint)) } var f = a.match(/,/g), g = a.match(/\./g); if (g && f ? g.length > f.length ? (a = a.replace(/\./g, ""), a = a.replace(",", c.radixPoint)) : f.length > g.length ? (a = a.replace(/,/g, ""), a = a.replace(".", c.radixPoint)) : a = a.indexOf(".") < a.indexOf(",") ? a.replace(/\./g, "") : a = a.replace(/,/g, "") : a = a.replace(new RegExp(b.escapeRegex(c.groupSeparator), "g"), ""), 0 === c.digits && (a.indexOf(".") !== -1 ? a = a.substring(0, a.indexOf(".")) : a.indexOf(",") !== -1 && (a = a.substring(0, a.indexOf(",")))), "" !== c.radixPoint && isFinite(c.digits) && a.indexOf(c.radixPoint) !== -1) { var h = a.split(c.radixPoint), i = h[1].match(new RegExp("\\d*"))[0]; if (parseInt(c.digits) < i.toString().length) { var j = Math.pow(10, parseInt(c.digits)); a = a.replace(b.escapeRegex(c.radixPoint), "."), a = Math.round(parseFloat(a) * j) / j, a = a.toString().replace(".", c.radixPoint) } } return c.numericInput === !0 && (a = a.split("").reverse().join("")), a }, canClearPosition: function (a, b, c, d, e) { var f = a.validPositions[b].input, g = f !== e.radixPoint || null !== a.validPositions[b].match.fn && e.decimalProtect === !1 || isFinite(f) || b === c || f === e.groupSeparator || f === e.negationSymbol.front || f === e.negationSymbol.back; return g }, onKeyDown: function (c, d, e, f) { var g = a(this); if (c.ctrlKey) switch (c.keyCode) { case b.keyCode.UP: g.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(f.step)), g.trigger("setvalue"); break; case b.keyCode.DOWN: g.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(f.step)), g.trigger("setvalue") } }
        }, currency: { prefix: "$ ", groupSeparator: ",", alias: "numeric", placeholder: "0", autoGroup: !0, digits: 2, digitsOptional: !1, clearMaskOnLostFocus: !1 }, decimal: { alias: "numeric" }, integer: { alias: "numeric", digits: 0, radixPoint: "" }, percentage: { alias: "numeric", digits: 2, radixPoint: ".", placeholder: "0", autoGroup: !1, min: 0, max: 100, suffix: " %", allowPlus: !1, allowMinus: !1 }
    }), b
}(jQuery, Inputmask), function (a, b) { function c(a, b) { var c = (a.mask || a).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""), d = (b.mask || b).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""), e = (a.mask || a).split("#")[0], f = (b.mask || b).split("#")[0]; return 0 === f.indexOf(e) ? -1 : 0 === e.indexOf(f) ? 1 : c.localeCompare(d) } var d = b.prototype.analyseMask; return b.prototype.analyseMask = function (b, c) { function e(a, c, d) { c = c || "", d = d || g, "" !== c && (d[c] = {}); for (var f = "", h = d[c] || d, i = a.length - 1; i >= 0; i--)b = a[i].mask || a[i], f = b.substr(0, 1), h[f] = h[f] || [], h[f].unshift(b.substr(1)), a.splice(i, 1); for (var j in h) h[j].length > 500 && e(h[j].slice(), j, h) } function f(b) { var d = "", e = []; for (var g in b) a.isArray(b[g]) ? 1 === b[g].length ? e.push(g + b[g]) : e.push(g + c.groupmarker.start + b[g].join(c.groupmarker.end + c.alternatormarker + c.groupmarker.start) + c.groupmarker.end) : e.push(g + f(b[g])); return d += 1 === e.length ? e[0] : c.groupmarker.start + e.join(c.groupmarker.end + c.alternatormarker + c.groupmarker.start) + c.groupmarker.end } var g = {}; c.phoneCodes && (c.phoneCodes && c.phoneCodes.length > 1e3 && (b = b.substr(1, b.length - 2), e(b.split(c.groupmarker.end + c.alternatormarker + c.groupmarker.start)), b = f(g)), b = b.replace(/9/g, "\\9")); var h = d.call(this, b, c); return h }, b.extendAliases({ abstractphone: { groupmarker: { start: "<", end: ">" }, countrycode: "", phoneCodes: [], mask: function (a) { return a.definitions = { "#": b.prototype.definitions[9] }, a.phoneCodes.sort(c) }, keepStatic: !0, onBeforeMask: function (a, b) { var c = a.replace(/^0{1,2}/, "").replace(/[\s]/g, ""); return (c.indexOf(b.countrycode) > 1 || c.indexOf(b.countrycode) === -1) && (c = "+" + b.countrycode + c), c }, onUnMask: function (a, b, c) { return b }, inputmode: "tel" } }), b }(jQuery, Inputmask), function (a, b) { return b.extendAliases({ Regex: { mask: "r", greedy: !1, repeat: "*", regex: null, regexTokens: null, tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, quantifierFilter: /[0-9]+[^,]/, isComplete: function (a, b) { return new RegExp(b.regex).test(a.join("")) }, definitions: { r: { validator: function (b, c, d, e, f) { function g(a, b) { this.matches = [], this.isGroup = a || !1, this.isQuantifier = b || !1, this.quantifier = { min: 1, max: 1 }, this.repeaterPart = void 0 } function h() { var a, b, c = new g, d = []; for (f.regexTokens = []; a = f.tokenizer.exec(f.regex);)switch (b = a[0], b.charAt(0)) { case "(": d.push(new g((!0))); break; case ")": k = d.pop(), d.length > 0 ? d[d.length - 1].matches.push(k) : c.matches.push(k); break; case "{": case "+": case "*": var e = new g((!1), (!0)); b = b.replace(/[{}]/g, ""); var h = b.split(","), i = isNaN(h[0]) ? h[0] : parseInt(h[0]), j = 1 === h.length ? i : isNaN(h[1]) ? h[1] : parseInt(h[1]); if (e.quantifier = { min: i, max: j }, d.length > 0) { var l = d[d.length - 1].matches; a = l.pop(), a.isGroup || (k = new g((!0)), k.matches.push(a), a = k), l.push(a), l.push(e) } else a = c.matches.pop(), a.isGroup || (k = new g((!0)), k.matches.push(a), a = k), c.matches.push(a), c.matches.push(e); break; default: d.length > 0 ? d[d.length - 1].matches.push(b) : c.matches.push(b) }c.matches.length > 0 && f.regexTokens.push(c) } function i(b, c) { var d = !1; c && (m += "(", o++); for (var e = 0; e < b.matches.length; e++) { var f = b.matches[e]; if (f.isGroup === !0) d = i(f, !0); else if (f.isQuantifier === !0) { var g = a.inArray(f, b.matches), h = b.matches[g - 1], k = m; if (isNaN(f.quantifier.max)) { for (; f.repeaterPart && f.repeaterPart !== m && f.repeaterPart.length > m.length && !(d = i(h, !0));); d = d || i(h, !0), d && (f.repeaterPart = m), m = k + f.quantifier.max } else { for (var l = 0, n = f.quantifier.max - 1; l < n && !(d = i(h, !0)); l++); m = k + "{" + f.quantifier.min + "," + f.quantifier.max + "}" } } else if (void 0 !== f.matches) for (var p = 0; p < f.length && !(d = i(f[p], c)); p++); else { var q; if ("[" == f.charAt(0)) { q = m, q += f; for (var r = 0; r < o; r++)q += ")"; var s = new RegExp("^(" + q + ")$"); d = s.test(j) } else for (var t = 0, u = f.length; t < u; t++)if ("\\" !== f.charAt(t)) { q = m, q += f.substr(0, t + 1), q = q.replace(/\|$/, ""); for (var r = 0; r < o; r++)q += ")"; var s = new RegExp("^(" + q + ")$"); if (d = s.test(j)) break } m += f } if (d) break } return c && (m += ")", o--), d } var j, k, l = c.buffer.slice(), m = "", n = !1, o = 0; null === f.regexTokens && h(), l.splice(d, 0, b), j = l.join(""); for (var p = 0; p < f.regexTokens.length; p++) { var q = f.regexTokens[p]; if (n = i(q, q.isGroup)) break } return n }, cardinality: 1 } } } }), b }(jQuery, Inputmask);

/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-flexbox-flexboxlegacy-flexboxtweener-flexwrap-setclasses !*/
!function (e, n, t) { function r(e, n) { return typeof e === n } function o() { var e, n, t, o, s, i, l; for (var a in C) if (C.hasOwnProperty(a)) { if (e = [], n = C[a], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++)e.push(n.options.aliases[t].toLowerCase()); for (o = r(n.fn, "function") ? n.fn() : n.fn, s = 0; s < e.length; s++)i = e[s], l = i.split("."), 1 === l.length ? Modernizr[l[0]] = o : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = o), x.push((o ? "" : "no-") + l.join("-")) } } function s(e) { var n = S.className, t = Modernizr._config.classPrefix || ""; if (_ && (n = n.baseVal), Modernizr._config.enableJSClass) { var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)"); n = n.replace(r, "$1" + t + "js$2") } Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), _ ? S.className.baseVal = n : S.className = n) } function i(e, n) { return !!~("" + e).indexOf(n) } function l() { return "function" != typeof n.createElement ? n.createElement(arguments[0]) : _ ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments) } function a(e) { return e.replace(/([a-z])-([a-z])/g, function (e, n, t) { return n + t.toUpperCase() }).replace(/^-/, "") } function f(e, n) { return function () { return e.apply(n, arguments) } } function u(e, n, t) { var o; for (var s in e) if (e[s] in n) return t === !1 ? e[s] : (o = n[e[s]], r(o, "function") ? f(o, t || n) : o); return !1 } function d(e) { return e.replace(/([A-Z])/g, function (e, n) { return "-" + n.toLowerCase() }).replace(/^ms-/, "-ms-") } function c(n, t, r) { var o; if ("getComputedStyle" in e) { o = getComputedStyle.call(e, n, t); var s = e.console; if (null !== o) r && (o = o.getPropertyValue(r)); else if (s) { var i = s.error ? "error" : "log"; s[i].call(s, "getComputedStyle returning null, its possible modernizr test results are inaccurate") } } else o = !t && n.currentStyle && n.currentStyle[r]; return o } function p() { var e = n.body; return e || (e = l(_ ? "svg" : "body"), e.fake = !0), e } function m(e, t, r, o) { var s, i, a, f, u = "modernizr", d = l("div"), c = p(); if (parseInt(r, 10)) for (; r--;)a = l("div"), a.id = o ? o[r] : u + (r + 1), d.appendChild(a); return s = l("style"), s.type = "text/css", s.id = "s" + u, (c.fake ? c : d).appendChild(s), c.appendChild(d), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(n.createTextNode(e)), d.id = u, c.fake && (c.style.background = "", c.style.overflow = "hidden", f = S.style.overflow, S.style.overflow = "hidden", S.appendChild(c)), i = t(d, e), c.fake ? (c.parentNode.removeChild(c), S.style.overflow = f, S.offsetHeight) : d.parentNode.removeChild(d), !!i } function y(n, r) { var o = n.length; if ("CSS" in e && "supports" in e.CSS) { for (; o--;)if (e.CSS.supports(d(n[o]), r)) return !0; return !1 } if ("CSSSupportsRule" in e) { for (var s = []; o--;)s.push("(" + d(n[o]) + ":" + r + ")"); return s = s.join(" or "), m("@supports (" + s + ") { #modernizr { position: absolute; } }", function (e) { return "absolute" == c(e, null, "position") }) } return t } function g(e, n, o, s) { function f() { d && (delete E.style, delete E.modElem) } if (s = r(s, "undefined") ? !1 : s, !r(o, "undefined")) { var u = y(e, o); if (!r(u, "undefined")) return u } for (var d, c, p, m, g, v = ["modernizr", "tspan", "samp"]; !E.style && v.length;)d = !0, E.modElem = l(v.shift()), E.style = E.modElem.style; for (p = e.length, c = 0; p > c; c++)if (m = e[c], g = E.style[m], i(m, "-") && (m = a(m)), E.style[m] !== t) { if (s || r(o, "undefined")) return f(), "pfx" == n ? m : !0; try { E.style[m] = o } catch (h) { } if (E.style[m] != g) return f(), "pfx" == n ? m : !0 } return f(), !1 } function v(e, n, t, o, s) { var i = e.charAt(0).toUpperCase() + e.slice(1), l = (e + " " + P.join(i + " ") + i).split(" "); return r(n, "string") || r(n, "undefined") ? g(l, n, o, s) : (l = (e + " " + T.join(i + " ") + i).split(" "), u(l, n, t)) } function h(e, n, r) { return v(e, t, t, n, r) } var x = [], C = [], w = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, n) { var t = this; setTimeout(function () { n(t[e]) }, 0) }, addTest: function (e, n, t) { C.push({ name: e, fn: n, options: t }) }, addAsyncTest: function (e) { C.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = w, Modernizr = new Modernizr; var S = n.documentElement, _ = "svg" === S.nodeName.toLowerCase(), b = "Moz O ms Webkit", P = w._config.usePrefixes ? b.split(" ") : []; w._cssomPrefixes = P; var T = w._config.usePrefixes ? b.toLowerCase().split(" ") : []; w._domPrefixes = T; var z = { elem: l("modernizr") }; Modernizr._q.push(function () { delete z.elem }); var E = { style: z.elem.style }; Modernizr._q.unshift(function () { delete E.style }), w.testAllProps = v, w.testAllProps = h, Modernizr.addTest("flexbox", h("flexBasis", "1px", !0)), Modernizr.addTest("flexboxlegacy", h("boxDirection", "reverse", !0)), Modernizr.addTest("flexboxtweener", h("flexAlign", "end", !0)), Modernizr.addTest("flexwrap", h("flexWrap", "wrap", !0)), o(), s(x), delete w.addTest, delete w.addAsyncTest; for (var N = 0; N < Modernizr._q.length; N++)Modernizr._q[N](); e.Modernizr = Modernizr }(window, document);
