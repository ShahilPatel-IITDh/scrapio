
jQuery(document).ready(function() {
	jQuery(".d0415fd07f5d364cb40af120fab4e2e1").click(function() {
		jQuery.post(
			"http://ir.net/wp-admin/admin-ajax.php", {
				"action": "quick_adsense_onpost_ad_click",
				"quick_adsense_onpost_ad_index": jQuery(this).attr("data-index"),
				"quick_adsense_nonce": "14202c6f54",
			}, function(response) { }
		);
	});
});
