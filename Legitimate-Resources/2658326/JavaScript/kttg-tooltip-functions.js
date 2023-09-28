function moveTooltipElementsTop(className){
//this function moves les tooltip elements after the tag BODY

		jQuery("body").prepend("<div id='tooltip_blocks_to_show'></div>");
		
		jQuery("#tooltip_blocks_to_show").prepend(jQuery(className));
		
		//remove repeated elements 
		jQuery("#tooltip_blocks_to_show").children().each(function(){
			id_post_type=jQuery(this).data("tooltip");
			if(jQuery("#tooltip_blocks_to_show").children("[data-tooltip="+id_post_type+"]").length>1){
				jQuery("#tooltip_blocks_to_show").children("[data-tooltip="+id_post_type+"]").each(function(index){
					if(index>0){
						jQuery(this).remove();
					}
				});
			}
		});
}

function bluet_placeTooltips(inlineClass,position,loading){
    // Fix iOS devices mouseout issues
    // Topics :    https://wordpress.org/support/topic/ipad-and-iphone-problems
    //             https://wordpress.org/support/topic/words-running-together-1
    
    // Solution : http://stackoverflow.com/questions/7006799/does-iphone-ipad-support-mouseout-event
    jQuery('*').on('click', function(){
        return true;
    });

	//add listeners to inline keywords on mouseover
	jQuery(inlineClass).mouseover(function(){

		if( currentHoveredKeyword != 'done' ){
			currentHoveredKeyword = jQuery(this);
		}
		
		//id of the posttype in concern
		id_post_type=jQuery(this).data("tooltip");
		if (loading){
			id_post_type=0;
		};

		var tooltipBlock=jQuery("#tooltip_blocks_to_show").children("[data-tooltip="+id_post_type+"]").first();
	  
	  //show and quit if mobile
	  	if(jQuery(window).width()<401){
			tooltipBlock.css("opacity","1").show();
			return;

		}
		if(tooltipBlock){

			//Calculate the new Position
			
			//vertical offsets
			var xTop_show_middle=jQuery(this).offset().top+jQuery(this).outerHeight(true)-tooltipBlock.outerHeight(true)/2;	
			
			var xTop_show_bottom=(jQuery(this).offset().top+jQuery(this).outerHeight(true));			
			var xTop_show_top=jQuery(this).offset().top-tooltipBlock.outerHeight(true);
			
			//horizontal offsets
			var yLeft_show_center=jQuery(this).offset().left+(jQuery(this).outerWidth(false)/2)-tooltipBlock.outerWidth(true)/2;
			
			/*yLeft_show_center=jQuery(this).offset().left-tooltipBlock.css("padding-left").replace("px", ""); */

			var yLeft_show_left=jQuery(this).offset().left-tooltipBlock.outerWidth(true);			
			var yLeft_show_right=jQuery(this).offset().left+jQuery(this).outerWidth(true);
			
			//to prevent to be before the left side of the doc
			if(yLeft_show_center<0){
				yLeft_show_center=0;
			}
			
			//to prevent to be before the right side of the doc
			if( jQuery(document).outerWidth() < (yLeft_show_center+tooltipBlock.outerWidth(true)) ){
				yLeft_show_center=yLeft_show_center-(yLeft_show_center+tooltipBlock.outerWidth(true)-jQuery(document).outerWidth())
			}
			//.show()
			tooltipBlock.css("opacity","0").show();
			//pos_margin=0;
			
			switch(position) {
				case "top":		
					//xTop_show_top-=pos_margin;

					tooltipBlock.offset({"top":xTop_show_top,"left":yLeft_show_center});
					tooltipBlock.addClass("kttg_arrow_show_top");	

					//tooltipBlock.animate({"opacity":"1","top":"+="+animation_margin},300);
					break;
				case "bottom":	
					//xTop_show_bottom+=pos_margin;
		
					tooltipBlock.offset({"top":xTop_show_bottom,"left":yLeft_show_center});
					tooltipBlock.addClass("kttg_arrow_show_bottom");

					//tooltipBlock.animate({"opacity":"1","top":"-="+animation_margin},300);

					break;
				case "right":
					//yLeft_show_right+=pos_margin;

					tooltipBlock.offset({"top":xTop_show_middle,"left":yLeft_show_right});
					
					//tooltipBlock.animate({"opacity":"1","left":"-="+animation_margin},300);

					//tooltipBlock.addClass("kttg_arrow_show_right");
					break;
					
				case "left":
					//yLeft_show_left-=pos_margin;

					tooltipBlock.offset({"top":xTop_show_middle,"left":yLeft_show_left});
					
					//tooltipBlock.animate({"opacity":"1","left":"+="+animation_margin},300);

					//tooltipBlock.addClass("kttg_arrow_show_left");
					break;
				default:
					//xTop_show_bottom-=pos_margin;

					tooltipBlock.offset({"top":xTop_show_bottom,"left":yLeft_show_center});
					tooltipBlock.addClass("kttg_arrow_show_bottom");
					
					//tooltipBlock.animate({"opacity":"1","bottom":"+="+animation_margin},300);

					break;
			}
			/*test*/
			tooltipBlock.css({"opacity":"1"});
			tooltipBlock.addClass("animated "+animation_type+" "+animation_speed); //animation_type passed from index.php
			/*end test*/
			
		}
	});
	
	//on mouseout
	jQuery(inlineClass).mouseout(function(){
		id_post_type=jQuery(this).data("tooltip");
		var tooltipBlock=jQuery("#tooltip_blocks_to_show").children("[data-tooltip="+id_post_type+"]").first();

	   if(tooltipBlock){
		   //leave it like that .css("display","none"); for Safari navigator issue
		tooltipBlock.css("display","none");
		//tooltipBlock;
		   
	   }
	   
			/*test*/
			tooltipBlock.removeClass("animated "+animation_type);
			/*end test*/
	});
}

function changeQueryStringParameter(uri, key, value){
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function removeUrlParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function associate_tooltip_to_img(){
	jQuery('img.bluet_tooltip').each(function(){
		tlt_data=jQuery(this).next().children().first().children().first().data('tooltip');
		jQuery(this).attr('data-tooltip',tlt_data);
	});
}

jQuery(document).on("keywordsLoaded",function(){
	associate_tooltip_to_img();
});