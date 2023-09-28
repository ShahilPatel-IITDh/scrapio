(function(){var COOKIE_NAME='webs-stats-visitor-id';var COOKIE_DURATION=1;var data=window.webs&&webs.stats;if(!data){return;}
var url=data.collectorUrl;if(!url){return;}
delete data.collectorUrl;data.referrer=document.referrer;data.location=window.location.href;data.visitorId=getVisitorId();var qs='?'+(function(){var list=[];for(var k in data){list.push(''+encodeURIComponent(k)+'='+encodeURIComponent(data[k]));}
return list.join('&');})();var img=document.createElement('img');img.setAttribute('src',url+qs);img.setAttribute('height',1);img.setAttribute('width',1);img.style.position='fixed';img.style.left='0px';img.style.bottom='0px';document.body.appendChild(img);function getVisitorId(){var vid=readCookie(COOKIE_NAME);if(vid){return vid;}
vid=Math.floor(Math.random()*1000000000);createCookie(COOKIE_NAME,vid,COOKIE_DURATION);return vid;}
function createCookie(name,value,days){var expires;if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires='; expires='+date.toGMTString();}else{expires='';}
document.cookie=name+'='+value+expires+'; path=/';}
function readCookie(name){var nameEQ=name+'=';var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1,c.length);}
if(c.indexOf(nameEQ)===0){return c.substring(nameEQ.length,c.length);}}
return null;}
function eraseCookie(name){createCookie(name,'',-1);}})();