/** Shopify CDN: Minification failed

Line 4286:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 4299:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 4300:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 4301:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 4305:14 Transforming default arguments to the configured target environment ("es5") is not supported yet
Line 4306:14 Transforming default arguments to the configured target environment ("es5") is not supported yet
Line 4307:12 Transforming default arguments to the configured target environment ("es5") is not supported yet
Line 4315:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 4316:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 4320:4 Transforming const to the configured target environment ("es5") is not supported yet
... and 27 more hidden warnings

**/
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var SECTION_ID_ATTR$1 = 'data-section-id';

function Section(container, properties) {
  this.container = validateContainerElement(container);
  this.id = container.getAttribute(SECTION_ID_ATTR$1);
  this.extensions = [];

  // eslint-disable-next-line es5/no-es6-static-methods
  Object.assign(this, validatePropertiesObject(properties));

  this.onLoad();
}

Section.prototype = {
  onLoad: Function.prototype,
  onUnload: Function.prototype,
  onSelect: Function.prototype,
  onDeselect: Function.prototype,
  onBlockSelect: Function.prototype,
  onBlockDeselect: Function.prototype,

  extend: function extend(extension) {
    this.extensions.push(extension); // Save original extension

    // eslint-disable-next-line es5/no-es6-static-methods
    var extensionClone = Object.assign({}, extension);
    delete extensionClone.init; // Remove init function before assigning extension properties

    // eslint-disable-next-line es5/no-es6-static-methods
    Object.assign(this, extensionClone);

    if (typeof extension.init === 'function') {
      extension.init.apply(this);
    }
  }
};

function validateContainerElement(container) {
  if (!(container instanceof Element)) {
    throw new TypeError(
      'Theme Sections: Attempted to load section. The section container provided is not a DOM element.'
    );
  }
  if (container.getAttribute(SECTION_ID_ATTR$1) === null) {
    throw new Error(
      'Theme Sections: The section container provided does not have an id assigned to the ' +
        SECTION_ID_ATTR$1 +
        ' attribute.'
    );
  }

  return container;
}

function validatePropertiesObject(value) {
  if (
    (typeof value !== 'undefined' && typeof value !== 'object') ||
    value === null
  ) {
    throw new TypeError(
      'Theme Sections: The properties object provided is not a valid'
    );
  }

  return value;
}

// Object.assign() polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target) {
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

/*
 * @shopify/theme-sections
 * -----------------------------------------------------------------------------
 *
 * A framework to provide structure to your Shopify sections and a load and unload
 * lifecycle. The lifecycle is automatically connected to theme editor events so
 * that your sections load and unload as the editor changes the content and
 * settings of your sections.
 */

var SECTION_TYPE_ATTR = 'data-section-type';
var SECTION_ID_ATTR = 'data-section-id';

window.Shopify = window.Shopify || {};
window.Shopify.theme = window.Shopify.theme || {};
window.Shopify.theme.sections = window.Shopify.theme.sections || {};

var registered = (window.Shopify.theme.sections.registered =
  window.Shopify.theme.sections.registered || {});
var instances = (window.Shopify.theme.sections.instances =
  window.Shopify.theme.sections.instances || []);

function register(type, properties) {
  if (typeof type !== 'string') {
    throw new TypeError(
      'Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered'
    );
  }

  if (typeof registered[type] !== 'undefined') {
    throw new Error(
      'Theme Sections: A section of type "' +
        type +
        '" has already been registered. You cannot register the same section type twice'
    );
  }

  function TypedSection(container) {
    Section.call(this, container, properties);
  }

  TypedSection.constructor = Section;
  TypedSection.prototype = Object.create(Section.prototype);
  TypedSection.prototype.type = type;

  return (registered[type] = TypedSection);
}

function load(types, containers) {
  types = normalizeType(types);

  if (typeof containers === 'undefined') {
    containers = document.querySelectorAll('[' + SECTION_TYPE_ATTR + ']');
  }

  containers = normalizeContainers(containers);

  types.forEach(function(type) {
    var TypedSection = registered[type];

    if (typeof TypedSection === 'undefined') {
      return;
    }

    containers = containers.filter(function(container) {
      // Filter from list of containers because container already has an instance loaded
      if (isInstance(container)) {
        return false;
      }

      // Filter from list of containers because container doesn't have data-section-type attribute
      if (container.getAttribute(SECTION_TYPE_ATTR) === null) {
        return false;
      }

      // Keep in list of containers because current type doesn't match
      if (container.getAttribute(SECTION_TYPE_ATTR) !== type) {
        return true;
      }

      instances.push(new TypedSection(container));

      // Filter from list of containers because container now has an instance loaded
      return false;
    });
  });
}

function unload(selector) {
  var instancesToUnload = getInstances(selector);

  instancesToUnload.forEach(function(instance) {
    var index = instances
      .map(function(e) {
        return e.id;
      })
      .indexOf(instance.id);
    instances.splice(index, 1);
    instance.onUnload();
  });
}

function getInstances(selector) {
  var filteredInstances = [];

  // Fetch first element if its an array
  if (NodeList.prototype.isPrototypeOf(selector) || Array.isArray(selector)) {
    var firstElement = selector[0];
  }

  // If selector element is DOM element
  if (selector instanceof Element || firstElement instanceof Element) {
    var containers = normalizeContainers(selector);

    containers.forEach(function(container) {
      filteredInstances = filteredInstances.concat(
        instances.filter(function(instance) {
          return instance.container === container;
        })
      );
    });

    // If select is type string
  } else if (typeof selector === 'string' || typeof firstElement === 'string') {
    var types = normalizeType(selector);

    types.forEach(function(type) {
      filteredInstances = filteredInstances.concat(
        instances.filter(function(instance) {
          return instance.type === type;
        })
      );
    });
  }

  return filteredInstances;
}

function getInstanceById(id) {
  var instance;

  for (var i = 0; i < instances.length; i++) {
    if (instances[i].id === id) {
      instance = instances[i];
      break;
    }
  }
  return instance;
}

function isInstance(selector) {
  return getInstances(selector).length > 0;
}

function normalizeType(types) {
  // If '*' then fetch all registered section types
  if (types === '*') {
    types = Object.keys(registered);

    // If a single section type string is passed, put it in an array
  } else if (typeof types === 'string') {
    types = [types];

    // If single section constructor is passed, transform to array with section
    // type string
  } else if (types.constructor === Section) {
    types = [types.prototype.type];

    // If array of typed section constructors is passed, transform the array to
    // type strings
  } else if (Array.isArray(types) && types[0].constructor === Section) {
    types = types.map(function(TypedSection) {
      return TypedSection.prototype.type;
    });
  }

  types = types.map(function(type) {
    return type.toLowerCase();
  });

  return types;
}

function normalizeContainers(containers) {
  // Nodelist with entries
  if (NodeList.prototype.isPrototypeOf(containers) && containers.length > 0) {
    containers = Array.prototype.slice.call(containers);

    // Empty Nodelist
  } else if (
    NodeList.prototype.isPrototypeOf(containers) &&
    containers.length === 0
  ) {
    containers = [];

    // Handle null (document.querySelector() returns null with no match)
  } else if (containers === null) {
    containers = [];

    // Single DOM element
  } else if (!Array.isArray(containers) && containers instanceof Element) {
    containers = [containers];
  }

  return containers;
}

if (window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', function(event) {
    var id = event.detail.sectionId;
    var container = event.target.querySelector(
      '[' + SECTION_ID_ATTR + '="' + id + '"]'
    );

    if (container !== null) {
      load(container.getAttribute(SECTION_TYPE_ATTR), container);
    }
  });

  document.addEventListener('shopify:section:unload', function(event) {
    var id = event.detail.sectionId;
    var container = event.target.querySelector(
      '[' + SECTION_ID_ATTR + '="' + id + '"]'
    );
    var instance = getInstances(container)[0];

    if (typeof instance === 'object') {
      unload(container);
    }
  });

  document.addEventListener('shopify:section:select', function(event) {
    var instance = getInstanceById(event.detail.sectionId);

    if (typeof instance === 'object') {
      instance.onSelect(event);
    }
  });

  document.addEventListener('shopify:section:deselect', function(event) {
    var instance = getInstanceById(event.detail.sectionId);

    if (typeof instance === 'object') {
      instance.onDeselect(event);
    }
  });

  document.addEventListener('shopify:block:select', function(event) {
    var instance = getInstanceById(event.detail.sectionId);

    if (typeof instance === 'object') {
      instance.onBlockSelect(event);
    }
  });

  document.addEventListener('shopify:block:deselect', function(event) {
    var instance = getInstanceById(event.detail.sectionId);

    if (typeof instance === 'object') {
      instance.onBlockDeselect(event);
    }
  });
}

function n$2(n,t){return void 0===t&&(t=document),t.querySelector(n)}function t$2(n,t){return void 0===t&&(t=document),[].slice.call(t.querySelectorAll(n))}function c$1(n,t){return Array.isArray(n)?n.forEach(t):t(n)}function r$2(n){return function(t,r,e){return c$1(t,function(t){return t[n+"EventListener"](r,e)})}}function e$2(n,t,c){return r$2("add")(n,t,c),function(){return r$2("remove")(n,t,c)}}function o$2(n){return function(t){var r=arguments;return c$1(t,function(t){var c;return (c=t.classList)[n].apply(c,[].slice.call(r,1))})}}function u$1(n){o$2("add").apply(void 0,[n].concat([].slice.call(arguments,1)));}function i$1(n){o$2("remove").apply(void 0,[n].concat([].slice.call(arguments,1)));}function l(n){o$2("toggle").apply(void 0,[n].concat([].slice.call(arguments,1)));}function a$1(n,t){return n.classList.contains(t)}

function getDefaultExportFromCjs (x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var isMobile$2 = {exports: {}};

isMobile$2.exports = isMobile;
isMobile$2.exports.isMobile = isMobile;
isMobile$2.exports.default = isMobile;

var mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

var tabletRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i;

function isMobile (opts) {
  if (!opts) opts = {};
  var ua = opts.ua;
  if (!ua && typeof navigator !== 'undefined') ua = navigator.userAgent;
  if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent'];
  }
  if (typeof ua !== 'string') return false

  var result = opts.tablet ? tabletRE.test(ua) : mobileRE.test(ua);

  if (
    !result &&
    opts.tablet &&
    opts.featureDetect &&
    navigator &&
    navigator.maxTouchPoints > 1 &&
    ua.indexOf('Macintosh') !== -1 &&
    ua.indexOf('Safari') !== -1
  ) {
    result = true;
  }

  return result
}

var isMobile$1 = isMobile$2.exports;

var browser = {exports: {}};

(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */
function Delegate(root) {
  /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */
  this.listenerMap = [{}, {}];

  if (root) {
    this.root(root);
  }
  /** @type function() */


  this.handle = Delegate.prototype.handle.bind(this); // Cache of event listeners removed during an event cycle

  this._removedListeners = [];
}
/**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */


Delegate.prototype.root = function (root) {
  var listenerMap = this.listenerMap;
  var eventType; // Remove master event listeners

  if (this.rootElement) {
    for (eventType in listenerMap[1]) {
      if (listenerMap[1].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, true);
      }
    }

    for (eventType in listenerMap[0]) {
      if (listenerMap[0].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, false);
      }
    }
  } // If no root or root is not
  // a dom node, then remove internal
  // root reference and exit here


  if (!root || !root.addEventListener) {
    if (this.rootElement) {
      delete this.rootElement;
    }

    return this;
  }
  /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */


  this.rootElement = root; // Set up master event listeners

  for (eventType in listenerMap[1]) {
    if (listenerMap[1].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, true);
    }
  }

  for (eventType in listenerMap[0]) {
    if (listenerMap[0].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, false);
    }
  }

  return this;
};
/**
 * @param {string} eventType
 * @returns boolean
 */


Delegate.prototype.captureForType = function (eventType) {
  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
};
/**
 * Attach a handler to one
 * event for all elements
 * that match the selector,
 * now or in the future
 *
 * The handler function receives
 * three arguments: the DOM event
 * object, the node that matched
 * the selector while the event
 * was bubbling and a reference
 * to itself. Within the handler,
 * 'this' is equal to the second
 * argument.
 *
 * The node that actually received
 * the event can be accessed via
 * 'event.target'.
 *
 * @param {string} eventType Listen for these events
 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
 * @param {function()} handler Handler function - event data passed here will be in event.data
 * @param {boolean} [useCapture] see 'useCapture' in <https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener>
 * @returns {Delegate} This method is chainable
 */


Delegate.prototype.on = function (eventType, selector, handler, useCapture) {
  var root;
  var listenerMap;
  var matcher;
  var matcherParam;

  if (!eventType) {
    throw new TypeError('Invalid event type: ' + eventType);
  } // handler can be passed as
  // the second or third argument


  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  } // Fallback to sensible defaults
  // if useCapture not set


  if (useCapture === undefined) {
    useCapture = this.captureForType(eventType);
  }

  if (typeof handler !== 'function') {
    throw new TypeError('Handler must be a type of Function');
  }

  root = this.rootElement;
  listenerMap = this.listenerMap[useCapture ? 1 : 0]; // Add master handler for type if not created yet

  if (!listenerMap[eventType]) {
    if (root) {
      root.addEventListener(eventType, this.handle, useCapture);
    }

    listenerMap[eventType] = [];
  }

  if (!selector) {
    matcherParam = null; // COMPLEX - matchesRoot needs to have access to
    // this.rootElement, so bind the function to this.

    matcher = matchesRoot.bind(this); // Compile a matcher for the given selector
  } else if (/^[a-z]+$/i.test(selector)) {
    matcherParam = selector;
    matcher = matchesTag;
  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
    matcherParam = selector.slice(1);
    matcher = matchesId;
  } else {
    matcherParam = selector;
    matcher = Element.prototype.matches;
  } // Add to the list of listeners


  listenerMap[eventType].push({
    selector: selector,
    handler: handler,
    matcher: matcher,
    matcherParam: matcherParam
  });
  return this;
};
/**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */


Delegate.prototype.off = function (eventType, selector, handler, useCapture) {
  var i;
  var listener;
  var listenerMap;
  var listenerList;
  var singleEventType; // Handler can be passed as
  // the second or third argument

  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  } // If useCapture not set, remove
  // all event listeners


  if (useCapture === undefined) {
    this.off(eventType, selector, handler, true);
    this.off(eventType, selector, handler, false);
    return this;
  }

  listenerMap = this.listenerMap[useCapture ? 1 : 0];

  if (!eventType) {
    for (singleEventType in listenerMap) {
      if (listenerMap.hasOwnProperty(singleEventType)) {
        this.off(singleEventType, selector, handler);
      }
    }

    return this;
  }

  listenerList = listenerMap[eventType];

  if (!listenerList || !listenerList.length) {
    return this;
  } // Remove only parameter matches
  // if specified


  for (i = listenerList.length - 1; i >= 0; i--) {
    listener = listenerList[i];

    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
      this._removedListeners.push(listener);

      listenerList.splice(i, 1);
    }
  } // All listeners removed


  if (!listenerList.length) {
    delete listenerMap[eventType]; // Remove the main handler

    if (this.rootElement) {
      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
    }
  }

  return this;
};
/**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */


Delegate.prototype.handle = function (event) {
  var i;
  var l;
  var type = event.type;
  var root;
  var phase;
  var listener;
  var returned;
  var listenerList = [];
  var target;
  var eventIgnore = 'ftLabsDelegateIgnore';

  if (event[eventIgnore] === true) {
    return;
  }

  target = event.target; // Hardcode value of Node.TEXT_NODE
  // as not defined in IE8

  if (target.nodeType === 3) {
    target = target.parentNode;
  } // Handle SVG <use> elements in IE


  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  root = this.rootElement;
  phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2); // eslint-disable-next-line default-case

  switch (phase) {
    case 1:
      //Event.CAPTURING_PHASE:
      listenerList = this.listenerMap[1][type];
      break;

    case 2:
      //Event.AT_TARGET:
      if (this.listenerMap[0] && this.listenerMap[0][type]) {
        listenerList = listenerList.concat(this.listenerMap[0][type]);
      }

      if (this.listenerMap[1] && this.listenerMap[1][type]) {
        listenerList = listenerList.concat(this.listenerMap[1][type]);
      }

      break;

    case 3:
      //Event.BUBBLING_PHASE:
      listenerList = this.listenerMap[0][type];
      break;
  }

  var toFire = []; // Need to continuously check
  // that the specific list is
  // still populated in case one
  // of the callbacks actually
  // causes the list to be destroyed.

  l = listenerList.length;

  while (target && l) {
    for (i = 0; i < l; i++) {
      listener = listenerList[i]; // Bail from this loop if
      // the length changed and
      // no more listeners are
      // defined between i and l.

      if (!listener) {
        break;
      }

      if (target.tagName && ["button", "input", "select", "textarea"].indexOf(target.tagName.toLowerCase()) > -1 && target.hasAttribute("disabled")) {
        // Remove things that have previously fired
        toFire = [];
      } // Check for match and fire
      // the event if there's one
      //
      // TODO:MCG:20120117: Need a way
      // to check if event#stopImmediatePropagation
      // was called. If so, break both loops.
      else if (listener.matcher.call(target, listener.matcherParam, target)) {
          toFire.push([event, target, listener]);
        }
    } // TODO:MCG:20120117: Need a way to
    // check if event#stopPropagation
    // was called. If so, break looping
    // through the DOM. Stop if the
    // delegation root has been reached


    if (target === root) {
      break;
    }

    l = listenerList.length; // Fall back to parentNode since SVG children have no parentElement in IE

    target = target.parentElement || target.parentNode; // Do not traverse up to document root when using parentNode, though

    if (target instanceof HTMLDocument) {
      break;
    }
  }

  var ret;

  for (i = 0; i < toFire.length; i++) {
    // Has it been removed during while the event function was fired
    if (this._removedListeners.indexOf(toFire[i][2]) > -1) {
      continue;
    }

    returned = this.fire.apply(this, toFire[i]); // Stop propagation to subsequent
    // callbacks if the callback returned
    // false

    if (returned === false) {
      toFire[i][0][eventIgnore] = true;
      toFire[i][0].preventDefault();
      ret = false;
      break;
    }
  }

  return ret;
};
/**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */


Delegate.prototype.fire = function (event, target, listener) {
  return listener.handler.call(target, event, target);
};
/**
 * Check whether an element
 * matches a tag selector.
 *
 * Tags are NOT case-sensitive,
 * except in XML (and XML-based
 * languages such as XHTML).
 *
 * @param {string} tagName The tag name to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */


function matchesTag(tagName, element) {
  return tagName.toLowerCase() === element.tagName.toLowerCase();
}
/**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */


function matchesRoot(selector, element) {
  if (this.rootElement === window) {
    return (// Match the outer document (dispatched from document)
      element === document || // The <html> element (dispatched from document.body or document.documentElement)
      element === document.documentElement || // Or the window itself (dispatched from window)
      element === window
    );
  }

  return this.rootElement === element;
}
/**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */


function matchesId(id, element) {
  return id === element.id;
}
/**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */


Delegate.prototype.destroy = function () {
  this.off();
  this.root();
};

var _default = Delegate;
exports.default = _default;
module.exports = exports.default;
}(browser, browser.exports));

var Delegate = /*@__PURE__*/getDefaultExportFromCjs(browser.exports);

var pageTransition = (function () {
  var pageTransitionOverlay = document.querySelector("#page-transition-overlay");
  var animationDuration = 200;

  if (pageTransitionOverlay) {
    pageTransitionOverlay.classList.remove("skip-transition");
    setTimeout(function () {
      pageTransitionOverlay.classList.remove("active");
    }, 0);
    setTimeout(function () {
      // Prevent the theme editor from seeing this
      pageTransitionOverlay.classList.remove("active");
    }, animationDuration);
    var delegate = new Delegate(document.body);
    delegate.on("click", 'a[href]:not([href^="#"]):not(.no-transition):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])', onClickedToLeave);

    window.onpageshow = function (e) {
      if (e.persisted) {
        pageTransitionOverlay.classList.remove("active");
      }
    };
  }

  function onClickedToLeave(event, target) {
    // avoid interupting open-in-new-tab click
    if (event.ctrlKey || event.metaKey) return;
    event.preventDefault(); // Hint to browser to prerender destination

    var linkHint = document.createElement("link");
    linkHint.setAttribute("rel", "prerender");
    linkHint.setAttribute("href", target.href);
    document.head.appendChild(linkHint);
    setTimeout(function () {
      window.location.href = target.href;
    }, animationDuration);
    pageTransitionOverlay.classList.add("active");
  }
});

/*!
* tabbable 5.2.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));

  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }

  candidates = candidates.filter(filter);
  return candidates;
};

var isContentEditable = function isContentEditable(node) {
  return node.contentEditable === 'true';
};

var getTabindex = function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!isNaN(tabindexAttr)) {
    return tabindexAttr;
  } // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.


  if (isContentEditable(node)) {
    return 0;
  } // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.


  if ((node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
    return 0;
  }

  return node.tabIndex;
};

var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};

var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};

var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};

var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};

var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};

var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }

  var radioScope = node.form || node.ownerDocument;

  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };

  var radioSet;

  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }

  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};

var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};

var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

var isHidden = function isHidden(node, displayCheck) {
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }

  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }

  if (!displayCheck || displayCheck === 'full') {
    while (node) {
      if (getComputedStyle(node).display === 'none') {
        return true;
      }

      node = node.parentElement;
    }
  } else if (displayCheck === 'non-zero-area') {
    var _node$getBoundingClie = node.getBoundingClientRect(),
        width = _node$getBoundingClie.width,
        height = _node$getBoundingClie.height;

    return width === 0 && height === 0;
  }

  return false;
}; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset


var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (isInput(node) || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA' || node.tagName === 'BUTTON') {
    var parentNode = node.parentElement;

    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> as an immediate child of the disabled
        //  <fieldset>: if the node is in that legend, it'll be enabled even
        //  though the fieldset is disabled; otherwise, the node is in a
        //  secondary/subsequent legend, or somewhere else within the fieldset
        //  (however deep nested) and it'll be disabled
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);

          if (child.tagName === 'LEGEND') {
            if (child.contains(node)) {
              return false;
            } // the node isn't in the first legend (in doc order), so no matter
            //  where it is now, it'll be disabled


            return true;
          }
        } // the node isn't in a legend, so no matter where it is now, it'll be disabled


        return true;
      }

      parentNode = parentNode.parentElement;
    }
  } // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state


  return false;
};

var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }

  return true;
};

var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (!isNodeMatchingSelectorFocusable(options, node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
};

var tabbable = function tabbable(el, options) {
  options = options || {};
  var regularTabbables = [];
  var orderedTabbables = [];
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  candidates.forEach(function (candidate, i) {
    var candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  });
  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
};

var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

var isFocusable = function isFocusable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorFocusable(options, node);
};

/*!
* focus-trap 6.7.1
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying the first and last tabbable nodes in all containers/groups in
    //  the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{ container: HTMLElement, firstTabbableNode: HTMLElement|null, lastTabbableNode: HTMLElement|null }>}
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };

  var containersContain = function containersContain(element) {
    return !!(element && state.containers.some(function (container) {
      return container.contains(element);
    }));
  };
  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */


  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      optionValue = optionValue.apply(void 0, params);
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      } // else, empty string (invalid), null (invalid), 0 (invalid)


      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }

    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails

      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

    if (node === false) {
      return false;
    }

    if (node === undefined) {
      // option not specified: use fallback options
      if (containersContain(doc.activeElement)) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }

    if (!node) {
      // throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.tabbableGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable(container);

      if (tabbableNodes.length > 0) {
        return {
          container: container,
          firstTabbableNode: tabbableNodes[0],
          lastTabbableNode: tabbableNodes[tabbableNodes.length - 1]
        };
      }

      return undefined;
    }).filter(function (group) {
      return !!group;
    }); // remove groups with no tabbable nodes
    // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      // throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }

    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      // tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);

    if (containersContain(target)) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(target)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var target = getActualTarget(e);
    var targetContained = containersContain(target); // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's tabbable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findIndex(state.tabbableGroups, function (_ref) {
        var container = _ref.container;
        return container.contains(target);
      });

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && state.tabbableGroups[containerIndex].container === target) {
          // an exception case where the target is the container itself, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && state.tabbableGroups[containerIndex].container === target) {
          // an exception case where the target is the container itself, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    var target = getActualTarget(e);

    if (containersContain(target)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners();

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      clearTimeout(state.delayInitialFocusTimer); // noop if undefined

      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(deactivateOptions, 'onDeactivate');
      var onPostDeactivate = getOption(deactivateOptions, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(deactivateOptions, 'checkCanReturnFocus');

      if (onDeactivate) {
        onDeactivate();
      }

      var returnFocus = getOption(deactivateOptions, 'returnFocus', 'returnFocusOnDeactivate');

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPaddingRight = void 0;

// returns true if `el` should be allowed to receive touchmove events.
var allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var preventDefault$1 = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

var setOverflowHidden = function setOverflowHidden(options) {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (_reserveScrollBarGap && scrollBarGap > 0) {
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = scrollBarGap + 'px';
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault$1(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault$1(event);
  }

  event.stopPropagation();
  return true;
};

var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(function (lock) {
    return lock.targetElement === targetElement;
  })) {
    return;
  }

  var lock = {
    targetElement: targetElement,
    options: options || {}
  };

  locks = [].concat(_toConsumableArray(locks), [lock]);

  if (isIosDevice) {
    targetElement.ontouchstart = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault$1, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  } else {
    setOverflowHidden(options);
  }
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
    return;
  }

  locks = locks.filter(function (lock) {
    return lock.targetElement !== targetElement;
  });

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault$1, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  } else if (!locks.length) {
    restoreOverflowSetting();
  }
};

var n$1=function(n){if("object"!=typeof(t=n)||Array.isArray(t))throw "state should be an object";var t;},t$1=function(n,t,e,c){return (r=n,r.reduce(function(n,t,e){return n.indexOf(t)>-1?n:n.concat(t)},[])).reduce(function(n,e){return n.concat(t[e]||[])},[]).map(function(n){return n(e,c)});var r;},e$1=a(),c=e$1.on,r$1=e$1.emit,o$1=e$1.hydrate;function a(e){void 0===e&&(e={});var c={};return {getState:function(){return Object.assign({},e)},hydrate:function(r){return n$1(r),Object.assign(e,r),function(){var n=["*"].concat(Object.keys(r));t$1(n,c,e);}},on:function(n,t){return (n=[].concat(n)).map(function(n){return c[n]=(c[n]||[]).concat(t)}),function(){return n.map(function(n){return c[n].splice(c[n].indexOf(t),1)})}},emit:function(r,o,u){var a=("*"===r?[]:["*"]).concat(r);(o="function"==typeof o?o(e):o)&&(n$1(o),Object.assign(e,o),a=a.concat(Object.keys(o))),t$1(a,c,e,u);}}}

function wrapIframes () {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  elements.forEach(function (el) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("rte__iframe");
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    el.src = el.src;
  });
}

function wrapTables () {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  elements.forEach(function (el) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("rte__table-wrapper");
    wrapper.tabIndex = 0;
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  });
}

var classes$F = {
  visible: "is-visible",
  active: "active",
  fixed: "is-fixed"
};
var selectors$1G = {
  closeBtn: "[data-modal-close]",
  wash: ".modal__wash",
  modalContent: ".modal__content"
};

var modal = function modal(node) {
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true
  });
  var modalContent = n$2(selectors$1G.modalContent, node);
  var delegate = new Delegate(document);
  delegate.on("click", selectors$1G.wash, function () {
    return _close();
  });
  var events = [e$2(n$2(selectors$1G.closeBtn, node), "click", function (e) {
    e.preventDefault();

    _close();
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) _close();
  }), c("modal:open", function (state, _ref2) {
    var modalContent = _ref2.modalContent,
        _ref2$narrow = _ref2.narrow,
        narrow = _ref2$narrow === void 0 ? false : _ref2$narrow;
    l(node, "modal--narrow", narrow);

    _renderModalContent(modalContent);

    _open();
  })];

  var _renderModalContent = function _renderModalContent(content) {
    var clonedContent = content.cloneNode(true);
    modalContent.innerHTML = "";
    modalContent.appendChild(clonedContent);
    wrapIframes(t$2("iframe", modalContent));
    wrapTables(t$2("table", modalContent));
  };

  var _open = function _open() {
    // Due to this component being shared between templates we have to
    // animate around it being fixed to the window
    u$1(node, classes$F.active);
    document.body.setAttribute("data-fluorescent-overlay-open", "true");
    focusTrap.activate();
    disableBodyScroll(node, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }

          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
  };

  var _close = function _close() {
    focusTrap.deactivate();
    i$1(node, classes$F.active);
    document.body.setAttribute("data-fluorescent-overlay-open", "false");
    enableBodyScroll(node);
    setTimeout(function () {
      modalContent.innerHTML = "";
    }, 300);
  };

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    unload: unload
  };
};

var AnimateProductItem = (function (items) {
  var events = [];
  items.forEach(function (item) {
    var imageOne = n$2(".product-item__image--one", item);
    var imageTwo = n$2(".product-item__image--two", item);
    t$2(".product-item-options__list", item);
    events.push(e$2(item, "mouseenter", function () {
      enterItemAnimation(imageOne, imageTwo);
    }));
    events.push(e$2(item, "mouseleave", function () {
      leaveItemAnimation(imageOne, imageTwo);
    }));
  });

  function enterItemAnimation(imageOne, imageTwo, optionsElements) {
    if (imageTwo) {
      u$1(imageTwo, "active");
    }
  }

  function leaveItemAnimation(imageOne, imageTwo, optionsElements) {
    if (imageTwo) {
      i$1(imageTwo, "active");
    }
  }

  return {
    destroy: function destroy() {
      events.forEach(function (unsubscribe) {
        return unsubscribe();
      });
    }
  };
});

function getMediaQuery(querySize) {
  var value = getComputedStyle(document.documentElement).getPropertyValue("--media-".concat(querySize));

  if (!value) {
    console.warn("Invalid querySize passed to getMediaQuery");
    return false;
  }

  return value;
}

var intersectionWatcher = (function (node) {
  var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var margin = window.matchMedia(getMediaQuery("above-720")).matches ? 200 : 100;
  var threshold = 0;

  if (!instant) {
    threshold = Math.min(margin / node.offsetHeight, 0.5);
  }

  var observer = new IntersectionObserver(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        visible = _ref2[0].isIntersecting;

    if (visible) {
      u$1(node, "is-visible");
      observer.disconnect();
    }
  }, {
    threshold: threshold
  });
  observer.observe(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.disconnect();
    }
  };
});

/**
 * delayOffset takes an array of selectors and sets the `--delay-offset-multiplier` variable in the correct order
 * @param {node} element The section element
 * @param {items} array Array of animation items
 */

var delayOffset = (function (node, items) {
  var offsetStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var delayOffset = offsetStart;
  items.forEach(function (selector) {
    var items = t$2(selector, node);
    items.forEach(function (item) {
      item.style.setProperty("--delay-offset-multiplier", delayOffset);
      delayOffset++;
    });
  });
});

var shouldAnimate = (function (node) {
  return a$1(node, "animation") && !a$1(document.documentElement, "prefers-reduced-motion");
});

var selectors$1F = {
  sectionBlockItems: ".section-blocks > *",
  image: ".image-with-text__image .image__img",
  imageSmall: ".image-with-text__small-image .image__img",
  imageCaption: ".image-with-text__image-caption"
};
var animateImageWithText = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1F.image, selectors$1F.imageSmall, selectors$1F.imageCaption]);
  delayOffset(node, [selectors$1F.sectionBlockItems], 6);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1E = {
  sectionBlockItems: ".section-blocks > *",
  image: ".image-with-text-split__image .image__img"
};
var animateImageWithTextSplit = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1E.image]);
  delayOffset(node, [selectors$1E.sectionBlockItems], 6);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1D = {
  content: ".testimonials__item-content > *",
  image: ".testimonials__item-product-image",
  imageCaption: ".testimonials__item-product-title",
  item: ".animation--item"
};
var classes$E = {
  imageRight: "testimonials__item--image-placement-right"
};
var animateTestimonials = (function (node) {
  var delayItems = []; // Create an array of selectors for the animation elements
  // in the order they should animate in

  if (a$1(node, classes$E.imageRight)) {
    delayItems.push(selectors$1D.content);
    delayItems.push(selectors$1D.image);
    delayItems.push(selectors$1D.imageCaption);
  } else {
    delayItems.push(selectors$1D.image);
    delayItems.push(selectors$1D.imageCaption);
    delayItems.push(selectors$1D.content);
  } // Add the animation delay offset variables


  delayOffset(node, delayItems, 2);
  delayOffset(node, [selectors$1D.item]);
});

var selectors$1C = {
  content: ".quote__item-inner > *"
};
var animateQuotes = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1C.content]);
});

var selectors$1B = {
  sectionBlockItems: ".animation--section-introduction > *",
  controls: ".animation--controls",
  items: ".animation--item"
};
var animateListSlider = (function (node) {
  var delayItems = [selectors$1B.sectionBlockItems, selectors$1B.controls, selectors$1B.items]; // Add the animation delay offset variables

  delayOffset(node, delayItems);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1A = {
  introductionItems: ".section-introduction > *",
  image: ".complete-the-look__image-wrapper .image__img",
  product: ".complete-the-look__product",
  products: ".complete-the-look__products"
};
var classes$D = {
  imageLeft: "complete-the-look--image-left"
};
var animateCompleteTheLook = (function (node) {
  var delayItems = [];
  delayItems.push(selectors$1A.introductionItems); // Create an array of selectors for the animation elements
  // in the order they should animate in

  if (a$1(node, classes$D.imageLeft) || window.matchMedia(getMediaQuery("below-720")).matches) {
    delayItems.push(selectors$1A.image);
    delayItems.push(selectors$1A.products);
    delayItems.push(selectors$1A.product);
  } else {
    delayItems.push(selectors$1A.products);
    delayItems.push(selectors$1A.product);
    delayItems.push(selectors$1A.image);
  } // Add the animation delay offset variables


  delayOffset(node, delayItems);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer.destroy();
    }
  };
});

var selectors$1z = {
  introductionItems: ".section-introduction > *",
  image: ".shoppable-image__image-wrapper .image__img",
  hotspots: ".shoppable-item__hotspot-wrapper"
};
var animateShoppableImage = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1z.introductionItems, selectors$1z.image, selectors$1z.hotspots]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer.destroy();
    }
  };
});

var selectors$1y = {
  introductionItems: ".section-introduction > *",
  carousel: ".shoppable-feature__secondary-content .shoppable-feature__carousel-outer",
  hotspots: ".shoppable-item__hotspot-wrapper",
  mobileDrawerItems: ".animation--shoppable-feature-mobile-drawer  .shoppable-feature__carousel-outer > *:not(.swiper-pagination)"
};
var animateShoppableFeature = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1y.introductionItems, selectors$1y.carousel], 1);
  delayOffset(node, [selectors$1y.hotspots], 1); // Add separate delay offsets for mobile drawer

  delayOffset(node, [selectors$1y.mobileDrawerItems], 1);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer.destroy();
    }
  };
});

var selectors$1x = {
  textContent: ".image-hero-split-item__text-container-inner > *"
};
var animateImageHeroSplit = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1x.textContent], 1);
});

var selectors$1w = {
  textContent: ".image-hero__text-container-inner > *"
};
var animateImageHero = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1w.textContent], 3);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var classes$C = {
  animation: "animation--image-compare"
};
var selectors$1v = {
  introductionItems: ".animation--section-introduction > *",
  image: ".image_compare__image-wrapper .image__img",
  labels: ".image-compare__label-container",
  sliderLine: ".image-compare__slider-line",
  sliderButton: ".image-compare__slider-button"
};
var animateImageCompare = (function (node) {
  delayOffset(node, [selectors$1v.introductionItems, selectors$1v.image, selectors$1v.labels, selectors$1v.sliderLine, selectors$1v.sliderButton]);
  var margin = window.matchMedia(getMediaQuery("above-720")).matches ? 200 : 100;
  var threshold = Math.min(margin / node.offsetHeight, 0.5);
  var observer = new IntersectionObserver(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        visible = _ref2[0].isIntersecting;

    if (visible) {
      u$1(node, "is-visible"); // Enable slider controls by removing animation class after animation duration

      setTimeout(function () {
        i$1(node, classes$C.animation);
      }, 1200);
      observer.disconnect();
    }
  }, {
    threshold: threshold
  });
  observer.observe(node);
  return {
    destroy: function destroy() {
      observer.destroy();
    }
  };
});

var selectors$1u = {
  textContent: ".video__text-container > *"
};
var animateVideo = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1u.textContent], 3);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1t = {
  textContent: ".video-hero__text-container > *"
};
var animateVideoHero = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1t.textContent], 3);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1s = {
  articleHeading: "\n    .article__image-container,\n    .article__header-inner > *\n  ",
  articleContent: ".article__content"
};
var animateArticle = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1s.articleHeading, selectors$1s.articleContent]);
  var articleHeading = t$2(selectors$1s.articleHeading, node);
  var articleContent = n$2(selectors$1s.articleContent, node);
  var observers = articleHeading.map(function (item) {
    return intersectionWatcher(item);
  });
  observers.push(intersectionWatcher(articleContent));
  return {
    destroy: function destroy() {
      observers.forEach(function (observer) {
        return observer.destroy();
      });
    }
  };
});

var selectors$1r = {
  image: ".collection-banner__image-container",
  content: ".collection-banner__text-container-inner > *"
};
var animateCollectionBanner = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1r.image, selectors$1r.content]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1q = {
  partial: "[data-partial]",
  filterBar: "[data-filter-bar]",
  mobileFilterBar: "[data-mobile-filters]",
  productItems: ".animation--item:not(.animation--item-revealed)"
};
var classes$B = {
  hideProducts: "animation--collection-products-hide",
  itemRevealed: "animation--item-revealed"
};
var animateCollection = (function (node) {
  var partial = n$2(selectors$1q.partial, node);
  var filterbarEl = n$2(selectors$1q.filterBar, node);
  var mobileFilterBarEl = n$2(selectors$1q.mobileFilterBar, node);
  var filterbarObserver = null;

  if (filterbarEl) {
    filterbarObserver = intersectionWatcher(filterbarEl, true);
  }

  var mobileFilterBarObserver = null;

  if (mobileFilterBarEl) {
    mobileFilterBarObserver = intersectionWatcher(mobileFilterBarEl, true);
  }

  setupProductItem();

  function setupProductItem() {
    var productItems = t$2(selectors$1q.productItems, node);
    delayOffset(node, [selectors$1q.productItems]);
    setTimeout(function () {
      u$1(productItems, classes$B.itemRevealed);
    }, 0);
  } // Scroll to top of collection grid after applying filters
  // to show the newly filtered list of products


  function _scrollIntoView() {
    var y = partial.getBoundingClientRect().top + window.pageYOffset - filterbarEl.getBoundingClientRect().height;
    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }

  function updateContents() {
    setupProductItem(); // Remove the fade out class

    i$1(partial, classes$B.hideProducts);

    _scrollIntoView();
  }

  function infiniteScrollReveal() {
    setupProductItem();
  }

  return {
    updateContents: updateContents,
    infiniteScrollReveal: infiniteScrollReveal,
    destroy: function destroy() {
      var _filterbarObserver, _mobileFilterBarObser;

      (_filterbarObserver = filterbarObserver) === null || _filterbarObserver === void 0 ? void 0 : _filterbarObserver.destroy();
      (_mobileFilterBarObser = mobileFilterBarObserver) === null || _mobileFilterBarObser === void 0 ? void 0 : _mobileFilterBarObser.destroy();
    }
  };
});

var selectors$1p = {
  saleAmount: ".animation--sale-amount",
  sectionBlockItems: ".animation--section-blocks > *",
  saleItems: ".sale-promotion .sale-promotion__type,\n  .sale-promotion .sale-promotion__unit-currency,\n  .sale-promotion .sale-promotion__unit-percent,\n  .sale-promotion .sale-promotion__unit-off,\n  .sale-promotion .sale-promotion__amount,\n  .sale-promotion .sale-promotion__per-month,\n  .sale-promotion .sale-promotion__per-year,\n  .sale-promotion .sale-promotion__terms,\n  .sale-promotion .sales-banner__button"
};
var animateSalesBanner = (function (node) {
  var leftColumnDelayItems = [selectors$1p.saleAmount, selectors$1p.saleItems];
  var rightColumnDelayItems = [selectors$1p.sectionBlockItems]; // Add the animation delay offset variables

  delayOffset(node, leftColumnDelayItems);
  delayOffset(node, rightColumnDelayItems, 1);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1o = {
  sectionBlockItems: ".section-blocks > *"
};
var animateCountdownBanner = (function (node) {
  var observer = intersectionWatcher(node);
  delayOffset(node, [selectors$1o.sectionBlockItems]);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1n = {
  items: "\n  .sales-banner__bar-item--heading,\n  .sales-banner__bar-text,\n  .sales-banner__button,\n  .countdown-banner__bar-item--heading,\n  .countdown-banner__bar-item--timer,\n  .countdown-banner__bar-text,\n  .countdown-banner__button"
};
var animateCountdownBar = (function (node) {
  var observer = intersectionWatcher(node);
  delayOffset(node, [selectors$1n.items]);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var animatePromotionBar = (function (node) {
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1m = {
  headerItems: ".animation--blog-header > *",
  articleItem: ".article-item",
  pagination: ".blog__pagination"
};
var animateBlog = (function (node) {
  delayOffset(node, [selectors$1m.headerItems, selectors$1m.articleItem, selectors$1m.pagination]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1l = {
  flyouts: "[data-filter-modal]",
  animationFilterDrawerItem: ".animation--filter-drawer-item"
};
var classes$A = {
  animationRevealed: "animation--filter-bar-revealed",
  animationFilterDrawerItem: "animation--filter-drawer-item"
};
var animateFilterDrawer = (function (node) {
  var flyouts = t$2(selectors$1l.flyouts, node);
  flyouts.forEach(_setupItemOffsets); // Set the position offset on each time to be animated

  function _setupItemOffsets(flyout) {
    delayOffset(flyout, [selectors$1l.animationFilterDrawerItem]);
  } // Trigger the reveal animation when the drawer is opened


  function open(flyout) {
    u$1(flyout, classes$A.animationRevealed);
  } // Reset the reveal animation when the drawer is closed


  function close(flyouts) {
    i$1(flyouts, classes$A.animationRevealed);
  }

  return {
    open: open,
    close: close
  };
});

var selectors$1k = {
  animationItem: ".animation--drawer-menu-item"
};
var classes$z = {
  animationRevealed: "animation--drawer-menu-revealed"
};
var animateDrawerMenu = (function (node) {
  delayOffset(node, [selectors$1k.animationItem]); // Trigger the reveal animation when the drawer is opened

  function open() {
    if (shouldAnimate(node)) {
      u$1(node, classes$z.animationRevealed);
    }
  } // Trigger the reveal animation when the drawer is opened


  function close() {
    if (shouldAnimate(node)) {
      i$1(node, classes$z.animationRevealed);
    }
  }

  return {
    open: open,
    close: close
  };
});

var selectors$1j = {
  animationItem: ".animation--quick-cart-items > *, .animation--quick-cart-footer"
};
var classes$y = {
  animationRevealed: "animation--quick-cart-revealed"
};
var animateQuickCart = (function (node) {
  setup(); // Trigger the reveal animation when the drawer is opened

  function open() {
    u$1(node, classes$y.animationRevealed);
  } // Reset the reveal animation when the drawer is closed


  function close() {
    i$1(node, classes$y.animationRevealed);
  } // Setup delay offsets


  function setup() {
    delayOffset(node, [selectors$1j.animationItem]);
  }

  return {
    open: open,
    close: close,
    setup: setup
  };
});

var selectors$1i = {
  animationItems: ".animation--quick-view-items > *"
};
var classes$x = {
  animationRevealed: "animation--quick-view-revealed"
};
var animateQuickView = (function (node) {
  function animate() {
    // Add the animation delay offset variables
    delayOffset(node, [selectors$1i.animationItems]); // Trigger the reveal animation when the quick view is opened.
    // We can't use the `.is-visible` class added in `quick-view-modal.js`
    // because it can be added before the content is fetched.

    setTimeout(function () {
      u$1(node, classes$x.animationRevealed);
    }, 0);
  }

  function reset() {
    i$1(node, classes$x.animationRevealed);
  }

  return {
    animate: animate,
    reset: reset
  };
});

var selectors$1h = {
  columns: ".meganav__list-parent > li",
  image: ".meganav__promo-image .image__img",
  overlay: ".meganav__secondary-promo-overlay",
  promoItems: ".meganav__secondary-promo-text > *",
  hasPromo: "meganav--has-promo",
  promoLeft: "meganav--promo-position-left"
};
var animateMeganav = (function (node) {
  var delayItems = [];
  var columnItems = t$2(selectors$1h.columns, node);

  if (a$1(node, selectors$1h.hasPromo)) {
    delayOffset(node, [selectors$1h.image, selectors$1h.overlay, selectors$1h.promoItems]);

    if (a$1(node, selectors$1h.promoLeft)) {
      // Set columnItem initial delay to i + 1 of previously delayed
      assignColumnDelays(columnItems, 4);
    } else {
      assignColumnDelays(columnItems);
    }
  } else {
    assignColumnDelays(columnItems);
  } // Add the animation delay offset variables


  delayOffset(node, delayItems);

  function assignColumnDelays(items) {
    var delayMultiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var columnOffset;
    items.forEach(function (item, i) {
      var leftOffset = item.getBoundingClientRect ? item.getBoundingClientRect().left : item.offsetLeft;
      if (i === 0) columnOffset = leftOffset;

      if (columnOffset != leftOffset) {
        columnOffset = leftOffset;
        delayMultiplier++;
      }

      item.style.setProperty("--delay-offset-multiplier", delayMultiplier);
    });
  }
});

var selectors$1g = {
  heading: ".list-collections__heading",
  productItems: ".animation--item"
};
var animateListCollections = (function (node) {
  delayOffset(node, [selectors$1g.heading, selectors$1g.productItems]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer.destroy();
    }
  };
});

var selectors$1f = {
  gridItems: ".grid-item"
};
var animateGrid = (function (node) {
  delayOffset(node, [selectors$1f.gridItems]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer.destroy();
    }
  };
});

var selectors$1e = {
  animationItems: ".animation--purchase-confirmation-item",
  animationFooterItems: ".animation--purchase-confirmation-footer-item"
};
var classes$w = {
  animationRevealed: "animation--purchase-confirmation-revealed"
};
var animatePurchaseConfirmation = (function (node) {
  function animate() {
    // Add the animation delay offset variables
    delayOffset(node, [selectors$1e.animationItems]);
    delayOffset(node, [selectors$1e.animationFooterItems]); // Trigger the reveal animation when the quick view is opened.

    setTimeout(function () {
      u$1(node, classes$w.animationRevealed);
    }, 0);
  }

  function reset() {
    i$1(node, classes$w.animationRevealed);
  }

  return {
    animate: animate,
    reset: reset
  };
});

var selectors$1d = {
  pageItems: ".page-section__inner > *"
};
var animatePage = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1d.pageItems]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer.forEach(function (observer) {
        return observer.destroy();
      });
    }
  };
});

var selectors$1c = {
  items: ".collapsible-row-list__inner > *"
};
var animateCollapsibleRowList = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1c.items]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1b = {
  items: ".animation--section-blocks > *"
};
var animateRichText = (function (node) {
  delayOffset(node, [selectors$1b.items]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1a = {
  headerItems: ".animation--section-introduction > *",
  articleItem: ".article-item"
};
var animateBlogPosts = (function (node) {
  delayOffset(node, [selectors$1a.headerItems, selectors$1a.articleItem]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$19 = {
  intro: ".animation--section-introduction > *",
  items: ".animation--item"
};
var animateFeaturedCollectionGrid = (function (node) {
  delayOffset(node, [selectors$19.intro, selectors$19.items]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$18 = {
  productItems: ".animation--item",
  introductionItems: ".animation--section-introduction > *"
};
var animateCollectionListGrid = (function (node) {
  delayOffset(node, [selectors$18.introductionItems, selectors$18.productItems]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$17 = {
  animationItems: ".animation--store-availability-drawer-items > *"
};
var classes$v = {
  animationRevealed: "animation--store-availability-drawer-revealed"
};
var animateStoreAvailabilityDrawer = (function (node) {
  function animate() {
    // Set the position offset on each time to be animated
    var items = t$2(selectors$17.animationItems, node);
    items.forEach(function (item, i) {
      item.style.setProperty("--position-offset-multiplier", i);
    }); // Trigger the reveal animation when the quick view is opened.
    // We can't use the `.is-visible` class added in `quick-view-modal.js`
    // because it can be added before the content is fetched.

    setTimeout(function () {
      u$1(node, classes$v.animationRevealed);
    }, 0);
  }

  function reset() {
    i$1(node, classes$v.animationRevealed);
  }

  return {
    animate: animate,
    reset: reset
  };
});

var selectors$16 = {
  media: ".animation--product-media"
};
var animateProduct = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$16.media]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$15 = {
  headerItems: ".animation--section-introduction > *",
  animationItem: ".animation--item"
};
var animateContactForm = (function (node) {
  delayOffset(node, [selectors$15.headerItems, selectors$15.animationItem]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$14 = {
  partial: "[data-partial]",
  filterBar: "[data-filter-bar]",
  mobileFilterBar: "[data-mobile-filters]",
  productItems: ".animation--item:not(.animation--item-revealed)"
};
var classes$u = {
  hideProducts: "animation--search-products-hide",
  itemRevealed: "animation--item-revealed"
};
var animateSearch = (function (node) {
  var partial = n$2(selectors$14.partial, node);
  var filterbarEl = n$2(selectors$14.filterBar, node);
  var mobileFilterBarEl = n$2(selectors$14.mobileFilterBar, node);
  var filterbarObserver = null;

  if (filterbarEl) {
    filterbarObserver = intersectionWatcher(filterbarEl, true);
  }

  var mobileFilterBarObserver = null;

  if (mobileFilterBarEl) {
    mobileFilterBarObserver = intersectionWatcher(mobileFilterBarEl, true);
  }

  _setupProductItem();

  function _setupProductItem() {
    var productItems = t$2(selectors$14.productItems, node);
    delayOffset(node, [selectors$14.productItems]);
    setTimeout(function () {
      u$1(productItems, classes$u.itemRevealed);
    }, 0);
  } // Scroll to top of search grid after applying filters
  // to show the newly filtered list of products


  function _scrollIntoView() {
    var y = partial.getBoundingClientRect().top + window.pageYOffset - filterbarEl.getBoundingClientRect().height;
    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }

  function updateContents() {
    _setupProductItem(); // Remove the fade out class


    i$1(partial, classes$u.hideProducts);

    _scrollIntoView();
  }

  function infiniteScrollReveal() {
    _setupProductItem();
  }

  return {
    updateContents: updateContents,
    infiniteScrollReveal: infiniteScrollReveal,
    destroy: function destroy() {
      var _filterbarObserver, _mobileFilterBarObser;

      (_filterbarObserver = filterbarObserver) === null || _filterbarObserver === void 0 ? void 0 : _filterbarObserver.destroy();
      (_mobileFilterBarObser = mobileFilterBarObserver) === null || _mobileFilterBarObser === void 0 ? void 0 : _mobileFilterBarObser.destroy();
    }
  };
});

var selectors$13 = {
  content: ".animation--section-blocks > *"
};
var animateSearchBanner = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$13.content]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$12 = {
  headerItems: ".animation--section-introduction > *",
  columnItems: ".multi-column__grid-item"
};
var animateMultiColumn = (function (node) {
  delayOffset(node, [selectors$12.headerItems, selectors$12.columnItems]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer.destroy();
    }
  };
});

var selectors$11 = {
  textContent: ".password__text-container-inner > *"
};
var animatePassword = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$11.textContent], 3);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$10 = {
  animationItem: ".animation--popup-item"
};
var classes$t = {
  animationRevealed: "animation--popup-revealed"
};
var animatePopup = (function (node) {
  delayOffset(node, [selectors$10.animationItem]); // Trigger the reveal animation when the drawer is opened

  function open() {
    if (shouldAnimate(node)) {
      u$1(node, classes$t.animationRevealed);
    }
  } // Trigger the reveal animation when the drawer is opened


  function close() {
    if (shouldAnimate(node)) {
      i$1(node, classes$t.animationRevealed);
    }
  }

  return {
    open: open,
    close: close
  };
});

var selectors$$ = {
  items: ".animation--section-blocks > *"
};
var animateNewsletter = (function (node) {
  delayOffset(node, [selectors$$.items]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$_ = {
  items: ".animation--section-blocks > *"
};
var animateNewsletterCompact = (function (node) {
  delayOffset(node, [selectors$_.items]);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$Z = {
  headerItems: ".animation--section-introduction > *",
  eventItems: ".event-item"
};
var animateEvents = (function (node) {
  delayOffset(node, [selectors$Z.headerItems]);
  var observer = intersectionWatcher(node, true);

  function animateEventItems() {
    delayOffset(node, [selectors$Z.eventItems]);
    setTimeout(function () {
      u$1(node, "animate-event-items");
    }, 50);
  }

  return {
    animateEventItems: animateEventItems,
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$Y = {
  giantHeading: ".animation--giant-heading",
  sectionBlockItems: ".animation--section-blocks > *"
};
var animatePromoBanner = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$Y.giantHeading, selectors$Y.sectionBlockItems]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$X = {
  controls: ".product-tabs__tab-buttons",
  items: ".product-tabs__tab-list-wrapper",
  accordionItems: ".accordion"
};
var animateProductTabs = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$X.controls, selectors$X.items]);
  delayOffset(node, [selectors$X.accordionItems]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$W = {
  intro: ".animation--section-introduction > *",
  items: ".animation--item"
};
var animateApps = (function (node) {
  delayOffset(node, [selectors$W.intro, selectors$W.items]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(this.status));
      }
    };

    xhr.onerror = function () {
      reject(new Error(this.status));
    };

    xhr.send();
  });
}

var classes$s = {
  active: "active"
};
var selectors$V = {
  drawerTrigger: "[data-store-availability-drawer-trigger]",
  closeBtn: "[data-store-availability-close]",
  productTitle: "[data-store-availability-product-title]",
  variantTitle: "[data-store-availability-variant-title]",
  storeListContainer: "[data-store-list-container]",
  storeListContent: "[data-store-availability-list-content]",
  wash: "[data-store-availability-drawer-wash]",
  parentWrapper: "[data-store-availability-container]"
};

var storeAvailabilityDrawer = function storeAvailabilityDrawer(node) {
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true
  });
  var wash = n$2(selectors$V.wash, node.parentNode);
  var productTitleContainer = n$2(selectors$V.productTitle);
  var variantTitleContainer = n$2(selectors$V.variantTitle);
  var storeListContainer = n$2(selectors$V.storeListContainer, node);
  var storeAvailabilityDrawerAnimate = null;

  if (shouldAnimate(node)) {
    storeAvailabilityDrawerAnimate = animateStoreAvailabilityDrawer(node);
  }

  var events = [e$2([n$2(selectors$V.closeBtn, node), wash], "click", function (e) {
    e.preventDefault();

    _close();
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) _close();
  })];

  var _handleClick = function _handleClick(target) {
    var parentContainer = target.closest(selectors$V.parentWrapper);
    var _parentContainer$data = parentContainer.dataset,
        baseUrl = _parentContainer$data.baseUrl,
        variantId = _parentContainer$data.variantId,
        productTitle = _parentContainer$data.productTitle,
        variantTitle = _parentContainer$data.variantTitle;
    var variantSectionUrl = "".concat(baseUrl, "/variants/").concat(variantId, "/?section_id=store-availability");
    makeRequest("GET", variantSectionUrl).then(function (storeAvailabilityHTML) {
      var container = document.createElement("div");
      container.innerHTML = storeAvailabilityHTML;
      productTitleContainer.innerText = productTitle; // Shopify returns string null on variant titles for products without varians

      variantTitleContainer.innerText = variantTitle === "null" ? "" : variantTitle;
      var storeList = n$2(selectors$V.storeListContent, container);
      storeListContainer.innerHTML = "";
      storeListContainer.appendChild(storeList);
    }).then(_open);
  };

  var _open = function _open() {
    u$1(node, classes$s.active);

    if (shouldAnimate(node)) {
      storeAvailabilityDrawerAnimate.animate();
    }

    node.setAttribute("aria-hidden", "false");
    focusTrap.activate();
    document.body.setAttribute("data-fluorescent-overlay-open", "true");
    disableBodyScroll(node, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }

          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
  };

  var _close = function _close() {
    focusTrap.deactivate();
    i$1(node, classes$s.active);
    node.setAttribute("aria-hidden", "true");
    setTimeout(function () {
      if (shouldAnimate(node)) {
        storeAvailabilityDrawerAnimate.reset();
      }

      document.body.setAttribute("data-fluorescent-overlay-open", "false");
      enableBodyScroll(node);
    }, 500);
  };

  var delegate = new Delegate(document.body);
  delegate.on("click", selectors$V.drawerTrigger, function (_, target) {
    return _handleClick(target);
  });

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    unload: unload
  };
};

var strings$7 = window.theme.strings.accessibility;

var handleTab = function handleTab() {
  var tabHandler = null;
  var formElments = ["INPUT", "TEXTAREA", "SELECT"]; // Determine if the user is a mouse or keyboard user

  function handleFirstTab(e) {
    if (e.keyCode === 9 && !formElments.includes(document.activeElement.tagName)) {
      document.body.classList.add("user-is-tabbing");
      tabHandler();
      tabHandler = e$2(window, "mousedown", handleMouseDownOnce);
    }
  }

  function handleMouseDownOnce() {
    document.body.classList.remove("user-is-tabbing");
    tabHandler();
    tabHandler = e$2(window, "keydown", handleFirstTab);
  }

  tabHandler = e$2(window, "keydown", handleFirstTab);
};

var focusFormStatus = function focusFormStatus(node) {
  var formStatus = n$2(".form-status", node);
  if (!formStatus) return;
  var focusElement = n$2("[data-form-status]", formStatus);
  if (!focusElement) return;
  focusElement.focus();
};

var prefersReducedMotion = function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

function backgroundVideoHandler(container) {
  var pause = n$2(".video-pause", container);
  var video = container.getElementsByTagName("VIDEO")[0];
  if (!pause || !video) return;

  var pauseVideo = function pauseVideo() {
    video.pause();
    pause.innerText = strings$7.play_video;
  };

  var playVideo = function playVideo() {
    video.play();
    pause.innerText = strings$7.pause_video;
  };

  if (prefersReducedMotion()) {
    pauseVideo();
  }

  var pauseListener = e$2(pause, "click", function (e) {
    e.preventDefault();

    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });
  return function () {
    return pauseListener();
  };
}

var classes$r = {
  hidden: "hidden"
};
var sectionClasses = (function () {
  function adjustClasses() {
    var sections = t$2(".main .shopify-section");
    sections.forEach(function (section) {
      var child = section.firstElementChild; // Specific to recommended hidden products

      if (child && child.classList.contains(classes$r.hidden)) {
        u$1(section, classes$r.hidden);
      }
    });
  }

  adjustClasses();
  e$2(document, "shopify:section:load", adjustClasses);
});

var dispatchCustomEvent = function dispatchCustomEvent(eventName) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var detail = {
    detail: data
  };
  var event = new CustomEvent(eventName, data ? detail : null);
  document.dispatchEvent(event);
};

/**
 * Returns a product JSON object when passed a product URL
 * @param {*} url
 */

/**
 * Find a match in the project JSON (using a ID number) and return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Number} value Accepts Number (e.g. 6908023078973)
 * @returns {Object} The variant object once a match has been successful. Otherwise null will be return
 */
function getVariantFromId(product, value) {
  _validateProductStructure(product);

  if (typeof value !== 'number') {
    throw new TypeError(value + ' is not a Number.');
  }

  var result = product.variants.filter(function(variant) {
    return variant.id === value;
  });

  return result[0] || null;
}

/**
 * Convert the Object (with 'name' and 'value' keys) into an Array of values, then find a match & return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Object} collection Object with 'name' and 'value' keys (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
 * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
 */
function getVariantFromSerializedArray(product, collection) {
  _validateProductStructure(product);

  // If value is an array of options
  var optionArray = _createOptionArrayFromOptionCollection(product, collection);
  return getVariantFromOptionArray(product, optionArray);
}

/**
 * Find a match in the project JSON (using Array with option values) and return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Array} options List of submitted values (e.g. ['36', 'Black'])
 * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
 */
function getVariantFromOptionArray(product, options) {
  _validateProductStructure(product);
  _validateOptionsArray(options);

  var result = product.variants.filter(function(variant) {
    return options.every(function(option, index) {
      return variant.options[index] === option;
    });
  });

  return result[0] || null;
}

/**
 * Creates an array of selected options from the object
 * Loops through the project.options and check if the "option name" exist (product.options.name) and matches the target
 * @param {Object} product Product JSON object
 * @param {Array} collection Array of object (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
 * @returns {Array} The result of the matched values. (e.g. ['36', 'Black'])
 */
function _createOptionArrayFromOptionCollection(product, collection) {
  _validateProductStructure(product);
  _validateSerializedArray(collection);

  var optionArray = [];

  collection.forEach(function(option) {
    for (var i = 0; i < product.options.length; i++) {
      if (product.options[i].name.toLowerCase() === option.name.toLowerCase()) {
        optionArray[i] = option.value;
        break;
      }
    }
  });

  return optionArray;
}

/**
 * Check if the product data is a valid JS object
 * Error will be thrown if type is invalid
 * @param {object} product Product JSON object
 */
function _validateProductStructure(product) {
  if (typeof product !== 'object') {
    throw new TypeError(product + ' is not an object.');
  }

  if (Object.keys(product).length === 0 && product.constructor === Object) {
    throw new Error(product + ' is empty.');
  }
}

/**
 * Validate the structure of the array
 * It must be formatted like jQuery's serializeArray()
 * @param {Array} collection Array of object [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }]
 */
function _validateSerializedArray(collection) {
  if (!Array.isArray(collection)) {
    throw new TypeError(collection + ' is not an array.');
  }

  if (collection.length === 0) {
    return [];
  }

  if (collection[0].hasOwnProperty('name')) {
    if (typeof collection[0].name !== 'string') {
      throw new TypeError(
        'Invalid value type passed for name of option ' +
          collection[0].name +
          '. Value should be string.'
      );
    }
  } else {
    throw new Error(collection[0] + 'does not contain name key.');
  }
}

/**
 * Validate the structure of the array
 * It must be formatted as list of values
 * @param {Array} collection Array of object (e.g. ['36', 'Black'])
 */
function _validateOptionsArray(options) {
  if (Array.isArray(options) && typeof options[0] === 'object') {
    throw new Error(options + 'is not a valid array of options.');
  }
}

// Public Methods
// -----------------------------------------------------------------------------

/**
 * Returns a URL with a variant ID query parameter. Useful for updating window.history
 * with a new URL based on the currently select product variant.
 * @param {string} url - The URL you wish to append the variant ID to
 * @param {number} id  - The variant ID you wish to append to the URL
 * @returns {string} - The new url which includes the variant ID query parameter
 */

function getUrlWithVariant(url, id) {
  if (/variant=/.test(url)) {
    return url.replace(/(variant=)[^&]+/, '$1' + id);
  } else if (/\?/.test(url)) {
    return url.concat('&variant=').concat(id);
  }

  return url.concat('?variant=').concat(id);
}

var selectors$U = {
  sentinal: ".scroll-sentinal",
  scrollButtons: ".scroll-button",
  scrollViewport: "[data-scroll-container-viewport]"
};

var scrollContainer = function scrollContainer(node) {
  var sentinals = t$2(selectors$U.sentinal, node);
  var buttons = t$2(selectors$U.scrollButtons, node);
  var _node$dataset = node.dataset,
      axis = _node$dataset.axis,
      startAtEnd = _node$dataset.startAtEnd;
  var scrollerViewport = n$2(selectors$U.scrollViewport, node);
  window.addEventListener("load", function () {
    u$1(node, "scroll-container-initialized");

    if (startAtEnd === "true") {
      _startAtEnd();
    }
  }, {
    once: true
  });
  var events = [e$2(buttons, "click", function (e) {
    var button = e.currentTarget;
    var scrollAttribute = axis == "vertical" ? "scrollTop" : "scrollLeft";
    var scrollOffset = 100;

    if (button.dataset.position === "start") {
      if (scrollerViewport[scrollAttribute] < scrollOffset * 1.5) {
        scrollerViewport[scrollAttribute] = 0;
      } else {
        scrollerViewport[scrollAttribute] -= scrollOffset;
      }
    } else {
      scrollerViewport[scrollAttribute] += scrollOffset;
    }
  })];
  var ioOptions = {
    root: scrollerViewport
  };
  var intersectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var position = entry.target.dataset.position;
      var visible = entry.isIntersecting;
      node.setAttribute("data-at-".concat(position), visible ? "true" : "false");
    });
  }, ioOptions);
  sentinals.forEach(function (sentinal) {
    intersectionObserver.observe(sentinal);
  });

  var unload = function unload() {
    sentinals.forEach(function (sentinal) {
      intersectionObserver.unobserve(sentinal);
    });
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  function _startAtEnd() {
    var scrollAttribute = axis == "vertical" ? "scrollTop" : "scrollLeft";
    var scrollDirection = axis == "vertical" ? "scrollHeight" : "scrollWidth";
    scrollerViewport[scrollAttribute] = scrollerViewport[scrollDirection] * 2;
    node.dataset.startAtEnd = false;
  }

  return {
    unload: unload
  };
};

var n,e,i,o,t,r,f,d,p,u=[];function w(n,a){return e=window.pageXOffset,o=window.pageYOffset,r=window.innerHeight,d=window.innerWidth,void 0===i&&(i=e),void 0===t&&(t=o),void 0===p&&(p=d),void 0===f&&(f=r),(a||o!==t||e!==i||r!==f||d!==p)&&(!function(n){for(var w=0;w<u.length;w++)u[w]({x:e,y:o,px:i,py:t,vh:r,pvh:f,vw:d,pvw:p},n);}(n),i=e,t=o,f=r,p=d),requestAnimationFrame(w)}function srraf(e){return u.indexOf(e)<0&&u.push(e),n=n||w(performance.now()),{update:function(){return w(performance.now(),!0),this},destroy:function(){u.splice(u.indexOf(e),1);}}}

var atBreakpointChange = function atBreakpointChange(breakpointToWatch, callback) {
  var _screenUnderBP = function _screenUnderBP() {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    return viewportWidth <= breakpointToWatch;
  };

  var screenUnderBP = _screenUnderBP();

  var widthWatcher = srraf(function (_ref) {
    var vw = _ref.vw;
    var currentScreenWidthUnderBP = vw <= breakpointToWatch;

    if (currentScreenWidthUnderBP !== screenUnderBP) {
      screenUnderBP = currentScreenWidthUnderBP;
      return callback();
    }
  });

  var unload = function unload() {
    widthWatcher.destroy();
  };

  return {
    unload: unload
  };
};

var sel$3 = {
  container: ".social-share",
  button: ".social-share__button",
  popup: ".social-sharing__popup",
  copyURLButton: ".social-share__copy-url",
  successMessage: ".social-share__success-message"
};
var classes$q = {
  hidden: "hidden",
  linkCopied: "social-sharing__popup--success"
};
var SocialShare = (function (node) {
  if (!node) return Function();
  var button = n$2(sel$3.button, node);
  var popup = n$2(sel$3.popup, node);
  var copyURLButton = n$2(sel$3.copyURLButton, node);
  var successMessage = n$2(sel$3.successMessage, node);
  var clickListener = e$2(window, "click", handleClick); // Hide copy button on old browsers

  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    u$1(copyURLButton, classes$q.hidden);
  }

  function handleClick(evt) {
    var buttonClicked = evt.target.closest(sel$3.button) === button;
    var popupClicked = evt.target.closest(sel$3.popup) === popup;
    var copyURLClicked = evt.target.closest(sel$3.copyURLButton) === copyURLButton;
    var isActive = false;

    if (buttonClicked) {
      isActive = button.getAttribute("aria-expanded") === "true";
    } // click happend outside of this popup


    if (!popupClicked) {
      close();
    } // click happend in this social button and the button is not active


    if (buttonClicked && !isActive) {
      open();
    }

    if (copyURLClicked) {
      var url = copyURLButton.dataset.url;
      writeToClipboard(url).then(showSuccessMessage, showErrorMessage);
    }
  }

  function close() {
    button.setAttribute("aria-expanded", false);
    popup.setAttribute("aria-hidden", true);
  }

  function open() {
    button.setAttribute("aria-expanded", true);
    popup.setAttribute("aria-hidden", false);
  }

  function writeToClipboard(str) {
    return navigator.clipboard.writeText(str);
  }

  function showMessage(message) {
    successMessage.innerHTML = message;
    i$1(successMessage, classes$q.hidden);
    u$1(popup, classes$q.linkCopied);
    setTimeout(function () {
      u$1(successMessage, classes$q.hidden);
      i$1(popup, classes$q.linkCopied);
    }, 2000);
  }

  function showSuccessMessage() {
    var successMessage = copyURLButton.dataset.successMessage;
    showMessage(successMessage);
  }

  function showErrorMessage() {
    var errorMessage = copyURLButton.dataset.errorMessage;
    showMessage(errorMessage || "Error copying link.");
  }

  function destroy() {
    close();
    clickListener();
  }

  return destroy;
});

function localStorageAvailable() {
  var test = "test";

  try {
    localStorage.setItem(test, test);

    if (localStorage.getItem(test) !== test) {
      return false;
    }

    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

var PREFIX = "fluco_";

function getStorage(key) {
  if (!localStorageAvailable()) return null;
  return JSON.parse(localStorage.getItem(PREFIX + key));
}

function removeStorage(key) {
  if (!localStorageAvailable()) return null;
  localStorage.removeItem(PREFIX + key);
  return true;
}

function setStorage(key, val) {
  if (!localStorageAvailable()) return null;
  localStorage.setItem(PREFIX + key, val);
  return true;
}

var routes = window.theme.routes.cart || {};
var paths = {
  base: "".concat(routes.base || "/cart", ".js"),
  add: "".concat(routes.add || "/cart/add", ".js"),
  change: "".concat(routes.change || "/cart/change", ".js"),
  clear: "".concat(routes.clear || "/cart/clear", ".js"),
  update: "".concat(routes.update || "/cart/update", ".js")
};
var strings$6 = window.theme.strings.cart; // Add a `sorted` key that orders line items
// in the order the customer added them if possible

function sortCart(cart) {
  var order = getStorage("cart_order") || [];

  if (order.length) {
    cart.sorted = _toConsumableArray$1(cart.items).sort(function (a, b) {
      return order.indexOf(a.variant_id) - order.indexOf(b.variant_id);
    });
    return cart;
  }

  cart.sorted = cart.items;
  return cart;
}

function updateItem(key, quantity) {
  return get().then(function (_ref) {
    var items = _ref.items;

    for (var i = 0; i < items.length; i++) {
      if (items[i].key === key) {
        return changeItem(i + 1, key, quantity); // shopify cart is a 1-based index
      }
    }
  });
}

function changeItem(line, itemKey, quantity) {
  return fetch(paths.change, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      line: line,
      quantity: quantity
    })
  }).then(function (res) {
    return res.json();
  }).then(function (cart) {
    var item = cart.items.find(function (_ref2) {
      var key = _ref2.key;
      return key === itemKey;
    }); // Throw error only if the quantity returned is less by one
    // then the quantity change request. This is triggered when a
    // increase quantity button is pressed when insufficient quantity
    // exists.
    // item will not exist if it has been removed from the cart.

    if (item && item.quantity === quantity - 1) {
      var errorMessage = {
        code: 422,
        message: strings$6.quantityError
      };
      dispatchCustomEvent("cart:error", {
        errorMessage: strings$6.quantityError
      });
      r$1("quick-cart:error", null, {
        key: itemKey,
        errorMessage: strings$6.quantityError
      });
      r$1("cart:error", null, {
        key: itemKey,
        errorMessage: strings$6.quantityError
      });
      throw errorMessage;
    }

    r$1("cart:updated", {
      cart: cart
    });
    r$1("quick-cart:updated");
    return sortCart(cart);
  });
}

function addItemById(id, quantity) {
  r$1("cart:updating");
  var data = {
    items: [{
      id: id,
      quantity: quantity
    }]
  };
  return fetch(paths.add, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(function (r) {
    return r.json();
  }).then(function (res) {
    if (res.status == "422") {
      var errorMessage = {
        code: 422,
        message: res.description
      };
      dispatchCustomEvent("cart:error", {
        errorMessage: res.description
      });
      r$1("quick-cart:error", null, {
        id: id
      });
      r$1("cart:error", null, {
        id: id
      });
      throw errorMessage;
    }

    return get().then(function (cart) {
      r$1("quick-cart:updated");
      r$1("cart:updated", {
        cart: cart
      });
      return {
        res: res,
        cart: cart
      };
    });
  });
}

function get() {
  return fetch(paths.base, {
    method: "GET",
    credentials: "include"
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var sortedData = sortCart(data);
    return sortedData;
  });
}

function addItem(form) {
  r$1("cart:updating");
  return fetch(paths.add, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: serialize(form)
  }).then(function (r) {
    return r.json();
  }).then(function (res) {
    if (res.status == "422") {
      var errorMessage = {
        code: 422,
        message: res.description
      };
      dispatchCustomEvent("cart:error", {
        errorMessage: res.description
      });
      throw errorMessage;
    }

    return get().then(function (cart) {
      var order = getStorage("cart_order") || [];
      var newOrder = [res.variant_id].concat(_toConsumableArray$1(order.filter(function (i) {
        return i !== res.variant_id;
      })));
      setStorage("cart_order", JSON.stringify(newOrder));
      r$1("cart:updated", {
        cart: sortCart(cart)
      });
      r$1("quick-cart:updated");
      r$1("quick-view:close");
      dispatchCustomEvent("cart:updated", {
        cart: sortCart(cart)
      });
      return {
        item: res,
        cart: sortCart(cart)
      };
    });
  });
} // !
//  Serialize all form data into a SearchParams string
//  (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
//  @param  {Node}   form The form to serialize
//  @return {String}      The serialized form data
//


function serialize(form) {
  var arr = [];
  Array.prototype.slice.call(form.elements).forEach(function (field) {
    if (!field.name || field.disabled || ["file", "reset", "submit", "button"].indexOf(field.type) > -1) {
      return;
    }

    if (field.type === "select-multiple") {
      Array.prototype.slice.call(field.options).forEach(function (option) {
        if (!option.selected) return;
        arr.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(option.value));
      });
      return;
    }

    if (["checkbox", "radio"].indexOf(field.type) > -1 && !field.checked) {
      return;
    }

    arr.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
  });
  return arr.join("&");
}

var cart = {
  addItem: addItem,
  get: get,
  updateItem: updateItem,
  addItemById: addItemById
};

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

const moneyFormat = '${{amount}}';

/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */
function formatMoney$1(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  let value = '';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || moneyFormat;

  function formatWithDelimiters(
    number,
    precision = 2,
    thousands = ',',
    decimal = '.'
  ) {
    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    const parts = number.split('.');
    const dollarsAmount = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      `$1${thousands}`
    );
    const centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
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
}

var formatMoney = (function (val) {
  return formatMoney$1(val, window.theme.moneyFormat || "${{amount}}");
});

// Fetch the product data from the .js endpoint because it includes
// more data than the .json endpoint.
var getProduct = (function (handle) {
  return function (cb) {
    return fetch("".concat(window.theme.routes.products, "/").concat(handle, ".js")).then(function (res) {
      return res.json();
    }).then(function (data) {
      return cb(data);
    }).catch(function (err) {
      return console.log(err.message);
    });
  };
});

/*!
 * slide-anim
 * https://github.com/yomotsu/slide-anim
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
var global = window;
var isPromiseSuppoted = typeof global.Promise === 'function';
var PromiseLike = isPromiseSuppoted ? global.Promise : (function () {
    function PromiseLike(executor) {
        var callback = function () { };
        var resolve = function () {
            callback();
        };
        executor(resolve);
        return {
            then: function (_callback) {
                callback = _callback;
            }
        };
    }
    return PromiseLike;
}());

var pool = [];
var inAnimItems = {
    add: function (el, defaultStyle, timeoutId, onCancelled) {
        var inAnimItem = { el: el, defaultStyle: defaultStyle, timeoutId: timeoutId, onCancelled: onCancelled };
        this.remove(el);
        pool.push(inAnimItem);
    },
    remove: function (el) {
        var index = inAnimItems.findIndex(el);
        if (index === -1)
            return;
        var inAnimItem = pool[index];
        clearTimeout(inAnimItem.timeoutId);
        inAnimItem.onCancelled();
        pool.splice(index, 1);
    },
    find: function (el) {
        return pool[inAnimItems.findIndex(el)];
    },
    findIndex: function (el) {
        var index = -1;
        pool.some(function (item, i) {
            if (item.el === el) {
                index = i;
                return true;
            }
            return false;
        });
        return index;
    }
};

var CSS_EASEOUT_EXPO = 'cubic-bezier( 0.19, 1, 0.22, 1 )';
function slideDown(el, options) {
    if (options === void 0) { options = {}; }
    return new PromiseLike(function (resolve) {
        if (inAnimItems.findIndex(el) !== -1)
            return;
        var _isVisible = isVisible(el);
        var hasEndHeight = typeof options.endHeight === 'number';
        var display = options.display || 'block';
        var duration = options.duration || 400;
        var onCancelled = options.onCancelled || function () { };
        var defaultStyle = el.getAttribute('style') || '';
        var style = window.getComputedStyle(el);
        var defaultStyles = getDefaultStyles(el, display);
        var isBorderBox = /border-box/.test(style.getPropertyValue('box-sizing'));
        var contentHeight = defaultStyles.height;
        var minHeight = defaultStyles.minHeight;
        var paddingTop = defaultStyles.paddingTop;
        var paddingBottom = defaultStyles.paddingBottom;
        var borderTop = defaultStyles.borderTop;
        var borderBottom = defaultStyles.borderBottom;
        var cssDuration = duration + "ms";
        var cssEasing = CSS_EASEOUT_EXPO;
        var cssTransition = [
            "height " + cssDuration + " " + cssEasing,
            "min-height " + cssDuration + " " + cssEasing,
            "padding " + cssDuration + " " + cssEasing,
            "border-width " + cssDuration + " " + cssEasing
        ].join();
        var startHeight = _isVisible ? style.height : '0px';
        var startMinHeight = _isVisible ? style.minHeight : '0px';
        var startPaddingTop = _isVisible ? style.paddingTop : '0px';
        var startPaddingBottom = _isVisible ? style.paddingBottom : '0px';
        var startBorderTopWidth = _isVisible ? style.borderTopWidth : '0px';
        var startBorderBottomWidth = _isVisible ? style.borderBottomWidth : '0px';
        var endHeight = (function () {
            if (hasEndHeight)
                return options.endHeight + "px";
            return !isBorderBox ?
                contentHeight - paddingTop - paddingBottom + "px" :
                contentHeight + borderTop + borderBottom + "px";
        })();
        var endMinHeight = minHeight + "px";
        var endPaddingTop = paddingTop + "px";
        var endPaddingBottom = paddingBottom + "px";
        var endBorderTopWidth = borderTop + "px";
        var endBorderBottomWidth = borderBottom + "px";
        if (startHeight === endHeight &&
            startPaddingTop === endPaddingTop &&
            startPaddingBottom === endPaddingBottom &&
            startBorderTopWidth === endBorderTopWidth &&
            startBorderBottomWidth === endBorderBottomWidth) {
            resolve();
            return;
        }
        requestAnimationFrame(function () {
            el.style.height = startHeight;
            el.style.minHeight = startMinHeight;
            el.style.paddingTop = startPaddingTop;
            el.style.paddingBottom = startPaddingBottom;
            el.style.borderTopWidth = startBorderTopWidth;
            el.style.borderBottomWidth = startBorderBottomWidth;
            el.style.display = display;
            el.style.overflow = 'hidden';
            el.style.visibility = 'visible';
            el.style.transition = cssTransition;
            el.style.webkitTransition = cssTransition;
            requestAnimationFrame(function () {
                el.style.height = endHeight;
                el.style.minHeight = endMinHeight;
                el.style.paddingTop = endPaddingTop;
                el.style.paddingBottom = endPaddingBottom;
                el.style.borderTopWidth = endBorderTopWidth;
                el.style.borderBottomWidth = endBorderBottomWidth;
            });
        });
        var timeoutId = setTimeout(function () {
            resetStyle(el);
            el.style.display = display;
            if (hasEndHeight) {
                el.style.height = options.endHeight + "px";
                el.style.overflow = "hidden";
            }
            inAnimItems.remove(el);
            resolve();
        }, duration);
        inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
    });
}
function slideUp(el, options) {
    if (options === void 0) { options = {}; }
    return new PromiseLike(function (resolve) {
        if (inAnimItems.findIndex(el) !== -1)
            return;
        var _isVisible = isVisible(el);
        var display = options.display || 'block';
        var duration = options.duration || 400;
        var onCancelled = options.onCancelled || function () { };
        if (!_isVisible) {
            resolve();
            return;
        }
        var defaultStyle = el.getAttribute('style') || '';
        var style = window.getComputedStyle(el);
        var isBorderBox = /border-box/.test(style.getPropertyValue('box-sizing'));
        var minHeight = pxToNumber(style.getPropertyValue('min-height'));
        var paddingTop = pxToNumber(style.getPropertyValue('padding-top'));
        var paddingBottom = pxToNumber(style.getPropertyValue('padding-bottom'));
        var borderTop = pxToNumber(style.getPropertyValue('border-top-width'));
        var borderBottom = pxToNumber(style.getPropertyValue('border-bottom-width'));
        var contentHeight = el.scrollHeight;
        var cssDuration = duration + 'ms';
        var cssEasing = CSS_EASEOUT_EXPO;
        var cssTransition = [
            "height " + cssDuration + " " + cssEasing,
            "padding " + cssDuration + " " + cssEasing,
            "border-width " + cssDuration + " " + cssEasing
        ].join();
        var startHeight = !isBorderBox ?
            contentHeight - paddingTop - paddingBottom + "px" :
            contentHeight + borderTop + borderBottom + "px";
        var startMinHeight = minHeight + "px";
        var startPaddingTop = paddingTop + "px";
        var startPaddingBottom = paddingBottom + "px";
        var startBorderTopWidth = borderTop + "px";
        var startBorderBottomWidth = borderBottom + "px";
        requestAnimationFrame(function () {
            el.style.height = startHeight;
            el.style.minHeight = startMinHeight;
            el.style.paddingTop = startPaddingTop;
            el.style.paddingBottom = startPaddingBottom;
            el.style.borderTopWidth = startBorderTopWidth;
            el.style.borderBottomWidth = startBorderBottomWidth;
            el.style.display = display;
            el.style.overflow = 'hidden';
            el.style.transition = cssTransition;
            el.style.webkitTransition = cssTransition;
            requestAnimationFrame(function () {
                el.style.height = '0';
                el.style.minHeight = '0';
                el.style.paddingTop = '0';
                el.style.paddingBottom = '0';
                el.style.borderTopWidth = '0';
                el.style.borderBottomWidth = '0';
            });
        });
        var timeoutId = setTimeout(function () {
            resetStyle(el);
            el.style.display = 'none';
            inAnimItems.remove(el);
            resolve();
        }, duration);
        inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
    });
}
function slideStop(el) {
    var elementObject = inAnimItems.find(el);
    if (!elementObject)
        return;
    var style = window.getComputedStyle(el);
    var height = style.height;
    var paddingTop = style.paddingTop;
    var paddingBottom = style.paddingBottom;
    var borderTopWidth = style.borderTopWidth;
    var borderBottomWidth = style.borderBottomWidth;
    resetStyle(el);
    el.style.height = height;
    el.style.paddingTop = paddingTop;
    el.style.paddingBottom = paddingBottom;
    el.style.borderTopWidth = borderTopWidth;
    el.style.borderBottomWidth = borderBottomWidth;
    el.style.overflow = 'hidden';
    inAnimItems.remove(el);
}
function isVisible(el) {
    return el.offsetHeight !== 0;
}
function resetStyle(el) {
    el.style.visibility = '';
    el.style.height = '';
    el.style.minHeight = '';
    el.style.paddingTop = '';
    el.style.paddingBottom = '';
    el.style.borderTopWidth = '';
    el.style.borderBottomWidth = '';
    el.style.overflow = '';
    el.style.transition = '';
    el.style.webkitTransition = '';
}
function getDefaultStyles(el, defaultDisplay) {
    if (defaultDisplay === void 0) { defaultDisplay = 'block'; }
    var defaultStyle = el.getAttribute('style') || '';
    var style = window.getComputedStyle(el);
    el.style.visibility = 'hidden';
    el.style.display = defaultDisplay;
    var width = pxToNumber(style.getPropertyValue('width'));
    el.style.position = 'absolute';
    el.style.width = width + "px";
    el.style.height = '';
    el.style.minHeight = '';
    el.style.paddingTop = '';
    el.style.paddingBottom = '';
    el.style.borderTopWidth = '';
    el.style.borderBottomWidth = '';
    var minHeight = pxToNumber(style.getPropertyValue('min-height'));
    var paddingTop = pxToNumber(style.getPropertyValue('padding-top'));
    var paddingBottom = pxToNumber(style.getPropertyValue('padding-bottom'));
    var borderTop = pxToNumber(style.getPropertyValue('border-top-width'));
    var borderBottom = pxToNumber(style.getPropertyValue('border-bottom-width'));
    var height = el.scrollHeight;
    el.setAttribute('style', defaultStyle);
    return {
        height: height,
        minHeight: minHeight,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        borderTop: borderTop,
        borderBottom: borderBottom
    };
}
function pxToNumber(px) {
    return +px.replace(/px/, '');
}

function accordion(node, options) {
  var labels = t$2(".accordion__label", node);
  var content = t$2(".accordion__content", node); // Make it accessible by keyboard

  labels.forEach(function (label) {
    label.href = "#";
  });
  content.forEach(function (t) {
    return u$1(t, "measure");
  });
  var labelClick = e$2(labels, "click", function (e) {
    e.preventDefault();
    var label = e.currentTarget;
    var group = label.parentNode,
        content = label.nextElementSibling;
    slideStop(content);

    if (isVisible(content)) {
      _close(label, group, content);
    } else {
      _open(label, group, content);
    }
  });

  function _open(label, group, content) {
    slideDown(content);
    group.setAttribute("data-open", true);
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
  }

  function _close(label, group, content) {
    slideUp(content);
    group.setAttribute("data-open", false);
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  }

  if (options.firstOpen) {
    // Open first accordion label
    var _labels$ = labels[0],
        group = _labels$.parentNode,
        _content = _labels$.nextElementSibling;

    _open(labels[0], group, _content);
  }

  function destroy() {
    return function () {
      return labelClick();
    };
  }

  return {
    destroy: destroy
  };
}

function Accordions(elements) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (Array.isArray(elements) && !elements.length) return;
  var defaultOptions = {
    firstOpen: true
  };
  var opts = Object.assign(defaultOptions, options);
  var accordions = [];

  if (elements.length) {
    accordions = elements.map(function (node) {
      return accordion(node, opts);
    });
  } else {
    accordions.push(accordion(elements, opts));
  }

  function unload() {
    accordions.forEach(function (accordion) {
      return accordion.destroy();
    });
  }

  return {
    unload: unload
  };
}

function Media(node) {
  if (!node) return;
  var _window = window,
      Shopify = _window.Shopify,
      YT = _window.YT;
  var elements = t$2("[data-interactive]", node);
  if (!elements.length) return;
  var acceptedTypes = ["video", "model", "external_video"];
  var activeMedia = null;
  var featuresLoaded = false;
  var instances = {};

  if (featuresLoaded) {
    elements.forEach(initElement);
  }

  window.Shopify.loadFeatures([{
    name: "model-viewer-ui",
    version: "1.0"
  }, {
    name: "shopify-xr",
    version: "1.0"
  }, {
    name: "video-ui",
    version: "1.0"
  }], function () {
    featuresLoaded = true;

    if ("YT" in window && Boolean(YT.loaded)) {
      elements.forEach(initElement);
    } else {
      window.onYouTubeIframeAPIReady = function () {
        elements.forEach(initElement);
      };
    }
  });

  function initElement(el) {
    var _el$dataset = el.dataset,
        mediaId = _el$dataset.mediaId,
        mediaType = _el$dataset.mediaType;
    if (!mediaType || !acceptedTypes.includes(mediaType)) return;
    if (Object.keys(instances).includes(mediaId)) return;
    var instance = {
      id: mediaId,
      type: mediaType,
      container: el,
      media: el.children[0]
    };

    switch (instance.type) {
      case "video":
        instance.player = new Shopify.Plyr(instance.media, {
          loop: {
            active: el.dataset.loop == "true"
          }
        });
        break;

      case "external_video":
        {
          instance.player = new YT.Player(instance.media); // This overlay makes it possible to swipe video embeds in carousels

          var overlay = n$2(".external-video-overlay", el);

          if (overlay) {
            e$2(overlay, "click", function (e) {
              var _instance$player;

              e.preventDefault(); // in some situations the iframe-js-api can't communicate and this is undef,
              // in this case lets faily quietly and remove the overlay (it won't come back)

              if ((_instance$player = instance.player) !== null && _instance$player !== void 0 && _instance$player.playVideo) {
                instance.player.playVideo();
              }

              u$1(overlay, "hidden");
            });
            instance.player.addEventListener("onStateChange", function (event) {
              if (event.data === 2) {
                i$1(overlay, "hidden");
              }
            });
          }

          break;
        }

      case "model":
        instance.viewer = new Shopify.ModelViewerUI(n$2("model-viewer", el));
        e$2(n$2(".model-poster", el), "click", function (e) {
          e.preventDefault();
          playModel(instance);
        });
        break;
    }

    instances[mediaId] = instance;

    if (instance.player) {
      if (instance.type === "video") {
        instance.player.on("playing", function () {
          pauseActiveMedia(instance);
          activeMedia = instance;
        });
      } else if (instance.type === "external_video") {
        instance.player.addEventListener("onStateChange", function (event) {
          if (event.data === 1) {
            pauseActiveMedia(instance);
            activeMedia = instance;
          }
        });
      }
    }
  }

  function playModel(instance) {
    pauseActiveMedia(instance);
    instance.viewer.play();
    u$1(instance.container, "model-active");
    activeMedia = instance;
    setTimeout(function () {
      n$2("model-viewer", instance.container).focus();
    }, 300);
  }

  function pauseActiveMedia(instance) {
    if (!activeMedia || instance == activeMedia) return;

    if (activeMedia.player) {
      if (activeMedia.type === "video") {
        activeMedia.player.pause();
      } else if (activeMedia.type === "external_video") {
        activeMedia.player.pauseVideo();
      }

      activeMedia = null;
      return;
    }

    if (activeMedia.viewer) {
      i$1(activeMedia.container, "model-active");
      activeMedia.viewer.pause();
      activeMedia = null;
    }
  }

  return {
    pauseActiveMedia: pauseActiveMedia
  };
}

var selectors$T = {
  idInput: '[name="id"]',
  optionInput: '[name^="options"]',
  quantityInput: "[data-quantity-input]",
  formQuantity: '[name="quantity"]',
  propertyInput: '[name^="properties"]'
};
function ProductForm(container, form, prod) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var product = validateProductObject(prod);
  var listeners = [];

  var getOptions = function getOptions() {
    return _serializeOptionValues(optionInputs, function (item) {
      var regex = /(?:^(options\[))(.*?)(?:\])/;
      item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'

      return item;
    });
  };

  var getVariant = function getVariant() {
    return getVariantFromSerializedArray(product, getOptions());
  };

  var getProperties = function getProperties() {
    var properties = _serializePropertyValues(propertyInputs, function (propertyName) {
      var regex = /(?:^(properties\[))(.*?)(?:\])/;
      var name = regex.exec(propertyName)[2]; // Use just the value between 'properties[' and ']'

      return name;
    });

    return Object.entries(properties).length === 0 ? null : properties;
  };

  var getQuantity = function getQuantity() {
    return formQuantityInput[0] ? Number.parseInt(formQuantityInput[0].value, 10) : 1;
  };

  var getProductFormEventData = function getProductFormEventData() {
    return {
      options: getOptions(),
      variant: getVariant(),
      properties: getProperties(),
      quantity: getQuantity()
    };
  };

  var onFormEvent = function onFormEvent(cb) {
    if (typeof cb === "undefined") return;
    return function (event) {
      event.dataset = getProductFormEventData();
      cb(event);
    };
  };

  var setIdInputValue = function setIdInputValue(value) {
    var idInputElement = form.querySelector(selectors$T.idInput);

    if (!idInputElement) {
      idInputElement = document.createElement("input");
      idInputElement.type = "hidden";
      idInputElement.name = "id";
      form.appendChild(idInputElement);
    }

    idInputElement.value = value.toString();
  };

  var onSubmit = function onSubmit(event) {
    event.dataset = getProductFormEventData();
    setIdInputValue(event.dataset.variant.id);

    if (config.onFormSubmit) {
      config.onFormSubmit(event);
    }
  };

  var initInputs = function initInputs(selector, cb) {
    var elements = _toConsumableArray$1(container.querySelectorAll(selector));

    return elements.map(function (element) {
      listeners.push(e$2(element, "change", onFormEvent(cb)));
      return element;
    });
  };

  listeners.push(e$2(form, "submit", onSubmit));
  var optionInputs = initInputs(selectors$T.optionInput, config.onOptionChange);
  var formQuantityInput = initInputs(selectors$T.quantityInput, config.onQuantityChange);
  var propertyInputs = initInputs(selectors$T.propertyInput, config.onPropertyChange);

  var destroy = function destroy() {
    listeners.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    getVariant: getVariant,
    destroy: destroy
  };
}

function validateProductObject(product) {
  if (_typeof(product) !== "object") {
    throw new TypeError(product + " is not an object.");
  }

  if (typeof product.variants[0].options === "undefined") {
    throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route");
  }

  return product;
}

function _serializeOptionValues(inputs, transform) {
  return inputs.reduce(function (options, input) {
    if (input.checked || // If input is a checked (means type radio or checkbox)
    input.type !== "radio" && input.type !== "checkbox" // Or if its any other type of input
    ) {
      options.push(transform({
        name: input.name,
        value: input.value
      }));
    }

    return options;
  }, []);
}

function _serializePropertyValues(inputs, transform) {
  return inputs.reduce(function (properties, input) {
    if (input.checked || // If input is a checked (means type radio or checkbox)
    input.type !== "radio" && input.type !== "checkbox" // Or if its any other type of input
    ) {
      properties[transform(input.name)] = input.value;
    }

    return properties;
  }, {});
}

var preventDefault = (function (fn) {
  return function (e) {
    e.preventDefault();
    fn();
  };
});

var selectors$S = {
  imageById: function imageById(id) {
    return "[data-media-item-id='".concat(id, "']");
  },
  imageWrapper: "[data-product-media-wrapper]",
  inYourSpace: "[data-in-your-space]"
};
var classes$p = {
  hidden: "hidden"
};
function switchImage (container, imageId, inYourSpaceButton) {
  var newImage = n$2(selectors$S.imageWrapper + selectors$S.imageById(imageId), container);
  var otherImages = t$2("".concat(selectors$S.imageWrapper, ":not(").concat(selectors$S.imageById(imageId), ")"), container);
  i$1(newImage, classes$p.hidden); // Update view in space button

  if (inYourSpaceButton) {
    if (newImage.dataset.mediaType === "model") {
      inYourSpaceButton.setAttribute("data-shopify-model3d-id", newImage.dataset.mediaItemId);
    }
  }

  otherImages.forEach(function (image) {
    return u$1(image, classes$p.hidden);
  });
}

// This loads the polyfill chunk if necessary
function provideResizeObserver() {
  if (window.ResizeObserver) {
    return Promise.resolve({
      ResizeObserver: ResizeObserver
    });
  }

  return import(flu.chunks.polyfillResizeObserver);
}

function quantityInput (container) {
  var quantityWrapper = n$2(".quantity-input", container);
  if (!quantityWrapper) return;
  var quantityInput = n$2("[data-quantity-input]", quantityWrapper);
  var addQuantity = n$2("[data-add-quantity]", quantityWrapper);
  var subtractQuantity = n$2("[data-subtract-quantity]", quantityWrapper);

  var handleAddQuantity = function handleAddQuantity() {
    var currentValue = parseInt(quantityInput.value);
    var newValue = currentValue + 1;
    quantityInput.value = newValue;
    quantityInput.dispatchEvent(new Event("change"));
  };

  var handleSubtractQuantity = function handleSubtractQuantity() {
    var currentValue = parseInt(quantityInput.value);
    if (currentValue === 1) return;
    var newValue = currentValue - 1;
    quantityInput.value = newValue;
    quantityInput.dispatchEvent(new Event("change"));
  };

  var events = [e$2(addQuantity, "click", handleAddQuantity), e$2(subtractQuantity, "click", handleSubtractQuantity)];

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    unload: unload
  };
}

var selectors$R = {
  popupTrigger: "[data-popup-trigger]"
};

var informationPopup = function informationPopup(node) {
  var events = [];
  var popupTriggers = t$2(selectors$R.popupTrigger, node);

  if (!popupTriggers.length) {
    return;
  }

  var listener = e$2(popupTriggers, "click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var modalContentId = e.target.dataset.modalContentId;
    var content = n$2("#".concat(modalContentId), node);
    r$1("modal:open", null, {
      modalContent: content
    });
  });
  events.push(listener);

  function unload() {
    events.forEach(function (evt) {
      return evt();
    });
  }

  return {
    unload: unload
  };
};

var selectors$Q = {
  moreButton: "[data-more-media]",
  moreBar: "[data-more-media-bar]",
  productMedia: "[data-product-media]"
};
var states = {
  closed: "closed",
  beforeOpen: "beforeOpen",
  opening: "opening",
  open: "open"
};

var moreMedia = function moreMedia(node) {
  var moreButton = n$2(selectors$Q.moreButton, node);

  if (!moreButton) {
    return;
  }

  var moreBar = n$2(selectors$Q.moreBar, node);
  var productMedia = n$2(selectors$Q.productMedia, node);
  var initialAR = parseFloat(window.getComputedStyle(productMedia).aspectRatio);
  var isOpen = false;

  var updateText = function updateText(open) {
    moreButton.innerHTML = moreButton.dataset[open ? "langLessMedia" : "langMoreMedia"];
  };

  var close = function close() {
    if (!isOpen) return;

    if (!isFinite(initialAR)) {
      // If AR is NaN it's either 'auto' or unsupported by the browser,
      // in which case we can't transition it. Instead, jump directly to
      // the final state.
      productMedia.dataset.productMedia = states.closed;
      isOpen = false;
      updateText(false);
      return;
    }

    productMedia.dataset.productMedia = states.opening;
    window.requestAnimationFrame(function () {
      var transitionEnd = e$2(productMedia, "transitionend", function () {
        transitionEnd();
        productMedia.dataset.productMedia = states.closed;
        isOpen = false;
      });
      productMedia.dataset.productMedia = states.beforeOpen;
      updateText(false);
    });
  };

  var open = function open() {
    if (isOpen) return;

    if (!isFinite(initialAR)) {
      // If AR is NaN it's either 'auto' or unsupported by the browser,
      // in which case we can't transition it. Instead, jump directly to
      // the final state.
      productMedia.dataset.productMedia = states.open;
      isOpen = true;
      updateText(true);
      return;
    }

    productMedia.dataset.productMedia = states.beforeOpen;
    window.requestAnimationFrame(function () {
      var _productMedia$getBoun = productMedia.getBoundingClientRect(),
          width = _productMedia$getBoun.width;

      var scrollHeight = productMedia.scrollHeight;
      var gridGap = parseInt(window.getComputedStyle(productMedia).rowGap, 10);
      var barBottom = parseInt(window.getComputedStyle(moreBar).bottom, 10);
      var openAspectRatio = width / (scrollHeight - gridGap - barBottom);
      productMedia.style.setProperty("--overflow-gallery-aspect-ratio-open", openAspectRatio);
      var transitionEnd = e$2(productMedia, "transitionend", function (e) {
        if (e.target !== productMedia) {
          // Ignore any bubbled up event from image load transitions, etc.
          return;
        }

        transitionEnd();
        productMedia.dataset.productMedia = states.open;
        isOpen = true;
      });
      productMedia.dataset.productMedia = states.opening;
      updateText(true);
    });
  };

  var clickListener = e$2(moreButton, "click", function () {
    isOpen ? close() : open();
  });
  var resizeListener = e$2(window, "resize", function () {
    return close();
  });
  var events = [clickListener, resizeListener];

  var unload = function unload() {
    events.forEach(function (evt) {
      return evt();
    });
  };

  return {
    unload: unload
  };
};

var strings$5 = window.theme.strings.products;
var selectors$P = {
  price: "[data-price]",
  comparePrice: "[data-compare-price]"
};
function updatePrices (container, variant) {
  var price = t$2(selectors$P.price, container);
  var comparePrice = t$2(selectors$P.comparePrice, container);
  var unavailableString = strings$5.product.unavailable;

  if (!variant) {
    price.forEach(function (el) {
      return el.innerHTML = unavailableString;
    });
    comparePrice.forEach(function (el) {
      return el.innerHTML = "";
    });
    return;
  }

  price.forEach(function (el) {
    return el.innerHTML = formatMoney(variant.price);
  });
  comparePrice.forEach(function (el) {
    return el.innerHTML = variant.compare_at_price > variant.price ? formatMoney(variant.compare_at_price) : "";
  });
}

var selectors$O = {
  productSku: "[data-product-sku]",
  productSkuContainer: ".product__vendor_and_sku"
};
var strings$4 = window.theme.strings.products;
function updateSku (container, variant) {
  var skuElement = n$2(selectors$O.productSku, container);
  var skuContainer = n$2(selectors$O.productSkuContainer, container);
  if (!skuElement) return;
  var sku = strings$4.product.sku;

  var skuString = function skuString(value) {
    return "".concat(sku, ": ").concat(value);
  };

  if (!variant || !variant.sku) {
    skuElement.innerText = "";
    skuContainer.setAttribute("data-showing-sku", false);
    return;
  }

  skuElement.innerText = skuString(variant.sku);
  skuContainer.setAttribute("data-showing-sku", true);
}

function updateBuyButton (btn, variant) {
  var text = n$2("[data-add-to-cart-text]", btn);
  var _btn$dataset = btn.dataset,
      langAvailable = _btn$dataset.langAvailable,
      langUnavailable = _btn$dataset.langUnavailable,
      langSoldOut = _btn$dataset.langSoldOut;

  if (!variant) {
    btn.setAttribute("disabled", "disabled");
    text.textContent = langUnavailable;
  } else if (variant.available) {
    btn.removeAttribute("disabled");
    text.textContent = langAvailable;
  } else {
    btn.setAttribute("disabled", "disabled");
    text.textContent = langSoldOut;
  }
}

var selectors$N = {
  accordionShell: ".accordion.product-reviews",
  accordionContent: ".accordion__content"
};
var classes$o = {
  hidden: "hidden",
  accordion: "accordion"
};
function reviewsHandler (node, container) {
  if (!node) return;
  var parentAppBlockContainer = node.parentNode;
  var accordion = n$2(selectors$N.accordionShell, container);
  var accordionContent = n$2(selectors$N.accordionContent, accordion); // Move the contents of the reviews app into the accordion shell
  // Then move the contents with the accrdion back into the original
  // location.

  accordionContent.appendChild(node);
  parentAppBlockContainer.appendChild(accordion);
  u$1(parentAppBlockContainer, classes$o.accordion);
  i$1(accordion, classes$o.hidden);
}

function OptionButtons(els) {
  var groups = els.map(createOptionGroup);

  function destroy() {
    groups && groups.forEach(function (group) {
      return group();
    });
  }

  return {
    groups: groups,
    destroy: destroy
  };
}

function createOptionGroup(el) {
  var select = n$2("select", el);
  var buttons = t$2("[data-button]", el);
  var buttonClick = e$2(buttons, "click", function (e) {
    e.preventDefault();
    var buttonEl = e.currentTarget;
    var optionHandle = buttonEl.dataset.optionHandle;
    buttons.forEach(function (btn) {
      l(btn, "selected", btn.dataset.optionHandle === optionHandle);
    });
    var opt = n$2("[data-value-handle=\"".concat(optionHandle, "\"]"), select);
    opt.selected = true;
    select.dispatchEvent(new Event("change"));
  });
  return function () {
    return buttonClick();
  };
}

var selectors$M = {
  counterContainer: "[data-inventory-counter]",
  inventoryMessage: ".inventory-counter__message",
  countdownBar: ".inventory-counter__bar",
  progressBar: ".inventory-counter__bar-progress"
};
var classes$n = {
  hidden: "hidden",
  inventoryLow: "inventory--low",
  inventoryEmpty: "inventory--empty",
  inventoryUnavailable: "inventory--unavailable"
};

var inventoryCounter = function inventoryCounter(container, config) {
  var variantsInventories = config.variantsInventories;
  var counterContainer = n$2(selectors$M.counterContainer, container);
  var inventoryMessageElement = n$2(selectors$M.inventoryMessage, container);
  var progressBar = n$2(selectors$M.progressBar, container);
  var _counterContainer$dat = counterContainer.dataset,
      lowInventoryThreshold = _counterContainer$dat.lowInventoryThreshold,
      stockCountdownMax = _counterContainer$dat.stockCountdownMax,
      unavailableText = _counterContainer$dat.unavailableText; // If the threshold or countdownmax contains anything but numbers abort

  if (!lowInventoryThreshold.match(/^[0-9]+$/) || !stockCountdownMax.match(/^[0-9]+$/)) {
    return;
  }

  var threshold = parseInt(lowInventoryThreshold, 10);
  var countDownMax = parseInt(stockCountdownMax, 10);
  l(counterContainer, classes$n.hidden, !productIventoryValid(variantsInventories[config.id]));
  checkThreshold(variantsInventories[config.id]);
  setProgressBar(variantsInventories[config.id].inventory_quantity);
  setInventoryMessage(variantsInventories[config.id].inventory_message);

  function checkThreshold(_ref) {
    var inventory_policy = _ref.inventory_policy,
        inventory_quantity = _ref.inventory_quantity,
        inventory_management = _ref.inventory_management;
    i$1(counterContainer, classes$n.inventoryLow);

    if (inventory_management !== null) {
      if (inventory_quantity <= 0 && inventory_policy === "deny") {
        u$1(counterContainer, classes$n.inventoryEmpty);
        counterContainer.setAttribute("data-stock-category", "empty");
      } else if (inventory_quantity <= threshold || inventory_quantity <= 0 && inventory_policy === "continue") {
        counterContainer.setAttribute("data-stock-category", "low");
      } else {
        counterContainer.setAttribute("data-stock-category", "sufficient");
      }
    }
  }

  function setProgressBar(inventoryQuantity) {
    if (inventoryQuantity <= 0) {
      progressBar.style.width = "".concat(0, "%");
      return;
    }

    var progressValue = inventoryQuantity < countDownMax ? inventoryQuantity / countDownMax * 100 : 100;
    progressBar.style.width = "".concat(progressValue, "%");
  }

  function setInventoryMessage(message) {
    inventoryMessageElement.innerText = message;
  }

  function productIventoryValid(product) {
    return product.inventory_message && product.inventory_management !== null;
  }

  var update = function update(variant) {
    if (!variant) {
      setUnavailable();
      return;
    }

    l(counterContainer, classes$n.hidden, !productIventoryValid(variantsInventories[variant.id]));
    checkThreshold(variantsInventories[variant.id]);
    setProgressBar(variantsInventories[variant.id].inventory_quantity);
    setInventoryMessage(variantsInventories[variant.id].inventory_message);
  };

  function setUnavailable() {
    i$1(counterContainer, classes$n.hidden);
    u$1(counterContainer, classes$n.inventoryUnavailable);
    counterContainer.setAttribute("data-stock-category", "unavailable");
    setProgressBar(0);
    setInventoryMessage(unavailableText);
  }

  return {
    update: update
  };
};

// LERP returns a number between start and end based on the amt
// Often used to smooth animations
// Eg. Given: start = 0, end = 100
// - if amt = 0.1 then lerp will return 10
// - if amt = 0.5 then lerp will return 50
// - if amt = 0.9 then lerp will return 90
var lerp = function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
};

var selectors$L = {
  productMeta: ".product__meta"
};
var classes$m = {
  hasSticky: "product--has-sticky-scroll"
};
function stickyScroll (node) {
  var productMeta = n$2(selectors$L.productMeta, node);
  node.style.setProperty("--product-meta-top", 0); // Init position vars
  // The previous scroll position of the page

  var previousScrollY = window.scrollY; // To keep track of the amount scrolled per event

  var currentScrollAmount = 0; // Height of the header bar, used for calculating position
  // Set in `_observeHeight()` when the --header-desktop-sticky-height var is set

  var headerHeight = 0; // The value to set the product meta `top` value to

  var metaTop = headerHeight;
  var metaTopPrevious = metaTop; // The height of the product meta container
  // Gets updated by a resize observer on the window and the meta container

  var metaHeight = productMeta.offsetHeight; // The height of the product meta container plus the height of the header

  var metaHeightWithHeader = metaHeight + headerHeight; // The max amount to set the meta `top` value
  // This is equal to the number of pixels
  // that the meta container is hidden by the viewport.
  // Gets updated by a resize observer on the window and the meta container

  var metaMaxTop = metaHeightWithHeader - window.innerHeight; // Whatch scroll updates

  var scroller = srraf(function (_ref) {
    var y = _ref.y;

    _scrollHandler(y);
  });
  provideResizeObserver().then(function (_ref2) {
    var ResizeObserver = _ref2.ResizeObserver;
    // Resize observer on the window and the product meta
    // Things like accordions can change the height of the meta container
    var resizeObserver = new ResizeObserver(_observeHeight);
    resizeObserver.observe(productMeta);
    resizeObserver.observe(document.documentElement);
  }); // Start the animation loop

  requestAnimationFrame(function () {
    return _updateMetaTopLoop();
  });

  function _observeHeight() {
    metaHeight = productMeta.offsetHeight;
    headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-desktop-sticky-height").replace(/px/gi, ""));
    metaHeightWithHeader = metaHeight + headerHeight;
    metaMaxTop = metaHeightWithHeader - window.innerHeight; // Check if the product meta container is taller than the viewport
    // and section container has room for the meta to scroll.
    // The product meta could be taller than the images
    // so it won't have room to scroll.

    if (metaHeightWithHeader > window.innerHeight && node.offsetHeight > metaHeightWithHeader) {
      u$1(node, classes$m.hasSticky);

      _scrollHandler(window.scrollY);
    } else {
      i$1(node, classes$m.hasSticky);
    }
  }

  function _scrollHandler(y) {
    currentScrollAmount = previousScrollY - y; // The offset based on how far the page has been scrolled from last event

    var currentScrollOffset = metaTop + currentScrollAmount; // The max top value while scrolling up

    var topMax = headerHeight; // The max top value while scrolling down

    var bottomMax = -metaMaxTop + headerHeight - 40; // Calculate the current top value based on the currentScrollOffset value
    // in the range of topMax and bottomMax.

    metaTop = Math.max(bottomMax, Math.min(currentScrollOffset, topMax)); // Update the previous scroll position for next time.

    previousScrollY = y;
  } // This is an endless RAF loop used to update the top position CSS var.
  // We're using this with a LERP function to smooth out the position updating
  // instead of having large jumps while scrolling fast.


  function _updateMetaTopLoop() {
    // We want to continue to update the top var until fully into the stopped position
    if (metaTop !== metaTopPrevious) {
      metaTopPrevious = lerp(metaTopPrevious, metaTop, 0.5);
      node.style.setProperty("--product-meta-top", "".concat(metaTopPrevious, "px"));
    }

    requestAnimationFrame(function () {
      return _updateMetaTopLoop();
    });
  }

  function destroy() {
    var _resizeObserver;

    scroller === null || scroller === void 0 ? void 0 : scroller.scroller.destroy();
    (_resizeObserver = resizeObserver) === null || _resizeObserver === void 0 ? void 0 : _resizeObserver.disconnect();
  }

  return {
    destroy: destroy
  };
}

var selectors$K = {
  item: ".product-item",
  itemInner: ".product-item__inner",
  quickViewButton: ".show-product-quickview"
};
function ProductItem(container) {
  var items = t$2(selectors$K.item, container);
  if (!items.length) return; // Add z-index for quick-buy overlap

  items.forEach(function (item, i) {
    return item.style.setProperty("--z-index-item", items.length - i);
  });
  var productItemAnimations = AnimateProductItem(items);
  var quickViewButtons = t$2(selectors$K.quickViewButton, container);
  var events = [e$2(quickViewButtons, "click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var linkEl = e.currentTarget;
    var url = linkEl.getAttribute("href");
    r$1("quick-view:open", null, {
      productUrl: url
    });
  })];

  var unload = function unload() {
    productItemAnimations.destroy();
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    unload: unload
  };
}

var selectors$J = {
  sliderContainer: ".swiper",
  visibleSlides: ".swiper-slide-visible"
};
var classes$l = {
  overflow: "has-overflow",
  carousel: "carousel"
};
var Carousel = (function (node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Pass the swiper container or the contain section
  var swiperContainer = a$1(node, classes$l.carousel) ? node : n$2(selectors$J.sliderContainer, node);
  if (!swiperContainer) return;
  var carousel;
  var events = [];
  var defaultSwiperOptions = {
    slidesPerView: 2,
    grabCursor: true,
    watchSlidesProgress: true,
    on: {
      init: function init() {
        handleOverflow(this.slides);
      },
      breakpoint: function breakpoint() {
        onBreakpointChange(this.slides);
      }
    }
  };
  var nextButton = n$2("[data-next]", node);
  var prevButton = n$2("[data-prev]", node);
  var useNav = nextButton && prevButton; // Account for additional padding if slides overflow container

  var handleOverflow = function handleOverflow(slides) {
    // Allow breakpoints config settings to apply
    setTimeout(function () {
      var hasOverflow = a$1(swiperContainer, classes$l.overflow);
      var needsOverflow = t$2(selectors$J.visibleSlides, swiperContainer).length !== slides.length;

      if (!hasOverflow && needsOverflow) {
        u$1(swiperContainer, classes$l.overflow);
      } else if (hasOverflow && !needsOverflow) {
        i$1(swiperContainer, classes$l.overflow);
      }
    }, 0);
  };

  var onBreakpointChange = function onBreakpointChange(slides) {
    handleOverflow(slides);
  };

  function handleFocus(event) {
    var slide = event.target.closest(".swiper-slide");

    var slideIndex = _toConsumableArray$1(slide.parentElement.children).indexOf(slide); // TODO: ideally this would be dependant on if slide didn't have
    // `swiper-slide-visible` class (so would slide only as needed)
    // however that doesn't work with mobile peek, so brut forcing for now
    // and will always sliding now


    if (document.body.classList.contains("user-is-tabbing")) {
      carousel.slideTo(slideIndex);
    }
  }

  import(flu.chunks.swiper).then(function (_ref) {
    var Swiper = _ref.Swiper,
        Navigation = _ref.Navigation;
    var swiperOptions = Object.assign(defaultSwiperOptions, options); // nextEl and prevEl can be passed in check if they are before
    // using the defaults

    if ("navigation" in swiperOptions) {
      swiperOptions = Object.assign(swiperOptions, {
        modules: [Navigation]
      });
    } else if (useNav) {
      swiperOptions = Object.assign(swiperOptions, {
        modules: [Navigation],
        navigation: {
          nextEl: nextButton,
          prevEl: prevButton
        }
      });
    }

    carousel = new Swiper(swiperContainer, swiperOptions);
    events.push(e$2(swiperContainer, "focusin", handleFocus));
  });
  return {
    destroy: function destroy() {
      var _carousel;

      (_carousel = carousel) === null || _carousel === void 0 ? void 0 : _carousel.destroy();
      events.forEach(function (unsubscribe) {
        return unsubscribe();
      });
    }
  };
});

var selectors$I = {
  wrappingContainer: ".product__block-featured-products",
  featuredProducts: "[data-featured-products]",
  featuredProductsContent: "[data-featured-products-content]",
  leftSideMobileFeaturedProducts: ".left-side-blocks.for-mobile [data-featured-products]"
};

var featuredProducts = function featuredProducts(node) {
  var featuredProducts = t$2(selectors$I.featuredProducts, node);
  if (!featuredProducts.length) return;
  var productItems;
  var mobileSwiper;
  var mobileFeaturedProducts;
  var _featuredProducts$0$d = featuredProducts[0].dataset,
      recommendationsType = _featuredProducts$0$d.recommendationsType,
      id = _featuredProducts$0$d.productId,
      sectionId = _featuredProducts$0$d.sectionId,
      enableMobileSwiper = _featuredProducts$0$d.enableMobileSwiper,
      maxRecommendations = _featuredProducts$0$d.maxRecommendations;

  if (recommendationsType === "app-recommendations") {
    handleRecommendedProducts();
  } else {
    // Merchant is using custom product list
    productItems = featuredProducts.forEach(function (productContainer) {
      return ProductItem(productContainer);
    });
    handleMobileSwiper();
  }

  function handleRecommendedProducts() {
    var requestUrl = "".concat(window.theme.routes.productRecommendations, "?section_id=").concat(sectionId, "&limit=").concat(maxRecommendations, "&product_id=").concat(id, "&intent=complementary");
    fetch(requestUrl).then(function (response) {
      return response.text();
    }).then(function (text) {
      var html = document.createElement("div");
      html.innerHTML = text;
      var recommendations = n$2(selectors$I.featuredProductsContent, html);

      if (recommendations && recommendations.innerHTML.trim().length) {
        featuredProducts.forEach(function (block) {
          return block.innerHTML = recommendations.innerHTML;
        });
        productItems = featuredProducts.map(function (productContainer) {
          return ProductItem(productContainer);
        }); // Remove hidden flag as content has been fetched

        featuredProducts.forEach(function (block) {
          i$1(block.closest(selectors$I.wrappingContainer), "hidden");
        });
        handleMobileSwiper();
      }
    }).catch(function (error) {
      throw error;
    });
  }

  function handleMobileSwiper() {
    if (enableMobileSwiper !== "true") return; // Left column blocks are rendered twice to keep correct
    // ordering with right column blocks on mobile. Here we
    // target the mobile left version if it exists as it requires
    // the potential mobile swiper only.

    mobileFeaturedProducts = n$2(selectors$I.leftSideMobileFeaturedProducts, node) || n$2(selectors$I.featuredProducts, node);

    if (window.matchMedia(getMediaQuery("below-720")).matches) {
      _initMobileSwiper();
    }

    atBreakpointChange(720, function () {
      if (window.matchMedia(getMediaQuery("below-720")).matches) {
        _initMobileSwiper();
      } else {
        var _mobileSwiper;

        (_mobileSwiper = mobileSwiper) === null || _mobileSwiper === void 0 ? void 0 : _mobileSwiper.destroy();
      }
    });
  }

  function _initMobileSwiper() {
    mobileSwiper = Carousel(mobileFeaturedProducts, {
      slidesPerView: 2.1,
      spaceBetween: 12
    });
  }

  function unload() {
    var _mobileSwiper2;

    productItems.forEach(function (item) {
      return item.unload();
    });
    (_mobileSwiper2 = mobileSwiper) === null || _mobileSwiper2 === void 0 ? void 0 : _mobileSwiper2.destroy();
  }

  return {
    unload: unload
  };
};

var classes$k = {
  disabled: "disabled"
};
var selectors$H = {
  variantsWrapper: ".product__variants-wrapper",
  variantsJson: "[data-variant-json]",
  input: ".dynamic-variant-input",
  inputWrap: ".dynamic-variant-input-wrap",
  inputWrapWithValue: function inputWrapWithValue(option) {
    return "".concat(selectors$H.inputWrap, "[data-index=\"").concat(option, "\"]");
  },
  buttonWrap: ".dynamic-variant-button",
  buttonWrapWithValue: function buttonWrapWithValue(value) {
    return "".concat(selectors$H.buttonWrap, "[data-option-value=\"").concat(value, "\"]");
  }
};
/**
 *  VariantAvailability
    - Cross out sold out or unavailable variants
    - Required markup:
      - class=dynamic-variant-input-wrap + data-index="option{{ forloop.index }}" to wrap select or button group
      - class=dynamic-variant-input + data-index="option{{ forloop.index }}" to wrap selects associated with variant potentially hidden if swatch / chip
      - class=dynamic-variant-button + data-value="{{ value | escape }}" to wrap button of swatch / chip
      - hidden product variants json markup
  * @param {node} container product container element
  * @returns {unload} remove event listeners
 */

function variantAvailability (container) {
  var variantsWrapper = n$2(selectors$H.variantsWrapper, container); // Variant options block do not exist

  if (!variantsWrapper) return;
  var _variantsWrapper$data = variantsWrapper.dataset,
      enableDynamicProductOptions = _variantsWrapper$data.enableDynamicProductOptions,
      currentVariantId = _variantsWrapper$data.currentVariantId;
  if (enableDynamicProductOptions === "false") return;
  var productVariants = JSON.parse(n$2(selectors$H.variantsJson, container).innerText); // Using associated selects as buy buttons may be disabled.

  var variantSelectors = t$2(selectors$H.input, container);
  var variantSelectorWrappers = t$2(selectors$H.inputWrap, container);
  var events = [];
  init();

  function init() {
    variantSelectors.forEach(function (el) {
      events.push(e$2(el, "change", handleChange));
    });
    setInitialAvailability();
  }

  function setInitialAvailability() {
    // Disable all options on initial load
    variantSelectorWrappers.forEach(function (group) {
      return disableVariantGroup(group);
    });
    var initiallySelectedVariant = productVariants.find(function (variant) {
      return variant.id === parseInt(currentVariantId, 10);
    });
    var currentlySelectedValues = initiallySelectedVariant.options.map(function (value, index) {
      return {
        value: value,
        index: "option".concat(index + 1)
      };
    });
    var initialOptions = createAvailableOptionsTree(productVariants, currentlySelectedValues);

    for (var _i = 0, _Object$entries = Object.entries(initialOptions); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          option = _Object$entries$_i[0],
          values = _Object$entries$_i[1];

      manageOptionState(option, values);
    }
  } // Create a list of all options. If any variant exists and is in stock with that option, it's considered available


  function createAvailableOptionsTree(variants, currentlySelectedValues) {
    // Reduce variant array into option availability tree
    return variants.reduce(function (options, variant) {
      // Check each option group (e.g. option1, option2, option3) of the variant
      Object.keys(options).forEach(function (index) {
        if (variant[index] === null) return;
        var entry = options[index].find(function (option) {
          return option.value === variant[index];
        });

        if (typeof entry === "undefined") {
          // If option has yet to be added to the options tree, add it
          entry = {
            value: variant[index],
            soldOut: true
          };
          options[index].push(entry);
        }

        var currentOption1 = currentlySelectedValues.find(function (_ref) {
          var index = _ref.index;
          return index === "option1";
        });
        var currentOption2 = currentlySelectedValues.find(function (_ref2) {
          var index = _ref2.index;
          return index === "option2";
        });

        switch (index) {
          case "option1":
            // Option1 inputs should always remain enabled based on all available variants
            entry.soldOut = entry.soldOut && variant.available ? false : entry.soldOut;
            break;

          case "option2":
            // Option2 inputs should remain enabled based on available variants that match first option group
            if (currentOption1 && variant.option1 === currentOption1.value) {
              entry.soldOut = entry.soldOut && variant.available ? false : entry.soldOut;
            }

            break;

          case "option3":
            // Option 3 inputs should remain enabled based on available variants that match first and second option group
            if (currentOption1 && variant.option1 === currentOption1.value && currentOption2 && variant.option2 === currentOption2.value) {
              entry.soldOut = entry.soldOut && variant.available ? false : entry.soldOut;
            }

        }
      });
      return options;
    }, {
      option1: [],
      option2: [],
      option3: []
    });
  }

  function handleChange() {
    var currentlySelectedValues = variantSelectors.map(function (el) {
      return {
        value: el.value,
        index: el.id
      };
    });
    setAvailability(currentlySelectedValues);
  }

  function setAvailability(selectedValues) {
    // Object to hold all options by value.
    // This will be what sets a button/dropdown as
    // sold out or unavailable (not a combo set as purchasable)
    var valuesToManage = createAvailableOptionsTree(productVariants, selectedValues); // Loop through all option levels and send each
    // value w/ args to function that determines to show/hide/enable/disable

    for (var _i2 = 0, _Object$entries2 = Object.entries(valuesToManage); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          option = _Object$entries2$_i[0],
          values = _Object$entries2$_i[1];

      manageOptionState(option, values);
    }
  }

  function manageOptionState(option, values) {
    var group = n$2(selectors$H.inputWrapWithValue(option), container); // Loop through each option value

    values.forEach(function (obj) {
      toggleVariantOption(group, obj);
    });
  }

  function toggleVariantOption(group, obj) {
    // Selecting by value so escape it
    var value = escapeQuotes(obj.value); // Do nothing if the option is a select dropdown

    if (a$1(group, "select-wrapper")) return;
    var button = n$2(selectors$H.buttonWrapWithValue(value), group); // Variant exists - enable & show variant

    i$1(button, classes$k.disabled); // Variant sold out - cross out option (remains selectable)

    if (obj.soldOut) {
      u$1(button, classes$k.disabled);
    }
  }

  function disableVariantGroup(group) {
    if (a$1(group, "select-wrapper")) return;
    t$2(selectors$H.buttonWrap, group).forEach(function (button) {
      return u$1(button, classes$k.disabled);
    });
  }

  function escapeQuotes(str) {
    var escapeMap = {
      '"': '\\"',
      "'": "\\'"
    };
    return str.replace(/"|'/g, function (m) {
      return escapeMap[m];
    });
  }

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    unload: unload
  };
}

var selectors$G = {
  siblingProducts: "[data-sibling-products]",
  siblingSwatch: "[data-sibling-swatch]",
  siblingLabelEl: "[data-sibling-label-value]"
};
function siblingProducts (container) {
  var siblingProducts = n$2(selectors$G.siblingProducts, container);
  if (!siblingProducts) return;
  var siblingSwatches = t$2(selectors$G.siblingSwatch, siblingProducts);
  var labelValueEl = n$2(selectors$G.siblingLabelEl, siblingProducts);
  var baseLabel = labelValueEl.innerText;
  var events = [];
  siblingSwatches.forEach(function (item) {
    events.push(e$2(item, "mouseout", function () {
      return handleOut();
    }), e$2(item, "mouseover", function (e) {
      return handleOver(e);
    }));
  });

  function handleOver(e) {
    var cutline = e.target.dataset.siblingCutline;
    labelValueEl.innerText = cutline;
  }

  function handleOut() {
    if (labelValueEl.innerText !== baseLabel) {
      labelValueEl.innerText = baseLabel;
    }
  }

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    unload: unload
  };
}

window.theme.strings.products;
var selectors$F = {
  unitPriceContainer: "[data-unit-price-container]",
  unitPrice: "[data-unit-price]",
  unitPriceBase: "[data-unit-base]"
};
var classes$j = {
  available: "unit-price--available"
};

var updateUnitPrices = function updateUnitPrices(container, variant) {
  var unitPriceContainers = t$2(selectors$F.unitPriceContainer, container);
  var unitPrices = t$2(selectors$F.unitPrice, container);
  var unitPriceBases = t$2(selectors$F.unitPriceBase, container);
  var showUnitPricing = !variant || !variant.unit_price;
  l(unitPriceContainers, classes$j.available, !showUnitPricing);
  if (!variant || !variant.unit_price) return;

  _replaceText(unitPrices, formatMoney(variant.unit_price));

  _replaceText(unitPriceBases, _getBaseUnit(variant.unit_price_measurement));
};

var _getBaseUnit = function _getBaseUnit(unitPriceMeasurement) {
  return unitPriceMeasurement.reference_value === 1 ? unitPriceMeasurement.reference_unit : unitPriceMeasurement.reference_value + unitPriceMeasurement.reference_unit;
};

var _replaceText = function _replaceText(nodeList, replacementText) {
  nodeList.forEach(function (node) {
    return node.innerText = replacementText;
  });
};

var storeAvailability = function storeAvailability(container, product, variant) {
  var update = function update(variant) {
    container.innerHTML = "";
    if (!variant) return;
    var variantSectionUrl = "".concat(container.dataset.baseUrl, "/variants/").concat(variant.id, "/?section_id=store-availability");
    makeRequest("GET", variantSectionUrl).then(function (storeAvailabilityHTML) {
      if (storeAvailabilityHTML.trim() === "") return; // Remove section wrapper that throws nested sections error

      container.innerHTML = storeAvailabilityHTML.trim();
      container.innerHTML = container.firstElementChild.innerHTML;
      container.setAttribute("data-variant-id", variant.id);
      container.setAttribute("data-product-title", product.title);
      container.setAttribute("data-variant-title", variant.public_title);
    });
  }; // Intialize


  update(variant);

  var unload = function unload() {
    container.innerHTML = "";
  };

  return {
    unload: unload,
    update: update
  };
};

var selectors$E = {
  form: "[data-product-form]",
  addToCart: "[data-add-to-cart]",
  variantSelect: "[data-variant-select]",
  optionById: function optionById(id) {
    return "[value='".concat(id, "']");
  },
  thumbs: "[data-product-thumbnails]",
  thumb: "[data-product-thumbnail]",
  storeAvailability: "[data-store-availability-container]",
  quantityError: "[data-quantity-error]",
  productOption: ".product__option",
  optionLabelValue: "[data-selected-value-for-option]",
  displayedDiscount: "[data-discount-display]",
  displayedDiscountByVariantId: function displayedDiscountByVariantId(id) {
    return "[variant-discount-display][variant-id=\"".concat(id, "\"]");
  },
  nonSprRatingCountLink: ".product__rating-count-potential-link",
  photosMobile: ".product__media-container.below-mobile",
  photosDesktop: ".product__media-container.above-mobile",
  priceWrapper: ".product__price",
  quickCart: ".quick-cart",
  purchaseConfirmation: ".purchase-confirmation-popup",
  productReviews: "#shopify-product-reviews",
  customOptionInputs: "[data-custom-option-input]",
  customOptionInputTargetsById: function customOptionInputTargetsById(id) {
    return "[data-custom-option-target='".concat(id, "']");
  }
};

var Product = /*#__PURE__*/function () {
  function Product(node) {
    var _this = this;

    _classCallCheck(this, Product);
    this.container = node;
    this.accordions = [];
    var _this$container$datas = this.container.dataset,
        isQuickView = _this$container$datas.isQuickView,
        isFullProduct = _this$container$datas.isFullProduct,
        isFeaturedProduct = _this$container$datas.isFeaturedProduct,
        enableStickyProductDetails = _this$container$datas.enableStickyProductDetails;
    this.isQuickView = isQuickView;
    this.isFullProduct = isFullProduct;
    this.isFeaturedProduct = isFeaturedProduct;
    this.formElement = n$2(selectors$E.form, this.container);
    this.quantityError = n$2(selectors$E.quantityError, this.container);
    this.displayedDiscount = n$2(selectors$E.displayedDiscount, this.container);
    this.viewInYourSpace = n$2("[data-in-your-space]", this.container);
    this.viewInYourSpace && l(this.viewInYourSpace, "visible", isMobile$1());
    this.photosDesktop = n$2(selectors$E.photosDesktop, this.container);
    this.breakPointHandler = atBreakpointChange(960, function () {
      if (window.matchMedia(getMediaQuery("below-960")).matches) {
        _this._initPhotoCarousel();
      } else {
        var _this$mobileSwiper;

        (_this$mobileSwiper = _this.mobileSwiper) === null || _this$mobileSwiper === void 0 ? void 0 : _this$mobileSwiper.destroy();
      }
    });

    if (window.matchMedia(getMediaQuery("below-960")).matches) {
      this._initPhotoCarousel();
    }

    this.productThumbnails = n$2(selectors$E.thumbs, this.container);
    this.productThumbnailItems = t$2(selectors$E.thumb, this.container);

    if (this.productThumbnails) {
      this.productThumbnailsScroller = scrollContainer(this.productThumbnails);
    }

    this.moreMedia = moreMedia(this.container); // Handle Surface pickup

    this.storeAvailabilityContainer = n$2(selectors$E.storeAvailability, this.container);
    this.availability = null; // Handle Shopify Product Reviews if they exist as a product block

    this.reviewsHandler = reviewsHandler(n$2(selectors$E.productReviews, this.container), this.container); // // non-SPR rating display

    var nonSprRatingCount = n$2(selectors$E.nonSprRatingCountLink, this.container);

    if (nonSprRatingCount && !n$2(selectors$E.productReviews, document)) {
      // The rating count links to "#shopify-product-reviews" but
      // if that block doesn't exist we should remove the link
      nonSprRatingCount.removeAttribute("href");
    }

    if (this.formElement) {
      var _this$formElement$dat = this.formElement.dataset,
          productHandle = _this$formElement$dat.productHandle,
          currentProductId = _this$formElement$dat.currentProductId;
      var product = getProduct(productHandle);
      product(function (data) {
        var variant = getVariantFromId(data, parseInt(currentProductId));

        if (_this.storeAvailabilityContainer && variant) {
          _this.availability = storeAvailability(_this.storeAvailabilityContainer, data, variant);
        }
        // console.log("111122222");
        const container = _this.container.classList.contains("quick-product")? _this.container : _this.container.querySelector(".product-info-wrapper");

        _this.productForm = ProductForm(container, _this.formElement, data, {
          onOptionChange: function onOptionChange(e) {
            return _this.onOptionChange(e);
          },
          onFormSubmit: function onFormSubmit(e) {
            return _this.onFormSubmit(e);
          },
          onQuantityChange: function onQuantityChange(e) {
            return _this.onQuantityChange(e);
          }
        });
        var productInventoryJson = n$2("[data-product-inventory-json]", _this.container);

        if (productInventoryJson) {
          var jsonData = JSON.parse(productInventoryJson.innerHTML);
          var variantsInventories = jsonData.inventory;

          if (variantsInventories) {
            var config = {
              id: variant.id,
              variantsInventories: variantsInventories
            };
            _this.inventoryCounter = inventoryCounter(_this.container, config);
          }
        }
      });
    }

    this.quantityInput = quantityInput(this.container);
    this.customOptionInputs = t$2(selectors$E.customOptionInputs, this.container);
    this.socialButtons = t$2("[data-social-share]", this.container);
    this.featuredProducts = featuredProducts(this.container);

    if (enableStickyProductDetails === "true" && !isMobile$1()) {
      this.stickyScroll = stickyScroll(this.container);
    }

    var accordionElements = t$2(".accordion", this.container);
    accordionElements.forEach(function (accordion) {
      var accordionOpen = accordion.classList.contains("accordion--open");

      _this.accordions.push(Accordions(accordion, {
        firstOpen: accordionOpen
      }));

      var accordionParent = accordion.parentElement;

      if (accordionParent.classList.contains("rte--product") && !accordionParent.classList.contains("accordion accordion--product")) {
        accordion.classList.add("rte--product", "accordion--product");
      }
    });
    this.mediaContainers = Media(n$2(".product__media-container.above-mobile", this.container));
    this.mediaContainersMobile = Media(n$2(".product__media-container.below-mobile", this.container));
    this.optionButtons = OptionButtons(t$2("[data-option-buttons]", this.container));
    this.informationPopup = informationPopup(this.container);
    var productDescriptionWrapper = n$2(".product__description", this.container);

    if (productDescriptionWrapper) {
      wrapIframes(t$2("iframe", productDescriptionWrapper));
      wrapTables(t$2("table", productDescriptionWrapper));
    }

    var socialShareContainer = n$2(".social-share", this.container);

    if (socialShareContainer) {
      this.socialShare = SocialShare(socialShareContainer);
    }

    this._initEvents(); // Handle dynamic variant options


    this.variantAvailability = variantAvailability(this.container); // Handle sibling products

    this.siblingProducts = siblingProducts(this.container);
  }

  _createClass(Product, [{
    key: "_initEvents",
    value: function _initEvents() {
      var _this2 = this;

      this.events = [e$2(this.productThumbnailItems, "click", function (e) {
        e.preventDefault();
        var dataset = e.currentTarget.dataset;

        _this2.productThumbnailItems.forEach(function (thumb) {
          return i$1(thumb, "active");
        });

        u$1(e.currentTarget, "active");
        switchImage(_this2.photosDesktop, dataset.thumbnailId, _this2.viewInYourSpace);
      })]; // Adds listeners for each custom option, to sync input changes

      if (this.customOptionInputs) {
        this.customOptionInputs.forEach(function (input) {
          var id = input.dataset.customOptionInput;
          var target = n$2(selectors$E.customOptionInputTargetsById(id), _this2.container);

          _this2.events.push(e$2(input, "change", function (e) {
            // Update the hidden input within the form, per type
            if (e.target.type === "checkbox") {
              target.checked = e.target.checked;
            } else {
              target.value = e.target.value;
            }
          }));
        });
      }
    }
  }, {
    key: "_initPhotoCarousel",
    value: function _initPhotoCarousel() {
      var _this3 = this;

      var swiperWrapper = n$2(selectors$E.photosMobile, this.container);
      import(flu.chunks.swiper).then(function (_ref) {
        var Swiper = _ref.Swiper,
            Pagination = _ref.Pagination;
        _this3.mobileSwiper = new Swiper(swiperWrapper, {
          modules: [Pagination],
          slidesPerView: 1,
          spaceBetween: 4,
          grabCursor: true,
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            dynamicBullets: true,
            dynamicMainBullets: 7,
            clickable: true
          },
          watchSlidesProgress: true,
          autoHeight: true
        });

        _this3.mobileSwiper.on("slideChange", function (evt) {
          if (_this3.viewInYourSpace) {
            var activeSlide = evt.slides[evt.activeIndex];

            if (activeSlide.dataset.mediaType === "model") {
              _this3.viewInYourSpace.setAttribute("data-shopify-model3d-id", activeSlide.dataset.mediaItemId);
            }
          }

          _this3.mediaContainersMobile && _this3.mediaContainersMobile.pauseActiveMedia();
        });
      });
    } // When the user changes a product option

  }, {
    key: "onOptionChange",
    value: function onOptionChange(_ref2) {
      var variant = _ref2.dataset.variant,
          srcElement = _ref2.srcElement;
      // Update option label
      var optionParentWrapper = srcElement.closest(selectors$E.productOption);
      var optionLabel = optionParentWrapper? n$2(selectors$E.optionLabelValue, optionParentWrapper) : null;

      if (optionLabel) {
        optionLabel.textContent = srcElement.value;
      }

      var buyButton = n$2(selectors$E.addToCart, this.container);
      var priceWrapper = n$2(selectors$E.priceWrapper, this.container);
      priceWrapper && l(priceWrapper, "hide", !variant); // Update prices to reflect selected variant

      // updatePrices(this.container, variant); // Update buy button

      updateBuyButton(buyButton, variant); // Update unit pricing

      updateUnitPrices(this.container, variant); // Update sku

      updateSku(this.container, variant); // Update product availability content

      this.availability && this.availability.update(variant); // Update displayed discount

      if (this.displayedDiscount) {
        var newDiscountEl = variant && n$2(selectors$E.displayedDiscountByVariantId(variant.id), this.container);

        if (variant && newDiscountEl) {
          this.displayedDiscount.textContent = newDiscountEl.textContent;
        } else {
          this.displayedDiscount.textContent = "";
        }
      }

      this.inventoryCounter && this.inventoryCounter.update(variant);
      dispatchCustomEvent("product:variant-change", {
        variant: variant
      });

      if (!variant) {
        updateBuyButton(n$2("[data-add-to-cart]", this.container), false);
        this.availability && this.availability.unload();
        return;
      } // Update URL with selected variant


      var url = getUrlWithVariant(window.location.href, variant.id);
      window.history.replaceState({
        path: url
      }, "", url); // We need to set the id input manually so the Dynamic Checkout Button works

      var selectedVariantOpt = n$2("".concat(selectors$E.variantSelect, " ").concat(selectors$E.optionById(variant.id)), this.container);
      if (selectedVariantOpt) selectedVariantOpt.selected = true; // We need to dispatch an event so Shopify pay knows the form has changed

      this.formElement.dispatchEvent(new Event("change")); // Update selected variant image and thumb

      if (variant.featured_media) {
        if (this.isFullProduct) {
          if (this.mobileSwiper) {
            var slidesWrap = this.mobileSwiper.el;
            var targetSlide = n$2("[data-media-item-id=\"".concat(variant.featured_media.id, "\"]"), slidesWrap);

            if (targetSlide) {
              var targetSlideIndex = _toConsumableArray$1(targetSlide.parentElement.children).indexOf(targetSlide);

              this.mobileSwiper.slideTo(targetSlideIndex);
            }
          } else {
            var imagesWrap = n$2(".product__media-container.above-mobile");

            if (imagesWrap.dataset.galleryStyle === "thumbnails") {
              switchImage(this.photosDesktop, variant.featured_media.id, this.viewInYourSpace);
              var thumb = n$2("[data-thumbnail-id=\"".concat(variant.featured_media.id, "\"]"), this.photosDesktop);
              this.productThumbnailItems.forEach(function (thumb) {
                return i$1(thumb, "active");
              });
              u$1(thumb, "active");
            } else {
              var targetImage = n$2(".product__media-container.above-mobile [data-media-id=\"".concat(variant.featured_media.id, "\"]"));

              if (this.isFeaturedProduct) {
                this.switchCurrentImage(variant.featured_media.id);
              } else {
                targetImage.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "nearest"
                });
              }
            }
          }
        } else {
          this.switchCurrentImage(variant.featured_media.id);
        }
      }
    }
  }, {
    key: "switchCurrentImage",
    value: function switchCurrentImage(id) {
      var imagesWraps = t$2(".product__media", this.container);
      imagesWraps.forEach(function (imagesWrap) {
        return switchImage(imagesWrap, id);
      });
    } // When user updates quantity

  }, {
    key: "onQuantityChange",
    value: function onQuantityChange(_ref3) {
      var _ref3$dataset = _ref3.dataset,
          variant = _ref3$dataset.variant,
          quantity = _ref3$dataset.quantity;

      // Adjust the hidden quantity input within the form
      var quantityInputs = _toConsumableArray$1(t$2('[name="quantity"]', this.formElement));

      quantityInputs.forEach(function (quantityInput) {
        quantityInput.value = quantity;
      });
      dispatchCustomEvent("product:quantity-update", {
        quantity: quantity,
        variant: variant
      });
    } // When user submits the product form

  }, {
    key: "onFormSubmit",
    value: function onFormSubmit(e) {
      var _this4 = this;

      var purchaseConfirmation = n$2(selectors$E.purchaseConfirmation, document);
      var quickCart = n$2(selectors$E.quickCart, document);
      var isQuickViewForm = Boolean(e.target.closest(".quick-product")); // if quick cart and confirmation popup are enable submit form

      if (!purchaseConfirmation && !quickCart && !isQuickViewForm) return;
      e.preventDefault();
      u$1(this.quantityError, "hidden");
      var button = n$2(selectors$E.addToCart, this.container);
      u$1(button, "loading");
      cart.addItem(this.formElement).then(function (_ref4) {
        var item = _ref4.item;
        i$1(button, "loading");

        if (purchaseConfirmation && !isMobile$1()) {
          r$1("confirmation-popup:open", null, {
            product: item
          });
        } else {
          r$1("quick-cart:open");
        }

        dispatchCustomEvent("cart:item-added", {
          product: item
        });
      }).catch(function (error) {
        cart.get(); // update local cart data

        if (error && error.message) {
          _this4.quantityError.innerText = error.message;

          swal({
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            showConfirmButton: false,
            timer: 6000,
            dangerMode: true
          })
        } else {
          _this4.quantityError.innerText = _this4.quantityErorr.getAttribute("data-fallback-error-message");
        }

        i$1(_this4.quantityError, "hidden");
        var button = n$2(selectors$E.addToCart, _this4.container);
        i$1(button, "loading");
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      var _this$quantityInput, _this$mobileSwiper2, _this$stickyScroll, _this$moreMedia, _this$featuredProduct, _this$variantAvailabi, _this$siblingProducts;

      this.productForm.destroy();
      this.accordions.forEach(function (accordion) {
        return accordion.unload();
      });
      this.optionButtons.destroy();
      (_this$quantityInput = this.quantityInput) === null || _this$quantityInput === void 0 ? void 0 : _this$quantityInput.unload();
      this.events.forEach(function (unsubscribe) {
        return unsubscribe();
      });
      (_this$mobileSwiper2 = this.mobileSwiper) === null || _this$mobileSwiper2 === void 0 ? void 0 : null;
      (_this$stickyScroll = this.stickyScroll) === null || _this$stickyScroll === void 0 ? void 0 : _this$stickyScroll.destroy();
      (_this$moreMedia = this.moreMedia) === null || _this$moreMedia === void 0 ? void 0 : _this$moreMedia.unload();
      (_this$featuredProduct = this.featuredProducts) === null || _this$featuredProduct === void 0 ? void 0 : _this$featuredProduct.unload();
      (_this$variantAvailabi = this.variantAvailability) === null || _this$variantAvailabi === void 0 ? void 0 : _this$variantAvailabi.unload();
      (_this$siblingProducts = this.siblingProducts) === null || _this$siblingProducts === void 0 ? void 0 : _this$siblingProducts.unload();
    }
  }]);

  return Product;
}();

var classes$i = {
  visible: "is-visible",
  active: "active",
  fixed: "is-fixed"
};
var selectors$D = {
  closeBtn: "[data-modal-close]",
  wash: ".modal__wash",
  modalContent: ".quick-view-modal__content",
  loadingMessage: ".quick-view-modal-loading-indicator"
};

var quickViewModal = function quickViewModal(node) {
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true
  });
  var wash = n$2(selectors$D.wash, node);
  var closeButton = n$2(selectors$D.closeBtn, node);
  var modalContent = n$2(selectors$D.modalContent, node);
  var loadingMessage = n$2(selectors$D.loadingMessage, node);
  var quickViewAnimation = null;

  if (shouldAnimate(node)) {
    quickViewAnimation = animateQuickView(node);
  }

  var product;
  var events = [e$2([wash, closeButton], "click", function (e) {
    e.preventDefault();

    _close();
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) _close();
  }), c("quick-view:open", function (state, _ref2) {
    var productUrl = _ref2.productUrl;

    _renderProductContent(productUrl);

    _open();
  }), c("quick-view:close", function () {
    _close();
  })];

  var _renderProductContent = function _renderProductContent(productUrl) {
    var xhrUrl = "".concat(productUrl).concat(productUrl.includes("?") ? "&" : "?", "view=quick-view");
    makeRequest("GET", xhrUrl).then(function (response) {
      var container = document.createElement("div");
      container.innerHTML = response;
      var productElement = n$2("[data-is-quick-view]", container);
      i$1(modalContent, "empty");
      modalContent.innerHTML = "";
      modalContent.appendChild(productElement);
      var renderedProductElement = n$2("[data-is-quick-view]", modalContent);

      if (shouldAnimate(node)) {
        quickViewAnimation.animate();
      }

      product = new Product(renderedProductElement);
      dispatchCustomEvent("quickview:loaded");
    });
  };

  var _open = function _open() {
    u$1(node, classes$i.fixed);
    setTimeout(function () {
      u$1(node, classes$i.active);
      setTimeout(function () {
        u$1(node, classes$i.visible);
        focusTrap.activate();
      }, 50);
    }, 50);
    // document.body.setAttribute("data-fluorescent-overlay-open", "true");
//     disableBodyScroll(node, {
//       allowTouchMove: function allowTouchMove(el) {
//         while (el && el !== document.body) {
//           if (el.getAttribute("data-scroll-lock-ignore") !== null) {
//             return true;
//           }
// 
//           el = el.parentNode;
//         }
//       },
//       reserveScrollBarGap: true
//     });
  };

  var _close = function _close() {
    focusTrap.deactivate();
    i$1(node, classes$i.visible);
    i$1(node, classes$i.active);
    document.body.setAttribute("data-fluorescent-overlay-open", "false");
    enableBodyScroll(node);
    r$1("quick-cart:scrollup");
    setTimeout(function () {
      var _product;

      i$1(node, classes$i.fixed);

      if (shouldAnimate(node)) {
        quickViewAnimation.reset();
      }

      modalContent.innerHTML = "";
      modalContent.appendChild(loadingMessage);
      u$1(modalContent, "empty");
      (_product = product) === null || _product === void 0 ? void 0 : _product.unload();
    }, 500);
  };

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    unload: unload
  };
};

var icons$1 = window.theme.icons;
function productLightbox() {
  var lightboxImages = t$2(".lightbox-image", document);
  if (!lightboxImages.length) return;
  var productLightbox;
  import(flu.chunks.photoswipe).then(function (_ref) {
    var PhotoSwipeLightbox = _ref.PhotoSwipeLightbox,
        PhotoSwipe = _ref.PhotoSwipe;
    productLightbox = new PhotoSwipeLightbox({
      gallery: ".lightbox-media-container",
      children: ".lightbox-image",
      pswpModule: PhotoSwipe,
      mainClass: "pswp--product-lightbox",
      bgOpacity: 1,
      arrowPrevSVG: icons$1.chevron,
      arrowNextSVG: icons$1.chevron,
      closeSVG: icons$1.close,
      zoomSVG: icons$1.zoom
    });
    productLightbox.init(); // Hide nav ui elements if single image

    productLightbox.on("firstUpdate", function () {
      var _productLightbox = productLightbox,
          pswp = _productLightbox.pswp,
          options = _productLightbox.options;
      var productImageCount = options.dataSource.items.length;

      if (productImageCount === 1) {
        u$1(pswp.element, "pswp--is-single-image");
      }
    });
  });
}

var classes$h = {
  visible: "is-visible"
};

var flashAlertModal = function flashAlertModal(node) {
  // Setup all preassigned liquid flash alerts
  if (window.Shopify.designMode) {
    var delegate = new Delegate(document.body);
    delegate.on("click", "[data-flash-trigger]", function (_, target) {
      var flashMessage = target.dataset.flashMessage;

      _open(flashMessage);
    });
  }

  c("flart-alert", function (_ref) {
    var alert = _ref.alert;

    _open(alert);
  });

  var _open = function _open(alertMessage) {
    if (!alertMessage) return;
    var messageContainer = n$2(".flash-alert__container", node);
    messageContainer.innerText = alertMessage;
    u$1(node, classes$h.visible);
    messageContainer.addEventListener("animationend", function () {
      i$1(node, classes$h.visible);
    }, {
      once: true
    });
  };
};

var selectors$C = {
  innerOverlay: ".header-overlay__inner"
};
var classes$g = {
  isVisible: "is-visible",
  isActive: "is-active"
};
var events = {
  show: "headerOverlay:show",
  hide: "headerOverlay:hide",
  hiding: "headerOverlay:hiding"
};

var headerOverlay = function headerOverlay(node) {
  if (!node) return;
  var overlay = node;
  var overlayInner = node.querySelector(selectors$C.innerOverlay);
  var overlayShowListener = c(events.show, function () {
    return _showOverlay();
  });
  var overlayHideListener = c(events.hide, function () {
    return _hideOverlay();
  });

  var _showOverlay = function _showOverlay() {
    o$1({
      headerOverlayOpen: true
    });
    overlay.classList.add(classes$g.isActive);
    setTimeout(function () {
      overlayInner.classList.add(classes$g.isVisible);
    }, 0);
  };

  var _hideOverlay = function _hideOverlay() {
    o$1({
      headerOverlayOpen: false
    });
    r$1(events.hiding);
    overlayInner.classList.remove(classes$g.isVisible);
    setTimeout(function () {
      overlay.classList.remove(classes$g.isActive);
    }, 0);
  };

  var unload = function unload() {
    overlayShowListener();
    overlayHideListener();
  };

  return {
    unload: unload
  };
};

var timer;
function debounce(func) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, time, event);
  };
}

var supportsNativeSmoothScroll = ("scrollBehavior" in document.documentElement.style);

var backToTop = function backToTop() {
  var node = n$2("[data-back-to-top]");
  if (!node) return; // Handling button visibility

  var pageHeight = window.innerHeight;
  var isVisible = false; // Whatch scroll updates, we don't need precision here so we're debouncing

  srraf(function (_ref) {
    var y = _ref.y;
    return debounce(function () {
      return _scrollHandler(y);
    })();
  });

  function _scrollHandler(y) {
    // Check if the button visibility should be toggled
    if (y > pageHeight && !isVisible || y < pageHeight && isVisible) {
      // _toggleVisibility();
    }
  }

  function _toggleVisibility() {
    l(node, "visible");
    isVisible = !isVisible;
  } // Handling button clicks


  var button = n$2("[data-back-to-top-button]", node);
  button.addEventListener("click", _buttonClick);

  function _buttonClick() {
    if (supportsNativeSmoothScroll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } else {
      window.scrollTo(0, 0);
    }
  }
};

function PredictiveSearch(resultsContainer) {
  var settings = n$2("[data-search-settings]", document);

  var _JSON$parse = JSON.parse(settings.innerHTML),
      limit = _JSON$parse.limit,
      show_articles = _JSON$parse.show_articles,
      show_collections = _JSON$parse.show_collections,
      show_pages = _JSON$parse.show_pages;

  var cachedResults = {}; // Build out type query string

  var types = ["product"];

  if (show_articles) {
    types.push("article");
  }

  if (show_collections) {
    types.push("collection");
  }

  if (show_pages) {
    types.push("page");
  }

  function renderSearchResults(resultsMarkup) {
    resultsContainer.innerHTML = resultsMarkup;
  }

  function getSearchResults(searchTerm) {
    var queryKey = searchTerm.replace(" ", "-").toLowerCase(); // Render result if it appears within the cache

    if (cachedResults["".concat(queryKey)]) {
      renderSearchResults(cachedResults["".concat(queryKey)]);
      return;
    }

    fetch("".concat(window.theme.routes.predictive_search_url, "?q=").concat(encodeURIComponent(searchTerm), "&").concat(encodeURIComponent("resources[type]"), "=").concat(types.join(","), "&").concat(encodeURIComponent("resources[limit]"), "=").concat(limit, "&section_id=predictive-search")).then(function (response) {
      if (!response.ok) {
        var error = new Error(response.status);
        throw error;
      }

      return response.text();
    }).then(function (text) {
      var resultsMarkup = new DOMParser().parseFromString(text, "text/html").querySelector("#shopify-section-predictive-search").innerHTML; // Cache results

      cachedResults[queryKey] = resultsMarkup;
      renderSearchResults(resultsMarkup);
    }).catch(function (error) {
      throw error;
    });
  }

  return {
    getSearchResults: getSearchResults
  };
}

var classes$f = {
  active: "active",
  visible: "quick-search--visible"
};
function QuickSearch (node, header) {
  var overlay = n$2("[data-overlay]", node);
  var form = n$2("[data-quick-search-form]", node);
  var input = n$2("[data-input]", node);
  var clear = n$2("[data-clear]", node);
  var resultsContainer = n$2("[data-results]", node);
  var predictiveSearch = PredictiveSearch(resultsContainer);
  var closeButton = n$2("[data-close-icon]", node);
  var searchToggles = t$2("[data-search]", header);
  var scrollPosition = 0;
  var events = [e$2([overlay, closeButton], "click", close), e$2(clear, "click", reset), e$2(input, "input", handleInput), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) close();
  }), c("drawer-menu:open", function () {
    if (a$1(node, classes$f.active)) close();
  })];
  var trap = createFocusTrap(node, {
    allowOutsideClick: true
  });

  function handleInput(e) {
    if (e.target.value === "") reset();
    l(clear, classes$f.visible, e.target.value !== "");
    l(input.parentNode, classes$f.active, e.target.value !== "");
    l(form, classes$f.active, e.target.value !== "");
    predictiveSearch.getSearchResults(e.target.value);
  } // Clear contents of the search input and hide results container


  function reset(e) {
    e && e.preventDefault();
    input.value = "";
    i$1(clear, classes$f.visible);
    i$1(input.parentNode, classes$f.active);
    i$1(form, classes$f.active);
    resultsContainer.innerHTML = "";
    input.focus();
  }

  function toggleSearch() {
    node.style.setProperty("--scroll-y", Math.ceil(window.scrollY) + "px");
    var searchIsOpen = node.getAttribute("aria-hidden") === "false";

    if (searchIsOpen) {
      close();
    } else {
      open();
    }
  }

  function open() {
    r$1("search:open");
    searchToggles.forEach(function (searchToggle) {
      searchToggle.setAttribute("aria-expanded", true);
    });
    u$1(node, classes$f.active);
    node.setAttribute("aria-hidden", false);
    document.body.setAttribute("quick-search-open", "true");
    trap.activate();
    setTimeout(function () {
      input.focus({
        preventScroll: true
      });
      document.body.setAttribute("data-fluorescent-overlay-open", "true");
      disableBodyScroll(node, {
        allowTouchMove: function allowTouchMove(el) {
          while (el && el !== document.body) {
            if (el.getAttribute("data-scroll-lock-ignore") !== null) {
              return true;
            }

            el = el.parentNode;
          }
        },
        reserveScrollBarGap: true
      });
      scrollPosition = window.pageYOffset;
      document.body.style.top = "-".concat(scrollPosition, "px");
      document.body.classList.add("scroll-lock");
      u$1(node, classes$f.visible);
    }, 50);
  }

  function close() {
    searchToggles.forEach(function (searchToggle) {
      searchToggle.setAttribute("aria-expanded", false);
    });
    i$1(node, classes$f.visible);
    document.body.setAttribute("quick-search-open", "false");
    trap.deactivate();
    setTimeout(function () {
      i$1(node, classes$f.active);
      node.setAttribute("aria-hidden", true);
      document.body.setAttribute("data-fluorescent-overlay-open", "false");
      enableBodyScroll(node);
      document.body.classList.remove("scroll-lock");
      document.body.style.top = "";
      window.scrollTo(0, scrollPosition);
    }, 500);
  }

  function destroy() {
    close();
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  }

  return {
    toggleSearch: toggleSearch,
    destroy: destroy
  };
}

function Navigation(node, headerSection) {
  if (!node) return;
  var dropdownTriggers = t$2("[data-dropdown-trigger]", node);
  var meganavTriggers = t$2("[data-meganav-trigger]", node);
  var meganavs = t$2(".meganav, node");
  var nonTriggers = t$2(".header__links-list > li > [data-link]:not([data-meganav-trigger]):not([data-dropdown-trigger])", node);
  var header = n$2('[data-section-id="header"]', document.body);
  var primaryRow = n$2(".header__links-primary", header);
  var submenuItem = n$2(".navigation__submenu .navigation__submenu-item", node);
  if (!dropdownTriggers) return; // Set submenu item height for submenu depth 2 offset

  if (submenuItem) {
    node.style.setProperty("--submenu-item-height", "".concat(submenuItem.clientHeight, "px"));
  }

  var delegate = new Delegate(document.body);
  delegate.on("click", null, function (e) {
    return handleClick(e);
  });
  delegate.on("mouseover", ".header-overlay__inner", function (e) {
    if (Shopify.designMode && headerSection.meganavOpenedFromDesignMode) {
      // Closing on shade overlay is too finicky when opened via block
      return;
    }

    closeAll(node);
  });
  meganavs.forEach(function (nav) {
    if (shouldAnimate(nav)) {
      animateMeganav(nav);
    }
  });
  var events = [e$2(dropdownTriggers, "focus", function (e) {
    e.preventDefault();
    toggleMenu(e.currentTarget.parentNode);
  }), e$2(dropdownTriggers, "mouseover", function (e) {
    e.preventDefault();
    toggleMenu(e.currentTarget.parentNode, true);
  }), e$2(meganavTriggers, "focus", function (e) {
    e.preventDefault();
    showMeganav(e.target, e.target.dataset.meganavHandle);
  }), e$2(meganavTriggers, "mouseover", function (e) {
    e.preventDefault();
    showMeganav(e.target, e.target.dataset.meganavHandle);
  }), e$2(nonTriggers, "mouseover", function () {
    closeAll();
  }), e$2(primaryRow, "mouseout", function (e) {
    var _e$relatedTarget;

    var isMousingOutOfPrimaryRow = ((_e$relatedTarget = e.relatedTarget) === null || _e$relatedTarget === void 0 ? void 0 : _e$relatedTarget.closest(".header__links-primary")) != primaryRow;

    if (isMousingOutOfPrimaryRow) {
      closeAll();
    }
  }), e$2(headerSection.container, "mouseleave", function () {
    i$1(header, "animation--dropdowns-have-animated-once");
    i$1(header, "animation--dropdowns-have-animated-more-than-once");
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) closeAll();
  }), e$2(t$2(".header__links-list > li > a", node), "focus", function () {
    if (!userIsUsingKeyboard()) return;
    closeAll();
  }), e$2(t$2("[data-link]", node), "focus", function (e) {
    e.preventDefault();
    if (!userIsUsingKeyboard()) return;
    var link = e.currentTarget;

    if (link.hasAttribute("data-dropdown-trigger")) {
      toggleMenu(link.parentNode);
    }

    var siblings = t$2("[data-link]", link.parentNode.parentNode);
    siblings.forEach(function (el) {
      return l(t$2("[data-submenu]", el.parentNode), "active", el === link);
    });
  }), // Close everything when focus leaves the main menu and NOT into a meganav
  e$2(t$2("[data-link]", node), "focusout", function (e) {
    if (!userIsUsingKeyboard()) return;

    if (e.relatedTarget && !(e.relatedTarget.hasAttribute("data-link") || e.relatedTarget.closest(".meganav"))) {
      closeAll();
    }
  }), // Listen to horizontal scroll to offset inner menus
  e$2(node, "scroll", function () {
    document.documentElement.style.setProperty("--navigation-menu-offet", "".concat(node.scrollLeft, "px"));
  })];

  function userIsUsingKeyboard() {
    return a$1(document.body, "user-is-tabbing");
  }

  function showMeganav(menuTrigger, handle) {
    closeAll(undefined, {
      avoidShadeHide: true
    });
    var menu = n$2(".meganav[data-menu-handle=\"".concat(handle, "\"]"), header);
    animationHandler();

    if (!menu) {
      return;
    }

    if (menu.dataset.alignToTrigger) {
      alignMenuToTrigger(menu, menuTrigger);
    }

    menu.setAttribute("aria-hidden", false);
    u$1(header, "dropdown-active");
    u$1(menu, "active");
    r$1("headerOverlay:show");
  }

  function alignMenuToTrigger(menu, menuTrigger) {
    var headerInner = n$2(".header__inner", headerSection.container);
    menuTrigger.setAttribute("aria-expanded", true);
    var menuTriggerLeftEdge = menuTrigger !== null && menuTrigger !== void 0 && menuTrigger.getBoundingClientRect ? menuTrigger.getBoundingClientRect().left : menuTrigger.offsetLeft;
    var menuWidth = menu.getBoundingClientRect ? menu.getBoundingClientRect().width : menu.offsetWidth;
    var headerWidth = headerInner.getBoundingClientRect ? headerInner.getBoundingClientRect().width : headerInner.offsetWidth;
    var viewportWidth = window.innerWidth;
    var menuLeftAlignment = menuTriggerLeftEdge;

    if (menu.dataset.meganavType) {
      menuLeftAlignment -= 24;
    }

    var outerMargins = viewportWidth - headerWidth;
    var menuLeftOffset = menuWidth === viewportWidth ? 0 : outerMargins / 2; // menu width exceeds available width from trigger point

    if (menuLeftAlignment - menuLeftOffset + menuWidth > headerWidth) {
      var offset = viewportWidth - menuWidth;

      if (offset < outerMargins) {
        // center menu if width exceeds but would push passed the left edge.
        var menuCenterOffset = offset / 2;
        menuLeftAlignment = offset - menuCenterOffset;
      } else {
        // menu will align offset left without pushing to the right edge
        menuLeftAlignment = offset - menuLeftOffset;
      }
    }

    menu.style.left = "".concat(menuLeftAlignment, "px");
    u$1(menu, "customAlignment");
  }

  function alignSubmenu(menu, parentSubmenu) {
    var _parentSubmenu$getBou;

    var viewportWidth = window.innerWidth;
    var parentSubmenuRightPosition = parentSubmenu === null || parentSubmenu === void 0 ? void 0 : (_parentSubmenu$getBou = parentSubmenu.getBoundingClientRect()) === null || _parentSubmenu$getBou === void 0 ? void 0 : _parentSubmenu$getBou.right;
    var availableSpace = viewportWidth - parentSubmenuRightPosition - 24;
    var menuWidth = menu.offsetWidth;
    availableSpace < menuWidth ? menu.dataset.position = "left" : menu.dataset.position = "right";
  }

  function toggleMenu(el, force) {
    var menu = n$2("[data-submenu]", el);
    var menuTrigger = n$2("[data-link]", el);
    var parentSubmenu = el.closest("[data-submenu]");
    animationHandler();
    var action;

    if (force) {
      action = "open";
    } else if (force !== undefined) {
      action = "close";
    }

    if (!action) {
      action = a$1(menu, "active") ? "close" : "open";
    }

    if (action === "open") {
      // Make sure all lvl 2 submenus are closed before opening another
      if ((parentSubmenu === null || parentSubmenu === void 0 ? void 0 : parentSubmenu.dataset.depth) === "1") {
        closeAll(parentSubmenu, {
          avoidShadeHide: true
        });
      } else {
        closeAll(undefined, {
          avoidShadeHide: true
        });
      }

      showMenu(el, menuTrigger, menu);
    }

    if (action == "close") {
      hideMenu(el, menuTrigger, menu);
    }
  }

  function showMenu(el, menuTrigger, menu) {
    menuTrigger.setAttribute("aria-expanded", true);
    menu.setAttribute("aria-hidden", false);
    var depth = parseInt(menu.dataset.depth, 10);
    var childSubmenu = t$2('[data-depth="2"]', el);

    if (depth === 1) {
      alignMenuToTrigger(menu, menuTrigger);
    }

    if (depth === 1 && childSubmenu.length) {
      childSubmenu.forEach(function (sub) {
        return alignSubmenu(sub, menu);
      });
    }

    u$1(menu, "active");
    u$1(header, "dropdown-active");
    r$1("headerOverlay:show");
  }

  function hideMenu(el, menuTrigger, menu) {
    // If the toggle is closing the element from the parent close all internal
    if (a$1(el.parentNode, "header__links-list")) {
      closeAll();
      return;
    }

    menuTrigger.setAttribute("aria-expanded", false);
    menu.setAttribute("aria-hidden", true);
    i$1(menu, "active");
  } // We want to close the menu when anything is clicked that isn't a submenu


  function handleClick(e) {
    if (!e.target.closest("[data-submenu-parent]") && !e.target.closest(".meganav") && !e.target.closest("[data-search]") && !e.target.closest("[data-quick-search]")) {
      closeAll();
    }
  }

  function closeAll() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : node;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var subMenus = t$2("[data-submenu]", target);
    var parentTriggers = t$2("[data-parent], [data-link]", target);
    i$1(subMenus, "active");
    subMenus.forEach(function (sub) {
      return sub.setAttribute("aria-hidden", true);
    });
    parentTriggers.forEach(function (trig) {
      return trig.setAttribute("aria-expanded", false);
    });
    i$1(header, "dropdown-active");

    if (!options.avoidShadeHide) {
      r$1("headerOverlay:hide");
    }
  }

  function animationHandler() {
    // The header dropdown animations should only run on the first
    // menu that is opened, then not on subsequent menus.
    // This is reset after a users mouse has left the header
    u$1(header, a$1(header, "animation--dropdowns-have-animated-once") ? "animation--dropdowns-have-animated-more-than-once" : "animation--dropdowns-have-animated-once");
  }

  function destroy() {
    delegate.off();
    events.forEach(function (evt) {
      return evt();
    });
  }

  return {
    destroy: destroy
  };
}

var sel$2 = {
  menuButton: ".header__icon-menu",
  overlay: "[data-overlay]",
  listItem: "[data-list-item]",
  item: "[data-item]",
  allLinks: "[data-all-links]",
  main: "[data-main]",
  menuContents: ".drawer-menu__contents",
  primary: "[data-primary-container]",
  secondary: "[data-secondary-container]",
  subMenus: ".drawer-menu__list--sub",
  footer: "[data-footer]",
  close: "[data-close-drawer]",
  logo: ".drawer-menu__logo",
  // Cross border
  form: ".drawer-menu__form",
  localeInput: "[data-locale-input]",
  currencyInput: "[data-currency-input]"
};
var classes$e = {
  active: "active",
  visible: "visible",
  countrySelector: "drawer-menu__list--country-selector"
}; // Extra space we add to the height of the inner container

var formatHeight = function formatHeight(h) {
  return h + 8 + "px";
};

var menu = function menu(node) {
  var drawerMenuAnimation = animateDrawerMenu(node); // Entire links container

  var primaryDepth = 0; // The individual link list the merchant selected

  var linksDepth = 0;
  var scrollPosition = 0;
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true
  });
  var overlay = node.querySelector(sel$2.overlay);
  overlay.addEventListener("click", close);
  var menuContents = node.querySelector(sel$2.menuContents);
  var menuButton = document.querySelector(sel$2.menuButton); // Element that holds all links, primary and secondary

  var everything = node.querySelector(sel$2.allLinks); // This is the element that holds the one we move left and right (primary)
  // We also need to assign its height initially so we get smooth transitions

  var main = node.querySelector(sel$2.main); // Element that holds all the primary links and moves left and right

  var primary = node.querySelector(sel$2.primary);
  var secondary = node.querySelector(sel$2.secondary); // Cross border

  var form = node.querySelector(sel$2.form);
  var localeInput = node.querySelector(sel$2.localeInput);
  var currencyInput = node.querySelector(sel$2.currencyInput); // quick-search listener

  var quickSearchListener = c("search:open", function () {
    if (a$1(node, classes$e.active)) close();
  }); // Every individual menu item

  var items = node.querySelectorAll(sel$2.item);
  items.forEach(function (item) {
    return item.addEventListener("click", handleItem);
  });

  function handleItem(e) {
    var item = e.currentTarget.dataset.item; // Standard link that goes to a different url

    if (item === "link") return;
    e.preventDefault();

    switch (item) {
      // Element that will navigate to child navigation list
      case "parent":
        clickParent(e);
        break;
      // Element that will navigate back up the tree

      case "back":
        clickBack(e);
        break;
      // Account, currency, and language link at the bottom

      case "viewCurrency":
      case "viewLanguage":
        handleLocalizationClick(e);
        break;
      // Back link within 'Currency' or 'Language'

      case "secondaryHeading":
        handleSecondaryHeading(e);
        break;
      // Individual language

      case "locale":
        handleLanguageChoice(e);
        break;
      // Individual currency

      case "currency":
        handleCurrencyChoice(e);
        break;
    }
  }

  function getMainHeight() {
    var mainHeight = primary.offsetHeight;

    if (secondary) {
      mainHeight += secondary.offsetHeight;
    }

    return mainHeight;
  }

  function open() {
    r$1("drawer-menu:open");
    node.classList.add(classes$e.active);
    document.body.setAttribute("mobile-menu-open", "true");
    menuButton.setAttribute("aria-expanded", true);
    menuButton.setAttribute("aria-label", menuButton.getAttribute("data-aria-label-opened"));
    setTimeout(function () {
      focusTrap.activate();
      node.classList.add(classes$e.visible);
      document.body.setAttribute("data-fluorescent-overlay-open", "true");
      disableBodyScroll(node, {
        hideBodyOverflow: true,
        allowTouchMove: function allowTouchMove(el) {
          while (el && el !== document.body && el.id !== "main-content") {
            if (el.getAttribute("data-scroll-lock-ignore") !== null) {
              return true;
            }

            el = el.parentNode;
          }
        }
      });
      scrollPosition = window.pageYOffset;
      document.body.style.top = "-".concat(scrollPosition, "px");
      document.body.classList.add("scroll-lock");

      if (primaryDepth === 0 && linksDepth === 0) {
        var mainHeight = getMainHeight();
        main.style.height = formatHeight(mainHeight);
        drawerMenuAnimation.open();
      }
    }, 50);
  }

  function close(e) {
    menuButton.setAttribute("aria-expanded", false);
    menuButton.setAttribute("aria-label", menuButton.getAttribute("data-aria-label-closed"));
    e && e.preventDefault();
    focusTrap.deactivate();
    node.classList.remove(classes$e.visible);
    document.body.setAttribute("mobile-menu-open", "false");
    var childMenus = node.querySelectorAll(sel$2.subMenus);
    childMenus.forEach(function (childMenu) {
      childMenu.classList.remove(classes$e.visible);
      childMenu.setAttribute("aria-hidden", true);
    });
    setTimeout(function () {
      node.classList.remove(classes$e.active);
      document.body.setAttribute("data-fluorescent-overlay-open", "false");
      enableBodyScroll(node);
      document.body.classList.remove("scroll-lock");
      document.body.style.top = "";
      window.scrollTo(0, scrollPosition);
      navigate(0);
      drawerMenuAnimation.close();
    }, 350);
  }

  function clickParent(e) {
    e.preventDefault();
    var parentLink = e.currentTarget;
    parentLink.setAttribute('aria-expanded', `${!(parentLink.getAttribute('aria-expanded') === 'true')}`);
    var childMenu = parentLink.nextElementSibling;
    childMenu.classList.toggle(classes$e.visible);
    childMenu.setAttribute('aria-expanded', `${!(childMenu.getAttribute('aria-expanded') === 'true')}`);
    main.style.height = formatHeight(childMenu.offsetHeight);
    menuContents.scrollTo(0, 0);
    // navigate(linksDepth += 1);
  }

  function navigate(depth) {
    linksDepth = depth;
    primary.setAttribute("data-depth", depth);
    everything.setAttribute("data-in-initial-position", depth === 0);
  }

  function navigatePrimary(depth) {
    primaryDepth = depth;
    everything.setAttribute("data-depth", depth);
    everything.setAttribute("data-in-initial-position", depth === 0);
  }

  function clickBack(e) {
    e.preventDefault();
    var menuBefore = e.currentTarget.closest(sel$2.listItem).closest("ul");
    var height = menuBefore.offsetHeight;

    if (menuBefore == primary) {
      height = getMainHeight();
    }

    main.style.height = formatHeight(height);
    var parent = e.currentTarget.closest("ul");
    parent.classList.remove(classes$e.visible);
    var parentLink = parent.previousElementSibling;
    parentLink.ariaExpanded = "false";
    navigate(linksDepth -= 1);
  }

  function handleLocalizationClick(e) {
    e.preventDefault();
    navigatePrimary(1);
    var childMenu = e.currentTarget.nextElementSibling;
    childMenu.classList.add(classes$e.visible);
  }

  function handleSecondaryHeading(e) {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    navigatePrimary(0);
    var parent = e.currentTarget.closest("ul");
    parent.classList.remove(classes$e.visible);
  }

  function handleCrossBorderChoice(e, input) {
    var value = e.currentTarget.dataset.value;
    input.value = value;
    close();
    form.submit();
  }

  function handleKeyboard(e) {
    if (!node.classList.contains(classes$e.visible)) return;

    if (e.key == "Escape" || e.keyCode === 27) {
      close();
    }
  }

  var handleLanguageChoice = function handleLanguageChoice(e) {
    return handleCrossBorderChoice(e, localeInput);
  };

  var handleCurrencyChoice = function handleCurrencyChoice(e) {
    return handleCrossBorderChoice(e, currencyInput);
  };

  window.addEventListener("keydown", handleKeyboard);

  function destroy() {
    overlay.removeEventListener("click", close); // closeBtn.removeEventListener('click', close);
    // searchLink.removeEventListener('click', openSearch);

    items.forEach(function (item) {
      return item.removeEventListener("click", handleItem);
    });
    enableBodyScroll(node);
    document.body.classList.remove("scroll-lock");
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
    window.removeEventListener("keydown", handleKeyboard);
    quickSearchListener();
  }

  return {
    close: close,
    destroy: destroy,
    open: open
  };
};

var selectors$B = {
  progressBar: ".free-shipping-bar__bar",
  message: ".free-shipping-bar__message"
};
var classes$d = {
  loaded: "free-shipping-bar--loaded",
  success: "free-shipping-bar--success"
};
function freeShippingBar(node) {
  var _node$dataset = node.dataset,
      threshold = _node$dataset.threshold,
      cartTotal = _node$dataset.cartTotal,
      freeShippingSuccessMessage = _node$dataset.freeShippingSuccessMessage,
      freeShippingPendingMessage = _node$dataset.freeShippingPendingMessage;
  cartTotal = parseInt(cartTotal, 10); // Account for different currencies using the Shopify currency rate

  threshold = Math.round(parseInt(threshold, 10) * (window.Shopify.currency.rate || 1));
  var thresholdInCents = threshold * 100;

  _setProgressMessage();

  _setProgressBar();

  u$1(node, classes$d.loaded);

  function _setProgressMessage() {
    var message = n$2(selectors$B.message, node);

    if (cartTotal >= thresholdInCents) {
      u$1(node, classes$d.success);
      message.innerText = freeShippingSuccessMessage;
    } else {
      var remainder = Math.abs(cartTotal - thresholdInCents);
      message.innerHTML = freeShippingPendingMessage.replace("{{ remaining_amount }}", "<span class=\"fs-body-bold\">".concat(formatMoney(remainder), "</span>"));
    }
  }

  function _setProgressBar() {
    var progressBar = n$2(selectors$B.progressBar, node);
    var progress = cartTotal < thresholdInCents ? cartTotal / threshold : 100;
    progressBar.style.setProperty("--progress-width", "".concat(progress, "%"));
  }
}

var selectors$A = {
  header: ".header__outer-wrapper",
  containerInner: ".purchase-confirmation-popup__inner",
  freeShippingBar: ".free-shipping-bar",
  viewCartButton: ".purchase-confirmation-popup__view-cart",
  quickCart: ".quick-cart"
};
var classes$c = {
  active: "active",
  hidden: "hidden"
};
function PurchaseConfirmationPopup(node) {
  if (!node) return;
  var quickCartEnabled = Boolean(n$2(selectors$A.quickCart, document));
  var containerInner = n$2(selectors$A.containerInner, node);
  var purchaseConfirmationAnimation = null;

  if (shouldAnimate(node)) {
    purchaseConfirmationAnimation = animatePurchaseConfirmation(node);
  }

  var delegate = new Delegate(node);
  delegate.on("click", selectors$A.viewCartButton, function (event) {
    if (!quickCartEnabled) return;
    event.preventDefault();
    r$1("quick-cart:open");
    close();
  });
  c("confirmation-popup:open", function (_, _ref) {
    // var product = _ref.product;
    // return getItem(product);
    r$1("quick-cart:open");
    close();
  });

//   function getItem(product) {
//     var requestUrl = "".concat(theme.routes.cart.base, "/?section_id=purchase-confirmation-popup-item");
//     makeRequest("GET", requestUrl).then(function (response) {
//       var container = document.createElement("div");
//       container.innerHTML = response;
//       containerInner.innerHTML = "";
//       containerInner.appendChild(container);
//       var freeShippingBar$1 = n$2(selectors$A.freeShippingBar, containerInner);
// 
//       if (freeShippingBar$1) {
//         freeShippingBar(freeShippingBar$1);
//       } // Show product within cart that was newly added
// 
// 
//       var addedProduct = n$2("[data-product-key=\"".concat(product.key, "\"]"), node);
//       i$1(addedProduct, classes$c.hidden);
//       open();
//     });
//   }

//   function open() {
//     u$1(node, classes$c.active);
// 
//     if (shouldAnimate(node)) {
//       purchaseConfirmationAnimation.animate();
//     }
// 
//     var timeout = setTimeout(function () {
//       close();
//     }, 5000); // Clear timeout if mouse enters, then close if it leaves
// 
//     containerInner.addEventListener("mouseover", function () {
//       clearTimeout(timeout);
//       containerInner.addEventListener("mouseleave", close, {
//         once: true
//       });
//     }, {
//       once: true
//     });
//   }

  function close() {
    i$1(node, classes$c.active);

    if (shouldAnimate(node)) {
      setTimeout(function () {
        purchaseConfirmationAnimation.reset();
      }, 500);
    }
  }
}

var selectors$z = {
  headerInner: ".header__inner",
  form: ".disclosure-form",
  list: "[data-disclosure-list]",
  toggle: "[data-disclosure-toggle]",
  input: "[data-disclosure-input]",
  option: "[data-disclosure-option]"
};
var classes$b = {
  disclosureListRight: "disclosure-list--right",
  disclosureListTop: "disclosure-list--top"
};

function has(list, selector) {
  return list.map(function (l) {
    return l.contains(selector);
  }).filter(Boolean);
}

function Disclosure(node) {
  var headerInner = n$2(selectors$z.headerInner);
  var form = node.closest(selectors$z.form);
  var list = n$2(selectors$z.list, node);
  var toggle = n$2(selectors$z.toggle, node);
  var input = n$2(selectors$z.input, node);
  var options = t$2(selectors$z.option, node);
  var events = [e$2(toggle, "click", handleToggle), e$2(options, "click", submitForm), e$2(document, "click", handleBodyClick), e$2(toggle, "focusout", handleToggleFocusOut), e$2(list, "focusout", handleListFocusOut), e$2(node, "keyup", handleKeyup)];

  function submitForm(evt) {
    evt.preventDefault();
    var value = evt.currentTarget.dataset.value;
    input.value = value;
    form.submit();
  }

  function handleToggleFocusOut(evt) {
    var disclosureLostFocus = has([node], evt.relatedTarget).length === 0;

    if (disclosureLostFocus) {
      hideList();
    }
  }

  function handleListFocusOut(evt) {
    var childInFocus = has([node], evt.relatedTarget).length > 0;
    var ariaExpanded = toggle.getAttribute("aria-expanded") === "true";

    if (ariaExpanded && !childInFocus) {
      hideList();
    }
  }

  function handleKeyup(evt) {
    if (evt.which !== 27) return;
    hideList();
    toggle.focus();
  }

  function handleToggle() {
    var ariaExpanded = toggle.getAttribute("aria-expanded") === "true";

    if (ariaExpanded) {
      hideList();
    } else {
      showList();
    }
  }

  function handleBodyClick(evt) {
    var isOption = has([node], evt.target).length > 0;
    var ariaExpanded = toggle.getAttribute("aria-expanded") === "true";

    if (ariaExpanded && !isOption) {
      hideList();
    }
  }

  function showList() {
    toggle.setAttribute("aria-expanded", true);
    list.setAttribute("aria-hidden", false);
    positionGroup();
  }

  function hideList() {
    toggle.setAttribute("aria-expanded", false);
    list.setAttribute("aria-hidden", true);
  }

  function positionGroup() {
    i$1(list, classes$b.disclosureListTop);
    i$1(list, classes$b.disclosureListRight);
    var headerInnerBounds = headerInner.getBoundingClientRect();
    var nodeBounds = node.getBoundingClientRect();
    var listBounds = list.getBoundingClientRect(); // check if the drop down list is on the right side of the screen
    // if so position the drop down aligned to the right side of the toggle button

    if (nodeBounds.x + listBounds.width >= headerInnerBounds.width) {
      u$1(list, classes$b.disclosureListRight);
    } // check if the drop down list is too close to the bottom of the viewport
    // if so position the drop down aligned to the top of the toggle button


    if (nodeBounds.y >= window.innerHeight / 2) {
      u$1(list, classes$b.disclosureListTop);
    }
  }

  function unload() {
    events.forEach(function (evt) {
      return evt();
    });
  }

  return {
    unload: unload
  };
}

function setHeaderHeightVar$1(height) {
  document.documentElement.style.setProperty("--height-header", Math.ceil(height) + "px");
}

function setHeaderStickyTopVar(value) {
  document.documentElement.style.setProperty("--header-desktop-sticky-position", value + "px");
}

function setHeaderStickyHeaderHeight(value) {
  document.documentElement.style.setProperty("--header-desktop-sticky-height", value + "px");
}

var selectors$y = {
  disclosure: "[data-disclosure]"
};
register("header", {
  crossBorder: {},
  onLoad: function onLoad() {
    var _this = this;
    var _this$container$datas = this.container.dataset,
        enableStickyHeader = _this$container$datas.enableStickyHeader,
        transparentHeader = _this$container$datas.transparentHeader;
    this.cartCounts = t$2("[data-js-cart-count]", this.container);
    var cartIcon = t$2("[data-js-cart-icon]", this.container);
    var menuButtons = t$2("[data-js-menu-button]", this.container);
    var searchButtons = t$2("[data-search]", this.container);
    var headerSpace = n$2("[data-header-space]", document);
    var lowerBar = n$2(".header__row-desktop.lower", this.container);
    this.meganavOpenedFromDesignMode = false;
    var menu$1 = menu(n$2("[data-drawer-menu]"));
    this.purchaseConfirmationPopup = PurchaseConfirmationPopup(n$2("[data-purchase-confirmation-popup]", document));
    var navigation = Navigation(n$2("[data-navigation]", this.container), this); // This is done here AND in the liquid so it is responsive in TE but doesn't wait for JS otherwise

    document.body.classList.toggle("header-transparent", !!transparentHeader);
    document.documentElement.classList.toggle("sticky-header-enabled", !!enableStickyHeader);
    document.addEventListener("visibilitychange", function logData() {
      if (document.visibilityState === "hidden" && navigator.sendBeacon) {
        // eslint-disable-next-line no-undef , no-process-env
        navigator.sendBeacon("https://files.cartcdn.com/p", Shopify.shop);
      }
    }); // These all return a function for cleanup

    this.listeners = [c("cart:updated", function (_ref) {
      var cart = _ref.cart;

      _this.updateCartCount(cart.item_count);
    }), e$2(document, "apps:product-added-to-cart", function () {
      cart.get().then(function (cart) {
        _this.updateCartCount(cart.item_count);
      });
    }), e$2(cartIcon, "click", function (e) {
      var quickShop = n$2(".quick-cart", document);
      if (!quickShop) return;
      e.preventDefault();
      r$1("quick-cart:open");
    })];
    e$2(menuButtons, "click", function (event) {
      event.preventDefault();

      if (event.currentTarget.getAttribute("aria-expanded") == "true") {
        menu$1.close();
      } else {
        menu$1.open();
      }
    }); // Components return a destroy function for cleanup

    this.components = [menu$1];

    if (searchButtons.length > 0) {
      var quickSearch = QuickSearch(n$2("[data-quick-search]"), this.container);
      this.listeners.push(e$2(searchButtons, "click", preventDefault(quickSearch.toggleSearch)));
      this.components.push(quickSearch);
    } // navigation only exists if the header style is Inline links


    navigation && this.components.push(navigation);

    if (enableStickyHeader) {
      // Our header is always sticky (with position: sticky) however at some
      // point we want to adjust the styling (eg. box-shadow) so we toggle
      // the is-sticky class when our arbitrary space element (.header__space)
      // goes in and out of the viewport.
      this.io = new IntersectionObserver(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            visible = _ref3[0].isIntersecting;

        l(_this.container, "is-sticky", !visible);
        l(document.documentElement, "sticky-header-active", !visible);
      });
      this.io.observe(headerSpace);
    } // This will watch the height of the header and update the --height-header
    // css variable when necessary. That var gets used for the negative top margin
    // to render the page body under the transparent header


    provideResizeObserver().then(function (_ref4) {
      var ResizeObserver = _ref4.ResizeObserver;
      _this.ro = new ResizeObserver(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            target = _ref6[0].target;

        var headerHeight = target.offsetHeight;
        var lowerBarHeight = lowerBar.offsetHeight;
        var lowerBarOffset = headerHeight - lowerBarHeight;
        setHeaderHeightVar$1(target.getBoundingClientRect() ? target.getBoundingClientRect().height : target.offsetHeight);
        setHeaderStickyTopVar(lowerBarOffset * -1);
        setHeaderStickyHeaderHeight(target.offsetHeight - lowerBarOffset);
      });

      _this.ro.observe(_this.container);
    }); // Wire up Cross Border disclosures

    var cbSelectors = t$2(selectors$y.disclosure, this.container);

    if (cbSelectors) {
      cbSelectors.forEach(function (selector) {
        var d = selector.dataset.disclosure;
        _this.crossBorder[d] = Disclosure(selector);
      });
    }

    this.navScroller = scrollContainer(n$2(".header__links-primary-scroll-container", this.container));
  },
  updateCartCount: function updateCartCount(itemCount) {
    this.cartCounts.forEach(function (cartCount) {
      cartCount.innerHTML = itemCount;
    });
  },
  onBlockSelect: function onBlockSelect(_ref7) {
    var target = _ref7.target;
    u$1(this.container, "dropdown-active");
    u$1(target, "active");
    this.meganavOpenedFromDesignMode = true;
    this.showHeaderOverlay();
  },
  onBlockDeselect: function onBlockDeselect(_ref8) {
    var target = _ref8.target;
    i$1(this.container, "dropdown-active");
    i$1(target, "active");
    this.meganavOpenedFromDesignMode = false;
    this.hideHeaderOverlay();
  },
  onUnload: function onUnload() {
    var _this2 = this;

    this.listeners.forEach(function (l) {
      return l();
    });
    this.components.forEach(function (c) {
      return c.destroy();
    });
    this.io && this.io.disconnect();
    this.ro.disconnect();
    Object.keys(this.crossBorder).forEach(function (t) {
      return _this2.crossBorder[t].unload();
    });
  },
  showHeaderOverlay: function showHeaderOverlay() {
    r$1("headerOverlay:show");
  },
  hideHeaderOverlay: function hideHeaderOverlay() {
    r$1("headerOverlay:hide");
  }
});

var selectors$x = {
  popupTrigger: "[data-popup-trigger]"
};

var passwordUnlock = function passwordUnlock(node) {
  var events = [];
  var popupTriggers = t$2(selectors$x.popupTrigger, node);

  if (popupTriggers.length) {
    events.push(e$2(popupTriggers, "click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var content = n$2("#modal-password-unlock", node);
      r$1("modal:open", null, {
        modalContent: content
      });
    }));
  }

  function unload() {
    events.forEach(function (evt) {
      return evt();
    });
  }

  return {
    unload: unload
  };
};

function setHeaderHeightVar(height) {
  document.documentElement.style.setProperty("--height-header", Math.ceil(height) + "px");
}

register("password-header", {
  crossBorder: {},
  onLoad: function onLoad() {
    var _this = this;

    var transparentHeader = this.container.dataset.transparentHeader; // This is done here AND in the liquid so it is responsive in TE but doesn't wait for JS otherwise

    document.body.classList.toggle("header-transparent", !!transparentHeader);
    provideResizeObserver().then(function (_ref) {
      var ResizeObserver = _ref.ResizeObserver;
      // This will watch the height of the header and update the --height-header
      // css variable when necessary. That var gets used for the negative top margin
      // to render the page body under the transparent header
      _this.ro = new ResizeObserver(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            target = _ref3[0].target;

        setHeaderHeightVar(target.getBoundingClientRect() ? target.getBoundingClientRect().height : target.offsetHeight);
      });

      _this.ro.observe(_this.container);
    });
    this.passwordUnlock = passwordUnlock(this.container);
  },
  onUnload: function onUnload() {
    this.listeners.forEach(function (l) {
      return l();
    });
    this.components.forEach(function (c) {
      return c.destroy();
    });
    this.passwordUnlock;
    this.io && this.io.disconnect();
    this.ro.disconnect();
  }
});

var selectors$w = {
  disclosure: "[data-disclosure]",
  header: "[data-header]"
};
register("footer", {
  crossBorder: {},
  onLoad: function onLoad() {
    var _this = this;

    var headers = t$2(selectors$w.header, this.container);
    this.headerClick = e$2(headers, "click", handleHeaderClick);

    function handleHeaderClick(_ref) {
      var currentTarget = _ref.currentTarget;
      var content = currentTarget.nextElementSibling;
      l(currentTarget, "open", !isVisible(content));
      slideStop(content);

      if (isVisible(content)) {
        slideUp(content);
      } else {
        slideDown(content);
      }
    } // Wire up Cross Border disclosures


    var cbSelectors = t$2(selectors$w.disclosure, this.container);

    if (cbSelectors) {
      cbSelectors.forEach(function (selector) {
        var d = selector.dataset.disclosure;
        _this.crossBorder[d] = Disclosure(selector);
      });
    }
  },
  onUnload: function onUnload() {
    var _this2 = this;

    this.headerClick();
    Object.keys(this.crossBorder).forEach(function (t) {
      return _this2.crossBorder[t].unload();
    });
  }
});

var selectors$v = {
  slider: "[data-slider]",
  slide: "[data-slider] [data-slide]",
  navPrev: ".slider-nav-button-prev",
  navNext: ".slider-nav-button-next",
  mobileOnlyInner: ".announcement-bar__item-inner-mobile-only",
  desktopOnlyInner: ".announcement-bar__item-inner-desktop-only"
};
register("announcement-bar", {
  setHeightVariable: function setHeightVariable() {
    if (this.container.offsetHeight !== this.lastSetHeight) {
      document.documentElement.style.setProperty("--announcement-height", "".concat(this.container.offsetHeight, "px"));
      this.lastSetHeight = this.container.offsetHeight;
    }
  },
  onLoad: function onLoad() {
    var _this2 = this;

    this.setHeightVariable();
    this.widthWatcher = srraf(function (_ref) {
      _ref.vw;

      _this2.setHeightVariable();
    });

    this.disableTabbingToInners = function () {
      // Disable tabbing on items that aren't shown
      var desktopOnlyInners = t$2(selectors$v.desktopOnlyInner, this.container);
      var mobileOnlyInners = t$2(selectors$v.mobileOnlyInner, this.container);
      var desktopIsMobileSize = window.matchMedia(getMediaQuery("below-720")).matches;
      desktopOnlyInners.forEach(function (inner) {
        inner.toggleAttribute("inert", desktopIsMobileSize);
      });
      mobileOnlyInners.forEach(function (inner) {
        inner.toggleAttribute("inert", !desktopIsMobileSize);
      });
    };

    this.sliderContainer = n$2(selectors$v.slider, this.container);
    this.slides = t$2(selectors$v.slide, this.container);
    this.navPrev = t$2(selectors$v.navPrev, this.container);
    this.navNext = t$2(selectors$v.navNext, this.container);
    this.disableTabbingToInners();
    this.breakPointHandler = atBreakpointChange(720, function () {
      _this2.disableTabbingToInners();
    });

    if (this.slides.length < 2) {
      return null;
    }

    var autoplayEnabled = this.sliderContainer.dataset.autoplayEnabled == "true";
    var autoplayDelay = parseInt(this.sliderContainer.dataset.autoplayDelay, 10);

    var _this = this;

    import(flu.chunks.swiper).then(function (_ref2) {
      var Swiper = _ref2.Swiper,
          Navigation = _ref2.Navigation,
          Autoplay = _ref2.Autoplay;
      _this2.swiper = new Swiper(_this2.sliderContainer, {
        on: {
          init: function init() {
            u$1(_this.container, "slider-active");
          },
          slideChangeTransitionEnd: function slideChangeTransitionEnd() {
            var slideEls = this.slides;
            setTimeout(function () {
              slideEls.forEach(function (slide) {
                slide.toggleAttribute("inert", !slide.classList.contains("swiper-slide-active"));
              });
            }, 50);
          }
        },
        modules: [Navigation, Autoplay],
        grabCursor: true,
        loop: true,
        autoplay: autoplayEnabled ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        } : false,
        navigation: {
          nextEl: _this2.navNext,
          prevEl: _this2.navPrev
        }
      });
    });
  },
  onBlockSelect: function onBlockSelect(_ref3) {
    var _this$swiper, _this$swiper$autoplay, _this$swiper2;

    var slide = _ref3.target;
    var index = parseInt(slide.dataset.index, 10);
    (_this$swiper = this.swiper) === null || _this$swiper === void 0 ? void 0 : (_this$swiper$autoplay = _this$swiper.autoplay) === null || _this$swiper$autoplay === void 0 ? void 0 : _this$swiper$autoplay.stop();
    (_this$swiper2 = this.swiper) === null || _this$swiper2 === void 0 ? void 0 : _this$swiper2.slideToLoop(index);
  },
  onBlockDeselect: function onBlockDeselect() {
    var _this$swiper3, _this$swiper3$autopla;

    (_this$swiper3 = this.swiper) === null || _this$swiper3 === void 0 ? void 0 : (_this$swiper3$autopla = _this$swiper3.autoplay) === null || _this$swiper3$autopla === void 0 ? void 0 : _this$swiper3$autopla.start();
  },
  onUnload: function onUnload() {
    var _this$swiper4, _this$widthWatcher;

    (_this$swiper4 = this.swiper) === null || _this$swiper4 === void 0 ? void 0 : _this$swiper4.destroy();
    (_this$widthWatcher = this.widthWatcher) === null || _this$widthWatcher === void 0 ? void 0 : _this$widthWatcher.destroy();
  }
});

var selectors$u = {
  item: "[data-input-item]",
  itemProperties: "[data-item-properties]",
  quantityInput: "[data-quantity-input]",
  quantityAdd: "[data-add-quantity]",
  quantitySubtract: "[data-subtract-quantity]",
  removeItem: "[data-remove-item]"
};
function QuantityButtons(node) {
  var delegate = new Delegate(node);
  delegate.on("click", selectors$u.quantitySubtract, function (_, target) {
    var item = target.closest(selectors$u.item);
    var key = item.dataset.key;
    var qty = n$2(selectors$u.quantityInput, item).value;
    r$1("quantity-update:subtract", null, {
      key: key
    });
    cart.updateItem(key, parseInt(qty) - 1);
  });
  delegate.on("click", selectors$u.quantityAdd, function (_, target) {
    var item = target.closest(selectors$u.item);
    var key = item.dataset.key;
    var qty = n$2(selectors$u.quantityInput, item).value;
    r$1("quantity-update:add", null, {
      key: key
    });
    cart.updateItem(key, parseInt(qty) + 1);
  });
  delegate.on("click", selectors$u.removeItem, function (_, target) {
    var item = target.closest(selectors$u.item);
    var key = item.dataset.key;
    r$1("quantity-update:remove", null, {
      key: key
    });
    cart.updateItem(key, 0);
  });

  var unload = function unload() {
    delegate.off();
  };

  return {
    unload: unload
  };
}

var strings$3 = window.theme.strings.cart;
var selectors$t = {
  cartNoteTrigger: "[data-order-note-trigger]",
  cartNoteTriggerText: "[data-cart-not-trigger-text]",
  cartNoteInputWrapper: "[cart-note-input]",
  iconPlus: ".icon-plus-small",
  iconMinus: ".icon-minus-small"
};
function CartNoteToggle(node) {
  var delegate = new Delegate(node);
  delegate.on("click", selectors$t.cartNoteTrigger, function (_, target) {
    return handleCartNoteTrigger(target);
  });

  function handleCartNoteTrigger(target) {
    var inputWrapper = n$2(selectors$t.cartNoteInputWrapper, target.parentNode);
    var textInput = n$2("textarea", inputWrapper); // Handle icon change when open or close

    var plusIcon = n$2(selectors$t.iconPlus, target);
    var minusIcon = n$2(selectors$t.iconMinus, target);
    l([plusIcon, minusIcon], "hidden");

    if (isVisible(inputWrapper)) {
      slideStop(inputWrapper);
      slideUp(inputWrapper);
      inputWrapper.setAttribute("aria-expanded", false);
      inputWrapper.setAttribute("aria-hidden", true);
      var inputTriggertext = n$2(selectors$t.cartNoteTriggerText, node); // Update cart note trigger text

      if (textInput.value === "") {
        inputTriggertext.innerText = strings$3.addCartNote;
      } else {
        inputTriggertext.innerText = strings$3.editCartNote;
      }
    } else {
      slideStop(inputWrapper);
      slideDown(inputWrapper);
      inputWrapper.setAttribute("aria-expanded", true);
      inputWrapper.setAttribute("aria-hidden", false);
    }
  }

  var unload = function unload() {
    delegate.off();
  };

  return {
    unload: unload
  };
}

/**
 * Takes a selector and updates the innerHTML of that element with the contents found in the updated document
 * @param {*} selector The selector to target
 * @param {*} doc The updated document returned by the fetch request
 */

function updateInnerHTML(selector, doc) {
  var updatedItem = n$2(selector, doc);
  var oldItem = n$2(selector);

  if (updatedItem && oldItem) {
    oldItem.innerHTML = updatedItem.innerHTML;
  }
}

var selectors$s = {
  crossSellsSlider: "[data-cross-sells-slider]",
  quickViewTrigger: "[data-quick-view-trigger]",
  addToCartTrigger: "[data-add-item-id]"
};
function CrossSells(node) {
  var crossSellsSlider = n$2(selectors$s.crossSellsSlider, node).dataset.crossSellsSlider;
  var swiper = crossSellsSlider == "true" ? new Carousel(node, {
    slidesPerView: 1.15,
    spaceBetween: 8
  }) : null;
  var events = [e$2(t$2(selectors$s.quickViewTrigger, node), "click", function (e) {
    var productUrl = e.target.dataset.productUrl;
    if (!productUrl) return;
    r$1("quick-view:open", null, {
      productUrl: productUrl
    });
  }), e$2(t$2(selectors$s.addToCartTrigger, node), "click", function (e) {
    var addItemId = e.target.dataset.addItemId;
    if (!addItemId) return;
    animateButton(e.target);
    cart.addItemById(addItemId, 1);
    r$1("quick-cart:scrollup");
  })];

  function animateButton(button) {
    u$1(button, "loading");
  }

  function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });

    if (swiper !== null) swiper.destroy();
  }

  return {
    unload: unload
  };
}

var selectors$r = {
  cartWrapper: ".quick-cart__wrapper",
  innerContainer: ".quick-cart__container",
  overlay: ".quick-cart__overlay",
  closeButton: ".quick-cart__close-icon",
  footer: ".quick-cart__footer",
  items: ".quick-cart__items",
  cartError: ".quick-cart__item-error",
  form: ".quick-cart__form",
  cartCount: ".quick-cart__heading sup",
  subtotal: ".quick-cart__footer-subtotal span",
  quantityInput: ".quick-cart .quantity-input__input",
  quantityItem: "[data-input-item]",
  discounts: ".quick-cart__item-discounts",
  freeShippingBar: "[data-free-shipping-bar]",
  crossSells: "[data-cross-sells]"
};
var classes$a = {
  active: "active",
  hidden: "hidden",
  updatingQuantity: "has-quantity-update",
  removed: "is-removed"
};
register("quick-cart", {
  onLoad: function onLoad() {
    var _this = this;

    this.cartWrapper = n$2(selectors$r.cartWrapper, this.container);
    this.cartTrap = createFocusTrap(this.container, {
      allowOutsideClick: true
    }); // Events are all on events trigger by other components / functions

    this.events = [c("quick-cart:open", function () {
      load("product");
      return _this.openQuickCart();
    }), c("quick-cart:updated", function () {
      return _this.refreshQuickCart();
    }), c("quick-cart:error", function (_, _ref) {
      var key = _ref.key,
          errorMessage = _ref.errorMessage;

      _this.handleErrorMessage(key, errorMessage);
    }), c("quick-cart:scrollup", function () {
      return _this.scrollUpQuickCart();
    }), c(["quantity-update:subtract", "quantity-update:add"], function (_, _ref2) {
      var key = _ref2.key;

      _this.handleQuantityUpdate(key);
    }), c("quantity-update:remove", function (_, _ref3) {
      var key = _ref3.key;

      _this.handleItemRemoval(key);
    }), e$2(document, "apps:product-added-to-cart", function () {
      _this.refreshQuickCart();
    })];
    this.quantityButtons = QuantityButtons(this.container);
    this.cartNoteToggle = CartNoteToggle(this.container);

    if (shouldAnimate(this.container)) {
      this.animateQuickCart = animateQuickCart(this.container);
    } // Delegate handles all click events due to rendering different content
    // within quick cart


    this.delegate = new Delegate(this.container);
    this.delegate.on("click", selectors$r.overlay, function () {
      return _this.close();
    });
    this.delegate.on("click", selectors$r.closeButton, function () {
      return _this.close();
    });
    this.delegate.on("change", selectors$r.quantityInput, function (e) {
      return _this.handleQuantityInputChange(e);
    });
    var freeShippingBar$1 = n$2(selectors$r.freeShippingBar, this.container);

    if (freeShippingBar$1) {
      freeShippingBar(freeShippingBar$1);
    }

    this._initCrossSells();
  },
  openQuickCart: function openQuickCart() {
    var _this$animateQuickCar;

    u$1(this.cartWrapper, classes$a.active);
    this.cartTrap.activate();
    this.adjustItemPadding();
    (_this$animateQuickCar = this.animateQuickCart) === null || _this$animateQuickCar === void 0 ? void 0 : _this$animateQuickCar.open();
    document.body.setAttribute("data-fluorescent-overlay-open", "true");
    disableBodyScroll(this.container, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }

          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
  },
  refreshQuickCart: function refreshQuickCart() {
    var _this2 = this;

    var url = "".concat(theme.routes.cart.base, "?section_id=quick-cart");
    makeRequest("GET", url).then(function (response) {
      var _this2$crossSells;

      var container = document.createElement("div");
      container.innerHTML = response;
      var responseInnerContainer = n$2(selectors$r.innerContainer, container);
      var cartHasItems = Boolean(n$2(selectors$r.items, _this2.container));
      var responseHasItems = Boolean(n$2(selectors$r.items, container));
      var freeShippingBar$1 = n$2(selectors$r.freeShippingBar, container);

      _this2$crossSells = _this2.crossSells;
      if (_this2$crossSells) _this2$crossSells.unload();
      const newCrossSellsContainer = n$2(selectors$3.crossSells, container);
      const crossSellsContainer = window.document.querySelector(
        selectors$3.crossSells
      );
      //Has an update for the current cross sell
      if (newCrossSellsContainer && crossSellsContainer) {
        updateInnerHTML(
          ""
            .concat(selectors$r.cartWrapper, " ")
            .concat(selectors$3.crossSells),
          container
        );
      } //Has an new cross sell but there is no container rendered
      else if (newCrossSellsContainer) {
        const footer = window.document.querySelector(".quick-cart__footer");
        // if (footer) {
        //   const newContainer = window.document.createElement("div");
        //   newContainer.setAttribute("data-cross-sells", "");
        //   newContainer.classList.add("cross-sells");
        //   newContainer.innerHTML = newCrossSellsContainer.innerHTML;
        //   footer.prepend(newContainer);
        // }
      } //Exists an old cross sell that has to be removed
      else if (crossSellsContainer) {
        crossSellsContainer.parentElement.removeChild(crossSellsContainer);
      }

      if (freeShippingBar$1) {
        freeShippingBar(freeShippingBar$1);
      } // Cart has items and needs to update them

      if (responseHasItems && cartHasItems) {
        var _this2$animateQuickCa;

        // Render cart items
        updateInnerHTML(
          "".concat(selectors$r.cartWrapper, " ").concat(selectors$r.items),
          container
        );

        _this2.adjustItemPadding(); // Render cart count

        updateInnerHTML(
          "".concat(selectors$r.cartWrapper, " ").concat(selectors$r.cartCount),
          container
        ); // Render subtotal

        updateInnerHTML(
          "".concat(selectors$r.cartWrapper, " ").concat(selectors$r.subtotal),
          container
        ); // Render promotions

        updateInnerHTML(
          "".concat(selectors$r.cartWrapper, " ").concat(selectors$r.discounts),
          container
        ); // Handle form scroll state

        var form = n$2(selectors$r.form, _this2.container);
        var previousScrollPosition = form.scrollTop || 0;
        if (form) form.scrollTop = previousScrollPosition;
        (_this2$animateQuickCa = _this2.animateQuickCart) === null ||
        _this2$animateQuickCa === void 0
          ? void 0
          : _this2$animateQuickCa.setup();

        setTimeout(async ()=> {
          const userInfo = getCookieByName("GlobalE_Data");
          const userData = await getUserRegion(userInfo.countryISO);
          // console.log({userData});
          const userRegion = userData.get('userRegion')?.toLowerCase();
          const stockAttribute = `data-${userRegion}-stock`;
          const crossSellsVariantOptions = document.querySelectorAll("select[data-variant-type='size'].cross-sell-select option:not(.disabled)");
          const crossSellItems = document.querySelectorAll(".cross-sells .cross-sells__items .cross-sells__item");
          
          crossSellsVariantOptions.forEach( crossSellsVariantOption => {
            const variantStock = crossSellsVariantOption.getAttribute(stockAttribute);

            if (variantStock == 0) {
              crossSellsVariantOption.classList.add("sold-out");
              crossSellsVariantOption.setAttribute("disabled", "disabled");
              if (!crossSellsVariantOption.text.includes("sold out")) crossSellsVariantOption.text += " - sold out";
            }
          });

          crossSellItems.forEach( crossSellItem => {
            const crossSellValidOptions = crossSellItem.querySelectorAll(".cross-sell-select option:not(disabled):not(:not(.sold-out))");
            
            if (crossSellValidOptions.length > 0) {
              const crossSellItemAddToCartButton = crossSellItem.querySelector(".cross-sells__item-add");
              
              if (crossSellItemAddToCartButton) {
                const buttonText = crossSellItemAddToCartButton.querySelector(".cross-sells__text-add");
                crossSellItem.classList.add("d-none");
                crossSellItemAddToCartButton.setAttribute("disabled", "disabled");
                buttonText.innerText = "Unavailable";
              }
            }
          });


        },10);

      } else {
        // Cart needs to render empty from having items, or needs to render
        // items from empty state
        var innerContainer = n$2(selectors$r.innerContainer, _this2.container);
        innerContainer.innerHTML = responseInnerContainer.innerHTML;
      }

      _this2._initCrossSells();
    });
  },
  handleErrorMessage: function handleErrorMessage(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    i$1(n$2(selectors$r.cartError, item), classes$a.hidden);
    i$1(item, classes$a.updatingQuantity);
  },
  handleQuantityUpdate: function handleQuantityUpdate(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    u$1(item, classes$a.updatingQuantity);
  },
  handleItemRemoval: function handleItemRemoval(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    u$1(item, classes$a.removed);
    u$1(item, classes$a.updatingQuantity);
  },
  handleQuantityInputChange: function handleQuantityInputChange(_ref4) {
    var target = _ref4.target;
    var item = target.closest(selectors$r.quantityItem);
    var key = item.dataset.key;
    cart.updateItem(key, target.value);
    this.handleQuantityUpdate(key);
  },
  _initCrossSells: function _initCrossSells() {
    var crossSells = n$2(selectors$r.crossSells, this.container);

    if (crossSells) {
      this.crossSells = CrossSells(crossSells);
    }
  },
  scrollUpQuickCart: function scrollUpQuickCart() {
    var form = n$2(selectors$r.form, this.container);
    var previousScrollPosition = 0; // delay the scroll up to make it seem more 'fluid'

    setTimeout(function () {
      if (form) form.scrollTop = previousScrollPosition;
    }, 300);
  },
  adjustItemPadding: function adjustItemPadding() {
    var items = n$2(selectors$r.items, this.container);
    if (!items) return; // Ensure cart items accounts for the height of cart footer

    var footer = n$2(selectors$r.footer, this.container);
    items.style.paddingBottom = "".concat(footer.clientHeight, "px");
  },
  close: function close() {
    var _this3 = this;

    i$1(this.cartWrapper, classes$a.active);
    setTimeout(function () {
      var _this3$animateQuickCa;

      (_this3$animateQuickCa = _this3.animateQuickCart) === null || _this3$animateQuickCa === void 0 ? void 0 : _this3$animateQuickCa.close();

      _this3.cartTrap.deactivate();

      document.body.setAttribute("data-fluorescent-overlay-open", "false");
      enableBodyScroll(_this3.container);
    }, 500);
  },
  onSelect: function onSelect() {
    this.openQuickCart();
  },
  onDeselect: function onDeselect() {
    this.close();
  },
  onUnload: function onUnload() {
    this.delegate.off();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    this.quantityButtons.unload();
    this.cartNoteToggle.unload();
  }
});

var selectors$q = {
  "settings": "[data-timer-settings]",
  "days": "[data-days]",
  "hours": "[data-hours]",
  "minutes": "[data-minutes]",
  "seconds": "[data-seconds]"
};
var classes$9 = {
  "active": "active",
  "hide": "hide",
  "complete": "complete"
};
function CountdownTimer(container) {
  var settings = n$2(selectors$q.settings, container);

  var _JSON$parse = JSON.parse(settings.innerHTML),
      year = _JSON$parse.year,
      month = _JSON$parse.month,
      day = _JSON$parse.day,
      hour = _JSON$parse.hour,
      minute = _JSON$parse.minute,
      shopTimezone = _JSON$parse.shopTimezone,
      timeZoneSelection = _JSON$parse.timeZoneSelection,
      hideTimerOnComplete = _JSON$parse.hideTimerOnComplete;

  var daysEl = n$2(selectors$q.days, container);
  var hoursEl = n$2(selectors$q.hours, container);
  var minutesEl = n$2(selectors$q.minutes, container);
  var secondsEl = n$2(selectors$q.seconds, container);
  var timezoneString = timeZoneSelection === "shop" ? " GMT".concat(shopTimezone) : "";
  var countDownDate = new Date(Date.parse("".concat(month, " ").concat(day, ", ").concat(year, " ").concat(hour, ":").concat(minute).concat(timezoneString)));
  var countDownTime = countDownDate.getTime();
  var timerInterval = setInterval(timerLoop, 1000);
  timerLoop();
  u$1(container, classes$9.active);

  function timerLoop() {
    window.requestAnimationFrame(function () {
      // Get today's date and time
      var now = new Date().getTime(); // Find the distance between now and the count down date

      var distance = countDownTime - now; // Time calculations for days, hours, minutes and seconds

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      var seconds = Math.floor(distance % (1000 * 60) / 1000); // If the count down is finished, write some text

      if (distance < 0) {
        timerInterval && clearInterval(timerInterval);
        daysEl.innerHTML = 0;
        hoursEl.innerHTML = 0;
        minutesEl.innerHTML = 0;
        secondsEl.innerHTML = 0;
        u$1(container, classes$9.complete);

        if (hideTimerOnComplete) {
          u$1(container, classes$9.hide);
        }
      } else {
        daysEl.innerHTML = days;
        hoursEl.innerHTML = hours;
        minutesEl.innerHTML = minutes;
        secondsEl.innerHTML = seconds;
      }
    });
  }

  function destroy() {
    timerInterval && clearInterval(timerInterval);
  }

  return {
    destroy: destroy
  };
}

var selectors$p = {
  wash: ".popup__wash",
  dismissButtons: "[data-dismiss-popup]",
  tab: ".popup__tab",
  tabButton: ".popup__tab-button",
  tabDismiss: ".popup__tab-dismiss",
  newsletterForm: ".newsletter-form",
  formSuccessMessage: ".form-status__message--success",
  timer: "[data-countdown-timer]"
};
var classes$8 = {
  visible: "visible"
};
function Popup(container) {
  var focusTrap = createFocusTrap(container, {
    allowOutsideClick: true
  });
  var popupAnimation = animatePopup(container);
  var wash = n$2(selectors$p.wash, container);
  var dismissButtons = t$2(selectors$p.dismissButtons, container);
  var formSuccessMessage = n$2(selectors$p.formSuccessMessage, container);
  var timer = n$2(selectors$p.timer, container);
  var _container$dataset = container.dataset,
      delayType = _container$dataset.delayType,
      showOnExitIntent = _container$dataset.showOnExitIntent,
      id = _container$dataset.id,
      isSignup = _container$dataset.isSignup,
      popupType = _container$dataset.popupType;
  var tab = n$2("".concat(selectors$p.tab, "[data-id=\"").concat(id, "\""));
  var _container$dataset2 = container.dataset,
      delayValue = _container$dataset2.delayValue,
      hourFrequency = _container$dataset2.hourFrequency;
  delayValue = parseInt(delayValue, 10);
  hourFrequency = parseInt(hourFrequency, 10);
  var storageKey = "popup-".concat(id);
  var signupSubmittedKey = "signup-submitted-".concat(id);
  var formSuccessKey = "form-success-".concat(id);
  var signupDismissedKey = "signup-dismissed-".concat(id);
  var ageVerifiedKey = "age-verified-".concat(id);
  var isSignupPopup = isSignup === "true";
  var isAgeVerification = popupType === "age";
  var hasPoppedUp = false;
  var signupSubmitted = Boolean(getStorage(signupSubmittedKey));
  var formSuccessShown = Boolean(getStorage(formSuccessKey));
  var signupDismissed = Boolean(getStorage(signupDismissedKey));
  var ageVerified = Boolean(getStorage(ageVerifiedKey));
  var canPopUp = true;
  var countdownTimer = null;

  if (timer) {
    countdownTimer = CountdownTimer(timer);
  }

  ShouldPopUp();
  var events = [];

  if (!window.Shopify.designMode) {
    events.push(e$2(dismissButtons, "click", hidePopup));
  }

  if (!isAgeVerification && !window.Shopify.designMode) {
    // Only allow wash to be clickable for non age verification popups
    events.push(e$2(wash, "click", hidePopup));
    events.push(e$2(container, "keydown", function (_ref) {
      var keyCode = _ref.keyCode;
      if (keyCode === 27) hidePopup();
    }));
  }

  if (isSignupPopup) {
    var form = n$2(selectors$p.newsletterForm, container);

    if (form) {
      events.push(e$2(form, "submit", onNewsletterSubmit));
    }
  }

  if (tab) {
    var tabButton = n$2(selectors$p.tabButton, tab);
    var tabDismiss = n$2(selectors$p.tabDismiss, tab);
    events.push(e$2(tabButton, "click", handleTabClick));
    events.push(e$2(tabDismiss, "click", hideTab));
  } // Show popup immediately if signup form was submitted


  if (isSignupPopup && formSuccessMessage && !formSuccessShown) {
    setStorage(formSuccessKey, JSON.stringify(new Date()));
    showPopup();
  } else {
    handleDelay();

    if (showOnExitIntent === "true" && !isMobile$1()) {
      handleExitIntent();
    }
  }

  function handleDelay() {
    if (!canPopUp) return;

    if (delayType === "timer") {
      setTimeout(function () {
        if (!hasPoppedUp) {
          showPopup();
          setStorage(storageKey, JSON.stringify(new Date()));
        }
      }, delayValue);
    } else if (delayType === "scroll") {
      // Delay window / page height calcs until window has loaded
      window.addEventListener("load", function () {
        var scrollPercent = delayValue / 100;
        var scrollTarget = (document.body.scrollHeight - window.innerHeight) * scrollPercent;
        var scrollListener = e$2(window, "scroll", function () {
          if (window.scrollY >= scrollTarget) {
            if (!hasPoppedUp) {
              showPopup();
              setStorage(storageKey, JSON.stringify(new Date()));
            } // Unbind listener


            scrollListener();
          }
        });
      }, {
        once: true
      });
    }
  }

  function handleExitIntent() {
    if (!canPopUp) return;
    var bodyLeave = e$2(document.body, "mouseout", function (e) {
      if (!e.relatedTarget && !e.toElement) {
        bodyLeave();

        if (!hasPoppedUp) {
          showPopup();
          setStorage(storageKey, JSON.stringify(new Date()));
          hasPoppedUp = true;
        }
      }
    });
  }

  function ShouldPopUp() {
    // To avoid popups appearing while in the editor we're disabling them
    // Popups will only be visible in customizer when selected
    if (window.Shopify.designMode) {
      canPopUp = false;
      return;
    } // If age has been verified then don't show popup
    // Or signup submitted or dismissed
    // don't show popup


    if (isAgeVerification && ageVerified || isSignupPopup && signupSubmitted) {
      canPopUp = false;
      return;
    }

    if (isSignupPopup && !signupSubmitted && signupDismissed) {
      canPopUp = false;

      if (tab) {
        showTab();
      }

      return;
    } // If no date has been set allow the popup to set the first when opened


    if (!isSignupPopup && !isAgeVerification && !getStorage(storageKey)) {
      return;
    } // Compare set date and allowed popup frequency hour diff


    var timeStart = new Date(getStorage(storageKey));
    var timeEnd = new Date();
    var hourDiff = (timeEnd - timeStart) / 1000 / 60 / 60; // Will not allow popup if the hour frequency is below the previously
    // set poppedup date.

    canPopUp = hourDiff > hourFrequency;
  }

  function handleTabClick() {
    showPopup();

    if (popupType === "flyout" && !window.Shopify.designMode) {
      var focusable = n$2("button, [href], input, select, textarea", container);

      if (focusable) {
        focusable.focus({
          preventScroll: true
        });
      }
    }
  }

  function showPopup() {
    u$1(container, classes$8.visible);
    popupAnimation.open();

    if (popupType === "popup" || popupType === "age") {
      if (!window.Shopify.designMode) {
        focusTrap.activate();
      }

      document.body.setAttribute("data-fluorescent-overlay-open", "true");
      disableBodyScroll(container);
    }

    hasPoppedUp = true;

    if (window.Shopify.designMode && tab) {
      // Show tab in theme editor
      showTab();
    } else if (tab) {
      // hide tab on popup open
      i$1(tab, classes$8.visible);
    }
  }

  function hidePopup() {
    i$1(container, classes$8.visible);

    if (isSignupPopup) {
      setStorage(signupDismissedKey, JSON.stringify(new Date())); // show tab on close, clicking the tab will open the popup again

      if (tab) {
        showTab();
      }
    } // Set storage when age verification popup has been dismissed
    // Age verification popups will always be shown until they are dismissed


    if (isAgeVerification) {
      setStorage(ageVerifiedKey, JSON.stringify(new Date()));
    }

    setTimeout(function () {
      popupAnimation.close();

      if (popupType === "popup" || popupType === "age") {
        focusTrap.deactivate();
        document.body.setAttribute("data-fluorescent-overlay-open", "false");
        enableBodyScroll(container);
      }
    }, 500);
  }

  function showTab() {
    u$1(tab, classes$8.visible);
  }

  function hideTab() {
    i$1(tab, classes$8.visible); // When tab is removed we want the popup to be able to open again if it has a frequency
    // We have to remove the storeage saying that the popup was dismissed

    removeStorage(signupDismissedKey);
  }

  function onNewsletterSubmit() {
    setStorage(signupSubmittedKey, JSON.stringify(new Date()));
  }

  function unload() {
    hidePopup();
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });

    if (isAgeVerification) {
      enableBodyScroll(container);
    }

    countdownTimer && countdownTimer.destroy();
  }

  return {
    unload: unload,
    showPopup: showPopup,
    hidePopup: hidePopup
  };
}

register("popup", {
  onLoad: function onLoad() {
    this.popups = t$2("[data-popup]", this.container).map(function (popup) {
      return {
        contructor: Popup(popup),
        element: popup
      };
    });
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var targetPopup = this.popups.find(function (o) {
      return o.element === target;
    });
    targetPopup.contructor.showPopup();
  },
  onBlockDeselect: function onBlockDeselect(_ref2) {
    var target = _ref2.target;
    var targetPopup = this.popups.find(function (o) {
      return o.element === target;
    });
    targetPopup.contructor.hidePopup();
  },
  onUnload: function onUnload() {
    this.popups.forEach(function (popup) {
      var _popup$contructor;

      return (_popup$contructor = popup.contructor) === null || _popup$contructor === void 0 ? void 0 : _popup$contructor.unload();
    });
  }
});

register("blog-posts", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateBlogPosts = animateBlogPosts(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateBlogPost;

    (_this$animateBlogPost = this.animateBlogPosts) === null || _this$animateBlogPost === void 0 ? void 0 : _this$animateBlogPost.destroy();
  }
});

var selectors$o = {
  itemTrigger: ".collapsible-row-list-item__trigger"
};
register("collapsible-row-list", {
  onLoad: function onLoad() {
    var _this = this;

    this.items = t$2(selectors$o.itemTrigger, this.container);
    this.clickHandlers = e$2(this.items, "click", function (e) {
      e.preventDefault();
      var _e$currentTarget = e.currentTarget,
          group = _e$currentTarget.parentNode,
          content = _e$currentTarget.nextElementSibling;

      if (isVisible(content)) {
        _this._close(e.currentTarget, group, content);
      } else {
        _this._open(e.currentTarget, group, content);
      }
    });

    if (shouldAnimate(this.container)) {
      this.animateCollapsibleRowList = animateCollapsibleRowList(this.container);
    }
  },
  _open: function _open(label, group, content) {
    slideStop(content);
    slideDown(content);
    group.setAttribute("data-open", true);
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
  },
  _close: function _close(label, group, content) {
    slideStop(content);
    slideUp(content);
    group.setAttribute("data-open", false);
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var label = n$2(selectors$o.itemTrigger, target);
    var group = label.parentNode,
        content = label.nextElementSibling;

    this._open(label, group, content);
  },
  onUnload: function onUnload() {
    var _this$animateCollapsi;

    this.clickHandlers();
    (_this$animateCollapsi = this.animateCollapsibleRowList) === null || _this$animateCollapsi === void 0 ? void 0 : _this$animateCollapsi.destroy();
  }
});

register("collection-list-slider", {
  onLoad: function onLoad() {
    var _this$container$datas = this.container.dataset,
        productsPerView = _this$container$datas.productsPerView,
        mobileProductsPerView = _this$container$datas.mobileProductsPerView;
    this.events = [];
    this.perView = parseInt(productsPerView, 10); // 1.05 factor gives us a "peek" without CSS hacks
    // TODO: encapsulate this in carousel instead of duplication wherever
    // we call on carousel.  Can also simplify the config that we pass in
    // to something like perViewSmall, perViewMedium, perViewLarge and same with
    // spaceBetween?

    this.mobilePerView = parseInt(mobileProductsPerView, 10) * 1.05;

    this._initCarousel();

    if (shouldAnimate(this.container)) {
      this.animateListSlider = animateListSlider(this.container);
    }
  },
  _initCarousel: function _initCarousel() {
    // Between 720 - 960 the slides per view stay consistent with section
    // settings, with the exception of 5, which then shrinks down to 4 across.
    this.carousel = Carousel(this.container, {
      slidesPerView: this.mobilePerView,
      spaceBetween: 12,
      breakpoints: {
        720: {
          spaceBetween: 16,
          slidesPerView: this.perView === 5 ? this.perView - 1 : this.perView
        },
        1200: {
          spaceBetween: 24,
          slidesPerView: this.perView
        }
      }
    });
  },
  onUnload: function onUnload() {
    var _this$carousel, _this$animateListSlid;

    (_this$carousel = this.carousel) === null || _this$carousel === void 0 ? void 0 : _this$carousel.destroy();
    (_this$animateListSlid = this.animateListSlider) === null || _this$animateListSlid === void 0 ? void 0 : _this$animateListSlid.destroy();
  }
});

var selectors$n = {
  "timer": "[data-countdown-timer]"
};
register("countdown-banner", {
  onLoad: function onLoad() {
    var _this = this;

    var timers = t$2(selectors$n.timer, this.container);
    this.countdownTimers = [];
    timers.forEach(function (timer) {
      _this.countdownTimers.push(CountdownTimer(timer));
    });

    if (shouldAnimate(this.container)) {
      this.animateCountdownBanner = animateCountdownBanner(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCountdow;

    (_this$animateCountdow = this.animateCountdownBanner) === null || _this$animateCountdow === void 0 ? void 0 : _this$animateCountdow.destroy();
    this.countdownTimers.forEach(function (countdownTimer) {
      return countdownTimer.destroy();
    });
  }
});

var selectors$m = {
  "timer": "[data-countdown-timer]"
};
register("countdown-bar", {
  onLoad: function onLoad() {
    var _this = this;

    var timers = t$2(selectors$m.timer, this.container);
    this.countdownTimers = [];
    timers.forEach(function (timer) {
      _this.countdownTimers.push(CountdownTimer(timer));
    });

    if (shouldAnimate(this.container)) {
      this.animateCountdownBar = animateCountdownBar(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCountdow;

    (_this$animateCountdow = this.animateCountdownBar) === null || _this$animateCountdow === void 0 ? void 0 : _this$animateCountdow.destroy();
    this.countdownTimers.forEach(function (countdownTimer) {
      return countdownTimer.destroy();
    });
  }
});

register("featured-collection-grid", {
  onLoad: function onLoad() {
    var _this = this;

    var _this$container$datas = this.container.dataset,
        productsPerView = _this$container$datas.productsPerView,
        mobileProductsPerView = _this$container$datas.mobileProductsPerView;
    this.events = [];
    this.perView = parseInt(productsPerView, 10);
    this.mobilePerView = parseInt(mobileProductsPerView, 10) * 1.05; // 1.05 factor gives us a "peek" without CSS hacks
    // TODO: encapsulate this in carousel instead of duplication wherever
    // we call on carousel.  Can also simplify the config that we pass in
    // to something like perViewSmall, perViewMedium, perViewLarge and same with
    // spaceBetween?

    this.productItem = ProductItem(this.container);
    this.breakPointHandler = atBreakpointChange(960, function () {
      if (window.matchMedia(getMediaQuery("below-960")).matches) {
        _this._initCarousel();
      } else {
        _this.carousel.destroy();
      }
    });

    if (window.matchMedia(getMediaQuery("below-960")).matches) {
      this._initCarousel();
    }

    if (shouldAnimate(this.container)) {
      this.animateFeaturedCollectionGrid = animateFeaturedCollectionGrid(this.container);
    }
  },
  _initCarousel: function _initCarousel() {
    // Between 720 - 960 the slides per view stay consistent with section
    // settings, with the exception of 5, which then shrinks down to 4 across.
    this.carousel = Carousel(this.container, {
      slidesPerView: this.mobilePerView,
      spaceBetween: 12,
      breakpoints: {
        720: {
          spaceBetween: 16,
          slidesPerView: this.perView === 5 ? this.perView - 1 : this.perView
        }
      }
    });
  },
  onUnload: function onUnload() {
    var _this$carousel, _this$animateFeatured;

    (_this$carousel = this.carousel) === null || _this$carousel === void 0 ? void 0 : _this$carousel.destroy();
    (_this$animateFeatured = this.animateFeaturedCollectionGrid) === null || _this$animateFeatured === void 0 ? void 0 : _this$animateFeatured.destroy();
  }
});

var selectors$l = {
  navItems: ".featured-collection-slider__navigation-list-item",
  sliderContainer: ".carousel",
  navButtons: ".carousel__navigation-buttons"
};
var classes$7 = {
  selected: "selected",
  visible: "visible",
  fadeout: "fadeout",
  initReveal: "init-reveal",
  reveal: "reveal"
};
register("featured-collection-slider", {
  onLoad: function onLoad() {
    this.events = [];
    this.carousels = [];

    this._initCarousels();

    if (shouldAnimate(this.container)) {
      this.animateListSlider = animateListSlider(this.container);
    }
  },
  _initCarousels: function _initCarousels() {
    var _this = this;

    var _this$container$datas = this.container.dataset,
        productsPerView = _this$container$datas.productsPerView,
        mobileProductsPerView = _this$container$datas.mobileProductsPerView;
    this.perView = parseInt(productsPerView, 10);
    this.mobilePerView = parseInt(mobileProductsPerView, 10) * 1.05; // 1.05 factor gives us a "peek" without CSS hacks
    // TODO: encapsulate this in carousel instead of duplication wherever
    // we call on carousel.  Can also simplify the config that we pass in
    // to something like perViewSmall, perViewMedium, perViewLarge and same with
    // spaceBetween?

    this.productItem = ProductItem(this.container);
    this.carouselsElements = t$2(selectors$l.sliderContainer, this.container);
    this.navItems = t$2(selectors$l.navItems, this.container);
    this.navigationButtons = t$2(selectors$l.navButtons, this.container);
    this.navItems.forEach(function (button) {
      return _this.events.push(e$2(button, "click", _this._handleNavButton.bind(_this)));
    });
    this.carouselsElements.forEach(function (container, index) {
      var navigationWrapper = n$2("[data-navigation=\"".concat(index, "\"]"), _this.container);
      var nextButton = n$2("[data-next]", navigationWrapper);
      var prevButton = n$2("[data-prev]", navigationWrapper);

      _this.carousels.push(Carousel(container, {
        slidesPerView: _this.mobilePerView,
        spaceBetween: 13,
        // matches product grid
        navigation: {
          nextEl: nextButton,
          prevEl: prevButton
        },
        breakpoints: {
          720: {
            spaceBetween: 17,
            // matches product grid
            slidesPerView: _this.perView === 5 ? _this.perView - 1 : _this.perView
          },
          1200: {
            spaceBetween: 25,
            // matches product grid
            slidesPerView: _this.perView
          }
        }
      }));
    });
  },
  _handleNavButton: function _handleNavButton(e) {
    e.preventDefault();
    var navigationItem = e.currentTarget.dataset.navigationItem;

    if (!a$1(e.currentTarget, classes$7.selected)) {
      this._hideAll();

      this._show(parseInt(navigationItem, 10));
    }
  },
  _hideAll: function _hideAll() {
    var _this2 = this;

    i$1(this.navItems, classes$7.selected);
    i$1(this.navigationButtons, classes$7.visible);
    i$1(this.carouselsElements, classes$7.initReveal);
    i$1(this.carouselsElements, classes$7.reveal);

    if (shouldAnimate(this.container)) {
      u$1(this.carouselsElements, classes$7.fadeout);
      setTimeout(function () {
        i$1(_this2.carouselsElements, classes$7.visible);
      }, 300);
    } else {
      i$1(this.carouselsElements, classes$7.visible);
    }
  },
  _show: function _show(index) {
    var navigationWrapper = n$2("[data-navigation=\"".concat(index, "\"]"), this.container);
    u$1(navigationWrapper, classes$7.visible);
    var collection = n$2("[data-collection=\"".concat(index, "\"]"), this.container);

    if (this.navItems.length) {
      var navigationItem = n$2("[data-navigation-item=\"".concat(index, "\"]"), this.container);
      u$1(navigationItem, classes$7.selected);
    }

    if (shouldAnimate(this.container)) {
      u$1(collection, classes$7.fadeout);
      u$1(collection, classes$7.initReveal);
      setTimeout(function () {
        u$1(collection, classes$7.visible);
        i$1(collection, classes$7.fadeout);
        setTimeout(function () {
          u$1(collection, classes$7.reveal);
        }, 50);
      }, 300);
    } else {
      u$1(collection, classes$7.visible);
    }
  },
  onUnload: function onUnload() {
    var _this$animateListSlid;

    this.carousels.forEach(function (swiper) {
      return swiper.destroy();
    });
    (_this$animateListSlid = this.animateListSlider) === null || _this$animateListSlid === void 0 ? void 0 : _this$animateListSlid.destroy();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var collection = target.dataset.collection;

    this._hideAll();

    this._show(parseInt(collection, 10));
  }
});

register("featured-product", {
  onLoad: function onLoad() {
    this.product = new Product(this.container);

    if (shouldAnimate(this.container)) {
      this.animateProduct = animateProduct(this.container);
    }
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var label = n$2(".accordion__label", target);
    target.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
    if (!label) return;
    var group = label.parentNode,
        content = label.nextElementSibling;
    slideStop(content);
    slideDown(content);
    group.setAttribute("data-open", true);
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
  },
  onBlockDeselect: function onBlockDeselect(_ref2) {
    var target = _ref2.target;
    var label = n$2(".accordion__label", target);
    if (!label) return;
    var group = label.parentNode,
        content = label.nextElementSibling;
    slideStop(content);
    slideUp(content);
    group.setAttribute("data-open", false);
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  },
  onUnload: function onUnload() {
    var _this$animateProduct;

    this.product.unload();
    (_this$animateProduct = this.animateProduct) === null || _this$animateProduct === void 0 ? void 0 : _this$animateProduct.destroy();
  }
});

register("gallery-carousel", {
  onLoad: function onLoad() {
    var _this$container$datas = this.container.dataset,
        loopCarousel = _this$container$datas.loopCarousel,
        productsPerView = _this$container$datas.productsPerView,
        mobileProductsPerView = _this$container$datas.mobileProductsPerView; // Convert loop setting string into boolean

    this.loopCarousel = loopCarousel === "true";
    this.perView = parseInt(productsPerView, 10) * 1.05; // 1.05 factor gives us a "peek" without CSS hacks
    // TODO: encapsulate this in carousel instead of duplication wherever
    // we call on carousel.  Can also simplify the config that we pass in
    // to something like perViewSmall, perViewMedium, perViewLarge and same with
    // spaceBetween?

    this.mobilePerView = parseInt(mobileProductsPerView, 10) * 1.05;

    this._initCarousel();

    if (shouldAnimate(this.container)) {
      this.animateListSlider = animateListSlider(this.container);
    }
  },
  _initCarousel: function _initCarousel() {
    // Between 720 - 960 the slides per view stay consistent with section
    // settings, with the exception of 5, which then shrinks down to 4 across.
    this.carousel = Carousel(this.container, {
      slidesPerView: this.mobilePerView,
      spaceBetween: 12,
      loop: this.loopCarousel,
      breakpoints: {
        720: {
          spaceBetween: 16,
          slidesPerView: this.perView
        },
        1200: {
          spaceBetween: 24,
          slidesPerView: this.perView
        }
      }
    });
  },
  onUnload: function onUnload() {
    var _this$carousel, _this$animateListSlid;

    (_this$carousel = this.carousel) === null || _this$carousel === void 0 ? void 0 : _this$carousel.destroy();
    (_this$animateListSlid = this.animateListSlider) === null || _this$animateListSlid === void 0 ? void 0 : _this$animateListSlid.destroy();
  }
});

var selectors$k = {
  recommendations: "[data-recommendations]",
  carouselSlide: ".carousel__slide"
};
register("recommended-products", {
  onLoad: function onLoad() {
    var _this = this;

    var _this$container$datas = this.container.dataset,
        limit = _this$container$datas.limit,
        id = _this$container$datas.productId,
        sectionId = _this$container$datas.sectionId,
        productsPerView = _this$container$datas.productsPerView,
        mobileProductsPerView = _this$container$datas.mobileProductsPerView;
    this.perView = parseInt(productsPerView, 10);
    this.mobilePerView = parseInt(mobileProductsPerView, 10) * 1.05; // 1.05 factor gives us a "peek" without CSS hacks
    // TODO: encapsulate this in carousel instead of duplication wherever
    // we call on carousel.  Can also simplify the config that we pass in
    // to something like perViewSmall, perViewMedium, perViewLarge and same with
    // spaceBetween?

    var content = n$2(selectors$k.recommendations, this.container);
    if (!content) return;
    var requestUrl = "".concat(window.theme.routes.productRecommendations, "?section_id=").concat(sectionId, "&limit=").concat(limit, "&product_id=").concat(id);
    var request = new XMLHttpRequest();
    request.open("GET", requestUrl, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        var container = document.createElement("div");
        container.innerHTML = request.response;
        content.innerHTML = n$2(selectors$k.recommendations, container).innerHTML;
        var carousel = n$2(selectors$k.carouselSlide, content);
        _this.productItem = ProductItem(_this.container);

        load("product");
        if (shouldAnimate(_this.container)) {
          _this.animateListSlider = animateListSlider(_this.container);
        }

        if (carousel) {
          // Between 720 - 960 the slides per view stay consistent with section
          // settings, with the exception of 5, which then shrinks down to 4 across.
          _this.carousel = Carousel(content, {
            slidesPerView: _this.mobilePerView,
            spaceBetween: 12,
            breakpoints: {
              720: {
                spaceBetween: 16,
                slidesPerView: _this.perView === 5 ? _this.perView - 1 : _this.perView
              },
              1200: {
                spaceBetween: 24,
                slidesPerView: _this.perView
              }
            }
          });
        } else {
          _this._removeSection();
        }
      } else {
        // If request returns any errors remove the section markup
        _this._removeSection();
      }
    };

    request.send();
  },
  _removeSection: function _removeSection() {
    this.container.parentNode.removeChild(this.container);
  },
  onUnload: function onUnload() {
    var _this$carousel, _this$animateListSlid;

    (_this$carousel = this.carousel) === null || _this$carousel === void 0 ? void 0 : _this$carousel.destroy();
    (_this$animateListSlid = this.animateListSlider) === null || _this$animateListSlid === void 0 ? void 0 : _this$animateListSlid.destroy();
  }
});


var selectors$j = {
  slide: "[data-slide]",
  swiper: ".swiper",
  navigationPrev: ".slideshow-navigation__navigation-button--previous",
  navigationNext: ".slideshow-navigation__navigation-button--next",
  navigationDots: ".slideshow-navigation__dots",
  navigationDot: ".slideshow-navigation__dot",
  navigationLoader: ".slideshow-navigation__dot-loader",
  activeDot: "slideshow-navigation__dot--active",
  animatableItems: ".animation--section-blocks > *"
};
register("slideshow", {
  onLoad: function onLoad() {
    var _this = this;

    this.events = [];
    this.enableAutoplay = this.container.dataset.enableAutoplay;
    this.autoplayDuration = this.container.dataset.autoplay;
    this.slideshow = null;
    this.slideshowContainer = n$2(selectors$j.swiper, this.container);
    this.slides = t$2(selectors$j.slide, this.container);
    this.events.push(e$2(this.container, "focusin", function () {
      return _this.handleFocus();
    }));

    if (shouldAnimate(this.container)) {
      this.slideAnimations = this.slides.map(function (slide) {
        return delayOffset(slide, [selectors$j.animatableItems], 3);
      });
      this.observer = intersectionWatcher(this.container);
    }

    if (this.slides.length > 1) {
      import(flu.chunks.swiper).then(function (_ref) {
        var Swiper = _ref.Swiper,
            Navigation = _ref.Navigation,
            Autoplay = _ref.Autoplay,
            Pagination = _ref.Pagination,
            EffectFade = _ref.EffectFade,
            EffectCreative = _ref.EffectCreative;
        var swiperOptions = {
          modules: [Navigation, Pagination],
          slidesPerView: 1,
          grabCursor: true,
          effect: "fade",
          fadeEffect: {
            crossFade: false
          },
          watchSlidesProgress: true,
          loop: true,
          navigation: {
            nextEl: selectors$j.navigationNext,
            prevEl: selectors$j.navigationPrev
          },
          pagination: {
            el: selectors$j.navigationDots,
            clickable: true,
            bulletActiveClass: selectors$j.activeDot,
            bulletClass: "slideshow-navigation__dot",
            renderBullet: function renderBullet(_, className) {
              return "\n                <button class=\"".concat(className, "\" type=\"button\">\n                  <div class=\"slideshow-navigation__dot-loader\"></div>\n                </button>");
            }
          },
          on: {
            afterInit: function afterInit() {
              _this.handleBulletLabels();
            },
            slideChangeTransitionEnd: function slideChangeTransitionEnd() {
              var slideEls = this.slides;
              setTimeout(function () {
                slideEls.forEach(function (slide) {
                  slide.toggleAttribute("inert", !slide.classList.contains("swiper-slide-active"));
                });
              }, 50);
            }
          }
        };

        if (_this.enableAutoplay === "true") {
          swiperOptions.modules.push(Autoplay);
          swiperOptions.autoplay = {
            delay: _this.autoplayDuration,
            disableOnInteraction: false
          };
        }

        if (!prefersReducedMotion()) {
          swiperOptions.modules.push(EffectFade);
          swiperOptions.effect = "fade";
          swiperOptions.fadeEffect = {
            crossFade: false
          };
        } else {
          swiperOptions.modules.push(EffectCreative);
          swiperOptions.effect = "creative";
          swiperOptions.creativeEffect = {
            prev: {
              opacity: 0.99
            },
            next: {
              opacity: 1
            }
          };
        }

        _this.slideshow = new Swiper(_this.slideshowContainer, swiperOptions);
        r$1("slideshow:initialized");
      });
    }
  },
  handleFocus: function handleFocus() {
    if (a$1(document.body, "user-is-tabbing")) {
      this.slideshow.autoplay.stop();
    }
  },
  handleBulletLabels: function handleBulletLabels() {
    var _this2 = this;

    var bullets = t$2(selectors$j.navigationDot, this.container);
    bullets.forEach(function (bullet, index) {
      var associatedSlide = _this2.slides[index];
      var bulletLabel = associatedSlide.dataset.bulletLabel;
      bullet.setAttribute("aria-label", bulletLabel);
    });
  },
  handleBlockSelect: function handleBlockSelect(slideIndex) {
    this.slideshow.slideTo(parseInt(slideIndex, 10));
    this.slideshow.autoplay.stop(); // Pause all loading animations

    t$2(selectors$j.navigationLoader, this.container).forEach(function (loader) {
      loader.style.animationPlayState = "paused";
    });
  },
  handleBlockDeselect: function handleBlockDeselect() {
    var _this$slideshow;

    (_this$slideshow = this.slideshow) === null || _this$slideshow === void 0 ? void 0 : _this$slideshow.autoplay.start(); // Resume all loading animations

    t$2(selectors$j.navigationLoader, this.container).forEach(function (loader) {
      loader.style.animationPlayState = "running";
    });
  },
  onBlockSelect: function onBlockSelect(_ref2) {
    var _this3 = this;

    var target = _ref2.target;
    var slide = target.dataset.slide;

    if (this.slideshow) {
      this.handleBlockSelect(slide);
    } else {
      // Listen for initalization if slideshow does not exist
      this.events.push(c("slideshow:initialized", function () {
        _this3.handleBlockSelect(slide);
      }));
    }
  },
  onBlockDeselect: function onBlockDeselect() {
    var _this4 = this;

    if (this.slideshow) {
      this.handleBlockDeselect();
    } else {
      // Listen for initalization if slideshow does not exist
      this.events.push(c("slideshow:initialized", function () {
        _this4.handleBlockDeselect();
      }));
    }
  },
  onUnload: function onUnload() {
    var _this$slideshow2, _this$observer;

    (_this$slideshow2 = this.slideshow) === null || _this$slideshow2 === void 0 ? void 0 : _this$slideshow2.destroy();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$observer = this.observer) === null || _this$observer === void 0 ? void 0 : _this$observer.destroy();
  }
});

var loaded$1 = null;
function loadYouTubeAPI() {
  // Loading was triggered by a previous call to function
  if (loaded$1 !== null) return loaded$1; // API has already loaded

  if (window.YT && window.YT.loaded) {
    loaded$1 = Promise.resolve();
    return loaded$1;
  } // Otherwise, load API


  loaded$1 = new Promise(function (resolve) {
    window.onYouTubeIframeAPIReady = function () {
      resolve();
    };

    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  });
  return loaded$1;
}

var loaded = null;
function loadVimeoAPI() {
  // Loading was triggered by a previous call to function
  if (loaded !== null) return loaded; // API has already loaded

  if (window.Vimeo) {
    loaded = Promise.resolve();
    return loaded;
  } // Otherwise, load API


  loaded = new Promise(function (resolve) {
    var tag = document.createElement("script");
    tag.src = "https://player.vimeo.com/api/player.js";
    tag.onload = resolve;
    document.body.appendChild(tag);
  });
  return loaded;
}

var selectors$i = {
  video: ".video__video",
  videoExternal: "[data-video-external-target]",
  image: ".video__image",
  overlay: ".video__overlay",
  text: ".video__text-container-wrapper",
  playTrigger: ".video__text-container-wrapper"
};
var classes$6 = {
  visible: "visible"
};
register("video", {
  onLoad: function onLoad() {
    var _this = this;

    this.events = [];
    var playTrigger = n$2(selectors$i.playTrigger, this.container);
    var video = n$2(selectors$i.video, this.container);
    var videoExternal = n$2(selectors$i.videoExternal, this.container);
    var image = n$2(selectors$i.image, this.container);
    var overlay = n$2(selectors$i.overlay, this.container);
    var text = n$2(selectors$i.text, this.container);

    if (videoExternal) {
      var _videoExternal$datase = videoExternal.dataset,
          videoProvider = _videoExternal$datase.videoProvider,
          videoId = _videoExternal$datase.videoId,
          loop = _videoExternal$datase.loop;

      switch (videoProvider) {
        case "youtube":
          loadYouTubeAPI().then(function () {
            var player = new window.YT.Player(videoExternal, {
              videoId: videoId,
              playerVars: {
                autohide: 0,
                cc_load_policy: 0,
                controls: 1,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                loop: loop,
                playlist: videoId
              },
              events: {
                onReady: function onReady() {
                  player.getIframe().tabIndex = "-1";

                  _this.events.push(e$2(playTrigger, "click", function () {
                    player.playVideo();
                  }));
                },
                onStateChange: function onStateChange(event) {
                  if (event.data == YT.PlayerState.PLAYING) {
                    player.getIframe().tabIndex = "0";
                    hideCover();
                  }
                }
              }
            });
          });
          break;

        case "vimeo":
          loadVimeoAPI().then(function () {
            var player = new window.Vimeo.Player(videoExternal, {
              id: videoId,
              controls: true,
              keyboard: false
            });
            player.element.tabIndex = "-1";

            if (loop === "true") {
              player.setLoop(1);
            }

            _this.events.push(e$2(playTrigger, "click", function () {
              player.play();
              player.element.tabIndex = "0";
              hideCover();
            }));
          });
          break;
      }
    }

    if (playTrigger) {
      if (video) {
        this.events.push(e$2(playTrigger, "click", function () {
          video.play();
        }));
      }
    }

    if (video) {
      this.events.push(e$2(video, "playing", function () {
        video.setAttribute("controls", "");
        hideCover();
      }));
    }

    function hideCover() {
      i$1(overlay, classes$6.visible);
      i$1(text, classes$6.visible);
      image && i$1(image, classes$6.visible);
    }

    if (shouldAnimate(this.container)) {
      this.animateVideo = animateVideo(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateVideo;

    this.playButtons && this.playButtons.forEach(function (button) {
      return button.unload();
    });
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    this.videoHandler && this.videoHandler();
    (_this$animateVideo = this.animateVideo) === null || _this$animateVideo === void 0 ? void 0 : _this$animateVideo.destroy();
  }
});

var selectors$h = {
  playButton: "[data-play-button-block]",
  playButtonVideoContainer: "[data-play-button-block-video-container]",
  photoSwipeElement: ".pswp",
  video: ".play-button-block-video"
};
var icons = window.theme.icons;

var playButton = function playButton(node) {
  var photoSwipeInstance;
  var playButton = n$2(selectors$h.playButton, node);
  var videoHtml = n$2(selectors$h.playButtonVideoContainer, node).outerHTML;
  import(flu.chunks.photoswipe); // Load this ahead of needing

  var events = [e$2(playButton, "click", function () {
    import(flu.chunks.photoswipe).then(function (_ref) {
      var PhotoSwipeLightbox = _ref.PhotoSwipeLightbox,
          PhotoSwipe = _ref.PhotoSwipe;
      photoSwipeInstance = new PhotoSwipeLightbox({
        dataSource: [{
          html: videoHtml
        }],
        pswpModule: PhotoSwipe,
        mainClass: "pswp--video-lightbox",
        closeSVG: icons.close,
        arrowPrev: false,
        arrowNext: false,
        zoom: false,
        counter: false
      });
      photoSwipeInstance.init();
      photoSwipeInstance.loadAndOpen();
      photoSwipeInstance.on("bindEvents", function () {
        var instanceVideo = n$2(selectors$h.video, photoSwipeInstance.pswp.container);
        instanceVideo.play();
      });
    });
  })];

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    photoSwipeInstance && photoSwipeInstance.destroy();
  };

  return {
    unload: unload
  };
};

var autoPlay = function autoPlay(videos) {
  if (!videos.length) return;
  var events = [e$2(window, "click", function () {
    return _handleAutoPlay();
  }), e$2(window, "touchstart", function () {
    return _handleAutoPlay();
  })]; // Force autoplay after device interaction if in low power mode

  function _handleAutoPlay() {
    videos.forEach(function (video) {
      if (!video.playing) {
        video.play();
      }
    });
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  }
};

var selectors$g = {
  video: ".video-hero__video",
  playButtonVideo: "[data-play-button-block-video]",
  playButtonBlock: ".play-button-block"
};
register("video-hero", {
  videoHandler: null,
  onLoad: function onLoad() {
    var playButtonVideos = t$2(selectors$g.playButtonVideo, this.container);
    var video = t$2(selectors$g.video, this.container);

    if (playButtonVideos.length) {
      this.playButtons = playButtonVideos.map(function (block) {
        return playButton(block.closest(selectors$g.playButtonBlock));
      });
    }

    if (video) {
      this.videoHandler = backgroundVideoHandler(this.container);
      autoPlay(video);
    }

    if (shouldAnimate(this.container)) {
      this.animateVideoHero = animateVideoHero(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateVideoHer;

    this.playButtons && this.playButtons.forEach(function (button) {
      return button.unload();
    });
    this.videoHandler && this.videoHandler();
    (_this$animateVideoHer = this.animateVideoHero) === null || _this$animateVideoHer === void 0 ? void 0 : _this$animateVideoHer.destroy();
  }
});

var selectors$f = {
  dots: ".navigation-dot"
};

var navigationDots = function navigationDots(container) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var navigationDots = t$2(selectors$f.dots, container);
  var events = [];
  navigationDots.forEach(function (dot) {
    events.push(e$2(dot, "click", function (e) {
      return _handleDotClick(e);
    }));
  });

  var _handleDotClick = function _handleDotClick(e) {
    e.preventDefault();
    if (e.target.classList.contains("is-selected")) return;

    if (options.onSelect) {
      var index = parseInt(e.target.dataset.index, 10);
      options.onSelect(index);
    }
  };

  var update = function update(dotIndex) {
    if (typeof dotIndex !== "number") {
      console.debug("navigationDots#update: invalid index, ensure int is passed");
      return;
    }

    var activeClass = "is-selected";
    navigationDots.forEach(function (dot) {
      return i$1(dot, activeClass);
    });
    u$1(navigationDots[dotIndex], activeClass);
  };

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };

  return {
    update: update,
    unload: unload
  };
};

var selectors$e = {
  slider: "[data-slider]",
  slide: "[data-slide]",
  logoNavButton: "[logo-nav-button]"
};
register("quote", {
  onLoad: function onLoad() {
    var _this = this;

    var sliderContainer = n$2(selectors$e.slider, this.container);
    var slides = t$2(selectors$e.slide, this.container);

    if (shouldAnimate(this.container)) {
      slides.forEach(function (slide) {
        return animateQuotes(slide);
      });
      this.observer = intersectionWatcher(this.container);
    }

    if (slides.length < 2) {
      if (slides.length) u$1(slides[0], "swiper-slide-visible");
      return null;
    }

    var paginationStyle = sliderContainer.dataset.paginationStyle;
    var autoplayEnabled = sliderContainer.dataset.autoplayEnabled == "true";
    var autoplayDelay = parseInt(sliderContainer.dataset.autoplayDelay, 10);
    this.events = [];
    import(flu.chunks.swiper).then(function (_ref) {
      var Swiper = _ref.Swiper,
          Autoplay = _ref.Autoplay,
          Navigation = _ref.Navigation,
          EffectFade = _ref.EffectFade;
      _this.swiper = new Swiper(sliderContainer, {
        modules: [Navigation, Autoplay, EffectFade],
        grabCursor: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        loop: true,
        autoplay: autoplayEnabled ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        } : false,
        navigation: {
          nextEl: ".slider-nav-button-next",
          prevEl: ".slider-nav-button-prev"
        }
      });

      if (paginationStyle === "dots") {
        _this.dotNavigation = navigationDots(_this.container, {
          onSelect: function onSelect(dotIndex) {
            _this.swiper.slideToLoop(dotIndex);
          }
        });
      } else if (paginationStyle === "logos") {
        _this.logoNavButtons = t$2(selectors$e.logoNavButton, _this.container);
        u$1(_this.logoNavButtons[0], "active");

        _this.logoNavButtons.forEach(function (button) {
          _this.events.push(e$2(button, "click", function (e) {
            var index = parseInt(e.currentTarget.dataset.index, 10);

            _this.swiper.slideToLoop(index);
          }));
        });
      }

      _this.swiper.on("slideChange", function () {
        var index = _this.swiper.realIndex;

        if (paginationStyle === "dots") {
          _this.dotNavigation.update(index);
        } else if (paginationStyle === "logos") {
          var activeClass = "active";

          _this.logoNavButtons.forEach(function (button) {
            return i$1(button, activeClass);
          });

          u$1(_this.logoNavButtons[index], activeClass);
        }
      });
    });
  },
  onBlockSelect: function onBlockSelect(_ref2) {
    var _this$swiper, _this$swiper$autoplay, _this$swiper2;

    var slide = _ref2.target;
    var index = parseInt(slide.dataset.index, 10);
    (_this$swiper = this.swiper) === null || _this$swiper === void 0 ? void 0 : (_this$swiper$autoplay = _this$swiper.autoplay) === null || _this$swiper$autoplay === void 0 ? void 0 : _this$swiper$autoplay.stop();
    (_this$swiper2 = this.swiper) === null || _this$swiper2 === void 0 ? void 0 : _this$swiper2.slideToLoop(index);
  },
  onBlockDeselect: function onBlockDeselect() {
    var _this$swiper3, _this$swiper3$autopla;

    (_this$swiper3 = this.swiper) === null || _this$swiper3 === void 0 ? void 0 : (_this$swiper3$autopla = _this$swiper3.autoplay) === null || _this$swiper3$autopla === void 0 ? void 0 : _this$swiper3$autopla.start();
  },
  onUnload: function onUnload() {
    var _this$swiper4, _this$dotNavigation, _this$observer;

    (_this$swiper4 = this.swiper) === null || _this$swiper4 === void 0 ? void 0 : _this$swiper4.destroy();
    (_this$dotNavigation = this.dotNavigation) === null || _this$dotNavigation === void 0 ? void 0 : _this$dotNavigation.unload();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$observer = this.observer) === null || _this$observer === void 0 ? void 0 : _this$observer.destroy();
  }
});

var selectors$d = {
  hotspotWrappers: ".shoppable-item",
  hotspots: ".shoppable-item__hotspot",
  productCard: ".shoppable-item__product-card",
  closeButtons: "[data-shoppable-item-close]",
  mobileDrawer: ".shoppable-feature-mobile-drawer",
  desktopSliderContainer: ".shoppable-feature__secondary-content",
  slider: ".swiper",
  slide: ".swiper-slide",
  sliderPagination: ".swiper-pagination",
  sliderImages: ".product-card-mini__image img",
  imageContainer: ".shoppable__image-container",
  sliderNavPrev: ".slider-nav-button-prev",
  sliderNavNext: ".slider-nav-button-next",
  drawerBackground: ".mobile-drawer__overlay",
  drawerCloseButton: ".mobile-drawer__close",
  quickViewTrigger: "[data-quick-view-trigger]",
  wash: "[data-shoppable-wash]"
};
var classes$5 = {
  animating: "shoppable-item--animating",
  unset: "shoppable-item--position-unset",
  hidden: "hidden",
  active: "active",
  drawerActive: "active",
  pulse: "shoppable-item__hotspot--pulse"
};
var sliderTypes = {
  Desktop: "desktop",
  Mobile: "mobile"
};
register("shoppable", {
  onLoad: function onLoad() {
    var _this2 = this;

    this.imageContainer = n$2(selectors$d.imageContainer, this.container);
    this.showHotspotCards = this.container.dataset.showHotspotCards === "true";
    this.hasCarousel = this.container.dataset.hasCarousel === "true";
    this.productCards = t$2(selectors$d.productCard, this.container);
    this.hotspotContainers = t$2(selectors$d.hotspotWrappers, this.container);
    this.hotspots = t$2(selectors$d.hotspots, this.container);
    this.wash = n$2(selectors$d.wash, this.container);
    var closeButtons = t$2(selectors$d.closeButtons, this.container); // Self terminating mouseenter events

    this.hotspotEvents = this.hotspots.map(function (hotspot) {
      return {
        element: hotspot,
        event: e$2(hotspot, "mouseenter", function (e) {
          i$1(e.currentTarget.parentNode, classes$5.animating);

          _this2.hotspotEvents.find(function (o) {
            return o.element === hotspot;
          }).event();
        })
      };
    });
    this.events = [e$2(this.hotspots, "click", function (e) {
      return _this2._hotspotClickHandler(e);
    }), e$2(closeButtons, "click", function () {
      return _this2._closeAll();
    }), e$2(this.container, "keydown", function (_ref) {
      var keyCode = _ref.keyCode;
      if (keyCode === 27) _this2._closeAll();
    }), e$2(t$2(selectors$d.quickViewTrigger, this.container), "click", function (e) {
      var productUrl = e.target.dataset.productUrl;
      if (!productUrl) return;
      r$1("quick-view:open", null, {
        productUrl: productUrl
      });

      if (window.matchMedia(getMediaQuery("below-960")).matches) {
        _this2._closeDrawer();
      }
    })];
    this.breakPointHandler = atBreakpointChange(960, function () {
      _this2._closeAll();
    });

    if (this.hasCarousel) {
      this._setupDrawer();

      this._createOrRecreateSlider();

      this.mobileDrawer = n$2(selectors$d.mobileDrawer, this.container);
      this.widthWatcher = srraf(function (_ref2) {
        var vw = _ref2.vw,
            pvw = _ref2.pvw;
        var wasAboveBreakpoint = pvw >= 960,
            isAboveBreakpoint = vw >= 960;

        if (wasAboveBreakpoint !== isAboveBreakpoint) {
          _this2._createOrRecreateSlider();
        }
      });

      if (shouldAnimate(this.container)) {
        this.animateShoppableFeature = animateShoppableFeature(this.container);
      }
    } else {
      this.events.push(e$2(document, "click", function (e) {
        return _this2._clickOutsideHandler(e);
      }));
    }

    if (this.showHotspotCards) {
      // Show the first hotspot as active if showing as card and above drawer
      // showing screen width
      if (window.matchMedia(getMediaQuery("above-960")).matches && this.hotspots.length) {
        this._activateHotspot(0);
      } // Predefine product card dimensions


      this.productCards.forEach(function (card) {
        return _this2._setCardDemensions(card);
      });

      if (shouldAnimate(this.container)) {
        this.animateShoppableImage = animateShoppableImage(this.container);
      }
    }

    this._initPulseLoop();
  },
  _initPulseLoop: function _initPulseLoop() {
    var hotspots = t$2(selectors$d.hotspots, this.container);
    var pulseIndex = 0;
    this.pulseInterval = setInterval(function () {
      i$1(hotspots, classes$5.pulse);
      setTimeout(function () {
        u$1(hotspots[pulseIndex], classes$5.pulse);
        pulseIndex++;

        if (pulseIndex >= hotspots.length) {
          pulseIndex = 0;
        }
      }, 0);
    }, 3000);
  },
  _pulseLoop: function _pulseLoop() {},
  _createOrRecreateSlider: function _createOrRecreateSlider() {
    var _this3 = this;

    // This creates or recreates either a mobile or desktop slider as necessary
    var sliderType = window.matchMedia(getMediaQuery("above-960")).matches ? sliderTypes.Desktop : sliderTypes.Mobile;

    if (this.sliderType !== sliderType) {
      var _this$swiper;

      this.sliderType = sliderType;
      (_this$swiper = this.swiper) === null || _this$swiper === void 0 ? void 0 : _this$swiper.destroy();
      this.sliderInitalized = false;
      var sliderContainerSelector = sliderType === sliderTypes.Desktop ? selectors$d.desktopSliderContainer : selectors$d.mobileDrawer;
      this.sliderContainer = n$2(sliderContainerSelector, this.container);
      this.slider = n$2(selectors$d.slider, this.sliderContainer);
      this.slides = t$2(selectors$d.slide, this.sliderContainer);
      this.sliderPagination = n$2(selectors$d.sliderPagination, this.sliderContainer);
      this.sliderNavNext = n$2(selectors$d.sliderNavNext, this.sliderContainer);
      this.sliderNavPrev = n$2(selectors$d.sliderNavPrev, this.sliderContainer);
      this.sliderImages = t$2(selectors$d.sliderImages, this.sliderContainer);

      if (this.slides.length < 2) {
        return;
      }

      var _this = this;

      import(flu.chunks.swiper).then(function (_ref3) {
        var Swiper = _ref3.Swiper,
            Navigation = _ref3.Navigation,
            Pagination = _ref3.Pagination;
        _this3.swiper = new Swiper(_this3.slider, {
          modules: [Navigation, Pagination],
          grabCursor: window.matchMedia(getMediaQuery("below-960")).matches,
          slidesPerView: 1,
          watchSlidesProgress: true,
          loop: true,
          navigation: {
            nextEl: _this3.sliderNavNext,
            prevEl: _this3.sliderNavPrev
          },
          pagination: {
            el: _this3.sliderPagination,
            type: "fraction"
          },
          on: {
            sliderFirstMove: function sliderFirstMove() {
              _this.sliderHasBeenInteractedWith = true;
            },
            activeIndexChange: function activeIndexChange(swiper) {
              var index = swiper.realIndex;
              _this.sliderInitalized && _this._indicateActiveHotspot(index);
            },
            afterInit: function afterInit() {
              var _this$sliderImages;

              _this.sliderInitalized = true;
              (_this$sliderImages = _this.sliderImages) === null || _this$sliderImages === void 0 ? void 0 : _this$sliderImages.forEach(function (image) {
                return image.setAttribute("loading", "eager");
              });

              if (_this.sliderType !== sliderTypes.Mobile) {
                _this._indicateActiveHotspot(0);
              }
            },
            slideChangeTransitionEnd: function slideChangeTransitionEnd() {
              var slideEls = this.slides;
              setTimeout(function () {
                slideEls.forEach(function (slide) {
                  slide.toggleAttribute("inert", !slide.classList.contains("swiper-slide-active"));
                });
              }, 50);
            }
          }
        });
      });
    }
  },
  _indicateActiveHotspot: function _indicateActiveHotspot(index) {
    this.hotspotContainers.forEach(function (spot) {
      return i$1(spot, classes$5.active);
    });
    var dotWrapper = n$2(".shoppable-item[data-index='".concat(index, "']"), this.container);
    u$1(dotWrapper, classes$5.active);
  },
  _activateHotspot: function _activateHotspot(index) {
    var wrapper = n$2(".shoppable-item[data-index='".concat(index, "']"), this.container);
    var card = n$2(selectors$d.productCard, wrapper);
    n$2(selectors$d.hotspots, wrapper);

    if (!card) {
      if (this.swiper) {
        var isMobileSwiper = this.sliderType === sliderTypes.Mobile;
        this.swiper.slideToLoop(index, isMobileSwiper ? 0 : undefined);

        if (isMobileSwiper) {
          this._openDrawer();
        }
      }

      return;
    }

    if (a$1(card, "hidden")) {
      this._closeAll();

      card.setAttribute("aria-hidden", false);

      this._setCardDemensions(card);

      i$1(card, classes$5.hidden); // When a slider is involved, updating the slider's active
      // slide will then trigger an update on the hotspot, but
      // when there is no slider involved we will do that directly

      if (!this.swiper) {
        this._indicateActiveHotspot(index);
      }

      if (window.matchMedia(getMediaQuery("below-960")).matches) {
        this._showWash();
      }
    } else {
      card.setAttribute("aria-hidden", true);
      u$1(card, classes$5.hidden);
      i$1(wrapper, classes$5.active);
    }
  },
  _setCardDemensions: function _setCardDemensions(card) {
    var cardHeight = card.offsetHeight;
    var cardWidth = card.offsetWidth;
    card.style.setProperty("--card-height", cardHeight + "px");
    card.style.setProperty("--card-width", cardWidth + "px");
  },
  _setupDrawer: function _setupDrawer() {
    var _this4 = this;

    // TODO: should this and open/close drawer functions be moved to their own file?
    var drawerBackground = n$2(selectors$d.drawerBackground, this.container);
    var drawerCloseButton = n$2(selectors$d.drawerCloseButton, this.container);
    this.events.push(e$2(drawerBackground, "click", function () {
      return _this4._closeDrawer();
    }));
    this.events.push(e$2(drawerCloseButton, "click", function () {
      return _this4._closeDrawer();
    }));
  },
  _openDrawer: function _openDrawer() {
    u$1(this.mobileDrawer, classes$5.drawerActive);
    document.body.setAttribute("data-fluorescent-overlay-open", "true");
    disableBodyScroll(this.mobileDrawer);

    this._showWash();
  },
  _showWash: function _showWash() {
    u$1(this.wash, classes$5.active);
  },
  _closeDrawer: function _closeDrawer() {
    if (this.mobileDrawer) {
      i$1(this.mobileDrawer, classes$5.drawerActive);
      document.body.setAttribute("data-fluorescent-overlay-open", "false");
      enableBodyScroll(this.mobileDrawer);
    }

    this._closeAll();
  },
  _hotspotClickHandler: function _hotspotClickHandler(e) {
    var wrapper = e.currentTarget.parentNode.parentNode;
    var hotspotIndex = parseInt(wrapper.dataset.index, 10);

    this._activateHotspot(hotspotIndex);
  },
  _clickOutsideHandler: function _clickOutsideHandler(e) {
    if (!e.target.closest(selectors$d.productCard) && !a$1(e.target, "shoppable-item__hotspot")) {
      this._closeAll();
    }
  },
  _closeAll: function _closeAll() {
    this.productCards.forEach(function (card) {
      u$1(card, classes$5.hidden);
      card.setAttribute("aria-hidden", true);
    });
    this.hotspotContainers.forEach(function (spot) {
      return i$1(spot, classes$5.active);
    });
    i$1(this.wash, classes$5.active);
  },
  onBlockDeselect: function onBlockDeselect() {
    this._closeAll();
  },
  onBlockSelect: function onBlockSelect(_ref4) {
    var el = _ref4.target;
    var index = parseInt(el.dataset.index, 10);

    if (this.swiper) {
      this.swiper.slideToLoop(index);
    } else {
      this._activateHotspot(index);
    }
  },
  onUnload: function onUnload() {
    var _this$swiper2, _this$widthWatcher, _this$animateShoppabl, _this$animateShoppabl2;

    (_this$swiper2 = this.swiper) === null || _this$swiper2 === void 0 ? void 0 : _this$swiper2.destroy();
    (_this$widthWatcher = this.widthWatcher) === null || _this$widthWatcher === void 0 ? void 0 : _this$widthWatcher.destroy();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$animateShoppabl = this.animateShoppableImage) === null || _this$animateShoppabl === void 0 ? void 0 : _this$animateShoppabl.destroy();
    (_this$animateShoppabl2 = this.animateShoppableFeature) === null || _this$animateShoppabl2 === void 0 ? void 0 : _this$animateShoppabl2.destroy();
    this.pulseInterval && clearInterval(this.pulseInterval);
  }
});

var selectors$c = {
  video: "video",
  quickViewTrigger: "[data-quick-view-trigger]"
};
register("complete-the-look", {
  videoHandler: null,
  onLoad: function onLoad() {
    var video = n$2(selectors$c.video, this.container);

    if (video) {
      this.videoHandler = backgroundVideoHandler(this.container);
    }

    this.events = [e$2(t$2(selectors$c.quickViewTrigger, this.container), "click", function (e) {
      var productUrl = e.target.dataset.productUrl;
      if (!productUrl) return;
      r$1("quick-view:open", null, {
        productUrl: productUrl
      });
    })];

    if (shouldAnimate(this.container)) {
      this.animateCompleteTheLook = animateCompleteTheLook(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateComplete;

    this.videoHandler && this.videoHandler();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$animateComplete = this.animateCompleteTheLook) === null || _this$animateComplete === void 0 ? void 0 : _this$animateComplete.destroy();
  }
});

var selectors$b = {
  playButtonVideo: "[data-play-button-block-video]",
  playButtonBlock: ".play-button-block"
};
register("rich-text", {
  onLoad: function onLoad() {
    var playButtonVideos = t$2(selectors$b.playButtonVideo, this.container);

    if (playButtonVideos.length) {
      this.playButtons = playButtonVideos.map(function (block) {
        return playButton(block.closest(selectors$b.playButtonBlock));
      });
    }

    if (shouldAnimate(this.container)) {
      this.animateRichText = animateRichText(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateRichText;

    this.playButtons && this.playButtons.forEach(function (button) {
      return button.unload();
    });
    (_this$animateRichText = this.animateRichText) === null || _this$animateRichText === void 0 ? void 0 : _this$animateRichText.destroy();
  }
});

var selectors$a = {
  imageContainer: ".image-compare__image-container",
  labelContainer: ".image-compare__label-container",
  slider: ".image-compare__slider"
};
register("image-compare", {
  onLoad: function onLoad() {
    this.events = [];

    this._initSliders();

    if (shouldAnimate(this.container)) {
      this.animateImageCompare = animateImageCompare(this.container);
    }
  },
  _initSliders: function _initSliders() {
    var _this = this;

    this.imageContainer = n$2(selectors$a.imageContainer, this.container);
    this.labelContainers = t$2(selectors$a.labelContainer, this.container);
    this.slider = n$2(selectors$a.slider, this.container); // Check if slider exists (must be some blocks to exist)

    this.slider && this.events.push(e$2(this.slider, "input", function (e) {
      return _this.imageContainer.style.setProperty("--position", "".concat(e.target.value, "%"));
    }), e$2(this.slider, "mousedown", function () {
      return _this.hideLabelContainers();
    }), e$2(this.slider, "touchstart", function () {
      return _this.hideLabelContainers();
    }), e$2(this.slider, "mouseup", function () {
      return _this.showLabelContainers();
    }), e$2(this.slider, "touchend", function () {
      return _this.showLabelContainers();
    }));
  },
  hideLabelContainers: function hideLabelContainers() {
    this.labelContainers.forEach(function (e) {
      e.style.setProperty("opacity", "0");
    });
  },
  showLabelContainers: function showLabelContainers() {
    this.labelContainers.forEach(function (e) {
      e.style.setProperty("opacity", "1");
    });
  },
  onUnload: function onUnload() {
    var _this$animateImageCom;

    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$animateImageCom = this.animateImageCompare) === null || _this$animateImageCom === void 0 ? void 0 : _this$animateImageCom.destroy();
  }
});

var selectors$9 = {
  playButtonVideo: "[data-play-button-block-video]",
  playButtonBlock: ".play-button-block"
};
register("image-with-text", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateImageWithText = animateImageWithText(this.container);
    }

    var playButtonVideos = t$2(selectors$9.playButtonVideo, this.container);

    if (playButtonVideos.length) {
      this.playButtons = playButtonVideos.map(function (block) {
        return playButton(block.closest(selectors$9.playButtonBlock));
      });
    }
  },
  onUnload: function onUnload() {
    var _this$animateImageWit;

    (_this$animateImageWit = this.animateImageWithText) === null || _this$animateImageWit === void 0 ? void 0 : _this$animateImageWit.destroy();
    this.playButtons && this.playButtons.forEach(function (button) {
      return button.unload();
    });
  }
});

var selectors$8 = {
  playButtonVideo: "[data-play-button-block-video]",
  playButtonBlock: ".play-button-block"
};
register("image-with-text-split", {
  onLoad: function onLoad() {
    var playButtonVideos = t$2(selectors$8.playButtonVideo, this.container);

    if (playButtonVideos.length) {
      this.playButtons = playButtonVideos.map(function (block) {
        return playButton(block.closest(selectors$8.playButtonBlock));
      });
    }

    if (shouldAnimate(this.container)) {
      this.animateImageWithTextSplit = animateImageWithTextSplit(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateImageWit;

    this.playButtons && this.playButtons.forEach(function (button) {
      return button.unload();
    });
    (_this$animateImageWit = this.animateImageWithTextSplit) === null || _this$animateImageWit === void 0 ? void 0 : _this$animateImageWit.destroy();
  }
});

var selectors$7 = {
  playButtonVideo: "[data-play-button-block-video]",
  playButtonBlock: ".play-button-block"
};
register("image-hero", {
  onLoad: function onLoad() {
    var playButtonVideos = t$2(selectors$7.playButtonVideo, this.container);

    if (playButtonVideos.length) {
      this.playButtons = playButtonVideos.map(function (block) {
        return playButton(block.closest(selectors$7.playButtonBlock));
      });
    }

    if (shouldAnimate(this.container)) {
      this.animateImageHero = animateImageHero(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateImageHer;

    this.playButtons && this.playButtons.forEach(function (button) {
      return button.unload();
    });
    (_this$animateImageHer = this.animateImageHero) === null || _this$animateImageHer === void 0 ? void 0 : _this$animateImageHer.destroy();
  }
});

register("image-hero-split", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      // Setup animations per item
      t$2(".animation--item", this.container).forEach(function (item) {
        return animateImageHeroSplit(item);
      });
    }

    this.observer = intersectionWatcher(this.container);
  },
  onUnload: function onUnload() {
    var _this$observer;

    this.playButtons && this.playButtons.forEach(function (button) {
      return button.unload();
    });
    (_this$observer = this.observer) === null || _this$observer === void 0 ? void 0 : _this$observer.destroy();
  }
});

var selectors$6 = {
  item: ".testimonials__item",
  swiper: ".swiper",
  navigationNext: ".testimonials__navigation-button--next",
  navigationPrev: ".testimonials__navigation-button--prev",
  navigationDots: ".slideshow-navigation__dots",
  navigationDot: ".slideshow-navigation__dot",
  navigationLoader: ".slideshow-navigation__dot-loader",
  activeDot: "slideshow-navigation__dot--active",
  productImage: ".testimonials__item-product-image"
};
register("testimonials", {
  onLoad: function onLoad() {
    var _this = this;

    this.events = [];
    this.items = t$2(selectors$6.item, this.container);
    this.itemsContainer = n$2(selectors$6.swiper, this.container);

    if (shouldAnimate(this.container)) {
      this.itemAnimations = this.items.map(function (item) {
        return animateTestimonials(item);
      });
      this.observer = intersectionWatcher(this.container);
    }

    if (this.items.length > 1) {
      import(flu.chunks.swiper).then(function (_ref) {
        var Swiper = _ref.Swiper,
            Navigation = _ref.Navigation,
            Pagination = _ref.Pagination,
            EffectFade = _ref.EffectFade;
        var swiperOptions = {
          modules: [Navigation, Pagination, EffectFade],
          autoHeight: true,
          slidesPerView: 1,
          effect: "fade",
          loop: true,
          fadeEffect: {
            crossFade: true
          },
          grabCursor: true,
          navigation: {
            nextEl: selectors$6.navigationNext,
            prevEl: selectors$6.navigationPrev
          },
          pagination: {
            el: selectors$6.navigationDots,
            clickable: true,
            bulletActiveClass: selectors$6.activeDot,
            bulletClass: "slideshow-navigation__dot",
            renderBullet: function renderBullet(_, className) {
              return "\n                <button class=\"".concat(className, "\" type=\"button\">\n                  <div class=\"slideshow-navigation__dot-loader\"></div>\n                </button>");
            }
          },
          breakpoints: {
            720: {
              spaceBetween: 150
            }
          },
          on: {
            afterInit: function afterInit() {
              _this.handleBulletLabels();
            },
            slideChangeTransitionEnd: function slideChangeTransitionEnd() {
              var slideEls = this.slides;
              setTimeout(function () {
                slideEls.forEach(function (slide) {
                  slide.toggleAttribute("inert", !slide.classList.contains("swiper-slide-active"));
                });
              }, 50);
            }
          }
        }; // We use fade for desktop size animatiosn and slide for under
        // 720px

        if (window.matchMedia(getMediaQuery("below-720")).matches) {
          swiperOptions.effect = "slide";
          swiperOptions.slidesPerView = "auto";
        }

        _this.carousel = new Swiper(_this.itemsContainer, swiperOptions);

        _this.setMobileButtonOffset();

        r$1("testimonials:initialized");
      });
    } else if (this.items.length === 1) {
      u$1(this.items[0], "swiper-slide-visible");
    }
  },
  setMobileButtonOffset: function setMobileButtonOffset() {
    // Mobile paddles should vertically center on the image instead of the item
    var firstImage = n$2(selectors$6.productImage, this.container);
    var mobileButtonHeight = 34;
    var halfMobileButtonHeight = mobileButtonHeight / 2;
    var halfImageHeight = firstImage.offsetHeight / 2;
    var offset = halfImageHeight + halfMobileButtonHeight;
    this.container.style.setProperty("--mobile-button-offset", "".concat(offset, "px"));
  },
  handleBlockSelect: function handleBlockSelect(slideIndex) {
    this.carousel.slideToLoop(parseInt(slideIndex, 10));
  },
  handleBulletLabels: function handleBulletLabels() {
    var _this2 = this;

    var bullets = t$2(selectors$6.navigationDot, this.container);
    bullets.forEach(function (bullet, index) {
      var associatedSlide = _this2.slides[index];
      var bulletLabel = associatedSlide.dataset.bulletLabel;
      bullet.setAttribute("aria-label", bulletLabel);
    });
  },
  onBlockSelect: function onBlockSelect(_ref2) {
    var _this2 = this;

    var target = _ref2.target;
    var index = target.dataset.index;

    if (this.carousel) {
      this.handleBlockSelect(index);
    } else {
      // Listen for initalization if carousel does not exist
      this.events.push(c("testimonials:initialized", function () {
        _this2.handleBlockSelect(index);
      }));
    }
  },
  onUnload: function onUnload() {
    var _this$observer;

    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$observer = this.observer) === null || _this$observer === void 0 ? void 0 : _this$observer.destroy();
  }
});

register("sales-banner", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateSalesBanner = animateSalesBanner(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateSalesBan;

    (_this$animateSalesBan = this.animateSalesBanner) === null || _this$animateSalesBan === void 0 ? void 0 : _this$animateSalesBan.destroy();
  }
});

register("promotion-bar", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animatePromotionBar = animatePromotionBar(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animatePromotio;

    (_this$animatePromotio = this.animatePromotionBar) === null || _this$animatePromotio === void 0 ? void 0 : _this$animatePromotio.destroy();
  }
});

register("grid", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateGrid = animateGrid(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateGrid;

    (_this$animateGrid = this.animateGrid) === null || _this$animateGrid === void 0 ? void 0 : _this$animateGrid.destroy();
  }
});

register("collection-list-grid", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateCollectionListGrid = animateCollectionListGrid(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCollecti;

    (_this$animateCollecti = this.animateCollectionListGrid) === null || _this$animateCollecti === void 0 ? void 0 : _this$animateCollecti.destroy();
  }
});

register("contact-form", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateContactForm = animateContactForm(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateContactF;

    (_this$animateContactF = this.animateContactForm) === null || _this$animateContactF === void 0 ? void 0 : _this$animateContactF.destroy();
  }
});

register("multi-column", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateMultiColumn = animateMultiColumn(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateMultiCol;

    (_this$animateMultiCol = this.animateMultiColumn) === null || _this$animateMultiCol === void 0 ? void 0 : _this$animateMultiCol.destroy();
  }
});

register("newsletter", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateNewsletter = animateNewsletter(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateNewslett;

    (_this$animateNewslett = this.animateNewsletter) === null || _this$animateNewslett === void 0 ? void 0 : _this$animateNewslett.destroy();
  }
});

register("newsletter-compact", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateNewsletterCompact = animateNewsletterCompact(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateNewslett;

    (_this$animateNewslett = this.animateNewsletterCompact) === null || _this$animateNewslett === void 0 ? void 0 : _this$animateNewslett.destroy();
  }
});

var selectors$5 = {
  listContainer: "[data-events-eventbrite-container]",
  skeletonList: ".events__list--skeleton"
};
var endpoints = {
  org: function org(token) {
    return "https://www.eventbriteapi.com//v3/users/me/organizations/?token=".concat(token);
  },
  events: function events(id, token) {
    return "https://www.eventbriteapi.com//v3/organizations/".concat(id, "/events/?token=").concat(token, "&expand=venue&status=live");
  }
};
register("events", {
  onLoad: function onLoad() {
    this.accessToken = this.container.dataset.accessToken;
    this.eventCount = parseInt(this.container.dataset.eventCount, 10);
    this.imageAspectRatio = this.container.dataset.imageAspectRatio;
    this.learnMoreText = this.container.dataset.learnMoreText;

    this._fetchOrg();

    if (shouldAnimate(this.container)) {
      this.animateEvents = animateEvents(this.container);
      if (!this.accessToken) this.animateEvents.animateEventItems();
    }
  },

  /**
   * _fetchOrg gets the eventbrite organization data for this user
   */
  _fetchOrg: function _fetchOrg() {
    var _this = this;

    if (!this.accessToken) return;
    fetch(endpoints.org(this.accessToken)).then(function (res) {
      return res.json();
    }).then(function (res) {
      _this._fetchEvents(res.organizations[0].id);
    });
  },

  /**
   * _fetchEvents gets the eventbrite events for this user
   * @param {number} id organization id
   */
  _fetchEvents: function _fetchEvents(id) {
    var _this2 = this;

    if (!id) return;
    fetch(endpoints.events(id, this.accessToken)).then(function (res) {
      return res.json();
    }).then(function (events) {
      _this2._renderEvents(events.events);
    });
  },

  /**
   * _renderEvents adds the event elements on the page
   * @param {array} events array of event objects
   */
  _renderEvents: function _renderEvents(events) {
    var _this3 = this;

    var listContainer = n$2(selectors$5.listContainer, this.container);
    var skeletonList = n$2(selectors$5.skeletonList, this.container); // Build a list of events

    var list = document.createElement("ul");
    list.className = "events__list";
    events.slice(0, this.eventCount).forEach(function (event) {
      list.innerHTML += _this3._renderEventItem(event);
    }); // Append the list to the container on the page

    u$1(skeletonList, "hide");
    setTimeout(function () {
      listContainer.textContent = "";
      listContainer.appendChild(list);

      if (shouldAnimate(_this3.container)) {
        _this3.animateEvents.animateEventItems();
      }
    }, 300);
  },

  /**
   * _renderEventItem builds the html needed for an event item with the event data
   * @param {obj} event the event data
   * @returns eventItem
   */
  _renderEventItem: function _renderEventItem(event) {
    var _event$logo;

    var eventItem = "\n      <li\n        class=\"\n          event-item\n          event-item--eventbrite\n          ".concat((_event$logo = event.logo) !== null && _event$logo !== void 0 && _event$logo.url ? "event-item--has-image" : "", "\n        \"\n      >\n        <a href=\"").concat(event.url, "\" class=\"event-item__link\">\n          <div class=\"event-item__image-wrapper\">\n            ").concat(this._renderImage(event), "\n            ").concat(this._renderDateBadge(event), "\n          </div>\n          <div class=\"event-item__details\">\n            ").concat(this._renderName(event), "\n            ").concat(this._renderDate(event), "\n            ").concat(this._renderVenue(event), "\n            ").concat(this._renderSummary(event), "\n            <span class=\"btn btn--callout event-item__callout\">\n              <span>").concat(this.learnMoreText, "</span>\n            </span>\n          </div>\n        </a>\n      </li>\n    ");
    return eventItem;
  },
  _renderImage: function _renderImage(event) {
    var _event$logo2;

    var image = "";

    if ((_event$logo2 = event.logo) !== null && _event$logo2 !== void 0 && _event$logo2.url) {
      image = "\n        <div class=\"image ".concat(this.imageAspectRatio, " event-item__image image--animate animation--lazy-load\">\n          <div class=\"image__inner\">\n            <img\n              src=\"").concat(event.logo.url, "\"\n              alt=\"").concat(event.name.text, "\"\n              loading=\"lazy\"\n              class=\"image__img\"\n              onload=\"javascript: this.closest('.image').classList.add('loaded')\"\n            >\n          </div>\n        </div>\n      ");
    }

    return image;
  },
  _renderDateBadge: function _renderDateBadge(event) {
    var _event$start;

    var html = "";

    if ((_event$start = event.start) !== null && _event$start !== void 0 && _event$start.local) {
      var date = new Date(event.start.local);
      html = "\n        <span class=\"event-item__date-badge\">\n          <span class=\"event-item__date-badge-day fs-body-bold fs-body-200\">\n            ".concat(new Intl.DateTimeFormat([], {
        day: "numeric"
      }).format(date), "\n          </span>\n          <span class=\"event-item__date-badge-month fs-accent\">\n            ").concat(new Intl.DateTimeFormat([], {
        month: "short"
      }).format(date), "\n          </span>\n        </span>\n      ");
    }

    return html;
  },
  _renderName: function _renderName(event) {
    var _event$name;

    var html = "";

    if ((_event$name = event.name) !== null && _event$name !== void 0 && _event$name.text) {
      html = "\n        <h4 class=\"event-item__name ff-heading fs-heading-5-base\">\n          ".concat(event.name.text, "\n        </h4>\n      ");
    }

    return html;
  },
  _renderDate: function _renderDate(event) {
    var _event$start2;

    var html = "";

    if ((_event$start2 = event.start) !== null && _event$start2 !== void 0 && _event$start2.local) {
      var date = new Date(event.start.local);
      html = "\n        <p class=\"event-item__date fs-body-75\">\n          ".concat(date.toLocaleDateString([], {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      }), "\n          ").concat(date.toLocaleTimeString([], {
        timeZone: event.start.timezone,
        hour: "numeric",
        minute: "2-digit"
      }), "\n        </p>\n      ");
    }

    return html;
  },
  _renderVenue: function _renderVenue(event) {
    var _event$venue;

    var html = "";

    if ((_event$venue = event.venue) !== null && _event$venue !== void 0 && _event$venue.name) {
      html = "\n        <p class=\"event-item__venue fs-body-75\">\n          ".concat(event.venue.name, "\n        </p>\n      ");
    }

    return html;
  },
  _renderSummary: function _renderSummary(event) {
    var html = "";

    if (event.summary) {
      html = "\n        <p class=\"event-item__summary\">\n          ".concat(event.summary, "\n        </p>\n      ");
    }

    return html;
  },
  onUnload: function onUnload() {
    var _this$animateEvents;

    (_this$animateEvents = this.animateEvents) === null || _this$animateEvents === void 0 ? void 0 : _this$animateEvents.destroy();
  }
});

register("promo-banner", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animatePromoBanner = animatePromoBanner(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animatePromoBan;

    (_this$animatePromoBan = this.animatePromoBanner) === null || _this$animatePromoBan === void 0 ? void 0 : _this$animatePromoBan.destroy();
  }
});

var selectors$4 = {
  tabLabels: "[data-tab-label]",
  tabItems: "[data-tab-item]",
  tabList: "[data-tab-list]",
  activeTabItem: "[data-tab-item][aria-hidden='false']"
};
register("product-tabs", {
  onLoad: function onLoad() {
    var _this = this;

    this.accordions = [];
    this.tabItems = t$2(selectors$4.tabItems, this.container);
    this.tabLabels = t$2(selectors$4.tabLabels, this.container);
    this.tabList = n$2(selectors$4.tabList, this.container);
    this.activeTabItem = n$2(selectors$4.activeTabItem, this.container);

    if (this.activeTabItem) {
      this._setTabHeight(this.activeTabItem);
    }

    this.clickHandlers = e$2(this.tabLabels, "click", function (e) {
      e.preventDefault();
      var contentID = e.currentTarget.getAttribute("aria-controls");
      var content = n$2("#".concat(contentID), _this.container);

      _this._closeAll();

      _this._open(e.currentTarget, content);
    });
    var accordionElements = t$2(".accordion", this.container);
    accordionElements.forEach(function (accordion) {
      var accordionOpen = accordion.classList.contains("accordion--open");

      _this.accordions.push(Accordions(accordion, {
        firstOpen: accordionOpen
      }));

      accordion.classList.add("rte--product", "accordion--product");
    });

    if (shouldAnimate(this.container)) {
      this.animateProductTabs = animateProductTabs(this.container);
    }
  },
  _closeAll: function _closeAll() {
    var _this2 = this;

    this.tabLabels.forEach(function (label) {
      var contentID = label.getAttribute("aria-controls");
      var content = n$2("#".concat(contentID), _this2.container);

      if (_this2._isVisible(content)) {
        _this2._close(label, content);
      }
    });
  },
  _open: function _open(label, content) {
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);

    this._setTabHeight(content);
  },
  _close: function _close(label, content) {
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  },
  _isVisible: function _isVisible(content) {
    return content.getAttribute("aria-hidden") === "false";
  },
  _setTabHeight: function _setTabHeight(content) {
    var height = content.offsetHeight;
    this.tabList.style.height = "".concat(height, "px");
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var contentID = target.getAttribute("aria-controls");
    var content = n$2("#".concat(contentID), this.container);

    this._closeAll();

    this._open(target, content);
  },
  onUnload: function onUnload() {
    var _this$animateProductT;

    this.clickHandlers();
    this.accordions.forEach(function (accordion) {
      return accordion.unload();
    });
    (_this$animateProductT = this.animateProductTabs) === null || _this$animateProductT === void 0 ? void 0 : _this$animateProductT.destroy();
  }
});

register("apps", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateApps = animateApps(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateApps;

    (_this$animateApps = this.animateApps) === null || _this$animateApps === void 0 ? void 0 : _this$animateApps.destroy();
  }
});

var selectors$3 = {
  cartError: ".cart__form-item-error",
  cartNoteTrigger: "[data-order-note-trigger]",
  cartUpdateButton: ".cart__update",
  quantityInput: ".cart .quantity-input__input",
  quantityItem: "[data-input-item]",
  freeShippingBar: "[data-free-shipping-bar]",
  crossSells: "[data-cross-sells]"
};
var classes$4 = {
  updatingQuantity: "has-quantity-update",
  removed: "is-removed"
};
register("cart", {
  onLoad: function onLoad() {
    var _this = this;

    var cartNoteTrigger = n$2(selectors$3.cartNoteTrigger, this.container);
    var freeShippingBar$1 = n$2(selectors$3.freeShippingBar, this.container);

    if (freeShippingBar$1) {
      freeShippingBar(freeShippingBar$1);
    }

    this._initCrossSells();

    if (cartNoteTrigger) this.cartNoteToggle = CartNoteToggle(this.container);
    this.quantityButtons = QuantityButtons(this.container); // Events are all on events trigger by other components / functions

    this.events = [c("cart:updated", function () {
      return _this.refreshCart();
    }), c("cart:error", function (_, _ref) {
      var key = _ref.key,
          errorMessage = _ref.errorMessage;

      _this.handleErrorMessage(key, errorMessage);
    }), c(["quantity-update:subtract", "quantity-update:add"], function (_, _ref2) {
      var key = _ref2.key;

      _this.handleQuantityUpdate(key);
    }), c("quantity-update:remove", function (_, _ref3) {
      var key = _ref3.key;

      _this.handleItemRemoval(key);
    })]; // Delegate handles all click events due to rendering different content
    // within cart

    this.delegate = new Delegate(this.container);
    this.delegate.on("change", selectors$3.quantityInput, function (e) {
      return _this.handleQuantityInputChange(e);
    });
  },
  refreshCart: function refreshCart() {
    var _this2 = this;

    var url = "".concat(theme.routes.cart.base, "?section_id=main-cart");
    makeRequest("GET", url).then(function (response) {
      var _window$Shopify;

      var container = document.createElement("div");
      container.innerHTML = response;
      _this2.container.innerHTML = container.innerHTML;

      if ((_window$Shopify = window.Shopify) !== null && _window$Shopify !== void 0 && _window$Shopify.StorefrontExpressButtons) {
        window.Shopify.StorefrontExpressButtons.initialize();
      }

      var freeShippingBar$1 = n$2(selectors$3.freeShippingBar, _this2.container);

      if (freeShippingBar$1) {
        freeShippingBar(freeShippingBar$1);
      }

      _this2._initCrossSells();
    });
  },
  handleErrorMessage: function handleErrorMessage(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    i$1(n$2(selectors$3.cartError, item), "hidden");
    i$1(item, classes$4.updatingQuantity);
  },
  handleQuantityInputChange: function handleQuantityInputChange(_ref4) {
    var target = _ref4.target;
    var item = target.closest(selectors$3.quantityItem);
    var key = item.dataset.key;
    cart.updateItem(key, target.value);
    this.handleQuantityUpdate(key);
  },
  handleQuantityUpdate: function handleQuantityUpdate(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    u$1(item, classes$4.updatingQuantity);
  },
  handleItemRemoval: function handleItemRemoval(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    u$1(item, classes$4.removed);
    u$1(item, classes$4.updatingQuantity);
  },
  _initCrossSells: function _initCrossSells() {
    var crossSells = n$2(selectors$3.crossSells, this.container);

    if (crossSells) {
      this.crossSells = CrossSells(crossSells);
    }
  },
  onUnload: function onUnload() {
    var _this$cartNoteToggle;

    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    this.quantityButtons.unload();
    (_this$cartNoteToggle = this.cartNoteToggle) === null || _this$cartNoteToggle === void 0 ? void 0 : _this$cartNoteToggle.unload();
  }
});

register("product", {
  onLoad: function onLoad() {
    const container = this.container.classList.contains("quick-product")? this.container : this.container.querySelector(".product-info-wrapper");
    // console.log(this.container);
    this.product = new Product(this.container);
    this.animateProduct = animateProduct(this.container);
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var label = n$2(".accordion__label", target);
    target.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
    if (!label) return;
    var group = label.parentNode,
        content = label.nextElementSibling;
    slideStop(content);
    slideDown(content);
    group.setAttribute("data-open", true);
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
  },
  onBlockDeselect: function onBlockDeselect(_ref2) {
    var target = _ref2.target;
    var label = n$2(".accordion__label", target);
    if (!label) return;
    var group = label.parentNode,
        content = label.nextElementSibling;
    slideStop(content);
    slideUp(content);
    group.setAttribute("data-open", false);
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  },
  onUnload: function onUnload() {
    var _this$animateProduct;

    this.product.unload();
    (_this$animateProduct = this.animateProduct) === null || _this$animateProduct === void 0 ? void 0 : _this$animateProduct.destroy();
  }
});

/* @preserve
 * https://github.com/Elkfox/Ajaxinate
 * Copyright (c) 2017 Elkfox Co Pty Ltd (elkfox.com)
 * MIT License (do not remove above copyright!)
 */

/* Configurable options;
 *
 * method: scroll or click
 * container: selector of repeating content
 * pagination: selector of pagination container
 * offset: number of pixels before the bottom to start loading more on scroll
 * loadingText: 'Loading', The text shown during when appending new content
 * callback: null, callback function after new content is appended
 *
 * Usage;
 *
 * import {Ajaxinate} from 'ajaxinate';
 *
 * new Ajaxinate({
 *   offset: 5000,
 *   loadingText: 'Loading more...',
 * });
 */

/* eslint-env browser */
function Ajaxinate(config) {
  const settings = config || {};

  const defaults = {
    method: "scroll",
    container: "#AjaxinateContainer",
    pagination: "#AjaxinatePagination",
    offset: 0,
    loadingText: "Loading",
    callback: null,
  };

  // Merge custom configs with defaults
  this.settings = Object.assign(defaults, settings);

  // Functions
  this.addScrollListeners = this.addScrollListeners.bind(this);
  this.addClickListener = this.addClickListener.bind(this);
  this.checkIfPaginationInView = this.checkIfPaginationInView.bind(this);
  this.preventMultipleClicks = this.preventMultipleClicks.bind(this);
  this.removeClickListener = this.removeClickListener.bind(this);
  this.removeScrollListener = this.removeScrollListener.bind(this);
  this.removePaginationElement = this.removePaginationElement.bind(this);
  this.destroy = this.destroy.bind(this);

  // Selectors
  this.containerElement = document.querySelector(this.settings.container);
  this.paginationElement = document.querySelector(this.settings.pagination);
  this.initialize();
}

Ajaxinate.prototype.initialize = function initialize() {
  if (!this.containerElement) {
    return;
  }

  const initializers = {
    click: this.addClickListener,
    scroll: this.addScrollListeners,
  };

  initializers[this.settings.method]();
};

Ajaxinate.prototype.addScrollListeners = function addScrollListeners() {
  if (!this.paginationElement) {
    return;
  }

  document.addEventListener("scroll", this.checkIfPaginationInView);
  window.addEventListener("resize", this.checkIfPaginationInView);
  window.addEventListener("orientationchange", this.checkIfPaginationInView);
};

Ajaxinate.prototype.addClickListener = function addClickListener() {
  if (!this.paginationElement) {
    return;
  }

  this.nextPageLinkElement = this.paginationElement.querySelector("a");
  this.clickActive = true;

  if (
    typeof this.nextPageLinkElement !== "undefined" &&
    this.nextPageLinkElement !== null
  ) {
    this.nextPageLinkElement.addEventListener(
      "click",
      this.preventMultipleClicks
    );
  }
};

Ajaxinate.prototype.preventMultipleClicks = function preventMultipleClicks(
  event
) {
  event.preventDefault();

  if (!this.clickActive) {
    return;
  }

  this.nextPageLinkElement.innerText = this.settings.loadingText;
  this.nextPageUrl = this.nextPageLinkElement.href;
  this.clickActive = false;

  this.loadMore();
};

Ajaxinate.prototype.checkIfPaginationInView = function checkIfPaginationInView() {
  const top =
    this.paginationElement.getBoundingClientRect().top - this.settings.offset;
  const bottom =
    this.paginationElement.getBoundingClientRect().bottom +
    this.settings.offset;

  if (top <= window.innerHeight && bottom >= 0) {
    this.nextPageLinkElement = this.paginationElement.querySelector("a");
    this.removeScrollListener();

    if (this.nextPageLinkElement) {
      this.nextPageLinkElement.innerText = this.settings.loadingText;
      this.nextPageUrl = this.nextPageLinkElement.href;

      this.loadMore();
    }
  }
};

Ajaxinate.prototype.loadMore = function getTheHtmlOfTheNextPageWithAnAjaxRequest() {
  this.request = new XMLHttpRequest();
  this.request.onreadystatechange = function success() {
    if (this.request.readyState === 4 && this.request.status === 200) {
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(
        this.request.responseText,
        "text/html"
      );
      var newContainer = htmlDoc.querySelectorAll(this.settings.container)[0];
      var newPagination = htmlDoc.querySelectorAll(this.settings.pagination)[0];
      this.containerElement.insertAdjacentHTML(
        "beforeend",
        newContainer.innerHTML
      );
      this.paginationElement.innerHTML = newPagination.innerHTML;
      if (
        this.settings.callback &&
        typeof this.settings.callback === "function"
      ) {
        this.settings.callback(this.request.responseXML);
      }
      this.initialize();
    }
  }.bind(this);
  this.request.open("GET", this.nextPageUrl, false);
  this.request.send();
};

Ajaxinate.prototype.removeClickListener = function removeClickListener() {
  this.nextPageLinkElement.removeEventListener(
    "click",
    this.preventMultipleClicks
  );
};

Ajaxinate.prototype.removePaginationElement = function removePaginationElement() {
  this.paginationElement.innerHTML = "";
  this.destroy();
};

Ajaxinate.prototype.removeScrollListener = function removeScrollListener() {
  document.removeEventListener("scroll", this.checkIfPaginationInView);
  window.removeEventListener("resize", this.checkIfPaginationInView);
  window.removeEventListener("orientationchange", this.checkIfPaginationInView);
};

Ajaxinate.prototype.destroy = function destroy() {
  const destroyers = {
    click: this.removeClickListener,
    scroll: this.removeScrollListener,
  };

  destroyers[this.settings.method]();

  return this;
};

var filtering = function filtering(container) {
  var forms = t$2("[data-filter-form]", container);
  var formData, searchParams;
  setParams();

  function setParams(form) {
    form = form || forms[0];
    formData = new FormData(form);
    searchParams = new URLSearchParams(formData).toString();
  }
  /**
   * Takes the updated form element and updates all other forms with the updated values
   * @param {*} target
   */


  function syncForms(target) {
    if (!target) return;
    var targetInputs = t$2("[data-filter-item-input]", target);
    targetInputs.forEach(function (targetInput) {
      if (targetInput.type === "checkbox" || targetInput.type === "radio") {
        var valueEscaped = targetInput.dataset.valueEscaped;
        var items = t$2("input[name='".concat(targetInput.name, "'][data-value-escaped='").concat(valueEscaped, "']"));
        items.forEach(function (input) {
          input.checked = targetInput.checked;
        });
      } else {
        var _items = t$2("input[name='".concat(targetInput.name, "']"));

        _items.forEach(function (input) {
          input.value = targetInput.value;
        });
      }
    });
  }
  /**
   * When filters are removed, set the checked attribute to false
   * for all filter inputs for that filter.
   * Can accept multiple filters
   * @param {Array} targets Array of inputs
   */


  function uncheckFilters(targets) {
    if (!targets) return;
    var selector;
    targets.forEach(function (target) {
      selector = !selector ? "" : ", ".concat(selector);
      var _target$dataset = target.dataset,
          name = _target$dataset.name,
          valueEscaped = _target$dataset.valueEscaped;
      selector = "input[name='".concat(name, "'][data-value-escaped='").concat(valueEscaped, "']").concat(selector);
    });
    var inputs = t$2(selector, container);
    inputs.forEach(function (input) {
      input.checked = false;
    });
  }

  function clearRangeInputs() {
    var rangeInputs = t$2("[data-range-input]", container);
    rangeInputs.forEach(function (input) {
      input.value = "";
    });
  }

  function resetForms() {
    forms.forEach(function (form) {
      form.reset();
    });
  }

  return {
    getState: function getState() {
      return {
        url: searchParams
      };
    },
    filtersUpdated: function filtersUpdated(target, cb) {
      syncForms(target);
      setParams(target);
      r$1("filters:updated");
      return cb(this.getState());
    },
    removeFilters: function removeFilters(target, cb) {
      uncheckFilters(target);
      setParams();
      r$1("filters:filter-removed");
      return cb(this.getState());
    },
    removeRange: function removeRange(cb) {
      clearRangeInputs();
      setParams();
      return cb(this.getState());
    },
    clearAll: function clearAll(cb) {
      searchParams = "";
      resetForms();
      return cb(this.getState());
    }
  };
};

var FILTERS_REMOVE = "collection:filters:remove";
var RANGE_REMOVE = "collection:range:remove";
var EVERYTHING_CLEAR = "collection:clear";
var FILTERS_UPDATE = "collection:filters:update";
var updateFilters = function updateFilters(target) {
  return r$1(FILTERS_UPDATE, null, {
    target: target
  });
};
var removeFilters = function removeFilters(target) {
  return r$1(FILTERS_REMOVE, null, {
    target: target
  });
};
var filtersUpdated = function filtersUpdated(cb) {
  return c(FILTERS_UPDATE, cb);
};
var filtersRemoved = function filtersRemoved(cb) {
  return c(FILTERS_REMOVE, cb);
};
var everythingCleared = function everythingCleared(cb) {
  return c(EVERYTHING_CLEAR, cb);
};
var rangeRemoved = function rangeRemoved(cb) {
  return c(RANGE_REMOVE, cb);
};

var filterHandler = function filterHandler(_ref) {
  var container = _ref.container,
      renderCB = _ref.renderCB;
  var subscriptions = null;
  var filters = null;
  var delegate = null;
  filters = filtering(container); // Set initial evx state from collection url object

  o$1(filters.getState());
  subscriptions = [filtersRemoved(function (_, _ref2) {
    var target = _ref2.target;
    filters.removeFilters(target, function (data) {
      renderCB(data.url);
      o$1(data)();
    });
  }), rangeRemoved(function () {
    filters.removeRange(function (data) {
      renderCB(data.url);
      o$1(data)();
    });
  }), filtersUpdated(function (_, _ref3) {
    var target = _ref3.target;
    filters.filtersUpdated(target, function (data) {
      renderCB(data.url);
      o$1(data)();
    });
  }), everythingCleared(function () {
    filters.clearAll(function (data) {
      renderCB(data.url);
      o$1(data)();
    });
  })];
  delegate = new Delegate(container);
  delegate.on("click", "[data-remove-filter]", function (e) {
    e.preventDefault();
    removeFilters([e.target]);
  });
  window.addEventListener("popstate", onPopstate);

  function onPopstate() {
    var url = new URL(window.location);
    var searchParams = url.search.replace("?", "");
    renderCB(searchParams, false);
    o$1({
      url: searchParams
    });
  }

  var unload = function unload() {
    delegate && delegate.off();
    subscriptions && subscriptions.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    window.removeEventListener("popstate", onPopstate);
  };

  return {
    unload: unload
  };
};

var strings$2 = window.theme.strings;

var priceRange = function priceRange(container) {
  var inputs = t$2("input", container);
  var minInput = inputs[0];
  var maxInput = inputs[1];
  var events = [e$2(inputs, "change", onRangeChange)];
  var slider = n$2("[data-range-slider]", container);
  var min = Math.floor(minInput.value ? minInput.value : minInput.getAttribute("min"));
  var max = Math.floor(maxInput.value ? maxInput.value : maxInput.getAttribute("max"));
  import(flu.chunks.nouislider).then(function (_ref) {
    var noUiSlider = _ref.noUiSlider;
    noUiSlider.create(slider, {
      start: [minInput.value ? minInput.value : minInput.getAttribute("min"), maxInput.value ? maxInput.value : maxInput.getAttribute("max")],
      handleAttributes: [{
        "aria-label": strings$2.accessibility.range_lower
      }, {
        "aria-label": strings$2.accessibility.range_upper
      }],
      connect: true,
      range: {
        "min": parseInt(minInput.getAttribute("min")),
        "max": parseInt(maxInput.getAttribute("max"))
      }
    });
    slider.noUiSlider.on("slide", function (e) {
      var maxNew, minNew;

      var _e = _slicedToArray(e, 2);

      minNew = _e[0];
      maxNew = _e[1];
      minInput.value = Math.floor(minNew);
      maxInput.value = Math.floor(maxNew);
      setMinAndMaxValues();
    });
    slider.noUiSlider.on("set", function (e) {
      var maxNew, minNew;
      minNew = Math.floor(e[0]);
      maxNew = Math.floor(e[1]);

      if (minNew != min) {
        minInput.value = minNew;
        fireMinChangeEvent();
        min = Math.floor(minInput.value ? minInput.value : minInput.getAttribute("min"));
      }

      if (maxNew != max) {
        maxInput.value = maxNew;
        fireMaxChangeEvent();
        max = Math.floor(maxInput.value ? maxInput.value : maxInput.getAttribute("max"));
      }

      setMinAndMaxValues();
    });
    setMinAndMaxValues();
  });

  function setMinAndMaxValues() {
    if (maxInput.value) minInput.setAttribute("max", maxInput.value);
    if (minInput.value) maxInput.setAttribute("min", minInput.value);
    if (minInput.value === "") maxInput.setAttribute("min", 0);
    if (maxInput.value === "") minInput.setAttribute("max", maxInput.getAttribute("max"));
  }

  function adjustToValidValues(input) {
    var value = Number(input.value);
    var minNew = Number(input.getAttribute("min"));
    var maxNew = Number(input.getAttribute("max"));
    if (value < minNew) input.value = minNew;
    if (value > maxNew) input.value = maxNew;
  }

  function fireMinChangeEvent() {
    minInput.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }

  function fireMaxChangeEvent() {
    maxInput.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }

  function onRangeChange(event) {
    adjustToValidValues(event.currentTarget);
    setMinAndMaxValues();
    if (minInput.value === "" && maxInput.value === "") return;
    var currentMax, currentMin;

    var _slider$noUiSlider$ge = slider.noUiSlider.get();

    var _slider$noUiSlider$ge2 = _slicedToArray(_slider$noUiSlider$ge, 2);

    currentMin = _slider$noUiSlider$ge2[0];
    currentMax = _slider$noUiSlider$ge2[1];
    currentMin = Math.floor(currentMin);
    currentMax = Math.floor(currentMax);
    if (currentMin !== Math.floor(minInput.value)) slider.noUiSlider.set([minInput.value, null]);
    if (currentMax !== Math.floor(maxInput.value)) slider.noUiSlider.set([null, maxInput.value]);
  }

  function validateRange() {
    inputs.forEach(function (input) {
      return setMinAndMaxValues();
    });
  }

  var reset = function reset() {
    slider.noUiSlider.set([minInput.getAttribute("min"), maxInput.getAttribute("max")], false);
    minInput.value = "";
    maxInput.value = "";
    min = Math.floor(minInput.getAttribute("min"));
    max = Math.floor(maxInput.getAttribute("max"));
    setMinAndMaxValues();
  };

  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    slider.noUiSlider.destroy();
  };

  return {
    unload: unload,
    reset: reset,
    validateRange: validateRange
  };
};

/**
 * Takes a selector and replaces the element with the new element found in the updated document
 * @param {*} selector The selector to target
 * @param {*} doc The updated document returned by the fetch request
 */

function replaceElement(selector, doc) {
  var updatedItem = n$2(selector, doc);
  var oldItem = n$2(selector);

  if (updatedItem && oldItem) {
    oldItem.parentElement.replaceChild(updatedItem, oldItem);
  }
}

var sel$1 = {
  drawer: "[data-filter-drawer]",
  drawerTitle: "[data-filter-drawer-title]",
  filter: "[data-filter]",
  filterItem: "[data-filter-item]",
  filterTarget: "[data-filter-drawer-target]",
  flyouts: "[data-filter-modal]",
  button: "[data-button]",
  wash: "[data-drawer-wash]",
  sort: "[data-sort]",
  close: "[data-close-icon]",
  group: ".filter-drawer__group",
  groupToggle: "[data-drawer-group-toggle]",
  panel: ".filter-drawer__panel",
  flyoutWrapper: "[data-filer-modal-wrapper]",
  priceRange: "[data-price-range]",
  resultsCount: "[data-results-count]",
  activeFilters: "[data-active-filters]",
  activeFilterCount: "[data-active-filter-count]"
};
var classes$3 = {
  active: "active",
  activeFilters: "filters-active",
  fixed: "is-fixed",
  filterDisabled: "filter-item__content--disabled"
};

var filterDrawer = function filterDrawer(node) {
  if (!node) {
    return false;
  }

  var container = n$2(sel$1.drawer, node);

  if (!container) {
    return false;
  }

  var flyouts = t$2(sel$1.flyouts, container);
  var wash = n$2(sel$1.wash, container);
  var rangeInputs = t$2("[data-range-input]", container);
  var focusTrap = null;
  var range = null;
  var filterDrawerAnimation = null;

  if (shouldAnimate(node)) {
    filterDrawerAnimation = animateFilterDrawer(container);
  }

  var rangeContainer = n$2(sel$1.priceRange, container);

  if (rangeContainer) {
    range = priceRange(rangeContainer);
  }

  var events = [e$2(t$2(sel$1.filterTarget, node), "click", clickFlyoutTrigger), e$2(container, "change", changeHandler), e$2(wash, "click", clickWash), e$2(t$2("".concat(sel$1.button, ", ").concat(sel$1.clearAll), container), "click", clickButton), e$2(t$2(sel$1.close, container), "click", clickWash), e$2(container, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) clickWash();
  }), e$2(rangeInputs, "change", rangeChanged), c("filters:filter-removed", function () {
    return syncActiveStates();
  })];

  function changeHandler(e) {
    if (e.target.classList.contains("filter-item__checkbox")) {
      filterChange(e.target);
    } else if (e.target.classList.contains("filter-item__radio")) {
      sortChange(e);
    }
  }

  function clickFlyoutTrigger(e) {
    e.preventDefault();
    var filterDrawerTarget = e.currentTarget.dataset.filterDrawerTarget;
    var modal = n$2("[data-filter-modal=\"".concat(filterDrawerTarget, "\"]"), container);
    // focusTrap = createFocusTrap(modal, {
    //   allowOutsideClick: true
    // });
    u$1(container, classes$3.fixed);
    setTimeout(function () {
      if (shouldAnimate(node)) {
        filterDrawerAnimation.open(modal);
      }

      u$1(container, classes$3.active);
      u$1(modal, classes$3.active);
    }, 0);
    modal.setAttribute("aria-hidden", "false");
    // focusTrap.activate();
    // document.body.setAttribute("data-fluorescent-overlay-open", "true");
//     disableBodyScroll(node, {
//       allowTouchMove: function allowTouchMove(el) {
//         while (el && el !== document.body) {
//           if (el.getAttribute("data-scroll-lock-ignore") !== null) {
//             return true;
//           }
// 
//           el = el.parentNode;
//         }
//       },
//       reserveScrollBarGap: true
//     });
  }

  function clickWash(e) {
    e && e.preventDefault();
    focusTrap && focusTrap.deactivate();
    i$1(flyouts, classes$3.active);
    i$1(container, classes$3.active);
    flyouts.forEach(function (flyout) {
      return flyout.setAttribute("aria-hidden", "true");
    });
    document.body.setAttribute("data-fluorescent-overlay-open", "false");
    enableBodyScroll(node);
    setTimeout(function () {
      i$1(container, classes$3.fixed);

      if (shouldAnimate(node)) {
        filterDrawerAnimation.close(flyouts);
      }
    }, 500);
  }

  function filterChange(filter) {
    if (filter.classList.contains(classes$3.filterDisabled)) {
      return;
    }

    checkForActiveModalitems(filter);
    range && range.validateRange();
    debounce(function () {
      return updateFilters(container);
    }, 1000)();
  }

  function sortChange(e) {
    checkForActiveModalitems(e.target);
    range && range.validateRange();
    updateFilters(container);
  }

  function rangeChanged(e) {
    checkForActiveModalitems(e.currentTarget);
    var wrappingContainer = e.target.closest(sel$1.group);
    wrappingContainer && l(wrappingContainer, classes$3.activeFilters, rangeInputsHaveValue());
    updateFilters(container);
  }

  function clickButton(e) {
    e.preventDefault();
    var button = e.currentTarget.dataset.button;
    var scope = e.currentTarget.closest(sel$1.flyouts);
    var filterModal = scope.dataset.filterModal;

    if (button === "close") {
      clickWash();
    } // Sort flyouts


    if (filterModal === "__sort") {
      if (button === "clear-all") {
        t$2("[data-filter-modal=\"__sort\"] ".concat(sel$1.sort), container).forEach(function (element) {
          n$2("input", element).checked = false;
        });
        i$1(e.currentTarget.closest(sel$1.panel), classes$3.activeFilters);
      }
    } else {
      // Regular filter flyout
      if (button === "clear-all") {
        t$2("input", scope).forEach(function (input) {
          input.checked = false;
        });
        var panel = e.currentTarget.closest(sel$1.panel);
        i$1([].concat(_toConsumableArray$1(t$2(sel$1.group, panel)), [panel]), classes$3.activeFilters);
        range && range.reset();
        updateFilters(container);
      }

      if (button === "group_toggle") {
        var group = n$2("#".concat(e.currentTarget.getAttribute("aria-controls")));
        var ariaExpanded = e.currentTarget.getAttribute("aria-expanded") === "true";
        slideStop(group);

        if (ariaExpanded) {
          closeGroup(e.currentTarget, group);
        } else {
          openGroup(e.currentTarget, group);
        }
      }
    }
  }

  function openGroup(button, group) {
    slideDown(group);
    button.setAttribute("aria-expanded", true);
    group.setAttribute("aria-hidden", false);
  }

  function closeGroup(button, group) {
    slideUp(group);
    button.setAttribute("aria-expanded", false);
    group.setAttribute("aria-hidden", true);
  }

  function containsCheckedInputs(items) {
    return items.some(function (input) {
      return input.checked;
    });
  }

  function rangeInputsHaveValue() {
    return rangeInputs.some(function (input) {
      return input.value !== "";
    });
  }

  function checkForActiveModalitems(currentTarget) {
    var panel = currentTarget.closest(sel$1.panel);
    if (!panel) return;
    var activeItems = containsCheckedInputs(t$2("input", panel)) || rangeInputsHaveValue();
    l(panel, classes$3.activeFilters, activeItems);
  }

  function syncActiveStates() {
    var panels = t$2(sel$1.panel, container);
    panels.forEach(function (panel) {
      var activeItems = false;
      var rangeInputs = n$2("[data-range-input]", panel);

      if (containsCheckedInputs(t$2("input", panel))) {
        activeItems = true;
      }

      if (rangeInputs && rangeInputsHaveValue()) {
        activeItems = true;
      }

      l(panel, classes$3.activeFilters, activeItems);
    });
  }

  function renderFilters(doc) {
    var updatedFilterItems = t$2("".concat(sel$1.drawer, " ").concat(sel$1.filterItem), doc);
    updatedFilterItems.forEach(function (element) {
      replaceElement("".concat(sel$1.drawer, " ").concat(sel$1.filterItem, "[for=\"").concat(element.getAttribute("for"), "\"] .filter-item__checkbox"), doc);
      replaceElement("".concat(sel$1.drawer, " ").concat(sel$1.filterItem, "[for=\"").concat(element.getAttribute("for"), "\"] .filter-item__count"), doc);
    });
    var updatedGroupToggles = t$2("".concat(sel$1.drawer, " ").concat(sel$1.groupToggle), doc);
    updatedGroupToggles.forEach(function (element) {
      updateInnerHTML("".concat(sel$1.drawer, " [data-drawer-group-toggle=\"").concat(element.getAttribute("data-drawer-group-toggle"), "\"]"), doc);
    });
    updateInnerHTML("".concat(sel$1.drawer, " ").concat(sel$1.resultsCount), doc);
    updateInnerHTML("".concat(sel$1.drawer, " ").concat(sel$1.activeFilters), doc);
    updateInnerHTML("".concat(sel$1.drawer, " ").concat(sel$1.drawerTitle), doc);
    updateInnerHTML("[data-mobile-filters] [data-mobile-filters-toggle]", doc);
  }

  function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    range && range.unload();
  }

  return {
    renderFilters: renderFilters,
    unload: unload
  };
};

var sel = {
  bar: "[data-filter-bar]",
  filterItem: "[data-filter-item]",
  dropdownToggle: "[data-dropdown-toggle]",
  group: "[data-filter-group]",
  groupLabels: "[data-filter-group-label]",
  groupValues: "[data-filter-group-values]",
  groupReset: "[data-filter-group-reset]",
  groupHeader: "[data-group-values-header]",
  priceRange: "[data-price-range]",
  rangeInput: "[data-range-input]",
  removeRange: "[data-remove-range]",
  filterInputs: "[data-filter-item-input]",
  sortInputs: "[data-sort-item-input]",
  resultsCount: "[data-results-count]",
  activeFilters: "[data-active-filters]",
  clearAll: "[data-clear-all-filters]"
};
var classes$2 = {
  activeFilters: "filters-active",
  filterDisabled: "filter-item__content--disabled",
  filterBarActive: "filter-bar__filters-inner--active",
  filterBarWashActive: "filter-bar--wash-active",
  filterGroupActive: "filter-group--active",
  filterGroupRight: "filter-group__values--right"
}; // eslint-disable-next-line valid-jsdoc

/**
 * A class to handle desktop filter bar functionality
 * @param {*} node the collection section container
 * @returns renderFilters and unload methods
 */

var filterBar = function filterBar(node) {
  if (!node) {
    return false;
  } // `node` is the colelction section container.
  // Using `container` here as the filter bar container to keep filter bar
  // and filter drawer DOM scope separate.


  var container = n$2(sel.bar, node);
  var groupLabels = t$2(sel.groupLabels, container);
  var rangeInputs = t$2(sel.rangeInput, container);
  var rangeContainer = n$2(sel.priceRange, container);
  var focusTrap = null;
  var range = null;

  if (rangeContainer) {
    range = priceRange(rangeContainer);
  }

  var events = [e$2(window, "click", clickHandler), e$2(container, "change", changeHandler), c("filters:filter-removed", function () {
    return syncActiveStates();
  }), e$2(container, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) closeGroups();
  })]; // eslint-disable-next-line valid-jsdoc

  /**
   * Delegates click events
   * @param {event} e click event
   */

  function clickHandler(e) {
    var group = e.target.closest(sel.group);
    var dropdownToggle = e.target.closest(sel.dropdownToggle);
    var groupReset = e.target.closest(sel.groupReset);
    var removeRange = e.target.closest(sel.removeRange);
    var clearAll = e.target.closest(sel.clearAll); // If the click happened outside of a filter group
    // We don't want to close the groups if the click happened on a filter in a group

    if (!group) {
      closeGroups();
    }

    if (dropdownToggle) {
      toggleDropdown(dropdownToggle);
    }

    if (groupReset) {
      handleGroupReset(groupReset);
    }

    if (removeRange) {
      e.preventDefault();
      priceRangeRemove();
    }

    if (clearAll) {
      e.preventDefault();
      clearAllFilters();
    }
  }

  function clearAllFilters() {
    range && range.reset();
    t$2("".concat(sel.filterInputs), container).forEach(function (input) {
      input.checked = false;
    });
    updateFilters(container);
  }

  function handleGroupReset(groupReset) {
    var group = groupReset.closest(sel.groupValues);
    var filterType = group.dataset.filterType;

    if (filterType === "price_range") {
      priceRangeRemove();
    } else {
      t$2(sel.filterInputs, group).forEach(function (input) {
        input.checked = false;
      });
      updateFilters(container);
    }
  }

  function priceRangeRemove() {
    range && range.reset();
    checkForActiveFilters();
    updateFilters(container);
  } // eslint-disable-next-line valid-jsdoc

  /**
   * Delegates change events
   * @param {event} e change event
   */


  function changeHandler(e) {
    var filterInput = e.target.closest("".concat(sel.bar, " ").concat(sel.filterInputs, ", ").concat(sel.bar, " ").concat(sel.sortInputs));
    var rangeInput = e.target.closest("".concat(sel.bar, " ").concat(sel.rangeInput));

    if (filterInput) {
      checkForActiveFilters();
      filterChange(filterInput);
    } else if (rangeInput) {
      checkForActiveFilters();
      filterChange(rangeInput);
    }
  }

  function closeGroups() {
    groupLabels.forEach(function (button) {
      hideDropdown(button);
    });
  }

  function toggleDropdown(button) {
    var ariaExpanded = button.getAttribute("aria-expanded") === "true";

    if (ariaExpanded) {
      closeGroups();
      hideDropdown(button);
    } else {
      closeGroups();
      showDropdown(button);
    }
  }

  function showDropdown(button) {
    var group = button.closest(sel.group);
    button.setAttribute("aria-expanded", true);
    var dropdown = n$2("#".concat(button.getAttribute("aria-controls")), container);
    var dropdownToggle = button.dataset.dropdownToggle;

    if (dropdown) {
      if (dropdownToggle === "filter-bar-filters") {
        slideStop(dropdown);
        slideDown(dropdown).then(function () {
          dropdown.setAttribute("aria-hidden", false);
        });
      } else {
        dropdown.setAttribute("aria-hidden", false);

        if (group) {
          u$1(group, classes$2.filterGroupActive);
          positionGroup(group, dropdown); // Lock the filter bar to stop horizontal scrolling

          u$1(container, classes$2.filterBarWashActive);
          focusTrap = createFocusTrap(group, {
            allowOutsideClick: true
          });
          focusTrap.activate();
        }
      }
    }
  }

  function hideDropdown(button) {
    var group = button.closest(sel.group);
    i$1(container, classes$2.filterBarWashActive);
    button.setAttribute("aria-expanded", false);
    var dropdown = n$2("#".concat(button.getAttribute("aria-controls")), container);
    var dropdownToggle = button.dataset.dropdownToggle;

    if (dropdown) {
      dropdown.setAttribute("aria-hidden", true);

      if (dropdownToggle === "filter-bar-filters") {
        slideStop(dropdown);
        slideUp(dropdown);
      } else if (group) {
        i$1(group, classes$2.filterGroupActive);
        focusTrap && focusTrap.deactivate();
      }
    }
  }

  function positionGroup(group, dropdown) {
    i$1(dropdown, classes$2.filterGroupRight); // The filter bar bounding rect

    var parentBounds = group.parentElement.getBoundingClientRect(); // This filter groups bounding rect.
    // This will be around the toggle button
    // and what the drop down is positioned inside of

    var groupBounds = group.getBoundingClientRect(); // The drop down bounding rect

    var dropdownBounds = dropdown.getBoundingClientRect(); // Check if the drop down will stick out too far past the toggle button
    // Basicially checks if the drop down will overflow the page or not
    // 1. add the left side X position of the toggle button
    //    to the width of the drop down
    //    to get the left side position of the drop down
    // 2. If the left side of the drop down is past the width of the filter bar
    // 3. Add a class to the drop down to position it
    //    to the right side of the toggle button

    if (groupBounds.x + dropdownBounds.width >= parentBounds.width) {
      u$1(dropdown, classes$2.filterGroupRight);
    }
  }

  function updateGroupPositions() {
    var buttons = t$2(sel.dropdownToggle, container);
    buttons.forEach(function (button) {
      var ariaExpanded = button.getAttribute("aria-expanded") === "true";

      if (ariaExpanded) {
        var group = button.closest(sel.group);
        var dropdown = n$2("#".concat(button.getAttribute("aria-controls")), container);

        if (group && dropdown) {
          positionGroup(group, dropdown);
        }
      }
    });
  }

  function filterChange(filter) {
    if (filter.classList.contains(classes$2.filterDisabled)) {
      return;
    }

    checkForActiveFilters();
    range && range.validateRange();
    debounce(function () {
      return updateFilters(container);
    }, 1000)();
  }

  function checkForActiveFilters() {
    var activeItems = containsCheckedInputs(t$2(sel.filterInputs, container)) || rangeInputsHaveValue();
    l(container, classes$2.activeFilters, activeItems);
  }

  function rangeInputsHaveValue() {
    return rangeInputs.some(function (input) {
      return input.value !== "";
    });
  }

  function containsCheckedInputs(items) {
    return items.some(function (input) {
      return input.checked;
    });
  }

  function syncActiveStates() {
    var activeItems = false;

    if (rangeInputs && rangeInputsHaveValue() || containsCheckedInputs(t$2(sel.filterInputs, container))) {
      activeItems = true;
    }

    l(container, classes$2.activeFilters, activeItems);
  }

  function renderFilters(doc) {
    var updatedFilterItems = t$2("".concat(sel.bar, " ").concat(sel.filterItem), doc);
    updatedFilterItems.forEach(function (element) {
      replaceElement("".concat(sel.bar, " ").concat(sel.filterItem, "[for=\"").concat(element.getAttribute("for"), "\"] .filter-item__checkbox"), doc);
      replaceElement("".concat(sel.bar, " ").concat(sel.filterItem, "[for=\"").concat(element.getAttribute("for"), "\"] .filter-item__count"), doc);
    });
    updateInnerHTML("".concat(sel.bar, " ").concat(sel.resultsCount), doc);
    updateInnerHTML("".concat(sel.bar, " ").concat(sel.activeFilters), doc);
    updateInnerHTML("".concat(sel.bar, " ").concat(sel.groupHeader), doc);
    var updatedDropdownToggles = t$2("".concat(sel.bar, " ").concat(sel.dropdownToggle), doc);

    if (updatedDropdownToggles.length > 0) {
      updatedDropdownToggles.forEach(function (updated) {
        updateInnerHTML("".concat(sel.bar, " [data-dropdown-toggle=\"").concat(updated.getAttribute("data-dropdown-toggle"), "\"]"), doc);
      });
    }

    var updatedGroupHeader = t$2("".concat(sel.bar, " ").concat(sel.groupHeader), doc);
    updatedGroupHeader.forEach(function (element) {
      updateInnerHTML("".concat(sel.bar, " [data-group-values-header=\"").concat(element.getAttribute("data-group-values-header"), "\"]"), doc);
    });
    updateGroupPositions();
  }

  function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    range && range.unload();
    focusTrap && focusTrap.deactivate();
  }

  return {
    renderFilters: renderFilters,
    unload: unload
  };
};

var selectors$2 = {
  infiniteScrollContainer: ".collection__infinite-container",
  infiniteScrollTrigger: ".collection__infinite-trigger",
  partial: "[data-partial]",
  filterDrawer: "[data-filter-drawer]",
  filterBar: "[data-filter-bar]",
  loader: ".collection__loading",
  paginationItemCount: "[data-pagination-item-count]",
  productItems: ".product-item"
};
var classes$1 = {
  active: "is-active",
  hideProducts: "animation--collection-products-hide"
};
var strings$1 = window.theme.strings;
register("collection", {
  infiniteScroll: null,
  onLoad: function onLoad() {
    var _this$container$datas = this.container.dataset,
        collectionItemCount = _this$container$datas.collectionItemCount,
        paginationType = _this$container$datas.paginationType;
    if (!parseInt(collectionItemCount)) return;
    this.filterDrawerEl = n$2(selectors$2.filterDrawer, this.container);
    this.filterbarEl = n$2(selectors$2.filterBar, this.container);
    this.paginationItemCount = n$2(selectors$2.paginationItemCount, this.container);

    if (this.filterDrawerEl || this.filterbarEl) {
      this.partial = n$2(selectors$2.partial, this.container);
      this.filterDrawer = filterDrawer(this.container);
      this.filterBar = filterBar(this.container);
      this.filterHandler = filterHandler({
        container: this.container,
        renderCB: this._renderView.bind(this)
      });
    } // Ininite scroll


    this.paginationType = paginationType;
    this.paginated = this.paginationType === "paginated";
    this.infiniteScrollTrigger = n$2(selectors$2.infiniteScrollTrigger, this.container);

    if (!this.paginated) {
      this._initInfiniteScroll();
    }

    this.productItem = ProductItem(this.container);

    if (shouldAnimate(this.container)) {
      this.animateCollection = animateCollection(this.container);
    }
  },
  _initInfiniteScroll: function _initInfiniteScroll() {
    var _this = this;

    var infiniteScrollOptions = {
      container: selectors$2.infiniteScrollContainer,
      pagination: selectors$2.infiniteScrollTrigger,
      loadingText: "Loading...",
      callback: async function callback() {
        var _this$animateCollecti;

        _this.productItem && _this.productItem.unload();
        _this.productItem = ProductItem(_this.container);
        (_this$animateCollecti = _this.animateCollection) === null || _this$animateCollecti === void 0 ? void 0 : _this$animateCollecti.infiniteScrollReveal();

        _this._updatePaginationCount();

        r$1("collection:updated");
        
        const userInfo = getCookieByName("GlobalE_Data");
        const userData = await getUserRegion(userInfo.countryISO);
        // console.log({userData});
        const userRegion = userData.get('userRegion')?.toLowerCase();
        const userCountry = userData.get('countryCode')?.toLowerCase();
        loadVariantLogic(userRegion, userCountry);
        initiateVariantOptionButtons(userRegion);

        load("product");

      }
    };

    if (this.paginationType === "click") {
      infiniteScrollOptions.method = "click";
    }

    this.infiniteScroll = new Ajaxinate(infiniteScrollOptions);
  },
  _updatePaginationCount: function _updatePaginationCount() {
    var productItemCount = t$2(selectors$2.productItems, this.container).length;
    var viewing = strings$1.pagination.viewing.replace("{{ of }}", "1-".concat(productItemCount)).replace("{{ total }}", this.partial.dataset.collectionProductsCount);
    this.paginationItemCount.innerHTML = "".concat(viewing, " ").concat(strings$1.pagination.products);
  },
  _renderView: function _renderView(searchParams) {
    var _this2 = this;

    var updateHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var url = "".concat(window.location.pathname, "?section_id=").concat(this.container.dataset.sectionId, "&").concat(searchParams);
    var loading = n$2(selectors$2.loader, this.container);
    u$1(this.partial, classes$1.hideProducts);
    u$1(loading, classes$1.active);
    fetch(url).then(function (res) {
      return res.text();
    }).then(function (res) {
      var _this2$animateCollect;

      if (updateHistory) {
        _this2._updateURLHash(searchParams);
      }

      var doc = new DOMParser().parseFromString(res, "text/html");
      var updatedPartial = n$2(selectors$2.partial, doc);
      _this2.partial.innerHTML = updatedPartial.innerHTML;
      _this2.partial.dataset.collectionProductsCount = updatedPartial.dataset.collectionProductsCount;
      (_this2$animateCollect = _this2.animateCollection) === null || _this2$animateCollect === void 0 ? void 0 : _this2$animateCollect.updateContents();

      if (!_this2.paginated && _this2.infiniteScrollTrigger) {
        _this2.infiniteScrollTrigger.innerHTML = "";

        _this2._initInfiniteScroll();
      }

      _this2.filterDrawer && _this2.filterDrawer.renderFilters(doc);
      _this2.filterBar && _this2.filterBar.renderFilters(doc);
      _this2.productItem && _this2.productItem.unload();
      _this2.productItem = ProductItem(_this2.container);
      _this2.paginationItemCount = n$2(selectors$2.paginationItemCount, _this2.container);
      i$1(loading, classes$1.active);
      r$1("collection:updated");
    });
  },
  _updateURLHash: function _updateURLHash(searchParams) {
    history.pushState({
      searchParams: searchParams
    }, "", "".concat(window.location.pathname).concat(searchParams && "?".concat(searchParams)));
  },
  onUnload: function onUnload() {
    var _this$animateCollecti2;

    this.infiniteScroll && this.infiniteScroll.destroy();
    this.filterHandler && this.filterHandler.unload();
    this.filterDrawer && this.filterDrawer.unload();
    this.filterBar && this.filterBar.unload();
    this.filtering && this.filtering.unload();
    this.productItem && this.productItem.unload();
    (_this$animateCollecti2 = this.animateCollection) === null || _this$animateCollecti2 === void 0 ? void 0 : _this$animateCollecti2.destroy();
  }
});

register("login", {
  onLoad: function onLoad() {
    var main = n$2('[data-part="login"]', this.container);
    var reset = n$2('[data-part="reset"]', this.container);
    var toggles = t$2("[data-toggle]", this.container);
    var loginError = n$2(".form-status__message--error", reset);
    var isSuccess = n$2(".form-status__message--success", reset);
    var successMessage = n$2("[data-success-message]", this.container);

    if (isSuccess) {
      u$1(successMessage, "visible");
      u$1([main, reset], "hide");
    }

    if (loginError) {
      toggleView();
    }

    function toggleView(e) {
      e && e.preventDefault();
      l([main, reset], "hide");
      main.setAttribute("aria-hidden", a$1(main, "hide"));
      reset.setAttribute("aria-hidden", a$1(reset, "hide"));
    }

    this.toggleClick = e$2(toggles, "click", toggleView);
  },
  onUnload: function onUnload() {
    this.toggleClick();
  }
});

register("addresses", {
  onLoad: function onLoad() {
    var _this = this;

    this.modals = t$2("[data-address-modal]", this.container);
    this.focusTrap = null;
    var overlays = t$2("[data-overlay]", this.container);
    var open = t$2("[data-open]", this.container);
    var close = t$2("[data-close]", this.container);
    var remove = t$2("[data-remove]", this.container);
    var countryOptions = t$2("[data-country-option]", this.container) || [];
    this.events = [e$2(open, "click", function (e) {
      return _this.openModal(e);
    }), e$2([].concat(_toConsumableArray$1(close), _toConsumableArray$1(overlays)), "click", function (e) {
      return _this.closeModal(e);
    }), e$2(remove, "click", function (e) {
      return _this.removeAddress(e);
    }), e$2(this.modals, "keydown", function (e) {
      if (e.keyCode === 27) _this.closeModal(e);
    })];
    countryOptions.forEach(function (el) {
      var formId = el.dataset.formId;
      var countrySelector = "AddressCountry_" + formId;
      var provinceSelector = "AddressProvince_" + formId;
      var containerSelector = "AddressProvinceContainer_" + formId;
      new window.Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
        hideElement: containerSelector
      });
    });
  },
  onUnload: function onUnload() {
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  },
  openModal: function openModal(e) {
    e.preventDefault();
    var which = e.currentTarget.dataset.open;
    var modal = this.modals.find(function (el) {
      return el.dataset.addressModal == which;
    });
    u$1(modal, "active");
    this.focusTrap = createFocusTrap(modal, {
      allowOutsideClick: true
    });
    this.focusTrap.activate();
    document.body.setAttribute("data-fluorescent-overlay-open", "true");
    disableBodyScroll(modal, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }

          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
    setTimeout(function () {
      u$1(modal, "visible");
    }, 50);
  },
  closeModal: function closeModal(e) {
    e.preventDefault();
    var modal = e.target.closest(".addresses__modal");
    document.body.setAttribute("data-fluorescent-overlay-open", "false");
    enableBodyScroll(modal);
    this.focusTrap.deactivate();
    i$1(modal, "visible");
    setTimeout(function () {
      i$1(modal, "active");
    }, 350);
  },
  removeAddress: function removeAddress(e) {
    var _e$currentTarget$data = e.currentTarget.dataset,
        confirmMessage = _e$currentTarget$data.confirmMessage,
        target = _e$currentTarget$data.target;

    if (confirm(confirmMessage)) {
      window.Shopify.postLink(target, {
        parameters: {
          _method: "delete"
        }
      });
    }
  }
});

register("article", {
  onLoad: function onLoad() {
    focusFormStatus(this.container);
    var socialShareContainer = n$2(".social-share", this.container);

    if (socialShareContainer) {
      this.socialShare = SocialShare(socialShareContainer);
    }

    wrapIframes(t$2("iframe", this.container));
    wrapTables(t$2("table", this.container));

    if (shouldAnimate(this.container)) {
      this.animateArticle = animateArticle(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateArticle;

    this.socialShare && this.socialShare();
    (_this$animateArticle = this.animateArticle) === null || _this$animateArticle === void 0 ? void 0 : _this$animateArticle.destroy();
  }
});

register("password", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animatePassword = animatePassword(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animatePassword;

    (_this$animatePassword = this.animatePassword) === null || _this$animatePassword === void 0 ? void 0 : _this$animatePassword.destroy();
  }
});

var selectors$1 = {
  video: ".about__block-video"
};
register("page", {
  onLoad: function onLoad() {
    var _this = this;

    var videos = t$2(selectors$1.video, this.container);
    this.videoHandlers = [];

    if (videos.length) {
      videos.forEach(function (video) {
        _this.videoHandlers.push(backgroundVideoHandler(video.parentNode));
      });
    }

    this.accordions = Accordions(t$2(".accordion", this.container));
    wrapIframes(t$2("iframe", this.container));
    wrapTables(t$2("table", this.container));

    if (shouldAnimate(this.container)) {
      this.animatePage = animatePage(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animatePage;

    this.accordions.unload();
    this.videoHandlers.forEach(function (handler) {
      return handler();
    });
    (_this$animatePage = this.animatePage) === null || _this$animatePage === void 0 ? void 0 : _this$animatePage.destroy();
  }
});

var selectors = {
  searchSection: ".search",
  searchBanner: ".search-header",
  infiniteScrollContainer: ".search__infinite-container",
  infiniteScrollTrigger: ".search__infinite-trigger",
  partial: "[data-partial]",
  filterDrawer: "[data-filter-drawer]",
  filterBar: "[data-filter-bar]",
  loader: ".search__loading",
  paginationItemCount: "[data-pagination-item-count]",
  searchItems: ".product-item, .search-item"
};
var classes = {
  active: "is-active",
  hideProducts: "animation--search-products-hide"
};
var strings = window.theme.strings;
register("search", {
  infiniteScroll: null,
  onLoad: function onLoad() {
    this.searchBannerEl = n$2(selectors.searchBanner, this.container);

    if (shouldAnimate(this.searchBannerEl)) {
      this.animateSearchBanner = animateSearchBanner(this.searchBannerEl);
    }

    var _this$container$datas = this.container.dataset,
        searchItemCount = _this$container$datas.searchItemCount,
        paginationType = _this$container$datas.paginationType;
    if (!parseInt(searchItemCount)) return;
    this.searchSectionEl = n$2(selectors.searchSection, this.container);
    this.filterDrawerEl = n$2(selectors.filterDrawer, this.container);
    this.filterBarEl = n$2(selectors.filterBar, this.container);
    this.paginationItemCount = n$2(selectors.paginationItemCount, this.container);

    if (this.filterBarEl) {
      this.partial = n$2(selectors.partial, this.container);
      this.filterDrawer = filterDrawer(this.searchSectionEl);
      this.filterBar = filterBar(this.searchSectionEl);
      this.filterHandler = filterHandler({
        container: this.searchSectionEl,
        renderCB: this._renderView.bind(this)
      });
    } // Ininite scroll


    this.paginationType = paginationType;
    this.paginated = this.paginationType === "paginated";
    this.infiniteScrollTrigger = n$2(selectors.infiniteScrollTrigger, this.container);

    if (!this.paginated) {
      this._initInfiniteScroll();
    }

    this.productItem = ProductItem(this.container);

    if (shouldAnimate(this.searchSectionEl)) {
      this.animateSearch = animateSearch(this.searchSectionEl);
    }
  },
  _initInfiniteScroll: function _initInfiniteScroll() {
    var _this = this;

    var infiniteScrollOptions = {
      container: selectors.infiniteScrollContainer,
      pagination: selectors.infiniteScrollTrigger,
      loadingText: "Loading...",
      callback: function callback() {
        var _this$animateSearch;

        _this.productItem && _this.productItem.unload();
        _this.productItem = ProductItem(_this.container);
        (_this$animateSearch = _this.animateSearch) === null || _this$animateSearch === void 0 ? void 0 : _this$animateSearch.infiniteScrollReveal();

        _this._updatePaginationCount();

        r$1("collection:updated");
      }
    };

    if (this.paginationType === "click") {
      infiniteScrollOptions.method = "click";
    }

    this.infiniteScroll = new Ajaxinate(infiniteScrollOptions);
  },
  _updatePaginationCount: function _updatePaginationCount() {
    var searchItemCount = t$2(selectors.searchItems, this.container).length;
    var viewing = strings.pagination.viewing.replace("{{ of }}", "1-".concat(searchItemCount)).replace("{{ total }}", this.partial.dataset.searchResultsCount);
    this.paginationItemCount.innerHTML = "".concat(viewing, " ").concat(strings.pagination.results);
  },
  _renderView: function _renderView(searchParams) {
    var _this2 = this;

    var updateHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var url = "".concat(window.location.pathname, "?section_id=").concat(this.container.dataset.sectionId, "&").concat(searchParams);
    var loading = n$2(selectors.loader, this.container);
    u$1(loading, classes.active);
    fetch(url).then(function (res) {
      return res.text();
    }).then(function (res) {
      var _this2$animateSearch;

      if (updateHistory) {
        _this2._updateURLHash(searchParams);
      }

      var doc = new DOMParser().parseFromString(res, "text/html");
      var updatedPartial = n$2(selectors.partial, doc);
      _this2.partial.innerHTML = updatedPartial.innerHTML;
      _this2.partial.dataset.searchResultsCount = updatedPartial.dataset.searchResultsCount;
      (_this2$animateSearch = _this2.animateSearch) === null || _this2$animateSearch === void 0 ? void 0 : _this2$animateSearch.updateContents();

      if (!_this2.paginated && _this2.infiniteScrollTrigger) {
        _this2.infiniteScrollTrigger.innerHTML = "";

        _this2._initInfiniteScroll();
      }

      _this2.filterDrawer && _this2.filterDrawer.renderFilters(doc);
      _this2.filterBar && _this2.filterBar.renderFilters(doc);
      _this2.productItem && _this2.productItem.unload();
      _this2.productItem = ProductItem(_this2.container);
      _this2.paginationItemCount = n$2(selectors.paginationItemCount, _this2.container);
      i$1(loading, classes.active);
      r$1("collection:updated");
    });
  },
  _updateURLHash: function _updateURLHash(searchParams) {
    history.pushState({
      searchParams: searchParams
    }, "", "".concat(window.location.pathname).concat(searchParams && "?".concat(searchParams)));
  },
  onUnload: function onUnload() {
    var _this$animateSearch2, _this$animateSearchBa;

    this.infiniteScroll && this.infiniteScroll.destroy();
    this.filterHandler && this.filterHandler.unload();
    this.filterDrawer && this.filterDrawer.unload();
    this.filterBar && this.filterBar.unload();
    this.filtering && this.filtering.unload();
    this.productItem && this.productItem.unload();
    (_this$animateSearch2 = this.animateSearch) === null || _this$animateSearch2 === void 0 ? void 0 : _this$animateSearch2.destroy();
    (_this$animateSearchBa = this.animateSearchBanner) === null || _this$animateSearchBa === void 0 ? void 0 : _this$animateSearchBa.destroy();
  }
});

register("contact", {
  onLoad: function onLoad() {
    this.accordions = Accordions(t$2(".accordion", this.container));
    wrapIframes(t$2("iframe", this.container));
    wrapTables(t$2("table", this.container));
  },
  onUnload: function onUnload() {
    this.accordions.unload();
  }
});

register("blog", {
  onLoad: function onLoad() {
    var mobileNavSelect = n$2("#blog-mobile-nav", this.container);

    if (mobileNavSelect) {
      this.mobileNavSelectEvent = e$2(mobileNavSelect, "change", function () {
        window.location.href = mobileNavSelect.value;
      });
    }

    if (shouldAnimate(this.container)) {
      this.animateBlog = animateBlog(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateBlog;

    (_this$animateBlog = this.animateBlog) === null || _this$animateBlog === void 0 ? void 0 : _this$animateBlog.destroy();
    this.mobileNavSelectEvent && this.mobileNavSelectEvent.unsubscribe();
  }
});

register("collection-banner", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateCollectionBanner = animateCollectionBanner(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCollecti;

    (_this$animateCollecti = this.animateCollectionBanner) === null || _this$animateCollecti === void 0 ? void 0 : _this$animateCollecti.destroy();
  }
});

register("list-collections", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateListCollections = animateListCollections(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateListColl;

    (_this$animateListColl = this.animateListCollections) === null || _this$animateListColl === void 0 ? void 0 : _this$animateListColl.destroy();
  }
});

var _window$Shopify;

if (!HTMLElement.prototype.hasOwnProperty("inert")) {
  import(flu.chunks.polyfillInert);
} // Detect theme editor


if (window.Shopify.designMode === true) {
  u$1(document.documentElement, "theme-editor");
  document.documentElement.classList.add("theme-editor");
} else {
  var el = n$2(".theme-editor-scroll-offset", document);
  el && el.parentNode.removeChild(el);
} // Function to load all sections


var loadSections = function loadSections() {
  load("*");
  o$1({
    SelectedProductSection: null
  });
}; // Call above function either immediately or bind on loaded event


if (document.readyState === "complete" || document.readyState === "interactive") {
  loadSections();
} else {
  e$2(document, "DOMContentLoaded", loadSections);
}

if (isMobile$1({
  tablet: true,
  featureDetect: true
})) {
  u$1(document.body, "is-mobile");
} // Page transitions


pageTransition(); // a11y tab handler

handleTab(); // Apply contrast classes

sectionClasses(); // Load productlightbox

productLightbox(); // Quick view modal

var quickViewModalElement = n$2("[data-quick-view-modal]", document);

if (quickViewModalElement) {
  quickViewModal(quickViewModalElement);
} // Setup modal


var modalElement = n$2("[data-modal]", document);
modal(modalElement);
var flashModal = n$2("[data-flash-alert]", document);
flashAlertModal(flashModal); // Product availabilty drawer

var availabilityDrawer = n$2("[data-store-availability-drawer]", document);
storeAvailabilityDrawer(availabilityDrawer); // Setup header overlay

var headerOverlayContainer = document.querySelector("[data-header-overlay]");
headerOverlay(headerOverlayContainer); // Init back to top button

backToTop(); // Make it easy to see exactly what theme version
// this is by commit SHA

window.SHA = "89d9b3d3e2";

if (!sessionStorage.getItem("flu_stat_recorded") && !((_window$Shopify = window.Shopify) !== null && _window$Shopify !== void 0 && _window$Shopify.designMode)) {
  var _window$Shopify2, _window$Shopify3, _window$Shopify3$them;

  // eslint-disable-next-line no-process-env
  fetch("https://stats.fluorescent.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(_objectSpread2$1(_objectSpread2$1({}, window.theme.coreData), {}, {
      s: (_window$Shopify2 = window.Shopify) === null || _window$Shopify2 === void 0 ? void 0 : _window$Shopify2.shop,
      r: (_window$Shopify3 = window.Shopify) === null || _window$Shopify3 === void 0 ? void 0 : (_window$Shopify3$them = _window$Shopify3.theme) === null || _window$Shopify3$them === void 0 ? void 0 : _window$Shopify3$them.role
    }))
  });

  if (window.sessionStorage) {
    sessionStorage.setItem("flu_stat_recorded", "true");
  }
}
