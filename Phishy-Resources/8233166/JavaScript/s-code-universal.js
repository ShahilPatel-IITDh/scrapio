var scodeConfig = {account: '', brand: '', isProd: null};
if('ANALYTICS_DATA' in window) {
	scodeConfig.account = ANALYTICS_DATA.account;
	scodeConfig.brand = ANALYTICS_DATA.brand;
}
else {
	try {
		var scodeOfferQuery = JSON.parse(unescape(document.cookie.match(/\bofferQuery=([^;]+)/)[1]));
		scodeConfig.account = scodeOfferQuery.ac;
		scodeConfig.brand = scodeOfferQuery.b;
	}
	catch(e) {
		console.error('MTO Omniture: could not read offerQuery cookie');
	}
}

if(!scodeConfig.account) {
	console.error('Omniture: s_account value not found');
	scodeConfig.account = 'cibccomdev';
}

/*
=========RECOGNIZE IF NATIVE PRODUCT SELECTOR AND UPDATE 
*/
if ($('#main-page').hasClass('nativeView')){
	if (scodeConfig.account == "cibccomprod"){
		scodeConfig.account="cibcnativeappprod";
	} else {
		scodeConfig.account="cibcnativeappdev";
	}
}

if(!scodeConfig.brand) {
	console.error('Omniture: brand value not found');
}

!function e(t,i,n){function r(s,o){if(!i[s]){if(!t[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(a)return a(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var d=i[s]={exports:{}};t[s][0].call(d.exports,function(e){var i=t[s][1][e];return r(i||e)},d,d.exports,e,t,i,n)}return i[s].exports}for(var a="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({1:[function(e,t,i){(function(i){/** @license ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ============

Adobe Visitor API for JavaScript version: 3.0.0
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
*/
var n=e("./child/ChildVisitor"),r=e("./child/Message"),a=e("./child/makeChildMessageListener"),s=e("./utils/asyncParallelApply"),
o=e("./utils/enums"),l=e("./utils/utils"),u=e("./utils/getDomain"),d=e("./units/version"),c=e("./units/crossDomain"),
f=e("@adobe-mcid/visitor-js-shared/lib/ids/generateRandomID"),g=e("./units/makeCorsRequest"),p=e("./units/makeDestinationPublishing"),
m=e("./utils/constants"),_=function(e,t,n){function _(e){var t=e;return function(e){var i=e||M.location.href;try{var n=S._extractParamFromUri(i,t);
	if(n)return F.parsePipeDelimetedKeyValues(n)}catch(e){}}}function h(e){function t(e,t){e&&e.match(m.VALID_VISITOR_ID_REGEX)&&t(e)}t
		(e[b],S.setMarketingCloudVisitorID),S._setFieldExpire(L,-1),t(e[E],S.setAnalyticsVisitorID)}function C(e){e=e||{},
	S._supplementalDataIDCurrent=e.supplementalDataIDCurrent||"",S._supplementalDataIDCurrentConsumed=e.supplementalDataIDCurrentConsumed||{},
	S._supplementalDataIDLast=e.supplementalDataIDLast||"",S._supplementalDataIDLastConsumed=e.supplementalDataIDLastConsumed||{}}function D(e)
	{function t(e,t,i){return i=i?i+="|":i,i+=e+"="+encodeURIComponent(t)}function i(e,i){var n=i[0],r=i[1];return null!=r&&r!==w&&(e=t(n,r,e)),e}
	var n=e.reduce(i,"");return function(e){var t=F.getTimestampInSeconds();return e=e?e+="|":e,e+="TS="+t}(n)}function I(e){var t=e.minutesToLive,
		i="";return(S.idSyncDisableSyncs||S.disableIdSyncs)&&(i=i||"Error: id syncs have been disabled"),"string"==typeof e.dpid&&e.dpid.length||(i=i||"Error: config.dpid is empty"),"string"==typeof e.url&&e.url.length||(i=i||"Error: config.url is empty"),void 0===t?t=20160:(t=parseInt(t,10),(isNaN(t)||t<=0)&&(i=i||"Error: config.minutesToLive needs to be a positive number")),{error:i,ttl:t}}if(!n||n.split("").reverse().join("")!==e)throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");var S=this;S.version="3.0.0";var M=i,A=M.Visitor;A.version=S.version,A.AuthState=o.AUTH_STATE,A.OptOut=o.OPT_OUT,M.s_c_in||(M.s_c_il=[],M.s_c_in=0),S._c="Visitor",S._il=M.s_c_il,S._in=M.s_c_in,S._il[S._in]=S,M.s_c_in++,S._log={requests:[]},S.marketingCloudOrgID=e,S.cookieName="AMCV_"+e,S.sessionCookieName="AMCVS_"+e,S.cookieDomain=u(),S.cookieDomain===M.location.hostname&&(S.cookieDomain=""),S.loadSSL=M.location.protocol.toLowerCase().indexOf("https")>=0,S.loadTimeout=3e4,S.CORSErrors=[],S.marketingCloudServer=S.audienceManagerServer="dpm.demdex.net",S.sdidParamExpiry=30;var v=M.document,y=null,b="MCMID",O="MCIDTS",T="A",E="MCAID",k="AAM",L="MCAAMB",w="NONE",P=function(e){return!Object.prototype[e]},R=g(S,V);S.FIELDS=o.FIELDS,S.cookieRead=function(e){e=encodeURIComponent(e);var t=(";"+v.cookie).split(" ").join(";"),i=t.indexOf(";"+e+"="),n=i<0?i:t.indexOf(";",i+1);return i<0?"":decodeURIComponent(t.substring(i+2+e.length,n<0?t.length:n))},S.cookieWrite=function(e,t,i){var n,r=S.cookieLifetime;if(t=""+t,r=r?(""+r).toUpperCase():"",i&&"SESSION"!==r&&"NONE"!==r){if(n=""!==t?parseInt(r||0,10):-60)i=new Date,i.setTime(i.getTime()+1e3*n);else if(1===i){i=new Date;var a=i.getYear();i.setYear(a+2+(a<1900?1900:0))}}else i=0;return e&&"NONE"!==r?(v.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+"; path=/;"+(i?" expires="+i.toGMTString()+";":"")+(S.cookieDomain?" domain="+S.cookieDomain+";":""),S.cookieRead(e)===t):0},S.resetState=function(e){e?S._mergeServerState(e):C()},S._isAllowedDone=!1,S._isAllowedFlag=!1,S.isAllowed=function(){return S._isAllowedDone||(S._isAllowedDone=!0,(S.cookieRead(S.cookieName)||S.cookieWrite(S.cookieName,"T",1))&&(S._isAllowedFlag=!0)),S._isAllowedFlag},S.setMarketingCloudVisitorID=function(e){S._setMarketingCloudFields(e)},S._use1stPartyMarketingCloudServer=!1,S.getMarketingCloudVisitorID=function(e,t){if(S.isAllowed()){S.marketingCloudServer&&S.marketingCloudServer.indexOf(".demdex.net")<0&&(S._use1stPartyMarketingCloudServer=!0);var i=S._getAudienceManagerURLData("_setMarketingCloudFields"),n=i.url;return S._getRemoteField(b,n,e,t,i)}return""},S.getVisitorValues=function(e,t){var i={MCMID:{fn:S.getMarketingCloudVisitorID,args:[!0],context:S},MCOPTOUT:{fn:S.isOptedOut,args:[void 0,!0],context:S},MCAID:{fn:S.getAnalyticsVisitorID,args:[!0],context:S},MCAAMLH:{fn:S.getAudienceManagerLocationHint,args:[!0],context:S},MCAAMB:{fn:S.getAudienceManagerBlob,args:[!0],context:S}},n=t&&t.length?F.pluck(i,t):i;s(n,e)},S._currentCustomerIDs={},S._customerIDsHashChanged=!1,S._newCustomerIDsHash="",S.setCustomerIDs=function(e){function t(){S._customerIDsHashChanged=!1}if(S.isAllowed()&&e){S._readVisitor();var i,n;for(i in e)if(P(i)&&(n=e[i]))if("object"==typeof n){var r={};n.id&&(r.id=n.id),void 0!=n.authState&&(r.authState=n.authState),S._currentCustomerIDs[i]=r}else S._currentCustomerIDs[i]={id:n};var a=S.getCustomerIDs(),s=S._getField("MCCIDH"),o="";s||(s=0);for(i in a)P(i)&&(n=a[i],o+=(o?"|":"")+i+"|"+(n.id?n.id:"")+(n.authState?n.authState:""));S._newCustomerIDsHash=S._hash(o),S._newCustomerIDsHash!==s&&(S._customerIDsHashChanged=!0,S._mapCustomerIDs(t))}},S.getCustomerIDs=function(){S._readVisitor();var e,t,i={};for(e in S._currentCustomerIDs)P(e)&&(t=S._currentCustomerIDs[e],i[e]||(i[e]={}),t.id&&(i[e].id=t.id),void 0!=t.authState?i[e].authState=t.authState:i[e].authState=A.AuthState.UNKNOWN);return i},S.setAnalyticsVisitorID=function(e){S._setAnalyticsFields(e)},S.getAnalyticsVisitorID=function(e,t,i){if(!F.isTrackingServerPopulated()&&!i)return S._callCallback(e,[""]),"";if(S.isAllowed()){var n="";if(i||(n=S.getMarketingCloudVisitorID(function(t){S.getAnalyticsVisitorID(e,!0)})),n||i){var r=i?S.marketingCloudServer:S.trackingServer,a="";S.loadSSL&&(i?S.marketingCloudServerSecure&&(r=S.marketingCloudServerSecure):S.trackingServerSecure&&(r=S.trackingServerSecure));var s={};
		if(r){var o="http"+(S.loadSSL?"s":"")+"://"+r+"/id",l="d_visid_ver="+S.version+"&mcorgid="+encodeURIComponent(S.marketingCloudOrgID)+(n?"&mid="+encodeURIComponent(n):"")+(S.idSyncDisable3rdPartySyncing||S.disableThirdPartyCookies?"&d_coppa=true":""),u=["s_c_il",S._in,"_set"+(i?"MarketingCloud":"Analytics")+"Fields"];a=o+"?"+l+"&callback=s_c_il%5B"+S._in+"%5D._set"+(i?"MarketingCloud":"Analytics")+"Fields",s.corsUrl=o+"?"+l,s.callback=u}return s.url=a,S._getRemoteField(i?b:E,a,e,t,s)}}return""},S.getAudienceManagerLocationHint=function(e,t){if(S.isAllowed()){if(S.getMarketingCloudVisitorID(function(t){S.getAudienceManagerLocationHint(e,!0)})){var i=S._getField(E);if(!i&&F.isTrackingServerPopulated()&&(i=S.getAnalyticsVisitorID(function(t){S.getAudienceManagerLocationHint(e,!0)})),i||!F.isTrackingServerPopulated()){var n=S._getAudienceManagerURLData(),r=n.url;return S._getRemoteField("MCAAMLH",r,e,t,n)}}}return""},S.getLocationHint=S.getAudienceManagerLocationHint,S.getAudienceManagerBlob=function(e,t){if(S.isAllowed()){if(S.getMarketingCloudVisitorID(function(t){S.getAudienceManagerBlob(e,!0)})){var i=S._getField(E);if(!i&&F.isTrackingServerPopulated()&&(i=S.getAnalyticsVisitorID(function(t){S.getAudienceManagerBlob(e,!0)})),i||!F.isTrackingServerPopulated()){var n=S._getAudienceManagerURLData(),r=n.url;return S._customerIDsHashChanged&&S._setFieldExpire(L,-1),S._getRemoteField(L,r,e,t,n)}}}return""},S._supplementalDataIDCurrent="",S._supplementalDataIDCurrentConsumed={},S._supplementalDataIDLast="",S._supplementalDataIDLastConsumed={},S.getSupplementalDataID=function(e,t){S._supplementalDataIDCurrent||t||(S._supplementalDataIDCurrent=S._generateID(1));var i=S._supplementalDataIDCurrent;return S._supplementalDataIDLast&&!S._supplementalDataIDLastConsumed[e]?(i=S._supplementalDataIDLast,S._supplementalDataIDLastConsumed[e]=!0):i&&(S._supplementalDataIDCurrentConsumed[e]&&(S._supplementalDataIDLast=S._supplementalDataIDCurrent,S._supplementalDataIDLastConsumed=S._supplementalDataIDCurrentConsumed,S._supplementalDataIDCurrent=i=t?"":S._generateID(1),S._supplementalDataIDCurrentConsumed={}),i&&(S._supplementalDataIDCurrentConsumed[e]=!0)),i},S.getOptOut=function(e,t){if(S.isAllowed()){var i=S._getAudienceManagerURLData("_setMarketingCloudFields"),n=i.url;return S._getRemoteField("MCOPTOUT",n,e,t,i)}return""},S.isOptedOut=function(e,t,i){if(S.isAllowed()){t||(t=A.OptOut.GLOBAL);var n=S.getOptOut(function(i){var n=i===A.OptOut.GLOBAL||i.indexOf(t)>=0;S._callCallback(e,[n])},i);return n?n===A.OptOut.GLOBAL||n.indexOf(t)>=0:null}return!1},S._fields=null,S._fieldsExpired=null,S._hash=function(e){var t,i,n=0;if(e)for(t=0;t<e.length;t++)i=e.charCodeAt(t),n=(n<<5)-n+i,n&=n;return n},S._generateID=f,S._generateLocalMID=function(){var e=S._generateID(0);return N.isClientSideMarketingCloudVisitorID=!0,e},S._callbackList=null,S._callCallback=function(e,t){try{"function"==typeof e?e.apply(M,t):e[1].apply(e[0],t)}catch(e){}},S._registerCallback=function(e,t){t&&(null==S._callbackList&&(S._callbackList={}),void 0==S._callbackList[e]&&(S._callbackList[e]=[]),S._callbackList[e].push(t))},S._callAllCallbacks=function(e,t){if(null!=S._callbackList){var i=S._callbackList[e];if(i)for(;i.length>0;)S._callCallback(i.shift(),t)}},S._addQuerystringParam=function(e,t,i,n){var r=encodeURIComponent(t)+"="+encodeURIComponent(i),a=F.parseHash(e),s=F.hashlessUrl(e);if(-1===s.indexOf("?"))return s+"?"+r+a;var o=s.split("?"),l=o[0]+"?",u=o[1];return l+F.addQueryParamAtLocation(u,r,n)+a},S._extractParamFromUri=function(e,t){var i=new RegExp("[\\?&#]"+t+"=([^&#]*)"),n=i.exec(e);if(n&&n.length)return decodeURIComponent(n[1])},S._parseAdobeMcFromUrl=_(m.ADOBE_MC),S._parseAdobeMcSdidFromUrl=_(m.ADOBE_MC_SDID),S._attemptToPopulateSdidFromUrl=function(t){var i=S._parseAdobeMcSdidFromUrl(t),n=1e9;i&&i.TS&&(n=F.getTimestampInSeconds()-i.TS),i&&i.SDID&&i.MCORGID===e&&n<S.sdidParamExpiry&&(S._supplementalDataIDCurrent=i.SDID,S._supplementalDataIDCurrentConsumed.SDID_URL_PARAM=!0)},
		S._attemptToPopulateIdsFromUrl=function(){var t=S._parseAdobeMcFromUrl();if(t&&t.TS){var i=F.getTimestampInSeconds(),
			n=i-t.TS;if(Math.floor(n/60)>m.ADOBE_MC_TTL_IN_MIN||t.MCORGID!==e)return;h(t)}},S._mergeServerState=function(e){if(e)try{if(e=function(e){return F.isObject(e)?e:JSON.parse(e)}(e),e[S.marketingCloudOrgID]){var t=e[S.marketingCloudOrgID];!function(e){F.isObject(e)&&S.setCustomerIDs(e)}
		(t.customerIDs),C(t.sdid)}}catch(e){throw new Error("`serverState` has an invalid format.")}},S._timeout=null,S._loadData=function(e,t,i,n){t=S._addQuerystringParam(t,"d_fieldgroup",e,1),n.url=S._addQuerystringParam(n.url,"d_fieldgroup",e,1),n.corsUrl=S._addQuerystringParam(n.corsUrl,"d_fieldgroup",e,1),N.fieldGroupObj[e]=!0,n===Object(n)&&n.corsUrl&&"XMLHttpRequest"===R.corsMetadata.corsType&&R.fireCORS(n,i,e)},S._clearTimeout=function(e){null!=S._timeout&&S._timeout[e]&&(clearTimeout(S._timeout[e]),S._timeout[e]=0)},S._settingsDigest=0,S._getSettingsDigest=function(){if(!S._settingsDigest){var e=S.version;
			S.audienceManagerServer&&(e+="|"+S.audienceManagerServer),S.audienceManagerServerSecure&&(e+="|"+S.audienceManagerServerSecure),S._settingsDigest=S._hash(e)}return S._settingsDigest},S._readVisitorDone=!1,S._readVisitor=function(){if(!S._readVisitorDone){S._readVisitorDone=!0;var e,t,i,n,r,a,s=S._getSettingsDigest(),o=!1,l=S.cookieRead(S.cookieName),u=new Date;if(null==S._fields&&(S._fields={}),l&&"T"!==l)for(l=l.split("|"),l[0].match(/^[\-0-9]+$/)&&(parseInt(l[0],10)!==s&&(o=!0),l.shift()),l.length%2==1&&l.pop(),e=0;e<l.length;e+=2)t=l[e].split("-"),i=t[0],n=l[e+1],t.length>1?(r=parseInt(t[1],10),a=t[1].indexOf("s")>0):(r=0,a=!1),o&&("MCCIDH"===i&&(n=""),r>0&&(r=u.getTime()/1e3-60)),i&&n&&(S._setField(i,n,1),r>0&&(S._fields["expire"+i]=r+(a?"s":""),(u.getTime()>=1e3*r||a&&!S.cookieRead(S.sessionCookieName))&&(S._fieldsExpired||(S._fieldsExpired={}),S._fieldsExpired[i]=!0)));!S._getField(E)&&F.isTrackingServerPopulated()&&(l=S.cookieRead("s_vi"))&&(l=l.split("|"),l.length>1&&l[0].indexOf("v1")>=0&&(n=l[1],e=n.indexOf("["),e>=0&&(n=n.substring(0,e)),n&&n.match(m.VALID_VISITOR_ID_REGEX)&&S._setField(E,n)))}},S._appendVersionTo=function(e){var t="vVersion|"+S.version,i=e?S._getCookieVersion(e):null;return i?d.areVersionsDifferent(i,S.version)&&(e=e.replace(m.VERSION_REGEX,t)):e+=(e?"|":"")+t,e},S._writeVisitor=function(){var e,t,i=S._getSettingsDigest();for(e in S._fields)P(e)&&S._fields[e]&&"expire"!==e.substring(0,6)&&(t=S._fields[e],i+=(i?"|":"")+e+(S._fields["expire"+e]?"-"+S._fields["expire"+e]:"")+"|"+t);i=S._appendVersionTo(i),
		S.cookieWrite(S.cookieName,i,1)},S._getField=function(e,t){return null==S._fields||!t&&S._fieldsExpired&&S._fieldsExpired[e]?null:S._fields[e]},S._setField=function(e,t,i){null==S._fields&&(S._fields={}),S._fields[e]=t,i||S._writeVisitor()},S._getFieldList=function(e,t){var i=S._getField(e,t);return i?i.split("*"):null},S._setFieldList=function(e,t,i){S._setField(e,t?t.join("*"):"",i)},S._getFieldMap=function(e,t){var i=S._getFieldList(e,t);if(i){var n,r={};for(n=0;n<i.length;n+=2)r[i[n]]=i[n+1];return r}return null},S._setFieldMap=function(e,t,i){var n,r=null;if(t){r=[];for(n in t)P(n)&&(r.push(n),r.push(t[n]))}S._setFieldList(e,r,i)},S._setFieldExpire=function(e,t,i){var n=new Date;n.setTime(n.getTime()+1e3*t),null==S._fields&&(S._fields={}),S._fields["expire"+e]=Math.floor(n.getTime()/1e3)+(i?"s":""),t<0?(S._fieldsExpired||(S._fieldsExpired={}),S._fieldsExpired[e]=!0):S._fieldsExpired&&(S._fieldsExpired[e]=!1),i&&(S.cookieRead(S.sessionCookieName)||S.cookieWrite(S.sessionCookieName,"1"))},S._findVisitorID=function(e){return e&&("object"==typeof e&&(e=e.d_mid?e.d_mid:e.visitorID?e.visitorID:e.id?e.id:e.uuid?e.uuid:""+e),e&&"NOTARGET"===(e=e.toUpperCase())&&(e=w),e&&(e===w||e.match(m.VALID_VISITOR_ID_REGEX))||(e="")),e},S._setFields=function(e,t){if(S._clearTimeout(e),null!=S._loading&&(S._loading[e]=!1),N.fieldGroupObj[e]&&N.setState(e,!1),"MC"===e){!0!==N.isClientSideMarketingCloudVisitorID&&(N.isClientSideMarketingCloudVisitorID=!1);var i=S._getField(b);if(!i||S.overwriteCrossDomainMCIDAndAID){if(!(i="object"==typeof t&&t.mid?t.mid:S._findVisitorID(t))){if(S._use1stPartyMarketingCloudServer&&!S.tried1stPartyMarketingCloudServer)return S.tried1stPartyMarketingCloudServer=!0,void S.getAnalyticsVisitorID(null,!1,!0);i=S._generateLocalMID()}S._setField(b,i)}i&&i!==w||(i=""),"object"==typeof t&&((t.d_region||t.dcs_region||t.d_blob||t.blob)&&S._setFields(k,t),S._use1stPartyMarketingCloudServer&&t.mid&&S._setFields(T,{id:t.id})),S._callAllCallbacks(b,[i])}if(e===k&&"object"==typeof t){var n=604800;void 0!=t.id_sync_ttl&&t.id_sync_ttl&&(n=parseInt(t.id_sync_ttl,10));var r=x.getRegionAndCheckIfChanged(t,n);S._callAllCallbacks("MCAAMLH",[r]);var a=S._getField(L);(t.d_blob||t.blob)&&(a=t.d_blob,a||(a=t.blob),S._setFieldExpire(L,n),S._setField(L,a)),a||(a=""),S._callAllCallbacks(L,[a]),!t.error_msg&&S._newCustomerIDsHash&&S._setField("MCCIDH",S._newCustomerIDsHash)}if(e===T){var s=S._getField(E);s&&!S.overwriteCrossDomainMCIDAndAID||(s=S._findVisitorID(t),s?s!==w&&S._setFieldExpire(L,-1):s=w,S._setField(E,s)),s&&s!==w||(s=""),S._callAllCallbacks(E,[s])}if(S.idSyncDisableSyncs||S.disableIdSyncs)x.idCallNotProcesssed=!0;else{x.idCallNotProcesssed=!1;var o={};o.ibs=t.ibs,o.subdomain=t.subdomain,x.processIDCallData(o)}if(t===Object(t)){var l,u;S.isAllowed()&&(l=S._getField("MCOPTOUT")),l||(l=w,t.d_optout&&t.d_optout instanceof Array&&(l=t.d_optout.join(",")),u=parseInt(t.d_ottl,10),isNaN(u)&&(u=7200),S._setFieldExpire("MCOPTOUT",u,!0),S._setField("MCOPTOUT",l)),S._callAllCallbacks("MCOPTOUT",[l])}},S._loading=null,S._getRemoteField=function(e,t,i,n,r){var a,s="",o=F.isFirstPartyAnalyticsVisitorIDCall(e),l={MCAAMLH:!0,MCAAMB:!0};if(S.isAllowed()){S._readVisitor(),s=S._getField(e,!0===l[e]);if(function(){return(!s||S._fieldsExpired&&S._fieldsExpired[e])&&(!S.disableThirdPartyCalls||o)}()){if(e===b||"MCOPTOUT"===e?a="MC":"MCAAMLH"===e||e===L?a=k:e===E&&(a=T),a)return!t||null!=S._loading&&S._loading[a]||(null==S._loading&&(S._loading={}),S._loading[a]=!0,S._loadData(a,t,function(t){if(!S._getField(e)){t&&N.setState(a,!0);var i="";e===b?i=S._generateLocalMID():a===k&&(i={error_msg:"timeout"}),S._setFields(a,i)}},r)),S._registerCallback(e,i),s||(t||S._setFields(a,{id:w}),"")}else s||(e===b?(S._registerCallback(e,i),s=S._generateLocalMID(),S.setMarketingCloudVisitorID(s)):e===E?(S._registerCallback(e,i),s="",S.setAnalyticsVisitorID(s)):(s="",n=!0))}return e!==b&&e!==E||s!==w||(s="",n=!0),i&&n&&S._callCallback(i,[s]),s},S._setMarketingCloudFields=function(e){S._readVisitor(),S._setFields("MC",e)},S._mapCustomerIDs=function(e){S.getAudienceManagerBlob(e,!0)},S._setAnalyticsFields=function(e){S._readVisitor(),S._setFields(T,e)},S._setAudienceManagerFields=function(e){S._readVisitor(),S._setFields(k,e)},S._getAudienceManagerURLData=function(e){var t=S.audienceManagerServer,i="",n=S._getField(b),r=S._getField(L,!0),a=S._getField(E),s=a&&a!==w?"&d_cid_ic=AVID%01"+encodeURIComponent(a):"";if(S.loadSSL&&S.audienceManagerServerSecure&&(t=S.audienceManagerServerSecure),t){var o,l,u=S.getCustomerIDs();if(u)for(o in u)P(o)&&(l=u[o],
			s+="&d_cid_ic="+encodeURIComponent(o)+"%01"+encodeURIComponent(l.id?l.id:"")+(l.authState?"%01"+l.authState:""));e||(e="_setAudienceManagerFields");var d="http"+(S.loadSSL?"s":"")+"://"+t+"/id",c="d_visid_ver="+S.version+"&d_rtbd=json&d_ver=2"+(!n&&S._use1stPartyMarketingCloudServer?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(S.marketingCloudOrgID)+"&d_nsid="+(S.idSyncContainerID||0)+(n?"&d_mid="+encodeURIComponent(n):"")+(S.idSyncDisable3rdPartySyncing||S.disableThirdPartyCookies?"&d_coppa=true":"")+(!0===y?"&d_coop_safe=1":!1===y?"&d_coop_unsafe=1":"")+(r?"&d_blob="+encodeURIComponent(r):"")+s,f=["s_c_il",S._in,e];return i=d+"?"+c+"&d_cb=s_c_il%5B"+S._in+"%5D."+e,{url:i,corsUrl:d+"?"+c,callback:f}}return{url:i}},S.appendVisitorIDsTo=function(e){try{var t=[[b,S._getField(b)],[E,S._getField(E)],["MCORGID",S.marketingCloudOrgID]];return S._addQuerystringParam(e,m.ADOBE_MC,D(t))}catch(t){return e}},S.appendSupplementalDataIDTo=function(e,t){if(!(t=t||S.getSupplementalDataID(F.generateRandomString(),!0)))return e;try{var i=D([["SDID",t],["MCORGID",S.marketingCloudOrgID]]);return S._addQuerystringParam(e,m.ADOBE_MC_SDID,i)}catch(t){return e}};var F={parseHash:function(e){var t=e.indexOf("#");return t>0?e.substr(t):""},hashlessUrl:function(e){var t=e.indexOf("#");return t>0?e.substr(0,t):e},addQueryParamAtLocation:function(e,t,i){var n=e.split("&");return i=null!=i?i:n.length,n.splice(i,0,t),n.join("&")},isFirstPartyAnalyticsVisitorIDCall:function(e,t,i){if(e!==E)return!1;var n;return t||(t=S.trackingServer),i||(i=S.trackingServerSecure),!("string"!=typeof(n=S.loadSSL?i:t)||!n.length)&&(n.indexOf("2o7.net")<0&&n.indexOf("omtrdc.net")<0)},isObject:function(e){return Boolean(e&&e===Object(e))},removeCookie:function(e){document.cookie=encodeURIComponent(e)+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"},isTrackingServerPopulated:function(){return!!S.trackingServer||!!S.trackingServerSecure},getTimestampInSeconds:function(){return Math.round((new Date).getTime()/1e3)},parsePipeDelimetedKeyValues:function(e){return e.split("|").reduce(function(e,t){var i=t.split("=");return e[i[0]]=decodeURIComponent(i[1]),e},{})},generateRandomString:function(e){e=e||5;for(var t="",i="abcdefghijklmnopqrstuvwxyz0123456789";e--;)t+=i[Math.floor(Math.random()*i.length)];return t},parseBoolean:function(e){return"true"===e||"false"!==e&&null},replaceMethodsWithFunction:function(e,t){for(var i in e)e.hasOwnProperty(i)&&"function"==typeof e[i]&&(e[i]=t);return e},pluck:function(e,t){return t.reduce(function(t,i){return e[i]&&(t[i]=e[i]),t},Object.create(null))}};S._helpers=F;var x=p(S,A);S._destinationPublishing=x,S.timeoutMetricsLog=[];var V,N={isClientSideMarketingCloudVisitorID:null,MCIDCallTimedOut:null,AnalyticsIDCallTimedOut:null,AAMIDCallTimedOut:null,fieldGroupObj:{},setState:function(e,t){switch(e){case"MC":!1===t?!0!==this.MCIDCallTimedOut&&(this.MCIDCallTimedOut=!1):this.MCIDCallTimedOut=t;break;case T:!1===t?!0!==this.AnalyticsIDCallTimedOut&&(this.AnalyticsIDCallTimedOut=!1):this.AnalyticsIDCallTimedOut=t;break;case k:!1===t?!0!==this.AAMIDCallTimedOut&&(this.AAMIDCallTimedOut=!1):this.AAMIDCallTimedOut=t}}};S.isClientSideMarketingCloudVisitorID=function(){return N.isClientSideMarketingCloudVisitorID},S.MCIDCallTimedOut=function(){return N.MCIDCallTimedOut},S.AnalyticsIDCallTimedOut=function(){return N.AnalyticsIDCallTimedOut},S.AAMIDCallTimedOut=function(){return N.AAMIDCallTimedOut},S.idSyncGetOnPageSyncInfo=function(){return S._readVisitor(),S._getField("MCSYNCSOP")},S.idSyncByURL=function(e){var t=I(e||{});if(t.error)return t.error;var i,n,r=e.url,a=encodeURIComponent,s=x;return r=r.replace(/^https:/,"").replace(/^http:/,""),i=l.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],","),n=["ibs",a(e.dpid),"img",a(r),t.ttl,"",i],s.addMessage(n.join("|")),s.requestToProcess(),"Successfully queued"},S.idSyncByDataSource=function(e){return e===Object(e)&&"string"==typeof e.dpuuid&&e.dpuuid.length?(e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid,S.idSyncByURL(e)):"Error: config or config.dpuuid is empty"},S._getCookieVersion=function(e){e=e||S.cookieRead(S.cookieName);var t=m.VERSION_REGEX.exec(e);return t&&t.length>1?t[1]:null},S._resetAmcvCookie=function(e){var t=S._getCookieVersion();t&&!d.isLessThan(t,e)||F.removeCookie(S.cookieName)},S.setAsCoopSafe=function(){y=!0},S.setAsCoopUnsafe=function(){y=!1},S.init=function(){!function(){if(t&&"object"==typeof t){S.configs=Object.create(null);for(var e in t)P(e)&&(S[e]=t[e],S.configs[e]=t[e]);S.idSyncContainerID=S.idSyncContainerID||0,y="boolean"==typeof S.isCoopSafe?S.isCoopSafe:F.parseBoolean
		(S.isCoopSafe),S.resetBeforeVersion&&S._resetAmcvCookie(S.resetBeforeVersion),S._attemptToPopulateIdsFromUrl(),S._attemptToPopulateSdidFromUrl(),S._readVisitor();var i=S._getField(O),n=Math.ceil((new Date).getTime()/m.MILLIS_PER_DAY);S.idSyncDisableSyncs||S.disableIdSyncs||!x.canMakeSyncIDCall(i,n)||
		(S._setFieldExpire(L,-1),S._setField(O,n)),S.getMarketingCloudVisitorID(),S.getAudienceManagerLocationHint(),S.getAudienceManagerBlob(),S._mergeServerState(S.serverState)}else S._attemptToPopulateIdsFromUrl(),S._attemptToPopulateSdidFromUrl()}(),function(){if(!S.idSyncDisableSyncs&&!S.disableIdSyncs){x.checkDPIframeSrc();var e=function(){var e=x;e.readyToAttachIframe()&&e.attachIframe()};M.addEventListener("load",function(){A.windowLoaded=!0,e()});try{c.receiveMessage(function(e){x.receiveMessage(e.data)},x.iframeHost)}catch(e){}}}(),function(){S.whitelistIframeDomains&&m.POST_MESSAGE_ENABLED&&(S.whitelistIframeDomains=S.whitelistIframeDomains instanceof Array?S.whitelistIframeDomains:[S.whitelistIframeDomains],S.whitelistIframeDomains.forEach(function(t){var i=new r(e,t),n=a(S,i);c.receiveMessage(n,t)}))}()}};_.getInstance=function(e,t)
		{if(!e)throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");e.indexOf("@")<0&&(e+="@AdobeOrg");var r=function(){var t=i.s_c_il;if(t)for(var n=0;n<t.length;n++){var r=t[n];if(r&&"Visitor"===r._c&&r.marketingCloudOrgID===e)return r}}();if(r)return r;var a=e,s=a.split("").reverse().join(""),o=new _(e,null,s);!function(){i.s_c_il.splice(--i.s_c_in,1)}();var u=l.getIeVersion();if("number"==typeof u&&u<10)return o._helpers.replaceMethodsWithFunction(o,function(){});var d=o.isAllowed(),c=function(){try{return i.self!==i.parent}catch(e){return!0}}()&&!d&&i.parent?new n(e,t,o,i.parent):new _(e,t,s);return o=null,c.init(),c},function(){function e(){_.windowLoaded=!0}i.addEventListener?i.addEventListener("load",e):i.attachEvent&&i.attachEvent("onload",e),_.codeLoadEnd=(new Date).getTime()}(),i.Visitor=_,t.exports=_}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./child/ChildVisitor":2,"./child/Message":3,"./child/makeChildMessageListener":4,"./units/crossDomain":8,"./units/makeCorsRequest":9,"./units/makeDestinationPublishing":10,"./units/version":11,"./utils/asyncParallelApply":12,"./utils/constants":14,"./utils/enums":15,"./utils/getDomain":16,"./utils/utils":18,"@adobe-mcid/visitor-js-shared/lib/ids/generateRandomID":19}],2:[function(e,t,i){(function(i){e("../utils/polyfills");var n=e("./strategies/LocalVisitor"),r=e("./strategies/ProxyVisitor"),a=e("./strategies/PlaceholderVisitor"),s=e("../utils/callbackRegistryFactory"),o=e("./Message"),l=e("../utils/enums"),u=l.MESSAGES;t.exports=function(e,t,l,d){function c(e){Object.assign(I,e)}function f(e){Object.assign(I.state,e),I.callbackRegistry.executeAll(I.state)}function g(e){if(!A.isInvalid(e)){M=!1;var t=A.parse(e);I.setStateAndPublish(t.state)}}function p(e){!M&&S&&(M=!0,A.send(d,e))}function m(){c(new n(l._generateID)),I.getMarketingCloudVisitorID(),I.callbackRegistry.executeAll(I.state,!0),i.removeEventListener("message",_)}function _(e){if(!A.isInvalid(e)){var t=A.parse(e);M=!1,i.clearTimeout(this.timeout),i.removeEventListener("message",_),c(new r(I)),i.addEventListener("message",g),I.setStateAndPublish(t.state),I.callbackRegistry.hasCallbacks()&&p(u.GETSTATE)}}function h(){S&&postMessage?(i.addEventListener("message",_),p(u.HANDSHAKE),this.timeout=setTimeout(m,250)):m()}function C(){i.s_c_in||(i.s_c_il=[],i.s_c_in=0),I._c="Visitor",I._il=i.s_c_il,I._in=i.s_c_in,I._il[I._in]=I,i.s_c_in++}function D(){function e(e){0!==e.indexOf("_")&&"function"==typeof l[e]&&(I[e]=function(){})}Object.keys(l).forEach(e),I.getSupplementalDataID=l.getSupplementalDataID}var I=this,S=t.whitelistParentDomain;I.state={},I.version=l.version,I.marketingCloudOrgID=e;var M=!1,A=new o(e,S);I.callbackRegistry=s(),I.init=function(){C(),D(),c(new a(I)),h()},I.findField=function(e,t){if(I.state[e])return t(I.state[e]),I.state[e]},I.messageParent=p,I.setStateAndPublish=f}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/callbackRegistryFactory":13,"../utils/enums":15,"../utils/polyfills":17,"./Message":3,"./strategies/LocalVisitor":5,"./strategies/PlaceholderVisitor":6,"./strategies/ProxyVisitor":7}],3:[function(e,t,i){var n=e("../utils/enums"),r=n.MESSAGES,a={0:"prefix",1:"orgID",2:"state"};t.exports=function(e,t){this.parse=function(e){try{var t={};return e.data.split("|").forEach(function(e,i){if(void 0!==e){t[a[i]]=2!==i?e:JSON.parse(e)}}),t}catch(e){}},this.isInvalid=function(i){var n=this.parse(i);if(!n||Object.keys(n).length<2)return!0;var a=e!==n.orgID,s=!t||i.origin!==t,o=-1===Object.keys(r).indexOf(n.prefix);return a||s||o},this.send=function(i,n,r){var a=n+"|"+e;r&&r===Object(r)&&(a+="|"+JSON.stringify(r));try{i.postMessage(a,t)}catch(e){}}}},{"../utils/enums":15}],4:[function(e,t,i){var n=e("../utils/enums"),r=e("../utils/utils"),a=n.MESSAGES,s=n.ALL_APIS,o=n.ASYNC_API_MAP,l=n.FIELDGROUP_TO_FIELD;t.exports=function(e,t){function i(){var t={};return Object.keys(s).forEach(function(i){var n=s[i],a=e[n]();r.isValueEmpty(a)||(t[i]=a)}),t}function n(){var t=[];return e._loading&&Object.keys(e._loading).forEach(function(i){if(e._loading[i]){var n=l[i];t.push(n)}}),t.length?t:null}function u(t){return function i(r){var a=n();if(a){var s=o[a[0]];e[s](i,!0)}else t()}}function d(e,n){var r=i();t.send(e,n,r)}function c(e){g(e),d(e,a.HANDSHAKE)}function f(e){u(function(){d(e,a.PARENTSTATE)})()}function g(i){function n(n){r.call(e,n),t.send(i,a.PARENTSTATE,{CUSTOMERIDS:e.getCustomerIDs()})}
var r=e.setCustomerIDs;e.setCustomerIDs=n}return function(e){if(!t.isInvalid(e)){(t.parse(e).prefix===a.HANDSHAKE?c:f)(e.source)}}}},{"../utils/enums":15,"../utils/utils":18}],5:[function(e,t,i){var n=e("../../utils/enums"),r=n.STATE_KEYS_MAP;t.exports=function(e){function t(){}function i(t,i){var n=this;return function(){var t=e(0,r.MCMID),a={};return a[r.MCMID]=t,n.setStateAndPublish(a),i(t),t}}this.getMarketingCloudVisitorID=function(e){e=e||t;var n=this.findField(r.MCMID,e),a=i.call(this,r.MCMID,e);return void 0!==n?n:a()}}},{"../../utils/enums":15}],6:[function(e,t,i){var n=e("../../utils/enums"),r=n.ASYNC_API_MAP;t.exports=function(){Object.keys(r).forEach(function(e){this[r[e]]=function(t){this.callbackRegistry.add(e,t)}},this)}},{"../../utils/enums":15}],7:[function(e,t,i){var n=e("../../utils/enums"),r=n.MESSAGES,a=n.ASYNC_API_MAP,s=n.SYNC_API_MAP;t.exports=function(){function e(){}function t(e,t){var i=this;return function(){return i.callbackRegistry.add(e,t),i.messageParent(r.GETSTATE),""}}function i(i){this[a[i]]=function(n){n=n||e;var r=this.findField(i,n),a=t.call(this,i,n);return void 0!==r?r:a()}}function n(t){this[s[t]]=function(){return this.findField(t,e)||{}}}Object.keys(a).forEach(i,this),Object.keys(s).forEach(n,this)}},{"../../utils/enums":15}],8:[function(e,t,i){(function(e){var i=!!e.postMessage;t.exports={postMessage:function(e,t,n){var r=1;t&&(i?n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(n.location=t.replace(/#.*$/,"")+"#"+ +new Date+r+++"&"+e))},receiveMessage:function(t,n){var r;try{i&&(t&&(r=function(e){if("string"==typeof n&&e.origin!==n||"[object Function]"===Object.prototype.toString.call(n)&&!1===n(e.origin))return!1;t(e)}),e.addEventListener?e[t?"addEventListener":"removeEventListener"]("message",r):e[t?"attachEvent":"detachEvent"]("onmessage",r))}catch(e){}}}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(e,t,i){(function(e){t.exports=function(t,i){return{corsMetadata:function(){var t="none",i=!0;return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?t="XMLHttpRequest":"undefined"!=typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(i=!1),Object.prototype.toString.call(e.HTMLElement).indexOf("Constructor")>0&&(i=!1)),{corsType:t,corsCookiesEnabled:i}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new e[this.corsMetadata.corsType]},fireCORS:function(i,n,r){function a(t){var n;try{if((n=JSON.parse(t))!==Object(n))return void s.handleCORSError(i,null,"Response is not JSON")}catch(e){return void s.handleCORSError(i,e,"Error parsing response as JSON")}try{for(var r=i.callback,a=e,o=0;o<r.length;o++)a=a[r[o]];a(n)}catch(e){s.handleCORSError(i,e,"Error forming callback function")}}var s=this;n&&(i.loadErrorHandler=n);try{var o=this.getCORSInstance();o.open("get",i.corsUrl+"&ts="+(new Date).getTime(),!0),"XMLHttpRequest"===this.corsMetadata.corsType&&(o.withCredentials=!0,o.timeout=t.loadTimeout,o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4===this.readyState&&200===this.status&&a(this.responseText)}),o.onerror=function(e){s.handleCORSError(i,e,"onerror")},o.ontimeout=function(e){s.handleCORSError(i,e,"ontimeout")},o.send(),t._log.requests.push(i.corsUrl)}catch(e){this.handleCORSError(i,e,"try-catch")}},handleCORSError:function(e,i,n){t.CORSErrors.push({corsData:e,error:i,description:n}),e.loadErrorHandler&&("ontimeout"===n?e.loadErrorHandler(!0):e.loadErrorHandler(!1))}}}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(e,t,i){(function(i){var n=e("../utils/constants"),r=e("./crossDomain"),a=e("../utils/utils");t.exports=function(e,t){var s=i.document;return{THROTTLE_START:3e4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:null,onPagePixels:[],iframeHost:null,getIframeHost:function(e){if("string"==typeof e){var t=e.split("/");return t[0]+"//"+t[2]}},subdomain:null,url:null,getUrl:function(){var t,i="http://fast.",n="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(s.location.href);return this.subdomain||(this.subdomain="nosubdomainreturned"),e.loadSSL&&(i=e.idSyncSSLUseAkamai?"https://fast.":"https://"),t=i+this.subdomain+".demdex.net/dest5.html"+n,this.iframeHost=this.getIframeHost(t),
this.id="destination_publishing_iframe_"+this.subdomain+"_"+e.idSyncContainerID,t},checkDPIframeSrc:function(){var t="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(s.location.href);"string"==typeof e.dpIframeSrc&&e.dpIframeSrc.length&&(this.id="destination_publishing_iframe_"+(e._subdomain||this.subdomain||(new Date).getTime())+"_"+e.idSyncContainerID,this.iframeHost=this.getIframeHost(e.dpIframeSrc),this.url=e.dpIframeSrc+t)},idCallNotProcesssed:null,doAttachIframe:!1,startedAttachingIframe:!1,iframeHasLoaded:null,iframeIdChanged:null,newIframeCreated:null,originalIframeHasLoadedAlready:null,regionChanged:!1,timesRegionChanged:0,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:n.POST_MESSAGE_ENABLED?null:100,jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,readyToAttachIframe:function(){return!e.idSyncDisable3rdPartySyncing&&(this.doAttachIframe||e._doAttachIframe)&&(this.subdomain&&"nosubdomainreturned"!==this.subdomain||e._subdomain)&&this.url&&!this.startedAttachingIframe},attachIframe:function(){function e(){n=s.createElement("iframe"),n.sandbox="allow-scripts allow-same-origin",n.title="Adobe ID Syncing iFrame",n.id=i.id,n.name=i.id+"_name",n.style.cssText="display: none; width: 0; height: 0;",n.src=i.url,i.newIframeCreated=!0,t(),s.body.appendChild(n)}function t(){n.addEventListener("load",function(){n.className="aamIframeLoaded",i.iframeHasLoaded=!0,i.requestToProcess()})}this.startedAttachingIframe=!0;var i=this,n=s.getElementById(this.id);n?"IFRAME"!==n.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==n.className?(this.originalIframeHasLoadedAlready=!1,t()):(this.originalIframeHasLoadedAlready=!0,this.iframeHasLoaded=!0,this.iframe=n,this.requestToProcess())):e(),this.iframe=n},requestToProcess:function(t){function i(){a.jsonForComparison.push(t),a.jsonWaiting.push(t),a.processSyncOnPage(t)}var r,a=this;if(t===Object(t)&&t.ibs)if(r=JSON.stringify(t.ibs||[]),this.jsonForComparison.length){var s,o,l,u=!1;for(s=0,o=this.jsonForComparison.length;s<o;s++)if(l=this.jsonForComparison[s],r===JSON.stringify(l.ibs||[])){u=!0;break}u?this.jsonDuplicates.push(t):i()}else i();if((this.receivedThirdPartyCookiesNotification||!n.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var d=this.jsonWaiting.shift();this.process(d),this.requestToProcess()}!e.idSyncDisableSyncs&&this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){a.messageSendingInterval=n.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},getRegionAndCheckIfChanged:function(t,i){var n=e._getField("MCAAMLH"),r=t.d_region||t.dcs_region;return n?r&&(e._setFieldExpire("MCAAMLH",i),e._setField("MCAAMLH",r),parseInt(n,10)!==r&&(this.regionChanged=!0,this.timesRegionChanged++,e._setField("MCSYNCSOP",""),e._setField("MCSYNCS",""),n=r)):(n=r)&&(e._setFieldExpire("MCAAMLH",i),e._setField("MCAAMLH",n)),n||(n=""),n},processSyncOnPage:function(e){var t,i,n,r;if((t=e.ibs)&&t instanceof Array&&(i=t.length))for(n=0;n<i;n++)r=t[n],r.syncOnPage&&this.checkFirstPartyCookie(r,"","syncOnPage")},process:function(e){var t,i,n,r,s,o=encodeURIComponent,l=!1;if((t=e.ibs)&&t instanceof Array&&(i=t.length))for(l=!0,n=0;n<i;n++)r=t[n],s=[o("ibs"),o(r.id||""),o(r.tag||""),a.encodeAndBuildRequest(r.url||[],","),o(r.ttl||""),"","",r.fireURLSync?"true":"false"],r.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(s.join("|")):r.fireURLSync&&this.checkFirstPartyCookie(r,s.join("|")));l&&this.jsonProcessed.push(e)},checkFirstPartyCookie:function(t,i,r){var a="syncOnPage"===r,s=a?"MCSYNCSOP":"MCSYNCS";e._readVisitor();var o,l,u=e._getField(s),d=!1,c=!1,f=Math.ceil((new Date).getTime()/n.MILLIS_PER_DAY);u?(o=u.split("*"),l=this.pruneSyncData(o,t.id,f),d=l.dataPresent,c=l.dataValid,d&&c||this.fireSync(a,t,i,o,s,f)):(o=[],this.fireSync(a,t,i,o,s,f))},pruneSyncData:function(e,t,i){var n,r,a,s=!1,o=!1;for(r=0;r<e.length;r++)n=e[r],a=parseInt(n.split("-")[1],10),n.match("^"+t+"-")?(s=!0,i<a?o=!0:(e.splice(r,1),r--)):i>=a&&(e.splice(r,1),r--);return{dataPresent:s,dataValid:o}},manageSyncsSize:function(e){if(e.join("*").length>this.MAX_SYNCS_LENGTH)for(e.sort(function(e,t){return parseInt(e.split("-")[1],10)-parseInt(t.split("-")[1],10)});e.join("*").length>this.MAX_SYNCS_LENGTH;)e.shift()},fireSync:function(t,i,n,r,a,s){var o=this;if(t){if("img"===i.tag){var l,u,d,c,f=i.url,g=e.loadSSL?"https:":"http:";for(l=0,u=f.length;l<u;l++){d=f[l],c=/^\/\//.test(d);var p=new 
	Image;p.addEventListener("load",function(t,i,n,r){return function(){o.onPagePixels[t]=null,e._readVisitor();var s,l=e._getField(a),u=[];if(l){s=l.split("*");var d,c,f;for(d=0,c=s.length;d<c;d++)f=s[d],f.match("^"+i.id+"-")||u.push(f)}o.setSyncTrackingData(u,i,n,r)}}(this.onPagePixels.length,i,a,s)),p.src=(c?g:"")+d,this.onPagePixels.push(p)}}}else this.addMessage(n),this.setSyncTrackingData(r,i,a,s)},addMessage:function(t){var i=encodeURIComponent,r=i(e._enableErrorReporting?"---destpub-debug---":"---destpub---");this.messages.push((n.POST_MESSAGE_ENABLED?"":r)+t)},setSyncTrackingData:function(t,i,n,r){t.push(i.id+"-"+(r+Math.ceil(i.ttl/60/24))),this.manageSyncsSize(t),e._setField(n,t.join("*"))},sendMessages:function(){var e,t=this,i="",r=encodeURIComponent;this.regionChanged&&(i=r("---destpub-clear-dextp---"),this.regionChanged=!1),this.messages.length?n.POST_MESSAGE_ENABLED?(e=i+r("---destpub-combined---")+this.messages.join("%01"),this.postMessage(e),this.messages=[],
	this.sendingMessages=!1):(e=this.messages.shift(),this.postMessage(i+e),setTimeout(function(){t.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(e){r.postMessage(e,this.url,this.iframe.contentWindow),this.messagesPosted.push(e)},receiveMessage:function(e){var t,i=/^---destpub-to-parent---/;"string"==typeof e&&i.test(e)&&(t=e.replace(i,"").split("|"),"canSetThirdPartyCookies"===t[0]&&(this.canSetThirdPartyCookies="true"===t[1],this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(e))},processIDCallData:function(i){(null==this.url||i.subdomain&&"nosubdomainreturned"===this.subdomain)&&("string"==typeof e._subdomain&&e._subdomain.length?this.subdomain=e._subdomain:this.subdomain=i.subdomain||"",this.url=this.getUrl()),i.ibs instanceof Array&&i.ibs.length&&(this.doAttachIframe=!0),this.readyToAttachIframe()&&(e.idSyncAttachIframeOnWindowLoad?(t.windowLoaded||"complete"===s.readyState||"loaded"===s.readyState)&&this.attachIframe():this.attachIframeASAP()),"function"==typeof e.idSyncIDCallResult?e.idSyncIDCallResult(i):this.requestToProcess(i),"function"==typeof e.idSyncAfterIDCallResult&&e.idSyncAfterIDCallResult(i)},canMakeSyncIDCall:function(t,i){return e._forceSyncIDCall||!t||i-t>n.DAYS_BETWEEN_SYNC_ID_CALLS},attachIframeASAP:function(){function e(){t.startedAttachingIframe||(s.body?t.attachIframe():setTimeout(e,30))}var t=this;e()}}}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/constants":14,"../utils/utils":18,"./crossDomain":8}],11:[function(e,t,i){function n(e){for(var t=/^\d+$/,i=0,n=e.length;i<n;i++)if(!t.test(e[i]))return!1;return!0}function r(e,t){for(;e.length<t.length;)e.push("0");for(;t.length<e.length;)t.push("0")}function a(e,t){for(var i=0;i<e.length;i++){var n=parseInt(e[i],10),r=parseInt(t[i],10);if(n>r)return 1;if(r>n)return-1}return 0}function s(e,t){if(e===t)return 0;var i=e.toString().split("."),s=t.toString().split(".");return n(i.concat(s))?(r(i,s),a(i,s)):NaN}t.exports={compare:s,isLessThan:function(e,t){return s(e,t)<0},areVersionsDifferent:function(e,t){return 0!==s(e,t)},isGreaterThan:function(e,t){return s(e,t)>0},isEqual:function(e,t){return 0===s(e,t)}}},{}],12:[function(e,t,i){t.exports=function(e,t){function i(e){return function(i){n[e]=i,r++,r===a&&t(n)}}var n={},r=0,a=Object.keys(e).length;Object.keys(e).forEach(function(t){var n=e[t];if(n.fn){var r=n.args||[];r.unshift(i(t)),n.fn.apply(n.context||null,r)}})}},{}],13:[function(e,t,i){function n(){return{callbacks:{},add:function(e,t){this.callbacks[e]=this.callbacks[e]||[];var i=this.callbacks[e].push(t)-1;return function(){this.callbacks[e].splice(i,1)}},execute:function(e,t){if(this.callbacks[e]){t=void 0===t?[]:t,t=t instanceof Array?t:[t];try{for(;this.callbacks[e].length;){var i=this.callbacks[e].shift();"function"==typeof i?i.apply(null,t):i instanceof Array&&i[1].apply(i[0],t)}delete this.callbacks[e]}catch(e){}}},executeAll:function(e,t){(t||e&&!r.isObjectEmpty(e))&&Object.keys(this.callbacks).forEach(function(t){var i=void 0!==e[t]?e[t]:"";this.execute(t,i)},this)},hasCallbacks:function(){return Boolean(Object.keys(this.callbacks).length)}}}var r=e("./utils");t.exports=n},{"./utils":18}],14:[function(e,t,i){(function(e){t.exports={POST_MESSAGE_ENABLED:!!e.postMessage,DAYS_BETWEEN_SYNC_ID_CALLS:1,MILLIS_PER_DAY:864e5,ADOBE_MC:"adobe_mc",ADOBE_MC_SDID:"adobe_mc_sdid",VALID_VISITOR_ID_REGEX:/^[0-9a-fA-F\-]+$/,ADOBE_MC_TTL_IN_MIN:5,VERSION_REGEX:/vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,i){i.MESSAGES={HANDSHAKE:"HANDSHAKE",GETSTATE:"GETSTATE",PARENTSTATE:"PARENTSTATE"},i.STATE_KEYS_MAP={MCMID:"MCMID",MCAID:"MCAID",MCAAMB:"MCAAMB",MCAAMLH:"MCAAMLH",MCOPTOUT:"MCOPTOUT",CUSTOMERIDS:"CUSTOMERIDS"},i.ASYNC_API_MAP={MCMID:"getMarketingCloudVisitorID",MCAID:"getAnalyticsVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"getOptOut"},i.SYNC_API_MAP={CUSTOMERIDS:"getCustomerIDs"},i.ALL_APIS={MCMID:"getMarketingCloudVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"getOptOut",MCAID:"getAnalyticsVisitorID",CUSTOMERIDS:"getCustomerIDs"},i.FIELDGROUP_TO_FIELD={MC:"MCMID",A:"MCAID",AAM:"MCAAMB"},i.FIELDS={MCMID:"MCMID",MCOPTOUT:"MCOPTOUT",MCAID:"MCAID",MCAAMLH:"MCAAMLH",MCAAMB:"MCAAMB"},i.AUTH_STATE=
{UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},i.OPT_OUT={GLOBAL:"global"}},{}],16:[function(e,t,i){(function(e){t.exports=function(t){var i;if(!t&&e.location&&(t=e.location.hostname),i=t)if(/^[0-9.]+$/.test(i))i="";else{var n=",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,et,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,nz,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,",r=i.split("."),a=r.length-1,s=a-1;if(a>1&&r[a].length<=2&&(2===r[a-1].length||n.indexOf(","+r[a]+",")<0)&&s--,s>0)for(i="";a>=s;)i=r[a]+(i?".":"")+i,a--}return i}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(e,t,i){Object.assign=Object.assign||function(e){for(var t,i,n=1;n<arguments.length;++n){i=arguments[n];for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e}},{}],18:[function(e,t,i){i.isObjectEmpty=function(e){return e===Object(e)&&0===Object.keys(e).length},i.isValueEmpty=function(e){return""===e||i.isObjectEmpty(e)},i.getIeVersion=function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e;t=null}return null},i.encodeAndBuildRequest=function(e,t){return e.map(encodeURIComponent).join(t)}},{}],19:[function(e,t,i){t.exports=function(e){var t,i,n="0123456789",r="",a="",s=8,o=10,l=10;if(1==e){for(n+="ABCDEF",t=0;16>t;t++)i=Math.floor(Math.random()*s),r+=n.substring(i,i+1),i=Math.floor(Math.random()*s),a+=n.substring(i,i+1),s=16;return r+"-"+a}for(t=0;19>t;t++)i=Math.floor(Math.random()*o),r+=n.substring(i,i+1),0===t&&9==i?o=3:(1==t||2==t)&&10!=o&&2>i?o=10:2<t&&(o=10),i=Math.floor(Math.random()*l),a+=n.substring(i,i+1),0===t&&9==i?l=3:(1==t||2==t)&&10!=l&&2>i?l=10:2<t&&(l=10);return r+a}},{}]},{},[1]);



var s = new AppMeasurement();

var s_account = scodeConfig.account;
var s=s_gi(s_account)

//set visitor & mid
var visitor = Visitor.getInstance("8F9767C25245B3230A490D4C@AdobeOrg", {
    trackingServer: "analytic.cibc.com", // same as s.trackingServer
	trackingServerSecure: "analytics.cibc.com", //same as s.trackingServerSecure
    overwriteCrossDomainMCIDAndAID: true,
     // To enable CNAME support, add the following configuration variables
     // If you are not using CNAME, DO NOT include these variables
     marketingCloudServer: "analytic.cibc.com",
     marketingCloudServerSecure: "analytics.cibc.com" // same as s.trackingServerSecure
});
s.visitor = Visitor.getInstance("8F9767C25245B3230A490D4C@AdobeOrg");

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"

if(scodeConfig.brand == 'simplii' || scodeConfig.brand == 'pcf') {
	s.linkInternalFilters="javascript:,simplii.com,demo.simplii.com,mailto:,tel:,www.simplii.com"
}
else if(scodeConfig.brand == 'cibc') {
	s.linkInternalFilters="javascript:,cibc.com,demo.cibc.com,mailto:,tel:,cibc.via.infonow.net,cibc.intelliresponse.com"
}
else {
	console.error('Omniture: linkInternalFilters could not be set because brand is not set');
}

s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* Plugin Config */
s.usePlugins=true
// DTM Object Reference: https://marketing.adobe.com/resources/help/en_US/dtm/object_reference.pdf

//==== itrc capturing <a> click (cookie based) ====//

/* Cookie Read - AdTracking */
  /* Note: doPlugins is also called before link tracking. On IE, the adTracking cookie is 
  * set before doPlugins. So, the cookie is cleared before going to the next page. 
  * i.e. no adTracking value is passed into the next page. 
  * To prevent this, we need to check  (!s.linkURL) condition. s.linkURL is the "href" destination
  * when <a> item is clicked. Adobe Automated event listner on #document level.
  */

// code 1 in s_doPlugins(s) - DTM Adobe Analytics Tool, Custom Codes
function s_doPlugins(s) {
	/* Code Version */
	s.prop50="03-06-2018";
	s.events=s.apl(s.events,"event3",",",2);
	s_url=document.location.toString();
	s_path=document.location.pathname.toString();
	s.prop3=s.split(s_url, "?")[0];

	//TnT
	s.tnt=s.trackTNT();

	// hierarchy
	s.hier1 = s.channel;

	/* Campaign Tracking */
	//==== utrc in parameter (with/without hash, case insensitive) ====//

	var campaignCookie = s.Util.cookieRead("s_campaign");
	var utrc = "";
	var paramline = location.href.split("?");
	var params = paramline.pop().split("&");
	for (var i = 0; i < params.length; i++) {
		if (params[i].match(/utrc=/gi)) {
			utrc = params[i].split("=").pop();
			if (utrc !== "" && utrc !== campaignCookie) {
				s.campaign = utrc;
				s.Util.cookieWrite("s_campaign", utrc);
			}
		} //if
	} //for

	//====itrc in parameter (with/without hash, case insensitive) ====//
	/*
	- itrc parameter= set, V56 is not set, set V56 (all itrc)
	- itrc parameter= set, itrc start with M or O, V46 is not set, set V46
	- Identical rules for AEM, TMS and Product Application
	*/

	// code 1 in itrc-param, data element
	var itrc = "";
	var paramline = location.href.split("?");
	var params = paramline.pop().split("&");

	if (typeof params === "object") {
		for (var i = 0; i < params.length; i++) {
			if (params[i].match(/itrc=/gi)) {
				itrc= params[i].split("=").pop();
				if (itrc !== "") {
	  				if (itrc.match(/^[m]/gi) || itrc.match(/^[o]/gi) ) {
	   					s.eVar46 = itrc;
	  				}
					 s.eVar56 = itrc;
				}

			} //if
		} //for             
	}//if

	s.eVar31=s.getQueryParam("int_id");
	if(!s.eVar31){s.eVar31=s.getQueryParam("olbcom_id")};

	s.eVar32=s.getQueryParam("tid");
	s.eVar33=s.getQueryParam("cid");
	s.eVar34=s.getQueryParam("hpint_id");
	s.eVar44=s.getQueryParam("applyid");
	s.prop1=s.getAndPersistValue(s.campaign,"s_cmpPath",0);
	s.prop1=s.prop1?s.prop1+":"+s.pageName:"";

	/* Page Naming */
	if(!s.pageName) {
	   s_pg=s.repl(s_path,".html","");
	   s_pg=s.repl(s_pg,"/ca","");
	   s_pg=s.split(s_pg, "?")[0];
	   s.pageName=s_pg;
	}

	/* Language detection */
	if(!(s.prop2&&s.eVar2)) {
	if(s_url.indexOf("-fr.")>-1){s.prop2=s.eVar2="French";}
	else{s.prop2=s.eVar2="English";}
	}

	/* Get Percent Page Viewed */
	s.prop5=s.getPreviousValue(s.pageName,"s_pv");
	if (s.prop5){
	   ppV=s.getPercentPageViewed(s.pageName);
	   s.prop6=ppV[2];
	}

	/* To send the hit on an exit link */
	var s_exit=s.exitLinkHandler()
	if(s_exit){
	   s.prop5=s.getPreviousValue(s.pageName,"s_pv");
	   if (s.prop5){
	       s.linkTrackVars='prop5,prop6';
	           ppV=s.getPercentPageViewed();
	           s.prop6=ppV[2];
	   }
	}

	/* Visitor Information */
	s.prop7=s.getNewRepeat(2000);s.eVar7="D=c7";

	//Get Time Parting
	s.prop16=s.eVar5=s.getTimeParting('h', '-5')
	s.prop17=s.eVar6=s.getTimeParting('d', '-5')

	/* Search event is only tracked once */
	var t_search=s.getValOnce(s.eVar11,'s_ev11',0);
	if(t_search)
	{
	   s.events=s.apl(s.events,"event6",",",2);
	}

	//Get Time To Complete
	if(s.events && s.events.match(/event1($|\s|\,|\:)/))s.prop20='start';
	if(s.events && s.events.match(/event2($|\s|\,|\:)/))s.prop20='stop';
	s.prop20=s.getTimeToComplete(s.prop20,'ttc_c20',0);

	if(s.events && s.events.match(/event24($|\s|\,|\:)/))s.prop21='start';
	if(s.events && s.events.match(/event25($|\s|\,|\:)/))s.prop21='stop';
	s.prop21=s.getTimeToComplete(s.prop21,'ttc_c21',0);

	//Cross-Visit
	s.eVar8=s.crossVisitParticipation(s.campaign,'s_ev8','30','5','>','',0);

	/* URL Cleanup - This should be at the bottom of do plugins */
	s_url=document.location.toString();
	s.prop3=s_url;
	s.pageName=s.split(s.pageName, "?")[0];
	s.prop3=s.split(s_url, "?")[0];

	s.useForcedLinkTracking = false;
	s.forcedLinkTrackingTimeout = 500;
	if (!s.linkURL) { // proceed only for page tracking
		var ad = s.Util.cookieRead('adTracking');
		if (!ad) {
			s.Util.cookieWrite('adTracking','',0);
		} else {
			if (typeof ad === "string") { // checking if this is string
				if (ad.match(/^[m]/gi) || ad.match(/^[o]/gi) ) {
				  	s.eVar46 = ad;
				}
				s.eVar56 = ad;
				s.Util.cookieWrite('adTracking','',0);	
			}
		}
	} 

} // doPlugins
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/********************************************************************
*
* Main Plug-in code (should be in Plug-ins section)
*
*******************************************************************/
/*
* TNT Integration Plugin v2.1AM
*/
s.trackTNT=new Function("v","p","b",""
+"var s=this,n='s_tnt',q='s_tntref',p=(p)?p:n,v=(v)?v:n,r='',pm=false"
+",b=(b)?b:true;if(s.Util.getQueryParam(q)!=''){s.referrer=s.Util.get"
+"QueryParam(q);}else if(s.c_r(q)!=''){s.referrer=s.c_r(q);document.c"
+"ookie=q+'=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;';}else if("
+"(document.cookie.indexOf(q)!=-1&&s.c_r(q)=='')||(location.search.in"
+"dexOf(q+'=')!=-1&&s.Util.getQueryParam(q)=='')){s.referrer='Typed/B"
+"ookmarked';document.cookie=q+'=;path=/;expires=Thu, 01-Jan-1970 00:"
+"00:01 GMT;';}if(s.Util.getQueryParam(p)!=''){pm=s.Util.getQueryPara"
+"m(p);}else if(s.c_r(p)){pm=s.c_r(p);document.cookie=p+'=;path=/;exp"
+"ires=Thu, 01-Jan-1970 00:00:01 GMT;';}else if(s.c_r(p)==''&&s.Util."
+"getQueryParam(p)==''){pm='';}if(pm)r+=(pm+',');if(window[v]!=undefi"
+"ned)r+=window[v];if(b)window[v]='';return r;");
/*
*	Plug-in: crossVisitParticipation v1.7 - stacks values from
*	specified variable in cookie and returns value
*/
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*
* Plugin: getTimeToComplete 0.4 - return the time from start to stop
*/
s.getTimeToComplete=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");

/*
* Plugin: getTimeParting 3.1 
*/
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,B,C,D,U,W,X,Y,Z;d=new Date();A=d.getFullYear();if(A="
+"='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if(A=='2013'){B="
+"'10';C='03'}if(A=='2014'){B='09';C='02'}if(A=='2015'){B='08';C='01'"
+"}if(A=='2016'){B='13';C='06'}if(A=='2017'){B='12';C='05'}if(!B||!C)"
+"{B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000"
+"');if(D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}el"
+"se{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new Date(C);W=new Date"
+"();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.getTimezoneOffset()*"
+"60000);W=new Date(W+(3600000*z));X=['Sunday','Monday','Tuesday','We"
+"dnesday','Thursday','Friday','Saturday'];B=W.getHours();C=W.getMinu"
+"tes();if(C<10){C='0'+C};D=W.getDay();Z=X[D];U='AM';A='weekday';X='0"
+"0';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6|"
+"|D==0){A='weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availabl"
+"e'}else{if(t){if(t=='h'){return W}if(t=='m'){return B+':'+C+' '+U}i"
+"f(t=='d'){return Z}if(t=='w'){return A}if(t=='f'){return B+':'+C+' "
+"'+U+' - '+Z}}else{return Z+', '+W}}}");

/*
* Utility: AppMeasurement Compatibility v1.1
* Define deprecated H-code s properties and methods used by legacy plugins
*/
s.wd=window;
s.fl=new Function("x","l",""
+"return x?(''+x).substring(0,l):x");
s.pt=new Function("x","d","f","a",""
+"var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l"
+"]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs"
+"tring(z,x[l]);t=z<x[l]?t:''}return''");
s.rep=new Function("x","o","n",""
+"var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for("
+"i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){"
+"j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i"
+">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi"
+"n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape=new Function("x",""
+"var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y"
+"='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp"
+"onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf("
+"n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}"
+"else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub"
+"string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e="
+"h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='"
+"+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2"
+"B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)"
+"{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst"
+"ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst"
+"ring(i);i=x.indexOf('%',i)}}}return x");
s.epa=new Function("x",""
+"var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu"
+"nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape"
+"(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri=new Function("u",""
+"if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')"
+"==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr"
+"eateElement('a'),l=['href','protocol','host','hostname','port','pat"
+"hname','search','hash'],p,r={href:u,toString:function(){return this"
+".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p"
+"]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam"
+"e='/'+p;return r");
s.gtfs=new Function(""
+"var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot"
+"ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?"
+"d.referrer:d.location;return{location:s.parseUri(u)}");

/*
* Plugin: getQueryParam 2.4
*/
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");
/*
* Plugin: getValOnce_v1.0
*/
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
/*
* Plugin: getAndPersistValue 0.3 - get a value on every page
*/
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");
/*
* Plugin Utility: apl v1.1
*/
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");
/*
* Utility Function: split v1.5 (JS 1.0 compatible)
*/
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
* Plugin Utility: Replace v1.0
*/
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
* s.join: 1.0 - Joins an array into a string
*/
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
/*
* Plugin: getPercentPageViewed v1.74
*/
s.getPercentPageViewed=new Function("n",""
+"var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load"
+"','unload','scroll','resize','zoom','keyup','mouseup','touchend','o"
+"rientationchange','pan'],K='s_ppv',P=K+'l',I=n||s.pageName||documen"
+"t.location.href;W.s_Obj=s;if(!W.s_PPVevent){s.s_PPVg=function(n,o){"
+"var c=s.c_r(o?P:K)||'',a=c.indexOf(',')>-1?c.split(',',10):[''],i;a"
+"[0]=o?unescape(a[0]||''):I;for(i=1;i<9&&(i<a.length||!o);i++)a[i]=a"
+"[i]?parseInt(a[i])||0:0;if(a.length>9||!o)a[9]=a[9]&&a[9]!='L'&&a[9"
+"]!='LP'&&a[9]!='PL'?'P':a[9];return a};s.c_w(P,s.c_r(K)||'');s.c_w("
+"K,escape(I)+',0,0,0,0,0,0,0,0');W.s_PPVevent=function(e){var W=wind"
+"ow,D=document||{},B=D.body,E=D.documentElement||{},S=window.screen|"
+"|{},Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='clientWi"
+"dth',Hc='clientHeight',M=Math,C=100,J='object',N='number',Z=',',s=W"
+".s_Obj||W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('on'))e"
+"=e.substring(2);if(W.s_PPVt&&!e){clearTimeout(s_PPVt);s_PPVt=0}if(s"
+"&&typeof s==J&&B&&typeof B==J){var h=M.max(B[Hs]||E[Hs],B[Ho]||E[Ho"
+"],B[Hc]||E[Hc]||1),X=W.innerWidth||E[Wc]||B[Wc]||1,Y=W.innerHeight|"
+"|E[Hc]||B[Hc]||1,x=S.width||1,y=S.height||1,r=M.round(C*(W.devicePi"
+"xelRatio||1))/C,b=(D.pageYOffset||E[Ts]||B[Ts]||0)+Y,p=h>0&&b>0?M.r"
+"ound(C*b/h):1,O=W.orientation,o=!isNaN(O)?M.abs(O)%180:Y>X?0:90,a=s"
+".s_PPVg(n),L=(e=='load')||(a[1]<1),t,V=function(u,v,f,n){v=typeof v"
+"!=N?u:v;v=f||(u>v)?u:v;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iP"
+"od|iPad|iPhone)').exec((window.navigator&&navigator.userAgent)||'')"
+"&&o){t=x;x=y;y=t}o=o?'L':'P';a[9]=L||!a[9]?o:a[9].substring(0,1);if"
+"(a[9]!='L'&&a[9]!='P')a[9]=o;s.c_w(K,escape(a[0])+Z+V(a[1],p,!L)+Z+"
+"V(a[2],p,L)+Z+V(a[3],b,L,1)+Z+X+Z+Y+Z+x+Z+y+Z+r+Z+a[9]+(a[9]==o?'':"
+"o))}if(!W.s_PPVt&&e!='unload')W.s_PPVt=setTimeout(W.s_PPVevent,333)"
+"};for(var f=W.s_PPVevent,i=0;i<E.length;i++)if(EL)EL(E[i],f,false);"
+"else if(AE)AE('on'+E[i],f);f()};var a=s.s_PPVg(n,1);return!argument"
+"s.length||n=='-'?a[1]:a");/*
* Plugin: getPreviousValue v1.0 - return previous value of designated
*   variable (requires split utility)
*/
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
* Utility Function: p_gh
*/
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
/*
* Plugin: exitLinkHandler 0.5 - identify and report exit links
*/
s.exitLinkHandler=new Function("p",""
+"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
+"e&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;h="
+"s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=='e')s.li"
+"nkType='e';else h='';s[n]=t;return h;");
/*
* Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
*/
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
* Utility manageVars v1.4 - clear variable values (requires split 1.5)
*/
s.manageVars=new Function("c","l","f",""
+"var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
+"geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
+",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
+"'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
+"it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
+"a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
+"}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
+");return true;}else{return false;}");
s.clearVars=new Function("t","var s=this;s[t]='';");
s.lowercaseVars=new Function("t",""
+"var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index"
+"Of('D=')!=0){s[t]=s[t].toLowerCase();}}");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.trackingServer = "analytic.cibc.com";
s.trackingServerSecure = "analytics.cibc.com";

/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.7.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.7.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Rb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.yb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.yb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.ub=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.jb(a,function(){}))};a.jb=function(a,b){for(var d in a)a.hasOwnProperty(d)&&"function"===typeof a[d]&&(a[d]=b)};
a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,
a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=
c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Pb,f=a[e].Ob));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,
b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==
f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.Bb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+
",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Pb,m=a[e].Ob));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",
e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e=
"D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&
a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;
case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=
(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==
f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Ub||"undefined"!=""+a.Kb&&"HTML"!=(""+a.Kb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");
e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",
""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Sb=function(c){for(var b=a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Jb=function(){var c,b,d=a.linkObject,
f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),
g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=
0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Cb=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||
f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]=
"");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+
"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Db=function(){if(!a.Nb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?
screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Tb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Nb=1}};a.Q={};a.loadModule=function(c,
b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.kb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.eb,set:d.kb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&
d[c]()))return 1;return 0};a.Fb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||
(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.xb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":
0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],
function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.mb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.nb=function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;
a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.mb)?a.J=!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||
!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.nb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=
!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.rb=c;f.qb=b;f.ob=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};
a.j=function(){var c;if(a.isReadyToTrack()&&(a.lb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.qb.apply(c.rb,c.ob)};a.lb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f={},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.zb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,
f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");
a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Fb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.zb()),a.Jb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.xb(a.referrer),
a.p("_g")),a.Cb()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.Db(),g+=a.Bb(),a.Ib(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=
[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==
typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,
4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.Ib=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),
e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Mb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.vb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Qb=RegExp(a.Ua.source,
"g");a.wb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Qb),e=0;e<f.length;++e){var g=f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.Ab());d.c=d.c.replace(g,a.escape(k))}}};a.Ab=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+
1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.wb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);
else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.vb=function(c){a.i||a.Eb();a.i.push(c);a.ma=a.C();a.Sa()};a.Eb=function(){a.i=a.Gb();a.i||(a.i=[])};a.Gb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&
a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.pb();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Hb(c),a.Lb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.pb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Hb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Lb=function(c){var b,
d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?
f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.tb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.sb);a.q=0;a.ma>a.O&&a.Qa(a.i);
a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&
b.abort&&b.abort(),b.Ha()))},5E3);a.sb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.tb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||
0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Mb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==
d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,
cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){if(document.documentMode)return document.documentMode;
for(var a=7;4<a;a--){var b=document.createElement("div");b.innerHTML="\x3c!--[if IE "+a+"]><span></span><![endif]--\x3e";if(b.getElementsByTagName("span").length)return a}return null}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.ub();a.Vb||(r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization"),a.Ra(),a.loadModule("ActivityMap"))}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();
