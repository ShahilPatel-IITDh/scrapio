
( function () {
	if ( 'requestIdleCallback' in window ) {
		var randNumber = Math.random();
		if ( randNumber <= parseFloat( window.webVitalsAnalyticsData.chance ) ) {
			window.addEventListener( 'load', function() {
				setTimeout( function() {
					requestIdleCallback( function() {
						webVitalsAnalyticsScript = document.querySelector( 'script[data-src*="web-vitals-analytics."]' );
						webVitalsAnalyticsScript.src = webVitalsAnalyticsScript.dataset.src;
						delete webVitalsAnalyticsScript.dataset.src;
					} );
				}, 5000 );
			});
		}
	}
} )();
