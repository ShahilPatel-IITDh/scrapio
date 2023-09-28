
		var	tpj = jQuery;

		var	revapi1;

		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider11"] = {once: RS_MODULES.modules["revslider11"]!==undefined ? RS_MODULES.modules["revslider11"].once : undefined, init:function() {
			window.revapi1 = window.revapi1===undefined || window.revapi1===null || window.revapi1.length===0  ? document.getElementById("rev_slider_1_1") : window.revapi1;
			if(window.revapi1 === null || window.revapi1 === undefined || window.revapi1.length==0) { window.revapi1initTry = window.revapi1initTry ===undefined ? 0 : window.revapi1initTry+1; if (window.revapi1initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider11"].init()}); return;}
			window.revapi1 = jQuery(window.revapi1);
			if(window.revapi1.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_1_1"); return;}
			revapi1.revolutionInit({
					revapi:"revapi1",
					DPR:"dpr",
					sliderLayout:"fullscreen",
					visibilityLevels:"1240,1460,785,500",
					gridwidth:"1920,1440,778,480",
					gridheight:"810,650,480,480",
					minHeight:"400px",
					lazyType:"smart",
					perspective:600,
					perspectiveType:"global",
					editorheight:"810,650,480,480",
					responsiveLevels:"1240,1460,785,500",
					fullScreenOffset:"170px",
					progressBar:{disableProgressBar:true},
					navigation: {
						wheelCallDelay:1000,
						onHoverStop:false,
						touch: {
							touchenabled:true,
							touchOnDesktop:true
						},
						bullets: {
							enable:true,
							tmp:"",
							style:"bullets_dots_fill",
							v_offset:-1,
							space:30
						}
					},
					parallax: {
						levels:[1,2,3,4,5,6,7,8,9,10,12,15,17,20,25,30],
						type:"mouse",
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
	