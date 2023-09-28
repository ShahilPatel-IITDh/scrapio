/**
 * File: visitor-tracking.js
 *
 * Visitor Tracking Functions.
 * @since May 25, 2021
 * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
 */

// Make sure everything is loaded first.
if ( ( 'complete' === document.readyState || 'loading' !== document.readyState ) && ! document.documentElement.doScroll ) {
	visitorTrackingInit();
} else {
	document.addEventListener( 'DOMContentLoaded', visitorTrackingInit );
}

/**
 * Get & set some defaults.
 *
 * @since May 25, 2021
 * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
 */
function visitorTrackingInit() {
  const visitorTrackingSettings = window.visitor_tracking_params;

  let cscCookie = getCookie( 'csc' );
  cscCookie = ( cscCookie !== null && cscCookie !== undefined) ? cscCookie : false;
  let lastEventCookie = getCookie( 'last-event' );
  lastEventCookie = ( lastEventCookie !== null && lastEventCookie !== undefined) ? lastEventCookie : false;
  const siteType        = visitorTrackingSettings && visitorTrackingSettings.platform;
  const randString      = Math.random().toString(16).substr(2, 12);
  const currentDomain   = window.location.hostname.replace(/^www\./g, '.');
  const unixTimestamp   = Date.now();
  const trackBaseUrl    = visitorTrackingSettings && visitorTrackingSettings.base_url ? visitorTrackingSettings.base_url.replace( /\/$/, '' ) : null;

  if ( ! siteType || ! trackBaseUrl ) {
	window.console.error( 'Error: `window.visitor_tracking_params` not defined or missing some options.' );

	return;
  }

  const trackUrl = `${trackBaseUrl.replace(/\/$/g, '')}/trackVisit.trace${unixTimestamp}`;

  if ( ! cscCookie ) {
    // The cookie doesn't exist, create it.
    setCookie( 'csc', `${siteType}-${randString}${unixTimestamp}; domain=${currentDomain}; path=/` );
  }

  if ( ! lastEventCookie ) {
    // Set the expiry time to 12 hours from now.
    const expires = ( new Date( Date.now() + 12 * 60 * 60 * 1000 ) ).toUTCString();

    // Set a cookie to track the last event.
    setCookie( 'last-event', `${unixTimestamp}; expires=${expires};` );

    // Track the visit.
    trackVisitRequest( trackUrl );
  }

  /**
   * Set a cookie.
   *
   * @since May 26, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function setCookie( cookieName, cookieValue ) {
    // Create a cookie
    document.cookie = `${cookieName}=${cookieValue}`;
  }

  /**
   * Get cookie data.
   *
   * @since May 25, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function getCookie( name ) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split( ';' );

    // Loop through the array elements
    for( var i = 0; i < cookieArr.length; i++ ) {
        var cookiePair = cookieArr[i].split( '=' );

        // Remove whitespace at the beginning of the cookie name and compare it with the given string
        if( name == cookiePair[0].trim() ) {
            // Decode the cookie value and return
            return decodeURIComponent( cookiePair[1] );
        }
    }

    // Return null if not found
    return null;
  }

  /**
   * Do the POST Request.
   *
   * @since May 25, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function trackVisitRequest( requestUrl ) {
    fetch( requestUrl, {
        method: 'GET',
      }
    )
    .then( ( res ) => {
      const status = res.status;

      // Forbidden.
      if ( 200 !== status ) {
        console.warn( '40X, 50X: Forbidden' );
      }
    } )
  }
}
