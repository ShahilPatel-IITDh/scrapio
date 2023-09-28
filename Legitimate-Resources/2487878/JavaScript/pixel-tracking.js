/**
 * File: pixel-tracking.js
 *
 * Pixel Tracking Functions.
 * @since May 21, 2021
 * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
 */

// Make sure everything is loaded first.
if (
	( 'complete' === document.readyState || 'loading' !== document.readyState ) &&
  ! document.documentElement.doScroll
) {
	pixelTrackingInit();
} else {
	document.addEventListener( 'DOMContentLoaded', pixelTrackingInit );
}

window.pixelTrackingInitEvent = new Event( 'pixelTrackingInitEvent' );

// Listen for the event.
document.addEventListener( 'pixelTrackingInitEvent', function() {
	pixelTrackingInit();
}, false );

/**
 * Get & set some defaults.
 *
 * @since May 21, 2021
 * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
 */
function pixelTrackingInit() {
	if ( window.OptanonActiveGroups && ! window.OptanonActiveGroups.split( ',' ).includes( 'C0002' ) ) {
		return;
	}

	const pixelTrackingSettings = window.pixel_tracking_params;

	const trackBaseUrl = pixelTrackingSettings && pixelTrackingSettings.base_url ? pixelTrackingSettings.base_url.replace( /\/$/, '' ) : null;

	if ( ! trackBaseUrl ) {
		window.console.error( 'Error: `window.pixel_tracking_params` not defined or missing some options.' );

		return;
	}

	let cscCookie = getCookie( 'csc' );
	cscCookie = ( cscCookie !== null && cscCookie !== undefined) ? cscCookie : '';
	const crWp = pixelTrackingSettings.cr_wp;
	const requestUrl = `${trackBaseUrl}/analytics`;

	const pixelObject = {
		appName: `Care.com ${ isMobile() ? `Mobile` : `Desktop` } Web`,
		deviceInfo: {
			osVersion: navigator.userAgent,
			screenResolution: `${ screen.availWidth }x${ screen.availHeight }`,
			deviceClass: isTablet() ? 'TABLET' : isMobile() ? 'MOBILE' : 'DESKTOP',
		},
		memberInfo: {
			memberId: crWp && crWp.mi ? crWp.mi : '',
			sessionZipCode: crWp && crWp.zip ? crWp.zip : '',
			ipAddress: pixelTrackingSettings.ip_address,
			visitorId: cscCookie,
		},
		dispatchTime: new Date(),
		logs: [
			{
				type: 'event',
				session: cscCookie,
				eventType: 'PageView',
				creationTime: new Date(),
				isSystemGenerated: false,
				eventLocation: window.location.toString(),
				previousEventLocation: document.referrer,
				eventName: 'communityPageView',
				eventAttributes: {},
				languageCode: crWp && crWp.lc ? crWp.lc : 'en-us',
				pageTypeId: pixelTrackingSettings.page_type_id,
				vertical: pixelTrackingSettings.vertical,
				subVertical: pixelTrackingSettings.subvertical,
				memberType: crWp && crWp.mt ? crWp.mt : '',
			},
		],
	};

	pixelTrackRequest( requestUrl, pixelObject );

	/**
   * Check the Useragent string to determine if device is a mobile.
   *
   * @since May 21, 2021
   * @author Care.com
   */
	function isMobile() {

		// Adapted from: http://detectmobilebrowsers.com/
		const ua = navigator.userAgent || navigator.vendor || window.opera;
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				ua
			) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      	ua.substr( 0, 4 )
      )
		) {
			return true;
		}
	}

	/**
   * Get cookie data.
   *
   * @since May 25, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
	function getCookie( name ) {

		// Split cookie string and get all individual name=value pairs in an array
		const cookieArr = document.cookie.split( ';' );

		// Loop through the array elements
		for ( let i = 0; i < cookieArr.length; i++ ) {
			const cookiePair = cookieArr[ i ].split( '=' );

			// Remove whitespace at the beginning of the cookie name and compare it with the given string
			if ( name == cookiePair[ 0 ].trim() ) {

				// Decode the cookie value and return
				return decodeURIComponent( cookiePair[ 1 ] );
			}
		}

		// Return null if not found
		return null;
	}

	/**
   * Check the Useragent string to determine if device is a tablet.
   *
   * @since May 21, 2021
   * @author Care.com
   */
	function isTablet() {
		const ua = navigator.userAgent || navigator.vendor || window.opera;
		if ( /iPad|iPad.*Mobile/i.test( ua ) ) {
			return true;
		}
	}

	/**
   * Do the POST Request.
   *
   * @since May 21, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
	function pixelTrackRequest( requestUrl, pixelObject ) {
		fetch( requestUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: JSON.stringify( pixelObject ),
		} )
			.then( ( res ) => {
				const status = res.status;
				// Forbidden.
				if ( 200 !== status ) {
					console.warn( '40X, 50X: Forbidden' );
				}
			} )
	}
}
