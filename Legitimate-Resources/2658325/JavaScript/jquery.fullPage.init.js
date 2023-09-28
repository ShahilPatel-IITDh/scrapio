
( function( $ ) {

	$( function() {

		/**
		 * Convert templates into proper css before initiating the fullPage
		 */
		var style             = $( '<style type="text/css" media="screen" />' ),
			head              = $( 'head' ),
			wpfpDynamicCssTpl = $( '#wpfp-dynamic-css' )
		;

		// insert template text into the style markup
		style.text( wpfpDynamicCssTpl.text() );

		// Append style to head
		head.append( style );

		// Remove template
		wpfpDynamicCssTpl.remove();

		/**
		 * Now we can init the fullPage
		 */
		$( '#fullpage' ).fullpage( {
			
			// Navigation
			menu: '#fp-nav',
			anchors: fullPageParams.anchors,
			navigation: false,
			slidesNavigation: false,
			lockAnchors: fullPageParams.lockAnchors == 'yes' ? true : false,

			// Scrolling
			css3: fullPageParams.css3 == 'yes' ? true : false,
			scrollingSpeed: parseInt( fullPageParams.scrollingSpeed ),
			autoScrolling: fullPageParams.autoScrolling == 'yes' ? true : false,
			easing: fullPageParams.easing,
			easingcss3: '',
			loopBottom: fullPageParams.loopBottom == 'yes' ? true : false,
			loopTop: fullPageParams.loopTop == 'yes' ? true : false,
			loopHorizontal: fullPageParams.loopHorizontal == 'yes' ? true : false,
			continuousVertical: fullPageParams.continuousVertical == 'yes' ? true : false,
			normalScrollElements: fullPageParams.normalScrollElements,
			scrollOverflow: fullPageParams.scrollOverflow == 'yes' ? true : false,
			touchSensitivity: parseInt( fullPageParams.touchSensitivity ),
			normalScrollElementTouchThreshold: fullPageParams.normalScrollElementTouchThreshold,
			fitToSection: fullPageParams.fitToSection == 'yes' ? true : false,
			fitToSectionDelay: parseInt( fullPageParams.fitToSectionDelay ),
			scrollBar: fullPageParams.scrollBar == 'yes' ? true : false,

			// Accessibility
			keyboardScrolling: fullPageParams.keyboardScrolling == 'yes' ? true : false,
			animateAnchor: fullPageParams.animateAnchor == 'yes' ? true : false,
			recordHistory: fullPageParams.recordHistory == 'yes' ? true : false,

			// Design
			verticalCentered: true,
			resize : fullPageParams.resize == 'yes' ? true : false,
			paddingTop: fullPageParams.paddingTop,
			paddingBottom: fullPageParams.paddingBottom,
			fixedElements: fullPageParams.fixedElements,
			responsiveWidth: parseInt( fullPageParams.responsiveWidth ),			
			responsiveHeight: parseInt( fullPageParams.responsiveHeight ),			

			// Custom selectors
			sectionSelector: '.section',
			slideSelector: '.slide',

			// Events
			onLeave: function( index, nextIndex, direction ) {

				fullpageOnLeave( index, nextIndex, direction );
				eval( fullPageParams.onLeave );

			},

			afterLoad: function( anchorLink, index ) {

				fullpageAfterLoad( anchorLink, index );
				eval( fullPageParams.afterLoad );
				
			},

			afterRender: function() {

				fullpageAfterRender();
				eval( fullPageParams.afterRender );
				
			},

			afterResize: function() {

				fullpageAfterResize();
				eval( fullPageParams.afterResize );
				
			},

			afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex ) {

				fullpageAfterSlideLoad( anchorLink, index, slideAnchor, slideIndex );
				eval( fullPageParams.afterSlideLoad );

			},

			onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex ) {

				fullpageSlideLeave( anchorLink, index, slideIndex, direction, nextSlideIndex );
				eval( fullPageParams.onSlideLeave );

			}

		} );

		eval( fullPageParams.onDomReady );

	} );

} )( jQuery );