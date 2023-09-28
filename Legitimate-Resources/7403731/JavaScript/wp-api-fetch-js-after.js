
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://www.lameda.cc/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "7c458e1569" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://www.lameda.cc/wp-admin/admin-ajax.php?action=rest-nonce";
