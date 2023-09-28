/**
 * Add Care app Rest API.
 *
 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
 * @since  1.0.0
 */
( function( window ) {
	'use strict';

	const czenApiSettings = window.care_czen_api_params;

	const baseURL = czenApiSettings && czenApiSettings.base_url ? czenApiSettings.base_url.replace(/\/$/, '') : null;
	const apiKey = czenApiSettings && czenApiSettings.api_key;

	if ( ! baseURL || ! apiKey ) {
		window.console.error( 'Error: `window.care_czen_api_params` not defined or missing some options.' );

		return;
	}

	const api = {

		/**
		 * Request API endpoint.
		 *
		 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
		 * @since  1.0.0
		 *
		 * @param {string} relativeUrl Request relative URL.
		 * @param {Object} body Request body.
		 * @param {Object} [options] Request options.
		 *
		 * @return {Promise<Response>} Response of the request.
		 */
		request( relativeUrl, body = null, options = {} ) {
			const headers = options.headers || {};
			const method = options.method || 'GET';
			const restOptions = Object.assign( {}, options );
			delete restOptions.headers;
			delete restOptions.method;

			const init = Object.assign({
				method,
				headers: Object.assign({
					'Content-Type': 'application/json',
					'X-Care.com-APIKey': apiKey,
				}, headers ),
			}, restOptions );

			if ( 'GET' !== method && body ) {
				init.body = JSON.stringify( body );
			}

			return fetch( `${ baseURL }/${ relativeUrl.replace( /^\//, '' ) }`, init );
		},

		/**
		 * Request API endpoint using GET method.
		 *
		 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
		 * @since  1.0.0
		 *
		 * @param {string} relativeUrl Request relative URL.
		 * @param {Object} queryParams Request query params.
		 * @param {Object} [options] Request options.
		 *
		 * @return {Promise<Response>} Response of the request.
		 */
		get( relativeUrl, queryParams = null, options = {} ) {
			return this.request( addQueryParams( relativeUrl, queryParams ), null, options );
		},

		/**
		 * Request API endpoint using POST method.
		 *
		 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
		 * @since  1.0.0
		 *
		 * @param {string} relativeUrl Request relative URL.
		 * @param {Object} [queryParams] Request query params.
		 * @param {Object} [body] Request body.
		 * @param {Object} [options] Request options.
		 *
		 * @return {Promise<Response>} Response of the request.
		 */
		post( relativeUrl, queryParams = null, body = null, options = {} ) {
			return this.request( addQueryParams( relativeUrl, queryParams ), body, { ...options, method: 'POST' } );
		},
	};

	/**
	 * Adds Query params to the url string.
	 *
	 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
	 * @since  1.0.0
	 *
	 * @param {string} url Url
	 * @param {Object} [queryParams] Query params
	 *
	 * @return {string} Url with query params.
	 */
	function addQueryParams( url, queryParams = null ) {
		if ( queryParams ) {
			return `${ url }?${ ( new URLSearchParams( queryParams ) ).toString() }`;
		}

		return url;
	}

	window.careAppApi = {
		baseURL,

		auth: {

			/**
			 * Login visitor.
			 *
			 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
			 * @since  1.0.0
			 *
			 * @see https://sites.google.com/site/careappapi/auth-resources/post-auth-login
			 *
			 * @param {Object} data Request data.
			 * @param {Object} [options] Request options.
			 *
			 * @return {Promise<Response>} Response of the request.
			 */
			visitorLogin( data, options = {} ) {
				return api.post( '/platform/spi/auth/visitor/login', data, null, options );
			},
		},
		enroll: {

			/**
			 * Enroll new lite member.
			 *
			 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
			 * @since  1.0.0
			 *
			 * @see https://sites.google.com/site/careappapi/enroll/post-enroll-lite-minimal
			 *
			 * @param {Object} data Request data.
			 * @param {Object} [options] Request options.
			 *
			 * @return {Promise<Response>} Response of the request.
			 */
			liteMinimal( data, options = {} ) {
				return api.post( '/platform/spi/enroll/lite/minimal', null, data, options );
			},

			/**
			 * Upgrade lite member.
			 *
			 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
			 * @since  1.0.0
			 *
			 * @see https://sites.google.com/site/careappapi/enroll/post-enroll-lite-upgrade
			 *
			 * @param {Object} data Request data.
			 * @param {Object} [options] Request options.
			 *
			 * @return {Promise<Response>} Response of the request.
			 */
			liteUpgrade( data, options = {} ) {
				return api.post( '/platform/spi/enroll/lite/upgrade', null, data, options );
			},
		},
		util: {

			/**
			 * Get city and state by zip code.
			 *
			 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
			 * @since  1.0.0
			 *
			 * @see https://sites.google.com/site/careappapi/util/get-util-citystatezipbyzip
			 *
			 * @param {string} zip Zip code.
			 * @param {Object} [options] Request options.
			 *
			 * @return {Promise<Response>} Response of the request.
			 */
			cityStateZipByZip( zip, options = {} ) {
				return api.get( '/platform/spi/util/cityStateZipByZip', { zip }, options );
			},
		},
	};

} ( window ) );
