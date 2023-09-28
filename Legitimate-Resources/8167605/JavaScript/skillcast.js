if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
		configurable: true,
		value: function includes (searchElement /*, fromIndex*/) {
			'use strict';
			var O = Object(this);
			var len = parseInt(O.length) || 0;
			if (len === 0) {
				return false;
			}
			var n = parseInt(arguments[1]) || 0;
			var k;
			if (n >= 0) {
				k = n;
			} else {
				k = len + n;
				if (k < 0) {
					k = 0;
				}
			}
			var currentElement;
			while (k < len) {
				currentElement = O[k];
				if (searchElement === currentElement ||
					(searchElement !== searchElement && currentElement !== currentElement)) {
					return true;
				}
				k++;
			}
			return false;
		},
		writable: true
	});
}
  
  if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun/*, thisArg*/) {
      'use strict';
  
      if (this === void 0 || this === null) {
        throw new TypeError();
      }
  
      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== 'function') {
        throw new TypeError();
      }
  
      var res = [];
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i];
  
          // NOTE: Technically this should Object.defineProperty at
          //       the next index, as push can be affected by
          //       properties on Object.prototype and Array.prototype.
          //       But that method's new, and collisions should be
          //       rare, so use the more-compatible alternative.
          if (fun.call(thisArg, val, i, t)) {
            res.push(val);
          }
        }
      }
  
      return res;
    };
  }
  
  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.io/#x15.4.4.18
  if (!Array.prototype.forEach) {
  
    Array.prototype.forEach = function (callback, thisArg) {
  
      var T, k;
  
      if (this === null) {
        throw new TypeError(' this is null or not defined');
      }
  
      // 1. Let O be the result of calling toObject() passing the
      // |this| value as the argument.
      var O = Object(this);
  
      // 2. Let lenValue be the result of calling the Get() internal
      // method of O with the argument "length".
      // 3. Let len be toUint32(lenValue).
      var len = O.length >>> 0;
  
      // 4. If isCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
      }
  
      // 5. If thisArg was supplied, let T be thisArg; else let
      // T be undefined.
      if (arguments.length > 1) {
        T = thisArg;
      }
  
      // 6. Let k be 0
      k = 0;
  
      // 7. Repeat, while k < len
      while (k < len) {
  
        var kValue;
  
        // a. Let Pk be ToString(k).
        //    This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty
        //    internal method of O with argument Pk.
        //    This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
  
          // i. Let kValue be the result of calling the Get internal
          // method of O with argument Pk.
          kValue = O[k];
  
          // ii. Call the Call internal method of callback with T as
          // the this value and argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
      }
      // 8. return undefined
    };
  }
  
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0)
        ? Math.ceil(from)
        : Math.floor(from);
      if (from < 0)
        from += len;
  
      for (; from < len; from++) {
        if (from in this &&
          this[from] === elt)
          return from;
      }
      return -1;
    };
  };
  
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }
  
  function defineProperties(obj, properties) {
    function convertToDescriptor(desc) {
      function hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
  
      function isCallable(v) {
        // NB: modify as necessary if other values than functions are callable.
        return typeof v === "function";
      }
  
      if (typeof desc !== "object" || desc === null)
        throw new TypeError("bad desc");
  
      var d = {};
  
      if (hasProperty(desc, "enumerable"))
        d.enumerable = !!desc.enumerable;
      if (hasProperty(desc, "configurable"))
        d.configurable = !!desc.configurable;
      if (hasProperty(desc, "value"))
        d.value = desc.value;
      if (hasProperty(desc, "writable"))
        d.writable = !!desc.writable;
      if (hasProperty(desc, "get")) {
        var g = desc.get;
  
        if (!isCallable(g) && typeof g !== "undefined")
          throw new TypeError("bad get");
        d.get = g;
      }
      if (hasProperty(desc, "set")) {
        var s = desc.set;
        if (!isCallable(s) && typeof s !== "undefined")
          throw new TypeError("bad set");
        d.set = s;
      }
  
      if (("get" in d || "set" in d) && ("value" in d || "writable" in d))
        throw new TypeError("identity-confused descriptor");
  
      return d;
    }
  
    if (typeof obj !== "object" || obj === null)
      throw new TypeError("bad obj");
  
    properties = Object(properties);
  
    var keys = Object.keys(properties);
    var descs = [];
  
    for (var i = 0; i < keys.length; i++)
      descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
  
    for (var i = 0; i < descs.length; i++)
      Object.defineProperty(obj, descs[i][0], descs[i][1]);
  
    return obj;
  
  }
  
  // add String.includes
  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }
  
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;
  
      return function(obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
  
        var result = [], prop, i;
  
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
  
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }
  if (!Array.prototype.reduce) {
    Object.defineProperty(Array.prototype, 'reduce', {
      value: function(callback /*, initialValue*/) {
        if (this === null) {
          throw new TypeError( 'Array.prototype.reduce ' + 
            'called on null or undefined' );
        }
        if (typeof callback !== 'function') {
          throw new TypeError( callback +
            ' is not a function');
        }
  
        // 1. Let O be ? ToObject(this value).
        var o = Object(this);
  
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0; 
  
        // Steps 3, 4, 5, 6, 7      
        var k = 0; 
        var value;
  
        if (arguments.length >= 2) {
          value = arguments[1];
        } else {
          while (k < len && !(k in o)) {
            k++; 
          }
  
          // 3. If len is 0 and initialValue is not present,
          //    throw a TypeError exception.
          if (k >= len) {
            throw new TypeError( 'Reduce of empty array ' +
              'with no initial value' );
          }
          value = o[k++];
        }
  
        // 8. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kPresent be ? HasProperty(O, Pk).
          // c. If kPresent is true, then
          //    i.  Let kValue be ? Get(O, Pk).
          //    ii. Let accumulator be ? Call(
          //          callbackfn, undefined,
          //          « accumulator, kValue, k, O »).
          if (k in o) {
            value = callback(value, o[k], k, o);
          }
  
          // d. Increase k by 1.      
          k++;
        }
  
        // 9. Return accumulator.
        return value;
      }
    });
  }

if (!Array.from) {
	Array.from = (function () {
		var toStr = Object.prototype.toString;
		var isCallable = function (fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function (value) {
			var number = Number(value);
			if (isNaN(number)) { return 0; }
			if (number === 0 || !isFinite(number)) { return number; }
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		// The length property of the from method is 1.
		return function from(arrayLike/*, mapFn, thisArg */) {
			// 1. Let C be the this value.
			var C = this;

			// 2. Let items be ToObject(arrayLike).
			var items = Object(arrayLike);

			// 3. ReturnIfAbrupt(items).
			if (arrayLike == null) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}

			// 4. If mapfn is undefined, then let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				// 5. else
				// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			// 10. Let lenValue be Get(items, "length").
			// 11. Let len be ToLength(lenValue).
			var len = toLength(items.length);

			// 13. If IsConstructor(C) is true, then
			// 13. a. Let A be the result of calling the [[Construct]] internal method
			// of C with an argument list containing the single item len.
			// 14. a. Else, Let A be ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			// 16. Let k be 0.
			var k = 0;
			// 17. Repeat, while k < len… (also steps a - h)
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			// 18. Let putStatus be Put(A, "length", len, true).
			A.length = len;
			// 20. Return A.
			return A;
		};
	}());
}


  
