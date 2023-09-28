
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
					sliderLayout:"fullwidth",
					duration:"5000ms",
					visibilityLevels:"1240,1024,778,480",
					gridwidth:"1240,1024,778,480",
					gridheight:"900,768,778,480",
					lazyType:"smart",
					spinner:"spinner0",
					perspective:600,
					perspectiveType:"global",
					editorheight:"900,768,778,480",
					responsiveLevels:"1240,1024,778,480",
					progressBar:{disableProgressBar:true},
					navigation: {
						onHoverStop:false,
						arrows: {
							enable:true,
							style:"hesperiden",
							left: {
								h_offset:30
							},
							right: {
								h_offset:30
							}
						},
						bullets: {
							enable:true,
							tmp:"<span class=\"tp-bullet-image\"></span><span class=\"tp-bullet-imageoverlay\"></span><span class=\"tp-bullet-title\">{{title}}</span>",
							style:"zeus"
						}
					},
					parallax: {
						levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,30],
						type:"scroll",
						origo:"slidercenter",
						speed:0
					},
					scrolleffect: {
						set:true,
						multiplicator:1.3,
						multiplicator_layers:1.3
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
	