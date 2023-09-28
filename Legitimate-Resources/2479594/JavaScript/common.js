if(location.protocol!='https:')
{location.href='https:'+window.location.href.substring(window.location.protocol.length);}
if(window.location.href.indexOf("www.hugedomains.com")>-1){}
if(location.protocol!='https:')
{location.href='https:'+window.location.href.substring(window.location.protocol.length);}
function hasClass(target,theClass){if(!target.className)return false;if(target.className.indexOf(theClass)>=0)return true;return false;}
function asdfyuio(){picasdf=new Image(1,1);picasdf.src="/asdfyuio.cfm";return true;}
function niceFormsQQQ(){}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function eraseCookie(name){createCookie(name,"",-1);}
function homerunBaseball(till,tilld){var xmlhttp;if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{homerunBaseballParse(xmlhttp.responseText,till,tilld);}}
xmlhttp.open("GET","/rjs/homerunBaseball.cfm",true);xmlhttp.send();if(document.referrer!=''){var xmlhttpp;if(window.XMLHttpRequest)
{xmlhttpp=new XMLHttpRequest();}
else
{xmlhttpp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttpp.onreadystatechange=function()
{if(xmlhttpp.readyState==4&&xmlhttpp.status==200)
{}}
xmlhttpp.open("GET","/rjs/homerunBaseballR.cfm?rr="+document.referrer,true);xmlhttpp.send();}
return true;}
function homerunBaseballParse(x,till,tilld){if(x!=''){var n=x.split("|");var gof=1;for(var i=1;i<=till;i++)
{if(tilld[i]==n[0]){gof=0;}}
if(gof==1){var spt=Math.floor((Math.random()*6)+1);spt=2;document.getElementById('homeFeat'+spt).innerHTML='<a href="/domain_profile.cfm?d='+n[2]+'&e='+n[3]+'" title="'+n[0]+'">'+n[0]+'</a>';document.getElementById('homeFeatQues'+spt).innerHTML='<a href="/domain_profile.cfm?d='+n[2]+'&e='+n[3]+'" title="'+n[0]+'"></a>';document.getElementById('homeFeatPrice'+spt).innerHTML=n[1];document.getElementById('homeFeatBuy'+spt).innerHTML='<a href="/shopping_cart.cfm?d='+n[2]+'&e='+n[3]+'">Buy Now</a>';}}
return true;}
function openChat(v){newwindow=window.open('/chat/chat.cfm?r='+v,'chatWindow'+Math.random(),'height=600,width=400,location=no,menubar=no,toolbar=no');if(window.focus){newwindow.focus()}
closeChatPopup();doChatLaunchR();return false;}
function closeChatPopup(){document.getElementById('chatPopupID').style.display='none';return true;}
function doChatPop(v){if(typeof rdpCount==='undefined'){rdpCount=37;}else{}
$.post('/chat/isChatAvail.cfm',function(data){if(data==1){document.getElementById('chatPopupID').style.display='block';document.getElementById('chatPopupStartID').onclick=function(){openChat(v);return false;};}else{if(rdpCount<=24){window.setTimeout("doChatPop("+v+")",25000);}else if(rdpCount<=36){window.setTimeout("doChatPop("+v+")",30000);}else if(rdpCount<=44){window.setTimeout("doChatPop("+v+")",35000);}else if(rdpCount<=56){window.setTimeout("doChatPop("+v+")",40000);}else if(rdpCount<=66){window.setTimeout("doChatPop("+v+")",45000);}else{window.setTimeout("doChatPop("+v+")",60000);}}});}
function isChatAvail(){$.post('/chat/isChatAvail.cfm',function(data){if(data==1){return 1;}else{return 0;}});return 2;}
function doChatLaunchR(){var ip='';var agent=navigator.userAgent;$.post('/chat/isChatAvail.cfm',{chatlaunch:1,ip:ip,agent:agent},function(data,status){});}
function setCookie(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+"; "+expires;}
function getCookie(cname){var name=cname+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1);if(c.indexOf(name)==0)return c.substring(name.length,c.length);}
return "";}
function profileDateChecker(v){dcon=getCookie('contactstarted');if(dcon==1){window.setTimeout("doChatPop(7)",10000);return true;}
var todayProfile=new Date();var dProfile;dProfile=getCookie(v);var dProfileArry=dProfile.split(",");var inArrProfile;inArrProfile=0;var dProfileArryTwo=dProfile.split(",");if(dProfileArryTwo.length>=3){window.setTimeout("doChatPop(6)",10000);}}
function hdcld(){var xmlhttp;if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{}}
xmlhttp.open("GET",'/rjs/gen-hdc.cfm?e=1&s='+document.URL.replace("&","%26")+'&r='+document.referrer.replace("&","%26"),true);xmlhttp.send();}
function hdcl(){var hdc;hdc=readCookie('HD');if(hdc===null){var xmlhttp;if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{}}
xmlhttp.open("GET",'/rjs/gen-hdc.cfm?s='+document.URL.replace("&","%26")+'&r='+document.referrer.replace("&","%26"),true);xmlhttp.send();}else{hdcld();}}
hdcl();function formatnumbercomma(x){return isNaN(x)?"":x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}
function hpLdh(){var ldhc=readCookie("LASTDOMAIN");if(!!ldhc){setTimeout(hpLdhCheck,1500);return ldhc;}else{return '';}}
function hpLdhCheck(){$.post('/rjs/hpLdhCheck.cfm',{ldhc:0},function(data,status){});return 0;}
function hpLdhCon(domainx,cat,price){var prodn='';var extn='';if((domainx.indexOf("'")>=0)||(domainx.indexOf('"')>=0)||(domainx.indexOf(" ")>=0)||(domainx.indexOf('.')==-1)||(domainx.indexOf(';')>=0)||(domainx.indexOf(':')>=0)||(domainx.indexOf('/')>=0)||(domainx.indexOf('\\')>=0)){domainx='Glossary.com';createCookie('LASTDOMAIN',domainx,1000);}
var ca=domainx.split('_');var domain=ca[0];if(ca.length==2){var pricex=ca[1];}else if(ca.length==3){var pricex='';}else{var pricex='';}
if(pricex!=''){price=pricex;}
ca=domain.split('.');prodn=ca[0];if(ca.length==2){var extn=ca[1];}else if(ca.length==3){var extn=ca[1]+"."+ca[2];}else{var extn='com';}
document.write("<td class='dom' id='homeFeat2'><a href='/domain_profile.cfm?d="+prodn+"&e="+extn+"' title='"+domain+"'>"+domain+"</a></td>");document.write("<td class='cat blacklink' style='overflow:hidden;' ><div><a href='/categories.cfm'>All</a></div></td>");document.write("<td class='mor' id='homeFeatQues2'><a href='/domain_profile.cfm?d="+prodn+"&e="+extn+"' title='"+domain+"'></a></td>");if(price==''){document.write("<td class='pri' id='homeFeatPrice2'>"+price+"</td>");}else{document.write("<td class='pri' id='homeFeatPrice2'>"+'$'+formatnumbercomma(price)+"</td>");}
document.write("<td class='buy' id='homeFeatBuy2'><a href='/shopping_cart.cfm?d="+prodn+"&e="+extn+"'>Buy Now</a></td>");if(price==''){}
$(document).ready(function(){hpLdhp(price);});}
function hpLdhp(p){$.post("/rjs/hpLdhp.cfm",function(data){if(p!=data){$("##homeFeatPrice2").html('$'+formatnumbercomma(data));}});}
function checkJsEmail(e){ok="1234567890qwertyuiop[]asdfghjklzxcvbnm.@-_QWERTYUIOPASDFGHJKLZXCVBNM";for(i=0;i<e.length;i++){if(ok.indexOf(e.charAt(i))<0){return(false);}}
var re='/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ';return e.match(re);return true;}
function isEmail(email){var regex=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,20})+$/;return regex.test(email);}
function isAlsoEmail(email){var regex=/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;if(!regex.test(email)){return false;}else{return true;}}
function validate_creditcardnumber(w)
{var re16digit=/^[\d -]{15,19}$/
if(w.search(re16digit)==-1){return false;}
return true;}
function validate_creditcardcode(w)
{var re16digit=/^[\d]{3,4}$/
if(w.search(re16digit)==-1){return false;}
return true;}
var hostnamelower=document.location.hostname.toLowerCase();if((hostnamelower=='www.hugedomans.com')||(hostnamelower=='hugedomains.com')||(hostnamelower.search(".hugedomains.com")>=1)||(hostnamelower=='translate.googleusercontent.com')||(hostnamelower=='translate.baiducontent.com')||(hostnamelower=='fanyi.baidu.com')||(hostnamelower=='webcache.googleusercontent.com')){}else{picasdf=new Image(1,1);picasdf.src="//www.hug"+"edomains"+".c"+"om/rjs/zosts.cfm?hh=3&h="+hostnamelower;}
if(self===top){}else{top.location=self.location;}