(function(){function getCookie(cookieName){var re=new RegExp(cookieName+"=([^;]+)");var value=re.exec(document.cookie);return(value!=null)?unescape(value[1]):null;}
function setGAFromCookie(cookieName,fieldName){value=getCookie(cookieName)
if(value){ga('set',fieldName,value);}}
function getQueryParam(name,url){if(!url){url=window.location.href}
name=name.replace(/[\[\]]/g,"\\$&")
var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),results=regex.exec(url)
if(!results){return null}
if(!results[2]){return ''}
return decodeURIComponent(results[2].replace(/\+/g," "))}
function saveCookie(name,value,days){var getExpiry=function(days){if(!days){return ''}else{var date=new Date()
date.setTime(date.getTime()+(days*24*60*60*1000))
return '; expires='+date.toGMTString()}}
document.cookie=encodeURIComponent(name)
+'='
+encodeURIComponent(value)
+getExpiry(days)+'; path=/'}
function shouldOverwriteField(name,def){var queryName=name+'_overwrite'
var queryValue=getQueryParam(queryName)
if(queryValue==null){return def}
return queryValue=='1'}
function setCookieFromQueryString(fieldName,overwriteExisting){overwriteExisting=shouldOverwriteField(fieldName,overwriteExisting)
var queryValue=getQueryParam(fieldName)
var existingValue=getCookie(fieldName)
if(!queryValue){return}
if(!existingValue||overwriteExisting){saveCookie(fieldName,queryValue)}}
if(typeof _gaTID===typeof undefined){console.error('You must define _gaTID')
return}
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create',_gaTID,'auto','vpnga');ga('vpnga.require','displayfeatures');setCookieFromQueryString('utm_source',false)
setCookieFromQueryString('utm_medium',true)
setCookieFromQueryString('utm_campaign',true)
setCookieFromQueryString('utm_term',true)
setGAFromCookie('utm_source','campaignSource')
setGAFromCookie('utm_medium','campaignMedium')
setGAFromCookie('utm_campaign','campaignName')
setGAFromCookie('utm_term','campaignKeyword')
setGAFromCookie('utm_content','campaignContent')
if(typeof _gaPagePath!==typeof undefined){ga('vpnga.send','pageview',_gaPagePath);}else{ga('vpnga.send','pageview');}
document.ga=ga})()