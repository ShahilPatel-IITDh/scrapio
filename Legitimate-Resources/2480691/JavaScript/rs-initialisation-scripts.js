
		var	tpj = jQuery;

		var	revapi2,revapi4;

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
					duration:6000,
					visibilityLevels:"1240,1024,778,480",
					gridwidth:"1400,1024,920,480",
					gridheight:"500,365,400,330",
					lazyType:"smart",
					perspective:600,
					perspectiveType:"local",
					editorheight:"500,365,400,330",
					responsiveLevels:"1240,1024,778,480",
					progressBar:{disableProgressBar:true},
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

		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider42"] = {once: RS_MODULES.modules["revslider42"]!==undefined ? RS_MODULES.modules["revslider42"].once : undefined, init:function() {
			window.revapi4 = window.revapi4===undefined || window.revapi4===null || window.revapi4.length===0  ? document.getElementById("rev_slider_4_2") : window.revapi4;
			if(window.revapi4 === null || window.revapi4 === undefined || window.revapi4.length==0) { window.revapi4initTry = window.revapi4initTry ===undefined ? 0 : window.revapi4initTry+1; if (window.revapi4initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider42"].init()}); return;}
			window.revapi4 = jQuery(window.revapi4);
			if(window.revapi4.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_4_2"); return;}
			revapi4.revolutionInit({
					revapi:"revapi4",
					sliderType:"hero",
					DPR:"dpr",
					sliderLayout:"fullwidth",
					duration:6000,
					visibilityLevels:"1240,1024,778,480",
					gridwidth:"1400,1024,920,480",
					gridheight:"530,365,400,330",
					lazyType:"smart",
					perspective:600,
					perspectiveType:"local",
					editorheight:"530,365,400,330",
					responsiveLevels:"1240,1024,778,480",
					progressBar:{disableProgressBar:true},
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
	