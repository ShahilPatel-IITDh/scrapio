;(function($) {

   'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';
            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('.mega-menu .mega-menu-sub').hide();
                    $('.has-mega-menu .submenu.mega-menu').hide();

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a:not(.has-mega)').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {        	
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });


        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });

    }


    var alertBox = function() {
        $(document).on('click', '.close', function(e) {
            $(this).closest('.flat-alert').remove();
            e.preventDefault();
        })     
    } 

/*     var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });

        $(window).on('load', function() {
            setTimeout(function() {
                $.waypoints('refresh');
            }, 100);
        });
    }; */

    var flatTabs = function () {
        $('.flat-tabs').each(function() {

            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();

            $(this).find('.menu-tabs').children('li').on('click', function(e) {
                var liActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);

                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    
    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        }); 

        $('.go-top').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    var retinaLogos = function() {
      var retina = window.devicePixelRatio > 1 ? true : false;
        if( retina ) {
            $( '.header .logo' ).find('img').attr( {src:'/images/logo@2x.png'} );   
        }
    };


var portfolioSlider = function() { 
        if ( $().flexslider ) {
            $('.portfolio-slider').each(function() {
                var $this = $(this)
                $this.find('.flexslider').flexslider({
                    animation      :  "slide",
                    direction      :  "horizontal", // vertical
                    pauseOnHover   :  true,
                    useCSS         :  false,
                    easing         :  "swing",
                    animationSpeed :  500,
                    slideshowSpeed :  5000,
                    controlNav     :  true,
                    directionNav   :  true,
                    slideshow      :  true,
                    smoothHeight   :  true
                }); // flexslider
            }); // blog-sider
        }
    };

    var generalSlider = function() { 
        if ( $().flexslider ) {
            $('.about-slider').each(function() {
                var $this = $(this)
                $this.find('.flexslider').flexslider({
                    animation      :  "slide",
                    direction      :  "horizontal", // vertical
                    pauseOnHover   :  true,
                    useCSS         :  false,
                    easing         :  "swing",
                    animationSpeed :  500,
                    slideshowSpeed :  5000,
                    controlNav     :  false,
                    directionNav   :  true,
                    slideshow      :  true,
                    smoothHeight   :  true
                }); // flexslider
            }); // blog-sider
        }
    }; 
	
	var popupGallery = function () {
        $('.flat-row').each(function() {
            if ( $('a').hasClass('popup-gallery') ) {                
                 $(".popup-gallery").magnificPopup({
                    type: "image",
                    tLoading: "Loading image #%curr%...",
                    removalDelay: 600,
                    mainClass: "my-mfp-slide-bottom",
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [ 0, 1 ]
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                    }
                });
            }
        });       
    }
    
    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax1').parallax("50%", -0.8);
            $('.parallax2').parallax("50%", -1.1);  
            $('.parallax3').parallax("50%", -1.1); 
            $('.parallax4').parallax("50%", -0.8);
            $('.parallax5').parallax("50%", -1.1);
        }
    };

    var videoPopup =  function() {
        $(".fancybox").on("click", function(){
            $.fancybox({
              href: this.href,
              type: $(this).data("type")
            }); // fancybox
            return false   
        }); // on
    }


    var removePreloader = function() {        
        $('.loading-overlay').fadeOut('slow',function () {
            $(this).remove();
        });
    };   

   	// Dom Ready
	$(function() { 
        /* if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
            headerFixed();
        }  */
        
        // megaMenu(); 
        //googleMap();
        goTop();        
     /*    swClick(); */
        popupGallery();
        portfolioSlider();
        generalSlider();
        /* portfolioIsotope();
        flatAccordion();
        progressBar(); 
        flatTabs();
        videoPopup();
        /*flatCounter(); */
        responsiveMenu();
        /* flatTestimonial();
        flatSearch(); */
        //detectViewport();
        /* ajaxContactForm(); */
       /*  requestcallback(); */
        alertBox();
        retinaLogos(); 
        parallax();
        removePreloader();
   	});

})(jQuery);


/*1.4.1/jquery.easing.min.js*/
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing.jswing=$.easing.swing;var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});

/*! Divas Cookies jQuery plugin v0.6 2015.06.17 - jquery.divascookies-0.6.js by Federica Sibella (@musingspuntoit) and Michela Chiucini (@webislove) - Coding Divas (@CodingDivas) */
!function(e){var t=!1,o="DisplayDivasCookiesBanner";e.DivasCookies=function(i){var c={bannerText:"[Divas Cookies Demo] This website uses cookies.",cookiePolicyLink:"",cookiePolicyLinkText:"[Divas Cookies Demo] Read our cookie policy.",thirdPartyPolicyWidget:"",acceptButtonText:"[Divas Cookies Demo] Ok",acceptButtonSrc:"",declineButtonText:"No cookies, please",declineButtonSrc:"",openEffect:"",openEffectDuration:600,openEffectEasing:"swing",closeEffect:"",closeEffectDuration:600,closeEffectEasing:"swing",debugMode:!1,saveUserPreferences:!0,cookieDuration:365,blockScripts:!1,pageReload:!1,acceptOnScroll:!1,acceptOnClick:!1,cookieName:"DisplayDivasCookiesBanner",excludePolicyPage:!1},a=e.extend({},c,i);t=a.blockScripts,o=a.cookieName,e(document).ready(function(){e.DivasCookiesCore(a)})},e.DivasCookies.optedIn=function(){return document.cookie.match(new RegExp(o+"=([^;]+)"))||!t},e.DivasCookiesCore=function(t){function o(e,t){var o=new Date;t?o.setTime(o.getTime()+24*parseInt(t)*60*60*1e3):o.setFullYear(o.getFullYear()+1),document.cookie=e+"=yes; expires="+o.toGMTString()+"; path=/"}function i(e){return document.cookie.match(new RegExp(e+"=([^;]+)"))}function c(){document.location.reload()}function a(t,o,i){g||(e("iframe."+t+", img."+t+", input."+t).each(function(){e(this).attr("src",e(this).attr("data-src"))}),e("script."+t).each(function(t){var c=e(this).attr("src");if(e(this).hasClass(i)){e(this).attr("id","dcSndbxdPlain"+t);var a=document.createElement("iframe");a.style.width="0px",a.style.height="0px",a.style.display="none",a.setAttribute("id","dcSndbxd"+t),a.setAttribute("data-jsid","dcSndbxdJS"+t),a.setAttribute("data-jsplain","dcSndbxdPlain"+t),document.body.appendChild(a),a.contentWindow.document.open(),a.contentWindow.document.write(void 0===c?'<script id="dcSndbxdJS"'+t+' type="text/javascript">'+e(this).html()+"</script>":'<script id="dcSndbxdJS"'+t+' type="text/javascript" src="'+c+'"></script>'),a.contentWindow.document.close(),a.onload=function(){e("#"+e(this).attr("data-jsplain")).after(a.contentWindow.document.body.innerHTML),e(this).remove()}}else if(e(this).hasClass(o)){var n,s,r,l,d,f;if(void 0===c){for(n=e(this).html(),s="",r=/(document\.write(\(.+?\)))/im,l=/(document\.writeln(\(.+?\)))/im;n!=s;)s=n,d=n.match(r),f=n.match(l),n=n.replace(r,"divasCookiesOutputBuffer += $2"),n=n.replace(l,"divasCookiesOutputBuffer += $2\n");y="",e(this).after('<script type="text/javascript">'+n+"</script>"),e(this).next().after(y)}else{for(e.ajax({async:!1,dataType:"text",cache:!1,url:c,success:function(e){n=e}}),s="",r=/(document\.write(\(.+?\)))/im,l=/(document\.writeln(\(.+?\)))/im;n!=s;)s=n,d=n.match(r),f=n.match(l),n=n.replace(r,"divasCookiesOutputBuffer += $2"),n=n.replace(l,"divasCookiesOutputBuffer += $2\n");y="",e(this).after('<script type="text/javascript">'+n+"</script>"),e(this).next().after(y)}}else e(this).after(void 0===c?'<script type="text/javascript">'+e(this).html()+"</script>":'<script type="text/javascript" src="'+c+'"></script>')}),g=!0)}function n(){switch(r.saveUserPreferences&&(o(v,r.cookieDuration),r.pageReload&&c()),a(h,m,x),r.closeEffect){case"fade":l.fadeOut(r.closeEffectDuration,r.closeEffectEasing);break;case"slideUp":l.animate({top:"-100%"},r.closeEffectDuration,r.closeEffectEasing,function(){l.hide()});break;case"slideDown":l.animate({bottom:"-100%"},r.closeEffectDuration,r.closeEffectEasing,function(){l.hide()});break;case"slideLeft":l.animate({left:"-100%"},r.closeEffectDuration,r.closeEffectEasing,function(){l.hide()});break;case"slideRight":l.animate({left:"100%"},r.closeEffectDuration,r.closeEffectEasing,function(){l.hide()});break;default:l.hide()}}var s={bannerText:"[Divas Cookies Demo] This website uses cookies.",cookiePolicyLink:"",cookiePolicyLinkText:"[Divas Cookies Demo] Read our cookie policy.",thirdPartyPolicyWidget:"",acceptButtonText:"[Divas Cookies Demo] Ok",acceptButtonSrc:"",declineButtonText:"No cookies, please",declineButtonSrc:"",openEffect:"",openEffectDuration:600,openEffectEasing:"swing",closeEffect:"",closeEffectDuration:600,closeEffectEasing:"swing",debugMode:!1,saveUserPreferences:!0,cookieDuration:365,blockScripts:!1,pageReload:!1,acceptOnScroll:!1,acceptOnClick:!1,cookieName:"DisplayDivasCookiesBanner",excludePolicyPage:!1},r=e.extend({},s,t),l=e(),d=e(),f="",p=e(),u=e(),k=e(),v="DisplayDivasCookiesBanner",h="divascookies-remove",m="divascookies-buffering",x="divascookies-sandboxing",g=!1,y="";if(""!==r.cookieName&&"DisplayDivasCookiesBanner"!==r.cookieName&&(v=r.cookieName),l=e("<div class='divascookies'></div>"),l.data("divascookies",{cookieName:v,activatorClass:h}),r.debugMode===!0&&(""===r.bannerText&&alert("Divas Cookies plugin warning!\nNo text for the banner: please check bannerText value"),""===r.cookiePolicyLink&&alert("Divas Cookies plugin warning!\nNo link to the extended cookie policy: please check cookiePolicyLink value"),""===r.cookiePolicyLinkText&&alert("Divas Cookies plugin warning!\nNo text for extended cookie policy link: please check cookiePolicyLinkText value"),""===r.acceptButtonText&&alert("Divas Cookies plugin warning!\nNo text for accept button: please check acceptButtonText value")),d=e("<div class='divascookies-banner-container'></div>"),f="<span class='divascookies-policy-link'><a href='"+r.cookiePolicyLink+"' >"+r.cookiePolicyLinkText+"</a></span>","iubenda"===r.thirdPartyPolicyWidget&&(f="<span class='divascookies-policy-link'><a href='"+r.cookiePolicyLink+"' class='iubenda-white iubenda-embed'>"+r.cookiePolicyLinkText+"</a></span>"),p=e("<p class='divascookies-banner-text'>"+r.bannerText+" "+f+"</p>"),u=e("<div class='divascookies-accept-button-container'></div>"),k=e(""!==r.acceptButtonSrc?"<img class='divascookies-accept-button-img' src='"+r.acceptButtonSrc+"' alt='"+r.acceptButtonText+"' title='"+r.acceptButtonText+"' />":"<p class='divascookies-accept-button-text'>"+r.acceptButtonText+"</p>"),l.append(d),d.append(p),d.append(u),u.append(k),!r.saveUserPreferences||!i(v))switch(e("body").append(l),r.openEffect){case"fade":l.fadeIn(r.openEffectDuration,r.openEffectEasing);break;case"slideUp":l.css({bottom:"-100%",top:"auto"}).show(function(){l.animate({bottom:0},r.openEffectDuration,r.openEffectEasing)});break;case"slideDown":l.css({top:"-100%",bottom:"auto"}).show(function(){l.animate({top:0},r.openEffectDuration,r.openEffectEasing)});break;case"slideLeft":l.css({left:"-100%",right:"auto"}).show(function(){l.animate({left:0},r.openEffectDuration,r.openEffectEasing)});break;case"slideRight":l.css({left:"100%",right:"auto"}).show(function(){l.animate({left:0},r.openEffectDuration,r.openEffectEasing)});break;default:l.show()}if((!r.blockScripts||i(v))&&a(h,m,x),u.on("click",function(){n()}),r.acceptOnScroll&&!i(v))if(-1!==document.location.href.indexOf(r.cookiePolicyLink)&&r.excludePolicyPage);else{var b=e(window).scrollTop(),E=10;e(window).on("scroll.divascookies",function(){e(window).scrollTop()-b>=E&&(n(),e(window).off("scroll.divascookies"))})}return r.acceptOnClick&&!i(v)&&(-1!==document.location.href.indexOf(r.cookiePolicyLink)&&r.excludePolicyPage||e(document).on("click.divascookies","a",function(){e(this).parent().hasClass("divascookies-policy-link")||(n(),e(document).off("click.divascookies","a"))})),l}}(jQuery);



// currency move
/* $(document).ready(moveElements);
            function moveElements() {
                var firstW = $('#currency div span:first').width();
                var position = $('#currency div').position();
                var moveLeft = (position.left - firstW);
                $('#currency div').animate({ 'left': moveLeft }, 6000, 'linear', function () {
                    var fp = $('#currency div span:first').html();
                    $('#currency div span:first').remove();
                    $('#currency div').css({ 'left': position.left });
                    $('#currency div').append("<span>" + fp + "<\/span>");
                    moveElements();
                });
            } */

//analytics









console&&console.log("\n%c Built for IBAN\n","font-family: monospace;-webkit-font-smoothing:antialiased"),console&&console.log("\n\n                        POWERFUL VALIDATION API BUILT FOR DEVELOPERS\n                                 https://www.iban.com/developers\n\n")