
/*!
	Colorbox 1.6.4
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(A+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in x[0]&&!x[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),x.focus())}function c(t){c.str!==t&&(x.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){A=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),A=W.index(_.el),-1===A&&(W=W.add(_.el),A=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!U){U=$=!0,c(_.get("className")),x.css({visibility:"hidden",display:"block",opacity:""}),I=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(I),j=T.height()+k.height()+b.outerHeight(!0)-b.height(),D=C.width()+H.width()+b.outerWidth(!0)-b.width(),N=I.outerHeight(!0),z=I.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=Math.max((l!==!1?Math.min(h,a(l,"x")):h)-z-D,0),_.h=Math.max((f!==!1?Math.min(s,a(f,"y")):s)-N-j,0),I.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(F).hide(),x.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}var p=parseFloat(_.get("opacity"));v.css({opacity:p===p?p:"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){x||(V=!1,E=t(i),x=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),L=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),y=n(se,"Wrapper"),b=n(se,"Content").append(F=n(se,"Title"),R=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),S=t('<button type="button"/>').attr({id:Z+"Slideshow"}),L),B=t('<button type="button"/>').attr({id:Z+"Close"}),y.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(R).add(S)),e.body&&!x.parent().length&&t(e.body).append(v,x.append(y,M))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return x?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;U&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),U&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if($=!0,q=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-N-j:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-z-D:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-z-D,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-N-j,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){L.show()},100),_.get("inline")){var c=t(e).eq(0);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),q=_.get("createImg"),t(q).addClass(Z+"Photo").bind("error."+Z,function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;_.get("retinaImage")&&i.devicePixelRatio>1&&(q.height=q.height/i.devicePixelRatio,q.width=q.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){q.height-=q.height*e,q.width-=q.width*e},_.mw&&q.width>_.mw&&(e=(q.width-_.mw)/q.width,o()),_.mh&&q.height>_.mh&&(e=(q.height-_.mh)/q.height,o())),_.h&&(q.style.marginTop=Math.max(_.mh-q.height,0)/2+"px"),W[1]&&(_.get("loop")||W[A+1])&&(q.style.cursor="pointer",t(q).bind("click."+Z,function(){J.next()})),q.style.width=q.width+"px",q.style.height=q.height+"px",h(q)},1)}),q.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,x,y,b,T,C,H,k,W,E,I,M,L,F,R,S,K,P,B,O,_,j,D,N,z,A,q,U,$,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title},createImg:function(){var e=new Image,i=t(this).data("cbox-img-attrs");return"object"==typeof i&&t.each(i,function(t,i){e[t]=i}),e},createIframe:function(){var i=e.createElement("iframe"),n=t(this).data("cbox-iframe-attrs");return"object"==typeof n&&t.each(n,function(t,e){i[t]=e}),"frameBorder"in i&&(i.frameBorder=0),"allowTransparency"in i&&(i.allowTransparency="true"),i.name=(new Date).getTime(),i.allowFullscreen=!0,i}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[A+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){S.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),x.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),S.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),x.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,S.hide(),t(),ae.unbind(ne,e).unbind(ie,t),x.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),S.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;return e=e||{},t.isFunction(o)&&(o=t("<a/>"),e.open=!0),o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(x[0].style.width,10)-D+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(x[0].style.height,10)-j+"px"}var r,h,s,l=0,d=0,c=x.offset();if(E.unbind("resize."+Z),x.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,x.css({position:"fixed"})):(l=h,d=s,x.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-z-D-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-z-D,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-N-j-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-N-j,0)/2),x.css({top:c.top,left:c.left,visibility:"visible"}),y[0].style.width=y[0].style.height="9999px",r={width:_.w+z+D,height:_.h+N+j,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||x.css(r),x.dequeue().animate(r,{duration:e||0,complete:function(){n(),$=!1,y[0].style.width=_.w+z+D+"px",y[0].style.height=_.h+N+j+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),t.isFunction(i)&&i()},step:n})},J.resize=function(t){var e;U&&(t=t||{},t.width&&(_.w=a(t.width,"x")-z-D),t.innerWidth&&(_.w=a(t.innerWidth,"x")),I.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-N-j),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=I.scrollTop(),I.css({height:"auto"}),_.h=I.height()),I.css({height:_.h}),e&&I.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||I.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||I.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if(U){var d,g="none"===_.get("transition")?0:_.get("speed");I.remove(),I=n(se,"LoadedContent").append(i),I.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(q).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&x[0].style.removeAttribute("filter")}var n,o,a=W.length;U&&(o=function(){clearTimeout(Q),L.hide(),u(ne),_.get("onComplete")},F.html(_.get("title")).show(),I.show(),a>1?("string"==typeof _.get("current")&&R.html(_.get("current").replace("{current}",A+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>A?"show":"hide"]().html(_.get("next")),P[_.get("loop")||A?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=_.get("createIframe"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),"class":Z+"Iframe"}).one("load",o).appendTo(I),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?x.fadeTo(g,1,i):i())},"fade"===_.get("transition")?x.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!$&&W[1]&&(_.get("loop")||W[A+1])&&(A=h(1),f(W[A]))},J.prev=function(){!$&&W[1]&&(_.get("loop")||A)&&(A=h(-1),f(W[A]))},J.close=function(){U&&!G&&(G=!0,U=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),x.stop().fadeTo(_.get("fadeOut")||0,0,function(){x.hide(),v.hide(),u(he),I.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){x&&(x.stop(),t[Y].close(),x.stop(!1,!0).remove(),v.remove(),G=!1,x=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);
/*! http://responsiveslides.com v1.55 by @viljamis */
(function(c,K,C){c.fn.responsiveSlides=function(m){var a=c.extend({auto:!0,speed:500,timeout:4E3,pager:!1,nav:!1,random:!1,pause:!1,pauseControls:!0,prevText:"Previous",nextText:"Next",maxwidth:"",navContainer:"",manualControls:"",namespace:"rslides",before:c.noop,after:c.noop},m);return this.each(function(){C++;var f=c(this),u,t,v,n,q,r,p=0,e=f.children(),D=e.length,h=parseFloat(a.speed),E=parseFloat(a.timeout),w=parseFloat(a.maxwidth),g=a.namespace,d=g+C,F=g+"_nav "+d+"_nav",x=g+"_here",k=d+"_on",
y=d+"_s",l=c("<ul class='"+g+"_tabs "+d+"_tabs' />"),z={"float":"left",position:"relative",opacity:1,zIndex:2},A={"float":"none",position:"absolute",opacity:0,zIndex:1},G=function(){var b=(document.body||document.documentElement).style,a="transition";if("string"===typeof b[a])return!0;u=["Moz","Webkit","Khtml","O","ms"];var a=a.charAt(0).toUpperCase()+a.substr(1),c;for(c=0;c<u.length;c++)if("string"===typeof b[u[c]+a])return!0;return!1}(),B=function(b){a.before(b);G?(e.removeClass(k).css(A).eq(b).addClass(k).css(z),
p=b,setTimeout(function(){a.after(b)},h)):e.stop().fadeOut(h,function(){c(this).removeClass(k).css(A).css("opacity",1)}).eq(b).fadeIn(h,function(){c(this).addClass(k).css(z);a.after(b);p=b})};a.random&&(e.sort(function(){return Math.round(Math.random())-.5}),f.empty().append(e));e.each(function(a){this.id=y+a});f.addClass(g+" "+d);m&&m.maxwidth&&f.css("max-width",w);e.hide().css(A).eq(0).addClass(k).css(z).show();G&&e.show().css({"-webkit-transition":"opacity "+h+"ms ease-in-out","-moz-transition":"opacity "+
h+"ms ease-in-out","-o-transition":"opacity "+h+"ms ease-in-out",transition:"opacity "+h+"ms ease-in-out"});if(1<e.length){if(E<h+100)return;if(a.pager&&!a.manualControls){var H=[];e.each(function(a){a+=1;H+="<li><a href='#' class='"+y+a+"'>"+a+"</a></li>"});l.append(H);m.navContainer?c(a.navContainer).append(l):f.after(l)}a.manualControls&&(l=c(a.manualControls),l.addClass(g+"_tabs "+d+"_tabs"));(a.pager||a.manualControls)&&l.find("li").each(function(a){c(this).addClass(y+(a+1))});if(a.pager||a.manualControls)r=
l.find("a"),t=function(a){r.closest("li").removeClass(x).eq(a).addClass(x)};a.auto&&(v=function(){q=setInterval(function(){e.stop(!0,!0);var b=p+1<D?p+1:0;(a.pager||a.manualControls)&&t(b);B(b)},E)},v());n=function(){a.auto&&(clearInterval(q),v())};a.pause&&f.hover(function(){clearInterval(q)},function(){n()});if(a.pager||a.manualControls)r.bind("click",function(b){b.preventDefault();a.pauseControls||n();b=r.index(this);p===b||c("."+k).queue("fx").length||(t(b),B(b))}).eq(0).closest("li").addClass(x),
a.pauseControls&&r.hover(function(){clearInterval(q)},function(){n()});if(a.nav){g="<a href='#' class='"+F+" prev'>"+a.prevText+"</a><a href='#' class='"+F+" next'>"+a.nextText+"</a>";m.navContainer?c(a.navContainer).append(g):f.after(g);var d=c("."+d+"_nav"),I=d.filter(".prev");d.bind("click",function(b){b.preventDefault();b=c("."+k);if(!b.queue("fx").length){var d=e.index(b);b=d-1;d=d+1<D?p+1:0;B(c(this)[0]===I[0]?b:d);(a.pager||a.manualControls)&&t(c(this)[0]===I[0]?b:d);a.pauseControls||n()}});
a.pauseControls&&d.hover(function(){clearInterval(q)},function(){n()})}}if("undefined"===typeof document.body.style.maxWidth&&m.maxwidth){var J=function(){f.css("width","100%");f.width()>w&&f.css("width",w)};J();c(K).bind("resize",function(){J()})}})}})(jQuery,this,0);
/**
 * mobile Hamburger: Ausklapp-Funktionalität
 */
$(document).ready(function () {
    var iefix = document.querySelectorAll('.expand-icon').forEach(function(item) { 
      item.addEventListener('click', toggleMenuItem);
      item.addEventListener('touchstart', toggleMenuItem);
    })

    let cooldown = false;

    function toggleMenuItem() {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (cooldown === false) {
            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active");
            } else {
                $(this).parent().addClass("active");
            }
            /*
            var ariaExpanded = this.getAttribute( 'aria-expanded' );
            console.log( ariaExpanded );
            if (ariaExpanded === 'true') {
                this.setAttribute( 'aria-expanded', 'false');
            } else if (ariaExpanded === 'false') {
                this.setAttribute( 'aria-expanded', 'true' );
            }
            */
            cooldown = true;
            setTimeout(function(){
                cooldown = false;
            }, 500);
        }

        return false;
    }
});
var y_scroll,
    header_height = 180;
    //is_desktop = true;

/**
 * Berechnet die Größe divereser Elemente. Wird benötigt für...
 * ...die fixe Kopfzeile (berechnet den Schwellenwert)
 *
 */

function docDimensions() {
    
    'use strict';
    
    header_height = $('#top').height();
    
}

function breakpoint() {
    'use strict';
    
    if ($('#media-state').css('display') === 'none') {
        
        $('body').removeClass('mobile-nav');
    }
}

function mobileNav() {
    'use strict';
    
    $('#hamburger-nav').on('click', function () {
        
        $('body').toggleClass('mobile-nav');
    });
}

function toggleHeadbar() {
    'use strict';
    
    y_scroll = $(window).scrollTop();
    
    if (y_scroll > header_height) {
        
        $('body').addClass('fixed-headbar');
        
    } else {
        
        $('body').removeClass('fixed-headbar');
        
    }
}



/****************************************************************************************
 * smoothScroll()
 * https://css-tricks.com/snippets/jquery/smooth-scrolling/
 ****************************************************************************************/
function smoothScroll() {
    'use strict';
    
    $('a.scroll-link').on('click', function (event) {
        
        event.preventDefault();
        
        var target = $(this.hash);
        
        $('html, body').stop().animate({
            
            scrollTop: $(target).offset().top - 140
        
        }, 1000);
        
        return false;
    
    });
}




/**
 * Funktion wird nach laden des DOM ausgeführt.
 */
$(document).ready(function () {
    
    'use strict';
    
    docDimensions();
    
    //breakpoint();
    
    mobileNav();

    toggleHeadbar();

    $('.rslides').responsiveSlides({
        auto: true,
        speed: 500,
        timeout: 4000,
        pager: true,
        pause: true,
        pauseControls: true,
        prevText: "Previous",
        nextText: "Next"
    });
    
    $('a.colorbox').colorbox({
        maxHeight:'95%',
        maxWidth:'95%'
    });
    
    // Youtube Colorbox
    $('a.youtube-colorbox').colorbox({
        iframe: true,
        innerWidth: 854,
        innerHeight: 480
    });

    smoothScroll();
    
    /**
     * Funktion wird beim Scrollen ausgeführt
     */
    $(window).scroll(function () {
        
        toggleHeadbar();
    });
    

    /**
     * Funktion wird beim Ändern der Fenstergröße ausgeführt
     */
    $(window).resize(function () {

        breakpoint();
    });

});


/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.9.1
*/
!function(o){"object"==typeof module&&"object"==typeof module.exports?o(require("jquery"),window,document):o(jQuery,window,document)}(function(o,t,i,e){var s=[],l=function(){return s.length?s[s.length-1]:null},n=function(){var o,t=!1;for(o=s.length-1;o>=0;o--)s[o].$blocker&&(s[o].$blocker.toggleClass("current",!t).toggleClass("behind",t),t=!0)};o.modal=function(t,i){var e,n;if(this.$body=o("body"),this.options=o.extend({},o.modal.defaults,i),this.options.doFade=!isNaN(parseInt(this.options.fadeDuration,10)),this.$blocker=null,this.options.closeExisting)for(;o.modal.isActive();)o.modal.close();if(s.push(this),t.is("a"))if(n=t.attr("href"),this.anchor=t,/^#/.test(n)){if(this.$elm=o(n),1!==this.$elm.length)return null;this.$body.append(this.$elm),this.open()}else this.$elm=o("<div>"),this.$body.append(this.$elm),e=function(o,t){t.elm.remove()},this.showSpinner(),t.trigger(o.modal.AJAX_SEND),o.get(n).done(function(i){if(o.modal.isActive()){t.trigger(o.modal.AJAX_SUCCESS);var s=l();s.$elm.empty().append(i).on(o.modal.CLOSE,e),s.hideSpinner(),s.open(),t.trigger(o.modal.AJAX_COMPLETE)}}).fail(function(){t.trigger(o.modal.AJAX_FAIL);var i=l();i.hideSpinner(),s.pop(),t.trigger(o.modal.AJAX_COMPLETE)});else this.$elm=t,this.anchor=t,this.$body.append(this.$elm),this.open()},o.modal.prototype={constructor:o.modal,open:function(){var t=this;this.block(),this.anchor.blur(),this.options.doFade?setTimeout(function(){t.show()},this.options.fadeDuration*this.options.fadeDelay):this.show(),o(i).off("keydown.modal").on("keydown.modal",function(o){var t=l();27===o.which&&t.options.escapeClose&&t.close()}),this.options.clickClose&&this.$blocker.click(function(t){t.target===this&&o.modal.close()})},close:function(){s.pop(),this.unblock(),this.hide(),o.modal.isActive()||o(i).off("keydown.modal")},block:function(){this.$elm.trigger(o.modal.BEFORE_BLOCK,[this._ctx()]),this.$body.css("overflow","hidden"),this.$blocker=o('<div class="'+this.options.blockerClass+' blocker current"></div>').appendTo(this.$body),n(),this.options.doFade&&this.$blocker.css("opacity",0).animate({opacity:1},this.options.fadeDuration),this.$elm.trigger(o.modal.BLOCK,[this._ctx()])},unblock:function(t){!t&&this.options.doFade?this.$blocker.fadeOut(this.options.fadeDuration,this.unblock.bind(this,!0)):(this.$blocker.children().appendTo(this.$body),this.$blocker.remove(),this.$blocker=null,n(),o.modal.isActive()||this.$body.css("overflow",""))},show:function(){this.$elm.trigger(o.modal.BEFORE_OPEN,[this._ctx()]),this.options.showClose&&(this.closeButton=o('<a href="#close-modal" rel="modal:close" class="close-modal '+this.options.closeClass+'">'+this.options.closeText+"</a>"),this.$elm.append(this.closeButton)),this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker),this.options.doFade?this.$elm.css({opacity:0,display:"inline-block"}).animate({opacity:1},this.options.fadeDuration):this.$elm.css("display","inline-block"),this.$elm.trigger(o.modal.OPEN,[this._ctx()])},hide:function(){this.$elm.trigger(o.modal.BEFORE_CLOSE,[this._ctx()]),this.closeButton&&this.closeButton.remove();var t=this;this.options.doFade?this.$elm.fadeOut(this.options.fadeDuration,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}):this.$elm.hide(0,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}),this.$elm.trigger(o.modal.CLOSE,[this._ctx()])},showSpinner:function(){this.options.showSpinner&&(this.spinner=this.spinner||o('<div class="'+this.options.modalClass+'-spinner"></div>').append(this.options.spinnerHtml),this.$body.append(this.spinner),this.spinner.show())},hideSpinner:function(){this.spinner&&this.spinner.remove()},_ctx:function(){return{elm:this.$elm,$elm:this.$elm,$blocker:this.$blocker,options:this.options}}},o.modal.close=function(t){if(o.modal.isActive()){t&&t.preventDefault();var i=l();return i.close(),i.$elm}},o.modal.isActive=function(){return s.length>0},o.modal.getCurrent=l,o.modal.defaults={closeExisting:!0,escapeClose:!0,clickClose:!0,closeText:"Close",closeClass:"",modalClass:"modal",blockerClass:"jquery-modal",spinnerHtml:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',showSpinner:!0,showClose:!0,fadeDuration:null,fadeDelay:1},o.modal.BEFORE_BLOCK="modal:before-block",o.modal.BLOCK="modal:block",o.modal.BEFORE_OPEN="modal:before-open",o.modal.OPEN="modal:open",o.modal.BEFORE_CLOSE="modal:before-close",o.modal.CLOSE="modal:close",o.modal.AFTER_CLOSE="modal:after-close",o.modal.AJAX_SEND="modal:ajax:send",o.modal.AJAX_SUCCESS="modal:ajax:success",o.modal.AJAX_FAIL="modal:ajax:fail",o.modal.AJAX_COMPLETE="modal:ajax:complete",o.fn.modal=function(t){return 1===this.length&&new o.modal(this,t),this},o(i).on("click.modal",'a[rel~="modal:close"]',o.modal.close),o(i).on("click.modal",'a[rel~="modal:open"]',function(t){t.preventDefault(),o(this).modal()})});
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3.11=a(i){i=3.L({w:G,F:G,v:G},i);g(i.w){$.10({u:\'Z\',w:i.w,F:i.F,Y:\'4\',v:a(4){d f=k E(4);g(3.X(i.v))i.v(f)}})}};a E(4){g(4)2.M(4)};E.s={u:\'\',m:\'\',c:\'\',b:\'\',h:\'\',M:a(4){g(3(\'9\',4).B==1){2.u=\'A\';d t=k C(4)}y g(3(\'f\',4).B==1){2.u=\'W\';d t=k D(4)}g(t)3.L(2,t)}};a p(){};p.s={c:\'\',b:\'\',h:\'\',j:\'\',o:\'\',l:\'\'};a D(4){2.r(4)};D.s={r:a(4){d 9=3(\'f\',4).8(0);2.m=\'1.0\';2.c=3(9).5(\'c:e\').6();2.b=3(9).5(\'b:e\').q(\'K\');2.h=3(9).5(\'V:e\').6();2.z=3(9).q(\'4:U\');2.j=3(9).5(\'j:e\').6();2.n=k J();d f=2;3(\'T\',4).I(a(){d 7=k p();7.c=3(2).5(\'c\').8(0).6();7.b=3(2).5(\'b\').8(0).q(\'K\');7.h=3(2).5(\'S\').8(0).6();7.j=3(2).5(\'j\').8(0).6();7.o=3(2).5(\'o\').8(0).6();7.l=3(2).5(\'l R\').8(0).6();f.n.H(7)})}};a C(4){2.r(4)};C.s={r:a(4){g(3(\'A\',4).B==0)2.m=\'1.0\';y 2.m=3(\'A\',4).8(0).q(\'m\');d 9=3(\'9\',4).8(0);2.c=3(9).5(\'c:e\').6();2.b=3(9).5(\'b:e\').6();2.h=3(9).5(\'h:e\').6();2.z=3(9).5(\'z:e\').6();2.j=3(9).5(\'Q:e\').6();2.n=k J();d f=2;3(\'7\',4).I(a(){d 7=k p();7.c=3(2).5(\'c\').8(0).6();7.b=3(2).5(\'b\').8(0).6();7.h=3(2).5(\'h\').8(0).6();7.j=3(2).5(\'P\').8(0).6();7.o=3(2).5(\'O\').8(0).6();g(3(2).5(\'x\').8(0).6()!=\'\'){7.l=3(2).5(\'x\').8(0).6()}y{7.l=3(2).5("N\\\\:x").8(0).6()}f.n.H(7)})}};',62,64,'||this|jQuery|xml|find|text|item|eq|channel|function|link|title|var|first|feed|if|description|options|updated|new|author|version|items|id|JFeedItem|attr|_parse|prototype|feedClass|type|success|url|creator|else|language|rss|length|JRss|JAtom|JFeed|data|null|push|each|Array|href|extend|parse|dc|guid|pubDate|lastBuildDate|name|content|entry|lang|subtitle|atom|isFunction|dataType|GET|ajax|getFeed'.split('|')))
$(document).ready(function () {
    'use strict';

    var feedContainer = $('#dw-feed'),
        baseUrl = 'https://' + window.location.hostname,
        proxy = '/fileadmin/160923_Sparkassenstiftungen_HTML/php/proxy.php?csurl=',
        html = '<span class="dw-branding"></span><div class="headlines"><h4>Deutsche-Welle Meldungen</h4></div>',
        feedLink = 'https://partner.dw.com/syndication/feeds/gk-rss-sparkassenstiftung-artikel-de.24467-media.xml',
        moreText = '&raquo; Mehr lesen',
        date = '',
        day = '',
        month = '',
        year = '',
        humanDate = '',
        item,
        feedContent = '',
        i = 0;

    function dwFeed() {

        // https://partner.dw.com/syndication/feeds/gk-rss-sparkassenstiftung-artikel-de.24467-media.xml
        // https://partner.dw.com/syndication/feeds/gk-rss-sparkassenstiftung-artikel-de.24467-media.xml

        if (feedContainer.hasClass('en-dw-feed')) {

            html = '<span class="dw-branding"></span><div class="headlines"><h4>Deutsche Welle news</h4></div>';
            feedLink = 'https://rss.dw.com/syndication/feeds/gk-rss-sparkassenstiftung-artikel-en.24565-media.xml';
            moreText = '&raquo; Read more';

        } else if (feedContainer.hasClass('es-dw-feed')) {

            html = '<span class="dw-branding"></span><div class="headlines"><h4>Noticias de la Deutsche Welle</h4></div>';
            feedLink = 'https://rss.dw.com/syndication/feeds/gk-rss-sparkassenstiftung-artikel-es.24453-media.xml';
            moreText = '&raquo; Leer más';
        }
        else {
            html = '<span class="dw-branding"></span><div class="headlines"><h4>Deutsche Welle News</h4></div>';
            feedLink = 'https://rss.dw.com/syndication/feeds/gk-rss-sparkassenstiftung-artikel-de.24467-media.xml';
            moreText = '&raquo; Mehr lesen';
        }

        $.get(feedLink, function(data) {
            var $xml = $(data);
            var i = 0;
            $xml.find("item").each(function() {
                var $this = $(this),
                    item = {
                        title: $this.find("title").text(),
                        link: $this.find("link").text(),
                        description: $this.find("description").text(),
                        pubDate: $this.find("pubDate").text()
                    }
                //Do something with item here...

                var tdate = new Date($this.find("pubDate").text());

                var date = new Date(tdate);
                var postDate = date.getDate()-1;
                var postMonth = date.getMonth()+1;
                var postYear = date.getFullYear();
                var postFullDate = postDate+"."+postMonth+"."+postYear;

                if(i < 7) {
                    html +=     '<p class="news-preview">'
                        +           '<span class="date">' + postFullDate + ' | <b>' + item.title + '</b></span><br>'
                        +           '<span>' + item.description.substring(0, 275) + ' ...</span><br>'
                        +           '<a target="blank" title="Nachricht der Deutschen Welle in neuem Tab/Fenster öffnen" href="' + item.link + '">' + moreText + '</a>'
                        +       '</p>';
                }
                i++;
            });
            feedContainer.append(html).addClass('ready');
        });


    }

    dwFeed();

});
