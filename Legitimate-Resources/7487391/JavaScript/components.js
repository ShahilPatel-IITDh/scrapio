const data = new Map();

/**
 * Function that scroll into specific element
 */
const scrollIntoView = () => {
  document.querySelectorAll('.js-scroll-into').forEach(
    node => node.addEventListener('click', (ev) => {
      const id = ev.target.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) {
        throw new Error(`Target with id: '${id}' not found.`);
      }
      target.scrollIntoView({
        behavior: 'smooth'
      });
    })
  )
};

const formatPrice = (price) =>
  `${(Math.round(price * 100) / 100)
    .toFixed(2)
    .toString()
    .replace('.', ',')} â‚¬`;

/**
 *  This class represent a Switcher component
 *
 * @class Switcher
 */
class Switcher {
  constructor(node) {
    const id = node.getAttribute('id');
    this._checkbox = node;
    this._toggle = document.querySelector(`label[for='${id}'] .c-switcher-toggle`);
    this._labels = document.querySelectorAll(`label[for='${id}'] .c-switcher-item`);
    this._containers = document.querySelectorAll(`[data-switcher-content='${id}'] > div`);
    this._initEvent();
    this._handleResize();
    data.set(node, this);
  }

  _initEvent() {
    window.addEventListener('resize', this._handleResize.bind(this));
  }

  _handleResize() {
    this._moveSwitcher();
  }

  _moveSwitcher() {
    if (this._checkbox.checked) {
      this._move(this._labels[0].clientWidth, this._labels[1].clientWidth);
      return;
    }
    this._move(0, this._labels[0].clientWidth);
  }

  _switchLabels() {
    if (this._labels.length === 0) {
      return;
    }
    this._moveSwitcher();
    this._labels.forEach(label => {
      label.classList.toggle('selected');
    });
  }

  _switchContainers() {
    if (this._containers.length === 0) {
      return;
    }
    this._containers.forEach(container => {
      container.classList.toggle('d-none');
      container.classList.toggle('d-block');
    });
  }

  _move(pointX, width) {
    this._toggle.style.transform = `translateX(${pointX}px)`;
    this._toggle.style.width = `${width}px`;
  }

  toggle() {
    this._switchLabels();
    this._switchContainers();
  }

  static getInstance(node) {
    return data.get(node);
  }

  static getOrCreateInstance(node) {
    if (data.has(node)) {
      return data.get(node);
    }
    return new Switcher(node);
  }
}

/**
 *  This function represent a responsive
 *  side menu
 */
const MySideMenu = (() => {

  class SideMenu {
    constructor(sidemMenuNode) {
      this._sideMenu = sidemMenuNode;
    }

    get _hiddenAttr() {
      return this._sideMenu.getAttribute('aria-hidden') === 'true';
    }

    set _hiddenAttr(value) {
      this._sideMenu.setAttribute('aria-hidden', `${value}`);
    }

    _scrollBehaviour(toggle) {
      switch (toggle) {
        case 'disable':
          document.querySelector('body').classList.add('overflow-hidden');
          break;
        case 'enable':
          document.querySelector('body').classList.remove('overflow-hidden');
          break;
        default:
          break;
      }
    }

    show() {
      this._hiddenAttr = false;
      this._scrollBehaviour('disable');
      this._sideMenu.classList.add('show');
    }

    hide() {
      const handler = () => {
        this._sideMenu.classList.remove('show');
        this._sideMenu.removeEventListener('animationend', handler, false);
      }
      this._hiddenAttr = true;
      this._scrollBehaviour('enable');
      this._sideMenu.addEventListener('animationend', handler, false);
    }
  }

  /**
   * Binds click handlers to side menu and accordion triggers
   * @return void
   */
  const init = () => {
    const sideMenu = new SideMenu(document.querySelector('#sideMenu'));

    Array.from(document.querySelectorAll('[data-sidenav-trigger]')).forEach(
      (btnNode) => btnNode.addEventListener('click', (ev) => {
        ev.preventDefault();
        sideMenu.show();
      })
    );

    Array.from(document.querySelectorAll('[data-sidenav-close]')).forEach(
      (btnNode) => btnNode.addEventListener('click', (ev) => {
        ev.preventDefault();
        sideMenu.hide();
      })
    );

    Array.from(document.querySelectorAll('[data-accordion-target]')).forEach(
      (btn) =>
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const id = btn.getAttribute('data-accordion-target');
        const accordion = document.querySelector(
          `[data-accordion-menu='${id}']`
        );

        if (accordion.style.maxHeight !== '') {
          btn.setAttribute('aria-expanded', `${false}`);
          accordion.style.maxHeight = '';
          return;
        }
        btn.setAttribute('aria-expanded', `${true}`);
        accordion.style.maxHeight = `${accordion.scrollHeight}px`;
      })
    );
  }

  return {
    init
  };
})();

/**
 *  This class represent a Dropdown component
 *
 * @class Dropdown
 */
class Dropdown {
  constructor(btnNode) {
    const id = btnNode.getAttribute('data-dropdown-trigger');
    if (!id) {
      throw new Error(`Attribute 'data-dropdown-trigger' not found`);
    }
    this._btnNode = btnNode;
    this._dropdownNode = document.querySelector(`#${id}`);
    this._boundEventHandler = this._handleClickOutside.bind(this);
    this._addEventListener();
    data.set(this._btnNode, this);
  }

  get _expanded() {
    return this._btnNode.getAttribute('aria-expanded') === 'true';
  }

  set _expanded(value) {
    this._btnNode.setAttribute('aria-expanded', `${value}`);
  }

  _addEventListener() {
    this._btnNode.addEventListener('click', (ev) => this._handleClick(ev));
  }

  _handleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this._hideAll(false);
    this.toggle();
  }

  _handleClickOutside(ev) {
    if (this._dropdownNode.contains(ev.target)) {
      return;
    }
    this._hideAll();
  }

  _hideAll(isOutsideClick = true) {
    let nodes = Array
      .from(document.querySelectorAll('[data-dropdown-trigger][aria-expanded="true"]'))

    if (!isOutsideClick) {
      nodes = nodes.filter(triggerNode => !triggerNode.isEqualNode(this._btnNode))
    }
    nodes
      .map(triggerNode => Dropdown.getInstance(triggerNode))
      .forEach(toggle => toggle.hide())
  }

  toggle() {
    if (!this._expanded) {
      this.show();
      return
    }
    this.hide();
  }

  show() {
    if (this._expanded) {
      return;
    }
    this._expanded = true;
    this._dropdownNode.classList.add('show');
    window.addEventListener('click', this._boundEventHandler, false);
  }

  hide() {
    if (!this._expanded) {
      return;
    }
    this._expanded = false;
    const handler = () => {
      this._dropdownNode.classList.remove('show');
      this._dropdownNode.removeEventListener('animationend', handler, false);
    };
    this._dropdownNode.addEventListener('animationend', handler, false);
    window.removeEventListener('click', this._boundEventHandler, false);
  }

  static getInstance(btnNode) {
    return data.get(btnNode);
  }
}

/**
 * This class represents an accordion item in accordion list.
 *
 * @class Accordion
 */

class Accordion {
  constructor(node) {
    this._isTransitioning = false;
    this._item = node;
    this._parent = node.parentElement;
    this._alwaysOpen = node.parentElement.getAttribute('data-accordion-always-open') === 'true';
    data.set(this._item, this);
  }

  toggle() {
    if (this._isOpen) {
      this.hide();
      return;
    }
    this.show();
  }

  show() {
    if (this._isTransitioning || this._isOpen) {
      return;
    }

    if (!this._alwaysOpen) {
      this.hideAll();
    }

    const header = this._item.children[0];
    const collapse = this._item.children[1];

    this._isTransitioning = true;

    const complete = () => {
      this._isTransitioning = false;

      collapse.style.height = '';

      collapse.removeEventListener('transitionend', complete, false);
    };

    this._item.classList.add('active');
    header.setAttribute('aria-expanded', true);
    collapse.style.height = 0;
    collapse.style.height = `${collapse.scrollHeight}px`;

    collapse.addEventListener('transitionend', complete, false);
  }

  hide() {
    if (this._isTransitioning || !this._isOpen) {
      return;
    }

    const header = this._item.children[0];
    const collapse = this._item.children[1];

    this._isTransitioning = true;

    const complete = () => {
      this._isTransitioning = false;

      collapse.style.height = '';
      this._item.classList.remove('active');

      collapse.removeEventListener('transitionend', complete, false);
    };

    collapse.style.height = `${collapse.scrollHeight}px`;
    this._reflow(collapse);
    collapse.style.height = 0;
    header.setAttribute('aria-expanded', false);

    collapse.addEventListener('transitionend', complete, false);
  }

  hideAll() {
    Array
      .from(this._parent.children)
      .map(node => Accordion.getOrCreateInstance(node))
      .forEach(accordion => accordion.hide());
  }

  get _isOpen() {
    return this._item.classList.contains('active');
  }

  _reflow(element) {
    element.offsetHeight;
  }

  static getInstance(item) {
    return data.get(item);
  }

  static getOrCreateInstance(item) {
    if (data.has(item)) {
      return data.get(item);
    }
    return new Accordion(item);
  }
}

/**
 *  This class represent a Vertical slider for B2C landpage
 *
 * @class Vertical Slider
 */
class VerticalSlider {
  constructor(node, config = undefined) {
    this.activeSlideIndex = 0;
    this._config = {
      interval: true,
      intervalTimeout: 5000,
      transitionDuration: .5,
      breakpoint: 992
    };
    this._interval;
    this._container = node;
    this._leftSlide = node.querySelector('.c-vertical-slider-left');
    this._rightSlide = node.querySelector('.c-vertical-slider-right');
    this._slideLength = node.querySelectorAll('.c-vertical-slider-right > div').length;
    this._actions = node.querySelectorAll('.c-vertical-slider-actions button');
    this._mergeConfig(config);
    this._initEvents();
    this._initInterval();
    data.set(node, this);
  }

  get _isSmallerThanBreakpoint() {
    return window.innerWidth < this._config.breakpoint;
  }

  _mergeConfig(config) {
    if (typeof config === 'undefined') {
      return;
    }
    this._config = Object.assign(this._config, config);
  }

  _initEvents() {
    this._actions.forEach(action => action.addEventListener('click', this._handleClick.bind(this)));
    window.addEventListener('resize', this._handleResize.bind(this));
  }

  _initInterval() {
    if (!this._config.interval) {
      return;
    }
    this._interval = setInterval(this.next.bind(this), this._config.intervalTimeout);
  }

  _clearInterval() {
    if (!this._config.interval) {
      return;
    }
    clearInterval(this._interval);
  }

  _refreshInterval() {
    this._clearInterval();
    this._initInterval();
  }

  _handleResize() {
    this._move(this.activeSlideIndex, true);
  }

  _handleClick(ev) {
    const button = ev.target;
    const index = +button.dataset.sliderIndex;
    if (isNaN(index)) {
      throw new Error('Slider index is not a number');
    }
    this._refreshInterval();
    this._move(index);
  }

  _move(index = 0, resize = false) {
    this.activeSlideIndex = index;

    if (index > this._slideLength - 1) {
      this.activeSlideIndex = 0;
    }

    if (index < 0 ) {
      this.activeSlideIndex = this._slideLength - 1;
    }

    if (resize) {
      this._rightSlide.style.transition = '';
      this._leftSlide.style.transition = '';
    } else {
      this._rightSlide.style.transition = `transform ${this._config.transitionDuration}s ease-in-out`;
      this._leftSlide.style.transition = `transform ${this._config.transitionDuration}s ease-in-out`;
    }

    const sliderHeight = this._container.clientHeight;
    const sliderWidth = this._container.clientWidth;
    const axis = this._isSmallerThanBreakpoint ? 'X' : 'Y';
    const move = (this._isSmallerThanBreakpoint ? sliderWidth : sliderHeight) * this.activeSlideIndex;

    this._rightSlide.style.transform = `translate${axis}(-${move}px)`;
    this._leftSlide.style.transform = `translate${axis}(${move}px)`;
  }

  goTo(index) {
    this._move(index);
  }

  next() {
    this._move(this.activeSlideIndex + 1);
  }

  previous() {
    this._move(this.activeSlideIndex - 1);
  }

  static getInstance(node) {
    return data.get(node);
  }

  static getOrCreateInstance(node) {
    if (data.has(node)) {
      return data.get(node);
    }
    return new VerticalSlider(node);
  }
}

const animateElemenet = (animeTriggerEl) => {
  const target = animeTriggerEl.dataset.animeTarget;
  const direction = animeTriggerEl.dataset.animeDirection;

  if (typeof anime !== 'function') {
    return;
  }

  if (!animeTriggerEl || !direction) {
    return;
  }
  
  const targets = target
    ? Array.from(animeTriggerEl.querySelectorAll(target))
    : [animeTriggerEl];

  const animeOptions = {
    targets,
    easing: 'easeOutExpo',
    opacity: [0, 1],
  };

  if (direction === 'top-to-bottom') {
    animeOptions['translateY'] = [-150, 0];
  }

  if (direction === 'bottom-to-top') {
    animeOptions['translateY'] = [150, 0];
  }

  if (direction === 'left-to-right') {
    animeOptions['translateX'] = ['-200px', 0];
  }

  if (direction === 'right-to-left') {
    animeOptions['translateX'] = ['200px', 0];
  }

  if (targets.length > 1) {
    animeOptions['delay'] = (el, i, l) => {
      return i * 150;
    };
  }

  const toggleVisibility = () => {
    targets.forEach(targetEl => targetEl.classList.toggle('visibility-hidden'));
  };

  const observerConfig = {
      root: null,
      rootMargin: "0px 0px -175px 0px",
      threshold: [0]
  };

  const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            toggleVisibility();
            anime(animeOptions);
          }
      });
  }, observerConfig);

  toggleVisibility();
  observer.observe(animeTriggerEl);
}

/**
 * This event listener will fire when
 * all the images and sub-frames have
 * finished loading.
 */

const init = () => {
  MySideMenu.init();
  scrollIntoView();

  document.querySelectorAll('.c-vertical-slider').forEach(
    node => {
      const configDataset = node.dataset.sliderConfig;
      let config;
      try {
        config = JSON.parse(configDataset);
      } catch (error) {
        config = undefined;
      }
      new VerticalSlider(node, config);
    }
  );

  document.querySelectorAll('[data-dropdown-trigger]').forEach(
    node => new Dropdown(node)
  );

  document.querySelectorAll('input[data-switcher]').forEach(node => {
    const switcher = new Switcher(node);
    node.addEventListener('change', () => {
      switcher.toggle();
    })
  });

  document.querySelectorAll('.c-accordion-btn[aria-expanded]').forEach(
    node => node.addEventListener('click', (ev) => {
      ev.preventDefault();
      // ! TODO from 'Vanda': add title from header to GTM datalayer
      Accordion.getOrCreateInstance(node.parentElement.parentElement).toggle();
    })
  );

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  const animeTriggerList = document.querySelectorAll('[data-anime-target]');
  const animeList = [...animeTriggerList].map(animeTriggerEl => animateElemenet(animeTriggerEl));

  const cookiePreferencesTriggerList = document.querySelectorAll('[data-cookie-preferences]');
  cookiePreferencesTriggerList.forEach(
    el => el.addEventListener('click', (ev) => {
      ev.preventDefault();
      cookieconsent.openPreferencesCenter();
    })
  );
};

init();
