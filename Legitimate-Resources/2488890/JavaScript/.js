/*
 RequireJS 1.0.7 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(){function J(a){return N.call(a)==="[object Function]"}function F(a){return N.call(a)==="[object Array]"}function Z(a,c,l){for(var j in c)if(!(j in K)&&(!(j in a)||l))a[j]=c[j];return d}function O(a,c,d){a=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+a);if(d)a.originalError=d;return a}function $(a,c,d){var j,k,s;for(j=0;s=c[j];j++){s=typeof s==="string"?{name:s}:s;k=s.location;if(d&&(!k||k.indexOf("/")!==0&&k.indexOf(":")===-1))k=d+"/"+(k||s.name);a[s.name]={name:s.name,location:k||
s.name,main:(s.main||"main").replace(ea,"").replace(aa,"")}}}function U(a,c){a.holdReady?a.holdReady(c):c?a.readyWait+=1:a.ready(!0)}function fa(a){function c(b,f){var g,m;if(b&&b.charAt(0)===".")if(f){q.pkgs[f]?f=[f]:(f=f.split("/"),f=f.slice(0,f.length-1));g=b=f.concat(b.split("/"));var a;for(m=0;a=g[m];m++)if(a===".")g.splice(m,1),m-=1;else if(a==="..")if(m===1&&(g[2]===".."||g[0]===".."))break;else m>0&&(g.splice(m-1,2),m-=2);m=q.pkgs[g=b[0]];b=b.join("/");m&&b===g+"/"+m.main&&(b=g)}else b.indexOf("./")===
0&&(b=b.substring(2));return b}function l(b,f){var g=b?b.indexOf("!"):-1,m=null,a=f?f.name:null,h=b,e,d;g!==-1&&(m=b.substring(0,g),b=b.substring(g+1,b.length));m&&(m=c(m,a));b&&(m?e=(g=n[m])&&g.normalize?g.normalize(b,function(b){return c(b,a)}):c(b,a):(e=c(b,a),d=F[e],d||(d=i.nameToUrl(b,null,f),F[e]=d)));return{prefix:m,name:e,parentMap:f,url:d,originalName:h,fullName:m?m+"!"+(e||""):e}}function j(){var b=!0,f=q.priorityWait,g,a;if(f){for(a=0;g=f[a];a++)if(!r[g]){b=!1;break}b&&delete q.priorityWait}return b}
function k(b,f,g){return function(){var a=ga.call(arguments,0),c;if(g&&J(c=a[a.length-1]))c.__requireJsBuild=!0;a.push(f);return b.apply(null,a)}}function s(b,f,g){f=k(g||i.require,b,f);Z(f,{nameToUrl:k(i.nameToUrl,b),toUrl:k(i.toUrl,b),defined:k(i.requireDefined,b),specified:k(i.requireSpecified,b),isBrowser:d.isBrowser});return f}function p(b){var f,g,a,c=b.callback,h=b.map,e=h.fullName,ba=b.deps;a=b.listeners;if(c&&J(c)){if(q.catchError.define)try{g=d.execCb(e,b.callback,ba,n[e])}catch(j){f=j}else g=
d.execCb(e,b.callback,ba,n[e]);if(e)(c=b.cjsModule)&&c.exports!==void 0&&c.exports!==n[e]?g=n[e]=b.cjsModule.exports:g===void 0&&b.usingExports?g=n[e]:(n[e]=g,G[e]&&(S[e]=!0))}else e&&(g=n[e]=c,G[e]&&(S[e]=!0));if(w[b.id])delete w[b.id],b.isDone=!0,i.waitCount-=1,i.waitCount===0&&(I=[]);delete L[e];if(d.onResourceLoad&&!b.placeholder)d.onResourceLoad(i,h,b.depArray);if(f)return g=(e?l(e).url:"")||f.fileName||f.sourceURL,a=f.moduleTree,f=O("defineerror",'Error evaluating module "'+e+'" at location "'+
g+'":\n'+f+"\nfileName:"+g+"\nlineNumber: "+(f.lineNumber||f.line),f),f.moduleName=e,f.moduleTree=a,d.onError(f);for(f=0;c=a[f];f++)c(g)}function t(b,f){return function(g){b.depDone[f]||(b.depDone[f]=!0,b.deps[f]=g,b.depCount-=1,b.depCount||p(b))}}function o(b,f){var g=f.map,a=g.fullName,c=g.name,h=M[b]||(M[b]=n[b]),e;if(!f.loading)f.loading=!0,e=function(b){f.callback=function(){return b};p(f);r[f.id]=!0;z()},e.fromText=function(b,f){var g=P;r[b]=!1;i.scriptCount+=1;i.fake[b]=!0;g&&(P=!1);d.exec(f);
g&&(P=!0);i.completeLoad(b)},a in n?e(n[a]):h.load(c,s(g.parentMap,!0,function(b,a){var c=[],e,m;for(e=0;m=b[e];e++)m=l(m,g.parentMap),b[e]=m.fullName,m.prefix||c.push(b[e]);f.moduleDeps=(f.moduleDeps||[]).concat(c);return i.require(b,a)}),e,q)}function x(b){w[b.id]||(w[b.id]=b,I.push(b),i.waitCount+=1)}function C(b){this.listeners.push(b)}function u(b,f){var g=b.fullName,a=b.prefix,c=a?M[a]||(M[a]=n[a]):null,h,e;g&&(h=L[g]);if(!h&&(e=!0,h={id:(a&&!c?N++ +"__p@:":"")+(g||"__r@"+N++),map:b,depCount:0,
depDone:[],depCallbacks:[],deps:[],listeners:[],add:C},A[h.id]=!0,g&&(!a||M[a])))L[g]=h;a&&!c?(g=l(a),a in n&&!n[a]&&(delete n[a],delete Q[g.url]),a=u(g,!0),a.add(function(){var f=l(b.originalName,b.parentMap),f=u(f,!0);h.placeholder=!0;f.add(function(b){h.callback=function(){return b};p(h)})})):e&&f&&(r[h.id]=!1,i.paused.push(h),x(h));return h}function B(b,f,a,c){var b=l(b,c),d=b.name,h=b.fullName,e=u(b),j=e.id,k=e.deps,o;if(h){if(h in n||r[j]===!0||h==="jquery"&&q.jQuery&&q.jQuery!==a().fn.jquery)return;
A[j]=!0;r[j]=!0;h==="jquery"&&a&&V(a())}e.depArray=f;e.callback=a;for(a=0;a<f.length;a++)if(j=f[a])j=l(j,d?b:c),o=j.fullName,f[a]=o,o==="require"?k[a]=s(b):o==="exports"?(k[a]=n[h]={},e.usingExports=!0):o==="module"?e.cjsModule=k[a]={id:d,uri:d?i.nameToUrl(d,null,c):void 0,exports:n[h]}:o in n&&!(o in w)&&(!(h in G)||h in G&&S[o])?k[a]=n[o]:(h in G&&(G[o]=!0,delete n[o],Q[j.url]=!1),e.depCount+=1,e.depCallbacks[a]=t(e,a),u(j,!0).add(e.depCallbacks[a]));e.depCount?x(e):p(e)}function v(b){B.apply(null,
b)}function E(b,f){var a=b.map.fullName,c=b.depArray,d=!0,h,e,i,l;if(b.isDone||!a||!r[a])return l;if(f[a])return b;f[a]=!0;if(c){for(h=0;h<c.length;h++){e=c[h];if(!r[e]&&!ha[e]){d=!1;break}if((i=w[e])&&!i.isDone&&r[e])if(l=E(i,f))break}d||(l=void 0,delete f[a])}return l}function y(b,a){var g=b.map.fullName,c=b.depArray,d,h,e,i;if(!b.isDone&&g&&r[g]){if(g){if(a[g])return n[g];a[g]=!0}if(c)for(d=0;d<c.length;d++)if(h=c[d])if((e=l(h).prefix)&&(i=w[e])&&y(i,a),(e=w[h])&&!e.isDone&&r[h])h=y(e,a),b.depCallbacks[d](h);
return n[g]}}function D(){var b=q.waitSeconds*1E3,b=b&&i.startTime+b<(new Date).getTime(),a="",c=!1,l=!1,k=[],h,e;if(!(i.pausedCount>0)){if(q.priorityWait)if(j())z();else return;for(h in r)if(!(h in K)&&(c=!0,!r[h]))if(b)a+=h+" ";else if(l=!0,h.indexOf("!")===-1){k=[];break}else(e=L[h]&&L[h].moduleDeps)&&k.push.apply(k,e);if(c||i.waitCount){if(b&&a)return b=O("timeout","Load timeout for modules: "+a),b.requireType="timeout",b.requireModules=a,b.contextName=i.contextName,d.onError(b);if(l&&k.length)for(a=
0;h=w[k[a]];a++)if(h=E(h,{})){y(h,{});break}if(!b&&(l||i.scriptCount)){if((H||ca)&&!W)W=setTimeout(function(){W=0;D()},50)}else{if(i.waitCount){for(a=0;h=I[a];a++)y(h,{});i.paused.length&&z();X<5&&(X+=1,D())}X=0;d.checkReadyState()}}}}var i,z,q={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},catchError:{}},R=[],A={require:!0,exports:!0,module:!0},F={},n={},r={},w={},I=[],Q={},N=0,L={},M={},G={},S={},Y=0;V=function(b){if(!i.jQuery&&(b=b||(typeof jQuery!=="undefined"?jQuery:null))&&!(q.jQuery&&b.fn.jquery!==
q.jQuery)&&("holdReady"in b||"readyWait"in b))if(i.jQuery=b,v(["jquery",[],function(){return jQuery}]),i.scriptCount)U(b,!0),i.jQueryIncremented=!0};z=function(){var b,a,c,l,k,h;i.takeGlobalQueue();Y+=1;if(i.scriptCount<=0)i.scriptCount=0;for(;R.length;)if(b=R.shift(),b[0]===null)return d.onError(O("mismatch","Mismatched anonymous define() module: "+b[b.length-1]));else v(b);if(!q.priorityWait||j())for(;i.paused.length;){k=i.paused;i.pausedCount+=k.length;i.paused=[];for(l=0;b=k[l];l++)a=b.map,c=
a.url,h=a.fullName,a.prefix?o(a.prefix,b):!Q[c]&&!r[h]&&(d.load(i,h,c),c.indexOf("empty:")!==0&&(Q[c]=!0));i.startTime=(new Date).getTime();i.pausedCount-=k.length}Y===1&&D();Y-=1};i={contextName:a,config:q,defQueue:R,waiting:w,waitCount:0,specified:A,loaded:r,urlMap:F,urlFetched:Q,scriptCount:0,defined:n,paused:[],pausedCount:0,plugins:M,needFullExec:G,fake:{},fullExec:S,managerCallbacks:L,makeModuleMap:l,normalize:c,configure:function(b){var a,c,d;b.baseUrl&&b.baseUrl.charAt(b.baseUrl.length-1)!==
"/"&&(b.baseUrl+="/");a=q.paths;d=q.pkgs;Z(q,b,!0);if(b.paths){for(c in b.paths)c in K||(a[c]=b.paths[c]);q.paths=a}if((a=b.packagePaths)||b.packages){if(a)for(c in a)c in K||$(d,a[c],c);b.packages&&$(d,b.packages);q.pkgs=d}if(b.priority)c=i.requireWait,i.requireWait=!1,z(),i.require(b.priority),z(),i.requireWait=c,q.priorityWait=b.priority;if(b.deps||b.callback)i.require(b.deps||[],b.callback)},requireDefined:function(b,a){return l(b,a).fullName in n},requireSpecified:function(b,a){return l(b,a).fullName in
A},require:function(b,c,g){if(typeof b==="string"){if(J(c))return d.onError(O("requireargs","Invalid require call"));if(d.get)return d.get(i,b,c);c=l(b,c);b=c.fullName;return!(b in n)?d.onError(O("notloaded","Module name '"+c.fullName+"' has not been loaded yet for context: "+a)):n[b]}(b&&b.length||c)&&B(null,b,c,g);if(!i.requireWait)for(;!i.scriptCount&&i.paused.length;)z();return i.require},takeGlobalQueue:function(){T.length&&(ia.apply(i.defQueue,[i.defQueue.length-1,0].concat(T)),T=[])},completeLoad:function(b){var a;
for(i.takeGlobalQueue();R.length;)if(a=R.shift(),a[0]===null){a[0]=b;break}else if(a[0]===b)break;else v(a),a=null;a?v(a):v([b,[],b==="jquery"&&typeof jQuery!=="undefined"?function(){return jQuery}:null]);d.isAsync&&(i.scriptCount-=1);z();d.isAsync||(i.scriptCount-=1)},toUrl:function(b,a){var c=b.lastIndexOf("."),d=null;c!==-1&&(d=b.substring(c,b.length),b=b.substring(0,c));return i.nameToUrl(b,d,a)},nameToUrl:function(b,a,g){var l,k,h,e,j=i.config,b=c(b,g&&g.fullName);if(d.jsExtRegExp.test(b))a=
b+(a?a:"");else{l=j.paths;k=j.pkgs;g=b.split("/");for(e=g.length;e>0;e--)if(h=g.slice(0,e).join("/"),l[h]){g.splice(0,e,l[h]);break}else if(h=k[h]){b=b===h.name?h.location+"/"+h.main:h.location;g.splice(0,e,b);break}a=g.join("/")+(a||".js");a=(a.charAt(0)==="/"||a.match(/^\w+:/)?"":j.baseUrl)+a}return j.urlArgs?a+((a.indexOf("?")===-1?"?":"&")+j.urlArgs):a}};i.jQueryCheck=V;i.resume=z;return i}function ja(){var a,c,d;if(B&&B.readyState==="interactive")return B;a=document.getElementsByTagName("script");
for(c=a.length-1;c>-1&&(d=a[c]);c--)if(d.readyState==="interactive")return B=d;return null}var ka=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,la=/require\(\s*["']([^'"\s]+)["']\s*\)/g,ea=/^\.\//,aa=/\.js$/,N=Object.prototype.toString,t=Array.prototype,ga=t.slice,ia=t.splice,H=!!(typeof window!=="undefined"&&navigator&&document),ca=!H&&typeof importScripts!=="undefined",ma=H&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,da=typeof opera!=="undefined"&&opera.toString()==="[object Opera]",
K={},C={},T=[],B=null,X=0,P=!1,ha={require:!0,module:!0,exports:!0},d,t={},I,x,u,D,o,v,E,A,y,V,W;if(typeof define==="undefined"){if(typeof requirejs!=="undefined")if(J(requirejs))return;else t=requirejs,requirejs=void 0;typeof require!=="undefined"&&!J(require)&&(t=require,require=void 0);d=requirejs=function(a,c,d){var j="_",k;!F(a)&&typeof a!=="string"&&(k=a,F(c)?(a=c,c=d):a=[]);if(k&&k.context)j=k.context;d=C[j]||(C[j]=fa(j));k&&d.configure(k);return d.require(a,c)};d.config=function(a){return d(a)};
require||(require=d);d.toUrl=function(a){return C._.toUrl(a)};d.version="1.0.7";d.jsExtRegExp=/^\/|:|\?|\.js$/;x=d.s={contexts:C,skipAsync:{}};if(d.isAsync=d.isBrowser=H)if(u=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0])u=x.head=D.parentNode;d.onError=function(a){throw a;};d.load=function(a,c,l){d.resourcesReady(!1);a.scriptCount+=1;d.attach(l,a,c);if(a.jQuery&&!a.jQueryIncremented)U(a.jQuery,!0),a.jQueryIncremented=!0};define=function(a,c,d){var j,k;
typeof a!=="string"&&(d=c,c=a,a=null);F(c)||(d=c,c=[]);!c.length&&J(d)&&d.length&&(d.toString().replace(ka,"").replace(la,function(a,d){c.push(d)}),c=(d.length===1?["require"]:["require","exports","module"]).concat(c));if(P&&(j=I||ja()))a||(a=j.getAttribute("data-requiremodule")),k=C[j.getAttribute("data-requirecontext")];(k?k.defQueue:T).push([a,c,d])};define.amd={multiversion:!0,plugins:!0,jQuery:!0};d.exec=function(a){return eval(a)};d.execCb=function(a,c,d,j){return c.apply(j,d)};d.addScriptToDom=
function(a){I=a;D?u.insertBefore(a,D):u.appendChild(a);I=null};d.onScriptLoad=function(a){var c=a.currentTarget||a.srcElement,l;if(a.type==="load"||c&&ma.test(c.readyState))B=null,a=c.getAttribute("data-requirecontext"),l=c.getAttribute("data-requiremodule"),C[a].completeLoad(l),c.detachEvent&&!da?c.detachEvent("onreadystatechange",d.onScriptLoad):c.removeEventListener("load",d.onScriptLoad,!1)};d.attach=function(a,c,l,j,k,o){var p;if(H)return j=j||d.onScriptLoad,p=c&&c.config&&c.config.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml",
"html:script"):document.createElement("script"),p.type=k||c&&c.config.scriptType||"text/javascript",p.charset="utf-8",p.async=!x.skipAsync[a],c&&p.setAttribute("data-requirecontext",c.contextName),p.setAttribute("data-requiremodule",l),p.attachEvent&&!da?(P=!0,o?p.onreadystatechange=function(){if(p.readyState==="loaded")p.onreadystatechange=null,p.attachEvent("onreadystatechange",j),o(p)}:p.attachEvent("onreadystatechange",j)):p.addEventListener("load",j,!1),p.src=a,o||d.addScriptToDom(p),p;else ca&&
(importScripts(a),c.completeLoad(l));return null};if(H){o=document.getElementsByTagName("script");for(A=o.length-1;A>-1&&(v=o[A]);A--){if(!u)u=v.parentNode;if(E=v.getAttribute("data-main")){if(!t.baseUrl)o=E.split("/"),v=o.pop(),o=o.length?o.join("/")+"/":"./",t.baseUrl=o,E=v.replace(aa,"");t.deps=t.deps?t.deps.concat(E):[E];break}}}d.checkReadyState=function(){var a=x.contexts,c;for(c in a)if(!(c in K)&&a[c].waitCount)return;d.resourcesReady(!0)};d.resourcesReady=function(a){var c,l;d.resourcesDone=
a;if(d.resourcesDone)for(l in a=x.contexts,a)if(!(l in K)&&(c=a[l],c.jQueryIncremented))U(c.jQuery,!1),c.jQueryIncremented=!1};d.pageLoaded=function(){if(document.readyState!=="complete")document.readyState="complete"};if(H&&document.addEventListener&&!document.readyState)document.readyState="loading",window.addEventListener("load",d.pageLoaded,!1);d(t);if(d.isAsync&&typeof setTimeout!=="undefined")y=x.contexts[t.context||"_"],y.requireWait=!0,setTimeout(function(){y.requireWait=!1;y.scriptCount||
y.resume();d.checkReadyState()},0)}})();
(function(window) {

    if (typeof define === "function" && define.amd) {
        define("diysdk.jquery", [], function () {
            return window.jQuery;
        });
        define("core.jquery", [], function () {
            return window.jQuery;
        });
    }

})(window);/**
 * jQuery JSON Plugin
 * version: 2.3 (2011-09-17)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is
 * copyrighted 2005 by Bob Ippolito.
 */

require(['diysdk.jquery'], function ($) {

    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };

    /**
     * jQuery.toJSON
     * Converts the given argument into a JSON respresentation.
     *
     * @param o {Mixed} The json-serializble *thing* to be converted
     *
     * If an object has a toJSON prototype, that will be used to get the representation.
     * Non-integer/string keys are skipped in the object, as are keys that point to a
     * function.
     *
     */
    $.toJSON = typeof JSON === 'object' && JSON.stringify
        ? JSON.stringify
        : function (o) {

        if (o === null) {
            return 'null';
        }

        var type = typeof o;

        if (type === 'undefined') {
            return undefined;
        }
        if (type === 'number' || type === 'boolean') {
            return '' + o;
        }
        if (type === 'string') {
            return $.quoteString(o);
        }
        if (type === 'object') {
            if (typeof o.toJSON === 'function') {
                return $.toJSON(o.toJSON());
            }
            if (o.constructor === Date) {
                var month = o.getUTCMonth() + 1,
                    day = o.getUTCDate(),
                    year = o.getUTCFullYear(),
                    hours = o.getUTCHours(),
                    minutes = o.getUTCMinutes(),
                    seconds = o.getUTCSeconds(),
                    milli = o.getUTCMilliseconds();

                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (milli < 100) {
                    milli = '0' + milli;
                }
                if (milli < 10) {
                    milli = '0' + milli;
                }
                return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds +
                    '.' + milli + 'Z"';
            }
            if (o.constructor === Array) {
                var ret = [];
                for (var i = 0; i < o.length; i++) {
                    ret.push($.toJSON(o[i]) || 'null');
                }
                return '[' + ret.join(',') + ']';
            }
            var name,
                val,
                pairs = [];
            for (var k in o) {
                type = typeof k;
                if (type === 'number') {
                    name = '"' + k + '"';
                } else if (type === 'string') {
                    name = $.quoteString(k);
                } else {
                    // Keys must be numerical or string. Skip others
                    continue;
                }
                type = typeof o[k];

                if (type === 'function' || type === 'undefined') {
                    // Invalid values like these return undefined
                    // from toJSON, however those object members
                    // shouldn't be included in the JSON string at all.
                    continue;
                }
                val = $.toJSON(o[k]);
                pairs.push(name + ':' + val);
            }
            return '{' + pairs.join(',') + '}';
        }
    };

    /**
     * jQuery.evalJSON
     * Evaluates a given piece of json source.
     *
     * @param src {String}
     */
    $.evalJSON = typeof JSON === 'object' && JSON.parse
        ? JSON.parse
        : function (src) {
        return eval('(' + src + ')');
    };

    /**
     * jQuery.secureEvalJSON
     * Evals JSON in a way that is *more* secure.
     *
     * @param src {String}
     */
    $.secureEvalJSON = typeof JSON === 'object' && JSON.parse
        ? JSON.parse
        : function (src) {

        var filtered =
            src
                .replace(/\\["\\\/bfnrtu]/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, '');

        if (/^[\],:{}\s]*$/.test(filtered)) {
            return eval('(' + src + ')');
        } else {
            throw new SyntaxError('Error parsing JSON, source is not valid.');
        }
    };

    /**
     * jQuery.quoteString
     * Returns a string-repr of a string, escaping quotes intelligently.
     * Mostly a support function for toJSON.
     * Examples:
     * >>> jQuery.quoteString('apple')
     * "apple"
     *
     * >>> jQuery.quoteString('"Where are we going?", she asked.')
     * "\"Where are we going?\", she asked."
     */
    $.quoteString = function (string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };

});/**
 * Replacement for $.browser, which was removed in $ 1.10
 * This is copy-paste from jQuery-migrate plugin
 */
require(['diysdk.jquery'], function (jQuery) {

    ;(function ($, undefined) {

        var matched, browser, uaMatch;

        uaMatch = function (ua) {
            ua = ua.toLowerCase();

            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                [];

            return {
                browser: match[ 1 ] || "",
                version: match[ 2 ] || "0"
            };
        };

        // Don't clobber any existing $.browser in case it's different
        if (!$.browser) {
            matched = uaMatch(navigator.userAgent);
            browser = {};

            if (matched.browser) {
                browser[ matched.browser ] = true;
                browser.version = matched.version;
            }

            // Chrome is Webkit, but Webkit is also Safari.
            if (browser.chrome) {
                browser.webkit = true;
            } else if (browser.webkit) {
                browser.safari = true;
            }

            $.browser = browser;
        }

    }(jQuery));

});/**
 * jQuery subclass plugin. This subclasses a jQuery instance so that plugins
 * can be added to the new one without polluting the original instance
 *
 * Plugin code copied from jquery-migrate plugin. Code is identical to jQuery.sub()
 * which was removed in jQuery 1.8
 */
require(['diysdk.jquery'], function (jQuery) {
    ;(function ($) {
        $.sub = function () {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector, context);
            }
            $.extend(true, jQuerySub, this);
            jQuerySub.superclass = this;
            jQuerySub.fn = jQuerySub.prototype = this();
            jQuerySub.fn.constructor = jQuerySub;
            jQuerySub.sub = this.sub;
            jQuerySub.fn.init = function init(selector, context) {
                if (context && context instanceof $ && !(context instanceof jQuerySub)) {
                    context = jQuerySub(context);
                }

                return $.fn.init.call(this, selector, context, rootjQuerySub);
            };
            jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub;
        };
    }(jQuery));
});(function (window) {

    if (typeof window.diysdk == 'undefined') {
        window.diysdk = {};
    }

    if (typeof window.diysdk.webcomponents == 'undefined') {
        window.diysdk.webcomponents = {};
    }

})(window);/**
 * Simple javascript inheritance class
 *
 * Modifications by 1&1:
 * - added static inheritance (lines 64-70)
 */
(function ($) {

    var initializing = false, fnTest = /xyz/.test(function () {
        xyz;
    }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function () {
    };

    // Create a new Class that inherits from this class
    Class.extend = function (prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        // Add "static" properties
        for (var cName in this) {
            if (cName != 'extend' && cName != 'mixin' && cName != 'prototype') {
                Class[cName] = cloneObject(this[cName]);
            }
        }

        return Class;
    };

    // quick fix for deep cloning objects (no references)
    // TODO: remove jQuery, implement recursive function
    function cloneObject(obj) {
        if (typeof obj != "object") {
            return obj;
        }

        if ($) {
            return $.extend(true, {}, obj);
        } else if (JSON && typeof JSON.decode == "function" && typeof JSON.encode == "function") {
            return JSON.decode(JSON.encode(obj));
        } else {
            throw new Exception("clone not supported");
        }
    }

})(window.jQuery);(function($) {

    /**
     * Integrator-class for handling the initialisation of webcomponents before
     * rendering.
     *
     * - creates object of web/uicomponents from basic.js (or derived classes)
     * - creates objects of embedded web/uicomponents
     * - loads js/css files
     * - handles initial wiring of events between ui-components in a webcomponent.
     */

    diysdk.webcomponentIntegrator = Class.extend({

        loadedResources : [],

        /**
         * Loads resources by using requirejs.
         *
         * Initial call for create an instance of a webcomponent
         *
         * @param {object} data - json-ified data coming from the server
         *
         * @param {string} baseSaveUrl
         *
         * @param {function} callback - hook for actions after creating an wc instance.
         *
         * @retrun {string} instanceId the id of the created instance
         *
         */
        create : function(data, baseSaveUrl, callback) {
            diysdk.cssloader.load(data.resources.css);
            var absoluteUrl = /^https?:\/\//i;

            var makeProxyUrl = function(url) {
                return absoluteUrl.test(url) || url.indexOf('//') === 0 ? url : baseSaveUrl + url;
            };

            var jsResources = $.map(data.resources.js, $.proxy(function(url) {
            	url = this.resourceUrl(url);
                if (url.indexOf('order!') === 0) {
                    return 'order!' + makeProxyUrl(url.substr(6));
                } else {
                    return makeProxyUrl(url);
                }
            }, this));

            require(jsResources, $.proxy(function() {
                if (typeof baseSaveUrl === "undefined") {
                    baseSaveUrl = data.instance.baseSaveUrl;
                }

                var instance = this.createInstance(data, baseSaveUrl);
                if (typeof callback === "function") {
                    callback(data, instance);
                }
            }, this));

            return data.instance.id;
        },

        /**
         * Creates an new instance/object of a webcomponent based on instance-id
         * from persistance.
         *
         * @param {object} data json-ified data coming from the server
         *
         * @param {string} baseSaveUrl
         *
         * @return {object} instance Instance/object of the new/retrieved webcomponent
         */
        createInstance : function(data, baseSaveUrl) {
            var instance = null;

            if (diysdk.webcomponents[data.instance.id]) {
                instance = diysdk.webcomponents[data.instance.id];
            } else {
                var componentClass = null;
                if (diysdk[data.instance.app.name] && diysdk[data.instance.app.name][data.instance.name]) {
                    componentClass = diysdk[data.instance.app.name][data.instance.name];
                } else {
                    componentClass = diysdk.basic;
                }

                instance = new componentClass(data, baseSaveUrl);
                diysdk.webcomponents[data.instance.id] = instance;
            }

            this.createViewInstance({
                instance: instance,
                view: data.instance.view,
                data: data.instance.data,
                embeddedComponents: data.embeddedComponents,
                baseSaveUrl: baseSaveUrl
            });

            return instance;
        },

        /**
         * Creates client instances/objects for embedded components in a
         * webcomponent and wires events between
         *
         * @param {object} parentView parent to all components in {components}
         *
         * @param {array} components array of child components of {parentInstance}
         *
         * @param {string} baseSaveUrl
         *
         */
        createEmbeddedInstances : function(parentView, components, baseSaveUrl, isSitebuilder) {
            var embeddedInstances = {},
                eventsToWire      = [],
                dataBindings      = [];

            $.each(components, $.proxy(function(id, component) {
                var instance = null;

                if (parentView && parentView.childInstances[id]) {
                    instance = parentView.childInstances[id];
                } else {

                    instance = this.createOneEmbeddedInstance(component, parentView, baseSaveUrl, id, isSitebuilder);

                    // aggregate wiring events
                    if (component.events && component.events.length > 0) {
                        $.each(component.events, function(i, eventInfo) {
                            eventsToWire.push($.extend(eventInfo, {
                                instance : instance
                            }));
                        });
                    }

                    // aggregate data bindings
                    if (component.dataSource) {
                        dataBindings.push($.extend(component.dataSource, {
                            instance : instance
                        }));
                    }
                }

                embeddedInstances[id] = instance;

                // init view
                var mainJQ = $('#' + diysdk.fixJQueryIdSelector(component.id));

                this.createViewInstance({
                    instance: instance,
                    view: component.view,
                    mainJQ: mainJQ,
                    data: component.data,
                    embeddedComponents: component.embeddedComponents,
                    parentView: parentView
                });

            }, this));

            this.wireEmbeddedInstances(eventsToWire, embeddedInstances);

            this.wireDataBindings(dataBindings, embeddedInstances);
        },

        /**
         * Create and initialize a view instance
         * @param {object} options = {
         *    view: {string} - the name of the view
         *    mainJQ: {jQuery DOM node} - the main div of the view (optional)
         *    data: {object} - data to pass to the view
         *    embeddedComponents: {array} - the embedded components
         *    baseSaveUrl: {string} - the base url of the proxy
         *    parentView: {object} - the parent view object
         * }
         */
        createViewInstance : function(options) {
            var view = options.instance.initView(options.view, options.mainJQ, options.data, options.parentView);

            // go into recursion for embedded components
            if (options.embeddedComponents) {
                this.createEmbeddedInstances(
                        view,
                        options.embeddedComponents,
                        options.baseSaveUrl,
                        options.instance.isSitebuilderMode()
                );
            }

            if (view.name == 'web' && options.instance.isSitebuilderMode() == true) {
                view.getMainJQ().webOverlay();
            }

            view.bindEvents();

            if (typeof view.initChildInstances === "function") {
                view.initChildInstances();
            }
        },

        /**
         * Creates an instance/object of a component based on configuration coming
         * from server.
         *
         * @param {object} component json-ified configuration from server
         *
         * @param {object} parentView of the here new created instance
         *
         * @param {string} baseSaveUrl
         *
         * @param {string} internalId Id of the component given by the developer, visible
         * only within the embedding component
         *
         * @return {object} instance The created instance
         */
        createOneEmbeddedInstance : function(component, parentView, baseSaveUrl, internalId) {
            var componentClass = null;
            if (diysdk[component.app] && diysdk[component.app][component.component]) {
                componentClass = diysdk[component.app][component.component];
            } else {
                componentClass = diysdk.basic;
            }

            // create new instance of {componentClass}
            var instance = new componentClass(component.data, baseSaveUrl);
            instance.internalId = internalId;
            parentView.childInstances[internalId] = instance;

            return instance;
        },

        /**
         * Wires events of embedded components based on the configuration initially
         * coming from markup
         *
         * @param {array} eventsToWire event configuration including callbacks
         *
         * @param {object} instances instances of embedded components
         *
         */
        wireEmbeddedInstances : function(eventsToWire, instances) {
            $.each(eventsToWire, $.proxy(function(i, eventInfo) {

                if (!instances[eventInfo.source]) {
                    console.warn("error wiring events: component not found: " + eventInfo.source);
                    return;
                }

                var sourceInstance = instances[eventInfo.source];

                if (eventInfo.handler) {
                    var error = false;

                    if (!eventInfo.instance[eventInfo.handler]) {
                        console.warn("error wiring events: method not found: " + eventInfo.handler);
                        error = true;
                    }

                    if (!eventInfo.name) {
                        console.warn("error wiring events: event name not specified");
                        error = true;
                    }

                    if (!error) {
                        var handler = $.proxy(eventInfo.instance[eventInfo.handler], eventInfo.instance);

                        sourceInstance.on(eventInfo.name, handler);
                    }
                }
            }, this));
        },

        /**
         * Wires events for data bindings
         *
         * @param {array} dataBindings The data bindings
         * @param {array} instances The embedded instances
         */
        wireDataBindings : function(dataBindings, instances) {

            var paramValues = {};

            $.each(dataBindings, $.proxy(function(i, dataBinding) {

                if (!instances[dataBinding.source]) {
                    console.warn("error wiring events: component not found: " + dataBinding.source);
                    return;
                }

                var sourceInstance = instances[dataBinding.source];

                var handler = $.proxy(function(value) {

                    var oldValue = paramValues[dataBinding.param];
                    paramValues[dataBinding.param] = value;

                    this.dataSourceUpdated({
                        oldValue : oldValue,
                        newValue : value,
                        param : dataBinding.param,
                        params : paramValues
                    });

                }, dataBinding.instance);

                sourceInstance.on('valueChange', handler);
            }, this));
        },

        /**
         * Checks if resource was already requested through any static proxy and returns the requested url
         *
         * @param {string} url - absolute/relative resource url, also handles !order prefix
         *
         * @return {string}
         */
        resourceUrl : function(url) {

            var resourceUrl = /.*\/proxy\/apps\/.*\/s\/(.*)/;

            if (resourceUrl.test(url)) {
            	var urlPattern = url.replace(resourceUrl,'$1');

            	if (typeof this.loadedResources[urlPattern] === "undefined") {
                	this.loadedResources[urlPattern] = url;
            	}

            	return this.loadedResources[urlPattern];
            } else {
            	return url;
            }
        }
    });

    diysdk.webcomponentIntegrator.myStaticProperties = {};

})(window.jQuery);(function($, window) {

    /**
     * get the absolute version of a URL
     */
    var getAbsoluteUrl = function(url) {
        if (/^[^:\/]+:\/\//.exec(url) || url.indexOf('//') === 0) {
            // absolute URL
            return url;
        } else if (url.substring(0, 1) === '/') {
            // domain-relative URL
            return window.location.protocol + '//' + window.location.host + url;
        }

        // path-relative URL
        return window.location.protocol + '//' + window.location.host + window.location.pathname.replace(/[^\/]*$/, '') + url;
    };

    window.diysdk.cssloader = {
        // object with already loaded css files
        loadedcss: [],
        initialized : false,

        init : function() {
            $('head link[rel="stylesheet"], head link[type="text/css"]').each($.proxy(function(index, link) {
                var url = getAbsoluteUrl(link.href);
                if ($.inArray(url, this.loadedcss) === -1) {
                    this.loadedcss.push(url);
                }
            }, this));
            this.initialized = true;
        },

        // load the given css if not already loaded
        load: function(url) {
            if (!this.initialized) {
                this.init();
            }

            if(typeof url === 'object') {
                var parent = this;
                $.each(url, function(key, value) {
                    parent._loadaction(value);
                });
            } else if (typeof url === 'string') {
                this._loadaction(url);
            }
        },

        _loadaction: function(url) {

            url = getAbsoluteUrl(url);

            if ($.inArray(url, this.loadedcss) === -1) {

                var sheet = $('<link type="text/css" rel="stylesheet" href="'+url+'" />');
                sheet.appendTo('head');

                if($.inArray(sheet[0].href, this.loadedcss) !== -1) {
                    // to prevent double loaded css files we remove it if our filter hasn't noticed it before
                    $('body').remove(sheet);
                } else {
                    this.loadedcss[this.loadedcss.length] = sheet[0].href;
                }

                this.loadedcss.push(url);
            }
        }
    };

})(window.jQuery, window);/*
Pure Javascript implementation of Uniforum message translation.
Copyright (C) 2008 Joshua I. Miller <unrtst@cpan.org>, all rights reserved

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU Library General Public License as published
by the Free Software Foundation; either version 2, or (at your option)
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Library General Public License for more details.

You should have received a copy of the GNU Library General Public
License along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307,
USA.

=head1 NAME

Javascript Gettext - Javascript implemenation of GNU Gettext API.

=head1 SYNOPSIS

 // //////////////////////////////////////////////////////////
 // Optimum caching way
 <script language="javascript" src="/path/LC_MESSAGES/myDomain.json"></script>
 <script language="javascript" src="/path/Gettext.js'></script>

 // assuming myDomain.json defines variable json_locale_data
 var params = {  "domain" : "myDomain",
                 "locale_data" : json_locale_data
              };
 var gt = new Gettext(params);
 // create a shortcut if you'd like
 function _ (msgid) { return gt.gettext(msgid); }
 alert(_("some string"));
 // or use fully named method
 alert(gt.gettext("some string"));
 // change to use a different "domain"
 gt.textdomain("anotherDomain");
 alert(gt.gettext("some string"));


 // //////////////////////////////////////////////////////////
 // The other way to load the language lookup is a "link" tag
 // Downside is that not all browsers cache XMLHttpRequests the
 // same way, so caching of the language data isn't guarenteed
 // across page loads.
 // Upside is that it's easy to specify multiple files
 <link rel="gettext" href="/path/LC_MESSAGES/myDomain.json" />
 <script language="javascript" src="/path/Gettext.js'></script>

 var gt = new Gettext({ "domain" : "myDomain" });
 // rest is the same


 // //////////////////////////////////////////////////////////
 // The reson the shortcuts aren't exported by default is because they'd be
 // glued to the single domain you created. So, if you're adding i18n support
 // to some js library, you should use it as so:

 if (typeof(MyNamespace) == 'undefined') MyNamespace = {};
 MyNamespace.MyClass = function () {
     var gtParms = { "domain" : 'MyNamespace_MyClass' };
     this.gt = new Gettext(gtParams);
     return this;
 };
 MyNamespace.MyClass.prototype._ = function (msgid) {
     return this.gt.gettext(msgid);
 };
 MyNamespace.MyClass.prototype.something = function () {
     var myString = this._("this will get translated");
 };

 // //////////////////////////////////////////////////////////
 // Adding the shortcuts to a global scope is easier. If that's
 // ok in your app, this is certainly easier.
 var myGettext = new Gettext({ 'domain' : 'myDomain' });
 function _ (msgid) {
     return myGettext.gettext(msgid);
 }
 alert( _("text") );

 // //////////////////////////////////////////////////////////
 // Data structure of the json data
 // NOTE: if you're loading via the <script> tag, you can only
 // load one file, but it can contain multiple domains.
 var json_locale_data = {
     "MyDomain" : {
         "" : {
             "header_key" : "header value",
             "header_key" : "header value",
         "msgid" : [ "msgid_plural", "msgstr", "msgstr_plural", "msgstr_pluralN" ],
         "msgctxt\004msgid" : [ null, "msgstr" ],
         },
     "AnotherDomain" : {
         },
     }

=head1 DESCRIPTION

This is a javascript implementation of GNU Gettext, providing internationalization support for javascript. It differs from existing javascript implementations in that it will support all current Gettext features (ex. plural and context support), and will also support loading language catalogs from .mo, .po, or preprocessed json files (converter included).

The locale initialization differs from that of GNU Gettext / POSIX. Rather than setting the category, domain, and paths, and letting the libs find the right file, you must explicitly load the file at some point. The "domain" will still be honored. Future versions may be expanded to include support for set_locale like features.


=head1 INSTALL

To install this module, simply copy the file lib/Gettext.js to a web accessable location, and reference it from your application.


=head1 CONFIGURATION

Configure in one of two ways:

=over

=item 1. Optimal. Load language definition from statically defined json data.

    <script language="javascript" src="/path/locale/domain.json"></script>

    // in domain.json
    json_locale_data = {
        "mydomain" : {
            // po header fields
            "" : {
                "plural-forms" : "...",
                "lang" : "en",
                },
            // all the msgid strings and translations
            "msgid" : [ "msgid_plural", "translation", "plural_translation" ],
        },
    };
    // please see the included bin/po2json script for the details on this format

This method also allows you to use unsupported file formats, so long as you can parse them into the above format.

=item 2. Use AJAX to load language file.

Use XMLHttpRequest (actually, SJAX - syncronous) to load an external resource.

Supported external formats are:

=over

=item * Javascript Object Notation (.json)

(see bin/po2json)

    type=application/json

=item * Uniforum Portable Object (.po)

(see GNU Gettext's xgettext)

    type=application/x-po

=item * Machine Object (compiled .po) (.mo)

NOTE: .mo format isn't actually supported just yet, but support is planned.

(see GNU Gettext's msgfmt)

    type=application/x-mo

=back

=back

=head1 METHODS

The following methods are implemented:

  new Gettext(args)
  textdomain  (domain)
  gettext     (msgid)
  dgettext    (domainname, msgid)
  dcgettext   (domainname, msgid, LC_MESSAGES)
  ngettext    (msgid, msgid_plural, count)
  dngettext   (domainname, msgid, msgid_plural, count)
  dcngettext  (domainname, msgid, msgid_plural, count, LC_MESSAGES)
  pgettext    (msgctxt, msgid)
  dpgettext   (domainname, msgctxt, msgid)
  dcpgettext  (domainname, msgctxt, msgid, LC_MESSAGES)
  npgettext   (msgctxt, msgid, msgid_plural, count)
  dnpgettext  (domainname, msgctxt, msgid, msgid_plural, count)
  dcnpgettext (domainname, msgctxt, msgid, msgid_plural, count, LC_MESSAGES)
  strargs     (string, args_array)


=head2 new Gettext (args)

Several methods of loading locale data are included. You may specify a plugin or alternative method of loading data by passing the data in as the "locale_data" option. For example:

    var get_locale_data = function () {
        // plugin does whatever to populate locale_data
        return locale_data;
    };
    var gt = new Gettext( 'domain' : 'messages',
                          'locale_data' : get_locale_data() );

The above can also be used if locale data is specified in a statically included <SCRIPT> tag. Just specify the variable name in the call to new. Ex:

    var gt = new Gettext( 'domain' : 'messages',
                          'locale_data' : json_locale_data_variable );

Finally, you may load the locale data by referencing it in a <LINK> tag. Simply exclude the 'locale_data' option, and all <LINK rel="gettext" ...> items will be tried. The <LINK> should be specified as:

    <link rel="gettext" type="application/json" href="/path/to/file.json">
    <link rel="gettext" type="text/javascript"  href="/path/to/file.json">
    <link rel="gettext" type="application/x-po" href="/path/to/file.po">
    <link rel="gettext" type="application/x-mo" href="/path/to/file.mo">

args:

=over

=item domain

The Gettext domain, not www.whatev.com. It's usually your applications basename. If the .po file was "myapp.po", this would be "myapp".

=item locale_data

Raw locale data (in json structure). If specified, from_link data will be ignored.

=back

=cut

*/

Gettext = function (args) {
    this.domain         = 'messages';
    // locale_data will be populated from <link...> if not specified in args
    this.locale_data    = undefined;

    // set options
    var options = [ "domain", "locale_data" ];
    if (this.isValidObject(args)) {
        for (var i in args) {
            for (var j=0; j<options.length; j++) {
                if (i == options[j]) {
                    // don't set it if it's null or undefined
                    if (this.isValidObject(args[i]))
                        this[i] = args[i];
                }
            }
        }
    }


    // try to load the lang file from somewhere
    this.try_load_lang();

    return this;
}

Gettext.context_glue = "\004";
Gettext._locale_data = {};

Gettext.prototype.try_load_lang = function() {
    // check to see if language is statically included
    if (typeof(this.locale_data) != 'undefined') {
        // we're going to reformat it, and overwrite the variable
        var locale_copy = this.locale_data;
        this.locale_data = undefined;
        this.parse_locale_data(locale_copy);

        if (typeof(Gettext._locale_data[this.domain]) == 'undefined') {
            throw new Error("Error: Gettext 'locale_data' does not contain the domain '"+this.domain+"'");
        }
    }


    // try loading from JSON
    // get lang links
    var lang_link = this.get_lang_refs();

    if (typeof(lang_link) == 'object' && lang_link.length > 0) {
        // NOTE: there will be a delay here, as this is async.
        // So, any i18n calls made right after page load may not
        // get translated.
        // XXX: we may want to see if we can "fix" this behavior
        for (var i=0; i<lang_link.length; i++) {
            var link = lang_link[i];
            if (link.type == 'application/json') {
                if (! this.try_load_lang_json(link.href) ) {
                    throw new Error("Error: Gettext 'try_load_lang_json' failed. Unable to exec xmlhttprequest for link ["+link.href+"]");
                }
            } else if (link.type == 'application/x-po') {
                if (! this.try_load_lang_po(link.href) ) {
                    throw new Error("Error: Gettext 'try_load_lang_po' failed. Unable to exec xmlhttprequest for link ["+link.href+"]");
                }
            } else {
                // TODO: implement the other types (.mo)
                throw new Error("TODO: link type ["+link.type+"] found, and support is planned, but not implemented at this time.");
            }
        }
    }
};

// This takes the bin/po2json'd data, and moves it into an internal form
// for use in our lib, and puts it in our object as:
//  Gettext._locale_data = {
//      domain : {
//          head : { headfield : headvalue },
//          msgs : {
//              msgid : [ msgid_plural, msgstr, msgstr_plural ],
//          },
Gettext.prototype.parse_locale_data = function(locale_data) {
    if (typeof(Gettext._locale_data) == 'undefined') {
        Gettext._locale_data = { };
    }

    // suck in every domain defined in the supplied data
    for (var domain in locale_data) {
        // skip empty specs (flexibly)
        if ((! locale_data.hasOwnProperty(domain)) || (! this.isValidObject(locale_data[domain])))
            continue;
        // skip if it has no msgid's
        var has_msgids = false;
        for (var msgid in locale_data[domain]) {
            has_msgids = true;
            break;
        }
        if (! has_msgids) continue;

        // grab shortcut to data
        var data = locale_data[domain];

        // if they specifcy a blank domain, default to "messages"
        if (domain == "") domain = "messages";
        // init the data structure
        if (! this.isValidObject(Gettext._locale_data[domain]) )
            Gettext._locale_data[domain] = { };
        if (! this.isValidObject(Gettext._locale_data[domain].head) )
            Gettext._locale_data[domain].head = { };
        if (! this.isValidObject(Gettext._locale_data[domain].msgs) )
            Gettext._locale_data[domain].msgs = { };

        for (var key in data) {
            if (key == "") {
                var header = data[key];
                for (var head in header) {
                    var h = head.toLowerCase();
                    Gettext._locale_data[domain].head[h] = header[head];
                }
            } else {
                Gettext._locale_data[domain].msgs[key] = data[key];
            }
        }
    }

    // build the plural forms function
    for (var domain in Gettext._locale_data) {
        if (this.isValidObject(Gettext._locale_data[domain].head['plural-forms']) &&
            typeof(Gettext._locale_data[domain].head.plural_func) == 'undefined') {
            // untaint data
            var plural_forms = Gettext._locale_data[domain].head['plural-forms'];
            var pf_re = new RegExp('^(\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;a-zA-Z0-9_\(\)])+)', 'm');
            if (pf_re.test(plural_forms)) {
                //ex english: "Plural-Forms: nplurals=2; plural=(n != 1);\n"
                //pf = "nplurals=2; plural=(n != 1);";
                //ex russian: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10< =4 && (n%100<10 or n%100>=20) ? 1 : 2)
                //pf = "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)";

                var pf = Gettext._locale_data[domain].head['plural-forms'];
                if (! /;\s*$/.test(pf)) pf = pf.concat(';');
                /* We used to use eval, but it seems IE has issues with it.
                 * We now use "new Function", though it carries a slightly
                 * bigger performance hit.
                var code = 'function (n) { var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) }; };';
                Gettext._locale_data[domain].head.plural_func = eval("("+code+")");
                */
                var code = 'var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) };';
                Gettext._locale_data[domain].head.plural_func = new Function("n", code);
            } else {
                throw new Error("Syntax error in language file. Plural-Forms header is invalid ["+plural_forms+"]");
            }   

        // default to english plural form
        } else if (typeof(Gettext._locale_data[domain].head.plural_func) == 'undefined') {
            Gettext._locale_data[domain].head.plural_func = function (n) {
                var p = (n != 1) ? 1 : 0;
                return { 'nplural' : 2, 'plural' : p };
                };
        } // else, plural_func already created
    }

    return;
};


// try_load_lang_po : do an ajaxy call to load in the .po lang defs
Gettext.prototype.try_load_lang_po = function(uri) {
    var data = this.sjax(uri);
    if (! data) return;

    var domain = this.uri_basename(uri);
    var parsed = this.parse_po(data);

    var rv = {};
    // munge domain into/outof header
    if (parsed) {
        if (! parsed[""]) parsed[""] = {};
        if (! parsed[""]["domain"]) parsed[""]["domain"] = domain;
        domain = parsed[""]["domain"];
        rv[domain] = parsed;

        this.parse_locale_data(rv);
    }

    return 1;
};

Gettext.prototype.uri_basename = function(uri) {
    var rv;
    if (rv = uri.match(/^(.*\/)?(.*)/)) {
        var ext_strip;
        if (ext_strip = rv[2].match(/^(.*)\..+$/))
            return ext_strip[1];
        else
            return rv[2];
    } else {
        return "";
    }
};

Gettext.prototype.parse_po = function(data) {
    var rv = {};
    var buffer = {};
    var lastbuffer = "";
    var errors = [];
    var lines = data.split("\n");
    for (var i=0; i<lines.length; i++) {
        // chomp
        lines[i] = lines[i].replace(/(\n|\r)+$/, '');

        var match;

        // Empty line / End of an entry.
        if (/^$/.test(lines[i])) {
            if (typeof(buffer['msgid']) != 'undefined') {
                var msg_ctxt_id = (typeof(buffer['msgctxt']) != 'undefined' &&
                                   buffer['msgctxt'].length) ?
                                  buffer['msgctxt']+Gettext.context_glue+buffer['msgid'] :
                                  buffer['msgid'];
                var msgid_plural = (typeof(buffer['msgid_plural']) != 'undefined' &&
                                    buffer['msgid_plural'].length) ?
                                   buffer['msgid_plural'] :
                                   null;

                // find msgstr_* translations and push them on
                var trans = [];
                for (var str in buffer) {
                    var match;
                    if (match = str.match(/^msgstr_(\d+)/))
                        trans[parseInt(match[1])] = buffer[str];
                }
                trans.unshift(msgid_plural);

                // only add it if we've got a translation
                // NOTE: this doesn't conform to msgfmt specs
                if (trans.length > 1) rv[msg_ctxt_id] = trans;

                buffer = {};
                lastbuffer = "";
            }

        // comments
        } else if (/^#/.test(lines[i])) {
            continue;

        // msgctxt
        } else if (match = lines[i].match(/^msgctxt\s+(.*)/)) {
            lastbuffer = 'msgctxt';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgid
        } else if (match = lines[i].match(/^msgid\s+(.*)/)) {
            lastbuffer = 'msgid';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgid_plural
        } else if (match = lines[i].match(/^msgid_plural\s+(.*)/)) {
            lastbuffer = 'msgid_plural';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgstr
        } else if (match = lines[i].match(/^msgstr\s+(.*)/)) {
            lastbuffer = 'msgstr_0';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgstr[0] (treak like msgstr)
        } else if (match = lines[i].match(/^msgstr\[0\]\s+(.*)/)) {
            lastbuffer = 'msgstr_0';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgstr[n]
        } else if (match = lines[i].match(/^msgstr\[(\d+)\]\s+(.*)/)) {
            lastbuffer = 'msgstr_'+match[1];
            buffer[lastbuffer] = this.parse_po_dequote(match[2]);

        // continued string
        } else if (/^"/.test(lines[i])) {
            buffer[lastbuffer] += this.parse_po_dequote(lines[i]);

        // something strange
        } else {
            errors.push("Strange line ["+i+"] : "+lines[i]);
        }
    }


    // handle the final entry
    if (typeof(buffer['msgid']) != 'undefined') {
        var msg_ctxt_id = (typeof(buffer['msgctxt']) != 'undefined' &&
                           buffer['msgctxt'].length) ?
                          buffer['msgctxt']+Gettext.context_glue+buffer['msgid'] :
                          buffer['msgid'];
        var msgid_plural = (typeof(buffer['msgid_plural']) != 'undefined' &&
                            buffer['msgid_plural'].length) ?
                           buffer['msgid_plural'] :
                           null;

        // find msgstr_* translations and push them on
        var trans = [];
        for (var str in buffer) {
            var match;
            if (match = str.match(/^msgstr_(\d+)/))
                trans[parseInt(match[1])] = buffer[str];
        }
        trans.unshift(msgid_plural);

        // only add it if we've got a translation
        // NOTE: this doesn't conform to msgfmt specs
        if (trans.length > 1) rv[msg_ctxt_id] = trans;

        buffer = {};
        lastbuffer = "";
    }


    // parse out the header
    if (rv[""] && rv[""][1]) {
        var cur = {};
        var hlines = rv[""][1].split(/\\n/);
        for (var i=0; i<hlines.length; i++) {
            if (! hlines.length) continue;

            var pos = hlines[i].indexOf(':', 0);
            if (pos != -1) {
                var key = hlines[i].substring(0, pos);
                var val = hlines[i].substring(pos +1);
                var keylow = key.toLowerCase();

                if (cur[keylow] && cur[keylow].length) {
                    errors.push("SKIPPING DUPLICATE HEADER LINE: "+hlines[i]);
                } else if (/#-#-#-#-#/.test(keylow)) {
                    errors.push("SKIPPING ERROR MARKER IN HEADER: "+hlines[i]);
                } else {
                    // remove begining spaces if any
                    val = val.replace(/^\s+/, '');
                    cur[keylow] = val;
                }

            } else {
                errors.push("PROBLEM LINE IN HEADER: "+hlines[i]);
                cur[hlines[i]] = '';
            }
        }

        // replace header string with assoc array
        rv[""] = cur;
    } else {
        rv[""] = {};
    }

    // TODO: XXX: if there are errors parsing, what do we want to do?
    // GNU Gettext silently ignores errors. So will we.
    // alert( "Errors parsing po file:\n" + errors.join("\n") );

    return rv;
};


Gettext.prototype.parse_po_dequote = function(str) {
    var match;
    if (match = str.match(/^"(.*)"/)) {
        str = match[1];
    }
    // unescale all embedded quotes (fixes bug #17504)
    str = str.replace(/\\"/g, "\"");
    return str;
};


// try_load_lang_json : do an ajaxy call to load in the lang defs
Gettext.prototype.try_load_lang_json = function(uri) {
    var data = this.sjax(uri);
    if (! data) return;

    var rv = this.JSON(data);
    this.parse_locale_data(rv);

    return 1;
};

// this finds all <link> tags, filters out ones that match our
// specs, and returns a list of hashes of those
Gettext.prototype.get_lang_refs = function() {
    var langs = new Array();
    var links = document.getElementsByTagName("link");
    // find all <link> tags in dom; filter ours
    for (var i=0; i<links.length; i++) {
        if (links[i].rel == 'gettext' && links[i].href) {
            if (typeof(links[i].type) == 'undefined' ||
                links[i].type == '') {
                if (/\.json$/i.test(links[i].href)) {
                    links[i].type = 'application/json';
                } else if (/\.js$/i.test(links[i].href)) {
                    links[i].type = 'application/json';
                } else if (/\.po$/i.test(links[i].href)) {
                    links[i].type = 'application/x-po';
                } else if (/\.mo$/i.test(links[i].href)) {
                    links[i].type = 'application/x-mo';
                } else {
                    throw new Error("LINK tag with rel=gettext found, but the type and extension are unrecognized.");
                }
            }

            links[i].type = links[i].type.toLowerCase();
            if (links[i].type == 'application/json') {
                links[i].type = 'application/json';
            } else if (links[i].type == 'text/javascript') {
                links[i].type = 'application/json';
            } else if (links[i].type == 'application/x-po') {
                links[i].type = 'application/x-po';
            } else if (links[i].type == 'application/x-mo') {
                links[i].type = 'application/x-mo';
            } else {
                throw new Error("LINK tag with rel=gettext found, but the type attribute ["+links[i].type+"] is unrecognized.");
            }

            langs.push(links[i]);
        }
    }
    return langs;
};


/*

=head2 textdomain( domain )

Set domain for future gettext() calls

A  message  domain  is  a  set of translatable msgid messages. Usually,
every software package has its own message domain. The domain  name  is
used to determine the message catalog where a translation is looked up;
it must be a non-empty string.

The current message domain is used by the gettext, ngettext, pgettext,
npgettext functions, and by the dgettext, dcgettext, dngettext, dcngettext,
dpgettext, dcpgettext, dnpgettext and dcnpgettext functions when called
with a NULL domainname argument.

If domainname is not NULL, the current message domain is set to
domainname.

If domainname is undefined, null, or empty string, the function returns
the current message domain.

If  successful,  the  textdomain  function  returns the current message
domain, after possibly changing it. (ie. if you set a new domain, the 
value returned will NOT be the previous domain).

=cut

*/
Gettext.prototype.textdomain = function (domain) {
    if (domain && domain.length) this.domain = domain;
    return this.domain;
}

/*

=head2 gettext( MSGID )

Returns the translation for B<MSGID>.  Example:

    alert( gt.gettext("Hello World!\n") );

If no translation can be found, the unmodified B<MSGID> is returned,
i. e. the function can I<never> fail, and will I<never> mess up your
original message.

One common mistake is to interpolate a variable into the string like this:

  var translated = gt.gettext("Hello " + full_name);

The interpolation will happen before it's passed to gettext, and it's 
unlikely you'll have a translation for every "Hello Tom" and "Hello Dick"
and "Hellow Harry" that may arise.

Use C<strargs()> (see below) to solve this problem:

  var translated = Gettext.strargs( gt.gettext("Hello %1"), [full_name] );

This is espeically useful when multiple replacements are needed, as they 
may not appear in the same order within the translation. As an English to
French example:

  Expected result: "This is the red ball"
  English: "This is the %1 %2"
  French:  "C'est le %2 %1"
  Code: Gettext.strargs( gt.gettext("This is the %1 %2"), ["red", "ball"] );

(The example is stupid because neither color nor thing will get
translated here ...).

=head2 dgettext( TEXTDOMAIN, MSGID )

Like gettext(), but retrieves the message for the specified 
B<TEXTDOMAIN> instead of the default domain.  In case you wonder what
a textdomain is, see above section on the textdomain() call.

=head2 dcgettext( TEXTDOMAIN, MSGID, CATEGORY )

Like dgettext() but retrieves the message from the specified B<CATEGORY>
instead of the default category C<LC_MESSAGES>.

NOTE: the categories are really useless in javascript context. This is
here for GNU Gettext API compatability. In practice, you'll never need
to use this. This applies to all the calls including the B<CATEGORY>.


=head2 ngettext( MSGID, MSGID_PLURAL, COUNT )

Retrieves the correct translation for B<COUNT> items.  In legacy software
you will often find something like:

    alert( count + " file(s) deleted.\n" );

or

    printf(count + " file%s deleted.\n", $count == 1 ? '' : 's');

I<NOTE: javascript lacks a builtin printf, so the above isn't a working example>

The first example looks awkward, the second will only work in English
and languages with similar plural rules.  Before ngettext() was introduced,
the best practice for internationalized programs was:

    if (count == 1) {
        alert( gettext("One file deleted.\n") );
    } else {
        printf( gettext("%d files deleted.\n"), count );
    }

This is a nuisance for the programmer and often still not sufficient
for an adequate translation.  Many languages have completely different
ideas on numerals.  Some (French, Italian, ...) treat 0 and 1 alike,
others make no distinction at all (Japanese, Korean, Chinese, ...),
others have two or more plural forms (Russian, Latvian, Czech,
Polish, ...).  The solution is:

    printf( ngettext("One file deleted.\n",
                     "%d files deleted.\n",
                     count), // argument to ngettext!
            count);          // argument to printf!

In English, or if no translation can be found, the first argument
(B<MSGID>) is picked if C<count> is one, the second one otherwise.
For other languages, the correct plural form (of 1, 2, 3, 4, ...)
is automatically picked, too.  You don't have to know anything about
the plural rules in the target language, ngettext() will take care
of that.

This is most of the time sufficient but you will have to prove your
creativity in cases like

    "%d file(s) deleted, and %d file(s) created.\n"

That said, javascript lacks C<printf()> support. Supplied with Gettext.js
is the C<strargs()> method, which can be used for these cases:

    Gettext.strargs( gt.ngettext( "One file deleted.\n",
                                  "%d files deleted.\n",
                                  count), // argument to ngettext!
                     count); // argument to strargs!

NOTE: the variable replacement isn't done for you, so you must
do it yourself as in the above.

=head2 dngettext( TEXTDOMAIN, MSGID, MSGID_PLURAL, COUNT )

Like ngettext() but retrieves the translation from the specified
textdomain instead of the default domain.

=head2 dcngettext( TEXTDOMAIN, MSGID, MSGID_PLURAL, COUNT, CATEGORY )

Like dngettext() but retrieves the translation from the specified
category, instead of the default category C<LC_MESSAGES>.


=head2 pgettext( MSGCTXT, MSGID )

Returns the translation of MSGID, given the context of MSGCTXT.

Both items are used as a unique key into the message catalog.

This allows the translator to have two entries for words that may
translate to different foreign words based on their context. For
example, the word "View" may be a noun or a verb, which may be
used in a menu as File->View or View->Source.

    alert( pgettext( "Verb: To View", "View" ) );
    alert( pgettext( "Noun: A View", "View"  ) );

The above will both lookup different entries in the message catalog.

In English, or if no translation can be found, the second argument
(B<MSGID>) is returned.

=head2 dpgettext( TEXTDOMAIN, MSGCTXT, MSGID )

Like pgettext(), but retrieves the message for the specified 
B<TEXTDOMAIN> instead of the default domain.

=head2 dcpgettext( TEXTDOMAIN, MSGCTXT, MSGID, CATEGORY )

Like dpgettext() but retrieves the message from the specified B<CATEGORY>
instead of the default category C<LC_MESSAGES>.


=head2 npgettext( MSGCTXT, MSGID, MSGID_PLURAL, COUNT )

Like ngettext() with the addition of context as in pgettext().

In English, or if no translation can be found, the second argument
(MSGID) is picked if B<COUNT> is one, the third one otherwise.

=head2 dnpgettext( TEXTDOMAIN, MSGCTXT, MSGID, MSGID_PLURAL, COUNT )

Like npgettext() but retrieves the translation from the specified
textdomain instead of the default domain.

=head2 dcnpgettext( TEXTDOMAIN, MSGCTXT, MSGID, MSGID_PLURAL, COUNT, CATEGORY )

Like dnpgettext() but retrieves the translation from the specified
category, instead of the default category C<LC_MESSAGES>.

=cut

*/

// gettext
Gettext.prototype.gettext = function (msgid) {
    var msgctxt;
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dgettext = function (domain, msgid) {
    var msgctxt;
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dcgettext = function (domain, msgid, category) {
    var msgctxt;
    var msgid_plural;
    var n;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

// ngettext
Gettext.prototype.ngettext = function (msgid, msgid_plural, n) {
    var msgctxt;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dngettext = function (domain, msgid, msgid_plural, n) {
    var msgctxt;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dcngettext = function (domain, msgid, msgid_plural, n, category) {
    var msgctxt;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category, category);
};

// pgettext
Gettext.prototype.pgettext = function (msgctxt, msgid) {
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dpgettext = function (domain, msgctxt, msgid) {
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dcpgettext = function (domain, msgctxt, msgid, category) {
    var msgid_plural;
    var n;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

// npgettext
Gettext.prototype.npgettext = function (msgctxt, msgid, msgid_plural, n) {
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dnpgettext = function (domain, msgctxt, msgid, msgid_plural, n) {
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

// this has all the options, so we use it for all of them.
Gettext.prototype.dcnpgettext = function (domain, msgctxt, msgid, msgid_plural, n, category) {
    if (! this.isValidObject(msgid)) return '';

    var plural = this.isValidObject(msgid_plural);
    var msg_ctxt_id = this.isValidObject(msgctxt) ? msgctxt+Gettext.context_glue+msgid : msgid;

    var domainname = this.isValidObject(domain)      ? domain :
                     this.isValidObject(this.domain) ? this.domain :
                                                       'messages';

    // category is always LC_MESSAGES. We ignore all else
    var category_name = 'LC_MESSAGES';
    var category = 5;

    var locale_data = new Array();
    if (typeof(Gettext._locale_data) != 'undefined' &&
        this.isValidObject(Gettext._locale_data[domainname])) {
        locale_data.push( Gettext._locale_data[domainname] );

    } else if (typeof(Gettext._locale_data) != 'undefined') {
        // didn't find domain we're looking for. Search all of them.
        for (var dom in Gettext._locale_data) {
            locale_data.push( Gettext._locale_data[dom] );
        }
    }

    var trans = [];
    var found = false;
    var domain_used; // so we can find plural-forms if needed
    if (locale_data.length) {
        for (var i=0; i<locale_data.length; i++) {
            var locale = locale_data[i];
            if (this.isValidObject(locale.msgs[msg_ctxt_id])) {
                // make copy of that array (cause we'll be destructive)
                for (var j=0; j<locale.msgs[msg_ctxt_id].length; j++) {
                    trans[j] = locale.msgs[msg_ctxt_id][j];
                }
                trans.shift(); // throw away the msgid_plural
                domain_used = locale;
                found = true;
                // only break if found translation actually has a translation.
                if ( trans.length > 0 && trans[0].length != 0 )
                    break;
            }
        }
    }

    // default to english if we lack a match, or match has zero length
    if ( trans.length == 0 || trans[0].length == 0 ) {
        trans = [ msgid, msgid_plural ];
    }

    var translation = trans[0];
    if (plural) {
        var p;
        if (found && this.isValidObject(domain_used.head.plural_func) ) {
            var rv = domain_used.head.plural_func(n);
            if (! rv.plural) rv.plural = 0;
            if (! rv.nplural) rv.nplural = 0;
            // if plurals returned is out of bound for total plural forms
            if (rv.nplural <= rv.plural) rv.plural = 0;
            p = rv.plural;
        } else {
            p = (n != 1) ? 1 : 0;
        }
        if (this.isValidObject(trans[p]))
            translation = trans[p];
    }

    return translation;
};


/*

=head2 strargs (string, argument_array)

  string : a string that potentially contains formatting characters.
  argument_array : an array of positional replacement values

This is a utility method to provide some way to support positional parameters within a string, as javascript lacks a printf() method.

The format is similar to printf(), but greatly simplified (ie. fewer features).

Any percent signs followed by numbers are replaced with the corrosponding item from the B<argument_array>.

Example:

    var string = "%2 roses are red, %1 violets are blue";
    var args   = new Array("10", "15");
    var result = Gettext.strargs(string, args);
    // result is "15 roses are red, 10 violets are blue"

The format numbers are 1 based, so the first itme is %1.

A lone percent sign may be escaped by preceeding it with another percent sign.

A percent sign followed by anything other than a number or another percent sign will be passed through as is.

Some more examples should clear up any abmiguity. The following were called with the orig string, and the array as Array("[one]", "[two]") :

  orig string "blah" becomes "blah"
  orig string "" becomes ""
  orig string "%%" becomes "%"
  orig string "%%%" becomes "%%"
  orig string "%%%%" becomes "%%"
  orig string "%%%%%" becomes "%%%"
  orig string "tom%%dick" becomes "tom%dick"
  orig string "thing%1bob" becomes "thing[one]bob"
  orig string "thing%1%2bob" becomes "thing[one][two]bob"
  orig string "thing%1asdf%2asdf" becomes "thing[one]asdf[two]asdf"
  orig string "%1%2%3" becomes "[one][two]"
  orig string "tom%1%%2%aDick" becomes "tom[one]%2%aDick"

This is especially useful when using plurals, as the string will nearly always contain the number.

It's also useful in translated strings where the translator may have needed to move the position of the parameters.

For example:

  var count = 14;
  Gettext.strargs( gt.ngettext('one banana', '%1 bananas', count), [count] );

NOTE: this may be called as an instance method, or as a class method.

  // instance method:
  var gt = new Gettext(params);
  gt.strargs(string, args);

  // class method:
  Gettext.strargs(string, args);

=cut

*/
/* utility method, since javascript lacks a printf */
Gettext.strargs = function (str, args) {
    // make sure args is an array
    if ( null == args ||
         'undefined' == typeof(args) ) {
        args = [];
    } else if (args.constructor != Array) {
        args = [args];
    }

    // NOTE: javascript lacks support for zero length negative look-behind
    // in regex, so we must step through w/ index.
    // The perl equiv would simply be:
    //    $string =~ s/(?<!\%)\%([0-9]+)/$args[$1]/g;
    //    $string =~ s/\%\%/\%/g; # restore escaped percent signs

    var newstr = "";
    while (true) {
        var i = str.indexOf('%');
        var match_n;

        // no more found. Append whatever remains
        if (i == -1) {
            newstr += str;
            break;
        }

        // we found it, append everything up to that
        newstr += str.substr(0, i);

        // check for escpaed %%
        if (str.substr(i, 2) == '%%') {
            newstr += '%';
            str = str.substr((i+2));

        // % followed by number
        } else if ( match_n = str.substr(i).match(/^%(\d+)/) ) {
            var arg_n = parseInt(match_n[1]);
            var length_n = match_n[1].length;
            if ( arg_n > 0 && args[arg_n -1] != null && typeof(args[arg_n -1]) != 'undefined' )
                newstr += args[arg_n -1];
            str = str.substr( (i + 1 + length_n) );

        // % followed by some other garbage - just remove the %
        } else {
            newstr += '%';
            str = str.substr((i+1));
        }
    }

    return newstr;
}

/* instance method wrapper of strargs */
Gettext.prototype.strargs = function (str, args) {
    return Gettext.strargs(str, args);
}

/* verify that something is an array */
Gettext.prototype.isArray = function (thisObject) {
    return this.isValidObject(thisObject) && thisObject.constructor == Array;
};

/* verify that an object exists and is valid */
Gettext.prototype.isValidObject = function (thisObject) {
    if (null == thisObject) {
        return false;
    } else if ('undefined' == typeof(thisObject) ) {
        return false;
    } else {
        return true;
    }
};

Gettext.prototype.sjax = function (uri) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (navigator.userAgent.toLowerCase().indexOf('msie 5') != -1) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }

    if (! xmlhttp)
        throw new Error("Your browser doesn't do Ajax. Unable to support external language files.");

    xmlhttp.open('GET', uri, false);
    try { xmlhttp.send(null); }
    catch (e) { return; }

    // we consider status 200 and 0 as ok.
    // 0 happens when we request local file, allowing this to run on local files
    var sjax_status = xmlhttp.status;
    if (sjax_status == 200 || sjax_status == 0) {
        return xmlhttp.responseText;
    } else {
        var error = xmlhttp.statusText + " (Error " + xmlhttp.status + ")";
        if (xmlhttp.responseText.length) {
            error += "\n" + xmlhttp.responseText;
        }
        alert(error);
        return;
    }
}

Gettext.prototype.JSON = function (data) {
    return eval('(' + data + ')');
}


/*

=head1 NOTES

These are some notes on the internals

=over

=item LOCALE CACHING

Loaded locale data is currently cached class-wide. This means that if two scripts are both using Gettext.js, and both share the same gettext domain, that domain will only be loaded once. This will allow you to grab a new object many times from different places, utilize the same domain, and share a single translation file. The downside is that a domain won't be RE-loaded if a new object is instantiated on a domain that had already been instantiated.

=back

=head1 BUGS / TODO

=over

=item error handling

Currently, there are several places that throw errors. In GNU Gettext, there are no fatal errors, which allows text to still be displayed regardless of how broken the environment becomes. We should evaluate and determine where we want to stand on that issue.

=item syncronous only support (no ajax support)

Currently, fetching language data is done purely syncronous, which means the page will halt while those files are fetched/loaded.

This is often what you want, as then following translation requests will actually be translated. However, if all your calls are done dynamically (ie. error handling only or something), loading in the background may be more adventagous.

It's still recommended to use the statically defined <script ...> method, which should have the same delay, but it will cache the result.

=item domain support

domain support while using shortcut methods like C<_('string')> or C<i18n('string')>.

Under normal apps, the domain is usually set globally to the app, and a single language file is used. Under javascript, you may have multiple libraries or applications needing translation support, but the namespace is essentially global.

It's recommended that your app initialize it's own shortcut with it's own domain.  (See examples/wrapper/i18n.js for an example.)

Basically, you'll want to accomplish something like this:

    // in some other .js file that needs i18n
    this.i18nObj = new i18n;
    this.i18n = this.i18nObj.init('domain');
    // do translation
    alert( this.i18n("string") );

If you use this raw Gettext object, then this is all handled for you, as you have your own object then, and will be calling C<myGettextObject.gettext('string')> and such.


=item encoding

May want to add encoding/reencoding stuff. See GNU iconv, or the perl module Locale::Recode from libintl-perl.

=back


=head1 COMPATABILITY

This has been tested on the following browsers. It may work on others, but these are all those to which I have access.

    FF1.5, FF2, FF3, IE6, IE7, Opera9, Opera10, Safari3.1, Chrome

    *FF = Firefox
    *IE = Internet Explorer


=head1 REQUIRES

bin/po2json requires perl, and the perl modules Locale::PO and JSON.

=head1 SEE ALSO

bin/po2json (included),
examples/normal/index.html,
examples/wrapper/i18n.html, examples/wrapper/i18n.js,
Locale::gettext_pp(3pm), POSIX(3pm), gettext(1), gettext(3)

=head1 AUTHOR

Copyright (C) 2008, Joshua I. Miller E<lt>unrtst@cpan.orgE<gt>, all rights reserved. See the source code for details.

=cut

*/

(function($, window) {

    /**
     * Class for handling the client-localization
     */
    window.diysdk.translator = Class.extend({

        /**
         * Stores the translators by app
         */
        translators: [],

        init: function () {

        },

        /**
         * Set the gettext-objects by app
         */
        setTranslator: function (availableLocales) {
            $.each(availableLocales, $.proxy(function (appName, locales) {
                if (!this.translators[appName]) {
                    var data = [];

                    data[appName] = locales;

                    this.translators[appName] = new Gettext({ domain: appName, locale_data: data});
                }
            }, this));

        },

        /**
         * Translates by app/translation-key(used by method _() in basic.js)
         */
        translate: function (appName, translationKey) {
            if (!this.translators[appName]) return translationKey;
            return this.translators[appName].gettext(translationKey);
        }
    });

    window.diysdk.localization = new window.diysdk.translator();

})(window.jQuery, window);require(['diysdk.jquery'], function ($) {

    $.fn.webOverlay = function (element) {

        var methods = {
                /**
                 *
                 * @param {object} mainJQ The main jq to render the overlay to
                 */
                render : function(mainJQ) {
                    mainJQ.prepend(
                        this._createOverlayElement(mainJQ)
                    );
                },

                /**
                 * Creates the overlay element by the required dimensions
                 * @param mainJQ {JQuery}
                 * @returns {object} The overlay element
                 */
                _createOverlayElement : function(mainJQ) {
                    var widgetiframe = mainJQ.find('.diysdk_ui_widgetiframe');

                    if (widgetiframe.length) {
                        widgetiframe.bind('load.overlay', function() {
                            mainJQ.find('.diysdk_common_webOverlay')
                                .height(widgetiframe.height())
                        });
                    }
                }
        };

        methods.render(this);
    };

});require(['diysdk.jquery'], function ($) {

    /**
     * Class for building URLs.
     */
    diysdk.urlBuilder = Class.extend({
        pathSeparator: '/',
        baseSaveUrl: '',
        appName: '',
        appId: '',
        wcName: '',
        wcId: '',
        urlHead: '',
        staticUrlHead: '',


        /**
         * Constructor
         *
         * @param {object} data  object containing data relating to the current app and webcomponent
         */
        init: function (data) {
            this._setPropertiesFromData(data);
        },

        _setPropertiesFromData: function (data) {
            this.baseSaveUrl = data.baseSaveUrl || this.baseSaveUrl;
            this.appName = data.appName || this.appName;
            this.appId = data.appId || this.appId;
            this.wcName = data.wcName || this.wcName;
            this.wcId = data.wcId || this.wcId;

            this.urlHead =
                this.baseSaveUrl
                    + this.pathSeparator
                    + 'api'
                    + this.pathSeparator
                    + 'app'
                    + this.pathSeparator
                    + this.appName
                    + this.pathSeparator
                    + 'instances'
                    + this.pathSeparator
                    + this.appId
                    + this.pathSeparator
                    + 'wcinstances'
                    + this.pathSeparator
                    + this.wcName
                    + this.pathSeparator
                    + this.wcId
                    + this.pathSeparator;

            this.staticUrlHead =
                this.pathSeparator
                    + 's'
                    + this.pathSeparator
                    + this.appName
                    + this.pathSeparator
                    + this.wcName
                    + this.pathSeparator
                    + 'public'
                    + this.pathSeparator;
        },

        /**
         * Returns the base save url
         * @returns {String}
         */
        getBaseSaveUrl: function () {
            return this.baseSaveUrl;
        },

        /**
         * Get an URL of a specific type
         *
         * @param string urlType  type of the requested URL (e.g. 'view' or 'data')
         * @param string urlTail  last part of the URL to be appended to it
         */
        getUrl: function (urlType, urlTail) {
            var type = (typeof urlType == 'string') ? urlType : '';
            var tail = (typeof urlTail == 'string') ? urlTail : '';

            if (type.length > 0) {
                return this._concatUrl(this.urlHead, type, tail);
            }

            return '';
        },

        /**
         * Get an static URL of a specific type
         *
         * @param string urlType  type of the requested resource (e.g. 'js' or 'css')
         * @param string urlTail  last part of the URL to be appended to it
         */
        getStaticUrl: function (urlType, urlTail) {
            var type = (typeof urlType == 'string') ? urlType : '';
            var tail = (typeof urlTail == 'string') ? urlTail : '';

            return this._concatUrl(this.staticUrlHead, type, tail);
        },

        _concatUrl: function (head, type, tail) {
            return head
                + type
                + this.pathSeparator
                + tail;
        }
    });

});require(['diysdk.jquery', 'core.jquery'], function ($, corejQuery) {

    /**
     * A trait that can be mixed into Classes to make them support events
     */
    var eventTrait = {

        /**
         * Register an event handler
         * @param eventName string
         * @param handler function
         */
        on: function (eventName, handler) {
            this.eventListeners = this.eventListeners || {};
            this.eventListeners[eventName] = this.eventListeners[eventName] || [];
            this.eventListeners[eventName].push(handler);
        },

        /**
         * Trigger an event
         * @param eventName string
         */
        trigger: function (eventName) {
            var args = arguments;
            if (this.eventListeners && this.eventListeners[eventName]) {
                $.each(this.eventListeners[eventName], function (i, listener) {
                    listener.apply(this, Array.prototype.slice.call(args, 1));
                });
            }
        }

    };

    /**
     * Base class for all client components (web/ui).
     */
    diysdk.basic = Class.extend({

        /**
         * @property {string} database instance id if persistance exist
         */
        instanceId: null,

        /**
         * @property {object}
         */
        app: null,

        /**
         * @property {string} component name
         */
        component: 'basic',

        /**
         * @property {object} view render options
         */
        renderOptions: {},

        /**
         * @property {string}
         */
        csrfToken : '',

        /**
         * Url acts as prefix for async calls. Value depends on the environment the
         * webcomponent is executed in.
         *
         * @property {string}
         */
        baseSaveUrl: '',

        /**
         * @property {object}  instance of diysdk.urlBuilder
         */
        urlBuilder: null,

        /**
         * Stores such things like if instance is running in sitebuilder mode, static url prefix, etc.
         * @property {object}
         */
        environmentConfig: {},

        /**
         * Constructor - call constructor of the parent with method 'this._super' if
         * you extend this class with one of yours
         *
         * @param {object}
         *            data Object coming from server
         * @param {string}
         *            baseSaveUrl
         */
        init: function (data, baseSaveUrl) {
            // all object references *must* be initialized in the constructor or
            // they will be shared among all instances!
            this.views = this.views || {};
            this.baseSaveUrl = baseSaveUrl || '';

            if (data && data.instance) {
                this._setPropertiesFromAjaxData(data.instance);
                this._setUrlBuilder();
            }
        },

        /**
         * Translates a key defined in backend: Available are all keys used in backend with php-function
         * '_()'. If keys are needed only in client, please use file language/js_source/js_translations.php
         * to defined them
         * @param string translationKey The key to translate
         * @param string appName The app to use for translation(optional, else use the current app)
         */
        _: function (translationKey, appName) {
            var targetApp = appName || this.app.name;

            var translated = diysdk.localization.translate(targetApp, translationKey);

            if (translationKey === translated) {
                console.error("For key '" + translationKey + "' there is no translation available or wrong key!");
            }

            return translated;
        },

        /**
         * Sets properties with the values from ajax call on loading a view.
         *
         * @param {object}
         *            instance Object of a webcomponent/uicomponent
         */
        _setPropertiesFromAjaxData: function (instance) {
            this.component = instance.name;
            this.instanceId = instance.id;
            this.app = instance.app;

            // don't overwrite renderoptions if there aren't any in response (they only are available if sitebuilder
            // loads the view!)
            if (instance.data && instance.data.renderOptions) {
                this.renderOptions = instance.data.renderOptions;
            }

            if (instance.data && instance.data._DIY_SDK_CSRFToken) {
                this.csrfToken = instance.data._DIY_SDK_CSRFToken;
            }
            
            this.environmentConfig = instance.environmentConfig;
        },

        /**
         * Creates new urlBuilder Object and sets the property.
         */
        _setUrlBuilder: function () {

            var appWcData = {
                'baseSaveUrl': this.baseSaveUrl || '',
                'appName': this.app.name || '',
                'appId': this.app.id || '',
                'wcName': this.component || '',
                'wcId': this.instanceId || ''
            };

            this.urlBuilder = new diysdk.urlBuilder(appWcData);
        },

        /**
         * Returns whether instance is running in sitebuilder mode or not(also true in restui mode!)
         * @returns {Boolean}
         */
        isSitebuilderMode: function () {
            return this.environmentConfig.isSitebuilder;
        },

        getStaticUrlPrefix: function () {
            return this.environmentConfig.staticUrlPrefix;
        },

        /**
         * Returns if the local preview mode
         * @returns {boolean}
         */
        localPreviewMode: function () {
            return document.URL.split(window.location.host)[1].indexOf('/restui/preview') === 0;
        },

        /**
         * Creates an instance of a view object.
         *
         * @param {string} view of which the object has to be intialized
         * @param {object} mainJQ jquery object
         * @param {object} data
         * @param {object} parentView
         */
        initView: function (view, mainJQ, data, parentView) {
            if (this.views[view]) {
                this.views[view].init(view, this, mainJQ, data, parentView);
            } else {
                var viewClass = this.constructor._viewClasses[view] || diysdk.view;
                this.views[view] = new viewClass(view, this, mainJQ, data, parentView);
            }

            return this.views[view];
        },

        /**
         * Returns the data URL for the specified path
         *
         * @param {string}
         *            path - the data path
         * @return {string} - URL
         */
        getDataUrl: function (path) {
            return this.urlBuilder.getUrl('data', path);
        },

        /**
         * Returns the URL for the specified view
         *
         * @param {string}
         *            view
         * @return {string} - URL
         */
        getViewUrl: function (view) {
            return this.urlBuilder.getUrl('view', view);
        },

        /**
         * Returns the current div with unique id as an element (using sdk jquery)
         *
         * @param {string}
         *            view
         * @return {object} - element
         */
        getMainJQ: function (view) {
            view = view || 'web';
            return $('#webcomponent_' + diysdk.fixJQueryIdSelector(this.instanceId) + "_" + view);
        },

        /**
         * Is called when a data source that this instance has been bound to has been updated.
         * You can override this function in your sub-classes.
         *
         * @param {object} eventArgs : {
         *   oldValue : {mixed} the old value,
         *   newValue : {mixed} the new value,
         *   param : {string} the name of the parameter that has changed
         *   params : {object} all parameters of all data sources bound to this object, that have been changed
         * }
         */
        dataSourceUpdated: function (eventArgs) {
            this.loadUiView(eventArgs.params);
        },

        /**
         * Re-loads a UI component view
         *
         * @param {object} data The view data to be passed to the UI component view
         */
        loadUiView: function (data) {
            var view = this.views.index || this.views.web;
            var jq = view.getMainJQ();

            var parts = [];

            for (var v = view;
                 v.parentView;
                 v = v.parentView) {
                parts.unshift(v.webComponent.internalId);
            }

            var viewUrl = view.getTopParentView().webComponent.getViewUrl("web") + '/' + parts.join('/');

            this._ajax({
                url: viewUrl,
                data: data,
                success: function (response) {
                    var newJQ = $(response.html);
                    jq.replaceWith(newJQ);
                    view.setMainJQ(newJQ);
                    view.bindEvents();
                }
            });
        },

        getFormJQ: function (dataJQ) {
            dataJQ = dataJQ || this.getMainJQ();
            return /^form$/i.test(dataJQ[0].nodeName) ? dataJQ : dataJQ.find('form');
        },

        /**
         * Returns the key/values of the emebedded form or
         *
         * @param {object} -
         *            the form-element (an jQuery object)
         * @return {array} - form-data
         */
        getFormData: function (dataJQ) {
            // get the form node
            dataJQ = dataJQ || this.getMainJQ();
            var formJQ = this.getFormJQ(dataJQ);
            var o = {};

            // regular expressions for form elements
            var rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
            var rradio = /^(?:radio)$/i;
            var rcheckbox = /^(?:checkbox)$/i;
            var rselect = /^(?:select)$/i;
            var rtextarea = /^(?:textarea)$/i;

            // clean line breaks
            var clean = function (val) {
                return val.replace(/\r?\n/g, "\r\n");
            };

            // get a value of a form element
            var getVal = function (elem) {
                var val = $(elem).val();

                return val == null ?
                    (rselect.test(elem) && $(elem).attr('multiple') ?
                        [] :
                        null) :
                    $.isArray(val) ?
                        $.map(val, clean) :
                        clean(val);
            };

            // filter the valid form elements and sort them by name
            var elemsByName = {};
            formJQ.map(function () {
                return this.elements ? $.makeArray(this.elements) : this;
            })
                .filter(function () {
                    return this.name &&
                        (rselect.test(this.nodeName) ||
                            rtextarea.test(this.nodeName) ||
                            rinput.test(this.type) ||
                            rradio.test(this.type) ||
                            rcheckbox.test(this.type));
                })
                .each(function () {
                    if (!elemsByName[this.name]) {
                        elemsByName[this.name] = [];
                    }
                    elemsByName[this.name].push(this);
                });

            // build the resulting data structure
            $.each(elemsByName, function (name, elems) {

                if (rradio.test(elems[0].type)) {
                    // radio button: single element
                    o[name] = $(elems).filter(':checked').val() || null;

                } else if (rcheckbox.test(elems[0].type)) {
                    // checkbox: multiple elements (always an array)
                    o[name] = [];

                    $(elems).filter(':checked').each(function () {
                        o[name].push($(this).val());
                    });

                } else {
                    // other elements: array if multiple of same name
                    o[name] =
                        elems.length === 0 ?
                            null :
                            (elems.length > 1 ?
                                $.map(elems, getVal) :
                                getVal(elems[0]));
                }

            });

            return o;

        },

        /**
         * Loads the given view - if no view is given, it returns the 'web'-view
         *
         * @param {string}
         *            view - the view to load
         * @param {object}
         *            options : {
         *  success : function - the callback function on success
         *  error : function - the callback function on error
         *  targetJQ : jQuery DOM element - the jQuery'd dom element to replace
         * }
         * @return {object} - this
         */
        loadView: function (view, options) {

            view = view || 'web';
            options = options || {};

            var targetJQ = null;

            if (!options.targetJQ) {
                targetJQ = this.getMainJQ();
            } else if (typeof options.targetJQ === 'string') {
                targetJQ = this.getMainJQ(options.targetJQ);
            } else {
                targetJQ = options.targetJQ;
            }

            // determine old view instance (if it exists) to call "destroyDialogs()"
            // it is necessary to remove the "old" dialog elements from the DOM (below the body) when loading a new view
            // to prevent errors with duplicate IDs
            var oldViewObj = null;
            if (targetJQ && typeof targetJQ.data === 'function') {
                oldViewObj = targetJQ.data('view');
            }

            if (oldViewObj === null && this.views[view]) {
                oldViewObj = this.views[view];
            }

            if (oldViewObj && typeof oldViewObj.cleanUp === 'function') {
                oldViewObj.cleanUp();
            }

            var success = options.success;
            var error = options.error;

            if ($.isFunction(targetJQ.loadingindicator)) {
                targetJQ.loadingindicator();
            }

            var ajaxOptions = {};
            ajaxOptions.data = options.data || {};
            ajaxOptions.data.renderOption = this.renderOptions || null;

            this._ajax($.extend(ajaxOptions, {
                url: this.getViewUrl(view),

                success: $.proxy(function (data) {

                    diysdk.cssloader.load(data.resources.css);

                    require(data.resources.js, $.proxy(function () {
                        if ($.isFunction(targetJQ.loadingindicator)) {
                            targetJQ.loadingindicator('hide');
                        }

                        var newJQ = $(data.html);
                        if (typeof targetJQ === "function") {
                            targetJQ(newJQ);
                        } else if (targetJQ instanceof $) {
                            targetJQ.html(newJQ);
                        }

                        this._setPropertiesFromAjaxData(data.instance);
                        var newViewObj = this.initView(view, undefined, data.instance.data);

                        if (data.embeddedComponents) {
                            var wcintegrator = new diysdk.webcomponentIntegrator();
                            wcintegrator.createEmbeddedInstances(newViewObj, data.embeddedComponents, this.baseSaveUrl);
                        }

                        newViewObj.bindEvents();
                        newJQ.data('view', newViewObj);

                        if (typeof success === "function") {
                            success(data, this);
                        }

                    }, this));
                }, this),

                error: function (xhr, textStatus, errorThrown) {

                    targetJQ.loadingindicator('hide');

                    if ($.isFunction(error)) {
                        error(xhr, textStatus, errorThrown);
                    }
                },

                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/vnd.1and1.diy.webcomponent+json");
                }
            }));

            return this;
        },

        /**
         * save the data from the edit view
         *
         * @param {object}
         *            options :
         * @see saveData()
         */
        saveEditData: function (options) {

            if (typeof this.onSaveEditData === "function") {
                this.onSaveEditData();
            }

            options = $.extend({ reloadView: true }, options);
            options.dataJQ = options.dataJQ || this.getMainJQ('edit');
            this.saveData(options);
        },

        /**
         * save data to the server
         *
         * @param {object}
         *            options - {
         *    dataPath : string - the "path" the data is saved to
         *    dataJQ : jQuery DOM element - the form element to serialize
         *    success : function - a callback to execute on successful save
         *    error : function - a callback to execute on save error
         *  }
         * @return {object} - this
         */

         saveData : function(options) {
            var self = this;

            // setup parameters
            var dataJQ = options.dataJQ || this.getMainJQ();
            var formJQ = this.getFormJQ(dataJQ);

            var defaultOptions = {
                type: 'POST',
                beforeSend: function(request) {
                    if (self.csrfToken) {
                        request.setRequestHeader("X-DIY-SDK-CSRFToken", self.csrfToken);
                    }
                },
                url: this.getDataUrl(options.dataPath),
                data: $.toJSON(this.getFormData(dataJQ)),
                multipartForm: false,
                reloadView: true
            };

            options = $.extend(defaultOptions, options || {});

            // multipart form
            if (options.multipartForm) {
                options = this.convertToMultipartForm(formJQ, options);
            }

            // success handler
            var success = options.success;
            options.success = $.proxy(function (data) {
                if (options.reloadView) {
                    this.loadView();
                }
                if (typeof success === "function") {
                    success(data);
                }
            }, this);

            // error handler
            var error = options.error;
            options.error = $.proxy(function (xhr, textStatus, errorThrown) {
                // check for validation errors (HTTP Status 422)
                // an error here should not prevent the default error handler to be called, so try/catch
                try {
                    if (xhr.status === 422) {
                        var validationErrors = $.parseJSON(xhr.responseText);
                        if (validationErrors) {
                            this.handleValidationErrors(formJQ, validationErrors);
                        }
                    }
                } catch (ex) {
                    console.err(ex);
                }

                if (typeof error === "function") {
                    error(xhr, textStatus, errorThrown);
                }
            }, this);

            // clear errors and make request
            this.clearValidationErrors(formJQ);
            this._ajax(options);

            return this;
        },

        /**
         * converts the request to multipart/form-data to allow submitting file uploads
         * if window.FormData not present, nothing happens
         *
         * @param formJQ : jQuery DOM element - the form element to serialize
         * @param options : ajax options
         * @returns {object} : options
         */
        convertToMultipartForm : function(formJQ, options) {
            if (!window.FormData) {
                console.log('window.FormData not present, multipart not available.');
                return;
            }

            var formData = options.data;
            var beforeSend = options.beforeSend;

            var options = $.extend(options, {
                cache: false,
                processData: false,
                contentType: false,
                data: null
            });

            options.beforeSend = function(xhr, request) {
                request.data = new FormData();
                request.data.append('data', formData);

                $.each(formJQ.find('input[type=file]'), function(index, fileElement) {
                    var inputName = $(this).attr('name');
                    $.each(fileElement.files, function(i, file) {
                        request.data.append(inputName, file);
                    });
                });

                if (beforeSend) {
                    beforeSend.call(this, xhr, request);
                }
            }

            return options;
        },

        /**
         * load data from the server
         *
         * @param {object}
         *            options - {
         *    dataPath : string - the "path" the data is saved to or delete-path
         *    success : function - a callback to execute on successful save
         *    error : function - a callback to execute on save error
         *  }
         * @return {object} - this
         */
        loadData: function (options) {

            var self = this;

            if (options.type && options.type === 'DELETE') {
                var requiredOptions = {
                    beforeSend: function(request) {
                        if (self.csrfToken) {
                            request.setRequestHeader("X-DIY-SDK-CSRFToken", self.csrfToken);
                        }
                    }
                };

                options = $.extend({}, options || {}, requiredOptions);
            }

            options.url = this.getDataUrl(options.dataPath);

            this._ajax(options);

            return this;
        },

        /**
         * Execute an AJAX request
         *
         * @param {object}
         *    options - {
         *    type : string - the HTTP type url : string - the url
         *    data : {object} - the data to send
         *    beforeSend : function - callback to execute before sending
         *    success : function - callback to execute on success
         *    error : function - callback to execute on error
         * }
         */
        _ajax: function (options) {
            var error = options.error;
            $.ajax($.extend({
                type: "GET",
                dataType: 'json',
                contentType: 'application/json',
                cache: false,
                beforeSend: function () {
                } // override sitebuilder beforeSend which assumes data is POST-encoded
                // and appends "cstok" parameter, creating invalid JSON
            }, options, {
                error: $.proxy(function (xhr, textStatus, errorThrown) {
                    this.ajaxError(xhr, textStatus, errorThrown);
                    if (typeof error === "function") {
                        error(xhr, textStatus, errorThrown);
                    }
                }, this)
            }));
        },

        /**
         * remove old validation error messages
         *
         * @params {jQuery DOM node} formJQ The form element
         */
        clearValidationErrors: function (formJQ) {
            var errors = formJQ.data('errors') || [];
            $.each(errors, function () {
                this.remove()
            });
            formJQ.data('errors', []);
            formJQ.find('.error').removeClass('error');
        },

        /**
         * show validation error messages
         *
         * @param {jQuery DOM node} formJQ The <form> node
         */
        handleValidationErrors: function (formJQ, errors) {
            $.each(errors, $.proxy(function (name, message) {
                this.showFormValidationError(formJQ, name, message);
            }, this));
        },

        /**
         * show a form validation error
         *
         * @param {jQuery DOM node} formJQ The <form> node
         * @param {string} name The name of the form element
         * @param {string} message The message to show
         */
        showFormValidationError: function (formJQ, name, message) {
            // determine which form element(s) created the validation error
            var index = null, colonPos = name.indexOf(':');
            if (colonPos > 0) {
                index = name.substr(colonPos + 1);
                name = name.substr(0, colonPos);
            }
            var selector = '*[name="' + name + '"]';
            if (index !== null) {
                selector += ':eq(' + index + ')';
            }

            var formElementJQ = formJQ.find(selector);

            if (formElementJQ.length > 0) {
                var posJQ = null;

                // mark the element(s) as having an error
                if (/^input$/i.test(formElementJQ[0].nodeName) &&
                    /^(?:radio|checkbox)$/i.test(formElementJQ.attr('type'))) {
                    // checkboxes & radio buttons => use parent if it is a <label>
                    formElementJQ.each(function () {
                        var parentJQ = $(this).parent();
                        var elemJQ = /^label$/i.test(parentJQ[0].nodeName) ?
                            parentJQ :
                            $(this);

                        elemJQ.addClass('error')
                            .attr('title', message);

                        posJQ = elemJQ;
                    });
                } else {
                    // other elements
                    formElementJQ.addClass('error')
                        .attr('title', message);

                    posJQ = $(formElementJQ[formElementJQ.length - 1]);
                }

                // handling the invalid absolute position of error msg regarding to UI Component
                if (posJQ.parent(".ui-widget").length) {
                    posJQ = posJQ.parent(".ui-widget");
                }

                var pos = posJQ.offset();

                // handling the invalid absolute position of error msg regarding to semanticInputText
                if (posJQ.parent(".semantic-ui-widget").length) {
                    posJQ = posJQ.parent(".semantic-ui-widget");
                    pos = {top: posJQ.offset().top - 6, left: posJQ.offset().left};

                    // append class name "error"
                    posJQ
                        .find('.chosen-choices').addClass('error')
                        .find('.search-field').addClass('error');
                }

                // show a validation error message for 5 seconds, below the (last) form element
                pos.top += posJQ.height();
                var errorJQ = $('<div class="message-error diysdk-form-error"></div>')
                    .hide()
                    .text(message)
                    .appendTo(document.body)
                    .css({ top: pos.top, left: pos.left, zIndex:1000000 })
                    .slideDown()
                    .delay(5000)
                    .fadeOut();

                var errors = formJQ.data('errors') || [];
                errors.push(errorJQ);
                formJQ.data('errors', errors);
            } else {
                console.warn('no form element with name "' + name + "' found, message was: " + message);
            }
        },

        /**
         * Called if an ajax-error occurs - logs the error in console
         *
         * @param {object}
         *            xhr
         * @param {string}
         *            textStatus
         * @param {object}
         *            errorThrown
         */
        ajaxError: function (xhr, textStatus, errorThrown) {
            if (xhr.status == '422') {
                xhr.skipBlackError = true;
                // form validation error, handled elsewhere
                return;
            }

            var json;
            try {
                json = $.parseJSON(xhr.responseText);
                if (json && json.exception) {
                    console.log(json.exception);
                }
            } catch (ex) {
                console.log(xhr.responseText);
            }
            if (errorThrown) {
                console.log(errorThrown);
            }

            if (xhr.status == '403') {
                if (json && json.clientMessage) {
                    alert(json.clientMessage);
                }
            }

        }
    })
        .extend(eventTrait); // add event handling trait


    /**
     * Static properties
     */

        // stores the view classes
    diysdk.basic._viewClasses = {};

    /**
     * add a view definition to a webcomponent class
     *
     * @param {string}
     *            name - name of the view
     * @param {string}
     *            view - diysdk.view - the view class implementation
     */
    diysdk.basic.addView = function (name, view) {

        var viewClass;

        if (typeof view === "function") {
            viewClass = view;
        } else if (typeof view === "object") {
            viewClass = diysdk.view.extend(view);
        } else {
            throw new Error("view parameter must be a diysdk.view class or a plain object");
        }

        this._viewClasses[name] = viewClass;
    };

    /**
     * Adds a namespace
     * @param ns string|array ns The namespace to add
     * @return object The namespace object
     */
    diysdk.namespace = function (ns) {
        var parts = $.isArray(ns) ? ns : ns.split('.');
        var currentNs = window;

        while (parts.length > 0) {
            var part = parts.shift();
            currentNs[part] = currentNs[part] || {};
            currentNs = currentNs[part];
        }

        return currentNs;
    };

    /**
     * Create a new Webcomponent class
     * @param fqn string The fully-qualified name of the class (namespace.classname)
     * @param obj object The class implementation, will inherit from diysdk.basic
     * @return function The class
     */
    diysdk.webcomponent = function (fqn, obj) {
        var ns = diysdk.namespace(fqn.split('.').slice(0, -1));
        var className = fqn.split('.').slice(-1)[0];

        if (!ns.hasOwnProperty(className)) {
            ns[className] = diysdk.basic.extend(obj);
        }

        return ns[className];
    };

    diysdk.fixJQueryIdSelector = function (id) {
        return id.replace(/([\$\.])/g, '\\$1');
    };

    /**
     * Wraps the passed element with the sitebuilder jQuery instance
     * or just returns the sitebuilder jQuery object if no element is passed
     *
     * Should be accessible only inside SDK, not by individual apps
     *
     * @param {String|HTMLElement|Array|jQuery} elem (optional) Can be a jQuery object,
     *      or anything that can be passed to the jQuery constructor
     * @return {jQuery}
     */
    diysdk.getSitebuilderJQuery = function (elem) {
        if (!elem) {
            return corejQuery;
        }

        if (elem instanceof $) {
            elem = elem.get();
        }

        return corejQuery(elem);
    };

    /**
     * Enable "global" events
     */
    $.extend(diysdk, eventTrait);

});
require(['diysdk.jquery'], function ($) {

    /**
     * Base view class for webcomopnents/uicomponents
     */
    diysdk.view = Class.extend({

        /**
         * @property {string} name of the view
         */
        name: null,

        /**
         * @property {object}
         */
        webComponent: null,

        /**
         * @property {array} eventBindings - of objects
         *          [{
         *     selector : jQuery selector,
         *     eventName : name of the event,
         *               handler    : string (nam of handler function) or function
         *          }, {
         *              ...
         * }]
         */
        eventBindings: [],

        /**
         * @property {object} trackingEvents
         * {
         *      eventName: string - trigger name for track function
         *      options: object - config arguments as tracking implementation defines
         * }
         */
        trackingEvents: {},

        /**
         * @property {object} jQuery object for this view
         */
        mainJQ: null,

        /**
         * @property {object} Replace button for upgrading
         */
        replaceButtonElement: null,

        /**
         * @property {object}
         */
        data: null,

        /**
         * Constructor
         *
         * @param {string} name
         * @param {object} webComponent
         * @param {object} mainJQ
         * @param {object} data
         * @param {object} parentView
         */
        init: function (name, webComponent, mainJQ, data, parentView) {
            this.name = name;
            this.webComponent = webComponent;
            this.mainJQ = mainJQ;
            this.data = data;
            this.parentView = parentView || this.parentView;
            this.childInstances = this.childInstances || {};

            if (!this.parentView) {
                if (name == 'edit' || this.isSegmentOfEditView(name)) {
                    this.facelift();
                }
            }
        },

        /**
         * semantic data wrapper function, which fetches the semantic data value by given key
         * the semantic data is cached on the side of site-builder API
         */
        getSemanticData: function (callback, key) {

            if (!diy.editor || !diy.editor.semanticdata) {
                return;
            }

            var _fetchSemanticValueByKey = function (response, key) {
                var data = '';

                if (!response.entities) {
                    return data;
                }

                var _convertPhoneNumber = function (telephoneValues) {
                    if (!telephoneValues) {
                        return '';
                    }

                    return telephoneValues.countryPrefix + telephoneValues.prefix + telephoneValues.number;
                };

                $.each(response.entities, function (index, entity) {
                    if (key === entity.name) {
                        if (entity.name === 'telephone' || entity.name === 'faxNumber') {
                            data = _convertPhoneNumber(entity.value);
                        } else {
                            data = entity.value;
                        }

                        return false;
                    }
                });

                return data;
            };

            diy.editor.semanticdata.api.getAll().done(function(response) {
                callback(_fetchSemanticValueByKey(response, key));
            });

        },

         /**
         * check, if current target view is a segment of edit view
         * @param {string} name
         * @returns {boolean}
         */
        isSegmentOfEditView: function(name) {
            if (name == 'web') {
                return false;
            }

            if (name.indexOf('edit-') === 0) {
                return true;
            }

            var editJQ = this.webComponent.getMainJQ('edit');
            var classSelector = '.' + name + '_view';

            if (editJQ.find(classSelector).length > 0) {
                return true;
            }

            return false;
        },
        /**
         * Translates a key defined in backend: Available are all keys used in backend with php-function
         * '_()'. If keys are needed only in client, please use file language/js_source/js_translations.php
         * to define them
         * @param {string} translationKey The key to translate
         * @param {string} appName The app to use for translation(optional, else use the current app)
         */
        _: function (translationKey, appName) {
            return this.webComponent._(translationKey, appName);
        },

        /**
         * Register event handlers for DOM elements
         */
        bindEvents: function () {
            if (this.eventBindings) {
                var mainJQ = this.getMainJQ();
                $.each(this.eventBindings, $.proxy(function (i, eventBinding) {
                    if (typeof eventBinding != "undefined") {
                        var handler = $.proxy((typeof eventBinding.handler === "function"
                            ? eventBinding.handler
                            : this[eventBinding.handler]),
                            this
                        );

                        if (eventBinding.childInstance) {
                            if (!this.childInstances[eventBinding.childInstance]) {
                                console.error('child instance "' + eventBinding.childInstance + '" not found');
                                console.error(this);
                            } else {
                                this.childInstances[eventBinding.childInstance].on(eventBinding.eventName, handler);
                            }
                        } else {
                            var targetJQ = eventBinding.selector ? mainJQ.find(eventBinding.selector) : mainJQ;

                            // this is the case if eventBindings are defined like this: eventBindings : [ {} ],
                            if (typeof eventBinding.eventName != 'undefined' &&
                                typeof handler != 'undefined') {
                                targetJQ.bind(eventBinding.eventName, handler);
                            }
                        }
                    }
                }, this));
            }
        },

        /**
         * trigger defined tracking event
         *
         * @param {string} name
         */
        track: function(name) {
            if (!this.trackingEvents[name]) {
                return;
            }

            var options = this.trackingEvents[name].options || {};
            var defaults = {};
            
            $(document).trigger(this.trackingEvents[name].eventName, $.extend(true, defaults, options));
        },

        /**
         * returns the object which was invoked by backend using setClientData()
         *
         * @return {object}
         */
        getClientData: function () {
            return this.data;
        },

        /**
         * Returns the current DOM element that corresponds to this view instance
         *
         * @return {object} element - jQuery object
         */
        getMainJQ: function () {
            return this.mainJQ || $('#webcomponent_' + diysdk.fixJQueryIdSelector(this.webComponent.instanceId) + "_" + this.name);
        },

        /**
         * Sets the current DOM element that corresponds to this view instance
         *
         * @param {object}
         *            mainJQ
         */
        setMainJQ: function (mainJQ) {
            this.mainJQ = mainJQ;
        },

        /**
         * Load another view into the currently active view element
         *
         * @param {string}
         *            view
         * @param {object}
         *            options
         */
        loadView: function (view, options) {
            options = options || {};
            options.targetJQ = options.targetJQ || this.name;
            this.webComponent.loadView(view, options);
        },

        /**
         * Get the top-most parent view
         * @return object The view instance
         */
        getTopParentView: function () {
            var view = this;

            while (view.parentView) {
                view = view.parentView;
            }

            return view;
        },

        /*
         * Style input fields to adapt the facelift
         * @return void
         */
        facelift: function () {
            var mainJQ = this.getMainJQ();

            if ($.isFunction($.fn.diy_radiobox)) {
                mainJQ.find('input[type=radio]').diy_radiobox();
            }

            if ($.isFunction($.fn.diy_checkbox)) {
                mainJQ.find('input[type=checkbox]').diy_checkbox();
            }

            if ($.isFunction($.fn.button)) {
                mainJQ.find('button').button();
            }

            // Support apps that have unmigrated client-side combobox widgets
            // Deprecated. Should remove this when all apps have been migrated
            // to use the combobox ui component
            if ($.isFunction($.fn.diy_combobox)) {
                var selects = mainJQ.find('select').filter(function () {
                    // Target only the selects that are not already being handled by ui-component
                    return !$(this).parents('.diysdk_ui_combobox').length;
                });
                $.each(selects, $.proxy(function (i, select) {
                    var selectJQ = $(select), parentJQ = selectJQ.parent();
                    if (selectJQ.prop('multiple') === false) {
                        (parentJQ.children().length === 1 ? parentJQ : $('<div>').appendTo(parentJQ).append(selectJQ)).diy_combobox();
                    }
                }, this));
            }
        },

        /**
         * Gets the app instance
         * @param currentScope - The current scopt(regular: this)
         * @returns {object}
         */
        getAppInstance: function (currentScope) {
            currentScope = this.getTopLevelViewRecursively(currentScope);

            return currentScope.webComponent.app;
        },

        /**
         * Gets the webcomponent instance
         * @param currentScope - The current scope(regular: this)
         * @returns {object}
         */
        getWebcomponentInstance: function (currentScope) {
            currentScope = this.getTopLevelViewRecursively(currentScope);

            return currentScope.webComponent;
        },

        /**
         * Gets the top level view by recursion
         * @param currentScope
         * @returns {object}
         */
        getTopLevelViewRecursively: function (currentScope) {
            while (typeof currentScope.parentView === 'object') {
                currentScope = this.getTopLevelViewRecursively(currentScope.parentView);
            }

            return currentScope;
        },

        /**
         * Hides the save button
         */
        hideSaveButton: function () {
            var button = this._getSaveButton();
            if (button.length) {
                button.hide();
            }
        },

        /**
         * Shows the save button
         */
        showSaveButton: function () {
            var button = this._getSaveButton();
            if (button.length) {
                button.show();
            }
        },

        /**
         * Replaces the save button with another element (regular another button)
         * @param replaceButtonElement - The element which sahll replace the save-button
         */
        replaceSaveButton: function (replaceButtonElement) {
            var button = this._getSaveButton();

            this.replaceButtonElement = $(replaceButtonElement);

            button.after(this.replaceButtonElement).hide();
        },

        restoreSaveButton: function () {
            if (this.replaceButtonElement != null) {
                this.replaceButtonElement.remove();
                this.showSaveButton();
            }
        },

        _getSaveButton: function () {
            var container = this.getMainJQ().parents('.module-config-outer-container');
            if (container.length === 1) {
                return $(container.find('.box-footer button[id$=_save_button]'));
            }
        }
    });

});/**
 * DIY SDK accessible jQuery Plugin 0.1.0
 * @package DIY_SDK
 */

require(['diysdk.jquery'], function ($) {

    // public methods
    var methods = {
        init : function(options) {
            if(!this._options) {
                // build main options before initialization
                this._options = $.extend({}, $.fn.accessible.defaults, options);
            }
            var allElements = $.merge(this._options.controls, ['label']).join(', ');
            this.elements = this.find(allElements);
            if (this.is(allElements)) {
                $.merge(this.elements, this);
            }
            return this;
        },

        _setDisabledState: function(disabled) {
            disabled = !!disabled;

            var methodName = disabled ? 'disable' : 'enable';

            this.elements.filter(this._options.controls.join(', ')).prop('disabled', disabled);
            this.elements.filter('label')[disabled ? 'addClass' : 'removeClass']('disabled');

            if ($.isFunction($.fn.diy_checkbox)) {
                this.elements.filter('input[type="checkbox"]').diy_checkbox(methodName);
            }
            if ($.isFunction($.fn.diy_radiobox)) {
                this.elements.filter('input[type="radio"]').diy_radiobox(methodName);
            }
            if ($.isFunction($.fn.diy_combobox)) {
                this.elements.filter('select').closest('.ui-combobox').diy_combobox(methodName);
            }

            this._disabled = disabled;
        },

        disable : function() {
            this.accessible('init');

            this.accessible('_setDisabledState', true);

            return this;
        },


        enable : function() {
            this.accessible('init');

            this.accessible('_setDisabledState', false);

            return this;
        },

        toggle : function() {
            this.accessible('init');

            if (!this._disabled) {
                return this.accessible('disable');
            } else {
                return this.accessible('enable');
            }
        },

        destroy : function() {
            this.remove();
        }


    };

    $.fn.accessible = function( method ) {
        // method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.accessible');
        }
    };

    // setup default options
    $.fn.accessible.defaults = {
        controls : ['input', 'select', 'textarea', 'button']   // (array) controls to be disabled, also jQuery selectors can be used
    };

});/**
 * DIY SDK loadingindicator jQuery Plugin 0.0.1
 * @package DIY_SDK
 * @todo: implement strategy pattern, since switch is evil
 */
require(['diysdk.jquery'], function ($) {

    var methods = {

        init : function(options) {
            this._options = $.extend({}, $.fn.loadingindicator.defaults, options);

            if(this._options.autoload) {
                this.loadingindicator('show');
            }
            return this;
        },

        show : function() {

            if (!this._visible) {
                this._visible = true;

                var context = this;
                var loadingBoxOptions = {};
                if ('modal' === this._options.mode) {
                    context = $(document.body);
                }
                this.enabledControls = $($.map(this._options.controls, function(element) {
                    return element + ':enabled';
                }).join(','), context);
                this.enabledControls.accessible('disable');

                loadingBoxOptions.useOverlay = ($.inArray(this._options.mode, [ 'modal', 'overlay' ]) >= 0);

                if(typeof this._options.loadingText !== 'undefined') {
                    loadingBoxOptions.loadingText = this._options.loadingText;
                }

                this._loadingbox = diysdk.getSitebuilderJQuery(context).loadingBox(loadingBoxOptions);
                this._loadingbox.show();
            }

            return this;
        },

        hide : function() {
            if (this._visible) {
                this._loadingbox.remove();
                this._visible = false;
                this.enabledControls.accessible('enable');
            }
            return this;
        }

    };

    $.fn.loadingindicator = function(method) {
        // method calling logic
        if (methods[method]) {
            return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this,arguments);
        } else {
            $.error('Method '+method+' does not exist on jQuery.loadingindicator');
        }
    };

    // setup default options
    $.fn.loadingindicator.defaults = {
        mode : 'overlay',    // (string) supports overlay, snap, inside. default is inside
        autoload: true,
        controls: [ 'input', 'enabled', 'select', 'textarea', 'button' ]
    };

    var loadingindicator = {};

    $.loadingindicator = function() {
        var args = $.makeArray(arguments);
        if (args.length === 0) {
            args[0] = {mode: 'modal'};
        }
        return $.fn.loadingindicator.apply(loadingindicator, args);
    };

    loadingindicator.loadingindicator = $.loadingindicator;

});