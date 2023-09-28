var	tpj = jQuery;

		var	revapi1;

		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["woodmartmainslider"] = {once: RS_MODULES.modules["woodmartmainslider"]!==undefined ? RS_MODULES.modules["woodmartmainslider"].once : undefined, init:function() {
			window.revapi1 = window.revapi1===undefined || window.revapi1===null || window.revapi1.length===0  ? document.getElementById("woodmart-main-slider") : window.revapi1;
			if(window.revapi1 === null || window.revapi1 === undefined || window.revapi1.length==0) { window.revapi1initTry = window.revapi1initTry ===undefined ? 0 : window.revapi1initTry+1; if (window.revapi1initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["woodmartmainslider"].init()}); return;}
			window.revapi1 = jQuery(window.revapi1);
			if(window.revapi1.revolution==undefined){ revslider_showDoubleJqueryError("woodmart-main-slider"); return;}
			revapi1.revolutionInit({
					revapi:"revapi1",
					sliderLayout:"fullwidth",
					visibilityLevels:"1240,1024,778,480",
					gridwidth:"1240,1024,778,480",
					gridheight:"495,476,500,600",
					lazyType:"smart",
					spinner:"spinner0",
					perspective:600,
					perspectiveType:"local",
					editorheight:"495,476,500,600",
					responsiveLevels:"1240,1024,778,480",
					progressBar:{disableProgressBar:true},
					navigation: {
						mouseScrollNavigation:false,
						touch: {
							touchenabled:true,
							touchOnDesktop:true,
							swipe_min_touches:50
						},
						arrows: {
							enable:true,
							style:"metis",
							hide_onmobile:true,
							hide_under:778,
							left: {

							},
							right: {

							}
						},
						bullets: {
							enable:true,
							tmp:"",
							style:"hermes"
						}
					},
					parallax: {
						levels:[1,2,3,4,5,6,7,8,45,46,47,48,49,50,51,55],
						type:"mouse",
						disable_onmobile:true
					},
					viewPort: {
						global:true,
						globalDist:"-200px",
						enable:true,
						visible_area:"20%",
						presize:true
					},
					fallbacks: {
						allowHTML5AutoPlayOnAndroid:true
					},
			});
			
		}} // End of RevInitScript

		if (window.RS_MODULES.checkMinimal!==undefined) { window.RS_MODULES.checkMinimal();};