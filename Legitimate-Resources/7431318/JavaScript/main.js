//***********************************************
// genereren dropdown menu
//***********************************************
jQuery(document).ready(function($){

	function custClick(e){
		var elm = $(e.target);
		while(!(elm.is('a') || elm.is('body'))) {
			elm = elm.parent();
		}
		if(!elm.hasClass('hover')) {
			$('#submore .hover').each(function() {
				$(this).removeClass('hover');
			});
			e.preventDefault();
			elm.addClass('hover');
			elm.parent().addClass('hover');
		}
		else if(elm.attr('href')=='#') {
			elm.removeClass('hover');
			elm.parent().removeClass('hover');
			e.preventDefault();
		}
	}

	// Create the dropdown base
	$('<select />').appendTo('.nav-holder');

	// Create default option 'Go to...'
	$('<option />', {
		'selected': 'selected',
		'value'   : '',
		'text'    : 'menu...'
	}).appendTo('.nav-holder select');

	// Populate dropdown with menu items
	$('.nav-holder a').each(function() {
		var el = $(this);

		if($(el).parents('.sub-menu .sub-menu').length >= 1) {
			$('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : '-- ' + el.text()
			}).appendTo('.nav-holder select');
		}
		else if(jQuery(el).parents('.sub-menu').length >= 1) {
			$('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : '- ' + el.text()
			}).appendTo('.nav-holder select');
		}
		else {
			$('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : el.text()
			}).appendTo('.nav-holder select');
		}
	});

	$('.nav-holder select').change(function() {
		window.location = $(this).find('option:selected').val();
	});
	
	// smooth scroll
/*	if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
	window.onmousewheel = document.onmousewheel = wheel;
	
	var time = 500;
	var distance = 400;
	
	function wheel(event) {
		if (event.preventDefault) event.preventDefault();
		event.returnValue = false;
		
		if (event.wheelDelta) delta = event.wheelDelta / 120;
		else if (event.detail) delta = -event.detail / 3;
		handle();
	}
	
	function handle() {
	setTimeout(function() {
		$('html, body').stop().animate({
			scrollTop: $(window).scrollTop() - (distance * delta)
		}, time);
		}, 100 );
	}*/
	var time = 500;
	var distance = 400;
	
	$(document).keydown(function (e) {
		if(e.target.tagName == 'BODY') {
			//console.log(e.which);
			switch (e.which) {
				// up
				case 38:
					if (e.preventDefault) e.preventDefault();
					$('html, body').stop().animate({
						scrollTop: $(window).scrollTop() - distance
					}, time);
					break;
	
					// down
				case 40:
					if (e.preventDefault) e.preventDefault();
					$('html, body').stop().animate({
						scrollTop: $(window).scrollTop() + distance
					}, time);
					break;
			}
		}
	});

	window.onscroll = doThisStuffOnScroll;

	function doThisStuffOnScroll() { //only for wide template
		if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
			//$("#header_container").addClass("header_tiny");
			$("#menu_container").addClass("menu_tiny");
			$("#topNav").addClass("topnav_tiny");
			var padding = $("#menu").height() - $("#menu li a").height();
			//console.log('padding: ' + padding);
			if (padding > 0 ) {
				$(".sub-menu").css("padding-top", padding +'px');
				$("#submore").css("padding-top", padding +'px');
			}
		} else {
			//$("#header_container").removeClass("header_tiny");
			$("#menu_container").removeClass("menu_tiny");
			$("#topNav").removeClass("topnav_tiny");
			$(".sub-menu").css("padding-top", '');
			$("#submore").css("padding-top", '');
		}
	};

	doThisStuffOnScroll();
	
	$('.parallax .bg_video').each(function(nr, elm){
		$(window).resize(function(){
			var e = $(elm);
			var p = e.parent();
			videoResize(p, e)
		});		
		videoResize($(elm).parent(), $(elm));
	});

	function videoResize(p, e){

		if((p.width()/p.height()) > (16/9)) {
				var h = p.width()*9 / 16
				e.height(h);
				e.width(p.width());
				e.css('left', '0px');
				e.css('top', '-' + ((h - p.height()) / 2) + 'px');
			}
			else {

				var w = p.height()*16 /9
				e.width(w);
				e.height(p.height());
				e.css('left', '-' + ((w - p.width()) / 2) + 'px');
				e.css('top', '0px');
			}

	}
	var logoW=0,langW=0,menuW=0;
	$('#topNav > *').each(function(){//console.log($(this));
		if($(this).attr('id') == 'language_container') {
			if (typeof(sessionStorage) !== "undefined" && sessionStorage.getItem("language_container") > 0) {
				//console.log('sessionStorage.get'+sessionStorage.getItem("language_container"));

				langW = sessionStorage.getItem("language_container");
			}
			else {
				langW = $(this).outerWidth(true);
			}
		}
		else if($(this).attr('id') == 'logo_site') {
			logoW =$('#logo_site').outerWidth(true) + 2;
			if(logoW<250){
             	logoW = 250;
            }
			$('#logo_site img').on('load', function() { logoW = $('#logo_site').outerWidth(true) + 2; calcMenu(); });
		}
		else if($(this).attr('id') == 'menu') {
			menuW = $(this).outerWidth(true) - $(this).width();
			//console.log('menuW:'+menuW);
		}
	})

	$('#menu').append('<li id=\'submore_container\'><a href=\'#\'>' + g_more + '<b  class="caret"></b></a><ul id=\'submore\'></ul></li>');
	var moreW = $('#submore_container').outerWidth(true);
	$('#submore_container').remove();
	//alert(moreW);
	
	var menuItems=[];
	$('#menu').children().each(function(){
		menuItems.push([$(this), $(this).outerWidth(true)]);
		//console.log($(this).outerWidth(true));
	//console.log('w'+$(this).outerWidth(true));
	});
	var subMenuItems=[];
	$('#sidebarmenu').children().each(function(){
		subMenuItems.push([$(this).clone(), $(this).outerWidth(true)]);
	});

	var tSH;
	$(window).resize(function(){
		if(!$('#submore_container').hasClass('hover')){
			calcMenu();
		}
	});
	$(window).load(function(){
		if($('#topNav #language_container').length > 0){
			langW = $('#topNav #language_container').outerWidth(true);
		}
		if (typeof(sessionStorage) !== "undefined") {
			//console.log('sessionStorage.set'+langW);
			sessionStorage.setItem("language_container", langW);
		}
		calcMenu();
	});
	calcMenu();
//	setTimeout(function(){
//		calcMenu();
//	},3000);
   
	var addCustClick=false;
	var ua = navigator.userAgent.toLowerCase(); 
    //alert(ua);
	//iOS already transforms hovers to dubble clicks.
	if(ua.indexOf("android") > -1 || ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1){//window.matchMedia("only screen and (max-width: 600px)").matches) {
		$('#menu li a').each( function() {
			if($(this).parent().attr('aria-haspopup')){
				$(this).on('click', custClick);
			}
		});
		addCustClick=true;
	}

	function calcMenu() {//console.log($('#menu').parent().width());
//	console.log($('#logo_site').outerWidth(true));
//	console.log("l"+logoW+" lang:"+langW + " m:" + $('#menu').parent().width());
//		console.log('#topNav'+$('#topNav').width());
//		console.log('#topNav'+$('#topNav').outerWidth(true));
//		console.log('#logoW'+logoW);
//		console.log('#logoW'+($('#logo_site').outerWidth(true) + 2));
//		console.log('#langW'+langW);
//		console.log('#langW'+$('#language_container').outerWidth(true));
//		console.log('#menuW'+menuW);
//		console.log('#menuW'+($('#menu').outerWidth(true) - $('#menu').width()));
//		console.log('#menuW'+($('#menu').width()));
//		console.log('#menuW'+($('#menu').outerWidth(true)));
//		$('#menu').children().each(function(){
			//menuItems.push([$(this), $(this).outerWidth(true)]);
			//console.log($(this).outerWidth(true));
		//console.log('w'+$(this).outerWidth(true));
//		});
		var menuWidth = $('#topNav').width() - logoW - langW - menuW;
		//console.log('menuWidth:' + menuWidth);
		var showHam=true;
		var moveElms = [];
		var calcWidth = 0
		var windowWidth = $( window ).width();
		var current = '';
		$('#menu_container').removeClass('hamburger');
		$(menuItems).each(function(){
			if($(this[0]).parent().attr('id') == 'menu') {//only update width when in top menu.
				this[1] = $(this[0]).outerWidth(true);
			}
			$(this[0]).detach();
		});
		for(i=0;i<menuItems.length;i++){
			//if()
			calcWidth += menuItems[i][1];
			
			if(windowWidth > 768 && ( menuWidth > (calcWidth + moreW) || menuItems.length - 1 == i && menuWidth > calcWidth)) {
//				console.log('m')
				$('#menu').append($(menuItems[i][0]));
				showHam=false;
			}
			else {
				if($(menuItems[i][0]).attr('id') == 'current'){
					current = " class='current' ";
				}
				moveElms.push($(menuItems[i][0]));
			}
		}

		var submore_container = $('#submore_container');
		if(submore_container.length > 0) {
			submore_container.remove();
		}
		if(moveElms.length > 0 || (subMenuItems.length >0 && $( window ).width() <= 768)) {
			if(showHam) {
				$('#menu').append('<li role="none" id=\'submore_container\' class=\'hamburger\'><a href=\'#\' role=\'button\' aria-label=\'Menu button\' aria-haspopup=\'true\' aria-controls="submore"><div id=\'hamburger\'><div></div><div></div><div></div></div></a><ul id=\'submore\' class=\'hamburger\'></ul> </li>');
				$('#menu_container').addClass('hamburger');
			}
			else {
				$('#menu').append('<li id=\'submore_container\''+current+'><a href=\'#\' aria-haspopup=\'true\' aria-expanded=\'false\'>' + g_more + '<b  class="caret"></b></a><ul id=\'submore\'></ul></li>');
			}
			if(addCustClick){
				$('#submore_container > a').on("click", custClick);
			}
			if(moveElms.length > 0) {
				$(moveElms).each(function(index, elm){
					$('#submore').append(elm);
				});
			}
			if(subMenuItems.length >0 && windowWidth <= 768) {
				$(subMenuItems).each(function(){
					$('#submore').append($(this[0]));
				});
			}
			if(!tSH) {
				tSH = setTimeout(function(){
					if($( window ).width() <= 768)
						$('#submenu_container').hide();
					else 
						$('#submenu_container').show();
					tSH=null;
				}, 500);
			}
		}
		$('#menu').css({'visibility':'visible','overflow':'visible'});

	}

	setTimeout(function(){
	    $.ajax({
	        'type': 'GET',
	        'url': '/home/processor_ajax.php?level=hits',
	        'success': function(response) {
	            $('#site_hits').html(response);
	        }
	    });
	}, 3000);

/*$(document).on('click', function (evt) {
	
	var target = $(evt.target);
	console.log(target +"click" +  target.parents('#menu').length);
	if ( target.parents('#menu').length == 0 ) {
		$('#submenu_container').hide();
		console.log('if'); 
	}
	
});*/
if($( 'a.tooltips' ).length>0) {
	$( 'a.tooltips' ).tooltip({
	  position: {
		my: "center bottom-20",
		at: "center top",
		using: function( position, feedback ) {
		  $( this ).css( position );
		  $( "<div>" )
			.addClass( "arrow" )
			.addClass( feedback.vertical )
			.addClass( feedback.horizontal )
			.appendTo( this );
		}
	  }
	});
}
//	     console.log($( "a.tooltips" ));
//	     $( "a.tooltips" ).tooltip( "open" );
/*	
$.fn.isFullyInViewport = function() {
	
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
console.log('vp: '+ viewportBottom);
console.log('el: ' +elementBottom);
  return elementTop > viewportTop && elementBottom <= viewportBottom+1;
};

function CheckFooter(){
	if ($('#footer_container').isFullyInViewport()) {
      $('#footer_container').addClass('footerfixed');
    } else {
      $('#footer_container').removeClass('footerfixed');
    }
	if ($('#footer_container_main').isFullyInViewport()) {
      $('#footer_container_main').addClass('footerfixed');
    } else {
      $('#footer_container_main').removeClass('footerfixed');
    }
}
 CheckFooter();
$(window).on('resize scroll', function() {
    CheckFooter();
});
	*/
//submenu div= #submenu_container, ul = #sidebarmenu

	$(document).on('click', '.backlink', function() {
	    window.history.back();
	});
	function vh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}
	function isElementInViewport (el) {

		horizontal = !el.hasClass('move_u');
		height = jQuery(el).height();
		// Special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}
		var rect = el.getBoundingClientRect();
//		if(!horizontal && jQuery(el).hasClass('animate_t_211')) {
//			console.log(window.innerHeight);
//			//console.log(window.scrollY + (window.innerHeight/2))
//			console.log(rect.top - window.innerHeight)
//			console.log(el, el.getBoundingClientRect().top)
//			jQuery('#tester').css('top', window.scrollY + rect.top - height -40);
//		}
		var moved = 0;
		if(!horizontal){
			moved = window.getComputedStyle(el).transform.replace('matrix(', '').replace(')', '').split(',');
			if(moved.length === 6){
				moved = parseInt(moved[5]);
			}
			else {
				moved = vh(50);
			}
			//console.log(el, moved)
		}
		return (
			//(!horizontal || rect.top >= -50) 
			//&& 
			(!horizontal || (rect.top) <= (window.innerHeight || document.documentElement.clientHeight))
			&& (horizontal || (rect.top - moved) <= (window.innerHeight || document.documentElement.clientHeight))
			//&& (horizontal || rect.top - window.innerHeight >= 0)
		);
	}

	function onVisibilityChange(el, callback) {
		return function (first) {//alert(first?'true':'false');

			el.each(function(pos, elm){
				$elm = jQuery(elm);
				//console.log(first?'true':'false');
				if(!first || $elm.find('.page_img').length===0) {
				if(!$elm.hasClass('running')){
					var visible = isElementInViewport($elm);
					if (visible) {
						if (typeof callback == 'function') {//console.log('running');
							callback($elm);
						}
					}
				}
				}
			});
		}
	}

	var handler = onVisibilityChange(jQuery('.reveal'), function($el) {
		/* Your code go here */
		//console.log(el);
		$el.css('animation-play-state', 'running');
		$el.addClass('running');
	});
	// jQuery
	$(window).on('resize.px.parallax resize scroll', function(){handler(false)});
	handler(true);//only activate non img animations, img are activated via lazyload.

	var uspNumbersExist=$('.animation-number');
	//console.log(uspNumbersExist);
	if(uspNumbersExist!==''){
		var numberEl=$('.animation-number');
		$(numberEl).each(function(index){
			var $this = $(this);
			$(window).scroll(function(event){
				startCounter($this);
			});
			startCounter($(this));
		});
	}
	function startCounter($this, index){
		
		//console.log($this);console.log('d');console.log(isScrolledIntoView($this));
		if(isScrolledIntoView($this)&&!$this.hasClass('effect-initiated')&&!$this.parents('.effect-off').length){
			$this.addClass('effect-initiated');
			var singleNum=$this.text();
			//console.log(singleNum);
			var countNum='';
			var allLetters=$this.text();
			//checkFontStyle($this);
			allLetters=allLetters.replace(/[0-9]*/g,'');
			allLetters=allLetters.replace(/,/g,'.');
			allLetters=allLetters.replace(/\./g,'');
			var onlyLetters=false;
			countNum=singleNum.replace(/\./g,'');
			countNum=countNum.replace(/,/g,'.');
			var trueNum=parseFloat(countNum.replace(/[^\d\.]*/g,''));
			var regex=/^[a-zA-Z\s]+$/;
			if((regex.test(allLetters))&&(isNaN(trueNum))){
				onlyLetters=true;
			}
			if(!isNaN(trueNum)&&trueNum!=''&&!onlyLetters){
				var currentEl=$this;var startNum=trueNum/100;startNum=Math.round(startNum);
				$({countNum:startNum}).animate({
					countNum:trueNum
				},
				{
					duration:1500,easing:'swing',
					step:function(){
						$(currentEl).text((this.countNum.toFixed(0))+' '+allLetters);
					},
					complete:function(){
						$(currentEl).text(singleNum);
					},
				})
			}
		}
	}
	function isScrolledIntoView(elem){
		var $elem=$(elem);
		var $window=$(window);
		var docViewTop=$window.scrollTop();
		var docViewBottom=docViewTop+$window.height();
		var elemTop=$elem.offset().top;
		return(elemTop<=(docViewBottom-60));
	}
});

function closeCookie(event) {
	
	event.stopPropagation();
    // Set/update cookie
    cookieExpiry = 365;
    cookiePath = "/";
    createCookie('seen-cookie-message','yes',cookieExpiry,cookiePath);
    
    var wrapper = document.getElementById('cookie_warning')
    wrapper.style.display = 'none';
}
function createCookie(name,value,days,path) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*3600000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path="+path;
}
if(document.cookie.indexOf('seen-cookie-message') === -1){
	window.addEventListener('DOMContentLoaded', function(event) {
	    var cookieMessage = document.getElementsByTagName('body')[0];
	    if (cookieMessage == null || typeof cookie_warning === 'undefined'
	    	|| typeof cookie_button === 'undefined') {
	        return;
	    }
	   	var div = document.createElement("div");
	   	div.id = 'cookie_warning';
	   	div.innerHTML = '<center>' + cookie_warning + ' ' + cookie_button + '</center><div class="cw_close"><span style="cursor:pointer;font-weight:bold;" class="cookiebtn">X</a></div>';
	   	cookieMessage.appendChild(div);
	   	
	   	elements = document.querySelectorAll(".cookiebtn");
	   	for(i=0 ; i < elements.length ; i++){
	
		  	elements[i].addEventListener("click", closeCookie, false);
		}
	});
}
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-flexbox-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function s(e){var n=x.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?x.className.baseVal=n:x.className=n)}function i(e,n){return!!~(""+e).indexOf(n)}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?f(o,t||n):o);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(){var e=n.body;return e||(e=a(_?"svg":"body"),e.fake=!0),e}function c(e,t,r,o){var s,i,l,f,u="modernizr",d=a("div"),c=p();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:u+(r+1),d.appendChild(l);return s=a("style"),s.type="text/css",s.id="s"+u,(c.fake?c:d).appendChild(s),c.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=x.style.overflow,x.style.overflow="hidden",x.appendChild(c)),i=t(d,e),c.fake?(c.parentNode.removeChild(c),x.style.overflow=f,x.offsetHeight):d.parentNode.removeChild(d),!!i}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+d(n[o])+":"+r+")");return s=s.join(" or "),c("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function h(e,n,o,s){function f(){d&&(delete z.style,delete z.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=m(e,o);if(!r(u,"undefined"))return u}for(var d,p,c,h,v,y=["modernizr","tspan"];!z.style;)d=!0,z.modElem=a(y.shift()),z.style=z.modElem.style;for(c=e.length,p=0;c>p;p++)if(h=e[p],v=z.style[h],i(h,"-")&&(h=l(h)),z.style[h]!==t){if(s||r(o,"undefined"))return f(),"pfx"==n?h:!0;try{z.style[h]=o}catch(g){}if(z.style[h]!=v)return f(),"pfx"==n?h:!0}return f(),!1}function v(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+b.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?h(a,n,o,s):(a=(e+" "+E.join(i+" ")+i).split(" "),u(a,n,t))}function y(e,n,r){return v(e,t,t,n,r)}var g=[],C=[],w={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var x=n.documentElement,_="svg"===x.nodeName.toLowerCase(),S="Moz O ms Webkit",b=w._config.usePrefixes?S.split(" "):[];w._cssomPrefixes=b;var E=w._config.usePrefixes?S.toLowerCase().split(" "):[];w._domPrefixes=E;var P={elem:a("modernizr")};Modernizr._q.push(function(){delete P.elem});var z={style:P.elem.style};Modernizr._q.unshift(function(){delete z.style}),w.testAllProps=v,w.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),o(),s(g),delete w.addTest,delete w.addAsyncTest;for(var N=0;N<Modernizr._q.length;N++)Modernizr._q[N]();e.Modernizr=Modernizr}(window,document);