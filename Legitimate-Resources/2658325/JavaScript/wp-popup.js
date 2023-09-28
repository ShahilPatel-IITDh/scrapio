/**
 * Featherbox-powered conditional overlay
 */
(function($) {

	$.wpPopUp = function( options ) {
		options = options || window.wp_popup_opts;
		var force = window.location.search.indexOf("forceoverlay");
		var alreadyOpened = false;
		var settings = $.extend({
			context              : 'none',
			suppress             : 'never',
			trigger              : 'immediate',
			trigger_amount       : 1,
			width                : 600,
			wp_popup_identifier  : 'wp-popup',
			onMobile             : false
		}, options );

		// @todo refactor all code to still increment timers, etc even when not on pages that lightbox will be displayed on...
		// do nothing if it's disabled...
		if ( 'none' === settings.context ) return;

		// ...if we're on mobile it's not...
		if ( isMobile() && ! settings.onMobile ) return;

		// ...if it's supposed to be on the homepage and we're not...
		if ( 'home' === settings.context && !$('body').hasClass('home') ) return;

		// ...or if the already-seen cookie is still around (the identifier is also set in the PHP and passed as a JS object see `set_js_options()`
		if ( $.cookie('wp-popup-seen-' + settings.wp_popup_identifier ) == 'true' && force === -1 ) return;

		// let's see if we meet our open criteria!
		// right away
		if ( 'immediate' == settings.trigger ) {
			openLightbox();
			// delay by n seconds
		} else if ( 'delay' == settings.trigger ) {
			setTimeout( function() { openLightbox(); }, settings.trigger_amount * 1000 );
		} else if ( 'scroll' == settings.trigger ) {
			$(window).on('scroll', function() {
				if ( $(window).scrollTop() >= settings.trigger_amount ) {
					openLightbox();
				}
			});
		} else if ( 'scroll-half' === settings.trigger ) {
			var height = $(document).height(),
				scrollAmount,
				scrollPercent;

			$(window).on('scroll', function() {
				scrollAmount = $(window).scrollTop();
				scrollPercent = ( scrollAmount / height ) * 100;

				if ( scrollPercent > 30 ) {
					openLightbox();
				}
			});
		} else if ( 'scroll-full' == settings.trigger ) {
			$(window).on('scroll', function() {
				var offsetFullHeight = $(document).height() - 20;
				if ( $(window).scrollTop() + $(window).height() >= offsetFullHeight ) {
					openLightbox();
				}
			});
		} else if ( 'pages' == settings.trigger ) {
			var pageCount = $.cookie('wp-popup-pages-' + settings.wp_popup_identifier) || 0;
			if ( ++pageCount >= settings.trigger_amount ) {
				openLightbox();
				$.removeCookie('wp-popup-pages-' + settings.wp_popup_identifier, { expires: 90, path: '/' });
			} else {
				$.cookie('wp-popup-pages-' + settings.wp_popup_identifier, pageCount, { expires: 90, path: '/' });
			}
		} else if ( 'minutes' == settings.trigger ) {
			var minuteCount = parseFloat($.cookie('wp-popup-minutes-' + settings.wp_popup_identifier)) || 0;
			if ( minuteCount >= settings.trigger_amount ) {
				openLightbox();
				$.removeCookie('wp-popup-minutes-' + settings.wp_popup_identifier, { path: '/' });
			} else {
				setInterval( function() { lightboxTimer(); }, 6000 );
			}
		}

		function openLightbox() {

			if ( alreadyOpened ) return;

			// width... somewhere?
			$.featherlight( $('#wp-popup-inner'), {
				namespace: 'wp-popup',
				type:'html',
				beforeOpen: function(e) {
					if( settings.background ) {
						$('.wp-popup-content').css('background-image', 'url(' + settings.background + ')');
					}
				},
				afterOpen: function(e) {
					$( document ).trigger( 'wpPopUpOpen' );
				}
			});
			alreadyOpened = true;

			// never hide
			if ( 'never' === settings.suppress ) return;

			var cookieOpts = { path: '/' };

			// set a cookie with appropriate expiration
			if ( settings.suppress == 'always' ) {
				cookieOpts.expires = 365 * 5;	// 5 years is basically forever
			} else if ( settings.suppress == 'wait-7' ) {
				cookieOpts.expires = 7;
			} else if ( settings.suppress == 'wait-30' ) {
				cookieOpts.expires = 30;
			} else if ( settings.suppress == 'wait-90' ) {
				cookieOpts.expires = 30;
			}

			$.cookie( 'wp-popup-seen-' + settings.wp_popup_identifier, 'true', cookieOpts );
		}

		function lightboxTimer() {
			var maxMinutes = settings.trigger_amount,
				timePassed = parseFloat($.cookie('wp-popup-minutes-' + settings.wp_popup_identifier)) || 0;
			// increment every half-second (setInterval = 500)
			timePassed += 0.1;
			if ( timePassed >= maxMinutes ) {
				openLightbox();
				$.removeCookie('wp-popup-minutes-' + settings.wp_popup_identifier, { path: '/' });
			} else {
				$.cookie('wp-popup-minutes-' + settings.wp_popup_identifier, timePassed, { path: '/'});
			}
		}

		// Primitive mobile test loosely based on wp_is_mobile()
		function isMobile() {
			testExp = new RegExp('Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile|Silk|Kindle|Opera Mobi' , 'i');
			return testExp.test( navigator.userAgent );
		}

	};
}(jQuery));

jQuery(document).ready(function($) {
	$.wpPopUp();
});


/**
 * Featherlight - ultra slim jQuery lightbox
 * Version 1.7.8 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2017, NoÃ«l Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
**/
!function(a){"use strict";function b(a,c){if(!(this instanceof b)){var d=new b(a,c);return d.open(),d}this.id=b.id++,this.setup(a,c),this.chainCallbacks(b._callbackChain)}function c(a,b){var c={};for(var d in a)d in b&&(c[d]=a[d],delete a[d]);return c}function d(a,b){var c={},d=new RegExp("^"+b+"([A-Z])(.*)");for(var e in a){var f=e.match(d);if(f){var g=(f[1]+f[2].replace(/([A-Z])/g,"-$1")).toLowerCase();c[g]=a[e]}}return c}if("undefined"==typeof a)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));var e=[],f=function(b){return e=a.grep(e,function(a){return a!==b&&a.$instance.closest("body").length>0})},g={allowfullscreen:1,frameborder:1,height:1,longdesc:1,marginheight:1,marginwidth:1,name:1,referrerpolicy:1,scrolling:1,sandbox:1,src:1,srcdoc:1,width:1},h={keyup:"onKeyUp",resize:"onResize"},i=function(c){a.each(b.opened().reverse(),function(){return c.isDefaultPrevented()||!1!==this[h[c.type]](c)?void 0:(c.preventDefault(),c.stopPropagation(),!1)})},j=function(c){if(c!==b._globalHandlerInstalled){b._globalHandlerInstalled=c;var d=a.map(h,function(a,c){return c+"."+b.prototype.namespace}).join(" ");a(window)[c?"on":"off"](d,i)}};b.prototype={constructor:b,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:a.noop,beforeContent:a.noop,beforeClose:a.noop,afterOpen:a.noop,afterContent:a.noop,afterClose:a.noop,onKeyUp:a.noop,onResize:a.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(b,c){"object"!=typeof b||b instanceof a!=!1||c||(c=b,b=void 0);var d=a.extend(this,c,{target:b}),e=d.resetCss?d.namespace+"-reset":d.namespace,f=a(d.background||['<div class="'+e+"-loading "+e+'">','<div class="'+e+'-content">','<button class="'+e+"-close-icon "+d.namespace+'-close" aria-label="Close">',d.closeIcon,"</button>",'<div class="'+d.namespace+'-inner">'+d.loading+"</div>","</div>","</div>"].join("")),g="."+d.namespace+"-close"+(d.otherClose?","+d.otherClose:"");return d.$instance=f.clone().addClass(d.variant),d.$instance.on(d.closeTrigger+"."+d.namespace,function(b){var c=a(b.target);("background"===d.closeOnClick&&c.is("."+d.namespace)||"anywhere"===d.closeOnClick||c.closest(g).length)&&(d.close(b),b.preventDefault())}),this},getContent:function(){if(this.persist!==!1&&this.$content)return this.$content;var b=this,c=this.constructor.contentFilters,d=function(a){return b.$currentTarget&&b.$currentTarget.attr(a)},e=d(b.targetAttr),f=b.target||e||"",g=c[b.type];if(!g&&f in c&&(g=c[f],f=b.target&&e),f=f||d("href")||"",!g)for(var h in c)b[h]&&(g=c[h],f=b[h]);if(!g){var i=f;if(f=null,a.each(b.contentFilters,function(){return g=c[this],g.test&&(f=g.test(i)),!f&&g.regex&&i.match&&i.match(g.regex)&&(f=i),!f}),!f)return"console"in window&&window.console.error("Featherlight: no content filter found "+(i?' for "'+i+'"':" (no target specified)")),!1}return g.process.call(b,f)},setContent:function(b){var c=this;return b.is("iframe")&&c.$instance.addClass(c.namespace+"-iframe"),c.$instance.removeClass(c.namespace+"-loading"),c.$instance.find("."+c.namespace+"-inner").not(b).slice(1).remove().end().replaceWith(a.contains(c.$instance[0],b[0])?"":b),c.$content=b.addClass(c.namespace+"-inner"),c},open:function(b){var c=this;if(c.$instance.hide().appendTo(c.root),!(b&&b.isDefaultPrevented()||c.beforeOpen(b)===!1)){b&&b.preventDefault();var d=c.getContent();if(d)return e.push(c),j(!0),c.$instance.fadeIn(c.openSpeed),c.beforeContent(b),a.when(d).always(function(a){c.setContent(a),c.afterContent(b)}).then(c.$instance.promise()).done(function(){c.afterOpen(b)})}return c.$instance.detach(),a.Deferred().reject().promise()},close:function(b){var c=this,d=a.Deferred();return c.beforeClose(b)===!1?d.reject():(0===f(c).length&&j(!1),c.$instance.fadeOut(c.closeSpeed,function(){c.$instance.detach(),c.afterClose(b),d.resolve()})),d.promise()},resize:function(a,b){if(a&&b){this.$content.css("width","").css("height","");var c=Math.max(a/(this.$content.parent().width()-1),b/(this.$content.parent().height()-1));c>1&&(c=b/Math.floor(b/c),this.$content.css("width",""+a/c+"px").css("height",""+b/c+"px"))}},chainCallbacks:function(b){for(var c in b)this[c]=a.proxy(b[c],this,a.proxy(this[c],this))}},a.extend(b,{id:0,autoBind:"[data-featherlight]",defaults:b.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(b){return b instanceof a&&b},process:function(b){return this.persist!==!1?a(b):a(b).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,process:function(b){var c=this,d=a.Deferred(),e=new Image,f=a('<img src="'+b+'" alt="" class="'+c.namespace+'-image" />');return e.onload=function(){f.naturalWidth=e.width,f.naturalHeight=e.height,d.resolve(f)},e.onerror=function(){d.reject(f)},e.src=b,d.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(b){return a(b)}},ajax:{regex:/./,process:function(b){var c=a.Deferred(),d=a("<div></div>").load(b,function(a,b){"error"!==b&&c.resolve(d.contents()),c.fail()});return c.promise()}},iframe:{process:function(b){var e=new a.Deferred,f=a("<iframe/>"),h=d(this,"iframe"),i=c(h,g);return f.hide().attr("src",b).attr(i).css(h).on("load",function(){e.resolve(f.show())}).appendTo(this.$instance.find("."+this.namespace+"-content")),e.promise()}},text:{process:function(b){return a("<div>",{text:b})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(b,c){var d=this,e=new RegExp("^data-"+c+"-(.*)"),f={};return b&&b.attributes&&a.each(b.attributes,function(){var b=this.name.match(e);if(b){var c=this.value,g=a.camelCase(b[1]);if(a.inArray(g,d.functionAttributes)>=0)c=new Function(c);else try{c=JSON.parse(c)}catch(h){}f[g]=c}}),f},extend:function(b,c){var d=function(){this.constructor=b};return d.prototype=this.prototype,b.prototype=new d,b.__super__=this.prototype,a.extend(b,this,c),b.defaults=b.prototype,b},attach:function(b,c,d){var e=this;"object"!=typeof c||c instanceof a!=!1||d||(d=c,c=void 0),d=a.extend({},d);var f,g=d.namespace||e.defaults.namespace,h=a.extend({},e.defaults,e.readElementConfig(b[0],g),d),i=function(g){var i=a(g.currentTarget),j=a.extend({$source:b,$currentTarget:i},e.readElementConfig(b[0],h.namespace),e.readElementConfig(g.currentTarget,h.namespace),d),k=f||i.data("featherlight-persisted")||new e(c,j);"shared"===k.persist?f=k:k.persist!==!1&&i.data("featherlight-persisted",k),j.$currentTarget.blur&&j.$currentTarget.blur(),k.open(g)};return b.on(h.openTrigger+"."+h.namespace,h.filter,i),i},current:function(){var a=this.opened();return a[a.length-1]||null},opened:function(){var b=this;return f(),a.grep(e,function(a){return a instanceof b})},close:function(a){var b=this.current();return b?b.close(a):void 0},_onReady:function(){var b=this;b.autoBind&&(a(b.autoBind).each(function(){b.attach(a(this))}),a(document).on("click",b.autoBind,function(c){if(!c.isDefaultPrevented()){var d=b.attach(a(c.currentTarget));d(c)}}))},_callbackChain:{onKeyUp:function(b,c){return 27===c.keyCode?(this.closeOnEsc&&a.featherlight.close(c),!1):b(c)},beforeOpen:function(b,c){return a(document.documentElement).addClass("with-featherlight"),this._previouslyActive=document.activeElement,this._$previouslyTabbable=a("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")),this._$previouslyWithTabIndex=a("[tabindex]").not('[tabindex="-1"]'),this._previousWithTabIndices=this._$previouslyWithTabIndex.map(function(b,c){return a(c).attr("tabindex")}),this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex",-1),document.activeElement.blur&&document.activeElement.blur(),b(c)},afterClose:function(c,d){var e=c(d),f=this;return this._$previouslyTabbable.removeAttr("tabindex"),this._$previouslyWithTabIndex.each(function(b,c){a(c).attr("tabindex",f._previousWithTabIndices[b])}),this._previouslyActive.focus(),0===b.opened().length&&a(document.documentElement).removeClass("with-featherlight"),e},onResize:function(a,b){return this.resize(this.$content.naturalWidth,this.$content.naturalHeight),a(b)},afterContent:function(a,b){var c=a(b);return this.$instance.find("[autofocus]:not([disabled])").focus(),this.onResize(b),c}}}),a.featherlight=b,a.fn.featherlight=function(a,c){return b.attach(this,a,c),this},a(document).ready(function(){b._onReady()})}(jQuery);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function c(a){return h.raw?a:encodeURIComponent(a)}function d(a){return h.raw?a:decodeURIComponent(a)}function e(a){return c(h.json?JSON.stringify(a):String(a))}function f(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(b," ")),h.json?JSON.parse(a):a}catch(c){}}function g(b,c){var d=h.raw?b:f(b);return a.isFunction(c)?c(d):d}var b=/\+/g,h=a.cookie=function(b,f,i){if(arguments.length>1&&!a.isFunction(f)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setMilliseconds(k.getMilliseconds()+864e5*j)}return document.cookie=[c(b),"=",e(f),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=b?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=d(p.shift()),r=p.join("=");if(b===q){l=g(r,f);break}b||void 0===(r=g(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b)}});