var BSI = BSI || {};


(function ($) {
    'use strict';
    $.fn.setCookieCookie = function () {
        $(document.body).trigger('setCookieCookie', [this]);
        return this.each(function () { });
    };
    $.fn.setCookieExternal = function (cookieName, redirectUrl, expireDays, rememberCheckboxId) {
        var $rememberCheckbox = $('#' + rememberCheckboxId);
        $.cookie(cookieName, redirectUrl, {
            expires: expireDays,
            path: '/'
        });
        var http = location.protocol;
        var slashes = http.concat("//");
        var host = slashes.concat(window.location.hostname);

        redirectUrl = redirectUrl.replace(/\/$/, '');
        var url = redirectUrl;
        url = url.split("/");
        switch (url[3]) {
            case "en-IE":
                host = host + '/en-IE';
                if (redirectUrl.toLowerCase() == host.toLowerCase()) {
                    if (!$.cookie('IrelandHome')) {
                        $.cookie(cookieName = "IrelandHome", redirectUrl, {
                            expires: expireDays,
                            path: '/'
                        });
                    }
                }
                BSI.RemoveCookiesExcept('IrelandHome');
                break;

            case "de-CH":
                host = host + '/de-CH';
                if (redirectUrl.toLowerCase() == host.toLowerCase()) {
                    if (!$.cookie('SchweizHome'))
                        $.cookie(cookieName = "SchweizHome", redirectUrl, {
                            expires: expireDays,
                            path: '/'
                        });
                }
                BSI.RemoveCookiesExcept('SchweizHome');
                break;

            case "de-AT":
                host = host + '/de-AT';
                if (redirectUrl.toLowerCase() == host.toLowerCase()) {
                    if (!$.cookie('OsterreichHome'))
                        $.cookie(cookieName = "OsterreichHome", redirectUrl, {
                            expires: expireDays,
                            path: '/'
                        });
                }
                BSI.RemoveCookiesExcept('OsterreichHome');
                break;

            case "nl-BE":
                host = host + '/nl-BE';
                if (redirectUrl.toLowerCase() == host.toLowerCase()) {
                    if (!$.cookie('BelgieHome'))
                        $.cookie(cookieName = "BelgieHome", redirectUrl, {
                            expires: expireDays,
                            path: '/'
                        });
                }
                BSI.RemoveCookiesExcept('BelgieHome');
                break;

            case "en-NZ":
                host = host + '/en-NZ';
                if (redirectUrl.toLowerCase() == host.toLowerCase()) {
                    if (!$.cookie('NewZealandHome'))
                        $.cookie(cookieName = "NewZealandHome", redirectUrl, {
                            expires: expireDays,
                            path: '/'
                        });
                }
                BSI.RemoveCookiesExcept('NewZealandHome');
                break;
            default:
                BSI.RemoveCookiesExcept('');
                break;
        }
        return false;
    };


    $('#country-selector').on('countryselected', function (e) {
        window.location = e.target;

    });

    $('.xform-submit').click(function (e) {
        var isPresent = false;
        var isPresentmail = false;
        var isPresentNumber = false;
        var isSelected = true;
        for (var i = 0; i < this.form.elements.length; i++) {

            if (this.form.elements[i].tagName == "INPUT" || this.form.elements[i].tagName == "SELECT") {

                if (this.form.elements[i].required == true && this.form.elements[i].value == "") {

                    isPresent = false;
                    for (var j = 0; j < this.form.elements[i].parentElement.childNodes.length; j++) {
                        if (this.form.elements[i].parentElement.childNodes[j].className == "xformvalidator") {
                            isPresent = true;
                            e.preventDefault();
                            break;
                        }
                    }
                    if (!isPresent) {
                        var node = document.createElement('span');
                        node.setAttribute('class', 'xformvalidator')
                        node.setAttribute('style', 'color: red; display: inline;')
                        node.textContent = $('#MessageForRequiredfield').val()
                        this.form.elements[i].parentElement.appendChild(node);
                    }
                }
                if (this.form.elements[i].getAttribute("requiredemail") == "true" && this.form.elements[i].value != "") {
                    for (var j = 0; j < this.form.elements[i].parentElement.childNodes.length; j++) {
                        if (this.form.elements[i].parentElement.childNodes[j].className == "xformvalidatormail") {
                            isPresentmail = true;
                            break;
                        }
                    }
                    if (!isPresentmail) {
                        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        if (!regex.test(this.form.elements[i].value)) {
                            var node = document.createElement('span');
                            node.setAttribute('class', 'xformvalidatormail')
                            node.setAttribute('style', 'color: red; display: inline;')
                            node.textContent = $('#MessageForEmailFormat').val()
                            this.form.elements[i].parentElement.appendChild(node);
                            e.preventDefault();
                        }
                    }
                    if (isPresentmail) {
                        var elem = this.parentElement.getElementsByClassName('xformvalidatormail');
                        if (elem.length > 0)
                            elem[0].parentNode.removeChild(elem[0]);
                    }
                }
                if (this.form.elements[i].getAttribute("requiredinteger") == "true" && this.form.elements[i].value != "") {
                    for (var j = 0; j < this.form.elements[i].parentElement.childNodes.length; j++) {
                        if (this.form.elements[i].parentElement.childNodes[j].className == "xformvalidatorinteger") {
                            isPresentNumber = true;
                            break;
                        }
                    }
                    if (!isPresentNumber && isNaN(this.form.elements[i].value)) {
                        var node = document.createElement('span');
                        node.setAttribute('class', 'xformvalidatorinteger')
                        node.setAttribute('style', 'color: red; display: inline;')
                        node.textContent = $('#MessageForInteger').val()
                        this.form.elements[i].parentElement.appendChild(node);
                        e.preventDefault();
                    }
                    if (isPresentNumber && !isNaN(this.form.elements[i].value)) {
                        var elem = this.parentElement.getElementsByClassName('xformvalidatorinteger');
                        if (elem.length > 0)
                            elem[0].parentNode.removeChild(elem[0]);
                    }
                }

                if (this.form.elements[i].getAttribute("requiredcheck") == "true" && this.form.elements[i].type == "checkbox") {
                    if ($("input[type='checkbox']").is(":checked") == false) {
                        for (var j = 0; j < this.form.elements[i].parentElement.childNodes.length; j++) {
                            if (this.form.elements[i].parentElement.childNodes[j].className == "xformvalidator") {
                                isPresent = true;
                                break;
                            }
                        }
                        if (!isPresent) {
                            var node = document.createElement('span');
                            node.setAttribute('class', 'xformvalidator')
                            node.setAttribute('style', 'color: red; display: inline;')
                            node.textContent = $('#MessageForRequiredfield').val()
                            this.form.elements[i].parentElement.appendChild(node);
                            e.preventDefault();
                            break;
                        }
                        if (isPresent) {
                            var elem = this.parentElement.getElementsByClassName('xformvalidator');
                            if (elem.length > 0)
                                elem[0].parentNode.removeChild(elem[0]);
                        }
                    }
                }
            }
            if (this.form.name.toLowerCase != undefined) {
                if (this.form.name.toLowerCase() == "ceo stress test") {
                    if (isSelected && this.form.elements[i].tagName == "SELECT" && this.form.elements[i].value == "-1") {
                        e.preventDefault();
                        $('#validationMessage').css('display', 'block');
                    }
                }
            }
        }
    });

    $('.form-item input').focusout(function (e) {

        var isPresent = false;
        var isPresentmail = false;
        var isPresentNumber = false;
        if (this.required == true && this.value == "") {

            for (var j = 0; j < this.parentElement.childNodes.length; j++) {
                if (this.parentElement.childNodes[j].className == "xformvalidator") {
                    isPresent = true;
                    break;
                }
            }
            if (!isPresent) {
                var node = document.createElement('span');
                node.setAttribute('class', 'xformvalidator')
                node.setAttribute('style', 'color: red; display: inline;')
                node.textContent = $('#MessageForRequiredfield').val()
                this.parentElement.appendChild(node);
                var elem = this.parentElement.getElementsByClassName('xformvalidatormail');
                if (elem.length > 0)
                    elem[0].parentNode.removeChild(elem[0]);
            }
        }
        if (this.getAttribute("requiredemail") == "true" && this.value != "") {

            for (var j = 0; j < this.parentElement.childNodes.length; j++) {
                if (this.parentElement.childNodes[j].className == "xformvalidatormail") {
                    isPresentmail = true;
                    break;
                }
            }
            if (!isPresentmail) {
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!regex.test(this.value)) {
                    var node = document.createElement('span');
                    node.setAttribute('class', 'xformvalidatormail')
                    node.setAttribute('style', 'color: red; display: inline;')
                    node.textContent = $('#MessageForEmailFormat').val()
                    this.parentElement.appendChild(node);
                    var elem = this.parentElement.getElementsByClassName('xformvalidator');
                    if (elem.length > 0)
                        elem[0].parentNode.removeChild(elem[0]);
                    e.preventDefault();
                }
            }
            if (isPresentmail) {
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (regex.test(this.value)) {
                    var elem = this.parentElement.getElementsByClassName('xformvalidatormail');
                    if (elem.length > 0)
                        elem[0].parentNode.removeChild(elem[0]);
                }
            }
        }
        if (this.getAttribute("requiredinteger") == "true" && this.value != "") {

            for (var j = 0; j < this.parentElement.childNodes.length; j++) {
                if (this.parentElement.childNodes[j].className == "xformvalidatorinteger") {
                    isPresentNumber = true;
                    break;
                }
            }
            if (!isPresentNumber && isNaN(this.value)) {
                var node = document.createElement('span');
                node.setAttribute('class', 'xformvalidatorinteger')
                node.setAttribute('style', 'color: red; display: inline;')
                node.textContent = $('#MessageForInteger').val()
                this.parentElement.appendChild(node);
                var elem = this.parentElement.getElementsByClassName('xformvalidator');
                if (elem.length > 0)
                    elem[0].parentNode.removeChild(elem[0]);
                e.preventDefault();
            }
            if (isPresentNumber && !isNaN(this.value)) {
                var elem = this.parentElement.getElementsByClassName('xformvalidatorinteger');
                if (elem.length > 0)
                    elem[0].parentNode.removeChild(elem[0]);
            }
        }
        if (this.required == true && this.value != "") {
            isPresent = false;
            for (var j = 0; j < this.parentElement.childNodes.length; j++) {
                if (this.parentElement.childNodes[j].className == "xformvalidator") {
                    isPresent = true;
                    break;
                }

            }
            if (isPresent) {
                var elem = this.parentElement.getElementsByClassName('xformvalidator');
                if (elem.length > 0)
                    elem[0].parentNode.removeChild(elem[0]);
            }
        }
    });    

    $("#KitemarkLink").click(function (e) {

        /*e.preventDefault();*/
        //$('#dialog').html(" ");
        $("#dialog").dialog(
            {

                width: 900,
                autoOpen: true,
                modal: true

            });
        var postData = {
            Language: $('#Language').text()

        };
        $.ajax({

            type: "GET",
            url: "/PDSearchPage/Index",
            dataType: "html",
            data: postData,
            success: function (data) {
                $('#dialog').html(data);
                $('#dialog').dialog('open');

            }

        });
    });

    $("#invitebtn").click(function (e) {
        e.preventDefault();
        $("#invite").dialog(
            {

                width: "60%",
                height: "60%",
                autoOpen: true,
                modal: true

            });
        var postData = {
            CompanyName: $('#CompanyName').html(),
            Type: 'verified',
            Language: $('#Language').text()

        };
        $.ajax({

            type: "GET",
            url: "/Invite/Index",
            dataType: "html",
            data: postData,
            success: function (data) {

                $("#invite").html(data);
                $('#invite').dialog('open');

            }
        });
    });



    BSI.RemoveCookiesExcept = function (cookieenametoexclude) {

        if (cookieenametoexclude != 'OsterreichHome' && $.cookie('OsterreichHome')) {
            $.removeCookie('OsterreichHome', {
                path: '/'
            });
        }

        if (cookieenametoexclude != 'SchweizHome' && $.cookie('SchweizHome')) {
            $.removeCookie('SchweizHome', {
                path: '/'
            });
        }

        if (cookieenametoexclude != 'BelgieHome' && $.cookie('BelgieHome')) {
            $.removeCookie('BelgieHome', {
                path: '/'
            });
        }

        if (cookieenametoexclude != 'NewZealandHome' && $.cookie('NewZealandHome')) {
            $.removeCookie('NewZealandHome', {
                path: '/'
            });
        }

        if (cookieenametoexclude != 'IrelandHome' && $.cookie('IrelandHome')) {
            $.removeCookie('IrelandHome', {
                path: '/'
            });
        }

    };

    ///**
    // * @param {String} target
    // */


    BSI.initialiseSlideshows = function () {
        if ($('body').is('.breakpoint-901')) {
            $.root.find('.banner-controls').css('display', 'block');
        }
        if ($.root.find('.flexslider:not(.banner)').length) {
            $.root.find('.flexslider:not(.banner)').css('display', 'block').flexslider({
                animation: 'slide',
                animationLoop: false,
                slideshow: true, // auto-play
                slideshowSpeed: 3000,
                itemWidth: 220, // this will be initialised in a fixed 320 viewport
                controlNav: false,
                keyboard: true,
                after: function (slider) {
                    if (slider.currentSlide == 0 && slider[0].id !== 'scrollerbanner') {

                        slider.pause(); // stop when we get back to first slide
                    }
                }
            });
        }
        if ($.root.find('.banner.flexslider ').length) {

            $.root.find('.banner.flexslider').css('display', 'block').flexslider({
                animation: 'slide',
                animationLoop: true,
                slideshow: true, // auto-play
                slideshowSpeed: 3000,
                maxItems: 0,
                controlNav: true,
                manualControls: '.banner-controls li',
                keyboard: true,
                after: function (slider) {

                    if (slider.currentSlide == 0 && slider[0].id !== 'scrollerbanner') {

                        slider.pause(); // stop when we get back to first slide
                    }
                }
            });
            $(".banner-controls li").off("touchstart");
        }
    };

    BSI.setUpSearchFilters = function () {
        var $loadingScreen = $.root.find('#loading-screen');

        $.root.find('.search-filters-chkbox :checkbox').change(function () {
            if ($.root.is('.breakpoint-901')) {

                $.root.find('form').eq(0).submit();
            }
        });
    };
    /** * Telephone links  */
    BSI.setUpTelephoneLinks = function () {
        var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
        var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
        var isiAndroid = navigator.userAgent.toLowerCase().indexOf("android");
        if (!(isiPhone > 1 || isiPad > 1 || isiAndroid > 1)) {
            $.root.find('a[href^="tel:"]')
                .addClass('disabled-phone-link')
                .click(function (e) {
                    e.preventDefault();
                });
        }
    };

    /**
     * IOS scale fix
     * @see https://gist.github.com/901295
     */
    (function (doc) {

        var addEvent = 'addEventListener',
            type = 'gesturestart',
            qsa = 'querySelectorAll',
            scales = [1, 2],
            meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

        function fix() {
            meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
            doc.removeEventListener(type, fix, true);
        }

        if ((meta = meta[meta.length - 1]) && addEvent in doc) {
            fix();
            scales = [.25, 1.6];
            doc[addEvent](type, fix, true);
        }

    }(document));

    /**
     * Responsive tables
     * Simplified version of http://filamentgroup.com/lab/responsive_design_approach_for_complex_multicolumn_data_tables/
     */
    BSI.responsiveTables = function () {
        if ((objOffsetVersion = objAgent.indexOf("MSIE")) >= 1 && objBrMajorVersion < 7) {
            return;
        }

        $.root.find('table').each(function (index, item) {
            var $table = $(item);

            $table.addClass('enhanced');
            var $nav = $('<div class="table-menu"><ul /></div>');
            $nav.hide();
            $nav.on('change', ':checkbox', function () {
                var $this = $(this);
                var $column = $this.data('column');
                var $table = $this.data('table');

                var colIndex = $column.index();

                if ($this.is(':checked')) {
                    $table.find('thead th').eq(colIndex).css('display', 'table-cell');
                    $table.find('tbody tr').each(function (index, row) {
                        $(row).children('*').eq(colIndex).css('display', 'table-cell');
                    });
                } else {
                    $table.find('thead th').eq(colIndex).css('display', 'none');
                    $table.find('tbody tr').each(function (index, row) {
                        $(row).children('*').eq(colIndex).css('display', 'none');
                    });
                }

            });

            $table.find('thead th').each(function (index, item) {
                var $th = $(item);

                if (!$th.is('.persist')) {

                    var toggle = $('<li><label><input type="checkbox" name="toggle-cols" value="" />' + $th.text() + '</label></li>');
                    toggle
                        .find(':checkbox')
                        .data('column', $th)
                        .data('table', $table);

                    if ($th.is('.essential')) {
                        toggle
                            .find(':checkbox')
                            .attr('checked', true);
                    }

                    $nav.children('ul').append(toggle);
                }
            });

            var $button = $('<a href="#" class="bt column-menu">Columns</a>');
            $button.click(function (e) {
                e.preventDefault();
                $(this)
                    .toggleClass('active')
                    .next('.table-menu')
                    .toggle();
            })

            $table.wrap('<div class="enhanced-table-wrapper bsi-table-container"></div>');
            $table
                .before($button)
                .before($nav);


        });
    };

    BSI.trainingResults = function () {
        var $filter = $('.search-filter');
        $('.search-filter-toggle').on('click', function (e) {
            /*console.log(e.target);*/
            e.preventDefault();
            $filter.toggleClass('active');
        });
    }

    BSI.googleMapsSetup = function () {

        $('.google-map').each(function (index, item) {
            // Get the actual map div
            var $map = $(item).children('.map');
            // Create a map
            var map = new google.maps.Map(
                $map.get(0), {
                zoom: $map.data('zoom'),
                center: new google.maps.LatLng($map.data('lat'), $map.data('lng')),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: !$map.data('ui')
            }
            );
            // Check to see if we have the required info to drop a marker
            if ($map.is('[data-pin-lat][data-pin-lng][data-pin-title]')) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng($map.data('pin-lat'), $map.data('pin-lng')),
                    map: map,
                    title: $map.data('pin-title')
                });
            }
        });

    };


    BSI.setupCustomCheckboxes = function () {
        $.root.on('change', ':checkbox', function () {
            var $this = $(this);
            var $label = $this.parents('label');

            if ($this.is(':checked')) {
                $label.addClass('checked');
            } else {
                $label.removeClass('checked');
            }
        });

        $.root.on('focus', '.checkbox-replaced :checkbox', function () {
            $(this).closest('.checkbox-replaced').addClass('focus');
        });

        $.root.on('blur', '.checkbox-replaced :checkbox', function () {
            $(this).closest('.checkbox-replaced').removeClass('focus');
        });

        $.root.find('.form-block :checkbox, .filter-set :checkbox')
            .trigger('change')
            .closest('label')
            .addClass('checkbox-replaced');

    };

    /**
     * Form validation
     * @see http://docs.jquery.com/Plugins/Validation
     */
    BSI.setupFormValidation = function () {

        $('form').bind("submit", function () {

            //Remove any existing error labels
            $("label.label-error").removeClass("label-error");

            var errorMsgs = $("div.form-item span.error2");
            if (errorMsgs.length > 0) {


                for (var i = 0; i < errorMsgs.length; i++) {

                    if ($(errorMsgs[i]).css("display") != "none") {
                        $(errorMsgs[i]).parent().find(">label").addClass("label-error");
                        $(errorMsgs[i]).parent().find(">span.label-wrapper").addClass("label-error");
                    }

                }

            }

        });

        if (typeof formValidationConfig !== 'undefined') {
            $.validator.addMethod("valueNotEquals", function (value, element, arg) {
                return arg != value;
            }, "Invalid selection.");

            var defaults = {
                errorPlacement: function ($error, $element) {
                    $error.appendTo($element.closest('.form-item'));
                }
            };

            $.extend(formValidationConfig, defaults);
        }

    };

    var objOffsetVersion;
    var objbrowserName = navigator.appName;
    var objfullVersion = '' + parseFloat(navigator.appVersion);
    var objBrMajorVersion = parseInt(navigator.appVersion, 10);
    var objAgent = navigator.userAgent;
    BSI.setupSelectBoxes = function () {
        /* jQuery.browser = { 
            msie: false
        };*/
        if ((objOffsetVersion = objAgent.indexOf("MSIE")) == -1 && objBrMajorVersion < 8) {
            var $selectBoxes = $.root.find('.form-block select');

            if ($selectBoxes.length > 0) {
                $selectBoxes.selectBox();
            }
        }
    };

    BSI.responsiveImages = function (size) {

        $.root.find('.responsive-image').each(function (index, item) {

            var $item = $(item);
            var $img = $('<img src="' + $item.data(size + '-img') + '" alt="' + $item.data('alt') + '" />');

            $item
                .empty()
                .append($img);

        });

    };

    BSI.setupCountrySelector = function () {
        if (window.location.host.indexOf("supplychainsolution") == -1) {
            var $countryNavItem = $.root.find('.country-nav-item'),
                $countrySelector = $.root.find('.country-selector'),
                $header = $.root.find('.utility-nav'),
                $phone = $.root.find('.phone-no'),
                $close = $countrySelector.find('.close'),
                $countryAnnouncement = $.root.find('.country-selector-announcement'),
                $countryAnnouncementInner = $countryAnnouncement.find('.inner');


            var mobile = !$.root.is('.breakpoint-901'),
                state = 'hidden',
                initialHeaderHeight = 36;

            var getUrl = window.location;
            var baseUrl1 = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
            var baseUrl2 = getUrl.protocol + "//" + getUrl.host + "/";
            if (baseUrl1 === baseUrl2) {

                    if ($.cookie('BsiLanguage')) {
                        $(".logo").click();
                    }
                    else {
                        $(".header-parent-container").removeClass("scroll-header-bar2");
                        $('.headerMenuItems').css('display', 'block');
                        if (!mobile) {
                            $header.attr('style', 'overflow:visible');
                            $header
                                .animate({
                                    height: $countrySelector.height() + 100
                                }, 650);
                            $phone.animate({
                                top: $countrySelector.height() + 158
                            }, 650);
                        }

                        setTimeout(function () {
                            $countryNavItem.addClass('active');
                        }, 500);
                        $("#country-selector-dialog").css("display", "block");
                        $countrySelector
                            .delay(500)
                            .fadeIn(500, function () {
                                SFR.Utils.setKeyboardFocus($countrySelector.get(0));
                            });

                        state = 'visible';
                        $.ajax({
                            url: '/CountrySelector/DisplayCountry',
                            success: function (partialView) {
                                $("#country-selector-dialog").empty();
                                $('#country-selector-dialog').append(partialView);
                                var num_cols = 3,
                                    container = $('#ConlinentLinkPanel .contry-List-Name'),
                                    listItem = 'li',
                                    listClass = 'sub-list';
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

                                        $(this).append($('<ul ></ul>').addClass(listClass));
                                        for (var j = 0; j < items_per_col[i]; j++) {
                                            var pointer = 0;
                                            for (var k = 0; k < i; k++) {
                                                pointer += items_per_col[k];
                                            }
                                            $(this).find('.' + listClass).last().append(items[j + pointer]);
                                        }
                                    }
                                    $(".utility-nav-header").css("overflow", "visible");
                                    $(".localisation-links .nav-item.country-nav-itemnav-item.country-nav-item").addClass('active');
                                    $("#country-selector-dialog").removeClass("deactive");
                                    $(".country-selector").show(500);
                                    $('.header-parent-container').addClass('block-menu-align');
                                    $(".main-nav-item.hover .sub-nav,.main-nav-item .sub-nav").css({
                                        "top": "80px",
                                        "left": "-3%"
                                    });
                                });
                            }
                        });
                    }
            }

            $countryNavItem.click(function (e) {
                e.preventDefault();
                $header.stop(true, true);
                $countrySelector.stop(true, true);
                if (state === 'hidden' || $("div").hasClass('country-selector bsi-grid-wrapper bsi-countrySelector gmnoprint noprint deactive')) {
                    if (!mobile) {
                        $header.attr('style', 'overflow:visible');
                        $header
                            .animate({
                                height: $countrySelector.height() + 100
                            }, 650);
                        $phone.animate({
                            top: $countrySelector.height() + 158
                        }, 650);
                    }
                    $(".localisation-links .nav-item.country-nav-itemnav-item.country-nav-item").addClass('active');
                    $countrySelector
                        .delay(500)
                        .fadeIn(500, function () {
                            SFR.Utils.setKeyboardFocus($countrySelector.get(0));
                        });
                    state = 'visible';
                    $.ajax({
                        url: '/CountrySelector/DisplayCountry',
                        success: function (partialView) {
                            $("#country-selector-dialog").empty();
                            $('#country-selector-dialog').append(partialView);
                            var num_cols = 3,
                                container = $('#ConlinentLinkPanel .contry-List-Name'),
                                listItem = 'li',
                                listClass = 'sub-list';
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

                                    $(this).append($('<ul ></ul>').addClass(listClass));
                                    for (var j = 0; j < items_per_col[i]; j++) {
                                        var pointer = 0;
                                        for (var k = 0; k < i; k++) {
                                            pointer += items_per_col[k];
                                        }
                                        $(this).find('.' + listClass).last().append(items[j + pointer]);
                                    }
                                }
                                $(".utility-nav-header").css("overflow", "visible");
                                $("#country-selector-dialog").removeClass("deactive");
                                $(".country-selector").show(500);
                                $('.header-parent-container').addClass('block-menu-align');
                                $(".main-nav-item.hover .sub-nav,.main-nav-item .sub-nav").css({
                                    "top": "80px",
                                    "left": "-3%"
                                });
                            });
                        }
                    });


                }
                else {

                    if (Modernizr.mq('(min-width: 901px)')) {
                        $(".country-selector").hide(500);
                    }

                    if (Modernizr.mq('(max-width: 900px)')) {
                        $.ajax({
                            url: '/CountrySelector/DisplayCountry',
                            success: function (partialView) {
                                $("#country-selector-dialog").empty();
                                $('#country-selector-dialog').append(partialView);
                                var num_cols = 3,
                                    container = $('#ConlinentLinkPanel .contry-List-Name'),
                                    listItem = 'li',
                                    listClass = 'sub-list';
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
                            }
                        });
                        setTimeout(function () {
                            $(".country-selector").show();
                        }, 500);

                    }

                    setTimeout(function () {
                        $countryNavItem.removeClass('active');
                    }, 500);
                    $('.header-parent-container').removeClass('block-menu-align');
                    $(".country-nav-item").removeClass("active");
                    $("div#country-selector").css("display", "none");
                    $("#country-selector-dialog").css("display", "none");
                    $("#country-selector-dialog").empty();
                    $(".main-nav-container .main-nav-item.hover .sub-nav, .main-nav-container .main-nav-item .sub-nav").css({
                        "top": "120px",
                        "left": "0 "
                    });

                    if (!mobile) {

                        $header
                            .delay(150)
                            .animate({
                                height: initialHeaderHeight
                            }, 650);
                        $phone.delay(150).animate({
                            top: 108
                        }, 650);
                    }
                    $header.attr('style', 'overflow:visible!important');
                    state = 'hidden';
                }
                if ($countryAnnouncement.length > 0) {
                    closeLightbox();
                }

            });


            $close.click(function () {
                state = 'hidden';
                $countryNavItem.click();
            });
            $('.close-icone-since').keydown(function (e) {

                if (e.which == 13) {
                    $("div#search-toggle-icon").show();
                    $("#searchform-wrapper").hide();
                    $("#horizontal").show();
                    $('.header-wrapper-container').removeClass('search-faded');
                }
            });
            $('#closeBtn').click(function () {

                if ($('.trending-animate').removeClass('animate-active')) {
                    $('.trending-animate').addClass('animate-active', {
                        duration: 500
                    });
                }
                if ($('.panel-animate').removeClass('animate-active')) {
                    $('.panel-animate').addClass('animate-active', {
                        duration: 2000
                    });
                }
                state = 'hidden';
                $(".country-nav-item").removeClass("active");
                $("div#country-selector").css("display", "none");
                $('.utility-nav').css('height', 'auto');

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
            $countrySelector.on('click', 'ul span', function (e) {
                e.preventDefault();
                state = 'visible';
                $countryNavItem.click();
                $(this).trigger('countryselected');
            });

            if ($countryAnnouncement.length > 0) {

                if (!mobile) {
                    var $overlay = $('<div class="overlay"></div>').appendTo('body > form');
                    $countryAnnouncement
                        .addClass('modal')
                        .appendTo($overlay);
                    if ($(window).height() > $countryAnnouncement.children('.inner').height()) {
                        $countryAnnouncement
                            .children('.inner')
                            .css('margin-top', ($(window).height() - $countryAnnouncement.children('.inner').height()) / 2);
                    }

                    SFR.Utils.setKeyboardFocus($countryAnnouncement);

                    if ((objOffsetVersion = objAgent.indexOf("MSIE")) == -1 && objBrMajorVersion > 7) {
                        $('html').css({
                            'overflow': 'hidden'
                        });
                    }

                }
                var closeLightbox = function (callback) {
                    $countryAnnouncement.fadeOut(500, function () {
                        $countryAnnouncement.remove();
                    });
                    $overlay.fadeOut(500, function () {
                        $overlay.remove();
                    });
                    if ((objOffsetVersion = objAgent.indexOf("MSIE")) == -1 && objBrMajorVersion > 7) {
                        $('html').css({
                            'overflow': ''
                        });
                    }

                    if (callback && typeof (callback) === 'function') {
                        callback();
                    }

                };

                $countryAnnouncement.find('.confirm-site').click(function (e) {
                    e.preventDefault();
                    closeLightbox();
                });

                $countryAnnouncement.on('click', '.choose-site', function (e) {
                    e.preventDefault();
                    closeLightbox();
                    $(this).trigger('countryselected');
                });

                $countryAnnouncement.find('.country-selector-trigger').click(function (e) {
                    e.preventDefault();
                    $countryNavItem.click();
                });

                $countryAnnouncement.on('focus', '*', function (e) {
                    $countryAnnouncement.stop().show();
                });

            }

            var siteWasVisited = !!$.cookie('siteWasVisited');
            $.cookie('siteWasVisited', true, {
                path: '/'
            });
            if (!siteWasVisited && window.location.pathname == '/') {
                //$countryNavItem.click();
                $('#locale_remember').prop('checked', false)
            }

        }

    };

    BSI.setupTabs = function () {

        var mobile = !$.root.is('.breakpoint-901');
        $('.accordion').each(function (index, item) {
            var $this = $(item);
            var $link = $this.children('li:first-child').children('a');
            var $target = $link.next();

            $link.addClass('active');

            $target
                .addClass('is-open')
                .show(1, function () {
                    if (!mobile) {
                        $this.height($target.height() + 65);
                    }
                });
        });

        $('.accordion').on('click', 'li > a', function (e) {

            e.preventDefault();

            var $this = $(this);
            var $thisAccordion = $this.closest('.accordion');

            var $target = $this.next();
            var $old = $thisAccordion.find('.is-open');

            if (!$this.hasClass('active') || !mobile) {

                $old
                    .removeClass('is-open')
                    .hide();

                $target
                    .addClass('is-open')
                    .show();

                if (!mobile) {
                    $thisAccordion.height($target.height() + 65);
                }

                if (mobile) {
                    $(window).scrollTop($thisAccordion.offset().top);
                }

                $thisAccordion
                    .find('.active')
                    .removeClass('active');

                $this
                    .addClass('active');

            } else {

                $thisAccordion.find('.is-open')
                    .removeClass('is-open')
                    .hide();

                $this
                    .removeClass('active');
            }

        });

    };

    BSI.accessifyDropDownLists = function () {
        $.root.find('.main-nav-item:not(.no-subnav)').accessifyFlyout({
            sSubnavSelector: '.sub-nav'
        });
    };

    BSI.accessifySubMenuDropDownLists = function () {

        $.root.find('.sub-menu-nav-item:not(.no-subnav)').accessifyFlyout({
            sSubnavSelector: '.sub-nav'
        });
    };

    BSI.accessifyMenu = function () {
        $.root.find('.main-nav-item').accessifyFlyout({
            sSubnavSelector: '.sub-nav'
        });
    };

    BSI.accessifySubMenu = function () {
        $.root.find('.sub-menu-nav-item').accessifyFlyout({
            sSubnavSelector: '.sub-nav'
        });
    }
    BSI.collapseMenu = function () {

        var $menu = $.root.find('.main-nav');

        if (!$menu.hasClass('visuallyhidden')) {
            $menu
                .addClass('visuallyhidden')
                .attr('style', '');
        }

    };

    BSI.collapseSubMenu = function () {

        var $menu = $.root.find('.sub-menu-nav');

        if (!$menu.hasClass('visuallyhidden')) {
            $menu
                .addClass('visuallyhidden')
                .attr('style', '');
        }

    };

    BSI.unCollapseMenu = function () {

        var $menu = $.root.find('.main-nav');

        if ($menu.hasClass('visuallyhidden')) {
            $menu.removeClass('visuallyhidden');
        }

    };

    BSI.unCollapseSubMenu = function () {

        var $menu = $.root.find('.sub-menu-nav');

        if ($menu.hasClass('visuallyhidden')) {
            $menu.removeClass('visuallyhidden');
        }

    };

    BSI.setupMenuToggle = function () {

        var $menu = $.root.find('.main-nav'),
            $menuBt = $.root.find();

        $.root.on('click', '.menu-bt', function () {

            if ($menu.hasClass('visuallyhidden')) {

                SFR.Utils.expandIt($menu);
                $(this).addClass('active');
                //$.root.find('div.sub-nav').hide();
                //$('.wrapper').removeClass('wrapper-fluid');

            } else {

                SFR.Utils.collapseIt($menu);
                $(this).removeClass('active');
                $('span.collapse-filters-icon').removeClass('expanded');
                //$('.wrapper').addClass('wrapper-fluid');
            }
        });
    };

    BSI.setupSubMenuToggle = function () {

        var $menu = $.root.find('.main-nav-item');

        $.root.on('click', '.main-nav-mobile .main-nav-item', function () {
            var $clicked = $(this);
            var headerTitle = $clicked.children(".main-nav-link").text();
            $(".header-slide h2").html(headerTitle);

            $(".main-nav-container .main-nav-item .sub-nav").addClass('menu-aligns');
            var me = $(this);
            $.root.on('click', '.main_menuControl-Link, .sub-nav', function (event) {
                $.root.find('div.sub-nav').event.stopPropagation();
            });
            $(this).find('div.sub-nav').slideToggle("fast");
        });

    };

    BSI.hideSubMenu = function () {
        $.root.find('div.sub-nav').show();
        $('span.collapse-filters-icon').removeClass('expanded');
        $.root.find('.menu-bt').removeClass('active');
    };

    BSI.setupSubSubMenuToggle = function () {
        if (Modernizr.mq('(max-width: 900px)')) {
            var $menu = $.root.find('.sub-menu-nav-item');
            $.root.on('click', '.sub-menu-nav-item', function () {
                var me = $(this);
                $(this).find('span.collapse-filters-icon').toggleClass('expanded');
            });
        }
    };

    BSI.subMenuCollapseAndExpandForMobileDevice = function () {
        if (Modernizr.mq('(max-width: 900px)')) {
            $('.sub-menu-nav-item').not(this).find('div.sub-nav').hide();
            $('.sub-menu-nav-item').click(function () {
                $('.sub-menu-nav-item').not(this).find('div.sub-nav').hide();
                $(this).find('div.sub-nav').toggle();
            });
        }
    };

    BSI.hideSubSubMenu = function () {
        $.root.find('div.sub-nav').hide();
        $('span.collapse-filters-icon').removeClass('expanded');
    };

    BSI.collapseSearchFilters = function () {

        var $ctx = $.root.find('.search-filter-nav'),
            $searchFilters = $ctx.find('.search-filters'),
            $triggerTxt = $searchFilters.find('.search-filter-title').html(),
            $trigger = $('<button />')
                .addClass('trigger bt key-bt')
                .html($triggerTxt),
            $cancelBt = $('<button />')
                .addClass('filter-cancel-bt bt key-bt')
                .html('Cancel'),
            $searchSummary = $.root.find('.search-results-summary'),
            $searchFields = $.root.find('.site-search-fields');

        $searchFilters.addClass('visuallyhidden');
        $ctx.addClass('is-collapsed');
        $.root.on('click', '.filter-cancel-bt', function () {

            SFR.Utils.collapseIt($searchFilters);
            $ctx.toggleClass('is-collapsed');
            $ctx.toggleClass('is-expanded');
            return false;

        });

        $searchFilters.before($trigger);
        $cancelBt
            .appendTo($searchFilters);

        $(document).on('click', '.trigger', function () {

            SFR.Utils.accessiblyToggle($ctx, $searchFilters);
            $ctx.toggleClass('is-collapsed');
            $ctx.toggleClass('is-expanded');
            return false;

        });

    };

    BSI.unCollapseSearchFilters = function () {
        $.root.find('.search-filter-nav .trigger').remove();
        SFR.Utils.expandIt($.root.find('.search-filters'), 0);

        $.root.find('.search-filters .filter-cancel-bt').remove();
    }

    /** * @param {Object} $trigger */
    BSI.toggleOtherSalutationField = function ($trigger) {

        var $selectedOption = $trigger.find(':selected'),
            $otherFormItem = $trigger.parents('.name-form-item-group').find('.other-salutation');

        if ($selectedOption.val() == 'Other') {

            $otherFormItem
                .removeClass('visuallyhidden');

        } else {

            $otherFormItem
                .addClass('visuallyhidden')
                .find('input')
                .attr('value', '');
        }

    };

    BSI.setUpNameInputs = function () {

        var $trigger = $.root.find('select.salutation');
        $trigger.change(function () {

            BSI.toggleOtherSalutationField($(this));
        });
        BSI.toggleOtherSalutationField($trigger);

    };

    /*** @param {String} pcodeLookupResultsPath Path to postcode lookup results. * @param {String} pcodeLookupResultsType *   Data type for postcode lookup results.*/

    BSI.setUpPcodeLookup = function (pcodeLookupResultsPath, pcodeLookupResultsType) {

        var $pcodeLookup = $.root.find('.pcode-lookup'),
            $ctx = $pcodeLookup.parents('.manual-addr-group'),
            $manualAddrLink = $ctx.find('.trigger'),
            $optionalAddrFields = $ctx.find('.target'),
            $pcodeLookupFormItem = $pcodeLookup.find('.postcode'),
            $pcodeLookupInput = $pcodeLookupFormItem.find('input[type=text]'),
            $pcodeLookupSbmt = $pcodeLookup.find('[type=submit]'),
            $pcodeLookupResults = $pcodeLookup.parent('form-item'),
            $pcodeScrollPane = $pcodeLookup.find('.scroll-pane'),
            pcodePrevResults,
            pcodeLookupErrorTxt = _t('Sorry, there are no results. Please check your post code and try again');

        SFR.Utils.disableElem($pcodeLookupSbmt);

        $pcodeLookup.on('keyup', '.postcode input[type=text]', function () {

            SFR.Utils.checkInputHasValue($pcodeLookupInput, function () {

                if ($pcodeLookupInput.data('has-value') == 'true') {

                    SFR.Utils.enableElem($pcodeLookupSbmt);

                } else {

                    SFR.Utils.disableElem($pcodeLookupSbmt);

                }

            });

        });

        $pcodeLookupSbmt.click(function (e) {

            var $pcodeLookupResultsData,
                $pcodeScrollPane,
                $pcodeLookupResults;

            SFR.Utils.disableElem($pcodeLookupSbmt);
            if ($pcodeLookup.find('.scroll-pane').length) {
                pcodePrevResults = 'true';
                $pcodeScrollPane
                    .addClass('loading')
                    .empty();

            } else {

                pcodePrevResults = 'false';
                $pcodeScrollPane = $('<div />').addClass('scroll-pane');
                $pcodeLookupResults = $('<div />').addClass('form-item').append($pcodeScrollPane);

            }

            $.ajax({
                url: pcodeLookupResultsPath,
                dataType: pcodeLookupResultsType,
                type: 'GET',
                cache: false,
                context: $pcodeLookup,
                success: function (data) {

                    $pcodeLookupResultsData = '';

                    for (var i = 0; i < data.length; i++) {

                        $pcodeLookupResultsData += '<label>' +
                            '<input type="radio" name="address-option" value="address_option-' + [i] + '" />' +
                            '<span class="building-name-number">' + data[i].building_name_number + '</span>, ' +
                            '<span class="addr-line-1">' + data[i].addr_line_1 + '</span>, ' +
                            '<span class="addr-line-2">' + data[i].addr_line_2 + '</span>, ' +
                            '<span class="city">' + data[i].city + '</span>, ' +
                            '<span class="county">' + data[i].county + '</span>, ' +
                            '<span class="postcode">' + data[i].postcode + '</span>, ' +
                            '<span class="country">' + data[i].country + '</span>' +
                            '</label>';
                    }

                },
                error: function () {
                    $pcodeLookupResultsData = '';
                    $pcodeLookupResultsData = pcodeLookupErrorTxt;
                    SFR.Utils.enableElem($pcodeLookupSbmt);

                },
                complete: function () {
                    $pcodeScrollPane.html($pcodeLookupResultsData);
                    if (pcodePrevResults == 'false') {
                        $pcodeLookupResults.hide();
                        $pcodeLookup.append($pcodeLookupResults);
                        SFR.Utils.expandIt($pcodeLookupResults);
                    } else {
                        $pcodeScrollPane.removeClass('loading');
                    }
                    SFR.Utils.setKeyboardFocus($pcodeScrollPane);
                }
            });
            e.preventDefault();
        });

        $pcodeLookup.on('change', '.pcode-lookup [type=radio]', function () {
            var $this = $(this);
            $pcodeScrollPane = $this.parents('.form-item');
            SFR.Utils.highlightSelectedRadioLabel($this);
            if ($ctx.hasClass('is-collapsed')) {

                SFR.Utils.expandIt($optionalAddrFields, 300, function () {
                    $manualAddrLink.hide();
                    $ctx.toggleClass('is-collapsed');
                    $ctx.toggleClass('is-expanded');

                });
            }

            $this.siblings('span').each(function () {

                var $this = $(this),
                    $className = $this.attr('class');

                $ctx
                    .find('.' + $className)
                    .find('input[type=text]')
                    .val($this.text());
            });
            SFR.Utils.collapseIt($pcodeScrollPane, 300, function () {
                $pcodeScrollPane.remove();
            });

            SFR.Utils.setKeyboardFocus($('.postcode input'));


        });

    };
    /** * @param {Object} context *   Container to scope the following functions*/
    BSI.setUpAddressFields = function (context) {

        var $ctx = $(context || document),
            $requiredAddrFields = $ctx.find('[required=required]'),
            $optionalAddrFields = $ctx.find('.optional-fields'),
            manuaAddrTxt = _t('Manually enter address'),
            $userActions = $('<div />').addClass('user-actions'),
            $manualAddrLink = $ctx.find('.trigger');

        $manualAddrLink
            .addClass('bt')
            .html(manuaAddrTxt);

        $ctx.append($userActions);

        $manualAddrLink.click(function () {

            SFR.Utils.accessiblyToggle($ctx, $manualAddrLink);
            SFR.Utils.accessiblyToggle($ctx, $manualAddrLink.prev('.pcode-lookup').find('.scroll-pane').parents('.form-item'));
            return false;
        });
    };

    BSI.setupAutocompleteSearch = function () {
        /*** @param   oData   the JSON object returned by the search service.*/
        function _processSearchResults(oData) {
            // 0. empty everything
            oResultList.empty();
            // 1. if there are no results…
            if (oData.length == 0) {
                oResultList.append('<li class="noResults">…</li>');
            } else {
                for (var i = 0; i < oData.length; i++) {
                    oResultList.append('<li><a href="#">' + oData[i] + '</a></li>');
                }
            }
            oResultDom.addClass('ui_visible');
        }

        function _resetDom() {
            oResultDom.removeClass('ui_visible');
            oResultList.empty();
        }

        // 0. look for DOM
        var oSearchWidget = $('#site-search');
        if (oSearchWidget.length == 0)
            return false;

        // 1. hook everything
        var oInp = oSearchWidget.find('input[type=search]').attr('autocomplete', 'off'),
            sParamName = oInp.attr('name'), // cache this
            oForm = oInp.parents('form').eq(0), // be safe
            oResultDom = $('<div class="siteSearchResults"></div>').appendTo(oSearchWidget),
            oResultList = $('<ul></ul>').appendTo(oResultDom),
            oTrigSearch = $('<strong></strong>').appendTo(oResultDom).wrap('<a href="#" class="submit">Search for </a>'),
            bWaiting = false,
            sVal = '',
            oTo = null;
        // 2. event binding on the search box
        oInp.on('keyup.search input.search', function () {
            sVal = oInp.val();
            oTrigSearch.text(sVal);
            if (sVal.length < 3)
                return true; // return true, otherwise we’ll confuse the user
            if (bWaiting)
                return true;
            var oSend = {};
            oSend[sParamName] = sVal;
            $.get(oSearchWidget.data('json-submit-uri'), oSend, _processSearchResults);

            return true;
        }).on('blur.search', function () {
            oTo = setTimeout(_resetDom, 100);
            return true;
        }).on('focus.search', function (e) {
            clearTimeout(oTo);
        }).on('keydown.search', function (e) {
            if (e.keyCode !== 40)
                return true;
            var oA = oResultDom.find('a').eq(0).trigger('focus');
            if (oA.length > 0) {
                clearTimeout(oTo);
            }
            return false;
        });
        oResultDom.on('click.search', 'li a', function () {
            oInp.val($(this).text());
            return false;
        }).on('click.search', 'a.submit', function () {
            oInp.val(oTrigSearch.text());
            oForm.trigger('submit');
            return false;
        }).on('focus.search', 'a', function () {
            var oT = $(this);
            clearTimeout(oTo);
            oInp.val((oT.hasClass('submit') ? oTrigSearch.text() : oT.text()));
        }).on('blur.search', 'a', function () {
            oTo = setTimeout(_resetDom, 100);
        }).on('keydown.search', 'a', function (e) {
            if ((e.keyCode !== 40) && (e.keyCode !== 38) && (e.keyCode !== 13))
                return true;

            if (e.keyCode === 13) {
                oForm.trigger('submit');
                return false;
            }

            var oCurrLink = $(this);

            if (oCurrLink.hasClass('submit')) {
                if (e.keyCode === 38) {
                    oResultList.find('a:last').focus();
                    clearTimeout(oTo);
                }
                return false;
            }

            var oNextEl = null;
            if (e.keyCode === 40) {
                oNextEl = oCurrLink.parent().next().children('a');
                if (oNextEl.length == 0) {
                    oNextEl = oTrigSearch.parent();
                }
            } else {
                oNextEl = oCurrLink.parent().prev().children('a');

                if (oNextEl.length == 0) {
                    oNextEl = oInp;
                }
            }

            oNextEl.trigger('focus');
            clearTimeout(oTo);
            return false;
        });

    };

    $("a").click(function () {
        var http = location.protocol;
        var slashes = http.concat("//");
        var host = slashes.concat(window.location.hostname);
        var redirecthost;
        var hostUrl = this.href;
        var url = hostUrl;
        url = url.split("/");

        var source = this.href.toLowerCase();
        source = source.replace(/\/$/, '');

        switch (url[3] !== null && typeof url[3] !== 'undefined' && url[3].toLowerCase()) {

            case "en-gb":
                redirecthost = host + '/en-IE';
                host = host + '/en-GB';
                if ((source == host.toLowerCase()) && ($.cookie('IrelandHome'))) {
                    window.document.location.href = redirecthost;
                    return false;
                }
                break;

            case "de-de":
                if ($.cookie('SchweizHome')) {
                    redirecthost = host + '/de-CH';
                    host = host + '/de-DE';
                    if ((source == host.toLowerCase())) {
                        window.document.location.href = redirecthost;
                        return false;
                    }
                } else if ($.cookie('OsterreichHome')) {
                    redirecthost = host + '/de-AT';
                    host = host + '/de-DE';
                    if ((source == host.toLowerCase())) {
                        window.document.location.href = redirecthost;
                        return false;
                    }
                }
                break;

            case "nl-nl":
                redirecthost = host + '/nl-BE';
                host = host + '/nl-NL';
                if ((source == host.toLowerCase()) && ($.cookie('BelgieHome'))) {
                    window.document.location.href = redirecthost;
                    return false;
                }
                break;

            case "en-au":
                redirecthost = host + '/en-NZ';
                host = host + '/en-AU';
                if ((source == host.toLowerCase()) && ($.cookie('NewZealandHome'))) {
                    window.document.location.href = redirecthost;
                    return false;
                }
                break;
        }
    });

    $("#HomeLang, .logo").click(function () {

        if ($.cookie('BsiLanguage')) {
            if ($.cookie('BsiLanguage').indexOf('bsiaislandi') == -1) {
                var homeLang = $.cookie('BsiLanguage');
                var hrefLang = this.href.split("/")[3];
                if (homeLang.indexOf(hrefLang) == -1) {
                    if (!window.location.origin) {
                        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                    }
                    window.location.href = window.location.origin + homeLang;
                    return false;
                } else {
                    window.location.href = this.href;
                    return false;
                }
            } else {
                window.location.href = this.href;
                return false;
            }
        } else {
            window.location.href = this.href;
            return false;
        }
    });

    $('a').each(function () {
        if (this.href.toLowerCase().indexOf('mailto') != -1) {
            this.href = this.href.replace("::25//", ":").replace(":25", "");
        }
    });

}(jQuery));

$(function () {

    var $tabButtonItem = $('.nav-tabsContent li'),
        $tabSelect = $('#tab-select'),
        $tabContents = $('.tab-contents'),
        activeClass = 'activecls';


    $tabButtonItem.first().addClass(activeClass);
    $tabContents.not(':first').hide();
    $('li.cdcActive.tab-background.activecls').removeClass('activecls');

    $tabButtonItem.find('a').on('click', function (e) {
        var target = $(this).attr('href');

        $tabButtonItem.removeClass(activeClass);
        $(this).parent().addClass(activeClass);
        $tabSelect.val(target);
        $tabContents.hide();
        $(target).show();
        e.preventDefault();
    });

    $tabSelect.on('change', function () {
        var target = $(this).val(),
            targetSelectNum = $(this).prop('selectedIndex');

        $tabButtonItem.removeClass(activeClass);
        $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
        $tabContents.hide();
        $(target).show();
    });
});