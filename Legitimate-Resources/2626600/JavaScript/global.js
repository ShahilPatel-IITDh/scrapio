var timeoutID, countdownTimerID;
var subNavItems;
var ios = false;
var safari = false;
var tableRows;
var tableThresh = { min: 0, max: 12 };

var navState = {
      open : false,
      subNav: []
};

var userMenuState = {
      open: false
};

var searchState = false;

var userAgent = navigator.userAgent || navigator.vendor || window.opera;

function checkUserAgent() {
      if (/android/i.test(userAgent)) {
      jQuery(".get-directions").text('Android');
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            jQuery(".get-directions").text('iPhone/iPad');
      } else if (/windows phone/i.test(userAgent)) {
            jQuery(".get-directions").text('Windows Phone');
      } else {
            jQuery(".get-directions").text('desktop');
      }
}

if (/iPhone|iPad|iPod|iOS|iOs|ios/i.test(navigator.userAgent)) {
      ios = true;
}

if (/CriOS|crios/i.test(navigator.userAgent)) {
      safari = true;
}


function hideDocSpinner() {
      jQuery('#loading-document').hide();
}

//Document modal functions
function showDocModal() {
      jQuery('.js-document-modal').addClass('show');
      jQuery('.js-session-overlay').addClass('show');
      jQuery('html, body').addClass('locked');
      if (jQuery(window).width() < 717) {
            var headerHeight = jQuery('.document-modal .modal-title').outerHeight();
            jQuery('.document-modal .modal-content').css('margin-top', headerHeight + 'px');
            jQuery('.document-modal .js-modal-close').css('height', headerHeight + 'px');
      }
}

function hideDocModal() {
      jQuery("#document-iframe").attr('src', "");
      jQuery('.js-document-modal').removeClass('show');
      jQuery('.js-session-overlay').removeClass('show');
      jQuery('html, body').removeClass('locked');
}

function setDocumentIframeSrc(type, refNumber, css) {
      //If disabled then return without doing anything
      if (css && css.indexOf('disabled') != -1) return;

      jQuery("#document-iframe").height(jQuery(window).height() - 260 + "px");

      jQuery('#loading-document').show();
      /*   jQuery("#document-iframe").load(function(){
            hideDocSpinner();
         });*/

      var hash = type;
      window.location.hash = hash;
      window.onhashchange = function () {
            if (!location.hash ) {
                  //dwight/hans: commented out close below as it was breakig the tax certificate view... doesnt seem to break things when we comment out
                  //if you uncomment, please test Tax Certficate download as it will close the modal before you see the pdf
//                  hideModal();
//                  hideDocModal();
            }
      }

	
      var path  = ccs.contextPath + "/applications/" + ccs.appName + "/custom/pdf/";
var url = path;
      var title = jQuery(".doc-title");

      if (type == "paidupletter") {
            url += "paidupletter.jsp?refNumber=" + refNumber;
            title.text("Paidup Letter");
      } else if (type == "taxcert") {
            url += "taxcert.jsp?refNumber=" + refNumber;
            title.text("Tax Certificate");
      } else if (type == "lateststatement") {
            url += "latestStatement.jsp?refNumber=" + refNumber;
            title.text("Latest Statement");
      } else if (type == "settlement") {
            url += "settlementQuote.jsp?refNumber=" + refNumber;
            title.text("Settlement Quote");
      } else if (type == "laststatement") {
            url += "latestStatement.jsp?refNumber=" + refNumber;
            title.text("Last Statement");
      }

console.log(window.navigator.userAgent);
if (window.navigator.userAgent.indexOf('Edg') == -1) {
//console.log('edge');
      jQuery("#document-iframe").attr('src', url);
	jQuery("#framey").hide();
	jQuery("#document-iframe").show();
} else {
//console.log('not edge');

      jQuery("#framey").attr('src', path + 'viewer.jsp?url='+ encodeURIComponent(url));

//      jQuery("#framey").attr('src', path + 'viewer.jsp?url='+ encodeURIComponent(path +'x/test.pdf'));
	jQuery("#document-iframe").hide();
	jQuery("#framey").show();
}
      if (window.innerWidth < 1025){
            window.open(url,'_blank');
      } else {
            showDocModal();
      }

      //Vir IE kak
    manipIframe();

      var iFrameHead = jQuery('iframe#document-iframe').contents().find('head');
      var iFrameStyle = '<style>img{ width:100%; height: auto;}</style>'
      iFrameHead.append(iFrameStyle);


//renderNative(url)
}


function renderNative(url) {

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
  console.log('PDF loaded');
  
  // Fetch the first page
  var pageNumber = 1;
  pdf.getPage(pageNumber).then(function(page) {
    console.log('Page loaded');
    
    var scale = 1.5;
    var viewport = page.getViewport({scale: scale});

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.promise.then(function () {
      console.log('Page rendered');
    });
  });
}, function (reason) {
  // PDF loading error
  console.error(reason);
});
}




function manipIframe() {
      var iframe = document.getElementById('document-iframe');
      var iframeDocument;
      try {
            iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      } catch (err) {
            hideDocSpinner();
      }
      var iframeBody = iframeDocument.getElementsByTagName('body')[0];
      if (iframeBody.innerHTML.length < 1) {
            setTimeout(manipIframe, 100);
      } else {
            hideDocSpinner();
      }
   

}

//Document modal functions

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


function openInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
}

function startLoggedInTimer() {
      // loading Idle events
      if (this.addEventListener) {
            this.addEventListener("mousemove", resetLoggedInTimer, false);
            this.addEventListener("mousedown", resetLoggedInTimer, false);
            this.addEventListener("keypress", resetLoggedInTimer, false);
            this.addEventListener("DOMMouseScroll", resetLoggedInTimer, false);
            this.addEventListener("mousewheel", resetLoggedInTimer, false);
            this.addEventListener("touchmove", resetLoggedInTimer, false);
            this.addEventListener("MSPointerMove", resetLoggedInTimer, false);
      }
      else {
            jQuery(document).bind('mousemove', resetLoggedInTimer);
            jQuery(document).bind("mousedown", resetLoggedInTimer);
            jQuery(document).bind("keypress", resetLoggedInTimer);
            jQuery(document).bind("DOMMouseScroll", resetLoggedInTimer);
            jQuery(document).bind("mousewheel", resetLoggedInTimer);
            jQuery(document).bind("touchmove", resetLoggedInTimer);
            jQuery(document).bind("MSPointerMove", resetLoggedInTimer);
      }


      startTimer();
}

function startTimer() {
      // wait 60 seconds before calling goInactive
      timeoutID = window.setTimeout(goInactive, 180000);
}

function resetLoggedInTimer(e) {
      window.clearTimeout(timeoutID);

      goActive();
}

function logout() {
      //todo add the below back in
      window.location.replace(ccs.contextPath + "/applications/" + ccs.appName + "/custom/mfc_logout.jsp");
}

function timer(duration, display) {
      var timer = duration, minutes, seconds;
      return setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? seconds : seconds;

            display.text(seconds);

            if (--timer < 0) {
                  timer = duration;
                  hideModal();
                  //Redirect to logout
                  logout();
            }
      }, 1000);
}

function showModal() {
      jQuery('.js-session-modal .modal-title').html('<span>Session timeout warning</span>');
      jQuery('.js-session-modal').addClass('show').addClass("timeout");
      jQuery('.js-session-overlay').addClass('show');
}

function showErrorModal(title) {
      jQuery('.js-session-modal .modal-title').html('<span>' + title + '</span>');
      jQuery('.js-session-modal').addClass('show').removeClass('timeout');
      jQuery('.js-session-overlay').addClass('show');
}

function hideModal() {
      jQuery('.js-session-modal').removeClass('show');
      jQuery('.js-session-overlay').removeClass('show');
}

function goInactive() {
      var tenseconds = 10,
            display = jQuery('#countdown');
      window.clearTimeout(timeoutID);
      countdownTimerID = timer(tenseconds, display);
      showModal();
}


function goActive() {
      startTimer();
}

jQuery(function ($) {
      // Rewrite email addresses to avoid exposing them
      ;!(function rewriteStaticEmail() {
            emails = $('.writeemail, .writeEmail');
            for (i = 0; i <= emails.length; i++) {
                  emailAddress = $(emails[i]).text().replace(/\[at]/g, '@');
                  $(emails[i]).text(emailAddress).attr('href', "mailto:" + emailAddress);
            }
      })();

      ;!(function rewriteFormEmail() {
            if ($('.no-form__mailto').length > 0) {
                  newMail = $('.no-form__mailto').attr('href').replace(/\[at]/g, '@')
                  $('.no-form__mailto').attr('href', newMail);
            }
      })();


      ;!(function checkUserAgent() {
            if (jQuery('.get-directions').length > 0) {
                  var iosLink = 'http://maps.apple.com/',
                  desktopLink = 'http://maps.google.com/',
                  url = jQuery(".get-directions").attr('href'),
                  domain = url.split('?')[0]

                  if (/android/i.test(userAgent)) {
                        jQuery(".get-directions").attr('href', url.replace(domain, desktopLink));
                  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                        jQuery(".get-directions").attr('href', url.replace(domain, iosLink));
                        
                  } else if (/windows phone/i.test(userAgent)) {
                        jQuery(".get-directions").attr('href', url.replace(domain, desktopLink));
                  } else {
                        jQuery(".get-directions").attr('href', url.replace(domain, desktopLink));
                  }
            }
      })();

      ;!(function toggleBaloonPayment() {
            $('#calc-period').on('change', function(){
                  if($(this).val() > 72) {
                        $('[id*="calc-balloon"]').val(0);
                        $('[id*="calc-balloon"] .nosui-calculator-form-select__placeholder').text('0%');
                        $('[id*="calc-balloon"]').attr('disabled', 'disabled');
                        $('[id*="calc-balloon"]').addClass('disabled');
                  } else {
                        $('[id*="calc-balloon"]').attr('disabled', false);
                        $('[id*="calc-balloon"]').removeClass('disabled');
                  }
            });
      })($);

      //Click events for timeout modal buttons
      jQuery("[data-role='keepMeLoggedIn']").click(function (e) {
            e.preventDefault();
            hideModal();
            clearInterval(countdownTimerID);
            startTimer();
            return false;
      });

      jQuery("[data-role='logout']").click(function (e) {
            //Redirect to logout.jsp and clear all session variables
            e.preventDefault();
            logout();
            return false;
      });


      $(function () {
            $(".calendar_input").datepicker();
      });

      /*
      * @function: drops the search bar and sets focus on the input field
      * @event: click
      * @returns: void
      */

      $('.header__search, .icon--404').click(function (e) {
            e.stopPropagation();
            if (searchState == true){
                  mutateSearchState(false);
            } else {
                  mutateSearchState(true);
            }
      });

      /*
       * @function: animates content frame out of view-port on menu expansion
       * @event: click
       * @returns: void
       */

      $(".js-modal-close").click(function () {
            hideModal();
            hideDocModal();
      });

      /*
      * @function: Adds Mobile Menu Functionality
      * @event: DOM ready
      * @returns: void
      */

      $('.icon--home').click(function(e) {
            e.stopPropagation();
            if (navState.open == true){
                  mutateState(false, 'root');
            } else {
                  mutateState(true, 'root');
            }
      });

      var mobileMenuFunctions = function(){
            var groupNumber = $(this).attr('data-group');
            var isSelected = -1;
            $.each(navState.subNav,function(index){
                  if (navState.subNav[index].open == true){
                        isSelected = navState.subNav[index].id;
                  }
            });
            if (isSelected == groupNumber){
                  mutateState(false,groupNumber);     
            } else {
                  mutateState(true,groupNumber);
            }
      }

      $('.menu-collapse,.menu-expand').click(function(e){
            e.stopPropagation();
      });

      $('.js-session-overlay').click(function(e){
            e.preventDefault();
            closeNav();
            closeUserMenu();
      });

      /*
      * ToolTips Function
     
      */


      /*
       * @function: shows search bar hint if field is not null
       * @event: keypress
       * @returns: void
       */

      $('.js-search').keyup(function () {

            $('.js-hint').show();

            var input = $('.js-search').val();

            if (!input) {
                  $('.js-hint').hide();
            }
            ;

      });

      function do_search_key(evt) {

            var e = evt || event;
            if (e.keyCode == 13) {
                  do_search();
            }
      }

      function do_search() {

            var theForm = document.forms['search'];
            if (theForm) {
                  if (theForm.search_keyword && theForm.search_keyword.value.trim() == '') {
                        alert('Please enter search keyword(s)');
                        return false;
                  }

                  theForm.submit();

            }
      }


      /*
       * @function: initiates the responsive slider functionality
       * @event: DOM ready
       * @returns: void
       */

      $('.js-slider-holder').responsiveSlides({

            auto: true,
            namespace: 'slider',
            nav: true,
            pager: true,
            pause: true

      });


      /*
       * @function: initiates the NOS UI jQuery elements for the contact us modlet
       * @event: DOM ready
       * @returns: void
       */

      $('.contact-info__select').nosFormSelect({
            // onChange: function($el, $fauxEl){
            // 	$el.trigger('click');
            // }
      });

      $('.select').nosFormSelect({
            namespace: 'form-select'
      });

      // $('.nosui-form-check-input').nosFormCheckbox({
      // 	namespace: 'nosui-form-check-input'
      // });

      $('.nosui-form-check-input').nosInputCheckbox({
            namespace: 'nosui-form-check-input'
      });

      $('.nosui-form-check-input_white').nosInputCheckbox({
            namespace: 'nosui-form-check-input_white'
      });

      /*
       * @function: initiates the NOS UI jQuery elements for the instalment calculator modlet
       * @event: DOM ready
       * @returns: void
       */

      $('.form__label').nosFormSelect({
            namespace: 'nosui-calculator-form-select'
            // onChange: function($el, $fauxEl){
            // 	$el.trigger('click');
            // }
      });

      /*
       * @function: Accordion for FAQ page
       * @event: DOM ready
       * @returns: void
       */
      $('.accord-content').hide();
      $('.accordion .accord-header').click(function () {
            var parent = $(this).parents('.accordion');
            if ($(parent).hasClass('js-accordion-active')) {
                  $(parent).removeClass('js-accordion-active');
                  $('.Q_block', parent).removeClass('Q_block--active');
                  $('.accord-content', parent).slideUp();
            } else {
                  if (window.innerWidth < 925) {
                        $('.accordion').removeClass('js-accordion-active');
                        $('.accordion .Q_block').removeClass('Q_block--active');
                        $('.accordion .accord-content').slideUp();
                  }
                  $(parent).addClass('js-accordion-active');
                  $('.Q_block', parent).addClass('Q_block--active');
                  $('.accord-content', parent).slideDown();
                  if (window.innerWidth < 925) {
                        if (ios == false){
                              setTimeout(function () {
                                    $("html, body").animate({
                                          scrollTop: $('.js-accordion-active').offset().top - 70
                                    }, 600);
                              }, 425);
                        }
                  }
            }
      });

      /*
    * @function: Accordion for Step by Step
    * @event: DOM ready
    * @returns: void
    */
      if (window.innerWidth < 925) {
            $('.step-by-step__body').hide();
            $('.step-by-step__header').click(function () {
                  var parent = $(this).parents('.step-by-step');
                  if ($(parent).hasClass('js-accordion-active')) {
                        $(parent).removeClass('js-accordion-active');
                        $('.step-by-step__body', parent).slideUp();
                  } else {
                        $('.step-by-step').removeClass('js-accordion-active');
                        $('.step-by-step__body').slideUp();
                        $(parent).addClass('js-accordion-active');
                        $('.step-by-step__body', parent).slideDown();
                        setTimeout(function () {
                              $("html, body").animate({
                                    scrollTop: $('.js-accordion-active').offset().top - 70
                              }, 600);
                        }, 425);
                  }
            });
      } else {
            $('.step-by-step__body').show();
      }


      /*
       * @function: Close the notification area, set a session cookie to keep it closed
       * @event: DOM ready
       * @returns: void
       */
      $('.notification-bar .notification__button').click(function () {

            document.cookie = 'mfc_notify_closed=1';
            $('.notification-bar').slideUp();

      }
      );
      if (document.cookie.indexOf('mfc_notify_closed=1') != -1) {

            $('.notification-bar').hide();

      }


      $('.notification-bar_logout .notification__button').click(function () {
            $('.notification-bar_logout').slideUp();
      }
      );


      /*
       * @function: Payment Options Div show and hide
       * @event: DOM ready
       * @returns: void
       */
      $('.payment-problems-detail__block').click(function () {
            $(this).parent().find('.payment-problems-detail__details').slideToggle();
            $(this).parent().find('.payment-problems-detail_icon').toggleClass('payment-problems-detail_icon--active');
            $(this).parent().find('.payment-problems-detail__block').toggleClass('payment-problems-detail__block--active');
      });

      $('.website-suppot__tooltip').hide();

      $('.footer-nav__tooltip')
            .mouseover(
            function () {
                  $(this).siblings('.form__tooltip').show();
            }
            ).mouseout(
            function () {
                  $(this).siblings('.form__tooltip').hide();
            }
            );

      $('.form__tooltip-wrap .form__tooltip, .form__error').hide();

      $('.form__tooltip-wrap .icon')
            .mouseover(
            function () {
                  $(this).siblings('.form__tooltip').show();
            }
            ).mouseout(
            function () {
                  $(this).siblings('.form__tooltip').hide();
            }
      );


      /*
       * @function: Changes the width of the content area on resize
       * @event: DOM ready
       * @returns: void
       */

      $(window).resize(function () {

            var windowWidth = $(window).width(),

                  menuWidth = $('.js-nav').width();

            switch (true) {

                  case windowWidth > 1155:
                        contentWidth = windowWidth - 300;
                        break;

                  case windowWidth <= 1155 && windowWidth > 1024:
                        contentWidth = windowWidth - 47;
                        break;

                  default:
                        contentWidth = 1024 - 47;

            }

            containerWidth = contentWidth + menuWidth;

            $('.container').width(containerWidth + 10);
            if ($(window).width() > 925) {
                  $('.js-container-content').width(contentWidth);
            }

      });

      function filterPath(string) {
            return string
                  .replace(/^\//, '')
                  .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
                  .replace(/\/$/, '');
      }

      var locationPath = filterPath(location.pathname);
      var scrollElem = scrollableElement('html', 'body');

      $('a[href^="#"]').each(function () {
            var thisPath = filterPath(this.pathname) || locationPath;
            if (locationPath == thisPath
                  && (location.hostname == this.hostname || !this.hostname)
                  && this.hash.replace(/#/, '')) {
                  var $target = $(this.hash), target = this.hash;
                  if (target) {
                        var targetOffset = $target.offset().top;
                        $(this).click(function (event) {
                              event.preventDefault();
                              $(scrollElem).animate({ scrollTop: targetOffset }, 400, function () {
                                    location.hash = target;
                              });
                        });
                  }
            }
      });

      // use the first element that is "scrollable"
      function scrollableElement(els) {
            for (var i = 0, argLength = arguments.length; i < argLength; i++) {
                  var el = arguments[i],
                        $scrollElement = $(el);
                  if ($scrollElement.scrollTop() > 0) {
                        return el;
                  } else {
                        $scrollElement.scrollTop(1);
                        var isScrollable = $scrollElement.scrollTop() > 0;
                        $scrollElement.scrollTop(0);
                        if (isScrollable) {
                              return el;
                        }
                  }
            }
            return [];
      }

      /*
      * @function: Rearranges DOM for mobile
      * @event: DOM ready
      * @returns: void
      */
      function createMobileNav(){
            if ($(window).width() < 1025) {
                  subNavItems = $('.menu-panel[data-level="1"] .menu-group');
                  $.each(subNavItems, function () {
                        var groupNumber = $(this).attr('data-group');
                        var subMenu = $(this).detach();
                        $('.menu-panel[data-level="0"] .menu-parent[data-group="' + groupNumber + '"]').after(subMenu);
                        var subItem = {
                              id: groupNumber,
                              open: false
                        }
                        navState.subNav.push(subItem);
                  });
                  $('.menu-parent').click(function(){
                        var groupNumber = $(this).attr('data-group');
                        var isSelected = -1;
                        $.each(navState.subNav,function(index){
                              if (navState.subNav[index].open == true){
                                    isSelected = navState.subNav[index].id;
                              }
                        });
                        if (isSelected == groupNumber){
                              mutateState(false,groupNumber);     
                        } else {
                              mutateState(true,groupNumber);
                        }
                  });
            }
            if ($(window).width() > 1025) {
                  if (typeof subNavItems != 'undefined'){
                        $.each(subNavItems, function () {
                              $('.menu-panel[data-level="1"]').append($(this));
                        });
                  }
            }
      }

      createMobileNav();

      
      /*
      * @function: Adds class when logged in for mobile styles
      * @event: DOM ready
      * @returns: void
      */
      checkLoginState();

      /*
      * @function: Scrolls back to the top of page
      * @event: DOM ready
      * @returns: void
      */
      $('.form-back-to-top').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
      });

      

      $(window).scroll(function () {
            var minThreshold = $(window).height() * 2;
            if (/iPad/i.test(navigator.userAgent)) {
                  minThreshold = $(window).height() / 2;
            }
            var maxThreshold = $('body').height() - $(window).height() - 500;
            if ($(window).scrollTop() >= minThreshold && $(window).scrollTop() <= maxThreshold) {
                  $('.form-back-to-top').addClass('show');
            } else {
                  $('.form-back-to-top').removeClass('show');
            }
      });

      /*
      * @function: Expands quicklinks on mobile
      * @event: DOM ready
      * @returns: void
      */

      $('.mobile-quick-links h3').click(function () {
            $('.mobile-quick-links h3').toggleClass('open');
            $('.mobile-quick-links ul').slideToggle();
      });

      /*
      * @function: Mobile tool tips
      * @event: DOM ready
      * @returns: void
      */
      enableToolTips();

      /*
      * @function: List Accordions
      * @event: DOM ready
      * @returns: void
      */
      $('.cover').click(function () {
            if ($(this).hasClass('open') == false){
                  setTimeout(function(){
                        $("html, body").animate({
                              scrollTop: $('.cover.open').offset().top - 70
                        }, 300);
                  },450);
            }
            $('.cover').removeClass('open');
            $(this).addClass('open');
      });

      /*
      * @function: Dashboard Accordions
      * @event: DOM ready
      * @returns: void
      */
      if ($('.page-mfc-manage-my-account').length > 0) {

            var disabledAccounts = $('.toggle_deal_disabled');
            $.each(disabledAccounts, function () {
                  $(this).closest('.deal_preview').addClass('disabled');
            });

      //      $('.deal_information').click(function () {
           $('.deal_wrapper').click(function () {
                  if ($('.deal_information',this).hasClass('active') == false){
                        $('.deal_information.active + ul', this).removeClass('active');
                        $('.deal_information.active', this).removeClass('active');
                        $('.toggle_deal.open').trigger("click");
                        $('.toggle_deal', this).removeClass("open");
                  }

                  var topParent = $('.deal_information',this).closest('.deal_preview');
                   if ($('.toggle_deal', topParent).length > 0) {
                        $('.toggle_deal', topParent).trigger("click");
                        $('.toggle_deal', topParent).toggleClass("open");
                        $('.deal_information + ul', topParent).toggleClass('active');
                        $('.deal_information',this).toggleClass('active');
                  }
                  if (ios == false){
                        if ($('.deal_information',this).hasClass('active')){
                              setTimeout(function () {
                                    $("html, body").animate({
                                          scrollTop: $('.deal_information', topParent).offset().top - 70
                                    }, 300);
                              }, 425);
                        }
                  }
            });
      }

      if(jQuery('#popupForm_my_profile').hasClass('modal--visible')){
            enableProfileAccordions();
      }

      $('.deal_preview .tooltip_info img').click(function () {
            $(this).toggleClass('active');
      });

      mobilePaginaton();

      $(window).resize(function () {
            mobilePaginaton();
      });

      if (ios == true) {
            $('body').addClass('ios');
      }

      if ($('.upcoming-auction .auction__detail__sub_heading').length > 0) {
            tableRows = $('.upcoming-auction .auction__detail__sub_heading + table tr');
            updateTable(tableThresh.min,tableThresh.max);
            $('.pagination__next').click(function(e){
                  e.preventDefault();
                  nextTable();
            });
            $('.pagination__prev').click(function(e){
                  e.preventDefault();
                  prevTable();
            });
      }

      if (ios == true){
            window.onresize = iOSResize;
            window.onscroll = iOSResize;
            var initHeight = window.innerHeight;

            window.addEventListener("orientationchange", function() {
                  iOSResize();
                  closeNav();
                  if (window.innerWidth < 925) {
                        $('.step-by-step__body').hide();
                  } else {
                        $('.step-by-step__body').show();
                  }
            });

            function iOSResize(){
                  var newHeight = window.innerHeight;
                  if (window.innerHeight < window.innerWidth){
                        //Landscape
                        $('.mobile-shortlinks').css('margin-top','0px');
                  } else {
                        //Portrait
                        if (/iPhone|iPod/i.test(navigator.userAgent)) {
                              if (safari == false){
                                    if (newHeight > initHeight){
                                          $('.mobile-shortlinks').css('margin-top','0px');
                                    } else {
                                          $('.mobile-shortlinks').css('margin-top','-68px');
                                    }     
                              } else {
                                    $('.mobile-shortlinks').css('margin-top','0px');
                              }
                        } else if (/iPad/i.test(navigator.userAgent)) {
                              $('.mobile-shortlinks').attr('style','transform:translateY('+newHeight+'px)');
                        }
                  }
                  //Tests for Zoom. FML
                  if ((document.body.clientWidth / window.innerWidth) > 1.1){
                        $('.mobile-shortlinks').css('display','none');
                  } else {
                        $('.mobile-shortlinks').css('display','block');
                  }
            }
      }

      //Fixes Bottom nav showing on iOS when keyboard is visible
      if('ontouchstart' in window){
            $(document).on('focus', 'textarea,input,select',function(){
                  $('.mobile-shortlinks').css('position','absolute').css('width','100vw');
                  if ($(this).hasClass('hasDatepicker')){
                        $('.session-overlay').css('display','block');
                  }
            }).on('blur', 'textarea,input,select', function() {
                  $('.mobile-shortlinks').css('position','').css('width','');
                  $('.session-overlay').css('display','none');
            });
      }
      var clickables = $('.nosui-form-select .nosui-form-select__item');

      clickables.each(function () {
            $(this).attr('data-gtmdata-tracking-event-category', 'Body');
            $(this).attr('data-gtmdata-tracking-event-action', 'Contact Us');
            $(this).attr('data-gtmdata-tracking-event-label', $(this).text());
      });

      updateGetInTouch();

      // Update Footer Get in touch GTM tracking label attr value
      function updateGetInTouch() {
            jQuery('.contact-info__copy-link').attr('data-gtmdata-tracking-event-label', 'Get in touch (' + jQuery('.contact-info .nosui-form-select__placeholder').text() + ")");
      }

      jQuery('.contact-info__select').change(function () {
            updateGetInTouch();
      });

}); // on DOM readys

var freezeVp = function(e) {
      e.preventDefault();
};

function stopBodyScrolling (bool) {
      if (bool === true) {
            document.body.addEventListener("touchmove", freezeVp, false);
            console.info('Scrolling has been disabled');
      } else {
            document.body.removeEventListener("touchmove", freezeVp, false);
            console.info('Scrolling now is enabled');
      }
}

function enableProfileAccordions(){
      if(window.innerWidth < 718){
            jQuery('#popupForm_my_profile div[id^="header_"]').click(function(){
                  var headerId = jQuery(this).attr('id');
                  var sectionSplit = headerId.split('header_');
                  var sectionId = sectionSplit[1];
                  var shouldClose = jQuery('#header_' + sectionId).hasClass('open_profile');

                  jQuery('#popupForm_my_profile div[id^="toggle_arrow_"]').addClass("toggle_arrow_down");
                  jQuery('#popupForm_my_profile div[id^="toggle_arrow_"]').removeClass("toggle_arrow_up");
                  jQuery('#popupForm_my_profile div[id^="expanded_"]').hide();
                  jQuery('#popupForm_my_profile div[id^="header_"]').removeClass("open_profile");
                  jQuery('#popupForm_my_profile div[id^="header_"]').addClass("closed_profile");
                  
                  jQuery("#toggle_arrow_" + sectionId).removeClass("toggle_arrow_down");
                  jQuery("#toggle_arrow_" + sectionId).addClass("toggle_arrow_up");
                  jQuery("#expanded_" + sectionId).show();
                  jQuery("#header_" + sectionId).addClass("open_profile");
                  jQuery("#header_" + sectionId).removeClass("closed_profile");

                  if (shouldClose == false){
                        jQuery('#popupForm_my_profile div[id^="toggle_arrow_"]').addClass("toggle_arrow_down");
                        jQuery('#popupForm_my_profile div[id^="toggle_arrow_"]').removeClass("toggle_arrow_up");
                        jQuery('#popupForm_my_profile div[id^="expanded_"]').hide();
                        jQuery('#popupForm_my_profile div[id^="header_"]').removeClass("open_profile");
                        jQuery('#popupForm_my_profile div[id^="header_"]').addClass("closed_profile");
                  }
                  

                  setTimeout(function(){
                        jQuery(".modal--visible #my_profile_form").animate({ 
                              scrollTop: jQuery('#header_' + sectionId).position().top + 70
                        }, 600);
                  },400);
            });
      }
}

function handleNav() {
      //Primary nav
      if (navState.open == true){
            if (userMenuState.open == true){
                  closeUserMenu();
            }
            if (searchState == true){
                  searchCloseHandler();
            }
            jQuery('html, body').addClass('locked');
            jQuery('.nav').addClass('open');
            jQuery('.js-panel-menu').addClass('open');
      } else {
            jQuery('html, body').removeClass('locked');
            jQuery('.nav').removeClass('open');
            jQuery('.js-panel-menu').removeClass('open');
            if (ios == true){
                  jQuery('body').unbind('touchend', closeNav);
                  stopBodyScrolling(false);
            } else {
                  jQuery('body').unbind('click', closeNav);
            }
      }
      //Sub nav
      jQuery.each(navState.subNav, function(index){
            if (navState.subNav[index].open == true){
                  jQuery('.menu-parent').removeClass('mobile-active');
                  jQuery('.menu-group[data-group]').removeClass('mobile-active');
                  jQuery('.menu-parent[data-group="' + navState.subNav[index].id + '"]').addClass('mobile-active');   
                  jQuery('.menu-group[data-group="' + navState.subNav[index].id + '"]').addClass('mobile-active');
            } else {
                  jQuery('.menu-parent[data-group="' + navState.subNav[index].id + '"]').removeClass('mobile-active');   
                  jQuery('.menu-group[data-group="' + navState.subNav[index].id + '"]').removeClass('mobile-active');
            }
      });
      if (ios == true){
            if (jQuery('.panel-viewport').height() > (jQuery(window).height() - 60)){
                  stopBodyScrolling(false);
            } else {
                  stopBodyScrolling(true);
            }
      }
}

function mutateState(bool, id){
      if (id != 'root'){
            for (var i=0; i < navState.subNav.length; i++){
                  if (navState.subNav[i].id == id){
                        navState.subNav[i].open = bool;
                  } else {
                        navState.subNav[i].open = false;
                  }
            }
      } else {
            navState.open = bool;
            for (var i=0; i < navState.subNav.length; i++){
                  navState.subNav[i].open = false;
            }
      }
      handleNav();
}

var closeNav = function(){
      mutateState(false, 'root');
      stopBodyScrolling(false);
}

function nextTable(){
      if ((tableThresh.min + 12) < tableRows.length){
            jQuery('.pagination__next').removeClass('hidden');
            tableThresh.min += 12;
            tableThresh.max += 12;
            if ((tableThresh.min + 12) > tableRows.length){
                  jQuery('.pagination__next').addClass('hidden');
            }
            if (tableThresh.min > 0){
                  jQuery('.pagination__prev').removeClass('hidden'); 
            } else {
                  jQuery('.pagination__prev').addClass('hidden');
            }
      }
      updateTable();
      jQuery("html, body").animate({ 
            scrollTop: jQuery('.upcoming-auction .auction__detail__sub_heading + table').offset().top - 70
      }, 600);
}

function prevTable(){
      if ((tableThresh.min - 12) >= 0){
            tableThresh.min -= 12;
            tableThresh.max -= 12;
            if ((tableThresh.min - 12) < 0){
                  jQuery('.pagination__prev').addClass('hidden');
            }
            if (tableThresh.max < tableRows.length){
                  jQuery('.pagination__next').removeClass('hidden'); 
            } else {
                  jQuery('.pagination__next').addClass('hidden');
            }
      }

      updateTable();
      jQuery("html, body").animate({ 
            scrollTop: jQuery('.upcoming-auction .auction__detail__sub_heading + table').offset().top - 70
      }, 600);
}

function updateTable() {
      jQuery.each(tableRows, function (index) {
            if (index >= tableThresh.min && index < tableThresh.max) {
                  jQuery(this).removeClass('mobile-hidden');
            } else {
                  jQuery(this).addClass('mobile-hidden');
            }
      });
}


function mobilePaginaton() {
      if (jQuery('.pagination__numbers__block').length > 0) {
            var activeItem = jQuery('.pagination__numbers__block .pagination__numbers--active');
            if (jQuery(window).width() > 420 && jQuery(window).width() < 830) {
                  activeItem.next().addClass('display-mobile');
                  activeItem.next().next().addClass('display-mobile');
                  activeItem.prev().addClass('display-mobile');
                  activeItem.prev().prev().addClass('display-mobile');
            }
            if (jQuery(window).width() < 420) {
                  activeItem.next().addClass('display-mobile');
                  activeItem.prev().addClass('display-mobile');
                  activeItem.next().next().removeClass('display-mobile');
                  activeItem.prev().prev().removeClass('display-mobile');
            }
      }
}


function writeMailTo(recipient, domain, hrefDomId) {

      jQuery("#" + hrefDomId).attr("href", "mailto:" + recipient + "@" + domain);

}

function mutateSearchState(bool){
      searchState = bool;
      handleSearch();
}

var searchCloseHandler = function(){
      if (window.innerWidth < 1023){
            mutateSearchState(false);
      }
};

function handleSearch(){
      if (searchState == true){
            if (navState.open == true){
                  closeNav();
            }
            if (userMenuState.open == true){
                  closeUserMenu();
            }
            setTimeout(function(){
                  jQuery('html, body').addClass('locked').addClass('search');
            },400);
            jQuery('.header__search-box').addClass('active');
            jQuery('.header__search-box').slideDown(400);
            jQuery('.js-search').focus();
            jQuery('body').bind('click', searchCloseHandler);

      } else {
            jQuery('html, body').removeClass('locked').removeClass('search');
            jQuery('.header__search-box').removeClass('active');
            jQuery('.header__search-box').slideUp(400);
            jQuery('body').unbind('click', searchCloseHandler);
      }
}

function mutateProfileState(bool){
      userMenuState.open = bool;
      handleUserMenu();
}

var closeUserMenu = function(){
      mutateProfileState(false);     
}

function handleUserMenu(){
      if (userMenuState.open == true){
            if (navState.open == true){
                  closeNav();
            }
            if (searchState == true){
                  searchCloseHandler();
            }
            jQuery('.auth').addClass('open');
            jQuery('html, body').addClass('locked');
            if (ios == true){
                  stopBodyScrolling(true);
            }
            jQuery('body').bind('click', closeUserMenu);
      } else {
            jQuery('.auth').removeClass('open');
            jQuery('html, body').removeClass('locked');
            if (ios == true){
                  stopBodyScrolling(false);
            }
            jQuery('body').unbind('click', closeUserMenu);
      }
}

function checkLoginState() {
      if (jQuery('.header-loggedin').length > 0) {
            jQuery('.header__login').addClass('auth');
            jQuery('.auth').click(function(e) {
                  e.stopPropagation();
                  if (userMenuState.open == true) {
                        mutateProfileState(false);
                  } else {
                        mutateProfileState(true);
                  }
            });
            jQuery('.auth a').click(function (e) {
                  e.stopPropagation();
            });
            //This will stop the flash of user menu
            setTimeout(function(){
                  jQuery('.header__login').css('opacity',1);
                  jQuery('#header_login').css('opacity',1);
            },700);
      } else {
            jQuery('.header__login').removeClass('auth');
      }
}

function enableToolTips() {
      if (jQuery(window).width() < 1025) {
            jQuery('.form__tooltip-wrap .icon').on('mouseover', function () {
                  return false;
            });

            jQuery('.form__tooltip-wrap .icon').on('mouseout', function () {
                  return false;
            });

            jQuery('.form__tooltip-wrap').on('click', function () {
                  jQuery(this).toggleClass('active');
            });
      }
      if (jQuery(window).width() < 767) {
            jQuery('.form__tooltip-wrap').on('click', function () {
                  if (jQuery('.budget-calculator').length > 0) {
                        var tipHeight = jQuery('.form__tooltip', this).outerHeight();
                        jQuery('.form__tooltip', this).css('bottom', (tipHeight * -1) + 'px');
                        jQuery(this).closest('.table__tr').css('padding-bottom', tipHeight + 10 + 'px');
                  }
                  if (jQuery('.instalment-calculator').length > 0) {
                        var tipHeight = jQuery('.form__tooltip', this).outerHeight();
                        jQuery('.form__tooltip', this).css('bottom', ((tipHeight + 10) * -1) + 'px');
                        jQuery(this).siblings('.form__form-input, .nosui-calculator-form-select').css('margin-bottom', tipHeight + 15 + 'px');
                  }
                  if (jQuery('div[id^="popupForm"]').hasClass('modal--visible')) {
                        var tipHeight = jQuery('.form__tooltip', this).outerHeight();
                        jQuery('.form__tooltip', this).css('bottom', (tipHeight * -1) + 'px');
                        jQuery(this).closest('label').css('margin-bottom', tipHeight + 10 + 'px');
                  }
                  if (jQuery('.mfc-fees').length > 0) {
                        var tipHeight = jQuery('.form__tooltip', this).outerHeight();
                        jQuery('.form__tooltip', this).css('bottom', (tipHeight * -1) + 'px');
                        jQuery(this).closest('tr').css('margin-bottom', tipHeight + 10 + 'px');
                  }
            });
      }
}
