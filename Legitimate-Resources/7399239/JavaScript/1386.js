(function(){var r=function(c){try{for(var b=document.getElementsByName("ExtraLog")[0],a=b.value,a=JSON.parse(decodeURI(a)),e=0;e<a.length;e++)if(a[e].hasOwnProperty("survey4Error")){a[e].survey4Error.push(c);b.value=encodeURI(JSON.stringify(a));return}a.push({survey4Error:[c]});b.value=encodeURI(JSON.stringify(a))}catch(d){setTimeout(function(){r(c)},800)}};try{var n={b64:function(c){var b,a=[];b=c.length;for(var e=b%3,d=b-e,k=0;k<d;)b=c[k++]<<16|c[k++]<<8|c[k++],a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b>>>
18&63)),a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b>>>12&63)),a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b>>>6&63)),a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b&63));switch(e){case 2:b=c[k++]<<16|c[k++]<<8;a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b>>>18&63));a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b>>>12&
63));a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b>>>6&63));a.push("\x3d");break;case 1:b=c[k++]<<16,a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b>>>18&63)),a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b>>>12&63)),a.push("\x3d"),a.push("\x3d")}return a.join("")},bitset:function(c){for(var b=[],a=0,e=0,d=0;d<c.length;++d)e=d&7,a|=c[d]?1<<7-e:0,7===e&&(b.push(a),a=0);0!==c.length%8&&b.push(a);
return b},hashString:function(c){var b=0;if(0===c.length)return b;for(var a=0;a<c.length;a++)var e=c.charCodeAt(a),b=(b<<5)-b+e,b=b&b;return b}},l={perfObj:window.performance&&Sfdc.isFunction(window.performance.now)?window.performance:void 0,get:function(){return l.perfObj?l.perfObj.now():(new Date).getTime()}},u=function(){var c=["monospace","sans-serif","serif"],b=[],a=document.createElement("div");a.style.position="fixed";a.style.visibility="hidden";for(var e=0;e<c.length;++e){var d=document.createElement("span");
d.style.fontSize="72px";d.innerHTML="mmmmmmmmmmlli";d.style.fontFamily=c[e];a.appendChild(d)}this.consider=function(d){b.push(d);for(var e=document.createElement("div"),f=0;f<c.length;++f){var m=document.createElement("span");m.style.fontSize="72px";m.style.fontFamily=d+","+c[f];m.textContent="mmmmmmmmmmlli";e.appendChild(m)}a.appendChild(e)};this.detect=function(){var d=[],e=[];if(0===d.length||0===e.length){document.body.appendChild(a);for(var f=0;f<c.length;++f){var m=a.children[f];d[f]=m.offsetWidth;
e[f]=m.offsetHeight}}f=0;m=[];for(f=0;f<b.length;++f){for(var p=!1,g=a.children[c.length+f],l=0;l<c.length;++l)var n=g.children[l],n=n.offsetWidth!==d[l]||n.offsetHeight!==e[l],p=p||n;m.push(p)}return m};this.clean=function(){a&&document.body.contains(a)&&document.body.removeChild(a);b=[];a=document.createElement("div");a.style.position="fixed";a.style.visibility="hidden";for(var d=0,d=0;d<c.length;++d){var e=document.createElement("span");e.style.fontSize="72px";e.innerHTML="mmmmmmmmmmlli";e.style.fontFamily=
c[d];a.appendChild(e)}}},q=function(){};q.prototype={getMediaDevices:function(c,b){for(var a="",e=0;e<c.length&&50>e;e++)a=a+c[e].kind+":"+c[e].label+":"+c[e].deviceId+"\n";b(a)},getMediaSources:function(c){if(c)if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)c(void 0);else try{var b=this;navigator.mediaDevices.enumerateDevices().then(function(a){b.getMediaDevices(a,c)})}catch(a){c(void 0)}},getCanvas:function(){var c=document.createElement("canvas"),b="IE8";c.getContext&&(b=
c.getContext("2d"),b.textBaseline="top",b.font="14px 'Arial'",b.textBaseline="alphabetic",b.fillStyle="#f60",b.fillRect(125,1,200,20),b.fillStyle="#069",b.fillText("How quickly daft jumping zebras vex!@#$%^\x26*()-\x3d+_",2,15),b.fillStyle="rgba(102, 204, 0, 0.7)",b.fillText("How quickly daft jumping zebras vex!@#$%^\x26*()-\x3d+_",4,17),b=c.toDataURL("image/png"));return n.hashString(b)},hasSessionStorage:function(){try{return!!window.sessionStorage}catch(c){return!0}},hasLocalStorage:function(){try{return!!window.localStorage}catch(c){return!0}},
hasIndexedDB:function(){return!!window.indexedDB},hasWebSockets:function(){return"function"===typeof WebSocket},getPluginStr:function(c){for(var b="",a=0;a<c.length&&50>a;a++)b=b.concat(c[a].name,":",c[a].description,"\n");return b},getPlugins:function(){return this.getPluginStr(navigator.plugins)},getCpuClass:function(){return navigator.cpuClass||""},getCodecs:function(c){var b=document.createElement("audio"),a=document.createElement("video");return(new v("fp.codecs",'application/ogg,application/ogg; codecs\x3dbogus,application/mp4,application/mp4; codecs\x3dbogus,application/octet-stream,application/octet-stream; codecs\x3dbogus,audio/3gpp,audio/3gpp2,audio/aac,audio/x-aac,audio/aiff,audio/x-aiff,audio/ac3,audio/x-ac3,audio/basic,audio/flac,audio/x-flac,audio/mid,audio/midi,audio/x-midi,audio/mpeg,audio/x-mpeg,audio/mpegurl,audio/x-mpegurl,audio/mp4,audio/mp4; codecs\x3dbogus,audio/ogg,audio/ogg; codecs\x3dbogus,audio/wav,audio/wav; codecs\x3d0,audio/wav; codecs\x3d1,audio/wav; codecs\x3d2,audio/wave,audio/wave; codecs\x3d0,audio/wave; codecs\x3d1,audio/wave; codecs\x3d2,audio/x-wav,audio/x-wav; codecs\x3d0,audio/x-wav; codecs\x3d1,audio/x-wav; codecs\x3d2,audio/x-pn-wav,audio/x-pn-wav; codecs\x3d0,audio/x-pn-wav; codecs\x3d1,audio/x-pn-wav; codecs\x3d2,video/3gpp,video/3gpp2,video/avi,video/mpeg,video/x-mpeg,video/mp4,video/mp4; codecs\x3dbogus,video/msvideo,video/x-msvideo,video/quicktime,video/ogg,video/ogg; codecs\x3dbogus,video/mp4; codecs\x3d"avc1.42E01E, mp4a.40.2",video/mp4; codecs\x3d"avc1.58A01E, mp4a.40.2",video/mp4; codecs\x3d"avc1.4D401E, mp4a.40.2",video/mp4; codecs\x3d"avc1.64001E, mp4a.40.2",video/mp4; codecs\x3d"mp4v.20.8, mp4a.40.2",video/mp4; codecs\x3d"mp4v.20.240, mp4a.40.2",video/3gpp; codecs\x3d"mp4v.20.8, samr",video/ogg; codecs\x3d"theora, vorbis",video/ogg; codecs\x3d"theora, speex",audio/ogg; codecs\x3dvorbis,audio/ogg; codecs\x3dspeex,audio/ogg; codecs\x3dflac,video/ogg; codecs\x3d"dirac, vorbis",video/x-matroska; codecs\x3d"theora, vorbis",audio/webm,audio/webm; codecs\x3dvorbis,video/webm,video/webm; codecs\x3dvorbis,video/webm; codecs\x3dvp8,video/webm; codecs\x3dvp8.0'.split(","),
function(c){try{return/^audio\/.+/.test(c)?0<b.canPlayType(c).length:/^video\/.+/.test(c)?0<a.canPlayType(c).length:0<b.canPlayType(c).length||0<a.canPlayType(c).length}catch(d){}return!1})).deferred(c)},getDrm:function(){return"function"===typeof navigator.requestMediaKeySystemAccess?1:0},getLanguages:function(){return navigator.languages},getFonts:function(c){function b(a){return new g("detect "+a,function(){f.consider(a)})}function a(){return new g("detect",function(){var a=f.detect();f.clean();
c(n.b64(n.bitset(a)))})}var e="Andale Mono;Arial;Arial Black;Arial Hebrew;Arial MT;Arial Narrow;Arial Rounded MT Bold;Arial Unicode MS;Bitstream Vera Sans Mono;Book Antiqua;Bookman Old Style;Calibri;Cambria;Cambria Math;Century;Century Gothic;Century Schoolbook;Comic Sans;Comic Sans MS;Consolas;Courier;Courier New;Garamond;Geneva;Georgia;Helvetica;Helvetica Neue;Impact;Lucida Bright;Lucida Calligraphy;Lucida Console;Lucida Fax;LUCIDA GRANDE;Lucida Handwriting;Lucida Sans;Lucida Sans Typewriter;Lucida Sans Unicode;Microsoft Sans Serif;Monaco;Monotype Corsiva;MS Gothic;MS Outlook;MS PGothic;MS Reference Sans Serif;MS Sans Serif;MS Serif;MYRIAD;MYRIAD PRO;Palatino;Palatino Linotype;Segoe Print;Segoe Script;Segoe UI;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Tahoma;Times;Times New Roman;Times New Roman PS;Trebuchet MS;Verdana;Wingdings;Wingdings 2".split(";").concat("Abadi MT Condensed Light;Academy Engraved LET;ADOBE CASLON PRO;Adobe Garamond;ADOBE GARAMOND PRO;Agency FB;Aharoni;Albertus Extra Bold;Albertus Medium;Algerian;Amazone BT;American Typewriter;American Typewriter Condensed;AmerType Md BT;Andalus;Angsana New;AngsanaUPC;Antique Olive;Aparajita;Apple Chancery;Apple Color Emoji;Apple SD Gothic Neo;Arabic Typesetting;ARCHER;ARNO PRO;Arrus BT;Aurora Cn BT;AvantGarde Bk BT;AvantGarde Md BT;AVENIR;Ayuthaya;Bandy;Bangla Sangam MN;Bank Gothic;BankGothic Md BT;Baskerville;Baskerville Old Face;Batang;BatangChe;Bauer Bodoni;Bauhaus 93;Bazooka;Bell MT;Bembo;Benguiat Bk BT;Berlin Sans FB;Berlin Sans FB Demi;Bernard MT Condensed;BernhardFashion BT;BernhardMod BT;Big Caslon;BinnerD;Blackadder ITC;BlairMdITC TT;Bodoni 72;Bodoni 72 Oldstyle;Bodoni 72 Smallcaps;Bodoni MT;Bodoni MT Black;Bodoni MT Condensed;Bodoni MT Poster Compressed;Bookshelf Symbol 7;Boulder;Bradley Hand;Bradley Hand ITC;Bremen Bd BT;Britannic Bold;Broadway;Browallia New;BrowalliaUPC;Brush Script MT;Californian FB;Calisto MT;Calligrapher;Candara;CaslonOpnface BT;Castellar;Centaur;Cezanne;CG Omega;CG Times;Chalkboard;Chalkboard SE;Chalkduster;Charlesworth;Charter Bd BT;Charter BT;Chaucer;ChelthmITC Bk BT;Chiller;Clarendon;Clarendon Condensed;CloisterBlack BT;Cochin;Colonna MT;Constantia;Cooper Black;Copperplate;Copperplate Gothic;Copperplate Gothic Bold;Copperplate Gothic Light;CopperplGoth Bd BT;Corbel;Cordia New;CordiaUPC;Cornerstone;Coronet;Cuckoo;Curlz MT;DaunPenh;Dauphin;David;DB LCD Temp;DELICIOUS;Denmark;DFKai-SB;Didot;DilleniaUPC;DIN;DokChampa;Dotum;DotumChe;Ebrima;Edwardian Script ITC;Elephant;English 111 Vivace BT;Engravers MT;EngraversGothic BT;Eras Bold ITC;Eras Demi ITC;Eras Light ITC;Eras Medium ITC;EucrosiaUPC;Euphemia;Euphemia UCAS;EUROSTILE;Exotc350 Bd BT;FangSong;Felix Titling;Fixedsys;FONTIN;Footlight MT Light;Forte;FrankRuehl;Fransiscan;Freefrm721 Blk BT;FreesiaUPC;Freestyle Script;French Script MT;FrnkGothITC Bk BT;Fruitger;FRUTIGER;Futura;Futura Bk BT;Futura Lt BT;Futura Md BT;Futura ZBlk BT;FuturaBlack BT;Gabriola;Galliard BT;Gautami;Geeza Pro;Geometr231 BT;Geometr231 Hv BT;Geometr231 Lt BT;GeoSlab 703 Lt BT;GeoSlab 703 XBd BT;Gigi;Gill Sans;Gill Sans MT;Gill Sans MT Condensed;Gill Sans MT Ext Condensed Bold;Gill Sans Ultra Bold;Gill Sans Ultra Bold Condensed;Gisha;Gloucester MT Extra Condensed;GOTHAM;GOTHAM BOLD;Goudy Old Style;Goudy Stout;GoudyHandtooled BT;GoudyOLSt BT;Gujarati Sangam MN;Gulim;GulimChe;Gungsuh;GungsuhChe;Gurmukhi MN;Haettenschweiler;Harlow Solid Italic;Harrington;Heather;Heiti SC;Heiti TC;HELV;Herald;High Tower Text;Hiragino Kaku Gothic ProN;Hiragino Mincho ProN;Hoefler Text;Humanst 521 Cn BT;Humanst521 BT;Humanst521 Lt BT;Imprint MT Shadow;Incised901 Bd BT;Incised901 BT;Incised901 Lt BT;INCONSOLATA;Informal Roman;Informal011 BT;INTERSTATE;IrisUPC;Iskoola Pota;JasmineUPC;Jazz LET;Jenson;Jester;Jokerman;Juice ITC;Kabel Bk BT;Kabel Ult BT;Kailasa;KaiTi;Kalinga;Kannada Sangam MN;Kartika;Kaufmann Bd BT;Kaufmann BT;Khmer UI;KodchiangUPC;Kokila;Korinna BT;Kristen ITC;Krungthep;Kunstler Script;Lao UI;Latha;Leelawadee;Letter Gothic;Levenim MT;LilyUPC;Lithograph;Lithograph Light;Long Island;Lydian BT;Magneto;Maiandra GD;Malayalam Sangam MN;Malgun Gothic;Mangal;Marigold;Marion;Marker Felt;Market;Marlett;Matisse ITC;Matura MT Script Capitals;Meiryo;Meiryo UI;Microsoft Himalaya;Microsoft JhengHei;Microsoft New Tai Lue;Microsoft PhagsPa;Microsoft Tai Le;Microsoft Uighur;Microsoft YaHei;Microsoft Yi Baiti;MingLiU;MingLiU_HKSCS;MingLiU_HKSCS-ExtB;MingLiU-ExtB;Minion;Minion Pro;Miriam;Miriam Fixed;Mistral;Modern;Modern No. 20;Mona Lisa Solid ITC TT;Mongolian Baiti;MONO;MoolBoran;Mrs Eaves;MS LineDraw;MS Mincho;MS PMincho;MS Reference Specialty;MS UI Gothic;MT Extra;MUSEO;MV Boli;Nadeem;Narkisim;NEVIS;News Gothic;News GothicMT;NewsGoth BT;Niagara Engraved;Niagara Solid;Noteworthy;NSimSun;Nyala;OCR A Extended;Old Century;Old English Text MT;Onyx;Onyx BT;OPTIMA;Oriya Sangam MN;OSAKA;OzHandicraft BT;Palace Script MT;Papyrus;Parchment;Party LET;Pegasus;Perpetua;Perpetua Titling MT;PetitaBold;Pickwick;Plantagenet Cherokee;Playbill;PMingLiU;PMingLiU-ExtB;Poor Richard;Poster;PosterBodoni BT;PRINCETOWN LET;Pristina;PTBarnum BT;Pythagoras;Raavi;Rage Italic;Ravie;Ribbon131 Bd BT;Rockwell;Rockwell Condensed;Rockwell Extra Bold;Rod;Roman;Sakkal Majalla;Santa Fe LET;Savoye LET;Sceptre;Script;Script MT Bold;SCRIPTINA;Serifa;Serifa BT;Serifa Th BT;ShelleyVolante BT;Sherwood;Shonar Bangla;Showcard Gothic;Shruti;Signboard;SILKSCREEN;SimHei;Simplified Arabic;Simplified Arabic Fixed;SimSun;SimSun-ExtB;Sinhala Sangam MN;Sketch Rockwell;Skia;Small Fonts;Snap ITC;Snell Roundhand;Socket;Souvenir Lt BT;Staccato222 BT;Steamer;Stencil;Storybook;Styllo;Subway;Swis721 BlkEx BT;Swiss911 XCm BT;Sylfaen;Synchro LET;System;Tamil Sangam MN;Technical;Teletype;Telugu Sangam MN;Tempus Sans ITC;Terminal;Thonburi;Traditional Arabic;Trajan;TRAJAN PRO;Tristan;Tubular;Tunga;Tw Cen MT;Tw Cen MT Condensed;Tw Cen MT Condensed Extra Bold;TypoUpright BT;Unicorn;Univers;Univers CE 55 Medium;Univers Condensed;Utsaah;Vagabond;Vani;Vijaya;Viner Hand ITC;VisualUI;Vivaldi;Vladimir Script;Vrinda;Westminster;WHITNEY;Wide Latin;ZapfEllipt BT;ZapfHumnst BT;ZapfHumnst Dm BT;Zapfino;Zurich BlkEx BT;Zurich Ex BT".split(";")),
d,k,h=[];d=0;for(k=e.length;d<k;d+=50)h.push(e.slice(d,d+50));for(var f=new u,m=[],e=0;e<h.length;e++){for(k=0;d<h[e].length;++k)m.push(b(h[k]));m=m.concat(a())}return m},getPlatform:function(){return navigator.platform},getWindowDimensions:function(){return window.outerHeight+"x"+window.outerWidth},getScreenDimensions:function(){return screen.height+"x"+screen.width},getScreenDepth:function(){return screen.pixelDepth+"-"+screen.colorDepth},getTimezoneOffset:function(){return(new Date).getTimezoneOffset().toString()},
getFeatureBits:function(c,b){for(var a=0,e=[],a=0;a<c.length;++a)e.push(b(c[a]));return n.b64(n.bitset(e))}};var v=function(c,b,a){this.deferred=function(e){function d(b,d){return new g(c+"."+b,function(){k.push(a(d))})}if(!Sfdc.isFunction(e))return[];for(var k=[],h=0,f=[],h=0;h<b.length;++h)f.push(d(h,b[h]));f.push(new g(c+".complete",function(){e(n.b64(n.bitset(k)))}));return f}};Array.isArray||(Array.isArray=function(c){return"[object Array]"===Object.prototype.toString.call(c)});var w=function(c){var b=
Sfdc.apply({maxExecutionWindowDuration:50,maxExecutionDelay:2E3,before:function(){},condition:function(a,b){return!0},after:function(){}},c,!0);this.execute=function(a){function c(k){if(d<a.length){var h=0,f;for(f=l.get();d<a.length&&h<b.maxExecutionWindowDuration&&(k.didTimeout||0<k.timeRemaining()&&(Sfdc.isFunction(b.condition)?b.condition(a[d],k):1));)a[d]instanceof g&&(h=a[d].fn,h(),h=l.get(),h-=f),++d;d<a.length?window.requestIdleCallback(c,{timeout:b.maxExecutionDelay}):Sfdc.isFunction(b.after)&&
b.after()}}if(!Array.isArray(a))throw"functions must be an Array of NamedFunction";var d=0;if(!window.requestIdleCallback||!Sfdc.isFunction(window.requestIdleCallback)||!window.cancelIdleCallback||!Sfdc.isFunction(window.cancelIdleCallback))window.requestIdleCallback=function(a){var c=l.get();return setTimeout(function(){a({didTimeout:!1,timeRemaining:function(){return Math.max(0,b.maxExecutionWindowDuration-(l.get()-c))}})},0)};d<a.length&&(Sfdc.isFunction(b.before)&&b.before(),window.requestIdleCallback(c,
{timeout:b.maxExecutionDelay}))}},x=function(c){function b(b){h||(h=setTimeout(a,b))}function a(){var a=l.get()-f;h=void 0;a<d.idlePeriod?(d.debugCallback&&Sfdc.isFunction(d.debugCallback)&&d.debugCallback(void 0,a),b(d.idlePeriod-a)):(g=!0,(!d.triggerCallback||!Sfdc.isFunction(d.triggerCallback)||!d.triggerCallback(a))&&k.end(),d.debugCallback&&Sfdc.isFunction(d.debugCallback)&&d.debugCallback(void 0,a))}function e(a){g=!1;var c=f;f=l.get();b(d.idlePeriod);d.debugCallback&&Sfdc.isFunction(d.debugCallback)&&
d.debugCallback(a.type,f-c)}var d=Sfdc.apply({element:document.body,eventTypes:"focus input keydown keyup mousedown mouseup mousemove wheel click dblclick touchstart touchend touchcancel touchmove".split(" "),idlePeriod:200,triggerCallback:function(a){return!0},debugCallback:function(a,b){}},c,!0),k=this,h,f,g=!1;this.begin=function(){for(var a=0;a<d.eventTypes.length;++a)d.element.addEventListener?d.element.addEventListener(d.eventTypes[a],e,{passive:!0}):d.element.attachEvent&&d.element.attachEvent(d.eventTypes[a],
e);f=l.get();b(d.idlePeriod)};this.end=function(){for(var a=0;a<d.eventTypes.length;++a)d.element.removeEventListener?d.element.removeEventListener(d.eventTypes[a],e):d.element.detachEvent&&d.element.detachEvent(d.eventTypes[a],e);h&&clearTimeout(h)};this.check=function(){return g}},g=function(c,b){this.name=function(){return c};this.fn=b},s=function(c){var b={},a=[];a.push(new g("fp.platform",function(){b.platform=c.getPlatform()}));a.push(new g("fp.window",function(){b.window=c.getWindowDimensions()}));
a.push(new g("fp.screen",function(){b.screen=c.getScreenDimensions()}));a.push(new g("fp.color",function(){b.color=c.getScreenDepth()}));a.push(new g("fp.timezoneOffset",function(){b.timezoneOffset=c.getTimezoneOffset()}));a.push(new g("fp.canvas",function(){b.canvas=c.getCanvas().toString()}));a.push(new g("fp.sessionStorage",function(){b.sessionStorage=c.hasSessionStorage().toString()}));a.push(new g("fp.LocalStorage",function(){b.LocalStorage=c.hasLocalStorage().toString()}));a.push(new g("fp.indexDB",
function(){b.indexDB=c.hasIndexedDB().toString()}));a.push(new g("fp.webSockets",function(){b.webSockets=c.hasWebSockets().toString()}));a.push(new g("fp.plugins",function(){b.plugins=c.getPlugins()}));a.push(new g("fp.drm",function(){b.drm=c.getDrm()}));a.push(new g("fp.languages",function(){b.languages=c.getLanguages()}));a.push(new g("fp.cpuClass",function(){var a=c.getCpuClass();a&&(b.cpuClass=a)}));a=a.concat(c.getFonts(function(a){b.fonts=a}));a=a.concat(c.getCodecs(function(a){b.codecs=a}));
a.push(new g("fp.media",function(){c.getMediaSources(function(a){a&&(b.mediaDevices=a);a=encodeURI(JSON.stringify(b));var c=document.getElementById("username"),e=document.createElement("input");e.type="hidden";e.name="Fingerprint";e.value=a;null!==c&&null!==c.parentNode&&c.parentNode.appendChild(e)})}));var e=new x({});(new w({maxExecutionWindowDuration:45,maxExecutionDelay:2E3,before:function(){e.begin()},condition:function(a,b){return e.check()},after:function(){return e.end()}})).execute(a)},t=
new q;window.addEventListener?window.addEventListener("load",function(){s(t)},!1):window.attachEvent("onload",function(){s(t)});q.traceToken="012388fd25efa20568edda7c69cfda6eeb142ebb"}catch(y){r(y.message)}})();