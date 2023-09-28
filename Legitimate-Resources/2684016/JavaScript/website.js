$(document).ready(function(){
	ckeLightbox();

	function ckeLightbox(){
		var c=0;
		$('a.ckelightbox').each(function(){
			c++;
			var g=$(this).attr('class').split('ckelightboxgallery')[1];
			if(!g)g=c;
			$(this).attr('data-lightbox',g);
			$(this).attr('data-title',$(this).attr('title'));
		});
	}

});



