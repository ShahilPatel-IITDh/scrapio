
		var	tpj = jQuery;

		var	revapi1,revapi6;

		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider11"] = {once: RS_MODULES.modules["revslider11"]!==undefined ? RS_MODULES.modules["revslider11"].once : undefined, init:function() {
			window.revapi1 = window.revapi1===undefined || window.revapi1===null || window.revapi1.length===0  ? document.getElementById("rev_slider_1_1") : window.revapi1;
			if(window.revapi1 === null || window.revapi1 === undefined || window.revapi1.length==0) { window.revapi1initTry = window.revapi1initTry ===undefined ? 0 : window.revapi1initTry+1; if (window.revapi1initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider11"].init()}); return;}
			window.revapi1 = jQuery(window.revapi1);
			if(window.revapi1.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_1_1"); return;}
			revapi1.revolutionInit({
					revapi:"revapi1",
					sliderLayout:"fullwidth",
					visibilityLevels:"1240,1024,778,480",
					gridwidth:"1240,1024,778,480",
					gridheight:"900,768,960,720",
					lazyType:"smart",
					spinner:"spinner4",
					perspectiveType:"local",
					editorheight:"900,768,960,720",
					responsiveLevels:"1240,1024,778,480",
					progressBar:{disableProgressBar:true},
					navigation: {
						onHoverStop:false
					},
					parallax: {
						levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,30],
						type:"scroll",
						origo:"slideCenter",
						speed:0
					},
					viewPort: {
						global:true,
						globalDist:"-200px",
						enable:false
					},
					fallbacks: {
						allowHTML5AutoPlayOnAndroid:true
					},
			});
			
		}} // End of RevInitScript

		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider62"] = {once: RS_MODULES.modules["revslider62"]!==undefined ? RS_MODULES.modules["revslider62"].once : undefined, init:function() {
			window.revapi6 = window.revapi6===undefined || window.revapi6===null || window.revapi6.length===0  ? document.getElementById("rev_slider_6_2") : window.revapi6;
			if(window.revapi6 === null || window.revapi6 === undefined || window.revapi6.length==0) { window.revapi6initTry = window.revapi6initTry ===undefined ? 0 : window.revapi6initTry+1; if (window.revapi6initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider62"].init()}); return;}
			window.revapi6 = jQuery(window.revapi6);
			if(window.revapi6.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_6_2"); return;}
			revapi6.revolutionInit({
					revapi:"revapi6",
					sliderType:"carousel",
					visibilityLevels:"1240,1024,778,480",
					gridwidth:800,
					gridheight:500,
					lazyType:"smart",
					spinner:"spinner3",
					perspectiveType:"local",
					editorheight:"500,768,960,720",
					responsiveLevels:"1240,1024,778,480",
					carousel: {
						infinity:true,
						space:20,
						maxVisibleItems:5
					},
					progressBar:{disableProgressBar:true},
					navigation: {
						mouseScrollNavigation:false,
						onHoverStop:false,
						arrows: {
							enable:true,
							style:"hesperiden",
							left: {

							},
							right: {

							}
						}
					},
					viewPort: {
						global:true,
						globalDist:"-200px",
						enable:false,
						visible_area:"20%"
					},
					fallbacks: {
						allowHTML5AutoPlayOnAndroid:true
					},
			});
			
		}} // End of RevInitScript

		if (window.RS_MODULES.checkMinimal!==undefined) { window.RS_MODULES.checkMinimal();};
	