
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://mosirleszno.pl/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "4ff15306a7" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://mosirleszno.pl/wp-admin/admin-ajax.php?action=rest-nonce";
