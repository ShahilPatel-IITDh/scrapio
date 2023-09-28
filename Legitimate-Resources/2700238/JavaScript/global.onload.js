$(document).ready(function() {
	if (jQuery().accordion) setupAccordion();
	if (jQuery().autotab) setupAutotab();
	setupButtons();
	if (jQuery().datepicker) setupDatepickers();
	if (jQuery().inFieldLabels) setupPlaceholders();
	if (jQuery().megamenu) setupMegamenu();
	setupTabIndex();
	if (jQuery().tabs) setupTabs();
	if (jQuery().toggles) setupToggles();
	if (jQuery().autoshow) setupAutoshow();
	if (jQuery().tooltip) setupTooltips();

	focusOnFirstField();
	positionFlyoutTriangle();
	buildPopupCalls();
	initMessageRibbon();
	initSwiftype();

	$(".main-content .credit-card a.popup").show();  
}); 
/** Apply autoshow plugin to tabs and toggles please */
function setupAutoshow() {
	$(".trigger").autoshow();
}

if (typeof jQuery != "undefined") {
	(function($) {

		$.extend({
			toggles: {
				selector: "",
				target: "",
				toggle: function(trigger) {
					trigger.toggleClass("expand collapse");
					trigger.find(".icon.expand, .icon.collapse").toggleClass("expand collapse");
					trigger.find(this.target + "-more, " + this.target + "-less").toggle();	
				}
			} // toggles Object
		});
				
		$.fn.extend({
			/** Automatically trigger a click on elements specified in the URL */
			autoshow: function() {
				var hash = window.location.hash;
				if (hash.length > 1) $(this).filter(hash).click();
				return this;
			},
			/**  Find out if an iframe does not have its own history yet */
			isFirstPage: function() {
				return this[0].contentWindow.location.href == this.attr("src");
			},
			toggles: function(toggleTarget) {
				var toggles = $.toggles;
				toggles.selector = this.selector;
				toggles.target = toggleTarget;
				
				$(document).on("click", this.selector, function() {
					var toggles = $.toggles;
					var $trigger = $(this);
					if ($trigger.is(".expand")) {
						var $togglePanel = $trigger.closest(".toggle-panel");
						if ($togglePanel.hasClass("accordion"))
								$togglePanel.find(toggles.selector + ".collapse").filter(":visible").click();
					}
					var toggleId = null;
					if(this.className !== undefined && this.className !== ""){
						$.each(this.className.split(/\s+/), function (index, className) {
							if (className.indexOf("for-") == 0) {
								toggleId = className.substr(4);
								if (toggleId == "") toggleId = null;
								return false;
                            }
						});
					}
					if (toggleId != null) {
						$("#" + toggleId).filter(toggles.target).slideToggle();
						$(toggles.selector + ".for-" + toggleId).each(function() {
							toggles.toggle($(this));
						});
					} else {
						$trigger.next().slideToggle();
						toggles.toggle($trigger);
					}
				});
				return this;
			} // Toggles Method											
		}); // Methods		
	})(jQuery);
}

 
/** Setup Accordion jQuery */
function setupAccordion(){
			$(".accordion-content").hide();
			$(".accordion-container").click(function(){
				$(this).toggleClass("active").next().slideToggle("slow");
				});
}



/** Setup Autotab JQuery Plugin to automatically move cursor between fields */
function setupAutotab(){
	$('input.phone-number').autotab_magic();
	$('input.social-security-number').autotab_magic();
	$('input.card-expiration-date').autotab_magic();
}

/* Buttons */
function setupButtons() {
	$.fn.enableButtonIf = function(determinant) {
		return $(this).prop("disabled", ! determinant)
				.toggleClass("brand", determinant)
				.toggleClass("disabled", ! determinant);
	};
	
	$(document).on("click", ".print-button", printPage)
			.on("click", ".clear-button", clearForm)
			.on("click", ".reset-button", resetForm);
	
	preventDoubleSubmit();
}

function printPage() {
	window.print();
}

/** Preserve the value of hidden fields */
function clearForm() {
	// Use a whitelist of fields to minimize unintended side effects.
	$(':text, :password, :file, SELECT', this.form).val('');  
	// De-select any checkboxes, radios and drop-down menus
	$(':input', this.form).removeAttr('checked').removeAttr('selected');
}

/** Preserve value of sessionSync  */
function resetForm() {
	var field = $("input[name='sessionSync']", this.form);
	var sessionSync = "";
	if (field.length > 0)
		sessionSync = field.val();
	
	this.form.reset();
	
	if (field.length > 0)
		field.val(sessionSync);
}

function preventDoubleSubmit() {
	window.formSubmitCount = 0;
	
	$("form").submit(function() {
		formSubmitCount++;
		if ( formSubmitCount > 1 ) { 
			return false; 
		}
	});
}
/* End of Buttons */

function setupDatepickers() {
	$("input.date-picker").datepicker({
		changeMonth:true,
		changeYear: true,
		gotoCurrent: true
	});
}

function setupPlaceholders() {
	$.fn.placeholders = function(options) {
		this.css({cursor: "text", position: "absolute", top: 0, left: 0, width: "auto"})
			.parent().css({position: "relative"});
		
        return this.each(function() {
        	var $placeholder = $(this);
			// Find the referenced input or textarea element
			var $field = $placeholder.prevAll(
						"input[type='text'], input[type='password'], select, textarea").first();
				
			if ($field.length == 0) return; // Nothing to attach
			
			if ($placeholder.not("label[for]")) {
				$placeholder.on("click", function() {
					$(this).prevAll(
							"input[type='text'], input[type='password'], select, textarea"
							).first().focus();
				});
			}
			
			var fieldLeft = $field.position().left;
			if (fieldLeft > 0) $placeholder.css({left: fieldLeft});
			
			$placeholder.css({fontSize: $field.css("fontSize")});
			
			// Only create object for input[text], input[password], or textarea
            (new $.InFieldLabels(this, $field[0], options));
        });
    };
    
	$(".example").placeholders();
}


/* Megamenu */
function setupMegamenu(){
		var SelfLocation = window.location.href.split('?');
		$(".megamenu").megamenu();
}

function setupTabIndex() {
	var tabindex = 1;
	// On Non-Hidden Form Fields
	$("input,select,textarea,a.btn,button").not(":hidden, .no-tabindex").each(function() {
		$(this).attr("tabindex", tabindex);
		tabindex++;
	});
}

/* Tabs */
function setupTabs() {
	$(".tabs").tabs(".panes > .pane", {history: true});
	$(".pane>iframe").autoSizeFrames();
}

/** Automatically adjust the height of the iFrame to fit its content */
$.fn.autoSizeFrames = function() {
	return $(this).on("load", function() {
		var $frame = $(this);
		var $parent = $frame.parent();
		var visibility = $parent.css("display") == "none";
		if (visibility) $parent.css({'position':'absolute','visibility':'hidden','display':'block'});
		var theHeight = $frame.contents().height();
		if (theHeight == 0) theHeight = $frame.contents().find("body").attr("scrollHeight");
		if (visibility) $parent.css({'position':'static','visibility':'visible','display':'none'});
		$frame.css({height: theHeight + "px"});
	});
};
/* End of Tabs */

/*** Toggles */
/*** Toggles */
/*** Toggles */
function setupToggles() {
	$(".toggle-trigger").toggles(".toggle");
}
/* End of Toggles */

/* Tooltips */
function reattachScripts() {
	setupTooltips();
}

function setupTooltips(){
	$("img.error.icon").tooltip({
		position: "center right",

		/** Move the tooltip to keep from running over the side of the document */ 
		onShow: function(evt, pos) {
			var tip = this.getTip();
			var tipLeft = tip.offset().left;
			var tipWidth = tip.width();
			var tipRight = tipLeft + tipWidth;
			if (tipRight - $(window).scrollLeft() > $(window).width()) {
				var trigger = this.getTrigger();
				tip.offset({top: trigger.offset().top + trigger.height(), left: tipLeft - tipWidth});
			}
		}
	});
	
	$("img.quickhelp[title]").tooltip({position: "top right"});
}
/* End of Tooltips */

function focusOnFirstField(){
	if ($(document.body).hasClass("suppress-auto-focus")) return;
	
	$field = $(".first-field:enabled").not(":hidden");
	if ($field.length == 0) $field = $(":input:enabled").not(":hidden");
	$field.first().focus();
}

if (typeof jQuery != "undefined") {
	(function($) {

		// Pop-ups
		if (window.top.TopUp != "undefined") {
			$.extend({
				popups: {
					api: window.top.TopUp,
					close: function() {
						this.api.close();
					},
					confirm: function() {
						window.top.location = window.top.$.popups.confirmHref;
					},
					init: function() {
						$(".te_title").css({cursor: "default", fontSize: "14px"});
						$.popups.api.defaultPreset({
							effect: "transform",
							type: "iframe",							
							resizable: 0,
							scrolling: 0,
							shaded: 1,
							width: "700px",
							height: "550px"
							//Comment to disable iFrame autosizing
							//ondisplay: window.top.setupIFrames
						});
					}, // init()
					presets: {
						"agreement": {
							width: 700,
							height: 490,
							resizable: 0
						},
						"atmlocator": {
							resizable: 1,
							width: "740px",
							height: "690px"
						},
						"basic-resizable": {
							width: 700,
							height: 490,							
							resizable: 1
						},											
						"basic-scroll": {
							width: 700,
							height: 490,							
							scrolling: 1
						},	
						"calculator": {
							resizable: 0,
							scrolling: 1,
							width: "520px",
							height: "550px"
						},
						"call-out": {
							shaded: 0,
							overlayClose: 1
						},
						"confirm": {
							allowCancel: 0,
							width: 300,
							height: 150,
							resizable: 0
						},
						"pdf": {
							resizable: 1,
							scrolling: 1,
							width: "700px",
							height: "550px"
						},
						"state-selector": {
							width: 400,
							height: 120,
							resizable: 0
						},
						"joyads": {
							resizable: 1,
							width: "625px",
							height: "462px"
						}

					}
				}
			}); // Pop-ups Function
			$.fn.extend({
				popups: function(options, preset) {
					var popups = $.popups;
					if (preset in $.popups.presets) $.extend(options, $.popups.presets[preset]);
					// The "transform" effect does not work from within iframes.
					if (window.top !== window.self) {
                        options.effect = "appear";                        
                    }
					popups.options = options;
					popups.withinPopUp = $("body").hasClass("pop-up");
					$(this).on("click", this.selector, function(event) {
						if ($.popups.withinPopUp) {
							//If anything needs to be performed within a popup nested in another popup
						}
						
						$trigger = $(this);
						event.preventDefault();
						var options = $trigger.data("popUpOptions");
						if (typeof options !== "undefined") {
							options.topUp = this;
							var popups = window.top.$.popups;
						
							if ($trigger.is("a[href]")) {
								popups.confirmHref = $trigger.prop("href");
								if (typeof options.href == "undefined") {
									popups.api.display(popups.confirmHref, options);
									return;
								}
							}
							popups.api.display(options.href, options);
                        }
					});
					return this.each(function() {
						// Copy options for trigger
						var options = $.extend({}, $.popups.options);
						$(this).data("popUpOptions", options);
					});
				}
			}); // Pop-ups Method
			if (typeof TopUp != "undefined") {
				TopUp.images_path = "/ConsumerStatic/default/img/top_up/";
			} 
			$(document).ready($.popups.init);
		} // Pop-ups
		
	})(jQuery);
}

function positionFlyoutTriangle(){
	$("li.category").each(function(){
		var $this = $(this);
		var $triangle = $this.find(".triangle");
		var width = $this.width();
		var height = $this.height();
		
		var centerX = width / 2;
		var centerY = -1;

		$triangle.css({
			position: 'absolute',
			top: centerY,
			zIndex: 3000	
		});
				
		if($this.is(':last-child')){			
			$triangle.css("right", centerX);
		}else{
			$triangle.css("left", centerX);
		}
	});
}

function buildPopupCalls(){
	$(".popup").each(function(){
		var popupPreset = this.getAttribute("popup-preset");
		var popupTitle = this.getAttribute("popup-title");
		
		if(typeof window.popupCounter=="undefined"){
			window.popupCounter = 0;
		}
		
		if(!this.id){this.id="popupID"+popupCounter;popupCounter++;}
		
		$("#"+this.id).popups({title: popupTitle}, popupPreset);
	});		
}

function initMessageRibbon() {
	var hostName = window.location.href;
	var siteName = hostName.substring(12, 29);
	var ribbonActive= false;
	if (siteName == "firstnational.com" && ((hostName.indexOf('small-business') > -1) || 
											 (hostName.indexOf('corporate') > -1))) {
		var messageRibbonCookie = $.cookie('messageRibbon');
		if (null == messageRibbonCookie) {
			$.cookie('messageRibbon', '1');
			ribbonActive = true;
			var messageRibbon =
			"<div class='message-ribbon'>" + 
				" We're currently building a new website to better serve you! Thank you for your patience during this transition. " +
				"<span class='message-ribbon-close'>X</span>" +
			"</div>";
			$(messageRibbon).insertBefore( $("#wrapper") );
			displayMessageRibbon(ribbonActive);
			
			$(".message-ribbon").click(function() {
				if (ribbonActive==true) {
				  $(".message-ribbon").remove();
				  ribbonActive = false;
				}
		  	}); 
		}
				
	}
}

function initSwiftype() {
  var searchClass = "st-default-search-input";
  var domainDot = window.location.hostname.length > 5 ? window.location.hostname.lastIndexOf(".", window.location.hostname.length - 5) : -1;
  var domainName = domainDot != -1 ? window.location.hostname.substring(domainDot) : "";
  var domainToID = {
    ".crawfordcountybank.com": "GeGVTfayPFe7cBu3tbsJ",
    ".fandmstatebank.com": "cBJnZEZ-eFnqPzuZq-cg",
    ".firstbankcard.com": "qfxBpdyoh-kGQusuDKxT",
    ".fsbloomis.com": "8zxsH6xy3mqHQLB31z5M",
    ".houghtonstatebank.com": "noZxu-EaJxAjZFnj7z7r",
    ".landmands.com": "6fpPnSYpR98Eyz_XZoWH",
    ".scsbnet.com": "oXBKMELHnD5gEDMYxxAU",
    ".sibleystatebank.com": "KeCtom-bxo_kGgLk68MN",
    ".washingtoncountybank.com": "3bDzQAAhf9mqTM_yadUz",
    ".1stnationalbank.com":"nEjyk7kKzvWext5_PjDi",
    ".fnbk.com":"c_Piw78WExURDnz7RVLh",
    ".yorkstatebank.com":"m2xruXgHdFBxtd7sySdQ",
    ".fnsouthwest.com":"KnjvNdWDD171tEqF-Hjs",
    ".fnbil.com":"-kzrisQMRrr2ZKcUSrrw",
    ".fnbnp.com":"RWma8uBozxJiA-MYzLzP",
    ".fnbneb.com":"sjQRAQP8eSu65x5SGzQb",
    ".fnbfremont.com":"or8x-jxEZg9HeD43kyNR",
    ".fnbplattevalley.com":"Ys3yJMbqz2ERimEx5RaC",
    ".fnbsd.com":"gBRrc9JPHz5Rsk5fPSCx"
  };
  if (domainName in domainToID) {
  	  $('div.search #searchbox').addClass(searchClass);
	    (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
		  (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
		  e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
		  })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');
		  _st('install',domainToID[domainName],'2.0.0');
	  }
}

