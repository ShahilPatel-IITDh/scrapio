/*--------------------------------------------------------------
# Copyright (C) joomla-monster.com
# License: http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
# Website: http://www.joomla-monster.com
# Support: info@joomla-monster.com
---------------------------------------------------------------*/

//Set Module's Height script

function setModulesHeight() {
	var regexp = new RegExp("_mod([0-9]+)$");

	var jmmodules = jQuery(document).find('.jm-module') || [];
	if (jmmodules.length) {
		jmmodules.each(function(index,element){
			var match = regexp.exec(element.className) || [];
			if (match.length > 1) {
				var modHeight = parseInt(match[1]);
				jQuery(element).find('.jm-module-in').css('height', modHeight + 'px');
			}
		});
	}
}

//jQuery 'Back to Top' script

jQuery(document).ready(function(){
	
	setModulesHeight();
	
    // hide #jm-back-top first
    jQuery("#jm-back-top").hide();
    // fade in #jm-back-top
    jQuery(function () {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('#jm-back-top').fadeIn();
            } else {
                jQuery('#jm-back-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        jQuery('#jm-back-top a').click(function () {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});


//Document Text Resizer script (May 14th, 08'): By JavaScript Kit: http://www.javascriptkit.com

var documenttextsizer = {

	prevcontrol : '', //remember last control clicked on/ selected
	existingclasses : '',

	setpageclass : function(control, newclass) {
		if (this.prevcontrol != '')
			this.css(this.prevcontrol, 'selectedtoggler', 'remove')
		//de-select previous control, by removing 'selectedtoggler' from it
		document.documentElement.className = this.existingclasses + ' ' + newclass//apply new class to document
		this.css(control, 'selectedtoggler', 'add')//select current control
		this.setCookie('pagesetting', newclass, 5)//remember new class added to document for 5 days
		this.prevcontrol = control
	},

	css : function(el, targetclass, action) {
		var needle = new RegExp("(^|\\s+)" + targetclass + "($|\\s+)", "ig")
		if (action == "check")
			return needle.test(el.className)
		else if (action == "remove")
			el.className = el.className.replace(needle, "")
		else if (action == "add")
			el.className += " " + targetclass
	},

	getCookie : function(Name) {
		var re = new RegExp(Name + "=[^;]+", "i");
		//construct RE to search for target name/value pair
		if (document.cookie.match(re))//if cookie found
			return document.cookie.match(re)[0].split("=")[1]
		//return its value
		return null
	},

	setCookie : function(name, value, days) {
		if ( typeof days != "undefined") {//if set persistent cookie
			var expireDate = new Date()
			var expstring = expireDate.setDate(expireDate.getDate() + days)
			document.cookie = name + "=" + value + "; path=/; expires=" + expireDate.toGMTString()
		} else//else if this is a session only cookie
			document.cookie = name + "=" + value
	},

	setup : function(targetclass) {
		this.existingclasses = document.documentElement.className//store existing CSS classes on HTML element, if any
		var persistedsetting = this.getCookie('pagesetting')
		var alllinks = document.getElementsByTagName("a")
		for (var i = 0; i < alllinks.length; i++) {
			if (this.css(alllinks[i], targetclass, "check")) {
				if (alllinks[i].getAttribute("rel") == persistedsetting)//if this control's rel attribute matches persisted doc CSS class name
					this.setpageclass(alllinks[i], alllinks[i].getAttribute("rel"))
				//apply persisted class to document
				alllinks[i].onclick = function() {
					documenttextsizer.setpageclass(this, this.getAttribute("rel"))
					return false
				}
			}
		}
	}
}

//jQuery Off-Canvas
var scrollsize;

jQuery(function() {
    // Toggle Nav on Click
    jQuery('.toggle-nav').click(function() {
    	// Get scroll size on offcanvas open
    	if(!jQuery('body').hasClass('off-canvas')) scrollsize = jQuery(window).scrollTop();
        // Calling a function
        toggleNav();
    });
});

function toggleNav() {
	var y = jQuery(window).scrollTop();
    if (jQuery('body').hasClass('off-canvas')) {
        // Do things on Nav Close
        jQuery('body').removeClass('off-canvas');
        setTimeout(function() {
	        jQuery('.sticky-bar #jm-bar-wrapp').removeAttr('style');
	        jQuery('html').removeClass('no-scroll').removeAttr('style');
	        jQuery(window).scrollTop(scrollsize);
        }, 300);
    } else {
        // Do things on Nav Open
        jQuery('body').addClass('off-canvas');
		jQuery('.sticky-bar #jm-bar-wrapp').css({'position':'absolute','top':y});
		jQuery('.dj-megamenu-sticky').css({'position':'absolute','top':y});
        setTimeout(function() {
			jQuery('html').addClass('no-scroll').css('top',-y);
        }, 300);
    }
}

// Sticky Bar
jQuery(window).load(function(){   
    var resizeTimer;

    function resizeFunction() {
        var body = jQuery('body');
		var allpage = jQuery('#jm-allpage');
		  
		if(body.hasClass('sticky-bar')) {
		  var bar = allpage.find('#jm-bar-wrapp');
	      if (bar.length > 0) {
	      	var offset = bar.outerHeight();
	      	allpage.css('padding-top', (offset) + 'px');
	      }
	    }
    };
	resizeFunction();
	
    jQuery(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeFunction, 30);
    });
    
    jQuery(window).scroll(function() {    
	var topbar = jQuery('#jm-bar-wrapp');
	if (topbar.length > 0) {
	    var scroll = jQuery(window).scrollTop();
	    if (scroll >= 20) {
	        topbar.addClass("scrolled");
	        resizeFunction();
	    } else {
	        topbar.removeClass("scrolled");
	        resizeFunction();
	    }
	}
	});
});

//search hide
jQuery(document).ready(function(){
	var djMenu = jQuery('#jm-djmenu');
	if (djMenu.length > 0) {
		
		var searchModule = djMenu.find('.search-ms');
		var searchModuleInput = djMenu.find('#mod-search-searchword');
		var searchModuleButton = searchModule.find('.button');

		if (searchModule.length > 0 && searchModuleButton.length > 0 ) {
	
	  		searchModuleButton.mouseover(function (event) {
	  	        searchModuleInput.addClass('show');
	  	        searchModuleInput.focus();  
	  	    }); 
	  	    
	        searchModuleInput.focusout(function() {
	  	    	searchModuleInput.removeClass('show');
	  	    });

		}
	}  
});