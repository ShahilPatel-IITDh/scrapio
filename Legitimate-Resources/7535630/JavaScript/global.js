/** Shopify CDN: Minification failed

Line 39:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 46:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 53:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 54:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 67:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 68:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 69:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 69:27 Transforming array spread to the configured target environment ("es5") is not supported yet
Line 126:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 128:8 Transforming const to the configured target environment ("es5") is not supported yet
... and 82 more hidden warnings

**/
/*
 * Woolman Common JS
 */

// Initialize window.Woolman object
if (typeof window.Woolman == 'undefined') {
  window.Woolman = {};
}
Woolman.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};

// -------
// Load components / libraries
Woolman.init = function () {
  Woolman.ModalsAndDrawers.init();
  Woolman.Header.init();

   // Attach theme editor listeners
   if (!Shopify || !Shopify.designMode) return;

  let lastSelection = {
    sectionId: undefined,
    blockId: undefined
  };

  // Load is called when something is changed within section settings
  document.addEventListener('shopify:section:load', (evt) => {
    const sectionId = 'shopify-section-' + evt.detail.sectionId
    if (sectionId === Woolman.Header.cache.section.id) {
      Woolman.ModalsAndDrawers.init();
      Woolman.Header.init();
    }

    if (document.getElementById(sectionId).querySelector('slider-component')) {
      const slider = document.getElementById(sectionId).querySelector('slider-component')
      const config = slider.dataset.splideConfig;
      if (!config) return;

      new Splide(slider, config)
    } else if (document.querySelector(`[data-modal][data-section-id="${evt.detail.sectionId}"]`)) {
      Woolman.ModalsAndDrawers.showModalOrDrawer(document.querySelector(`[data-modal][data-section-id="${evt.detail.sectionId}"]`).id);
    }

    console.log('shopify:section:load sectionId', evt.detail.sectionId)
    console.log('lastSelection', lastSelection)
  })

  document.addEventListener('shopify:block:select', (evt) => {
    const sectionId = 'shopify-section-' + evt.detail.sectionId
    const blocks = document.getElementById(sectionId).querySelectorAll('[data-shopify-editor-block]')
    const selectedBlock = [...blocks].find(x => JSON.parse(x.dataset.shopifyEditorBlock).id === evt.detail.blockId);
    if (sectionId === Woolman.Header.cache.section.id) {
      if (selectedBlock) {
        Woolman.Header.cache.openButton.click();
        selectedBlock.closest('[data-accordion-item]').querySelector('label').click();
      }
    } else if (sectionId.includes('modal') && document.getElementById(sectionId).querySelector('[data-modal]')) {
      if (selectedBlock) {
        Woolman.ModalsAndDrawers.showModalOrDrawer(document.getElementById(sectionId).querySelector('[data-modal]').id);
      }
    }

    lastSelection.sectionId = evt.detail.sectionId;
    lastSelection.blockId = evt.detail.blockId;
    console.log('shopify:block:select', evt.detail.sectionId, evt.detail.blockId)
    console.log('lastSelection', lastSelection)
  })

  document.addEventListener('shopify:section:unload', (evt) => {
    console.log('shopify:section:unload sectionId', evt.detail.sectionId)
  })

  document.addEventListener('shopify:section:select', (evt) => {
    console.log('shopify:section:select', evt.detail.sectionId)
    lastSelection = {
      sectionId: evt.detail.sectionId,
      blockId: evt.detail.blockId
    }

    if (evt.detail.sectionId.includes('modal') && document.querySelector(`[data-modal][data-section-id="${evt.detail.sectionId}"]`)) {
      Woolman.ModalsAndDrawers.showModalOrDrawer(document.querySelector(`[data-modal][data-section-id="${evt.detail.sectionId}"]`).id);
    }

    console.log('lastSelection', lastSelection)
  })

  document.addEventListener('shopify:section:deselect', (evt) => {
    console.log('shopify:section:deselect', evt.detail.sectionId)
    lastSelection = {
      sectionId: undefined,
      blockId: undefined
    }

    if (evt.detail.sectionId.includes('modal') && document.querySelector(`[data-modal][data-section-id="${evt.detail.sectionId}"]`)) {
      Woolman.ModalsAndDrawers.closeModalOrDrawer(document.querySelector(`[data-modal][data-section-id="${evt.detail.sectionId}"]`).id);
    }

    console.log('lastSelection', lastSelection)
  })
};

// -------
// Woolman Common JS - Utility library
Woolman.Utils = {
  debugMode: true,
  focusTraps: {},
  checkCanFocusTrap: (trapContainers) => {
    const results = trapContainers.map((trapContainer) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (getComputedStyle(trapContainer).visibility !== 'hidden') {
            resolve();
            clearInterval(interval);
          }
        }, 5);
      });
    });
    // Return a promise that resolves when all the trap containers are able to receive focus
    return Promise.all(results);
  },
  onFocusTrapDeactivate: (targetElement) => {
    targetElement.classList.remove('focus-trap');
    document.body.classList.remove('focus-being-trapped');
  },
  onFocusTrapActivate: (targetElement) => {
    targetElement.classList.add('focus-trap');
    document.body.classList.add('focus-being-trapped');
  },
  clearFocusTrap: (cacheKey) => {
    if (Woolman.Utils.focusTraps[cacheKey]) {
      Woolman.Utils.focusTraps[cacheKey].deactivate();
      Woolman.Utils.focusTraps[cacheKey] = undefined;
    }
  },
  prepareQueryParams: () => {
    Shopify.queryParams = Shopify.queryParams || {};

    // Preserve existing query parameters
    if (location.search.length) {
      const params = location.search.substr(1).split('&');

      for (let i = 0; i < params.length; i++) {
        const keyValue = params[i].split('=');

        if (keyValue.length) {
          Shopify.queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
        }
      }
    }

    return Shopify.queryParams;
  },
  formatMoney(cents, format) {
    var default_money_format = 'â¬{{amount}}';
    if (typeof cents == 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || default_money_format;

    function defaultOption(opt, def) {
      return typeof opt == 'undefined' ? def : opt;
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal = defaultOption(decimal, '.');

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents = parts[1] ? decimal + parts[1] : '';

      return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  },
};

// -------
// Woolman Common JS - Header component
Woolman.Header = {
  selectors: {
    header: 'MainHeader',
    search: '[data-header-search]',
    searchOpen: `a[href="${routes.search_url}"]`,
    searchClose: '.header-search__close',
    cartBlip: '.cart-blip'
  },
  cache: {
    header: undefined,
    search: undefined,
    searchOpen: undefined,
    searchClose: undefined,
    cartBlip: undefined,
    section: undefined,
    openButton: undefined
  },
  focusTraps: {},

  init: function () {
    this.cache.header = document.getElementById(this.selectors.header);
    this.cache.search = this.cache.header.querySelector(this.selectors.search);
    this.cache.searchOpen = this.cache.header.querySelectorAll(this.selectors.searchOpen);
    this.cache.searchClose = this.cache.header.querySelector(this.selectors.searchClose);
    this.cache.cartBlip = this.cache.header.querySelector(this.selectors.cartBlip);
    this.cache.section = this.cache.header.closest('.shopify-section');
    this.cache.openButton = this.cache.header.querySelector('[href="#drawer-menu"]')

    if (this.cache.searchOpen && this.cache.searchClose) {
      this.cache.searchOpen.forEach((button) => {
        button.addEventListener('click', this.onSearchOpen.bind(this));
      })
      this.cache.searchClose.addEventListener('click', this.onSearchClose.bind(this));
    }

    // Update cart blip when product is added to cart.
    document.addEventListener('ajaxProduct:added', this.updateCartBlip.bind(this))
    document.addEventListener('cart:update', this.updateCartBlip.bind(this));

    if (this.cache.header.dataset.stickyBehavior === 'none') return;
    this.initStickyBehavior(this.cache.header.dataset.stickyBehavior)
  },

  onSearchOpen(event) {
    event.preventDefault();

    const targetElement = this.cache.search;
    Woolman.Utils.focusTraps['search'] = focusTrap.createFocusTrap(targetElement, {
      escapeDeactivates: true,
      checkCanFocusTrap: Woolman.Utils.checkCanFocusTrap,
      onActivate: () => {
        targetElement.classList.add('is-open');
        Woolman.Utils.onFocusTrapActivate(targetElement);
        bodyScrollLock.disableBodyScroll(targetElement);
        setTimeout(() => {
          targetElement.classList.add('animation')
        })
      },
      onDeactivate: () => {
        targetElement.classList.remove('animation')
        bodyScrollLock.enableBodyScroll(targetElement);
        Woolman.Utils.onFocusTrapDeactivate(targetElement);
        setTimeout(() => {
          targetElement.classList.remove('is-open');
        })
      },
    });

    Woolman.Utils.focusTraps['search'].activate();
  },

  onSearchClose(event) {
    event.preventDefault();
    Woolman.Utils.clearFocusTrap('search');
  },

  initStickyBehavior(behaviorType) {
    const stickyConfig = {
      headerHeight: this.cache.header.clientHeight,
      behavior: behaviorType
    }

    document.documentElement.classList.add('sticky-header-initialized', `sticky-header-${behaviorType}`);
    document.documentElement.style.setProperty('--sticky-header-margin-top', `${stickyConfig.headerHeight}px`);

    if (behaviorType === 'scroll' || behaviorType === 'fixed') {
      // Show on scroll fixed header
      let prevScroll = window.scrollY || document.documentElement.scrollTop;
      let curScroll;
      let direction = 0;
      let prevDirection = 0;

      /*
      ** Find the direction of scroll
      ** 0 - initial, 1 - up, 2 - down
      */

      const toggleStickyHeader = (direction, curScroll) => {
        if ((direction === 1) || curScroll < stickyConfig.headerHeight) {
          document.documentElement.classList.remove('sticky-header-hide')
        } else if (direction === 2 && curScroll > stickyConfig.headerHeight) {
          document.documentElement.classList.add('sticky-header-hide')
        }

        prevDirection = direction;
      }

      window.addEventListener('scroll', throttle(() => {
        curScroll = window.scrollY || document.documentElement.scrollTop;

        if (curScroll >= 300) {
          document.documentElement.classList.add('sticky-header-show')
        } else {
          document.documentElement.classList.remove('sticky-header-show');
        }

        if (curScroll > prevScroll) {
          direction = 2; // user scrolling down
        } else {
          direction = 1; // user scrolling up
        }

        if (direction !== prevDirection && behaviorType === 'scroll') {
          toggleStickyHeader(direction, curScroll)
        }

        prevScroll = curScroll
      }, 50))

      setInterval(() => {
        if (direction === 2 && behaviorType === 'scroll' && curScroll >= 900) {
          toggleStickyHeader(direction, curScroll);
        }
        if (window.scrollY === 0) {
          document.documentElement.classList.remove('sticky-header-show', 'sticky-header-hide');
        }
      }, 200)
    }
  },

  async updateCartBlip(e) {
    const cart = e.detail && e.detail.cart && e.detail.cart.item_count || await (async function () {
      const res = await fetch('/cart.json');
      const cart = await res.json();
      return cart;
    })();

    this.cache.cartBlip.textContent = cart.item_count || 0;
    if (cart && cart.item_count == 0) {
      this.cache.cartBlip.setAttribute('hidden', true);
      this.cache.cartBlip.closest('.header-item__link').classList.remove('has-blip-visible');
    } else {
      this.cache.cartBlip.removeAttribute('hidden')
      this.cache.cartBlip.closest('.header-item__link').classList.add('has-blip-visible');
    }
  }
};

// -------
// Woolman Common JS - Modals & drawers library
Woolman.ModalsAndDrawers = {
  settings: {
    selectors: {
      modalLink: 'a[href*="modal"]',
      drawerLink: 'a[href*="drawer"]',
    },
  },
  focusTraps: {},
  init: function () {
    document.querySelectorAll(this.settings.selectors.modalLink).forEach((modalLink) => {
      modalLink.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        this.showModalOrDrawer(targetId);
      });
    });

    document.querySelectorAll(this.settings.selectors.drawerLink).forEach((drawerLink) => {
      drawerLink.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        this.showModalOrDrawer(targetId);
      });
    });
  },
  /**
   *
   * @param {string} targetId - ID of modal or drawer element, e.g. modal-geo, drawer-menu
   * Traps focus to modal and disables body scrolling.
   * Focus trap utilizes focus-trap library: https://github.com/focus-trap/focus-trap
   */
  showModalOrDrawer: function (targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement && Woolman.Utils.debugMode) {
      console.warn('No modal/drawer element specified');
    }
    if (!targetElement) {
      return;
    }

    if (targetElement.classList.contains('is-open')) return;

    targetElement.classList.add('initialized', 'is-open');

    if (!Woolman.Utils.focusTraps[targetId]) {
      const trapTarget = targetElement.querySelector('[data-contents') || targetElement;
      Woolman.Utils.focusTraps[targetId] = focusTrap.createFocusTrap(trapTarget, {
        clickOutsideDeactivates: true,
        escapeDeactivates: true,

        // Called before focus is sent
        onActivate: () => {
          Woolman.Utils.onFocusTrapActivate(targetElement);

          const closeBtns = targetElement.querySelectorAll('[data-close]');
          if (closeBtns) {
            closeBtns.forEach((closeBtn) => {
              closeBtn.addEventListener('click', this.closeModalOrDrawerOrDrawerFromEvent.bind(this));
            });
          }

          const overlay = targetElement.querySelector('[data-overlay]');
          if (overlay) {
            overlay.addEventListener('click', this.closeModalOrDrawerOrDrawerFromEvent.bind(this));
          }

          bodyScrollLock.disableBodyScroll(targetElement);
        },

        // There is a delay between when the class is applied
        // and when the element is focusable
        checkCanFocusTrap: Woolman.Utils.checkCanFocusTrap,

        // Called after focus is deactivated
        onDeactivate: () => {
          targetElement.querySelectorAll('[data-close]').forEach((closeBtn) => {
            closeBtn.removeEventListener('click', this.closeModalOrDrawerOrDrawerFromEvent.bind(this));
          });

          const overlay = targetElement.querySelector('[data-overlay]');
          if (overlay) {
            overlay.click();
            overlay.removeEventListener('click', this.closeModalOrDrawerOrDrawerFromEvent.bind(this));
          }
          bodyScrollLock.enableBodyScroll(targetElement);
          Woolman.Utils.onFocusTrapDeactivate(targetElement);
        },
      });
    }

    Woolman.Utils.focusTraps[targetId].activate();
  },
  /**
   *
   * @param {string} targetId - ID of target element, e.g. modal-geo, drawer-menu
   * Removes trapped focus when modal is closed by e.g. using the close button.
   */
  closeModalOrDrawer: function (targetId) {
    if (Woolman.Utils.focusTraps[targetId]) {
      Woolman.Utils.focusTraps[targetId].deactivate();
      Woolman.Utils.focusTraps[targetId] = undefined;
    }
  },
  closeModalOrDrawerOrDrawerFromEvent: function (event) {
    event.preventDefault();
    const parentElement = event.currentTarget.closest('[data-parent]');
    const targetId = parentElement.getAttribute('id');
    parentElement.classList.remove('is-open');
    this.closeModalOrDrawer(targetId);
  },
};

Woolman.init();

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function throttle(fn, wait) {
  let t = false;
  return (...args) => {
    if (!t) {
      fn.apply(this, args)
      t = true;
      setTimeout(() => t = false, wait)
    }
  }
}

/**
 * Allow us to trigger something when window is actually resized.
 */
let woolman_window_size = window.innerWidth;
window.addEventListener(
  'resize',
  debounce(() => {
    if (window.innerWidth == woolman_window_size) {
      return;
    }
    woolman_window_size = window.innerWidth;
    document.dispatchEvent(new CustomEvent('woolman:resize'));
  }),
  250
);

window.processingSplider = false;
class SpliderParent extends HTMLElement {
  constructor() {
    'use strict';
    super();

    const styles = getComputedStyle(this);
    const perPage = parseInt(styles.getPropertyValue('--items-per-row-desktop')) || 3;
    const perPageMobile = parseInt(styles.getPropertyValue('--items-per-row-mobile')) || 2;
    const gap = styles.getPropertyValue('--gap') || getComputedStyle(document.documentElement).getPropertyValue('--grid-gap-product');

    if (!this.hasAttribute('data-has-thumbnail')) {
      // Default sliders
      this.config = this.dataset.splide
        ? JSON.parse(this.dataset.splide)
        : {
          perPage: perPage,
          perMove: 1,
          drag: 'free',
          gap: gap,
          snap: true,
          autoWidth: true,
          lazyLoad: 'nearby',
          pagination: false,
          arrows: true,
          dragMinThreshold: 50,
          flickPower: 300,
          flickPages: 1,
          breakpoints: {
            768: {
              perPage: perPageMobile,
              arrows: false
            }
          }
        };
    } else {
      // Product slider with thumbnails below
      this.config = {
        pagination: false
      };

      this.thumbConfig = {
        rewind: true,
        isNavigation: true,
        arrows: false,
        gap: gap,
        pagination: false,
        perPage: 4,
        dragMinThreshold: {
          mouse: 4,
          touch: 10,
        },
      };
    }

    this.el = this;
    this.splide = undefined;
  
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.downloadAndMount();
      }
    });

    /* Spliders are always lazily loaded. First we check if we can mount it or not */
    const mobileOnly = this.hasAttribute('data-mobile-only');
    const desktopOnly = this.hasAttribute('data-desktop-only');

    if (mobileOnly === false && desktopOnly === false) {
      // Slider is meant to be used for all devices, allow mounting immediately
      this.allowMounting();
    } else {
      document.addEventListener('woolman:resize', () => {
        this.checkIfCanMount(mobileOnly, desktopOnly);
      });
      this.checkIfCanMount(mobileOnly, desktopOnly);
    }

    if (Shopify && Shopify.designMode) {
      this.el.dataset.splideConfig = JSON.stringify(this.config)
    }
  }

  setupListeners() {
    const parentSection = this.closest('.shopify-section');
    parentSection.addEventListener('shopify:block:select', function (event) {
      const blockSelectedIsSlide = event.target.classList.contains('splide__slide');
      const currentSliderId = event.target.closest('slider-component').dataset.id;

      if (!blockSelectedIsSlide || !this.splide || this.dataset.id != currentSliderId) return;

      const index = parseInt(event.target.dataset.index);
      this.splide.go(index);

      const autoplay = this.splide.Components.Autoplay;
      autoplay.pause();
    }.bind(this));

    parentSection.addEventListener('shopify:block:deselect', function (event) {
      const blockSelectedIsSlide = event.target.classList.contains('splide__slide');
      const currentSliderId = event.target.closest('slider-component').dataset.id;

      if (!blockSelectedIsSlide || !this.splide || this.dataset.id != currentSliderId) return;

      const autoplay = this.splide.Components.Autoplay;
      autoplay.play();
    }.bind(this));
  }

  checkIfCanMount(mobileOnly, desktopOnly) {
    const breakpoint = 768;

    if (mobileOnly && woolman_window_size < breakpoint) {
      // Slider is for mobile devices only, allow mounting immediately
      this.allowMounting();
      return;
    }
    if (desktopOnly && woolman_window_size >= breakpoint) {
      // Slider is for desktop devices only, allow mounting immediately
      this.allowMounting();
      return;
    }
    this.disallowMounting();
  }

  /**
   * This function is called when we are sure that we can mount the slider. It will call downloadAndMount() which downloads the splider script and proceeds to mount it.
   * @param {boolean*} skipClassGeneration - If true, the required classes will not be generated and are assumed to exist already in HTML.
   */
  allowMounting(skipClassGeneration = false) {
    if (!skipClassGeneration) {
      this.classList.add('splide');
      this.querySelectorAll('[data-class]').forEach((elem) => {
        elem.classList.add(elem.dataset.class.split(' '));
      });
    }

    if (!this.hasAttribute('data-skip-observe')) {
      this.observer.observe(this.el);
    } else {
      this.downloadAndMount();
    }
  }

  disallowMounting() {
    if (this.splide) {
      this.splide.destroy(true);
      this.el.classList.remove('is-initialized');
    }

    this.classList.remove('splide');
    this.querySelectorAll('[data-class]').forEach((elem) => {
      elem.classList.remove(elem.dataset.class.split(' '));
    });

    this.observer.unobserve(this.el);
  }

  /**
   * This function downloads the splider script and proceeds to mount it.
   */
  downloadAndMount() {
    const sliderAssetUrl = theme.assets.slider;
    const existingScript = document.querySelector(`script[src="${sliderAssetUrl}"]`);

    // If we are already processing one slider, wait a while and try again.
    if (window.processingSplider) {
      setTimeout(this.downloadAndMount.bind(this), 200);
      return;
    }

    // Slider script was already found in document, proceed to immediately mount slider
    if (existingScript) {
      this.mountSlider();
      return;
    }

    // Slider script was not found in document, download it and wait for it to load, then mount the slider
    window.processingSplider = true;
    const script = document.createElement('script');
    script.setAttribute('defer', 'true');
    script.setAttribute('async', 'true');
    script.src = sliderAssetUrl;
    document.body.append(script);

    script.addEventListener('load', () => {
      this.mountSlider();
    });
  }

  /**
   * This function mounts the slider.
   */
  mountSlider() {
    this.splide = new Splide(this.el, this.config);

    if (this.thumbConfig) {
      const thumbEl = document.getElementById(this.getAttribute('data-has-thumbnail'));
      this.thumbSplide = new Splide(thumbEl, this.thumbConfig);
      this.splide.sync(this.thumbSplide);
    }

    this.splide.mount();

    if (this.thumbSplide) {
      this.thumbSplide.mount();
    }

    if (this.querySelector('.natural')) {
      this.splide.on('resize arrows:updated', this.updateHeight.bind(this));
      this.updateHeight();
    }

    this.observer.unobserve(this.el);
    this.dispatchEvent(new CustomEvent('mounted', { detail: { splide: this.splide } }));
    if (Shopify.designMode) { this.setupListeners() }; // editor listeners !

    window.processingSplider = false;
  }

  updateHeight() {
    const slide = this.splide.Components.Slides.getAt( this.splide.index ).slide;
    slide.parentElement.parentElement.style.height = slide.querySelector('.media').offsetHeight + 'px';
  }
}

if (customElements.get('slider-component') === undefined) {
  customElements.define('slider-component', SpliderParent);
}

class ProductSliderComponent extends SpliderParent {
  constructor() {
    super();
  }
  setActiveMedia(htmlElementId) {
    const mediaNode = document.querySelector(`[data-media-id="${htmlElementId}"]`);
    if (!mediaNode) return;

    if (!mediaNode.classList.contains('splide__slide')) {
      window.scrollTo({
        top: mediaNode.offsetTop,
        behavior: 'smooth'
      })
      return;
    }

    const mediaNodeIndex = parseInt(mediaNode.dataset.index) || 0;
    this.splide.go(mediaNodeIndex);
  }
}
customElements.define('product-slider-component', ProductSliderComponent);

class LocalizationForm extends HTMLElement {
  constructor() {
    super();
    this.elements = {
      input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
      button: this.querySelector('button'),
      panel: this.querySelector('.disclosure__list-wrapper'),
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

// Function that adds 'in-viewport' class to any .shopify-section when it enters the viewport
// Uses IntersectionObserver API for the detection
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
(function addInViewportClass(elements) {
  const threshold = Shopify || Shopify.designMode === true ? 0 : 0.15;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-in-view');
        entry.target.dispatchEvent(new CustomEvent('section:in-viewport'))
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: [threshold, 1],
  });

  elements.forEach((el) => {
    observer.observe(el);
  });
})(document.querySelectorAll('.shopify-section'))

// Custom element that enhances HTML Video Element functionality.
// Usage: <video is="superpowered-video">
class SuperPoweredVideo extends HTMLElement {
  constructor() {
    super();

    this.video = this.querySelector('video') || this.querySelector('iframe');
    if (this.closest('.video-container')) this.attachClickListener(this.closest('.video-container'));
  }

  attachClickListener(videoContainer) {
    if (!videoContainer) return;
    videoContainer.addEventListener('click', (e) => {
      if (this.video.paused) {
        this.video.play();
      } else {
        this.video.pause();
      }
    });

    this.video.onplay = () => {
      videoContainer.querySelector('button').hidden = true;
    }

    this.video.onpause = () => {
      videoContainer.querySelector('button').hidden = false;
    }
  }
}
customElements.define('superpowered-video', SuperPoweredVideo);