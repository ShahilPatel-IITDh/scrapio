/**FRAMEWORK DA IMPORT LIBS**/

/**GLOBAL VARIABLE - GA & GTM**/
var _containerGTM = (document.getElementById('importLibJSFrameworkDA') && document.getElementById('importLibJSFrameworkDA').src && document.getElementById('importLibJSFrameworkDA').src.split('?').length > 1) ? document.getElementById('importLibJSFrameworkDA').src.split('?')[1].toUpperCase() : '';
window.dataLayer = window.dataLayer || [];
/****/
/**GLOBAL VARIABLE - AAM**/
window._Dil = window._Dil || {};
window.DIL = window.DIL || {};

if(typeof _containerGTM != "undefined" && _containerGTM.length > 0){
     _containerGTM = _containerGTM.indexOf('GTM-') != -1 ? _containerGTM.replace('GTM-','') : _containerGTM;
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer', "GTM-" + _containerGTM);
}

function dataLayerBuilderToAdobeAudienceManager(t){for(var a=[],r=[{obj:t,stack:""}],e={};r.length>0;){var o=r.pop();t=o.obj;for(var f in t)if(t.hasOwnProperty(f))if("object"==typeof t[f]){for(var s=!1,c=0;c<a.length;c++)if(a[c]===t[f]){s=!0;break}s||(a.push(t[f]),r.push({obj:t[f],stack:o.stack+""+f}))}else e[o.stack+""+f]=t[f]}return e}

function dataLayerBuilderToAudienceRequest(r,t){for(var e=[],o=[{obj:r,stack:""}],a={},f=null==t?"":t;o.length>0;){var n=o.pop();r=n.obj;for(var s in r)if(r.hasOwnProperty(s))if("object"==typeof r[s]){for(var b=!1,c=0;c<e.length;c++)if(e[c]===r[s]){b=!0;break}b||(e.push(r[s]),o.push({obj:r[s],stack:n.stack+""+s}))}else a[f+s]=r[s]}return a}

function readCookie(key){
  var cookiestring=RegExp(key+"=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : undefined);
}