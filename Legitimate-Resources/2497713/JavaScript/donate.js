// @license  magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-v3.0
/**
 * This file loads the Archive.org donation banner via iFrame
 * To use:
 * add the 2 elements to your page:
 * 1) element to house iframe <div id="donato"></div>
 * 2) script tag: <script type="text/javascript" src="https://archive.org/includes/donate.js"></script>
 *
 * Once the script loads, the banner will show
 * This also handles the iFrame resizing on the main page
 * and set cookies on the banner's behalf.
 *
 * @see donate.php  companion in this dir
 * @see components/donate/donate-iframe.js
 *
 * Note: `ymd` is a query param that we can add to donation banner iframe
 * that is connected to the banner CMS. It's how we test banner content.
 */

// First, see if there's a "dont show banner" cookie - if so, exit stage left.
// NOTE: also serves as a nice block scoping so nothing leaks into global space.
var donationCookie = document.cookie.split(';').filter(
  function(e) { return e.indexOf('donation=x') >= 0; }
);
var donationCookieExists = donationCookie.length > 0;

// IE doesn't support document.currentScript and we don't support IE,
// so we're just going to stop here
var supportsCurrentScript = 'currentScript' in document;

if (!donationCookieExists && supportsCurrentScript) {
  /**
   * Parses a CGI arg
   *
   * @param {string} theArgName - CGI argument name to look for
   */
  function cgiarg(theArgName) {
    var sArgs = location.search.slice(1).split('&');
    var i;
    for (i = 0; i < sArgs.length; i++) {
      if (sArgs[i].slice(0, sArgs[i].indexOf('=')) === theArgName) {
        var r = sArgs[i].slice(sArgs[i].indexOf('=') + 1);
        return (r.length > 0 ? unescape(r) : '');
      }
    }
    return '';
  }

  /* utilities */
  function addClassToEl (className, element) {
    if (!className || !element) return;
    if (element.className.indexOf(className) < 0) {
      element.className += " " + className;
    }
  }

  function removeClassFromEl (className, element) {
    if (!className || !element) return;
    if (element.className.indexOf(className) >= 0) {
      element.className = element.className.replace(className, '');
    }
  }

  function cookieValue(cookieName) {
    var cookie = document.cookie
      .split('; ')
      .find(function(row) {
        return row.startsWith(cookieName);
      });
    if (!cookie) { return; }
    return cookie.split('=')[1];
  }

  function setCookie(cookieName, cookieValue, expirationDays) {
    var isIASite = (window.location.hostname).match(/archive.org/g);
    var domainToSet = isIASite ? 'archive.org' : window.location.hostname;
    var date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var cookieString =
      cookieName +
      "=" +
      cookieValue +
      "; expires=" +
      date.toUTCString() +
      "; domain=" +
      domainToSet +
      "; path=/";
    document.cookie = cookieString;
  }

  function getDonationIdentifier() {
    var donationIdentifier;
    var donationIdentifier = cookieValue('logged-in-user');
    if (donationIdentifier === undefined) {
      donationIdentifier = cookieValue('donation-identifier');
    }
    if (donationIdentifier === undefined) {
      donationIdentifier = btoa(Math.random());
      setCookie('donation-identifier', donationIdentifier, 365);
    }
    return donationIdentifier;
  }
  /* end utilities */

  // div where iframe will go
  var donato = document.getElementById('donato');

  var donationIdentifier = getDonationIdentifier();

  // If (esp. for QA/testing) a CGI arg for earlier or later date is present in the url,
  // pass it on to the donate.php (so we can simulate how banners look like on passed in day)
  var ymd = cgiarg('ymd');
  if (ymd !== '')
    ymd = '&ymd=' + ymd;

  var variantQuery = cgiarg('variant');
  if (variantQuery !== '')
    variantQuery = '&variant=' + variantQuery;

  var host = 'archive.org';
  if (
    location.hostname === 'ia-petabox.archive.org' ||
    location.hostname.match(/^ia\-petabox\-.*\.archive\.org/)
  ) {
    host = location.hostname;
  }

  // ADD logged in sig from OL cookie to iframeQueryParams
  var sessionCookie = cookieValue('session');
  var userParam = '';
  if (location.host.match('openlibrary.org') && sessionCookie) {
    var decoded = decodeURIComponent(sessionCookie);
    var userInfo = (decoded.split(',')[0]).replace('/people/', '');
    userParam = '&user=' + encodeURIComponent(userInfo);
  }

  var platformParam = document.currentScript.getAttribute('data-platform');
  var platformQuery = platformParam ? '&platform=' + platformParam : '';
  var donationIdentifierQuery = '&donation-identifier=' + donationIdentifier;
  var referer = '&referer=' + encodeURIComponent(location.href);
  var iframeQueryParams = '?as_page=1' + referer + ymd + platformQuery + donationIdentifierQuery + variantQuery + userParam;
  var iframeURL = 'https://' + host + '/includes/donate.php' + iframeQueryParams;
  var iframeElement = '<div class="js-ia-donation-iframe-wrapper">'
    + '<iframe src="' + iframeURL + '" scrolling="no" frameborder="0" style="width:100%; height: 100%;" '
    + 'title="Banner for donating to the Internet Archive">'
    + '</iframe></div>';
  /* custom styling needed to regulate modal behavior */
  var bodyStyle = 'body.overflow-hidden { position: relative !important;'
    + 'height: auto !important; overflow: hidden !important; margin: 0 !important; }';
  var modalOpenIframeStyle = '#donato .open-modal {position: fixed !important; top: 0;'
    + 'bottom: 0; left: 0; right: 0; z-index: 1000000 !important; }';
  var iframeStyle = '.js-ia-donation-iframe-wrapper { position: relative; height: 0px; transition: height 0.5s; }'
  var keepBannerAboveAllDOM = '#donato .keep-above-all-dom { z-index: 10000000 !important; position: absolute; } ';
  var allStyles = [iframeStyle, bodyStyle, modalOpenIframeStyle, keepBannerAboveAllDOM].join(' ');
  var customStyle = '<style>' + allStyles + '</style>';
  /* Insert the iframe into the companion into #donato hook (which lives next to the `<script>` tag that included us). */
  donato.innerHTML = iframeElement + customStyle;

  /** DOM Elements */
  var bodyElement = document.querySelector('body');
  var iframeWrapper = donato.querySelector('.js-ia-donation-iframe-wrapper');
  var iframe = donato.getElementsByTagName('iframe')[0];
  /** End DOM Elements */

  /* small amount of state we need */
  var bannerIsVisible = true;
  var modalIsOpen = false;
  /**
   * We will get a small set of instructions fired to us here
   * from inside the iframe to know how to adjust
   * the banner height, show, or hide it.
   *
   * Flags & their usages:
   * `bannerIsVisible`
   *  - explicit declaration that banner is in view, this helps with
   *    height adjustments during `set height` event
   * `modalIsOpen`
   *  - when it is open, and we receive a set height event, we recalibrate &
   *    set the iframe height to make sure it covers the whole page
   *
   * PostMessage Events - see `/components/donate/donate-iframe.js`
   */
  window.addEventListener('message', function(evt) {
    if (evt.origin.indexOf('archive.org') === -1  ||  !evt.data)
      return; // not a message for us

    // Not every message that gets posted from archive.org is intended for this
    // handler and some may not be json at all. As a result, the JSON.parse() will
    // fail for certain messages. This is okay. We're doing a try/catch to
    // silence the expected errors.
    var data;
    try {
      data = JSON.parse(evt.data);
    } catch (e) {}
    if (!data) return; // something has gone wrong or this is not a message for us

    var event = data.event;
    var value = data.value && parseInt(data.value, 10);
    var bannerHeight = data.bannerHeight && parseInt(data.bannerHeight, 10);

    if (console && console.debug) console.debug('donato', data); // xxx comment out for live

    function openModal() {
      iframeWrapper.style.height = '';
      donato.style.height = value + 'px';
      iframe.style.height = '100%';
      addClassToEl('open-modal', iframeWrapper);
    }

    if (!bannerIsVisible) { return; };

    if (event === 'set height') {
      if (modalIsOpen) {
        // readjust in order for to keep modal on screen
        openModal();
      } else {
        var hasOverflowingContent = value > bannerHeight;
        var valueToSetParent = hasOverflowingContent ? bannerHeight : value;
        iframeWrapper.style.height = valueToSetParent + 'px';

        if (hasOverflowingContent) {
          addClassToEl('keep-above-all-dom', iframe);
          iframe.style.height = value + 'px';
        } else {
          removeClassFromEl('keep-above-all-dom', iframe);
          iframe.style.height = '100%';
        }
      }
    }

    if (event === 'open modal') {
      openModal();
      /* keep background steady */
      addClassToEl('overflow-hidden', bodyElement);
      /* make sure form is in view */
      window.scrollTo(0,0);
      modalIsOpen = true;
    }

    if (event === 'close modal') {
      /* release background from scroll restriction */
      removeClassFromEl('overflow-hidden', bodyElement);
      removeClassFromEl('open-modal', iframeWrapper);
      iframeWrapper.style.height = '';
      donato.style.height = '';
      modalIsOpen = false;
    }

    if (event === 'hide banner') {
      iframeWrapper.addEventListener('transitionend', function() {
        iframeWrapper.parentNode.removeChild(iframeWrapper);
      })
      iframe.style.height = '0px';
      iframeWrapper.style.height = '0px';
      bannerIsVisible = false;
      modalIsOpen = false;
    }

    if (event === 'hide banner'  ||  event === 'set cookie') {
      // Set a cookie to not show the banner for [value] days.
      // Use expires attribute, max-age is not supported by IE.
      setCookie('donation', 'x', value);
    }
  });
}
// @license-end
