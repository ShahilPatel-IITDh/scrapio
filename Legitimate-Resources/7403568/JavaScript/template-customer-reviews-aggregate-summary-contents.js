

	<div class="rating-value font-section-{{ global.constant.EDITORV2_SECTION_KEY_CUSTOMER_REVIEWS }}-aggregateSummaryRatingValue custom-style-color-text-heading">
		{{# translate_complex }}
			section_customer_reviews_aggregate_summary_rating_value_out_of_5
		{{/ translate_complex }}
	</div><!--rating-value-->

	<div class="star-rating-wrapper">

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
				<div class="star-rating-indicator-layer star-rating-indicator-layer-foreground" style="width: {{ aggregateSummaryRatingPercentage }}">
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

	</div><!--star-rating-wrapper-->

	<p>
		{{# hasMoreThanOneReview }}

			{{# translate_complex }}
				section_customer_reviews_product_based_on_number_of_reviews_plural
			{{/ translate_complex }}

		{{/ hasMoreThanOneReview }}

		{{^ hasMoreThanOneReview }}

			{{# translate_complex }}
				section_customer_reviews_product_based_on_number_of_reviews_singular
			{{/ translate_complex }}

		{{/ hasMoreThanOneReview }}
	</p>

