/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 333);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(261);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(258);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(307);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(287);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(250);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(13);

var getOwnPropertyDescriptor = __webpack_require__(83).f;

var isForced = __webpack_require__(185);

var path = __webpack_require__(9);

var bind = __webpack_require__(86);

var createNonEnumerableProperty = __webpack_require__(24);

var has = __webpack_require__(18);

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0:
          return new NativeConstructor();

        case 1:
          return new NativeConstructor(a);

        case 2:
          return new NativeConstructor(a, b);
      }

      return new NativeConstructor(a, b, c);
    }

    return NativeConstructor.apply(this, arguments);
  };

  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};
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
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;
  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;
  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;
  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);
    targetProperty = target[key];
    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key]; // export native or implementation

    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global); // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind(Function.call, sourceProperty); // default case
        else resultProperty = sourceProperty; // add a flag to not completely full polyfills

    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      } // export virtual prototype methods


      path[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(254);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(291);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(304);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(9);

var has = __webpack_require__(18);

var wrappedWellKnownSymbolModule = __webpack_require__(94);

var defineProperty = __webpack_require__(29).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var shared = __webpack_require__(90);

var has = __webpack_require__(18);

var uid = __webpack_require__(91);

var NATIVE_SYMBOL = __webpack_require__(92);

var USE_SYMBOL_AS_UID = __webpack_require__(126);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func
Function('return this')();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(107)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(9);

module.exports = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(272);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(11); // Thank's IE8 for his funny defineProperty


module.exports = !fails(function () {
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func
Function('return this')();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(107)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(45); // `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject


module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol$iterator = __webpack_require__(206);

var _Symbol = __webpack_require__(216);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(269);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);

var definePropertyModule = __webpack_require__(29);

var createPropertyDescriptor = __webpack_require__(44);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);

var fails = __webpack_require__(11);

var has = __webpack_require__(18);

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) {
  throw it;
};

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;
  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = {
      length: -1
    };
    if (ACCESSORS) defineProperty(O, 1, {
      enumerable: true,
      get: thrower
    });else O[1] = 1;
    method.call(O, argument0, argument1);
  });
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(40);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(85);

var requireObjectCoercible = __webpack_require__(45);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);

var IE8_DOM_DEFINE = __webpack_require__(123);

var anObject = __webpack_require__(30);

var toPrimitive = __webpack_require__(63);

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(276);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(65);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(86);

var IndexedObject = __webpack_require__(85);

var toObject = __webpack_require__(21);

var toLength = __webpack_require__(34);

var arraySpeciesCreate = __webpack_require__(98);

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else if (IS_EVERY) return false; // every
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(295);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(299);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(20); // Thank's IE8 for his funny defineProperty


module.exports = !fails(function () {
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(39);

var definePropertyModule = __webpack_require__(77);

var createPropertyDescriptor = __webpack_require__(109);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);

var shared = __webpack_require__(115);

var has = __webpack_require__(33);

var uid = __webpack_require__(116);

var NATIVE_SYMBOL = __webpack_require__(119);

var USE_SYMBOL_AS_UID = __webpack_require__(171);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(106);

var exec = __webpack_require__(60);

$({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== exec
}, {
  exec: exec
});

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(97);

var defineProperty = __webpack_require__(29).f;

var createNonEnumerableProperty = __webpack_require__(24);

var has = __webpack_require__(18);

var toString = __webpack_require__(213);

var wellKnownSymbol = __webpack_require__(12);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;

    if (!has(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, {
        configurable: true,
        value: TAG
      });
    }

    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(62); // `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray


module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(11);

var wellKnownSymbol = __webpack_require__(12);

var V8_VERSION = __webpack_require__(139);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(265);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(283);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(302);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(192);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(22);

var assertThisInitialized = __webpack_require__(100);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(316);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(110);

var requireObjectCoercible = __webpack_require__(32);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);

var createNonEnumerableProperty = __webpack_require__(41);

var has = __webpack_require__(33);

var setGlobal = __webpack_require__(78);

var inspectSource = __webpack_require__(113);

var InternalStateModule = __webpack_require__(154);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(59);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(120);

var stickyHelpers = __webpack_require__(174);

var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace;
var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');

      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      } // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.


      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(80);

var isRegExp = __webpack_require__(178);

var anObject = __webpack_require__(27);

var requireObjectCoercible = __webpack_require__(32);

var speciesConstructor = __webpack_require__(179);

var advanceStringIndex = __webpack_require__(81);

var toLength = __webpack_require__(58);

var callRegExpExec = __webpack_require__(82);

var regexpExec = __webpack_require__(60);

var fails = __webpack_require__(20);

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function () {
  return !RegExp(MAX_UINT32, 'y');
}); // @@split logic

fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;

  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }

      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }

        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }

      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output.length > lim ? output.slice(0, lim) : output;
    }; // Chakra, V8

  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [// `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = requireObjectCoercible(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;

      if (z === null || (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
}, !SUPPORTS_Y);

/***/ }),
/* 62 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16); // `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(9);

var global = __webpack_require__(13);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(30);

var defineProperties = __webpack_require__(195);

var enumBugKeys = __webpack_require__(93);

var hiddenKeys = __webpack_require__(70);

var html = __webpack_require__(196);

var documentCreateElement = __webpack_require__(124);

var sharedKey = __webpack_require__(71);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : defineProperties(result, Properties);
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(127);

var enumBugKeys = __webpack_require__(93); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(90);

var uid = __webpack_require__(91);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(97);

var classofRaw = __webpack_require__(62);

var wellKnownSymbol = __webpack_require__(12);

var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPrimitive = __webpack_require__(63);

var definePropertyModule = __webpack_require__(29);

var createPropertyDescriptor = __webpack_require__(44);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(11);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(321);

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(39);

var IE8_DOM_DEFINE = __webpack_require__(112);

var anObject = __webpack_require__(27);

var toPrimitive = __webpack_require__(111);

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);

var createNonEnumerableProperty = __webpack_require__(41);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(42);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // TODO: Remove from `core-js@4` since it's moved to entry points

__webpack_require__(43);

var redefine = __webpack_require__(57);

var fails = __webpack_require__(20);

var wellKnownSymbol = __webpack_require__(42);

var regexpExec = __webpack_require__(60);

var createNonEnumerableProperty = __webpack_require__(41);

var SPECIES = wellKnownSymbol('species');
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  };

  return ''.replace(re, '$<a>') !== '7';
}); // IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

var REPLACE_KEEPS_$0 = function () {
  return 'a'.replace(/./, '$0') === '$0';
}();

var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }

  return false;
}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper


var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;

  re.exec = function () {
    return originalExec.apply(this, arguments);
  };

  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);
  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.

      re.constructor = {};

      re.constructor[SPECIES] = function () {
        return re;
      };

      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: nativeRegExpMethod.call(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: nativeMethod.call(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];
    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return regexMethod.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return regexMethod.call(string, this);
    });
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var charAt = __webpack_require__(176).charAt; // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex


module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(56);

var regexpExec = __webpack_require__(60); // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec


module.exports = function (R, S) {
  var exec = R.exec;

  if (typeof exec === 'function') {
    var result = exec.call(R, S);

    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }

    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);

var propertyIsEnumerableModule = __webpack_require__(84);

var createPropertyDescriptor = __webpack_require__(44);

var toIndexedObject = __webpack_require__(28);

var toPrimitive = __webpack_require__(63);

var has = __webpack_require__(18);

var IE8_DOM_DEFINE = __webpack_require__(123);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(11);

var classof = __webpack_require__(62);

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(64); // optional / simple context binding


module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(28);

var toLength = __webpack_require__(34);

var toAbsoluteIndex = __webpack_require__(88); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(65);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function () {
  /* empty */
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(66);

var store = __webpack_require__(125);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 91 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(11);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

/***/ }),
/* 93 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(12);

exports.f = wellKnownSymbol;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(210);

var global = __webpack_require__(13);

var isObject = __webpack_require__(16);

var createNonEnumerableProperty = __webpack_require__(24);

var objectHas = __webpack_require__(18);

var sharedKey = __webpack_require__(71);

var hiddenKeys = __webpack_require__(70);

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
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return objectHas(it, STATE);
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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(18);

var toObject = __webpack_require__(21);

var sharedKey = __webpack_require__(71);

var CORRECT_PROTOTYPE_GETTER = __webpack_require__(135);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(12);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);

var isArray = __webpack_require__(47);

var wellKnownSymbol = __webpack_require__(12);

var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(45);

var whitespaces = __webpack_require__(75);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

/***/ }),
/* 100 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var _Object$getPrototypeOf = __webpack_require__(242);

var _Object$setPrototypeOf = __webpack_require__(129);

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = _Object$setPrototypeOf ? _Object$getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(246);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(279);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(312);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(106);

var IndexedObject = __webpack_require__(110);

var toIndexedObject = __webpack_require__(55);

var arrayMethodIsStrict = __webpack_require__(169);

var nativeJoin = [].join;
var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

$({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || !STRICT_METHOD
}, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);

var getOwnPropertyDescriptor = __webpack_require__(108).f;

var createNonEnumerableProperty = __webpack_require__(41);

var redefine = __webpack_require__(57);

var setGlobal = __webpack_require__(78);

var copyConstructorProperties = __webpack_require__(158);

var isForced = __webpack_require__(168);
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

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

/***/ }),
/* 107 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(39);

var propertyIsEnumerableModule = __webpack_require__(152);

var createPropertyDescriptor = __webpack_require__(109);

var toIndexedObject = __webpack_require__(55);

var toPrimitive = __webpack_require__(111);

var has = __webpack_require__(33);

var IE8_DOM_DEFINE = __webpack_require__(112);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(20);

var classof = __webpack_require__(56);

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(40); // `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(39);

var fails = __webpack_require__(20);

var createElement = __webpack_require__(153); // Thank's IE8 for his funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(114);

var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);

var setGlobal = __webpack_require__(78);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(157);

var store = __webpack_require__(114);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 116 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(39);

var defineProperty = __webpack_require__(77).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name

if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(20);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(27); // `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


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
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(80);

var anObject = __webpack_require__(27);

var toLength = __webpack_require__(58);

var requireObjectCoercible = __webpack_require__(32);

var advanceStringIndex = __webpack_require__(81);

var regExpExec = __webpack_require__(82); // @@match logic


fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = requireObjectCoercible(this);
    var matcher = regexp == undefined ? undefined : regexp[MATCH];
    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative(nativeMatch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regExpExec(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regExpExec(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(80);

var anObject = __webpack_require__(27);

var toObject = __webpack_require__(177);

var toLength = __webpack_require__(58);

var toInteger = __webpack_require__(59);

var requireObjectCoercible = __webpack_require__(32);

var advanceStringIndex = __webpack_require__(81);

var regExpExec = __webpack_require__(82);

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
}; // @@replace logic


fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
  return [// `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
      if (res.done) return res.value;
    }

    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regExpExec(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max(min(toInteger(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + S.slice(nextSourcePosition);
  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  }
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);

var fails = __webpack_require__(11);

var createElement = __webpack_require__(124); // Thank's IE8 for his funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var isObject = __webpack_require__(16);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var setGlobal = __webpack_require__(190);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(92);

module.exports = NATIVE_SYMBOL // eslint-disable-next-line no-undef
&& !Symbol.sham // eslint-disable-next-line no-undef
&& typeof Symbol.iterator == 'symbol';

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(18);

var toIndexedObject = __webpack_require__(28);

var indexOf = __webpack_require__(87).indexOf;

var hiddenKeys = __webpack_require__(70);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(64);

var isObject = __webpack_require__(16);

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func


    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  }

  return factories[argsLength](C, args);
}; // `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind


module.exports = Function.bind || function bind(that
/* , ...args */
) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);

  var boundFunction = function bound()
  /* args... */
  {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };

  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(202);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(30);

var aPossiblePrototype = __webpack_require__(205); // `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */


module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator


defineWellKnownSymbol('iterator');

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var charAt = __webpack_require__(209).charAt;

var InternalStateModule = __webpack_require__(95);

var defineIterator = __webpack_require__(133);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var createIteratorConstructor = __webpack_require__(212);

var getPrototypeOf = __webpack_require__(96);

var setPrototypeOf = __webpack_require__(130);

var setToStringTag = __webpack_require__(46);

var createNonEnumerableProperty = __webpack_require__(24);

var redefine = __webpack_require__(136);

var wellKnownSymbol = __webpack_require__(12);

var IS_PURE = __webpack_require__(66);

var Iterators = __webpack_require__(35);

var IteratorsCore = __webpack_require__(134);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () {
  return this;
};

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }

  Iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getPrototypeOf = __webpack_require__(96);

var createNonEnumerableProperty = __webpack_require__(24);

var has = __webpack_require__(18);

var wellKnownSymbol = __webpack_require__(12);

var IS_PURE = __webpack_require__(66);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(11);

module.exports = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var createNonEnumerableProperty = __webpack_require__(24);

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(214);

var DOMIterables = __webpack_require__(215);

var global = __webpack_require__(13);

var classof = __webpack_require__(72);

var createNonEnumerableProperty = __webpack_require__(24);

var Iterators = __webpack_require__(35);

var wellKnownSymbol = __webpack_require__(12);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }

  Iterators[COLLECTION_NAME] = Iterators.Array;
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var fails = __webpack_require__(11);

var isArray = __webpack_require__(47);

var isObject = __webpack_require__(16);

var toObject = __webpack_require__(21);

var toLength = __webpack_require__(34);

var createProperty = __webpack_require__(73);

var arraySpeciesCreate = __webpack_require__(98);

var arrayMethodHasSpeciesSupport = __webpack_require__(48);

var wellKnownSymbol = __webpack_require__(12);

var V8_VERSION = __webpack_require__(139);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var userAgent = __webpack_require__(140);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(67);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(127);

var enumBugKeys = __webpack_require__(93);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 142 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(278);

var path = __webpack_require__(9);

var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(181);

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var _Object$create = __webpack_require__(197);

var setPrototypeOf = __webpack_require__(201);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(280);

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/Pikaday/Pikaday
 */
(function (root, factory) {
  'use strict';

  var moment;

  if (true) {
    // CommonJS module
    // Load moment.js as an optional dependency
    try {
      moment = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'moment'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    } catch (e) {}

    module.exports = factory(moment);
  } else {}
})(this, function (moment) {
  'use strict';
  /**
   * feature detection and helper functions
   */

  var hasMoment = typeof moment === 'function',
      hasEventListeners = !!window.addEventListener,
      document = window.document,
      sto = window.setTimeout,
      addEvent = function (el, e, callback, capture) {
    if (hasEventListeners) {
      el.addEventListener(e, callback, !!capture);
    } else {
      el.attachEvent('on' + e, callback);
    }
  },
      removeEvent = function (el, e, callback, capture) {
    if (hasEventListeners) {
      el.removeEventListener(e, callback, !!capture);
    } else {
      el.detachEvent('on' + e, callback);
    }
  },
      trim = function (str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  },
      hasClass = function (el, cn) {
    return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
  },
      addClass = function (el, cn) {
    if (!hasClass(el, cn)) {
      el.className = el.className === '' ? cn : el.className + ' ' + cn;
    }
  },
      removeClass = function (el, cn) {
    el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
  },
      isArray = function (obj) {
    return /Array/.test(Object.prototype.toString.call(obj));
  },
      isDate = function (obj) {
    return /Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
  },
      isWeekend = function (date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  },
      isLeapYear = function (year) {
    // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  },
      getDaysInMonth = function (year, month) {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  },
      setToStartOfDay = function (date) {
    if (isDate(date)) date.setHours(0, 0, 0, 0);
  },
      compareDates = function (a, b) {
    // weak date comparison (use setToStartOfDay(date) to ensure correct result)
    return a.getTime() === b.getTime();
  },
      extend = function (to, from, overwrite) {
    var prop, hasProp;

    for (prop in from) {
      hasProp = to[prop] !== undefined;

      if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
        if (isDate(from[prop])) {
          if (overwrite) {
            to[prop] = new Date(from[prop].getTime());
          }
        } else if (isArray(from[prop])) {
          if (overwrite) {
            to[prop] = from[prop].slice(0);
          }
        } else {
          to[prop] = extend({}, from[prop], overwrite);
        }
      } else if (overwrite || !hasProp) {
        to[prop] = from[prop];
      }
    }

    return to;
  },
      fireEvent = function (el, eventName, data) {
    var ev;

    if (document.createEvent) {
      ev = document.createEvent('HTMLEvents');
      ev.initEvent(eventName, true, false);
      ev = extend(ev, data);
      el.dispatchEvent(ev);
    } else if (document.createEventObject) {
      ev = document.createEventObject();
      ev = extend(ev, data);
      el.fireEvent('on' + eventName, ev);
    }
  },
      adjustCalendar = function (calendar) {
    if (calendar.month < 0) {
      calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
      calendar.month += 12;
    }

    if (calendar.month > 11) {
      calendar.year += Math.floor(Math.abs(calendar.month) / 12);
      calendar.month -= 12;
    }

    return calendar;
  },

  /**
   * defaults and localisation
   */
  defaults = {
    // bind the picker to a form field
    field: null,
    // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
    bound: undefined,
    // data-attribute on the input field with an aria assistance tekst (only applied when `bound` is set)
    ariaLabel: 'Use the arrow keys to pick a date',
    // position of the datepicker, relative to the field (default to bottom & left)
    // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
    position: 'bottom left',
    // automatically fit in the viewport even if it means repositioning from the position option
    reposition: true,
    // the default output format for `.toString()` and `field` value
    format: 'YYYY-MM-DD',
    // the toString function which gets passed a current date object and format
    // and returns a string
    toString: null,
    // used to create date object from current input string
    parse: null,
    // the initial date to view when first opened
    defaultDate: null,
    // make the `defaultDate` the initial selected value
    setDefaultDate: false,
    // first day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,
    // the default flag for moment's strict date parsing
    formatStrict: false,
    // the minimum/earliest date that can be selected
    minDate: null,
    // the maximum/latest date that can be selected
    maxDate: null,
    // number of years either side, or array of upper/lower range
    yearRange: 10,
    // show week numbers at head of row
    showWeekNumber: false,
    // Week picker mode
    pickWholeWeek: false,
    // used internally (don't config outside)
    minYear: 0,
    maxYear: 9999,
    minMonth: undefined,
    maxMonth: undefined,
    startRange: null,
    endRange: null,
    isRTL: false,
    // Additional text to append to the year in the calendar title
    yearSuffix: '',
    // Render the month after year in the calendar title
    showMonthAfterYear: false,
    // Render days of the calendar grid that fall in the next or previous month
    showDaysInNextAndPreviousMonths: false,
    // Allows user to select days that fall in the next or previous month
    enableSelectionDaysInNextAndPreviousMonths: false,
    // how many months are visible
    numberOfMonths: 1,
    // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
    // only used for the first display or when a selected date is not visible
    mainCalendar: 'left',
    // Specify a DOM element to render the calendar in
    container: undefined,
    // Blur field when date is selected
    blurFieldOnSelect: true,
    // internationalization
    i18n: {
      previousMonth: 'Previous Month',
      nextMonth: 'Next Month',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    // Theme Classname
    theme: null,
    // events array
    events: [],
    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null,
    // Enable keyboard input
    keyboardInput: true
  },

  /**
   * templating functions to abstract HTML rendering
   */
  renderDayName = function (opts, day, abbr) {
    day += opts.firstDay;

    while (day >= 7) {
      day -= 7;
    }

    return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
  },
      renderDay = function (opts) {
    var arr = [];
    var ariaSelected = 'false';

    if (opts.isEmpty) {
      if (opts.showDaysInNextAndPreviousMonths) {
        arr.push('is-outside-current-month');

        if (!opts.enableSelectionDaysInNextAndPreviousMonths) {
          arr.push('is-selection-disabled');
        }
      } else {
        return '<td class="is-empty"></td>';
      }
    }

    if (opts.isDisabled) {
      arr.push('is-disabled');
    }

    if (opts.isToday) {
      arr.push('is-today');
    }

    if (opts.isSelected) {
      arr.push('is-selected');
      ariaSelected = 'true';
    }

    if (opts.hasEvent) {
      arr.push('has-event');
    }

    if (opts.isInRange) {
      arr.push('is-inrange');
    }

    if (opts.isStartRange) {
      arr.push('is-startrange');
    }

    if (opts.isEndRange) {
      arr.push('is-endrange');
    }

    return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' + '<button class="pika-button pika-day" type="button" ' + 'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' + opts.day + '</button>' + '</td>';
  },
      renderWeek = function (d, m, y) {
    // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
    var onejan = new Date(y, 0, 1),
        weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return '<td class="pika-week">' + weekNum + '</td>';
  },
      renderRow = function (days, isRTL, pickWholeWeek, isRowSelected) {
    return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
  },
      renderBody = function (rows) {
    return '<tbody>' + rows.join('') + '</tbody>';
  },
      renderHead = function (opts) {
    var i,
        arr = [];

    if (opts.showWeekNumber) {
      arr.push('<th></th>');
    }

    for (i = 0; i < 7; i++) {
      arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
    }

    return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
  },
      renderTitle = function (instance, c, year, month, refYear, randId) {
    var i,
        j,
        arr,
        opts = instance._o,
        isMinYear = year === opts.minYear,
        isMaxYear = year === opts.maxYear,
        html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
        monthHtml,
        yearHtml,
        prev = true,
        next = true;

    for (arr = [], i = 0; i < 12; i++) {
      arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
    }

    monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

    if (isArray(opts.yearRange)) {
      i = opts.yearRange[0];
      j = opts.yearRange[1] + 1;
    } else {
      i = year - opts.yearRange;
      j = 1 + year + opts.yearRange;
    }

    for (arr = []; i < j && i <= opts.maxYear; i++) {
      if (i >= opts.minYear) {
        arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"' : '') + '>' + i + '</option>');
      }
    }

    yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

    if (opts.showMonthAfterYear) {
      html += yearHtml + monthHtml;
    } else {
      html += monthHtml + yearHtml;
    }

    if (isMinYear && (month === 0 || opts.minMonth >= month)) {
      prev = false;
    }

    if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
      next = false;
    }

    if (c === 0) {
      html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
    }

    if (c === instance._o.numberOfMonths - 1) {
      html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
    }

    return html += '</div>';
  },
      renderTable = function (opts, data, randId) {
    return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
  },

  /**
   * Pikaday constructor
   */
  Pikaday = function (options) {
    var self = this,
        opts = self.config(options);

    self._onMouseDown = function (e) {
      if (!self._v) {
        return;
      }

      e = e || window.event;
      var target = e.target || e.srcElement;

      if (!target) {
        return;
      }

      if (!hasClass(target, 'is-disabled')) {
        if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
          self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));

          if (opts.bound) {
            sto(function () {
              self.hide();

              if (opts.blurFieldOnSelect && opts.field) {
                opts.field.blur();
              }
            }, 100);
          }
        } else if (hasClass(target, 'pika-prev')) {
          self.prevMonth();
        } else if (hasClass(target, 'pika-next')) {
          self.nextMonth();
        }
      }

      if (!hasClass(target, 'pika-select')) {
        // if this is touch event prevent mouse events emulation
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
          return false;
        }
      } else {
        self._c = true;
      }
    };

    self._onChange = function (e) {
      e = e || window.event;
      var target = e.target || e.srcElement;

      if (!target) {
        return;
      }

      if (hasClass(target, 'pika-select-month')) {
        self.gotoMonth(target.value);
      } else if (hasClass(target, 'pika-select-year')) {
        self.gotoYear(target.value);
      }
    };

    self._onKeyChange = function (e) {
      e = e || window.event;

      if (self.isVisible()) {
        switch (e.keyCode) {
          case 13:
          case 27:
            if (opts.field) {
              opts.field.blur();
            }

            break;

          case 37:
            e.preventDefault();
            self.adjustDate('subtract', 1);
            break;

          case 38:
            self.adjustDate('subtract', 7);
            break;

          case 39:
            self.adjustDate('add', 1);
            break;

          case 40:
            self.adjustDate('add', 7);
            break;
        }
      }
    };

    self._onInputChange = function (e) {
      var date;

      if (e.firedBy === self) {
        return;
      }

      if (opts.parse) {
        date = opts.parse(opts.field.value, opts.format);
      } else if (hasMoment) {
        date = moment(opts.field.value, opts.format, opts.formatStrict);
        date = date && date.isValid() ? date.toDate() : null;
      } else {
        date = new Date(Date.parse(opts.field.value));
      }

      if (isDate(date)) {
        self.setDate(date);
      }

      if (!self._v) {
        self.show();
      }
    };

    self._onInputFocus = function () {
      self.show();
    };

    self._onInputClick = function () {
      self.show();
    };

    self._onInputBlur = function () {
      // IE allows pika div to gain focus; catch blur the input field
      var pEl = document.activeElement;

      do {
        if (hasClass(pEl, 'pika-single')) {
          return;
        }
      } while (pEl = pEl.parentNode);

      if (!self._c) {
        self._b = sto(function () {
          self.hide();
        }, 50);
      }

      self._c = false;
    };

    self._onClick = function (e) {
      e = e || window.event;
      var target = e.target || e.srcElement,
          pEl = target;

      if (!target) {
        return;
      }

      if (!hasEventListeners && hasClass(target, 'pika-select')) {
        if (!target.onchange) {
          target.setAttribute('onchange', 'return;');
          addEvent(target, 'change', self._onChange);
        }
      }

      do {
        if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
          return;
        }
      } while (pEl = pEl.parentNode);

      if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
        self.hide();
      }
    };

    self.el = document.createElement('div');
    self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');
    addEvent(self.el, 'mousedown', self._onMouseDown, true);
    addEvent(self.el, 'touchend', self._onMouseDown, true);
    addEvent(self.el, 'change', self._onChange);

    if (opts.keyboardInput) {
      addEvent(document, 'keydown', self._onKeyChange);
    }

    if (opts.field) {
      if (opts.container) {
        opts.container.appendChild(self.el);
      } else if (opts.bound) {
        document.body.appendChild(self.el);
      } else {
        opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
      }

      addEvent(opts.field, 'change', self._onInputChange);

      if (!opts.defaultDate) {
        if (hasMoment && opts.field.value) {
          opts.defaultDate = moment(opts.field.value, opts.format).toDate();
        } else {
          opts.defaultDate = new Date(Date.parse(opts.field.value));
        }

        opts.setDefaultDate = true;
      }
    }

    var defDate = opts.defaultDate;

    if (isDate(defDate)) {
      if (opts.setDefaultDate) {
        self.setDate(defDate, true);
      } else {
        self.gotoDate(defDate);
      }
    } else {
      self.gotoDate(new Date());
    }

    if (opts.bound) {
      this.hide();
      self.el.className += ' is-bound';
      addEvent(opts.trigger, 'click', self._onInputClick);
      addEvent(opts.trigger, 'focus', self._onInputFocus);
      addEvent(opts.trigger, 'blur', self._onInputBlur);
    } else {
      this.show();
    }
  };
  /**
   * public Pikaday API
   */


  Pikaday.prototype = {
    /**
     * configure functionality
     */
    config: function (options) {
      if (!this._o) {
        this._o = extend({}, defaults, true);
      }

      var opts = extend(this._o, options, true);
      opts.isRTL = !!opts.isRTL;
      opts.field = opts.field && opts.field.nodeName ? opts.field : null;
      opts.theme = typeof opts.theme === 'string' && opts.theme ? opts.theme : null;
      opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);
      opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field;
      opts.disableWeekends = !!opts.disableWeekends;
      opts.disableDayFn = typeof opts.disableDayFn === 'function' ? opts.disableDayFn : null;
      var nom = parseInt(opts.numberOfMonths, 10) || 1;
      opts.numberOfMonths = nom > 4 ? 4 : nom;

      if (!isDate(opts.minDate)) {
        opts.minDate = false;
      }

      if (!isDate(opts.maxDate)) {
        opts.maxDate = false;
      }

      if (opts.minDate && opts.maxDate && opts.maxDate < opts.minDate) {
        opts.maxDate = opts.minDate = false;
      }

      if (opts.minDate) {
        this.setMinDate(opts.minDate);
      }

      if (opts.maxDate) {
        this.setMaxDate(opts.maxDate);
      }

      if (isArray(opts.yearRange)) {
        var fallback = new Date().getFullYear() - 10;
        opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
        opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
      } else {
        opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;

        if (opts.yearRange > 100) {
          opts.yearRange = 100;
        }
      }

      return opts;
    },

    /**
     * return a formatted string of the current selection (using Moment.js if available)
     */
    toString: function (format) {
      format = format || this._o.format;

      if (!isDate(this._d)) {
        return '';
      }

      if (this._o.toString) {
        return this._o.toString(this._d, format);
      }

      if (hasMoment) {
        return moment(this._d).format(format);
      }

      return this._d.toDateString();
    },

    /**
     * return a Moment.js object of the current selection (if available)
     */
    getMoment: function () {
      return hasMoment ? moment(this._d) : null;
    },

    /**
     * set the current selection from a Moment.js object (if available)
     */
    setMoment: function (date, preventOnSelect) {
      if (hasMoment && moment.isMoment(date)) {
        this.setDate(date.toDate(), preventOnSelect);
      }
    },

    /**
     * return a Date object of the current selection
     */
    getDate: function () {
      return isDate(this._d) ? new Date(this._d.getTime()) : null;
    },

    /**
     * set the current selection
     */
    setDate: function (date, preventOnSelect) {
      if (!date) {
        this._d = null;

        if (this._o.field) {
          this._o.field.value = '';
          fireEvent(this._o.field, 'change', {
            firedBy: this
          });
        }

        return this.draw();
      }

      if (typeof date === 'string') {
        date = new Date(Date.parse(date));
      }

      if (!isDate(date)) {
        return;
      }

      var min = this._o.minDate,
          max = this._o.maxDate;

      if (isDate(min) && date < min) {
        date = min;
      } else if (isDate(max) && date > max) {
        date = max;
      }

      this._d = new Date(date.getTime());
      setToStartOfDay(this._d);
      this.gotoDate(this._d);

      if (this._o.field) {
        this._o.field.value = this.toString();
        fireEvent(this._o.field, 'change', {
          firedBy: this
        });
      }

      if (!preventOnSelect && typeof this._o.onSelect === 'function') {
        this._o.onSelect.call(this, this.getDate());
      }
    },

    /**
     * change view to a specific date
     */
    gotoDate: function (date) {
      var newCalendar = true;

      if (!isDate(date)) {
        return;
      }

      if (this.calendars) {
        var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
            lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
            visibleDate = date.getTime(); // get the end of the month

        lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
        lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
        newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
      }

      if (newCalendar) {
        this.calendars = [{
          month: date.getMonth(),
          year: date.getFullYear()
        }];

        if (this._o.mainCalendar === 'right') {
          this.calendars[0].month += 1 - this._o.numberOfMonths;
        }
      }

      this.adjustCalendars();
    },
    adjustDate: function (sign, days) {
      var day = this.getDate() || new Date();
      var difference = parseInt(days) * 24 * 60 * 60 * 1000;
      var newDay;

      if (sign === 'add') {
        newDay = new Date(day.valueOf() + difference);
      } else if (sign === 'subtract') {
        newDay = new Date(day.valueOf() - difference);
      }

      this.setDate(newDay);
    },
    adjustCalendars: function () {
      this.calendars[0] = adjustCalendar(this.calendars[0]);

      for (var c = 1; c < this._o.numberOfMonths; c++) {
        this.calendars[c] = adjustCalendar({
          month: this.calendars[0].month + c,
          year: this.calendars[0].year
        });
      }

      this.draw();
    },
    gotoToday: function () {
      this.gotoDate(new Date());
    },

    /**
     * change view to a specific month (zero-index, e.g. 0: January)
     */
    gotoMonth: function (month) {
      if (!isNaN(month)) {
        this.calendars[0].month = parseInt(month, 10);
        this.adjustCalendars();
      }
    },
    nextMonth: function () {
      this.calendars[0].month++;
      this.adjustCalendars();
    },
    prevMonth: function () {
      this.calendars[0].month--;
      this.adjustCalendars();
    },

    /**
     * change view to a specific full year (e.g. "2012")
     */
    gotoYear: function (year) {
      if (!isNaN(year)) {
        this.calendars[0].year = parseInt(year, 10);
        this.adjustCalendars();
      }
    },

    /**
     * change the minDate
     */
    setMinDate: function (value) {
      if (value instanceof Date) {
        setToStartOfDay(value);
        this._o.minDate = value;
        this._o.minYear = value.getFullYear();
        this._o.minMonth = value.getMonth();
      } else {
        this._o.minDate = defaults.minDate;
        this._o.minYear = defaults.minYear;
        this._o.minMonth = defaults.minMonth;
        this._o.startRange = defaults.startRange;
      }

      this.draw();
    },

    /**
     * change the maxDate
     */
    setMaxDate: function (value) {
      if (value instanceof Date) {
        setToStartOfDay(value);
        this._o.maxDate = value;
        this._o.maxYear = value.getFullYear();
        this._o.maxMonth = value.getMonth();
      } else {
        this._o.maxDate = defaults.maxDate;
        this._o.maxYear = defaults.maxYear;
        this._o.maxMonth = defaults.maxMonth;
        this._o.endRange = defaults.endRange;
      }

      this.draw();
    },
    setStartRange: function (value) {
      this._o.startRange = value;
    },
    setEndRange: function (value) {
      this._o.endRange = value;
    },

    /**
     * refresh the HTML
     */
    draw: function (force) {
      if (!this._v && !force) {
        return;
      }

      var opts = this._o,
          minYear = opts.minYear,
          maxYear = opts.maxYear,
          minMonth = opts.minMonth,
          maxMonth = opts.maxMonth,
          html = '',
          randId;

      if (this._y <= minYear) {
        this._y = minYear;

        if (!isNaN(minMonth) && this._m < minMonth) {
          this._m = minMonth;
        }
      }

      if (this._y >= maxYear) {
        this._y = maxYear;

        if (!isNaN(maxMonth) && this._m > maxMonth) {
          this._m = maxMonth;
        }
      }

      randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

      for (var c = 0; c < opts.numberOfMonths; c++) {
        html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
      }

      this.el.innerHTML = html;

      if (opts.bound) {
        if (opts.field.type !== 'hidden') {
          sto(function () {
            opts.trigger.focus();
          }, 1);
        }
      }

      if (typeof this._o.onDraw === 'function') {
        this._o.onDraw(this);
      }

      if (opts.bound) {
        // let the screen reader user know to use arrow keys
        opts.field.setAttribute('aria-label', opts.ariaLabel);
      }
    },
    adjustPosition: function () {
      var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect, leftAligned, bottomAligned;
      if (this._o.container) return;
      this.el.style.position = 'absolute';
      field = this._o.trigger;
      pEl = field;
      width = this.el.offsetWidth;
      height = this.el.offsetHeight;
      viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      leftAligned = true;
      bottomAligned = true;

      if (typeof field.getBoundingClientRect === 'function') {
        clientRect = field.getBoundingClientRect();
        left = clientRect.left + window.pageXOffset;
        top = clientRect.bottom + window.pageYOffset;
      } else {
        left = pEl.offsetLeft;
        top = pEl.offsetTop + pEl.offsetHeight;

        while (pEl = pEl.offsetParent) {
          left += pEl.offsetLeft;
          top += pEl.offsetTop;
        }
      } // default position is bottom & left


      if (this._o.reposition && left + width > viewportWidth || this._o.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0) {
        left = left - width + field.offsetWidth;
        leftAligned = false;
      }

      if (this._o.reposition && top + height > viewportHeight + scrollTop || this._o.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0) {
        top = top - height - field.offsetHeight;
        bottomAligned = false;
      }

      this.el.style.left = left + 'px';
      this.el.style.top = top + 'px';
      addClass(this.el, leftAligned ? 'left-aligned' : 'right-aligned');
      addClass(this.el, bottomAligned ? 'bottom-aligned' : 'top-aligned');
      removeClass(this.el, !leftAligned ? 'left-aligned' : 'right-aligned');
      removeClass(this.el, !bottomAligned ? 'bottom-aligned' : 'top-aligned');
    },

    /**
     * render HTML for a particular month
     */
    render: function (year, month, randId) {
      var opts = this._o,
          now = new Date(),
          days = getDaysInMonth(year, month),
          before = new Date(year, month, 1).getDay(),
          data = [],
          row = [];
      setToStartOfDay(now);

      if (opts.firstDay > 0) {
        before -= opts.firstDay;

        if (before < 0) {
          before += 7;
        }
      }

      var previousMonth = month === 0 ? 11 : month - 1,
          nextMonth = month === 11 ? 0 : month + 1,
          yearOfPreviousMonth = month === 0 ? year - 1 : year,
          yearOfNextMonth = month === 11 ? year + 1 : year,
          daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
      var cells = days + before,
          after = cells;

      while (after > 7) {
        after -= 7;
      }

      cells += 7 - after;
      var isWeekSelected = false;

      for (var i = 0, r = 0; i < cells; i++) {
        var day = new Date(year, month, 1 + (i - before)),
            isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
            isToday = compareDates(day, now),
            hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
            isEmpty = i < before || i >= days + before,
            dayNumber = 1 + (i - before),
            monthNumber = month,
            yearNumber = year,
            isStartRange = opts.startRange && compareDates(opts.startRange, day),
            isEndRange = opts.endRange && compareDates(opts.endRange, day),
            isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
            isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);

        if (isEmpty) {
          if (i < before) {
            dayNumber = daysInPreviousMonth + dayNumber;
            monthNumber = previousMonth;
            yearNumber = yearOfPreviousMonth;
          } else {
            dayNumber = dayNumber - days;
            monthNumber = nextMonth;
            yearNumber = yearOfNextMonth;
          }
        }

        var dayConfig = {
          day: dayNumber,
          month: monthNumber,
          year: yearNumber,
          hasEvent: hasEvent,
          isSelected: isSelected,
          isToday: isToday,
          isDisabled: isDisabled,
          isEmpty: isEmpty,
          isStartRange: isStartRange,
          isEndRange: isEndRange,
          isInRange: isInRange,
          showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths,
          enableSelectionDaysInNextAndPreviousMonths: opts.enableSelectionDaysInNextAndPreviousMonths
        };

        if (opts.pickWholeWeek && isSelected) {
          isWeekSelected = true;
        }

        row.push(renderDay(dayConfig));

        if (++r === 7) {
          if (opts.showWeekNumber) {
            row.unshift(renderWeek(i - before, month, year));
          }

          data.push(renderRow(row, opts.isRTL, opts.pickWholeWeek, isWeekSelected));
          row = [];
          r = 0;
          isWeekSelected = false;
        }
      }

      return renderTable(opts, data, randId);
    },
    isVisible: function () {
      return this._v;
    },
    show: function () {
      if (!this.isVisible()) {
        this._v = true;
        this.draw();
        removeClass(this.el, 'is-hidden');

        if (this._o.bound) {
          addEvent(document, 'click', this._onClick);
          this.adjustPosition();
        }

        if (typeof this._o.onOpen === 'function') {
          this._o.onOpen.call(this);
        }
      }
    },
    hide: function () {
      var v = this._v;

      if (v !== false) {
        if (this._o.bound) {
          removeEvent(document, 'click', this._onClick);
        }

        this.el.style.position = 'static'; // reset

        this.el.style.left = 'auto';
        this.el.style.top = 'auto';
        addClass(this.el, 'is-hidden');
        this._v = false;

        if (v !== undefined && typeof this._o.onClose === 'function') {
          this._o.onClose.call(this);
        }
      }
    },

    /**
     * GAME OVER
     */
    destroy: function () {
      var opts = this._o;
      this.hide();
      removeEvent(this.el, 'mousedown', this._onMouseDown, true);
      removeEvent(this.el, 'touchend', this._onMouseDown, true);
      removeEvent(this.el, 'change', this._onChange);

      if (opts.keyboardInput) {
        removeEvent(document, 'keydown', this._onKeyChange);
      }

      if (opts.field) {
        removeEvent(opts.field, 'change', this._onInputChange);

        if (opts.bound) {
          removeEvent(opts.trigger, 'click', this._onInputClick);
          removeEvent(opts.trigger, 'focus', this._onInputFocus);
          removeEvent(opts.trigger, 'blur', this._onInputBlur);
        }
      }

      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      }
    }
  };
  return Pikaday;
});

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(329);

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) {
   true ? module.exports = e() : undefined;
}(this, function () {
  "use strict";

  function t(e) {
    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    })(e);
  }

  function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function i(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  function n(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }

  function s(t) {
    return function (t) {
      if (Array.isArray(t)) {
        for (var e = 0, i = new Array(t.length); e < t.length; e++) i[e] = t[e];

        return i;
      }
    }(t) || function (t) {
      if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
    }(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  function o(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }

  function l(t, e) {
    var i = function (t, e) {
      var i = o(t) * o(e);
      if (0 === i) return 0;

      var n = function (t, e) {
        return t.x * e.x + t.y * e.y;
      }(t, e) / i;

      return n > 1 && (n = 1), Math.acos(n);
    }(t, e);

    return function (t, e) {
      return t.x * e.y - e.x * t.y;
    }(t, e) > 0 && (i *= -1), 180 * i / Math.PI;
  }

  var r = function () {
    function t(i) {
      e(this, t), this.handlers = [], this.el = i;
    }

    return n(t, [{
      key: "add",
      value: function (t) {
        this.handlers.push(t);
      }
    }, {
      key: "del",
      value: function (t) {
        t || (this.handlers = []);

        for (var e = this.handlers.length; e >= 0; e--) this.handlers[e] === t && this.handlers.splice(e, 1);
      }
    }, {
      key: "dispatch",
      value: function () {
        for (var t = 0, e = this.handlers.length; t < e; t++) {
          var i = this.handlers[t];
          "function" == typeof i && i.apply(this.el, arguments);
        }
      }
    }]), t;
  }();

  function a(t, e) {
    var i = new r(t);
    return i.add(e), i;
  }

  var c = function () {
    function t(i, n) {
      e(this, t), this.element = "string" == typeof i ? document.querySelector(i) : i, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
        x: null,
        y: null
      }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;

      var s = function () {};

      this.rotate = a(this.element, n.rotate || s), this.touchStart = a(this.element, n.touchStart || s), this.multipointStart = a(this.element, n.multipointStart || s), this.multipointEnd = a(this.element, n.multipointEnd || s), this.pinch = a(this.element, n.pinch || s), this.swipe = a(this.element, n.swipe || s), this.tap = a(this.element, n.tap || s), this.doubleTap = a(this.element, n.doubleTap || s), this.longTap = a(this.element, n.longTap || s), this.singleTap = a(this.element, n.singleTap || s), this.pressMove = a(this.element, n.pressMove || s), this.twoFingerPressMove = a(this.element, n.twoFingerPressMove || s), this.touchMove = a(this.element, n.touchMove || s), this.touchEnd = a(this.element, n.touchEnd || s), this.touchCancel = a(this.element, n.touchCancel || s), this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
        x: null,
        y: null
      };
    }

    return n(t, [{
      key: "start",
      value: function (t) {
        if (t.touches) {
          this.now = Date.now(), this.x1 = t.touches[0].pageX, this.y1 = t.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(t, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
          var e = this.preV;

          if (t.touches.length > 1) {
            this._cancelLongTap(), this._cancelSingleTap();
            var i = {
              x: t.touches[1].pageX - this.x1,
              y: t.touches[1].pageY - this.y1
            };
            e.x = i.x, e.y = i.y, this.pinchStartLen = o(e), this.multipointStart.dispatch(t, this.element);
          }

          this._preventTap = !1, this.longTapTimeout = setTimeout(function () {
            this.longTap.dispatch(t, this.element), this._preventTap = !0;
          }.bind(this), 750);
        }
      }
    }, {
      key: "move",
      value: function (t) {
        if (t.touches) {
          var e = this.preV,
              i = t.touches.length,
              n = t.touches[0].pageX,
              s = t.touches[0].pageY;

          if (this.isDoubleTap = !1, i > 1) {
            var r = t.touches[1].pageX,
                a = t.touches[1].pageY,
                c = {
              x: t.touches[1].pageX - n,
              y: t.touches[1].pageY - s
            };
            null !== e.x && (this.pinchStartLen > 0 && (t.zoom = o(c) / this.pinchStartLen, this.pinch.dispatch(t, this.element)), t.angle = l(c, e), this.rotate.dispatch(t, this.element)), e.x = c.x, e.y = c.y, null !== this.x2 && null !== this.sx2 ? (t.deltaX = (n - this.x2 + r - this.sx2) / 2, t.deltaY = (s - this.y2 + a - this.sy2) / 2) : (t.deltaX = 0, t.deltaY = 0), this.twoFingerPressMove.dispatch(t, this.element), this.sx2 = r, this.sy2 = a;
          } else {
            if (null !== this.x2) {
              t.deltaX = n - this.x2, t.deltaY = s - this.y2;
              var h = Math.abs(this.x1 - this.x2),
                  u = Math.abs(this.y1 - this.y2);
              (h > 10 || u > 10) && (this._preventTap = !0);
            } else t.deltaX = 0, t.deltaY = 0;

            this.pressMove.dispatch(t, this.element);
          }

          this.touchMove.dispatch(t, this.element), this._cancelLongTap(), this.x2 = n, this.y2 = s, i > 1 && t.preventDefault();
        }
      }
    }, {
      key: "end",
      value: function (t) {
        if (t.changedTouches) {
          this._cancelLongTap();

          var e = this;
          t.touches.length < 2 && (this.multipointEnd.dispatch(t, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (t.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function () {
            e.swipe.dispatch(t, e.element);
          }, 0)) : (this.tapTimeout = setTimeout(function () {
            e._preventTap || e.tap.dispatch(t, e.element), e.isDoubleTap && (e.doubleTap.dispatch(t, e.element), e.isDoubleTap = !1);
          }, 0), e.isDoubleTap || (e.singleTapTimeout = setTimeout(function () {
            e.singleTap.dispatch(t, e.element);
          }, 250))), this.touchEnd.dispatch(t, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
        }
      }
    }, {
      key: "cancelAll",
      value: function () {
        this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
      }
    }, {
      key: "cancel",
      value: function (t) {
        this.cancelAll(), this.touchCancel.dispatch(t, this.element);
      }
    }, {
      key: "_cancelLongTap",
      value: function () {
        clearTimeout(this.longTapTimeout);
      }
    }, {
      key: "_cancelSingleTap",
      value: function () {
        clearTimeout(this.singleTapTimeout);
      }
    }, {
      key: "_swipeDirection",
      value: function (t, e, i, n) {
        return Math.abs(t - e) >= Math.abs(i - n) ? t - e > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down";
      }
    }, {
      key: "on",
      value: function (t, e) {
        this[t] && this[t].add(e);
      }
    }, {
      key: "off",
      value: function (t, e) {
        this[t] && this[t].del(e);
      }
    }, {
      key: "destroy",
      value: function () {
        return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
      }
    }]), t;
  }(),
      h = function () {
    function t(i, n) {
      var s = this,
          o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
      if (e(this, t), this.img = i, this.slide = n, this.onclose = o, this.img.setZoomEvents) return !1;
      this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function (t) {
        return s.dragStart(t);
      }, !1), this.img.addEventListener("mouseup", function (t) {
        return s.dragEnd(t);
      }, !1), this.img.addEventListener("mousemove", function (t) {
        return s.drag(t);
      }, !1), this.img.addEventListener("click", function (t) {
        if (!s.zoomedIn) return s.zoomIn();
        s.zoomedIn && !s.dragging && s.zoomOut();
      }, !1), this.img.setZoomEvents = !0;
    }

    return n(t, [{
      key: "zoomIn",
      value: function () {
        var t = this.widowWidth();

        if (!(this.zoomedIn || t <= 768)) {
          var e = this.img;

          if (e.setAttribute("data-style", e.getAttribute("style")), e.style.maxWidth = e.naturalWidth + "px", e.style.maxHeight = e.naturalHeight + "px", e.naturalWidth > t) {
            var i = t / 2 - e.naturalWidth / 2;
            this.setTranslate(this.img.parentNode, i, 0);
          }

          this.slide.classList.add("zoomed"), this.zoomedIn = !0;
        }
      }
    }, {
      key: "zoomOut",
      value: function () {
        this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose();
      }
    }, {
      key: "dragStart",
      value: function (t) {
        t.preventDefault(), this.zoomedIn ? ("touchstart" === t.type ? (this.initialX = t.touches[0].clientX - this.xOffset, this.initialY = t.touches[0].clientY - this.yOffset) : (this.initialX = t.clientX - this.xOffset, this.initialY = t.clientY - this.yOffset), t.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1;
      }
    }, {
      key: "dragEnd",
      value: function (t) {
        var e = this;
        t.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(function () {
          e.dragging = !1, e.img.isDragging = !1, e.img.classList.remove("dragging");
        }, 100);
      }
    }, {
      key: "drag",
      value: function (t) {
        this.active && (t.preventDefault(), "touchmove" === t.type ? (this.currentX = t.touches[0].clientX - this.initialX, this.currentY = t.touches[0].clientY - this.initialY) : (this.currentX = t.clientX - this.initialX, this.currentY = t.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
      }
    }, {
      key: "onMove",
      value: function (t) {
        if (this.zoomedIn) {
          var e = t.clientX - this.img.naturalWidth / 2,
              i = t.clientY - this.img.naturalHeight / 2;
          this.setTranslate(this.img, e, i);
        }
      }
    }, {
      key: "setTranslate",
      value: function (t, e, i) {
        t.style.transform = "translate3d(" + e + "px, " + i + "px, 0)";
      }
    }, {
      key: "widowWidth",
      value: function () {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      }
    }]), t;
  }(),
      u = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
      d = null !== u || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
      g = document.getElementsByTagName("html")[0],
      p = function () {
    var t,
        e = document.createElement("fakeelement"),
        i = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in i) if (void 0 !== e.style[t]) return i[t];
  }(),
      v = function () {
    var t,
        e = document.createElement("fakeelement"),
        i = {
      animation: "animationend",
      OAnimation: "oAnimationEnd",
      MozAnimation: "animationend",
      WebkitAnimation: "webkitAnimationEnd"
    };

    for (t in i) if (void 0 !== e.style[t]) return i[t];
  }(),
      f = Date.now(),
      m = {},
      y = {
    selector: ".glightbox",
    elements: null,
    skin: "clean",
    closeButton: !0,
    startAt: null,
    autoplayVideos: !0,
    descPosition: "bottom",
    width: "900px",
    height: "506px",
    videosWidth: "960px",
    beforeSlideChange: null,
    afterSlideChange: null,
    beforeSlideLoad: null,
    afterSlideLoad: null,
    onOpen: null,
    onClose: null,
    loop: !1,
    touchNavigation: !0,
    touchFollowAxis: !0,
    keyboardNavigation: !0,
    closeOnOutsideClick: !0,
    plyr: {
      css: "https://cdn.plyr.io/3.5.6/plyr.css",
      js: "https://cdn.plyr.io/3.5.6/plyr.js",
      config: {
        ratio: "16:9",
        youtube: {
          noCookie: !0,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        },
        vimeo: {
          byline: !1,
          portrait: !1,
          title: !1,
          transparent: !1
        }
      }
    },
    openEffect: "zoomIn",
    closeEffect: "zoomOut",
    slideEffect: "slide",
    moreText: "See more",
    moreLength: 60,
    lightboxHtml: "",
    cssEfects: {
      fade: {
        in: "fadeIn",
        out: "fadeOut"
      },
      zoom: {
        in: "zoomIn",
        out: "zoomOut"
      },
      slide: {
        in: "slideInRight",
        out: "slideOutLeft"
      },
      slide_back: {
        in: "slideInLeft",
        out: "slideOutRight"
      }
    },
    svg: {
      close: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
      next: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
      prev: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
    }
  };

  y.slideHtml = '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

  function b() {
    var t = {},
        e = !0,
        i = 0,
        n = arguments.length;
    "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], i++);

    for (var s = function (i) {
      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e && "[object Object]" === Object.prototype.toString.call(i[n]) ? t[n] = b(!0, t[n], i[n]) : t[n] = i[n]);
    }; i < n; i++) {
      s(arguments[i]);
    }

    return t;
  }

  y.lightboxHtml = '<div id="glightbox-body" class="glightbox-container">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gnext gbtn" tabindex="0">{nextSVG}</button>\n    <button class="gprev gbtn" tabindex="1">{prevSVG}</button>\n    <button class="gclose gbtn" tabindex="2">{closeSVG}</button>\n</div>\n</div>';
  var x = {
    isFunction: function (t) {
      return "function" == typeof t;
    },
    isString: function (t) {
      return "string" == typeof t;
    },
    isNode: function (t) {
      return !(!t || !t.nodeType || 1 != t.nodeType);
    },
    isArray: function (t) {
      return Array.isArray(t);
    },
    isArrayLike: function (t) {
      return t && t.length && isFinite(t.length);
    },
    isObject: function (e) {
      return "object" === t(e) && null != e && !x.isFunction(e) && !x.isArray(e);
    },
    isNil: function (t) {
      return null == t;
    },
    has: function (t, e) {
      return null !== t && hasOwnProperty.call(t, e);
    },
    size: function (t) {
      if (x.isObject(t)) {
        if (t.keys) return t.keys().length;
        var e = 0;

        for (var i in t) x.has(t, i) && e++;

        return e;
      }

      return t.length;
    },
    isNumber: function (t) {
      return !isNaN(parseFloat(t)) && isFinite(t);
    }
  };

  function w(t, e) {
    if ((x.isNode(t) || t === window || t === document) && (t = [t]), x.isArrayLike(t) || x.isObject(t) || (t = [t]), 0 != x.size(t)) if (x.isArrayLike(t) && !x.isObject(t)) for (var i = t.length, n = 0; n < i && !1 !== e.call(t[n], t[n], n, t); n++);else if (x.isObject(t)) for (var s in t) if (x.has(t, s) && !1 === e.call(t[s], t[s], s, t)) break;
  }

  function S(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
        n = t[f] = t[f] || [],
        s = {
      all: n,
      evt: null,
      found: null
    };
    return e && i && x.size(n) > 0 && w(n, function (t, n) {
      if (t.eventName == e && t.fn.toString() == i.toString()) return s.found = !0, s.evt = n, !1;
    }), s;
  }

  function T(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        i = e.onElement,
        n = e.withCallback,
        s = e.avoidDuplicate,
        o = void 0 === s || s,
        l = e.once,
        r = void 0 !== l && l,
        a = e.useCapture,
        c = void 0 !== a && a,
        h = arguments.length > 2 ? arguments[2] : void 0,
        u = i || [];

    function d(t) {
      x.isFunction(n) && n.call(h, t, this), r && d.destroy();
    }

    return x.isString(u) && (u = document.querySelectorAll(u)), d.destroy = function () {
      w(u, function (e) {
        var i = S(e, t, d);
        i.found && i.all.splice(i.evt, 1), e.removeEventListener && e.removeEventListener(t, d, c);
      });
    }, w(u, function (e) {
      var i = S(e, t, d);
      (e.addEventListener && o && !i.found || !o) && (e.addEventListener(t, d, c), i.all.push({
        eventName: t,
        fn: d
      }));
    }), d;
  }

  function k(t, e) {
    w(e.split(" "), function (e) {
      return t.classList.add(e);
    });
  }

  function E(t, e) {
    w(e.split(" "), function (e) {
      return t.classList.remove(e);
    });
  }

  function A(t, e) {
    return t.classList.contains(e);
  }

  function C(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (!t || "" === e) return !1;
    if ("none" == e) return x.isFunction(i) && i(), !1;
    var n = e.split(" ");
    w(n, function (e) {
      k(t, "g" + e);
    }), T(v, {
      onElement: t,
      avoidDuplicate: !1,
      once: !0,
      withCallback: function (t, e) {
        w(n, function (t) {
          E(e, "g" + t);
        }), x.isFunction(i) && i();
      }
    });
  }

  function L(t) {
    var e = document.createDocumentFragment(),
        i = document.createElement("div");

    for (i.innerHTML = t; i.firstChild;) e.appendChild(i.firstChild);

    return e;
  }

  function M(t, e) {
    for (; t !== document.body;) {
      if ("function" == typeof (t = t.parentElement).matches ? t.matches(e) : t.msMatchesSelector(e)) return t;
    }
  }

  function O(t) {
    t.style.display = "block";
  }

  function N(t) {
    t.style.display = "none";
  }

  function z() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
  }

  function q(t) {
    if (A(t.target, "plyr--html5")) {
      var e = M(t.target, ".gslide-media");
      "enterfullscreen" == t.type && k(e, "fullscreen"), "exitfullscreen" == t.type && E(e, "fullscreen");
    }
  }

  function I(t) {
    return x.isNumber(t) ? "".concat(t, "px") : t;
  }

  function D(t, e) {
    var i = "video" == t.type ? I(e.videosWidth) : I(e.width),
        n = I(e.height);
    return t.width = x.has(t, "width") && "" !== t.width ? I(t.width) : i, t.height = x.has(t, "height") && "" !== t.height ? I(t.height) : n, t;
  }

  var X = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        e = arguments.length > 1 ? arguments[1] : void 0,
        i = {
      href: "",
      title: "",
      type: "",
      description: "",
      descPosition: e.descPosition,
      effect: "",
      width: "",
      height: "",
      node: t,
      content: !1
    };

    if (x.isObject(t) && !x.isNode(t)) {
      x.has(t, "type") || (x.has(t, "content") && t.content ? t.type = "inline" : x.has(t, "href") && (t.type = W(t.href)));
      var n = b(i, t);
      return D(n, e), n;
    }

    var s = "",
        o = t.getAttribute("data-glightbox"),
        l = t.nodeName.toLowerCase();

    if ("a" === l && (s = t.href), "img" === l && (s = t.src), i.href = s, w(i, function (n, s) {
      x.has(e, s) && "width" !== s && (i[s] = e[s]);
      var o = t.dataset[s];
      x.isNil(o) || (i[s] = o);
    }), i.content && (i.type = "inline"), !i.type && s && (i.type = W(s)), x.isNil(o)) {
      if ("a" == l) {
        var r = t.title;
        x.isNil(r) || "" === r || (i.title = r);
      }

      if ("img" == l) {
        var a = t.alt;
        x.isNil(a) || "" === a || (i.title = a);
      }

      var c = t.getAttribute("data-description");
      x.isNil(c) || "" === c || (i.description = c);
    } else {
      var h = [];
      w(i, function (t, e) {
        h.push(";\\s?" + e);
      }), h = h.join("\\s?:|"), "" !== o.trim() && w(i, function (t, e) {
        var n = o,
            s = new RegExp("s?" + e + "s?:s?(.*?)(" + h + "s?:|$)"),
            l = n.match(s);

        if (l && l.length && l[1]) {
          var r = l[1].trim().replace(/;\s*$/, "");
          i[e] = r;
        }
      });
    }

    if (i.description && "." == i.description.substring(0, 1) && document.querySelector(i.description)) i.description = document.querySelector(i.description).innerHTML;else {
      var u = t.querySelector(".glightbox-desc");
      u && (i.description = u.innerHTML);
    }
    return D(i, e), i;
  },
      Y = function () {
    var t = this,
        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (A(e, "loaded")) return !1;
    x.isFunction(this.settings.beforeSlideLoad) && this.settings.beforeSlideLoad(e, i);
    var s = i.type,
        o = i.descPosition,
        l = e.querySelector(".gslide-media"),
        r = e.querySelector(".gslide-title"),
        a = e.querySelector(".gslide-desc"),
        c = e.querySelector(".gdesc-inner"),
        d = n;
    if (x.isFunction(this.settings.afterSlideLoad) && (d = function () {
      x.isFunction(n) && n(), t.settings.afterSlideLoad(e, i);
    }), "" == i.title && "" == i.description ? c && c.parentNode.parentNode.removeChild(c.parentNode) : (r && "" !== i.title ? r.innerHTML = i.title : r.parentNode.removeChild(r), a && "" !== i.description ? u && this.settings.moreLength > 0 ? (i.smallDescription = R(i.description, this.settings.moreLength, this.settings.moreText), a.innerHTML = i.smallDescription, $.apply(this, [a, i])) : a.innerHTML = i.description : a.parentNode.removeChild(a), k(l.parentNode, "desc-".concat(o)), k(c.parentNode, "description-".concat(o))), k(l, "gslide-".concat(s)), k(e, "loaded"), "video" === s) return k(l.parentNode, "gvideo-container"), l.insertBefore(L('<div class="gvideo-wrapper"></div>'), l.firstChild), void P.apply(this, [e, i, d]);

    if ("external" === s) {
      var g = B({
        url: i.href,
        callback: d
      });
      return l.parentNode.style.maxWidth = i.width, l.parentNode.style.height = i.height, void l.appendChild(g);
    }

    if ("inline" !== s) {
      if ("image" === s) {
        var p = new Image();
        return p.addEventListener("load", function () {
          !u && p.naturalWidth > p.offsetWidth && (k(p, "zoomable"), new h(p, e, function () {
            t.resize(e);
          })), x.isFunction(d) && d();
        }, !1), p.src = i.href, void l.insertBefore(p, l.firstChild);
      }

      x.isFunction(d) && d();
    } else j.apply(this, [e, i, d]);
  };

  function P(t, e, i) {
    var n = this,
        s = "gvideo" + e.index,
        o = t.querySelector(".gvideo-wrapper");
    F(this.settings.plyr.css);
    var l = e.href,
        r = location.protocol.replace(":", ""),
        a = "",
        c = "",
        h = !1;
    "file" == r && (r = "http"), o.parentNode.style.maxWidth = e.width, F(this.settings.plyr.js, "Plyr", function () {
      if (l.match(/vimeo\.com\/([0-9]*)/)) {
        var t = /vimeo.*\/(\d+)/i.exec(l);
        a = "vimeo", c = t[1];
      }

      if (l.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || l.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || l.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
        var r = function (t) {
          var e = "";
          e = void 0 !== (t = t.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2] ? (e = t[2].split(/[^0-9a-z_\-]/i))[0] : t;
          return e;
        }(l);

        a = "youtube", c = r;
      }

      if (null !== l.match(/\.(mp4|ogg|webm|mov)$/)) {
        a = "local";
        var u = '<video id="' + s + '" ';
        u += 'style="background:#000; max-width: '.concat(e.width, ';" '), u += 'preload="metadata" ', u += 'x-webkit-airplay="allow" ', u += 'webkit-playsinline="" ', u += "controls ", u += 'class="gvideo-local">';
        var d = l.toLowerCase().split(".").pop(),
            g = {
          mp4: "",
          ogg: "",
          webm: ""
        };

        for (var p in g[d = "mov" == d ? "mp4" : d] = l, g) if (g.hasOwnProperty(p)) {
          var v = g[p];
          e.hasOwnProperty(p) && (v = e[p]), "" !== v && (u += '<source src="'.concat(v, '" type="video/').concat(p, '">'));
        }

        h = L(u += "</video>");
      }

      var f = h || L('<div id="'.concat(s, '" data-plyr-provider="').concat(a, '" data-plyr-embed-id="').concat(c, '"></div>'));
      k(o, "".concat(a, "-video gvideo")), o.appendChild(f), o.setAttribute("data-id", s);
      var y = x.has(n.settings.plyr, "config") ? n.settings.plyr.config : {},
          b = new Plyr("#" + s, y);
      b.on("ready", function (t) {
        var e = t.detail.plyr;
        m[s] = e, x.isFunction(i) && i();
      }), b.on("enterfullscreen", q), b.on("exitfullscreen", q);
    });
  }

  function B(t) {
    var e = t.url,
        i = t.allow,
        n = t.callback,
        s = t.appendTo,
        o = document.createElement("iframe");
    return o.className = "vimeo-video gvideo", o.src = e, o.style.width = "100%", o.style.height = "100%", i && o.setAttribute("allow", i), o.onload = function () {
      k(o, "node-ready"), x.isFunction(n) && n();
    }, s && s.appendChild(o), o;
  }

  function F(t, e, i) {
    if (x.isNil(t)) console.error("Inject videos api error");else {
      var n;

      if (x.isFunction(e) && (i = e, e = !1), -1 !== t.indexOf(".css")) {
        if ((n = document.querySelectorAll('link[href="' + t + '"]')) && n.length > 0) return void (x.isFunction(i) && i());
        var s = document.getElementsByTagName("head")[0],
            o = s.querySelectorAll('link[rel="stylesheet"]'),
            l = document.createElement("link");
        return l.rel = "stylesheet", l.type = "text/css", l.href = t, l.media = "all", o ? s.insertBefore(l, o[0]) : s.appendChild(l), void (x.isFunction(i) && i());
      }

      if ((n = document.querySelectorAll('script[src="' + t + '"]')) && n.length > 0) {
        if (x.isFunction(i)) {
          if (x.isString(e)) return _(function () {
            return void 0 !== window[e];
          }, function () {
            i();
          }), !1;
          i();
        }
      } else {
        var r = document.createElement("script");
        r.type = "text/javascript", r.src = t, r.onload = function () {
          if (x.isFunction(i)) {
            if (x.isString(e)) return _(function () {
              return void 0 !== window[e];
            }, function () {
              i();
            }), !1;
            i();
          }
        }, document.body.appendChild(r);
      }
    }
  }

  function _(t, e, i, n) {
    if (t()) e();else {
      var s;
      i || (i = 100);
      var o = setInterval(function () {
        t() && (clearInterval(o), s && clearTimeout(s), e());
      }, i);
      n && (s = setTimeout(function () {
        clearInterval(o);
      }, n));
    }
  }

  function j(t, e, i) {
    var n,
        s = this,
        o = t.querySelector(".gslide-media"),
        l = !(!x.has(e, "href") || !e.href) && e.href.split("#").pop().trim(),
        r = !(!x.has(e, "content") || !e.content) && e.content;

    if (r && (x.isString(r) && (n = L('<div class="ginlined-content">'.concat(r, "</div>"))), x.isNode(r))) {
      "none" == r.style.display && (r.style.display = "block");
      var a = document.createElement("div");
      a.className = "ginlined-content", a.appendChild(r), n = a;
    }

    if (l) {
      var c = document.getElementById(l);
      if (!c) return !1;
      var h = c.cloneNode(!0);
      h.style.height = e.height, h.style.maxWidth = e.width, k(h, "ginlined-content"), n = h;
    }

    if (!n) return console.error("Unable to append inline slide content", e), !1;
    o.style.height = e.height, o.style.width = e.width, o.appendChild(n), this.events["inlineclose" + l] = T("click", {
      onElement: o.querySelectorAll(".gtrigger-close"),
      withCallback: function (t) {
        t.preventDefault(), s.close();
      }
    }), x.isFunction(i) && i();
  }

  var W = function (t) {
    var e = t;
    if (null !== (t = t.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/)) return "image";
    if (t.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || t.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || t.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) return "video";
    if (t.match(/vimeo\.com\/([0-9]*)/)) return "video";
    if (null !== t.match(/\.(mp4|ogg|webm|mov)$/)) return "video";
    if (t.indexOf("#") > -1 && "" !== e.split("#").pop().trim()) return "inline";
    return t.includes("gajax=true") ? "ajax" : "external";
  };

  function H() {
    var t = this;
    if (this.events.hasOwnProperty("keyboard")) return !1;
    this.events.keyboard = T("keydown", {
      onElement: window,
      withCallback: function (e, i) {
        var n = (e = e || window.event).keyCode;

        if (9 == n) {
          var o = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
          if ("input" == o || "textarea" == o || "button" == o) return;
          e.preventDefault();
          var l = document.querySelectorAll(".gbtn");
          if (!l || l.length <= 0) return;
          var r = s(l).filter(function (t) {
            return A(t, "focused");
          });

          if (!r.length) {
            var a = document.querySelector('.gbtn[tabindex="0"]');
            return void (a && (a.focus(), k(a, "focused")));
          }

          l.forEach(function (t) {
            return E(t, "focused");
          });
          var c = r[0].getAttribute("tabindex");
          c = c || "0";
          var h = parseInt(c) + 1;
          h > l.length - 1 && (h = "0");
          var u = document.querySelector('.gbtn[tabindex="'.concat(h, '"]'));
          u && (u.focus(), k(u, "focused"));
        }

        39 == n && t.nextSlide(), 37 == n && t.prevSlide(), 27 == n && t.close();
      }
    });
  }

  function V() {
    var t = this;
    if (this.events.hasOwnProperty("touch")) return !1;
    var e,
        i,
        n,
        s = z(),
        o = s.width,
        l = s.height,
        r = !1,
        a = null,
        h = null,
        u = null,
        d = !1,
        g = 1,
        p = 1,
        v = !1,
        f = !1,
        m = null,
        y = null,
        b = null,
        x = null,
        w = 0,
        S = 0,
        T = !1,
        C = !1,
        L = {},
        O = {},
        N = 0,
        q = 0,
        I = this,
        D = document.getElementById("glightbox-slider"),
        X = document.querySelector(".goverlay"),
        Y = (this.loop(), new c(D, {
      touchStart: function (t) {
        if (A(t.targetTouches[0].target, "ginner-container") || M(t.targetTouches[0].target, ".gslide-desc")) return r = !1, !1;
        r = !0, O = t.targetTouches[0], L.pageX = t.targetTouches[0].pageX, L.pageY = t.targetTouches[0].pageY, N = t.targetTouches[0].clientX, q = t.targetTouches[0].clientY, a = I.activeSlide, h = a.querySelector(".gslide-media"), n = a.querySelector(".gslide-inline"), u = null, A(h, "gslide-image") && (u = h.querySelector("img")), E(X, "greset");
      },
      touchMove: function (s) {
        if (r && (O = s.targetTouches[0], !v && !f)) {
          if (n && n.offsetHeight > l) {
            var a = L.pageX - O.pageX;
            if (Math.abs(a) <= 13) return !1;
          }

          d = !0;
          var c,
              g = s.targetTouches[0].clientX,
              p = s.targetTouches[0].clientY,
              m = N - g,
              y = q - p;
          if (Math.abs(m) > Math.abs(y) ? (T = !1, C = !0) : (C = !1, T = !0), e = O.pageX - L.pageX, w = 100 * e / o, i = O.pageY - L.pageY, S = 100 * i / l, T && u && (c = 1 - Math.abs(i) / l, X.style.opacity = c, t.settings.touchFollowAxis && (w = 0)), C && (c = 1 - Math.abs(e) / o, h.style.opacity = c, t.settings.touchFollowAxis && (S = 0)), !u) return G(h, "translate3d(".concat(w, "%, 0, 0)"));
          G(h, "translate3d(".concat(w, "%, ").concat(S, "%, 0)"));
        }
      },
      touchEnd: function () {
        if (r) {
          if (d = !1, f || v) return b = m, void (x = y);
          var e = Math.abs(parseInt(S)),
              i = Math.abs(parseInt(w));
          if (!(e > 29 && u)) return e < 29 && i < 25 ? (k(X, "greset"), X.style.opacity = 1, Z(h)) : void 0;
          t.close();
        }
      },
      multipointEnd: function () {
        setTimeout(function () {
          v = !1;
        }, 50);
      },
      multipointStart: function () {
        v = !0, g = p || 1;
      },
      pinch: function (t) {
        if (!u || d) return !1;
        v = !0, u.scaleX = u.scaleY = g * t.zoom;
        var e = g * t.zoom;
        if (f = !0, e <= 1) return f = !1, e = 1, x = null, b = null, m = null, y = null, void u.setAttribute("style", "");
        e > 4.5 && (e = 4.5), u.style.transform = "scale3d(".concat(e, ", ").concat(e, ", 1)"), p = e;
      },
      pressMove: function (t) {
        if (f && !v) {
          var e = O.pageX - L.pageX,
              i = O.pageY - L.pageY;
          b && (e += b), x && (i += x), m = e, y = i;
          var n = "translate3d(".concat(e, "px, ").concat(i, "px, 0)");
          p && (n += " scale3d(".concat(p, ", ").concat(p, ", 1)")), G(u, n);
        }
      },
      swipe: function (e) {
        if (!f) if (v) v = !1;else {
          if ("Left" == e.direction) {
            if (t.index == t.elements.length - 1) return Z(h);
            t.nextSlide();
          }

          if ("Right" == e.direction) {
            if (0 == t.index) return Z(h);
            t.prevSlide();
          }
        }
      }
    }));
    this.events.touch = Y;
  }

  function G(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if ("" == e) return t.style.webkitTransform = "", t.style.MozTransform = "", t.style.msTransform = "", t.style.OTransform = "", t.style.transform = "", !1;
    t.style.webkitTransform = e, t.style.MozTransform = e, t.style.msTransform = e, t.style.OTransform = e, t.style.transform = e;
  }

  function Z(t) {
    var e = A(t, "gslide-media") ? t : t.querySelector(".gslide-media"),
        i = t.querySelector(".gslide-description");
    k(e, "greset"), G(e, "translate3d(0, 0, 0)");
    T(p, {
      onElement: e,
      once: !0,
      withCallback: function (t, i) {
        E(e, "greset");
      }
    });
    e.style.opacity = "", i && (i.style.opacity = "");
  }

  function R(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        n = i;
    if ((t = t.trim()).length <= e) return t;
    var s = t.substr(0, e - 1);
    return n ? s + '... <a href="#" class="desc-more">' + i + "</a>" : s;
  }

  function $(t, e) {
    var i = t.querySelector(".desc-more");
    if (!i) return !1;
    T("click", {
      onElement: i,
      withCallback: function (t, i) {
        t.preventDefault();
        var n = document.body,
            s = M(i, ".gslide-desc");
        if (!s) return !1;
        s.innerHTML = e.description, k(n, "gdesc-open");
        var o = T("click", {
          onElement: [n, M(s, ".gslide-description")],
          withCallback: function (t, i) {
            "a" !== t.target.nodeName.toLowerCase() && (E(n, "gdesc-open"), k(n, "gdesc-closed"), s.innerHTML = e.smallDescription, $(s, e), setTimeout(function () {
              E(n, "gdesc-closed");
            }, 400), o.destroy());
          }
        });
      }
    });
  }

  var U = function () {
    function t() {
      var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      e(this, t), this.settings = b(y, i), this.effectsClasses = this.getAnimationClasses(), this.slidesData = {};
    }

    return n(t, [{
      key: "init",
      value: function () {
        var t = this;
        this.baseEvents = T("click", {
          onElement: this.getSelector(),
          withCallback: function (e, i) {
            e.preventDefault(), t.open(i);
          }
        });
      }
    }, {
      key: "open",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (this.elements = this.getElements(t), 0 == this.elements.length) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var i = e || this.settings.startAt;
        t && x.isNil(i) && (i = this.elements.indexOf(t)) < 0 && (i = 0), x.isNil(i) && (i = 0), this.build(), C(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in);
        var n = document.body,
            s = window.innerWidth - document.documentElement.clientWidth;

        if (s > 0) {
          var o = document.createElement("style");
          o.type = "text/css", o.className = "gcss-styles", o.innerText = ".gscrollbar-fixer {margin-right: ".concat(s, "px}"), document.head.appendChild(o), k(n, "gscrollbar-fixer");
        }

        if (k(n, "glightbox-open"), k(g, "glightbox-open"), u && (k(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i, !0), 1 == this.elements.length ? (N(this.prevButton), N(this.nextButton)) : (O(this.prevButton), O(this.nextButton)), this.lightboxOpen = !0, x.isFunction(this.settings.onOpen) && this.settings.onOpen(), u && d && this.settings.touchNavigation) return V.apply(this), !1;
        this.settings.keyboardNavigation && H.apply(this);
      }
    }, {
      key: "openAt",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.open(null, t);
      }
    }, {
      key: "showSlide",
      value: function () {
        var t = this,
            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        O(this.loader), this.index = parseInt(e);
        var n = this.slidesContainer.querySelector(".current");
        n && E(n, "current"), this.slideAnimateOut();
        var s = this.slidesContainer.querySelectorAll(".gslide")[e];
        if (A(s, "loaded")) this.slideAnimateIn(s, i), N(this.loader);else {
          O(this.loader);
          var o = X(this.elements[e], this.settings);
          o.index = e, this.slidesData[e] = o, Y.apply(this, [s, o, function () {
            N(t.loader), t.resize(), t.slideAnimateIn(s, i);
          }]);
        }
        this.slideDescription = s.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && A(this.slideDescription.parentNode, "gslide-media"), this.preloadSlide(e + 1), this.preloadSlide(e - 1);
        var l = this.loop();
        E(this.nextButton, "disabled"), E(this.prevButton, "disabled"), 0 !== e || l ? e !== this.elements.length - 1 || l || k(this.nextButton, "disabled") : k(this.prevButton, "disabled"), this.activeSlide = s;
      }
    }, {
      key: "preloadSlide",
      value: function (t) {
        var e = this;
        if (t < 0 || t > this.elements.length) return !1;
        if (x.isNil(this.elements[t])) return !1;
        var i = this.slidesContainer.querySelectorAll(".gslide")[t];
        if (A(i, "loaded")) return !1;
        var n = X(this.elements[t], this.settings);
        n.index = t, this.slidesData[t] = n;
        var s = n.sourcetype;
        "video" == s || "external" == s ? setTimeout(function () {
          Y.apply(e, [i, n]);
        }, 200) : Y.apply(this, [i, n]);
      }
    }, {
      key: "prevSlide",
      value: function () {
        this.goToSlide(this.index - 1);
      }
    }, {
      key: "nextSlide",
      value: function () {
        this.goToSlide(this.index + 1);
      }
    }, {
      key: "goToSlide",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index;
        var e = this.loop();
        if (!e && (t < 0 || t > this.elements.length - 1)) return !1;
        t < 0 ? t = this.elements.length - 1 : t >= this.elements.length && (t = 0), this.showSlide(t);
      }
    }, {
      key: "insertSlide",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
        this.tmpAddSlides || (this.tmpAddSlides = []), t.atPosition = e, this.tmpAddSlides.push(t);
      }
    }, {
      key: "slideAnimateIn",
      value: function (t, e) {
        var i = this,
            n = t.querySelector(".gslide-media"),
            s = t.querySelector(".gslide-description"),
            o = {
          index: this.prevActiveSlideIndex,
          slide: this.prevActiveSlide
        },
            l = {
          index: this.index,
          slide: this.activeSlide
        };
        if (n.offsetWidth > 0 && s && (N(s), s.style.display = ""), E(t, this.effectsClasses), e) C(t, this.settings.openEffect, function () {
          !u && i.settings.autoplayVideos && i.playSlideVideo(t), x.isFunction(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [o, l]);
        });else {
          var r = this.settings.slideEffect,
              a = "none" !== r ? this.settings.cssEfects[r].in : r;
          this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (a = this.settings.cssEfects.slide_back.in), C(t, a, function () {
            !u && i.settings.autoplayVideos && i.playSlideVideo(t), x.isFunction(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [o, l]);
          });
        }
        setTimeout(function () {
          i.resize(t);
        }, 100), k(t, "current");
      }
    }, {
      key: "slideAnimateOut",
      value: function () {
        if (!this.prevActiveSlide) return !1;
        var t = this.prevActiveSlide;
        E(t, this.effectsClasses), k(t, "prev");
        var e = this.settings.slideEffect,
            i = "none" !== e ? this.settings.cssEfects[e].out : e;
        this.stopSlideVideo(t), x.isFunction(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
          index: this.prevActiveSlideIndex,
          slide: this.prevActiveSlide
        }, {
          index: this.index,
          slide: this.activeSlide
        }]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (i = this.settings.cssEfects.slide_back.out), C(t, i, function () {
          var e = t.querySelector(".gslide-media"),
              i = t.querySelector(".gslide-description");
          e.style.transform = "", E(e, "greset"), e.style.opacity = "", i && (i.style.opacity = ""), E(t, "prev");
        });
      }
    }, {
      key: "stopSlideVideo",
      value: function (t) {
        x.isNumber(t) && (t = this.slidesContainer.querySelectorAll(".gslide")[t]);
        var e = t ? t.querySelector(".gvideo") : null;
        if (!e) return !1;
        var i = e.getAttribute("data-id");

        if (m && x.has(m, i)) {
          var n = m[i];
          n && n.play && n.pause();
        }
      }
    }, {
      key: "playSlideVideo",
      value: function (t) {
        x.isNumber(t) && (t = this.slidesContainer.querySelectorAll(".gslide")[t]);
        var e = t.querySelector(".gvideo");
        if (!e) return !1;
        var i = e.getAttribute("data-id");

        if (m && x.has(m, i)) {
          var n = m[i];
          n && n.play && n.play();
        }
      }
    }, {
      key: "setElements",
      value: function (t) {
        this.settings.elements = t;
      }
    }, {
      key: "getElements",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            e = [];
        this.elements = this.elements ? this.elements : [], !x.isNil(this.settings.elements) && x.isArray(this.settings.elements) && (e = this.settings.elements);
        var i = !1,
            n = this.getSelector();

        if (null !== t) {
          var s = t.getAttribute("data-gallery");
          s && "" !== s && (i = document.querySelectorAll('[data-gallery="'.concat(s, '"]')));
        }

        return 0 == i && n && (i = document.querySelectorAll(this.getSelector())), i = Array.prototype.slice.call(i), e = e.concat(i), this.tmpAddSlides && this.tmpAddSlides.length && (w(this.tmpAddSlides, function (t) {
          var i = t.atPosition < 0 ? e.length + 1 : t.atPosition;
          e.splice(i, 0, b({}, t));
        }), this.tmpAddSlides.length = 0), e;
      }
    }, {
      key: "getSelector",
      value: function () {
        return "data-" == this.settings.selector.substring(0, 5) ? "*[".concat(this.settings.selector, "]") : this.settings.selector;
      }
    }, {
      key: "getActiveSlide",
      value: function () {
        return this.slidesContainer.querySelectorAll(".gslide")[this.index];
      }
    }, {
      key: "getActiveSlideIndex",
      value: function () {
        return this.index;
      }
    }, {
      key: "getAnimationClasses",
      value: function () {
        var t = [];

        for (var e in this.settings.cssEfects) if (this.settings.cssEfects.hasOwnProperty(e)) {
          var i = this.settings.cssEfects[e];
          t.push("g".concat(i.in)), t.push("g".concat(i.out));
        }

        return t.join(" ");
      }
    }, {
      key: "build",
      value: function () {
        var t = this;
        if (this.built) return !1;
        var e = x.has(this.settings.svg, "next") ? this.settings.svg.next : "",
            i = x.has(this.settings.svg, "prev") ? this.settings.svg.prev : "",
            n = x.has(this.settings.svg, "close") ? this.settings.svg.close : "",
            s = this.settings.lightboxHtml;
        s = L(s = (s = (s = s.replace(/{nextSVG}/g, e)).replace(/{prevSVG}/g, i)).replace(/{closeSVG}/g, n)), document.body.appendChild(s);
        var o = document.getElementById("glightbox-body");
        this.modal = o;
        var l = o.querySelector(".gclose");
        this.prevButton = o.querySelector(".gprev"), this.nextButton = o.querySelector(".gnext"), this.overlay = o.querySelector(".goverlay"), this.loader = o.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.events = {}, k(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && l && (this.events.close = T("click", {
          onElement: l,
          withCallback: function (e, i) {
            e.preventDefault(), t.close();
          }
        })), l && !this.settings.closeButton && l.parentNode.removeChild(l), this.nextButton && (this.events.next = T("click", {
          onElement: this.nextButton,
          withCallback: function (e, i) {
            e.preventDefault(), t.nextSlide();
          }
        })), this.prevButton && (this.events.prev = T("click", {
          onElement: this.prevButton,
          withCallback: function (e, i) {
            e.preventDefault(), t.prevSlide();
          }
        })), this.settings.closeOnOutsideClick && (this.events.outClose = T("click", {
          onElement: o,
          withCallback: function (e, i) {
            A(document.body, "glightbox-mobile") || M(e.target, ".ginner-container") || M(e.target, ".gbtn") || A(e.target, "gnext") || A(e.target, "gprev") || t.close();
          }
        })), w(this.elements, function () {
          var e = L(t.settings.slideHtml);
          t.slidesContainer.appendChild(e);
        }), d && k(document.body, "glightbox-touch"), this.events.resize = T("resize", {
          onElement: window,
          withCallback: function () {
            t.resize();
          }
        }), this.built = !0;
      }
    }, {
      key: "resize",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;

        if ((t = t || this.activeSlide) && !A(t, "zoomed")) {
          var e = z(),
              i = t.querySelector(".gvideo-wrapper"),
              n = t.querySelector(".gslide-image"),
              s = this.slideDescription,
              o = e.width,
              l = e.height;

          if (o <= 768 ? k(document.body, "glightbox-mobile") : E(document.body, "glightbox-mobile"), i || n) {
            var r = !1;
            if (s && (A(s, "description-bottom") || A(s, "description-top")) && !A(s, "gabsolute") && (r = !0), n) if (o <= 768) {
              var a = n.querySelector("img");
              a.setAttribute("style", "");
            } else if (r) {
              var c = s.offsetHeight,
                  h = this.slidesData[this.index].width;
              h = h <= o ? h + "px" : "100%";
              var u = n.querySelector("img");
              u.setAttribute("style", "max-height: calc(100vh - ".concat(c, "px)")), s.setAttribute("style", "max-width: ".concat(u.offsetWidth, "px;"));
            }

            if (i) {
              var d = x.has(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "16:9",
                  g = d.split(":"),
                  p = this.slidesData[this.index].width,
                  v = p / (parseInt(g[0]) / parseInt(g[1]));

              if (v = Math.floor(v), r && (l -= s.offsetHeight), l < v && o > p) {
                var f = i.offsetWidth,
                    m = i.offsetHeight,
                    y = l / m,
                    b = {
                  width: f * y,
                  height: m * y
                };
                i.parentNode.setAttribute("style", "max-width: ".concat(b.width, "px")), r && s.setAttribute("style", "max-width: ".concat(b.width, "px;"));
              } else i.parentNode.style.maxWidth = "".concat(p, "px"), r && s.setAttribute("style", "max-width: ".concat(p, "px;"));
            }
          }
        }
      }
    }, {
      key: "reload",
      value: function () {
        this.init();
      }
    }, {
      key: "loop",
      value: function () {
        var t = x.has(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return t = x.has(this.settings, "loop") ? this.settings.loop : t, t;
      }
    }, {
      key: "close",
      value: function () {
        var t = this;
        if (this.closing) return !1;
        this.closing = !0, this.stopSlideVideo(this.activeSlide), k(this.modal, "glightbox-closing"), C(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), C(this.activeSlide, this.settings.closeEffect, function () {
          if (t.activeSlide = null, t.prevActiveSlideIndex = null, t.prevActiveSlide = null, t.built = !1, t.events) {
            for (var e in t.events) t.events.hasOwnProperty(e) && t.events[e].destroy();

            t.events = null;
          }

          var i = document.body;
          E(g, "glightbox-open"), E(i, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), t.modal.parentNode.removeChild(t.modal), x.isFunction(t.settings.onClose) && t.settings.onClose();
          var n = document.querySelector(".gcss-styles");
          n && n.parentNode.removeChild(n), t.closing = null;
        });
      }
    }, {
      key: "destroy",
      value: function () {
        this.close(), this.baseEvents.destroy();
      }
    }]), t;
  }();

  return function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        e = new U(t);
    return e.init(), e;
  };
});

/***/ }),
/* 150 */
/***/ (function(module, exports) {

/* eslint-disable */
// Closest and matches
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;

    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);

    return null;
  };
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory() : undefined;
})(this, function () {
  'use strict';
  /**
   * Applies the :focus-visible polyfill at the given scope.
   * A scope in this case is either the top-level Document or a Shadow Root.
   *
   * @param {(Document|ShadowRoot)} scope
   * @see https://github.com/WICG/focus-visible
   */

  function applyFocusVisiblePolyfill(scope) {
    var hadKeyboardEvent = true;
    var hadFocusVisibleRecently = false;
    var hadFocusVisibleRecentlyTimeout = null;
    var inputTypesAllowlist = {
      text: true,
      search: true,
      url: true,
      tel: true,
      email: true,
      password: true,
      number: true,
      date: true,
      month: true,
      week: true,
      time: true,
      datetime: true,
      'datetime-local': true
    };
    /**
     * Helper function for legacy browsers and iframes which sometimes focus
     * elements like document, body, and non-interactive SVG.
     * @param {Element} el
     */

    function isValidFocusTarget(el) {
      if (el && el !== document && el.nodeName !== 'HTML' && el.nodeName !== 'BODY' && 'classList' in el && 'contains' in el.classList) {
        return true;
      }

      return false;
    }
    /**
     * Computes whether the given element should automatically trigger the
     * `focus-visible` class being added, i.e. whether it should always match
     * `:focus-visible` when focused.
     * @param {Element} el
     * @return {boolean}
     */


    function focusTriggersKeyboardModality(el) {
      var type = el.type;
      var tagName = el.tagName;

      if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {
        return true;
      }

      if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
      }

      if (el.isContentEditable) {
        return true;
      }

      return false;
    }
    /**
     * Add the `focus-visible` class to the given element if it was not added by
     * the author.
     * @param {Element} el
     */


    function addFocusVisibleClass(el) {
      if (el.classList.contains('focus-visible')) {
        return;
      }

      el.classList.add('focus-visible');
      el.setAttribute('data-focus-visible-added', '');
    }
    /**
     * Remove the `focus-visible` class from the given element if it was not
     * originally added by the author.
     * @param {Element} el
     */


    function removeFocusVisibleClass(el) {
      if (!el.hasAttribute('data-focus-visible-added')) {
        return;
      }

      el.classList.remove('focus-visible');
      el.removeAttribute('data-focus-visible-added');
    }
    /**
     * If the most recent user interaction was via the keyboard;
     * and the key press did not include a meta, alt/option, or control key;
     * then the modality is keyboard. Otherwise, the modality is not keyboard.
     * Apply `focus-visible` to any current active element and keep track
     * of our keyboard modality state with `hadKeyboardEvent`.
     * @param {KeyboardEvent} e
     */


    function onKeyDown(e) {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (isValidFocusTarget(scope.activeElement)) {
        addFocusVisibleClass(scope.activeElement);
      }

      hadKeyboardEvent = true;
    }
    /**
     * If at any point a user clicks with a pointing device, ensure that we change
     * the modality away from keyboard.
     * This avoids the situation where a user presses a key on an already focused
     * element, and then clicks on a different element, focusing it with a
     * pointing device, while we still think we're in keyboard modality.
     * @param {Event} e
     */


    function onPointerDown(e) {
      hadKeyboardEvent = false;
    }
    /**
     * On `focus`, add the `focus-visible` class to the target if:
     * - the target received focus as a result of keyboard navigation, or
     * - the event target is an element that will likely require interaction
     *   via the keyboard (e.g. a text box)
     * @param {Event} e
     */


    function onFocus(e) {
      // Prevent IE from focusing the document or HTML element.
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    }
    /**
     * On `blur`, remove the `focus-visible` class from the target.
     * @param {Event} e
     */


    function onBlur(e) {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (e.target.classList.contains('focus-visible') || e.target.hasAttribute('data-focus-visible-added')) {
        // To detect a tab/window switch, we look for a blur event followed
        // rapidly by a visibility change.
        // If we don't see a visibility change within 100ms, it's probably a
        // regular focus change.
        hadFocusVisibleRecently = true;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
        hadFocusVisibleRecentlyTimeout = window.setTimeout(function () {
          hadFocusVisibleRecently = false;
        }, 100);
        removeFocusVisibleClass(e.target);
      }
    }
    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had .focus-visible.
     * @param {Event} e
     */


    function onVisibilityChange(e) {
      if (document.visibilityState === 'hidden') {
        // If the tab becomes active again, the browser will handle calling focus
        // on the element (Safari actually calls it twice).
        // If this tab change caused a blur on an element with focus-visible,
        // re-apply the class when the user switches back to the tab.
        if (hadFocusVisibleRecently) {
          hadKeyboardEvent = true;
        }

        addInitialPointerMoveListeners();
      }
    }
    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */


    function addInitialPointerMoveListeners() {
      document.addEventListener('mousemove', onInitialPointerMove);
      document.addEventListener('mousedown', onInitialPointerMove);
      document.addEventListener('mouseup', onInitialPointerMove);
      document.addEventListener('pointermove', onInitialPointerMove);
      document.addEventListener('pointerdown', onInitialPointerMove);
      document.addEventListener('pointerup', onInitialPointerMove);
      document.addEventListener('touchmove', onInitialPointerMove);
      document.addEventListener('touchstart', onInitialPointerMove);
      document.addEventListener('touchend', onInitialPointerMove);
    }

    function removeInitialPointerMoveListeners() {
      document.removeEventListener('mousemove', onInitialPointerMove);
      document.removeEventListener('mousedown', onInitialPointerMove);
      document.removeEventListener('mouseup', onInitialPointerMove);
      document.removeEventListener('pointermove', onInitialPointerMove);
      document.removeEventListener('pointerdown', onInitialPointerMove);
      document.removeEventListener('pointerup', onInitialPointerMove);
      document.removeEventListener('touchmove', onInitialPointerMove);
      document.removeEventListener('touchstart', onInitialPointerMove);
      document.removeEventListener('touchend', onInitialPointerMove);
    }
    /**
     * When the polfyill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     * This accounts for situations where focus enters the page from the URL bar.
     * @param {Event} e
     */


    function onInitialPointerMove(e) {
      // Work around a Safari quirk that fires a mousemove on <html> whenever the
      // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent = false;
      removeInitialPointerMoveListeners();
    } // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:


    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    document.addEventListener('visibilitychange', onVisibilityChange, true);
    addInitialPointerMoveListeners(); // For focus and blur, we specifically care about state changes in the local
    // scope. This is because focus / blur events that originate from within a
    // shadow root are not re-dispatched from the host element if it was already
    // the active element in its own scope:

    scope.addEventListener('focus', onFocus, true);
    scope.addEventListener('blur', onBlur, true); // We detect that a node is a ShadowRoot by ensuring that it is a
    // DocumentFragment and also has a host property. This check covers native
    // implementation and polyfill implementation transparently. If we only cared
    // about the native implementation, we could just check if the scope was
    // an instance of a ShadowRoot.

    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
      // Since a ShadowRoot is a special kind of DocumentFragment, it does not
      // have a root element to add a class to. So, we add this attribute to the
      // host element instead:
      scope.host.setAttribute('data-js-focus-visible', '');
    } else if (scope.nodeType === Node.DOCUMENT_NODE) {
      document.documentElement.classList.add('js-focus-visible');
      document.documentElement.setAttribute('data-js-focus-visible', '');
    }
  } // It is important to wrap all references to global window and document in
  // these checks to support server-side rendering use cases
  // @see https://github.com/WICG/focus-visible/issues/199


  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Make the polyfill helper globally available. This can be used as a signal
    // to interested libraries that wish to coordinate with the polyfill for e.g.,
    // applying the polyfill to a shadow root:
    window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill; // Notify interested libraries of the polyfill's presence, in case the
    // polyfill was loaded lazily:

    var event;

    try {
      event = new CustomEvent('focus-visible-polyfill-ready');
    } catch (error) {
      // IE11 does not support using CustomEvent as a constructor directly:
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});
    }

    window.dispatchEvent(event);
  }

  if (typeof document !== 'undefined') {
    // Apply the polyfill to the global document, so that no JavaScript
    // coordination is required to use the polyfill in the top-level document:
    applyFocusVisiblePolyfill(document);
  }
});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);

var isObject = __webpack_require__(40);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(155);

var global = __webpack_require__(19);

var isObject = __webpack_require__(40);

var createNonEnumerableProperty = __webpack_require__(41);

var objectHas = __webpack_require__(33);

var sharedKey = __webpack_require__(156);

var hiddenKeys = __webpack_require__(117);

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
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return objectHas(it, STATE);
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
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);

var inspectSource = __webpack_require__(113);

var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(115);

var uid = __webpack_require__(116);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(33);

var ownKeys = __webpack_require__(159);

var getOwnPropertyDescriptorModule = __webpack_require__(108);

var definePropertyModule = __webpack_require__(77);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(160);

var getOwnPropertyNamesModule = __webpack_require__(162);

var getOwnPropertySymbolsModule = __webpack_require__(167);

var anObject = __webpack_require__(27); // all object keys, includes non-enumerable and symbols


module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(161);

var global = __webpack_require__(19);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);

module.exports = global;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(163);

var enumBugKeys = __webpack_require__(166);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(33);

var toIndexedObject = __webpack_require__(55);

var indexOf = __webpack_require__(164).indexOf;

var hiddenKeys = __webpack_require__(117);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(55);

var toLength = __webpack_require__(58);

var toAbsoluteIndex = __webpack_require__(165); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(59);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 166 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),
/* 167 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(20);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(20);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(79);

var redefine = __webpack_require__(57);

var toString = __webpack_require__(172); // `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, {
    unsafe: true
  });
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(119);

module.exports = NATIVE_SYMBOL // eslint-disable-next-line no-undef
&& !Symbol.sham // eslint-disable-next-line no-undef
&& typeof Symbol.iterator == 'symbol';

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TO_STRING_TAG_SUPPORT = __webpack_require__(79);

var classof = __webpack_require__(173); // `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(79);

var classofRaw = __webpack_require__(56);

var wellKnownSymbol = __webpack_require__(42);

var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(20); // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.


function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});
exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(57);

var anObject = __webpack_require__(27);

var fails = __webpack_require__(20);

var flags = __webpack_require__(120);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];
var NOT_GENERIC = fails(function () {
  return nativeToString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
}); // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING; // `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, {
    unsafe: true
  });
}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(59);

var requireObjectCoercible = __webpack_require__(32); // `String.prototype.{ codePointAt, at }` methods implementation


var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(32); // `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject


module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(40);

var classof = __webpack_require__(56);

var wellKnownSymbol = __webpack_require__(42);

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(27);

var aFunction = __webpack_require__(180);

var wellKnownSymbol = __webpack_require__(42);

var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(182);

module.exports = parent;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var arrayIncludes = __webpack_require__(183);

var stringIncludes = __webpack_require__(186);

var ArrayPrototype = Array.prototype;
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.includes;
  if (it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.includes) return arrayIncludes;

  if (typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.includes) {
    return stringIncludes;
  }

  return own;
};

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(184);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').includes;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var $includes = __webpack_require__(87).includes;

var addToUnscopables = __webpack_require__(89);

var arrayMethodUsesToLength = __webpack_require__(25);

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
}); // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes

$({
  target: 'Array',
  proto: true,
  forced: !USES_TO_LENGTH
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes');

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(11);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(187);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('String').includes;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var notARegExp = __webpack_require__(188);

var requireObjectCoercible = __webpack_require__(45);

var correctIsRegExpLogic = __webpack_require__(191); // `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes


$({
  target: 'String',
  proto: true,
  forced: !correctIsRegExpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__(189);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);

var classof = __webpack_require__(62);

var wellKnownSymbol = __webpack_require__(12);

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var createNonEnumerableProperty = __webpack_require__(24);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(12);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) {
      /* empty */
    }
  }

  return false;
};

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(193);

module.exports = parent;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(194);

var path = __webpack_require__(9);

module.exports = path.Reflect.construct;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var getBuiltIn = __webpack_require__(67);

var aFunction = __webpack_require__(64);

var anObject = __webpack_require__(30);

var isObject = __webpack_require__(16);

var create = __webpack_require__(68);

var bind = __webpack_require__(128);

var fails = __webpack_require__(11);

var nativeConstruct = getBuiltIn('Reflect', 'construct'); // `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it

var NEW_TARGET_BUG = fails(function () {
  function F() {
    /* empty */
  }

  return !(nativeConstruct(function () {
    /* empty */
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () {
    /* empty */
  });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;
$({
  target: 'Reflect',
  stat: true,
  forced: FORCED,
  sham: FORCED
}, {
  construct: function construct(Target, args
  /* , newTarget */
  ) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);

    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();

        case 1:
          return new Target(args[0]);

        case 2:
          return new Target(args[0], args[1]);

        case 3:
          return new Target(args[0], args[1], args[2]);

        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      } // w/o altered newTarget, lot of arguments case


      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    } // with altered newTarget, not support built-in constructors


    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);

var definePropertyModule = __webpack_require__(29);

var anObject = __webpack_require__(30);

var objectKeys = __webpack_require__(69); // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);

  return O;
};

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(67);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(198);

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(199);

module.exports = parent;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(200);

var path = __webpack_require__(9);

var Object = path.Object;

module.exports = function create(P, D) {
  return Object.create(P, D);
};

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var DESCRIPTORS = __webpack_require__(17);

var create = __webpack_require__(68); // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create


$({
  target: 'Object',
  stat: true,
  sham: !DESCRIPTORS
}, {
  create: create
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var _Object$setPrototypeOf = __webpack_require__(129);

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(203);

module.exports = parent;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(204);

var path = __webpack_require__(9);

module.exports = path.Object.setPrototypeOf;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var setPrototypeOf = __webpack_require__(130); // `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof


$({
  target: 'Object',
  stat: true
}, {
  setPrototypeOf: setPrototypeOf
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(207);

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(208);

module.exports = parent;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);

__webpack_require__(132);

__webpack_require__(137);

var WrappedWellKnownSymbolModule = __webpack_require__(94);

module.exports = WrappedWellKnownSymbolModule.f('iterator');

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(65);

var requireObjectCoercible = __webpack_require__(45); // `String.prototype.{ codePointAt, at }` methods implementation


var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var inspectSource = __webpack_require__(211);

var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(125);

var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IteratorPrototype = __webpack_require__(134).IteratorPrototype;

var create = __webpack_require__(68);

var createPropertyDescriptor = __webpack_require__(44);

var setToStringTag = __webpack_require__(46);

var Iterators = __webpack_require__(35);

var returnThis = function () {
  return this;
};

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TO_STRING_TAG_SUPPORT = __webpack_require__(97);

var classof = __webpack_require__(72); // `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(28);

var addToUnscopables = __webpack_require__(89);

var Iterators = __webpack_require__(35);

var InternalStateModule = __webpack_require__(95);

var defineIterator = __webpack_require__(133);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

Iterators.Arguments = Iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 215 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(217);

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(218);

__webpack_require__(237);

__webpack_require__(238);

__webpack_require__(239);

__webpack_require__(240); // TODO: Remove from `core-js@4`


__webpack_require__(241);

module.exports = parent;

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(138);

__webpack_require__(219);

__webpack_require__(220);

__webpack_require__(222);

__webpack_require__(223);

__webpack_require__(224);

__webpack_require__(225);

__webpack_require__(131);

__webpack_require__(226);

__webpack_require__(227);

__webpack_require__(228);

__webpack_require__(229);

__webpack_require__(230);

__webpack_require__(231);

__webpack_require__(232);

__webpack_require__(233);

__webpack_require__(234);

__webpack_require__(235);

__webpack_require__(236);

var path = __webpack_require__(9);

module.exports = path.Symbol;

/***/ }),
/* 219 */
/***/ (function(module, exports) {

// empty

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var global = __webpack_require__(13);

var getBuiltIn = __webpack_require__(67);

var IS_PURE = __webpack_require__(66);

var DESCRIPTORS = __webpack_require__(17);

var NATIVE_SYMBOL = __webpack_require__(92);

var USE_SYMBOL_AS_UID = __webpack_require__(126);

var fails = __webpack_require__(11);

var has = __webpack_require__(18);

var isArray = __webpack_require__(47);

var isObject = __webpack_require__(16);

var anObject = __webpack_require__(30);

var toObject = __webpack_require__(21);

var toIndexedObject = __webpack_require__(28);

var toPrimitive = __webpack_require__(63);

var createPropertyDescriptor = __webpack_require__(44);

var nativeObjectCreate = __webpack_require__(68);

var objectKeys = __webpack_require__(69);

var getOwnPropertyNamesModule = __webpack_require__(141);

var getOwnPropertyNamesExternal = __webpack_require__(221);

var getOwnPropertySymbolsModule = __webpack_require__(142);

var getOwnPropertyDescriptorModule = __webpack_require__(83);

var definePropertyModule = __webpack_require__(29);

var propertyIsEnumerableModule = __webpack_require__(84);

var createNonEnumerableProperty = __webpack_require__(24);

var redefine = __webpack_require__(136);

var shared = __webpack_require__(90);

var sharedKey = __webpack_require__(71);

var hiddenKeys = __webpack_require__(70);

var uid = __webpack_require__(91);

var wellKnownSymbol = __webpack_require__(12);

var wrappedWellKnownSymbolModule = __webpack_require__(94);

var defineWellKnownSymbol = __webpack_require__(10);

var setToStringTag = __webpack_require__(46);

var InternalStateModule = __webpack_require__(95);

var $forEach = __webpack_require__(36).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () {
      return nativeDefineProperty(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });
  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });

    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }
}

$({
  global: true,
  wrap: true,
  forced: !NATIVE_SYMBOL,
  sham: !NATIVE_SYMBOL
}, {
  Symbol: $Symbol
});
$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});
$({
  target: SYMBOL,
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL,
  sham: !DESCRIPTORS
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

$({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    getOwnPropertySymbolsModule.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
  });
  $({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;

      while (arguments.length > index) args.push(arguments[index++]);

      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(28);

var nativeGetOwnPropertyNames = __webpack_require__(141).f;

var toString = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator


defineWellKnownSymbol('asyncIterator');

/***/ }),
/* 223 */
/***/ (function(module, exports) {

// empty

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.hasInstance` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.hasinstance


defineWellKnownSymbol('hasInstance');

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable


defineWellKnownSymbol('isConcatSpreadable');

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match


defineWellKnownSymbol('match');

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.matchAll` well-known symbol


defineWellKnownSymbol('matchAll');

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace


defineWellKnownSymbol('replace');

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search


defineWellKnownSymbol('search');

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.species` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.species


defineWellKnownSymbol('species');

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split


defineWellKnownSymbol('split');

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.toPrimitive` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.toprimitive


defineWellKnownSymbol('toPrimitive');

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.toStringTag` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.tostringtag


defineWellKnownSymbol('toStringTag');

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.unscopables` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.unscopables


defineWellKnownSymbol('unscopables');

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var setToStringTag = __webpack_require__(46); // Math[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-math-@@tostringtag


setToStringTag(Math, 'Math', true);

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var setToStringTag = __webpack_require__(46); // JSON[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-json-@@tostringtag


setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-using-statement


defineWellKnownSymbol('asyncDispose');

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-using-statement


defineWellKnownSymbol('dispose');

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable


defineWellKnownSymbol('observable');

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(10); // `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching


defineWellKnownSymbol('patternMatch');

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// TODO: remove from `core-js@4`
var defineWellKnownSymbol = __webpack_require__(10);

defineWellKnownSymbol('replaceAll');

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(243);

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(244);

module.exports = parent;

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(245);

var path = __webpack_require__(9);

module.exports = path.Object.getPrototypeOf;

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var fails = __webpack_require__(11);

var toObject = __webpack_require__(21);

var nativeGetPrototypeOf = __webpack_require__(96);

var CORRECT_PROTOTYPE_GETTER = __webpack_require__(135);

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetPrototypeOf(1);
}); // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES,
  sham: !CORRECT_PROTOTYPE_GETTER
}, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(247);

module.exports = parent;

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var sort = __webpack_require__(248);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.sort;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.sort ? sort : own;
};

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(249);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').sort;

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var aFunction = __webpack_require__(64);

var toObject = __webpack_require__(21);

var fails = __webpack_require__(11);

var arrayMethodIsStrict = __webpack_require__(74);

var test = [];
var nativeSort = test.sort; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test.sort(null);
}); // Old WebKit

var STRICT_METHOD = arrayMethodIsStrict('sort');
var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD; // `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  sort: function sort(comparefn) {
    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(251);

module.exports = parent;

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var find = __webpack_require__(252);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.find;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.find ? find : own;
};

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(253);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').find;

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var $find = __webpack_require__(36).find;

var addToUnscopables = __webpack_require__(89);

var arrayMethodUsesToLength = __webpack_require__(25);

var FIND = 'find';
var SKIPS_HOLES = true;
var USES_TO_LENGTH = arrayMethodUsesToLength(FIND); // Shouldn't skip holes

if (FIND in []) Array(1)[FIND](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find

$({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES || !USES_TO_LENGTH
}, {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND);

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(255);

module.exports = parent;

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256);

var path = __webpack_require__(9);

module.exports = path.parseInt;

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var parseIntImplementation = __webpack_require__(257); // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix


$({
  global: true,
  forced: parseInt != parseIntImplementation
}, {
  parseInt: parseIntImplementation
});

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var trim = __webpack_require__(99).trim;

var whitespaces = __webpack_require__(75);

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix

module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(259);

module.exports = parent;

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var concat = __webpack_require__(260);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.concat;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.concat ? concat : own;
};

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(138);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').concat;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(262);

module.exports = parent;

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(263);

var FunctionPrototype = Function.prototype;

module.exports = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || it instanceof Function && own === FunctionPrototype.bind ? bind : own;
};

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(264);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Function').bind;

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var bind = __webpack_require__(128); // `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind


$({
  target: 'Function',
  proto: true
}, {
  bind: bind
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(266);

module.exports = parent;

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var slice = __webpack_require__(267);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.slice;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.slice ? slice : own;
};

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(268);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').slice;

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var isObject = __webpack_require__(16);

var isArray = __webpack_require__(47);

var toAbsoluteIndex = __webpack_require__(88);

var toLength = __webpack_require__(34);

var toIndexedObject = __webpack_require__(28);

var createProperty = __webpack_require__(73);

var wellKnownSymbol = __webpack_require__(12);

var arrayMethodHasSpeciesSupport = __webpack_require__(48);

var arrayMethodUsesToLength = __webpack_require__(25);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(270);

module.exports = parent;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(271);

var path = __webpack_require__(9);

module.exports = path.Array.isArray;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var isArray = __webpack_require__(47); // `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray


$({
  target: 'Array',
  stat: true
}, {
  isArray: isArray
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(273);

module.exports = parent;

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var splice = __webpack_require__(274);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.splice;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.splice ? splice : own;
};

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(275);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').splice;

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var toAbsoluteIndex = __webpack_require__(88);

var toInteger = __webpack_require__(65);

var toLength = __webpack_require__(34);

var toObject = __webpack_require__(21);

var arraySpeciesCreate = __webpack_require__(98);

var createProperty = __webpack_require__(73);

var arrayMethodHasSpeciesSupport = __webpack_require__(48);

var arrayMethodUsesToLength = __webpack_require__(25);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(277);

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(143);

module.exports = parent;

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var DESCRIPTORS = __webpack_require__(17);

var objectDefinePropertyModile = __webpack_require__(29); // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty


$({
  target: 'Object',
  stat: true,
  forced: !DESCRIPTORS,
  sham: !DESCRIPTORS
}, {
  defineProperty: objectDefinePropertyModile.f
});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(143);

module.exports = parent;

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(281);

module.exports = parent;

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(282);

var path = __webpack_require__(9);

var Object = path.Object;

var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
  return Object.getOwnPropertyDescriptor(it, key);
};

if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var fails = __webpack_require__(11);

var toIndexedObject = __webpack_require__(28);

var nativeGetOwnPropertyDescriptor = __webpack_require__(83).f;

var DESCRIPTORS = __webpack_require__(17);

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor(1);
});
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

$({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(284);

module.exports = parent;

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var filter = __webpack_require__(285);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.filter;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.filter ? filter : own;
};

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(286);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').filter;

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var $filter = __webpack_require__(36).filter;

var arrayMethodHasSpeciesSupport = __webpack_require__(48);

var arrayMethodUsesToLength = __webpack_require__(25);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

var USES_TO_LENGTH = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(288);

module.exports = parent;

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var indexOf = __webpack_require__(289);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.indexOf ? indexOf : own;
};

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(290);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').indexOf;

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var $indexOf = __webpack_require__(87).indexOf;

var arrayMethodIsStrict = __webpack_require__(74);

var arrayMethodUsesToLength = __webpack_require__(25);

var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
}); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

$({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(292);

module.exports = parent;

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(293);

var path = __webpack_require__(9);

module.exports = path.parseFloat;

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var parseFloatImplementation = __webpack_require__(294); // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string


$({
  global: true,
  forced: parseFloat != parseFloatImplementation
}, {
  parseFloat: parseFloatImplementation
});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);

var trim = __webpack_require__(99).trim;

var whitespaces = __webpack_require__(75);

var $parseFloat = global.parseFloat;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string

module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(296);

module.exports = parent;

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

var map = __webpack_require__(297);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.map;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.map ? map : own;
};

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(298);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').map;

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var $map = __webpack_require__(36).map;

var arrayMethodHasSpeciesSupport = __webpack_require__(48);

var arrayMethodUsesToLength = __webpack_require__(25);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map'); // FF49- issue

var USES_TO_LENGTH = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(300);

module.exports = parent;

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(301);

var path = __webpack_require__(9);

module.exports = path.Date.now;

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5); // `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now


$({
  target: 'Date',
  stat: true
}, {
  now: function now() {
    return new Date().getTime();
  }
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(303);

var path = __webpack_require__(9);

module.exports = path.setTimeout;

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var global = __webpack_require__(13);

var userAgent = __webpack_require__(140);

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout
  /* , ...arguments */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
}; // ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


$({
  global: true,
  bind: true,
  forced: MSIE
}, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(305);

module.exports = parent;

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(306);

var path = __webpack_require__(9);

module.exports = path.Object.keys;

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var toObject = __webpack_require__(21);

var nativeKeys = __webpack_require__(69);

var fails = __webpack_require__(11);

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeKeys(1);
}); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(137);

var forEach = __webpack_require__(308);

var classof = __webpack_require__(72);

var ArrayPrototype = Array.prototype;
var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.forEach // eslint-disable-next-line no-prototype-builtins
  || DOMIterables.hasOwnProperty(classof(it)) ? forEach : own;
};

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(309);

module.exports = parent;

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(310);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').forEach;

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var forEach = __webpack_require__(311); // `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


$({
  target: 'Array',
  proto: true,
  forced: [].forEach != forEach
}, {
  forEach: forEach
});

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $forEach = __webpack_require__(36).forEach;

var arrayMethodIsStrict = __webpack_require__(74);

var arrayMethodUsesToLength = __webpack_require__(25);

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

module.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(313);

module.exports = parent;

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(314);

var path = __webpack_require__(9);

module.exports = path.Object.assign;

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var assign = __webpack_require__(315); // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign


$({
  target: 'Object',
  stat: true,
  forced: Object.assign !== assign
}, {
  assign: assign
});

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(17);

var fails = __webpack_require__(11);

var objectKeys = __webpack_require__(69);

var getOwnPropertySymbolsModule = __webpack_require__(142);

var propertyIsEnumerableModule = __webpack_require__(84);

var toObject = __webpack_require__(21);

var IndexedObject = __webpack_require__(85);

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign

module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({
    b: 1
  }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;

  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : nativeAssign;

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(317);

module.exports = parent;

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(318);

var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.trim;
  return typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.trim ? trim : own;
};

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(319);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('String').trim;

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var $trim = __webpack_require__(99).trim;

var forcedStringTrimMethod = __webpack_require__(320); // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim


$({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(11);

var whitespaces = __webpack_require__(75);

var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(322);

module.exports = parent;

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(132);

__webpack_require__(323);

var path = __webpack_require__(9);

module.exports = path.Array.from;

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(5);

var from = __webpack_require__(324);

var checkCorrectnessOfIteration = __webpack_require__(328);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from

$({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: from
});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(86);

var toObject = __webpack_require__(21);

var callWithSafeIterationClosing = __webpack_require__(325);

var isArrayIteratorMethod = __webpack_require__(326);

var toLength = __webpack_require__(34);

var createProperty = __webpack_require__(73);

var getIteratorMethod = __webpack_require__(327); // `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from


module.exports = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();

    for (; !(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }

  result.length = index;
  return result;
};

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(30); // call something on iterator step with safe closing on error


module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(12);

var Iterators = __webpack_require__(35);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(72);

var Iterators = __webpack_require__(35);

var wellKnownSymbol = __webpack_require__(12);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(12);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(330);

module.exports = parent;

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

var some = __webpack_require__(331);

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.some;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.some ? some : own;
};

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(332);

var entryVirtual = __webpack_require__(14);

module.exports = entryVirtual('Array').some;

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(5);

var $some = __webpack_require__(36).some;

var arrayMethodIsStrict = __webpack_require__(74);

var arrayMethodUsesToLength = __webpack_require__(25);

var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH = arrayMethodUsesToLength('some'); // `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some

$({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD || !USES_TO_LENGTH
}, {
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 333 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/assets/js/polyfills.js
var polyfills = __webpack_require__(150);

// EXTERNAL MODULE: ./node_modules/focus-visible/dist/focus-visible.js
var focus_visible = __webpack_require__(151);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(118);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(170);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(175);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__(121);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(122);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js
var includes = __webpack_require__(144);
var includes_default = /*#__PURE__*/__webpack_require__.n(includes);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/reflect/construct.js
var construct = __webpack_require__(52);
var construct_default = /*#__PURE__*/__webpack_require__.n(construct);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(100);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/helpers/inherits.js
var inherits = __webpack_require__(145);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(53);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(101);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/sort.js
var sort = __webpack_require__(102);
var sort_default = /*#__PURE__*/__webpack_require__.n(sort);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/find.js
var find = __webpack_require__(4);
var find_default = /*#__PURE__*/__webpack_require__.n(find);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/parse-int.js
var parse_int = __webpack_require__(6);
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js
var concat = __webpack_require__(1);
var concat_default = /*#__PURE__*/__webpack_require__.n(concat);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/bind.js
var bind = __webpack_require__(0);
var bind_default = /*#__PURE__*/__webpack_require__.n(bind);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/slice.js
var slice = __webpack_require__(49);
var slice_default = /*#__PURE__*/__webpack_require__.n(slice);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/array/is-array.js
var is_array = __webpack_require__(23);
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/splice.js
var splice = __webpack_require__(15);
var splice_default = /*#__PURE__*/__webpack_require__.n(splice);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(26);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/helpers/createClass.js
var createClass = __webpack_require__(31);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js
var define_property = __webpack_require__(103);
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js
var get_own_property_descriptor = __webpack_require__(146);
var get_own_property_descriptor_default = /*#__PURE__*/__webpack_require__.n(get_own_property_descriptor);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/helpers/typeof.js
var helpers_typeof = __webpack_require__(22);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js
var filter = __webpack_require__(50);
var filter_default = /*#__PURE__*/__webpack_require__.n(filter);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/index-of.js
var index_of = __webpack_require__(3);
var index_of_default = /*#__PURE__*/__webpack_require__.n(index_of);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/parse-float.js
var parse_float = __webpack_require__(7);
var parse_float_default = /*#__PURE__*/__webpack_require__.n(parse_float);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js
var map = __webpack_require__(37);
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/date/now.js
var date_now = __webpack_require__(38);
var now_default = /*#__PURE__*/__webpack_require__.n(date_now);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/set-timeout.js
var set_timeout = __webpack_require__(51);
var set_timeout_default = /*#__PURE__*/__webpack_require__.n(set_timeout);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js
var keys = __webpack_require__(8);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js
var for_each = __webpack_require__(2);
var for_each_default = /*#__PURE__*/__webpack_require__.n(for_each);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js
var object_assign = __webpack_require__(104);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/trim.js
var trim = __webpack_require__(54);
var trim_default = /*#__PURE__*/__webpack_require__.n(trim);

// CONCATENATED MODULE: ./node_modules/dom7/node_modules/ssr-window/dist/ssr-window.esm.js
/**
 * SSR Window 2.0.0
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2020, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: May 12, 2020
 */

/* eslint-disable no-param-reassign */
function ssr_window_esm_isObject(obj) {
  return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
}

function ssr_window_esm_extend(target, src) {
  if (target === void 0) {
    target = {};
  }

  if (src === void 0) {
    src = {};
  }

  Object.keys(src).forEach(function (key) {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) {
      ssr_window_esm_extend(target[key], src[key]);
    }
  });
}

var doc = typeof document !== 'undefined' ? document : {};
var ssrDocument = {
  body: {},
  addEventListener: function () {},
  removeEventListener: function () {},
  activeElement: {
    blur: function () {},
    nodeName: ''
  },
  querySelector: function () {
    return null;
  },
  querySelectorAll: function () {
    return [];
  },
  getElementById: function () {
    return null;
  },
  createEvent: function () {
    return {
      initEvent: function () {}
    };
  },
  createElement: function () {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute: function () {},
      getElementsByTagName: function () {
        return [];
      }
    };
  },
  createElementNS: function () {
    return {};
  },
  importNode: function () {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  }
};
ssr_window_esm_extend(doc, ssrDocument);
var win = typeof window !== 'undefined' ? window : {};
var ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ''
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  },
  history: {
    replaceState: function () {},
    pushState: function () {},
    go: function () {},
    back: function () {}
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener: function () {},
  removeEventListener: function () {},
  getComputedStyle: function () {
    return {
      getPropertyValue: function () {
        return '';
      }
    };
  },
  Image: function () {},
  Date: function () {},
  screen: {},
  setTimeout: function () {},
  clearTimeout: function () {},
  matchMedia: function () {
    return {};
  }
};
ssr_window_esm_extend(win, ssrWindow);

// CONCATENATED MODULE: ./node_modules/dom7/dist/dom7.modular.js


















/**
 * Dom7 2.1.5
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 *
 * Copyright 2020, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: May 15, 2020
 */


var dom7_modular_Dom7 = function Dom7(arr) {
  classCallCheck_default()(this, Dom7);

  var self = this; // Create array-like object

  for (var i = 0; i < arr.length; i += 1) {
    self[i] = arr[i];
  }

  self.length = arr.length; // Return collection with methods

  return this;
};

function $(selector, context) {
  var arr = [];
  var i = 0;

  if (selector && !context) {
    if (selector instanceof dom7_modular_Dom7) {
      return selector;
    }
  }

  if (selector) {
    // String
    if (typeof selector === 'string') {
      var els;
      var tempParent;

      var _html = trim_default()(selector).call(selector);

      if (index_of_default()(_html).call(_html, '<') >= 0 && index_of_default()(_html).call(_html, '>') >= 0) {
        var toCreate = 'div';
        if (index_of_default()(_html).call(_html, '<li') === 0) toCreate = 'ul';
        if (index_of_default()(_html).call(_html, '<tr') === 0) toCreate = 'tbody';
        if (index_of_default()(_html).call(_html, '<td') === 0 || index_of_default()(_html).call(_html, '<th') === 0) toCreate = 'tr';
        if (index_of_default()(_html).call(_html, '<tbody') === 0) toCreate = 'table';
        if (index_of_default()(_html).call(_html, '<option') === 0) toCreate = 'select';
        tempParent = doc.createElement(toCreate);
        tempParent.innerHTML = _html;

        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [doc.getElementById(trim_default()(selector).call(selector).split('#')[1])];
        } else {
          // Other selectors
          els = (context || doc).querySelectorAll(trim_default()(selector).call(selector));
        }

        for (i = 0; i < els.length; i += 1) {
          if (els[i]) arr.push(els[i]);
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

  return new dom7_modular_Dom7(arr);
}

$.fn = dom7_modular_Dom7.prototype;
$.Class = dom7_modular_Dom7;
$.Dom7 = dom7_modular_Dom7;

function unique(arr) {
  var uniqueArray = [];

  for (var i = 0; i < arr.length; i += 1) {
    if (index_of_default()(uniqueArray).call(uniqueArray, arr[i]) === -1) uniqueArray.push(arr[i]);
  }

  return uniqueArray;
}

function toCamelCase(string) {
  return string.toLowerCase().replace(/-(.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

function requestAnimationFrame(callback) {
  if (win.requestAnimationFrame) return win.requestAnimationFrame(callback);else if (win.webkitRequestAnimationFrame) return win.webkitRequestAnimationFrame(callback);
  return win.setTimeout(callback, 1000 / 60);
}

function cancelAnimationFrame(id) {
  if (win.cancelAnimationFrame) return win.cancelAnimationFrame(id);else if (win.webkitCancelAnimationFrame) return win.webkitCancelAnimationFrame(id);
  return win.clearTimeout(id);
} // Classes and attributes


function addClass(className) {
  if (typeof className === 'undefined') {
    return this;
  }

  var classes = className.split(' ');

  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
    }
  }

  return this;
}

function removeClass(className) {
  var classes = className.split(' ');

  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
    }
  }

  return this;
}

function hasClass(className) {
  if (!this[0]) return false;
  return this[0].classList.contains(className);
}

function toggleClass(className) {
  var classes = className.split(' ');

  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
    }
  }

  return this;
}

function attr(attrs, value) {
  if (arguments.length === 1 && typeof attrs === 'string') {
    // Get attr
    if (this[0]) return this[0].getAttribute(attrs);
    return undefined;
  } // Set attrs


  for (var i = 0; i < this.length; i += 1) {
    if (arguments.length === 2) {
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
} // eslint-disable-next-line


function removeAttr(attr) {
  for (var i = 0; i < this.length; i += 1) {
    this[i].removeAttribute(attr);
  }

  return this;
} // eslint-disable-next-line


function dom7_modular_prop(props, value) {
  if (arguments.length === 1 && typeof props === 'string') {
    // Get prop
    if (this[0]) return this[0][props];
  } else {
    // Set props
    for (var i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i][props] = value;
      } else {
        // Object
        // eslint-disable-next-line
        for (var propName in props) {
          this[i][propName] = props[propName];
        }
      }
    }

    return this;
  }
}

function dom7_modular_data(key, value) {
  var el;

  if (typeof value === 'undefined') {
    el = this[0]; // Get value

    if (el) {
      if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
        return el.dom7ElementDataStorage[key];
      }

      var dataKey = el.getAttribute("data-".concat(key));

      if (dataKey) {
        return dataKey;
      }

      return undefined;
    }

    return undefined;
  } // Set value


  for (var i = 0; i < this.length; i += 1) {
    el = this[i];
    if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
    el.dom7ElementDataStorage[key] = value;
  }

  return this;
}

function removeData(key) {
  for (var i = 0; i < this.length; i += 1) {
    var el = this[i];

    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
      el.dom7ElementDataStorage[key] = null;
      delete el.dom7ElementDataStorage[key];
    }
  }
}

function dom7_modular_dataset() {
  var el = this[0];
  if (!el) return undefined;
  var dataset = {}; // eslint-disable-line

  if (el.dataset) {
    // eslint-disable-next-line
    for (var dataKey in el.dataset) {
      dataset[dataKey] = el.dataset[dataKey];
    }
  } else {
    for (var i = 0; i < el.attributes.length; i += 1) {
      var _context;

      // eslint-disable-next-line
      var _attr = el.attributes[i];

      if (index_of_default()(_context = _attr.name).call(_context, 'data-') >= 0) {
        dataset[toCamelCase(_attr.name.split('data-')[1])] = _attr.value;
      }
    }
  } // eslint-disable-next-line


  for (var key in dataset) {
    if (dataset[key] === 'false') dataset[key] = false;else if (dataset[key] === 'true') dataset[key] = true;else if (parse_float_default()(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
  }

  return dataset;
}

function val(value) {
  var dom = this;

  if (typeof value === 'undefined') {
    if (dom[0]) {
      if (dom[0].multiple && dom[0].nodeName.toLowerCase() === 'select') {
        var values = [];

        for (var i = 0; i < dom[0].selectedOptions.length; i += 1) {
          values.push(dom[0].selectedOptions[i].value);
        }

        return values;
      }

      return dom[0].value;
    }

    return undefined;
  }

  for (var _i = 0; _i < dom.length; _i += 1) {
    var el = dom[_i];

    if (is_array_default()(value) && el.multiple && el.nodeName.toLowerCase() === 'select') {
      for (var j = 0; j < el.options.length; j += 1) {
        el.options[j].selected = index_of_default()(value).call(value, el.options[j].value) >= 0;
      }
    } else {
      el.value = value;
    }
  }

  return dom;
} // Transforms
// eslint-disable-next-line


function dom7_modular_transform(transform) {
  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this[i].style;
    elStyle.webkitTransform = transform;
    elStyle.transform = transform;
  }

  return this;
}

function transition(duration) {
  if (typeof duration !== 'string') {
    duration = "".concat(duration, "ms"); // eslint-disable-line
  }

  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this[i].style;
    elStyle.webkitTransitionDuration = duration;
    elStyle.transitionDuration = duration;
  }

  return this;
} // Events


function dom7_modular_on() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var eventType = args[0],
      targetSelector = args[1],
      listener = args[2],
      capture = args[3];

  if (typeof args[1] === 'function') {
    eventType = args[0];
    listener = args[1];
    capture = args[2];
    targetSelector = undefined;
  }

  if (!capture) capture = false;

  function handleLiveEvent(e) {
    var target = e.target;
    if (!target) return;
    var eventData = e.target.dom7EventData || [];

    if (index_of_default()(eventData).call(eventData, e) < 0) {
      eventData.unshift(e);
    }

    if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
      var _parents = $(target).parents(); // eslint-disable-line


      for (var k = 0; k < _parents.length; k += 1) {
        if ($(_parents[k]).is(targetSelector)) listener.apply(_parents[k], eventData);
      }
    }
  }

  function handleEvent(e) {
    var eventData = e && e.target ? e.target.dom7EventData || [] : [];

    if (index_of_default()(eventData).call(eventData, e) < 0) {
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
        if (!el.dom7Listeners) el.dom7Listeners = {};
        if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
        el.dom7Listeners[event].push({
          listener: listener,
          proxyListener: handleEvent
        });
        el.addEventListener(event, handleEvent, capture);
      }
    } else {
      // Live events
      for (j = 0; j < events.length; j += 1) {
        var _event = events[j];
        if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
        if (!el.dom7LiveListeners[_event]) el.dom7LiveListeners[_event] = [];

        el.dom7LiveListeners[_event].push({
          listener: listener,
          proxyListener: handleLiveEvent
        });

        el.addEventListener(_event, handleLiveEvent, capture);
      }
    }
  }

  return this;
}

function dom7_modular_off() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var eventType = args[0],
      targetSelector = args[1],
      listener = args[2],
      capture = args[3];

  if (typeof args[1] === 'function') {
    eventType = args[0];
    listener = args[1];
    capture = args[2];
    targetSelector = undefined;
  }

  if (!capture) capture = false;
  var events = eventType.split(' ');

  for (var i = 0; i < events.length; i += 1) {
    var event = events[i];

    for (var j = 0; j < this.length; j += 1) {
      var el = this[j];
      var handlers = void 0;

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

            splice_default()(handlers).call(handlers, k, 1);
          } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
            el.removeEventListener(event, handler.proxyListener, capture);

            splice_default()(handlers).call(handlers, k, 1);
          } else if (!listener) {
            el.removeEventListener(event, handler.proxyListener, capture);

            splice_default()(handlers).call(handlers, k, 1);
          }
        }
      }
    }
  }

  return this;
}

function once() {
  var dom = this;

  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  var eventName = args[0],
      targetSelector = args[1],
      listener = args[2],
      capture = args[3];

  if (typeof args[1] === 'function') {
    eventName = args[0];
    listener = args[1];
    capture = args[2];
    targetSelector = undefined;
  }

  function onceHandler() {
    for (var _len4 = arguments.length, eventArgs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      eventArgs[_key4] = arguments[_key4];
    }

    listener.apply(this, eventArgs);
    dom.off(eventName, targetSelector, onceHandler, capture);

    if (onceHandler.dom7proxy) {
      delete onceHandler.dom7proxy;
    }
  }

  onceHandler.dom7proxy = listener;
  return dom.on(eventName, targetSelector, onceHandler, capture);
}

function trigger() {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  var events = args[0].split(' ');
  var eventData = args[1];

  for (var i = 0; i < events.length; i += 1) {
    var event = events[i];

    for (var j = 0; j < this.length; j += 1) {
      var el = this[j];
      var evt = void 0;

      try {
        evt = new win.CustomEvent(event, {
          detail: eventData,
          bubbles: true,
          cancelable: true
        });
      } catch (e) {
        evt = doc.createEvent('Event');
        evt.initEvent(event, true, true);
        evt.detail = eventData;
      } // eslint-disable-next-line


      el.dom7EventData = filter_default()(args).call(args, function (data, dataIndex) {
        return dataIndex > 0;
      });
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
    if (e.target !== this) return;
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

function animationEnd(callback) {
  var events = ['webkitAnimationEnd', 'animationend'];
  var dom = this;
  var i;

  function fireCallBack(e) {
    if (e.target !== this) return;
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
} // Sizing/Styles


function dom7_modular_width() {
  if (this[0] === win) {
    return win.innerWidth;
  }

  if (this.length > 0) {
    return parse_float_default()(this.css('width'));
  }

  return null;
}

function dom7_modular_outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var _styles = this.styles();

      return this[0].offsetWidth + parse_float_default()(_styles.getPropertyValue('margin-right')) + parse_float_default()(_styles.getPropertyValue('margin-left'));
    }

    return this[0].offsetWidth;
  }

  return null;
}

function dom7_modular_height() {
  if (this[0] === win) {
    return win.innerHeight;
  }

  if (this.length > 0) {
    return parse_float_default()(this.css('height'));
  }

  return null;
}

function dom7_modular_outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var _styles2 = this.styles();

      return this[0].offsetHeight + parse_float_default()(_styles2.getPropertyValue('margin-top')) + parse_float_default()(_styles2.getPropertyValue('margin-bottom'));
    }

    return this[0].offsetHeight;
  }

  return null;
}

function dom7_modular_offset() {
  if (this.length > 0) {
    var el = this[0];
    var box = el.getBoundingClientRect();
    var body = doc.body;
    var clientTop = el.clientTop || body.clientTop || 0;
    var clientLeft = el.clientLeft || body.clientLeft || 0;

    var _scrollTop = el === win ? win.scrollY : el.scrollTop;

    var _scrollLeft = el === win ? win.scrollX : el.scrollLeft;

    return {
      top: box.top + _scrollTop - clientTop,
      left: box.left + _scrollLeft - clientLeft
    };
  }

  return null;
}

function hide() {
  for (var i = 0; i < this.length; i += 1) {
    this[i].style.display = 'none';
  }

  return this;
}

function dom7_modular_show() {
  for (var i = 0; i < this.length; i += 1) {
    var el = this[i];

    if (el.style.display === 'none') {
      el.style.display = '';
    }

    if (win.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
      // Still not visible
      el.style.display = 'block';
    }
  }

  return this;
}

function styles() {
  if (this[0]) return win.getComputedStyle(this[0], null);
  return {};
}

function css(props, value) {
  var i;

  if (arguments.length === 1) {
    if (typeof props === 'string') {
      if (this[0]) return win.getComputedStyle(this[0], null).getPropertyValue(props);
    } else {
      for (i = 0; i < this.length; i += 1) {
        // eslint-disable-next-line
        for (var _prop in props) {
          this[i].style[_prop] = props[_prop];
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
} // Dom manipulation


function toArray() {
  var arr = [];

  for (var i = 0; i < this.length; i += 1) {
    arr.push(this[i]);
  }

  return arr;
} // Iterate over the collection passing elements to `callback`


function each(callback) {
  // Don't bother continuing without a callback
  if (!callback) return this; // Iterate over the current collection

  for (var i = 0; i < this.length; i += 1) {
    // If the callback returns false
    if (callback.call(this[i], i, this[i]) === false) {
      // End the loop early
      return this;
    }
  } // Return `this` to allow chained DOM operations


  return this;
}

function forEach(callback) {
  // Don't bother continuing without a callback
  if (!callback) return this; // Iterate over the current collection

  for (var i = 0; i < this.length; i += 1) {
    // If the callback returns false
    if (callback.call(this[i], this[i], i) === false) {
      // End the loop early
      return this;
    }
  } // Return `this` to allow chained DOM operations


  return this;
}

function dom7_modular_filter(callback) {
  var matchedItems = [];
  var dom = this;

  for (var i = 0; i < dom.length; i += 1) {
    if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
  }

  return new dom7_modular_Dom7(matchedItems);
}

function dom7_modular_map(callback) {
  var modifiedItems = [];
  var dom = this;

  for (var i = 0; i < dom.length; i += 1) {
    modifiedItems.push(callback.call(dom[i], i, dom[i]));
  }

  return new dom7_modular_Dom7(modifiedItems);
} // eslint-disable-next-line


function html(html) {
  if (typeof html === 'undefined') {
    return this[0] ? this[0].innerHTML : undefined;
  }

  for (var i = 0; i < this.length; i += 1) {
    this[i].innerHTML = html;
  }

  return this;
} // eslint-disable-next-line


function dom7_modular_text(text) {
  if (typeof text === 'undefined') {
    if (this[0]) {
      var _context2;

      return trim_default()(_context2 = this[0].textContent).call(_context2);
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
  if (!el || typeof selector === 'undefined') return false;

  if (typeof selector === 'string') {
    if (el.matches) return el.matches(selector);else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
    compareWith = $(selector);

    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }

    return false;
  } else if (selector === doc) return el === doc;else if (selector === win) return el === win;

  if (selector.nodeType || selector instanceof dom7_modular_Dom7) {
    compareWith = selector.nodeType ? [selector] : selector;

    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }

    return false;
  }

  return false;
}

function indexOf(el) {
  for (var i = 0; i < this.length; i += 1) {
    if (this[i] === el) return i;
  }

  return -1;
}

function dom7_modular_index() {
  var child = this[0];
  var i;

  if (child) {
    i = 0; // eslint-disable-next-line

    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }

    return i;
  }

  return undefined;
} // eslint-disable-next-line


function eq(index) {
  if (typeof index === 'undefined') return this;
  var length = this.length;
  var returnIndex;

  if (index > length - 1) {
    return new dom7_modular_Dom7([]);
  }

  if (index < 0) {
    returnIndex = length + index;
    if (returnIndex < 0) return new dom7_modular_Dom7([]);
    return new dom7_modular_Dom7([this[returnIndex]]);
  }

  return new dom7_modular_Dom7([this[index]]);
}

function append() {
  var newChild;

  for (var k = 0; k < arguments.length; k += 1) {
    newChild = k < 0 || arguments.length <= k ? undefined : arguments[k];

    for (var i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;

        while (tempDiv.firstChild) {
          this[i].appendChild(tempDiv.firstChild);
        }
      } else if (newChild instanceof dom7_modular_Dom7) {
        for (var j = 0; j < newChild.length; j += 1) {
          this[i].appendChild(newChild[j]);
        }
      } else {
        this[i].appendChild(newChild);
      }
    }
  }

  return this;
} // eslint-disable-next-line


function appendTo(parent) {
  $(parent).append(this);
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
    } else if (newChild instanceof dom7_modular_Dom7) {
      for (j = 0; j < newChild.length; j += 1) {
        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
      }
    } else {
      this[i].insertBefore(newChild, this[i].childNodes[0]);
    }
  }

  return this;
} // eslint-disable-next-line


function prependTo(parent) {
  $(parent).prepend(this);
  return this;
}

function insertBefore(selector) {
  var before = $(selector);

  for (var i = 0; i < this.length; i += 1) {
    if (before.length === 1) {
      before[0].parentNode.insertBefore(this[i], before[0]);
    } else if (before.length > 1) {
      for (var j = 0; j < before.length; j += 1) {
        before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
      }
    }
  }
}

function insertAfter(selector) {
  var after = $(selector);

  for (var i = 0; i < this.length; i += 1) {
    if (after.length === 1) {
      after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
    } else if (after.length > 1) {
      for (var j = 0; j < after.length; j += 1) {
        after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
      }
    }
  }
}

function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
        return new dom7_modular_Dom7([this[0].nextElementSibling]);
      }

      return new dom7_modular_Dom7([]);
    }

    if (this[0].nextElementSibling) return new dom7_modular_Dom7([this[0].nextElementSibling]);
    return new dom7_modular_Dom7([]);
  }

  return new dom7_modular_Dom7([]);
}

function nextAll(selector) {
  var nextEls = [];
  var el = this[0];
  if (!el) return new dom7_modular_Dom7([]);

  while (el.nextElementSibling) {
    var _next = el.nextElementSibling; // eslint-disable-line

    if (selector) {
      if ($(_next).is(selector)) nextEls.push(_next);
    } else nextEls.push(_next);

    el = _next;
  }

  return new dom7_modular_Dom7(nextEls);
}

function prev(selector) {
  if (this.length > 0) {
    var el = this[0];

    if (selector) {
      if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
        return new dom7_modular_Dom7([el.previousElementSibling]);
      }

      return new dom7_modular_Dom7([]);
    }

    if (el.previousElementSibling) return new dom7_modular_Dom7([el.previousElementSibling]);
    return new dom7_modular_Dom7([]);
  }

  return new dom7_modular_Dom7([]);
}

function prevAll(selector) {
  var prevEls = [];
  var el = this[0];
  if (!el) return new dom7_modular_Dom7([]);

  while (el.previousElementSibling) {
    var _prev = el.previousElementSibling; // eslint-disable-line

    if (selector) {
      if ($(_prev).is(selector)) prevEls.push(_prev);
    } else prevEls.push(_prev);

    el = _prev;
  }

  return new dom7_modular_Dom7(prevEls);
}

function siblings(selector) {
  return this.nextAll(selector).add(this.prevAll(selector));
}

function dom7_modular_parent(selector) {
  var parents = []; // eslint-disable-line

  for (var i = 0; i < this.length; i += 1) {
    if (this[i].parentNode !== null) {
      if (selector) {
        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
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
    var _parent = this[i].parentNode; // eslint-disable-line

    while (_parent) {
      if (selector) {
        if ($(_parent).is(selector)) parents.push(_parent);
      } else {
        parents.push(_parent);
      }

      _parent = _parent.parentNode;
    }
  }

  return $(unique(parents));
}

function dom7_modular_closest(selector) {
  var closest = this; // eslint-disable-line

  if (typeof selector === 'undefined') {
    return new dom7_modular_Dom7([]);
  }

  if (!closest.is(selector)) {
    closest = closest.parents(selector).eq(0);
  }

  return closest;
}

function dom7_modular_find(selector) {
  var foundElements = [];

  for (var i = 0; i < this.length; i += 1) {
    var found = this[i].querySelectorAll(selector);

    for (var j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }

  return new dom7_modular_Dom7(foundElements);
}

function children(selector) {
  var children = []; // eslint-disable-line

  for (var i = 0; i < this.length; i += 1) {
    var childNodes = this[i].childNodes;

    for (var j = 0; j < childNodes.length; j += 1) {
      if (!selector) {
        if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
      } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
        children.push(childNodes[j]);
      }
    }
  }

  return new dom7_modular_Dom7(unique(children));
}

function remove() {
  for (var i = 0; i < this.length; i += 1) {
    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
  }

  return this;
}

function detach() {
  return this.remove();
}

function add() {
  var dom = this;
  var i;
  var j;

  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  for (i = 0; i < args.length; i += 1) {
    var toAdd = $(args[i]);

    for (j = 0; j < toAdd.length; j += 1) {
      dom[dom.length] = toAdd[j];
      dom.length += 1;
    }
  }

  return dom;
}

function empty() {
  for (var i = 0; i < this.length; i += 1) {
    var el = this[i];

    if (el.nodeType === 1) {
      for (var j = 0; j < el.childNodes.length; j += 1) {
        if (el.childNodes[j].parentNode) {
          el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
        }
      }

      el.textContent = '';
    }
  }

  return this;
}

function scrollTo() {
  for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  var left = args[0],
      top = args[1],
      duration = args[2],
      easing = args[3],
      callback = args[4];

  if (args.length === 4 && typeof easing === 'function') {
    callback = easing;
    left = args[0];
    top = args[1];
    duration = args[2];
    callback = args[3];
    easing = args[4];
  }

  if (typeof easing === 'undefined') easing = 'swing';
  return this.each(function animate() {
    var el = this;
    var currentTop;
    var currentLeft;
    var maxTop;
    var maxLeft;
    var newTop;
    var newLeft;
    var scrollTop; // eslint-disable-line

    var scrollLeft; // eslint-disable-line

    var animateTop = top > 0 || top === 0;
    var animateLeft = left > 0 || left === 0;

    if (typeof easing === 'undefined') {
      easing = 'swing';
    }

    if (animateTop) {
      currentTop = el.scrollTop;

      if (!duration) {
        el.scrollTop = top;
      }
    }

    if (animateLeft) {
      currentLeft = el.scrollLeft;

      if (!duration) {
        el.scrollLeft = left;
      }
    }

    if (!duration) return;

    if (animateTop) {
      maxTop = el.scrollHeight - el.offsetHeight;
      newTop = Math.max(Math.min(top, maxTop), 0);
    }

    if (animateLeft) {
      maxLeft = el.scrollWidth - el.offsetWidth;
      newLeft = Math.max(Math.min(left, maxLeft), 0);
    }

    var startTime = null;
    if (animateTop && newTop === currentTop) animateTop = false;
    if (animateLeft && newLeft === currentLeft) animateLeft = false;

    function render() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();

      if (startTime === null) {
        startTime = time;
      }

      var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      var easeProgress = easing === 'linear' ? progress : 0.5 - Math.cos(progress * Math.PI) / 2;
      var done;
      if (animateTop) scrollTop = currentTop + easeProgress * (newTop - currentTop);
      if (animateLeft) scrollLeft = currentLeft + easeProgress * (newLeft - currentLeft);

      if (animateTop && newTop > currentTop && scrollTop >= newTop) {
        el.scrollTop = newTop;
        done = true;
      }

      if (animateTop && newTop < currentTop && scrollTop <= newTop) {
        el.scrollTop = newTop;
        done = true;
      }

      if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
        el.scrollLeft = newLeft;
        done = true;
      }

      if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
        el.scrollLeft = newLeft;
        done = true;
      }

      if (done) {
        if (callback) callback();
        return;
      }

      if (animateTop) el.scrollTop = scrollTop;
      if (animateLeft) el.scrollLeft = scrollLeft;
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  });
} // scrollTop(top, duration, easing, callback) {


function scrollTop() {
  for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }

  var top = args[0],
      duration = args[1],
      easing = args[2],
      callback = args[3];

  if (args.length === 3 && typeof easing === 'function') {
    top = args[0];
    duration = args[1];
    callback = args[2];
    easing = args[3];
  }

  var dom = this;

  if (typeof top === 'undefined') {
    if (dom.length > 0) return dom[0].scrollTop;
    return null;
  }

  return dom.scrollTo(undefined, top, duration, easing, callback);
}

function scrollLeft() {
  for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }

  var left = args[0],
      duration = args[1],
      easing = args[2],
      callback = args[3];

  if (args.length === 3 && typeof easing === 'function') {
    left = args[0];
    duration = args[1];
    callback = args[2];
    easing = args[3];
  }

  var dom = this;

  if (typeof left === 'undefined') {
    if (dom.length > 0) return dom[0].scrollLeft;
    return null;
  }

  return dom.scrollTo(left, undefined, duration, easing, callback);
}

function dom7_modular_animate(initialProps, initialParams) {
  var els = this;
  var a = {
    props: assign_default()({}, initialProps),
    params: assign_default()({
      duration: 300,
      easing: 'swing' // or 'linear'

      /* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */

    }, initialParams),
    elements: els,
    animating: false,
    que: [],
    easingProgress: function easingProgress(easing, progress) {
      if (easing === 'swing') {
        return 0.5 - Math.cos(progress * Math.PI) / 2;
      }

      if (typeof easing === 'function') {
        return easing(progress);
      }

      return progress;
    },
    stop: function stop() {
      if (a.frameId) {
        cancelAnimationFrame(a.frameId);
      }

      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      a.que = [];
    },
    done: function done(complete) {
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      if (complete) complete(els);

      if (a.que.length > 0) {
        var que = a.que.shift();
        a.animate(que[0], que[1]);
      }
    },
    animate: function animate(props, params) {
      if (a.animating) {
        a.que.push([props, params]);
        return a;
      }

      var elements = []; // Define & Cache Initials & Units

      a.elements.each(function (index, el) {
        var _context3;

        var initialFullValue;
        var initialValue;
        var unit;
        var finalValue;
        var finalFullValue;
        if (!el.dom7AnimateInstance) a.elements[index].dom7AnimateInstance = a;
        elements[index] = {
          container: el
        };

        for_each_default()(_context3 = keys_default()(props)).call(_context3, function (prop) {
          initialFullValue = win.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
          initialValue = parse_float_default()(initialFullValue);
          unit = initialFullValue.replace(initialValue, '');
          finalValue = parse_float_default()(props[prop]);
          finalFullValue = props[prop] + unit;
          elements[index][prop] = {
            initialFullValue: initialFullValue,
            initialValue: initialValue,
            unit: unit,
            finalValue: finalValue,
            finalFullValue: finalFullValue,
            currentValue: initialValue
          };
        });
      });
      var startTime = null;
      var time;
      var elementsDone = 0;
      var propsDone = 0;
      var done;
      var began = false;
      a.animating = true;

      function render() {
        time = new Date().getTime();
        var progress;
        var easeProgress; // let el;

        if (!began) {
          began = true;
          if (params.begin) params.begin(els);
        }

        if (startTime === null) {
          startTime = time;
        }

        if (params.progress) {
          // eslint-disable-next-line
          params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), startTime + params.duration - time < 0 ? 0 : startTime + params.duration - time, startTime);
        }

        for_each_default()(elements).call(elements, function (element) {
          var _context4;

          var el = element;
          if (done || el.done) return;

          for_each_default()(_context4 = keys_default()(props)).call(_context4, function (prop) {
            if (done || el.done) return;
            progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
            easeProgress = a.easingProgress(params.easing, progress);
            var _el$prop = el[prop],
                initialValue = _el$prop.initialValue,
                finalValue = _el$prop.finalValue,
                unit = _el$prop.unit;
            el[prop].currentValue = initialValue + easeProgress * (finalValue - initialValue);
            var currentValue = el[prop].currentValue;

            if (finalValue > initialValue && currentValue >= finalValue || finalValue < initialValue && currentValue <= finalValue) {
              el.container.style[prop] = finalValue + unit;
              propsDone += 1;

              if (propsDone === keys_default()(props).length) {
                el.done = true;
                elementsDone += 1;
              }

              if (elementsDone === elements.length) {
                done = true;
              }
            }

            if (done) {
              a.done(params.complete);
              return;
            }

            el.container.style[prop] = currentValue + unit;
          });
        });

        if (done) return; // Then call

        a.frameId = requestAnimationFrame(render);
      }

      a.frameId = requestAnimationFrame(render);
      return a;
    }
  };

  if (a.elements.length === 0) {
    return els;
  }

  var animateInstance;

  for (var i = 0; i < a.elements.length; i += 1) {
    if (a.elements[i].dom7AnimateInstance) {
      animateInstance = a.elements[i].dom7AnimateInstance;
    } else a.elements[i].dom7AnimateInstance = a;
  }

  if (!animateInstance) {
    animateInstance = a;
  }

  if (initialProps === 'stop') {
    animateInstance.stop();
  } else {
    animateInstance.animate(a.props, a.params);
  }

  return els;
}

function stop() {
  var els = this;

  for (var i = 0; i < els.length; i += 1) {
    if (els[i].dom7AnimateInstance) {
      els[i].dom7AnimateInstance.stop();
    }
  }
}

var noTrigger = 'resize scroll'.split(' ');

function eventShortcut(name) {
  var _context5;

  for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
    args[_key10 - 1] = arguments[_key10];
  }

  if (typeof args[0] === 'undefined') {
    for (var i = 0; i < this.length; i += 1) {
      if (index_of_default()(noTrigger).call(noTrigger, name) < 0) {
        if (name in this[i]) this[i][name]();else {
          $(this[i]).trigger(name);
        }
      }
    }

    return this;
  }

  return this.on.apply(this, concat_default()(_context5 = [name]).call(_context5, args));
}

function dom7_modular_click() {
  var _context6;

  for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    args[_key11] = arguments[_key11];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context6 = ['click']).call(_context6, args));
}

function dom7_modular_blur() {
  var _context7;

  for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    args[_key12] = arguments[_key12];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context7 = ['blur']).call(_context7, args));
}

function dom7_modular_focus() {
  var _context8;

  for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
    args[_key13] = arguments[_key13];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context8 = ['focus']).call(_context8, args));
}

function focusin() {
  var _context9;

  for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
    args[_key14] = arguments[_key14];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context9 = ['focusin']).call(_context9, args));
}

function focusout() {
  var _context10;

  for (var _len15 = arguments.length, args = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
    args[_key15] = arguments[_key15];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context10 = ['focusout']).call(_context10, args));
}

function keyup() {
  var _context11;

  for (var _len16 = arguments.length, args = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
    args[_key16] = arguments[_key16];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context11 = ['keyup']).call(_context11, args));
}

function keydown() {
  var _context12;

  for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
    args[_key17] = arguments[_key17];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context12 = ['keydown']).call(_context12, args));
}

function keypress() {
  var _context13;

  for (var _len18 = arguments.length, args = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
    args[_key18] = arguments[_key18];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context13 = ['keypress']).call(_context13, args));
}

function dom7_modular_submit() {
  var _context14;

  for (var _len19 = arguments.length, args = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
    args[_key19] = arguments[_key19];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context14 = ['submit']).call(_context14, args));
}

function change() {
  var _context15;

  for (var _len20 = arguments.length, args = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
    args[_key20] = arguments[_key20];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context15 = ['change']).call(_context15, args));
}

function mousedown() {
  var _context16;

  for (var _len21 = arguments.length, args = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
    args[_key21] = arguments[_key21];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context16 = ['mousedown']).call(_context16, args));
}

function mousemove() {
  var _context17;

  for (var _len22 = arguments.length, args = new Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
    args[_key22] = arguments[_key22];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context17 = ['mousemove']).call(_context17, args));
}

function mouseup() {
  var _context18;

  for (var _len23 = arguments.length, args = new Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
    args[_key23] = arguments[_key23];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context18 = ['mouseup']).call(_context18, args));
}

function mouseenter() {
  var _context19;

  for (var _len24 = arguments.length, args = new Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
    args[_key24] = arguments[_key24];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context19 = ['mouseenter']).call(_context19, args));
}

function mouseleave() {
  var _context20;

  for (var _len25 = arguments.length, args = new Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
    args[_key25] = arguments[_key25];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context20 = ['mouseleave']).call(_context20, args));
}

function mouseout() {
  var _context21;

  for (var _len26 = arguments.length, args = new Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
    args[_key26] = arguments[_key26];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context21 = ['mouseout']).call(_context21, args));
}

function mouseover() {
  var _context22;

  for (var _len27 = arguments.length, args = new Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
    args[_key27] = arguments[_key27];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context22 = ['mouseover']).call(_context22, args));
}

function touchstart() {
  var _context23;

  for (var _len28 = arguments.length, args = new Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
    args[_key28] = arguments[_key28];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context23 = ['touchstart']).call(_context23, args));
}

function touchend() {
  var _context24;

  for (var _len29 = arguments.length, args = new Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
    args[_key29] = arguments[_key29];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context24 = ['touchend']).call(_context24, args));
}

function touchmove() {
  var _context25;

  for (var _len30 = arguments.length, args = new Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
    args[_key30] = arguments[_key30];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context25 = ['touchmove']).call(_context25, args));
}

function resize() {
  var _context26;

  for (var _len31 = arguments.length, args = new Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
    args[_key31] = arguments[_key31];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context26 = ['resize']).call(_context26, args));
}

function dom7_modular_scroll() {
  var _context27;

  for (var _len32 = arguments.length, args = new Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
    args[_key32] = arguments[_key32];
  }

  return bind_default()(eventShortcut).call(eventShortcut, this).apply(void 0, concat_default()(_context27 = ['scroll']).call(_context27, args));
}


// CONCATENATED MODULE: ./node_modules/ssr-window/dist/ssr-window.esm.js
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
var ssr_window_esm_doc = typeof document === 'undefined' ? {
  body: {},
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  activeElement: {
    blur: function blur() {},
    nodeName: ''
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
      initEvent: function initEvent() {}
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
      }
    };
  },
  location: {
    hash: ''
  }
} : document; // eslint-disable-line

var ssr_window_esm_win = typeof window === 'undefined' ? {
  document: ssr_window_esm_doc,
  navigator: {
    userAgent: ''
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
      }
    };
  },
  Image: function Image() {},
  Date: function Date() {},
  screen: {},
  setTimeout: function setTimeout() {},
  clearTimeout: function clearTimeout() {}
} : window; // eslint-disable-line


// CONCATENATED MODULE: ./node_modules/swiper/dist/js/swiper.esm.bundle.js




































var swiper_esm_bundle_context;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = construct_default()(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct_default.a) return false; if (construct_default.a.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct_default()(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Swiper 4.5.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 13, 2019
 */


var Methods = {
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  toggleClass: toggleClass,
  attr: attr,
  removeAttr: removeAttr,
  data: dom7_modular_data,
  transform: dom7_modular_transform,
  transition: transition,
  on: dom7_modular_on,
  off: dom7_modular_off,
  trigger: trigger,
  transitionEnd: transitionEnd,
  outerWidth: dom7_modular_outerWidth,
  outerHeight: dom7_modular_outerHeight,
  offset: dom7_modular_offset,
  css: css,
  each: each,
  html: html,
  text: dom7_modular_text,
  is: is,
  index: dom7_modular_index,
  eq: eq,
  append: append,
  prepend: prepend,
  next: next,
  nextAll: nextAll,
  prev: prev,
  prevAll: prevAll,
  parent: dom7_modular_parent,
  parents: parents,
  closest: dom7_modular_closest,
  find: dom7_modular_find,
  children: children,
  remove: remove,
  add: add,
  styles: styles
};

for_each_default()(swiper_esm_bundle_context = keys_default()(Methods)).call(swiper_esm_bundle_context, function (methodName) {
  $.fn[methodName] = $.fn[methodName] || Methods[methodName];
});

var Utils = {
  deleteProps: function deleteProps(obj) {
    var _context2;

    var object = obj;

    for_each_default()(_context2 = keys_default()(object)).call(_context2, function (key) {
      try {
        object[key] = null;
      } catch (e) {// no getter for object
      }

      try {
        delete object[key];
      } catch (e) {// something got wrong
      }
    });
  },
  nextTick: function nextTick(callback) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return set_timeout_default()(callback, delay);
  },
  now: function now() {
    return now_default()();
  },
  getTranslate: function getTranslate(el) {
    var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
    var matrix;
    var curTransform;
    var transformMatrix;
    var curStyle = ssr_window_esm_win.getComputedStyle(el, null);

    if (ssr_window_esm_win.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;

      if (curTransform.split(',').length > 6) {
        var _context3;

        curTransform = map_default()(_context3 = curTransform.split(', ')).call(_context3, function (a) {
          return a.replace(',', '.');
        }).join(', ');
      } // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case


      transformMatrix = new ssr_window_esm_win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (ssr_window_esm_win.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parse_float_default()(matrix[12]); // Normal Browsers
        else curTransform = parse_float_default()(matrix[4]);
    }

    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (ssr_window_esm_win.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parse_float_default()(matrix[13]); // Normal Browsers
        else curTransform = parse_float_default()(matrix[5]);
    }

    return curTransform || 0;
  },
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || ssr_window_esm_win.location.href;
    var i;
    var params;
    var param;
    var length;

    if (typeof urlToParse === 'string' && urlToParse.length) {
      var _context4;

      urlToParse = index_of_default()(urlToParse).call(urlToParse, '?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = filter_default()(_context4 = urlToParse.split('&')).call(_context4, function (paramsPart) {
        return paramsPart !== '';
      });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }

    return query;
  },
  isObject: function isObject(o) {
    return typeof_default()(o) === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  extend: function extend() {
    var to = Object(arguments.length <= 0 ? undefined : arguments[0]);

    for (var i = 1; i < arguments.length; i += 1) {
      var nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];

      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = keys_default()(Object(nextSource));

        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];

          var desc = get_own_property_descriptor_default()(nextSource, nextKey);

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
  }
};

var swiper_esm_bundle_Support = function Support() {
  var testDiv = ssr_window_esm_doc.createElement('div');
  return {
    touch: ssr_window_esm_win.Modernizr && ssr_window_esm_win.Modernizr.touch === true || function checkTouch() {
      return !!(ssr_window_esm_win.navigator.maxTouchPoints > 0 || 'ontouchstart' in ssr_window_esm_win || ssr_window_esm_win.DocumentTouch && ssr_window_esm_doc instanceof ssr_window_esm_win.DocumentTouch);
    }(),
    pointerEvents: !!(ssr_window_esm_win.navigator.pointerEnabled || ssr_window_esm_win.PointerEvent || 'maxTouchPoints' in ssr_window_esm_win.navigator && ssr_window_esm_win.navigator.maxTouchPoints > 0),
    prefixedPointerEvents: !!ssr_window_esm_win.navigator.msPointerEnabled,
    transition: function checkTransition() {
      var style = testDiv.style;
      return 'transition' in style || 'webkitTransition' in style || 'MozTransition' in style;
    }(),
    transforms3d: ssr_window_esm_win.Modernizr && ssr_window_esm_win.Modernizr.csstransforms3d === true || function checkTransforms3d() {
      var style = testDiv.style;
      return 'webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style;
    }(),
    flexbox: function checkFlexbox() {
      var style = testDiv.style;
      var styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');

      for (var i = 0; i < styles.length; i += 1) {
        if (styles[i] in style) return true;
      }

      return false;
    }(),
    observer: function checkObserver() {
      return 'MutationObserver' in ssr_window_esm_win || 'WebkitMutationObserver' in ssr_window_esm_win;
    }(),
    passiveListener: function checkPassiveListener() {
      var supportsPassive = false;

      try {
        var opts = define_property_default()({}, 'passive', {
          // eslint-disable-next-line
          get: function get() {
            supportsPassive = true;
          }
        });

        ssr_window_esm_win.addEventListener('testPassiveListener', null, opts);
      } catch (e) {// No support
      }

      return supportsPassive;
    }(),
    gestures: function checkGestures() {
      return 'ongesturestart' in ssr_window_esm_win;
    }()
  };
}();

var swiper_esm_bundle_Browser = function Browser() {
  function isSafari() {
    var ua = ssr_window_esm_win.navigator.userAgent.toLowerCase();
    return index_of_default()(ua).call(ua, 'safari') >= 0 && index_of_default()(ua).call(ua, 'chrome') < 0 && index_of_default()(ua).call(ua, 'android') < 0;
  }

  return {
    isIE: !!ssr_window_esm_win.navigator.userAgent.match(/Trident/g) || !!ssr_window_esm_win.navigator.userAgent.match(/MSIE/g),
    isEdge: !!ssr_window_esm_win.navigator.userAgent.match(/Edge/g),
    isSafari: isSafari(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ssr_window_esm_win.navigator.userAgent)
  };
}();

var swiper_esm_bundle_SwiperClass = /*#__PURE__*/function () {
  function SwiperClass() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    classCallCheck_default()(this, SwiperClass);

    var self = this;
    self.params = params; // Events

    self.eventsListeners = {};

    if (self.params && self.params.on) {
      var _context5;

      for_each_default()(_context5 = keys_default()(self.params.on)).call(_context5, function (eventName) {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  }

  createClass_default()(SwiperClass, [{
    key: "on",
    value: function on(events, handler, priority) {
      var _context6;

      var self = this;
      if (typeof handler !== 'function') return self;
      var method = priority ? 'unshift' : 'push';

      for_each_default()(_context6 = events.split(' ')).call(_context6, function (event) {
        if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
        self.eventsListeners[event][method](handler);
      });

      return self;
    }
  }, {
    key: "once",
    value: function once(events, handler, priority) {
      var self = this;
      if (typeof handler !== 'function') return self;

      function onceHandler() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        handler.apply(self, args);
        self.off(events, onceHandler);

        if (onceHandler.f7proxy) {
          delete onceHandler.f7proxy;
        }
      }

      onceHandler.f7proxy = handler;
      return self.on(events, onceHandler, priority);
    }
  }, {
    key: "off",
    value: function off(events, handler) {
      var _context7;

      var self = this;
      if (!self.eventsListeners) return self;

      for_each_default()(_context7 = events.split(' ')).call(_context7, function (event) {
        if (typeof handler === 'undefined') {
          self.eventsListeners[event] = [];
        } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
          var _context8;

          for_each_default()(_context8 = self.eventsListeners[event]).call(_context8, function (eventHandler, index) {
            if (eventHandler === handler || eventHandler.f7proxy && eventHandler.f7proxy === handler) {
              var _context9;

              splice_default()(_context9 = self.eventsListeners[event]).call(_context9, index, 1);
            }
          });
        }
      });

      return self;
    }
  }, {
    key: "emit",
    value: function emit() {
      var self = this;
      if (!self.eventsListeners) return self;
      var events;
      var data;
      var context;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (typeof args[0] === 'string' || is_array_default()(args[0])) {
        events = args[0];
        data = slice_default()(args).call(args, 1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }

      var eventsArray = is_array_default()(events) ? events : events.split(' ');

      for_each_default()(eventsArray).call(eventsArray, function (event) {
        if (self.eventsListeners && self.eventsListeners[event]) {
          var _context10;

          var handlers = [];

          for_each_default()(_context10 = self.eventsListeners[event]).call(_context10, function (eventHandler) {
            handlers.push(eventHandler);
          });

          for_each_default()(handlers).call(handlers, function (eventHandler) {
            eventHandler.apply(context, data);
          });
        }
      });

      return self;
    }
  }, {
    key: "useModulesParams",
    value: function useModulesParams(instanceParams) {
      var _context11;

      var instance = this;
      if (!instance.modules) return;

      for_each_default()(_context11 = keys_default()(instance.modules)).call(_context11, function (moduleName) {
        var module = instance.modules[moduleName]; // Extend params

        if (module.params) {
          Utils.extend(instanceParams, module.params);
        }
      });
    }
  }, {
    key: "useModules",
    value: function useModules() {
      var _context12;

      var modulesParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var instance = this;
      if (!instance.modules) return;

      for_each_default()(_context12 = keys_default()(instance.modules)).call(_context12, function (moduleName) {
        var module = instance.modules[moduleName];
        var moduleParams = modulesParams[moduleName] || {}; // Extend instance methods and props

        if (module.instance) {
          var _context13;

          for_each_default()(_context13 = keys_default()(module.instance)).call(_context13, function (modulePropName) {
            var moduleProp = module.instance[modulePropName];

            if (typeof moduleProp === 'function') {
              instance[modulePropName] = bind_default()(moduleProp).call(moduleProp, instance);
            } else {
              instance[modulePropName] = moduleProp;
            }
          });
        } // Add event listeners


        if (module.on && instance.on) {
          var _context14;

          for_each_default()(_context14 = keys_default()(module.on)).call(_context14, function (moduleEventName) {
            instance.on(moduleEventName, module.on[moduleEventName]);
          });
        } // Module create callback


        if (module.create) {
          var _context15;

          bind_default()(_context15 = module.create).call(_context15, instance)(moduleParams);
        }
      });
    }
  }], [{
    key: "installModule",
    value: function installModule(module) {
      var _context16;

      var Class = this;
      if (!Class.prototype.modules) Class.prototype.modules = {};

      var name = module.name || concat_default()(_context16 = "".concat(keys_default()(Class.prototype.modules).length, "_")).call(_context16, Utils.now());

      Class.prototype.modules[name] = module; // Prototype

      if (module.proto) {
        var _context17;

        for_each_default()(_context17 = keys_default()(module.proto)).call(_context17, function (key) {
          Class.prototype[key] = module.proto[key];
        });
      } // Class


      if (module.static) {
        var _context18;

        for_each_default()(_context18 = keys_default()(module.static)).call(_context18, function (key) {
          Class[key] = module.static[key];
        });
      } // Callback


      if (module.install) {
        for (var _len3 = arguments.length, params = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          params[_key3 - 1] = arguments[_key3];
        }

        module.install.apply(Class, params);
      }

      return Class;
    }
  }, {
    key: "use",
    value: function use(module) {
      var _context19;

      var Class = this;

      if (is_array_default()(module)) {
        for_each_default()(module).call(module, function (m) {
          return Class.installModule(m);
        });

        return Class;
      }

      for (var _len4 = arguments.length, params = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        params[_key4 - 1] = arguments[_key4];
      }

      return Class.installModule.apply(Class, concat_default()(_context19 = [module]).call(_context19, params));
    }
  }, {
    key: "components",
    set: function set(components) {
      var Class = this;
      if (!Class.use) return;
      Class.use(components);
    }
  }]);

  return SwiperClass;
}();

function swiper_esm_bundle_updateSize() {
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

  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  } // Subtract paddings


  width = width - parse_int_default()($el.css('padding-left'), 10) - parse_int_default()($el.css('padding-right'), 10);
  height = height - parse_int_default()($el.css('padding-top'), 10) - parse_int_default()($el.css('padding-bottom'), 10);
  Utils.extend(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height
  });
}

function updateSlides() {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl,
      swiperSize = swiper.size,
      rtl = swiper.rtlTranslate,
      wrongRTL = swiper.wrongRTL;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  var slides = $wrapperEl.children(".".concat(swiper.params.slideClass));
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

  if (typeof spaceBetween === 'string' && index_of_default()(spaceBetween).call(spaceBetween, '%') >= 0) {
    spaceBetween = parse_float_default()(spaceBetween.replace('%', '')) / 100 * swiperSize;
  }

  swiper.virtualSize = -spaceBetween; // reset margins

  if (rtl) slides.css({
    marginLeft: '',
    marginTop: ''
  });else slides.css({
    marginRight: '',
    marginBottom: ''
  });
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
  } // Calc slides


  var slideSize;
  var slidesPerColumn = params.slidesPerColumn;
  var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
  var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);

  for (var i = 0; i < slidesLength; i += 1) {
    slideSize = 0;

    var _slide = slides.eq(i);

    if (params.slidesPerColumn > 1) {
      // Set slides order
      var newSlideOrderIndex = void 0;
      var column = void 0;
      var row = void 0;

      if (params.slidesPerColumnFill === 'column' || params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1) {
        if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - column * slidesPerColumn;

          if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
            row += 1;

            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
        } else {
          var groupIndex = Math.floor(i / params.slidesPerGroup);
          row = Math.floor(i / params.slidesPerView) - groupIndex * params.slidesPerColumn;
          column = i - row * params.slidesPerView - groupIndex * params.slidesPerView;
        }

        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;

        _slide.css({
          '-webkit-box-ordinal-group': newSlideOrderIndex,
          '-moz-box-ordinal-group': newSlideOrderIndex,
          '-ms-flex-order': newSlideOrderIndex,
          '-webkit-order': newSlideOrderIndex,
          order: newSlideOrderIndex
        });
      } else {
        row = Math.floor(i / slidesPerRow);
        column = i - row * slidesPerRow;
      }

      _slide.css("margin-".concat(swiper.isHorizontal() ? 'top' : 'left'), row !== 0 && params.spaceBetween && "".concat(params.spaceBetween, "px")).attr('data-swiper-column', column).attr('data-swiper-row', row);
    }

    if (_slide.css('display') === 'none') continue; // eslint-disable-line

    if (params.slidesPerView === 'auto') {
      var slideStyles = ssr_window_esm_win.getComputedStyle(_slide[0], null);
      var currentTransform = _slide[0].style.transform;
      var currentWebKitTransform = _slide[0].style.webkitTransform;

      if (currentTransform) {
        _slide[0].style.transform = 'none';
      }

      if (currentWebKitTransform) {
        _slide[0].style.webkitTransform = 'none';
      }

      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? _slide.outerWidth(true) : _slide.outerHeight(true);
      } else {
        // eslint-disable-next-line
        if (swiper.isHorizontal()) {
          var width = parse_float_default()(slideStyles.getPropertyValue('width'));

          var paddingLeft = parse_float_default()(slideStyles.getPropertyValue('padding-left'));

          var paddingRight = parse_float_default()(slideStyles.getPropertyValue('padding-right'));

          var marginLeft = parse_float_default()(slideStyles.getPropertyValue('margin-left'));

          var marginRight = parse_float_default()(slideStyles.getPropertyValue('margin-right'));

          var boxSizing = slideStyles.getPropertyValue('box-sizing');

          if (boxSizing && boxSizing === 'border-box' && !swiper_esm_bundle_Browser.isIE) {
            slideSize = width + marginLeft + marginRight;
          } else {
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
          }
        } else {
          var height = parse_float_default()(slideStyles.getPropertyValue('height'));

          var paddingTop = parse_float_default()(slideStyles.getPropertyValue('padding-top'));

          var paddingBottom = parse_float_default()(slideStyles.getPropertyValue('padding-bottom'));

          var marginTop = parse_float_default()(slideStyles.getPropertyValue('margin-top'));

          var marginBottom = parse_float_default()(slideStyles.getPropertyValue('margin-bottom'));

          var _boxSizing = slideStyles.getPropertyValue('box-sizing');

          if (_boxSizing && _boxSizing === 'border-box' && !swiper_esm_bundle_Browser.isIE) {
            slideSize = height + marginTop + marginBottom;
          } else {
            slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
          }
        }
      }

      if (currentTransform) {
        _slide[0].style.transform = currentTransform;
      }

      if (currentWebKitTransform) {
        _slide[0].style.webkitTransform = currentWebKitTransform;
      }

      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);

      if (slides[i]) {
        if (swiper.isHorizontal()) {
          slides[i].style.width = "".concat(slideSize, "px");
        } else {
          slides[i].style.height = "".concat(slideSize, "px");
        }
      }
    }

    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }

    slidesSizesGrid.push(slideSize);

    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }

    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }

  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  var newSlidesGrid;

  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({
      width: "".concat(swiper.virtualSize + params.spaceBetween, "px")
    });
  }

  if (!swiper_esm_bundle_Support.flexbox || params.setWrapperSize) {
    if (swiper.isHorizontal()) $wrapperEl.css({
      width: "".concat(swiper.virtualSize + params.spaceBetween, "px")
    });else $wrapperEl.css({
      height: "".concat(swiper.virtualSize + params.spaceBetween, "px")
    });
  }

  if (params.slidesPerColumn > 1) {
    swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
    if (swiper.isHorizontal()) $wrapperEl.css({
      width: "".concat(swiper.virtualSize + params.spaceBetween, "px")
    });else $wrapperEl.css({
      height: "".concat(swiper.virtualSize + params.spaceBetween, "px")
    });

    if (params.centeredSlides) {
      newSlidesGrid = [];

      for (var _i = 0; _i < snapGrid.length; _i += 1) {
        var slidesGridItem = snapGrid[_i];
        if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[_i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }

      snapGrid = newSlidesGrid;
    }
  } // Remove last grid elements depending on width


  if (!params.centeredSlides) {
    newSlidesGrid = [];

    for (var _i2 = 0; _i2 < snapGrid.length; _i2 += 1) {
      var _slidesGridItem = snapGrid[_i2];
      if (params.roundLengths) _slidesGridItem = Math.floor(_slidesGridItem);

      if (snapGrid[_i2] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(_slidesGridItem);
      }
    }

    snapGrid = newSlidesGrid;

    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }

  if (snapGrid.length === 0) snapGrid = [0];

  if (params.spaceBetween !== 0) {
    if (swiper.isHorizontal()) {
      if (rtl) slides.css({
        marginLeft: "".concat(spaceBetween, "px")
      });else slides.css({
        marginRight: "".concat(spaceBetween, "px")
      });
    } else slides.css({
      marginBottom: "".concat(spaceBetween, "px")
    });
  }

  if (params.centerInsufficientSlides) {
    var allSlidesSize = 0;

    for_each_default()(slidesSizesGrid).call(slidesSizesGrid, function (slideSizeValue) {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });

    allSlidesSize -= params.spaceBetween;

    if (allSlidesSize < swiperSize) {
      var allSlidesOffset = (swiperSize - allSlidesSize) / 2;

      for_each_default()(snapGrid).call(snapGrid, function (snap, snapIndex) {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });

      for_each_default()(slidesGrid).call(slidesGrid, function (snap, snapIndex) {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }

  Utils.extend(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid
  });

  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }

  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }

  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateSlidesOffset();
  }
}

function updateAutoHeight(speed) {
  var swiper = this;
  var activeSlides = [];
  var newHeight = 0;
  var i;

  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  } // Find slides currently in view


  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
      var _index = swiper.activeIndex + i;

      if (_index > swiper.slides.length) break;
      activeSlides.push(swiper.slides.eq(_index)[0]);
    }
  } else {
    activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
  } // Find new height from highest slide in view


  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      var height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  } // Update Height


  if (newHeight) swiper.$wrapperEl.css('height', "".concat(newHeight, "px"));
}

function updateSlidesOffset() {
  var swiper = this;
  var slides = swiper.slides;

  for (var i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
  }
}

function updateSlidesProgress() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this && this.translate || 0;
  var swiper = this;
  var params = swiper.params;
  var slides = swiper.slides,
      rtl = swiper.rtlTranslate;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  var offsetCenter = -translate;
  if (rtl) offsetCenter = translate; // Visible Slides

  slides.removeClass(params.slideVisibleClass);
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];

  for (var i = 0; i < slides.length; i += 1) {
    var _slide2 = slides[i];
    var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - _slide2.swiperSlideOffset) / (_slide2.swiperSlideSize + params.spaceBetween);

    if (params.watchSlidesVisibility) {
      var slideBefore = -(offsetCenter - _slide2.swiperSlideOffset);
      var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      var isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

      if (isVisible) {
        swiper.visibleSlides.push(_slide2);
        swiper.visibleSlidesIndexes.push(i);
        slides.eq(i).addClass(params.slideVisibleClass);
      }
    }

    _slide2.progress = rtl ? -slideProgress : slideProgress;
  }

  swiper.visibleSlides = $(swiper.visibleSlides);
}

function updateProgress() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this && this.translate || 0;
  var swiper = this;
  var params = swiper.params;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress,
      isBeginning = swiper.isBeginning,
      isEnd = swiper.isEnd;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;

  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }

  Utils.extend(swiper, {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd
  });
  if (params.watchSlidesProgress || params.watchSlidesVisibility) swiper.updateSlidesProgress(translate);

  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }

  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }

  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }

  swiper.emit('progress', progress);
}

function updateSlidesClasses() {
  var _context20, _context21, _context22, _context23, _context24;

  var swiper = this;
  var slides = swiper.slides,
      params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      activeIndex = swiper.activeIndex,
      realIndex = swiper.realIndex;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  slides.removeClass(concat_default()(_context20 = concat_default()(_context21 = concat_default()(_context22 = concat_default()(_context23 = concat_default()(_context24 = "".concat(params.slideActiveClass, " ")).call(_context24, params.slideNextClass, " ")).call(_context23, params.slidePrevClass, " ")).call(_context22, params.slideDuplicateActiveClass, " ")).call(_context21, params.slideDuplicateNextClass, " ")).call(_context20, params.slideDuplicatePrevClass));
  var activeSlide;

  if (isVirtual) {
    var _context25, _context26;

    activeSlide = find_default()(_context25 = swiper.$wrapperEl).call(_context25, concat_default()(_context26 = ".".concat(params.slideClass, "[data-swiper-slide-index=\"")).call(_context26, activeIndex, "\"]"));
  } else {
    activeSlide = slides.eq(activeIndex);
  } // Active classes


  activeSlide.addClass(params.slideActiveClass);

  if (params.loop) {
    // Duplicate to all looped slides
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      var _context27, _context28;

      $wrapperEl.children(concat_default()(_context27 = concat_default()(_context28 = ".".concat(params.slideClass, ":not(.")).call(_context28, params.slideDuplicateClass, ")[data-swiper-slide-index=\"")).call(_context27, realIndex, "\"]")).addClass(params.slideDuplicateActiveClass);
    } else {
      var _context29, _context30;

      $wrapperEl.children(concat_default()(_context29 = concat_default()(_context30 = ".".concat(params.slideClass, ".")).call(_context30, params.slideDuplicateClass, "[data-swiper-slide-index=\"")).call(_context29, realIndex, "\"]")).addClass(params.slideDuplicateActiveClass);
    }
  } // Next Slide


  var nextSlide = activeSlide.nextAll(".".concat(params.slideClass)).eq(0).addClass(params.slideNextClass);

  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  } // Prev Slide


  var prevSlide = activeSlide.prevAll(".".concat(params.slideClass)).eq(0).addClass(params.slidePrevClass);

  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }

  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      var _context31, _context32;

      $wrapperEl.children(concat_default()(_context31 = concat_default()(_context32 = ".".concat(params.slideClass, ":not(.")).call(_context32, params.slideDuplicateClass, ")[data-swiper-slide-index=\"")).call(_context31, nextSlide.attr('data-swiper-slide-index'), "\"]")).addClass(params.slideDuplicateNextClass);
    } else {
      var _context33, _context34;

      $wrapperEl.children(concat_default()(_context33 = concat_default()(_context34 = ".".concat(params.slideClass, ".")).call(_context34, params.slideDuplicateClass, "[data-swiper-slide-index=\"")).call(_context33, nextSlide.attr('data-swiper-slide-index'), "\"]")).addClass(params.slideDuplicateNextClass);
    }

    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      var _context35, _context36;

      $wrapperEl.children(concat_default()(_context35 = concat_default()(_context36 = ".".concat(params.slideClass, ":not(.")).call(_context36, params.slideDuplicateClass, ")[data-swiper-slide-index=\"")).call(_context35, prevSlide.attr('data-swiper-slide-index'), "\"]")).addClass(params.slideDuplicatePrevClass);
    } else {
      var _context37, _context38;

      $wrapperEl.children(concat_default()(_context37 = concat_default()(_context38 = ".".concat(params.slideClass, ".")).call(_context38, params.slideDuplicateClass, "[data-swiper-slide-index=\"")).call(_context37, prevSlide.attr('data-swiper-slide-index'), "\"]")).addClass(params.slideDuplicatePrevClass);
    }
  }
}

function updateActiveIndex(newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  var slidesGrid = swiper.slidesGrid,
      snapGrid = swiper.snapGrid,
      params = swiper.params,
      previousIndex = swiper.activeIndex,
      previousRealIndex = swiper.realIndex,
      previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;

  if (typeof activeIndex === 'undefined') {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    } // Normalize slideIndex


    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
    }
  }

  if (index_of_default()(snapGrid).call(snapGrid, translate) >= 0) {
    snapIndex = index_of_default()(snapGrid).call(snapGrid, translate);
  } else {
    snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
  }

  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }

    return;
  } // Get real index


  var realIndex = parse_int_default()(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

  Utils.extend(swiper, {
    snapIndex: snapIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex
  });
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');

  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }

  if (swiper.initialized || swiper.runCallbacksOnInit) {
    swiper.emit('slideChange');
  }
}

function updateClickedSlide(e) {
  var swiper = this;
  var params = swiper.params;
  var slide = $(e.target).closest(".".concat(params.slideClass))[0];
  var slideFound = false;

  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) slideFound = true;
    }
  }

  if (slide && slideFound) {
    swiper.clickedSlide = slide;

    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parse_int_default()($(slide).attr('data-swiper-slide-index'), 10);
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

var swiper_esm_bundle_update = {
  updateSize: swiper_esm_bundle_updateSize,
  updateSlides: updateSlides,
  updateAutoHeight: updateAutoHeight,
  updateSlidesOffset: updateSlidesOffset,
  updateSlidesProgress: updateSlidesProgress,
  updateProgress: updateProgress,
  updateSlidesClasses: updateSlidesClasses,
  updateActiveIndex: updateActiveIndex,
  updateClickedSlide: updateClickedSlide
};

function swiper_esm_bundle_getTranslate() {
  var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isHorizontal() ? 'x' : 'y';
  var swiper = this;
  var params = swiper.params,
      rtl = swiper.rtlTranslate,
      translate = swiper.translate,
      $wrapperEl = swiper.$wrapperEl;

  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }

  var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

function swiper_esm_bundle_setTranslate(translate, byController) {
  var swiper = this;
  var rtl = swiper.rtlTranslate,
      params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      progress = swiper.progress;
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
    var _context39, _context40, _context41;

    if (swiper_esm_bundle_Support.transforms3d) $wrapperEl.transform(concat_default()(_context39 = concat_default()(_context40 = "translate3d(".concat(x, "px, ")).call(_context40, y, "px, ")).call(_context39, z, "px)"));else $wrapperEl.transform(concat_default()(_context41 = "translate(".concat(x, "px, ")).call(_context41, y, "px)"));
  }

  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }

  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }

  swiper.emit('setTranslate', swiper.translate, byController);
}

function minTranslate() {
  return -this.snapGrid[0];
}

function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

var swiper_esm_bundle_translate = {
  getTranslate: swiper_esm_bundle_getTranslate,
  setTranslate: swiper_esm_bundle_setTranslate,
  minTranslate: minTranslate,
  maxTranslate: maxTranslate
};

function swiper_esm_bundle_setTransition(duration, byController) {
  var swiper = this;
  swiper.$wrapperEl.transition(duration);
  swiper.emit('setTransition', duration, byController);
}

function transitionStart() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var activeIndex = swiper.activeIndex,
      params = swiper.params,
      previousIndex = swiper.previousIndex;

  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }

  var dir = direction;

  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
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

function swiper_esm_bundle_transitionEnd() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var activeIndex = swiper.activeIndex,
      previousIndex = swiper.previousIndex;
  swiper.animating = false;
  swiper.setTransition(0);
  var dir = direction;

  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
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

var swiper_esm_bundle_transition = {
  setTransition: swiper_esm_bundle_setTransition,
  transitionStart: transitionStart,
  transitionEnd: swiper_esm_bundle_transitionEnd
};

function slideTo() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  var swiper = this;
  var slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  var params = swiper.params,
      snapGrid = swiper.snapGrid,
      slidesGrid = swiper.slidesGrid,
      previousIndex = swiper.previousIndex,
      activeIndex = swiper.activeIndex,
      rtl = swiper.rtlTranslate;

  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }

  var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

  if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  var translate = -snapGrid[snapIndex]; // Update progress

  swiper.updateProgress(translate); // Normalize slideIndex

  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
        slideIndex = i;
      }
    }
  } // Directions locks


  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }

    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) return false;
    }
  }

  var direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
    swiper.updateActiveIndex(slideIndex); // Update Height

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

  if (speed === 0 || !swiper_esm_bundle_Support.transition) {
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
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
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

function slideToLoop() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  var swiper = this;
  var newIndex = index;

  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }

  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
/* eslint no-unused-vars: "off" */


function slideNext() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var params = swiper.params,
      animating = swiper.animating;

  if (params.loop) {
    if (animating) return false;
    swiper.loopFix(); // eslint-disable-next-line

    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }

  return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
}
/* eslint no-unused-vars: "off" */


function slidePrev() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var params = swiper.params,
      animating = swiper.animating,
      snapGrid = swiper.snapGrid,
      slidesGrid = swiper.slidesGrid,
      rtlTranslate = swiper.rtlTranslate;

  if (params.loop) {
    if (animating) return false;
    swiper.loopFix(); // eslint-disable-next-line

    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
  }

  var translate = rtlTranslate ? swiper.translate : -swiper.translate;

  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }

  var normalizedTranslate = normalize(translate);

  var normalizedSnapGrid = map_default()(snapGrid).call(snapGrid, function (val) {
    return normalize(val);
  });

  var normalizedSlidesGrid = map_default()(slidesGrid).call(slidesGrid, function (val) {
    return normalize(val);
  });

  var currentSnap = snapGrid[index_of_default()(normalizedSnapGrid).call(normalizedSnapGrid, normalizedTranslate)];

  var prevSnap = snapGrid[index_of_default()(normalizedSnapGrid).call(normalizedSnapGrid, normalizedTranslate) - 1];
  var prevIndex;

  if (typeof prevSnap !== 'undefined') {
    prevIndex = index_of_default()(slidesGrid).call(slidesGrid, prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
  }

  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
/* eslint no-unused-vars: "off" */


function slideReset() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
/* eslint no-unused-vars: "off" */


function slideToClosest() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var index = swiper.activeIndex;
  var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

  if (snapIndex < swiper.snapGrid.length - 1) {
    var _translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

    var currentSnap = swiper.snapGrid[snapIndex];
    var nextSnap = swiper.snapGrid[snapIndex + 1];

    if (_translate - currentSnap > (nextSnap - currentSnap) / 2) {
      index = swiper.params.slidesPerGroup;
    }
  }

  return swiper.slideTo(index, speed, runCallbacks, internal);
}

function slideToClickedSlide() {
  var swiper = this;
  var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl;
  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;

  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parse_int_default()($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        var _context42, _context43;

        swiper.loopFix();
        slideToIndex = $wrapperEl.children(concat_default()(_context42 = concat_default()(_context43 = ".".concat(params.slideClass, "[data-swiper-slide-index=\"")).call(_context43, realIndex, "\"]:not(.")).call(_context42, params.slideDuplicateClass, ")")).eq(0).index();
        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      var _context44, _context45;

      swiper.loopFix();
      slideToIndex = $wrapperEl.children(concat_default()(_context44 = concat_default()(_context45 = ".".concat(params.slideClass, "[data-swiper-slide-index=\"")).call(_context45, realIndex, "\"]:not(.")).call(_context44, params.slideDuplicateClass, ")")).eq(0).index();
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

var swiper_esm_bundle_slide = {
  slideTo: slideTo,
  slideToLoop: slideToLoop,
  slideNext: slideNext,
  slidePrev: slidePrev,
  slideReset: slideReset,
  slideToClosest: slideToClosest,
  slideToClickedSlide: slideToClickedSlide
};

function loopCreate() {
  var _context46;

  var swiper = this;
  var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl; // Remove duplicated slides

  $wrapperEl.children(concat_default()(_context46 = ".".concat(params.slideClass, ".")).call(_context46, params.slideDuplicateClass)).remove();
  var slides = $wrapperEl.children(".".concat(params.slideClass));

  if (params.loopFillGroupWithBlank) {
    var blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

    if (blankSlidesNum !== params.slidesPerGroup) {
      for (var i = 0; i < blankSlidesNum; i += 1) {
        var _context47;

        var blankNode = $(ssr_window_esm_doc.createElement('div')).addClass(concat_default()(_context47 = "".concat(params.slideClass, " ")).call(_context47, params.slideBlankClass));
        $wrapperEl.append(blankNode);
      }

      slides = $wrapperEl.children(".".concat(params.slideClass));
    }
  }

  if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
  swiper.loopedSlides = parse_int_default()(params.loopedSlides || params.slidesPerView, 10);
  swiper.loopedSlides += params.loopAdditionalSlides;

  if (swiper.loopedSlides > slides.length) {
    swiper.loopedSlides = slides.length;
  }

  var prependSlides = [];
  var appendSlides = [];
  slides.each(function (index, el) {
    var slide = $(el);
    if (index < swiper.loopedSlides) appendSlides.push(el);
    if (index < slides.length && index >= slides.length - swiper.loopedSlides) prependSlides.push(el);
    slide.attr('data-swiper-slide-index', index);
  });

  for (var _i3 = 0; _i3 < appendSlides.length; _i3 += 1) {
    $wrapperEl.append($(appendSlides[_i3].cloneNode(true)).addClass(params.slideDuplicateClass));
  }

  for (var _i4 = prependSlides.length - 1; _i4 >= 0; _i4 -= 1) {
    $wrapperEl.prepend($(prependSlides[_i4].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
}

function loopFix() {
  var swiper = this;
  var params = swiper.params,
      activeIndex = swiper.activeIndex,
      slides = swiper.slides,
      loopedSlides = swiper.loopedSlides,
      allowSlidePrev = swiper.allowSlidePrev,
      allowSlideNext = swiper.allowSlideNext,
      snapGrid = swiper.snapGrid,
      rtl = swiper.rtlTranslate;
  var newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  var snapTranslate = -snapGrid[activeIndex];
  var diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

  if (activeIndex < loopedSlides) {
    newIndex = slides.length - loopedSlides * 3 + activeIndex;
    newIndex += loopedSlides;
    var slideChanged = swiper.slideTo(newIndex, 0, false, true);

    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  } else if (params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2 || activeIndex >= slides.length - loopedSlides) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;

    var _slideChanged = swiper.slideTo(newIndex, 0, false, true);

    if (_slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  }

  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
}

function loopDestroy() {
  var _context48, _context49, _context50;

  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl,
      params = swiper.params,
      slides = swiper.slides;
  $wrapperEl.children(concat_default()(_context48 = concat_default()(_context49 = concat_default()(_context50 = ".".concat(params.slideClass, ".")).call(_context50, params.slideDuplicateClass, ",.")).call(_context49, params.slideClass, ".")).call(_context48, params.slideBlankClass)).remove();
  slides.removeAttr('data-swiper-slide-index');
}

var loop = {
  loopCreate: loopCreate,
  loopFix: loopFix,
  loopDestroy: loopDestroy
};

function setGrabCursor(moving) {
  var swiper = this;
  if (swiper_esm_bundle_Support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked) return;
  var el = swiper.el;
  el.style.cursor = 'move';
  el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
  el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
  el.style.cursor = moving ? 'grabbing' : 'grab';
}

function unsetGrabCursor() {
  var swiper = this;
  if (swiper_esm_bundle_Support.touch || swiper.params.watchOverflow && swiper.isLocked) return;
  swiper.el.style.cursor = '';
}

var grabCursor = {
  setGrabCursor: setGrabCursor,
  unsetGrabCursor: unsetGrabCursor
};

function swiper_esm_bundle_appendSlide(slides) {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl,
      params = swiper.params;

  if (params.loop) {
    swiper.loopDestroy();
  }

  if (typeof_default()(slides) === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.append(slides[i]);
    }
  } else {
    $wrapperEl.append(slides);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!(params.observer && swiper_esm_bundle_Support.observer)) {
    swiper.update();
  }
}

function swiper_esm_bundle_prependSlide(slides) {
  var swiper = this;
  var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
  }

  var newActiveIndex = activeIndex + 1;

  if (typeof_default()(slides) === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.prepend(slides[i]);
    }

    newActiveIndex = activeIndex + slides.length;
  } else {
    $wrapperEl.prepend(slides);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!(params.observer && swiper_esm_bundle_Support.observer)) {
    swiper.update();
  }

  swiper.slideTo(newActiveIndex, 0, false);
}

function addSlide(index, slides) {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl,
      params = swiper.params,
      activeIndex = swiper.activeIndex;
  var activeIndexBuffer = activeIndex;

  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.slides = $wrapperEl.children(".".concat(params.slideClass));
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

  if (typeof_default()(slides) === 'object' && 'length' in slides) {
    for (var _i5 = 0; _i5 < slides.length; _i5 += 1) {
      if (slides[_i5]) $wrapperEl.append(slides[_i5]);
    }

    newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    $wrapperEl.append(slides);
  }

  for (var _i6 = 0; _i6 < slidesBuffer.length; _i6 += 1) {
    $wrapperEl.append(slidesBuffer[_i6]);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!(params.observer && swiper_esm_bundle_Support.observer)) {
    swiper.update();
  }

  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

function swiper_esm_bundle_removeSlide(slidesIndexes) {
  var swiper = this;
  var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      activeIndex = swiper.activeIndex;
  var activeIndexBuffer = activeIndex;

  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.slides = $wrapperEl.children(".".concat(params.slideClass));
  }

  var newActiveIndex = activeIndexBuffer;
  var indexToRemove;

  if (typeof_default()(slidesIndexes) === 'object' && 'length' in slidesIndexes) {
    for (var i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }

    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!(params.observer && swiper_esm_bundle_Support.observer)) {
    swiper.update();
  }

  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

function removeAllSlides() {
  var swiper = this;
  var slidesIndexes = [];

  for (var i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }

  swiper.removeSlide(slidesIndexes);
}

var manipulation = {
  appendSlide: swiper_esm_bundle_appendSlide,
  prependSlide: swiper_esm_bundle_prependSlide,
  addSlide: addSlide,
  removeSlide: swiper_esm_bundle_removeSlide,
  removeAllSlides: removeAllSlides
};

var swiper_esm_bundle_Device = function Device() {
  var ua = ssr_window_esm_win.navigator.userAgent;
  var device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windows: false,
    iphone: false,
    ipod: false,
    ipad: false,
    cordova: ssr_window_esm_win.cordova || ssr_window_esm_win.phonegap,
    phonegap: ssr_window_esm_win.cordova || ssr_window_esm_win.phonegap
  };
  var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line

  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/); // Windows

  if (windows) {
    device.os = 'windows';
    device.osVersion = windows[2];
    device.windows = true;
  } // Android


  if (android && !windows) {
    var _context51;

    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = index_of_default()(_context51 = ua.toLowerCase()).call(_context51, 'chrome') >= 0;
  }

  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  } // iOS


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
  } // iOS 8+ changed UA


  if (device.ios && device.osVersion && index_of_default()(ua).call(ua, 'Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  } // Desktop


  device.desktop = !(device.os || device.android || device.webView); // Webview

  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i); // Minimal UI

  if (device.os && device.os === 'ios') {
    var _context52;

    var osVersionArr = device.osVersion.split('.');
    var metaViewport = ssr_window_esm_doc.querySelector('meta[name="viewport"]');
    device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && metaViewport && index_of_default()(_context52 = metaViewport.getAttribute('content')).call(_context52, 'minimal-ui') >= 0;
  } // Pixel Ratio


  device.pixelRatio = ssr_window_esm_win.devicePixelRatio || 1; // Export object

  return device;
}();

function onTouchStart(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
      touches = swiper.touches;

  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }

  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  data.isTouchEvent = e.type === 'touchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
  if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;

  if (params.noSwiping && $(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : ".".concat(params.noSwipingClass))[0]) {
    swiper.allowClick = true;
    return;
  }

  if (params.swipeHandler) {
    if (!$(e).closest(params.swipeHandler)[0]) return;
  }

  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

  var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= ssr_window_esm_win.screen.width - edgeSwipeThreshold)) {
    return;
  }

  Utils.extend(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = Utils.now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;

  if (e.type !== 'touchstart') {
    var preventDefault = true;
    if ($(e.target).is(data.formElements)) preventDefault = false;

    if (ssr_window_esm_doc.activeElement && $(ssr_window_esm_doc.activeElement).is(data.formElements) && ssr_window_esm_doc.activeElement !== e.target) {
      ssr_window_esm_doc.activeElement.blur();
    }

    var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

    if (params.touchStartForcePreventDefault || shouldPreventDefault) {
      e.preventDefault();
    }
  }

  swiper.emit('touchStart', e);
}

function swiper_esm_bundle_onTouchMove(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
      touches = swiper.touches,
      rtl = swiper.rtlTranslate;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;

  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }

    return;
  }

  if (data.isTouchEvent && e.type === 'mousemove') return;
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
        currentY: pageY
      });
      data.touchStartTime = Utils.now();
    }

    return;
  }

  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }

  if (data.isTouchEvent && ssr_window_esm_doc.activeElement) {
    if (e.target === ssr_window_esm_doc.activeElement && $(e.target).is(data.formElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }

  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }

  if (e.targetTouches && e.targetTouches.length > 1) return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < swiper.params.threshold) return;

  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;

    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
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

    data.allowMomentumBounce = false; // Grab Cursor

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
  if (rtl) diff = -diff;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;
  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;

  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }

  if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
  }

  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  } // Directions locks


  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }

  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  } // Threshold


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

  if (!params.followFinger) return; // Update active index in free mode

  if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }

  if (params.freeMode) {
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }

    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: Utils.now()
    });
  } // Update progress


  swiper.updateProgress(data.currentTranslate); // Update translate

  swiper.setTranslate(data.currentTranslate);
}

function swiper_esm_bundle_onTouchEnd(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
      touches = swiper.touches,
      rtl = swiper.rtlTranslate,
      $wrapperEl = swiper.$wrapperEl,
      slidesGrid = swiper.slidesGrid,
      snapGrid = swiper.snapGrid;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;

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
  } // Return Grab Cursor


  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  } // Time diff


  var touchEndTime = Utils.now();
  var timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

  if (swiper.allowClick) {
    swiper.updateClickedSlide(e);
    swiper.emit('tap', e);

    if (timeDiff < 300 && touchEndTime - data.lastClickTime > 300) {
      if (data.clickTimeout) clearTimeout(data.clickTimeout);
      data.clickTimeout = Utils.nextTick(function () {
        if (!swiper || swiper.destroyed) return;
        swiper.emit('click', e);
      }, 300);
    }

    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      if (data.clickTimeout) clearTimeout(data.clickTimeout);
      swiper.emit('doubleTap', e);
    }
  }

  data.lastClickTime = Utils.now();
  Utils.nextTick(function () {
    if (!swiper.destroyed) swiper.allowClick = true;
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
        } // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.


        if (time > 150 || Utils.now() - lastMoveEvent.time > 300) {
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
      if (rtl) newPosition = -newPosition;
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

        if (params.loop && params.centeredSlides) needsLoopFix = true;
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

        if (params.loop && params.centeredSlides) needsLoopFix = true;
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
      } // Fix duration


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
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          swiper.emit('momentumBounce');
          swiper.setTransition(params.speed);
          swiper.setTranslate(afterBouncePosition);
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) return;
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
            if (!swiper || swiper.destroyed) return;
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
  } // Find current slide


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
  } // Find current slide size


  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }

    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + params.slidesPerGroup);else swiper.slideTo(stopIndex);
    }

    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + params.slidesPerGroup);else swiper.slideTo(stopIndex);
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

function onResize() {
  var swiper = this;
  var params = swiper.params,
      el = swiper.el;
  if (el && el.offsetWidth === 0) return; // Breakpoints

  if (params.breakpoints) {
    swiper.setBreakpoint();
  } // Save locks


  var allowSlideNext = swiper.allowSlideNext,
      allowSlidePrev = swiper.allowSlidePrev,
      snapGrid = swiper.snapGrid; // Disable locks on resize

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

  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    swiper.autoplay.run();
  } // Return locks after resize


  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;

  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

function swiper_esm_bundle_onClick(e) {
  var swiper = this;

  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();

    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

function attachEvents() {
  var swiper = this;
  var params = swiper.params,
      touchEvents = swiper.touchEvents,
      el = swiper.el,
      wrapperEl = swiper.wrapperEl;
  {
    swiper.onTouchStart = bind_default()(onTouchStart).call(onTouchStart, swiper);
    swiper.onTouchMove = bind_default()(swiper_esm_bundle_onTouchMove).call(swiper_esm_bundle_onTouchMove, swiper);
    swiper.onTouchEnd = bind_default()(swiper_esm_bundle_onTouchEnd).call(swiper_esm_bundle_onTouchEnd, swiper);
  }
  swiper.onClick = bind_default()(swiper_esm_bundle_onClick).call(swiper_esm_bundle_onClick, swiper);
  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested; // Touch Events

  {
    if (!swiper_esm_bundle_Support.touch && (swiper_esm_bundle_Support.pointerEvents || swiper_esm_bundle_Support.prefixedPointerEvents)) {
      target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      ssr_window_esm_doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      ssr_window_esm_doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (swiper_esm_bundle_Support.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && swiper_esm_bundle_Support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.addEventListener(touchEvents.move, swiper.onTouchMove, swiper_esm_bundle_Support.passiveListener ? {
          passive: false,
          capture: capture
        } : capture);
        target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }

      if (params.simulateTouch && !swiper_esm_bundle_Device.ios && !swiper_esm_bundle_Device.android || params.simulateTouch && !swiper_esm_bundle_Support.touch && swiper_esm_bundle_Device.ios) {
        target.addEventListener('mousedown', swiper.onTouchStart, false);
        ssr_window_esm_doc.addEventListener('mousemove', swiper.onTouchMove, capture);
        ssr_window_esm_doc.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    } // Prevent Links Clicks


    if (params.preventClicks || params.preventClicksPropagation) {
      target.addEventListener('click', swiper.onClick, true);
    }
  } // Resize handler

  swiper.on(swiper_esm_bundle_Device.ios || swiper_esm_bundle_Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
}

function detachEvents() {
  var swiper = this;
  var params = swiper.params,
      touchEvents = swiper.touchEvents,
      el = swiper.el,
      wrapperEl = swiper.wrapperEl;
  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested; // Touch Events

  {
    if (!swiper_esm_bundle_Support.touch && (swiper_esm_bundle_Support.pointerEvents || swiper_esm_bundle_Support.prefixedPointerEvents)) {
      target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      ssr_window_esm_doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      ssr_window_esm_doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (swiper_esm_bundle_Support.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && swiper_esm_bundle_Support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }

      if (params.simulateTouch && !swiper_esm_bundle_Device.ios && !swiper_esm_bundle_Device.android || params.simulateTouch && !swiper_esm_bundle_Support.touch && swiper_esm_bundle_Device.ios) {
        target.removeEventListener('mousedown', swiper.onTouchStart, false);
        ssr_window_esm_doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
        ssr_window_esm_doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    } // Prevent Links Clicks


    if (params.preventClicks || params.preventClicksPropagation) {
      target.removeEventListener('click', swiper.onClick, true);
    }
  } // Resize handler

  swiper.off(swiper_esm_bundle_Device.ios || swiper_esm_bundle_Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize);
}

var swiper_esm_bundle_events = {
  attachEvents: attachEvents,
  detachEvents: detachEvents
};

function setBreakpoint() {
  var swiper = this;
  var activeIndex = swiper.activeIndex,
      initialized = swiper.initialized,
      _swiper$loopedSlides = swiper.loopedSlides,
      loopedSlides = _swiper$loopedSlides === void 0 ? 0 : _swiper$loopedSlides,
      params = swiper.params;
  var breakpoints = params.breakpoints;
  if (!breakpoints || breakpoints && keys_default()(breakpoints).length === 0) return; // Set breakpoint for window width and update parameters

  var breakpoint = swiper.getBreakpoint(breakpoints);

  if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
    var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;

    if (breakpointOnlyParams) {
      var _context53;

      for_each_default()(_context53 = ['slidesPerView', 'spaceBetween', 'slidesPerGroup']).call(_context53, function (param) {
        var paramValue = breakpointOnlyParams[param];
        if (typeof paramValue === 'undefined') return;

        if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
          breakpointOnlyParams[param] = 'auto';
        } else if (param === 'slidesPerView') {
          breakpointOnlyParams[param] = parse_float_default()(paramValue);
        } else {
          breakpointOnlyParams[param] = parse_int_default()(paramValue, 10);
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
      allowSlidePrev: swiper.params.allowSlidePrev
    });
    swiper.currentBreakpoint = breakpoint;

    if (needsReLoop && initialized) {
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
    }

    swiper.emit('breakpoint', breakpointParams);
  }
}

function getBreakpoint(breakpoints) {
  var _context54;

  var swiper = this; // Get breakpoint for window width

  if (!breakpoints) return undefined;
  var breakpoint = false;
  var points = [];

  for_each_default()(_context54 = keys_default()(breakpoints)).call(_context54, function (point) {
    points.push(point);
  });

  sort_default()(points).call(points, function (a, b) {
    return parse_int_default()(a, 10) - parse_int_default()(b, 10);
  });

  for (var i = 0; i < points.length; i += 1) {
    var point = points[i];

    if (swiper.params.breakpointsInverse) {
      if (point <= ssr_window_esm_win.innerWidth) {
        breakpoint = point;
      }
    } else if (point >= ssr_window_esm_win.innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }

  return breakpoint || 'max';
}

var swiper_esm_bundle_breakpoints = {
  setBreakpoint: setBreakpoint,
  getBreakpoint: getBreakpoint
};

function addClasses() {
  var swiper = this;
  var classNames = swiper.classNames,
      params = swiper.params,
      rtl = swiper.rtl,
      $el = swiper.$el;
  var suffixes = [];
  suffixes.push('initialized');
  suffixes.push(params.direction);

  if (params.freeMode) {
    suffixes.push('free-mode');
  }

  if (!swiper_esm_bundle_Support.flexbox) {
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

  if (swiper_esm_bundle_Device.android) {
    suffixes.push('android');
  }

  if (swiper_esm_bundle_Device.ios) {
    suffixes.push('ios');
  } // WP8 Touch Events Fix


  if ((swiper_esm_bundle_Browser.isIE || swiper_esm_bundle_Browser.isEdge) && (swiper_esm_bundle_Support.pointerEvents || swiper_esm_bundle_Support.prefixedPointerEvents)) {
    suffixes.push("wp8-".concat(params.direction));
  }

  for_each_default()(suffixes).call(suffixes, function (suffix) {
    classNames.push(params.containerModifierClass + suffix);
  });

  $el.addClass(classNames.join(' '));
}

function removeClasses() {
  var swiper = this;
  var $el = swiper.$el,
      classNames = swiper.classNames;
  $el.removeClass(classNames.join(' '));
}

var classes = {
  addClasses: addClasses,
  removeClasses: removeClasses
};

function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
  var image;

  function onReady() {
    if (callback) callback();
  }

  if (!imageEl.complete || !checkForComplete) {
    if (src) {
      image = new ssr_window_esm_win.Image();
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

function preloadImages() {
  var _context55;

  var swiper = this;
  swiper.imagesToLoad = find_default()(_context55 = swiper.$el).call(_context55, 'img');

  function onReady() {
    if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
    if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
      if (swiper.params.updateOnImagesReady) swiper.update();
      swiper.emit('imagesReady');
    }
  }

  for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
    var imageEl = swiper.imagesToLoad[i];
    swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
  }
}

var swiper_esm_bundle_images = {
  loadImage: loadImage,
  preloadImages: preloadImages
};

function checkOverflow() {
  var swiper = this;
  var wasLocked = swiper.isLocked;
  swiper.isLocked = swiper.snapGrid.length === 1;
  swiper.allowSlideNext = !swiper.isLocked;
  swiper.allowSlidePrev = !swiper.isLocked; // events

  if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? 'lock' : 'unlock');

  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
    swiper.navigation.update();
  }
}

var checkOverflow$1 = {
  checkOverflow: checkOverflow
};
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
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
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
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
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
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  // NS
  containerModifierClass: 'swiper-container-',
  // NEW
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
  // Callbacks
  runCallbacksOnInit: true
};
/* eslint no-param-reassign: "off" */

var prototypes = {
  update: swiper_esm_bundle_update,
  translate: swiper_esm_bundle_translate,
  transition: swiper_esm_bundle_transition,
  slide: swiper_esm_bundle_slide,
  loop: loop,
  grabCursor: grabCursor,
  manipulation: manipulation,
  events: swiper_esm_bundle_events,
  breakpoints: swiper_esm_bundle_breakpoints,
  checkOverflow: checkOverflow$1,
  classes: classes,
  images: swiper_esm_bundle_images
};
var extendedDefaults = {};

var swiper_esm_bundle_Swiper = /*#__PURE__*/function (_SwiperClass) {
  inherits_default()(Swiper, _SwiperClass);

  var _super = _createSuper(Swiper);

  function Swiper() {
    var _context56, _context58;

    var _this;

    classCallCheck_default()(this, Swiper);

    var el;
    var params;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      params = args[0];
    } else {
      el = args[0];
      params = args[1];
    }

    if (!params) params = {};
    params = Utils.extend({}, params);
    if (el && !params.el) params.el = el;
    _this = _super.call(this, params);

    for_each_default()(_context56 = keys_default()(prototypes)).call(_context56, function (prototypeGroup) {
      var _context57;

      for_each_default()(_context57 = keys_default()(prototypes[prototypeGroup])).call(_context57, function (protoMethod) {
        if (!Swiper.prototype[protoMethod]) {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }
      });
    }); // Swiper Instance


    var swiper = assertThisInitialized_default()(_this);

    if (typeof swiper.modules === 'undefined') {
      swiper.modules = {};
    }

    for_each_default()(_context58 = keys_default()(swiper.modules)).call(_context58, function (moduleName) {
      var module = swiper.modules[moduleName];

      if (module.params) {
        var moduleParamName = keys_default()(module.params)[0];

        var moduleParams = module.params[moduleParamName];
        if (typeof_default()(moduleParams) !== 'object' || moduleParams === null) return;
        if (!(moduleParamName in params && 'enabled' in moduleParams)) return;

        if (params[moduleParamName] === true) {
          params[moduleParamName] = {
            enabled: true
          };
        }

        if (typeof_default()(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
          params[moduleParamName].enabled = true;
        }

        if (!params[moduleParamName]) params[moduleParamName] = {
          enabled: false
        };
      }
    }); // Extend defaults with modules params


    var swiperParams = Utils.extend({}, defaults);
    swiper.useModulesParams(swiperParams); // Extend defaults with passed params

    swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = Utils.extend({}, swiper.params);
    swiper.passedParams = Utils.extend({}, params); // Save Dom lib

    swiper.$ = $; // Find el

    var $el = $(swiper.params.el);
    el = $el[0];

    if (!el) {
      return possibleConstructorReturn_default()(_this, undefined);
    }

    if ($el.length > 1) {
      var swipers = [];
      $el.each(function (index, containerEl) {
        var newParams = Utils.extend({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      return possibleConstructorReturn_default()(_this, swipers);
    }

    el.swiper = swiper;
    $el.data('swiper', swiper); // Find Wrapper

    var $wrapperEl = $el.children(".".concat(swiper.params.wrapperClass)); // Extend Swiper

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
      rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
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
      touchEvents: function touchEvents() {
        var touch = ['touchstart', 'touchmove', 'touchend'];
        var desktop = ['mousedown', 'mousemove', 'mouseup'];

        if (swiper_esm_bundle_Support.pointerEvents) {
          desktop = ['pointerdown', 'pointermove', 'pointerup'];
        } else if (swiper_esm_bundle_Support.prefixedPointerEvents) {
          desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        }

        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2]
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2]
        };
        return swiper_esm_bundle_Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
      }(),
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
        startMoving: undefined
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
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }); // Install Modules

    swiper.useModules(); // Init

    if (swiper.params.init) {
      swiper.init();
    } // Return app instance


    return possibleConstructorReturn_default()(_this, swiper);
  }

  createClass_default()(Swiper, [{
    key: "slidesPerViewDynamic",
    value: function slidesPerViewDynamic() {
      var swiper = this;
      var params = swiper.params,
          slides = swiper.slides,
          slidesGrid = swiper.slidesGrid,
          swiperSize = swiper.size,
          activeIndex = swiper.activeIndex;
      var spv = 1;

      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;

        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }

        for (var _i7 = activeIndex - 1; _i7 >= 0; _i7 -= 1) {
          if (slides[_i7] && !breakLoop) {
            slideSize += slides[_i7].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        for (var _i8 = activeIndex + 1; _i8 < slides.length; _i8 += 1) {
          if (slidesGrid[_i8] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }

      return spv;
    }
  }, {
    key: "update",
    value: function update() {
      var swiper = this;
      if (!swiper || swiper.destroyed) return;
      var snapGrid = swiper.snapGrid,
          params = swiper.params; // Breakpoints

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
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(newDirection) {
      var _context59, _context60, _context61;

      var needUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var swiper = this;
      var currentDirection = swiper.params.direction;

      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }

      if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
        return swiper;
      }

      swiper.$el.removeClass(concat_default()(_context59 = concat_default()(_context60 = "".concat(swiper.params.containerModifierClass)).call(_context60, currentDirection, " wp8-")).call(_context59, currentDirection)).addClass(concat_default()(_context61 = "".concat(swiper.params.containerModifierClass)).call(_context61, newDirection));

      if ((swiper_esm_bundle_Browser.isIE || swiper_esm_bundle_Browser.isEdge) && (swiper_esm_bundle_Support.pointerEvents || swiper_esm_bundle_Support.prefixedPointerEvents)) {
        var _context62;

        swiper.$el.addClass(concat_default()(_context62 = "".concat(swiper.params.containerModifierClass, "wp8-")).call(_context62, newDirection));
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
      if (needUpdate) swiper.update();
      return swiper;
    }
  }, {
    key: "init",
    value: function init() {
      var swiper = this;
      if (swiper.initialized) return;
      swiper.emit('beforeInit'); // Set breakpoint

      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      } // Add Classes


      swiper.addClasses(); // Create loop

      if (swiper.params.loop) {
        swiper.loopCreate();
      } // Update size


      swiper.updateSize(); // Update slides

      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      } // Set Grab Cursor


      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      } // Slide To Initial Slide


      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      } // Attach events


      swiper.attachEvents(); // Init Flag

      swiper.initialized = true; // Emit

      swiper.emit('init');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _context63;

      var deleteInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cleanStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var swiper = this;
      var params = swiper.params,
          $el = swiper.$el,
          $wrapperEl = swiper.$wrapperEl,
          slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy'); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles


      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');

        if (slides && slides.length) {
          slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
        }
      }

      swiper.emit('destroy'); // Detach emitter events

      for_each_default()(_context63 = keys_default()(swiper.eventsListeners)).call(_context63, function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }

      swiper.destroyed = true;
      return null;
    }
  }], [{
    key: "extendDefaults",
    value: function extendDefaults(newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    }
  }, {
    key: "extendedDefaults",
    get: function get() {
      return extendedDefaults;
    }
  }, {
    key: "defaults",
    get: function get() {
      return defaults;
    }
  }, {
    key: "Class",
    get: function get() {
      return swiper_esm_bundle_SwiperClass;
    }
  }, {
    key: "$",
    get: function get() {
      return $;
    }
  }]);

  return Swiper;
}(swiper_esm_bundle_SwiperClass);

var Device$1 = {
  name: 'device',
  proto: {
    device: swiper_esm_bundle_Device
  },
  static: {
    device: swiper_esm_bundle_Device
  }
};
var Support$1 = {
  name: 'support',
  proto: {
    support: swiper_esm_bundle_Support
  },
  static: {
    support: swiper_esm_bundle_Support
  }
};
var Browser$1 = {
  name: 'browser',
  proto: {
    browser: swiper_esm_bundle_Browser
  },
  static: {
    browser: swiper_esm_bundle_Browser
  }
};
var Resize = {
  name: 'resize',
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      resize: {
        resizeHandler: function resizeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.emit('beforeResize');
          swiper.emit('resize');
        },
        orientationChangeHandler: function orientationChangeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.emit('orientationchange');
        }
      }
    });
  },
  on: {
    init: function init() {
      var swiper = this; // Emit resize

      ssr_window_esm_win.addEventListener('resize', swiper.resize.resizeHandler); // Emit orientationchange

      ssr_window_esm_win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy: function destroy() {
      var swiper = this;
      ssr_window_esm_win.removeEventListener('resize', swiper.resize.resizeHandler);
      ssr_window_esm_win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    }
  }
};
var Observer = {
  func: ssr_window_esm_win.MutationObserver || ssr_window_esm_win.WebkitMutationObserver,
  attach: function attach(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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

      if (ssr_window_esm_win.requestAnimationFrame) {
        ssr_window_esm_win.requestAnimationFrame(observerUpdate);
      } else {
        ssr_window_esm_win.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });
    swiper.observer.observers.push(observer);
  },
  init: function init() {
    var swiper = this;
    if (!swiper_esm_bundle_Support.observer || !swiper.params.observer) return;

    if (swiper.params.observeParents) {
      var containerParents = swiper.$el.parents();

      for (var i = 0; i < containerParents.length; i += 1) {
        swiper.observer.attach(containerParents[i]);
      }
    } // Observe container


    swiper.observer.attach(swiper.$el[0], {
      childList: swiper.params.observeSlideChildren
    }); // Observe wrapper

    swiper.observer.attach(swiper.$wrapperEl[0], {
      attributes: false
    });
  },
  destroy: function destroy() {
    var _context64;

    var swiper = this;

    for_each_default()(_context64 = swiper.observer.observers).call(_context64, function (observer) {
      observer.disconnect();
    });

    swiper.observer.observers = [];
  }
};
var Observer$1 = {
  name: 'observer',
  params: {
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  },
  create: function create() {
    var _context65, _context66, _context67;

    var swiper = this;
    Utils.extend(swiper, {
      observer: {
        init: bind_default()(_context65 = Observer.init).call(_context65, swiper),
        attach: bind_default()(_context66 = Observer.attach).call(_context66, swiper),
        destroy: bind_default()(_context67 = Observer.destroy).call(_context67, swiper),
        observers: []
      }
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
    }
  }
};
var Virtual = {
  update: function update(force) {
    var _context71;

    var swiper = this;
    var _swiper$params = swiper.params,
        slidesPerView = _swiper$params.slidesPerView,
        slidesPerGroup = _swiper$params.slidesPerGroup,
        centeredSlides = _swiper$params.centeredSlides;
    var _swiper$params$virtua = swiper.params.virtual,
        addSlidesBefore = _swiper$params$virtua.addSlidesBefore,
        addSlidesAfter = _swiper$params$virtua.addSlidesAfter;
    var _swiper$virtual = swiper.virtual,
        previousFrom = _swiper$virtual.from,
        previousTo = _swiper$virtual.to,
        slides = _swiper$virtual.slides,
        previousSlidesGrid = _swiper$virtual.slidesGrid,
        renderSlide = _swiper$virtual.renderSlide,
        previousOffset = _swiper$virtual.offset;
    swiper.updateActiveIndex();
    var activeIndex = swiper.activeIndex || 0;
    var offsetProp;
    if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
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
      slidesGrid: swiper.slidesGrid
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
        swiper.slides.css(offsetProp, "".concat(offset, "px"));
      }

      swiper.updateProgress();
      return;
    }

    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset: offset,
        from: from,
        to: to,
        slides: function getSlides() {
          var slidesToRender = [];

          for (var i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }

          return slidesToRender;
        }()
      });
      onRendered();
      return;
    }

    var prependIndexes = [];
    var appendIndexes = [];

    if (force) {
      var _context68;

      find_default()(_context68 = swiper.$wrapperEl).call(_context68, ".".concat(swiper.params.slideClass)).remove();
    } else {
      for (var i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          var _context69, _context70;

          find_default()(_context69 = swiper.$wrapperEl).call(_context69, concat_default()(_context70 = ".".concat(swiper.params.slideClass, "[data-swiper-slide-index=\"")).call(_context70, i, "\"]")).remove();
        }
      }
    }

    for (var _i9 = 0; _i9 < slides.length; _i9 += 1) {
      if (_i9 >= from && _i9 <= to) {
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(_i9);
        } else {
          if (_i9 > previousTo) appendIndexes.push(_i9);
          if (_i9 < previousFrom) prependIndexes.push(_i9);
        }
      }
    }

    for_each_default()(appendIndexes).call(appendIndexes, function (index) {
      swiper.$wrapperEl.append(renderSlide(slides[index], index));
    });

    for_each_default()(_context71 = sort_default()(prependIndexes).call(prependIndexes, function (a, b) {
      return b - a;
    })).call(_context71, function (index) {
      swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
    });

    swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, "".concat(offset, "px"));
    onRendered();
  },
  renderSlide: function renderSlide(slide, index) {
    var _context72, _context73;

    var swiper = this;
    var params = swiper.params.virtual;

    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }

    var $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $(concat_default()(_context72 = concat_default()(_context73 = "<div class=\"".concat(swiper.params.slideClass, "\" data-swiper-slide-index=\"")).call(_context73, index, "\">")).call(_context72, slide, "</div>"));
    if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
    if (params.cache) swiper.virtual.cache[index] = $slideEl;
    return $slideEl;
  },
  appendSlide: function appendSlide(slides) {
    var swiper = this;

    if (typeof_default()(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
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

    if (is_array_default()(slides)) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }

      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }

    if (swiper.params.virtual.cache) {
      var _context74;

      var cache = swiper.virtual.cache;
      var newCache = {};

      for_each_default()(_context74 = keys_default()(cache)).call(_context74, function (cachedIndex) {
        newCache[parse_int_default()(cachedIndex, 10) + numberOfNewSlides] = cache[cachedIndex];
      });

      swiper.virtual.cache = newCache;
    }

    swiper.virtual.update(true);
    swiper.slideTo(newActiveIndex, 0);
  },
  removeSlide: function removeSlide(slidesIndexes) {
    var swiper = this;
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    var activeIndex = swiper.activeIndex;

    if (is_array_default()(slidesIndexes)) {
      for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        var _context75;

        splice_default()(_context75 = swiper.virtual.slides).call(_context75, slidesIndexes[i], 1);

        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
        }

        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      var _context76;

      splice_default()(_context76 = swiper.virtual.slides).call(_context76, slidesIndexes, 1);

      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
      }

      if (slidesIndexes < activeIndex) activeIndex -= 1;
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
  }
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
      addSlidesAfter: 0
    }
  },
  create: function create() {
    var _context77, _context78, _context79, _context80, _context81, _context82;

    var swiper = this;
    Utils.extend(swiper, {
      virtual: {
        update: bind_default()(_context77 = Virtual.update).call(_context77, swiper),
        appendSlide: bind_default()(_context78 = Virtual.appendSlide).call(_context78, swiper),
        prependSlide: bind_default()(_context79 = Virtual.prependSlide).call(_context79, swiper),
        removeSlide: bind_default()(_context80 = Virtual.removeSlide).call(_context80, swiper),
        removeAllSlides: bind_default()(_context81 = Virtual.removeAllSlides).call(_context81, swiper),
        renderSlide: bind_default()(_context82 = Virtual.renderSlide).call(_context82, swiper),
        slides: swiper.params.virtual.slides,
        cache: {}
      }
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) return;
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "virtual"));
      var overwriteParams = {
        watchSlidesProgress: true
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);

      if (!swiper.params.initialSlide) {
        swiper.virtual.update();
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) return;
      swiper.virtual.update();
    }
  }
};
var Keyboard = {
  handle: function handle(event) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix

    var kc = e.keyCode || e.charCode; // Directions locks

    if (!swiper.allowSlideNext && (swiper.isHorizontal() && kc === 39 || swiper.isVertical() && kc === 40 || kc === 34)) {
      return false;
    }

    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && kc === 37 || swiper.isVertical() && kc === 38 || kc === 33)) {
      return false;
    }

    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }

    if (ssr_window_esm_doc.activeElement && ssr_window_esm_doc.activeElement.nodeName && (ssr_window_esm_doc.activeElement.nodeName.toLowerCase() === 'input' || ssr_window_esm_doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }

    if (swiper.params.keyboard.onlyInViewport && (kc === 33 || kc === 34 || kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
      var inView = false; // Check that swiper should be inside of visible area of window

      if (swiper.$el.parents(".".concat(swiper.params.slideClass)).length > 0 && swiper.$el.parents(".".concat(swiper.params.slideActiveClass)).length === 0) {
        return undefined;
      }

      var windowWidth = ssr_window_esm_win.innerWidth;
      var windowHeight = ssr_window_esm_win.innerHeight;
      var swiperOffset = swiper.$el.offset();
      if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
      var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];

      for (var i = 0; i < swiperCoord.length; i += 1) {
        var point = swiperCoord[i];

        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          inView = true;
        }
      }

      if (!inView) return undefined;
    }

    if (swiper.isHorizontal()) {
      if (kc === 33 || kc === 34 || kc === 37 || kc === 39) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }

      if ((kc === 34 || kc === 39) && !rtl || (kc === 33 || kc === 37) && rtl) swiper.slideNext();
      if ((kc === 33 || kc === 37) && !rtl || (kc === 34 || kc === 39) && rtl) swiper.slidePrev();
    } else {
      if (kc === 33 || kc === 34 || kc === 38 || kc === 40) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }

      if (kc === 34 || kc === 40) swiper.slideNext();
      if (kc === 33 || kc === 38) swiper.slidePrev();
    }

    swiper.emit('keyPress', kc);
    return undefined;
  },
  enable: function enable() {
    var swiper = this;
    if (swiper.keyboard.enabled) return;
    $(ssr_window_esm_doc).on('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = true;
  },
  disable: function disable() {
    var swiper = this;
    if (!swiper.keyboard.enabled) return;
    $(ssr_window_esm_doc).off('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = false;
  }
};
var Keyboard$1 = {
  name: 'keyboard',
  params: {
    keyboard: {
      enabled: false,
      onlyInViewport: true
    }
  },
  create: function create() {
    var _context83, _context84, _context85;

    var swiper = this;
    Utils.extend(swiper, {
      keyboard: {
        enabled: false,
        enable: bind_default()(_context83 = Keyboard.enable).call(_context83, swiper),
        disable: bind_default()(_context84 = Keyboard.disable).call(_context84, swiper),
        handle: bind_default()(_context85 = Keyboard.handle).call(_context85, swiper)
      }
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
    }
  }
};

function isEventSupported() {
  var eventName = 'onwheel';
  var isSupported = (eventName in ssr_window_esm_doc);

  if (!isSupported) {
    var element = ssr_window_esm_doc.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && ssr_window_esm_doc.implementation && ssr_window_esm_doc.implementation.hasFeature // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  && ssr_window_esm_doc.implementation.hasFeature('', '') !== true) {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = ssr_window_esm_doc.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

var Mousewheel = {
  lastScrollTime: Utils.now(),
  event: function getEvent() {
    var _context86;

    if (index_of_default()(_context86 = ssr_window_esm_win.navigator.userAgent).call(_context86, 'firefox') > -1) return 'DOMMouseScroll';
    return isEventSupported() ? 'wheel' : 'mousewheel';
  }(),
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
    } // side scrolling on FF with DOMMouseScroll


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
      if (e.deltaMode === 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    } // Fall-back if spin cannot be determined


    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }

    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
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
    if (!swiper.mouseEntered && !params.releaseOnEdges) return true;
    if (e.originalEvent) e = e.originalEvent; // jquery fix

    var delta = 0;
    var rtlFactor = swiper.rtlTranslate ? -1 : 1;
    var data = Mousewheel.normalize(e);

    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;else return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }

    if (delta === 0) return true;
    if (params.invert) delta = -delta;

    if (!swiper.params.freeMode) {
      if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
        if (delta < 0) {
          if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
            swiper.slideNext();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) return true;
        } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
          swiper.slidePrev();
          swiper.emit('scroll', e);
        } else if (params.releaseOnEdges) return true;
      }

      swiper.mousewheel.lastScrollTime = new ssr_window_esm_win.Date().getTime();
    } else {
      // Freemode or scrollContainer:
      if (swiper.params.loop) {
        swiper.loopFix();
      }

      var position = swiper.getTranslate() + delta * params.sensitivity;
      var wasBeginning = swiper.isBeginning;
      var wasEnd = swiper.isEnd;
      if (position >= swiper.minTranslate()) position = swiper.minTranslate();
      if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
      swiper.setTransition(0);
      swiper.setTranslate(position);
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
        swiper.updateSlidesClasses();
      }

      if (swiper.params.freeModeSticky) {
        clearTimeout(swiper.mousewheel.timeout);
        swiper.mousewheel.timeout = Utils.nextTick(function () {
          swiper.slideToClosest();
        }, 300);
      } // Emit event


      swiper.emit('scroll', e); // Stop autoplay

      if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions

      if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
    }

    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    return false;
  },
  enable: function enable() {
    var swiper = this;
    if (!Mousewheel.event) return false;
    if (swiper.mousewheel.enabled) return false;
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
    if (!Mousewheel.event) return false;
    if (!swiper.mousewheel.enabled) return false;
    var target = swiper.$el;

    if (swiper.params.mousewheel.eventsTarged !== 'container') {
      target = $(swiper.params.mousewheel.eventsTarged);
    }

    target.off(Mousewheel.event, swiper.mousewheel.handle);
    swiper.mousewheel.enabled = false;
    return true;
  }
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
      eventsTarged: 'container'
    }
  },
  create: function create() {
    var _context87, _context88, _context89, _context90, _context91;

    var swiper = this;
    Utils.extend(swiper, {
      mousewheel: {
        enabled: false,
        enable: bind_default()(_context87 = Mousewheel.enable).call(_context87, swiper),
        disable: bind_default()(_context88 = Mousewheel.disable).call(_context88, swiper),
        handle: bind_default()(_context89 = Mousewheel.handle).call(_context89, swiper),
        handleMouseEnter: bind_default()(_context90 = Mousewheel.handleMouseEnter).call(_context90, swiper),
        handleMouseLeave: bind_default()(_context91 = Mousewheel.handleMouseLeave).call(_context91, swiper),
        lastScrollTime: Utils.now()
      }
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.mousewheel.enabled) swiper.mousewheel.enable();
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.mousewheel.enabled) swiper.mousewheel.disable();
    }
  }
};
var Navigation = {
  update: function update() {
    // Update Navigation Buttons
    var swiper = this;
    var params = swiper.params.navigation;
    if (swiper.params.loop) return;
    var _swiper$navigation = swiper.navigation,
        $nextEl = _swiper$navigation.$nextEl,
        $prevEl = _swiper$navigation.$prevEl;

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
    if (swiper.isBeginning && !swiper.params.loop) return;
    swiper.slidePrev();
  },
  onNextClick: function onNextClick(e) {
    var swiper = this;
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop) return;
    swiper.slideNext();
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.navigation;
    if (!(params.nextEl || params.prevEl)) return;
    var $nextEl;
    var $prevEl;

    if (params.nextEl) {
      var _context92;

      $nextEl = $(params.nextEl);

      if (swiper.params.uniqueNavElements && typeof params.nextEl === 'string' && $nextEl.length > 1 && find_default()(_context92 = swiper.$el).call(_context92, params.nextEl).length === 1) {
        var _context93;

        $nextEl = find_default()(_context93 = swiper.$el).call(_context93, params.nextEl);
      }
    }

    if (params.prevEl) {
      var _context94;

      $prevEl = $(params.prevEl);

      if (swiper.params.uniqueNavElements && typeof params.prevEl === 'string' && $prevEl.length > 1 && find_default()(_context94 = swiper.$el).call(_context94, params.prevEl).length === 1) {
        var _context95;

        $prevEl = find_default()(_context95 = swiper.$el).call(_context95, params.prevEl);
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
      prevEl: $prevEl && $prevEl[0]
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var _swiper$navigation2 = swiper.navigation,
        $nextEl = _swiper$navigation2.$nextEl,
        $prevEl = _swiper$navigation2.$prevEl;

    if ($nextEl && $nextEl.length) {
      $nextEl.off('click', swiper.navigation.onNextClick);
      $nextEl.removeClass(swiper.params.navigation.disabledClass);
    }

    if ($prevEl && $prevEl.length) {
      $prevEl.off('click', swiper.navigation.onPrevClick);
      $prevEl.removeClass(swiper.params.navigation.disabledClass);
    }
  }
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
      lockClass: 'swiper-button-lock'
    }
  },
  create: function create() {
    var _context96, _context97, _context98, _context99, _context100;

    var swiper = this;
    Utils.extend(swiper, {
      navigation: {
        init: bind_default()(_context96 = Navigation.init).call(_context96, swiper),
        update: bind_default()(_context97 = Navigation.update).call(_context97, swiper),
        destroy: bind_default()(_context98 = Navigation.destroy).call(_context98, swiper),
        onNextClick: bind_default()(_context99 = Navigation.onNextClick).call(_context99, swiper),
        onPrevClick: bind_default()(_context100 = Navigation.onPrevClick).call(_context100, swiper)
      }
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
      var _swiper$navigation3 = swiper.navigation,
          $nextEl = _swiper$navigation3.$nextEl,
          $prevEl = _swiper$navigation3.$prevEl;

      if (swiper.params.navigation.hideOnClick && !$(e.target).is($prevEl) && !$(e.target).is($nextEl)) {
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
    }
  }
};
var Pagination = {
  update: function update() {
    // Render || Update Pagination bullets/items
    var swiper = this;
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el; // Current/Total

    var current;
    var total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

    if (swiper.params.loop) {
      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

      if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
        current -= slidesLength - swiper.loopedSlides * 2;
      }

      if (current > total - 1) current -= total;
      if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    } // Types


    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var _context101, _context102, _context103, _context104, _context105;

      var bullets = swiper.pagination.bullets;
      var firstIndex;
      var lastIndex;
      var midIndex;

      if (params.dynamicBullets) {
        swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
        $el.css(swiper.isHorizontal() ? 'width' : 'height', "".concat(swiper.pagination.bulletSize * (params.dynamicMainBullets + 4), "px"));

        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
          swiper.pagination.dynamicBulletIndex += current - swiper.previousIndex;

          if (swiper.pagination.dynamicBulletIndex > params.dynamicMainBullets - 1) {
            swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (swiper.pagination.dynamicBulletIndex < 0) {
            swiper.pagination.dynamicBulletIndex = 0;
          }
        }

        firstIndex = current - swiper.pagination.dynamicBulletIndex;
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }

      bullets.removeClass(concat_default()(_context101 = concat_default()(_context102 = concat_default()(_context103 = concat_default()(_context104 = concat_default()(_context105 = "".concat(params.bulletActiveClass, " ")).call(_context105, params.bulletActiveClass, "-next ")).call(_context104, params.bulletActiveClass, "-next-next ")).call(_context103, params.bulletActiveClass, "-prev ")).call(_context102, params.bulletActiveClass, "-prev-prev ")).call(_context101, params.bulletActiveClass, "-main"));

      if ($el.length > 1) {
        bullets.each(function (index, bullet) {
          var $bullet = $(bullet);
          var bulletIndex = $bullet.index();

          if (bulletIndex === current) {
            $bullet.addClass(params.bulletActiveClass);
          }

          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              $bullet.addClass("".concat(params.bulletActiveClass, "-main"));
            }

            if (bulletIndex === firstIndex) {
              $bullet.prev().addClass("".concat(params.bulletActiveClass, "-prev")).prev().addClass("".concat(params.bulletActiveClass, "-prev-prev"));
            }

            if (bulletIndex === lastIndex) {
              $bullet.next().addClass("".concat(params.bulletActiveClass, "-next")).next().addClass("".concat(params.bulletActiveClass, "-next-next"));
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
            bullets.eq(i).addClass("".concat(params.bulletActiveClass, "-main"));
          }

          $firstDisplayedBullet.prev().addClass("".concat(params.bulletActiveClass, "-prev")).prev().addClass("".concat(params.bulletActiveClass, "-prev-prev"));
          $lastDisplayedBullet.next().addClass("".concat(params.bulletActiveClass, "-next")).next().addClass("".concat(params.bulletActiveClass, "-next-next"));
        }
      }

      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        var bulletsOffset = (swiper.pagination.bulletSize * dynamicBulletsLength - swiper.pagination.bulletSize) / 2 - midIndex * swiper.pagination.bulletSize;
        var offsetProp = rtl ? 'right' : 'left';
        bullets.css(swiper.isHorizontal() ? offsetProp : 'top', "".concat(bulletsOffset, "px"));
      }
    }

    if (params.type === 'fraction') {
      find_default()($el).call($el, ".".concat(params.currentClass)).text(params.formatFractionCurrent(current + 1));

      find_default()($el).call($el, ".".concat(params.totalClass)).text(params.formatFractionTotal(total));
    }

    if (params.type === 'progressbar') {
      var _context106;

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

      find_default()($el).call($el, ".".concat(params.progressbarFillClass)).transform(concat_default()(_context106 = "translate3d(0,0,0) scaleX(".concat(scaleX, ") scaleY(")).call(_context106, scaleY, ")")).transition(swiper.params.speed);
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
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    var paginationHTML = '';

    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          var _context107, _context108;

          paginationHTML += concat_default()(_context107 = concat_default()(_context108 = "<".concat(params.bulletElement, " class=\"")).call(_context108, params.bulletClass, "\"></")).call(_context107, params.bulletElement, ">");
        }
      }

      $el.html(paginationHTML);
      swiper.pagination.bullets = find_default()($el).call($el, ".".concat(params.bulletClass));
    }

    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = "<span class=\"".concat(params.currentClass, "\"></span>") + ' / ' + "<span class=\"".concat(params.totalClass, "\"></span>");
      }

      $el.html(paginationHTML);
    }

    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = "<span class=\"".concat(params.progressbarFillClass, "\"></span>");
      }

      $el.html(paginationHTML);
    }

    if (params.type !== 'custom') {
      swiper.emit('paginationRender', swiper.pagination.$el[0]);
    }
  },
  init: function init() {
    var _context109;

    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el) return;
    var $el = $(params.el);
    if ($el.length === 0) return;

    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && find_default()(_context109 = swiper.$el).call(_context109, params.el).length === 1) {
      var _context110;

      $el = find_default()(_context110 = swiper.$el).call(_context110, params.el);
    }

    if (params.type === 'bullets' && params.clickable) {
      $el.addClass(params.clickableClass);
    }

    $el.addClass(params.modifierClass + params.type);

    if (params.type === 'bullets' && params.dynamicBullets) {
      var _context111;

      $el.addClass(concat_default()(_context111 = "".concat(params.modifierClass)).call(_context111, params.type, "-dynamic"));
      swiper.pagination.dynamicBulletIndex = 0;

      if (params.dynamicMainBullets < 1) {
        params.dynamicMainBullets = 1;
      }
    }

    if (params.type === 'progressbar' && params.progressbarOpposite) {
      $el.addClass(params.progressbarOppositeClass);
    }

    if (params.clickable) {
      $el.on('click', ".".concat(params.bulletClass), function onClick(e) {
        e.preventDefault();
        var index = $(this).index() * swiper.params.slidesPerGroup;
        if (swiper.params.loop) index += swiper.loopedSlides;
        swiper.slideTo(index);
      });
    }

    Utils.extend(swiper.pagination, {
      $el: $el,
      el: $el[0]
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
    var $el = swiper.pagination.$el;
    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    if (swiper.pagination.bullets) swiper.pagination.bullets.removeClass(params.bulletActiveClass);

    if (params.clickable) {
      $el.off('click', ".".concat(params.bulletClass));
    }
  }
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
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: function formatFractionCurrent(number) {
        return number;
      },
      formatFractionTotal: function formatFractionTotal(number) {
        return number;
      },
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      modifierClass: 'swiper-pagination-',
      // NEW
      currentClass: 'swiper-pagination-current',
      totalClass: 'swiper-pagination-total',
      hiddenClass: 'swiper-pagination-hidden',
      progressbarFillClass: 'swiper-pagination-progressbar-fill',
      progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
      clickableClass: 'swiper-pagination-clickable',
      // NEW
      lockClass: 'swiper-pagination-lock'
    }
  },
  create: function create() {
    var _context112, _context113, _context114, _context115;

    var swiper = this;
    Utils.extend(swiper, {
      pagination: {
        init: bind_default()(_context112 = Pagination.init).call(_context112, swiper),
        render: bind_default()(_context113 = Pagination.render).call(_context113, swiper),
        update: bind_default()(_context114 = Pagination.update).call(_context114, swiper),
        destroy: bind_default()(_context115 = Pagination.destroy).call(_context115, swiper),
        dynamicBulletIndex: 0
      }
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

      if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && swiper.pagination.$el.length > 0 && !$(e.target).hasClass(swiper.params.pagination.bulletClass)) {
        var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);

        if (isHidden === true) {
          swiper.emit('paginationShow', swiper);
        } else {
          swiper.emit('paginationHide', swiper);
        }

        swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
      }
    }
  }
};
var Scrollbar = {
  setTranslate: function setTranslate() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    var scrollbar = swiper.scrollbar,
        rtl = swiper.rtlTranslate,
        progress = swiper.progress;
    var dragSize = scrollbar.dragSize,
        trackSize = scrollbar.trackSize,
        $dragEl = scrollbar.$dragEl,
        $el = scrollbar.$el;
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
      if (swiper_esm_bundle_Support.transforms3d) {
        $dragEl.transform("translate3d(".concat(newPos, "px, 0, 0)"));
      } else {
        $dragEl.transform("translateX(".concat(newPos, "px)"));
      }

      $dragEl[0].style.width = "".concat(newSize, "px");
    } else {
      if (swiper_esm_bundle_Support.transforms3d) {
        $dragEl.transform("translate3d(0px, ".concat(newPos, "px, 0)"));
      } else {
        $dragEl.transform("translateY(".concat(newPos, "px)"));
      }

      $dragEl[0].style.height = "".concat(newSize, "px");
    }

    if (params.hide) {
      clearTimeout(swiper.scrollbar.timeout);
      $el[0].style.opacity = 1;
      swiper.scrollbar.timeout = set_timeout_default()(function () {
        $el[0].style.opacity = 0;
        $el.transition(400);
      }, 1000);
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.scrollbar.$dragEl.transition(duration);
  },
  updateSize: function updateSize() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    var scrollbar = swiper.scrollbar;
    var $dragEl = scrollbar.$dragEl,
        $el = scrollbar.$el;
    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
    var divider = swiper.size / swiper.virtualSize;
    var moveDivider = divider * (trackSize / swiper.size);
    var dragSize;

    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parse_int_default()(swiper.params.scrollbar.dragSize, 10);
    }

    if (swiper.isHorizontal()) {
      $dragEl[0].style.width = "".concat(dragSize, "px");
    } else {
      $dragEl[0].style.height = "".concat(dragSize, "px");
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
      dragSize: dragSize
    });
    scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
  },
  getPointerPosition: function getPointerPosition(e) {
    var swiper = this;

    if (swiper.isHorizontal()) {
      return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX;
    }

    return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
  },
  setDragPosition: function setDragPosition(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar,
        rtl = swiper.rtlTranslate;
    var $el = scrollbar.$el,
        dragSize = scrollbar.dragSize,
        trackSize = scrollbar.trackSize,
        dragStartPos = scrollbar.dragStartPos;
    var positionRatio;
    positionRatio = (scrollbar.getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);

    if (rtl) {
      positionRatio = 1 - positionRatio;
    }

    var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  },
  onDragStart: function onDragStart(e) {
    var swiper = this;
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
        $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el,
        $dragEl = scrollbar.$dragEl;
    swiper.scrollbar.isTouched = true;
    swiper.scrollbar.dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? scrollbar.getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
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
    var scrollbar = swiper.scrollbar,
        $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el,
        $dragEl = scrollbar.$dragEl;
    if (!swiper.scrollbar.isTouched) return;
    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
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
    if (!swiper.scrollbar.isTouched) return;
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
    if (!swiper.params.scrollbar.el) return;
    var scrollbar = swiper.scrollbar,
        touchEventsTouch = swiper.touchEventsTouch,
        touchEventsDesktop = swiper.touchEventsDesktop,
        params = swiper.params;
    var $el = scrollbar.$el;
    var target = $el[0];
    var activeListener = swiper_esm_bundle_Support.passiveListener && params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    var passiveListener = swiper_esm_bundle_Support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;

    if (!swiper_esm_bundle_Support.touch) {
      target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
      ssr_window_esm_doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
      ssr_window_esm_doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
    } else {
      target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
      target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
      target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
    }
  },
  disableDraggable: function disableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) return;
    var scrollbar = swiper.scrollbar,
        touchEventsTouch = swiper.touchEventsTouch,
        touchEventsDesktop = swiper.touchEventsDesktop,
        params = swiper.params;
    var $el = scrollbar.$el;
    var target = $el[0];
    var activeListener = swiper_esm_bundle_Support.passiveListener && params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    var passiveListener = swiper_esm_bundle_Support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;

    if (!swiper_esm_bundle_Support.touch) {
      target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
      ssr_window_esm_doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
      ssr_window_esm_doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
    } else {
      target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
      target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
      target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
    }
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) return;
    var scrollbar = swiper.scrollbar,
        $swiperEl = swiper.$el;
    var params = swiper.params.scrollbar;
    var $el = $(params.el);

    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && find_default()($swiperEl).call($swiperEl, params.el).length === 1) {
      $el = find_default()($swiperEl).call($swiperEl, params.el);
    }

    var $dragEl = find_default()($el).call($el, ".".concat(swiper.params.scrollbar.dragClass));

    if ($dragEl.length === 0) {
      $dragEl = $("<div class=\"".concat(swiper.params.scrollbar.dragClass, "\"></div>"));
      $el.append($dragEl);
    }

    Utils.extend(scrollbar, {
      $el: $el,
      el: $el[0],
      $dragEl: $dragEl,
      dragEl: $dragEl[0]
    });

    if (params.draggable) {
      scrollbar.enableDraggable();
    }
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.scrollbar.disableDraggable();
  }
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
      dragClass: 'swiper-scrollbar-drag'
    }
  },
  create: function create() {
    var _context116, _context117, _context118, _context119, _context120, _context121, _context122, _context123, _context124, _context125, _context126, _context127;

    var swiper = this;
    Utils.extend(swiper, {
      scrollbar: {
        init: bind_default()(_context116 = Scrollbar.init).call(_context116, swiper),
        destroy: bind_default()(_context117 = Scrollbar.destroy).call(_context117, swiper),
        updateSize: bind_default()(_context118 = Scrollbar.updateSize).call(_context118, swiper),
        setTranslate: bind_default()(_context119 = Scrollbar.setTranslate).call(_context119, swiper),
        setTransition: bind_default()(_context120 = Scrollbar.setTransition).call(_context120, swiper),
        enableDraggable: bind_default()(_context121 = Scrollbar.enableDraggable).call(_context121, swiper),
        disableDraggable: bind_default()(_context122 = Scrollbar.disableDraggable).call(_context122, swiper),
        setDragPosition: bind_default()(_context123 = Scrollbar.setDragPosition).call(_context123, swiper),
        getPointerPosition: bind_default()(_context124 = Scrollbar.getPointerPosition).call(_context124, swiper),
        onDragStart: bind_default()(_context125 = Scrollbar.onDragStart).call(_context125, swiper),
        onDragMove: bind_default()(_context126 = Scrollbar.onDragMove).call(_context126, swiper),
        onDragEnd: bind_default()(_context127 = Scrollbar.onDragEnd).call(_context127, swiper),
        isTouched: false,
        timeout: null,
        dragTimeout: null
      }
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
    }
  }
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

    if (index_of_default()(x).call(x, '%') >= 0) {
      x = "".concat(parse_int_default()(x, 10) * progress * rtlFactor, "%");
    } else {
      x = "".concat(x * progress * rtlFactor, "px");
    }

    if (index_of_default()(y).call(y, '%') >= 0) {
      y = "".concat(parse_int_default()(y, 10) * progress, "%");
    } else {
      y = "".concat(y * progress, "px");
    }

    if (typeof opacity !== 'undefined' && opacity !== null) {
      var currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
      $el[0].style.opacity = currentOpacity;
    }

    if (typeof scale === 'undefined' || scale === null) {
      var _context128;

      $el.transform(concat_default()(_context128 = "translate3d(".concat(x, ", ")).call(_context128, y, ", 0px)"));
    } else {
      var _context129, _context130;

      var currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
      $el.transform(concat_default()(_context129 = concat_default()(_context130 = "translate3d(".concat(x, ", ")).call(_context130, y, ", 0px) scale(")).call(_context129, currentScale, ")"));
    }
  },
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el,
        slides = swiper.slides,
        progress = swiper.progress,
        snapGrid = swiper.snapGrid;
    $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (index, el) {
      swiper.parallax.setTransform(el, progress);
    });
    slides.each(function (slideIndex, slideEl) {
      var _context131;

      var slideProgress = slideEl.progress;

      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }

      slideProgress = Math.min(Math.max(slideProgress, -1), 1);

      find_default()(_context131 = $(slideEl)).call(_context131, '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (index, el) {
        swiper.parallax.setTransform(el, slideProgress);
      });
    });
  },
  setTransition: function setTransition() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
    var swiper = this;
    var $el = swiper.$el;

    find_default()($el).call($el, '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (index, parallaxEl) {
      var $parallaxEl = $(parallaxEl);
      var parallaxDuration = parse_int_default()($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
      if (duration === 0) parallaxDuration = 0;
      $parallaxEl.transition(parallaxDuration);
    });
  }
};
var Parallax$1 = {
  name: 'parallax',
  params: {
    parallax: {
      enabled: false
    }
  },
  create: function create() {
    var _context132, _context133, _context134;

    var swiper = this;
    Utils.extend(swiper, {
      parallax: {
        setTransform: bind_default()(_context132 = Parallax.setTransform).call(_context132, swiper),
        setTranslate: bind_default()(_context133 = Parallax.setTranslate).call(_context133, swiper),
        setTransition: bind_default()(_context134 = Parallax.setTransition).call(_context134, swiper)
      }
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (!swiper.params.parallax.enabled) return;
      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.parallax.enabled) return;
      swiper.parallax.setTranslate();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.parallax.enabled) return;
      swiper.parallax.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.parallax.enabled) return;
      swiper.parallax.setTransition(duration);
    }
  }
};
var Zoom = {
  // Calc Scale From Multi-touches
  getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
    if (e.targetTouches.length < 2) return 1;
    var x1 = e.targetTouches[0].pageX;
    var y1 = e.targetTouches[0].pageY;
    var x2 = e.targetTouches[1].pageX;
    var y2 = e.targetTouches[1].pageY;
    var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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

    if (!swiper_esm_bundle_Support.gestures) {
      if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
        return;
      }

      zoom.fakeGestureTouched = true;
      gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
    }

    if (!gesture.$slideEl || !gesture.$slideEl.length) {
      var _context135;

      gesture.$slideEl = $(e.target).closest('.swiper-slide');
      if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = find_default()(_context135 = gesture.$slideEl).call(_context135, 'img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(".".concat(params.containerClass));
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

    if (!swiper_esm_bundle_Support.gestures) {
      if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
        return;
      }

      zoom.fakeGestureMoved = true;
      gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

    if (swiper_esm_bundle_Support.gestures) {
      zoom.scale = e.scale * zoom.currentScale;
    } else {
      zoom.scale = gesture.scaleMove / gesture.scaleStart * zoom.currentScale;
    }

    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = gesture.maxRatio - 1 + Math.pow(zoom.scale - gesture.maxRatio + 1, 0.5);
    }

    if (zoom.scale < params.minRatio) {
      zoom.scale = params.minRatio + 1 - Math.pow(params.minRatio - zoom.scale + 1, 0.5);
    }

    gesture.$imageEl.transform("translate3d(0,0,0) scale(".concat(zoom.scale, ")"));
  },
  onGestureEnd: function onGestureEnd(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;

    if (!swiper_esm_bundle_Support.gestures) {
      if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
        return;
      }

      if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !swiper_esm_bundle_Device.android) {
        return;
      }

      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.$imageEl.transition(swiper.params.speed).transform("translate3d(0,0,0) scale(".concat(zoom.scale, ")"));
    zoom.currentScale = zoom.scale;
    zoom.isScaling = false;
    if (zoom.scale === 1) gesture.$slideEl = undefined;
  },
  onTouchStart: function onTouchStart(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture,
        image = zoom.image;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    if (image.isTouched) return;
    if (swiper_esm_bundle_Device.android) e.preventDefault();
    image.isTouched = true;
    image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  },
  onTouchMove: function onTouchMove(e) {
    var _context136;

    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture,
        image = zoom.image,
        velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    swiper.allowClick = false;
    if (!image.isTouched || !gesture.$slideEl) return;

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
    } // Define if we need image drag


    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!image.isMoved && !zoom.isScaling) {
      if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
        image.isTouched = false;
        return;
      }

      if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
        image.isTouched = false;
        return;
      }
    }

    e.preventDefault();
    e.stopPropagation();
    image.isMoved = true;
    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

    if (image.currentX < image.minX) {
      image.currentX = image.minX + 1 - Math.pow(image.minX - image.currentX + 1, 0.8);
    }

    if (image.currentX > image.maxX) {
      image.currentX = image.maxX - 1 + Math.pow(image.currentX - image.maxX + 1, 0.8);
    }

    if (image.currentY < image.minY) {
      image.currentY = image.minY + 1 - Math.pow(image.minY - image.currentY + 1, 0.8);
    }

    if (image.currentY > image.maxY) {
      image.currentY = image.maxY - 1 + Math.pow(image.currentY - image.maxY + 1, 0.8);
    } // Velocity


    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
    if (!velocity.prevTime) velocity.prevTime = now_default()();
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (now_default()() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (now_default()() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = now_default()();
    gesture.$imageWrapEl.transform(concat_default()(_context136 = "translate3d(".concat(image.currentX, "px, ")).call(_context136, image.currentY, "px,0)"));
  },
  onTouchEnd: function onTouchEnd() {
    var _context137;

    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture,
        image = zoom.image,
        velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

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
    var newPositionY = image.currentY + momentumDistanceY; // Fix duration

    if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
    if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
    var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
    image.currentX = newPositionX;
    image.currentY = newPositionY; // Define if we need image drag

    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
    gesture.$imageWrapEl.transition(momentumDuration).transform(concat_default()(_context137 = "translate3d(".concat(image.currentX, "px, ")).call(_context137, image.currentY, "px,0)"));
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
  in: function _in(e) {
    var _context139;

    var swiper = this;
    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture,
        image = zoom.image;

    if (!gesture.$slideEl) {
      var _context138;

      gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = find_default()(_context138 = gesture.$slideEl).call(_context138, 'img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(".".concat(params.containerClass));
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    gesture.$slideEl.addClass("".concat(params.zoomedSlideClass));
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
      diffX = offsetX + slideWidth / 2 - touchX;
      diffY = offsetY + slideHeight / 2 - touchY;
      imageWidth = gesture.$imageEl[0].offsetWidth;
      imageHeight = gesture.$imageEl[0].offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;
      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
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

    gesture.$imageWrapEl.transition(300).transform(concat_default()(_context139 = "translate3d(".concat(translateX, "px, ")).call(_context139, translateY, "px,0)"));
    gesture.$imageEl.transition(300).transform("translate3d(0,0,0) scale(".concat(zoom.scale, ")"));
  },
  out: function out() {
    var swiper = this;
    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;

    if (!gesture.$slideEl) {
      var _context140;

      gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = find_default()(_context140 = gesture.$slideEl).call(_context140, 'img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(".".concat(params.containerClass));
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    zoom.scale = 1;
    zoom.currentScale = 1;
    gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
    gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
    gesture.$slideEl.removeClass("".concat(params.zoomedSlideClass));
    gesture.$slideEl = undefined;
  },
  // Attach/Detach Events
  enable: function enable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (zoom.enabled) return;
    zoom.enabled = true;
    var passiveListener = swiper.touchEvents.start === 'touchstart' && swiper_esm_bundle_Support.passiveListener && swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false; // Scale image

    if (swiper_esm_bundle_Support.gestures) {
      swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
    } // Move image


    swiper.$wrapperEl.on(swiper.touchEvents.move, ".".concat(swiper.params.zoom.containerClass), zoom.onTouchMove);
  },
  disable: function disable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (!zoom.enabled) return;
    swiper.zoom.enabled = false;
    var passiveListener = swiper.touchEvents.start === 'touchstart' && swiper_esm_bundle_Support.passiveListener && swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false; // Scale image

    if (swiper_esm_bundle_Support.gestures) {
      swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
    } // Move image


    swiper.$wrapperEl.off(swiper.touchEvents.move, ".".concat(swiper.params.zoom.containerClass), zoom.onTouchMove);
  }
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
      zoomedSlideClass: 'swiper-slide-zoomed'
    }
  },
  create: function create() {
    var _context141;

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
        maxRatio: 3
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
        touchesCurrent: {}
      },
      velocity: {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined
      }
    };

    for_each_default()(_context141 = 'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'.split(' ')).call(_context141, function (methodName) {
      var _context142;

      zoom[methodName] = bind_default()(_context142 = Zoom[methodName]).call(_context142, swiper);
    });

    Utils.extend(swiper, {
      zoom: zoom
    });
    var scale = 1;

    define_property_default()(swiper.zoom, 'scale', {
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
      }
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
      if (!swiper.zoom.enabled) return;
      swiper.zoom.onTouchStart(e);
    },
    touchEnd: function touchEnd(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) return;
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
    }
  }
};
var Lazy = {
  loadInSlide: function loadInSlide(index) {
    var _context143, _context144, _context145;

    var loadInDuplicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var swiper = this;
    var params = swiper.params.lazy;
    if (typeof index === 'undefined') return;
    if (swiper.slides.length === 0) return;
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var $slideEl = isVirtual ? swiper.$wrapperEl.children(concat_default()(_context143 = ".".concat(swiper.params.slideClass, "[data-swiper-slide-index=\"")).call(_context143, index, "\"]")) : swiper.slides.eq(index);

    var $images = find_default()($slideEl).call($slideEl, concat_default()(_context144 = concat_default()(_context145 = ".".concat(params.elementClass, ":not(.")).call(_context145, params.loadedClass, "):not(.")).call(_context144, params.loadingClass, ")"));

    if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
      $images = $images.add($slideEl[0]);
    }

    if ($images.length === 0) return;
    $images.each(function (imageIndex, imageEl) {
      var $imageEl = $(imageEl);
      $imageEl.addClass(params.loadingClass);
      var background = $imageEl.attr('data-background');
      var src = $imageEl.attr('data-src');
      var srcset = $imageEl.attr('data-srcset');
      var sizes = $imageEl.attr('data-sizes');
      swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, function () {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;

        if (background) {
          $imageEl.css('background-image', "url(\"".concat(background, "\")"));
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

        find_default()($slideEl).call($slideEl, ".".concat(params.preloaderClass)).remove();

        if (swiper.params.loop && loadInDuplicate) {
          var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

          if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
            var _context146;

            var originalSlide = swiper.$wrapperEl.children(concat_default()(_context146 = "[data-swiper-slide-index=\"".concat(slideOriginalIndex, "\"]:not(.")).call(_context146, swiper.params.slideDuplicateClass, ")"));
            swiper.lazy.loadInSlide(originalSlide.index(), false);
          } else {
            var _context147;

            var duplicatedSlide = swiper.$wrapperEl.children(concat_default()(_context147 = ".".concat(swiper.params.slideDuplicateClass, "[data-swiper-slide-index=\"")).call(_context147, slideOriginalIndex, "\"]"));
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
    var $wrapperEl = swiper.$wrapperEl,
        swiperParams = swiper.params,
        slides = swiper.slides,
        activeIndex = swiper.activeIndex;
    var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
    var params = swiperParams.lazy;
    var slidesPerView = swiperParams.slidesPerView;

    if (slidesPerView === 'auto') {
      slidesPerView = 0;
    }

    function slideExist(index) {
      if (isVirtual) {
        var _context148;

        if ($wrapperEl.children(concat_default()(_context148 = ".".concat(swiperParams.slideClass, "[data-swiper-slide-index=\"")).call(_context148, index, "\"]")).length) {
          return true;
        }
      } else if (slides[index]) return true;

      return false;
    }

    function slideIndex(slideEl) {
      if (isVirtual) {
        return $(slideEl).attr('data-swiper-slide-index');
      }

      return $(slideEl).index();
    }

    if (!swiper.lazy.initialImageLoaded) swiper.lazy.initialImageLoaded = true;

    if (swiper.params.watchSlidesVisibility) {
      $wrapperEl.children(".".concat(swiperParams.slideVisibleClass)).each(function (elIndex, slideEl) {
        var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
        swiper.lazy.loadInSlide(index);
      });
    } else if (slidesPerView > 1) {
      for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
        if (slideExist(i)) swiper.lazy.loadInSlide(i);
      }
    } else {
      swiper.lazy.loadInSlide(activeIndex);
    }

    if (params.loadPrevNext) {
      if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
        var amount = params.loadPrevNextAmount;
        var spv = slidesPerView;
        var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
        var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

        for (var _i10 = activeIndex + slidesPerView; _i10 < maxIndex; _i10 += 1) {
          if (slideExist(_i10)) swiper.lazy.loadInSlide(_i10);
        } // Prev Slides


        for (var _i11 = minIndex; _i11 < activeIndex; _i11 += 1) {
          if (slideExist(_i11)) swiper.lazy.loadInSlide(_i11);
        }
      } else {
        var nextSlide = $wrapperEl.children(".".concat(swiperParams.slideNextClass));
        if (nextSlide.length > 0) swiper.lazy.loadInSlide(slideIndex(nextSlide));
        var prevSlide = $wrapperEl.children(".".concat(swiperParams.slidePrevClass));
        if (prevSlide.length > 0) swiper.lazy.loadInSlide(slideIndex(prevSlide));
      }
    }
  }
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
      preloaderClass: 'swiper-lazy-preloader'
    }
  },
  create: function create() {
    var _context149, _context150;

    var swiper = this;
    Utils.extend(swiper, {
      lazy: {
        initialImageLoaded: false,
        load: bind_default()(_context149 = Lazy.load).call(_context149, swiper),
        loadInSlide: bind_default()(_context150 = Lazy.loadInSlide).call(_context150, swiper)
      }
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
        if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded) {
          swiper.lazy.load();
        }
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;

      if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
        swiper.lazy.load();
      }
    }
  }
};
/* eslint no-bitwise: ["error", { "allow": [">>"] }] */

var Controller = {
  LinearSpline: function LinearSpline(x, y) {
    var binarySearch = function search() {
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
    }();

    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.

    var i1;
    var i3;

    this.interpolate = function interpolate(x2) {
      if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };

    return this;
  },
  // xxx: for now i will just save one spline function to to
  getInterpolateFunction: function getInterpolateFunction(c) {
    var swiper = this;

    if (!swiper.controller.spline) {
      swiper.controller.spline = swiper.params.loop ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
    }
  },
  setTranslate: function setTranslate(_setTranslate, byController) {
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
        swiper.controller.getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out

        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }

      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
      }

      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }

      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }

    if (is_array_default()(controlled)) {
      for (var i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof swiper_esm_bundle_Swiper) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof swiper_esm_bundle_Swiper && byController !== controlled) {
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
          if (!controlled) return;

          if (c.params.loop && swiper.params.controller.by === 'slide') {
            c.loopFix();
          }

          c.transitionEnd();
        });
      }
    }

    if (is_array_default()(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof swiper_esm_bundle_Swiper) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof swiper_esm_bundle_Swiper && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }
};
var Controller$1 = {
  name: 'controller',
  params: {
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide' // or 'container'

    }
  },
  create: function create() {
    var _context151, _context152, _context153;

    var swiper = this;
    Utils.extend(swiper, {
      controller: {
        control: swiper.params.controller.control,
        getInterpolateFunction: bind_default()(_context151 = Controller.getInterpolateFunction).call(_context151, swiper),
        setTranslate: bind_default()(_context152 = Controller.setTranslate).call(_context152, swiper),
        setTransition: bind_default()(_context153 = Controller.setTransition).call(_context153, swiper)
      }
    });
  },
  on: {
    update: function update() {
      var swiper = this;
      if (!swiper.controller.control) return;

      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    resize: function resize() {
      var swiper = this;
      if (!swiper.controller.control) return;

      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      if (!swiper.controller.control) return;

      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    setTranslate: function setTranslate(translate, byController) {
      var swiper = this;
      if (!swiper.controller.control) return;
      swiper.controller.setTranslate(translate, byController);
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      if (!swiper.controller.control) return;
      swiper.controller.setTransition(duration, byController);
    }
  }
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
    if (e.keyCode !== 13) return;
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

    if (swiper.pagination && $targetEl.is(".".concat(swiper.params.pagination.bulletClass))) {
      $targetEl[0].click();
    }
  },
  notify: function notify(message) {
    var swiper = this;
    var notification = swiper.a11y.liveRegion;
    if (notification.length === 0) return;
    notification.html('');
    notification.html(message);
  },
  updateNavigation: function updateNavigation() {
    var swiper = this;
    if (swiper.params.loop) return;
    var _swiper$navigation4 = swiper.navigation,
        $nextEl = _swiper$navigation4.$nextEl,
        $prevEl = _swiper$navigation4.$prevEl;

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
    swiper.$el.append(swiper.a11y.liveRegion); // Navigation

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
    } // Pagination


    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.on('keydown', ".".concat(swiper.params.pagination.bulletClass), swiper.a11y.onEnterKey);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) swiper.a11y.liveRegion.remove();
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
    } // Pagination


    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.off('keydown', ".".concat(swiper.params.pagination.bulletClass), swiper.a11y.onEnterKey);
    }
  }
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
      paginationBulletMessage: 'Go to slide {{index}}'
    }
  },
  create: function create() {
    var _context154;

    var swiper = this;
    Utils.extend(swiper, {
      a11y: {
        liveRegion: $("<span class=\"".concat(swiper.params.a11y.notificationClass, "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>"))
      }
    });

    for_each_default()(_context154 = keys_default()(a11y)).call(_context154, function (methodName) {
      var _context155;

      swiper.a11y[methodName] = bind_default()(_context155 = a11y[methodName]).call(_context155, swiper);
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.init();
      swiper.a11y.updateNavigation();
    },
    toEdge: function toEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.updateNavigation();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.updateNavigation();
    },
    paginationUpdate: function paginationUpdate() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.updatePagination();
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.destroy();
    }
  }
};
var History = {
  init: function init() {
    var swiper = this;
    if (!swiper.params.history) return;

    if (!ssr_window_esm_win.history || !ssr_window_esm_win.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }

    var history = swiper.history;
    history.initialized = true;
    history.paths = History.getPathValues();
    if (!history.paths.key && !history.paths.value) return;
    history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);

    if (!swiper.params.history.replaceState) {
      ssr_window_esm_win.addEventListener('popstate', swiper.history.setHistoryPopState);
    }
  },
  destroy: function destroy() {
    var swiper = this;

    if (!swiper.params.history.replaceState) {
      ssr_window_esm_win.removeEventListener('popstate', swiper.history.setHistoryPopState);
    }
  },
  setHistoryPopState: function setHistoryPopState() {
    var swiper = this;
    swiper.history.paths = History.getPathValues();
    swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
  },
  getPathValues: function getPathValues() {
    var _context156, _context157;

    var pathArray = filter_default()(_context156 = slice_default()(_context157 = ssr_window_esm_win.location.pathname).call(_context157, 1).split('/')).call(_context156, function (part) {
      return part !== '';
    });

    var total = pathArray.length;
    var key = pathArray[total - 2];
    var value = pathArray[total - 1];
    return {
      key: key,
      value: value
    };
  },
  setHistory: function setHistory(key, index) {
    var _context158;

    var swiper = this;
    if (!swiper.history.initialized || !swiper.params.history.enabled) return;
    var slide = swiper.slides.eq(index);
    var value = History.slugify(slide.attr('data-history'));

    if (!includes_default()(_context158 = ssr_window_esm_win.location.pathname).call(_context158, key)) {
      var _context159;

      value = concat_default()(_context159 = "".concat(key, "/")).call(_context159, value);
    }

    var currentState = ssr_window_esm_win.history.state;

    if (currentState && currentState.value === value) {
      return;
    }

    if (swiper.params.history.replaceState) {
      ssr_window_esm_win.history.replaceState({
        value: value
      }, null, value);
    } else {
      ssr_window_esm_win.history.pushState({
        value: value
      }, null, value);
    }
  },
  slugify: function slugify(text) {
    return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  },
  scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
    var swiper = this;

    if (value) {
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var _slide3 = swiper.slides.eq(i);

        var slideHistory = History.slugify(_slide3.attr('data-history'));

        if (slideHistory === value && !_slide3.hasClass(swiper.params.slideDuplicateClass)) {
          var _index2 = _slide3.index();

          swiper.slideTo(_index2, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  }
};
var History$1 = {
  name: 'history',
  params: {
    history: {
      enabled: false,
      replaceState: false,
      key: 'slides'
    }
  },
  create: function create() {
    var _context160, _context161, _context162, _context163, _context164;

    var swiper = this;
    Utils.extend(swiper, {
      history: {
        init: bind_default()(_context160 = History.init).call(_context160, swiper),
        setHistory: bind_default()(_context161 = History.setHistory).call(_context161, swiper),
        setHistoryPopState: bind_default()(_context162 = History.setHistoryPopState).call(_context162, swiper),
        scrollToSlide: bind_default()(_context163 = History.scrollToSlide).call(_context163, swiper),
        destroy: bind_default()(_context164 = History.destroy).call(_context164, swiper)
      }
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
    }
  }
};
var HashNavigation = {
  onHashCange: function onHashCange() {
    var swiper = this;
    var newHash = ssr_window_esm_doc.location.hash.replace('#', '');
    var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');

    if (newHash !== activeSlideHash) {
      var _context165;

      var newIndex = swiper.$wrapperEl.children(concat_default()(_context165 = ".".concat(swiper.params.slideClass, "[data-hash=\"")).call(_context165, newHash, "\"]")).index();
      if (typeof newIndex === 'undefined') return;
      swiper.slideTo(newIndex);
    }
  },
  setHash: function setHash() {
    var swiper = this;
    if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) return;

    if (swiper.params.hashNavigation.replaceState && ssr_window_esm_win.history && ssr_window_esm_win.history.replaceState) {
      ssr_window_esm_win.history.replaceState(null, null, "#".concat(swiper.slides.eq(swiper.activeIndex).attr('data-hash')) || false);
    } else {
      var _slide4 = swiper.slides.eq(swiper.activeIndex);

      var hash = _slide4.attr('data-hash') || _slide4.attr('data-history');

      ssr_window_esm_doc.location.hash = hash || '';
    }
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
    swiper.hashNavigation.initialized = true;
    var hash = ssr_window_esm_doc.location.hash.replace('#', '');

    if (hash) {
      var speed = 0;

      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var _slide5 = swiper.slides.eq(i);

        var slideHash = _slide5.attr('data-hash') || _slide5.attr('data-history');

        if (slideHash === hash && !_slide5.hasClass(swiper.params.slideDuplicateClass)) {
          var _index3 = _slide5.index();

          swiper.slideTo(_index3, speed, swiper.params.runCallbacksOnInit, true);
        }
      }
    }

    if (swiper.params.hashNavigation.watchState) {
      $(ssr_window_esm_win).on('hashchange', swiper.hashNavigation.onHashCange);
    }
  },
  destroy: function destroy() {
    var swiper = this;

    if (swiper.params.hashNavigation.watchState) {
      $(ssr_window_esm_win).off('hashchange', swiper.hashNavigation.onHashCange);
    }
  }
};
var HashNavigation$1 = {
  name: 'hash-navigation',
  params: {
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false
    }
  },
  create: function create() {
    var _context166, _context167, _context168, _context169;

    var swiper = this;
    Utils.extend(swiper, {
      hashNavigation: {
        initialized: false,
        init: bind_default()(_context166 = HashNavigation.init).call(_context166, swiper),
        destroy: bind_default()(_context167 = HashNavigation.destroy).call(_context167, swiper),
        setHash: bind_default()(_context168 = HashNavigation.setHash).call(_context168, swiper),
        onHashCange: bind_default()(_context169 = HashNavigation.onHashCange).call(_context169, swiper)
      }
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
    }
  }
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

    clearTimeout(swiper.autoplay.timeout);
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
    if (typeof swiper.autoplay.timeout !== 'undefined') return false;
    if (swiper.autoplay.running) return false;
    swiper.autoplay.running = true;
    swiper.emit('autoplayStart');
    swiper.autoplay.run();
    return true;
  },
  stop: function stop() {
    var swiper = this;
    if (!swiper.autoplay.running) return false;
    if (typeof swiper.autoplay.timeout === 'undefined') return false;

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
    if (!swiper.autoplay.running) return;
    if (swiper.autoplay.paused) return;
    if (swiper.autoplay.timeout) clearTimeout(swiper.autoplay.timeout);
    swiper.autoplay.paused = true;

    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      swiper.autoplay.run();
    } else {
      swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
      swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
    }
  }
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
      reverseDirection: false
    }
  },
  create: function create() {
    var _context170, _context171, _context172, _context173;

    var swiper = this;
    Utils.extend(swiper, {
      autoplay: {
        running: false,
        paused: false,
        run: bind_default()(_context170 = Autoplay.run).call(_context170, swiper),
        start: bind_default()(_context171 = Autoplay.start).call(_context171, swiper),
        stop: bind_default()(_context172 = Autoplay.stop).call(_context172, swiper),
        pause: bind_default()(_context173 = Autoplay.pause).call(_context173, swiper),
        onTransitionEnd: function onTransitionEnd(e) {
          if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
          if (e.target !== this) return;
          swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
          swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
          swiper.autoplay.paused = false;

          if (!swiper.autoplay.running) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.run();
          }
        }
      }
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
    }
  }
};
var Fade = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;

    for (var i = 0; i < slides.length; i += 1) {
      var _context174;

      var $slideEl = swiper.slides.eq(i);
      var _offset = $slideEl[0].swiperSlideOffset;
      var tx = -_offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      var ty = 0;

      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }

      var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
      $slideEl.css({
        opacity: slideOpacity
      }).transform(concat_default()(_context174 = "translate3d(".concat(tx, "px, ")).call(_context174, ty, "px, 0px)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides,
        $wrapperEl = swiper.$wrapperEl;
    slides.transition(duration);

    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      slides.transitionEnd(function () {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];

        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  }
};
var EffectFade = {
  name: 'effect-fade',
  params: {
    fadeEffect: {
      crossFade: false
    }
  },
  create: function create() {
    var _context175, _context176;

    var swiper = this;
    Utils.extend(swiper, {
      fadeEffect: {
        setTranslate: bind_default()(_context175 = Fade.setTranslate).call(_context175, swiper),
        setTransition: bind_default()(_context176 = Fade.setTransition).call(_context176, swiper)
      }
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') return;
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "fade"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') return;
      swiper.fadeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'fade') return;
      swiper.fadeEffect.setTransition(duration);
    }
  }
};
var Cube = {
  setTranslate: function setTranslate() {
    var _context186, _context187;

    var swiper = this;
    var $el = swiper.$el,
        $wrapperEl = swiper.$wrapperEl,
        slides = swiper.slides,
        swiperWidth = swiper.width,
        swiperHeight = swiper.height,
        rtl = swiper.rtlTranslate,
        swiperSize = swiper.size;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var $cubeShadowEl;

    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl = find_default()($wrapperEl).call($wrapperEl, '.swiper-cube-shadow');

        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
          $wrapperEl.append($cubeShadowEl);
        }

        $cubeShadowEl.css({
          height: "".concat(swiperWidth, "px")
        });
      } else {
        $cubeShadowEl = find_default()($el).call($el, '.swiper-cube-shadow');

        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
          $el.append($cubeShadowEl);
        }
      }
    }

    for (var i = 0; i < slides.length; i += 1) {
      var _context177, _context178, _context179, _context180;

      var $slideEl = slides.eq(i);
      var slideIndex = i;

      if (isVirtual) {
        slideIndex = parse_int_default()($slideEl.attr('data-swiper-slide-index'), 10);
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
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }

      if (rtl) {
        tx = -tx;
      }

      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }

      var _transform = concat_default()(_context177 = concat_default()(_context178 = concat_default()(_context179 = concat_default()(_context180 = "rotateX(".concat(isHorizontal ? 0 : -slideAngle, "deg) rotateY(")).call(_context180, isHorizontal ? slideAngle : 0, "deg) translate3d(")).call(_context179, tx, "px, ")).call(_context178, ty, "px, ")).call(_context177, tz, "px)");

      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }

      $slideEl.transform(_transform);

      if (params.slideShadows) {
        // Set shadows
        var shadowBefore = isHorizontal ? find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-left') : find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-top');
        var shadowAfter = isHorizontal ? find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-right') : find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-bottom');

        if (shadowBefore.length === 0) {
          shadowBefore = $("<div class=\"swiper-slide-shadow-".concat(isHorizontal ? 'left' : 'top', "\"></div>"));
          $slideEl.append(shadowBefore);
        }

        if (shadowAfter.length === 0) {
          shadowAfter = $("<div class=\"swiper-slide-shadow-".concat(isHorizontal ? 'right' : 'bottom', "\"></div>"));
          $slideEl.append(shadowAfter);
        }

        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      }
    }

    $wrapperEl.css({
      '-webkit-transform-origin': "50% 50% -".concat(swiperSize / 2, "px"),
      '-moz-transform-origin': "50% 50% -".concat(swiperSize / 2, "px"),
      '-ms-transform-origin': "50% 50% -".concat(swiperSize / 2, "px"),
      'transform-origin': "50% 50% -".concat(swiperSize / 2, "px")
    });

    if (params.shadow) {
      if (isHorizontal) {
        var _context181, _context182;

        $cubeShadowEl.transform(concat_default()(_context181 = concat_default()(_context182 = "translate3d(0px, ".concat(swiperWidth / 2 + params.shadowOffset, "px, ")).call(_context182, -swiperWidth / 2, "px) rotateX(90deg) rotateZ(0deg) scale(")).call(_context181, params.shadowScale, ")"));
      } else {
        var _context183, _context184, _context185;

        var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var _offset2 = params.shadowOffset;
        $cubeShadowEl.transform(concat_default()(_context183 = concat_default()(_context184 = concat_default()(_context185 = "scale3d(".concat(scale1, ", 1, ")).call(_context185, scale2, ") translate3d(0px, ")).call(_context184, swiperHeight / 2 + _offset2, "px, ")).call(_context183, -swiperHeight / 2 / scale2, "px) rotateX(-90deg)"));
      }
    }

    var zFactor = swiper_esm_bundle_Browser.isSafari || swiper_esm_bundle_Browser.isUiWebView ? -swiperSize / 2 : 0;
    $wrapperEl.transform(concat_default()(_context186 = concat_default()(_context187 = "translate3d(0px,0,".concat(zFactor, "px) rotateX(")).call(_context187, swiper.isHorizontal() ? 0 : wrapperRotate, "deg) rotateY(")).call(_context186, swiper.isHorizontal() ? -wrapperRotate : 0, "deg)"));
  },
  setTransition: function setTransition(duration) {
    var _context188;

    var swiper = this;
    var $el = swiper.$el,
        slides = swiper.slides;

    find_default()(_context188 = slides.transition(duration)).call(_context188, '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      find_default()($el).call($el, '.swiper-cube-shadow').transition(duration);
    }
  }
};
var EffectCube = {
  name: 'effect-cube',
  params: {
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  },
  create: function create() {
    var _context189, _context190;

    var swiper = this;
    Utils.extend(swiper, {
      cubeEffect: {
        setTranslate: bind_default()(_context189 = Cube.setTranslate).call(_context189, swiper),
        setTransition: bind_default()(_context190 = Cube.setTransition).call(_context190, swiper)
      }
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') return;
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "cube"));
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') return;
      swiper.cubeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'cube') return;
      swiper.cubeEffect.setTransition(duration);
    }
  }
};
var Flip = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides,
        rtl = swiper.rtlTranslate;

    for (var i = 0; i < slides.length; i += 1) {
      var _context191, _context192, _context193;

      var $slideEl = slides.eq(i);
      var progress = $slideEl[0].progress;

      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }

      var _offset3 = $slideEl[0].swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = -_offset3;
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
        var shadowBefore = swiper.isHorizontal() ? find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-left') : find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-top');
        var shadowAfter = swiper.isHorizontal() ? find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-right') : find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-bottom');

        if (shadowBefore.length === 0) {
          shadowBefore = $("<div class=\"swiper-slide-shadow-".concat(swiper.isHorizontal() ? 'left' : 'top', "\"></div>"));
          $slideEl.append(shadowBefore);
        }

        if (shadowAfter.length === 0) {
          shadowAfter = $("<div class=\"swiper-slide-shadow-".concat(swiper.isHorizontal() ? 'right' : 'bottom', "\"></div>"));
          $slideEl.append(shadowAfter);
        }

        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      }

      $slideEl.transform(concat_default()(_context191 = concat_default()(_context192 = concat_default()(_context193 = "translate3d(".concat(tx, "px, ")).call(_context193, ty, "px, 0px) rotateX(")).call(_context192, rotateX, "deg) rotateY(")).call(_context191, rotateY, "deg)"));
    }
  },
  setTransition: function setTransition(duration) {
    var _context194;

    var swiper = this;
    var slides = swiper.slides,
        activeIndex = swiper.activeIndex,
        $wrapperEl = swiper.$wrapperEl;

    find_default()(_context194 = slides.transition(duration)).call(_context194, '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false; // eslint-disable-next-line

      slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return; // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;

        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];

        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  }
};
var EffectFlip = {
  name: 'effect-flip',
  params: {
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    }
  },
  create: function create() {
    var _context195, _context196;

    var swiper = this;
    Utils.extend(swiper, {
      flipEffect: {
        setTranslate: bind_default()(_context195 = Flip.setTranslate).call(_context195, swiper),
        setTransition: bind_default()(_context196 = Flip.setTransition).call(_context196, swiper)
      }
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') return;
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "flip"));
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') return;
      swiper.flipEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'flip') return;
      swiper.flipEffect.setTransition(duration);
    }
  }
};
var Coverflow = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var swiperWidth = swiper.width,
        swiperHeight = swiper.height,
        slides = swiper.slides,
        $wrapperEl = swiper.$wrapperEl,
        slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth; // Each slide offset from center

    for (var i = 0, length = slides.length; i < length; i += 1) {
      var _context197, _context198, _context199, _context200;

      var $slideEl = slides.eq(i);
      var slideSize = slidesSizesGrid[i];
      var slideOffset = $slideEl[0].swiperSlideOffset;
      var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;
      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

      var translateZ = -translate * Math.abs(offsetMultiplier);
      var translateY = isHorizontal ? 0 : params.stretch * offsetMultiplier;
      var translateX = isHorizontal ? params.stretch * offsetMultiplier : 0; // Fix for ultra small values

      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;

      var slideTransform = concat_default()(_context197 = concat_default()(_context198 = concat_default()(_context199 = concat_default()(_context200 = "translate3d(".concat(translateX, "px,")).call(_context200, translateY, "px,")).call(_context199, translateZ, "px)  rotateX(")).call(_context198, rotateX, "deg) rotateY(")).call(_context197, rotateY, "deg)");

      $slideEl.transform(slideTransform);
      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

      if (params.slideShadows) {
        // Set shadows
        var $shadowBeforeEl = isHorizontal ? find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-left') : find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-top');
        var $shadowAfterEl = isHorizontal ? find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-right') : find_default()($slideEl).call($slideEl, '.swiper-slide-shadow-bottom');

        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = $("<div class=\"swiper-slide-shadow-".concat(isHorizontal ? 'left' : 'top', "\"></div>"));
          $slideEl.append($shadowBeforeEl);
        }

        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = $("<div class=\"swiper-slide-shadow-".concat(isHorizontal ? 'right' : 'bottom', "\"></div>"));
          $slideEl.append($shadowAfterEl);
        }

        if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    } // Set correct perspective for IE10


    if (swiper_esm_bundle_Support.pointerEvents || swiper_esm_bundle_Support.prefixedPointerEvents) {
      var ws = $wrapperEl[0].style;
      ws.perspectiveOrigin = "".concat(center, "px 50%");
    }
  },
  setTransition: function setTransition(duration) {
    var _context201;

    var swiper = this;

    find_default()(_context201 = swiper.slides.transition(duration)).call(_context201, '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
  }
};
var EffectCoverflow = {
  name: 'effect-coverflow',
  params: {
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  },
  create: function create() {
    var _context202, _context203;

    var swiper = this;
    Utils.extend(swiper, {
      coverflowEffect: {
        setTranslate: bind_default()(_context202 = Coverflow.setTranslate).call(_context202, swiper),
        setTransition: bind_default()(_context203 = Coverflow.setTransition).call(_context203, swiper)
      }
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') return;
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "coverflow"));
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') return;
      swiper.coverflowEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') return;
      swiper.coverflowEffect.setTransition(duration);
    }
  }
};
var Thumbs = {
  init: function init() {
    var swiper = this;
    var thumbsParams = swiper.params.thumbs;
    var SwiperClass = swiper.constructor;

    if (thumbsParams.swiper instanceof SwiperClass) {
      swiper.thumbs.swiper = thumbsParams.swiper;
      Utils.extend(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Utils.extend(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
    } else if (Utils.isObject(thumbsParams.swiper)) {
      swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: false
      }));
      swiper.thumbs.swiperCreated = true;
    }

    swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
  },
  onThumbClick: function onThumbClick() {
    var swiper = this;
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    var clickedIndex = thumbsSwiper.clickedIndex;
    var clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    var slideToIndex;

    if (thumbsSwiper.params.loop) {
      slideToIndex = parse_int_default()($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }

    if (swiper.params.loop) {
      var currentIndex = swiper.activeIndex;

      if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
        swiper.loopFix(); // eslint-disable-next-line

        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        currentIndex = swiper.activeIndex;
      }

      var prevIndex = swiper.slides.eq(currentIndex).prevAll("[data-swiper-slide-index=\"".concat(slideToIndex, "\"]")).eq(0).index();
      var nextIndex = swiper.slides.eq(currentIndex).nextAll("[data-swiper-slide-index=\"".concat(slideToIndex, "\"]")).eq(0).index();
      if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;
    }

    swiper.slideTo(slideToIndex);
  },
  update: function update(initial) {
    var swiper = this;
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;

    if (swiper.realIndex !== thumbsSwiper.realIndex) {
      var _context204;

      var currentThumbsIndex = thumbsSwiper.activeIndex;
      var newThumbsIndex;

      if (thumbsSwiper.params.loop) {
        if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
          thumbsSwiper.loopFix(); // eslint-disable-next-line

          thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
          currentThumbsIndex = thumbsSwiper.activeIndex;
        } // Find actual thumbs index to slide to


        var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll("[data-swiper-slide-index=\"".concat(swiper.realIndex, "\"]")).eq(0).index();
        var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll("[data-swiper-slide-index=\"".concat(swiper.realIndex, "\"]")).eq(0).index();
        if (typeof prevThumbsIndex === 'undefined') newThumbsIndex = nextThumbsIndex;else if (typeof nextThumbsIndex === 'undefined') newThumbsIndex = prevThumbsIndex;else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) newThumbsIndex = currentThumbsIndex;else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) newThumbsIndex = nextThumbsIndex;else newThumbsIndex = prevThumbsIndex;
      } else {
        newThumbsIndex = swiper.realIndex;
      }

      if (thumbsSwiper.visibleSlidesIndexes && index_of_default()(_context204 = thumbsSwiper.visibleSlidesIndexes).call(_context204, newThumbsIndex) < 0) {
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
    } // Activate thumbs


    var thumbsToActivate = 1;
    var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }

    thumbsSwiper.slides.removeClass(thumbActiveClass);

    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual) {
      for (var i = 0; i < thumbsToActivate; i += 1) {
        thumbsSwiper.$wrapperEl.children("[data-swiper-slide-index=\"".concat(swiper.realIndex + i, "\"]")).addClass(thumbActiveClass);
      }
    } else {
      for (var _i12 = 0; _i12 < thumbsToActivate; _i12 += 1) {
        thumbsSwiper.slides.eq(swiper.realIndex + _i12).addClass(thumbActiveClass);
      }
    }
  }
};
var Thumbs$1 = {
  name: 'thumbs',
  params: {
    thumbs: {
      swiper: null,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-container-thumbs'
    }
  },
  create: function create() {
    var _context205, _context206, _context207;

    var swiper = this;
    Utils.extend(swiper, {
      thumbs: {
        swiper: null,
        init: bind_default()(_context205 = Thumbs.init).call(_context205, swiper),
        update: bind_default()(_context206 = Thumbs.update).call(_context206, swiper),
        onThumbClick: bind_default()(_context207 = Thumbs.onThumbClick).call(_context207, swiper)
      }
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      var thumbs = swiper.params.thumbs;
      if (!thumbs || !thumbs.swiper) return;
      swiper.thumbs.init();
      swiper.thumbs.update(true);
    },
    slideChange: function slideChange() {
      var swiper = this;
      if (!swiper.thumbs.swiper) return;
      swiper.thumbs.update();
    },
    update: function update() {
      var swiper = this;
      if (!swiper.thumbs.swiper) return;
      swiper.thumbs.update();
    },
    resize: function resize() {
      var swiper = this;
      if (!swiper.thumbs.swiper) return;
      swiper.thumbs.update();
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      if (!swiper.thumbs.swiper) return;
      swiper.thumbs.update();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) return;
      thumbsSwiper.setTransition(duration);
    },
    beforeDestroy: function beforeDestroy() {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) return;

      if (swiper.thumbs.swiperCreated && thumbsSwiper) {
        thumbsSwiper.destroy();
      }
    }
  }
}; // Swiper Class

var components = [Device$1, Support$1, Browser$1, Resize, Observer$1, Virtual$1, Keyboard$1, Mousewheel$1, Navigation$1, Pagination$1, Scrollbar$1, Parallax$1, Zoom$1, Lazy$1, Controller$1, A11y, History$1, HashNavigation$1, Autoplay$1, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs$1];

if (typeof swiper_esm_bundle_Swiper.use === 'undefined') {
  swiper_esm_bundle_Swiper.use = swiper_esm_bundle_Swiper.Class.use;
  swiper_esm_bundle_Swiper.installModule = swiper_esm_bundle_Swiper.Class.installModule;
}

swiper_esm_bundle_Swiper.use(components);
/* harmony default export */ var swiper_esm_bundle = (swiper_esm_bundle_Swiper);
// CONCATENATED MODULE: ./src/assets/js/swiper-slider.js

var loginSlider = new swiper_esm_bundle(".login-slider", {
  slidesPerView: 1,
  direction: "horizontal",
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  keyboard: {
    enabled: true
  },
  pagination: {
    el: "#swiper-login-pagination",
    clickable: true
  }
});
var homeHeroCtaSlider = new swiper_esm_bundle("#home-hero-cta-slider", {
  slidesPerView: 1,
  direction: "horizontal",
  loop: true,
  allowTouchMove: false,
  speed: 1200,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  keyboard: {
    enabled: false
  },
  pagination: {
    el: "#swiper-home-hero-pagination",
    clickable: true
  }
});
var homeHeroImageSlider = new swiper_esm_bundle("#home-hero-image-slider", {
  autoHeight: false,
  slidesPerView: 1,
  direction: "horizontal",
  loop: true,
  speed: 1200,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  keyboard: {
    enabled: true
  },
  pagination: {
    el: "#swiper-home-hero-pagination",
    clickable: true
  },
  slideToClickedSlide: true,
  breakpoints: {
    1200: {
      autoHeight: true
    }
  }
}); // Make them synchronized

homeHeroImageSlider.on("slideChange", function () {
  homeHeroCtaSlider.slideTo(homeHeroImageSlider.activeIndex);
});
var newsHeroSlider = new swiper_esm_bundle("#news-slider", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  direction: "horizontal",
  speed: 1200,
  spaceBetween: 2,
  keyboard: {
    enabled: false
  },
  pagination: {
    el: "#swiper-news-pagination",
    clickable: true
  },
  breakpoints: {
    730: {
      centeredSlides: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0
    },
    1000: {
      slidesPerView: 2,
      slidesPerGroup: 1
    },
    1300: {
      slidesPerView: 2,
      slidesPerGroup: 2
    }
  }
});
var rightNowSlider = new swiper_esm_bundle("#right-now-slider", {
  slidesPerView: 4,
  slidesPerColumn: 2,
  slidesPerGroup: 4,
  direction: "horizontal",
  speed: 1200,
  spaceBetween: 40,
  keyboard: {
    enabled: false
  },
  pagination: {
    el: "#swiper-rn-pagination",
    clickable: true
  },
  breakpoints: {
    1199: {
      slidesPerView: 3,
      slidesPerGroup: 3
    },
    767: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },
    550: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerColumn: 1
    }
  }
});
var adSlider = new swiper_esm_bundle("#ad-detail-slider", {
  slidesPerView: 1,
  direction: "horizontal",
  loop: true,
  speed: 1000,
  keyboard: {
    enabled: true
  },
  navigation: {
    nextEl: "#ad-detail-btn-next",
    prevEl: "#ad-detail-btn-prev"
  },
  pagination: {
    el: "#swiper-ad-pagination",
    clickable: true
  }
});

// EXTERNAL MODULE: ./node_modules/pikaday/pikaday.js
var pikaday = __webpack_require__(147);
var pikaday_default = /*#__PURE__*/__webpack_require__.n(pikaday);

// CONCATENATED MODULE: ./src/assets/js/helpers.js



// Find ancestor element
// @param el - Child element
// @param sel - Parent element to looking for
var findAncestor = function findAncestor(el, sel) {
  return el.closest(sel);
}; // Add a leading zero to the day if needed
// @param d - The date object


function getRealDayFromDate(d) {
  var day = parse_int_default()(d.getDate(), 10);

  return (day < 10 ? "0" : "") + day;
} // Add +1 to the month from a given date and add a leading zero if needed
// @param m - The date object


function getRealMonthFromDate(m) {
  var month = parse_int_default()(m.getMonth(), 10) + 1;
  return (month < 10 ? "0" : "") + month;
} // Add a leading zero to a given int
// @param i - The int


function addLeadingZeroToInt(i) {
  return (i < 10 ? "0" : "") + i;
} // Get the offsetHeight of a given element


var getElementHeight = function getElementHeight(el) {
  return el.offsetHeight;
}; // PX to REM


var helpers_pxToRem = function pxToRem(nb) {
  return parse_float_default()(nb / 10);
};


// CONCATENATED MODULE: ./src/assets/js/events-calendar.js







 // Fake Events

var eventsDate = window.agenda_date_jaune; // Convert the date format to be readable by Pikaday

var eventsFormated = [];

if (eventsDate) {
  for_each_default()(eventsDate).call(eventsDate, function (event) {
    var splitDate = event.split("-");

    var year = parse_int_default()(splitDate[0], 10);

    var month = parse_int_default()(splitDate[1] - 1, 10); // Substract a month (month array start at 0)


    var day = parse_int_default()(splitDate[2], 10);

    eventsFormated.push(new Date(year, month, day).toDateString());
  });
} // Internationalization


var i18nFR = {
  previousMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  months: ["Janvier", "F&eacute;vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao&ucirc;t", "Septembre", "Octobre", "Novembre", "D&eacute;cembre"],
  weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
}; // Date format

var formatFR = "DD MM YYYY";

function nextEvent() {
  var todayButton = document.querySelector(".is-today button");
  var eventsButtons = document.querySelectorAll(".has-event button");
  var selected = false; // eslint-disable-next-line no-plusplus

  for (var i = 0; i < eventsButtons.length; i++) {
    if(eventsButtons[i].parentElement.classList.contains('is-outside-current-month')) {
      continue;
    }
    if (parse_int_default()(eventsButtons[i].innerHTML, 10) >= parse_int_default()(todayButton.innerHTML, 10)) {
      selected = eventsButtons[i];
      break; // Stop here, we found the first occurence
    }
  } // If there is no next events for this month, look for the next one


  if (selected === false) {
    var nextMonthEvents = document.querySelectorAll(".is-outside-current-month.has-event button");

    if (nextMonthEvents.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (var _i = 0; _i < nextMonthEvents.length; _i++) {
        selected = nextMonthEvents[_i];
        break; // Stop here, we found the first occurence
      }
    }
  }

  return selected;
} // Arrow Top position


var arrowPosition = function arrowPosition() {
  var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var arrow = document.querySelector(".events__arrow");
  var currentElement = false;

  if (init) {
    currentElement = nextEvent();
  } else {
    currentElement = document.querySelector(".is-selected .pika-button");
  } // Get the position of some elements


  var eventsRect = document.querySelector("#events-calendar").getBoundingClientRect();
  var gap = 40; // Calculated Gap

  var offset = 0;

  if (currentElement === false) {
    offset = gap;
  } else {
    var elemRect = currentElement.getBoundingClientRect();
    offset = elemRect.top - eventsRect.top + gap;
  }

  arrow.style.top = "".concat(offset, "px");
};

var events_calendar_eventPanel = function eventPanel(year, month, day) {
  var _context, _context2;

  var eventElement = document.querySelector(concat_default()(_context = concat_default()(_context2 = "[data-event-date=\"".concat(year, "-")).call(_context2, month, "-")).call(_context, day, "\"]"));

  if (eventElement) {
    // Hide the current Event
    var currentEvent = document.querySelector(".events__item--show");

    if (currentEvent) {
      currentEvent.classList.remove("events__item--show");
      currentEvent.setAttribute("aria-hidden", true);
    } // Show the selected event


    eventElement.classList.add("events__item--show");
    eventElement.setAttribute("aria-hidden", false);
    return true;
  }

  return false;
}; // Pikaday calendar and events


var events_calendar_eventsCalendar = function eventsCalendar(el) {
  var calendar = document.querySelector(el);

  if (calendar) {
    // Manage events
    var pikaSelect = function pikaSelect(date) {
      var dateFormatted = date.toDateString();
      var isEvent = index_of_default()(eventsFormated).call(eventsFormated, dateFormatted) !== -1;

      if (isEvent) {
        var _year = date.getFullYear();

        var _month = getRealMonthFromDate(date);

        var _day = getRealDayFromDate(date);

        if (events_calendar_eventPanel(_year, _month, _day)) {
          arrowPosition();
        }
      }
    }; // Init Pikaday calendar


    var picker = new pikaday_default.a({
      events: eventsFormated,
      i18n: i18nFR,
      format: formatFR,
      firstDay: 1,
      showDaysInNextAndPreviousMonths: true,
      enableSelectionDaysInNextAndPreviousMonths: true,
      onSelect: pikaSelect
    });
    calendar.parentNode.insertBefore(picker.el, calendar.nextSibling); // Init the arrow position

    arrowPosition(true); // Init - Show the next coming event
    // Get the next event panel

    var year;
    var month;
    var day;

    if (nextEvent()) {
      year = nextEvent().dataset.pikaYear;
      month = addLeadingZeroToInt(parse_int_default()(nextEvent().dataset.pikaMonth, 10) + 1);
      day = addLeadingZeroToInt(nextEvent().dataset.pikaDay);
      events_calendar_eventPanel(year, month, day);
    } else {
      // Search manually for a next event in the panel
      var eventsPanel = [];
      var closest = Infinity;
      var now = new Date();
      var eventsItem = document.querySelectorAll(".events__item"); // eslint-disable-next-line no-plusplus

      for (var i = 0; i < eventsItem.length; i++) {
        eventsPanel.push(eventsItem[i].dataset.eventDate);
      } // Find the closest event in the given list


      for_each_default()(eventsPanel).call(eventsPanel, function (d) {
        var date = new Date(d);

        if (date >= now && (date < new Date(closest) || date < closest)) {
          closest = d;
        }
      });

      if (closest !== Infinity) {
        var panelYear = closest.split("-")[0];
        var panelMonth = closest.split("-")[1];
        var panelDay = closest.split("-")[2];
        events_calendar_eventPanel(panelYear, panelMonth, panelDay);
      }
    }
  }
};

/* harmony default export */ var events_calendar = (events_calendar_eventsCalendar);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/array/from.js
var array_from = __webpack_require__(76);
var from_default = /*#__PURE__*/__webpack_require__.n(array_from);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/some.js
var some = __webpack_require__(148);
var some_default = /*#__PURE__*/__webpack_require__.n(some);

// CONCATENATED MODULE: ./node_modules/@accede-web/accordion/lib/index.js










/*eslint no-fallthrough: "off"*/
var callbackEvents = ['hide', 'show'];
var headersNodeNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
/**
 * Accordion constructor
 * @constructor
 * @param {Node} el - DOM node
 */

var lib_Accordion = /*#__PURE__*/function () {
  function Accordion(el) {
    var _context, _context2, _context3, _context4, _context5;

    classCallCheck_default()(this, Accordion);

    if (!el || !el.nodeName) {
      throw new Error('No DOM node provided. Abort.');
    }

    this.el = el;
    this.multiselectable = this.el.getAttribute('data-multiselectable') === 'true';
    this._accordion = {};
    this._callbacks = {};
    this._handleDisplay = bind_default()(_context = this._handleDisplay).call(_context, this);
    this._handleFocus = bind_default()(_context2 = this._handleFocus).call(_context2, this);
    this._handleHeaders = bind_default()(_context3 = this._handleHeaders).call(_context3, this);
    this._handlePanelFocus = bind_default()(_context4 = this._handlePanelFocus).call(_context4, this);
    this._handlePanel = bind_default()(_context5 = this._handlePanel).call(_context5, this);
  }
  /**
   * Retrieve first activable header (that does not have `disabled` attribute)
   */


  createClass_default()(Accordion, [{
    key: "_firstActiveHeader",
    value: function _firstActiveHeader() {
      var _context6;

      var activeHeaderIndex;

      some_default()(_context6 = this._accordion.headers).call(_context6, function (header, index) {
        if (!header.disabled) {
          activeHeaderIndex = index;
          return true;
        }
      });

      return activeHeaderIndex;
    }
    /**
     * Toggle display of the panel (show/hide)
     * @param {DOMEvent} e - Can be a `MouseEvent` or a `KeyboardEvent` object
     */

  }, {
    key: "_handleDisplay",
    value: function _handleDisplay(e) {
      var _context7;

      e.preventDefault();
      var header = e.currentTarget;

      if (header.disabled) {
        return;
      } // ensure the header has the focus when a click occurs


      if (header !== document.activeElement) {
        header.focus();
      }

      this._toggleDisplay(index_of_default()(_context7 = this._accordion.headers).call(_context7, header));
    }
    /**
     * Update the current header index before selecting the current panel
     * @param {DOMEvent} e - A `FocusEvent` object
     */

  }, {
    key: "_handleFocus",
    value: function _handleFocus(e) {
      var _context8;

      var header = e.currentTarget;

      if (header.disabled) {
        return;
      }

      this._accordion.currentIndex = index_of_default()(_context8 = this._accordion.headers).call(_context8, header);
    }
    /**
     * Handle keystroke on [role=panel]
     * @param {DOMEvent} e - A `KeyboardEvent` object
     */

  }, {
    key: "_handlePanel",
    value: function _handlePanel(e) {
      if (this._accordion.currentIndex === undefined) {
        this._handlePanelFocus(e);
      }

      switch (e.keyCode) {
        // ctrl + page up
        case 33:
          if (e.ctrlKey) {
            e.preventDefault(); // focus the previous header

            this._switchPanel(this._accordion.currentIndex - 1);
          }

          break;
        // ctrl + page down

        case 34:
          if (e.ctrlKey) {
            e.preventDefault(); // focus the next header

            this._switchPanel(this._accordion.currentIndex + 1);
          }

          break;
        // focus back to header
        // ctrl + up

        case 38:
          if (e.ctrlKey) {
            e.preventDefault(); // focus linked header

            this._switchPanel(this._accordion.currentIndex);
          }

          break;
      }
    }
    /**
     * Ensure that the current header index is the one matching the panel
     * @param {DOMEvent} e - A `FocusEvent` or `KeyboardEvent` object
     */

  }, {
    key: "_handlePanelFocus",
    value: function _handlePanelFocus(e) {
      var _context9, _context10;

      if (e.target.doubleFocus) {
        e.preventDefault();
        delete e.target.doubleFocus;
        return;
      }

      var panel = e.currentTarget;
      this._accordion.currentIndex = index_of_default()(_context9 = this._accordion.panels).call(_context9, panel); // prevent double focus event when the inputs are focused

      if (index_of_default()(_context10 = ['radio', 'checkbox']).call(_context10, e.target.type) >= 0) {
        e.target.doubleFocus = true;
      }
    }
    /**
     * Handle keystroke on [role=tab]
     * @param {DOMEvent} e - A `KeyboardEvent` object
     */

  }, {
    key: "_handleHeaders",
    value: function _handleHeaders(e) {
      if (this._accordion.currentIndex === undefined) {
        this._handleFocus(e);
      }

      switch (e.keyCode) {
        // space
        case 32: // return

        case 13:
          // toggle the display of the linked panel
          this._handleDisplay(e);

          break;
        // end

        case 35:
          e.preventDefault(); // focus the last header

          this._switchPanel(this._accordion.headers.length - 1);

          break;
        // home

        case 36:
          e.preventDefault(); // focus the first active header

          this._switchPanel(this._firstActiveHeader());

          break;
        // left

        case 37: // up

        case 38:
          e.preventDefault(); // focus the previous header

          this._switchPanel(this._accordion.currentIndex - 1);

          break;
        // right

        case 39: // down

        case 40:
          e.preventDefault(); // focus the next header

          this._switchPanel(this._accordion.currentIndex + 1);

          break;
      }
    }
    /**
     * Dummy function
     */

  }, {
    key: "_noop",
    value: function _noop() {}
    /**
     * Move the focus to the header based on the index
     * @param {number} index - Index of the element to focus
     */

  }, {
    key: "_switchPanel",
    value: function _switchPanel(index) {
      // handle disabled header
      if (this._accordion.headers[index] && this._accordion.headers[index].disabled) {
        // cycling forward? Then go one item further
        var newIndex = index > this._accordion.currentIndex ? index + 1 : index - 1;

        this._switchPanel(newIndex);

        return;
      }

      var firstActiveHeader = this._firstActiveHeader();

      if (index < firstActiveHeader) {
        this._accordion.currentIndex = this._accordion.headersLength - 1;
      } else if (index >= this._accordion.headersLength) {
        this._accordion.currentIndex = firstActiveHeader;
      } else {
        this._accordion.currentIndex = index;
      }

      this._accordion.headers[this._accordion.currentIndex].focus();
    }
    /**
     * Toggle the `aria-expanded` attribute on the header based on the passed index
     * @param {integer} index - index of the panel
     * @param {boolean} show - whether or not display the panel
     */

  }, {
    key: "_toggleDisplay",
    value: function _toggleDisplay(index, show) {
      var header = this._accordion.headers[index];
      var panel = this._accordion.panels[index];
      var headerDisplayed = header.getAttribute('aria-expanded') === 'true';

      if (show === undefined) {
        show = header.getAttribute('aria-expanded') === 'false';
      }

      if (show && headerDisplayed || !show && !headerDisplayed) {
        return;
      } // close the previous header if the accordion doesn't allow multiple panels open


      if (show && !this.multiselectable && this._accordion.openedIndexes[0] !== undefined) {
        this._toggleDisplay(this._accordion.openedIndexes[0], false);
      }

      header.setAttribute('aria-expanded', show);
      panel.setAttribute('aria-hidden', !show);

      if (show) {
        this._accordion.openedIndexes.push(index);

        this._trigger('show', [header, panel]);
      } else {
        var _context11, _context12;

        // remove the panel from the list of opened ones
        splice_default()(_context11 = this._accordion.openedIndexes).call(_context11, index_of_default()(_context12 = this._accordion.openedIndexes).call(_context12, index), 1);

        this._trigger('hide', [header, panel]);
      }
    }
  }, {
    key: "_trigger",
    value: function _trigger(eventName, params) {
      var _context13,
          _this = this;

      if (!this._callbacks[eventName]) {
        return;
      }

      for_each_default()(_context13 = this._callbacks[eventName]).call(_context13, function (callback) {
        callback.apply(_this, params);
      });
    }
  }, {
    key: "closeAll",
    value: function closeAll() {
      var _context14,
          _this2 = this;

      for_each_default()(_context14 = this._accordion.panels).call(_context14, function (panel, index) {
        _this2._toggleDisplay(index, false);
      });
    }
  }, {
    key: "close",
    value: function close(panel) {
      var _context15;

      var index = index_of_default()(_context15 = this._accordion.panels).call(_context15, panel);

      this._toggleDisplay(index, false);
    }
    /**
     * Parse the accordion children to setup the headers and panels elements
     */

  }, {
    key: "mount",
    value: function mount() {
      var _context16,
          _this3 = this;

      // create reference arrays
      this._accordion.headers = [];
      this._accordion.panels = [];
      this._accordion.openedIndexes = []; // loop on each headers elements to find panel elements and update their attributes

      for_each_default()(_context16 = from_default()(this.el.children)).call(_context16, function (header, index) {
        var isHeader = index_of_default()(headersNodeNames).call(headersNodeNames, header.nodeName) > -1; // skip non header child

        if (!isHeader && header.getAttribute('role') !== 'heading' && !header.hasAttribute('aria-level')) {
          return;
        } // set the header to be the button actioning the panel


        header = header.querySelector('button[aria-controls], button[data-controls], [role="button"][aria-controls], [role="button"][data-controls]');

        if (!header) {
          return;
        }

        var id = header.getAttribute('aria-controls') || header.getAttribute('data-controls');
        var panel = document.getElementById(id);
        var openedTab = false;

        if (!panel) {
          throw new Error("Could not find associated panel for header ".concat(header.id, ". Use [aria-controls=\"panelId\"] or [data-controls=\"panelId\"] on the [role=\"header\"] element to link them together"));
        } // store the header and the panel on their respective arrays on the headerlist


        _this3._accordion.headers.push(header);

        _this3._accordion.panels.push(panel);

        header.disabled = header.hasAttribute('disabled') || header.getAttribute('aria-disabled') === 'true';

        if (header.getAttribute('data-expand') === 'true' && !header.disabled) {
          if (_this3.multiselectable || !_this3.multiselectable && !_this3._accordion.openedIndexes.length) {
            _this3._toggleDisplay(_this3._accordion.headers.length - 1, true);

            openedTab = true;
          }
        } // remove setup data attributes


        header.removeAttribute('data-expand'); // set the attributes according the the openedTab status

        header.setAttribute('tabindex', 0);
        header.setAttribute('aria-expanded', openedTab);
        panel.setAttribute('aria-hidden', !openedTab); // subscribe internal events for header and panel

        header.addEventListener('click', _this3._handleDisplay);
        header.addEventListener('focus', _this3._handleFocus);
        header.addEventListener('keydown', _this3._handleHeaders);
        panel.addEventListener('focus', _this3._handlePanelFocus, true);
        panel.addEventListener('keydown', _this3._handlePanel);
      }); // store constants


      this._accordion.headersLength = this._accordion.headers.length;
      this._accordion.panelsLength = this._accordion.panels.length;
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      var _context17, _context18;

      if (!this._callbacks[event]) {
        return;
      }

      var callbackIndex = index_of_default()(_context17 = this._callbacks[event]).call(_context17, callback);

      if (callbackIndex < 0) {
        return;
      }

      splice_default()(_context18 = this._callbacks[event]).call(_context18, callbackIndex, 1);
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      if (index_of_default()(callbackEvents).call(callbackEvents, event) < 0) {
        return;
      }

      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }

      this._callbacks[event].push(callback);
    }
  }, {
    key: "openAll",
    value: function openAll() {
      var _context19,
          _this4 = this;

      if (!this.multiselectable) {
        return;
      }

      for_each_default()(_context19 = this._accordion.panels).call(_context19, function (panel, index) {
        _this4._toggleDisplay(index, true);
      });
    }
  }, {
    key: "open",
    value: function open(panel) {
      var _context20;

      var index = index_of_default()(_context20 = this._accordion.panels).call(_context20, panel);

      this._toggleDisplay(index, true);
    }
    /**
     * Returns an array of opened panels
     */

  }, {
    key: "unmount",

    /**
     * unbind accordion
     */
    value: function unmount() {
      var _context21,
          _this5 = this;

      for_each_default()(_context21 = this._accordion.headers).call(_context21, function (header, index) {
        var panel = _this5._accordion.panels[index]; // unsubscribe internal events for header and panel

        header.removeEventListener('click', _this5._handleDisplay);
        header.removeEventListener('focus', _this5._handleFocus);
        header.removeEventListener('keydown', _this5._handleHeaders);
        header.removeAttribute('tabindex');
        header.removeAttribute('aria-expanded');
        panel.removeEventListener('focus', _this5._handlePanelFocus, true);
        panel.removeEventListener('keydown', _this5._handlePanel);
        panel.setAttribute('aria-hidden', 'false');
      });
    }
  }, {
    key: "current",
    get: function get() {
      var _context22,
          _this6 = this;

      return map_default()(_context22 = this._accordion.openedIndexes).call(_context22, function (index) {
        return {
          header: _this6._accordion.headers[index],
          panel: _this6._accordion.panels[index]
        };
      });
    }
  }]);

  return Accordion;
}();

/* harmony default export */ var lib = (lib_Accordion);
// CONCATENATED MODULE: ./src/assets/js/menu-accordion.js






function getHeight(panel) {
  var el = panel;
  el.style.display = "block";
  el.style.height = "auto";
  var realClientHeight = Math.max(el.scrollHeight, el.offsetHeight, el.clientHeight, el.scrollHeight, el.offsetHeight);
  el.panelHeight = realClientHeight;
  el.removeAttribute("style");
}

function handleClose(header, panel) {
  var el = panel;
  getHeight(el);
  el.style.display = "block";
  el.style.height = [el.panelHeight / 16, "rem"].join("");
  window.requestAnimationFrame(function () {
    el.classList.remove("open");
    el.style.height = 0;
    window.setTimeout(function () {
      el.removeAttribute("style");
    }, 200);
  });
}

function handleOpen(header, panel) {
  var el = panel;
  getHeight(el);
  el.style.display = "block";
  el.style.height = 0;
  window.requestAnimationFrame(function () {
    el.style.height = [el.panelHeight / 16, "rem"].join("");
    el.classList.add("open");
    window.setTimeout(function () {
      el.removeAttribute("style");
    }, 200);
  });
}

var menu_accordion_menuAccordion = function menuAccordion() {
  var lists = slice_default()(Array.prototype).call(document.querySelectorAll(".menu-accordion"));

  for_each_default()(lists).call(lists, function (list) {
    var accordion = new lib(list);
    accordion.on("show", handleOpen);
    accordion.on("hide", handleClose);
    accordion.mount(); // Close all Accordion panel when the off-canvas menu is closed

    var toggleOffCanvas = document.querySelector("#toggle-menu");
    toggleOffCanvas.addEventListener("click", function () {
      if (toggleOffCanvas.classList.contains("is-active")) {
        set_timeout_default()(function () {
          accordion.closeAll();
        }, 1000);
      }
    });
  });
};

/* harmony default export */ var menu_accordion = (menu_accordion_menuAccordion);
// CONCATENATED MODULE: ./node_modules/@accede-web/tablist/lib/index.js








/*eslint no-fallthrough: "off"*/
var lib_callbackEvents = ['hide', 'show'];
/**
 * Tablist constructor
 * @constructor
 * @param {Node} el - DOM node
 */

var lib_Tablist = /*#__PURE__*/function () {
  function Tablist(el) {
    var _context, _context2, _context3, _context4, _context5;

    classCallCheck_default()(this, Tablist);

    if (!el || !el.nodeName) {
      throw new Error('No DOM node provided. Abort.');
    }

    this.el = el;
    this._tablist = {};
    this._callbacks = {};
    this._handleDisplay = bind_default()(_context = this._handleDisplay).call(_context, this);
    this._handleFocus = bind_default()(_context2 = this._handleFocus).call(_context2, this);
    this._handleTab = bind_default()(_context3 = this._handleTab).call(_context3, this);
    this._handlePanelFocus = bind_default()(_context4 = this._handlePanelFocus).call(_context4, this);
    this._handlePanel = bind_default()(_context5 = this._handlePanel).call(_context5, this);
  }
  /**
   * Retrieve first activable tab (that does not have `disabled` attribute)
   */


  createClass_default()(Tablist, [{
    key: "_firstActiveTab",
    value: function _firstActiveTab() {
      var activeTab;

      for (var i = 0; i < this._tablist.tabs.length; i++) {
        if (!this._tablist.tabs[i].disabled) {
          activeTab = i;
          break;
        }
      }

      return activeTab;
    }
    /**
     * Toggle display of the tabPanel (show/hide)
     * @param {DOMEvent} e - Can be a `MouseEvent` or a `KeyboardEvent` object
     */

  }, {
    key: "_handleDisplay",
    value: function _handleDisplay(e) {
      var _context6;

      e.preventDefault();
      var tab = e.currentTarget;

      if (tab.disabled) {
        return;
      } // ensure the tab has the focus when a click occurs


      if (tab !== document.activeElement) {
        tab.focus();
      }

      this._toggleDisplay(index_of_default()(_context6 = this._tablist.tabs).call(_context6, tab));
    }
    /**
     * Update the current tab index before selecting the current tab
     * @param {DOMEvent} e - A `FocusEvent` object
     */

  }, {
    key: "_handleFocus",
    value: function _handleFocus(e) {
      var _context7;

      var tab = e.currentTarget;

      if (tab.disabled) {
        return;
      }

      this._tablist.currentTabIndex = index_of_default()(_context7 = this._tablist.tabs).call(_context7, tab);

      this._select(this._tablist.tabs[this._tablist.currentTabIndex]);
    }
    /**
     * Handle keystroke on [role=tabpanel]
     * @param {DOMEvent} e - A `KeyboardEvent` object
     */

  }, {
    key: "_handlePanel",
    value: function _handlePanel(e) {
      if (this._tablist.currentTabIndex === undefined) {
        this._handlePanelFocus(e);
      }

      switch (e.keyCode) {
        // ctrl + page up
        case 33:
          if (e.ctrlKey) {
            e.preventDefault(); // focus the previous tab

            this._switchTab(this._tablist.currentTabIndex - 1);
          }

          break;
        // ctrl + page down

        case 34:
          if (e.ctrlKey) {
            e.preventDefault(); // focus the next tab

            this._switchTab(this._tablist.currentTabIndex + 1);
          }

          break;
        // focus back to tab
        // ctrl + up

        case 38:
          if (e.ctrlKey) {
            e.preventDefault(); // focus linked tab

            this._switchTab(this._tablist.currentTabIndex);
          }

          break;
      }
    }
    /**
     * Ensure that the current tab index is the one matching the tabPanel
     * @param {DOMEvent} e - A `FocusEvent` or `KeyboardEvent` object
     */

  }, {
    key: "_handlePanelFocus",
    value: function _handlePanelFocus(e) {
      var _context8, _context9;

      if (e.target.doubleFocus) {
        e.preventDefault();
        delete e.target.doubleFocus;
        return;
      }

      var tabPanel = e.currentTarget;
      this._tablist.currentTabIndex = index_of_default()(_context8 = this._tablist.tabPanels).call(_context8, tabPanel); // prevent double focus event when the inputs are focused

      if (index_of_default()(_context9 = ['radio', 'checkbox']).call(_context9, e.target.type) >= 0) {
        e.target.doubleFocus = true;
      }
    }
    /**
     * Handle keystroke on [role=tab]
     * @param {DOMEvent} e - A `KeyboardEvent` object
     */

  }, {
    key: "_handleTab",
    value: function _handleTab(e) {
      if (this._tablist.currentTabIndex === undefined) {
        this._handleFocus(e);
      }

      switch (e.keyCode) {
        // space
        case 32: // return

        case 13:
          // toggle the display of the linked tabpanel
          this._handleDisplay(e);

          break;
        // end

        case 35:
          e.preventDefault(); // focus the last tab

          this._switchTab(this._tablist.tabs.length - 1);

          break;
        // home

        case 36:
          e.preventDefault(); // focus the first active tab

          this._switchTab(this._firstActiveTab());

          break;
        // left

        case 37: // up

        case 38:
          e.preventDefault(); // focus the previous tab

          this._switchTab(this._tablist.currentTabIndex - 1);

          break;
        // right

        case 39: // down

        case 40:
          e.preventDefault(); // focus the next tab

          this._switchTab(this._tablist.currentTabIndex + 1);

          break;
      }
    }
    /**
     * Dummy function
     */

  }, {
    key: "_noop",
    value: function _noop() {}
    /**
     * Update tab selected attributes (`aria-selected`, `tabindex`)
     * based on the `tabToSelect` attribute
     * @param {DOMElement} tabToSelect - Tab element to select
     */

  }, {
    key: "_select",
    value: function _select(tabToSelect) {
      var _context10,
          _this = this;

      // loop on each tab
      for_each_default()(_context10 = this._tablist.tabs).call(_context10, function (tab, index) {
        var shouldSelect = tabToSelect === tab;
        tab.setAttribute('aria-selected', shouldSelect);
        tab.setAttribute('tabindex', shouldSelect ? 0 : -1); // only for tab to be selected

        if (shouldSelect) {
          _this._toggleDisplay(index);
        }
      });
    }
    /**
     * Move the focus to the tab based on the index
     * @param {number} index - Index of the element to focus
     */

  }, {
    key: "_switchTab",
    value: function _switchTab(index) {
      // handle disabled tab
      if (this._tablist.tabs[index] && this._tablist.tabs[index].disabled) {
        // cycling forward? Then go one item farther
        var newIndex = index > this._tablist.currentTabIndex ? index + 1 : index - 1;

        this._switchTab(newIndex);

        return;
      }

      this._tablist.currentTabIndex = index;

      if (this._tablist.currentTabIndex < this._firstActiveTab()) {
        this._tablist.currentTabIndex = this._tablist.tabsLength - 1;
      } else if (this._tablist.currentTabIndex >= this._tablist.tabsLength) {
        this._tablist.currentTabIndex = this._firstActiveTab();
      }

      this._tablist.tabs[this._tablist.currentTabIndex].focus();
    }
    /**
     * Toggle the `aria-hidden` attribute on the tabpanel based on the passed tab
     * @param {integer} index - index of the tab
     * @param {boolean} show - whether or not display the panel
     */

  }, {
    key: "_toggleDisplay",
    value: function _toggleDisplay(index) {
      var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (show && index === this._tablist.openedIndex) {
        return;
      }

      var tab = this._tablist.tabs[index];
      var tabPanel = this._tablist.tabPanels[index]; // close the previous tab

      if (show && this._tablist.openedIndex !== undefined) {
        this._toggleDisplay(this._tablist.openedIndex, false);
      }

      tabPanel.setAttribute('aria-hidden', !show);

      if (show) {
        this._tablist.openedIndex = index;

        if (this._tablist.openedIndex !== undefined) {
          this._trigger('show', [tab, tabPanel]);
        }
      } else if (this._tablist.openedIndex !== undefined) {
        this._trigger('hide', [tab, tabPanel]);
      }
    }
  }, {
    key: "_trigger",
    value: function _trigger(eventName, params) {
      var _context11,
          _this2 = this;

      if (!this._callbacks[eventName]) {
        return;
      }

      for_each_default()(_context11 = this._callbacks[eventName]).call(_context11, function (callback) {
        callback.apply(_this2, params);
      });
    }
    /**
     * Parse tablist element to setup the tab and tabpanel elements
     */

  }, {
    key: "mount",
    value: function mount() {
      var _context12,
          _this3 = this;

      var firstTabIndex; // create reference arrays

      this._tablist.tabs = [];
      this._tablist.tabPanels = []; // loop on each tab elements to find tabpanel elements and update their attributes

      for_each_default()(_context12 = from_default()(this.el.querySelectorAll('[role=tab]'))).call(_context12, function (tab, index) {
        var controls = tab.getAttribute('aria-controls');
        var tabPanel;
        var openedTab = false; // get the tabpanel linked to the tab element

        if (controls) {
          tabPanel = document.getElementById(controls);
        } else if (tab.nextElementSibling && tab.nextElementSibling.getAttribute('aria-labelledby') === tab.id) {
          tabPanel = tab.nextElementSibling;
        }

        if (!tabPanel) {
          throw new Error("Could not find associated tabpanel for tab ".concat(tab.id, ". Use [aria-controls=\"tabpanelId\"] on the [role=\"tab\"] element to link them together"));
        } // store the tab and the tabpanel on their respective arrays on the tablist


        _this3._tablist.tabs.push(tab);

        _this3._tablist.tabPanels.push(tabPanel);

        tab.disabled = tab.hasAttribute('disabled') || tab.getAttribute('aria-disabled') === 'true'; // if there's no opened tab yet

        if (tab.getAttribute('data-open') === 'true' && !tab.disabled) {
          if (_this3._tablist.openedIndex === undefined) {
            _this3._toggleDisplay(index, true);

            openedTab = true;
          }
        } // remove setup data attributes


        tab.removeAttribute('data-open'); // get first non-disabled tab

        if (firstTabIndex === undefined && !tab.disabled) {
          firstTabIndex = index;
        } // set the attributes according the the openedTab status


        tab.setAttribute('tabindex', -1);
        tabPanel.setAttribute('aria-hidden', !openedTab); // subscribe internal events for tab and tap panel

        tab.addEventListener('click', _this3._handleDisplay);
        tab.addEventListener('focus', _this3._handleFocus);
        tab.addEventListener('keydown', _this3._handleTab);
        tabPanel.addEventListener('focus', _this3._handlePanelFocus, true);
        tabPanel.addEventListener('keydown', _this3._handlePanel);
      }); // store constants


      this._tablist.tabsLength = this._tablist.tabs.length;
      this._tablist.tabPanelsLength = this._tablist.tabPanels.length; // set the tabindex so the first opened tab or the first non-disabled tab can be focused on tab navigation

      if (this._tablist.openedIndex !== undefined) {
        this._tablist.tabs[this._tablist.openedIndex].setAttribute('tabindex', 0);

        this._tablist.tabs[this._tablist.openedIndex].setAttribute('aria-selected', 'true');
      } // if there's no opened tab and it's not an accordion open the first tab
      else {
          this._toggleDisplay(firstTabIndex, true);

          this._tablist.tabs[firstTabIndex].setAttribute('tabindex', 0);

          this._tablist.tabs[firstTabIndex].setAttribute('aria-selected', 'true');
        }
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      var _context13, _context14;

      if (!this._callbacks[event]) {
        return;
      }

      var callbackIndex = index_of_default()(_context13 = this._callbacks[event]).call(_context13, callback);

      if (callbackIndex < 0) {
        return;
      }

      splice_default()(_context14 = this._callbacks[event]).call(_context14, callbackIndex, 1);
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      if (index_of_default()(lib_callbackEvents).call(lib_callbackEvents, event) < 0) {
        return;
      }

      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }

      this._callbacks[event].push(callback);
    }
    /**
     * Returns the opened tab or array of opened tabs
     */

  }, {
    key: "unmount",

    /**
     * unbind tablist
     */
    value: function unmount() {
      var _context15,
          _this4 = this;

      for_each_default()(_context15 = this._tablist.tabs).call(_context15, function (tab, index) {
        var tabPanel = _this4._tablist.tabPanels[index]; // unsubscribe internal events for tab and tap panel

        tab.removeEventListener('click', _this4._handleDisplay);
        tab.removeEventListener('focus', _this4._handleFocus);
        tab.removeEventListener('keydown', _this4._handleTab);
        tab.removeAttribute('tabindex');
        tab.removeAttribute('aria-selected');
        tabPanel.removeEventListener('focus', _this4._handlePanelFocus, true);
        tabPanel.removeEventListener('keydown', _this4._handlePanel);
        tabPanel.setAttribute('aria-hidden', 'false');
      });

      this._tablist = {};
    }
  }, {
    key: "current",
    get: function get() {
      var tab = this._tablist.tabs[this._tablist.openedIndex];
      var tabPanel = this._tablist.tabPanels[this._tablist.openedIndex];
      return {
        tab: tab,
        tabPanel: tabPanel
      };
    }
  }]);

  return Tablist;
}();

/* harmony default export */ var tablist_lib = (lib_Tablist);
// CONCATENATED MODULE: ./src/assets/js/tablist.js


 // Advantages Detail

var tablist_advantagesTab = function advantagesTab(el) {
  var tabContainer = document.querySelector(el);

  if (tabContainer) {
    var classTab = "tab-enabled";
    var classAccordion = "accordion-enabled"; // Set tab by default

    var tablist = new tablist_lib(tabContainer);
    tablist.mount(); // Prepare accordion to be mounted

    var accordionContainer = document.querySelector(".events-infos__panel");
    var accordion = new lib(accordionContainer);

    var accordionMount = function accordionMount() {
      // Check if the button exist before creating new one
      var toggleButton = document.querySelectorAll(".events-infos__toggle");

      if (toggleButton.length === 0) {
        var tabTitle = document.querySelectorAll(".events-infos__tab");

        for_each_default()(tabTitle).call(tabTitle, function (title, i) {
          var id = title.getAttribute("aria-controls");
          var content = title.innerHTML;
          var panel = document.getElementById(id);
          var toggleId = "toggle-".concat(i + 1); // Create the buttons

          var newTitle = document.createElement("h3");
          newTitle.classList.add("events-infos__toggle");
          var newTitleBtn = newTitle.appendChild(document.createElement("button"));
          newTitleBtn.setAttribute("id", toggleId);
          newTitleBtn.setAttribute("aria-controls", id);
          newTitleBtn.setAttribute("type", "button");
          newTitleBtn.appendChild(document.createTextNode(content)); // Edit the panel

          panel.setAttribute("aria-labelledBy", toggleId);
          panel.removeAttribute("role"); // Append the button to its panel

          panel.parentNode.insertBefore(newTitle, panel);
        }); // Mount accordion


        accordion.mount();
      } else {
        // Accordion elements already created, just show them
        for_each_default()(toggleButton).call(toggleButton, function (btn) {
          btn.classList.remove("is-hidden");
        });

        var tabItem = document.querySelectorAll(".events-infos__item");

        for_each_default()(tabItem).call(tabItem, function (tab) {
          tab.setAttribute("aria-hidden", "true");
          tab.removeAttribute("role");
        });

        accordion.mount();
      }
    };

    var accordionUnmount = function accordionUnmount() {
      // Check if the button exist before creating new one
      var toggleButton = document.querySelectorAll(".events-infos__toggle");

      if (toggleButton.length > 0) {
        for_each_default()(toggleButton).call(toggleButton, function (btn) {
          btn.classList.add("is-hidden");
        });

        var tabItem = document.querySelectorAll(".events-infos__item");

        for_each_default()(tabItem).call(tabItem, function (tab) {
          tab.setAttribute("role", "tabpanel");
        }); // Unmount accordion


        accordion.unmount();
      }
    };

    var TabOrAccordion = function TabOrAccordion() {
      if (window.innerWidth <= 768) {
        // unmount the tablist
        // and mount the accordion
        if (tabContainer.classList.contains(classTab)) {
          tabContainer.classList.add(classAccordion);
          tabContainer.classList.remove(classTab);
          tablist.unmount();
          accordionMount();
        }
      } else {
        // mount the tablist
        // and unmount the accordion
        // eslint-disable-next-line no-lonely-if
        if (tabContainer.classList.contains(classAccordion)) {
          tabContainer.classList.add(classTab);
          tabContainer.classList.remove(classAccordion);
          accordionUnmount();
          tablist.mount();
        }
      }
    }; // eslint-disable-next-line no-multi-assign


    window.onload = window.onresize = TabOrAccordion;
  }
}; // Advantages Detail


var tablist_announceTab = function announceTab(el) {
  var tabContainer = document.querySelector(el);

  if (tabContainer) {
    var classTab = "tab-enabled";
    var classAccordion = "accordion-enabled"; // Set tab by default

    var tablist = new tablist_lib(tabContainer);
    tablist.mount(); // Prepare accordion to be mounted

    var accordionContainer = document.querySelector(".ad-infos__panel");
    var accordion = new lib(accordionContainer);

    var accordionMount = function accordionMount() {
      // Check if the button exist before creating new one
      var toggleButton = document.querySelectorAll(".ad-infos__toggle");

      if (toggleButton.length === 0) {
        var tabTitle = document.querySelectorAll(".ad-infos__tab");

        for_each_default()(tabTitle).call(tabTitle, function (title, i) {
          var id = title.getAttribute("aria-controls");
          var content = title.innerHTML;
          var panel = document.getElementById(id);
          var toggleId = "toggle-".concat(i + 1); // Create the buttons

          var newTitle = document.createElement("h3");
          newTitle.classList.add("ad-infos__toggle");
          var newTitleBtn = newTitle.appendChild(document.createElement("button"));
          newTitleBtn.setAttribute("id", toggleId);
          newTitleBtn.setAttribute("aria-controls", id);
          newTitleBtn.setAttribute("type", "button");
          newTitleBtn.appendChild(document.createTextNode(content)); // Edit the panel

          panel.setAttribute("aria-labelledBy", toggleId);
          panel.removeAttribute("role"); // Append the button to its panel

          panel.parentNode.insertBefore(newTitle, panel);
        }); // Mount accordion


        accordion.mount();
        var firstPanel = document.querySelector("#tab-1");
        accordion.open(firstPanel);
      } else {
        // Accordion elements already created, just show them
        for_each_default()(toggleButton).call(toggleButton, function (btn) {
          btn.classList.remove("is-hidden");
        });

        var tabItem = document.querySelectorAll(".ad-infos__item");

        for_each_default()(tabItem).call(tabItem, function (tab) {
          tab.setAttribute("aria-hidden", "true");
          tab.removeAttribute("role");
        });

        accordion.mount();

        var _firstPanel = document.querySelector("#tab-1");

        accordion.open(_firstPanel);
      }
    };

    var accordionUnmount = function accordionUnmount() {
      // Check if the button exist before creating new one
      var toggleButton = document.querySelectorAll(".ad-infos__toggle");

      if (toggleButton.length > 0) {
        for_each_default()(toggleButton).call(toggleButton, function (btn) {
          btn.classList.add("is-hidden");
        });

        var tabItem = document.querySelectorAll(".ad-infos__item");

        for_each_default()(tabItem).call(tabItem, function (tab) {
          tab.setAttribute("role", "tabpanel");
        }); // Unmount accordion


        accordion.unmount();
      }
    };

    var TabOrAccordion = function TabOrAccordion() {
      if (window.innerWidth <= 768) {
        // unmount the tablist
        // and mount the accordion
        if (tabContainer.classList.contains(classTab)) {
          tabContainer.classList.add(classAccordion);
          tabContainer.classList.remove(classTab);
          tablist.unmount();
          accordionMount();
        }
      } else {
        // mount the tablist
        // and unmount the accordion
        // eslint-disable-next-line no-lonely-if
        if (tabContainer.classList.contains(classAccordion)) {
          tabContainer.classList.add(classTab);
          tabContainer.classList.remove(classAccordion);
          accordionUnmount();
          tablist.mount();
        }
      }
    }; // eslint-disable-next-line no-multi-assign


    window.onload = window.onresize = TabOrAccordion;
  }
};


// CONCATENATED MODULE: ./src/assets/js/toggle-password-visibility.js

 // Toggle Password visibility

var toggle_password_visibility_togglePassword = function togglePassword(el) {
  var buttons = document.querySelectorAll(el);

  for_each_default()(buttons).call(buttons, function (button) {
    // Get on and off title attribute
    var buttonTitle = button.title;
    var buttonTitleAlt = button.dataset.titleAlt; // Default button state - Set to off

    if (!button.classList.contains("toggle-password--off")) {
      button.classList.add("toggle-password--off");
    } // Find the associated input field


    var ancestorItem = findAncestor(button, ".form-group__input--password");
    var input = ancestorItem.querySelector(".form-input");

    if (input) {
      // Default input type - Set it to password
      if (input.type !== "password") {
        input.type = "password";
      }

      button.addEventListener("click", function () {
        // Toggle input type
        if (input.type === "password") {
          input.type = "text";
        } else {
          input.type = "password";
        } // Toggle button State


        if (button.classList.contains("toggle-password--off")) {
          button.classList.remove("toggle-password--off");
          button.classList.add("toggle-password--on");
          button.setAttribute("title", buttonTitleAlt);
        } else {
          button.classList.remove("toggle-password--on");
          button.classList.add("toggle-password--off");
          button.setAttribute("title", buttonTitle);
        }
      });
    }
  });
};

/* harmony default export */ var toggle_password_visibility = (toggle_password_visibility_togglePassword);
// CONCATENATED MODULE: ./src/assets/js/input-icon-label.js

 // Icon give focus on associated input field

var input_icon_label_inputIconLabel = function inputIconLabel(el) {
  var iconLabels = document.querySelectorAll(el);

  for_each_default()(iconLabels).call(iconLabels, function (iconLabel) {
    // Find the associated input
    var ancestor = findAncestor(iconLabel, ".form-group__input");
    var input = ancestor.querySelector(".form-input");

    if (input) {
      iconLabel.addEventListener("click", function () {
        input.focus();
      });
    }
  });
};

/* harmony default export */ var input_icon_label = (input_icon_label_inputIconLabel);
// CONCATENATED MODULE: ./src/assets/js/toggle-filters.js

 // Toggle advanced search filters

var toggle_filters_advancedFilters = function advancedFilters(el) {
  var buttons = document.querySelectorAll(el);
  var controllerOn = "toggle-controller--on";
  var controllerOff = "toggle-controller--off";
  var panelOn = "toggle-panel--on";
  var panelOff = "toggle-panel--off";

  for_each_default()(buttons).call(buttons, function (e) {
    var button = e; // Get on and off title attribute

    var buttonText = button.querySelector(".btn__text");
    var buttonTitle = buttonText.innerHTML;
    var buttonValueAlt = button.dataset.valueAlt;
    var buttonControls = button.dataset.controls; // Default button state - Set to off

    if (!button.classList.contains(controllerOff)) {
      button.classList.add(controllerOff);
      button.setAttribute("aria-expanded", false);
    } // Find the associated search filters container


    var ancestor = findAncestor(button, ".filters-bar");
    var filters = document.querySelector("#".concat(buttonControls));

    if (filters) {
      // Default filters container state - Set to off
      if (!filters.classList.contains(panelOff)) {
        filters.classList.add(panelOff);
        filters.setAttribute("data-hidden", true);
      }

      button.addEventListener("click", function () {
        // Toggle filters container state
        if (filters.classList.contains(panelOff)) {
          filters.classList.remove(panelOff);
          filters.classList.add(panelOn);
          filters.setAttribute("data-hidden", true);
          ancestor.classList.remove("filters-bar--off");
          ancestor.classList.add("filters-bar--on");
        } else {
          filters.classList.remove(panelOn);
          filters.classList.add(panelOff);
          filters.setAttribute("data-hidden", false);
          ancestor.classList.remove("filters-bar--on");
          ancestor.classList.add("filters-bar--off");
        } // Toggle button State


        if (button.classList.contains(controllerOff)) {
          button.classList.remove(controllerOff);
          button.classList.add(controllerOn);
          buttonText.innerHTML = buttonValueAlt;
          button.setAttribute("aria-expanded", true);
        } else {
          button.classList.remove(controllerOn);
          button.classList.add(controllerOff);
          buttonText.innerHTML = buttonTitle;
          button.setAttribute("aria-expanded", false);
        }
      });
    }
  });
};

var simpleFilters = function simpleFilters(btn, el) {
  var button = document.querySelector(btn);
  var panel = document.querySelector(el);
  var isActiveClass = "is-active";
  var controllerOffClass = "toggle-controller--off";

  if (button && panel) {
    var buttonText = button.querySelector(".btn__text");
    var buttonTitle = buttonText.innerHTML;
    var buttonValueAlt = button.dataset.valueAlt;
    button.addEventListener("click", function () {
      if (!panel.classList.contains(isActiveClass)) {
        panel.classList.add(isActiveClass);
        button.classList.remove(controllerOffClass);
        buttonText.innerHTML = buttonValueAlt;
      } else {
        panel.classList.remove(isActiveClass);
        button.classList.add(controllerOffClass);
        buttonText.innerHTML = buttonTitle;
      }
    });
  }
};


// CONCATENATED MODULE: ./src/assets/js/file-upload.js





var file_upload_fileUpload = function fileUpload(el) {
  var inputs = document.querySelectorAll(el);

  for_each_default()(Array.prototype).call(inputs, function (input) {
    var label = input.nextElementSibling;
    var ancestor = findAncestor(label, ".file-upload");
    var labelStatus = ancestor.querySelector(".file-upload__name");
    var labelStatusVal = labelStatus.innerHTML;
    input.addEventListener("change", function (e) {
      var fileName = "";

      if (input.files.length >= 1) {
        fileName = e.target.value.split(/(\\|\/)/g).pop();

        if (fileName) {
          labelStatus.innerHTML = fileName;
        } else {
          labelStatus.innerHTML = labelStatusVal;
        }
      }
    });
  });
};

/* harmony default export */ var file_upload = (file_upload_fileUpload);
// EXTERNAL MODULE: ./node_modules/glightbox/dist/js/glightbox.min.js
var glightbox_min = __webpack_require__(149);
var glightbox_min_default = /*#__PURE__*/__webpack_require__.n(glightbox_min);

// CONCATENATED MODULE: ./src/assets/js/lightbox.js
 // Media lightbox

var lightbox_lightbox = function lightbox(el) {
  return glightbox_min_default()({
    selector: el,
    loopAtEnd: true
  });
};

/* harmony default export */ var js_lightbox = (lightbox_lightbox);
// CONCATENATED MODULE: ./src/assets/js/off-canvas.js



var off_canvas_offCanvas = function offCanvas(btn, menu) {
  var toggle = document.querySelector(btn);
  var panel = document.querySelector(menu);

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      if (panel.classList.contains("is-active")) {
        // Close the off-canvas
        document.documentElement.classList.remove("no-overflow");
        toggle.setAttribute("aria-expanded", "false");
        toggle.classList.remove("is-active");
        panel.classList.remove("is-active");
        panel.setAttribute("aria-hidden", "true"); // Bring back the default state for all item from the menu

        var menuItems = document.querySelectorAll(".big-menu__item");

        for_each_default()(menuItems).call(menuItems, function (item) {
          item.classList.remove("is-hidden");
          item.classList.remove("is-active");
        }); // Bring back the default state for all button from the menu


        var menuButton = document.querySelectorAll(".big-menu__button");

        for_each_default()(menuButton).call(menuButton, function (button) {
          button.setAttribute("aria-expanded", "false");
        }); // Bring back the default state for all panel from the menu


        var menuPanel = document.querySelectorAll(".big-menu__submenu");

        for_each_default()(menuPanel).call(menuPanel, function (mPanel) {
          mPanel.setAttribute("aria-hidden", "true");
        });

        panel.classList.remove("item-view");
      } else {
        // Know the scroll position
        var scrollPositionTop = window.pageYOffset !== undefined ? window.pageYOffset : window.scrollTop;
        var headerContainer = document.querySelector(".header");
        var headerHeight = getElementHeight(headerContainer);
        var topGap = headerHeight + scrollPositionTop; // Open the off-canvas

        document.documentElement.classList.add("no-overflow");
        panel.style.top = "".concat(helpers_pxToRem(topGap), "rem");
        panel.classList.add("is-active");
        panel.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "true");
        toggle.classList.add("is-active");
      }
    }); // Breakpoint when states change

    var breakpoint = 1080; // medium

    var mq = "(max-width: ".concat(breakpoint, "px)"); // Calculate the header height to set the menu top gap

    var setHeaderHeight = function setHeaderHeight() {
      // Elements
      var headerContainer = document.querySelector(".header");
      var cssVar = "--menu-top-gap";
      var headerHeight = getElementHeight(headerContainer);
      var currentCssVarValue = getComputedStyle(document.documentElement).getPropertyValue(cssVar); // Don't update the value if it's the same

      if (currentCssVarValue !== "".concat(helpers_pxToRem(headerHeight), "rem")) {
        document.documentElement.style.setProperty(cssVar, "".concat(helpers_pxToRem(headerHeight), "rem"));
      }
    }; // Run desired function depending of the window size
    // mq - CSS media query
    // funcMatche - function to execute if the media query matches
    // funcUnmatche - (optionnal) function to execute if the media query did not matches


    var checkMatchMedia = function checkMatchMedia(media, funcMatche) {
      var mql = window.matchMedia(media); // Set a default state on page load

      if (mql.matches) {
        funcMatche();
      } // Set a state depending of the window size


      var screenTest = function screenTest(e) {
        if (e.matches) {
          return funcMatche();
        }

        return false;
      };

      mql.addListener(screenTest);
    };

    checkMatchMedia(mq, setHeaderHeight, setHeaderHeight);
  }
};

/* harmony default export */ var off_canvas = (off_canvas_offCanvas);
// CONCATENATED MODULE: ./src/assets/js/big-menu.js


var big_menu_offCanvas = document.querySelector("#off-canvas-menu");

var big_menu_bigMenu = function bigMenu(toggle) {
  var btns = document.querySelectorAll(toggle);

  if (btns) {
    for_each_default()(btns).call(btns, function (btn) {
      btn.addEventListener("click", function () {
        var item = findAncestor(btn, ".big-menu__item");
        var panel = item.querySelector(".big-menu__submenu");

        if (item.classList.contains("is-active")) {
          // default state for all
          var items = document.querySelectorAll(".big-menu__item");

          for_each_default()(items).call(items, function (el) {
            el.classList.remove("is-hidden");
            item.classList.remove("is-active");
          });

          big_menu_offCanvas.classList.remove("item-view"); // Hide the panel of the previously selected element

          btn.setAttribute("aria-expanded", "false");
          panel.setAttribute("aria-hidden", "true");
        } else {
          // Hide all others
          var _items = document.querySelectorAll(".big-menu__item");

          for_each_default()(_items).call(_items, function (el) {
            el.classList.remove("is-active");
            el.classList.add("is-hidden");
            var childBtn = el.querySelector("button.big-menu__button");

            if (childBtn) {
              childBtn.setAttribute("aria-expanded", "false");
            }

            var childPanel = el.querySelector(".big-menu__submenu");

            if (childPanel) {
              childPanel.setAttribute("aria-hidden", "true");
            }
          });

          big_menu_offCanvas.classList.add("item-view"); // Show the panel of the selected element

          item.classList.add("is-active");
          item.classList.remove("is-hidden");
          btn.setAttribute("aria-expanded", "true");
          panel.setAttribute("aria-hidden", "false");
        }
      });
    });
  }
};

/* harmony default export */ var big_menu = (big_menu_bigMenu);
// CONCATENATED MODULE: ./src/assets/js/show-more-toggle.js



var show_more_toggle_showMoreToggle = function showMoreToggle(el) {
  var buttons = document.querySelectorAll(el);

  if (buttons.length > 0) {
    var activeClass = "is-active";

    for_each_default()(buttons).call(buttons, function (button) {
      var parent = findAncestor(button, ".elected__intro");
      var buttonText = button.querySelector(".btn__text");
      var buttonTitle = buttonText.innerHTML;
      var buttonValueAlt = button.dataset.valueAlt;
      button.addEventListener("click", function () {
        if (parent.classList.contains(activeClass)) {
          parent.classList.remove(activeClass);
          buttonText.innerHTML = buttonTitle;
        } else {
          parent.classList.add(activeClass);
          buttonText.innerHTML = buttonValueAlt;
        }
      });
    });
  }
};

/* harmony default export */ var show_more_toggle = (show_more_toggle_showMoreToggle);
// CONCATENATED MODULE: ./src/assets/js/toggle-animate.js
var toggleAnimate = function toggleAnimate(el) {
  var filter = document.querySelector(el);

  if (filter) {
    var growDiv = document.querySelector("".concat(el, "__fields"));

    if (growDiv && window.innerWidth <= 1000) {
      var button = filter.querySelector(".toggle-controller");

      if (button) {
        // Min and max height
        var growDivMaxHeight = growDiv.clientHeight;
        var growDivMinHeight = 51; // Init - Default State

        growDiv.style.height = "".concat(growDivMinHeight, "px");
        button.addEventListener("click", function () {
          if (growDiv.clientHeight > growDivMinHeight) {
            growDiv.style.height = "".concat(growDivMinHeight, "px");
          } else {
            growDiv.style.height = "".concat(growDivMaxHeight, "px");
          }
        });
      }
    }
  }
};

/* harmony default export */ var toggle_animate = (toggleAnimate);
// CONCATENATED MODULE: ./src/assets/js/header-dropdown.js
var headerDropdown = function headerDropdown(el) {
  var parent = document.querySelector(el);
  var button = document.querySelector(".expandmore__button");
  var panel = document.querySelector(".expandmore__panel");

  if (button && panel) {
    // Default state
    button.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true"); // Toggle state on click

    button.addEventListener("click", function () {
      if (parent.classList.contains("is-open")) {
        parent.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        panel.setAttribute("aria-hidden", "true");
      } else {
        parent.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        panel.setAttribute("aria-hidden", "false");
      }
    });
  }
};

/* harmony default export */ var header_dropdown = (headerDropdown);
// CONCATENATED MODULE: ./src/assets/js/main.js















 // Global events

document.addEventListener("DOMContentLoaded", function () {
  toggle_password_visibility(".toggle-password");
  input_icon_label(".form-prefix-icon");
  menu_accordion(".menu-accordion");
  toggle_filters_advancedFilters(".filters-bar__controller");
  simpleFilters("#documents-filters", ".documents-filters__fields");
  simpleFilters("#annonces-filters", ".search-announces__fields");
  events_calendar("#events-calendar");
  tablist_advantagesTab("#advantages-tab");
  tablist_announceTab("#ad-infos-tabs");
  file_upload(".file-upload__input");
  js_lightbox("lightbox");
  off_canvas("#toggle-menu", "#off-canvas-menu");
  big_menu("button.big-menu__button");
  show_more_toggle(".readmore");
  toggle_animate(".documents-filters");
  toggle_animate(".search-announces");
  header_dropdown(".header-dropdown");
}, false);

/***/ })
/******/ ]);