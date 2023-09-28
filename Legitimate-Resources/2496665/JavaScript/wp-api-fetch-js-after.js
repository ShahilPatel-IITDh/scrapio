
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://www.smtp.com/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "652e5abaea" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://www.smtp.com/wp-admin/admin-ajax.php?action=rest-nonce";
