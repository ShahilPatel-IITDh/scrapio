
		var	tpj = jQuery;

		var	revapi36;

		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider361"] = {once: RS_MODULES.modules["revslider361"]!==undefined ? RS_MODULES.modules["revslider361"].once : undefined, init:function() {
			window.revapi36 = window.revapi36===undefined || window.revapi36===null || window.revapi36.length===0  ? document.getElementById("rev_slider_36_1") : window.revapi36;
			if(window.revapi36 === null || window.revapi36 === undefined || window.revapi36.length==0) { window.revapi36initTry = window.revapi36initTry ===undefined ? 0 : window.revapi36initTry+1; if (window.revapi36initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider361"].init()}); return;}
			window.revapi36 = jQuery(window.revapi36);
			if(window.revapi36.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_36_1"); return;}
			revapi36.revolutionInit({
					revapi:"revapi36",
					DPR:"dpr",
					sliderLayout:"fullwidth",
					visibilityLevels:"1240,1024,768,480",
					gridwidth:1240,
					gridheight:900,
					lazyType:"smart",
					perspective:600,
					perspectiveType:"global",
					editorheight:"900,768,960,720",
					responsiveLevels:"1240,1024,768,480",
					progressBar: {
						size:5,
						x:0,
						y:0
						},
					navigation: {
						onHoverStop:false
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
	