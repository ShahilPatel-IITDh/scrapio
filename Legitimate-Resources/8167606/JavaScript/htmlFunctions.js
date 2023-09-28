function siteSettings() {
	var settingObj = {};

	function getSettings(settingKeys,callback) {
		var unloadedSettingKeys = $.grep(settingKeys,function(settingKey) {
			return !settingObj.hasOwnProperty(settingKey);
		});
		if(unloadedSettingKeys.length === 0) {
			returnSettings(settingKeys,callback);
		} else {
			SKILLCASTHTMLJS.skillcastAPI("params", "getSiteSettingsJSON", {"settingKeys": unloadedSettingKeys.join(",")}, function(resp) {
				$.extend(settingObj,resp.data);
				returnSettings(settingKeys,callback);
			});
		}
	}

	function returnSettings(settingKeys,callback) {
		var returnObj = {};
		$.each(settingKeys,function(i,settingKey) {
			returnObj[settingKey] = settingObj[settingKey];
		});
		callback(returnObj);
	}

	return {
		"getSettings":getSettings
	};
}

function popupViewerFunctions() {
	var popupsOpen = 0;
	var tracking = {};
	var lastFocusedElement;

	var allyFunctions = {
		'engage': function(containerId){
			lastFocusedElement = document.activeElement;

			for(var tId in tracking) {
				allyFunctions.disengage(tId);
			}

			$('.submissionContainer').removeClass('submissionContainerActive');
			$('#' + containerId).addClass('submissionContainerActive');

			var ckExcludes = ', .cke_editor_body_dialog, .cke_dialog_background_cover';
			var $selector = $('#' + containerId + '.submissionContainerActive' + ckExcludes);

			try {
				if( CKEDITOR ){
					CKEDITOR.on('dialogDefinition', function(e){
						var dialog = e.data.definition.dialog;
						dialog.on('show', function(){
							allyFunctions.disengage(containerId);
						});
						dialog.on('hide', function(){
							allyFunctions.engage(containerId);
						});
					});
					}
			} catch(e){}

			try {
				$.datepicker.setDefaults({
					beforeShow: function(){
						allyFunctions.disengage(containerId);
					},
					onClose: function(){
						allyFunctions.engage(containerId);
					}
				});
			} catch(e){}

			if( $selector.length ){
				ally.when.visibleArea({
					context: $selector,
					callback: function(context) {
						var element = ally.query.firstTabbable({
							context: context,
							defaultToContext: true,
						});
						if(element !== null) {
							element.focus();
						}
					},
				});

				var handles = {
					'disabled': ally.maintain.disabled({ filter: $selector }),
					'hidden': ally.maintain.hidden({ filter: $selector }),
					'tab': ally.maintain.tabFocus({ context: $selector }),
					'key': ally.when.key({ escape: function(){ closeViewer(containerId); } })
				};
				tracking[containerId] = handles;
			}

		},
		'disengage': function(containerId){
			if( tracking.hasOwnProperty(containerId) ){
				tracking[containerId].key.disengage();
				tracking[containerId].tab.disengage();
				tracking[containerId].hidden.disengage();
				tracking[containerId].disabled.disengage();
				delete tracking[containerId];
			}
			if( lastFocusedElement ){
				lastFocusedElement.focus();
			}
		}
	}

	function createViewer(args) {
		var body = document.getElementsByTagName("body")[0];
		var containerArgs = {
			"element": "div",
			"class": "submissionContainer",
			"zIndex": 100+popupsOpen,
			"id": args.hasOwnProperty("containerId") ? args.containerId : "modal_container_" + Math.floor((Math.random() * 1000000) + 1)
		};
		var viewerArgs = {
			"role": "dialog",
			"ariaLabel": "Modal window",
			"class": "submissionViewer mediumElevation",
			"id": args.hasOwnProperty("viewerId") ? args.viewerId : "modal_viewer_" + Math.floor((Math.random() * 1000000) + 1),
			"child": args.hasOwnProperty("child") ? args.child : {},
			"children": args.hasOwnProperty("children") ? args.children : []
		};
		var container, viewer;
		if(popupsOpen > 0) {
			viewerArgs.marginTop = (20 + (popupsOpen*5)) + "px";
		}
		if(args.hasOwnProperty("maxWidth")) {
			viewerArgs.maxWidth = args.maxWidth;
		}
		container = SKILLCASTHTMLJS.createElem(containerArgs);
		viewer = SKILLCASTHTMLJS.createElem(viewerArgs);
		container.appendChild(viewer);
		body.appendChild(container);
		body.style.overflow = "hidden";
		popupsOpen++;
		allyFunctions.engage(container.id);
		return viewer;
	}

	function closeViewerWithCallback(args) {
		closeViewer(args.containerId);
		if (args.hasOwnProperty("callBack")) {
			args.callBack();
		}
	}

	function closeViewer(containerId) {
		allyFunctions.disengage(containerId);
		var v = document.getElementById(containerId);
		var body = document.getElementsByTagName("body")[0];
		try {
			body.removeChild(v);
		} catch (error) {
			$(v).remove();
		}
		popupsOpen--;

		if(popupsOpen > 0){
			allyFunctions.engage( $('.submissionContainer').last().attr('id') );
		}

		if(popupsOpen === 0) {
			body.style.overflow = "auto";
		}
	}

	function createCloseButton(args) {
		var def = {
			'text': 'Close',
			'float': 'none',
			'ui': 'input',
			'icon': 'cross',
			'textAlign' : 'right'
		};
		for (arg in args) {
			def[arg] = args[arg];
		}
		var b = '';
		var b1 = '';

		if(def.ui == 'input') {
			b = SKILLCASTHTMLJS.createElem({
				'element' : 'input',
				'type' : 'button',
				'value' : def.text,
				'marginLeft' : '10px',
				'float' : def.float,
				'class' : 'close',
				'ariaLabel': 'Close modal'
			});
		} else if(def.ui == 'icon'){
			b = SKILLCASTHTMLJS.createElem({
				'element' : 'span',
				'marginLeft' : '10px',
				'float' : def.float,
				'class' : def.icon,
				'cursor' : 'pointer',
				'fontSize' : '1.4em'
			});
			b1 = SKILLCASTHTMLJS.createElem({
					'element' : 'i'
			});
			b.appendChild(b1);
		}

		var d = SKILLCASTHTMLJS.createElem({
			'element' : 'div',
			'textAlign' : def.textAlign
		});
		var pdf = document.createElement("input");
		var word = document.createElement("input");

		if (def.hasOwnProperty("containerId")) {
			b.onclick = function () {
				closeViewerWithCallback(def);
			};
		}

		if (def.hasOwnProperty("miscButtonOne") && def.miscButtonOne != 0) {
			d.appendChild(def.miscButtonOne);
		}

		if (def.hasOwnProperty("miscButtonTwo") && def.miscButtonTwo != 0) {
			d.appendChild(def.miscButtonTwo);
		}


		if(def.hasOwnProperty("downloads") && def.hasOwnProperty("downloadId")) {
			if(def.downloads.hasOwnProperty("pdf")) {
				pdf.type = "button";
				pdf.value = def.downloads.pdf;
				pdf.style.marginLeft = "10px";
				pdf.onclick = function () {
					SKILLCASTHTMLJS.createPdfDownload(document.getElementById(def.downloadId));
				};
				d.appendChild(pdf);
			}
			if(def.downloads.hasOwnProperty("word")) {
				word.type = "button";
				word.value = def.downloads.word;
				word.style.marginLeft = "10px";
				word.onclick = function () {
					SKILLCASTHTMLJS.createDocDownload(document.getElementById(def.downloadId));
				};
				d.appendChild(word);
			}
		}
		d.appendChild(b);
		return d;
	}

	return {
		'createViewer':createViewer,
		'createCloseButton':createCloseButton,
		'closeViewerWithCallback':closeViewerWithCallback,
		'closeViewer':closeViewer,
		'disengageAlly': allyFunctions.disengage,
		'engageAlly': allyFunctions.engage
	};
}

var SKILLCASTHTMLJS = {
	defaults: {
		maxElementHeight: 450,
		maxElementWidth: 590,
		scaleElementDownByPercent: 95,
		maxTableWidth: 595
	},
	ajaxToken:"",
	siteSettings:siteSettings(),
	setAjaxToken: function(token) {
		this.ajaxToken = token;
	},
	getElementScale: function (elementObject) {
		var originalWidth = elementObject.data("originalWidth");
		var originalHeight = elementObject.data("originalHeight");
		var newWidth = elementObject.data("newWidth");
		var newHeight = elementObject.data("newHeight");
		if (typeof originalWidth === "undefined") {
			elementObject.data("originalWidth", elementObject.width());
			originalWidth = elementObject.data("originalWidth");
		}
		if (typeof originalHeight === "undefined") {
			elementObject.data("originalHeight", elementObject.height());
			originalHeight = elementObject.data("originalHeight");
		}
		if (typeof newWidth === "undefined") {
			elementObject.data("newWidth", originalWidth);
			newWidth = elementObject.data("newWidth");
		}
		if (typeof newHeight === "undefined") {
			elementObject.data("newHeight", originalHeight);
			newHeight = elementObject.data("newHeight");
		}
		var elementScaleObject = {
			elementWidth: newWidth,
			elementHeight: newHeight
		};

		return elementScaleObject;
	},
	scaleElement: function (elementToScale, scaleBy) {
		var elementScale = this.getElementScale(elementToScale);
		newWidth = Math.ceil((elementScale.elementWidth / 100) * scaleBy);
		newHeight = Math.ceil((elementScale.elementHeight / 100) * scaleBy);
		var elementObject = {
			elementWidth: newWidth,
			elementHeight: newHeight
		};
		elementToScale.data("newWidth", newWidth).data("newHeight", newHeight);
		return elementObject;
	},
	elementPercentage: function (elementToScale, scaleBy, useMax, maxValues) {
		var elementObject = this.scaleElement(elementToScale, scaleBy);
		if (useMax) {
			while (
				elementObject.elementWidth > maxValues.maxElementWidth ||
				elementObject.elementHeight > maxValues.maxElementHeight
			) {
				elementObject = this.scaleElement(
					elementToScale,
					this.defaults.scaleElementDownByPercent
				);
			}
		}
		return elementObject;
	},
	getChildElementsOf: function (childOf, elementType) {
		var childOfItem = $("[id=" + childOf + "]");
		var elementArray = childOfItem.find(elementType);
		return elementArray;
	},
	checkElementWidthAndHeight: function (elementArray, widthHeightObject) {
		var removeElementIndexArray = [];
		var keepThis = this;
		$.each(elementArray, function (index, object) {
			var checkObject = $(object);
			var elementScale = keepThis.getElementScale(checkObject);
			if (
				elementScale.elementWidth <= widthHeightObject.maxElementWidth &&
				elementScale.elementHeight <= widthHeightObject.maxElementHeight
			) {
				removeElementIndexArray.push(index);
			}
		});
		return removeElementIndexArray;
	},
	setElementWidth: function (elementObject, scaleObject) {
		if (scaleObject.elementWidth > 0) {
			elementObject
				.css("width", scaleObject.elementWidth)
				.attr("width", scaleObject.elementWidth);
		}
		return true;
	},
	setElementHeight: function (elementObject, scaleObject) {
		if (scaleObject.elementHeight > 0) {
			elementObject
				.css("height", scaleObject.elementHeight)
				.attr("height", scaleObject.elementHeight);
		}
		return true;
	},
	processScaleWidthAndHeight: function (scaleBy, childOf, elementType) {
		var scaleElementArray = this.getChildElementsOf(childOf, elementType);
		var keepThis = this;
		$.each(scaleElementArray, function (index, object) {
			var elementObject = $(this);
			elementObject.removeData("newWidth").removeData("newHeight");
			var scaleObject = keepThis.elementPercentage(
				elementObject,
				scaleBy,
				false,
				this.defaults
			);
			keepThis.setElementWidth(elementObject, scaleObject);
			keepThis.setElementHeight(elementObject, scaleObject);
		});
		return true;
	},
	processTableScale: function (scaleBy) {
		var allTables = $("table");
		$.each(allTables, function (index, object) {
			var tableWidth = $(this).width();
			if (tableWidth >= this.defaults.maxTableWidth) {
				tableWidth = this.defaults.maxTableWidth;
			}
			$(this).css("width", tableWidth - 1 + "px");
			$(this).attr("width", tableWidth - 1 + "px");
		});
		return true;
	},
	popupViewer: popupViewerFunctions(),
	createViewer: function (args) {
		return this.popupViewer.createViewer(args);
	},
	closeViewerWithCallback: function (args) {
		return this.popupViewer.closeViewerWithCallback(args);
	},
	createCloseButton: function (args) {
		return this.popupViewer.createCloseButton(args);
	},
	closeViewer: function(def) {
		return this.popupViewer.closeViewer(def.containerId);
	},
	createRecordViewer: function(containerId, viewerId, args) {
		var viewer = this.createViewer({"containerId":containerId, "viewerId":viewerId});
		args.contentId = containerId + "Content";
		var contents = this.createRecordsFromArray(args);
		var closeButtonArgs = {
			"text":"Close",
			"containerId":containerId,
			"downloadId":args.contentId,
			"downloads": (args.hasOwnProperty("downloads") ? args.downloads : {})
		};
		viewer.appendChild(SKILLCASTHTMLJS.createCloseButton(closeButtonArgs));
		viewer.appendChild(contents);
		return contents;
	},
	createRecordsFromArray: function(args) {
		var contents = this.createElem({"id":args.contentId});
		var gridCols = [
			{"width":"30%"},
			{"width":"70%", "class":"submissionGridValue"}
		];
		if(args.hasOwnProperty("title")) {
			contents.appendChild(SKILLCASTHTMLJS.createElem({"text":args.title, "class":"submissionHeading"}));
		}
		contents.appendChild(SKILLCASTHTMLJS.createInlineBlockGrid({
			"data":args.recordArray,
			"cols":gridCols,
			"class":"submissionSection"
		}));
		return contents;
	},
	getDateRange: function( from, to ) {
		var dates = [];
		for( var date = moment(new Date(from)); date <= to; date.add(1, 'days') ){
			dates.push( moment(new Date(date)) );
		}
		return dates;
	},
	dayRangeGaps: function( dates ) {
		return dates.reduce( function( output, day ) {
			if ( output.last === day) {
				return output;
			}
			var days = SKILLCASTHTMLJS.daysBetween( output.last, day);
			var weeks = SKILLCASTHTMLJS.weeksBetween( output.last, day );
			var daysMin = Math.min(output.daysMin, days);
			var daysMax = Math.max(output.daysMax, days);
			var weeksMin = Math.min(output.weeksMin, weeks);
			var weeksMax = Math.max(output.weeksMax, weeks);
			return {
				...output,
				daysMin: daysMin,
				daysMax: daysMax,
				weeksMin: weeksMin,
				weeksMax: weeksMax,
				last: day
			};
		}, { daysMin: 7, daysMax: 0, weeksMin: 1000, weeksMax: 0, last: dates[0] } );
	},
	daysBetween: function( a, b ) {
			var dates = ( a < b ) ? [ b, a ] : [ a, b ];
			return dates[0].diff(dates[1], 'days');
	},
	weeksBetween: function( a, b ) {
			var dates = ( a < b ) ? [ b, a ] : [ a, b ];
			return dates[0].diff(dates[1], 'week');
	},
	formatDefaultDate: function (jsDate) {
		return this.AdvDateFormat(jsDate, skillcastDateMask);
	},
	formatDate: function (jsDate, mask) {
		var dateMask = (typeof mask === "undefined") ? "yyyy-mm-dd" : mask;
		return this.AdvDateFormat(jsDate, dateMask);
	},
	formatTime: function (jsDate) {
		var h = jsDate.getHours();
		var m = jsDate.getMinutes();
		if (h < 10) {
			h = "0" + h;
		}
		if (m < 10) {
			m = "0" + m;
		}
		return h + ":" + m;
	},
	formatDateTime: function (jsDate, mask) {
		var day = this.formatDate(jsDate, mask);
		var at = this.formatTime(jsDate);
		return `${day} ${at}`;
	},
	formatDuration: function(minutes, format){
		var outputFormat = (typeof format === "undefined") ? "day_hour_minute" : format;
		var formatted = '';
		var total_hours = parseInt(Math.floor(minutes / 60));
		var d = parseInt(Math.floor(total_hours / 24));
		var m = parseInt(minutes % 60);
		var h = parseInt(total_hours % 24);

		switch(outputFormat){
			case 'day_hour_minute':
				if( d > 0 ){ formatted += d + (d == 1 ? " day " : " days "); }
				if( h > 0 ){ formatted += h + (h == 1 ? " hour " : " hours "); }
				if( m > 0 ){ formatted += m + (m == 1 ? " minute " : " minutes "); }
				break;
			case 'hour_minute':
				if( d > 0 ){ h = h + (d*24); }
				if( h > 0 ){ formatted += h + (h == 1 ? " hour " : " hours "); }
				if( m > 0 ){ formatted += m + (m == 1 ? " minute " : " minutes "); }
				break;
			case 'minute':
				if( d > 0 ){ h = h + (d*24); }
				if( h > 0 ){ m = m + (h*60); }
				if( m > 0 ){ formatted += m + (m == 1 ? " minute " : " minutes "); }
				break;
		}
		return formatted;
	},
	formatPercentage: function( input ) {
		var test = `${input}`;
		if ( test.includes('.') && test.split('.')[1].length > 3 ) {
			return input.toFixed(3);
		}
		return input;
	},
	createNumberInput: function (def) {
		var b = this.createElem({"element":"input", "type":"number"});
		if(def.hasOwnProperty("min")) {
			b.min = def.min;
		}
		if(def.hasOwnProperty("max")) {
			b.max = def.max;
		}
		if(def.hasOwnProperty("value")) {
			b.value = def.value;
		}
		if(def.hasOwnProperty("id")) {
			b.id = def.id;
		}
		if(def.hasOwnProperty("name")) {
			b.name = def.name;
		}
		if(def.hasOwnProperty("class")) {
			b.className = def["class"];
		}
		return b;
	},
	createDateInput: function (args) {
		var def = {
			"element":"div"
		};
		var d;
		var b = document.createElement("input");
		var datePickerArgs = {
			showButtonPanel: true,
			changeMonth: false,
			changeYear: false,
			closeText: "X",
			showOn: "both",
			buttonImage: "/js/jqueryui/images/calendar.png",
			dateFormat: "yy-mm-dd",
			beforeShow: function (input, inst) {
				setTimeout(function () {
					$(".ui-datepicker").css("z-index", 99999999999999);
					$("[data-handler=today]").remove();
				}, 0);
			},
			onChangeMonthYear: function (year, month, inst) {
				setTimeout(function () {
					$("[data-handler=today]").remove();
				}, 0);
			},
			onchange: ''
		};
		var current_date = new Date();
		var formatted_date = this.formatDate(current_date);
    def.defaultDate = formatted_date;
		for (arg in args) {
			def[arg] = args[arg];
		}
		d = document.createElement(def.element);
		b.type = "text";
		b.name = def.name;
		b.autocomplete = "off";
		b.id = def.id;
		b.value = def.defaultDate;
		b.className = "datePicker";
		if (def.hasOwnProperty("minDate")) {
			datePickerArgs.minDate = def.minDate;
		}
		if (def.hasOwnProperty("maxDate")) {
			datePickerArgs.maxDate = def.maxDate;
		}
		if (def.hasOwnProperty("defaultDate")) {
			datePickerArgs.defaultDate = def.defaultDate;
		}
		if (def.hasOwnProperty("disabled")) {
			b.disabled = def.disabled;
		}
		if (def.hasOwnProperty("class")) {
			$(b).addClass(def.class);
		}
		if ( def.hasOwnProperty("onchange") && typeof def.onchange === 'function' ) {
			datePickerArgs.onSelect = def.onchange;
		}

		$(document).ready(function () {
			$(b).datepicker(datePickerArgs);
		});
		d.appendChild(b);
		return d;
	},
	inheritObjects: function( start, input ) {
		var inKeys = Object.keys(input);
		var outKeys = Object.keys(start);
		var keys = outKeys.filter(function( key ){
			return inKeys.includes(key);
		});
		return keys.reduce(function( output, key ){
			output[key] = input[key];
			return output;
		}, { ...start } );
	},
	mergeObjects: function( start, input ) {
		var keys = Object.keys(input);
		return keys.reduce(function( output, key ){
			output[key] = input[key];
			return output;
		}, { ...start } );
	},
	randomInputName: function (type){
		var date = Date.now();
		var id = Math.floor((Math.random() * 1000000) + 1);
		return `input${type}_${date}_${id}`;
	},
	createTimeInput: function (args) {
		var start = {
			defaultTime: '00:00',
			minHours: 0,
			maxHours: 23,
			minMins: 0,
			maxMins: 59,
			id: this.randomInputName('Time'),
			onchange: ''
		};
		var def = this.inheritObjects( start, args );
		var d = document.createElement("div");
		var i;
		var optionArray = [];
		var paddedValue = "";
		var timeArray = "00:00";
		var hiddenInput = this.createElem({
			"element":"input",
			"type":"hidden",
			"value":def.defaultTime
		});

		hiddenInput.id = def.id;
		timeArray = def.defaultTime.split(":");
		for(i=def.minHours; i<=def.maxHours; i++) {
			paddedValue = ("0" + i).slice(-2);
			optionArray.push({"value":paddedValue, "label":paddedValue});
		}
		selectHours = this.createSelect({
			"options":optionArray,
			"selectedValue":timeArray[0],
			"onchange":function() {
				hiddenInput.value = $(selectHours).val() + ":" + $(selectMins).val();
				if ( def.hasOwnProperty("onchange") && typeof def.onchange === 'function' ) {
					def.onchange();
				}
			}
		});
		optionArray = [];
		for(i=def.minMins; i<=def.maxMins; i++) {
			paddedValue = ("0" + i).slice(-2);
			optionArray.push({"value":paddedValue, "label":paddedValue});
		}
		selectMins = this.createSelect({
			"options":optionArray,
			"selectedValue":timeArray[1],
			"onchange":function() {
				hiddenInput.value = $(selectHours).val() + ":" + $(selectMins).val();
				if ( def.hasOwnProperty("onchange") && typeof def.onchange === 'function' ) {
					def.onchange();
				}
			}
		});
		d.appendChild(hiddenInput);
		d.appendChild(selectHours);
		d.appendChild(selectMins);
		return d;
	},
	createDateTimeInput: function(args) {
		var start = {
			defaultTime: "00:00",
			minHours: 0,
			maxHours: 23,
			minMins: 0,
			maxMins: 59,
			element: "div",
			onchange: ""
		};
		var def = this.mergeObjects( start, args );
		var dateTimeContainer = this.createElem({"element":def.element});
		var dateInputArgs = {
			"id":def.id + "Date",
			"name":def.id + "Date"
		};
		var timeInputArgs = {
			"id":def.id + "Time",
			"defaultTime":def.defaultTime,
			"minHours":def.minHours,
			"maxHours":def.maxHours,
			"minMins":def.minMins,
			"maxMins":def.maxMins
		};
		var dateInput;
		var timeInput;

		if(def.hasOwnProperty("defaultDate")) {
			var timeSplit = def.defaultDate.split(' ');
			if ( timeSplit.length === 2 && timeSplit[1].length === 5 && !args.hasOwnProperty("defaultTime")) {
				def.defaultDate = timeSplit[0];
				timeInputArgs.defaultTime = timeSplit[1];
			}
			dateInputArgs.defaultDate = def.defaultDate;
		}
		if(def.hasOwnProperty("minDate")) {
			dateInputArgs.minDate = def.minDate;
		}
		if(def.hasOwnProperty("maxDate")) {
			dateInputArgs.maxDate = def.maxDate;
		}
		if(def.hasOwnProperty("onchange")) {
			dateInputArgs.onchange = def.onchange;
			timeInputArgs.onchange = def.onchange;
		}
		dateInput = this.createDateInput(dateInputArgs);
		timeInput = this.createTimeInput(timeInputArgs);
		dateInput.style.display = "inline";
		timeInput.style.display = "inline";
		dateTimeContainer.appendChild(dateInput);
		dateTimeContainer.appendChild(timeInput);
		return dateTimeContainer;
	},
	createDateInputDiv: function (args) {
		var d = document.createElement("div");
		args.element = "input";
		args.type = "date";
		var b = this.createElem(args);
		d.appendChild(b);
		return d;
	},
	fadeInElem: function (elem, display) {
		var op = 0.1;
		elem.style.opacity = "0";
		elem.style.visibility = "visible";
		elem.style.display = display;
		var timer = setInterval(function () {
			if (op >= 1) {
				clearInterval(timer);
			}
			elem.style.opacity = op;
			op += op * 0.1;
		}, 10);
	},
	createPdfDownload: function(elem) {
		var pdfForm = this.createElem({"element":"form"});
		var pdfContent = elem.innerHTML.split("%").join("[percent]");
		pdfForm.appendChild(this.createElem({
			"element":"input",
			"type":"hidden",
			"name":"html",
			"value":pdfContent
		}));
		pdfForm.appendChild(this.createElem({
			"element":"input",
			"type":"hidden",
			"name":"pdfHeader",
			"value":""
		}));
		pdfForm.appendChild(this.createElem({
			"element":"input",
			"type":"hidden",
			"name":"pdfFooter",
			"value":""
		}));
		var pdfData = new FormData(pdfForm);
		SKILLCASTHTMLJS.skillcastAJAXForm('moduleServices', 'createPdfDownload', pdfData, function(data) {
			if(data.error == 0) {
				window.location = data.tempFileUrl;
			}
		});
	},
	createDocDownload: function(elem) {
		var args = {
			"html":escape(elem.innerHTML),
			"pdfheader":"",
			"pdffooter":""
		};
		SKILLCASTHTMLJS.skillcastAJAX("moduleServices", "createDocDownload", args, function(data) {
			if(data.error == 0) {
				window.location = data.tempFileUrl;
			}
		});
	},
	createElem: function (elem) {
		var def = {
			element: "div"
		};
		var arg = "";
		for (arg in elem) {
			def[arg] = elem[arg];
		}
		var d = document.createElement(def.element);
		var attribute = "";
		var attributes = {
			"alt":"alt",
			"ariaHidden": "aria-hidden",
			"ariaLabel": "aria-label",
			"ariaPressed":"aria-pressed",
			"class":"class",
			"dataType":"data-type",
			"enctype":"enctype",
			"href":"href",
			"id":"id",
			"labelFor":"for",
			"method":"method",
			"name":"name",
			"placeholder":"placeholder",
			"role":"role",
			"rows":"rows",
			"size":"size",
			"src":"src",
			"target":"target",
			"type":"type",
			"value":"value",
			"min":"min",
			"max":"max",
			"autocomplete":"autocomplete",
			"action":"action",
			"tabindex":"tabindex",
			"title":"title",
			"accept": "accept",
			"role": "role",
			"ariaLive": "aria-live",
			"ariaLabel": "aria-label",
			"ariaLabelledBy": "aria-labelledby",
			"ariaDescribedBy": "aria-describedby",
			"maxlength": "maxlength",
			"contenteditable": "contenteditable",
			"dataIndex": "data-index",
			"dataActive": "data-active",
			"dataSelected": "data-selected",
			"ariaRequired": "aria-required",
			"contenteditable": "contenteditable"
		};
		var styles = {
			"alignSelf":"alignSelf",
			"background":"background",
			"backgroundColor":"backgroundColor",
			"border":"border",
			"borderColor":"borderColor",
			"borderBottom":"borderBottom",
			"borderRadius":"borderRadius",
			"borderWidth":"borderWidth",
			"borderStyle":"borderStyle",
			"bottom":"bottom",
			"boxShadow":"boxShadow",
			"clip":"clip",
			"color":"color",
			"cursor":"cursor",
			"display":"display",
			"float":"float",
			"fontSize":"fontSize",
			"fontWeight":"fontWeight",
			"height":"height",
			"left":"left",
			"lineHeight":"lineHeight",
			"margin":"margin",
			"marginTop":"marginTop",
			"marginRight":"marginRight",
			"marginBottom":"marginBottom",
			"marginLeft":"marginLeft",
			"maxWidth":"maxWidth",
			"minWidth":"minWidth",
			"overflow":"overflow",
			"outline":"outline",
			"padding":"padding",
			"paddingTop":"paddingTop",
			"paddingRight":"paddingRight",
			"paddingBottom":"paddingBottom",
			"paddingLeft":"paddingLeft",
			"position":"position",
			"right":"right",
			"textAlign":"textAlign",
			"top":"top",
			"transform":"transform",
			"verticalAlign":"verticalAlign",
			"visibility":"visibility",
			"width":"width",
			"maxHeight":"maxHeight",
			"minHeight":"minHeight",
			"listStyle":"listStyle",
			"zIndex":"zIndex"
		};
		var flags = {
			"readonly":"readonly",
			"selected":"selected",
			"multiple":"multiple",
			"checked":"checked",
			"disabled":"disabled",
			"required": "required",
			"open": "open"
		};
		if (def.hasOwnProperty("text")) {
			d.innerText = def.text;
		}
		if (def.hasOwnProperty("html")) {
			d.innerHTML = def.html;
		}
		for(attribute in attributes) {
			if (def.hasOwnProperty(attribute)) {
				d.setAttribute(attributes[attribute],def[attribute]);
			}
		}
		for(attribute in styles) {
			if (def.hasOwnProperty(attribute)) {
				d.style[attribute] = def[attribute];
			}
		}
		for(attribute in flags) {
			if (def.hasOwnProperty(attribute) && def[attribute]) {
				d.setAttribute(flags[attribute],def[attribute]);
			}
		}
		if (def.hasOwnProperty("data")) {
			for (attribute in def.data) {
				d.setAttribute("data-" + attribute, def.data[attribute]);
			}
		}
		if (def.hasOwnProperty("onclick")) {
			if (def.hasOwnProperty("arguments")) {
				d.onclick = function () {
					def.onclick(def.arguments);
				};
			} else {
				d.onclick = def.onclick;
			}
		}
		if (def.hasOwnProperty("onchange")) {
			if (def.hasOwnProperty("arguments")) {
				d.onchange = function () {
					def.onchange(def.arguments);
				};
			} else {
				d.onchange = def.onchange;
			}
		}
		if (def.hasOwnProperty("onsearch")) {
			if (def.hasOwnProperty("arguments")) {
				d.onsearch = function () {
					def.onsearch(def.arguments);
				};
			} else {
				d.onsearch = def.onsearch;
			}
		}
		if (def.hasOwnProperty("onkeyup")) {
			if (def.hasOwnProperty("arguments")) {
				d.onkeyup = function () {
					def.onkeyup(def.arguments);
				};
			} else {
				d.onkeyup = def.onkeyup;
			}
		}
		if (def.hasOwnProperty("onblur")) {
			if (def.hasOwnProperty("arguments")) {
				d.onblur = function () {
					def.onblur(def.arguments);
				};
			} else {
				d.onblur = def.onblur;
			}
		}
		if (def.hasOwnProperty("onkeydown")) {
			if (def.hasOwnProperty("arguments")) {
				d.onkeydown = function () {
					def.onkeydown(def.arguments);
				};
			} else {
				d.onkeydown = def.onkeydown;
			}
		}
		if (def.hasOwnProperty("onsubmit")) {
			if (def.hasOwnProperty("arguments")) {
				d.onsubmit = function () {
					def.onsubmit(def.arguments);
				};
			} else {
				def.onsubmit = def.onsubmit;
			}
		} else {

			if (def.element === 'form') {
				def.onsubmit = function(event) {
					event.preventDefault();
				}
				$(document).on('keydown', ':input:not(textarea):not(:submit)', function(event){
					if(event.keyCode == 13) {
						event.preventDefault();
						return false;
					}
				});

			}
		}
		var handledChild = '';
		function handleChild(child){
			if( child instanceof HTMLElement){
				return child;
			} else if( typeof child === 'object' && child !== null ){
				return SKILLCASTHTMLJS.createElem(child);
			} else if( child && {}.toString.call(child) === '[object Function]' ){
				return child();
			}
			return '';
		}
		if (def.hasOwnProperty("child")) {
			handledChild = handleChild(def.child);
			if( handledChild != '' ){ d.appendChild(handledChild); }
		}
		if (def.hasOwnProperty("children")) {
			if( Array.isArray(def.children) ){
				for (var c=0; c<def.children.length; c++) {
					handledChild = handleChild(def.children[c]);
					if( handledChild != '' ){ d.appendChild(handledChild); }
				}
			}
		}
		return d;
	},
	createList: function (args) {
		var def = {
			"items": [],
			"class": ""
		};
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}
		var itemArray = def.items;
		var u = this.createElem({ element: "ul" });
		var itemCount = itemArray.length;
		for (var i = 0; i < itemCount; i++) {
			u.appendChild(
				this.createElem({
					"element": "li",
					"text": itemArray[i],
					"class": def["class"]
				})
			);
		}
		return u;
	},
	createTable: function (args) {
		var def = {
			"columns": [],
			"data": [],
			"class": "",
			"id": "",
			"rowdata": {},
			"footer": false,
			"header": true
		};
		var i = 0;
		var j = 0;
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}
		var cols = def.columns.length;
		var rows = def.data.length;
		var t = this.createElem({"element": "table"});
		if( def.class.length > 0 ){ t.className = def.class; }
		if( def.id.length > 0 ){ t.id = def.id; }
		var thead = this.createElem({ element: "thead" });
		var tbody = this.createElem({ element: "tbody" });
		var tfoot = this.createElem({ element: "tfoot" });
		var tr = this.createElem({ element: "tr" });
		var th = this.createElem({ element: "th" });
		var tf = this.createElem({ element: "tr" });
		var td = "";
		var jsDate = "";
		var onclickArgs = {};
		var trArgs = {};
		var dataArgs = {};
		var tdValue = "";
		var colgroup = this.createElem({"element":"colgroup"});
		var useColgroup = false;
		var checkboxButtonDiv = this.createElem({});
		var selectedItemsDiv = this.createElem({});
		var tableContainer = this.createElem({});
		var checkboxSelector,checkboxActions,checkboxAll;
		var tdhtml = '';
		var idx = 0;
		var keys = {};
		var valTemplate = '';
		var keyidx = 0;
		var usrKey = '';
		var usrVal = '';
		var ariaLabel = '';
		if(def.hasOwnProperty("checkbox")) {
			def.columns.unshift(
				{"name":"", "field":def.checkbox.name, "type":"checkbox"}
			);
			cols++;
			tableContainer.appendChild(t);
			tableContainer.appendChild(this.createInlineBlockGrid({
				"data":[
					[
						{"element":selectedItemsDiv},
						{"element":checkboxButtonDiv}
					]
				],
				"cols":[
					{"width":"50%"},
					{"width":"50%"}
				]
			}));
			checkboxSelector = "[name='" + def.checkbox.name + "']";
			checkboxActions = def.checkbox.actions.length;
			function toggleCheckboxButton() {
				var selectedArray = getSelectedItems();
				var selectedItems = selectedArray.length;
				checkboxButtonDiv.innerHTML = "";
				selectedItemsDiv.innerHTML = "";
				if(selectedItems > 0) {
					for(i=0; i<checkboxActions; i++) {
						checkboxButtonDiv.appendChild(SKILLCASTHTMLJS.createElem({
							"element":"input",
							"type":"button",
							"value":def.checkbox.actions[i].label,
							"float":"right",
							"onclick":(function(callBack) {
								return function() {
									callBack(getSelectedItems());
								}
							})(def.checkbox.actions[i].callBack)
						}));
					}
					selectedItemsDiv.innerText = selectedItems + " item" + (selectedItems > 1 ? "s" : "") + " selected";
				}
			}
			function getSelectedItems() {
				var checkboxArray = [];
				var searchInputValue = $('.dataTables_filter input').val();
				$('.dataTables_filter input').val("");
				$('.dataTables_filter input').keyup();
				$(checkboxSelector + ":checked").each(function() {
					checkboxArray.push($(this).val());
				});
				$('.dataTables_filter input').val(searchInputValue);
				$('.dataTables_filter input').keyup();
				return checkboxArray;
			}
			function setSelectedItems(valueArray) {
				var valueArrayLen = valueArray.length;
				var i;
				for(i=0; i<valueArrayLen; i++) {
					$(checkboxSelector + "[value=" + valueArray[i] + "]").prop("checked","true");
				}
				toggleCheckboxButton();
			}
			function resetPageLength(pageLength) {
				$('.' + def.class).DataTable().page.len(pageLength).draw();
			}
		}
		if(def.hasOwnProperty("onclick") && def.hasOwnProperty("onclickIcon")) {
			def.columns.push(
				{"name":"", "field":"", "type":"onclickButton"}
			);
			cols++;
		}
		for (i = 0; i < cols; i++) {
			trArgs = {"element":"col"};
			if(def.columns[i].hasOwnProperty("width")) {
				trArgs.width = def.columns[i].width;
				useColgroup = true;
			}
			colgroup.appendChild(this.createElem(trArgs));
			th = this.createElem({element:"th", "text":def.columns[i].name});
			if(def.columns[i].type === "checkbox") {
				checkboxAll = this.createElem({
					"element":"input",
					"type":"checkbox",
					"checked":(def.checkbox.hasOwnProperty("checked") && def.checkbox.checked),
					"onclick":function() {
						$(checkboxSelector).prop("checked",checkboxAll.checked);
						toggleCheckboxButton();
					}
				});
				th.appendChild(checkboxAll);
			}
			tr.appendChild(th);
			tf.appendChild(this.createElem({element:"th"}));
		}
		thead.appendChild(tr);
		tfoot.appendChild(tf);
		for (j = 0; j < rows; j++) {
			trArgs = { "element": "tr", "class": "notClickable", "data" : {}};
			if(def.hasOwnProperty("onclick")) {
				onclickArgs = {};
				if (def.hasOwnProperty("arguments")) {
					for (arg in def.arguments) {
						onclickArgs[arg] = def.data[j][arg];
					}
				}
				if ((!def.hasOwnProperty("onclickCondition")) || def.data[j][def.onclickCondition]) {
					trArgs["class"] = "clickable";
					trArgs["tabindex"] = "0";
					trArgs.onclick = (function (onclickArgs) {
						return function () {
							def.onclick(onclickArgs);
						};
					})(onclickArgs);
					trArgs.onkeyup = (function (onclickArgs) {
						return function (e) {
							if (e.which == 13 || e.which == 32) {
								def.onclick(onclickArgs);
							}
						};
					})(onclickArgs);
				}
			}
			if (def.hasOwnProperty("rowdata")) {
				for (arg in def.rowdata) {
					if(def.rowdata[arg] == '[idx]'){
						dataArgs[arg] = j;
					} else if(typeof(def.data[j][def.rowdata[arg]]) !== 'undefined'){
						dataArgs[arg] = def.data[j][def.rowdata[arg]];
					} else {
						dataArgs[arg] = def.rowdata[arg];
					}
				}
				trArgs['data'] = dataArgs;
			}
			tr = this.createElem(trArgs);
			for (i = 0; i < cols; i++) {
				if(def.columns[i].type === "checkbox") {
					td = this.createElem({
						element: "td",
						width: "40px"
					});
					td.onclick = function(e) {
						e.stopPropagation();
					};
				   	td.appendChild(this.createElem({
						"element":"input",
						"type":"checkbox",
						"name":def.checkbox.name,
						"checked":(def.checkbox.hasOwnProperty("checked") && def.checkbox.checked),
						"value":def.data[j][def.checkbox.field],
						"onclick":toggleCheckboxButton
					}));
				} else if(def.columns[i].type === "onclickButton") {
					td = this.createElem({
						element: "td",
						width: "40px"
					});
					if((!def.hasOwnProperty("onclickCondition")) || def.data[j][def.onclickCondition]) {
						ariaLabel = this.createTableButtonLabel(def,j);
						td.appendChild(this.createElem({
							"element":"button",
							"type":"button",
							"onclick":function(e) {
								e.stopPropagation();
								this.parentElement.parentElement.click();
							},
							"ariaLabel":ariaLabel,
							"child":SKILLCASTHTMLJS.createElem({
								"element":"i",
								"class":def.onclickIcon
							})
						}));
					}
				} else {
					tdValue = def.data[j][def.columns[i].field];
					var dateColumnTypes = [ "date", "datetime", "momentDatetime" ];
					if ( dateColumnTypes.includes(def.columns[i].type) ) {
						if(tdValue === "") {
							td = this.createElem({
								element: "td",
								text: "",
								data: { sort: "" }
							});
						} else if (def.columns[i].type === "momentDatetime") {
							var momentCols = def.columns[i];
							var textFormat = ( momentCols.hasOwnProperty('format') && momentCols.format.length > 0 ) ? momentCols.format : skillcastMomentDateMask;
							var sortFormat = ( momentCols.hasOwnProperty('sort') && momentCols.sort.length > 0 ) ? momentCols.sort : skillcastMomentDateSort;
							if ( tdValue.isValid() ) {
								td = this.createElem({
									element: "td",
									text: tdValue.format(textFormat),
									data: { sort: tdValue.format(sortFormat) }
								});
							} else {
								td = this.createElem({
									element: "td",
									text: "",
									data: { sort: "" }
								});
							}

						} else {
							jsDate = new Date(tdValue);
							if(def.columns[i].type === "datetime"){
								td = this.createElem({
									element: "td",
									text: this.AdvDateFormat(jsDate, 'dd/mm/yyyy HH:MM:ss'),
									data: { sort: this.AdvDateFormat(jsDate, 'yyyy-mm-dd HH:MM:ss') }
								});
							} else {
								td = this.createElem({
									element: "td",
									text: this.formatDefaultDate(jsDate),
									data: { sort: this.formatDate(jsDate) }
								});
							}
						}
					} else if (def.columns[i].type === "number") {
						td = this.createElem({
							element: "td",
							text: tdValue,
							textAlign: "center",
							data: { sort: (tdValue === "") ? 1000000000 : tdValue }
						});
					} else if (def.columns[i].type === "element") {
						td = this.createElem({
							element: "td"
						});
						if(def.columns[i].hasOwnProperty("sortField") && def.columns[i].sortField !== "" && def.data[j].hasOwnProperty(def.columns[i].sortField)) {
							td.setAttribute("data-sort",def.data[j][def.columns[i].sortField]);
						}
						td.appendChild(tdValue);
					} else if (def.columns[i].type === "array" && def.columns[i].hasOwnProperty("template")) {
						tdhtml = '';
						for (idx in tdValue) {
							keys = Object.keys(tdValue[idx]);
							valTemplate = def.columns[i].template;

							for (keyidx in keys) {
								usrKey = keys[keyidx];
								usrVal = tdValue[idx][keys[keyidx]];
								valTemplate = valTemplate.replace('[' + usrKey + ']', usrVal)
							};
							tdhtml+=valTemplate;
						};
						td = this.createElem({
							element: "td",
							html: tdhtml
						});
					} else if (def.columns[i].type === "html" && def.columns[i].hasOwnProperty("template")) {
							tdhtml = '';
							showTemplate = 1;

							if(def.columns[i].hasOwnProperty("hideIfEmpty") && def.columns[i].hideIfEmpty && tdValue.length == 0){
								showTemplate = 0;
							}

							if(showTemplate){
								tdhtml = def.columns[i].template.replace('[' + def.columns[i].field + ']', tdValue);
							}

							td = this.createElem({
						element: "td",
						html: tdhtml
					});
					} else {
						td = this.createElem({
							element: "td",
							text: tdValue
						});
					}
				}
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		if(useColgroup) {
			t.appendChild(colgroup);
		}
		if(def.header) {
			t.appendChild(thead);
		}
		t.appendChild(tbody);
		if(def.footer) {
			t.appendChild(tfoot);
		}
		if(def.hasOwnProperty("checkbox")) {
			return {
				'container': tableContainer,
				'table': t,
				'selectedItems': getSelectedItems,
				'setSelectedItems' : setSelectedItems,
				'resetPageLength' : resetPageLength,
				'toggleCheckboxButton': toggleCheckboxButton
			};
		} else {
			return t;
		}
	},
	createTableButtonLabel: function(def,j) {
		var label = (def.hasOwnProperty("onclickLabel")) ? def.onclickLabel : "";
		var i;
		var args = (def.hasOwnProperty("onclickLabelArguments")) ? def.onclickLabelArguments.length : 0;
		if(args > 0) {
			for(i=0; i<args; i++) {
				label += " " + def.data[j][def.onclickLabelArguments[i]];
			}
		}
		return label;
	},
	initDataTable: function (args) {
		var def = {
			language: (window.hasOwnProperty("scDatatablesLang") ? window.scDatatablesLang  : {}),
			sortByCol: 0,
			sortByOrder: "asc",
			disableSorting: false,
			scrollCollapse: false,
			pageLength: 50,
			lengthChange: true,
			dom: "ftlp",
			columnDefs: [],
			responsive: false,
			filterColumns: [],
			filterPosition: "",
			showExcelButton: false,
			showPdfButton: false,
			bAutoWidth: true,
			lengthMenu: [
				[-1, 10, 25, 50, 75, 100, 250, 500, 1000],
				["All", 10, 25, 50, 75, 100, 250, 500, 1000]
			],
			initComplete: function(){},
			rowCallback: false,
			paging: true
		};
		var arg = "";
		var targets = [];
		var buttons = [];
		var PdfBtn = {};
		var dataTableArgs;
		var buttonArgs;
		for (arg in args) {
			def[arg] = args[arg];
		}
		if(def.filterPosition === "top") {
			for(arg in def.filterColumns) {
				targets.push(def.filterColumns[arg]);
			}
			def.columnDefs.push({
				"targets":targets,
				"orderable":false
			});
		}
		dataTableArgs = {
			language: def.language,
			pageLength: def.pageLength,
			columnDefs: def.columnDefs,
			lengthChange: def.lengthChange,
			responsive: def.responsive,
			dom: def.dom,
			paging: def.paging,
			lengthMenu: def.lengthMenu,
			order: [def.sortByCol, def.sortByOrder],
			ordering: !def.disableSorting,
			rowCallback: def.rowCallback,
			bAutoWidth: def.bAutoWidth,
			initComplete: function () {
				if(def.filterPosition !== "") {
					this.api().columns().every( function () {
						var column = this;
						var container;
						var filter;
						var label;
						if(def.filterColumns.indexOf(column.index()) >= 0) {
							if(def.filterPosition === "top") {
								container = $(column.header());
							} else {
								container = $(column.footer());
							}
							label = container.text();
							container.empty();
							filter = $('<select aria-label="Select ' + label + '"><option value="">' + label + '</option><option value="">---</option></select>').appendTo(container).on('change', function () {
								var val = $.fn.dataTable.util.escapeRegex(
									$(this).val()
								);
								column.search( val ? '^'+val+'$' : '', true, false ).draw();
							});
							column.data().unique().sort().each( function ( d, j ) {
								filter.append( '<option value="'+d+'">'+d+'</option>' )
							});
						}
					});
				}
				def.initComplete(this);
			}
		};
		if(def.showExcelButton) {
			buttonArgs = {
				extend: 'excelHtml5'
			}
			if(def.hasOwnProperty("excelColumns")) {
				buttonArgs.exportOptions = {
					"columns":def.excelColumns
				};
			}
			if(def.hasOwnProperty("excelTitle")) {
				buttonArgs["title"] = def.excelTitle;
			}
			buttons.push(buttonArgs);
		}
		if(def.showPdfButton) {
			pdfBtn = {
				extend: 'pdfHtml5',
				orientation: 'landscape',
				pageSize: 'A4',
				exportOptions: {
					format: {
						body: function (data) {
							return data.replace( /<br\s*\/?>/ig, "\n" );
						}
					}
				}
			};
			if(def.hasOwnProperty("pdfColumns")) {
				pdfBtn.exportOptions["columns"] = def.pdfColumns
			}
			if(def.hasOwnProperty("pdfTitle")) {
				pdfBtn["title"] = def.pdfTitle
			}
			buttons.push(pdfBtn);
		}
		if(buttons.length > 0) {
			dataTableArgs.buttons = buttons;
			if(dataTableArgs.dom.indexOf("B") < 0) {
				dataTableArgs.dom = "B" + dataTableArgs.dom;
			}
		}
		if(def.hasOwnProperty("scroll")) {
			dataTableArgs.scrollY = def.scroll.height;
			dataTableArgs.scrollCollapse = def.scroll.collapse;
			dataTableArgs.scroller = true;
		}
		if(def.hasOwnProperty("scrollY")) {
			dataTableArgs.scrollY = def.scrollY;
			dataTableArgs.scrollCollapse = def.scrollCollapse;
			dataTableArgs.paging = false;
		}
		$(def.tableElem).DataTable(dataTableArgs);
	},
	createDataTableFilter: function (args) {
		var containerClass = args.hasOwnProperty("class") ? args.class : "";
		var container = this.createElem({"class":containerClass});
		var table = args.hasOwnProperty("elem") ? $(args.elem) : $("#" + args.id);
		var col = table.DataTable().column(args.columnIndex);
		var options = col.data().unique().sort();
		var filterValue = (args.selectedValue) ? args.selectedValue : "";
		var optionArray = [
			{"label":"All","value":""}
		];
		var optionsLen = options.length;
		var i;
		for(i=0; i<optionsLen; i++) {
			if(options[i] !== "") {
				optionArray.push({"label":options[i],"value":options[i]});
			}
		}
		if(args.hasOwnProperty("label")) {
			container.appendChild(this.createElem({
				"element":"span",
				"text":args.label + ": "
			}));
		}
		container.appendChild(this.createSelect({
			"options":optionArray,
			"selectedValue":args.selectedValue,
			"onchange":function() {
				filterValue = $(this).val();
				col.search(filterValue).draw();
			}
		}));

		setTimeout(function(){
			col.search(filterValue).draw();
		},0)


		return container;
	},
	createSelect: function (args) {
		var def = {
			options: [],
			selectedValue: "",
			addEmptyOption: false,
			emptyOptionLabel: "",
			addData: false,
			optionValueKey: 'value',
			optionLabelKey: 'label',
			required: false,
			strictEquality: false,
			disabled: false
		};
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}
		var attribute = "";
		var attributes = {
			"border":"border",
			"width":"width",
			"class":"class",
			"id":"id",
			"multiple":"multiple",
			"name":"name",
			"onchange":"onchange",
			"required":"required",
			"disabled":"disabled",
			"size":"size"
		}
		var options = def.options;
		var optionsCount = options.length;
		var elem = { element: "select", required: def.required, disabled: def.disabled };
		var addData = def.addData;
		var optionValueKey = def.optionValueKey;
		var optionLabelKey = def.optionLabelKey;
		var selectedValue = def.selectedValue;
		var strictEquality = def.strictEquality;
		var createElemOptionArgs;
		var optionItem;
		var isSelected, optionValueKeyItem;
		for(attribute in attributes) {
			if (def.hasOwnProperty(attribute)) {
				elem[attributes[attribute]] = def[attribute];
			}
		}
		s = this.createElem(elem);
		if(def.addEmptyOption) {
			s.appendChild(
				this.createElem({
					element: "option",
					value: "",
					text: def.emptyOptionLabel
				})
			);
		}
		for (var i = 0; i < optionsCount; i++) {
			optionItem = options[i];
			optionValueKeyItem = optionItem[optionValueKey];
			isSelected = (strictEquality) ? (optionValueKeyItem === selectedValue) : (optionValueKeyItem == selectedValue);

			createElemOptionArgs = {
				element: "option",
				value: optionValueKeyItem,
				text: optionItem[optionLabelKey],
				selected: (isSelected) ? true : false
			};

			if(addData){
				createElemOptionArgs['data'] = optionItem;
			}

			s.appendChild(
				this.createElem(createElemOptionArgs)
			);
		}
		return s;
	},
	createCheckboxSet: function (args) {
		var def = {
			options: [],
			selectedValue: [],
			name: ""
		};
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}
		var optionCount = def.options.length;
		var elem = this.createElem({});
		var i;
		var d;
		var c;
		for(i=0; i<optionCount; i++) {
			d = this.createElem({});
			c = this.createElem({
				"element":"input",
				"type":"checkbox",
				"name":def.name,
				"id":def.name + i,
				"value":def.options[i].value
			});
			if(def.selectedValue.indexOf(def.options[i].value) >= 0) {
				c.checked = true;
			}
			if(def.hasOwnProperty("onclick")) {
				c.onclick = def.onclick;
			}
			d.appendChild(c);
			d.appendChild(this.createElem({
				"element":"label",
				"text":def.options[i].label,
				"labelFor":def.name + i
			}));
			elem.appendChild(d);
		}
		return elem;
	},
	getCheckboxSetValue: function(name) {
		return $("[name='" + name + "']").map(function(){
			if(this.checked) {
				return $(this).val();
			}
		}).get();
	},
	createRadioSet: function (args) {
		var def = {
			options: [],
			selectedValue: ""
		};
		var arg = "";
		var itemArgs = {};
		var container = this.createElem({});
		for (arg in args) {
			def[arg] = args[arg];
		}
		var optionCount = def.options.length;
		for (var i = 0; i < optionCount; i++) {
			itemArgs = {
				id: def.name + "_" + i,
				name: def.name,
				value: def.options[i].value,
				checked: (def.options[i].value == def.selectedValue) ? true : false
			}
			itemArgs.labelElem = this.createElem({
				"element":"label",
				"labelFor":itemArgs.id,
				"verticalAlign":"middle",
				"margin":"0 0 0 5px"
			});
			if(def.options[i].hasOwnProperty("labelElem")) {
				itemArgs.labelElem.appendChild(def.options[i].labelElem);
			} else if(def.options[i].hasOwnProperty("label")) {
				itemArgs.labelElem.innerText = def.options[i].label;
			}
			if(def.hasOwnProperty("onclick")) {
				itemArgs.onclick = def.onclick
			}
			container.appendChild(this.createRadioItem(itemArgs));
		}
		return container;
	},
	createRadioItem: function (args) {
		var def = {
			name: "",
			id: "",
			value: "",
			checked: false,
			verticalAlign: "middle"
		};
		var arg = "";
		var elem = {};
		var container = this.createElem({"margin":"0 0 5px 0"});
		for (arg in args) {
			def[arg] = args[arg];
		}
		elem = {
			element: "input",
			type: "radio",
			id: def.id,
			name: def.name,
			value: def.value,
			verticalAlign: def.verticalAlign
		};
		if (def.checked) {
			elem["checked"] = def.checked;
		}
		if (def.hasOwnProperty("onclick")) {
			elem["onclick"] = def.onclick;
		}
		if (def.hasOwnProperty("onchange")) {
			elem["onchange"] = def.onchange;
		}
		container.appendChild(this.createElem(elem));
		if(def.hasOwnProperty("labelElem")) {
			container.appendChild(def.labelElem);
		}
		return container;
	},
	removeSelectOptions: function(selectbox) {
		var i;
		var optionCount = selectbox.options.length;
		for(i = optionCount - 1 ; i >= 0 ; i--) {
			selectbox.remove(i);
		}
	},
	addSelectOptions: function(selectbox,optionArray) {
		var i;
		var optionArrayCount = optionArray.length;
		for(i = 0; i<optionArrayCount; i++) {
			selectbox.add(this.createElem({"element":"option", "value":optionArray[i].value, "text":optionArray[i].label}));
		}
	},
	createInlineBlockGrid: function (args) {
		def = {
			data: [],
			cols: [],
			"class": ""
		};
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}
		var dataLength = def.data.length;
		var colsLength = def.cols.length;
		var i = 0;
		var j = 0;
		var elem = this.createElem({ "class": def["class"] });
		var block;
		var row;
		var table = this.createElem({"element":"table", "class": "responsiveGridTable", "role": "presentation" });
		var content = "";
		var dataEntry = "";
		if(def.hasOwnProperty("id")) {
			elem.id = def.id;
		}
		for (i = 0; i < colsLength; i++) {
			def.cols[i]["class"] =
				(def.cols[i].hasOwnProperty("class")
					? def.cols[i]["class"] + " "
					: "") + "responsiveGridContent";
			def.cols[i]["width"] = def.cols[i].hasOwnProperty("width")
				? def.cols[i]["width"]
				: "100%";
		}
		for (i = 0; i < dataLength; i++) {
			row = this.createElem({"element":"tr", "class":"responsiveGridRow"});
			for (j = 0; j < colsLength; j++) {
				dataEntry = {};
				if (def.data[i].length - 1 >= j) {
					dataEntry = def.data[i][j];
				}
				content = this.createElem({
					"class": def.cols[j]["class"],
					text: dataEntry.hasOwnProperty("text") ? dataEntry["text"] : ""
				});
				block = this.createElem({
					"element":"td",
					"class": "responsiveGridBlock",
					width: def.cols[j]["width"]
				});
				if (dataEntry.hasOwnProperty("element")) {
					content.appendChild(dataEntry["element"]);
				}
				if (dataEntry.hasOwnProperty("id")) {
					content.id = dataEntry.id;
				}
				block.appendChild(content);
				row.appendChild(block);
			}
			table.appendChild(row);
		}
		elem.appendChild(table);
		return elem;
	},
	toggleTabs: function (args, selectedId) {
		var def = {
			id: "tabs",
			tabs: [],
			readyStateClass: "tabButtonReady",
			activeStateClass: "tabButtonActive",
			visibleClass: "tabPanelVisible",
			hiddenClass: "tabPanelHidden"
		};
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}

		var tabItem = {};
		for (var i = 0; i < def.tabs.length; i++) {
			tabItem = def.tabs[i];
			document.getElementById(tabItem.id).className = def.hiddenClass;
			var hidden = document.getElementById(tabItem.id);
			hidden.setAttribute("tabindex","0");
			hidden.setAttribute("role", "tabpanel");
			hidden.setAttribute("aria-labelledby", tabItem.id);
			hidden.setAttribute("hidden", "");

			document.getElementById(tabItem.id + "Tab").className = def.readyStateClass;
			var ready = document.getElementById(tabItem.id + "Tab");
			ready.setAttribute("aria-selected","false");
			ready.setAttribute("tabindex","-1");
			ready.setAttribute("aria-controls", tabItem.id);
		}

		document.getElementById(selectedId).className = def.visibleClass;
		var visible = document.getElementById(selectedId);
		visible.removeAttribute("hidden", "");
		visible.removeAttribute("tabindex");

		document.getElementById(selectedId + "Tab").className = def.activeStateClass;
		var active = document.getElementById(selectedId + "Tab");
		active.setAttribute("aria-selected", "true");
		active.setAttribute("tabindex","0");
		active.setAttribute("aria-controls", selectedId);

		active.focus();
		sessionStorage.setItem(def.id, selectedId);
	},
	createTabs: function (args) {
		var def = {
			id: "tabs",
			tabs: [],
			containerClass: "tabButtonContainer"
		};
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}
		var tabItem = {};
		var container = this.createElem({
			"class": def.containerClass,
			"role":"tablist",
			"ariaLabel": ""
		});
		var tabItemFn;

		for (var i = 0; i < def.tabs.length; i++) {
			tabItem = def.tabs[i];
			tabItemFn = (typeof tabItem.focusOn === 'function') ? tabItem.focusOn : function(){ return; };
			container.appendChild(
				this.createElem({
					"text": tabItem.name,
					"id": tabItem.id + "Tab",
					"role": "tab",
					"onkeyup": (function (def, selectedId, tabFn) {
						return function (e) {
							var selected = selectedId;
							function findPrevAndNext(array, id) {
								var currentIndex = array.findIndex(item => item.id === id);
								return {
									'prev': array[(currentIndex - 1 + array.length) % array.length].id,
									'next': array[(currentIndex + 1) % array.length].id
								}
							};
							if (e.which === 37 || e.which === 38) {
								selected = findPrevAndNext(def.tabs, selectedId).prev;
								SKILLCASTHTMLJS.toggleTabs(def, selected, container);
								tabFn();
							} else if (e.which === 39 || e.which === 40) {
								selected = findPrevAndNext(def.tabs, selectedId).next;
								SKILLCASTHTMLJS.toggleTabs(def, selected, container);
								tabFn();
							}
						};
					})(def, tabItem.id, tabItemFn),
					"onclick": (function (def, selectedId, tabFn) {
						return function () {
							SKILLCASTHTMLJS.toggleTabs(def, selectedId, container);
							tabFn();
						};
					})(def, tabItem.id, tabItemFn)
				})
			);
		}
		return container;
	},
	toggleDefaultTab: function (args) {
		var def = {
			id: "tabs",
			tabs: [],
			defaultIndex: 0,
			useCurrentTab: true
		};
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}
		var currentPolicyTab = def.tabs[def.defaultIndex].id;
		var previousTab = "";
		if(def.useCurrentTab) {
			if (sessionStorage.getItem(def.id) !== null) {
				previousTab = sessionStorage.getItem(def.id);
			}
			for (var i = 0; i < def.tabs.length; i++) {
				if (previousTab === def.tabs[i].id) {
					currentPolicyTab = def.tabs[i].id;
				}
			}
		}
		this.toggleTabs(def, currentPolicyTab);
	},
	cleanAjaxString: function(str) {
		return str.split("%").join("[percent]").split("+").join("[plus]").split("&").join("[and]");
	},
	skillcastAPI: function (service, method, args, callback, delay, contentType, returnDataType, showLoader) {
		var ajaxUrl = "/skillcastApi/" + service + "/" + method + "/" + skillcastAJAXParams + Math.random();
		//if no returnDataType is defined the default is json
		var returnDataType = (typeof returnDataType === "undefined") ? "json" : returnDataType;
		//if no showLoader is defined the default is true
		var showLoader = (typeof showLoader === "undefined") ? "true" : showLoader;
		var callCallback = function(cb, data){
			if(typeof cb === "function"){
				return cb(data);
			}
			return data;
		};
		var sleep = function (milliseconds) {
			var start = new Date().getTime();
			for (var i = 0; i < 1e7; i++) {
				if ((new Date().getTime() - start) > milliseconds){
				break;
				}
			}
		};
		var isContentTypeSet = (typeof contentType === "string" && contentType.length > 0);

		var ajaxArgs = {
			type: "POST",
			url: ajaxUrl,
			data: args,
			headers: (this.ajaxToken.length > 0) ? {"X-skillcast-ajax-token":this.ajaxToken} : {},
			dataType: returnDataType,
			cache: false,
			success: function(result, status, xhr) {
				var token = xhr.getResponseHeader("X-skillcast-ajax-token");
				if(token !== null) {
					SKILLCASTHTMLJS.setAjaxToken(token);
				}
				callCallback(callback, result);
			},
			error: function(xhr, status, error) {
				alert(error);
			},
			complete: function() {
				SKILLCASTHTMLJS.hideLoader(showLoader);
			}
		};
		if(isContentTypeSet){
			ajaxArgs['contentType'] = contentType;
		}
		if(showLoader){
		this.showLoader();
		}
		if(typeof delay === "number"){
			sleep(delay);
		}
		return $.ajax(ajaxArgs);
	},
	skillcastRequest: function (service, method, args, callback, delay) {
		var data = JSON.stringify(args);
		return SKILLCASTHTMLJS.skillcastAPI(service, method, data, callback, delay, 'application/json; charset=utf-8');
	},
	skillcastAJAX: function (service, method, args, callback, parseJson) {
		var parseJson = (typeof parseJson === "undefined" || parseJson === null ? true : parseJson);
		this.showLoader();
		var xhr = new XMLHttpRequest();
		var arg = "";
		var xhrArgs = "targetService=" + service;
		xhrArgs += "&targetMethod=" + method;
		for (arg in args) {
			xhrArgs += "&" + arg + "=" + args[arg];
		}
		xhr.open("POST", skillcastBaseAJAXURL + Math.random(), true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				if(parseJson){
					callback(JSON.parse(xhr.responseText));
				} else {
					callback(xhr.responseText);
				}
				SKILLCASTHTMLJS.hideLoader();
			}
		};
		xhr.send(xhrArgs);
	},
	skillcastAJAXForm: function (service, method, formData, callback) {
		formData.append('targetService', service);
		formData.append('targetMethod', method);
		this.showLoader();
		var xhr = new XMLHttpRequest();
		xhr.open("POST", skillcastBaseAJAXURL + Math.random(), true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				callback(JSON.parse(xhr.responseText));
				SKILLCASTHTMLJS.hideLoader();
			}
		};
		xhr.send(formData);
	},
	skillcastAJAXFormUpload: function (service, method, formData, callback) {
		formData.append('targetService', service);
		formData.append('targetMethod', method);
		this.showLoader();
		var xhr = new XMLHttpRequest();
		xhr.open("POST", skillcastBaseAJAXURL + Math.random(), true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				callback(JSON.parse(xhr.response));
				SKILLCASTHTMLJS.hideLoader();
			}
		};
		xhr.send(formData);
	},
	createDonut: function (percent, type, color, chartWidth, borderWidth, fontSize, marginSize, className) {
		return this.createPercentageWheel({
			"percent":percent,
			"type":type,
			"color":color,
			"outerWidth":(typeof chartWidth !== "undefined") ? chartWidth : 180,
			"border":(typeof borderWidth !== "undefined") ? borderWidth : 24,
			"margin":(typeof marginSize !== "undefined") ? marginSize : 20,
			"fontPercent":(typeof fontSize !== "undefined") ? fontSize : 22,
			"containerClass":(typeof className !== "undefined") ? className : ""
		});
	},
	createPercentageWheel: function (args) {
		var def = {
			"percent":0,
			"type":"",
			"color":"#666666",
			"labelColor":"#666666",
			"outerWidth":180,
			"border":24,
			"margin":20,
			"fontPercent":22,
			"containerClass":""
		}
		var arg;
		var donut;
		var pieWrapper;
		var label;
		var pie;
		var leftSide;
		var rightSide;
		var shadow;
		var percentage;
		var typeContainer;
		var deg;
		var percentageText;
		var percentageTextValue;
		var typeText;
		for(arg in args) {
			def[arg] = args[arg];
		}
		def.fontLabel = Math.max(12,(def.fontPercent/2) - 2);
		def.innerWidth = def.outerWidth - (def.border * 2);
		donut = this.createElem({
			id: "donut" + Date.now(),
			display: "inline-block",
			"class": def.containerClass
		});
		pieWrapper = this.createElem({
			"class": "pie-wrapper",
			width: def.outerWidth + "px",
			height: def.outerWidth + "px",
			margin: def.margin + "px"
		});
		label = this.createElem({
			element: "span",
			"class": "label",
			marginTop: "-" + (def.fontLabel+5) + "px",
			lineHeight: (def.fontLabel+10) + "px",
			color: def.labelColor
		});
		pie = this.createElem({
			"class": "pie",
			clip: "rect(0px, " + def.outerWidth + "px, " + def.outerWidth + "px, " + (def.outerWidth/2) + "px)"
		});
		leftSide = this.createElem({
			"class": "left-side half-circle",
			width: def.innerWidth + "px",
			height: def.innerWidth + "px",
			border: def.border + "px solid " + def.color,
			clip: "rect(0px, " + (def.outerWidth/2) + "px, " + def.outerWidth + "px, 0px)",
			transform: "rotate(0deg)"
		});
		rightSide = this.createElem({
			"class": "right-side half-circle",
			width: def.innerWidth + "px",
			height: def.innerWidth + "px",
			border: def.border + "px solid " + def.color,
			clip: "rect(0px, " + (def.outerWidth/2) + "px, " + def.outerWidth + "px, 0px)",
			transform: "rotate(0deg)"
		});
		shadow = this.createElem({
			"class": "shadow",
			width: def.innerWidth + "px",
			height: def.innerWidth + "px",
			border: def.border + "px solid rgba(0,0,0,0.1)"
		});
		percentage = this.createElem({
			element: "span",
			display: "block",
			fontSize: def.fontPercent + "px"
		});
		typeContainer = this.createElem({
			element: "span",
			fontSize: def.fontLabel + "px"
		});
		pieWrapper.appendChild(label);
		pie.appendChild(leftSide);
		pie.appendChild(rightSide);
		pieWrapper.appendChild(pie);
		pieWrapper.appendChild(shadow);
		donut.appendChild(pieWrapper);
		def.percent = parseFloat(def.percent.toFixed(2));
		if (def.percent > 100) {
			def.percent = 100;
		} else if (def.percent < 0) {
			def.percent = 0;
		}
		deg = Math.round(360 * (def.percent / 100));
		if (def.percent > 50) {
			pie.style.clip = "rect(auto, auto, auto, auto)";
			rightSide.style.transform = "rotate(180deg)";
		}
		typeText = document.createTextNode(def.type);
		percentageTextValue = def.hasOwnProperty("count") ? Math.round(def.count) : def.percent + "%";
		percentageText = document.createTextNode(percentageTextValue);
		typeContainer.appendChild(typeText);
		percentage.appendChild(percentageText);
		label.appendChild(percentage);
		label.appendChild(typeContainer);
		leftSide.style.transform = "rotate(" + deg + "deg)";
		return donut;
	},
	createProgressBar: function (args) {
		var def = {
			data: 0,
			margin: "5px auto",
			height: "10px",
			borderRadius: "5px",
			background: "#cecece",
			labelPosition: "none",
			color: "#029901"
		};
		var container = this.createElem({});
		var progressBarContainer;
		var progresBar;
		var arg = "";
		var label;
		for (arg in args) {
			def[arg] = args[arg];
		}
		if (args.hasOwnProperty('class')){
			container.className = args["class"];
		}
		progressBarContainer = this.createElem({
			margin: def.margin,
			padding: "0",
			width: '100%',
			height: def.height,
			overflow: 'hidden',
			background: def.background,
			borderRadius: def.borderRadius
		});
		if (def.labelPosition !== "none") {
			label = this.createElem({ "text": def.data + "%" });
			if (def.labelPosition === "top") {
				container.appendChild(label);
			}
		}
		if (def.data === "") {
			return def.data
		}
		progresBar = this.createElem({
			position: 'relative',
			width: def.data + '%',
			float: 'left',
			minWidth: '1%',
			height: '100%',
			background: def.color
		});
		progressBarContainer.appendChild(progresBar)
		container.appendChild(progressBarContainer)
		if (def.labelPosition === "bottom") {
			container.appendChild(label);
		}
		return container;
	},
	createStackedBar: function(args){
		var def = {
			margin: "5px auto",
			height: "15px",
			borderRadius: "5px",
			background: "#cecece",
			labelPosition: "none",
			width:"100%"
		};
		var container = this.createElem({});
		var stackedBarContainer,stackedBar,arg,i;
		var totalWidth = 0;
		var itemWidth;
		for (arg in args) {
			def[arg] = args[arg];
		}
		if(def.hasOwnProperty("label")) {
			container.appendChild(this.createElem({
				"text":def.label,
				"textAlign":"center"
			}));
		}
		stackedBarContainer = this.createElem({
			margin: def.margin,
			padding: "0",
			width: def.width,
			height: def.height,
			borderRadius: def.borderRadius,
			overflow: 'hidden',
			background: def.background
		});
		for(i=0; i<args.data.length; i++){
			itemWidth = Math.min(args.data[i].value,100-totalWidth);
			totalWidth += itemWidth;
			if(itemWidth > 0) {
				stackedBar = this.createElem({
					id:'stackedBar',
					position: 'relative',
					width: itemWidth + '%',
					float: 'left',
					height: '100%',
					textAlign: 'center',
					background: args.data[i].backgroundColor
				});
				stackedBarContainer.appendChild(stackedBar);
			}
		}
		container.appendChild(stackedBarContainer);
		return container;
	},
	destroyAdvancedSelect: function(args){
		$('#' + args.id).select2('destroy');
	},
	createAdvancedSelect: function(args) {
		var def = {
			id: "",
			name: "advancedSelect",
			options: [],
			selectedValue: "",
			selectAll: false,
			addEmptyOption: false,
			emptyOptionLabel: "",
			width: "100%",
			labelText: "",
			optionValueKey:"value",
			optionLabelKey:"label",
			allyContainerId: ''
		};
		var arg = "";
		for (arg in args) {
			def[arg] = args[arg];
		}
		var optionCount = def.options.length;
		var selectedValueArray = [];
		var selectElem = this.createSelect(def);
		var selectLabel = this.createElem({"element":"label", "labelFor":def.id, "text": def.labelText});
		var select2Args = { width:def.width };
		if(def.hasOwnProperty("multiple")) {
			def.name = def.name + "[]";
			if(def.selectAll && def.selectedValue === "") {
				for(i=0; i<optionCount; i++) {
					selectedValueArray.push(def.options[i].value);
				}
			}
		}
		if(def.hasOwnProperty("ajax")) {
			select2Args['ajax'] = def.ajax;
		}
		if(def.hasOwnProperty("minimumInputLength")) {
			select2Args['minimumInputLength'] = def.minimumInputLength;
		}
		selectLabel.appendChild(selectElem);
		$(selectElem).select2(select2Args);
		if(def.selectedValue !== "") {
			$(selectElem).val(def.selectedValue);
			$(selectElem).trigger("change.select2");
		} else if(selectedValueArray.length > 0) {
			$(selectElem).val(selectedValueArray);
			$(selectElem).trigger("change.select2");
		}
		$(selectElem).click(function () {
			var ariaControls = "select2-" + $(this).attr("id")+"-results";
			$('.select2-search__field[aria-controls='+ariaControls+']').focus();
		});

		if( def.allyContainerId.length > 0 ){
			var tempPopupViewer = this.popupViewer;
			$(selectElem).on('select2:open', function(){
				tempPopupViewer.disengageAlly(def.allyContainerId);
			});
			$(selectElem).on('select2:close', function(){
				tempPopupViewer.engageAlly(def.allyContainerId);
			});
		}

		return selectLabel;
	},
	getAdvancedSelection: function(args) {
		return $('#' + args.id).select2('data');
	},
	createQuestion: function(questionArgs) {
		var c = this.createElem({"class":"submissionSection"});
		var oc = this.createElem({});
		var optionCount = 0;
		var i = 0;
		var args = {
			"defaultValue":""
		};
		var arg = "";
		for(arg in questionArgs) {
			args[arg] = questionArgs[arg];
		}
		if(args.type === "checklist") {
			optionCount = args.options.length;
			defaultOptions = args.defaultValue.split(",");
			for(i=0; i<optionCount; i++) {
				oc.appendChild(createChecklistItem({
					"id":args.id,
					"content":args.options[i].name,
					"optionNo":args.options[i].id,
					"checked":(defaultOptions.indexOf(args.options[i].id) >= 0)
				}));
			}
		} else if(args.type === "text") {
			oc.appendChild(this.createElem({
				"element":"textarea",
				"name":args.id,
				"width":"100%",
				"rows":"5",
				"readonly": args.hasOwnProperty("readonly") ? args.readonly : false,
				"html":args.defaultValue
			}));
		} else if(args.type === "date") {
			oc.appendChild(this.createDateInput({
				"name":args.id,
				"id":args.id,
				"minDate":args.minDate,
				"maxDate":args.maxDate,
				"defaultDate":args.defaultDate
			}));
		} else if(args.type === "select") {
			args.name = args.id;
			oc.appendChild(this.createSelect(args));
		}
		c.appendChild(this.createElem({"text":args.question}));
		c.appendChild(oc);
		return c;
	},
	createChecklistItem: function(args) {
		var c = this.createElem({"class":"submissionInputContainer"});
		var cb = this.createElem({"class":"submissionCheckboxInput"});
		var optionId = args.id + "-" + args.optionNo;
		var isDisabled = args.hasOwnProperty("disabled") ? args.disabled : false;
		cb.appendChild(this.createElem({
			"element":"input",
			"type":"checkbox",
			"name":args.id,
			"id":optionId,
			"value":args.optionNo,
			"checked":args.checked,
			"disabled":isDisabled
		}));
		c.appendChild(cb);
		c.appendChild(this.createElem({
			"element":"label",
			"labelFor":optionId,
			"class":"submissionCheckboxLabel",
			"html":args.content
		}));
		return c;
	},
	getStatusColors: function() {
		return {
			"completed":"#009900",
			"passed":"#009900",
			"pending":"#FFCC00",
			"incomplete":"#FFCC00",
			"started":"#FFCC00",
			"exempted":"#DCDCDC",
			"failed":"#000000",
			"overdue":"#990000",
			"rejected":"#990000"
		};
	},
	createStatusBar: function(args) {
		var def = {
			"value":"0",
			"color":"#666666",
			"height":"10px"
		};
		var arg;
		var statusColors = this.getStatusColors();
		var container = this.createElem({"textAlign":"left"});
		for(arg in args) {
			def[arg] = args[arg];
		}
		if(statusColors.hasOwnProperty(def.color)) {
			def.color = statusColors[def.color];
		}
		container.appendChild(this.createElem({
			"backgroundColor":def.color,
			"width":def.value + "%",
			"display":"inline-block",
			"height":def.height
		}));
		return container;
	},
	colorInput: function(container, id, color, includeHash) {
		var myContainer = $("#" + container);
		var myArgs, myColorPicker;
		if(myContainer.length > 0){
			myArgs = {
				id: id,
				name: id,
				color: color,
				includeHash: includeHash
			};
			colorPicker = this.createColorPicker(myArgs);
			myContainer.append(colorPicker);
		}
	},
	createColorPicker: function(args) {
		var def = {
			id: '',
			name: '',
			placeholder: '',
			color: '#FFFFFF',
			includeHash: true,
			standardColors: sp_theme_colors,
			transparentColor: false,
			displayIndicator: false,
			history: false,
			disabled: false,
			strings: 'Standard Colors,Theme Colors,Web Colors,Theme Colors,Back to Palette,History,No history yet.'
		};
		var arg = '';
		var container = this.createElem({element:"span"});
		var input;
		var updateColorPicker = function(elem) {
			var dirtyColor = $(elem).val();
			var cleanColor = dirtyColor.replace("#","");
			if(!def.includeHash) {
				if(dirtyColor !== cleanColor) {
					$(elem).val(cleanColor);
				}
			}
			if(def.displayIndicator) {
				$(elem).next().css("border-radius", "5px");
			} else {
				$(elem).next().css("display", "none");
				if(cleanColor.length === 6) {
					$(elem).css("background-color", "#" + cleanColor);
					$(elem).css("color", SKILLCASTHTMLJS.getContrastTextColor(cleanColor));
				} else {
					$(elem).css("background-color", "#ffffff");
					$(elem).css("color", "#000000");
				}
			}
		}
		for (arg in args) {
			def[arg] = args[arg];
		}
		input = this.createElem({
			element: 'input',
			id: def.id,
			type: 'text',
			name: def.name,
			value: def.color,
			verticalAlign: "middle",
			size: "7",
			placeholder: def.placeholder,
			disabled: def.disabled
		});
		container.appendChild(input);
		if (!def.disabled) {
		$(input).colorpicker({
			standardColors:def.standardColors,
			transparentColor:def.transparentColor,
			displayIndicator:def.displayIndicator,
			history:def.history,
			strings:def.strings
		});
		}
		updateColorPicker(input);
		$(input).on("change.color", function (event, color) {
			updateColorPicker(this);
		});
		return container;
	},
	getContrastTextColor: function (hexcolor){
		var r;
		var g;
		var b;
		var yiq;
		if(hexcolor.length = 6) {
			r = parseInt(hexcolor.substr(0,2),16);
			g = parseInt(hexcolor.substr(2,2),16);
			b = parseInt(hexcolor.substr(4,2),16);
			yiq = ((r*299)+(g*587)+(b*114))/1000;
			return (yiq >= 128) ? '#000000' : '#ffffff';
		} else {
			return "#000000";
		}
	},
	createCssSize: function(args) {
		var value = (typeof args.value === 'string') ? args.value : '';
		var value_number = value.replace(/[^\d.-]/g, '');
		var value_unit = value.replace(value_number, '');
		var showUnit = (typeof args.showUnit === 'boolean') ? args.showUnit : true;
		var min = (typeof args.min === 'number') ? args.min : 0;
		var handleSetCssSize = function(event) {
			event.preventDefault();
			setCssSize();
		};
		var handleCssSizeChange = function(event) {
			event.preventDefault();
			setCssSizeChange();
		};
		var input_hidden_id = args.id;
		var input_amount_id = args.id + '_amount';
		var input_unit_id = args.id + '_unit';
		var setCssSize = function() {
			var $hidden = $('#' + input_hidden_id);
			var amount = $('#' + input_amount_id).val();
			var unit = $('#' + input_unit_id + ' option:selected').val();
			var amountNoUnit = (amount === '0' || amount === 0);
			if(!showUnit || amountNoUnit){
				$hidden.val(amount);
				return;
			}
			$hidden.val(amount + unit);
		};
		var setCssSizeChange = function() {
			var hidden = $('#' + input_hidden_id).val();
			var hidden_number = hidden.replace(/[^\d.-]/g, '');
			var hidden_unit = hidden.replace(hidden_number + '', '');
			var $amount = $('#' + input_amount_id);
			var $unit = $('#' + input_unit_id + ' option[value="' + hidden_unit + '"]');
			$amount.val(hidden_number);
			if(showUnit){
				$unit.prop('selected', true);
			}
		};
		var disabled = (typeof args.disabled === 'boolean') ? args.disabled : false;
		var input_hidden = {
			element: 'input',
			type: 'hidden',
			name: input_hidden_id,
			id: input_hidden_id,
			value: value,
			onchange: handleCssSizeChange
		};
		var input_amount = {
			element: 'input',
			type: 'number',
			name: input_amount_id,
			id: input_amount_id,
			width: '100%',
			min: min,
			value: value_number,
			disabled: disabled,
			onchange: handleSetCssSize
		};
		var input_unit = (showUnit) ? SKILLCASTHTMLJS.createSelect({
			id: input_unit_id,
			name: input_unit_id,
			addEmptyOption: false,
			options: [
				{
					value: 'px',
					label: 'px'
				},
				{
					value: 'rem',
					label: 'rem'
				},
				{
					value: 'em',
					label: 'em'
				},
				{
					value: '%',
					label: '%'
				}
			],
			required: true,
			selectedValue: value_unit,
			strictEquality: true,
			width: '100%',
			disabled: disabled,
			onchange: handleSetCssSize
		}) : null;
		var input_amount_grid_col = (showUnit) ? '6' : '12';
		return this.createElem({
			'class': 'grid-container',
			child: {
				'class': 'grid-row',
				children: [
					{ child: input_hidden },
					{ 'class': 'grid-col-' + input_amount_grid_col, child: input_amount },
					(showUnit) ? { 'class': 'grid-col-6', child: input_unit } : null
				]
			}
		});
	},
	createIconInput: function(args) {
		var myIcons = [];
		var renderCreateIconSelect = function (event) {
				SKILLCASTHTMLJS.skillcastRequest('iconUpload', 'myIcons', {}, function(resp) {
					var data = resp.data;
					myIcons = data.icons;
					buildCreateIconSelect(event);
				});
		};
		var buildCreateIconSelect = function (event) {
			var targetId = event.target.id;
			var targetElement = $('#' + targetId);
			var targetValue = targetElement.val();
			var getIconStyles =	function () {
				return [
					{
						value: 'fas',
						label: 'Solid'
					},
					{
						value: 'far',
						label: 'Regular'
					},
					{
						value: 'fal',
						label: 'Light'
					}
				];
			};
			var getIconTypes =	function () {
				return [
					{ value: 'fa-dot-circle', label: 'Dot circle' },
					{ value: 'fa-circle', label: 'Circle' },
					{ value: 'fa-arrow-right', label: 'Right' },
					{ value: 'fa-arrow-alt-circle-up', label: 'Circle up' },
					{ value: 'fa-arrow-circle-down', label: 'Circle down' },
					{ value: 'fa-triangle', label: 'Circle down' },
					{ value: 'fa-check-circle', label: 'Circle check' },
					{ value: 'fa-check', label: 'Check' },
					{ value: 'fa-play', label: 'Play' },
					{ value: 'fa-play-circle', label: 'Play circle' },
					{ value: 'fa-star-of-life', label: 'Star of life' },
					{ value: 'fa-hexagon', label: 'Hexagon' },
					{ value: 'fa-hand-point-right', label: 'Hand point right' },
					{ value: 'fa-times', label: 'Times' },
					{ value: 'fa-times-circle', label: 'Times circle' },
					{ value: 'fa-exclamation', label: 'Exclamation' },
					{ value: 'fa-exclamation-triangle', label: 'Exclamation triangle' },
					{ value: 'fa-radiation', label: 'Radiation' },
					{ value: 'fa-grin', label: 'Grin' }
				];
			};
			var handleAddPreviewIcon = function (event) {
				event.preventDefault();
				$('#createIconInputClass').val($(this).data('icon'));
				updateIconPreview();
			};
			var handleAddIconClass = function (event) {
				event.preventDefault();
				addIconClass();
			};
			var addIconClass = function (event) {
				var value = $('#createIconInputClass').val();
				targetElement.val(value);
				previewButtonIcon(value);
				SKILLCASTHTMLJS.closeViewer({ containerId: 'createIconSelectContainer' });
			};
			var handleUploadIconClass = function (event) {
				event.preventDefault();
				uploadIconClass();
			}
			var uploadIconClass = function () {
				var $fileInput = $('#createUploadInputClass');
				var formData;

				if($fileInput.val() === ''){
					return;
				}

				formData = new FormData(document.getElementById("uploadForm"));

				SKILLCASTHTMLJS.skillcastAJAXFormUpload('iconUpload', 'upload', formData, function(resp) {
					var iconLocation = resp.data.iconLocation;
					$('#createIconInputClass').val(iconLocation);
					updateIconPreview();
				});

			}
			var updateIconPreview = function () {
				var $preview = $('#createIconInputPreview')
				var icon = $('#createIconInputClass').val();
				var isImage = (icon.charAt(0) === '/');
				var addClass = icon;
				var addImage = [];
				if (isImage) {
					addClass = '';
					addImage = [$('<img/>').prop('src', icon).css({ 'max-width': '32px', 'max-height': '32px' })];
				}
				$preview[0].className = '';
				$preview.addClass(addClass).html(addImage);
			};
			var getPreviewAll = function () {
				var allIcons = [];
				var types = getIconTypes();
				var styles = getIconStyles();
				if (myIcons.length > 0) {
					$.each(myIcons, function(){
						var icon = this;
						var $iconAddButton = {
							element: 'button',
							width: '100%',
							child: {
								children: [
									{ element: 'span', 'html': 'set Icon to use' },
								]
							},
							data: {
								icon: icon
							},
							onclick: handleAddPreviewIcon
						};
						allIcons.push(SKILLCASTHTMLJS.createElem({
							'class': 'grid-container',
							child: {
								'class': 'grid-row',
								children: [
									{ 'class': 'grid-col-4', child: $iconAddButton },
									{ 'class': 'grid-col-1', child: { 'element': 'img', 'src': icon, width: "32px", height: "32px" } },
									{ 'class': 'grid-col-7', child: { 'element': 'span', 'html': icon } }
								]
							}
						}));
					});
				}
				$.each(types, function(){
					var type = this;
					var iconSet = [];
					$.each(styles, function(){
						var style = this;
						var icon = style.value + ' ' + type.value;
						var $iconAddButton = {
							element: 'button',
							width: '100%',
							child: {
								children: [
									{ element: 'i', 'class': icon },
									{ element: 'span', html: ' ' + style.label + ' ' + type.label }
								]
							},
							textAlign: 'left',
							data: {
								icon: icon
							},
							onclick: handleAddPreviewIcon
						};
						iconSet.push({ 'class': 'grid-col-4', child: $iconAddButton });
					});
					allIcons.push(SKILLCASTHTMLJS.createElem({
						'class': 'grid-container',
						child: {
							'class': 'grid-row',
							children: iconSet
						}
					}));
				});

				return allIcons;
			}
			var $createIconSelectContainer = SKILLCASTHTMLJS.createViewer({
				containerId: 'createIconSelectContainer',
				viewerId: 'createIconSelectViewer'
			});
			var $heading = SKILLCASTHTMLJS.createElem({
				'class': 'grid-container',
				child: {
					'class': 'grid-row',
					children: [
						{ 'class': 'grid-col-11', child: { element: 'h2', html: 'Icon selector' } },
						{ 'class': 'grid-col-1', child: SKILLCASTHTMLJS.createCloseButton({
									containerId: 'createIconSelectContainer',
									'ui': 'icon'
							})
						}
					]
				}
			});
			var $subHeading = SKILLCASTHTMLJS.createElem({
				'class': 'grid-container',
				child: {
					'class': 'grid-row',
					children: [
						{ 'class': 'grid-col-12', child: { element: 'h2', html: 'Icon uploads and previews' } }
					]
				}
			});
			var typingTimer;
			var doneTypingInterval = 800;

			var $createUploadInputClass = SKILLCASTHTMLJS.createElem({
				'class': 'grid-container',
				child: {
					'class': 'grid-row',
					children: [
						{ 'class': 'grid-col-3', child: { element: 'label', html: 'Upload icon', for: 'createUploadInputClass' } },
						{ 'class': 'grid-col-3', child: { element: 'form', id: 'uploadForm', enctype: 'multipart/form-data',
							child: {
								element: 'input',
								name: 'uploadIcon',
								id: 'createUploadInputClass',
								type: 'file',
								width: '100%',
								accept: '.png,.jpg,.jpeg,.svg'
							}
						}
						},
						{ 'class': 'grid-col-3', child: null },
						{ 'class': 'grid-col-3', child: {
								element: 'button',
								width: '100%',
								child: {
									children: [
										{ element: 'span', html: 'Upload Icon' },
									]
								},
								onclick: handleUploadIconClass
							}
						}
					]
				}
			});

			var $createIconInputClass = SKILLCASTHTMLJS.createElem({
				'class': 'grid-container',
				child: {
					'class': 'grid-row',
					children: [
						{ 'class': 'grid-col-2', child: { element: 'label', html: 'Icon to use', for: 'createIconInputClass' } },
						{ 'class': 'grid-col-1', child: { element: 'i', 'class': 'far fa-info-circle', cursor: 'help', title: 'Please enter a font awesome class for style and icon, e.g. fas fa-dot-circle or use a path to an existing image.' } },
						{ 'class': 'grid-col-3', child: {
								element: 'input',
								id: 'createIconInputClass',
								type: 'text',
								value: targetValue,
								width: '100%',
								onkeyup: function(event) {
									clearTimeout(typingTimer);
									typingTimer = setTimeout(updateIconPreview, doneTypingInterval);
								},
								keydown: function(event) {
									clearTimeout(typingTimer);
								}
							}
						},
						{ 'class': 'grid-col-3', child: null },
						{ 'class': 'grid-col-3', child: {
								element: 'button',
								width: '100%',
								child: {
									children: [
										{ element: 'span', html: 'Use this icon' },
									]
								},
								onclick: handleAddIconClass
							}
						}
					]
				}
			});

			var $preview = SKILLCASTHTMLJS.createElem({
				'class': 'grid-container',
				child: {
					'class': 'grid-row',
					children: [
						{ 'class': 'grid-col-3', child: { element: 'label', html: 'Preview', for: 'createIconInputPreview' } },
						{ 'class': 'grid-col-9', child: {
								element: 'span',
								id: 'createIconInputPreview',
								name: 'createIconInputPreview',
								'class': targetValue
							}
						}
					]
				}
			});

			var $previewAll = SKILLCASTHTMLJS.createElem({
				'class': 'grid-container',
				child: {
					'class': 'grid-row',
					children: [
						{ 'class': 'grid-col-12', child:  {
								children: getPreviewAll()
							},
							'height': '70vh',
							'overflow': 'scroll'
						}
					]
				}
			});

			$createIconSelectContainer.appendChild(SKILLCASTHTMLJS.createElem({
				child: {
					children: [
						{ child: $heading },
						{ child: $createIconInputClass },
						{ child: $preview },
						{ child: $subHeading },
						{ child: $createUploadInputClass },
						{ child: $previewAll }
					]
				}
			}));
			updateIconPreview();
		};
		var previewButtonIconChange = function(){
			previewButtonIcon($('#' + args.id).val());
		};
		var mergeDef = function() {
			var def = {
				element: 'input',
				type: 'hidden',
				onclick: renderCreateIconSelect,
				onchange: previewButtonIconChange
			};
			for(var key in args){
				def[key] = args[key];
			}
			return def;
		};
		var inputDef = mergeDef();
		var input = this.createElem(inputDef);
		var button_preview_id = args.id + '_preview';
		var previewButtonIcon = function(value){
			$('#' + button_preview_id).html(SKILLCASTHTMLJS.createElem(previewIcon(value)));
		};
		var previewIcon = function(value){
			var isNoIconSet = (value.trim().length === 0)
			var isImage = (value.charAt(0) === '/');
			var preview = { element: 'span', 'class': value, maxWidth: '2rem', minWidth: '1rem', maxHeight: '2rem', minHeight: '1rem', html: '' };
			if (isImage) {
				preview = { element: 'img', 'src': value, maxWidth: '2rem', minWidth: '1rem', maxHeight: '2rem', maxHeight: '1rem' };
			}
			return preview;
		};

		return this.createElem({
			'class': 'grid-container',
			child: {
				'class': 'grid-row',
				children: [
					{ child: input },
					{ 'class': 'grid-col-12', child: {
								element: 'button',
								width: '100%',
								textAlign: 'left',
								disabled: (typeof args.disabled === 'boolean') ? args.disabled : false,
								children: [
									{ element: 'span', child: { id: button_preview_id, element: 'span', child: previewIcon(args.value) } },
									{ element: 'span', html: ' Click to change' }
								],
								onclick: function(){
									$('#' + args.id).trigger('click');
								}
					} }
				]
			}
		});
	},
	AdvDateFormat: function(d, mask) {
		var m,zeroize;
		if(!(d instanceof Date)){
			d = new Date(d);
		}
		zeroize = function (value, length) {
			var i;
			if(!length){length = 2;}
			value = String(value);
			for(i = 0, zeros = ''; i < (length - value.length); i++){
				zeros += '0';
			}
			return zeros + value;
		};
		return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
			switch($0) {
				case 'd':		return d.getDate();
				case 'dd':		return zeroize(d.getDate());
				case 'ddd':		return d.toLocaleString(undefined, { weekday: 'short' });
				case 'dddd':	return d.toLocaleString(undefined, { weekday: 'long' });
				case 'm':		return d.getMonth() + 1;
				case 'mm':		return zeroize(d.getMonth() + 1);
				case 'mmm':		return d.toLocaleString(undefined, { month: 'short' });
				case 'mmmm':	return d.toLocaleString(undefined, { month: 'long' });
				case 'yy':		return String(d.getFullYear()).substr(2);
				case 'yyyy':	return d.getFullYear();
				case 'h':		return d.getHours() % 12 || 12;
				case 'hh':		return zeroize(d.getHours() % 12 || 12);
				case 'H':		return d.getHours();
				case 'HH':		return zeroize(d.getHours());
				case 'M':		return d.getMinutes();
				case 'MM':		return zeroize(d.getMinutes());
				case 's':		return d.getSeconds();
				case 'ss':		return zeroize(d.getSeconds());
				case 'l':		return zeroize(d.getMilliseconds(), 3);
				case 'L':		m = d.getMilliseconds();
					if(m > 99){m = Math.round(m / 10);}
					return zeroize(m);
				case 'tt':		return d.getHours() < 12 ? 'am' : 'pm';
				case 't':		return d.getHours() < 12 ? 'a' : 'p';
				case 'TT':		return d.getHours() < 12 ? 'AM' : 'PM';
				case 'T':		return d.getHours() < 12 ? 'A' : 'P';
				case 'Z':		return d.toUTCString().match(/[A-Z]+$/);
				default:		return $0.substr(1, $0.length - 2);
			}
		});
	},
	showLoader: function(){
		var b = document.getElementsByTagName("body")[0];
		var c = SKILLCASTHTMLJS.createElem({ "class": "preLoaderContainer" });
		var p = SKILLCASTHTMLJS.createElem({ "class": "preLoaderPosition" });

		if (!$("#sr-hidden-div").length) {
			var hiddenDiv = SKILLCASTHTMLJS.createElem({
				"class": "sr-only",
				"id": "sr-hidden-div",
				"role": "region",
				'ariaHidden': false,
				"ariaLive": "assertive",
				"child": {
					"element": "span",
					"id": "sr-hidden-text",
					"role":"alert",
					"text": "Loading page. Please wait."
				}
			});
			b.appendChild(hiddenDiv);
		}
		p.appendChild(SKILLCASTHTMLJS.createElem({ "class": "preLoader" }));
		c.appendChild(p);
		b.appendChild(c);
		},
	hideLoader: function(showLoader){
	var showLoader = (typeof showLoader === "undefined") ? "true" : showLoader;
		if(showLoader){
			var c = document.getElementsByClassName("preLoaderContainer");
			document.getElementById("sr-hidden-div").innerText = "Page loaded.";

			if(c.length){
				c[0].parentNode.removeChild(c[0]);
			}
		}
	},
	createToggleSwitch: function(args){
		var def = {
			id: '',
			name: '',
			value: '',
			checked: false,
			disabled: false
		};
		var arg = '';

		for (arg in args) {
			def[arg] = args[arg];
		}

		var label = this.createElem({
			element: "label",
			"class": "switch"
		});
		var input = this.createElem({
			type:"checkbox",
			element:"input",
			"class":"switch-input",
			id:def.id,
			name:def.id,
			value:def.value,
			checked:def.checked,
			disabled:def.disabled
		});
		if(!def.disabled) {
		if (def.hasOwnProperty("onchange")) {
			input["onchange"] = def.onchange;
		}
		if (def.hasOwnProperty("onkeyup")) {
			input["onkeyup"] = def.onkeyup;
		}
		}
		var span = this.createElem({
			element:"span",
			id:"spanId",
			"class": "slider"
		});
		label.appendChild(input);
		label.appendChild(span);
		return label;
	},
	createAccordion: function(args) {
		var def = {
			id: "accordion",
			items: [],
			initialState: "closed",
			iconColor: "#ffffff",
			openDisplay: "block"
		};
		var i;
		var item;
		var isOpen;
		var button;
		var itemsLen;
		var arg = '';
		var openList = "";
		var openArray = [];
		for (arg in args) {
			def[arg] = args[arg];
		}
		itemsLen = def.items.length;
		if(def.initialState === "open") {
			for(i=0; i<itemsLen; i++) {
				openArray.push(def.items[i].buttonId);
			}
		} else if(def.initialState === "session") {
			openList = sessionStorage.getItem(def.id);
			openArray = (openList === null) ? [] : openList.split(",");
		}
		for(i=0; i<itemsLen; i++) {
			item = def.items[i];
			isOpen = (openArray.indexOf(item.buttonId) >= 0);
			document.getElementById(item.contentId).style.display = (isOpen) ? def.openDisplay : "none";
			button = document.getElementById(item.buttonId);
			$(button).data("content",item.contentId);
			$(button).data("icon",item.buttonId + "Icon");
			$(button).css("cursor","pointer");
			button.appendChild(this.createElem({
				"id":item.buttonId + "Icon",
				"element":"span",
				"color":def.iconColor,
				"float":"right",
				"text":(isOpen) ? "-" : "+"
			}));
			button.onclick = function() {
				var openPos = openArray.indexOf(this.id);
				var isOpen = (openPos >= 0);
				var iconId = $(this).data("icon");
				var contentId = $(this).data("content");
				if(isOpen) {
					document.getElementById(iconId).innerText = "+";
					document.getElementById(contentId).style.display = "none";
					openArray.splice(openPos,1);
				} else {
					document.getElementById(iconId).innerText = "-";
					document.getElementById(contentId).style.display = def.openDisplay;
					openArray.push(this.id);
				}
				if(def.initialState === "session") {
					sessionStorage.setItem(def.id,openArray.join(","));
				}
			}
		}
	},
	createRating: function(r){
		var fullstar = Math.floor(r);
		var i;
		var container = this.createElem({"display":"inline-block"});
		var star;;
		if(r > 0) {
			for(i=1; i<=5; i++) {
				if(i <= fullstar)  {
					star = SKILLCASTHTMLJS.createElem({
						"element": "i",
						"class": "fas fa-star",
						"verticalAlign":"middle"
					});
				} else if(i-1 < r) {
					star = SKILLCASTHTMLJS.createElem({
						"element": "i",
						"class": "fas fa-star-half-alt",
						"verticalAlign":"middle"
					});
				} else {
					star = SKILLCASTHTMLJS.createElem({
						"element": "i",
						"class": "far fa-star-empty",
						"verticalAlign":"middle"
					});
				}
				container.appendChild(star);
			}
		}
		return container;
	},
	createContentBox: function(args) {
		var container;
		var content;
		var header;
		var def = {
			"title":"",
			"containerClass":"mcSection",
			"headerClass":"mcSectionHeader",
			"contentClass":"mcSectionContent"
		};
		var arg = '';
		var contentArgs = {};
		for (arg in args) {
			def[arg] = args[arg];
		}
		contentArgs["class"] = def.contentClass;
		if(def.hasOwnProperty("child")) {
			contentArgs["child"] = def.child;
		}
		container = this.createElem({"class":def.containerClass});
		content = this.createElem(contentArgs);
		header = this.createElem({"element":"h2","class":def.headerClass, "text":def.title});
		if(def.hasOwnProperty("id")) {
			container.id = def.id;
		}
		if(def.hasOwnProperty("content")) {
			content.appendChild(def.content);
		}
		container.appendChild(header);
		container.appendChild(content);
		return {
			'container':container,
			'header':header,
			'content':content
		};
	},
	createEditor: function( args ){
		var def = {
			id: '',
			name: '',
			class:'aceeditor',
			value: '',
			editor: "html",
			rows: "5"
		};
		for (arg in args) {
			def[arg] = args[arg];
		}
		var textarea = this.createElem({
			"element": "textarea",
			"id": def.id,
			"name": def.id,
			"html": def.value,
			"width": "100%",
			"height": "100%",
			"class": def.class,
			"rows": def.rows,
			"data": {
				"editor": def.editor
			}
		});
		var wrapper = this.createElem({
			"element": "div",
			"id": `${def.id}_editorWrapper`,
			"name": `${def.id}_editorWrapper`,
			"class": 'editorFullscreenWrapper'
		});
		wrapper.appendChild(textarea);
		return wrapper;
	},
	initCKEditor: function(args){
		var textarea = $(args.elem);
		CKEDITOR.replace(textarea.attr("id"),
			{"allowedContent" : true,
			"toolbar" : args.hasOwnProperty("toolbar") ? args.toolbar : "Inmarkets",
			"height" : args.hasOwnProperty("height") ? args.height : "400"
			}
		);
		if(args.hasOwnProperty("source")) {
			CKEDITOR.instances[textarea.attr("id")].on('change', function() {
				args.source.val(CKEDITOR.instances[textarea.attr("id")].getData());
			});
		}
	},
	initEditors: function() {
		$('textarea.aceeditor').each(function() {
			var name = $(this).prop('name');
			var id = $(this).prop('id');
			if ( id === '' ) {
				$(this).prop('id', name);
				id = name;
			}
			var wrapper = $('<div></div>').prop({ id: `${name}_editorWrapper`}).addClass('editorFullscreenWrapper');
			$(this).before(wrapper);
			$(this).detach()
			wrapper.html(this);
			SKILLCASTHTMLJS.initAceEditor({
				elem: $(this),
				id: id
			});
		});
	},
	aceLocalStorageSettings: function(){
		var defaults = {
			autoScrollEditorIntoView: true,
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false,
			showLineNumbers: true,
			wrap: true,
			highlightActiveLine: true,
			highlightSelectedWord: true,
			theme: 'xcode'
		};
		var prefix = 'skillcast_ace';
		var getSetting = function( key ) {
			return localStorage.getItem(`${prefix}_${key}`);
		};
		var setSetting = function( key, value ) {
			localStorage.setItem(`${prefix}_${key}`, value);
		};
		var settings = Object.keys( defaults ).reduce(function( object, key ){
			var storage = getSetting( key );
			if ( storage == null || storage === '' ) {
				setSetting( key, defaults[key] );
			} else {
				object[key] = ( storage === 'true' ) ? true :( storage === 'false' ) ? false : storage;
			};
			return object;
		}, { ...defaults } );
		return {
			data: settings,
			setSetting: setSetting
		};
	},
	initAceEditor: function( def ){
		var settings = SKILLCASTHTMLJS.aceLocalStorageSettings();
		var args = (function( input ){
			var defaults = {
				id: 'ace',
				elem: {},
				position: 'absolute',
				'class': '',
				setWindow: true,
				wrap: settings.data.wrap,
				enableLiveAutocompletion: settings.data.enableLiveAutocompletion,
				fullscreen: false,
				source: null
			};
			return Object.keys( defaults ).reduce(function( last, key ){
				if ( input.hasOwnProperty( key ) ){
					last[key] = input[key];
				}
				return last;
			}, { ...defaults });
		})( def );
		var textarea = $(args.elem);
		var mode = textarea.data('editor');
		var beautify = ace.require("ace/ext/beautify");
		var editDiv = $('<div>', {
			position: args.position,
		}).css( { 'flex' : '1' }).insertBefore(textarea);
		var editor = ace.edit(editDiv[0]);
		var editorOptions = {
			autoScrollEditorIntoView: settings.data.autoScrollEditorIntoView,
			enableBasicAutocompletion: settings.data.enableBasicAutocompletion,
			enableSnippets: settings.data.enableSnippets,
			enableLiveAutocompletion: settings.data.enableLiveAutocompletion,
			showLineNumbers: settings.data.showLineNumbers,
			wrap: settings.data.wrap,
			highlightActiveLine: settings.data.highlightActiveLine,
			highlightSelectedWord: settings.data.highlightSelectedWord
		};

		ace.require("ace/ext/language_tools");
		textarea.css('display', 'none');
		editor.setOptions(editorOptions);
		editor.renderer.setShowGutter(true);
		editor.setShowPrintMargin(false);
		editor.getSession().setValue(textarea.val());
		editor.getSession().setMode("ace/mode/" + mode);
		beautify.beautify(editor.session);
		editor.setTheme(`ace/theme/${settings.data.theme}`);
		editor.setFontSize(15);

		var erorrsAndSearch = $('<div>', {
			'class': 'aceSkillcastToolBarWraper',
			'id': `aceSkillcastToolBarWraper_${args.id}`,
			append: [
				$('<div>', {
					'class': 'aceSkillcastToolBar',
					'id': `aceSkillcastToolBar_${args.id}`,
					append: [
						createAceToolBar(
							args.id,
							{
								errors: 0,
								infoErrors: 0,
								warnings: 0,
								infoText: [],
								warningsText: [],
								errorsText: []
							}
						)
					]
				})
			]
		});

		erorrsAndSearch.insertBefore(editDiv);

		editor.getSession().on("changeAnnotation", function () {
			var annot = editor.getSession().getAnnotations();
			var key, message, line, type;
			var aceSkillcastToolBar = $(`[id=aceSkillcastToolBar_${args.id}]`);
			var allErrors = {
				'errors': 0,
				'infoErrors': 0,
				'warnings': 0,
				'infoText': [],
				'warningsText': [],
				'errorsText': []
			};
			textarea.val(editor.getSession().getValue());
			if (args.hasOwnProperty("source") && !(args.source == null) ) {
				args.source.val(editor.getSession().getValue());
			}

			for (key in annot) {
				if (/doctype first\. Expected/.test(annot[key].text)) {
					annot.splice(key, 1);
				}
				if (annot.hasOwnProperty(key)) {
					line = annot[key].row + 1;
					type = annot[key].type;
					message = 'Line ' + line + ' - ' + annot[key].text;
					if (isNaN(line)) {
						message = annot[key].text;
					}

					if (type == 'info') {
						allErrors.infoErrors += 1;
						allErrors.infoText.push(message);
					} else if (type == 'warning') {
						allErrors.warnings += 1;
						allErrors.warningsText.push(message);
					} else if (type == 'error') {
						allErrors.errors += 1;
						allErrors.errorsText.push(message);
					}
				}
			}

			$(`[id=ace_aceSkillcastToolBar_${args.id}]`).remove();
			createAceToolBar(args.id, allErrors).appendTo(aceSkillcastToolBar);
		});


		function addErrorIcon( id, type, errors ) {
			var icon = (type == 'info') ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle';
			var className = (type == 'info') ? 'warning' : 'error';
			var infoArr = errors.infoText;
			var warningArr = errors.warningsText;
			var text = (type == 'info') ? infoArr.concat(warningArr) : errors.errorsText;
			var viewer, closeBtn;
			var btn = $('<button>', {
				'class': 'ace_errorIconContainer ' + icon + ' ace_errorIcon_' + className,
				click: function (e) {
					e.preventDefault();
					viewer = SKILLCASTHTMLJS.createViewer({ 'containerId': 'errors_' + type });
					closeBtn = SKILLCASTHTMLJS.createCloseButton({
						'text': 'Close',
						'containerId': 'errors_' + type,
						'ui': 'icon'
					});
					viewer.appendChild(closeBtn);
					viewer.appendChild(addErrors(id, type, text));
				}
			});
			return btn;
		};

		function addErrors( id, type, text ) {
			var isInfo = (type == 'info');
			var icon = isInfo ? 'fas fa-exclamation' : 'fas fa-bug';
			var iconColor = isInfo ? '#f8ca00' : '#db222a';
			var title = isInfo ? 'Warnings and info' : 'Errors';
			var textArrLen = text.length;
			var i = 0;

			var errors = $('<div>', {
				'class': 'ace_aceSkillcastToolBar',
				'id': `ace_aceSkillcastToolBar_${id}`,
				append: [
					$('<h1>', {
						'class': 'ace_aceSkillcastToolBarErrorsTitle',
						'text': title
					})
				]
			});

			for (i; i < textArrLen; i++) {
				errors.append($('<div>', {
					'class': 'ace_errorMessage',
					append: [
						$('<i>', {
							'class': icon + ' ace_errorIcon',
							'css': { 'color': iconColor }
						}),
						$('<span>', {
							'text': ' ' + text[i]
						})
					]
				}))
			}

			return errors[0];
		};

		function createAceToolBar( id, errors ) {
			var allErrors = errors.infoErrors + errors.warnings + errors.errors;
			var toggleAceOption = function( button, key, class1, class2, funcName ) {
				var data = $(button).data( key );
				var toggleData= ( !data );
				const ariaText = ( toggleData ) ? `turn off ${funcName}` : `turn on ${funcName}`;
				setAceOption( key, toggleData );
				$(button).data( key, toggleData).toggleClass( class1 ).toggleClass( class2 )
					.attr('aria-label', ariaText)
					.attr('title', ariaText)
					.attr('alt', ariaText);
				editor.focus();
			};
			var setAceOption = function( key, value ){
				settings.setSetting( key, value);
				editor.setOption( key, value);
				args[key] = value;
			}
			var getThemeOptions = function() {

				var themes = [
					'iplastic',
					'xcode',
					'idle_fingers',
					'monokai',
					'terminal',
				];

				return themes.map( ( key ) => {
					return $('<option/>', {
						'value': key,
						'text': key,
						'selected': ( settings.data.theme === key )
					});
				}, [] );
			};
			var wrapAriaText = args.wrap ? 'turn off word wrap' : 'turn on word wrap'
			var enableLiveAutocompletionAriaText = args.enableLiveAutocompletion ? 'turn off live autocomplete' : 'turn on live autocomplete'
			var aceSkillcastToolBar = $('<div>', {
				'class': 'grid-container ace_aceSkillcastToolBar',
				'id': `ace_aceSkillcastToolBar_${id}`,
				append: [
					$('<div>', {
						'class': 'grid-row',
						append: [
							$('<div>', {
								'class': 'grid-col-7',
								append: [
									$('<div>', {

										append: [
											$('<i>', {
												'class': 'fas fa-bug'
											}),
											$('<strong>', {
												'text': ' ' + allErrors + ' unresolved issues in the editor',
												'class': 'ace_errorsText'
											})
										]
									})
								]
							}),

							$('<div>', {
								'class': 'grid-col-5 ace_aceSkillcastToolBarBtnContainer',
								append: [
									$('<select>', {
											change: function (e) {
												e.preventDefault();
												var theme = $(this).find('option:selected').val();
												settings.setSetting( 'theme', theme );
												editor.setTheme(`ace/theme/${theme}`);
											},
										}).attr('aria-label', 'theme')
											.attr('title', 'theme')
											.attr('alt', 'theme')
											.html(
												getThemeOptions()
											),
									(errors.infoErrors > 0 || errors.warnings) ? addErrorIcon(id, 'info', errors) : null,
									(errors.errors > 0) ? addErrorIcon(id, 'error', errors) : null,
									$('<button>', {
										'class': (args.fullscreen) ? 'far fa-compress-wide' : 'far fa-expand-wide',
										data: {
											fullscreen: args.fullscreen
										},
										click: function (e) {
											e.preventDefault();
											const button = $(this);
											const toggleFullscreen = () => {
												const fullscreen = button.data('fullscreen');
												const wrapper = button.parents('.editorFullscreenWrapper');
												const isFullscreen = ( !fullscreen );
												const ariaText = ( isFullscreen ) ? 'close fullscreen mode' : 'open fullscreen mode';
												wrapper.toggleClass('editorFullscreenOn');
												$('body').toggleClass('editorFullscreenOn');
												editor.resize();
												editor.setAutoScrollEditorIntoView(true);
												button.data('fullscreen', isFullscreen)
													.toggleClass('fa-compress-wide')
													.toggleClass('fa-expand-wide')
													.attr('aria-label', ariaText)
													.attr('title', ariaText)
													.attr('alt', ariaText);

											};
											toggleFullscreen();

										}
									}).attr('aria-label', 'open fullscreen mode')
										.attr('title', 'open fullscreen mode')
										.attr('alt', 'open fullscreen mode'),
									$('<button>', {
										'class': (args.wrap) ? 'far fa-level-up' : 'far fa-level-down',
										data: {
											wrap: args.wrap
										},
										click: function (e) {
											e.preventDefault();
											toggleAceOption( this, 'wrap', 'fa-level-down', 'fa-level-up', 'word wrap' );
										}
									}).attr('aria-label', wrapAriaText)
										.attr('title', wrapAriaText)
										.attr('alt', wrapAriaText),
									$('<button>', {
										'class': (args.enableLiveAutocompletion) ? 'far fa-toggle-on' : 'far fa-toggle-off',
										data: {
											enableLiveAutocompletion: args.enableLiveAutocompletion
										},
										click: function (e) {
											e.preventDefault();
											toggleAceOption( this, 'enableLiveAutocompletion', 'fa-toggle-on', 'fa-toggle-off', 'live autocomplete' );
										}
									}).attr('aria-label', enableLiveAutocompletionAriaText)
										.attr('title', enableLiveAutocompletionAriaText)
										.attr('alt', enableLiveAutocompletionAriaText),
									$('<button>', {
										'class': 'far fa-search',
										click: function (e) {
											e.preventDefault();
											editor.execCommand('find');
										}
									}).attr('aria-label', 'search editor')
										.attr('title', 'search editor')
										.attr('alt', 'search editor')
								]
							})
						]
					})
				]
			});
			return aceSkillcastToolBar;
		};

		if ( args.setWindow ) {
			window[textarea.attr('id')] = editor;
		}
		return editor;
	},
	createChart: function(reportData){
		var def = {
			"height":"300px",
			"width":"auto",
			"margin":"auto",
			"type":"bar",
			"title":"",
			"showTitle":false,
			"showLegend":false,
			"forceShowLegend":false,
			"legendPosition":"top",
			"series":[""],
			"indexAxis":"x",
			"showXaxis":true,
			"showYaxis":true,
			"stacked":false,
			"tooltip": {},
			"scales": {},
			"scalesDisplay": true,
			"borderRadius": 0,
			"borderSkipped": false,
			"addBorderRadius": false
		}
		var itemArray= [];
		var dataSetArray = [];
		var canvas = this.createElem({
			"element": "canvas"
		});
		var arg, containerChart, i, j, dataLen, seriesLen, box, options, isStackedBarPercentage, dataSetArrayVal;
		var dataSetArrayValIsValid, dataSetArrayValFirst, dataSetArrayValLastIndex;
		var topLeft, bottomLeft;
		for(arg in reportData) {
			def[arg] = reportData[arg];
		}
		isStackedBarPercentage = ( def.type === 'stackedBarPercentage' );
		box = this.createElem({
			"height":def.height,
			"width":def.width,
			"margin":def.margin
		});
		if(def.title.length > 0) {
			def.showTitle = true;
		}
		containerChart = this.createElem({"minHeight":def.hasOwnProperty("containerHeight") ? def.containerHeight : def.height});
		dataLen = def.data.length;
		seriesLen = def.series.length;

		if ( !def.forceShowLegend ) {
			def.showLegend = def.showLegend || (seriesLen > 1);
		}
		for (j=0; j<seriesLen; j++) {
			dataSetArrayArgs = {
				label: def.series[j],
				data: [],
				backgroundColor: [],
				hoverOffset: 4
			};
			if ( def.addBorderRadius ) {
				dataSetArrayArgs['borderRadius'] = [];
				dataSetArrayArgs['borderSkipped'] = def.borderSkipped;
			}
			dataSetArray.push( dataSetArrayArgs );
		}

		for (i=0; i < dataLen; i++) {
			itemArray.push(def.data[i].item);

			dataSetArrayValFirst = false;
			dataSetArrayValLastIndex = { seriesIndex: -1, dataSetIndex: -1 };

			for (j=0; j<seriesLen; j++) {
				dataSetArrayVal = def.data[i].series[j].value;
				dataSetArrayValIsValid = ( dataSetArrayVal > 0 );
				if ( def.addBorderRadius ) {
					topLeft = 0;
					bottomLeft = 0;
					if ( dataSetArrayValIsValid ) {
						dataSetArrayValLastIndex = {
							seriesIndex: j,
							dataSetIndex: i
						};
						if ( !dataSetArrayValFirst ){
							dataSetArrayValFirst = true;
							topLeft = def.borderRadius;
							bottomLeft = def.borderRadius;
						}
					}
					dataSetArray[j].borderRadius.push( { topLeft: topLeft, topRight: 0, bottomLeft: bottomLeft, bottomRight: 0 } );
				}
				dataSetArray[j].display = ( def.data[i].item.length > 0 );
				dataSetArray[j].data.push( dataSetArrayVal );
				dataSetArray[j].backgroundColor.push("#" + (def.data[i].series[j].backgroundColor));
			}
			if ( def.addBorderRadius && dataSetArrayValLastIndex.seriesIndex > -1 ) {
				var seriesIndex = dataSetArrayValLastIndex.seriesIndex;
				var dataSetIndex = dataSetArrayValLastIndex.dataSetIndex;
				dataSetArray[seriesIndex].borderRadius[dataSetIndex] = {
					...dataSetArray[seriesIndex].borderRadius[dataSetIndex],
					topRight: def.borderRadius,
					bottomRight: def.borderRadius
				};
			}
		}

		box.appendChild(canvas);
		containerChart.appendChild(box);
		options = {
			plugins: {
				title: {
					display: def.showTitle,
					text: def.title
				},
				legend: {
					display: def.showLegend,
					position: def.legendPosition
				}
			},
			maintainAspectRatio: false
		};

		if(def.hasOwnProperty("padding")) {
			options.layout = {
				padding: def.padding
			}
		}

		if ( isStackedBarPercentage ){
			def.type = 'bar';
			options.indexAxis = def.indexAxis;
			options.interaction = {
				mode: 'point'
			};
			options.plugins.tooltip = {
				intersect: true,
				callbacks: {
					label: function(context) {
						var label = context.dataset.label || '';
						if (context.parsed.y !== null) {
							label += ` ${context.formattedValue}%`;
						}
						return label;
					}
				}
			};
			options.scales = {
				x: {
					min: 0,
					max: 100,
					stacked: true,
					display: def.scalesDisplay,
					ticks: {
						stepSize: 10,
						callback: function (value, index, values) {
							return `${value}%`;
						}
					}
				},
				y: {
					stacked: true,
					display: def.scalesDisplay
				}
			};

		} else if(def.type === "bar") {
			options.indexAxis = def.indexAxis;
			options.scales = {
				x: {
					stacked: def.stacked,
					display: def.showXaxis
				},
				y: {
					stacked: def.stacked,
					display: def.showYaxis
				}
			};
		}
		myChart = new Chart(canvas, {
			type: def.type,
			data: {
				labels: itemArray,
				datasets: dataSetArray
			},
			options: options
		});
		return containerChart;
	},
	sortArray: function(array,key) {
		function compare( a, b ) {
			if(a[key] < b[key]) {
				return -1;
			}
			if(a[key] > b[key]){
				return 1;
			}
			return 0;
	 	}
		array.sort(compare);
	},
	apiResponseMessage: function(data) {
		var prompt = new String("");
		if (data.hasOwnProperty("errors") && data.errors.length > 0) {
			for (var i=0; i < data.errors.length; i++) {
				prompt += data.errors[i] + "\n";
			}
		}

		if (data.hasOwnProperty("message") && data.message.length > 0) {
			prompt += data.message;
		}

		if (data.hasOwnProperty("argumentsError") && data.hasOwnProperty("argumentErrorArray")) {
			prompt += "Missing arguments (CFC)\n";
			for (var i=0; i < data.argumentErrorArray.length; i++) {
				prompt += " - " + data.argumentErrorArray[i].name + ": " + data.argumentErrorArray[i].argumentError + "\n";
			}
		}

		alert(prompt);
	},
	getInitials: function(name){
		if (name) {
			var formattedName = name.replace(/[^a-z ]/gi, '').trim();
			var names = formattedName.split(' ');
			initials = formattedName[0].substring(0, 1).toUpperCase();
			if (names.length > 1) {
				initials += names[names.length - 1].substring(0, 1).toUpperCase();
			}
		}
		return initials;
	},
	removeHashFromColorObject: function(colors) {
		var keys = Object.keys(colors);
		var returnObject = {};
		keys.forEach(function( colorKey ){
			returnObject[colorKey] = colors[colorKey].replace('#', '');
		})
		return returnObject;
	},
	createSnackbar: function(containerId, status, title, message) {
		if (status !== "info" && status !== "success" && status !== "warning" && status !== "error") status = "success";

		var snackbarContainer = document.getElementById(containerId);
		var snackbarDiv = SKILLCASTHTMLJS.createElem({id: "snackbar", class:"mui-snackbar mui-" + status});
		var snackbarIconDiv = SKILLCASTHTMLJS.createElem({class: "mui-ml-1 mui-align-vertical-center", child: { html: '<i class="fas fa-check-circle mui-icon"></i>'}});
		var snackbarMsgDiv = SKILLCASTHTMLJS.createElem(
			{
				class: "mui-container-flex-left-column mui-ml-2",
				children: [
					{ element: 'p', html: '<p class="mui-text-body-bold mui-mb-1">' + title + '</p>'},
					{ element: 'p', html: '<p class="mui-text-body-standard">' + message + '</p>'}
				]
			}
		);
		var snackbarCloseDiv = SKILLCASTHTMLJS.createElem({"id": "close-snackbar", "class": "mui-clickable mui-mr-1 mui-align-vertical-center",	child: { html: '<i class="fas fa-times mui-icon"></i>'}});

		snackbarDiv.appendChild(snackbarIconDiv);
		snackbarDiv.appendChild(snackbarMsgDiv);
		snackbarDiv.appendChild(snackbarCloseDiv);
		snackbarContainer.appendChild(snackbarDiv);

		$("[id=close-snackbar]").on("click", function() {
			$("[id=snackbar]").toggleClass("mui-hidden", true);
			$("[id=snackbar]").toggleClass("mui-snackbar", false);
		});

		setTimeout(() => {
			$("[id=snackbar]").toggleClass("mui-hidden", true);
			$("[id=snackbar]").toggleClass("mui-snackbar", false);
		},5000);
	},
	stripNonPrintableAndNormalize: function (text) {
		// strip control chars
		text = text.replace(/\p{C}/gu, '');

		// other common tasks are to normalize newlines and other whitespace

		// normalize newline
		text = text.replace(/\n\r/g, '\n');
		text = text.replace(/\p{Zl}/gu, '\n');
		text = text.replace(/\p{Zp}/gu, '\n');

		// normalize space
		text = text.replace(/\p{Zs}/gu, ' ');

		return text;
	},
	trimInputText: function() {
		var item = $(this);
		var newVal = item.val().trim();
		item.val(newVal);
	},
	trimOnBlur: function(){
		$(document).ready(function(){

			$('.trimOnBlur').on('blur', SKILLCASTHTMLJS.trimInputText);

		});
	}
};
