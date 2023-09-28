/* 			####### Animator.js code starts here ########## */
		/*  
		Animator.js 1.1.9
		
		This library is released under the BSD license:

		Copyright (c) 2006, Bernard Sumption. All rights reserved.
		
		Redistribution and use in source and binary forms, with or without
		modification, are permitted provided that the following conditions are met:
		
		Redistributions of source code must retain the above copyright notice, this
		list of conditions and the following disclaimer. Redistributions in binary
		form must reproduce the above copyright notice, this list of conditions and
		the following disclaimer in the documentation and/or other materials
		provided with the distribution. Neither the name BernieCode nor
		the names of its contributors may be used to endorse or promote products
		derived from this software without specific prior written permission. 
		
		THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
		AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
		ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR
		ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
		DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
		SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
		CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
		LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
		OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
		DAMAGE.

	*/


	// Applies a sequence of numbers between 0 and 1 to a number of subjects
	// construct - see setOptions for parameters
	function Animator(options) {
		this.setOptions(options);
		var _this = this;
		this.timerDelegate = function(){_this.onTimerEvent()};
		this.subjects = [];
		this.target = 0;
		this.state = 0;
		this.lastTime = null;
	};
	Animator.prototype = {
		// apply defaults
		setOptions: function(options) {
			this.options = Animator.applyDefaults({
				interval: 20,  // time between animation frames
				duration: 400, // length of animation
				onComplete: function(){},
				onStep: function(){},
				transition: Animator.tx.easeInOut
			}, options);
		},
		// animate from the current state to provided value
		seekTo: function(to) {
			this.seekFromTo(this.state, to);
		},
		// animate from the current state to provided value
		seekFromTo: function(from, to) {
			this.target = Math.max(0, Math.min(1, to));
			this.state = Math.max(0, Math.min(1, from));
			this.lastTime = new Date().getTime();
			if (!this.intervalId) {
				this.intervalId = window.setInterval(this.timerDelegate, this.options.interval);
			}
		},
		// animate from the current state to provided value
		jumpTo: function(to) {
			this.target = this.state = Math.max(0, Math.min(1, to));
			this.propagate();
		},
		// seek to the opposite of the current target
		toggle: function() {
			this.seekTo(1 - this.target);
		},
		// add a function or an object with a method setState(state) that will be called with a number
		// between 0 and 1 on each frame of the animation
		addSubject: function(subject) {
			this.subjects[this.subjects.length] = subject;
			return this;
		},
		// remove all subjects
		clearSubjects: function() {
			this.subjects = [];
		},
		// forward the current state to the animation subjects
		propagate: function() {
			var value = this.options.transition(this.state);
			for (var i=0; i<this.subjects.length; i++) {
				if (this.subjects[i].setState) {
					this.subjects[i].setState(value);
				} else {
					this.subjects[i](value);
				}
			}
		},
		// called once per frame to update the current state
		onTimerEvent: function() {
			var now = new Date().getTime();
			var timePassed = now - this.lastTime;
			this.lastTime = now;
			var movement = (timePassed / this.options.duration) * (this.state < this.target ? 1 : -1);
			if (Math.abs(movement) >= Math.abs(this.state - this.target)) {
				this.state = this.target;
			} else {
				this.state += movement;
			}
			
			try {
				this.propagate();
			} finally {
				this.options.onStep.call(this);
				if (this.target == this.state) {
					window.clearInterval(this.intervalId);
					this.intervalId = null;
					this.options.onComplete.call(this);
				}
			}
		},
		// shortcuts
		play: function() {this.seekFromTo(0, 1)},
		reverse: function() {this.seekFromTo(1, 0)},
		// return a string describing this Animator, for debugging
		inspect: function() {
			var str = "#<Animator:\n";
			for (var i=0; i<this.subjects.length; i++) {
				str += this.subjects[i].inspect();
			}
			str += ">";
			return str;
		}
	}
	// merge the properties of two objects
	Animator.applyDefaults = function(defaults, prefs) {
		prefs = prefs || {};
		var prop, result = {};
		for (prop in defaults) result[prop] = prefs[prop] !== undefined ? prefs[prop] : defaults[prop];
		return result;
	}
	// make an array from any object
	Animator.makeArray = function(o) {
		if (o == null) return [];
		if (!o.length) return [o];
		var result = [];
		for (var i=0; i<o.length; i++) result[i] = o[i];
		return result;
	}
	// convert a dash-delimited-property to a camelCaseProperty (c/o Prototype, thanks Sam!)
	Animator.camelize = function(string) {
		var oStringList = string.split('-');
		if (oStringList.length == 1) return oStringList[0];
		
		var camelizedString = string.indexOf('-') == 0
			? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1)
			: oStringList[0];
		
		for (var i = 1, len = oStringList.length; i < len; i++) {
			var s = oStringList[i];
			camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
		}
		return camelizedString;
	}
	// syntactic sugar for creating CSSStyleSubjects 
	Animator.apply = function(el, style, options) {
		if (style instanceof Array) {
			return new Animator(options).addSubject(new CSSStyleSubject(el, style[0], style[1]));
		}
		return new Animator(options).addSubject(new CSSStyleSubject(el, style));
	}
	// make a transition function that gradually accelerates. pass a=1 for smooth
	// gravitational acceleration, higher values for an exaggerated effect
	Animator.makeEaseIn = function(a) {
		return function(state) {
			return Math.pow(state, a*2); 
		}
	}
	// as makeEaseIn but for deceleration
	Animator.makeEaseOut = function(a) {
		return function(state) {
			return 1 - Math.pow(1 - state, a*2); 
		}
	}
	// make a transition function that, like an object with momentum being attracted to a point,
	// goes past the target then returns
	Animator.makeElastic = function(bounces) {
		return function(state) {
			state = Animator.tx.easeInOut(state);
			return ((1-Math.cos(state * Math.PI * bounces)) * (1 - state)) + state; 
		}
	}
	// make an Attack Decay Sustain Release envelope that starts and finishes on the same level
	// 
	Animator.makeADSR = function(attackEnd, decayEnd, sustainEnd, sustainLevel) {
		if (sustainLevel == null) sustainLevel = 0.5;
		return function(state) {
			if (state < attackEnd) {
				return state / attackEnd;
			}
			if (state < decayEnd) {
				return 1 - ((state - attackEnd) / (decayEnd - attackEnd) * (1 - sustainLevel));
			}
			if (state < sustainEnd) {
				return sustainLevel;
			}
			return sustainLevel * (1 - ((state - sustainEnd) / (1 - sustainEnd)));
		}
	}
	// make a transition function that, like a ball falling to floor, reaches the target and/
	// bounces back again
	Animator.makeBounce = function(bounces) {
		var fn = Animator.makeElastic(bounces);
		return function(state) {
			state = fn(state); 
			return state <= 1 ? state : 2-state;
		}
	}
	 
	// pre-made transition functions to use with the 'transition' option
	Animator.tx = {
		easeInOut: function(pos){
			return ((-Math.cos(pos*Math.PI)/2) + 0.5);
		},
		linear: function(x) {
			return x;
		},
		easeIn: Animator.makeEaseIn(1.5),
		easeOut: Animator.makeEaseOut(1.5),
		strongEaseIn: Animator.makeEaseIn(2.5),
		strongEaseOut: Animator.makeEaseOut(2.5),
		elastic: Animator.makeElastic(1),
		veryElastic: Animator.makeElastic(3),
		bouncy: Animator.makeBounce(1),
		veryBouncy: Animator.makeBounce(3)
	}

	// animates a pixel-based style property between two integer values
	function NumericalStyleSubject(els, property, from, to, units) {
		this.els = Animator.makeArray(els);
		if (property == 'opacity' && window.ActiveXObject) {
			this.property = 'filter';
		} else {
			this.property = Animator.camelize(property);
		}
		this.from = parseFloat(from);
		this.to = parseFloat(to);
		this.units = units != null ? units : 'px';
	}
	NumericalStyleSubject.prototype = {
		setState: function(state) {
			var style = this.getStyle(state);
			var visibility = (this.property == 'opacity' && state == 0) ? 'hidden' : '';
			var j=0;
			for (var i=0; i<this.els.length; i++) {
				try {
					this.els[i].style[this.property] = style;
				} catch (e) {
					// ignore fontWeight - intermediate numerical values cause exeptions in firefox
					if (this.property != 'fontWeight') throw e;
				}
				if (j++ > 20) return;
			}
		},
		getStyle: function(state) {
			state = this.from + ((this.to - this.from) * state);
			if (this.property == 'filter') return "alpha(opacity=" + Math.round(state*100) + ")";
			if (this.property == 'opacity') return state;
			return Math.round(state) + this.units;
		},
		inspect: function() {
			return "\t" + this.property + "(" + this.from + this.units + " to " + this.to + this.units + ")\n";
		}
	}

	// animates a colour based style property between two hex values
	function ColorStyleSubject(els, property, from, to) {
		this.els = Animator.makeArray(els);
		this.property = Animator.camelize(property);
		this.to = this.expandColor(to);
		this.from = this.expandColor(from);
		this.origFrom = from;
		this.origTo = to;
	}

	ColorStyleSubject.prototype = {
		// parse "#FFFF00" to [256, 256, 0]
		expandColor: function(color) {
			var hexColor, red, green, blue;
			hexColor = ColorStyleSubject.parseColor(color);
			if (hexColor) {
				red = parseInt(hexColor.slice(1, 3), 16);
				green = parseInt(hexColor.slice(3, 5), 16);
				blue = parseInt(hexColor.slice(5, 7), 16);
				return [red,green,blue]
			}
			if (window.DEBUG) {
				//alert("Invalid colour: '" + color + "'");
				alert(ICaltgopub.pa_txt1 + color + "' ");
			}
		},
		getValueForState: function(color, state) {
			return Math.round(this.from[color] + ((this.to[color] - this.from[color]) * state));
		},
		setState: function(state) {
			var color = '#'
					+ ColorStyleSubject.toColorPart(this.getValueForState(0, state))
					+ ColorStyleSubject.toColorPart(this.getValueForState(1, state))
					+ ColorStyleSubject.toColorPart(this.getValueForState(2, state));
			for (var i=0; i<this.els.length; i++) {
				this.els[i].style[this.property] = color;
			}
		},
		inspect: function() {
			return "\t" + this.property + "(" + this.origFrom + " to " + this.origTo + ")\n";
		}
	}

	// return a properly formatted 6-digit hex colour spec, or false
	ColorStyleSubject.parseColor = function(string) {
		var color = '#', match;
		if(match = ColorStyleSubject.parseColor.rgbRe.exec(string)) {
			var part;
			for (var i=1; i<=3; i++) {
				part = Math.max(0, Math.min(255, parseInt(match[i])));
				color += ColorStyleSubject.toColorPart(part);
			}
			return color;
		}
		if (match = ColorStyleSubject.parseColor.hexRe.exec(string)) {
			if(match[1].length == 3) {
				for (var i=0; i<3; i++) {
					color += match[1].charAt(i) + match[1].charAt(i);
				}
				return color;
			}
			return '#' + match[1];
		}
		return false;
	}
	// convert a number to a 2 digit hex string
	ColorStyleSubject.toColorPart = function(number) {
		if (number > 255) number = 255;
		var digits = number.toString(16);
		if (number < 16) return '0' + digits;
		return digits;
	}
	ColorStyleSubject.parseColor.rgbRe = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
	ColorStyleSubject.parseColor.hexRe = /^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

	// Animates discrete styles, i.e. ones that do not scale but have discrete values
	// that can't be interpolated
	function DiscreteStyleSubject(els, property, from, to, threshold) {
		this.els = Animator.makeArray(els);
		this.property = Animator.camelize(property);
		this.from = from;
		this.to = to;
		this.threshold = threshold || 0.5;
	}

	DiscreteStyleSubject.prototype = {
		setState: function(state) {
			var j=0;
			for (var i=0; i<this.els.length; i++) {
				this.els[i].style[this.property] = state <= this.threshold ? this.from : this.to; 
			}
		},
		inspect: function() {
			return "\t" + this.property + "(" + this.from + " to " + this.to + " @ " + this.threshold + ")\n";
		}
	}

	// animates between two styles defined using CSS.
	// if style1 and style2 are present, animate between them, if only style1
	// is present, animate between the element's current style and style1
	function CSSStyleSubject(els, style1, style2) {
		els = Animator.makeArray(els);
		this.subjects = [];
		if (els.length == 0) return;
		var prop, toStyle, fromStyle;
		if (style2) {
			fromStyle = this.parseStyle(style1, els[0]);
			toStyle = this.parseStyle(style2, els[0]);
		} else {
			toStyle = this.parseStyle(style1, els[0]);
			fromStyle = {};
			for (prop in toStyle) {
				fromStyle[prop] = CSSStyleSubject.getStyle(els[0], prop);
			}
		}
		// remove unchanging properties
		var prop;
		for (prop in fromStyle) {
			if (fromStyle[prop] == toStyle[prop]) {
				delete fromStyle[prop];
				delete toStyle[prop];
			}
		}
		// discover the type (numerical or colour) of each style
		var prop, units, match, type, from, to;
		for (prop in fromStyle) {
			var fromProp = String(fromStyle[prop]);
			var toProp = String(toStyle[prop]);
			if (toStyle[prop] == null) {
				if (window.DEBUG) alert(ICaltgopub.pa_txt2 + prop + '"');
				continue;
			}
			
			if (from = ColorStyleSubject.parseColor(fromProp)) {
				to = ColorStyleSubject.parseColor(toProp);
				type = ColorStyleSubject;
			} else if (fromProp.match(CSSStyleSubject.numericalRe)
					&& toProp.match(CSSStyleSubject.numericalRe)) {
				from = parseFloat(fromProp);
				to = parseFloat(toProp);
				type = NumericalStyleSubject;
				match = CSSStyleSubject.numericalRe.exec(fromProp);
				var reResult = CSSStyleSubject.numericalRe.exec(toProp);
				if (match[1] != null) {
					units = match[1];
				} else if (reResult[1] != null) {
					units = reResult[1];
				} else {
					units = reResult;
				}
			} else if (fromProp.match(CSSStyleSubject.discreteRe)
					&& toProp.match(CSSStyleSubject.discreteRe)) {
				from = fromProp;
				to = toProp;
				type = DiscreteStyleSubject;
				units = 0;   // hack - how to get an animator option down to here
			} else {
				if (window.DEBUG) {
					alert(ICaltgopub.pa_txt3 + prop + ": '" + fromStyle[prop] + "'");
				}
				continue;
			}
			this.subjects[this.subjects.length] = new type(els, prop, from, to, units);
		}
	}

	CSSStyleSubject.prototype = {
		// parses "width: 400px; color: #FFBB2E" to {width: "400px", color: "#FFBB2E"}
		parseStyle: function(style, el) {
			var rtn = {};
			// if style is a rule set
			if (style.indexOf(":") != -1) {
				var styles = style.split(";");
				for (var i=0; i<styles.length; i++) {
					var parts = CSSStyleSubject.ruleRe.exec(styles[i]);
					if (parts) {
						rtn[parts[1]] = parts[2];
					}
				}
			}
			// else assume style is a class name
			else {
				var prop, value, oldClass;
				oldClass = el.className;
				el.className = style;
				for (var i=0; i<CSSStyleSubject.cssProperties.length; i++) {
					prop = CSSStyleSubject.cssProperties[i];
					value = CSSStyleSubject.getStyle(el, prop);
					if (value != null) {
						rtn[prop] = value;
					}
				}
				el.className = oldClass;
			}
			return rtn;
			
		},
		setState: function(state) {
			for (var i=0; i<this.subjects.length; i++) {
				this.subjects[i].setState(state);
			}
		},
		inspect: function() {
			var str = "";
			for (var i=0; i<this.subjects.length; i++) {
				str += this.subjects[i].inspect();
			}
			return str;
		}
	}
	// get the current value of a css property, 
	/*
	CSSStyleSubject.getStyle = function(el, property){
		var style;
		if(document.defaultView && document.defaultView.getComputedStyle){
			style = document.defaultView.getComputedStyle(el, "").getPropertyValue(property);
			if (style) {
				return style;
			} else {
				return('none');
			}
		}
		
		
		property = Animator.camelize(property);
		if(el.currentStyle){
			style = el.currentStyle[property];
		}
		return style || el.style[property]
	}
	*/
	CSSStyleSubject.getStyle = function(el, property){
	if (document.defaultView) {
		var computedStyle = document.defaultView.getComputedStyle(el, null);
		// Safari returns null from computed style if the display of the element is none
		// if this is the case, then we just return 'none' if the user is asking for the
		// 'display' property, or we temporarily set the display to 'block' and re-fetch
		// the computed style
		if (computedStyle) {
			style = document.defaultView.getComputedStyle(el, "").getPropertyValue(property);
		} else if (property == 'display') {
			style = 'none';
		} else {
			property = Animator.camelize(property);
		if(el.currentStyle){
			style = el.currentStyle[property];
		}
		}
		return style || el.style[property];
	}
	}

	CSSStyleSubject.ruleRe = /^\s*([a-zA-Z\-]+)\s*:\s*(\S(.+\S)?)\s*$/;
	CSSStyleSubject.numericalRe = /^-?\d+(?:\.\d+)?(%|[a-zA-Z]{2})?$/;
	CSSStyleSubject.discreteRe = /^\w+$/;

	// required because the style object of elements isn't enumerable in Safari
	/*
	CSSStyleSubject.cssProperties = ['background-color','border','border-color','border-spacing',
	'border-style','border-top','border-right','border-bottom','border-left','border-top-color',
	'border-right-color','border-bottom-color','border-left-color','border-top-width','border-right-width',
	'border-bottom-width','border-left-width','border-width','bottom','color','font-size','font-size-adjust',
	'font-stretch','font-style','height','left','letter-spacing','line-height','margin','margin-top',
	'margin-right','margin-bottom','margin-left','marker-offset','max-height','max-width','min-height',
	'min-width','orphans','outline','outline-color','outline-style','outline-width','overflow','padding',
	'padding-top','padding-right','padding-bottom','padding-left','quotes','right','size','text-indent',
	'top','width','word-spacing','z-index','opacity','outline-offset'];*/


	CSSStyleSubject.cssProperties = ['azimuth','background','background-attachment','background-color','background-image','background-position','background-repeat','border-collapse','border-color','border-spacing','border-style','border-top','border-top-color','border-right-color','border-bottom-color','border-left-color','border-top-style','border-right-style','border-bottom-style','border-left-style','border-top-width','border-right-width','border-bottom-width','border-left-width','border-width','bottom','clear','clip','color','content','cursor','direction','display','elevation','empty-cells','css-float','font','font-family','font-size','font-size-adjust','font-stretch','font-style','font-variant','font-weight','height','left','letter-spacing','line-height','list-style','list-style-image','list-style-position','list-style-type','margin','margin-top','margin-right','margin-bottom','margin-left','max-height','max-width','min-height','min-width','orphans','outline','outline-color','outline-style','outline-width','overflow','padding','padding-top','padding-right','padding-bottom','padding-left','pause','position','right','size','table-layout','text-align','text-decoration','text-indent','text-shadow','text-transform','top','vertical-align','visibility','white-space','width','word-spacing','z-index','opacity','outline-offset','overflow-x','overflow-y'];


	// chains several Animator objects together
	function AnimatorChain(animators, options) {
		this.animators = animators;
		this.setOptions(options);
		for (var i=0; i<this.animators.length; i++) {
			this.listenTo(this.animators[i]);
		}
		this.forwards = false;
		this.current = 0;
	}

	AnimatorChain.prototype = {
		// apply defaults
		setOptions: function(options) {
			this.options = Animator.applyDefaults({
				// by default, each call to AnimatorChain.play() calls jumpTo(0) of each animator
				// before playing, which can cause flickering if you have multiple animators all
				// targeting the same element. Set this to false to avoid this.
				resetOnPlay: true
			}, options);
		},
		// play each animator in turn
		play: function() {
			this.forwards = true;
			this.current = -1;
			if (this.options.resetOnPlay) {
				for (var i=0; i<this.animators.length; i++) {
					this.animators[i].jumpTo(0);
				}
			}
			this.advance();
		},
		// play all animators backwards
		reverse: function() {
			this.forwards = false;
			this.current = this.animators.length;
			if (this.options.resetOnPlay) {
				for (var i=0; i<this.animators.length; i++) {
					this.animators[i].jumpTo(1);
				}
			}
			this.advance();
		},
		// if we have just play()'d, then call reverse(), and vice versa
		toggle: function() {
			if (this.forwards) {
				this.seekTo(0);
			} else {
				this.seekTo(1);
			}
		},
		// internal: install an event listener on an animator's onComplete option
		// to trigger the next animator
		listenTo: function(animator) {
			var oldOnComplete = animator.options.onComplete;
			var _this = this;
			animator.options.onComplete = function() {
				if (oldOnComplete) oldOnComplete.call(animator);
				_this.advance();
			}
		},
		// play the next animator
		advance: function() {
			if (this.forwards) {
				if (this.animators[this.current + 1] == null) return;
				this.current++;
				this.animators[this.current].play();
			} else {
				if (this.animators[this.current - 1] == null) return;
				this.current--;
				this.animators[this.current].reverse();
			}
		},
		// this function is provided for drop-in compatibility with Animator objects,
		// but only accepts 0 and 1 as target values
		seekTo: function(target) {
			if (target <= 0) {
				this.forwards = false;
				this.animators[this.current].seekTo(0);
			} else {
				this.forwards = true;
				this.animators[this.current].seekTo(1);
			}
		}
	}

	// an Accordion is a class that creates and controls a number of Animators. An array of elements is passed in,
	// and for each element an Animator and a activator button is created. When an Animator's activator button is
	// clicked, the Animator and all before it seek to 0, and all Animators after it seek to 1. This can be used to
	// create the classic Accordion effect, hence the name.
	// see setOptions for arguments
	function Accordion(options) {
		this.setOptions(options);
		var selected = this.options.initialSection, current;
		if (this.options.rememberance) {
			current = document.location.hash.substring(1);
		}
		this.rememberanceTexts = [];
		this.ans = [];
		var _this = this;
		for (var i=0; i<this.options.sections.length; i++) {
			var el = this.options.sections[i];
			var an = new Animator(this.options.animatorOptions);
			var from = this.options.from + (this.options.shift * i);
			var to = this.options.to + (this.options.shift * i);
			an.addSubject(new NumericalStyleSubject(el, this.options.property, from, to, this.options.units));
			an.jumpTo(0);
			var activator = this.options.getActivator(el);
			activator.index = i;
			activator.onclick = function(){_this.show(this.index)};
			this.ans[this.ans.length] = an;
			this.rememberanceTexts[i] = activator.innerHTML.replace(/\s/g, "");
			if (this.rememberanceTexts[i] === current) {
				selected = i;
			}
		}
		this.show(selected);
	}

	Accordion.prototype = {
		// apply defaults
		setOptions: function(options) {
			this.options = Object.extend({
				// REQUIRED: an array of elements to use as the accordion sections
				sections: null,
				// a function that locates an activator button element given a section element.
				// by default it takes a button id from the section's "activator" attibute
				getActivator: function(el) {return document.getElementById(el.getAttribute("activator"))},
				// shifts each animator's range, for example with options {from:0,to:100,shift:20}
				// the animators' ranges will be 0-100, 20-120, 40-140 etc.
				shift: 0,
				// the first page to show
				initialSection: 0,
				// if set to true, document.location.hash will be used to preserve the open section across page reloads 
				rememberance: true,
				// constructor arguments to the Animator objects
				animatorOptions: {}
			}, options || {});
		},
		show: function(section) {
			for (var i=0; i<this.ans.length; i++) {
				this.ans[i].seekTo(i > section ? 1 : 0);
			}
			if (this.options.rememberance) {
				document.location.hash = this.rememberanceTexts[section];
			}
		}
	}
		
	/* 			####### Animator.js code ends here ########## */ 		
	
	/* 			####### Photoalbum.js code starts here ########## */
	
	
	  /***** GLOBALS *****/
        
		var slowest = 5000;
		var slow = 4000;
        var med = 3000;
        var fast = 2000;        
		var fastest = 1000;
        var slideTime;
        var randTime;
        
         /*****These are our events****/
        
        //parent.content.onscroll = adjustoverlay;
		window.onscroll = adjustOverlay;
		//window.onresize = adjustOverlay;
		
	   /***** Event Functions*****/

         function checkMouseover(evt) {
			
			//alert(evt);
			
			if (!evt) var evt = window.event;
        
            if(document.all)    
                evtObj = evt.srcElement; 
            else
                evtObj = evt.target;
			
				if (evtObj.id.substring(0,5) == 'thumb' && evtObj.parentNode.offsetWidth < 75)
				{	
					var positionX = getCoords(evtObj).x;
					var positionY = getCoords(evtObj).y;
					enlargedImage = $('enlargedImage'+this.photoNum);				
					
					enlargedImage.style.width = Math.floor(evtObj.width * 2.25) + 'px'; 
					enlargedImage.style.height = Math.floor(evtObj.height * 2.25) + 'px'; 
					enlargedImage.style.position = "absolute";
					enlargedImage.style.top = positionY - Math.floor(evtObj.height * 0.75) + 'px';
					enlargedImage.style.left = positionX - Math.floor(evtObj.width * 0.75)+ 'px';
					enlargedImage.src = this.imageAttributes[this.currentImage].olpath;  // so we size down rather than up
					//alert(enlargedImage.style.width);
					enlargedImage.style.display = 'block';					
				}						
		}
	   
	    function checkDoubleClicks(evt) {
        
            if (!evt) var evt = window.event;
        
            if(document.all)    
                evtObj = evt.srcElement; 
            else
                evtObj = evt.target;
            
            if (((evtObj.id.substring(0, 5) == "thumb") || (evtObj.id.substring(0, 8) == 'enlarged')) && this.mainViewer == 1) 
            {                               
			   //setting height & width of background gray area. 
			   PA_ID = this.photoNum;			   
			   
			   window.document.body.appendChild($('detailScreen'));
	           window.document.body.appendChild($('detailsContainer' + PA_ID));
			   $('detailScreen').style.height = getWinHeight();
               $('detailScreen').style.width = getWinWidth();
               this.showDetails(evtObj);                
               if ($('pausebutton'+this.photoNum).style.display == 'block') 
				{
				//this.stop();
				this.midPlay = 1;
				}
            }   
            else return;
        }
			
        function checkClickables(evt)    {            
            //alert(evt.target.id);
			//alert(this.currentImage);
			
			if (!evt) var evt = window.event;
            
            if(document.all)    
                evtObj = evt.srcElement; 
            else
                evtObj = evt.target;            
            
            if (((evtObj.id.substring(0, 5) == 'thumb') || (evtObj.id.substring(0, 8) == 'enlarged')) && (evtObj.id.substring(5, 8) != "Con")) 
                {
                	thumbID = evtObj.id.split("_");
                	                               
                    this.lastImage=this.currentImage;                   
                    this.currentImage = parseInt(thumbID[2]);  //image container
                    this.currentImage = parseInt(thumbID[2]);  //image                   
                     
                     this.findCurrent();
					 this.showCurrent(evtObj);
                }
			/*if ((evtObj.id.substring(0, 8) == "enlarged")) {
				this.lastImage = this.currentImage;
				this.currentImage = parseInt($('enlargedImage'+this.photoNum).name);
				this.findCurrent();
				this.showCurrent();
			}*/
             if((evtObj.id == ("mainImage"+this.photoNum) || evtObj.id == ("imageContainer"+this.photoNum)) || (evtObj.id.substring(0, 5) == "thumb" && this.mainViewer == 0) || ((evtObj.id.substring(0, 8) == "enlarged") && (this.mainViewer == 0)))
                {
					//setting height & width of background gray area.
					PA_ID = this.photoNum;
				   //detailsScreen = $('detailscreen');
				   
				   window.document.body.appendChild($('detailScreen'));
		           window.document.body.appendChild($('detailsContainer' + PA_ID));
				   $('detailScreen').style.height = getWinHeight();
	               $('detailScreen').style.width = getWinWidth();
                    this.showDetails(evtObj);                
                    //this.stop();
                    this.midPlay = 1;                              
                }           
            }
      	//document.onmouseout = checkMouseout	
		
		PhotoAlbum.prototype.calcRatio = calcRatio;
		PhotoAlbum.prototype.buildThumbs = buildThumbs;
		PhotoAlbum.prototype.updateCounter = updateCounter;
		PhotoAlbum.prototype.buildMainViewer = buildMainViewer;		
		PhotoAlbum.prototype.showDetails = showDetails;
		PhotoAlbum.prototype.showNextDetail = showNextDetail;
		PhotoAlbum.prototype.showPrevDetail = showPrevDetail;
		PhotoAlbum.prototype.closeDetails = closeDetails;
		PhotoAlbum.prototype.next = next;
		PhotoAlbum.prototype.previous = previous;
		PhotoAlbum.prototype.findCurrent = findCurrent;
		PhotoAlbum.prototype.showCurrent = showCurrent;
		PhotoAlbum.prototype.initPlay = initPlay;
		PhotoAlbum.prototype.linearPlay = linearPlay;
		PhotoAlbum.prototype.randPlay = randPlay;
		PhotoAlbum.prototype.stop = stop;
		PhotoAlbum.prototype.f_Slide = f_Slide;
		PhotoAlbum.prototype.l_Slide = l_Slide;
		PhotoAlbum.prototype.changeSpeed = changeSpeed;
		PhotoAlbum.prototype.adjustOverlay = adjustOverlay;
		PhotoAlbum.prototype.hideDetails = hideDetails;
		PhotoAlbum.prototype.checkClickables = checkClickables;
		PhotoAlbum.prototype.checkDoubleClicks = checkDoubleClicks;
		PhotoAlbum.prototype.checkMouseover = checkMouseover;		
		
        /*****The PhotoAlbum object ****/ 		
      	
      	function PhotoAlbum(photoNum, mainWidth,photoAlbumType,imageBackColor,titleColor, thumbWidth,numOfThumbs,aspectRatio,titles, imageAttributes,textFont,specifyBoxWidth, newIC) {
		
		this.photoNum=photoNum; //The photo number
		
        this.mainWidth = mainWidth;     //colum width of the web page - should determine the size of the entire photo album
        this.photoAlbumType = photoAlbumType; //PhotoAlbum Type 1-5		       
		this.imageBackColor = imageBackColor;        //color of overlay matte and thumbnail BG:  defualt is WHITE        
		this.titleColor = titleColor;   //title/desc text color
		this.textFont = textFont;
		this.specifyBoxWidth = specifyBoxWidth;
		
		if(this.specifyBoxWidth == "true"){
		   this.numOfThumbs = 0;
		   if (thumbWidth.length == 0) {
			  this.thumbWidth = 0;
		   } else {
			  this.thumbWidth = parseInt(thumbWidth);  //advance option
		   }
		}
		else{
		   this.thumbWidth = 0;
		   if (numOfThumbs.length == 0) {
			  this.numOfThumbs = 0;
		   } else	{
			  this.numOfThumbs = parseInt(numOfThumbs);   //calculated based on mainWidth, 0 means nothing specified and use 'thumbWidth' advance option
		   }
		}
        
		this.aspectRatio = aspectRatio;  //could be "square", "portrait", "landscape":  default should be SQUARE per the specs, landscape might be better :-P       
		
		if (titles.length == 0 || titles == "false") {
			this.titles = 0;
		} else {
			this.titles = 1;
		}
		    	   
        this.slideSpeed = med;         //default is medium, 2 seconds        
        this.imageAttributes = imageAttributes;   //should be an array
         
		 this.imageTotal = imageAttributes.length;
		      
		for(i=0; i<this.imageTotal; i++) {
			imgObject = new Image();
			imgObject.src=imageAttributes[i].sspath;
			imgObject.src=imageAttributes[i].tnpath;
			imgObject.src=imageAttributes[i].olpath;
			//alert(imgObject.height);
		}
		
		this.newIC = newIC;
		
		 this.mainHeight;   //calculated in calcRatio() 
    	 this.thumbHeight;   //calculated in calcRatio()   

 
        /*** Init Variables ****/
        
        this.imageTotal = imageAttributes.length;
		
		this.controls = 0;    //show controls?  
        this.thumbnails = 0;    //show thmbnails?   
        this.mainViewer = 0;  //show main viewer?
        this.randomSlideShow = 0;    //random?
        this.defaultPlay = 0;   //make automatic if thumbs and controls are off   
        this.currentImage = 0;
        //this.currentDetail = 0;
        this.lastImage = 0;
        this.stopSlide = 0;
        this.firstPlay = 1;
        this.midPlay = 0;
        this.Xcoord = 0;
        this.Ycoord = 0;
        this.playInterval = 0;
		this.randInterval = 0;
		this.mainDiv;
		this.mainIMG;
		this.thumbDiv;
		this.thumbIMG;
        this.thumbTitle;
		this.largestDiv = [];
		this.enlargedImage;
		this.mainContainer = $('mainContainer' + this.photoNum);
		
        this.anContainer = new Animator({transition: Animator.makeEaseOut(4), duration: 1000});
        this.anImage = new Animator({transition: Animator.makeEaseOut(3), duration: 600});
        this.anTitle = new Animator({transition: Animator.makeEaseOut(3), duration: 600});
        this.anScreen = new Animator({duration: 500});
		
        //anDesc = new Animator({transition: Animator.makeEaseOut(3), duration: 600});
        //anClose = new Animator({transition: Animator.makeEaseOut(3), duration: 600});	
		
       // document.ondblclick = this.checkDoubleClicks;
		//document.onmouseover = this.checkMouseover;		
			
			this.calcRatio();

            //if(this.thumbnails ==1 ){this.buildThumbs();} 
			this.buildThumbs();
			this.findCurrent();
            //if(this.mainViewer == 1){this.buildMainViewer();}
			this.buildMainViewer();
            this.showCurrent();   
            
            var PA_ID = this.photoNum;
            var oldhandler = window.onload;            
            if(this.newIC=="true")
            	window.onload = function() {oldhandler(); buildOverlay(PA_ID);}
            
            //this.buildOverlay(this.photoNum); 
           
            this.anContainer.addSubject(new CSSStyleSubject($('details'+this.photoNum), "position: relative; top: 30px; left: 500px; opacity: 0.0; filter: alpha(opacity = 0); width: 400px; height: 400px; border: 1px solid #cccccc; margin: auto; overflow: hidden;", "opacity: 1; filter: alpha(opacity = 100); width: 500px; height: 690px; border: 2px solid #56A7EF; margin: auto;"));
            
            //anContainer.addSubject(new CSSStyleSubject($('details'), "detailsPre", "detailsPost")); 
            
            this.anImage.addSubject(new CSSStyleSubject($('popImage'+this.photoNum), "opacity: 0;filter: alpha(opacity = 0);", "opacity: 1; filter: alpha(opacity = 100);"));
            this.anTitle.addSubject(new CSSStyleSubject($('popTitle'+this.photoNum), "opacity: 0;filter: alpha(opacity = 0);", "opacity: 1; filter: alpha(opacity = 100);"));
            this.anScreen.addSubject(new CSSStyleSubject($('detailScreen'), "opacity: 0;filter: alpha(opacity = 0);", "opacity: 0.5; filter: alpha(opacity = 50);"));
            //anDesc.addSubject(new CSSStyleSubject($('popDesc'+photoNum), "opacity: 0;filter: alpha(opacity = 0);", "opacity: 1; filter: alpha(opacity = 100);"));
                      
            
			switch(this.photoAlbumType)
			{
				case (this.photoAlbumType=1):
					this.mainViewer=1;
					this.controls=1;
					this.thumbnails=1;
					this.defaultPlay=0;
					break;
				case (this.photoAlbumType=2):
					this.mainViewer=1;
					this.controls=0;
					this.thumbnails=1;
					this.defaultPlay=1;
					break;
				case (this.photoAlbumType=3):
					this.mainViewer=1;
					this.controls=1;
					this.thumbnails=0;
					this.defaultPlay=0;
					break;
				case (this.photoAlbumType=4):
					this.mainViewer=1;
					this.controls=0;
					this.thumbnails=0;
					this.defaultPlay=1;
					break;
				default:
					this.mainViewer=0;
					this.controls=0;
					this.thumbnails=1;
					this.defaultPlay=0;
					$('photoFoot' + this.photoNum).style.display = 'none';					
			}
			
			$("imageContainer"+this.photoNum).style.backgroundColor = this.imageBackColor;
            $("imageContainer"+this.photoNum).style.borderColor = this.imageBackColor;	
			
			if (this.defaultPlay ==1) {
                swap('detailplaybtn'+this.photoNum,'detailpausebtn'+this.photoNum);	 		
                swap('playbutton'+this.photoNum,'pausebutton'+this.photoNum);
				this.initPlay();
            }
            if (this.controls == 0) {
                $("controls"+this.photoNum).style.display = "none";                
            }
            
            if (this.thumbnails == 0) {
                $('thumbContainer'+this.photoNum).style.display = 'none';
                //initPlay();                
            }
            
            if(this.mainViewer == 0) {
                $("controls"+this.photoNum).style.display = "none";
                $("imageContainer"+this.photoNum).style.display = "none";
				this.defaultPlay = 0;
            }
            
			//alert($('thumbContainer'+this.photoNum));
            
            $("photoFoot"+this.photoNum).style.width = mainWidth + "px";
            $("controls"+this.photoNum).style.width = (mainWidth-6) + "px";
            $("details"+this.photoNum).style.backgroundColor = imageBackColor;
            $("details"+this.photoNum).style.borderColor = "#CCCCCC";
            $("popTitle"+this.photoNum).style.color = titleColor;
            $("popTitle"+this.photoNum).style.backgroundColor = imageBackColor;   //fix IE Bold glitch
            if(this.textFont != ""){
               $("popTitle"+this.photoNum).style.fontFamily = this.textFont;
            }        
            $("popDesc"+this.photoNum).style.color = titleColor;
            $("popDesc"+this.photoNum).style.backgroundColor = imageBackColor;   //fix IE Bold glitch
            if(this.textFont != ""){
               $("popDesc"+this.photoNum).style.fontFamily = this.textFont;
            }          
            this.updateCounter(this.photoNum); 
			
			//var pa_self = this;
			//normAddEvent(this.mainDiv, "click", function(e){
			// 		pa_self.checkClick(pa_self.mainDiv);
			// });
			
			
			 if (this.mainContainer.addEventListener){
			   this.mainContainer.addEventListener('click', createObjectCallback(this, this.checkClickables), false); 
			   this.mainContainer.addEventListener('dblclick', createObjectCallback(this, this.checkDoubleClicks), false); 
  			   //this.mainContainer.addEventListener('mouseover', createObjectCallback(this, this.checkMouseover), false);
			} else if (this.mainContainer.attachEvent){
			   this.mainContainer.attachEvent('onclick', createObjectCallback(this, this.checkClickables));
			   this.mainContainer.attachEvent('ondblclick', createObjectCallback(this, this.checkDoubleClicks)); 
  			   //this.mainContainer.attachEvent('onmouseover', createObjectCallback(this, this.checkMouseover));
			}
			
			
			if(this.largestDiv.length > 0) {
				for(var i=0; i<this.largestDiv.length; i++) {	
					//alert(getStyle(this.largestDiv[i], 'height'));
				}
			}
		
				//alert('returned zero-length array');
			
        }
        
        function buildOverlay(PA_ID) {
	    	
		    	window.document.body.appendChild($('detailScreen'));
		        window.document.body.appendChild($('detailsContainer' + PA_ID));
	        	        
        }
        
        function calcRatio() {
            
            if (this.aspectRatio == "landscape") {
                this.thumbHeight = Math.floor(this.thumbWidth*0.75);
                this.mainHeight = Math.floor(this.mainWidth*0.75);
            }
            else if (this.aspectRatio == "portrait") {
                this.thumbHeight =Math.floor(this.thumbWidth*1.33);
                this.mainHeight = Math.floor(this.mainWidth*1.33);
            }
            else //if "square"
            {
                this.thumbHeight = this.thumbWidth;
                this.mainHeight = this.mainWidth;
            }            
			
			//alert("mainHeight: "+this.mainHeight);
			
        }
        
        function updateCounter() {
            this.currentNum = this.currentImage + 1;  
            if ($("SlideNum"+this.photoNum)) {          
            	$("SlideNum"+this.photoNum).innerHTML = this.currentNum + "/" + this.imageTotal;
            } 
        }
        
         function buildThumbs() {
           
           //var largestTitle = 0;  //height added by thumbnail titles
          
           var j=0;
           var largestTitle = [j];  //height added by thumbnail titles
            
             if (this.numOfThumbs > 0 ) {
                 if (document.all)
                     this.thumbWidth = Math.floor(this.mainWidth/this.numOfThumbs) - 13;   //18 is padding+ border + left/right extremes
                 else
                     this.thumbWidth = Math.floor(this.mainWidth/this.numOfThumbs) - 12;                 
             }             
             
            this.calcRatio();
			 
             $('thumbContainer'+this.photoNum).style.width = this.mainWidth + "px";             
             
             
			 this.thumbDiv = new Array;
             this.thumbIMG = new Array;
             this.thumbTitle = new Array;
			 this.thumbTable = new Array;
			 this.thumbTBody = new Array;
			 this.thumbTR = new Array;
			 this.thumbTD = new Array;
						 
             for(i=0; i<this.imageTotal; i++) {
                 this.thumbDiv[i] = document.createElement("div");
                 this.thumbTitle[i] = document.createElement("div");
				 this.thumbIMG[i] = document.createElement("IMG");
                 this.thumbTable[i] = document.createElement("table");
			 	 this.thumbTBody[i] = document.createElement("tbody");
			 	 this.thumbTR[i] = document.createElement("tr");
			 	 this.thumbTD[i] = document.createElement("td");
			 	 
			 	 			 	 
			 	 this.thumbTable[i].cellPadding = 0;
			 	 this.thumbTable[i].cellSpacing = 0;
			 	 this.thumbTable[i].height = this.thumbHeight+"px";
			 	 this.thumbTable[i].width = this.thumbWidth+"px";
			 	 this.thumbTD[i].height = this.thumbHeight+"px";
			 	 this.thumbTD[i].width = this.thumbWidth+"px";
			 	 this.thumbTD[i].vAlign = "middle";
                   
                 this.thumbDiv[i].className="imageThumb";
                 this.thumbDiv[i].id="thumbDiv_"+this.photoNum + "_" + i;  
                 this.thumbDiv[i].style.width = this.thumbWidth + "px";                  
                 this.thumbDiv[i].style.height = this.thumbHeight + "px";                   
                 this.thumbDiv[i].style.backgroundColor = this.imageBackColor;
                 this.thumbDiv[i].style.borderColor = this.imageBackColor;  
                 this.thumbDiv[i].style.lineHeight = this.thumbHeight + "px";				   
				  
				 this.thumbIMG[i].src = this.imageAttributes[i].tnpath;
                 this.thumbIMG[i].alt = this.imageAttributes[i].alt;
                 this.thumbIMG[i].id = "thumb_"+this.photoNum + "_" + i;
				 this.thumbIMG[i].style.margin = "auto";				  
                 this.thumbIMG[i].style.display = "block";  //IE fix
                 this.thumbIMG[i].style.textAlign = "center";  //IE fix
                 
                 this.thumbTitle[i].className = 'thumbTitle';
                 this.thumbTitle[i].innerHTML = this.imageAttributes[i].title;                 
				 this.thumbTitle[i].style.color = this.titleColor;
				 this.thumbTitle[i].style.fontFamily = this.textFont;
				 this.thumbTitle[i].style.textAlign = "center";
				 this.thumbTitle[i].style.cursor = "default";
				 
				if(this.imageAttributes[i].title.length > largestTitle[j]) {
			 		largestTitle[j] = this.imageAttributes[i].title.length;
			 		this.largestDiv[j] = this.thumbTitle[i];
			 		//alert(this.largestDiv[j].offsetHeight);			 		
			 	}
				  
				 if(((i+1)%this.numOfThumbs) == 0) {
				 	j++;
				 	largestTitle[j] = 0;
				 	this.largestDiv[j] = this.thumbTitle[i];				 	
				 }
				
				
				/*
			 	if(this.imageAttributes[i].title.length > largestTitle)
			 		largestTitle = this.imageAttributes[i].title.length;
				 */ 
				                             
                 /**Attach**/                   
                 $("thumbContainer"+this.photoNum).appendChild(this.thumbDiv[i]);
                 this.thumbDiv[i].appendChild(this.thumbTable[i]);
                 this.thumbTable[i].appendChild(this.thumbTBody[i]);
                 this.thumbTBody[i].appendChild(this.thumbTR[i]);                 
                 this.thumbTR[i].appendChild(this.thumbTD[i]);                             
                 this.thumbTD[i].appendChild(this.thumbIMG[i]);
                 this.thumbDiv[i].appendChild(this.thumbTitle[i]);
              }  
              		
	             //Calculate height with titles PER ROW	             
	             
	             var newHeight = [];
	             
	             if (this.titles == 1) {
	             
	             	//get specific height per row
	             	for(i=0; i<=j; i++) {
		             	approxWidth = Math.ceil(largestTitle[i]*11);   //font size is 11px
		             		             	
		             	if(approxWidth > this.thumbWidth)	
		             		rowUnit = Math.ceil(approxWidth/this.thumbWidth);
		             	else if(largestTitle[i] == 0)
		             		rowUnit = 0;
		             	else
		             		rowUnit = 1;
		             	
		             	newHeight[i] = rowUnit * 16;  //line-height is set to 16px
	             	}
	             	
	             	j=0; //reset row counter
	             		             	
	             	for(i=0; i<this.imageTotal; i++) {	             		
	             			             		
	             		
	             		//alert(parseInt(getStyle(this.thumbDiv[i], 'height')) + ' +  ' + parseInt(getStyle(this.largestDiv[j], 'height')));
	             		
	             		
	             		//if(document.all)
	             			this.thumbDiv[i].style.height = parseInt(this.thumbDiv[i].style.height) + newHeight[j] + "px";
	             		//else
	             		//	this.thumbDiv[i].style.height = parseInt(getStyle(this.thumbDiv[i], 'height')) + parseInt(getStyle(this.largestDiv[j], 'height')) + "px";	             		
	             		
	             		//alert('should equal this: ' + this.thumbDiv[i].style.height);
	             		if(((i+1)%this.numOfThumbs) == 0) {
				 			//alert(this.largestDiv[j].offsetHeight);
				 			j++;				 			
				 		}             		
	             	}
	             }	         
             }    
             
             
             function getStyle(node, sStyle) {				
				var style;
				if (document.all) {
					nodeStyle = node.offsetHeight;
				} else {
					try {
					nodeStyle = document.defaultView.getComputedStyle(node,null).getPropertyValue(sStyle);
				  } catch(e) { }
				}
				return nodeStyle;
			}
             
             
             
             
                           
                      
           function buildMainViewer() {
             //this.mainDiv = document.createElement("div");
             this.mainIMG = document.createElement("IMG");     
             
             $("imageContainer"+this.photoNum).width = this.mainWidth;
             $("imageContainer"+this.photoNum).height = this.mainHeight;             
             //this.mainDiv.className = "mainImageDiv";
             //this.mainDiv.id = "imageContainer"+this.photoNum;			 
			 $("imageContainer"+this.photoNum).appendChild(this.mainIMG);
			 $('detailScreen').style.height = getWinHeight();
	     	 $('detailScreen').style.width = getWinWidth();
	     	 
	     	 if(this.newIC == 'false' && document.all) {
	     	 	$('details'+this.photoNum).style.position = 'absolute';	     	 	
	     	 }
	         
         }
    
	    /*****Behavioral Functions****/
        
		function getWinWidth(){
			var w;
			if(document.innerWidth) {
				w=document.innerWidth;
			} else if(document.documentElement.clientWidth) {
				w=document.documentElement.clientWidth;
			} else if(document.body) {
				w=document.body.clientWidth; 
			}
			return w;
		}
		function getWinHeight(){
			var h;
			if(document.innerHeight){ 
				h=document.innerHeight;
			} else if(document.documentElement.clientHeight) { 
				h=document.documentElement.clientHeight;
			} else if(document.body) { 
				h=document.body.clientHeight; 
			}
			return h;
		}        
        
        function showDetails(evtObj) {            
           
          // this.mainIMG.style.display = 'none';
           
           //Hide all dropdowns in page id IE
           if(document.all) {
	            var dropdowns = document.getElementsByTagName('select');			
				for (var j = 0; j < dropdowns.length; j++) { 
				    dropdowns[j].style.visibility = 'hidden';
				}
           }
            
            if (document.all) {
                
                if(this.newIC == 'false') {
	             	if (((evtObj.id.substring(0, 5) == 'thumb') || (evtObj.id.substring(0, 8) == 'enlarged')) && (evtObj.id.substring(5, 8) != "Con")) {
		             	$('detailsContainer'+this.photoNum).style.marginTop = getCoords(evtObj).y - 20 + "px";
		             	$('detailsContainer'+this.photoNum).style.marginLeft = getCoords($('mainContainer'+this.photoNum)).x + "px";
		             }
		             else {
	                	$("detailsContainer"+this.photoNum).style.marginTop = getCoords($('mainContainer'+this.photoNum)).y + "px";
	                	$("detailsContainer"+this.photoNum).style.marginLeft = getCoords($('mainContainer'+this.photoNum)).x + "px";
	                }
	            }
	            else {	              
	               $("detailsContainer"+this.photoNum).style.top = document.documentElement.scrollTop + 10 + "px";
	               $("detailScreen").style.top = document.documentElement.scrollTop + "px";
	            }
	            
	            if(navigator.appVersion.indexOf("MSIE 7.")!=-1) {
	            	$("detailScreen").style.top = "0px";
	            }
             }
            else  { //anything other than IE            	
                $("detailsContainer"+this.photoNum).style.top =  window.pageYOffset + 10 + "px";
                $("detailScreen").style.top =  "0px";     
             }
             
            $("detailsContainer"+this.photoNum).style.display = "block";
            $("detailScreen").style.display = "block";
            $("popImage"+this.photoNum).src = this.imageAttributes[this.currentImage].olpath;
            //$("popImage"+this.photoNum).style.marginTop = Math.floor((500 - $("popImage"+this.photoNum).height)/2) + "px";
            //alert(this.imageAttributes[this.currentImage].title.length);
            $("popTitle"+this.photoNum).innerHTML = this.imageAttributes[this.currentImage].title;
            $("popDesc"+this.photoNum).innerHTML = this.imageAttributes[this.currentImage].desc;
                       
            this.anContainer.toggle();
			if(this.newIC == 'true')	
				this.anScreen.toggle();
			this.anImage.toggle();
			this.anTitle.toggle();
			
           /* window.setTimeout('anScreen.toggle()', 600);
            window.setTimeout('anImage.toggle()', 400);
            window.setTimeout('anTitle.toggle()', 400); */
        }
        
        function closeDetails() {
            
            
            if ($('playbutton'+this.photoNum).style.display == 'none' || (this.defaultPlay == 1 && this.controls == 0)) {
                window.setTimeout(createObjectCallback(this, this.initPlay), 500);
            }
                          
             this.anImage.toggle();
             this.anTitle.toggle();             
             this.anContainer.toggle();
             if(this.newIC == 'true')	
				this.anScreen.toggle();
             window.setTimeout(createObjectCallback(this, this.hideDetails), 1000);
        }
         
		 function hideDetails() {
		 	$("detailsContainer"+this.photoNum).style.display = "none";
			$("detailScreen").style.display = "none";
			this.mainIMG.style.display = 'block';
			
			//Show all dropdowns in page if IE
           if(document.all) {
	            var dropdowns = document.getElementsByTagName('select');			
				for (var i = 0; i < dropdowns.length; i++) { 
				    dropdowns[i].style.visibility = 'visible';
				}
           }
		 }
		 
		  function stop() {
            if (this.randomSlideShow == 1) {
                 clearInterval(this.randInterval);
             }
             else {
				 /**if (playInterval != "")**/ 
				 clearInterval(this.playInterval);
             }
             this.midPlay = 0;
         }
         
         function f_Slide() {
             this.lastImage = this.currentImage;
             this.currentImage = 0;
             
             this.findCurrent();
             this.showCurrent();
         }
         
         function l_Slide() {
             this.lastImage = this.currentImage;
             this.currentImage = this.imageTotal -1;
             
             this.findCurrent();
             this.showCurrent();
         }
         
         function findCurrent() {             
			 //alert("thumb"+this.photoNum + this.lastImage);
			 //$("thumb_"+this.photoNum + "_" + this.lastImage).parentNode.className = "imageThumb";
             //$("thumb_"+this.photoNum + "_" + i).parentNode.className = "imageThumbSelected";
             this.updateCounter(this.currentImage);
         }       
         
          function showCurrent() {             
             
             this.mainIMG.src = this.imageAttributes[this.currentImage].sspath;             
             this.mainIMG.alt = this.imageAttributes[this.currentImage].alt;
             
             this.mainIMG.id = "mainImage"+this.photoNum;                    
        	
        	$("popImage"+this.photoNum).src = this.imageAttributes[this.currentImage].olpath;
        	if ($("popTitle"+this.photoNum))
            	$("popTitle"+this.photoNum).innerHTML = this.imageAttributes[this.currentImage].title;
            if ($("popDesc"+this.photoNum))
            	$("popDesc"+this.photoNum).innerHTML = this.imageAttributes[this.currentImage].desc;
        
         }
         
         function initPlay() {
			//alert(this);

			var speed = this.slideSpeed;

			 if (this.randomSlideShow == 1) {                 
                 if(this.firstPlay == 0) clearInterval(this.randInterval);
                 this.randInterval = window.setInterval(createObjectCallback(this, this.linearPlay), speed);
             }
             else  {                 
                 if(this.firstPlay == 0) clearInterval(this.playInterval);
				
				//alert(this.id);
			
				 this.playInterval = window.setInterval(createObjectCallback(this, this.linearPlay), speed);
             }
			 
			 //alert(this.linearPlay);
			 			 
            this.firstPlay = 0;
         }
         
		  function linearPlay() {             
             //alert("linear play: " + this);
			 //if (this.stopSlide != 1) {                 
                //  if ($('detailScreen').style.display == 'block') {
				// 	if (this.currentDetail != this.imageTotal -1)
		      //          this.currentDetail++;
		     //       else
		        //        this.currentDetail = 0;
		            
		      //      $("popImage"+this.photoNum).src = this.imageAttributes[currentDetail].olpath;
		      //      $("popTitle"+this.photoNum).innerHTML = this.imageAttributes[currentDetail].title;
		     //       $("popDesc"+this.photoNum).innerHTML = this.imageAttributes[currentDetail].desc;
			//	 }	
				 
					 this.showNextDetail();
             //}
             //else return;
         }
         
         function next() {
              //alert("Next this: "+ this);
			  if (this.currentImage < this.imageTotal-1) {   
                 this.lastImage=this.currentImage;
                 this.currentImage++;                 
              }
              else {
                  this.currentImage=0;
                  this.lastImage = this.imageTotal - 1;
              }
            this.findCurrent();
            this.showCurrent();
         }
         
           function showNextDetail() {
            
			/*
            if (this.currentImage != this.imageTotal -1)
                this.currentImage++;
            else
                this.currentImage = 0;
			*/
            
            this.next();
			
            $("popImage"+this.photoNum).src = this.imageAttributes[this.currentImage].olpath;
            $("popTitle"+this.photoNum).innerHTML = this.imageAttributes[this.currentImage].title;
            $("popDesc"+this.photoNum).innerHTML = this.imageAttributes[this.currentImage].desc;
        }
         
         function previous() {
             if (this.currentImage > 0) {
                 this.lastImage=this.currentImage;
                 this.currentImage--;               
             }
             else {
                 this.currentImage=this.imageTotal-1;
                 this.lastImage = 0;
             }
             this.findCurrent();
             this.showCurrent();
         }
        
        function showPrevDetail() {
            /*
            if (this.currentImage != 0)
                this.currentImage--;
            else
                this.currentImage = this.imageTotal-1;
            */
			
			this.previous();
			
            $("popImage"+this.photoNum).src = this.imageAttributes[this.currentImage].olpath;
            $("popTitle"+this.photoNum).innerHTML = this.imageAttributes[this.currentImage].title;
            $("popDesc"+this.photoNum).innerHTML = this.imageAttributes[this.currentImage].desc;
            
        }
         
         function randPlay() {
             
                 if (stopSlide != 1) {
                     if (this.currentImage <= this.imageTotal) 
                     {    
                         
                         this.lastImage = this.currentImage;
                         
                         while (this.lastImage == this.currentImage) {
                             this.currentImage = randNum(0, (this.imageTotal-1));
                         }
                         
                         this.findCurrent();
                         this.showCurrent();                  
                                          
                     }                     
                 }
                     else return;
         }
         
         function changeSpeed(speed, num, relative_path)
         {    
             this.slideSpeed = speed;
             //speed = this.slideSpeed;  //just trust me
			 
			 for (i=num; i<6; i++)
			 {
			 	$('speed'+i+this.photoNum).src = relative_path+'images/photoalbum/button_photoSpeed'+i+'.jpg';
				//$('detailspeed'+i).src = 'images/photoalbum/button_photoSpeed'+i+'.jpg';
			 }
			 for (i=1; i<=num; i++)
			 {
			 	$('speed'+i+this.photoNum).src = relative_path+'images/photoalbum/button_photoSpeed'+i+'_ON.jpg';
				//$('detailspeed'+i).src = 'images/button_photoSpeed'+i+'_ON.jpg';
			 }
			 
             if (this.randomSlideShow == 1) {
                 clearInterval(this.randInterval);
                 this.randInterval = window.setInterval(createObjectCallback(this, this.randPlay), this.slideSpeed);
             }
             else if($('playbutton'+this.photoNum).style.display == 'none')
                 {				 	
				 	 clearInterval(this.playInterval);
	                 this.playInterval = window.setInterval(createObjectCallback(this, this.linearPlay), this.slideSpeed);
				 }
         }
		 
		 
	 function swap(a, b) {
	   	$(a).style.display = 'none';
		$(b).style.display = 'inline';
	   }
	   
	   function $(id) {
			return document.getElementById(id);
		}
         
          function randNum(x, y) {
             var range = y - x + 1;
             return Math.floor(Math.random() * range) + x;
         }
         
         function getCoords(element)
			{
                   var valueT = 0, valueL = 0;
            
                   do
                   {
                           valueT += element.offsetTop  || 0;
                           valueL += element.offsetLeft || 0;
                           element = element.offsetParent;
                   }
                   while (element);
            
                   return {x: valueL, y: valueT};
            }
		
		function adjustOverlay() {  //onscroll
           try{
	           if (document.all &&(navigator.appVersion.indexOf("MSIE 7.")==-1)) {
	            $('detailScreen').style.height = getWinHeight();  //adjust for resize
	     	 	$('detailScreen').style.width = getWinWidth();   //adjust for resize
	                //$("detailsContainer"+this.photoNum).style.top =   document.documentElement.scrollTop + 10 + "px";
	                if(this.newIC == 'false') {  //legacy frames
	                	//$("detailScreen").style.top = parent.content.document.body.scrollTop + "px";
	                }
	                else {
	                	$("detailScreen").style.top = document.documentElement.scrollTop + "px";
	                }	                
	             }
	           }
	        catch(e){return false;}
					 //else  {
		            //    $("detailsContainer").style.top =  window.pageYOffset + 10 + "px";
		            //    $("detailScreen").style.top =  window.pageYOffset + "px";
		            // } 

        }
		
		function createObjectCallback(obj, fn)
		{
			return function() 
				{ 
					fn.apply(obj, arguments);
				};
		}
         
	/* 			####### Photoalbum.js code ends here ########## */
