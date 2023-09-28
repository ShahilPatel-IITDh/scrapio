/** Shopify CDN: Minification failed

Line 17:37 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 18:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 29:4 Transforming async functions to the configured target environment ("es5") is not supported yet
Line 35:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 37:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 51:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 52:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 53:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 54:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 55:6 Transforming const to the configured target environment ("es5") is not supported yet
... and 28 more hidden warnings

**/
if (customElements.get('quick-buy') === undefined) {
  customElements.define('quick-buy', class QuickBuy extends HTMLElement {
    constructor() {
      'use strict';
      super();

      this.processingModal = false;
      this.eventsHooked = false;

      this.button = this.querySelector('a[href*="modal"]');
      this.button.addEventListener('click', this.onModalRequestOpen.bind(this))
    }

    async onModalRequestOpen(event) {
      if (this.processingModal === true) {
        event.preventDefault();
        return;
      }

      const target = event.target || event.currentTarget;
      this.targetId = target.getAttribute('href').substring(1);
      const modal = document.getElementById(this.targetId);
      
      if (modal) {
        this.modal = modal
        this.hookEvents()
        return;
      };

      this.processingModal = true;
      
      document.querySelectorAll('[data-quick-buy-modal]').forEach((modal) => {
        modal.remove();
      })

      const productHandle = target.getAttribute('data-product-handle');
      const rootUrl = window.routes.root == '/' ? '/' : window.routes.root + '/'; // if user has selected locale convert root url from /en-gb to /en-gb/
      const res = await fetch(`${rootUrl}products/${productHandle}?view=ajax-modal`)
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const modalElement = doc.body.firstChild;
      document.body.appendChild(modalElement);
      Woolman.ModalsAndDrawers.showModalOrDrawer(this.targetId);

      this.modal = modalElement;
      this.hookEvents();
    }

    hookEvents() {
      this.updateOptions()
      this.updateMasterId()

      this.button.removeEventListener('click', this.onModalRequestOpen.bind(this))

      this.modal.querySelector('.product-modal__radios').removeEventListener('change', this.onVariantChange.bind(this))
      this.modal.querySelector('.product-modal__radios').addEventListener('change', this.onVariantChange.bind(this))

      const productForm = document.getElementById(`product-form-${this.dataset.product}`);
      productForm.removeEventListener('submit', this.handleSubmit.bind(this))
      productForm.addEventListener('submit', this.handleSubmit.bind(this));

      this.eventsHooked = true;
      this.processingModal = false;
    }
  
    onVariantChange() {
      this.updateOptions();
      this.updateMasterId();
      this.toggleAddButton(true, '', false);

  
      if (!this.currentVariant) {
        this.toggleAddButton(true, '', true);
        this.setUnavailable();
      } else {
        this.updateVariantInput();
        this.renderProductInfo();
      }
    }
  
    updateOptions() {
      const fieldsets = Array.from(this.modal.querySelectorAll('fieldset'));
      this.options = fieldsets.map((fieldset) => {
        return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
      });
    }
  
    toggleAddButton(disable = true, text, modifyClass = true) {
      const productForm = document.getElementById(`product-form-${this.dataset.product}`);
      if (!productForm) return;
      const addButton = productForm.querySelector('[name="add"]');
      const addButtonText = productForm.querySelector('[name="add"] > span');
      if (!addButton) return;
  
      if (disable) {
        addButton.setAttribute('disabled', 'disabled');
        if (text) addButtonText.textContent = text;
      } else {
        addButton.removeAttribute('disabled');
        if (this.modal.dataset.isPreorder == 'true') {
          addButtonText.textContent = window.variantStrings.preOrder;
        } else {
          addButtonText.textContent = window.variantStrings.addToCart;
        }
      }
  
      if (!modifyClass) return;
    }
  
    renderProductInfo() {
      fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&view=ajax-modal`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html')
          const destination = document.getElementById(`price-${this.dataset.product}`);
          const source = html.getElementById(`price-${this.dataset.product}`);

          if (source && destination) destination.innerHTML = source.innerHTML;
  
          const price = document.getElementById(`price-${this.dataset.product}`);
  
          if (price) price.classList.remove('hidden');
          this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
        });
    }

    updateMasterId() {
      this.currentVariant = this.getVariantData().find((variant) => {
        return !variant.options.map((option, index) => {
          return this.options[index] === option;
        }).includes(false);
      });
    }
  
    updateVariantInput() {
      const productForms = document.querySelectorAll(`#product-form-${this.dataset.product}, #product-form-installment-${this.dataset.product}`);
      productForms.forEach((productForm) => {
        const input = productForm.querySelector('input[name="id"]');
        input.value = this.currentVariant.id;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  
    setUnavailable() {
      const button = document.getElementById(`product-form-${this.dataset.product}`);
      const addButton = button.querySelector('[name="add"]');
      const addButtonText = button.querySelector('[name="add"] > span');
      const price = document.getElementById(`price-${this.dataset.product}`);
      if (!addButton) return;
      addButtonText.textContent = window.variantStrings.unavailable;
      if (price) price.classList.add('hidden');
    }
  
    getVariantData() {
      this.variantData = this.variantData || JSON.parse(this.modal.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }

    async handleSubmit() {
      Woolman.ModalsAndDrawers.closeModalOrDrawer(this.targetId)
    }
  })
}