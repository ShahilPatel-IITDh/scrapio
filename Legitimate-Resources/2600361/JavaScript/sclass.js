/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
var initializing = false, fnTest = /xyz/.test(function () {xyz;}) ? /\b_super\b/ : /.*/;

// The base Class implementation (does nothing)
this.SClass = function () {};

// Create a new Class that inherits from this class
SClass.extend = function (prop)
	{
	var _super = this.prototype;

	// Instantiate a base class (but only create the instance,
	// don't run the init constructor)
	initializing = true;
	var prototype = new this();
	initializing = false;

	// The dummy class constructor
	function Class()
		{
		// All construction is actually done in the init method
		if (!initializing && this.init)
			this.init.apply(this, arguments);
		}
	var isFunction = function( obj )
		{
		if ( typeof obj === 'undefined' || obj == null ) return false;
		return Object.prototype.toString.call( obj ) == "[object Function]";
		};
	// Copy the properties over onto the new prototype
	for (var name in prop)
		{
		// Check if we're overwriting an existing function
		prototype[name] = isFunction( prop[name] ) &&
			isFunction( _super[name] ) && fnTest.test(prop[name]) ?
			(function (name, fn)
				{
				return function ()
					{
					var tmp = this._super;
//					var tmpClass = this._class;
//					var tmpSuperClass = this._superClass;

					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = _super[name];
//					this._class = Class;
//					this._superClass = _super;

					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret;
					var ce = null;
					try { ret = fn.apply(this, arguments); }
					catch(e){ce = e;}
					this._super = tmp;
					if ( ce ) throw ce;
					return ret;
					};
				})(name, prop[name]) :
			prop[name];
		}

	// Populate our constructed prototype object
	Class.prototype = prototype;

	// Enforce the constructor to be what we expect
	Class.prototype.constructor = Class;

	// And make this class extendable
	Class.extend = arguments.callee;

	return Class;
	};
})();
