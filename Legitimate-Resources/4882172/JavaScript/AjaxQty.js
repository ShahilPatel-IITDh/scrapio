
  
    <div class="ajaxcart__qty">
      <button type="button" class="ajaxcart__qty-adjust ajaxcart__qty--minus icon-fallback-text" data-id="{{key}}" data-qty="{{itemMinus}}" aria-label="Reduce item quantity by one">
        <span class="icon icon-minus" aria-hidden="true"></span>
        <span class="fallback-text" aria-hidden="true">&minus;</span>
      </button>
      <input type="text" class="ajaxcart__qty-num" value="{{itemQty}}" min="0" data-id="{{key}}" aria-label="quantity" pattern="[0-9]*">
      <button type="button" class="ajaxcart__qty-adjust ajaxcart__qty--plus icon-fallback-text" data-id="{{key}}" data-qty="{{itemAdd}}" aria-label="Increase item quantity by one">
        <span class="icon icon-plus" aria-hidden="true"></span>
        <span class="fallback-text" aria-hidden="true">+</span>
      </button>
    </div>
  
  