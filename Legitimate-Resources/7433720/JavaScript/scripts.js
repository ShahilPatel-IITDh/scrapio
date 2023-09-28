/** Shopify CDN: Minification failed

Line 27:43 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 28:17 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 32:10 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 37:10 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 42:21 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 47:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 48:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 49:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 53:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 69:2 Transforming class syntax to the configured target environment ("es5") is not supported yet
... and 56 more hidden warnings

**/
(function() {
  var __sections__ = {};
  (function() {
    for(var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
  })();
  (function() {
  if (!__sections__["featured-product"]) return;
  try {
    
  if (!customElements.get('product-modal')) {
    customElements.define('product-modal', class ProductModal extends ModalDialog {
      constructor() {
        super();
      }

      hide() {
        super.hide();
        window.pauseAllMedia();
      }

      show(opener) {
        super.show(opener);
        this.showActiveMedia();
      }

      showActiveMedia() {
        this.querySelectorAll(`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute("data-media-id")}"])`).forEach((element) => {
            element.classList.remove('active');
          }
        )
        const activeMedia = this.querySelector(`[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`);
        const activeMediaTemplate = activeMedia.querySelector('template');
        const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
        activeMedia.classList.add('active');
        activeMedia.scrollIntoView();

        const container = this.querySelector('[role="document"]');
        container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

        if (activeMedia.nodeName == 'DEFERRED-MEDIA' && activeMediaContent && activeMediaContent.querySelector('.js-youtube'))
          activeMedia.loadContent();
      }
    });
  }

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["footer"]) return;
  try {
    
  class LocalizationForm extends HTMLElement {
    constructor() {
      super();
      this.elements = {
        input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
        button: this.querySelector('button'),
        panel: this.querySelector('ul'),
      };
      this.elements.button.addEventListener('click', this.openSelector.bind(this));
      this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
      this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

      this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClick.bind(this)));
    }

    hidePanel() {
      this.elements.button.setAttribute('aria-expanded', 'false');
      this.elements.panel.setAttribute('hidden', true);
    }

    onContainerKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;

      this.hidePanel();
      this.elements.button.focus();
    }

    onItemClick(event) {
      event.preventDefault();
      const form = this.querySelector('form');
      this.elements.input.value = event.currentTarget.dataset.value;
      if (form) form.submit();
    }

    openSelector() {
      this.elements.button.focus();
      this.elements.panel.toggleAttribute('hidden');
      this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
    }

    closeSelector(event) {
      const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
      if (event.relatedTarget === null || shouldClose) {
        this.hidePanel();
      }
    }
  }

  customElements.define('localization-form', LocalizationForm);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["main-cart-footer"]) return;
  try {
    
  class CartNote extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('change', debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${routes.cart_update_url}`, {...fetchConfig(), ...{ body }});
      }, 300))
    }
  }

  customElements.define('cart-note', CartNote);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["main-product"]) return;
  try {
    
  class ProductModal extends ModalDialog {
    constructor() {
      super();
    }

    hide() {
      super.hide();
      window.pauseAllMedia();
    }

    show(opener) {
      super.show(opener);
      this.showActiveMedia();
    }

    showActiveMedia() {
      this.querySelectorAll(`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute("data-media-id")}"])`).forEach((element) => {
          element.classList.remove('active');
        }
      )
      const activeMedia = this.querySelector(`[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`);
      const activeMediaTemplate = activeMedia.querySelector('template');
      const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
      activeMedia.classList.add('active');
      activeMedia.scrollIntoView();

      const container = this.querySelector('[role="document"]');
      container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

      if (activeMedia.nodeName == 'DEFERRED-MEDIA' && activeMediaContent && activeMediaContent.querySelector('.js-youtube'))
        activeMedia.loadContent();
    }
  }

  customElements.define('product-modal', ProductModal);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["og-header"]) return;
  try {
    
  class StickyHeader extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.header = document.getElementById('shopify-section-header');
      this.headerBounds = {};
      this.currentScrollTop = 0;
      this.preventReveal = false;

      this.onScrollHandler = this.onScroll.bind(this);
      this.hideHeaderOnScrollUp = () => this.preventReveal = true;

      this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
      window.addEventListener('scroll', this.onScrollHandler, false);

      this.createObserver();
    }

    disconnectedCallback() {
      this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
      window.removeEventListener('scroll', this.onScrollHandler);
    }

    createObserver() {
      let observer = new IntersectionObserver((entries, observer) => {
        this.headerBounds = entries[0].intersectionRect;
        observer.disconnect();
      });

      observer.observe(this.header);
    }

    onScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
        requestAnimationFrame(this.hide.bind(this));
      } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
        if (!this.preventReveal) {
          requestAnimationFrame(this.reveal.bind(this));
        } else {
          window.clearTimeout(this.isScrolling);

          this.isScrolling = setTimeout(() => {
            this.preventReveal = false;
          }, 66);

          requestAnimationFrame(this.hide.bind(this));
        }
      } else if (scrollTop <= this.headerBounds.top) {
        requestAnimationFrame(this.reset.bind(this));
      }


      this.currentScrollTop = scrollTop;
    }

    hide() {
      this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
      this.closeMenuDisclosure();
      this.closeSearchModal();
    }

    reveal() {
      this.header.classList.add('shopify-section-header-sticky', 'animate');
      this.header.classList.remove('shopify-section-header-hidden');
    }

    reset() {
      this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
    }

    closeMenuDisclosure() {
      this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
      this.disclosures.forEach(disclosure => disclosure.close());
    }

    closeSearchModal() {
      this.searchModal = this.searchModal || this.header.querySelector('details-modal');
      this.searchModal.close(false);
    }
  }

  customElements.define('sticky-header', StickyHeader);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["wl-main-product-no-selected-variant"]) return;
  try {
    
  class ProductModal extends ModalDialog {
    constructor() {
      super();
    }

    hide() {
      super.hide();
      window.pauseAllMedia();
    }

    show(opener) {
      super.show(opener);
      this.showActiveMedia();
    }

    showActiveMedia() {
      this.querySelectorAll(`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute("data-media-id")}"])`).forEach((element) => {
          element.classList.remove('active');
        }
      )
      const activeMedia = this.querySelector(`[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`);
      const activeMediaTemplate = activeMedia.querySelector('template');
      const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
      activeMedia.classList.add('active');
      activeMedia.scrollIntoView();

      const container = this.querySelector('[role="document"]');
      container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

      if (activeMedia.nodeName == 'DEFERRED-MEDIA' && activeMediaContent && activeMediaContent.querySelector('.js-youtube'))
        activeMedia.loadContent();
    }
  }

  customElements.define('product-modal', ProductModal);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["wl-main-product"]) return;
  try {
    
  class ProductModal extends ModalDialog {
    constructor() {
      super();
    }

    hide() {
      super.hide();
      window.pauseAllMedia();
    }

    show(opener) {
      super.show(opener);
      this.showActiveMedia();
    }

    showActiveMedia() {
      this.querySelectorAll(`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute("data-media-id")}"])`).forEach((element) => {
          element.classList.remove('active');
        }
      )
      const activeMedia = this.querySelector(`[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`);
      const activeMediaTemplate = activeMedia.querySelector('template');
      const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
      activeMedia.classList.add('active');
      activeMedia.scrollIntoView();

      const container = this.querySelector('[role="document"]');
      container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

      if (activeMedia.nodeName == 'DEFERRED-MEDIA' && activeMediaContent && activeMediaContent.querySelector('.js-youtube'))
        activeMedia.loadContent();
    }
  }

  customElements.define('product-modal', ProductModal);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["wl-product-recommendations"]) return;
  try {
    
  class ProductRecommendations extends HTMLElement {
    constructor() {
      super();

      const handleIntersection = (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.unobserve(this);

        fetch(this.dataset.url)
          .then(response => response.text())
          .then(text => {
            const html = document.createElement('div');
            html.innerHTML = text;
            const recommendations = html.querySelector('product-recommendations');
            if (recommendations && recommendations.innerHTML.trim().length) {
              this.innerHTML = recommendations.innerHTML;
            }
          })
          .catch(e => {
            console.error(e);
          });
      }

      new IntersectionObserver(handleIntersection.bind(this), {rootMargin: '0px 0px 200px 0px'}).observe(this);
    }
  }

  customElements.define('product-recommendations', ProductRecommendations);

  } catch(e) { console.error(e); }
})();

})();
