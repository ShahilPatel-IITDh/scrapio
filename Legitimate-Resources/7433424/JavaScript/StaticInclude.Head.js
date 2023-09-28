  // Start Kampyle Exit-Popup Code

        var k_push_vars = {
            "display_after_on_page": 120,
            "display_after": 0,
            "view_percentage": 30,
            "popup_font_color": "#000000",
            "popup_background": "#ffffff",
            "popup_separator": "#E8DFE9",
            "header": "Your feedback is important to us!",
            "question": "Would you be willing to give us a short (1 minute) feedback?",
            "footer": "Thank you for helping us improve our website",
            "remind": "Remind me later",
            "remind_font_color": "#3882C3",
            "yes": "Yes",
            "no": "No",
            "text_direction": "ltr",
            "images_dir": "http://cf.kampyle.com/",
            "yes_background": "#76AC78",
            "no_background": "#8D9B86",
            "site_code": 8166289
        }

        // End Kampyle Exit-Popup Code

        // OPTIMOST GLOBAL HEAD CODE V2.23 - Copyright 2002-2011 Autonomy Optimost
	    
//	    var opLiveUrl = 'es/1600/c/2/u/bsi_com_live.js';
//	    var opQaUrl = 'es/1600/c/2/u/bsi_com_staging.js';
//	    var opCDomain = 'bsigroup.com';  // Optional ? set to base domain in which experiments will run
//	    var optimost = { A: {}, C: {}, D: document, L: document.location, M: [], Q: {}, T: new Date(), U: '', V: '2.7', Enabled: true, ST: "script", SA:
//	        { "type": "text/javascript" }, I: function () {
//	            var s = this.L.search; var c = this.D.cookie; if (s.length > 3) {
//	                                                              for (var a = s.substring(1)
//    	                                                              .split("&"), i = 0, l = a.length; i < l; i++) {
//	                                                                  var p = a[i].indexOf("="); if (p > 0) this.Q[a[i].substring(0, p)] = unescape(a[i].substring(
//	                                                                      p + 1));
//	                                                              } 
//	                                                          } if (c.length > 3) {
//	                                                                for (var a = c.split(";"), i = 0, b = a.length; i < b; i++) {
//	                                                                    var v = a[i].split("="); while (v[0].substring(0,
//	                                                                        1) == " ") v[0] = v[0].substring(1, v[0].length); if (v.length == 2) this.C[v[0]] = unescape(v[1]);
//	                                                                } 
//	                                                            } 
//	        }, B: function () {
//	            var n; this.A = {
//	            }; var _o = this; this.A.D_ts = Math.round(_o.T.getTime() / 1000); this.A.D_tzo = _o.T.getTimezoneOffset(); this.A.D_loc = _o.L.protocol +
//    	            "//" + _o.L.hostname + _o.L.pathname; this.A.D_ckl = _o.D.cookie.length; this.A.D_ref = _o.D.referrer; if (typeof optrial == "object")
//    	                for (n in optrial) this.A[n] = optrial[n]; for (n in this.Q) this.A[n] = this.Q[n]; for (n in this.C) if (n.substring(0, 2) == "op") this.A[n] =
//        	                this.C[n];
//	        }, S: function () {
//	            var q = ''; for (var n in this.A) if (this.A[n] != null && this.A[n] != "") q += (q.length > 0 ? "&" : (this.U.indexOf(
//	                "?") > 0 ? "&" : "?")) + n + "=" + escape(this.A[n]); return this.U + q;
//	        }, SC: function (n, v, e, d) {
//	            var de = new Date(); de.setTime(de.getTime() +
//	                e * 1000); this.D.cookie = n + "=" + escape(v) + ((e == null) ? "" : ("; expires=" + de.toGMTString())) + "; path=/" + ((d == null) ? "" : (";domain=" + d))
//	        }, SLD: function () {
//	            var sld = this.D.domain; var dp = sld.split("."); var l = dp.length; if (l < 2) sld = null; else if (!isNaN(dp[l - 1]) && !isNaN(
//	                dp[l - 2])) sld = null; else sld = "." + dp[l - 2] + "." + dp[l - 1]; return sld;
//	        }, R: function (r, c, d, e) {
//	            if (this.Enabled) {
//	                var b = true; if (r < 1000) {
//	                                  b = (Math.floor(Math.random() * 1000) < r); if (c != null) {
//	                                                                                  if (this.C[c] != null) b = (this.C[c] != "mvt-no"); else this.SC(c, b ? "mvt-yes" : "mvt-no",
//	                                                                                      e, d);
//	                                                                              } 
//	                              } if (b) {
//	                                    var t = '<' + this.ST + ' src="' + this.S() + '"'; for (n in this.SA) t += (" " + n + '="' + this.SA[n] + '"'); t += '><\/' + this.ST + '>';
//	                                    this.D.write(t);
//	                                } 
//	            } 
//	        }, addModule: function (s, f) { this.M[s] = f; }, displayModule: function (s) { if (typeof this.M[s] == "function") this.M[s](); },
//	        hasModules: function () { return count(this.M) > 0; } 
//	    }; optimost.I(); optrial = (typeof optrial == 'object') ? optrial : new Object; opcounter = (
//	        typeof opcounter == 'object') ? opcounter : new Object; var _opF = function (s) {
//	            var p = optimost.L.protocol; return p + ((p == 'http:') ?
//	                '//by.optimost.com/' : '//by.essl.optimost.com/by/') + s
//	        }; function OpExperiment(u, m) {
//	            if (typeof u != 'string') this.url = ''; else {
//	                if (
//	                    u.match(/trial\//)) { u = u.substring(u.indexOf('trial/')); this.url = _opF(u) } else this.url = ''
//	            } if (typeof m == 'string') {
//	                  this.modules = [];
//	                  this.modules.push(m)
//	              } else if (typeof m == 'object') this.modules = m; this.enabled = true; this.ratio = 1000; this.cookieName = null; this.domain =
//    	              null; this.expiry = null; this.hideCSS = ''; this.showCSS = ''; this.trialCodeLow = false; this.run = _opRunE; this.attribute = function () { }; this.dMs =
//        	              function () { for (var _i = 0; _i < this.modules.length; _i++) optimost.displayModule(this.modules[_i]) } 
//	        } function _opRunE(p) {
//	            if (this.url != '' &&
//    	            optimost.Enabled) {
//	                if ((!this.trialCodeLow && (typeof p != 'string' || p != 'low')) || (this.trialCodeLow && p == 'low')) {
//	                    this.attribute(); var _o =
//	                        optimost; _o.U = this.url; _o.B(); if (this.enabled) _o.R(this.ratio, this.cookieName, this.domain, this.expiry)
//	                } else if (this.hideCSS != '' &&
//    	                (typeof p != 'string' || p != 'low')) {
//	                    document.write("<style>" + this.hideCSS + "</style>"); if (this.showCSS == '') this.showCSS =
//    	                    this.hideCSS.replace(/display(\s+)?\:(\s+)?none/g, 'display:block !important').replace(/visibility(\s+)?\:(\s+)?hidden/g,
//    	                        'visibility:visible !important')
//	                } if (typeof _opEs == 'undefined') window._opEs = []; if (p != 'low') _opEs.push(this)
//	            } 
//	        } function OpCounter(u) {
//	            if (typeof u != 'string') this.url = ''; else {
//	                if (u.match(/counter\//)) { u = u.substring(u.indexOf('counter/')); this.url = _opF(u); } else
//	                    this.url = '';
//	            } this.enabled = true; this.attribute = function () { }; this.add = function () {
//	                if (typeof _opCs == 'undefined') window._opCs = [];
//	                _opCs.push(this)
//	            }; this.run = function () {
//	                if (this.url != '' && optimost.Enabled) {
//	                    this.attribute(); var _o = optimost; _o.U = this.url; var 
//	                        _ot = optrial; optrial = opcounter; _o.B(); optrial = _ot; var t = '<' + _o.ST + ' src="' + _o.S() + '"'; for (n in _o.SA) t += (" " + n + '="' + _o.SA[n] + '"');
//	                    t += '><\/' + _o.ST + '>'; if (this.enabled) _o.D.write(t)
//	                } 
//	            }; this.add()
//	        } function opGetC(cN) {
//	            if (typeof optimost == 'object') {
//	                for (n in
//	                    optimost.C) if (n == cN) return optimost.C[n]
//	            } return null
//	        } function opSetC(n, v, d) {
//	            document.cookie = n + "=" + escape(v) + ";path=/" + ((d == null) ?
//	                "" : (";domain=" + d))
//	        } function opGetDm() {
//	            if (typeof opCDomain == 'string' && document.domain.indexOf(opCDomain) != -1) return opCDomain; else
//	                return null
//	        } var opTUrl = optimost.L.toString(); var opD = ((opTUrl.split('//')[0] != 'http:') ? 'https://by.essl' : 'http://es') +
//    	        '.optimost.com/'; opLiveUrl = opD + opLiveUrl.substring(opLiveUrl.indexOf('es/')); opQaUrl = opD + opQaUrl.substring(opQaUrl.indexOf('es/'));
//    	        var opJsUrl = opQaUrl; if (opIsLive == true) { opJsUrl = opLiveUrl } if (opTUrl.indexOf('opglobalqa=true') != -1) {
//    	                                                                                 opSetC('opglobalqa', 'true',
//    	                                                                                     opGetDm()); var opGQa = true
//    	                                                                             } else if (opTUrl.indexOf('opglobalqa=false') != -1) { opSetC('opglobalqa', 'false', opGetDm()); var opGQa = false }
//    	                                                                             else var opGQa = (opGetC('opglobalqa') == 'true'); if (opGQa) opJsUrl = opQaUrl; var opDs = Math.round(optimost.T.getTime() / (3600000 * 24));
//    	                                                                             document.write('<' + 'script type="text/javascript" src="' + opJsUrl + '?D_ds=' + opDs + '"></' + 'script>\n');

	// END OPTIMOST GLOBAL HEAD CODE