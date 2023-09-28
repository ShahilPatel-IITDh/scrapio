(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Copy of checkURL from analytics.js - 04/16/2021
var convertToAbsoluteUrl = function convertToAbsoluteUrl(clickedURL) {
  var href = "";
  if ((typeof clickedURL === "undefined" ? "undefined" : _typeof(clickedURL)) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) && clickedURL !== false) {
    href = clickedURL;
    var domain = "https://about.att.com";

    if (href.indexOf("content/dam/") != -1) {
      href = href.replace("content/dam", "ecms/dam");
    }

    if (href == "null") {
      href = domain;
    }

    if (!href.startsWith("https") && !href.startsWith("http") && !href.startsWith("javascript:void(0)") && !href.startsWith("#") && !href.startsWith("mailto")) {
      href = domain + href;
    }
  }

  return href;
};
exports.default = convertToAbsoluteUrl;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Fetch/XHR
// This utility fetches an external resource

var fetchResource = function fetchResource(requestType, requestURL, requestFormat, callback, errMsg) {
  var errorMessage = errMsg ? errMsg : "Sorry. There was an issue loading the requested data.";

  if (requestFormat === "jsonp") {
    // if dealing with jsonp, use empty data type and make sure callback is string is added to request
    requestURL = requestURL + '&callback=?';
    requestFormat = "";
  }

  if (window.$) {
    // if jQuery is present, use jQuery ajax
    $.ajax({
      type: requestType, // ie "GET" or "POST"
      url: requestURL,
      dataType: requestFormat,
      success: function success(data) {
        callback(data);
      },
      error: function error(e) {
        console.log(errorMessage);
      }
    });
  } else {
    // otherwise, use a traditional XHR request for cross-browser compatibility
    console.log('No jQuery here. Switching to an XHR handler for this request.');

    var request = new XMLHttpRequest();

    request.open(requestType, requestURL, true);
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          var data = void 0;

          // Parse the data if need be
          if (requestFormat === "json") {
            data = JSON.parse(this.responseText);
          } else {
            data = this.responseText;
          }

          // Pass the data to the provided callback function
          callback(data);
        } else {
          // Handle any errors
          console.log(errorMessage);
        }
      }
    };

    request.send();
    // request = null;
  }
};

exports.default = fetchResource;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Globally Used Values
// These are values that are used across components

var desktopNavSize = exports.desktopNavSize = 768;

var isIE = exports.isIE = document.body.style.msTouchAction !== undefined;

},{}],4:[function(require,module,exports){
'use strict';

var _fetchResource = require('./_utilities/fetch-resource');

var _fetchResource2 = _interopRequireDefault(_fetchResource);

var _convertUrl = require('./_utilities/convert-url');

var _convertUrl2 = _interopRequireDefault(_convertUrl);

var _globalValues = require('./_utilities/global-values');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!("nextElementSibling" in document.documentElement)) {
  Object.defineProperty(Element.prototype, "nextElementSibling", {
    get: function get() {
      var e = this.nextSibling;
      while (e && 1 !== e.nodeType) {
        e = e.nextSibling;
      }return e;
    }
  });
} // ================================================= //
// AT&T About Us - Global Header/Navigation & Footer //
// ================================================= //
// FleishmanHillard, c. 2018

(function () {
  "use strict";

  // Pull in our global navigation and footer JSON

  var navData = dataSources.globalNav.path;
  var navDataFormat = dataSources.globalNav.format;
  (0, _fetchResource2.default)("GET", navData, navDataFormat, initNavigation, "Sorry. There was an issue loading the requested data.");

  // ==============
  // initNavigation - this function kicks-off the JSON request (supports IE9+) and passes the data to renderNavigation and/or renderFooter
  // ==============

  function initNavigation(data) {
    // If we have header navigation items in the data, then build the header navigation.
    if (data["nav-items"] && data["nav-items"].length > 0) {
      renderNavigation(data["nav-items"]);
      AddClickEventHandlerForGlobalNav();
    }

    // If we have footer navigation items in the data, then build the footer navigation.
    if (data["footer-items"] && data["footer-items"].length > 0) {
      renderFooter(data["footer-items"]);
      AddClickEventHandlerForFooter();
    }
  }

  function AddClickEventHandlerForGlobalNav() {
    //global navigation items
    var navLinks = document.querySelectorAll("nav a");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = navLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var navLink = _step.value;

        navLink.addEventListener("click", function (e) {
          var url = (0, _convertUrl2.default)(e.currentTarget.href);
          var additionalData = {
            'linkName': e.currentTarget.ariaLabel,
            'linkDestinationURL': url,
            'linkPosition': 'Global Navigation component'
          };
          ddo.pushEvent('linkClick', 'Link_Click', additionalData);
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  function AddClickEventHandlerForFooter() {
    //Global footer items
    var footerLinks = document.querySelectorAll("footer a");
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = footerLinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var footerLink = _step2.value;

        footerLink.addEventListener("click", function (e) {
          var url = (0, _convertUrl2.default)(e.currentTarget.href);
          var additionalData = {
            'linkName': e.currentTarget.ariaLabel,
            'linkDestinationURL': url,
            'linkPosition': 'Global Footer component'
          };
          ddo.pushEvent('linkClick', 'Link_Click', additionalData);
        });
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  // ==============
  // renderLinkList - this function renders a set of links and gets used by both renderNavigation and renderFooter
  // ==============

  var renderLinkList = function renderLinkList(linkList, listLocation, listLevel) {
    // console.log(`Rendering links for the ${listLevel ? listLevel : ``} ${listLocation}`);

    if (!linkList || !linkList.length > 0) {
      // we don't actually have any links here, abort mission

      console.log("No links were found in the provided set.");
      return;
    } else {

      // Define the wrapping element (<ul>) for our link list & apply the appropriate class to it based on the location and level of the list

      var listModifier = listLevel ? '--' + listLevel : '';

      var listClasses = void 0;

      if (listLevel) {
        listClasses = listLocation + '__menu' + ' ' + listLocation + '__menu' + listModifier;

        if (listLevel === "secondary" || listLevel === "tertiary") {
          listClasses += " nav__menu--nested";
        }
      } else {
        listClasses = listLocation + '__menu';
      }

      var renderLinks = linkList.map(function (link, index) {

        // Gather list item's properties from JSON obj

        var linkTitle = link.title;
        var linkURL = link.url;
        var linkSubMenu = link.subNav;
        var linkTarget = link.target || '';
        var linkClass = link.className || '';
        var linkIcon = link.icon;
        var linkIconPosition = link.iconPosition;
        var linkIconTitle = link.iconTitle;

        var linkStructure = void 0;
        var linkClassList = linkClass;
        var linkNestLevel = void 0;
        var linkIconHtml = '';

        // Set up the inner structure of the link

        //If there is an image and there is an icon title set then we run this
        if (linkIcon && linkIcon !== null && linkIcon !== "" && linkIconTitle && linkIconTitle !== null && linkIconTitle !== "") {
          //checking if the image goes before or after the text link
          if (linkIconPosition && linkIconPosition === 'before') {
            linkIconHtml = '<img class="footer-icon-right" src="' + linkIcon + '" title="' + linkIconTitle + '" alt="' + linkIconTitle + '" />';
          } else {
            linkIconHtml = '<img class="footer-icon-left" src="' + linkIcon + '" title="' + linkIconTitle + '" alt="' + linkIconTitle + '" />';
          }
        }
        //If there is an image and there is no icon title set then we leave the title blank and fill in the alt tag with the link text
        if (linkIcon && linkIcon !== null && linkIcon !== "" && (linkIconTitle === null || linkIconTitle === undefined || linkIconTitle === "")) {
          //checking if the image goes before or after the text link
          if (linkIconPosition && linkIconPosition === 'before') {
            linkIconHtml = '<img class="footer-icon-right" src="' + linkIcon + '" title="" alt="' + linkTitle + ' icon" />';
          } else {
            linkIconHtml = '<img class="footer-icon-left" src="' + linkIcon + '" title="" alt="' + linkTitle + ' icon" />';
          }
        }
        //If there is no image and just text link we go here
        if (linkURL && linkURL !== null && linkURL !== "") {
          // If we have a menu item with a click-through destination...
          linkStructure = '<a href="' + linkURL + '" role="menuitem" aria-label="' + linkTitle + '" ' + (listLocation === "nav" ? 'class="nav__menu-item"' : '') + ' ' + (linkTarget && 'target="' + linkTarget + '"') + '"><span>' + linkTitle + '</span></a>';
          if (linkIconPosition && linkIconPosition === 'before') {
            linkStructure = linkIconHtml + linkStructure;
          } else {
            linkStructure += linkIconHtml;
          }

          // And if it has a sub-menu...
          if (linkSubMenu && linkSubMenu.length > 0) {
            linkStructure += '<a href="#" aria-label="' + linkTitle + ' sub-menu" ' + (listLocation === "nav" ? 'class="nav__menu-parent"' : '') + ' aria-haspopup="true" aria-expanded="false"></a>';
          }
        } else {
          // If we have a non-destination menu item...
          linkStructure = '<span aria-label="' + linkTitle + '" ' + (listLocation === "nav" ? 'role="menuitem" class="nav__menu-item"' : '') + '><span>' + linkTitle + '</span></span>';

          // And if it has a sub-menu...
          if (linkSubMenu && linkSubMenu.length > 0) {
            linkStructure += '<a href="#" aria-label="' + linkTitle + ' sub-menu" ' + (listLocation === "nav" ? 'class="nav__menu-parent"' : '') + ' aria-haspopup="true" aria-expanded="false"></a>';
          }
        }

        // Set up the link class list

        if (linkClass !== "") {
          if (document.body.classList.contains(linkClass)) {
            linkClassList += " active";
          }
        }

        // Determine what level sub-nav we're building, if any

        if (linkSubMenu && linkSubMenu.length > 0) {
          linkNestLevel = listLevel === "secondary" ? "tertiary" : "secondary";
        }

        // Loop through the individual links in the list and build them as list items (<li>)

        return '\n          <li role="presentation" ' + (linkClassList !== "" ? 'class="' + linkClassList + '"' : '') + '>\n            ' + linkStructure + '\n            ' + (linkSubMenu ? renderLinkList(linkSubMenu, listLocation, linkNestLevel) : '') + '\n          </li>\n        ';
      });

      var listWrap = '\n        <ul ' + (listLevel === "primary" && document.documentElement.clientWidth < _globalValues.desktopNavSize ? 'aria-hidden="true"' : '') + ' role="menu" class="' + listClasses + '">\n          ' + renderLinks.join('') + '\n        </ul>\n      ';

      return listWrap;
    }
  };

  // ================
  // renderNavigation - this function constructs the global nav structure (using renderLinkList) and appends it to the DOM
  // ================

  var renderNavigation = function renderNavigation(data) {
    var navTarget = document.getElementById("att-about-header"); // main header area
    var microNavTarget = document.getElementById("att-microsite-header"); // secondary header area (for microsite navigation)


    if (!navTarget) {
      // our target element doesn't exist, abort mission

      console.log("Global navigation will not be built - the target nav element doesn't exist.");
      return;
    } else {
      // begin constructing the nav
      // Create off-canvas wrapper for mobile nav

      var body = document.querySelector('body');
      var canvasWrap = document.createElement("div");
      var canvas = document.createElement("div");
      canvasWrap.className = "wrapper";
      canvas.className = "canvas";

      // Move body contents into the new off-canvas wrapper

      if (body.firstChild) {
        var loopVariable = 0;
        while (loopVariable < body.childNodes.length) {
          if (body.childNodes[loopVariable].tagName != "SCRIPT") {
            canvas.appendChild(body.childNodes[loopVariable]);
          } else {
            loopVariable++;
          }
        }
      }
      canvasWrap.appendChild(canvas);
      body.insertBefore(canvasWrap, body.childNodes[0]);

      // Add Skip Navigation before header elements

      var skipNav = '\n        <div class="skip-navigation">\n          <a href="#page" role="link" aria-label="Skip Navigation">Skip Navigation</a>\n        </div>\n      ';
      navTarget.insertAdjacentHTML("beforebegin", skipNav);
      // const pageElem = document.getElementById("page");
      // pageElem.tabIndex = -1;

      // Create main navigation elements

      var navHTML = '\n        <div class="att-about-header__wrap">\n          <nav role="navigation" class="nav">\n            <div class="nav__utils">\n              <a aria-label="Welcome to AT&amp;T" href="/" class="nav__logo">\n                <i class="logo__icon"></i>\n              </a>\n              <button type="button" role="button" aria-label="Toggle Navigation" class="nav__toggle nav__toggle--open">\n                <span class="bar"></span>\n                <span class="bar"></span>\n                <span class="bar"></span>\n              </button>\n            </div>\n            ' + renderLinkList(data, "nav", "primary") + '\n            <button type="button" role="button" tabIndex="-1" aria-label="Close Navigation" class="nav__toggle nav__toggle--close">\n              <span class="bar"></span>\n              <span class="bar"></span>\n            </button>\n\n          </nav>\n        </div>\n      ';

      // Append the navigation to the DOM

      navTarget.innerHTML = navHTML;
      //if microsite header parsys exists
      if (microNavTarget !== null) {
        var NavTargetWrap = document.querySelector('.att-about-header__wrap');
        var microNavComponent = microNavTarget.querySelector('.microsite-nav');
        //if microsite nav component exists in the microsite header parsys  
        if (microNavComponent != null) {
          microNavComponent.classList.add("microsite-nav--plusGlobal");
          microNavTarget.classList.add('plusGlobal');
          if (navTarget.classList.contains('header--transparent')) {
            navTarget.classList.remove("header--transparent");
          }
          NavTargetWrap.classList.add("plusMicrosite");
        }
      }
      // Add skip nav function to the skip navigation link

      var skipNavLink = document.querySelector(".skip-navigation");
      skipNavLink.addEventListener("click", handleSkipNav);

      // Add off-canvas toggle function to the nav navToggles

      var navToggles = document.querySelectorAll(".nav__toggle");
      for (var i = 0; i < navToggles.length; i++) {
        var navToggle = navToggles[i];
        navToggle.addEventListener("click", handleBurgerClick);
      }

      // Add sub-nav toggle function to the nav items that have sub-navs

      var parentItems = document.querySelectorAll(".nav__menu-parent");
      for (var _i = 0; _i < parentItems.length; _i++) {
        var parentItem = parentItems[_i];
        parentItem.addEventListener("click", handleParentClick);
        parentItem.addEventListener("focus", handleKeyFocus);
      }
    }
  };

  // ============
  // renderFooter - this function constructs the global footer structure (using renderLinkList) and appends it to the DOM
  // ============

  var renderFooter = function renderFooter(data) {
    var footerTarget = document.getElementById("att-about-footer");

    if (!footerTarget) {
      // our target element doesn't exist, abort mission

      console.log("Global footer will not be built - the target footer element doesn't exist.");
      return;
    } else {

      // Create main footer elements

      var year = new Date().getFullYear();
      var footerHTML = '\n        <div class="footer__wrap">\n          ' + renderLinkList(data, "footer") + '\n          <div class="footer__copyright">\n            <p>&copy; ' + year + ' AT&amp;T Intellectual Property. All rights reserved.</p>\n          </div>\n        </div>\n      ';

      // Append the footer to the DOM

      footerTarget.innerHTML = footerHTML;
    }
  };

  // Add function to close other open nav primary-level nav items when opening a new one
  // document.addEventListener("click", closeAllNavs); // for desktop
  if (document.documentElement.classList.contains("touchevents")) {
    var primaryNav = document.querySelector(".nav__menu--primary");
    var openNavItems = document.querySelectorAll("a.expanded");
    primaryNav.addEventListener("click", function () {
      for (var i = 0; i < openNavItems.length; i++) {
        var openNavItem = openNavItems[i];
        openNavItem.classList.remove("expanded");
      }
    });
  }

  // ===============
  // Event Listeners - various event listeners used by the global nav and footer
  // ===============

  // handleBurgerClick - toggles the mobile off-canvas nav

  function handleBurgerClick(e) {
    var nav = document.querySelector("#att-about-header .nav");
    var canvas = document.querySelector(".wrapper > .canvas");
    var openNavItems = document.querySelectorAll("a.expanded");
    var primaryNav = document.querySelector(".nav__menu--primary");
    var mainContent = document.getElementById("page");
    var touchDevice = document.querySelector("html").classList.contains("touchevents");

    nav.classList.toggle("nav--open");
    canvas.classList.toggle("canvas--on");

    if (!nav.classList.contains("nav--open")) {
      // If nav is closing...
      closeAllNavs(e);

      // For Mobile Devices
      if (document.documentElement.clientWidth < _globalValues.desktopNavSize && touchDevice) {
        primaryNav.setAttribute("aria-hidden", "true");
        if (mainContent) {
          mainContent.setAttribute('tabindex', '-1');
        }
        // mainContent.focus({preventScroll: true});
      }
    } else {
      // If nav is opening...
      if (document.documentElement.clientWidth < _globalValues.desktopNavSize && touchDevice) {
        primaryNav.setAttribute("aria-hidden", "false");
        e.target.blur();
      }
    }
  }

  // handleParentClick - toggles sub-navs for any links that have sub-navs

  function handleParentClick(e) {
    var parentLI = e.target.parentNode;
    var childUL = e.target.nextElementSibling;
    e.preventDefault();

    // toggle subnav
    parentLI.classList.toggle("expanded");

    // change aria expanded property to reflect expanded state
    if (parentLI.classList.contains("expanded")) {
      e.target.setAttribute("aria-expanded", "true");
      childUL.setAttribute("aria-hidden", "false");
    } else {
      e.target.setAttribute("aria-expanded", "false");
      childUL.setAttribute("aria-hidden", "true");
    }
  }

  // handleKeyFocus - makes global nav keyboard accessible (via tabbing) for desktop devices

  function handleKeyFocus(e) {
    var winWidth = window.innerWidth;
    var parentLI = e.target.parentNode;
    var parentUL = e.target.parentNode.parentNode;
    var openNavItems = document.querySelectorAll("li.expanded");
    var parentTarget = e.target.classList.contains("nav__menu-parent");

    if (winWidth >= _globalValues.desktopNavSize && parentTarget) {
      // if desktop and keyboard tabbing was used to focus (versus clicking)
      if (parentUL.classList.contains("nav__menu--primary")) {
        for (var i = 0; i < openNavItems.length; i++) {
          var openNavItem = openNavItems[i];
          openNavItem.classList.remove("expanded");
        }
        parentLI.classList.add("expanded");
      }
    }
  }

  // handleNavBlur - transitions nav out of keyboard access for desktop devices

  document.addEventListener("keyup", function (e) {
    var nextElem = e.target.parentElement.parentElement;

    if (e.key === "Tab" && nextElem) {
      var parentIsNav = nextElem.getAttribute("role") === "menu";
      if (!parentIsNav) {
        closeAllNavs(e);
      }
    }
  });

  // closeAllNavs - closes any previously open primary-level nav items when clicking outside the nav area

  function closeAllNavs(e) {
    var isNavLink = e.target.classList.contains("nav__menu-item") || e.target.classList.contains("nav__menu-parent");
    var parentIsNavLink = e.target.parentNode.classList.contains("nav__menu-item") || e.target.parentNode.classList.contains("nav__menu-parent");
    var openNavItems = document.querySelectorAll("li.expanded");
    var nextNavItem = e.target.parentNode && e.target.parentNode.nextElementSibling;

    // If we're clicking outside of the menu, then close all nav items upon click
    if (!isNavLink && !parentIsNavLink) {
      for (var i = 0; i < openNavItems.length; i++) {
        var openNavItem = openNavItems[i];
        openNavItem.classList.remove("expanded");
      }
    }
  }

  // skipNav - forces focus to the main content area when skipping Navigation

  function handleSkipNav(e) {
    e.preventDefault();
    var mainContent = document.getElementById("page");
    mainContent.setAttribute('tabindex', '-1');
    mainContent.focus();
    console.log("Main content should have focus now");
  }

  // shrinkNav - applies a class to the header to shrink the header on scroll

  function shrinkNav() {
    var navTarget = document.getElementById("att-about-header"); // main header area
    var microNavTarget = document.getElementById("att-microsite-header"); // secondary header area (for microsite navigation)

    if (window.pageYOffset > 40) {
      if (navTarget) {
        navTarget.classList.add("header--fixed");
      }
      if (microNavTarget) {
        microNavTarget.classList.add("header--fixed");
      }
    } else {
      if (navTarget) {
        navTarget.classList.remove("header--fixed");
      }
      if (microNavTarget) {
        microNavTarget.classList.remove("header--fixed");
      }
    }
  }
  // Add header shrink on scroll function to the nav
  window.addEventListener("scroll", shrinkNav);
})();

},{"./_utilities/convert-url":1,"./_utilities/fetch-resource":2,"./_utilities/global-values":3}]},{},[4]);
