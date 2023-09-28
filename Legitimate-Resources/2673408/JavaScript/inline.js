




			$(window).on("load ", function() {

				
				$('.gallery-image-div').matchHeight();
				$('.item-container').matchHeight();
				$('.equalheight').matchHeight();
				$('.matchheight').matchHeight();
				$('.element_smart_featurebox').matchHeight();
				$('.page_element.well').matchHeight();
				$('.page_element.element_smart_featurebox').matchHeight();
				$('.departmentwithinitem').matchHeight();
				$('.page_element.equal').matchHeight({ byRow: false});
				$('.productitem ').matchHeight({ byRow: true});
				$('.listerfeed.itemlisterlist .col-md-4').matchHeight();
							
				//Google translate fixes
			
				
				
			
			
			});

			$(document).ready(function(){

				// english,portuguese,french,german,spanish,Chinese
				$('.translation-links .english').attr("data-lang","English,Inglês,Anglais,Englisch,Inglés,英語");
				$('.translation-links .french').attr("data-lang","French,Francês,Français,Französisch,法語");
				$('.translation-links .german').attr("data-lang","German,Alemão,Allemand,Deutsch,Alemán,德語");
				$('.translation-links .welsh').attr("data-lang","Welsh,Galês,Gallois,Walisisch,Galés,威爾士語");
				$('.translation-links .chinese').attr("data-lang","Chinese,chinês,Chinois,Chinesisch,Chino,中國人");
				$('.translation-links .japanese').attr("data-lang","Japanese,japonês,Japonais,japanisch,Japonés,日本人");
			

				



				$('.translation-links a').off("click").on("click",function() {
					var lang = $(this).data('lang');
					var frame = $('iframe.skiptranslate');
					if (!frame.length) {
						alert("Error: Could not find Google translate frame.");
						return false;
					}
					languages = $(this).data('lang').split(",");
			

					$.each(languages,function(key,value){
						console.log(value);
							
							switcher = frame.contents().find(' span.text:contains('+value+')').get(0)
							
							if(frame.contents().find(' span.text:contains('+value+')').get(0)){
								switcher.click()
							}
							
						
					})
					
					return false;
				});
			})
		