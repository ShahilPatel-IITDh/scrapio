/**
 * File: rx-tracking.js
 *
 * RX Tracking Functions.
 * @since May 19, 2021
 * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
 */

// Make sure everything is loaded first.
if ( ( 'complete' === document.readyState || 'loading' !== document.readyState ) && ! document.documentElement.doScroll ) {
	rxTrackingInit();
} else {
	document.addEventListener( 'DOMContentLoaded', rxTrackingInit );
}

window.rxTrackingInitEvent = new Event( 'rxTrackingInitEvent' );

// Listen for the event.
document.addEventListener( 'rxTrackingInitEvent', function() {
	rxTrackingInit();
}, false );

/**
 * Get some defaults.
 *
 * @since May 19, 2021
 * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
 */
function rxTrackingInit() {
  if ( window.OptanonActiveGroups && ! window.OptanonActiveGroups.split( ',' ).includes( 'C0002' ) ) {
		return;
	}

  const url          = window.location.href;
  const page_type_id = window.rx_tracking_params.page_type_id;
  const urlTools     = window.wp.url;

  const rxSettings = window.rx_tracking_params;
  const baseURL = rxSettings && rxSettings.base_url ? rxSettings.base_url.replace(/\/$/, '') : null;

  if ( ! urlTools ) {
    return;
  }

  if ( ! baseURL ) {
    window.console.error( 'Error: `window.rx_tracking_params` not defined or missing some options.' );

    return;
  }

  const referrer = document.referrer || null;
  let rx_param = urlTools.getQueryArg( url, 'rx' ) || null;
  checkCookieStatus();

  /**
   * Track visitors.
   *
   * @since May 18, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function rxTracking() {

      let getRequestUrl = `${baseURL}/visitor/captureBannerAd6.do?rx=`;

      // Check if the URL has an 'rx' parameter.
      if ( ! rx_param ) {
        let referrerObjDefaults = {
          'general_general': 'general_general',
          'page_type_id': page_type_id,
          'current_page_path': window.location.pathname
        };

        let referrerObj = returnReferrer();

        if ( ! referrerObj ) {
          return;
        }

        // getQueryArg() seems to convert '+' to ' ' so let's check that and revert it.
        referrerObj.query = referrerObj?.query?.replace( ' ', '+' );
        urlParams = { ...referrerObj, ...referrerObjDefaults };

        // Build RX parameter.
        rx_param = Object.values( urlParams ).join( '|' );
      }

      // Build the Request URL.
      getRequestUrl = `${getRequestUrl}${rx_param}`;

      // Fire the request.
      rxTrackRequest( getRequestUrl );
  }

  /**
   * Do the GET Request.
   *
   * @since May 21, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function rxTrackRequest( url ) {
    // GET request to https://www.care.com/visitor/captureBannerAd6.do
    fetch(
      url,
      { method: 'GET' }
    )
    .then( ( res ) => {
      const status = res.status;

      // Forbidden.
      if ( 200 !== status ) {
        console.warn( '40X, 50X: Forbidden' );
      }
    } )
  }

  /**
   * Check if the 'rc' and 'JSESSIONID' cookies are set.
   *
   * @since May 19, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function checkCookieStatus() {
    fetch(
      window.rx_tracking_params.route,
      {
        method: 'POST', // POST to the endpoint.
        credentials: 'include', // Include cookies in request.
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.rx_tracking_params.token, // Include X-WP-Nonce so logged in users don't suffer weird errors.
        },
        body: JSON.stringify(
        {
          token: window.rx_tracking_params.token // The token is the only required param for the endpoint.
          }
        ),
      }
    )
    .then( ( response ) => response.json() )
    .then( ( res ) => {

      // If either of the 'rc' AND 'JSESSIONID' cookies are present, bail.
      // If no referrer is present, bail.
      // Otherwise, carry on.
      if ( res.data.JSESSIONID || res.data.rc ) {
        return;
      }

      rxTracking();
    } )
    .catch( ( error ) => {
      throw new Error( error );
    } )
  };

  /**
   * Check the referrer type and return an object with some data from the referrer.
   *
   * @since May 19, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function returnReferrer() {

    // Check if the referrer is a social site.
    referrerObj = checkSocial();

    // If null from social, check if the referrer is a search site.
    if ( ! referrerObj ) {
      referrerObj = checkSearch();
    }

    // If null from social & search, set the referrer.
    if ( ! referrerObj ) {
      const site_name = referrer && urlTools.getAuthority( referrer ).replace( 'www.', '' );
      referrerObj = {
        'site_name': `online_${site_name}`,
        'query': urlTools.getQueryArg( referrer, 'q' ),
      }
    }

    return referrerObj;
  }

  /**
   * Check if the referrer is a social site.
   *
   * @since May 19, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function checkSocial() {
    let socialRegex = new RegExp( '/[a-zA-Z0-9\\-\\_.]*(facebook|twitter|youtube|linkedin|pinterest|instagram).+[a-zA-Z]+/' );
    const match = socialRegex.exec( referrer );

    if ( ! match ) {
      return;
    }

    // We have a match, return the values.
    return {
      'social_media_site': `social_${match[1]}`,
      'full_referrer_path': urlTools.getPathAndQueryString( referrer ),
    }
  }

   /**
   * Check if the referrer is a search engine.
   *
   * @since May 19, 2021
   * @author Oliver Harrison <oliver.harrison@webdevstudios.com>
   */
  function checkSearch() {
    const searchEngines = [
      {name: 'google', params: ['q'], regex: /^(?:www\.|encrypted\.|news\.)?google\.\w{2,3}(?:\.\w{2,3})?$/},
      {name: 'yahoo', params: ['p', 'q'], regex: /^(?:\w+\.){0,3}yahoo\.com$/},
      {name: 'bing', params: ['q', 'Q'], regex: /^(?:m|www|cc)?\.?bingj?\.com$/},
      {name: 'msn', params: ['q'], regex: /^(?:[\w.]+)?msn\.com$/},
      {name: 'aol', params: ['query', 'q', 'encquery'], regex: /^(?:aol)?search(?:\.aol)?\.\w{2,3}(?:\.\w{2,3})?$/},
      {name: 'lycos', params: ['query'], regex: /^(?:search\.|www\.)?lycos\.com$/},
      {name: 'ask', params: ['q'], regex: /^(?:.*.)?ask\.(?:com|co\.uk)$/},
      {name: 'altavista', params: ['q'], regex: /^(?:.*\.)?altavista\.(?:com|de|fr)$/},
      {name: 'cnn', params: ['query'], regex: /^(?:www\.)?cnn.com$/},
      {name: 'looksmart', params: ['q', 'qt', 'key'], regex: /^(?:www.)?looksmart.com$/},
      {name: 'about', params: ['q'], regex: /^(?:www\.|index\.)?about.com$/},
      {name: 'mamma', params: ['query', 'q'], regex: /^(?:www\.)?mamma.com$/},
      {name: 'gigablast', params: ['q'], regex: /^(?:www\.|dir\.)?gigablast.com$/},
      {name: 'voila', params: ['rdata', 'kw'], regex: /^(?:search\.ke\.voila\.fr|(?:www\.)?lemoteur\.fr)$/},
      {name: 'virgilio', params: ['qs'], regex: /^(?:\w+\.)?virgilio\.it$/},
      {name: 'baidu', params: ['wd', 'word', 'kw', 'k'], regex: /^(?:\w+\.)?baidu\.com$/},
      {name: 'alice', params: ['qs'], regex: /^(?:\w+\.)?aliceadsl\.fr$/},
      {name: 'yandex', params: ['text'], regex: /^(?:www\.)?yandex\.\w{2,3}$/},
      {name: 'najdi', params: ['q'], regex: /^(?:www\.)?najdi\.si/},
      {name: 'seznam', params: ['q'], regex: /^(?:search\.)?seznam\.cz$/},
      {name: 'search', params: ['q'], regex: /^(?:www\.)?search\.com$/},
      {name: 'wp', params: ['szukaj', 'q'], regex: /^(?:szukaj\.)?wp\.pl$/},
      {name: 'onet', params: ['qt'], regex: /^(?:szukaj\.)?onet\.pl$/},
      {name: 'netsprint', params: ['q', 'query'], regex: /^(?:search\.)?netsprint\.eu$/},
      {name: 'google.interia', params: ['q'], regex: /^(?:www\.)?(?:google\.)?interia\.pl$/},
      {name: 'yam', params: ['k'], regex: /^(?:search\.)?yam\.com$/},
      {name: 'pchome', params: ['q'], regex: /^(?:[\w.]+)?pchome\.com\.tw$/},
      {name: 'kvasir', params: ['searchExpr', 'q'], regex: /^(?:www\.)?kvasir\.no$/},
      {name: 'terra', params: ['query'], regex: /^buscador\.terra\.(?:es|cl|com\.br)$/},
      {name: 'mynet', params: ['q'], regex: /^(?:[\w.]+)?mynet\.com$/},
    ];

    for ( let engine of searchEngines ) {
      const searchRegex = new RegExp( engine.regex );
      let matchQuery = '';

      // Do we have a match for the domain?
      const matchRegex = searchRegex.exec( urlTools.getAuthority( referrer ) );

      // Get the query with the param this search engine is using.
      if ( matchRegex ) {
        for ( let param of engine.params ) {
          if ( urlTools.getQueryArg( referrer, param ) ) {
            matchQuery = urlTools.getQueryArg( referrer, param );
            break;
          }
        }
      }

      // We have a match, return the values.
      if ( matchRegex ) {
        const site_name = referrer && urlTools.getAuthority( referrer ).replace( 'www.', '' );
        return {
          'site_name': `seo_${site_name}`,
          'query': matchQuery,
        }
      }
    }
  }
}
