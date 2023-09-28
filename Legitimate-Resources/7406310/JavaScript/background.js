var objectsList = JSON.parse(localStorage.getItem("elbObjects")) == null ?  JSON.parse(elbbc_data.elbObjects) : JSON.parse(localStorage.getItem("elbObjects"));
(function($){	
	$(document).ready(function(){
		$(window).on('scroll', function(){
			elb_section_parallax_onscroll_init();
		});
	});

	$(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/section', function($scope, $){	
			var elem = $scope;		
			elb_section_parallax_mouse_move_init();		
			var editMode = elementorFrontend.isEditMode();
			if(editMode){
				var editorElements = window.elementor.elements;
				if(elbbc_data.extensions.includes("animatedgradient"))
					elb_front_init_gradient_background(elem,editorElements);
				if(elbbc_data.extensions.includes("backgroundobjectsdecoration"))
					elb_editor_background_objects_decoration_init(elem,editorElements);
			}
		});

	});


})(jQuery);	

//Advanced EDITOR Background Images init
function elb_editor_background_objects_decoration_init(elem,editorElements){
	var sectionId = elem.data("model-cid");
	jQuery.each(editorElements.models, function(index, section) {		
		if (sectionId == section.cid && section.attributes.elType == 'section'){
			var sectionData = section.attributes.settings.attributes;
			elb_print_background_decoration(sectionData,elem);
		}

		jQuery.each(section.attributes.elements.models, function(index2, columns) {			
			jQuery.each(columns.attributes.elements.models, function(index3, sec) {		
				if (sectionId == sec.cid && sec.attributes.elType == 'section'){				
					var sectionData1 = sec.attributes.settings.attributes;
					elb_print_background_decoration(sectionData1,elem);
				}
			});
		});


	});
}


function elb_print_background_decoration(sectionData,elem){
	if(sectionData['elb_bgobjdeco_ext_enabled'] == 'yes'){
		var objOutput = '<div class="elb-bgobjdeco-ctn">';
			sectionData['elb_bgobjdeco_list'].each(function(singleObjectAttr){ //OBJECTS LIST LOOP
				var sObjAttr = customClass = '';
				var singleObject = singleObjectAttr['attributes'];
				sObjAttr = 'data-position="'+singleObject['elb_bgobjdeco_elm_pos']+'" data-align="'+singleObject['elb_bgobjdeco_elm_align']+'" data-animation="'+singleObject['elb_bgobjdeco_elm_show_effect']+'" data-infinite-rotate="'+singleObject['elb_bgobjdeco_elm_infrotate_en']+'" ';
				sObjAttr += (singleObject['elb_bgobjdeco_elm_anim_type'] == 'move_around') ? ' data-move-around="'+singleObject['elb_bgobjdeco_elm_mvard_style']+'" ' : '';

				customClass += (singleObject['elb_bgobjdeco_elm_anim_type'] == 'parallax_onscroll') ? ' elb-parallax-section-elem ' : '';
				customClass += (singleObject['elb_bgobjdeco_elm_anim_type'] == 'parallax_hover') ? ' elb-parallaxf-ctn' : '';

				var elb_bgobjdeco_obj_color = {'color_one_pos' : singleObject['elb_bgobjdeco_obj_color_color_one_pos'] ,'color_one' : singleObject['elb_bgobjdeco_obj_color_color_one'] ,'color_two_pos' : singleObject['elb_bgobjdeco_obj_color_color_two_pos'] ,'color_two' : singleObject['elb_bgobjdeco_obj_color_color_two'] ,'gradient_enabled' : singleObject['elb_bgobjdeco_obj_color_gradient_enabled'],'direction' : singleObject['elb_bgobjdeco_obj_color_direction']};

				customClass += (singleObject['hide_desktop'] == 'hidden-desktop') ? ' elementor-hidden-desktop ' : '';
				customClass += (singleObject['hide_tablet'] == 'hidden-tablet') ? ' elementor-hidden-tablet ' : '';
				customClass += (singleObject['hide_mobile'] == 'hidden-phone') ? ' elementor-hidden-phone ' : '';
						
				objOutput += '<div class="elb-bgobjdeco-item elementor-repeater-item-'+singleObject['_id']+' '+customClass+' " '+sObjAttr+'>';
				objOutput += '<div class="elb-bgobjdeco-item-insider elb-masonry-item" data-isotope-situation="hidden">';
				objOutput += (singleObject['elb_bgobjdeco_elm_anim_type'] == 'parallax_hover') ? '<div class="elb-bgobjdeco-item-insider elb-parallaxf-item" data-parallax-move="enabled"  data-parallax-sensitive="'+singleObject['elb_bgobjdeco_elm_prlx_stv']+'">' : '';

				objOutput += (objectsList != null && objectsList != undefined && objectsList[singleObject["elb_bgobjdeco_obj"]] != undefined) ? print_svg_with_color(objectsList[singleObject["elb_bgobjdeco_obj"]]['icon'], elb_bgobjdeco_obj_color) : '';
				

				objOutput += (singleObject['elb_bgobjdeco_elm_anim_type'] == 'parallax_hover') ? '</div>' : '';
				objOutput += '</div>';
				objOutput += '</div>';
			});
		objOutput += '</div>';				
		jQuery(objOutput).prependTo(elem);
	}
}


//Seting Object Color 
function print_svg_with_color(objectSVG, color){
	var  fill = gradient = '';
	if(color != ''){
		colorValue = set_icon_color(color);
		fill = (colorValue['type'] == 'color') ? ' fill="'+colorValue['value']+'" style="color:'+colorValue['value']+';" '  : ' style="fill:url(#'+colorValue['id']+');"  fill="url(#'+colorValue['id']+')" ';
		gradient = (colorValue['type'] == 'gradient') ? colorValue['value'] : '';
	}
	objectSVG = objectSVG.replace("<svg ", "<svg "+fill);
	objectSVG = objectSVG.replace("</svg>", gradient+"</svg>");
	return objectSVG;
}

//Icon Set Gradient SVG Color
function set_icon_color(values){
	result = {'value' : '#333'};
	if(values instanceof  Object){
		result['type'] = (values['gradient_enabled'] == 'yes') ? 'gradient' : 'color';
		result['id'] =  Math.random().toString(36).substr(2, 9);
		if(values['gradient_enabled'] == 'yes' ){
			x1 = x2 = y1 = y2 = '0%';
			x1 = (values['direction'].includes('left') !== false) ? '100%' : '0%';
			x2 = (values['direction'].includes('right') !== false) ? '100%' : '0%';
			y1 = (values['direction'].includes('top') !== false) ? '100%' : '0%';
			y2 = (values['direction'].includes('bottom') !== false) ? '100%' : '0%';
			directions = 'x1="'+x1+'" x2="'+x2+'"  y1="'+y1+'" y2="'+y2+'"';
			result['value'] = '<defs><linearGradient '+directions+' id="'+result['id']+'"><stop offset="'+values['color_one_pos']+'%"   stop-color="'+values['color_one']+'"/><stop offset="'+values['color_two_pos']+'%" stop-color="'+values['color_two']+'"/></linearGradient></defs>';
		}
		if(values['gradient_enabled'] == 'no' || values['gradient_enabled'] == '' )
			result['value'] = values['color_one'];
	}
	return result;
}


//Gradient Background Animator INIT
function elb_front_init_gradient_background(elem,editorElements){
	var sectionId = elem.data("model-cid");
	jQuery.each(editorElements.models, function(index, section) {
		if (sectionId == section.cid && section.attributes.elType == 'section'){
			var sectionData = section.attributes.settings.attributes;	
			elb_print_front_init_gradient_background(sectionData,elem);			
		}
		jQuery.each(section.attributes.elements.models, function(index2, columns) {
			jQuery.each(columns.attributes.elements.models, function(index3, sec) {		
				if (sectionId == sec.cid && sec.attributes.elType == 'section'){				
					var sectionData1 = sec.attributes.settings.attributes;
					elb_print_front_init_gradient_background(sectionData1,elem);
				}
			});
		});
		
	});
}
function elb_print_front_init_gradient_background(sectionData,elem){
	if(sectionData['elb_backgrdmv_ext_enabled'] == 'yes'){
		var colorArray = [];
		sectionData['elb_backgrdmv_clr_list'].each(function(elColor){
			colorArray.push(elColor['attributes']['elb_backgrdmv_clr']);
		});
		var colorGradientString = colorArray.join(','), animationSpeed = sectionData['elb_backgrdmv_animation'], size = colorArray.length * 200;
		var gradientsStyle = '-webkit-animation-duration: '+animationSpeed+'s; animation-duration: '+animationSpeed+'s; background: linear-gradient('+sectionData['elb_backgrdmv_angle']+'deg, '+colorGradientString+'); background-size: '+size+'% '+size+'%;';			
		var gradientHTML = '<div class="elb-gradient-section-el" style="'+gradientsStyle+'"></div>';
		jQuery(gradientHTML).prependTo(elem);
	}
}




//Background Parallax ON Mouse Moove SECTION
function elb_section_parallax_mouse_move_init(){
	jQuery('.elb-bg-prlx-type-mousemove').mousemove(function(e){
    	var elem = jQuery(this);
		//Horizontal Parallax
		if(elem.hasClass('elb-bg-prlx-hrz-direction-left') || elem.hasClass('elb-bg-prlx-hrz-direction-right')){
    		if(elem.attr('data-theX') == undefined || elem.attr('data-theX') == '')
				elem.attr('data-theX',elem.css("background-position-x"));    
			var backgroundPosX = elem.attr('data-theX');
			var movementStrengthX = Number(elem.cssVar('--elb-bg-prlx-hrz-speed')) * 100;
			var width = movementStrengthX / jQuery(window).width();
			var pageX = e.pageX - (jQuery(window).width() / 2);
			var directionHrz = elem.hasClass('elb-bg-prlx-hrz-direction-left') ? 1 : -1;
	        var newvalueX = width * pageX * directionHrz - 25;
			elem.css('background-position-x', "calc("+backgroundPosX+" + "+newvalueX+"px)");
    	}

    	//Horizontal Parallax
		if(elem.hasClass('elb-bg-prlx-vrt-direction-top') || elem.hasClass('elb-bg-prlx-vrt-direction-bottom')){
    		if(elem.attr('data-theY') == undefined || elem.attr('data-theY') == '')
				elem.attr('data-theY',elem.css("background-position-y"));    
			var backgroundPosY = elem.attr('data-theY');
			var movementStrengthY = Number(elem.cssVar('--elb-bg-prlx-vrt-speed')) * 100;
			var height = movementStrengthY / jQuery(window).height();
			var pageY = e.pageY - (jQuery(window).height() / 2);
			var directionVrt = elem.hasClass('elb-bg-prlx-vrt-direction-bottom') ? 1 : -1;
	        var newvalueY = height * pageY * directionVrt - 50;
			elem.css('background-position-y', "calc("+backgroundPosY+" + "+newvalueY+"px)");
    	}
	
	});
}



function elb_section_parallax_onscroll_init(){
	//Background Parallax ON SCROLL SECTION
	jQuery('.elb-bg-prlx-type-onscroll').each(function(){
		var elem = jQuery(this); 
		if(elem.visible(true)){
			var windowYOffset = window.pageYOffset;			
			var backgroundPos = elem.css("backgroundPosition").split(" ");
			//Horizontal Parallax
			if(elem.hasClass('elb-bg-prlx-hrz-direction-left') || elem.hasClass('elb-bg-prlx-hrz-direction-right')){
				var hrztSpeed = elem.cssVar('--elb-bg-prlx-hrz-speed');
				if(elem.attr('data-xpos-start') == '' || elem.attr('data-xpos-start') == undefined)
					elem.attr('data-xpos-start',backgroundPos[0]);	
				var x = (parseFloat(backgroundPos[0]) * parseFloat(elem.css('width'))) / 100; 
				if(elem.attr('data-xpos') == '' || elem.attr('data-xpos') == undefined)
					elem.attr('data-xpos',x);	
				if(backgroundPos[0] == '100%' ) x = (-x);
				var directionHrz = elem.hasClass('elb-bg-prlx-hrz-direction-left') ? 1 : -1;
				var xPosition  = (window.pageYOffset * Number(hrztSpeed) ) - parseFloat(elem.attr('data-xpos') * directionHrz) + 'px';     							
				if(elem.attr('data-xpos-start') == '0%')	
					xPosition =	 parseFloat(elem.attr('data-xpos')) - (window.pageYOffset * Number(hrztSpeed) * directionHrz) + 'px'; 
				if(elem.attr('data-xpos-start') == '50%')
					xPosition  = 'calc(50% - '+((window.pageYOffset * Number(hrztSpeed))*.5 * directionHrz)+'px)';
				if(elem.attr('data-xpos-start') == '100%')
					xPosition  = 'calc(100% - '+((window.pageYOffset * Number(hrztSpeed))*.5 * directionHrz)+'px)';
				elem.css('background-position-x', xPosition);
			}
			//Vertical Parallax
			if(elem.hasClass('elb-bg-prlx-vrt-direction-top') || elem.hasClass('elb-bg-prlx-vrt-direction-bottom')){		
				var vrtSpeed = elem.cssVar('--elb-bg-prlx-vrt-speed');
				if(elem.attr('data-ypos-start') == '' || elem.attr('data-ypos-start') == undefined)
					elem.attr('data-ypos-start',backgroundPos[1]);	
				var y = (parseFloat(backgroundPos[1]) * parseFloat(elem.css('height'))) / 100; 
				if(elem.attr('data-ypos') == '' || elem.attr('data-ypos') == undefined)
					elem.attr('data-ypos',y);					    
				if(backgroundPos[1] == '100%' ) y = (-y);
				var directionVrt = elem.hasClass('elb-bg-prlx-vrt-direction-top') ? 1 : -1;
				var yPosition  = (window.pageYOffset * Number(vrtSpeed) ) - parseFloat(elem.attr('data-ypos') * directionVrt) + 'px';     							
				if(elem.attr('data-ypos-start') == '0%')	
					yPosition =	 parseFloat(elem.attr('data-ypos')) - (window.pageYOffset * Number(vrtSpeed) * directionVrt) + 'px'; 
				if(elem.attr('data-ypos-start') == '50%')
					yPosition  = 'calc(50% + '+((window.pageYOffset * Number(vrtSpeed) * directionVrt))+'px)';
				if(elem.attr('data-ypos-start') == '100%')
					yPosition  = 'calc(100% + '+((window.pageYOffset * Number(vrtSpeed) * directionVrt))+'px)';
				elem.css('background-position-y', yPosition);
			}

		}//Visible
	});

}
