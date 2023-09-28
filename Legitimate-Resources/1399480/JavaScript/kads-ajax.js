
jQuery(document).ready(function() {
	
	
	jQuery(".kads-main").mouseleave(function()
		{	
			var bannerid_hover = jQuery(this).attr("bannerid");			
			jQuery.ajax(
				{
			type: 'POST',
			url:kads_ajax.kads_ajaxurl,
			data: {"action": "kads_get_count", "bannerid_hover":bannerid_hover},
			success: function(data)
					{	

					}
				});


			});
	
	
jQuery(".kads-main").mousedown(function()
{	


		var bannerid = jQuery(this).attr("bannerid");
		var target = jQuery(this).attr("target");
		var target_window = jQuery(this).attr("target-window");
				
					jQuery.ajax(
						{
					type: 'POST',
					url:kads_ajax.kads_ajaxurl,
					data: {"action": "kads_get_count", "bannerid":bannerid, },
					success: function(data)
							{	
								if(target_window=="_blank")
									{
										window.open(target)
									}
								else
									{
										window.location.href =target;
									}								
								
								
								
							
							}
						});
	
	
					});
					
				});	








					












jQuery(document).ready(function() {
	
	
	
	
var formfield;
jQuery('.upload_image_button').click(function() {

	
	jQuery('html').addClass('Image');
	formfield = jQuery(this).prev().attr('name');
	tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
	return false;
	});
	window.original_send_to_editor = window.send_to_editor;
	window.send_to_editor = function(html){
	if (formfield) {
		fileurl = jQuery('img',html).attr('src');
		jQuery('#'+formfield).val(fileurl);
		tb_remove();
		jQuery('html').removeClass('Image');
		} else {
		window.original_send_to_editor(html);
		}
		
		
		
	var kads_bn_img_preview = jQuery('#kads_bn_img').val();
	jQuery('#kads-bn-img-preview').attr("src",kads_bn_img_preview);
	
	
	var kads_logo_img_link_preview = jQuery('#kads_logo_img_link').val();
	jQuery('#kads-logo-img-link-preview').attr("src",kads_logo_img_link_preview);	

	};
	
	
	

	
	
	
	
	


	
	jQuery(".banner-swf").mouseenter(function()
	{
		alert("Hello");
		document.getElementById("banner-swf").style.cursor="pointer";
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});  
