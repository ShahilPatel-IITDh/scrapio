/* JavaScript 1.8.5 compatibility */
/* ( function(){} ).bind( context ) */
if (!Function.prototype.bind)
	{
	Function.prototype.bind = function (context)
		{
		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () {},
			fBound = function ()
				{
				return fToBind.apply((this.prototype && this instanceof fNOP)
					? this
					: context || window,
					aArgs.concat(Array.prototype.slice.call(arguments)));
				};
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
		};
	}

/* JavaScript 1.8.1 compatibility */
if (!String.prototype.trim)
	{
	String.prototype.trim = function ()
		{
		return this.replace(/^\s+|\s+$/g,'');
		};
	}

if (!String.prototype.trimLeft)
	{
	String.prototype.trimLeft = function()
		{
		return this.replace(/^\s+/,"");
		};
	}

if (!String.prototype.trimRight)
	{
	String.prototype.trimRight = function()
		{
		return this.replace(/\s+$/,"");
		};
	}

/* JavaScript 1.8 compatibility */
/* [].reduce( function(previousValue, currentValue, index, array) {}, initialValue ) */
if (!Array.prototype.reduce)
	{
	Array.prototype.reduce = function reduce(accumulator /*, initialValue */)
		{
		var i = 0, l = this.length >> 0, curr;
		if (arguments.length < 2)
			{
			if (l === 0) throw new TypeError("Array length is 0 and no second argument");
			curr = this[0];
			i = 1; // start accumulating at the second element  
			}
		else
			curr = arguments[1];

		while (i < l)
			{
			if (i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
			++i;
			}

		return curr;
		};
	}
/* [].reduceRight( function(previousValue, currentValue, index, array) {}, initialValue ) */
if (!Array.prototype.reduceRight)
	{
	Array.prototype.reduceRight = function (accumulator /*, initialValue */)
		{
		var len = this.length >>> 0;
		// no value to return if no initial value, empty array  
		if (len === 0 && arguments.length === 1)
			throw new TypeError();

		var k = len - 1;
		var curr = arguments.length >= 2 ? arguments[1] : this[k--];
		while (k >= 0)
			{
			curr = accumulator.call(undefined, curr, this[k], k, this);
			k--;
			}
		return curr;
		};
	}
/* JavaScript 1.6 compatibility */
if (!Array.prototype.indexOf)
	{
	Array.prototype.indexOf = function (searchElement /*, fromIndex */)
		{
		var len = this.length >>> 0;
		if (len === 0) return -1;
		var n = 0;
		if (arguments.length > 0)
			{
			n = Number(arguments[1]);
			if (n != n)
				{ // shortcut for verifying if it's NaN  
				n = 0;
				} else if (n != 0 && n != Infinity && n != -Infinity)
				{
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}
		if (n >= len)
			{
			return -1;
			}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++)
			{
			if ( this[k] === searchElement )
				{
				return k;
				}
			}
		return -1;
		}
	}
if (!Array.prototype.lastIndexOf)
	{
	Array.prototype.lastIndexOf = function (searchElement /*, fromIndex*/)
		{
		var len = this.length >>> 0;
		if (len === 0)
			return -1;

		var n = len;
		if (arguments.length > 1)
			{
			n = Number(arguments[1]);
			if (n != n)
				n = 0;
			else if (n != 0 && n != (1 / 0) && n != -(1 / 0))
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}

		var k = n >= 0
			? Math.min(n, len - 1)
			: len - Math.abs(n);

		for (; k >= 0; k--)
			{
			if ( this[k] === searchElement)
				return k;
			}
		return -1;
		};
	}
/* [].filter( function( value, index, array ) {}, context ) */
if (!Array.prototype.filter)
	{
	Array.prototype.filter = function (fun /*, context */)
		{
		var len = this.length >>> 0;
		var res = [];
		var context = arguments[1];
		for (var i = 0; i < len; i++)
			{
			var val = this[i]; // in case fun mutates this  
			if (fun.call(context, val, i, this))
				res.push(val);
			}

		return res;
		};
	}
/* [].forEach( function( value, index, array ) {}, context ) */
if (!Array.prototype.forEach)
	{
	Array.prototype.forEach = function (fun /*, context */)
		{
		var context = arguments[1];
		var len = this.length >>> 0;
		var k = 0;
		while (k < len)
			{
			fun.call(context, this[ k ], k, this);
			k++;
			}
		};
	}
/* [].every( function( value, index, array ) {}, context ) */
if (!Array.prototype.every)
	{
	Array.prototype.every = function (fun /*, context */)
		{
		var len = this.length >>> 0;
		var context = arguments[1];
		for (var i = 0; i < len; i++)
			if (!fun.call(context, this[i], i, this))
				return false;
		return true;
		};
	}
/* [].map( function( value, index, array ) {}, context ) */
if (!Array.prototype.map)
	{
	Array.prototype.map = function (fun /*, context */)
		{
		var A, k;
		var len = this.length >>> 0;
		var context = arguments[1];
		A = new Array(len);
		k = 0;
		while (k < len)
			{
			A[ k ] = fun.call(context, this[ k ], k, this);
			k++;
			}
		return A;
		};
	}
/* [].some( function( value, index, array ) {}, context ) */
if (!Array.prototype.some)
	{
	Array.prototype.some = function (fun /*, context */)
		{
		var len = this.length >>> 0;
		var context = arguments[1];
		for (var i = 0; i < len; i++)
			if (fun.call(context, this[i], i, this))
				return true;
		return false;
		};
	}

if (!Array.prototype.find)
	{
	Array.prototype.find = function(predicate)
		{
		for (var i=0; i < this.length; i++)
			{
			if (predicate(this[i], i, this))
				{
				return this[i];
				}
			}
		return void 0;
		}
	}

/* String compareTo() not implemented in all browsers */
if (!String.prototype.compareTo)
	{
	String.prototype.compareTo = function (s)
		{
		var len1 = this.length;
		var len2 = s.length;
		var n = (len1 < len2 ? len1 : len2);
					
		for (var i = 0 ; i < n ; i++)
			{
			var a = this.charCodeAt (i);
			var b = s.charCodeAt (i);
				if (a != b)
				  return (a - b);
			}  
		return (len1 - len2);
		};	
	}

/* Prevent a function from being called twice. Beware of use in class/prototype definitions
 but useful when setup inside an objects "init". */
if (!Function.prototype.onlyOnce)
	{
	Function.prototype.onlyOnce = function()
		{
		var thisFunction = this,
			called = false;
		return function()
			{
			if (!called)
				{
				called = true;
				return thisFunction.apply(this, arguments);
				}
			};
		};
	}

if (!Array.isArray)
	{
	Array.isArray = function(arg) 
		{
		return Object.prototype.toString.call(arg) === '[object Array]';
		};
	}

if (!Array.prototype.flatten)
	{
	Array.prototype.flatten = function ()
		{
		var R, j, k, v, t;
		var len = this.length >>> 0;
		k = 0;
		t = 0;
		while (k < len)
			{
			v = this[ k ];
			t += Array.isArray( v ) ? v.length : 1;
			k++;
			}
		R = new Array(t);
		k = 0;
		j = 0;
		while (k < len)
			{
			v = A[ k ];
			k++;
			if ( Array.isArray( v ) )
				{
				t = v.length;
				for ( var i = 0; i < t; i++ )
					{
					R[ j ] = v[ i ];
					j++;
					}
				}
			else
				{
				R[ j ] = v;
				j++;
				}
			}
		return R;
		};
	}

if (!Array.prototype.flatMap)
	{
	Array.prototype.flatMap = function (fun /*, context */)
		{
		var A, R, j, k, v, t;
		var len = this.length >>> 0;
		var context = arguments[1];
		A = new Array(len);
		k = 0;
		t = 0;
		while (k < len)
			{
			v = A[ k ] = fun.call(context, this[ k ], k, this);
			t += Array.isArray( v ) ? v.length : 1;
			k++;
			}
		R = new Array(t);
		k = 0;
		j = 0;
		while (k < len)
			{
			v = A[ k ];
			k++;
			if ( Array.isArray( v ) )
				{
				t = v.length;
				for ( var i = 0; i < t; i++ )
					{
					R[ j ] = v[ i ];
					j++;
					}
				}
			else
				{
				R[ j ] = v;
				j++;
				}
			}
		return R;
		};
	}
