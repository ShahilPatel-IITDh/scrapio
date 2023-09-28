
( function() {
	var userId = 0;
	var storageKey = "WP_DATA_USER_" + userId;
	wp.data
		.use( wp.data.plugins.persistence, { storageKey: storageKey } );
} )();
