function setDrawProperties() {
	var pageWidth = jQuery(window).width();
	if (pageWidth > 968) {
		
		var elIds = ["boyImg", "findBtn", "shipImg", "donImg"];    //Put in the array the element's id
		
		jQuery.each(elIds, function(key, value) {
			var el = jQuery("#"+value);
			if (el.length > 0) {
				setTimeout(function() {		
					
					//	Call draw line around elements, allowed params: 
					//	Function: drawCanvas(el, elPadding, rightBigGap, arc, targetSectionId, breadcrumb, linecolor)	
					//		el - don't change,
					// 		padding - set padding around element
					//		rightBigGap - a gap from an element to the line turning down
					//		arc - radius of rounded corners
					//		targetSectionId - an id where to draw the line - give secion's id where the element is placed
					//		breadcrumb - if a page has a breadcrumb then check as true to draw thru
					//		linecolor - color of a drawing line
					//	Add a case to switch statement with a proper function call
					
					switch(value) {
						case "boyImg":
							drawCanvas(el, 20, 108, 20, "about-content", true, "#00907B");	
							break;
						case "findBtn":
							drawCanvas(el, 18, 100, 28, "find-section", false, "#6df0ea");	
							break;
						case "shipImg":
							drawCanvas(el, 20, 108, 20, "order-content", true, "#00907B");	
							break;
						case "donImg":
							drawCanvas(el, 20, 108, 20, "donate-content", true, "#00907B");	
							break;
					}

				
				}, 10);	
			}
		});
		
	}	
}

function drawCanvas(el, elPadding, rightBigGap, arc, targetSectionId, breadcrumb, linecolor) {
	var elWidth = el.width(),
			elHeight = el.height(),
			breadHeight = breadcrumb ? jQuery(".breadcrumb").outerHeight() : 0,
			a = jQuery("#"+targetSectionId),
			canvasHookHeight = a.outerHeight() + breadHeight,
			canvasHookWidth = a.outerWidth(), 
			offsetX = Math.round((jQuery(window).width() - canvasHookWidth) / 2), 
			offsetY = a.offset().top - breadHeight,
			elLeft = el.offset().left - offsetX,
			elTop	= el.offset().top - offsetY,
			x = elLeft + elWidth + elPadding,
			y = 0;
	
	canvasHook = document.createElement("canvas");		
	canvasHook.setAttribute("id", "about-canvas");
	canvasHook.setAttribute("height", canvasHookHeight);
	canvasHook.setAttribute("width", canvasHookWidth);
	canvasHook.setAttribute("style", "pointer-events:none; position: absolute; left: 0px; z-index: 0; top: -"+breadHeight+"px;");
	jQuery("#" + targetSectionId)[0].appendChild(canvasHook);
	
	var elCanvas = jQuery("#about-canvas")[0],
			ctx = elCanvas.getContext("2d");

	ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
	ctx.beginPath();   
	ctx.strokeStyle = linecolor;
	ctx.lineWidth = 2;    
	ctx.moveTo(x, y);  
	y = elTop + elHeight - arc + elPadding;
	ctx.lineTo(x, y);    
	y = y + arc;
	x = x - arc;
	ctx.arcTo(x + arc, y, x, y, arc);               	 
	x = x - elWidth - elPadding + (arc - elPadding);
	ctx.lineTo(x, y); 
	y = y - elHeight - 2 * elPadding;     
	ctx.lineTo(x, y);  
	x = x + elWidth + elPadding + rightBigGap - arc;
	ctx.lineTo(x, y);
	x = x + arc;
	y = y + arc;  
	ctx.arcTo(x, y - arc, x, y, arc);      
	y = canvasHookHeight;
	ctx.lineTo(x, y);       
	ctx.stroke();   
	
}

jQuery(document).on("ready", function() {
    "use strict";
    
	jQuery(".click-button").removeClass("full-mega");

	jQuery(".click-button.countries .icon").click(function(evt) {
					evt.preventDefault();
					var e = jQuery("#site-header"),
								 t = e.width(),
								 i = e.offset(),
								 o = jQuery(".click-button").offset(),
								 n = o.left - i.left + 1;

					jQuery("#site-header").hasClass("medium-header") && (t = (e = jQuery("#site-navigation-wrap > .container")).width(), i = e.offset(), n = o.left - i.left + 1), jQuery("body").hasClass("boxed-layout") && (n = o.left - i.left + 1, n -= 30), jQuery(".click-button").find(".megamenu").css({
							left: "-" + n + "px",
							width: t
					})

	var $this=jQuery(".click-button.countries .icon._image");
	if ($this.hasClass("image-in")) {$this.attr("src","https://usa.lifewords.global/wp-content/uploads/2019/11/globe-white-30-1.png").toggleClass("image-in");}
	else {$this.attr("src","https://usa.lifewords.global/wp-content/uploads/2019/11/globe-white-30-1.png").toggleClass("image-in")}

	jQuery(".click-button.countries .sub-menu").toggleClass("open");
 
	});
	
	jQuery(".oceanwp-mobile-menu-icon .mobile-menu").click(function(e) {
		jQuery("#site-header").toggleClass("mopen");
	});

	setDrawProperties();
	
	var globalResizeTimer = null;
	jQuery(window).resize(function() {
		if(globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
		globalResizeTimer = window.setTimeout(function() {
			setDrawProperties();
		}, 200);
	});
	
	//Add current year
	jQuery("#current_year").text((new Date).getFullYear());	
});

