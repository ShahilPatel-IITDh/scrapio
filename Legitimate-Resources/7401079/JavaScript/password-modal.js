/** Shopify CDN: Minification failed

Line 7:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 8:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet

**/
class PasswordModal extends DetailsModal {
  constructor() {
    super();

    if (this.querySelector('input[aria-invalid="true"]')) this.open({ target: this.querySelector('details') });
  }
}

customElements.define('password-modal', PasswordModal);
