

	{{# showPlaceholder }}

		{{# placeholderItems }}

			<div class="live-search-results-products-content-placeholder">
               <div class="live-search-results-products-content-placeholder-image">
               </div><!--live-search-results-products-content-placeholder-image-->
               <div class="live-search-results-products-content-placeholder-content">
                  <div class="live-search-results-products-content-placeholder-content-title">
                  </div>
                  <div class="live-search-results-products-content-placeholder-content-price">
                  </div>
               </div><!--live-search-results-products-content-placeholder-content-->
            </div><!--live-search-results-products-content-placeholder-->

		{{/ placeholderItems }}

	{{/ showPlaceholder }}

	{{^ showPlaceholder }}

		{{# productList }}

			{{# hasAtLeastOneItem }}

				{{# items }}

					<div class="live-search-results-products-content">

		               <div class="live-search-results-products-content-image">
		               	{{# hasThumbnail }}
		               		{{# thumbnailIsFromEmbed }}
		               			<img src="{{ embedThumbnail }}" />
		               		{{/ thumbnailIsFromEmbed }}
		               		{{^ thumbnailIsFromEmbed }}
		               			<img src="{{ thumbnailResizedImage.300w.src }}" />
		               		{{/ thumbnailIsFromEmbed }}
		               	{{/ hasThumbnail }}
		               	{{^ hasThumbnail }}
		               		<div class="media-not-provided-thumbnail-wrapper">
								<img src="/images/themes/_core/media-not-provided-dark.svg" class="media-not-provided-thumbnail">
							</div><!--media-not-provided-thumbnail-wrapper-->
		               	{{/ hasThumbnail }}
		               </div><!--live-search-results-products-content-image-->

		               <div class="live-search-results-products-content-content">

		                  <div class="live-search-results-products-content-content-title">
		                  	{{ name }}
		                  </div><!--live-search-results-products-content-content-title-->

		                  {{^ isSubscription }}
		                  	{{^ isCoaching }}
		                  		{{^ isCourse }}
		                  			{{^ isBundle }}
					                  	{{^ hasVariants }}
						                  <div class="live-search-results-products-content-content-price">
						                  	{{# isFree }}
						                  		{{ lang.section_header_live_search_free }}
						                  	{{/ isFree }}
						                  	{{^ isFree }}
						                  		{{{ currencySymbol }}}{{ price }}{{# isPwyw }}+{{/ isPwyw }}
						                  	{{/ isFree }}
						                  </div><!--live-search-results-products-content-content-price-->
						                {{/ hasVariants }}
					                {{/ isBundle }}
				                {{/ isCourse }}
			                {{/ isCoaching }}
		                  {{/ isSubscription }}

		               </div><!--live-search-results-products-content-content-->

		               <a href="{{ canonicalUrl }}" class="live-search-results-products-content-content-url"></a>

		            </div><!--live-search-results-products-content-->

	            {{/ items }}

            {{/ hasAtLeastOneItem }}

            {{^ hasAtLeastOneItem }}

            	<div class="live-search-no-results-found-message">
            		{{ lang.section_header_live_no_results_found_message }} "{{ query }}"
            	</div><!--live-search-no-results-found-message-->

            	<div class="live-search-no-results-found-link">
            		<a href="{{ user.url.shop }}">{{ lang.section_header_live_no_results_found_link }}</a>
            	</div><!--live-search-no-results-found-link-->

            {{/ hasAtLeastOneItem }}

		{{/ productList }}

	{{/ showPlaceholder }}

