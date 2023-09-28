(function (drupalSettings, $, document ) {
  'use strict';

  if (drupalSettings.schwab_branch_locator) {
    var base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // (geohash-specific) Base32 map

    var Geohash = {
      /**
       * Encodes latitude/longitude to geohash to a precision of 6 characters.
       *
       * @param   {number} lat - Latitude in degrees.
       * @param   {number} lon - Longitude in degrees.
       * @returns {string} Geohash of supplied latitude/longitude.
       * @throws  Invalid geohash.
       *
       * @example
       *     const geohash = Geohash.encode(52.205, 0.119); // => 'u120fx'
       */

      encode : function(lat, lon) {
        lat = Number(lat);
        lon = Number(lon);
        var precision = 6;

        if (isNaN(lat) || isNaN(lon)) throw new Error('Invalid geohash');

        var idx = 0; // index into base32 map
        var bit = 0; // each char holds 5 bits
        var evenBit = true;
        var geohash = '';

        var latMin =  -90, latMax =  90;
        var lonMin = -180, lonMax = 180;

        while (geohash.length < precision) {
          if (evenBit) {
            // bisect E-W longitude
            var lonMid = (lonMin + lonMax) / 2;
            if (lon >= lonMid) {
              idx = idx*2 + 1;
              lonMin = lonMid;
            } else {
              idx = idx*2;
              lonMax = lonMid;
            }
          } else {
            // bisect N-S latitude
            var latMid = (latMin + latMax) / 2;
            if (lat >= latMid) {
              idx = idx*2 + 1;
              latMin = latMid;
            } else {
              idx = idx*2;
              latMax = latMid;
            }
          }
          evenBit = !evenBit;

          if (++bit == 5) {
            // 5 bits gives us a character: append it and start over
            geohash += base32.charAt(idx);
            bit = 0;
            idx = 0;
          }
        }

        return geohash;
      }
    };

    var BranchLocator = {

      /**
       * Updates the Branch Locator block with the closest branch name.
       *
       * @param {string} branchName The name of the closest Schwab branch.
       * @param {string} branchId The branch ID of the closest Schwab branch.
       */
      setBranchName : function(branchName, branchId) {
        var branchElement = document.getElementById('branch_locator--branch-name');

        branchElement.innerText = branchName;
        branchElement.href = drupalSettings.schwab_branch_locator.branchDetailsLink + '?branchid=' + branchId;
        document.getElementById('schwab_branch_locator').classList.add('schwab_near_branch');
      },

      /**
       * Calls a Schwab API and retrieves the branch name from the current longitute and latitude.
       *
       * @param {string} lat The client's current latitude position.
       * @param {string} long The client's current longitude position.
       * @param {string} apiURL The API URL to get the closest Schwab Branch.
       */
      updateBranchName : function(lat, long, apiURL) {
        var thisBranchLocator = this;
        var geohash = Geohash.encode(Number(lat), Number(long));

        $.ajax({
          url: apiURL + '/' + geohash,
          dataType: 'json',
          headers: { 'latitude': lat, 'longitude': long },
          type: 'GET',
          timeout: 5000,
          success: function(data) {
            if (data.name) {
              thisBranchLocator.setBranchName(data.name, data.branchId);
            }
          },
          error: function(e, data) {
            // For now we are doing nothing if this fails.  The branch name will remain blank.
          }
        });
      },

      /**
       * Gets the API URLs from the drupal settings in order to update the branch name in the DOM.
       */
      init : function () {
        var branchNameAPI = drupalSettings.schwab_branch_locator.branchNameAPI;
        var thisBranchLocator = this;

        setTimeout(function(){
          if ((typeof visitor_location !== 'undefined') && (visitor_location.country_code === "US") && visitor_location.long && visitor_location.lat) {
            thisBranchLocator.updateBranchName(visitor_location.lat, visitor_location.long, branchNameAPI);
          }
        }, 2000);
      }
    };

    BranchLocator.init();
  }

})(drupalSettings, jQuery, document);
;
"use strict";!function($){var netHostUrl=window.netHostUrl?window.netHostUrl:"https://client.schwab.com",handlerUrl=netHostUrl+"/api/search/suggestions",cssUrl=netHostUrl+"/public/search/css/jquery.ui.autocomplete.css";function fnSubmitSearchValue(e){var t=window.event?event:e,n=t.charCode?t.charCode:t.keyCode,i=netHostUrl+"/public/search/#/home?s=MC&q=",s=escapeSearchValue();return(13==t||13==n)&&(location.href=i+s,!1)}function escapeSearchValue(){var e,textValueMeganav=$(".meganv-main__utilinks--wide .mega-search-input").val(),textValueMobile=$(".meganv-search--narrow .mega-search-input").val();if(void 0!==(e=""!=textValueMeganav&&null!=textValueMeganav?textValueMeganav:textValueMobile))var n=e.replace(/\#|\<|\>|\\|/g,"");return encodeURIComponent(n)}function getSearchUrl(){var e=escapeSearchValue();return location.href=netHostUrl+"/public/search/#/home?s=MC&q="+e,!1}function searchSuggetionHandler(){var e,textElement=$("#txtGlbSearch,#txtGlbSearchMN,.mega-search-input");textElement.on("keyup keydown",function(){""==$(this).val().trim()&&$(this).val(""),""==$(this).val().trim()&&($(this).val(""),textElement.attr("oldValue",""))});textElement.autocomplete({source:function(t,u){e&&(clearTimeout(e),e=null),e=setTimeout(function(){var searchQuery=textElement.val();if(searchQuery=searchQuery.replace(/\s+/g," ").trim(),textElement.attr("oldValue").toLowerCase().trim()!==searchQuery.toLowerCase().trim()){t.term=searchQuery,textElement.attr("oldValue",searchQuery);var guid=(S4()+S4()+"-"+S4()+"-4"+S4().substr(0,3)+"-"+S4()+"-"+S4()+S4()+S4()).toLowerCase();$.ajax({headers:{"Schwab-Client-Correlid":guid},type:"GET",data:{query:t.term},url:handlerUrl,contentType:"application/json",dataType:"json",timeout:5e3,success:function(rs){!function(t,u,res){var totalResults=0;window.enteredQuery=t.term,""!=res&&"NoResults"!=res&&u($.map(JSON.parse(res).data.results,function(value,index){var textToWrapInBold=t.term.replace(/\s+/g," ").trim(),textToWrapAllPositions=new RegExp(textToWrapInBold,"ig"),itemName=value.replace(textToWrapAllPositions,"<b>".concat(textToWrapInBold.toLowerCase(),"</b>")),itemValue=itemName.split("<b>").join("").split("</b>").join("").split("<B>").join("").split("</B>").join("");return totalResults=index+1,{label:itemName,value:itemValue,moreDetailsUrl:netHostUrl+"/public/search/#/home?q="+value+"&t="+window.enteredQuery+"&s=MC&pos="+ ++index,position:index+1}})),$("#totalSearchResults_id").remove(),$(".ui-helper-hidden-accessible").remove();var totalSearchResults=document.createElement("span");totalSearchResults.id="totalSearchResults_id",totalSearchResults.setAttribute("class","sdps-sr-only");var resultsCount="No results available";totalResults>0&&(resultsCount=totalResults+" search results found for keyword "+window.enteredQuery),totalSearchResults.setAttribute("aria-live","assertive"),totalSearchResults.setAttribute("aria-label",resultsCount),totalSearchResults.setAttribute("role","alert"),document.body.appendChild(totalSearchResults)}(t,u,rs)},error:function(rs){u([])}})}else u([]);function S4(){return(65536*(1+Math.random())|0).toString(16).substring(1)}},200)},select:function(event,ui){ui&&ui.item&&ui.item.moreDetailsUrl&&(window.hasAutoCompleteSelectHappened=!0,setTimeout(function(){$("#txtGlbSearchMN").val(""),window.hasAutoCompleteSelectHappened=!1},200))}}).autocomplete("instance")._renderItem=function(ul,item){return $("<li></li>").data("item.autocomplete",item).append('<a href="'.concat(item.moreDetailsUrl,'">').concat(item.label,"</a>")).appendTo(ul)}}var counter=0,timer=function timer(){window.jQuery&&window.jQuery.ui?searchSuggetionHandler():(counter<=30&&window.setTimeout(timer,100),counter+=1)};$(document).ready(function(){void 0!==jQuery.curCSS&&"function"==typeof jQuery.curCSS||($.curCSS=function(element,attrib,val){$(element).css(attrib,val)}),0==$("link[href='"+cssUrl+"']").length&&(document.createStyleSheet?document.createStyleSheet(cssUrl):$("head").append($('<link type="text/css" rel="stylesheet" href="'+cssUrl+'"/>'))),void 0===jQuery.ui||void 0!==jQuery.ui&&void 0===jQuery.ui.autocomplete?$.ajax({type:"GET",url:"https://client.schwabcdn.com/scripts/jquery-ui.min.js",dataType:"script",cache:"true",async:!1,success:function(){timer()}}):timer(),$("#txtGlbSearchMN").attr("oldValue",""),$(".mega-search-input").on("keyup",fnSubmitSearchValue),$(".mega-search-button").on("click",getSearchUrl)})}(jQuery);;
"use strict";var meganvConfig={"schwab.com":{utilityButtons:{contactUs:{lg:"https://www.schwab.com/public/schwab/client_home/contact_us"},login:{sm:"https://www.schwab.com/public/schwab/nn/login/mobile-login.html&lang=en",md:"https://client.schwab.com/login/signon/customercenterlogin.aspx"}},logo:{logoAsideText:"TRUST COMPANY",urlsWithBankLogo:["/bank","/checking","/savings","/checking-account-faqs","/public/schwab/banking_lending/pledged_asset_line","/public/schwab/banking_lending/todays_mortgage_rates","/public/schwab/banking_lending/purchase_home","/public/schwab/banking_lending/refinance_your_mortgage","/public/schwab/banking_lending/home_equity_line_of_credit","/public/schwab/banking_lending/mortgage_rate_calculator","/public/schwab/banking_lending/purchase_home/schwab_quicken_video","/public/schwab/banking_lending/start_your_loan","/legal/schwab-bank-privacy-security","/legal/bank-online-security","/pledged-asset-line","/legal/estatements-confirmations","/checking/faqs","/checking/debit-card","/checking/zelle"],urslWithLogoAside:["/public/schwab/investing/accounts_products/personal_trust_services","/personal-trust-services"]},quickQuoteUrl:"https://client.schwab.com/MobileWeb/QuickQuote.cshtml",linkCustomizations:{"/active_trader":{"meganv-util--wide--OpenanAccount":"https://www.schwab.com/public/schwab/active_trader/start_trading","meganv-util--narrow--OpenanAccount":"https://www.schwab.com/public/schwab/active_trader/start_trading"},"/investment_advice/intelligent_advisory":{"meganv-util--wide--OpenanAccount":"","meganv-util--narrow--OpenanAccount":""},"/trading":{"meganv-util--wide--OpenanAccount":"https://www.schwab.com/public/schwab/active_trader/start_trading","meganv-util--narrow--OpenanAccount":"https://www.schwab.com/public/schwab/active_trader/start_trading"}}},"corporateservices.dev-schwab.acsitefactory.com":{utilityButtons:{contactUs:{lg:"https://www.schwab.com/public/schwab/client_home/contact_us"},login:{sm:"https://corporateservices.schwab.com/login",md:"https://corporateservices.schwab.com/login"}},logo:{logoAsideText:"Corporate Services",urslWithLogoAside:"*"},quickQuoteUrl:"https://client.schwab.com/MobileWeb/QuickQuote.cshtml"},"corporateservices.schwab.acsitefactory.com":{utilityButtons:{contactUs:{lg:"https://www.schwab.com/public/schwab/client_home/contact_us"},login:{sm:"https://corporateservices.schwab.com/login",md:"https://corporateservices.schwab.com/login"}},logo:{logoAsideText:"Corporate Services",urslWithLogoAside:"*"},quickQuoteUrl:"https://client.schwab.com/MobileWeb/QuickQuote.cshtml"},"corporateservices.schwab.com":{utilityButtons:{contactUs:{lg:"https://www.schwab.com/public/schwab/client_home/contact_us"},login:{sm:"https://corporateservices.schwab.com/login",md:"https://corporateservices.schwab.com/login"}},logo:{logoAsideText:"Corporate Services",urslWithLogoAside:"*"},quickQuoteUrl:"https://client.schwab.com/MobileWeb/QuickQuote.cshtml"}};;
"use strict";!function($,meganvConfig){var currentPageReduced,urlChunk,keyCode=Object.freeze({RETURN:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40}),$l1Menus=$(".meganv-main .meganvpsr-main__menu__l1__submenu_wrapper"),activateShade=function(){$.selectorCache(".meganv-overlay").addClass("meganv-overlay--on_right").height($(document).height())},deactivateShade=function(){$.selectorCache(".meganv-overlay").removeClass("meganv-overlay--on_right")},deactivateLeftFlyout=function(){$.selectorCache(".main,.footer,.meganv-hamburger-div").removeClass("meganv-move-content-right")},deactivateRightFlyout=function(){$.selectorCache(".main,.footer,.meganv-hamburger-div").removeClass("meganv-move-content-left")},activateIconHamburger=function(){$.selectorCache(".meganv-hamburger").removeClass("sch-x-2x").addClass("sch-menu-2x")},activateMeganav=function(){$.selectorCache(".meganv-main").addClass("meganv-show-leftflyout")},deactivateMeganav=function(){$.selectorCache(".meganv-main").removeClass("meganv-show-leftflyout")},deactivateQuickQuote=function(){$.selectorCache(".meganv-quote").hasClass("meganv-show-rightflyout")&&$.selectorCache(".meganv-quick-quoter").attr("aria-expanded","false").focus(),$.selectorCache(".meganv-quote").removeClass("meganv-show-rightflyout")},activateHorizScroll=function(){$.selectorCache("body").addClass("bodyWithoutHorScroll")},deactivateHorizScroll=function(){$.selectorCache("body").removeClass("bodyWithoutHorScroll")},activateSubmenuArrows=function(target){target.removeClass("sch-angle-down").addClass("sch-angle-up")},deactivateSubmenuArrows=function(target){target.removeClass("sch-angle-up").addClass("sch-angle-down")},closeLeftFlyout=function(){deactivateLeftFlyout(),activateIconHamburger(),deactivateShade(),deactivateMeganav(),deactivateHorizScroll()},openLeftFlyout=function(){activateHorizScroll(),$.selectorCache(".meganv-hamburger").removeClass("sch-menu-2x").addClass("sch-x-2x"),$.selectorCache(".main,.footer,.meganv-hamburger-div").addClass("meganv-move-content-right"),activateShade(),activateMeganav()},openRightFlyout=function(){activateHorizScroll(),$.selectorCache(".main,.footer,.meganv-hamburger-div").addClass("meganv-move-content-left"),activateShade(),$.selectorCache(".meganv-quote").addClass("meganv-show-rightflyout").on("transitionend.qq webkitTransitionEnd.qq oTransitionEnd.qq",function(){$.selectorCache(".meganv-quote").off("transitionend.qq webkitTransitionEnd.qq oTransitionEnd.qq").attr("tabIndex","-1").focus()}),$.selectorCache(".meganv-quick-quoter").attr("aria-expanded","true")},closeRightFlyout=function(){deactivateHorizScroll(),deactivateRightFlyout(),deactivateShade(),deactivateQuickQuote()},resetMeganavState=function(){deactivateSubmenuArrows($.selectorCache(".meganv-btn-expand")),deactivateLeftFlyout(),deactivateShade(),deactivateHorizScroll(),activateIconHamburger(),deactivateRightFlyout(),deactivateQuickQuote(),$.selectorCache(".meganvpsr-main__menu__l1__submenu__lx").hide(),$.selectorCache(".meganvpsr-main__menu__l1__submenu_wrapper").hide(),$(document).off("click")},currentPage=window.location.href,currentPageEncoded=encodeURI(currentPage.match(/^([^\?#&]+)/g)[0]),currentPageSnip=(currentPageReduced=currentPage.replace("://"),void 0!==(urlChunk=currentPageReduced.substr(currentPageReduced.indexOf("/"),currentPageReduced.length+1))?urlChunk.match(/^([^\?#&]+)/g)[0]:""),currentDomain=/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim.exec(currentPage)[1],configForCurrentDomain=meganvConfig[currentDomain]?meganvConfig[currentDomain]:meganvConfig["schwab.com"],closeLvl=function(level){var $meganvBtnLvl=$(".meganv-btn-lvl"+level);$meganvBtnLvl.removeClass("sch-angle-up").addClass("sch-angle-down"),$meganvBtnLvl.parent().next().slideUp("slow")},markActivePageWide=function(element){element.removeClass("meganv-activepage"),element.parents(".meganv-activate-trigger").addClass("meganv-activepage")},markActivePageMobile=function(element){element.parents(".meganvpsr-main__menu__l1").removeClass("meganv-activepage"),element.parents("ul").each(function(){$(this).show(),activateSubmenuArrows($(this).prev().children(".meganv-btn-expand"))}),activateSubmenuArrows(element.parents("span")),element.addClass("meganv-activepage")};activateSubmenuArrows($(this).prev().children(".meganv-btn-expand"));var setActivePageStyle=function(displayIsWide){if(currentPageSnip.length>1){var activePageFunction=displayIsWide?markActivePageWide:markActivePageMobile,absUrlElement=$('.meganvpsr-main__menu a[href="'+currentPageEncoded+'"]'),fullRelElement=$('.meganvpsr-main__menu a[href="'+currentPageSnip+'"]'),fullPsrElement=$('.meganvpsr-main__menu a[href="https://www.schwab.com'+currentPageSnip+'"][role="link"]'),relUrlElement=$('.meganvpsr-main__menu  a[href$="'+currentPageSnip+'"][role="link"]');absUrlElement.length?activePageFunction(absUrlElement):fullRelElement.length?activePageFunction(fullRelElement):fullPsrElement.length?activePageFunction(fullPsrElement):activePageFunction(relUrlElement)}};function toggleSubmenu(targetTrigger){var $targetTrigger=$(targetTrigger);if($targetTrigger.is("li")){var clickedToggleLevel,arrowButton=$targetTrigger.children("a").children(".meganv-btn-expand"),subMenu=$targetTrigger.children().eq(1),clickedToggleClasses=$(arrowButton).attr("class");void 0!==clickedToggleClasses&&(clickedToggleLevel=clickedToggleClasses.substr(clickedToggleClasses.indexOf("lvl")+3,1)),arrowButton.hasClass("sch-angle-up")?($targetTrigger.children("a").attr("aria-expanded","false"),subMenu.slideUp(400),deactivateSubmenuArrows(arrowButton)):(closeLvl(clickedToggleLevel),subMenu.slideDown(400),activateSubmenuArrows(arrowButton),$targetTrigger.children("a").attr("aria-expanded","true"))}}var allFocusableLinks={0:$('.meganvpsr a[data-lvl="0"]'),1:$('.meganvpsr a[data-lvl="1"]:not([href="#"])'),2:$('.meganvpsr a[data-lvl="2"]:not([href="#"])')},focusFirstChild=function(link){var lvl=parseInt(link.attr("data-lvl")),firstChildLink=$(link.next().find('a[data-lvl="'+(lvl+1)+'"]')[0]);"-1"===firstChildLink.attr("tabIndex")?(firstChildLink=$(link.next().find('a[data-lvl="'+(lvl+2)+'"]')[1])).focus():firstChildLink.focus()},focusNextSibling=function(link){var currentLvl=parseInt(link.attr("data-lvl"));if(void 0!==allFocusableLinks[currentLvl]){var next=allFocusableLinks[currentLvl].eq(allFocusableLinks[currentLvl].index(link)+1);$(next[0]).focus(),$(":focus")[0]===link[0]&&(next=allFocusableLinks[currentLvl].eq(allFocusableLinks[currentLvl].index(link)+2),$(next[0]).focus())}},focusPrevSibling=function(link){var currentLvl=parseInt(link.attr("data-lvl"));if(void 0!==allFocusableLinks[currentLvl]){var prev=allFocusableLinks[currentLvl].eq(allFocusableLinks[currentLvl].index(link)-1);$(prev[0]).focus(),$(":focus")[0]===link[0]&&(prev=allFocusableLinks[currentLvl].eq(allFocusableLinks[currentLvl].index(link)-2),$(prev[0]).focus())}},initializeTaggingEventHandlers=function(){$l1Menus.each(function(index,l1Menu){var linkNameBase="clk_meganav_"+$(l1Menu).attr("aria-labelledby");$(l1Menu).find(".meganvpsr-main__menu__l1__submenu__lx > li > a:not([aria-haspopup])").each(function(ind,link){$(link).off("click"),$(link).on("click",function(ev){var linkName;linkName=linkNameBase+"_"+ev.target.textContent.replace(/ /g,""),"function"==typeof scatCustomLinkTrack&&scatCustomLinkTrack("mn-menu-clk",linkName)})})})},displayIsWide=null;function expandSubmenu(target){$(".meganv-activate-target").hide(),$(".meganv-activate-trigger-click").children("a").attr("aria-expanded","false"),target.prev().attr("aria-expanded","true"),target.fadeIn()}function collapseAllSubmenus(){$('.meganvpsr a[aria-expanded="true"]').attr("aria-expanded","false"),$(".meganv-activate-target").hide()}var initializeEventHandlers=function(){var windowWidth=$(window).width();$.selectorCache(".meganv-activate-trigger").off("click"),$.selectorCache(".meganv-btn-expand").off("click"),$.selectorCache(".main,.footer").off("click"),$.selectorCache(".meganv-hamburger").off("click"),$.selectorCache(".meganv-quick-quoter").off("click"),$.selectorCache(".meganv-activate-trigger").off("mouseenter"),$.selectorCache(".meganv-activate-trigger-click").off("click"),$.selectorCache(".meganv-activate-trigger").off("mouseleave"),$.selectorCache(".meganv-activate-trigger>a").off("focus"),$.selectorCache(".meganvpsr a").off("focus"),$.selectorCache(".meganv-activate-trigger-click,.meganv-activate-trigger").off("keydown"),$.selectorCache(".meganv-activate-trigger").off("keydown"),$.selectorCache(".meganvpsr a").off("keydown"),$(document).off("keyup"),displayIsWide&&windowWidth>1024?(resetMeganavState(),activateMeganav(),$.selectorCache(".meganvpsr-main__menu__l1__submenu__lx.meganv-submenu-lvl2").show(),$(".meganvpsr-main__menu__l1__submenu__lx>li>a[aria-haspopup]").removeAttr("aria-haspopup").removeAttr("aria-expanded").attr("drm","1"),$(".meganvpsr-main__menu .meganvpsr-main__menu__l1__heading").parent().attr("tabindex","-1"),setActivePageStyle(displayIsWide),$(document).mouseup(function(e){var $container=$(".meganv-activate-trigger-click");$container.is(e.target)||0!==$container.has(e.target).length||($(".meganv-activate-trigger-click .meganv-activate-target").hide(),$container.children("a").attr("aria-expanded","false"))}),$.selectorCache(".meganvpsr a").keydown(function(e){var currentLink=$(e.target),submenu=currentLink.next();switch(e.keyCode){case keyCode.DOWN:currentLink.parent().hasClass("meganv-activate-trigger")||currentLink.parent().hasClass("meganv-activate-trigger-click")?(e.preventDefault(),expandSubmenu(submenu),focusFirstChild(currentLink)):(e.preventDefault(),focusNextSibling(currentLink));break;case keyCode.RETURN:(currentLink.parent().hasClass("meganv-activate-trigger")||currentLink.parent().hasClass("meganv-activate-trigger-click"))&&(e.preventDefault(),expandSubmenu(submenu),focusFirstChild(currentLink));break;case keyCode.SPACE:e.preventDefault(),expandSubmenu(submenu),focusFirstChild(currentLink);break;case keyCode.UP:currentLink.parent().hasClass("meganv-activate-trigger")||currentLink.parent().hasClass("meganv-activate-trigger-click")?(e.preventDefault(),expandSubmenu(submenu),function(submenu){$(submenu.find("a:last")).focus()}(currentLink)):(e.preventDefault(),focusPrevSibling(currentLink));break;case keyCode.RIGHT:e.preventDefault(),focusNextSibling(currentLink);break;case keyCode.LEFT:e.preventDefault(),focusPrevSibling(currentLink);break;case keyCode.ESC:collapseAllSubmenus(),$(currentLink.parents(".meganv-activate-trigger-click,.meganv-activate-trigger")[0]).children("a").focus()}}),$.selectorCache(".meganv-activate-trigger").on("mouseenter",function(){expandSubmenu($(".meganv-activate-target",this))}).on("mouseleave",function(){!function(target){target.prev().attr("aria-expanded","false"),target.hide()}($(".meganv-activate-target",this))}),$.selectorCache(".meganv-activate-trigger-click").on("click",function(e){e.preventDefault(),expandSubmenu($(".meganv-activate-target",$(this)))}),$.selectorCache(".meganv-activate-trigger-click .meganv-dropdown a").on("click",function(e){e.stopPropagation()}),$.selectorCache(".meganvpsr a").on("focus",function(e){1!==$(this).parents(".meganv-activate-target").length&&collapseAllSubmenus()})):($(".meganvpsr-main__menu__l1__submenu__lx>li>a[drm]").removeAttr("drm","1").attr("aria-haspopup","true").attr("aria-expanded","false"),$('a[tabindex="-1"]').removeAttr("tabindex"),$.selectorCache(".meganvpsr-main__menu__l1__submenu__lx.meganv-submenu-lvl2").hide(),deactivateMeganav(),resetMeganavState(),setActivePageStyle(displayIsWide),windowWidth>=768?$("a.logInMobile").attr("href",configForCurrentDomain.utilityButtons.login.md,"false").attr("aria-haspopup","false"):$("a.logInMobile").attr("href",configForCurrentDomain.utilityButtons.login.sm,"false").attr("aria-haspopup","false"),$(".meganv-overlay").click(function(evt){closeLeftFlyout(),closeRightFlyout()}),$.selectorCache(".meganv-activate-trigger").off("click"),$.selectorCache(".meganv-activate-trigger").on("click",function(ev){toggleSubmenu(ev.target)}),$.selectorCache(".meganv-hamburger").on("click",function(ev){$.selectorCache(".meganv-hamburger-div").hasClass("meganv-move-content-right")?closeLeftFlyout():(openLeftFlyout(),$(".meganvpsr-main__menu__l1 a")[0].focus())}),$.selectorCache(".meganv-quick-quoter").on("click",function(ev){var $meganvQQFrame;$.selectorCache(".meganv-hamburger-div").hasClass("meganv-move-content-left")?closeRightFlyout():(($meganvQQFrame=$("#meganv-qq-frame")).attr("src")||$meganvQQFrame.attr("src",configForCurrentDomain.quickQuoteUrl),openRightFlyout())}),$.selectorCache(".meganvpsr a").keydown(function(e){var currentLink=$(e.target);switch(e.keyCode){case keyCode.RETURN:$(currentLink).attr("aria-haspopup")&&(e.preventDefault(),toggleSubmenu($(e.target).parent()));break;case keyCode.ESC:closeRightFlyout(),closeLeftFlyout()}}))},confirmHorizontalResize=function(){var adjustedWidth=window.screen.width<window.innerWidth?window.screen.width:window.innerWidth,newDisplayIsWide=adjustedWidth>1024;!newDisplayIsWide&&adjustedWidth>768&&(90===window.orientation||-90===window.orientation)&&(newDisplayIsWide=!0),displayIsWide!==newDisplayIsWide&&(displayIsWide=newDisplayIsWide,initializeEventHandlers(),initializeTaggingEventHandlers())},languageDropdown=document.querySelector(".meganv-cth .meganv-utilinks-wrapper--narrow .meganv-dropdown");languageDropdown&&$("html").click(function(e){languageDropdown.style.display="none",$(e.target).closest(".meganv-lang-trigger").length&&(languageDropdown.style.display="block")});$(document).ready(function(){-1!==navigator.userAgent.toLowerCase().indexOf("ipad")&&(document.getElementsByClassName("meganv-logo-link").autofocus=!0)}),$(function(){var errorHandler,errorSettings;configForCurrentDomain.logo.urlsWithBankLogo&&configForCurrentDomain.logo.urlsWithBankLogo.indexOf(currentPageSnip)>-1&&$(".meganv-svg-icon").addClass("meganv-svg-icon--bank"),("*"===configForCurrentDomain.logo.urslWithLogoAside||configForCurrentDomain.logo.urslWithLogoAside.indexOf(currentPageSnip)>-1)&&$(".meganv-logo-aside").html(configForCurrentDomain.logo.logoAsideText),confirmHorizontalResize(),configForCurrentDomain.linkCustomizations&&Object.keys(configForCurrentDomain.linkCustomizations).forEach(function(url){if(currentPage.indexOf(url)>-1){var anchorTagObject=configForCurrentDomain.linkCustomizations[url];Object.keys(anchorTagObject).forEach(function(anchorTag){anchorTagObject[anchorTag].length<1?$("#"+anchorTag).hide():$("#"+anchorTag).attr("href",anchorTagObject[anchorTag])})}}),("zh-TW"===$.getCookieByName("lang")||$.loggedInPast90Days())&&$.selectorCache(".meganvpsr .meganv-main__utilinks--wide.meganv-main__utilinks--wide--left .sch_chat").hide(),errorHandler=window.schwab.utilities.errorHandler,errorSettings={component:"genesys-chat-link",type:"warning"},errorHandler.log("User "+("zh-TW"===$.getCookieByName("lang")?"HAS":"DOES NOT HAVE")+" a chinese cookie.",errorSettings),errorHandler.log("User "+($.loggedInPast90Days()?"HAS":"HAS NOT")+" logged in over the past 90 days.",errorSettings),errorHandler.log("Genesys Chat is "+("zh-TW"===$.getCookieByName("lang")||$.loggedInPast90Days()?"HIDDEN":"SHOWN")+".",errorSettings),$.selectorCache(window).resize(confirmHorizontalResize)})}(jQuery,meganvConfig);;
"use strict";!function($){$(document).ready(function(){$(".meganv-main__utilinks--wide > li").each(function(i,el){el.setAttribute("role","menuitem")}),$(".meganv-main__utilinks--wide > li > a").each(function(i,link){link.hasAttribute("role")&&link.removeAttribute("role")}),$("#meganv-util--wide--OpenanAccount").removeAttr("role"),$("#chatGlobalHeader").removeAttr("role");var pricinglLinks=$("[id='Pricing']");pricinglLinks[1]&&pricinglLinks[1].setAttribute("id","Pricing2")})}(jQuery);;
(function ($) {
  'use strict';

  var getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }


  $(document).ready(function () {
    var logCookie = getCookie('NP2');
    if (typeof logCookie !== 'undefined') {
      var loggedIn = logCookie.split('|')[0];
      if (loggedIn.length > 0) {
        $.selectorCache('.spotl-clients').show();
      } else {
        $.selectorCache('.spotl-prospects').show();
      }
    } else {
        $.selectorCache('.spotl-prospects').show();
    }

  });

})(jQuery);;
