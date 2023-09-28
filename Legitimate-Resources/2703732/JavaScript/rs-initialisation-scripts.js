
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
					sliderLayout:"fullwidth",
					visibilityLevels:"1240,1024,778,480",
					gridwidth:1270,
					gridheight:472,
					hideLayerAtLimit:768,
					lazyType:"smart",
					spinner:"spinner5",
					perspectiveType:"local",
					responsiveLevels:"1240,1024,778,480",
					progressBar: {
						color:"#FFFFFF",
						vertical:"hide",
						size:5
						},
					navigation: {
						mouseScrollNavigation:false,
						touch: {
							touchenabled:true
						}
					},
					viewPort: {
						global:true,
						globalDist:"-200px",
						enable:false,
						visible_area:"40%"
					},
					fallbacks: {
						simplifyAll:"",
						allowHTML5AutoPlayOnAndroid:true
					},
			});
			
		}} // End of RevInitScript

		if (window.RS_MODULES.checkMinimal!==undefined) { window.RS_MODULES.checkMinimal();};
	