
  
    <form action="{{ routes.cart_url }}" method="post" class="cart-form" novalidate>
      <div class="ajaxifyCart--products">
        {{#items}}
        <div class="ajaxifyCart--product" data-title="{{name}}">
          <div class="ajaxifyCart--row" data-line="{{line}}">
            <div class="grid">
              <div class="grid-item large--two-thirds">
                <div class="grid">
                  <div class="grid-item one-quarter">
                    <a href="{{url}}" class="ajaxCart--product-image"><img src="{{img}}" alt=""></a>
                  </div>
                  <div class="grid-item three-quarters">
                    <a href="{{url}}" class="h4">{{name}}</a>
                    <p>{{variation}}</p>
                  </div>
                </div>
              </div>
              <div class="grid-item large--one-third">
                <div class="grid">
                  <div class="grid-item one-third">
                    <div class="ajaxifyCart--qty">
                      <input type="text" name="updates[]" class="ajaxifyCart--num" value="{{itemQty}}" min="0" data-line="{{line}}" aria-label="quantity" pattern="[0-9]*">
                      <span class="ajaxifyCart--qty-adjuster ajaxifyCart--add" data-line="{{line}}" data-qty="{{itemAdd}}">+</span>
                      <span class="ajaxifyCart--qty-adjuster ajaxifyCart--minus" data-line="{{line}}" data-qty="{{itemMinus}}">-</span>
                    </div>
                  </div>
                  <div class="grid-item one-third text-center">
                    <p>{{price}}</p>
                  </div>
                  <div class="grid-item one-third text-right">
                    <p>
                      <small><a href="{{ routes.cart_change_url }}?line={{line}}&amp;quantity=0" class="ajaxifyCart--remove" data-line="{{line}}">Remove</a></small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {{/items}}
      </div>
      <div class="ajaxifyCart--row text-right medium-down--text-center">
        <span class="h3">Subtotal {{totalPrice}}</span>
              {% if template.name != 'cart' %}
               <div class='shiptection-widget'></div>
             {% endif %}
        <input type="submit" class="{{btnClass}}" name="checkout" value="Checkout">
      </div>
    </form>
  
  