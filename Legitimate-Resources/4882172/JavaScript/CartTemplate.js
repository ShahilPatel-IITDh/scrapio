
  
    <form action="/cart" method="post" novalidate class="cart ajaxcart">
      <div class="ajaxcart__inner ajaxcart__inner--has-fixed-footer">
        {{#items}}
        <div class="ajaxcart__product">
          <div class="ajaxcart__row" data-line="{{line}}">
            <div class="grid">
              <div class="grid__item one-quarter">
                <a href="{{url}}" class="ajaxcart__product-image"><img src="{{img}}" alt="{{name}}"></a>
              </div>
              <div class="grid__item three-quarters">
                <div class="ajaxcart__product-name--wrapper">
                  <a href="{{url}}" class="ajaxcart__product-name">{{{name}}}</a>
                  {{#if variation}}
                    <span class="ajaxcart__product-meta">{{variation}}</span>
                  {{/if}}
                  {{#properties}}
                    {{#each this}}
                      {{#if this}}
                        <span class="ajaxcart__product-meta">{{@key}}: {{this}}</span>
                      {{/if}}
                    {{/each}}
                  {{/properties}}
                </div>

                <div class="grid--full display-table">
                  <div class="grid__item display-table-cell one-half">
                    <div class="ajaxcart__qty">
                      <button type="button" class="ajaxcart__qty-adjust ajaxcart__qty--minus icon-fallback-text" data-id="{{key}}" data-qty="{{itemMinus}}" data-line="{{line}}" aria-label="Reduce item quantity by one">
                        <span class="icon icon-minus" aria-hidden="true"></span>
                        <span class="fallback-text" aria-hidden="true">&minus;</span>
                      </button>
                      <input type="text" name="updates[]" class="ajaxcart__qty-num" value="{{itemQty}}" min="0" data-id="{{key}}" data-line="{{line}}" aria-label="quantity" pattern="[0-9]*">
                      <button type="button" class="ajaxcart__qty-adjust ajaxcart__qty--plus icon-fallback-text" data-id="{{key}}" data-line="{{line}}" data-qty="{{itemAdd}}" aria-label="Increase item quantity by one">
                        <span class="icon icon-plus" aria-hidden="true"></span>
                        <span class="fallback-text" aria-hidden="true">+</span>
                      </button>
                    </div>
                  </div>
                  <div class="grid__item display-table-cell one-half text-right">
                    {{#if discountsApplied}}
                      <small class="ajaxcart__price--strikethrough">{{{price}}}</small>
                      <span class="ajaxcart__price">
                        {{{discountedPrice}}}
                      </span>
                    {{else}}
                      <span class="ajaxcart__price">
                        {{{price}}}
                      </span>
                    {{/if}}
                  </div>
                </div>
                {{#if discountsApplied}}
                  <div class="grid--full display-table">
                    <div class="grid__item text-right">
                      {{#each discounts}}
                        <small class="ajaxcart__discount">{{this.title}}</small>
                      {{/each}}
                    </div>
                  </div>
                {{/if}}
              </div>
            </div>
          </div>
        </div>
        {{/items}}

        
      </div>
      <div class="ajaxcart__footer ajaxcart__footer--fixed">
        <div class="grid--full">
          <div class="grid__item two-thirds">
            <p class="ajaxcart__subtotal">Subtotal</p>
          </div>
          <div class="grid__item one-third text-right">
            <p class="ajaxcart__subtotal">{{{totalPrice}}}</p>
          </div>
        </div>
        {{#if totalCartDiscount}}
          <p class="ajaxcart__savings text-center">{{{totalCartDiscount}}}</p>
        {{/if}}
        <p class="ajaxcart__note text-center">Shipping, taxes, and discounts calculated at checkout.</p>
        <button type="submit" class="btn--secondary btn--full cart__checkout" name="checkout">
          Check Out <span class="icon icon-arrow-right" aria-hidden="true"></span>
        </button>
      </div>
    </form>
  
  