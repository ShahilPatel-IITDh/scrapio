
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://giurioloepandolfo.com/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "b5b7f8725c" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://giurioloepandolfo.com/wp-admin/admin-ajax.php?action=rest-nonce";
