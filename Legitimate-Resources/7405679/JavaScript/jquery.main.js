var isPublic = location.pathname.indexOf('/LEAP') == -1;
// page init
jQuery(function($){
	$('#nav .li1:last-child').addClass('mark').addClass('rightside');
	$('#sub-nav .li1:last-child').addClass('rightside');
	$('.promo .holder img').each(function(){
		if( $(this).parent('p').length){ $(this).unwrap(); }
	});
	$('.promo .holder .btn').each(function(){
		if( $(this).parent('p').length ){ $(this).unwrap(); }
	});
	initCufon();
	initInputs();
	initTouchNav();
	initDropDownClasses();
});

// cufon replace init
function initCufon() {
	Cufon.replace('h3, .promo .block .txt p, .buttons .holder, .promo .over-block p,  .promo .over-block .txt1,  .promo .over-block .txt2, #content h6, .button1 .txt, #sidebar .block p, #sidebar .block .title, #sidebar .box .txt', { fontFamily: 'opensans' });
	Cufon.replace('#sub-nav > li > a, .buttons .button .title, .button1 .title, #sidebar .block .title strong, #sidebar .box .title', { fontFamily: 'opensans-semibold', hover: true });
	Cufon.replace('#nav > li:not(.mark) > a', { fontFamily: 'opensans-semibold', hover: true });
	Cufon.replace('.promo .over-block .mark, h2:not(.title), h4, h5, .buttons .button .mark, #nav > .mark > a, .button1 .holder strong, #sidebar .box .mark, #footer .col .title, #footer .sub-title', { fontFamily: 'opensans-bold' });

	// refresh cufon on hover
	/* var fixHover = function(elementSelector, cufonSelector) {
		jQuery(elementSelector).mouseout(function() {
			setTimeout(function() {
				Cufon.refresh(cufonSelector)
			}, 10);
		});
	};
	fixHover('#nav > li', '#nav > li:not(.mark) > a'); */
}

// clear inputs on focus
function initInputs() {
	PlaceholderInput.replaceByOptions({
		// filter options
		clearInputs: isPublic,
		clearTextareas: isPublic,
		clearPasswords: isPublic,
		skipClass: 'default',
		
		// input options
		wrapWithElement: false,
		showUntilTyping: false,
		getParentByClass: false,
		placeholderAttr: 'value'
	});
}

// handle dropdowns on mobile devices
function initTouchNav() {
	new touchNav({
		navBlock: 'nav'
	});
	new touchNav({
		navBlock: 'sub-nav'
	});
}

// placeholder class
;(function(){
	var placeholderCollection = [];
	PlaceholderInput = function() {
		this.options = {
			element:null,
			showUntilTyping:false,
			wrapWithElement:false,
			getParentByClass:false,
			placeholderAttr:'value',
			inputFocusClass:'focus',
			inputActiveClass:'text-active',
			parentFocusClass:'parent-focus',
			parentActiveClass:'parent-active',
			labelFocusClass:'label-focus',
			labelActiveClass:'label-active',
			fakeElementClass:'input-placeholder-text'
		}
		placeholderCollection.push(this);
		this.init.apply(this,arguments);
	}
	PlaceholderInput.refreshAllInputs = function(except) {
		for(var i = 0; i < placeholderCollection.length; i++) {
			if(except !== placeholderCollection[i]) {
				placeholderCollection[i].refreshState();
			}
		}
	}
	PlaceholderInput.replaceByOptions = function(opt) {
		var inputs = [].concat(
			convertToArray(document.getElementsByTagName('input')),
			convertToArray(document.getElementsByTagName('textarea'))
		);
		for(var i = 0; i < inputs.length; i++) {
			if(inputs[i].className.indexOf(opt.skipClass) < 0) {
				var inputType = getInputType(inputs[i]);
				if((opt.clearInputs && (inputType === 'text' || inputType === 'email')) ||
					(opt.clearTextareas && inputType === 'textarea') || 
					(opt.clearPasswords && inputType === 'password')
				) {
					new PlaceholderInput({
						element:inputs[i],
						wrapWithElement:opt.wrapWithElement,
						showUntilTyping:opt.showUntilTyping,
						getParentByClass:opt.getParentByClass,
						placeholderAttr: inputs[i].getAttribute('placeholder') ? 'placeholder' : opt.placeholderAttr
					});
				}
			}
		}
	}
	PlaceholderInput.prototype = {
		init: function(opt) {
			this.setOptions(opt);
			if(this.element && this.element.PlaceholderInst) {
				this.element.PlaceholderInst.refreshClasses();
			} else {
				this.element.PlaceholderInst = this;
				if(this.elementType !== 'radio' || this.elementType !== 'checkbox' || this.elementType !== 'file') {
					this.initElements();
					this.attachEvents();
					this.refreshClasses();
				}
			}
		},
		setOptions: function(opt) {
			for(var p in opt) {
				if(opt.hasOwnProperty(p)) {
					this.options[p] = opt[p];
				}
			}
			if(this.options.element) {
				this.element = this.options.element;
				this.elementType = getInputType(this.element);
				this.wrapWithElement = (this.elementType === 'password' || this.options.showUntilTyping ? true : this.options.wrapWithElement);
				this.setPlaceholderValue(this.options.placeholderAttr);
			}
		},
		setPlaceholderValue: function(attr) {
			this.origValue = (attr === 'value' ? this.element.defaultValue : (this.element.getAttribute(attr) || ''));
			if(this.options.placeholderAttr !== 'value') {
				this.element.removeAttribute(this.options.placeholderAttr);
			}
		},
		initElements: function() {
			// create fake element if needed
			if(this.wrapWithElement) {
				this.fakeElement = document.createElement('span');
				this.fakeElement.className = this.options.fakeElementClass;
				this.fakeElement.innerHTML += this.origValue;
				this.fakeElement.style.color = getStyle(this.element, 'color');
				this.fakeElement.style.position = 'absolute';
				this.element.parentNode.insertBefore(this.fakeElement, this.element);
				
				if(this.element.value === this.origValue || !this.element.value) {
					this.element.value = '';
					this.togglePlaceholderText(true);
				} else {
					this.togglePlaceholderText(false);
				}
			} else if(!this.element.value && this.origValue.length) {
				this.element.value = this.origValue;
			}
			// get input label
			if(this.element.id) {
				this.labels = document.getElementsByTagName('label');
				for(var i = 0; i < this.labels.length; i++) {
					if(this.labels[i].htmlFor === this.element.id) {
						this.labelFor = this.labels[i];
						break;
					}
				}
			}
			// get parent node (or parentNode by className)
			this.elementParent = this.element.parentNode;
			if(typeof this.options.getParentByClass === 'string') {
				var el = this.element;
				while(el.parentNode) {
					if(hasClass(el.parentNode, this.options.getParentByClass)) {
						this.elementParent = el.parentNode;
						break;
					} else {
						el = el.parentNode;
					}
				}
			}
		},
		attachEvents: function() {
			this.element.onfocus = bindScope(this.focusHandler, this);
			this.element.onblur = bindScope(this.blurHandler, this);
			if(this.options.showUntilTyping) {
				this.element.onkeydown = bindScope(this.typingHandler, this);
				this.element.onpaste = bindScope(this.typingHandler, this);
			}
			if(this.wrapWithElement) this.fakeElement.onclick = bindScope(this.focusSetter, this);
		},
		togglePlaceholderText: function(state) {
			if(this.wrapWithElement) {
				this.fakeElement.style.display = state ? '' : 'none';
			} else {
				this.element.value = state ? this.origValue : '';
			}
		},
		focusSetter: function() {
			this.element.focus();
		},
		focusHandler: function() {
			clearInterval(this.checkerInterval);
			this.checkerInterval = setInterval(bindScope(this.intervalHandler,this), 1);
			this.focused = true;
			if(!this.element.value.length || this.element.value === this.origValue) {
				if(!this.options.showUntilTyping) {
					this.togglePlaceholderText(false);
				}
			}
			this.refreshClasses();
		},
		blurHandler: function() {
			clearInterval(this.checkerInterval);
			this.focused = false;
			if(!this.element.value.length || this.element.value === this.origValue) {
				this.togglePlaceholderText(true);
			}
			this.refreshClasses();
			PlaceholderInput.refreshAllInputs(this);
		},
		typingHandler: function() {
			setTimeout(bindScope(function(){
				if(this.element.value.length) {
					this.togglePlaceholderText(false);
					this.refreshClasses();
				}
			},this), 10);
		},
		intervalHandler: function() {
			if(typeof this.tmpValue === 'undefined') {
				this.tmpValue = this.element.value;
			}
			if(this.tmpValue != this.element.value) {
				PlaceholderInput.refreshAllInputs(this);
			}
		},
		refreshState: function() {
			if(this.wrapWithElement) {
				if(this.element.value.length && this.element.value !== this.origValue) {
					this.togglePlaceholderText(false);
				} else if(!this.element.value.length) {
					this.togglePlaceholderText(true);
				}
			}
			this.refreshClasses();
		},
		refreshClasses: function() {
			this.textActive = this.focused || (this.element.value.length && this.element.value !== this.origValue);
			this.setStateClass(this.element, this.options.inputFocusClass,this.focused);
			this.setStateClass(this.elementParent, this.options.parentFocusClass,this.focused);
			this.setStateClass(this.labelFor, this.options.labelFocusClass,this.focused);
			this.setStateClass(this.element, this.options.inputActiveClass, this.textActive);
			this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive);
			this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive);
		},
		setStateClass: function(el,cls,state) {
			if(!el) return; else if(state) addClass(el,cls); else removeClass(el,cls);
		}
	}
	
	// utility functions
	function convertToArray(collection) {
		var arr = [];
		for (var i = 0, ref = arr.length = collection.length; i < ref; i++) {
			arr[i] = collection[i];
		}
		return arr;
	}
	function getInputType(input) {
		return (input.type ? input.type : input.tagName).toLowerCase();
	}
	function hasClass(el,cls) {
		return el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	}
	function addClass(el,cls) {
		if (!hasClass(el,cls)) el.className += " "+cls;
	}
	function removeClass(el,cls) {
		if (hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	}
	function bindScope(f, scope) {
		return function() {return f.apply(scope, arguments)}
	}
	function getStyle(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	}
}());

// navigation accesibility module
function touchNav(opt) {
	this.options = {
		hoverClass: 'hover',
		menuItems: 'li',
		menuOpener: 'a',
		menuDrop: 'div',
		navBlock: null
	}
	for(var p in opt) {
		if(opt.hasOwnProperty(p)) {
			this.options[p] = opt[p];
		}
	}
	this.init();
}
touchNav.prototype = {
	init: function() {
		if(typeof this.options.navBlock === 'string') {
			this.menu = document.getElementById(this.options.navBlock);
		} else if(typeof this.options.navBlock === 'object') {
			this.menu = this.options.navBlock;
		}
		if(this.menu) {
			this.getElements();
			this.addEvents();
		}
	},
	getElements: function() {
		this.menuItems = this.menu.getElementsByTagName(this.options.menuItems);
	},
	getOpener: function(obj) {
		for(var i = 0; i < obj.childNodes.length; i++) {
			if(obj.childNodes[i].tagName && obj.childNodes[i].tagName.toLowerCase() == this.options.menuOpener.toLowerCase()) {
				return obj.childNodes[i];
			}
		}
		return false;
	},
	getDrop: function(obj) {
		for(var i = 0; i < obj.childNodes.length; i++) {
			if(obj.childNodes[i].tagName && obj.childNodes[i].tagName.toLowerCase() == this.options.menuDrop.toLowerCase()) {
				return obj.childNodes[i];
			}
		}
		return false;
	},
	addEvents: function() {
		// attach event handlers
		this.preventCurrentClick = true;
		for(var i = 0; i < this.menuItems.length; i++) {
			this.bind(function(i){
				var item = this.menuItems[i];
				// only for touch input devices
				if(this.isTouchDevice && this.getDrop(item)) {
					this.addHandler(this.getOpener(item), 'click', this.bind(this.clickHandler));
					this.addHandler(this.getOpener(item), 'touchstart', this.bind(function(){
						this.currentItem = item;
						this.currentLink = this.getOpener(item);
						this.pressHandler.apply(this, arguments);
					}));
				}
				// for desktop computers and touch devices
				this.addHandler(item, 'mouseover', this.bind(function(){
					this.currentItem = item;
					this.mouseoverHandler();
				}));
				this.addHandler(item, 'mouseout', this.bind(function(){
					this.currentItem = item;
					this.mouseoutHandler();
				}));
			})(i);
		}
		// hide dropdowns when clicking outside navigation
		if(this.isTouchDevice) {
			this.addHandler(document, 'touchstart', this.bind(this.clickOutsideHandler));
		}
	},
	mouseoverHandler: function() {
		this.addClass(this.currentItem, this.options.hoverClass);
	},
	mouseoutHandler: function() {
		this.removeClass(this.currentItem, this.options.hoverClass);
	},
	hideActiveDropdown: function() {
		for(var i = 0; i < this.menuItems.length; i++) {
			this.removeClass(this.menuItems[i], this.options.hoverClass);
		}
		this.activeParent = null;
	},
	pressHandler: function(e) {
		// hide previous drop (if active)
		if(this.currentItem != this.activeParent && !this.isParent(this.activeParent, this.currentLink)) {
			this.hideActiveDropdown();
		}
		// handle current drop
		this.activeParent = this.currentItem;
		if(this.hasClass(this.currentItem, this.options.hoverClass)) {
			this.preventCurrentClick = false;
		} else {
			this.preventEvent(e);
			this.preventCurrentClick = true;
			this.addClass(this.currentItem, this.options.hoverClass);
		}
	},
	clickHandler: function(e) {
		// prevent first click on link
		if(this.preventCurrentClick) {
			this.preventEvent(e);
		}
	},
	clickOutsideHandler: function(event) {
		var e = event.changedTouches ? event.changedTouches[0] : event;
		if(this.activeParent && !this.isParent(this.menu, e.target)) {
			this.hideActiveDropdown();
		}
	},
	preventEvent: function(e) {
		if(!e) e = window.event;
		if(e.preventDefault) e.preventDefault();
		e.returnValue = false;
	},
	isParent: function(parent, child) {
		while(child.parentNode) {
			if(child.parentNode == parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	isTouchDevice: (function() {
		try {
			return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) || navigator.userAgent.indexOf('IEMobile') != -1;
		} catch (e) {
			return false;
		}
	}()),
	addHandler: function(object, event, handler) {
		if (object.addEventListener) object.addEventListener(event, handler, false);
		else if (object.attachEvent) object.attachEvent('on' + event, handler);
	},
	removeHandler: function(object, event, handler) {
		if (object.removeEventListener) object.removeEventListener(event, handler, false);
		else if (object.detachEvent) object.detachEvent('on' + event, handler);
	},
	hasClass: function(obj,cname) {
		return (obj.className ? obj.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')) : false);
	},
	addClass: function(obj,cname) {
		if (!this.hasClass(obj,cname)) obj.className += " "+cname;
	},
	removeClass: function(obj,cname) {
		if (this.hasClass(obj,cname)) obj.className=obj.className.replace(new RegExp('(\\s|^)'+cname+'(\\s|$)'),' ');
	},
	bind: function(func, scope){
		var newScope = scope || this;
		return function() {
			return func.apply(newScope, arguments);
		}
	}
}

// add classes if item has dropdown
function initDropDownClasses() {
	var nav = document.getElementById("nav");
	if(nav) {
		var lis = nav.getElementsByTagName("li");
		for (var i=0; i<lis.length; i++) {
			if(lis[i].getElementsByTagName("ul").length > 0) {
				lis[i].className += " has-drop-down"
				lis[i].getElementsByTagName("a")[0].className += " has-drop-down-a"
			}
		}
	}
}