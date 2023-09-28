/* global pysOptions */

// https://bitbucket.org/pixelyoursite/pys_pro_7/issues/7/possible-ie-11-error
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n â‰¥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        }
    });
}

if (!String.prototype.trim) {
    (function () {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    })();
}

! function ($, options) {

    if (options.debug) {
        console.log('PYS:', options);
    }



    var dummyPinterest = function () {

        /**
         * Public API
         */
        return {
            tag: function() {
                return "pinterest";
            },
            isEnabled: function () {},

            disable: function () {},

            loadPixel: function () {},

            fireEvent: function (name, data) {
                return false;
            },

            onAdSenseEvent: function (event) {},

            onClickEvent: function (params) {},

            onWatchVideo: function (params) {},

            onCommentEvent: function (event) {},

            onFormEvent: function (params) {},

            onDownloadEvent: function (params) {},



            onWooAddToCartOnButtonEvent: function (product_id) {},

            onWooAddToCartOnSingleEvent: function (product_id, qty, product_type, is_external, $form) {},

            onWooRemoveFromCartEvent: function (cart_item_hash) {},

            onWooAffiliateEvent: function (product_id) {},

            onWooPayPalEvent: function (event) {},

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {},

            onEddRemoveFromCartEvent: function (item) {},

            onPageScroll: function (event) {},
            onTime: function (event) {

            },

        }

    }();

    var dummyBing = function () {

        /**
         * Public API
         */
        return {
            tag: function() {
                return "bing";
            },
            isEnabled: function () {},

            disable: function () {},

            loadPixel: function () {},

            fireEvent: function (name, data) {
                return false;
            },

            onAdSenseEvent: function (event) {},

            onClickEvent: function (params) {},

            onWatchVideo: function (params) {},

            onCommentEvent: function (event) {},

            onFormEvent: function (params) {},

            onDownloadEvent: function (params) {},


            onWooAddToCartOnButtonEvent: function (product_id) {},

            onWooAddToCartOnSingleEvent: function (product_id, qty, product_type, is_external, $form) {},

            onWooRemoveFromCartEvent: function (cart_item_hash) {},

            onWooAffiliateEvent: function (product_id) {},

            onWooPayPalEvent: function (event) {},

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {},

            onEddRemoveFromCartEvent: function (item) {},
            onPageScroll: function (event) {},
            onTime: function (event) {

            },
        }

    }();

    var Utils = function (options) {


        var Pinterest = dummyPinterest;

        var Bing = dummyBing;

        var gtag_loaded = false;
        let isNewSession = checkSession();


        function loadPixels() {

            if (!options.gdpr.all_disabled_by_api) {
                if (!options.gdpr.tiktok_disabled_by_api) {
                    TikTok.loadPixel();
                }

                if (!options.gdpr.facebook_disabled_by_api) {
                    Facebook.loadPixel();
                }

                if (!options.gdpr.analytics_disabled_by_api) {
                    Analytics.loadPixel();
                }

                if (!options.gdpr.google_ads_disabled_by_api) {
                    GAds.loadPixel();
                }

                if (!options.gdpr.pinterest_disabled_by_api) {
                    Pinterest.loadPixel();
                }

                if (!options.gdpr.bing_disabled_by_api) {
                    Bing.loadPixel();
                }

            }
            if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {
                if (typeof CS_Data.cs_google_analytics_consent_mode !== "undefined" && CS_Data.cs_google_analytics_consent_mode == 1) {
                    Analytics.loadPixel();
                }

                if (typeof CS_Data.cs_google_ads_consent_mode !== "undefined" && CS_Data.cs_google_ads_consent_mode == 1 ) {
                    GAds.loadPixel();
                }
            }


        }

        /**
         * WATCHVIDEO UTILS
         */

        function isJSApiAttrEnabled(url) {
            return url.indexOf('enablejsapi') > -1;
        }

        function isOriginAttrEnabled(url) {
            return url.indexOf('origin') > -1;
        }

        // Returns key/value pairs of percentages: number of seconds to achieve
        function getVideoCompletionMarks(duration) {

            var marks = {};
            var points = [0, 10, 50, 90, 100];

            for (var i = 0; i < points.length; i++) {

                var _point = points[i];
                var _mark = _point + '%';
                var _time = duration * _point / 100;

                if (_point === 100) {
                    _time = _time - 1;
                }

                // 10% => 123
                marks[_mark] = Math.floor(_time);

            }

            return marks;

        }

        // Determine if the element is a YouTube video or not
        function tagIsYouTubeVideo(tag) {
            var src = tag.src || '';
            return src.indexOf('youtube.com/embed/') > -1 || src.indexOf('youtube.com/v/') > -1;
        }

        function tagIsYouTubeAsyncVideo(tag) {
            if(tag.src && tag.src.indexOf("data:image") !== -1) return false; // video is loaded
            var keys = Object.keys(tag.dataset);
            for(var i = 0;i<keys.length;i++) {
                if(keys[i].toLowerCase().indexOf("src") > -1) {
                    var src = tag.dataset[keys[i]];
                    return src.indexOf('youtube.com/embed/') > -1 || src.indexOf('youtube.com/v/') > -1;
                }
            }
            return false; //not find src
        }

        // Turn embed objects into iframe objects and ensure they have the right parameters
        function normalizeYouTubeIframe(tag) {

            var loc = window.location;
            var a = document.createElement('a');
            a.href = tag.src;
            a.hostname = 'www.youtube.com';
            a.protocol = loc.protocol;
            var tmpPathname = a.pathname.charAt(0) === '/' ? a.pathname : '/' + a.pathname; // IE10 shim

            if (!isJSApiAttrEnabled(a.search)) {
                a.search = (a.search.length > 0 ? a.search + '&' : '') + 'enablejsapi=1';
            }

            // for security reasons, YouTube wants an origin parameter set that matches our hostname
            if (!isOriginAttrEnabled(a.search) && loc.hostname.indexOf('localhost') === -1) {

                var port = loc.port ? ':' + loc.port : '';
                var origin = loc.protocol + '%2F%2F' + loc.hostname + port;

                a.search = a.search + '&origin=' + origin;

            }

            if (tag.type === 'application/x-shockwave-flash') {

                var newIframe = document.createElement('iframe');
                newIframe.height = tag.height;
                newIframe.width = tag.width;
                tmpPathname = tmpPathname.replace('/v/', '/embed/');

                tag.parentNode.parentNode.replaceChild(newIframe, tag.parentNode);

                tag = newIframe;

            }

            a.pathname = tmpPathname;

            if (tag.src !== a.href + a.hash) {
                tag.src = a.href + a.hash;
            }

            return tag;

        }

        // Add event handlers for events emitted by the YouTube API
        function addYouTubeEvents(iframe) {

            var player = YT.get(iframe.id);

            if (!player) {
                player = new YT.Player(iframe, {});
            }

            if (typeof iframe.pauseFlag === 'undefined') {

                iframe.pauseFlag = false;
                player.addEventListener('onStateChange', function (evt) {
                    onYouTubePlayerStateChange(evt, iframe);
                });

            }

        }

        function addDynYouTubeVideos(el) {
            // We only bind to iFrames with a YouTube URL with the enablejsapi=1 and
            // origin=<<hostname>> parameters
            if (el.tagName === 'IFRAME'
                && tagIsYouTubeVideo(el)
                && isJSApiAttrEnabled(el.src)
                && isOriginAttrEnabled(el.src))
            {
                addYouTubeEvents(el);
            }
        }

        // Event handler for events emitted from the YouTube API
        function onYouTubePlayerStateChange(evt, iframe) {

            var stateIndex = evt.data;
            var player = evt.target;
            var targetVideoUrl = player.getVideoUrl();
            var targetVideoId = targetVideoUrl.match(/[?&]v=([^&#]*)/)[1]; // Extract the ID
            var playerState = player.getPlayerState();
            var marks = getVideoCompletionMarks(player.getDuration());

            iframe.playTracker = iframe.playTracker || {};

            if (playerState === YT.PlayerState.PLAYING && !iframe.timer) {

                clearInterval(iframe.timer);

                // check every second to see if we've hit any of our percentage viewed marks
                iframe.timer = setInterval(function () {
                    checkYouTubeCompletion(player, marks, iframe.videoId);
                }, 1000);

            } else {

                clearInterval(iframe.timer);
                iframe.timer = false;

            }

            // playlist edge-case handler
            if (stateIndex === YT.PlayerState.PLAYING) {
                iframe.playTracker[targetVideoId] = true;
                iframe.videoId = targetVideoId;
                iframe.pauseFlag = false;
            }

            if (!iframe.playTracker[iframe.videoId]) {
                return false; // this video hasn't started yet, so this is spam
            }

            if (stateIndex === YT.PlayerState.PAUSED) {

                if (!iframe.pauseFlag) {
                    iframe.pauseFlag = true;
                } else {
                    return false; // we don't want to fire consecutive pause events
                }

            }

        }

        // Trigger event if YouTube video mark was reached
        function checkYouTubeCompletion(player, marks, videoId) {

            var currentTime = player.getCurrentTime();

            player[videoId] = player[videoId] || {};

            for (var key in marks) {

                if (marks[key] <= currentTime && !player[videoId][key]) {
                    player[videoId][key] = true;

                    var data = player.getVideoData();

                    if (key === '0%') {
                        key = 'play';
                    }

                    var params = {
                        video_type: 'youtube',
                        video_id: videoId,
                        video_title: data.title,
                    };

                    // Auto
                    if(options.automatic.enable_video
                        && options.automatic.enable_youtube
                        && options.dynamicEvents.hasOwnProperty("automatic_event_video")
                    ) {
                        var pixels = Object.keys(options.dynamicEvents.automatic_event_video);

                        for (var i = 0; i < pixels.length; i++) {
                            var event = Utils.clone(options.dynamicEvents.automatic_event_video[pixels[i]]);
                            event.params["progress"] = key
                            Utils.copyProperties(params, event.params)
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onWatchVideo(event);
                        }
                    }

                    if(key == "play") {

                        $.each(options.triggerEventTypes, function (triggerType, events) {
                            $.each(events, function (eventId, triggers) {
                                switch (triggerType) {
                                    case 'video_play':
                                        Utils.fireTriggerEvent(eventId);
                                        break;
                                }

                            });
                        });
                    }

                }

            }

        }

        // Determine if the element is a Vimeo video or not
        function tagIsVimeoVideo(tag) {
            var src = tag.src || '';
            return src.indexOf('player.vimeo.com/video/') > -1;
        }

        function tagIsAsincVimeoVideo(tag) {
            if(tag.src) return false; // video is loaded
            var keys = Object.keys(tag.dataset);
            for(var i = 0;i<keys.length;i++) {
                if(keys[i].toLowerCase().indexOf("src") > -1) {
                    var src = tag.dataset[keys[i]];
                    return src.indexOf('player.vimeo.com/video/') > -1;
                }
            }
            return false; //not find src
        }

        function attachVimeoPlayerToTag(tag) {
            var player = new Vimeo.Player(tag);

            player.getDuration().then(function (pl,seconds) {
                pl.pysMarks = getVideoCompletionMarks(seconds);
            }.bind(null,player));

            player.getVideoTitle().then(function (pl,title) {
                pl.pysVideoTitle = title;
            }.bind(null,player));

            player.getVideoId().then(function (pl,id) {
                pl.pysVideoId = id;
            }.bind(null,player));

            player.pysCompletedMarks = {};

            player.on('play', function () {

                if (this.pysTimer) {
                    return;
                }

                clearInterval(this.pysTimer);

                var player = this;

                this.pysTimer = setInterval(function () {
                    checkVimeoCompletion(player);
                }, 1000);

            });

            player.on('pause', function () {
                clearInterval(this.pysTimer);
                this.pysTimer = false;
            });

            player.on('ended', function () {
                clearInterval(this.pysTimer);
                this.pysTimer = false;
            });
        }

        // Trigger event if Vimeo video mark was reached
        function checkVimeoCompletion(player) {

            player.getCurrentTime().then(function (seconds) {

                for (var key in player.pysMarks) {

                    if (player.pysMarks[key] <= seconds && !player.pysCompletedMarks[key]) {

                        player.pysCompletedMarks[key] = true;

                        if (key === '0%') {
                            key = 'play';
                        }

                        var params = {
                            video_type: 'vimeo',
                            video_id: player.pysVideoId,
                            video_title: player.pysVideoTitle,
                        };

                        // Auto
                        if(options.automatic.enable_video
                            && options.automatic.enable_vimeo
                            && options.dynamicEvents.hasOwnProperty("automatic_event_video")
                        ) {
                            var pixels = Object.keys(options.dynamicEvents.automatic_event_video);

                            for (var i = 0; i < pixels.length; i++) {
                                var event = Utils.clone(options.dynamicEvents.automatic_event_video[pixels[i]]);
                                event.params["progress"] = key
                                Utils.copyProperties(params, event.params,);
                                Utils.copyProperties(Utils.getRequestParams(), event.params);
                                getPixelBySlag(pixels[i]).onWatchVideo(event);
                            }
                        }

                        if(key == "play") {
                            $.each(options.triggerEventTypes, function (triggerType, events) {
                                $.each(events, function (eventId, triggers) {
                                    switch (triggerType) {
                                        case 'video_play':
                                            Utils.fireTriggerEvent(eventId);
                                            break;
                                    }

                                });
                            });
                        }
                    }

                }

            });

        }

        /**
         * COOKIES UTILS
         */

        var utmTerms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content' ,'utm_term'];
        var utmId = ['fbadid', 'gadid', 'padid', 'bingid'];
        var requestParams = [];


        function getDomain(url) {

            url = url.replace(/(https?:\/\/)?(www.)?/i, '');

            if (url.indexOf('/') !== -1) {
                return url.split('/')[0];
            }

            return url;
        }

        function checkSession() {
            let duration = options.last_visit_duration * 60000
            if( Cookies.get('pys_start_session') === undefined ||
                Cookies.get('pys_session_limit') === undefined) {
                var now = new Date();
                now.setTime(now.getTime() + duration);
                Cookies.set('pys_session_limit', true,{ expires: now })
                Cookies.set('pys_start_session', true)
                return true
            }
            return false

        }

        function getTrafficSource() {

            try {

                let referrer = document.referrer.toString(),
                    source;

                let direct = referrer.length === 0;
                let internal = direct ? false : referrer.indexOf(options.siteUrl) === 0;
                let external = !direct && !internal;

                if (external === false) {
                    source = 'direct';
                } else {
                    source = referrer;
                }

                if (source !== 'direct') {
                    // leave only domain (Issue #70)
                    return getDomain(source);
                } else {
                    return source;
                }

            } catch (e) {
                console.error(e);
                return 'direct';
            }

        }

        /**
         * Return query variables object with where property name is query variable
         * and property value is query variable value.
         */
        function getQueryVars() {

            try {

                var result = {},
                    tmp = [];

                window.location.search
                    .substr(1)
                    .split("&")
                    .forEach(function (item) {

                        tmp = item.split('=');

                        if (tmp.length > 1) {
                            result[tmp[0]] = tmp[1];
                        }

                    });

                return result;

            } catch (e) {
                console.error(e);
                return {};
            }

        }

        function getLandingPageValue() {
            let name = "pys_landing_page"
            if(options.visit_data_model === "last_visit") {
                name = "last_pys_landing_page"
            }
            if(Cookies.get(name) === 'undefined') {
                return "";
            } else {
                return Cookies.get(name);
            }
        }
        function getTrafficSourceValue() {
            let name = "pysTrafficSource"
            if(options.visit_data_model === "last_visit") {
                name = "last_pysTrafficSource"
            }
            if(Cookies.get(name) === 'undefined') {
                return "";
            } else {
                return Cookies.get(name);
            }
        }

        function getUTMId(useLast = false) {
            try {
                let cookiePrefix = 'pys_'
                let terms = [];
                if (useLast) {
                    cookiePrefix = 'last_pys_'
                }
                $.each(utmId, function (index, name) {
                    if (Cookies.get(cookiePrefix + name)) {
                        terms[name] = Cookies.get(cookiePrefix + name)
                    }
                });
                return terms;
            } catch (e) {
                console.error(e);
                return [];
            }
        }
        /**
         * Return UTM terms from request query variables or from cookies.
         */
        function getUTMs(useLast = false) {

            try {
                let cookiePrefix = 'pys_'
                if(useLast) {
                    cookiePrefix = 'last_pys_'
                }
                let terms = [];
                $.each(utmTerms, function (index, name) {
                    if (Cookies.get(cookiePrefix + name)) {
                        let value = Cookies.get(cookiePrefix + name);
                        terms[name] = filterEmails(value); // do not allow email in request params (Issue #70)
                    }
                });

                return terms;

            } catch (e) {
                console.error(e);
                return [];
            }

        }

        function getDateTime() {
            var dateTime = new Array();
            var date = new Date(),
                days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                hours = ['00-01', '01-02', '02-03', '03-04', '04-05', '05-06', '06-07', '07-08',
                    '08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17',
                    '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'
                ];
            dateTime.push(hours[date.getHours()]);
            dateTime.push(days[date.getDay()]);
            dateTime.push(months[date.getMonth()]);
            return dateTime;
        }

        function filterEmails(value) {
            return Utils.validateEmail(value) ? undefined : value;
        }

        /**
         * PUBLIC API
         */
        return {

            PRODUCT_SIMPLE : 0,
            PRODUCT_VARIABLE : 1,
            PRODUCT_BUNDLE : 2,
            PRODUCT_GROUPED : 3,

            validateEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
             fireEventForAllPixel:function(functionName,events){
                if (events.hasOwnProperty(Facebook.tag()))
                    Facebook[functionName](events[Facebook.tag()]);
                if (events.hasOwnProperty(Analytics.tag()))
                    Analytics[functionName](events[Analytics.tag()]);
                if (events.hasOwnProperty(GAds.tag()))
                    GAds[functionName](events[GAds.tag()]);
                if (events.hasOwnProperty(Pinterest.tag()))
                    Pinterest[functionName](events[Pinterest.tag()]);
                if (events.hasOwnProperty(Bing.tag()))
                    Bing[functionName](events[Bing.tag()]);
                 if (events.hasOwnProperty(TikTok.tag()))
                     TikTok[functionName](events[TikTok.tag()]);
            },

            getQueryValue:function (name){
                return getQueryVars()[name];
            },

            filterEmails: function (value) {
                return filterEmails(value);
            },

            setupPinterestObject: function () {
                Pinterest = window.pys.Pinterest || Pinterest;
                return Pinterest;
            },

            setupBingObject: function () {
                Bing = window.pys.Bing || Bing;
                return Bing;
            },

            // Clone all object members to another and return it
            copyProperties: function (from, to) {
                for (var key in from) {
                    if("function" == typeof from[key]) {
                        continue;
                    }
                    to[key] = from[key];
                }
                return to;
            },

            clone: function(obj) {
                var copy;

                // Handle the 3 simple types, and null or undefined
                if (null == obj || "object" != typeof obj) return obj;

                // Handle Date
                if (obj instanceof Date) {
                    copy = new Date();
                    copy.setTime(obj.getTime());
                    return copy;
                }

                // Handle Array
                if (obj instanceof Array) {
                    copy = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        if("function" == typeof obj[i]) {
                            continue;
                        }
                        copy[i] = Utils.clone(obj[i]);
                    }
                    return copy;
                }

                // Handle Object
                if (obj instanceof Object) {
                    copy = {};
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) {
                            if("function" == typeof obj[attr]) {
                                continue;
                            }
                            copy[attr] = Utils.clone(obj[attr]);
                        }
                    }
                    return copy;
                }

                return obj;
            },

            // Returns array of elements with given tag name
            getTagsAsArray: function (tag) {
                return [].slice.call(document.getElementsByTagName(tag));
            },

            /**
             * Load and initialize YouTube API
             *
             * @link: https://developers.google.com/youtube/iframe_api_reference
             */
            initYouTubeAPI: function () {

                // maybe load YouTube JS API
                if (typeof window.YT === 'undefined') {
                    var tag = document.createElement('script');
                    tag.src = '//www.youtube.com/iframe_api';
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }

                // initialize when API is ready
                window.onYouTubeIframeAPIReady = function () {

                    // collect all possible YouTube tags
                    var potentialVideos = Utils.getTagsAsArray('iframe').concat(Utils.getTagsAsArray('embed'));

                    // turn videos into trackable videos with events
                    for (var i = 0; i < potentialVideos.length; i++) {
                        var video = potentialVideos[i];
                        if (tagIsYouTubeVideo(video)) {
                            var iframe = normalizeYouTubeIframe(video);
                            addYouTubeEvents(iframe);
                        } else {
                            if(tagIsYouTubeAsyncVideo(video)) {
                                video.addEventListener("load", function(evt) {
                                    var iframe = normalizeYouTubeIframe(evt.currentTarget);
                                    addYouTubeEvents(iframe);
                                });
                            }
                        }
                    }



                    var targets = document.querySelectorAll('.elementor-widget-video .elementor-wrapper');

                    const config = {
                        attributes: false,
                        childList: true,
                        subtree: true
                    };

                    const callback = function(mutationsList, observer) {
                        for (let mutation of mutationsList) {
                            if (mutation.type === 'childList') {
                                for(var m = 0;m<mutation.addedNodes.length;m++) {
                                    addDynYouTubeVideos(mutation.addedNodes[m]);
                                }
                            }
                        }
                    };
                    // observe elementator widget-video and add event when it add iframe
                    for(var i=0;i<targets.length;i++) {
                        const observer = new MutationObserver(callback);
                        observer.observe(targets[i], config);//maybe remove before add
                    }


                };

            },

            /**
             * Load and initialize Vimeo API
             *
             * @link: https://github.com/vimeo/player.js
             */
            initVimeoAPI: function () {

              
                $(document).ready(function () {

                    var potentialVideos = Utils.getTagsAsArray('iframe').concat(Utils.getTagsAsArray('embed'));

                    for (var i = 0; i < potentialVideos.length; i++) {
                        var tag = potentialVideos[i];
                        if (tagIsVimeoVideo(tag)) {
                            attachVimeoPlayerToTag(tag);
                        } else {
                            if (tagIsAsincVimeoVideo(tag)) {
                                tag.addEventListener("load", function(evt) {
                                    attachVimeoPlayerToTag(evt.currentTarget);
                                });
                            }
                        }
                    }

                });

            },

            manageCookies: function () {
                let expires = parseInt(options.cookie_duration); //  days
                let queryVars = getQueryVars();
                let landing = window.location.href.split('?')[0];
                try {
                    // save data for first visit
                    if(Cookies.get('pys_first_visit') === undefined) {
                        Cookies.set('pys_first_visit', true, { expires: expires });
                        Cookies.set('pysTrafficSource', getTrafficSource(), { expires: expires });
                        Cookies.set('pys_landing_page',landing,{ expires: expires });
                        $.each(utmTerms, function (index, name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('pys_' + name, queryVars[name], { expires: expires });
                            } else {
                                Cookies.remove('pys_' + name)
                            }
                        });
                        $.each(utmId,function(index,name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('pys_' + name, queryVars[name], { expires: expires });
                            } else {
                                Cookies.remove('pys_' + name)
                            }
                        })
                    }

                    // save data for last visit if it new session
                    if(isNewSession) {
                        Cookies.set('last_pysTrafficSource', getTrafficSource(), { expires: expires });
                        $.each(utmTerms, function (index, name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('last_pys_' + name, queryVars[name], { expires: expires });
                            } else {
                                Cookies.remove('last_pys_' + name)
                            }
                        });
                        $.each(utmId,function(index,name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('last_pys_' + name, queryVars[name], { expires: expires });
                            } else {
                                Cookies.remove('last_pys_' + name)
                            }
                        })
                        Cookies.set('last_pys_landing_page',landing,{ expires: expires });
                    }
                } catch (e) {
                    console.error(e);
                }
            },

            initializeRequestParams: function () {

                if (options.trackTrafficSource) {
                    requestParams.traffic_source = getTrafficSourceValue();
                }

                if (options.trackUTMs) {

                    var utms = getUTMs(options.visit_data_model === "last_visit");

                    $.each(utmTerms, function (index, term) {
                        if (term in utms) {
                            requestParams[term] = utms[term];
                        }
                    });

                }


                var dateTime = getDateTime();
                if(options.enable_event_time_param) {
                    requestParams.event_time = dateTime[0];
                }

                if(options.enable_event_day_param) {
                    requestParams.event_day = dateTime[1];
                }
                if(options.enable_event_month_param) {
                    requestParams.event_month = dateTime[2];
                }

                if(options.enable_lading_page_param){
                    requestParams.landing_page = getLandingPageValue();
                }
            },

            getRequestParams: function () {
                return requestParams;
            },

            /**
             * DOWNLOAD DOCS
             */

            getLinkExtension: function (link) {

                // Remove anchor, query string and everything before last slash
                link = link.substring(0, (link.indexOf("#") === -1) ? link.length : link.indexOf("#"));
                link = link.substring(0, (link.indexOf("?") === -1) ? link.length : link.indexOf("?"));
                link = link.substring(link.lastIndexOf("/") + 1, link.length);

                // If there's a period left in the URL, then there's a extension
                if (link.length > 0 && link.indexOf('.') !== -1) {
                    link = link.substring(link.lastIndexOf(".") + 1); // Remove everything but what's after the first period
                    return link;
                } else {
                    return "";
                }
            },

            getLinkFilename: function (link) {

                // Remove anchor, query string and everything before last slash
                link = link.substring(0, (link.indexOf("#") === -1) ? link.length : link.indexOf("#"));
                link = link.substring(0, (link.indexOf("?") === -1) ? link.length : link.indexOf("?"));
                link = link.substring(link.lastIndexOf("/") + 1, link.length);

                // If there's a period left in the URL, then there's a extension
                if (link.length > 0 && link.indexOf('.') !== -1) {
                    return link;
                } else {
                    return "";
                }
            },

            /**
             * CUSTOM EVENTS
             */

            setupMouseOverClickEvents: function (eventId, triggers) {

                // Non-default binding used to avoid situations when some code in external js
                // stopping events propagation, eg. returns false, and our handler will never called
                $(document).onFirst('mouseover', triggers.join(','), function () {

                    // do not fire event multiple times
                    if ($(this).hasClass('pys-mouse-over-' + eventId)) {
                        return true;
                    } else {
                        $(this).addClass('pys-mouse-over-' + eventId);
                    }

                    Utils.fireTriggerEvent(eventId);

                });

            },

            setupCSSClickEvents: function (eventId, triggers) {

                // Non-default binding used to avoid situations when some code in external js
                // stopping events propagation, eg. returns false, and our handler will never called
                // add event to document to support dyn class
                $(document).onFirst('click', triggers.join(','), function () {
                    Utils.fireTriggerEvent(eventId);
                });

            },

            setupURLClickEvents: function () {

                if( !options.triggerEventTypes.hasOwnProperty('url_click') ) {
                    return;
                }
                // Non-default binding used to avoid situations when some code in external js
                // stopping events propagation, eg. returns false, and our handler will never called
                $('a').onFirst('click', function (evt) {

                    var url  = $(this).attr('href');
                    if(url) {
                        $.each(options.triggerEventTypes.url_click, function (eventId, triggers) {
                            triggers.forEach(function (trigger) {
                                if(Utils.compareUrl(url,trigger.value,trigger.rule)) {
                                    Utils.fireTriggerEvent(eventId);
                                }
                            })
                        });
                    }

                });

            },

            removeUrlDomain(url) {
                if(url.indexOf("/#") > -1) {
                    url = url.substring(0, url.indexOf("/#"));
                }
                return url.replace('http://','')
                    .replace('https://','')
                    .replace('www.','')
                    .trim()
                    .replace(/^\/+/g, '')

            },

            compareUrl: function(base,url,rule){

                if(url == "*" || url == '') return true;

                base = Utils.removeUrlDomain(base)
                url = Utils.removeUrlDomain(url)

                if(rule == 'match') {
                    return url == base;
                } else {
                    return base.indexOf(url) > -1
                }

            },

            setupScrollPosEvents: function (eventId, triggers) {

                var scrollPosThresholds = {},
                    docHeight = $(document).height() - $(window).height();

                // convert % to absolute positions
                $.each(triggers, function (index, scrollPos) {

                    // convert % to pixels
                    scrollPos = docHeight * scrollPos / 100;
                    scrollPos = Math.round(scrollPos);

                    scrollPosThresholds[scrollPos] = eventId;

                });

                $(document).on("scroll",function () {

                    var scrollPos = $(window).scrollTop();

                    $.each(scrollPosThresholds, function (threshold, eventId) {

                        // position has not reached yes
                        if (scrollPos <= threshold) {
                            return true;
                        }

                        // fire event only once
                        if (eventId === null) {
                            return true;
                        } else {
                            scrollPosThresholds[threshold] = null;
                        }

                        Utils.fireTriggerEvent(eventId);

                    });

                });

            },
            setupCommentEvents : function (eventId,triggers) {
                $('form.comment-form').on("submit",function () {
                    Utils.fireTriggerEvent(eventId);
                });
            },
            /**
             * Events
             */

            isEventInTimeWindow: function (eventName, event, prefix) {

                if(event.hasOwnProperty("hasTimeWindow") && event.hasTimeWindow) {
                    var cookieName = prefix+"_"+eventName;
                    var now = new Date().getTime();

                    if(Cookies.get(cookieName) !== undefined) {

                        var lastTimeFire = Cookies.get(cookieName);
                        var fireTime = event.timeWindow * 60*60*1000;

                        if( now - lastTimeFire > fireTime) {
                            Cookies.set(cookieName,now, { expires: event.timeWindow / 24.0} );
                        } else {
                            return false;
                        }
                    } else {
                        Cookies.set(cookieName,now, { expires: event.timeWindow / 24.0} );
                    }
                }
                return true
            },

            fireTriggerEvent: function (eventId) {

                if (!options.triggerEvents.hasOwnProperty(eventId)) {
                    return;
                }

                var event = {};
                var events = options.triggerEvents[eventId];

                if (events.hasOwnProperty('facebook')) {
                    event = events.facebook;
                    if(Utils.isEventInTimeWindow(event.name,event,"dyn_facebook_"+eventId)) {
                        Facebook.fireEvent(event.name, event);
                    }
                }

                if (events.hasOwnProperty('ga')) {
                    event = events.ga;
                    if(Utils.isEventInTimeWindow(event.name,event,"dyn_ga_"+eventId)) {
                        Analytics.fireEvent(event.name, event);
                    }
                }

                if (events.hasOwnProperty('google_ads')) {
                    event = events.google_ads;
                    if(Utils.isEventInTimeWindow(event.name,event,"dyn_google_ads_"+eventId)) {
                        GAds.fireEvent(event.name, event);
                    }
                }

                if (events.hasOwnProperty('pinterest')) {
                    event = events.pinterest;
                    if(Utils.isEventInTimeWindow(event.name,event,"dyn_pinterest_"+eventId)) {
                        Pinterest.fireEvent(event.name, event);;
                    }
                }

                if (events.hasOwnProperty('bing')) {
                    event = events.bing;
                    if(Utils.isEventInTimeWindow(event.name,event,"dyn_bing_"+eventId)) {
                        Bing.fireEvent(event.name, event);;
                    }
                }
                if (events.hasOwnProperty('tiktok')) {
                    event = events.tiktok;
                    if(Utils.isEventInTimeWindow(event.name,event,"dyn_bing_"+eventId)) {
                        TikTok.fireEvent(event.name, event);
                    }
                }


            },

            isFirstPurchaseFire: function ($eventName,orderId,pixel) {

                if(Cookies.get("pys_"+$eventName+"_order_id_"+pixel) == orderId) {
                    return false;
                } else {
                    Cookies.set("pys_"+$eventName+"_order_id_"+pixel, orderId, { expires: 1 });
                }
                return true;
            },

            fireStaticEvents: function (pixel) {

                if (options.staticEvents.hasOwnProperty(pixel)) {

                    $.each(options.staticEvents[pixel], function (eventId, events) {

                        //skip purchase event if this order was fired
                        if( options.woo.hasOwnProperty('woo_purchase_on_transaction') &&
                            options.woo.woo_purchase_on_transaction &&
                            (eventId === "woo_purchase" || eventId === "woo_purchase_category") ) {
                            if(!Utils.isFirstPurchaseFire(eventId,events[0].woo_order,pixel)) {
                                return;
                            }
                        }

                        if( options.edd.hasOwnProperty('edd_purchase_on_transaction') &&
                            options.edd.edd_purchase_on_transaction &&
                            (eventId === "edd_purchase" || eventId === "edd_purchase_category") ) {
                            if(!Utils.isFirstPurchaseFire(eventId,events[0].edd_order,pixel)) {
                                return;
                            }
                        }


                        $.each(events, function (index, event) {

                            event.fired = event.fired || false;

                            if (!event.fired && Utils.isEventInTimeWindow(event.name,event,'static_' + pixel+"_")) {


                                var fired = false;

                                // fire event
                                getPixelBySlag(pixel).fireEvent(event.name, event);

                                // prevent event double event firing
                                event.fired = fired;
                            }

                        });
                    });

                }
            },

            /**
             * Load tag's JS
             *
             * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/
             * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/custom-dims-mets
             */
            loadGoogleTag: function (id) {

                if (!gtag_loaded) {

                    (function (window, document, src) {
                        var a = document.createElement('script'),
                            m = document.getElementsByTagName('script')[0];
                        a.async = 1;
                        a.src = src;
                        m.parentNode.insertBefore(a, m);
                    })(window, document, '//www.googletagmanager.com/gtag/js?id=' + id);

                    window.dataLayer = window.dataLayer || [];
                    window.gtag = window.gtag || function gtag() {
                        dataLayer.push(arguments);
                    };

                    gtag('js', new Date());

                    gtag_loaded = true;

                }

            },

            /**
             * GDPR
             */

            loadPixels: function () {

                if (options.gdpr.ajax_enabled && !options.gdpr.consent_magic_integration_enabled) {

                    // retrieves actual PYS GDPR filters values which allow to avoid cache issues
                    $.get({
                        url: options.ajaxUrl,
                        dataType: 'json',
                        data: {
                            action: 'pys_get_gdpr_filters_values'
                        },
                        success: function (res) {

                            if (res.success) {

                                options.gdpr.all_disabled_by_api = res.data.all_disabled_by_api;
                                options.gdpr.facebook_disabled_by_api = res.data.facebook_disabled_by_api;
                                options.gdpr.tiktok_disabled_by_api = res.data.tiktok_disabled_by_api;
                                options.gdpr.analytics_disabled_by_api = res.data.analytics_disabled_by_api;
                                options.gdpr.google_ads_disabled_by_api = res.data.google_ads_disabled_by_api;
                                options.gdpr.pinterest_disabled_by_api = res.data.pinterest_disabled_by_api;
                                options.gdpr.bing_disabled_by_api = res.data.bing_disabled_by_api;

                            }

                            loadPixels();

                        }
                    });

                } else {
                    loadPixels();
                }

            },

            consentGiven: function (pixel) {

                /**
                 * Cookiebot
                 */
                if (options.gdpr.cookiebot_integration_enabled && typeof Cookiebot !== 'undefined') {

                    var cookiebot_consent_category = options.gdpr['cookiebot_' + pixel + '_consent_category'];

                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (Cookiebot.consented === false || Cookiebot.consent[cookiebot_consent_category]) {
                            return true;
                        }
                    } else {
                        if (Cookiebot.consent[cookiebot_consent_category]) {
                            return true;
                        }
                    }

                    return false;

                }

                /**
                 * Cookie Notice
                 */
                if (options.gdpr.cookie_notice_integration_enabled && typeof cnArgs !== 'undefined') {

                    var cn_cookie = Cookies.get(cnArgs.cookieName);

                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (typeof cn_cookie === 'undefined' || cn_cookie === 'true') {
                            return true;
                        }
                    } else {
                        if (cn_cookie === 'true') {
                            return true;
                        }
                    }

                    return false;

                }

                /**
                 * Cookie Law Info
                 */
                if (options.gdpr.cookie_law_info_integration_enabled) {

                    var cli_cookie = Cookies.get('viewed_cookie_policy');

                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (typeof cli_cookie === 'undefined' || cli_cookie === 'yes') {
                            return true;
                        }
                    } else {
                        if (cli_cookie === 'yes') {
                            return true;
                        }
                    }

                    return false;

                }

                /**
                 * ConsentMagic
                 */
                if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined" ) {

                    var test_prefix = CS_Data.test_prefix;
                    if ((typeof CS_Data.cs_google_analytics_consent_mode !== "undefined" && CS_Data.cs_google_analytics_consent_mode == 1) && pixel == 'analytics') {
                        return true;
                    }
                    if ((typeof CS_Data.cs_google_ads_consent_mode !== "undefined" && CS_Data.cs_google_ads_consent_mode == 1) && pixel == 'google_ads') {
                        return true;
                    }

                    if ( CS_Data.cs_cache_enabled == 1 ) {
                        var substring = "cs_enabled_cookie_term";
                        var theCookies = document.cookie.split(';');

                        for (var i = 1 ; i <= theCookies.length; i++) {
                            if ( theCookies[ i - 1 ].indexOf( substring ) !== -1 ) {
                                var categoryCookie = theCookies[ i - 1 ].replace( 'cs_enabled_cookie_term' + test_prefix + '_', '' );
                                categoryCookie = Number( categoryCookie.replace( /\D+/g, "" ) );
                                var cs_cookie_val = Cookies.get( 'cs_enabled_cookie_term' + test_prefix + '_' + categoryCookie );

                                if ( categoryCookie === CS_Data.cs_script_cat.facebook && pixel == 'facebook' ) {
                                    if ( cs_cookie_val == 'yes' ) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else if ( categoryCookie === CS_Data.cs_script_cat.bing && pixel == 'bing' ) {
                                    if ( cs_cookie_val == 'yes' ) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else if ( categoryCookie === CS_Data.cs_script_cat.analytics && pixel == 'analytics' ) {
                                    if ( cs_cookie_val == 'yes' ) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else if ( categoryCookie === CS_Data.cs_script_cat.gads && pixel == 'gads' ) {
                                    if ( cs_cookie_val == 'yes' ) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else if ( categoryCookie === CS_Data.cs_script_cat.pinterest && pixel == 'pinterest' ) {
                                    if ( cs_cookie_val == 'yes' ) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else if ( categoryCookie === CS_Data.cs_script_cat.tiktok && pixel == 'tiktok' ) {
                                    if ( cs_cookie_val == 'yes' ) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }
                        }
                    } else {
                        var cs_cookie = Cookies.get('cs_viewed_cookie_policy'+test_prefix);
                        if (typeof cs_cookie === 'undefined' || cs_cookie === 'yes') {
                            return true;
                        }
                    }

                    return false;

                }


                /**
                 * Real Cookie Banner
                 */
                if (options.gdpr.real_cookie_banner_integration_enabled) {
                    var consentApi = window.consentApi;
                    if (consentApi) {
                        switch (pixel) {
                            case "analytics":
                                return consentApi.consentSync("http", "_ga", "*").cookieOptIn;
                            case "facebook":
                                return consentApi.consentSync("http", "_fbp", "*").cookieOptIn;
                            case "pinterest":
                                return consentApi.consentSync("http", "_pinterest_sess", ".pinterest.com").cookieOptIn;
                            case "bing":
                                return consentApi.consentSync("http", "_uetsid", "*").cookieOptIn;
                            case "google_ads":
                                return consentApi.consentSync("http", "1P_JAR", ".google.com").cookieOptIn;
                            case 'tiktok':
                                return consentApi.consentSync("http", "tt_webid_v2", ".tiktok.com").cookieOptIn;
                            default:
                                return true;
                        }
                    }
                }

                return true;

            },

            setupGdprCallbacks: function () {

                /**
                 * Cookiebot
                 */
                if (options.gdpr.cookiebot_integration_enabled && typeof Cookiebot !== 'undefined') {

                    window.addEventListener("CookiebotOnConsentReady", function() {
                        if (Cookiebot.consent.marketing) {
                            Facebook.loadPixel();
                            Bing.loadPixel();
                            Pinterest.loadPixel();
                            GAds.loadPixel();
                            TikTok.loadPixel();
                        }
                        if (Cookiebot.consent.statistics) {
                            Analytics.loadPixel();
                        }
                        if (!Cookiebot.consent.marketing) {
                            Facebook.disable();
                            Pinterest.disable();
                            Bing.disable()
                            GAds.disable();
                            TikTok.disable();
                        }
                        if (!Cookiebot.consent.statistics) {
                            Analytics.disable();
                        }
                    });
                }

                /**
                 * Cookie Notice
                 */
                if (options.gdpr.cookie_notice_integration_enabled) {

                    $(document).onFirst('click', '.cn-set-cookie', function () {

                        if ($(this).data('cookie-set') === 'accept') {
                            Facebook.loadPixel();
                            Analytics.loadPixel();
                            GAds.loadPixel();
                            Pinterest.loadPixel();
                            Bing.loadPixel();
                            TikTok.loadPixel();
                        } else {
                            Facebook.disable();
                            Analytics.disable();
                            GAds.disable();
                            Pinterest.disable();
                            Bing.disable();
                            TikTok.disable();
                        }

                    });

                    $(document).onFirst('click', '.cn-revoke-cookie', function () {
                        Facebook.disable();
                        Analytics.disable();
                        GAds.disable();
                        Pinterest.disable();
                        Bing.disable();
                        TikTok.disable();
                    });

                }

                /**
                 * Cookie Law Info
                 */
                if (options.gdpr.cookie_law_info_integration_enabled) {

                    $(document).onFirst('click', '#cookie_action_close_header', function () {
                        Facebook.loadPixel();
                        Analytics.loadPixel();
                        GAds.loadPixel();
                        Pinterest.loadPixel();
                        Bing.loadPixel();
                        TikTok.loadPixel();
                    });

                    $(document).onFirst('click', '#cookie_action_close_header_reject', function () {
                        Facebook.disable();
                        Analytics.disable();
                        GAds.disable();
                        Pinterest.disable();
                        Bing.disable();
                        TikTok.disable();
                    });

                }

                /**
                 * ConsentMagic
                 */
                if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {
                    var test_prefix = CS_Data.test_prefix,
                        cs_refresh_after_consent = false,
                        substring = "cs_enabled_cookie_term";

                    if (CS_Data.cs_refresh_after_consent == 1) {
                        cs_refresh_after_consent = CS_Data.cs_refresh_after_consent;
                    }

                    if (!cs_refresh_after_consent) {
                        var theCookies = document.cookie.split(';');
                        for (var i = 1 ; i <= theCookies.length; i++) {
                            if (theCookies[i-1].indexOf(substring) !== -1) {
                                var categoryCookie = theCookies[i-1].replace('cs_enabled_cookie_term'+test_prefix+'_','');
                                categoryCookie = Number(categoryCookie.replace(/\D+/g,""));
                                var cs_cookie_val = Cookies.get('cs_enabled_cookie_term'+test_prefix+'_'+categoryCookie);
                                if(cs_cookie_val == 'yes') {
                                    if (categoryCookie === CS_Data.cs_script_cat.facebook) {
                                        Facebook.loadPixel();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.bing) {
                                        Bing.loadPixel();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.analytics || (typeof CS_Data.cs_google_analytics_consent_mode !== "undefined" && CS_Data.cs_google_analytics_consent_mode == 1)) {

                                        Analytics.loadPixel();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.gads || (typeof CS_Data.cs_google_ads_consent_mode !== "undefined" && CS_Data.cs_google_ads_consent_mode == 1)) {
                                        GAds.loadPixel();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.pinterest) {
                                        Pinterest.loadPixel();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.tiktok) {
                                        TikTok.loadPixel();
                                    }
                                } else {
                                    if (categoryCookie === CS_Data.cs_script_cat.facebook) {
                                        Facebook.disable();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.bing) {
                                        Bing.disable();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.analytics && (typeof CS_Data.cs_google_analytics_consent_mode == "undefined" || CS_Data.cs_google_analytics_consent_mode == 0)) {
                                        Analytics.disable();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.gads && (typeof CS_Data.cs_google_ads_consent_mode == "undefined" || CS_Data.cs_google_ads_consent_mode == 0)) {
                                        GAds.disable();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.pinterest) {
                                        Pinterest.disable();
                                    }

                                    if (categoryCookie === CS_Data.cs_script_cat.tiktok) {
                                        TikTok.disable();
                                    }
                                }
                                if (Cookies.get('cs_enabled_advanced_matching') == 'yes') {
                                    Facebook.loadPixel();
                                }
                            }
                        }

                        $(document).on('click','.cs_action_btn',function(e) {
                            e.preventDefault();
                            var elm = $(this),
                                button_action = elm.attr('data-cs_action');

                            if(button_action === 'allow_all') {
                                Facebook.loadPixel();
                                Bing.loadPixel();
                                Analytics.loadPixel();
                                GAds.loadPixel();
                                Pinterest.loadPixel();
                                TikTok.loadPixel();
                            } else if(button_action === 'disable_all') {

                                Facebook.disable();
                                Bing.disable();
                                if(CS_Data.cs_google_analytics_consent_mode == 0 || typeof CS_Data.cs_google_analytics_consent_mode == "undefined")
                                {
                                    Analytics.disable();
                                }
                                if(CS_Data.cs_google_ads_consent_mode == 0 || typeof CS_Data.cs_google_ads_consent_mode == "undefined")
                                {
                                    GAds.disable();
                                }
                                Pinterest.disable();
                                TikTok.disable();
                            }
                        });
                    }
                }

                /**
                 * Real Cookie Banner
                 */
                if (options.gdpr.real_cookie_banner_integration_enabled) {
                    var consentApi = window.consentApi;
                    if (consentApi) {
                        consentApi.consent("http", "_ga", "*")
                            .then(Analytics.loadPixel.bind(Analytics), Analytics.disable.bind(Analytics));

                        consentApi.consent("http", "_fbp", "*")
                            .then(Facebook.loadPixel.bind(Facebook), Facebook.disable.bind(Facebook));

                        consentApi.consent("http", "_pinterest_sess", ".pinterest.com")
                            .then(Pinterest.loadPixel.bind(Pinterest), Pinterest.disable.bind(Pinterest));

                        consentApi.consent("http", "_uetsid", "*")
                            .then(Bing.loadPixel.bind(Bing), Bing.disable.bind(Bing));

                        consentApi.consent("http", "1P_JAR", ".google.com")
                            .then(GAds.loadPixel.bind(GAds), GAds.disable.bind(GAds));
                        consentApi.consent("http", "tt_webid_v2", ".tiktok.com")
                            .then(TikTok.loadPixel.bind(GAds), TikTok.disable.bind(GAds));
                    }
                }

            },

            /**
             * Enrich
             */
            isCheckoutPage: function () {
                return $('body').hasClass('woocommerce-checkout') ||
                    $('body').hasClass('edd-checkout');
            },
            addCheckoutFields : function() {
                var utm = "";
                var utms = getUTMs()
                $.each(utmTerms, function (index, name) {
                    if(index > 0) {
                        utm+="|";
                    }
                    utm+=name+":"+utms[name];
                });
                var utmIdList = "";
                var utmsIds = getUTMId()
                $.each(utmId, function (index, name) {
                    if(index > 0) {
                        utmIdList+="|";
                    }
                    utmIdList+=name+":"+utmsIds[name];
                });
                var utmIdListLast = "";
                var utmsIdsLast = getUTMId(true)
                $.each(utmId, function (index, name) {
                    if(index > 0) {
                        utmIdListLast+="|";
                    }
                    utmIdListLast+=name+":"+utmsIdsLast[name];
                });


                var utmLast = "";
                var utmsLast = getUTMs(true)
                $.each(utmTerms, function (index, name) {
                    if(index > 0) {
                        utmLast+="|";
                    }
                    utmLast+=name+":"+utmsLast[name];
                });

                var dateTime = getDateTime();
                var landing = Cookies.get('pys_landing_page');
                var lastLanding = Cookies.get('last_pys_landing_page');
                var trafic = Cookies.get('pysTrafficSource');
                var lastTrafic = Cookies.get('last_pysTrafficSource');

                var $form = null;
                if($('body').hasClass('woocommerce-checkout')) {
                    $form = $("form.woocommerce-checkout");
                } else {
                    $form = $("#edd_purchase_form");
                }
                var inputs = {'pys_utm':utm,
                    'pys_utm_id':utmIdList,
                    'pys_browser_time':dateTime.join("|"),
                    'pys_landing':landing,
                    'pys_source':trafic,
                    'pys_order_type': $(".wcf-optin-form").length > 0 ? "wcf-optin" : "normal",

                    'last_pys_landing':lastLanding,
                    'last_pys_source':lastTrafic,
                    'last_pys_utm':utmLast,
                    'last_pys_utm_id':utmIdListLast,
                }

                Object.keys(inputs).forEach(function(key,index) {
                    $form.append("<input type='hidden' name='"+key+"' value='"+inputs[key]+"' /> ");
                });


            },

            /**
             * Advanced From Data
             */
            saveAdvancedFormData: function (email,phone,firstName,lastName) {
                let data = Utils.getAdvancedFormData();

                if(email != null) {
                    data["email"] = email;
                }
                if(phone != null) {
                    data["phone"] = phone;
                }
                if(firstName != null) {
                    data["first_name"] = firstName;
                }
                if(lastName != null) {
                    data["last_name"] = lastName;
                }
                Cookies.set('pys_advanced_form_data', JSON.stringify(data),{ expires: 300 } );

                GAds.updateEnhancedConversionData()
            },

            getAdvancedFormData: function () {
                let dataStr = Cookies.get("pys_advanced_form_data");
                if(dataStr === undefined) {
                    return {'first_name':"",'last_name':"",'email':"",'phone':""};
                } else {
                    return JSON.parse(dataStr);
                }
            }

        };

    }(options);

    var TikTok = function (options) {

        var initialized = false;

        function fireEvent(name, event) {

            if(typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name,'tiktok')) {
                return;
            }
            var params = Utils.copyProperties(event.params, {});

            event.pixelIds.forEach(function(pixelId){
                if (options.debug) {
                    console.log('[TikTok] ' + name, params,"pixel_id",pixelId);
                }

                if(options.tiktok.hasOwnProperty('advanced_matching')
                    && Object.keys(options.tiktok.advanced_matching).length > 0) {
                    ttq.instance(pixelId).identify(options.tiktok.advanced_matching)
                }

                ttq.instance(pixelId).track(name,params)
            });

        }

        return {
            tag: function() {
                return "tiktok";
            },
            isEnabled: function () {
                return options.hasOwnProperty('tiktok');
            },
            disable: function () {
                initialized = false;
            },

            loadPixel:function () {
                if (initialized || !this.isEnabled() || !Utils.consentGiven('tiktok')) {
                    return;
                }

                !function (w, d, t) {
                    w.TiktokAnalyticsObject=t;
                    var ttq=w[t]=w[t]||[];
                    ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
                    ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                    for(var i=0;i<ttq.methods.length;i++)
                        ttq.setAndDefer(ttq,ttq.methods[i]);
                    ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
                    ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

                    //ttq.load('C60QSCQRVDG9JAKNPK2G');
                    //ttq.page();
                }(window, document, 'ttq');

                options.tiktok.pixelIds.forEach(function (pixelId) {
                    ttq.load(pixelId);
                    ttq.page();
                });
                initialized = true;
                Utils.fireStaticEvents('tiktok');
            },

            fireEvent: function (name, data) {
                if (!initialized || !this.isEnabled()) {
                    return false;
                }
                data.delay = data.delay || 0;

                if (data.delay === 0) {
                    fireEvent(name, data);
                } else {
                    setTimeout(function (name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data);
                }
                return true;
            },

            onClickEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onWooAddToCartOnSingleEvent: function (product_id, qty, product_type, is_external, $form) {

                window.pysWooProductData = window.pysWooProductData || [];
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty(this.tag())) {

                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);

                        Utils.copyProperties(window.pysWooProductData[product_id][this.tag()]['params'], event.params);

                        // maybe customize value option
                        if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global') {

                            if (product_type === Utils.PRODUCT_BUNDLE) {
                                var data = $(".bundle_form .bundle_data").data("bundle_form_data");
                                var items_sum = getBundlePriceOnSingleProduct(data);
                                event.params.value = (parseFloat(data.base_price) + items_sum) * qty;
                            } else {
                                event.params.value = event.params.value * qty;
                            }
                        }

                        event.params.quantity = qty;

                        this.fireEvent(event.name, event);

                    }
                }
            },

            onWooAddToCartOnButtonEvent: function (product_id) {
                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty(this.tag())) {
                        var productData = window.pysWooProductData[product_id][this.tag()]
                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()])

                        Utils.copyProperties(productData['params'], event.params)
                        event.pixelIds = productData['pixelIds'];
                        this.fireEvent(event.name, event);
                    }
                }
            },

            onEddAddToCartOnButtonEvent : function (download_id, price_index, qty) {
                if(!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()]);


                if (window.pysEddProductData.hasOwnProperty(download_id)) {

                    var index;

                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }

                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty(this.tag())) {

                            Utils.copyProperties(window.pysEddProductData[download_id][index][this.tag()].params, event.params);
                            this.fireEvent(event.name,event);

                        }
                    }

                }
            }
        }
    }(options);

    var Facebook = function (options) {

        var defaultEventTypes = [
            'PageView',
            'ViewContent',
            'Search',
            'AddToCart',
            'AddToWishlist',
            'InitiateCheckout',
            'AddPaymentInfo',
            'Purchase',
            'Lead',

            'Subscribe',
            'CustomizeProduct',
            'FindLocation',
            'StartTrial',
            'SubmitApplication',
            'Schedule',
            'Contact',
            'Donate'
        ];

        var notCachedEventsIds = new Array();
        var isAddToCartFromJs =  options.woo.hasOwnProperty("addToCartCatchMethod")
                                && options.woo.addToCartCatchMethod === "add_cart_js";
        if(!isAddToCartFromJs) {
            notCachedEventsIds.push('woo_add_to_cart_on_button_click')
        }
        var initialized = false;
        var configuredPixels = new Array();
        function fireEvent(name, event) {

            if(typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name,'facebook')) {
                return;
            }

            var data = event.params;
            var ids = event.pixelIds;
            var actionType = defaultEventTypes.includes(name) ? 'trackSingle' : 'trackSingleCustom';

            var params = {};

            Utils.copyProperties(data, params);
            Utils.copyProperties(Utils.getRequestParams(), params);


            if(options.facebook.serverApiEnabled) {
                if(event.e_id === "woo_remove_from_cart" ) {
                    Facebook.updateEventId(event.name);
                    event.eventID = Facebook.getEventId(event.name);
                } else if(isAddToCartFromJs && event.e_id === "woo_add_to_cart_on_button_click" ) {
                    Facebook.updateEventId(event.name);
                    event.eventID = Facebook.getEventId(event.name);
                } else if(!notCachedEventsIds.includes(event.e_id)) {
                    var isApiDisabled = options.gdpr.all_disabled_by_api ||
                        options.gdpr.facebook_disabled_by_api ||
                        options.gdpr.tiktok_disabled_by_api ||
                        options.gdpr.cookiebot_integration_enabled ||
                        options.gdpr.cookie_notice_integration_enabled ||
                        options.gdpr.consent_magic_integration_enabled ||
                        options.gdpr.cookie_law_info_integration_enabled;
                    // Update eventID
                    if( options.facebook.ajaxForServerEvent || event.type !== "static") {
                        event.eventID = pys_generate_token(36);
                    }

                    // send event from server if they was bloc by gdpr or need send with delay
                    if( options.facebook.ajaxForServerEvent || isApiDisabled || event.delay > 0 || event.type !== "static" ){

                        var json = {
                            action: 'pys_api_event',
                            pixel: 'facebook',
                            event: name,
                            ids: ids,
                            data:params,
                            url:window.location.href,
                            eventID:event.eventID,
                            ajax_event:options.ajax_event
                        };

                        if(event.hasOwnProperty('woo_order')) {
                            json['woo_order'] = event.woo_order;
                        }

                        if(event.hasOwnProperty('edd_order')) {
                            json['edd_order'] = event.edd_order;
                        }
                        if(event.e_id === "automatic_event_internal_link"
                            || event.e_id === "automatic_event_outbound_link"
                        ) {
                            setTimeout(function(){
                                jQuery.ajax( {
                                    type: 'POST',
                                    url: options.ajaxUrl,
                                    data: json,
                                    headers: {
                                        'Cache-Control': 'no-cache'
                                    },
                                    success: function(){},
                                });
                            },500)
                        } else if(name == 'PageView') {
                            let expires = parseInt(options.cookie_duration);
                            var currentTimeInSeconds=Date.now();
                            var randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
                            timeoutDelay = 0;

                            if(!Cookies.get('_fbp'))
                            {
                                timeoutDelay = 100;
                            }
                            if(getUrlParameter('fbclid') && !Cookies.get('_fbc'))
                            {
                                timeoutDelay = 100;
                            }
                            setTimeout(function(){
                                if(!Cookies.get('_fbp'))
                                {
                                    Cookies.set('_fbp','fb.1.'+currentTimeInSeconds+'.'+randomNum,  { expires: expires })
                                }
                                if(getUrlParameter('fbclid') && !Cookies.get('_fbc'))
                                {
                                    Cookies.set('_fbc', 'fb.1.'+currentTimeInSeconds+'.'+getUrlParameter('fbclid'),  { expires: expires })
                                }
                                jQuery.ajax( {
                                    type: 'POST',
                                    url: options.ajaxUrl,
                                    data: json,
                                    headers: {
                                        'Cache-Control': 'no-cache'
                                    },
                                    success: function(){},
                                });
                            },timeoutDelay)
                        }
                        else
                        {
                            jQuery.ajax( {
                                type: 'POST',
                                url: options.ajaxUrl,
                                data: json,
                                headers: {
                                    'Cache-Control': 'no-cache'
                                },
                                success: function(){},
                            });
                        }


                    }

                    if( event.e_id !== "automatic_event_signup" && name == "CompleteRegistration" && options.facebook.wooCRSendFromServer ) {
                        return;
                    }
                }

            }



            if (options.debug) {
                console.log('[Facebook] ' + name, params,"pixel_ids",ids,"eventID",event.eventID);
            }
            // fire event for each pixel id
            ids.forEach(function (pixelId) {
                // add eventID for deduplicate events @see https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/
                var args = {};
                if(options.facebook.serverApiEnabled && event.hasOwnProperty('eventID')) {
                    args.eventID = pixelId+event.eventID;
                }
                
                Facebook.maybeInitPixel(pixelId);
                fbq(actionType,pixelId, name, params,args);
            });

        }

        /**
         * Public API
         */
        return {
            tag: function() {
              return "facebook";
            },
            isEnabled: function () {
                return options.hasOwnProperty('facebook');
            },

            initEventIdCookies: function (key) {
                var ids = {};
                ids[key] = pys_generate_token(36)
                Cookies.set('pys_fb_event_id', JSON.stringify(ids));
            },

            updateEventId:function(key) {
                var cooData = Cookies.get("pys_fb_event_id")
                if(cooData === undefined) {
                    this.initEventIdCookies(key);
                } else {
                    var data = JSON.parse(cooData);
                    data[key] = pys_generate_token(36);
                    Cookies.set('pys_fb_event_id', JSON.stringify(data) );
                }
            },

            getEventId:function (key) {
                var data = Cookies.get("pys_fb_event_id");
                if(data === undefined) {
                    this.initEventIdCookies(key);
                    data = Cookies.get("pys_fb_event_id");
                }
                return JSON.parse(data)[key];
            },

            disable: function () {
                initialized = false;
            },

            /**
             * Load pixel's JS
             */
            loadPixel: function () {

                if (initialized || !this.isEnabled() || !Utils.consentGiven('facebook')) {
                    return;
                }

                ! function (f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function () {
                        n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.agent = 'dvpixelyoursite';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window,
                    document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

                // initialize default pixel
                options.facebook.pixelIds.forEach(function (pixelId) {
                    Facebook.maybeInitPixel(pixelId);
                });
                initialized = true;

                Utils.fireStaticEvents('facebook');

            },
            advancedMatching: function () {
                if(options.facebook.advancedMatchingEnabled) {
                    let advancedMatchingForm = Utils.getAdvancedFormData();
                    let advancedMatching = {};
                    if(Object.keys(options.facebook.advancedMatching).length > 0) {
                        advancedMatching = options.facebook.advancedMatching;
                    }

                    if(!advancedMatching.hasOwnProperty("em")
                        && advancedMatchingForm.hasOwnProperty("email") && advancedMatchingForm["email"].length > 0) {
                        advancedMatching["em"] = advancedMatchingForm["email"];
                    }
                    if(!advancedMatching.hasOwnProperty("ph")
                        && advancedMatchingForm.hasOwnProperty("phone") && advancedMatchingForm["phone"].length > 0) {
                        advancedMatching["ph"] = advancedMatchingForm["phone"];
                    }
                    if(!advancedMatching.hasOwnProperty("fn")
                        && advancedMatchingForm.hasOwnProperty("first_name") && advancedMatchingForm["first_name"].length > 0) {
                        advancedMatching["fn"] = advancedMatchingForm["first_name"];
                    }
                    if(!advancedMatching.hasOwnProperty("ln")
                        && advancedMatchingForm.hasOwnProperty("last_name") && advancedMatchingForm["last_name"].length > 0) {
                        advancedMatching["ln"] = advancedMatchingForm["last_name"];
                    }

                    if(Object.keys(advancedMatching).length > 0) {
                        return advancedMatching;
                    }
                }
                return false
            },
            maybeInitPixel: function(pixelId) {

                if(configuredPixels.includes(pixelId)) return;

                if (options.facebook.removeMetadata) {
                    fbq('set', 'autoConfig', false, pixelId);
                }
                let advancedMatching = Facebook.advancedMatching();

                if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {
                    if(!advancedMatching) {
                        fbq('init', pixelId);
                    } else {
                        var cs_advanced_matching = Cookies.get('cs_enabled_advanced_matching'+test_prefix);
                        if (jQuery('#cs_enabled_advanced_matching'+test_prefix).length > 0) {
                            if (cs_advanced_matching == 'yes') {
                                fbq('init', pixelId, advancedMatching);
                            } else {
                                fbq('init', pixelId);
                            }
                        } else {
                            fbq('init', pixelId, advancedMatching);
                        }
                    }
                } else {
                    if(!advancedMatching) {
                        fbq('init', pixelId);
                    }  else {
                        fbq('init', pixelId, advancedMatching);
                    }
                }
                configuredPixels.push(pixelId);
            },

            fireEvent: function (name, data) {

                if (!initialized || !this.isEnabled()) {
                    return false;
                }

                data.delay = data.delay || 0;
                data.params = data.params || {};

                if (data.delay === 0) {

                    fireEvent(name, data);

                } else {

                    setTimeout(function (name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data);

                }

                return true;

            },

            onAdSenseEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onClickEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onWatchVideo: function (event) {
                this.fireEvent(event.name, event);
            },

            onCommentEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onFormEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onDownloadEvent: function (event) {
                this.fireEvent(event.name, event);

            },


            onWooAddToCartOnButtonEvent: function (product_id) {
                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('facebook')) {

                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()])

                        Utils.copyProperties(window.pysWooProductData[product_id]['facebook']['params'], event.params)
                        event.pixelIds = window.pysWooProductData[product_id]['facebook']['pixelIds'];
                        this.fireEvent(event.name, event);
                    }
                }
            },

            onWooAddToCartOnSingleEvent: function (product_id, qty, product_type, is_external, $form) {

                window.pysWooProductData = window.pysWooProductData || [];
                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;

                if (product_type === Utils.PRODUCT_VARIABLE && !options.facebook.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('facebook')) {

                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click.facebook);


                        Utils.copyProperties(window.pysWooProductData[product_id]['facebook']['params'], event.params);

                        var groupValue = 0;
                        if(product_type === Utils.PRODUCT_GROUPED ) {
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index){
                                var childId = $(this).attr('name').replaceAll("quantity[","").replaceAll("]","");
                                var quantity = parseInt($(this).val());
                                if(isNaN(quantity)) {
                                    quantity = 0;
                                }
                                var childItem = window.pysWooProductData[product_id]['facebook'].grouped[childId];

                                if(quantity == 0) {
                                    event.params.content_ids.forEach(function(el,index,array) {
                                        if(el == childItem.content_id) {
                                            array.splice(index, 1);
                                        }
                                    });
                                }

                                if(event.params.hasOwnProperty('contents')) {
                                    event.params.contents.forEach(function(el,index,array) {
                                        if(el.id == childItem.content_id) {
                                            if(quantity > 0){
                                                el.quantity = quantity;
                                            } else {
                                                array.splice(index, 1);
                                            }
                                        }
                                    });
                                }


                                groupValue += childItem.price * quantity;
                            });
                            if(groupValue == 0) return; // skip if no items selected
                        }



                        // maybe customize value option
                        if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global') {

                            if(product_type === Utils.PRODUCT_GROUPED) {
                                    event.params.value = groupValue;
                            } else if(product_type === Utils.PRODUCT_BUNDLE) {
                                var data = $(".bundle_form .bundle_data").data("bundle_form_data");
                                var items_sum = getBundlePriceOnSingleProduct(data);
                                event.params.value = (parseFloat(data.base_price) + items_sum )* qty;
                            } else {
                                event.params.value = event.params.value * qty;
                            }
                        }

                        // only when non Facebook for WooCommerce logic used
                        if (event.params.hasOwnProperty('contents') && product_type !== Utils.PRODUCT_GROUPED) {
                            event.params.contents[0].quantity = qty;

                        }

                        var event_name = is_external ? options.woo.affiliateEventName : event.name;

                        this.fireEvent(event_name, event);

                    }
                }

            },

            onWooRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onWooAffiliateEvent: function (product_id) {
                if(!options.dynamicEvents.woo_affiliate.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_affiliate[this.tag()]);


                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('facebook')) {

                        Utils.copyProperties(window.pysWooProductData[product_id][this.tag()].params, event.params)
                        this.fireEvent(options.woo.affiliateEventName, event);

                    }
                }

            },

            onWooPayPalEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {
                if(!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()]);

                if (window.pysEddProductData.hasOwnProperty(download_id)) {

                    var index;

                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }

                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('facebook')) {


                            Utils.copyProperties(window.pysEddProductData[download_id][index]['facebook']["params"], event.params)

                            // maybe customize value option
                            if (options.edd.addToCartOnButtonValueEnabled && options.edd.addToCartOnButtonValueOption !== 'global') {
                                event.params.value = event.params.value * qty;
                            }

                            // update contents qty param
                            var contents = event.params.contents;
                            contents[0].quantity = qty;
                            event.params.contents = JSON.stringify(contents);

                            this.fireEvent(event.name,event);

                        }
                    }

                }

            },

            onEddRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },
            onPageScroll: function (event) {
                this.fireEvent(event.name, event);
            },
            onTime: function (event) {
                this.fireEvent(event.name, event);
            },
        };

    }(options);

    var Analytics = function (options) {

        var initialized = false;

        /**
         * Fires event
         *
         * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/sending-data
         * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/events
         * @link: https://developers.google.com/gtagjs/reference/event
         * @link: https://developers.google.com/gtagjs/reference/parameter
         *
         * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/custom-dims-mets
         *
         * @param name
         * @param data
         */
        function fireEvent(name, data) {
            if(typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name,'ga')) {
                return;
            }

            var eventParams = Utils.copyProperties(data.params, {});
            Utils.copyProperties(Utils.getRequestParams(), eventParams);

            var _fireEvent = function (tracking_id,name,params) {

                params['send_to'] = tracking_id;
                if (options.debug) {
                    console.log('[Google Analytics #' + tracking_id + '] ' + name, params);
                }

                gtag('event', name, params);

            };

            data.trackingIds.forEach(function (tracking_id) {
                var copyParams = Utils.copyProperties(eventParams, {}); // copy params because mapParamsTov4 can modify it
                var params = mapParamsTov4(tracking_id,name,copyParams)
                _fireEvent(tracking_id, name, params);
            });

        }

        function normalizeEventName(eventName) {

            var matches = {
                ViewContent: 'view_item',
                AddToCart: 'add_to_cart',
                AddToWishList: 'add_to_wishlist',
                InitiateCheckout: 'begin_checkout',
                Purchase: 'purchase',
                Lead: 'generate_lead',
                CompleteRegistration: 'sign_up',
                AddPaymentInfo: 'set_checkout_option'
            };

            return matches.hasOwnProperty(eventName) ? matches[eventName] : eventName;

        }

        function mapParamsTov4(tag,name,param) {
            //GA4 automatically collects a number of parameters for all events
            delete param.page_title;
            delete param.event_url;
            delete param.landing_page;
            // end
            if(isv4(tag)) {
                delete param.traffic_source;
                delete param.event_category;
                delete param.event_label;
                delete param.ecomm_prodid;
                delete param.ecomm_pagetype;
                delete param.ecomm_totalvalue;
                if(name === 'search') {
                    param['search'] = param.search_term;
                    delete param.search_term;
                    delete param.non_interaction;
                    delete param.dynx_itemid;
                    delete param.dynx_pagetype;
                    delete param.dynx_totalvalue;
                }
            } else {

                switch (name) {
                    case 'OutboundClick':
                    case 'InternalClick': {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                            non_interaction: param.non_interaction,
                        }
                        if(param.hasOwnProperty("target_url")) {
                            params['event_label'] = param.target_url
                        }
                        if(options.trackTrafficSource) {
                            params['traffic_source'] = param.traffic_source
                        }
                        return params;
                    }

                    case 'AdSense' :
                    case 'Comment' :
                    case 'login' :
                    case 'sign_up' :
                    case 'EmailClick' :
                    case 'TelClick' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                              non_interaction: param.non_interaction,
                        }
                        return params;
                    }
                    case 'Form' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                              non_interaction: param.non_interaction,
                        }
                        var formClass = (typeof param.form_class != 'undefined') ? 'class: ' + param.form_class : '';
                        if(formClass != "") {
                            params["event_label"] = formClass;
                        }
                        return params;
                    }
                    case 'Download' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                            event_label: param.download_name,
                              non_interaction: param.non_interaction,
                        }
                        return params;
                    }
                    case 'TimeOnPage' :
                    case 'PageScroll' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                            event_label: document.title,
                              non_interaction: param.non_interaction,
                        }
                        return params;
                    }
                    case 'search' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                            event_label: param.search_term,
                              non_interaction: param.non_interaction,
                        }
                        return params;
                    }
                }

                //delete standard params

                delete param.post_type;
                delete param.post_id;
                delete param.plugin;
                delete param.user_role;
                delete param.cartlows;
                delete param.cartflows_flow;
                delete param.cartflows_step;
            }
            return param;
        }

        function isv4(tag) {
            return tag.indexOf('G') === 0;
        }

        /**
         * Public API
         */
        return {
            tag: function() {
                return "ga";
            },
            isEnabled: function () {
                return options.hasOwnProperty('ga');
            },

            disable: function () {
                initialized = false;
            },

            loadPixel: function () {

                if (initialized || !this.isEnabled() || !Utils.consentGiven('analytics')) {
                    return;
                }

                Utils.loadGoogleTag(options.ga.trackingIds[0]);

                var cd = {
                    'dimension1': 'event_hour',
                    'dimension2': 'event_day',
                    'dimension3': 'event_month'
                };

                // configure Dynamic Remarketing CDs
                if (options.ga.retargetingLogic === 'ecomm') {
                    cd.dimension4 = 'ecomm_prodid';
                    cd.dimension5 = 'ecomm_pagetype';
                    cd.dimension6 = 'ecomm_totalvalue';
                } else {
                    cd.dimension4 = 'dynx_itemid';
                    cd.dimension5 = 'dynx_pagetype';
                    cd.dimension6 = 'dynx_totalvalue';
                }

                var config = {
                    'link_attribution': options.ga.enhanceLinkAttr,
                    'anonymize_ip': options.ga.anonimizeIP,
                    'custom_map': cd
                };

                if(options.user_id && options.user_id != 0) {
                    config.user_id = options.user_id;
                }

                // Cross-Domain tracking
                if (options.ga.crossDomainEnabled) {
                    config.linker = {
                        accept_incoming: options.ga.crossDomainAcceptIncoming,
                        domains: options.ga.crossDomainDomains
                    };
                }



                // configure tracking ids

                options.ga.trackingIds.forEach(function (trackingId,index) {
                    if(options.ga.isDebugEnabled.includes("index_"+index)) {
                        config.debug_mode = true;
                    } else {
                        config.debug_mode = false;
                    }
                    if(isv4(trackingId)) {
                        if(options.ga.disableAdvertisingFeatures) {
                            config.allow_google_signals = false
                        }
                        if(options.ga.disableAdvertisingPersonalization) {
                            config.allow_ad_personalization_signals = false
                        }
                    }

                    if (options.gdpr.cookiebot_integration_enabled && typeof Cookiebot !== 'undefined') {

                        var cookiebot_consent_category = options.gdpr['cookiebot_analytics_consent_category'];
                        if (options.gdpr['analytics_prior_consent_enabled']) {
                            if (Cookiebot.consented === true && Cookiebot.consent[cookiebot_consent_category]) {
                                gtag('config', trackingId, config);
                            }
                        } else {
                            if (Cookiebot.consent[cookiebot_consent_category]) {
                                gtag('config', trackingId, config);
                            }
                        }

                    }
                    else
                    {
                        gtag('config', trackingId, config);
                    }
                    
                });

                initialized = true;

                Utils.fireStaticEvents('ga');
                $( document).trigger( "analytics_initialized")
            },

            fireEvent: function (name, data) {

                if (!initialized || !this.isEnabled()) {
                    return false;
                }

                data.delay = data.delay || 0;
                data.params = data.params || {};

                if (data.delay === 0) {

                    fireEvent(name, data);

                } else {

                    setTimeout(function (name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data);

                }

                return true;

            },

            onAdSenseEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onClickEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onWatchVideo: function (event) {
                if(!event.hasOwnProperty("youtube_disabled")
                    || !event.youtube_disabled
                    || event.params.video_type !== "youtube") {
                    this.fireEvent(event.name, event);
                }
            },

            onCommentEvent: function (event) {

                this.fireEvent(event.name, event);

            },

            onFormEvent: function (event) {

                this.fireEvent(event.name, event);

            },

            onDownloadEvent: function (event) {

                this.fireEvent(event.name, event);

            },

            onWooAddToCartOnButtonEvent: function (product_id) {
                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('ga')) {
                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);
                        Utils.copyProperties(window.pysWooProductData[product_id]['ga'].params, event.params)
                        event.trackingIds = window.pysWooProductData[product_id]['ga']['trackingIds'];
                        this.fireEvent(event.name, event);
                    }
                }

            },

            onWooAddToCartOnSingleEvent: function (product_id, qty, product_type, is_external, $form) {

                window.pysWooProductData = window.pysWooProductData || [];

                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);

                if (product_type === Utils.PRODUCT_VARIABLE && !options.ga.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('ga')) {

                        Utils.copyProperties(window.pysWooProductData[product_id]['ga'].params, event.params);


                        if(product_type === Utils.PRODUCT_GROUPED ) {
                            var groupValue = 0;
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index){
                                var childId = $(this).attr('name').replaceAll("quantity[","").replaceAll("]","");
                                var quantity = parseInt($(this).val());
                                if(isNaN(quantity)) {
                                    quantity = 0;
                                }
                                var childItem = window.pysWooProductData[product_id]['ga'].grouped[childId];
                                event.params.items.forEach(function(el,index,array) {
                                    if(el.id == childItem.content_id) {
                                        if(quantity > 0){
                                            el.quantity = quantity;
                                            el.price = childItem.price;
                                        } else {
                                            array.splice(index, 1);
                                        }
                                    }
                                });
                                groupValue += childItem.price * quantity;
                            });

                            if(options.woo.addToCartOnButtonValueEnabled &&
                                options.woo.addToCartOnButtonValueOption !== 'global' &&
                                event.params.hasOwnProperty('ecomm_totalvalue')) {
                                event.params.ecomm_totalvalue = groupValue;
                            }

                            if(groupValue == 0) return; // skip if no items selected
                        } else {
                            // update items qty param
                            event.params.items[0].quantity = qty;
                        }

                        // maybe customize value option
                        if (options.woo.addToCartOnButtonValueEnabled &&
                            options.woo.addToCartOnButtonValueOption !== 'global' &&
                            product_type !== Utils.PRODUCT_GROUPED)
                        {
                            if(event.params.hasOwnProperty('ecomm_totalvalue')) {
                                event.params.ecomm_totalvalue = event.params.items[0].price * qty;
                            }
                        }



                        var eventName = is_external ? options.woo.affiliateEventName : event.name;
                        eventName = normalizeEventName(eventName);

                        this.fireEvent(eventName, event);

                    }
                }

            },

            onWooCheckoutProgressStep: function (event) {
                this.fireEvent(event.name, event);
            },

            onWooSelectContent: function (event) {
                this.fireEvent(event.name, event);
            },

            onWooRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onWooAffiliateEvent: function (product_id) {
                if(!options.dynamicEvents.woo_affiliate.hasOwnProperty(this.tag()))
                    return;
                var event = options.dynamicEvents.woo_affiliate[this.tag()];

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('ga')) {

                        event = Utils.clone(event );
                        Utils.copyProperties(window.pysWooProductData[product_id][this.tag()], event.params)
                        this.fireEvent(normalizeEventName(options.woo.affiliateEventName), event);

                    }
                }

            },

            onWooPayPalEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {
                if(!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()]);


                if (window.pysEddProductData.hasOwnProperty(download_id)) {

                    var index;

                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }

                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('ga')) {

                            Utils.copyProperties(window.pysEddProductData[download_id][index]['ga'].params, event.params);

                            // update items qty param
                            event.params.items[0].quantity = qty;

                            this.fireEvent(event.name,event);

                        }
                    }

                }

            },

            onEddRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onPageScroll: function (event) {
                if (initialized && this.isEnabled()) {
                    this.fireEvent(event.name, event);
                }
            },
            onTime: function (event) {
                if (initialized && this.isEnabled()) {
                    this.fireEvent(event.name, event);
                }
            },
        };

    }(options);

    var GAds = function (options) {

        var initialized = false;
        var isAllowEnhancedConversions = false
        /**
         * Fires event
         *
         * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/sending-data
         * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/events
         * @link: https://developers.google.com/gtagjs/reference/event
         * @link: https://developers.google.com/gtagjs/reference/parameter
         */
        function fireEvent(name, data) {

            if(typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(event_name,'google_ads')) {
                return;
            }

            var _params = Utils.copyProperties(data.params,{});
            var ids = data.ids;

            var conversion_labels = data.conversion_labels;
            Utils.copyProperties(Utils.getRequestParams(), _params);
            var _fireEvent = function (conversion_id,event_name) {

                params = Utils.copyProperties(_params, { send_to: conversion_id });

                if("conversion" === event_name) {
                    delete params.items;
                    delete params.ecomm_pagetype;
                    delete params.ecomm_prodid;
                    delete params.ecomm_totalvalue;
                }

                if (options.debug) {
                    console.log('[Google Ads #' + conversion_id + '] ' + event_name, params);
                }

                gtag('event', event_name, params);

            };

            if(conversion_labels.length > 0) {  // if custom event have conversion_label
                conversion_labels.forEach(function (conversion_id) {
                    _fireEvent(conversion_id,name);
                });
            } else { // if normal event have conversion_label or custom without conversion_label

                data.conversion_ids.forEach(function (conversion_id) { // send main event
                    _fireEvent(conversion_id,name);
                });

                if (ids.length) {
                    ids.forEach(function (conversion_id) {  // send conversion event next to main(not use for custom events)
                        _fireEvent(conversion_id,"conversion");
                    });
                }
            }
        }

        function normalizeEventName(eventName) {

            var matches = {
                ViewContent: 'view_item',
                AddToCart: 'add_to_cart',
                AddToWishList: 'add_to_wishlist',
                InitiateCheckout: 'begin_checkout',
                Purchase: 'purchase',
                Lead: 'generate_lead',
                CompleteRegistration: 'sign_up',
                AddPaymentInfo: 'set_checkout_option'
            };

            return matches.hasOwnProperty(eventName) ? matches[eventName] : eventName;

        }

        /**
         * Public API
         */
        return {
            tag: function() {
                return "google_ads";
            },
            isEnabled: function () {
                return options.hasOwnProperty('google_ads');
            },

            disable: function () {
                initialized = false;
            },

            updateEnhancedConversionData : function () {

                if(isAllowEnhancedConversions) {
                    var advanced = Utils.getAdvancedFormData()
                    if(Object.keys(options.google_ads.user_data).length == 0) {
                        if(advanced["email"].length > 0) {
                            gtag('set', 'user_data', {"email":advanced["email"]});
                        }
                    }
                }
            },

            loadPixel: function () {

                if (initialized || !this.isEnabled() || !Utils.consentGiven('google_ads')) {
                    return;
                }

                Utils.loadGoogleTag(options.google_ads.conversion_ids[0]);

                // configure conversion ids
                options.google_ads.conversion_ids.forEach(function (conversion_id,index) {

                    gtag('config', conversion_id);

                    if(options.google_ads.enhanced_conversion.includes("index_"+index)) {
                        isAllowEnhancedConversions = true
                        gtag('config', conversion_id,{ 'allow_enhanced_conversions':true });
                    }

                    if(isAllowEnhancedConversions) {
                        var advanced = Utils.getAdvancedFormData()
                        if(Object.keys(options.google_ads.user_data).length > 0) {
                            gtag('set', 'user_data', options.google_ads.user_data);
                        } else if(advanced["email"].length > 0) {
                            gtag('set', 'user_data', {"email":advanced["email"]});
                        }
                    }

                });

                initialized = true;

                Utils.fireStaticEvents('google_ads');

            },

            fireEvent: function (name, data) {

                if (!initialized || !this.isEnabled()) {
                    return false;
                }

                data.delay = data.delay || 0;
                data.params = data.params || {};
                data.ids = data.ids || [];
                data.conversion_labels = data.conversion_labels || [];

                if (data.delay === 0) {
                    fireEvent(name, data);
                } else {
                    setTimeout(function (name, data) {
                        fireEvent(name, data);
                    }, data.delay * 1000, name, data);
                }

                return true;

            },

            onAdSenseEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onClickEvent: function (action, params) {
                //disabled
            },

            onWatchVideo: function (event) {
                this.fireEvent(event.name, event);
            },

            onCommentEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onFormEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onDownloadEvent: function (event) {
                this.fireEvent(event.name, event);
            },




            onWooAddToCartOnButtonEvent: function (product_id) {

                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('google_ads')) {

                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()])
                        Utils.copyProperties(window.pysWooProductData[product_id]['google_ads']['params'].params, event.params)
                        event["ids"] = window.pysWooProductData[product_id]['google_ads']['ids']
                        event["conversion_labels"] = window.pysWooProductData[product_id]['google_ads']['conversion_labels']
                        this.fireEvent(event.name, event);
                    }
                }

            },

            onWooAddToCartOnSingleEvent: function (product_id, qty, product_type, is_external, $form) {

                window.pysWooProductData = window.pysWooProductData || [];
                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);

                if (product_type === Utils.PRODUCT_VARIABLE && !options.google_ads.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('google_ads')) {

                        Utils.copyProperties(window.pysWooProductData[product_id]['google_ads']["params"], event.params);
                        event["ids"] = window.pysWooProductData[product_id]['google_ads']['ids']
                        event["conversion_labels"] = window.pysWooProductData[product_id]['google_ads']['conversion_labels']

                        var groupValue = 0;
                        if(product_type === Utils.PRODUCT_GROUPED ) {
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index){
                                var childId = $(this).attr('name').replaceAll("quantity[","").replaceAll("]","");
                                var quantity = parseInt($(this).val());
                                if(isNaN(quantity)) {
                                    quantity = 0;
                                }

                                var childItem = window.pysWooProductData[product_id]['google_ads'].grouped[childId];

                                if(options.woo.addToCartOnButtonValueEnabled &&
                                    options.woo.addToCartOnButtonValueOption !== 'global') {

                                    event.params.items.forEach(function(el,index,array) {
                                        if(el.id == childItem.content_id) {
                                            if(quantity > 0){
                                                el.quantity = quantity;
                                                el.price = childItem.price;
                                            } else {
                                                array.splice(index, 1);
                                            }
                                        }
                                    });
                                }
                                groupValue += childItem.price * quantity;
                            });
                            if(groupValue == 0) return;
                            event.params.value = groupValue;
                        } else {
                            // update items qty param
                            event.params.items[0].quantity = qty;
                        }



                        // maybe customize value option
                        if (options.woo.addToCartOnButtonValueEnabled &&
                            options.woo.addToCartOnButtonValueOption !== 'global' &&
                            product_type !== Utils.PRODUCT_GROUPED) {
                            event.params.value =  event.params.value * qty;
                        }



                        var eventName = is_external ? options.woo.affiliateEventName : event.name;
                        eventName = normalizeEventName(eventName);

                        this.fireEvent(eventName, event);

                    }
                }

            },

            onWooRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onWooAffiliateEvent: function (product_id) {
                if(!options.dynamicEvents.woo_affiliate.hasOwnProperty(this.tag()))
                    return;
                var event = options.dynamicEvents.woo_affiliate[this.tag()];

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('google_ads')) {

                        event = Utils.clone(event)
                        Utils.copyProperties(window.pysWooProductData[product_id][this.tag()], event.params)
                        this.fireEvent(normalizeEventName(options.woo.affiliateEventName), event);

                    }
                }

            },

            onWooPayPalEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {
                if(!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()];


                if (window.pysEddProductData.hasOwnProperty(download_id)) {

                    var index;

                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }

                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('google_ads')) {

                            event = Utils.clone(event)
                            Utils.copyProperties(window.pysEddProductData[download_id][index]['google_ads']['params'], event.params);
                            event.ids = window.pysEddProductData[download_id][index]['google_ads']['ids']
                            // update items qty param
                            //params.items[0].quantity = qty;

                            this.fireEvent(event.name, event);

                        }
                    }

                }

            },

            onEddRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },
            onPageScroll: function (event) {
                if (initialized && this.isEnabled()) {
                    this.fireEvent(event.name, event);
                }
            },
            onTime: function (event) {
                if (initialized && this.isEnabled()) {
                    this.fireEvent(event.name, event);
                }
            },

        };

    }(options);

    window.pys = window.pys || {};
    window.pys.Facebook = Facebook;
    window.pys.Analytics = Analytics;
    window.pys.GAds = GAds;
    window.pys.Utils = Utils;
    window.pys.TikTok = TikTok;



    $(document).ready(function () {


        if($("#pys_late_event").length > 0) {
            var events =  JSON.parse($("#pys_late_event").attr("dir"));
            for(var key in events) {
                var event = {};
                event[events[key].e_id] = [events[key]];
                if(options.staticEvents.hasOwnProperty(key)) {
                    Object.assign(options.staticEvents[key], event);
                } else {
                    options.staticEvents[key] = event;
                }

            }
        }

        var Pinterest = Utils.setupPinterestObject();
        var Bing = Utils.setupBingObject();

        Utils.manageCookies();
        Utils.initializeRequestParams();
        Utils.setupGdprCallbacks();


        //Setup Advanced Form Data
        if(options.enable_auto_save_advance_matching) {
            $(document).on("blur","input[type='email']",function () {
                let email = $(this).val().trim().toLowerCase();
                if(Utils.validateEmail(email)) {
                    Utils.saveAdvancedFormData(email,null,null,null);
                }
            })
            $(document).on("blur","input[type='tel']",function () {
                let phone = $(this).val().trim().replace(/\D/g, "");
                if(phone.length > 5) {
                    Utils.saveAdvancedFormData(null,phone,null,null);
                }
            })
            $(document).on("blur","input[type='text']",function () {
                let name;
                if($(this).attr("name") && $(this).attr("name") != '')
                {
                    name = $(this).attr("name").trim()
                }
                if(name && options.advance_matching_fn_names.includes(name)) {
                    let value = $(this).val().trim();
                    if(value.length > 0) {
                        Utils.saveAdvancedFormData(null,null,value,null);
                    }
                }
                if(name && options.advance_matching_ln_names.includes(name)) {
                    let value = $(this).val().trim();
                    if(value.length > 0) {
                        Utils.saveAdvancedFormData(null,null,null,value);
                    }
                }
                if(name && options.advance_matching_tel_names.includes(name)) {
                    let value = $(this).val().trim();
                    if(value.length > 0) {
                        Utils.saveAdvancedFormData(null,value,null,null);
                    }
                }

            })
        }




        // setup Click Event
        if (
            options.dynamicEvents.hasOwnProperty("automatic_event_internal_link") ||
            options.dynamicEvents.hasOwnProperty("automatic_event_outbound_link") ||
            options.dynamicEvents.hasOwnProperty("automatic_event_tel_link") ||
            options.dynamicEvents.hasOwnProperty("automatic_event_email_link") ||
            options.dynamicEvents.hasOwnProperty("automatic_event_download")
        ) {

            $(document).onFirst('click', 'a, button, input[type="button"], input[type="submit"]', function (e) {

                var $elem = $(this);


                // Download
                if(options.dynamicEvents.hasOwnProperty("automatic_event_download")) {
                    var isFired = false;
                    if ($elem.is('a')) {
                        var href = $elem.attr('href');
                        if (typeof href !== "string") {
                            return;
                        }
                        href = href.trim();
                        var extension = Utils.getLinkExtension(href);
                        var track_download = false;

                        if (extension.length > 0) {

                            if(options.dynamicEvents.hasOwnProperty("automatic_event_download") ) {
                                var pixels = Object.keys(options.dynamicEvents.automatic_event_download);
                                for (var i = 0; i < pixels.length; i++) {
                                    var event = Utils.clone(options.dynamicEvents.automatic_event_download[pixels[i]]);
                                    var extensions = event.extensions;
                                    if (extensions.includes(extension)) {

                                        if(pixels[i] == "tiktok") {
                                            getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                                        } else {
                                            if (options.enable_remove_download_url_param) {
                                                href = href.split('?')[0];
                                            }
                                            event.params.download_url = href;
                                            event.params.download_type = extension;
                                            event.params.download_name = Utils.getLinkFilename(href);
                                            getPixelBySlag(pixels[i]).onDownloadEvent(event);
                                        }

                                        isFired = true;
                                    }
                                }
                            }
                        }
                    }
                    if(isFired) { // prevent duplicate events on the same element
                        return;
                    }
                }


                if (!e.hasOwnProperty('originalEvent')) {
                    return;
                }
                if($elem.hasClass("add_to_cart_button") ||
                    $elem.hasClass("single_add_to_cart_button") ) { // add_to_cart_button fire in woo
                    return;
                }

                if(options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_next_step_click")
                    && $elem.hasClass("wcf-next-step-link")) {
                    return;// add_to_cart_button fire in woo cf
                }
                if(options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_bump_click")
                    && $elem.hasClass("wcf-bump-order-cb")) {
                    return;// add_to_cart_button fire in woo cf
                }

                if($elem.hasClass("remove_from_cart_button") ) { // cancel remove from cart
                    return;
                }
                if($elem.hasClass("remove") ) { // cancel remove from cart
                    if($elem.parents('.cart_item').length || $elem.parents('.mini_cart_item').length)
                    return;
                }
                if($elem.attr("name") == "update_cart" || $elem.attr("name") == "apply_coupon") { // cancel update  cart or coupon button
                    return;
                }


                if ($elem.hasClass('pys_block')) {
                    return; // avoiding fake double clicks from Affiliate event
                }
                var text = "";
                var target_url = "";
                var linkType = "Internal Click";

                if ($elem.is('a')) {
                    var href = $elem.attr('href');

                    // fixes #112
                    if (typeof href !== "string") {
                        return;
                    }
                    href = href.trim();

                    text = $elem.text();
                    if(options.enable_remove_target_url_param) {
                        target_url = href.split('?')[0];
                    } else {
                        target_url = href
                    }


                    //Email Event
                    if (href.startsWith('mailto:')) {
                        if(options.dynamicEvents.hasOwnProperty("automatic_event_email_link")) {
                            var pixels = Object.keys(options.dynamicEvents.automatic_event_email_link);
                            for(var i = 0;i<pixels.length;i++) {
                                var event = Utils.clone(options.dynamicEvents.automatic_event_email_link[pixels[i]]);
                                Utils.copyProperties(Utils.getRequestParams(), event.params);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }

                        return; // not fire next
                    }

                    // Phone
                    if (href.startsWith('tel:')) {
                        if(options.dynamicEvents.hasOwnProperty("automatic_event_tel_link")) {
                            var pixels = Object.keys(options.dynamicEvents.automatic_event_tel_link);
                            for(var i = 0;i<pixels.length;i++) {
                                var event = Utils.clone(options.dynamicEvents.automatic_event_tel_link[pixels[i]]);
                                Utils.copyProperties(Utils.getRequestParams(), event.params);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }
                        return; // not fire next
                    }

                    if (href.startsWith('http')) {
                        // link type
                        var host = $elem.context != undefined ? $elem.context.host : $elem[0].host;
                        if (document.location.host != host) {
                            linkType = 'External Click';
                        }
                    }
                } else if ($elem.is('button')) {
                    if( $elem.hasClass("forminator-button-submit")) {
                        //disable duplicate events
                        return;
                    }
                    text = $elem.text();
                } else if ($elem.is('input[type="button"]')) {
                    text = $elem.val();
                } else if ($elem.is('input[type="submit"]')) {
                    if ( $elem.parents("form.comment-form")) {
                        //disable duplicate events
                        return;
                    }
                    if ($elem.parents("form")) {
                        //disable duplicate events
                        return;
                    }
                    text = $elem.val();
                } else {
                    return;
                }



                text = Utils.filterEmails(text);


                if( linkType === "Internal Click"
                    && options.dynamicEvents.hasOwnProperty("automatic_event_internal_link")
                ) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_internal_link);

                    for(var i = 0;i<pixels.length;i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_internal_link[pixels[i]]);

                        if(pixels[i] !== "tiktok") { // TT doesn't support custom parameters
                            event.params["text"] = text;
                            if(target_url){
                                event.params["target_url"] = target_url;
                            }
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                        }


                        getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                    }
                }

                if( linkType === "External Click"
                    && options.dynamicEvents.hasOwnProperty("automatic_event_outbound_link")
                ) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_outbound_link);

                    for(var i = 0;i<pixels.length;i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_outbound_link[pixels[i]]);

                        if(pixels[i] !== "tiktok") { // TT doesn't support custom parameters
                            event.params["text"] = text;
                            if(target_url){
                                event.params["target_url"] = target_url;
                            }
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                        }


                        getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                    }
                }




            });

        }

        // setup AdSense Event
        if (options.dynamicEvents.hasOwnProperty("automatic_event_adsense")) {

            var isOverGoogleAd = false;

            $(document)
                .on('mouseover', 'ins iframe', function () { //class adsbygoogle adsbygoogle-noablate ??
                    isOverGoogleAd = true;
                })
                .on('mouseout', 'iframe', function () {
                    isOverGoogleAd = false;
                });

            $(window)
                .on( "blur",function () {
                    if (isOverGoogleAd) {
                        console.log('automatic_event_adsense')
                        if(options.dynamicEvents.hasOwnProperty("automatic_event_adsense")) {
                            var pixels = Object.keys(options.dynamicEvents.automatic_event_adsense);
                            for (var i = 0; i < pixels.length; i++) {
                                var event = Utils.clone(options.dynamicEvents.automatic_event_adsense[pixels[i]]);
                                Utils.copyProperties(Utils.getRequestParams(), event.params);
                                getPixelBySlag(pixels[i]).onAdSenseEvent(event);
                            }
                        }

                        $.each(options.triggerEventTypes, function (triggerType, events) {
                            $.each(events, function (eventId, triggers) {
                                switch (triggerType) {
                                    case 'ad_sense_click':
                                        Utils.fireTriggerEvent(eventId);
                                        break;
                                }
                            });
                        });
                    }
                })
                .trigger("focus");

        }

        //setup adsense for custom events
        var dynamicAdsenseEventsTriggers = 0
        $.each(options.triggerEventTypes, function (triggerType, events) {
            if(triggerType == "ad_sense_click") {
                dynamicAdsenseEventsTriggers++;
            }
        });
        if (dynamicAdsenseEventsTriggers > 0) {

            var isOverGoogleAd = false;

            $(document)
                .on('mouseover', 'ins > ins > iframe', function () {
                    isOverGoogleAd = true;
                })
                .on('mouseout', 'iframe', function () {
                    isOverGoogleAd = false;
                });

            $(window)
                .on( "blur",function () {
                    if (isOverGoogleAd) {

                        $.each(options.triggerEventTypes, function (triggerType, events) {
                            $.each(events, function (eventId, triggers) {
                                switch (triggerType) {
                                    case 'ad_sense_click':
                                        Utils.fireTriggerEvent(eventId);
                                        break;
                                }
                            });
                        });
                    }
                })
                .trigger("focus");

        }


        // page scroll event
        if (options.dynamicEvents.hasOwnProperty("automatic_event_scroll")
        ) {

            var singlePageScroll = function () {


                var docHeight = $(document).height() - $(window).height();
                var isFired = false;

                if (options.dynamicEvents.hasOwnProperty("automatic_event_scroll")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_scroll);
                    for(var i = 0;i<pixels.length;i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_scroll[pixels[i]]);
                        var scroll = Math.round(docHeight * event.scroll_percent / 100)// convert % to absolute positions

                        if(scroll < $(window).scrollTop()) {
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onPageScroll(event);
                            isFired = true
                        }
                    }
                }
                if(isFired) {
                    $(document).off("scroll",singlePageScroll);
                }
            }
            $(document).on("scroll",singlePageScroll);
        }


        if (options.dynamicEvents.hasOwnProperty("automatic_event_time_on_page")) {
            var pixels = Object.keys(options.dynamicEvents.automatic_event_time_on_page);
            var time = options.dynamicEvents.automatic_event_time_on_page[pixels[0]].time_on_page; // the same for all pixel
            setTimeout(function(){
                for(var i = 0;i<pixels.length;i++) {
                    var event = Utils.clone(options.dynamicEvents.automatic_event_time_on_page[pixels[i]]);
                    Utils.copyProperties(Utils.getRequestParams(), event.params);
                    getPixelBySlag(pixels[i]).onTime(event);
                }
            },time*1000);
        }

        // setup Dynamic events

        $.each(options.triggerEventTypes, function (triggerType, events) {

            $.each(events, function (eventId, triggers) {
                switch (triggerType) {
                    case 'url_click':
                        //@see: Utils.setupURLClickEvents()
                        break;

                    case 'css_click':
                        Utils.setupCSSClickEvents(eventId, triggers);
                        break;

                    case 'css_mouseover':
                        Utils.setupMouseOverClickEvents(eventId, triggers);
                        break;

                    case 'scroll_pos':
                        Utils.setupScrollPosEvents(eventId, triggers);
                        break;
                    case 'comment':
                        Utils.setupCommentEvents(eventId, triggers);
                        break;
                }

            });

        });

        // setup WooCommerce events
        if (options.woo.enabled) {

            // Woo CartFlow AddToCart
            if (options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_next_step_click")) {
                $("body").on("click",'.wcf-next-step-link',function () {
                    var pixels = Object.keys(options.dynamicEvents.wcf_add_to_cart_on_next_step_click);
                    for(var i = 0;i<pixels.length;i++) {
                        var event = Utils.clone(options.dynamicEvents.wcf_add_to_cart_on_next_step_click[pixels[i]])
                        getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                    }
                });
            }
            // Woo CartFlow Bump AddToCart
            if(options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_bump_click") ||
                options.dynamicEvents.hasOwnProperty("wcf_bump")) {
                $("body").on('change','.wcf-bump-order-cb',function () {

                    if(this.checked) {
                        if(options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_bump_click")) {
                            var pixels = Object.keys(options.dynamicEvents.wcf_add_to_cart_on_bump_click);
                            for(var i = 0;i<pixels.length;i++) {
                                var event = Utils.clone(options.dynamicEvents.wcf_add_to_cart_on_bump_click[pixels[i]]);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }


                        if(options.dynamicEvents.hasOwnProperty("wcf_bump")) {
                            var pixels = Object.keys(options.dynamicEvents.wcf_bump);
                            for(var i = 0;i<pixels.length;i++) {
                                var event = Utils.clone(options.dynamicEvents.wcf_bump[pixels[i]]);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }

                    } else {
                        if(options.dynamicEvents.hasOwnProperty("wcf_remove_from_cart_on_bump_click")) {
                            var pixels = Object.keys(options.dynamicEvents.wcf_remove_from_cart_on_bump_click);
                            for(var i = 0;i<pixels.length;i++) {
                                var event = Utils.clone(options.dynamicEvents.wcf_remove_from_cart_on_bump_click[pixels[i]]);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }

                    }


                });
            }


            // WooCommerce AddToCart
            if (options.dynamicEvents.hasOwnProperty("woo_add_to_cart_on_button_click")
                && options.woo.hasOwnProperty("addToCartCatchMethod")
                && options.woo.addToCartCatchMethod === "add_cart_js"
            ) {

                // Loop, any kind of "simple" product, except external
                $('.add_to_cart_button:not(.product_type_variable,.product_type_bundle,.single_add_to_cart_button)').on("click",function (e) {

                    var product_id = $(this).data('product_id');

                    if (typeof product_id !== 'undefined') {
                        Facebook.onWooAddToCartOnButtonEvent(product_id,$(this));
                        Analytics.onWooAddToCartOnButtonEvent(product_id);
                        GAds.onWooAddToCartOnButtonEvent(product_id);
                        Pinterest.onWooAddToCartOnButtonEvent(product_id);
                        Bing.onWooAddToCartOnButtonEvent(product_id);
                        TikTok.onWooAddToCartOnButtonEvent(product_id);
                    }

                });

                // Single Product
                // tap try to https://stackoverflow.com/questions/30990967/on-tap-click-event-firing-twice-how-to-avoid-it
                //  $(document) not work
                $('body').onFirst('click','button.single_add_to_cart_button,.single_add_to_cart_button',function (e) {

                    var $button = $(this);

                    if ($button.hasClass('disabled')) {
                        return;
                    }

                    var $form = $button.closest('form');

                    var product_type = Utils.PRODUCT_SIMPLE;
                    var is_external = false;

                    if ($form.length === 0) {
                        is_external = true;
                    } else if ($form.hasClass('variations_form')) {
                        product_type = Utils.PRODUCT_VARIABLE;
                    } else if($form.hasClass('bundle_form')) {
                        product_type = Utils.PRODUCT_BUNDLE;
                    } else if($form.hasClass('grouped_form')) {
                        product_type = Utils.PRODUCT_GROUPED;
                    }



                    var product_id;
                    var qty;
                    if (product_type === Utils.PRODUCT_GROUPED) {
                        qty = 1;
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                    } else if (product_type === Utils.PRODUCT_VARIABLE) {
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                        var qtyTag = $form.find('input[name="quantity"]');
                        if(qtyTag.length <= 0) {
                            qtyTag = $form.find('select[name="quantity"]');
                        }
                        qty = parseInt(qtyTag.val());
                    } else if (is_external) {
                        product_id = options.woo.singleProductId;
                        qty = 1;
                    } else {
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                        var qtyTag = $form.find('input[name="quantity"]');
                        if(qtyTag.length <= 0) {
                            qtyTag = $form.find('select[name="quantity"]');
                        }
                        qty = parseInt(qtyTag.val());
                    }

                    Facebook.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    Analytics.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    GAds.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    Pinterest.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    Bing.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    TikTok.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                });

            }

            // WooCommerce Affiliate
            if (options.dynamicEvents.hasOwnProperty("woo_affiliate")) {

                // Loop, external
                $('.product_type_external').on("click",function (e) {

                    var product_id = $(this).data('product_id');

                    if (typeof product_id !== 'undefined') {
                        Facebook.onWooAffiliateEvent(product_id);
                        Analytics.onWooAffiliateEvent(product_id);
                        GAds.onWooAffiliateEvent(product_id);
                        Pinterest.onWooAffiliateEvent(product_id);
                        Bing.onWooAffiliateEvent(product_id);
                    }

                });

            }

            // WooCommerce RemoveFromCart
            if (options.dynamicEvents.hasOwnProperty("woo_remove_from_cart")) {

                $('body').on('click', options.woo.removeFromCartSelector, function (e) {

                    var $a = $(e.currentTarget),
                        href = $a.attr('href');

                    // extract cart item hash from remove button URL
                    var regex = new RegExp("[\\?&]remove_item=([^&#]*)"),
                        results = regex.exec(href);

                    if (results !== null) {

                        var item_hash = results[1];

                        if (options.dynamicEvents["woo_remove_from_cart"].hasOwnProperty(item_hash)) {
                            var events = options.dynamicEvents["woo_remove_from_cart"][item_hash];
                            Utils.fireEventForAllPixel("onWooRemoveFromCartEvent",events)
                        }

                    }

                });

            }

            // WooCommerce PayPal
            if (options.dynamicEvents.hasOwnProperty("woo_paypal")) {

                // Non-default binding used to avoid situations when some code in external js
                // stopping events propagation, eg. returns false, and our handler will never called
                $(document).onFirst('submit click', '#place_order', function (e) {

                    var method = $('form[name="checkout"] input[name="payment_method"]:checked').val();

                    if (method !== 'paypal') {
                        return;
                    }
                    var events = options.dynamicEvents.woo_paypal;
                    Utils.fireEventForAllPixel("onWooPayPalEvent",events)

                });

            }

            // WooCommerce checkout progress
            if(options.dynamicEvents.hasOwnProperty("woo_initiate_checkout_progress_f") ) {

                $(document).on("change",".woocommerce-validated #billing_first_name",function () {
                    Analytics.onWooCheckoutProgressStep(options.dynamicEvents.woo_initiate_checkout_progress_f[Analytics.tag()]);
                });
            }
            if(options.dynamicEvents.hasOwnProperty("woo_initiate_checkout_progress_l")) {

                $(document).on("change",".woocommerce-validated #billing_last_name",function () {
                    Analytics.onWooCheckoutProgressStep(options.dynamicEvents.woo_initiate_checkout_progress_l[Analytics.tag()]);
                });
            }

            if(options.dynamicEvents.hasOwnProperty("woo_initiate_checkout_progress_e")) {

                $(document).on("change",".woocommerce-validated #billing_email",function () {
                    Analytics.onWooCheckoutProgressStep(options.dynamicEvents.woo_initiate_checkout_progress_e[Analytics.tag()]);
                });
            }
            if(options.dynamicEvents.hasOwnProperty("woo_initiate_checkout_progress_o")) {
                $(document).onFirst('submit click', '#place_order', function () {
                    Analytics.onWooCheckoutProgressStep(options.dynamicEvents.woo_initiate_checkout_progress_o[Analytics.tag()]);
                });
            }


            // WooCommerce
            if(options.dynamicEvents.hasOwnProperty("woo_select_content_search") ||
                options.dynamicEvents.hasOwnProperty("woo_select_content_shop") ||
                options.dynamicEvents.hasOwnProperty("woo_select_content_tag") ||
                options.dynamicEvents.hasOwnProperty("woo_select_content_single") ||
                options.dynamicEvents.hasOwnProperty("woo_select_content_category")
            ) {
                $('.product.type-product a.woocommerce-loop-product__link').onFirst('click', function (evt) {
                    var productId = $(this).parent().find("a.add_to_cart_button").attr("data-product_id");
                    if(options.dynamicEvents.hasOwnProperty("woo_select_content_search") &&
                        options.dynamicEvents.woo_select_content_search.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_search[productId][Analytics.tag()]);
                    } else if(options.dynamicEvents.hasOwnProperty("woo_select_content_shop") &&
                        options.dynamicEvents.woo_select_content_shop.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_shop[productId][Analytics.tag()]);
                    } else if(options.dynamicEvents.hasOwnProperty("woo_select_content_tag") &&
                        options.dynamicEvents.woo_select_content_tag.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_tag[productId][Analytics.tag()]);
                    } else if(options.dynamicEvents.hasOwnProperty("woo_select_content_single") &&
                        options.dynamicEvents.woo_select_content_single.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_single[productId][Analytics.tag()]);
                    } else if(options.dynamicEvents.hasOwnProperty("woo_select_content_category") &&
                        options.dynamicEvents.woo_select_content_category.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_category[productId][Analytics.tag()]);
                    }
                });
            }
        }

        // setup EDD events
        if (options.edd.enabled) {

            // EDD AddToCart
            if (options.dynamicEvents.hasOwnProperty("edd_add_to_cart_on_button_click")) {

                $('form.edd_download_purchase_form .edd-add-to-cart').on("click",function (e) {

                    var $button = $(this);
                    var $form = $button.closest('form');
                    var variable_price = $button.data('variablePrice'); // yes/no
                    var price_mode = $button.data('priceMode'); // single/multi
                    var ids = [];
                    var quantities = [];
                    var qty;
                    var id;

                    if (variable_price === 'yes' && price_mode === 'multi') {

                        id = $form.find('input[name="download_id"]').val();

                        // get selected variants
                        $.each($form.find('input[name="edd_options[price_id][]"]:checked'), function (i, el) {
                            ids.push(id + '_' + $(el).val());
                        });

                        // get qty for selected variants
                        $.each(ids, function (i, variant_id) {

                            var variant_index = variant_id.split('_', 2);
                            qty = $form.find('input[name="edd_download_quantity_' + variant_index[1] + '"]').val();

                            if (typeof qty !== 'undefined') {
                                quantities.push(qty);
                            } else {
                                quantities.push(1);
                            }

                        });

                    } else if (variable_price === 'yes' && price_mode === 'single') {

                        id = $form.find('input[name="download_id"]').val();
                        ids.push(id + '_' + $form.find('input[name="edd_options[price_id][]"]:checked').val());

                        qty = $form.find('input[name="edd_download_quantity"]').val();

                        if (typeof qty !== 'undefined') {
                            quantities.push(qty);
                        } else {
                            quantities.push(1);
                        }

                    } else {

                        ids.push($button.data('downloadId'));

                        qty = $form.find('input[name="edd_download_quantity"]').val();

                        if (typeof qty !== 'undefined') {
                            quantities.push(qty);
                        } else {
                            quantities.push(1);
                        }
                    }

                    // fire event for each download/variant
                    $.each(ids, function (i, download_id) {

                        var q = parseInt(quantities[i]);
                        var variant_index = download_id.toString().split('_', 2);
                        var price_index;

                        if (variant_index.length === 2) {
                            download_id = variant_index[0];
                            price_index = variant_index[1];
                        }

                        Facebook.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Analytics.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        GAds.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Pinterest.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Bing.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        TikTok.onEddAddToCartOnButtonEvent(download_id, price_index, q);

                    });

                });

            }

            // EDD RemoveFromCart
            if (options.dynamicEvents.hasOwnProperty("edd_remove_from_cart") ) {

                $('form#edd_checkout_cart_form .edd_cart_remove_item_btn').on("click",function (e) {

                    var href = $(this).attr('href');
                    var key = href.substring(href.indexOf('=') + 1).charAt(0);

                    if (options.dynamicEvents.edd_remove_from_cart.hasOwnProperty(key)) {
                        var events = options.dynamicEvents.edd_remove_from_cart[key];
                        Utils.fireEventForAllPixel("onEddRemoveFromCartEvent",events)
                    }

                });

            }

        }

        Utils.setupURLClickEvents();

        // setup Comment Event
        if (options.dynamicEvents.hasOwnProperty("automatic_event_comment")
        ) {

            $('form.comment-form').on("submit",function () {
                if (options.dynamicEvents.hasOwnProperty("automatic_event_comment")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_comment);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_comment[pixels[i]]);
                        Utils.copyProperties(Utils.getRequestParams(), event.params);
                        getPixelBySlag(pixels[i]).onCommentEvent(event);
                    }
                }
            });

        }

        // setup Form Event
        if ( options.dynamicEvents.hasOwnProperty("automatic_event_form")) {

            $(document).onFirst('submit', 'form', function (e) {

                var $form = $(this);

                // exclude WP forms
                if ($form.hasClass('comment-form') || $form.hasClass('search-form') || $form.attr('id') === 'adminbarsearch') {
                    return;
                }

                // exclude Woo forms
                if ($form.hasClass('woocommerce-product-search') || $form.hasClass('cart') || $form.hasClass('woocommerce-cart-form') ||
                    $form.hasClass('woocommerce-shipping-calculator') || $form.hasClass('checkout') || $form.hasClass('checkout_coupon')) {
                    return;
                }

                // exclude EDD forms
                if ($form.hasClass('edd_form') || $form.hasClass('edd_download_purchase_form')) {
                    return;
                }
                // exclude CF7 forms
                if ($form.hasClass('wpcf7-form')) {
                    return;
                }
                // exclude Forminator forms
                if ($form.hasClass('forminator-custom-form') || $form.hasClass('forminator_ajax')) {
                    return;
                }
                // exclude WPforms forms
                if ($form.hasClass('wpforms-form') || $form.hasClass('wpforms-ajax-form')) {
                    return;
                }
                // exclude Formidable forms
                /*if ($form.hasClass('frm-show-form')) {
                    return;
                }*/
                // exclude Ninja Forms forms
                if ($form.parent().hasClass('nf-form-layout')) {
                    return;
                }
                // exclude Fluent forms
                if ($form.hasClass('frm-fluent-form')) {
                    return;
                }
                if(!options.enable_success_send_form) {
                    var params = {
                        form_id: $form.attr('id'),
                        form_class: $form.attr('class'),
                        text: $form.find('[type="submit"]').is('input') ?
                            $form.find('[type="submit"]').val() : $form.find('[type="submit"]').text()
                    };

                    if (options.dynamicEvents.hasOwnProperty("automatic_event_form")) {
                        var pixels = Object.keys(options.dynamicEvents.automatic_event_form);
                        for (var i = 0; i < pixels.length; i++) {
                            var event = Utils.clone(options.dynamicEvents.automatic_event_form[pixels[i]]);

                            if (pixels[i] === "tiktok") {
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            } else {
                                Utils.copyProperties(params, event.params,)
                                Utils.copyProperties(Utils.getRequestParams(), event.params);
                                getPixelBySlag(pixels[i]).onFormEvent(event);
                            }
                        }
                    }
                }
            });
            document.addEventListener( 'wpcf7mailsent', function( event ) {
                var form_id = event.detail.contactFormId;
                var sendEventId = null;
                var disabled_form_action = false;
                if(options.triggerEventTypes.hasOwnProperty('CF7'))
                {
                    key_event = Object.keys(options.triggerEventTypes.CF7)[0];
                    if(options.triggerEventTypes.CF7[key_event].hasOwnProperty('disabled_form_action'))
                    {
                        disabled_form_action = options.triggerEventTypes.CF7[key_event].disabled_form_action;
                    }
                    $.each(options.triggerEventTypes.CF7, function (eventId, triggers) {
                        $.each(triggers.forms, function (index, value) {
                            if(value == form_id) {
                                sendEventId=eventId;
                            };
                        });
                    });
                }
                if(sendEventId != null)
                {
                    Utils.fireTriggerEvent(sendEventId);

                    if(!disabled_form_action)
                    {
                        sendFormAction($(event.target), form_id);
                    }
                }
                else {
                    sendFormAction($(event.target), form_id);
                }
            }, false );
            //Forminator
            $(document).on( 'forminator:form:submit:success', function( event ){
                var form_id = $(event.target).find('input[name="form_id"]').val();
                var sendEventId = null;
                var disabled_form_action = false;
                if(options.triggerEventTypes.hasOwnProperty('forminator'))
                {
                    key_event = Object.keys(options.triggerEventTypes.forminator)[0];
                    if(options.triggerEventTypes.forminator[key_event].hasOwnProperty('disabled_form_action'))
                    {
                        disabled_form_action = options.triggerEventTypes.forminator[key_event].disabled_form_action;
                    }
                    $.each(options.triggerEventTypes.forminator, function (eventId, triggers) {
                        $.each(triggers.forms, function (index, value) {
                            if(value == form_id) {
                                sendEventId=eventId;
                            };
                        });
                    });
                }
                if(sendEventId != null)
                {
                    Utils.fireTriggerEvent(sendEventId);

                    if(!disabled_form_action)
                    {
                        sendFormAction($(event.target), form_id);
                    }
                }
                else {
                    sendFormAction($(event.target), form_id);
                }

            });

            //WPForm
            $('form.wpforms-form').on('wpformsAjaxSubmitSuccess', (event) => {
                var form_id = $(event.target).attr('data-formid');
                var sendEventId = null;
                var disabled_form_action = false;
                if(options.triggerEventTypes.hasOwnProperty('wpforms'))
                {
                    key_event = Object.keys(options.triggerEventTypes.wpforms)[0];
                    if(options.triggerEventTypes.wpforms[key_event].hasOwnProperty('disabled_form_action'))
                    {
                        disabled_form_action = options.triggerEventTypes.wpforms[key_event].disabled_form_action;
                    }
                    $.each(options.triggerEventTypes.wpforms, function (eventId, triggers) {
                        $.each(triggers.forms, function (index, value) {
                            if(value == form_id) {
                                sendEventId=eventId;
                            };
                        });
                    });
                }
                if(sendEventId != null)
                {
                    Utils.fireTriggerEvent(sendEventId);

                    if(!disabled_form_action)
                    {
                        sendFormAction($(event.target), form_id);
                    }
                }
                else {
                    sendFormAction($(event.target), form_id);
                }
            })
            $(document).on( 'frmFormComplete', function( event, form, response ) {
                const form_id = $(form).find('input[name="form_id"]').val();
                var sendEventId = null;
                var disabled_form_action = false;
                if(options.triggerEventTypes.hasOwnProperty('formidable'))
                {
                    key_event = Object.keys(options.triggerEventTypes.formidable)[0];
                    if(options.triggerEventTypes.formidable[key_event].hasOwnProperty('disabled_form_action'))
                    {
                        disabled_form_action = options.triggerEventTypes.formidable[key_event].disabled_form_action;
                    }
                    $.each(options.triggerEventTypes.formidable, function (eventId, triggers) {
                        $.each(triggers.forms, function (index, value) {
                            if(value == form_id) {
                                sendEventId=eventId;
                            };
                        });
                    });
                }
                if(sendEventId != null)
                {
                    Utils.fireTriggerEvent(sendEventId);

                    if(!disabled_form_action)
                    {
                        sendFormAction($(event.target), form_id);
                    }
                }
                else {
                    sendFormAction($(event.target), form_id);
                }
            });
            // Ninja Forms
            $(document).onFirst('nfFormSubmitResponse', function (event, data) {
                const form_id = data.response.data.form_id;
                var sendEventId = null;
                var disabled_form_action = false;
                if(options.triggerEventTypes.hasOwnProperty('ninjaform'))
                {
                    key_event = Object.keys(options.triggerEventTypes.ninjaform)[0];
                    if(options.triggerEventTypes.ninjaform[key_event].hasOwnProperty('disabled_form_action'))
                    {
                        disabled_form_action = options.triggerEventTypes.ninjaform[key_event].disabled_form_action;
                    }
                    $.each(options.triggerEventTypes.ninjaform, function (eventId, triggers) {
                        $.each(triggers.forms, function (index, value) {
                            if(value == form_id) {
                                sendEventId=eventId;
                            };
                        });
                    });
                }
                if(sendEventId != null)
                {
                    Utils.fireTriggerEvent(sendEventId);

                    if(!disabled_form_action)
                    {
                        sendFormAction($(event.target), form_id);
                    }
                }
                else {
                    sendFormAction($(event.target), form_id);
                }
            });

            var fluentForms = $('form.frm-fluent-form');
            fluentForms.each(function() {
                var $form = $(this);
                $form.on('fluentform_submission_success', function(event) {
                    var $formItem = $(this);
                    var form_id = $formItem.attr('data-form_id');
                    var sendEventId = null;
                    var disabled_form_action = false;
                    if(options.triggerEventTypes.hasOwnProperty('fluentform'))
                    {
                        key_event = Object.keys(options.triggerEventTypes.fluentform)[0];
                        if(options.triggerEventTypes.fluentform[key_event].hasOwnProperty('disabled_form_action'))
                        {
                            disabled_form_action = options.triggerEventTypes.fluentform[key_event].disabled_form_action;
                        }
                        $.each(options.triggerEventTypes.fluentform, function (eventId, triggers) {
                            $.each(triggers.forms, function (index, value) {
                                if(value == form_id) {
                                    sendEventId=eventId;
                                };
                            });
                        });
                    }
                    if(sendEventId != null)
                    {
                        Utils.fireTriggerEvent(sendEventId);

                        if(!disabled_form_action)
                        {
                            sendFormAction($(event.target), form_id);
                        }
                    }
                    else {
                        sendFormAction($(event.target), form_id);
                    }
                });
            });

        }

        // load pixel APIs
        Utils.loadPixels();

        // setup Enrich content
        if(Utils.isCheckoutPage()) {
            Utils.addCheckoutFields();
        }
    });


    // load WatchVideo event APIs for Auto
    if (options.automatic.enable_video) {
        /**
         * Real Cookie Banner.
         */
        var consentApi = window.consentApi;
        if (consentApi && options.gdpr.real_cookie_banner_integration_enabled) {
            if (options.automatic.enable_youtube

            ) {
                window.consentApi.consent("http", "CONSENT", ".youtube.com").then(Utils.initYouTubeAPI);
            }
            if (options.automatic.enable_vimeo

            ) {
                window.consentApi.consent("http", "player", ".vimeo.com").then(Utils.initVimeoAPI);
            }
        }else{
            if (options.automatic.enable_youtube
            ) {
                Utils.initYouTubeAPI();
            }
            if (options.automatic.enable_vimeo
            ) {
                Utils.initVimeoAPI();
            }
        }
    }

    var sendFormAction = function (form_target, formId){
        var params = {
                form_id: formId,
                text: form_target.find('[type="submit"]').is('input') ? form_target.find('[type="submit"]').val() :
                    form_target.find('.forminator-button-submit').text() != '' ? form_target.find('.forminator-button-submit').text() :
                    form_target.find('[type="submit"]').text()
            };

            if (options.dynamicEvents.hasOwnProperty("automatic_event_form")) {
                var pixels = Object.keys(options.dynamicEvents.automatic_event_form);
                for (var i = 0; i < pixels.length; i++) {
                    var event = options.dynamicEvents.automatic_event_form[pixels[i]];
                    if (pixels[i] === "tiktok") {
                        getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                    } else {
                        Utils.copyProperties(params, event.params)
                        Utils.copyProperties(Utils.getRequestParams(), event.params);
                        getPixelBySlag(pixels[i]).onFormEvent(event);
                    }
                }
            }
    }


}(jQuery, pysOptions);

function pys_generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

function getBundlePriceOnSingleProduct(data) {
    var items_sum = 0;
    jQuery(".bundle_form .bundled_product").each(function(index){
        var id = jQuery(this).find(".cart").data("bundled_item_id");
        var item_price = data.prices[id];
        var item_quantity = jQuery(this).find(".bundled_qty").val();
        if(!jQuery(this).hasClass("bundled_item_optional") ||
            jQuery(this).find(".bundled_product_optional_checkbox input").prop('checked')) {
            items_sum += item_price*item_quantity;
        }
    });
    return items_sum;
}

function getPixelBySlag(slug) {
    switch (slug) {
        case "facebook": return window.pys.Facebook;
        case "ga": return window.pys.Analytics;
        case "google_ads": return window.pys.GAds;
        case "bing": return window.pys.Bing;
        case "pinterest": return window.pys.Pinterest;
        case "tiktok": return window.pys.TikTok;
    }
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}