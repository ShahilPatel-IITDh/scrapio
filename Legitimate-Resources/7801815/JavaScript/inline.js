
// <![CDATA[
	jQuery(document).ready(function($){
		$(".gallery").each(function(index, obj){
			var galleryid = Math.floor(Math.random()*10000);
			$(obj).find("a").colorbox({rel:galleryid, maxWidth:"95%", maxHeight:"95%"});
		});
		$("a.lightbox").colorbox({maxWidth:"95%", maxHeight:"95%"});
	});
// ]]>
