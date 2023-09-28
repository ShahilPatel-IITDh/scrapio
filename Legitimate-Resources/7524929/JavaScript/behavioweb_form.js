var Monitor = function () {
	this.init();
};

Monitor.prototype = {
	behavioData: [],
	anonMap: [],
	startTimestamp: new Date().getTime(),
	lastViewport: [-1, -1],
	lastTarget: null,
	behavio_hidden: null,
	behavio_hidden_id: "behavio_hidden",
	metaNames: {
		pageId: "bwpageid"
	},
	ignoreFields: ['isiwebpasswd'], // [FIELDNAME1, FIELDNAME2, FIELDNAME3 ETC]
	ignoreFieldsByID: ['response2', 'response3', 'response4', 'response5', 'response6', 'response7', 'response8'],
	haveMouse: false, // true/false
	collectMouseMovement: false, // true/false
	lastKey: -1,
	textLengths: {},
	behavioweb_config: {
		anonymous: {
			by_name: [],
			by_id: [],
			by_type: ['password'] // default 'password'
		}
	},
    e: {
        ptype: null,
        ptypes: {},
        k229: 0,
        kn: 0
    },
	isAndroid: (/android (\d+)/i.test(window.navigator.userAgent)),
	isFirefox: (/firefox/i.test(window.navigator.userAgent)),
	hasFallbackListeners: false,
	init: function () {
		var goodToGoInterval;
		goodToGoInterval = setInterval(function() {
			if (document.readyState == "complete") {
				bw.startMonitor();
				this.initialized = true;
				clearInterval(goodToGoInterval);
			}
		}, 10);
	},
	submitHandler: function(e) {
		var field = document.getElementById(bw.behavio_hidden_id);
		if (field) {
			field.value = JSON.stringify(bw.getBehavioData(), "", "");
		}
	},
	getBehavioData: function() {
		var data = bw.behavioData;
		data.push(["w", bw.getDataIntegrity(), bw.getPath()]);
		return data;
	},
	addKeyEvent: function(target, monitorType, data) {
		var i;
		var l;
		for (i = this.behavioData.length - 1; i >= -1; i--) {
			if (i == -1) {

				l = this.behavioData[0] == null ? 0 : this.behavioData.length;
				this.behavioData[l] = [];
				if (monitorType == "a") {
					this.behavioData[l][0] = "fa";
				} else if (monitorType == "n") {
					this.behavioData[l][0] = "f";
				}
				this.behavioData[l][1] = target;
				this.behavioData[l][2] = [];
				this.behavioData[l][2][0] = data;
				break;
			} else {
				if (monitorType == "a") {
					if (this.behavioData[i][0] !== "fa") {
						continue;
					}
				} else if (monitorType == "n") {
					if (this.behavioData[i][0] !== "f") {
						continue;
					}
				}
				if (this.behavioData[i][1] == target) {
					this.behavioData[i][2][this.behavioData[i][2].length] = data;
					break;
				}
			}
		}
	},
	addEvent: function(data, field) {
		var i;
		var l;
		for (i = this.behavioData.length - 1; i >= -1; i--) {
			if (i == -1) {

				l = this.behavioData[0] == null ? 0 : this.behavioData.length;
				this.behavioData[l] = [];
				this.behavioData[l][0] = "c";
				this.behavioData[l][1] = [];
				this.behavioData[l][1][0] = data;
				this.behavioData[l][2] = window.location.pathname.split('?')[0];
				break;
			} else {
				if (this.behavioData[i][0] == "c") {
					this.behavioData[i][1][this.behavioData[i][1].length] = data;
					break;
				}
			}
		}
	},
	getTimestamp: function() {
		var dobj = new Date();
		return dobj.getTime() - this.startTimestamp;
	},
	checkTarget: function (event, timestamp) {
		var element = document.elementFromPoint(event.clientX, event.clientY);

		var data = [];
		if (element != null && element != this.lastTarget && typeof element != 'undefined' && typeof element.parentNode != 'undefined' ) {
			data[0] = "t";
			data[1] = element.nodeName + "#" + element.id + "#" + element.parentNode.nodeName + "#" + element.parentNode.id;
			data[2] = timestamp || bw.getTimestamp();
			this.lastTarget = element;
			bw.addEvent(data);
		}
	},
	checkViewport: function (timestamp) {
		if (this.lastViewport[0] !== document.documentElement.clientWidth || this.lastViewport[1] !== document.documentElement.clientHeight) {
			var data = [];
			data[0] = "v";
			data[1] = document.documentElement.clientWidth;
			data[2] = document.documentElement.clientHeight;
			data[3] = timestamp || bw.getTimestamp();
			this.lastViewport[0] = document.documentElement.clientWidth;
			this.lastViewport[1] = document.documentElement.clientHeight;

			bw.addEvent(data);
		}
	},

	pointerMoveHandler: function(event) {
        if (event.getCoalescedEvents) {
            var events = event.getCoalescedEvents() || [];
            if (events.length == 0) { events.push(event); }

            var base = bw.getTimestamp(),
                lastTimestamp = event.timeStamp;

            for (var i = 0; i < events.length; i++)
            {
                var e = events[i];
                var ts = base - Math.round(lastTimestamp - e.timeStamp);
                var data = [];
                    data[0] = "mm";
                    data[1] = e.clientX;
                    data[2] = e.clientY;
                    data[3] = ts;

                    bw.checkTarget(event, ts);
                    bw.checkViewport(ts);
                    bw.addEvent(data);

                    var pt = e.pointerType || "unknown";
                    bw.e.ptypes[pt] = (bw.e.ptypes[pt] || 0) + 1;
            }

            bw.e.ptype = "pc";
        } else {
            var ts = bw.getTimestamp();
            var data = [];
            data[0] = "mm";
            data[1] = event.clientX;
            data[2] = event.clientY;
            data[3] = ts;

            bw.checkTarget(event, ts);
            bw.checkViewport(ts);
            bw.addEvent(data);

            var pt = event.pointerType || "unknown";
            bw.e.ptypes[pt] = (bw.e.ptypes[pt] || 0) + 1;
            bw.e.ptype = "pm";
        }
    },

    pointerDownHandler: function(event) {
        var ts = bw.getTimestamp();
        var data = [];
        data[0] = "md";
        data[1] = event.clientX;
        data[2] = event.clientY;
        data[3] = ts;
        data[4] = event.button;

        bw.checkTarget(event, ts);
        bw.checkViewport(ts);
        bw.addEvent(data);

        var pt = event.pointerType || "unknown";
        bw.e.ptypes[pt] = (bw.e.ptypes[pt] || 0) + 1;
    },

    pointerUpHandler: function (event) {
        var ts = bw.getTimestamp();
        var data = [];
        data[0] = "mu";
        data[1] = event.clientX;
        data[2] = event.clientY;
        data[3] = ts;
        data[4] = event.button;

        bw.checkTarget(event, ts);
        bw.checkViewport(ts);
        bw.addEvent(data);

        var pt = event.pointerType || "unknown";
        bw.e.ptypes[pt] = (bw.e.ptypes[pt] || 0) + 1;
    },
	mouseMoveHandler: function(event) {
		var data = [];
		data[0] = "mm";
		data[1] = event.clientX;
		data[2] = event.clientY;
		data[3] = bw.getTimestamp();

		bw.checkTarget(event);
		bw.checkViewport();
		bw.addEvent(data);
	},

	mouseDownHandler: function(event) {
		var data = [];
		data[0] = "md";
		data[1] = event.clientX;
		data[2] = event.clientY;
		data[3] = bw.getTimestamp();
		data[4] = event.button;

		bw.checkTarget(event);
		bw.checkViewport();
		bw.addEvent(data);
	},

	mouseUpHandler: function(event) {
		var data = [];

		data[0] = "mu";
		data[1] = event.clientX;
		data[2] = event.clientY;
		data[3] = bw.getTimestamp();
		data[4] = event.button;

		bw.checkTarget(event);
		bw.checkViewport();

		bw.addEvent(data);
	},

	keyHandler: function(event) {
		if (!(typeof KeyboardEvent == "undefined" || event instanceof KeyboardEvent)) { return; }

		var i;
		var data = [];
		var keyCode = (event.keyCode == 0 ? 229 : event.keyCode);
		var keyId = keyCode;
		var field = null;
		var source = event.currentTarget ? event.currentTarget : event.srcElement;
		var monitorType = "n";
		var caretPos = 0;

		if (keyCode == 229 && event.type == "keydown" && !bw.isFirefox && !bw.hasFallbackListeners) {
			bw.fallbackListeners();
			bw.hasFallbackListeners = true;
		}

		field = source.type + '#' + source.name;

		if (keyCode == null) {
			keyCode = -500;
			keyId = -500;
		}

		if (monitorType !== "a") {
			for (i = 0; i < bw.behavioweb_config.anonymous.by_id.length && monitorType !== "a"; i++) {
				if (bw.behavioweb_config.anonymous.by_id[i] == source.id) {
					monitorType = "a";
				}
			}
			for (i = 0; i < bw.behavioweb_config.anonymous.by_name.length && monitorType !== "a"; i++) {
				if (bw.behavioweb_config.anonymous.by_name[i] == source.name) {
					monitorType = "a";
				}
			}
			for (i = 0; i < bw.behavioweb_config.anonymous.by_type.length && monitorType !== "a"; i++) {
				if (bw.behavioweb_config.anonymous.by_type[i] == source.type) {
					monitorType = "a";
				}
			}
		}

		if (monitorType == "a") {
			if (keyCode == 9 || keyCode == 13) {
				return;
			}
			if (document.selection) {
				source.focus();
				var Sel = document.selection.createRange();
				var SelLength = document.selection.createRange().text.length;
				Sel.moveStart('character', -source.value.length);
				caretPos = Sel.text.length - SelLength;
			} else if (source.selectionStart || source.selectionStart == '0') {
				caretPos = source.selectionStart;
			}
			if (keyCode == 8) {
				if (event.type == "keydown") {
					if (bw.anonMap[keyCode] == null) {
						bw.anonMap[keyCode] = caretPos;
					}
					data[0] = -1;
					data[1] = caretPos;
				} else if (event.type == "keyup") {
					data[0] = -2;
					data[1] = bw.anonMap[keyCode];
					bw.anonMap[keyCode] = null;
				}
			} else if (keyCode == 46) {
				if (event.type == "keydown") {
					if (bw.anonMap[keyCode] == null) {
						bw.anonMap[keyCode] = caretPos;
					}
					data[0] = -3;
					data[1] = caretPos;
				} else if (event.type == "keyup") {
					data[0] = -4;
					data[1] = bw.anonMap[keyCode];
					bw.anonMap[keyCode] = null;
				}
			} else {
				if (event.type == "keydown") {
					if (bw.anonMap[keyCode] == null) {
						bw.anonMap[keyCode] = caretPos;
					}
					data[0] = 0;
					data[1] = caretPos;
				} else if (event.type == "keyup") {
					data[0] = 1;
					data[1] = bw.anonMap[keyCode];
					bw.anonMap[keyCode] = null;
				}
			}
		} else {
			if (keyCode == 229 && event.type == "keydown") {
				bw.setTextLength(field, source.value.length);
			} else if (keyCode == 229 && event.type == "keyup") {
				var s 	= bw.textLengths[field] || [];
				var ul 	= source.value.length,
					dl 	= s.pop() || 0;

				if (bw.lastKey != -1 || ul < dl) {
					if (ul - dl <= 1) {
						keyId = (ul < dl ? 8 : bw.lastKey);
					}

					var targetData = bw.getTargetData(field);
					var prevKey = targetData[targetData.length - 1];
					if (prevKey[1] == 229) {
						prevKey[1] = keyId;
					}
					bw.lastKey = -1;
				}
			}
			if (event.type === "keyup") {
				bw.lastKey = -1;
				data[0] = 1;
				data[1] = keyId;
			} else if (event.type === "keydown") {
				data[0] = 0;
				data[1] = keyId;
				if (keyCode == 229) { bw.e.k229++ } else { bw.e.kn++ }
			}
		}
		data[2] = bw.getTimestamp();
		if (data[1] != null) {
			bw.addKeyEvent(field, monitorType, data);
		}
	},
	getTargetData: function(target) {
		for (var i = this.behavioData.length - 1; i >= 0; i--) {
			if (this.behavioData[i][1] == target) {
				return this.behavioData[i][2];
			}
		}
	},
	setLastKey: function(k) {
		bw.lastKey = k;
	},
	setTextLength: function(target, len) {
		(bw.textLengths[target] = (bw.textLengths[target] || [])).push(len);
	},
	keyTransformer: function(e) {
		if (e.data && e.data.length == 1) {
			bw.setLastKey(e.data.toUpperCase().charCodeAt(0));
		}
	},
	keyComposition: function(e) {
		if (e.data) {
			bw.setLastKey(e.data.toUpperCase().charCodeAt(e.data.length-1));
		}
	},
	fallbackListeners: function(field) {
		if (field && field.addEventListener) {
			field.addEventListener("textInput", this.keyTransformer, false);
			field.addEventListener("compositionupdate", this.keyComposition, false);
		} else if (document.addEventListener) {
			document.addEventListener("textInput", this.keyTransformer, false);
			document.addEventListener("compositionupdate", this.keyComposition, false);
		}
	},
	getDataIntegrity: function() {
        var fields = [];
        bw.addIntegrityInputs("input", fields);
        bw.addIntegrityInputs("textarea", fields); /* Bug fix, textarea was not collected */

		for (var i = 0; i < this.behavioData.length; ++i)
		{
			if (this.behavioData[i][0] == "c") {
				var movementName = "movement";
				var movementVal  = 0;
				var movementObj = {};
				movementObj[movementName] = movementVal;
				fields.push(movementObj);
				break;
			}
		}
        return fields;
    },
    addIntegrityInputs: function(type, fields) {
        var inputs = document.getElementsByTagName(type);
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            var ftype = field.type
            if (ftype != 'hidden' && ftype != 'button' && ftype != 'submit' && ftype != 'radio' && ftype != 'checkbox') {
                var name = field.type + "#" + field.name;
                var val  = field.value.length;
                var obj = {};
                obj[name] = val;
                fields.push(obj);
            }
        }
    },

	getMeta: function(metaName) {
		var a;
		var b;
		var retVal = "";
		for (b = document.getElementsByTagName("meta"), a = 0; a < b.length; a++) {
			if (metaName == b[a].name || metaName == b[a].getAttribute("property")) {
				retVal = b[a].content;
			}
		}
		return retVal;
	},
	getPath: function() {
		var path = window.location.pathname.split('?')[0] || "/";
		if (bw.getMeta(bw.metaNames.pageId) != "") {
			path = bw.getMeta(bw.metaNames.pageId);
		}
		return path;
	},
	startMonitor: function() {
		var forms = document.getElementsByTagName("form");
		var i;
		var j;
		var thisForm;
		var fields;
		var field;
		var hiddenField;

		if (document.getElementById(bw.behavio_hidden_id) == null || typeof document.getElementById(bw.behavio_hidden_id) === 'undefined') {
			hiddenField = document.createElement('input');
			hiddenField.setAttribute('type', 'hidden');
			hiddenField.setAttribute('name', bw.behavio_hidden_id);
			hiddenField.setAttribute('id', bw.behavio_hidden_id);
			for (i = 0; i < forms.length; i++) {
				thisForm = forms[i];
				thisForm.appendChild(hiddenField);
			}
		}

		if (typeof jQuery != 'undefined') { // check if jquery present
			jQuery('form').submit(bw.submitHandler);
		}

		for (i = 0; i < forms.length; i++) {
			thisForm = forms[i];

			if (typeof jQuery == 'undefined') {
				if (thisForm.addEventListener) {
					thisForm.addEventListener("submit", bw.submitHandler, false);  //Modern browsers
				} else if (thisForm.attachEvent) {
					thisForm.attachEvent('onsubmit', bw.submitHandler);            //Old IE
				}
			}

			fields = thisForm.getElementsByTagName("textarea");

			for (j = 0; j < fields.length; j++) {
				field = fields[j];
				if (this.ignoreFields.indexOf(field.name) === -1 && this.ignoreFieldsByID.indexOf(field.id) === -1) {
					if (field.addEventListener) {
						field.addEventListener("keydown", this.keyHandler, false);
						field.addEventListener("keyup", this.keyHandler, false);
						if (this.isAndroid && !this.isFirefox) {
							this.fallbackListeners(field);
						}
					} else if (field.attachEvent) {
						field.attachEvent("onkeydown", this.keyHandler);
						field.attachEvent("onkeyup", this.keyHandler);
					}
				}
			}

			fields = thisForm.getElementsByTagName("input");

			for (j = 0; j < fields.length; j++) {
				field = fields[j];
				if (field.type === "checkbox" || field.type === "radio" || field.type === "hidden" || field.type === "button" || field.type === "submit") {
					continue;
				}

				if (this.ignoreFields.indexOf(field.name) === -1 && this.ignoreFieldsByID.indexOf(field.id) === -1) {
					if (field.addEventListener) {
						field.addEventListener("keydown", this.keyHandler, false);
						field.addEventListener("keyup", this.keyHandler, false);
						if (this.isAndroid && !this.isFirefox) {
							this.fallbackListeners(field);
						}
					} else if (field.attachEvent) {
						field.attachEvent("onkeydown", this.keyHandler);
						field.attachEvent("onkeyup", this.keyHandler);
					}
				}
			}
		}

        if (this.haveMouse === true) {
            if (document.addEventListener) {
                if (window.PointerEvent) {
                    document.addEventListener("pointerdown", this.pointerDownHandler, false);
                    document.addEventListener("pointerup", this.pointerUpHandler, false);

                    if(this.collectMouseMovement){
                        document.addEventListener("pointermove", this.pointerMoveHandler, false);
                    }

                } else {
                    this.e.ptype = "mm";
                    document.addEventListener("mousedown", this.mouseDownHandler, false);
                    document.addEventListener("mouseup", this.mouseUpHandler, false);

                    if(this.collectMouseMovement){
                        document.addEventListener("mousemove", this.mouseMoveHandler, false);
                    }
                }
            } else if (document.attachEvent) {
                this.e.ptype = "mm";
                document.attachEvent("onmousedown", this.mouseDownHandler);
                document.attachEvent("onmouseup", this.mouseUpHandler);

                if(this.collectMouseMovement)
                {
                    document.attachEvent("onmousemove", this.mouseMoveHandler, false);
                }
            }
        }

		if (this.isAndroid) {
			this.hasFallbackListeners = true;
		}

		var _navigator = {};

		for (i in navigator) {
			_navigator[i] = navigator[i];
		}
		delete _navigator.plugins;
		delete _navigator.mimeTypes;

		var _screen = {};
		for (i in screen) {
			_screen[i] = screen[i];
		}
		this._navigator = _navigator;
		this._screen = _screen;
		this.behavioData[0] = ["m", "n", _navigator];
		this.behavioData[1] = ["m", "s", _screen];
		this.behavioData[2] = ["m", "v", 253];
        this.behavioData[3] = ["m", "e", this.e];
	}
}

var bw = new Monitor();

// shims polyfills

if (typeof console == "undefined") {
	this.console = {
			log:   function() {},
			info:  function() {},
			error: function() {},
			warn:  function() {}
	};
}

Date.now = Date.now || function() { return +new Date(); };
function readyState(fn) {
	if (document.readyState == "interactive" || document.readyState == "complete") {
		fn();
	}
}

var JSON;
if (!JSON) {
	JSON = {};
}(function () {
	function d(f) {
		return f < 10 ? "0" + f : f;
	}
	if (typeof Date.prototype.toJSON != "function") {
		Date.prototype.toJSON = function (f) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + d(this.getUTCMonth() + 1) + "-" + d(this.getUTCDate()) + "T" + d(this.getUTCHours()) + ":" + d(this.getUTCMinutes()) + ":" + d(this.getUTCSeconds()) + "Z" : null;
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (f) {
			return this.valueOf();
		};
	}
	var i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	h, a, e = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
	}, c;

	function b(f) {
		i.lastIndex = 0;
		return i.test(f) ? '"' + f.replace(i, function (j) {
			var k = e[j];
			return typeof k == "string" ? k : "\\u" + ("0000" + j.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' : '"' + f + '"';
	}

	function g(q, n) {
		var l;
		var j;
		var r;
		var f;
		var o = h;
		var m;
		var p = n[q];
		if (p && typeof p == "object" && typeof p.toJSON == "function") {
			p = p.toJSON(q);
		}
		if(typeof c == "function") {
			p = c.call(n, q, p);
		}
		switch (typeof p) {
		case "string":
			return b(p);
		case "number":
			return isFinite(p) ? String(p) : "null";
		case "boolean":
		case "null":
			return String(p);
		case "object":
			if (!p) {
				return "null";
			}
			h += a;
			m = [];
			if (Object.prototype.toString.apply(p) == "[object Array]") {
				f = p.length;
				for (l = 0; l < f; l += 1) {
					m[l] = g(l, p) || "null";
				}
				r = m.length == 0 ? "[]" : h ? "[\n" + h + m.join(",\n" + h) + "\n" + o + "]" : "[" + m.join(",") + "]";
				h = o;
				return r;
			}
			if (c && typeof c == "object") {
				f = c.length;
				for (l = 0; l < f; l += 1) {
					if (typeof c[l] == "string") {
						j = c[l];
						r = g(j, p);
						if (r) {
							m.push(b(j) + (h ? ": " : ":") + r);
						}
					}
				}
			} else {
				for (j in p) {
					if (Object.prototype.hasOwnProperty.call(p, j)) {
						r = g(j, p);
						if (r) {
							m.push(b(j) + (h ? ": " : ":") + r);
						}
					}
				}
			}
			r = m.length == 0 ? "{}" : h ? "{\n" + h + m.join(",\n" + h) + "\n" + o + "}" : "{" + m.join(",") + "}";
			h = o;
			return r;
		}
	}
	if (typeof JSON.stringify !== "function") {
		JSON.stringify = function (l, j, k) {
			var f;
			h = "";
			a = "";
			if (typeof k == "number") {
				for (f = 0; f < k; f += 1) {
					a += " ";
				}
			} else {
				if (typeof k == "string") {
					a = k;
				}
			}
			c = j;
			if (j && typeof j !== "function" && (typeof j !== "object" || typeof j.length !== "number")) {
				throw new Error("JSON.stringify");
			}
			return g("", {
				"": l
			})
		}
	}
}());

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		var i, j;
		for (i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	};
}
