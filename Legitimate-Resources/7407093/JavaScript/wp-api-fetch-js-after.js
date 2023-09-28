
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://thewelderpro.com/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "a50d57dbce" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://thewelderpro.com/wp-admin/admin-ajax.php?action=rest-nonce";
