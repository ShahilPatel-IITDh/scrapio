
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
					DPR:"dpr",
					visibilityLevels:"1240,1024,778,480",
					gridwidth:1240,
					gridheight:868,
					lazyType:"smart",
					spinner:"spinner0",
					perspective:600,
					perspectiveType:"local",
					editorheight:"868,768,960,720",
					responsiveLevels:"1240,1024,778,480",
					progressBar:{disableProgressBar:true},
					navigation: {
						mouseScrollNavigation:false,
						wheelCallDelay:1000,
						onHoverStop:false,
						touch: {
							touchenabled:true,
							swipe_threshold:0
						},
						arrows: {
							enable:true,
							tmp:"<div class=\"tp-arr-allwrapper\">	<div class=\"tp-arr-imgholder\"></div></div>",
							style:"hades",
							left: {
								h_offset:0
							},
							right: {
								h_offset:0
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
	