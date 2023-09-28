
        window.REBELMOUSE_TASKS_QUEUE.push(function loadFonts(){
window.REBELMOUSE_STDLIB.loadFontFace('IvarText', 'https://partners.rebelmouse.com/IEEE/IvarCompleteWeb/IvarText-Regular.woff2', {selector: '',
  weight: '400',
  style: 'normal'
});
window.REBELMOUSE_STDLIB.loadFontFace('IvarTextItalic', 'https://partners.rebelmouse.com/IEEE/IvarCompleteWeb/IvarText-Italic.woff2', {selector: '',
  weight: '400',
  style: 'italic'
});
window.REBELMOUSE_STDLIB.loadFontFace('IvarText', 'https://partners.rebelmouse.com/IEEE/IvarCompleteWeb/IvarText-Bold.woff2', {selector: '',
  weight: '700',
  style: 'normal'
});});

window.REBELMOUSE_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("https://htlbid.com/v3/spectrum.ieee.org/rblbid.js", function() {
        
        rblbid.addHook("beforePbjsAuction", (hbConfig, auctionInfo) => {
  window.auction = {};
  var d = {
    key: "adxbid",
    val: function (e) {
      
      var realPrice = e.pbHg;
      if (e.pbHg == 0.0 || e.pbHg == 0.01) {
        window.auction[e.adUnitCode] = {"price": realPrice, "adxbid":"0.01" , "targeting":auctionInfo.bidderSettings.standard.adserverTargeting};
        return 0.01;
        
      }
      e.pbHg = parseFloat((e.pbHg * 1.6).toFixed(2));
      if (e.pbHg >= 0.01 && e.pbHg < 1.02) {
        window.auction[e.adUnitCode] = {"price": realPrice, "adxbid":e.pbHg.toFixed(2) , "targeting":auctionInfo.bidderSettings.standard.adserverTargeting};
        return e.pbHg.toFixed(2);
      } else if (e.pbHg >= 1.02 && e.pbHg < 2.0) {
        var temp = e.pbHg.toString();
        if (/\d+(\.\d+)?/.test(temp)) {
          var lastNum = parseInt(temp[temp.length - 1]);
          if (lastNum % 2 == 1) {
            e.pbHg = parseFloat(e.pbHg.toFixed(2)) - 0.01;
          }
        }
window.auction[e.adUnitCode] = {"price": realPrice, "adxbid":e.pbHg.toFixed(2) , "targeting":auctionInfo.bidderSettings.standard.adserverTargeting};
        return e.pbHg.toFixed(2);
      } else if (e.pbHg >= 2 && e.pbHg < 5) {
        window.auction[e.adUnitCode] = {"price":realPrice, "adxbid":e.pbHg.toFixed(1) + 0 , "targeting":auctionInfo.bidderSettings.standard.adserverTargeting};
        return e.pbHg.toFixed(1) + 0;
      } else if (e.pbHg >= 5 && e.pbHg < 10) {
        function roundDown(number) {
          var decimalPart = number % 1;
          if (decimalPart < 0.5) {
            window.auction[e.adUnitCode] = {"price": realPrice, "adxbid":number - decimalPart , "targeting":auctionInfo.bidderSettings.standard.adserverTargeting};
            return number - decimalPart}
          else {
            window.auction[e.adUnitCode] = {"price":realPrice, "adxbid":number - decimalPart + 0.5 , "targeting":auctionInfo.bidderSettings.standard.adserverTargeting};
            return number - decimalPart + 0.5};
        }
        window.auction[e.adUnitCode] = {"price":realPrice, "adxbid":roundDown(e.pbHg).toFixed(1) + 0 , "targeting":auctionInfo.bidderSettings.standard.adserverTargeting};
        return roundDown(e.pbHg).toFixed(1) + 0;
      } else {
        window.auction[e.adUnitCode] = {"price":realPrice, "adxbid":10.00 , "targeting":auctionInfo.bidderSettings.standard.adserverTargeting};
        return (e.pbHg = "10.00");
      }
    },
  };
  
  auctionInfo.bidderSettings.standard.adserverTargeting.push(d);
  let slotRendered = function (event) {
    
    var slot = event.slot;
    auctionInfo.adUnits.filter((adUnit) => {
      if (adUnit.code == slot.getSlotElementId()) {
        googletag.pubads().removeEventListener("slotRenderEnded", slotRendered);
        console.group(
          "Moravac: ",
          slot.getSlotElementId(),
          "finished rendering."
        );
        console.log("Is empty:", event.isEmpty);
        console.log("Prebid price?: ", window.auction[slot.getSlotElementId()]?.price || 0);
        console.log("AdxBid price?: ", window.auction[slot.getSlotElementId()]?.adxbid)
        
        if(event.isEmpty && window.auction[slot.getSlotElementId()]?.price){
        	console.log("HB price is set but ad is empty");
          	console.log("Reloading ad without AdXBID");
            slot.setTargeting('adxbid', '0.01');
            console.log("set: ", slot.getTargetingKeys())
          	console.log("Refresh unit")
          	googletag.pubads().refresh([slot], {changeCorrelator: true})
          	console.log("Refreshed")
        }
        
        console.groupEnd();
      }
    });
  };
  

  googletag.cmd.push(function () {
    googletag.pubads().addEventListener("slotRenderEnded", slotRendered);
  });
  return auctionInfo;
});
        
    });
    

});

window.REBELMOUSE_TASKS_QUEUE.push(function(){

    
        REBELMOUSE_STDLIB
  .createElementChangeListener('.rm-shortcode[href*=".pdf"]', function(pdfLink){
    pdfLink.href = 'javascript:void(0);';
    pdfLink.classList.add('pdf-link-nonmember');
    pdfLink.addEventListener('click', function(){
      openGatedPopup('for_pdf_issues');
    });
});
    

});

window.REBELMOUSE_TASKS_QUEUE.push(function(){

    
        //var ssoValidatorUrl = 'https://oamssoqae.ieee.org/ieeevendorsso/rest/auth/validatePFToken?_=' + (+ new Date());

var ssoValidatorUrl = 'https://securesso.ieee.org/ieeevendorsso/rest/auth/validatePFToken?_=' + (+ new Date());

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

fetch(ssoValidatorUrl, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
}).then(function (response) {
	// The API call was successful!
	if (response.ok) {
		response.json().then(function(result) {
          if (typeof result == 'object' && result.cookieValid && getCookie('user_logged_in') !== "1") { 		//SSO
              console.log('we should be logged in, redirect to SSO iDP');
              //window.location.href = 'https://spectrumtest.ieee.org/core/saml/main/login?next_url=' + window.location.href;
              window.location.href = "https://spectrum.ieee.org/core/saml/main/login?next_url=" + encodeURIComponent("https://spectrum.ieee.org/core/integrations/ieee/changes?redirect=" + window.location.href);
          } else if (typeof result == 'object' && !result.cookieValid) {		//SLO
              console.log('we should be logged out, remove cookie and do not show user');
              //document.cookie = "sessionid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
          }
        });
      
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
    

});

window.REBELMOUSE_TASKS_QUEUE.push(function(){

    
        function changeDateFormat(widget){
  var dates_toChange=widget.querySelectorAll('.widget .social-date__text:not(.processed),.widget .social-date-modified__text:not(.processed)');
  if(dates_toChange){
    dates_toChange.forEach(function(date) {

      if(!date.innerHTML.trim()==""){
        date.classList.add('processed')
        var date_string=date.innerHTML.toString();
        var slpit_dateText=date_string.split(" ");


        if(slpit_dateText.length==1){
          let plural=true;
          if(slpit_dateText[0].length==2){
            if(slpit_dateText[0].charAt(0)=="1"){
              plural=false;
            }
          }
          let modifier=plural ? 'hours ago':'hour ago';

          if(slpit_dateText[0].substr(-1)=='m'){
            modifier=plural ? 'minutes ago':'minute ago';
          }
          if(slpit_dateText[0].substr(-1)=='s'){
            modifier=plural ? 'seconds ago':'second ago';
          }
          var new_dateText=slpit_dateText[0].slice(0,-1);
          date.innerHTML=  new_dateText+" "+ modifier;
          date.classList.add("modified");
        }
      }
    });

  }
}
_createElementChangeListener= function (selector, callback) {
  const initializedNodes = new Set([]);

  document.querySelectorAll(selector).forEach((node) => {
    callback(node);
    initializedNodes.add(node);
  });

  const mutationObserver = new MutationObserver(() => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => {
      if (!initializedNodes.has(node)) {
        callback(node);
        initializedNodes.add(node);
      }
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
_createElementChangeListener(".widget",changeDateFormat);
    

});

window.REBELMOUSE_TASKS_QUEUE.push(function(){

    
        feature_post_full_style();
    

});