



// All inclusive scripts for Labelpro

var $ = jQuery.noConflict();

// Floating menu

function QantumFloatingMenu(){
	if(qfmcCheck.offset().top <  (jQuery(window).scrollTop() + qfmcCheck.height())){
		if(qfmc.hasClass("navbar-fixed-top")){
			
		}else{
			qfmc.removeClass("in").removeClass("fade").addClass(" fade out").delay(200).promise().done(function(){
				qfmc.addClass("navbar-fixed-top").delay(200).promise().done(function(){
					qfmc.removeClass("out").addClass("in");
					jQuery("body").addClass("qw-navbar-fixed-top");
				});
			});
			
		}
	}else{
		if(qfmc.hasClass("navbar-fixed-top")){
			qfmc.removeClass("navbar-fixed-top");
			jQuery("body").removeClass("qw-navbar-fixed-top");
		}

	}
}
var qfmc = jQuery("#QantumFloatingMenu");
var qfmcCheck = jQuery("#QantumFloatingMenuCheck");
jQuery(document).ready(function(){
	if(qfmc.length > 0){
	    window.setInterval(function (){
				QantumFloatingMenu();
	    }, 300); // using timeout because it wants to execute this too early!!
	}
});






/*
*
* Placeholder IE9 fix
*
*
*/
jQuery.fn.qtPlaceholderFix = function(){

	if(typeof($) == "undefined"){
		var $ = jQuery.noConflict();
	}

	$('[placeholder]').each(function(){
		var that = $(this);
	});



	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
	    input.val('');
	    input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
	    input.addClass('placeholder');
	    input.val(input.attr('placeholder'));
	  }
	}).blur();


	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
	    var input = $(this);
	    if (input.val() == input.attr('placeholder')) {
	      input.val('');
	    }
	  })
	});
}





/*! Swipebox v1.2.9 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */
!function(a,b,c,d){c.swipebox=function(e,f){var g,h,i={useCSS:!0,useSVG:!0,initialIndexOnArray:0,closeBySwipe:!0,hideBarsOnMobile:!0,hideBarsDelay:3e3,videoMaxWidth:1140,vimeoColor:"CCCCCC",beforeOpen:null,afterOpen:null,afterClose:null},j=this,k=[],l=e.selector,m=c(l),n=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),o=null!==n||b.createTouch!==d||"ontouchstart"in a||"onmsgesturechange"in a||navigator.msMaxTouchPoints,p=!!b.createElementNS&&!!b.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,q=a.innerWidth?a.innerWidth:c(a).width(),r=a.innerHeight?a.innerHeight:c(a).height(),s='<div id="swipebox-overlay">					<div id="swipebox-slider"></div>					<div id="swipebox-caption"></div>					<div id="swipebox-action">						<a id="swipebox-close"></a>						<a id="swipebox-prev"></a>						<a id="swipebox-next"></a>					</div>			</div>';j.settings={},j.init=function(){j.settings=c.extend({},i,f),c.isArray(e)?(k=e,g.target=c(a),g.init(j.settings.initialIndexOnArray)):c(b).on("click",l,function(a){if("slide current"===a.target.parentNode.className)return!1;c.isArray(e)||(g.destroy(),h=c(l),g.actions()),k=[];var b,d,f;f||(d="data-rel",f=c(this).attr(d)),f||(d="rel",f=c(this).attr(d)),h=f&&""!==f&&"nofollow"!==f?m.filter("["+d+'="'+f+'"]'):c(l),h.each(function(){var a=null,b=null;c(this).attr("title")&&(a=c(this).attr("title")),c(this).attr("href")&&(b=c(this).attr("href")),k.push({href:b,title:a})}),b=h.index(c(this)),a.preventDefault(),a.stopPropagation(),g.target=c(a.target),g.init(b)})},g={init:function(a){j.settings.beforeOpen&&j.settings.beforeOpen(),this.target.trigger("swipebox-start"),c.swipebox.isOpen=!0,this.build(),this.openSlide(a),this.openMedia(a),this.preloadMedia(a+1),this.preloadMedia(a-1),j.settings.afterOpen&&j.settings.afterOpen()},build:function(){var a,b=this;c("body").append(s),b.doCssTrans()&&(c("#swipebox-slider").css({"-webkit-transition":"left 0.4s ease","-moz-transition":"left 0.4s ease","-o-transition":"left 0.4s ease","-khtml-transition":"left 0.4s ease",transition:"left 0.4s ease"}),c("#swipebox-overlay").css({"-webkit-transition":"opacity 1s ease","-moz-transition":"opacity 1s ease","-o-transition":"opacity 1s ease","-khtml-transition":"opacity 1s ease",transition:"opacity 1s ease"}),c("#swipebox-action, #swipebox-caption").css({"-webkit-transition":"0.5s","-moz-transition":"0.5s","-o-transition":"0.5s","-khtml-transition":"0.5s",transition:"0.5s"})),p&&j.settings.useSVG===!0&&(a=c("#swipebox-action #swipebox-close").css("background-image"),a=a.replace("png","svg"),c("#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close").css({"background-image":a})),n&&j.settings.hideBarsOnMobile===!0&&c("#swipebox-action, #swipebox-caption").hide(),c.each(k,function(){c("#swipebox-slider").append('<div class="slide"></div>')}),b.setDim(),b.actions(),o&&b.gesture(),b.keyboard(),b.animBars(),b.resize()},setDim:function(){var b,d,e={};"onorientationchange"in a?a.addEventListener("orientationchange",function(){0===a.orientation?(b=q,d=r):(90===a.orientation||-90===a.orientation)&&(b=r,d=q)},!1):(b=a.innerWidth?a.innerWidth:c(a).width(),d=a.innerHeight?a.innerHeight:c(a).height()),e={width:b,height:d},c("#swipebox-overlay").css(e)},resize:function(){var b=this;c(a).resize(function(){b.setDim()}).resize()},supportTransition:function(){var a,c="transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" ");for(a=0;a<c.length;a++)if(b.createElement("div").style[c[a]]!==d)return c[a];return!1},doCssTrans:function(){return j.settings.useCSS&&this.supportTransition()?!0:void 0},gesture:function(){var a=this,b=null,d=null,e=!1,f=10,g=50,h={},i={},k=c("#swipebox-caption, #swipebox-action"),l=c("#swipebox-slider");k.addClass("visible-bars"),a.setTimeout(),c("body").bind("touchstart",function(a){return c(this).addClass("touching"),i=a.originalEvent.targetTouches[0],h.pageX=a.originalEvent.targetTouches[0].pageX,h.pageY=a.originalEvent.targetTouches[0].pageY,c(".touching").bind("touchmove",function(a){if(a.preventDefault(),a.stopPropagation(),i=a.originalEvent.targetTouches[0],j.settings.closeBySwipe&&(d=i.pageY-h.pageY,Math.abs(d)>=g||e)){var b=.75-Math.abs(d)/l.height();l.css({top:d+"px"}),l.css({opacity:b}),e=!0}}),!1}).bind("touchend",function(g){if(g.preventDefault(),g.stopPropagation(),j.settings.closeBySwipe){if(l.css("opacity")<=.5){var m=d>0?l.height():-l.height();l.animate({top:m+"px",opacity:0},300,function(){a.closeSlide()})}else l.animate({top:0,opacity:1},300);if(e)return void(e=!1)}b=i.pageX-h.pageX,b>=f?a.getPrev():-f>=b?a.getNext():k.hasClass("visible-bars")?(a.clearTimeout(),a.hideBars()):(a.showBars(),a.setTimeout()),c(".touching").off("touchmove").removeClass("touching")})},setTimeout:function(){if(j.settings.hideBarsDelay>0){var b=this;b.clearTimeout(),b.timeout=a.setTimeout(function(){b.hideBars()},j.settings.hideBarsDelay)}},clearTimeout:function(){a.clearTimeout(this.timeout),this.timeout=null},showBars:function(){var a=c("#swipebox-caption, #swipebox-action");this.doCssTrans()?a.addClass("visible-bars"):(c("#swipebox-caption").animate({top:0},500),c("#swipebox-action").animate({bottom:0},500),setTimeout(function(){a.addClass("visible-bars")},1e3))},hideBars:function(){var a=c("#swipebox-caption, #swipebox-action");this.doCssTrans()?a.removeClass("visible-bars"):(c("#swipebox-caption").animate({top:"-50px"},500),c("#swipebox-action").animate({bottom:"-50px"},500),setTimeout(function(){a.removeClass("visible-bars")},1e3))},animBars:function(){var a=this,b=c("#swipebox-caption, #swipebox-action");b.addClass("visible-bars"),a.setTimeout(),c("#swipebox-slider").click(function(){b.hasClass("visible-bars")||(a.showBars(),a.setTimeout())}),c("#swipebox-action").hover(function(){a.showBars(),b.addClass("visible-bars"),a.clearTimeout()},function(){b.removeClass("visible-bars"),a.setTimeout()})},keyboard:function(){var b=this;c(a).bind("keyup",function(a){a.preventDefault(),a.stopPropagation(),37===a.keyCode?b.getPrev():39===a.keyCode?b.getNext():27===a.keyCode&&b.closeSlide()})},actions:function(){var a=this,b="touchend click";k.length<2?c("#swipebox-prev, #swipebox-next").hide():(c("#swipebox-prev").bind(b,function(b){b.preventDefault(),b.stopPropagation(),a.getPrev(),a.setTimeout()}),c("#swipebox-next").bind(b,function(b){b.preventDefault(),b.stopPropagation(),a.getNext(),a.setTimeout()})),c("#swipebox-close").bind(b,function(){a.closeSlide()})},setSlide:function(a,b){b=b||!1;var d=c("#swipebox-slider");this.doCssTrans()?d.css({left:100*-a+"%"}):d.animate({left:100*-a+"%"}),c("#swipebox-slider .slide").removeClass("current"),c("#swipebox-slider .slide").eq(a).addClass("current"),this.setTitle(a),b&&d.fadeIn(),c("#swipebox-prev, #swipebox-next").removeClass("disabled"),0===a?c("#swipebox-prev").addClass("disabled"):a===k.length-1&&c("#swipebox-next").addClass("disabled")},openSlide:function(b){c("html").addClass("swipebox-html"),o&&c("html").addClass("swipebox-touch"),c(a).trigger("resize"),this.setSlide(b,!0)},preloadMedia:function(a){var b=this,c=null;k[a]!==d&&(c=k[a].href),b.isVideo(c)?b.openMedia(a):setTimeout(function(){b.openMedia(a)},1e3)},openMedia:function(a){var b=this,e=null;return k[a]!==d&&(e=k[a].href),0>a||a>=k.length?!1:void(b.isVideo(e)?c("#swipebox-slider .slide").eq(a).html(b.getVideo(e)):b.loadMedia(e,function(){c("#swipebox-slider .slide").eq(a).html(this)}))},setTitle:function(a){var b=null;c("#swipebox-caption").empty(),k[a]!==d&&(b=k[a].title),b&&c("#swipebox-caption").append(b)},isVideo:function(a){return a&&(a.match(/youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/)||a.match(/vimeo\.com\/([0-9]*)/)||a.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/))?!0:void 0},getVideo:function(a){var b="",c=a.match(/watch\?v=([a-zA-Z0-9\-_]+)/),d=a.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/),e=a.match(/vimeo\.com\/([0-9]*)/);return c||d?(d&&(c=d),b='<iframe width="560" height="315" src="//www.youtube.com/embed/'+c[1]+'" frameborder="0" allowfullscreen></iframe>'):e&&(b='<iframe width="560" height="315"  src="//player.vimeo.com/video/'+e[1]+"?byline=0&amp;portrait=0&amp;color="+j.settings.vimeoColor+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'),'<div class="swipebox-video-container" style="max-width:'+j.settings.videomaxWidth+'px"><div class="swipebox-video">'+b+"</div></div>"},loadMedia:function(a,b){if(!this.isVideo(a)){var d=c("<img>").on("load",function(){b.call(d)});d.attr("src",a)}},getNext:function(){var a=this,b=c("#swipebox-slider .slide").index(c("#swipebox-slider .slide.current"));b+1<k.length?(b++,a.setSlide(b),a.preloadMedia(b+1)):(c("#swipebox-slider").addClass("rightSpring"),setTimeout(function(){c("#swipebox-slider").removeClass("rightSpring")},500))},getPrev:function(){var a=c("#swipebox-slider .slide").index(c("#swipebox-slider .slide.current"));a>0?(a--,this.setSlide(a),this.preloadMedia(a-1)):(c("#swipebox-slider").addClass("leftSpring"),setTimeout(function(){c("#swipebox-slider").removeClass("leftSpring")},500))},closeSlide:function(){c("html").removeClass("swipebox-html"),c("html").removeClass("swipebox-touch"),c(a).trigger("resize"),this.destroy()},destroy:function(){c(a).unbind("keyup"),c("body").unbind("touchstart"),c("body").unbind("touchmove"),c("body").unbind("touchend"),c("#swipebox-slider").unbind(),c("#swipebox-overlay").remove(),c.isArray(e)||e.removeData("_swipebox"),this.target&&this.target.trigger("swipebox-destroy"),c.swipebox.isOpen=!1,j.settings.afterClose&&j.settings.afterClose()}},j.init()},c.fn.swipebox=function(a){if(!c.data(this,"_swipebox")){var b=new c.swipebox(this,a);this.data("_swipebox",b)}return this.data("_swipebox")}}(window,document,jQuery);


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT / GPLv2 License.
*/
(function(w){	var ua = navigator.userAgent;if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){		return;	}    var doc = w.document;if( !doc.querySelector ){ return; }    var meta = doc.querySelector( "meta[name=viewport]" ),initialContent = meta && meta.getAttribute( "content" ),disabledZoom = initialContent + ",maximum-scale=1",enabledZoom = initialContent + ",maximum-scale=10", enabled = true,	x, y, z, aig;    if( !meta ){ return; }function restoreZoom(){meta.setAttribute( "content", enabledZoom );enabled = true;} function disableZoom(){meta.setAttribute( "content", disabledZoom );enabled = false;}   function checkTilt( e ){aig = e.accelerationIncludingGravity;x = Math.abs( aig.x );	y = Math.abs( aig.y );	z = Math.abs( aig.z );	if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){if( enabled ){disableZoom();}}else if( !enabled ){restoreZoom();        }    }w.addEventListener( "orientationchange", restoreZoom, false );	w.addEventListener( "devicemotion", checkTilt, false );})( this );

// Perfect scrollbar with mousewheel
(function($){var defaultSettings={wheelSpeed:10,wheelPropagation:false};jQuery.fn.perfectScrollbar=function(suppliedSettings,option){var settings=jQuery.extend(true,{},defaultSettings);if(typeof suppliedSettings==="object"){jQuery.extend(true,settings,suppliedSettings)}else{option=suppliedSettings}if(option==="update"){if(jQuery(this).data("perfect-scrollbar-update")){jQuery(this).data("perfect-scrollbar-update")()}return jQuery(this)}else if(option==="destroy"){if(jQuery(this).data("perfect-scrollbar-destroy")){jQuery(this).data("perfect-scrollbar-destroy")()}return jQuery(this)}if(jQuery(this).data("perfect-scrollbar")){return jQuery(this).data("perfect-scrollbar")}var $this=jQuery(this).addClass("ps-container"),$content=jQuery(this).children(),$scrollbarX=jQuery("<div class='ps-scrollbar-x'></div>").appendTo($this),$scrollbarY=jQuery("<div class='ps-scrollbar-y'></div>").appendTo($this),containerWidth,containerHeight,contentWidth,contentHeight,scrollbarXWidth,scrollbarXLeft,scrollbarXBottom=parseInt($scrollbarX.css("bottom"),10),scrollbarYHeight,scrollbarYTop,scrollbarYRight=parseInt($scrollbarY.css("right"),10);var updateContentScrollTop=function(){var scrollTop=parseInt(scrollbarYTop*contentHeight/containerHeight,10);$this.scrollTop(scrollTop);$scrollbarX.css({bottom:scrollbarXBottom-scrollTop})};var updateContentScrollLeft=function(){var scrollLeft=parseInt(scrollbarXLeft*contentWidth/containerWidth,10);$this.scrollLeft(scrollLeft);$scrollbarY.css({right:scrollbarYRight-scrollLeft})};var updateBarSizeAndPosition=function(){containerWidth=$this.width();containerHeight=$this.height();contentWidth=$content.outerWidth(false);contentHeight=$content.outerHeight(false);if(containerWidth<contentWidth){scrollbarXWidth=parseInt(containerWidth*containerWidth/contentWidth,10);scrollbarXLeft=parseInt($this.scrollLeft()*containerWidth/contentWidth,10)}else{scrollbarXWidth=0;scrollbarXLeft=0;$this.scrollLeft(0)}if(containerHeight<contentHeight){scrollbarYHeight=parseInt(containerHeight*containerHeight/contentHeight,10);scrollbarYTop=parseInt($this.scrollTop()*containerHeight/contentHeight,10)}else{scrollbarYHeight=0;scrollbarYTop=0;$this.scrollTop(0)}if(scrollbarYTop>=containerHeight-scrollbarYHeight){scrollbarYTop=containerHeight-scrollbarYHeight}if(scrollbarXLeft>=containerWidth-scrollbarXWidth){scrollbarXLeft=containerWidth-scrollbarXWidth}$scrollbarX.css({left:scrollbarXLeft+$this.scrollLeft(),bottom:scrollbarXBottom-$this.scrollTop(),width:scrollbarXWidth});$scrollbarY.css({top:scrollbarYTop+$this.scrollTop(),right:scrollbarYRight-$this.scrollLeft(),height:scrollbarYHeight})};var moveBarX=function(currentLeft,deltaX){var newLeft=currentLeft+deltaX,maxLeft=containerWidth-scrollbarXWidth;if(newLeft<0){scrollbarXLeft=0}else if(newLeft>maxLeft){scrollbarXLeft=maxLeft}else{scrollbarXLeft=newLeft}$scrollbarX.css({left:scrollbarXLeft+$this.scrollLeft()})};var moveBarY=function(currentTop,deltaY){var newTop=currentTop+deltaY,maxTop=containerHeight-scrollbarYHeight;if(newTop<0){scrollbarYTop=0}else if(newTop>maxTop){scrollbarYTop=maxTop}else{scrollbarYTop=newTop}$scrollbarY.css({top:scrollbarYTop+$this.scrollTop()})};var bindMouseScrollXHandler=function(){var currentLeft,currentPageX;$scrollbarX.bind("mousedown.perfect-scroll",function(e){currentPageX=e.pageX;currentLeft=$scrollbarX.position().left;$scrollbarX.addClass("in-scrolling");e.stopPropagation();e.preventDefault()});jQuery(document).bind("mousemove.perfect-scroll",function(e){if($scrollbarX.hasClass("in-scrolling")){moveBarX(currentLeft,e.pageX-currentPageX);updateContentScrollLeft();e.stopPropagation();e.preventDefault()}});jQuery(document).bind("mouseup.perfect-scroll",function(e){if($scrollbarX.hasClass("in-scrolling")){$scrollbarX.removeClass("in-scrolling")}})};var bindMouseScrollYHandler=function(){var currentTop,currentPageY;$scrollbarY.bind("mousedown.perfect-scroll",function(e){currentPageY=e.pageY;currentTop=$scrollbarY.position().top;$scrollbarY.addClass("in-scrolling");e.stopPropagation();e.preventDefault()});jQuery(document).bind("mousemove.perfect-scroll",function(e){if($scrollbarY.hasClass("in-scrolling")){moveBarY(currentTop,e.pageY-currentPageY);updateContentScrollTop();e.stopPropagation();e.preventDefault()}});jQuery(document).bind("mouseup.perfect-scroll",function(e){if($scrollbarY.hasClass("in-scrolling")){$scrollbarY.removeClass("in-scrolling")}})};var bindMouseWheelHandler=function(){var shouldPreventDefault=function(deltaX,deltaY){var scrollTop=$this.scrollTop();if(scrollTop===0&&deltaY>0&&deltaX===0){return!settings.wheelPropagation}else if(scrollTop>=contentHeight-containerHeight&&deltaY<0&&deltaX===0){return!settings.wheelPropagation}var scrollLeft=$this.scrollLeft();if(scrollLeft===0&&deltaX<0&&deltaY===0){return!settings.wheelPropagation}else if(scrollLeft>=contentWidth-containerWidth&&deltaX>0&&deltaY===0){return!settings.wheelPropagation}return true};$this.mousewheel(function(e,delta,deltaX,deltaY){$this.scrollTop($this.scrollTop()-deltaY*settings.wheelSpeed);$this.scrollLeft($this.scrollLeft()+deltaX*settings.wheelSpeed);updateBarSizeAndPosition();if(shouldPreventDefault(deltaX,deltaY)){e.preventDefault()}})};var bindMobileTouchHandler=function(){var applyTouchMove=function(differenceX,differenceY){$this.scrollTop($this.scrollTop()-differenceY);$this.scrollLeft($this.scrollLeft()-differenceX);updateBarSizeAndPosition()};var startCoords={},startTime=0,speed={},breakingProcess=null;$this.bind("touchstart.perfect-scroll",function(e){var touch=e.originalEvent.targetTouches[0];startCoords.pageX=touch.pageX;startCoords.pageY=touch.pageY;startTime=(new Date).getTime();if(breakingProcess!==null){clearInterval(breakingProcess)}});$this.bind("touchmove.perfect-scroll",function(e){var touch=e.originalEvent.targetTouches[0];var currentCoords={};currentCoords.pageX=touch.pageX;currentCoords.pageY=touch.pageY;var differenceX=currentCoords.pageX-startCoords.pageX,differenceY=currentCoords.pageY-startCoords.pageY;applyTouchMove(differenceX,differenceY);startCoords=currentCoords;var currentTime=(new Date).getTime();speed.x=differenceX/(currentTime-startTime);speed.y=differenceY/(currentTime-startTime);startTime=currentTime;e.preventDefault()});$this.bind("touchend.perfect-scroll",function(e){breakingProcess=setInterval(function(){if(Math.abs(speed.x)<.01&&Math.abs(speed.y)<.01){clearInterval(breakingProcess);return}applyTouchMove(speed.x*30,speed.y*30);speed.x*=.8;speed.y*=.8},10)})};var destroy=function(){$scrollbarX.remove();$scrollbarY.remove();$this.unbind("mousewheel");$this.unbind("touchstart.perfect-scroll");$this.unbind("touchmove.perfect-scroll");$this.unbind("touchend.perfect-scroll");jQuery(window).unbind("mousemove.perfect-scroll");jQuery(window).unbind("mouseup.perfect-scroll");$this.data("perfect-scrollbar",null);$this.data("perfect-scrollbar-update",null);$this.data("perfect-scrollbar-destroy",null)};var isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);var initialize=function(){updateBarSizeAndPosition();bindMouseScrollXHandler();bindMouseScrollYHandler();if(isMobile){bindMobileTouchHandler()}if($this.mousewheel){bindMouseWheelHandler()}$this.data("perfect-scrollbar",$this);$this.data("perfect-scrollbar-update",updateBarSizeAndPosition);$this.data("perfect-scrollbar-destroy",destroy)};initialize();return $this}})(jQuery);(function($){var types=["DOMMouseScroll","mousewheel"];if(jQuery.event.fixHooks){for(var i=types.length;i;){jQuery.event.fixHooks[types[--i]]=jQuery.event.mouseHooks}}jQuery.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false)}}else{this.onmousewheel=null}}};jQuery.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=jQuery.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120}if(orgEvent.detail){delta=-orgEvent.detail/3}deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120}if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120}args.unshift(event,delta,deltaX,deltaY);return(jQuery.event.dispatch||jQuery.event.handle).apply(this,args)}})(jQuery);

//jQuery Cookie Plugin v1.3
//https://github.com/carhartl/jquery-cookie
(function ($, document, undefined) {
	var pluses = /\+/g;
	function raw(s) {
		return s;
	}
	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}
	var config = jQuery.cookie = function (key, value, options) {
		// write
		if (value !== undefined) {
			options = jQuery.extend({}, config.defaults, options);
			if (value === null) {
				options.expires = -1;
			}
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = config.json ? JSON.stringify(value) : String(value);
			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}
		return null;
	};
	config.defaults = {};
	jQuery.removeCookie = function (key, options) {
		if (jQuery.cookie(key) !== null) {
			jQuery.cookie(key, null, options);
			return true;
		}
		return false;
	};
})(jQuery, document);


// jQuery Easing

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

// Same Height Blocks

function getTopHeight() {
	var currentTallest = 0;
	function updateTallest(object){	
		actualHeight = object.height();
		if(currentTallest<actualHeight){
			currentTallest = actualHeight;
		}
		return currentTallest;	
	}
	var totalobjects = jQuery('.equalizeblocks').length;
	var indexx  = 0;
	jQuery('.equalizeblocks').each(function(index) {

				var thisblock = jQuery(this);
				thisblock.css({height:"auto"});
				var thisimg = jQuery(this).find('img');	
				indexx++;
				if(thisimg.length==0){
					var resultsize = updateTallest(thisblock);	
				}else{
					thisimg.load(function() {
						var resultsize = updateTallest(thisblock);	
					});	

				}
				if(indexx==totalobjects){
					jQuery('.equalizeblocks').each(function(index) {
									jQuery(this).css({height:resultsize});						   
					});
				}
	 });					
}

// jQuery Quicksand
// http://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt

(function ($) {
    jQuery.fn.quicksand = function (collection, customOptions) {     
        var options = {
            duration: 750,
            easing: 'swing',
            attribute: 'data-id',
            adjustHeight: 'auto',
            useScaling: true,
            enhancement: function(c) {},
            selector: '> *',
            dx: 0,
            dy: 0
        };
        jQuery.extend(options, customOptions);
        if (jQuery.browser.msie || (typeof(jQuery.fn.scale) == 'undefined')) {
            // Got IE and want scaling effect? Kiss my ass.
            options.useScaling = false;
        }
        var callbackFunction;
        if (typeof(arguments[1]) == 'function') {
            var callbackFunction = arguments[1];
        } else if (typeof(arguments[2] == 'function')) {
            var callbackFunction = arguments[2];
        }
        return this.each(function (i) {
            var val;
            var animationQueue = []; // used to store all the animation params before starting the animation; solves initial animation slowdowns
            var $collection = jQuery(collection).clone(); // destination (target) collection
            var $sourceParent = jQuery(this); // source, the visible container of source collection
            var sourceHeight = jQuery(this).css('height'); // used to keep height and document flow during the animation
            var destHeight;
            var adjustHeightOnCallback = false;
            var offset = jQuery($sourceParent).offset(); // offset of visible container, used in animation calculations
            var offsets = []; // coordinates of every source collection item            
            var $source = jQuery(this).find(options.selector); // source collection items
            if (jQuery.browser.msie && jQuery.browser.version.substr(0,1)<7) {
                $sourceParent.html('').append($collection);
                return;
            }
            var postCallbackPerformed = 0; 
            var postCallback = function () {
                if (!postCallbackPerformed) {
                    postCallbackPerformed = 1;
                    $toDelete = $sourceParent.find('> *');
                    $sourceParent.prepend($dest.find('> *'));
                    $toDelete.remove();
                         
                    if (adjustHeightOnCallback) {
                        $sourceParent.css('height', destHeight);
                    }
                    options.enhancement($sourceParent); // Perform custom visual enhancements on a newly replaced collection
                    if (typeof callbackFunction == 'function') {
                        callbackFunction.call(this);
                    }                    
                }
            };            
            var $correctionParent = $sourceParent.offsetParent();
            var correctionOffset = $correctionParent.offset();
            if ($correctionParent.css('position') == 'relative') {
                if ($correctionParent.get(0).nodeName.toLowerCase() == 'body') {
                } else {
                    correctionOffset.top += (parseFloat($correctionParent.css('border-top-width')) || 0);
                    correctionOffset.left +=( parseFloat($correctionParent.css('border-left-width')) || 0);
                }
            } else {
                correctionOffset.top -= (parseFloat($correctionParent.css('border-top-width')) || 0);
                correctionOffset.left -= (parseFloat($correctionParent.css('border-left-width')) || 0);
                correctionOffset.top -= (parseFloat($correctionParent.css('margin-top')) || 0);
                correctionOffset.left -= (parseFloat($correctionParent.css('margin-left')) || 0);
            }
            if (isNaN(correctionOffset.left)) {
                correctionOffset.left = 0;
            }
            if (isNaN(correctionOffset.top)) {
                correctionOffset.top = 0;
            }
            
            correctionOffset.left -= options.dx;
            correctionOffset.top -= options.dy;

            $sourceParent.css('height', jQuery(this).height());
            
            $source.each(function (i) {
                offsets[i] = jQuery(this).offset();
            });
            jQuery(this).stop();
            var dx = 0; var dy = 0;
            $source.each(function (i) {
                jQuery(this).stop(); // stop animation of collection items
                var rawObj = jQuery(this).get(0);
                if (rawObj.style.position == 'absolute') {
                    dx = -options.dx;
                    dy = -options.dy;
                } else {
                    dx = options.dx;
                    dy = options.dy;                    
                }
                rawObj.style.position = 'absolute';
                rawObj.style.margin = '0';
                rawObj.style.top = (offsets[i].top - parseFloat(rawObj.style.marginTop) - correctionOffset.top + dy) + 'px';
                rawObj.style.left = (offsets[i].left - parseFloat(rawObj.style.marginLeft) - correctionOffset.left + dx) + 'px';
            });
                    
            // create temporary container with destination collection
            var $dest = jQuery($sourceParent).clone();
            var rawDest = $dest.get(0);
            rawDest.innerHTML = '';
            rawDest.setAttribute('id', '');
            rawDest.style.height = 'auto';
            rawDest.style.width = $sourceParent.width() + 'px';
            $dest.append($collection);      
            $dest.insertBefore($sourceParent);
            $dest.css('opacity', 0.0);
            rawDest.style.zIndex = -1;           
            rawDest.style.margin = '0';
            rawDest.style.position = 'absolute';
            rawDest.style.top = offset.top - correctionOffset.top + 'px';
            rawDest.style.left = offset.left - correctionOffset.left + 'px';

            if (options.adjustHeight === 'dynamic') {
                $sourceParent.animate({height: $dest.height()}, options.duration, options.easing);
            } else if (options.adjustHeight === 'auto') {
                destHeight = $dest.height();
                if (parseFloat(sourceHeight) < parseFloat(destHeight)) {
                    $sourceParent.css('height', destHeight);
                } else {
                    adjustHeightOnCallback = true;
                }
            }
            $source.each(function (i) {
                var destElement = [];
                if (typeof(options.attribute) == 'function') {                    
                    val = options.attribute(jQuery(this));
                    $collection.each(function() {
                        if (options.attribute(this) == val) {
                            destElement = jQuery(this);
                            return false;
                        }
                    });
                } else {
                    destElement = $collection.filter('[' + options.attribute + '=' + jQuery(this).attr(options.attribute) + ']');
                }
                if (destElement.length) {
                    // The item is both in source and destination collections
                    // It it's under different position, let's move it
                    if (!options.useScaling) {
                        animationQueue.push(
                                            {
                                                element: jQuery(this), 
                                                animation: 
                                                    {top: destElement.offset().top - correctionOffset.top, 
                                                     left: destElement.offset().left - correctionOffset.left, 
                                                     opacity: 1.0
                                                    }
                                            });

                    } else {
                        animationQueue.push({
                                            element: jQuery(this), 
                                            animation: {top: destElement.offset().top - correctionOffset.top, 
                                                        left: destElement.offset().left - correctionOffset.left, 
                                                        opacity: 1.0, 
                                                        scale: '1.0'
                                                       }
                                            });

                    }
                } else {
                    if (!options.useScaling) {
                        animationQueue.push({element: jQuery(this), 
                                             animation: {opacity: '0.0'}});
                    } else {
                        animationQueue.push({element: jQuery(this), animation: {opacity: '0.0', 
                                         scale: '0.0'}});
                    }
                }
            });
            
            $collection.each(function (i) {
                var sourceElement = [];
                var destElement = [];
                if (typeof(options.attribute) == 'function') {
                    val = options.attribute(jQuery(this));
                    $source.each(function() {
                        if (options.attribute(this) == val) {
                            sourceElement = jQuery(this);
                            return false;
                        }
                    });                 

                    $collection.each(function() {
                        if (options.attribute(this) == val) {
                            destElement = jQuery(this);
                            return false;
                        }
                    });
                } else {
                    sourceElement = $source.filter('[' + options.attribute + '=' + jQuery(this).attr(options.attribute) + ']');
                    destElement = $collection.filter('[' + options.attribute + '=' + jQuery(this).attr(options.attribute) + ']');
                }
                var animationOptions;
                if (sourceElement.length === 0) {
                    if (!options.useScaling) {
                        animationOptions = {
                            opacity: '1.0'
                        };
                    } else {
                        animationOptions = {
                            opacity: '1.0',
                            scale: '1.0'
                        };
                    }
                    d = destElement.clone();
                    var rawDestElement = d.get(0);
                    rawDestElement.style.position = 'absolute';
                    rawDestElement.style.margin = '0';
                    rawDestElement.style.top = destElement.offset().top - correctionOffset.top + 'px';
                    rawDestElement.style.left = destElement.offset().left - correctionOffset.left + 'px';
                    d.css('opacity', 0.0); // IE
                    if (options.useScaling) {
                        d.css('transform', 'scale(0.0)');
                    }
                    d.appendTo($sourceParent);                    
                    animationQueue.push({element: jQuery(d), 
                                         animation: animationOptions});
                }
            });
            
            $dest.remove();
            options.enhancement($sourceParent);
            for (i = 0; i < animationQueue.length; i++) {
                animationQueue[i].element.animate(animationQueue[i].animation, options.duration, options.easing, postCallback);
            }
        });
    };
})(jQuery);

/* = quicksand filter
======================================================*/

var quicksand_filter = function(){
  var $filterType = jQuery('.filterOptions li.active a').attr('class');
  var $holder = jQuery('.filterable-grid');
  var $data = $holder.clone();
	jQuery('.filterOptions a').click(function(e) {
		e.preventDefault();
		jQuery('.filterOptions li').removeClass('active');
		var $filterType = jQuery(this).attr('class');
		jQuery(this).parent().addClass('active');
		if ($filterType == 'all') {
			var filteredData = $data.find('.qw-quicksand-item');
		} 
		else {
			var filteredData = $data.find('.qw-quicksand-item[data-type~=' + $filterType + ']');
		}
		// call quicksand and assign transition parameters
		$holder.quicksand(filteredData, {
			duration: 500,
			adjustHeight: 'dynamic' ,
			easing: 'easeInOutQuad'
		});
		return false;

	});
}


jQuery.autoBgStyles = function(){
	jQuery("[data-bgimg]").each(function(i,c){
		var img = jQuery(this).attr("data-bgimg");
		if(img !== ""){
			jQuery(this).css({"background": "url("+img+")","background-size":"cover" });
		}
	});	
}



jQuery.fn.removeStyle = function(style)
{
    var search = new RegExp(style + '[^;]+;?', 'g');
    return this.each(function()
    {
        jQuery(this).attr('style', function(i, style)
        {
        	if(style != undefined){
	            return style.replace(search, '');
	        }
        });
    });

};


jQuery.fn.squaredblock = function(){
	jQuery(".qw-squaredblock").each(function(i,c){

var t = jQuery(this);
		t.css({width:"100%"});
		var	w = t.width();
		t.css({width:w+"px",height:w+"px"});

	});
}

jQuery.QTSPtodoAfterResize = function(){
	//return;

	if(jQuery(".qw-keepsize").length >0 ){
		jQuery(".qw-keepsize").each(function(i,c){
			jQuery(this).css({width:jQuery(this).width()+"px !important"});
		});
	}

	if(jQuery.beingExecuted == 0){
		jQuery.beingExecuted = 1;
		jQuery(".filterable-grid").css({opacity:0});
		jQuery(".filterable-grid").each(function(i,c){
			var that = jQuery(this);		
			var width = that.find(".qw-quicksand-item:first-child").outerWidth(),
				height = width/16*9;

			that.find('.qw-quicksand-item').each(function(l,o){
				var t = jQuery(this);
				t.find(".qw-keepwidth").each(function(){

					jQuery(this).css({width:width+"px"});
				});
				t.find("img").each(function(i,c){
					var im = jQuery(this);
				//	im.css({width:im.outerWidth()+"px"});
				//	im.hide();
				});
			});
			
			that.animate({opacity:1},400);
		});
		jQuery.fn.squaredblock();
		getTopHeight();
		jQuery.autoBgStyles();

		quicksand_filter();
		jQuery(".filterable-grid").animate({opacity:1},500);
	}

	jQuery.beingExecuted = 0;
}
jQuery.beingExecuted = 0;


jQuery.qwFixBlocks = function (v) {
	jQuery.QTSPtodoAfterResize(v);
}


jQuery(window).resize(function() {
	jQuery(".filterable-grid").css({opacity:.5});
	jQuery('.qw-element, .filterable-grid').removeStyle("width");
	jQuery(".qw-squaredblock").removeStyle("width").removeStyle("height");
	if(typeof(timeoutHandle) !== "undefined"){
		window.clearTimeout(timeoutHandle);
	}
 	timeoutHandle = window.setTimeout(function (){
			jQuery.qwFixBlocks(1);
    }, 800); // using timeout because it wants to execute this too early!!
});








/* = function to expand the new mixcloud player 
========================================================*/
function mixcloudExpandableButton(){
	var btnsarray = jQuery(".qw-expandplayerinfo");
	if(btnsarray.length > 0){
		btnsarray.each(function(i,c){
				var btn = jQuery(this);
				var playter = btn.parent().prev("iframe.mixcloudplayer");
				playter.attr('data-state',0);
				btn.click(function(e){
					e.preventDefault();	
					if(playter.attr('data-state')==0){
						playter.animate({"height":"500px"},200);
						playter.attr('data-state',1);
					}else{
						playter.animate({"height":"140px"},200);
						playter.attr('data-state',0);
					}
					return true;
				});
		});
	}
}

// Podcastarchive (custom script by qantumThemes
function newfunction (url) {
	   	var mixcloudExpression = /http\:\/\/www\.mixcloud\.com\/[\w-]{0,150}\/[\w-]{0,150}\/[\w-]{0,1}/ig;  
	   	var mixcloudExpression2 = /https\:\/\/www\.mixcloud\.com\/[\w-]{0,150}\/[\w-]{0,150}\/[\w-]{0,1}/ig;  
		if(url.match(mixcloudExpression)  || url.match(mixcloudExpression2)){
			var finalurl = ((encodeURIComponent(url)));
			var embedcode ='<iframe data-state="0" class="mixcloudplayer" width="100%" height="140" src="//www.mixcloud.com/widget/iframe/?feed='+finalurl+'&embed_uuid=addfd1ba-1531-4f6e-9977-6ca2bd308dcc&stylecolor=&embed_type=widget_standard" frameborder="0"></iframe><span><a class="btn btn-small pull-right qw-expandplayerinfo">Expand player info <i class="icon-plus-sign"></i></a></span><div class="canc"></div>';	
			jQuery('#PlaylistEmbeddedPlayer').remove();
			jQuery('.qw-playercontainer-inpage').animate({
					  height:'auto',  
				 },
				 500,
				 function(){
					  jQuery(this).append('<div id="PlaylistEmbeddedPlayer">'+embedcode+'</div>');
					  mixcloudExpandableButton();
				});
		}	
		var soundcloudExpression = /(\http:\/\/soundcloud.com\/+([a-zA-Z0-9\/\-]*))/g;  
		var soundcloudExpression2 = /(\https:\/\/soundcloud.com\/+([a-zA-Z0-9\/\-]*))/g;
		if(url.match(soundcloudExpression) || url.match(soundcloudExpression2)){
			var finalurl = ((encodeURIComponent(url)));
			var finalurl = url.replace(':','%3A');	
			jQuery('#PlaylistEmbeddedPlayer').remove();
			jQuery('.qw-playercontainer-inpage').animate(								
				{ height:'176px'},
				500,
				function(){
					  jQuery.getJSON('https://soundcloud.com/oembed?maxheight=160&format=js&url=' + finalurl + '&iframe=true&callback=?', function(response){
						jQuery('.qw-playercontainer-inpage').append('<div id="PlaylistEmbeddedPlayer">'+response.html+'</div>');
				});					 
			});
		}		
		var mp3Expression = /\.(mp3)$/i
		if(url.match(mp3Expression)){
			/*jQuery(".qw-musicplayer").css({"top": 0,  "margin": 0, "position": "relative"});
			jQuery("a[href$='.mp3']").removeClass('beingplayed');
			jQuery('a#playerlink').attr('href',url);
			actualplaying = url;
			soundManager.unload('igorsound');
			soundManager.destroySound('igorsound');
			threeSixtyPlayer.init();
			jQuery.cookie('smCurrentUrl', url, { expires: 1, path: '/' });	
			jQuery('span.sm2-360btn').click();*/
			
		}
}


// Contentcarousel

(function($) {

		var	aux		= {
				// navigates left / right
				navigate	: function( dir, $el, $wrapper, opts, cache ) {
					
					var scroll		= opts.scroll,
						factor		= 1,
						idxClicked	= 0;
						
					if( cache.expanded ) {
						scroll		= 1; // scroll is always 1 in full mode
						factor		= 3; // the width of the expanded item will be 3 times bigger than 1 collapsed item	
						idxClicked	= cache.idxClicked; // the index of the clicked item
					}
					
					// clone the elements on the right / left and append / prepend them according to dir and scroll
					if( dir === 1 ) {
						$wrapper.find('div.ca-item:lt(' + scroll + ')').each(function(i) {
							jQuery(this).clone(true).css( 'left', ( cache.totalItems - idxClicked + i ) * cache.itemW * factor + 'px' ).appendTo( $wrapper );
						});
					}
					else {
						var $first	= $wrapper.children().eq(0);
						
						$wrapper.find('div.ca-item:gt(' + ( cache.totalItems  - 1 - scroll ) + ')').each(function(i) {
							// insert before $first so they stay in the right order
							jQuery(this).clone(true).css( 'left', - ( scroll - i + idxClicked ) * cache.itemW * factor + 'px' ).insertBefore( $first );
						});
					}
					
					// animate the left of each item
					// the calculations are dependent on dir and on the cache.expanded value
					$wrapper.find('div.ca-item').each(function(i) {
						var $item	= jQuery(this);
						$item.stop().animate({
							left	:  ( dir === 1 ) ? '-=' + ( cache.itemW * factor * scroll ) + 'px' : '+=' + ( cache.itemW * factor * scroll ) + 'px'
						}, opts.sliderSpeed, opts.sliderEasing, function() {
							if( ( dir === 1 && $item.position().left < - idxClicked * cache.itemW * factor ) || ( dir === -1 && $item.position().left > ( ( cache.totalItems - 1 - idxClicked ) * cache.itemW * factor ) ) ) {
								// remove the item that was cloned
								$item.remove();
							}						
							cache.isAnimating	= false;
						});
					});
					
				},
				// opens an item (animation) -> opens all the others
				openItem	: function( $wrapper, $item, opts, cache ) {
					cache.idxClicked	= $item.index();
					// the item's position (1, 2, or 3) on the viewport (the visible items) 
					cache.winpos		= aux.getWinPos( $item.position().left, cache );
					$wrapper.find('div.ca-item').not( $item ).hide();
					$item.find('div.ca-content-wrapper').css( 'left', cache.itemW + 'px' ).stop().animate({
						width	: cache.itemW * 2 + 'px',
						left	: cache.itemW + 'px'
					}, opts.itemSpeed, opts.itemEasing)
					.end()
					.stop()
					.animate({
						left	: '0px'
					}, opts.itemSpeed, opts.itemEasing, function() {
						cache.isAnimating	= false;
						cache.expanded		= true;
						
						aux.openItems( $wrapper, $item, opts, cache );
					});
							
				},
				// opens all the items
				openItems	: function( $wrapper, $openedItem, opts, cache ) {
					var openedIdx	= $openedItem.index();
					
					$wrapper.find('div.ca-item').each(function(i) {
						var $item	= jQuery(this),
							idx		= $item.index();
						
						if( idx !== openedIdx ) {
							$item.css( 'left', - ( openedIdx - idx ) * ( cache.itemW * 3 ) + 'px' ).show().find('div.ca-content-wrapper').css({
								left	: cache.itemW + 'px',
								width	: cache.itemW * 2 + 'px'
							});
							
							// hide more link
							aux.toggleMore( $item, false );
						}
					});
				},
				// show / hide the item's more button
				toggleMore	: function( $item, show ) {
					( show ) ? $item.find('a.ca-more').show() : $item.find('a.ca-more').hide();	
				},
				// close all the items
				// the current one is animated
				closeItems	: function( $wrapper, $openedItem, opts, cache ) {
					var openedIdx	= $openedItem.index();
					
					$openedItem.find('div.ca-content-wrapper').stop().animate({
						width	: '0px'
					}, opts.itemSpeed, opts.itemEasing)
					.end()
					.stop()
					.animate({
						left	: cache.itemW * ( cache.winpos - 1 ) + 'px'
					}, opts.itemSpeed, opts.itemEasing, function() {
						cache.isAnimating	= false;
						cache.expanded		= false;
					});
					
					// show more link
					aux.toggleMore( $openedItem, true );
					
					$wrapper.find('div.ca-item').each(function(i) {
						var $item	= jQuery(this),
							idx		= $item.index();
						
						if( idx !== openedIdx ) {
							$item.find('div.ca-content-wrapper').css({
								width	: '0px'
							})
							.end()
							.css( 'left', ( ( cache.winpos - 1 ) - ( openedIdx - idx ) ) * cache.itemW + 'px' )
							.show();
							
							// show more link
							aux.toggleMore( $item, true );
						}
					});
				},
				// gets the item's position (1, 2, or 3) on the viewport (the visible items)
				// val is the left of the item
				getWinPos	: function( val, cache ) {
					switch( val ) {
						case 0 					: return 1; break;
						case cache.itemW 		: return 2; break;
						case cache.itemW * 2 	: return 3; break;
					}
				}
			},
			methods = {
				init 		: function( options ) {
					
					if( this.length ) {
						
						var settings = {
							sliderSpeed		: 500,			// speed for the sliding animation
							sliderEasing	: 'easeOutExpo',// easing for the sliding animation
							itemSpeed		: 500,			// speed for the item animation (open / close)
							itemEasing		: 'easeOutExpo',// easing for the item animation (open / close)
							scroll			: 1				// number of items to scroll at a time
						};
						
						return this.each(function() {
							
							// if options exist, lets merge them with our default settings
							if ( options ) {
								jQuery.extend( settings, options );
							}
							
							var $el 			= jQuery(this),
								$wrapper		= $el.find('div.ca-wrapper'),
								$items			= $wrapper.children('div.ca-item'),
								cache			= {};
							
							// save the with of one item	
							// edit igor

							cache.itemW			= 308;
							if(jQuery(window).width() > 1200){

								if (jQuery("body").hasClass("Unboxed")){
									cache.itemW			= 383;
								}else{
									cache.itemW			= 367;
								}
							}else{
								if (jQuery("body").hasClass("Unboxed")){
									cache.itemW			= 309;
								}else{
									cache.itemW			= 300;
								}

							}

							cache.totalItems	= $items.length;
							
							// add navigation buttons
							if( cache.totalItems > 3 )	
								//$el.parent().parent().parent().parent().prepend('<div class="ca-nav"><span class="ca-nav-prev">Previous</span><span class="ca-nav-next">Next</span></div>')	
							
							// control the scroll value
							if( settings.scroll < 1 )
								settings.scroll = 1;
							else if( settings.scroll > 3 )
								settings.scroll = 3;	
							var $navPrev		= jQuery(document).find('span.qw-nav-prev'),
								$navNext		= jQuery(document).find('span.qw-nav-next');
							$wrapper.css( 'overflow', 'hidden' );
							$items.each(function(i) {
								jQuery(this).css({
									position	: 'absolute',
									left		: i * cache.itemW + 'px'
								});
							});
							$el.actualState = 'closed';
							$thisElementHere = $el.find('a.ca-expand-box');
							$thisElementHere.live('click.contentcarousel', function( event ) {
								
								if ($el.actualState == 'closed'){
									if( cache.isAnimating ) return false;
									cache.isAnimating	= true;
									/*jQuery(this).hide();*/
									var $item	= jQuery(this).closest('div.ca-item');
									aux.openItem( $wrapper, $item, settings, cache );
									$el.find('a.ca-more').text('<< Close');
									$el.actualState = 'open';
								}else{
									if( cache.isAnimating ) return false;
									cache.isAnimating	= true;
									var $item	= jQuery(this).closest('div.ca-item');
									aux.closeItems( $wrapper, $item, settings, cache );
									$el.find('a.ca-more').text('Expand >>');
									$el.actualState = 'closed';
								}
								
								return false;
							});
							
							// END QANTUM PRO cursom fx
							jQuery(".qw-carouselimage").click(
								//function () { jQuery(this).animate({left: '0px'},200);}			
							);

							// click to close the item(s)
							$el.find('a.ca-close').live('click.contentcarousel', function( event ) {
								if( cache.isAnimating ) return false;
								cache.isAnimating	= true;
								var $item	= jQuery(this).closest('div.ca-item');
								aux.closeItems( $wrapper, $item, settings, cache );
								$el.actualState = 'closed';
								return false;
							});
							
							// navigate left
							$navPrev.bind('click.contentcarousel', function( event ) {
								if( cache.isAnimating ) return false;
								cache.isAnimating	= true;
								aux.navigate( -1, $el, $wrapper, settings, cache );
							});
							// navigate right
							$navNext.bind('click.contentcarousel', function( event ) {
								if( cache.isAnimating ) return false;
								cache.isAnimating	= true;
								aux.navigate( 1, $el, $wrapper, settings, cache );
							});
							// adds events to the mouse
							/*
							=========== qwantum theme customization: disable here the scrolling with mouse ============
								*/					
							$el.bind('mousewheel.contentcarousel', function(e, delta) {
								if(delta > 0) {
									
									if( cache.isAnimating ) return false;
									cache.isAnimating	= true;
									aux.navigate( -1, $el, $wrapper, settings, cache );
								}	
								else {
								
									if( cache.isAnimating ) return false;
									cache.isAnimating	= true;
									aux.navigate( 1, $el, $wrapper, settings, cache );
								}	
								return false;
							});
						});
					}
				}
			};

		jQuery.fn.contentcarousel = function(method) {
			if ( methods[method] ) {
				return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
				return methods.init.apply( this, arguments );
			} else {
				jQuery.error( 'Method ' +  method + ' does not exist on jQuery.contentcarousel' );
			}
		};
	
})(jQuery);

/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-transition.js, bootstrap-modal.js, bootstrap-dropdown.js, bootstrap-scrollspy.js, bootstrap-tab.js, bootstrap-tooltip.js, bootstrap-popover.js, bootstrap-affix.js, bootstrap-alert.js, bootstrap-button.js, bootstrap-collapse.js, bootstrap-carousel.js, bootstrap-typeahead.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){a.support.transition=function(){var a=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in b)if(a.style[c]!==undefined)return b[c]}();return a&&{end:a}}()})}(window.jQuery),!function(a){var b=function(b,c){this.options=c,this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this,c=a.Event("show");this.$element.trigger(c);if(this.isShown||c.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.backdrop(function(){var c=a.support.transition&&b.$element.hasClass("fade");b.$element.parent().length||b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in").attr("aria-hidden",!1),b.enforceFocus(),c?b.$element.one(a.support.transition.end,function(){b.$element.focus().trigger("shown")}):b.$element.focus().trigger("shown")})},hide:function(b){b&&b.preventDefault();var c=this;b=a.Event("hide"),this.$element.trigger(b);if(!this.isShown||b.isDefaultPrevented())return;this.isShown=!1,this.escape(),a(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),a.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var b=this;a(document).on("focusin.modal",function(a){b.$element[0]!==a.target&&!b.$element.has(a.target).length&&b.$element.focus()})},escape:function(){var a=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(b){b.which==27&&a.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),b.hideModal()},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),b.hideModal()})},hideModal:function(a){this.$element.hide().trigger("hidden"),this.backdrop()},removeBackdrop:function(){this.$backdrop.remove(),this.$backdrop=null},backdrop:function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?a.proxy(this.$element[0].focus,this.$element[0]):a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(this.removeBackdrop,this)):this.removeBackdrop()):b&&b()}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=a.extend({},a.fn.modal.defaults,d.data(),typeof c=="object"&&c);e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():f.show&&e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},a.fn.modal.Constructor=b,a(document).on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f).one("hide",function(){c.focus()})})}(window.jQuery),!function(a){function d(){a(b).each(function(){e(a(this)).removeClass("open")})}function e(b){var c=b.attr("data-target"),d;return c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,"")),d=a(c),d.length||(d=b.parent()),d}var b="[data-toggle=dropdown]",c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),f,g;if(c.is(".disabled, :disabled"))return;return f=e(c),g=f.hasClass("open"),d(),g||(f.toggleClass("open"),c.focus()),!1},keydown:function(b){var c,d,f,g,h,i;if(!/(38|40|27)/.test(b.keyCode))return;c=a(this),b.preventDefault(),b.stopPropagation();if(c.is(".disabled, :disabled"))return;g=e(c),h=g.hasClass("open");if(!h||h&&b.keyCode==27)return c.click();d=a("[role=menu] li:not(.divider) a",g);if(!d.length)return;i=d.index(d.filter(":focus")),b.keyCode==38&&i>0&&i--,b.keyCode==40&&i<d.length-1&&i++,~i||(i=0),d.eq(i).focus()}},a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a(document).on("click.dropdown.data-api",d).on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.dropdown.data-api",b,c.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",b+", [role=menu]",c.prototype.keydown)}(window.jQuery),!function(a){function b(b,c){var d=a.proxy(this.process,this),e=a(b).is("body")?a(window):a(b),f;this.options=a.extend({},a.fn.scrollspy.defaults,c),this.$scrollElement=e.on("scroll.scroll-spy.data-api",d),this.selector=(this.options.target||(f=a(b).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=a("body"),this.refresh(),this.process()}b.prototype={constructor:b,refresh:function(){var b=this,c;this.offsets=a([]),this.targets=a([]),c=this.$body.find(this.selector).map(function(){var b=a(this),c=b.data("target")||b.attr("href"),d=/^#\w/.test(c)&&a(c);return d&&d.length&&[[d.position().top,c]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,c=b-this.$scrollElement.height(),d=this.offsets,e=this.targets,f=this.activeTarget,g;if(a>=c)return f!=(g=e.last()[0])&&this.activate(g);for(g=d.length;g--;)f!=e[g]&&a>=d[g]&&(!d[g+1]||a<=d[g+1])&&this.activate(e[g])},activate:function(b){var c,d;this.activeTarget=b,a(this.selector).parent(".active").removeClass("active"),d=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',c=a(d).parent("li").addClass("active"),c.parent(".dropdown-menu").length&&(c=c.closest("li.dropdown").addClass("active")),c.trigger("activate")}},a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("scrollspy"),f=typeof c=="object"&&c;e||d.data("scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.defaults={offset:10},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),!function(a){var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f,g;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active:last a")[0],g=a.Event("show",{relatedTarget:e}),b.trigger(g);if(g.isDefaultPrevented())return;f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(window.jQuery),!function(a){var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger=="click"?this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this)):this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f+"."+this.type,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.show)return c.show();clearTimeout(this.timeout),c.hoverState="in",this.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!c.options.delay||!c.options.delay.hide)return c.hide();c.hoverState="out",this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.detach().css({top:0,left:0,display:"block"}).insertAfter(this.$element),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.offset(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).detach()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.detach()})}var b=this,c=this.tip();return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.detach(),this},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);c[c.tip().hasClass("in")?"hide":"show"]()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!1}}(window.jQuery),!function(a){var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content > *")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){var b=function(b,c){this.options=a.extend({},a.fn.affix.defaults,c),this.$window=a(window).on("scroll.affix.data-api",a.proxy(this.checkPosition,this)).on("click.affix.data-api",a.proxy(function(){setTimeout(a.proxy(this.checkPosition,this),1)},this)),this.$element=a(b),this.checkPosition()};b.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var b=a(document).height(),c=this.$window.scrollTop(),d=this.$element.offset(),e=this.options.offset,f=e.bottom,g=e.top,h="affix affix-top affix-bottom",i;typeof e!="object"&&(f=g=e),typeof g=="function"&&(g=e.top()),typeof f=="function"&&(f=e.bottom()),i=this.unpin!=null&&c+this.unpin<=d.top?!1:f!=null&&d.top+this.$element.height()>=b-f?"bottom":g!=null&&c<=g?"top":!1;if(this.affixed===i)return;this.affixed=i,this.unpin=i=="bottom"?d.top-c:null,this.$element.removeClass(h).addClass("affix"+(i?"-"+i:""))},a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("affix"),f=typeof c=="object"&&c;e||d.data("affix",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.defaults={offset:0},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery),!function(a){var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed").remove()}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(document).on("click.alert.data-api",b,c.prototype.close)}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(document).on("click.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle")})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.collapse.defaults,c),this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.prototype={constructor:b,dimension:function(){var a=this.$element.hasClass("width");return a?"width":"height"},show:function(){var b,c,d,e;if(this.transitioning)return;b=this.dimension(),c=a.camelCase(["scroll",b].join("-")),d=this.$parent&&this.$parent.find("> .accordion-group > .in");if(d&&d.length){e=d.data("collapse");if(e&&e.transitioning)return;d.collapse("hide"),e||d.data("collapse",null)}this.$element[b](0),this.transition("addClass",a.Event("show"),"shown"),a.support.transition&&this.$element[b](this.$element[0][c])},hide:function(){var b;if(this.transitioning)return;b=this.dimension(),this.reset(this.$element[b]()),this.transition("removeClass",a.Event("hide"),"hidden"),this.$element[b](0)},reset:function(a){var b=this.dimension();return this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth,this.$element[a!==null?"addClass":"removeClass"]("collapse"),this},transition:function(b,c,d){var e=this,f=function(){c.type=="show"&&e.reset(),e.transitioning=0,e.$element.trigger(d)};this.$element.trigger(c);if(c.isDefaultPrevented())return;this.transitioning=1,this.$element[b]("in"),a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,f):f()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("collapse"),f=typeof c=="object"&&c;e||d.data("collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.defaults={toggle:!0},a.fn.collapse.Constructor=b,a(document).on("click.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e).data("collapse")?"toggle":c.data();c[a(e).hasClass("in")?"addClass":"removeClass"]("collapsed"),a(e).collapse(f)})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=c,this.options.slide&&this.slide(this.options.slide),this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.prototype={cycle:function(b){return b||(this.paused=!1),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},to:function(b){var c=this.$element.find(".item.active"),d=c.parent().children(),e=d.index(c),f=this;if(b>d.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){f.to(b)}):e==b?this.pause().cycle():this.slide(b>e?"next":"prev",a(d[b]))},pause:function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle()),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this,j;this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h](),j=a.Event("slide",{relatedTarget:e[0]});if(e.hasClass("active"))return;if(a.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(j);if(j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),this.$element.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)})}else{this.$element.trigger(j);if(j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}},a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("carousel"),f=a.extend({},a.fn.carousel.defaults,typeof c=="object"&&c),g=typeof c=="string"?c:f.slide;e||d.data("carousel",e=new b(this,f)),typeof c=="number"?e.to(c):g?e[g]():f.interval&&e.cycle()})},a.fn.carousel.defaults={interval:5e3,pause:"hover"},a.fn.carousel.Constructor=b,a(document).on("click.carousel.data-api","[data-slide]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),c.data());e.carousel(f),b.preventDefault()})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.$menu=a(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(a)).change(),this.hide()},updater:function(a){return a},show:function(){var b=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:b.top+b.height,left:b.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){var c;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(c=a.isFunction(this.source)?this.source(this.query,a.proxy(this.process,this)):this.source,c?this.process(c):this)},process:function(b){var c=this;return b=a.grep(b,function(a){return c.matcher(a)}),b=this.sorter(b),b.length?this.render(b.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){var b=[],c=[],d=[],e;while(e=a.shift())e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):d.push(e):b.push(e);return b.concat(c,d)},highlighter:function(a){var b=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return a.replace(new RegExp("("+b+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(b){var c=this;return b=a(b).map(function(b,d){return b=a(c.options.item).attr("data-value",d),b.find("a").html(c.highlighter(d)),b[0]}),b.first().addClass("active"),this.$menu.html(b),this},next:function(b){var c=this.$menu.find(".active").removeClass("active"),d=c.next();d.length||(d=a(this.$menu.find("li")[0])),d.addClass("active")},prev:function(a){var b=this.$menu.find(".active").removeClass("active"),c=b.prev();c.length||(c=this.$menu.find("li").last()),c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",a.proxy(this.keydown,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},eventSupported:function(a){var b=a in this.$element;return b||(this.$element.setAttribute(a,"return;"),b=typeof this.$element[a]=="function"),b},move:function(a){if(!this.shown)return;switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault(),this.prev();break;case 40:a.preventDefault(),this.next()}a.stopPropagation()},keydown:function(b){this.suppressKeyPressRepeat=!~a.inArray(b.keyCode,[40,38,9,13,27]),this.move(b)},keypress:function(a){if(this.suppressKeyPressRepeat)return;this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation(),a.preventDefault()},blur:function(a){var b=this;setTimeout(function(){b.hide()},150)},click:function(a){a.stopPropagation(),a.preventDefault(),this.select()},mouseenter:function(b){this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")}},a.fn.typeahead=function(c){return this.each(function(){var d=a(this),e=d.data("typeahead"),f=typeof c=="object"&&c;e||d.data("typeahead",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},a.fn.typeahead.Constructor=b,a(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(b){var c=a(this);if(c.data("typeahead"))return;b.preventDefault(),c.typeahead(c.data())})}(window.jQuery)



// Fix Bootstrap Dropdown on touch screen

jQuery('.dropdown-toggle').click(function(e) {
  e.preventDefault();
  setTimeout(jQuery.proxy(function() {
    if ('ontouchstart' in document.documentElement) {
      $(this).siblings('.dropdown-backdrop').off().remove();
    }
  }, this), 0);
});


// Same height blocks
jQuery.QTyoutubeResize = function() {
jQuery("iframe.youtube-player").each(function(){
	var QTthat = jQuery(this),
		width = QTthat.width(),
		height = QTthat.height();
	QTthat.css({"width":"100%"});
	var newWidth = QTthat.width(),
		proportion = newWidth/width;
	QTthat.height(height*proportion);
});
}


/* = media links transformation
=================================================================================================*/

function transformlinks() {
	// console.log("transformlinks");
	jQuery('.qw-totalwrapper').find("a[href*='youtube.com'],a[href*='youtu.be'],a[href*='mixcloud.com'],a[href*='soundcloud.com']").not('.qw-disableembedding').each(function() {
		var mystring = jQuery(this).attr('href');
		var width = jQuery(this).parent().width();
		var height = jQuery(this).height();
		var element = jQuery(this);
		//=== YOUTUBE https
		var expression = /(http|https):\/\/(\w{0,3}\.)?youtube\.\w{2,3}\/watch\?v=[\w-]{11}/gi;
		var videoUrl = mystring.match(expression);
		if (videoUrl !== null) {
			for (count = 0; count < videoUrl.length; count++) {
				mystring = mystring.replace(videoUrl[count], embedVideo(videoUrl[count], width, height));
				replacethisHtml(mystring);
			}
		}				
		//=== SOUNDCLOUD
		var expression = /(http|https)(\:\/\/soundcloud.com\/+([a-zA-Z0-9\/\-_]*))/g;
		var videoUrl = mystring.match(expression);
		if (videoUrl !== null) {
			// console.log("Soundcloud match "+window.location.protocol);
			for (count = 0; count < videoUrl.length; count++) {
				var finalurl = videoUrl[count].replace(':', '%3A');
				// finalurl = finalurl.replace("https","http");
				jQuery.getJSON('https://soundcloud.com/oembed?maxheight=140&format=js&url=' + finalurl + '&iframe=true&callback=?', function(response) {
					replacethisHtml(response.html);
				});
			}
		}
		//=== MIXCLOUD
		var expression = /(http|https)\:\/\/www\.mixcloud\.com\/[\w-]{0,150}\/[\w-]{0,150}\/[\w-]{0,1}/ig;
		videoUrl = mystring.match(expression);
		if (videoUrl !== null) {
			for (count = 0; count < videoUrl.length; count++) {
				mystring = mystring.replace(videoUrl[count], embedMixcloudPlayer(videoUrl[count]));
				replacethisHtml(mystring);
			}
		}
		//=== STRING REPLACE (FINAL FUNCTION)
		function replacethisHtml(mystring) {
			element.replaceWith(mystring);
		}
	});
}

function embedMixcloudPlayer(content) {
	var finalurl = ((encodeURIComponent(content)));
	finalurl = finalurl.replace("https",window.location.protocol);
	var embedcode ='<iframe data-state="0" class="mixcloudplayer" width="100%" height="140" src="//www.mixcloud.com/widget/iframe/?feed='+finalurl+'&embed_uuid=addfd1ba-1531-4f6e-9977-6ca2bd308dcc&stylecolor=&embed_type=widget_standard" frameborder="0"></iframe><p><a class="btn btn-small pull-right qw-expandplayerinfo">Expand player info <i class="icon-plus-sign"></i></a></p><div class="canc"></div>';	
	return embedcode;
}

function embedVideo(content, width, height) {
	height = width / 16 * 9;
	var youtubeUrl = content;
	var youtubeId = youtubeUrl.match(/=[\w-]{11}/);
	var strId = youtubeId[0].replace(/=/, '');
	var result = '<iframe width="'+width+'" height="'+height+'" src="'+window.location.protocol+'//www.youtube.com/embed/' + strId + '?html5=1" frameborder="0" class="youtube-player" allowfullscreen></iframe>';
	return result;
}

function embedYahooVideo(content) {
	var yahooUrl = content;
	var id = yahooUrl.match(/\d{8}/);
	var vidId = yahooUrl.match(/\d{7}/);
	var result = '<div class="embedded_video">\n';
	result += '<object width="100%">\n';
	result += '<param name="movie" value="http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.2.46" />\n';
	result += '<param name="allowFullScreen" value="true" />\n';
	result += '<param name="AllowScriptAccess" VALUE="always" />\n';
	result += '<param name="bgcolor" value="#000000" />\n';
	result += '<param name="flashVars" value="id=' + id + '&vid=' + vidId + '&lang=en-us&intl=us&embed=1&ap=9460582" />\n';
	result += '<embed src="http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.2.46" type="application/x-shockwave-flash"  allowFullScreen="true" AllowScriptAccess="always" bgcolor="#000000" flashVars="id=' + id + '&vid=' + vidId + '&lang=en-us&intl=us&embed=1&ap=9460582" >\n';
	result += '</embed>\n';
	result += '</object>\n';
	result += '</div>\n';
	return result;
}


/* = Load twitter script only if exists button
=====================================================================================*/
function loadTwitter() {
	if (jQuery(".twitter-share-button")) {
		if (typeof(twttr) != 'undefined') {
			jQuery('#tweetbutton').append('<a class="twitter-share-button" href="http://twitter.com/share" data-url="http://www.google.nl>Tweet</a>');
				jQuery.getScript('//platform.twitter.com/widgets.js', function(){
				twttr.widgets.load();
			});
		} else {
			jQuery.getScript('//platform.twitter.com/widgets.js');// removed http://
		}
	}
}

/* = Musicplayer Label
===================================================================================================*/
function musicPlaylist(){
	jQuery('#qwPlaylistSwitch').click(function() {
		
		jQuery("body").toggleClass("qwPlayerOpen");
		/*
		var wrapselector = jQuery('#wrap-playlist');
		var Wplaylistheight = wrapselector.height();
		if (Wplaylistheight > 0) {
			wrapselector.animate({
				height: 0,
				'margin-bottom': '0px',
				'margin-top': '0px'
			}, 350);
		} else {
			wrapselector.animate({
				height: 275,
				'margin-bottom': '15px',
				'margin-top': '10px'
			}, 350);
		}*/
	});

	jQuery("body").on("click","#qwMusicplayerPlaylist .qwClosePlaylist",function(){
		if(jQuery("body").hasClass("qwPlayerOpen")){
			jQuery("body").removeClass("qwPlayerOpen");
		}
	});
}

//New youtube resize 25 jul 2014
function NewYoutubeResize(){
	 jQuery("iframe.youtube-player").each(function(i,c){
	   var QTthat = jQuery(this),
			width = QTthat.width(),
			height = QTthat.height(),
			fwidth = QTthat.parent().width();
		if(QTthat.width() !== fwidth || ( QTthat.height() !== (fwidth/16*9) ) ){
			QTthat.css({"width":"100%"});
			QTthat.height(QTthat.width()/16*9);
		}
		
     });
}
jQuery.fn.NewYoutubeResize = NewYoutubeResize;

// ScrollTop
function scrollTopActivate(){
	jQuery('a.qw-arrowup').click(function() {
		jQuery('html, body').animate({
			scrollTop: 0
		}, 'slow');
		return false;
	});
}

// fb like width fix 2013
function facebookLikeFix(){
	if(jQuery(".fb-like")){
		var fbl = jQuery(".fb-like");
		var fbw = fbl.attr("data-width");
		fbl.css({"width":fbw+"px !important",
				"display":"block",
				"float":"left"
				}).width(fbw);
	}
}



/* = qantum player scripts
	=====================================================================================*/

threeSixtyPlayer.events.play = function() {
	soundManager.setVolume('igorsound', jQuery.cookie('smVolume'));
	jQuery.cookie('smState', 'playing', {
		expires: 1,
		path: '/'
	});
}
threeSixtyPlayer.events.pause = function() {
	jQuery.cookie('smState', 'pause', {
		expires: 1,
		path: '/'
	});
}
threeSixtyPlayer.events.stop = function() {
	jQuery.cookie('smState', 'stop', {
		expires: 1,
		path: '/'
	});
}


threeSixtyPlayer.events.finish = function() {
	jQuery("a#nextTrack").click();
	//console.log("finish");
}

var actualplaying = '';
function setquantumvars(vars) {
	jQuery('#mainplayer div.playerinfodata div.player-tracktitle').empty();
	jQuery('#mainplayer div.playerinfodata div.player-trackauthor').empty();
	jQuery('#mainplayer div.playerinfodata div.player-buylink').empty();
	if (vars['tracktitle'] != '' && vars['tracktitle'] != undefined) {
		jQuery('#mainplayer div.playerinfodata div.player-tracktitle').add().html('Title: ' + vars['tracktitle']);
	}
	if (vars['trackauthor'] != '' && vars['trackauthor'] != undefined) {
		jQuery('#mainplayer div.playerinfodata div.player-trackauthor').add().html('By: ' + vars['trackauthor']);
	}
	if (vars['buylink'] != '' && vars['buylink'] != undefined) {
		jQuery('#mainplayer div.playerinfodata div.player-buylink').add().html('Buy here: ' + vars['buylink']);
	}
}


// This is the main function that loads a track in the player
function playAnyMp3Here(){
	//var linkSelector = jQuery("a[href$='.mp3']");
	var linkSelector = jQuery('a[href$=".mp3"], a.qw-radiochannel').not('.download');
	linkSelector.not('.playable-mp3-link').not('.qw-big-play-button').addClass('playable-mp3-link');
	linkSelector.click(function(event) {
		event.preventDefault();
		var that = jQuery(this);
		linkSelector.not(this).removeClass('beingplayed');
		var url = jQuery(this).attr("href").split("geo-sample").join("sample");
		jQuery.cookie('smCurrentUrl', url, { expires: 100, path: '/' });

		if (actualplaying != url) {
			jQuery("a.beingplayed").removeClass("beingplayed");
			jQuery(this).addClass("beingplayed");
			actualplaying = url;
			jQuery.cookie('smCurrentUrl', url, { expires: 100, path: '/' });
			jQuery.cookie('smState', 'playing', { expires: 100, path: '/' });
			soundManager.stopAll();
			soundManager.destroySound('igorsound');
			var player = jQuery('.ui360');
			player.removeClass("qw-player-control-ui").empty();
			player.append('<a id="playerlink" href="' + url + '"  class="qw-hideme" type="audio/mpeg"></a>');
			threeSixtyPlayer.init();
			jQuery('span.sm2-360btn').click();

		} else {
			jQuery(this).toggleClass('beingplayed');
			soundManager.togglePause('igorsound');
		}
	});
}



/**
 * 
 *
 *	Update 2016 02 11
 * 	Add whatever first link as first player track in the music player from the playlist
 * 
 */
var playerlinkSelector = jQuery("a#playerlink");



if(jQuery(".qw-carousel-track").length > 0){
	var firstTrackMp3 = jQuery(".qw-carousel-track a").attr("href");
	playerlinkSelector.attr('href', firstTrackMp3);
	// console.log(firstTrackMp3);
}





soundManager.onready(function() {
	threeSixtyPlayer.init();

	jQuery("#qw-volumeFader").click(function(e) {
		var parentOffset = jQuery(this).offset();
		//var parentOffset = jQuery(this).parent().offset();
		var relX = Math.floor(e.pageX - parentOffset.left);
		var vol = Math.ceil((relX - 14) / 14) + 1;
		if (vol >= 1 && vol <= 10) {
			jQuery("#qw-volumeFader-bg").css("left", -(140 - (14 * vol)));
			if (threeSixtyPlayer != undefined) {
				soundManager.setVolume('igorsound', vol * 10);
				jQuery.cookie('smVolume', vol * 10, {
					expires: 1,
					path: '/'
				});
			}
		}
	}).mouseover(function() {
		jQuery(this).css("cursor", "pointer");
	});

	for (count = 0; count < tracks.length; count++) {
		if (tracks[count] == jQuery("a#playerlink").prop("href")) {
			jQuery('#trackid-' + count).addClass('beingplayed');
		}
	}




	/** Play next
	================================================ */
	var prevtrack, nexttrack;

	jQuery("a#nextTrack").click(function(e) {
		e.preventDefault();
		nexttrack = jQuery("a.beingplayed").closest("li").next().find("a[href$='.mp3']");
		nexttrack.click();
		jQuery.cookie('smCurrentUrl', nexttrack.attr("href"), { expires: 1, path: '/' });
	});



	/** Play previous
	================================================ */

	jQuery("a#prevTrack").click(function(e) {
		e.preventDefault();
		prevtrack = jQuery("a.beingplayed").closest("li").prev().find("a[href$='.mp3']");
		prevtrack.click();
		jQuery.cookie('smCurrentUrl', prevtrack.attr("href"), { expires: 1, path: '/' });
	});

	// AUTO RESUME PLAYING TRACK 
	if (jQuery.cookie('smVolume') == null) {
		jQuery.cookie('smVolume', 100, {
			expires: 1,
			path: '/'
		});
		soundManager.setVolume('igorsound', jQuery.cookie('smVolume'));
	}
	var actvol = jQuery.cookie('smVolume');
	jQuery("#qw-volumeFader-bg").css("left", -(140 - (1.4 * actvol)));


	if (jQuery.cookie('smState') != null) {
		if (jQuery.cookie('smState') == 'playing') {
			if (jQuery.cookie('smCurrentUrl') != null) {
				var nextTrackUrl = jQuery.cookie('smCurrentUrl');
				jQuery('span.sm2-360btn').click();
				var nextTrackUrl = jQuery.cookie('smCurrentUrl');
				jQuery("a#playerlink").prop("href", nextTrackUrl);
				actualplaying = nextTrackUrl;
				soundManager.unload('igorsound');
				soundManager.destroySound('igorsound');
				
				jQuery('a[href="' +nextTrackUrl+ '"]').addClass("beingplayed");

				threeSixtyPlayer.init();
				for (count = 0; count < tracks.length; count++) {
					if (tracks[count] == jQuery("a#playerlink").prop("href")) {
						jQuery('#trackid-' + count).addClass('beingplayed');
					}
				}
				jQuery('span.sm2-360btn').click();
			}
		}
	}else{
		// autoplay ?
		if(jQuery("#theBody").attr("data-autoplay") == "yes"){
			jQuery('span.sm2-360btn').click();
		}
	}

});
		

jQuery.cookie('alreadyPlayed', 'no', {
	expires: 1,
	path: '/'
});

jQuery(window).unload(function() {
	if (soundManager != null && soundManager != undefined) {
		var mySound = soundManager.getSoundById('igorsound');
		if(typeof(mySound) == "object"){
			if(!mySound.position){
			mySound.position = 0;}

			else if(mySound.position == null){
				mySound.position = 0;
			}
		
			jQuery.cookie('smPlaySecond', mySound.position, {
				expires: 1,
				path: '/'
			});
		}
	}
});







// Ajax Page Load ==================================================================================



/*
*
*
*	The world is not ready for this yet! Still using the external plugin Advanced Ajax Page Load
*
*
*
*/



jQuery.fn.qwInitAjaxPageLoad = function(){
    
	if(jQuery("body").hasClass("ajaxPageLoading_enabled")  &&  false === jQuery("body").hasClass("qw-is_mobile")){
        
        jQuery("body").append('<div class="qw-preloader" id="qwAjaxPreloader"><center>\
		<p style="text-align: center !important;">Loading... Please Wait...</p>\
		<p style="text-align: center !important;">\
			<div class="preloader" id="preloader"><div class="circle"></div><div class="circle1"></div></div>\
		</p></center></div>');

	} else {return;}
    
    var ajaxContainerId = "#ajaxContainer";
   
    jQuery("#qwAjaxPreloader").fadeTo( "slow" ,0).promise().done(function(){jQuery("#qwAjaxPreloader").css({"top":"-1000px"});});

    jQuery("#maincontainer, #qwNavmenu, #qwMusicPlaylist, #QWplayerbar, #qwFixedHeader, #qwModalContent").off("click",'a');

    jQuery("#maincontainer, #qwNavmenu, #qwMusicPlaylist, #QWplayerbar, #qwFixedHeader, #qwModalContent").on("click",'a', function(e) {

    	var that = jQuery(this),
        	href = jQuery(this).attr('href');
        jQuery.qwHrefUrl = href;
        if(href != undefined){
            if ((href.match(/^https?\:/i)) && (!href.match(document.domain)))    {
                 window.location.replace(link);
            } else if(href.match(document.domain) && !that.hasClass("qwjquerycontent") && !href.match("wp-admin") && !that.hasClass("qwNoAjax")
                      && !href.match(".zip") 
                      && !href.match(".jpg") 
                      && !href.match(".gif") 
                      && !href.match(".mp3") 
                      && !href.match(".png") 
                      && !href.match(".rar") ) {
                e.preventDefault();

                if (window.history.pushState) {
                    var pageurl = href;
                    if (pageurl !== window.location) {
                        window.history.pushState({
                        path: pageurl,
                        state:'new'
                        }, '', pageurl);
                    }
                }
                jQuery( ajaxContainerId ).fadeTo( "fast" ,0, function() {
                    jQuery("#qwAjaxPreloader").css({"top":"50%"}).fadeTo( "slow" ,1);
                     jQuery.fn.qwScrollTop();
                    
                }).promise().done(function(){
                    qwExecuteAjaxLink(href);
                });
            }
        }
    });

    function qwExecuteAjaxLink(link){
        jQuery.ajax({
            url: link,
            type: "GET",
			cache: false,
			dataType: "html",

            success:function(data) {
                jQuery.ajaxData = data;
                var parser = new DOMParser();          
                jQuery.contents = jQuery(jQuery.ajaxData).find(ajaxContainerId).html();
                jQuery.title = jQuery(jQuery.ajaxData).filter("title").text();
                jQuery.qwBodyMatches = data.match(/<body.*class=["']([^"']*)["'].*>/);
                if(typeof(jQuery.qwBodyMatches) !== 'undefined'){
                   var docClass = jQuery.qwBodyMatches[1];
                }else{
                    window.location.replace(link);
                }
                jQuery.wpadminbar = jQuery(jQuery.ajaxData).filter("#wpadminbar").html(); 
                if(docClass !== undefined && jQuery.contents !== undefined){
                    jQuery("body").attr("class",docClass);
                    jQuery("title").text(jQuery.title);
                    jQuery("#wpadminbar").html(jQuery.wpadminbar);
                    jQuery(ajaxContainerId).html( jQuery.contents ).delay(300).promise().done(function(){
                    	 jQuery( ajaxContainerId ).fadeTo( "fast" ,1);
              			if(jQuery.fn.initializeAfterAjax()){
                            jQuery(ajaxContainerId).find("script").each(function(i) {
                                eval(jQuery(this).text());
                            });
                            jQuery( ajaxContainerId ).fadeTo( "fast" ,1);

                        }else{
                            window.location.replace(link);
                        }
                    });   

                }else{
                    window.location.replace(link);
                }
            },
            error: function (xhr, status, error) {
                //Go to the link normally
                var err = eval("(" + xhr.responseText + ")");
                window.location.replace(link);
            }
        });
        
    }

    // from rosspenman.com/pushstate-jquery/
    jQuery(window).on("popstate", function(e) {
        if (e.originalEvent.state !== null) {
            var href = location.href;
            if(href != undefined){
                if (!href.match(document.domain))    {
                    window.location.replace(link);
                } else {                   
                    jQuery(ajaxContainerId ).fadeTo( "fast" ,0, function() {
                        jQuery("#qwAjaxPreloader").css({"top":"-1000px"}).fadeTo( "fast" ,1);
                         jQuery.fn.qwScrollTop();
                        qwExecuteAjaxLink(href);
                    }); 
                }
            }
        }
    });
} 

jQuery.fn.qwScrollTop = function(){
    jQuery('html, body').animate({
        scrollTop: 0
    },300, 'easeOutExpo');
    return true;
};




/*   Ajax Revolution Slider
=================================================================*/
jQuery.fn.qtAjaxRevslider = function(){
    jQuery("[data-qwrevslider]").each(function(i,c){
        var that = jQuery(this),
            sliderId = that.attr("data-qwrevslider");
        that.html(QTajaxRevslider({id:sliderId}));

    });
}





/*
*
*   Dynamically load revolution slider if present
*
*
*
*/
var QTnnc = jQuery("#enableRsAjax").attr("data-nnc"),
    QTadmu = jQuery("#enableRsAjax").attr("data-admu");

var QTajaxRevslider = function(obj) {
    var content = "";
    data = {};
    data.action = 'revslider_ajax_call_front';
    data.client_action = 'get_slider_html';
    data.token = QTnnc;
    data.type = obj.type;
    data.id = obj.id;
    data.aspectratio = obj.aspectratio;
    // SYNC AJAX REQUEST
    jQuery.ajax({
        type:"post",
        url: QTadmu,
        dataType: 'json',
        data:data,
        async:false,
        success: function(ret, textStatus, XMLHttpRequest) {
        	jQuery("#revsliderPreloader").remove();
            if(ret.success == true)
                content = ret.data;                             
        },
        error: function(e) {
        }
    });
    return content;                         
};

var ajaxRemoveRevslider = function(obj) {
    return jQuery(obj.selector+" .rev_slider").revkill();
};

// EXTEND THE AJAX CONTENT LOADING TYPES WITH TYPE AND FUNCTION
var extendessential = setInterval(function() {
    if (jQuery.fn.tpessential != undefined) {
        clearInterval(extendessential);
        if(typeof(jQuery.fn.tpessential.defaults) !== 'undefined') {
            jQuery.fn.tpessential.defaults.ajaxTypes.push({type:"revslider",func:ajaxRevslider,killfunc:ajaxRemoveRevslider,openAnimationSpeed:0.3}); 
        }
    }
},30);


// Initialize design ==================================================================================

jQuery(window).resize(function() {
 getTopHeight();
});
	
jQuery('a[data-toggle]').tooltip();
jQuery("a, h1, h2, h3, title").hover();
if(jQuery(window).width()>728){
	//jQuery("html").niceScroll();	
}else{
	if(jQuery("#demopanel")){
		jQuery("#demopanel").hide();
	}
}




scrollTopActivate();






/*
*
*	Smooth scrolling
*
*/
jQuery.fn.smoothLinkScroll = function(sctop){
	jQuery('html,body').animate({scrollTop:sctop}, 1000);
}

jQuery('a.smoothscroll').on('click', function(event){     
    event.preventDefault();
    var that = jQuery(this),
    	hashh = this.hash;
    that.delay(200).promise().done(function(){
    	jQuery.fn.smoothLinkScroll(jQuery(hashh).offset().top);
    });
    return true;
});
		    
