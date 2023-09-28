
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://coloss-art.com/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "cfdca5f9ef" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://coloss-art.com/wp-admin/admin-ajax.php?action=rest-nonce";
