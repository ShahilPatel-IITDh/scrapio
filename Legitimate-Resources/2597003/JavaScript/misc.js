/*
 * General Utility functions
 *
 * Table of Contents
 * 
 * objectToQueryString - 
 * take a javascript object and convert 
 * it to a valid query string recursively
 *
 *
 *
 */


var cmsMisc = {
    objectToQueryString: function (a) {
        var prefix, s, add, name, r20, output;
        s = [];
        r20 = /%20/g;
        add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (a instanceof Array) {
            for (name in a) {
                add(name, a[name]);
            }
        } else {
            for (prefix in a) {
                this._buildParams(prefix, a[ prefix ], add);
            }
        }
        output = s.join("&").replace(r20, "+");
        return output;
    },

    _buildParams: function(prefix, obj, add) {
        var name, i, l, rbracket;
        rbracket = /\[\]$/;
        if (obj instanceof Array) {
            for (i = 0, l = obj.length; i < l; i++) {
                if (rbracket.test(prefix)) {
                    add(prefix, obj[i]);
                } else {
                    this._buildParams(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
                }
            }
        } else if (typeof obj == "object") {
        // Serialize object item.
            for (name in obj) {
                this._buildParams(prefix + "[" + name + "]", obj[ name ], add);
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    },

    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        
        return null;
    },

    createCookie: function(name,value,days) {

        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        } else {
            var expires = "";
        }
        
        document.cookie = name+"="+value+expires+"; path=/";
    },

    eraseCookie: function(name) {
        cmsMisc.createCookie(name,"",-1);
    },

// store previous ad links
// #previousAdsLink
    storeAd: function(ad, link) {
        a = { ad: ad, renderTime:new Date(), link:link };

        if(cmsMisc.readCookie("prime-data") !== null) {
            var d = JSON.parse( cmsMisc.readCookie('prime-data') );
        } else {
            var d = [];
        }
        d.push( a );

        // if over 10 then pop first element off
        // until under 10 elements or 10 attempts
        var attempts = 0;
        while(d.length > 10 && attempts < 10) {
            d.shift();
            attempt++;
        }

        //console.log("saving " + JSON.stringify(d));

        cmsMisc.createCookie('prime-data', JSON.stringify(d), 7);
    }, 
    showPreviousAds: function() {
        alert( cmsMisc.readCookie('prime-data') );
    }
};

window.cmsMisc = cmsMisc;
if ( typeof window.jQuery != 'undefined' ){
    $(document).ready(function() {
        $(".previousAdsLink").click(cmsMisc.showPreviousAds);
    });
}

