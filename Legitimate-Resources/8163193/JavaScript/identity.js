if (typeof PAYPAL == 'undefined' || !PAYPAL) {
	var PAYPAL = {};
}

PAYPAL.apps = PAYPAL.apps || {};

(function() {

	var defaultConfig = {
		// DOM element which triggers the flow
		trigger : null
	};

	/**
	 * Creates an instance of the in-context UI
	 * 
	 * @param {Object}
	 *            userConfig Overrides to the default configuration
	 */
	PAYPAL.apps.IdentityFlow = function(userConfig) {
		var that = this;

		// setup
		that._init(userConfig);

		return {
			/**
			 * Public method to add a trigger outside of the constructor
			 * 
			 * @param {HTMLElement|String}
			 *            el The element to set the click event on
			 */
			setTrigger : function(el) {
				that._setTrigger(el);
			}
		};
	};

	PAYPAL.apps.IdentityFlow.prototype = {

		/**
		 * Name of the window that's created
		 */
		name : '_PPIdentityWindow_',

		popupWidth : 400,

		popupHeight : 550,

		/**
		 * Initial setup
		 * 
		 * @param {Object}
		 *            userConfig Overrides to the default configuration: see
		 *            defaultConfig.
		 */
		_init : function(userConfig) {

			if (userConfig) {
				for ( var key in defaultConfig) {
					if (typeof userConfig[key] !== 'undefined') {
						this[key] = userConfig[key];
					} else {
						this[key] = defaultConfig[key];
					}
				}
			}

			if (this.trigger) {
				this._setTrigger(this.trigger);
			}
		},

		/**
		 * Adds a click event to an element which initiates the flow
		 * 
		 * @param {HTMLElement[]|String[]}
		 *            el The element to attach the click event to
		 * @return {Boolean} True if the trigger is active and false if it
		 *         failed
		 */
		_setTrigger : function(el) {

			// process an array if passed
			if (el.constructor.toString().indexOf('Array') > -1) {
				for ( var i = 0; i < el.length; i++) {
					this._setTrigger(el[i]);
				}

				// otherwise process a single element
			} else {
				el = (typeof el == 'string') ? document.getElementById(el) : el;

				// forms
				if (el && el.form) {
					el.form.target = this.name;
					// links
				} else if (el && el.tagName.toLowerCase() == 'a') {
					el.target = this.name;
				} else {
					return false;
				}

				addEvent(el, 'click', this._triggerClickEvent, this);
			}
		},

		/**
		 * Custom event which fires on click of the trigger element(s)
		 * 
		 * @param {Event}
		 *            e The event object
		 */
		_triggerClickEvent : function(e) {

			var left, top, win;

			if (window.outerWidth) {
				left = Math.round((window.outerWidth - this.popupWidth) / 2)
						+ window.screenX;
				top = Math.round((window.outerHeight - this.popupHeight) / 2)
						+ window.screenY;
			} else if (window.screen.width) {
				left = Math.round((window.screen.width - this.popupWidth) / 2);
				top = Math.round((window.screen.height - this.popupHeight) / 2);
			}

			win = window
					.open(
							'',
							this.name,
							'top='
									+ top
									+ ', left='
									+ left
									+ ', width='
									+ this.popupWidth
									+ ', height='
									+ this.popupHeight
									+ ', location=1, status=1, toolbar=0, menubar=0, resizable=1, scrollbars=1');
		}

	}

	/* Helper Methods */

	/**
	 * Storage object for all events; used to obtain exact signature when
	 * removing events
	 */
	var eventCache = [];

	/**
	 * Normalized method of adding an event to an element
	 * 
	 * @param {HTMLElement}
	 *            obj The object to attach the event to
	 * @param {String}
	 *            type The type of event minus the "on"
	 * @param {Function}
	 *            fn The callback function to add
	 * @param {Object}
	 *            scope A custom scope to use in the callback (optional)
	 */
	function addEvent(obj, type, fn, scope) {
		scope = scope || obj;

		var wrappedFn;

		if (obj.addEventListener) {
			wrappedFn = function(e) {
				fn.call(scope, e);
			};
			obj.addEventListener(type, wrappedFn, false);
		} else if (obj.attachEvent) {
			wrappedFn = function() {
				var e = window.event;
				e.target = e.target || e.srcElement;

				e.preventDefault = function() {
					window.event.returnValue = false;
				};

				fn.call(scope, e);
			};

			obj.attachEvent('on' + type, wrappedFn);
		}

		eventCache.push([ obj, type, fn, wrappedFn ]);
	}

	/**
	 * Normalized method of removing an event from an element
	 * 
	 * @param {HTMLElement}
	 *            obj The object to attach the event to
	 * @param {String}
	 *            type The type of event minus the "on"
	 * @param {Function}
	 *            fn The callback function to remove
	 */
	function removeEvent(obj, type, fn) {
		var wrappedFn, item, len, i;

		for (i = 0; i < eventCache.length; i++) {
			item = eventCache[i];

			if (item[0] == obj && item[1] == type && item[2] == fn) {
				wrappedFn = item[3];

				if (wrappedFn) {
					if (obj.removeEventListener) {
						obj.removeEventListener(type, wrappedFn, false);
					} else if (obj.detachEvent) {
						obj.detachEvent('on' + type, wrappedFn);
					}
				}
			}
		}
	}

}());
