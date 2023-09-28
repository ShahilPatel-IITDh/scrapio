
  {% if box.template.id == 1 or box.template.id == '1' %}
  <div id="{{box.id}}" data-title="{{box.title.text | escape}}" class="ga ga-template_1 ga-products-box ga-template_themeid_782">
    {% if box.title and box.title.text and box.title.text != '' %}<h2 class="ga-title section-title "><span>{{box.title.text}}</span></h2>{% endif %}
    {% if box.subtitle and box.subtitle.text and box.subtitle.text != '' %}<div class="ga-subtitle">{{box.subtitle.text}}</div>{% endif %}
    <div class="ga-products">
      <div class="ga-carousel_wrapper">
        <ul class="ga-carousel gowl-carousel" data-products-count="{{products.size}}">
          {% for product in products %}
          {% assign first_available_variant = false %}
          {% for variant in product.variants %}
            {% if first_available_variant == false and variant.available %}{% assign first_available_variant = variant %}{% endif %}
          {% endfor %}
          {% if first_available_variant == false %}{% assign first_available_variant = product.variants[0] %}{% endif %}
          {% if product.images[0] %}
            {% assign featured_image = product.images[0] | img_url: '350x' %}
          {% else %}
            {% assign featured_image = no_image_url | img_url: '350x' %}
          {% endif %}
          <li class="ga-product" data-product-id="{{product.id}}">
            <a{% if settings.new_tab %} target="_blank"{% endif %} href="/products/{{product.handle}}">
              {% if box.template.elements contains 'saleLabel' and first_available_variant.compare_at_price > first_available_variant.price %}
              <span class="ga-label ga-label_sale">{{translation.sale}}</span>
              {% endif %}
              {% unless product.available %}
              <span class="ga-label ga-label_sold">{{translation.sold_out}}</span>
              {% endunless %}
              <div class="ga-product_image ga-product_image_{{product.id}}" id="ga-product_image_{{product.id}}" style="background-image: url('{{featured_image}}')"><span></span></div>
            </a>
                        <a class="ga-product_title  "{% if settings.new_tab %} target="_blank"{% endif %} href="/products/{{product.handle}}">{{product.title}}</a>
            {% assign variants_size = product.variants | size %}
            <div class="ga-product_variants-container{% unless box.template.elements contains 'variantSelector' %} ga-hide{% endunless %}">
              <select class="ga-product_variant_select {% if variants_size == 1 %}ga-hide{% endif %}">
                {% for variant in product.variants %}
                  <option{% if first_available_variant.id == variant.id %} selected{% endif %}{% unless variant.available %} disabled{% endunless %} data-image="{% if variant.featured_image %}{{variant.featured_image.src | img_url: '350x'}}{% else %}{{featured_image}}{% endif %}" data-available="{{variant.available}}" data-compare_at_price="{{variant.compare_at_price}}" data-price="{{variant.price}}" value="{{variant.id}}">{{variant.title}}{% unless variant.available %} - {{translation.sold_out}}{% endunless %}</option>
                {% endfor %}
              </select>
            </div>
            {% if box.template.elements contains 'price' %}
            <span class="ga-product_price-container">
              <span class="ga-product_price money">{{first_available_variant.price | money}}</span>
              {% if first_available_variant.compare_at_price > first_available_variant.price %}
              <s class="ga-product_oldprice money">{{first_available_variant.compare_at_price | money}}</s>
              {% endif %}
            </span>
            {% endif %}
            {% if box.template.elements contains 'addToCartBtn' %}
            <button class="ga-product_addtocart" type="button" data-add="{{translation.add_to_cart}}" data-added="{{translation.added_to_cart}}">{{translation.add_to_cart}}</button>
            {% endif %}
                      </li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </div>
  {% elsif box.template.id == 2 or box.template.id == '2' %}
  <div id="{{box.id}}" data-title="{{box.title.text | escape}}" class="ga ga-template_2 ga-products-box  ga-template_themeid_782">
    {% if box.title and box.title.text and box.title.text != '' %}<h2 class="ga-title section-title "><span>{{box.title.text}}</span></h2>{% endif %}
    {% if box.subtitle and box.subtitle.text and box.subtitle.text != '' %}<div class="ga-subtitle">{{box.subtitle.text}}</div>{% endif %}
    {% assign total_price = 0 %}
    <div class="ga-products">
      <div class="ga-products_image">
        {% for product in products %}
        {% assign first_available_variant = false %}
        {% for variant in product.variants %}
          {% if first_available_variant == false and variant.available %}{% assign first_available_variant = variant %}{% endif %}
        {% endfor %}
        {% if first_available_variant == false %}{% assign first_available_variant = product.variants[0] %}{% endif %}
        {% if first_available_variant.available and box.template.selected %}
        {% assign total_price = total_price | plus: first_available_variant.price %}
        {% endif %}
        {% if product.images[0] %}
          {% assign featured_image = product.images[0] | img_url: '350x' %}
        {% else %}
          {% assign featured_image = no_image_url | img_url: '350x' %}
        {% endif %}
        <div id="ga-product_{{product.id}}" class="ga-product {% if forloop.last %}last{% endif %}">

          <a{% if settings.new_tab %} target="_blank"{% endif %} href="/products/{{product.handle}}">
            {% unless product.available %}
            <span class="ga-label ga-label_sold">{{translation.sold_out}}</span>
            {% endunless %}
            <img class="ga-product_image_{{product.id}}" id="ga-product_image_{{product.id}}" src="{{featured_image}}" alt="{{product.title}}"/>
          </a>
        </div>
        {% endfor %}
        <div class="ga-product-form {% unless total_price > 0 %}ga-hide{% endunless %}">
          {% if box.template.elements contains 'price' %}
          <div>{{translation.total_price}} <span class="ga-product_price ga-product_totalprice money">{{total_price | money}}</span></div>
          {% endif %}
          {% if box.template.elements contains 'addToCartBtn' %}
          <button class="ga-addalltocart" type="button" data-add="{{translation.add_selected_to_cart}}" data-added="{{translation.added_selected_to_cart}}">{{translation.add_selected_to_cart}}</button>
          {% endif %}
        </div>
      </div>
    </div>
    <ul class="ga-products-input">
      {% for product in products %}
      {% assign first_available_variant = false %}
      {% for variant in product.variants %}
        {% if first_available_variant == false and variant.available %}{% assign first_available_variant = variant %}{% endif %}
      {% endfor %}
      {% if first_available_variant == false %}{% assign first_available_variant = product.variants[0] %}{% endif %}
      {% if product.images[0] %}
        {% assign featured_image = product.images[0] | img_url: '350x' %}
      {% else %}
        {% assign featured_image = no_image_url | img_url: '350x' %}
      {% endif %}
      <li class="ga-product{% unless box.template.selected %} ga-deactive{% endunless %}" data-product-id="{{product.id}}">
        <input {% unless product.available %}disabled{% endunless %} class="selectedItem"{% if box.template.selected and product.available == true %} checked{% endif %} type="checkbox" value="{{product.id}}"/>
        <a class="ga-product_title"{% if settings.new_tab %} target="_blank"{% endif %} href="/products/{{product.handle}}">{% if product.id == cur_product_id %}<strong>{{translation.this_item}} </strong>{% endif %}{{product.title}}{% unless product.available %} - {{translation.sold_out}}{% endunless %}</a>
        {% assign variants_size = product.variants | size %}
        <div class="ga-product_variants-container{% unless box.template.elements contains 'variantSelector' %} ga-hide{% endunless %}">
          <select {% unless product.available %}disabled{% endunless %} class="ga-product_variant_select {% if variants_size == 1 %}ga-hide{% endif %}">
            {% for variant in product.variants %}
              <option{% if first_available_variant.id == variant.id %} selected{% endif %}{% unless variant.available %} disabled{% endunless %} data-image="{% if variant.featured_image %}{{variant.featured_image.src | img_url: '100x'}}{% else %}{{featured_image}}{% endif %}" data-available="{{variant.available}}" data-compare_at_price="{{variant.compare_at_price}}" data-price="{{variant.price}}" value="{{variant.id}}">{{variant.title}}{% unless variant.available %} - {{translation.sold_out}}{% endunless %}</option>
            {% endfor %}
          </select>
        </div>
        {% if box.template.elements contains 'price' %}
        <span class="ga-product_price-container">
          <span class="ga-product_price money">{{first_available_variant.price | money}}</span>
          {% if first_available_variant.compare_at_price > first_available_variant.price %}
          <s class="ga-product_oldprice money">{{first_available_variant.compare_at_price | money}}</s>
          {% endif %}
        </span>
        {% endif %}
      </li>
      {% endfor %}
    </ul>
  </div>
  {% elsif box.template.id == 3 or box.template.id == '3' %}
  <div id="{{box.id}}" data-title="{{box.title.text | escape}}" class="ga ga-template_3 ga-products-box  ga-template_themeid_782">
    {% if box.title and box.title.text and box.title.text != '' %}<h2 class="ga-title section-title "><span>{{box.title.text}}</span></h2>{% endif %}
    {% if box.subtitle and box.subtitle.text and box.subtitle.text != '' %}<div class="ga-subtitle">{{box.subtitle.text}}</div>{% endif %}
    {% assign total_price = 0 %}
    <div class="ga-products">
      <ul class="ga-products-table">
        {% for product in products %}
        {% assign first_available_variant = false %}
        {% for variant in product.variants %}
          {% if first_available_variant == false and variant.available %}{% assign first_available_variant = variant %}{% endif %}
        {% endfor %}
        {% if first_available_variant == false %}{% assign first_available_variant = product.variants[0] %}{% endif %}
        {% if first_available_variant.available and box.template.selected %}
        {% assign total_price = total_price | plus: first_available_variant.price %}
        {% endif %}
        {% if product.images[0] %}
          {% assign featured_image = product.images[0] | img_url: '100x' %}
        {% else %}
          {% assign featured_image = no_image_url | img_url: '100x' %}
        {% endif %}
        <li class="ga-product{% unless box.template.selected %} ga-deactive{% endunless %}" data-product-id="{{product.id}}">
          <div class="product_main">
            <input {% unless product.available %}disabled{% endunless %} class="selectedItem"{% if box.template.selected and product.available == true %} checked{% endif %} type="checkbox" value=""/>
            <a{% if settings.new_tab %} target="_blank"{% endif %} href="/products/{{product.handle}}" class="ga-products_image">
              {% unless product.available %}
              <span class="ga-label ga-label_sold">{{translation.sold_out}}</span>
              {% endunless %}
              <span>
                <img class="ga-product_image_{{product.id}}" id="ga-product_image_{{product.id}}" src="{{featured_image}}" alt="{{product.title}}"/>
              </span>
            </a>
            <div>
              <a class="ga-product_title"{% if settings.new_tab %} target="_blank"{% endif %} href="/products/{{product.handle}}">{% if product.id == cur_product_id %}<strong>{{translation.this_item}} </strong>{% endif %}{{product.title}}{% unless product.available %} - {{translation.sold_out}}{% endunless %}</a>
            </div>
          </div>
          {% assign variants_size = product.variants | size %}
          <div class="ga-product_variants-container{% unless box.template.elements contains 'variantSelector' %} ga-hide{% endunless %}">
            <select {% unless product.available %}disabled{% endunless %} class="ga-product_variant_select {% if variants_size == 1 %}ga-hide{% endif %}">
              {% for variant in product.variants %}
                <option{% if first_available_variant.id == variant.id %} selected{% endif %}{% unless variant.available %} disabled{% endunless %} data-image="{% if variant.featured_image %}{{variant.featured_image.src | img_url: '100x'}}{% else %}{{featured_image}}{% endif %}" data-available="{{variant.available}}" data-compare_at_price="{{variant.compare_at_price}}" data-price="{{variant.price}}" value="{{variant.id}}">{{variant.title}}{% unless variant.available %} - {{translation.sold_out}}{% endunless %}</option>
              {% endfor %}
            </select>
          </div>
          {% if box.template.elements contains 'price' %}
          <span class="ga-product_price-container">
            <span class="ga-product_price money">{{first_available_variant.price | money}}</span>
            {% if first_available_variant.compare_at_price > first_available_variant.price %}
            <s class="ga-product_oldprice money">{{first_available_variant.compare_at_price | money}}</s>
            {% endif %}
          </span>
          {% endif %}
        </li>
        {% endfor %}
      </ul>
      <div class="ga-product-form{% unless box.template.selected or total_price > 0 %} ga-hide{% endunless %}">
        {% if box.template.elements contains 'price' %}
        <div>{{translation.total_price}} <span class="ga-product_price ga-product_totalprice money">{{total_price | money}}</span></div>
        {% endif %}
        {% if box.template.elements contains 'addToCartBtn' %}
        <button class="ga-addalltocart" type="button" data-add="{{translation.add_selected_to_cart}}" data-added="{{translation.added_selected_to_cart}}">{{translation.add_selected_to_cart}}</button>
        {% endif %}
      </div>
    </div>
  </div>
  {% endif %}
