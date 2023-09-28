
  
  <div class="item not-sca-qv" id="sca-freegift-{{productID}}">
    <a class="close_box" style="display: none;position: absolute;top:5px;right: 10px;font-size: 22px;font-weight: bold;cursor: pointer;text-decoration:none;color: #aaa;">×</a>
    <a href="/products/{{productHandle}}" target="_blank"><img style="margin-left: auto; margin-right: auto; width: 50%;" class="lazyOwl" data-src="{{productImageURL}}"></a>
    <div class="sca-product-shop">
      <div class="review-summary3">
        <div class="yotpo bottomLine" style="text-align:center"
          data-product-id="{{productID}}"
          data-product-models="{{productID}}"
          data-name="{{productTitle}}"
          data-url="/products/{{productHandle}}">
        </div>
      </div>
      <div class="f-fix"><span class="sca-product-title" style="white-space: nowrap;color:#000;{{showfgTitle}}">{{productTitle}}</span>
          <div id="product-variants-{{productID}}">
            <div class="sca-price" id="price-field-{{productID}}">
              <span class="sca-old-price">{{variant_compare_at_price}}</span>
              <span class="sca-special-price">{{variant_price}}</span>
            </div>
            <div id="stay-content-sca-freegift-{{productID}}" class="sca-fg-cart-item">
              <a class="close_box" style="display: none;position: absolute;top:5px;right: 10px;font-size: 22px;font-weight: bold;cursor: pointer;text-decoration:none;color: #aaa;">×</a>
              <select id="product-select-{{productID}}" name="id" style="display: none">
                {{optionVariantData}}
              </select>
            </div>
          </div>
          <button type='button' id="sca-btn-select-{{productID}}" class="sca-button" onclick="onclickSelect_{{productID}}();"><span>{{SelectButton}}</span></button>
          <button type='button' id="sca-btn-{{productID}}" class="sca-button" style="display: none"><span>{{AddToCartButton}}</span></button>
      </div>
    </div>
  </div>
  
