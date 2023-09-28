var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var adInfo = function() {
    var comcastOASAudiences = '',
        tvePartner, uiStyle, useIframe;

    function init(config) {
        tvePartner = config.tvePartner;
        uiStyle = config.uiStyle;
        useIframe = config.useIframe;
        isMobile = config.isMobile;

        buildCrtg();
    }

    function getDocument() {
        return document;
    }

    function getLocation() {
        return adInfo.getDocument().location;
    }

    function getCookie() {
        return adInfo.getDocument().cookie;
    }

    function getReferrer() {
        return adInfo.getDocument().referrer;
    }

    function getHostName() {
        if(getLocation().hostname.indexOf("comcast.net") == -1) {
            return "xfinity.com";
        } else {
            return "comcast.net";
        }
    }

    function buildCrtg() {
        var crtg_rnd=Math.floor(Math.random()*99999999999);
        var crtg_url = getLocation().protocol+'//web.archive.org/web/20190208035203/https://rtax.criteo.com/delivery/rta/rta.js?netId=2528';
        crtg_url +='&cookieName=crtg_comcast';
        crtg_url +='&rnd='+crtg_rnd;
        crtg_url +='&varName=crtg_content';
        var crtg_script=document.createElement('script');
        crtg_script.type='text/javascript';
        crtg_script.src=crtg_url;
        crtg_script.async=true;
        adInfo.insertCrtgScript(crtg_script);
    }

    function insertCrtgScript(crtg_script) {
        adInfo.getDocument().getElementsByTagName("head")[0].appendChild(crtg_script);
    }

    function getMaxSize() {
        var clientWidth =  adInfo.getDocument().documentElement.clientWidth,
            clientHeight = adInfo.getDocument().documentElement.clientHeight,
            maxSize;
        if (useIframe || clientWidth < 730 || clientWidth < 990 && clientHeight < 600)
            maxSize= "300x250";
        else if (clientWidth < 990 && clientHeight >= 600)
            maxSize = "monster";
        else if (clientWidth < 1024 || clientHeight < 600)
            maxSize = "expandable";
        else
            maxSize = "fullpage";

        return maxSize;
    }

    function matchKeys(keys) {
        var re = new RegExp('(?:' + keys.join('|') + ')=(?:\\"|%22)(.*?)(?:\\"|%22)');
        var matches = getCookie().match(re);
        if (!matches)
            return null;
        return matches[1];
    }

    function getAdTargetZip() {
        var flag_matches = getCookie().match(/(?:adt_optout_flag)=(true|false)/);
        var optout = (flag_matches && flag_matches[1] == "true");
        var unknown_zip = "US:UNKNOWN";
        if (optout)
            return unknown_zip;
        var zip = matchKeys(['adt_zip']);
        if (!zip)
            return unknown_zip;
        return "US:" + zip;
    }

    function getAM_CID() {
        var unknown_cid = "NONE";
        var flag_matches = getCookie().match(/(?:adt_optout_flag)=(true|false)/);
        var optout = (flag_matches && flag_matches[1] == "true");
        if (optout)
            return unknown_cid;
        var cid = matchKeys(['amcid']);
        if (!cid)
            return unknown_cid;
        cid = decodeURI(cid);
        return cid.replace(",","&am=");
    }

    function getCookiesAsObject(){
        var i,key,value,
            cookieArr=getCookie().split(";"),
            cookies={};
        for(i=0;i<cookieArr.length;i++){
            key=cookieArr[i].substr(0,cookieArr[i].indexOf("="));
            value=cookieArr[i].substr(cookieArr[i].indexOf("=")+1);
            key=key.replace(/^\s+|\s+$/g,"");
	        if(key)
		        cookies[key] = value;
        }

        return cookies;
    }

    function getDecodedCookies(keys){
        var i, cookies = getCookiesAsObject(),
            decodedCookies = {};
        for(i=0;i<keys.length;i++){
            decodedCookies[keys[i]] = decodeURIComponent(cookies[keys[i]]);
        }

	    return decodedCookies;
    }

    function setComcastOASAudienceData(userData) {
        if(userData && userData.status === 0 && userData.user.audiences) {
            if(typeof userData.user.audiences === 'string') {
                var codes = userData.user.audiences.split(',');
                for (var i = 0; i < codes.length; i++) {
                    comcastOASAudiences += "&vidaud=" + codes[i].trim();
                }
            }
            else {
                for (var i = 0; i < userData.user.audiences.length; i++) {
                    comcastOASAudiences += "&vidaud=" + userData.user.audiences[i].code;
                }
            }
        }
    }

    function getOAS_query() {
        var opts = [],
            cookies = getDecodedCookies(['aam_oas', 'crtg_comcast', 'aam_uuid']);

        if (getAdTargetZip())
            opts.push('_OAS_GEO_OVERRIDE_='+getAdTargetZip());
        if (getAM_CID())
            opts.push('am='+getAM_CID().split(',').join('&am='));
        if (comcastOASAudiences) {
            opts.push(comcastOASAudiences.slice(1));
        }
        if (cookies.crtg_comcast) {
            opts.push(cookies.crtg_comcast);
        }

	    if (cookies.aam_oas) {
		    opts.push(cookies.aam_oas);
		    opts.push('u=' + cookies.aam_uuid);
	    }

        if(uiStyle) {
            opts.push('theme='+uiStyle);
            opts.push('max-size='+getMaxSize());
        }
        if (getLocation().search.indexOf('AdParam') != -1) {
            opts.push(getLocation().search.slice(1));
        }

        OAS_query = opts.join('&');
        return OAS_query;
    }

    function getOAS_rns() {
        var OAS_rn = String(Math.random());
        OAS_rns = OAS_rn.substring (2, 11);
        return OAS_rns;
    }

    function getOAS_sitepage() {
        var OAS_sitepage = isMobile ? "m." : "";

        if (tvePartner)
            OAS_sitepage += 'comcast.net/login_secure/tve/' +  tvePartner;
        else
            OAS_sitepage += 'comcast.net/login_secure/notve';

        return OAS_sitepage;
    }

    function getFirstTimeUser() {
        var first_time;
        if (getCookie().indexOf("prefs") >= 0 || getReferrer().search('tt2') == -1) {
            first_time ="normal";
        } else {
            first_time ="ftu";
        }
        return first_time;
    }

    function getOAS_type() {
        if(useIframe)
            return 'sx';
        else
            return 'jx';
    }

    function buildOASCentralUrl() {
        return '//web.archive.org/web/20190208035203/https://oascentral.'+getHostName()+'/RealMedia/ads/adstream_'+getOAS_type()+'.ads/'+ getOAS_sitepage()+'/1'+getOAS_rns()+
            '@x32?target='+getFirstTimeUser()+'&'+getOAS_query();
    }

    function decideMobileOrWeb() {
        if(useIframe)
            buildIFrame();
        else
            adInfo.injectOASScript();
    }

    function buildIFrame() {
        var iframeElem = document.createElement('iframe');
        iframeElem.setAttribute("id","mobileIframe");
        iframeElem.width = "300";
        iframeElem.height = "250";
        iframeElem.marginWidth = "0";
        iframeElem.marginHeight = "0";
        iframeElem.setAttribute('frameborder','0');
        iframeElem.setAttribute('scrolling','no');
        document.getElementById('ad-block').appendChild(iframeElem);
        document.getElementById('ad-block').style.visibility = 'hidden';
        setIFrameSrc();
    }

    function setIFrameSrc() {
        document.getElementById('mobileIframe').src = buildOASCentralUrl();
    }

    function injectOASScript() {
        document.getElementById('ad-block').style.visibility = 'hidden';
        var OASScript= '<script type="text/javascript" src="'+buildOASCentralUrl()+'"></scr' + 'ipt>';
        adInfo.getDocument().write(OASScript);
    }

    function updateHtmlClassName() {
        var htmlElem = adInfo.getDocument().documentElement,
        adClass;
        if (htmlElem.className.match(/\bda\b/) && htmlElem.className.indexOf('da-fullscreen') == -1) {

            switch (getMaxSize()) {
                case "fullpage" :
                case "expandable" :
                    adClass = 'da-expandable';
                    break;
                case "monster" :
                    adClass = 'da-300x600';
                    break;
                default :
                    adClass = 'da-300x250';
                    break;
            }

            htmlElem.className += ' ' + adClass;
        }

    }

    function finalize() {
        decideMobileOrWeb();
        updateHtmlClassName();
        document.getElementById('ad-block').style.visibility = '';
    }

    return {
        init: init,
        getDocument: getDocument,
        insertCrtgScript: insertCrtgScript,
        setComcastOASAudienceData: setComcastOASAudienceData,
        buildOASCentralUrl: buildOASCentralUrl,
        injectOASScript: injectOASScript,
        setIFrameSrc: setIFrameSrc,
        finalize: finalize
    }
}();

}
/*
     FILE ARCHIVED ON 03:52:03 Feb 08, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:22:02 Aug 04, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 681.454
  exclusion.robots: 0.129
  exclusion.robots.policy: 0.119
  cdx.remote: 0.057
  esindex: 0.012
  LoadShardBlock: 625.388 (3)
  PetaboxLoader3.resolve: 632.306 (5)
  PetaboxLoader3.datanode: 284.674 (5)
  load_resource: 319.163 (2)
*/