
            var utm_set = null;
            function setup_utm(){ if (utm_set == null) return null; var i=0; var p = document.createElement("a"); p.href = document.referrer; for (i=0; i<utm_set.length; i++) { if (p.hostname == utm_set[i]["host"] || p.hostname.indexOf(utm_set[i]["host"] + '.') == 0 || p.hostname.indexOf('www.' + utm_set[i]["host"] + '.') == 0) { return utm_set[i]["args"]; } } return null;}
            function fixedEncodeURIComponent(str) {return encodeURIComponent(str).replace(/[!'()*]/g, function (c) { return "%" + c.charCodeAt(0).toString(16); });}
            function get_jhash(b) {var x = 123456789;var i = 0; var k = 0;for (i = 0; i < 1677696; i++) {x = ((x + b) ^ (x + (x % 3) + (x % 17) + b) ^ i) % 16776960;if (x % 117 == 0) { k = (k + 1) % 1111; }}return k;}
            function get_param(store, type, id){ var o = document.cookie.split(';');var p = undefined;for (var i=0; i<o.length; i++){if (o[i].indexOf(store) != -1){var a=o[i].split('=');if (a.length > 1){var q = a[1].split(',');if (q.length > id){p = q[id];}}}} if (p == undefined){if (type == "int"){return 0;}if (type == "str"){return "";}}if (type == "int"){return parseInt(p);}return p+"";}
            function get_utm_medium(){var mediums = { "organic": ["yandex", "google", "bing", "search.yahoo", "yahoo"], "referral": null };var m, a, v, f = 0;var p = document.createElement("a"); p.href = document.referrer;for (m in mediums) {a = mediums[m];if (a == null) { break; }f = 0;for (var i = 0; i < a.length; i++) {v = a[i];if (p.hostname.indexOf(v + '.') == 0 || p.hostname.indexOf('www.' + v + '.') == 0){ f = 1; break; }}if (f === 1) { break; }}return m;}function mini_hostname(hostname, medium){if (hostname == undefined || hostname == ""){return hostname;}hostname = hostname.replace("www.", "");if (medium == "organic"){if (get_param("__js_p_", "int", 3) == 1){hostname = hostname.split(".")[0];}}return hostname;}
            function construct_utm_uri(disable_utm) {var p = document.createElement("a");p.href = document.referrer;if (p.href == "") { return window.location.href; }
                var ref = p.hostname.replace("www.", "");
                var loc = window.location.hostname.replace("www.", "");
                if (loc == ref)
                { return window.location.href; }
                if (disable_utm == 1)
                { return window.location.href; }
                if (window.location.href.indexOf("utm_") != -1 || window.location.href.indexOf("gclid=") != -1 || window.location.href.indexOf("yclid=") != -1)
                { return window.location.href; }
                var uri = window.location.href;
                if (uri.indexOf("?") != -1) {
                    uri += "&";
                } else {
                    uri += "?";
                }
                var medium = get_utm_medium();
                var hostname = mini_hostname(p.hostname, medium);
                var args = setup_utm();
                if (args != null){
                    uri += args;
                } else {
                    uri += "utm_source=" + hostname + "&utm_medium=" + medium + "&utm_campaign=" + hostname + "&utm_referrer=" + hostname;
                }
                
                return uri;
            }
            setTimeout(function () {
                var code = get_param("__js_p_", "int", 0);
                var age = get_param("__js_p_", "int", 1);
                var sec = get_param("__js_p_", "int", 2);
                var disable_utm = get_param("__js_p_", "int", 4);
                var jhash = get_jhash(code);
                document.cookie = "__jhash_=" + jhash + ";max-age=" + age + "; " + (sec ? "SameSite=None;Secure;" : "") + " Path=/";
                document.cookie = "__jua_=" + fixedEncodeURIComponent(navigator.userAgent) + ";max-age=" + age + "; " + (sec ? "SameSite=None;Secure;" : "") + " Path=/";
                window.location.href = construct_utm_uri(disable_utm);
                if (window.location.hash){
                    window.location.reload();
                }
            }, 1 * 1000);
        