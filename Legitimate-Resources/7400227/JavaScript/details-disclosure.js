/** Shopify CDN: Minification failed

Line 13:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 14:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 23:12 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 29:10 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 39:7 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 47:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 48:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 53:10 Transforming object literal extensions to the configured target environment ("es5") is not supported yet

**/
class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach(animation => animation.play());
    } else {
      this.animations.forEach(animation => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty('--header-bottom-position-desktop', `${Math.floor(this.header.getBoundingClientRect().bottom)}px`);
  }
}

customElements.define('header-menu', HeaderMenu);
