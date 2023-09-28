(self["webpackChunkv2"] = self["webpackChunkv2"] || []).push([[179],{

/***/ 3909:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u3": function() { return /* binding */ breakpoints; },
/* harmony export */   "ZX": function() { return /* binding */ controls; },
/* harmony export */   "oF": function() { return /* binding */ swipe; },
/* harmony export */   "ZP": function() { return /* binding */ Glide; }
/* harmony export */ });
/* unused harmony exports Anchors, Autoplay, Images, Keyboard */
/*!
 * Glide.js v3.5.1
 * (c) 2013-2021 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

var defaults = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: 'slider',

  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,

  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,

  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,

  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,

  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: false,

  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: true,

  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,

  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: false,

  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,

  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,

  /**
   * A number of slides moved on single swipe.
   *
   * Available types:
   * `` - Moves slider by one slide per swipe
   * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
   *
   * @type {String}
   */
  perSwipe: '',

  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,

  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,

  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,

  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: true,

  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,

  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

  /**
   * Wait for the animation to finish until the next user input can be processed
   *
   * @type {boolean}
   */
  waitForTransition: true,

  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,

  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: 'ltr',

  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,

  /**
   * Defines how many clones of current viewport will be generated.
   *
   * @type {Number}
   */
  cloningRatio: 1,

  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},

  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    swipeable: 'glide--swipeable',
    dragging: 'glide--dragging',
    direction: {
      ltr: 'glide--ltr',
      rtl: 'glide--rtl'
    },
    type: {
      slider: 'glide--slider',
      carousel: 'glide--carousel'
    },
    slide: {
      clone: 'glide__slide--clone',
      active: 'glide__slide--active'
    },
    arrow: {
      disabled: 'glide__arrow--disabled'
    },
    nav: {
      active: 'glide__bullet--active'
    }
  }
};

/**
 * Outputs warning message to the bowser console.
 *
 * @param  {String} msg
 * @return {Void}
 */
function warn(msg) {
  console.error("[Glide warn]: ".concat(msg));
}

/**
 * Converts value entered as number
 * or string to integer value.
 *
 * @param {String} value
 * @returns {Number}
 */
function toInt(value) {
  return parseInt(value);
}
/**
 * Converts value entered as number
 * or string to flat value.
 *
 * @param {String} value
 * @returns {Number}
 */

function toFloat(value) {
  return parseFloat(value);
}
/**
 * Indicates whether the specified value is a string.
 *
 * @param  {*}   value
 * @return {Boolean}
 */

function isString(value) {
  return typeof value === 'string';
}
/**
 * Indicates whether the specified value is an object.
 *
 * @param  {*} value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */

function isObject(value) {
  var type = _typeof(value);

  return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
}
/**
 * Indicates whether the specified value is a function.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * Indicates whether the specified value is an array.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isArray(value) {
  return value.constructor === Array;
}

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Object} glide
 * @param {Object} extensions
 *
 * @returns {Object}
 */

function mount(glide, extensions, events) {
  var components = {};

  for (var name in extensions) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn('Extension must be a function');
    }
  }

  for (var _name in components) {
    if (isFunction(components[_name].mount)) {
      components[_name].mount();
    }
  }

  return components;
}

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {Void}
 */
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}
/**
 * Sorts aphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */

function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function (r, k) {
    r[k] = obj[k];
    return r[k], r;
  }, {});
}
/**
 * Merges passed settings object with default options.
 *
 * @param  {Object} defaults
 * @param  {Object} settings
 * @return {Object}
 */

function mergeOptions(defaults, settings) {
  var options = Object.assign({}, defaults, settings); // `Object.assign` do not deeply merge objects, so we
  // have to do it manually for every nested object
  // in options. Although it does not look smart,
  // it's smaller and faster than some fancy
  // merging deep-merge algorithm script.

  if (settings.hasOwnProperty('classes')) {
    options.classes = Object.assign({}, defaults.classes, settings.classes);

    if (settings.classes.hasOwnProperty('direction')) {
      options.classes.direction = Object.assign({}, defaults.classes.direction, settings.classes.direction);
    }

    if (settings.classes.hasOwnProperty('type')) {
      options.classes.type = Object.assign({}, defaults.classes.type, settings.classes.type);
    }

    if (settings.classes.hasOwnProperty('slide')) {
      options.classes.slide = Object.assign({}, defaults.classes.slide, settings.classes.slide);
    }

    if (settings.classes.hasOwnProperty('arrow')) {
      options.classes.arrow = Object.assign({}, defaults.classes.arrow, settings.classes.arrow);
    }

    if (settings.classes.hasOwnProperty('nav')) {
      options.classes.nav = Object.assign({}, defaults.classes.nav, settings.classes.nav);
    }
  }

  if (settings.hasOwnProperty('breakpoints')) {
    options.breakpoints = Object.assign({}, defaults.breakpoints, settings.breakpoints);
  }

  return options;
}

var EventsBus = /*#__PURE__*/function () {
  /**
   * Construct a EventBus instance.
   *
   * @param {Object} events
   */
  function EventsBus() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsBus);

    this.events = events;
    this.hop = events.hasOwnProperty;
  }
  /**
   * Adds listener to the specifed event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   */


  _createClass(EventsBus, [{
    key: "on",
    value: function on(event, handler) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }

        return;
      } // Create the event's object if not yet created


      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      } // Add the handler to queue


      var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

      return {
        remove: function remove() {
          delete this.events[event][index];
        }
      };
    }
    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */

  }, {
    key: "emit",
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }

        return;
      } // If the event doesn't exist, or there's no handlers in queue, just leave


      if (!this.hop.call(this.events, event)) {
        return;
      } // Cycle through events queue, fire!


      this.events[event].forEach(function (item) {
        item(context || {});
      });
    }
  }]);

  return EventsBus;
}();

var Glide$1 = /*#__PURE__*/function () {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  function Glide(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Glide);

    this._c = {};
    this._t = [];
    this._e = new EventsBus();
    this.disabled = false;
    this.selector = selector;
    this.settings = mergeOptions(defaults, options);
    this.index = this.settings.startAt;
  }
  /**
   * Initializes glide.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Glide}
   */


  _createClass(Glide, [{
    key: "mount",
    value: function mount$1() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._e.emit('mount.before');

      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn('You need to provide a object on `mount()`');
      }

      this._e.emit('mount.after');

      return this;
    }
    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */

  }, {
    key: "mutate",
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn('You need to provide a array on `mutate()`');
      }

      return this;
    }
    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */

  }, {
    key: "update",
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.settings = mergeOptions(this.settings, settings);

      if (settings.hasOwnProperty('startAt')) {
        this.index = settings.startAt;
      }

      this._e.emit('update');

      return this;
    }
    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     * `|>` - Move one viewport forward
     * `|<` - Move one viewport backward
     *
     * @param {String} pattern
     * @return {Glide}
     */

  }, {
    key: "go",
    value: function go(pattern) {
      this._c.Run.make(pattern);

      return this;
    }
    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */

  }, {
    key: "move",
    value: function move(distance) {
      this._c.Transition.disable();

      this._c.Move.make(distance);

      return this;
    }
    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._e.emit('destroy');

      return this;
    }
    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */

  }, {
    key: "play",
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (interval) {
        this.settings.autoplay = interval;
      }

      this._e.emit('play');

      return this;
    }
    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */

  }, {
    key: "pause",
    value: function pause() {
      this._e.emit('pause');

      return this;
    }
    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */

  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;
      return this;
    }
    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */

  }, {
    key: "enable",
    value: function enable() {
      this.disabled = false;
      return this;
    }
    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */

  }, {
    key: "on",
    value: function on(event, handler) {
      this._e.on(event, handler);

      return this;
    }
    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */

  }, {
    key: "isType",
    value: function isType(name) {
      return this.settings.type === name;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: "settings",
    get: function get() {
      return this._o;
    }
    /**
     * Sets value of the core options.
     *
     * @param  {Object} o
     * @return {Void}
     */
    ,
    set: function set(o) {
      if (isObject(o)) {
        this._o = o;
      } else {
        warn('Options must be an `object` instance.');
      }
    }
    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */

  }, {
    key: "index",
    get: function get() {
      return this._i;
    }
    /**
     * Sets current index a slider.
     *
     * @return {Object}
     */
    ,
    set: function set(i) {
      this._i = toInt(i);
    }
    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */

  }, {
    key: "type",
    get: function get() {
      return this.settings.type;
    }
    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */

  }, {
    key: "disabled",
    get: function get() {
      return this._d;
    }
    /**
     * Sets value of the idle status.
     *
     * @return {Boolean}
     */
    ,
    set: function set(status) {
      this._d = !!status;
    }
  }]);

  return Glide;
}();

function Run (Glide, Components, Events) {
  var Run = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function mount() {
      this._o = false;
    },

    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function make(move) {
      var _this = this;

      if (!Glide.disabled) {
        !Glide.settings.waitForTransition || Glide.disable();
        this.move = move;
        Events.emit('run.before', this.move);
        this.calculate();
        Events.emit('run', this.move);
        Components.Transition.after(function () {
          if (_this.isStart()) {
            Events.emit('run.start', _this.move);
          }

          if (_this.isEnd()) {
            Events.emit('run.end', _this.move);
          }

          if (_this.isOffset()) {
            _this._o = false;
            Events.emit('run.offset', _this.move);
          }

          Events.emit('run.after', _this.move);
          Glide.enable();
        });
      }
    },

    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function calculate() {
      var move = this.move,
          length = this.length;
      var steps = move.steps,
          direction = move.direction; // By default assume that size of view is equal to one slide

      var viewSize = 1; // While direction is `=` we want jump to
      // a specified index described in steps.

      if (direction === '=') {
        // Check if bound is true, 
        // as we want to avoid whitespaces.
        if (Glide.settings.bound && toInt(steps) > length) {
          Glide.index = length;
          return;
        }

        Glide.index = steps;
        return;
      } // When pattern is equal to `>>` we want
      // fast forward to the last slide.


      if (direction === '>' && steps === '>') {
        Glide.index = length;
        return;
      } // When pattern is equal to `<<` we want
      // fast forward to the first slide.


      if (direction === '<' && steps === '<') {
        Glide.index = 0;
        return;
      } // pagination movement


      if (direction === '|') {
        viewSize = Glide.settings.perView || 1;
      } // we are moving forward


      if (direction === '>' || direction === '|' && steps === '>') {
        var index = calculateForwardIndex(viewSize);

        if (index > length) {
          this._o = true;
        }

        Glide.index = normalizeForwardIndex(index, viewSize);
        return;
      } // we are moving backward


      if (direction === '<' || direction === '|' && steps === '<') {
        var _index = calculateBackwardIndex(viewSize);

        if (_index < 0) {
          this._o = true;
        }

        Glide.index = normalizeBackwardIndex(_index, viewSize);
        return;
      }

      warn("Invalid direction pattern [".concat(direction).concat(steps, "] has been used"));
    },

    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function isStart() {
      return Glide.index <= 0;
    },

    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function isEnd() {
      return Glide.index >= this.length;
    },

    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function isOffset() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (!direction) {
        return this._o;
      }

      if (!this._o) {
        return false;
      } // did we view to the right?


      if (direction === '|>') {
        return this.move.direction === '|' && this.move.steps === '>';
      } // did we view to the left?


      if (direction === '|<') {
        return this.move.direction === '|' && this.move.steps === '<';
      }

      return this.move.direction === direction;
    },

    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function isBound() {
      return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound;
    }
  };
  /**
   * Returns index value to move forward/to the right
   *
   * @param viewSize
   * @returns {Number}
   */

  function calculateForwardIndex(viewSize) {
    var index = Glide.index;

    if (Glide.isType('carousel')) {
      return index + viewSize;
    }

    return index + (viewSize - index % viewSize);
  }
  /**
   * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {Number}
   */


  function normalizeForwardIndex(index, viewSize) {
    var length = Run.length;

    if (index <= length) {
      return index;
    }

    if (Glide.isType('carousel')) {
      return index - (length + 1);
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on the last possible index value given by bound
      if (Run.isBound() && !Run.isEnd()) {
        return length;
      }

      return 0;
    }

    if (Run.isBound()) {
      return length;
    }

    return Math.floor(length / viewSize) * viewSize;
  }
  /**
   * Calculates index value to move backward/to the left
   *
   * @param viewSize
   * @returns {Number}
   */


  function calculateBackwardIndex(viewSize) {
    var index = Glide.index;

    if (Glide.isType('carousel')) {
      return index - viewSize;
    } // ensure our back navigation results in the same index as a forward navigation
    // to experience a homogeneous paging


    var view = Math.ceil(index / viewSize);
    return (view - 1) * viewSize;
  }
  /**
   * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {*}
   */


  function normalizeBackwardIndex(index, viewSize) {
    var length = Run.length;

    if (index >= 0) {
      return index;
    }

    if (Glide.isType('carousel')) {
      return index + (length + 1);
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on first possible index value before we to rewind to the length given by bound
      if (Run.isBound() && Run.isStart()) {
        return length;
      }

      return Math.floor(length / viewSize) * viewSize;
    }

    return 0;
  }

  define(Run, 'move', {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function get() {
      return this._m;
    },

    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function set(value) {
      var step = value.substr(1);
      this._m = {
        direction: value.substr(0, 1),
        steps: step ? toInt(step) ? toInt(step) : step : 0
      };
    }
  });
  define(Run, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;
      var length = Components.Html.slides.length; // If the `bound` option is active, a maximum running distance should be
      // reduced by `perView` and `focusAt` settings. Running distance
      // should end before creating an empty space after instance.

      if (this.isBound()) {
        return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
      }

      return length - 1;
    }
  });
  define(Run, 'offset', {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function get() {
      return this._o;
    }
  });
  return Run;
}

/**
 * Returns a current time.
 *
 * @return {Number}
 */
function now() {
  return new Date().getTime();
}

/**
 * Returns a function, that, when invoked, will only be triggered
 * at most once during a given window of time.
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object=} options
 * @return {Function}
 *
 * @see https://github.com/jashkenas/underscore
 */

function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var at = now();
    if (!previous && options.leading === false) previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = at;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

var MARGIN_TYPE = {
  ltr: ['marginLeft', 'marginRight'],
  rtl: ['marginRight', 'marginLeft']
};
function Gaps (Glide, Components, Events) {
  var Gaps = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function apply(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        var direction = Components.Direction.value;

        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][0]] = '';
        }

        if (i !== slides.length - 1) {
          style[MARGIN_TYPE[direction][1]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][1]] = '';
        }
      }
    },

    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function remove(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        style.marginLeft = '';
        style.marginRight = '';
      }
    }
  };
  define(Gaps, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function get() {
      return toInt(Glide.settings.gap);
    }
  });
  define(Gaps, 'grow', {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function get() {
      return Gaps.value * Components.Sizes.length;
    }
  });
  define(Gaps, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function get() {
      var perView = Glide.settings.perView;
      return Gaps.value * (perView - 1) / perView;
    }
  });
  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */

  Events.on(['build.after', 'update'], throttle(function () {
    Gaps.apply(Components.Html.wrapper.children);
  }, 30));
  /**
   * Remove gaps:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Gaps.remove(Components.Html.wrapper.children);
  });
  return Gaps;
}

/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }

    return matched;
  }

  return [];
}
/**
 * Checks if passed node exist and is a valid element.
 *
 * @param  {Element} node
 * @return {Boolean}
 */

function exist(node) {
  if (node && node instanceof window.HTMLElement) {
    return true;
  }

  return false;
}

var TRACK_SELECTOR = '[data-glide-el="track"]';
function Html (Glide, Components, Events) {
  var Html = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function mount() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.collectSlides();
    },

    /**
     * Collect slides
     */
    collectSlides: function collectSlides() {
      this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
        return !slide.classList.contains(Glide.settings.classes.slide.clone);
      });
    }
  };
  define(Html, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._r;
    },

    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(r) {
      if (isString(r)) {
        r = document.querySelector(r);
      }

      if (exist(r)) {
        Html._r = r;
      } else {
        warn('Root element must be a existing Html node');
      }
    }
  });
  define(Html, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._t;
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(t) {
      if (exist(t)) {
        Html._t = t;
      } else {
        warn("Could not find track element. Please use ".concat(TRACK_SELECTOR, " attribute."));
      }
    }
  });
  define(Html, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function get() {
      return Html.track.children[0];
    }
  });
  /**
   * Add/remove/reorder dynamic slides
   */

  Events.on('update', function () {
    Html.collectSlides();
  });
  return Html;
}

function Peek (Glide, Components, Events) {
  var Peek = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.peek;
    }
  };
  define(Peek, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function get() {
      return Peek._v;
    },

    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function set(value) {
      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value);
      }

      Peek._v = value;
    }
  });
  define(Peek, 'reductor', {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function get() {
      var value = Peek.value;
      var perView = Glide.settings.perView;

      if (isObject(value)) {
        return value.before / perView + value.after / perView;
      }

      return value * 2 / perView;
    }
  });
  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */

  Events.on(['resize', 'update'], function () {
    Peek.mount();
  });
  return Peek;
}

function Move (Glide, Components, Events) {
  var Move = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      this._o = 0;
    },

    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function make() {
      var _this = this;

      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.offset = offset;
      Events.emit('move', {
        movement: this.value
      });
      Components.Transition.after(function () {
        Events.emit('move.after', {
          movement: _this.value
        });
      });
    }
  };
  define(Move, 'offset', {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function get() {
      return Move._o;
    },

    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function set(value) {
      Move._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });
  define(Move, 'translate', {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Sizes.slideWidth * Glide.index;
    }
  });
  define(Move, 'value', {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function get() {
      var offset = this.offset;
      var translate = this.translate;

      if (Components.Direction.is('rtl')) {
        return translate + offset;
      }

      return translate - offset;
    }
  });
  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */

  Events.on(['build.before', 'run'], function () {
    Move.make();
  });
  return Move;
}

function Sizes (Glide, Components, Events) {
  var Sizes = {
    /**
     * Setups dimensions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides() {
      var width = "".concat(this.slideWidth, "px");
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width;
      }
    },

    /**
     * Setups dimensions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper() {
      Components.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },

    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function remove() {
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = '';
      }

      Components.Html.wrapper.style.width = '';
    }
  };
  define(Sizes, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });
  define(Sizes, 'width', {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.track.offsetWidth;
    }
  });
  define(Sizes, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
    }
  });
  define(Sizes, 'slideWidth', {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
    }
  });
  /**
   * Apply calculated glide's dimensions:
   * - before building, so other dimensions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   * - on updating via API, to calculate dimensions based on new options
   */

  Events.on(['build.before', 'resize', 'update'], function () {
    Sizes.setupSlides();
    Sizes.setupWrapper();
  });
  /**
   * Remove calculated glide's dimensions:
   * - on destoting to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Sizes.remove();
  });
  return Sizes;
}

function Build (Glide, Components, Events) {
  var Build = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function mount() {
      Events.emit('build.before');
      this.typeClass();
      this.activeClass();
      Events.emit('build.after');
    },

    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide.settings.classes.type[Glide.settings.type]);
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var classes = Glide.settings.classes;
      var slide = Components.Html.slides[Glide.index];

      if (slide) {
        slide.classList.add(classes.slide.active);
        siblings(slide).forEach(function (sibling) {
          sibling.classList.remove(classes.slide.active);
        });
      }
    },

    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function removeClasses() {
      var _Glide$settings$class = Glide.settings.classes,
          type = _Glide$settings$class.type,
          slide = _Glide$settings$class.slide;
      Components.Html.root.classList.remove(type[Glide.settings.type]);
      Components.Html.slides.forEach(function (sibling) {
        sibling.classList.remove(slide.active);
      });
    }
  };
  /**
   * Clear building classes:
   * - on destroying to bring HTML to its initial state
   * - on updating to remove classes before remounting component
   */

  Events.on(['destroy', 'update'], function () {
    Build.removeClasses();
  });
  /**
   * Remount component:
   * - on resizing of the window to calculate new dimensions
   * - on updating settings via API
   */

  Events.on(['resize', 'update'], function () {
    Build.mount();
  });
  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */

  Events.on('move.after', function () {
    Build.activeClass();
  });
  return Build;
}

function Clones (Glide, Components, Events) {
  var Clones = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function mount() {
      this.items = [];

      if (Glide.isType('carousel')) {
        this.items = this.collect();
      }
    },

    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function collect() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var slides = Components.Html.slides;
      var _Glide$settings = Glide.settings,
          perView = _Glide$settings.perView,
          classes = _Glide$settings.classes,
          cloningRatio = _Glide$settings.cloningRatio;

      if (slides.length !== 0) {
        var peekIncrementer = +!!Glide.settings.peek;
        var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
        var append = slides.slice(0, cloneCount).reverse();
        var prepend = slides.slice(cloneCount * -1);

        for (var r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < append.length; i++) {
            var clone = append[i].cloneNode(true);
            clone.classList.add(classes.slide.clone);
            items.push(clone);
          }

          for (var _i = 0; _i < prepend.length; _i++) {
            var _clone = prepend[_i].cloneNode(true);

            _clone.classList.add(classes.slide.clone);

            items.unshift(_clone);
          }
        }
      }

      return items;
    },

    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function append() {
      var items = this.items;
      var _Components$Html = Components.Html,
          wrapper = _Components$Html.wrapper,
          slides = _Components$Html.slides;
      var half = Math.floor(items.length / 2);
      var prepend = items.slice(0, half).reverse();
      var append = items.slice(half * -1).reverse();
      var width = "".concat(Components.Sizes.slideWidth, "px");

      for (var i = 0; i < append.length; i++) {
        wrapper.appendChild(append[i]);
      }

      for (var _i2 = 0; _i2 < prepend.length; _i2++) {
        wrapper.insertBefore(prepend[_i2], slides[0]);
      }

      for (var _i3 = 0; _i3 < items.length; _i3++) {
        items[_i3].style.width = width;
      }
    },

    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function remove() {
      var items = this.items;

      for (var i = 0; i < items.length; i++) {
        Components.Html.wrapper.removeChild(items[i]);
      }
    }
  };
  define(Clones, 'grow', {
    /**
     * Gets additional dimensions value caused by clones.
     *
     * @return {Number}
     */
    get: function get() {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
    }
  });
  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */

  Events.on('update', function () {
    Clones.remove();
    Clones.mount();
    Clones.append();
  });
  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */

  Events.on('build.before', function () {
    if (Glide.isType('carousel')) {
      Clones.append();
    }
  });
  /**
   * Remove clones HTMLElements:
   * - on destroying, to bring HTML to its initial state
   */

  Events.on('destroy', function () {
    Clones.remove();
  });
  return Clones;
}

var EventsBinder = /*#__PURE__*/function () {
  /**
   * Construct a EventsBinder instance.
   */
  function EventsBinder() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsBinder);

    this.listeners = listeners;
  }
  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @param  {Function} closure
   * @param  {Boolean|Object} capture
   * @return {Void}
   */


  _createClass(EventsBinder, [{
    key: "on",
    value: function on(events, el, closure) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;
        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */

  }, {
    key: "off",
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      delete this.listeners;
    }
  }]);

  return EventsBinder;
}();

function Resize (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Resize = {
    /**
     * Initializes window bindings.
     */
    mount: function mount() {
      this.bind();
    },

    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('resize', window, throttle(function () {
        Events.emit('resize');
      }, Glide.settings.throttle));
    },

    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('resize', window);
    }
  };
  /**
   * Remove bindings from window:
   * - on destroying, to remove added EventListener
   */

  Events.on('destroy', function () {
    Resize.unbind();
    Binder.destroy();
  });
  return Resize;
}

var VALID_DIRECTIONS = ['ltr', 'rtl'];
var FLIPED_MOVEMENTS = {
  '>': '<',
  '<': '>',
  '=': '='
};
function Direction (Glide, Components, Events) {
  var Direction = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.direction;
    },

    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function resolve(pattern) {
      var token = pattern.slice(0, 1);

      if (this.is('rtl')) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
      }

      return pattern;
    },

    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function is(direction) {
      return this.value === direction;
    },

    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function addClass() {
      Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
    },

    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function removeClass() {
      Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
    }
  };
  define(Direction, 'value', {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function get() {
      return Direction._v;
    },

    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function set(value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction._v = value;
      } else {
        warn('Direction value must be `ltr` or `rtl`');
      }
    }
  });
  /**
   * Clear direction class:
   * - on destroy to bring HTML to its initial state
   * - on update to remove class before reappling bellow
   */

  Events.on(['destroy', 'update'], function () {
    Direction.removeClass();
  });
  /**
   * Remount component:
   * - on update to reflect changes in direction value
   */

  Events.on('update', function () {
    Direction.mount();
  });
  /**
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */

  Events.on(['build.before', 'update'], function () {
    Direction.addClass();
  });
  return Direction;
}

/**
 * Reflects value of glide movement.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Rtl (Glide, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Components.Direction.is('rtl')) {
        return -translate;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `gap` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Gap (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
      return translate + Components.Gaps.value * multiplier;
    }
  };
}

/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Grow (Glide, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      return translate + Components.Clones.grow / 2;
    }
  };
}

/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */

function Peeking (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;

        if (isObject(peek)) {
          return translate - peek.before;
        }

        return translate - peek;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Focusing (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var gap = Components.Gaps.value;
      var width = Components.Sizes.width;
      var focusAt = Glide.settings.focusAt;
      var slideWidth = Components.Sizes.slideWidth;

      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2);
      }

      return translate - slideWidth * focusAt - gap * focusAt;
    }
  };
}

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */

function mutator (Glide, Components, Events) {
  /**
   * Merge instance transformers with collection of default transformers.
   * It's important that the Rtl component be last on the list,
   * so it reflects all previous transformations.
   *
   * @type {Array}
   */
  var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function mutate(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];

        if (isFunction(transformer) && isFunction(transformer().modify)) {
          translate = transformer(Glide, Components, Events).modify(translate);
        } else {
          warn('Transformer should be a function that returns an object with `modify()` method');
        }
      }

      return translate;
    }
  };
}

function Translate (Glide, Components, Events) {
  var Translate = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      var transform = mutator(Glide, Components).mutate(value);
      var translate3d = "translate3d(".concat(-1 * transform, "px, 0px, 0px)");
      Components.Html.wrapper.style.mozTransform = translate3d; // needed for supported Firefox 10-15

      Components.Html.wrapper.style.webkitTransform = translate3d; // needed for supported Chrome 10-35, Safari 5.1-8, and Opera 15-22

      Components.Html.wrapper.style.transform = translate3d;
    },

    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transform = '';
    },

    /**
     * @return {number}
     */
    getStartIndex: function getStartIndex() {
      var length = Components.Sizes.length;
      var index = Glide.index;
      var perView = Glide.settings.perView;

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        return length + (index - perView);
      } // "modulo length" converts an index that equals length to zero


      return (index + perView) % length;
    },

    /**
     * @return {number}
     */
    getTravelDistance: function getTravelDistance() {
      var travelDistance = Components.Sizes.slideWidth * Glide.settings.perView;

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        // reverse travel distance so that we don't have to change subtract operations
        return travelDistance * -1;
      }

      return travelDistance;
    }
  };
  /**
   * Set new translate value:
   * - on move to reflect index change
   * - on updating via API to reflect possible changes in options
   */

  Events.on('move', function (context) {
    if (!Glide.isType('carousel') || !Components.Run.isOffset()) {
      return Translate.set(context.movement);
    }

    Components.Transition.after(function () {
      Events.emit('translate.jump');
      Translate.set(Components.Sizes.slideWidth * Glide.index);
    });
    var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
    return Translate.set(startWidth - Components.Translate.getTravelDistance());
  });
  /**
   * Remove translate:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Translate.remove();
  });
  return Translate;
}

function Transition (Glide, Components, Events) {
  /**
   * Holds inactivity status of transition.
   * When true transition is not applied.
   *
   * @type {Boolean}
   */
  var disabled = false;
  var Transition = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function compose(property) {
      var settings = Glide.settings;

      if (!disabled) {
        return "".concat(property, " ").concat(this.duration, "ms ").concat(settings.animationTimingFunc);
      }

      return "".concat(property, " 0ms ").concat(settings.animationTimingFunc);
    },

    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function set() {
      var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
      Components.Html.wrapper.style.transition = this.compose(property);
    },

    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transition = '';
    },

    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function after(callback) {
      setTimeout(function () {
        callback();
      }, this.duration);
    },

    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function enable() {
      disabled = false;
      this.set();
    },

    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function disable() {
      disabled = true;
      this.set();
    }
  };
  define(Transition, 'duration', {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;

      if (Glide.isType('slider') && Components.Run.offset) {
        return settings.rewindDuration;
      }

      return settings.animationDuration;
    }
  });
  /**
   * Set transition `style` value:
   * - on each moving, because it may be cleared by offset move
   */

  Events.on('move', function () {
    Transition.set();
  });
  /**
   * Disable transition:
   * - before initial build to avoid transitioning from `0` to `startAt` index
   * - while resizing window and recalculating dimensions
   * - on jumping from offset transition at start and end edges in `carousel` type
   */

  Events.on(['build.before', 'resize', 'translate.jump'], function () {
    Transition.disable();
  });
  /**
   * Enable transition:
   * - on each running, because it may be disabled by offset move
   */

  Events.on('run', function () {
    Transition.enable();
  });
  /**
   * Remove transition:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Transition.remove();
  });
  return Transition;
}

/**
 * Test via a getter in the options object to see
 * if the passive property is accessed.
 *
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */
var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}

var supportsPassive$1 = supportsPassive;

var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
function swipe (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Swipe = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bindSwipeStart();
    },

    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function start(event) {
      if (!disabled && !Glide.disabled) {
        this.disable();
        var swipe = this.touches(event);
        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);
        this.bindSwipeMove();
        this.bindSwipeEnd();
        Events.emit('swipe.start');
      }
    },

    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (!Glide.disabled) {
        var _Glide$settings = Glide.settings,
            touchAngle = _Glide$settings.touchAngle,
            touchRatio = _Glide$settings.touchRatio,
            classes = _Glide$settings.classes;
        var swipe = this.touches(event);
        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);
        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

        if (swipeSin * 180 / Math.PI < touchAngle) {
          event.stopPropagation();
          Components.Move.make(subExSx * toFloat(touchRatio));
          Components.Html.root.classList.add(classes.dragging);
          Events.emit('swipe.move');
        } else {
          return false;
        }
      }
    },

    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function end(event) {
      if (!Glide.disabled) {
        var _Glide$settings2 = Glide.settings,
            perSwipe = _Glide$settings2.perSwipe,
            touchAngle = _Glide$settings2.touchAngle,
            classes = _Glide$settings2.classes;
        var swipe = this.touches(event);
        var threshold = this.threshold(event);
        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        this.enable();

        if (swipeDistance > threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
        } else if (swipeDistance < -threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Move.make();
        }

        Components.Html.root.classList.remove(classes.dragging);
        this.unbindSwipeMove();
        this.unbindSwipeEnd();
        Events.emit('swipe.end');
      }
    },

    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function bindSwipeStart() {
      var _this = this;

      var _Glide$settings3 = Glide.settings,
          swipeThreshold = _Glide$settings3.swipeThreshold,
          dragThreshold = _Glide$settings3.dragThreshold;

      if (swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }

      if (dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }
    },

    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
      Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
    },

    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      var _this2 = this;

      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
        _this2.move(event);
      }, Glide.settings.throttle), capture);
    },

    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
    },

    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      var _this3 = this;

      Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
        _this3.end(event);
      });
    },

    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },

    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    },

    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function threshold(event) {
      var settings = Glide.settings;

      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return settings.dragThreshold;
      }

      return settings.swipeThreshold;
    },

    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;
      Components.Transition.enable();
      return this;
    },

    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;
      Components.Transition.disable();
      return this;
    }
  };
  /**
   * Add component class:
   * - after initial building
   */

  Events.on('build.after', function () {
    Components.Html.root.classList.add(Glide.settings.classes.swipeable);
  });
  /**
   * Remove swiping bindings:
   * - on destroying, to remove added EventListeners
   */

  Events.on('destroy', function () {
    Swipe.unbindSwipeStart();
    Swipe.unbindSwipeMove();
    Swipe.unbindSwipeEnd();
    Binder.destroy();
  });
  return Swipe;
}

function images (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Images = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bind();
    },

    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
    },

    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('dragstart', Components.Html.wrapper);
    },

    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };
  /**
   * Remove bindings from images:
   * - on destroying, to remove added EventListeners
   */

  Events.on('destroy', function () {
    Images.unbind();
    Binder.destroy();
  });
  return Images;
}

function anchors (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  /**
   * Holds detaching status of anchors.
   * Prevents detaching of already detached anchors.
   *
   * @private
   * @type {Boolean}
   */

  var detached = false;
  /**
   * Holds preventing status of anchors.
   * If `true` redirection after click will be disabled.
   *
   * @private
   * @type {Boolean}
   */

  var prevented = false;
  var Anchors = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      /**
       * Holds collection of anchors elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._a = Components.Html.wrapper.querySelectorAll('a');
      this.bind();
    },

    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('click', Components.Html.wrapper, this.click);
    },

    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('click', Components.Html.wrapper);
    },

    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    },

    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function detach() {
      prevented = true;

      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;
        }

        detached = true;
      }

      return this;
    },

    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function attach() {
      prevented = false;

      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;
        }

        detached = false;
      }

      return this;
    }
  };
  define(Anchors, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Anchors._a;
    }
  });
  /**
   * Detach anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */

  Events.on('swipe.move', function () {
    Anchors.detach();
  });
  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */

  Events.on('swipe.end', function () {
    Components.Transition.after(function () {
      Anchors.attach();
    });
  });
  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */

  Events.on('destroy', function () {
    Anchors.attach();
    Anchors.unbind();
    Binder.destroy();
  });
  return Anchors;
}

var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\"<\"]");
var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\">\"]");
function controls (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Controls = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function mount() {
      /**
       * Collection of navigation HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
      /**
       * Collection of controls HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */

      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
      /**
       * Collection of arrow control HTML elements.
       *
       * @private
       * @type {Object}
       */

      this._arrowControls = {
        previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
        next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
      };
      this.addBindings();
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function setActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children);
      }
    },

    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function removeActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children);
      }
    },

    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function addClass(controls) {
      var settings = Glide.settings;
      var item = controls[Glide.index];

      if (!item) {
        return;
      }

      if (item) {
        item.classList.add(settings.classes.nav.active);
        siblings(item).forEach(function (sibling) {
          sibling.classList.remove(settings.classes.nav.active);
        });
      }
    },

    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function removeClass(controls) {
      var item = controls[Glide.index];

      if (item) {
        item.classList.remove(Glide.settings.classes.nav.active);
      }
    },

    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState: function setArrowState() {
      if (Glide.settings.rewind) {
        return;
      }

      var next = Controls._arrowControls.next;
      var previous = Controls._arrowControls.previous;
      this.resetArrowState(next, previous);

      if (Glide.index === 0) {
        this.disableArrow(previous);
      }

      if (Glide.index === Components.Run.length) {
        this.disableArrow(next);
      }
    },

    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState: function resetArrowState() {
      var settings = Glide.settings;

      for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
      }

      lists.forEach(function (list) {
        list.forEach(function (element) {
          element.classList.remove(settings.classes.arrow.disabled);
        });
      });
    },

    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow: function disableArrow() {
      var settings = Glide.settings;

      for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
      }

      lists.forEach(function (list) {
        list.forEach(function (element) {
          element.classList.add(settings.classes.arrow.disabled);
        });
      });
    },

    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function addBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children);
      }
    },

    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children);
      }
    },

    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function bind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.on('click', elements[i], this.click);
        Binder.on('touchstart', elements[i], this.click, capture);
      }
    },

    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function unbind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.off(['click', 'touchstart'], elements[i]);
      }
    },

    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click: function click(event) {
      if (!supportsPassive$1 && event.type === 'touchstart') {
        event.preventDefault();
      }

      var direction = event.currentTarget.getAttribute('data-glide-dir');
      Components.Run.make(Components.Direction.resolve(direction));
    }
  };
  define(Controls, 'items', {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Controls._c;
    }
  });
  /**
   * Swap active class of current navigation item:
   * - after mounting to set it to initial index
   * - after each move to the new index
   */

  Events.on(['mount.after', 'move.after'], function () {
    Controls.setActive();
  });
  /**
   * Add or remove disabled class of arrow elements
   */

  Events.on(['mount.after', 'run'], function () {
    Controls.setArrowState();
  });
  /**
   * Remove bindings and HTML Classes:
   * - on destroying, to bring markup to its initial state
   */

  Events.on('destroy', function () {
    Controls.removeBindings();
    Controls.removeActive();
    Binder.destroy();
  });
  return Controls;
}

function keyboard (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Keyboard = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function mount() {
      if (Glide.settings.keyboard) {
        this.bind();
      }
    },

    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('keyup', document, this.press);
    },

    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('keyup', document);
    },

    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function press(event) {
      var perSwipe = Glide.settings.perSwipe;

      if (event.keyCode === 39) {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
      }

      if (event.keyCode === 37) {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
      }
    }
  };
  /**
   * Remove bindings from keyboard:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */

  Events.on(['destroy', 'update'], function () {
    Keyboard.unbind();
  });
  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */

  Events.on('update', function () {
    Keyboard.mount();
  });
  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */

  Events.on('destroy', function () {
    Binder.destroy();
  });
  return Keyboard;
}

function autoplay (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Autoplay = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.enable();
      this.start();

      if (Glide.settings.hoverpause) {
        this.bind();
      }
    },

    /**
     * Enables autoplaying
     *
     * @returns {Void}
     */
    enable: function enable() {
      this._e = true;
    },

    /**
     * Disables autoplaying.
     *
     * @returns {Void}
     */
    disable: function disable() {
      this._e = false;
    },

    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function start() {
      var _this = this;

      if (!this._e) {
        return;
      }

      this.enable();

      if (Glide.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(function () {
            _this.stop();

            Components.Run.make('>');

            _this.start();

            Events.emit('autoplay');
          }, this.time);
        }
      }
    },

    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function stop() {
      this._i = clearInterval(this._i);
    },

    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function bind() {
      var _this2 = this;

      Binder.on('mouseover', Components.Html.root, function () {
        if (_this2._e) {
          _this2.stop();
        }
      });
      Binder.on('mouseout', Components.Html.root, function () {
        if (_this2._e) {
          _this2.start();
        }
      });
    },

    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function unbind() {
      Binder.off(['mouseover', 'mouseout'], Components.Html.root);
    }
  };
  define(Autoplay, 'time', {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function get() {
      var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

      if (autoplay) {
        return toInt(autoplay);
      }

      return toInt(Glide.settings.autoplay);
    }
  });
  /**
   * Stop autoplaying and unbind events:
   * - on destroying, to clear defined interval
   * - on updating via API to reset interval that may changed
   */

  Events.on(['destroy', 'update'], function () {
    Autoplay.unbind();
  });
  /**
   * Stop autoplaying:
   * - before each run, to restart autoplaying
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - while starting a swipe
   * - on updating via API to reset interval that may changed
   */

  Events.on(['run.before', 'swipe.start', 'update'], function () {
    Autoplay.stop();
  });
  Events.on(['pause', 'destroy'], function () {
    Autoplay.disable();
    Autoplay.stop();
  });
  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */

  Events.on(['run.after', 'swipe.end'], function () {
    Autoplay.start();
  });
  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */

  Events.on(['play'], function () {
    Autoplay.enable();
    Autoplay.start();
  });
  /**
   * Remount autoplaying:
   * - on updating via API to reset interval that may changed
   */

  Events.on('update', function () {
    Autoplay.mount();
  });
  /**
   * Destroy a binder:
   * - on destroying glide instance to clearup listeners
   */

  Events.on('destroy', function () {
    Binder.destroy();
  });
  return Autoplay;
}

/**
 * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
 *
 * @param {Object} points
 * @returns {Object}
 */

function sortBreakpoints(points) {
  if (isObject(points)) {
    return sortKeys(points);
  } else {
    warn("Breakpoints option must be an object");
  }

  return {};
}

function breakpoints (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */

  var settings = Glide.settings;
  /**
   * Holds reference to breakpoints object in settings. Sorts breakpoints
   * from smaller to larger. It is required in order to proper
   * matching currently active breakpoint settings.
   *
   * @type {Object}
   */

  var points = sortBreakpoints(settings.breakpoints);
  /**
   * Cache initial settings before overwritting.
   *
   * @type {Object}
   */

  var defaults = Object.assign({}, settings);
  var Breakpoints = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function match(points) {
      if (typeof window.matchMedia !== 'undefined') {
        for (var point in points) {
          if (points.hasOwnProperty(point)) {
            if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
              return points[point];
            }
          }
        }
      }

      return defaults;
    }
  };
  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */

  Object.assign(settings, Breakpoints.match(points));
  /**
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */

  Binder.on('resize', window, throttle(function () {
    Glide.settings = mergeOptions(settings, Breakpoints.match(points));
  }, Glide.settings.throttle));
  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */

  Events.on('update', function () {
    points = sortBreakpoints(points);
    defaults = Object.assign({}, settings);
  });
  /**
   * Unbind resize listener:
   * - on destroying, to bring markup to its initial state
   */

  Events.on('destroy', function () {
    Binder.off('resize', window);
  });
  return Breakpoints;
}

var COMPONENTS = {
  Html: Html,
  Translate: Translate,
  Transition: Transition,
  Direction: Direction,
  Peek: Peek,
  Sizes: Sizes,
  Gaps: Gaps,
  Move: Move,
  Clones: Clones,
  Resize: Resize,
  Build: Build,
  Run: Run
};

var Glide = /*#__PURE__*/function (_Core) {
  _inherits(Glide, _Core);

  var _super = _createSuper(Glide);

  function Glide() {
    _classCallCheck(this, Glide);

    return _super.apply(this, arguments);
  }

  _createClass(Glide, [{
    key: "mount",
    value: function mount() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _get(_getPrototypeOf(Glide.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, extensions));
    }
  }]);

  return Glide;
}(Glide$1);




/***/ }),

/***/ 5579:
/***/ (function() {

"use strict";
// CSS


/***/ }),

/***/ 5277:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

;// CONCATENATED MODULE: ./src/modules/_global/js/appendVideo.js
/* global squiz */

/**
 *
 * @param target {node} - clicked target (button)
 * @param dataAttr {obj} - {name: attrName, value: attrValue}
 */
const appendVideo = (target, dataAttr) => {
  /**
   *
   * @param {string} videoCode - ex. "cdVUr-NrXng"
   * @param {object} videoSize -  ex. {width: '234', height: '234}
   */
  const appendYoutubeVideo = (videoCode, videoSize) => {
    let aditionalParameters = 'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"';
    let loopParams = '';

    if ([...target.classList].includes('video-card-story--js')) {
      loopParams += `?enablejsapi=1&autoplay=1&loop=1&mute=1&controls=0&origin=${window.location.origin}&playlist=${videoCode}`;
    } else {
      aditionalParameters += ' allowfullscreen';
    }

    const youtubeVideo = `
        <iframe class="lightbox__iframe" width=${videoSize.width} height=${videoSize.height}
            src="https://www.youtube.com/embed/${videoCode}${loopParams}"
            ${aditionalParameters}
        >
        </iframe>`;
    target.innerHTML = youtubeVideo;
  };

  const appendVimeoVideo = (videoCode, videoSize) => {
    /**
     *
     * @param {string} videoCode - ex. "134353"
     * @param {object} videoSize -  ex. {width: '234', height: '234}
     */
    let loopParams = '';

    if (target.classList[0] === 'video-card-story--js') {
      loopParams += '?muted=1&autoplay=1&loop=1&controls=0';
    }

    const vimeoVideo = `
        <iframe class="lightbox__iframe" width=${videoSize.width} height=${videoSize.height}
            src="https://player.vimeo.com/video/${videoCode}${loopParams}"
            frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
        >
        </iframe>`;
    target.innerHTML = vimeoVideo;
  };

  const setVideoSize = () => {
    let height, width;

    if ([...target.parentNode.classList].includes('main-banner__background')) {
      width = target.offsetWidth;
      height = Math.round(width / 1.7777);
    } else {
      height = Math.round(document.body.clientHeight * 0.8 - 110);
      width = Math.round(height * 1.7777);
    }

    return {
      width,
      height
    };
  }; //only for lightbox


  if ([...target.classList].includes('lightbox__content')) {
    squiz.fn.loadSpiner('hide');
    squiz.fn.lightboxActions('show');
  }

  const videoCode = dataAttr.value,
        isItVimeo = /^[0-9]+$/.test(videoCode),
        videoSize = setVideoSize();
  isItVimeo ? appendVimeoVideo(videoCode, videoSize) : appendYoutubeVideo(videoCode, videoSize);
};

/* harmony default export */ var js_appendVideo = (appendVideo);
;// CONCATENATED MODULE: ./src/modules/_global/js/smallScripts.js
/* global squiz */

/**
 *
 * @desc Showing or hiding load spinner
 * @param action {string}
 * - "show"
 * - "hide"
 */
const loadSpiner = action => {
  const body = document.querySelector('body');
  action === 'show' ? body.classList.add('loading') : body.classList.remove('loading');
}; // export const loadSpiner = (action) => {
//     const body = document.querySelector('body');
//     const lottieLoader = document.createElement('div');
//     lottieLoader.classList.add('lottie-loader__body');
//     lottieLoader.innerHTML = '<lottie-player src="./?a=197380" background="transparent" speed="1" style="width: 80px; height: 80px;" loop="" autoplay=""></lottie-player>';
//     if (action === 'show') {
//         body.classList.add('loading');
//         body.append(lottieLoader);
//     } else {
//         body.classList.remove('loading');
//         body.querySelector('.lottie-loader__body').remove();
//     }
// };

/**
 *
 * @desc Showing or hiding lightBox and clea
 * @param action {string}
 * example:
 * - "show"
 * - "hide"
 */

const lightboxActions = action => {
  const lightbox = document.querySelector('.lightbox-section');

  if (action === 'show') {
    lightbox.classList.add('visible');
  } else {
    lightbox.classList.remove('visible');
    squiz.fn.lightboxClean();
  }
};
/**
 * @desc Removing childrens from '.lightbox__content'
 */

const lightboxClean = () => {
  [...document.querySelector('.lightbox__content').children].map(el => el.parentNode.removeChild(el)); // hide submit when lightbox is reseted

  document.querySelector('.lightbox__button--send').classList.add('hidden');
};
/**
 * @desc support for subscribe button
 */

const subscribeButton = () => {
  var subscribeSubmit = document.querySelector('#subscribe-submit');
  var subscribeUrls = [...document.querySelectorAll('input[data-form-url]')];

  if (subscribeSubmit && subscribeUrls.length) {
    var checkedOnStart = document.querySelector('input[data-form-url]:checked');

    if (checkedOnStart) {
      const url = checkedOnStart.getAttribute('data-form-url');
      subscribeSubmit.setAttribute('data-lightbox-ajax-site', url);
    }

    [...document.querySelectorAll('input[data-form-url]')].map(el => {
      el.addEventListener('click', function (e) {
        subscribeSubmit.classList.remove('btn--disable');
        var url = e.currentTarget.getAttribute('data-form-url');
        subscribeSubmit.setAttribute('data-lightbox-ajax-site', url);
      });
    });
    subscribeSubmit.addEventListener('click', function (e) {
      e.preventDefault();
    });
  }
};
/**
 * @desc add or remove class for carousel 3 items on resize
 */

const carouselCheck = () => {
  const carousels = document.querySelectorAll('.glide[data-glide-story-carousel-id]');

  if (carousels) {
    Array.from(carousels).forEach(storyCarousel => {
      if (window.innerWidth >= squiz.vars.desktopWidthMid) {
        storyCarousel.querySelector('.glide__track').classList.remove('carousel-destroyed');
      } else {
        storyCarousel.querySelector('.glide__track').classList.add('carousel-destroyed');
      }
    });
  }
};
/**
 * @desc proper alignment of bottom link when content centered on mobile devices
 */

const mobileElementsAlign = () => {
  const columnsCentered = document.querySelectorAll('.col-mobile-centered');
  const contentCentered = document.querySelectorAll('.content-mobile-centered');

  if (columnsCentered) {
    Array.from(columnsCentered).forEach(columns => {
      const bottomLink = columns.querySelector('.link-mobile-centered');

      if (bottomLink) {
        bottomLink.classList.add("col-mobile-link");
        columns.classList.add("col-mobile-centered-pb");
      }
    });
  }

  if (contentCentered) {
    Array.from(contentCentered).forEach(content => {
      const staticSizeThree = content.querySelector('.static-size-3');
      const staticSizeFour = content.querySelector('.static-size-4');

      if (staticSizeFour && staticSizeFour.parentNode.classList.contains('content-mobile-centered')) {
        staticSizeFour.parentNode.classList.add('col-mobile-centered');
      }

      if (staticSizeThree && staticSizeThree.parentNode.classList.contains('content-mobile-centered')) {
        staticSizeThree.parentNode.classList.add('col-4-mobile-centered');
      }
    });
  }
};
/** 
 * @desc Disable corresponding search pagination buttons if they're present on edge pages
 */

const disableEdgeButtonsObserverSetup = () => {
  const targetNode = document.querySelector('.results-wrapper') || null;

  if (targetNode) {
    const config = {
      subtree: true,
      childList: true
    };

    const disableEdgeBtns = () => {
      const btnNext = document.querySelector('.btn--listing-next');
      const btnPrev = document.querySelector('.btn--listing-previous');

      if (btnNext && btnNext.getAttribute('data-startrank') === 'null') {
        btnNext.setAttribute('disabled', true);
      }

      if (btnPrev && btnPrev.getAttribute('data-startrank') === 'null') {
        btnPrev.setAttribute("disabled", true);
      }
    };

    const observer = new MutationObserver(disableEdgeBtns);
    observer.observe(targetNode, config);
  }
};
// EXTERNAL MODULE: ./src/modules/component-search/js/global.js
var global = __webpack_require__(304);
// EXTERNAL MODULE: ./node_modules/custom-select/build/index.js
var build = __webpack_require__(9060);
;// CONCATENATED MODULE: ./src/modules/_global/js/custom-select.js


const runCustomSelect = () => {
  const allSelect = document.querySelectorAll('select');
  Array.from(allSelect).forEach(singleSelect => {
    if (singleSelect.classList.contains('no-custom-select')) {} else (0,build/* default */.Z)(singleSelect);
  });
};

/* harmony default export */ var custom_select = (runCustomSelect);
// EXTERNAL MODULE: ./src/modules/carousel/js/global.js
var js_global = __webpack_require__(5889);
// EXTERNAL MODULE: ./src/modules/carousel_one-story/js/global.js
var carousel_one_story_js_global = __webpack_require__(7642);
;// CONCATENATED MODULE: ./src/modules/_global/js/navigation.js
const accessible = target => {
  const submenu = target.querySelector(".submenu");
  target.setAttribute("aria-expanded", "true");

  if (submenu) {
    submenu.setAttribute("aria-hidden", "false");
  }
};

const activateSingleMenu = target => {
  if (target) {
    target.classList.add("active");
    accessible(target);
  }
};

const disactivateAllMenus = target => {
  const menuItems = document.querySelectorAll(".menu__item ");
  Array.from(menuItems).forEach(item => {
    if (item !== target) {
      const submenu = target.querySelector(".submenu");
      item.classList.remove("active");
      item.setAttribute("aria-expanded", "false");

      if (submenu) {
        submenu.setAttribute("aria-hidden", "false");
      }
    }
  });
};

const removeDesktop = target => {
  const submenu = target.querySelector(".submenu");
  target.classList.remove("active");
  target.setAttribute("aria-expanded", "false");

  if (submenu) {
    submenu.setAttribute("aria-hidden", "false");
  }
};

const addOverlay = () => {
  const mainOverlay = document.querySelector(".main");
  mainOverlay.classList.add("main-overlay");
};

const removeOverlay = () => {
  const mainOverlay = document.querySelector(".main");
  mainOverlay.classList.remove("main-overlay");
};

const handleA11y = () => {
  const menuItems = document.querySelectorAll(".menu__item");
  Array.from(menuItems).forEach(item => {
    item.addEventListener("mouseover", e => {
      const submenu = item.querySelector(".submenu");
      const submenuItems = submenu.querySelectorAll(".submenu__item");
      const submenuItemCount = submenuItems.length;
      if (submenuItemCount === 1) submenu.classList.add("submenu-single");
      e.preventDefault();
      disactivateAllMenus(item);
      activateSingleMenu(item);
      addOverlay();
    });
    item.addEventListener("mouseout", () => {
      removeOverlay();
    });
  });
};

const openSub = target => {
  const nav = document.querySelector(".nav");

  if (target.classList.contains("active") && nav.classList.contains("submenu--open")) {
    target.classList.remove("active");
    nav.classList.remove("submenu--open");
  } else {
    target.classList.add("active");
    nav.classList.add("submenu--open");
    const noExpanded = target.querySelector(".mobile-no-expanded");

    if (noExpanded) {
      const title = noExpanded.querySelector(".title");

      if (title) {
        title.addEventListener("click", () => {
          noExpanded.classList.toggle("open");
          return;
        });
      }
    }
  }
};

const mobileMenu = () => {
  const menuItems = document.querySelectorAll(".menu__item ");
  Array.from(menuItems).forEach(item => {
    const navTitle = item.querySelector(".main-link-title");
    if (item.classList.contains("active")) removeDesktop(item);
    navTitle.parentNode.tagName === "LI" && navTitle.addEventListener("click", e => {
      e.preventDefault();
      disactivateAllMenus(item);
      openSub(item);
    });
  });
};

const handleMenuToggle = () => {
  const nav = document.querySelector(".nav");
  nav.classList.add("responsive");
  const icon = document.querySelector(".global-header__hamburger-icon");
  icon && icon.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      icon.classList.remove("open");
      removeOverlay();
    } else {
      nav.classList.add("open");
      icon.classList.add("open");
      mobileMenu();
      addOverlay();
    }
  });
};

const destroyMobileMenu = target => {
  const nav = target.querySelector(".nav");

  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
  }

  if (nav.classList.contains("submenu--open")) {
    nav.classList.remove("submenu--open");
  }

  if (nav.classList.contains("responsive")) {
    nav.classList.remove("responsive");
  }
};

const responsiveNav = () => {
  const w = window.innerWidth;
  const target = document.querySelector(".global-header");

  if (target) {
    if (w <= 1023) {
      handleMenuToggle();
    } else {
      handleA11y();
      destroyMobileMenu(target);
    }
  }
};

/* harmony default export */ var navigation = (responsiveNav);
// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__(3279);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);
;// CONCATENATED MODULE: ./src/modules/_global/js/fbjsFacetSwitcher.js
/**
  * @desc You can use it to do custom facet switcher
  *
  * @window[fbjsVariableName] - this is fbjs
    window.fbjsName = new Search.default({...})
  *
  * .fbjs-facet-switcher should have:
  * data-facet-query-string-param-name
  * data-facet-selected-category-values - you can split values by using ","
  * data-fbjs-variable-name - name of fbjs variable
  *
  * remember to have empty facet array in "activeFacetsOnStart"
  * example:
        activeFacetsOnStart: {
            'f.pageType|pageType': [],
        },
  *
  * HTML item example:
    <li>
        <input
            class="sq-form-field fbjs-facet-switcher"
            data-facet-query-string-param-name="f.pageType|pageType"
            data-facet-selected-category-values="expertise - software, expertise - product"
            data-fbjs-variable-name="searchAZ"
            type="checkbox"
            name="a-z_2"
            id="a-z_2"
            value="2"
        >
        <label for="a-z_2">Software & Products</label>
    </li>
  */
const fbjsFacetSwitcher = async () => {
  const fbjsFacetSwitcherArray = document.querySelectorAll(".fbjs-facet-switcher");

  if (fbjsFacetSwitcherArray.length) {
    [...fbjsFacetSwitcherArray].map(el => {
      el.addEventListener("click", e => {
        var _window$fbjsVariableN, _window$fbjsVariableN2, _window$fbjsVariableN3, _window$fbjsVariableN12;

        const target = e.currentTarget,
              fbjsVariableName = target.getAttribute("data-fbjs-variable-name"),
              searchFacetName = target.getAttribute("data-facet-query-string-param-name"),
              searchFacetVals = target.getAttribute("data-facet-selected-category-values").replace(/&/gi, "&amp;").split(","),
              arrayOfDisplaingFacets = (_window$fbjsVariableN = window[fbjsVariableName]) === null || _window$fbjsVariableN === void 0 ? void 0 : (_window$fbjsVariableN2 = _window$fbjsVariableN.search) === null || _window$fbjsVariableN2 === void 0 ? void 0 : (_window$fbjsVariableN3 = _window$fbjsVariableN2.activeFacets[searchFacetName]) === null || _window$fbjsVariableN3 === void 0 ? void 0 : _window$fbjsVariableN3.value;

        if (arrayOfDisplaingFacets !== null && arrayOfDisplaingFacets !== void 0 && arrayOfDisplaingFacets.includes(searchFacetVals[0])) {
          [...searchFacetVals].map(el => {
            var _window$fbjsVariableN4, _window$fbjsVariableN5, _window$fbjsVariableN6, _window$fbjsVariableN7;

            const indexOfSearchFacet = arrayOfDisplaingFacets === null || arrayOfDisplaingFacets === void 0 ? void 0 : arrayOfDisplaingFacets.indexOf(el);
            (_window$fbjsVariableN4 = window[fbjsVariableName]) === null || _window$fbjsVariableN4 === void 0 ? void 0 : (_window$fbjsVariableN5 = _window$fbjsVariableN4.search) === null || _window$fbjsVariableN5 === void 0 ? void 0 : (_window$fbjsVariableN6 = _window$fbjsVariableN5.activeFacets[searchFacetName]) === null || _window$fbjsVariableN6 === void 0 ? void 0 : (_window$fbjsVariableN7 = _window$fbjsVariableN6.value) === null || _window$fbjsVariableN7 === void 0 ? void 0 : _window$fbjsVariableN7.splice(indexOfSearchFacet, 1);
          });
        } else {
          [...searchFacetVals].map(el => {
            var _window$fbjsVariableN8, _window$fbjsVariableN9, _window$fbjsVariableN10, _window$fbjsVariableN11;

            (_window$fbjsVariableN8 = window[fbjsVariableName]) === null || _window$fbjsVariableN8 === void 0 ? void 0 : (_window$fbjsVariableN9 = _window$fbjsVariableN8.search) === null || _window$fbjsVariableN9 === void 0 ? void 0 : (_window$fbjsVariableN10 = _window$fbjsVariableN9.activeFacets[searchFacetName]) === null || _window$fbjsVariableN10 === void 0 ? void 0 : (_window$fbjsVariableN11 = _window$fbjsVariableN10.value) === null || _window$fbjsVariableN11 === void 0 ? void 0 : _window$fbjsVariableN11.push(el);
          });
        }

        (_window$fbjsVariableN12 = window[fbjsVariableName]) === null || _window$fbjsVariableN12 === void 0 ? void 0 : _window$fbjsVariableN12.doSearch(true, true);
      });
    });
  }
};
const fbjsFacetSwitcherUnticker = () => {
  const activeFacets = document.querySelector(".c-filters .active-facets");

  if (activeFacets) {
    activeFacets.addEventListener("click", e => {
      if (e.target.nodeName === "SPAN" && e.target.getAttribute("param") && e.target.getAttribute("name")) {
        [...document.getElementsByClassName("dropdown-list")].forEach(el => {
          const input = el.querySelector(`input[data-facet-query-string-param-name="${e.target.getAttribute("param")}"][data-facet-selected-category-values="${e.target.getAttribute("name")}"]`);

          if (input) {
            input.checked = false;

            if (input.closest("li").classList.contains("dropdownActive")) {
              input.closest("li").classList.remove("dropdownActive");
            }
          }
        });
      }
    });
  }
};
// EXTERNAL MODULE: ./src/modules/filters-redesign/js/global.js
var filters_redesign_js_global = __webpack_require__(6566);
;// CONCATENATED MODULE: ./src/modules/_global/js/fbjsDateNarrowing.js

/**
 * Component example
    <div class="to-remove">
        <input type="date" name="party" class="fbjs-date-from" data-fbjs-variable-name="webinarsEvents" data-fbjs-narrowing-variable-name="fbStartDate">
        <input type="date" name="party" class="fbjs-date-to" data-fbjs-variable-name="webinarsEvents" data-fbjs-narrowing-variable-name="fbEndDate">
    </div>

* data-fbjs-variable-name -  name of object with fbjs
* data-fbjs-narrowing-variable-name - name of numeric meta from funnelback
*/

const fbjsDateNarrowing = () => {
  const dateFromSelector = document.querySelector(".fbjs-date-from"),
        dateToSelector = document.querySelector(".fbjs-date-to");
  /**
   *
   * @param {string} target  - event.target
   * @param {string} metadata - here ge_fbdate or le_fbdate.
   * We are using funnelback numeric meta "fbdate" to narrow results,
   * to see more about this, look here:
   * https://docs.squiz.net/funnelback/archive/15.24/customise/metadata-customisation/metadata-class-types.html
   */

  const dateSwitcher = (target, metadata) => {
    let dataValue = target.value || "",
        fbjsVariableName = target.getAttribute("data-fbjs-variable-name");

    if (dataValue) {
      dataValue = dataValue.replace(/-/g, "");
      window[fbjsVariableName].search.additionalFBParams[metadata] = dataValue;
      window[fbjsVariableName].doSearch(true, true);
    } else {
      if (window[fbjsVariableName].search.additionalFBParams[metadata]) {
        delete window[fbjsVariableName].search.additionalFBParams[metadata];
        window[fbjsVariableName].doSearch(true, true);
      }
    }
  };

  const changeDate = dateToChange => {
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          splitedDate = dateToChange.split("-");
    return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
  };

  const dateValidationRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  const removeReadonlyInputOverlay = e => {
    const targetInput = e.target.parentNode.querySelector('input[type="date"]') || null;
    e.target.closest(".date-picker-container").classList.remove("type-changed");
    targetInput.setAttribute("type", "text");
    targetInput.blur();

    if (targetInput) {
      targetInput.value = "";
      targetInput.removeAttribute("readonly");
      targetInput.setAttribute("tabIndex", "0");
      e.target.parentNode.replaceWith(...e.target.parentNode.childNodes);
      e.target.remove(); // targetInput.focus();
    }
  };

  const switchInputTypeOnFocus = () => {
    const dateFromText = document.querySelector('.fbjs-date-from[type="text"]') || null;
    const dateToText = document.querySelector('.fbjs-date-to[type="text"]') || null;

    if (dateFromText && dateToText) {
      dateFromText.addEventListener("focus", function (e) {
        e.target.setAttribute("type", "date");
        e.target.showPicker();
      });
      dateToText.addEventListener("focus", function (e) {
        e.target.setAttribute("type", "date");
        e.target.showPicker();
      });
      dateFromText.addEventListener("input", async function (e) {
        e.target.parentNode.classList.add("type-changed");
      });
      dateToText.addEventListener("input", async function (e) {
        e.target.parentNode.classList.add("type-changed");
      });
    }
  };

  switchInputTypeOnFocus();

  const handleReadonlyInput = (inputSelector, validationRegex) => {
    inputSelector.addEventListener("change", async e => {
      const attribute = e.target.getAttribute("data-fbjs-narrowing-variable-name");
      const target = e.currentTarget;

      if (e.target.validity.badInput) {
        inputSelector.classList.add("input-error");
      } else {
        inputSelector.classList.contains("input-error") && inputSelector.classList.remove("input-error");

        if (inputSelector.value === "") {
          inputSelector.setAttribute("type", "text");
          inputSelector.parentNode.classList.remove("type-changed");
        }
      }

      if (validationRegex.test(e.target.value)) {
        e.target.setAttribute("readonly", true);
        const dateWrapper = document.createElement("div");
        const dateInputParent = inputSelector.parentNode;
        const dateOverlay = document.createElement("span");
        dateOverlay.classList.add("date-filled-static");
        dateWrapper.classList.add("date-input-wrapper");
        dateOverlay.setAttribute("tabIndex", "0");
        e.target.setAttribute("tabIndex", "-1");
        dateInputParent.insertBefore(dateWrapper, inputSelector);
        dateWrapper.appendChild(inputSelector);
        dateWrapper.appendChild(dateOverlay);
        dateOverlay.innerText = changeDate(e.target.value);
        await new Promise(() => {
          inputSelector.parentNode.addEventListener("click", e => {
            if (e.target.classList.contains("date-filled-static")) {
              removeReadonlyInputOverlay(e);
              (0,filters_redesign_js_global/* countAppliedFilters */.AS)();

              if (target.getAttribute("placeholder") === "To") {
                dateSwitcher(target, "le_" + attribute);
              } else {
                dateSwitcher(target, "ge_" + attribute);
              }
            }
          });
          inputSelector.parentNode.addEventListener("keydown", e => {
            if (e.target.classList.contains("date-filled-static")) {
              e.keyCode === 9 || e.keyCode === 16 ? null : e.preventDefault();

              if (e.keyCode === 32 || e.keyCode === 13) {
                removeReadonlyInputOverlay(e);
              }
            }
          });
        });
      }
    });
  };

  const urlParams = new URLSearchParams(window.location.href);
  let dateFrom = urlParams.get("dateFrom");
  let dateTo = urlParams.get("dateTo");

  if (dateFrom != null && dateTo != null) {
    dateFromSelector.focus();
    dateFromSelector.value = dateFrom;
    const narrowingVariableFrom = dateFromSelector.getAttribute("data-fbjs-narrowing-variable-name");
    dateSwitcher(dateFromSelector, `ge_${narrowingVariableFrom}`);
    handleReadonlyInput(dateFromSelector, dateValidationRegex);
    dateFromSelector.blur();
    dateToSelector.focus();
    dateToSelector.value = dateTo;
    const narrowingVariableTo = dateToSelector.getAttribute("data-fbjs-narrowing-variable-name");
    dateSwitcher(dateToSelector, `le_${narrowingVariableTo}`);
    handleReadonlyInput(dateToSelector, dateValidationRegex);
    dateToSelector.blur();
  }

  if (dateFromSelector) {
    dateFromSelector.addEventListener("input", function (e) {
      const narrowingVariable = dateFromSelector.getAttribute("data-fbjs-narrowing-variable-name");
      dateSwitcher(e.currentTarget, `ge_${narrowingVariable}`);
    });
    handleReadonlyInput(dateFromSelector, dateValidationRegex);
  }

  if (dateToSelector) {
    dateToSelector.addEventListener("input", function (e) {
      const narrowingVariable = dateFromSelector.getAttribute("data-fbjs-narrowing-variable-name");
      dateSwitcher(e.currentTarget, `le_${narrowingVariable}`);
    });
    handleReadonlyInput(dateToSelector, dateValidationRegex);
  }
};
;// CONCATENATED MODULE: ./src/modules/_global/js/sticky.js
const getStickyFromTop = () => {
  const stickyElements = Array.from(document.querySelectorAll(".element-sticky"));

  const getOuterHeight = element => {
    const height = element.offsetHeight,
          style = window.getComputedStyle(element);
    return ["top", "bottom"].map(side => parseInt(style[`margin-${side}`])).reduce((total, side) => total + side, height);
  };

  const wrapElement = (element, wrapper) => {
    wrapper.classList.add("stickyWrapper");
    wrapper.setAttribute("style", "height:fit-content");
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  };

  if (stickyElements.length) {
    let totalStickyOffsetTop = 0;
    let totalScrollOffsetTop = 0;
    stickyElements.forEach(element => {
      const elementHeight = element.clientHeight;
      const elementOffsetTop = element.offsetTop;
      const elementStickyOffsetTop = totalStickyOffsetTop;
      const elementScrollOffsetTop = totalScrollOffsetTop;
      const classSticky = "is-sticky";
      const outerHeight = getOuterHeight(element);
      wrapElement(element, document.createElement("div"), outerHeight);
      document.addEventListener("scroll", () => {
        if (window.pageYOffset + elementScrollOffsetTop > elementOffsetTop) {
          element.setAttribute("style", "top:" + elementStickyOffsetTop + "px;");
          element.classList.add(classSticky);
        } else {
          element.classList.remove(classSticky);
          element.setAttribute("style", "top:" + 0 + "px;");
        }
      });
      totalStickyOffsetTop += elementHeight;
      totalScrollOffsetTop += elementHeight;
    });
  }
};

/* harmony default export */ var sticky = (getStickyFromTop);
// EXTERNAL MODULE: ./src/modules/tags/js/global.js
var tags_js_global = __webpack_require__(7762);
// EXTERNAL MODULE: ./src/modules/progress-bar/js/global.js
var progress_bar_js_global = __webpack_require__(4359);
// EXTERNAL MODULE: ./src/modules/redesign-submenu/js/global.js
var redesign_submenu_js_global = __webpack_require__(807);
// EXTERNAL MODULE: ./src/modules/auto-translate/js/global.js + 2 modules
var auto_translate_js_global = __webpack_require__(8190);
// EXTERNAL MODULE: ./src/modules/filters/js/global.js
var filters_js_global = __webpack_require__(7676);
;// CONCATENATED MODULE: ./src/modules/_global/js/global.js
















 // Global variables

let global_squiz = {
  fn: {
    appendVideo: js_appendVideo,
    loadSpiner: loadSpiner,
    lightboxActions: lightboxActions,
    lightboxClean: lightboxClean,
    runCustomSelect: custom_select,
    subscribeButton: subscribeButton,
    carouselCheck: carouselCheck
  },
  vars: {
    desktopWidth: 1025,
    desktopWidthMid: 1231
  }
};
window.squiz = global_squiz;
let windowWidth;
/**
 * @description - Init functions when DOM is ready
 */

document.addEventListener("DOMContentLoaded", function () {
  windowWidth = window.innerWidth;
  (0,global/* default */.Z)();
  custom_select();
  navigation();
  fbjsFacetSwitcher();
  fbjsFacetSwitcherUnticker();
  fbjsDateNarrowing();
  global_squiz.fn.subscribeButton();
});
window.addEventListener('load', function () {
  (0,js_global/* default */.Z)();
  (0,carousel_one_story_js_global/* default */.Z)();
  sticky();
  (0,tags_js_global/* default */.Z)();
  mobileElementsAlign();
  (0,auto_translate_js_global/* googleTranslateElementInit2 */.mS)();
  (0,auto_translate_js_global/* changeOpenerLang */.Dy)();
  (0,auto_translate_js_global/* checkSelectOption */.gc)();
  (0,progress_bar_js_global/* default */.Z)();
  (0,redesign_submenu_js_global/* default */.Z)();
  disableEdgeButtonsObserverSetup();
  (0,filters_redesign_js_global/* handleEndMarketDropdown */.I6)();
  (0,filters_redesign_js_global/* handleGeographyDropdown */.ok)();
  (0,filters_js_global/* default */.Z)();
});
/**
 * @description - Global onresize
 */

window.onresize = debounce_default()(function () {
  if (window.innerWidth != windowWidth) {
    // Update the window width for next time
    windowWidth = window.innerWidth;
    navigation();
    carouselCheck();
  }
}, 30);

const customCheckboxHandler = () => {
  const customCheckbox = document.querySelectorAll(".custom-checkbox-input") ?? null;
  customCheckbox && customCheckbox.forEach(item => {
    item.addEventListener("click", e => {
      e.currentTarget.classList.toggle("input-checked");
    });
  });
};

customCheckboxHandler();

/***/ }),

/***/ 5508:
/***/ (function() {

const accordionWithAccessibility = options => {
  Array.from(document.querySelectorAll(options.wrapper)).forEach(accordion => {
    const allowMultiple = accordion.hasAttribute('data-allow-multiple');
    const allowToggle = allowMultiple ? allowMultiple : accordion.hasAttribute('data-allow-toggle');
    const triggersSelString = options.trigger ? options.trigger : '.accordion-trigger';
    const triggersSelStringText = triggersSelString.replace(/\.|#/, '');
    const triggers = Array.from(accordion.querySelectorAll(triggersSelString));

    const expandAccordion = target => {
      target.setAttribute('aria-expanded', 'true');

      if (options.openText && options.closeText) {
        target.querySelector('.accordion-title').innerHTML = options.openText;
      }

      document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');

      if (!allowToggle) {
        target.setAttribute('aria-disabled', 'true');
      }
    };

    const collapseAccordion = target => {
      target.setAttribute('aria-expanded', 'false');
      document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');
    };

    accordion.addEventListener('click', e => {
      const target = e.target;

      if (target.classList.contains(triggersSelStringText)) {
        const isExpanded = target.getAttribute('aria-expanded') == 'true';

        if (!isExpanded) {
          expandAccordion(target);
        } else if (allowToggle && isExpanded) {
          collapseAccordion(target);
        }

        e.preventDefault();
      }
    });
    accordion.addEventListener('keydown', e => {
      const target = e.target;
      const key = e.which.toString();
      const ctrlModifier = e.ctrlKey && key.match(/33|34/);

      if (target.classList.contains(triggersSelStringText)) {
        if (key.match(/38|40/) || ctrlModifier) {
          const index = triggers.indexOf(target);
          const direction = key.match(/34|40/) ? 1 : -1;
          const length = triggers.length;
          const newIndex = (index + length + direction) % length;
          triggers[newIndex].focus();
          e.preventDefault();
        } else if (key.match(/35|36/)) {
          switch (key) {
            case '36':
              triggers[0].focus();
              break;

            case '35':
              triggers[triggers.length - 1].focus();
              break;
          }

          e.preventDefault();
        }
      }

      if (key.match(/27/)) {
        if (target.classList.contains(triggersSelStringText)) {
          expandAccordion(target);
        } else {
          const buttonSel = target.closest(options.wrapper).querySelector(triggersSelString);
          collapseAccordion(buttonSel);
        }
      }
    });
    accordion.querySelectorAll(triggersSelString).forEach(trigger => {
      trigger.addEventListener('focus', () => {
        accordion.classList.add('focus');
      });
      trigger.addEventListener('blur', () => {
        accordion.classList.remove('focus');
      });
    });

    if (!allowToggle) {
      const expanded = accordion.querySelector('[aria-expanded="true"]');

      if (expanded) {
        expanded.setAttribute('aria-disabled', 'true');
      }
    }
  });

  function fnBrowserDetect() {
    let userAgent = navigator.userAgent;

    if (userAgent.match(/firefox|fxios/i)) {
      const labels = document.querySelectorAll(".accordion-label");
      labels.forEach(label => {
        label.style.padding = "0.6rem 0.4rem 0.5rem 0.4rem";
      });
    }
  }

  fnBrowserDetect();
};

accordionWithAccessibility({
  wrapper: ".accordion-wrapper"
});

/***/ }),

/***/ 2958:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--articles")) {
  const addedResults = [];
  const addedIds = [];
  let hasActiveFilters;
  window.searchArticles = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "insight - article"
    },
    onFiltersUpdate: () => {
      var _window$searchArticle;

      const activeFilters = (_window$searchArticle = window.searchArticles) === null || _window$searchArticle === void 0 ? void 0 : _window$searchArticle.search.activeFacets;

      for (const entry in activeFilters) {
        if (activeFilters[entry].value !== []) {
          hasActiveFilters = true;
          return hasActiveFilters;
        }
      }
    },
    beforeSearch: () => {},
    results: {
      numRanks: 18
    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": [],
      "f.geographies|geographies": []
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: true,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        if (!addedResults.includes(fields.title.toLowerCase()) && !addedIds.includes(fields.metaData.id)) {
          addedResults.push(fields.title.toLowerCase());
          addedIds.push(fields.metaData.id);

          const changeDate = () => {
            const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  // dateFromFunnelback = fields.metaData.d, // 2017-08-10
            splitedDate = fields.metaData.d.split("-");
            return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
          };

          return `
                    <a href="${fields.liveUrl}" class="cards__card-wrapper cards__card-wrapper--news date-mobile">
                        <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                            <div class="cards__image-wrapper">
                                <div class="cards__image"><img src="${fields.metaData.image || `https://woodplc.com/?a=235271`}" alt=""></div>
                            </div>
                            <div class="cards__content no-gutters flex-column justify-content-between">
                                                        <div class="cards__title-wrapper">

                            <p class="cards__title truncate-lines-2">${fields.title}
                            </p>
                            </div>
                            <p class="cards__publish-date-mobile">${changeDate()}</p>
                            </div>
                        </article>
                    </a>`;
        } else {
          return "";
        }
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       */
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Articles search"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       */
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       */
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       */
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       */
      loadMoreTemplate: () => {
        return `<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>`;
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       */
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        if (hasActiveFilters) {
          return `<div>There are no results matching your filter criteria</div>`;
        } else {
          return `<div>We're sorry, we couldn't find anything matching</div>`;
        }
      }
    }
  });
  window.searchArticles.init();
}

/***/ }),

/***/ 8190:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Dy": function() { return /* binding */ changeOpenerLang; },
  "gc": function() { return /* binding */ checkSelectOption; },
  "mS": function() { return /* binding */ googleTranslateElementInit2; }
});

;// CONCATENATED MODULE: ./src/modules/auto-translate/js/countryToLanguageMapping.js
const countryToLanguageMapping = {
  'ad': 'ca',
  'ae': 'ar',
  'af': 'fa',
  'ag': 'en',
  'ai': 'en',
  'al': 'sq',
  'am': 'hy',
  'an': 'nl',
  'ao': 'pt',
  'ar': 'es',
  'as': 'en',
  'at': 'de',
  'au': 'en',
  'aw': 'nl',
  'ax': 'sv',
  'ba': 'hr',
  'bb': 'en',
  'bd': 'en',
  'be': 'nl',
  'bf': 'fr',
  'bh': 'ar',
  'bi': 'fr',
  'bj': 'fr',
  'bl': 'fr',
  'bm': 'en',
  'bn': 'ms',
  'bo': 'es',
  'br': 'pt',
  'bs': 'en',
  'bt': 'en',
  'bv': 'no',
  'bw': 'en',
  'by': 'be',
  'bz': 'en',
  'ca': 'en',
  'cc': 'en',
  'cd': 'fr',
  'cf': 'fr',
  'cg': 'fr',
  'ch': 'de',
  'ci': 'fr',
  'ck': 'en',
  'cl': 'es',
  'cm': 'fr',
  'cn': 'zh-CN',
  'co': 'es',
  'cr': 'es',
  'cu': 'es',
  'cv': 'pt',
  'cx': 'en',
  'cy': 'el',
  'cz': 'cs',
  'dj': 'fr',
  'dk': 'da',
  'dm': 'en',
  'do': 'es',
  'dz': 'ar',
  'ec': 'es',
  'ee': 'et',
  'eg': 'ar',
  'eh': 'ar',
  'er': 'ar',
  'es': 'es',
  'et': 'en',
  'fi': 'fi',
  'fj': 'en',
  'fk': 'en',
  'fm': 'en',
  'ga': 'fr',
  'gb': 'en',
  'gd': 'en',
  'ge': 'ka',
  'gf': 'fr',
  'gg': 'en',
  'gh': 'en',
  'gi': 'en',
  'gl': 'da',
  'gm': 'en',
  'gn': 'fr',
  'gp': 'fr',
  'gq': 'es',
  'gr': 'el',
  'gs': 'en',
  'gt': 'es',
  'gu': 'en',
  'gw': 'pt',
  'gy': 'en',
  'hk': 'en',
  'hm': 'en',
  'hn': 'es',
  'ht': 'fr',
  'ie': 'en',
  'il': 'en',
  'im': 'en',
  'in': 'hi',
  'io': 'en',
  'iq': 'ar',
  'ir': 'fa',
  'it': 'it',
  'je': 'en',
  'jm': 'en',
  'jo': 'ar',
  'jp': 'ja',
  'ke': 'sw',
  'kg': 'ru',
  'kh': 'en',
  'ki': 'en',
  'km': 'ar',
  'kn': 'en',
  'kp': 'ko',
  'kr': 'ko',
  'kw': 'ar',
  'ky': 'en',
  'kz': 'ru',
  'la': 'en',
  'lb': 'ar',
  'lc': 'en',
  'li': 'de',
  'lk': 'en',
  'lr': 'en',
  'ls': 'en',
  'lu': 'fr',
  'ly': 'ar',
  'ma': 'ar',
  'mc': 'fr',
  'md': 'ru',
  'me': 'sq',
  'mf': 'fr',
  'mg': 'fr',
  'mh': 'en',
  'ml': 'fr',
  'mm': 'en',
  'mo': 'pt',
  'mp': 'en',
  'mq': 'fr',
  'mr': 'ar',
  'ms': 'en',
  'mt': 'mt',
  'mu': 'fr',
  'mv': 'en',
  'mw': 'en',
  'mx': 'es',
  'my': 'ms',
  'mz': 'pt',
  'na': 'en',
  'nc': 'fr',
  'ne': 'fr',
  'nf': 'en',
  'ng': 'en',
  'ni': 'es',
  'no': 'no',
  'np': 'en',
  'nr': 'en',
  'nu': 'en',
  'nz': 'en',
  'om': 'ar',
  'pa': 'es',
  'pe': 'es',
  'pf': 'fr',
  'pg': 'en',
  'ph': 'en',
  'pk': 'en',
  'pl': 'pl',
  'pm': 'fr',
  'pn': 'en',
  'pr': 'es',
  'ps': 'ar',
  'pw': 'en',
  'py': 'es',
  'qa': 'ar',
  're': 'fr',
  'rs': 'sr',
  'rw': 'fr',
  'sa': 'ar',
  'sb': 'en',
  'sc': 'fr',
  'sd': 'ar',
  'se': 'sv',
  'sg': 'en',
  'sh': 'en',
  'si': 'sl',
  'sj': 'no',
  'sl': 'en',
  'sm': 'it',
  'sn': 'fr',
  'so': 'ar',
  'sr': 'nl',
  'st': 'pt',
  'ss': 'en',
  'sv': 'es',
  'sy': 'ar',
  'sz': 'en',
  'tc': 'en',
  'td': 'fr',
  'tf': 'fr',
  'tg': 'fr',
  'tj': 'ru',
  'tk': 'en',
  'tl': 'pt',
  'tm': 'en',
  'tn': 'ar',
  'to': 'en',
  'tt': 'en',
  'tv': 'en',
  'tw': 'zh-TW',
  'tz': 'sw',
  'ua': 'uk',
  'ug': 'en',
  'um': 'en',
  'us': 'en',
  'uy': 'es',
  'uz': 'en',
  'va': 'it',
  'vc': 'en',
  've': 'es',
  'vg': 'en',
  'vi': 'en',
  'vn': 'vi',
  'vu': 'en',
  'wf': 'fr',
  'ws': 'en',
  'ye': 'ar',
  'yt': 'fr',
  'za': 'af',
  'zm': 'en',
  'zw': 'en'
};
/* harmony default export */ var js_countryToLanguageMapping = (countryToLanguageMapping);
;// CONCATENATED MODULE: ./src/modules/auto-translate/js/languageCodeToName.js
const languageCodeToName = {
  'af': 'Afrikaans',
  'sq': 'shqiptare',
  'ar': 'عربى',
  'hy': 'հայերեն',
  'az': 'Azərbaycan',
  'eu': 'euskara',
  'be': 'беларуская',
  'bg': 'български',
  'ca': 'català',
  'zh-CN': '简体中文）',
  'zh-TW': '中國傳統的）',
  'hr': 'Hrvatski',
  'cs': 'čeština',
  'da': 'dansk',
  'nl': 'Nederlands',
  'et': 'eesti keel',
  'tl': 'Filipino',
  'fi': 'Suomalainen',
  'fr': 'français',
  'gl': 'galego',
  'ka': 'ქართული',
  'de': 'Deutsch',
  'el': 'Ελληνικά',
  'ht': 'Kreyòl ayisyen',
  'iw': 'עִברִית',
  'hi': 'हिन्दी',
  'hu': 'Magyar',
  'is': 'íslenskur',
  'id': 'bahasa Indonesia',
  'ga': 'Gaeilge',
  'it': 'italiano',
  'ja': '日本',
  'ko': '한국인',
  'lv': 'latviski',
  'lt': 'lietuvių',
  'mk': 'македонски',
  'ms': 'Melayu',
  'mt': 'Malti',
  'no': 'norsk',
  'fa': 'فارسی',
  'pl': 'polski',
  'pt': 'Português',
  'ro': 'Română',
  'ru': 'русский',
  'sr': 'Српски',
  'sk': 'slovenský',
  'sl': 'Slovenščina',
  'es': 'español',
  'sw': 'kiswahili',
  'sv': 'svenska',
  'th': 'ไทย',
  'tr': 'Türkçe',
  'uk': 'український',
  'ur': 'اردو',
  'vi': 'Tiếng Việt',
  'cy': 'Cymraeg',
  'yi': 'יידיש'
};
/* harmony default export */ var js_languageCodeToName = (languageCodeToName);
;// CONCATENATED MODULE: ./src/modules/auto-translate/js/global.js

 // Google Translate functions

function googleTranslateElementInit2() {
  const google = window.google;
  new google.translate.TranslateElement({
    pageLanguage: "en",
    autoDisplay: false
  }, "google_translate_element2");
}

function GTranslateGetCurrentLang() {
  var keyValue = document["cookie"].match("(^|;) ?googtrans=([^;]*)(;|$)");
  return keyValue ? keyValue[2].split("/")[2] : null;
}

function GTranslateFireEvent(element, event) {
  try {
    if (document.createEventObject) {
      var evt = document.createEventObject();
      element.fireEvent("on" + event, evt);
    } else {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true);
      element.dispatchEvent(evt);
    }
  } catch (e) {}
}

function doGTranslate(lang_pair) {
  if (lang_pair.value) lang_pair = lang_pair.value;
  if (lang_pair == "") return;
  var lang = lang_pair.split("|")[1];
  if (GTranslateGetCurrentLang() == null && lang == lang_pair.split("|")[0]) return;
  var teCombo;
  var sel = document.getElementsByTagName("select");

  for (var i = 0; i < sel.length; i++) if (sel[i].className.indexOf("goog-te-combo") != -1) {
    teCombo = sel[i];
    break;
  }

  if (document.getElementById("google_translate_element2") == null || document.getElementById("google_translate_element2").innerHTML.length == 0 || teCombo.length == 0 || teCombo.innerHTML.length == 0) {
    setTimeout(function () {
      doGTranslate(lang_pair);
    }, 500);
  } else {
    teCombo.value = lang;
    GTranslateFireEvent(teCombo, "change");
    GTranslateFireEvent(teCombo, "change");
  }
}

const gtSelect = document.querySelector(".gt__select");
const changeOpenerLang = () => {
  const opener = document.querySelector(".header .custom-select-opener");
  const googtransValue = getCookie("googtrans");
  let openerLang;

  if (googtransValue) {
    openerLang = googtransValue.split("/").pop().toUpperCase().split("-").pop();
  } else {
    openerLang = "EN";
  }

  const newOpenerSpan = document.querySelector(".new-opener");

  if (newOpenerSpan) {
    newOpenerSpan.innerText = openerLang;
  } else {
    const newOpener = document.createElement("span");
    newOpener.setAttribute("class", "new-opener notranslate");
    newOpener.innerText = openerLang;
    opener.append(newOpener);
  }
}; // language select

const translateBySelect = () => {
  if (gtSelect.value === "en|en") {
    localStorage.setItem("showPromptAgain", "yes");
    showPrompt();
  } else {
    localStorage.setItem("showPromptAgain", "no");
  }
};

const checkSelectOption = () => {
  const cstSel = document.querySelector(".customSelect").customSelect;
  const googtransVal = getCookie("googtrans");
  let googtransLang;
  googtransLang = googtransVal.split("/");
  cstSel.value = `en|${googtransLang[googtransLang.length - 1]}`;
};
gtSelect.addEventListener("change", function () {
  doGTranslate(gtSelect);
  setCookie("googtrans", `/en/${gtSelect.value.split("|").pop()}`);
  changeOpenerLang();
  translateBySelect();
  checkSelectOption();
}); // Cookies

function setCookie(cname, cvalue, domain = "www.woodplc.com") {
  document.cookie = cname + "=" + cvalue + ";" + "domain=" + domain + ";";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

let visited = localStorage.getItem("visited");

function checkVisit() {
  if (!visited || visited === "false") {
    localStorage.setItem("showPromptAgain", "yes");
    localStorage.setItem("visited", "true");
  }
}

checkVisit(); // Find language for user localisation

let country;
let language;
let countryExists = "false";

const checkIfCountryExists = async country => {
  if (js_countryToLanguageMapping[country.toLowerCase()] != undefined) {
    countryExists = "true";
  }
};

const findLanguage = async () => {
  await fetch("https://wood-search01.squiz.co.uk/s/search.json?collection=wood-meta&profile=_default&query=getlocationoftheuser").then(res => res.json()).then(response => {
    country = response.question.location.countryCode;
    checkIfCountryExists(country);

    if (countryExists === "true") {
      language = js_countryToLanguageMapping[country.toLowerCase()];
    }
  }).catch(error => {
    console.log("Error:", error);
  });
}; // Set language


const englishSelected = () => {
  localStorage.setItem("showPromptAgain", "no");
  gtSelect.value = "en|en";
  doGTranslate(gtSelect);
  changeOpenerLang();
};

const localeLangSelected = language => {
  localStorage.setItem("showPromptAgain", "no");
  setCookie("googtrans", `/en/${language}`);
  gtSelect.value = `en|${language}`;
  doGTranslate(gtSelect);
  changeOpenerLang();
  checkSelectOption();
};

const showTranslateLightbox = async language => {
  var _languageCodeToName$l, _languageCodeToName$l2;

  const showPromptAgain = localStorage.getItem("showPromptAgain");
  const languagePrompt = document.createElement("div");
  languagePrompt.setAttribute("class", "auto-translate__section");
  languagePrompt.innerHTML = `
        <div class="auto-translate__wrapper">
            <p class="auto-translate__title">Language settings</p>
            <p class="auto-translate__text">Select which variant of our site you would prefer to visit today</p>
            <button class="btn btn--primary english">English</button>
            <button class="btn btn--tertiary locale-lang">${((_languageCodeToName$l = js_languageCodeToName[language]) === null || _languageCodeToName$l === void 0 ? void 0 : _languageCodeToName$l.charAt(0).toUpperCase()) + ((_languageCodeToName$l2 = js_languageCodeToName[language]) === null || _languageCodeToName$l2 === void 0 ? void 0 : _languageCodeToName$l2.slice(1))}</button>
        <div>`;
  const container = document.querySelector(".page-wrapper");
  js_languageCodeToName[language] && container.append(languagePrompt);
  const prompt = document.querySelector(".auto-translate__section");

  if (language != "en" && language != undefined && showPromptAgain === "yes") {
    prompt.classList.add("visible");
  }

  const englishButton = document.querySelector(".btn.english");
  const localeLangButton = document.querySelector(".btn.locale-lang");
  englishButton && englishButton.addEventListener("click", function () {
    englishSelected();
    prompt.classList.remove("visible");
  });
  localeLangButton && localeLangButton.addEventListener("click", function () {
    localeLangSelected(language);
    prompt.classList.remove("visible");
  });
};

const showPrompt = async () => {
  await findLanguage();
  await showTranslateLightbox(language);
};

showPrompt();

/***/ }),

/***/ 9794:
/***/ (function() {

/* global Search, searchAZData, searchAZDataRaw */
if (document.querySelector(".fbjs-search--az")) {
  let hasActiveFilters = false;
  window.searchAZDataRaw = [];
  window.searchAZData = {
    aditionalInfo: {
      resetData: 1,
      displayExpertise: 0
    },
    keyMarketEnergy: null,
    keyMarketEnvironment: null,
    expertise: {},
    softwareAndProducts: {
      software: null,
      products: null
    },
    profile: null
  };

  const sortData = () => {
    const alphabetTab = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var exp = searchAZDataRaw.filter(el => el.pageType === "Expertise - Expertise");
    alphabetTab.map(el => {
      searchAZData.expertise[el] = exp.filter(item => {
        if (item.title.charAt(0) == el | el.toLowerCase()) {
          searchAZData.aditionalInfo.displayExpertise = 1;
          return true;
        } else {
          return false;
        }
      });
    });
    searchAZData.keyMarketEnergy = searchAZDataRaw.filter(el => el.pageType === "Key Market" && el.url.includes("key-markets/energy")).sort((a, b) => a.title > b.title ? 1 : -1);
    searchAZData.keyMarketEnvironment = searchAZDataRaw.filter(el => el.pageType === "Key Market" && el.url.includes("key-markets/built-environment")).sort((a, b) => a.title > b.title ? 1 : -1);
    searchAZData.softwareAndProducts.software = searchAZDataRaw.filter(el => el.pageType === "Expertise - Software").sort((a, b) => a.title > b.title ? 1 : -1);
    searchAZData.softwareAndProducts.products = searchAZDataRaw.filter(el => el.pageType === "Expertise - Product");
    searchAZData.profile = searchAZDataRaw.filter(el => el.pageType === "Expertise - SME Profile").sort((a, b) => a.title > b.title ? 1 : -1);
  };

  const buildHtml = async () => {
    let output = '<div class="results-wrapper--az">';
    /**
     *
     * @param {string} clickTrackingUrl - url to item
     * @param {string} title  - title of iteme
     * @returns  html
     */

    const barTemplate = (pageType, clickTrackingUrl, title, description) => {
      if (description !== undefined && (pageType === "Expertise - Software" || pageType === "Expertise - Product")) {
        return `<div class="col-4 col-md-6 col-sm-12 col-lg-4 static-size-4 btn-container" tabindex="0">
                             <a tabindex="-1" 
                             class="btn btn--module-white btn--a-z" 
                             aria-expanded="false" 
                             href="https://wood-search01.squiz.co.uk${clickTrackingUrl}">
                            ${pageType === "Expertise - Software" ? '<span class="btn-module-text">' + title + '<span class="expertise-type">/ software</span></span>' : ""}
                            ${pageType === "Expertise - Product" ? '<span class="btn-module-text">' + title + '<span class="expertise-type">/ product</span></span>' : ""}
                            ${pageType === "Expertise - Software" || pageType === "Expertise - Product" ? "" : title}
                            </a>
                 <div class="btn-module-collapse">
                     <div class="truncate-lines-4">${description}</div>
                 </div>
             </div>`;
      } else {
        return `<div class="col-4 col-md-6 col-sm-12 col-lg-4 static-size-4 btn-container" tabindex="0">
                             <a tabindex="-1" 
                             class="btn btn--module-white btn--a-z" 
                             aria-expanded="false" 
                             href="https://wood-search01.squiz.co.uk${clickTrackingUrl}">
                            ${title}
                            </a>
             </div>`;
      }
    };
    /**
     *
     * @param {[]} array array with items
     * @param {string} heading
     * @returns  html
     */


    const barWrapperTemplate = (array, heading) => {
      if (array.length) {
        let output = "";
        output += `<h5 class="a-z-listing--header-small heading-mobile-centered">${heading}</h5><div class="row expertise-row col-mobile-centered">`;
        array.map(el => {
          output += barTemplate(el.pageType, el.clickTrackingUrl, el.title, el.description);
        });
        output += `</div>`;
        return output;
      }
    };

    await sortData();
    /**
     * End markets
     */

    if (window.searchAZData.keyMarketEnergy.length || window.searchAZData.keyMarketEnvironment.length) {
      output += `<h2 class="a-z-listing--header-big heading-mobile-centered">End markets</h2>`;
    }

    output += barWrapperTemplate(searchAZData.keyMarketEnergy, "Energy") || "";
    output += barWrapperTemplate(searchAZData.keyMarketEnvironment, "Built Environment") || "";
    /**
     * Expertise
     */

    if (searchAZData.aditionalInfo.displayExpertise) {
      output += `<h2 class="a-z-listing--header-big heading-mobile-centered">Expertise</h2>`;
      const objKeys = Object.keys(searchAZData.expertise);

      for (let i = 0; i < objKeys.length; i++) {
        if (searchAZData.expertise[objKeys[i]].length) {
          output += `
                        <h5 class="a-z-listing--header-small expertise-header heading-mobile-centered">${objKeys[i]}</h5>
                        <div class="row expertise-row col-mobile-centered">`;
          [...searchAZData.expertise[objKeys[i]]].map(el => {
            output += barTemplate(el.pageType, el.clickTrackingUrl, el.title, el.description);
          });
          output += `</div>`;
        }
      }
    }
    /**
     * Software & Products
     */


    if (searchAZData.softwareAndProducts.software.length || searchAZData.softwareAndProducts.products.length) {
      output += `<h2 class="a-z-listing--header-big heading-mobile-centered">Software & Products</h2>`;
    }

    output += barWrapperTemplate(searchAZData.softwareAndProducts.software, "Software") || "";
    output += barWrapperTemplate(searchAZData.softwareAndProducts.products, "Products") || "";
    /**
     * Subject matter experts
     */

    if (searchAZData.profile.length) {
      output += `<h2 class="a-z-listing--header-big heading-mobile-centered">Subject Matter Experts</h2><div class="row experts-row col-mobile-centered">`;
      searchAZData.profile.map(el => {
        output += `<div class="col-4 col-md-6 col-sm-12 col-lg-4 static-size-4">
                    <div class="profile-component profile-component--slick lightbox lightbox--js" data-lightbox-ajax-site="${el.url}" data-lightbox-special="profile">
                        <div class="profile-component__container">
                            <div class="profile-component__photo" style="background-image: url(${el.profileImage});">
                            </div>
                            <div class="profile-component__text">
                                <div class="profile-component__text-name">${el.title}</div>
                                <div class="profile-component__text-title">${el.profileJobTitle}</div>
                            </div>
                        </div>
                    </div>
                </div>`;
      });
      output += `</div>`;
    }

    output += "</div>"; //removing old output after raload data

    var contntWrapper = document.querySelector("results-wrapper--az");

    if (contntWrapper) {
      contntWrapper.parentNode.removeChild(contntWrapper);
    } //displaing output on front


    document.querySelector(".results-wrapper").innerHTML = output;
  };

  if (document.querySelector(".fbjs-search--az")) {
    window.expertise = new Search.default({
      url: "https://wood-search01.squiz.co.uk/s/search.json",
      collections: ["wood-data"],
      additionalFBparams: {
        profile: "_default",
        gscope1: "expertiseListing"
      },
      onFiltersUpdate: () => {
        var _window$searchArticle;

        buildHtml();
        const activeFilters = (_window$searchArticle = window.searchArticles) === null || _window$searchArticle === void 0 ? void 0 : _window$searchArticle.search.activeFacets;

        for (const entry in activeFilters) {
          if (activeFilters[entry].value !== []) {
            hasActiveFilters = true;
            return hasActiveFilters;
          }
        }

        searchAZData.aditionalInfo.resetData = 1;
      },
      beforeSearch: () => {
        //reset global data
        if (searchAZData.aditionalInfo.resetData) {
          searchAZDataRaw = [];
          searchAZData.keyMarketEnergy = null;
          searchAZData.keyMarketEnvironment = null;
          searchAZData.expertise = {};
          searchAZData.softwareAndProducts.software = null;
          searchAZData.softwareAndProducts.products = null;
          searchAZData.profile = null;
          searchAZData.aditionalInfo.resetData = 0;
          searchAZData.aditionalInfo.displayExpertise = 0;
        }
      },
      results: {
        numRanks: 10000
      },
      activeFacetsOnStart: {
        "f.pageType|pageType": [// "expertise - software",
          // "expertise - sme profile",
          // "expertise - product",
          // "expertise - expertise",
          // "key market",
        ],
        "f.keyMarketEnergy|keyMarketEnergy": [],
        "f.keyMarketEnvironment|keyMarketEnvironment": [],
        "f.geographies|geographies": []
      },
      pagination: {
        loadMore: false,
        arrows: false,
        arrowsOnEdgePages: false,
        dots: false,
        edgePages: false,
        pages: 0
      },
      templates: {
        articleTemplate: fields => {
          searchAZDataRaw.push({
            type: fields.metaData.type,
            clickTrackingUrl: fields.clickTrackingUrl,
            summary: fields.summary,
            date: fields.metaData.d,
            id: fields.metaData.id,
            pageType: fields.metaData.pageType,
            description: fields.metaData.description,
            title: fields.metaData.t,
            keyMarketEnergy: fields.metaData.keyMarketEnergy,
            keyMarketEnvironment: fields.metaData.keyMarketEnvironment,
            url: fields.displayUrl,
            profileImage: fields.metaData.profileImage,
            profileJobTitle: fields.metaData.profileJobTitle
          });
          return ``;
        },

        /**
         * @name informationTemplate
         * @param fields
         * @param resultsSummary
         * @param h
         * @returns {string}
         */
        informationTemplate: () => {
          return "";
        },
        formTemplate: (search, query, inputId) => {
          query == "!nullsearch" ? query = "" : null;
          return `
                    <div class="search-field">
                        <form class="search__form" role="search" action="/search" method="get">
                            <label for="${inputId}" class="sr-only">Search site</label>
                            <input
                                id="${inputId}"
                                type="text"
                                class="search__form-input search-custom"
                                placeholder="A-Z search"
                                autocomplete="off"
                                role="searchbox"
                                aria-label="Search"
                                autocorrect="off"
                                autocapitalize="off"
                                spellcheck="false"
                                maxlength="1000"
                                aria-haspopup="menu"
                                aria-expanded="false"
                                value="${query}">
                            <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                                <i class="search__submit-icon" aria-hidden="true"></i>
                                <span class="sr-only">Do search</span>
                            </button>
                            <div class="fb-search-wrapper"></div>
                        </form>
                    </div>
                    `;
        },

        /**
         * @name paginationNumberTemplate
         * @param number
         * @param startrank
         * @returns {string}
         */
        paginationNumberTemplate: () => {
          return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
        },

        /**
         * @name activePaginationNumberTemplate
         * @param number
         * @returns {string}
         */
        activePaginationNumberTemplate: () => {
          return ""; //<li class="search__active-page hidden">${number}</li>
        },

        /**
         * @name paginationTemplate
         * @param pages
         * @returns {string}
         */
        paginationTemplate: pages => {
          return `<div class="search__pagination">${pages}</div>`;
        },
        facetCheckbox: ({
          categories,
          singleChoice
        }, activeFacets, h) => {
          //{name, label}, activeFacets
          // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
          let list = "";
          list += '<li class="search__facet-item search__facet-item--all"></li>';
          categories[0].values.forEach(item => {
            if (item.label !== "other") {
              list += `<li class="search__facet-item">
                                    <label class="search__facet-label">
                                        <input
                                        class="search__facet-input"
                                        type="checkbox"
                                        ${item.checked}
                                        value="${item.data}"
                                        name="${item.label}"
                                        data-fparam="${h.queryStringParamName}"
                                        data-singlechoice="${singleChoice}"
                                        />
                                        <span class="search__facet-span">${item.label}</span>
                                    </label>
                                    </li>`;
            }
          });
          return `<div class="checkbox-facet">
                            <ul class="search__facets">
                            ${list}
                            </ul>
                        </div>`;
        },

        /**
         * @name noResults
         * @param query
         * @param spell
         * @returns {string}
         */
        noResults: () => {
          // let spellSuggestion = "";
          // if (spell.text) {
          //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
          // }
          if (hasActiveFilters) {
            return `<div>There are no results matching your filter criteria</div>`;
          } else {
            return `<div>We're sorry, we couldn't find anything matching</div>`;
          }
        }
      }
    });
    window.expertise.init();
  }
}

/***/ }),

/***/ 4488:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--blogs")) {
  const addedResults = [];
  const addedIds = [];
  let hasActiveFilters;
  window.searchBlogs = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "insight - blog"
    },
    onFiltersUpdate: () => {
      var _window$searchArticle;

      const activeFilters = (_window$searchArticle = window.searchArticles) === null || _window$searchArticle === void 0 ? void 0 : _window$searchArticle.search.activeFacets;

      for (const entry in activeFilters) {
        if (activeFilters[entry].value !== []) {
          hasActiveFilters = true;
          return hasActiveFilters;
        }
      }
    },
    beforeSearch: () => {},
    results: {
      numRanks: 18
    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": [],
      "f.geographies|geographies": []
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: true,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        if (!addedResults.includes(fields.title.toLowerCase()) && !addedIds.includes(fields.metaData.id)) {
          addedResults.push(fields.title.toLowerCase());
          addedIds.push(fields.metaData.id);

          const changeDate = () => {
            const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  // dateFromFunnelback = fields.metaData.d, // 2017-08-10
            splitedDate = fields.metaData.d.split("-");
            return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
          };

          return `
                    <a href="${fields.liveUrl}" class="cards__card-wrapper cards__card-wrapper--news date-mobile">
                        <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                            <div class="cards__image-wrapper">
                                <div class="cards__image"><img src="${fields.metaData.image || `https://woodplc.com/?a=235271`}" alt=""></div>
                            </div>
                            <div class="cards__content no-gutters flex-column justify-content-between">
                                                        <div class="cards__title-wrapper">

                            <p class="cards__title truncate-lines-2">
                            ${fields.title}
                            </p>
                            </div>
                            <p class="cards__publish-date-mobile">${changeDate()}</p>
                            </div>
                        </article>
                    </a>`;
        } else {
          return "";
        }
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       */
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Blog search"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       */
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       */
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       */
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       */
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       */
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        if (hasActiveFilters) {
          return `<div>There are no results matching your filter criteria</div>`;
        } else {
          return `<div>We're sorry, we couldn't find anything matching</div>`;
        }
      }
    }
  });
  window.searchBlogs.init();
}

/***/ }),

/***/ 5965:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--careers")) {
  const mySearch = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["wood-combined-meta"],
    additionalFBparams: {
      profile: "_default",
      nodup: 1
    },
    onFiltersUpdate: () => {
      var allResultsLabel = document.querySelector(".search__facet-item--all"),
          facetsSelctor = document.querySelectorAll(".search__facet-input"),
          facetsLabelsSelctor = document.querySelectorAll(".search__facet-label"),
          highlightAllResults = true,
          checkedParam = 'checked="checked"';
      /**
       * @desc If any of facets are mot selected, select All results
       */

      [...facetsSelctor].map(el => {
        el.checked == true ? highlightAllResults = false : "";
      });
      var facetTemplateAll = `<label class="search__facet-label">
                <input
                class="search__facet-input"
                type="checkbox"
                value="All"
                name="All results"
                id="facet--all-results-js"
                ${highlightAllResults ? checkedParam : ""}
                />
                <span class="search__facet-span">All results</span>
            </label>`;

      if (allResultsLabel) {
        // add template All results
        allResultsLabel.innerHTML = facetTemplateAll;
        /**
         * @desc If client will click All results, script will unselect opened facet by clicking it again
         */

        allResultsLabel.addEventListener("click", e => {
          e.preventDefault();
          var selectedItem = [...facetsSelctor].filter(el => el.checked == true);
          selectedItem.length ? selectedItem[0].click() : "";
        });
      }

      [...facetsLabelsSelctor].map(el => {
        el.addEventListener("click", () => {
          var elmnt = document.querySelector(".search__form");
          elmnt.scrollIntoView();
        });
      });
    },
    results: {
      numRanks: 10
    },
    facets: {
      items: [{
        name: "section",
        type: "checkbox",
        options: {
          singleChoice: true,
          facetsRestricted: false
        }
      }]
    },
    pagination: {
      loadMore: false,
      arrows: true,
      arrowsOnEdgePages: true,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        var url = fields.clickTrackingUrl ? `https://wood-search01.squiz.co.uk${fields.clickTrackingUrl}` : "";
        var title = fields.title ? `<h2 class="search__item-title">${fields.title}</h2>` : "";
        var desc = fields.metaData.description ? `<p class="search__item-paragraph">${fields.metaData.description}</p>` : "";
        var breadcrumbs = fields.metaData.breadcrumbs ? fields.metaData.breadcrumbs.replace("Home", "Wood") : "";

        if (title !== "") {
          return `
                <div>
                    <a href="${url}" class="search__item">${title}</a>
                    ${desc}
                    ${breadcrumbs}
                </div>
                `;
        } else {
          return "";
        }
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: (fields, resultsSummary) => {
        return `
                <p class="search__summary">
                    Showing ${resultsSummary.currStart}-${resultsSummary.currEnd} of ${resultsSummary.totalMatching}
                </p>
                `;
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null; // name="query"
        // class="search-input-field"

        return `
                <div>
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Search..."
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            autofocus="autofocus"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit btn--primary">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startRank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name arrowNextTemplate
       * @param startrank
       * @returns {string}
       **/
      arrowNextTemplate: startrank => {
        return `<button class="btn btn--listing-next" data-startrank=${startrank}>Next</button>`;
      },

      /**
       * @name arrowPrevTemplate
       * @param startrank
       * @returns {string}
       **/
      arrowPrevTemplate: startrank => {
        return `<button class="btn btn--listing-previous" data-startrank=${startrank}>Previous</button>`;
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item" data-value="${item.data}">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return "<div>We're sorry, we couldn't find anything matching .</div>";
      }
    }
  });
  mySearch.init();
}

/***/ }),

/***/ 5889:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3909);
/* global squiz */

let carouselConfigs = {};

const carousel = () => {
  const carousels = document.querySelectorAll(".glide[data-glide-story-carousel-id]");
  const carouselsNone = document.querySelectorAll(".glide-none");

  if (carousels) {
    Array.from(carousels).forEach(storyCarousel => {
      const id = storyCarousel.dataset.glideSliderId;

      if (storyCarousel.querySelectorAll(".glide__slide").length > 3) {
        carouselConfigs[id] = new _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(storyCarousel, {
          type: "carousel",
          startAt: 0,
          perView: 3,
          gap: 30,
          breakpoints: {
            1199: {
              perView: 2
            },
            767: {
              perView: 1
            }
          }
        }); // turn off loading screan

        carouselConfigs[id].on("mount.after", function () {
          storyCarousel.querySelector(".glide__track").classList.remove("loading"); // storyCarousel.querySelector('.lottie-loader').remove();
        }); // render carousel or not - depending on resolution

        if (window.innerWidth >= squiz.vars.desktopWidth) {
          carouselConfigs[id].mount({
            Controls: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__/* .Controls */ .ZX,
            Breakpoints: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__/* .Breakpoints */ .u3,
            Swipe: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__/* .Swipe */ .oF
          });
        } else {
          storyCarousel.querySelector(".glide__track").classList.remove("loading"); // storyCarousel.querySelector('.lottie-loader').remove()
        }
      }
    });
  }

  if (carouselsNone) {
    Array.from(carouselsNone).forEach(storyCarousel => {
      storyCarousel.querySelector(".glide__track").classList.remove("loading"); // storyCarousel.querySelector('.lottie-loader').remove()
    });
  }
};

/* harmony default export */ __webpack_exports__["Z"] = (carousel);

/***/ }),

/***/ 7642:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3909);

let onestroyCarouselConfigs = {};

const onestoryCarousel = () => {
  const onestoryCarousels = document.querySelectorAll('.glide[data-glide-one-story-carousel-id]');

  if (onestoryCarousels) {
    Array.from(onestoryCarousels).forEach(onestoryCarousel => {
      const id = onestoryCarousel.dataset.glideSliderId;

      if (onestoryCarousel.querySelectorAll('.glide__slide').length > 1) {
        onestroyCarouselConfigs[id] = new _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(onestoryCarousel, {
          type: 'carousel',
          startAt: 0,
          perView: 1,
          breakpoints: {
            // 1199: {
            //   perView: 2
            // },
            767: {
              perView: 1
            }
          }
        }); // turn off loading screan

        onestroyCarouselConfigs[id].on('mount.after', function () {
          onestoryCarousel.querySelector('.glide__track').classList.remove('loading'); // onestoryCarousel.querySelector('.lottie-loader').remove()
        });
        onestroyCarouselConfigs[id].mount({
          Controls: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__/* .Controls */ .ZX,
          Breakpoints: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__/* .Breakpoints */ .u3,
          Swipe: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__/* .Swipe */ .oF
        });
      }
    });
  }
};

/* harmony default export */ __webpack_exports__["Z"] = (onestoryCarousel);

/***/ }),

/***/ 9163:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--case-study")) {
  window.searchCS = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "expertise - case study"
    },
    onFiltersUpdate: () => {},
    beforeSearch: () => {},
    results: {
      numRanks: 10000
    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": [],
      "f.geographies|geographies": []
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: false,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        const changeDate = () => {
          const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                // dateFromFunnelback = fields.metaData.d, // 2017-08-10
          splitedDate = fields.metaData.d.split("-");
          return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
        };

        return `
                    <a href="${fields.liveUrl}" class="cards__card-wrapper cards__card-wrapper--news date-mobile">
                        <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                            <div class="cards__image-wrapper">
                                <div class="cards__image"><img src="${fields.metaData.image || `https://woodplc.com/?a=235271`}" alt=""></div>
                            </div>
                            <div class="cards__content no-gutters flex-column justify-content-between">
                              <div class="cards__title-wrapper">
                                <p class="cards__title truncate-lines-2">
                                ${fields.title}
                            </p>
                            </div>
                            <p class="cards__publish-date-mobile">${changeDate()}</p>
                            </div>
                        </article>
                    </a>`;
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       */
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Case study search"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       */
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       */
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       */
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       */
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      activeFacet: (name, param) => {
        const changeName = name.replace(/_ampersand_/gi, "&").replace(/_comma_/gi, ",");
        return `
                  <span param="${param}" name="${name}">
                    ${changeName}
                  </span>
                `;
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       */
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return `<div>We're sorry, we couldn't find anything matching.
                </div>`;
      }
    }
  });
  window.searchCS.init();
}

/***/ }),

/***/ 304:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const handleSearchOverlayToggle = () => {
  const btn = document.getElementById('search-btn');
  const serachOverlay = document.querySelector(".search_overlay");
  const header = document.querySelector(".header");

  if (btn && serachOverlay) {
    btn.addEventListener('click', () => {
      serachOverlay.setAttribute("style", "display: block;");
      let btnClose = document.getElementById('close-btn');
      header.classList.add("header_sticky");
      btnClose.addEventListener('click', () => {
        serachOverlay.setAttribute("style", "display: none;");
        header.classList.remove("header_sticky");
      });
    });
  }
};

/* harmony default export */ __webpack_exports__["Z"] = (handleSearchOverlayToggle);

/***/ }),

/***/ 1016:
/***/ (function() {

/* import customSelect from 'custom-select';
customSelect('select'); */
// Select language
const changeLanguageHandler = e => {
  const target = e.currentTarget,
        targetVal = target.value;
  window.location.href = targetVal;
};

const langSwitcher = document.querySelector('.lang-select');

if (langSwitcher) {
  langSwitcher.addEventListener('change', changeLanguageHandler);
}

;

/***/ }),

/***/ 5503:
/***/ (function() {

"use strict";
(function () {
  var contactForm = document.querySelector(".contact-form");

  var manageContactFormInputs = function () {
    var contactFormInputs = (contactForm === null || contactForm === void 0 ? void 0 : contactForm.querySelectorAll('input:not(input[type="checkbox"]')) || null;
    var contactFormTextarea = (contactForm === null || contactForm === void 0 ? void 0 : contactForm.querySelector("textarea")) || null;
    contactFormInputs === null || contactFormInputs === void 0 ? void 0 : contactFormInputs.forEach(function (input) {
      input.addEventListener("blur", function (e) {
        var input = e.target;
        (input === null || input === void 0 ? void 0 : input.value) !== "" ? input.classList.add("filled") : input.classList.remove("filled");
      });
    });
    contactFormTextarea === null || contactFormTextarea === void 0 ? void 0 : contactFormTextarea.addEventListener("blur", function (e) {
      var textarea = e.target;
      textarea.value !== "" ? textarea.classList.add("filled") : textarea.classList.remove("filled");
    });
    var contactFormSelects = document.querySelectorAll(".contact-form select.sq-form-field") || null;
    contactFormSelects === null || contactFormSelects === void 0 ? void 0 : contactFormSelects.forEach(function (select) {
      select.addEventListener("change", function (e) {
        var select = e.target;
        var selectedOption = select.options[select.options.selectedIndex];
        var selectParent = select.parentElement;

        if ((selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.getAttribute("value")) !== "empty") {
          selectParent === null || selectParent === void 0 ? void 0 : selectParent.classList.add("filled");
        } else {
          selectParent === null || selectParent === void 0 ? void 0 : selectParent.classList.remove("filled");
        }
      });
    });
  };

  contactForm && manageContactFormInputs();
})();



/***/ }),

/***/ 3830:
/***/ (function() {

"use strict";

;// CONCATENATED MODULE: ./src/modules/fbac-global/js/modules/templates.js
const templates_insights = {
  results(iteratedResults, resultsClass) {
    return `
          <div class="${resultsClass}">
              ${iteratedResults}
          </div>
      `;
  },

  result(data, eventClass) {
    if (data.disp.metaData && data.disp.metaData.pageType) {
      return `
            <li>
            <a href="${data.action ? `https://wood-search01.squiz.co.uk${data.action}` : data.disp.displayUrl}" class="fbac__result ${eventClass}">
              ${data.disp.title}
              <span>${data.disp.metaData.pageType.replace(/Insight -/gi, "Insights /")}</span>
            </a>
            </li>
          `;
    }

    return "";
  },

  noResults(query) {
    return `
          <div class="fbac__results">
              <div class="fbac__no-result">
                  No results were found for <i>${query}</i>.
              </div>
          </div>
      `;
  }

};
const templates_news_insights = {
  results(iteratedResults, resultsClass) {
    return `
          <div class="${resultsClass}">
              ${iteratedResults}
          </div>
      `;
  },

  result(data, eventClass) {
    if (data.disp.metaData && data.disp.metaData.pageType) {
      return `
            <li>
            <a href="${data.action ? `https://wood-search01.squiz.co.uk${data.action}` : data.disp.displayUrl}" class="fbac__result ${eventClass}">
              ${data.disp.title}
              <span>${data.disp.date}</span>
            </a>
            </li>
          `;
    }

    return "";
  },

  noResults() {
    return `
          <div class="fbac__results">
              <div class="fbac__no-result">
                  No matching results - <a href="/search">see all results page</a>
              </div>
          </div>
      `;
  }

};
const templates_meta_autocomplete = {
  results(iteratedResults, resultsClass) {
    return `
          <ul class="concierge__autocomplete ${resultsClass}">
              ${iteratedResults}
          </ul>
      `;
  },

  result(data, eventClass) {
    return `
            <li class="fbac__result-wrapper">
                <a href="#" class="fbac__result ${eventClass}">
                    ${data.disp}
                </a>
            </li>
        `;
  },

  noResults() {
    return ``;
  }

};
const templates_solutions = {
  results(iteratedResults, resultsClass) {
    return `
          <div class="${resultsClass}">
              ${iteratedResults}
          </div>
      `;
  },

  result(data, eventClass) {
    if (data.disp.metaData && data.disp.metaData.pageType) {
      return `
            <li>
            <a href="${data.action ? `https://wood-search01.squiz.co.uk${data.action}` : data.disp.displayUrl}" class="fbac__result ${eventClass}">
              ${data.disp.title}
              <span>Solutions / ${data.disp.metaData.pageType}</span>
            </a>
            </li>
          `;
    }

    return "";
  },

  noResults(query) {
    return `
          <div class="fbac__results">
              <div class="fbac__no-result">
                  No results were found for <i>${query}</i>.
              </div>
          </div>
      `;
  }

};
const templates_solutions_careers = {
  results(iteratedResults, resultsClass) {
    return `
          <div class="${resultsClass}">
              ${iteratedResults}
          </div>
      `;
  },

  result(data, eventClass) {
    if (data.disp.metaData && data.disp.metaData.pageType) {
      return `
            <li>
            <a href="${data.action ? `https://wood-search01.squiz.co.uk${data.action}` : data.disp.displayUrl}" class="fbac__result ${eventClass}">
              ${data.disp.title}
              <span>Solutions / ${data.disp.metaData.pageType.replace(" - ", " / ")}</span>
            </a>
            </li>
          `;
    }

    return "";
  },

  noResults() {
    return `
          <div class="fbac__results">
              <div class="fbac__no-result">
                No matching results - <a href="/search">see all results page</a>
              </div>
          </div>
      `;
  }

};
const templates_news = {
  results(iteratedResults, resultsClass) {
    return `
          <div class="${resultsClass}">
              ${iteratedResults}
          </div>
      `;
  },

  result(data, eventClass) {
    if (data.disp.metaData && data.disp.metaData.pageType) {
      return `
            <li>
              <a href="${data.action ? `https://wood-search01.squiz.co.uk${data.action}` : data.disp.displayUrl}" class="fbac__result ${eventClass}">
                ${data.disp.title}
                <span>${data.disp.date}</span>
              </a>
              </li>
          `;
    }

    return "";
  },

  noResults(query) {
    return `
          <div class="fbac__results">
              <div class="fbac__no-result">
                  No results were found for <i>${query}</i>.
              </div>
          </div>
      `;
  }

};
const templates_careers = {
  results(iteratedResults, resultsClass) {
    return `
          <div class="${resultsClass}">
              ${iteratedResults}
          </div>
      `;
  },

  result(data, eventClass) {
    if (data.disp.metaData && data.disp.metaData.pageType) {
      return `
            <li>
            <a href="${data.action ? `https://wood-search01.squiz.co.uk${data.action}` : data.disp.displayUrl}" class="fbac__result ${eventClass}">
              ${data.disp.title}
              <span>${data.disp.metaData.pageType.replace(/.* - /i, "").replace("Life@wood blog", "Life at wood stories")}</span>
            </a>
            </li>
          `;
    }

    return "";
  },

  noResults() {
    return `
          <div class="fbac__results">
              <div class="fbac__no-result">
                No matching results - <a href="/search">see all results page</a>
              </div>
          </div>
      `;
  }

};
;// CONCATENATED MODULE: ./src/modules/fbac-global/js/modules/corporate-fbac.js
/* global FBAC */

const corporateConcierge = new FBAC.default({
  input: "#query",
  inject: "#fbac",
  url: "https://wood-search01.squiz.co.uk/s/suggest.json",
  showOnFront: 5,
  urlParts: {
    collection: "wood-meta",
    show: 20,
    sort: 0
  },
  highlight: true,
  loader: true,
  targetClass: {
    onOpen: "fbac__searched"
  },
  display: {
    headerOnNoResults: false,
    footerOnNoResults: false,
    scaffoldOnNoResults: false
  },
  bindEvents: true,
  events: {
    afterFetch(query, data) {
      if (data.woodGlobal_insights && data.woodGlobal_insights.length) this.data.woodGlobal_insights = data.woodGlobal_insights.filter(res => {
        return res.disp && res.disp.metaData && res.disp.metaData.pageType && res.disp.metaData.pageType !== "Other";
      });
      if (data.woodGlobal_news && data.woodGlobal_news.length) this.data.woodGlobal_news = data.woodGlobal_news.filter(res => {
        return res.disp && res.disp.metaData && res.disp.metaData.pageType && res.disp.metaData.pageType !== "Other";
      });
      if (data.woodGlobal_solutions && data.woodGlobal_solutions.length) this.data.woodGlobal_solutions = data.woodGlobal_solutions.filter(res => {
        return res.disp && res.disp.metaData && res.disp.metaData.pageType && res.disp.metaData.pageType !== "Other";
      });
    }

  },
  fb: [{
    id: "woodGlobal_insights",
    templates: templates_insights,
    urlParts: {
      profile: "autocomplete_insights"
    }
  }, {
    id: "woodGlobal_news",
    templates: templates_news,
    urlParts: {
      profile: "autocomplete_news"
    }
  }, {
    id: "woodGlobal_solutions",
    templates: templates_solutions,
    urlParts: {
      profile: "autocomplete_solutions"
    }
  }, {
    id: "woodGlobal_metaAutocomplete",
    templates: templates_meta_autocomplete,
    urlParts: {
      collection: "wood-combined-meta",
      profile: "_default",
      show: 3
    }
  }],

  scaffold(templates) {
    return `
        ${templates.woodGlobal_metaAutocomplete.results}
      <div class="fbac__all-results concierge__results">
        <div class="fbac__autocomplete">
        <div class="fbac__autocomplete--column">
                <h3 class="title concierge__subtitle">Solutions</h3>
                <ul>
                    ${templates.woodGlobal_solutions.results}
                </ul>
                ${templates.woodGlobal_solutions.noResults}
            </div>
            <div class="fbac__autocomplete--column">
            <h3 class="title concierge__subtitle">Insights</h3>
                ${templates.woodGlobal_insights.results}
                ${templates.woodGlobal_insights.noResults}
            </div>
            <div class="fbac__autocomplete--column">
            <h3 class="title concierge__subtitle">News</h3>
                <ul>
                    ${templates.woodGlobal_news.results}
                </ul>
                ${templates.woodGlobal_news.noResults}
            </div>
            
        </div>
      </div>
    `;
  },

  globalTemplates: {
    header(query) {
      return `
              <h2 class="concierge__title">${query}</h2>
            `;
    }

  }
});
/* harmony default export */ var corporate_fbac = (corporateConcierge);
;// CONCATENATED MODULE: ./src/modules/fbac-global/js/modules/careers-fbac.js
/* global FBAC */

const careersConcierge = new FBAC.default({
  input: "#query",
  inject: "#fbac-careers",
  url: "https://wood-search01.squiz.co.uk/s/suggest.json",
  showOnFront: 5,
  urlParts: {
    show: 5,
    sort: 0
  },
  highlight: false,
  loader: true,
  targetClass: {
    onOpen: "fbac__searched"
  },
  display: {
    headerOnNoResults: false,
    footerOnNoResults: false,
    scaffoldOnNoResults: false
  },
  bindEvents: true,
  events: {
    afterFetch(query, data) {
      var _data$woodGlobal_news, _data$woodGlobal_care, _data$woodGlobal_solu;

      if ((_data$woodGlobal_news = data.woodGlobal_news_insights) !== null && _data$woodGlobal_news !== void 0 && _data$woodGlobal_news.length) this.data.woodGlobal_insights = data.woodGlobal_news_insights.filter(res => {
        return res.disp && res.disp.metaData && res.disp.metaData.pageType && res.disp.metaData.pageType !== "Other";
      });
      if ((_data$woodGlobal_care = data.woodGlobal_careers) !== null && _data$woodGlobal_care !== void 0 && _data$woodGlobal_care.length) this.data.woodGlobal_careers = data.woodGlobal_careers.filter(res => {
        return res.disp && res.disp.metaData && res.disp.metaData.pageType && res.disp.metaData.pageType !== "Other";
      });
      if ((_data$woodGlobal_solu = data.woodGlobal_solutions) !== null && _data$woodGlobal_solu !== void 0 && _data$woodGlobal_solu.length) this.data.woodGlobal_solutions = data.woodGlobal_solutions.filter(res => {
        return res.disp && res.disp.metaData && res.disp.metaData.pageType && res.disp.metaData.pageType !== "Other";
      });
    }

  },
  fb: [{
    id: "woodGlobal_careers",
    templates: templates_careers,
    urlParts: {
      collection: "push-wood-careers",
      profile: "autocomplete"
    }
  }, {
    id: "woodGlobal_news_insights",
    templates: templates_news_insights,
    urlParts: {
      collection: "wood-meta",
      profile: "autocomplete_insights_news"
    }
  }, {
    id: "woodGlobal_solutions",
    templates: templates_solutions_careers,
    urlParts: {
      collection: "wood-meta",
      profile: "autocomplete_solutions"
    }
  }, {
    id: "woodGlobal_metaAutocomplete",
    templates: templates_meta_autocomplete,
    urlParts: {
      collection: "wood-combined-meta",
      profile: "_default",
      show: 3
    }
  }],

  scaffold(templates) {
    return `
      ${templates.woodGlobal_metaAutocomplete.results}
      <div class="fbac__all-results concierge__results">
        <div class="fbac__autocomplete">
            <div class="fbac__autocomplete--column">
                <h3 class="title concierge__subtitle">Career site</h3>
                <ul>
                    ${templates.woodGlobal_careers.results}
                </ul>
                ${templates.woodGlobal_careers.noResults}
            </div>
            <div class="fbac__autocomplete--column">
                <h3 class="title concierge__subtitle">News / Insights</h3>
                <ul>
                    ${templates.woodGlobal_news_insights.results}
                </ul>
                ${templates.woodGlobal_news_insights.noResults === "" ? templates.woodGlobal_careers.noResults : templates.woodGlobal_news_insights.noResults}
            </div>
            <div class="fbac__autocomplete--column">
            <h3 class="title concierge__subtitle">Solutions</h3>
                <ul>
                    ${templates.woodGlobal_solutions.results}
                </ul>
                ${templates.woodGlobal_solutions.noResults}
            </div>
            
        </div>
      </div>
    `;
  },

  globalTemplates: {
    header(query) {
      return `
              <h2 class="concierge__title">${query}</h2>
            `;
    }

  }
});
/* harmony default export */ var careers_fbac = (careersConcierge);
;// CONCATENATED MODULE: ./src/modules/fbac-global/js/global.js


corporate_fbac.init();
careers_fbac.init();

/***/ }),

/***/ 6566:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AS": function() { return /* binding */ countAppliedFilters; },
/* harmony export */   "I6": function() { return /* binding */ handleEndMarketDropdown; },
/* harmony export */   "ok": function() { return /* binding */ handleGeographyDropdown; }
/* harmony export */ });
const setDropdownText = (checkedCount, text) => {
  const mobile = window.matchMedia("(max-width: 1024px)");

  if (!checkedCount > 0) {
    return text;
  } else {
    if (mobile.matches) {
      return "Selection";
    } else {
      return text;
    }
  }
};

const handleDropdownClose = () => {
  const dropdowns = document.querySelectorAll(".c-filters__dropdown-title");
  dropdowns.forEach(dropdown => {
    dropdown.setAttribute('data-title', dropdown.innerText);
    dropdown.addEventListener("click", e => {
      dropdowns.forEach(item => {
        item.parentElement !== e.target.parentElement && item.parentElement.classList.contains("dropdown-list-focus") ? item.parentElement.classList.remove("dropdown-list-focus") : null;
      });
      const parent = e.target.parentElement;

      if (parent.classList.contains("dropdown-list-focus")) {
        parent.classList.remove("dropdown-list-focus");
      } else {
        parent.classList.add("dropdown-list-focus");
      }

      e.stopPropagation();
    });
  });
};

const handleDropdown = async (type, selector) => {
  const mobile = window.matchMedia("(max-width: 1024px)");
  let defText = mobile.matches ? "Selection" : type;
  const targets = document.querySelectorAll(selector);
  targets.forEach(target => {
    let dropdownElement = target.parentElement.parentElement.querySelector(".c-filters__dropdown-title");

    if (target.classList.contains("geography") && mobile.matches) {
      defText = "Region";
    }

    dropdownElement.innerText = setDropdownText(0, defText);
    const checkboxes = target.querySelectorAll("input[type=checkbox]");
    const selectedCheckboxes = [];
    checkboxes.forEach(checkbox => {
      let dropdownElement = target.parentElement.parentElement.querySelector(".c-filters__dropdown-title");
      dropdownElement.innerText = setDropdownText(0, defText);
      checkbox.addEventListener("change", e => {
        const parent = e.target.closest("li");
        const selectTitle = e.target.closest(".c-filters__dropdown-select").querySelector(".c-filters__dropdown-title");
        const mobileTitle = e.target.closest(".c-filters__dropdown-select").getAttribute("data-title");
        const width = window.innerWidth;

        if (e.target.checked) {
          parent.classList.add("dropdownActive");
          !selectedCheckboxes.includes(e.target) && selectedCheckboxes.push(e.target);
        } else {
          parent.classList.remove("dropdownActive");
          selectedCheckboxes.pop(e.target);
        }

        if (selectedCheckboxes.length > 0) {
          if (width < 1200) {
            selectTitle.innerText = `${selectedCheckboxes.length} selected`;
            selectTitle.closest(".c-filters__dropdown-select").classList.add("dropdownActive");
          }
        } else {
          if (width > 1200) {
            selectTitle.innerText = mobileTitle;
          } else {
            selectTitle.innerText = "Selection";
            selectTitle.closest(".c-filters__dropdown-select").classList.remove("dropdownActive");
          }
        }
      });
    });
  });

  const observerCallback = () => {
    const width = window.innerWidth;
    const activeFacets = document.querySelectorAll(".active-facets span");
    targets.forEach(target => {
      const checkboxes = target.querySelectorAll("input[type=checkbox]");

      if (activeFacets.length) {
        activeFacets.forEach(facet => {
          const facetName = facet.innerText;

          if (facetName.includes("Insight")) {
            facet.classList.add("hidden");
          }

          for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].nextElementSibling instanceof HTMLLabelElement && facetName.toLowerCase() === checkboxes[i].nextElementSibling.innerText.toLowerCase()) {
              checkboxes[i].checked = true;
              checkboxes[i].dispatchEvent(new Event("change"));
              checkboxes[i].closest("li").classList.add("dropdownActive");
            }
          }
        });
      }
    });
    let insightContainer = document.querySelector(".insights-facet") || null;
    let activeFacetsContainer = document.querySelector(".active-facets");
    let hasInsights = false;

    for (let i = 0; i < activeFacets.length; i++) {
      if (activeFacets[i].getAttribute("name").includes("Insight")) {
        hasInsights = true;
        break;
      } else {
        hasInsights = false;
      }
    }

    if (width < 1200 && !insightContainer && hasInsights) {
      let insightDiv = document.createElement("div");
      insightDiv.classList.add("insights-facet");
      activeFacets.forEach(facet => {
        if (facet.getAttribute("name").includes("Insight")) {
          insightDiv.appendChild(facet);
        }
      });
      activeFacetsContainer.appendChild(insightDiv);
    } else if (width < 1200 && insightContainer && hasInsights === false) {
      insightContainer.remove();
    }

    return;
  };

  const targetNode = document.querySelector(".active-facets") || null;
  const config = {
    childList: true,
    subtree: true
  };
  const mObserver = new MutationObserver(observerCallback);
  targetNode && mObserver.observe(targetNode, config);
};

const countAppliedFilters = async () => {
  const targets = document.querySelectorAll(".c-filters");
  let targetsArray = [...targets];
  let activeFacets = [];
  targetsArray.forEach(target => {
    const facetsContainer = target === null || target === void 0 ? void 0 : target.querySelector(".active-facets");

    if (facetsContainer) {
      setAppliedFiltersCounter(target, facetsContainer);
      facetsContainer.addEventListener("DOMSubtreeModified", e => {
        const facets = e.target.querySelectorAll("span");
        facets.forEach(element => {
          activeFacets.push(element.innerText);
          element.tabIndex = 0;
          element.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
              element.click();
            }
          });
        });
        setAppliedFiltersCounter(target, facetsContainer);
      });
    }
  });
};
window.dateInputsFilled = 0;

const setAppliedFiltersCounter = (target, facetsContainer) => {
  try {
    let activeFiltersCount = target.querySelector(".c-filters__button--results");
    activeFiltersCount.innerText = facetsContainer.childElementCount + window.dateInputsFilled;
  } catch {
    console.log(facetsContainer.childElementCount);
  }
};

const datePickerContainers = document.querySelectorAll(".date-picker-container");
datePickerContainers.forEach(item => {
  const observer = new MutationObserver(() => {
    let dateInputsFilled = document.querySelectorAll(".date-filled-static").length;
    window.dateInputsFilled = dateInputsFilled;
    countAppliedFilters();
  });
  observer.observe(item, {
    attributes: true,
    childList: true
  });
});
window.addEventListener("DOMContentLoaded", () => {
  countAppliedFilters();
  handleDropdownClose();
});
const handleEndMarketDropdown = () => {
  handleDropdown("End markets", ".key-markets");
};
const handleGeographyDropdown = () => {
  handleDropdown("Geography", ".geography");
}; //let activeFiltersCount = activeFilters.closest('.c-filters__button--results')
//console.log(activeFilters.closest('.c-filters__button--results'))
//activeFiltersCount.innerText = activeFilters.parentElement.childElementCount

/***/ }),

/***/ 7676:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const clearFilters = () => {
  const currentURL = new URL(window.location.href);
  currentURL.search = "";
  window.location.href = currentURL.toString();
}; // const applyFilters = () => {
//     console.log("apply");
// }


const handleFilersButtons = () => {
  const resetButton = document.getElementById("resetFilters");
  const applyButton = document.getElementById("applyFilters");
  applyButton && applyButton.addEventListener("click", () => {
    document.body.classList.remove("filters-active");
  });
  resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", clearFilters); // if (applyButton && mobile.matches) {
  //     applyButton.addEventListener("click", applyFilters);
  // }
};

/* harmony default export */ __webpack_exports__["Z"] = (handleFilersButtons);

/***/ }),

/***/ 6475:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--financial-news")) {
  window.searchFinancialNewsLanding = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-financial-news"],
    additionalFBparams: {
      profile: "_default"
    },
    shouldFacetsFromUrlOverwriteActiveFacets: true,
    results: {
      numRanks: 12
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: false,
      arrows: true,
      arrowsOnEdgePages: true,
      dots: false,
      edgePages: true,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        // 2017-08-10 -> 10 Aug 2017
        const changeDate = () => {
          const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                // dateFromFunnelback = fields.metaData.d, // 2017-08-10
          splitedDate = fields.metaData.d.split("-");
          return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
        };

        return `<div class="news-card__wrapper static-size-12">
                            <a href="https://wood-search01.squiz.co.uk${fields.clickTrackingUrl}">
                                <div class="news-card__content no-gutters">
                                    <div class="date">${changeDate()}</div>
                                    <p class="title truncate-lines-2 secondary-link">
                                    ${fields.metaData.t}
                                    </p>
                                </div>
                            </a>  
                        </div>`;
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: (fields, resultsSummary) => {
        return `
                    <p>
                      showing <strong>${resultsSummary.currStart}-${resultsSummary.currEnd} of ${resultsSummary.totalMatching}</strong> results
                    </p>
                  `;
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Search Investor News"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: (number, startrank) => {
        if (startrank === 1) {
          return '';
        }

        return `<li data-startrank=${startrank} tabindex="0">${number}</li>`;
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: number => {
        return `<li class="active-page">${number}/</li>`;
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },
      arrowNextTemplate: startrank => {
        if (startrank) {
          return `<button class="next-page" tabindex="0" data-startrank=${startrank}>Next</button>`;
        }

        return '<button class="next-page disabled" tabindex="0">Next</button>';
      },
      arrowPrevTemplate: startrank => {
        if (startrank) {
          return `<button class="prev-page" tabindex="0" data-startrank=${startrank}>Previous</button>`;
        }

        return '<button class="prev-page disabled" tabindex="0">Previous</button>';
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        return "<div>We're sorry, we couldn't find anything matching.</div>";
      }
    }
  });
  window.searchFinancialNewsLanding.init();
}

/***/ }),

/***/ 9112:
/***/ (function() {



/***/ }),

/***/ 253:
/***/ (function() {

(() => {
  let videoComponents = document.querySelectorAll('.image-video__background.lightbox');

  if (videoComponents.length) {
    [...videoComponents].map(videoComponent => {
      let videoId = videoComponent.dataset.lightboxVideo;
      let isItVimeo = /^[0-9]+$/.test(videoId); // if background exist

      if (!videoComponent.getAttribute('style') || videoComponent.getAttribute('style') && !videoComponent.getAttribute('style').includes('background')) {
        if (isItVimeo) {
          fetch(`https://vimeo.com/api/v2/video/${videoId}.json`).then(response => response.json()).then(function (data) {
            let vimeoThumbnail = data[0].thumbnail_large;
            videoComponent.style.backgroundImage = `url(${vimeoThumbnail})`;
          });
        } else {
          videoComponent.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
        }
      }
    });
  }
})();

/***/ }),

/***/ 3657:
/***/ (function() {

/* global Search, searchInsightsListingData, searchInsightsListingRaw */
if (document.querySelector(".fbjs-search--insights-listing")) {
  let hasActiveFilters; // window.x = [] // for debug funnelback data

  window.searchInsightsListingRaw = [];
  window.searchInsightsListingData = {
    aditionalInfo: {
      resetData: 1
    },
    viewpoint: null,
    article: null,
    podcast: null,
    blog: null,
    report: null
  };

  const sortData = () => {
    searchInsightsListingData.viewpoint = searchInsightsListingRaw.filter(el => el.pageType === "Insight - Viewpoint");
    searchInsightsListingData.article = searchInsightsListingRaw.filter(el => el.pageType === "Insight - Article");
    searchInsightsListingData.podcast = searchInsightsListingRaw.filter(el => el.pageType === "Insight - Podcast");
    searchInsightsListingData.blog = searchInsightsListingRaw.filter(el => el.pageType === "Insight - Blog");
    searchInsightsListingData.report = searchInsightsListingRaw.filter(el => el.pageType === "Insight - Report");
  };

  const buildHtml = async () => {
    let output = '<div class="results-wrapper--az cards-story cards-story--redesign">';
    /**
     * @param {string} clickTrackingUrl - url to item
     * @param {string} title  - title of item
     * @param {string} pageType  - type of item
     * @param {string} img  - img of item
     * @returns {html}
     */

    const boxTemplate = (clickTrackingUrl, title, pageType, img, url, marks, date, description) => {
      // const webinarOverlay = () => {
      //     if (pageType === "Event - Webinar") {
      //         return `<article class="cards__card--hover cards__card row no-gutters flex-wrap">
      //     <div class="cards__flag-wrapper">
      //         <div class="cards__flag-type cards__flag-yellow">video</div>
      //         <div class="cards__flag-type">webinar</div>
      //     </div>
      //     <div class="cards__content no-gutters flex-column">
      //         <p class="cards__title">${title}</p>
      //         <p class="cards__subtitle truncate-lines-4">
      //             Learn how to find and solve vibration problems in piping systems. We'll show you new ways to
      //             identify
      //             vibratory
      //             service and examine the strengths of this test
      //         </p>
      //     </div>
      // </article>`;
      //     } else {
      //         return "";
      //     }
      // };
      img = img || `https://woodplc.com/?a=235271`;
      pageType = pageType ? pageType.replace(/\w*\s-\s/gm, "") : ""; // console.log(pageType);

      if (pageType === "Webinar") {
        return `<a href="${url}" class="cards__card-wrapper cards__card-wrapper--video">
                <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                    <div class="cards__flag-wrapper">
                        <div class="cards__flag-type cards__flag-yellow">video</div>
                        <div class="cards__flag-type">webinar</div>
                    </div>
                    <div class="cards__image-wrapper">
                        <div class="cards__image"><img src="${img}" alt=""></div>
                    </div>
                    <div class="cards__content no-gutters flex-column justify-content-between">
                        <p class="cards__type">Webinar</p>
                        <div class="cards__title-wrapper">

                            <p class="cards__title">
                                ${title}
                            </p>
                        </div>
                    </div>
                </article>
                <article class="cards__card--hover cards__card row no-gutters flex-wrap">
                    <div class="cards__flag-wrapper">
                        <div class="cards__flag-type cards__flag-yellow">video</div>
                        <div class="cards__flag-type">webinar</div>
                    </div>
                    <div class="cards__content no-gutters flex-column">
                        <div class="cards__title-wrapper">

                            <p class="cards__title">${title}</p>
                        </div>
                        <p class="cards__subtitle truncate-lines-4">
                            ${description}
                        </p>
                    </div>
                </article>
            </a>`;
      } else {
        return ` <a href="${url}" class="cards__card-wrapper cards__card-wrapper">
                    <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                        <div class="cards__flag-wrapper">
                        ${pageType === "Podcast" ? '<div class="cards__flag-type cards__flag-yellow">audio</div>' : ""}
                        ${pageType === "Webinar" || pageType === "Spotlight" ? '<div class="cards__flag-type cards__flag-yellow">video</div>' : ""}
                            <div class="cards__flag-type">
                            ${pageType}
                            </div>
                        </div>
                        <div class="cards__image-wrapper">
                            <div class="cards__image"><img src="${img}" alt=""></div>
                        </div>
                        <div class="cards__content no-gutters flex-column justify-content-between">
                            <p class="cards__type">${pageType}</p>
                            <div class="cards__title-wrapper">
                            <p class="cards__title truncate-lines-2">
                               ${title}
                            </p>
                            </div>
                        </div>
                    </article>
                </a>`;
      }
    };
    /**
     * @param {[]} array array with items
     * @param {string} heading
     * @param viewAllURL
     * @returns {html}
     */


    const boxWrapperTemplate = array => {
      if (array.length) {
        let output = "";
        output += `<div class="insights-listing__wrapper insights-landing">
                    <div class="cards cards-story">
                        <div class="cards__wrapper col-mobile-centered">`;

        for (let i = 0; i < array.length; i++) {
          // clickTrackingUrl, title, pageType, img, url, marks, date
          output += boxTemplate(array[i].clickTrackingUrl, array[i].title, array[i].pageType, array[i].profileImage, array[i].url, array[i].marks, array[i].date, array[i].ewDescription);
        }

        output += `</div></div></div>`;
        return output;
      }
    };

    await sortData();
    output += boxWrapperTemplate(searchInsightsListingRaw) || ""; //removing old output after raload data

    var contntWrapper = document.querySelector("results-wrapper--insights-listing");

    if (contntWrapper) {
      contntWrapper.parentNode.removeChild(contntWrapper);
    } //displaing output on front


    document.querySelector(".results-wrapper").innerHTML = output;
  };

  if (document.querySelector(".fbjs-search--insights-listing")) {
    window.searchAZ = new Search.default({
      url: "https://wood-search01.squiz.co.uk/s/search.json",
      collections: ["push-wood-data"],
      additionalFBparams: {
        profile: "_default",
        gscope1: "insightsListing"
      },
      onFiltersUpdate: () => {
        var _window$searchArticle;

        buildHtml();
        const activeFilters = (_window$searchArticle = window.searchArticles) === null || _window$searchArticle === void 0 ? void 0 : _window$searchArticle.search.activeFacets;

        for (const entry in activeFilters) {
          if (activeFilters[entry].value !== []) {
            hasActiveFilters = true;
            return hasActiveFilters;
          }
        }

        searchInsightsListingData.aditionalInfo.resetData = 1;
      },
      beforeSearch: () => {
        //reset global data
        if (searchInsightsListingData.aditionalInfo.resetData) {
          searchInsightsListingRaw = [];
          searchInsightsListingData.viewpoint = null;
          searchInsightsListingData.article = null;
          searchInsightsListingData.podcast = null;
          searchInsightsListingData.blog = null;
          searchInsightsListingData.report = null;
          searchInsightsListingData.aditionalInfo.resetData = 0;
        }
      },
      sort: {
        type: "date"
      },
      results: {
        numRanks: 30,
        startRank: 1
      },
      activeFacetsOnStart: {
        "f.pageType|pageType": [],
        "f.keyMarketEnergy|keyMarketEnergy": [],
        "f.keyMarketEnvironment|keyMarketEnvironment": [],
        "f.geographies|geographies": []
      },
      pagination: {
        loadMore: true
      },
      templates: {
        activeFacet: (name, param) => {
          const changeName = name.replace(/_ampersand_/gi, "&").replace(/_comma_/gi, ",");
          return `
                      <span param="${param}" name="${name}">
                        ${changeName}
                      </span>
                    `;
        },
        articleTemplate: fields => {
          // x.push(fields); // for debeug funnelback data
          buildHtml();
          searchInsightsListingRaw.push({
            type: fields.metaData.type,
            pageType: fields.metaData.pageType,
            clickTrackingUrl: fields.clickTrackingUrl,
            summary: fields.summary,
            id: fields.metaData.id,
            title: fields.metaData.t,
            url: fields.displayUrl,
            profileImage: fields.metaData.image,
            marks: fields.metaData.marks,
            date: fields.metaData.d,
            pageType: fields.metaData.pageType,
            ewSubtitle: fields.metaData.ewSubtitle || "",
            ewDescription: fields.metaData.ewDescription || "" // "keyMarketEnergy": fields.metaData.keyMarketEnergy,
            // "keyMarketEnvironment": fields.metaData.keyMarketEnvironment,
            // "profileJobTitle": fields.metaData.profileJobTitle

          });
          return ``;
        },

        /**
         * @name informationTemplate
         * @param fields
         * @param resultsSummary
         * @param h
         * @returns {string}
         */
        informationTemplate: () => {
          return "";
        },
        formTemplate: (search, query, inputId) => {
          query == "!nullsearch" ? query = "" : null; // name="query"
          // class="search-input-field"

          return `
                    <div class="search-field">
                        <form class="search__form" role="search" action="/search" method="get">
                            <label for="${inputId}" class="sr-only">Search site</label>
                            <input
                                id="${inputId}"
                                type="text"
                                class="search__form-input search-custom"
                                placeholder="Insights search"
                                autocomplete="off"
                                role="searchbox"
                                aria-label="Search"
                                autocorrect="off"
                                autocapitalize="off"
                                spellcheck="false"
                                maxlength="1000"
                                aria-haspopup="menu"
                                aria-expanded="false"
                                value="${query}">
                            <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                                <i class="search__submit-icon" aria-hidden="true"></i>
                                <span class="sr-only">Do search</span>
                            </button>
                            <div class="fb-search-wrapper"></div>
                        </form>
                    </div>
                    `;
        },
        loadMoreTemplate: () => {
          return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
        },
        facetCheckbox: ({
          categories,
          singleChoice
        }, activeFacets, h) => {
          //{name, label}, activeFacets
          // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
          let list = "";
          list += '<li class="search__facet-item search__facet-item--all"></li>';
          categories[0].values.forEach(item => {
            if (item.label !== "other") {
              list += `<li class="search__facet-item">
                                    <label class="search__facet-label">
                                        <input
                                        class="search__facet-input"
                                        type="checkbox"
                                        ${item.checked}
                                        value="${item.data}"
                                        name="${item.label}"
                                        data-fparam="${h.queryStringParamName}"
                                        data-singlechoice="${singleChoice}"
                                        />
                                        <span class="search__facet-span">${item.label}</span>
                                    </label>
                                    </li>`;
            }
          });
          return `<div class="checkbox-facet">
                            <ul class="search__facets">
                            ${list}
                            </ul>
                        </div>`;
        },

        /**
         * @name paginationTemplate
         * @param query
         * @param spell
         * @returns {string}
         */
        noResults: () => {
          // let spellSuggestion = "";
          // if (spell.text) {
          //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
          // }
          if (hasActiveFilters) {
            return `<div>There are no results matching your filter criteria</div>`;
          } else {
            return `<div>We're sorry, we couldn't find anything matching</div>`;
          }
        }
      }
    });
    window.searchAZ.init();
  }
}

/***/ }),

/***/ 2546:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--latest-investor-news")) {
  window.searchInvestorNewsLanding = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-investor-news"],
    additionalFBparams: {
      profile: "_default"
    },
    shouldFacetsFromUrlOverwriteActiveFacets: true,
    results: {
      numRanks: 12
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: false,
      arrows: true,
      arrowsOnEdgePages: true,
      dots: false,
      edgePages: true,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        // 2017-08-10 -> 10 Aug 2017
        const changeDate = () => {
          const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                // dateFromFunnelback = fields.metaData.d, // 2017-08-10
          splitedDate = fields.metaData.d.split("-");
          return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
        };

        return `<div class="news-card__wrapper static-size-12">
                            <a href="https://wood-search01.squiz.co.uk${fields.clickTrackingUrl}">
                                <div class="news-card__content no-gutters">
                                    <div class="date">${changeDate()}</div>
                                    <p class="title truncate-lines-2 secondary-link">
                                    ${fields.metaData.t}
                                    </p>
                                </div>
                            </a>  
                        </div>`;
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: (fields, resultsSummary) => {
        return `
                    <p>
                      showing <strong>${resultsSummary.currStart}-${resultsSummary.currEnd} of ${resultsSummary.totalMatching}</strong> results
                    </p>
                  `;
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Search Investor News"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: (number, startrank) => {
        if (startrank === 1) {
          return '';
        }

        return `<li data-startrank=${startrank} tabindex="0">${number}</li>`;
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: number => {
        return `<li class="active-page">${number}/</li>`;
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },
      arrowNextTemplate: startrank => {
        if (startrank) {
          return `<button class="next-page" tabindex="0" data-startrank=${startrank}>Next</button>`;
        }

        return '<button class="next-page disabled" tabindex="0">Next</button>';
      },
      arrowPrevTemplate: startrank => {
        if (startrank) {
          return `<button class="prev-page" tabindex="0" data-startrank=${startrank}>Previous</button>`;
        }

        return '<button class="prev-page disabled" tabindex="0">Previous</button>';
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        return "<div>We're sorry, we couldn't find anything matching.</div>";
      }
    }
  });
  window.searchInvestorNewsLanding.init();
}

/***/ }),

/***/ 5745:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--life-at-wood")) {
  window.searchNewsLanding = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-careers"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "Careers - Life@wood blog"
    },
    shouldFacetsFromUrlOverwriteActiveFacets: true,
    onFiltersUpdate: () => {},
    beforeSearch: () => {},
    results: {
      numRanks: 6
    },
    sort: {
      type: "date"
    },
    activeFacets: {
      target: ".active-facets"
    },
    activeFacetsOnStart: {
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": [],
      "f.geographies|geographies": []
    },
    pagination: {
      loadMore: true
    },
    templates: {
      activeFacet: (name, param) => {
        const changeName = name.replace(/_ampersand_/gi, "&").replace(/_comma_/gi, ",");
        return `
                  <span param="${param}" name="${name}">
                    ${changeName}
                  </span>
                `;
      },
      articleTemplate: fields => {
        return `<div class=" cards__card-wrapper static-size-4">
                <a href="https://wood-search01.squiz.co.uk${fields.clickTrackingUrl}">
                    <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                        <!-- card image -->
                        <div class="cards__image-wrapper">
                            <div class="cards__image" style="
                                    background-image: url('${fields.metaData.image}');
                                "></div>
                        </div>
                        <div class="cards__content no-gutters flex-column justify-content-between">
                            <div>
                                <!-- card type - same as section header -->
                                <div class="informations__wrapper">
                                    <div class="type truncate-lines-2"> ${fields.metaData.t}</div>
                                </div>
                                <!-- card title -->
                                <p class="title truncate-lines-2">
                                ${fields.metaData.description || ""}
                                </p>
                            </div>
                            <!-- link -->
                            <div class="cards__link">
                            <object><a href="https://wood-search01.squiz.co.uk${fields.clickTrackingUrl}"> Read more </a></object>
                            </div>
                        </div>
                    </article>
                    </a>
                </div>`;
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                <h5>What are you looking for today?</h5>
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Search..."
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       **/
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--tertiary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return "<div>We're sorry, we couldn't find anything matching .</div>";
      }
    }
  });
  window.searchNewsLanding.init();
}

/***/ }),

/***/ 7833:
/***/ (function() {

/* global squiz */

/**
 * data-lightbox-special - vars.action -
 * by using "data-lightbox-special" you are able to for example pick another selector (it work only on "data-lightbox-ajax-site" )
 *
 * Note: Thank you page need to be wraped by div with class "lb-thankyou"
 */
[...document.querySelectorAll(".lightbox")].map(el => el.classList.add("lightbox--js"));
const lightBox = {
  selectors: {
    lightboxItems: document.querySelectorAll(".lightbox--js"),
    lightboxCloseButtons: document.querySelectorAll(".lightbox__button--js-close-lightbox"),
    lightboxBox: document.querySelector(".lightbox__box"),
    lightboxContentBox: document.querySelector(".lightbox__content"),
    lightboxSubmitButton: document.querySelector(".lightbox__button--send")
  },
  cls: {
    lightboxDelay: ".lightbox-delay--js",
    lightboxTrigger: ".lightbox--js"
  },
  vars: {
    itItInternalLink: true,
    action: "",
    pageUrl: "woodplc.com",
    lvlOfLightboxInLightbox: 0
  },

  delayedInit() {
    let delayedLightboxesObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (!mutation.addedNodes) return;

        for (let i = 0; i < mutation.addedNodes.length; i++) {
          let node = mutation.addedNodes[i];

          if (node.nodeType === Node.ELEMENT_NODE) {
            const lightboxes = [...node.querySelectorAll(this.cls.lightboxTrigger)];
            lightboxes.forEach(lightboxOpener => {
              lightboxOpener.addEventListener("click", e => this.lightboxOpenClickHandler(e));
            });
          }
        }
      });
    });
    const delayedLightboxNodes = [...document.querySelectorAll(this.cls.lightboxDelay)];
    delayedLightboxNodes.forEach(delayedLightboxNode => {
      delayedLightboxesObserver.observe(delayedLightboxNode, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
      });
    });
    this.integrateReCaptcha();
  },

  init() {
    [...this.selectors.lightboxItems].forEach(item => {
      item.addEventListener("click", e => this.lightboxOpenClickHandler(e));
    }); // close buttons

    [...this.selectors.lightboxCloseButtons].forEach(closeButton => {
      closeButton.addEventListener("click", this.lightboxCloseClickHandler);
    });
    this.delayedInit();
  },

  integrateReCaptcha() {
    const targetNode = document.querySelector(".page-wrapper");

    const injectCaptcha = async () => {
      const formContainer = document.querySelector(".form-lightbox__container");
      const script = document.createElement("script");
      const recaptchaBtn = document.createElement("div");
      recaptchaBtn.classList.add("g-recaptcha");
      recaptchaBtn.classList.add("async-recaptcha");
      recaptchaBtn.setAttribute("data-theme", "light");
      recaptchaBtn.setAttribute("data-size", "normal");
      recaptchaBtn.setAttribute("data-sitekey", "6LcBCugfAAAAALA1Q8oUqwxlaBbU0HOP3r2tO7vu");
      const reCaptchaContainer = document.querySelector(".form-recaptcha-container") || null;
      reCaptchaContainer === null || reCaptchaContainer === void 0 ? void 0 : reCaptchaContainer.childNodes.forEach(child => {
        child.remove();
      });
      reCaptchaContainer === null || reCaptchaContainer === void 0 ? void 0 : reCaptchaContainer.appendChild(recaptchaBtn);
      script.src = "https://www.google.com/recaptcha/api.js";
      reCaptchaContainer === null || reCaptchaContainer === void 0 ? void 0 : reCaptchaContainer.appendChild(script);
      formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.add('has-recaptcha');
      proxy.value = false;
      return;
    };

    const isInjectNeeded = {
      value: false
    };
    const proxy = new Proxy(isInjectNeeded, {
      set: function (target, key, value) {
        target[key] = value;

        if (isInjectNeeded.value) {
          injectCaptcha();
        }

        return;
      }
    });

    const observeForm = mutationList => {
      const excludedNode = document.querySelector(".form-recaptcha-container") || null;

      for (const mutation of mutationList) {
        if (mutation.target === excludedNode || mutation.target === document.querySelector('.g-recaptcha') || excludedNode && [...excludedNode.childNodes].includes(mutation.target)) {
          return;
        }
      }

      if (document.querySelector(".lightbox-section") && !document.querySelector('.has-recaptcha')) {
        proxy.value = true;
      }
    };

    const observerConfig = {
      childList: true,
      subtree: true
    };
    const formObserver = new MutationObserver(observeForm);
    formObserver.observe(targetNode, observerConfig);
  },

  lightboxOpenClickHandler(e) {
    const target = e.currentTarget,
          dataAttr = [...target.attributes].filter(el => el.name.includes("data-lightbox-ajax-") || el.name.includes("data-lightbox-video"))[0]; //obj with name and value

    this.vars.action = target.getAttribute("data-lightbox-special") || "";
    e.preventDefault();
    squiz.fn.loadSpiner("show");

    if (this.vars.lvlOfLightboxInLightbox > 0) {
      squiz.fn.lightboxClean();
    }

    dataAttr.name && dataAttr.name === "data-lightbox-video" ? squiz.fn.appendVideo(this.selectors.lightboxContentBox, dataAttr) : this.fetchinglightboxData(dataAttr, target);
  },

  /**
   *
   * @param dataAttr {obj} - {name: attrName, value: attrValue}
   * @param target  - e.currentTarget
   */
  fetchinglightboxData(dataAttr, target) {
    var url = dataAttr.value;

    if (dataAttr.value.includes(this.vars.pageUrl)) {
      // check "data-lightbox-special" attribute
      switch (this.vars.action) {
        case "profile":
          url = url + "?SQ_DESIGN_NAME=blank";
          break;

        case "subscribe":
        case "":
          url = url + "?SQ_ASSET_CONTENTS_RAW";
          break;

        default:
          // no changes
          break;
      }
    } else {
      this.vars.action = "external";
    }

    fetch(url).then(response => {
      switch (dataAttr.name) {
        case "data-lightbox-ajax-site":
          return response.text();

        default:
          return null;
      }
    }).then(data => {
      switch (dataAttr.name) {
        case "data-lightbox-ajax-site":
          this.displaingFetchHtml(data, dataAttr, target);
          break;

        default:
          return null;
      }
    }).catch(function (err) {
      console.warn("Something went wrong.", err);
      squiz.fn.loadSpiner("hide");
    });
  },

  /**
   * @desc - Append html from fetch to '.lightbox__content'
   * @param data {obj} - data from fetch
   * @param dataAttr {obj} - {name: attrName, value: attrValue}
   * @param target  - e.currentTarget
   */
  displaingFetchHtml(data, dataAttr, target) {
    const parser = new DOMParser(),
          doc = parser.parseFromString(data, "text/html");
    let contentToAdd; // support lightbox in lightbox

    [...doc.querySelectorAll(".lightbox")].map(item => {
      item.addEventListener("click", e => this.lightboxOpenClickHandler(e));
    });
    this.vars.lvlOfLightboxInLightbox++; // by using "data-lightbox-special" you are able to pick another selector (it work only on "data-lightbox-ajax-site" )
    // if(dataAttr.name === 'data-lightbox-ajax-site') {

    switch (this.vars.action) {
      case "external":
        contentToAdd = doc.querySelector("body");
        break;

      case "profile":
        contentToAdd = doc.querySelector(".profile-page");
        break;
      // case 'subscribe':
      //     contentToAdd = doc.querySelector('.lb-form');
      //     break;

      default:
        contentToAdd = doc.querySelector("html");
        break;
    } // }
    // if submit button with class '.sq-form-submit' exist


    if (doc.querySelector(".sq-form-submit")) {
      switch (this.vars.action) {
        // email is nesesery to send mail to properly pleace
        // backUrl is nesesery to support back button
        case "profile-open":
          var email = target.getAttribute("data-lightbox-email");
          var backUrl = target.getAttribute("data-lightbox-back");
          contentToAdd = doc.querySelector("form.lb-form") || doc.querySelector(".lb-form");
          var backButton = contentToAdd.querySelector(".form-lightbox__back--link");
          var emailHandler = contentToAdd.querySelector(".hidden-email input");

          if (backButton) {
            backButton.setAttribute("data-lightbox-ajax-site", backUrl); //--  back

            localStorage.setItem("targetBackUrl", backUrl);
            backButton.addEventListener("click", () => {
              lightBox.vars.lvlOfLightboxInLightbox = lightBox.vars.lvlOfLightboxInLightbox - 2;
            });
          }

          if (emailHandler && email) {
            emailHandler.value = email;
            localStorage.setItem("targetEmail", email);
          }

          break;

        default:
          contentToAdd = doc.querySelector("form.lb-form") || doc.querySelector(".lb-form");
          break;
      }
    }

    squiz.fn.loadSpiner("hide");
    squiz.fn.lightboxActions("show");

    try {
      if (doc.querySelector(".sq-form-submit")) {
        this.changingSubmit(contentToAdd);
      }

      this.selectors.lightboxContentBox.appendChild(contentToAdd);

      if (contentToAdd.querySelector("select")) {
        squiz.fn.runCustomSelect();
      }
    } catch (error) {
      console.error(error);
      squiz.fn.lightboxActions("hide");
    }
  },

  /**
   * @desc - hideing form submit and ading new unther the page.
   * @param parsedHTML {node?} - data from fetch but parsered to 'text/html'
   */
  changingSubmit(parsedHTML) {
    // do only if form have select with "sq-form-submit" class
    if (parsedHTML.querySelector(".sq-form-submit")) {
      this.selectors.lightboxSubmitButton.classList.remove("hidden");
      this.selectors.lightboxSubmitButton.addEventListener("click", this.sendForm); //() => this.sendForm()

      parsedHTML.querySelector(".sq-form-submit").classList.add("sr-only");
    }
  },

  /**
   * @desc - geting data from lightbox form
   */
  getDataFromLightboxForm() {
    const form = document.querySelector(".lightbox__content form"),
          formData = new FormData(form),
          submit = [...form.querySelectorAll("[name]")].filter(el => el.name.includes("submit")); // adding submit to formData

    formData.append(submit[0].id, "Submit");
    return formData;
  },

  sendForm() {
    const action = document.querySelector(".lightbox__content form").getAttribute("action"),
          payload = lightBox.getDataFromLightboxForm();
    squiz.fn.loadSpiner("show");
    squiz.fn.lightboxActions("hide");
    fetch(action, {
      method: "POST",
      body: payload
    }).then(response => response.text()).then(data => {
      const parser = new DOMParser(),
            doc = parser.parseFromString(data, "text/html"),
            contentToAdd = doc.querySelector(".sq-form-summary-semantic") || doc.querySelector(".lb-thankyou") || doc.querySelector("form.lb-form"); // form content

      [...doc.querySelectorAll(".lightbox")].map(item => {
        item.addEventListener("click", e => lightBox.lightboxOpenClickHandler(e));
      }); // lightBox.vars.lvlOfLightboxInLightbox++;

      squiz.fn.loadSpiner("hide");
      squiz.fn.lightboxActions("show");

      try {
        squiz.fn.lightboxClean();

        if (doc.querySelector(".sq-form-submit")) {
          lightBox.changingSubmit(contentToAdd); // maybe it will be error feedback from "email me profile form" then we need to
          // support "back" button and "email" field

          const backUrl = localStorage.getItem("targetBackUrl"),
                email = localStorage.getItem("targetEmail"),
                backButton = contentToAdd.querySelector(".form-lightbox__back--link"),
                emailHandler = contentToAdd.querySelector(".hidden-email input");

          if (backButton) {
            backButton.setAttribute("data-lightbox-ajax-site", backUrl); //-- back

            backButton.addEventListener("click", () => {
              lightBox.vars.lvlOfLightboxInLightbox = lightBox.vars.lvlOfLightboxInLightbox - 2;
            });
          }

          if (emailHandler && email) {
            emailHandler.value = email;
          }
        }

        lightBox.selectors.lightboxContentBox.appendChild(contentToAdd);
      } catch (error) {
        console.error(error);
        squiz.fn.lightboxActions("hide");
      }
    }).catch(error => {
      console.error("Error:", error);
    });
  },

  lightboxCloseClickHandler: e => {
    e.preventDefault();
    squiz.fn.lightboxClean();
    squiz.fn.lightboxActions("hide");
    lightBox.vars.lvlOfLightboxInLightbox = 0;
  }
};
lightBox.init();

/***/ }),

/***/ 2000:
/***/ (function() {

// import "@lottiefiles/lottie-player";
// const loading = document.querySelector('.loading');
// loading.innerHTML += '<div class="lottie-loader"><lottie-player src="./?a=197380" background="transparent" speed="1" style="width: 80px; height: 80px;" loop="" autoplay=""></lottie-player></div>';

/***/ }),

/***/ 9106:
/***/ (function() {

/* global YT */

/**
 * @param {node selector} videoBannerSelector example {div.video-banner--js.main-banner__background-video}
 * @param {string} videoId example MmzadGwyYjY
 */
const appendVideoBanner = (videoBannerSelector, videoId) => {
  const width = videoBannerSelector.offsetWidth,
        height = Math.round(width / 1.7777),
        videoSice = {
    width,
    height
  };
  /^[0-9]+$/.test(videoId) ? appendVimeoBanner(videoBannerSelector, videoId, videoSice) : appendYoutubeBanner(videoBannerSelector, videoId, videoSice);
  /**
   *
   * @param {node selector} videoBannerSelector example {div.video-banner--js.main-banner__background-video}
   * @param {string} videoId example MmzadGwyYjY
   * @param {obj} videoSice {width, height}
   */

  function appendYoutubeBanner(videoBannerSelector, videoId, videoSice) {
    const newSelector = videoBannerSelector.querySelector(".lightbox__iframe");
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let player;

    window.onYouTubeIframeAPIReady = function () {
      player = new YT.Player(newSelector, {
        videoId: videoId,
        height: videoSice.height,
        width: videoSice.width,
        playerVars: {
          autoplay: 1,
          loop: 1,
          mute: 1,
          controls: 0,
          modestbranding: 0,
          rel: 0
        },
        events: {
          onReady: window.onPlayerReady,
          onStateChange: window.onPlayerStateChange
        }
      });
    };

    window.onPlayerReady = function (event) {
      event.target.playVideo();
    };

    window.onPlayerStateChange = function (event) {
      if (event.data === YT.PlayerState.ENDED) {
        player.playVideo(); // const YTP = event.target;
        // if (event.data === 1) {
        //     // console.log(YTP.getDuration());
        //     // console.log(YTP.getCurrentTime());
        //     // const remains =
        //     //     YTP.getDuration() - YTP.getCurrentTime();
        //     // console.log(remains);
        //     // if (window.rewindTO) clearTimeout(window.rewindTO);
        //     // window.rewindTO = setTimeout(function () {
        //     //     YTP.seekTo(0);
        //     // }, (remains - 0.1) * 1000);
        // }
      }
    };
  }
  /**
   *
   * @param {node selector} videoBannerSelector example {div.video-banner--js.main-banner__background-video}
   * @param {string} videoId example 23452432
   * @param {obj} videoSice {width, height}
   */


  function appendVimeoBanner(videoBannerSelector, videoId, videoSice) {
    const vimeoVideo = `
        <iframe class="lightbox__iframe" width=${videoSice.width} height=${videoSice.height}
            src="https://player.vimeo.com/video/${videoId}?muted=1&autoplay=1&loop=1&controls=0"
            frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
        >
        </iframe>`;
    videoBannerSelector.innerHTML = vimeoVideo;
  }
};

const videoBannerSelector = document.querySelector(".video-banner--js"); //obj with name and value

if (videoBannerSelector) {
  const dataAttr = [...videoBannerSelector.attributes].filter(el => el.name.includes("data-video-id"))[0];
  appendVideoBanner(videoBannerSelector, dataAttr.value);
}

/***/ }),

/***/ 4952:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--news-landing")) {
  let hasActiveFilters;
  window.searchNewsLanding = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      // gscope1: 'newsLanding', //we cant use it
      "f.pageType|pageType": "News - Article",
      "f.pageType%7CpageType": "News - Press release"
    },
    shouldFacetsFromUrlOverwriteActiveFacets: true,
    onFiltersUpdate: () => {
      var _window$searchArticle, _window$searchArticle2;

      const activeFilters = (_window$searchArticle = window.searchArticles) === null || _window$searchArticle === void 0 ? void 0 : (_window$searchArticle2 = _window$searchArticle.search) === null || _window$searchArticle2 === void 0 ? void 0 : _window$searchArticle2.activeFacets;

      for (const entry in activeFilters) {
        if (activeFilters[entry].value !== []) {
          hasActiveFilters = true;
          return hasActiveFilters;
        }
      }
    },
    beforeSearch: () => {},
    results: {
      numRanks: 18
    },
    sort: {
      type: "date"
    },
    activeFacets: {
      target: ".active-facets" // ... some other configuration fields

    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [//         "expertise - software",
        //         "expertise - sme profile",
        //         "expertise - product",
        //         "expertise - expertise",
        //         "key market"
      ],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": [],
      "f.geographies|geographies": []
    },
    pagination: {
      loadMore: true
    },
    templates: {
      activeFacet: (name, param) => {
        const changeName = name.replace(/_ampersand_/gi, "&").replace(/_comma_/gi, ",");
        return `
                  <span param="${param}" name="${name}">
                    ${changeName}
                  </span>
                `;
      },
      articleTemplate: fields => {
        let pageType = fields.metaData.pageType ? fields.metaData.pageType.replace(/\w*\s-\s/gm, "") : "";

        if (fields.metaData.pageType === "News - Article") {
          pageType = "News article";
        } // 2017-08-10 -> 10 Aug 2017


        const changeDate = () => {
          const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                // dateFromFunnelback = fields.metaData.d, // 2017-08-10
          splitedDate = fields.metaData.d.split("-");
          return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
        };

        return `
                        <a href="${fields.liveUrl}" class="cards__card-wrapper cards__card-wrapper">
                            <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                                <div class="cards__flag-wrapper">
                                    <div class="cards__flag-type">
                                    ${pageType}
                                    </div>
                                </div>
                                <div class="cards__date-wrapper">
                                    <div class="cards__publish-date cards__flag-type">${changeDate()}</div>
                                </div>
                                <div class="cards__image-wrapper">
                                    <div class="cards__image"><img src="${fields.metaData.image || `https://woodplc.com/?a=235271`}" alt=""></div>
                                </div>
                               <div class="cards__content no-gutters flex-column justify-content-between">
                                    <p class="cards__type">${pageType}</p>
                                    <div class="cards__title-wrapper">
                                    <p class="cards__title truncate-lines-2">
                                       ${fields.title}
                                    </p>
                                    </div>
                                </div>
                            </article>
                        </a>`;
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="News search"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       **/
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        if (hasActiveFilters) {
          return `<div>There are no results matching your filter criteria</div>`;
        } else {
          return `<div>We're sorry, we couldn't find anything matching</div>`;
        }
      }
    }
  });
  window.searchNewsLanding.init();
}

/***/ }),

/***/ 5933:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--podcasts")) {
  const addedResults = [];
  const addedIds = [];
  let hasActiveFilters;
  window.searchPodcasts = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      nodup: "1",
      "f.pageType|pageType": "insight - podcast"
    },
    onFiltersUpdate: () => {
      var _window$searchArticle, _window$searchArticle2;

      const activeFilters = (_window$searchArticle = window.searchArticles) === null || _window$searchArticle === void 0 ? void 0 : (_window$searchArticle2 = _window$searchArticle.search) === null || _window$searchArticle2 === void 0 ? void 0 : _window$searchArticle2.activeFacets;

      for (const entry in activeFilters) {
        if (activeFilters[entry].value !== []) {
          hasActiveFilters = true;
          return hasActiveFilters;
        }
      }
    },
    beforeSearch: () => {},
    results: {
      numRanks: 18
    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": [],
      "f.geographies|geographies": []
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: true,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        if (!addedResults.includes(fields.title.toLowerCase()) && !addedIds.includes(fields.metaData.id)) {
          addedResults.push(fields.title.toLowerCase());
          addedIds.push(fields.metaData.id);

          const changeDate = () => {
            const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  // dateFromFunnelback = fields.metaData.d, // 2017-08-10
            splitedDate = fields.metaData.d.split("-");
            return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
          };

          return `
                    <a href="${fields.liveUrl}" class="cards__card-wrapper cards__card-wrapper--news date-mobile">
                        <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                            <div class="cards__image-wrapper">
                                <div class="cards__image"><img src="${fields.metaData.image || `https://woodplc.com/?a=235271`}" alt=""></div>
                            </div>
                            <div class="cards__content no-gutters flex-column justify-content-between">
                                                        <div class="cards__title-wrapper">
                            <p class="cards__title truncate-lines-2">
                                ${fields.title}
                            </p>
                            </div>
                            <p class="cards__publish-date-mobile">${changeDate()}</p>
                            </div>
                        </article>
                    </a>`;
        } else {
          return "";
        }
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Podcast search"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       **/
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        if (hasActiveFilters) {
          return `<div>There are no results matching your filter criteria</div>`;
        } else {
          return `<div>We're sorry, we couldn't find anything matching</div>`;
        }
      }
    }
  });
  window.searchPodcasts.init();
}

/***/ }),

/***/ 4359:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const progressBar = () => {
  const progressBar = document.querySelector('.progress-bar__content');

  if (progressBar) {
    window.onscroll = () => {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrolled = winScroll / height * 100;
      progressBar.style.width = scrolled + "%";
    };
  }
};

/* harmony default export */ __webpack_exports__["Z"] = (progressBar);

/***/ }),

/***/ 807:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const displayDropdown = () => {
  document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]");
    const width = window.innerWidth; // clicking outside dropdown

    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;
    let currentDropdown;

    if (isDropdownButton) {
      currentDropdown = e.target.closest("[data-dropdown]"); // show -> hide

      currentDropdown.classList.toggle("active");

      if (e.target === document.querySelector('.c-filters__button') || e.target === document.querySelector('.c-filters.element-sticky') && width < 1200) {
        document.body.classList.toggle('filters-active');
      }
    } // closing every dropdown except the one just clicked


    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
      if (dropdown === currentDropdown || e.target.classList.contains('date-filled-static')) return;
      dropdown.classList.remove("active");
    });
  });
};

/* harmony default export */ __webpack_exports__["Z"] = (displayDropdown);

/***/ }),

/***/ 2004:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--reports")) {
  const addedResults = [];
  const addedIds = [];
  let hasActiveFilters;
  window.searchReports = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "insight - report"
    },
    onFiltersUpdate: () => {
      var _window$searchReports;

      const activeFilters = (_window$searchReports = window.searchReports) === null || _window$searchReports === void 0 ? void 0 : _window$searchReports.search.activeFacets;

      for (const entry in activeFilters) {
        if (activeFilters[entry].value !== []) {
          hasActiveFilters = true;
          return hasActiveFilters;
        }
      }
    },
    beforeSearch: () => {},
    results: {
      numRanks: 9
    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": []
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: true,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        if (!addedResults.includes(fields.title.toLowerCase()) && !addedIds.includes(fields.metaData.id)) {
          addedResults.push(fields.title.toLowerCase());
          addedIds.push(fields.metaData.id);

          const changeDate = () => {
            const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  // dateFromFunnelback = fields.metaData.d, // 2017-08-10
            splitedDate = fields.metaData.d.split("-");
            return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
          };

          return `
                    <a href="${fields.liveUrl}" class="cards__card-wrapper cards__card-wrapper--news date-mobile">
                        <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                            <div class="cards__image-wrapper">
                                <div class="cards__image"><img src="${fields.metaData.image || `https://woodplc.com/?a=235271`}" alt=""></div>
                            </div>
                            <div class="cards__content no-gutters flex-column justify-content-between">
                            <div class="cards__title-wrapper">
                            <p class="cards__title truncate-lines-2">
                            ${fields.title}
                            </p>
                            </div>
                            <p class="cards__publish-date-mobile">${changeDate()}</p>
                            </div>
                        </article>
                    </a>`;
        } else {
          return "";
        }
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Reports search"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       **/
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return `<div>We're sorry, we couldn't find anything matching.</div>`;
      }
    }
  });
  window.searchReports.init();
}

/***/ }),

/***/ 5476:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search")) {
  const mySearch = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["wood-combined-meta"],
    additionalFBparams: {
      profile: "_default",
      nodup: "1"
    },
    onFiltersUpdate: () => {
      var allResultsLabel = document.querySelector(".search__facet-item--all"),
          facetsSelctor = document.querySelectorAll(".search__facet-input"),
          facetsLabelsSelctor = document.querySelectorAll(".search__facet-label"),
          highlightAllResults = true,
          checkedParam = 'checked="checked"';
      /**
       * @desc If any of facets are mot selected, select All results
       */

      [...facetsSelctor].map(el => {
        el.checked == true ? highlightAllResults = false : "";
      });
      var facetTemplateAll = `<label class="search__facet-label">
                <input
                class="search__facet-input"
                type="checkbox"
                value="All"
                name="All results"
                id="facet--all-results-js"
                ${highlightAllResults ? checkedParam : ""}
                />
                <span class="search__facet-span">All results</span>
            </label>`;

      if (allResultsLabel) {
        // add template All results
        allResultsLabel.innerHTML = facetTemplateAll;
        /**
         * @desc If client will click All results, script will unselect opened facet by clicking it again
         */

        allResultsLabel.addEventListener("click", e => {
          e.preventDefault();
          var selectedItem = [...facetsSelctor].filter(el => el.checked == true);
          selectedItem.length ? selectedItem[0].click() : "";
        });
      }

      [...facetsLabelsSelctor].map(el => {
        el.addEventListener("click", () => {
          var elmnt = document.querySelector(".search__form");
          elmnt.scrollIntoView();
        });
      });
    },
    results: {
      numRanks: 10
    },
    facets: {
      items: [{
        name: "section",
        type: "checkbox",
        options: {
          singleChoice: true,
          facetsRestricted: false
        }
      }]
    },
    pagination: {
      loadMore: false,
      arrows: true,
      arrowsOnEdgePages: true,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        var url = fields.clickTrackingUrl ? `https://wood-search01.squiz.co.uk${fields.clickTrackingUrl}` : "";
        var title = fields.metaData.t ? `<h2 class="search__item-title">${fields.metaData.t}</h2>` : "";
        var desc = fields.metaData.description ? `<p class="search__item-paragraph">${fields.metaData.description}</p>` : "";
        var breadcrumbs = fields.metaData.breadcrumbs ? fields.metaData.breadcrumbs.replace("Home", "Wood") : "";
        var titleAttr = fields.title.length > 0 ? true : false;

        if (titleAttr) {
          return `
                <div>
                    <a href="${url}" class="search__item">${title}</a>
                    ${desc}
                    ${breadcrumbs}
                </div>
                `;
        }

        return "";
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: (fields, resultsSummary) => {
        return `
                <p class="search__summary">
                    Showing ${resultsSummary.currStart}-${resultsSummary.currEnd} of ${resultsSummary.totalMatching}
                </p>
                `;
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null; // name="query"
        // class="search-input-field"

        return `
                <div>
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Search..."
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            autofocus="autofocus"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startRank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name arrowNextTemplate
       * @param startrank
       * @returns {string}
       **/
      arrowNextTemplate: startrank => {
        return `<button class="btn btn--listing-next" data-startrank=${startrank}>Next</button>`;
      },

      /**
       * @name arrowPrevTemplate
       * @param startrank
       * @returns {string}
       **/
      arrowPrevTemplate: startrank => {
        return `<button class="btn btn--listing-previous" data-startrank=${startrank}>Previous</button>`;
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return "<div>We're sorry, we couldn't find anything matching .</div>";
      }
    }
  });
  mySearch.init();
}

/***/ }),

/***/ 6103:
/***/ (function() {

const shareButtonHandler = e => {
  e.preventDefault();
  const target = e.currentTarget;

  if (target.getAttribute('aria-expanded') === 'true') {
    target.setAttribute('aria-expanded', 'false');
    target.parentNode.classList.remove('open');
  } else {
    target.setAttribute('aria-expanded', 'true');
    target.parentNode.classList.add('open');
  }
};

const copyPageUrlToClipboard = e => {
  const target = e.currentTarget,
        buttonText = target.innerHTML,
        urlInput = document.createElement('input'),
        url = window.location.href,
        parent = document.querySelector('.url_keeper'); // comunicate for client that he coppied url

  target.classList.add('share__copy-button--green');
  target.innerHTML = 'Copied';
  setTimeout(() => {
    target.classList.remove('share__copy-button--green');
    target.innerHTML = buttonText;
  }, 1000); // copy url to clipboard

  urlInput.value = url;
  parent.appendChild(urlInput);
  urlInput.select();
  document.execCommand('copy');
  parent.removeChild(urlInput);
};

[...document.querySelectorAll('.share__active-button--js')].map(el => {
  el.addEventListener('click', shareButtonHandler);
});
[...document.querySelectorAll('.copy-link--js')].map(el => {
  el.addEventListener('click', copyPageUrlToClipboard);
});

/***/ }),

/***/ 2905:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--spotlight")) {
  const addedResults = [];
  const addedIds = [];
  window.searchSpotlight = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "snsight - spotlight"
    },
    onFiltersUpdate: () => {},
    beforeSearch: () => {},
    results: {
      numRanks: 9
    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": []
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: true,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        if (!addedResults.includes(fields.title.toLowerCase()) && !addedIds.includes(fields.metaData.id)) {
          addedResults.push(fields.title.toLowerCase());
          addedIds.push(fields.metaData.id);
          const pageType = fields.metaData.pageType ? fields.metaData.pageType.replace(/\w*\s-\s/gm, "") : "";
          const marks = fields.metaData.marks;

          const cards = () => {
            if (marks) {
              let output = "";
              const arrayOfMarks = marks.split(";");
              arrayOfMarks.map(el => {
                output += `<div class="cards__flag-type">${el}</div>`;
              });
              return output;
            }
          };

          return `<div class=" cards__card-wrapper static-size-4">
                        <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                        <div class="cards__flag-wrapper">
                            ${cards() || ""}
                        </div>
                            <!-- card image -->
                            <div class="cards__image-wrapper">
                                <div class="cards__image" style="
                                        background-image: url('${fields.metaData.image || `https://woodplc.com/?a=235271`}');
                                    "></div>
                            </div>
                            <div class="cards__content no-gutters flex-column justify-content-between">
                                <div>
                                    <!-- card type - same as section header -->
                                    <div class="type">${pageType}</div>
                                    <!-- card title -->
                                    <p class="title truncate-lines-2">
                                        ${fields.metaData.t}
                                    </p>
                                </div>
                                <!-- link -->
                                <div class="cards__link">
                                    <a href="https://wood-search01.squiz.co.uk${fields.clickTrackingUrl}"> Read more </a>
                                </div>
                            </div>
                        </article>
                    </div>`;
        } else {
          return "";
        }
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Search Spotlights"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       **/
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return `<div>We're sorry, we couldn't find anything matching .</div>`;
      }
    }
  });
  window.searchSpotlight.init();
}

/***/ }),

/***/ 3254:
/***/ (function() {

/* global squiz */
[...document.querySelectorAll(".video-card-story--js.cards__video")].map(el => {
  const dataAttr = {
    name: "data-video-id",
    value: el.getAttribute("data-video-id")
  };
  squiz.fn.appendVideo(el, dataAttr);
});

/***/ }),

/***/ 9349:
/***/ (function() {



/***/ }),

/***/ 7762:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const expertiseOpen = () => {
  const targetNode = document.querySelector('.results-wrapper') || null;
  const alternativeResultsWrapper = document.querySelector('.static-expertise-tabs') || null;
  const observerConfig = {
    childList: true
  };

  const handleHover = e => {
    const target = e.target;
    const currTarget = e.currentTarget;

    if (e.type !== 'keyup') {
      if (currTarget.getAttribute('aria-expanded') === 'true') {
        currTarget.setAttribute('aria-expanded', 'false');
        currTarget.classList.remove('open');
      } else {
        currTarget.setAttribute('aria-expanded', 'true');
        currTarget.classList.add('open');
      }
    } else if (e.type === 'keyup' && target.getAttribute('aria-expanded') === 'true' && e.keyCode === 13) {
      window.location.href = target.querySelector('.btn--module-white.btn--a-z');
    }
  };

  const observeRequestEnd = () => {
    const btn = document.querySelectorAll('.btn--module-white.btn--a-z');

    if (btn.length) {
      [...btn].forEach(btn => {
        btn.parentNode.removeEventListener('mouseover', handleHover);
        btn.parentNode.removeEventListener('focus', handleHover);
        btn.parentNode.removeEventListener('blur', handleHover);
        btn.parentNode.removeEventListener('mouseout', handleHover);
        btn.parentNode.removeEventListener('keyup', handleHover);
      });
      [...btn].forEach(btn => {
        btn.parentNode.addEventListener('blur', handleHover);
        btn.parentNode.addEventListener('mouseover', handleHover);
        btn.parentNode.addEventListener('mouseout', handleHover);
        btn.parentNode.addEventListener('focus', handleHover);
        btn.parentNode.addEventListener('keyup', handleHover);
      });
    }
  };

  if (targetNode) {
    const observer = new MutationObserver(observeRequestEnd);
    observer.observe(targetNode, observerConfig);
  } else if (alternativeResultsWrapper) {
    observeRequestEnd();
  }
};

/* harmony default export */ __webpack_exports__["Z"] = (expertiseOpen);

/***/ }),

/***/ 6809:
/***/ (function() {

/* global Search */
if (document.querySelector(".fbjs-search--viewpoints")) {
  const addedResults = [];
  const addedIds = [];
  window.searchViewpoints = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "insight - viewpoint"
    },
    onFiltersUpdate: () => {},
    beforeSearch: () => {},
    results: {
      numRanks: 9
    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": []
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: true,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      articleTemplate: fields => {
        if (!addedResults.includes(fields.title.toLowerCase()) && !addedIds.includes(fields.metaData.id)) {
          addedResults.push(fields.title.toLowerCase());
          addedIds.push(fields.metaData.id);

          const changeDate = () => {
            const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  // dateFromFunnelback = fields.metaData.d, // 2017-08-10
            splitedDate = fields.metaData.d.split("-");
            return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
          };

          return `
                    <a href="${fields.liveUrl}" class="cards__card-wrapper cards__card-wrapper--news date-mobile">
                        <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                            <div class="cards__image-wrapper">
                                <div class="cards__image"><img src="${fields.metaData.image || `https://woodplc.com/?a=235271`}" alt=""></div>
                            </div>
                            <div class="cards__content no-gutters flex-column justify-content-between">
                              <div class="cards__title-wrapper">
                                <p class="cards__title truncate-lines-2">
                                ${fields.title}
                            </p>
                            </div>
                            <p class="cards__publish-date-mobile">${changeDate()}</p>
                            </div>
                        </article>
                    </a>`;
        } else {
          return "";
        }
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Viewpoints search"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       **/
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return `<div>We're sorry, we couldn't find anything matching .</div>`;
      }
    }
  });
  window.searchViewpoints.init();
}

/***/ }),

/***/ 9404:
/***/ (function() {

/* global Search */
const getDate = () => {
  const dateObj = new Date(),
        month = String(dateObj.getMonth() + 1).padStart(2, "0"),
        day = String(dateObj.getDate()).padStart(2, "0"),
        year = dateObj.getFullYear();
  return `${year}${month}${day}`;
};

if (document.querySelector(".fbjs-search--webinar-archive")) {
  window.searchWebinarArchive = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["wood-data"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "event - webinar"
    },
    onFiltersUpdate: () => {},
    beforeSearch: () => {},
    results: {
      numRanks: 18
    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": []
    },
    sort: {
      type: "date"
    },
    pagination: {
      loadMore: true,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      activeFacet: (name, param) => {
        const changeName = name.replace(/_ampersand_/gi, "&").replace(/_comma_/gi, ",");
        return `
                  <span param="${param}" name="${name}">
                    ${changeName}
                  </span>
                `;
      },
      articleTemplate: fields => {
        const pageType = fields.metaData.pageType ? fields.metaData.pageType.replace(/\w*\s-\s/gm, "") : "";
        const marks = fields.metaData.marks;
        const date = fields.metaData.d;

        const cards = () => {
          if (marks) {
            let output = "";
            const arrayOfMarks = marks.split(";");
            arrayOfMarks.map(el => {
              output += `<div class="cards__flag-type">${el}</div>`;
            });
            return output;
          }
        };

        const cardNew = () => {
          // date = 2015-12-04
          if (date) {
            const storiesAssetCreated = date.replace(/-/g, ""),
                  globalDate = getDate();

            if (Number(globalDate) - Number(storiesAssetCreated) <= 15) {
              return '<div class="cards__flag-new">new </div>';
            }
          }
        }; // const aktDate = date.replace(/-/g, '');


        return `<div class="col-4 col-md-6 col-sm-12 col-lg-4">
                <div class="webinars-wrapper">
                    <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                        <div class="cards__flag-wrapper">
                        ${cards() || ""}
                        ${cardNew() || ""}
                    </div>
                        <!-- card image -->
                        <div class="cards__image-wrapper">
                            <div class="cards__image" style="
                                    background-image: url('${fields.metaData.image}');
                                "></div>
                        </div>
                        <div class="cards__content no-gutters flex-column justify-content-between">
                            <div>
                                <!-- card type - same as section header -->
                                <div class="type">${pageType}</div>
                                <!-- card title -->
                                <p class="title">
                                    ${fields.metaData.t}
                                </p>
                            </div>
                            <!-- link -->
                            <div class="cards__link">
                                <a class="primary-link" href="https://wood-search01.squiz.co.uk${fields.clickTrackingUrl}"> Read more </a>
                            </div>
                        </div>
                    </article>
                </div>
                </div>`;
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Search..."
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startRank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       **/
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return `<div>We're sorry, we couldn't find anything matching .                
                </div>`;
      }
    }
  });
  window.searchWebinarArchive.init();
}

/***/ }),

/***/ 8585:
/***/ (function() {

/* global Search, searchArchiveWebinarsDataRaw, searchArchiveWebinarsData */
if (document.querySelector(".fbjs-search--webinars-events-archive")) {
  window.searchArchiveWebinarsDataRaw = [];
  window.searchArchiveWebinarsMonth = [];
  window.searchArchiveWebinarsData = {
    aditionalInfo: {
      resetData: 1,
      displayYear: 0
    },
    webinars: {}
  };
}

const sortData = () => {
  const currentDate = new Date().toISOString().substring(0, 10).replace(/-/gi, ""); //const currentDate = '20190429';

  const currentYear = new Date().getFullYear();
  const Years = [currentYear];

  for (var i = 0; i < 100; i++) {
    Years.push(currentYear - (i + 1));
  }

  var exp = searchArchiveWebinarsDataRaw.filter(el => el.fbEndDate < currentDate);
  Years.map(el => {
    searchArchiveWebinarsData.webinars[el] = exp.filter(item => {
      if (item.eventYear == el) {
        searchArchiveWebinarsData.aditionalInfo.displayYear = 1;
        return true;
      } else {
        return false;
      }
    });
  });
};

const changeDate = dateToChange => {
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        splitedDate = dateToChange.split("-");
  return `${splitedDate[2]} ${monthArray[Number(splitedDate[1]) - 1]} ${splitedDate[0]}`;
};

const changeTwoDates = (firstDate, secondDate) => {
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        splitFirstDate = firstDate.split("-"),
        splitSecondDate = secondDate.split("-");
  return `${splitFirstDate[2]} - ${splitSecondDate[2]} ${monthArray[Number(splitFirstDate[1]) - 1]} ${splitFirstDate[0]}`;
};

const buildHtml = async () => {
  let output = '<div class="insights-webinars-events-listing__wrapper">';
  /**
   * @param eventURL
   * @param title
   * @param dateWrapper
   * @param eventImage
   * @param pageType
   * @param webinarSubheading
   * @param eventLocation
   * @param eventButtonText
   * @returns {string}
   **/

  const signleElementTemplate = (eventUrl, title, dateWrapper, eventImage, pageType, webinarSubheading, eventLocation) => `<div class="col-4 col-md-6 col-sm-12 col-lg-4">
    <div class="webinars-wrapper">
        <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
            <div class="cards__flag-wrapper">
                <div class="cards__flag-type">${dateWrapper}</div>
            </div>
            <div class="cards__image-wrapper">
                <div class="cards__image" style="
                        background-image: url(${eventImage});
                    "></div>
            </div>
            <div class="cards__content no-gutters flex-column justify-content-between">
                <div>
                    <div class="type">${pageType}</div>
                    <p class="title">${title}</p>
                    ${webinarSubheading}
                    ${eventLocation}
                </div>
                <div class="cards__links">
                <a href="https://wood-search01.squiz.co.uk${eventUrl}">Read more</a>
                </div>
            </div>
        </article>
    </div>
</div>`;
  /**
   *
   * @param {[]} array array with items
   * @param {string} heading
   * @returns  html
   */
  // const elementsWrapperTemplate = (array, heading) => {
  //     if (array.length) {
  //         let output = "";
  //         output += `<h5 class="webinars-header heading-mobile-centered">${heading}</h5><div class="cards cards-story"><div class="cards__wrapper col-mobile-centered results ">`;
  //         array.map((el) => {
  //             output += signleElementTemplate(
  //                 el.eventUrl,
  //                 el.title,
  //                 el.dateWrapper,
  //                 el.eventImage,
  //                 el.pageType,
  //                 el.webinarSubheading,
  //                 el.eventLocation,
  //                 el.eventButtonText
  //             );
  //         });
  //         output += `</div></div>`;
  //         return output;
  //     }
  // };


  await sortData();
  /**
   * display data
   */

  if (searchArchiveWebinarsData.aditionalInfo.displayYear) {
    const objKeys = Object.keys(searchArchiveWebinarsData.webinars);

    for (let i = 0; i < objKeys.length; i++) {
      if (searchArchiveWebinarsData.webinars[objKeys[i]].length) {
        output += `
                    <h5 class="webinars-header heading-mobile-centered">${objKeys[i]}</h5>
                    <div class="cards cards-story"><div class="cards__wrapper col-mobile-centered results">`;
        [...searchArchiveWebinarsData.webinars[objKeys[i]]].map(el => {
          output += signleElementTemplate(el.eventUrl, el.title, el.dateWrapper, el.eventImage, el.pageType, el.webinarSubheading, el.eventLocation, el.eventButtonText);
        });
        output += `</div></div>`;
      }
    }
  }

  output += "</div>"; //removing old output after raload data

  var contntWrapper = document.querySelector("insights-webinars-events-listing__wrapper");

  if (contntWrapper) {
    contntWrapper.parentNode.removeChild(contntWrapper);
  } //displaing output on front


  document.querySelector(".results-wrapper").innerHTML = output;
};

if (document.querySelector(".fbjs-search--webinars-events-archive")) {
  window.webinarsEventsArchive = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["wood-data"],
    additionalFBparams: {
      profile: "_default",
      "f.pageType|pageType": "event - webinar"
    },
    onFiltersUpdate: () => {
      buildHtml();
      searchArchiveWebinarsData.aditionalInfo.resetData = 1;
    },
    beforeSearch: () => {
      if (searchArchiveWebinarsData.aditionalInfo.resetData) {
        searchArchiveWebinarsDataRaw = [];
        searchArchiveWebinarsData.webinars = {};
        searchArchiveWebinarsData.aditionalInfo.resetData = 0;
        searchArchiveWebinarsData.aditionalInfo.displayYear = 0;
      }
    },
    results: {
      numRanks: 100
    },
    sort: {
      type: "metaeventYear"
    },
    activeFacets: {
      target: ".active-facets" // ... some other configuration fields

    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [//         "expertise - software",
        //         "expertise - sme profile",
        //         "expertise - product",
        //         "expertise - expertise",
        //         "key market"
      ],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": [],
      "f.geographies|geographies": []
    },
    pagination: {
      loadMore: false,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      activeFacet: (name, param) => {
        const changeName = name.replace(/_ampersand_/gi, "&").replace(/_comma_/gi, ",");
        return `
                  <span param="${param}" name="${name}">
                    ${changeName}
                  </span>
                `;
      },
      articleTemplate: fields => {
        const pageType = fields.metaData.pageType ? fields.metaData.pageType.replace(/\w*\s-\s/gm, "") : ""; // 2017-08-10 -> 10 Aug 2017
        // const eventStartDate = fields.metaData.eventStartDate;

        const eventEndDate = fields.metaData.eventEndDate;
        const eventYear = fields.metaData.eventYear;
        const fbEndDate = fields.metaData.fbEndDate;
        const eventImage = fields.metaData.eventImage || fields.metaData.webinarImage;
        const title = fields.metaData.t;
        const eventLocation = fields.metaData.eventLocation ? `<div class="location-title">Location</div><p class="location">${fields.metaData.eventLocation}</p>` : "";
        const eventButtonText = fields.metaData.eventMoreInfoTitle || fields.metaData.webinarCTAText;
        const eventUrl = fields.clickTrackingUrl;
        const webinarSubheading = fields.metaData.webinarSubheading ? `<p>${fields.metaData.webinarSubheading}</p>` : ``;
        let dateWrapper = "";

        if (fields.metaData.eventStartDate === fields.metaData.eventEndDate) {
          dateWrapper = changeDate(fields.metaData.eventStartDate);
        } else {
          dateWrapper = `${changeTwoDates(fields.metaData.eventStartDate, fields.metaData.eventEndDate)}`;
        }

        searchArchiveWebinarsDataRaw.push({
          title: title,
          pageType: pageType,
          eventUrl: eventUrl,
          dateWrapper: dateWrapper,
          eventImage: eventImage,
          webinarSubheading: webinarSubheading,
          eventLocation: eventLocation,
          eventEndDate: eventEndDate,
          eventButtonText: eventButtonText,
          eventYear: eventYear,
          fbEndDate: fbEndDate
        });
        return "";
        /*return `<div class="col-4 col-md-6 col-sm-12 col-lg-4">
            <div class="webinars-wrapper">
                <article class="cards__card row no-gutters flex-column justify-content-between flex-wrap">
                    <div class="cards__flag-wrapper">
                        <div class="cards__flag-type">${dateWrapper}</div>
                    </div>
                    <div class="cards__image-wrapper">
                        <div class="cards__image" style="
                                background-image: url(${eventImage});
                            "></div>
                    </div>
                    <div class="cards__content no-gutters flex-column justify-content-between">
                        <div>
                            <div class="type">${pageType}</div>
                            <p class="title">${title}</p>
                            ${webinarSubheading}
                            ${eventLocation}
                        </div>
                        <div class="cards__links">
                            <a class="primary-link" href="${eventUrl}">${eventButtonText}</a>
                        </div>
                    </div>
                </article>
            </div>
        </div>`*/
      },

      /**
       * @name informationTemplate
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       **/
      informationTemplate: () => {
        return "";
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Webinars search"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                `;
      },

      /**
       * @name paginationNumberTemplate
       * @param number
       * @param startrank
       * @returns {string}
       **/
      paginationNumberTemplate: () => {
        return ''; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @name activePaginationNumberTemplate
       * @param number
       * @returns {string}
       **/
      activePaginationNumberTemplate: () => {
        return ''; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @name paginationTemplate
       * @param pages
       * @returns {string}
       **/
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @name loadMoreTemplate
       * @param fields
       * @returns {string}
       **/
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        //{name, label}, activeFacets
        // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @name noResults
       * @param query
       * @param spell
       * @returns {string}
       **/
      noResults: () => {
        // let spellSuggestion = "";
        // if (spell.text) {
        //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
        // }
        return "<div>We're sorry, we couldn't find anything matching .</div>";
      }
    }
  });
  window.webinarsEventsArchive.init();
}

/***/ }),

/***/ 8124:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7207);
/* harmony import */ var core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_0__);


/* global Search, searchWebinarsDataRaw, searchWebinarsData */
// Loading more in archived webinars is custom.
if (document.querySelector(".fbjs-search--webinars-events")) {
  window.x = []; // for debug funnelback data

  window.searchWebinarsDataRaw = [];
  window.searchWebinarsData = {
    aditionalInfo: {
      resetData: 1,
      displayArchived: 18
    },
    webinars: {}
  };
}

let hasActiveFilters;
window.hasResults = false;

const sortData = () => {
  window.searchWebinarsDataRaw.length ? window.hasResults = true : window.hasResults = false;
  let currentDate = new Date();
  var date = currentDate.getTime();
  searchWebinarsData.webinars.upcoming = searchWebinarsDataRaw.filter(el => {
    if (el.eventEndDate && el.eventStartDate) {
      var _el$eventStartDate, _el$eventStartDate2, _el$eventStartDate3, _el$eventStartDate4, _el$eventEndDate, _el$eventEndDate2, _el$eventEndDate3, _el$eventEndDate4;

      const startYear = (_el$eventStartDate = el.eventStartDate) === null || _el$eventStartDate === void 0 ? void 0 : _el$eventStartDate.slice(0, 4);
      const startMonth = (_el$eventStartDate2 = el.eventStartDate) === null || _el$eventStartDate2 === void 0 ? void 0 : _el$eventStartDate2.slice(4, 6);
      const startDay = (_el$eventStartDate3 = el.eventStartDate) === null || _el$eventStartDate3 === void 0 ? void 0 : _el$eventStartDate3.slice(6, 8);
      const startHr = (_el$eventStartDate4 = el.eventStartDate) === null || _el$eventStartDate4 === void 0 ? void 0 : _el$eventStartDate4.slice(9, 11);
      const year = (_el$eventEndDate = el.eventEndDate) === null || _el$eventEndDate === void 0 ? void 0 : _el$eventEndDate.slice(0, 4);
      const month = (_el$eventEndDate2 = el.eventEndDate) === null || _el$eventEndDate2 === void 0 ? void 0 : _el$eventEndDate2.slice(4, 6);
      const day = (_el$eventEndDate3 = el.eventEndDate) === null || _el$eventEndDate3 === void 0 ? void 0 : _el$eventEndDate3.slice(6, 8);
      const hour = (_el$eventEndDate4 = el.eventEndDate) === null || _el$eventEndDate4 === void 0 ? void 0 : _el$eventEndDate4.slice(9, 11);
      const eventSortedDate = `${year}-${month}-${day}${hour ? ' ' + hour + ':00:00' : ''}`;
      const eventStartDateString = `${startYear}-${startMonth}-${startDay}${startHr ? " " + startHr + ":00:00" : ""}`;
      const eventStartDateObj = new Date(eventStartDateString);
      const eventDateObj = new Date(eventSortedDate);
      const eventDate = eventDateObj.getTime();
      const eventStartDate = eventStartDateObj.getTime();

      if (eventStartDate < eventDate) {
        return eventDate >= date;
      } else {
        return eventStartDate >= date;
      }
    }
  });
  searchWebinarsData.webinars.archived = searchWebinarsDataRaw.filter(el => {
    if (el.eventEndDate) {
      var _el$eventEndDate5, _el$eventEndDate6, _el$eventEndDate7;

      const year = (_el$eventEndDate5 = el.eventEndDate) === null || _el$eventEndDate5 === void 0 ? void 0 : _el$eventEndDate5.slice(0, 4);
      const month = (_el$eventEndDate6 = el.eventEndDate) === null || _el$eventEndDate6 === void 0 ? void 0 : _el$eventEndDate6.slice(4, 6);
      const day = (_el$eventEndDate7 = el.eventEndDate) === null || _el$eventEndDate7 === void 0 ? void 0 : _el$eventEndDate7.slice(6, 8);
      const eventSorteddate = `${year}-${month}-${day}`;
      const eventDateObj = new Date(eventSorteddate);
      const eventDate = eventDateObj.getTime();
      return eventDate < date && el.pageType == "Webinar";
    }
  });
};

const buildHtml = async () => {
  var _searchWebinarsData, _searchWebinarsData$w, _searchWebinarsData$w2;

  let output = '<div class="insights-webinars-events-listing__wrapper">';

  const signleElementTemplate = (eventUrl, title, eventImage, pageType, itemSubheading, eventStartDate, // webinarSubheading,
  // eventSubheading,
  eventLocation, eventButtonText, eventExternalUrl, content, keyMarketEnergy, eventYear, webinarTime, keywords, dateWrapper, eventMonth = null, description, currentDate = new Date()) => `<div class="col-4 col-md-6 col-sm-12 col-lg-4"><a href="${eventExternalUrl ? eventExternalUrl : `https://wood-search01.squiz.co.uk${eventUrl}`}" class="webinars-wrapper--link">
    <div class="webinars-wrapper ${pageType !== "Webinar" ? "event-wrapper" : ""}">
        <article class="cards__card row no-gutters flex-column">
            ${eventMonth !== null ? `<div class="cards__flag-wrapper">
                            <div class="cards__flag-upcoming">
                                <span> ${eventMonth}</span> ${dateWrapper}
                            </div>
                        </div>` : ``}
            <div class="cards__image-wrapper">
                <div class="cards__image" style="
                        background-image: url(${eventImage});
                    "></div>
            </div>
            <div class="cards__content no-gutters flex-column">
                <div class="cards__flags">
                ${pageType ? `<div class="cards__flag-webinar">${pageType}</div>` : ``}
                ${pageType === "Webinar" ? ` <div class="cards__flag-time">${webinarTime ? webinarTime + "min" : "60min"}</div>` : webinarTime ? `<div class="cards__flag-time">
                ${webinarTime}
            </div>` : ""}
                ${pageType == "Webinar" && new Date(eventStartDate).getTime() < currentDate.getTime() ? `<div class="cards__flag-time">${eventYear}</div>` : ``}
                ${pageType == "Webinar" ? `<div class="cards__flag-type">Video</div>` : ``}
                ${eventLocation ? `<div class="cards__flag-time">${eventLocation}</div>` : ``}
                </div>
                <div>
                <p class="category">${pageType}</p>
                    <p class="title truncate-lines-2"">${title}
                    </p>
                </div>
                 ${itemSubheading ? itemSubheading : ""}
                ${description ? `<p class="description truncate-lines-2">${description}</p>` : ``}
                ${keywords ? `<div class="tags">${keywords}</div>` : ``}
                </div>
                <div class="cards__links">
                    <p class="primary-link" >
                        ${pageType == "Webinar" ? eventButtonText || "Watch now" : eventButtonText || "Register now"}
                    </p>
                </div>
        </article>
    </div>
</a></div>`;
  /**
   *
   * @param {[]} array array with items
   * @param {string} heading
   * @returns  html
   */


  await sortData();
  /**
   * display data
   */

  if ((_searchWebinarsData = searchWebinarsData) !== null && _searchWebinarsData !== void 0 && (_searchWebinarsData$w = _searchWebinarsData.webinars) !== null && _searchWebinarsData$w !== void 0 && (_searchWebinarsData$w2 = _searchWebinarsData$w.upcoming) !== null && _searchWebinarsData$w2 !== void 0 && _searchWebinarsData$w2.length) {
    output += `<h5 class="webinars-header">Upcoming events</h5>
            <div class="cards cards-story upcoming"><div class="cards__wrapper results">`;
    searchWebinarsData.webinars.upcoming.map(el => {
      output += signleElementTemplate(el.eventUrl, el.title, el.eventImage, el.pageType, el.itemSubheading, el.eventStartDate, // el.webinarSubheading,
      // el.eventSubheading,
      el.eventLocation, el.eventButtonText, el.eventExternalUrl, el.content, el.keyMarketEnergy, el.eventYear, el.webinarTime, el.keywords, el.dateWrapper, el.eventMonth, el.description);
    });
    output += `</div></div>`;
  } else if (window.hasResults) {
    let facetCount = document.querySelector(".active-facets").childElementCount;
    let url = window.location.href;

    if (facetCount) {
      output += `
        <h5 class="webinars-header">Upcoming events</h5>
        <p>There are no upcoming events matching your filter criteria.</p>`;
    } else if (url.includes("?")) {
      output += `
        <h5 class="webinars-header">Upcoming events</h5>
        <p>There are no upcoming events at this time.</p>`;
    }
  } else {
    output += `<p>Loading...</p>`;
  }

  if (searchWebinarsData.webinars.archived.length) {
    output += `<h5 class="webinars-header" id="webinars">Webinar library</h5><div class="cards cards-story webinars-library"><div class="cards__wrapper results">`;
    searchWebinarsData.webinars.archived.slice(0, searchWebinarsData.aditionalInfo.displayArchived).map(el => {
      output += signleElementTemplate(el.eventUrl, el.title, el.eventImage, el.pageType, el.itemSubheading, el.eventStartDate, el.eventLocation, el.eventButtonText, el.eventExternalUrl, el.content, el.keyMarketEnergy, el.eventYear, el.webinarTime, el.keywords, el.dateWrapper, el.eventMonth, el.description);
    });
    output += `</div></div>`;
  }

  if (searchWebinarsData.aditionalInfo.displayArchived < searchWebinarsData.webinars.archived.length) {
    output += `<div class="landing-page__button-wrapper"><button id="load-more-archived-events" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>`;
  }

  output += "</div>"; //removing old output after raload data

  var contntWrapper = document.querySelector("insights-webinars-events-listing__wrapper");

  if (contntWrapper) {
    contntWrapper.parentNode.removeChild(contntWrapper);
  } //displaing output on front


  document.querySelector(".results-wrapper").innerHTML = output;
  const loadMoreButton = document.getElementById("load-more-archived-events");

  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      searchWebinarsData.aditionalInfo.displayArchived += 18;
      buildHtml();
    });
  }
};

if (document.querySelector(".fbjs-search--webinars-events")) {
  window.webinarsEvents = new Search.default({
    url: "https://wood-search01.squiz.co.uk/s/search.json",
    collections: ["push-wood-data"],
    additionalFBparams: {
      profile: "_default",
      gscope1: "webinarsAndEvents" //we cant use it
      //// 'f.pageType|pageType': 'event+-+virtual+event',
      //  'f.pageType|pageType': 'event+-+physical+event',
      //  'f.pageType%7CpageType': 'event+-+webinar'

    },
    onFiltersUpdate: () => {
      var _window$searchArticle, _window$searchArticle2;

      buildHtml();
      searchWebinarsData.aditionalInfo.resetData = 1;
      const activeFilters = (_window$searchArticle = window.searchArticles) === null || _window$searchArticle === void 0 ? void 0 : (_window$searchArticle2 = _window$searchArticle.search) === null || _window$searchArticle2 === void 0 ? void 0 : _window$searchArticle2.activeFacets;

      for (const entry in activeFilters) {
        if (activeFilters[entry].value !== []) {
          hasActiveFilters = true;
          return hasActiveFilters;
        }
      }
    },
    beforeSearch: () => {
      if (searchWebinarsData.aditionalInfo.resetData) {
        searchWebinarsDataRaw = [];
        searchWebinarsData.webinars = {
          upcoming: [],
          archived: []
        };
        searchWebinarsData.aditionalInfo.resetData = 0;
        searchWebinarsData.aditionalInfo.displayArchived = 18;
      }
    },
    results: {
      numRanks: 300
    },
    sort: {
      type: "dmetad"
    },
    activeFacets: {
      target: ".active-facets" // ... some other configuration fields

    },
    activeFacetsOnStart: {
      "f.pageType|pageType": [//         "expertise - software",
        //         "expertise - sme profile",
        //         "expertise - product",
        //         "expertise - expertise",
        //         "key market"
      ],
      "f.keyMarketEnergy|keyMarketEnergy": [],
      "f.keyMarketEnvironment|keyMarketEnvironment": [],
      "f.geographies|geographies": []
    },
    pagination: {
      loadMore: false,
      arrows: false,
      arrowsOnEdgePages: false,
      dots: false,
      edgePages: false,
      pages: 0
    },
    templates: {
      activeFacet: (name, param) => {
        const changeName = name.replace(/_ampersand_/gi, "&").replace(/_comma_/gi, ",");
        return `
                  <span param="${param}" name="${name}">
                    ${changeName}
                  </span>
                `;
      },
      articleTemplate: fields => {
        const pageType = fields.metaData.pageType ? fields.metaData.pageType.replace(/\w*\s-\s/gm, "") : ""; // 2017-08-10 -> 10 Aug 2017

        const changeDate = dateToChange => {
          const splitedDate = dateToChange.split("-");
          return `${splitedDate[2]}`;
        };

        const changeTwoDates = (firstDate, secondDate) => {
          const splitFirstDate = firstDate.split("-"),
                splitSecondDate = secondDate.split("-");
          return `${splitFirstDate[2]} - ${splitSecondDate[2]}`;
        };

        const eventEndDate = fields.metaData.ewDateEnd;
        const eventStartDate = fields.metaData.ewDateStart;
        const eventEndDateCorrect = `${eventEndDate === null || eventEndDate === void 0 ? void 0 : eventEndDate.slice(0, 4)}-${eventEndDate === null || eventEndDate === void 0 ? void 0 : eventEndDate.slice(4, 6)}-${eventEndDate === null || eventEndDate === void 0 ? void 0 : eventEndDate.slice(6, 8)}`;
        const eventStartDateCorrect = `${eventStartDate === null || eventStartDate === void 0 ? void 0 : eventStartDate.slice(0, 4)}-${eventStartDate === null || eventStartDate === void 0 ? void 0 : eventStartDate.slice(4, 6)}-${eventStartDate === null || eventStartDate === void 0 ? void 0 : eventStartDate.slice(6, 8)}`;
        const eventMonth = fields.metaData.eventMonth;
        const eventImage = fields.metaData.image;
        const title = fields.metaData.t;
        const eventLocation = fields.metaData.ewLocation;
        const eventButtonText = fields.metaData.ewCTAAlternativeText;
        const eventUrl = fields.clickTrackingUrl;
        const eventExternalUrl = fields.metaData.ewCTALinkExternal;
        const eventYear = fields.metaData.d.slice(0, 4);
        const webinarTime = fields.metaData.ewDuration;
        const keywords = fields.metaData.ewTopicTags ? fields.metaData.ewTopicTags.replaceAll(";", " | ") : "";
        const itemSubheading = fields.metaData.ewSubtitle ? `<p class="description subheading truncate-lines-2">${fields.metaData.ewSubtitle}</p>` : ``;
        const content = fields.metaData.content;
        const keyMarketEnergy = fields.metaData.keyMarketEnergy;
        const description = fields.metaData.ewDescription;
        let dateWrapper = "";

        if (eventStartDateCorrect === eventEndDateCorrect || eventEndDateCorrect === undefined || eventEndDateCorrect === '2022-01-01') {
          dateWrapper = eventStartDateCorrect && changeDate(eventStartDateCorrect);
        } else {
          dateWrapper = `${changeTwoDates(eventStartDateCorrect, eventEndDateCorrect)}`;
        }

        searchWebinarsDataRaw.push({
          title: title,
          pageType: pageType,
          eventUrl: eventUrl,
          eventImage: eventImage,
          itemSubheading: itemSubheading,
          // webinarSubheading: webinarSubheading,
          // eventSubheading: eventSubheading,
          eventLocation: eventLocation,
          eventStartDate: eventStartDate,
          eventEndDate: eventEndDate,
          eventButtonText: eventButtonText,
          eventExternalUrl: eventExternalUrl,
          content: content,
          keyMarketEnergy: keyMarketEnergy,
          eventYear: eventYear,
          webinarTime: webinarTime,
          keywords: keywords,
          dateWrapper: dateWrapper,
          eventMonth: eventMonth,
          description: description
        });
        return ``;
      },

      /**
       * @param fields
       * @param resultsSummary
       * @param h
       * @returns {string}
       */
      informationTemplate: () => {
        buildHtml();
        return ``;
      },
      formTemplate: (search, query, inputId) => {
        query == "!nullsearch" ? query = "" : null;
        return `
                <div class="search-field">
                    <form class="search__form" role="search" action="/search" method="get">
                        <label for="${inputId}" class="sr-only">Search site</label>
                        <input
                            id="${inputId}"
                            type="text"
                            class="search__form-input search-custom"
                            placeholder="Search webinars & events"
                            autocomplete="off"
                            role="searchbox"
                            aria-label="Search"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            maxlength="1000"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            value="${query}">
                        <button type="submit" name="site-search-submit" id="site-search-submit" class="search__submit">
                            <i class="search__submit-icon" aria-hidden="true"></i>
                            <span class="sr-only">Do search</span>
                        </button>
                        <div class="fb-search-wrapper"></div>
                    </form>
                </div>
                `;
      },

      /**
       * @param number
       * @param startrank
       * @returns {string}
       */
      paginationNumberTemplate: () => {
        return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
      },

      /**
       * @param number
       * @returns {string}
       */
      activePaginationNumberTemplate: () => {
        return ""; //<li class="search__active-page hidden">${number}</li>
      },

      /**
       * @param pages
       * @returns {string}
       */
      paginationTemplate: pages => {
        return `<div class="search__pagination">${pages}</div>`;
      },

      /**
       * @param fields
       * @returns {string}
       */
      loadMoreTemplate: () => {
        return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
      },
      facetCheckbox: ({
        categories,
        singleChoice
      }, activeFacets, h) => {
        let list = "";
        list += '<li class="search__facet-item search__facet-item--all"></li>';
        categories[0].values.forEach(item => {
          if (item.label !== "other") {
            list += `<li class="search__facet-item">
                                <label class="search__facet-label">
                                    <input
                                    class="search__facet-input"
                                    type="checkbox"
                                    ${item.checked}
                                    value="${item.data}"
                                    name="${item.label}"
                                    data-fparam="${h.queryStringParamName}"
                                    data-singlechoice="${singleChoice}"
                                    />
                                    <span class="search__facet-span">${item.label}</span>
                                </label>
                                </li>`;
          }
        });
        return `<div class="checkbox-facet">
                        <ul class="search__facets">
                        ${list}
                        </ul>
                    </div>`;
      },

      /**
       * @param query
       * @param spell
       * @returns {string}
       */
      noResults: () => {
        if (hasActiveFilters) {
          return `<div>There are no results matching your filter criteria</div>`;
        } else {
          return `<div>We're sorry, we couldn't find anything matching</div>`;
        }
      }
    }
  });
  window.webinarsEvents.init();

  const observerFunc = () => {
    const articles = document.querySelectorAll("article");
    articles.forEach(article => {
      article.addEventListener("pointerenter", e => {
        e.target.classList.add("has-hover");
      });
      article.addEventListener("pointerleave", e => {
        e.target.classList.remove("has-hover");
      });
    });
  };

  const observerTarget = document.querySelector(".fbjs-search--webinars-events");
  const observer = new MutationObserver(observerFunc);
  const observerConfig = {
    subtree: true,
    childList: true
  };
  observer.observe(observerTarget, observerConfig);
}

/***/ }),

/***/ 3497:
/***/ (function() {

// /* global Search */
// if (document.querySelector(".fbjs-search--webinars-events")) {
//     window.searchWebinarArchive = new Search.default({
//         url: "https://wood-search01.squiz.co.uk/s/search.json",
//         collections: ["wood-data"],
//         additionalFBparams: {
//             profile: "_default",
//             "f.pageType|pageType": "event - webinar",
//         },
//         onFiltersUpdate: () => {},
//         beforeSearch: () => {},
//         results: {
//             numRanks: 18,
//         },
//         activeFacetsOnStart: {
//             "f.pageType|pageType": [],
//             "f.keyMarketEnergy|keyMarketEnergy": [],
//             "f.keyMarketEnvironment|keyMarketEnvironment": [],
//         },
//         sort: {
//             type: "date",
//         },
//         pagination: {
//             loadMore: true,
//             arrows: false,
//             arrowsOnEdgePages: false,
//             dots: false,
//             edgePages: false,
//             pages: 0,
//         },
//         templates: {
//             activeFacet: (name, param) => {
//                 const changeName = name
//                     .replace(/_ampersand_/gi, "&")
//                     .replace(/_comma_/gi, ",");
//                 return `
//                   <span param="${param}" name="${name}">
//                     ${changeName}
//                   </span>
//                 `;
//             },
//             articleTemplate: (fields) => {
//                 console.log(fields.metaData);
//                 const changeDate = () => {
//                     const monthArray = [
//                             "Jan",
//                             "Feb",
//                             "Mar",
//                             "Apr",
//                             "May",
//                             "Jun",
//                             "Jul",
//                             "Aug",
//                             "Sep",
//                             "Oct",
//                             "Nov",
//                             "Dec",
//                         ],
//                         // dateFromFunnelback = fields.metaData.d, // 2017-08-10
//                         splitedDate = fields.metaData.d.split("-");
//                     return ` <span>${
//                         monthArray[Number(splitedDate[1]) - 1]
//                     }</span>${splitedDate[2]}`;
//                 };
//                 const displayYear = () => {
//                     const splitedDate = fields.metaData.webinarDate.slice(0, 4);
//                     return `${splitedDate || ""}`;
//                 };
//                 const splitTags = () => {
//                     const keywords = fields?.metaData?.keywords || "";
//                     const tags = keywords.split(";");
//                     return ` ${tags}`;
//                 };
//                 //Displaying only type of event:
//                     //   Event - Physical event	
//                     //   Event - Virtual event	
//                     //   Event - Webinar
//                 const displayType = () => {
//                     const keywords = fields?.metaData.pageType || "";
//                     const tags = keywords.slice(7, keywords.length );
//                     return ` ${tags}`;
//                 };
//                 // console.log(fields.metaData);
//                 // console.log(fields);
//                 return `<div class="col-4 col-md-6 col-sm-12 col-lg-4">
//                 <div class="webinars-wrapper">
//                     <article class="cards__card row no-gutters flex-column  ">
//                         <div class="cards__flag-wrapper">
//                             <div class="cards__flag-upcoming">${changeDate()}</div>
//                         </div>
//                         <div class="cards__image-wrapper">
//                             <div class="cards__image" style="
//                                     background-image: url('${
//                                         fields.metaData.image
//                                     }');
//                                 "></div>
//                         </div>
//                         <div class="cards__content no-gutters flex-column ">
//                             <div>
//                                 <div class="cards__flags">
//                                     <div class="cards__flag-webinar">${displayType()}</div>
//                                     <div class="cards__flag-time">${
//                                         fields.metaData.webinarTime || ""
//                                     }</div>
//                                     <div class="cards__flag-type">${
//                                         fields.metaData.webinarType || ""
//                                     }</div>
//                                     <div class="cards__flag-time">${displayYear()}</div>
//                                 </div>
//                                 <p class="title truncate-lines-2"">
//                                 ${fields.metaData.t}
//                             </p>
//                                 <p class="description truncate-lines-2">
//                                     ${fields?.metaData?.description || ""}
//                                 </p>
//                                 <div class="tags"> 
//                                     ${splitTags().split(",").join(" | ") || ""}
//                                 </div>
//                             </div>
//                             </div>
//                             <div class="cards__links">
//                             <a class="primary-link" href="https://wood-search01.squiz.co.uk${
//                                 fields.clickTrackingUrl
//                             }">Register now</a>
//                             </div>
//                     </article>
//                 </div>
//             </div>`;
//             },
//             /**
//              * @name informationTemplate
//              * @param fields
//              * @param resultsSummary
//              * @param h
//              * @returns {string}
//              **/
//             informationTemplate: () => {
//                 return "";
//             },
//             /**
//              * @name paginationNumberTemplate
//              * @param number
//              * @param startRank
//              * @returns {string}
//              **/
//             paginationNumberTemplate: () => {
//                 return ""; //<li class="hidden" data-startrank=${startrank} tabindex="0" >${number}</li>
//             },
//             /**
//              * @name activePaginationNumberTemplate
//              * @param number
//              * @returns {string}
//              **/
//             activePaginationNumberTemplate: () => {
//                 return ""; //<li class="search__active-page hidden">${number}</li>
//             },
//             /**
//              * @name paginationTemplate
//              * @param pages
//              * @returns {string}
//              **/
//             paginationTemplate: (pages) => {
//                 return `<div class="search__pagination">${pages}</div>`;
//             },
//             /**
//              * @name loadMoreTemplate
//              * @param fields
//              * @returns {string}
//              **/
//             loadMoreTemplate: () => {
//                 return '<div class="landing-page__button-wrapper"><button id="search-loadmore" type="button" title="Load more results" class="btn btn--secondary">Load more</button></div>';
//             },
//             facetCheckbox: ({ categories, singleChoice }, activeFacets, h) => {
//                 //{name, label}, activeFacets
//                 // const header = label ? `<div>${label}</div>` : `<div>${name}</div>`;
//                 let list = "";
//                 list +=
//                     '<li class="search__facet-item search__facet-item--all"></li>';
//                 categories[0].values.forEach((item) => {
//                     if (item.label !== "other") {
//                         list += `<li class="search__facet-item">
//                                 <label class="search__facet-label">
//                                     <input
//                                     class="search__facet-input"
//                                     type="checkbox"
//                                     ${item.checked}
//                                     value="${item.data}"
//                                     name="${item.label}"
//                                     data-fparam="${h.queryStringParamName}"
//                                     data-singlechoice="${singleChoice}"
//                                     />
//                                     <span class="search__facet-span">${item.label}</span>
//                                 </label>
//                                 </li>`;
//                     }
//                 });
//                 return `<div class="checkbox-facet">
//                         <ul class="search__facets">
//                         ${list}
//                         </ul>
//                     </div>`;
//             },
//             /**
//              * @name noResults
//              * @param query
//              * @param spell
//              * @returns {string}
//              **/
//             noResults: () => {
//                 // let spellSuggestion = "";
//                 // if (spell.text) {
//                 //     spellSuggestion = `<div>Did you mean: <a href="?${spell.url}">${spell.text}</a>?</div>`;
//                 // }
//                 return `<div>We're sorry, we couldn't find anything matching .                
//                     <div class="c-submenu-checkbox-filter">
//                     <ul>
//                         <li>
//                             <input type="checkbox" name="webinar-archive_0" id="webinar-archive_0" value="0" class="sq-form-field fbjs-facet-switcher" data-facet-query-string-param-name="f.pageType|pageType" data-facet-selected-category-values="Insight - Spotlight,Insight - Report,Insight - Viewpoint,Insight - Podcast,Insight - Article,Insight - Blog,Insight - Infographic,Insight - Immersive story,News - Article,News - Press release" data-fbjs-variable-name="searchWebinarArchive">
//                             <label for="webinar-archive_0">Insights and news</label>
//                         </li>
//                     </ul>
//                 </div>
//                 </div>`;
//             },
//         },
//     });
//     window.searchWebinarArchive.init();
// }

/***/ }),

/***/ 9108:
/***/ (function() {

// $(function () {
//     if ($('.filter-trigger').length > 0) {
//         $('.filter-trigger').on('click', function (e) {
//             e.preventDefault();
//             var $this = $(this)
//             $this.toggleClass('chevron_close chevron_open')
//             var $list = $this.next()
//             $list.slideToggle()
//             var $message = $('#filter-message');
//             $message.fadeToggle(300, 'swing');
//         })
//         $('input.form-check-input').change(function () {
//             if ($('input.form-check-input').is(':checked')) {
//                 $('#filter-message').html('filter(s) selected. this may limit results')
//             } else {
//                 $('#filter-message').html(' ');
//             }
//         })
//     }
//     //get user location
//     var $locationButton = $('#form_location_button');
//     if ($locationButton.length) {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(showPosition, showError, {timeout: 10000, maximumAge: 0} );
//         } else {
//             console.log("Geolocation is not supported by this browser.");
//             $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Location not supported');
//         }
//         $locationButton.on('click', function (e) {
//             e.preventDefault();
//             if (($('#form_location [name="origin"]').val() === '') || $locationButton.hasClass('disabled') ) {
//                 console.log('Accessing location information');
//                 return
//             }  else {
//                 $('#form_location').submit();
//             }
//         })
//     }
//     function showPosition(position) {
//         var localCoord = position.coords.latitude + "," + position.coords.longitude;
//         $('#form_location [name="origin"]').val(localCoord);
//         $('#form_location_button').removeClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Find my nearest office');
//     }
//     function showError(error) {
//         switch (error.code) {
//             case error.PERMISSION_DENIED:
//                 $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Blocked by user');
//                 break;
//             case error.POSITION_UNAVAILABLE:
//                 $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Location unavailable');
//                 break;
//             case error.TIMEOUT:
//                 $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Location Timed out');
//                 break;
//             case error.UNKNOWN_ERROR:
//                 $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Unknown error');
//                 break;
//         }
//     }
//     //get coordinates of city
//     var $dropdownForm = $('#form_dropdown_select');
//     if ($dropdownForm.length) {
//         $dropdownForm.on('change', function (e) {
//             e.preventDefault();
//             var selection = this.value;
//             if (selection === 'null') {
//                 return
//             }
//             // getLatLng(selection);
//             $('#form_dropdown [name="query"]').val(selection);
//             $('#form_dropdown').submit();
//         });
//     }
//     function getLatLng(city) {
//         var address = city;
//         var geocoder = new google.maps.Geocoder();
//         geocoder.geocode({
//             'address': address
//         }, function (results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 console.log(results[0])
//                 var Lat = results[0].geometry.location.lat();
//                 var Lng = results[0].geometry.location.lng();
//                 var one = results[0].geometry.bounds.getNorthEast().lat();
//                 var two = results[0].geometry.bounds.getNorthEast().lng();
//                 var three = results[0].geometry.bounds.getSouthWest().lat();
//                 var four = results[0].geometry.bounds.getSouthWest().lng();
//                 var returnValue = Lat + ',' + Lng;
//                 var radius = getDistanceFromLatLonInKm(one,two,three,four);
//             } else {
//                 var returnValue = "57.1425543,-2.1122146";
//                 var radius = "1000"
//             }
//             if (returnValue) {
//                 $('#form_dropdown [name="origin"]').val(returnValue);
//                 $('#form_dropdown [name="maxdist"]').val(radius);
//                 $('#form_dropdown').submit();
//             }
//         });
//     }
//     //get size of country
//     function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//         var R = 6371; // Radius of the earth in km
//         var dLat = deg2rad(lat2-lat1);  // deg2rad below
//         var dLon = deg2rad(lon2-lon1);
//         var a =
//             Math.sin(dLat/2) * Math.sin(dLat/2) +
//             Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//             Math.sin(dLon/2) * Math.sin(dLon/2)
//         ;
//         var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//         var d = R * c; // Distance in km
//         d = d / 2;
//         return d;
//     }
//     function deg2rad(deg) {
//         return deg * (Math.PI/180)
//     }
// });
// var zipcodeForm = document.querySelector('#form_zipcode');
// zipcodeForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     var zipcodeQuery = document.querySelector('#query_zipcode');
//     var value = zipcodeQuery.value;
//     var query = value.split(" ").join("-");
//     window.location.href = '?query=' + query
// })

/***/ }),

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 6916:
/***/ (function(module) {

var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module) {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);

module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 647:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 7850:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var classof = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var global = __webpack_require__(7854);
var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 1320:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var setGlobal = __webpack_require__(3505);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 7066:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 282:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 3505:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var setGlobal = __webpack_require__(3505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(282);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var requireObjectCoercible = __webpack_require__(282);

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var classof = __webpack_require__(648);

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 8757:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(282);
var isCallable = __webpack_require__(614);
var isRegExp = __webpack_require__(7850);
var toString = __webpack_require__(1340);
var getMethod = __webpack_require__(8173);
var regExpFlags = __webpack_require__(7066);
var getSubstitution = __webpack_require__(647);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var REPLACE = wellKnownSymbol('replace');
var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;
var getFlags = uncurryThis(regExpFlags);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var max = Math.max;

var stringIndexOf = function (string, searchValue, fromIndex) {
  if (fromIndex > string.length) return -1;
  if (searchValue === '') return fromIndex;
  return indexOf(string, searchValue, fromIndex);
};

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (searchValue != null) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString(requireObjectCoercible('flags' in RegExpPrototype
          ? searchValue.flags
          : getFlags(searchValue)
        ));
        if (!~indexOf(flags, 'g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod(searchValue, REPLACE);
      if (replacer) {
        return call(replacer, searchValue, O, replaceValue);
      } else if (IS_PURE && IS_REG_EXP) {
        return replace(toString(O), searchValue, replaceValue);
      }
    }
    string = toString(O);
    searchString = toString(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = stringIndexOf(string, searchString, 0);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }
    return result;
  }
});


/***/ }),

/***/ 7207:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(8757);


/***/ }),

/***/ 3711:
/***/ (function() {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}


/***/ }),

/***/ 9060:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * custom-select
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * A lightweight JS script for custom select creation.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Needs no dependencies.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * v0.0.1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (https://github.com/custom-select/custom-select)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright (c) 2016 Gionatan Lombardi & Marco Nucara
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * MIT License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

exports.Z = customSelect;

__webpack_require__(3711);

var defaultParams = {
  containerClass: 'custom-select-container',
  openerClass: 'custom-select-opener',
  panelClass: 'custom-select-panel',
  optionClass: 'custom-select-option',
  optgroupClass: 'custom-select-optgroup',
  isSelectedClass: 'is-selected',
  hasFocusClass: 'has-focus',
  isDisabledClass: 'is-disabled',
  isOpenClass: 'is-open'
};

function builder(el, builderParams) {
  var containerClass = 'customSelect';
  var isOpen = false;
  var uId = '';
  var select = el;
  var container = void 0;
  var opener = void 0;
  var focusedElement = void 0;
  var selectedElement = void 0;
  var panel = void 0;
  var currLabel = void 0;

  var resetSearchTimeout = void 0;
  var searchKey = '';

  //
  // Inner Functions
  //

  // Sets the focused element with the neccessary classes substitutions
  function setFocusedElement(cstOption) {
    if (focusedElement) {
      focusedElement.classList.remove(builderParams.hasFocusClass);
    }
    if (typeof cstOption !== 'undefined') {
      focusedElement = cstOption;
      focusedElement.classList.add(builderParams.hasFocusClass);
      // Offset update: checks if the focused element is in the visible part of the panelClass
      // if not dispatches a custom event
      if (isOpen) {
        if (cstOption.offsetTop < cstOption.offsetParent.scrollTop || cstOption.offsetTop > cstOption.offsetParent.scrollTop + cstOption.offsetParent.clientHeight - cstOption.clientHeight) {
          cstOption.dispatchEvent(new CustomEvent('custom-select:focus-outside-panel', { bubbles: true }));
        }
      }
    } else {
      focusedElement = undefined;
    }
  }

  // Reassigns the focused and selected custom option
  // Updates the opener text
  // IMPORTANT: the setSelectedElement function doesn't change the select value!
  function setSelectedElement(cstOption) {
    if (selectedElement) {
      selectedElement.classList.remove(builderParams.isSelectedClass);
      selectedElement.removeAttribute('id');
      opener.removeAttribute('aria-activedescendant');
    }
    if (typeof cstOption !== 'undefined') {
      cstOption.classList.add(builderParams.isSelectedClass);
      cstOption.setAttribute('id', containerClass + '-' + uId + '-selectedOption');
      opener.setAttribute('aria-activedescendant', containerClass + '-' + uId + '-selectedOption');
      selectedElement = cstOption;
      opener.children[0].textContent = selectedElement.customSelectOriginalOption.text;
    } else {
      selectedElement = undefined;
      opener.children[0].textContent = '';
    }
    setFocusedElement(cstOption);
  }

  function setValue(value) {
    // Gets the option with the provided value
    var toSelect = select.querySelector('option[value=\'' + value + '\']');
    // If no option has the provided value get the first
    if (!toSelect) {
      var _select$options = _slicedToArray(select.options, 1);

      toSelect = _select$options[0];
    }
    // The option with the provided value becomes the selected one
    // And changes the select current value
    toSelect.selected = true;

    setSelectedElement(select.options[select.selectedIndex].customSelectCstOption);
  }

  function moveFocuesedElement(direction) {
    // Get all the .custom-select-options
    // Get the index of the current focused one
    var currentFocusedIndex = [].indexOf.call(select.options, focusedElement.customSelectOriginalOption);
    // If the next or prev custom option exist
    // Sets it as the new focused one
    if (select.options[currentFocusedIndex + direction]) {
      setFocusedElement(select.options[currentFocusedIndex + direction].customSelectCstOption);
    }
  }

  // Open/Close function (toggle)
  function open(bool) {
    // Open
    if (bool || typeof bool === 'undefined') {
      // If present closes an opened instance of the plugin
      // Only one at time can be open
      var openedCustomSelect = document.querySelector('.' + containerClass + '.' + builderParams.isOpenClass);
      if (openedCustomSelect) {
        openedCustomSelect.customSelect.open = false;
      }

      // Opens only the clicked one
      container.classList.add(builderParams.isOpenClass);

      // aria-expanded update
      container.classList.add(builderParams.isOpenClass);
      opener.setAttribute('aria-expanded', 'true');

      // Updates the scrollTop position of the panel in relation with the focused option
      if (selectedElement) {
        panel.scrollTop = selectedElement.offsetTop;
      }

      // Dispatches the custom event open
      container.dispatchEvent(new CustomEvent('custom-select:open'));

      // Sets the global state
      isOpen = true;

      // Close
    } else {
      // Removes the css classes
      container.classList.remove(builderParams.isOpenClass);

      // aria-expanded update
      opener.setAttribute('aria-expanded', 'false');

      // Sets the global state
      isOpen = false;

      // When closing the panel the focused custom option must be the selected one
      setFocusedElement(selectedElement);

      // Dispatches the custom event close
      container.dispatchEvent(new CustomEvent('custom-select:close'));
    }
    return isOpen;
  }

  function clickEvent(e) {
    // Opener click
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        open(false);
      } else {
        open();
      }
      // Custom Option click
    } else if (e.target.classList && e.target.classList.contains(builderParams.optionClass) && panel.contains(e.target)) {
      setSelectedElement(e.target);
      // Sets the corrisponding select's option to selected updating the select's value too
      selectedElement.customSelectOriginalOption.selected = true;
      open(false);
      // Triggers the native change event of the select
      select.dispatchEvent(new CustomEvent('change'));
      // click on label or select (click on label corrispond to select click)
    } else if (e.target === select) {
      // if the original select is focusable (for any external reason) let the focus
      // else trigger the focus on opener
      if (opener !== document.activeElement && select !== document.activeElement) {
        opener.focus();
      }
      // Click outside the container closes the panel
    } else if (isOpen && !container.contains(e.target)) {
      open(false);
    }
  }

  function mouseoverEvent(e) {
    // On mouse move over and options it bacames the focused one
    if (e.target.classList && e.target.classList.contains(builderParams.optionClass)) {
      setFocusedElement(e.target);
    }
  }

  function keydownEvent(e) {
    if (!isOpen) {
      // On "Arrow down", "Arrow up" and "Space" keys opens the panel
      if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 32) {
        open();
      }
    } else {
      switch (e.keyCode) {
        case 13:
        case 32:
          // On "Enter" or "Space" selects the focused element as the selected one
          setSelectedElement(focusedElement);
          // Sets the corrisponding select's option to selected updating the select's value too
          selectedElement.customSelectOriginalOption.selected = true;
          // Triggers the native change event of the select
          select.dispatchEvent(new CustomEvent('change'));
          open(false);
          break;
        case 27:
          // On "Escape" closes the panel
          open(false);
          break;

        case 38:
          // On "Arrow up" set focus to the prev option if present
          moveFocuesedElement(-1);
          break;
        case 40:
          // On "Arrow down" set focus to the next option if present
          moveFocuesedElement(+1);
          break;
        default:
          // search in panel (autocomplete)
          if (e.keyCode >= 48 && e.keyCode <= 90) {
            // clear existing reset timeout
            if (resetSearchTimeout) {
              clearTimeout(resetSearchTimeout);
            }

            // reset timeout for empty search key
            resetSearchTimeout = setTimeout(function () {
              searchKey = '';
            }, 1500);

            // update search keyword appending the current key
            searchKey += String.fromCharCode(e.keyCode);

            // search the element
            for (var i = 0, l = select.options.length; i < l; i++) {
              // removed cause not supported by IE:
              // if (options[i].text.startsWith(searchKey))
              if (select.options[i].text.toUpperCase().substr(0, searchKey.length) === searchKey) {
                setFocusedElement(select.options[i].customSelectCstOption);
                break;
              }
            }
          }
          break;
      }
    }
  }

  function changeEvent() {
    var index = select.selectedIndex;
    var element = index === -1 ? undefined : select.options[index].customSelectCstOption;

    setSelectedElement(element);
  }

  // When the option is outside the visible part of the opened panel, updates the scrollTop position
  // This is the default behaviour
  // To block it the plugin user must
  // add a "custom-select:focus-outside-panel" eventListener on the panel
  // with useCapture set to true
  // and stopPropagation
  function scrollToFocused(e) {
    var currPanel = e.currentTarget;
    var currOption = e.target;
    // Up
    if (currOption.offsetTop < currPanel.scrollTop) {
      currPanel.scrollTop = currOption.offsetTop;
      // Down
    } else {
      currPanel.scrollTop = currOption.offsetTop + currOption.clientHeight - currPanel.clientHeight;
    }
  }

  function addEvents() {
    document.addEventListener('click', clickEvent);
    panel.addEventListener('mouseover', mouseoverEvent);
    panel.addEventListener('custom-select:focus-outside-panel', scrollToFocused);
    select.addEventListener('change', changeEvent);
    container.addEventListener('keydown', keydownEvent);
  }

  function removeEvents() {
    document.removeEventListener('click', clickEvent);
    panel.removeEventListener('mouseover', mouseoverEvent);
    panel.removeEventListener('custom-select:focus-outside-panel', scrollToFocused);
    select.removeEventListener('change', changeEvent);
    container.removeEventListener('keydown', keydownEvent);
  }

  function disabled(bool) {
    if (bool && !select.disabled) {
      container.classList.add(builderParams.isDisabledClass);
      select.disabled = true;
      opener.removeAttribute('tabindex');
      container.dispatchEvent(new CustomEvent('custom-select:disabled'));
      removeEvents();
    } else if (!bool && select.disabled) {
      container.classList.remove(builderParams.isDisabledClass);
      select.disabled = false;
      opener.setAttribute('tabindex', '0');
      container.dispatchEvent(new CustomEvent('custom-select:enabled'));
      addEvents();
    }
  }

  // Form a given select children DOM tree (options and optgroup),
  // Creates the corresponding custom HTMLElements list (divs with different classes and attributes)
  function parseMarkup(children) {
    var nodeList = children;
    var cstList = [];

    if (typeof nodeList.length === 'undefined') {
      throw new TypeError('Invalid Argument');
    }

    for (var i = 0, li = nodeList.length; i < li; i++) {
      if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTGROUP') {
        var cstOptgroup = document.createElement('div');
        cstOptgroup.classList.add(builderParams.optgroupClass);
        cstOptgroup.setAttribute('data-label', nodeList[i].label);

        // IMPORTANT: Stores in a property of the created custom option group
        // a hook to the the corrisponding select's option group
        cstOptgroup.customSelectOriginalOptgroup = nodeList[i];

        // IMPORTANT: Stores in a property of select's option group
        // a hook to the created custom option group
        nodeList[i].customSelectCstOptgroup = cstOptgroup;

        var subNodes = parseMarkup(nodeList[i].children);
        for (var j = 0, lj = subNodes.length; j < lj; j++) {
          cstOptgroup.appendChild(subNodes[j]);
        }

        cstList.push(cstOptgroup);
      } else if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTION') {
        var cstOption = document.createElement('div');
        cstOption.classList.add(builderParams.optionClass);
        cstOption.textContent = nodeList[i].text;
        cstOption.setAttribute('data-value', nodeList[i].value);
        cstOption.setAttribute('role', 'option');

        // IMPORTANT: Stores in a property of the created custom option
        // a hook to the the corrisponding select's option
        cstOption.customSelectOriginalOption = nodeList[i];

        // IMPORTANT: Stores in a property of select's option
        // a hook to the created custom option
        nodeList[i].customSelectCstOption = cstOption;

        // If the select's option is selected
        if (nodeList[i].selected) {
          setSelectedElement(cstOption);
        }
        cstList.push(cstOption);
      } else {
        throw new TypeError('Invalid Argument');
      }
    }
    return cstList;
  }

  function _append(nodePar, appendIntoOriginal, targetPar) {
    var target = void 0;
    if (typeof targetPar === 'undefined' || targetPar === select) {
      target = panel;
    } else if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTGROUP' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // If the node provided is a single HTMLElement it is stored in an array
    var node = nodePar instanceof HTMLElement ? [nodePar] : nodePar;

    // Injects the options|optgroup in the select
    if (appendIntoOriginal) {
      for (var i = 0, l = node.length; i < l; i++) {
        if (target === panel) {
          select.appendChild(node[i]);
        } else {
          target.customSelectOriginalOptgroup.appendChild(node[i]);
        }
      }
    }

    // The custom markup to append
    var markupToInsert = parseMarkup(node);

    // Injects the created DOM content in the panel
    for (var _i = 0, _l = markupToInsert.length; _i < _l; _i++) {
      target.appendChild(markupToInsert[_i]);
    }

    return node;
  }

  function _insertBefore(node, targetPar) {
    var target = void 0;
    if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTION' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOption;
    } else if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTGROUP' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // The custom markup to append
    var markupToInsert = parseMarkup(node.length ? node : [node]);

    target.parentNode.insertBefore(markupToInsert[0], target);

    // Injects the option or optgroup node in the original select and returns the injected node
    return targetPar.parentNode.insertBefore(node.length ? node[0] : node, targetPar);
  }

  function remove(node) {
    var cstNode = void 0;
    if (node instanceof HTMLElement && node.tagName.toUpperCase() === 'OPTION' && select.contains(node)) {
      cstNode = node.customSelectCstOption;
    } else if (node instanceof HTMLElement && node.tagName.toUpperCase() === 'OPTGROUP' && select.contains(node)) {
      cstNode = node.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }
    cstNode.parentNode.removeChild(cstNode);
    var removedNode = node.parentNode.removeChild(node);
    changeEvent();
    return removedNode;
  }

  function empty() {
    var removed = [];
    while (select.children.length) {
      panel.removeChild(panel.children[0]);
      removed.push(select.removeChild(select.children[0]));
    }
    setSelectedElement();
    return removed;
  }

  function destroy() {
    for (var i = 0, l = select.options.length; i < l; i++) {
      delete select.options[i].customSelectCstOption;
    }
    var optGroup = select.getElementsByTagName('optgroup');
    for (var _i2 = 0, _l2 = optGroup.length; _i2 < _l2; _i2++) {
      delete optGroup.customSelectCstOptgroup;
    }

    removeEvents();

    return container.parentNode.replaceChild(select, container);
  }
  //
  // Custom Select DOM tree creation
  //

  // Creates the container/wrapper
  container = document.createElement('div');
  container.classList.add(builderParams.containerClass, containerClass);

  // Creates the opener
  opener = document.createElement('span');
  opener.className = builderParams.openerClass;
  opener.setAttribute('role', 'combobox');
  opener.setAttribute('aria-autocomplete', 'list');
  opener.setAttribute('aria-expanded', 'false');
  opener.innerHTML = '<span>\n   ' + (select.selectedIndex !== -1 ? select.options[select.selectedIndex].text : '') + '\n   </span>';

  // Creates the panel
  // and injects the markup of the select inside
  // with some tag and attributes replacement
  panel = document.createElement('div');
  // Create random id
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
    uId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  panel.id = containerClass + '-' + uId + '-panel';
  panel.className = builderParams.panelClass;
  panel.setAttribute('role', 'listbox');
  opener.setAttribute('aria-owns', panel.id);

  _append(select.children, false);

  // Injects the container in the original DOM position of the select
  container.appendChild(opener);
  select.parentNode.replaceChild(container, select);
  container.appendChild(select);
  container.appendChild(panel);

  // ARIA labelledby - label
  if (document.querySelector('label[for="' + select.id + '"]')) {
    currLabel = document.querySelector('label[for="' + select.id + '"]');
  } else if (container.parentNode.tagName.toUpperCase() === 'LABEL') {
    currLabel = container.parentNode;
  }
  if (typeof currLabel !== 'undefined') {
    currLabel.setAttribute('id', containerClass + '-' + uId + '-label');
    opener.setAttribute('aria-labelledby', containerClass + '-' + uId + '-label');
  }

  // Event Init
  if (select.disabled) {
    container.classList.add(builderParams.isDisabledClass);
  } else {
    opener.setAttribute('tabindex', '0');
    select.setAttribute('tabindex', '-1');
    addEvents();
  }

  // Stores the plugin public exposed methods and properties, directly in the container HTMLElement
  container.customSelect = {
    get pluginOptions() {
      return builderParams;
    },
    get open() {
      return isOpen;
    },
    set open(bool) {
      open(bool);
    },
    get disabled() {
      return select.disabled;
    },
    set disabled(bool) {
      disabled(bool);
    },
    get value() {
      return select.value;
    },
    set value(val) {
      setValue(val);
    },
    append: function append(node, target) {
      return _append(node, true, target);
    },
    insertBefore: function insertBefore(node, target) {
      return _insertBefore(node, target);
    },
    remove: remove,
    empty: empty,
    destroy: destroy,
    opener: opener,
    select: select,
    panel: panel,
    container: container
  };

  // Stores the plugin directly in the original select
  select.customSelect = container.customSelect;

  // Returns the plugin instance, with the public exposed methods and properties
  return container.customSelect;
}

function customSelect(element, customParams) {
  // Overrides the default options with the ones provided by the user
  var nodeList = [];
  var selects = [];

  return function init() {
    // The plugin is called on a single HTMLElement
    if (element && element instanceof HTMLElement && element.tagName.toUpperCase() === 'SELECT') {
      nodeList.push(element);
      // The plugin is called on a selector
    } else if (element && typeof element === 'string') {
      var elementsList = document.querySelectorAll(element);
      for (var i = 0, l = elementsList.length; i < l; ++i) {
        if (elementsList[i] instanceof HTMLElement && elementsList[i].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(elementsList[i]);
        }
      }
      // The plugin is called on any HTMLElements list (NodeList, HTMLCollection, Array, etc.)
    } else if (element && element.length) {
      for (var _i3 = 0, _l3 = element.length; _i3 < _l3; ++_i3) {
        if (element[_i3] instanceof HTMLElement && element[_i3].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(element[_i3]);
        }
      }
    }

    // Launches the plugin over every HTMLElement
    // And stores every plugin instance
    for (var _i4 = 0, _l4 = nodeList.length; _i4 < _l4; ++_i4) {
      selects.push(builder(nodeList[_i4], _extends({}, defaultParams, customParams)));
    }

    // Returns all plugin instances
    return selects;
  }();
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(5639);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 4239:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(2705),
    getRawTag = __webpack_require__(9607),
    objectToString = __webpack_require__(2333);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 7561:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__(7990);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ 1957:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ 9607:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(2705);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 2333:
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 5639:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(1957);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 7990:
/***/ (function(module) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ 3279:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(3218),
    now = __webpack_require__(7771),
    toNumber = __webpack_require__(4841);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 3218:
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 7005:
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 3448:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4239),
    isObjectLike = __webpack_require__(7005);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 7771:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(5639);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 4841:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTrim = __webpack_require__(7561),
    isObject = __webpack_require__(3218),
    isSymbol = __webpack_require__(3448);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(5579), __webpack_exec__(5277), __webpack_exec__(5508), __webpack_exec__(2958), __webpack_exec__(8190), __webpack_exec__(9794), __webpack_exec__(4488), __webpack_exec__(5965), __webpack_exec__(7642), __webpack_exec__(5889), __webpack_exec__(9163), __webpack_exec__(304), __webpack_exec__(1016), __webpack_exec__(5503), __webpack_exec__(3830), __webpack_exec__(6566), __webpack_exec__(7676), __webpack_exec__(6475), __webpack_exec__(9112), __webpack_exec__(253), __webpack_exec__(3657), __webpack_exec__(2546), __webpack_exec__(5745), __webpack_exec__(7833), __webpack_exec__(2000), __webpack_exec__(9106), __webpack_exec__(4952), __webpack_exec__(5933), __webpack_exec__(4359), __webpack_exec__(807), __webpack_exec__(2004), __webpack_exec__(5476), __webpack_exec__(6103), __webpack_exec__(2905), __webpack_exec__(3254), __webpack_exec__(9349), __webpack_exec__(7762), __webpack_exec__(6809), __webpack_exec__(9404), __webpack_exec__(8585), __webpack_exec__(8124), __webpack_exec__(3497), __webpack_exec__(9108));
/******/ }
]);
//# sourceMappingURL=main.js.map