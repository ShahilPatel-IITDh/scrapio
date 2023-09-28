var slert = alert;

function debug(obj) {
    var x = 'Dump of ' + obj + '\r\n';
    for (i in obj) {
        x += i + ' = ' + obj[i] + '\r\n';
    }

    prompt('Object dump - copy & paste into text editor', x);
}

/*
 ==============================================================================================
 Javascript Inheritance, see http://javascript.crockford.com/inheritance.html
 Also read :
 http://www.webreference.com/js/column79/
 (Object-Oriented Programming with JavaScript, Part I: Inheritance)
 http://www.webreference.com/js/column80/
 (Object-Oriented Programming with JavaScript, Part II: Methods)
 http://w3future.com/html/stories/
 */
// The following from http://www.u.arizona.edu/~jscully/javafication.html
var inherits = "extends";
var br = "<br>";
//This method was deviously invented by Douglas Crockford.
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

// And this one was deviously invented by me, after finding out how cool javascript
// really was from Douglas Crockford's website.
Function.prototype['extends'] = function (Parent) {
    var prototypeExists = false;
    var isOpera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    var self = this;
    self.prototype.base = function() {
        var s = "";
        var parentClass;

        for (var i = 0; i < arguments.length - 1; i++) {
            if (typeof(arguments[i]) == 'string')
                s += "'" + arguments[i] + "'";

            else s += arguments[i];

            s += ",";
        }

        if (typeof(arguments[arguments.length - 1]) == 'string')
            s += "'" + arguments[arguments.length - 1] + "'";

        else s += arguments[arguments.length - 1];

        parentClass = eval("new Parent(" + s + ")");


        for (var i in parentClass) {
            prototypeExists = false;
            if (isOpera == true && i.indexOf('toString') != -1) /*Then do nothing*/ ;
            else {
                for (var ii in self.prototype) {
                    if (i.indexOf(ii) != -1) prototypeExists = true;
                }
                if (!prototypeExists) self.prototype[i] = parentClass[i];
            }
        }

        if ((self.prototype.toString).toString().indexOf("[native code]") != -1)
            self.prototype['toString'] = parentClass.toString;

        return parentClass;
    };

};

// "swiss" function for multiple inheritance
// copies parent member variables and methods into the function
Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});


// from http://www.webreference.com/js/column79/7.html
function instanceOf(object, constructorFunction) {
    while (object != null) {
        if (object == constructorFunction.prototype) {
            return true
        }
        object = object.__proto__;
    }
    return false;
}
// ==============================================================================================

/*
 Internet Explorer holds references to objects which are not JavaScript objects, and
 which produce errors if they are treated as JavaScript objects. This is a problem because
 typeof identifies them as JavaScript objects. The isAlien() function will return true if a
 is one of those alien objects.
 */
function isAlien(a) {
    return isObject(a) && typeof a.constructor != 'function';
}

/*
 isArray() returns true if a is an array, meaning that it was produced by the Array constructor
 or by using the [ ] array literal notation.
 */
function isArray(a) {
    return isObject(a) && a.constructor == Array;
}

/*
 isBoolean(a) returns true if a is one of the boolean values, true or false.
 */
function isBoolean(a) {
    return typeof a == 'boolean';
}

/*
 isEmpty(a) returns true if a is an object or array or function containing no enumerable members.
 */
function isEmpty(o) {
    var i, v;
    if (isObject(o)) {
        for (i in o) {
            v = o[i];
            if (isUndefined(v) && isFunction(v)) {
                return false;
            }
        }
    }
    return true;
}

/*
 TK: changed this as it doesn't seem to work in IE
 isFunction(a) returns true if a is a function. Beware that some native functions in IE were
 made to look like objects instead of functions. This function does not detect that.
 */
function isFunction(a) {
    if (!a) return false;
    //return typeof a == 'function';
    return a.call ? true : false;
}

/*
 isNull(a) returns true if a is the null value.
 */
function isNull(a) {
    return typeof a == 'object' && !a;
}

/*
 sNumber(a) returns true if a is a finite number. It returns false if a is NaN or Infinite.
 It also returns false if a is a string that could be converted to a number.
 */
function isNumber(a) {
    return typeof a == 'number' && isFinite(a);
}

/*
 isObject(a) returns true if a is an object, and array, or a function. It returns false if
 a is a string, a number, a boolean, or null, or undefined.
 */
function isObject(a) {
    return (a && typeof a == 'object') || isFunction(a);
}

/*
 isString(a) returns true if a is a string.
 */
function isString(a) {
    return typeof a == 'string';
}

/*
 isUndefined(a) returns true if a is the undefined value. You can get the undefined value
 from an uninitialized variable or from a missing member of an object.
 */
function isUndefined(a) {
    return typeof a == 'undefined';
}

with (String) {

    /*
     entityify() produces a string in which '<', '>', and '&' are replaced with their HTML entity equivalents.
     This is essential for placing arbitrary strings into HTML texts. So,

     "if (a < b && b > c) {".entityify()

     produces

     "if (a &lt; b &amp;&amp; b &gt; c) {"

     */
    method('entityify', function () {
        return this.replace(/&/g, "&amp;").replace(/</g,
                "&lt;").replace(/>/g, "&gt;");
    });

    /*
     quote() produces a quoted string. This method returns a string which is like the original string except
     that it is wrapped in quotes and all quote and backslash characters are preceded with backslash.
     */
    method('quote', function () {
        var c, i, l = this.length, o = '"';
        for (i = 0; i < l; i += 1) {
            c = this.charAt(i);
            if (c >= ' ') {
                if (c == '\\' || c == '"') {
                    o += '\\';
                }
                o += c;
            } else {
                switch (c) {
                    case '\b':
                        o += '\\b';
                        break;
                    case '\f':
                        o += '\\f';
                        break;
                    case '\n':
                        o += '\\n';
                        break;
                    case '\r':
                        o += '\\r';
                        break;
                    case '\t':
                        o += '\\t';
                        break;
                    default:
                        c = c.charCodeAt();
                        o += '\\u00' + Math.floor(c / 16).toString(16) +
                                (c % 16).toString(16);
                }
            }
        }
        return o + '"';
    });

    /*
     supplant() does variable substitution on the string. It scans through the string looking for expressions
     enclosed in { } braces. If an expression is found, use it as a key on the object, and if the key has a
     string value or number value, it is substituted for the bracket expression and it repeats. This is useful
     for automatically fixing URLs. So

     param = {domain: 'valvion.com', media: 'http://media.{domain}/'};
     url = "{media}logo.gif".supplant(param);

     produces a url containing "http://media.valvion.com/logo.gif".
     */
    method('supplant', function (o) {
        var i, j, s = this, v;
        for (; ;) {
            i = s.lastIndexOf('{');
            if (i < 0) {
                break;
            }
            j = s.indexOf('}', i);
            if (i + 1 >= j) {
                break;
            }
            v = o[s.substring(i + 1, j)];
            if (!isString(v) && !isNumber(v)) {
                break;
            }
            s = s.substring(0, i) + v + s.substring(j + 1);
        }
        return s;
    });

    /*
     The trim() method removes whitespace characters from the beginning and end of the string.
     */
    method('trim', function () {
        return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
    });
}

/*
 apply() is a method of a function which calls the function as though it is a method of the
 object. The this variable will be bound to the object. args is an optional array of values
 which will be used as the function's arguments.
 */
if (!isFunction(Function.apply)) {
    Function.method('apply', function (o, a) {
        var r, x = '____apply';
        if (!isObject(o)) {
            o = {};
        }
        o[x] = this;
        switch ((a && a.length) || 0) {
            case 0:
                r = o[x]();
                break;
            case 1:
                r = o[x](a[0]);
                break;
            case 2:
                r = o[x](a[0], a[1]);
                break;
            case 3:
                r = o[x](a[0], a[1], a[2]);
                break;
            case 4:
                r = o[x](a[0], a[1], a[2], a[3]);
                break;
            case 5:
                r = o[x](a[0], a[1], a[2], a[3], a[4]);
                break;
            case 6:
                r = o[x](a[0], a[1], a[2], a[3], a[4], a[5]);
                break;
            default:
                alert('Too many arguments to apply.');
        }
        delete o[x];
        return r;
    });
}

/*
 These array methods are required by the ECMAScript Specification, but they did not make it
 into IE 5.0, so we will add them ourselves. The push and pop methods allow use to use an array
 as a stack. The shift and unshift methods allow us to use an array as a double-ended queue.
 The splice method allows us to use an array as a string of values.All of these methods modify the array.

 JavaScript arrays are implemented as hashtables, but when using these methods, it is easier to
 think about traditional arrays, which are a contiguous series of numbered slots.
 */

/*
 The pop() method removes the last item from an array and returns it.
 */
if (!isFunction(Array.prototype.pop)) {
    Array.method('pop', function () {
        return this.splice(this.length - 1, 1)[0];
    });
}

/*
 The push() method appends one or more elements to the end of an array. The new length of the array is returned.
 */
if (!isFunction(Array.prototype.push)) {
    Array.method('push', function () {
        this.splice.apply(this,
                [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
        return this.length;
    });
}

/*
 The shift() method removes the [0] element from the array and returns it. It also reduces the subscripts of all
 of the remaining elements in the array by one.
 */
if (!isFunction(Array.prototype.shift)) {
    Array.method('shift', function () {
        return this.splice(0, 1)[0];
    });
}

/*
 The splice() method deletes elements starting at the start  index, and inserts new elements at the same point.
 It returns an array containing the deleted values. Do not confuse the splice() method with the slice()  method
 or the split() method.
 */
if (!isFunction(Array.prototype.splice)) {
    Array.method('splice', function (s, d) {
        var max = Math.max,
                min = Math.min,
                a = [], // The return value array
                e,  // element
                i = max(arguments.length - 2, 0),   // insert count
                k = 0,
                l = this.length,
                n,  // new length
                v,  // delta
                x;
        // shift count

        s = s || 0;
        if (s < 0) {
            s += l;
        }
        s = max(min(s, l), 0);
        // start point
        d = max(min(isNumber(d) ? d : l, l - s), 0);
        // delete count
        v = i - d;
        n = l + v;
        while (k < d) {
            e = this[s + k];
            if (!isUndefined(e)) {
                a[k] = e;
            }
            k += 1;
        }
        x = l - s - d;
        if (v < 0) {
            k = s + i;
            while (x) {
                this[k] = this[k - v];
                k += 1;
                x -= 1;
            }
            this.length = n;
        } else if (v > 0) {
            k = 1;
            while (x) {
                this[n - k] = this[l - k];
                k += 1;
                x -= 1;
            }
        }
        for (k = 0; k < i; ++k) {
            this[s + k] = arguments[k + 2];
        }
        return a;
    });
}

/*
 The unshift() method inserts new elements to the beginning of an array. The new length of the array is returned.
 */
if (!isFunction(Array.prototype.unshift)) {
    Array.method('unshift', function () {
        this.splice.apply(this,
                [0, 0].concat(Array.prototype.slice.apply(arguments)));
        return this.length;
    });
}

/*
 The each() method iterates over each element in the array and executes the closure passed to it
 by Toby Kurien
 */
if (!isFunction(Array.prototype.each)) {
    Array.method('each', function (f) {
        if (!isFunction(f)) return;
        if (this.length == 0) return;

        for (var i = 0; i < this.length; i++) {
            f(this[i], i, i == (this.length - 1));
        }
    });
}

/*
 The collect() method iterates over each element in the array and executes the closure passed to it and returns
 a new array with the function applied
 by Toby Kurien
 */
if (!isFunction(Array.prototype.collect)) {
    Array.method('collect', function (f) {
        var newArray = new Array(this.length);
        if (!isFunction(f)) return newArray;
        if (this.length == 0) return newArray;

        for (var i = 0; i < this.length; i++) {
            newArray[i] = f(this[i], i, i == (this.length - 1));
        }
        return newArray;
    });
}

/*
 The indexOf() method iterates over each element in the array and returns the index of where the
 item occurs in the array, or -1 if it doesn't
 by Toby Kurien
 */
if (!isFunction(Array.prototype.indexOf)) {
    Array.method('indexOf', function (obj) {
        if (this.length == 0) return -1;

        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) return i;
        }

        return -1;
    });
}

/*
 The find() method iterates over each element in the array and returns the index of where the
 supplied function returns true, or -1 if it doesn't
 by Toby Kurien
 */
if (!isFunction(Array.prototype.find)) {
    Array.method('find', function (func) {
        if (this.length == 0) return -1;

        for (var i = 0; i < this.length; i++) {
            if (func(this[i])) return i;
        }

        return -1;
    });
}


/*
 From http://www.crockford.com/javascript/memory/leak.html
 To avoid memory leaks in IE when deleting DOM objects

 The purge function takes a reference to a DOM element as an argument. It loops through the element's
 attributes. If it finds any functions, it nulls them out. This breaks the cycle, allowing memory to be reclaimed.
 It will also look at all of the element's descendent elements, and clear out all of their cycles as well. The
 purge function is harmless on Mozilla and Opera. It is essential on IE. The purge function should be called before
 removing any element, either by the removeChild method, or by setting the innerHTML property.
 */
function purge(d) {
    var a = d.attributes, i, l, n;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            n = a[i].name;
            if (typeof d[n] === 'function') {
                d[n] = null;
            }
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            purge(d.childNodes[i]);
        }
    }
}

// ***********************************************************************************
// The following functions return the top, left, height and width of an html element
function getTop(element) {
    var top = element.offsetTop;
    if (element.offsetParent != null) {
        return top + getTop(element.offsetParent);
    }
    return top;
}

function getLeft(element) {
    var left = element.offsetLeft;
    if (element.offsetParent != null) {
        return left + getLeft(element.offsetParent);
    }
    return left;
}

// ***********************************************************************************
// expandCode() - replaces templates containing [$variable$] with values of the variable 
function expandCode(str, hash) {
    var start = str.indexOf('[$');
    if (start >= 0) {
        end = str.indexOf('$]', start);
        if (end > 0) {
            var prefix = str.substring(0, start);
            var code = str.substring(start + 2, end);
            var suffix = str.substring(end + 2);
            var codeOutput = "";
            try {
                if (hash != null) {
                    codeOutput = hash.eval(code);
                } else {
                    codeOutput = eval(code);
                }
            } catch (ex) {
                codeOutput = "Error: " + ex;
            }
            str = prefix + codeOutput + suffix;
        } else {
            var prefix = str.substring(0, start);
            var suffix = str.substring(start + 2);
            str = prefix + suffix;
        }
    }

    var start = str.indexOf('[$');
    if (start >= 0) {
        return expandCode(str, hash);
    } else {
        return str;
    }
}

/**
 * From http://peter.michaux.ca/article/3556
 * This method uses the "lazy definition" technique to redefine itself after it's been called once.
 * It returns the amount that the web page has scrolled by, with cross-browser support
 */
var getScrollY = function() {
    if (typeof window.pageYOffset == 'number') {

        getScrollY = function() {
            return window.pageYOffset;
        };

    } else if ((typeof document.compatMode == 'string') &&
            (document.compatMode.indexOf('CSS') >= 0) &&
            (document.documentElement) &&
            (typeof document.documentElement.scrollTop == 'number')) {

        getScrollY = function() {
            return document.documentElement.scrollTop;
        };

    } else if ((document.body) &&
            (typeof document.body.scrollTop == 'number')) {

        getScrollY = function() {
            return document.body.scrollTop;
        }

    } else {

        getScrollY = function() {
            return NaN;
        };

    }

    return getScrollY();
}

/**
 *
 * URL encode / decode
 * http://www.webtoolkit.info/
 *
 **/

var Url = {

    // public method for url encoding
    encode : function (string) {
        return escape(this._utf8_encode(string));
    },

    // public method for url decoding
    decode : function (string) {
        return this._utf8_decode(unescape(string));
    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

// Alternative to window.onload - this one runs the script before all images have been loaded (but HTML is ready). 
// Call domPageReady() at the end of the page so that other scripts don't overwrite the window.onload method. 
// @see http://www.hunlock.com/blogs/Are_you_ready_for_this 
// To register on load listeners, use registerOnLoad(function)
if (!window.registerOnLoad) {
    var ranOnload = false;
    // Flag to determine if we've ran the starting stack already.
    startStack = function() {
    };
    // A stack of functions to run onload/domready

    window.registerOnLoad = function(func) {
        if (func != null) {
            var orgOnLoad = startStack;
            startStack = function () {
                orgOnLoad();
                func();
                return;
            }
        }
    }

    if (window.Event && isFunction(Event.observe)) {
        // the cross browser way to do it, if prototype is loaded
        Event.observe(window, "load", function() {
            if (!ranOnload) {
                ranOnload = true;
                startStack();
            }
        });
    } else if (document.addEventListener) {
        // Mozilla actually has a DOM READY event.
        document.addEventListener("DOMContentLoaded", function() {
            if (!ranOnload) {
                ranOnload = true;
                startStack();
            }
        }, false);
    } else if (document.all && !window.opera) {
        // This is the IE style which exploits a property of the (standards defined) defer attribute
        document.write("<scr" + "ipt id='DOMReady' defer=true " + "src=//:><\/scr" + "ipt>");
        document.getElementById("DOMReady").onreadystatechange = function() {
            if (this.readyState == "complete" && (!ranOnload)) {
                ranOnload = true;
                startStack();
            }
        }
    }
}

function domPageReady() {
    var orgOnLoad = window.onload;
    registerOnLoad(orgOnLoad);
    window.onload = function() {
        if (!ranOnload) {
            ranOnload = true;
            startStack();
        }
    }
}

/**
 * Sets a Cookie with the given name and value.
 * <p/>
 * name       Name of the cookie
 * value      Value of the cookie
 * [expires]  Expiration date of the cookie (default: end of current session)
 * [path]     Path where the cookie is valid (default: path of calling document)
 * [domain]   Domain where the cookie is valid
 * (default: domain of calling document)
 * [secure]   Boolean value indicating if the cookie transmission requires a
 * secure transmission
 */
function setCookie(name, value, expires, path, domain, secure) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
            ((expires == null || expires.length == 0) ? "" : ("; expires=" + expires.toGMTString())) +
            ((path == null || path.length == 0) ? "" : ("; path=" + path)) +
            ((domain == null) ? "" : ("; domain=" + domain)) +
            ((secure == true) ? "; secure" : "");
}

/**
 * Gets the value of the specified cookie.
 * <p/>
 * name  Name of the desired cookie.
 * <p/>
 * Returns a string containing value of specified cookie,
 * or null if cookie does not exist.
 */
function getCookie(name) {
    var dasCookie = document.cookie;
    var index = dasCookie.indexOf(name + "=");
    if (index == -1) return null;
    index = dasCookie.indexOf("=", index) + 1; // first character
    var endstr = dasCookie.indexOf(";", index);
    if (endstr == -1) endstr = dasCookie.length; // last character
    return unescape(dasCookie.substring(index, endstr));
}

/**
 * Deletes the specified cookie.
 * <p/>
 * name      name of the cookie
 * [path]    path of the cookie (must be same as path used to create cookie)
 * [domain]  domain of the cookie (must be same as domain used to create cookie)
 */
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function loadScript(scriptUrl) {
    // Load the plugin script asynchronously
    var head = document.getElementsByTagName("head")[0];
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = (scriptUrl.startsWith("http://") || scriptUrl.startsWith("https://") ? scriptUrl : ccs.contextPath + scriptUrl);
    head.appendChild(script);
}


function stretch(el, extra, leaveHorizontal) {
    if (!extra) extra = 0;
    try {
        if (el.style.display != '') el.style.display = '';
        if (el.style.height != '') el.style.height = '';
        document.getElementById(el.id).height = null;
        var doc = el.contentDocument? el.contentDocument: el.contentWindow.document;
        document.getElementById(el.id).height = doc.body.scrollHeight + extra;
        if (leaveHorizontal == null || leaveHorizontal != true) {
            document.getElementById(el.id).width = el.parentNode.offsetWidth - 4;
        }
    } catch(err) {
        alert(err);
    }
}


/**
 * Create a console object for browsers that don't have one
 */
if (!window.console) {
    window.console = {};
    window.console.log = function(message) {
    }
    window.console.trace = function(params) {
    }
}

// TK - creates the package namespace
function declarePackage(dasPackage) {
    var items = dasPackage.split('.');
    var parent = window;
    for (var i = 0; i < items.length; i++) {
        if (parent[items[i]] == null) {
            parent[items[i]] = {};
        }
        parent = parent[items[i]];
    }
}

//Useful for repositioning elements. Gets the number of pixels you're scrolled down from the top.
function getScrollTop() {
    var ScrollTop = document.body.scrollTop;
    if (ScrollTop == 0) {
        if (window.pageYOffset)
            ScrollTop = window.pageYOffset;
        else
            ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
    }
    return ScrollTop;
}


//EXAMPLE: <input type="password"  onKeyPress="if (checkEnter(event)) $('loginLink').onclick()"/>
function checkEnter(e) { //e is event object passed from function invocation
   try {
    var characterCode;

    if (e && e.which) { //if which property of event object is supported (NN4)
        e = e;
        characterCode = e.which;
        //character code is contained in NN4's which property
    } else {
        e = event;
        characterCode = e.keyCode;
        //character code is contained in IE's keyCode property
    }

    if (characterCode == 13) { //if generated character code is equal to ascii 13 (if enter key)
        return true;
    } else {
        return false;
    }
   } catch (err) {console.log("dfd")}

}


function getTextAreaHTML(areaName) {
    var html = document.getElementById(areaName).innerHTML;
    if (navigator.userAgent.toLowerCase().indexOf("chrome") == -1 && navigator.userAgent.toLowerCase().indexOf("safari") == -1) {
        var htmlNode = document.createElement("DIV");
        htmlNode.innerHTML = html;
        if (htmlNode.innerText) return htmlNode.innerText; // IE
        return htmlNode.textContent;
        // FF
    } else {
        return html;
        //Chrome
    }
}


function doHover(elm, action) {
    var src = elm.src;
    var splitSrc = src.split("/");
    var imageName = splitSrc[splitSrc.length - 1];
    var ext = imageName.split(".")[1];

    if (action == "on") {
        var re = new RegExp('\.' + ext);
        if (elm.src.indexOf("_active") == -1) { //Fix IE Bug.
            elm.src = src.replace(re, "_active." + ext);
        }
    } else {
        var re = new RegExp('_active\.' + ext);
        elm.src = src.replace(re, "." + ext);
    }
}

function getWindowWidth() {
    return window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
}

function getWindowHeight() {
    return window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);
}

function getSelectedRadio(attributeName) {
    var radios = document.getElementsByName(attributeName);

    var checked = false;
    var value = "";
    for (var i = 0; i < radios.length && !checked; i++) {
        if (radios[i].checked) {
            checked = true;
            value = radios[i].value;
        }
    }
    return value;


}

function getSelectedValue(elm) {
   return elm.options[elm.selectedIndex].value;
}

function detectIEVersion() {
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
        var ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
        return ieversion;
    } else {
        return -1;
    }
}


function formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function escapeEmail(recipient, domain, includeMailto, className, onclickFunction) {
   if (includeMailto) {
      document.write("<a href=\"mail" + "to:" + recipient + "&#64;" + domain + "\"" + (className != null ? "class=\"" + className + "\"" : "") + (onclickFunction != null ? "onclick=\"" + onclickFunction + "\"" : "") + ">");
   }
   document.write(recipient + "@" + domain);
   if (includeMailto) {
      document.write("</a>");
   }
}

