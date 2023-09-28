/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
(function(){var d=window.XMLHttpRequest,e=window.ActiveXObject,g=function(b){var c=document.getElementById("username"),a=document.createElement("input");a.type="hidden";a.name="MktUrl";a.value=b;c.parentNode.appendChild(a)};e&&(window.ActiveXObject=function(b){var c=new e(b),a={open:function(a,b,d,e,f){g(b);return c.open(a,b,d,e,f)},send:function(b){if(!window.addlSurvey)return c.send(b);a.responseText=4;a.onreadystatechange()},setRequestHeader:function(){},overrideMimeType:function(){},getAllResponseHeaders:function(){return c.getAllResponseHeaders()},
abort:function(){}};c.onreadystatechange=function(){a.readyState=c.readyState;a.onreadystatechange&&(4===c.readyState&&(a.responseText=c.responseText),a.onreadystatechange())};return a});if(d){var f=d.prototype.open;d.prototype.open=function(){g(arguments[1]);var b=Array.prototype.slice.call(arguments);window.addlSurvey&&(b[1]="/sfdc/n");f.apply(this,b)}}})();

//# sourceMappingURL=/javascript/1691342637430/sfdc/source/LoginMarketingSurveyResponse.js.map
