

	{{!
	IMPORTANT NOTE:
	DUPLICATE ANY WORK DONE HERE IN THE TEMPLATE
	template/customers-reviews-rows
}}
{{!
	IMPORTANT NOTE:
	DUPLICATE ANY WORK DONE HERE IN THE TEMPLATE
	template/customers-reviews-rows
}}
{{!
	IMPORTANT NOTE:
	DUPLICATE ANY WORK DONE HERE IN THE TEMPLATE
	template/customers-reviews-rows
}}

{{# items }}

	<div class="customer-review-row js-customer-review-row row custom-style-color-misc-border show-full-review-message" style="
		{{# importedWithEmptyTitleAndMessage }}
			display: none;
		{{/ importedWithEmptyTitleAndMessage }}
	">

		<div class="col-md-3 customer-review-row-secondary-column">

			<p class="font-section-{{ global.constant.EDITORV2_SECTION_KEY_CUSTOMER_REVIEWS }}-reviewerName">{{ authorName }}</p>

			{{# isVerifiedBuyer }}

				<div class="verified-buyer-badge font-section-{{ global.constant.EDITORV2_SECTION_KEY_CUSTOMER_REVIEWS }}-verifiedBuyerBadge">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon" fill="currentColor" viewBox="0 0 16 16">
						<path class="builder-pointer-events-none-in-color-tweaks-manager" fill-rule="evenodd" d="M8,0C7.3,0,6.2,0.3,5.1,0.6C4,0.9,2.8,1.2,2.2,1.4c-0.6,0.2-1,0.7-1,1.3c-0.6,4.5,0.8,7.8,2.5,10
						c0.7,0.9,1.6,1.8,2.5,2.5c0.4,0.3,0.7,0.5,1,0.6C7.5,15.9,7.8,16,8,16s0.5-0.1,0.8-0.2c0.4-0.2,0.7-0.4,1-0.6c1-0.7,1.8-1.5,2.5-2.5
						c1.7-2.2,3.1-5.5,2.5-10c-0.1-0.6-0.5-1.1-1-1.3c-1-0.3-1.9-0.6-2.9-0.9C9.8,0.3,8.7,0,8,0z M11.1,4.2c0.3-0.3,0.8-0.3,1.1,0
						s0.3,0.8,0,1.1L7.7,9.8c-0.3,0.3-0.8,0.3-1.1,0c0,0,0,0,0,0L4.3,7.5c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l1.7,1.7L11.1,4.2z"/>
					</svg>
					{{ lang.section_customer_reviews_verified_buyer }}
				</div><!--verified-buyer-badge-->

			{{/ isVerifiedBuyer }}

			{{# productIsRecommended }}

				<div class="recommended-badge font-section-{{ global.constant.EDITORV2_SECTION_KEY_CUSTOMER_REVIEWS }}-recommendedBadge">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon" fill="currentColor" viewBox="0 0 16 16">
					  <path class="builder-pointer-events-none-in-color-tweaks-manager" d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
					</svg>
					{{ lang.section_customer_reviews_product_is_recommended }}
				</div><!--recommended-badge-->

			{{/ productIsRecommended }}

		</div><!--col-md-3-->

		<div class="col-md-9 customer-review-row-primary-column custom-style-color-misc-border">

			<div class="row">

				<div class="col-6">

					<div class="star-rating">
						<span class="star-rating-indicator builder-pointer-events-none-in-color-tweaks-manager">
							<div class="star-rating-indicator-layer">
								<svg width="80" height="14" viewBox="0 0 80 14" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<path id="star-rating-svg-path" d="M71.996 11.368l-3.94 2.42c-.474.292-.756.096-.628-.443l1.074-4.53-3.507-3.022c-.422-.363-.324-.693.24-.74l4.602-.37 1.778-4.3c.21-.51.55-.512.762 0l1.78 4.3 4.602.37c.552.046.666.37.237.74l-3.507 3.02 1.075 4.532c.127.536-.147.74-.628.444l-3.94-2.422zM55.996 11.368l-3.94 2.42c-.474.292-.756.096-.628-.443l1.074-4.53-3.507-3.022c-.422-.363-.324-.693.24-.74l4.602-.37 1.778-4.3c.21-.51.55-.512.762 0l1.78 4.3 4.602.37c.552.046.666.37.237.74l-3.507 3.02 1.075 4.532c.127.536-.147.74-.628.444l-3.94-2.422zM40.123 11.368l-3.94 2.42c-.475.292-.756.096-.63-.443l1.076-4.53-3.508-3.022c-.422-.363-.324-.693.24-.74l4.602-.37 1.778-4.3c.21-.51.55-.512.762 0l1.778 4.3 4.603.37c.554.046.667.37.24.74l-3.508 3.02 1.075 4.532c.127.536-.147.74-.628.444l-3.94-2.422zM24.076 11.368l-3.94 2.42c-.475.292-.757.096-.63-.443l1.076-4.53-3.507-3.022c-.422-.363-.324-.693.238-.74l4.603-.37 1.78-4.3c.21-.51.55-.512.76 0l1.78 4.3 4.602.37c.554.046.667.37.24.74l-3.508 3.02 1.074 4.532c.127.536-.146.74-.628.444l-3.94-2.422zM8.123 11.368l-3.94 2.42c-.475.292-.756.096-.63-.443l1.076-4.53L1.12 5.792c-.422-.363-.324-.693.24-.74l4.602-.37 1.778-4.3c.21-.51.55-.512.762 0l1.778 4.3 4.603.37c.554.046.667.37.24.74l-3.508 3.02 1.075 4.532c.127.536-.147.74-.628.444l-3.94-2.422z"/>
										<clipPath id="clip-path-stoke-inside-only-star-rating">
									      <use xlink:href="#star-rating-svg-path"/>
									    </clipPath>
									</defs>
									<use
									xlink:href="#star-rating-svg-path"
									 stroke="currentColor" stroke-width="2" stroke-linecap="butt" fill="none" fill-rule="evenodd"
									clip-path="url(#clip-path-stoke-inside-only-star-rating)"/>
								</svg>
							</div><!--star-rating-indicator-layer-->
							<div class="star-rating-indicator-layer star-rating-indicator-layer-foreground" style="width: {{ ratingPercentage }}">
								<svg width="80" height="14" viewBox="0 0 80 14" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<path id="star-rating-svg-path" d="M71.996 11.368l-3.94 2.42c-.474.292-.756.096-.628-.443l1.074-4.53-3.507-3.022c-.422-.363-.324-.693.24-.74l4.602-.37 1.778-4.3c.21-.51.55-.512.762 0l1.78 4.3 4.602.37c.552.046.666.37.237.74l-3.507 3.02 1.075 4.532c.127.536-.147.74-.628.444l-3.94-2.422zM55.996 11.368l-3.94 2.42c-.474.292-.756.096-.628-.443l1.074-4.53-3.507-3.022c-.422-.363-.324-.693.24-.74l4.602-.37 1.778-4.3c.21-.51.55-.512.762 0l1.78 4.3 4.602.37c.552.046.666.37.237.74l-3.507 3.02 1.075 4.532c.127.536-.147.74-.628.444l-3.94-2.422zM40.123 11.368l-3.94 2.42c-.475.292-.756.096-.63-.443l1.076-4.53-3.508-3.022c-.422-.363-.324-.693.24-.74l4.602-.37 1.778-4.3c.21-.51.55-.512.762 0l1.778 4.3 4.603.37c.554.046.667.37.24.74l-3.508 3.02 1.075 4.532c.127.536-.147.74-.628.444l-3.94-2.422zM24.076 11.368l-3.94 2.42c-.475.292-.757.096-.63-.443l1.076-4.53-3.507-3.022c-.422-.363-.324-.693.238-.74l4.603-.37 1.78-4.3c.21-.51.55-.512.76 0l1.78 4.3 4.602.37c.554.046.667.37.24.74l-3.508 3.02 1.074 4.532c.127.536-.146.74-.628.444l-3.94-2.422zM8.123 11.368l-3.94 2.42c-.475.292-.756.096-.63-.443l1.076-4.53L1.12 5.792c-.422-.363-.324-.693.24-.74l4.602-.37 1.778-4.3c.21-.51.55-.512.762 0l1.778 4.3 4.603.37c.554.046.667.37.24.74l-3.508 3.02 1.075 4.532c.127.536-.147.74-.628.444l-3.94-2.422z"/>
										<clipPath id="clip-path-stoke-inside-only-star-rating">
									      <use xlink:href="#star-rating-svg-path"/>
									    </clipPath>
									</defs>
									<use
									xlink:href="#star-rating-svg-path"
									 stroke="currentColor" stroke-width="2" stroke-linecap="butt" fill="currentColor" fill-rule="evenodd"
									clip-path="url(#clip-path-stoke-inside-only-star-rating)"/>
								</svg>
							</div><!--star-rating-indicator-layer-foreground-->
						</span><!--star-rating-indicator-->
					</div><!--star-rating-->

				</div><!--col-6-->

				<div class="col-6">

					<p class="time-elapsed font-section-{{ global.constant.EDITORV2_SECTION_KEY_CUSTOMER_REVIEWS }}-timeElapsed">{{ date.timeElapsed }}</p>

				</div><!--col-6-->

			</div><!--row-->

			<h3 class="font-section-{{ global.constant.EDITORV2_SECTION_KEY_CUSTOMER_REVIEWS }}-reviewTitle">{{ reviewTitle }}</h3>

			<div class="review-message-wrapper-outer">

				<div class="review-message-wrapper-inner js-review-message-wrapper-inner richtext font-section-{{ global.constant.EDITORV2_SECTION_KEY_CUSTOMER_REVIEWS }}-reviewMessage">
					<div class="js-review-message">
						{{{ reviewMessage }}}
					</div><!--js-review-message-->
				</div><!--review-message-wrapper-inner-->

				<div class="review-message-gradient custom-style-color-misc-gradient"></div>

			</div><!--review-message-wrapper-outer-->

			<div class="review-message-show-more-wrapper">
				<a href="#!" class="js-review-message-show-more-link">
					{{ lang.section_customer_reviews_show_more }}
				</a>
			</div><!--review-message-show-more-wrapper-->

		</div><!--col-md-9-->

	</div><!--customer-review-row-->

{{/ items }}

{{# nextPageExists }}

	<div class="show-more-button-wrapper js-show-more-button-wrapper">

		<button type="button" class="btn btn-light btn-lg js-show-more-button">
			<span class="js-button-state-standard">
			    {{ lang.section_customer_reviews_show_more }}
			</span><!--js-button-state-standard-->

			<span class="js-button-state-loading" style="display: none;">
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				{{ lang.global_loading }}...
			</span><!--js-button-state-loading-->
		</button>

	</div><!--show-more-button-wrapper-->

{{/ nextPageExists }}
