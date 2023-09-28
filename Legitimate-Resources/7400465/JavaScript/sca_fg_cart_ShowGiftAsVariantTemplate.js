
  
  <div class="item not-sca-qv" id="sca-freegift-{{variantID}}">
    <a href="/products/{{productHandle}}?variant={{originalVariantID}}" target="_blank"><img style="margin-left: auto; margin-right: auto; width: 50%;" class="lazyOwl" data-src="{{variantImageURL}}"></a>
    <div class="sca-product-shop">
      <div class="review-summary3">
        <div class="yotpo bottomLine" style="text-align:center"
          data-product-id="{{productID}}"
          data-product-models="{{productID}}"
          data-name="{{productTitle}}"
          data-url="/products/{{productHandle}}">
        </div>
      </div>
      <div class="f-fix">
        <span class="sca-product-title" style="white-space: nowrap;color:#000;">{{variantTitle}}</span>
        <div class="sca-price">
          <span class="sca-old-price">{{variant_compare_at_price}}</span>
          <span class="sca-special-price">{{variant_price}}</span>
        </div>
        <button type="button" id="sca-btn{{variantID}}" class="sca-button" onclick="SECOMAPP.addGiftToCart({{variantID}},1);">
          <span>{{AddToCartButton}}</span>
        </button>
      </div>
    </div>
  </div>
  
