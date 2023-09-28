jQuery(document).ready(function($) {
    "use strict";
	//SELECT
	 $('.ts-option-search').each(function(){
	 	$(this).wrap('<div class="ts-select-style"></div>');
	 	$(this).after("<span class='ts_selected'></span>");
	 });
	 $(".ts-option-search").change(function(){

        var selectedOption = $(this).find(":selected").text();

        $(this).next(".ts_selected").text(selectedOption);

    }).trigger('change');

	 //FUNFACT

    $('.ts-funfact').appear(function() {
        var count_element = $('.funfact-number', this).html();
        $(".funfact-number", this).countTo({
            from: 0,
            to: count_element,
            speed: 2500,
            refreshInterval: 50,
        });
    });

    var widthDev = $(window).width();
    if ((widthDev < 1200) && (widthDev >= 768)) {
        $('.menu-nav li').click(function(){
            //$('.menu-nav li').removeClass('ts_hover')
            //$(this).addClass('ts_hover');
            $(this).toggleClass('ts_hover');
        });

    }else if(widthDev<=767){
        $('.menu-nav li').click(function(){
            $(this).toggleClass('ts_hover');
        });
    }else{
        $('#menu-main-menu').addClass('ts-menu-destop');
    }
	 //PARALLAX
	 //$(".parallax-section").parallax();

	 //TESTIMONIAL
	 if ($(".ts-list-testimonial").length > 0) {
    
	    $(".ts-list-testimonial").owlCarousel({
	        autoPlay: 4000,
	        slideSpeed: 1000,
	        navigation: false,
	        pagination: true,
	        singleItem: true,
	    });
	}


	//TAB

	 $('.ts-horizontalTab').easyResponsiveTabs({
			type: 'default',          
            width: 'auto',
            fit: true,
	 	 	animation: 'slide'
	 });
	 if($(window).width()>767){
		$('.ts-horizontalTab').each(function(){
			var _this = $(this);
   			var numberTab = _this.find(".resp-tabs-list li").size();
   			var wTab = 100/numberTab;
   			_this.find(".resp-tabs-list li").css("width",wTab+"%")
		})
	}
	 $('.ts-verticalTab').easyResponsiveTabs({
	 		type: 'vertical',
            fit: true
	 });
	 if($(window).width()>=768){
	 	$('.ts-verticalTab').each(function(){
			var _thisV = $(this);
			var heightTab = _thisV.find('.resp-tabs-list li[aria-controls="tab_item-0"]').outerHeight();
			var numberTabV = _thisV.find(".resp-tabs-list li").size();
			var hTab = heightTab*numberTabV - 1;
			_thisV.find(".resp-tabs-container").css("min-height",hTab+"px")
		})
	 }
	//TWITTER SLIDER
	if ($("#owl-twitter").length > 0) {
    
	    $(".twitter-slide").owlCarousel({
	        autoPlay: 4000,
	        slideSpeed: 1000,
	        navigation: false,
	        pagination: true,
	        singleItem: true
	    });
	}

	//MENU MOBILE
	$('.mobile-navigation').click(function(){
		$('.ts-mainmenu').slideToggle(500);
	})

	//CLIENT SLIDER
    if ($(".ts-client-list ul").length > 0) {
    
        $(".ts-client-list ul").owlCarousel({
            items: 3,
            autoPlay: 4000,
            slideSpeed: 1000,
            navigation: false,
            pagination: false,
            singleItem: false,
            navigationText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            itemsCustom: [[0, 1],[320,2], [480, 2], [768, 4], [992, 4], [1200, 5]]
        });
    }
      // Skill bar
    $('.skillbar').each(function(){
            $(this).find('.skillbar-bar').animate({
                width:$(this).attr('data-percent')
            },6000);
        });
     
	$(window).load(function(){
        if ($('#wpadminbar').length){
            var heightB = $('#wpadminbar').outerHeight();
            $(".main-header").sticky({ topSpacing: heightB });
        }else{
            $(".main-header").sticky({ topSpacing: 0 });
        }
    });

   // Portfolio slider
        if ($(".ts-portfolio-slider").length > 0) {
            $(".ts-portfolio-slider").owlCarousel({
                autoPlay: 4000,
                slideSpeed: 1000,
                navigation: true,
                pagination: false,
                singleItem: true,
                navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            });
        }

    //Gallery blog
     if ($(".blog-grallery").length > 0) {
    
        $(".blog-grallery").owlCarousel({
            autoPlay: 4000,
            slideSpeed: 3000,
            navigation: true,
            pagination: false,
            singleItem: true,
            navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        });
    }
    //SELECT SHOP
     if(jQuery().chosen) {
        $(".woocommerce-ordering .orderby").chosen();
    }
    //SIDER BAR
    if($(window).width()>991){
        $('.ts-menu-sidebar li a').hover(function(){
            var _parent  = $(this).parent();
            if ((!_parent.hasClass('current_page_item')) && (!_parent.hasClass('current-menu-parent'))) {
                _parent.addClass('ts-active-menusiderbar');
                _parent.find('.dropdown-menu').slideDown();
                _parent.mouseleave(function(){
                    $(this).removeClass('ts-active-menusiderbar');
                    $(this).find('.dropdown-menu').slideUp();
                })
            }
        })
    }


    //Menu header 2
    var height1 = $('.ts-header-1').outerHeight();
    var height2 = $('.top-header').outerHeight();
    var resultH = height1 + height2;
    $(window).scroll(function(){
        var scrollTop = $(document).scrollTop();
        if(scrollTop > resultH){
            $('.main-menu-2').addClass('fixed');
        }else{
            $('.main-menu-2').removeClass('fixed');
        }
    })
});

(function(e) {
    "use strict";
    e(document).ready(function() {
        e("#toggle-bar-wrap").click(function(e) {
                e.stopPropagation()
            });
        e(document).click(function() {            
            e("#toggle-bar-wrap").removeClass("active-bar");
            e("a.toggle-bar-btn.fade-toggle").children(".ts-infobar").removeClass("infobar-up").addClass("infobar-down")            

        });        
        e("a.toggle-bar-btn.fade-toggle").on(false ? "touchstart" : "click", function(t) {
            e(this).find(".ts-infobar").toggleClass("infobar-up infobar-down");
            e("#toggle-bar-wrap").toggleClass("active-bar");
            return false
        });
    })
})(jQuery);
jQuery( function( $ ) {
    
    // Quantity buttons
    $( 'div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)' ).addClass( 'buttons_added' ).append( '<input type="button" value="+" class="plus" />' ).prepend( '<input type="button" value="-" class="minus" />' );

    // Target quantity inputs on product pages
    $( 'input.qty:not(.product-quantity input.qty)' ).each( function() {
        var min = parseFloat( $( this ).attr( 'min' ) );

        if ( min && min > 0 && parseFloat( $( this ).val() ) < min ) {
            $( this ).val( min );
        }
    });

    $( document ).on( 'click', '.plus, .minus', function() {

        // Get values
        var $qty        = $( this ).closest( '.quantity' ).find( '.qty' ),
            currentVal  = parseFloat( $qty.val() ),
            max         = parseFloat( $qty.attr( 'max' ) ),
            min         = parseFloat( $qty.attr( 'min' ) ),
            step        = $qty.attr( 'step' );

        // Format values
        if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
        if ( max === '' || max === 'NaN' ) max = '';
        if ( min === '' || min === 'NaN' ) min = 0;
        if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

        // Change the value
        if ( $( this ).is( '.plus' ) ) {

            if ( max && ( max == currentVal || currentVal > max ) ) {
                $qty.val( max );
            } else {
                $qty.val( currentVal + parseFloat( step ) );
            }

        } else {

            if ( min && ( min == currentVal || currentVal < min ) ) {
                $qty.val( min );
            } else if ( currentVal > 0 ) {
                $qty.val( currentVal - parseFloat( step ) );
            }

        }

        // Trigger change event
        $qty.trigger( 'change' );
    });
    
    $('.navbar-collapse .nav .dropdown').hover(function(e){
        $(this).find('.dropdown-menu').stop( true, false ).slideDown(300);
    }, function(e){
        $(this).find('.dropdown-menu').stop( true, false ).slideUp(300);
    });
    
    
});

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(b,d){var e,f,g,h=b.nodeName.toLowerCase();return"area"===h?(e=b.parentNode,f=e.name,b.href&&f&&"map"===e.nodeName.toLowerCase()?(g=a("img[usemap='#"+f+"']")[0],!!g&&c(g)):!1):(/input|select|textarea|button|object/.test(h)?!b.disabled:"a"===h?b.href||d:d)&&c(b)}function c(b){return a.expr.filters.visible(b)&&!a(b).parents().addBack().filter(function(){return"hidden"===a.css(this,"visibility")}).length}a.ui=a.ui||{},a.extend(a.ui,{version:"1.11.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),a.fn.extend({scrollParent:function(b){var c=this.css("position"),d="absolute"===c,e=b?/(auto|scroll|hidden)/:/(auto|scroll)/,f=this.parents().filter(function(){var b=a(this);return d&&"static"===b.css("position")?!1:e.test(b.css("overflow")+b.css("overflow-y")+b.css("overflow-x"))}).eq(0);return"fixed"!==c&&f.length?f:a(this[0].ownerDocument||document)},uniqueId:function(){var a=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&a(this).removeAttr("id")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(c){return b(c,!isNaN(a.attr(c,"tabindex")))},tabbable:function(c){var d=a.attr(c,"tabindex"),e=isNaN(d);return(e||d>=0)&&b(c,!e)}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(b,c){function d(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.css(b,"padding"+this))||0,d&&(c-=parseFloat(a.css(b,"border"+this+"Width"))||0),f&&(c-=parseFloat(a.css(b,"margin"+this))||0)}),c}var e="Width"===c?["Left","Right"]:["Top","Bottom"],f=c.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+c]=function(b){return void 0===b?g["inner"+c].call(this):this.each(function(){a(this).css(f,d(this,b)+"px")})},a.fn["outer"+c]=function(b,e){return"number"!=typeof b?g["outer"+c].call(this,b):this.each(function(){a(this).css(f,d(this,b,!0,e)+"px")})}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(a.fn.removeData=function(b){return function(c){return arguments.length?b.call(this,a.camelCase(c)):b.call(this)}}(a.fn.removeData)),a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),a.fn.extend({focus:function(b){return function(c,d){return"number"==typeof c?this.each(function(){var b=this;setTimeout(function(){a(b).focus(),d&&d.call(b)},c)}):b.apply(this,arguments)}}(a.fn.focus),disableSelection:function(){var a="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(a+".ui-disableSelection",function(a){a.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(b){if(void 0!==b)return this.css("zIndex",b);if(this.length)for(var c,d,e=a(this[0]);e.length&&e[0]!==document;){if(c=e.css("position"),("absolute"===c||"relative"===c||"fixed"===c)&&(d=parseInt(e.css("zIndex"),10),!isNaN(d)&&0!==d))return d;e=e.parent()}return 0}}),a.ui.plugin={add:function(b,c,d){var e,f=a.ui[b].prototype;for(e in d)f.plugins[e]=f.plugins[e]||[],f.plugins[e].push([c,d[e]])},call:function(a,b,c,d){var e,f=a.plugins[b];if(f&&(d||a.element[0].parentNode&&11!==a.element[0].parentNode.nodeType))for(e=0;e<f.length;e++)a.options[f[e][0]]&&f[e][1].apply(a.element,c)}}});

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){var b=0,c=Array.prototype.slice;return a.cleanData=function(b){return function(c){var d,e,f;for(f=0;null!=(e=c[f]);f++)try{d=a._data(e,"events"),d&&d.remove&&a(e).triggerHandler("remove")}catch(g){}b(c)}}(a.cleanData),a.widget=function(b,c,d){var e,f,g,h,i={},j=b.split(".")[0];return b=b.split(".")[1],e=j+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e.toLowerCase()]=function(b){return!!a.data(b,e)},a[j]=a[j]||{},f=a[j][b],g=a[j][b]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new g(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,d){return a.isFunction(d)?void(i[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},e=function(a){return c.prototype[b].apply(this,a)};return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=e,b=d.apply(this,arguments),this._super=c,this._superApply=f,b}}()):void(i[b]=d)}),g.prototype=a.widget.extend(h,{widgetEventPrefix:f?h.widgetEventPrefix||b:b},i,{constructor:g,namespace:j,widgetName:b,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g),g},a.widget.extend=function(b){for(var d,e,f=c.call(arguments,1),g=0,h=f.length;h>g;g++)for(d in f[g])e=f[g][d],f[g].hasOwnProperty(d)&&void 0!==e&&(b[d]=a.isPlainObject(e)?a.isPlainObject(b[d])?a.widget.extend({},b[d],e):a.widget.extend({},e):e);return b},a.widget.bridge=function(b,d){var e=d.prototype.widgetFullName||b;a.fn[b]=function(f){var g="string"==typeof f,h=c.call(arguments,1),i=this;return f=!g&&h.length?a.widget.extend.apply(null,[f].concat(h)):f,this.each(g?function(){var c,d=a.data(this,e);return"instance"===f?(i=d,!1):d?a.isFunction(d[f])&&"_"!==f.charAt(0)?(c=d[f].apply(d,h),c!==d&&void 0!==c?(i=c&&c.jquery?i.pushStack(c.get()):c,!1):void 0):a.error("no such method '"+f+"' for "+b+" widget instance"):a.error("cannot call methods on "+b+" prior to initialization; attempted to call method '"+f+"'")}:function(){var b=a.data(this,e);b?(b.option(f||{}),b._init&&b._init()):a.data(this,e,new d(f,this))}),i}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(c,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=b++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this.options=a.widget.extend({},this.options,this._getCreateOptions(),c),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(b,c){var d,e,f,g=b;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof b)if(g={},d=b.split("."),b=d.shift(),d.length){for(e=g[b]=a.widget.extend({},this.options[b]),f=0;f<d.length-1;f++)e[d[f]]=e[d[f]]||{},e=e[d[f]];if(b=d.pop(),1===arguments.length)return void 0===e[b]?null:e[b];e[b]=c}else{if(1===arguments.length)return void 0===this.options[b]?null:this.options[b];g[b]=c}return this._setOptions(g),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,"disabled"===a&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!b),b&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){return b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled")?("string"==typeof g?f[g]:g).apply(f,arguments):void 0}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^([\w:-]*)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.delegate(k,j,h):c.bind(j,h)})},_off:function(b,c){c=(c||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,b.unbind(c).undelegate(c),this.bindings=a(this.bindings.not(b).get()),this.focusable=a(this.focusable.not(b).get()),this.hoverable=a(this.hoverable.not(b).get())},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}}),a.widget});
function _gambitRefreshScroll(){var $=jQuery;_gambitScrollTop=window.pageYOffset,_gambitScrollLeft=window.pageXOffset}function _gambitParallaxAll(){_gambitRefreshScroll();for(var t=0;t<_gambitImageParallaxImages.length;t++)_gambitImageParallaxImages[t].doParallax()}function _vcRowGetAllElementsWithAttribute(t){for(var e=[],i=document.getElementsByTagName("*"),a=0,n=i.length;n>a;a++)i[a].getAttribute(t)&&e.push(i[a]);return e}function _vcRowOnPlayerReady(t){var e=t.target;e.playVideo(),e.isMute&&e.mute();var i=e.getCurrentTime(),a=+new Date/1e3,n=0,r=!0;e.loopInterval=setInterval(function(){"undefined"!=typeof e.loopTimeout&&clearTimeout(e.loopTimeout),i==e.getCurrentTime()?n=i+(+new Date/1e3-a):(n=e.getCurrentTime(),a=+new Date/1e3),i=e.getCurrentTime(),n+(r?.45:.21)>=e.getDuration()&&(e.pauseVideo(),e.seekTo(0),e.playVideo(),r=!1)},150)}function _vcRowOnPlayerStateChange(t){t.data===YT.PlayerState.ENDED?("undefined"!=typeof t.target.loopTimeout&&clearTimeout(t.target.loopTimeout),t.target.seekTo(0)):t.data===YT.PlayerState.PLAYING&&jQuery(t.target.getIframe()).parent().css("visibility","visible")}function resizeVideo(t){var e=t.parent();if(null===e.find("iframe").width())return void setTimeout(function(){resizeVideo(t)},500);var i=t;i.css({width:"auto",height:"auto",left:"auto",top:"auto"}),i.css("position","absolute");var a=e.find("iframe").width(),n=e.find("iframe").height(),r=e.width(),s=e.height(),o,d,g,l,p="16:9";"undefined"!=typeof t.attr("data-video-aspect-ratio")&&-1!==t.attr("data-video-aspect-ratio").indexOf(":")&&(p=t.attr("data-video-aspect-ratio").split(":"),p[0]=parseFloat(p[0]),p[1]=parseFloat(p[1])),d=s,o=p[0]/p[1]*s,g=p[0]/p[1]*s-r,l=r*p[1]/p[0]-s,o>=r&&d>=s?(height=s,width=p[0]/p[1]*s):(width=r,height=r*p[1]/p[0]),marginTop=-(height-s)/2,marginLeft=-(width-r)/2,e.find("iframe").css({width:width,height:height,marginLeft:marginLeft,marginTop:marginTop})}function onYouTubeIframeAPIReady(){for(var t=_vcRowGetAllElementsWithAttribute("data-youtube-video-id"),e=0;e<t.length;e++){for(var i=t[e].getAttribute("data-youtube-video-id"),a="",n=0;n<t[e].childNodes.length;n++)if(/div/i.test(t[e].childNodes[n].tagName)){a=t[e].childNodes[n].getAttribute("id");break}if(""!==a){var r=t[e].getAttribute("data-mute"),s=new YT.Player(a,{height:"auto",width:"auto",videoId:i,playerVars:{autohide:1,autoplay:1,fs:0,showinfo:0,loop:1,modestBranding:1,start:0,controls:0,rel:0,disablekb:1,iv_load_policy:3,wmode:"transparent"},events:{onReady:_vcRowOnPlayerReady,onStateChange:_vcRowOnPlayerStateChange}});s.isMute="true"===r,"true"===t[e].getAttribute("data-youtube-video-id")&&s.setPlaybackQuality("hd720"),setTimeout(function(){jQuery("#"+a).css("visibility","visible")},500)}}}if("undefined"==typeof Modernizr&&(window.Modernizr=function(t,e,i){function a(t){h.cssText=t}function n(t,e){return a(u.join(t+";")+(e||""))}function r(t,e){return typeof t===e}function s(t,e){return!!~(""+t).indexOf(e)}function o(t,e,a){for(var n in t){var s=e[t[n]];if(s!==i)return a===!1?t[n]:r(s,"function")?s.bind(a||e):s}return!1}var d="2.8.3",g={},l=e.documentElement,p="modernizr",c=e.createElement(p),h=c.style,m,f={}.toString,u=" -webkit- -moz- -o- -ms- ".split(" "),b={},v={},y={},w=[],T=w.slice,x,I=function(t,i,a,n){var r,s,o,d,g=e.createElement("div"),c=e.body,h=c||e.createElement("body");if(parseInt(a,10))for(;a--;)o=e.createElement("div"),o.id=n?n[a]:p+(a+1),g.appendChild(o);return r=["&#173;",'<style id="s',p,'">',t,"</style>"].join(""),g.id=p,(c?g:h).innerHTML+=r,h.appendChild(g),c||(h.style.background="",h.style.overflow="hidden",d=l.style.overflow,l.style.overflow="hidden",l.appendChild(h)),s=i(g,t),c?g.parentNode.removeChild(g):(h.parentNode.removeChild(h),l.style.overflow=d),!!s},P={}.hasOwnProperty,_;_=r(P,"undefined")||r(P.call,"undefined")?function(t,e){return e in t&&r(t.constructor.prototype[e],"undefined")}:function(t,e){return P.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if("function"!=typeof e)throw new TypeError;var i=T.call(arguments,1),a=function(){if(this instanceof a){var n=function(){};n.prototype=e.prototype;var r=new n,s=e.apply(r,i.concat(T.call(arguments)));return Object(s)===s?s:r}return e.apply(t,i.concat(T.call(arguments)))};return a}),b.touch=function(){var i;return"ontouchstart"in t||t.DocumentTouch&&e instanceof DocumentTouch?i=!0:I(["@media (",u.join("touch-enabled),("),p,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(t){i=9===t.offsetTop}),i};for(var k in b)_(b,k)&&(x=k.toLowerCase(),g[x]=b[k](),w.push((g[x]?"":"no-")+x));return g.addTest=function(t,e){if("object"==typeof t)for(var a in t)_(t,a)&&g.addTest(a,t[a]);else{if(t=t.toLowerCase(),g[t]!==i)return g;e="function"==typeof e?e():e,"undefined"!=typeof enableClasses&&enableClasses&&(l.className+=" "+(e?"":"no-")+t),g[t]=e}return g},a(""),c=m=null,g._version=d,g._prefixes=u,g.testStyles=I,g}(this,this.document)),function(){for(var t=0,e=["ms","moz","webkit","o"],i=0;i<e.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){return window.setTimeout(function(){t()},16)})}(),"undefined"==typeof _gambitImageParallaxImages)var _gambitImageParallaxImages=[],_gambitScrollTop,_gambitWindowHeight,_gambitScrollLeft,_gambitWindowWidth;!function($,t,e,i){function a(t,e){this.element=t,this.settings=$.extend({},r,e),""==this.settings.align&&(this.settings.align="center"),this._defaults=r,this._name=n,this.init()}var n="gambitImageParallax",r={direction:"up",mobileenabled:!1,mobiledevice:!1,width:"",height:"",align:"center",opacity:"1",velocity:".3",image:"",target:"",repeat:!1,loopScroll:"",loopScrollTime:"2",removeOrig:!1,complete:function(){}};$.extend(a.prototype,{init:function(){""===this.settings.target&&(this.settings.target=$(this.element)),this.settings.target.addClass(this.settings.direction),""===this.settings.image&&"undefined"!=typeof $(this.element).css("backgroundImage")&&""!==$(this.element).css("backgroundImage")&&(this.settings.image=$(this.element).css("backgroundImage").replace(/url\(|\)|"|'/g,"")),_gambitImageParallaxImages.push(this),this.setup(),this.settings.complete(),this.containerWidth=0,this.containerHeight=0},setup:function(){this.settings.removeOrig!==!1&&$(this.element).remove(),this.resizeParallaxBackground()},doParallax:function(){if(!this.settings.mobiledevice||this.settings.mobileenabled){if("fixed"==this.settings.direction)return void(t.devicePixelRatio>1&&$(this.settings.target).hide().show(0));if(this.isInView()){var e=this.settings.target.find(".parallax-inner");e.css({minHeight:"150px"});var i=this.settings.target.width()+parseInt(this.settings.target.css("paddingRight"))+parseInt(this.settings.target.css("paddingLeft")),a=this.settings.target.height()+parseInt(this.settings.target.css("paddingTop"))+parseInt(this.settings.target.css("paddingBottom"));if(0===this.containerWidth||0===this.containerHeight||i===this.containerWidth&&a===this.containerHeight||this.resizeParallaxBackground(),this.containerWidth=i,this.containerHeight=a,"undefined"!=typeof e&&0!==e.length){var n=(_gambitScrollTop-this.scrollTopMin)/(this.scrollTopMax-this.scrollTopMin),r=this.moveMax*n;("left"==this.settings.direction||"up"==this.settings.direction)&&(r*=-1);var s="translate3d(",o="px, 0px, 0px)",d="translate3d(0px, ",g="px, 0px)";"undefined"!=typeof _gambitParallaxIE9&&(s="translate(",o="px, 0px)",d="translate(0px, ",g="px)"),"no-repeat"==e.css("background-repeat")&&("down"==this.settings.direction&&0>r&&(r=0),"up"==this.settings.direction&&r>0&&(r=0)),e.css("left"===this.settings.direction||"right"===this.settings.direction?{webkitTransition:"webkitTransform 1ms linear",mozTransition:"mozTransform 1ms linear",msTransition:"msTransform 1ms linear",oTransition:"oTransform 1ms linear",transition:"transform 1ms linear",webkitTransform:s+r+o,mozTransform:s+r+o,msTransform:s+r+o,oTransform:s+r+o,transform:s+r+o}:{webkitTransition:"webkitTransform 1ms linear",mozTransition:"mozTransform 1ms linear",msTransition:"msTransform 1ms linear",oTransition:"oTransform 1ms linear",transition:"transform 1ms linear",webkitTransform:d+r+g,mozTransform:d+r+g,msTransform:d+r+g,oTransform:d+r+g,transform:d+r+g}),e.css({webkitTransition:"webkitTransform -1ms linear",mozTransition:"mozTransform -1ms linear",msTransition:"msTransform -1ms linear",oTransition:"oTransform -1ms linear",transition:"transform -1ms linear"})}}}},isInView:function(){var t=this.settings.target;if("undefined"!=typeof t&&0!==t.length){var e=t.offset().top,i=t.height()+parseInt(t.css("paddingTop"))+parseInt(t.css("paddingBottom"));return _gambitScrollTop>e+i||e>_gambitScrollTop+_gambitWindowHeight?!1:!0}},resizeParallaxBackground:function(){var t=this.settings.target;if("undefined"!=typeof t&&0!==t.length){var e="true"===this.settings.repeat||this.settings.repeat===!0||1===this.settings.repeat;if("none"===this.settings.direction){var i=t.width()+parseInt(t.css("paddingRight"))+parseInt(t.css("paddingLeft")),a=t.offset().left;"center"===this.settings.align?a="50% 50%":"left"===this.settings.align?a="0% 50%":"right"===this.settings.align?a="100% 50%":"top"===this.settings.align?a="50% 0%":"bottom"===this.settings.align&&(a="50% 100%"),t.css({opacity:Math.abs(parseFloat(this.settings.opacity)/100),backgroundSize:"cover",backgroundAttachment:"scroll",backgroundPosition:a,backgroundRepeat:"no-repeat"}),""!==this.settings.image&&"none"!==this.settings.image&&t.css({opacity:Math.abs(parseFloat(this.settings.opacity)/100),backgroundImage:"url("+this.settings.image+")"})}else if("fixed"===this.settings.direction)t.css({backgroundAttachment:"fixed",backgroundRepeat:"repeat"}),""!==this.settings.image&&"none"!==this.settings.image&&t.attr("style","background-image: url("+this.settings.image+") !important;"+t.attr("style"));else if("left"===this.settings.direction||"right"===this.settings.direction){var i=t.width()+parseInt(t.css("paddingRight"))+parseInt(t.css("paddingLeft")),n=t.height()+parseInt(t.css("paddingTop"))+parseInt(t.css("paddingBottom")),r=i;i+=400*Math.abs(parseFloat(this.settings.velocity));var s="0%";"center"===this.settings.align?s="50%":"bottom"===this.settings.align&&(s="100%");var o=0;"right"===this.settings.direction&&(o-=i-r),t.find(".parallax-inner").length<1&&t.prepend('<div class="parallax-inner"></div>'),t.css({position:"relative",overflow:"hidden",zIndex:1}).attr("style","background-image: none !important; "+t.attr("style")).find(".parallax-inner").css({pointerEvents:"none",width:i,height:n,position:"absolute",zIndex:-1,top:0,left:o,opacity:Math.abs(parseFloat(this.settings.opacity)/100),backgroundPosition:e?"0 0 ":"50% "+s,backgroundRepeat:e?"repeat":"no-repeat"}),""!==this.settings.image&&"none"!==this.settings.image&&t.find(".parallax-inner").css({opacity:Math.abs(parseFloat(this.settings.opacity)/100),backgroundImage:"url("+this.settings.image+")"});var d=0;t.offset().top>_gambitWindowHeight&&(d=t.offset().top-_gambitWindowHeight);var g=t.offset().top+t.height()+parseInt(t.css("paddingTop"))+parseInt(t.css("paddingBottom"));this.moveMax=i-r,this.scrollTopMin=d,this.scrollTopMax=g}else{var l=800;"down"===this.settings.direction&&(l*=1.2);var i=t.width()+parseInt(t.css("paddingRight"))+parseInt(t.css("paddingLeft")),n=t.height()+parseInt(t.css("paddingTop"))+parseInt(t.css("paddingBottom")),p=n;n+=l*Math.abs(parseFloat(this.settings.velocity));var o="0%";"center"===this.settings.align?o="50%":"right"===this.settings.align&&(o="100%");var s=0;"down"===this.settings.direction&&(s-=n-p),t.find(".parallax-inner").length<1&&t.prepend('<div class="parallax-inner"></div>'),t.css({position:"relative",overflow:"hidden",zIndex:1}).attr("style","background-image: none !important; "+t.attr("style")).find(".parallax-inner").css({pointerEvents:"none",width:i,height:n,position:"absolute",zIndex:-1,top:s,left:0,opacity:Math.abs(parseFloat(this.settings.opacity)/100),backgroundPosition:e?"0":o+" 50%",backgroundRepeat:e?"repeat":"no-repeat"}),""!==this.settings.image&&"none"!==this.settings.image&&t.find(".parallax-inner").css({opacity:Math.abs(parseFloat(this.settings.opacity)/100),backgroundImage:"url("+this.settings.image+")"});var d=0;t.offset().top>_gambitWindowHeight&&(d=t.offset().top-_gambitWindowHeight);var g=t.offset().top+t.height()+parseInt(t.css("paddingTop"))+parseInt(t.css("paddingBottom"));this.moveMax=n-p,this.scrollTopMin=d,this.scrollTopMax=g}}}}),$.fn[n]=function(t){return this.each(function(){$.data(this,"plugin_"+n)||$.data(this,"plugin_"+n,new a(this,t))}),this}}(jQuery,window,document),jQuery(document).ready(function($){"use strict";function t(){_gambitRefreshScroll();for(var e=0;e<_gambitImageParallaxImages.length;e++)_gambitImageParallaxImages[e].doParallax();requestAnimationFrame(t)}function e(){_gambitScrollTop=window.pageYOffset,_gambitWindowHeight=$(window).height(),_gambitScrollLeft=window.pageXOffset,_gambitWindowWidth=$(window).width()}$(window).on("scroll touchmove touchstart touchend gesturechange mousemove",function(t){requestAnimationFrame(_gambitParallaxAll)}),(Modernizr.touch&&jQuery(window).width()<=1024||window.screen.width<=1281&&window.devicePixelRatio>1)&&requestAnimationFrame(t),$(window).on("resize",function(){setTimeout(function(){var $=jQuery;e(),$.each(_gambitImageParallaxImages,function(t,e){e.resizeParallaxBackground()})},1)}),setTimeout(function(){var $=jQuery;e(),$.each(_gambitImageParallaxImages,function(t,e){e.resizeParallaxBackground()})},1),setTimeout(function(){var $=jQuery;e(),$.each(_gambitImageParallaxImages,function(t,e){e.resizeParallaxBackground()})},100)}),jQuery(document).ready(function($){"use strict";function t(){return Modernizr.touch&&jQuery(window).width()<=1e3||window.screen.width<=1281&&window.devicePixelRatio>1}if(!$("body").hasClass("vc_editor")){t()&&$(".bg-parallax.video > div, .gambit-bg-parallax.video > div").remove();var e=function(){var $=jQuery;$(".bg-parallax, .gambit-bg-parallax").each(function(){var t=$(this).next();if(0!=t.length&&"undefined"!=typeof $(this).attr("data-break-parents")){var e=parseInt($(this).attr("data-break-parents"));if(!isNaN(e)){for(var i=t.parent(),a=0;e>a&&!i.is("html");a++)i=i.parent();"undefined"==typeof t.attr("data-orig-margin-left")?(t.attr("data-orig-margin-left",t.css("marginLeft")),t.attr("data-orig-padding-left",t.css("paddingLeft")),t.attr("data-orig-margin-right",t.css("marginRight")),t.attr("data-orig-padding-right",t.css("paddingRight"))):(t[0].style.removeProperty("margin-left"),t[0].style.removeProperty("padding-left"),t[0].style.removeProperty("margin-right"),t[0].style.removeProperty("padding-right"),t[0].style.setProperty("margin-left",t.attr("data-orig-margin-left"),"important"),t[0].style.setProperty("padding-left",t.attr("data-orig-padding-left"),"important"),t[0].style.setProperty("margin-right",t.attr("data-orig-margin-right"),"important"),t[0].style.setProperty("padding-right",t.attr("data-orig-padding-right"),"important"));var n=i.width()+parseInt(i.css("paddingLeft"))+parseInt(i.css("paddingRight")),r=t.width()+parseInt(t.css("paddingLeft"))+parseInt(t.css("paddingRight")),s=t.offset().left-i.offset().left,o=i.offset().left+n-(t.offset().left+r),d=parseFloat(t.css("marginLeft")),g=parseFloat(t.css("marginRight")),l=parseFloat(t.css("paddingLeft")),p=parseFloat(t.css("paddingRight"));d-=s,l+=s,g-=o,p+=o,t[0].style.removeProperty("margin-left"),t[0].style.removeProperty("padding-left"),t[0].style.removeProperty("margin-right"),t[0].style.removeProperty("padding-right"),t[0].style.setProperty("margin-left",d+"px","important"),t[0].style.setProperty("padding-left",l+"px","important"),t[0].style.setProperty("margin-right",g+"px","important"),t[0].style.setProperty("padding-right",p+"px","important"),t.addClass("broke-out broke-out-"+e)}}})};$(window).resize(e),e(),$(".bg-parallax, .gambit-bg-parallax").next().addClass("bg-parallax-parent"),$(".bg-parallax.parallax, .gambit-bg-parallax.parallax").attr("style","").css("display","none"),$(".bg-parallax.parallax, .gambit-bg-parallax.parallax").each(function(){$(this).gambitImageParallax({image:$(this).attr("data-bg-image"),direction:$(this).attr("data-direction"),mobileenabled:$(this).attr("data-mobile-enabled"),mobiledevice:t(),opacity:$(this).attr("data-opacity"),width:$(this).attr("data-bg-width"),height:$(this).attr("data-bg-height"),velocity:$(this).attr("data-velocity"),align:$(this).attr("data-bg-align"),repeat:$(this).attr("data-bg-repeat"),target:$(this).next(),complete:function(){}})})}});var tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag),jQuery(document).ready(function($){if(!$("body").hasClass("vc_editor")){$(".bg-parallax.video, .gambit-bg-parallax.video").each(function(){$(this).prependTo($(this).next().addClass("video")),$(this).css({opacity:Math.abs(parseFloat($(this).attr("data-opacity"))/100)})});var t=$("[data-youtube-video-id], [data-vimeo-video-id]").parent();t.css("overflow","hidden"),$("[data-youtube-video-id], [data-vimeo-video-id]").each(function(){var t=$(this);setTimeout(function(){resizeVideo(t)},100)}),$(window).resize(function(){$("[data-youtube-video-id], [data-vimeo-video-id]").each(function(){var t=$(this);setTimeout(function(){resizeVideo(t)},2)})}),$("[data-vimeo-video-id]").each(function(){var t=$f($(this).find("iframe")[0]),e=$(this);t.addEvent("ready",function(){"true"===e.attr("data-mute")&&t.api("setVolume",0),t.addEvent("playProgress",function i(t,e){jQuery("#"+e).parent().css("visibility","visible")})})})}});