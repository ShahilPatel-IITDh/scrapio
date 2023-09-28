
  
    <div class="js-qty">
      <button type="button" class="js-qty__adjust js-qty__adjust--minus icon-fallback-text" data-id="{{key}}" data-qty="{{itemMinus}}" aria-label="Reduce item quantity by one">
        <span class="icon icon-minus" aria-hidden="true"></span>
        <span class="fallback-text" aria-hidden="true">&minus;</span>
      </button>
      <input type="text" class="js-qty__num" value="{{itemQty}}" min="1" data-id="{{key}}" aria-label="quantity" pattern="[0-9]*" name="{{inputName}}" id="{{inputId}}">
      <button type="button" class="js-qty__adjust js-qty__adjust--plus icon-fallback-text" data-id="{{key}}" data-qty="{{itemAdd}}" aria-label="Increase item quantity by one">
        <span class="icon icon-plus" aria-hidden="true"></span>
        <span class="fallback-text" aria-hidden="true">+</span>
      </button>
    </div>
  
  