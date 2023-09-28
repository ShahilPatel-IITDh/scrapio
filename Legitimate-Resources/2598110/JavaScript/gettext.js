Gettext=function(t){this.domain="messages",this.locale_data=void 0;var e=["domain","locale_data"];if(this.isValidObject(t))for(var a in t)for(var r=0;r<e.length;r++)a==e[r]&&this.isValidObject(t[a])&&(this[a]=t[a]);return this.try_load_lang(),this},Gettext.context_glue="",Gettext._locale_data={},Gettext.prototype.try_load_lang=function(){if(void 0!==this.locale_data){var t=this.locale_data;if(this.locale_data=void 0,this.parse_locale_data(t),void 0===Gettext._locale_data[this.domain])throw new Error("Error: Gettext 'locale_data' does not contain the domain '"+this.domain+"'")}var e=this.get_lang_refs();if("object"==typeof e&&0<e.length)for(var a=0;a<e.length;a++){var r=e[a];if("application/json"==r.type){if(!this.try_load_lang_json(r.href))throw new Error("Error: Gettext 'try_load_lang_json' failed. Unable to exec xmlhttprequest for link ["+r.href+"]")}else{if("application/x-po"!=r.type)throw new Error("TODO: link type ["+r.type+"] found, and support is planned, but not implemented at this time.");if(!this.try_load_lang_po(r.href))throw new Error("Error: Gettext 'try_load_lang_po' failed. Unable to exec xmlhttprequest for link ["+r.href+"]")}}},Gettext.prototype.parse_locale_data=function(t){for(var e in void 0===Gettext._locale_data&&(Gettext._locale_data={}),t)if(t.hasOwnProperty(e)&&this.isValidObject(t[e])){var a=!1;for(var r in t[e]){a=!0;break}if(a){var o=t[e];for(var i in""==e&&(e="messages"),this.isValidObject(Gettext._locale_data[e])||(Gettext._locale_data[e]={}),this.isValidObject(Gettext._locale_data[e].head)||(Gettext._locale_data[e].head={}),this.isValidObject(Gettext._locale_data[e].msgs)||(Gettext._locale_data[e].msgs={}),o)if(""==i){var s=o[i];for(var n in s){var l=n.toLowerCase();Gettext._locale_data[e].head[l]=s[n]}}else Gettext._locale_data[e].msgs[i]=o[i]}}for(var e in Gettext._locale_data)if(this.isValidObject(Gettext._locale_data[e].head["plural-forms"])&&void 0===Gettext._locale_data[e].head.plural_func){var p=Gettext._locale_data[e].head["plural-forms"];if(!new RegExp("^(\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;a-zA-Z0-9_()])+)","m").test(p))throw new Error("Syntax error in language file. Plural-Forms header is invalid ["+p+"]");var d=Gettext._locale_data[e].head["plural-forms"];/;\s*$/.test(d)||(d=d.concat(";"));var u="var plural; var nplurals; "+d+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) };';Gettext._locale_data[e].head.plural_func=new Function("n",u)}else void 0===Gettext._locale_data[e].head.plural_func&&(Gettext._locale_data[e].head.plural_func=function(t){return{nplural:2,plural:1!=t?1:0}})},Gettext.prototype.try_load_lang_po=function(t){var e=this.sjax(t);if(e){var a=this.uri_basename(t),r=this.parse_po(e),o={};return r&&(r[""]||(r[""]={}),r[""].domain||(r[""].domain=a),o[a=r[""].domain]=r,this.parse_locale_data(o)),1}},Gettext.prototype.uri_basename=function(t){var e,a;return(e=t.match(/^(.*\/)?(.*)/))?(a=e[2].match(/^(.*)\..+$/))?a[1]:e[2]:""},Gettext.prototype.parse_po=function(t){for(var e={},a={},r="",o=[],i=t.split("\n"),s=0;s<i.length;s++){if(i[s]=i[s].replace(/(\n|\r)+$/,""),/^$/.test(i[s])){if(void 0!==a.msgid){var n=void 0!==a.msgctxt&&a.msgctxt.length?a.msgctxt+Gettext.context_glue+a.msgid:a.msgid,l=void 0!==a.msgid_plural&&a.msgid_plural.length?a.msgid_plural:null,p=[];for(var d in a){(u=d.match(/^msgstr_(\d+)/))&&(p[parseInt(u[1])]=a[d])}p.unshift(l),1<p.length&&(e[n]=p),a={},r=""}}else{if(/^#/.test(i[s]))continue;(u=i[s].match(/^msgctxt\s+(.*)/))?a[r="msgctxt"]=this.parse_po_dequote(u[1]):(u=i[s].match(/^msgid\s+(.*)/))?a[r="msgid"]=this.parse_po_dequote(u[1]):(u=i[s].match(/^msgid_plural\s+(.*)/))?a[r="msgid_plural"]=this.parse_po_dequote(u[1]):(u=i[s].match(/^msgstr\s+(.*)/))?a[r="msgstr_0"]=this.parse_po_dequote(u[1]):(u=i[s].match(/^msgstr\[0\]\s+(.*)/))?a[r="msgstr_0"]=this.parse_po_dequote(u[1]):(u=i[s].match(/^msgstr\[(\d+)\]\s+(.*)/))?a[r="msgstr_"+u[1]]=this.parse_po_dequote(u[2]):/^"/.test(i[s])?a[r]+=this.parse_po_dequote(i[s]):o.push("Strange line ["+s+"] : "+i[s])}}if(void 0!==a.msgid){n=void 0!==a.msgctxt&&a.msgctxt.length?a.msgctxt+Gettext.context_glue+a.msgid:a.msgid,l=void 0!==a.msgid_plural&&a.msgid_plural.length?a.msgid_plural:null,p=[];for(var d in a){var u;(u=d.match(/^msgstr_(\d+)/))&&(p[parseInt(u[1])]=a[d])}p.unshift(l),1<p.length&&(e[n]=p),a={},r=""}if(e[""]&&e[""][1]){var c={},h=e[""][1].split(/\\n/);for(s=0;s<h.length;s++)if(h.length){var _=h[s].indexOf(":",0);if(-1!=_){var x=h[s].substring(0,_),f=h[s].substring(_+1),g=x.toLowerCase();c[g]&&c[g].length?o.push("SKIPPING DUPLICATE HEADER LINE: "+h[s]):/#-#-#-#-#/.test(g)?o.push("SKIPPING ERROR MARKER IN HEADER: "+h[s]):(f=f.replace(/^\s+/,""),c[g]=f)}else o.push("PROBLEM LINE IN HEADER: "+h[s]),c[h[s]]=""}e[""]=c}else e[""]={};return e},Gettext.prototype.parse_po_dequote=function(t){var e;return(e=t.match(/^"(.*)"/))&&(t=e[1]),t=t.replace(/\\"/g,'"')},Gettext.prototype.try_load_lang_json=function(t){var e=this.sjax(t);if(e){var a=this.JSON(e);return this.parse_locale_data(a),1}},Gettext.prototype.get_lang_refs=function(){for(var t=new Array,e=document.getElementsByTagName("link"),a=0;a<e.length;a++)if("gettext"==e[a].rel&&e[a].href){if(void 0===e[a].type||""==e[a].type)if(/\.json$/i.test(e[a].href))e[a].type="application/json";else if(/\.js$/i.test(e[a].href))e[a].type="application/json";else if(/\.po$/i.test(e[a].href))e[a].type="application/x-po";else{if(!/\.mo$/i.test(e[a].href))throw new Error("LINK tag with rel=gettext found, but the type and extension are unrecognized.");e[a].type="application/x-mo"}if(e[a].type=e[a].type.toLowerCase(),"application/json"==e[a].type)e[a].type="application/json";else if("text/javascript"==e[a].type)e[a].type="application/json";else if("application/x-po"==e[a].type)e[a].type="application/x-po";else{if("application/x-mo"!=e[a].type)throw new Error("LINK tag with rel=gettext found, but the type attribute ["+e[a].type+"] is unrecognized.");e[a].type="application/x-mo"}t.push(e[a])}return t},Gettext.prototype.textdomain=function(t){return t&&t.length&&(this.domain=t),this.domain},Gettext.prototype.gettext=function(t){return this.dcnpgettext(null,void 0,t,void 0,void 0,void 0)},Gettext.prototype.dgettext=function(t,e){return this.dcnpgettext(t,void 0,e,void 0,void 0,void 0)},Gettext.prototype.dcgettext=function(t,e,a){return this.dcnpgettext(t,void 0,e,void 0,void 0,a)},Gettext.prototype.ngettext=function(t,e,a){return this.dcnpgettext(null,void 0,t,e,a,void 0)},Gettext.prototype.dngettext=function(t,e,a,r){return this.dcnpgettext(t,void 0,e,a,r,void 0)},Gettext.prototype.dcngettext=function(t,e,a,r,o){return this.dcnpgettext(t,void 0,e,a,r,o,o)},Gettext.prototype.pgettext=function(t,e){return this.dcnpgettext(null,t,e,void 0,void 0,void 0)},Gettext.prototype.dpgettext=function(t,e,a){return this.dcnpgettext(t,e,a,void 0,void 0,void 0)},Gettext.prototype.dcpgettext=function(t,e,a,r){return this.dcnpgettext(t,e,a,void 0,void 0,r)},Gettext.prototype.npgettext=function(t,e,a,r){return this.dcnpgettext(null,t,e,a,r,void 0)},Gettext.prototype.dnpgettext=function(t,e,a,r,o){return this.dcnpgettext(t,e,a,r,o,void 0)},Gettext.prototype.dcnpgettext=function(t,e,a,r,o,i){if(!this.isValidObject(a))return"";var s=this.isValidObject(r),n=this.isValidObject(e)?e+Gettext.context_glue+a:a,l=this.isValidObject(t)?t:this.isValidObject(this.domain)?this.domain:"messages",p=new Array;if(void 0!==Gettext._locale_data&&this.isValidObject(Gettext._locale_data[l]))p.push(Gettext._locale_data[l]);else if(void 0!==Gettext._locale_data)for(var d in Gettext._locale_data)p.push(Gettext._locale_data[d]);var u,c=[],h=!1;if(p.length)for(var _=0;_<p.length;_++){var x=p[_];if(this.isValidObject(x.msgs[n])){for(var f=0;f<x.msgs[n].length;f++)c[f]=x.msgs[n][f];if(c.shift(),u=x,h=!0,0<c.length&&0!=c[0].length)break}}0!=c.length&&0!=c[0].length||(c=[a,r]);var g=c[0];if(s){var v;if(h&&this.isValidObject(u.head.plural_func)){var m=u.head.plural_func(o);m.plural||(m.plural=0),m.nplural||(m.nplural=0),m.nplural<=m.plural&&(m.plural=0),v=m.plural}else v=1!=o?1:0;this.isValidObject(c[v])&&(g=c[v])}return g},Gettext.strargs=function(t,e){null==e||void 0===e?e=[]:e.constructor!=Array&&(e=[e]);for(var a="";;){var r,o=t.indexOf("%");if(-1==o){a+=t;break}if(a+=t.substr(0,o),"%%"==t.substr(o,2))a+="%",t=t.substr(o+2);else if(r=t.substr(o).match(/^%(\d+)/)){var i=parseInt(r[1]),s=r[1].length;0<i&&null!=e[i-1]&&void 0!==e[i-1]&&(a+=e[i-1]),t=t.substr(o+1+s)}else a+="%",t=t.substr(o+1)}return a},Gettext.prototype.strargs=function(t,e){return Gettext.strargs(t,e)},Gettext.prototype.isArray=function(t){return this.isValidObject(t)&&t.constructor==Array},Gettext.prototype.isValidObject=function(t){return null!=t&&void 0!==t},Gettext.prototype.sjax=function(t){var e;if(!(e=window.XMLHttpRequest?new XMLHttpRequest:-1!=navigator.userAgent.toLowerCase().indexOf("msie 5")?new ActiveXObject("Microsoft.XMLHTTP"):new ActiveXObject("Msxml2.XMLHTTP")))throw new Error("Your browser doesn't do Ajax. Unable to support external language files.");e.open("GET",t,!1);try{e.send(null)}catch(t){return}var a=e.status;if(200==a||0==a)return e.responseText;var r=e.statusText+" (Error "+e.status+")";return e.responseText.length&&(r+="\n"+e.responseText),void console.warn(r)},Gettext.prototype.JSON=function(data){return eval("("+data+")")};