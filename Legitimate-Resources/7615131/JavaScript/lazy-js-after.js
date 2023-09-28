
		jQuery(function( $ ) {
			jQuery("img.lazy").each(function() {
				var currentImg = jQuery(this);
				
				jQuery(this).Lazy({
					onFinishedAll: function() {
						currentImg.parent("div.post_img_hover").removeClass("lazy");
						currentImg.parent(".tg_gallery_lightbox").parent("div.gallery_grid_item").removeClass("lazy");
						currentImg.parent("div.gallery_grid_item").removeClass("lazy");
			        }
				});
			});
		});
		
