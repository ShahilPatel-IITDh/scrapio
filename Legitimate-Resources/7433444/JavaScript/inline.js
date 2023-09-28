
            var jQueryMigrateHelperHasSentDowngrade = false;

			window.onerror = function( msg, url, line, col, error ) {
				// Break out early, do not processing if a downgrade reqeust was already sent.
				if ( jQueryMigrateHelperHasSentDowngrade ) {
					return true;
                }

				var xhr = new XMLHttpRequest();
				var nonce = '5e272a24c5';
				var jQueryFunctions = [
					'andSelf',
					'browser',
					'live',
					'boxModel',
					'support.boxModel',
					'size',
					'swap',
					'clean',
					'sub',
                ];
				var match_pattern = /\)\.(.+?) is not a function/;
                var erroredFunction = msg.match( match_pattern );

                // If there was no matching functions, do not try to downgrade.
                if ( typeof erroredFunction !== 'object' || typeof erroredFunction[1] === "undefined" || -1 === jQueryFunctions.indexOf( erroredFunction[1] ) ) {
                    return true;
                }

                // Set that we've now attempted a downgrade request.
                jQueryMigrateHelperHasSentDowngrade = true;

				xhr.open( 'POST', 'https://threatpost.com/wp-admin/admin-ajax.php' );
				xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
				xhr.onload = function () {
					var response,
                        reload = false;

					if ( 200 === xhr.status ) {
                        try {
                        	response = JSON.parse( xhr.response );

                        	reload = response.data.reload;
                        } catch ( e ) {
                        	reload = false;
                        }
                    }

					// Automatically reload the page if a deprecation caused an automatic downgrade, ensure visitors get the best possible experience.
					if ( reload ) {
						location.reload();
                    }
				};

				xhr.send( encodeURI( 'action=jquery-migrate-downgrade-version&_wpnonce=' + nonce ) );

				// Suppress error alerts in older browsers
				return true;
			}
        