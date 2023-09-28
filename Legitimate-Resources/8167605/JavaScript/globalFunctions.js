if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

$.valHooks.textarea = {
	get: function(elem) {
		return elem.value.replace(/\r?\n/g, "\r\n");
	}
};

var SKILLCASTGLOBALJS = {
	defaults : {
		showHideSpeed: 200,
		noArgsObject: {}
	},
	getAllValsOfElementIDAsArrayToList: function(thisID){
		var returnArray = [];
		var getItemValuesFor = $("[id=" + thisID + "]");
		if(getItemValuesFor.length === 0){
			getItemValuesFor = $("[name=" + thisID + "]");
		}		
		$.each(getItemValuesFor, function(index, itemObject){
			var nodeName = $(itemObject).prop("nodeName").toLowerCase();
			if(nodeName === "select"){
				var getAllSelected = $(itemObject).children("option");

				$.each(getAllSelected, function(index, optionItem){
					if($(optionItem).is(':selected')){
						var thisValue = $(optionItem).val();
						returnArray.push(thisValue);
					}
				});
			} else if(nodeName === "input"){
				var type = $(itemObject).attr("type").toLowerCase();
				if(type === "hidden" || type === "text"){
					var thisValue = $(itemObject).val();
					returnArray.push(thisValue);
				} else if(type === "checkbox" || type === "radio") {
					if($(itemObject).is(':checked')){
						var thisValue = $(itemObject).val();
						returnArray.push(thisValue);
					}
				}
			} else if(nodeName === "div" || nodeName === "span"){
				var thisValue = $(itemObject).html();
				returnArray.push(thisValue);
			} else if(nodeName === "textarea"){
				var thisValue = $(itemObject).val();
				returnArray.push(thisValue);
			} else if(nodeName === "ul"){
				var getAllSelected = $(itemObject).children("li")
				$.each(getAllSelected, function(index, listItem){
					var thisValue = $(listItem).data("value");
					var getListChildren = $(listItem).children("select")
					$.each(getListChildren, function(index, childItem){
						thisValue += " " + SKILLCASTGLOBALJS.getAllValsOfElementIDAsArrayToList(childItem.id);
					});
					returnArray.push(thisValue);
				});
			}
		});
		return returnArray.join();
	},
	cleanAjaxUsaDataRequest: function(useData){
		delete useData["checks"];
		delete useData["checkif"];
		delete useData["errorCount"];
		delete useData["errorHighLight"];
		delete useData["nonRequired"];		
		return useData;
	},
	ajaxCallForHTML: function(useData, successFuntion, successArgs){
		var useData = SKILLCASTGLOBALJS.cleanAjaxUsaDataRequest(useData);
		$.ajax(skillcastBaseAJAXURL + Math.random(), {
			async: true,
			cache: false,
			method: "POST",
			data: useData,
			dataType: "HTML"
		})
		.success(function(data) {
			if(typeof successFuntion === "function"){
				successArgs["data"] = data;
				successFuntion(successArgs);
			}
		})
		.error(function(data) {
			return false;
		})
		.complete(function(jqXHR, settings) {
			return false;
		});
		
		return false;
	},
	ajaxCallForHTMLasync: function(useURL, useData, successFuntion, successArgs){
		var useData = SKILLCASTGLOBALJS.cleanAjaxUsaDataRequest(useData);
		$.ajax(useURL, {
			async: true,
			cache: false,
			method: "POST",
			data: useData,
			dataType: "HTML"
		})
		.success(function(data) {
			if(typeof successFuntion === "function"){
				successArgs["data"] = data;
				successFuntion(successArgs);
			}
		})
		.error(function(data) {
			return false;
		})
		.complete(function(jqXHR, settings) {
			return false;
		});
		
		return false;
	},
	ajaxCallForJSON: function(useData, successFuntion, successArgs){
		var useData = SKILLCASTGLOBALJS.cleanAjaxUsaDataRequest(useData);
		$.ajax(skillcastBaseAJAXURL + Math.random(), {
			async: true,
			cache: false,
			method: "POST",
			data: useData,
			dataType: "text"
		})
		.success(function(data) {
			var JSONData = {};
			try{
				JSONData = JSON.parse(data);
			} catch(err) {
			}
			if(typeof successFuntion === "function"){
				successArgs["data"] = JSONData;
				successFuntion(successArgs);
			}
		})
		.error(function(data) {
			return false;
		})
		.complete(function(jqXHR, settings) {
			return false;
		});
		
		return false;
	},
	openModalPopUp: function(){
		
	}
};