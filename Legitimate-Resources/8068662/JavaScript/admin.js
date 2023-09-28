
var rpc = new easyXDM.Rpc({},
{
    local: {
    	setLogoUrl: function(url) {
		    $(".logo-container img.logo-image").attr("src", url);
    	},
		setButtonColor: function(hexCode) {
			$("#divThemeController div[data-theme-role='button']").css("background-color", hexCode);
			var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
			applyHeaderThemeCss(currentPage);
			applyFooterThemeCss(currentPage, gl_button_font_color);
		},
		setButtonTextColor: function (hexCode) {
			gl_button_font_color = hexCode;
			var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
			applyHeaderThemeCss(currentPage);
			applyFooterThemeCss(currentPage, gl_button_font_color);
		},
		setFooterColor: function (hexCode) {
			$("#divThemeController div[data-theme-role='footer']").css("background-color", hexCode);
			var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
			applyHeaderThemeCss(currentPage);
			applyFooterThemeCss(currentPage, gl_button_font_color);
		},
		setFooterFontColor: function (hexCode) {
			$("#divThemeController div[data-theme-role='footerFont']").css("color", hexCode);
			var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
			applyHeaderThemeCss(currentPage);
			applyFooterThemeCss(currentPage, gl_button_font_color);
		},
		setHeaderColor: function (hexCode) {
			$("#divThemeController div[data-theme-role='header']").css("background-color", hexCode);
			var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
			applyHeaderThemeCss(currentPage);
			applyFooterThemeCss(currentPage, gl_button_font_color);
		},
		setHeader2Color: function (hexCode) {
			$("#divThemeController div[data-theme-role='header2']").css("background-color", hexCode);
			var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
			applyHeaderThemeCss(currentPage);
			applyFooterThemeCss(currentPage, gl_button_font_color);
		},
		setBackgroundColor: function (hexCode) {
			$("#divThemeController div[data-theme-role='background']").css("background-color", hexCode);
			$('body').css("background-color", hexCode);
		},
		setContentColor: function (hexCode) {
			$("#divThemeController div[data-theme-role='content']").css("background-color", hexCode);
			var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
			applyHeaderThemeCss(currentPage);
			applyFooterThemeCss(currentPage, gl_button_font_color);
		},
		initICE: function (tabId) {
			//initEditableElement();
			if (/^(XA_SPECIAL|XA_BUSINESS)$/.test(tabId)) {
				$("#btnXaPersonalNew", "#accountSelectorPage").removeClass("hidden");
				$("#btnXaPersonalExisting", "#accountSelectorPage").addClass("hidden");
			} else {
				$("#btnXaPersonalNew", "#accountSelectorPage").addClass("hidden");
				$("#btnXaPersonalExisting", "#accountSelectorPage").removeClass("hidden");
			}
			$(document).on('pagebeforeshow', function() {
				doInitICE(tabId);
			});
			doInitICE(tabId);

		},
		updateICE: function(data) {
			updateRenameItem(data);
		},
		initShowField: function () {
			//$(document).on('pagebeforeshow', attachShowFieldButton);
			attachShowFieldButton();

		},
		updateShowField: function (data) {
			$(".showfield-section[data-show-field-section-id='" + data.controllerId + "']").each(function (idx, ctrl) {
				var $controller = $(ctrl);
				var $btnShowField = $controller.prev("div.btn-showfield");
				$btnShowField.find("div[data-command]").removeClass("active");
				$controller.toggleClass("is-default",data.isVisible == null);
				if (data.isVisible == null) { //default state
					$btnShowField.find("div.default-state").removeClass("hidden");
					if ($controller.data("default-state") == "off") {
						$controller.addClass("hidden");
						$btnShowField.addClass("section-off");
					} else {
						$controller.removeClass("hidden");
						$btnShowField.removeClass("section-off");
					}
				} else {
					$btnShowField.find("div.default-state").addClass("hidden");
					if (data.isVisible == true) {
						$controller.removeClass("hidden");
						$btnShowField.removeClass("section-off");
						$btnShowField.find("div[data-command='visible']").addClass("active");
					} else {
						$controller.addClass("hidden");
						$btnShowField.addClass("section-off");
						$btnShowField.find("div[data-command='hidden']").addClass("active");
					}
				}
			});
		},
		initValidationItem: function () {
			attachValidationButton();

		},
		updateValidationItem: function (data) {
			$(".validation-section[data-validation-section-id='" + data.controllerId + "']").each(function (idx, ctrl) {
				var $controller = $(ctrl);
				var $btnValidation = $controller.prev("div.btn-validation");
				if (data.isRequire == "Y") {
					$controller.removeClass("abort-require");
					$btnValidation.removeClass("section-off");
					$btnValidation.find("input[type=checkbox]").prop("checked", true);
				} else {
					$controller.addClass("abort-require");
					$btnValidation.addClass("section-off");
                    $.lpqValidate.hideValidation("#" + $controller.data("field-id"));
                    //Hide the validation for group of elements 
                    $.lpqValidate.hideAllValidation($controller.data("group-field-id")); 
                    data - group - field - id
					$btnValidation.find("input[type=checkbox]").prop("checked", false);
				}
			});
		}/*,
    	setBeneficiarySsnInitialState: function(data) {
    		if (typeof setBeneficiarySsnInitialState == "function") {
			    setBeneficiarySsnInitialState(data);
		    }
    	},
    	setBeneficiaryTrustInitialState: function (data) {
    		if (typeof setBeneficiaryTrustInitialState == "function") {
    			setBeneficiaryTrustInitialState(data);
    		}
    	}*/
    },
    remote: {
    	frameReady: {},
    	openRenameDropdownDialog: {},
    	updateRenameList: {},
    	updateShowFieldList: {},
    	updateValidationItemList: {},
	    submitForm: {},
    	triggerUpdateShowField: {},
    	triggerUpdateValidationItem: {}
    }
});

function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
$(function () {
    rpc.frameReady();
    //on App portal (zip pool location enable): rendering account types depend on the selected zip code.
    //however, in APM it renders edit button for all account types including hidden account Types. So hide edit button if account type is hidden. 
    if ($('#divLocationPool').length > 0) {
        $('#divAdditionalProducts').on('click', function () {
            $('a[data-role="button"]', $('#popUpAccountType')).each(function () {
                var $self = $(this);
                if ($self.hasClass('hidden')) {
                    $self.prev('div[class~="btn-rename"]').addClass('hidden');
                } else {
                    $self.prev('div[class~="btn-rename"]').removeClass('hidden');
                }
            });
        });
    }
    //prevent the cursor focus into the input field when clicking edit label field
    $('div[data-role="fieldcontain"]').on('click', 'label[contenteditable = "true"]', function () {
        return false;
    });
});
function doInitICE(tabId) {
	if (tabId == "BL") return;
	if (tabId == "LP") {
		attachEditButton("#apply_container");
		attachEditButton("#accountSelectorPage");
	} else {
		if (/^(XA_BUSINESS|SA_BUSINESS)$/.test(tabId) && $("#businessAccountSelectorPage").length > 0) {
			attachEditButton("#businessAccountSelectorPage");
			attachEditButton("#businessAccountEditorDialog");
		} else if (/^(XA_SPECIAL|SA_SPECIAL)$/.test(tabId)) {
			attachEditButton("#specialAccountSelectorPage");
			attachEditButton("#specialAccountEditorDialog");
		} else {
			attachEditButton();
			$("div.btn-rename", $('div.divfooter')).remove();
			$("div.divLenderName, div.divFooterLogo a", $('div.divfooter')).each(function () {
				editButton(this);
			});
		}
	}
}
function triggerUpdateShowField(data) {
	rpc.triggerUpdateShowField(data);
}
function triggerUpdateValidationItem(data) {
	rpc.triggerUpdateValidationItem(data);
}
function attachEditButton(container) {
	var $container;
	if (typeof container != "undefined") {
		$container = $(container);
	} else {
		$container = $('#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id'));
	}
	//var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
	$("div.btn-rename", $container).remove();
	$("div.btn-rename", $("#MLHeaderTitleContainer")).remove();
	//$("a.div-continue-button,a.btn-header-theme,.rename-able:not(option,.ui-select span), .ui-field-contain label[for], div.review-container div.row-title b,a.header_theme2", $container)
	const renameElements = $("a.div-continue-button,a.btn-header-theme:not(.abort-renameable),.rename-able:not(option,.ui-select span, .abort-renameable), .ui-field-contain label[for]:not(.abort-renameable):not(.sr-only),a.header_theme2:not(.abort-renameable), div.review-container div.row-title.section-heading span.bold", $container);
	{ $("#MLHeaderTitleContainer .rename-able") !== null && renameElements.push($("#MLHeaderTitleContainer .rename-able")) }
	renameElements.each(function () {
	    editButton(this);
	});
	$("option.rename-able", $container).each(function () {
		var $self = $(this);
		//$self.addClass("editable");
		var $select = $self.closest(".ui-select");
		if ($select.prev("div.btn-rename").length == 0) {
			var $ele = $('<div class="btn-rename"><div><img src="/sm/content/images/pencil_ico_w.png" data-command="make-it-editable" width="18px" height="18px"/></div></div>');
			$select.before($ele);
			$ele.find("img[data-command='make-it-editable']").on("click", function (e) {
				var options = [];
				$self.closest("select").find("option:not(.apm-hidden)").each(function (idx, op) {
					//todo
					var originalText = RENAME_REPOSITORY[$(op).data("renameid")];
					if (typeof originalText == "undefined") {
						originalText = $(op).text();
					}
					if (originalText !== "") {
						options.push({ originalText: originalText, currentText: $(op).text() });
					}
				});
				rpc.openRenameDropdownDialog(options);
			});
		}
	});
}
function attachShowFieldButton(container) {
	var $container;
	if (typeof container != "undefined") {
		$container = $(container);
	} else {
		$container = $("body");
	}

	//var currentPage = '#' + $.mobile.pageContainer.pagecontainer('getActivePage').attr('id');
	$("div.btn-showfield", $container).remove();
	$("div.showfield-section", $container).each(function () {
		ShowFieldButton(this);
	});
}
function ShowFieldButton(element) {
	var $self = $(element);
	$self.toggleClass("is-default", true);
	var defaultState = "on";
	if ($self.data("default-state") == "off") {
		defaultState = "off";
	}
	//$self.addClass("editable");
	var $ele = $('<div class="btn-showfield"><div><i class="fa fa-puzzle-piece" aria-hidden="true"></i> ' + $self.data("section-name") + ' section</div><div data-command="hidden"><img src="/sm/content/images/eye_slash_w.png" width="18px" height="14px"/></div><div data-command="visible"><img src="/sm/content/images/eye_w.png" width="18px" height="14px"/></div><div class="default-state ' + defaultState + '" title="' + (defaultState == "off" ? "Hide by default" : "Visible by default") + '"><i aria-hidden="true"><img src="/sm/content/images/fa_plug.png" class="go-grey" width="18px" height="14px"/><img src="/sm/content/images/fa_plug_green.png" class="go-green" width="18px" height="14px"/></i></div></div>');
  
	$self.before($ele);
	if (defaultState == "off") {
		$self.addClass("hidden");
		$ele.addClass("section-off");
	}
	$ele.find("div[data-command='visible']").on("click", function (e) {
		if ($(this).hasClass("active")) {
			$(this).closest("div.btn-showfield").find("div.active").removeClass("active");
			rpc.updateShowFieldList({ controllerId: $self.data("show-field-section-id"), controllerName: $self.data("section-name"), isVisible: null });
			$ele.find("div.default-state").removeClass("hidden");
			if ($self.data("default-state") == "off") {
				$self.addClass("hidden");
				$self.prev("div.btn-showfield").addClass("section-off");
			} else {
				$self.removeClass("hidden");
				$self.prev("div.btn-showfield").removeClass("section-off");
			}
			/*//listen in Beneficiary
			$self.trigger("change", ["show", this, null]);*/
		} else {
			$(this).closest("div.btn-showfield").find("div.active").removeClass("active");
			$(this).addClass("active");
			rpc.updateShowFieldList({ controllerId: $self.data("show-field-section-id"), controllerName: $self.data("section-name"), isVisible: true });
			$ele.find("div.default-state").addClass("hidden");
			$self.removeClass("hidden");
			$self.prev("div.btn-showfield").removeClass("section-off");
			/*//listen in Beneficiary
			$self.trigger("change", ["show", this, true]);*/
		}
	});
	$ele.find("div[data-command='hidden']").on("click", function (e) {
		if ($(this).hasClass("active")) {
			$(this).closest("div.btn-showfield").find("div.active").removeClass("active");
			if ($self.data("default-state") == "off") {
				$self.addClass("hidden");
				$self.prev("div.btn-showfield").addClass("section-off");
			} else {
				$self.removeClass("hidden");
				$self.prev("div.btn-showfield").removeClass("section-off");
			}
			rpc.updateShowFieldList({ controllerId: $self.data("show-field-section-id"), controllerName: $self.data("section-name"), isVisible: null });
			/*//listen in Beneficiary
			$self.trigger("change", ["show", this, null]);
			$ele.find("div.default-state").removeClass("hidden");*/
		} else {
			$(this).closest("div.btn-showfield").find("div.active").removeClass("active");
			$(this).addClass("active");
			$self.addClass("hidden");
			$self.prev("div.btn-showfield").addClass("section-off");
			rpc.updateShowFieldList({ controllerId: $self.data("show-field-section-id"), controllerName: $self.data("section-name"), isVisible: false });
			/*//listen in Beneficiary
			$self.trigger("change", ["hide", this, false]);*/
			$ele.find("div.default-state").addClass("hidden");
		}
	});
}
function attachValidationButton() {
	$("div.btn-validation").remove();
	$("div.validation-section").each(function () {
		ValidationButton(this);
	});
}
function ValidationButton(element) {
	var $self = $(element);
	var defaultState = "on";
	if ($self.data("default-state") == "off") {
		defaultState = "off";
	}
	//$self.addClass("editable");
	var $ele = $('<div class="btn-validation"><div><i class="fa fa-puzzle-piece" aria-hidden="true"></i> ' + $self.data("section-name") + ' field</div></div>');
	//$ele.append('<div data-command="disable"><img src="/sm/content/images/eye_slash_w.png" width="18px" height="14px"/></div><div data-command="enable"><img src="/sm/content/images/eye_w.png" width="18px" height="14px"/></div><div class="default-state ' + defaultState + '" title="' + (defaultState == "off" ? "Hide by default" : "Visible by default") + '"><i aria-hidden="true"><img src="/sm/content/images/fa_plug.png" class="go-grey" width="18px" height="14px"/><img src="/sm/content/images/fa_plug_green.png" class="go-green" width="18px" height="14px"/></i></div>');
	$ele.append($('<span class="validation-label-checkbox pull-right"/>').text("Required"),
		$('<label class="toggle-btn pull-right" data-on="ON" data-off="OFF" />').append(
			$('<input type="checkbox" data-role="none"/>'),
			$('<span class="button-checkbox"/>')
		));
	$self.before($ele);
	if (defaultState == "off") {
		$self.addClass("abort-require");
		$ele.addClass("section-off");
	}
	$ele.find("input[type='checkbox']").prop('checked', defaultState !== "off");
	
	$ele.find("input[type='checkbox']").on("change", function(e){
		$self.toggleClass("abort-require", !e.target.checked);
		$self.prev("div.btn-validation").toggleClass("section-off", !e.target.checked);
		rpc.updateValidationItemList({ controllerId: $self.data("validation-section-id"), controllerName: $self.data("section-name"), isRequire: (e.target.checked ? "Y" : "N") });
	});
}
function editButton(element) {
	var $self = $(element);
	//do not attach edit button to a hidden element
	if ($self.hasClass("hidden") && !$self.hasClass("apm-hidden")) return;
    //$self.addClass("editable");
    var $ele = $('<div class="btn-rename"><div><img src="/sm/content/images/pencil_ico_w.png" data-command="make-it-editable" width="18px" height="18px"/><img src="/sm/content/images/cancel_ico_w.png" width="18px" height="18px" data-command="cancel" class="hidden"/><img src="/sm/content/images/save_ico_w.png" data-command="save" class="hidden" width="18px" height="18px"/></div></div>');

    if ($self.hasClass("section-title")) {
        $ele.css({ "height": "0" });
    }
    if ($self.hasClass("apm-hidden")) {
    	$ele.addClass("hidden apm-hidden");
    }
    $self.before($ele);

    //$('a.header_theme2').on('click', function () {
    //    var currElem = $(this);
    //    if ($(this).attr('status') == 'Y') {
    //        currElem.prev('div[class="btn-rename"]').hide();
    //    } else {
    //        currElem.prev('div[class="btn-rename"]').show();
    //    }
    //});

    $ele.find("img[data-command='make-it-editable']").on("click", function (e) {

		$self.attr("contenteditable", true);
		RENAME_REPOSITORY[$self.data("renameid") + "_for"] = $self.closest("label").attr("for")
		$self.closest("label").attr("for", "");
		$self.trigger("focus");
        $self.select();
        $(this).addClass("hidden");
        $ele.find("img[data-command]").not(this).removeClass("hidden");
        if (typeof $self.data("renameid") == "undefined") {
        	$self.attr("data-renameid", getDataId());
        	//console.log("hehe ", $self.data("renameid"));
        	RENAME_REPOSITORY[$self.data("renameid")] = htmlEncode($self.html());
        }
        //backup current data
        RENAME_REPOSITORY[$self.data("renameid") + "_t"] = htmlEncode($self.html());
        e.preventDefault();
        e.stopPropagation();
    });
	$ele.find("img[data-command='save']").on("click", function (e) {
        $self.attr("contenteditable", false);
        $(this).addClass("hidden");
        $ele.find("img[data-command='cancel']").addClass("hidden");
        $ele.find("img[data-command='make-it-editable']").removeClass("hidden");

		var newText = $self.html();
        if (($self.is("label") || $self.is("b") || $self.hasClass("rename-able")) && newText.match(EXTRACT_BUTTONLABEL_REGEX)) {
            newText = EXTRACT_BUTTONLABEL_REGEX.exec(newText)[0];
        }
        newText = $.trim(newText);

        var currentText = "";
        if ($.trim(htmlDecode(RENAME_REPOSITORY[$self.data("renameid") + "_t"])).match(EXTRACT_BUTTONLABEL_REGEX)) {
			currentText = EXTRACT_BUTTONLABEL_REGEX.exec($.trim(htmlDecode(RENAME_REPOSITORY[$self.data("renameid") + "_t"])))[0];
		}		
        if (newText == currentText) return;
		if (newText == "") {
			$ele.addClass("hidden apm-hidden");
			$ele.next().addClass("hidden apm-hidden");
		}
		var originalText = RENAME_REPOSITORY[$self.data("renameid")]; 	
        rpc.updateRenameList({ originalText: originalText, currentText: currentText, newText: newText });
	    //console.log(new Date());
        //updateRenameItem({ originalText: originalText, currentText: currentText, newText: newText });
        //update currrent data
        RENAME_REPOSITORY[$self.data("renameid") + "_t"] = htmlEncode($self.html());
		setTimeout(() => {
			$self.closest("label").attr("for", RENAME_REPOSITORY[$self.data("renameid") + "_for"] );
		}, 600);
    });
    $ele.find("img[data-command='cancel']").on("click", function (e) {
        $self.attr("contenteditable", false);
        $(this).addClass("hidden");
        $ele.find("img[data-command='save']").addClass("hidden");
        $ele.find("img[data-command='make-it-editable']").removeClass("hidden");
        //restore current data
        $self.html(htmlDecode(RENAME_REPOSITORY[$self.data("renameid") + "_t"]));
		setTimeout(() => {
		$self.closest("label").attr("for", RENAME_REPOSITORY[$self.data("renameid") + "_for"] );
		}, 600); 
    });
}
//function initEditableElement() {
//	var style = document.createElement('style');
//	style.setAttribute("id", "editableCssPlaceHolder");
//	//var cssClasses = "a.div-continue-button.editable,a.div-continue-button.editable:hover,a.div-continue-button.editable:focus{border:2px dashed red!important;}";
//	var cssClasses = "";
//	style.type = 'text/css';
//	style.innerHTML = cssClasses;
//	if (document.getElementById("editableCssPlaceHolder") != null) {
//		document.getElementById("editableCssPlaceHolder").parentNode.removeChild(document.getElementById("editableCssPlaceHolder"));
//	}
//	document.getElementsByTagName('head')[0].appendChild(style);
//}
