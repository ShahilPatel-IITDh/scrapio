
		var	tpj = jQuery;

		var	revapi2;

		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider21"] = {once: RS_MODULES.modules["revslider21"]!==undefined ? RS_MODULES.modules["revslider21"].once : undefined, init:function() {
			window.revapi2 = window.revapi2===undefined || window.revapi2===null || window.revapi2.length===0  ? document.getElementById("rev_slider_2_1") : window.revapi2;
			if(window.revapi2 === null || window.revapi2 === undefined || window.revapi2.length==0) { window.revapi2initTry = window.revapi2initTry ===undefined ? 0 : window.revapi2initTry+1; if (window.revapi2initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider21"].init()}); return;}
			window.revapi2 = jQuery(window.revapi2);
			if(window.revapi2.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_2_1"); return;}
			revapi2.revolutionInit({
					revapi:"revapi2",
					sliderType:"hero",
					DPR:"dpr",
					sliderLayout:"fullwidth",
					visibilityLevels:"1240,1240,778,480",
					gridwidth:"1240,1240,778,480",
					gridheight:"790,790,400,400",
					lazyType:"smart",
					perspective:600,
					perspectiveType:"global",
					editorheight:"790,768,399.984,399.984",
					responsiveLevels:"1240,1240,778,480",
					progressBar:{disableProgressBar:true},
					navigation: {
						onHoverStop:false
					},
					parallax: {
						levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,30],
						type:"scroll",
						origo:"slidercenter",
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

		if (window.RS_MODULES.checkMinimal!==undefined) { window.RS_MODULES.checkMinimal();};
	