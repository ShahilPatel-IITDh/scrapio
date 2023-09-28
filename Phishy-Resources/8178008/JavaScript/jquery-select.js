/* version: 0.6 */
jQuery(function($){ 

	var default_params = {  
		selects: '.js_my_sel',
	};
    $.fn.Jselect = function(params){
        var options = $.extend({}, default_params, params);
		
		$(options.selects).each(function(){
			var thet = $(this);
			if(!thet.hasClass('jsw')){
				thet.addClass('jsw');
				thet.wrap('<div class="select_js">');
				var par = thet.parents('.select_js');
				var sel_w = thet.css('width');
				var sel_h = thet.css('height');
				par.css({'width' : sel_w, 'height' : sel_h, 'max-width' : '100%'});
				
				var opt_txt = '';
				var sel_title = '';
				
				thet.find('option').each(function(){
					var im = $(this).attr('data-img');
					var sel_ico = '';
					if (typeof im !== typeof undefined && im !== false) {
						sel_ico = '<div class="select_ico currency_logo" style="background-image: url(' + im + ');"></div>';
						par.addClass('iselect_js');
					} 

					var active_class = '';
					if($(this).prop('selected')){
						active_class = 'active';
						sel_title = sel_ico +'<div class="select_txt">'+ $(this).html() +'</div><div style="clear: both;"></div>';
					}
					
					opt_txt = opt_txt + '<div class="select_js_ulli '+ active_class +'" data-value="'+ $(this).val() +'">'+ sel_ico +'<div class="select_txt">'+ $(this).html() +'</div><div class="select_js_abs"></div><div style="clear: both;"></div></div>';
				});

				var sel_txt = '<div class="select_js_title"><div class="select_js_title_ins">'+ sel_title +'<div class="select_js_abs"></div></div><div style="clear: both;"></div></div>' +
				'<div class="select_js_search"><div class="select_js_search_ins"><input type="search" name="" value="" /></div></div><div class="select_js_ul"><div class="select_js_ul_ins">' + opt_txt + '</div></div>';
				par.find('select').after(sel_txt);
				par.find('select').css({'height' : sel_h});
			}
		});

		$(document).on('click', '.select_js_title', function(){
			$('.select_js_ul, .select_js_search').hide();
			$('.select_js_search input').val('');
			$(this).parents('.select_js').find('.select_js_ulli').show();
			$(this).parents('.select_js').addClass('open');
			$(this).parents('.select_js').find('.select_js_ul, .select_js_search').show();
			$(this).parents('.select_js').find('.select_js_search input').focus();
			$(this).parents('.select_js').find('.select_js_ul').stop(true,true).animate({scrollTop: 0}, 0, function(){
				var totop = $(this).parents('.select_js').find('.select_js_ul').find('.select_js_ulli.active').position().top;
				$(this).parents('.select_js').find('.select_js_ul').animate({scrollTop: totop}, 500);
			});
		});		
		
		$(document).on('click', '.select_js_ulli', function(){
			var title = $(this).html();
			var vale = $(this).attr('data-value');
			var def = $(this).parents('.select_js').find('select').val();
			$(this).parents('.select_js').find('.select_js_title_ins').html(title);
			$(this).parents('.select_js').find('select').val(vale);
			$(this).parents('.select_js').removeClass('open');
			$(this).parents('.select_js').find('.select_js_ulli').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.select_js').find('.select_js_ul, .select_js_search').hide();
			if(def != vale){
				$(this).parents('.select_js').find('select').trigger("change");
		    }
		});
		
		$(document).on('click', function(event){
			if ($(event.target).closest(".select_js").length) return;
			$('.select_js_ul, .select_js_search').hide();
			$('.select_js').removeClass('open');
			event.stopPropagation();
		});	
		
		function search_select_action(obj){
			var par = obj.parents('.select_js');
			var txt = $.trim(obj.val()).toLowerCase();
			if(txt.length > 0){
				par.find('.select_js_ulli').hide();
				par.find('.select_js_ulli').each(function(){
					var option_html = $(this).find('.select_txt').html();
					if(option_html.toLowerCase().indexOf(txt) + 1) {
						$(this).show();	
					} 
				});
			} else {
				par.find('.select_js_ulli').show();
			}
		}		 
		
		$(document).ChangeInput({ 
			trigger: '.select_js_search input',
			success: function(obj){
				search_select_action(obj);
			}
		});		
 
        return this;
    };
});