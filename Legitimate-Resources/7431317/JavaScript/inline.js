
jQuery('#mc_social svg').each(function(){
	var elm = jQuery(this);
	fetch(new Request('/maakum_central/10.0/common/png/social/'+jQuery(this).attr('class')+'.svg'))
		.then(response => {
			if(response.ok){
	 			response.text().then(dd=>{
	 			elm.replaceWith(dd);
	 		});
		}
	});
});
