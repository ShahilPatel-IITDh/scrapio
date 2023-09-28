( function ( window, document, $, undefined ) {

	var WCCH = {

		init: function () {
			WCCH.trackHistory();
		},

		trackHistory: function () {
			$.ajax({
				type: "POST",
				url: wcch.ajaxUrl,
				data: {
					action: 'wcch_track_history',
					page_url: wcch.currentUrl,
					referrer: document.referrer
				},
				success: function ( response ) {
					// if ( window.console && window.console.log ) {
					// 	console.log( response );
					// }
				}

			}).fail( function ( response ) {
				// if ( window.console && window.console.log ) {
				// 	console.log( response );
				// }
			});
		}
	};

	WCCH.init();

})( window, document, jQuery );
