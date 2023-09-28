
setREVStartSize({c: jQuery('#rev_slider_1_3'), responsiveLevels: [1240,1240,1240,480], gridwidth: [1240,1240,1240,480], gridheight: [630,630,630,550], sliderLayout: 'auto'});</p>
<p>var revapi1,
	tpj=jQuery;</p>
<p>tpj(document).ready(function() {
	if(tpj("#rev_slider_1_3").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_1_3");
	}else{
		revapi1 = tpj("#rev_slider_1_3").show().revolution({
			sliderType:"standard",
			jsFileLocation:"//www.corplinkservices.com.au/wp-content/plugins/revslider/public/assets/js/",
			sliderLayout:"auto",
			dottedOverlay:"none",
			delay:9000,
			navigation: {
				keyboardNavigation:"off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation:"off",
 							mouseScrollReverse:"default",
				onHoverStop:"off",
				touch:{
					touchenabled:"on",
					touchOnDesktop:"off",
					swipe_threshold: 75,
					swipe_min_touches: 1,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				}
				,
				arrows: {
					style:"gyges",
					enable:true,
					hide_onmobile:false,
					hide_onleave:false,
					tmp:'',
					left: {
						h_align:"left",
						v_align:"center",
						h_offset:20,
						v_offset:0
					},
					right: {
						h_align:"right",
						v_align:"center",
						h_offset:20,
						v_offset:0
					}
				}
			},
			responsiveLevels:[1240,1240,1240,480],
			visibilityLevels:[1240,1240,1240,480],
			gridwidth:[1240,1240,1240,480],
			gridheight:[630,630,630,550],
			lazyType:"none",
			shadow:0,
			spinner:"spinner0",
			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,
			shuffle:"off",
			autoHeight:"off",
			disableProgressBar:"on",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		});
jQuery('body').on('click', '.video-button', function() {</p>
<p>  var slide = jQuery(this).closest('li'),
  vid = slide.find('.youtube-video').show();
  vid.find('video')[0].play();</p>
<p>	console.log(vid);</p>
<p>});</p>
<p>// change the "revapi1" parts to whatever api name is used for your slider
revapi1.on('revolution.slide.onchange', function() {</p>
<p>  revapi1.find('.youtube-video').hide();</p>
<p>});	}</p>
<p>});	/*ready*/
