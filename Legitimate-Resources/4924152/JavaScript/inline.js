var showbox_imObjectGallery_36 = {background: "#000000", textColor: "#000000", boxColor: "#FFFFFF", startIndex: 0, closeImg: "res/imClose.png", media:[{type: "image", url: "gallery/home_1_03.jpg", width: 350, height: 598, description: "", "effect": "none"},
				{type: "image", url: "gallery/home_1_01.jpg", width: 350, height: 347, description: "", "effect": "none"},
				{type: "image", url: "gallery/home_1_02.jpg", width: 350, height: 492, description: "", "effect": "none"},
				{type: "image", url: "gallery/home_1_05.jpg", width: 350, height: 303, description: "", "effect": "none"},
				{type: "image", url: "gallery/home_1_00.jpg", width: 350, height: 273, description: "", "effect": "none"},
				{type: "image", url: "gallery/home_1_06.jpg", width: 230, height: 162, description: "", "effect": "none"},
				{type: "image", url: "gallery/home_1_07.jpg", width: 350, height: 275, description: "", "effect": "none"}
				]};
				function loadimObjectGallery_36() {
					var bp = x5engine.responsive.getCurrentBreakPoint();
					$('#imObjectGallery_36 img').add('#imObjectGallery_36 .imRunner').add('#imObjectGallery_36 .imGlContent').add('#imObjectGallery_36').css({ width: '', height: '' });
					$('#imObjectGallery_36 .imLeftArrow').add('#imObjectGallery_36 .imRightArrow').css('height', '');
					if(!!bp && bp.fluid) {
						$('#imObjectGallery_36 .imGlContent').width($('#imObjectGallery_36').width());
						var thumbsSize = Math.round($('#imObjectGallery_36 .imGlContent').width() / (bp.fluid ? 1 : 7)) - 2;
						$('#imObjectGallery_36').add('#imObjectGallery_36 .imLeftArrow').add('#imObjectGallery_36 .imRightArrow').height(thumbsSize * 7);
						$('#imObjectGallery_36 img').width(thumbsSize).height(thumbsSize);
						$('#imObjectGallery_36 .imRunner').width(thumbsSize * 1).height(thumbsSize * 7);
					}
						$('#imObjectGallery_36 .imRunner').css('top', 0);
				
					$('#imContent').one('breakpointChangedOrFluid', loadimObjectGallery_36);
				
				}
				x5engine.boot.push(loadimObjectGallery_36);
				