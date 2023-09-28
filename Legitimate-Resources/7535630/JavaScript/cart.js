/** Shopify CDN: Minification failed

Line 16:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 17:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 27:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 28:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 36:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 38:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 46:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 47:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 64:10 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 69:21 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
... and 34 more hidden warnings

**/
class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      this.closest('cart-items').updateQuantity(this.dataset.index, 0);
    });
  }
}
customElements.define('cart-remove-button', CartRemoveButton);

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true });

    this.querySelectorAll('button').forEach((button) => button.addEventListener('click', this.onButtonClick.bind(this)));
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}
customElements.define('quantity-input', QuantityInput);

class CartItems extends HTMLElement {
  constructor() {
    super();

    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status');
    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]')).reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));

    document.addEventListener('ajaxProduct:added', () => {
      this.renderAndShowItems()
    })
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
  }

  // Shopify limit: only 5 sections can be rendered (https://shopify.dev/api/ajax/reference/cart#bundled-section-rendering)
  getSectionsToRender() {
    return [
      {
        id: document.querySelector('.main-cart').dataset.id,
        selector: '#cart-items',
      },
      {
        id: document.querySelector('.main-cart').dataset.id,
        selector: '#cart-shipping-notification'
      },
      {
        id: document.querySelector('.main-cart').dataset.id,
        selector: '#cart-footer'
      },
      {
        id: document.querySelector('.main-cart').dataset.id,
        selector: '#cart-additionals'
      }
    ];
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  async renderAndShowItems() {
    try {
      const sections = this.getSectionsToRender().map((section) => section.id).join(',')
      const res = await fetch(`?sections=${sections}`)

      const json = await res.json();
      if (json.errors) {
        throw json.errors;
      }

      this.getSectionsToRender().forEach((section) => {
        const sectionId = `shopify-section-${section.id}`;
        const elementToReplace = document.getElementById(sectionId).querySelector(section.selector) || document.getElementById(section.id);
        if (!elementToReplace) return;
      
        elementToReplace.innerHTML = this.getSectionInnerHTML(json[section.id], section.selector);
      });

      const parentDrawer = this.closest('[data-drawer]');
      if (!parentDrawer) return;
      Woolman.ModalsAndDrawers.showModalOrDrawer(parentDrawer.getAttribute('id'))
    } catch(errors) {
      console.error(errors)
    }
  }

  async updateQuantity(line, quantity, name) {
    this.enableLoading(line);
    try {
      const res = await fetch(`${routes.cart_change_url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: `application/json`,
        },
        body: JSON.stringify({
          line: line,
          quantity: quantity,
          sections: this.getSectionsToRender().map((section) => section.id),
          sections_url: window.location.pathname,
        }),
      });
      const json = await res.json();
      if (json.errors) {
        throw json.errors;
      }

      this.getSectionsToRender().forEach((section) => {
        const sectionId = `shopify-section-${section.id}`;
        const elementToReplace = document.getElementById(sectionId).querySelector(section.selector) || document.getElementById(section.id);
        if (!elementToReplace) return;
        
        elementToReplace.innerHTML = this.getSectionInnerHTML(json.sections[section.id], section.selector);
      });

      const event = new CustomEvent('cart:update', {
        detail: json,
      });
      document.dispatchEvent(event);

      this.updateLiveRegions(line, json.item_count);

      const lineItem = document.getElementById(`CartItem-${line}`);
      if (lineItem && lineItem.querySelector(`[name="${name}"]`)) lineItem.querySelector(`[name="${name}"]`).focus();

      this.disableLoading();
    } catch (errors) {
      console.error(errors);
      this.disableLoading();
    }
  }

  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      document.getElementById(`Line-item-error-${line}`).querySelector('.cart-item__error-text').innerHTML = window.cartStrings.quantityError.replace('[quantity]', document.getElementById(`Quantity-${line}`).value);
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  enableLoading(line) {
    this.classList.add('is-processing');
    this.querySelectorAll(`#CartItem-${line} .loading-overlay`).forEach((overlay) => overlay.classList.remove('hidden'));
    document.activeElement.blur();
  }

  disableLoading() {
    this.classList.remove('is-processing');
    this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
  }
}
customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define('cart-note', class CartNote extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('keyup', debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${routes.cart_update_url}`, {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
            Accept: `application/json`,
          },
          ...{ body }
        });
      }, 300))
    }
  });
};

if (!customElements.get('cart-recommendations')) {
  customElements.define('cart-recommendations', class CartRecommendations extends HTMLElement {
    constructor() {
      super();
      this.loadRecommendations();
      document.addEventListener('ajaxProduct:added', this.loadRecommendations.bind(this))
    }

    async loadRecommendations() {
      if (!this.dataset.productId || this.dataset.productId === '') return;

      try {
        const url = new URL(location.origin + routes.product_recommendations_url + '.json')
        url.searchParams.set('product_id', this.dataset.productId)
        url.searchParams.set('limit', this.dataset.limit || 10)
  
        const res = await fetch(url)
        const { products } = await res.json();

        if (!products || products.length == 0) {
          throw 'No product recommendations found for products in the cart'
        }

        this.productsContainer = this.querySelector('[data-products-ajax]')
        this.productsContainer.innerHTML = '';

        products.forEach((product) => {

          const template = this.querySelector('template').content.firstElementChild.cloneNode(true);
          const filename = product.featured_image.split('/').pop();
          const filedata = filename.split('.')
          const new_filename = `${filedata[0]}_150x150.${filedata[1]}`
          const url = product.featured_image.replace(filename, new_filename)

          template.querySelector('img').setAttribute('src', url)
          template.setAttribute('href', location.origin + product.url)
          template.setAttribute('title', product.title)

          this.productsContainer.appendChild(template)
        })
      } catch(error) {
        this.setAttribute('hidden', true)
        console.warn(error)
      }
    }
  })
}