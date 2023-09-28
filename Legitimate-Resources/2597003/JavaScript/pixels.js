var tl_pixels = {
    _key: 'tl-pixels',
    _pixels: {},
    _lock: false, // once per page

    init: function () {
        console.log('tl_pixels.init');
        
        if (window.tl_pixels._lock) return; // only run once per page
        window.tl_pixels._lock = true;

        var data = localStorage.getItem(window.tl_pixels._key);

        if (data) {
            window.tl_pixels._pixels = JSON.parse(data);
            window.tl_pixels.checkEvents();
        } else {
            if ( localStorage.getItem('pageload') != null &&
                localStorage.getItem('pageload') != 1) {
                window.tl_pixels.checkEvents();
                return; // already been here
            }

            window.tl_pixels.getSite(function () {
                if (this.readyState == 4 && this.status == 200) {
                    var source = JSON.parse(this.responseText);
                    window.tl_pixels.loadPixels(source);
                }
            });

            // store current url
            window.tl_pixels.setParams(window.location.href);

            // check if sourcecode
            var s = window.cmsMisc.readCookie('sourcecode');

            if (!s) return; // done if no sourcecode

            window.tl_pixels.getSourcecode(s, function () {
                if (this.readyState == 4 && this.status == 200) {
                    var source = JSON.parse(this.responseText);
                    window.tl_pixels.loadPixels(source);
                    window.tl_pixels.checkEvents();
                }
            });

        }

    },

    checkEvents: function () {
        console.log('tl_pixels.checkEvents');
        
        var events = window.cmsMisc.readCookie('pixel-events');
        if (!events){
            console.log('tl_pixels.checkEvents no events');
            return; // all done
        }

        // fire the events
        events = decodeURIComponent(events).split(',');
        for (var i = 0; i < events.length; i++) {
            window.tl_pixels.fireEvent(events[i]);
        }

        window.cmsMisc.eraseCookie('pixel-events');
    },

    loadPixels: function (source) {
        // sourcecode pixels
        if (source.hasOwnProperty('lsPreFirePixel')) {
            window.tl_pixels.pushPixel('prefire', source.lsPreFirePixel);
        }
        if (source.hasOwnProperty('lsOptinPixel')) {
            window.tl_pixels.pushPixel('optin', source.lsOptinPixel);
        }
        if (source.hasOwnProperty('lsConfirmationPixel')) {
            window.tl_pixels.pushPixel('confirmation', source.lsConfirmationPixel);
        }

        // site pixels
        if (source.hasOwnProperty('sOptinPixel')) {
            window.tl_pixels.pushPixel('optin', source.sOptinPixel);
        }
        if (source.hasOwnProperty('sConfirmationPixel')) {
            window.tl_pixels.pushPixel('confirmation', source.sConfirmationPixel);
        }
    },

    getSourcecode: function (s, success) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", success);
        oReq.open("GET", "/api/v2/sourcecode/" + s);
        oReq.send();
    },

    getSite: function (success) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", success);
        oReq.open("GET", "/api/v2/site/");
        oReq.send();
    },

    pushPixel: function (event, pixel) {
        if (!window.tl_pixels._pixels[event]) window.tl_pixels._pixels[event] = [];

        window.tl_pixels._pixels[event].push(pixel);

        window.tl_pixels.pageClosingCallback(); // call to save
    },

    pageClosingCallback: function (e) {
        localStorage.setItem(window.tl_pixels._key, JSON.stringify(window.tl_pixels._pixels));
    },

    fireEvent: function (event) {
        console.log('tl_pixels.fireEvent event', event);
        //console.log('--- window.tl_pixels._pixels', window.tl_pixels._pixels);
        
        
        // i do not get past this
        var pixels = window.tl_pixels._pixels[event];
        
        //console.log('tl_pixels pixels', pixels);
        
        
        if (!pixels){
            console.log('tl_pixels no pixels event', event);
            return;
        }

        var params = window.tl_pixels.getParams();
        
        console.log('tl_pixels pixels.length', pixels.length);
        
        // add the pixels to the page
        for (var i = 0; i < pixels.length; i++) {
            
            var elem = document.createElement('div');
            var html = pixels[i];

            html = html.replace("[subscriber_id]", cmsMisc.readCookie('tl-sub-id'));

    		if(event != "prefire" && html.includes("[EMAIL_HASH]")) {
    			var MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
    			html = html.replace("[EMAIL_HASH]", MD5(cmsMisc.readCookie('tl-sub-id')));
    		}
                
            var email = Base64.decode(decodeURIComponent(cmsMisc.readCookie('tl-encoded')));
            if(emailIsValid(email)) {
                html = html.replace("[email]", email);
            } else {
    		    html = html.replace("[email]", '');
    	    }

            // 2023-04-28
            if(params != null){
                if(params.hasOwnProperty('ss')) {
                    html = html.replace("[?ss]", params.ss);
                }
                
                if(params.hasOwnProperty('cs')) {
                    html = html.replace("[?cs]", params.cs);
                }
            }
            

            elem.innerHTML = html;
            document.body.appendChild(elem);
            window.tl_pixels.runJSInHTML(elem);
        }

        // mark these as fired after 1 seconds
        setTimeout(window.tl_pixels.markFired, 1, event); // mark as fired after 1 seconds
    },

    runJSInHTML: function(body_el) {
        // Finds and executes scripts in a newly added element's body.
        // Needed since innerHTML does not run scripts.
        //
        // Argument body_el is an element in the dom.
      
        function nodeName(elem, name) {
          return elem.nodeName && elem.nodeName.toUpperCase() ===
                    name.toUpperCase();
        };
      
        function evalScript(elem) {
          var data = (elem.text || elem.textContent || elem.innerHTML || "" ),
              head = document.getElementsByTagName("head")[0] ||
                        document.documentElement,
              script = document.createElement("script");
      
          script.type = "text/javascript";
	if(elem.src !== "") {
          script.src = (elem.src || "" );
		}
          try {
            // doesn't work on ie...
            script.appendChild(document.createTextNode(data));      
          } catch(e) {
            // IE has funky script nodes
            script.text = data;
          }
      
          head.insertBefore(script, head.firstChild);
          //head.removeChild(script);
        };
      
        // main section of function
        var scripts = [],
            script,
            children_nodes = body_el.childNodes,
            child,
            i;
      
        for (i = 0; children_nodes[i]; i++) {
          child = children_nodes[i];
          if (nodeName(child, "script" ) &&
            (!child.type || child.type.toLowerCase() === "text/javascript")) {
                scripts.push(child);
            }
        }
      
        for (i = 0; scripts[i]; i++) {
          script = scripts[i];
          if (script.parentNode) {script.parentNode.removeChild(script);}
          evalScript(scripts[i]);
        }
      },

    markFired: function (event) {
        delete window.tl_pixels._pixels[event];
        window.tl_pixels.pageClosingCallback(); // call to save
    },

    setParams: function(url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }

        cmsMisc.createCookie('pixel-merge-data', JSON.stringify(params), 1);

        return params;
    },
    // returns all url parameters for url passed in
    getParams: function () {
        return JSON.parse(cmsMisc.readCookie('pixel-merge-data'));
    }

};

window.tl_pixels = tl_pixels;
window.addEventListener('beforeunload', window.tl_pixels.pageClosingCallback);






//$(document).ready(window.tl_pixels.init);




// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    console.log('DOMContentLoadedCallback called');
    
    
    if(typeof window.tl_pixels != "undefined"  &&  typeof window.tl_pixels.init != undefined){
        window.tl_pixels.init();
    }else{
        console.log('no window.tl_pixels.init');
    }
    
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    //console.log('DOM loaded 2');
    DOMContentLoadedCallback();
} else {
    //console.log('DOM loaded 1');
    document.addEventListener("DOMContentLoaded", DOMContentLoadedCallback);
}













function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    
    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
    
        input = Base64._utf8_encode(input);
    
        while (i < input.length) {
    
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
    
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
    
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
    
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    
        }
    
        return output;
    },
    
    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
    
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
        while (i < input.length) {
    
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
    
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
    
            output = output + String.fromCharCode(chr1);
    
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
    
        }
    
        output = Base64._utf8_decode(output);
    
        return output;
    
    },
    
    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
    
        for (var n = 0; n < string.length; n++) {
    
            var c = string.charCodeAt(n);
    
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
    
        }
    
        return utftext;
    },
    
    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
    
        while ( i < utftext.length ) {
    
            c = utftext.charCodeAt(i);
    
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
    
        }
    
        return string;
    }
    
    }
