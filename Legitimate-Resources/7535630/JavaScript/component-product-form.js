/** Shopify CDN: Minification failed

Line 16:40 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 17:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 26:4 Transforming async functions to the configured target environment ("es5") is not supported yet
Line 37:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 47:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 51:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 52:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 59:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 72:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 72:36 Transforming default arguments to the configured target environment ("es5") is not supported yet

**/
if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.submitButton = this.querySelector('[type="submit"]');
    }

    async onSubmitHandler(evt) {
      evt.preventDefault();
      if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

      this.handleErrorMessage();

      this.submitButton.setAttribute('aria-disabled', true);
      this.submitButton.classList.add('loading');
      this.submitButton.querySelector('span').setAttribute('hidden', true);
      this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

      const config = { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: `application/json`,
        }
      }
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      config.body = formData;

      try {
        const res = await fetch(routes.cart_add_url + '.js', config)
        const json = await res.json();

        /* console.log('res =>', res)
        console.log('json =>', json) */

        if (res.status !== 200) throw new Error(json.description);

        const event = new CustomEvent('ajaxProduct:added')
        document.dispatchEvent(event)
      } catch(error) {
        this.handleErrorMessage(error);
        console.error(error);
      }

      this.submitButton.classList.remove('loading');
      this.submitButton.removeAttribute('aria-disabled');
      this.submitButton.querySelector('span').removeAttribute('hidden');
      this.querySelector('.loading-overlay__spinner').classList.add('hidden');
    }

    handleErrorMessage(errorMessage = false) {
      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
      if (!this.errorMessageWrapper) return;
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {

        this.errorMessage.textContent = errorMessage;
      }
    }
  });
}