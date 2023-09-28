function OptanonWrapper() {
  const prevOT = window.localStorage.getItem('OTActiveGroups');
  const domain = window.location.hostname;
  const partialDomain = domain.match(/\.([a-z]){4,}\.(.+)/); // Tries to get the domain name w/o subdomain

  window.localStorage.setItem('OTActiveGroups', window.OnetrustActiveGroups);
  window.localStorage.setItem('OTAlertMoreInfoText', window.OneTrust.GetDomainData().AlertMoreInfoText);

  if (prevOT && prevOT !== window.OnetrustActiveGroups) {
    const difference = (a, b) => a.filter(i => b.indexOf(i) < 0);
    const getCookieGroups = groups => groups.split(',').filter(group => group !== '');
    const deleteCookie = (cookieName, cookieDomain) => {
      if (cookieName.indexOf('xxxxx') !== -1) {
        const regex = cookieName.replace('xxxxx', '.+');
        const result = window.document.cookie.match(regex);

        if (result) {
          cookieName = result[0];
        }
      }

      return `${cookieName}=; domain=${cookieDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    };

    const cookiesList = window.OneTrust.GetDomainData()
      .Groups.filter(cookiesGroup => cookiesGroup.ShowInPopup === true)
      .map(group => ({
        cookies: group.Cookies,
        group: group.OptanonGroupId,
      }));

    const groupsToDelete = difference(
      getCookieGroups(window.prevOT),
      getCookieGroups(window.OnetrustActiveGroups)
    );

    if (groupsToDelete.length > 0) {
      const cookiesListByGroups = groupsToDelete
        .map(c => cookiesList.filter(cs => cs.group == c))
        .map(e =>
          e[0].cookies.map(c => ({
            name: c.Name,
            domain: c.Host,
          }))
        );

      window.cookiesToDelete =
        cookiesListByGroups.length > 1
          ? cookiesListByGroups.reduce((a, b) => a.concat(b))
          : cookiesListByGroups[0];

      if (window.cookiesToDelete.length > 0) {
        window.cookiesToDelete.forEach(cookie => {
          window.document.cookie = deleteCookie(cookie.name, cookie.domain); // First, try the domain name got from OT info
          window.document.cookie = deleteCookie(cookie.name, domain); // Then, try removing the cookie with the full domain name

          if (partialDomain) {
            window.document.cookie = deleteCookie(cookie.name, partialDomain[0]); // Finally, try removing the cookie with the domain name w/o subdomain
          }
        });
      }
    }

    window.location.reload();
  }
}


if (typeof CNConfig === 'undefined') {
  var CNConfig = {};
}

CNConfig.initialized = false;
CNConfig._callbacks = [];

CNConfig.initialize = function() {
  for (idx in CNConfig._callbacks) {
    CNConfig._callbacks[idx]();
  }

  console.log('CNConfig inicializado: version=' + CNConfig.version);
};

CNConfig.addInitializeListener = function(callback) {
  CNConfig._callbacks.push(callback);
};


/* tdi object failsafe */
var w = window;
w.cnc = w.cnc || {};

/* Routes Tracking Calls to the appropriate trackMetrics Functions*/
cnc.trackData = function (d) {
  if (d.type === "CNCommServerInit" && d.data) {
    if (!window.CNCommServer || !window.CNCommServer.initialized) {
      window.CNCommServer.init(
        d.data.type, 
        d.data.feed_code, 
        d.data.language, 
        d.data.platform, 
        d.data.closeTakeOver
      );
    }
  } else if (d.type === "CNCommServerUninit") {
    if (window.CNCommServer) {
      window.CNCommServer.uninit();
    }
  }
};

/* Provides functionality to read an array(s) for stored data and intercept future data pushed to the array(s) */
/* Stored and read data is sent to per array designated function */
cnc.actionTracker = {
  "instances": {},
  "add": function (dloStr, dlaStr, cbFunc, _dbgBool) {
    var _private = {
      "cbFunc": function() {},
      "targetArray": [],
      "dloStr": "",
      "dlaStr": "",
      "logMsgs": window.localStorage && localStorage.debugCNCommTracker === "true" ? true : false,
      "consoleInfo": function (msg) {
        if (_private.logMsgs && typeof console !== "undefined" && console.info && !!msg) {
          console.info("ensBtAt: " + msg);
        }
      },
      "checkArrPoly": function (v) {
        return v && typeof v === "object" && v.constructor === Array;
      },
      "checkArr": function (dloStr, dlaStr) {
        _private.consoleInfo("checkarr|" + dloStr + "|" + dlaStr);
        if (typeof window[dloStr] === "object" && typeof window[dloStr][dlaStr] !== "undefined") {
          var t = window[dloStr][dlaStr];
          if (!!window.Array && typeof Array.isArray === "function") {
            return Array.isArray(t) ? t : false;
          } else {
            return _private.checkArrPoly(t) ? t : false;
          }
        }
        return false;
      },
      "processData": function () {
        _private.consoleInfo("processData");
        try {
          _private.consoleInfo("Data Payload: " + JSON.stringify(arguments[0], null, 2));
        } catch (e){
         _private.consoleInfo("Could Not Log Data Payload");
        }
        _private.cbFunc(arguments[0]);
      },
      "parseOriginalData": function () {
        _private.consoleInfo("parseOriginalData");
        _private.targetArray.forEach(function(element) {
          _private.processData(element);
        });
        _private.targetArray.length = 0;
      },
      "newPush": function () {
        _private.consoleInfo("_private.newPush");
        _private.processData(arguments[0]);
      },
      "setupNewPush": function () {
        _private.targetArray.push = function (d) {
          try {
            _private.newPush(d);
          } catch (e) {
            return 0;
          }
          return 1;
        };
      },
      "init": function (dloStr, dlaStr, cbFunc) {
        _private.consoleInfo("private init");
        _private.targetArray = _private.checkArr(dloStr, dlaStr);
        if (!_private.targetArray) {
          _private.consoleInfo("Not an Array|" + dloStr + "|" + dlaStr);
          return false;
        }
        _private.cbFunc = cbFunc;
        _private.parseOriginalData();
        _private.setupNewPush();
        return true;
      }
    };
    try {
      if (typeof dloStr === "string" && typeof dlaStr === "string" && typeof cbFunc === "function") {
        cnc.actionTracker.instances[dloStr + "|" + dlaStr] = _private.init(dloStr, dlaStr, cbFunc);
      }
    } catch (e) {
      return false;
    }
  }
};

/* function to initialize an instance of actionTracker for the cnc_holder.trackCmd array */
cnc.loadActionTracker = function () {
  if (
    cnc.trackData && 
    window.cnc_holder && 
    window.cnc_holder.trackCmd && 
    typeof window.CNCommServer === "object" && 
    typeof window.CNComm === "object" && 
    typeof window.tdi === "object"
    ) {
    cnc.actionTracker.add("cnc_holder", "trackCmd", cnc.trackData);
  } else {
    setTimeout(function () {
      cnc.loadActionTracker();
    }, 100);
  }
};

/* call the initializer function */
cnc.loadActionTracker();




/*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
    is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>    
    This version contains a patch added by Learnship Networks GmbH to fix Chrome 6.65.x issue with an emtpy flash object tag <https://github.com/learnship/swfobject>
*/
var swfobject=function(){var e,t,n,a,i,r,o="undefined",s="object",l="Shockwave Flash",d="application/x-shockwave-flash",f="SWFObjectExprInst",c="onreadystatechange",u="",p=window,v=document,y=navigator,h=!1,m=[],g=[],b=[],w=[],E=!1,C=!1,A=!0,S=!1,T=function(){var e=typeof v.getElementById!==o&&typeof v.getElementsByTagName!==o&&typeof v.createElement!==o,t=y.userAgent.toLowerCase(),n=y.platform.toLowerCase(),a=/win/.test(n||t),i=/mac/.test(n||t),r=!!/webkit/.test(t)&&parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")),f="Microsoft Internet Explorer"===y.appName,c=[0,0,0],u=null;if(typeof y.plugins!==o&&typeof y.plugins[l]===s)(u=y.plugins[l].description)&&typeof y.mimeTypes!==o&&y.mimeTypes[d]&&y.mimeTypes[d].enabledPlugin&&(h=!0,f=!1,u=u.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),c[0]=D(u.replace(/^(.*)\..*$/,"$1")),c[1]=D(u.replace(/^.*\.(.*)\s.*$/,"$1")),c[2]=/[a-zA-Z]/.test(u)?D(u.replace(/^.*[a-zA-Z]+(.*)$/,"$1")):0);else if(typeof p.ActiveXObject!==o)try{var m=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");m&&(u=m.GetVariable("$version"))&&(f=!0,c=[D((u=u.split(" ")[1].split(","))[0]),D(u[1]),D(u[2])])}catch(e){}return{w3:e,pv:c,wk:r,ie:f,win:a,mac:i}}();T.w3&&((typeof v.readyState!==o&&("complete"===v.readyState||"interactive"===v.readyState)||typeof v.readyState===o&&(v.getElementsByTagName("body")[0]||v.body))&&N(),E||(typeof v.addEventListener!==o&&v.addEventListener("DOMContentLoaded",N,!1),T.ie&&(v.attachEvent(c,function e(){"complete"===v.readyState&&(v.detachEvent(c,e),N())}),p==top&&function e(){if(!E){try{v.documentElement.doScroll("left")}catch(t){return void setTimeout(e,0)}N()}}()),T.wk&&function e(){E||(/loaded|complete/.test(v.readyState)?N():setTimeout(e,0))}()));function N(){if(!E&&document.getElementsByTagName("body")[0]){try{var e,t=V("span");t.style.display="none",(e=v.getElementsByTagName("body")[0].appendChild(t)).parentNode.removeChild(e),e=null,t=null}catch(e){return}E=!0;for(var n=m.length,a=0;a<n;a++)m[a]()}}function k(e){E?e():m[m.length]=e}function B(){var e=g.length;if(e>0)for(var t=0;t<e;t++){var n=g[t].id,a=g[t].callbackFn,i={success:!1,id:n};if(T.pv[0]>0){var r=R(n);if(r)if(!H(g[t].swfVersion)||T.wk&&T.wk<312)if(g[t].expressInstall&&L()){var s={};s.data=g[t].expressInstall,s.width=r.getAttribute("width")||"0",s.height=r.getAttribute("height")||"0",r.getAttribute("class")&&(s.styleclass=r.getAttribute("class")),r.getAttribute("align")&&(s.align=r.getAttribute("align"));for(var l={},d=r.getElementsByTagName("param"),f=d.length,c=0;c<f;c++)"movie"!==d[c].getAttribute("name").toLowerCase()&&(l[d[c].getAttribute("name")]=d[c].getAttribute("value"));O(s,l,n,a)}else j(r),a&&a(i);else z(n,!0),a&&(i.success=!0,i.ref=I(n),i.id=n,a(i))}else if(z(n,!0),a){var u=I(n);u&&typeof u.SetVariable!==o&&(i.success=!0,i.ref=u,i.id=u.id),a(i)}}}function I(e){var t=null,n=R(e);return n&&"OBJECT"===n.nodeName.toUpperCase()&&(t=typeof n.SetVariable!==o?n:n.getElementsByTagName(s)[0]||n),t}function L(){return!C&&H("6.0.65")&&(T.win||T.mac)&&!(T.wk&&T.wk<312)}function O(i,r,s,l){var d=R(s);if(s=P(s),C=!0,n=l||null,a={success:!1,id:s},d){"OBJECT"===d.nodeName.toUpperCase()?(e=x(d),t=null):(e=d,t=s),i.id=f,(typeof i.width===o||!/%$/.test(i.width)&&D(i.width)<310)&&(i.width="310"),(typeof i.height===o||!/%$/.test(i.height)&&D(i.height)<137)&&(i.height="137");var c=T.ie?"ActiveX":"PlugIn",u="MMredirectURL="+encodeURIComponent(p.location.toString().replace(/&/g,"%26"))+"&MMplayerType="+c+"&MMdoctitle="+encodeURIComponent(v.title.slice(0,47)+" - Flash Player Installation");if(typeof r.flashvars!==o?r.flashvars+="&"+u:r.flashvars=u,T.ie&&4!=d.readyState){var y=V("div");s+="SWFObjectNew",y.setAttribute("id",s),d.parentNode.insertBefore(y,d),d.style.display="none",M(d)}F(i,r,s)}}function j(e){if(T.ie&&4!=e.readyState){e.style.display="none";var t=V("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(x(e),t),M(e)}else e.parentNode.replaceChild(x(e),e)}function x(e){var t=V("div");if(T.win&&T.ie)t.innerHTML=e.innerHTML;else{var n=e.getElementsByTagName(s)[0];if(n){var a=n.childNodes;if(a)for(var i=a.length,r=0;r<i;r++)1==a[r].nodeType&&"PARAM"===a[r].nodeName||8==a[r].nodeType||t.appendChild(a[r].cloneNode(!0))}}return t}function F(e,t,n){var a,i,r,l,f=R(n);if(n=P(n),T.wk&&T.wk<312)return a;if(f){var c,u,p,v=T.ie?V("div"):V(s);for(p in typeof e.id===o&&(e.id=n),t)t.hasOwnProperty(p)&&"movie"!==p.toLowerCase()&&$(v,p,t[p]);for(c in T.ie&&(i=e.data,r=v.innerHTML,(l=V("div")).innerHTML="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='"+i+"'>"+r+"</object>",v=l.firstChild),e)e.hasOwnProperty(c)&&("styleclass"===(u=c.toLowerCase())?v.setAttribute("class",e[c]):"classid"!==u&&"data"!==u&&v.setAttribute(c,e[c]));T.ie?b[b.length]=e.id:(v.setAttribute("type",d),v.setAttribute("data",e.data)),f.parentNode.replaceChild(v,f),a=v}return a}function $(e,t,n){var a=V("param");a.setAttribute("name",t),a.setAttribute("value",n),e.appendChild(a)}function M(e){var t=R(e);t&&"OBJECT"===t.nodeName.toUpperCase()&&(T.ie?(t.style.display="none",function e(){if(4==t.readyState){for(var n in t)"function"==typeof t[n]&&(t[n]=null);t.parentNode.removeChild(t)}else setTimeout(e,10)}()):t.parentNode.removeChild(t))}function U(e){return e&&e.nodeType&&1===e.nodeType}function P(e){return U(e)?e.id:e}function R(e){if(U(e))return e;var t=null;try{t=v.getElementById(e)}catch(e){}return t}function V(e){return v.createElement(e)}function D(e){return parseInt(e,10)}function H(e){e+="";var t=T.pv,n=e.split(".");return n[0]=D(n[0]),n[1]=D(n[1])||0,n[2]=D(n[2])||0,t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]}function W(e,t,n,a){var s=v.getElementsByTagName("head")[0];if(s){var l="string"==typeof n?n:"screen";if(a&&(i=null,r=null),!i||r!=l){var d=V("style");d.setAttribute("type","text/css"),d.setAttribute("media",l),i=s.appendChild(d),T.ie&&typeof v.styleSheets!==o&&v.styleSheets.length>0&&(i=v.styleSheets[v.styleSheets.length-1]),r=l}i&&(typeof i.addRule!==o?i.addRule(e,t):typeof v.createTextNode!==o&&i.appendChild(v.createTextNode(e+" {"+t+"}")))}}function z(e,t){if(A){var n=t?"visible":"hidden",a=R(e);E&&a?a.style.visibility=n:"string"==typeof e&&W("#"+e,"visibility:"+n)}}function G(e){return null!==/[\\\"<>\.;]/.exec(e)&&typeof encodeURIComponent!==o?encodeURIComponent(e):e}m[0]=function(){h?function(){var e=v.getElementsByTagName("body")[0],t=V(s);t.setAttribute("type",d),t.setAttribute("style","opacity:0; position:absolute; left:0; bottom:0; z-index:13"),t.setAttribute("height","7"),t.setAttribute("width","7"),t.setAttribute("data",u);var n=e.appendChild(t);if(n){var a=0;!function i(){if(typeof n.GetVariable!==o)try{var r=n.GetVariable("$version");r&&(r=r.split(" ")[1].split(","),T.pv=[D(r[0]),D(r[1]),D(r[2])])}catch(e){T.pv=[8,0,0]}else if(a<10)return a++,void setTimeout(i,10);e.removeChild(t),n=null,B()}()}else B()}():B()};T.ie&&window.attachEvent("onunload",function(){for(var e=w.length,t=0;t<e;t++)w[t][0].detachEvent(w[t][1],w[t][2]);for(var n=b.length,a=0;a<n;a++)M(b[a]);for(var i in T)T[i]=null;for(var r in T=null,swfobject)swfobject[r]=null;swfobject=null});return{registerObject:function(e,t,n,a){if(T.w3&&e&&t){var i={};i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=a,g[g.length]=i,z(e,!1)}else a&&a({success:!1,id:e})},getObjectById:function(e){if(T.w3)return I(e)},embedSWF:function(e,t,n,a,i,r,l,d,f,c){var u=P(t),p={success:!1,id:u};T.w3&&!(T.wk&&T.wk<312)&&e&&t&&n&&a&&i?(z(u,!1),k(function(){n+="",a+="";var v={};if(f&&typeof f===s)for(var y in f)v[y]=f[y];v.data=e,v.width=n,v.height=a;var h={};if(d&&typeof d===s)for(var m in d)h[m]=d[m];if(l&&typeof l===s)for(var g in l)if(l.hasOwnProperty(g)){var b=S?encodeURIComponent(g):g,w=S?encodeURIComponent(l[g]):l[g];typeof h.flashvars!==o?h.flashvars+="&"+b+"="+w:h.flashvars=b+"="+w}if(H(i)){var E=F(v,h,t);v.id==u&&z(u,!0),p.success=!0,p.ref=E,p.id=E.id}else{if(r&&L())return v.data=r,void O(v,h,t,c);z(u,!0)}c&&c(p)})):c&&c(p)},switchOffAutoHideShow:function(){A=!1},enableUriEncoding:function(e){S=typeof e===o||e},ua:T,getFlashPlayerVersion:function(){return{major:T.pv[0],minor:T.pv[1],release:T.pv[2]}},hasFlashPlayerVersion:H,createSWF:function(e,t,n){return T.w3?F(e,t,n):void 0},showExpressInstall:function(e,t,n,a){T.w3&&L()&&O(e,t,n,a)},removeSWF:function(e){T.w3&&M(e)},createCSS:function(e,t,n,a){T.w3&&W(e,t,n,a)},addDomLoadEvent:k,addLoadEvent:function(e){if(typeof p.addEventListener!==o)p.addEventListener("load",e,!1);else if(typeof v.addEventListener!==o)v.addEventListener("load",e,!1);else if(typeof p.attachEvent!==o)a="onload",i=e,(n=p).attachEvent(a,i),w[w.length]=[n,a,i];else if("function"==typeof p.onload){var t=p.onload;p.onload=function(){t(),e()}}else p.onload=e;var n,a,i},getQueryParamValue:function(e){var t=v.location.search||v.location.hash;if(t){if(/\?/.test(t)&&(t=t.split("?")[1]),!e)return G(t);for(var n=t.split("&"),a=0;a<n.length;a++)if(n[a].substring(0,n[a].indexOf("="))==e)return G(n[a].substring(n[a].indexOf("=")+1))}return""},expressInstallCallback:function(){if(C){var i=R(f);i&&e&&(i.parentNode.replaceChild(e,i),t&&(z(t,!0),T.ie&&(e.style.display="block")),n&&n(a)),C=!1}},version:"2.3"}}();

