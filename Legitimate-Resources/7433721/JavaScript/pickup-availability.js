/** Shopify CDN: Minification failed

Line 17:47 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 18:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 28:21 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 29:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 34:10 Transforming const to the configured target environment ("es5") is not supported yet
Line 40:10 Transforming const to the configured target environment ("es5") is not supported yet
Line 46:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 50:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 57:17 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 58:6 Transforming const to the configured target environment ("es5") is not supported yet
... and 6 more hidden warnings

**/
if (!customElements.get('pickup-availability')) {
  customElements.define('pickup-availability', class PickupAvailability extends HTMLElement {
    constructor() {
      super();

      if(!this.hasAttribute('available')) return;

      this.errorHtml = this.querySelector('template').content.firstElementChild.cloneNode(true);
      this.onClickRefreshList = this.onClickRefreshList.bind(this);
      this.fetchAvailability(this.dataset.variantId);
    }

    fetchAvailability(variantId) {
      const variantSectionUrl = `${this.dataset.baseUrl}variants/${variantId}/?section_id=pickup-availability`;

      fetch(variantSectionUrl)
        .then(response => response.text())
        .then(text => {
          const sectionInnerHTML = new DOMParser()
            .parseFromString(text, 'text/html')
            .querySelector('.shopify-section');
          this.renderPreview(sectionInnerHTML);
        })
        .catch(e => {
          const button = this.querySelector('button');
          if (button) button.removeEventListener('click', this.onClickRefreshList);
          this.renderError();
        });
    }

    onClickRefreshList(evt) {
      this.fetchAvailability(this.dataset.variantId);
    }

    renderError() {
      this.innerHTML = '';
      this.appendChild(this.errorHtml);

      this.querySelector('button').addEventListener('click', this.onClickRefreshList);
    }

    renderPreview(sectionInnerHTML) {
      const drawer = document.querySelector('pickup-availability-drawer');
      if (drawer) drawer.remove();
      if (!sectionInnerHTML.querySelector('pickup-availability-preview')) {
        this.innerHTML = "";
        this.removeAttribute('available');
        return;
      }

      this.innerHTML = sectionInnerHTML.querySelector('pickup-availability-preview').outerHTML;
      this.setAttribute('available', '');

      document.body.appendChild(sectionInnerHTML.querySelector('pickup-availability-drawer'));

      this.querySelector('button').addEventListener('click', (evt) => {
        document.querySelector('pickup-availability-drawer').show(evt.target);
      });
    }
  });
}

if (!customElements.get('pickup-availability-drawer')) {
  customElements.define('pickup-availability-drawer', class PickupAvailabilityDrawer extends HTMLElement {
    constructor() {
      super();

      this.onBodyClick = this.handleBodyClick.bind(this);

      this.querySelector('button').addEventListener('click', () => {
        this.hide();
      });

      this.addEventListener('keyup', () => {
        if(event.code.toUpperCase() === 'ESCAPE') this.hide();
      });
    }

    handleBodyClick(evt) {
      const target = evt.target;
      if (target != this && !target.closest('pickup-availability-drawer') && target.id != 'ShowPickupAvailabilityDrawer') {
        this.hide();
      }
    }

    hide() {
      this.removeAttribute('open');
      document.body.removeEventListener('click', this.onBodyClick);
      document.body.classList.remove('overflow-hidden');
      removeTrapFocus(this.focusElement);
    }

    show(focusElement) {
      this.focusElement = focusElement;
      this.setAttribute('open', '');
      document.body.addEventListener('click', this.onBodyClick);
      document.body.classList.add('overflow-hidden');
      trapFocus(this);
    }
  });
}
