/**
 * Swiper 4.5.0 
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 22, 2019
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Swiper = factory());
}(this, function () { 'use strict';

  /**
   * SSR Window 1.0.1
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 18, 2018
   */
  var doc = (typeof document === 'undefined') ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {},
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  } : document; // eslint-disable-line

  var win = (typeof window === 'undefined') ? {
    document: doc,
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  } : window; // eslint-disable-line

  /**
   * Dom7 2.1.3
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * http://framework7.io/docs/dom.html
   *
   * Copyright 2019, Vladimir Kharlampidi
   * The iDangero.us
   * http://www.idangero.us/
   *
   * Licensed under MIT
   *
   * Released on: February 11, 2019
   */

  var Dom7 = function Dom7(arr) {
    var self = this;
    // Create array-like object
    for (var i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }
    self.length = arr.length;
    // Return collection with methods
    return this;
  };

  function $(selector, context) {
    var arr = [];
    var i = 0;
    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }
    if (selector) {
        // String
      if (typeof selector === 'string') {
        var els;
        var tempParent;
        var html = selector.trim();
        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          var toCreate = 'div';
          if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
          if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
          if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
          if (html.indexOf('<option') === 0) { toCreate = 'select'; }
          tempParent = doc.createElement(toCreate);
          tempParent.innerHTML = html;
          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [doc.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || doc).querySelectorAll(selector.trim());
          }
          for (i = 0; i < els.length; i += 1) {
            if (els[i]) { arr.push(els[i]); }
          }
        }
      } else if (selector.nodeType || selector === win || selector === doc) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }
    return new Dom7(arr);
  }

  $.fn = Dom7.prototype;
  $.Class = Dom7;
  $.Dom7 = Dom7;

  function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  }

  // Classes and attributes
  function addClass(className) {
    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.add(classes[i]); }
      }
    }
    return this;
  }
  function removeClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.remove(classes[i]); }
      }
    }
    return this;
  }
  function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  }
  function toggleClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  }
  function attr(attrs, value) {
    var arguments$1 = arguments;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  // eslint-disable-next-line
  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this;
  }
  function data(key, value) {
    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  }
  // Transforms
  // eslint-disable-next-line
  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }
    return this;
  }
  function transition(duration) {
    if (typeof duration !== 'string') {
      duration = duration + "ms"; // eslint-disable-line
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  }
  // Events
  function on() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) { return; }
      var eventData = e.target.dom7EventData || [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $(target).parents(); // eslint-disable-line
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];
          if (!el.dom7Listeners) { el.dom7Listeners = {}; }
          if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var event$1 = events[j];
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
          if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
          el.dom7LiveListeners[event$1].push({
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(event$1, handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  function off() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var handlers = (void 0);
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }
        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this;
  }
  function trigger() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var evt = (void 0);
        try {
          evt = new win.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          });
        } catch (e) {
          evt = doc.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        }
        // eslint-disable-next-line
        el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
    return this;
  }
  function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  }
  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = doc.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === win ? win.scrollY : el.scrollTop;
      var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  }
  function styles() {
    if (this[0]) { return win.getComputedStyle(this[0], null); }
    return {};
  }
  function css(props, value) {
    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (var prop in props) {
            this[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this;
    }
    return this;
  }
  // Iterate over the collection passing elements to `callback`
  function each(callback) {
    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  }
  // eslint-disable-next-line
  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this;
  }
  // eslint-disable-next-line
  function text(text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this;
  }
  function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === doc) { return el === doc; }
    else if (selector === win) { return el === win; }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  }
  function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      // eslint-disable-next-line
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
    return undefined;
  }
  // eslint-disable-next-line
  function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7([]); }
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  }
  function append() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }
  function prepend(newChild) {
    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }
    return this;
  }
  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7(nextEls);
  }
  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }
        return new Dom7([]);
      }

      if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7(prevEls);
  }
  function parent(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) { parents.push(this[i].parentNode); }
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(unique(parents));
  }
  function parents(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var parent = this[i].parentNode; // eslint-disable-line
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(unique(parents));
  }
  function closest(selector) {
    var closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  }
  function find(selector) {
    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  }
  function children(selector) {
    var children = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return new Dom7(unique(children));
  }
  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) { this[i].parentNode.removeChild(this[i]); }
    }
    return this;
  }
  function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    data: data,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    remove: remove,
    add: add,
    styles: styles,
  };

  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = Methods[methodName];
  });

  var Utils = {
    deleteProps: function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {
          // no getter for object
        }
        try {
          delete object[key];
        } catch (e) {
          // something got wrong
        }
      });
    },
    nextTick: function nextTick(callback, delay) {
      if ( delay === void 0 ) delay = 0;

      return setTimeout(callback, delay);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(el, axis) {
      if ( axis === void 0 ) axis = 'x';

      var matrix;
      var curTransform;
      var transformMatrix;

      var curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
        }
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[4]); }
      }
      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[5]); }
      }
      return curTransform || 0;
    },
    parseUrlQuery: function parseUrlQuery(url) {
      var query = {};
      var urlToParse = url || win.location.href;
      var i;
      var params;
      var param;
      var length;
      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }
      return query;
    },
    isObject: function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var args = [], len$1 = arguments.length;
      while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

      var to = Object(args[0]);
      for (var i = 1; i < args.length; i += 1) {
        var nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    },
  };

  var Support = (function Support() {
    var testDiv = doc.createElement('div');
    return {
      touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
        return !!((win.navigator.maxTouchPoints > 0) || ('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
      }()),

      pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent || ('maxTouchPoints' in win.navigator && win.navigator.maxTouchPoints > 0)),
      prefixedPointerEvents: !!win.navigator.msPointerEnabled,

      transition: (function checkTransition() {
        var style = testDiv.style;
        return ('transition' in style || 'webkitTransition' in style || 'MozTransition' in style);
      }()),
      transforms3d: (win.Modernizr && win.Modernizr.csstransforms3d === true) || (function checkTransforms3d() {
        var style = testDiv.style;
        return ('webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style);
      }()),

      flexbox: (function checkFlexbox() {
        var style = testDiv.style;
        var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
        for (var i = 0; i < styles.length; i += 1) {
          if (styles[i] in style) { return true; }
        }
        return false;
      }()),

      observer: (function checkObserver() {
        return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
      }()),

      passiveListener: (function checkPassiveListener() {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            },
          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {
          // No support
        }
        return supportsPassive;
      }()),

      gestures: (function checkGestures() {
        return 'ongesturestart' in win;
      }()),
    };
  }());

  var Browser = (function Browser() {
    function isSafari() {
      var ua = win.navigator.userAgent.toLowerCase();
      return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
    }
    return {
      isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
      isEdge: !!win.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
    };
  }());

  var SwiperClass = function SwiperClass(params) {
    if ( params === void 0 ) params = {};

    var self = this;
    self.params = params;

    // Events
    self.eventsListeners = {};

    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach(function (eventName) {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  };

  var staticAccessors = { components: { configurable: true } };

  SwiperClass.prototype.on = function on (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
      self.eventsListeners[event][method](handler);
    });
    return self;
  };

  SwiperClass.prototype.once = function once (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    function onceHandler() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      handler.apply(self, args);
      self.off(events, onceHandler);
      if (onceHandler.f7proxy) {
        delete onceHandler.f7proxy;
      }
    }
    onceHandler.f7proxy = handler;
    return self.on(events, onceHandler, priority);
  };

  SwiperClass.prototype.off = function off (events, handler) {
    var self = this;
    if (!self.eventsListeners) { return self; }
    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || (eventHandler.f7proxy && eventHandler.f7proxy === handler)) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.emit = function emit () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    var self = this;
    if (!self.eventsListeners) { return self; }
    var events;
    var data;
    var context;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsListeners && self.eventsListeners[event]) {
        var handlers = [];
        self.eventsListeners[event].forEach(function (eventHandler) {
          handlers.push(eventHandler);
        });
        handlers.forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      // Extend params
      if (module.params) {
        Utils.extend(instanceParams, module.params);
      }
    });
  };

  SwiperClass.prototype.useModules = function useModules (modulesParams) {
      if ( modulesParams === void 0 ) modulesParams = {};

    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      var moduleParams = modulesParams[moduleName] || {};
      // Extend instance methods and props
      if (module.instance) {
        Object.keys(module.instance).forEach(function (modulePropName) {
          var moduleProp = module.instance[modulePropName];
          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      }
      // Add event listeners
      if (module.on && instance.on) {
        Object.keys(module.on).forEach(function (moduleEventName) {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      }

      // Module create callback
      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  };

  staticAccessors.components.set = function (components) {
    var Class = this;
    if (!Class.use) { return; }
    Class.use(components);
  };

  SwiperClass.installModule = function installModule (module) {
      var params = [], len = arguments.length - 1;
      while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (!Class.prototype.modules) { Class.prototype.modules = {}; }
    var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
    Class.prototype.modules[name] = module;
    // Prototype
    if (module.proto) {
      Object.keys(module.proto).forEach(function (key) {
        Class.prototype[key] = module.proto[key];
      });
    }
    // Class
    if (module.static) {
      Object.keys(module.static).forEach(function (key) {
        Class[key] = module.static[key];
      });
    }
    // Callback
    if (module.install) {
      module.install.apply(Class, params);
    }
    return Class;
  };

  SwiperClass.use = function use (module) {
      var params = [], len = arguments.length - 1;
      while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (Array.isArray(module)) {
      module.forEach(function (m) { return Class.installModule(m); });
      return Class;
    }
    return Class.installModule.apply(Class, [ module ].concat( params ));
  };

  Object.defineProperties( SwiperClass, staticAccessors );

  function updateSize () {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;
    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }
    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }
    if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
      return;
    }

    // Subtract paddings
    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

    Utils.extend(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height,
    });
  }

  function updateSlides () {
    var swiper = this;
    var params = swiper.params;

    var $wrapperEl = swiper.$wrapperEl;
    var swiperSize = swiper.size;
    var rtl = swiper.rtlTranslate;
    var wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    var offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;

    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;
    if (typeof swiperSize === 'undefined') {
      return;
    }
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
    }

    swiper.virtualSize = -spaceBetween;

    // reset margins
    if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
    else { slides.css({ marginRight: '', marginBottom: '' }); }

    var slidesNumberEvenToRows;
    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }
      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    }

    // Calc slides
    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);
    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);
      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = (void 0);
        var column = (void 0);
        var row = (void 0);
        if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - (column * slidesPerColumn);
          if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
            row += 1;
            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
          newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
          slide
            .css({
              '-webkit-box-ordinal-group': newSlideOrderIndex,
              '-moz-box-ordinal-group': newSlideOrderIndex,
              '-ms-flex-order': newSlideOrderIndex,
              '-webkit-order': newSlideOrderIndex,
              order: newSlideOrderIndex,
            });
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - (row * slidesPerRow);
        }
        slide
          .css(
            ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
            (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
          )
          .attr('data-swiper-column', column)
          .attr('data-swiper-row', row);
      }
      if (slide.css('display') === 'none') { continue; } // eslint-disable-line

      if (params.slidesPerView === 'auto') {
        var slideStyles = win.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;
        var currentWebKitTransform = slide[0].style.webkitTransform;
        if (currentTransform) {
          slide[0].style.transform = 'none';
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = 'none';
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal()
            ? slide.outerWidth(true)
            : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            var width = parseFloat(slideStyles.getPropertyValue('width'));
            var paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left'));
            var paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right'));
            var marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left'));
            var marginRight = parseFloat(slideStyles.getPropertyValue('margin-right'));
            var boxSizing = slideStyles.getPropertyValue('box-sizing');
            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
            }
          } else {
            var height = parseFloat(slideStyles.getPropertyValue('height'));
            var paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top'));
            var paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom'));
            var marginTop = parseFloat(slideStyles.getPropertyValue('margin-top'));
            var marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom'));
            var boxSizing$1 = slideStyles.getPropertyValue('box-sizing');
            if (boxSizing$1 && boxSizing$1 === 'border-box') {
              slideSize = height + marginTop + marginBottom;
            } else {
              slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
            }
          }
        }
        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }
      } else {
        slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);


      if (params.centeredSlides) {
        slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;

      prevSlideSize = slideSize;

      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (
      rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
    }
    if (!Support.flexbox || params.setWrapperSize) {
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      if (params.centeredSlides) {
        newSlidesGrid = [];
        for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
          var slidesGridItem = snapGrid[i$1];
          if (params.roundLengths) { slidesGridItem = Math.floor(slidesGridItem); }
          if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(slidesGridItem); }
        }
        snapGrid = newSlidesGrid;
      }
    }

    // Remove last grid elements depending on width
    if (!params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
        var slidesGridItem$1 = snapGrid[i$2];
        if (params.roundLengths) { slidesGridItem$1 = Math.floor(slidesGridItem$1); }
        if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem$1);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (snapGrid.length === 0) { snapGrid = [0]; }

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) { slides.css({ marginLeft: (spaceBetween + "px") }); }
        else { slides.css({ marginRight: (spaceBetween + "px") }); }
      } else { slides.css({ marginBottom: (spaceBetween + "px") }); }
    }

    if (params.centerInsufficientSlides) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      if (allSlidesSize < swiperSize) {
        var allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Utils.extend(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid,
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
      swiper.emit('snapGridLengthChange');
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight (speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;
    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    // Find slides currently in view
    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        var index = swiper.activeIndex + i;
        if (index > swiper.slides.length) { break; }
        activeSlides.push(swiper.slides.eq(index)[0]);
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    }

    // Find new height from highest slide in view
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }

    // Update Height
    if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
  }

  function updateSlidesOffset () {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress (translate) {
    if ( translate === void 0 ) translate = (this && this.translate) || 0;

    var swiper = this;
    var params = swiper.params;

    var slides = swiper.slides;
    var rtl = swiper.rtlTranslate;

    if (slides.length === 0) { return; }
    if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

    var offsetCenter = -translate;
    if (rtl) { offsetCenter = translate; }

    // Visible Slides
    slides.removeClass(params.slideVisibleClass);

    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress = (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
      if (params.watchSlidesVisibility) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = (slideBefore >= 0 && slideBefore < swiper.size)
                  || (slideAfter > 0 && slideAfter <= swiper.size)
                  || (slideBefore <= 0 && slideAfter >= swiper.size);
        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }
      slide.progress = rtl ? -slideProgress : slideProgress;
    }
    swiper.visibleSlides = $(swiper.visibleSlides);
  }

  function updateProgress (translate) {
    if ( translate === void 0 ) translate = (this && this.translate) || 0;

    var swiper = this;
    var params = swiper.params;

    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress;
    var isBeginning = swiper.isBeginning;
    var isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / (translatesDiff);
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }
    Utils.extend(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd,
    });

    if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }
    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }
    if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses () {
    var swiper = this;

    var slides = swiper.slides;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;
    var realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;

    slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

    var activeSlide;
    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
    } else {
      activeSlide = slides.eq(activeIndex);
    }

    // Active classes
    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      }
    }
    // Next Slide
    var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    }
    // Prev Slide
    var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }
    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass)
          .removeClass(params.lazyBackground);
      }
      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass)
          .removeClass(params.lazyBackground);
      }
    }
  }

  function updateActiveIndex (newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var params = swiper.params;
    var previousIndex = swiper.activeIndex;
    var previousRealIndex = swiper.realIndex;
    var previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;
    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      }
      // Normalize slideIndex
      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
      }
    }
    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }
      return;
    }

    // Get real index
    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

    Utils.extend(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex,
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    swiper.emit('slideChange');
  }

  function updateClickedSlide (e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest(("." + (params.slideClass)))[0];
    var slideFound = false;
    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) { slideFound = true; }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide,
  };

  function getTranslate (axis) {
    if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

    var swiper = this;

    var params = swiper.params;
    var rtl = swiper.rtlTranslate;
    var translate = swiper.translate;
    var $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
    if (rtl) { currentTranslate = -currentTranslate; }

    return currentTranslate || 0;
  }

  function setTranslate (translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (!params.virtualTranslate) {
      if (Support.transforms3d) { $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)")); }
      else { $wrapperEl.transform(("translate(" + x + "px, " + y + "px)")); }
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;

    // Check if we need to update progress
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate () {
    return (-this.snapGrid[0]);
  }

  function maxTranslate () {
    return (-this.snapGrid[this.snapGrid.length - 1]);
  }

  var translate = {
    getTranslate: getTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
  };

  function setTransition (duration, byController) {
    var swiper = this;

    swiper.$wrapperEl.transition(duration);

    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var params = swiper.params;
    var previousIndex = swiper.previousIndex;
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }
      swiper.emit('slideChangeTransitionStart');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1 (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var previousIndex = swiper.previousIndex;
    swiper.animating = false;
    swiper.setTransition(0);

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }
      swiper.emit('slideChangeTransitionEnd');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1,
  };

  function slideTo (index, speed, runCallbacks, internal) {
    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var slideIndex = index;
    if (slideIndex < 0) { slideIndex = 0; }

    var params = swiper.params;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var previousIndex = swiper.previousIndex;
    var activeIndex = swiper.activeIndex;
    var rtl = swiper.rtlTranslate;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex];

    // Update progress
    swiper.updateProgress(translate);

    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    }
    // Directions locks
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) { return false; }
      }
    }

    var direction;
    if (slideIndex > activeIndex) { direction = 'next'; }
    else if (slideIndex < activeIndex) { direction = 'prev'; }
    else { direction = 'reset'; }


    // Update Index
    if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      // Update Height
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }
      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }

    if (speed === 0 || !Support.transition) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop (index, speed, runCallbacks, internal) {
    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var newIndex = index;
    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideNext (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slidePrev (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }
    var translate = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0) { return -Math.floor(Math.abs(val)); }
      return Math.floor(val);
    }
    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) { return normalize(val); });
    var normalizedSlidesGrid = slidesGrid.map(function (val) { return normalize(val); });

    var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    var prevIndex;
    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideReset (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideToClosest (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var index = swiper.activeIndex;
    var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

    if (snapIndex < swiper.snapGrid.length - 1) {
      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if ((translate - currentSnap) > (nextSnap - currentSnap) / 2) {
        index = swiper.params.slidesPerGroup;
      }
    }

    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;

    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;
    if (params.loop) {
      if (swiper.animating) { return; }
      realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      if (params.centeredSlides) {
        if (
          (slideToIndex < swiper.loopedSlides - (slidesPerView / 2))
          || (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
        ) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
            .eq(0)
            .index();

          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide,
  };

  function loopCreate () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    // Remove duplicated slides
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

    var slides = $wrapperEl.children(("." + (params.slideClass)));

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
          $wrapperEl.append(blankNode);
        }
        slides = $wrapperEl.children(("." + (params.slideClass)));
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

    swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
    swiper.loopedSlides += params.loopAdditionalSlides;
    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (index, el) {
      var slide = $(el);
      if (index < swiper.loopedSlides) { appendSlides.push(el); }
      if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
      slide.attr('data-swiper-slide-index', index);
    });
    for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
      $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
      $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix () {
    var swiper = this;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var slides = swiper.slides;
    var loopedSlides = swiper.loopedSlides;
    var allowSlidePrev = swiper.allowSlidePrev;
    var allowSlideNext = swiper.allowSlideNext;
    var snapGrid = swiper.snapGrid;
    var rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;

    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate();


    // Fix For Negative Oversliding
    if (activeIndex < loopedSlides) {
      newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex >= slides.length - loopedSlides)) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged$1 && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
  }

  function loopDestroy () {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var slides = swiper.slides;
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + ",." + (params.slideClass) + "." + (params.slideBlankClass))).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy,
  };

  function setGrabCursor (moving) {
    var swiper = this;
    if (Support.touch || !swiper.params.simulateTouch || (swiper.params.watchOverflow && swiper.isLocked)) { return; }
    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor () {
    var swiper = this;
    if (Support.touch || (swiper.params.watchOverflow && swiper.isLocked)) { return; }
    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor,
  };

  function appendSlide (slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.append(slides[i]); }
      }
    } else {
      $wrapperEl.append(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  }

  function prependSlide (slides) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }
    var newActiveIndex = activeIndex + 1;
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.prepend(slides[i]); }
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide (index, slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var baseLength = swiper.slides.length;
    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }
    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }
    var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

    var slidesBuffer = [];
    for (var i = baseLength - 1; i >= index; i -= 1) {
      var currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (slides[i$1]) { $wrapperEl.append(slides[i$1]); }
      }
      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
      $wrapperEl.append(slidesBuffer[i$2]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide (slidesIndexes) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var newActiveIndex = activeIndexBuffer;
    var indexToRemove;

    if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
        if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides () {
    var swiper = this;

    var slidesIndexes = [];
    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    addSlide: addSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
  };

  var Device = (function Device() {
    var ua = win.navigator.userAgent;

    var device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      windows: false,
      iphone: false,
      ipod: false,
      ipad: false,
      cordova: win.cordova || win.phonegap,
      phonegap: win.cordova || win.phonegap,
    };

    var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


    // Windows
    if (windows) {
      device.os = 'windows';
      device.osVersion = windows[2];
      device.windows = true;
    }
    // Android
    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }
    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }
    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    }

    // Desktop
    device.desktop = !(device.os || device.android || device.webView);

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (device.os && device.os === 'ios') {
      var osVersionArr = device.osVersion.split('.');
      var metaViewport = doc.querySelector('meta[name="viewport"]');
      device.minimalUi = !device.webView
        && (ipod || iphone)
        && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7)
        && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
    }

    // Pixel Ratio
    device.pixelRatio = win.devicePixelRatio || 1;

    // Export object
    return device;
  }());

  function onTouchStart (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    data.isTouchEvent = e.type === 'touchstart';
    if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
    if (!data.isTouchEvent && 'button' in e && e.button > 0) { return; }
    if (data.isTouched && data.isMoved) { return; }
    if (params.noSwiping && $(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!$(e).closest(params.swipeHandler)[0]) { return; }
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY;

    // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
    if (
      edgeSwipeDetection
      && ((startX <= edgeSwipeThreshold)
      || (startX >= win.screen.width - edgeSwipeThreshold))
    ) {
      return;
    }

    Utils.extend(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined,
    });

    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) { data.allowThresholdMove = false; }
    if (e.type !== 'touchstart') {
      var preventDefault = true;
      if ($(e.target).is(data.formElements)) { preventDefault = false; }
      if (
        doc.activeElement
        && $(doc.activeElement).is(data.formElements)
        && doc.activeElement !== e.target
      ) {
        doc.activeElement.blur();
      }

      var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
      if (params.touchStartForcePreventDefault || shouldPreventDefault) {
        e.preventDefault();
      }
    }
    swiper.emit('touchStart', e);
  }

  function onTouchMove (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }
      return;
    }
    if (data.isTouchEvent && e.type === 'mousemove') { return; }
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;
      if (data.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY,
        });
        data.touchStartTime = Utils.now();
      }
      return;
    }
    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (
          (pageY < touches.startY && swiper.translate <= swiper.maxTranslate())
          || (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
        ) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (
        (pageX < touches.startX && swiper.translate <= swiper.maxTranslate())
        || (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
      ) {
        return;
      }
    }
    if (data.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }
    if (e.targetTouches && e.targetTouches.length > 1) { return; }

    touches.currentX = pageX;
    touches.currentY = pageY;

    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt((Math.pow( diffX, 2 )) + (Math.pow( diffY, 2 ))) < swiper.params.threshold) { return; }

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;
      if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if ((diffX * diffX) + (diffY * diffY) >= 25) {
          touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    e.preventDefault();
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }
      data.allowMomentumBounce = false;
      // Grab Cursor
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit('sliderFirstMove', e);
    }
    swiper.emit('sliderMove', e);
    data.isMoved = true;

    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;

    diff *= params.touchRatio;
    if (rtl) { diff = -diff; }

    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;

    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }

    // Directions locks
    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }


    // Threshold
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger) { return; }

    // Update active index in free mode
    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime,
        });
      }
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now(),
      });
    }
    // Update progress
    swiper.updateProgress(data.currentTranslate);
    // Update translate
    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd (event) {
    var swiper = this;
    var data = swiper.touchEventsData;

    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    // Return Grab Cursor
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }

    // Time diff
    var touchEndTime = Utils.now();
    var timeDiff = touchEndTime - data.touchStartTime;

    // Tap, doubleTap, Click
    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap', e);
      if (timeDiff < 300 && (touchEndTime - data.lastClickTime) > 300) {
        if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
        data.clickTimeout = Utils.nextTick(function () {
          if (!swiper || swiper.destroyed) { return; }
          swiper.emit('click', e);
        }, 300);
      }
      if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
        if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
        swiper.emit('doubleTap', e);
      }
    }

    data.lastClickTime = Utils.now();
    Utils.nextTick(function () {
      if (!swiper.destroyed) { swiper.allowClick = true; }
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;

    var currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }
        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();

          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;
          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          }
          // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.
          if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }
        swiper.velocity *= params.freeModeMomentumVelocityRatio;

        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;

        var newPosition = swiper.translate + momentumDistance;
        if (rtl) { newPosition = -newPosition; }

        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;
        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }
            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }
            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (params.freeModeSticky) {
          var nextSlide;
          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }
          newPosition = -newPosition;
        }
        if (needsLoopFix) {
          swiper.once('transitionEnd', function () {
            swiper.loopFix();
          });
        }
        // Fix duration
        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
            swiper.emit('momentumBounce');

            swiper.setTransition(params.speed);
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      return;
    }

    // Find current slide
    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];
    for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
      if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
          stopIndex = i;
          groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }

    // Find current slide size
    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
        else { swiper.slideTo(stopIndex); }
      }
      if (swiper.swipeDirection === 'prev') {
        if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
        else { swiper.slideTo(stopIndex); }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + params.slidesPerGroup);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize () {
    var swiper = this;

    var params = swiper.params;
    var el = swiper.el;

    if (el && el.offsetWidth === 0) { return; }

    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Save locks
    var allowSlideNext = swiper.allowSlideNext;
    var allowSlidePrev = swiper.allowSlidePrev;
    var snapGrid = swiper.snapGrid;

    // Disable locks on resize
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;

    swiper.updateSize();
    swiper.updateSlides();

    if (params.freeMode) {
      var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      swiper.updateSlidesClasses();
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    // Return locks after resize
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick (e) {
    var swiper = this;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) { e.preventDefault(); }
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function attachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    {
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);

    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested;

    // Touch Events
    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
          target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          target.addEventListener('mousedown', swiper.onTouchStart, false);
          doc.addEventListener('mousemove', swiper.onTouchMove, capture);
          doc.addEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        target.addEventListener('click', swiper.onClick, true);
      }
    }

    // Resize handler
    swiper.on((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize, true);
  }

  function detachEvents() {
    var swiper = this;

    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested;

    // Touch Events
    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
          target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          target.removeEventListener('mousedown', swiper.onTouchStart, false);
          doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
          doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        target.removeEventListener('click', swiper.onClick, true);
      }
    }

    // Resize handler
    swiper.off((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents,
  };

  function setBreakpoint () {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var initialized = swiper.initialized;
    var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
    var params = swiper.params;
    var breakpoints = params.breakpoints;
    if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }

    // Set breakpoint for window width and update parameters
    var breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
      if (breakpointOnlyParams) {
        ['slidesPerView', 'spaceBetween', 'slidesPerGroup'].forEach(function (param) {
          var paramValue = breakpointOnlyParams[param];
          if (typeof paramValue === 'undefined') { return; }
          if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
            breakpointOnlyParams[param] = 'auto';
          } else if (param === 'slidesPerView') {
            breakpointOnlyParams[param] = parseFloat(paramValue);
          } else {
            breakpointOnlyParams[param] = parseInt(paramValue, 10);
          }
        });
      }

      var breakpointParams = breakpointOnlyParams || swiper.originalParams;
      var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      Utils.extend(swiper.params, breakpointParams);

      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
      });

      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }
  }

  function getBreakpoint (breakpoints) {
    var swiper = this;
    // Get breakpoint for window width
    if (!breakpoints) { return undefined; }
    var breakpoint = false;
    var points = [];
    Object.keys(breakpoints).forEach(function (point) {
      points.push(point);
    });
    points.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
    for (var i = 0; i < points.length; i += 1) {
      var point = points[i];
      if (swiper.params.breakpointsInverse) {
        if (point <= win.innerWidth) {
          breakpoint = point;
        }
      } else if (point >= win.innerWidth && !breakpoint) {
        breakpoint = point;
      }
    }
    return breakpoint || 'max';
  }

  var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

  function addClasses () {
    var swiper = this;
    var classNames = swiper.classNames;
    var params = swiper.params;
    var rtl = swiper.rtl;
    var $el = swiper.$el;
    var suffixes = [];

    suffixes.push('initialized');
    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }
    if (!Support.flexbox) {
      suffixes.push('no-flexbox');
    }
    if (params.autoHeight) {
      suffixes.push('autoheight');
    }
    if (rtl) {
      suffixes.push('rtl');
    }
    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');
    }
    if (Device.android) {
      suffixes.push('android');
    }
    if (Device.ios) {
      suffixes.push('ios');
    }
    // WP8 Touch Events Fix
    if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      suffixes.push(("wp8-" + (params.direction)));
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });

    $el.addClass(classNames.join(' '));
  }

  function removeClasses () {
    var swiper = this;
    var $el = swiper.$el;
    var classNames = swiper.classNames;

    $el.removeClass(classNames.join(' '));
  }

  var classes = { addClasses: addClasses, removeClasses: removeClasses };

  function loadImage (imageEl, src, srcset, sizes, checkForComplete, callback) {
    var image;
    function onReady() {
      if (callback) { callback(); }
    }
    if (!imageEl.complete || !checkForComplete) {
      if (src) {
        image = new win.Image();
        image.onload = onReady;
        image.onerror = onReady;
        if (sizes) {
          image.sizes = sizes;
        }
        if (srcset) {
          image.srcset = srcset;
        }
        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages () {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');
    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
      if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) { swiper.update(); }
        swiper.emit('imagesReady');
      }
    }
    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(
        imageEl,
        imageEl.currentSrc || imageEl.getAttribute('src'),
        imageEl.srcset || imageEl.getAttribute('srcset'),
        imageEl.sizes || imageEl.getAttribute('sizes'),
        true,
        onReady
      );
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages,
  };

  function checkOverflow() {
    var swiper = this;
    var wasLocked = swiper.isLocked;

    swiper.isLocked = swiper.snapGrid.length === 1;
    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked;

    // events
    if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      swiper.navigation.update();
    }
  }

  var checkOverflow$1 = { checkOverflow: checkOverflow };

  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    //
    preventInteractionOnTransition: false,

    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,

    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,

    // Autoheight
    autoHeight: false,

    // Set wrapper width
    setWrapperSize: false,

    // Virtual Translate
    virtualTranslate: false,

    // Effects
    effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

    // Breakpoints
    breakpoints: undefined,
    breakpointsInverse: false,

    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0, // in px
    slidesOffsetAfter: 0, // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,

    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,

    // Round length
    roundLengths: false,

    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: true,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,

    // Unique Navigation Elements
    uniqueNavElements: true,

    // Resistance
    resistance: true,
    resistanceRatio: 0.85,

    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,

    // Cursor
    grabCursor: false,

    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,

    // Images
    preloadImages: true,
    updateOnImagesReady: true,

    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,

    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null, // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,

    // Passive Listeners
    passiveListeners: true,

    // NS
    containerModifierClass: 'swiper-container-', // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',
    lazyBackground : 'lzy-background',

    // Callbacks
    runCallbacksOnInit: true,
  };

  /* eslint no-param-reassign: "off" */

  var prototypes = {
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images,
  };

  var extendedDefaults = {};

  var Swiper = /*@__PURE__*/(function (SwiperClass) {
    function Swiper() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var el;
      var params;
      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        (assign = args, el = assign[0], params = assign[1]);
      }
      if (!params) { params = {}; }

      params = Utils.extend({}, params);
      if (el && !params.el) { params.el = el; }

      SwiperClass.call(this, params);

      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      });

      // Swiper Instance
      var swiper = this;
      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }
      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];
        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];
          if (typeof moduleParams !== 'object' || moduleParams === null) { return; }
          if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
          if (params[moduleParamName] === true) {
            params[moduleParamName] = { enabled: true };
          }
          if (
            typeof params[moduleParamName] === 'object'
            && !('enabled' in params[moduleParamName])
          ) {
            params[moduleParamName].enabled = true;
          }
          if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
        }
      });

      // Extend defaults with modules params
      var swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams);

      // Extend defaults with passed params
      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params);

      // Save Dom lib
      swiper.$ = $;

      // Find el
      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (index, containerEl) {
          var newParams = Utils.extend({}, params, { el: containerEl });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper;
      $el.data('swiper', swiper);

      // Find Wrapper
      var $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));

      // Extend Swiper
      Utils.extend(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],

        // Classes
        classNames: [],

        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],

        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // RTL
        rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',

        // Indexes
        activeIndex: 0,
        realIndex: 0,

        //
        isBeginning: true,
        isEnd: false,

        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,

        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,

        // Touch Events
        touchEvents: (function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];
          if (Support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          } else if (Support.prefixedPointerEvents) {
            desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
          }
          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2],
          };
          return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }()),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined,
        },

        // Clicks
        allowClick: true,

        // Touches
        allowTouchMove: swiper.params.allowTouchMove,

        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },

        // Images
        imagesToLoad: [],
        imagesLoaded: 0,

      });

      // Install Modules
      swiper.useModules();

      // Init
      if (swiper.params.init) {
        swiper.init();
      }

      // Return app instance
      return swiper;
    }

    if ( SwiperClass ) Swiper.__proto__ = SwiperClass;
    Swiper.prototype = Object.create( SwiperClass && SwiperClass.prototype );
    Swiper.prototype.constructor = Swiper;

    var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };

    Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
      var swiper = this;
      var params = swiper.params;
      var slides = swiper.slides;
      var slidesGrid = swiper.slidesGrid;
      var swiperSize = swiper.size;
      var activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
        for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
          if (slides[i$1] && !breakLoop) {
            slideSize += slides[i$1].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
      } else {
        for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
          if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }
      return spv;
    };

    Swiper.prototype.update = function update () {
      var swiper = this;
      if (!swiper || swiper.destroyed) { return; }
      var snapGrid = swiper.snapGrid;
      var params = swiper.params;
      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      var translated;
      if (swiper.params.freeMode) {
        setTranslate();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit('update');
    };

    Swiper.prototype.changeDirection = function changeDirection (newDirection, needUpdate) {
      if ( needUpdate === void 0 ) needUpdate = true;

      var swiper = this;
      var currentDirection = swiper.params.direction;
      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      if ((newDirection === currentDirection) || (newDirection !== 'horizontal' && newDirection !== 'vertical')) {
        return swiper;
      }

      if (currentDirection === 'vertical') {
        swiper.$el
          .removeClass(((swiper.params.containerModifierClass) + "vertical wp8-vertical"))
          .addClass(("" + (swiper.params.containerModifierClass) + newDirection));

        if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
          swiper.$el.addClass(((swiper.params.containerModifierClass) + "wp8-" + newDirection));
        }
      }
      if (currentDirection === 'horizontal') {
        swiper.$el
          .removeClass(((swiper.params.containerModifierClass) + "horizontal wp8-horizontal"))
          .addClass(("" + (swiper.params.containerModifierClass) + newDirection));

        if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
          swiper.$el.addClass(((swiper.params.containerModifierClass) + "wp8-" + newDirection));
        }
      }

      swiper.params.direction = newDirection;

      swiper.slides.each(function (slideIndex, slideEl) {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });

      swiper.emit('changeDirection');
      if (needUpdate) { swiper.update(); }

      return swiper;
    };

    Swiper.prototype.init = function init () {
      var swiper = this;
      if (swiper.initialized) { return; }

      swiper.emit('beforeInit');

      // Set breakpoint
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Add Classes
      swiper.addClasses();

      // Create loop
      if (swiper.params.loop) {
        swiper.loopCreate();
      }

      // Update size
      swiper.updateSize();

      // Update slides
      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      // Set Grab Cursor
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      }

      // Slide To Initial Slide
      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      }

      // Attach events
      swiper.attachEvents();

      // Init Flag
      swiper.initialized = true;

      // Emit
      swiper.emit('init');
    };

    Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
      if ( deleteInstance === void 0 ) deleteInstance = true;
      if ( cleanStyles === void 0 ) cleanStyles = true;

      var swiper = this;
      var params = swiper.params;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy');

      // Init Flag
      swiper.initialized = false;

      // Detach events
      swiper.detachEvents();

      // Destroy loop
      if (params.loop) {
        swiper.loopDestroy();
      }

      // Cleanup styles
      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');
        if (slides && slides.length) {
          slides
            .removeClass([
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass ].join(' '))
            .removeAttr('style')
            .removeAttr('data-swiper-slide-index')
            .removeAttr('data-swiper-column')
            .removeAttr('data-swiper-row');
        }
      }

      swiper.emit('destroy');

      // Detach emitter events
      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }
      swiper.destroyed = true;

      return null;
    };

    Swiper.extendDefaults = function extendDefaults (newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    };

    staticAccessors.extendedDefaults.get = function () {
      return extendedDefaults;
    };

    staticAccessors.defaults.get = function () {
      return defaults;
    };

    staticAccessors.Class.get = function () {
      return SwiperClass;
    };

    staticAccessors.$.get = function () {
      return $;
    };

    Object.defineProperties( Swiper, staticAccessors );

    return Swiper;
  }(SwiperClass));

  var Device$1 = {
    name: 'device',
    proto: {
      device: Device,
    },
    static: {
      device: Device,
    },
  };

  var Support$1 = {
    name: 'support',
    proto: {
      support: Support,
    },
    static: {
      support: Support,
    },
  };

  var Browser$1 = {
    name: 'browser',
    proto: {
      browser: Browser,
    },
    static: {
      browser: Browser,
    },
  };

  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('orientationchange');
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        // Emit resize
        win.addEventListener('resize', swiper.resize.resizeHandler);

        // Emit orientationchange
        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        var swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
    },
  };

  var Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,
    attach: function attach(target, options) {
      if ( options === void 0 ) options = {};

      var swiper = this;

      var ObserverFunc = Observer.func;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit('observerUpdate', mutations[0]);
          return;
        }
        var observerUpdate = function observerUpdate() {
          swiper.emit('observerUpdate', mutations[0]);
        };

        if (win.requestAnimationFrame) {
          win.requestAnimationFrame(observerUpdate);
        } else {
          win.setTimeout(observerUpdate, 0);
        }
      });

      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
      });

      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;
      if (!Support.observer || !swiper.params.observer) { return; }
      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();
        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      }
      // Observe container
      swiper.observer.attach(swiper.$el[0], { childList: swiper.params.observeSlideChildren });

      // Observe wrapper
      swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    },
  };

  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false,
      observeSlideChildren: false,
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: [],
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.observer.init();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.destroy();
      },
    },
  };

  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var ref = swiper.params;
      var slidesPerView = ref.slidesPerView;
      var slidesPerGroup = ref.slidesPerGroup;
      var centeredSlides = ref.centeredSlides;
      var ref$1 = swiper.params.virtual;
      var addSlidesBefore = ref$1.addSlidesBefore;
      var addSlidesAfter = ref$1.addSlidesAfter;
      var ref$2 = swiper.virtual;
      var previousFrom = ref$2.from;
      var previousTo = ref$2.to;
      var slides = ref$2.slides;
      var previousSlidesGrid = ref$2.slidesGrid;
      var renderSlide = ref$2.renderSlide;
      var previousOffset = ref$2.offset;
      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;

      var offsetProp;
      if (swiper.rtlTranslate) { offsetProp = 'right'; }
      else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

      var slidesAfter;
      var slidesBefore;
      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
        slidesBefore = slidesPerGroup + addSlidesAfter;
      }
      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

      Utils.extend(swiper.virtual, {
        from: from,
        to: to,
        offset: offset,
        slidesGrid: swiper.slidesGrid,
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, (offset + "px"));
        }
        swiper.updateProgress();
        return;
      }
      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset,
          from: from,
          to: to,
          slides: (function getSlides() {
            var slidesToRender = [];
            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }
            return slidesToRender;
          }()),
        });
        onRendered();
        return;
      }
      var prependIndexes = [];
      var appendIndexes = [];
      if (force) {
        swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
          }
        }
      }
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (i$1 >= from && i$1 <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(i$1);
          } else {
            if (i$1 > previousTo) { appendIndexes.push(i$1); }
            if (i$1 < previousFrom) { prependIndexes.push(i$1); }
          }
        }
      }
      appendIndexes.forEach(function (index) {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort(function (a, b) { return b - a; }).forEach(function (index) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
      onRendered();
    },
    renderSlide: function renderSlide(slide, index) {
      var swiper = this;
      var params = swiper.params.virtual;
      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }
      var $slideEl = params.renderSlide
        ? $(params.renderSlide.call(swiper, slide, index))
        : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
      if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
      if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
      return $slideEl;
    },
    appendSlide: function appendSlide(slides) {
      var swiper = this;
      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { swiper.virtual.slides.push(slides[i]); }
        }
      } else {
        swiper.virtual.slides.push(slides);
      }
      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slides) {
      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var newActiveIndex = activeIndex + 1;
      var numberOfNewSlides = 1;

      if (Array.isArray(slides)) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { swiper.virtual.slides.unshift(slides[i]); }
        }
        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }
      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cache[cachedIndex];
        });
        swiper.virtual.cache = newCache;
      }
      swiper.virtual.update(true);
      swiper.slideTo(newActiveIndex, 0);
    },
    removeSlide: function removeSlide(slidesIndexes) {
      var swiper = this;
      if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) { return; }
      var activeIndex = swiper.activeIndex;
      if (Array.isArray(slidesIndexes)) {
        for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);
          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }
          if (slidesIndexes[i] < activeIndex) { activeIndex -= 1; }
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }
        if (slidesIndexes < activeIndex) { activeIndex -= 1; }
        activeIndex = Math.max(activeIndex, 0);
      }
      swiper.virtual.update(true);
      swiper.slideTo(activeIndex, 0);
    },
    removeAllSlides: function removeAllSlides() {
      var swiper = this;
      swiper.virtual.slides = [];
      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }
      swiper.virtual.update(true);
      swiper.slideTo(0, 0);
    },
  };

  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          removeSlide: Virtual.removeSlide.bind(swiper),
          removeAllSlides: Virtual.removeAllSlides.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {},
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
        var overwriteParams = {
          watchSlidesProgress: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);

        if (!swiper.params.initialSlide) {
          swiper.virtual.update();
        }
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.virtual.update();
      },
    },
  };

  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var kc = e.keyCode || e.charCode;
      // Directions locks
      if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40))) {
        return false;
      }
      if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38))) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }
      if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }
      if (swiper.params.keyboard.onlyInViewport && (kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
        var inView = false;
        // Check that swiper should be inside of visible area of window
        if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
          return undefined;
        }
        var windowWidth = win.innerWidth;
        var windowHeight = win.innerHeight;
        var swiperOffset = swiper.$el.offset();
        if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
        var swiperCoord = [
          [swiperOffset.left, swiperOffset.top],
          [swiperOffset.left + swiper.width, swiperOffset.top],
          [swiperOffset.left, swiperOffset.top + swiper.height],
          [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];
          if (
            point[0] >= 0 && point[0] <= windowWidth
            && point[1] >= 0 && point[1] <= windowHeight
          ) {
            inView = true;
          }
        }
        if (!inView) { return undefined; }
      }
      if (swiper.isHorizontal()) {
        if (kc === 37 || kc === 39) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if ((kc === 39 && !rtl) || (kc === 37 && rtl)) { swiper.slideNext(); }
        if ((kc === 37 && !rtl) || (kc === 39 && rtl)) { swiper.slidePrev(); }
      } else {
        if (kc === 38 || kc === 40) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if (kc === 40) { swiper.slideNext(); }
        if (kc === 38) { swiper.slidePrev(); }
      }
      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;
      if (swiper.keyboard.enabled) { return; }
      $(doc).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;
      if (!swiper.keyboard.enabled) { return; }
      $(doc).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    },
  };

  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false,
        onlyInViewport: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        keyboard: {
          enabled: false,
          enable: Keyboard.enable.bind(swiper),
          disable: Keyboard.disable.bind(swiper),
          handle: Keyboard.handle.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      },
    },
  };

  function isEventSupported() {
    var eventName = 'onwheel';
    var isSupported = eventName in doc;

    if (!isSupported) {
      var element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported
      && doc.implementation
      && doc.implementation.hasFeature
      // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      && doc.implementation.hasFeature('', '') !== true
    ) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }
  var Mousewheel = {
    lastScrollTime: Utils.now(),
    event: (function getEvent() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
      return isEventSupported() ? 'wheel' : 'mousewheel';
    }()),
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;

      var sX = 0;
      var sY = 0; // spinX, spinY
      var pX = 0;
      var pY = 0; // pixelX, pixelY

      // Legacy
      if ('detail' in e) {
        sY = e.detail;
      }
      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }
      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }
      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      }

      // side scrolling on FF with DOMMouseScroll
      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }
      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) { // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else { // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      // Fall-back if spin cannot be determined
      if (pX && !sX) {
        sX = (pX < 1) ? -1 : 1;
      }
      if (pY && !sY) {
        sY = (pY < 1) ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY,
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      var swiper = this;
      swiper.mouseEntered = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      var swiper = this;
      swiper.mouseEntered = false;
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (!swiper.mouseEntered && !params.releaseOnEdges) { return true; }

      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var delta = 0;
      var rtlFactor = swiper.rtlTranslate ? -1 : 1;

      var data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
          else { return true; }
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
        else { return true; }
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) { return true; }

      if (params.invert) { delta = -delta; }

      if (!swiper.params.freeMode) {
        if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
              swiper.slideNext();
              swiper.emit('scroll', e);
            } else if (params.releaseOnEdges) { return true; }
          } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) { return true; }
        }
        swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
      } else {
        // Freemode or scrollContainer:
        if (swiper.params.loop) {
          swiper.loopFix();
        }
        var position = swiper.getTranslate() + (delta * params.sensitivity);
        var wasBeginning = swiper.isBeginning;
        var wasEnd = swiper.isEnd;

        if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
        if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
          swiper.updateSlidesClasses();
        }

        if (swiper.params.freeModeSticky) {
          clearTimeout(swiper.mousewheel.timeout);
          swiper.mousewheel.timeout = Utils.nextTick(function () {
            swiper.slideToClosest();
          }, 300);
        }
        // Emit event
        swiper.emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.autoplay.stop(); }
        // Return page scroll on edge positions
        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
      }

      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      return false;
    },
    enable: function enable() {
      var swiper = this;
      if (!Mousewheel.event) { return false; }
      if (swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;
      if (!Mousewheel.event) { return false; }
      if (!swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.off(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    },
  };

  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
          handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
          lastScrollTime: Utils.now(),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
      },
    },
  };

  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }
        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }
        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },
    onPrevClick: function onPrevClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop) { return; }
      swiper.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop) { return; }
      swiper.slideNext();
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) { return; }

      var $nextEl;
      var $prevEl;
      if (params.nextEl) {
        $nextEl = $(params.nextEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.nextEl === 'string'
          && $nextEl.length > 1
          && swiper.$el.find(params.nextEl).length === 1
        ) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }
      if (params.prevEl) {
        $prevEl = $(params.prevEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.prevEl === 'string'
          && $prevEl.length > 1
          && swiper.$el.find(params.prevEl).length === 1
        ) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', swiper.navigation.onNextClick);
      }
      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', swiper.navigation.onPrevClick);
      }

      Utils.extend(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if ($nextEl && $nextEl.length) {
        $nextEl.off('click', swiper.navigation.onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }
      if ($prevEl && $prevEl.length) {
        $prevEl.off('click', swiper.navigation.onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    },
  };

  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,

        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper),
          onNextClick: Navigation.onNextClick.bind(swiper),
          onPrevClick: Navigation.onPrevClick.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.navigation.destroy();
      },
      click: function click(e) {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;
        if (
          swiper.params.navigation.hideOnClick
          && !$(e.target).is($prevEl)
          && !$(e.target).is($nextEl)
        ) {
          var isHidden;
          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }
          if (isHidden === true) {
            swiper.emit('navigationShow', swiper);
          } else {
            swiper.emit('navigationHide', swiper);
          }
          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      },
    },
  };

  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      // Current/Total
      var current;
      var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
        if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
          current -= (slidesLength - (swiper.loopedSlides * 2));
        }
        if (current > total - 1) { current -= total; }
        if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      }
      // Types
      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;
        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
            if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }
          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
        if ($el.length > 1) {
          bullets.each(function (index, bullet) {
            var $bullet = $(bullet);
            var bulletIndex = $bullet.index();
            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(((params.bulletActiveClass) + "-main"));
              }
              if (bulletIndex === firstIndex) {
                $bullet
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev"))
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev-prev"));
              }
              if (bulletIndex === lastIndex) {
                $bullet
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next"))
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next-next"));
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          $bullet.addClass(params.bulletActiveClass);
          if (params.dynamicBullets) {
            var $firstDisplayedBullet = bullets.eq(firstIndex);
            var $lastDisplayedBullet = bullets.eq(lastIndex);
            for (var i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
            }
            $firstDisplayedBullet
              .prev()
              .addClass(((params.bulletActiveClass) + "-prev"))
              .prev()
              .addClass(((params.bulletActiveClass) + "-prev-prev"));
            $lastDisplayedBullet
              .next()
              .addClass(((params.bulletActiveClass) + "-next"))
              .next()
              .addClass(((params.bulletActiveClass) + "-next-next"));
          }
        }
        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
        }
      }
      if (params.type === 'fraction') {
        $el.find(("." + (params.currentClass))).text(params.formatFractionCurrent(current + 1));
        $el.find(("." + (params.totalClass))).text(params.formatFractionTotal(total));
      }
      if (params.type === 'progressbar') {
        var progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
      }
      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }
      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

      var $el = swiper.pagination.$el;
      var paginationHTML = '';
      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
          }
        }
        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
      }
      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"" + (params.currentClass) + "\"></span>"
          + ' / '
          + "<span class=\"" + (params.totalClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el) { return; }

      var $el = $(params.el);
      if ($el.length === 0) { return; }

      if (
        swiper.params.uniqueNavElements
        && typeof params.el === 'string'
        && $el.length > 1
        && swiper.$el.find(params.el).length === 1
      ) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
        swiper.pagination.dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
          e.preventDefault();
          var index = $(this).index() * swiper.params.slidesPerGroup;
          if (swiper.params.loop) { index += swiper.loopedSlides; }
          swiper.slideTo(index);
        });
      }

      Utils.extend(swiper.pagination, {
        $el: $el,
        el: $el[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var $el = swiper.pagination.$el;

      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
      if (params.clickable) {
        $el.off('click', ("." + (params.bulletClass)));
      }
    },
  };

  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: function (number) { return number; },
        formatFractionTotal: function (number) { return number; },
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-', // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable', // NEW
        lockClass: 'swiper-pagination-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper),
          dynamicBulletIndex: 0,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.pagination.destroy();
      },
      click: function click(e) {
        var swiper = this;
        if (
          swiper.params.pagination.el
          && swiper.params.pagination.hideOnClick
          && swiper.pagination.$el.length > 0
          && !$(e.target).hasClass(swiper.params.pagination.bulletClass)
        ) {
          var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);
          if (isHidden === true) {
            swiper.emit('paginationShow', swiper);
          } else {
            swiper.emit('paginationHide', swiper);
          }
          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      },
    },
  };

  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var progress = swiper.progress;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      var params = swiper.params.scrollbar;

      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        if (Support.transforms3d) {
          $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
        } else {
          $dragEl.transform(("translateX(" + newPos + "px)"));
        }
        $dragEl[0].style.width = newSize + "px";
      } else {
        if (Support.transforms3d) {
          $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
        } else {
          $dragEl.transform(("translateY(" + newPos + "px)"));
        }
        $dragEl[0].style.height = newSize + "px";
      }
      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;

      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize;
      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + "px";
      } else {
        $dragEl[0].style.height = dragSize + "px";
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }
      if (swiper.params.scrollbar.hide) {
        $el[0].style.opacity = 0;
      }
      Utils.extend(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize,
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var $el = scrollbar.$el;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;

      var pointerPosition;
      if (swiper.isHorizontal()) {
        pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
      } else {
        pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
      }
      var positionRatio;
      positionRatio = ((pointerPosition) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;
      swiper.scrollbar.isTouched = true;
      e.preventDefault();
      e.stopPropagation();

      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);

      clearTimeout(swiper.scrollbar.dragTimeout);

      $el.transition(0);
      if (params.hide) {
        $el.css('opacity', 1);
      }
      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;

      if (!swiper.scrollbar.isTouched) { return; }
      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;

      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $el = scrollbar.$el;

      if (!swiper.scrollbar.isTouched) { return; }
      swiper.scrollbar.isTouched = false;
      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }
      swiper.emit('scrollbarDragEnd', e);
      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var $swiperEl = swiper.$el;
      var params = swiper.params.scrollbar;

      var $el = $(params.el);
      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
      if ($dragEl.length === 0) {
        $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
        $el.append($dragEl);
      }

      Utils.extend(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0],
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    },
  };

  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      resize: function resize() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.destroy();
      },
    },
  };

  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;

      var $el = $(el);
      var rtlFactor = rtl ? -1 : 1;

      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if ((x).indexOf('%') >= 0) {
        x = (parseInt(x, 10) * progress * rtlFactor) + "%";
      } else {
        x = (x * progress * rtlFactor) + "px";
      }
      if ((y).indexOf('%') >= 0) {
        y = (parseInt(y, 10) * progress) + "%";
      } else {
        y = (y * progress) + "px";
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
        $el[0].style.opacity = currentOpacity;
      }
      if (typeof scale === 'undefined' || scale === null) {
        $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
      } else {
        var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
        $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      var progress = swiper.progress;
      var snapGrid = swiper.snapGrid;
      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, progress);
        });
      slides.each(function (slideIndex, slideEl) {
        var slideProgress = slideEl.progress;
        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
        }
        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
          .each(function (index, el) {
            swiper.parallax.setTransform(el, slideProgress);
          });
      });
    },
    setTransition: function setTransition(duration) {
      if ( duration === void 0 ) duration = this.params.speed;

      var swiper = this;
      var $el = swiper.$el;
      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each(function (index, parallaxEl) {
          var $parallaxEl = $(parallaxEl);
          var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) { parallaxDuration = 0; }
          $parallaxEl.transition(parallaxDuration);
        });
    },
  };

  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        parallax: {
          setTransform: Parallax.setTransform.bind(swiper),
          setTranslate: Parallax.setTranslate.bind(swiper),
          setTransition: Parallax.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTransition(duration);
      },
    },
  };

  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) { return 1; }
      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
      return distance;
    },
    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
      if (!Support.gestures) {
        if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest('.swiper-slide');
        if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }
      gesture.$imageEl.transition(0);
      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (Support.gestures) {
        zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
      }
      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
      }
      if (zoom.scale < params.minRatio) {
        zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
      }
      gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }
        if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
          return;
        }
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;
      if (zoom.scale === 1) { gesture.$slideEl = undefined; }
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (image.isTouched) { return; }
      if (Device.android) { e.preventDefault(); }
      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      swiper.allowClick = false;
      if (!image.isTouched || !gesture.$slideEl) { return; }

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);
        if (swiper.rtl) {
          image.startX = -image.startX;
          image.startY = -image.startY;
        }
      }
      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;

      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;

      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (
          swiper.isHorizontal()
          && (
            (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x)
            || (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
          )
        ) {
          image.isTouched = false;
          return;
        } if (
          !swiper.isHorizontal()
          && (
            (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y)
            || (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
          )
        ) {
          image.isTouched = false;
          return;
        }
      }
      e.preventDefault();
      e.stopPropagation();

      image.isMoved = true;
      image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
      image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
      }
      if (image.currentX > image.maxX) {
        image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
      }

      if (image.currentY < image.minY) {
        image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
      }
      if (image.currentY > image.maxY) {
        image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
      }

      // Velocity
      if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
      if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
      if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();

      gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }
      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY;

      // Fix duration
      if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
      if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

      image.currentX = newPositionX;
      image.currentY = newPositionY;

      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

      gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        gesture.$imageWrapEl.transform('translate3d(0,0,0)');

        zoom.scale = 1;
        zoom.currentScale = 1;

        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;
      }
    },
    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function in$1(e) {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

      var touchX;
      var touchY;
      var offsetX;
      var offsetY;
      var diffX;
      var diffY;
      var translateX;
      var translateY;
      var imageWidth;
      var imageHeight;
      var scaledWidth;
      var scaledHeight;
      var translateMinX;
      var translateMinY;
      var translateMaxX;
      var translateMaxY;
      var slideWidth;
      var slideHeight;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = (offsetX + (slideWidth / 2)) - touchX;
        diffY = (offsetY + (slideHeight / 2)) - touchY;

        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;

        translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
        translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;

        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }
        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }
        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }
      gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
      gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    out: function out() {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
      gesture.$slideEl = undefined;
    },
    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (zoom.enabled) { return; }
      zoom.enabled = true;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
      }

      // Move image
      swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (!zoom.enabled) { return; }

      swiper.zoom.enabled = false;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
      }

      // Move image
      swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
    },
  };

  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed',
      },
    },
    create: function create() {
      var swiper = this;
      var zoom = {
        enabled: false,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        gesture: {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3,
        },
        image: {
          isTouched: undefined,
          isMoved: undefined,
          currentX: undefined,
          currentY: undefined,
          minX: undefined,
          minY: undefined,
          maxX: undefined,
          maxY: undefined,
          width: undefined,
          height: undefined,
          startX: undefined,
          startY: undefined,
          touchesStart: {},
          touchesCurrent: {},
        },
        velocity: {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined,
        },
      };

      ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
        zoom[methodName] = Zoom[methodName].bind(swiper);
      });
      Utils.extend(swiper, {
        zoom: zoom,
      });

      var scale = 1;
      Object.defineProperty(swiper.zoom, 'scale', {
        get: function get() {
          return scale;
        },
        set: function set(value) {
          if (scale !== value) {
            var imageEl = swiper.zoom.gesture.$imageEl ? swiper.zoom.gesture.$imageEl[0] : undefined;
            var slideEl = swiper.zoom.gesture.$slideEl ? swiper.zoom.gesture.$slideEl[0] : undefined;
            swiper.emit('zoomChange', value, imageEl, slideEl);
          }
          scale = value;
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.zoom.disable();
      },
      touchStart: function touchStart(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        var swiper = this;
        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      },
    },
  };

  var Lazy = {
    loadInSlide: function loadInSlide(index, loadInDuplicate) {
      if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

      var swiper = this;
      var params = swiper.params.lazy;
      if (typeof index === 'undefined') { return; }
      if (swiper.slides.length === 0) { return; }
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

      var $slideEl = isVirtual
        ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
        : swiper.slides.eq(index);

      var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images = $images.add($slideEl[0]);
      }
      if ($images.length === 0) { return; }

      $images.each(function (imageIndex, imageEl) {
        var $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);

        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');

        swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
          if (background) {
            $imageEl.css('background-image', ("url(\"" + background + "\")"));
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }
            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }
            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find(("." + (params.preloaderClass))).remove();
          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }
          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
        });

        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var swiperParams = swiper.params;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;

      var slidesPerView = swiperParams.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
            return true;
          }
        } else if (slides[index]) { return true; }
        return false;
      }
      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr('data-swiper-slide-index');
        }
        return $(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
          var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
          swiper.lazy.loadInSlide(index);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }
      if (params.loadPrevNext) {
        if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
          // Next Slides
          for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
            if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
          }
          // Prev Slides
          for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
            if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
          }
        } else {
          var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
          if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

          var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
          if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
        }
      }
    },
  };

  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,

        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        lazy: {
          initialImageLoaded: false,
          load: Lazy.load.bind(swiper),
          loadInSlide: Lazy.loadInSlide.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll() {
        var swiper = this;
        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      },
    },
  };

  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = (function search() {
        var maxIndex;
        var minIndex;
        var guess;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;
          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;
            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }
          return maxIndex;
        };
      }());
      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1;
      // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.
      var i1;
      var i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) { return 0; }

        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1;

        // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
      };
      return this;
    },
    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;
      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop
          ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid)
          : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(setTranslate$1, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier;
      var controlledTranslate;
      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c);
          // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out
          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }
        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }
      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var i;
      function setControlledTransition(c) {
        c.setTransition(duration, swiper);
        if (duration !== 0) {
          c.transitionStart();
          if (c.params.autoHeight) {
            Utils.nextTick(function () {
              c.updateAutoHeight();
            });
          }
          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) { return; }
            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }
            c.transitionEnd();
          });
        }
      }
      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    },
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide', // or 'container'
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        controller: {
          control: swiper.params.controller.control,
          getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
          setTranslate: Controller.setTranslate.bind(swiper),
          setTransition: Controller.setTransition.bind(swiper),
        },
      });
    },
    on: {
      update: function update() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(translate, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTransition(duration, byController);
      },
    },
  };

  var a11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;
      if (e.keyCode !== 13) { return; }
      var $targetEl = $(e.target);
      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }
      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }
      if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;
      if (notification.length === 0) { return; }
      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
        }
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
          var $bulletEl = $(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;

      swiper.$el.append(swiper.a11y.liveRegion);

      // Navigation
      var params = swiper.params.a11y;
      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
  };
  var A11y = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        a11y: {
          liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
        },
      });
      Object.keys(a11y).forEach(function (methodName) {
        swiper.a11y[methodName] = a11y[methodName].bind(swiper);
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updatePagination();
      },
      destroy: function destroy() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.destroy();
      },
    },
  };

  var History = {
    init: function init() {
      var swiper = this;
      if (!swiper.params.history) { return; }
      if (!win.history || !win.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }
      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues();
      if (!history.paths.key && !history.paths.value) { return; }
      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
      if (!swiper.params.history.replaceState) {
        win.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.history.replaceState) {
        win.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues();
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues() {
      var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return { key: key, value: value };
    },
    setHistory: function setHistory(key, index) {
      var swiper = this;
      if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
      var slide = swiper.slides.eq(index);
      var value = History.slugify(slide.attr('data-history'));
      if (!win.location.pathname.includes(key)) {
        value = key + "/" + value;
      }
      var currentState = win.history.state;
      if (currentState && currentState.value === value) {
        return;
      }
      if (swiper.params.history.replaceState) {
        win.history.replaceState({ value: value }, null, value);
      } else {
        win.history.pushState({ value: value }, null, value);
      }
    },
    slugify: function slugify(text) {
      return text.toString()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;
      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHistory = History.slugify(slide.attr('data-history'));
          if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    },
  };

  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        history: {
          init: History.init.bind(swiper),
          setHistory: History.setHistory.bind(swiper),
          setHistoryPopState: History.setHistoryPopState.bind(swiper),
          scrollToSlide: History.scrollToSlide.bind(swiper),
          destroy: History.destroy.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
    },
  };

  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      var newHash = doc.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
      if (newHash !== activeSlideHash) {
        var newIndex = swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index();
        if (typeof newIndex === 'undefined') { return; }
        swiper.slideTo(newIndex);
      }
    },
    setHash: function setHash() {
      var swiper = this;
      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
      if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
        win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
      } else {
        var slide = swiper.slides.eq(swiper.activeIndex);
        var hash = slide.attr('data-hash') || slide.attr('data-history');
        doc.location.hash = hash || '';
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
      swiper.hashNavigation.initialized = true;
      var hash = doc.location.hash.replace('#', '');
      if (hash) {
        var speed = 0;
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHash = slide.attr('data-hash') || slide.attr('data-history');
          if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }
      if (swiper.params.hashNavigation.watchState) {
        $(win).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.watchState) {
        $(win).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        hashNavigation: {
          initialized: false,
          init: HashNavigation.init.bind(swiper),
          destroy: HashNavigation.destroy.bind(swiper),
          setHash: HashNavigation.setHash.bind(swiper),
          onHashCange: HashNavigation.onHashCange.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      },
    },
  };

  /* eslint no-underscore-dangle: "off" */

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;
      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }
      swiper.autoplay.timeout = Utils.nextTick(function () {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
      }, delay);
    },
    start: function start() {
      var swiper = this;
      if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
      if (swiper.autoplay.running) { return false; }
      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;
      if (!swiper.autoplay.running) { return false; }
      if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }
      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;
      if (!swiper.autoplay.running) { return; }
      if (swiper.autoplay.paused) { return; }
      if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
      swiper.autoplay.paused = true;
      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    },
  };

  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper),
          onTransitionEnd: function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            swiper.autoplay.paused = false;
            if (!swiper.autoplay.running) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.run();
            }
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
        }
      },
      beforeTransitionStart: function beforeTransitionStart(speed, internal) {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove() {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
      },
    },
  };

  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;
        if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        var slideOpacity = swiper.params.fadeEffect.crossFade
          ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
          : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl
          .css({
            opacity: slideOpacity,
          })
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTransition(duration);
      },
    },
  };

  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var rtl = swiper.rtlTranslate;
      var swiperSize = swiper.size;
      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl;
      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }
          $cubeShadowEl.css({ height: (swiperWidth + "px") });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;
        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }
        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + (round * 4 * swiperSize);
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = (3 * swiperSize) + (swiperSize * 4 * round);
        }
        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
        if (progress <= 1 && progress > -1) {
          wrapperRotate = (slideIndex * 90) + (progress * 90);
          if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
        }
        $slideEl.transform(transform);
        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
      }
      $wrapperEl.css({
        '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
          var multiplier = 1.5 - (
            (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
            + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
          );
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset = params.shadowOffset;
          $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
        }
      }
      var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
      $wrapperEl
        .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    },
  };

  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        cubeEffect: {
          setTranslate: Cube.setTranslate.bind(swiper),
          setTransition: Cube.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTransition(duration);
      },
    },
  };

  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        var offset = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset;
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
        $slideEl
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var $wrapperEl = swiper.$wrapperEl;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        flipEffect: {
          setTranslate: Flip.setTranslate.bind(swiper),
          setTransition: Flip.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTransition(duration);
      },
    },
  };

  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesSizesGrid = swiper.slidesSizesGrid;
      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform = swiper.translate;
      var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth;
      // Each slide offset from center
      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        var translateZ = -translate * Math.abs(offsetMultiplier);

        var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
        var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) { translateX = 0; }
        if (Math.abs(translateY) < 0.001) { translateY = 0; }
        if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
        if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
        if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append($shadowBeforeEl);
          }
          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append($shadowAfterEl);
          }
          if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
          if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
        }
      }

      // Set correct perspective for IE10
      if (Support.pointerEvents || Support.prefixedPointerEvents) {
        var ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = center + "px 50%";
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    },
  };

  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        coverflowEffect: {
          setTranslate: Coverflow.setTranslate.bind(swiper),
          setTransition: Coverflow.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }

        swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTransition(duration);
      },
    },
  };

  var Thumbs = {
    init: function init() {
      var swiper = this;
      var ref = swiper.params;
      var thumbsParams = ref.thumbs;
      var SwiperClass = swiper.constructor;
      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Utils.extend(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        Utils.extend(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
      } else if (Utils.isObject(thumbsParams.swiper)) {
        swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        }));
        swiper.thumbs.swiperCreated = true;
      }
      swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
    },
    onThumbClick: function onThumbClick() {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }
      var clickedIndex = thumbsSwiper.clickedIndex;
      var clickedSlide = thumbsSwiper.clickedSlide;
      if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) { return; }
      if (typeof clickedIndex === 'undefined' || clickedIndex === null) { return; }
      var slideToIndex;
      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      } else {
        slideToIndex = clickedIndex;
      }
      if (swiper.params.loop) {
        var currentIndex = swiper.activeIndex;
        if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
          swiper.loopFix();
          // eslint-disable-next-line
          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          currentIndex = swiper.activeIndex;
        }
        var prevIndex = swiper.slides.eq(currentIndex).prevAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        var nextIndex = swiper.slides.eq(currentIndex).nextAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        if (typeof prevIndex === 'undefined') { slideToIndex = nextIndex; }
        else if (typeof nextIndex === 'undefined') { slideToIndex = prevIndex; }
        else if (nextIndex - currentIndex < currentIndex - prevIndex) { slideToIndex = nextIndex; }
        else { slideToIndex = prevIndex; }
      }
      swiper.slideTo(slideToIndex);
    },
    update: function update(initial) {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }

      var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto'
        ? thumbsSwiper.slidesPerViewDynamic()
        : thumbsSwiper.params.slidesPerView;

      if (swiper.realIndex !== thumbsSwiper.realIndex) {
        var currentThumbsIndex = thumbsSwiper.activeIndex;
        var newThumbsIndex;
        if (thumbsSwiper.params.loop) {
          if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
            thumbsSwiper.loopFix();
            // eslint-disable-next-line
            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
            currentThumbsIndex = thumbsSwiper.activeIndex;
          }
          // Find actual thumbs index to slide to
          var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0).index();
          var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0).index();
          if (typeof prevThumbsIndex === 'undefined') { newThumbsIndex = nextThumbsIndex; }
          else if (typeof nextThumbsIndex === 'undefined') { newThumbsIndex = prevThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = currentThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = nextThumbsIndex; }
          else { newThumbsIndex = prevThumbsIndex; }
        } else {
          newThumbsIndex = swiper.realIndex;
        }
        if (thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - slidesPerView + 1;
          }
          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      }

      // Activate thumbs
      var thumbsToActivate = 1;
      var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }

      thumbsSwiper.slides.removeClass(thumbActiveClass);
      if (thumbsSwiper.params.loop) {
        for (var i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]")).addClass(thumbActiveClass);
        }
      } else {
        for (var i$1 = 0; i$1 < thumbsToActivate; i$1 += 1) {
          thumbsSwiper.slides.eq(swiper.realIndex + i$1).addClass(thumbActiveClass);
        }
      }
    },
  };
  var Thumbs$1 = {
    name: 'thumbs',
    params: {
      thumbs: {
        swiper: null,
        slideThumbActiveClass: 'swiper-slide-thumb-active',
        thumbsContainerClass: 'swiper-container-thumbs',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        thumbs: {
          swiper: null,
          init: Thumbs.init.bind(swiper),
          update: Thumbs.update.bind(swiper),
          onThumbClick: Thumbs.onThumbClick.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        var ref = swiper.params;
        var thumbs = ref.thumbs;
        if (!thumbs || !thumbs.swiper) { return; }
        swiper.thumbs.init();
        swiper.thumbs.update(true);
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      update: function update() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        thumbsSwiper.setTransition(duration);
      },
      beforeDestroy: function beforeDestroy() {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        if (swiper.thumbs.swiperCreated && thumbsSwiper) {
          thumbsSwiper.destroy();
        }
      },
    },
  };

  // Swiper Class

  var components = [
    Device$1,
    Support$1,
    Browser$1,
    Resize,
    Observer$1,
    Virtual$1,
    Keyboard$1,
    Mousewheel$1,
    Navigation$1,
    Pagination$1,
    Scrollbar$1,
    Parallax$1,
    Zoom$1,
    Lazy$1,
    Controller$1,
    A11y,
    History$1,
    HashNavigation$1,
    Autoplay$1,
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    Thumbs$1
  ];

  if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
  }

  Swiper.use(components);

  return Swiper;

}));

;(function ($, window, document, undefined) {

    var sliders = [],
        selectors = {
            swiperContainer: '.swiper-container'
        },
        defaults = {
            slidesPerViewMax: 4,
            slidesPerGroupMax: 4
        },
        options = {
            init: false,
            speed: 400,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            loop: true,
            spaceBetween: 20,
            slidesPerView: defaults.slidesPerViewMax,
            slidesPerGroup: defaults.slidesPerGroupMax,
            breakpoints: {
                1200: {
                    slidesPerView : defaults.slidesPerViewMax,
                    spaceBetween  : 20,
                    slidesPerGroup: defaults.slidesPerGroupMax
                },
                1024: {
                    slidesPerView : 2,
                    spaceBetween  : 20,
                    slidesPerGroup: 1
                },
                768: {
                    slidesPerView : 2,
                    spaceBetween  : 10,
                    slidesPerGroup: 1
                },
                640: {
                    slidesPerView : 1,
                    spaceBetween  : 10,
                    slidesPerGroup: 1
                }
             }
        },

        setAutoPlay = function ($ele) {
            if ($ele.data('autoplay')) {
                options.autoplay = {
                    delay: config.delay,
                    waitForTransition: false
                }
            } else {
                delete options.autoplay;
            }
        },

        readAuthorOptionsFromDOM = function (swiper) {            
            var dataSlidesPerView  = $(swiper).data('slidesPerView') || defaults.slidesPerViewMax,
                dataSlidesPerGroup = $(swiper).data('slidesPerGroup') || defaults.slidesPerGroupMax;
            options.slidesPerView  = (typeof dataSlidesPerView !== 'undefined' && dataSlidesPerView > defaults.slidesPerViewMax) ? defaults.slidesPerViewMax : dataSlidesPerView;
            options.slidesPerGroup = (typeof dataSlidesPerGroup !== 'undefined' && dataSlidesPerGroup > defaults.slidesPerGroupMax) ? defaults.slidesPerGroupMax : dataSlidesPerGroup;

            if(options.slidesPerView < 4) {
                options.breakpoints['1200'].slidesPerView = options.slidesPerView;
                options.breakpoints['1200'].slidesPerGroup = options.slidesPerGroup;
            }
        },
        
        ellipsizeMultiline = function(selector) {
            var elements = document.querySelectorAll(selector);
            Array.prototype.forEach.call(elements, clipWords);
        },

        clipWords = function (element){
         	//const wordsArray = element.innerHTML.split(' ');
            var wordsArray = element.dataset.title.split(' ');
            element.innerHTML = element.dataset.title;
            while(element.scrollHeight > element.offsetHeight){
                wordsArray.pop();
                element.innerHTML = wordsArray.join(' ') + ' ...';
         	}
        },

        handleNavigation = function () {
            var currentWidth = window.innerWidth || document.documentElement.clientWidth;
            if(currentWidth <= 640) {
				currentSlidesPerView = this.passedParams.breakpoints['640'].slidesPerView;
            } else if(currentWidth > 640 && currentWidth <= 768) {
                currentSlidesPerView = this.passedParams.breakpoints['768'].slidesPerView;
            } else if (currentWidth > 768 && currentWidth <= 1024) {
				currentSlidesPerView = this.passedParams.breakpoints['1024'].slidesPerView;
            } else if (currentWidth > 1024) {
				currentSlidesPerView = this.passedParams.breakpoints['1200'].slidesPerView;
            }

            if ((window.innerWidth || document.documentElement.clientWidth) >= 768 && this.totalTiles <= currentSlidesPerView) {
				$(this.navigation.nextEl).addClass('hidden');
				$(this.navigation.prevEl).addClass('hidden');
            } else {
				$(this.navigation.nextEl).removeClass('hidden');
				$(this.navigation.prevEl).removeClass('hidden');
            }
            this.update();
            ellipsizeMultiline(".swiper-wrapper .tile-text");
        },

        setAutoPlay = function ($ele) {
            if ($ele.data('autoplay')) {
                options.autoplay = {
                    delay: config.delay,
                    waitForTransition: false
                }
            } else {
                delete options.autoplay;
            }
        },

        init = function () {

            $(selectors.swiperContainer).each(function (index, element){
                // temp fix cybersecurity report. 
                if( $(this).hasClass('fullWide-swiper')) return;
                if( $(this).hasClass('valPropSwiper')) return;
                if( $(this).hasClass('slider-fpo')) return;

				readAuthorOptionsFromDOM(element);
                var slider,
                    $this = $(this),
                    totalTiles = $(this).find('.swiper-slide').length;

                $(this).addClass('s' + index);
                setAutoPlay($this);
                slider = new Swiper('.s' + index, options);
                slider.totalTiles = totalTiles;
                slider.on('init', handleNavigation);
                slider.on('resize', handleNavigation);
                slider.init();
                sliders.push(slider);
    
            });

        };


    $(function () {
        init();
    });

})(jQuery.noConflict(), window, document);

     /**
 * component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires Swiper javascript library
*/

;(function ($, window, document, undefined) {
    $(document).ready(function() {    
    var  
    // TODO: move css selectors here
    selectors = {
        iconTooltipsContainer: '.tooltips-item',
        btnClose: '.btn-close',
    },
    calculateToolTipsCenter = function(desktop){
        console.log(currentToolTipOpen.closest(selectors.iconTooltipsContainer).hasClass('tooltip-tablet'));
        currentToolTipOpen = $('.active-tooltip'); 
        var centerToolTips = (currentToolTipOpen.closest(selectors.iconTooltipsContainer).width()) / 2;
        if(!desktop){
            if(currentToolTipOpen.closest(selectors.iconTooltipsContainer).hasClass('toolTip-left')){
                $('.active-tooltip').css({"left":0});
                $('.active-tooltip .tooltip-arrow').css({'left':centerToolTips});
            }else if(currentToolTipOpen.closest(selectors.iconTooltipsContainer).hasClass('toolTip-right')){
                $('.active-tooltip').css({"right":0});
                $('.active-tooltip .tooltip-arrow').css({'right':centerToolTips -7});
            }else if(currentToolTipOpen.closest(selectors.iconTooltipsContainer).hasClass('toolTip-center')){
                $('.active-tooltip').css({"left":-(currentToolTipOpen.width() - currentToolTipOpen.closest(selectors.iconTooltipsContainer).width()) / 2});
                $('.active-tooltip .tooltip-arrow').css({'left':'50%'});  
            }   
        }else {
            $('.active-tooltip').css({"left":-(currentToolTipOpen.width() - currentToolTipOpen.closest(selectors.iconTooltipsContainer).width()) / 2});
            $('.active-tooltip .tooltip-arrow').css({'left':'50%'}); 
        }
    },
    setToolTipsCenter = function(){
        currentToolTipOpen = $('.active-tooltip');       
        if($('.active-tooltip').length) {
            $('.active-tooltip, .active-tooltip .tooltip-arrow').attr('style','');
            var centerToolTips = (currentToolTipOpen.closest(selectors.iconTooltipsContainer).width()) / 2;
            if(window.matchMedia('(min-width: 1350px)').matches){   
                calculateToolTipsCenter(true);
            }else if(window.matchMedia('(min-width: 992px)').matches && window.matchMedia('(max-width: 1350px)').matches){
                calculateToolTipsCenter()  
            }else if(window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 992px)').matches){
                if(currentToolTipOpen.closest(selectors.iconTooltipsContainer).hasClass('tooltip-tablet')){
                    $('.active-tooltip').css({"right":0});
                    $('.active-tooltip .tooltip-arrow').css({'right':centerToolTips -7});
                }else {
                    $('.active-tooltip').css({"left":0});
                    $('.active-tooltip .tooltip-arrow').css({'left':centerToolTips});
                }              
            }
            else {                
				$(".active-tooltip .tooltip-arrow").css({left: centerToolTips})
				if(window.innerWidth < 615)	{
					var vwidth = window.innerWidth - 40;
					$(".active-tooltip").css("width", vwidth+"px");
				} else {
					$(".active-tooltip").attr("style", "");
				}
            }
        }
        
    },
    /**
     *
     * Init Function Component
     *
     */
    init = function () {  
        jQuery('.icon-grid-list .tooltips-item:nth-child(3n+1)').addClass('toolTip-left');
        jQuery('.icon-grid-list .tooltips-item:nth-child(3n+2)').addClass('toolTip-center');
        jQuery('.icon-grid-list .tooltips-item:nth-child(3n+3)').addClass('toolTip-right');
        jQuery('.icon-grid-list .tooltips-item:nth-child(2n+2)').addClass('tooltip-tablet');
    },
    /**
     *
     * BindEvents Function Component
     *
     * @param    object  $object The object to convert
     * @return      array
     *
     */
    bindEvents = function () { 
        /**
         *
         * Click toolTips Item Event
         *
         */       
         $(selectors.iconTooltipsContainer).on('click', function(e) {     
			var isActiveTooltip  = $(this).find('.active-tooltip').length;	
			if(isActiveTooltip) {
				$(this).find('.active-tooltip').removeClass('active-tooltip').removeAttr('style');            		
			} else {
				$(selectors.iconTooltipsContainer).find('.tooltip-container').removeClass('active-tooltip');   
				$(this).find('.tooltip-container').addClass('active-tooltip');  
				setToolTipsCenter();  
			}
                 
        }); 
        /**
         *
         * Click toolTips Item Event
         *
         */       
        $(selectors.btnClose).on('click', function(e) {  
            $(selectors.iconTooltipsContainer).find('.tooltip-container').removeClass('active-tooltip');             
        });  
       
        /**
         *
         * Click close toolTips Item Event 
         *
         */
        $(document).bind('click', function(e) {
            var container = $('.tooltips-item, .tooltips-item img, .tooltips-item p');        
            if(!container.is(e.target)) {
                $(selectors.iconTooltipsContainer).find('.tooltip-container').removeClass('active-tooltip');            
                $(selectors.iconTooltipsContainer).find('.tooltip-container').removeAttr('style');
            } 
            });            
        };
        $(window).resize(function() {      
            setToolTipsCenter();
        });
        /**
         *
         * Load after the Dom is ready 
         *
         */
        $(function () {        
            init();
            bindEvents();
        }); 
    });
})(jQuery.noConflict(), window, document);











/**
 * tabbed image-text component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 */ 
;(function ($, window, document, undefined) {

    var selectors = {
        componentContext: '.tabbed-image-text-component',
        backStage: '.tabbedit-actors',
        actors: '.tabbedit-actor',
        prompt: '.prompt'
    },
    $componentContext,
    init = function () {
//        $componentContext = $(selectors.componentContext);
        $componentContext.find(selectors.actors).hide();
        $componentContext.find(selectors.actors).first().show();

        $componentContext.find('.tabbedit-tabs .prompt').first().addClass('active');
        $componentContext.find('.tabbedit-bullets .prompt').first().addClass('active');
    },
    handlePrompClick = function (e, that, $cc) {
        var actorNumber;
        e.preventDefault();
        actorNumber = $(that).data('prompt');
        $cc.find(selectors.prompt).removeClass('active');
        $(that).addClass('active');
        $cc.find(selectors.actors).hide();
        $cc.find(selectors.backStage).find('[data-prompt='+actorNumber+']').show();
    },
    bindEvents = function (currentComponent) {
        $componentContext.find(selectors.prompt).on('click', function(e) { handlePrompClick(e, this, currentComponent) });
    };
    $(function () {
        $(selectors.componentContext).each(function (index, el) {
            $componentContext = $(el);
            init();
            bindEvents($componentContext);
        });
    });

})(jQuery.noConflict(), window, document);
;(function ($, window, document, undefined) {
    var selector = $('#breadcrumb-component .phone-number a');
    var cont_selector = $('.contact .contact-phone a');
    if ($(window).width() > 480) {
       selector.css({"text-decoration":"none"});
    }
    
    var addTollFreeNum = selector.parent().data("addtfn") || cont_selector.data("addtfn");
    var localStorageTfn = localStorage.getItem("Contact_TFNum");    
    if (typeof addTollFreeNum !== 'undefined') {
        if (localStorageTfn == null || localStorageTfn != addTollFreeNum) {
            localStorage.setItem("Contact_TFNum", addTollFreeNum);
        }
    } else if (localStorageTfn != null && localStorageTfn != "null") {
        selector.text(localStorageTfn);
        selector.attr("itemprop", localStorageTfn);
    }
})(jQuery.noConflict(), window, document);

;(function ($, window, document, undefined) {
    var selector = $('#breadcrumb-component .phone-number a');
    var cont_selector = $('.contact .contact-phone a');
    if ($(window).width() > 480) {
       selector.css({"text-decoration":"none"});
    }
    
    var addTollFreeNum = selector.parent().data("addtfn") || cont_selector.data("addtfn");
    var localStorageTfn = localStorage.getItem("Contact_TFNum");    
    if (typeof addTollFreeNum !== 'undefined') {
        if (localStorageTfn == null || localStorageTfn != addTollFreeNum) {
            localStorage.setItem("Contact_TFNum", addTollFreeNum);
        }
    } else if (localStorageTfn != null && localStorageTfn != "null") {
        selector.text(localStorageTfn);
        selector.attr("itemprop", localStorageTfn);
    }
})(jQuery.noConflict(), window, document);

/**
 * sticky-nav component related code - In page navigation & sticky feature implementation
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring native window object
 * @param  {[type]} document  Restoring native document object
 * @param  {[type]} undefined Resotring native undefined object
 * @requires jQuery javascript library
 * @reequires Swiper javascript library
 */
;(function ($, window, document, undefined) {
    if($('.sticky-nav').length === 0) return; //if the sticky-nav element is not found do not run any code
    var $win,
    swiper,
    lastId,
    sections,
    menuItems,
    $stickyNavTarget,
    $stickyNavTargetOffset,
    selectors = {
        stickyNavTarget: '.sticky-nav',
        headerTarget: '.header-content',
		segHeaderTarget: '.top-segment-header',
        swiperTarget: '.sticky-nav .sticky-nav-swiper-container',
        buSolutionTarget: '.main-page',
        buLearnTarget: '.main-par'
    },

    getBusinessUnit = function () {
        if($(selectors.buSolutionTarget).length) return 'SOLUTIONS';
        else if($(selectors.buLearnTarget).length) return 'LEARN';
    },

    stickMe = function () {
        var $headerTarget = $(selectors.headerTarget),
            headerBuffer = $headerTarget.height(),
            $segHeaderTarget = $(selectors.segHeaderTarget),            
        	segHeaderBuffer = $segHeaderTarget.height();
        if($stickyNavTargetOffset < $win.scrollTop()+headerBuffer+segHeaderBuffer) {
            $(selectors.stickyNavTarget).addClass('stick');
        } else {
            $(selectors.stickyNavTarget).removeClass('stick');
        }

    },
        
    prepareMenuInfrastructure = function () {

        // All in page navigation items
        menuItems = $('.sticky-nav-container ').find('a');
        // Anchors corresponding to menu item
        sections = menuItems.map(function () {
            var item = $($(this).attr('href'));
            if(item.length) { return item; }
        });

    },

    setCurrentSectionStyle = function () {
        // Check for <section> ids exists
        if(typeof sections !== 'undefined' && sections.length === 0) {
            // StickyNav sections not set properly
            return;
        }
        var id,
            curIds,
            fromTop,
            $currentSection,
            $currentSectionIndex,
            mainNavHeight = 120,
            bufferHeight = $('.sticky-nav.stick').length ? 60 : 100,
            stickyMenuHeight = 60,

        resetActiveSection = function () {
            
            menuItems.each(function(){
                $(this).parent('li').removeClass('active');
            });
            $currentSection = menuItems.filter('[href="#'+id+'"]');
            $currentSectionIndex = $currentSection.data().index || 0;
            swiper.slideTo($currentSectionIndex-1);

            $currentSection
                .parent('li')
                .addClass('active');
        };

        // Get container scroll position
        fromTop = $(this).scrollTop()+mainNavHeight+stickyMenuHeight+bufferHeight;

        // Get id of current section
        curIds = sections.map(function () {
            if($(this).offset().top < fromTop) return this;
        });
        curIds = curIds[curIds.length-1];
        id = curIds && curIds.length ? curIds[0].id : "";

        if(lastId !== id) {
            lastId = id;
            if(id=="") id=sections[0][0].id;
            // reset active class
            resetActiveSection()
        }
    },
        
    smoothScroll = function (ele) {
        var targetOffset,
            topMenuHeight,
            segmentHeaderHeight,
            stickyElementHeight,
            target = $jq10(ele.hash);
        // excluding external domain
        if(ele.href.indexOf(window.location.host) < 0) return;
           
        
        // Defence - if for some reason unable to locate clicked section in the page
        targetOffset = target.length ? target.offset().top : 0;
        
        stickyElementHeight = $('.sticky-nav-container').height(); 
        segmentHeaderHeight = $('.top-segment-header').height();
        topMenuHeight = $('.top-segment-header').height();

        $jq10('html,body').animate({
            scrollTop: targetOffset - segmentHeaderHeight - topMenuHeight - stickyElementHeight
        }, 1000);
        event.preventDefault();
        return false;
    },
    anchorHash = function(){
        
        var targetOffset,
        topMenuHeight,
        segmentHeaderHeight,
        stickyElementHeight,
        target = $(window.location.hash);
        
        targetOffset = target.length ? target.offset().top : 0;

        stickyElementHeight = $('.sticky-nav-container').height(); 
        segmentHeaderHeight = $('.top-segment-header').height();
        topMenuHeight = $('.header-content').height();

        $('html,body').animate({
            scrollTop: targetOffset - segmentHeaderHeight - topMenuHeight - stickyElementHeight
        }, 2000);
    },
    scrollHash = function(){
        var segmentHeaderHeight2, stickyElementHeight2, topMenuHeight2;
        stickyElementHeight2 = $('.sticky-nav-container').height(); 
        segmentHeaderHeight2 = $('.top-segment-header').height();
        topMenuHeight2 = $('.header-content').height();
        if(window.location.hash) {
            var hash = window.location.hash; 
                jQuery('html, body').animate({
                    scrollTop: jQuery(hash).offset().top - segmentHeaderHeight2 - topMenuHeight2 - stickyElementHeight2
                }, 0);
            console.log("URL hash: " + hash);
        }
    },
        
    initializeSwiper = function () {
        swiper = new Swiper(selectors.swiperTarget, {
            init: false,
            watchOverflow: true,
            slidesPerView: 'auto'
        });
        swiper.on('init', setCurrentSectionStyle);
    },
        
    bindEvents = function () {
        if(getBusinessUnit() === 'SOLUTIONS') {
            $win.bind('scroll', stickMe);
            $win.bind('scroll', setCurrentSectionStyle); 
            

            // excluding href just contain only # and href contains pattern /#/
            $('body').on('click', 'a[href*="#"]:not([href="#"]):not([href*="/#/"]):not([data-toggle="collapse"]):not([href*="topic#"]):not([href*=".jsp#"]):not(".prevent-scroll")',function(e){
                e.preventDefault();                
                var domain = $(this).attr('href');
                
                // excluding #hash || external domain 
                if(domain.indexOf('#') === 0 || domain.includes(window.location.href)){
                    smoothScroll(this);
                    $(this).blur();
                    $(domain).focus();
                }else {
                    $(this).attr('target') =='_blank' ? window.open(domain, "_blank") : window.location.href = domain;
                } 
            });

        }
    },
        
    init = function () {
        $win = $(window);
        $stickyNavTarget = $(selectors.stickyNavTarget);
        $stickyNavTargetOffset = $stickyNavTarget.offset() ? $stickyNavTarget.offset().top : 0;
        
        initializeSwiper();
        if(getBusinessUnit() === 'SOLUTIONS') {
            //stickMe();
            prepareMenuInfrastructure();
            if($("div.sticky-nav").length > 0) {
                swiper.init();
            }
            if(window.location.hash){
                scroll(0,0);
                setTimeout(function(){
                    scroll(0,0);
                },1);
                $win.bind('load', scrollHash);

                // Check page height changes
                const resizeObserver = new ResizeObserver(entries => {
                    $('html,body').stop();
                    anchorHash();
                    resizeObserver.unobserve(document.body);
                });
                // start observing a DOM node
                resizeObserver.observe(document.body)
                
            }
        }

    };

    // execute after DOM ready
    $(function () {
        init();
        bindEvents();
    });

})(jQuery.noConflict(), window, document);


;
(function ($, window, document, undefined) {
    var selector = $('#breadcrumb-component .phone-number a');
    var cont_selector = $('.contact .contact-phone a');
    if ($(window).width() > 480) {
        selector.css({
            "text-decoration": "none"
        });
    }

    var addTollFreeNum = selector.parent().data("addtfn") || cont_selector.data("addtfn");
    var localStorageTfn = localStorage.getItem("Contact_TFNum");
    if (typeof addTollFreeNum !== 'undefined') {
        if (localStorageTfn == null || localStorageTfn != addTollFreeNum) {
            localStorage.setItem("Contact_TFNum", addTollFreeNum);
        }
    } else if (localStorageTfn != null && localStorageTfn != "null") {
        selector.text(localStorageTfn);
        selector.attr("itemprop", localStorageTfn);
    }

    $("#breadcrumb-component a.button.medium").on("click", function (e) {
        setTimeout(function() {
            e.preventDefault();
            if ($("#worldwide-leadform").html() != undefined) {
                $("#salutation").focus();
            } else if ($("#rai-leadform").html() != undefined) {
                $("#firstName").focus();
            } else if ($("#gating_form").html() != undefined) {
                $("#firstNameGated").focus();
            }
        },1000);
    });

    $(document).ready(function(){ 
        $("#breadcrumb-component a.button.medium").keyup(function (e) {
            var ev = window.event ? window.event : e;
            if (ev.keyCode == 13 || ev.keyCode == 32) {
                $("#breadcrumb-component a.button.medium").trigger('click');
            }
        });
    });

})(jQuery.noConflict(), window, document);
/**
 * marquee-heading component carousel functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires Swiper library
 * @requires video-overlay component
 * @requires ytplayer
 */
 ;(function ($, window, document, undefined) {
    var sliders = [],
    pauseTimer,
    pauseTimerMarquee,
    isLoadVideo,
    config = {
        delay: 6000
    },
    selector = {
        bgHero: '.marquee-heading .marquee-item',
        marqueeHeadingContainer: '.marquee-heading',
        marqueeCarousalContainer: '.swiper-container-carousal',
        pagination: '.marquee-heading .swiper-pagination',
        playButton: '.marquee-play-icon-container',
        html5PlayButton: '.playpause',
        html5PlayInput: '.playPause',
        html5VideoContainer: '.html5-video-container, .video-overlay-container',
        html5Video: '.html5-video-container video'
    },
    
    options = {
        init: false,
        a11y: true,
        // Swiper will be disabled and hide navigation buttons on case there are not enough slides for sliding
        watchOverflow: true,
        //disableOnInteraction: true,
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: true
        },
        pagination: {
            el: null,
            clickable: true
        },
        loop: true
    },

    invokeOverlayVideo = function (ele) {
        var DOMdata = $(ele).data();
        var options = {
            data: {
                video      : DOMdata.video,
                title      : DOMdata.title || '',
                series     : DOMdata.series || '',
                objective  : DOMdata.objective || '',
                category   : DOMdata.category || '',
                vertical   : DOMdata.vertical || '',
                persona    : DOMdata.persona || '',
                publisher  : DOMdata.publisher || '',
                source     : DOMdata.source || '',
                publishdate: DOMdata.publishdate || '',
                mediatype  : DOMdata.mediatype || '',
                mediaclass : DOMdata.mediaclass || '',
                mediafriendlyname: DOMdata.mediafriendlyname || ''
            }
        };
        att.entbus.overlay.buildVideo(options);
    },
    
    invokeOverlayPodCast = function (ele) {
        var DOMdata = $(ele).data(),
            options = {
                title: DOMdata.name,
                podCast: DOMdata.podcast
            };
        att.entbus.overlay.buildPodCast(options);
    },

    handleHtml5VideoPlay = function ($ele) {
        // Single Instance Handled for video Player -1
        var html5Video = $ele.parents('.html5-video-container').find('video')[0];
        if(html5Video) {
            if (html5Video.paused === true) { 
                html5Video.play(); 
                $ele.find(selector.html5PlayInput).prop('checked', false);
            } else { 
                html5Video.pause(); 
                $ele.find(selector.html5PlayInput).prop('checked', true); 
            }
        }
        
    },

    html5VideoStart = function () {
        var sources,
            videos;
        if(isLoadVideo) {
            sources = $(selector.html5Video).find('source');
            videos = $(selector.html5Video);
            
            for (var i = 0, len = sources.length; i < len; i++ ) {
                sources[i].setAttribute('src', sources[i].dataset.src);
            }
            if(videos.length > 0) {
            	for(var j=0; j<videos.length; j++){
                    videos[j].load();
                }
            }
        }
    },

    bindEvents = function () {
        $(selector.marqueeHeadingContainer).on('click', selector.playButton, function (e) {
            var $podcast = $(this).data('podcast');
            e.preventDefault();
            if (typeof $podcast !== 'undefined' && $podcast !== '') {
                invokeOverlayPodCast(this);
            } else {
                invokeOverlayVideo(this);
            }
        }); 
        $(selector.html5PlayButton).on('click', function () { 
            handleHtml5VideoPlay($(this));
            return false;
        });
        
        // Pause video if mouse over more than 3 seconds
        $(selector.html5VideoContainer).on('mouseover', function () {
            var html5Video = $(this).parent().first().find('video');
            var self = this;
            if(html5Video?.length) {
                pauseTimer = window.setTimeout( function () {
                    if (pauseTimer && !html5Video.paused) {
                        html5Video[0].pause();
                        // $(selector.html5PlayInput).prop('checked', true);
                        $(self).parent().find(selector.html5PlayInput).prop('checked', true);
                    }
                }, 3000);
                    
            }
        });
        $(selector.html5VideoContainer).on('mouseout', function () {
            window.clearTimeout(pauseTimer);
        });
        
        var touchSwiped = false;
        
        $('.marquee-item.with-link').on('touchmove', function () {
            touchSwiped = true;
        });
        
        $('.marquee-item').on('click touchend', function (e) {
            if (!touchSwiped) {
            	
                if ($(this).hasClass('with-link') && 
                    (!$(e.target).hasClass('att-button') 
                     && !$(e.target).hasClass('marquee-more-link')
                     && !$(e.target).hasClass('modal-anchor')
                     && !$(this).hasClass('modal-anchor'))) {
                    	e.preventDefault();
                    	var target = '_blank',
                        url = $(this).attr('data-link-url');

                if (url && (url.indexOf('business.att') > -1  || url.indexOf('/content/attbusiness/en/') > -1 ))
                        target = '_self';

                    window.open($(this).attr('data-link-url'), target);
                }
            } else touchSwiped = false;
        });
    },
    
    setAutoPlay = function ($ele) {
        if ($ele.data('autoplay')) {
            options.autoplay = {
                delay: config.delay,
                waitForTransition: false
            }
        } else {
            delete options.autoplay;
        }
    },

    init = function () {

        if ($(selector.marqueeCarousalContainer).length) {
            $(selector.marqueeCarousalContainer).each(function (index, element) {
                var slider,
                    count = index,
                    $this = $(this);
                $this.addClass('mc' + index);
                setAutoPlay($this);
                options.navigation.nextEl = $this.find('.swiper-button-next');
                options.navigation.prevEl = $this.find('.swiper-button-prev');
                options.pagination.el     = $this.find('.swiper-pagination');
                slider = new Swiper(selector.marqueeCarousalContainer+'.mc'+count, options);
                if (typeof options.autoplay !== 'undefined') {
                    $this.on('mouseover', function () {
                        window.clearTimeout(pauseTimerMarquee);
                        slider.autoplay.stop();
                    });
                    $this.on('mouseout', function () {
                        if(!slider.autoplay.running) {
                            pauseTimerMarquee = window.setTimeout( function () {
                                slider.slideNext();
                                slider.autoplay.start();
                            }, 2000);
                        }
                    });
                }
                // Pause slider when tabbed into focus (keyboard navigation)

                $(window).keyup(function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which),
                    html5Video = $('.html5-video-container').find('video')[0];
                    if (code == 9 && $('.marquee-heading:focus-within').length) {
                        slider.autoplay.stop();
                        html5Video.pause();
                        } else {
                        slider.autoplay.start();
                        html5Video.play();
                        }
                    });
                slider.on('init', function() {
                    if ($('.swiper-slide-duplicate').length != 0) {
                        var h1Tag = $('.swiper-slide-duplicate').find('.marquee-overlay-container').find('.marquee-overlay').find('h1');
                        if (h1Tag !== 'undefined') h1Tag.replaceWith('<span class=\"marq-h1\">' + h1Tag.html() + '</span>');
                    }
                });
                slider.init();
                sliders.push(slider);
            });
        }
        // load video in screen greater than 768 pixels
        isLoadVideo = ( $(window).width() >= 768 ) ? true : false;
        html5VideoStart();
    };

    // execute when DOM ready
    $(function () {
        init();
        bindEvents();
    });

})(jQuery.noConflict(), window, document);

// /**
//  * marquee-heading component carousel functionality 
//  * @param  {[type]} $         jQuery object
//  * @param  {[type]} window    Restoring original window object
//  * @param  {[type]} document  Restoring original document object
//  * @param  {[type]} undefined Restoring original undefined type
//  * @requires jQuery javascript library
//  * @requires Swiper library
//  * @requires video-overlay component
//  * @requires ytplayer iamge111222
//  */

/*
(function (document, $) {
    var sliders = [],
    galleryTop,
    pauseTimer,
    isLoadVideo,
    config = {
        delay: 6000
    },
    selector = {
        bgHero: '.marquee-heading .marquee-item',
        marqueeHeadingContainer: '.marquee-heading',
        marqueeCarousalContainer: '.swiper-container-carousal',
        pagination: '.marquee-heading .swiper-pagination',
        playButton: '.marquee-play-icon-container',
        html5PlayButton: '.js-playpause',
        html5PlayInput: '.playPause',
        html5VideoContainer: '.html5-video-container, .video-overlay-container',
        html5Video: '.html5-video-container video'
    },
*/    
//     options = {
//         init: false,
//         a11y: true,
//         //disableOnInteraction: true,
//         navigation: {
//             nextEl: null,
//             prevEl: null,
//             hideOnClick: true
//         },
//         pagination: {
//             el: null,
//             clickable: true
//         }
//     },

//     invokeOverlayVideo = function (ele) {
//         var DOMdata = $(ele).data();
//         var options = {
//             data: {
//                 video      : DOMdata.video,
//                 title      : DOMdata.title || '',
//                 series     : DOMdata.series || '',
//                 objective  : DOMdata.objective || '',
//                 category   : DOMdata.category || '',
//                 vertical   : DOMdata.vertical || '',
//                 persona    : DOMdata.persona || '',
//                 publisher  : DOMdata.publisher || '',
//                 source     : DOMdata.source || '',
//                 publishDate: DOMdata.publishdate || ''
//             }
//         };
//         att.entbus.overlay.buildVideo(options);
//     },
    
//     invokeOverlayPodCast = function (ele) {
//         var DOMdata = $(ele).data(),
//             options = {
//                 title: DOMdata.name,
//                 podCast: DOMdata.podcast
//             };
//         att.entbus.overlay.buildPodCast(options);
//     },

//     handleHtml5VideoPlay = function ($ele) {
//         var html5Video = $ele.parents('.html5-video-container').find('video')[0];
//         if (html5Video.paused === true) { 
//             html5Video.play();
//             $ele.find(selector.html5PlayInput).prop('checked', false); 
//             // $(selector.html5PlayInput).prop('checked', false);
//         } else { 
//             html5Video.pause(); 
//             $ele.find(selector.html5PlayInput).prop('checked', true);
//             // $(selector.html5PlayInput).prop('checked', true); 
//         }
//     },

//     html5VideoStart = function () {
//         var sources,
//             videos;
//         if(isLoadVideo) {
//             sources = $(selector.html5Video).find('source');
//             videos = $(selector.html5Video);
//             for (var i = 0, len = sources.length; i < len; i++ ) {
//                 sources[i].setAttribute('src', sources[i].dataset.src);
//             }
//             if(videos.length > 0) {
//             	for(var j=0; j<videos.length; j++){
//                     videos[j].load();
//                 }
//             }
//         }
//     },

//     bindEvents = function () {
//         $(selector.marqueeHeadingContainer).on('click', selector.playButton, function (e) {
//             var $podcast = $(this).data('podcast');
//             e.preventDefault();
//             if (typeof $podcast !== 'undefined' && $podcast !== '') {
//                 invokeOverlayPodCast(this);
//             } else {
//                 invokeOverlayVideo(this);
//             }
//         }); 
//         $(selector.html5PlayButton).on('click', function () { handleHtml5VideoPlay($(this)) });
        
//         // Pause video if mouse over more than 3 seconds
//         $(selector.html5VideoContainer).on('mouseover', function () {
//             var html5Video = $(this).find(selector.html5Video);
//             pauseTimer = setTimeout( function () {
//                 if (pauseTimer && !html5Video.paused) {
//                     html5Video.pause();
//                     $('#playpause').prop('checked', true);
//                 }
//             }, 3000);
//         });
//         $(selector.html5VideoContainer).on('mouseout', function () {
//             clearTimeout(pauseTimer);
//         });
//     },
    
//     setAutoPlay = function ($ele) {
//         if ($ele.data('autoplay')) {
//             options.autoplay = {
//                 delay: config.delay,
//                 waitForTransition: false
//             }
//         } else {
//             delete options.autoplay;
//         }
//     },

//     init = function () {

//         // load video in screen greater than 768 pixels
//         isLoadVideo = ( $(window).width() > 768 ) ? true : false;
//         html5VideoStart();
//     };

//     // execute when DOM ready
//     // $(function () {
//         init();
//         bindEvents();
//     //});

// })(jQuery.noConflict(), window, document);

/**
 * video-overlay component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires namespace.js (size: 3kb) - already included with ytplayer
 * @requires ytplayer library
 */ 
;(function ($, window, document, undefined) {
    var module, 
    stack,
    configs = {
        defaultTitle: {
            video: 'Video Title',
            podCast: 'Podcast Title'
        }
    },
    selector = {
        componentClass: '.video-overlay',
        closeButton: '.video-overlay .video-close-button',
        mask: '.video-overlay .video-background-mask',
        overlay: '.video-overlay .video-foreground',
        title: '.video-overlay .video-title',
        overlayContainer: '.video-overlay .video-container'
    },

    closeVideoOverlay = function () {
        $(selector.mask).hide();
        $(selector.overlay).hide();
    },
        
    openVideoOverlay = function () {
        $(selector.mask).show();
        $(selector.overlay).show();
    },
        
    showOverlay = function () {
        $(selector.componentClass).show();
        $('html, body').addClass('modal-open');
        $(window.parent.document.getElementById('ContentScrollView')).css('overflow','visible');
        openVideoOverlay();
    },

    hideOverlay = function () {
        $(selector.componentClass).hide();
        $('html, body').removeClass('modal-open');
        $(window.parent.document.getElementById('ContentScrollView')).css('overflow','scroll');

        closeVideoOverlay();
        //TODO: find better logic to determine video 
        if ($(selector.closeButton).parents('.video-overlay').find('.podcast-iframe').length > 0) {
            $(selector.overlayContainer).find('iframe').remove();
        } else {
            att.entbus.ytPlayer.removePlayer(YT.get($('.video-overlay iframe').attr('id')));
        }
    },
        
    updateTitle = function (title) {
        if(typeof title !== 'undefined' && title !== '') 
            $(selector.title).html(title);
    },
    
    setFullscreen = function () {
        if($(window).width() < 768) {
            // wait until youtube player iframe loads
            setTimeout(function() {
                iframe = $('#overlay-youtube-player');
                requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
                if(requestFullScreen) requestFullScreen.bind(iframe)();
            }, 1000);
        }
    },

    buildVideo = function (options) {
        var requestFullScreen,
            template = [], 
            players = [],
            videoId = options.data.video,  // mandatory field
            iframe,
            title,
        
        buildTemplate = function () {
            template.push('<div class="overlay-youtube-player"');
            template.push('    data-width="1000" data-height="562"');
            template.push('    data-src="'        +options.data.video      +'"');
            template.push('    data-title="'      +options.data.title      +'"');
            template.push('    data-series="'     +options.data.series     +'"');
            template.push('    data-objective="'  +options.data.objective  +'"');
            template.push('    data-category="'   +options.data.category   +'"');
            template.push('    data-vertical="'   +options.data.vertical   +'"');
            template.push('    data-persona="'    +options.data.persona    +'"');
            template.push('    data-publisher="'  +options.data.publisher  +'"');
            template.push('    data-source="'     +options.data.source     +'"');
            template.push('    data-publishdate="'+options.data.publishdate+'"');
            template.push('    data-mediatype="'  +options.data.mediatype  +'"');
            template.push('    data-mediaclass="' +options.data.mediaclass +'"');
            template.push('    data-mediafriendlyname="'+options.data.mediafriendlyname+'"');
            template.push('    frameborder="0">');
            template.push('</div>');
            template = template.join('');
            $(selector.overlayContainer).html(template);
        },
            
        setVideoOverlayTitle = function () {
            // wait until youtube player iframe loads
            setTimeout(function() {
                players = att.entbus.ytPlayer.getPlayers();
                players.map(function (player, index) {
                    if (player && typeof player.getVideoData === 'function' && player.getVideoData().video_id === videoId) {
                        title = player.getVideoData().title;
                    }
                });
                // Order of preference: data attribute, youtube API, static text
                title = $(this).data().title || title || configs.defaultTitle.video;
                updateTitle(title);
            }, 2000);
        };

        
        window.attbus.showOverlay();
        buildTemplate();
        att.entbus.ytPlayer.setPlayers('overlay-youtube-player', {autoRun: true});
        setFullscreen();
        setVideoOverlayTitle();
    },
    
    /**
     * Expecting options.podCast value
     */
    buildPodCast = function (options) {
        var template = [],
            // sample podcast id 34019569
            src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+options.podCast+'&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
        
        buildTemplate = function () {
            template.push('<iframe class="podcast-iframe" width="100%" scrolling="no" frameborder="no" allow="autoplay"');
            template.push('src="'+src+'"');
            template.push('</iframe>');
            template = template.join('');
            $(selector.overlayContainer).html(template);
        },
        
        setPodCastOverlayTitle = function (title) {
            title = title || configs.defaultTitle.video;
            updateTitle(title)
        };
        
        window.attbus.showOverlay();
        buildTemplate();
        setFullscreen();
        setPodCastOverlayTitle(options.title);
    },

    bindEvents = function () {
        $(selector.closeButton).bind('click', hideOverlay);
    };

    // execute when DOM ready
    $(function () {
        bindEvents();
        $(window).bind('DM_DOC_READY', function() { stack = new edmPropertyStack(ddo);});
    });
    
    module = {
        showOverlay: showOverlay,
        hideOverlay: hideOverlay,
        setTitle: updateTitle,
        buildVideo: buildVideo,
        buildPodCast: buildPodCast
    }

    // exposing methods to outside world
    Namespacer('att.entbus.overlay', module);
    
    // TODO: Delete below line after deleting all calls like attbus.showOverlay(), attbus.hideOverlay();
    window.attbus = module;
    
})(jQuery.noConflict(), window, document);
function init_tabbed_content() {
    (function ($) {
        var searchParams = new URLSearchParams(window.location.search);
        $(".tabset").each(function (i, el) {
            var $tabset = $(el);
            var isTabsetInitialized = $tabset.attr("data-init");
            var tc = $tabset.attr("data-tc");
            var $found;

            if (!isTabsetInitialized) {
                $tabset.find(".tab-input").click(function () {
                    var $this = $(this);
                    var params = new URLSearchParams(window.location.search);
                    $tabset.find(".tab-panel").hide();
                    $tabset.find("#" + String($this.attr("aria-controls"))).show();
                    params.set($this.attr("name"), $this.attr("id"));
                    // window.history.pushState(null, null, [window.location.pathname, ('?' + params.toString()), window.location.hash].join(''))
                });
                $tabset.attr("data-init", true);
            }

            if (searchParams.has(tc)) {
                $found = $tabset.find('#' + String(searchParams.get(tc)));
            }

            if ($found && $found.length) {
                $found.click();
            } else {
                $tabset.find(".tab-input:first-child").click();
            }
        });
    })(jQuery);
};
    /**
 * table-comparison component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires Swiper javascript library
*/

;(function ($, window, document, undefined) {
    
    var 
    sliders = [],
    // TODO: move css selectors here
    selectors = {
        swiperContainer: '.table-comparison .comparison-swiper-container'
    },
    options =  {
        init: false,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '',
            prevEl: ''
        },
        slidesPerView: 3,
        breakpoints: {
            // when window width is <= 1024
            1024: {
                slidesPerView: 'auto'
            }
        }
    },
    
    setPlanDefaultSelection = function () {
        $('.table-comparison').find('select').each(function(i) {
            var options = $(this).find('option');
            var defaultOption = $(this).attr("data-default-option");

            $.each(options, function(index, value) {
                if($(value).val() === defaultOption) { 
                    $(this).attr("selected", ''); 
                }
            });
            
            $(this).trigger("change");
        });
    },
    
    handlePlanChange = function(event) {
        var text  = "", 
            label = "", 
            price = "";
        
        for(var i = 0, len = event.target.options.length; i < len; i++) {
            if(event.target.options[i].selected) {
                text  = event.target.options[i].innerText;
                label = text;
                price = event.target.options[i].dataset.value;

                $(event.target).parent().parent().find('.features-list').each(function() { $(this).hide(); });
            }
        }
        
        $(event.target).parent().parent().find('.plan-price').html("<span>" + (typeof price === 'undefined' ? '' : price) + "</span>");
        $(event.target).parent().parent().find('.price-option-label').html("<span>" + label + "</span>");
        
        label = label.trim().replace(/[^a-zA-Z0-9]/g,'');
        $(event.target).closest('.plan-details').find('.features-list#i' + label).show();
    },

    handleNavigation = function () {
        if ((window.innerWidth || document.documentElement.clientWidth) >= 768 && this.totalTiles <= 3) {
            $(this.navigation.nextEl).addClass('hidden');
            $(this.navigation.prevEl).addClass('hidden');
        } else {
            $(this.navigation.nextEl).removeClass('hidden');
            $(this.navigation.prevEl).removeClass('hidden');
        }
        this.update();
    },

    init = function () {
        $(selectors.swiperContainer).each(function (index, element) {
            var slider,
                totalTiles = $(this).find('.swiper-slide').length;
            $(this).addClass('tc' + index);
            options.navigation.nextEl = '.tc' + index + ' ~ .swiper-button-next';
            options.navigation.prevEl = '.tc' + index + ' ~ .swiper-button-prev';
            slider = new Swiper('.tc' + index, options);
            slider.totalTiles = totalTiles;
            slider.on('init', handleNavigation);
            slider.init();
            sliders.push(slider);
        });
    },
    
    bindEvents = function () {
        setPlanDefaultSelection();
    };

    $(document).ready(function() {
        init();
        
      //this must be above so the default option runs once without click
    	$('.plan-dropdown > select').on('change', function (e) { handlePlanChange(e) });
        
        bindEvents();
    });

})(jQuery.noConflict(), window, document);
/**
 * Product card component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires swiper javascript library
 */ 
;(function ($, window, document, undefined) {
    var sliders = [],
    selectors = {
        componentClass: '.product-card',
        swiperDefaultTarget: '.product-card .default-view .product-card-swiper-container',
        swiperDiscountsTarget: '.product-card .discounts-view .product-card-swiper-container'
    },

    options = {
        defaultView: {
            init: false,
            slidesPerView: 2,
            watchOverflow: true,
            spaceBetween: 24,
            navigation: {
                nextEl: '',
                prevEl: ''
            },
             breakpoints: {
                // when window width is <= 1200
                1200: {
                    spaceBetween: 16,
                    slidesPerView: 'auto'
                }
            }
        },
        discountsView: {
            init: false,
            slidesPerView: 3,
            watchOverflow: true,
            spaceBetween: 5,
            navigation: {
                nextEl: '',
                prevEl: ''
            },
             breakpoints: {
                // when window width is <= 1200
                1200: {
                    spaceBetween: 5,
                    slidesPerView: 'auto'
                }
            }
        }
    },

    setInitialSLide = function ($ele) {
        var initialSlide = $ele.data('initialslide');
        if (initialSlide) {
            options.discountsView.initialSlide = parseInt(initialSlide);
        } else {
            delete options.discountsView.initialSlide;
        }
    },

    handleNavigation = function () {
        if ((window.innerWidth || document.documentElement.clientWidth) >= 1200 && this.totalTiles <= 2) {
            $(this.navigation.nextEl).addClass('hidden');
            $(this.navigation.prevEl).addClass('hidden');
        } else {
            $(this.navigation.nextEl).removeClass('hidden');
            $(this.navigation.prevEl).removeClass('hidden');
        }
        this.update();
    },
        
    init = function () {
        $(selectors.swiperDefaultTarget).each(function (index, element) {
            var slider,
                totalTiles = $(this).find('.swiper-slide').length;
            $(this).addClass('pc-default' + index);
            options.defaultView.navigation.nextEl = '.pc-default' + index + ' ~ .swiper-button-next';
            options.defaultView.navigation.prevEl = '.pc-default' + index + ' ~ .swiper-button-prev';
            slider = new Swiper('.pc-default' + index, options.defaultView);
            slider.totalTiles = totalTiles;
            slider.on('init', handleNavigation);
            slider.on('resize', function () { 
                if(window.innerWidth < 1200) {
                    for(var i=0; i<this.slides.length;i++) {
                        this.slides[i].style.width = '288px';
                    }
                    this.update();
                }
            });
            slider.init();
            sliders.push(slider);
        });
        $(selectors.swiperDiscountsTarget).each(function (index, element) {
            var slider,
                $this = $(this),
                totalTiles = $this.find('.swiper-slide').length;
            $this.addClass('pc-discounts' + index);
            setInitialSLide($this);
            options.discountsView.navigation.nextEl = '.pc-discounts' + index + ' ~ .swiper-button-next';
            options.discountsView.navigation.prevEl = '.pc-discounts' + index + ' ~ .swiper-button-prev';
            slider = new Swiper('.pc-discounts' + index, options.discountsView);
            slider.totalTiles = totalTiles;
            slider.on('init', handleNavigation);
            slider.init();
            sliders.push(slider);
        });
    };

    // execute when DOM ready
    $(function () {
        init();
    });
    
})(jQuery.noConflict(), window, document);
/**
 * content-teaser component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires Swiper javascript library
 * @requires video-overlay component
 */
 ;
 (function ($, window, document, undefined) {
 
 
    var setHeight = function (curr) {
        if($(curr).find(".col-xs-12").length > 1) {
            if ($(window).width() > 767 ) {
                $(curr).each(function (index) {
                    var maxHeight = 0;
                    $(this).find('.card-tile').height('auto');
                    $(this).find('.card-tile').each(function (index) {
                        if ($(this).height() > maxHeight)
                            maxHeight = $(this).height();
                    });
                    $(this).find('.card-tile').height(maxHeight);
                    $(this).find('.card-tile').data("height",maxHeight)
                });
            }
        }
    },

    removeTags = function(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
              
        return str.replace( /(<([^>]+)>)/ig, '');
    },

     init = function () {
        if($(".link-section a").hasClass("modal-anchor")) {
            $(".link-section a").removeClass("att-track");
        }
         $.each( $(".offersCard"), function( key, value ) {
            //  setHeight($(value));
             setTimeout(setHeight($(value)), 1500);
           });
     };
 
     $(function () {
         init();
         $('.accordion-trigger').on('click', function () {
            
            if(typeof att.adobeDataLayerManager !== 'undefined') {
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataOnClick(event, {
                    'slotFriendlyName'   : 'Offers card',
                    'contentFriendlyName': $(this).data("name"),
                    'linkName'           : $(this).find(".show-text").text(),
                }));
            }
             $(this).parent().find(".accordion-panel").toggle();
             $(this).toggleClass("expanded");
             $(this).closest(".content-section").find(".subHeading").toggle();
             $(this).attr('aria-expanded', $(this).hasClass("expanded") ? 'true' : 'false');
             $(this).find(".show-text").text() === $(this).data("moretext") ? $(this).find(".show-text").text($(this).data("lesstext")) : $(this).find(".show-text").text($(this).data("moretext"));
             
             if($(this).parent().find(".accordion-panel").is(':visible')) {
                 $(this).closest(".card-tile").height("auto");
             } else {
                
                if ($(window).width() > 768) {
                    $(this).closest(".card-tile").height($(this).closest(".card-tile").data("height"));
                }
             }
             
         });
         $(".link-section a").each(function( i, val ) {
            var locName = $(this).attr("data-name"), buttText = "", optText = "";
            if(locName != undefined) {
                locName = removeTags(locName);
                locName = locName.replace(/^(.{20}[^\s]*).*/, "$1");
                locName = locName.trim();
                buttText = locName +" - "+ $(this).text();
                $(this).attr('data-name',buttText);
            } else {
                $(this).attr('data-name',$(this).text());
            }
          });

          $(".link-section a").on("click", function() {
            if(typeof att.adobeDataLayerManager !== 'undefined') {
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataOnClick(event, {
                    'slotFriendlyName'   : 'Offers card',
                    'contentFriendlyName': $(this).data("name"),
                    'linkName'           : $(this).data("name"),
                }));
            }
          });
         
     });
 
 })(jQuery.noConflict(), window, document);
/**
 * Legal text component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 */

;(function ($, window, document, undefined) {

    var container,
    selectors = {
        legalTextWrapper: '.legal-text .wrapper'
    },

    setBorder = function () {
        // TODO: Remove inline styles to proper class in .css file
        if (typeof container[0] !== 'undefined' && container[0].scrollHeight > 205) {
            container.css('border', '1px solid #d2d2d2');
        } else {
            container.css('border', 'none');
        }
    },

    init = function () {
        container = $(selectors.legalTextWrapper);
    };

    // Run after DOM ready
    $(function () {
        init();
        setBorder();
    });

})(jQuery.noConflict(), window, document);
/**
 * image-text component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires video-overlay component
 * @requires ytplayer library
 */ 
;(function ($, window, document, undefined) {
    var pauseTimer,
    pauseTimerMarquee,
    isLoadVideo,
    config = {
        delay: 6000
    };
    var selector = {
        componentContainer: '.image-text-business',
        playButton: '.play-icon-container',
		watchButton: '.image-text-play-icon-container',
        overlayContainer: '.video-overlay .video-container',
        html5PlayButton: '.image-video-container .playpause',
        html5PlayInput: '.imgPlaypause',
        html5VideoContainer: '.image-video-autoplay',
        html5Video: '.image-video-container video'
    },
        
    invokeOverlayVideo = function (ele) {
        var DOMdata = $(ele).data(),
        options = {
            data: {
                video      : DOMdata.video,
                title      : DOMdata.title || '',
                series     : DOMdata.series || '',
                objective  : DOMdata.objective || '',
                category   : DOMdata.category || '',
                vertical   : DOMdata.vertical || '',
                persona    : DOMdata.persona || '',
                publisher  : DOMdata.publisher || '',
                source     : DOMdata.source || '',
                publishdate: DOMdata.publishdate || '',
                mediatype  : DOMdata.mediatype || '',
                mediaclass : DOMdata.mediaclass || '',
                mediafriendlyname: DOMdata.mediafriendlyname || ''
            }
        };
        att.entbus.overlay.buildVideo(options);
    },

    invokeOverlayPodCast = function (ele) {
        var DOMdata = $(ele).data(),
            options = {
                title: DOMdata.name,
                podCast: DOMdata.podcast
            };
        att.entbus.overlay.buildPodCast(options);
    },
    handleHtml5VideoPlay = function ($ele) {
        var html5Video = $ele.parents('.image-video-container').find('video')[0];
        if (html5Video.paused === true) { 
            html5Video.play();
            $ele.find(selector.html5PlayInput).prop('checked', false); 
            // $(selector.html5PlayInput).prop('checked', false);
        } else { 
            html5Video.pause(); 
            $ele.find(selector.html5PlayInput).prop('checked', true);
            // $(selector.html5PlayInput).prop('checked', true); 
        }
    },

    html5VideoStart = function () {
        var sources,
            videos;
        //if(isLoadVideo) {
            sources = $(selector.html5Video).find('source');
            videos = $(selector.html5Video);
            
            for (var i = 0, len = sources.length; i < len; i++ ) {
                sources[i].setAttribute('src', sources[i].dataset.src);
            }
            if(videos.length > 0) {
            	for(var j=0; j<videos.length; j++){
                    videos[j].load();
                }
            }
        // }
    },


    bindEvents = function () {
        $(selector.componentContainer).on('click', selector.playButton, function (e) {
            var $podcast = $(this).data('podcast');
            e.preventDefault();
            if (typeof $podcast !== 'undefined' && $podcast !== '') {
                invokeOverlayPodCast(this);
            } else {
                invokeOverlayVideo(this);
            }
        });
		$(selector.componentContainer).on('click', selector.watchButton, function (e) {
            var $podcast = $(this).data('podcast');
            e.preventDefault();
            if (typeof $podcast !== 'undefined' && $podcast !== '') {
                invokeOverlayPodCast(this);
            } else {
                invokeOverlayVideo(this);
            }
        });
        $(selector.html5PlayButton).on('click', function () { 
            handleHtml5VideoPlay($(this));
            return false;
        });
        
        // Pause video if mouse over more than 3 seconds
        $(selector.html5VideoContainer).on('mouseover', function () {
            var html5VideoElem = $(this).find(selector.html5Video);
            var self = this; 
            if(html5VideoElem?.length) {
                pauseTimer = window.setTimeout( function () {
                    if (pauseTimer && !html5VideoElem.paused) {
                        html5VideoElem[0].pause();
                        $(self).find(selector.html5PlayInput).prop('checked', true);
                        // $(selector.html5PlayInput).prop('checked', true);
                    }
                }, 3000);
            }
            
        });
        $(selector.html5VideoContainer).on('mouseout', function () {
            window.clearTimeout(pauseTimer);
        });

    };

    // execute when DOM ready
    $(function () {
        html5VideoStart();
        bindEvents();
    });
    
})(jQuery.noConflict(), window, document);



/* 
* headband component swiper implementation
* @required jQuery javascript library
* @required Swiper javascript library
*/
;(function($, window, document, undefined) {

    var swiper,
    selectors = {
        swiperTarger: '.headband-swiper-container'
    },

    init = function () {
        var is_iPad = navigator.userAgent.match(/iPad/i) != null;
        if($(selectors.swiperTarger).length > 0){
            swiper = new Swiper (selectors.swiperTarger, {
            slidesPerView: 'auto',
            watchOverflow: true
            });        
        }
        if(is_iPad){
    		$('.headband-swiper-container ul').css('justify-content','left');
    	}
    };
    // Execute after DOM ready
    $(function () {
       init();
    });

})(jQuery.noConflict(), window, document);





/** 
 * Featured Products component implementation
 * Assumed only one instance of Featured Products component present in the page
 */
 ;(function($, window, document, undefined) {
    
    var 
    config = {
        // in milliseconds
        delay: 2000
    },
    
    selectors = {
        accordionBody: '.featured-products .accordion-body'
    },
    
    openAccordion = function () {
        $(selectors.accordionBody).collapse('show');
        $(".featured-products .accordion-body, .section-content").removeAttr("aria-expanded");
    },
    
    init = function () {
        // Run after config.delay milliseconds
        setTimeout(openAccordion, config.delay);
    };
    
    // Run after DOM ready
    $(function () {
        init();
        // Accessibility Issues for accordion.
        $(".accordion-title button").keyup(function (e) {
            var ev = window.event ? window.event : e;
            if (ev.keyCode == 13 || ev.keyCode == 32) {
                $(this).trigger('click');
                if($(this).attr("aria-expanded") == "true") {
                    $(this).closest(".featured-products").find(".accordion-body").attr("tabindex","0");
                } else {
                    $(this).closest(".featured-products").find(".accordion-body").attr("tabindex","-1");
                }
            }
        });
        $(document).on('click', '.featured-products .accordion-title-content', function (e) {
            $(this).closest(".featured-products").find(".accordion-body").removeAttr("aria-expanded");
        });
    });

})(jQuery.noConflict(), window, document);

/**
 * Dealer lookup implementation
 * @requires dealerList.json and dealierList_senior.json
 */
;(function(window, document, $, undefined) {

    var dataCache,
        selector = {
            choose: '#dl-search',
            search: '#dl-search-term',
            update: '.result-list.dl-two-col ul',
            dealerMessage: '#dealerMessage',
            resultCount: '.result-count-container .result-count',
            resultEmpty : '.results-nothing',
            resultsExists : '.results-exists'
        },
        config = {
            seniorIdentifier: 'senior-living-tv',
            // TODO: migrate these to AEM environment
            // TODO: add correct path after migrating
            urls: {
                cms      : '/content/includes/dealerList.json',
                cmsSenior: '/content/includes/dealerList_senior.json'
            }
        },
        dealerType = {
            normal: 'DEALERLIST',
            senior: 'DEALERLIST_SENIOR'
        },
        // value automaticallly set on initialization of the module
        currentDealerType,
        text = {
            noDealer     : 'We didnt find any dealers who service your zip code',
            onlyOneDealer: 'We found 1 dealer who services your zip code',
            manyDealers  : 'We found ##count## dealers who service your zip code.',
            notValidZip  : 'Please enter a valid zip code.',
            searching    : 'Searching ...'
        },
        jsonUrl;

		function emptyDealermsg (){
			$(selector.dealerMessage).empty();
		}

    var getData = function (callBack) {
        $.getJSON(jsonUrl, function(data) {
            // Store in cache memory for further use
            dataCache = data;
            if(callBack && typeof callBack === 'function') {
                callBack(data);
				emptyDealermsg();
            }
        });
    }, 

    buildResult = function(data) {
        var zipLength,
            output        = '',
            dealerMessage = '',
            showChoice    = $(selector.search).val(),
            myExp         = new RegExp(showChoice, "i"),
            firstPart     = '<li><div class="dealer-name">',
            secondPart    = '</div><div class="dealer-phone"><a href="tel:',
            thirdPart     = '">',
            forthPart     = '</a></div></li>',
            composeMessage = function(count) {
                return text.manyDealers.replace('##count##', count)
            };
        // Add to form variables
        $.each(data, function(key, val) {            
            if (val.zip.search(myExp) != -1) {
				emptyDealermsg();
                zipLength = val.info.length;
                switch (zipLength) {
                    case 0:
                        dealerMessage = text.noDealer;
                        break;
                    case 1:
                        dealerMessage = text.onlyOneDealer;
                        break;
                    default:
                        dealerMessage = composeMessage(zipLength);
                        break;
                }
                switch (currentDealerType) {
                    case dealerType.normal:
                        for (var i = 0; i < zipLength; i++) {
                            var theAddressIndex = val.info[i];
                            // TODO: Come up with a better logic
                            if (theAddressIndex == "65129") {
                                output += firstPart + 'ALLSTAR SYSTEMS.TV LLC' + secondPart + '518-746-9600' + thirdPart + '518-746-9600' + forthPart;
                            } else if (theAddressIndex == "42933") {
                                output += firstPart + 'TRI STATE MUSIC & VIDEO' + secondPart + '505-771-8005' + thirdPart + '505-771-8005' + forthPart;
                            } else if (theAddressIndex == "52557") {
                                output += firstPart + 'SOUND MARKETING/ITS ALL ABOUT' + secondPart + '505-296-9423' + thirdPart + '505-296-9423' + forthPart;
                            } else if (theAddressIndex == "52557") {
                                output += firstPart + 'SOUND MARKETING INC' + secondPart + '505-296-9423' + thirdPart + '505-296-9423' + forthPart;
                            } else if (theAddressIndex == "18305") {
                                output += firstPart + 'SUNRISE ENTERPRISES' + secondPart + '806-935-5523' + thirdPart + '806-935-5523' + forthPart;
                            } else if (theAddressIndex == "59498") {
                                output += firstPart + 'ALVI SATELLITES' + secondPart + '678-957-8700' + thirdPart + '678-957-8700' + forthPart;
                            } else if (theAddressIndex == "59498") {
                                output += firstPart + 'ALVI, LLC.' + secondPart + '678-957-8700' + thirdPart + '678-957-8700' + forthPart;
                            } else if (theAddressIndex == "59999") {
                                output += firstPart + 'MEDIAWORKS' + secondPart + '770-352-0222' + thirdPart + '770-352-0222' + forthPart;
                            } else if (theAddressIndex == "59999") {
                                output += firstPart + 'TRASK COMMUNICATIONS LLC' + secondPart + '770-352-0222' + thirdPart + '770-352-0222' + forthPart;
                            } else if (theAddressIndex == "15721") {
                                output += firstPart + 'STARVISION SATELLITE TECHNOLOG' + secondPart + '228-831-1720' + thirdPart + '228-831-1720' + forthPart;
                            } else if (theAddressIndex == "58320") {
                                output += firstPart + 'CUSTOMER 1ST SATELLITE' + secondPart + '256-831-7703' + thirdPart + '256-831-7703' + forthPart;
                            } else if (theAddressIndex == "59617") {
                                output += firstPart + 'FLAGSTAFF FINANCIAL INC.' + secondPart + '847-330-6000' + thirdPart + '847-330-6000' + forthPart;
                            } else if (theAddressIndex == "35221") {
                                output += firstPart + 'SENIOR TV' + secondPart + '330-633-7000' + thirdPart + '330-633-7000' + forthPart;
                            } else if (theAddressIndex == "60665") {
                                output += firstPart + 'ELAUWIT VIDEO DTV, LLC' + secondPart + '803-978-6090' + thirdPart + '803-978-6090' + forthPart;
                            } else if (theAddressIndex == "66234") {
                                output += firstPart + 'DIRECT VISION' + secondPart + '361-738-2061' + thirdPart + '361-738-2061' + forthPart;
                            } else if (theAddressIndex == "17051") {
                                output += firstPart + 'GOLD STAR SYSTEMS INC' + secondPart + '972-495-4075' + thirdPart + '972-495-4075' + forthPart;
                            } else if (theAddressIndex == "31651") {
                                output += firstPart + 'SkYPATH SATELLITE SYSTEMS INC' + secondPart + '817-488-2300' + thirdPart + '817-488-2300' + forthPart;
                            } else if (theAddressIndex == "64406") {
                                output += firstPart + 'GALAXY1 MARKETING' + secondPart + '309-314-4888' + thirdPart + '309-314-4888' + forthPart;
                            } else if (theAddressIndex == "15746") {
                                output += firstPart + 'ADVANCED SATELLITE COMMUNICATION' + secondPart + '734-838-3280' + thirdPart + '734-838-3280' + forthPart;
                            } else if (theAddressIndex == "62133") {
                                output += firstPart + 'SOLIDSIGNAL.COM' + secondPart + '248-479-2210' + thirdPart + '248-479-2210' + forthPart;
                            } else if (theAddressIndex == "62133") {
                                output += firstPart + 'THE SIGNAL GROUP, LLC' + secondPart + '248-479-2210' + thirdPart + '248-479-2210' + forthPart;
                            } else if (theAddressIndex == "59323") {
                                output += firstPart + 'NEW EDGE SATELLITE INC.' + secondPart + '989-781-1635' + thirdPart + '989-781-1635' + forthPart;
                            } else if (theAddressIndex == "59571") {
                                output += firstPart + 'RETIREMENTHOMETV CORPORATION' + secondPart + '260-471-3474' + thirdPart + '260-471-3474' + forthPart;
                            } else if (theAddressIndex == "67049") {
                                output += firstPart + 'UNITED SOLUTION' + secondPart + '336-793-3508' + thirdPart + '336-793-3508' + forthPart;
                            } else if (theAddressIndex == "61562") {
                                output += firstPart + 'ACTIVE NETWORKS, LLC' + secondPart + '717-540-5679' + thirdPart + '717-540-5679' + forthPart;
                            } else if (theAddressIndex == "49032") {
                                output += firstPart + 'ORBITECH SATELLITE SERVICE LLC' + secondPart + '860-747-4868' + thirdPart + '860-747-4868' + forthPart;
                            } else if (theAddressIndex == "33349") {
                                output += firstPart + 'Sight & Sound' + secondPart + '281-499-4373' + thirdPart + '281-499-4373' + forthPart;
                            } else if (theAddressIndex == "33349") {
                                output += firstPart + 'SIGHT AND SOUND TELEVISION LLC' + secondPart + '281-499-4373' + thirdPart + '281-499-4373' + forthPart;
                            } else if (theAddressIndex == "67392") {
                                output += firstPart + 'BIG DOG STORE HOLDINGS LLC' + secondPart + '208-242-3352' + thirdPart + '208-242-3352' + forthPart;
                            } else if (theAddressIndex == "66207") {
                                output += firstPart + 'HDTV LLC' + secondPart + '904-206-2915' + thirdPart + '904-206-2915' + forthPart;
                            } else if (theAddressIndex == "40538") {
                                output += firstPart + 'SPACE CONNECTION' + secondPart + '423-442-5080' + thirdPart + '423-442-5080' + forthPart;
                            } else if (theAddressIndex == "32449") {
                                output += firstPart + 'MTV INC' + secondPart + '818-772-4200' + thirdPart + '818-772-4200' + forthPart;
                            } else if (theAddressIndex == "32737") {
                                output += firstPart + 'DIRECT DIGITAL SYSTEM' + secondPart + '213-784-5633' + thirdPart + '213-784-5633' + forthPart;
                            } else if (theAddressIndex == "46603") {
                                output += firstPart + 'DTVSATCOMM INC' + secondPart + '562-272-7200' + thirdPart + '562-272-7200' + forthPart;
                            } else if (theAddressIndex == "58113") {
                                output += firstPart + 'Commercial Satellite Sales LLC' + secondPart + '714-844-9063' + thirdPart + '714-844-9063' + forthPart;
                            } else if (theAddressIndex == "60478") {
                                output += firstPart + 'JUST IN TIME COMMUNICATIONS' + secondPart + '888-985-3777' + thirdPart + '888-985-3777' + forthPart;
                            } else if (theAddressIndex == "66332") {
                                output += firstPart + 'HD STELLITE SYSTEMS' + secondPart + '800-214-3487' + thirdPart + '800-214-3487' + forthPart;
                            } else if (theAddressIndex == "61573") {
                                output += firstPart + 'STAR CONNECTION LLC' + secondPart + '608-355-2025' + thirdPart + '608-355-2025' + forthPart;
                            } else if (theAddressIndex == "67710") {
                                output += firstPart + 'PIONEER SIGHT AND SOUND INC' + secondPart + '901-388-9954' + thirdPart + '901-388-9954' + forthPart;
                            } else if (theAddressIndex == "69519") {
                                output += firstPart + 'BLUESKY' + secondPart + '786-487-8359' + thirdPart + '786-487-8359' + forthPart;
                            } else if (theAddressIndex == "12894") {
                                output += firstPart + 'AuFDERWORLD CORP' + secondPart + '763-233-7700' + thirdPart + '763-233-7700' + forthPart;
                            } else if (theAddressIndex == "62689") {
                                output += firstPart + 'CLEAR SIGHT & SOUND, INC' + secondPart + '952-746-1800' + thirdPart + '952-746-1800' + forthPart;
                            } else if (theAddressIndex == "65166") {
                                output += firstPart + 'MIDSOUTH SATELLITE LLC' + secondPart + '931-680-0068' + thirdPart + '931-680-0068' + forthPart;
                            } else if (theAddressIndex == "67875") {
                                output += firstPart + 'G PAUL TELECOMMUNICATIONS' + secondPart + '718-388-3973' + thirdPart + '718-388-3973' + forthPart;
                            } else if (theAddressIndex == "41630") {
                                output += firstPart + 'PRIVATEL INC' + secondPart + '732-974-1502' + thirdPart + '732-974-1502' + forthPart;
                            } else if (theAddressIndex == "63471") {
                                output += firstPart + 'Media master' + secondPart + '732-234-6091' + thirdPart + '732-234-6091' + forthPart;
                            } else if (theAddressIndex == "59491") {
                                output += firstPart + 'SONU SATELLITE' + secondPart + '856-753-6300' + thirdPart + '856-753-6300' + forthPart;
                            } else if (theAddressIndex == "61230") {
                                output += firstPart + 'DIRECTVIEW' + secondPart + '888-926-5423' + thirdPart + '888-926-5423' + forthPart;
                            } else if (theAddressIndex == "62950") {
                                output += firstPart + 'SATELLITE OPERATIONS, LLC' + secondPart + '480-456-4220' + thirdPart + '480-456-4220' + forthPart;
                            } else if (theAddressIndex == "13625") {
                                output += firstPart + 'TELERENT LEASING' + secondPart + '919-772-8604' + thirdPart + '919-772-8604' + forthPart;
                            } else if (theAddressIndex == "52142") {
                                output += firstPart + 'BULK TV & INTERNET' + secondPart + '919-850-3208' + thirdPart + '919-850-3208' + forthPart;
                            } else if (theAddressIndex == "60697") {
                                output += firstPart + 'C3 INC' + secondPart + '801-260-9095' + thirdPart + '801-260-9095' + forthPart;
                            } else if (theAddressIndex == "67610") {
                                output += firstPart + 'NEW STAR COMMUNICATIONS, INC' + secondPart + '801-852-0804' + thirdPart + '801-852-0804' + forthPart;
                            } else if (theAddressIndex == "61986") {
                                output   += firstPart + 'COMMERCIAL CONNECT TELEVISION<' + secondPart + '858-200-8301' + thirdPart + '858-200-8301' + forthPart;
                            } else if (theAddressIndex == "48562") {
                                output   += firstPart + 'TOTAL MEDIA CONCEPTS INC' + secondPart + '650-341-2300' + thirdPart + '650-341-2300' + forthPart;
                            } else if (theAddressIndex == "46604") {
                                output += firstPart + 'AMERICAN TECHCORP' + secondPart + '253-682-1240' + thirdPart + '253-682-1240' + forthPart;
                            } else if (theAddressIndex == "35246") {
                                output  += firstPart + 'SONIFI INTERACTIVE' + secondPart + '888-425-4813' + thirdPart + '888-425-4813' + forthPart;
                            } else if (theAddressIndex == "51191") {
                                output  += firstPart + 'NationSat' + secondPart + '507-449-6010' + thirdPart + '507-449-6010' + forthPart;
                            } else if (theAddressIndex == "51191") {
                                output += firstPart + 'NATIONSAT INC' + secondPart + '507-449-6010' + thirdPart + '507-449-6010' + forthPart;
                            } else if (theAddressIndex == "47509") {
                                output  += firstPart + 'Sat Star Technologies LLC' + secondPart + '5166426599' + thirdPart + '5166426599' + forthPart;
                            } else if (theAddressIndex == "61094") {
                                output  += firstPart + 'PINNACLE COMMUNICATIONS CORP' + secondPart + '301-601-0777' + thirdPart + '301-601-0777' + forthPart;
                            } else if (theAddressIndex == "61094") {
                               output += firstPart + 'PINNACLEWEST' + secondPart + '301-601-0777' + thirdPart + '301-601-0777' + forthPart;
                            } else if (theAddressIndex == "60594") {
                                output  += firstPart + 'UNITED CABLE DIRECT INC' + secondPart + '316-265-5400' + thirdPart + '316-265-5400' + forthPart;
                            } else if (theAddressIndex == "59337") {
                                output  += firstPart + 'BROADBAND HOSPITALITY' + secondPart + '330-629-8848' + thirdPart + '330-629-8848' + forthPart;
                            } else if (theAddressIndex == "59337") {
                                output += firstPart + 'GREAT LAKES TELCOM, LTD' + secondPart + '330-629-8848' + thirdPart + '330-629-8848' + forthPart;
                            }
                        }
                        break;
                    case dealerType.senior:
                        for (var i = 0; i < zipLength; i++) {
                            var theAddressIndex = val.info[i];
                            if (theAddressIndex == "65129") {
                                output += firstPart + 'ALLSTAR SYSTEMS.TV LLC' + secondPart + '518-746-9600' + thirdPart + '518-746-9600' + forthPart;
                            } else if (theAddressIndex == "42933") {
                                output += firstPart + 'TRI STATE MUSIC & VIDEO' + secondPart + '505-771-8005' + thirdPart + '505-771-8005' + forthPart;
                            } else if (theAddressIndex == "52557") {
                                output += firstPart + 'SOUND MARKETING/ITS ALL ABOUT' + secondPart + '505-296-9423' + thirdPart + '505-296-9423' + forthPart;
                            } else if (theAddressIndex == "52557") {
                                output += firstPart + 'SOUND MARKETING INC' + secondPart + '505-296-9423' + thirdPart + '505-296-9423' + forthPart;
                            } else if (theAddressIndex == "18305") {
                                output += firstPart + 'SUNRISE ENTERPRISES' + secondPart + '806-935-5523' + thirdPart + '806-935-5523' + forthPart;
                            } else if (theAddressIndex == "59498") {
                                output += firstPart + 'ALVI SATELLITES' + secondPart + '678-957-8700' + thirdPart + '678-957-8700' + forthPart;
                            } else if (theAddressIndex == "59498") {
                                output += firstPart + 'ALVI, LLC.' + secondPart + '678-957-8700' + thirdPart + '678-957-8700' + forthPart;
                            } else if (theAddressIndex == "59999") {
                                output += firstPart + 'MEDIAWORKS' + secondPart + '770-352-0222' + thirdPart + '770-352-0222' + forthPart;
                            } else if (theAddressIndex == "59999") {
                                output += firstPart + 'TRASK COMMUNICATIONS LLC' + secondPart + '770-352-0222' + thirdPart + '770-352-0222' + forthPart;
                            } else if (theAddressIndex == "15721") {
                                output += firstPart + 'STARVISION SATELLITE TECHNOLOG' + secondPart + '228-831-1720' + thirdPart + '228-831-1720' + forthPart;
                            } else if (theAddressIndex == "58320") {
                                output += firstPart + 'CUSTOMER 1ST SATELLITE' + secondPart + '256-831-7703' + thirdPart + '256-831-7703' + forthPart;
                            } else if (theAddressIndex == "59617") {
                                output += firstPart + 'FLAGSTAFF FINANCIAL INC.' + secondPart + '847-330-6000' + thirdPart + '847-330-6000' + forthPart;
                            } else if (theAddressIndex == "35221") {
                                output += firstPart + 'SENIOR TV' + secondPart + '330-633-7770' + thirdPart + '330-633-7770' + forthPart;
                            } else if (theAddressIndex == "60665") {
                                output += firstPart + 'ELAUWIT VIDEO DTV, LLC' + secondPart + '803-978-6090' + thirdPart + '803-978-6090' + forthPart;
                            } else if (theAddressIndex == "66234") {
                                output += firstPart + 'DIRECT VISION' + secondPart + '361-738-2061' + thirdPart + '361-738-2061' + forthPart;
                            } else if (theAddressIndex == "17051") {
                                output += firstPart + 'GOLD STAR SYSTEMS INC' + secondPart + '972-495-4075' + thirdPart + '972-495-4075' + forthPart;
                            } else if (theAddressIndex == "31651") {
                                output += firstPart + 'SkYPATH SATELLITE SYSTEMS INC' + secondPart + '817-488-2300' + thirdPart + '817-488-2300' + forthPart;
                            } else if (theAddressIndex == "64406") {
                                output += firstPart + 'GALAXY1 MARKETING' + secondPart + '309-314-4888' + thirdPart + '309-314-4888' + forthPart;
                            } else if (theAddressIndex == "15746") {
                                output += firstPart + 'ADVANCED SATELLITE COMMUNICATION' + secondPart + '734-838-3280' + thirdPart + '734-838-3280' + forthPart;
                            } else if (theAddressIndex == "62133") {
                                output += firstPart + 'SOLIDSIGNAL.COM' + secondPart + '248-479-2210' + thirdPart + '248-479-2210' + forthPart;
                            } else if (theAddressIndex == "62133") {
                                output += firstPart + 'THE SIGNAL GROUP, LLC' + secondPart + '248-479-2210' + thirdPart + '248-479-2210' + forthPart;
                            } else if (theAddressIndex == "59323") {
                                output += firstPart + 'NEW EDGE SATELLITE INC.' + secondPart + '989-781-1635' + thirdPart + '989-781-1635' + forthPart;
                            } else if (theAddressIndex == "59571") {
                                output += firstPart + 'RETIREMENTHOMETV CORPORATION' + secondPart + '260-471-3474' + thirdPart + '260-471-3474' + forthPart;
                            } else if (theAddressIndex == "67049") {
                                output += firstPart + 'UNITED SOLUTION' + secondPart + '336-793-3508' + thirdPart + '336-793-3508' + forthPart;
                            } else if (theAddressIndex == "61562") {
                                output += firstPart + 'ACTIVE NETWORKS, LLC' + secondPart + '717-540-5679' + thirdPart + '717-540-5679' + forthPart;
                            } else if (theAddressIndex == "49032") {
                                output += firstPart + 'ORBITECH SATELLITE SERVICE LLC' + secondPart + '860-747-4868' + thirdPart + '860-747-4868' + forthPart;
                            } else if (theAddressIndex == "33349") {
                                output += firstPart + 'Sight & Sound' + secondPart + '281-499-4373' + thirdPart + '281-499-4373' + forthPart;
                            } else if (theAddressIndex == "33349") {
                                output += firstPart + 'SIGHT AND SOUND TELEVISION LLC' + secondPart + '281-499-4373' + thirdPart + '281-499-4373' + forthPart;
                            } else if (theAddressIndex == "67392") {
                                output += firstPart + 'BIG DOG STORE HOLDINGS LLC' + secondPart + '208-242-3352' + thirdPart + '208-242-3352' + forthPart;
                            } else if (theAddressIndex == "66207") {
                                output += firstPart + 'HDTV LLC' + secondPart + '904-206-2915' + thirdPart + '904-206-2915' + forthPart;
                            } else if (theAddressIndex == "40538") {
                                output += firstPart + 'SPACE CONNECTION' + secondPart + '423-442-5080' + thirdPart + '423-442-5080' + forthPart;
                            } else if (theAddressIndex == "32449") {
                                output += firstPart + 'MTV INC' + secondPart + '818-772-4200' + thirdPart + '818-772-4200' + forthPart;
                            } else if (theAddressIndex == "32737") {
                                output += firstPart + 'DIRECT DIGITAL SYSTEM' + secondPart + '213-784-5633' + thirdPart + '213-784-5633' + forthPart;
                            } else if (theAddressIndex == "46603") {
                                output += firstPart + 'DTVSATCOMM INC' + secondPart + '562-272-7200' + thirdPart + '562-272-7200' + forthPart;
                            } else if (theAddressIndex == "58113") {
                                output += firstPart + 'Commercial Satellite Sales LLC' + secondPart + '714-844-9063' + thirdPart + '714-844-9063' + forthPart;
                            } else if (theAddressIndex == "60478") {
                                output += firstPart + 'JUST IN TIME COMMUNICATIONS' + secondPart + '888-985-3777' + thirdPart + '888-985-3777' + forthPart;
                            } else if (theAddressIndex == "66332") {
                                output += firstPart + 'HD STELLITE SYSTEMS' + secondPart + '800-214-3487' + thirdPart + '800-214-3487' + forthPart;
                            } else if (theAddressIndex == "61573") {
                                output += firstPart + 'STAR CONNECTION LLC' + secondPart + '608-355-2025' + thirdPart + '608-355-2025' + forthPart;
                            } else if (theAddressIndex == "67710") {
                                output += firstPart + 'PIONEER SIGHT AND SOUND INC' + secondPart + '901-388-9954' + thirdPart + '901-388-9954' + forthPart;
                            } else if (theAddressIndex == "69519") {
                                output += firstPart + 'BLUESKY' + secondPart + '786-487-8359' + thirdPart + '786-487-8359' + forthPart;
                            } else if (theAddressIndex == "12894") {
                                output += firstPart + 'AuFDERWORLD CORP' + secondPart + '763-233-7700' + thirdPart + '763-233-7700' + forthPart;
                            } else if (theAddressIndex == "62689") {
                                output += firstPart + 'CLEAR SIGHT & SOUND, INC' + secondPart + '952-746-1800' + thirdPart + '952-746-1800' + forthPart;
                            } else if (theAddressIndex == "65166") {
                                output += firstPart + 'MIDSOUTH SATELLITE LLC' + secondPart + '931-680-0068' + thirdPart + '931-680-0068' + forthPart;
                            } else if (theAddressIndex == "67875") {
                                output += firstPart + 'ADVANTECH NY INC' + secondPart + '718-388-3974' + thirdPart + '718-388-3974' + forthPart;
                            } else if (theAddressIndex == "41630") {
                                output += firstPart + 'PRIVATEL INC' + secondPart + '732-974-1502' + thirdPart + '732-974-1502' + forthPart;
                            } else if (theAddressIndex == "63471") {
                                output += firstPart + 'Media master' + secondPart + '732-234-6091' + thirdPart + '732-234-6091' + forthPart;
                            } else if (theAddressIndex == "59491") {
                                output += firstPart + 'SONU SATELLITE' + secondPart + '856-753-6300' + thirdPart + '856-753-6300' + forthPart;
                            } else if (theAddressIndex == "61230") {
                                output += firstPart + 'DIRECTVIEW' + secondPart + '888-926-5423' + thirdPart + '888-926-5423' + forthPart;
                            } else if (theAddressIndex == "62950") {
                                output += firstPart + 'SATELLITE OPERATIONS, LLC' + secondPart + '480-456-4220' + thirdPart + '480-456-4220' + forthPart;
                            } else if (theAddressIndex == "13625") {
                                output += firstPart + 'TELERENT LEASING' + secondPart + '919-772-8604' + thirdPart + '919-772-8604' + forthPart;
                            } else if (theAddressIndex == "52142") {
                                output += firstPart + 'BULK TV & INTERNET' + secondPart + '919-850-3208' + thirdPart + '919-850-3208' + forthPart;
                            } else if (theAddressIndex == "60697") {
                                output += firstPart + 'GROOVE Entertainment Technologies' + secondPart + '801-260-9095' + thirdPart + '801-260-9095' + forthPart;
                            } else if (theAddressIndex == "67610") {
                                output += firstPart + 'NEW STAR COMMUNICATIONS, INC' + secondPart + '801-852-0804' + thirdPart + '801-852-0804' + forthPart;
                            } else if (theAddressIndex == "61986") {
                                output += firstPart + 'COMMERCIAL CONNECT TELEVISION<' + secondPart + '858-200-8301' + thirdPart + '858-200-8301' + forthPart;
                            } else if (theAddressIndex == "48562") {
                                output += firstPart + 'TOTAL MEDIA CONCEPTS INC' + secondPart + '650-341-2300' + thirdPart + '650-341-2300' + forthPart;
                            } else if (theAddressIndex == "46604") {
                                output += firstPart + 'AMERICAN TECHCORP' + secondPart + '253-682-1240' + thirdPart + '253-682-1240' + forthPart;
                            } else if (theAddressIndex == "35246") {
                                output += firstPart + 'SONIFI INTERACTIVE' + secondPart + '888-425-4813' + thirdPart + '888-425-4813' + forthPart;
                            } else if (theAddressIndex == "51191") {
                                output += firstPart + 'NATIONSAT INC' + secondPart + '507-449-6010' + thirdPart + '507-449-6010' + forthPart;
                            } else if (theAddressIndex == "47509") {
                                output += firstPart + 'Sat Star Technologies LLC' + secondPart + '516-642-6599' + thirdPart + '516-642-6599' + forthPart;
                            } else if (theAddressIndex == "61094") {
                                output += firstPart + 'PINNACLE COMMUNICATIONS CORP' + secondPart + '301-601-0777' + thirdPart + '301-601-0777' + forthPart;
                            } else if (theAddressIndex == "61094") {
                                output += firstPart + 'PINNACLEWEST' + secondPart + '301-601-0777' + thirdPart + '301-601-0777' + forthPart;
                            } else if (theAddressIndex == "60594") {
                                output += firstPart + 'UNITED CABLE DIRECT INC' + secondPart + '316-265-5400' + thirdPart + '316-265-5400' + forthPart;
                            } else if (theAddressIndex == "59337") {
                                output += firstPart + 'BROADBAND HOSPITALITY' + secondPart + '330-629-8848' + thirdPart + '330-629-8848' + forthPart;
                            } else if (theAddressIndex == "58746") {
                                output += firstPart + 'PERFECT 10 DISTRIBUTING' + secondPart + '844-887-6725' + thirdPart + '844-887-6725' + forthPart;
                            } else if (theAddressIndex == "63807") {
                                output += firstPart + 'BOCK ANTENNA & SATELLITE' + secondPart + '815-282-3600' + thirdPart + '815-282-3600' + forthPart;
                            } else if (theAddressIndex == "59222") {
                                output += firstPart + 'DSI DISTRIBUTING, INC.' + secondPart + '800-728-3819' + thirdPart + '800-728-3819' + forthPart;
                            } else if (theAddressIndex == "64140") {
                                output += firstPart + 'PRIVATE CABLE SYSTEMS OF MI' + secondPart + '231-744-8876' + thirdPart + '231-744-8876' + forthPart;
                            } else if (theAddressIndex == "48664") {
                                output += firstPart + 'NORTH AMERICAN CABLE EQUIPMENT' + secondPart + '800-688-9282' + thirdPart + '800-688-9282' + forthPart;
                            } else if (theAddressIndex == "64380") {
                                output += firstPart + 'PLATINUM COMMUNICATION COMPANY' + secondPart + '817-551-1000' + thirdPart + '817-551-1000' + forthPart;
                            } else if (theAddressIndex == "59337") {
                                output += firstPart + 'GREAT LAKES TELCOM, LTD' + secondPart + '330-629-8848' + thirdPart + '330-629-8848' + forthPart;
                            }
                        }
                        break;
                }
            }
        }); 
        $(selector.update).empty().html(output);
        if ($(selector.update).find('li').length == 0) {
            $(selector.resultEmpty).show();
            $(selector.resultsExists).hide();
        } else {
            $(selector.resultEmpty).hide();
            $(selector.resultCount).html($(selector.update).find('li').length);
            $(selector.resultsExists).show();
        }
        if(output == '') {  
            dealerMessage = text.notValidZip;
        $(selector.dealerMessage).empty().html(dealerMessage);
          
        att.entbus.track.ddo.pushEvent('formResponse', 'MCOM_Dealer_Lookup_Submit', { 
                    'successFlag'        : '0',
                    'errorType'          : 'Failure_User',
                    'statusMessage'      : text.notValidZip,
                    'slotFriendlyName'   : 'Dealer Lookup',
                    'contentFriendlyName': 'search-box',
                    'internalSearchTerm' : showChoice,  // zip code entered
                    'internalSearchType' : (currentDealerType === dealerType.normal) ? 'Normal' : 'Senior',
                    'linkDestinationUrl' : 'Dealer Lookup Results Page'
                });
           
        } else {
             
            att.entbus.track.ddo.pushEvent('formResponse', 'MCOM_Dealer_Lookup_Submit', { 
                    'successFlag'             : '1',
                    'slotFriendlyName'        : 'Dealer Lookup', 
                    'contentFriendlyName'     : 'search-box',
                    'internalSearchTerm'      : showChoice,  // zip code entered
                    'internalSearchType'      : (currentDealerType === dealerType.normal) ? 'Normal' : 'Senior',
                    'internalSearchNumResults': zipLength,   // number of dealers returned
                    'linkDestinationUrl'      : 'Dealer Lookup Results Page'
                });
          
        }
    },

    chooser = function () {

        // Use in memory cache if available
        if(dataCache) {
            buildResult(dataCache);
        } else {
            $(selector.dealerMessage).empty().html(text.searching);
            getData(buildResult);
        }

    },

    determineLookup = function () {
        // Looking for the identifier present in the URL
        if(window.location.pathname.search(config.seniorIdentifier) !== -1) {
            currentDealerType = dealerType.senior;
        } else {
            currentDealerType = dealerType.normal;
        }
    },

    bindEvents = function () {
        $(selector.choose).bind('click', function(event) {
            event.preventDefault();
            var enteredZip,
                $enteredZip = $(selector.search);
            if (($enteredZip.val().length == 5) && (isNaN($enteredZip.val() / 1) == false)) {
                emptyDealermsg();
                 
                att.entbus.track.ddo.pushEvent('formSubmit', 'MCOM_Dealer_Lookup_Submit', {
                        'slotFriendlyName'   : 'Dealer Lookup',
                        'contentFriendlyName': 'search-box',
                        'internalSearchTerm' : $enteredZip.val(),
                        'internalSearchType' : (currentDealerType === dealerType.normal) ? 'Normal' : 'Senior',
                        'linkDestinationUrl' : 'Dealer Lookup Results Page'
                    });
             
                chooser();
            } else {
                $(selector.update).empty();
                $(selector.dealerMessage).html(text.notValidZip);
                
                att.entbus.track.ddo.pushEvent('formResponse', 'MCOM_Dealer_Lookup_Submit', { 
                        'successFlag'        : '0',
                        'errorType'          : 'Failure_User',
                        'statusMessage'      : text.notValidZip,
                        'slotFriendlyName'   : 'Dealer Lookup',
                        'contentFriendlyName': 'search-box',
                        'internalSearchTerm' : $enteredZip.val(),  // zip code entered
                        'internalSearchType' : (currentDealerType === dealerType.normal) ? 'Normal' : 'Senior',
                        'linkDestinationUrl' : 'Dealer Lookup Results Page'
                    });
           
            }
        });
        $(selector.search).keydown(function(e) {
            if (e.keyCode == 13) {
                $(selector.choose).click();
            }
        });
    };

    $(function() {
        determineLookup();
        jsonUrl = (currentDealerType === dealerType.normal) ? config.urls.cms : config.urls.cmsSenior;
        bindEvents();
    });

})(window, document, jQuery);

/**
 * content-teaser component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires Swiper javascript library
 * @requires video-overlay component
 */ 
 ;(function ($, window, document, undefined) {
    var sliders = [],
    selectors = {
        componentClass: '.content-teaser',
        swiperTarget: '.content-teaser .teaser-swiper-container',
        youtubeLink: '.youtube-player-link',
        soundCloudLink: '.podcast-player-link'
    },

    options = {
        init: false,
        slidesPerView: 3,
        watchOverflow: true,
        observer: true,
        observeParents: true,
         navigation: {
            nextEl: '',
            prevEl: ''
        },
        breakpoints: {
            // when window width is <= 1024
            1024: {
                slidesPerView: 'auto'
            }
        }
    },

    handleNavigation = function () {
        if ((window.innerWidth || document.documentElement.clientWidth) >= 768 && this.totalTiles <= 3) {
            $(this.navigation.nextEl).addClass('hidden');
            $(this.navigation.prevEl).addClass('hidden');
        } else {
            $(this.navigation.nextEl).removeClass('hidden');
            $(this.navigation.prevEl).removeClass('hidden');
        }
        this.update();
    },
        
    invokeOverlayVideo = function (ele) {
        var DOMdata = $(ele).data(),
            options = {
            data: {
                video      : DOMdata.video,
                title      : DOMdata.title || '',
                series     : DOMdata.series || '',
                objective  : DOMdata.objective || '',
                category   : DOMdata.category || '',
                vertical   : DOMdata.vertical || '',
                persona    : DOMdata.persona || '',
                publisher  : DOMdata.publisher || '',
                source     : DOMdata.source || '',
                publishdate: DOMdata.publishdate || '',
                mediatype  : DOMdata.mediatype || '',
                mediaclass : DOMdata.mediaclass || '',
                mediafriendlyname: DOMdata.mediafriendlyname || ''
            }
        };
        att.entbus.overlay.buildVideo(options);
    },
    
    invokeOverlayPodCast = function (ele) {
        var DOMdata = $(ele).data(),
            options = {
                title: DOMdata.name,
                podCast: DOMdata.podcast
            };
        att.entbus.overlay.buildPodCast(options);
    },
        
    bindEvents = function () {
        $(selectors.componentClass).on('click', selectors.youtubeLink, function(e) {
            e.preventDefault();
            invokeOverlayVideo(this);
        });
        $(selectors.componentClass).on('click', selectors.soundCloudLink, function(e) {
            e.preventDefault();
            invokeOverlayPodCast(this);
        });
    },

    init = function () {
        // TODO: check screen size (?) to determine desktop or not
        $(selectors.swiperTarget).each(function (index, element) {
            var slider,
                totalTiles = $(this).find('.swiper-slide').length;
            $(this).addClass('ct' + index);
            options.navigation.nextEl = '.ct' + index + ' ~ .swiper-button-next';
            options.navigation.prevEl = '.ct' + index + ' ~ .swiper-button-prev';
            slider = new Swiper('.ct' + index, options);
            slider.totalTiles = totalTiles;
            slider.on('init', handleNavigation);
            slider.init();
            sliders.push(slider);
        });
        $(".content-teaser .card_click").on("click", function (e) {
            if(!$(e.target).hasClass("modal-anchor")) {
                $(e.target).closest(".item").find(".click_link")[0].click();
            } else {
                e.preventDefault();
            }
        });
    };

    // execute when DOM ready
    $(function () {
        init();
        bindEvents();
    });
    
})(jQuery.noConflict(), window, document);
;(function ($, window, document, undefined) {
    var selector = $('.contact .contact-phone a');
    var addTollFreeNum = selector.data("addtfn");
    var localStorageTfn = localStorage.getItem("Contact_TFNum");    
    if (typeof addTollFreeNum !== 'undefined') {
        if (localStorageTfn == null || localStorageTfn != addTollFreeNum) {
            localStorage.setItem("Contact_TFNum", addTollFreeNum);
        }
    } else if (localStorageTfn != null && localStorageTfn != "null") {
        selector.text(localStorageTfn);
        selector.attr("href", "tel:"+localStorageTfn);
    }    
})(jQuery.noConflict(), window, document);

/**
 * Above the fold component functionality 
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires video-overlay component
 * @requires ytplayer library
 */ 
;(function ($, window, document, undefined) {
    var selector = {
        componentContainer: '.above-the-fold',
        playButton: '.play-icon-container',
		watchButton: '.image-text-play-icon-container',
        overlayContainer: '.video-overlay .video-container'
    },
        
    invokeOverlayVideo = function (ele) {
        var DOMdata = $(ele).data(),
        options = {
            data: {
                video      : DOMdata.video,
                title      : DOMdata.title || '',
                series     : DOMdata.series || '',
                objective  : DOMdata.objective || '',
                category   : DOMdata.category || '',
                vertical   : DOMdata.vertical || '',
                persona    : DOMdata.persona || '',
                publisher  : DOMdata.publisher || '',
                source     : DOMdata.source || '',
                publishdate: DOMdata.publishdate || '',
                mediatype  : DOMdata.mediatype || '',
                mediaclass : DOMdata.mediaclass || '',
                mediafriendlyname: DOMdata.mediafriendlyname || ''
            }
        };
        att.entbus.overlay.buildVideo(options);
    },

    invokeOverlayPodCast = function (ele) {
        var DOMdata = $(ele).data(),
            options = {
                title: DOMdata.name,
                podCast: DOMdata.podcast
            };
        att.entbus.overlay.buildPodCast(options);
    },

    bindEvents = function () {
        $(selector.componentContainer).on('click', selector.playButton, function (e) {
            var $podcast = $(this).data('podcast');
            e.preventDefault();
            if (typeof $podcast !== 'undefined' && $podcast !== '') {
                invokeOverlayPodCast(this);
            } else {
                invokeOverlayVideo(this);
            }
        });
		$(selector.componentContainer).on('click', selector.watchButton, function (e) {
            var $podcast = $(this).data('podcast');
            e.preventDefault();
            if (typeof $podcast !== 'undefined' && $podcast !== '') {
                invokeOverlayPodCast(this);
            } else {
                invokeOverlayVideo(this);
            }
        });
    };

    // execute when DOM ready
    $(function () {
        bindEvents();
    });
    
})(jQuery.noConflict(), window, document);
;(function($, window, document, undefined) {
    var selectors = {
        lines: '.custom-unlimited-plan .unlimited-lines-button-group .ul-bgline',
        bubbles: '.custom-unlimited-plan .unlimited-lines-button-group .ul-bubble',
        fifthBubble: '.custom-unlimited-plan .unlimited-lines-button-group .ul-bgline:nth-child(5) .ul-bubble'
    },
    classes = {
        selected: 'selected',
        less: 'orange',
        more: 'white'
    },
    lineData = [
        { 'elite': '$85', performance: '$75', starter: '$65' },
        { 'elite': '$75', performance: '$65', starter: '$60' },
        { 'elite': '$60', performance: '$50', starter: '$45' },
        { 'elite': '$50', performance: '$40', starter: '$35' },
        { 'elite': '$45', performance: '$35', starter: '$30' },
        { 'elite': '$40', performance: '$35', starter: '$30' },
        { 'elite': '$40', performance: '$35', starter: '$30' },
        { 'elite': '$40', performance: '$35', starter: '$30' },
        { 'elite': '$40', performance: '$35', starter: '$30' },
        { 'elite': '$40', performance: '$35', starter: '$30' }
    ],
    swiperOptions = {
        slidesPerView: 1,
        spaceBetween: 10,
        // pagination 
        pagination: {
            el:'.custom-unlimited-plan .swiper-pagination',
            type: 'bullets',
        },
        paginationClickable: true
    },
    breakpoint = window.matchMedia( '(max-width:767px)' ),
    unlimitedSwiper,
    handleBubbleClick = function (e) {
        var numberOfLines = parseInt($(this).parents('.ul-bgline').find('.ul-linetext').text()),
        $bubbles = $(selectors.bubbles);
        e.preventDefault();
        $(selectors.lines).addClass(classes.more);
        $(selectors.bubbles).addClass(classes.more);
        $bubbles.each(function () {
            $(this).removeClass('selected');
            if (parseInt($(this).parents('.ul-bgline').find('.ul-linetext').text()) <= numberOfLines) {
                $(this).removeClass(classes.more);
            }
            if (parseInt($(this).parents('.ul-bgline').find('.ul-linetext').text()) < numberOfLines) {
                $(this).parents('.ul-bgline').removeClass(classes.more);
            }
        });
        $(this).addClass(classes.selected);
        $('.elite .unlimited-price-text').text(lineData[numberOfLines-1].elite);
        $('.performance .unlimited-price-text').text(lineData[numberOfLines-1].performance);
        $('.starter .unlimited-price-text').text(lineData[numberOfLines-1].starter);
        $('.unlimited-numberoflines-text').text(numberOfLines + ((numberOfLines ===1) ? ' line' : ' lines'));
    },
    enableSwiper = function () {
         unlimitedSwiper = new Swiper ('.unlimited-swiper-container', swiperOptions);
    },
    breakpointChecker = function () {
        if ( breakpoint.matches === false ) {
            // clean up old instances and inline styles when available
            if ( unlimitedSwiper !== undefined ) unlimitedSwiper.destroy( true, true );
                // or/and do nothing
                return;
            // else if a small viewport and single column layout needed
            } else if ( breakpoint.matches === true ) {
                // fire small viewport version of swiper
                return enableSwiper();
        }
    },
    bindEvents = function () {
        $(selectors.bubbles).on('click', handleBubbleClick);
        // keep an eye on viewport size changes
        breakpoint.addListener(breakpointChecker);
    };
    $(function () {
        bindEvents();
        $(selectors.fifthBubble).trigger('click');
        // kickstart
        breakpointChecker();
    });
})(jQuery.noConflict(), window, document);
;(function ($, window, document, undefined) {

    // retrieve user's business profile from local storage
    
    function getUserBusProfile() {
        var profileContent = localStorage.getItem("businessProfile");
        var profile = profileContent ? JSON.parse(profileContent) : null;
        if (!profile || !profile.version || profile.version < 2) {
            // clear profile if version too old
            profile = { version: 2 };
        }
        if (profile.criteria == null) {
            profile.criteria = {};
        }
        if (profile.criteria.general == null) {
            profile.criteria.general = {};
        }
        if (profile.criteria.features == null) {
            profile.criteria.features = {};
        }
        return profile;
    }
    
    function getIdsFromProducts() {
        var productIds = [];
        var productCards = $(".matchscore-related-cardgrid").find(".matchscore-prod-card");
        $(productCards).each(function (idx) {
            var rawId = $(this).data("id");
            var prodId = rawId.replace("matchscore-id-", "");
            productIds.push(prodId);
        });
    
        return productIds;
    }
    
    function queryForProductMatchscores() {
        // Get the product ids
        var productIds = getIdsFromProducts();
    
        var profile = getUserBusProfile();
    
        var payload = { businessProfile: profile };
    
        if (productIds.length != 0) {
            payload.productIds = productIds;
        } else {
            return;
        }
    
        //console.log("payload: ", JSON.stringify(payload));
    
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            mimeType: "application/json",
            url: '/attmatchscore',
            data: JSON.stringify(payload),
        }).done(function(results) {
            handleMatchScores(results.results || []);
        }).fail(function(err, status, exc){
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                {
                    type: status ,
                    statusCode: err.status, 
                }
              )); 
            //console.log("related cardgrid, matchscore - network error: ", err.status, status, exc);
            // If network connection lost, retry
            if (err.status == 0){
                setTimeout(function() {
                    queryForProductMatchscores()},
                    3000);
            }
        })
    }
    
    function updateScoreOnCard(cardEl, score, recThreshold) {
        var matchScoreEl = $(cardEl).find(".match-score-bean");
        var prevScoreFullText = $(matchScoreEl).find(".match-score-text > .score-number").text();
    
        // Handle showing the highlight on score change.
        if (prevScoreFullText != null && score < recThreshold) {
            var prevScoreText = prevScoreFullText.replace("% match", "");
            if (prevScoreText != "") {
                var prevScore = parseInt(prevScoreText);
                if (prevScore != score) {
                    // Add the temporary highlight
                    $(matchScoreEl).addClass("updated");
                    window.setTimeout(function () {
                        $(matchScoreEl).removeClass("updated");
                    }, 1000);
                }
            }
        }
    
        // Analytics - add the match score to the cards CTA button, as part of the data-content
        if ($(cardEl).hasClass("matchscore-prod-card")) {
            var ctaEl = $(cardEl).find(".matchscore-product-button");
            $(ctaEl).attr("data-content", "Matchscore Product Card CTA with " + score + "% score");
        }
    
        // Handle showing the score
        if (!$(matchScoreEl).hasClass("active")) {
            $(matchScoreEl).addClass("active").addClass("fade-in");
            window.setTimeout(function () {
                $(matchScoreEl).removeClass("fade-in");
            }, 500);
        }
    
        // Handle the recommendations
        if (score >= recThreshold) {
            $(matchScoreEl).addClass("high-score");
        } else {
            $(matchScoreEl).removeClass("high-score");
        }
    
        // Set the new score.
        $(matchScoreEl).find(".match-score-text > .score-number").text(score + "%");
    }
    
    function formatProductScore(score) {
        return Math.round(score * 100);
    }
    
    function updateScores(results, recThreshold) {
        var userProf = getUserBusProfile();
        var isProfileEmpty = (Object.keys(userProf.criteria.features).length === 0 && Object.keys(userProf.criteria.general).length === 0);
        if (isProfileEmpty || Object.keys(results).length === 0) {
            // Hide scores
            if ($(".matchscore-related-cardgrid").find(".match-score-bean").hasClass("active")) {
                $(".matchscore-related-cardgrid").find(".match-score-bean").removeClass("active");
            }
        } else {
            for (var index in results) {
                var id = results[index].product;
                var score = formatProductScore(results[index].score);
                var card = null;
    
                var cardEl = $(".matchscore-related-cardgrid").find("#matchscore-id-" + id);
    
                if (cardEl != null) {
                    updateScoreOnCard(cardEl, score, recThreshold);
                }
            }
        }
    }
    
    function handleMatchScores(results) {
        var recThresh = parseInt($(".matchscore-related-cardgrid").attr("data-rec-thresh"));
        if (isNaN(recThresh)) recThresh = 101;
        // Update the scores
        updateScores(results, recThresh);

        // Add the initial order of the cards
        $(".matchscore-product-button").each(function(idx) {
            $(this).attr("data-position", idx);
        });
    }
    
    $(document).ready(function () {
        if($(".matchscore-related-cardgrid").length > 0) {
        	queryForProductMatchscores();
        }
    });
})(jQuery.noConflict(), window, document);

;
(function ($, window, document, undefined) {
    $(document).ready(function () {
        var containers = $('.product-recommendation-outer-container');
        if ((containers.length == 1) && (containers.css('display') != 'none')) {
            var availableServices = []; // array of strings (product IDs that key to the available product card ID dropdown)
            var apiResponseReceived = false;
            var apiError = false;
            var resultsContainer = containers.find('.product-recommendation-results-container');
            var filtersHeader = resultsContainer.find('.filters-header');
            var internetFiltersHeader = resultsContainer.find('.internet-filters-header');

            var usagePurposeContainer = containers.find('.usage-purpose-container');
            var numbersColumn = containers.find('.product-selection-grid .numbers-column');
            var numberOne = containers.find('.product-selection-grid .numbers-column .number-one');
            var numberTwo = containers.find('.product-selection-grid .numbers-column .number-two');
            var numberThree = containers.find('.product-selection-grid .numbers-column .number-three');
            var defaultCardsHeader = containers.find('.product-recommendation-default-cardgrid-header .remaining-cards-text-container');
            var busyIndicator = containers.find('.busy-icon-container');
            var ckavButton = containers.find('.check-availability-button');
            var address = containers.find('.product-availability-address');
            var addressUnit = containers.find('.product-availability-address-unit');
            var addressUnitErrorMsg = containers.find('.unit-error-msg');
            var messageContainer = containers.find('.product-availability-message-container');
            var viewAllInternetLink = containers.find('.internet-link-container>.internet-link');

            var SESSION_API_URL = 'https://zx5ds7n1jk.execute-api.us-east-1.amazonaws.com/GteSessionConfirmation-Stage1/session-confirmation-number';
            var CKAV_API_URL = 'https://4ck8nt3q50.execute-api.us-east-1.amazonaws.com/CheckAvailability-Stage1/availability';
            var SMARTY_STREETS_API_URL = 'https://us-street.api.smartystreets.com/street-address';
            var SMARTY_STREETS_API_KEY = '2021202165494638221';

            var lookupObject = {
                userInputZip: '',
                userInputAddressLine1: '',
                userInputAddressLine2: '',
                userInputCity: '',
                userInputState: '',
                userInputCountry: '',
                mode: 'fullAddress',
                customer_type: 'smallbusiness',
                filter_id: '1700007',
                success_token: 'UR_REFERRAL',
            };

            var session_key = "product_recommendation_session";
            var session_key_address = "ckav_address";

            var refreshState = function () {
                displayHideErrorMessage();
                if (apiResponseReceived) {
                    busyIndicator.removeClass('is-busy');
                }
                // set default height for number 3 for desktop
                if ($(document).width() > 768) {
                    $('.numbers-column>.vertical-line-container.number-three>.vertical-line').css('height', '70px');
                }

                // view all link hidden by default
                $(viewAllInternetLink).css('display', 'none');
                hideProductCards();

                $(filtersHeader).css('display', 'none');
                $(internetFiltersHeader).css('display', 'none');

                $(usagePurposeContainer).css('display', 'none');

                $('.number-two .number-box').css('background-color', '#0568ae');
                $('.number-two .number-box .number-icon').css('color', '#fff');
                $('.radio-box').css('border', 'none');

                // Show VPN Category card by default but hide later if that is the recommended card (as VPN recommended card will be shown)
                showVPNDefaultCategoryCard();

                var mainPurposeValue = $("input[name='main-purpose']:checked").val();

                if (mainPurposeValue === "internet") {
                    $("#internet-usage-purpose").css('display', 'block');
                    $("#internet").closest(".radio-box").css('border', '2px solid #0568ae');

                    $("#connect-business").closest(".radio-box").css('border', 'none');
                    $("#improve-performance").closest(".radio-box").css('border', 'none');

                    $(numbersColumn, numberOne).css('display', 'flex');
                    // numerTwo has multiple divs so it doesnt work in comma separated form as above
                    $(numberTwo).css('display', 'flex');
                    $(numberThree).css('display', 'none');

                    if (availableServices.length) {
                        $(internetFiltersHeader).css('display', 'block');
                        resultsContainer.find('.available-product-card').each(function (idx, card) {
                            var cardId = ($(card).children('.available-prod-card-inner-container').attr('id') || 'available-product-').replace('available-product-', '');
                            $(card).css('display', (resultsContainer.hasClass('designer') || (availableServices.indexOf(cardId) > -1)) ? 'block' : 'none');
                        });
                        $(numberThree).css('display', 'flex');
                        if ($(document).width() > 768) {
                            $('.numbers-column>.vertical-line-container.number-three>.vertical-line').css('height', '180px');
                        }
                        assignMarginsOnAvailableProductCards();
                    }

                    $(viewAllInternetLink).css('display', 'block');
                    changeDefaultCardsHeaderDisplay();
                }

                if (mainPurposeValue === "connect-business") {
                    $("#connect-business-usage-purpose").css('display', 'block');
                    $("#connect-business").closest(".radio-box").css('border', '2px solid #0568ae');

                    $("#improve-performance").closest(".radio-box").css('border', 'none');
                    $("#internet").closest(".radio-box").css('border', 'none');

                    $(numbersColumn, numberOne).css('display', 'flex');
                    // numerTwo has multiple divs so it doesnt work in comma separated form as above
                    $(numberTwo).css('display', 'flex');
                    $(numberThree).css('display', 'none');

                    changeDefaultCardsHeaderDisplay();
                }


                var usagePurposeValue = $("input[name='usage-purpose']:checked").val();


                if (mainPurposeValue === "connect-business" && usagePurposeValue === "att-prof") {
                    $(filtersHeader).css('display', 'block');
                    $(resultsContainer).find("#available-product-vpn").closest(".available-product-card").css('display', 'block');

                    hideVPNDefaultCategoryCard();

                    $("#att-prof").closest(".radio-box").css('border', '2px solid #0568ae');
                    $("#my-business").closest(".radio-box").css('border', 'none');

                    $(numberThree).css('display', 'flex');
                }


                if (mainPurposeValue === "connect-business" && usagePurposeValue === "my-business") {
                    $(filtersHeader).css('display', 'block');
                    $(resultsContainer).find("#available-product-switched_ethernet").closest(".available-product-card").css('display', 'block');

                    $("#my-business").closest(".radio-box").css('border', '2px solid #0568ae');
                    $("#att-prof").closest(".radio-box").css('border', 'none');

                    $(numberThree).css('display', 'flex');
                }


                if (mainPurposeValue === "improve-performance") {
                    $(filtersHeader).css('display', 'block');
                    $(resultsContainer).find("#available-product-sd_wan").closest(".available-product-card").css('display', 'block');

                    $("#improve-performance").closest(".radio-box").css('border', '2px solid #0568ae');
                    $("#internet").closest(".radio-box").css('border', 'none');
                    $("#connect-business").closest(".radio-box").css('border', 'none');

                    $(numbersColumn, numberOne).css('display', 'flex');
                    // numerTwo has multiple divs so it doesnt work in comma separated form as above
                    $(numberTwo).css('display', 'flex');

                    $('.number-two .number-box').css('background-color', '#fff');
                    $('.number-two .number-box .number-icon').css('color', '#0568ae');

                    $(numberThree).css('display', 'none');

                    changeDefaultCardsHeaderDisplay();
                }

                setMaxHeightForCards('.available-product-card:visible', '.available-prod-card-inner-container');
            };

            var changeDefaultCardsHeaderDisplay = function () {
                if ($('.matchscore-cardgrid .category-card:visible').length) {
                    $(defaultCardsHeader).css('display', 'flex');
                } else {
                    $(defaultCardsHeader).css('display', 'none');
                }
            }

            var hideVPNDefaultCategoryCard = function () {
                $("[data-id='matchscore-id-vpn']").closest(".category-card").css('display', 'none'); 
                assignMarginsOnCategoryCards();
                changeDefaultCardsHeaderDisplay();
            }


            var showVPNDefaultCategoryCard = function () {
                $("[data-id='matchscore-id-vpn']").closest(".category-card").css('display', 'block');
                assignMarginsOnCategoryCards();
            }

            var assignMarginsOnCategoryCards = function () {
                $(".matchscore-cardgrid>.row>.category-card:visible").each(function (i) {
                    $(this).css('margin-left', '0');
                    $(this).css('margin-right', '0');

                    var documentWidth = $(document).width();

                    if (documentWidth > 1152 && i % 3 === 1) {
                        $(this).css('margin-left', '22px');
                        $(this).css('margin-right', '22px');
                    } else if (documentWidth > 779 && documentWidth <= 1152) {
                        if (i % 3 === 1) {
                            $(this).css('margin-left', '0');
                            $(this).css('margin-right', '0');
                        }

                        if (i % 2 === 1) {
                            $(this).css('margin-left', '23px');
                        }
                    } else if (documentWidth <= 779 && i % 2 === 0) {
                        $(this).css('margin-left', '0');
                    }
                });
            }

            var assignMarginsOnAvailableProductCards = function () {
                $(".product-recommendation-results>.available-product-card:visible").each(function (i) {
                    $(this).css('margin-left', '0');
                    $(this).css('margin-right', '0');

                    var documentWidth = $(document).width();

                    if (documentWidth > 779 && i % 2 === 1) {
                        $(this).css('margin-left', '23px');
                    }
                });
            }

            var fillInAddress = function (place) {
                if (!place) {
                    place = autocomplete.getPlace();
                }
                var addressLine1 = '';
                $(['street_number', 'route']).each(function (idx, cmp) {
                    if (place && place.address_components) {
                        var component = place.address_components.find(function (comp) { return comp && comp.types && (comp.types.indexOf(cmp) > -1) })
                        if (component) {
                            addressLine1 += (component.short_name || component.long_name) + (cmp === 'street_number' ? ' ' : '');
                        }
                    }
                });
                lookupObject.userInputAddressLine1 = addressLine1;
                lookupObject.userInputZip = getAddressComponent(place, 'postal_code');
                lookupObject.userInputCity = getAddressComponent(place, 'locality');
                lookupObject.userInputState = getAddressComponent(place, 'administrative_area_level_1');
                lookupObject.userInputCountry = getAddressComponent(place, 'country');

                sessionStorage.setItem(session_key_address, JSON.stringify(lookupObject));

                enableSubmitButton();
            };

            var getAddressComponent = function (place, cmp) {
                if (place && place.address_components) {
                    var component = place.address_components.find(function (comp) { return comp && comp.types && (comp.types.indexOf(cmp) > -1) })
                    if (component) {
                        return component.short_name || component.long_name;
                    }
                }
                return '';
            }

            var enableSubmitButton = function () {
                if (lookupObject.userInputZip && lookupObject.userInputAddressLine1) {
                    ckavButton.prop('disabled', false);
                    ckavButton.removeClass('disabled');
                } else {
                    ckavButton.prop('disabled', true);
                    ckavButton.addClass('disabled');
                }
            }

            var lookUpServices = function (sessionConfirmationNumber) {
                return $.post({
                    url: CKAV_API_URL + '?' +
                        $.param({ _: String(new Date().getTime()), _dynSessConf: sessionConfirmationNumber }),
                    data: JSON.stringify(lookupObject)
                });
            }

            var validateAddress = function (streetAddress) {
                lookupObject.userInputAddressLine2 = '';
                if (addressUnit.val() && !(addressUnit.val().indexOf('Enter unit') > -1)) {
                    lookupObject.userInputAddressLine2 = addressUnit.val();
                    streetAddress = lookupObject.userInputAddressLine1 + ' ' +
                        lookupObject.userInputAddressLine2 + ' ' +
                        lookupObject.userInputCity + ' ' +
                        lookupObject.userInputState + ' ' +
                        lookupObject.userInputZip;
                }

                return getAddressFromSmartyStreets(streetAddress);
            };

            var getAddressFromSmartyStreets = function (streetAddress) {
                var AUTH_DATA = 'auth-id=' + SMARTY_STREETS_API_KEY;
                return jQuery.get({
                    url: SMARTY_STREETS_API_URL + '?' + AUTH_DATA + '&street=' + streetAddress + '&match=range'
                });
            }

            var getAddressComponentsAndInitiateCkav = function (addressVal) {
                busyIndicator.addClass('is-busy');
                getAddressFromSmartyStreets(addressVal)
                    .done(function (response) {
                        if (response && response[0] && response[0].components) {
                            buildLookUpObject(response[0].components);
                            ckavButton.trigger('click');
                        }
                    })
                    .fail(function (error,status) {
                        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                            {
                                type: status ,
                                statusCode: error.status, 
                            }
                          ));  
                        apiError = true;
                    }).always(function () {
                        apiResponseReceived = true;
                        refreshState();
                    });
            }

            var buildLookUpObject = function (components) {
                lookupObject.userInputAddressLine1 = [components.primary_number ? components.primary_number + ' ' : '',
                components.street_predirection ? components.street_predirection + ' ' : '',
                components.street_name ? components.street_name + ' ' : '',
                components.street_suffix ? components.street_suffix + ' ' : '',
                components.street_postdirection ? components.street_postdirection : ''].join('').trim();

                lookupObject.userInputAddressLine2 = [components.secondary_designator ? components.secondary_designator + ' ' : '',
                components.secondary_number ? components.secondary_number : ''].join('').trim();

                lookupObject.userInputZip = components.zipcode;
                lookupObject.userInputCity = components.city_name;
                lookupObject.userInputState = components.state_abbreviation;
            }

            var getAvailableServices = function (apiResponse) {
                availableServices = [];
                if (apiResponse) {
                    var serviceProfile = apiResponse.profile;
                    var isIpGreen = serviceProfile && (serviceProfile.isHSIAAvailable ||
                        serviceProfile.isDSLAvailable ||
                        serviceProfile.LIGHTSPEEDExists ||
                        serviceProfile.isGIGAFiberAvailable ||
                        serviceProfile.isIPDSLAM ||
                        serviceProfile.isFBSAvailable);

                    if (isIpGreen) {
                        if (serviceProfile.isFWIAvailable) {
                            availableServices.push('fixed_wireless_internet');
                        } else {
                            availableServices.push('high_speed_internet');
                            availableServices.push('dedicated_internet');
                        }
                    } else {
                        availableServices.push('att_wireless_broadband');
                        availableServices.push('dedicated_internet');
                    }
                }
            };

            var displayUnitNumberError = function () {
                $(addressUnitErrorMsg).css('display', 'block');
                $(addressUnit).css('border', '1px solid red');
                refreshState();
            }

            var hideUnitNumberError = function () {
                $(addressUnitErrorMsg).css('display', 'none');
                $(addressUnit).css('border', '1px solid #959595');
                refreshState();
            }

            var displayHideErrorMessage = function () {
                if (apiError) {
                    $(messageContainer).css('display', 'flex');
                    enableSubmitButton();
                } else {
                    $(messageContainer).css('display', 'none');
                }
            }

            var checkAvailability = function () {
                busyIndicator.addClass('is-busy');
                jQuery.get({ url: SESSION_API_URL + '?' + $.param({ _: String(new Date().getTime()) }) }).done(function (response) {
                    lookUpServices(response && response.sessionConfirmationNumber)
                        .done(function (response) {
                            if (response && response.CkavDataBean
                                && response.CkavDataBean.UnifiedAddressBean && response.CkavDataBean.UnifiedAddressBean.MDUAddress
                                && Object.keys(response.CkavDataBean.UnifiedAddressBean.MDUAddress)
                                && Object.keys(response.CkavDataBean.UnifiedAddressBean.MDUAddress).length > 1) {
                                displayUnitNumberError();
                                return;
                            }

                            getAvailableServices(response);
                            // hideAddressInputs();
                        })
                        .fail(function (error,status) {
                            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                                {
                                    type: status ,
                                    statusCode: error.status, 
                                }
                              )); 
                            apiError = true;
                        }).always(function () {
                            apiResponseReceived = true;
                            refreshState();
                        });
                }).fail(function (error,status) {
                    att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                        {
                            type: status ,
                            statusCode: error.status, 
                        }
                      )); 
                    apiError = true;
                    apiResponseReceived = true;
                    refreshState();
                });
            }

            var setMaxHeightForCards = function (cardClassName, innerContainerClassName) {
                maxHeight = '200px';
                $(cardClassName).each(function () {
                    var innerContainer = $(this).find(innerContainerClassName);
                    maxHeight = maxHeight > $(innerContainer).height() ? maxHeight : $(innerContainer).height();
                });

                $(cardClassName).each(function () {
                    var innerContainer = $(this).find(innerContainerClassName);
                    $(innerContainer).height(maxHeight);
                });
            }

            var initializeComponentFromSession = function () {
                var sessionValues = sessionStorage.getItem(session_key);
                if (sessionValues) {
                    sessionValues = JSON.parse(sessionValues);
                    if (sessionValues.mainPurposeValue) {
                        $('#' + sessionValues.mainPurposeValue).prop('checked', true);
                    }
                    if (sessionValues.usagePurposeValue) {
                        $('#' + sessionValues.usagePurposeValue).prop('checked', true);
                    }
                    if (sessionValues.address) {
                        address.val(sessionValues.address);
                    }
                    if (sessionValues.unit) {
                        addressUnit.val(sessionValues.unit);
                    }
                    if (sessionValues.mainPurposeValue === "internet" && sessionValues.address) {
                        getAddressComponentsAndInitiateCkav(sessionValues.address);
                    }
                }
                refreshState();
            }

            var hideProductCards = function () {
                resultsContainer.find('.available-product-card').each(function (idx, card) {
                    $(card).css('display', 'none');
                });
            }

            if ($('#editMode').text() === 'false') {
                $('#product-recommendation-cards').removeClass('product-recommendation-results-edit');
                $('#product-recommendation-cards').addClass('product-recommendation-results');
                hideProductCards();
                setTimeout(function () {
                    initializeComponentFromSession();
                }, 0);
            } else {
                $('#product-recommendation-cards').css('display', 'flex');
            }

            address.on('initAutoComplete', function (e) {
                autocomplete = new google.maps.places.Autocomplete(address[0], { types: ['geocode'] });
                autocomplete.setComponentRestrictions({ 'country': ['us'] });
                autocomplete.setFields(['address_component']);
                autocomplete.addListener('place_changed', fillInAddress);
            });

            addressUnit.on('focus', function (e) {
                var textbox = $(this);
                if (textbox.val().indexOf('Enter unit') > -1) {
                    textbox.val('');
                    textbox.removeClass('placeholder');
                }
                enableSubmitButton();
            });

            addressUnit.on('blur', function (e) {
                var textbox = $(this);
                lookupObject.userInputAddressLine2 = textbox.val();
                if (textbox.val() == '') {
                    //  textbox.val('Enter unit (if applicable)');
                    textbox.addClass('placeholder');
                }
                enableSubmitButton();

                apiError = false;
                displayHideErrorMessage();
                sessionStorage.setItem(session_key_address, JSON.stringify(lookupObject));
            });
            address.on('keydown', function (e) {
                lookupObject.userInputZip = '';
                lookupObject.userInputAddressLine1 = '';

                ckavButton.prop('disabled', true);
                ckavButton.addClass('disabled');

                apiError = false;
                displayHideErrorMessage();
            });

            ckavButton.on('click', function (e) {
                ckavButton.prop('disabled', true);
                ckavButton.addClass('disabled');
                apiResponseReceived = false;
                apiError = false;
                hideUnitNumberError();
                message = '';
                availableServices = [];
                resultsContainer.removeClass('designer initial');

                var streetAddress = $(address).val();
                if (streetAddress) {
                    // country not needed for validation
                    streetAddress = streetAddress.replace(', USA', '');
                }
                busyIndicator.addClass('is-busy');
                validateAddress(streetAddress).done(function (response) {
                    if (response && response[0]) {
                        // check if address needs a unit number
                        if (response[0].analysis.dpv_footnotes.indexOf('N1') > -1) {
                            apiResponseReceived = true;
                            displayUnitNumberError();
                        } else {
                            lookupObject.userInputAddressLine2 = '';
                            // ckav api seems to prefer the unit number format of smarty streets
                            if (response[0].components.secondary_number) {
                                lookupObject.userInputAddressLine2 = [response[0].components.secondary_designator ? response[0].components.secondary_designator + ' ' : '',
                                response[0].components.secondary_number ? response[0].components.secondary_number : ''].join('').trim();
                            }
                            checkAvailability();
                        }
                    } else {
                        // if empty response from smarty streets, no unit number
                        lookupObject.userInputAddressLine2 = '';
                        checkAvailability();
                    }
                }).fail(function (error,status) {
                    att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                        {
                            type: status ,
                            statusCode: error.status, 
                        }
                      )); 
                    apiError = true;
                    apiResponseReceived = true;
                    refreshState();
                });
            });
            $("input[name='main-purpose']").on("change", function (e) {
                $("input[name='usage-purpose']").prop('checked', false);
                refreshState();
            });

            $("input[name='usage-purpose']").on("change", function (e) {
                refreshState();
            });

            $(".radio-container .radio-box").on("click", function (e) {
                $(this).find('input[type="radio"]').prop("checked", true);
                refreshState();
            });
            $(viewAllInternetLink).on('click', function () {
                var address = $('.address-unit .product-availability-address').val();
                var unit = $('.address-unit .product-availability-address-unit').val();
                var url = $(this).attr('data-url');
                if (address) {
                    if (url.indexOf('?') >= 0) {
                        url = url + '&address=' + address + '&unit=' + unit;
                    } else {
                        url = url + '?address=' + address + '&unit=' + unit;
                    }
                }
                window.open(url, '_self');
            });

            $(window).bind('resize', function (e) {
                assignMarginsOnCategoryCards();
            });

            window.onbeforeunload = function () {
                sessionStorage.setItem(session_key, JSON.stringify({
                    mainPurposeValue: $("input[name='main-purpose']:checked").val(),
                    usagePurposeValue: $("input[name='usage-purpose']:checked").val(),
                    address: address.val(),
                    unit: addressUnit.val()
                }));
            }

            var rearrangeCards = function () {
                var awbCard = $("#available-product-att_wireless_broadband").closest(".available-product-card");
                var hsiCard = $("#available-product-high_speed_internet").closest(".available-product-card");
                var adiCard = $("#available-product-dedicated_internet").closest(".available-product-card");

                if (awbCard.length && adiCard.length) {
                    $(awbCard).detach();
                    $(awbCard).insertBefore($(adiCard));
                }

                if (hsiCard.length && adiCard.length) {
                    $(hsiCard).detach();
                    $(hsiCard).insertBefore($(adiCard));
                }
            }
            rearrangeCards();
        } else {
            containers.css('display', 'none');
        }
    });
})(jQuery.noConflict(), window, document);
;
(function ($, window, document, undefined) {
    $(document).ready(function () { 
        var containers = $('.product-availability-outer-container');
        if ((containers.length == 1) && (containers.css('display') != 'none')) {
            var availableServices = []; // array of strings (product IDs that key to the available product card ID dropdown)
            var apiResponseReceived = false;
            var apiError = false;

            var address = containers.find('.product-availability-address');
            var addressUnit = containers.find('.product-availability-address-unit');
            var addressUnitErrorMsg = containers.find('.unit-error-msg');
            var button = containers.find('.product-availability-button');
            var busyIndicator = containers.find('.busy-indicator-container');
            var resultsContainer = containers.find('.product-availability-results-container');
            var availableCardsContainer = containers.find('.product-availability-results-container .available-cards');
            var defaultCardsContainer = containers.find('.product-availability-results-container .default-cards');
            var remainingCardsTextContainer = resultsContainer.find('.remaining-cards-text-container');
            var addressInputsContainer = containers.find('.address-inputs');
            var addressDisplayContainer = containers.find('.address-display');
            var addressChangeLink = addressDisplayContainer.find('.address-change-link');
            var messageContainer = containers.find('.product-availability-message-container');
            var SESSION_API_URL = 'https://zx5ds7n1jk.execute-api.us-east-1.amazonaws.com/GteSessionConfirmation-Stage1/session-confirmation-number';
            var CKAV_API_URL = 'https://4ck8nt3q50.execute-api.us-east-1.amazonaws.com/CheckAvailability-Stage1/availability';
            var SMARTY_STREETS_API_URL = 'https://us-street.api.smartystreets.com/street-address';
            var SMARTY_STREETS_API_KEY = '2021202165494638221';

            var session_key = "product_availability_session";
            var session_key_address = "ckav_address";

            var defaultCardsContainerMaxWidth = $(defaultCardsContainer).css('max-width');

            var isProd = ((window && window.location && window.location.host) || '') == 'www.business.att.com';

            var lookupObject = {
                userInputZip: '',
                userInputAddressLine1: '',
                userInputAddressLine2: '',
                userInputCity: '',
                userInputState: '',
                userInputCountry: '',
                mode: 'fullAddress',
                customer_type: 'smallbusiness',
                filter_id: '1700007',
                success_token: 'UR_REFERRAL',
            };

            var refreshState = function () {
                displayHideErrorMessage();
                userAddressContainer = addressDisplayContainer.find('.user-address');
                if (userAddressContainer) {
                    if (!lookupObject.userInputAddressLine2) {
                        $(userAddressContainer).html(address.val());
                    } else {
                        var addressValue = [lookupObject.userInputAddressLine1 ? lookupObject.userInputAddressLine1 : '',
                        lookupObject.userInputAddressLine2 ? ', ' + lookupObject.userInputAddressLine2 : '',
                        lookupObject.userInputCity ? ', ' + lookupObject.userInputCity : '',
                        lookupObject.userInputState ? ', ' + lookupObject.userInputState : '',
                        lookupObject.userInputCountry ? lookupObject.userInputCountry : ''].join('').trim();

                        $(userAddressContainer).html(addressValue);
                    }
                }

                $(availableCardsContainer).empty();
                defaultCardsContainer.find('.available-product-card').each(function (idx, card) {
                    var cardId = ($(card).children('.available-prod-card-inner-container').attr('id') || 'available-product-').replace('available-product-', '');
                    $(card).css('display', (resultsContainer.hasClass('designer') || !(availableServices.indexOf(cardId) > -1)) ? 'block' : 'none');

                    if (availableServices.indexOf(cardId) > -1) {
                        var cardClone = $(card).clone(true);
                        $(cardClone).css('display', 'block');
                        $(availableCardsContainer).append(cardClone);
                    }
                });

                var availableProductCards = availableCardsContainer.find('.available-product-card:visible');
                var defaultProductCards = defaultCardsContainer.find('.available-product-card:visible');

                $(remainingCardsTextContainer).css('display', (availableProductCards.length && defaultProductCards.length) ? 'flex' : 'none');

                if (apiResponseReceived) {
                    busyIndicator.removeClass('is-busy');
                }

                setMaxHeightForCards('.available-product-card:visible', '.available-prod-card-inner-container');
                assignMarginsOnCards();

                sessionStorage.setItem(session_key_address, JSON.stringify(lookupObject));
            };

            var fillInAddress = function (place) {
                if (!place) {
                    place = autocomplete.getPlace();
                }
                var addressLine1 = '';
                $(['street_number', 'route']).each(function (idx, cmp) {
                    if (place && place.address_components) {
                        var component = place.address_components.find(function (comp) { return comp && comp.types && (comp.types.indexOf(cmp) > -1) })
                        if (component) {
                            addressLine1 += (component.short_name || component.long_name) + (cmp === 'street_number' ? ' ' : '');
                        }
                    }
                });
                lookupObject.userInputAddressLine1 = addressLine1;
                lookupObject.userInputZip = getAddressComponent(place, 'postal_code');
                lookupObject.userInputCity = getAddressComponent(place, 'locality');
                lookupObject.userInputState = getAddressComponent(place, 'administrative_area_level_1');
                lookupObject.userInputCountry = getAddressComponent(place, 'country');

                sessionStorage.setItem(session_key_address, JSON.stringify(lookupObject));

                enableSubmitButton();
            };

            var getAddressComponent = function (place, cmp) {
                if (place && place.address_components) {
                    var component = place.address_components.find(function (comp) { return comp && comp.types && (comp.types.indexOf(cmp) > -1) })
                    if (component) {
                        return component.short_name || component.long_name;
                    }
                }
                return '';
            }

            var enableSubmitButton = function () {
                if (lookupObject.userInputZip && lookupObject.userInputAddressLine1) {
                    button.prop('disabled', false);
                    button.removeClass('disabled');
                } else {
                    button.prop('disabled', true);
                    button.addClass('disabled');
                }
            }

            var lookUpServices = function (sessionConfirmationNumber) {
                return $.post({
                    url: CKAV_API_URL + '?' +
                        $.param({ _: String(new Date().getTime()), _dynSessConf: sessionConfirmationNumber }),
                    data: JSON.stringify(lookupObject)
                });
            }

            var validateAddress = function (streetAddress) {
                lookupObject.userInputAddressLine2 = '';
                if (addressUnit.val() && !(addressUnit.val().indexOf('Enter unit') > -1)) {
                    lookupObject.userInputAddressLine2 = addressUnit.val();
                    streetAddress = lookupObject.userInputAddressLine1 + ' ' +
                        lookupObject.userInputAddressLine2 + ' ' +
                        lookupObject.userInputCity + ' ' +
                        lookupObject.userInputState + ' ' +
                        lookupObject.userInputZip;
                }

                return getAddressFromSmartyStreets(streetAddress);
            };

            var getAddressFromSmartyStreets = function (streetAddress) {
                var AUTH_DATA = 'auth-id=' + SMARTY_STREETS_API_KEY;
                
                return $.get({
                    url: SMARTY_STREETS_API_URL + '?' + AUTH_DATA + '&street=' + streetAddress + '&match=range'
                });
            }

            var getAddressComponentsAndInitiateCkav = function (addressVal) {
                busyIndicator.addClass('is-busy');
                getAddressFromSmartyStreets(addressVal)
                    .done(function (response) {
                        if (response && response[0] && response[0].components) {
                            buildLookUpObject(response[0].components);
                            button.trigger('click');
                        }
                    })
                    .fail(function (err,status,error) {
                        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                            {
                                type: status ,
                                statusCode: err.status, 
                            }
                        ));
                        apiError = true;
                    }).always(function () {
                        apiResponseReceived = true;
                        refreshState();
                    });
            }

            var buildLookUpObject = function (components) {
                lookupObject.userInputAddressLine1 = [components.primary_number ? components.primary_number + ' ' : '',
                components.street_predirection ? components.street_predirection + ' ' : '',
                components.street_name ? components.street_name + ' ' : '',
                components.street_suffix ? components.street_suffix + ' ' : '',
                components.street_postdirection ? components.street_postdirection : ''].join('').trim();

                lookupObject.userInputAddressLine2 = [components.secondary_designator ? components.secondary_designator + ' ' : '',
                components.secondary_number ? components.secondary_number : ''].join('').trim();

                lookupObject.userInputZip = components.zipcode;
                lookupObject.userInputCity = components.city_name;
                lookupObject.userInputState = components.state_abbreviation;
            }



            var getAvailableServices = function (apiResponse) {
                availableServices = [];
                if (apiResponse) {
                    var serviceProfile = apiResponse.profile;
                    var isIpGreen = serviceProfile && (serviceProfile.isHSIAAvailable ||
                        serviceProfile.isDSLAvailable ||
                        serviceProfile.LIGHTSPEEDExists ||
                        serviceProfile.isGIGAFiberAvailable ||
                        serviceProfile.isIPDSLAM ||
                        serviceProfile.isFBSAvailable);

                    if (isIpGreen) {
                        if (serviceProfile.isFWIAvailable) {
                            availableServices.push('fixed_wireless_internet');
                        } else {
                            availableServices.push('high_speed_internet');
                            availableServices.push('dedicated_internet');
                        }
                    } else {
                        availableServices.push('att_wireless_broadband');
                        availableServices.push('dedicated_internet');
                    }
                }
            };

            var getDefaultServices = function () {
                getAvailableServices({
                    CkavDataBean: {
                        UnifiedAddressBean: {
                            OOFP: false
                        }
                    },
                    profile: {
                        isFWIAvailable: true
                    }
                });
            }

            var displayAddressInputs = function () {
                $(addressDisplayContainer).css('display', 'none');
                $(addressInputsContainer).css('display', 'flex');

                if (!address.val()) {
                    address.val('Enter service address');
                }
                if (!addressUnit.val()) {
                    addressUnit.val('Enter unit (if applicable)');
                }
            }

            var hideAddressInputs = function () {
                $(addressDisplayContainer).css('display', 'flex');
                $(addressInputsContainer).css('display', 'none');
            }

            var displayUnitNumberError = function () {
                $(addressUnitErrorMsg).css('display', 'block');
                $(addressUnit).css('border', '1px solid #FFB81C');
                refreshState();
            }

            var hideUnitNumberError = function () {
                $(addressUnitErrorMsg).css('display', 'none');
                $(addressUnit).css('border', '1px solid white');
                refreshState();
            }

            var checkAvailability = function () {
                busyIndicator.addClass('is-busy');
                $.get({ url: SESSION_API_URL + '?' + $.param({ _: String(new Date().getTime()) }) }).done(function (response) {
                    lookUpServices(response && response.sessionConfirmationNumber)
                        .done(function (response) {
                            if (response && response.CkavDataBean
                                && response.CkavDataBean.UnifiedAddressBean && response.CkavDataBean.UnifiedAddressBean.MDUAddress
                                && Object.keys(response.CkavDataBean.UnifiedAddressBean.MDUAddress)
                                && Object.keys(response.CkavDataBean.UnifiedAddressBean.MDUAddress).length > 1) {
                                displayUnitNumberError();
                                return;
                            }

                            getAvailableServices(response);
                            hideAddressInputs();
                        })
                        .fail(function (err,status,error) {
                            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                                {
                                    type: status ,
                                    statusCode: err.status, 
                                }
                            ));
                            apiError = true;
                        }).always(function () {
                            apiResponseReceived = true;
                            refreshState();
                        });
                }).fail(function (err,status,error) {
                    att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                        {
                            type: status ,
                            statusCode: err.status, 
                        }
                    ));
                    apiError = true;
                    apiResponseReceived = true;
                    refreshState();
                });
            }

            var assignMarginsOnCards = function () {
                $(".product-availability-results-container>.row.available-cards>.available-product-card:visible").each(function (index) {
                    assignMarginsOnACard(this, index);
                });
                $(".product-availability-results-container>.row.default-cards>.available-product-card:visible").each(function (index) {
                    assignMarginsOnACard(this, index);
                });
                setWidthForFourDefaultCards();
            }

            var assignMarginsOnACard = function (card, index) {
                $(card).css('margin-left', '0');
                $(card).css('margin-right', '0');

                var documentWidth = $(document).width();

                if (documentWidth > 1250 && index % 3 === 1) {
                    $(card).css('margin-left', '22px');
                    $(card).css('margin-right', '22px');
                } else if (documentWidth > 779 && documentWidth <= 1250) {
                    if (index % 3 === 1) {
                        $(card).css('margin-left', '0');
                        $(card).css('margin-right', '0');
                    }

                    if (index % 2 === 1) {
                        $(card).css('margin-left', '23px');
                    }
                } else if (documentWidth <= 779 && index % 2 === 0) {
                    $(card).css('margin-left', '0');
                }

            }

            var setMaxHeightForCards = function (cardClassName, innerContainerClassName) {
                maxHeight = '200px';
                $(cardClassName).each(function () {
                    var innerContainer = $(this).find(innerContainerClassName);
                    maxHeight = maxHeight > $(innerContainer).height() ? maxHeight : $(innerContainer).height();
                });

                $(cardClassName).each(function () {
                    var innerContainer = $(this).find(innerContainerClassName);
                    $(innerContainer).height(maxHeight);
                });
            }

            var displayHideErrorMessage = function () {
                if (apiError) {
                    $(messageContainer).css('display', 'flex');
                    enableSubmitButton();
                } else {
                    $(messageContainer).css('display', 'none');
                }
            }

            // If there are 4 default cards show only two in one row. So set a max-width accordingly.
            var setWidthForFourDefaultCards = function () {
                var countDefaultCards = defaultCardsContainer.find('.available-product-card:visible').length;
                var documentWidth = $(document).width();
                $(defaultCardsContainer).css('max-width', defaultCardsContainerMaxWidth);
                if (countDefaultCards === 4 && documentWidth > 800) {
                    $(defaultCardsContainer).css('max-width', '800px');
                    defaultCardsContainer.find('.available-product-card:visible').each(function (index, card) {
                        if (documentWidth > 800) {
                            if (index % 2 === 1) {
                                $(card).css('margin-left', '23px');
                                $(card).css('margin-right', '0');
                            } else {
                                $(card).css('margin-left', '0');
                                $(card).css('margin-right', '0');
                            }
                        }
                    });
                }
            }

            addressChangeLink.on('click', function (e) {
                displayAddressInputs();
                hideUnitNumberError();
            });
            address.on('initAutoComplete', function (e) {
                autocomplete = new google.maps.places.Autocomplete(address[0], { types: ['geocode'] });
                autocomplete.setComponentRestrictions({ 'country': ['us'] });
                autocomplete.setFields(['address_component']);
                autocomplete.addListener('place_changed', fillInAddress);
            });
            address.on('focus', function (e) {
                var textbox = $(this);
                if (textbox.val() == 'Enter service address') {
                    textbox.val('');
                    textbox.removeClass('placeholder');
                }
            });
            address.on('blur', function (e) {
                var textbox = $(this);
                if (textbox.val() == '') {
                    textbox.val('Enter service address');
                    textbox.addClass('placeholder');
                }
            });
            address.on('keydown', function (e) {
                lookupObject.userInputZip = '';
                lookupObject.userInputAddressLine1 = '';

                button.prop('disabled', true);
                button.addClass('disabled');

                apiError = false;
                displayHideErrorMessage();
            });
            addressUnit.on('focus', function (e) {
                var textbox = $(this);
                if (textbox.val().indexOf('Enter unit') > -1) {
                    textbox.val('');
                    textbox.removeClass('placeholder');
                }
                enableSubmitButton();
            });
            addressUnit.on('blur', function (e) {
                var textbox = $(this);
                lookupObject.userInputAddressLine2 = textbox.val();
                if (textbox.val() == '') {
                    textbox.val('Enter unit (if applicable)');
                    textbox.addClass('placeholder');
                }
                enableSubmitButton();

                apiError = false;
                displayHideErrorMessage();
                sessionStorage.setItem(session_key_address, JSON.stringify(lookupObject));
            });
            button.on('click', function (e) {
                button.prop('disabled', true);
                button.addClass('disabled');
                apiResponseReceived = false;
                apiError = false;
                hideUnitNumberError();
                message = '';
                availableServices = [];
                resultsContainer.removeClass('designer initial');

                var streetAddress = $(address).val();
                if (streetAddress) {
                    // country not needed for validation
                    streetAddress = streetAddress.replace(', USA', '');
                }
                busyIndicator.addClass('is-busy');
                validateAddress(streetAddress).done(function (response) {
                    if (response && response[0]) {
                        // check if address needs a unit number
                        if (response[0].analysis.dpv_footnotes.indexOf('N1') > -1) {
                            apiResponseReceived = true;
                            displayUnitNumberError();
                        } else {
                            lookupObject.userInputAddressLine2 = '';
                            // ckav api seems to prefer the unit number format of smarty streets
                            if (response[0].components.secondary_number) {
                                lookupObject.userInputAddressLine2 = [response[0].components.secondary_designator ? response[0].components.secondary_designator + ' ' : '',
                                response[0].components.secondary_number ? response[0].components.secondary_number : ''].join('').trim();
                            }
                            checkAvailability();
                        }
                    } else {
                        // if empty response from smarty streets, no unit number
                        lookupObject.userInputAddressLine2 = '';
                        checkAvailability();
                    }
                }).fail(function (err,status,error) {
                    att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                        {
                            type: status ,
                            statusCode: err.status, 
                        }
                    ));
                    apiError = true;
                    apiResponseReceived = true;
                    refreshState();
                });
            });
            $(window).bind('resize', function (e) {
                assignMarginsOnCards();
            });
            window.onbeforeunload = function () {
                sessionStorage.setItem(session_key, JSON.stringify({
                    address: address.val().indexOf('Enter service address') > -1 ? '' : address.val(),
                    unit: addressUnit.val().indexOf('Enter unit') > -1 ? '' : addressUnit.val()
                }));
            }

            var initiateCkav = function () {
                var queryParams = getUrlVars();
                var addressVal = queryParams['address'];
                var unitVal = queryParams['unit'];

                if (!addressVal) {
                    var sessionValues = sessionStorage.getItem(session_key);
                    if (sessionValues) {
                        sessionValues = JSON.parse(sessionValues);
                        addressVal = sessionValues.address ? sessionValues.address : '';
                        unitVal = sessionValues.unit ? sessionValues.unit : '';
                    }
                }

                if (addressVal) {
                    address.val(unescape(addressVal));
                    addressUnit.val(unescape(unitVal));
                    getAddressComponentsAndInitiateCkav(unescape(addressVal));
                }
            }

            var getUrlVars = function () {
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            }

            var rearrangeCards = function () {
                var awbCard = $("#available-product-att_wireless_broadband").closest(".available-product-card");
                var hsiCard = $("#available-product-high_speed_internet").closest(".available-product-card");
                var adiCard = $("#available-product-dedicated_internet").closest(".available-product-card");

                if (awbCard.length && adiCard.length) {
                    $(awbCard).detach();
                    $(awbCard).insertBefore($(adiCard));
                }

                if (hsiCard.length && awbCard.length) {
                    $(hsiCard).detach();
                    $(hsiCard).insertBefore($(awbCard));
                }

                if (hsiCard.length && adiCard.length && !awbCard.length) {
                    $(hsiCard).detach();
                    $(hsiCard).insertBefore($(adiCard));
                }
            }

            displayAddressInputs();
            rearrangeCards();
            refreshState();

            setTimeout(function () {
                initiateCkav();
            }, 0);

        } else {
            containers.css('display', 'none');
        }
    });
})(jQuery.noConflict(), window, document);
;(function ($, window, document, undefined) {

    // retrieve user's business profile from local storage
    function getUserProfileMoreMatchby() {
        var profileContent = localStorage.getItem("businessProfile");
        var profile = profileContent ? JSON.parse(profileContent) : null;
        if (!profile || !profile.version || profile.version < 2) {
            // clear profile if version too old
            profile = { version: 2 };
        }
        if (profile.criteria == null) {
            profile.criteria = {};
        }
        if (profile.criteria.general == null) {
            profile.criteria.general = {};
        }
        if (profile.criteria.features == null){
            profile.criteria.features = {};
        }
        return profile;
    }
    
    // update the user profile based on changes
    function updateProfileMoreMatchby(props) {
        var profile = getUserProfileMoreMatchby();
    
        // build the values up from match content
        var runningValues = {};
        props.forEach(function(p) {
            if (p.type === "keyword") {
                // may be multiple values
                var rv = runningValues[p.name];
                if (p.value != null) {
                    runningValues[p.name] = rv == null ? [p.value] : rv.concat([p.value]);
                } else if (rv == null) {
                    runningValues[p.name] = [];
                }
            } else if (p.type === "opt-in") {
                // only possible values are true or null
                runningValues[p.name] = p.value;
            }
        });
        // now prune the values
        for (var pname in runningValues) {
            var pvalue = runningValues[pname];
            if (Array.isArray(pvalue)) {
                if (pvalue.length === 1) {
                    // make a singleton
                    pvalue = pvalue[0];
                } else if (pvalue.length === 0) {
                    // remove property completely
                    pvalue = null;
                }
            }
            if (pvalue == null) {
                delete profile.criteria.general[pname];
            } else {
                profile.criteria.general[pname] = pvalue;
            }
        }

		updateMoreMatchbyInputTracking(profile);

        // write back
        profile = JSON.stringify(profile);
        localStorage.setItem("businessProfile", profile);
    }
    
    function disableMoreMatchControls(){
        //$(".matchby-selection").addClass("disabled");
        $(".matchby-selection > input").attr("disabled", true);
        //$(".matchby-slider").addClass("disabled");
        $(".matchby-slider").attr("disabled", true);
    }
    
    function enableMoreMatchControls(){
        //$(".matchby-selection").removeClass("disabled");
        $(".matchby-selection > input").attr("disabled", false);
        //$(".matchby-slider").removeClass("disabled");
        $(".matchby-slider").attr("disabled", false);
    }

    function grayMoreMatchControls(){
        $(".matchby-selection").addClass("disabled");
        $(".matchby-slider").addClass("disabled");
    }
    
    function ungrayMoreMatchControls(){
        $(".matchby-selection").removeClass("disabled");
        $(".matchby-slider").removeClass("disabled");
    }

    function triggerMoreMatchbyDisable(){
        $(".matchscore-inputs-component").trigger("matchscore-inputs:disable");
    }

    function triggerMoreMatchbyEnable(){
        $(".matchscore-inputs-component").trigger("matchscore-inputs:enable");
    }

    function triggerMoreMatchbyGray(){
        $(".matchscore-inputs-component").trigger("matchscore-inputs:gray");
    }

    function triggerMoreMatchbyUngray(){
        $(".matchscore-inputs-component").trigger("matchscore-inputs:ungray");
    }
    
    function queryMatchServiceMoreMatchby(callback) {
        triggerMoreMatchbyDisable();
        var portfolioId = $("#additional-match-criteria").attr("data-port-id");
        if (typeof portfolioId === "undefined") portfolioId = "internet_and_networking";
        var categoryId = $("#additional-match-criteria").attr("data-cat-id");
        if (categoryId == "null" || typeof categoryId === "undefined") {
            categoryId = null;
        }
    
        var products = $(".matchscore-prod-card");
        /*var productIds = [];
        $(products).each(function(idx){
            var id = $(this).attr("id");
            productIds.push(id);
        });*/
        
        var profile = getUserProfileMoreMatchby();
    
        var payload = {businessProfile : profile};
        //console.log("payload: ", payload);
        if (portfolioId != null) {
            payload.portfolioId = portfolioId;
        }
        if (categoryId != null) {
            payload.categoryId = categoryId;
        }
        /*if (productIds != null) {
            payload.productIds = productIds;
        }*/
    
        //console.log("payload: ", JSON.stringify(payload));
    
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            mimeType: "application/json",
            url:'/attmatchscore',
            data: JSON.stringify(payload),
        }).done(function(results){
            triggerMoreMatchbyUngray();
            // If this is a portfolio page
            if (portfolioId && !categoryId) {
                // collate by category
                var matchscoreItems = {};
                (results.results || []).forEach(function(res) {
                    var catid = res.category;
                    // If the category id is present
                    if (catid != null){
                        var cat = matchscoreItems[catid];
                        if (cat == null) {
                            matchscoreItems[catid] = cat = {id: catid, score: 0, products: []};
                        }
                        cat.products.push(res);
                        cat.score = Math.max(res.score, cat.score);
                    }
                    // Otherwise, it is a product
                    else {
                        var prodid = res.product;
                        var prod = matchscoreItems[prodid];
                        if (prod == null){
                            matchscoreItems[prodid] = prod = {id: prodid, score: 0};
                        }
                        prod.score = res.score;
                    }
                });
                // Sort the products of each category
                Object.keys(matchscoreItems).map(function(key) { return matchscoreItems[key]; }).forEach(function(item) {
                    if (item.hasOwnProperty("products")){
                        if (item.products != null){
                            item.products.sort(function(a, b){
                                return b.score - a.score;
                            });
                        }
                    }
                });
                if (callback) {
                    callback(matchscoreItems);
                }
            } else if (portfolioId && categoryId) { // On a category page
                var matchscoreItems = {};
                (results.results || []).forEach(function(res) {
                    var prodid = res.product;
                    var prod = matchscoreItems[prodid];
                    if (prod == null){
                        matchscoreItems[prodid] = prod = {id: prodid, score: 0};
                    }
                    prod.score = res.score;
                });
                if (callback) {
                    callback(matchscoreItems);
                }
            } else {
                // Not on a portfolio page or category page, so what to do now?
                if (callback) {
                    callback({});
                }
            }
        }).fail(function(err, status, exc){
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                {
                    type: status ,
                    statusCode: err.status, 
                }
            ));
            //console.log("additional match criteria, matchscore - network error: ", err.status, status, exc);
            // If network connection lost, retry
            if (err.status == 0){
                triggerMoreMatchbyGray();
                setTimeout(function() {
                    queryMatchServiceMoreMatchby(callback)},
                    3000);
            }
            else if (err.status >= 400){
                triggerMoreMatchbyGray();
            }
        })
    }
    
    function changeCheckState(el, isSelected){
        if (isSelected && !$(el).parent().hasClass("selected")){
            $(el).prop("checked", true);
            $(el).parent().addClass("selected");
        } else {
            $(el).prop("checked", false);
            $(el).parent().removeClass("selected");
        }
    }
    
    // user has clicked on something, update the profile
    function selectMatchbyProperty(el) {
        // Make checkboxes act like radio buttons, for now.
        var isCheck = $(el).is("input[type=checkbox]");
        if (isCheck){
            var checkboxes = $("#additional-match-criteria :checkbox");
            $(checkboxes).each(function(idx) {
                // Select this check
                if ($(this).is($(el))){
                    changeCheckState(el, true);
                }
                // Deselect all other checks
                else {
                    changeCheckState(this, false);
                }
            });
        }
    
        var props = getMatchbySelections();
        updateProfileMoreMatchby(props);
    
        var portfolioId = $("#additional-match-criteria").attr("data-port-id");
        var categoryId = $("#additional-match-criteria").attr("data-cat-id");
        if (categoryId == "na") {
            categoryId = null;
        }
    
        queryMatchServiceMoreMatchby(triggerMatchbyEvents);
    }
    
    // Trigger match score results with any components 
    function triggerMatchbyEvents(results){
        var profile = getUserProfileMoreMatchby();
        if (Object.keys(profile.criteria.general).length === 0 && Object.keys(profile.criteria.features).length === 0){
            $(".matchscore-component").trigger("matchscore:update", [{}, function() { triggerMoreMatchbyEnable(); }]);
        }
        else {
            $(".matchscore-component").trigger("matchscore:update", [results, function() { triggerMoreMatchbyEnable(); }]);
        }
    }
    
    // get all property values from match elements;
    // make sure to also get null values so that props can be removed
    function getMatchbySelections() {
        var properties = [];
        // for now all elements are checkboxes
        var checkboxes = $("#additional-match-criteria :checkbox");
        $(checkboxes).each(function(idx) {
            var checked = $(this).prop("checked");
            var prop = $(this).attr("data-profile-property");
            var vtype = $(this).attr("data-value-type");
            var pval = null;
            if (checked) {
                // value is either keyword or TRUE
                if (vtype === "keyword") {
                    pval = $(this).val();
                } else if (vtype === "opt-in") {
                    // opt-in is a variant of boolean where the values are true or null (no false)
                    pval = true;
                }
            }
            // property name, type, value
            properties.push({
                name: prop,
                type: vtype,
                value: pval
            });
        });
    
        var sliders = $("#additional-match-criteria .matchby-slider");
        $(sliders).each(function(idx) {
            var val = $(this).val()-1;
            var option = $(this).parent().find("div").find("option").eq(val);
            var prop = $(option).attr("data-profile-property");
            var vtype = $(option).attr("data-value-type");
            var pval = null;
            if (val > 0){ // Zero always has to be the neutral selection
                pval = $(option).attr("data-value");
            }
            properties.push({
                name: prop,
                type: vtype,
                value: pval
            });
        });
        return properties;
    }
    
    // get the user's profile and use the contents to initially populate the component match elements
    function populateMatchbyElements() {
        var profile = getUserProfileMoreMatchby();
        for (var pkey in profile.criteria.general) {
            var pval = profile.criteria.general[pkey];
            // is val an array? if not make it one so we can iterate
            if (!Array.isArray(pval)) {
                pval = [pval];
            }
            pval.forEach(function(v) {
                // get all elements associated with this property
                var el = $("#additional-match-criteria [data-profile-property='" + pkey + "']");
                var item;
                if (el.length > 1) {
                    // Filter on the value
                    // Try checkbox first
                    item = $(el).filter(":checkbox[value='" + v + "']");
                    // If no checkboxes, try options (for sliders)
                    if (item.length === 0){
                        item = $(el).filter("option[data-value='" + v + "']");
                        var itemind = $(item).attr("data-index");
                        var sliderParent = $(item).parent().parent().parent();
                        var slider = $(sliderParent).find("input");
                        $(slider).val(parseInt(itemind) + 1);
    
                        // Update the slider's color before the thumb
                        updateMatchbySliderColor(slider);
    
                        return true;
                    }
                }
                el = item;
                // everything checkboxes for now
                $(el).parent().addClass("selected");
                $(el).prop("checked", true);
            });
        }

        updateMoreMatchbyInputTracking(profile);
    }
    
    function updateMatchbySliderColor(slider){
        // If not Edge, as this seems to break on that browser
        if (window.navigator.userAgent.indexOf("Edge") == -1) {
            var val = ($(slider).val() - $(slider).attr('min')) / ($(slider).attr('max') - $(slider).attr('min'));
        
                $(slider).css('background-image',
                    '-webkit-gradient(linear, left top, right top, '
                    + 'color-stop(' + val + ', rgba(5,104,175,0.5)), '
                    + 'color-stop(' + val + ', transparent)'
                    + ')'
                );
        }
    }

    function updateMoreMatchbyInputTracking(profile){
        var inputTrackEl = $(".additional-match-container.matchscore-track");
        if ($(inputTrackEl).length > 0){
            var valsString = "~AdditionalMatchCriteria";

            for (var pkey in profile.criteria) {
                if (pkey === "general"){
                    for (var gkey in profile.criteria.general){
                        valsString = valsString + "|" + gkey + "-" + profile.criteria.general[gkey];
                    }
                }
            }

            $(inputTrackEl).attr("data-content", valsString);
        }
    }

    function moreMatchbySliderTracking (slider){
		if (typeof att.adobeDataLayer !== 'undefined'){
            var dataSlot = $(slider).attr("data-slot") || "Body";
            var dataName = $(slider).attr('data-name') || "AdditionalMatchCriteria-Slider";
            var dataUrl  = "blank";
            var dataContent = $(slider).attr('data-content') || '';

            var val = $(slider).val()-1;
            var option = $(slider).parent().find("div").find("option").eq(val);
        	var sliderVal = $(option).attr("data-value");
            if (sliderVal == "null"){
                sliderVal = 0;
            }
        	dataContent = dataContent + ": " + sliderVal;
            console.log("more matchby content: ", dataContent);
            if(typeof att.adobeDataLayerManager !== 'undefined') {
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataOnClick(slider, 
                            {
                                'linkPosition'       : dataSlot,
                                'contentFriendlyName': dataContent,
                                'linkName'           : dataName,
                                'linkDestinationUrl' : dataUrl
                            }
                ));
            }
        }
    }
    
    $(document).ready(function(){
        if($("#additional-match-criteria").length > 0) {
			$(".more-matchby-check").on("click", function() {
                selectMatchbyProperty(this);
                if ($(this).closest('.matchscore-track').hasClass('no-sliders')) { // A/B testing: no sliders!
                    var seqId = $(this).closest('.matchby-selections-container').find('input.more-matchby-check').toArray().indexOf(this);
                    $(this).closest('.matchby-checkbox-container').siblings('.matchby-slider-container').children('input.matchby-slider').each(function(index, elt) {
                        $(elt).val((seqId >= 0 ? seqId : 0)+1);
                    });
                }
            });
    
            $(".more-matchby-slider").on("change", function() {
                selectMatchbyProperty(this);
                moreMatchbySliderTracking(this);
            });


            $('input[type="range"]').on('input', function () {
                updateMatchbySliderColor(this);
            });
        
            $("#additional-match-drawer-control").on('click', function(e){
                // If open
                if ($(".additional-match-container").hasClass("active")){
                    // Close it
                    $(".additional-match-container").removeClass("active")
                    var chevron = $("#additional-match-drawer-control").find(".glyphicon");
                    if ($(chevron).hasClass("glyphicon-chevron-up")){
                        $(chevron).removeClass("glyphicon-chevron-up");
                    }
                    $(chevron).addClass("glyphicon-chevron-down");
                } 
                // Otherwise
                else {
                    // Open it
                    $(".additional-match-container").addClass("active")
                    var chevron = $("#additional-match-drawer-control").find(".glyphicon");
                    if ($(chevron).hasClass("glyphicon-chevron-down")){
                        $(chevron).removeClass("glyphicon-chevron-down");
                    }
                    $(chevron).addClass("glyphicon-chevron-up");
                }
            });
        
            populateMatchbyElements();

            $("#additional-match-criteria").each(function(outerIdx, matchby) {
                if ($(matchby).closest('.matchscore-track').hasClass('no-sliders')) { // A/B testing: no sliders!
                    var seqId = $(matchby).find('.matchby-selection').toArray().indexOf($(matchby).find('.matchby-selection.selected')[0]);
                    $(matchby).find('input.matchby-slider').each(function(index, elt) {
                        $(elt).val((seqId >= 0 ? seqId : 0)+1);
                    });
                }    
            });

            var shouldQueryOnStart = $("#additional-match-criteria").attr("data-should-query-on-start");
            if (shouldQueryOnStart == "true"){
                queryMatchServiceMoreMatchby(triggerMatchbyEvents);
            }

            // Listen for enable controls event from other matchscore input components
            $(".matchscore-inputs-component").on("matchscore-inputs:enable", function (event) {
				enableMoreMatchControls();
            });

            // Listen for disable controls event from other matchscore input components
            $(".matchscore-inputs-component").on("matchscore-inputs:disable", function (event) {
				disableMoreMatchControls();
            });

            // Listen for ungray controls event from other matchscore input components
            $(".matchscore-inputs-component").on("matchscore-inputs:ungray", function (event) {
				ungrayMoreMatchControls();
            });

            // Listen for gray controls event from other matchscore input components
            $(".matchscore-inputs-component").on("matchscore-inputs:gray", function (event) {
				grayMoreMatchControls();
            });

            // Analytics page unload - using linkClick now, as we do not have page exit event for analytics yet.
            /*$(window).on("unload", function(event) {
                if (typeof ddo !== 'undefined'){
                    var dataSlot = $(".additional-match-container.matchscore-track").attr("data-slot") || "Body";
                    var dataName = $(".additional-match-container.matchscore-track").attr('data-name') || "AdditionalMatchCriteria";
                    var dataUrl  = "blank";
                    var dataContent = $(".additional-match-container.matchscore-track").attr('data-content') || '';
    
                    ddo.pushEvent('linkClick', 'Link_Click', 
                            {
                                'linkPosition'       : dataSlot,
                                'contentFriendlyName': dataContent,
                                'linkName'           : dataName,
                                'linkDestinationUrl' : dataUrl
                            }
                    );
                }
            });*/
        }
    });
})(jQuery.noConflict(), window, document);

;(function ($, window, document, undefined) {

    // retrieve user's business profile from local storage
    function getUserProfile() {
        var profileContent = localStorage.getItem("businessProfile");
        var profile = profileContent ? JSON.parse(profileContent) : null;
        if (!profile || !profile.version || profile.version < 2) {
            // clear profile if version too old
            profile = { version: 2 };
        }
        if (profile.criteria == null) {
            profile.criteria = {};
        }
        if (profile.criteria.general == null) {
            profile.criteria.general = {};
        }
        if (profile.criteria.features == null){
            profile.criteria.features = {};
        }
        return profile;
    }
    
    // update the user profile based on changes
    function updateProfile(props) {
        var profile = getUserProfile();
    
        // build the values up from match content
        var runningValues = {};
        props.forEach(function(p) {
            if (p.type === "keyword") {
                // may be multiple values
                var rv = runningValues[p.name];
                if (p.value != null) {
                    runningValues[p.name] = rv == null ? [p.value] : rv.concat([p.value]);
                } else if (rv == null) {
                    runningValues[p.name] = [];
                }
            } else if (p.type === "opt-in") {
                // only possible values are true or null
                runningValues[p.name] = p.value;
            }
        });
        // now prune the values
        for (var pname in runningValues) {
            var pvalue = runningValues[pname];
            if (Array.isArray(pvalue)) {
                if (pvalue.length === 1) {
                    // make a singleton
                    pvalue = pvalue[0];
                } else if (pvalue.length === 0) {
                    // remove property completely
                    pvalue = null;
                }
            }
            if (pvalue == null) {
                delete profile.criteria.general[pname];
            } else {
                profile.criteria.general[pname] = pvalue;
            }
        }

        updateMatchbyInputTracking(profile);

        // write back
        profile = JSON.stringify(profile);
        localStorage.setItem("businessProfile", profile);
    }
    
    function formatScore(score) {
        return Math.round(score * 100);
    }

    function grayControls(){
		$(".matchby-selection").addClass("disabled");
        $(".matchby-slider").addClass("disabled");
    }

    function ungrayControls(){
        $(".matchby-selection").removeClass("disabled");
        $(".matchby-slider").removeClass("disabled");
    }
    
    function disableControls(){
        $(".matchby-selection > input").attr("disabled", true);
        $(".matchby-slider").attr("disabled", true);
    }
    
    function enableControls(){
        $(".matchby-selection > input").attr("disabled", false);
        $(".matchby-slider").attr("disabled", false);
    }
    
    function queryMatchService(callback) {
        disableControls();
        var portfolioId = $("#matchby").attr("data-port-id");
        if (typeof portfolioId === "undefined") portfolioId = "internet_and_networking";
        var categoryId = $("#matchby").attr("data-cat-id");
        if (categoryId == "null" || typeof categoryId === "undefined") {
            categoryId = null;
        }
    
        var products = $(".matchscore-prod-card");
        /*var productIds = [];
        $(products).each(function(idx){
            var id = $(this).attr("id");
            productIds.push(id);
        });*/
    
        var profile = getUserProfile();
    
        var payload = {businessProfile : profile};
        //console.log("payload: ", payload);
        if (portfolioId != null) {
            payload.portfolioId = portfolioId;
        }
        if (categoryId != null) {
            payload.categoryId = categoryId;
        }
        /*if (productIds != null) {
            payload.productIds = productIds;
        }*/
    
        //console.log("payload: ", JSON.stringify(payload));
    
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            mimeType: "application/json",
            url: '/attmatchscore',
            data: JSON.stringify(payload),
        }).done(function(results){
            ungrayControls();
            // If this is a portfolio page
            if (portfolioId && !categoryId) {
                // collate by category
                var matchscoreItems = {};
                (results.results || []).forEach(function(res) {
                    var catid = res.category;
                    // If the category id is present
                    if (catid != null){
                        var cat = matchscoreItems[catid];
                        if (cat == null) {
                            matchscoreItems[catid] = cat = {id: catid, score: 0, sortScore: 0, products: []};
                        }
                        cat.products.push(res);
                        cat.score = Math.max(res.score, cat.score);
                        if (res.sortScore != null){
                            cat.sortScore = res.sortScore;
                        }
                    }
                    // Otherwise, it is a product
                    else {
                        var prodid = res.product;
                        var prod = matchscoreItems[prodid];
                        if (prod == null){
                            matchscoreItems[prodid] = prod = {id: prodid, score: 0, sortScore: 0};
                        }
                        prod.score = res.score;
                        if (res.sortScore != null){
                            prod.sortScore = res.sortScore;
                        }
                    }
                });
                // Sort the products of each category
                Object.keys(matchscoreItems).map(function(key) { return matchscoreItems[key]; }).forEach(function(item) {
                    if (item.hasOwnProperty("products")){
                        if (item.products != null){
                            item.products.sort(function(a, b){
                                return b.score - a.score;
                            });
                        }
                    }
                });
                if (callback) {
                    callback(matchscoreItems);
                }
            } else if (portfolioId && categoryId) { // On a category page
                var matchscoreItems = {};
                (results.results || []).forEach(function(res) {
                    var prodid = res.product;
                    var prod = matchscoreItems[prodid];
                    if (prod == null){
                        matchscoreItems[prodid] = prod = {id: prodid, score: 0};
                    }
                    prod.score = res.score;
                });
                if (callback) {
                    callback(matchscoreItems);
                }
            } else {
                // Not on a portfolio page or category page, so what to do now?
                if (callback) {
                    callback({});
                }
            }
        }).fail(function(err, status, exc){
            //console.log("adjust match criteria, matchscore - network error: ", err.status, status, exc);
            // If network connection lost, retry
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                {
                    type: status ,
                    statusCode: err.status, 
                }
            ));
            if (err.status == 0){
                grayControls();
                setTimeout(function() {
                    queryMatchService(callback)},
                    3000);
            } else if (err.status >= 400){
                grayControls();
            }
        });
    }
    
    function changeCheckSelectionState(el, isSelected){
        if (isSelected && !$(el).parent().hasClass("selected")){
            $(el).prop("checked", true);
            $(el).parent().addClass("selected");
        } else {
            $(el).prop("checked", false);
            $(el).parent().removeClass("selected");
        }
    }
    
    // user has clicked on something, update the profile
    function selectProfileProperty(el) {
        // Make checkboxes act like radio buttons, for now.
        var isCheck = $(el).is("input[type=checkbox]");
        if (isCheck){
            var checkboxes = $("#matchby :checkbox");
            $(checkboxes).each(function(idx) {
                // Select this check
                if ($(this).is($(el))){
                    changeCheckSelectionState(el, true);
                }
                // Deselect all other checks
                else {
                    changeCheckSelectionState(this, false);
                }
            });
        }
    
        var props = getPropertiesFromElements();
        updateProfile(props);
    
        queryMatchService(triggerMatchScoreEvents);
    }
    
    // Trigger match score results with any components 
    function triggerMatchScoreEvents(results){
        var profile = getUserProfile();
        if (Object.keys(profile.criteria.general).length === 0 && Object.keys(profile.criteria.features).length === 0){
            $(".matchscore-component").trigger("matchscore:update", [{}, function() { enableControls(); }]);
        }
        else {
            $(".matchscore-component").trigger("matchscore:update", [results, function() { enableControls(); }]);
        }
    }
    
    // get all property values from match elements;
    // make sure to also get null values so that props can be removed
    function getPropertiesFromElements() {
        var properties = [];
        // for now all elements are checkboxes
        var checkboxes = $("#matchby :checkbox");
        $(checkboxes).each(function(idx) {
            var checked = $(this).prop("checked");
            var prop = $(this).attr("data-profile-property");
            var vtype = $(this).attr("data-value-type");
            var pval = null;
            if (checked) {
                // value is either keyword or TRUE
                if (vtype === "keyword") {
                    pval = $(this).val();
                } else if (vtype === "opt-in") {
                    // opt-in is a variant of boolean where the values are true or null (no false)
                    pval = true;
                }
            }
            // property name, type, value
            properties.push({
                name: prop,
                type: vtype,
                value: pval
            });
        });
    
        var sliders = $("#matchby .matchby-slider");
        $(sliders).each(function(idx) {
            var val = $(this).val()-1;
            var option = $(this).parent().find("div").find("option").eq(val);
            var prop = $(option).attr("data-profile-property");
            var vtype = $(option).attr("data-value-type");
            var pval = null;
            if (val > 0){ // Zero always has to be the neutral selection
                pval = $(option).attr("data-value");
            }
            properties.push({
                name: prop,
                type: vtype,
                value: pval
            });
        });
        return properties;
    }
    
    // get the user's profile and use the contents to initially populate the component match elements
    function populateProfileElements() {
        var profile = getUserProfile();
        for (var pkey in profile.criteria.general) {
            var pval = profile.criteria.general[pkey];
            // is val an array? if not make it one so we can iterate
            if (!Array.isArray(pval)) {
                pval = [pval];
            }
            pval.forEach(function(v) {
                // get all elements associated with this property
                var el = $("#matchby [data-profile-property='" + pkey + "']");
                var item;
                if (el.length > 1) {
                    // Filter on the value
                    // Try checkbox first
                    item = $(el).filter(":checkbox[value='" + v + "']");
                    // If no checkboxes, try options (for sliders)
                    if (item.length === 0){
                        item = $(el).filter("option[data-value='" + v + "']");
                        var itemind = $(item).attr("data-index");
                        var sliderParent = $(item).parent().parent().parent();
                        var slider = $(sliderParent).find("input");
                        $(slider).val(parseInt(itemind) + 1);

                        // Update the slider's color before the thumb
                        updateSliderColor(slider);
    
                        return true;
                    }
                }
                el = item;
                // everything checkboxes for now
                $(el).parent().addClass("selected");
                $(el).prop("checked", true);
            });
        }

        updateMatchbyInputTracking(profile);
    }
    
    function updateSliderColor(slider){
        // If not Edge, as this seems to break on that browser
        if (window.navigator.userAgent.indexOf("Edge") == -1) {
            var val = ($(slider).val() - $(slider).attr('min')) / ($(slider).attr('max') - $(slider).attr('min'));
        
                $(slider).css('background-image',
                    '-webkit-gradient(linear, left top, right top, '
                    + 'color-stop(' + val + ', rgba(5,104,175,0.5)), '
                    + 'color-stop(' + val + ', transparent)'
                    + ')'
                );
        }
    }

    function updateMatchbyInputTracking(profile){
        var inputTrackEl = $(".matchby-container.matchscore-track");
        if ($(inputTrackEl).length > 0){
            var valsString = "~AdjustMatchCriteria";

            for (var pkey in profile.criteria) {
                if (pkey === "general"){
                    for (var gkey in profile.criteria.general){
                        valsString = valsString + "|" + gkey + "-" + profile.criteria.general[gkey];
                    }
                }
            }

            $(inputTrackEl).attr("data-content", valsString);
        }
    }

    function matchbySliderTracking (slider){
		if (typeof att.adobeDataLayer !== 'undefined'){
            var dataSlot = $(slider).attr("data-slot") || "Body";
            var dataName = $(slider).attr('data-name') || "AdjustMatchCriteria-Slider";
            var dataUrl  = "blank";
            var dataContent = $(slider).attr('data-content') || '';

            var val = $(slider).val()-1;
            var option = $(slider).parent().find("div").find("option").eq(val);
        	var sliderVal = $(option).attr("data-value");
            if (sliderVal == "null"){
                sliderVal = 0;
            }
        	dataContent = dataContent + ": " + sliderVal;
            if(typeof att.adobeDataLayerManager !== 'undefined') {
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataOnClick(slider,
                {
                    'linkPosition'       : dataSlot,
                    'contentFriendlyName': dataContent,
                    'linkName'           : dataName,
                    'linkDestinationUrl' : dataUrl
                }
               ));
            }
        }
    }
    
    $(document).ready(function(){
        if($("#matchby").length > 0) {
            $(".matchby-check").on("click", function() {
                selectProfileProperty(this);                
                if ($(this).closest('.matchscore-track').hasClass('no-sliders')) { // A/B testing: no sliders!
                    var seqId = $(this).closest('.matchby-selections-container').find('input.matchby-check').toArray().indexOf(this);
                    $(this).closest('.matchby-checkbox-container').siblings('.matchby-slider-container').children('input.matchby-slider').each(function(index, elt) {
                        $(elt).val((seqId >= 0 ? seqId : 0)+1);
                    });
                }
            });
    
            $(".matchby-slider").on("change", function() {
                selectProfileProperty(this);
                matchbySliderTracking(this);
            });

            $('input[type="range"]').on('input', function () {
                updateSliderColor(this);
            });
        
            populateProfileElements();

            $("#matchby").each(function(outerIdx, matchby) {
                if ($(matchby).closest('.matchscore-track').hasClass('no-sliders')) { // A/B testing: no sliders!
                    var seqId = $(matchby).find('.matchby-selection').toArray().indexOf($(matchby).find('.matchby-selection.selected')[0]);
                    $(matchby).find('input.matchby-slider').each(function(index, elt) {
                        $(elt).val((seqId >= 0 ? seqId : 0)+1);
                    });
                }    
            });

            queryMatchService(triggerMatchScoreEvents);

            // Analytics page unload - using linkClick now, as we do not have page exit event for analytics yet.
            /*$(window).on("unload", function(event) {
                if (typeof ddo !== 'undefined'){
                    var dataSlot = $(".matchby-container.matchscore-track").attr("data-slot") || "Body";
                    var dataName = $(".matchby-container.matchscore-track").attr('data-name') || "AdjustMatchCriteria";
                    var dataUrl  = "blank";
                    var dataContent = $(".matchby-container.matchscore-track").attr('data-content') || '';
    
                    ddo.pushEvent('linkClick', 'Link_Click', 
                            {
                                'linkPosition'       : dataSlot,
                                'contentFriendlyName': dataContent,
                                'linkName'           : dataName,
                                'linkDestinationUrl' : dataUrl
                            }
                    );
                }
            });*/
            $(document).on('click', '#matchby .expander', function(e) {
                var container = $(this).closest('#matchby');
                var isExpanded = container.attr('data-expanded') == 'false';
                container.attr('data-expanded', isExpanded);
                if (isExpanded) {
                    $(this).addClass('expanded').data('content', 'Expande/Collapse Portfolio MatchScore - Collapse').data('name', 'Collapse');
                    container.addClass('expanded');
                } else {
                    $(this).removeClass('expanded').data('content', 'Expande/Collapse Portfolio MatchScore - Expand').data('name', 'Expand');
                    container.removeClass('expanded');
                }
            });    
        }
    });
})(jQuery.noConflict(), window, document);
;(function ($, window, document, undefined) {

    // retrieve user's business profile from local storage
    function getBusinessProfile() {
        var profileContent = localStorage.getItem("businessProfile");
        var profile = profileContent ? JSON.parse(profileContent) : {};
        if (!profile || !profile.version || profile.version < 2) {
            // clear profile if version too old
            profile = { version: 2 };
        }
        if (profile.criteria == null) {
            profile.criteria = {};
        }
        if (profile.criteria == null) {
            profile.criteria = {};
        }
        if (profile.criteria.general == null) {
            profile.criteria.general = {};
        }
        if (profile.criteria.features == null){
            profile.criteria.features = {};
        }
        return profile;
    }
    
    function disableFeatureNeeds(){
        $(".feature-need-selection > input").attr("disabled", true);
    }
    
    function enableFeatureNeeds(){
        $(".feature-need-selection > input").attr("disabled", false);
    }

    function grayFeatureNeeds(){
        $(".feature-need-selection").addClass("disabled");
    }
    
    function ungrayFeatureNeeds(){
        $(".feature-need-selection").removeClass("disabled");
    }

    function triggerFeatNeedsDisable(){
        $(".matchscore-inputs-component").trigger("matchscore-inputs:disable");
    }

    function triggerFeatNeedsEnable(){
        $(".matchscore-inputs-component").trigger("matchscore-inputs:enable");
    }

    function triggerFeatNeedsGray(){
        $(".matchscore-inputs-component").trigger("matchscore-inputs:gray");
    }

    function triggerFeatNeedsUngray(){
        $(".matchscore-inputs-component").trigger("matchscore-inputs:ungray");
    }
    
    // Update the user profile with the a given feature change
    function updateProfileWithFeature(featureUpdate) {
        var profile = getBusinessProfile();
    
        if (profile.criteria.features == null){
            profile.criteria.features = {};
        }
    
        if (featureUpdate.value != null){
            profile.criteria.features[featureUpdate.id] = featureUpdate.value;
        } else {
            if (profile.criteria.features.hasOwnProperty(featureUpdate.id)){
                delete profile.criteria.features[featureUpdate.id];
            }
        }

        updateInputTracking(profile);
    
        profile = JSON.stringify(profile);
        localStorage.setItem("businessProfile", profile);
    }
    
    function sendMatchServiceQueryFeatureNeeds() {
        triggerFeatNeedsDisable();
        var portfolioId = $(".feature-needs-container").attr("data-port-id");
        if (typeof portfolioId === "undefined") portfolioId = "internet_and_networking";
        var categoryId = $(".feature-needs-container").attr("data-cat-id");
        if (categoryId == "na" || typeof categoryId === "undefined") {
            categoryId = null;
        }
    
        var products = $(".matchscore-prod-card");
        /*var productIds = [];
        $(products).each(function(idx){
            var id = $(this).attr("id");
            productIds.push(id);
        });*/
    
        var profile = getBusinessProfile();
    
        var payload = {businessProfile : profile};
    
        if (portfolioId != null) {
            payload.portfolioId = portfolioId;
        }
        if (categoryId != null) {
            payload.categoryId = categoryId;
        }
        /*if (productIds != null) {
            payload.productIds = productIds;
        }*/
    
        //console.log("payload: ", JSON.stringify(payload));
    
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            mimeType: "application/json",
            url:'/attmatchscore',
            data: JSON.stringify(payload),
        }).done(function(results){
            triggerFeatNeedsUngray();
            var matchscoreItems = {};
            (results.results || []).forEach(function(res) {
                var prodid = res.product;
                var prod = matchscoreItems[prodid];
                if (prod == null){
                    matchscoreItems[prodid] = prod = {id: prodid, score: 0};
                }
                prod.score = res.score;
            });
            triggerMatchScoreUpdate(matchscoreItems);
        }).fail(function(err, status, exc){
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                {
                    type: status ,
                    statusCode: err.status, 
                }
              ));   
            //console.log("feature needs, matchscore - network error: ", err.status, status, exc);
            if (err.status == 0){
                triggerFeatNeedsGray();
                setTimeout(function() {
                    sendMatchServiceQueryFeatureNeeds()},
                    3000);
            }
            else if (err.status >= 400){
                triggerFeatNeedsGray();
            }
        })
    }
    
    // Trigger match score results with any components 
    function triggerMatchScoreUpdate(results){
        var profile = getBusinessProfile();
        if (Object.keys(profile.criteria.general).length === 0 && Object.keys(profile.criteria.features).length === 0){
            $(".matchscore-component").trigger("matchscore:update", [{}, function() { triggerFeatNeedsEnable(); }]);
        }
        else {
            $(".matchscore-component").trigger("matchscore:update", [results, function() { triggerFeatNeedsEnable(); }]);
        }
    }
    
    // get the user's profile and use the contents to initially populate the component match elements
    function populateFeatureNeeds() {
        var profile = getBusinessProfile();
        for (var pkey in profile.criteria) {
            if (pkey === "features"){
                for (var fkey in profile.criteria.features){
                    $(".feature-need-card").find("#"+fkey).parent().addClass("selected");
                    $(".feature-need-card").find("#"+fkey).prop("checked", true);
                }
            }
        }

        updateInputTracking(profile);
    }

    function updateInputTracking(profile){
        var inputTrackEl = $(".feature-needs-container.matchscore-track");
        if ($(inputTrackEl).length > 0){
            var valsString = "~FeatureNeeds";

            for (var pkey in profile.criteria) {
                if (pkey === "features"){
                    for (var fkey in profile.criteria.features){
                        valsString = valsString + "|" + fkey;
                    }
                }
            }

            $(inputTrackEl).attr("data-content", valsString);
        }
    }
    
    $(document).ready(function(){
        if($(".feature-needs-container").length > 0) {
             // Setup the listener for the feature need updates
            $(".feature-needs-container").on("feature-need:update", function( event, featureUpdate ) {
                updateProfileWithFeature(featureUpdate);
                sendMatchServiceQueryFeatureNeeds();
            });
        
            populateFeatureNeeds();
        
            sendMatchServiceQueryFeatureNeeds();
    
            // Listen for enable controls event from other matchscore input components
            $(".matchscore-inputs-component").on("matchscore-inputs:enable", function (event) {
                enableFeatureNeeds();
            });
            
            // Listen for disable controls event from other matchscore input components
            $(".matchscore-inputs-component").on("matchscore-inputs:disable", function (event) {
                disableFeatureNeeds();
            });
    
            // Listen for ungray controls event from other matchscore input components
            $(".matchscore-inputs-component").on("matchscore-inputs:ungray", function (event) {
                ungrayFeatureNeeds();
            });
            
            // Listen for gray controls event from other matchscore input components
            $(".matchscore-inputs-component").on("matchscore-inputs:gray", function (event) {
                grayFeatureNeeds();
            });
    
            // Analytics page unload - using linkClick now, as we do not have page exit event for analytics yet.
            /*$(window).on("unload", function(event) {
                if (typeof ddo !== 'undefined'){
                    var dataSlot = $(".feature-needs-container.matchscore-track").attr("data-slot") || "Body";
                    var dataName = $(".feature-needs-container.matchscore-track").attr('data-name') || "FeatureNeeds";
                    var dataUrl  = "blank";
                    var dataContent = $(".feature-needs-container.matchscore-track").attr('data-content') || '';
    
                    ddo.pushEvent('linkClick', 'Link_Click', 
                            {
                                'linkPosition'       : dataSlot,
                                'contentFriendlyName': dataContent,
                                'linkName'           : dataName,
                                'linkDestinationUrl' : dataUrl
    
                            }
                    );
                }
            });*/

            $('.feature-needs-container').parent().next('.more-matchby').removeClass('expanded');

            $(document).on('click', '.feature-needs-container .expander', function(e) {
                var container = $(this).closest('.feature-needs-container');
                var isExpanded = container.attr('data-expanded') == 'false';
                container.attr('data-expanded', isExpanded);
                if (isExpanded) {
                    $(this).addClass('expanded').data('content', 'Expande/Collapse Category MatchScore - Collapse').data('name', 'Collapse');
                    container.addClass('expanded');
                    container.parent().next('.more-matchby').addClass('expanded');
                } else {
                    $(this).removeClass('expanded').data('content', 'Expande/Collapse Category MatchScore - Expand').data('name', 'Expand');
                    container.removeClass('expanded');
                    container.parent().next('.more-matchby').removeClass('expanded');
                }
            });    
        }
    });
})(jQuery.noConflict(), window, document);

;(function ($, window, document, undefined) {
    
    function toggleState(el){
        var featureId = $(el).attr('id');
        if (typeof featureId !== 'undefined'){
            if (!$(el).parent().hasClass("selected")){
                $(el).prop("checked", true);
                $(el).parent().addClass("selected");
        
                sendUpdate(featureId, true);
            } else {
                $(el).prop("checked", false);
                $(el).parent().removeClass("selected");
        
                sendUpdate(featureId, null);
            }
        }
    }
    
    function sendUpdate(featureId, val){
        var update = {id: featureId, value: val};
        $(".feature-needs-container").trigger("feature-need:update", [update]);
    }
    
    $(document).ready(function(){
        $(".feature-need-check").on("click", function() {
            toggleState(this);
        });
    });
})(jQuery.noConflict(), window, document);

;
(function ($, window, document, undefined) {

    function addCssToClass(className, propertyName, val) {
        var animStyle = document.createElement('style');
        animStyle.type = 'text/css';
        animStyle.innerHTML = className + " {" + propertyName + ":" + val + ";}";
        document.head.appendChild(animStyle);
    }

    function calculateRegularFeatureOverflow(numOptions) {
        var minHeight = 0;
        var maxHeight = 0;
        if (numOptions > 0) {
            var rowsContainer = $(".row.single-option").find(".feature-rows").first();
            if (numOptions > 1) {
                rowsContainer = $(".row.feature-rows").first();
            }
            // Calculate the height for the minimum (4) and the maximum rows
            if (rowsContainer != null) {
                var hasFeaturesHeading = false;
                $(rowsContainer).find(".feature-row, .features-heading").each(function (idx) {
                    if ($(this).hasClass("features-heading")) {
                        hasFeaturesHeading = true;
                    }

                    if (hasFeaturesHeading) {
                        if (idx < 5) {
                            minHeight = minHeight + $(this).outerHeight();
                        }
                    } else {
                        if (idx < 4) {
                            minHeight = minHeight + $(this).outerHeight();
                        }
                    }

                    maxHeight = maxHeight + $(this).outerHeight();
                });
            }
        }

        if (numOptions > 1) {
            addCssToClass(".features-options-table .row.feature-rows", "max-height", minHeight + "px !important");
            addCssToClass(".features-options-table .row.feature-rows.show-all", "max-height", maxHeight + "px !important");
        } else if (numOptions == 1) {
            addCssToClass(".features-options-table .single-option .feature-rows", "max-height", minHeight + "px !important");
            addCssToClass(".features-options-table .single-option .feature-rows.show-all", "max-height", maxHeight + "px !important");
        }
    }

    function calculateTwoColumnFeatureOverflow(numOptions) {
        if (numOptions > 1) {
            $(".option-features").each(function (idx) {
                var localMinHeight = 0;

                $(this).find(".feature-row").each(function (index) {
                    if (index < 3) {
                        var thisRowHeight = $(this).outerHeight();
                        if (thisRowHeight > 0) {
                            localMinHeight = localMinHeight + thisRowHeight;
                        }
                    }
                });
                if (localMinHeight > 0) {
                    addCssToClass(".column-max-height" + idx, "max-height", localMinHeight + "px !important");
                    $(this).addClass("column-max-height" + idx);
                }
            });
        }
        addCssToClass(".features-options-table .two-column-comparison .option-column .option-features.show-all", "max-height", "none !important");
    }

    function calculateOptionsGridOverflow(numOptions) {
        var minHeight = 0;
        var maxHeight = 0;

        var docWidth = $(document).width();

        var cardHeight = $(".features-options-grid > .row").find(".option-column").first().outerHeight();

        if (docWidth > 1103) {
            minHeight = cardHeight * 2; // 2 rows
            maxHeight = Math.ceil(numOptions / 3) * cardHeight; // 3 options per row
        } else if (docWidth > 739) {
            minHeight = cardHeight * 3; // 3 rows
            maxHeight = Math.ceil(numOptions / 2) * cardHeight; // 2 options per row
        } else {
            minHeight = cardHeight * 6; // 6 rows
            maxHeight = numOptions * cardHeight; // 1 option per row
        }

        addCssToClass(".features-options-grid .row", "max-height", minHeight + "px !important");
        addCssToClass(".features-options-grid .row.show-all", "max-height", maxHeight + "px !important");
    }

    function calcFeatureOverflow() {
        var numFeatures = parseInt($(".features-options-container").attr("data-num-features"));
        var numOptions = parseInt($(".features-options-container").attr("data-num-options"));
        if (!isNaN(numFeatures)) {
            if (numFeatures > 0) {
                if (!isNaN(numOptions)) {
                    calculateRegularFeatureOverflow(numOptions);
                    calculateTwoColumnFeatureOverflow(numOptions);
                }
            } else {
                if (!isNaN(numOptions)) {
                    if (numOptions > 6) {
                        calculateOptionsGridOverflow(numOptions);
                    }
                }
            }
        }

        var docWidth = $(document).width();
        if (docWidth >= 1104 && numOptions > 0) {
            if (numFeatures < 5) {
                $("#more-features-control").hide();
            } else {
                $("#more-features-control").show();
            }
        } else if (docWidth < 1104 && numOptions > 0) {
            if (numFeatures < 4) {
                $("#more-features-control").hide();
            } else {
                $("#more-features-control").show();
            }
        }
    }

    function determineFeatureOptionMatch(featureDot, featureName, optionName) {
        optionName = optionName.replace(/[^a-zA-Z0-9]/g, '');
        var optionDatalist = $("#optionname" + optionName);
        var optionOptions = $(optionDatalist).find("option");
        var showDesc = $(".features-options-container").attr("data-show-desc");
        $(optionOptions).each(function (idx) {
            var optionFeatureName = $(this).val().toLowerCase();
            var optionShortDesc = $(this).attr("data-short-desc");
            if (optionShortDesc == null) {
                optionShortDesc = "";
            }

            if (optionFeatureName == featureName.toLowerCase()) {

                if (showDesc == "false") {
                    $(featureDot).addClass("match");
                } else {
                    var featOptTextEl = $(featureDot).parent().find(".feature-option-short-desc").first();
                    $(featOptTextEl).addClass("match");
                    $(featOptTextEl).text(optionShortDesc);
                }

                return false; // break
            }
        });
    }

    function findFeatureOptionMatches() {
        var numOptions = parseInt($(".features-options-container").attr("data-num-options"));

        if (numOptions > 1) {
            var featureOptionDots = $(".feature-option-dot");
            $(featureOptionDots).each(function (idx) {
                var featureName = $(this).attr("data-feature");
                var optionName = $(this).attr("data-option");
                determineFeatureOptionMatch(this, featureName, optionName);
            });
        }
    }

    function closeAllSelects() {
        $(".selection-options").removeClass("options-open");

        $(".selected-option").removeClass("open");
    }

    function showSelectedOption(optionColumn, selectedOptionTitle) {
        var options = $(optionColumn).find(".option-column");

        // Hide all options first
        $(options).removeClass("selected");

        // Find the option that has the same title
        $(options).each(function (idx) {
            var title = $(this).find(".option-name").clone().children().remove().end().text().trim();
            if (title == selectedOptionTitle) {
                $(this).addClass("selected");
                return false;
            }
        });
    }

    function setSelection(optionColumn, selector, optionIndex) {
        var selection = $(selector).find(".selection-options > .selection-option:eq(" + optionIndex + ")");
        selection.addClass("selected");

        var selectionText = $(selection).text();
        var selectionIndex = $(selection).attr("data-index");

        var selectedEl = $(selector).find(".selected-option").first();
        $(selectedEl).text(selectionText);

        // Set as selected
        $(selection).addClass("selected");


        showSelectedOption(optionColumn, selectionText);
    }

    function setDefaultSelections() {
        var numOptions = parseInt($(".features-options-container").attr("data-num-options"));
        if (numOptions > 1) {
            var selectorOne = $("#column-one-selector");
            var selectorTwo = $("#column-two-selector");

            var optionColumnOne = $("#option-column-one");
            var optionColumnTwo = $("#option-column-two");

            setSelection(optionColumnOne, selectorOne, 0);
            setSelection(optionColumnTwo, selectorTwo, 1);
        }
    }

    function addOptionPosition() {
        // Add the order of the options
        $(".option-column-container").each(function (idx) {
            $(this).find(".att-track").attr("data-position", idx);
        });
    }

    function checkCarouselControls(featsOptsCarouselPos, carouselMinLimit, carouselMaxLimit) {
        var leftControl = null;
        var rightControl = null;
        $(".feats-opts-carousel-control").each(function () {
            if ($(this).find(".glyphicon").hasClass("glyphicon-chevron-left")) {
                leftControl = this;
            } else if ($(this).find(".glyphicon").hasClass("glyphicon-chevron-right")) {
                rightControl = this;
            }
        });
        if (featsOptsCarouselPos == carouselMaxLimit) {
            // Disable left
            $(leftControl).addClass("feats-opts-control-disabled");
            // Make sure right is enabled
            $(rightControl).removeClass("feats-opts-control-disabled");
        } else if (featsOptsCarouselPos == carouselMinLimit) {
            // Disable right
            $(rightControl).addClass("feats-opts-control-disabled");
            // Make sure left is enabled
            $(leftControl).removeClass("feats-opts-control-disabled");
        } else {
            // Make sure both are enabled
            $(".feats-opts-carousel-control").removeClass("feats-opts-control-disabled");
        }
    }

    function updateCarouselPreview(featsOptsCarouselPos, featsOptsCarouselIncr) {
        var activeIndex = -featsOptsCarouselPos / featsOptsCarouselIncr;
        var dotIndex = 0;
        $(".carousel-option-dot").each(function () {
            if (dotIndex == activeIndex) {
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active");
                }
            } else {
                $(this).removeClass("active");
            }
            dotIndex = dotIndex + 1;
        });
    }

    $(document).ready(function () {
        // Adjust any option datalists that have spaces in the id
        $(".option-content").find("datalist").each(function (idx) {
            var currentId = $(this).attr("id");
            // Replace any spaces with dashes, and any unicode charachters
            currentId = currentId.replace(/[^a-zA-Z0-9]/g, '');
            $(this).attr("id", currentId);
        });

        findFeatureOptionMatches();

        calcFeatureOverflow();

        setDefaultSelections();

        addOptionPosition();

        $(window).on('resize', function () {
            calcFeatureOverflow();
        });

        $(document).on('click', function (e) {
            closeAllSelects();
        });

        // Option scrolling to contact button
        $(".option-contact-button").on("click", function (e) {
            var contactId = $(this).attr("data-url");
            // The commented out code scrolls in author preview mode, but not in Safari
            //document.getElementById(contactId).scrollIntoView({behavior: "smooth", block: "start", inline: "center"});
            $('html, body').animate({
                scrollTop: $("#" + contactId).offset().top - 100 // Subtracting 100 because it was scrolling past the top
            }, 1000);
            return false;
        });

        // Drop-down selection
        $(".selection-option").on('click', function (e) {
            e.stopPropagation();
            var selectionText = $(this).text();
            var selectionIndex = $(this).attr("data-index");

            // Deselect all selections
            $(this).parent().find(".selection-option").removeClass("selected");

            var selectedEl = $(this).parent().parent().find(".selected-option").first();
            $(selectedEl).text(selectionText);

            // Set as selected
            $(this).addClass("selected");

            var selector = $(this).parent().parent();
            var optionColumm = null;
            if ($(selector).attr("id") == "column-one-selector") {
                optionColumn = $("#option-column-one");
            } else {
                optionColumn = $("#option-column-two");
            }

            showSelectedOption(optionColumn, selectionText);

            closeAllSelects();

            calcFeatureOverflow();
        });

        // Toggle selection options
        $(".selected-option").on('click', function (e) {
            e.stopPropagation();
            var selectionOptions = $(this).parent().find(".selection-options");
            if (selectionOptions.hasClass("options-open")) {
                $(this).removeClass("open");
                $(selectionOptions).removeClass("options-open");
            } else {
                $(this).addClass("open");
                $(selectionOptions).addClass("options-open");
            }
        });

        $("#more-features-control").on('click', function (e) {
            // Check the regular feature rows
            if ($(".feature-rows").hasClass("show-all")) {
                // Close it
                $(".feature-rows").removeClass("show-all");
                var chevron = $("#more-features-control").find(".glyphicon");
                if ($(chevron).hasClass("glyphicon-chevron-up")) {
                    $(chevron).removeClass("glyphicon-chevron-up");
                }
                $(chevron).addClass("glyphicon-chevron-down");

                $("#more-features-text").text("Explore all features");
            }
            // Otherwise
            else {
                // Open it
                $(".feature-rows").addClass("show-all");
                var chevron = $("#more-features-control").find(".glyphicon");
                if ($(chevron).hasClass("glyphicon-chevron-down")) {
                    $(chevron).removeClass("glyphicon-chevron-down");
                }
                $(chevron).addClass("glyphicon-chevron-up");

                $("#more-features-text").text("Show fewer features");
            }

            // Check the two column feature rows
            if ($(".option-features").hasClass("show-all")) {
                $(".option-features").removeClass("show-all");
            } else {
                $(".option-features").addClass("show-all");
            }
        });

        $("#more-options-control").on('click', function (e) {
            if ($(".features-options-grid > .row").hasClass("show-all")) {
                // Close it
                $(".features-options-grid .row").removeClass("show-all");
                var chevron = $("#more-options-control").find(".glyphicon");
                if ($(chevron).hasClass("glyphicon-chevron-up")) {
                    $(chevron).removeClass("glyphicon-chevron-up");
                }
                $(chevron).addClass("glyphicon-chevron-down");

                $("#more-options-text").text("Explore all options");
            } else {
                // Open it
                $(".features-options-grid .row").addClass("show-all");
                var chevron = $("#more-options-control").find(".glyphicon");
                if ($(chevron).hasClass("glyphicon-chevron-down")) {
                    $(chevron).removeClass("glyphicon-chevron-down");
                }
                $(chevron).addClass("glyphicon-chevron-up");

                $("#more-options-text").text("Show fewer options");
            }
        });

        if ($(".feats-opts-carousel-control").length > 0) {
            var featsOptsCarouselPos = 0;
            var featsOptsCarouselIncr = 205; // The min width of the columns (200px) and their right margin (5px)
            var numOptions = parseInt($(".features-options-container").attr("data-num-options"));
            var carouselMaxLimit = 0;
            var carouselMinLimit = -featsOptsCarouselIncr * (numOptions - 4); // numOptions - 4 because 4 is the limit for visiable options on desktop
            // Enable and disable the proper controls on start
            checkCarouselControls(featsOptsCarouselPos, carouselMinLimit, carouselMaxLimit);

            // Handle carousel control clicks
            $(".feats-opts-carousel-control").on('click', function (e) {
                // If not disabled
                if (!$(this).hasClass("feats-opts-control-disabled")) {
                    var child = $(this).find(".glyphicon");
                    if ($(child).hasClass("glyphicon-chevron-left")) {
                        var translateAmount = featsOptsCarouselPos + featsOptsCarouselIncr;
                        if (translateAmount <= carouselMaxLimit) {
                            $(".multi-column").find(".option-column").css({
                                "-webkit-transform": "translate(" + translateAmount + "px, 0px)",
                                "-moz-transform": "translate(" + translateAmount + "px, 0px)",
                                "-ms-transform": "translate(" + translateAmount + "px, 0px)",
                                "-o-transform": "translate(" + translateAmount + "px, 0px)",
                                "transform": "translate(" + translateAmount + "px, 0px)"
                            });
                            featsOptsCarouselPos = translateAmount;
                        }
                    } else if ($(child).hasClass("glyphicon-chevron-right")) {
                        var translateAmount = featsOptsCarouselPos - featsOptsCarouselIncr;
                        if (translateAmount >= carouselMinLimit) {
                            $(".multi-column").find(".option-column").css({
                                "-webkit-transform": "translate(" + translateAmount + "px, 0px)",
                                "-moz-transform": "translate(" + translateAmount + "px, 0px)",
                                "-ms-transform": "translate(" + translateAmount + "px, 0px)",
                                "-o-transform": "translate(" + translateAmount + "px, 0px)",
                                "transform": "translate(" + translateAmount + "px, 0px)"
                            });
                            featsOptsCarouselPos = translateAmount;
                        }
                    }

                    // Enable or disable controls if they are at the limits.
                    checkCarouselControls(featsOptsCarouselPos, carouselMinLimit, carouselMaxLimit);

                    // Update the carousel preview
                    updateCarouselPreview(featsOptsCarouselPos, featsOptsCarouselIncr);
                }
            });

            // Handle carousel preview clicks
            $(".carousel-option-dot").on('click', function (e) {
                var dotIndex = parseInt($(this).attr("data-opt-index"));
                if (!isNaN(dotIndex)) {
                    // Subtract 3, as the dot index always starts at 3
                    dotIndex = dotIndex - 3;
                    if (dotIndex > numOptions - 4) {
                        dotIndex = numOptions - 4;
                    }

                    var translateAmount = dotIndex * -featsOptsCarouselIncr;

                    $(".multi-column").find(".option-column").css({
                        "-webkit-transform": "translate(" + translateAmount + "px, 0px)",
                        "-moz-transform": "translate(" + translateAmount + "px, 0px)",
                        "-ms-transform": "translate(" + translateAmount + "px, 0px)",
                        "-o-transform": "translate(" + translateAmount + "px, 0px)",
                        "transform": "translate(" + translateAmount + "px, 0px)"
                    });

                    featsOptsCarouselPos = translateAmount;

                    // Enable or disable controls if they are at the limits.
                    checkCarouselControls(featsOptsCarouselPos, carouselMinLimit, carouselMaxLimit);

                    // Update the carousel preview
                    updateCarouselPreview(featsOptsCarouselPos, featsOptsCarouselIncr);
                }
            });
        }

        //set equal height for option-column-container
        var maxHeight = '200px';
        $('.two-column-comparison .option-column-container').each(function () {
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
        });

        $('.two-column-comparison .option-column-container').each(function () {
            $(this).height(maxHeight);
        });
    });
    $(window).on('load', function () {
        calcFeatureOverflow();
    });
    $(document).on('click', '.expander', function (e) {
        var isExpanded = $(this).closest('.features-box').attr('data-expanded') == 'false';
        $(this).closest('.features-box').attr('data-expanded', isExpanded);
        isExpanded ? $(this).addClass('expanded') : $(this).removeClass('expanded');
        isExpanded ? $(this).prev().addClass('expanded') : $(this).prev().removeClass('expanded');
    });
})(jQuery.noConflict(), window, document);
;(function ($, window, document, undefined) {

    function setAnim(animDetails, sortTime) {
        var startX = -(animDetails.to.x - animDetails.from.x);
        var startY = -(animDetails.to.y - animDetails.from.y);
    
        var animStyle = document.createElement('style');
        animStyle.type = 'text/css';
        var keyframes = "@keyframes sort-" + animDetails.id + " {0% {-webkit-transform: translate(" + startX + "px, " + startY + "px); transform: translate(" + startX + "px, " + startY + "px);} 100% {-webkit-transform: translate(0px, 0px); transform: translate(0px, 0px);}}";
        var wkKeyframes = "@keyframes sort-" + animDetails.id + " {0% {-webkit-transform: translate(" + startX + "px, " + startY + "px); transform: translate(" + startX + "px, " + startY + "px);} 100% {-webkit-transform: translate(0px, 0px); transform: translate(0px, 0px);}}";
        animStyle.innerHTML = keyframes + "\n" + wkKeyframes;
        document.head.appendChild(animStyle);
        $("#" + animDetails.id).parent().css('animation-name', "sort-" + animDetails.id);
    
        window.setTimeout(clearAnims, sortTime * 1000, animDetails, animStyle);
    }
    
    function clearAnims(animDetails, animStyle) {
        $("#" + animDetails.id).parent().css('animation-name', "");
        animStyle.remove();
    }
    
    function addCss(className, propertyName, val) {
        var animStyle = document.createElement('style');
        animStyle.type = 'text/css';
        animStyle.innerHTML = className + " {" + propertyName + ":" + val + ";}";
        document.head.appendChild(animStyle);
    }
    
    function findRawScoreOfCard(card) {
        var matchScoreEl = $(card).find(".match-score-bean");
        var rawScoreText = $(matchScoreEl).find(".match-score-text").attr("data-raw-score");

        var score = parseFloat(rawScoreText);
        if (isNaN(score)) {
            score = 0;
        }

        return score;
    }

    function findSortScoreOfCard(card) {
        var matchScoreEl = $(card).find(".match-score-bean");
        var sortScore = $(matchScoreEl).find(".match-score-text").attr("data-sort-score");

        var score = parseFloat(sortScore);
        if (isNaN(score)) {
            score = 0;
        }

        return score;
    }
    
    function getCardOrderAndPosition() {
        var cardPositions = {};
        var cardOrder = [];
        var currentIndex = 0;
        $(".matchscore-cardgrid").find(".category-card, .matchscore-product-card").each(function () {
            // Try category card id first.
            var id = $(this).find(".matchscore-cat-card").attr('id');
            // If nothing, find product card id
            if (typeof id === 'undefined') {
                id = $(this).find(".matchscore-prod-card").attr('id');
            }
            var pos = getCardRect(this);
            cardPositions[id] = { "pos": pos, "index": currentIndex };
            cardOrder.push({ "pos": pos, "id": id });
            currentIndex = currentIndex + 1;
        });
    
        return [cardPositions, cardOrder];
    }
    
    function getFutureCardOrder() {
        var cards = [];
        var recThresh = parseInt($(".matchscore-cardgrid").attr("data-rec-thresh"));
    
        $(".category-card, .matchscore-product-card").each(function () {
            // Get the card id, first tyring the category card id
            var id = $(this).find(".matchscore-cat-card").attr('id');
            // If nothing, find product card id
            if (typeof id === 'undefined') {
                id = $(this).find(".matchscore-prod-card").attr('id');
            }
            // Get the card score
    
            var score = parseFloat(findRawScoreOfCard($(this)));
            var sortScore = 0;
            if (isPortfolioPage()){
                sortScore = parseFloat(findSortScoreOfCard($(this)));
            }
            var name = $(this).find(".matchscore-category-title").text();
            if (typeof name === 'undefined' || name === "") name = $(this).find(".matchscore-product-title").text();
    
            cards.push({ id: id, score: score, name: name, sortScore: sortScore });
        });

        if (isPortfolioPage()) {
            // Sort by sort score
            cards.sort(function (a, b) {
                if (a.sortScore !== b.sortScore) {
                    return a.sortScore < b.sortScore ? 1 : b.sortScore < a.sortScore ? -1 : 0;
                }
        
                return a.name > b.name ? 1 : -1;
            });

            // Check for any recommendation and order discrepencies
            cards.sort(function (a, b){
                var weightA = a.score * 100;
                var weightB = b.score * 100;

                if (weightA <= recThresh && weightB <= recThresh || weightA > recThresh && weightB > recThresh){
                    return 0;
                } else if (weightA <= recThresh && weightB > recThresh){
                    return 1;
                } else {
                    return -1;
                }
            });
        } else {
        	cards.sort(function (a, b) {
                if (a.score !== b.score) {
                    return a.score < b.score ? 1 : b.score < a.score ? -1 : 0;
                }
        
                return a.name > b.name ? 1 : -1;
            });
        }

        return cards;
    }

    function getPresentedCardsWithResults(results){
        var resultItems = Object.keys(results).map(function(key) { return results[key]; });
        var foundCards = [];

        for (var i = 0; i < resultItems.length; i++){ 
            resultItems[i].id = "matchscore-id-"+resultItems[i].id;

            if ($("#"+resultItems[i].id).length > 0){
               foundCards.push(resultItems[i]);
            }
        }

        return foundCards;
    }
    
    function sortAndMoveCards() {
        var recThresh = parseInt($(".matchscore-cardgrid").attr("data-rec-thresh"));
        var items = $(".matchscore-cardgrid").find(".row").find(".category-card, .matchscore-product-card").sort(function (a, b) {
            var weightA = findRawScoreOfCard(a);
            var weightB = findRawScoreOfCard(b);

            if (isPortfolioPage()){
                weightA = findSortScoreOfCard(a);
            	weightB = findSortScoreOfCard(b);
            }
    
            if (weightA !== weightB) {
                return weightA < weightB ? 1 : weightB < weightA ? -1 : 0;
            }
    
            var nameA = $(".matchscore-category-title", a).text();
            var nameB = $(".matchscore-category-title", b).text();
            // If not a category card
            if (nameA == "") {
                nameA = $(".matchscore-product-title", a).text();
                nameB = $(".matchscore-product-title", b).text();
            }

			return nameA > nameB ? 1 : -1;
        });

        // Check for sort score and recommendation mismatch.
        if (isPortfolioPage()){
            items.sort(function (a, b){
                var weightA = findRawScoreOfCard(a) * 100;
                var weightB = findRawScoreOfCard(b) * 100;

                if (weightA <= recThresh && weightB <= recThresh || weightA > recThresh && weightB > recThresh){
                    return 0;
                } else if (weightA <= recThresh && weightB > recThresh){
                    return 1;
                } else {
                    return -1;
                }
            });
        }

        // Reverse, as the items will be prepended
        var reverseList = $(items).get().reverse();
    
        $(reverseList).each(function (idx) {
            $(this).detach();
            $(".matchscore-cardgrid > .row").prepend($(this));
        });
    }

    function moveCards(newCardOrder){
		var items = [];

        //for (var i = 0; i < newCardOrder.length; i++){
        for (var i = newCardOrder.length-1; i >= 0; i--){
            var cardEl = $("#"+newCardOrder[i].id).parent();
           	$(cardEl).detach();
			$(".matchscore-cardgrid > .row").prepend($(cardEl));
        }
    }
    
    function getCardRect(el) {
        return {
            x: $(el).offset().left,
            y: $(el).offset().top,
            w: $(el).outerWidth(),
            h: $(el).outerHeight()
        };
    }
    
    function updateCardScore(cardEl, score, recThreshold, rawScore, sortScore) {
        var matchScoreEl = $(cardEl).find(".match-score-bean");
        if (!isPortfolioPage()) {
            var prevScoreFullText = $(matchScoreEl).find(".match-score-text > .score-number").text();
        
            // Handle showing the highlight on score change.
            if (prevScoreFullText != null && score < recThreshold) {
                var prevScoreText = prevScoreFullText.replace("%", "");
                if (prevScoreText != "") {
                    var prevScore = parseInt(prevScoreText);
                    if (prevScore != score) {
                        // Add the temporary highlight
                        $(matchScoreEl).addClass("updated");
                        window.setTimeout(function () {
                            $(matchScoreEl).removeClass("updated");
                        }, 1000);
                    }
                }
            }
        
            // Analytics - add the match score to the cards CTA button, as part of the data-content
            if ($(cardEl).hasClass("matchscore-cat-card")) {
                var ctaEl = $(cardEl).find(".matchscore-category-button");
                $(ctaEl).attr("data-content", "Matchscore Category Card CTA with " + score + "% score");
            } else if ($(cardEl).hasClass("matchscore-prod-card")) {
                var ctaEl = $(cardEl).find(".matchscore-product-button");
                $(ctaEl).attr("data-content", "Matchscore Product Card CTA with " + score + "% score");
            }
        
            // Handle showing the score
            if (!$(matchScoreEl).hasClass("active")) {
                $(matchScoreEl).addClass("active").addClass("fade-in");
                window.setTimeout(function () {
                    $(matchScoreEl).removeClass("fade-in");
                }, 500);
            }
        
            // Handle the recommendations
            if (score >= recThreshold) {
                $(matchScoreEl).addClass("high-score");
            } else {
                $(matchScoreEl).removeClass("high-score");
            }
        
            // Set the new score.
            $(matchScoreEl).find(".match-score-text > .score-number").text(score + "%");
            // Set the raw score as a data attribute.
            $(matchScoreEl).find(".match-score-text").attr("data-raw-score", rawScore);
        } else {
            if ((rawScore * 100) > recThreshold) { // Not using threshold on portfolio page anymore.
                $(matchScoreEl).addClass("high-score");
                // Handle showing the score
                if (!$(matchScoreEl).hasClass("active")) {
                    $(matchScoreEl).addClass("active").addClass("fade-in");
                    window.setTimeout(function () {
                        $(matchScoreEl).removeClass("fade-in");
                    }, 500);
                }
            } else {
                $(matchScoreEl).removeClass("high-score");
                $(matchScoreEl).removeClass("active");
            }
            var matchScoreEl = $(cardEl).find(".match-score-bean");
            $(matchScoreEl).find(".match-score-text > .score-number").text("Recommended");
			// Set the raw score as a data attribute.
            $(matchScoreEl).find(".match-score-text").attr("data-raw-score", rawScore);
            $(matchScoreEl).find(".match-score-text").attr("data-sort-score", sortScore);
        }
    }
    
    function formatScore(score) {
        return Math.round(score * 100);
    }

    function addCardPosition(){
        // Add the order of the cards
        $(".matchscore-category-button, .matchscore-product-button").each(function(idx) {
            $(this).attr("data-position", idx);
        });
    }
    
    function updateMatchScores(results, recThreshold) {
        if (Object.keys(results).length === 0) {
            // Hide scores
            if ($(".matchscore-cardgrid").find(".match-score-bean").hasClass("active")) {
                $(".matchscore-cardgrid").find(".match-score-bean").removeClass("active");
            }
        } else {
            for (var id in results) {
                var score = formatScore(results[id].score);
                var rawScore = results[id].score;
                var sortScore = 0;
                if (results[id].sortScore != null){
                    sortScore = results[id].sortScore;
                }
                var card = null;
                
                var cardEl = $(".matchscore-cardgrid").find("[data-id='matchscore-id-" + id + "']");
                
                if (cardEl != null) {
                    updateCardScore(cardEl, score, recThreshold, rawScore, sortScore);
                }
            }
        }
    }
    
    function processShuffling(oldOrderPos, newCardOrder, sortTime) {
        var oldCardPositions = oldOrderPos[0];
        var oldCardOrder = oldOrderPos[1];

        var cardsToUpdate = [];
        for (var i = 0; i < newCardOrder.length; i++) {
            if (newCardOrder[i].id !== oldCardOrder[i].id) {
                var oldPos = oldCardPositions[newCardOrder[i].id].pos;
                var newPos = oldCardPositions[oldCardOrder[i].id].pos;
                cardsToUpdate.push({ "id": newCardOrder[i].id, "from": oldPos, "to": newPos });
            }
        }

        sortAndMoveCards();
        /*if (isPortfolioPage()){
            moveCards(newCardOrder);
        } else {
            sortAndMoveCards();
        }*/

        for (var i = 0; i < cardsToUpdate.length; i++) {
            setAnim(cardsToUpdate[i], sortTime);
        }
    }
    
    function determinePage() {
        var matchElement = $("#matchby, .feature-needs-container").first();
    
        var portfolioId = $(matchElement).attr("data-port-id");
        if (typeof portfolioId === "undefined") portfolioId = "internet_and_networking";
        var categoryId = $(matchElement).attr("data-cat-id");
        if (categoryId == "null" || typeof categoryId === "undefined") {
            categoryId = null;
        }
    
        if (portfolioId != null && categoryId == null) {
            $(".matchscore-cardgrid").addClass("portfolio-page");
        } else if (portfolioId != null && categoryId != null) {
            $(".matchscore-cardgrid").addClass("category-page");
        }
    }
    
    function isPortfolioPage() {
        var matchElement = $("#matchby, .feature-needs-container").first();
    
        var portfolioId = $(matchElement).attr("data-port-id");
        if (typeof portfolioId === "undefined") portfolioId = "internet_and_networking";
        var categoryId = $(matchElement).attr("data-cat-id");
        if (categoryId == "null" || typeof categoryId === "undefined") {
            categoryId = null;
        }
    
        if (portfolioId != null && categoryId == null) {
            return true;
        }

        return false;
    }
    
    $(document).ready(function () {
        // Component properties
        var shouldShuffle = $(".matchscore-cardgrid").attr("data-should-sort") == "true";
        var sortTime = parseFloat($(".matchscore-cardgrid").attr("data-sort-time"));
        if (isNaN(sortTime)) sortTime = 0.75;
        var recThresh = parseInt($(".matchscore-cardgrid").attr("data-rec-thresh"));
    
        // Add the animation time property for sortable cards
        addCss(".matchscore-cardgrid .category-card", "animation-duration", sortTime + "s");
        addCss(".matchscore-cardgrid .matchscore-product-card", "animation-duration", sortTime + "s");
    
        // Determine which page the grid is on
        determinePage();

        addCardPosition();

        // Setup the listener for the matchscore update event
        $(".matchscore-component").on("matchscore:update", function (event, resultsArg, callback) {
            // Get the old scores and positions, before updating
            var oldCardOrderAndPosition = getCardOrderAndPosition();

            // Update the scores
            updateMatchScores(resultsArg, recThresh);
    
            // Get the future order of the cards, for sorting and for determining if there is a top recommendation

            var newCardOrder = [];
            newCardOrder = getFutureCardOrder();
            /*if (isPortfolioPage()){
                newCardOrder = getPresentedCardsWithResults(resultsArg);
            } else {
                newCardOrder = getFutureCardOrder();
            }*/

            // Clear all recommendations
            $(".matchscore-cardgrid").find(".recommended").removeClass("recommended");

            // If empty results
            if (Object.keys(resultsArg).length === 0) {
                // Do not trigger any sorting or animations
                if (callback) {
                    callback();
                    addCardPosition();
                }
            } else {
                // If not on a portfolio page
                if (!isPortfolioPage()) {
                    // Set the recommended card, if its score is above the threshold
                    var topCard = newCardOrder[0];
                    if (topCard.score >= (recThresh/100)) {
                        $("#" + topCard.id).addClass("recommended");
                    }
                }

                if (shouldShuffle) {
                    processShuffling(oldCardOrderAndPosition, newCardOrder, sortTime);
                }
    
                if (callback) {
                    window.setTimeout(callback, sortTime * 1000);
                    window.setTimeout(addCardPosition, sortTime * 1100);
                }
            }
        });

        $(".matchscore-cat-card.card-click").unbind().click(function(e){
            if(!$(e.target).hasClass("category-list-link")) {
                $(this).parent().find(".matchscore-category-title")[0].click();
            } 
        });
    });
    

})(jQuery.noConflict(), window, document);
;
(function ($, window, document, undefined) {
    $(document).ready(function () {
        var session_key_address = "ckav_address";
        var shopNowButton = $('.product-card-top-container .internal-shopnow-link, .product-card-top-container .external-shopnow-link');
        shopNowButton.on('click', function () {
            var addressObj = sessionStorage.getItem(session_key_address);
            var address = '';
            if (addressObj) {
                addressObj = JSON.parse(addressObj);

                var line1 = addressObj.userInputAddressLine1 ? addressObj.userInputAddressLine1 + ', ' : '';
                var line2 = addressObj.userInputAddressLine2 ? addressObj.userInputAddressLine2 + ', ' : '';
                var city = addressObj.userInputCity ? addressObj.userInputCity + ', ' : '';
                var state = addressObj.userInputState ? addressObj.userInputState + ', ' : '';
                var country = addressObj.userInputCountry ? addressObj.userInputCountry : '';

                address = line1 + line2 + city + state + country;
            }

            var url = $(this).attr('data-url');
            if (url.indexOf('?') >= 0) {
                url = url + '&address=' + address;
            } else {
                url = url + '?address=' + address;
            }
            window.open(url, ($(this).hasClass('internal-shopnow-link') ? '_self' : '_blank'));

        })
    });
})(jQuery.noConflict(), window, document);
/**
 * Worldwide Form & related tracking code
 * @required jQuery javascript library
 * @required adobe att tracking library
 * worldwide-form js
 */
;(function ($, window, document, undefined) {

    var isIframe,
    $submitButton,
    selectors = {
        formContainer  : '#worldwide-leadform',
        submitButton   : '.worldwide-form-container #worldwide-form-submit',
        portfolioId    : '#servicePortfolio',
        familyId       : '#serviceFamily',
        serviceId      : '#service',
        lnsCodeStatic  : '#LNSStaticCMS',
        lnsCodeURL     : '#LNSCodeURL',
        formLocation   : '#formLocation',
        email          : '#email',
        company        : '#company',
        formSolInterest: '#formSolutionsOfInterest',
        checkbox       : '.worldwide-form-container .checkbox-div',
        formTextbox    : '.worldwide-form-container .form-textbox',
        eloquaFormURL  : "https://secure.p04.eloqua.com/api/REST/2.0/data/form/177"
    },
    validFormValues = ['datalogs', 'module', 'emailid', 'emailRecipients', 'senderName', 'senderEmail', 'senderSubj', 
					   'servicePortfolio', 'serviceFamily', 'service', 'servPortId', 'servFamId', 'servId', 'emailidElq', 'elqFormName', 'elqFormNameOld', 'solutionOfInterest',
					   'formLocation', 'formType', 'callCenter', 'eloquaCampaignID', 'resourceId',
					   'campaignID', 'redirectURL', 'LNSCodeURL', 'LNSStaticCMS', 
                       'sourceCode', 'source', 'eloquaSub', 'decisionTimeframe', 'segIndus', 'dtvForm', 'elqSiteID', 'salutation',
                       'firstName', 'lastName', 'company', 'jobRole1', 'emailAddress', 'phone', 'region1', 'department', 'comments', 'ckInform', 'ckContact', 'faxnum'],
    setCookieVal = function (cookieName, cookieVal) {
        $.cookie(cookieName, cookieVal, {path: '/'});
    },

    getCookieVal = function (cookieName) {
        return $.cookie(cookieName);
    },     
    

    /**
     * adobeLeadFormSuccess Method will be called after successful post of RAI form submit
     * @param  {Object} options  {formsubmit:<value>, linkname:<value>, slotname:<value>, 
     *                            linkdesturl:<value>, url:<value>, 
     *                            formName:<value>, formEmail:<value>, formCompany:<value>, 
     *                            formServicePortfolip:<value>,
     *                            formServiceFamily:<value>, formService:<value>, 
     *                            formSolutionOfInterest:<value>,
     *                            formRequestType:<value>, formType:<value>}
     * @return {undefined}        returns nothing
     * @example
     * Please documentation of adobeLeadFormSuccess to 
     * understand how to call this function
     */

	adobeLeadFormSuccess = function (container) {
        att.adobeDataLayer.pushEvent(
            att.adobeDataLayerManager.trackingEventCodeData.mcomContactMeSubmit()
        );
		// att.entbus.track.ddo.pushEvent('formResponse', 'MCOM_Contact_Me_Submit', 
        //     {
        //         'successFlag'           : '1',
        //         'linkName'              : 'Contact Me',
        //         'slotFriendlyName'      : 'Worldwide-Form',
        //         'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
        //         'formName'              : 'Worldwide Form',
        //         'formEmail'             : container.find(selectors.email).val(),
        //         'formCompany'           : container.find(selectors.company).val(),
        //         'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
        //         'formServiceFamily'     : container.find(selectors.familyId).val(),
        //         'formService'           : container.find(selectors.serviceId).val(),
        //         'formSolutionOfInterest': container.find(selectors.formSolInterest).val(),                
        //         'formRequestType'       : 'reqaddlinfo',
        //         'formType'				: 'RAI',
		// 		'formActivityCode'		: container.find(selectors.lnsCodeURL).val() || 			
        //         						  container.find(selectors.lnsCodeStatic).val()
    	// 	}
        // );
        
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataLeadGen.digitalFormIsSubmitted(
            {
                name:'Worldwide-Form',
            }
        ));
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingUserCustomTypeData.userProvidedTheirContactEmail());
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.completeAction(
            {
                name:'Worldwide-Form',
                details: {                            
                    email                  : container.find(selectors.email).val(),
                    formCompany            : container.find(selectors.company).val() || '',                
                    formServicePortfolio   : container.find(selectors.portfolioId).val() || '',
                    formServiceFamily      : container.find(selectors.familyId).val() || '',
                    formService            : container.find(selectors.serviceId).val() || '',
                    formSolutionOfInterest : container.find(selectors.formSolInterest).val() || '',
                    formRequestType        : 'reqaddlinfo',
                    formType               : 'RAI',
                    formActivityCode       : container.find(selectors.lnsCodeURL).val() || $(selectors.formContainer).find(selectors.lnsCodeStatic).val() || '',
                    formBusinessType       : '',
                    formLocationCount      : '',
                } 
            }
        ));

	},

    handleSubmitLF = function () {

        var selector = {
            submit       : '#worldwide-form-submit',
            formContainer: '#worldwide-leadform',
            raiformAnchor: '.worldwide-form-anchor'
        },
        classes = {
            disabled      : 'disabled',
            enabledButton : 'enabled-button',
            disabledButton: 'disabled-button'
        },
        urls = {
            formSubmit: '/leadform'
        },

        // TODO: Expecting JSON from backend. Rewrite logic once backend return value converted as JSON
        handleError = function ($field, message) {
            if(message === ' ') return;  // do nothing if no error message returned
            var $container = $field.parent('.form-div');
            $container.find('label, input, select, textarea, span').css('color', 'red');
            $container.find('input, select, textarea').css('border', '1px solid red');
            $(selector.formContainer).find('.form-div .rai-errors').show();
            $(selector.formContainer).find('.form-div .rai-errors').attr("role","alert");
            $container.find('label, input, select').parent().addClass("error");
            $("#formErrors").append("<p class='error-txt'>"+ $container.find('.rai-errors').text() +"</p>"); 
            $("#formErrors").attr("tabindex","0");
        },
        resetError = function () {
            $(selector.formContainer).find('.form-div label, .form-div input, .form-div select, .form-div textarea, .form-div span').css('color', '#191919');
            $(selector.formContainer).find('.form-div input, .form-div select, .form-div textarea').css('border', '1px solid #a9a9a9');
        	$(selector.formContainer).find('.form-div .rai-errors').text("").hide();  
            $(selector.formContainer).find('.form-div .rai-errors').removeAttr("role");
            $(selector.formContainer).find('.form-div').removeClass("error");  
            $("#formErrors .error-txt").remove();
            $("#formErrors").attr("tabindex","-1");        
        },
        handleSuccess = function (data) {
            var outdata;
            try {
                outdata = $.parseJSON(data);
            } catch(err) {
                // may log err in console.
            }

            var status = outdata.success;
            if (status == 'true') {
                adobeLeadFormSuccess($(selector.formContainer));
                $('form.worldwide-leadform, #rai-form-anchor .worldwide-form-heading').hide();
                $('#worldwide-form-submit').hide();
                $('.form-footer').hide();                
                $(selector.formContainer).get(0).reset();
                $('.worldwide-form .section-response .thanks-message').show();
				if( typeof _satellite !== 'undefined' ) {
					_satellite.track('RAIFormCompletion');
				}
                $.when(att.isTrackingLoaded).done(loadABSLeadScript);
            } else {
                resetError();
                delete outdata['success'];
				handleLeadFormError(outdata);
                // adobeTrkLeadFormError($(selector.formContainer), outdata.errorMsg);
            }
        },

        handleLeadFormError = function (outdata) {
            var allmsgErrors = [];
            for (var i = 0; i < outdata.errorMsg.length; i++) {
                var errMsgId = outdata.errorMsg[i];
                if (errMsgId !="" && typeof errMsgId != "undefined") { 
                    var errMsgVal = $('#' + errMsgId).val();
                    $(selector.formContainer).find('#errmsg'+i).text(errMsgVal); 
                    allmsgErrors.push(errMsgVal); 
                    if (errMsgId != "") handleError($('#errmsg'+i), errMsgVal); 
                }
            }
            if($("#worldwide-leadform .form-div.error").length != 0) {
                setTimeout(function() {
                    $("#formErrors").focus();
                },500);
            }      
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.errorAction(
                {
                    msg:allmsgErrors.join('|'),
                    name:'Worldwide-Form'
                }));
        },    

        handleAJAXError = function(xhr, ajaxOptions, thrownError) {
            $('form.worldwide-leadform, h2.worldwide-form-heading, .intro, #worldwide-form-submit, .form-footer').hide();
            $('.worldwide-form .section-response .response-error-message').html(xhr.responseText);
            $('.worldwide-form .section-response .response-error-message').show();
        	// may log xhr.status, thrownError in console
        },
        handleBeforeSend = function () { 
			$(selector.submit)
                .prop('disabled', true)
                .removeClass(classes.enabledButton)
                .addClass(classes.disabledButton)
                .addClass(classes.disabled);
        },
        handleComplete = function (xhr) { 
            $(selector.submit)
                .prop('disabled', false)
                .removeClass(classes.disabledButton)
                .removeClass(classes.disabled)
                .addClass(classes.enabledButton);
            $(selector.raiformAnchor).trigger('click');
        },
        validateForm = function (formData) {
            var itemKey, itemVal, isValidForm = true,
            formDataArray = formData.split('&');
            formDataArray.forEach(function (item) {
                itemKey = item.split("=")[0].split("_")[0];
                itemVal = item.split("=")[1];                
                if (validFormValues.indexOf(itemKey) < 0  || 
                    (itemKey == 'faxnum' && itemVal != '')) {
					isValidForm = false;
                }
        	});
			return isValidForm;
        },
            
		loadABSLeadScript = function() {
            _satellite.track('ABS_bRAIFormSubmission_Lead');
		},
            
        getEloquaEnvURL = function () {
            var eloquaEnv = $(selectors.appEnv).attr("content");
            return selectors.eloquaFormURL;
        },
        options = {
            type: 'POST',
            url: urls.formSubmit,
            data: $(selector.formContainer).serialize() + "&elqFormURL=" + getEloquaEnvURL() + "&raiformtype=worldwide",
            beforeSend: handleBeforeSend,
            success: handleSuccess,
            error: handleAJAXError,
            complete: handleComplete
        };
        if (validateForm($(selector.formContainer).serialize())) {
        	$.ajax(options);            
		}
    },

    handleFormCheckBox = function () {
        if( $(this).find('input[type="checkbox"]').is(':checked') ) {
            $(this).find('.js-icon-checkbox').removeClass('icon-controls-stopL').addClass('icon-controls-checkboxchecked');
        } else {
            $(this).find('.js-icon-checkbox').removeClass('icon-controls-checkboxchecked').addClass('icon-controls-stopL');
        }
    },
        
    textFieldsValidate = function () {
        $(this).val($(this).val().trim());
    },

    bindEvents = function () {
        $(selectors.submitButton).bind('click', handleSubmitLF);      
        $(selectors.formTextbox).bind('focusout', textFieldsValidate);  
        $(selectors.checkbox).bind('click', handleFormCheckBox);        
        att.adobeDataLayer.handleFirtFormElementOnFocus (
            $(selectors.formContainer),
            {
                name:'Worldwide-Form',
                type: 'RAI',                
            }
        );
    },

    init = function () {
        isIframe = (window.top !== window.self);
        $submitButton = $(selectors.submitButton);
    };

    $(function() {
        init();
        bindEvents();
    });

})(jQuery.noConflict(), window, document, undefined);

/**
 * RAI Form & related tracking code
 * @required jQuery javascript library
 * @required adobe att tracking library
 * rai-form js
 */
//alert("raiform1");
;(function ($, window, document, undefined) {
    //alert("raiform");
        var isIframe,
        $formfields,
        $submitButton,
        selectors = {
            submitButton   : '#rai-form-submit',
            selProdInterest: '#productSolutionOfInterest1_1',        
            selProdIntFld  : '#selProdIntFld',
            portfolioId    : '#servicePortfolio',
            familyId       : '#serviceFamily',
            serviceId      : '#service',
            lnsCodeStatic  : '#activityCodeMostRecent1',
            lnsCodeURL     : '#incomingTactic1',
            formLocation   : '#formLocation',
            email          : '#email',
            company        : '#company',
            formSolInterest: '#selProdIntFld',
            formContainer  : '#rai-leadform',
            elqFormURL     : 'https://s1981585949.t.eloqua.com/e/f2',
            elqCheck       : '#permissionOptIn1',
        },
        validFormValues = ['datalogs', 'module', 'emailid', 'emailRecipients', 'senderName', 'senderEmail', 'senderSubj', 
                           'servicePortfolio', 'serviceFamily', 'service', 'servPortId', 'servFamId', 'servId', 'emailidElq', 'elqFormName', 'elqFormNameOld', 'jobRole1', 'jobTitle', 'recvEmail', 'nxReg', 'exBusSeg', 'emailStatus',
                           'formLocation', 'formType', 'solutionOfInterest', 'selProdInterest', 'eloquaCampaignID', 'ElqCustomerGUID', 'elqCookieWrite', 'elqSiteID', 'resourceID', 'requestType1',
                           'campaignID', 'redirectURL1', 'incomingTactic1', 'activityCodeMostRecent1', 
                           'sourceCode1', 'source', 'eloquaSub', 'decisionTimeframe', 'segIndus', 'productSolutionOfInterest1_1', 'productSolutionOfInterest1', 'dtvForm', 'elqSiteID',  'excludeCallCenter',
                           'firstName', 'lastName', 'emailAddress', 'phone', 'selProdIntFld', 'company', 'comments', 'faxnum', 'sdwanFld', 'selIntATT','permissionOptIn1'],
        setCookieVal = function (cookieName, cookieVal) {
            $.cookie(cookieName, cookieVal, {path: '/'});
        },
    
        getCookieVal = function (cookieName) {
            return $.cookie(cookieName);
        },
      
    
        /**
         * adobeLeadFormSuccess Method will be called after successful post of RAI form submit
         * @param  {Object} options  {formsubmit:<value>, linkname:<value>, slotname:<value>, 
         *                            linkdesturl:<value>, url:<value>, 
         *                            formName:<value>, formEmail:<value>, formCompany:<value>, 
         *                            formServicePortfolip:<value>,
         *                            formServiceFamily:<value>, formService:<value>, 
         *                            formSolutionOfInterest:<value>,
         *                            formRequestType:<value>, formType:<value>}
         * @return {undefined}        returns nothing
         * @example
         * Please documentation of adobeLeadFormSuccess to 
         * understand how to call this function
         */
    
        adobeLeadFormSuccess = function (container) {
            att.adobeDataLayer.pushEvent(
                att.adobeDataLayerManager.trackingEventCodeData.mcomContactMeSubmit()
            );
            // att.entbus.track.ddo.pushEvent('formResponse', 'MCOM_Contact_Me_Submit', 
            //     {
            //         'successFlag'           : '1',
            //         'linkName'              : 'Contact Me',
            //         'slotFriendlyName'      : 'RAI-Form',
            //         'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
            //         'formName'              : 'RAI Form',
            //         'formEmail'             : container.find(selectors.email).val(),
            //         'formCompany'           : container.find(selectors.company).val(),
            //         'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
            //         'formServiceFamily'     : container.find(selectors.familyId).val(),
            //         'formService'           : container.find(selectors.serviceId).val(),
            //         'formSolutionOfInterest': container.find(selectors.formSolInterest).val(),                
            //         'formRequestType'       : 'reqaddlinfo',
            //         'formType'				: 'RAI',
            // 		'formActivityCode'		: container.find(selectors.lnsCodeURL).val() || 			
            //         						  container.find(selectors.lnsCodeStatic).val()
            // 	}
            // );
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingUserCustomTypeData.userProvidedTheirContactEmail());        
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.completeAction(
                {
                    name:'RAI Form',
                    details: {                            
                        email                  : container.find(selectors.email).val(),
                        formCompany            : container.find(selectors.company).val() || '',
                        formServicePortfolio   : container.find(selectors.portfolioId).val() || '',
                        formServiceFamily      : container.find(selectors.familyId).val() || '',
                        formService            : container.find(selectors.serviceId).val() || '',
                        formSolutionOfInterest : container.find(selectors.formSolInterest).val() || '',
                        formRequestType        : 'reqaddlinfo',
                        formType               : 'RAI',
                        formActivityCode       : container.find(selectors.lnsCodeStatic).val() || '',
                        formBusinessType       : '',
                        formLocationCount      : '',
                        permissionOptIn1       : $("#permissionOptIn1").val() !== '' ? true:''
                    } 
                }
    
            ));
        },
    
        handleSubmitLF = function () {
    
            var selector = {
                submit       : '#rai-form-submit',
                formContainer: '#rai-leadform',
                raiformAnchor: '.rai-form-anchor'
            },
            classes = {
                disabled      : 'disabled',
                enabledButton : 'enabled-button',
                disabledButton: 'disabled-button'
            },
            urls = {
                formSubmit: '/leadform'
            },        
            // TODO: Expecting JSON from backend. Rewrite logic once backend return value converted as JSON
            handleError = function ($field, message) {
                if(message === ' ') return;  // do nothing if no error message returned
                var $container = $field.parent('.form-div');
                $container.find('label, input, select').css('color', 'red');
                $container.find('input, select').css('border', '1px solid red');
                $container.find('input, select').attr("aria-invalid",true);
                $(selector.formContainer).find('.form-div .rai-errors').show();
                $(selector.formContainer).find('.form-div .rai-errors').attr("role","alert");
                $container.find('label, input, select').parent().addClass("error");
                $("#formErrors").append("<p class='error-txt'>"+ $container.find('.rai-errors').text() +"</p>"); 
                $("#formErrors").attr("tabindex","0");
            },
            resetError = function () {
                $(selector.formContainer).find('.form-div label, .form-div input, .form-div select').css('color', '#191919');
                $(selector.formContainer).find('.form-div input, .form-div select').css('border', '1px solid #a9a9a9');
                $(selector.formContainer).find('.form-div input, .form-div select').attr("aria-invalid",false);
                $(selector.formContainer).find('.form-div .rai-errors').text("").hide();
                $(selector.formContainer).find('.form-div .rai-errors').removeAttr("role");
                $(selector.formContainer).find('.form-div').removeClass("error");  
                $("#formErrors .error-txt").remove();
                $("#formErrors").attr("tabindex","-1");
            },
            handleSuccess = function (data) {
               // alert('success ' + data);
                var outdata;
                try {
                    outdata = $.parseJSON(data);
                } catch(err) {
                    //alert(err);
                    // may log err in console.
                }
    
                var status = outdata.success;
                //alert(status);
                if (status == 'true') {
                    adobeLeadFormSuccess($(selector.formContainer));
                    $('form.rai-leadform, h2.rai-form-heading, .intro').hide();
                    $('#rai-form-submit').hide();
                    $('.form-footer').hide();                
                    $(selector.formContainer).get(0).reset();
                    $('.rai-form .section-response .thanks-message').show();
                    if( typeof _satellite !== 'undefined' ) {
                        _satellite.track('RAIFormCompletion');
                    }
                    $.when(att.isTrackingLoaded).done(loadABSLeadScript);
                } else {
                    resetError();
                    delete outdata['success'];
                    handleLeadFormError(outdata);  

                }
            },
    
            handleLeadFormError = function (outdata) {            
                console.log(outdata.errorMsg.length);
                var allmsgErrors = [];
                for (var i = 0; i < outdata.errorMsg.length; i++) {
                    var errMsgId = outdata.errorMsg[i];
                    if (errMsgId !="" && typeof errMsgId != "undefined") { 
                        var errMsgVal = $('#' + errMsgId).val();
                        $(selector.formContainer).find('#errmsg'+i).text(errMsgVal); 
                        allmsgErrors.push(errMsgVal);                    
                        if (errMsgId != "") handleError($('#errmsg'+i), errMsgVal); 
                    }
                } 
                if($("#rai-leadform .form-div.error").length != 0) {
                    setTimeout(function() {
                        $("#formErrors").focus();
                    },500);
                }                   
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.errorAction(
                    {
                        msg:allmsgErrors.join('|'),
                        name:'RAI Form'
                    }));
            },    
    
            handleAJAXError = function(xhr, ajaxOptions, thrownError) {
                $('form.rai-leadform, h2.rai-form-heading, .intro, #rai-form-submit, .form-footer').hide();
                $('.rai-form .section-response .response-error-message').html(xhr.responseText);
                $('.rai-form .section-response .response-error-message').show();
                // may log xhr.status, thrownError in console
            },
            handleBeforeSend = function () {            
                $(selector.submit)
                    .prop('disabled', true)
                    .removeClass(classes.enabledButton)
                    .addClass(classes.disabledButton)
                    .addClass(classes.disabled);
            },
            handleComplete = function (xhr) { 
                $(selector.submit)
                    .prop('disabled', false)
                    .removeClass(classes.disabledButton)
                    .removeClass(classes.disabled)
                    .addClass(classes.enabledButton);
                $(selector.raiformAnchor).trigger('click');
            },
            validateForm = function (formData) {            
                var itemKey, itemVal, isValidForm = true,
                formDataArray = formData.split('&');
                formDataArray.forEach(function (item) {
                    itemKey = item.split("=")[0].split("_")[0];
                    itemVal = item.split("=")[1];                
                    if (validFormValues.indexOf(itemKey) < 0  || 
                        (itemKey == 'faxnum' && itemVal != '')) {
                        isValidForm = false;
                    }
                });                   
                return isValidForm;
            },
            loadABSLeadScript = function() {
                _satellite.track('ABS_bRAIFormSubmission_Lead');
            },
            options = {
                type: 'POST',
                url: urls.formSubmit,
                data: $(selector.formContainer).serialize() + "&elqFormURL=" + selectors.elqFormURL + "&raiformtype=base",
                beforeSend: handleBeforeSend,
                success: handleSuccess,
                error: handleAJAXError,
                complete: handleComplete
            };
            if (validateForm($(selector.formContainer).serialize())) {
                $.ajax(options);    	
            }
        },
    
        assignValService = function () {
            var selProdInt = $(selectors.selProdIntFld).val();
            var selProdValues = selProdInt.split("|");
            if (selProdInt != "") {
                $(selectors.portfolioId).val(selProdValues[0]);
                $(selectors.familyId).val(selProdValues[1]);
                $(selectors.serviceId).val(selProdValues[2]);
                $(selectors.lnsCode).val(selProdValues[3]);
                $(selectors.selProdInterest).val($(selectors.selProdIntFld).find("option:selected").text());
            } else {
                $(selectors.selProdInterest).val('');
            }
        },
            
        emailValidate = function () {
            $(selectors.email).val($(selectors.email).val().trim());
        }, 
    
        eloquaClick = function () {
            if ($(selectors.elqCheck).is(":checked")) {
                $(selectors.elqCheck).val("Yes");
            } else {
                $(selectors.elqCheck).val("");
            }
        },
    
        bindEvents = function () {
            $(selectors.submitButton).bind('click', handleSubmitLF);      
            $(selectors.selProdIntFld).bind('change', assignValService);  
            $(selectors.email).bind('focusout', emailValidate);
            $(selectors.elqCheck).bind('change', eloquaClick);   
        },
    
        init = function () {
            isIframe = (window.top !== window.self);
            $formfields = $('.rai-form .form-textbox, .rai-form .form-dropdown').not(':hidden');
            $submitButton = $(selectors.submitButton);        
            att.adobeDataLayer.handleFirtFormElementOnFocus (
                $(selectors.formContainer),
                {
                    name:'RAI Form',
                    type: 'RAI',                
                }
            );
        };
        $(function() {
            init();
            bindEvents();
        });
    
    })(jQuery.noConflict(), window, document, undefined);
/**
 * Mailto Form & related tracking code
 * @required jQuery javascript library
 * @required adobe att tracking library
 * 
 */
;(function ($, window, document, undefined) {
	//need to add a config for this (might need to be a different file) so inherited forms can change css classes if necessary
    var isIframe,
    $formfields,
    $submitButton,
    selectors = {
        submitButton   : '#base-form-submit',
        selProdInterest: '#productSolutionOfInterest1_1',        
        selProdIntFld  : '#selProdIntFld',
        portfolioId    : '#servicePortfolio',
        familyId       : '#serviceFamily',
        serviceId      : '#service',
        lnsCodeStatic  : '#activityCodeMostRecent1',
        lnsCodeURL     : '#incomingTactic1',
        formLocation   : '#formLocation',
        email          : '#email',
        company        : '#company',
        formSolInterest: '#selProdIntFld',
		formContainer  : '#base-leadform',
        elqFormURL     : 'https://s1981585949.t.eloqua.com/e/f2'
    },
    validFormValues = ['datalogs', 'module', 'emailid', 'emailRecipients', 'senderName', 'senderEmail', 'senderSubj', 
					   'servicePortfolio', 'serviceFamily', 'service', 'servPortId', 'servFamId', 'servId', 'emailidElq', 'elqFormName', 'elqFormNameOld', 'jobRole1', 'jobTitle', 'recvEmail', 'nxReg', 'exBusSeg', 'emailStatus',
					   'formLocation', 'formType', 'callCenter', 'solutionOfInterest', 'selProdInterest', 'eloquaCampaignID', 'ElqCustomerGUID', 'elqCookieWrite', 'elqSiteID', 'resourceID', 'requestType1',
					   'campaignID', 'redirectURL1', 'incomingTactic1', 'activityCodeMostRecent1', 
                       'sourceCode1', 'source', 'eloquaSub', 'decisionTimeframe', 'segIndus', 'productSolutionOfInterest1_1', 'productSolutionOfInterest1', 'dtvForm', 'elqSiteID', 'excludeCallCenter', 
                       'firstName', 'lastName', 'emailAddress', 'phone', 'selProdIntFld', 'company', 'comments', 'faxnum'],
    setCookieVal = function (cookieName, cookieVal) {
        $.cookie(cookieName, cookieVal, {path: '/'});
    },

    getCookieVal = function (cookieName) {
        return $.cookie(cookieName);
    },     
     /**
     * adobeLeadFormSuccess Method will be called after successful post of RAI form submit
     * @param  {Object} options  {formsubmit:<value>, linkname:<value>, slotname:<value>, 
     *                            linkdesturl:<value>, url:<value>, 
     *                            formName:<value>, formCompany:<value>, 
     *                            formServicePortfolip:<value>,
     *                            formServiceFamily:<value>, formService:<value>, 
     *                            formSolutionOfInterest:<value>,
     *                            formRequestType:<value>, formType:<value>}
     * @return {undefined}        returns nothing
     * @example
     * Please documentation of adobeLeadFormSuccess to 
     * understand how to call this function
     */

	adobeLeadFormSuccess = function (container) {
        att.adobeDataLayer.pushEvent(
            att.adobeDataLayerManager.trackingEventCodeData.mcomContactMeSubmit()
        );
		// att.entbus.track.ddo.pushEvent('formResponse', 'MCOM_Contact_Me_Submit', 
        //     {
        //         'successFlag'           : '1',
        //         'linkName'              : 'Contact Me',
        //         'slotFriendlyName'      : 'RAI-Form',
        //         'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
        //         'formName'              : 'RAI Form',
        //         'formCompany'           : container.find(selectors.company).val(),
        //         'formServicePortfolio'  : container.find(selectors.portfolioId).val() || '',
        //         'formServiceFamily'     : container.find(selectors.familyId).val() || '',
        //         'formService'           : container.find(selectors.serviceId).val() || '',
        //         'formSolutionOfInterest': container.find(selectors.formSolInterest).val(),                
        //         'formRequestType'       : 'reqaddlinfo',
        //         'formType'				: 'RAI'
    	// 	}
        // );
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingUserCustomTypeData.userProvidedTheirContactEmail());
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.completeAction(
            {
                name: 'RAI Form',
                details: {
                    email                   : container.find(selectors.email).attr('name'),
                    formCompany             : container.find(selectors.company).val() || '',
                    formServicePortfolio    : container.find(selectors.portfolioId).val() || '',
                    formServiceFamily       : container.find(selectors.familyId).val() || '',
                    formService             : container.find(selectors.serviceId).val() || '',
                    formSolutionOfInterest  : container.find(selectors.formSolInterest).val() || '',
                    formRequestType         : 'reqaddlinfo',
                    formType                : 'RAI',
                    formActivityCode        : container.find(selectors.lnsCodeURL).val() || '',
                    formBusinessType        : '',
                    formLocationCount       : '',
                } 
            }
        ));
	},

    handleSubmitMailto = function () {

        var selector = {
            submit       : '#base-form-submit',
            formContainer: '#base-leadform',
            raiformAnchor: '.rai-form-anchor'
        },
        classes = {
            disabled      : 'disabled',
            enabledButton : 'enabled-button',
            disabledButton: 'disabled-button'
        },
        urls = {
            formSubmit: '/leadform'
        },

        // TODO: Expecting JSON from backend. Rewrite logic once backend return value converted as JSON
        handleError = function ($field, message) {
            if(message === ' ') return;  // do nothing if no error message returned
            var $container = $field.parent('.form-div');
            $container.find('label, input, select').css('color', 'red');
            $container.find('input, select').css('border', '1px solid red');
            $(selector.formContainer).find('.form-div .base-errors ul li').show();
        },
        resetError = function () {
            $(selector.formContainer).find('.form-div label, .form-div input, .form-div select').css('color', '#191919');
            $(selector.formContainer).find('.form-div input, .form-div select').css('border', '1px solid #a9a9a9');
        	$(selector.formContainer).find('.form-div .base-errors ul li').text("").hide();          
        },
        handleSuccess = function (data) {
            var outdata;
            try {
                outdata = $.parseJSON(data);
            } catch(err) {
                // may log err in console.
            }

            var status = outdata.success;
            if (status == 'true') {
                adobeLeadFormSuccess($(selector.formContainer));
                $('form.base-leadform, h2.base-form-heading, .intro').hide();
                $('#base-form-submit').hide();
                $('.form-footer').hide();                
                $(selector.formContainer).get(0).reset();
                $('.base-form .section-response .thanks-message').show();
				if( typeof _satellite !== 'undefined' ) {
					_satellite.track('RAIFormCompletion');
				}
			    $.when(att.isTrackingLoaded).done(loadABSLeadScript);
            } else {
                resetError();
                delete outdata['success'];
				handleLeadFormError(outdata);    
            }
        },

        handleLeadFormError = function (outdata) {
            var allmsgErrors = [];
            for (var i = 0; i < outdata.errorMsg.length; i++) {
                var errMsgId = outdata.errorMsg[i];
                if (errMsgId !="" && typeof errMsgId != "undefined") { 
                    var errMsgVal = $('#' + errMsgId).val();
                    $(selector.formContainer).find('#errmsg'+i+' ul li').text(errMsgVal);
                    allmsgErrors.push(errMsgVal);  
                    if (errMsgId != "") handleError($('#errmsg'+i), errMsgVal); 
                }
            }        
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.errorAction({msg:allmsgErrors.join('|'),name:'RAI Form'}));        
        },    

        handleAJAXError = function(xhr, ajaxOptions, thrownError) {
            $('form.base-leadform, h2.base-form-heading, .intro, #base-form-submit, .form-footer').hide();
            $('.base-form .section-response .response-error-message').html(xhr.responseText);
            $('.base-form .section-response .response-error-message').show();            
            // may log xhr.status, thrownError in console
        },
        handleBeforeSend = function () { 
			$(selector.submit)
                .prop('disabled', true)
                .removeClass(classes.enabledButton)
                .addClass(classes.disabledButton)
                .addClass(classes.disabled);
        },
        handleComplete = function (xhr) { 
            $(selector.submit)
                .prop('disabled', false)
                .removeClass(classes.disabledButton)
                .removeClass(classes.disabled)
                .addClass(classes.enabledButton);
            $(selector.raiformAnchor).trigger('click');
        },
        validateForm = function (formData) {
            var itemKey, itemVal, isValidForm = true,
            formDataArray = formData.split('&');
            formDataArray.forEach(function (item) {
                itemKey = item.split("=")[0].split("_")[0];
                itemVal = item.split("=")[1];                
                if (validFormValues.indexOf(itemKey) < 0  || 
                    (itemKey == 'faxnum' && itemVal != '')) {
					isValidForm = false;
                }
        	});
			return isValidForm;
        },
		loadABSLeadScript = function() {
            _satellite.track('ABS_bRAIFormSubmission_Lead');
		},
        options = {
            type: 'POST',
            url: urls.formSubmit,
            data: $(selector.formContainer).serialize() + "&elqFormURL=" + selectors.elqFormURL + "&raiformtype=mailto",
            beforeSend: handleBeforeSend,
            success: handleSuccess,
            error: handleAJAXError,
            complete: handleComplete
        };
        if (validateForm($(selector.formContainer).serialize())) {
        	$.ajax(options);            
		}
    },

	assignValService = function () {

		var selProdInt = $(selectors.selProdIntFld).val();
        var selProdValues = selProdInt.split("|");
		if (selProdInt != "") {
            $(selectors.portfolioId).val(selProdValues[0]);
            $(selectors.familyId).val(selProdValues[1]);
            $(selectors.serviceId).val(selProdValues[2]);
            $(selectors.lnsCode).val(selProdValues[3]);
            $(selectors.selProdInterest).val($(selectors.selProdIntFld).find("option:selected").text());
        } else {
            $(selectors.selProdInterest).val('');
        }
	},
        
    emailValidate = function () {
        $(selectors.email).val($(selectors.email).val().trim());
    },        

    bindEvents = function () {
        $(selectors.submitButton).bind('click', handleSubmitMailto);
        $(selectors.selProdIntFld).bind('change', assignValService);  
        $(selectors.email).bind('focusout', emailValidate); 
        att.adobeDataLayer.handleFirtFormElementOnFocus (
            $(selectors.formContainer),
            {
                name:'RAI Form',
                type: 'RAI', 
            }
        );
    },

    init = function () {
        isIframe = (window.top !== window.self);
        $formfields = $('.base-form .form-textbox, .base-form .form-dropdown').not(':hidden');
        $submitButton = $(selectors.submitButton);
    };

    $(function() {
        init();
        bindEvents();
    });

})(jQuery.noConflict(), window, document, undefined);
/**
 * Gated Resource implementation
 * @requires jQuery javascript library
 * @requires adobe att tracking library
 * @requires att.gatedResources<Object Array> from backend (footer.html)
 *           This code should be executed after att.gatedResources loaded & available
 */
;(function ($, window, document, undefined) {
    var gatedResources,
    // value will be set after user requested
    gatedItemRequested = {},
    config = {
        defaultTitle: 'Share your details',
        urls: {
            resourceDetails: '/gated/api/attguid?guid='
        }
    },        
    selectors = {
        gatingContainer: '.gatingContainer',
        gatedResource  : 'a[href$=".pdf"]',
        gatingOverlay  : '#gating-overlay',
        gatingClose    : '.gating-close',
        gatingPrivacy  : '.gating-privacy',        
        gatedForm: {
            fields     : '#gating-container .form-textbox, #gating-container .form-dropdown',
            title      : '.gating-inner h3',
            activityCode    : '#gating-container #LNSStaticCMSGated',
			assetType  : '#gating-container #assetTypeGated',
			callCenter : '#gating-container #callCenterGated',
            resourceID : '#gating-container #resourceIDGated'
        },
        submitButton   : '#gated-form-submit',
        portfolioId    : '#servPortfolioIdGated',
        familyId       : '#servFamilyIdGated',
        serviceId      : '#serviceIdGated',
        lnsCode        : '#LNSStaticCMSGated',
        formLocation   : '#formLocationGated',
        formType	   : '#formTypeGated',        
        email          : '#emailGated',
        company        : '#companyGated',
        formSolInterest: '#formSolutionsOfInterestGated',
        elqFormURL     : 'https://s1981585949.t.eloqua.com/e/f2',
        formContainer  : '#gating_form',
    },

    validFormValues = ['module', 'elqFormName', 'elqSiteID', 'formLocation', 'formType', 'assetType', 'resourceID',
                      'callCenter', 'solutionOfInterest', 'eloquaCampaignID', 'campaignID', 'redirectURL1', 'elqCookieWrite',
                      'recvEmail', 'nxReg', 'incomingTactic1', 'activityCodeMostRecent1', 'sourceCode1', 'source', 'sourceDate', 'eloquaSub', 
                       'requestType1', 'emailStatus', 'gatedForm', 'servicePortfolio', 'serviceFamily', 'service',
                      'jobRole1', 'jobTitle', 'exBusSeg', 'firstName', 'lastName', 'emailAddress', 'phone', 'company', 'faxnum'],


    /**
     * paramsToJson description
     * Parse abc=foo&def=%5Basf%5D&xyz=5 in five steps:
     * decodeURI: abc=foo&def=[asf]&xyz=5
     * Escape quotes: same, as there are no quotes
     * Replace &: abc=foo","def=[asf]","xyz=5
     * Replace =: abc":"foo","def":"[asf]","xyz":"5
     * Suround with curlies and quotes: {"abc":"foo","def":"[asf]","xyz":"5"}
     * which is legal JSON.
     * http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object/8649003#8649003
     * @param  {String} params       eg. "abc=foo&def=[asf]&xyz=5"
     * @return {Object} json object  eg. {"abc":"foo","def":"[asf]","xyz":"5"}
     * @example
     * paramsToJson(window.location.href.split('?')[1])
     * TODO: Move to att.entbus.utils
     */
    paramsToJson = function (params) {
        var json = {};
        json = params?JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
                function(key, value) { return key===""?value:decodeURIComponent(value) }):{};
        return json;
    },

    getGuidFromLS = function (key) {
        return localStorage.getItem(key);
    },

    setGuidFromLS = function (key, value) {
        // look for storage overflow
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // TODO: 22, 4115, FF, overflow
            // catch error
        }
    },
        
    getGatedResourceByUUID = function (uuid) {
        return $.getJSON(config.urls.resourceDetails+uuid)
            .done(function (data) {
                return data;
            })
            .fail(function(jqXHR, textStatus, error) {
                 att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                    {
                        type: textStatus ,
                        statusCode: jqXHR.status, 
                    }
                ));
                  return textStatus;
            }); 
    },

    setGatedFormTitle = function (title) {
        if(typeof title !== 'undefined' && title !== '') {
            $('.gating-inner h3').text(title);
        } else {
            $.getJSON(config.urls.resourceDetails+gatedItemRequested.resource.id)
                .done(function (data) {
                    title = data.title === '' ? config.defaultTitle : data.title;
                    $(selectors.gatedForm.title).text(title);
                })
                .fail (function(jqXHR, textStatus, error) {
                    $(selectors.gatedForm.title).text(config.defaultTitle);
                    att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                        {
                            type: textStatus ,
                            statusCode: jqXHR.status, 
                        }
                    ));
                      return textStatus;
                });
        }
    },


    setGatedFormData = function () {
        var field = "";
        $.getJSON(config.urls.resourceDetails+gatedItemRequested.resource.id)
            .done(function (data) {
                $(selectors.gatedForm.activityCode).val(data.activityCode || '');
                $(selectors.gatedForm.assetType).val(data.assetType ||  '');
                $(selectors.gatedForm.resourceID).val(data.resourceID ||  '');
            })
            .fail (function(jqXHR, textStatus, error) {
                $(selectors.gatedForm.LNSCode).text("");
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                    {
                        type: textStatus ,
                        statusCode: jqXHR.status, 
                    }
                ));
                  return textStatus;
            });
    },

    isGated = function (clickedResource) {
        var gatedResource = { isGated: false, resource: null };
        $.each(gatedResources, function (index, item) {
           if(clickedResource === item.path && item.isGated && item.isGated === 'yes') {
               //gatedResource =  { isGated: true, resource: item };
               $.extend(gatedResource, { isGated: true, resource: item });
               // break the loop
               return false;
            }
        });
        return gatedResource;
    },
        
    isFormSubmitted = function (id) {
        // TODO: defence again empty uuid
        return getGuidFromLS(id) === null ? false : true;
    },

    initiateForm = function () {
        setGatedFormTitle(gatedItemRequested.resource.title);
		setGatedFormData();
        $(selectors.gatingOverlay).show();
        $(selectors.gatingContainer).show();
        if( !$(selectors.gatingPrivacy).isInViewport() ) {
            $(selectors.gatingContainer).css({'overflow-y':'scroll', 'height':'100%'});
        }
        enableSubmit();
    },
    
    handleGatedResources = function (e) {
        e.preventDefault();
        // TODO: what if, content has special char and escaped?
        var clickedReference = $(e.target).closest("a").attr('href');
        // In some places, href available only in parent element (like buttons)
        if (typeof clickedReference === 'undefined') clickedReference = $(e.target).parent().attr('href');
        gatedItemRequested = isGated(clickedReference);
        if(gatedItemRequested.isGated === false) {
            showGatedContent(clickedReference);
        } else if(gatedItemRequested.isGated && isFormSubmitted(gatedItemRequested.resource.id)) {
            showGatedContent(clickedReference);
        } else {
            initiateForm();
        }
    },
        
    handleExternalGatedResourceRequest = function () {
        var uuid = paramsToJson(window.location.href.split('?')[1]).guid,
        handleExternalCase = function (path) {
            if(isFormSubmitted(uuid)) {
                showGatedContent(path);
            } else {
                initiateForm();
            }
        };
        
        getGatedResourceByUUID(uuid)
            .done(function (data) {
                // TODO: Need a better return values from backend to set a maintainable logic
                if(typeof data.success === 'undefined' && typeof data.id !== 'undefined') {
                    $.extend(gatedItemRequested, {resource: data});
                    handleExternalCase(gatedItemRequested.resource.path);
                } 
                // Backend specifically send success flag as false if resource not found
                else if(data.success === false) {
                    // handle failure case with data.exception
                }
            })
            .fail(function (jqXHR,textStatus) {
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                    {
                        type: textStatus ,
                        statusCode: jqXHR.status, 
                    }
                ));
                  return textStatus;
            });
    },

    enableSubmit = function () {
        var formfilled = true;
        // TODO: move selectors to right location
        $("#gating-container .form-textbox, #gating-container .form-dropdown").not(':hidden').each(function (e) {
            if ( $(this).attr("id") != "phoneGated" && $(this).val() === "") {
                formfilled = false;
            }
        });
        // TODO: move selectors to right location
        var submitbtn = $(selectors.submitButton);
        if (formfilled) {
            submitbtn.removeAttr("disabled");
            submitbtn.removeClass("gray").addClass("orange");
        } else {
            submitbtn.attr("disabled", "true");
            submitbtn.removeClass("orange").addClass("gray");
        }
    },
    
    handleSubmitGatedLF = function () {

        var selector = {
            submit       : '#gated-form-submit',
            formContainer: '#gating_form',
            raiformAnchor: '.rai-form-anchor'
        },
        classes = {
            disabled      : 'disabled',
            enabledButton : 'enabled-button',
            disabledButton: 'disabled-button'
        },
        urls = {
            formSubmit: '/leadform'
        },

        // TODO: Expecting JSON from backend. Rewrite logic once backend return value converted as JSON
        handleError = function ($field, message) {
            if(message === ' ') return;  // do nothing if no error message returned
            var $container = $field.parent('.form-fld');
            $container.find('label, input, select').css('background-color', '#FFE7E4');
            $container.find('input, select').css('border', '1px solid red');
            $(selector.formContainer).find('.form-fld .rai-errors ul li').show();            
        },

        resetError = function () {
            $(selector.formContainer).find('.form-fld label, .form-fld input, .form-fld select').css('color', '#fff');
            $(selector.formContainer).find('.form-fld input, .form-fld select').css('border', '1px solid #fff').css('background-color', '#fff');
            $(selector.formContainer).find('.form-fld .rai-errors ul li').text("").hide();          
        },

        handleSuccess = function (data) {

            var outdata;
            try {
                outdata = JSON.parse(data);
            } catch(err) {
                // handle error case
            }

			
            if (outdata.success == 'true') {
                adobeGatedFormSuccess($(selector.formContainer));
                setGuidFromLS(gatedItemRequested.resource.id, 'true');
                showGatedContent(gatedItemRequested.resource.path);
                if( typeof _satellite !== 'undefined' ) {
                    _satellite.track('RAIFormCompletion');
                }
                $(selectors.gatingClose).trigger('click');
            } else {
                resetError();
                delete outdata['success'];   
                var allmsgErrors = [];
                for (var i = 0; i < outdata.errorMsg.length; i++) {
                var errMsgId = outdata.errorMsg[i];
                    if (errMsgId !="" && typeof errMsgId != "undefined") { 
                        var errMsgVal = $('#' + errMsgId).val();
                        $(selector.formContainer).find('#errmsg'+i+'_gated ul li').text(errMsgVal); 
                        allmsgErrors.push(errMsgVal);
                        if (errMsgId != "") handleError($('#errmsg'+i+'_gated'), errMsgVal); 
                    }
                }
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.errorAction({msg:allmsgErrors.join('|'),name:'Gated Form'})); 
                // adobeTrkLeadFormErrorGated($(selector.formContainer), outdata.errorMsg);
                att.adobeDataLayer.pushEvent(
                    att.adobeDataLayerManager.trackingEventCodeData.mcomGatedDownload()
                ); 
            }
        },

        handleAJAXError = function(xhr, ajaxOptions, thrownError) {
            $('.gating-inner h3, .gating-inner p, .gating-inner #required-header, form#gating_form').hide();
            $('.gating-inner .section-response .response-error-message').html(xhr.responseText);
            $('.gating-inner .section-response .response-error-message').show();       
            // handle error case with xhr.status, thrownError
        },

        handleBeforeSend = function () {
            // att.adobeDataLayer.pushEvent(
            //     att.adobeDataLayerManager.trackingEventCodeData.mcomGatedDownload()
            // ); 
            // adobeGatedFormSubmit($(selector.formContainer)); 
            $(selector.submit)
                .prop('disabled', true)
                .removeClass(classes.enabledButton)
                .addClass(classes.disabledButton)
                .addClass(classes.disabled);
        },

        handleComplete = function (xhr) { 
            $(selector.submit)
                .prop('disabled', false)
                .removeClass(classes.disabledButton)
                .removeClass(classes.disabled)
                .addClass(classes.enabledButton);
            // Add scroll bar based on submit button visibility
            if( !$(selectors.gatingPrivacy).isInViewport() ) {
                $(selectors.gatingContainer).css({'overflow-y':'scroll', 'height':'100%'});
            }
        },
        validateForm = function (formData) {
            var itemKey, itemVal, isValidForm = true,
            formDataArray = formData.split('&');
            formDataArray.forEach(function (item) {
                itemKey = item.split("=")[0].split("_")[0];
                itemVal = item.split("=")[1];                
                if (validFormValues.indexOf(itemKey) < 0  || 
                    (itemKey == 'faxnum' && itemVal != '')) {
					isValidForm = false;
                }
        	});
			return isValidForm;
        },            
        options = {
            type: 'POST',
            url: urls.formSubmit,
            data: $(selector.formContainer).serialize() +  "&elqFormURL=" + selectors.elqFormURL + "&raiformtype=gatedform",
            beforeSend: handleBeforeSend,
            success: handleSuccess,
            error: handleAJAXError,
            complete: handleComplete
        };

        try {
            if (validateForm($(selector.formContainer).serialize())) {
            	$.ajax(options);
            }
        } catch(err) {
            // handle failure case
        }
    },    

    showGatedContent = function (path) {

        // Assuming only gated resource is pdf. If it is other type like
        // video, audio then it needs to be dealt separately
        //window.open(path, '_blank');
        // Feature detection
        if (navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1) {
            window.location.href = path;
        } else {
            window.open(path, '_blank');
        }

    },

    /**
     * adobeLeadFormSubmitGated This method will be called when RAI form submit button click
     * @param  {Object}    options {linkName:<value>, slotFriendlyName:<value>, linkDestinationUrl:<value>,
     *                             formName:<value>, formEmail:<value>, formCompany:<value>, 
     *                             formServicePortfolip:<value>,
     *                             formServiceFamily:<value>, formService:<value>, 
     *                             formSolutionOfInterest:<value>,
     *                             formRequestType:<value>, formType:<value>}     
     * @required           detm-container-hdr.js
     * @required           detm-container-ftr.js
     * @requires           RAI form submit button (inside iframe)
     * @return {undefined} returns nothing
     * @example
     * Please documentation of adobeLeadFormSubmitGated to 
     * understand how to call this function
     */
    // adobeGatedFormSubmit = function (container) {
        
    //     att.entbus.track.ddo.pushEvent('formSubmit', 'MCOM_Gated_Download', 
    //         {
    //             'linkName'              : 'Contact Me',
    //             'slotFriendlyName'      : 'RAI-Form',
    //             'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
    //             'formName'              : 'Gated Form',
    //             'formEmail'             : container.find(selectors.email).val(),
    //             'formCompany'           : container.find(selectors.company).val(),
    //             'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
    //             'formServiceFamily'     : container.find(selectors.familyId).val(),
    //             'formService'           : container.find(selectors.serviceId).val(),
    //             'formRequestType'       : 'reqaddlinfo',
    //             'formType'              : container.find(selectors.formType).val(),
    //             'formActivityCode'      : container.find(selectors.lnsCode).val()           
    //         }
    //     );
    // },

    /**
     * adobeGatedFormSuccess Method will be called after successful post of RAI form submit
     * @param  {Object} options  {formsubmit:<value>, linkname:<value>, slotname:<value>, 
     *                            linkdesturl:<value>, url:<value>, 
     *                            formName:<value>, formEmail:<value>, formCompany:<value>, 
     *                            formServicePortfolip:<value>,
     *                            formServiceFamily:<value>, formService:<value>, 
     *                            formSolutionOfInterest:<value>,
     *                            formRequestType:<value>, formType:<value>}
     * @return {undefined}        returns nothing
     * @example
     * Please documentation of adobeTrkLeadFormFailureGated to 
     * understand how to call this function
     */
    adobeGatedFormSuccess = function (container) {
        att.adobeDataLayer.pushEvent(
            att.adobeDataLayerManager.trackingEventCodeData.mcomGatedDownload()
        ); 
        // att.entbus.track.ddo.pushEvent('formResponse', 'MCOM_Gated_Download', 
        //     {
        //         'successFlag'           : '1',
        //         'linkName'              : 'Contact Me',
        //         'slotFriendlyName'      : 'RAI-Form',
        //         'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
        //         'formName'              : 'Gated Form',
        //         'formEmail'             : container.find(selectors.email).val(),
        //         'formCompany'           : container.find(selectors.company).val(),
        //         'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
        //         'formServiceFamily'     : container.find(selectors.familyId).val(),
        //         'formService'           : container.find(selectors.serviceId).val(),
        //         'formSolutionOfInterest': container.find(selectors.formSolInterest).val(),                
        //         'formRequestType'       : 'reqaddlinfo',
        //         'formType'              : container.find(selectors.formType).val(),
        //         'formActivityCode'      : container.find(selectors.lnsCode).val()           
        //     }
        // );
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingUserCustomTypeData.userProvidedTheirContactEmail());
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.completeAction(
            {
                name:'Gated Form',
                details: {                            
                    email                  : container.find(selectors.email).val(),
                    formCompany            : container.find(selectors.company).val() || '',
                    formServicePortfolio   : container.find(selectors.portfolioId).val() || '',
                    formServiceFamily      : container.find(selectors.familyId).val() || '',
                    formService            : container.find(selectors.serviceId).val() || '',
                    formSolutionOfInterest : container.find(selectors.formSolInterest).val() || '',
                    formRequestType        : 'reqaddlinfo',
                    formType               : container.find(selectors.formType).val(),
                    formActivityCode       : container.find(selectors.lnsCode).val() || '',
                    formBusinessType       : '',
                    formLocationCount      : '',
                }
            } 
        ));
    },

    /**
     * adobeTrkLeadFormErrorGated This method will be called when RAI form submit button click
     * @param  {Object}    options {formsubmit:<value>, linkname:<value>, slotname:<value>,
     *                             statusArr:<value>, linkdesturl:<value>,
     *                             formName:<value>, formEmail:<value>, formCompany:<value>, 
     *                             formServicePortfolip:<value>,
     *                             formServiceFamily:<value>, formService:<value>, 
     *                             formSolutionOfInterest:<value>,
     *                             formRequestType:<value>, formType:<value>}     
     * @required           detm-container-hdr.js
     * @required           detm-container-ftr.js
     * @requires           RAI form submit button (inside iframe)
     * @return {undefined} returns nothing
     * @example
     * call the function like below
     * adobeTrkLeadFormErrorGated({
     *     formsubmit            : <value>, 
     *     linkname              : <value>, 
     *     slotname              : <value>,
     *     statusArr             : <value>, 
     *     linkdesturl           : <value>,
     *     formName              : <value>, 
     *     formEmail             : <value>, 
     *     formCompany           : <value>, 
     *     formServicePortfolip  : <value>,
     *     formServiceFamily     : <value>, 
     *     formService           : <value>, 
     *     formSolutionOfInterest: <value>,
     *     formRequestType       : <value>, 
     *     formType          : <value>
     * });
     */
    adobeTrkLeadFormErrorGated = function (container, statusArr) {
        

        // var adobeTrackStatus = new Array(),
        //     firstTime1 = true,
        //     firstTime2 = true,
        //     idxDb = 0,
        //     idxReq = 0,
        //     idxFln = 0,
        //     idxInv = 0,

        //     errorMsgMap = {
        //         '0'		: 'First name',
        //         '1'		: 'Last name',
        //         '2'		: 'Email address',   
        //         '3'		: 'Phone number',            
        //         '4'		: 'Company name'
        //     };

		// $.each(statusArr, function(key, value) {
        //     if (value != "") {
        //         idxFln = value.indexOf("Len");
        //         idxInv = value.indexOf("Invalid");
        //         idxReq = value.indexOf("errorMsg");
        //         idxDb  = value.indexOf("Database");
        //         if (idxFln != -1) {
        //             if (firstTime2) adobeTrackStatus[2] = "Field length too long";
        //             adobeTrackStatus[2] += " | " + errorMsgMap[key];
        //             firstTime2 = false;
        //         } else if (idxInv != -1) {
        //             adobeTrackStatus[3] = "Invalid data entered";
        //         } else if (idxReq != -1) {
        //             if (firstTime1) adobeTrackStatus[1] = "Required fields missing";
        //             adobeTrackStatus[1] += " | " + errorMsgMap[key];
        //             firstTime1 = false;
        //         } else if (idxDb != -1) {
        //             adobeTrackStatus[0] = "Database unavailable";
        //         }
        //     }
		// });

        // adobeTrackStatus.forEach(function (item) {
        //     adobeTrkLeadFormFailureGated(container, item);
        // });

    },
    adobeTrkLeadFormFailureGated = function(container, adobestatus) {
        if (adobestatus !== null && adobestatus !== '') {
        //     ddo.pushEvent('formResponse', 'MCOM_Gated_Download', 
        //       {
        //           'successFlag'           : '0',
        //           'errorType'             : 'Failure_User',
        //           'statusMessage'         :  adobestatus,
        //           'linkName'              : 'Contact Me',
        //           'slotFriendlyName'      : 'RAI-Form',
        //           'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
        //           'formName'              : 'Gated Form',
        //           'formEmail'             : container.find(selectors.email).val(),
        //           'formCompany'           : container.find(selectors.company).val(),
        //           'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
        //           'formServiceFamily'     : container.find(selectors.familyId).val(),
        //           'formService'           : container.find(selectors.serviceId).val(),
        //           'formSolutionOfInterest': container.find(selectors.formSolInterest).val(),
        //           'formRequestType'       : 'reqaddlinfo',
        //           'formType'			  : container.find(selectors.formType).val(),
		// 		  'formActivityCode'	  : container.find(selectors.lnsCodeURL).val() || 			
        //         						    container.find(selectors.lnsCodeStatic).val()
        //       }
        //    );
           //att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.errorAction(adobestatus));        
        }
    },
    bindEvents = function () {
        $(selectors.gatedResource).bind('click', function (e) {
            handleGatedResources(e);
        });
        $(document).on('click', selectors.gatingClose, function () {
            $(selectors.gatingContainer).hide();
            $(selectors.gatingOverlay).hide();
        });
        $(selectors.submitButton).bind('click', handleSubmitGatedLF);      
        // TODO: move selectors to top
        $('#gating-container .form-textbox, #gating-container .form-dropdown').on('input', function(e){
            enableSubmit();
        });
        $(selectors.email).bind('focusout', function () {
            $(selectors.email).val($(selectors.email).val().trim());
        });        
        att.adobeDataLayer.handleFirtFormElementOnFocus (
            $(selectors.formContainer),
            {
                name: 'MCOM_Gated_Download',
                type: 'Gated Form',               
            }
        );
    },
        
    init = function () {
        // Server returns as string
        try {
            gatedResources = JSON.parse(att.gatedResources);
        } catch (e) {
            // parse error
        }
        // TODO: logic to scenario 2 (gated resource clicked from email/google results)
        if(window.location.href.indexOf('guid=') > -1) {
            handleExternalGatedResourceRequest();
        }
    };

    // Wait unit DOM ready
    $(function () {
        init();
        bindEvents();
    });

})(jQuery.noConflict(), window, document);

/** 
 * jQuery plugin to determin an element is withing viewport or not
 * @returns boolean <true|false>
 * @example
 * $('.selector').isInViewport()
 * TODO: move this to utilities javascript file.
 */
jQuery.fn.isInViewport = function () {
    var elementTop     = jQuery(this).offset().top;
    var elementBottom  = elementTop + jQuery(this).outerHeight();
    
    var viewportTop    = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + jQuery(window).height();
    
    return elementBottom > viewportTop && elementTop < viewportBottom;
}
/**
 * Contact Page implementation
 * @requires jQuery javascript library
 * @requires adobe att tracking library
 */

;(function ($, window, document, undefined) {

    var wasSubmitted = false,
    selectors = {
        contContainer  : '.contactContainer',        
        contactClose   : '.contact-close',        
        submitButton   : '#contact-form-submit',
        contactOverlay : '#contact-overlay',
        portfolioId    : '#servPortfolioId',
        familyId       : '#servFamilyId',
        serviceId      : '#serviceId',
        lnsCodeStatic  : '#LNSStaticCMS',
        lnsCodeURL     : '#LNSCodeURL',
        formLocation   : '#formLocation',
        email          : '#email',
        phoneNumber    : '#phoneNumber',
        busType        : '#busTypeSel',
        numLoc         : '#numLoc',        
        formContainer  : '#contact_form'
    },
    validFormValues = ['module', 'servicePortfolio', 'elqFormName', 'elqSiteID', 'formLocation', 'formType', 'assetType', 'resourceId',
                      'callCenter', 'solutionOfInterest', 'eloquaCampaignID', 'campaignID', 'redirectURL1', 'elqFormURL', 'elqCookieWrite',
                       'recvEmail', 'nxReg', 'incomingTactic1', 'activityCodeMostRecent1', 'sourceCode', 'source', 'sourceDate', 'eloquaSub', 'requestType1', 
                      'jobRole1', 'jobTitle', 'exBusSeg', 'firstName', 'lastName', 'email', 'emailAddress', 'phone', 'phoneNumber', 'zip', 'country', 'company', 'comments',
                      'dtvForm', '00NA0000002WxlB', 'zipCode', 'Number_of_Locations__c', '00NA0000002WxfH', '00NA0000002Wxks', 'contactForm'],

	enableSubmit = function() {
        var formfilled = true;
        $("#contact-container .form-textbox, #contact-container .form-dropdown").not(':hidden').each(function (e) {
            if ( $(this).val() === "") {
                formfilled = false;
            }
        });
        var submitbtn = $("#contact-container #contactbtn");
        if (formfilled) {
            submitbtn.removeAttr("disabled");
            submitbtn.removeClass("gray").addClass("orange");
        } else {
            submitbtn.attr("disabled", "true");
            submitbtn.removeClass("orange").addClass("gray");
        }
    },

    switchDtvForm = function(portf) {
        if (portf.indexOf("DIRECTV") != -1) {
            $("#contact_form").find(".form-dtv").show();
            $("#contact_form").find(".form-rai").hide();
            $("#contact_form").find("#dtvForm").val("true");
            $("#contact_form").find("#formType").val("DirecTV");
            $("#contact_form").find("#formTypeOld").val("DirecTV");
            $("#contact_form").find("#elqFormName").val("requestForQuote");
            $("#contact_form").find("#eloquaFormURL").val("");
            $("#contact_form").find("#eloquaFormURLOld").val("");
            $("#contact_form").find("#dtvFormURL").val("http://s2015916686.t.eloqua.com/e/f2");
            $("#contact_form").find("#linkDestURL").val("http://s2015916686.t.eloqua.com/e/f2");
            $("#contact_form").find("#company").val("None");
            $("#contact_form").find("#phoneNumber").attr("name", "phone");
            $("#contact_form").find("#email").attr("name", "emailAddress");
            $("#contact_form").find("#decisionTimeframeSelect option:selected").val("None");
            $("#contact_form").find("#specialOffers").val("N");
            $("#contact-container .css-button input").val('Get a quote');
        } else {
            $("#contact_form").find(".form-rai").show();
            $("#contact_form").find(".form-dtv").hide();
            $("#contact_form").find("#dtvForm").val("false");
            $("#contact_form").find("#formType").val("Contact Us");
            $("#contact_form").find("#formTypeOld").val("RAI");
            $("#contact_form").find("#elqFormName").val("universal_form");
            $("#contact_form").find("#eloquaFormURL").val("http://s1981585949.t.eloqua.com/e/f2");
            $("#contact_form").find("#dtvFormURL").val("");
            $("#contact_form").find("#linkDestURL").val("http://s1981585949.t.eloqua.com/e/f2");
            if ($("#contact_form").find("#company").val() == "None") {
                $("#contact_form").find("#company").val("");
            }
            $("#contact_form").find("#phoneNumber").attr("name", "phoneNumber");
            $("#contact_form").find("#email").attr("name", "email");
            $("#contact_form").find("#decisionTimeframeSelect option:first-child").val("");
            $("#contact_form").find("#specialOffers").val("");            
            $("#contact-container .css-button input").val('Contact Me');
        }
        $("#contact_form").find("#formSubmitted").val("");
        $(selectors.contContainer).css({'overflow-y':'scroll', 'height':'100%'});    
    },

    setCookieInfo = function(emailid) {
        $.cookie("EntBizUserInfo", emailid, {path: '/'} );
    },

    checkBeforeSubmit = function() {
        wasSubmitted = ($("#formSubmitted").val() == "true");
        if ($("#gatedForm").length == 0) {
            $('body').append('<iframe src="" name="gatedForm" id="gatedForm" frameborder="0" scrolling="no" style="display: none;"></iframe>');
        }
        $("#firstName").val($.trim($("#firstName").val()));
        $("#lastName").val($.trim($("#lastName").val()));
        $("#email").val($.trim($("#email").val()));
        $("#phoneNumber").val($.trim($("#phoneNumber").val()));
        $("#company").val($.trim($("#company").val()));
        $("#zipCode").val($.trim($("#zipCode").val()));

        if ($("#formType").val() == "DirecTV") {
            var specOffers = (document.getElementById("specialOffers").checked)? "1" : "0";
            captureDtvForm(	$("#firstName").val(), 
                            $("#lastName").val(),
                            $("#email").val(),	
                            $("#phoneNumber").val(), 
                            $("#zipCode").val(), 
                            $("#numLoc").val(),
                            specOffers, 
                            $("#busTypeSel").val(), 
                            $("#bestTimeSel").val()
                        );
        }
        var dectf = $("#decisionTimeframeSelect").val();
        var formval =	$("#firstName").val() + $("#lastName").val() +
                        $("#email").val() + $("#phoneNumber").val() +
                        $("#company").val() + $("#zipCode").val() + $("#numLoc").val() +
                        $("#decisionTimeframeSelect").val() + $("#busTypeSel").val() +
                        $("#bestTimeSel").val() + specOffers +
                        $("#commentsfield").val() + $("#portfolioId").val() +
                        $("#familyId").val() + $("#serviceId").val();
        var raiElements = document.getElementById("contact_form").elements;
        for (var i=0, element; element = raiElements[i++];) {
            if (element.type === "hidden") {
                if (element.value.length > 200) return false;
            }
        }
        if (($("#firstName").val().length > 40) ||
            ($("#lastName").val().length > 40) ||
            ($("#email").val().length > 255) ||
            ($("#phoneNumber").val().length > 100) ||
            ($("#company").val().length > 200)
            ) {
            return false;
        }
        if (formval == $.cookie("formvalues")) {
            $("#errors-dupsub").show();
            return false;
        } else {
            $.cookie("formvaluestmp", formval);
        }
        if(!wasSubmitted) {
            $("#formSubmitted").val("true");
            return true;
        }						
        return false;
    },


    /**
     * adobeLeadFormSubmitContact This method will be called when RAI form submit button click
     * @param  {Object}    options {linkName:<value>, slotFriendlyName:<value>, linkDestinationUrl:<value>,
     *                             formName:<value>, formEmail:<value>, formCompany:<value>, 
     *                             formServicePortfolip:<value>,
     *                             formServiceFamily:<value>, formService:<value>, 
     *                             formSolutionOfInterest:<value>,
     *                             formRequestType:<value>, formType:<value>}     
     * @required           detm-container-hdr.js
     * @required           detm-container-ftr.js
     * @requires           RAI form submit button (inside iframe)
     * @return {undefined} returns nothing
     * @example
     * Please documentation of adobeLeadFormSubmitContact to 
     * understand how to call this function
     */
    // adobeLeadFormSubmitContact = function (container) {
       
        // att.entbus.track.ddo.pushEvent('formSubmit', 'MCOM_Contact_Me_Submit', 
        //     {
        //         'linkName'              : 'Contact Me',
        //         'slotFriendlyName'      : 'RAI-Form',
        //         'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
        //         'formName'              : 'Contact Form',
        //         'formEmail'             : container.find(selectors.email).val(),
        //         'formCompany'           : container.find(selectors.company).val(),
        //         'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
        //         'formServiceFamily'     : container.find(selectors.familyId).val(),
        //         'formService'           : container.find(selectors.serviceId).val(),
        //         'formRequestType'       : 'reqaddlinfo',
        //         'formType'              : container.find(selectors.formType).val(),
        //         'formActivityCode'      : container.find(selectors.lnsCode).val()           
        //     }
        // );        
    //},

    /**
     * adobeContactFormSuccess Method will be called after successful post of RAI form submit
     * @param  {Object} options  {formsubmit:<value>, linkname:<value>, slotname:<value>, 
     *                            linkdesturl:<value>, url:<value>, 
     *                            formName:<value>, formEmail:<value>, formCompany:<value>, 
     *                            formServicePortfolip:<value>,
     *                            formServiceFamily:<value>, formService:<value>, 
     *                            formSolutionOfInterest:<value>,
     *                            formRequestType:<value>, formType:<value>}
     * @return {undefined}        returns nothing
     * @example
     * Please documentation of adobeContactFormSuccess to 
     * understand how to call this function
     */
    adobeContactFormSuccess = function (container) {
        att.adobeDataLayer.pushEvent(
            att.adobeDataLayerManager.trackingEventCodeData.mcomContactMeSubmit()
        );
        // att.entbus.track.ddo.pushEvent('formResponse', 'MCOM_Contact_Me_Submit', 
        //     {
        //         'successFlag'           : '1',
        //         'linkName'              : 'Contact Me',
        //         'slotFriendlyName'      : 'RAI-Form',
        //         'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
        //         'formName'              : 'Contact Form',
        //         'formEmail'             : container.find(selectors.email).val(),
        //         'formCompany'           : container.find(selectors.company).val(),
        //         'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
        //         'formServiceFamily'     : container.find(selectors.familyId).val(),
        //         'formService'           : container.find(selectors.serviceId).val(),
        //         'formSolutionOfInterest': container.find(selectors.formSolInterest).val(),                
        //         'formRequestType'       : 'reqaddlinfo',
        //         'formType'              : container.find(selectors.formType).val(),
        //         'formActivityCode'      : container.find(selectors.lnsCode).val()           
        //     }
        // );
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingUserCustomTypeData.userProvidedTheirContactEmail());
        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.completeAction(
            {
                name:'RAI Form',
                details: {                                            
                    email                   : container.find(selectors.email).val(),
                    formCompany             : container.find(selectors.company).val() || '',
                    formServicePortfolio    : container.find(selectors.portfolioId).val() || '',
                    formServiceFamily       : container.find(selectors.familyId).val() || '',
                    formService             : container.find(selectors.serviceId).val() || '',
                    formSolutionOfInterest  : container.find(selectors.formSolInterest).val() || '',
                    formRequestType         : 'reqaddlinfo',
                    formType                : container.find(selectors.formType).val(),
                    formActivityCode        : container.find(selectors.lnsCode).val() || '',
                    formBusinessType        :'',
                    formLocationCount       :'',
                }
            } 

        ));
    },
    handleSubmitContact = function () {

        var selector = {
            submit       : '#contact-form-submit',
            formContainer: '#contact_form',
        },
        classes = {
            disabled      : 'disabled',
            enabledButton : 'enabled-button',
            disabledButton: 'disabled-button'
        },
        urls = {
            formSubmit: '/leadform'
        },

        // TODO: Expecting JSON from backend. Rewrite logic once backend return value converted as JSON
        handleErrorMessages = function (field, message) {
            if(message === ' ') return;  // do nothing if no error message returned
            var $errMsg = $('#'+field+'.rai-errors');
            var $container = $errMsg.parent('.form-fld');
            $container.find('label, input, select').css('background-color', '#FFE7E4');
            $container.find('input, select').css('border', '1px solid red');
            $container.find('ul li').text(message);             
            $(selector.formContainer).find('.form-fld .rai-errors ul li').show();            
        },

        resetError = function () {
            $(selector.formContainer).find('.form-fld label, .form-fld input, .form-fld select').css('color', '#fff');
            $(selector.formContainer).find('.form-fld input, .form-fld select').css('border', '1px solid #fff').css('background-color', '#fff');
            $(selector.formContainer).find('.form-fld .rai-errors ul li').text("").hide();          
        },

        handleSuccess = function (data) {

            var outdata;
            try {
                outdata = JSON.parse(data);
            } catch(err) {
                // may log err in console.                
            }

            var status = outdata.success;

            if (status == 'true') {
                adobeContactFormSuccess($(selector.contContainer));
                showConfirmation();
				if( typeof _satellite !== 'undefined' ) {
					_satellite.track('RAIFormCompletion');
				}
            } else {
                resetError();
                delete outdata['success'];  
                var allmsgErrors = [];               
                for (var i = 0; i < outdata.errorMsg.length; i++) {
                	var errMsgId = outdata.errorMsg[i];
                    if (errMsgId !="" && typeof errMsgId != "undefined") { 
                        var errMsgVal = $('#' + errMsgId).val();
                        allmsgErrors.push(errMsgVal);
                        if (errMsgId == "errorMsgEmailInvalid") errMsgVal = "'" +  $(selector.formContainer).find('#email').val() + "' " + errMsgVal;
                        if (errMsgId != "") handleErrorMessages($('#' + errMsgId).attr("name"), errMsgVal); 
                    }
                }
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.errorAction({msg:allmsgErrors.join('|'),name:'RAI Form'}));               
            }            
        },

        handleAJAXError = function(xhr, ajaxOptions, thrownError) {
            // may log xhr.status, thrownError in console
        },

        handleBeforeSend = function () {
            att.adobeDataLayer.pushEvent(
                att.adobeDataLayerManager.trackingEventCodeData.mcomContactMeSubmit()
              );
            $(selector.submit)
                .prop('disabled', true)
                .removeClass(classes.enabledButton)
                .addClass(classes.disabledButton)
                .addClass(classes.disabled);
        },

        handleComplete = function (xhr) { 
            $(selector.submit)
                .prop('disabled', false)
                .removeClass(classes.disabledButton)
                .removeClass(classes.disabled)
                .addClass(classes.enabledButton);
            // Add scroll bar based on submit button visibility
            if( !$(selector.submit).isInViewport() ) {
                $(selectors.contContainer).css({'overflow-y':'scroll', 'height':'100%'});
            }
        },

        showConfirmation = function() {
            $('#contact-container form.contact_form, #contact-container h3, #contact-container #required-header').hide();
            $('#contact-container .form-footer').hide();
            $(selector.formContainer).get(0).reset();
            $('#contact-container .section-response, #contact-container #thankYouMsg').show();
            $(selectors.contContainer).css({'top':'30px', 'height':'280px', 'min-height':'280px', 'overflow-y':'unset'});
        },

        validateForm = function (formData) {
            var retVal = true;
            var formDataArray = formData.split('&');
            formDataArray.forEach(function (item) {
                if (validFormValues.indexOf(item.split("=")[0]) < 0) {
					retVal = false;
                }
        	});
			return retVal;
        },
        options = {
            type: 'POST',
            url: urls.formSubmit,
            data: $(selector.formContainer).serialize() + '&raiformtype=gatedform',
            beforeSend: handleBeforeSend,
            success: handleSuccess,
            error: handleAJAXError,
            complete: handleComplete
        };

        try {
            if (validateForm($(selector.formContainer).serialize())) {
            	$.ajax(options);
            }
        } catch(err) {
            // may log err in console.                
            console.log("Error caught in Gated Form POST : " + err);
        }
    },    

	checkLeadFormInput = function() {
        $('#contact-container .form-textbox, #contact-container .form-dropdown').on('input', function(e){
            enableSubmit();
        });
        if ($("#contact-container #formType").val() == "DirecTV") {
            $("#contact-container #phoneNumber").on('keyup blur', function (e) {
                var phoneinput = $("#contact-container #phoneNumber").val();
                var phval = phoneinput.replace(/\D/g, '');
                var modified = false;
                var keycode = e.keyCode;
                phval = (phval.length > 10)? phval.substring(0, 10) : phval;
                    if (phoneinput.length >= 10) {
                        if (phval != "" && phval.length >= 3) {
                            phval = "(" + phval.substring(0,3) + ") " + phval.substring(3,6) + "-" + phval.substring(6,10);
                        } else {
                            phval = phoneinput.substring(0,10);
                        }
                        modified = true;
                    }
                if (modified == true && keycode != 8 && keycode != 37 && keycode != 39 && keycode != 46) {
                    $("#contact-container #phoneNumber").val(phval);
                }
            });
        }
	},

    enableContactForm = function(event) {
        var raiurl = $(this).attr("data-raiurl");
        var dataProduct = $(this).attr("data-product");        
        $("#thankYouMsg").hide();
        $(".contact-wrapper").show();
        var fieldset = $("#contact_form fieldset #gated-wrapper").html();
        $("#contact_form .errorsname").remove();
        $("#gated-wrapper").find(".form-row input, .form-row select").removeClass("errorclass");
        var portf = "";
        var family = "";
        var service = "";
        var pageid = "";
        var repoid = raiurl.split("/")[2];
        portf = raiurl.split("/")[3];
        switchDtvForm(dataProduct);
        if (repoid == "Portfolio") {		
            pageid = "service_portfolio";
        }
        if (repoid == "Family") { 
            family = raiurl.split("/")[4]; 
            pageid = "service_fam_overview";
        }
        if (repoid == "Service") { 
            family = raiurl.split("/")[4]; 
            service = raiurl.split("/")[5];
            pageid = "service_overview";
        }
        $('#contact-container #ThankYouMessage span').html($(this).attr("data-product"));
        $('#contact-container #successURLId').val("/solutions/profile/leadformsuppconf/?RAIUrl=" + raiurl);
        $('#contact-container #redirectURL').val($('#server_host').val() + "/solutions/profile/leadformsupport/?RAIUrl=" + raiurl);
        $('#contact-container #portfolioId').val(portf);
        $('#contact-container #familyId').val(family);
        $('#contact-container #serviceId').val(service);
        $('#contact-container #contentLinkId').val($('#server_host').val() + raiurl + ",parentpage=/solutions/support/contact/");
        $('#contact-container #formLocation').val($('#server_host').val() + raiurl);
        $('#contact-container #selSrvID').val(family+'*'+service);
        $("#contact-container #specialOffers").val("");
        var servSel = $('span#serviceSelected').html().replace(" - ","").trim();
        if (servSel == "") servSel = $('span#productSelected').html();
        $('.contact-wrapper h3').html('Have us contact you about "' + servSel + '"');
        $('.contact-wrapper .thanks-content span').html(servSel);

        var gatedform_title = $(this).attr("title");
        var gatedform_mediatitle = $(this).attr("data-mediatitle");
        $("#contact-container #LNS").val($(this).attr("data-lnscode"));
        $("#contact-container #callCenter").val($(this).attr("data-callcenter"));
        $("#contact-container #solutionOfInterest").val($(this).attr("data-solint"));
        $("#contact-container #eloquaCampaignID").val($(this).attr("data-elqcampid"));
        $("#contact-container #campaignID").val($(this).attr("data-campid"));
        contactForm('#contact-container', raiurl,event);
        return true;
    },

    contactForm = function(contactContainer, options,event) {
        var raiurl = options;
        var posTop = $(window).scrollTop() + 50;
        $(contactContainer).addClass('contactContainer').fadeIn();
        $(contactContainer).css({'top': posTop + 'px'});
        $(contactContainer).attr("data-href", options);
        if ((window.innerWidth || document.documentElement.clientWidth) <= 480) {
            var posTop = $(window).scrollTop();
            posTop = 0;
            $(contactContainer).css({'top': posTop + 'px'});		
        } else{
            var posTop = $(window).scrollTop() + 30;
            posTop = 20;
            $(contactContainer).css({'top': posTop + 'px'});
        }
	    $('#contact-overlay').fadeIn();
        checkLeadFormInput();
        enableSubmit();
        // Adobe tracking
        if(typeof att.adobeDataLayerManager !== 'undefined') {
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataOnClick(event, {
                'slotFriendlyName':'Have us contact you',
                'contentFriendlyName': $jqtr('#select-product option:selected').text() + '|' +  $jqtr('#select-services option:selected').text(),
                'linkName':'Have us contact you','linkDestinationUrl':'https://www.business.att.com'+raiurl, 
                'type': 'others'
            }));
        }
    },

    bindEventsContact = function () {
        $(selectors.submitButton).bind('click', handleSubmitContact);      
        $("a[class~='contactForm']").bind('click', enableContactForm);
        $(document).on('click', selectors.contactClose, function () {
            initContactForm();
            $(selectors.contContainer).hide();
            $(selectors.contactOverlay).hide();
        });
		$('span#commentsimage').bind('click', openbox);
		$('span#close-x').bind('click', closebox);
        
        att.adobeDataLayer.handleFirtFormElementOnFocus (
            $(selectors.contContainer),
            {
                name: 'MCOM_Contact_Me_Submit',
                type: 'RAI',               
            }
        );       
    },

    openbox = function() {
        $("#addcomments").hide();
        $("#comments-div").show();
        $("#comments-div").css("margin-top", "0px");
        if( !$(selectors.submitButton).isInViewport() ) {
            $(selectors.contContainer).css({'overflow-y':'scroll', 'height':'100%'});
        }
    },

    closebox = function() {
        $("#addcomments").show();        
		$("#comments-div").hide();        
        $("#comments-div").css("margin-top", "30px");
        if( !$(selectors.submitButton).isInViewport() ) {
            $(selectors.contContainer).css({'overflow-y':'scroll', 'height':'100%'});
        }
    },

	initContactForm = function() {
	    $('#contact-container form.contact_form, #contact-container h3, #contact-container #required-header').show();
	    $('#contact-container .form-footer').show();
	    $(selectors.formContainer).get(0).reset();
	    $('#contact-container .section-response, #contact-container #thankYouMsg').hide();
	    $(selectors.contContainer).css({'top':'20px', 'min-height':'250px', 'overflow-y':'scroll'});
        resetError();
	},

	resetError = function () {
	    $(selectors.formContainer).find('.form-fld label, .form-fld input, .form-fld select').css('color', '#fff');
	    $(selectors.formContainer).find('.form-fld input, .form-fld select').css('border', '1px solid #fff').css('background-color', '#fff');
	    $(selectors.formContainer).find('.form-fld .rai-errors ul li').text("").hide();          
	},

    initContact = function () {
        /*
        $formfields = $('.rai-form .form-textbox, .rai-form .form-dropdown').not(':hidden');
        $submitButton = $(selectors.submitButton);
        initialiseEloqua();
        */
    };

    //$(function() {
        initContact();
        bindEventsContact();
    //});

})(jQuery.noConflict(), window, document, undefined);

/** 
 * jQuery plugin to determin an element is withing viewport or not
 * @returns boolean <true|false>
 * @example
 * $('.selector').isInViewport()
 * TODO: move this to utilities javascript file.
 */
jQuery.fn.isInViewport = function () {
    var elementTop     = (jQuery(this).length)?jQuery(this).offset().top:0;
    var elementBottom  = elementTop + jQuery(this).outerHeight();

    var viewportTop    = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + jQuery(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
}

///**
// * Base Form & related tracking code
// * @required jQuery javascript library
// * @required adobe att tracking library
// * 
// */
//;(function ($, window, document, undefined) {
//	//need to add a config for this (might need to be a different file) so inherited forms can change css classes if necessary
//    var isIframe,
//    $formfields,
//    $submitButton,
//    selectors = {
//        submitButton   : '#base-form-submit',
//        selProdInterest: '#selProdInterest',        
//        selProdIntFld  : '#selProdIntFld',
//        portfolioId    : '#servPortfolioId',
//        familyId       : '#servFamilyId',
//        serviceId      : '#serviceId',
//        lnsCode        : '#LNSStaticCMS',
//        formLocation   : '#formLocation',
//        email          : '#email',
//        company        : '#company',
//        formSolInterest: '#formSolutionsOfInterest'
//    },
//    validFormValues = ['datalogs', 'module', 'servPortfolioId', 'servFamilyId', 'serviceId', 'servPortId', 'servFamId', 'servId', 
//                       'emailidElq', 'elqFormName', 'elqFormNameOld', 'formLocation', 'formType', 'callCenter', 'solutionOfInterest', 
//                       'eloquaCampaignID', 'campaignID', 'redirectURL', 'elqFormURL', 'elqFormURLOld', 'LNSCodeURL', 'LNSStaticCMS', 
//                       'sourceCode', 'source', 'eloquaSub', 'decisionTimeframe', 'segIndus', 'selProdInterest', 'dtvForm', 'elqSiteID', 
//                       'firstName', 'lastName', 'email', 'phoneNumber', 'country', 'company', 'comments'],
//    setCookieVal = function (cookieName, cookieVal) {
//        $.cookie(cookieName, cookieVal, {path: '/'});
//    },
//
//    getCookieVal = function (cookieName) {
//        return $.cookie(cookieName);
//    },
//
//    /**
//     * adobeLeadFormSubmit This method will be called when RAI form submit button click
//     * @param  {Object}    options {linkName:<value>, slotFriendlyName:<value>, linkDestinationUrl:<value>,
//     *                             formName:<value>, formEmail:<value>, formCompany:<value>, 
//     *                             formServicePortfolip:<value>,
//     *                             formServiceFamily:<value>, formService:<value>, 
//     *                             formSolutionOfInterest:<value>,
//     *                             formRequestType:<value>, formType:<value>}     
//     * @required           detm-container-hdr.js
//     * @required           detm-container-ftr.js
//     * @requires           RAI form submit button (inside iframe)
//     * @return {undefined} returns nothing
//     * @example
//     * Please documentation of adobeTrkLeadFormFailure to 
//     * understand how to call this function
//     */
//
//	adobeLeadFormSubmit = function (container) {
//        if(typeof ddo === 'undefined') return;
//		ddo.pushEvent('formSubmit', 'MCOM_Contact_Me_Submit', 
//            {
//                'linkName'              : 'Contact Me',
//                'slotFriendlyName'      : 'RAI-Form',
//                'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
//                'formName'              : 'RAI Form',
//                'formEmail'             : container.find(selectors.email).val(),
//                'formCompany'           : container.find(selectors.company).val(),
//                'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
//                'formServiceFamily'     : container.find(selectors.familyId).val(),
//                'formService'           : container.find(selectors.serviceId).val(),
//                'formRequestType'       : 'reqaddlinfo',
//                'formType'				: 'RAI',
//				'formActivityCode'		: container.find(selectors.lnsCode).val()			
//    		}
//        );
//	},
//
//    /**
//     * adobeTrkLeadFormError This method will be called when RAI form submit button click
//     * @param  {Object}    options {formsubmit:<value>, linkname:<value>, slotname:<value>,
//     *                             statusArr:<value>, linkdesturl:<value>,
//     *                             formName:<value>, formEmail:<value>, formCompany:<value>, 
//     *                             formServicePortfolip:<value>,
//     *                             formServiceFamily:<value>, formService:<value>, 
//     *                             formSolutionOfInterest:<value>,
//     *                             formRequestType:<value>, formType:<value>}     
//     * @required           detm-container-hdr.js
//     * @required           detm-container-ftr.js
//     * @requires           RAI form submit button (inside iframe)
//     * @return {undefined} returns nothing
//     * @example
//     * call the function like below
//     * adobeTrkLeadFormError({
//     *     formsubmit            : <value>, 
//     *     linkname              : <value>, 
//     *     slotname              : <value>,
//     *     statusArr             : <value>, 
//     *     linkdesturl           : <value>,
//     *     formName              : <value>, 
//     *     formEmail             : <value>, 
//     *     formCompany           : <value>, 
//     *     formServicePortfolip  : <value>,
//     *     formServiceFamily     : <value>, 
//     *     formService           : <value>, 
//     *     formSolutionOfInterest: <value>,
//     *     formRequestType       : <value>, 
//     *     formType          : <value>
//     * });
//     */
//
//    adobeTrkLeadFormError = function (container, statusArr) {
//		if(typeof ddo === 'undefined') return;
//
//        var adobeTrackStatus = new Array(),
//            firstTime1 = true,
//            firstTime2 = true,
//            idxDb = 0,
//            idxReq = 0,
//            idxFln = 0,
//
//            errorMsgMap = {
//                'errorMsgFirstName'	: 'First Name',
//                'errorMsgLastName'	: 'Last Name',
//                'errorMsgEmail'		: 'Email Address',            
//                'errorMsgPhone'		: 'Phone Number',            
//                'errorMsgCompany'	: 'Company Name',
//                'errorMsgCountry'	: 'Country'            
//            };
//
//		$.each(statusArr, function(key, value) {
//            idxReq = value.indexOf("errorMsg");
//            if (idxReq == -1) idxReq = value.indexOf("Invalid");
//            idxFln = value.indexOf("less than");
//            idxDb = value.indexOf("Database");
//            if (idxDb != -1) {
//                adobeTrackStatus[0] = "Database unavailable";
//            } else if (idxReq != -1) {
//                if (firstTime1) adobeTrackStatus[1] = "Required fields missing";
//                adobeTrackStatus[1] += " | " + errorMsgMap[value];
//                firstTime1 = false;
//            } else if (idxFln != -1) {
//                if (firstTime2) adobeTrackStatus[2] = "Field length too long";
//                adobeTrackStatus[2] += " | " + value;
//                firstTime2 = false;
//            } else {
//                adobeTrackStatus[3] = "Invalid data entered";
//            }
//		});
//
//        adobeTrackStatus.forEach(function (item) {
//            adobeTrkLeadFormFailure(container, item);
//        });
//
//    },      
//
//    adobeTrkLeadFormFailure = function(container, adobestatus) {
//        if (adobestatus !== null && adobestatus !== '') {
//            ddo.pushEvent('formResponse', 'MCOM_Contact_Me_Submit', 
//              {
//                  'successFlag'           : '0',
//                  'errorType'             : 'Failure_User',
//                  'statusMessage'         :  adobestatus,
//                  'linkName'              : 'Contact Me',
//                  'slotFriendlyName'      : 'RAI-Form',
//                  'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
//                  'formName'              : 'RAI Form',
//                  'formEmail'             : container.find(selectors.email).val(),
//                  'formCompany'           : container.find(selectors.company).val(),
//                  'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
//                  'formServiceFamily'     : container.find(selectors.familyId).val(),
//                  'formService'           : container.find(selectors.serviceId).val(),
//                  'formSolutionOfInterest': container.find(selectors.formSolInterest).val(),
//                  'formRequestType'       : 'reqaddlinfo',
//                  'formType'			  : 'RAI',
//                  'formActivityCode'	  : container.find(selectors.lnsCode).val()			
//              }
//           );
//        }
//    },
//
//    /**
//     * adobeLeadFormSuccess Method will be called after successful post of RAI form submit
//     * @param  {Object} options  {formsubmit:<value>, linkname:<value>, slotname:<value>, 
//     *                            linkdesturl:<value>, url:<value>, 
//     *                            formName:<value>, formEmail:<value>, formCompany:<value>, 
//     *                            formServicePortfolip:<value>,
//     *                            formServiceFamily:<value>, formService:<value>, 
//     *                            formSolutionOfInterest:<value>,
//     *                            formRequestType:<value>, formType:<value>}
//     * @return {undefined}        returns nothing
//     * @example
//     * Please documentation of adobeTrkLeadFormFailure to 
//     * understand how to call this function
//     */
//
//	adobeLeadFormSuccess = function (container) {
//        if(typeof ddo === 'undefined') return;
//		ddo.pushEvent('formResponse', 'MCOM_Contact_Me_Submit', 
//            {
//                'successFlag'           : '1',
//                'linkName'              : 'Contact Me',
//                'slotFriendlyName'      : 'RAI-Form',
//                'linkDestinationUrl'    : container.find(selectors.formLocation).val(),
//                'formName'              : 'RAI Form',
//                'formEmail'             : container.find(selectors.email).val(),
//                'formCompany'           : container.find(selectors.company).val(),
//                'formServicePortfolio'  : container.find(selectors.portfolioId).val(),
//                'formServiceFamily'     : container.find(selectors.familyId).val(),
//                'formService'           : container.find(selectors.serviceId).val(),
//                'formSolutionOfInterest': container.find(selectors.formSolInterest).val(),                
//                'formRequestType'       : 'reqaddlinfo',
//                'formType'				: 'RAI',
//				'formActivityCode'		: container.find(selectors.lnsCode).val()			
//    		}
//        );
//	},
//
//    handleSubmitLF = function () {
//
//        var selector = {
//            submit       : '#base-form-submit',
//            formContainer: '#base-leadform',
//            raiformAnchor: '.base-form-anchor'
//        },
//        classes = {
//            disabled      : 'disabled',
//            enabledButton : 'enabled-button',
//            disabledButton: 'disabled-button'
//        },
//        urls = {
//            formSubmit: '/leadform'
//        },
//
//        // TODO: Expecting JSON from backend. Rewrite logic once backend return value converted as JSON
//        handleError = function ($field, message) {
//            if(message === ' ') return;  // do nothing if no error message returned
//            var $container = $field.parent('.form-div');
//            $container.find('label, input, select').css('color', 'red');
//            $container.find('input, select').css('border', '1px solid red');
//            $(selector.formContainer).find('.form-div .base-errors ul li').show();
//        },
//        resetError = function () {
//            $(selector.formContainer).find('.form-div label, .form-div input, .form-div select').css('color', '#191919');
//            $(selector.formContainer).find('.form-div input, .form-div select').css('border', '1px solid #a9a9a9');
//        	$(selector.formContainer).find('.form-div .base-errors ul li').text("").hide();          
//        },
//        handleSuccess = function (data) {
//            var outdata, errMsg, errMsgVal;
//            try {
//                outdata = $.parseJSON(data);
//            } catch(err) {
//                // may log err in console.
//            }
//
//            var status = outdata.success;
//            if (status == 'true') {
//                adobeLeadFormSuccess($(selector.formContainer));
//                $('form.base-leadform, h2.base-form-heading, .intro').hide();
//                $('#base-form-submit').hide();
//                $('.form-footer').hide();                
//                $(selector.formContainer).get(0).reset();
//                $('.base-form .section-response .thanks-message').show();
//				if( typeof _satellite !== 'undefined' ) {
//					_satellite.track('RAIFormCompletion');
//				}
//            } else {
//                resetError();
//                delete outdata['success'];
//                for (var i = 0; i < outdata.errorMsg.length; i++) {
//                    errMsgId = outdata.errorMsg[i];
//                	if (errMsgId !="" && typeof errMsgId != "undefined") { 
//                    errMsgVal = $('#' + errMsgId).val();
//                    if (errMsgId == "errorMsgInvalidEmail") errMsgVal = "'" + $('#email').val() + "' " + errMsgVal;
//                        $(selector.formContainer).find('#errmsg'+i+' ul li').text(errMsgVal); 
//                        if (errMsgId != "") handleError($('#errmsg'+i), errMsgVal); 
//                    }
//                }
//                adobeTrkLeadFormError($(selector.formContainer), outdata.errorMsg);
//            }
//        },
//        handleAJAXError = function(xhr, ajaxOptions, thrownError) {
//            // may log xhr.status, thrownError in console
//        },
//        handleBeforeSend = function () {
//            adobeLeadFormSubmit($(selector.formContainer)); 
//			$(selector.submit)
//                .prop('disabled', true)
//                .removeClass(classes.enabledButton)
//                .addClass(classes.disabledButton)
//                .addClass(classes.disabled);
//        },
//        handleComplete = function (xhr) { 
//            $(selector.submit)
//                .prop('disabled', false)
//                .removeClass(classes.disabledButton)
//                .removeClass(classes.disabled)
//                .addClass(classes.enabledButton);
//            $(selector.raiformAnchor).trigger('click');
//        },
//        validateForm = function (formData) {
//            var retVal = true;
//            var formDataArray = formData.split('&');
//            formDataArray.forEach(function (item) {
//                if (!validFormValues.includes(item.split("=")[0])) {
//					retVal = false;
//                }
//        	});
//			return retVal;
//        },
//        options = {
//            type: 'POST',
//            url: urls.formSubmit,
//            data: $(selector.formContainer).serialize(),
//            beforeSend: handleBeforeSend,
//            success: handleSuccess,
//            error: handleAJAXError,
//            complete: handleComplete
//        };
//        if (validateForm($(selector.formContainer).serialize())) {
//        	$.ajax(options);            
//		}
//    },
//
//	assignValService = function () {
//
//		var selProdInt = $(selectors.selProdIntFld).val();
//        var selProdValues = selProdInt.split("|");
//		if (selProdInt != "") {
//            $(selectors.portfolioId).val(selProdValues[0]);
//            $(selectors.familyId).val(selProdValues[1]);
//            $(selectors.serviceId).val(selProdValues[2]);
//            $(selectors.lnsCode).val(selProdValues[3]);
//            $(selectors.selProdInterest).val($(selectors.selProdIntFld).find("option:selected").text());
//		}
//	},
//
//    initialiseEloqua = function () {
//        var _elqQ = _elqQ || [];
//        _elqQ.push(['elqSetSiteId', '2789']);
//        _elqQ.push(['elqTrackPageView']);
//
//        (function () {
//            function async_load() {
//                var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
//                s.src = '//img.en25.com/i/elqCfg.min.js';
//                var x = document.getElementsByTagName('script')[0]; 
//                x.parentNode.insertBefore(s, x);
//            }
//            if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
//            else if (window.attachEvent) window.attachEvent('onload', async_load); 
//        })();
//    },
//
//    bindEvents = function () {
//        $(selectors.submitButton).bind('click', handleSubmitLF);      
//		$(selectors.selProdIntFld).bind('change', assignValService);  
//    },
//
//    init = function () {
//        isIframe = (window.top !== window.self);
//        $formfields = $('.base-form .form-textbox, .base-form .form-dropdown').not(':hidden');
//        $submitButton = $(selectors.submitButton);
//        initialiseEloqua();
//    };
//
//    $(function() {
//        init();
//        bindEvents();
//    });
//
//})(jQuery.noConflict(), window, document, undefined);
/**
 * tile-list component js feature
 * @requires jQuery library
 * @requires ytplayer.js
 * @requires video-overlay component
 * @author Kanakaraj Venkataswamy
 */
;(function ($, window, document, undefined) {

    var selector = {
        bgHero: '.bgHero',
        videoFrame: '.video-frame',
        iframeContainer: 'marquee-onpage-video-iframe',
        podCastLink: '.featured-articles .podcast-player-link',
        closeVideo: '#closeVideo'
    },

    invokeOverlayPodCast = function (ele) {
        var DOMdata = $(this).data(),
            options = {
                title: DOMdata.name,
                podCast: DOMdata.podcast
            };
        att.entbus.overlay.buildPodCast(options);
    },

    handleCloseButtonClick = function(){
        $(selector.bgHero).show();
        $(selector.videoFrame).hide();
        $(selector.closeVideo).hide();
        if (typeof YT !== 'undefined') YT.get(selector.iframeContainer).stopVideo();
    },

    bindEvents = function() {
        $(selector.podCastLink).bind('click', invokeOverlayPodCast);
        // To remove other handlers attached through other component code
        $(selector.closeVideo).off().on('click', handleCloseButtonClick);
    };

    $( document ).ready(function() {        
        if($('.titleLink').length > 0){
        	var relativeLink = $('.titleLink').attr('href').replace('content/attbusiness/en/','');
        	$('.titleLink').attr('href',relativeLink);
		}
        bindEvents();
    });

})(jQuery.noConflict(), window, document, undefined);
/**
 * tile-list component js feature
 * @requires jQuery library
 * @requires ytplayer.js
 * @requires video-overlay component
 * @author Kanakaraj Venkataswamy
 */
;(function ($, window, document, undefined) {

    var selector = {
        bgHero: '.bgHero',
        videoFrame: '.video-frame',
        iframeContainer: 'marquee-onpage-video-iframe',
        podCastLink: '.featured-articles .podcast-player-link',
        closeVideo: '#closeVideo'
    },

    invokeOverlayPodCast = function (ele) {
        var DOMdata = $(this).data(),
            options = {
                title: DOMdata.name,
                podCast: DOMdata.podcast
            };
        att.entbus.overlay.buildPodCast(options);
    },

    handleCloseButtonClick = function(){
        $(selector.bgHero).show();
        $(selector.videoFrame).hide();
        $(selector.closeVideo).hide();
        if (typeof YT !== 'undefined') YT.get(selector.iframeContainer).stopVideo();
    },

    bindEvents = function() {
        $(selector.podCastLink).bind('click', invokeOverlayPodCast);
        // To remove other handlers attached through other component code
        $(selector.closeVideo).off().on('click', handleCloseButtonClick);
    };

    $( document ).ready(function() {        
        if($('.titleLink').length > 0){
        	var relativeLink = $('.titleLink').attr('href').replace('content/attbusiness/en/','');
        	$('.titleLink').attr('href',relativeLink);
		}
        bindEvents();
    });

})(jQuery.noConflict(), window, document, undefined);
