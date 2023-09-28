/*
  Formalize - version 1.1

  Note: This file depends on the jQuery library.
*/

// Module pattern:
// http://yuiblog.com/blog/2007/06/12/module-pattern
var FORMALIZE = (function($, window, document, undefined) {
  // Private constants.
  var PLACEHOLDER_SUPPORTED = 'placeholder' in document.createElement('input');
  var AUTOFOCUS_SUPPORTED = 'autofocus' in document.createElement('input');
  var IE6 = !!($.browser.msie && parseInt($.browser.version, 10) === 6);
  var IE7 = !!($.browser.msie && parseInt($.browser.version, 10) === 7);

  // Expose innards of FORMALIZE.
  return {
    // FORMALIZE.go
    go: function() {
      for (var i in FORMALIZE.init) {
        FORMALIZE.init[i]();
      }
    },
    // FORMALIZE.init
    init: {
      // FORMALIZE.init.ie6_skin_inputs
      ie6_skin_inputs: function() {
        // Test for Internet Explorer 6.
        if (!IE6 || !$('input, select, textarea').length) {
          // Exit if the browser is not IE6,
          // or if no form elements exist.
          return;
        }

        // For <input type="submit" />, etc.
        var button_regex = /button|submit|reset/;

        // For <input type="text" />, etc.
        var type_regex = /date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;

        $('input').each(function() {
          var el = $(this);

          // Is it a button?
          if (this.getAttribute('type').match(button_regex)) {
            el.addClass('ie6-button');

            /* Is it disabled? */
            if (this.disabled) {
              el.addClass('ie6-button-disabled');
            }
          }
          // Or is it a textual input?
          else if (this.getAttribute('type').match(type_regex)) {
            el.addClass('ie6-input');

            /* Is it disabled? */
            if (this.disabled) {
              el.addClass('ie6-input-disabled');
            }
          }
        });

        $('textarea, select').each(function() {
          /* Is it disabled? */
          if (this.disabled) {
            $(this).addClass('ie6-input-disabled');
          }
        });
      },
      // FORMALIZE.init.autofocus
      autofocus: function() {
        if (AUTOFOCUS_SUPPORTED || !$(':input[autofocus]').length) {
          return;
        }

        $(':input[autofocus]:visible:first').focus();
      },
      // FORMALIZE.init.placeholder
      placeholder: function() {
        if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
          // Exit if placeholder is supported natively,
          // or if page does not have any placeholder.
          return;
        }

        FORMALIZE.misc.add_placeholder();

        $(':input[placeholder]').each(function() {
          var el = $(this);
          var text = el.attr('placeholder');

          el.focus(function() {
            if (el.val() === text) {
              el.val('').removeClass('placeholder-text');
            }
          }).blur(function() {
            FORMALIZE.misc.add_placeholder();
          });

          // Prevent <form> from accidentally
          // submitting the placeholder text.
          el.closest('form').submit(function() {
            if (el.val() === text) {
              el.val('').removeClass('placeholder-text');
            }
          }).bind('reset', function() {
            setTimeout(FORMALIZE.misc.add_placeholder, 50);
          });
        });
      }
    },
    // FORMALIZE.misc
    misc: {
      // FORMALIZE.misc.add_placeholder
      add_placeholder: function() {
        if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
          // Exit if placeholder is supported natively,
          // or if page does not have any placeholder.
          return;
        }

        $(':input[placeholder]').each(function() {
          var el = $(this);
          var text = el.attr('placeholder');

          if (!el.val() || el.val() === text) {
            el.val(text).addClass('placeholder-text');
          }
        });
      }
    }
  };
// Alias jQuery, window, document.
})(jQuery, this, this.document);

// Automatically calls all functions in FORMALIZE.init
jQuery(document).ready(function() {
  FORMALIZE.go();
});
;
/**
 * @todo
 */

Drupal.omega = Drupal.omega || {};

(function($) {
  /**
   * @todo
   */
  var current;
  var previous;

  /**
   * @todo
   */
  var setCurrentLayout = function (index) {
    index = parseInt(index);
    previous = current;
    current = Drupal.settings.omega.layouts.order.hasOwnProperty(index) ? Drupal.settings.omega.layouts.order[index] : 'mobile';

    if (previous != current) {
      $('body').removeClass('responsive-layout-' + previous).addClass('responsive-layout-' + current);
      $.event.trigger('responsivelayout', {from: previous, to: current});
    }
  };

  /**
   * @todo
   */
  Drupal.omega.getCurrentLayout = function () {
    return current;
  };

  /**
   * @todo
   */
  Drupal.omega.getPreviousLayout = function () {
    return previous;
  };

  /**
   * @todo
   */
  Drupal.omega.crappyBrowser = function () {
    return $.browser.msie && parseInt($.browser.version, 10) < 9;
  };

  /**
   * @todo
   */
  Drupal.omega.checkLayout = function (layout) {
    if (Drupal.settings.omega.layouts.queries.hasOwnProperty(layout) && Drupal.settings.omega.layouts.queries[layout]) {
      var output = Drupal.omega.checkQuery(Drupal.settings.omega.layouts.queries[layout]);

      if (!output && layout == Drupal.settings.omega.layouts.primary) {
        var dummy = $('<div id="omega-check-query"></div>').prependTo('body');

        dummy.append('<style media="all">#omega-check-query { position: relative; z-index: -1; }</style>');
        dummy.append('<!--[if (lt IE 9)&(!IEMobile)]><style media="all">#omega-check-query { z-index: 100; }</style><![endif]-->');

        output = parseInt(dummy.css('z-index')) == 100;

        dummy.remove();
      }

      return output;
    }

    return false;
  };

  /**
   * @todo
   */
  Drupal.omega.checkQuery = function (query) {
    var dummy = $('<div id="omega-check-query"></div>').prependTo('body');

    dummy.append('<style media="all">#omega-check-query { position: relative; z-index: -1; }</style>');
    dummy.append('<style media="' + query + '">#omega-check-query { z-index: 100; }</style>');

    var output = parseInt(dummy.css('z-index')) == 100;

    dummy.remove();

    return output;
  };

  /**
   * @todo
   */
  Drupal.behaviors.omegaMediaQueries = {
    attach: function (context) {
      $('body', context).once('omega-mediaqueries', function () {
        var primary = $.inArray(Drupal.settings.omega.layouts.primary, Drupal.settings.omega.layouts.order);
        var dummy = $('<div id="omega-media-query-dummy"></div>').prependTo('body');

        dummy.append('<style media="all">#omega-media-query-dummy { position: relative; z-index: -1; }</style>');
        dummy.append('<!--[if (lt IE 9)&(!IEMobile)]><style media="all">#omega-media-query-dummy { z-index: ' + primary + '; }</style><![endif]-->');

        for (var i in Drupal.settings.omega.layouts.order) {
          dummy.append('<style media="' + Drupal.settings.omega.layouts.queries[Drupal.settings.omega.layouts.order[i]] + '">#omega-media-query-dummy { z-index: ' + i + '; }</style>');
        }

        $(window).bind('resize.omegamediaqueries', function () {
          setCurrentLayout(dummy.css('z-index'));
        }).load(function () {
          $(this).trigger('resize.omegamediaqueries');
        });
      });
    }
  };
})(jQuery);
;
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-printshiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return I("flexWrap")},s.flexboxlegacy=function(){return I("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!E(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!I("indexedDB",a)},s.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(j.backgroundColor,"rgba")},s.hsla=function(){return C("background-color:hsla(120,40%,100%,.5)"),F(j.backgroundColor,"rgba")||F(j.backgroundColor,"hsla")},s.multiplebgs=function(){return C("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return I("backgroundSize")},s.borderimage=function(){return I("borderImage")},s.borderradius=function(){return I("borderRadius")},s.boxshadow=function(){return I("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return I("animationName")},s.csscolumns=function(){return I("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.cssreflections=function(){return I("boxReflect")},s.csstransforms=function(){return!!I("transform")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var K in s)B(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.input||J(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}function w(a){var b,c=a.getElementsByTagName("*"),d=c.length,e=RegExp("^(?:"+m().join("|")+")$","i"),f=[];while(d--)b=c[d],e.test(b.nodeName)&&f.push(b.applyElement(x(b)));return f}function x(a){var b,c=a.attributes,d=c.length,e=a.ownerDocument.createElement(u+":"+a.nodeName);while(d--)b=c[d],b.specified&&e.setAttribute(b.nodeName,b.nodeValue);return e.style.cssText=a.style.cssText,e}function y(a){var b,c=a.split("{"),d=c.length,e=RegExp("(^|[\\s,>+~])("+m().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),f="$1"+u+"\\:$2";while(d--)b=c[d]=c[d].split("}"),b[b.length-1]=b[b.length-1].replace(e,f),c[d]=b.join("}");return c.join("{")}function z(a){var b=a.length;while(b--)a[b].removeNode()}function A(a){function g(){clearTimeout(d._removeSheetTimer),b&&b.removeNode(!0),b=null}var b,c,d=n(a),e=a.namespaces,f=a.parentWindow;return!v||a.printShived?a:(typeof e[u]=="undefined"&&e.add(u),f.attachEvent("onbeforeprint",function(){g();var d,e,f,h=a.styleSheets,i=[],j=h.length,k=Array(j);while(j--)k[j]=h[j];while(f=k.pop())if(!f.disabled&&t.test(f.media)){try{d=f.imports,e=d.length}catch(m){e=0}for(j=0;j<e;j++)k.push(d[j]);try{i.push(f.cssText)}catch(m){}}i=y(i.reverse().join("")),c=w(a),b=l(a,i)}),f.attachEvent("onafterprint",function(){z(c),clearTimeout(d._removeSheetTimer),d._removeSheetTimer=setTimeout(g,500)}),a.printShived=!0,a)}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b);var t=/^$|\b(?:all|print)\b/,u="html5shiv",v=!k&&function(){var c=b.documentElement;return typeof b.namespaces!="undefined"&&typeof b.parentWindow!="undefined"&&typeof c.applyElement!="undefined"&&typeof c.removeNode!="undefined"&&typeof a.attachEvent!="undefined"}();s.type+=" print",s.shivPrint=A,A(b)}(this,document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
/**
* Fitted: a jQuery Plugin
* @author: Trevor Morris (trovster)
* @url: http://www.trovster.com/lab/code/plugins/jquery.fitted.js
* @documentation: http://www.trovster.com/lab/plugins/fitted/
* @published: 11/09/2008
* @updated: 29/09/2008
* @license Creative Commons Attribution Non-Commercial Share Alike 3.0 Licence
*		   http://creativecommons.org/licenses/by-nc-sa/3.0/
* @notes: 
* Also see BigTarget by Leevi Graham - http://newism.com.au/blog/post/58/bigtarget-js-increasing-the-size-of-clickable-targets/ 
*
*/
if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			fitted: function(options) {
				var settings = $.extend({}, $.fn.fitted.defaults, options);
							
				return this.each(
					function() {
						
						var $t = $(this);
						var o = $.metadata ? $.extend({}, settings, $t.metadata()) : settings;
						
						if($t.find(':has(a)')) {
							/**
							* Find the first Anchor
							* @var object $a
							*/
							var $a = $t.find('a:first');
							
							/**
							* Get the Anchor Attributes
							*/
							var href = $a.attr('href');
							var title = $a.attr('title');
							
							/**
							* Setup the Container
							* Add the 'container' class defined in settings
							* @event hover
							* @event click
							*/
							$t.addClass(o['class']['container']).hover(
								function(){
									/**
									* Hovered Element
									*/
									$h = $(this);
									
									/**
									* Add the 'hover' class defined in settings
									*/
									$h.addClass(o['class']['hover']);
									
									/**
									* Add the Title Attribute if the option is set, and it's not empty
									*/
									if(typeof o['title'] != 'undefined' && o['title']===true && title != '') {
										$h.attr('title',title);
									}
																		
									/**
									* Set the Status bar string if the option is set
									*/
									if(typeof o['status'] != 'undefined' && o['status']===true) {
										if($.browser.safari) {
											/**
											* Safari Formatted Status bar string
											*/
											window.status = 'Go to "' + href + '"';
										}
										else {
											/**
											* Default Formatted Status bar string
											*/
											window.status = href;
										}
									}
								},
								function(){
									/**
									* "un"-hovered Element
									*/
									$h = $(this);
									
									/**
									* Remove the Title Attribute if it was set by the Plugin
									*/
									if(typeof o['title'] != 'undefined' && o['title']===true && title != '') {
										$h.removeAttr('title');
									}
									
									/**
									* Remove the 'hover' class defined in settings
									*/
									$h.removeClass(o['class']['hover']);
									
									/**
									* Remove the Status bar string
									*/
									window.status = '';
								}
							).click(
								function(){
									/**
									* Clicked!
									* The Container has been Clicked
									* Trigger the Anchor / Follow the Link
									*/
									if($a.is('[rel*=external]')){
										window.open($href);
										return false;
									}
									else {
										//$a.click(); $a.trigger('click');
										window.location = href;
									}
								}
							);
						}
					}
				);
			}
		});
		
		/**
		* Plugin Defaults
		*/
		$.fn.fitted.defaults = {
			'class' : {
				'container' : 'fitted',
				'hover' : 'hovered'
			},
			'title' : true,
			'status' : false
		};
	});
};
/*! appendAround markup pattern. [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL 
how-to:
	1. Insert potential element containers throughout the DOM
	2. give each container a data-set attribute with a value that matches all other containers' values
	3. Place your appendAround content in one of the potential containers
	4. Call appendAround() on that element when the DOM is ready
*/
(function(a){a.fn.appendAround=function(){return this.each(function(){var i=a(this),c="data-set",g=i.parent(),f=g[0],h=g.attr(c),b=a("["+c+"='"+h+"']");function d(j){return a(j).css("display")==="none"}function e(){if(d(f)){var j=0;b.each(function(){if(!d(this)&&!j){i.appendTo(this);j++;f=this}})}}e();a(window).bind("resize",e)})}}(jQuery));;
/*
* Scripts for YaleNew Base, Drupal 7
* Revised 8-12
*
*/

// ligature.js v1.0
// http://code.google.com/p/ligature-js/
ligature = function(extended, node) {
  if (!node) {
    ligature(extended, document.body);
  }
  else {
    if (node.nodeType == 3 && node.parentNode.nodeName != 'SCRIPT') {
      node.nodeValue = node.nodeValue
        .replace(/ffl/g, 'ﬄ')
        .replace(/ffi/g, 'ﬃ')
        .replace(/fl/g, 'ﬂ')
        .replace(/fi/g, 'ﬁ')
        .replace(/ff/g, 'ﬀ')

      if (extended) {
        node.nodeValue = node.nodeValue.replace(/ae/g, 'æ')
          .replace(/A[Ee]/g, 'Æ')
          .replace(/oe/g, 'œ')
          .replace(/O[Ee]/g, 'Œ')
          .replace(/ue/g, 'ᵫ')
          .replace(/st/g, 'ﬆ');
      }
    }
    if (node.childNodes) {
      for (var i = 0; i < node.childNodes.length; i++) {
        ligature(extended, node.childNodes.item(i));
      }
    }
  }
};

// Main jQuery scripts
jQuery.noConflict();
  jQuery(document).ready(function($) {

    // Mobile Navicon and Canvas Push
  $('#nav-ready').click(function(e) {
		e.preventDefault();
		$('#region-menu .region-menu-inner').addClass('mobile-open');
		$('body').addClass('nav-open');
		$(this).addClass('nav-hidden');
		$('#nav-close').removeClass('nav-hidden');
	});

	$('#nav-close').click(function(e) {
		e.preventDefault();
		$('#region-menu .region-menu-inner').removeClass('mobile-open');
		$('body').removeClass('nav-open');
		$('#nav-ready').removeClass('nav-hidden');
		$(this).addClass('nav-hidden');
		$('#nav-ready').focus();
	});

	$('body').focusin(function(e) {
	  if (!$.contains($('#moved-main-nav-wrapper')[0], document.activeElement)) {
	    if ($('body').hasClass('nav-open')) {
	      $('#region-menu .region-menu-inner').removeClass('mobile-open');
	      $('body').removeClass('nav-open');
	      $('#nav-close').addClass('nav-hidden');
	      $('#nav-ready').removeClass('nav-hidden');
	    }
	  }
	});


	// AppendAround
	// Moves the left sidebar menu into the mobile nav based on media queries in
	$('#additional-nav').appendAround();
	$('#main-nav').appendAround();

	// Additional Navigation Menu
    $('#additional-nav').click(function(e) {
	    $('#additional-nav').toggleClass('addnav-ready addnav-close');
	    $('#additional-nav .block').toggleClass('addnav-open');
	    $('#additional-nav-button').attr('aria-expanded', function(index, attr) {
	        return attr == "true" ? "false" : "true";
	      });
	});

	// If using Enter or Space on additional nav button, trigger a click
	$('#additional-nav').keypress(function(e) {
	  if ( e.which == 13 || e.which==32 ) {
	    e.preventDefault();
	    $('#additional-nav').trigger("click");
	  }
	});

    // Site title ligature replacement, for IE8 and IE9 only
    if (document.all && !window.atob && document.querySelector) {
      // Load ligatures
      $.each($('h1, h2.site-name'), function(index, element) {
        ligature(false, element);
      });
    }

  // Widon't, http://justinhileman.info/article/a-jquery-widont-snippet/
  // Mod by David Bennett
  $('.site-name, #region-content h2').each(function() {
    $(this).html($(this).html().replace(/\s((?=(([^\s<>]|<[^>]*>)+))\2)\s*$/,'&nbsp;$1'));
  });

  // Fitted, a jQuery Plugin by Trevor Morris
  // http://www.trovster.com/lab/plugins/fitted/
  if(jQuery().fitted) { // initialize only if the Fitted plugin is loaded
    $('.clickable, .flexslider_views_slideshow_slide').fitted();
  }

    // Slideshow fade controls
    // Remove fade effect for accessibility
    // $('.flex-direction-nav').hide();
    // $('.flex-nav-container').hover(function() {
    //  $('.flex-direction-nav').fadeToggle(200);
    //});

}); // End jQuery no-conflict

// Remove outline in Firefox

(function(d){

	var style_element = d.createElement('STYLE'),
	    dom_events = 'addEventListener' in d,
	    add_event_listener = function(type, callback){
			// Basic cross-browser event handling
			if(dom_events){
				d.addEventListener(type, callback);
			}else{
				d.attachEvent('on' + type, callback);
			}
		},
	    set_css = function(css_text){
			// Handle setting of <style> element contents in IE8
			!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
		}
	;

	d.getElementsByTagName('HEAD')[0].appendChild(style_element);

	// Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
    add_event_listener('mousedown', function(){
		set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
	});

	add_event_listener('keydown', function(){
    set_css('');
	});

})(document);


//Search Widget button accessible name
//From MA
jQuery(document).ready(function(){
  if(jQuery('form#search-block-form').length > 0){
  	jQuery(this).find('input#edit-submit').attr('aria-label', 'Submit');
  }
});

// Big Webform Accessibility Fixes
// From MA
jQuery(document).ready(function(){
	// Webform textarea description screen reader attachment
	if(jQuery('.webform-component-textarea .description').length > 0){
		var textareaDescs = jQuery('.webform-component-textarea .description');
		jQuery.each(textareaDescs, function(i,v){
			var c = jQuery(this).siblings('.form-textarea-wrapper').find('textarea').first().attr('id');
			var cid = c+'Desc';jQuery(this).attr('id',cid);
			jQuery(this).siblings('.form-textarea-wrapper').find('textarea').first().attr('aria-describedby', cid);
		});
	}

	//Webform email field description screen reader attachment
	if(jQuery('.webform-component-email .description').length > 0){
		var textareaDescs = jQuery('.webform-component-email .description');
		jQuery.each(textareaDescs, function(i,v){
			var c = jQuery(this).siblings('input[type="email"]').attr('id');
			var cid = c+'Desc';jQuery(this).attr('id',cid);
			jQuery(this).siblings('input[type="email"]').attr('aria-describedby', cid);
		});
	}

	//Webform file field description screen reader attachment
	if(jQuery('.webform-component-file .description').length > 0){
		var textareaDescs = jQuery('.webform-component-file .description');
		jQuery.each(textareaDescs, function(i,v){
			var c = jQuery(this).siblings('.form-managed-file').find('input[type="file"]').attr('id');
			var cid = c+'Desc';jQuery(this).attr('id',cid);
			jQuery(this).siblings('.form-managed-file').find('input[type="file"]').attr('aria-describedby', cid);
		});
	}
	//Webform radio buttons grouping for screen reader
	if(jQuery('.webform-component-radios').length > 0){
		var radioElementsWrapper = jQuery('.webform-component-radios').filter(function(i){
			return jQuery(this).find('fieldset').length == 0;
		});
		jQuery.each(radioElementsWrapper, function(i,v){
			var fieldName = jQuery(this).children('label').first().text();
			if(jQuery(this).find('.description').length > 0){
				var cid = jQuery(this).find('.form-radios').attr('id')+"-desc";
				jQuery(this).find('.description').attr('id', cid);
				jQuery(this).find('.form-radios input.form-radio').attr('aria-describedby', cid);
			}
			jQuery(this).find('.form-radios .form-type-radio').wrapAll('<fieldset></fieldset>')
			.parents('fieldset').first().prepend('<legend class="sratText element-invisible">'+fieldName+'</legend>');

		});
	}
	if(jQuery('.webform-component-select > .description, .webform-component-textfield > .description').length > 0){
		var webTexts = jQuery('.webform-component-select, .webform-component-textfield').filter(function(i){
			return jQuery(this).find('.description').length != 0;
		});
		jQuery.each(webTexts, function(i,v){
			var labelId = jQuery(this).children('label').text().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'').trim().replace(/\s+/g,'-');//.attr('id');
			var descIdText = labelId+"-desc";
			jQuery(this).find('.description').attr('id', descIdText);
			jQuery(this).children('input, select').attr('aria-describedby', descIdText);

		});
	}
	if(jQuery('.webform-component-fieldset.collapsible').length > 0){
		jQuery('.webform-component-fieldset.collapsible').attr('aria-expanded', false).find('.fieldset-wrapper').attr('aria-hidden', true);
		jQuery('.webform-component-fieldset.collapsible > legend a.fieldset-title').click(function(){
			var $that = 'true';
			var $this = jQuery(this).parents('.webform-component-fieldset.collapsible');console.log($this);console.log(!$this.attr('aria-expanded'));
			var $tog = $this.attr('aria-expanded') == $that ? false : true;
			$this.attr('aria-expanded', $tog); $this.find('.fieldset-wrapper').attr('aria-hidden', !$tog);
		});
	}

	//Webform error indication on reload
	if(jQuery('.webform-component input.error').length > 0 && jQuery('.messages.error').length > 0){
		  jQuery('.webform-component input.error').first().focus();
		  jQuery('.messages.error').attr('role', 'alert' ).append('<span class="sratText">.</span>'); //.attr('aria-live', 'polite');
	}
});

// Override the throbber from misc/ajax.js to add aria-label element.
(function($) {
  if (typeof Drupal.ajax === "function") {
    Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
      // For forms without file inputs, the jQuery Form plugin serializes the form
      // values, and then calls jQuery's $.ajax() function, which invokes this
      // handler. In this circumstance, options.extraData is never used. For forms
      // with file inputs, the jQuery Form plugin uses the browser's normal form
      // submission mechanism, but captures the response in a hidden IFRAME. In this
      // circumstance, it calls this handler first, and then appends hidden fields
      // to the form to submit the values in options.extraData. There is no simple
      // way to know which submission mechanism will be used, so we add to extraData
      // regardless, and allow it to be ignored in the former case.
      if (this.form) {
        options.extraData = options.extraData || {};

        // Let the server know when the IFRAME submission mechanism is used. The
        // server can use this information to wrap the JSON response in a TEXTAREA,
        // as per http://jquery.malsup.com/form/#file-upload.
        options.extraData.ajax_iframe_upload = '1';

        // The triggering element is about to be disabled (see below), but if it
        // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
        // value is included in the submission. As per above, submissions that use
        // $.ajax() are already serialized prior to the element being disabled, so
        // this is only needed for IFRAME submissions.
        var v = $.fieldValue(this.element);
        if (v !== null) {
          options.extraData[this.element.name] = Drupal.checkPlain(v);
        }
      }

      // Disable the element that received the change to prevent user interface
      // interaction while the Ajax request is in progress. ajax.ajaxing prevents
      // the element from triggering a new request, but does not prevent the user
      // from changing its value.
      $(this.element).addClass('progress-disabled').attr('disabled', true);

      // Insert progressbar or throbber.
      if (this.progress.type == 'bar') {
        var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
        if (this.progress.message) {
          progressBar.setProgress(-1, this.progress.message);
        }
        if (this.progress.url) {
          progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
        }
        this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
        this.progress.object = progressBar;
        $(this.element).after(this.progress.element);
      }
      else if (this.progress.type == 'throbber') {
        this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber" aria-label="Content loading">&nbsp;</div></div>');
        if (this.progress.message) {
          $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
        }
        $(this.element).after(this.progress.element);
      }
    };
  }
})(jQuery);
;
