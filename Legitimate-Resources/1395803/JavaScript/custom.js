VideoJS.setupAllWhenReady();

jQuery.noConflict();

jQuery(document).ready(function($) {
	jQuery("#sidebar_content .widget:last-child").css('margin-bottom','20px');
	jQuery(".home #sidebar_content .widget:last-child").css('margin-bottom','0px');

	jQuery(".tabs_container").each(function(){
		var $history = jQuery(this).attr('data-history');
		if($history!=undefined && $history == 'true'){
			$history = true;
		}else {
			$history = false;
		}
		var $initialIndex = jQuery(this).attr('data-initialIndex');
		if($initialIndex==undefined){
			$initialIndex = 0;
		}
		jQuery("ul.tabs",this).tabs("div.panes > div", {tabs:'a', effect: 'fade', fadeOutSpeed: -400, history: $history, initialIndex: $initialIndex});
	});
	jQuery(".mini_tabs_container").each(function(){
		var $history = jQuery(this).attr('data-history');
		if($history!=undefined && $history == 'true'){
			$history = true;
		}else {
			$history = false;
		}
		var $initialIndex = jQuery(this).attr('data-initialIndex');
		if($initialIndex==undefined){
			$initialIndex = 0;
		}
		jQuery("ul.mini_tabs",this).tabs("div.panes > div", {tabs:'a', effect: 'fade', fadeOutSpeed: -400, history: $history, initialIndex: $initialIndex});
	});
	jQuery.tools.tabs.addEffect("slide", function(i, done) {
		this.getPanes().slideUp();
		this.getPanes().eq(i).slideDown(function()  {
			done.call();
		});
	});
	jQuery(".accordion").each(function(){
		var $initialIndex = jQuery(this).attr('data-initialIndex');
		if($initialIndex==undefined){
			$initialIndex = 0;
		}
		jQuery(this).tabs("div.pane", {tabs: '.tab', effect: 'slide',initialIndex: $initialIndex});
	});
	jQuery(".toggle_title").toggle(
		function(){
			jQuery(this).addClass('toggle_active');
			jQuery(this).siblings('.toggle_content').slideDown("fast");
		},
		function(){
			jQuery(this).removeClass('toggle_active');
			jQuery(this).siblings('.toggle_content').slideUp("fast");
		}
	);
	jQuery(".button").hover(function(){
		var $hoverBg = jQuery(this).attr('data-hoverBg');
		var $hoverColor = jQuery(this).attr('data-hoverColor');
		if($hoverBg!=undefined){
			jQuery(this).css('background-color',$hoverBg);
		}else{
			//jQuery(this).css('background-color','');
		}
		if($hoverColor!=undefined){
			jQuery('span',this).css('color',$hoverColor);
		}else{
			//jQuery('span',this).css('color','');
		}
	},
	function(){
		var $bg = jQuery(this).attr('data-bg');
		var $color = jQuery(this).attr('data-color');
		if($bg!=undefined){
			jQuery(this).css('background-color',$bg);
		}
		if($color!=undefined){
			jQuery('span',this).css('color',$color);
		}
	});
	jQuery(".colorbox").each(function(){
		var $iframe = jQuery(this).attr('data-iframe');
		if($iframe == undefined || $iframe == 'false'){
			$iframe = false;
		}else{
			$iframe = true;
		}
		var $href = false;
		var $inline = jQuery(this).attr('data-inline');
		if($inline == undefined || $inline == 'false'){
			$inline = false;
		}else{
			$inline = true;
			$href = jQuery(this).attr('data-href');
		}
		var $maxWidth = false;
		var $maxHeight = false;
		var $width = jQuery(this).attr('data-width');
		if($width == undefined){
			if($iframe == true || $inline == true ){
				$width = '80%';
			}else{
				$width = '';
			}
			$maxWidth = '95%';
		}
		var $height = jQuery(this).attr('data-height');
		if($height == undefined){
			if($iframe == true || $inline == true ){
				$height = '80%';
			}else{
				$height = '';
			}
			$maxHeight = '95%';
		}
		var $photo = jQuery(this).attr('data-photo');
		if($photo == undefined || $photo == 'false'){
			$photo = false;
		}else{
			$photo = true;
		}
		var $close = jQuery(this).attr('data-close');
		if($close == undefined || $close == 'true'){
			$close = true;
		}else{
			$close = false;
		}
		jQuery(this).colorbox({
			opacity:0.7,
			innerWidth:$width,
			innerHeight:$height,
			maxWidth:$maxWidth,
			maxHeight:$maxHeight,
			iframe:$iframe,
			inline:$inline,
			href:$href,
			photo:$photo,
			onLoad: function(){
				if(!$close){
					jQuery("#cboxClose").css("visibility", "hidden");
				}else{
					jQuery("#cboxClose").css("visibility", "visible");
				}
				jQuery("#colorbox").removeClass('withVideo');
			},
			onComplete: function(){	
				if (typeof Cufon !== "undefined"){
					Cufon.replace('#cboxTitle');
				}
			}
		});
	});
	
	/* enable lightbox */
	var enable_lightbox = function(parent){
		
		jQuery("a.lightbox[href*='http://www.vimeo.com/']",parent).each(function() {
			jQuery(this).attr('href',this.href.replace("www.vimeo.com/", "player.vimeo.com/video/"));
		});
		jQuery("a.lightbox[href*='http://vimeo.com/']",parent).each(function() {
			jQuery(this).attr('href',this.href.replace("vimeo.com/", "player.vimeo.com/video/"));
		});
		jQuery("a.lightbox[href*='http://www.youtube.com/watch?']",parent).each(function() {
			jQuery(this).attr('href',this.href.replace(new RegExp("watch\\?v=", "i"), "v/")+'?autoplay=1');
		});
		jQuery("a.lightbox[href*='http://player.vimeo.com/']",parent).each(function() {
			jQuery(this).addClass("fancyVimeo").removeClass('lightbox');
		});
		jQuery("a.lightbox[href*='http://www.youtube.com/v/']",parent).each(function() {
			jQuery(this).addClass("fancyVideo").removeClass('lightbox');
		});
		jQuery("a.lightbox[href*='.swf']",parent).each(function() {
			jQuery(this).addClass("fancyVideo").removeClass('lightbox');
		});
		jQuery(".fancyVimeo",parent).each(function(){
			var $width = jQuery(this).attr('data-width');
			if($width == undefined){
				$width = '640';
			}
			var $height = jQuery(this).attr('data-height');
			if($height == undefined){
				$height = '408';
			}
			jQuery(this).colorbox({
				opacity:0.7,
				innerWidth:$width,
				innerHeight:$height,
				iframe:true,
				scrolling:false,
				current:"{current} of {total}",
				onLoad: function(){
					jQuery("#cboxClose").css("visibility", "hidden");
					jQuery("#colorbox").addClass('withVideo');
				},
				onComplete: function(){
					if (typeof Cufon !== "undefined"){
						Cufon.replace('#cboxTitle');
					}
				},
				onCleanup: function(){
					jQuery("#cboxLoadedContent").html('');
				}
			});
		});

		jQuery(".fancyVideo",parent).each(function(){
			var $width = jQuery(this).attr('data-width');
			if($width == undefined){
				$width = '640';
			}
			var $height = jQuery(this).attr('data-height');
			if($height == undefined){
				$height = '390';
			}
			
			jQuery(this).colorbox({
				opacity:0.7,
				innerWidth:$width,
				innerHeight:$height,
				html:'<div></div>',
				scrolling:false,
				current:"{current} of {total}",
				//rel:'nofollow',
				onLoad: function(){
					jQuery("#cboxClose").css("visibility", "hidden");
					jQuery("#colorbox").addClass('withVideo');
				},
				onComplete: function(){
					if (typeof Cufon !== "undefined"){
						Cufon.replace('#cboxTitle');
					}
					jQuery("#cboxLoadedContent").html(jQuery.flash.create({swf:this.href,width:$width,height:$height,play:true}));
				},
				onCleanup: function(){
					jQuery("#cboxLoadedContent").html('');
				}
			});
		});
		jQuery(".fancyLightbox",parent).each(function(){
			var $iframe = jQuery(this).attr('data-iframe');
			if($iframe == undefined || $iframe == 'false'){
				$iframe = false;
			}else{
				$iframe = true;
			}
			var $href = false;
			var $inline = jQuery(this).attr('data-inline');
			if($inline == undefined || $inline == 'false'){
				$inline = false;
			}else{
				$inline = true;
				$href = jQuery(this).attr('data-href');
			}
			var $width = jQuery(this).attr('data-width');
			if($width == undefined){
				$width = '640';
			}
			var $height = jQuery(this).attr('data-height');
			if($height == undefined){
				$height = '390';
			}
			jQuery(this).colorbox({
				opacity:0.7,
				innerWidth:$width,
				innerHeight:$height,
				iframe:$iframe,
				inline:$inline,
				href:$href,
				current:"{current} of {total}",
				onLoad: function(){
					jQuery("#cboxClose").css("visibility", "visible");
					jQuery("#colorbox").removeClass('withVideo');
					
				},
				onComplete: function(){
					if (typeof Cufon !== "undefined"){
						Cufon.replace('#cboxTitle');
					}
					if(jQuery("#cboxLoadedContent .video-js").size()>0){
						jQuery("#cboxLoadedContent .video-js").each(function(){
							if(typeof this.player !== "undefined"){
								jQuery(this).css("height",this.height);
								//this.player.height(this.height);
								this.player.positionAll();
							}
						});
					}
				},
				onCleanup: function(){
					jQuery("#cboxLoadedContent").html('');
				}
			});
		});
		jQuery(".lightbox",parent).colorbox({
			opacity:0.7,
			maxWidth:"95%",
			maxHeight:"95%",
			current:"{current} of {total}",
			onLoad: function(){
				jQuery("#cboxClose").css("visibility", "visible");
				jQuery("#colorbox").removeClass('withVideo');
			},
			onComplete: function(){
				if (typeof Cufon !== "undefined"){
					Cufon.replace('#cboxTitle');
				}
			}
		});
	};
	enable_lightbox(document);
	
	/* fix ie colorbox png transparent background bug */
	if (jQuery.browser.msie){
		document.getElementById("cboxTopLeft").style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+image_url+"/colorbox_ie/borderTopLeft.png', sizingMethod='scale')";
		document.getElementById("cboxTopCenter").style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+image_url+"/colorbox_ie/borderTopCenter.png', sizingMethod='scale')";
		document.getElementById("cboxTopRight").style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+image_url+"/colorbox_ie/borderTopRight.png', sizingMethod='scale')";
		document.getElementById("cboxBottomLeft").style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+image_url+"/colorbox_ie/borderBottomLeft.png', sizingMethod='scale')";
		document.getElementById("cboxBottomCenter").style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+image_url+"/colorbox_ie/borderBottomCenter.png', sizingMethod='scale')";
		document.getElementById("cboxBottomRight").style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+image_url+"/colorbox_ie/borderBottomRight.png', sizingMethod='scale')";
		document.getElementById("cboxMiddleLeft").style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+image_url+"/colorbox_ie/borderMiddleLeft.png', sizingMethod='scale')";
		document.getElementById("cboxMiddleRight").style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+image_url+"/colorbox_ie/borderMiddleRight.png', sizingMethod='scale')";
	}
	
	/* enable image hover effect */
	var enable_image_hover = function(image){
		if(image.is(".image_icon_zoom,.image_icon_play,.image_icon_doc,.image_icon_link")){
			if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7) {} else {
				if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 9) {
					image.hover(function(){
						jQuery(".image_overlay",this).css("visibility", "visible");
					},function(){
						jQuery(".image_overlay",this).css("visibility", "hidden");
					}).children('img').after('<span class="image_overlay"></span>');
				}else{
					image.hover(function(){
						jQuery(".image_overlay",this).animate({
							opacity: '1'
						},"fast");
					},function(){
						jQuery(".image_overlay",this).animate({
							opacity: '0'
						},"fast");
					}).children('img').after(jQuery('<span class="image_overlay"></span>').css({opacity: '0',visibility:'visible'}));
				}
			}
		}		
	};
	jQuery('.image_no_link').click(function(){
		return false;
	});
	/* portfolio sortable */
	jQuery(".portfolios.sortable").each(function(){
		var $preferences = {
			duration: 1000,
			easing: 'easeInOutQuad',
			attribute: function(v) {
	           	return $(v).attr('data-id');
			},
			enhancement:function(){
				if (typeof Cufon !== "undefined"){
					if (jQuery.browser.msie){
						jQuery('.portfolio_title').each(function(){
							jQuery(this).html(jQuery(this).text());
						});
					}
					Cufon.replace('.portfolio_title');
				}
			}
		};
		var $list = jQuery('ul',this);
		
		var $data = $list.clone();
		if (typeof Cufon !== "undefined"){
			$data.find('.portfolio_title').each(function(){
				if(jQuery('a', this).size()>0){
					jQuery('a', this).html(this.textContent);
				}else{
					jQuery(this).html(this.textContent);
				}
			});
		}
		var $column;
		if($list.is('.portfolio_one_column')){
			$column = 1;
		}else if($list.is('.portfolio_two_columns')){
			$column = 2;
		}else if($list.is('.portfolio_three_columns')){
			$column = 3;
		}else if($list.is('.portfolio_four_columns')){
			$column = 4;
		}
		
		jQuery('.sort_by_cat a',this).click(function(e){
			if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 9) {
				$list.find('.image_shadow').css('visibility','hidden');
				$data.find('.image_shadow').css('visibility','hidden');
			}
			if(jQuery(this).attr('data-value') == 'all'){
				$sorted_data = $data.find('li');
			}else{
				$sorted_data = $data.find('li[data-type*='+jQuery(this).attr('data-value')+']');
			}
			/*
			$sorted_data.filter('.last').removeClass('last');
			$sorted_data.each(function(i){
				if(((i+1) % $column) == 0 && $column != 1){
					jQuery(this).addClass('last');
				}
			}); 
			*/
			var $callback = function(){
				if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 9 && parseInt(jQuery.browser.version, 10) > 6) {
					$list.find('.image_shadow').css('visibility','visible');
				}
				enable_lightbox($list);
				$list.find('.image_frame a').each(function(){
					enable_image_hover($(this));
				});
				if (typeof Cufon !== "undefined" && jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7){
					$list.find('.portfolio_title').each(function(){
						if(jQuery('a', this).size()>0){
							jQuery('a', this).html(jQuery(this).text());
						}else{
							jQuery(this).html(jQuery(this).text());
						}
					});
					Cufon.replace('.portfolio_title');
				}
				
			};
			jQuery(this).siblings('.current').removeClass('current');
			jQuery(this).addClass('current');
			$list.quicksand($sorted_data,$preferences,$callback);
			if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7) {
				$callback();
			}
			e.preventDefault();  
		});
	});

	jQuery(".portfolios").preloader({
		delay:200,
		imgSelector:'.portfolio_image .image_frame img',
		beforeShow:function(){
			jQuery(this).closest('.image_frame').addClass('preloading');
		},
		afterShow:function(){
			var image = jQuery(this).closest('.image_frame').removeClass('preloading').children("a");
			enable_image_hover(image);
		}
	});
	jQuery(".content,#content,#sidebar,#footer").preloader({
		delay:200,
		imgSelector:'.image_styled:not(.portfolio_image) .image_frame img',
		beforeShow:function(){
			jQuery(this).closest('.image_frame').addClass('preloading');
		},
		afterShow:function(){
			var image = jQuery(this).closest('.image_frame').removeClass('preloading').children("a");
			enable_image_hover(image);
		}
	});
	jQuery(".gallery").preloader({
		delay:100,
		imgSelector:'.gallery-image',
		beforeShow:function(){},
		afterShow:function(){
			jQuery(this).hover(function(){
				jQuery(this).animate({
					opacity: '0.8'
				},"fast");
			},function(){
				jQuery(this).animate({
					opacity: '1'
				},"fast");
			})
		}
	});
	
	
	jQuery(".contact_info_wrap .icon_email").each(function(){
		jQuery(this).attr('href',jQuery(this).attr('href').replace("*", "@"));
		jQuery(this).html(jQuery(this).html().replace("*", "@"));
	});
    if(jQuery.tools.validator != undefined){
        jQuery.tools.validator.addEffect("contact_form", function(errors, event) {
            jQuery.each(errors, function(index, error) {
                var input = error.input;
				
                input.addClass('invalid');
            });
        }, function(inputs)  {
            inputs.removeClass('invalid');
        });
        /* contact form widget */
        jQuery('.widget_contact_form .contact_form').validator({effect:'contact_form'}).submit(function(e) {
			var form = jQuery(this);
            if (!e.isDefaultPrevented()) {
                jQuery.post(this.action,{
                    'to':jQuery('input[name="contact_to"]').val().replace("*", "@"),
                    'name':jQuery('input[name="contact_name"]').val(),
                    'email':jQuery('input[name="contact_email"]').val(),
                    'content':jQuery('textarea[name="contact_content"]').val()
                },function(data){
                    form.fadeOut('fast', function() {
                         jQuery(this).siblings('p').show();
                    });
                });
				e.preventDefault();
            }
        });
        /* contact page form */
        jQuery('.contact_form_wrap .contact_form').validator({effect:'contact_form'}).submit(function(e) {
            var form = jQuery(this);
            if (!e.isDefaultPrevented()) {
                var $id = form.find('input[name="contact_widget_id"]').val();
                jQuery.post(this.action,{
                    'to':jQuery('input[name="contact_'+$id+'_to"]').val().replace("*", "@"),
                    'name':jQuery('input[name="contact_'+$id+'_name"]').val(),
                    'email':jQuery('input[name="contact_'+$id+'_email"]').val(),
                    'content':jQuery('textarea[name="contact_'+$id+'_content"]').val()
                },function(data){
                    form.fadeOut('fast', function() {
                        jQuery(this).siblings('.success').show();
                    });
                });
                e.preventDefault();
            }
        });
    }
});

(function($) {

	$.fn.preloader = function(options) {
		var settings = $.extend({}, $.fn.preloader.defaults, options);


		return this.each(function() {
			settings.beforeShowAll.call(this);
			var imageHolder = $(this);
			
			var images = imageHolder.find(settings.imgSelector).css({opacity:0, visibility:'hidden'});	
			var count = images.length;
			var showImage = function(image,imageHolder){
				if(image.data.source != undefined){
					imageHolder = image.data.holder;
					image = image.data.source;	
				};
				
				count --;
				if(settings.delay <= 0){
					image.css('visibility','visible').animate({opacity:1}, settings.animSpeed, function(){settings.afterShow.call(this)});
				}
				if(count == 0){
					imageHolder.removeData('count');
					if(settings.delay <= 0){
						settings.afterShowAll.call(this);
					}else{
						if(settings.gradualDelay){
							images.each(function(i,e){
								var image = $(this);
								setTimeout(function(){
									image.css('visibility','visible').animate({opacity:1}, settings.animSpeed, function(){settings.afterShow.call(this)});
								},settings.delay*(i+1));
							});
							setTimeout(function(){settings.afterShowAll.call(imageHolder[0])}, settings.delay*images.length+settings.animSpeed);
						}else{
							setTimeout(function(){
								images.each(function(i,e){
									$(this).css('visibility','visible').animate({opacity:1}, settings.animSpeed, function(){settings.afterShow.call(this)});
								});
								setTimeout(function(){settings.afterShowAll.call(imageHolder[0])}, settings.animSpeed);
							}, settings.delay);
						}
					}
				}
			};
			
			if(count==0){
				settings.afterShowAll.call(this);
			}else{
				images.each(function(i){
					settings.beforeShow.call(this);
				
					image = $(this);
				
					if(this.complete==true){
						showImage(image,imageHolder);
					}else{
						image.bind('error load',{source:image,holder:imageHolder}, showImage);
						if($.browser.opera || ($.browser.msie && parseInt(jQuery.browser.version, 10) == 9 && document.documentMode == 9) ){
							image.trigger("load");//for hidden image
						}
					}
				});
			}
		});
	};


	//Default settings
	$.fn.preloader.defaults = {
		delay:1000,
		gradualDelay:true,
		imgSelector:'img',
		animSpeed:500,
		beforeShowAll: function(){},
		beforeShow: function(){},
		afterShow: function(){},
		afterShowAll: function(){}
	};
})(jQuery);