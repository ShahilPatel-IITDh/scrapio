
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://www.renova.nl/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "cdd9ecf845" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://www.renova.nl/wordpress/wp-admin/admin-ajax.php?action=rest-nonce";
