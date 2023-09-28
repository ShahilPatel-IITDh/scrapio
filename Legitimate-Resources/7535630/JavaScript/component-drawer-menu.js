/** Shopify CDN: Minification failed

Line 16:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 17:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 26:6 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 55:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 56:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 62:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 66:10 Transforming const to the configured target environment ("es5") is not supported yet
Line 77:16 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 78:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 83:4 Transforming const to the configured target environment ("es5") is not supported yet
... and 13 more hidden warnings

**/
class DrawerMenu extends HTMLElement {
  constructor() {
    'use strict';
    super();

    this.el = this;
    this.mainLevel = this.el.querySelector('.drawer-menu__contents');
    this.init();
  }

  init() {
    // These toggle submenu panel
    this.firstLevelItemsWithChildren = this.el.querySelectorAll('.drawer-menu__item__input');
    this.firstLevelItemsWithChildren.forEach((input) => {
      input.addEventListener('change', this.toggleMenuItem.bind(this));
    });

    // These handle closing of navigation
    this.closeButtons = this.el.querySelectorAll('[data-close]');
    this.closeButtons.forEach((btn) => {
      btn.addEventListener('click', this.closeAllItems.bind(this));
    });

    this.overlay = this.el.querySelector('[data-drawer-overlay]');
    this.overlay.addEventListener('click', this.closeAllItems.bind(this));

    // These handle going back to previous panel
    this.secondLevelBackButtons = this.el.querySelectorAll('[data-drawer-submenu-close]');
    this.secondLevelBackButtons.forEach((button) => {
      button.addEventListener('click', this.toggleSubPanel.bind(this));
    });

    // Handle opening of specific subitem from anywhere in the theme
    this.subitemOpeners = document.querySelectorAll('[data-drawer-submenu-open]');
    this.subitemOpeners.forEach((button) => {
      button.addEventListener('click', this.toggleMenuItemFromTheme.bind(this));
    });
  }

  closeAllItems(event, skipEl) {
    const checkboxes = this.mainLevel.querySelectorAll('input:checked');
    checkboxes.forEach((checkbox) => {
      if (skipEl && checkbox === skipEl) {
        return;
      }
      checkbox.checked = false;
      const accordion = checkbox.closest('[data-accordion-item]');
      if (accordion) {
        accordion.classList.remove('is-open');
        if (screen.width <= 820) {
          const parent = accordion.closest('.drawer-menu__contents');
          parent.classList.remove('pull-left');
        }
      }
    });

    if (!skipEl) {
      this.mainLevel.classList.remove('has-open-submenu');
    }
  }

  toggleMenuItem(scope) {
    const input = scope.currentTarget || scope;
    if (!input) return;

    this.closeAllItems(scope, input);

    const accordion = input.closest('[data-accordion-item]');
    if (!accordion) {
      return;
    }
    if (screen.width <= 820) {
      const parent = accordion.closest('.drawer-menu__contents');
      parent.classList.toggle('pull-left');
    }
    
    accordion.classList.toggle('is-open');
    if (accordion.classList.contains('is-open')) {
      this.mainLevel.classList.add('has-open-submenu');
    } else {
      this.mainLevel.classList.remove('has-open-submenu');
    }
  }

  toggleMenuItemFromTheme(scope) {
    let target = false;
    const button = scope.currentTarget || scope;
    const url = button.getAttribute('data-drawer-submenu-open');

    for (const input of this.firstLevelItemsWithChildren) {
      if (input.getAttribute('data-href') === url) {
        target = input;
        break;
      }
    }

    if (!target) return;

    Woolman.ModalsAndDrawers.showModalOrDrawer(this.el.getAttribute('id'));

    const animationFinished = () => {
      this.el.removeEventListener('transitionend', animationFinished);

      const evt = new Event('change');
      target.checked = true;
      target.dispatchEvent(evt);
    };
    this.el.addEventListener('transitionend', animationFinished);
  }

  toggleSubPanel(event) {
    this.closeAllItems();

    const button = event.currentTarget;
    const targetSelector = button.getAttribute('data-drawer-submenu-close');
    if (!targetSelector) {
      return;
    }

    const input = document.getElementById(targetSelector);
    if (!input) {
      return;
    }

    input.focus();
  }
}

if (customElements.get('drawer-menu') === undefined) {
  customElements.define('drawer-menu', DrawerMenu);
}
