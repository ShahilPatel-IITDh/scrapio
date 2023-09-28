;(function ($, window, document, undefined) {
    $(document).ready(function () {
        var menu = $(".us-autocomplete-pro-menu");
        inputAddress = $("#service-address"),
        inputUnit = $("#service-unit"),
        submitBtn = $('.ckav-submit-button button'),
        session_ckav_status = 'ckav_status',
        session_ckav_address = '',
        ckavURL = '',
        ckavAddress = '',
        ckavBref = "&bref=IBBfBSFIB1KBFR08O",
        timer = null,
        smartyStreetURL = "https://us-autocomplete-pro.api.smartystreets.com/lookup?",
        clearAddressData = function () {
            $("#service-address").val("");
        },
            
        getSuggestions = function(search, selected) {
            $.ajax({
              url: smartyStreetURL,
              data: {
                // Don't forget to replace the auth-id value with your own Website Key
                "key": "7895325052725259",
                "search": search,
                "selected": (selected ? selected : "")
              },
              dataType: "jsonp",
            }).done(function(data) {
              if (data.suggestions) {
                buildMenu(data.suggestions);
              } else {
                //noSuggestions();
              }
            }).fail(function(jqXHR,textStatus,error) {
              att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                {
                    type: textStatus ,
                    statusCode: jqXHR.status, 
                }
              ));         
              return error;
            });
        },
            
        buildMenu = function (suggestions) {
            var menu = $(".us-autocomplete-pro-menu");
            menu.empty();            
            suggestions.map(function(suggestion) {
                
              var caret = (suggestion.entries > 1 ? "<span class=\"ui-menu-icon ui-icon ui-icon-caret-1-e\"></span>" : "");
              menu.append("<li><div data-address='" +
                            suggestion.street_line + ";" + 
                            (suggestion.secondary ? suggestion.secondary : "") + ";" +
                            ((suggestion.entries > 1) ? "(" + suggestion.entries + ");": "") +
                            suggestion.city + ";" +
                            suggestion.state + ";" + 
                            suggestion.zipcode + "'>" +
                            caret +
                            buildAddress(suggestion) + 
                            "</b></div></li>"
                         );                
            });
             menu.show();          
        },
      
        buildAddress = function(suggestion) {
            var whiteSpace = "";
            if (suggestion.secondary || suggestion.entries > 1) {
              if (suggestion.entries > 1) {
                suggestion.secondary += " (" + suggestion.entries + " units)";
              }
              whiteSpace = " ";
            }
            var address = suggestion.street_line + whiteSpace + suggestion.secondary + 
                            //" " + suggestion.city + ", " + suggestion.state + 
                            " - " + suggestion.zipcode;
            var inputAddress = $("#service-address").val();
            for (var i = 0; i < address.length; i++) {
              var theLettersMatch = typeof inputAddress[i] == "undefined" || address[i].toLowerCase() !== inputAddress[i].toLowerCase();
              if (theLettersMatch) {
                address = ["<b>", address.slice(0, i), "</b>", address.slice(i)].join("");
                break;
              }
            }
            return address;
        },
            
        enableSubmitBtn = function() {
            submitBtn.removeAttr("disabled");
            submitBtn.removeClass("gray").addClass("blue");            
        },

        disableSubmitBtn = function() {
            submitBtn.attr("disabled", "true");
            submitBtn.removeClass("blue").addClass("gray");          
        },
        
        bindEvents = function () {
            $(".us-autocomplete-pro-menu").click(function() {
                    var selectedDivTag = $(this).find("li:hover").find('div');
                    var text = selectedDivTag.text();
                    var address = selectedDivTag.attr("data-address").split(";");
                    var searchForMoreEntriesText = new RegExp(/(?:\ units\))/);
                    inputAddress.val(address.join(" "));
                    if (text.search(searchForMoreEntriesText) == "-1") {  
                        inputUnit.val(address[1]);
                        $(".us-autocomplete-pro-menu").hide();
                        ckavAddress = address.join(",");
                        enableSubmitBtn();
                        //getSingleAddressData(address);
                    } else {                    
                        inputAddress.val(address[0] + " ");                     

                        var selected = selectedDivTag.attr("data-address").replace(" units", "");
                        selected = address.join(" ");
                        //selected = address;
                        getSuggestions(address[0], selected);
                    }
            });

            $("#service-address").click(function(event) {
                if (inputAddress.val() === "") inputAddress.attr("placeholder" ,"");
            });
            
            $("#service-unit").click(function(event) {
                if (inputUnit.val() === "") inputUnit.attr("placeholder" ,"");
            });            
            
            $("#service-address").keydown(function(event) {
                clearTimeout(timer);
                if(event.key !== "Backspace") {
                    disableSubmitBtn();
                    timer = setTimeout(function() {
                        if (inputAddress.val() === "Enter your business address" || inputAddress.val() === "") clearAddressData();
                        var address = inputAddress.val();
                        if(address.length > 2) {
                            getSuggestions(address);
                        } else {
                            menu.hide();
                        }
                    }, 400);
                } else {
                    menu.hide();
                }

            });
                                  
    		/*
            $("#service-address").keyup(function(event) {
                disableSubmitBtn();
                if (inputAddress.val() === "Enter your business address" || inputAddress.val() === "") clearAddressData();
                if (event.key === "ArrowDown") {
                  //menu.focus();
                  //menu.menu("focus", null, menu.menu().find(".ui-menu-item"));
                } else {
                  var textInput = inputAddress.val();
                  if (textInput) {
                    //menu.show();
                    getSuggestions(textInput);
                  } else {
                    //menu.hide();
                  }
                }
            });
            */

            $(".check-availability-container button.att-button").click(function () {
            	//surround with try catch in case someone has localStorage disabled
            	try {
                	sessionStorage.setItem(session_ckav_status, "ckav_submitted");
                	sessionStorage.setItem(session_ckav_address, ckavAddress);
            	} catch(e) {
            		console.log("INFO: Local Storage maybe disabled.");
            	}
                ckavURL = $("#buyflowUrl").val()? 
                            $("#buyflowUrl").val() :         
                            "https://www.att.com/smallbusiness/explore/quickflow/business-internet/home";
                if (!ckavURL.endsWith("?address=")) ckavURL += "?address=";
                
                //send custom event here
                
                // att.entbus.track.ddo.pushEvent('formResponse', 'DS_Check_Avail_Submit', 
	              //       {
	              //           'successFlag'         : '1',
	              //           'statusCode'          : '0',
	              //           'errorType'           : 'Success_Admit',
	              //           'sendHitNow'		  : true,
	              //           'linkName'            : 'Submit',
	              //           'linkPosition'        : 'Body',
	              //           'linkDestinationUrl'  : window.location.href,
	              //           'contentFriendlyName' : 'Check Availability'
	              //       }
	              //   );
            
                
                att.adobeDataLayer.pushEvent(
                  att.adobeDataLayerManager.trackingUserCustomTypeData.visitorCheckAvailabilityServices()
                );                                
                window.open(ckavURL + ckavAddress + ckavBref, "_self");
            });
        },        
        
        init = function () {
            // Run after config.delay milliseconds
            var serviceAddr = $("#service-address").val();
            if (sessionStorage.getItem(session_ckav_status) === "ckav_submitted") {
                ckavAddress = sessionStorage.getItem(session_ckav_address);
                enableSubmitBtn();
                sessionStorage.setItem(session_ckav_status, "");
            } else {
                disableSubmitBtn();
            }
        },

        // Run after DOM ready
        $(function () {
            init();
            bindEvents();
        });        
    });
})(jQuery.noConflict(), window, document);
    $jq10 = jQuery.noConflict();
// add has-submenu class to the parent li where submenu is available
    $jq10('.wholesale-menu').find('li:has(.secondaryNav)').addClass('has-submenu');

    $jq10("#primaryNav li").mouseover(function(){
        $jq10(this).parent('ul').find('#active-page').removeClass('no-menu-divider');
        $jq10(this).parent('ul').find('#active-page').css('background','#131313');
        $jq10(this).parent('ul').find('#active-page div.menu-divider a:first-child').css('color','#fff');
    });
    $jq10("#primaryNav li").mouseout(function(){
        $jq10(this).parent('ul').find('#active-page').addClass('no-menu-divider');
        $jq10(this).parent('ul').find('#active-page').css('background','#fff');
        $jq10(this).parent('ul').find('#active-page div.menu-divider a:first-child').css('color','#067AB4');    
    }); 
    $jq10('li#active-page').mouseover(function(){
        $jq10(this).parent('ul').find('#active-page').removeClass('no-menu-divider');
        $jq10(this).parent('ul').find('#active-page').css('background','#fff');
        $jq10(this).parent('ul').find('#active-page div.menu-divider a:first-child').css('color','#067AB4');
    });

    $jq10(".arrow_explore_m, .arrow_explore_li>a").click(function(e) {
		e.preventDefault();
        $jq10(this).parent("li").addClass("activemenu");
        $jq10("ul.explore > li").addClass("active_sub_menu_items");
        $jq10(".explore").show();
        $jq10(".arrow_explore_m").parent("li").siblings().css("display", "none");
        $jq10(".back_arrow").css("display","block");
        $jq10(".arrow_explore_m").css("display", "none");
        $jq10(".sub_back_arrow").css("display","none");         
        //keyboard access //focus first item in the menu
        $jq10('.explore>li:first-child>a').focus();
        //making menu header nonfocusable
        $jq10('.activemenu a').attr('tabindex','-1');											 
    }); 

    $jq10(".arrow_goto_m, .arrow_goto_li>a").click(function(e) {
		e.preventDefault();
        $jq10(this).parent("li").addClass("activemenu");
        $jq10("ul.goto > li").addClass("active_sub_menu_items");
        $jq10(".goto").css("display","block");
        $jq10(".arrow_goto_m").parent("li").siblings().css("display","none");
        $jq10(".back_arrow").css("display","block");
        $jq10(".arrow_goto_m").css("display","none");
		//keyboard access //focus first item in the menu
        $jq10('.goto>li:first-child>a').focus();
        //making menu header nonfocusable
        $jq10('.activemenu a').attr('tabindex','-1');												
    });
    $jq10(".arrow_shop_m, .arrow_shop_li>a").click(function(e) {
        e.preventDefault();
        $jq10(this).parent("li").addClass("activemenu");
        $jq10("ul.personal > li").addClass("active_sub_menu_items");
        $jq10(".personal").css("display","block");
        $jq10(".arrow_shop_m").parent("li").siblings().css("display","none");
        $jq10(".back_arrow").css("display","block");
        $jq10(".arrow_shop_m").css("display","none");
		//keyboard access //focus first item in the menu
        $jq10('.personal>li:first-child>a').focus();
        //making menu header nonfocusable
        $jq10('.activemenu a').attr('tabindex','-1');															   
    });
    $jq10(".arrow_products_m, .arrow_products_li>a").click(function(e) {
		e.preventDefault();
        $jq10(".activemenu").hide();
        $jq10(this).parent("li").addClass("active_sub_menu");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10("ul.products-mob-menu > li").addClass("active_sub_menu_items");
        $jq10("li.active_sub_menu > ul").addClass("active_sub_menu_wrapper");
        $jq10(".products-mob-menu").css("display", "block");
        $jq10(this).parent("li").siblings().css("display", "none");
        $jq10(".back_arrow2").css("display", "block");
        $jq10(".arrow_products_m").css("display", "none");
        //keyboard access //focus first item in the menu
        $jq10('.products-mob-menu>li:first-child>a').focus();
        //making menu header nonfocusable
        $jq10('.activemenu a').attr('tabindex', '-1');

    });
    $jq10(".arrow_industries_m, .arrow_industries_li>a").click(function(e) {
        e.preventDefault();
        $jq10(".activemenu").hide();
        $jq10(this).parent("li").addClass("active_sub_menu");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10("ul.industries-mob-menu > li").addClass("active_sub_menu_items");
        $jq10("li.active_sub_menu > ul").addClass("active_sub_menu_wrapper");
        $jq10(".industries-mob-menu").css("display", "block");
        $jq10(this).parent("li").siblings().css("display", "none");
        $jq10(".back_arrow2").css("display", "block");
        $jq10(".arrow_industries_m").css("display", "none");
        //keyboard access //focus first item in the menu
        $jq10('.industries-mob-menu>li:first-child>a').focus();
        //making menu header nonfocusable
        $jq10('.activemenu a').attr('tabindex', '-1');

    });

    $jq10(".arrow_solutions_m, .arrow_solutions_li>a").click(function(e) {
        e.preventDefault();
        $jq10(".activemenu").hide();
        $jq10(this).parent("li").addClass("active_sub_menu");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10("ul.solutions-mob-menu > li").addClass("active_sub_menu_items");
        $jq10("li.active_sub_menu > ul").addClass("active_sub_menu_wrapper");
        $jq10(".solutions-mob-menu").css("display", "block");
        $jq10(this).parent("li").siblings().css("display", "none");
        $jq10(".back_arrow2").css("display", "block");
        $jq10(".arrow_solutions_m").css("display", "none");
        //keyboard access //focus first item in the menu
        $jq10('.solutions-mob-menu>li:first-child>a').focus();
        //making menu header nonfocusable
        $jq10('.activemenu a').attr('tabindex', '-1');

    });    
    $jq10(".back_arrow2").click(function() {
        //keyboard access
        $jq10('.activemenu a').attr('tabindex', '0');
        $jq10(this).parent("li").removeClass("activemenu");
        $jq10(".activemenu,.sub_arrow_m").css("display", "block");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10(this).parent("li").removeClass("active_sub_menu").addClass("active_sub_menu_items");
        $jq10(this).parent("li").siblings().show().addClass("active_sub_menu_items");
        if(jQuery(this).parents('ul').hasClass('explore')) {
            $jq10(".sub_back_arrow, .sub_back_arrow1").css("display", "none");
            $jq10(".sub_mob_menu ul.products-mob-menu").removeClass("active_sub_menu_wrapper");
            $jq10(".sub_mob_menu ul.solutions-mob-menu").removeClass("active_sub_menu_wrapper");            
        }
        $jq10(".back_arrow2").css("display", "none");
        $jq10(".products-mob-menu, .industries-mob-menu, .solutions-mob-menu").css("display", "none");
        $jq10(".arrow_products_m, .arrow_industries_m, .arrow_solutions_m").css("display", "block");
        
        //keyboard access
        $jq10(this).next('a').focus();

    });
    $jq10(".arrow_support_m, .arrow_support_li>a").click(function(e) {
		e.preventDefault();
        $jq10(this).parent("li").addClass("activemenu");
        $jq10("ul.support > li").addClass("active_sub_menu_items");
        $jq10(".support").css("display","block");
        $jq10(".arrow_support_m").parent("li").siblings().css("display","none");
        $jq10(".back_arrow").css("display","block");
        $jq10(".arrow_support_m").css("display","none");
		//keyboard access //focus first item in the menu
        $jq10('.support>li:first-child>a').focus();
        //making menu header nonfocusable
        $jq10('.activemenu a').attr('tabindex','-1');											 
    });
            
    $jq10(".back_arrow").click(function(){              
		//keyboard access
        $jq10('.activemenu a').attr('tabindex','0');											
        $jq10(this).parent("li").removeClass("activemenu");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10(".arrow_explore_m,.arrow_prod_m,.arrow_sol_m,.arrow_goto_m,.arrow_shop_m,.arrow_support_m").css("display", "block");
        $jq10(".arrow_explore_m,.arrow_prod_m,.arrow_sol_m,.arrow_goto_m,.arrow_shop_m,.arrow_support_m").parent("li").siblings().css("display", "block");
        $jq10(".sub_menu_wrap,.back_arrow").css("display","none");
		//keyboard access
        $jq10(this).next('a').focus();							  
    });

    $jq10(".sub_arrow_m1").click(function(e) {
		e.preventDefault();
        $jq10(".active_sub_menu,.sub_arrow_m1").css("display", "none");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10(this).parent("li").addClass("active_sub_menu2");
        $jq10(this).parent("li").siblings().hide();
        $jq10("li.active_sub_menu2 > ul").addClass("active_sub_menu_wrapper");
        $jq10("ul.active_sub_menu_wrapper > li").addClass("active_sub_menu_items");
        $jq10(".sub_back_arrow1").css("display", "block");
        //keyboard access
        var firstItem = att.entbus.keyboardAccess.getFocusableItem('.active_sub_menu_wrapper', "firstItem");
        $jq10(firstItem).focus();
        $jq10(this).next('a').focus();
        $jq10('.active_sub_menu > a').attr('tabindex', '-1');
    });

    $jq10(".sub_back_arrow1").click(function() {
        //keyboard access
        $jq10('.active_sub_menu  > a').attr('tabindex', '0');
        $jq10(".active_sub_menu,.sub_arrow_m1").css("display", "block");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10(".active_sub_menu_wrapper").removeClass("active_sub_menu_wrapper");
        $jq10(this).parent("li").removeClass("active_sub_menu2").addClass("active_sub_menu_items");
        $jq10(this).parent("li").siblings().show().addClass("active_sub_menu_items");
        $jq10(".sub_back_arrow1").css("display", "none");
        //keyboard access
        $jq10(this).next('a').focus();
    });

    $jq10(".sub_arrow_m, .sub_arrow_li>a").click(function(e) {
		e.preventDefault();
        $jq10(".activemenu,.sub_arrow_m").css("display","none");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10(this).parent("li").addClass("active_sub_menu");
        $jq10(this).parent("li").siblings().hide();
        $jq10("li.active_sub_menu > ul").addClass("active_sub_menu_wrapper");
        $jq10("ul.active_sub_menu_wrapper > li").addClass("active_sub_menu_items");
        $jq10(".sub_back_arrow").css("display","block");
		//keyboard access
        var firstItem=att.entbus.keyboardAccess.getFocusableItem('.active_sub_menu_wrapper',"firstItem");
        $jq10(firstItem).focus();
        $jq10(this).next('a').focus();
        $jq10('.active_sub_menu > a').attr('tabindex','-1');											 
    });
    $jq10(".sub_prod_arrow_li>a").click(function(e) {
		e.preventDefault();
        $jq10(".activemenu,.sub_arrow_m").css("display","none");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10(this).parent("li").addClass("active_sub_menu");
        $jq10(this).parent("li").siblings().hide();
        $jq10(".sub_mob_menu ul.products-mob-menu").addClass("active_sub_menu_wrapper");
        $jq10(".back_arrow2").css("display", "block");
        $jq10("ul.active_sub_menu_wrapper > li").addClass("active_sub_menu_items");
        $jq10(".sub_back_arrow").css("display","block");
		//keyboard access
        var firstItem=att.entbus.keyboardAccess.getFocusableItem('.active_sub_menu_wrapper',"firstItem");
        $jq10(firstItem).focus();
        $jq10(this).next('a').focus();
        $jq10('.active_sub_menu > a').attr('tabindex','-1');											 
    });
    $jq10(".sub_sol_arrow_li>a").click(function(e) {
		e.preventDefault();
        $jq10(".activemenu,.sub_arrow_m").css("display","none");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10(this).parent("li").addClass("active_sub_menu");
        $jq10(this).parent("li").siblings().hide();
        $jq10(".sub_mob_menu ul.solutions-mob-menu").addClass("active_sub_menu_wrapper");
        $jq10(".back_arrow2").css("display", "block");
        $jq10("ul.active_sub_menu_wrapper > li").addClass("active_sub_menu_items");
        $jq10(".sub_back_arrow").css("display","block");
		//keyboard access
        var firstItem=att.entbus.keyboardAccess.getFocusableItem('.active_sub_menu_wrapper',"firstItem");
        $jq10(firstItem).focus();
        $jq10(this).next('a').focus();
        $jq10('.active_sub_menu > a').attr('tabindex','-1');											 
    });
    $jq10(".sub_back_arrow").click(function(){  
		//keyboard access
		$jq10('.active_sub_menu  > a').attr('tabindex','0');											  
        $jq10(".activemenu,.sub_arrow_m").css("display","block");
        $jq10(".active_sub_menu_items").removeClass("active_sub_menu_items");
        $jq10(".active_sub_menu_wrapper").removeClass("active_sub_menu_wrapper");
        $jq10(this).parent("li").removeClass("active_sub_menu").addClass("active_sub_menu_items");
        $jq10(this).parent("li").siblings().show().addClass("active_sub_menu_items");
        $jq10(".sub_back_arrow, .back_arrow2").css("display","none");
		//keyboard access
        $jq10(this).next('a').focus();							  
    });

	/*
		Reload the support center page when the same URL with different hash value is accessed
    */
	$jq10("ul#center-sub-menu li a, .sub_menu_wrap.support li a").bind("click", function(e) {
        var supporthref = $jq10(this).attr('href');
        if (supporthref.indexOf("supportcenter.html") >= 0) {
            $jq10(window).on('hashchange', function(e) {
                location.reload();
            });
        }
    });

    function hideMenu() {
        $jq10("#side_wrapper").hide(function() {
            $jq10("#side_wrapper").css({"border-left":"none"});
            $jq10("#header .logo").css("display","block");
            $jq10("#header .segment").css("display","block");
            
            $jq10('#primary-wrapper').css({ "max-width":"100%"});
            if ((window.innerWidth || document.documentElement.clientWidth) <= 767) {
                //$jq10("#header").css("max-width","480px");
            } else if ((window.innerWidth || document.documentElement.clientWidth) <= 1023) {
                //$jq10("#header.resp-header").css("max-width","768px");
            } else {
                $jq10("#header.resp-header").css("max-width","980px");
                $jq10("#header.fluid-header").css("max-width","1280px");
            }
            $jq10(".widget-button-holder").show();
        }); 
    }

/**
 * goto component
 * @namespace att.entbus.goto 
 * @type {object}
 * @required jQuery library
 * @requires closeFrameForm method definition (part of lead form)
 * @todo handle social media modal windows close in a proper way 
 *       by rearchitecting their methods
 */
var att    = att || {};
att.entbus = att.entbus || {};

att.entbus.goto = (function($, window, document, undefined) {

    var selector = {
            gotoComp              : '#header .goto-container',
            gotoOptions           : '#header .goto-options',
            primaryWrapper        : '#primary-wrapper',
            socialWrapper         : '#social-wrapper'
    },
	    classes = {
        gotoSelect: 'goto-select'
    };

    var bindEvents = function() {
        /** goto component handler */
        $(selector.gotoComp).bind('click', function(e) {
            // Do nothing when clicking heading in the dropdown
            // TODO: write more solid logic
            if (e.target.className === 'goto-heading') return;
            $(selector.gotoOptions).toggle();
			att.entbus.keyboardAccess.updatePressedattr("."+classes.gotoSelect);																		  
            $(this).toggleClass('active');
            att.entbus.menu.resetMenu();
            if(typeof closeFrameForm !== 'undefined') closeFrameForm();
            // TODO: rearchitect social media widget module properly to expose its methods
            if($('.social-close').is(':visible')) $('.social-close').trigger('click');
            if($('.foresee-modal-close').is(':visible')) $('.foresee-modal-close').trigger('click');
            // show mask onlyl when menu is active
            if( $(this).hasClass('active') ) {
                att.entbus.menu.mask(); 
                att.entbus.keyboardAccess.activeMenu("login");
                    $("." + classes.gotoSelect).addClass("blue-btm-brd").removeClass("bluet-btm-brd");
                }
                else {
                att.entbus.keyboardAccess.activeMenu("hidden");
            }

        });

        // deprecated. as mask is shown on top of primaryWrapper
        /** To close login menu popup */
            /*$(selector.primaryWrapper + ', ' + selector.socialWrapper).bind('click', function() {
            if(event.target.className !== classes.gotoSelect) resetMenu();
            });*/
        }
        , resetMenu = function () {
        $(selector.gotoOptions).hide();
        $(selector.gotoComp).removeClass('active');
        att.entbus.menu.clearMask();
		$("."+classes.gotoSelect).attr('aria-pressed','false');																	 
    };

    $(function() {
        bindEvents();
    });

    return {
        resetMenu: resetMenu
    };

})(jQuery.noConflict(), window, document);

/**
 * Menu component
 * @requires jQuery library
 * @requires att.entbus.menu
 * @param  {Object} $         jQuery Object
 * @param  {Object} window    Retoring native window object
 * @param  {Object} document  Retoring native document object
 * @param  {Object} undefined Restoring native undefined object
 * @requires closeFrameForm() function defintion (part of lead form)
 * @todo handle social media modal windows close in a proper way 
 *       by rearchitecting their methods
 * @return {Object}           att.entbus.menu
 */
(function($, window, document, undefined) {
    
    var module,
        breakpoint = 1200,
        selector = {
            primaryMenu: '.primary-menu li button',
            businessUnit: '.primary-menu .explore-unit',
            shopUnit: '.shop-menu .shop-unit',
            supportUnit: '.support-menu .support-unit',
            mobMainMenu: '.mob_main_menu',
            popupMenu: '#popup-menu',
            popupSubMenu: '#popup-sub-menu',
            popupSubMenuList: '#popup-sub-menu-list',
            mask: '.primary-menu-mask',
            primaryWrapper: '#primary-wrapper',
            sideWrapperHeader: '#side-wrapper-header',
            headerWrapper: '.header-wrapper',
            sideWrapper: '#side_wrapper',
            widgetButtonHolder: '.widget-button-holder',
            desktopFirstLevelMenu:'#popup-menu .mob_main_menu',
            mobileFirstLevelMenu:'#inner_wrap .mob_main_menu',
            desktopMenuItem: "#popup-menu li",
            desktopSubMenuItem: "#popup-sub-menu li a",
            loginMenu: ".goto-select",
            loginContainerActive: ".goto-container.active"
        },
        classes = {
            active: 'active',
            sticky: 'sticky',
            hamburger: 'hamburger-menu',
            closeMenu: 'close-menu',
			glyphiconRemove: 'glyphicon-remove',
			glyphiconMenuHamburger: 'glyphicon-menu-hamburger',
            hover: 'hover'
		},
        attributes={
            hasPopup:"aria-haspopup",
            expanded:"aria-expanded",
            pressed:"aria-pressed"					  
        };

        var bindEvents = function () {

            $(selector.primaryMenu).bind('click', function(e) {
                toggleMenu(this,e);
            });
            $(window).bind('resize', function() {
                if (window.innerWidth > 768) resetMenu();
            });
            $(selector.desktopMenuItem).bind("click", function(e) {

                if ($(this).hasClass('has-sub-menu')) {
                    e.preventDefault();
                    toggleSubMenu($(this));
				 
                } else {
                    $(selector.popupMenu).find('a').addClass('brd-rgt').removeClass('brd-rgt-none');
                    $(selector.popupMenu).find('.last').children('a').removeClass('brd-rgt');
                }
            });

											   
				 
            $(".primary-menu li button, .goto-select, #header .personal-container a").bind("mouseover focus", function(e) {
                $(selector.headerWrapper).find("button[aria-haspopup]").removeClass("blue-btm-brd").addClass("bluet-btm-brd");
                $(this).removeClass("bluet-btm-brd").addClass("blue-btm-brd");
            });
            $(".primary-menu li button, .goto-select, #header .personal-container a").bind("mouseleave blur", function(e) {
                $(this).removeClass("blue-btm-brd").addClass("bluet-btm-brd");
                $(selector.headerWrapper).find("button[aria-haspopup].active").removeClass("bluet-btm-brd").addClass("blue-btm-brd");
                $(selector.loginContainerActive).children(selector.loginMenu).removeClass("bluet-btm-brd").addClass("blue-btm-brd");

            });
            $(selector.desktopSubMenuItem).bind("mouseover", function(e) {
                dskSubMenuMouseNav_hover($(this));
            });   

													
			   
        },
													   
													
																		
											 
															  
											
									 
		 
        dskSubMenuMouseNav_hover = function(selector) {

            selector.parents('ul.menu-list').removeClass('brd-right');
            selector.parents('ul.menu-list').children('li').children('ul').hide();
            selector.parents('li').children('ul').show();
            selector.parents('ul.menu-list').children('li').removeClass(classes.hover);
            selector.parents('ul.menu-list').addClass('brd-right');
            selector.parents('ul.menu-list').css('min-height', selector.parents('ul.menu-list').children('li').children('ul').height()+'px');

            if(selector.parent('li').attr('aria-haspopup') != 'true'){
                selector.parents('ul.menu-list').removeClass('brd-right');
                selector.parents('ul.menu-list').removeClass('min-height');                
            };

            if(selector.closest('ul.sub-menu2').parent('li').attr('aria-haspopup') == 'true'){
                selector.closest('ul.menu-list').addClass('brd-right');
            }


            selector.parent('li').addClass(classes.hover);

        },
																	
												
													   
													
		 
        toggleSubMenu = function($this) {
								 
												  
													
            var subNavId = $($this).attr("data-id");
            $(selector.popupMenu).find('li').removeClass(classes.hover);
            $(selector.popupMenu).find('li').removeClass('min-height');
            $($this).addClass(classes.hover);
            $(selector.popupSubMenu).find(".sub-menu").hide();
            $(selector.popupSubMenu).find(".sub-menu2").hide();
            $(selector.popupSubMenu).show();
            $('#' + subNavId).show();
            $('#' + subNavId).find('li').removeClass(classes.hover);
            $('#' + subNavId).removeClass('brd-right');
            $('#' + subNavId).css('min-height', 'unset');

            $(selector.popupMenu).find('a').addClass('brd-rgt').removeClass('brd-rgt-none');
            $($this).prev('li').children('a').addClass('brd-rgt-none').removeClass('brd-rgt');
            $($this).children('a').addClass('brd-rgt-none').removeClass('brd-rgt');
            $(selector.popupMenu).find('.last').children('a').removeClass('brd-rgt');
            },  

		 
        toggleMenu = function ($this,e) {
			var lastFocusableItem;		 

            $($this).parent('li').siblings().children('button').removeClass(classes.active);
            $($this)
                .toggleClass(classes.active)
                .find('i')
                .toggleClass(classes.hamburger)
                .toggleClass(classes.closeMenu)
				.toggleClass(classes.glyphiconRemove)
				.toggleClass(classes.glyphiconMenuHamburger);

            // close lead form if already opened
            if(typeof closeFrameForm !== 'undefined') closeFrameForm();
            // TODO: rearchitect social media widget module properly to expose its methods
            if($('.social-close').is(':visible'))  $('.social-close').trigger('click');
            if($('.foresee-modal-close').is(':visible')) $('.foresee-modal-close').trigger('click');

            att.entbus.menu.mask();

            if(window.innerWidth < breakpoint) {

                if ($($this).hasClass(classes.active)) {
                    if (($(selector.headerWrapper).hasClass(classes.sticky)) && (!$(selector.sideWrapperHeader).hasClass(classes.sticky))) {
                        //$(selector.sideWrapperHeader).addClass(classes.sticky);
                    }
                    $(selector.sideWrapper).show(function() {
                        $(selector.sideWrapper).css({"border-left":"solid 1px #666"});
                        $(selector.widgetButtonHolder).hide();
						/*
                        $('html, body').animate({
                            scrollTop: $(selector.primaryWrapper).offset().top
                        });
                        */
                        $(selector.sideWrapper).css({'overflow-y': 'scroll'});
                        $('html, body').addClass('modal-open');
                    });
					//keyboard navigation
                    att.entbus.keyboardAccess.activeMenu("mobile");
                    
                    lastFocusableItem=att.entbus.keyboardAccess.getFocusableItem(selector.mobileFirstLevelMenu,"lastItem");
                    att.entbus.keyboardAccess.setLastItemAttribute(lastFocusableItem,"mainMenuTrigger");
                    att.entbus.keyboardAccess.updatePressedattr(selector.businessUnit);
                    //$("#side_wrapper").focus();
                    if(typeof att.adobeDataLayerManager !== 'undefined') {
                       att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataOnClick(e, {'slotFriendlyName':'SubNav','contentFriendlyName':'Primary Navigation','linkName':'Menu Icon','linkDestinationUrl':'Open Mobile Nav', 'type': 'other'}));
                    }
                } else {
                    hideMenu();
                    att.entbus.menu.clearMask();
					//keyboard navigation
                    att.entbus.keyboardAccess.activeMenu("hidden");
                    att.entbus.keyboardAccess.removeLastItemAttribute(lastFocusableItem,'data-next');
                    att.entbus.keyboardAccess.dskMenuReset();
                    att.entbus.keyboardAccess.updatePressedattr(selector.businessUnit);
                    if(typeof att.adobeDataLayerManager !== 'undefined') {
                        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataOnClick(e, {'slotFriendlyName':'SubNav','contentFriendlyName':'Primary Navigation','linkName':'Close Menu Icon','linkDestinationUrl':'Close Mobile Nav', 'type': 'other'}));
                    }
                }
			 
            } else {
                if ($(selector.businessUnit).hasClass(classes.active) || $(selector.shopUnit).hasClass(classes.active) || $(selector.supportUnit).hasClass(classes.active)) {
                    $(selector.popupMenu).find('ul').hide();
                    $(selector.popupSubMenu).hide();
                    $(selector.popupMenu).show();
                    var subNavId = $($this).attr("data-id");
                    $('#' + subNavId).show();
                    $($this).addClass("blue-btm-brd").removeClass("bluet-btm-brd");
                    /*first submenu active*/
                    var firstSubMenu = $('#' + subNavId).children();
                    toggleSubMenu(firstSubMenu[0]);

					//keyboard navigation
                    //att.entbus.keyboardAccess.activeMenu("desktop");
                    lastFocusableItem = att.entbus.keyboardAccess.getFocusableItem(selector.desktopFirstLevelMenu,"lastItem");
                    att.entbus.keyboardAccess.setLastItemAttribute(lastFocusableItem,"mainMenuTrigger");
                    att.entbus.keyboardAccess.updatePressedattr(selector.businessUnit);																																		 
                }
                else {
                    $(selector.popupMenu).hide();
                    var subNavId = $($this).attr("data-id");
                    $('#' + subNavId).hide();
                    $(selector.popupSubMenu).hide();
                    att.entbus.menu.clearMask();
					//keyboard navigation
                    att.entbus.keyboardAccess.activeMenu("hidden");
                    att.entbus.keyboardAccess.removeLastItemAttribute(lastFocusableItem,'data-next');
                    att.entbus.keyboardAccess.dskMenuReset();
                    att.entbus.keyboardAccess.updatePressedattr(selector.businessUnit);																															   
                }
                att.entbus.goto.resetMenu();
            }

        },
        
        resetMenu = function () {
            $(selector.businessUnit).removeClass(classes.active);
            $(selector.shopUnit).removeClass(classes.active);
            $(selector.supportUnit).removeClass(classes.active);
            $(selector.popupMenu).hide();
            $(selector.popupSubMenu).hide();
            $(selector.businessUnit)
                .find('i')
                .removeClass(classes.closeMenu)
                .addClass(classes.hamburger)
				.removeClass(classes.glyphiconRemove)
				.addClass(classes.glyphiconMenuHamburger);
            hideMenu();
            att.entbus.menu.clearMask();
			att.entbus.keyboardAccess.dskMenuReset();										 
        };

    $(function () {
        bindEvents();
    });

    module = {
        toggleMenu: toggleMenu,
        resetMenu : resetMenu
    };

    Namespacer('att.entbus.menu', module);

})(jQuery.noConflict(), window, document);
/*
 * keyboard accees / accessibility
 * @namespace att.entbus.keyboardAccess 
 * @type {object}
 * @required jQuery library 
*/
;(function ($, window, document,undefined) {
    var menu = "",module
        , breakpoint = 1200
        , currentLastItem, selectors = {
            mainMenuTrigger: ".primary-menu .explore-unit"
            , mobMenu: "#side_wrapper"
            , mobSearch: "#mob_search"
            , desktopMenu: ".primary-menu"
            , gotoSelect: '.goto-select'
            , gotoOptions: '#header .goto-options'
            , gotoOptionsItem: ".goto-options a"
            , skipNav: ".skip-nav"
            , deskTopMenu: "#popup-menu .mob_main_menu"
            , popupMenu: "#popup-menu"
            , popupSubMenu: "#popup-sub-menu"
            , mobMainBackArrow: "#inner_wrap .back_arrow"
            , mobSubBackArrow: "#inner_wrap .sub_back_arrow"
            , focusableHasPopItem: "#popup-menu [aria-haspopup=true] a"
            , focusableMobHasPopItem: "#inner_wrap [aria-haspopup=true] a"
            , focusableDskMenuItem: "#popup-menu [role='menuitem'] a"
            , focusableMobMenuItem: "#inner_wrap [role=menuitem] a"
            , focusableLoginMenuItem: ".goto-options [role=menuitem] a"
        }
        , attributes = {
            dataNext: 'data-next'
            , hasPopup: 'aria-haspopup'
            , expanded: 'aria-expanded'
        }
        , key = {
            tab: 9
            , enter: 13
            , esc: 27
            , space: 32
            , left: 37
            , up: 38
            , right: 39
            , down: 40
        }
        , setLastItemAttribute = function (selector, identifier) {
            $(selector).attr(attributes.dataNext, identifier);
        }
        , removeLastItemAttribute = function (selector, attribute) {
            $(selector).removeAttr(attribute);
        }
        , activeMenu = function (status) {
            menu = status;
            //focus
            if (window.innerWidth < breakpoint) {
                $(selectors.mobSearch).focus();
            }
            else {
                var fs = getFocusableItem(selectors.deskTopMenu, "firstItem");
                $(fs).focus();
            }
        }
        , getFocusableItem = function (target, option) {
            var focusableItems = $(target).find('a[href],area[href],input:not([disabled]),select:not([disabled]),button:not([disabled]),textarea:not([disabled]),[tabindex="0"]');
            switch (option) {
            case "firstItem":
                return focusableItems[0];
                break;
            case "lastItem":
                return focusableItems[focusableItems.length - 1];
                break;
            }
        }
        , updatePressedattr = function (selector) {
            var x = $(selector).attr('aria-pressed');
            x = ((x === "false" && typeof x !== typeof undefined) ? "true" : "false");
            $(selector).attr('aria-pressed', x);
        }
        , forceFocus = function (ev, val, el) {
            switch (val) {
            case "mainMenuTrigger":
                //only for menu items
                ev.preventDefault();
                $(selectors.mainMenuTrigger).focus();
                dskMenuReset();
                break;
            case "gotoSelect":
                ev.preventDefault();
                $(selectors.gotoSelect).focus();
                break;
            case "mainBackButton":
                ev.preventDefault();
                $(".mob_main_menu .activemenu .back_arrow").focus();
                break;
            case "subBackArrow":
                ev.preventDefault();
                $(".sub_menu_wrap .active_sub_menu .sub_back_arrow").focus();
                break;
            case "firstMenuItem":
                ev.preventDefault();
                var element = el.closest('[role=menuitem]').children('[role=menu]');
                if (ev.keyCode === key.up) element.children('[role=menuitem]:last').find('a').focus();
                if (ev.keyCode === key.down) element.children('[role=menuitem]:first').find('a').focus();
                break;
            case "firstItemMainMenu":
                ev.preventDefault();
                var element = el.closest('[role=menu]').next('.sub_mob_menu').children('[role=menu]:visible');
                if (ev.keyCode === key.up) element.children('[role=menuitem]:last').find('a').focus();
                if (ev.keyCode === key.down) element.children('[role=menuitem]:first').find('a').focus();
                break;
            case "mobSearch":
                ev.preventDefault();
                $(selectors.mobSearch).focus();
                break;
            case "firstSibiling":
                ev.preventDefault();
                el.closest('[role=menu]').children('[role=menuitem]:first').find('a').focus();
                break;
            case "lastSibiling":
                ev.preventDefault();
                el.closest('[role=menu]').children('[role=menuitem]:last').find('a').focus();
                break;
            case "loginTrigger":
                ev.preventDefault();
                $(selectors.gotoSelect).focus();
                break;
            }
        }
        , menuKeyNavTrap = function (event, focused) {
            // check if last focusable item - which is set in toggleMenu function in *Menu component
            var attrVal = focused.attr(attributes.dataNext);
            if (typeof attrVal !== typeof undefined && attrVal !== false && attrVal !== 'none') {
                forceFocus(event, attrVal, focused);
            }
        }
        , dskMenuReset = function () {
            $(selectors.desktopMenu).find('li').removeClass('hover');
            $(selectors.popupMenu).find('li').removeClass('hover');
            $(selectors.popupSubMenu).find('li').removeClass('hover');
            $("#popup-menu .sub-menu a").attr('tabindex', '-1');
            $(selectors.desktopMenu).find('.sub-menu').hide();
        }
        , deskMenuResetHover = function (selector) {
            //selector.closest('[role="menu"]').children('[role=menuitem]').removeClass('hover');
        }
        , closeOnBlur = function () {
            switch (menu) {
            case "mobile":
                att.entbus.menu.resetMenu();
                $(selectors.mainMenuTrigger).focus();
                break;
            case "desktop":
                att.entbus.menu.resetMenu();
                $(selectors.mainMenuTrigger).focus();
                break;
            case "login":
                att.entbus.goto.resetMenu();
                $(selectors.gotoSelect).focus();
                break;
            }
        }
    var bindEvents = function () {
        $(selectors.gotoSelect).bind("keypress", function () {
            var lf = getFocusableItem(selectors.gotoOptions, "lastItem");
            $(lf).attr(attributes.dataNext, 'gotoSelect');
        });
        $(selectors.gotoOptionsItem).bind("keydown", function (e) {
            if (e.keyCode == key.down) {
                menuKeyNavTrap(e, $(':focus'));
            }
            if (e.keyCode == key.up) {
                menuKeyNavTrap(e, $(':focus'));
            }
        });
        //close all menu on press of 'esc' key
        $(document).bind('keyup', function (e) {
            if (e.keyCode === key.esc) {
                closeOnBlur();
            }
        });
        //escape on click of tab key
        $("a").bind('keydown', function (e) {
            var deskMenu = -1
                , mobMenu = -1
                , loginMenu = -1;
            if (e.keyCode === key.tab) {
                deskMenu = $(this).closest('#popup-menu').length;
                mobMenu = $(this).closest('#inner_wrap').length;
                loginMenu = $(this).closest('.goto-options').length;
                if (deskMenu > 0 || mobMenu > 0 || loginMenu > 0) {
                    e.preventDefault();
                    closeOnBlur();
                }
            }
        });
        //skip to content
        $(selectors.skipNav).bind("keyup", function (e) {
            $(window).scrollTop(0);
            e.preventDefault();
            if (e.keyCode === key.space || e.keyCode === key.enter) {
                var skipTo = "#" + this.href.split('#')[1];
                $(skipTo).attr('tabindex', -1).bind('blur focusout', function () {
                    $(this).removeAttr('tabindex');
                }).focus();
            }
        });
        $(selectors.focusableHasPopItem).bind("keydown", function (e) {
            var menuI = $(this).parent('[role=menuitem]');
            var sMenu = $(this).parent('[role=menuitem]').children('[role=menu]');
            if (e.keyCode === key.right) {
                menuI.children('[role=menu]').show();
                sMenu.children('[role=menuitem]').children('a').attr('tabindex', '0');
                (sMenu.find('[tabindex=0]'))[0].focus();
                //keyboard trap - set attribute to keyboard trap
                sMenu.children('[role=menuitem]:first').find('a').attr('data-next', 'lastSibiling');
                sMenu.children('[role=menuitem]:last').find('a').attr('data-next', 'firstSibiling');
            }
            if (e.keyCode === key.left) {
                $(this).parents('[role=menu]').parent('[role=menu]').find('a').attr('tabindex', '-1');
                $(this).parents('[role=menu]').parent('[role=menuitem]').children('a').focus();
                menuI.parent('[role=menu].sub-menu').hide();
            }
            if (e.keyCode === key.up) {
                $(this).parent('[role=menuitem]').prevAll('[role=menuitem]:first').find('a').focus();
            }
            if (e.keyCode === key.down) {
                $(this).parent('[role=menuitem]').nextAll('[role=menuitem]:first').find('a').focus();
            }
        });
        $(selectors.focusableDskMenuItem + "," + selectors.focusableMobMenuItem + "," + selectors.focusableLoginMenuItem).bind("keydown", function (e) {
            var noNextItem = 1
                , noPrevItem = 0;
            if (e.keyCode === key.up) {
                $(this).parent('[role=menuitem]').prevAll('[role=menuitem]:first').find('a').focus();
                noPrevItem = $(this).parent('[role=menuitem]').prevAll('[role=menuitem]:first').length;
                if (noPrevItem == 0) {
                    menuKeyNavTrap(e, $(':focus'));
                }
            }
            if (e.keyCode === key.down) {
                $(this).parent('[role=menuitem]').nextAll('[role=menuitem]:first').find('a').focus();
                noNextItem = $(this).parent('[role=menuitem]').nextAll('[role=menuitem]:first').length;
                if (noNextItem == 0) {
                    menuKeyNavTrap(e, $(':focus'));
                }
            }
        });
        $(selectors.focusableDskMenuItem + "," + selectors.focusableMobMenuItem + "," + selectors.focusableLoginMenuItem).bind("focus", function (e) {
            // deskMenuResetHover($(this));
            // $(this).parent('[role=menuitem]').addClass('hover');
        });
        $(selectors.mobMainBackArrow + "," + selectors.mobSubBackArrow).bind("keydown", function (e) {
            if (e.keyCode === key.up || e.keyCode === key.down) {
                menuKeyNavTrap(e, $(':focus'));
            }
        });
        //open submenu on right arrow press
        $(selectors.focusableMobHasPopItem).bind("keydown", function (e) {
            if (e.keyCode === key.right) {
                var target = $(this).next('span');
                $(target).click();
            }
        });
        //go back to parent menu on press of left arrow key
        $(selectors.focusableMobMenuItem + "," + selectors.mobSubBackArrow + "," + selectors.mobMainBackArrow).bind("keydown", function (e) {
            if (e.keyCode === key.left) {
                var element = $(this)
                    , condition_1 = element.hasClass('back_arrow')
                    , condition_2 = element.hasClass('sub_back_arrow')
                    , condition_3 = element.closest('.active_sub_menu').length
                    , condition_4 = element.closest('.active_sub_menu_items').length;
                if (condition_1 === true || condition_2 === true) {
                    element.click();
                }
                if (condition_3 === 1) {
                    element.closest('[role=menu]').closest('[role=menuitem]').children('.sub_back_arrow').click();
                }
                if (condition_4 === 1 && condition_3 === 0) {
                    element.closest('#inner_wrap').children('.mob_main_menu').find('.activemenu').find('.back_arrow').click();
                }
            }
        });
        //force focus - mob search
        $(selectors.mobSearch).bind("keydown", function (e) {
            if (e.keyCode === key.up) {
                $(selectors.mainMenuTrigger).focus();
            }
            if (e.keyCode === key.down) {
                $(this).parents('#side_wrapper').find('.mob_main_menu').children('[role=menuitem]:first').find('a').focus();
            }
        });
        //force focus - main menu trigger
        $(selectors.mainMenuTrigger).bind("keydown", function (e) {
            if (e.keyCode === key.down) {
                if (menu === "mobile") {
                    $(selectors.mobSearch).focus();
                }
                else if (menu === "desktop") {
                    var fs = getFocusableItem(selectors.deskTopMenu, "firstItem");
                    $(fs).focus();
                }
            }
            if (e.keyCode === key.up) {
                if (menu === "mobile") {
                    $(selectors.mobMenu).find('.mob_main_menu').children('[role=menuitem]:last').find('a').focus();
                }
                else if (menu === "desktop") {
                    $(selectors.deskTopMenu).children('[role=menuitem]:last:visible').find('a').focus();
                }
            }
        });
        //force focus  - login trigger
        $(selectors.gotoSelect).bind("keydown", function (e) {
            if (e.keyCode === key.down) {
                var fs = getFocusableItem(selectors.gotoOptions, "firstItem");
                $(fs).focus();
            }
            if (e.keyCode === key.up) {
                $(selectors.gotoOptions).children('[role=menuitem]:last').find('a').focus();
            }
        });
    };
    $(function () {
        bindEvents();
        dskMenuReset();
    });
    module = {
        getFocusableItem: getFocusableItem
        , activeMenu: activeMenu
        , setLastItemAttribute: setLastItemAttribute
        , removeLastItemAttribute: removeLastItemAttribute
        , deskMenuResetHover: deskMenuResetHover
        , dskMenuReset: dskMenuReset
        , updatePressedattr: updatePressedattr
    };
    
    Namespacer('att.entbus.keyboardAccess', module);
    
})(jQuery.noConflict(), window, document);

;(function ($, window, document, undefined) {
    var module
        , isOpen = false
        , selector = {
            mask: '.primary-menu-mask'
            , primaryMenu: '#header .explore-unit.active'
            , shopMenu: '#header .shop-unit.active'
            , supportMenu: '#header .support-unit.active'
            , loginMenu: '#header .goto-container.active'
            , sideWrapper: '#side_wrapper'
    };
    var bindEvents = function () {
        $(selector.mask).bind('click',function(){
            resetMenus();
        });
        }
        , resetMenus = function () {
        att.entbus.goto.resetMenu();
        att.entbus.menu.resetMenu();
        }
        , isAnyModalOpen = function () {
        // Assumes all the modal windows are configured through html with data-target
        var isAnyBootstrapModalOpen = function () {

            var modalIds = '', 
                isOpenBootstrap = false,
                modalLength = $('[data-target]').length;

            // Gather all modal window container ids in the page
            $('[data-target]').each(function(index) {
                modalIds += $(this).data('target') + ((index !== modalLength-1) ? ', ' : '');
            });

            $(modalIds).each(function () {
                var $modal = $(this).data('bs.modal');
                if($modal && $modal.isShown) {
                    isOpenBootstrap = true;
                    return false;  // breaks the loop
                }
            });

            return isOpenBootstrap;

        };

        isOpen = false;

        if($(selector.loginMenu).length) isOpen = true;
        if($(selector.primaryMenu).length) isOpen = true;
            if ($(selector.shopMenu).length) isOpen = true;
            if ($(selector.supportMenu).length) isOpen = true;
        if(isAnyBootstrapModalOpen()) isOpen = true;

        return isOpen;
    },

    clearMask = function () {
        if(!isAnyModalOpen()) {
            $(selector.mask).hide();
                $jq10('.header-wrapper').find('button[aria-haspopup]').addClass("bluet-btm-brd").removeClass("blue-btm-brd");
                $(selector.sideWrapper).css({
                    'overflow-y': 'auto'
                });
            $('html, body').removeClass('modal-open');
			//keyboard navigation
                $('.primary-menu .explore-unit').attr('aria-pressed', 'false');
                //$('#popup-menu').find('li').attr('aria-pressed','false');				
        }
    },

    mask = function () {
        $(selector.mask).show();
        $('html, body').addClass('modal-open');
            $(selector.sideWrapper).css({
                'overflow-y': 'scroll'
            });
        }
        , maskLogin = function () {
        mask();
    };

    module = {
        mask: mask,
        clearMask: clearMask
    };

    $(function () {
        bindEvents();
    });

    // att.entbus.menu.handleMask('MENU_LOGIN');
    $.extend(module, Namespacer('att.entbus.menu'));
    Namespacer('att.entbus.menu', module);

})(jQuery.noConflict(), window, document);
/*javascript*/


     /**
 * component functionality
 * @param  {[type]} $         jQuery object
 * @param  {[type]} window    Restoring original window object
 * @param  {[type]} document  Restoring original document object
 * @param  {[type]} undefined Restoring original undefined type
 * @requires jQuery javascript library
 * @requires Swiper javascript library
*/

;(function ($, window, document, undefined) {
    $(document).ready(function() {    
        var selector = {
            subMenuContent :'.main-header-wrapper .navigation-content',
            accordionMode : false,      
            mobileHamburgerButtomClicked: false
        }
        var state = {
            mainMenuLevelActive:false,
        }
   
    /**
     * add and remove Clasess
     *
     * @author Business AT&T
     */  
    function addAndRemoveMultiplesClasses(context, $el, classToAdd, classToRemove){
        $(context).each(function(item){    
         $el.addClass(classToAdd).removeClass(classToRemove);                
        });
    }
    /**
     * remove all Clasess previoully added
     *
     * @author Business AT&T
     */  
        function removeClass(context, clasessToRemove){
        $(context).removeClass(clasessToRemove);
    }
    /**
     * remove all Clasess previoully added
     *
     * @author Business AT&T
     */  
    function removeMultiplesClasess(parentNode, clasessToRemove){
        $(parentNode).each(function(){
            $(this).removeClass(clasessToRemove);
        });
    }
    function setDinamicallyMainManuHight(){
        let heightMainMenuPorcentage = 12;
        window.matchMedia("(max-width: 1200px)").matches? heightMainMenuPorcentage:heightMainMenuPorcentage = 30;
        $('.subMenu-container').css('height', 'auto');
            if($('.subMenu-container').height() + 100 >  $(window).height()){
                $('.subMenu-container').css('height', ($(window).height() - ($(window).height()*heightMainMenuPorcentage) / 100 ));
            }        
    }

    /** 
     * reset all state
     *
     * @author Business AT&T
     */  
    function resetMobileMenu(){
        removeMultiplesClasess('.navigation-content__section-comp','disabled-section');
        removeMultiplesClasess('.navigation-content__section-comp','active-section section-with-categories-open');
        removeMultiplesClasess('.navigation-content__section-comp .dropdown-submenu-section','section-clicked category-opened');        
        removeMultiplesClasess('.navigation-content__categories-comp','active-category disabled-category');
        removeMultiplesClasess('.navigation-content__categories-comp .dropdown-submenu-categories' ,'category-clicked');
    }
    /**
     * Set active or inactive class based on the menu level
     *
     * @param $el anchor link clicked by the user
     * @param context parent container
     * @param activeClass active class Label
     * @param InactiveClass Inactiva Class label
     * @author Business AT&T
     */  
     function setActiveOrDisabledClass($el, context, activeClass, InactiveClass){
        $(context).removeClass(activeClass +  InactiveClass).addClass(InactiveClass);
        $el.closest(context).removeClass(InactiveClass).addClass(activeClass);
    }
        /**
     * Hide Main Menu Content mobile previoully selected
     *
     * @param $el anchor link clicked by the user
     * @author Business AT&T
     */  
    function setMainMenuActive($el){                
            $('.main-navigation li a').removeClass('active');
            if(!state.mainMenuLevelActive) {      
                setActiveOrDisabledClass($el,'.navigation-content','active','disabled');            
                state.mainMenuLevelActive = true;
                $el.text($el.attr('data-default'));
            }else {
                if($el.hasClass('show-section-view')){
                    $('.navigation-content.active .navigation-content__section-comp').removeClass('active-section disabled-section');
                    $el.text($el.attr('data-default'));
                    $el.attr('data-name',$el.attr('data-label'));
                    $el.removeClass('show-section-view');
                    $('.navigation-content.active h2').removeClass('show-section-view');
                }else {
                    removeClass(selector.subMenuContent,'active disabled');
                    $el.text($el.attr('data-label'));
                    $el.attr('data-name',$el.attr('data-default'));
                    $el.attr('data-locationName','SubNav - ' + $el.attr('data-default'));
                    state.mainMenuLevelActive = false;
                }                            
                $('.navigation-content__section-comp').removeClass('section-with-categories-open');
            }  
           
            $('.main-navigation li [data-content='+ $('.navigation-content.active').attr('id') +']').addClass('active');
    }
        /**
     * Hide / show sections
     *
     * @param $el anchor link clicked by the user
     * @author Business AT&T
     */  
         function setSectionMenuActive($el){
 
            $('.navigation-content.active h2 a, .navigation-content.active h2').addClass('show-section-view');            
             if(!$el.hasClass('section-clicked')){
                $('.active h2 a').text($('.active h2 a').attr('data-label'));
                setActiveOrDisabledClass($el,'.navigation-content__section-comp','active-section', 'disabled-section');
                $el.addClass('section-clicked');
            }else if($el.hasClass('category-opened')){
                removeClass('.navigation-content__section-comp','active-section disabled-section');
                removeClass('.active h2','disabled')
                $('.active h2 a').text($('.active h2 a').attr('data-default'));
                removeMultiplesClasess('.navigation-content__categories-comp','active-category disabled-category');
                removeMultiplesClasess('.navigation-content__section-comp h3 a','section-clicked category-opened');                        
                removeMultiplesClasess('.navigation-content__section-comp','section-with-categories-open');              
                removeMultiplesClasess('.navigation-content__categories-comp h4 a','category-clicked');
                $('.main-menu-item.show-section-view').removeClass('show-section-view');
                $('.navigation-content.active h2').removeClass('show-section-view');
                
            }
        }
            /**
     * Hide / show categories section
     *
     * @param $el anchor link clicked by the user
     * @author Business AT&T
     */  
     function setCategoriesMenuActive($el) {
        if(!$el.hasClass('category-clicked')){
           $('.active h2').addClass('disabled');
           $('.active h2').text($('.active h2').attr('data-default'));
           $('.active-section').addClass('section-with-categories-open');
          setActiveOrDisabledClass($el,'.navigation-content__categories-comp', 'active-category', 'disabled-category');
          $el.addClass('category-clicked');
          $('.active-section h3 a').addClass('category-opened');
        }  
   }
      /**
     * classes are updated  between 1024 and 1200 pixels  to adjust the layout based on the UI provided
     * Bootstrap classes are overwriten to adjust layout structure
     * @author Business AT&T
     */  
       function updateLayoutMin1024Max1200() {
        if(window.matchMedia("(min-width: 1024px)").matches && window.matchMedia("(max-width: 1199px)").matches){
            $('.submenu-wrapper .navigation-content').addClass('overWriteBoostrapClasses');
        }else {
            removeClass('.submenu-wrapper .navigation-content','overWriteBoostrapClasses')
        }
    }
        /**
    * classes are updated max width 1023 pixels to adjust the layout based on the UI provided
     * Bootstrap classes are overwriten to adjust layout structure
     *
     * @author Business AT&T
     */  
         function updateLayoutMax1023(){
            window.matchMedia("(max-width: 1023px)").matches ?  $('.main-header-wrapper').attr('id','overWriteBoostrapClasses') : $('.main-header-wrapper').attr('id','');
        }
          /**
     * update class for desktop View to adjust the layout based on the UI provided
     * we remove the container-fuild class and we add the container class just to
     * center the layout on large screen based on the UI provided
     *
     * @author Business AT&T
     */ 
    function updateLayoutClasessMin1201(){
        if(window.matchMedia("(min-width: 1024px)").matches) {
            if(selector.mobileHamburgerButtomClicked){
                $('.navigation-content').each(function(){
                    if(!$(this).hasClass('active')){
                        hideModalOverlay();
                    }
                });
            }
        }
        if(window.matchMedia("(max-width: 1199px)").matches) {  
            if(!selector.mobileHamburgerButtomClicked){
                //$('.dropdown.login-dropdown a').click();  
                hideModalOverlay();      
            }
            
        }

        if(window.matchMedia("(min-width: 1200px)").matches) {
            /*$(".navigation-content__section-comp a[href$='#']").removeClass('att-track'); disable the click action on the title seciton on desktop version */
            addAndRemoveMultiplesClasses('.global-nav-view-content',$(this), 'container', 'container-fluid');
            $('.main-header-wrapper .container-fluid').addClass('container').removeClass('container-fluid');
             
            // if($('.subMenu-container').attr('data-mobile-opened')){
            //     $('.subMenu-container').hide().removeAttr('data-mobile-opened');
            // }
        }else {
            addAndRemoveMultiplesClasses('.global-nav-view-content', $(this), 'container-fluid', 'container');            
            $('.main-header-wrapper .container').addClass('container-fluid').removeClass('container');                        
        }          
    }

        /**
     * function that contains all the methods that allow to update
     * the classes required to adjust UI layout
     *
     * @author Business AT&T
     */  
         function showHideOverlayGlabalNavigation($el=$('.navigation-content')){
             if($el.hasClass('main-menu-item')) return false;
                if($el.hasClass('active')){
                    $('.modal-global-navigation').show();
                }else {
                    $('.modal-global-navigation').hide();
                }
                $el.hasClass('active')?$('body').addClass('global-nav-open'):$('body').removeClass('global-nav-open');
                if(window.matchMedia("(max-width: 1199px)").matches) {
                    $('.modal-global-navigation').css({'top': $('.main-header-wrapper').height() + 35});
  
                 }
        }
       
          /**
     * function that contains all the methods that allow to update
     * the classes required to adjust UI layout
     *
     * @author Business AT&T
     */  
     function hideModalOverlay(){
        $('.navigation-content').removeClass('active');
        $('.main-navigation li').removeClass('active-main-menu');
        $('.main-navigation li a').removeClass('active');
        $('.modal-global-navigation').hide();
        $('.subMenu-container').hide();
        $('body').removeClass('global-nav-open');
        $('.navigation-content').removeClass('active disabled');
        resetMobileMenu();
        $('.main-menu-item.show-section-view').removeClass('show-section-view');
        $('.navigation-content.active h2').removeClass('show-section-view');
        $('h2 a').each(function(){
            $(this).text($(this).attr('data-label'));
            $(this).closest('h2').removeClass('disabled');
        });        
        $('.mobile-global-nav').children().removeClass('close-menu glyphicon-remove').addClass('glyphicon-menu-hamburger');
        state.mainMenuLevelActive = false;
    }
        /**
     * function that contains all the methods that allow to update
     * the classes required to adjust UI layout
     *
     * @author Business AT&T
     */  
         function updateLayoutClasess(){
            updateLayoutMax1023();
            updateLayoutMin1024Max1200        
            updateLayoutClasessMin1201();
            window.matchMedia("(min-width: 1023px)").matches? selector.accordionMode = true : selector.accordionMode = false;        
        }
        updateLayoutClasess();    
    /**
     *
     * BindEvents Function Component
     *
     * @param    object  $object The object to convert
     * @return      array
     *
     */        
    $('.main-menu-item').on("click",function(e) {
        if($(this).attr('href') == "#"){              
            e.preventDefault();
            resetMobileMenu();
            setMainMenuActive($(this));
            // showHideOverlayGlabalNavigation();      
            setDinamicallyMainManuHight();      
        }
    });

    $('.main-navigation li a').on("click",function(e) {
        //subMenu-container
        selector.mobileHamburgerButtomClicked = false;
        if($(this).attr("href")=="#"){
            e.preventDefault();
        var $activeContent = $('#' + $(this).attr('data-content'));      
        if(!$(this).hasClass('active')) {                        
            $('.main-navigation li a').removeClass('active');
            $('.main-navigation li').removeClass('active-main-menu');
            $('.navigation-content').removeClass('active disabled');
            $(this).addClass('active');            
            $(this).parent().addClass('active-main-menu');
            $(this).attr('aria-expanded', 'true');
            $('.navigation-content').not($activeContent).addClass('disabled');
            $activeContent.addClass('active');
              $('.subMenu-container').show();
            // Check if Tab key is pressed while subMenu is active
            $(document).one("keydown", function (e) {
                if (e.keyCode === 9) {
                    var dropdownDiv = document.querySelector(".dropdown-submenu-categories");
                    dropdownDiv.focus();
                }
            });

        }else {
            $('.navigation-content').removeClass('active disabled');
            $(this).removeClass('active');
            $(this).parent().removeClass('active-main-menu');
            $(this).attr('aria-expanded', 'false');
             $('.subMenu-container').hide();
        }        
        setDinamicallyMainManuHight();              
        showHideOverlayGlabalNavigation($(this));
    }
    });

    // Tab into visible subNav
    $('[id^="nav-"]').on("click",function(e) {
        $(document).one("keydown",function (e) {
            if (e.keyCode === 9) {
                var subMenuFirstTab = $('.subMenu-container .navigation-content.container.active h4 > a:first');
                $(subMenuFirstTab).focus();
            }
        });
    });

    // Close subMenu when last link is tabbed and set focus to next main nav link
    $('.subMenu-container .navigation-content.container:first-child a:last, .subMenu-container .navigation-content.container:nth-child(2) a:last, .subMenu-container .navigation-content.container:nth-child(2) h4 a:last, .subMenu-container .navigation-content.container:nth-child(3) a:last').one("keydown", function (e) {      
        if (e.keyCode === 9) {
            var activeSubMenu = $('.active-main-menu > a').attr('id');
            var activeMainMenuId = ("#" + activeSubMenu);
            hideModalOverlay();
            $(activeMainMenuId).focus();
            if (activeMainMenuId == '#nav-Industries & Solutions') {
                $('[data-content="subContent-1"]').focus();
            }
        }
    });

    $('.subMenu-container h3 > a[href="#"]').attr('tabindex', '-1');
    $('.subMenu-container h4 > a[href="#"]').attr('tabindex', '-1');

    $('.dropdown-submenu-section').on("click",function(e) {  
        
        if(!selector.accordionMode){
            if($(this).attr('href') == "#"){
                e.preventDefault();
                // resetMobileMenu();
                setSectionMenuActive($(this));
                setDinamicallyMainManuHight();  
            }
        }
        
        /*if(window.matchMedia("(min-width: 1200px)").matches) {
            if($(this).attr('href') == "#"){
                e.preventDefault(); 
            }
        } */   
    })

    $('.dropdown-submenu-categories').on("click",function(e) {
        if(!selector.accordionMode) {                            
            if(!$(this).hasClass('category-clicked') && typeof($(this).parent().siblings()[0]) !== 'undefined') {
                e.preventDefault();
                setCategoriesMenuActive($(this));    
            }else {
                if($(this).attr('href') !== "#"){        
                    e.stopPropagation();
                    hideModalOverlay();
                }else {
                    e.preventDefault();  
                }
            }
            setDinamicallyMainManuHight();  
        }
        if(window.matchMedia("(min-width: 1200px)").matches) {
            if($(this).attr('href') == "#"){
                e.preventDefault();
            }
        }        
    });
   
    $(document).keyup(function(e) {
        if (e.key === "Escape" || e.key === 27) {  
            hideModalOverlay()
       }
   });

    $('.dropdown.login-dropdown').on('show.bs.dropdown', function () {
        $('.login-item').addClass('active');
        $('.modal-global-navigation').show();        
        $('.navigation-content').removeClass('active','disabled');
        $('.main-navigation li a').removeClass('active');
        $('.main-navigation li a').parent().removeClass('active-main-menu');
    });
    $('a.login-item').on('click', function () {
        if($(this).hasClass('active')){
            hideModalOverlay();
        };
    });   
    $('.dropdown.login-dropdown').on('hide.bs.dropdown', function () {       
        // $('.navigation-content').removeClass('active','disabled');
        // $('.main-navigation li a').removeClass('active');
        //hideModalOverlay();                      
    });
   
    $(document).on("focus",'#qm-cludo', function(){
        $('.subMenu-container').addClass('show-only-seachSection');
    })
    $(document).on("blur",'#qm-cludo', function(){
        $('.subMenu-container').removeClass('show-only-seachSection');
    });

   $('.modal-global-navigation,#q-cludo').on("click",function(){
        hideModalOverlay();
   });

   $('.account-login-dropdown').on("click",function(){
        hideModalOverlay();
   });
   $('.mobile-global-nav').on("click",function(){
       var $thisElm = $('.subMenu-container');
       selector.mobileHamburgerButtomClicked = true;
       $(this).addClass('active');  
       $(this).children().removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove');
    //    glyphicon hamburger-menu glyphicon-menu-hamburger
    //    glyphicon close-menu glyphicon-remove    
       if($thisElm.css("display") == "none"){
            $thisElm.show().attr('data-mobile-opened',true);
            showHideOverlayGlabalNavigation($(this));
       }else {
        $thisElm.hide().attr('data-mobile-opened','');              
        resetMobileMenu();
        state.mainMenuLevelActive = false;
        hideModalOverlay();
        $(this).children().removeClass('glyphicon-remove').addClass('glyphicon-menu-hamburger');
       }
       setDinamicallyMainManuHight();  
    });            
       /**
     * Event resize listener to update layout based on the width screen
     * @author Business AT&T
     */  
        $(window).resize( function(){  
            updateLayoutClasess();  
        });        
        
        $('.global-nav-view-content a').each(function(){
            if ($(this).attr('data-url') !== '#') {
                if($(this).data('url')) {
                    $(this).attr('data-url', $(this).attr('data-url').split('/content/attbusiness/en')[1]);
                }                                        
            }                         
        })

        $('.segment-links li a').each(function(e,item){
            
            if ($(this).attr('href') !== '#') { 
                if($(this).attr('href').includes('/content/attbusiness/en/')){                    
                    $(this).attr('href',$(this).attr('href').split('/content/attbusiness/en/')[1]?$(this).attr('href').split('/content/attbusiness/en/')[1]:'/');
                }else if($(this).attr('href').includes('/content/attbusiness/en.html')){
                    $(this).attr('href','/');
                }                
                $(this).attr('data-url',$(this).attr('href').split('/content/attbusiness/en/')[1]?$(this).attr('href').split('/content/attbusiness/en/')[1]:$(this).attr('href'));
            } 
        });
        
        $('.global-nav-view-content a').each(function(){
            $(this).attr('data-locationName','SubNav - '+$(this).text().replace(/^\s+|\s+$/gm,''));
            if ($(this).attr('href') !== '#' && $(this).attr('href').includes('/content/attbusiness/en/')) {                
                $(this).attr('href','/'+$(this).attr('href').split('/content/attbusiness/en/')[1]);
            }
        }); 
    });
})(jQuery.noConflict(), window, document);
 
;(function($, window, document, undefined) {
    $(function () {
        $('#footer-year').text(' '+new Date().getFullYear());        
    });
})(jQuery.noConflict(), window, document);
/**
 * To be placed in cookie-disclaimer component
 * https://wiki.web.att.com/display/DETS/Asynchronous+Load+Notification
 * Adding EU cookie policy feature
 */
;(function ($, window, document, undefined) {
    
    var isCookieSet,
        isEU = false,
        isNonEUcustomer,
        isGDPRAccepted = false,
        pageLoadEventFired = false,
        cookieChecked = $.Deferred(),
        dtmLoaded = $.Deferred(),
        selectors = {
            cdContainer   : '.cookie-disclaimer-component',
            cdAcceptButton: '.cookie-disclaimer-component .cd-accept-button',
            cdRejectButton: '.cookie-disclaimer-component .cd-reject-button'
        },
        config = {
            gdprCookieName: 'isGdprAccepted',
            akamaiHeaderName: 'Country',
            urls: {
                locationURL: window.location.pathname,
                tracking: '/attincludes/tracking.js',
                dtmHeader: {
                    launchscript : $("script[id='launchscript']").attr('src')
                }
            }
        },

        euAJAXoptions = {
            url: config.urls.locationURL,
            success: function (data, textStatus, jqXHR) {
                // Country value will be null for non European countries from Akamai
                if(jqXHR.getResponseHeader(config.akamaiHeaderName) !== null) {
                    isEU = true;
                };
                // TODO: remove this hardcoded value which is used to simulate EU customer 
                //isEU = true; 
            }
        },

        getDtmUrls = function () {
        
            var env = $('meta[name="appenv"]').attr('content'),
                headerUrl,
                footerUrl;
            headerUrl = config.urls.dtmHeader.launchscript;
            footerUrl = "";            
            /*
            switch (env) {
                case 'dev':
                    headerUrl = config.urls.dtmHeader.dev;
                    footerUrl = config.urls.dtmFooter.dev;
                    break;
                case 'qa':
                    headerUrl = config.urls.dtmHeader.qa;
                    footerUrl = config.urls.dtmFooter.qa;
                    break;
                case 'uat':
                    headerUrl = config.urls.dtmHeader.uat;
                    footerUrl = config.urls.dtmFooter.uat;
                    break;
                case 'preview':
                    headerUrl = config.urls.dtmHeader.preview;
                    footerUrl = config.urls.dtmFooter.preview;
                    break;
                case 'prod':
                    headerUrl = config.urls.dtmHeader.prod;
                    footerUrl = config.urls.dtmFooter.prod;
                    break;
            }
            */
            return {
                dtmHeaderUrl: headerUrl,
                dtmFooterUrl: footerUrl
            }
            
        },

        getScript = function (url) {
            return $.ajax({
                async: true,
                url: url,
                dataType: "script"
            });
        },

        showCookieBanner = function () {
            $(selectors.cdContainer).show();
        },
        
        hideCookieBanner = function () {
            $(selectors.cdContainer).hide();
        },
        
        handleAccept = function () {
            hideCookieBanner();
            isGDPRAccepted = true;
            setGdprCookie(config.gdprCookieName, 'true');
            loadTrackingScripts();
        },

        handleReject = function () {
            hideCookieBanner();
            isGDPRAccepted = false;
            setGdprCookie(config.gdprCookieName, 'false');
        },        
        
        setGdprCookie = function (cookieName, cookieValue) {
            $.cookie(cookieName, cookieValue, { path: '/', expires: 180, secure: true });
        },
        
        getGdprCookie = function (cookieName) {
            return $.cookie(cookieName);
        },
        
        loadTrackingScripts = function () {
            var dtmUrls = getDtmUrls();
            // TODO: Use promise pattern efficiently
            getScript(config.urls.tracking)
                .done(function () {
                    // initialise cludo here
                    document.dispatchEvent(new CustomEvent('loadDetmNow', null));
                    att.isTrackingLoaded.resolve();
                });
        },
        
        firePageLoadEvent = function () { 
            if(typeof att.adobeDataLayerManager?.isSpecialPageToHoldPushEventPageView() !== 'undefined' && att.adobeDataLayerManager.isSpecialPageToHoldPushEventPageView()){
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.pushDataPageView);
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingUserCustomTypeData.userLaunchObjects());
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.pushEventPageView);
                // workaround in meantime the 404 page is fix it , currently the 404 error page load 
                // everytime when any page load, the 404 page load before the requested page
                if(att.pageProperties.url == '/page-not-found.html'){
                    att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError({
                        errorType:'Page not found',
                        statusCode:'404'
                    }));
                }                
            }
        },
        
        handleCookieDisclaimer = function () {
            // client from EU and cookie not set  
            if(isEU && !isCookieSet) {
                showCookieBanner();
            } 
            // client from EU and accepted cookie policy 
            else if (isEU && getGdprCookie(config.gdprCookieName) === 'true') {
                isGDPRAccepted = true;
            } 
            // client from EU and declined cookie policy
            else if (isEU && getGdprCookie(config.gdprCookieName) === 'false') {
                // do nothing
            } 
            // client from non EU (in this case, ignore cookie value even if it exists)
            else if (!isEU) {
                isNonEUcustomer = true;
            }
            cookieChecked.resolve();
        },
        
        checkDTMLoaded = function () {
            // Disable default page load event
            //ddo.disableAutoPageLoad();
            dtmLoaded.resolve();
            firePageLoadEvent();
        },
        
        handleGdprComplaince = function () {
            if (isGDPRAccepted || isNonEUcustomer) {
                loadTrackingScripts();
            } else {
                att.isTrackingLoaded.resolve();
            }
        },
        
        init = function () {
            isCookieSet = getGdprCookie(config.gdprCookieName) === null ? false : true;
            if(isCookieSet) {
                // if cookie present, assume client is from EU, !! to convert to boolean data type
                isEU = !!getGdprCookie(config.gdprCookieName);
                handleCookieDisclaimer();
            } else {
                // Get user Country header from Akamai server
                $.when($.ajax(euAJAXoptions)).done(handleCookieDisclaimer);
            }                        
        },
        
        bindEvents = function () {
            $(selectors.cdAcceptButton).bind('click', handleAccept);
            $(selectors.cdRejectButton).bind('click', handleReject);
            $(window).bind('load', checkDTMLoaded);
            $.when(cookieChecked).done(handleGdprComplaince);
            $(window).on('scroll', att.adobeDataLayer.handleScrollTracking);
        };
    
    $(function () {
        init();
        bindEvents();
    });
    
})(jQuery.noConflict(), window, document);
