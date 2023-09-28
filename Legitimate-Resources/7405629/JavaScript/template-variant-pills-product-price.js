

	
	{{# selectedVariant.onSale }}

		
		<div class="badge-product-on-sale-wrapper"
						style="display: block;"
		>
			<span class="badge-general badge-product-on-sale font-section-collection-onSaleBadge">
				On Sale			</span><!--badge-product-on-sale-->
		</div><!--badge-product-on-sale-wrapper-->

				{{# selectedVariant.isOnSaleV2 }}

			<div class="on-sale-v2-block" style="display: block;">

				<div class="sale-v2-time-remaining-message font-section-product-saleV2TimeRemainingMessage">
				    {{ selectedVariant.saleV2TimeRemainingData.message }}
				</div><!--sale-v2-time-remaining-message-->

			</div><!--on-sale-v2-block-->

		{{/ selectedVariant.isOnSaleV2 }}

		<div class="product-price-before-discount font-section-product-priceBeforeDiscount"
						style="display: block;">
					    <span class="product-price-before-discount-value">{{{ selectedVariant.priceBeforeSaleFormattedWithCurrency }}}</span><!--product-price-before-discount-value-->
		    {{# selectedVariant.isOnSaleV2 }}
		    	<span class="sale-v2-percentage-discount-label">
		    				    		{{# selectedVariant }}
			    		({{# translateComplex }}
	                       section_product_sale_percentage_off
	                    {{/ translateComplex }})
                    {{/ selectedVariant }}
		    	</span><!--sale-v2-percentage-discount-->
		    {{/ selectedVariant.isOnSaleV2 }}
		</div><!--product-price-before-discount-->

	{{/ selectedVariant.onSale }}

	<div class="product-price">

	    
	    	    <span class="value js-product-price-value custom-style-color-text-heading font-section-product-price">{{{ selectedVariant.priceFormattedWithCurrency }}}</span>

	</div><!--product-price-->

