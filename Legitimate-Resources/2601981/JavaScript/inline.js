
	//<![CDATA[
	try {
	var pageTracker = _gat._getTracker("UA-4403314-2");
	pageTracker._trackPageview();
	} catch(err) {}
	//]]>

	jQuery.ajax({
		type: "GET",   
		async: true,
		url: '/lhc/index.php/chatapi/isonline',
		success: function(e) {
			var linktag = jQuery('#chatLinkTag');
			var imgtag = jQuery('#chatLinkTag').find('img');
			if ( e.isonline ) {
				jQuery(linktag).attr('href', "javascript:void(window.open('/espe/online_chat.html','','width=590,height=550,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes'))");
				jQuery(imgtag).attr('src', '/espe/imgs/atendimento_online_img.jpg');
			} else {
				jQuery(linktag).attr('href', '/novo/fale-conosco');
				jQuery(imgtag).attr('src', '/espe/imgs/atendimento_offline_img.jpg');
			}
		},
		error: function() {
			var linktag = jQuery('#chatLinkTag');
			jQuery(linktag).attr('href', '/novo/fale-conosco');
		}
	});
