jQuery( window ).on( 'load', function() {
	/* global authorsListAjaxSearch */
	if ( typeof authorsListAjaxSearch !== 'undefined' ) {
		const buttonClick = jQuery( '.authors-list-search-filter-submit' );
		const numberRange = buttonClick.closest( '.authors-list-ajax-filter' ).find( '.authors-list-number-range' );

		jQuery.each( numberRange, function( index, value ) {
			const numberRangeHolder = jQuery( value ).find( '.authors-list-number-range-holder' );
			const minRange = jQuery( numberRangeHolder ).data( 'min' );
			const maxRange = jQuery( numberRangeHolder ).data( 'max' );
			const numberSelectedElem = jQuery( value ).find( 'input[type="hidden"]' );
			const rangeRender = jQuery( this ).find( '.authors-list-ranges' );
			const rangeMinRender = rangeRender.find( '.authors-list-min-range' );
			const rangeMaxRender = rangeRender.find( '.authors-list-max-range' );

			// For the number slider range.
			numberRangeHolder.slider( {
				range: true,
				min: minRange,
				max: maxRange,
				values: [ minRange, maxRange ],
				slide: function( event, ui ) {
					// Update the HTMl to display the number ranges on slide change.
					jQuery( rangeMinRender ).html( ui.values[ 0 ] );
					jQuery( rangeMaxRender ).html( ui.values[ 1 ] );
					// Pass the value to the hidden type input for processing in Ajax request.
					numberSelectedElem.val( ui.values );
				},
			} );
		} );

		buttonClick.on( 'click', function( event ) {
			event.preventDefault();
			const parentElem = jQuery( this ).closest( '.authors-list-ajax-filter' );
			const loopElem = parentElem.next( '.authors-list-items' );
			const ajaxSelectFilters = parentElem.find( '[class*="metadata"]' );
			let className = '';
			let inputType = '';
			const checkboxexValues = [];
			const ajaxFiltersData = {};

			// Add `authors-list-ajax-loading` class for button click event on main div.
			loopElem.addClass( 'authors-list-ajax-loading' );

			jQuery.each( ajaxSelectFilters, function( index, value ) {
				className = jQuery( value ).attr( 'class' );
				className = className.replace( 'authors-list-search-', '' ).replace( '-metadata', '' );
				inputType = jQuery( value ).attr( 'type' );
				if ( 'checkbox' === inputType ) {
					const checked = jQuery( value ).is( ':checked' );
					if ( true === checked ) {
						checkboxexValues.push( jQuery( value ).val() );
						checkboxexValues.join();
						// Assign the output data to an object.
						ajaxFiltersData[ className ] = Object.assign( {}, checkboxexValues );
					}
				} else if ( 'radio' === inputType ) {
					const checked = jQuery( value ).is( ':checked' );
					if ( true === checked ) {
						// Assign the output data to an object.
						ajaxFiltersData[ className ] = jQuery( value ).val();
					}
				} else {
					// Assign the output data to an object.
					ajaxFiltersData[ className ] = jQuery( value ).val();
				}
			} );

			jQuery.ajax( {
				type: 'post',
				dataType: 'json',
				url: authorsListAjaxSearch.ajaxurl,
				data: {
					action: 'update_authors_list_ajax',
					authorsListNonce: authorsListAjaxSearch.nonce,
					shortcode: parentElem.find( '.authors-list-search-shortcode' ).val(),
					searchParam: parentElem.find( '.authors-list-search-input' ).val(),
					searchColumn: parentElem.find( '.authors-list-search-column' ).val(),
					ajaxFiltersData,
				},
				beforeSend: function() {
					loopElem.find( '.spinner' ).show();
				},
				success: function( response ) {
					if ( true === response.success ) {
						loopElem.html( response.data );
					}
				},
				complete: function( jqXHR, textStatus ) {
					if ( 'success' === textStatus ) {
						// Remove `authors-list-ajax-loading` class when the Ajax loading is successfully done from main div.
						loopElem.removeClass( 'authors-list-ajax-loading' );
						loopElem.find( '.spinner' ).hide();
					}
				},
			} );
		} );
	}
} );
