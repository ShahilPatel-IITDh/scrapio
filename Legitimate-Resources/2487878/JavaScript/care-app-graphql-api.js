/**
 * Add Care app graphQL API.
 *
 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
 * @since  1.0.0
 */
(function (window) {
	'use strict';

	const czenGraphQLApiSettings = window.care_czen_graphql_api_params;

	const baseURL = czenGraphQLApiSettings && czenGraphQLApiSettings.base_url;

	if ( ! baseURL ) {
		window.console.error( 'Error: `window.care_czen_graphql_api_params` not defined or missing some options.' );

		return;
	}

	/**
	 * GraphQL client.
	 *
	 * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
	 * @since  1.0.0
	 *
	 * @param {string} uri GraphQL URI.
	 * @return {GraphQLClient} Instance of GraphQL client.
	 * @constructor
	 */
	function GraphQLClient( uri ) {
		if ( ! (this instanceof GraphQLClient) ) {
			return new GraphQLClient( uri );
		}

		this.fetch = function ( body, headers = {} ) {
			return fetch(uri, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...headers
				},
				body: JSON.stringify( body ),
			}).then(function ( result ) {
				return result.json();
			})
		}
	}

	window.careAppGraphQLClient = new GraphQLClient( baseURL );

}(window));
