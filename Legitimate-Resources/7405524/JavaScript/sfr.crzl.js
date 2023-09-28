(function($) {
	$.fn.crzl = function(options) {

		/***************************************************************
		* DEFAULT 
		***************************************************************/
		var settings = $.extend( {
	      "animation" : "slideVert",
	      "timing"	  : 500,
	      "forceWidth" : null,
	      "forceHeight" : null,
	      "autoplay" : false,
	      "delay" : 3000,
	      "navigationCallback" : null,
	      "slideCallback" : null,
	      "slideCallbackDefault" : null
	    }, options);

		return this.each(function() {

			var carrousel = {
			$C : null,
			$CS : null,
			$CN : null,
			$CA : null,
			cWidth : 0 ,
			cHeight : 0 ,
			current : 0 ,
			numOfItems : 0 ,
			busy : false ,
			autoplayEnabled : false ,
			delay : 3000,


			transitions : {
				fade : function ($prev, $next) {
					if (!carrousel.busy) {
					$prev.css({"z-index":1}) ;
					$next.stop().css({"z-index":2}).fadeIn(settings.timing,
						function()
							{
								$(this).addClass("active"); 
								$prev.hide().removeClass("active");
								carrousel.busy = false;
							}
						) ;
					}
				},
				slideHorz : function ($prev, $next, idx_A, idx_B) {
					if (!carrousel.busy) {
					var time = settings.timing ;
					var A = -carrousel.cWidth ;
					var B = 0 ;
					var C = carrousel.cWidth ;

					if (idx_A) {
						if (idx_A > idx_B) {
							A = carrousel.cWidth ;
							B = 0 ;
							C = -carrousel.cWidth ;
						}
					}

					$prev.stop().css({"z-index":1}).animate(
						{"left": A},
						time) ;
					$next.stop().css({"z-index":2,"left":C}).show().animate(
						{"left": B},
						time,
						function()
							{
								$(this).addClass("active"); 
								$prev.removeClass("active");
								carrousel.busy = false;
							}
						) ;
					}
				},
				slideVert : function ($prev, $next, idx_A, idx_B) {
					if (!carrousel.busy) {
						var time = settings.timing ;
						var A = -carrousel.cHeight ;
						var B = 0 ;
						var C = carrousel.cHeight ;

						if (idx_A) {
							if (idx_A > idx_B) {
								A = carrousel.cHeight ;
								B = 0 ;
								C = -carrousel.cHeight ;
							}
						}

						$prev.stop().css({"z-index":1}).animate(
							{"top": A},
							time
						) ;
						
						$next.stop().css({"z-index":2,"top":C}).show().animate(
							{"top": B},
							time,
							function()
								{
									$(this).addClass("active"); 
									$prev.removeClass("active");
									carrousel.busy = false;
								}
						) ;
					}
				},
				rotateVert : function ($prev, $next, idx_A, idx_B) {
					if (!carrousel.busy) {

						var border = carrousel.$C.css("border") ;
						carrousel.$C.css({
							"background-color":"transparent",
							"-webkit-perspective": "800",
						    "-webkit-perspective-origin": "50% 50%",
							"-webkit-transform-style": "preserve-3d",
							"border":"none"
						}) ;

						//carrousel.$CS.css({"border", border});

						var $cube = carrousel.$C.children("ul.slide") ;

						$cube.css({
							//"-webkit-perspective": "800",
						    //"-webkit-perspective-origin": "50% 50%",
							"-webkit-transform-style": "preserve-3d",
							"overflow":"visible",
							"background-color":"transparent",
							"-webkit-transform" : "translateZ(-"+(carrousel.cHeight/2)+"px) "
						});

						var $front = $prev ;

						$front.css({
							//"-webkit-perspective": "800",
						    //"-webkit-perspective-origin": "50% 50%",
							"-webkit-transform-style": "preserve-3d",
							//"-webkit-transition" : "-webkit-transform 1s ease-out",
							"-webkit-transform" : "translateZ("+(carrousel.cHeight/2)+"px)"
						});

						var $bottom = $next ;

						$bottom.show().css({
							//"-webkit-perspective": "800",
						    //"-webkit-perspective-origin": "50% 50%",
							"-webkit-transform-style": "preserve-3d",
							//"-webkit-transition" : "-webkit-transform 1s ease-out",

							"-webkit-transform" : "rotateX(-90deg) translateZ("+(carrousel.cHeight/2)+"px)"
						});


						setTimeout(
							function(){
								$cube.css({
								//"-webkit-perspective": "800",
							    //"-webkit-perspective-origin": "50% 50%",
								"-webkit-transition" : "-webkit-transform 1s ease-out",
								"-webkit-transform" : "translateZ(-"+(carrousel.cHeight/2)+"px) rotateX(90deg)"
							});
							}
						)
						

					}
				}
			},
			_init : function(elt) {
				// Plugin
				this.$C = $(elt);
				// Slides
				this.$CS = this.$C.children("ul.slide").children("li");
				// Nav
				this.$CN = this.$C.children("ul.nav").children("li");
				// ARROW ?
				this.$CA = this.$C.children(".cArrows").children("a") ;

				this.numOfItems = this.$CS.length ;

				this.autoplayEnabled = settings.autoplay ;
				this.delay = settings.delay ; 


				this.cWidth = this.$C.width();
				if (settings.forceWidth) {
					this.cWidth = settings.forceWidth ;
				}

				this.cHeight = this.$C.height();
				if (settings.forceHeight) {
					this.cHeight = settings.forceHeight ;
				}
				

				
					
				this.prevArrow = this.$CA.eq(1) ;
				this.nextArrow = this.$CA.eq(0) ;
				if (this.$CA.eq(0).hasClass("prev")) 
				{
					this.prevArrow = this.$CA.eq(0) ;
					this.nextArrow = this.$CA.eq(1) ;
				}
					
				if (carrousel.current == 0) {
					this.prevArrow.hide() ;
				}


				this.$CN.eq(carrousel.current).addClass("active") ;
				this.$CS.eq(carrousel.current).addClass("active") ;
				this.$CN.click(carrousel.click) ;
				this.$CA.click(carrousel.jump) ;


				if (this.autoplayEnabled) this.autoplay() ;

			},
			click : function() {
				if (!carrousel.busy) {

					if ($(this).hasClass("active")) return true ;
					carrousel.$CN.removeClass('active') ;
					carrousel.$CN.eq($(this).index()).addClass('active') ;
					carrousel.switchto($(this).index()) ;
					carrousel.autoplayEnabled = false;
					
					if (settings.navigationCallback && $(this).hasClass("callback") ) {
						settings.navigationCallback() ;
					}

					return false ;

				} else {
					return false;
				}
			},
			jump : function() {
				
				var nextSlide = 0 ;
				
				carrousel.$CA.show() ;

				
				
				if ($(this).hasClass("prev"))
				{
					if (carrousel.current>0){
						nextSlide = carrousel.current - 1;
						carrousel.nextArrow.show(); 
						if (nextSlide == 0 ) carrousel.prevArrow.hide(); 
					}
					else {
						nextSlide = carrousel.$CS.length - 1 ;
					}
				}
				else
				{
					if (carrousel.current >= carrousel.$CS.length - 1)
					{
						nextSlide = 0;
					}	
					else {
						nextSlide = carrousel.current + 1 ;
						carrousel.prevArrow.show(); 
						if (nextSlide == carrousel.$CS.length-1 ) carrousel.nextArrow.hide(); 
					}
				}

				carrousel.switchto(nextSlide) ;
				return false;
			},
			autoplay : function() {
					setTimeout(function(){
						if (carrousel.autoplayEnabled == true) {
							var next =  carrousel.current + 1 ;
							if (next >= carrousel.numOfItems ) {
								next = 0 ;
							}
							carrousel.switchto(next) ;
							carrousel.autoplay() ;
						}
					}, carrousel.delay);


			},
			switchto : function(idx) {
				//var $current = carrousel.$C.find("ul.slide li.active") ;
				var $current = carrousel.$CS.eq(carrousel.current);
				var $next  	 = carrousel.$CS.eq(idx) ;
				
				if ($next.hasClass("callback") && settings.slideCallback ) {
					settings.slideCallback() ;
				}else{
					if (settings.slideCallbackDefault)  settings.slideCallbackDefault();
				}


				

				
				if (carrousel.current != idx ) {
					carrousel.transitions[settings.animation]($current, $next, carrousel.current, idx)
					carrousel.current = idx ;
					carrousel.busy = true;

					if (carrousel.$CN.length > 0) {
						carrousel.$CN.removeClass("active");
						carrousel.$CN.eq(carrousel.current).addClass("active"); 
					}
				}
			}
		};


			carrousel._init(this);
		});
	};
})($sfr);