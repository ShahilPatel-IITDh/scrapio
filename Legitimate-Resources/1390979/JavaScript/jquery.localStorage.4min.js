(function(c){function e(f,g){this.origin=f;this.path=g;this._iframe=null;this._iframeReady=false;this._queue=[];this._requests={};this._id=0}e.prototype={constructor:e,init:function(){var f=this;if(!this._iframe){if(window.postMessage&&window.JSON&&window.localStorage){this._iframe=document.createElement("iframe");this._iframe.style.cssText="position:absolute;width:1px;height:1px;bottom:10px;border:0;opacity:0;";document.body.appendChild(this._iframe);if(window.addEventListener){this._iframe.addEventListener("load",function(){f._iframeLoaded()},false);window.addEventListener("message",function(g){f._handleMessage(g)},false)}else{if(this._iframe.attachEvent){this._iframe.attachEvent("onload",function(){f._iframeLoaded()},false);window.attachEvent("onmessage",function(g){f._handleMessage(g)})}}}else{throw new Error("Unsupported browser.")}}this._iframe.src=this.origin+this.path},requestValue:function(g,j,f,k){var h={key:g,value:j,id:++this._id,operation:f},i={request:h,callback:k};if(this._iframeReady){this._sendRequest(i)}else{this._queue.push(i)}if(!this._iframe){this.init()}},_sendRequest:function(f){this._requests[f.request.id]=f;this._iframe.contentWindow.postMessage(JSON.stringify(f.request),this.origin)},_iframeLoaded:function(){this._iframeReady=true;if(this._queue.length){for(var g=0,f=this._queue.length;g<f;g++){this._sendRequest(this._queue[g])}this._queue=[]}},_handleMessage:function(f){if(this.origin.indexOf(f.origin)==0){var g=JSON.parse(f.data);if(g.messageType=="CrossDomainStorage"){this._requests[g.id].callback(g.key,g.value);delete this._requests[g.id]}}}};var b=true;var a=null;if(typeof localStorage==="undefined"||typeof localStorage==="unknown"||typeof JSON==="undefined"){b=false}else{a=window.localStorage}var d=null;if(b){d=new e((Config.mainSiteUrlHttpsPath||"/"),"js/plugins/cross_domain_storage/server.jsp")}this.supportsLS=function(){return b};this.setItem=function(f,g,h){if(!b){return false}if(h){d.requestValue(f,g,"set",h)}else{a.setItem(f,JSON.stringify(g));return g}return true};this.getItem=function(f,g){if(!b){return false}if(g){d.requestValue(f,null,"get",g)}else{return JSON.parse(a.getItem(f))}return true};this.removeItem=function(f,h){if(!b){return false}if(h){d.requestValue(f,null,"remove",h)}else{var g=JSON.parse(a.getItem(f));a.removeItem(f);return g}return true};this.clearAll=function(f){if(!b){return false}if(f){d.requestValue(null,null,"clear",f)}else{a.clear()}return true};jQuery.localStorage=this})(jQuery);