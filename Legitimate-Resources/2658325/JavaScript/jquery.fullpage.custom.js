var fullpageConsoleLog,
	fullpageGetClasses,
	fullpageOnLeave,
	fullpageAfterLoad,
	fullpageAfterRender,
	fullpageAfterResize,
	fullpageAfterSlideLoad,
	fullpageSlideLeave,
	fullpageSetBackground,
	fullpageSetActiveMenuItem,
	fullpageParallaxInit,
	fullpageNextSectionIndex = -1,
	fullpageNextSlideIndex   = [],
	fullpageTranslateY,
	fullpageTranslateX,
	fullpageEl,
	fullpageSectionsEl,
	fullpageCompleteNavMenu,
	fullpageSideNavMenu,
	fullpageNavMenu,
	fullpageCompleteNavMenuLis,
	fullpageSideNavMenuLis,
	fullpageSectionsCount,
	fullpageSlidesCount = [],
	fullpageBackgroundImage,
	fullpageBackground,
	fullpageSectionBackgroundImage = [],
	fullpageSectionBackground      = [],
	fullpageSectionIndex           = -1,
	fullpageImageMaxTop,
	fullpageMaxTop,
	fullpageImageMaxLeft = [],
	fullpageMaxLeft      = []
;

( function( $ ) {

	$( function() {

		var logIndex = 1;

		fullpageEl                 = $( '#fullpage' );
		fullpageSectionsEl         = $( '.section' );
		fullpageCompleteNavMenu    = $( '#wpfp-menu' );
		fullpageSideNavMenu        = $( '#wpfp-sidemenu' );
		fullpageNavMenu            = $( '#fp-nav' );
		fullpageCompleteNavMenuLis = fullpageCompleteNavMenu.find( 'li' );
		fullpageSideNavMenuLis     = fullpageSideNavMenu.find( 'li' );
		fullpageSectionsCount      = fullpageSectionsEl.length;

		/**
		 * Console Log
		 *
		 * @param   {string}  message
		 *
		 * @return  {void}
		 */
		fullpageConsoleLog = function( message ) {

			if( console && console.log && 'yes' === fullPageParams.verboseMode ) {
				console.log( logIndex++ );
				console.log( message );
				console.log( '' );
			}

		}

		/**
		 * Get the elem classes
		 *
		 * @param   {jQuery}  elem
		 *
		 * @return  {string}
		 */
		fullpageGetClasses = function( elem ) {

			return '.' + elem.attr( 'class' )
				.replace( /  /g, ' ' )
				.replace( / /g, '.' );

		}

		/**
		 * On Section Leave
		 *
		 * @param   {int}     index      section index
		 * @param   {int}     nextIndex  next section index
		 * @param   {string}  direction
		 *
		 * @return  {void}
		 */
		fullpageOnLeave = function( index, nextIndex, direction ) {
			
			fullpageNextSectionIndex = nextIndex;

			if( 'yes' === fullPageParams.autoScrolling && fullpageEl.data( 'bg' ) !== '' )
				fullpageTranslateY( nextIndex );

			fullpageConsoleLog( 'WPFP On Leave' + "\n\t" + 'index: ' + index + "\n\t" + 'nextIndex: ' + nextIndex + "\n\t" + 'direction: ' + direction );

		}

		/**
		 * After Section Load
		 *
		 * @param   {string}  anchorLink  section anchor
		 * @param   {int}     index       section index
		 *
		 * @return  {void}
		 */
		fullpageAfterLoad = function( anchorLink, index ) {

			var section = fullpageSectionsEl.eq( index -1 );

			if( fullPageParams.bgLoadingMode === 'lazy-loading' ) {
				fullpageSetBackground( section, 'section', index );
			}

			fullpageSetActiveMenuItem();

			fullpageConsoleLog( 'WPFP After Load' + "\n\t" + 'anchorLink: ' + anchorLink + "\n\t" + 'index: ' + index );
		
		}

		/**
		 * After Fullpage Render
		 *
		 * @return  {void}
		 */
		fullpageAfterRender = function() {

			/**
			 * Init Parallax properties
			 */
			// Avoid the scroll bar width calculation issue
			if( 'no' === fullPageParams.autoScrolling || 'yes' === fullPageParams.scrollBar ) {
				setTimeout( function() { fullpageParallaxInit(); }, 200 );
			}
			else {
				fullpageParallaxInit();
			}

			/**
			 * If there is no Auto Scrolling
			 */
			if( 'no' === fullPageParams.autoScrolling ) {
				$( window ).scroll( fullpageTranslateY );
			}

			/**
			 * Initialising Backgrounds
			 */
			fullpageEl.each( function() {

				fullpageSetBackground( $( this ), 'fullpage' );

				if( fullPageParams.bgLoadingMode !== 'lazy-loading' ) {

					fullpageSectionsEl.each( function( index ) {

						fullpageSetBackground( $( this ), 'section', index + 1 );

						$( '.slide', this ).each( function() {

							fullpageSetBackground( $( this ) );
							
						} );

					} );
				}	

			} );
			

			fullpageSetActiveMenuItem();

			fullpageConsoleLog( 'WPFP After Render' );

		}

		/**
		 * After Screen Resize
		 *
		 * @return  {void}
		 */
		fullpageAfterResize = function() {
			
			var background = fullpageEl.data( 'bg' );
			
			if( 'yes' === fullPageParams.parallax ) {
				
				fullpageParallaxInit();

				if( 'undefined' !== typeof background && '' !== background ) {
					fullpageInitParallaxY( fullpageEl );

					fullpageTranslateY( fullpageNextSectionIndex );
				}

	
				fullpageSectionsEl.each( function( index ) {
					
					fullpageSectionIndex = index;

					background = $( this ).data( 'bg' );

					if( 'undefined' !== typeof background && '' !== background ) {
						fullpageInitParallaxX( $( this ), fullpageSectionIndex );

						fullpageTranslateX( fullpageSectionIndex, fullpageNextSlideIndex[ fullpageSectionIndex ] );
					}

				} );

				fullpageSectionIndex = -1;

			}

			fullpageConsoleLog( 'WPFP After Resize' );

		}

		/**
		 * After Slide Load
		 *
		 * @param   {string}  anchorLink   section anchor
		 * @param   {int}     index        section index
		 * @param   {string}  slideAnchor  slide anchor
		 * @param   {int}     slideIndex   slide index
		 *
		 * @return  {void}
		 */
		fullpageAfterSlideLoad = function( anchorLink, index, slideAnchor, slideIndex ) {

			var slide = fullpageSectionsEl.eq( index -1 ).find( '.slide' ).eq( slideIndex );

			if( fullPageParams.bgLoadingMode === 'lazy-loading' ) {
				fullpageSetBackground( slide, 'slide' );
			}

			fullpageSetActiveMenuItem();

			fullpageConsoleLog( 'WPFP After Slide Load' + "\n\t" + 'anchorLink: ' + anchorLink + "\n\t" + 'index: ' + index + "\n\t" + 'slideAnchor: ' + slideAnchor + "\n\t" + 'slideIndex: ' + slideIndex );

		}

		/**
		 * On Slide Leave
		 *
		 * @param   {string}  anchorLink   section anchor
		 * @param   {int}     index        section index
		 * @param   {int}     slideIndex   slide index
		 * @param   {string}  direction
		 *
		 * @return  {void}
		 */
		fullpageSlideLeave = function ( anchorLink, index, slideIndex, direction, nextSlideIndex ) {

			fullpageSectionIndex          = index;
			fullpageNextSlideIndex[index] = nextSlideIndex;
			
			if(  'yes' === fullPageParams.parallax && fullpageSectionsEl.eq( index -1 ).data( 'bg' ) !== '' ) {
				fullpageTranslateX( index, nextSlideIndex );
			}

			fullpageConsoleLog( 'WPFP Slide Leave' + "\n\t" + 'anchorLink: ' + anchorLink + "\n\t" + 'index: ' + index + "\n\t" + 'slideIndex: ' + slideIndex + "\n\t" + 'direction: ' + direction + "\n\t" + 'nextSlideIndex: ' + nextSlideIndex );

		}

		/**
		 * Parallax X Init
		 *
		 * @param   {jQuery}  elem
		 * @param   {int}     index            
		 * @param   {img}     backgroundImage  
		 * @param   {string}  background
		 *
		 * @return  {void}
		 */
		fullpageInitParallaxX = function ( elem, index, backgroundImage, background ) {

			if( 'undefined' === typeof windowWidth ) {
				setTimeout( function() { fullpageInitParallaxX( elem, index, backgroundImage, background ); }, 50 );
				return;
			}

			if( 'undefined' === typeof backgroundImage ) {
				backgroundImage = fullpageSectionBackgroundImage[ index ];
				background      = fullpageSectionBackground[ index ];
			} else {
				fullpageSectionBackgroundImage[ index ] = backgroundImage;
				fullpageSectionBackground[ index ]      = background;
			}

			if( 'undefined' !== typeof fullpageSectionBackgroundImage[ index ] && 1 < fullpageSlidesCount[ index ] ) {
				
				var imageWidth   = parseInt( backgroundImage.width ),
					imageHeight  = parseInt( backgroundImage.height ),
					imageNewWidth;
				
				imageNewWidth                 = fullpageSectionsEl.eq( index - 1 ).height() * imageWidth / imageHeight;
				fullpageImageMaxLeft[ index ] = windowWidth - imageNewWidth;

				elem.pseudoCss( ':before', {
					backgroundImage: 'url(' + background + ')',
					width: '100%',
					opacity: 1,
					backgroundSize: 'auto 100%',
					backgroundPosition: '0% 50%'
				} );

			} else if( 'undefined' !== typeof fullpageSectionBackgroundImage[ index ] ) {

				elem.pseudoCss( ':before', {
					backgroundImage : 'url(' + background + ')',
					opacity: 1
				} );

			}

			fullpageConsoleLog( 'WPFP Init Parallax X' + "\n\t" + 'elem: ' + fullpageGetClasses( elem ) + "\n\t" + 'elemBg: ' + background + "\n\t" + 'index: ' + index );

		}

		/**
		 * Parallax Y Init
		 *
		 * @param   {jQuery}  elem
		 * @param   {int}     index            
		 * @param   {img}     backgroundImage  
		 * @param   {string}  background
		 *
		 * @return  {void}
		 */
		fullpageInitParallaxY = function ( elem, backgroundImage, background ) {

			if( 'undefined' === typeof windowWidth || 'undefined' === typeof windowHeight ) {
				setTimeout( function() { fullpageInitParallaxY( elem, backgroundImage, background ); }, 50 );
				return;
			}

			if( 'undefined' === typeof backgroundImage ) {
				backgroundImage = fullpageBackgroundImage;
				background      = fullpageBackground;
			} else {
				fullpageBackgroundImage = backgroundImage ;
				fullpageBackground      = background;
			}

			if( 'undefined' !== typeof fullpageBackgroundImage && 1 < fullpageSectionsCount ) {
				
				var imageWidth   = parseInt( backgroundImage.width ),
					imageHeight  = parseInt( backgroundImage.height ),
					imageNewHeight,
					height;

				if( 'yes' === fullPageParams.autoScrolling )
					height = ( fullpageSectionsCount * 100 ) + '%';
				else
					height = '100%';
				
				imageNewHeight = windowWidth * imageHeight / imageWidth;
				fullpageImageMaxTop    = fullpageSectionsCount * windowHeight - imageNewHeight;

				if( '' !== elem.data( 'bg' ) )
					elem.pseudoCss( ':before', {
						backgroundImage: 'url(' + background + ')',
						//height: "1"+height,
						opacity: 1,
						backgroundSize: '100% auto',
						backgroundPosition: '50% 0%'
					} );

			} else if( 'undefined' !== typeof fullpageBackgroundImage ) {

				elem.pseudoCss( ':before', {
					backgroundImage : 'url(' + background + ')',
					opacity: 1
				} );

			}

			fullpageConsoleLog( 'WPFP Init Parallax Y' + "\n\t" + 'elem: ' + fullpageGetClasses( elem ) + "\n\t" + 'elemBg: ' + background );

		}

		/**
		 * Init Background
		 *
		 * @param   {jQuery}  elem  
		 * @param   {string}  type  
		 * @param   {int}     index
		 *
		 * @return  {void}
		 */
		fullpageSetBackground = function( elem, type, index ) {

			var background = elem.data( 'bg' );

			if( 'undefined' !== typeof background && '' !== background && 'loaded' !== background ) {
				
				var backgroundImage = new Image();

				backgroundImage.onload = function() {

					if( 'yes' === fullPageParams.parallax && 'fullpage' === type ) {

						fullpageInitParallaxY( elem, backgroundImage, background );

					}
					else if( 'yes' === fullPageParams.parallax && 'section' === type ) {

						fullpageInitParallaxX( elem, index, backgroundImage, background );

					}
					else {

						elem.pseudoCss( ':before', {
							backgroundImage : 'url(' + background + ')',
							opacity: 1
						} );

					}

					elem.data( 'bg', 'loaded' );
					setTimeout( function() { 
						elem.addClass( 'bg-loaded' )
					}, fullPageParams.scrollingSpeed );

					fullpageConsoleLog( 'WPFP Set Background' + "\n\t" + 'elem: ' + fullpageGetClasses( elem ) + "\n\t" + 'elemBg: ' + background + "\n\t" + 'type: ' + type + "\n\t" + 'index: ' + index );

				}

				backgroundImage.src = background;

			}

		}

		/**
		 * Init Parallax properties
		 *
		 * @return  {void}
		 */
		fullpageParallaxInit = function() {

			windowWidth  = parseInt( $( window ).width() );
			windowHeight = parseInt( $( window ).height() );
			fullpageMaxTop       = ( fullpageSectionsCount - 1 ) * windowHeight;

			fullpageSectionsEl.each( function( index ) {

				var slides = $( '.slide', this );

				fullpageSlidesCount[ index + 1 ] = slides.length;
				
				fullpageMaxLeft[ index + 1 ] = ( fullpageSlidesCount[ index + 1 ] - 1 ) * windowWidth;

			} );

			fullpageConsoleLog( 'WPFP Parallax Init' );
			
		}

		/**
		 * Translate Y
		 * 
		 * @param   {int}     nextIndex   next section index
		 *
		 * @return  {void}
		 */
		fullpageTranslateY = function( nextIndex ) {

			var y,
				bgVPosition
			;
			
			if( 'yes' === fullPageParams.autoScrolling )
				y = innerHeight * ( nextIndex - 1 );
			else
				y = parseInt( $( window ).scrollTop() );

			if( 'undefined' === typeof fullpageImageMaxTop && 'loaded' != fullpageEl.data( 'bg' ) ) {
				
				setTimeout( function() { fullpageTranslateY( nextIndex ) }, 20 );
			
			}
			else if( 'undefined' !== typeof fullpageImageMaxTop ) {

				// Fix the scroolbar issue...
				bgVPosition = ( y * fullpageImageMaxTop / fullpageMaxTop ) + 'px';

				fullpageEl.pseudoCss( ':before', {
					backgroundPosition: '50% ' + bgVPosition
				} );
				
			}

			fullpageConsoleLog( 'fullpageTranslateY' + "\n\t" + 'y: ' + y + "\n\t" + 'nextIndex: ' + nextIndex + "\n\t" + 'bgVPosition: ' + bgVPosition );

		}

		/**
		 * Translate X
		 *
		 * @param   {int}     index            section index
		 * @param   {int}     nextSlideIndex   next slide index
		 * 
		 * @return  {void}
		 */
		fullpageTranslateX = function( index, nextSlideIndex ) {

			var x,
				section = fullpageSectionsEl.eq( index - 1 ),
				bgHPosition
			;

			x = innerWidth * nextSlideIndex;

			if( ! isNaN( x ) ) {
				if( 'undefined' === typeof fullpageImageMaxLeft[ index ] && 'loaded' != section.data( 'bg' ) ) {
				
					setTimeout( function() { fullpageTranslateX( index, nextSlideIndex ) }, 20 );
				
				}
				else if( 'undefined' !== typeof fullpageImageMaxLeft[ index ] ) {
					
					// Fix the scroolbar issue...
					bgHPosition = ( x * fullpageImageMaxLeft[ index ] / fullpageMaxLeft[ index ] ) + 'px';

					section.pseudoCss( ':before', {
						backgroundPosition: bgHPosition + ' 50%'
					} );
				
				}		
			}

			fullpageConsoleLog( 'fullpageTranslateX' + "\n\t" + 'x: ' + x + "\n\t" + 'index: ' + index + "\n\t" + 'nextSlideIndex: ' + nextSlideIndex + "\n\t" + 'bgHPosition: ' + bgHPosition );

		}

		/**
		 * Set the active menu item
		 *
		 * @return  {void}
		 */
		fullpageSetActiveMenuItem = function() {

			fullpageCompleteNavMenuLis.removeClass( 'active' );
			fullpageSideNavMenuLis.removeClass( 'active' );

			// Set active menu items when hash is empty and anchors are not locked
			if( '' === location.hash && 'no' === fullPageParams.lockAnchors ) {
				fullpageCompleteNavMenuLis.first().addClass( 'active' );
				fullpageSideNavMenuLis.first().addClass( 'active' );

				fullpageNavMenu.find( 'li.active a' ).addClass( 'active' );
				$( 'li.active a', fullpageNavMenu ).addClass( 'active' );
				$( '.fp-slidesNav li:first-child a', fullpageSectionsEl.first() ).addClass( 'active' );

				fullpageConsoleLog( 'WPFP Set Active Menu Item' + "\n\t" + 'no hash' + "\n\t" + 'First section selected.' + "\n\t" + 'First slide selected.' );

				return;
			}

			$( 'a[data-href="' + location.hash + '"], a[href="' + location.hash + '"]', fullpageCompleteNavMenu ).parents( 'li' )
				.addClass( 'active' );

			$( 'a[data-href="' + location.hash + '"], a[href="' + location.hash + '"]', fullpageSideNavMenu ).parents( 'li' )
				.addClass( 'active' );

			var sectionHash = location.hash.split( '/' );

			$( 'a[data-href="' + sectionHash[0] + '"], a[href="' + sectionHash[0] + '"]', fullpageNavMenu )
				.addClass( 'active' );

			$( 'a[data-href="' + sectionHash[0] + '"], a[href="' + sectionHash[0] + '"]', fullpageSideNavMenu )
				.addClass( 'active' );

			fullpageConsoleLog( 'WPFP Set Active Menu Item' + "\n\t" + 'sectionHash: ' + sectionHash[0] + "\n\t" + 'hash: ' + location.hash );

		};

		/**
		 * Navigation Materialize tooltips
		 */
		$( '.tooltipped' ).m_tooltip( { delay: 50 } );

		/**
		 * Complete navigation Menu 
		 */
		$( '#wpfp-menu a' ).on( 'click touchstart', function(){

			var section = $( this ).data( 'section' );
			var slide   = $( this ).data( 'slide' );

			if( 'undefined' !== typeof( section ) && 'undefined' !== typeof( slide ) )
				$.fn.fullpage.moveTo( section, slide );

		} );

		$( '.dropdown-button' ).dropdown( {
			constrain_width: false, // Does not change width of dropdown to that of the activator
			hover: true, // Activate on hover
		} );	

		/**
		 * Burger Menu
		 */
		$( '.button-collapse' ).sideNav();
		
		fullpageConsoleLog( 'WPFP DOM Ready!' );

	} );

} )( jQuery );
