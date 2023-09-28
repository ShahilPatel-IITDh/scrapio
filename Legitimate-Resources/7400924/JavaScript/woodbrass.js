;(function( $, window, document, undefined ) {

	function SliderWB( element, options ) {
		this.el      = element;
		this.$el     = $( element );
		this.options = $.extend( {}, $.fn.sliderWB.defaults, options );

		return this.init();
	}

	SliderWB.prototype = {

		init: function() {
			var self = this;

			if ( $( ".slider-wrapper > *", self.el ).length < self.options.nbItemVisible && self.options.emptyBox ) {

				var nbBoxes = self.options.nbItemVisible - $( ".slider-wrapper > *", self.el ).length;

				classBg = self.$el.hasClass( "slider-reviews" ) ? "bgGrisF" : "bgGrisC";

				for (var i = 0; i < nbBoxes; i++ ) {
					var boxe = $( '<div/>', { class: "p5 pos-rel flex active" }).append( $( '<div/>', { class: "slider-boxes " + classBg + " box-empty" }) );

					$( ".slider-wrapper", self.el ).append( boxe );
				}
			} 

			self.nbItems();
			$( window ).on( "resize", function() { self.nbItems(); })

			if ( !!self.options.animation ) { $( ".slider-wrapper", self.el ).addClass( self.options.animation ); }

			// $( ".slider-wrapper > *", self.el ).css({ "flex": "0 0 " + ( 100 / self.options.nbItemVisible ) + "%", "width": ( 100 / self.options.nbItemVisible ) + "%" })

			
			self.play();

			if ( self.options.nbItemVisible < $( ".slider-wrapper > *", self.el ).length ) {
				$( ".slider-left", self.el ).on( "click", function() { self.prev(); });
				$( ".slider-right", self.el ).on( "click", function() { self.next(); });

				if ( self.options.autoPlay ) { self.autoplay(); }
			} else {
				$( ".slider-left, .slider-right", self.el  ).css({ "visibility": "hidden" });
			}

			$( "img.lazy", self.el ).show().lazyload({ event: "play" });

			if ( self.options.mini ) {
				$( ".vignette", self.el ).on( "click", function () {
					self.options.index = $( this ).index() - 1;
					self.next();
				})
			}

		},

		nbItems: function() {
			var self = this;

			if ( self.options.resizable ) {
				previousNbItems = self.options.nbItemVisible;

				if ( window.matchMedia( "(max-device-width: 61.63rem)" ).matches ) {
					self.options.nbItemVisible = 2;
					self.options.pas = 2;

				}

				if ( window.matchMedia( "(min-device-width: 61.63rem)" ).matches ) {
					self.options.nbItemVisible = 5;
					self.options.pas = 5;

				}
			}
					
			$( ".slider-wrapper > *", self.el ).css({ "flex": "0 0 " + ( 100 / self.options.nbItemVisible ) + "%", "width": ( 100 / self.options.nbItemVisible ) + "%" })

			if ( self.options.nbItemVisible < $( ".slider-wrapper > *", self.el ).length ) {
				$( ".slider-left, .slider-right", self.el  ).css({ "visibility": "visible" });
			} else {
				$( ".slider-left, .slider-right", self.el  ).css({ "visibility": "hidden" });
			}

		},

		prev: function() {
			var self = this;

			self.options.index -= self.options.pas;

			if ( self.options.index < 0 ) { 
				self.options.index = self.options.infinite ? $( ".slider-wrapper > *", self.el ).length - self.options.nbItemVisible : 0;
			}

			self.play();

			if ( self.options.autoPlay ) { self.autoplay(); }
		},

		next: function() {
			var self = this;

			self.options.index += self.options.pas;

			if ( self.options.index + self.options.nbItemVisible > $( ".slider-wrapper > *", self.el ).length ) { 
				self.options.index = self.options.infinite ? 0 : $( ".slider-wrapper > *", self.el ).length - self.options.nbItemVisible;
			}

			self.play();

			if ( self.options.autoPlay ) { self.autoplay(); }
		},

		play: function() {
			var self = this;

			$( ".slider-wrapper > *:eq(" + self.options.index + ")", self.el ).addClass( "active" ).siblings().removeClass( "active" );
			if ( self.options.mini ) $( ".vignette:eq(" + self.options.index + ")" ).addClass( "active" ).siblings().removeClass( "active" );
			$( ".slider-wrapper", self.el ).css({ marginLeft: ( 100 * self.options.index * -1 / self.options.nbItemVisible  ) + "%", marginRight: ( 100 * self.options.index / self.options.nbItemVisible ) + "%" });

			$( "img.lazy" ).trigger( "play" );
		},

		autoplay: function() {
			var self = this;

			clearTimeout( self.options.timer );
			self.options.timer = setTimeout( function() { self.next(); }, self.options.delay );
		},

		destroy: function() {
			this.$el.removeData();
		}
	};

	$.fn.sliderWB = function( options ) {
		return this.each(function() {
			if ( !$.data( this, 'sliderWB' ) ) { $.data( this, 'sliderWB' , new SliderWB( this, options ) ); }
		});
	};

	$.fn.sliderWB.defaults = {
		index: 0,
		nbItemVisible: 1,
		mini: false,
		autoPlay: false,
		timer: false,
		animation: "slide",
		delay: 5000,
		pas: 1,
		emptyBox : true,
		infinite : false,
		resizable: false,
	};

})( jQuery, window, document );

;(function( $, window, document, undefined ) {
	function CustomPackWB( element, options ) {
		this.el      = element;
		this.$el     = $( element );
		this.options = $.extend( {}, $.fn.customPackWB.defaults, options );

		return this.init();
	}

	CustomPackWB.prototype = {

		init: function() {
			var self = this;

			self.id = $( ".custom-pack" ).data( "id" );

			self.listacc = [];

			$.each( $( ".custom-pack-boxes.active" ), function( key, item ) { self.toggle( item ); })

			price       = parseFloat( $( ".total-price" ).data( 'price' ) );
			publicPrice = parseFloat( $( ".total-public-price" ).data( 'public-price' ) );
			economie    = 0;

			if ( publicPrice > price ) { $( ".cpPublicPrice" ).show(); }

			$( ".custom-pack-boxes", self.el ).on( 'click', function() { self.toggle( this ); });
			$( document ).on( 'click', '.list-prod-custom-pack .btn-moins', function() { self.moins( this ); });
			$( document ).on( 'click', '.list-prod-custom-pack .btn-plus', function() { self.plus( this ); });
		},

		toggle: function( boxe ) {
			var self = this;

			if ( self.listacc.indexOf( boxe ) > -1 ) { self.listacc.splice( self.listacc.indexOf( boxe ), 1 ); }
			else { self.listacc.push( boxe ); }

			$.each( self.listacc, function( key, product ) { product.qty = $( product ).data( "qty" ); });

			$( boxe ).toggleClass( 'selected' );

			var prodFixePrice = $( ".custom-pack-boxes.selected[data-reduc^='-']" ).not( "[data-reduc='-0.0001']" );

			if ( prodFixePrice.length > 1 ) { prodFixePrice.not( boxe ).trigger( "click" ); }

			if ( $( ".custom-pack-boxes.selected[data-reduc='-0.0001']" ).length > 1 ) {
				$( ".custom-pack-boxes.selected[data-reduc='-0.0001']" ).not( boxe, prodFixePrice ).trigger( "click" );
			}

			self.update();
		},

		moins: function( item ) {
			var self = this;

			index = $( item ).closest( '.list-prod-custom-pack .row' ).index( '.list-prod-custom-pack .row' );
			self.listacc[index].qty--;

			if ( self.listacc[index].qty <= 0 ) { self.toggle( self.listacc[index] ); }
			else { $( "span", $( item ).closest( 'div' ).siblings( '.qty' ) ).html( self.listacc[index].qty ); }

			self.update();
		},

		plus: function( item ) {
			var self = this;

			index = $( item ).closest( '.list-prod-custom-pack .row' ).index( '.list-prod-custom-pack .row' );
			self.listacc[index].qty++;

			$( "span", $( item ).closest( 'div' ).siblings( '.qty' ) ).html( self.listacc[index].qty );

			self.update();
		},

		update: function() {
			var self = this;

			$( ".list-prod-custom-pack" ).empty();

			price       = parseFloat( $( ".total-price-value" ).data( 'total' ) );
			publicPrice = parseFloat( $( ".price" ).data( 'price' ) );
			economie    = 0;

			$.each( self.listacc, function( key, product ){
				produit = {
					name: $( product ).data( 'name' ),
					qty: product.qty,
					id: $( product ).data( 'id' ),
					prodPrice: parseFloat($(product).data('reduc')) <= -1 ? Math.abs(parseFloat($(product).data('reduc'))) : (parseFloat($(product).data('price')) * (1 - parseFloat($(product).data('reduc')))).toFixed(2),
					mdPrice: $( product ).data( "mdprice" ),
					mdValue: $( product ).data( "mdvalue" ),
					link: $( product ).data( "link" )
				};

				var freeProd = parseFloat( $( product ).data( 'reduc' ) ) < 0;

				$( ".list-prod-custom-pack" ).append( self.template( produit, !freeProd ) );

				if ( Math.abs( parseFloat( $( product ).data( 'reduc' ) ) ) != 0.0001 ) {
					// handle the price of main product for the custom pack
					// DEV-3323 : made a round after reduction calculate
					publicPrice += parseFloat($(product).data('reduc')) < 0 ? (parseFloat($(product).data('reduc')) <= -1 ? Math.abs(parseFloat($(product).data('reduc'))) : parseFloat($(product).data('price'))) : (parseFloat($(product).data('price')) * (1 - parseFloat($(product).data('reduc')))).toFixed(2) * produit.qty;
				}
				price += parseFloat( $( product ).data( 'reduc' ) ) < 0 || Math.abs( parseFloat( $( product ).data( 'reduc' ) ) ) === 0.0001 ? (parseFloat($(product).data('public-price')) === 0 ? parseFloat($(product).data('price')).toFixed(2) : parseFloat($(product).data('public-price')).toFixed(2)) : parseFloat($(product).data('price')).toFixed(2) * produit.qty;
				// DEV-3323 : made a round after reduction calculate
				economie += parseFloat($(product).data('reduc')) < 0 ? (parseFloat($(product).data('public-price')) !== 0 ? parseFloat($(product).data('public-price')).toFixed(2) - produit.prodPrice : parseFloat($(product).data('price')).toFixed(2) - produit.prodPrice) : (parseFloat($(product).data('price')) * produit.qty) - ((parseFloat($(product).data('price')) * (1 - parseFloat($(product).data('reduc')))).toFixed(2) * produit.qty);
			});

			$( ".price" ).html( price.toFixed( 2 ) + "€" );
			$( ".total-price-value" ).html( publicPrice.toFixed( 2 ) + "€" );
			$( ".economie-value" ).html( economie.toFixed( 2 ) + "€" );

			if ( self.listacc.length ) { 
				$( ".recap .prod-name ~ div, *[class*=economie], .total-price" ).show();
				$( ".price" ).css({ transition: "none" }).removeClass( "fwb fs26" ).addClass( "strike" );
			} else { 
				$( ".recap .prod-name ~ div, *[class*=economie], .total-price" ).hide();
				$( ".price" ).css({ transition: "none" }).addClass( "fwb fs26" ).removeClass( "strike" );
			}
		},

		template: function( produit, showBtn ) {
			var self = this;

			self.tpl = $( "#list-prod-custom-pack-tpl" ).html();

			if ( !showBtn ) self.tpl = self.tpl.replace( '<span class="btn-plus bgNoir clrBlanc in-block tac">+</span>', "" );
			if ( !showBtn ) self.tpl = self.tpl.replace( '<span class="btn-moins bgNoir clrBlanc in-block tac">-</span>', "" );
			self.tpl = self.tpl.replace( /{{ name }}/g, produit.name );
			self.tpl = self.tpl.replace( /{{ qty }}/g, produit.qty );
			self.tpl = self.tpl.replace( /{{ prodId }}/g, produit.id );
			self.tpl = self.tpl.replace( /{{ prodPrice }}/g, produit.prodPrice );
			self.tpl = self.tpl.replace( /{{ mdPrice }}/g, produit.mdPrice );
			self.tpl = self.tpl.replace( /{{ mdValue }}/g, produit.mdValue );
			self.tpl = self.tpl.replace( /{{ link }}/g, produit.link );

			return self.tpl;
		},

		destroy: function() {
			this.$el.removeData();
		}
	};

	$.fn.customPackWB = function( options ) {
		return this.each(function() {
			if ( !$.data( this, 'customPackWB' ) ) { $.data( this, 'customPackWB' , new CustomPackWB( this, options ) ); }
		});
	};

	$.fn.customPackWB.defaults = {};

})( jQuery, window, document );

;(function( $, window, document, undefined ) {
	function ZoomWB( element, options ) {
		this.el      = element;
		this.$el     = $( element );
		this.options = $.extend( {}, $.fn.zoomWB.defaults, options );

		return this.init();
	}

	ZoomWB.prototype = {
		init: function() {
			var self = this;
			var img = self.$el.hasClass( "zoom" ) ? $( "img", self.el ) : $( "img", self.$el.closest( "div.zoom" ) );
			$( self.el ).on( 'click', function() { self.display( img ); });


		},

		display: function( img ) {
			$("html").css("min-height", (window.innerHeight +4 )+"px")
			var self = this;
			item = { };
			item.img = img.attr( "src" ).replace( /\/SQUARE400|\/MINI/, "" );

			$( document ).on( "click", "#zoom .close_ev", function() { self.close(); });			
			$( "body" ).append( $( self.template( item ) ).css({ "display": "block" }) );


			function nextImg (){				
				if(window.matchMedia("(max-device-width: 64rem)").matches){
					if($(".swiper-slide.zone-zoom.swiper-slide-active img").hasClass('zoomed')){
						ze_zoom();
					}
					swiperProd.slideNext();
				}else{
					if($( ".zone-mini img.active" ).parent().next().find("img").length > 0)self.update($( ".zone-mini img.active" ).parent().next().find("img"));			
				}
				
			}
			function prevImg(){
				if(window.matchMedia("(max-device-width: 64rem)").matches){
					if($(".swiper-slide.zone-zoom.swiper-slide-active img").hasClass('zoomed')){
						ze_zoom();
					}
					swiperProd.slidePrev();
				}else{					
					if($( ".zone-mini img.active" ).parent().prev().find("img").length > 0)self.update($( ".zone-mini img.active" ).parent().prev().find("img"));
				}
			}

			function ze_zoom(){
				if(window.matchMedia("(max-device-width: 64rem)").matches){
					$( ".zone-zoom.swiper-slide-active img" ).toggleClass('zoomed');
					if( $( ".zone-zoom.swiper-slide-active img" ).hasClass('zoomed') ){
						$(".swiper-slide.zone-zoom.swiper-slide-active img.zoomed").on("touchstart", function(ev){
							ev.stopPropagation();
						})
						swiperProd.lockSwipes();
					}else{
						$(".swiper-slide.zone-zoom.swiper-slide-active img").off("touchstart")						
						swiperProd.unlockSwipes();	
					} 

				}
				else $( ".zone-zoom img" ).toggleClass('zoomed');

				if($(".zoomed").get(0)){
					$(".zoomed").get(0).style.left = 0;
					$(".zoomed").get(0).style.top = 0;

					var width_cale = 0;
					var height_cale = 0;
					if($(".zoomed").get(0).getBoundingClientRect().width < $(".zoomed").parent().get(0).getBoundingClientRect().width){
						width_cale = ( $(".zoomed").parent().get(0).getBoundingClientRect().width - $(".zoomed").get(0).getBoundingClientRect().width ) /2 ;
					}

					if($(".zoomed").get(0).getBoundingClientRect().height < $(".zoomed").parent().get(0).getBoundingClientRect().height){
						height_cale = ( $(".zoomed").parent().get(0).getBoundingClientRect().height - $(".zoomed").get(0).getBoundingClientRect().height ) /2 ;
					}

					$(".zoomed").get(0).style.left = ( Math.abs( $(".zoomed").get(0).getBoundingClientRect().left  ) + width_cale ) +"px";
					$(".zoomed").get(0).style.top = ( Math.abs( $(".zoomed").get(0).getBoundingClientRect().top  ) + height_cale ) +"px";
					$(".zone-zoom").scrollTop($(".zoomed").height()/2);
					$(".zone-zoom").scrollLeft($(".zoomed").width()/2);
				}				
			}
			
			var zoom_enable = true;
			if (window.matchMedia("(max-device-width: 64rem)").matches) {
				$( ".zone-zoom img" ).css({ "max-height" : ( $( "#zoom" ).innerHeight() - 40 ) + "px" });
				setTimeout(function(){
					$("#zoom .zone-zoom .pupop-info").addClass('hidden');
				}, 2000);
				var touchtime = 0;
				$( ".zone-zoom img" ).on("click touchend", function(ev) {					
					ev.preventDefault();
					if(!zoom_enable) return;
					var delta = ( new Date().getTime() )  - touchtime ;
					if (touchtime == 0) {
						touchtime = new Date().getTime();
					} else {
						if (delta < 400) {
							ze_zoom();
							touchtime = 0;
						} else {
							touchtime = new Date().getTime();
						}
					}
				});
			}else{
				$( "#zoom #pan_zoom" ).css({"left" : "0px"})
				$( ".zone-zoom img" ).css({ "max-height" : "calc(100vh - 185px )" });
			}
			$("#Woodbrass, #backToTop").hide();

			if(window.matchMedia("(max-device-width: 64rem)").matches){
				var swiperProd = create_swiper(".swiperProd-popup",{
					on: {
						transitionStart : function(swiper){
							zoom_enable = false;
							$(".zone-mini img").removeClass('active');
							$($(".zone-mini img").get(swiper.activeIndex)).addClass('active');
						},
						transitionEnd : function(swiper){
							zoom_enable = true;
						},
					}
				});
				$( document ).off( "mouseover", ".zone-mini img");
				$( document ).on( "mouseover", ".zone-mini img", function() { 
					if($(".swiper-slide.zone-zoom.swiper-slide-active img").hasClass('zoomed')){
						ze_zoom();
					}
					swiperProd.slideTo($(this).parent().index() ) ;
				});	
				if(!img.parent().hasClass('imgPrinc')) swiperProd.slideTo(img.parent().index());
			}else{
				$( document ).on( "mouseover", ".zone-mini img", function() { self.update( this ); });	
			}

			$( document ).on( "keyup", function( e ) { if ( e.keyCode == 27 ) { self.close(); } });
			$("#zoom").click(function(ev){
				if(event.target == event.currentTarget)self.close();
			});
			$(".zone-mini img").one("load", function(el) {
				if(el.currentTarget.src == img.attr( "src" ).replace( /\/MINI/, "/SQUARE400" )){
					$(el.currentTarget).addClass('active');
				}else{
					$(el.currentTarget).removeClass('active');
					if(!$('.zone-mini span img').hasClass('active')){
						$('.zone-mini span img').eq(0).addClass('active');
					};
				}
			})
			$( "#pan_zoom .btnPrev" ).click( prevImg );
			$( "#pan_zoom .btnNext" ).click( nextImg );
		},

		update: function( item ) {
			$( ".zone-zoom img" ).removeClass('zoomed').attr( "src", $( item ).attr( "src" ).replace( /\/SQUARE400|\/MINI/, "" ) );
			$( ".zone-mini img" ).removeClass('active');
			$( item ).addClass('active');
		},

		close: function() {
			$("#Woodbrass, #backToTop").show();
			$( "#zoom" ).remove();
		},

		template: function( item ) {
			var self = this;
			self.tpl = $( "#zoom2-tpl" ).html(); /* DEV-1957 */
			self.tpl = self.tpl.replace( /{{ linkImg }}/g, item.img );

			return self.tpl;
		},

		destroy: function() {
			this.$el.removeData();
		}
	};

	$.fn.zoomWB = function( options ) {
		return this.each(function() {
			if ( !$.data( this, 'zoomWB' ) ) { $.data( this, 'zoomWB' , new ZoomWB( this, options ) ); }
		});
	};

	$.fn.zoomWB.defaults = {};

})( jQuery, window, document );

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}
/**** Side tooltip + scroll ****/
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
var x_y = { x : 0, y : 0 };
function preventDefault(e) {

	var good = false;
	var path = null;
	if(e.path && e.path.length > 1 ){
		path = e.path;
	}else{
		elem = e.target;
		path = Array();
		while(elem.offsetParent){
			path.push(elem.offsetParent);
			elem = elem.offsetParent;
		}
	}
	// $.each(e.path, function(index, el){
	path.forEach(function(el){
		if($(el).hasClass('openMenu')) good = '.openMenu nav';
		if($(el).hasClass('sticky-filter')) good = '.sticky-filter .filter-box ul';
		if($(el).hasClass('tooltip-info')) good = '.tooltip-info';
	});

	if(!good){
		// console.log(e, e.path.length,  e.path, path);
	}
	if($(e.target).hasClass('tooltip-info') || good != false) {		
		if(good != false ){
			t = $(good);
		}else{			
			t = $(e.target);
		}
		if( typeof e.touches !== "undefined" || typeof e.changedTouches !== "undefined")
		var touch = e.touches[0] ||
            e.changedTouches[0];
		if(e.type == "touchmove" && typeof touch !== "undefined"){
			d = ( x_y.y - touch.pageY ) * -1 ;
		}else{
			d = e.wheelDelta ;	
		}	

		// console.log(d, t.scrollTop(), t.get(0).scrollHeight - t.innerHeight() );

		if(d > 0 && t.scrollTop() === 0 ){
		}else{
			if (d < 0 && (t.scrollTop() == t.get(0).scrollHeight - t.innerHeight())) {
			}else{
				return true;
			}
		}
	}
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	if (e.stopPropagation)
		e.stopPropagation();
	if(e.stopImmediatePropagation)
		e.stopImmediatePropagation();  
	e.returnValue = false;  
}
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
function disableScroll() {	
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false );
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  window.ontouchstart  = function(e){var touch = e.touches[0] || e.changedTouches[0];x_y = { x : touch.pageX, y : touch.pageY }}; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

$(".tooltip-info").bind("DOMSubtreeModified",function(){ 
	var tooltip_html = $(".tooltip-info").html();
	if($( ".tooltip-info .close" ).length == 0  && tooltip_html != "" ){
		$( ".tooltip-info" ) . prepend('<div class="close ffwi fs16-sm" onclick="$(\'.tooltip-info\').html(\'\')">&#xe60e;</div>');
	}
	$( ".tooltip-info .close" ).click(function(){
		$('.tooltip-info').html('');
	});
	$( ".tooltip-fade" ).click(function(){$('.tooltip-info').html('');});
	if(window.matchMedia("(max-device-width: 46.876rem)").matches) {
		if(tooltip_html == ""){
			enableScroll();
			$("body").css({"overflow" : "auto"});
			$( ".header.header-scroll-transition" ).removeClass("moveLeft");
			$( ".info-header-container" ).removeClass("moveLeft");
			$( ".search-container-mobile" ).removeClass("moveLeft");
		}else{
			disableScroll();
			$( ".tooltip-info" ).addClass('p20 pt40');
			$( ".header.header-scroll-transition" ).addClass("moveLeft");
			$( ".info-header-container" ).addClass("moveLeft");
			$( ".search-container-mobile" ).addClass("moveLeft");
			$('body').css("overflow", "hidden");
		}
	}

})
/**** Side tooltip + scroll ****/

function iOS() {

	var iDevices = [
	'iPad Simulator',
	'iPhone Simulator',
	'iPod Simulator',
	'iPad',
	'iPhone',
	'iPod'
	];

	if (!!navigator.platform) {
		while (iDevices.length) {
			if (navigator.platform === iDevices.pop()){ return true; }
		}
	}

	return false;
}

/* ~~ Check anciens Browsers ~~ */
var appVersion = navigator.appVersion; 
var agent = navigator.userAgent; 
var browserName = navigator.appName; 
var fullVersion = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10); 
var offsetName,offsetVersion,ix; 

// Chrome 
if ((offsetVersion=agent.indexOf("Chrome"))> -1) { 
	browserName = "Chrome"; 
	fullVersion = agent.substring(offsetVersion+5);
	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1; 
} 
// IE
else if ((offsetVersion=agent.indexOf("MSIE"))!=-1) { 
	browserName = "Microsoft Internet Explorer"; 
	fullVersion = agent.substring(offsetVersion+5); 
} 
// Firefox
if ((offsetVersion=agent.indexOf("Firefox"))!=-1) { 
	
} 
// Safari
else if ((offsetVersion=agent.indexOf("Safari"))!=-1) { 
	browserName = "Safari"; 
	fullVersion = agent.substring(offsetVersion+7); 
	var is_safari = navigator.userAgent.indexOf("Safari") > -1;
	if ((offsetVersion=agent.indexOf("Version"))!=-1) fullVersion = agent.substring(offsetVersion+8); 
} 
// For other browser "name/version" is at the end of userAgent 
else if ( (offsetName=agent.lastIndexOf(' ')+1) < (offsetVersion=agent.lastIndexOf('/')) ) { 
	browserName = agent.substring(offsetName,offsetVersion); 
	fullVersion = agent.substring(offsetVersion+1); 
	if (browserName.toLowerCase()==browserName.toUpperCase()) { 
		browserName = navigator.appName; 
	} 
}

//Séparer Safari & Chrome
if ((is_chrome)&&(is_safari)) {
	is_safari=false;
}
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {console.log("Browser: Safari");} 

// trimming the fullVersion string at semicolon/space if present 
if ((ix=fullVersion.indexOf(";"))!=-1) fullVersion=fullVersion.substring(0,ix); 
if ((ix=fullVersion.indexOf(" "))!=-1) fullVersion=fullVersion.substring(0,ix); 
BrMajorVersion = parseInt(''+fullVersion,10); 
if (isNaN(BrMajorVersion)) { 
	fullVersion = ''+parseFloat(navigator.appVersion); 
	BrMajorVersion = parseInt(navigator.appVersion,10); 
}

//document.write('' +'Browser name = '+browserName+'<br>' +'Full version = '+fullVersion+'<br>' +'Major version = '+BrMajorVersion+'<br>' +'navigator.appName = '+navigator.appName+'<br>' +'navigator.userAgent = '+navigator.userAgent+'<br>' )

/* Swiper v8.3.2
=============================================*/

function create_swiper(element, param){
	if(typeof param == "undefined"){
		if (window.matchMedia("(max-device-width: 61.63rem)").matches) {
			param = {
				initialSlide : 0,
				slidesPerView: 2,
			}
		} else {
			param =  {	
				initialSlide : 0,
				slidesPerView: 4,
			}
		}
	}

	var s = new Swiper(element, param);
	return s;
}

let mdPx = convertRemToPixels(46.876);
let lgPx = convertRemToPixels(64);
/*Home*/
function container_swiper(){

	var swiper_container = create_swiper(".swiperHome", {
		autoplay: {
			delay: 5000,
		},
		loop:true,
		navigation : {
			nextEl: ".home-swiper-button-next",
			prevEl: ".home-swiper-button-prev",
		},
		effect: 'fade',
		lazy: {
			loadPrevNext: true,
			loadOnTransitionStart:true,
		},
		pagination : {
			el: ".home-swiper-pagination",
			clickable: true,
		},
		on: {
			transitionStart : function(swiper){
				$('.swiperHome picture').trigger('scroll');
			},
			transitionEnd : function(swiper){
				$('.swiperHome picture').trigger('scroll');
			},
		}
	});
}

function products_swiper(){
	if (window.matchMedia("(max-device-width: 46.876rem)").matches) {
		var swiperProd = create_swiper(".swiperProd",{
			pagination: {
				el: ".swiperPaginationProduct",
				clickable: true,
			},
			on: {
				transitionStart : function(swiper){
					$('.swiperProd .swiper-slide-active img.lazy').trigger('scroll');
				},
			},
		});
	}
}

function products_min_swiper(){
	if (window.matchMedia("(min-device-width: 46.876rem)").matches) {

		let initialSlideIndex = 0;
		let slidesCount = $(".swiperProdMin .swiper-slide").length;
		let slidesPerView = (slidesCount < 4) ? slidesCount : 4;

		$(".swiperProdMin").css({'max-height': slidesPerView*100 + 'px'});
		if (slidesCount <= 4) $(".swiperProdMin .swiper-slide").css({'padding-top': 0});

		var swiperProdMin = create_swiper(".swiperProdMin",{
			direction: 'vertical',
			slidesPerView : slidesPerView,
			initialSlide : initialSlideIndex,
			mousewheelControl: true,
			navigation: {
				nextEl: '.swiperProd .swiper-button-next',
				prevEl: '.swiperProd .swiper-button-prev',
			},
			on: {
				transitionStart : function(swiper) {
					$('.swiperProd .swiper-slide-active img.lazy').trigger('scroll');
				},
			},

		});
	}
}

function home_school_swiper(){
	if (window.matchMedia("(max-device-width: 46.876rem)").matches) {
		var swiperSchool = create_swiper(".swiper-school",{
			slidesPerView : 2,
		});
	}
}

function breadcrumb_swiper() {
	if ($(".breadcrumb-swiper").length > 0) {
		let swiperWidth = $(".breadcrumb-swiper")[0].getBoundingClientRect().width;
		let slideWidth = $(".breadcrumb-swiper > .swiper-wrapper")[0].getBoundingClientRect().width;

		if (window.matchMedia("(max-device-width: 46.876rem)").matches && swiperWidth < slideWidth) {
			var swiperBreadcrumb = create_swiper(".breadcrumb-swiper",{
				direction: "horizontal",
	            slidesPerView: "auto",
	            freeMode: true,
	            scrollbar: ".breadcrumb-swiper-scrollbar",
	            mousewheel: true,
			});
		}
	}
}

function home_blog_swiper(){

	let topNewSwiper = create_swiper('.top-new-sm',{
		slidesPerView: 1,
		slidesPerGroup: 1,
		grid: {
			fill: 'row',
			rows: 4,
		},
		breakpoints: {
			// when window width is >= mdPx
			[mdPx] : {
				slidesPerView: 2,
				slidesPerGroup: 2,
			}
		},
		preloadImages: true,
		observer: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.swiperNewNav .swiper-button-next',
			prevEl: '.swiperNewNav .swiper-button-prev',
		},
		on: {
			transitionStart : function(swiper){
				$('.top-new-sm img.lazy').trigger('scroll');
			},
			transitionEnd : function(swiper){
				$('.top-new-sm img.lazy').trigger('scroll');
			},
		},
	});

	let topBrandSwiper = create_swiper('.top-brand-sm',{
		slidesPerView: 3,
		slidesPerGroup: 3,
		grid: {
			fill: 'row',
			rows: 4,
		},
		breakpoints: {
			// when window width is >= mdPx
			[mdPx] : {
				slidesPerView: 4,
				slidesPerGroup: 4,
				grid: {
					rows: 5,
				}
			}
		},
		watchSlidesProgress: true,
		preloadImages: true,
		observer: true,
		navigation: {
			nextEl: '.swiperBrandNav .swiper-button-next',
			prevEl: '.swiperBrandNav .swiper-button-prev',
		},
	});

	let swiperBlog = create_swiper(".swiper-blog",{
		slidesPerView : 1.75,
		spaceBetween : 20,
		breakpoints: {
			// when window width is >= mdPx
			[mdPx]: {
				slidesPerView: 3.5,
				spaceBetween : 30,
			},
			// when window width is >= lgPx
			[lgPx]:{
				slidesPerView: 5,
				spaceBetween: 0,
			},
		},
		on: {
			transitionStart : function(swiper){
				$('.swiper-blog .swiper-slide-next img.lazy').trigger('scroll');
			},
			transitionEnd : function(swiper){
				$('.swiper-blog .swiper-slide-next img.lazy').trigger('scroll');
			}
		},
	});
}

var isIphone = /(iPhone)/i.test(navigator.userAgent);
var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

/*Galeries products*/
function gallerySwiper(){

	$('.swiperProduct').each(function(index){
		$(this).addClass('swiperProduct'+index)
		$(this).parent().addClass('swiperProductNav'+index)

		let swiperProduct = create_swiper( '.swiperProduct'+index, {
			slidesPerView: 2,
			slidesPerGroup: 2,
			breakpoints: {
				// when window width is >= lgPx
				[lgPx]: {
					slidesPerView: 5,
					slidesPerGroup: 1,
				},
			},
			preloadImages: false,
			observer: true,
			watchSlidesProgress: true,
			preventClicks: true,
			navigation: {
				nextEl: '.swiperProductNav'+index+' .swiper-button-next',
				prevEl: '.swiperProductNav'+index+' .swiper-button-prev',
			},
			on: {
				init : function(swiper){
					$(swiper[0]).find("img.lazy").lazyload();
				},
				transitionStart : function(){
					$(".swiperProduct img.lazy").trigger('scroll');
				},
				transitionEnd : function(){
					$(".swiperProduct img.lazy").trigger('scroll');
				},
			},
		});
	});

	let swiperAccessories = create_swiper( '.swiperAccessories', {
		slidesPerView: 2,
		slidesPerGroup: 2,
		breakpoints: {
			// when window width is >= lgPx
			[lgPx]: {
				slidesPerView: 5,
				slidesPerGroup: 1,
			}
		},
		preloadImages: false,
		observer: true,
		watchSlidesProgress: true,
		preventClicks: true,
		navigation: {
			nextEl: '.swiperAccessoriesNav .swiper-button-next',
    		prevEl: '.swiperAccessoriesNav .swiper-button-prev',
		},
		on: {
			init : function(swiper){
				$(swiper[0]).find("img.lazy").lazyload();
			},
			transitionStart : function(){
				$(".swiperAccessories img.lazy").trigger('scroll');
			},
			transitionEnd : function(){
				$(".swiperAccessories img.lazy").trigger('scroll');
			}
		},
	});

	let configProductDV = create_swiper( '.swiperProductDejaVue', {
		slidesPerView: 2,
		slidesPerGroup: 2,
		breakpoints: {
			// when window width is >= lgPx
			[lgPx]: {
				slidesPerView: 5,
				slidesPerGroup: 1,
			}
		},
		preloadImages: false,
		observer: true,
		watchSlidesProgress: true,
		preventClicks: true,
		navigation: {
			nextEl: '.swiperProductDVNav .swiper-button-next',
    		prevEl: '.swiperProductDVNav .swiper-button-prev',
		},
		on: {
			transitionStart : function(){
				$(".swiperProductDejaVue .swiper-slide img.lazy").trigger('scroll');
			},
			transitionEnd : function(){
				$(".swiperProductDejaVue .swiper-slide img.lazy").trigger('scroll');
			},
			init : function(swiper){
				setTimeout(function(){swiper.update();}, 200)
			},
		},
	});

	let swiper = create_swiper('.services-swiper-container  .swiper-container', {
		slidesPerView: 5,
		watchSlidesProgress: true,
		pagination: {
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.services-swiper-container .swiper-button-next',
			prevEl: '.services-swiper-container .swiper-button-prev',
		},
	});
}

function swiperAccessoires(){
	let swiperAccessoiriesShoppingCart = create_swiper(".swiperAccessShopCart", {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 5,
		grid: {
			fill: 'row',
			rows: 3,
		},
		breakpoints: {
			// when window width is >= mdPx
			[mdPx]: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 10,
				grid: {
					fill: 'row',
					rows: 2,
				},
			},
			// when window width is >= lgPx
			[lgPx]: {
				slidesPerView : 3,
				slidesPerGroup: 3,
				spaceBetween: 20,
				grid: {
					fill: 'row',
					rows: 2,
				},
			},
		},
		rewind: true,
		preloadImages: false,
		observer: true,
		navigation: {
			nextEl: '.swiperAccessShopCartNav .swiper-button-next',
			prevEl: '.swiperAccessShopCartNav .swiper-button-prev',
		},
		on: {
			init : function(swiper){
				$(".swiperAccessShopCart img.lazy").lazyload({threshold:800});
			},
			transitionStart : function(){
				$(".swiperAccessShopCart img.lazy").trigger('scroll');
			},
			transitionEnd : function(){
				$(".swiperAccessShopCart img.lazy").trigger('scroll');
			}
		}
	});
}

function sm_elements(){
	if (window.matchMedia("(max-device-width: 64.000rem)").matches) {		
		$('footer .tabContent').append($('.header-lang'));

	}else{
		$('.header .tabContent').append($('.header-lang'));
		$(".header").css({
			marginTop : "0px",
		})
	}
}

function close_bandeau_app(){
	createCookie( "bandeau_app", true, 30 );
	$(".bandeau_app").addClass('hidden');
	$(".header").css({
		marginTop : "0px",
	})
	$( "#Woodbrass" ).css({ paddingTop:0, marginTop :0 });
}

function open_bandeau_app(){
	if(iOS()){
		location.replace("itms-apps://itunes.apple.com/us/app/woodbrass-musique-musicien/id1205564427?ls=1&mt=8");		
	}else{
		deeplink.open("https://www.woodbrass.com/openmyapp");
	}
}

function load_bandeau_app(){
	if(!readCookie("bandeau_app") && $(".bandeau_app").length > 0){
		if (window.matchMedia("(max-device-width: 64.000rem)").matches ){

			$.getScript("js/browser-deeplink.js",function(){
				deeplink.setup({
					iOS: {
						appName: "Woodbrass",
						appId: "1205564427",
					},
					android: {
						appId: "com.woodbrass.application"
					},
					fallback: false
				});
			})			
			$(".bandeau_app.hidden").removeClass('hidden');
			$(".header").css({
				marginTop : window.matchMedia("(max-device-width: 46.876rem)").matches?"160px":"65px",
			})
			$( "#Woodbrass" ).css({ paddingTop:0, marginTop :0 });
		}		
	}

}
	
var tooltip = function ( content ){
	$(".tooltip-info").html(content);
}
function loadInfoSwiper() {
	var infoHeaderSwiper = create_swiper( ".info-swiper", {
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '.info-swiper-nav .swiper-button-next',
			prevEl: '.info-swiper-nav .swiper-button-prev',
		},
		autoplay: {
			delay: 5000,
		},
	});
	$(".info-swiper").parent().css("visibility", "visible");
}

function lettersBrandsSwiper() {
	if (window.matchMedia('(max-device-width: 46.875rem)').matches) {
		let lettersBrandsSwiper	= create_swiper( ".letters-brands-swiper", {
			slidesPerView: "auto",
		});
	}
}

function load_swipers(){
	container_swiper();
	sm_elements();
	swiperAccessoires();
	gallerySwiper();	
	products_swiper();
	products_min_swiper();
	home_school_swiper();
	home_blog_swiper();
	load_bandeau_app();
	loadInfoSwiper();
	breadcrumb_swiper();
	lettersBrandsSwiper();
}

/* 
^swiper home ici (>bug sm (Julien))
https://developer.mozilla.org/fr/docs/Web/Events/DOMContentLoaded
*/
window.addEventListener("DOMContentLoaded", (event) => {
	load_swipers();

	// Chargement Dynamique des images non-visible
	$( "img.lazy" ).lazyload();
 });

window.addEventListener('orientationchange', load_swipers, false);

function closeTab() {
	$( "header, .mainMenu" ).removeClass( "openTab" );	
	$( ".tabContent, .tabContent > *" ).removeClass( "active" );
	$( window ).trigger( "scroll" );
	$("#mobile-login-form").hide();
}

var lastScrollTop = 0;

function pushBelowHeader( e ) {	

	var dec_bandeau = $(".bandeau_app:not(.hidden)").outerHeight(true) - $( window ).scrollTop();
	if(dec_bandeau < 0) dec_bandeau = 0;

	if($(".checkout-stepline ").length>0){
		dec_bandeau += $(".checkout-stepline ").outerHeight(true);
	}

	$( ".mainMenu" ).css({ top: $( "header" ).outerHeight( true ) + dec_bandeau });
	$( ".mainMenu>nav" ).scroll(function(){
		// if (window.matchMedia("(max-device-width: 64rem)").matches ) {
			$( ".mobileMini.lazy" ).lazyload();
		// }
	});

	// Scroll nav
	/*if ( $( window ).scrollTop() - $(".header nav").outerHeight() > lastScrollTop && $( window ).scrollTop() != 80 ) {
		$( ".header nav.show" ).removeClass( "show" );
	}else {
		$( ".header nav:not(.show)" ).addClass( "show" ); 
	}

	lastScrollTop = $( window ).scrollTop() - $(".header nav").outerHeight();*/

	if ( $( window ).scrollTop() - $(".header nav").outerHeight() > 0 ){
			$( ".header nav.show" ).removeClass( "show" );
	}else {
			$( ".header nav:not(.show)" ).addClass( "show" ); 
	}	

	if(window.navigator.userAgent.indexOf("Edge") > -1){
		var heightHeader = $(".header").outerHeight(true);
		$( "#Woodbrass" ).css({ paddingTop:0, marginTop :heightHeader });

	}else{

		$( "#Woodbrass" ).css({ paddingTop:0, marginTop :0 });
	}

	return false;
}

/* Gestion des Cookies
=============================================*/
function createCookie( name, value, days ) {
	if (days) {
		var date = new Date();
		date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
		var expires = "; expires=" + date.toGMTString();
	} else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/;secure";
}

function readCookie( name ) {
	var nameEQ = name + "=";
	var ca = document.cookie.split( ';' );
	for( var i = 0; i < ca.length; i++ ) {
		var c = ca[i];
		while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1, c.length );
		if ( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length );
	}
	return null;
}

function eraseCookie( name ) {
	createCookie( name, "", -1 );
}
var playerYT;
function video_player( file, title, container ) {
	$("#"+container).replaceWith("<div id='"+container+"'></div>");
	if(file.indexOf("video.woodbrass.com")>-1){
		// legacy jwplayer script
/*
		$.getScript('//jwpsrv.com/library/l3sdADoMEeK7iCIACp8kUw.js', function() {
		jwplayer( container ).setup({
			file   : file,
			title  : title,
			// autostart : true,
			skin   : { name : "bekle" },
			height : "100%",
			width  : "100%"
		});

	});
*/
	}else{
		var vars = container == "eagle-video" ? { 'autoplay': 0, 'controls': 1, 'modestbranding' : 1, 'rel' : 0, 'showinfo': 0 } : { 'autoplay': 0, 'controls': 1, 'modestbranding' : 1, 'rel' : 0 }
		file = file.split("/")[file.split("/").length-1].split("?")[0];
		let videoContainer = document.getElementById("container-video");
		if(!videoContainer) return;
		// building youtube iframe
		let ytIframe = document.createElement('iframe');
		ytIframe.setAttribute('id', 'container-video');

		ytIframe.src = `https://www.youtube.com/embed/${file}`;
		ytIframe.loading = 'lazy';
		// ytIframe.setAttribute('height', '600px');
		ytIframe.setAttribute('height', '825px');
		ytIframe.setAttribute('width', '100%');
		ytIframe.setAttribute('style', 'border: none;');

		videoContainer.replaceWith(ytIframe);

		// if(typeof YT == "undefined"){
		// 	var tag = document.createElement('script');
		// 	tag.src = "https://www.youtube.com/player_api";
		// 	var firstScriptTag = document.getElementsByTagName('script')[0];
		// 	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		// 	console.log(file);
		// 	console.log(vars);
		// 	tag.onload = function(){
		// 		if(YT.loaded == 0){
		// 			setTimeout(tag.onload, 200);
		// 		}else{
		// 			playerYT =  new YT.Player(container, {
		// 				height: '600',
		// 				width: '100%',
		// 				playerVars: vars,
		// 				videoId: file
		// 			});
		// 		}
		// 	}
		// }else{
		// 	playerYT =  new YT.Player(container, {
		// 		height: '600',
		// 		width: '100%',
		// 		videoId: file,
		// 		playerVars: vars,
		// 		/*events: {
		// 			'onReady': function(event){
		// 				event.target.playVideo();
		// 			}
		// 		}*/
		// 	});
		// }
	}
}

// Suggest
function suggest( result ) {
	closeTab();
	var affich = false;

	$(".suggest .seeAll").on('click', function(){
		$("header .searchForm").submit();
	})

	if ( undefined !== result.error ){
		affich = true;
		$(".suggest .errorMessage").html(result.error).show();
		$(".filterPrice, .filterCateg, .filterBrand, .listProduct, .seeAll").hide();
	} else {
		$(".suggest .errorMessage").hide();
		$(".seeAll").show();

		if ( undefined !== result.max || undefined !== result.pMax ||undefined !== result.min ||undefined !== result.pMin ) {
			$(".filterPrice").show();
		} else {
			$(".filterPrice").hide();
		}

		if ( undefined !== result.filter ) {
			affich = true;
			// Filtre par marque
			if ( undefined !== result.filter.manuf ) {
				$(".filterBrand ul").empty();
				$.each( result.filter.manuf, function( i, manuf ){
					var NameBrand = manuf.name.trim().replace(/ /g, '_');
					$(".filterBrand ul").append("<a onclick=DataLayerPushSuggestBrand('"+NameBrand+"') href='" + manuf.link + "'><li><span class='tup vam'>" + manuf.name + "</span> " + ( manuf.shop ? "<span class='fs14 fs26-sm bgGrisM clrBlanc shop vam'>Shop</span>" : "" ) + "</li></a>")
					//$(".filterBrand ul").append("<a href='" + manuf.link + "'><li><span class='tup vam'>" + manuf.name + "</span> " + ( manuf.shop ? "<span class='fs14 fs26-sm bgGrisM clrBlanc shop vam'>Shop</span>" : "" ) + "</li></a>")
				})
				$(".filterBrand").show()
			} else { $(".filterBrand").hide() }

			// Filtre par categorie
			if ( undefined !== result.filter.categ ) {
				$(".filterCateg ul").empty();
				$.each( result.filter.categ, function( i, categ ){
					var NameCateg = categ.name.trim().replace(/ /g, '_');
					$(".filterCateg ul").append("<a onclick=DataLayerPushSuggestCategories('"+NameCateg+"') href='" + categ.link + "'><li><span>" + categ.name + "</span> <span> (" + categ.nbItem + ")</span></li></a>")
					//$(".filterCateg ul").append("<a href='" + categ.link + "'><li><span>" + categ.name + "</span> <span> (" + categ.nbItem + ")</span></li></a>")
				})
				$(".filterCateg").show()
			} else { $(".filterCateg").hide() }
		} else {
			$(".filterCateg").hide();
			$(".filterBrand").hide();
		}

		// Listing produits suggerés
		if ( undefined !== result.product ) {
			affich = true;
			$(".listProduct ul").empty();
			$.each( result.product, function( i, product ){
				var boxOpeComm = "";
				if ( !!product.opeComm ) {
					// boxOpeComm = "<div class='in-block fwb bgVert clrBlanc opeComm pl5 pr5'>" + product.opeComm + "</div>";
					boxOpeComm =  "<div class='in-block'>"+product.opeComm + "</div>" ;
				}
				var NameCateg = product.manuf.trim().replace(/ /g, '_');
				var NameProd = product.name.trim().replace(/ /g, '_');
				var price = "<div class=''>" + ( parseFloat(product.price) > 0 ? ( product.price != product.publicPrice  ? "<div class='strike tar fs30-sm'>" + product.publicPrice + "</div><div class='tar clrBleu fwb fs30-sm'>" + product.price + "</div>" : "<div class='tar clrBleu fwb fs30-sm'>" + product.price + "</div>") : "" )+ "</div>";
				$(".listProduct ul").append("<a onclick=DataLayerPushSuggestProducts('"+NameProd+"','"+NameCateg+"') id='p" + product.id + "' href='" + product.link + "' style='width: 49%;margin: 0px 3px;'><li class='flexCenter row mb10 p5'><div class='col-lg-4'>" + product.image + "</div><div class='col-lg-14 pl20'>" + boxOpeComm + "<div class='fwb tup'>" + product.manuf + "</div><div>" + product.name + "</div></div><div class='col-lg-6 fs18'>" + price + "</div></li></a>");
			})
			$(".listProduct").show();
		} else {
			$(".listProduct").hide();
		}
	}

	if ( affich ) {
		$("header .search form").addClass("active");

		// Affichage de la suggestion
		$(".suggest .loader").hide();
		$(".suggest div.ic_12").stop( true, true ).fadeTo( "fast", 1 );
		$(".suggest img.lazy").show().lazyload();
	} else { closeSuggest(); }
}

function closeSuggest() {
	$(".suggest").hide();
	$("header .search form").removeClass("active");
	$("#fade").hide();

	return undefined;
}

function newsletter( form ) {
	$.post( 'news_letter.php', $( form ).serialize(), function( data ) { alert( data ); });
	return false;
}

function notifyReappro( form ) {
	$.post( 'notify_reappro.php', $( form ).serialize(), function( data ) { 
		$( ".resp-notify" ).addClass( "active" );
		$( ".resp-notify .response" ).html( data );
	});
	return false;
}

function resultLibrairie( resultLib ) {
	$( "#result-library #result" ).html( resultLib ).show();
	$( "#result-library .loader" ).hide();
}

/* Validation formulaire - Client-Side
===============================================*/
function validate( field, toValidate ) {
	toValidate = toValidate || false;
	if ( false === field.checkValidity() ) {		
		field.addEventListener( "invalid", function( event ) { event.preventDefault(); });

		if ( $( field ).attr( "type" ) == "radio"  ) {

			if ( $( field ).is( ":required" ) || toValidate ) {

				if ( $( field ).is( "[name=shipping-method]") ) {

					$( ".active-input:first-child", $( field ).closest( "div" ) ).html( field.validationMessage ).addClass( "invalid" ).on( 'click', function() { field.setCustomValidity( '' ); $( ".active-input" ).removeClass( 'invalid' ).html( '' ); });

					$( field ).on( "click", function() { field.setCustomValidity( '' ); $( ".active-input" ).removeClass( 'invalid' ).html( '' ); })

				} else if ( $( field ).is( "[name=rating]") ) {
					$( ".active-input", $( field ).closest( "label" ) ).html( field.validationMessage ).addClass( "invalid" ).on( 'click', function() { field.setCustomValidity( '' ); $( ".active-input" ).removeClass( 'invalid' ).html( '' ); });
					$( field ).on( "click", function() { field.setCustomValidity( '' ); $( ".active-input" ).removeClass( 'invalid' ).html( '' ); })
				} else {

					$( field ).closest( "form" ).children( ".active-input" ).html( field.validationMessage ).addClass( "invalid" ).on( 'click', function() { field.setCustomValidity( '' ); $( field ).closest( "form" ).children( ".active-input" ).removeClass( 'invalid' ).html( '' ); });
					$( field ).on( "click", function() { field.setCustomValidity( '' ); $( ".active-input" ).removeClass( 'invalid' ).html( '' ); })
				}
			
			}
		
		} else {
			$( field ).siblings( ".active-input" ).html( field.validationMessage ).addClass( "invalid" );
			if($( field ).hasClass('required-field') )  $( field ).removeClass("required-field").addClass("required-field-error");
			/*if ($( field ).html( field.validationMessage ).hasClass( "invalid" ) ) {
				console.log('ab');
				$("div.required-field").removeClass("required-field").addClass("required-field-error");
			} else {
				//$(".required-field").addClass("required-field");
			}*/
			$( field ).on( 'focus', function() { field.setCustomValidity( '' ); $( field ).siblings( ".active-input" ).removeClass( 'invalid' ).html( '' ); });
			//if ( $( required).hasClass("required-field required-field-error") ) {
				$( field ).on( 'focus', function() { 
					//if ( $( this).hasClass("required-field-error") ) {
						//field.setCustomValidity( '' ); $( field ).removeClass( 'required-field-error' ).addClass('required-field').html( '' ); 
					//}
				});
			//}
		}
		if ( $( ".listAddr" ).length ) {
			$( field, ".listAddr form" ).focus();
		}
	}else{
		field.setCustomValidity( '' ); 
		$( field ).siblings( ".active-input" ).removeClass( 'invalid' ).html( '' ); 
		if($( field ).hasClass('required-field-error') ) $( field ).removeClass("required-field-error").addClass("required-field");
	}
}
/*-- Champs Requis --*/
$('.required-field').on( "blur keyup", function()
{
	validate( this );
    //if( $(this).val().length === 0 ) {
        //$(this).addClass('required-field-error');
    //}
    	//$(this).removeClass('required-field-error').addClass('required-field');;
    //}
});

function validateForm( form ) {

	$.each( form.elements, function( index, field ) { 
		if ( $( field ).is( ":checked" ) && $( field ).siblings( ".shipping-method" ).length && !$( field ).siblings( ".shipping-method" ).find( "input[name^='other-cp-']" ).val() ) {
			$( "[name=shipping-method]", $( field ).siblings( ".shipping-method" ) ).attr( "required", "required" );
		} else {			
			$( "[name=shipping-method]", $( field ).siblings( ".shipping-method" ) ).removeAttr( "required" );
		}
		validate( field ); 
	});
	return form.reportValidity();
}

function autofillCity( country ) {
	$.getJSON( "/js/zipcode" + country + ".txt", function( data ) {
			$( document ).off( "keyup change", "input[name=zipcode]");
			$( document ).on( "keyup change", "input[name=zipcode]", function() {
				var zipcode = $( this ).val();

				if(country == 73 ){
					if ( zipcode.substring( 0, 2 ) == 20 ) {			// Corse
						$( "select[name=country]" ).val( 248 );
					} else if ( zipcode.substring( 0, 3 ) == 971 ) {	// Guadeloupe
						$( "select[name=country]" ).val( 87 );
					} else if ( zipcode.substring( 0, 3 ) == 972 ) {	// Martinique
						$( "select[name=country]" ).val( 134 );
					} else if ( zipcode.substring( 0, 3 ) == 973 ) {	// Guyane Française
						$( "select[name=country]" ).val( 75 );
					} else if ( zipcode.substring( 0, 3 ) == 974 ) {	// Réunion
						$( "select[name=country]" ).val( 174 );
					} else if ( zipcode.substring( 0, 3 ) == 987 ) {	// Polynésie Française
						$( "select[name=country]" ).val( 76 );
					}
				}

				if ( undefined !== data[zipcode] ) {
					if ( data[zipcode].length == 1 ){
						$( "input[name=city]" ).val( data[zipcode][0].city );
					} else {
						$( ".list-city" ).empty();

						for ( i in data[zipcode] ) {
							var city = "<div class='p5 cp zipcode' data-city='" + data[zipcode][i].city + "'>" + data[zipcode][i].city + " (" + data[zipcode][i].state + ")" + "</div>";
							$( ".list-city" ).append( city );
						}
					}
				}
			})

			$( document ).on( "click", ".zipcode", function() {
				$( "input[name=city]" ).val( $( this ).data( "city" ) );
				$( ".list-city" ).empty();
			})

			$( document ).on( "focus", "input[name=zipcode]", function() { $( ".list-city" ).empty(); })
		})
}

;(function($) {
	// Filter gallery - Simulate hover on touch devices
	$( ".filter-box" ).bind( "touchstart", function() { $( this ).addClass( "hover" ).bind( "touchend", function() { $( this ).removeClass( "hover" ); }); });

	// Push Container below Header
	$( window ).on( 'resize scroll load', pushBelowHeader );

	$( "#stupidDeal img.lazy, .htop5box img.lazy" ).show().lazyload();

	// Load
	if (window.matchMedia("(min-device-width: 64rem)").matches ) {
		$( " .mobileMini img.lazy" ).lazyload({ threshold : 5000 });
	}
	// Toggle Main Menu
	$( ".menu" ).on( "click", function(event) {
		$( ".mainMenu" ).toggleClass( "openMenu" );
		if ( $( ".openMenu" ).length > 0 ){
			setTimeout(function(){
				$(".mobileMini.lazy").lazyload()				
			},300)
			disableScroll();
			var listCategMenu = $( ".openMenu" ).find(".list-categ-root-menu");
            listCategMenu.on("scroll", function(ev){
                listCategMenu.find("img[src^='images/photo_wb.jpg'].lazy").lazyload({
                    event: "loadImage"
                });
            });
            $(".checkout-stepline").hide();
            $(".site-container").hide();
            var o = listCategMenu.offset();
			listCategMenu.css({"overflow":"auto","height":(window.innerHeight - (o.top + ($(".info-header").height() - $(".info-header").outerHeight(true))))+"px"});
			$( ".fade-screen" ).css({ top : ( -1 * $(".checkout-stepline").outerHeight(true) )+"px" });
            $( ".fade-screen" ).show();

			$( "#woodbrass" ).css({ zIndex : 10 });
			$(".menu").addClass("active");
			let html = $('#header-mobile-button-close').html();
			$(this).html(html);

        }else{
			enableScroll();
            $(".site-container").show();
            $(".checkout-stepline").show();
			$( ".fade-screen" ).css({ top : "0px" });
			$( ".fade-screen" ).hide();
			$(".menu").removeClass("active");
			$( "#woodbrass" ).css({ zIndex : 0 });
			let html = $('#header-mobile-button-open').html();
			$(this).html(html);
		}
		// Ferme barre de recherche
		$( "div.search-container").addClass( "hidden-search-container" );
		closeSuggest();
		// Ferme header tab
		if ( $( "div.tabContent" ).hasClass( "active" ) ) { closeTab(); }
		$( "div.fade-screen").toggleClass( "hidden");
	})

	// Close menu clic dehors 
	$( "div.fade-screen").on( "click", function(event) {	
		$( "div.mainMenu").removeClass( "openMenu" );
		$("div.menu");
		$("div.menu").html(`
			<svg class="mr20-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
			<span class="btnMenu">menu</span>
		`);
		$( ".fade-screen" ).css({ top : "0px" });
		$( ".header" ).css({ zIndex : 10, top:"0px" });
		$( "#woodbrass" ).css({ zIndex : 0 });
		$( "div.fade-screen").addClass( "hidden");
		$( ".list-top-brand").addClass('hidden-sm');
		$( "div.marques").removeClass('active');
		enableScroll();
	})

	/* Toggle Search Bar */
	$( "div.search-icon").on( "click", function(event) {
		$( "div.search-container").toggleClass( "hidden-search-container" );
		$( "div.mainMenu").removeClass( "openMenu" );
		$("div.menu").removeClass('material-icons fs80-sm fs40-md').addClass('tup fwb fs32-sm fs14-md');
		$("div.menu").html("menu");
		$( ".fade-screen" ).css({ top : "0px" });
		$( ".header" ).css({ zIndex : 10, top:"0px" });
		$( "#woodbrass" ).css({ zIndex : 0 });
		$( "fadescreen").toggleClass( "hidden");

		// AFFICHAGE CLAVIER
		if($( "div.search-container").hasClass( "hidden-search-container" ))
		{
			$(".searchFormMob input").off();
		}
		else
		{
			$(".searchFormMob input").focus();
		}
		
		/*if ( $( "body").hasClass ("fixed-container")) {
			$( "body").removeClass ("fixed-container");
		} */
		enableScroll();
	})
	$(".header-button.tab-account").on("click", function(ev) {
		$("#mobile-login-form").css("display","flex");
	});

	/* Toggle Header Tab Content */
	$( ".header-tab" ).on( "click", function( event ) {
		if (window.matchMedia('(min-device-width: 46.877rem)').matches 
			|| $( this ).hasClass( "account-unregistred" )
			|| $( this ).hasClass( "lang-button" )) {
			closeSuggest();
			$( ".mainMenu").removeClass("openMenu");
			$( ".fade-screen" ).css({ top : "0px" });
			tab = $( event.target ).closest( "[data-toggle]" ).data( "toggle" );
			if(!window.matchMedia( "(max-device-width: 46.876rem)").matches && tab !== 'lang'){
				$( ".header" ).css({ zIndex : 10, top:"0px" });
			}
			$( "#woodbrass" ).css({ zIndex : 0 });
			// Cache fade
			$( "div.fade-screen").addClass ("hidden");

			if ( $( ".header-" + tab ).hasClass( "active" ) ) { 
				closeTab(); 
			} else {
				if(window.matchMedia( "(max-device-width: 46.876rem)").matches && tab === 'lang'){
					$( ".header-" + tab + ", footer .tabContent" ).siblings().removeClass( "active" );
					$( ".header-" + tab + ", footer .tabContent" ).addClass( "active" );
				} else {
					$( "header, .mainMenu" ).addClass( "openTab" );
					$( ".header-" + tab + ", .tabContent" ).siblings().removeClass( "active" );
					$( ".header-" + tab + ", .tabContent" ).addClass( "active" );
				}
			}
			enableScroll();
		}
		else {
			window.location.replace('account_profil.php');
		}
	});

	$( ".header-close-tab" ).on( "click", function() { closeTab();  });

	/* Suggest */
	var xhr;
	$( "input[name=keywords]" ).on( 'keyup focus', function( event ){
		var $val = $( this ).val().replace( /<\/?(?!\!)[^>]*>/gi, '' );

		if( undefined !== xhr ) xhr.abort();

		if ( event.keyCode == 13 ) {
			$( this ).closest( "form" ).submit();
			closeSuggest();
		} else {
			if ( event.keyCode == 27 ) {  $( this ).val(""); closeSuggest(); }
			if ( ( !isNaN( $val ) && $val != "" ) || $val.length > 2 ) {
				closeTab();
				$( ".suggest" ).css({ top: $( ".header" ).outerHeight( true )-$( ".header nav" ).outerHeight( true ) }).slideDown( 0, function() { 
					$(".loader", this).show(); $("#fade").show(); $("div.ic_12", this).stop(true, true).fadeTo( "fast", 0.5 );
					xhr = $.post( 'suggest.php', { queryString: $val }, suggest, 'json' );
					$('#wordSuggest').html($val);
				})
			} else { closeSuggest(); }
		}
	});

	var userAgent = window.navigator.userAgent;
	var placeFilter = function(){
		$(".sticky-filter").css("top", window.innerHeight*0.9 );
	}
	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		$(window).resize(function(event) {
			placeFilter();
		});
		placeFilter();
	}
	/*Filters */
	$( ".filterTab" ).on( "click", function( event ) {
		if( $(".sticky-filter").offset().top - $(document).scrollTop() != $("header").outerHeight(true) ){
			$('html, body').animate({
				// scrollTop : $(".sticky-filter").offset().top - $(".sticky-filter").outerHeight(true) 
			},200);
		}

		if(window.matchMedia( "(max-device-width: 46.876rem)" ).matches){
			if($("#fancy_filter").length == 0 ){
				var content = $(".filter").html();
				$(".filter").remove();
				$("body").append("<form id='fancy_filter' class='bgBlanc' style='position:fixed;top:0;bottom:0;left:0;right:0;z-index:9999'></form>");
				$("#fancy_filter").html(content);
				var cPost;				
				$("form#fancy_filter :input").change(function() {
					if(($(this).parents(".listing-choice").find("input:checked").length)>0){
						if($(this).parents(".listing-choice").prev(".filter-box").find(".tips").length == 0 ){
							$(this).parents(".listing-choice").prev(".filter-box").find(".filter-label").append('<span class="hidden-lg hidden-md tips bgBleu clrBlanc ml40 ml20-sm fs16-sm">'+$(this).parents(".listing-choice").find("input:checked").length+'</span>');
						}else{
							$(this).parents(".listing-choice").prev(".filter-box").find(".tips").html($(this).parents(".listing-choice").find("input:checked").length);
						}
					}else{
						$(this).parents(".listing-choice").prev(".filter-box").find(".tips").remove();
					}

					form = $('form#fancy_filter').serializeArray();
					var data = {};
					$.each(form, function(k, v){
						data[v.name] = v.value;
					});
					data['get_nb_result'] = '';
					if(cPost)cPost.abort();
					cPost = $.post('/filter_search.php', data, function(res) {
						$("form#fancy_filter .close-btn").hide();
						$("form#fancy_filter .close-btn.result-btn").show();
						$("form#fancy_filter .close-btn.result-btn>div>div").html(res); // TODO vairables
					});
				});
			}else{
				$("#fancy_filter").show();
			}
			
		}
	});

	if(window.matchMedia( "(min-device-width: 46.877rem) and (max-device-width: 64rem)" ).matches){

		$(".filter-box").click(function(){
			if($(this).hasClass('active')){
				$(".filter-box").removeClass('active');
			}else{
				$(".filter-box").removeClass('active');
				$(this).toggleClass('active');					
			}
		})
	}
	if(window.matchMedia( "(max-device-width: 46.876rem)" ).matches){

		$( ".filterPrix" ).on( "click", function( event ) {
			if( $(".sticky-filter").offset().top - $(document).scrollTop() != $("header").outerHeight(true) ){
				$('html, body').animate({
					// scrollTop : $(".sticky-filter").offset().top - $(".sticky-filter").outerHeight(true) 
				},200);
			}
			if(!$(this).hasClass('active')){
				disableScroll();
				$(".sticky-filter").addClass('active');
				if($(".fade-filter").hasClass('hidden')){
					$( ".fade-filter").toggleClass( "hidden");
				}

			}else{
				enableScroll();
				$(".sticky-filter").removeClass('active');
				$( ".fade-filter").addClass( "hidden");
			}
			$( ".filterPrix").toggleClass ("active");
			$( ".filterTabPrix").toggleClass ("visible-lg visible-sm");
			$( ".filterPrixTri").toggleClass("active");

			$( ".filterTab").removeClass ("active");
			$( "div.filters-sm").addClass ("hidden-sm");

		});
	}
	

	// Close menu clic dehors 
	$( "div.fade-filter").on( "click", function(event) {	
		$( ".filterTab").removeClass ("active");
		$( ".filterPrix").removeClass ("active");
		$( ".filterPrixTri").removeClass ("active");
		$( "div.filters-sm").addClass ("hidden-sm");
		$( ".filterTabPrix").removeClass ("visible-sm visible-lg");
		$( ".fade-filter").addClass( "hidden");
		enableScroll();
	})

	window.onload=function(){

		if (window.matchMedia('(max-device-width:46.876rem)').matches) {

			$(".filter-box:not('.filterPrix')").on("click", function (ev) {
				if ($(".check-sm span").hasClass('active')) {
					if ($(this).find("ul").hasClass("active")) {
						$(".filter-box.filterMarques.col-sm-24").toggleClass("col-sm-20 col-sm-20-b col-sm-24");
						$(".erase-filter").show();
					} else {
						if ($(this).hasClass('filterMarques')) {
							$(this).toggleClass("col-sm-20 col-sm-20-b col-sm-24");
							$(".erase-filter").hide();
						} else {
							$(".filter-box.filterMarques.col-sm-24").toggleClass("col-sm-20 col-sm-20-b col-sm-24");
							$(".erase-filter").show();
						}
					}
				}
				//alert($(this));

				if ($(this).find("ul").hasClass("active")) {
					$(".filter-box:not('.filterPrix')").find("ul.active").removeClass("active");
					$(".filter-box:not('.filterPrix')").removeClass("clrBlanc bgGrisF");
					$(".filter-box:not('.filterPrix')").find(".filter-label span.clrBlanc-sm").toggleClass("clrBlanc-sm clrGrisCM-sm ");

				} else {
					$(".filter-box:not('.filterPrix')").find("ul.active").removeClass("active");
					$(this).find("ul").toggleClass("active");
					$(".filter-box:not('.filterPrix')").removeClass("clrBlanc bgGrisF");
					$(".filter-box:not('.filterPrix')").find(".filter-label span.clrBlanc-sm").toggleClass("clrBlanc-sm clrGrisCM-sm ");
					$(this).toggleClass("clrBlanc bgGrisF");
					$(this).find(".filter-label span").toggleClass("clrBlanc-sm clrGrisCM-sm ");
				}

			});

			if ($(".check-sm span").hasClass('active')) {
				$(".filter-box.filterMarques").toggleClass("col-sm-20 col-sm-24");
			}

			// $(".sticky-filter").css({top: $("header").outerHeight()});
			$(".breadcrumb-nb-result").html($(".filter-result").html());
			$("#filter-result").html($(".filter-result").html());

			$(".goBack-sm").click(function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
				window.location.href = $('.breadcrumb>a')[$('.breadcrumb').length - 2].href;
			})
		}

	}

	/* Filters check */
	function getFiltersActive() {
		var nbFiltersActive = document.querySelectorAll(".check.active").length;
		if(document.getElementById("filter-counter"))document.getElementById("filter-counter").innerHTML = nbFiltersActive ? "(" + nbFiltersActive + ")" : "";
	}
	getFiltersActive();

	/*TopMarques*/
	if(window.matchMedia( "(max-device-width: 46.876rem)" ).matches){
		$( ".list-top-brand").addClass('active');
		$( "div.marques" ).on("click",function(ev){	
			$( "div.marques").toggleClass('active');
			$( ".list-top-brand").toggleClass('hidden-sm');
			$( ".top-brand-sm").addClass('active');
		});
	}

	/* Home 3fois/prix */
	$('.prixPub').each(function(){
    	$(this).html($(this).html().replace(/&nbsp;/gi,''));
	});
	$('.financement').each(function(){
    	$(this).html($(this).html().replace(/&nbsp;/gi,''));
	});
	
	/* Prod Description */
	window.addEventListener("DOMContentLoaded", () => {
		if($(".descContainer").length > 0){
			let descriptionHeight = document.getElementsByClassName('descContainerChild')[0].offsetHeight;
			if (descriptionHeight > $(".descContainer").outerHeight(true)) {
				//use js to prevent ios bug
				let descBtns = document.getElementsByClassName("descSmTrigger");
				Array.prototype.forEach.call(descBtns, function(desBtn) {
					desBtn.addEventListener("click", function(){
						$(".descContainer").toggleClass('descContainerActive');

						if (window.matchMedia('(max-device-width: 46.875rem)').matches) {
							$(".descSmBtn").toggleClass('hidden-sm');
						} else {
							$(".descSmBtn").toggleClass('hidden-lg hidden-md');
							$('.divBtnDescContainer').toggleClass('divBtnDescContainerActive');
						}

						let descContainerChild = document.getElementsByClassName("descContainerChild");
						if ($(".descContainer").hasClass('descContainerActive')) {
							$(".descContainer").css("max-height", function(){
								return descContainerChild[0].scrollHeight + 50
							});
						} else {
							if (window.matchMedia('(max-device-width: 46.875rem)').matches) {
								$(".descContainer").css("max-height", 160);
							} else {
								$(".descContainer").css("max-height", 390);
							};
						};

						// Faire passer la div au dessus du dégradé pour rendre la référence marque cliquable
						$(".descContainer").css('z-index', $(".descContainer").css('z-index') == 3 ? 0 : 3);

						if (!$(".descContainer").hasClass('descContainerActive')) $('html, body').animate({scrollTop: $('.titleDescContainer').offset().top - 100}, 600);
					});
				});
			} else {
				$(".divBtnDescContainer").addClass('hidden-lg hidden-md hidden-sm');
			}
		}
	});

	/* Prod sticky button  & chatbot */
	if ($(".btProdSticky").length > 0 && $(".btnAjouter.add").length > 0) {
		$(".btProdSticky").append($(".btnAjouter.add").clone());

		$(window).scroll(function() {
			let isBtProdVisible = $(".btProd").offset().top - $(window).scrollTop() > 0;
			let isFooterVisible = $("footer").offset().top - $(window).scrollTop() < screen.height;
			let isProdStickyActive = $(".prodSticky").hasClass('prodStickyActive');

			if (!isBtProdVisible && !isFooterVisible && !isProdStickyActive){
				$(".prodSticky").addClass('prodStickyActive');
				$('#hubspot-messages-iframe-container').addClass("hubspot-message-active");
		   }
		   else if ((isBtProdVisible && isProdStickyActive) || (isFooterVisible && isProdStickyActive)) {
			   $(".prodSticky").removeClass('prodStickyActive');
			   $('#hubspot-messages-iframe-container').removeClass("hubspot-message-active");
		   } 
		});
	}

	/* Stores Partenaires */
	$(".storePartenaire").on("click",function(ev){
		$( ".storePartenaireWrapper").toggleClass('hidden-lg hidden-md hidden-sm');
		$( ".storeIcon").toggleClass('hidden-lg hidden-md hidden-sm');
		$( ".storeIconUp").toggleClass('hidden-lg hidden-md hidden-sm');
	});
	$(".store-partenaire").on("click", () => {
		$( ".store-partenaire-wrapper").toggleClass('hide');
		$( ".store-icon").toggleClass('hide');
		$( ".store-icon-up").toggleClass('hide');
	});

	/*if(window.matchMedia( "(min-device-width: 46.877rem) and (max-device-width: 64rem)" ).matches){

		$(".paypal-btn").on("click",function(ev){
			$( ".paypal-modal-content").toggleClass('tooltip-info');
		})
	}*/
	
	/* Expand Avis Mobile */
	/*if(window.matchMedia( "(max-device-width: 61.63rem)" ).matches){*/
		$(".swiperReviewsDetail").on("click",function(ev){

			/*$( ".swiperReviews").toggleClass('expand');
			var lessExpand = str.replace('add','less');*/
		});
	/*}*/
	/*if(window.matchMedia( "(max-device-width: 61.63rem)" ).matches){*/
		$(".expRev").on("click",function(ev){
			$( ".swiperReviews").toggleClass('expand');
			$( ".addRev").toggleClass('hidden-sm').toggleClass('hidden-md');
			$( ".addRev").toggleClass('visible-sm').toggleClass('visible-md');
			$( ".remRev").toggleClass('hidden-sm').toggleClass('hidden-md');
			$( ".remRev").toggleClass('visible-sm').toggleClass('visible-md');

		});
	/*}*/

	$('.leftRev').click(function(){
   	 $('.revLeft').click();
	})

	$('.rightRev').click(function(){
   	 $('.revRight').click();
	})
	
	/* Tooltip */
	if(window.matchMedia( "(max-device-width: 61.63rem)" ).matches){

		if(false){
			$("div.garantie-info").on("click",function(ev){
				$(".garantie-info-ttsm").toggleClass('active');
				$("html, body").scrollTop(1080);
				/*$(".fade-screen").removeClass('hidden');*/
			});
			$("div.close-sb").on("click",function(ev){
				$("div.garantie-info-ttsm").removeClass('active');
				/*$(".fade-screen").addClass('hidden');*/
			});
			$("div.fade-screen").on("click",function(ev) {
				/*$("div.garantie-info-ttsm").removeClass('visible-sm');*/
				/*$(".site-container").removeClass('with-tooltip');*/
				/*$(this).addClass('hidden');*/
			});
		}else{
			// Duncan qui fait du boudin
			$("div.garantie-info").on("click",function(ev){
				tooltip($("div.garantie-info").data("tooltip"));
			});			
		}

	}
	if(window.matchMedia( "(min-device-width:46.876rem) and (max-device-width: 64rem)" ).matches){
		if(false){
			$("div.garantie-info").on("click",function(ev){
				$(".garantie-info-ttsm").toggleClass('active');
				$("html, body").scrollTop(0);
				/*$(".fade-screen").removeClass('hidden');*/
			});
			$("div.close-sb").on("click",function(ev){
				$("div.garantie-info-ttsm").removeClass('active');
				/*$(".site-container").removeClass('with-tooltip');*/
				/*$(".fade-screen").addClass('hidden');*/
			});
			$("div.fade-screen").on("click",function(ev) {
				/*$(".site-container").removeClass('with-tooltip');*/
				/*$(this).addClass('hidden');*/
			});
		}else{
			// Duncan qui fait du boudin
			$("div.garantie-info").on("click",function(ev){
				tooltip($("div.garantie-info").data("tooltip"));
			});
		}

	}
	/*$(document).ready(filterPrixContent);
	$(window).resize(filterPrixContent);
	function filterPrixContent() {
    var width = $('.parent').width() - $('.special').width();
    var leftMargin = width/2;

    $('.special').css('margin-left', leftMargin);
	}*/

	// Moteur de recherche librairie
	var xhrlib;
	$(  "#lib-search" ).on( 'keyup focus change', function( event ){
		var data = $( this ).serialize();

		if( undefined !== xhrlib ) xhrlib.abort();
		
		$( "#result-library .loader" ).show();
		xhrlib = $.post( 'SearchLibrairie.php', data, resultLibrairie );
	})

	// Slider	
	$( ".service, .slider-access" ).sliderWB({ nbItemVisible: 4, resizable: true });
	$( ".slider-video" ).sliderWB({ nbItemVisible: 4, resizable: true, emptyBox: false });
	$( ".slider-univers" ).sliderWB({ autoPlay: true });

	/* Fiche Produit
	===============================================*/
	// Custom Pack
	if ( $( ".custom-pack").length ) { $( ".custom-pack" ).customPackWB(); }

	// Zoom Image Fiche Produit
	$( ".zoom, .over-img-princ" ).zoomWB();

	// Ancre Fiche Produit
	$( "[data-anchor='description'], [data-anchor='medias'], [data-anchor='accessories'], [data-anchor^='index-']" ).on( 'click', function() {
		var self = this;
		if ( $( '.' + $( self ).attr( "data-anchor") ).length ) { $("html, body").animate({ scrollTop: $( '.' + $( self ).attr( "data-anchor") ).offset().top - $( ".header" ).outerHeight( true ) }, 500, 'linear' ); }
	});

	// Ancre Gallery
	if ( $( ".box-categ.selected" ).length || $.urlParam("page") > 1) {
		// $("html, body").animate({ scrollTop: $( ".gallery" ).offset().top - $( "header" ).outerHeight( true ) }, 500, 'linear' );
	}

	// Popup Custom
	$( document ).on( "click", ".popupIt", function() {
		var id     			= $( this ).data( "id" );
		var action 			= $( this ).data( "action" );
		var productId 		= $( this ).data( "productid" );
		var productImg 		= $( this ).data( "productimg" );
		var productName 	= $( this ).data( "productname" );
		var productBrand 	= $( this ).data( "productbrand" );
		var shortPreset 	= $( this ).data( "shortPreset" );
		var preset      	= $( this ).data( "preset" );
		var price 	        = $( this ).data( "price" );
		var hreflink 		= $( this ).data( "href" );
		// var accroche 		= $( this ).data( "accroche" );
		// var title 		    = $( this ).data( "title" );
		// var tags 		    = $( this ).data( "tags" );
		// var description 	= $( this ).data( "description" );
		// var codepromo 	    = $( this ).data( "codepromo" );
		// var label 	        = $( this ).data( "label" );


		var content = $( "#" + id ).html().replace( /{{ preset }}/g, preset ).replace( /{{ price }}/g, price ).replace( /{{ hreflink }}/g, hreflink ).replace( /{{ shortPreset }}/g, shortPreset ).replace( /{{ action }}/g, action ).replace( /{{ productid }}/g, productId ).replace( /{{ productimg }}/g, productImg ).replace( /{{ productname }}/g, productName ).replace( /{{ productbrand }}/g, productBrand );


		// var content = $( "#" + id ).html().replace( /{{ preset }}/g, preset ).replace( /{{ price }}/g, price ).replace( /{{ hreflink }}/g, hreflink ).replace( /{{ shortPreset }}/g, shortPreset ).replace( /{{ action }}/g, action ).replace( /{{ productid }}/g, productId ).replace( /{{ productimg }}/g, productImg ).replace( /{{ productname }}/g, productName ).replace( /{{ productbrand }}/g, productBrand ).replace( /{{ title }}/g, title ).replace( /{{ accroche }}/g, accroche ).replace( /{{ tags }}/g, tags ).replace( /{{ description }}/g, description ).replace( /{{ codepromo }}/g, codepromo ).replace( /{{ label }}/g, label );
		// var content = $( "#" + id ).html().replace( /{{ preset }}/g, preset ).replace( /{{ price }}/g, price ).replace( /{{ hreflink }}/g, hreflink ).replace( /{{ shortPreset }}/g, shortPreset ).replace( /{{ action }}/g, action ).replace( /{{ productid }}/g, productId ).replace( /{{ productimg }}/g, productImg ).replace( /{{ productname }}/g, productName ).replace( /{{ productbrand }}/g, productBrand ).replace( /{{ title }}/g, title ).replace( /{{ accroche }}/g, accroche ).replace( /{{ tags }}/g, tags ).replace( /{{ description }}/g, description ).replace( /{{ codepromo }}/g, codepromo ).replace( /{{ label }}/g, label );
		if(window.matchMedia("(max-device-width: 64rem)").matches && window.location.pathname.indexOf('configurateur')==-1 && window.location.pathname.indexOf('eagletone-custom')==-1){
			console.log($(this));
			if($(content).find(".popup").length > 0 )
				tooltip($(content).find(".popup").html())
			else
				tooltip($(content).html())
		}else{
			$( "body" ).append( content );
			$( "#fade" ).show();
			$( document ).on( "click", ".popup .close,.popup .btn-close", function() { $( "#fade" ).hide(); $( ".popup" ).hide(); });
			$( document ).on( "click", ".popup .revclose", function() { $( "#fade" ).hide(); $( ".popup" ).hide(); });
		}
		// /////
		// MAD-SELECT
		var madSelectHover = 0;
		$(".mad-select").each(function() {
			var $input = $(this).find("input"),
				$ul = $(this).find("> ul"),
				$ulDrop =  $ul.clone().addClass("mad-select-drop");
			$(this)
				.append('<i class="material-icons">keyboard_arrow_down</i>', $ulDrop)
				.on({
					hover : function() { madSelectHover ^= 1; },
					click : function() { $ulDrop.toggleClass("show"); }
				});
			// PRESELECT
			$ul.add($ulDrop).find("li[data-value='"+ $input.val() +"']").addClass("selected");
			// MAKE SELECTED
			$ulDrop.on("click", "li", function(evt) {
				evt.stopPropagation();
				$input.val($(this).data("value")); // Update hidden input value
				$ul.find("li").eq($(this).index()).add(this).addClass("selected")
					.siblings("li").removeClass("selected");
			});
			// UPDATE LIST SCROLL POSITION
			$ul.on("click", function() {
				var liTop = $ulDrop.find("li.selected").position().top;
				$ulDrop.scrollTop(liTop + $ulDrop[0].scrollTop);
			});
		});
		// CLOSE ALL OPNED
		$(document).on("mouseup", function(){
			if(!madSelectHover) $(".mad-select-drop").removeClass("show");
		});
	})

	// Vidéo
	if ( $( "#video_0" ).length ) {
		$( "#video_0" ).closest( "a" )[0].click();
	}

	// Scroll To Top
	$( window ).on( "scroll", function() {
		if ( $( window ).scrollTop() < $(window).height() - $("header").height() ) { $( "#backToTop, #backToTop-sm" ).removeClass( "active" ); }
		else {
			$( "#backToTop, #backToTop-sm" ).addClass( "active" );
			$( "#backToTop").css({ "left": ( ( $( 'body' ).width() + $( "#Woodbrass" ).width() ) / 2 ) + "px" }); }
	})
	$( "#backToTop, #backToTop-sm, .backToTop" ).on( "click", function() { $( "html, body" ).animate({ scrollTop: 0 }, 250 ); });

	/* Timer Deal Débile
	=============================================*/
	if ( $( "#timeleft" ).length ) {
		setInterval( function(){
            var now = new Date();
            var expire = new Date();

            expire.setFullYear( now.getFullYear() );
            expire.setMonth( now.getMonth() );
            expire.setDate( now.getDate() + 1 );
            expire.setHours( 0 );
            expire.setMinutes( 0 );
            expire.setSeconds( 0 );

            var secondesLeft = ( expire - now ) / 1000;

            var heures   = Math.floor((secondesLeft - ( 60 * 24)) / (60 * 60));
            var minutes  = Math.floor((secondesLeft - ((60 * 24 + heures * 60 * 60))) / 60);
            var secondes = Math.floor( secondesLeft - ((60 * 24 + heures * 60 * 60 + minutes * 60)));

            if (minutes  < 10) { minutes  = "0" + minutes; }
            if (secondes < 10) { secondes = "0" + secondes; }

            var timeLeft = heures + ":" + minutes + "." + secondes;

            $( "#timeleft" ).html( timeLeft );
        }, 1000 );
	}

	if ( $( ".shop-recap" ).length ) {
	
		/* Panier - Gestion des quantités
		=============================================*/
		$( document ).on( 'click', '.cart-qty-plus', function () {
			var qty = $( this ).siblings( 'input[name="cart_quantity[]"]' );
			qty.val( parseInt( qty.val() ) + 1 );
			$( this ).closest( 'form' ).submit();
		});

		$( document ).on( 'click', '.cart-qty-moins', function () {
			var qty = $( this ).siblings( 'input[name="cart_quantity[]"]' );
			qty.val( Math.max( 0, parseInt( qty.val() ) - 1 ) );
			$( this ).closest( 'form' ).submit();
		});
	}


	/* Validation formulaire - Server-Side
	=============================================*/
	if ( $( '[data-error]' ).length ) {
		$("html, body").animate({ scrollTop: $( "[data-error]:eq(0)" ).closest( 'label, div' ).offset().top - $( ".header" ).outerHeight( true ) - $( "nav" ).outerHeight( true ) }, 500, 'linear' );
		$( '[data-error]' ).each( function( index, field ) { field.setCustomValidity( $( this ).data( 'error' ) ); validate( field, true ); if ( field.type == "checkbox" && field.name.match( /product(\d+)\[\]/ ) ) { delete field.dataset.error; field.setCustomValidity( '' ) } });
	}


	/* Création compte - remplissage Auto ville pays by CP
	===========================================================*/
	if ( $( "select[name=country]" ).length ) {
		autofillCity( $( "select[name=country]" ).val() );

		$( "select[name=country]" ).on( "change", function() { autofillCity( $( this ).val() ); });		
	}
	
	//=> Création de compte - Gestion Pro
	let country = $('[name=country]');
	$(document).on('change','select[name=country]',(event) => showTVA());

	let showTVA = () => {
		let type = $('select[name=type]').val();

		// type :: particulier / association / entreprise / Professionnel
		if (['Professionnel'].includes(type)) {
			$('.tvaintra').show().find('input[type=text]').prop('required', true);

		} else {
			$('.tvaintra').hide().find('input[type=text]').prop('required', false);

		}

		if (['association', 'entreprise', 'Professionnel'].includes(type)) {
			$('.label-society').html($('select[name=type] :selected').text());
			$('.societe-pro').show().find('input[type=text]').prop('required', true);
			$('.societe-part').hide()
			$('.siret').show().find('input[type=text]').prop('required', true);

		} else {
			$('.societe-pro').hide().find('input[type=text]').prop('required', false);
			$('.societe-part').show()
			$('.siret').hide().find('input[type=text]').prop('required', false);

		}
	}
		
	$(document).on('change', 'select[name=type]',(event) => {
		//=> blocage FR
		'association' === $(event.currentTarget).val()
			? country.val(73).prop('disabled',true )
			: country.prop('disabled',false);
		showTVA();
	})

	//Review cookie
	if(readCookie('popupcookie')){
		var id = readCookie('popupcookie');
		$( "#product" + id ).find( ".popupIt" ).click();
		eraseCookie('popupcookie');
	}

})(jQuery);

function closeBarCookie(){
	$('#cookieAccept').parent().remove();
	createCookie('consentement_rgpd', true, 365);
	if(window.navigator.userAgent.indexOf("Edge") > -1){
		var heightHeader = $(".header").outerHeight(true);

		$( "#Woodbrass" ).css({ paddingTop:0, marginTop :heightHeader });
	}

}
function closeBarCookieMobile(){
	$('#cookieAcceptMobile').parent().remove();
	createCookie('consentement_rgpd', true, 365);

	if(window.navigator.userAgent.indexOf("Edge") > -1){
		var heightHeader = $(".header").outerHeight(true);

		$( "#Woodbrass" ).css({ paddingTop:0, marginTop :heightHeader });
	}
}

// Affichage du nombre de résultats pour les filtres (filter.php)
$(document).ready(function() {
	var result_search = $("#nbr_result_search").val();
	$('#affiche_result').parent().before('<div class="filter-result fwb clrGrisCM-sm tup lft fs12-lg lft-sm hidden-sm">'+result_search+'</div>');

	$('.shopInShopMenu .faded-btn').on('click', function () {
		$('#' + $(this).data('show')).show().siblings(':not( .shopInShopBg )').hide();
		$('.shopInShopMenu .faded-btn').removeClass('active');
		$('.shopInShopMenu .faded-btn').parent().removeClass('ActifTrait');
		$(this).addClass('active');
		$(this).parent().addClass('ActifTrait');
	});

	if (window.matchMedia("(max-device-width: 46.875rem)").matches) {
		document.querySelector(".header").addEventListener('scroll', function(e) {
			h = $(".header");
			if(h.scrollTop()>0)h.scrollTop(0);
		})
	}

});

function goUrl ( el ){
	window.location.href = el.val();
}
var filter_search = function(){
	form = $('form#fancy_filter').serializeArray();
	var data = {};
	$.each(form, function(k, v){
		data[v.name] = v.value;
	});
	data['get_url_result'] = '';
	$.post('/filter_search.php', data, function(res) {
		window.location.href = res;
	});
}

/* Scroll jusqu'à l'ancre */
function GoToAncre(ancre, offsetValue = 75){
	if(isNaN(offsetValue)) return
	let offset = $(ancre).offset().top;
	$('html, body').animate({scrollTop: (offset - offsetValue)}, 'slow');
}

/* Afficher et cacher des elements */
function hideShow(ancre, hiddenElement){
	if($(hiddenElement).length > 0 || $(ancre+':visible').length <= 0) {
		$(hiddenElement).hide();
		$(ancre).show();
	}
}

$(document).ready(function(){
	if(window.location.hash!=''){
		var ID = window.location.hash;
		var offset = $(ID).offset().top;
		$('html, body').animate({scrollTop: (offset-75)}, 'slow');
	}
});

$(window).scroll(function() {
	if ($(this).scrollTop() > 0) {
		$('.upHeaderMobile').hide();
	} else {
		$('.upHeaderMobile').show();
	}
});

$(".menu").on('click', function(event) {

	if(!$(this).hasClass('material-icons') && $(window).scrollTop() == 0){

		$('.upHeaderMobile').show();
	}
	else {
		$('.upHeaderMobile').hide();
	}
});

$(document).ready(function() {
	$(".swiperPagination .swiper-wrapper .swiper-slide").on( "click", function() {
		if($(this).hasClass('swiper-slide-active')){
			var URL=$(this).data('href');
			window.location.href = URL;
		}
	});
});

// HEADER MENU COLLAPSE

const $navMenu = $("#headerMenu");
const $autoNav = $("#autoNav");
const $autoNavMore = $("#autoNavMore");
const $autoNavMoreList = $("#autoNavMoreList");

const autoNavMore = () => {
	let childNumber = 2;
	const menuWidth = $navMenu.width();
	if(menuWidth <= 0) return;
	let elementsTotalWidth = 0;
	$autoNav.children().each(function() {
		elementsTotalWidth += $(this).width();
	});
	if(elementsTotalWidth > menuWidth - 200) {
		$autoNav.children(`li:nth-last-child(${childNumber})`)
			.prependTo($autoNavMoreList);
		autoNavMore();
	} else {
		const $autoNavMoreFirst = $autoNavMoreList.children("li:first-child").width();
		if (elementsTotalWidth + $autoNavMoreFirst < menuWidth) {
        	$autoNavMoreList.children("li:first-child").insertBefore($autoNavMore);
    	}
	}
	if ($autoNavMoreList.children().length > 0) {
      $autoNavMore.show();
      childNumber = 2;
    } else {
      $autoNavMore.hide();
      childNumber = 1;
    }
}

autoNavMore();
$(window).resize(autoNavMore);

function throttle(func, timeFrame) {
  var lastTime = 0;
  return function (...args) {
      var now = new Date();
      if (now - lastTime >= timeFrame) {
          func(...args);
          lastTime = now;
      }
  };
}

var lastScrollTop = 0;
$(window).scroll(function(event){
	if (window.matchMedia('(max-device-width: 46.875rem)').matches) {
		var st = $(this).scrollTop();
		if(st == 0) {
			$(".info-header").css({marginTop: 0});
			$(".header").css({marginTop: 0});
			$(".nav-container-mobile").css({marginTop: 0});
			$(".search-container-mobile").css({top: 51});
			$(".brands").css({top: 112});
			return;
		}

		if(st == lastScrollTop) return;

		if (st > lastScrollTop){
			$(".info-header").css({marginTop: -35});
			$(".nav-container-mobile").css({marginTop: -35});
			$(".header").css({top: -51});
			$(".search-container-mobile").css({top: 0});
			$(".brands").css({top: 63});
		} else {
			// upscroll code
			$(".header").css({top: 0});
			$(".search-container-mobile").css({top: 51});
			$(".brands").css({top: 112});
		}
		lastScrollTop = st;
		return;
	}
});

// placeholder dynamik
var SuperPlaceholder = function(options) {
		this.options = options;
		this.element = options.element;
		this.placeholderIdx = 0;
		this.charIdx = 0;


		this.setPlaceholder = function() {
			placeholder = options.placeholders[this.placeholderIdx];
			var placeholderChunk = placeholder.substring(0, this.charIdx+1);
			document.querySelector(this.element).setAttribute("placeholder", this.options.preText + " " + placeholderChunk)
		};

		this.onTickReverse = function(afterReverse) {
			if (this.charIdx === 0) {
				afterReverse.bind(this)();
				clearInterval(this.intervalId);
				this.init();
			} else {
				this.setPlaceholder();
				this.charIdx--;
			}
		};

		this.goReverse = function() {
			clearInterval(this.intervalId);
			this.intervalId = setInterval(this.onTickReverse.bind(this, function() {
				this.charIdx = 0;
				this.placeholderIdx++;
				if (this.placeholderIdx === options.placeholders.length) {
					this.placeholderIdx = 0;
				}
			}), this.options.speed)
		};

		this.onTick = function() {
			var placeholder = options.placeholders[this.placeholderIdx];
			if (this.charIdx === placeholder.length) {
				setTimeout(this.goReverse.bind(this), this.options.stay);
			}
			this.setPlaceholder();
			this.charIdx++;
		};

		this.init = function() {
			this.intervalId = setInterval(this.onTick.bind(this), this.options.speed);
		};

		this.kill = function() {
			clearInterval(this.intervalId);
		}
	};

var getFinancementAlma = function( id_div, data, style ){
    if($("#"+id_div).length == 0) return;
    if(! $("#"+id_div).is(":visible") ) return;

    $.post("alma_auto.php", {action : "getWidget", amount : data.amount, style : style, products: data.products}, function (opt){
        if(opt.boutons.length == 0) return;
        let html = "<div class=''><div class='col-24 alma-label'></div><div class='col-24 alma-btns pt10 pt5-sm "+(typeof style.align != "undefined"?style.align+" flex flexJustifyEnd":"lft")+"'></div></div>";
		$("#"+id_div).parent().find(".alma-or").removeClass("hide");
        $("#"+id_div).html(html);
        $.each(opt.boutons, function(k, b){
            let isLastElement = k == opt.boutons.length -1;
            let elem = $(b);
            if(isLastElement){
                elem.removeClass('bgBleu').addClass('bgRougeAlma');
                $("#"+id_div+" .alma-label").html(opt.labels[k]);
            }
            elem.hover(function(){
                $("#"+id_div+" .alma-label").html(opt.labels[k]);
                $("#"+id_div+" .alma-btns button").removeClass('bgRougeAlma').addClass('bgBleu');
                if(typeof style.align != "undefined" ) {
                    $("#" + id_div).css("max-width", $("#" + id_div + " div[id^=alma_label_]>span").width());
                }
                $(this).removeClass('bgBleu').addClass('bgRougeAlma');
            }, function (){})
            elem.click(function(){
                $("#"+id_div+" .alma-label").html(opt.labels[k]);
                $("#"+id_div+" .alma-btns button").removeClass('bgRougeAlma').addClass('bgBleu');
                if(typeof style.align != "undefined" ) {
                    $("#" + id_div).css("max-width", $("#" + id_div + " div[id^=alma_label_]>span").width());
                }
                $(this).removeClass('bgBleu').addClass('bgRougeAlma');
            })
            $("#"+id_div+" .alma-btns").append(elem)
        })
        let img = $(opt.image);
        $("#"+id_div+" .alma-btns").append(img)
        if(typeof style.align != "undefined" ) {
            $("#" + id_div).css("max-width", $("#" + id_div + " div[id^=alma_label_]>span").width());
        }

    }, "json")
}

var getAlmaWidgetGalery = function(class_tag){
    if($("."+class_tag).length == 0) return;

    $("."+class_tag+":visible").each(function (k, v){
        data = $(v).data('alma');
       amount = data.amount;
       style = $(v).data('style');
       if(amount>0) {
           $.post("alma_auto.php", {action: "getWidget", amount: amount, style: style, products: data.product }, function (opt) {
               div = $(v).parent();
               if (opt.labels.length == 0) return;
               let html = "<div class='col-24 alma-label'></div>";
               div.find(".alma-or").removeClass("hide");
               div.parent().find(".img-alma").removeClass("hide");
               div.find("." + class_tag).html(html);
               if (typeof style.align != "undefined") {
                   div.find("." + class_tag).css("max-width", div.find("." + class_tag + " div[id^=alma_label_]>span").width());
               }
               div.find("." + class_tag + " .alma-label").html(opt.labels[opt.labels.length - 1]);
           }, "json");
       }
    });

}

$(document).ready(function(){
	var text=$('#MotsPlaceholder').val();
	var textArray=text.split("|");
	var Pretext=$('#Pretext').val();
	var PretextArray=Pretext.split('|');
	var colorBandeau=PretextArray[0];
	$('body').append('<style>#MotRech::placeholder{color:'+colorBandeau+'}</style>');
	var sp = new SuperPlaceholder({
		placeholders: textArray,
		preText: PretextArray[1],
		stay: 100,
		speed: 100,
		element: '#MotRech'
	});
	sp.init();
    if($('#MotsPlaceholderMobile').length > 0 ){
        var textMobile=$('#MotsPlaceholderMobile').val();
        var textArrayMobile=textMobile.split("|");
        var PretextMobile=$('#PretextMobile').val();
        var PretextArrayMobile=PretextMobile.split('|');
        var colorBandeauMobile=PretextArrayMobile[0];
        $('body').append('<style>#MotRechMobile::placeholder{color:'+colorBandeauMobile+'}</style>');
        var sp = new SuperPlaceholder({
            placeholders: textArrayMobile,
            preText: PretextArrayMobile[1],
            stay: 100,
            speed: 100,
            element: '.MotRechMobile'
        });
        sp.init();
    }
    if($('#alma_financement') .length > 0) {
        getFinancementAlma("alma_financement", $("#alma_financement").data("alma"), $("#alma_financement").data("style") );
        getFinancementAlma("alma_financement-sm", $("#alma_financement-sm").data("alma"), $("#alma_financement-sm").data("style") );
    }
    getAlmaWidgetGalery("alma_widget");
});

/* Listing Produits Accordion */
let acc = document.getElementsByClassName("accordionDescListProds");

for (let i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		this.classList.toggle("active_accordion");
		let panel = this.previousElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
			scrollUp();
		} else {
			panel.style.maxHeight = panel.scrollHeight + 50 + "px";
		}
	});
};

// Scroll top à la fermeture du volet
function scrollUp(){
	let ancre = $('#ancreListProds').offset().top;
	$('html, body').animate({scrollTop: ancre - 100}, 600);
};


// Swiper Home 100% width
let windowWidth = 0;
let swiperHomeWidth = $('.swiperHome').width();

window.addEventListener("resize", swiperHomeFullWidth);
function swiperHomeFullWidth() {
	windowWidth = $( window ).width();
	if(windowWidth > swiperHomeWidth){
		let margin = -(windowWidth - swiperHomeWidth)/2;
		$('.swiperHome').css({
			"margin-left": margin,
			"margin-right": margin
		});
	} else {
		$('.swiperHome').css({
			"margin-left": 0,
			"margin-right": 0
		});
	};
	
};
swiperHomeFullWidth();

// Convertir des rem en pixels
function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}