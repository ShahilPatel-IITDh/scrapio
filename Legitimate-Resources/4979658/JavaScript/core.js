$jq.namespace('MatchCore');
MatchCore.CPX = function(){ 
    var _sid = "", _theme = 0;
    var _trackingID, _bannerID, _pageID, _pageVersion, _cpServer, _cpResourceRoot, _mauth, _environment;
    var _postedForm = null;
    var _readyDelegate = new MatchCore.Delegate();
    var _ready = false;
    var self = {
        SID: function(sid) {
            if (arguments.length > 0) {
                _sid = sid;
            } else {
                return _sid;
            }
        },
        Theme: function(theme) {
            if (arguments.length > 0) {
                _theme = theme;
            } else {
                return _theme;
            }
        },
        TrackingID: function(trackingID) {
            if (arguments.length > 0) {
                _trackingID = trackingID;
            } else {
                return _trackingID;
            }
        },
        CpServer: function(cpServer) {
            if (arguments.length > 0) {
                _cpServer = cpServer;
            } else {
                return _cpServer;
            }
        },
        CpResourceRoot: function(cpResourceRoot) {
            if (arguments.length > 0) {
                _cpResourceRoot = cpResourceRoot;
            } else {
                return _cpResourceRoot;
            }
        },
        BannerID: function(bannerID) {
            if (arguments.length > 0) {
                _bannerID = bannerID;
            }
            else {
                return _bannerID;
            }
        },
        PageID: function(pageID) {
            if (arguments.length > 0) {
                _pageID = pageID;
            } else {
                return _pageID;
            }
        },
        PageVersion: function(pageVersion) {
            if (arguments.length > 0) {
                _pageVersion = pageVersion;
            } else {
                return _pageVersion;
            }
        },
        PostedForm: function(form) {
            if (arguments.length > 0) {
                _postedForm = form;
            } else {
                return _postedForm;
            }
        },
        Mauth: function(mauth) {
            if (arguments.length > 0) {
                _mauth = mauth;
            } else {
                return _mauth;
            }
        },
        Environment: function (environment) {
            if (arguments.length > 0) {
                _environment = environment;
            } else {
                return _environment;
            }
        },
        init: function() {
            MatchCore.CPX.ClientMessages = {};
            if ($jq.readCookie('SECU')) {
                _sid = $jq.readCookie('SECU')['ESID'];
                _theme = $jq.readCookie('SECU')['THEME'];
            }
            MatchCore.CPX.CurrentUser.onReady(function() {
                if (MatchCore.CPX.CurrentUser.LoggedIn()) {
                    $jq('BODY').addClass('cp_userLoggedIn');
                    $jq('.cp_renderHandle').text(MatchCore.CPX.CurrentUser.Handle());
                }
                if (MatchCore.CPX.CurrentUser.Registered()) $jq('BODY').addClass('cp_userRegistered');
                if (MatchCore.CPX.CurrentUser.Subscribed()) $jq('BODY').addClass('cp_userSubscribed');
            });
            $jq.ajax({
                type: 'GET',
                url: MatchCore.Application.resolveUrl('~/rest/MainService.ashx/GetClientMessages'),
                dataType: 'json',
                async: false,
                success: function(response) {
                    MatchCore.CPX.ClientMessages = response;
                }
            });
        },
        onReady: function(handler) {
            _readyDelegate.add(handler);
            if (_ready)
                _readyDelegate.fire();
        },
        ready: function() {
            _ready = true;
            _readyDelegate.fire();
        },
        ui_busy: function() {
            $jq('BODY').addClass('cp_working');
        },
        ui_done: function() {
            $jq('BODY').removeClass('cp_working');
        },
        getAsset: function(path) {
            return self.CpServer() + path;
        }
    };
    return self;
}();

MatchCore.CPX.CurrentUser = function(){
    var _handle = "";
    var _subscribed = false;
    var _loggedIn = false;
    var _registered = false;
    var _machineId = "";
    var _registeredDomain = false;
    var _emailAddress = "";
    var _token = "";
    var _readyDelegate = new MatchCore.Delegate();
    return {
        Handle: function(handle) {
            if (arguments.length > 0) {
                _handle = handle;
            } else {
                return _handle;
            }
        },
        Subscribed: function(subscribed) {
            if (arguments.length > 0) {
                _subscribed = subscribed;
            } else {
                return _subscribed;
            }
        },
        MachineId: function (machineId) {
            if (arguments.length > 0) {
                _machineId = machineId;
            } else {
                return _machineId;
            }
        },
        Registered: function(registered) {
            if (arguments.length > 0) {
                _registered = registered;
            } else {
                return _registered;
            }
        },
        RegisteredDomain: function(registeredDomain) {
            if (arguments.length > 0) {
                _registeredDomain = registeredDomain;
            } else {
                return _registeredDomain;
            }
        },
        LoggedIn: function(loggedIn) {
            if (arguments.length > 0) {
                _loggedIn = loggedIn;
            } else {
                return _loggedIn;
            }
        },
        onReady: function(handler) {
            _readyDelegate.add(handler);
        },
        ready: function() {
            _readyDelegate.fire();
        },
        EmailAddress: function(emailAddress) {
            if (arguments.length > 0) {
                _emailAddress = emailAddress;
            } else {
                return _emailAddress;
            }
        },
        Token: function (token) {
            if (arguments.length > 0) {
                _token = token;
            } else {
                return _token;
            }
        }
    };
}();

MatchCore.CPX.Services = function(){
    var _proxy = new MatchCore.ServiceProxy(MatchCore.Application.resolveUrl('~/rest/MainService.ashx'));
    return {
        persistCookies: function (response) {
            if (response.Cookies) {
                for (var key in response.Cookies) {
                    $jq.createCookie(key, response.Cookies[key], 30);
                }
            }
        },
        invoke: function (opts) {
            _proxy.invoke(opts);
        }
    };
}();

MatchCore.CPX.Validation = function(){
    var USPostalCodeRegex = /^[0-9]{5}$/;
    var CanadianPostalCodeRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
    var firstNameDigitRegex=/\d/;
    var firstNameSpaceRegex=/\ /;
    var firstNameUnderScoreRegex=/\_/;
    var firstNameRegex = /^[a-zA-Z0-9 '-]+$/;
    return {
        isValidPostalCode: function (postalCode) {
            try {
                postalCode = postalCode.toUpperCase();
                if (USPostalCodeRegex.test(postalCode)) return true;
                else if (CanadianPostalCodeRegex.test(postalCode)) return true;
            }
            catch (e) { return false; }
            return false;
        }, 
        isValidAge: function (m, d, y) {
            var tDt = new Date();
            var uDt = new Date(y, (m - 1), d);
            var age = Math.floor((tDt - uDt) / (60 * 60 * 24 * 1000 * 365.25));
            return ( (age < 18) ? false : true );
        },
        isValidFirstName: function(firstname){
            var errors = [];
            try{                    
                    if(firstNameSpaceRegex.test(firstname)) {                        
                        errors.push('First Name Error - Contains Spaces');                    
                    }

                    if(firstNameDigitRegex.test(firstname)){
                        errors.push('First Name Error - Contains Numbers');
                    }

                    if(firstNameUnderScoreRegex.test(firstname)){
                        errors.push('First Name Error - Contains Underscores');
                    }
            }
            catch(e){}
            return errors;
        },
        isFirstNameValid: function (firstname) {
            var errors = [];
            try {
                if (firstNameSpaceRegex.test(firstname)) {
                    errors.push({ Field:"firstname",Text:"Spaces aren't allowed in your first name. Please re-enter using letters, hyphens, and apostrophes."});
                }
                if (firstNameDigitRegex.test(firstname)) {
                    errors.push({ Field: "firstname", Text: "Numbers can't be used in your first name. Please re-enter using letters, hyphens, and apostrophes." });
                }
                if (firstname != '' && !firstNameRegex.test(firstname)) {
                    errors.push({ Field: "firstname", Text: "Special characters are not allowed in your first name. Please re-enter using letters, hyphens, and apostrophes." });
                }
                if (firstname.length == 1) {
                    errors.push({ Field:"firstname",Text: "Please re-enter your first name with at least 2 characters."});
                }
            }
            catch (e) { }
            return errors;
        }
    }
}();

MatchCore.CPX.Detection = function(){
    var _cookie_enabled = (navigator.cookieEnabled) ? true : false;
    var _recipe = "";
    function mixCookie(r) {
        _recipe = (r != null) ? r : "test";
        document.cookie = _recipe + "=1";
    }
    function eatCookie() {
        var _expire = new Date();
        _expire.setTime(_expire.getTime() - 1);
        document.cookie = _recipe + "=-1; expires=" + _expire.toGMTString();
    }
    function bakeCookie() {
        if (typeof navigator.cookieEnabled == "undefined" && !_cookie_enabled) {
            _cookie_enabled = (document.cookie.indexOf(_recipe) != -1) ? true : false;
        }
    }
    return {
        init: function () { mixCookie("CookieDetection"); bakeCookie(); eatCookie(); },
        setCookiesView: function (hide, show) {
            if (!_cookie_enabled) {
                if (hide != null) hide.hide();
                if (show != null) show.show();
            } else {
                if (show != null) show.hide();
            }
        }
    }
}();

MatchCore.CPX.Messaging = function(){
    var _messages = null;
    var _status = null;
    var hasMessageSummary = function () {
        return $jq('.errorMessageSummary').length > 0;
    };
    var getMessageSummary = function() {
        return $jq('.errorMessageSummary');
    };
    var hasFieldLevelError = function(fieldName) {
        return $jq('.error_' + fieldName).length > 0;
    };
    var getFieldLevelError = function(fieldName) {
        return $jq('.error_' + fieldName).filter('.fieldError');
    };
    return {
        reset : function() {
            if (hasMessageSummary) {
                getMessageSummary().hide().html("");
            }
            $jq('.fieldError').each(function() { $jq(this).hide(); });
            if (_messages) {
                for (var i = 0; i < _messages.length; i++) {
                    var field = $jq('INPUT[name="' + _messages[i].Field + '"]')[0];
                    var label = $jq('LABEL[for="' + _messages[i].Field + '"]')[0];
                    $jq(label).removeClass('invalidFieldLabel');
                    $jq(field).removeClass('invalidField');
                }
            }
            _messages = null;
        },
        show : function(messages,status) {
            this.reset();
            _status = (status == null || status == undefined || status.toLowerCase() == 'error') ? 'error' : 'success';
            _messages = messages;
            if (hasMessageSummary()) {
                getMessageSummary().html('<ul class="' + _status + '"></ul>').show();
            }
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].Field) {
                    var field = $jq('INPUT[name="' + messages[i].Field + '"]');
                    var label = $jq('LABEL[for="' + messages[i].Field + '"]');
                    label.addClass('invalidFieldLabel');
                    field.addClass('invalidField');
                    if (i == 0 && field.length > 0) field.focus();
                    if (hasFieldLevelError(messages[i].Field)) {
                        var fieldError = getFieldLevelError(messages[i].Field);
                        fieldError.html(messages[i].Text);
                        fieldError.show();                      
                    }
                }
                if (hasMessageSummary()) $jq('UL', getMessageSummary()[0]).append('<li>' + messages[i].Text + '</li>');
            }
        }
    };
}();

MatchCore.CPX.Logging = function() {

    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    };

    var escapeHtml = function (string) {
        return String(string).replace(/[&<>]/g, function (s) {
            return entityMap[s];
        });
    }

    var cleanPagePath = function () {
        var pageID = MatchCore.CPX.PageID()
        var slash1 = /^\/s+/;
        var slash2 = /\/$/;
        var path = pageID.replace(slash1, "").replace(slash2, "");
        return path;
    }

    var logPageView = function(path, lid) {
                var path = escapeHtml(path)
                var url;
                try {
                    if (MatchCore.CPX.Environment() != "Production" || window.location.search.toLowerCase().indexOf("cplog=1") > -1)
                        console.log('logging: ', path)
                }
                catch (e){ }

                if (lid){
                    url = '/site/pageview/?lid=' + lid;
                }else{
                    url = '/site/pageview/';
                }

                $jq.ajax({
                  type: 'POST',
                  url: url,
                  data: { path: path },
                  async:false
                });

            }

        return {
            logRegFunnel: function (step, details) {
                if (details == undefined) {
                    details = " |";
                } else {
                    details = " | " + details
                }

                var path = "reg funnel" + " | " + step + " | " + cleanPagePath() + details;

                logPageView(path)
            },
            logRegEvent: function (step, details) {
                if (details == undefined) {
                    details = " |";
                } else {
                    details = " | " + details
                }

                var path = "reg event" + " | " + step + " | " + cleanPagePath() + details;

                logPageView(path)
            },
            logRegError: function (step, details, value) {
                if (value == undefined) {
                    value = '';
                } else {
                    value = " | {value: " + value + "}";
                }
                if (details == undefined) {
                    details = '';
                } else {
                    details = " | " + details
                }
                var path = "reg error" + " | " + step + " | " + cleanPagePath() + details;
                logPageView(path)
            },
            logRegSurvey: function (step, details) {
                if (details == undefined) {
                    details = '';
                } else {
                    details = " | " + details
                }
                var path = "reg survey" + " | " + step + " | " + cleanPagePath() + details;
                logPageView(path)
            }
        
    };
}();

MatchCore.CPX.Facebook = function () {
    var uri = decodeURIComponent(window.location.href.split("?")[1]);
    var queryString = $jq.parseKeyValueString(uri);
    var logRegEvent = MatchCore.CPX.Logging.logRegEvent,
    logRegError = MatchCore.CPX.Logging.logRegError;

    var _fb = {
        appId: '',//set by page
        version: 'v4.0',
        data: {},
        user: {},
        redirectFromFacebook: queryString.fb == "1"
    }

    var profilePhotoURL = null;
    var userFBID = null;
    var isSilhouette = false;
    var dataToImport = "";
    var authToken = "";
    var authData = null;
    var isFbLogin = null;

    return {
        _fb: _fb,
        isFbLogin: function(){ return isFbLogin },
        profilePhotoURL: function(){ return profilePhotoURL },
        isSilhouette: function(){ return isSilhouette },
        fbConnect: function (callback) {
            var initObject = {
                appId: _fb.appId,
                version: _fb.version,
                status: true,
                cookie: true,
                xfbml: true,
                oauth: true
            };
            var e = document.createElement('script'); e.async = true;
            e.src = document.location.protocol + '//connect.facebook.net/en_US/sdk.js';
            document.getElementById('fb-root').appendChild(e);
            window.fbAsyncInit = function () {
                FB.init(initObject);
                

                FB.getLoginStatus(function (response) {
                    if (response.status == "connected") {
                        isFbLogin = true;
                    }
                    callback(response);
                });
            };
        },
        getAuthUrl: function (cpRedirectUrl) {
            //Remove duplicate parameters and error containing fb code on redirecting back to site
            var items = []; var params = [];
            cpRedirectUrl.split('?')[1].split("&").forEach(function (item) {
                if (params.indexOf(item.split("=")[0]) === -1) {
                    params.push(item.split("=")[0]);
                    if (item !== "error=access_denied" && item !== "error_code=200" && item !== "error_description=Permissions+error" && item !== "error_reason=user_denied#_=_")
                        items.push(item);
                }
            });
            cpRedirectUrl = cpRedirectUrl.split('?')[0] + "?" + items.join("&");

            cpRedirectUrl = encodeURIComponent(cpRedirectUrl);

            var validationString = "";
            var TOKEN = MatchCore.Application.AnonToken;
            if (TOKEN) {
                validationString = 'token:"' + TOKEN + '"'
            }
            var redirect_uri = 'https://www.match.com/facebookauth/gateway/';
            var state = '{' + validationString + ', redirectUrl:"' + cpRedirectUrl + '"}';
            var fbauthurl = "https://www.facebook.com/"+_fb.version+"/dialog/oauth?scope=email,user_photos&client_id=" + _fb.appId + "&redirect_uri=" + redirect_uri+ "&state="+state;
            return fbauthurl
        },
        getFBData: function (callback) {
            var uid = (_fb.data.authResponse.userID) ? _fb.data.authResponse.userID : "/me";
            FB.api(uid, { access_token: _fb.data.authResponse.accessToken, fields: 'id,name,email,first_name,gender,last_name,link,locale,middle_name,updated_time,verified' }, function (user) {
                _fb.user = user;
                var geo;
                var fbData = {};

                if (user.location && user.location.name) {
                    geo = user.location.name.split(",");
                    fbData.city = geo[0].replace(" ", "");
                    fbData.state = geo[1].replace(" ", "");
                }

                if (user.first_name) {
                    // data.handleBase = user.first_name;
                    var handleBase = user.first_name;
                    fbData.handleBase = handleBase.substring(0, 16);
                }
                userFBID = uid;
                authToken = _fb.data.authResponse.accessToken;
                // getGalleries(uid, _fb.data.authResponse.accessToken);
                getProfileImage();
                callback(fbData,user)
            });
        },
        getProfileImage: function (callback) {
            var uid = (_fb.data.authResponse.userID) ? _fb.data.authResponse.userID : "/me";
            FB.api(
                "/" + uid + "/picture",
                {
                    "redirect": false,
                    "type": "normal",
                    "width": 800,
                    "height": 800
                },
                function (response) {
                    if (response && !response.error) {
                        profilePhotoURL = response.data.url;

                                if (response.data.is_silhouette) {
                                    isSilhouette = true;
                                }
                            }
                        }
                    );

            },
            getFBFriendsData: function() {
                try {
                    var uid = (_fb.data.authResponse.userID) ? _fb.data.authResponse.userID : "/friends";
                    FB.api(uid, function (user) {
                        _fb.user = user;
                        var geo;
                        var data = {};
                        userFBID = uid;
                        getFBFriends();
                    });
                } catch (e) {
                    MatchCore.CPX.ui_done();
                }
            },
            getFBFriends: function() {
                FB.api(
                        "/me/friends",
                        function (response) {
                            if (response && !response.error) {

                    }
                }
            );
        },
        getGalleries: function (userID, accessToken) {
            if (isSilhouette) return;
            //console.log("https://graph.facebook.com/v2.7/" + userID + "/albums?access_token=" + accessToken);
            $jq.ajax({
                url: "https://graph.facebook.com/v4.0/" + userID + "/albums?access_token=" + accessToken,
                data: {
                    format: 'json'
                },
                type: "GET"

                }).success(function (data) {

                    var jsonObj = jQuery.parseJSON(JSON.stringify(data));

                    //get all albums and find which one is the profile pictures album
                    var profileGalleryID = null;

                $jq.each(jsonObj.data, function (index, element) {
                    if (element.name == "Profile Pictures" && element.type == "profile") {
                        profileGalleryID = element.id;
                    }
                });

                if (profileGalleryID != null) {
                    getProfileGallery(profileGalleryID, accessToken);
                } else {
                    $jq("#choosePhoto").hide();
                }
            });
        },
        getProfileGallery: function (profileGalleryID, accessToken) {
            $jq.ajax({
                url: "https://graph.facebook.com/v4.0/" + profileGalleryID + "/photos?access_token=" + accessToken,
                data: {
                    format: 'json'
                },
                type: "GET"

                }).success(function (data) {

                var jsonObj = jQuery.parseJSON(JSON.stringify(data));
                dataToImport = "[";
                $jq.each(jsonObj.data, function (index, element) {
                    if (index >= 5) return false;
                    var img = "<div class='profileGalleryImg' id='profile_" + element.id + "' style='background: url(" + element.source + ")'>";
                    var selectedIcon = "<span class='selectedProfileImg'>A</span>";


                        if (index == 0) img = img + selectedIcon;

                        img = img + "</div>";

                    if (jsonObj.data.length > $jq("#profileGalleryPanel div").length) {
                        $jq("#profileGalleryPanel").append(img);
                    }
                    var imgId = 'profile_' + element.id;
                    var bg = $jq("#" + imgId).css("background-image");

                    // var bg = $jq("#" + this.id).css("background-image")
                    bg = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
                    profilePhotoURL = bg;
                    if (index == 0) {
                        dataToImport += "{'Id':'','SourceUrl':'" + profilePhotoURL + "','ThumbnailSourceUrl':'" + profilePhotoURL + "','Caption':''}";
                    }
                    else {
                        dataToImport += ",{'Id':'','SourceUrl':'" + profilePhotoURL + "','ThumbnailSourceUrl':'" + profilePhotoURL + "','Caption':''}";
                    }


                });
                dataToImport += "]";
            });
        },
        UploadFacebookPhoto: function(logstep) {
            if (isFbLogin == true && profilePhotoURL != null && !isSilhouette) {
                dataToImport = "[{'Id':'','SourceUrl':'" + profilePhotoURL + "','ThumbnailSourceUrl':'" + profilePhotoURL + "','Caption':''}] ";
        
                $jq.ajax({
                    url: "/FacebookProfileImport/PhotoUpload/",
                    dataType: "json",
                    type: "POST",
                    data: {
                        'photoData': dataToImport
                    },
                    async: false,
                    complete: function (data) {
                        if (data.status == 200) {
                            // console.log(data.responseText);
                            logRegEvent(logstep, '{facebook: fields: [{field: "photo"}]}');
                        } else {
                            //alert(MatchCore.UI.Site.Translate.getTranslation('MatchContent.Site.IM.ErrorOccuredMessage'));
                            //$jq("#dialog-import", top.document).msg('dismiss');
                        }
                    }
        
                });
            }
        },
        SaveFacebookAuth: function(logstep) {
            if (queryString.fb == "1" && !queryString.error_code) { 

                authData = {
                    "AuthToken": authToken,
                    "FacebookReg": true
                };
        
                $jq.ajax({
                    url: "/FacebookProfileImport/LogFBToken/",
                    dataType: "json",
                    type: "POST",
                    data: authData,
                    async: false,
                    complete: function (data) {
                        if (data.responseText) {
                            console.log(data.responseText);
                            logRegEvent(logstep, '{facebook: SaveFacebookAuth}');
                        } else {
                            logRegError(logstep, '{error : SaveFacebookAuth}');
                            //alert(MatchCore.UI.Site.Translate.getTranslation('MatchContent.Site.IM.ErrorOccuredMessage'));
                            //$jq("#dialog-import", top.document).msg('dismiss');
                        }
                    }
                });
            }
        },
        linkFacebookAccount: function(logstep,callback) {
            var fb = _fb;
            var fbUserId = null;
            var fbEmail = null;
    
            if (fb.data.authResponse && fb.data.authResponse.userID) {
                fbUserId = fb.data.authResponse.userID;
            }
    
            if (fb.user.email) {
                fbEmail = fb.user.email;
            }
    
            if (fbUserId === null || $jq("[name='email']").val() !== fbEmail) {
                callback();
            } else {
                $jq.ajax({
                    url: "/accountservice/LinkAccounts/",
                    data: {
                        'linkedAccountType': 'facebook',
                        'accountId': fbUserId
                    }
                }).complete(function (resp) {
                    logRegEvent(logstep, '{facebook: linkFacebookAccount}');//funnel logic
                    callback();
                });
            }
        }
    

    };
}();


MatchCore.CPX.Resources = function() {
    var _resources = [];
    var getResource = function (name) {
        var url = MatchCore.CPX.CpResourceRoot() + name + '.xml';
    };
    return {
        LoginMessages : function () {
            return getResource('LoginMessages');
        }
    };
}();

MatchCore.CPX.StatefulPane = {
    init : function() {
        $jq('.cp_stateful').each(function() {
            var loginView = $jq('.loginView', this);
            var registerView = $jq('.registerView', this);
            var memberView = $jq('.memberView', this);
            
            $jq("[class$='View']").each(function() {
                var view = this;
                if (MatchCore.CPX.CurrentUser.LoggedIn()) {
                    if ($jq(view).hasClass("memberView")) { $jq(view).fadeIn("fast") } else { $jq(view).fadeOut("fast") }
                }
                

                $jq('.switchToLoginView', view).each(function() {
                        $jq(this).bind('click', function(e) {
                            MatchCore.CPX.ui_busy();
                            var queryString = window.location.search
                            window.location.href = "/login/"+queryString;
                        });
                });
                $jq('.switchToRegisterView', view).each(function() {
                    if (registerView.length > 0) {
                        $jq(this).bind('click', function() {
                            MatchCore.CPX.ui_busy();
                            $jq(view).fadeOut('fast', function() {
                                MatchCore.CPX.Messaging.reset();
                                registerView.fadeIn('slow');
                                MatchCore.CPX.ui_done();
                            });
                        });
                    }
                });
            });
        });
    }
};

MatchCore.CPX.ClientMessages = function(){
    var _messages = [];
    return {    
        init: function(){},
        client_message: function(opt){
            if (arguments.length > 0) {
                _messages = opt;
            } else {
                return _messages;
            }
        }
    };
}();

MatchCore.CPX.Registration = function(){
    var _container, _handle, _password, _email, _birthDay, _birthMonth, _birthYear, _genderIdentity, _ageSeekLow, _ageSeekHigh, _postalCode, _firstname ;
    var _countryCode = 0, _cityCode = 0, _stateCode = 0, _gender = 1, _genderSeek = 2, _phoneAreaCode = "", _phoneNumber = "", _enablePartialLogging = null;
    var _emailMatchInfo=true,_emailNewsOffers=true,_emailPartners=true,_platinumContact=false,_busy=false,_autoGenHandle=false;
    var _matchOptIn = null;
    var _failureHandler,_successHandler;
    var _failureDelegate = new MatchCore.Delegate();
    var _successDelegate = new MatchCore.Delegate();
    var _invalidDelegate = new MatchCore.Delegate();
    var _validDelegate = new MatchCore.Delegate();

    var populateForm = function () {
        var gender = ($jq.readCookie('MatchSearch2') != undefined && !isNaN($jq.readCookie('MatchSearch2')['K01'])) ? $jq.readCookie('MatchSearch2')['K01'] : "1";
        var genderSeek = ($jq.readCookie('MatchSearch2') != undefined && !isNaN($jq.readCookie('MatchSearch2')['K02'])) ? $jq.readCookie('MatchSearch2')['K02'] : "2";
        var ageSeekLow = ($jq.readCookie('MatchSearch2') != undefined) ? $jq.readCookie('MatchSearch2')['K03'] : null;
        var ageSeekHigh = ($jq.readCookie('MatchSearch2') != undefined) ? $jq.readCookie('MatchSearch2')['K04'] : null;
        var postalCode = ($jq.readCookie('MatchSearch2') != undefined) ? $jq.readCookie('MatchSearch2')['K12'] : "";
        $jq(".form-registration").each(function() {
            var _container = $jq(this);
            if ((ageSeekLow!=null)&&($jq("SELECT[name='ageSeekLow']",_container).length) == 1) {
                $jq("SELECT[name='ageSeekLow']",_container).val((ageSeekLow>=18)?ageSeekLow:18).change();
            }
            if ((ageSeekHigh!=null)&&($jq("SELECT[name='ageSeekHigh']",_container).length) == 1) {
                $jq("SELECT[name='ageSeekHigh']",_container).val(ageSeekHigh).change();
            }
            if (postalCode!=null&&postalCode!=""&&MatchCore.CPX.Validation.isValidPostalCode(postalCode)) {
                $jq("INPUT[name='postalCode']",_container).val(postalCode);
                $jq("INPUT[name='postal']",_container).val(postalCode);
            }
            try {
                gender = parseInt(gender);
                genderSeek = parseInt(genderSeek);
                if ($jq("INPUT[name='gender']",_container).length!=-1&&$jq("INPUT[name='genderSeek']",_container).length!=-1) {
                    $jq("INPUT[name='gender'],INPUT[name='genderSeek']", _container).removeAttr("checked");
                    $jq("INPUT[name='gender'][value='" + gender + "']", _container).attr("checked", "checked");
                    $jq("INPUT[name='genderSeek'][value='" + genderSeek + "']", _container).attr("checked", "checked");
                }
                if ($jq("SELECT[name='genderGenderSeek']",_container).length==1) {
                    if (gender == 1 && genderSeek == 1) $jq("SELECT[name='genderGenderSeek']",_container).val(1).change();
                    if (gender == 1 && genderSeek == 2) $jq("SELECT[name='genderGenderSeek']",_container).val(2).change();
                    if (gender == 2 && genderSeek == 2) $jq("SELECT[name='genderGenderSeek']",_container).val(3).change();
                    if (gender == 2 && genderSeek == 1) $jq("SELECT[name='genderGenderSeek']",_container).val(4).change();
                } else {
                    $jq("SELECT[name='gender']",_container).val(gender).change();
                    $jq("SELECT[name='genderSeek']",_container).val(genderSeek).change();
                }
            } catch (e) {}
        });
    }

    var consumeForm = function (_container) {
        _firstname = $jq("INPUT[name='firstname']", _container).val();
        _handle = $jq("INPUT[name='handle']",_container).val();
        _password = $jq("INPUT[name='password']",_container).val();
        _email = $jq("INPUT[name='email']",_container).val();
        _postalCode = ($jq("INPUT[name='postalCode']",_container).length == 1) ? $jq("INPUT[name='postalCode']",_container).val() : $jq("INPUT[name='postal']",_container).val();
        _birthDay = $jq("SELECT[name='birthDay']",_container).val();
        _birthMonth = $jq("SELECT[name='birthMonth']",_container).val();
        _birthYear = $jq("SELECT[name='birthYear']",_container).val();
        _ageSeekLow = ($jq("SELECT[name='ageSeekLow']",_container).length == 1) ? $jq("SELECT[name='ageSeekLow']",_container).val() : $jq("INPUT[name='ageSeekLow']",_container).val();
        _ageSeekHigh = ($jq("SELECT[name='ageSeekHigh']",_container).length == 1) ? $jq("SELECT[name='ageSeekHigh']",_container).val() : $jq("INPUT[name='ageSeekHigh']",_container).val();
        _countryCode = ($jq("INPUT[name='countryCode']",_container).length==1) ? $jq("INPUT[name='countryCode']",_container).val() : $jq("SELECT[name='countryCode']",_container).val();
        _stateCode = $jq("SELECT[name='stateCode']",_container).val();
        _cityCode = $jq("SELECT[name='cityCode']", _container).val();
        _enablePartialLogging = $jq("INPUT[name='EnablePartialLogging']", _container).val() || null;
        
        _genderIdentity = null;
        if($jq("INPUT[name='genderIdentity'][type='radio']:checked", _container).length == 1){
            _genderIdentity = $jq("INPUT[name='genderIdentity'][type='radio']:checked",_container).val();
        }else if($jq("INPUT[name='genderIdentity'][type!='radio']", _container).length == 1){
            _genderIdentity = $jq("INPUT[name='genderIdentity'][type!='radio']", _container).val();
        }
        
        if ($jq("SELECT[name='genderGenderSeek']",_container).length == 1) {
            var genderGenderSeek = parseInt($jq("SELECT[name='genderGenderSeek']",_container).val());
            if (!isNaN(genderGenderSeek)) {
                if (genderGenderSeek == 0) {
                    _gender = 0;
                    _genderSeek = 0;
                }
                if (genderGenderSeek == 1) {
                    _gender = 1;
                    _genderSeek = 1;
                }
                if (genderGenderSeek == 2) {
                    _gender = 1;
                    _genderSeek = 2;
                }
                if (genderGenderSeek == 3) {
                    _gender = 2;
                    _genderSeek = 2;
                }
                if (genderGenderSeek == 4) {
                    _gender = 2;
                    _genderSeek = 1;
                }
            }
        } else {
            if($jq("SELECT[name='gender']",_container).length == 1){
                _gender = $jq("SELECT[name='gender']",_container).val();
            }else if($jq("INPUT[name='gender']:checked",_container).length == 1){
                _gender = $jq("INPUT[name='gender']:checked",_container).val();
            }else{
                _gender = $jq("INPUT[name='gender']", _container).val();
            }

            if($jq("SELECT[name='genderSeek']",_container).length == 1){
                _genderSeek = $jq("SELECT[name='genderSeek']",_container).val();
            }else if($jq("INPUT[name='genderSeek']:checked",_container).length == 1){
                _genderSeek = $jq("INPUT[name='genderSeek']:checked",_container).val();
            }else{
                _genderSeek = $jq("INPUT[name='genderSeek']", _container).val();
            }
        }
        if ($jq("INPUT[name='phoneAreaCode']",_container).val() != null) {
            _phoneAreaCode = $jq("INPUT[name='phoneAreaCode']",_container).val().replace(" ", "", "gi");
        }
        if ($jq("INPUT[name='phoneNumber']",_container).val() != null) {
            _phoneNumber = $jq("INPUT[name='phoneNumber']",_container).val().replace(" ", "", "gi");
        }

        _autoGenHandle = ($jq("INPUT[name='autoGenHandle']", ".form-registration").val() === "true") ? true : false;
        _emailMatchInfo = ($jq("INPUT[name='emailMatchInfo']",_container).val() != null) ? ($jq("INPUT[name='emailMatchInfo']:checked",_container).val() != null) : true;
        _emailNewsOffers = ($jq("INPUT[name='emailNewsOffers']:checked",_container).val() != null);
        _emailPartners = ($jq("INPUT[name='emailPartners']:checked",_container).val() != null);
        _platinumContact = ($jq("INPUT[name='platinumContact']:checked",_container).val() != null);

        if($jq("input[name='matchOptIn']",_container).length == 1){
            _matchOptIn = $jq("input[name='matchOptIn']",_container).val();
        }
    }
    var failure = function (response) {
        if (_failureDelegate.count() > 0)
            _failureDelegate.fireAndPreserve(response);
        else
            MatchCore.CPX.Messaging.show(response.Messages);
    }
    var success = function (response) { 
        if (_successDelegate.count() > 0) _successDelegate.fireAndPreserve(response);
    }
    var invalid = function (response) {
        if (_invalidDelegate.count() > 0)
            _invalidDelegate.fireAndPreserve(response);
        else
            MatchCore.CPX.Messaging.show(response.Messages);
    }
    var valid = function (response) {
        if (_validDelegate.count() > 0) _validDelegate.fireAndPreserve(response);
    }
    var createSearchCookie = function () {
        var hash;
        if ($jq.readCookie('MatchSearch2') == undefined) {
            hash = [];
            hash['K11'] = "20";
            hash['K01'] = _gender;
            hash['K02'] = _genderSeek;
            hash['K03'] = _ageSeekLow;
            hash['K04'] = _ageSeekHigh;
            hash['K12'] = _postalCode;
            $jq.createCookie('MatchSearch2', hash, false, true);
        } else {
            hash = $jq.readCookie('MatchSearch2');
        }
        if (hash['K12'] == undefined) {
            hash['K12'] = _postalCode;
        }
    }
    return {
        init: function (opts) {
            if (opts) {
                if (opts.fail) _failureDelegate.add(opts.fail);
                if (opts.success) _successDelegate.add(opts.success);
                _autoGenHandle = opts.autoGenHandle;
            }
            $jq('.btn-register').bind('click', this.submit);
            $jq('.btn-validate').bind('click', this.validate);
            $jq('.btn-validatefirst').bind('click', this.validatefirststep);
            
            MatchCore.CPX.CurrentUser.onReady(function () {
                if (!MatchCore.CPX.CurrentUser.LoggedIn() && MatchCore.CPX.CurrentUser.Registered()) {
                    $jq("INPUT[name='handle']",$jq(".form-registration")).val(MatchCore.CPX.CurrentUser.Handle());
                }
            });
            //MC- this overrides querystring values in favor of defaults or MatchSearch cookie values -- why do we need to do this?
            //populateForm(function(){return;});
        },
        validatefirststep:function()//validation for the first step for Latam reg
        {
            _container = $jq(this).parents(".form-registration");
            if (!MatchCore.CPX.CurrentUser.LoggedIn()) {
                consumeForm(_container);
                var errors = [];

                if (_genderSeek == undefined || _genderSeek == 0 || _gender == undefined || _gender==0) {
                    errors.push({ Field: "genderGenderSeek", Text: MatchCore.CPX.ClientMessages.RegPassword });// change for the right message key
                }

                if (errors.length > 0) {
                    failure({ "Messages": errors });
                    return;
                }

                $jq("#step1").attr('class', 'notvisible'); $jq("#step2").attr('class', 'visible'); 
                MatchCore.CPX.Messaging.reset();

            }

        },
        validate: function () {
            _container = $jq(this).parents(".form-registration");
            if (!MatchCore.CPX.CurrentUser.LoggedIn()) {
                consumeForm(_container);
                var errors = [];
                if (_gender == undefined) {
                    _gender = ($jq.readCookie('MatchSearch2') != undefined && $jq.readCookie('MatchSearch2')['K01'] != undefined) ? $jq.readCookie('MatchSearch2')['K01'] : 1;
                }
                if (_genderSeek == undefined) {
                    _genderSeek = ($jq.readCookie('MatchSearch2') != undefined && $jq.readCookie('MatchSearch2')['K02'] != undefined) ? $jq.readCookie('MatchSearch2')['K02'] : 2;
                }
                if (_ageSeekLow == undefined) {
                    _ageSeekLow = ($jq.readCookie('MatchSearch2') != undefined && $jq.readCookie('MatchSearch2')['K03'] != undefined) ? $jq.readCookie('MatchSearch2')['K03'] : 25;
                }
                if (_ageSeekHigh == undefined) {
                    _ageSeekHigh = ($jq.readCookie('MatchSearch2') != undefined && $jq.readCookie('MatchSearch2')['K04'] != undefined) ? $jq.readCookie('MatchSearch2')['K04'] : 35;
                }
                if (_countryCode != 1 && _countryCode != 2 && _countryCode != 224) _postalCode = "";
                if (_postalCode == undefined) _postalCode = "";
                if (isNaN(parseInt(_countryCode))) { _countryCode = 0; }
                if (isNaN(parseInt(_stateCode))) { _stateCode = 0; }
                if (isNaN(parseInt(_cityCode))) { _cityCode = 0; }
                if (_phoneAreaCode == undefined) { _phoneAreaCode = ""; }
                if (_phoneNumber == undefined) { _phoneNumber = ""; }
                if (_emailMatchInfo == undefined) { _emailMatchInfo = true; }
                if (_emailNewsOffers == undefined) { _emailNewsOffers = true; }
                if (_emailPartners == undefined) { _emailPartners = true; }
                if (_platinumContact == undefined) { _platinumContact = false; }
    /*                if (errors.length > 0) {
                    failure({ "Messages": errors });
                    return;
                }*/  
                var postData = {
                    "FirstName": _firstname,
                    "Handle" : _handle,
                    "Password": _password,
                    "Email": _email,
                    "BirthDay": _birthDay,
                    "BirthMonth": _birthMonth,
                    "BirthYear":_birthYear,
                    "PostalCode": _postalCode,
                    "CountryCode": _countryCode,
                    "StateCode": _stateCode,
                    "CityCode": _cityCode,
                    "Gender": _gender,
                    "GenderSeek": _genderSeek,
                    "GenderIdentity": _genderIdentity,
                    "AgeSeekLow": _ageSeekLow,
                    "AgeSeekHigh": _ageSeekHigh,
                    "PhoneAreaCode": _phoneAreaCode,
                    "PhoneNumber": _phoneNumber,
                    "EmailMatchInfo": _emailMatchInfo,
                    "EnablePartialLogging": _enablePartialLogging
                };
                MatchCore.CPX.ui_busy();
                $jq.ajax({
                    url: '/Registration/ValidatePartialRegistration/',
                    data: postData,
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        MatchCore.CPX.ui_done();
                        if (response.Success) { 
                            valid(response);
                        } else {
                            invalid(response);
                        }
                    },
                    failure: function (response) {
                        MatchCore.CPX.ui_done();
                        invalid({ "Messages": [{ Text: "There was a problem submitting your registration information." }] });
                    }
                });
            } else { valid({"Success":true,"Messages":[{Text:"Already registered."}]}); }
        },
        submit: function () {
            _container = $jq(this).parents(".form-registration");
            if (!MatchCore.CPX.CurrentUser.LoggedIn()) {
                consumeForm(_container);
                var errors = [];
                if (_gender == undefined) {
                    _gender = ($jq.readCookie('MatchSearch2') != undefined && $jq.readCookie('MatchSearch2')['K01'] != undefined) ? $jq.readCookie('MatchSearch2')['K01'] : 1;
                }
                if (_genderSeek == undefined) {
                    _genderSeek = ($jq.readCookie('MatchSearch2') != undefined && $jq.readCookie('MatchSearch2')['K02'] != undefined) ? $jq.readCookie('MatchSearch2')['K02'] : 2;
                }
                //Either Firstname or Handle will be checked
                if (_firstname == undefined) {
                    if ((_handle == null || _handle == "") && _autoGenHandle == false) {
                        errors.push({ Field: "handle", Text: MatchCore.CPX.ClientMessages.RegHandle });
                    }
                }
                else {
                    if ((_firstname == null || _firstname == "") && _autoGenHandle == false) {
                        errors.push({ Field: "firstname", Text: "Please enter a first name." });
                    }
                } 

                if (_password == null || _password == "") {
                    errors.push({ Field: "password", Text: MatchCore.CPX.ClientMessages.RegPassword });
                }
                if (_email == null || _email == "") {
                    errors.push({ Field: "email", Text: MatchCore.CPX.ClientMessages.RegEmail });
                }
                if (_phoneAreaCode == undefined) { _phoneAreaCode = ""; }
                if (_phoneNumber == undefined) { _phoneNumber = ""; }
                var PhoneNumber = _phoneAreaCode + _phoneNumber;
                if (PhoneNumber !== "") {
                    var PhoneNumberRegex = /^[0-9]{10}$/;
                    if (!PhoneNumberRegex.test(PhoneNumber)) {
                        errors.push({ Field: "phoneNumber", Text: "Oops! The mobile number you entered is not valid." });
                    }
                }
                if (_birthDay == "0" && _birthMonth == "0" && _birthYear == "0") {
                    errors.push({ Field: "birthDate", Text: MatchCore.CPX.ClientMessages.RegBirthGeneric });
                } else {
                    if (_birthDay == null || _birthDay == '0') {
                        errors.push({ Field: "birthDay", Text: MatchCore.CPX.ClientMessages.RegBirthDay });
                    }
                    if (_birthMonth == null || _birthMonth == '0') {
                        errors.push({ Field: "birthMonth", Text: MatchCore.CPX.ClientMessages.RegBirthMonth });
                    }
                    if (_birthYear == null || _birthYear == '0') {
                        errors.push({ Field: "birthYear", Text: MatchCore.CPX.ClientMessages.RegBirthYear });
                    }
                }
                if (_ageSeekLow == undefined) {
                    _ageSeekLow = ($jq.readCookie('MatchSearch2') != undefined && $jq.readCookie('MatchSearch2')['K03'] != undefined) ? $jq.readCookie('MatchSearch2')['K03'] : 25;
                }
                if (_ageSeekHigh == undefined) {
                    _ageSeekHigh = ($jq.readCookie('MatchSearch2') != undefined && $jq.readCookie('MatchSearch2')['K04'] != undefined) ? $jq.readCookie('MatchSearch2')['K04'] : 35;
                }
                if (_countryCode != 1 && _countryCode != 2 && _countryCode != 224) _postalCode = "";
                if (_postalCode != undefined) {
                    if (_postalCode == null || _postalCode == "" && (_countryCode == 1 || _countryCode == 2 || _countryCode == 224))
                        errors.push({ Field: "postalCode", Text: MatchCore.CPX.ClientMessages.RegPostalcode });
                }
                if (isNaN(parseInt(_countryCode))) { _countryCode = 0; }
                if (isNaN(parseInt(_stateCode))) { _stateCode = 0; }
                if (isNaN(parseInt(_cityCode))) { _cityCode = 0; }
                if (_autoGenHandle == undefined) { _autoGenHandle = false; }
                if (_emailMatchInfo == undefined) { _emailMatchInfo = true; }
                if (_emailNewsOffers == undefined) { _emailNewsOffers = true; }
                if (_emailPartners == undefined) { _emailPartners = true; }
                if (_platinumContact == undefined) { _platinumContact = false; }
                if (errors.length > 0) {
                    failure({ "Messages": errors });
                    return;
                }

                if (_ageSeekLow > _ageSeekHigh){
                    var tempAge = _ageSeekLow;
                    _ageSeekLow = _ageSeekHigh;
                    _ageSeekHigh = tempAge;
                }


                var postData = {
                    "FirstName": _firstname,
                    "Handle": _handle,
                    "AutoGenHandle": _autoGenHandle,
                    "Password" : _password,
                    "Email" : _email,
                    "BirthDay" : _birthDay,
                    "BirthMonth" : _birthMonth,
                    "BirthYear" : _birthYear,
                    "PostalCode" : _postalCode,
                    "CountryCode" : _countryCode,
                    "StateCode" : _stateCode,
                    "CityCode" : _cityCode,
                    "Gender" : _gender,
                    "GenderSeek": _genderSeek,
                    "GenderIdentity": _genderIdentity,
                    "AgeSeekLow": _ageSeekLow,
                    "AgeSeekHigh": _ageSeekHigh,
                    "PhoneAreaCode" : _phoneAreaCode,
                    "PhoneNumber" : _phoneNumber,
                    "EmailMatchInfo" : _emailMatchInfo,
                    "EmailNewsOffers" : _emailNewsOffers,
                    "EmailPartners" : _emailPartners,
                    "PlatinumContact" : _platinumContact,
                    "PageID" : MatchCore.CPX.PageID(),
                    "PageVersion": MatchCore.CPX.PageVersion(),
                    "MatchOptIn": _matchOptIn
                };
                MatchCore.CPX.ui_busy();
                $jq.ajax({
                    type: "POST",
                    url: '/Registration/Register/',
                    dataType: 'json',
                    data: postData,
                    success: function (response) {
                        MatchCore.CPX.ui_done();
                        if (response.Success) {
                            MatchCore.CPX.CurrentUser.LoggedIn(true)
                            MatchCore.CPX.CurrentUser.Token(response.Data.Token);
                            MatchCore.CPX.Services.persistCookies(response);
                            createSearchCookie();
                            success(response);
                        } else {
                            failure(response);
                        }
                    },
                    failure: function (response) {
                        MatchCore.CPX.ui_done();
                        failure({ "Messages": [{ Text: "There was a problem submitting your registration information." }] });
                    }
                });
            } else { success({ "Success": true, "Messages": [{ Text: "Already registered."}] }); }
        },
        onValid: function (handler) { _validDelegate.add(handler); },
        onInvalid: function (handler) { _invalidDelegate.add(handler); },
        onSuccess: function (handler) { _successDelegate.add(handler); },
        onFailure: function (handler) { _failureDelegate.add(handler); }
    };
}();

MatchCore.CPX.Login = function(){
    var _container, _handle, _password, _userEmail, _rememberMe = false, _busy = false;
    var _failureDelegate = new MatchCore.Delegate();
    var _successDelegate = new MatchCore.Delegate();
    var _failureForgotDelegate = new MatchCore.Delegate();
    var _successForgotDelegate = new MatchCore.Delegate();
    var consumeForm = function (container) {
        _handle = $jq("INPUT[name='handle']", container).val();
        _password = $jq("INPUT[name='password']", container).val();
        _rememberMe = ($jq("INPUT[name='remember-me']:checked", container).val() != null);
        _userEmail = $jq("INPUT[name='userEmail']", container).val();
    }
    var failure = function (response) {
        if (_failureDelegate.count() > 0)
            _failureDelegate.fireAndPreserve(response);
        else
            MatchCore.CPX.Messaging.show(response.Messages);
    }
    var success = function (response) {
        if (_successDelegate.count() > 0) _successDelegate.fireAndPreserve(response);
    }
    var failureForgot = function (response) {
        if (_failureForgotDelegate.count() > 0)
            _failureForgotDelegate.fireAndPreserve(response);
        else
            MatchCore.CPX.Messaging.show(response.Messages);
    }
    var successForgot = function (response) {
        if (_successForgotDelegate.count() > 0)
            _successForgotDelegate.fireAndPreserve(response);
        else
            MatchCore.CPX.Messaging.show(response.Messages, 'success');
    }
    return {
        init: function (opts) {
            if (opts) {
                if (opts.fail) _failureDelegate.add(opts.fail);
                if (opts.success) _successDelegate.add(opts.success);
            }
            $jq('.btn-login').bind('click', this.submit);
            $jq('.btn-forgot-password').bind('click', this.forgotPassword);
            MatchCore.CPX.CurrentUser.onReady(function () {
                if (!MatchCore.CPX.CurrentUser.LoggedIn() && MatchCore.CPX.CurrentUser.Registered()) {
                    $jq("INPUT[name='handle']", $jq(".form-login")).val(MatchCore.CPX.CurrentUser.Handle());
                }
            });
        },
        submit: function () {
            MatchCore.CPX.ui_busy();
            var queryString = window.location.search;
            window.location.href = "/login/"+queryString;
            /*
            MatchCore.CPX.Messaging.reset();
            _container = $jq(this).parents(".form-login");
            var errors = [];
            consumeForm(_container);
            if (_handle == null || _handle == "") {
                errors.push({ Field: "handle", Text: MatchCore.CPX.ClientMessages.LoginHandle });
            }
            if (_password == null || _password == "") {
                errors.push({ Field: "password", Text: MatchCore.CPX.ClientMessages.LoginPassword });
            }
            if (!MatchCore.CPX.CurrentUser.LoggedIn()) {
                if (errors.length > 0) {
                    failure({ "Messages": errors });
                    return;
                }
                var postData = {
                    "Handle": _handle,
                    "Password": _password,
                    "Remember": _rememberMe
                };
                MatchCore.CPX.ui_busy();
                $jq.ajax({
                    url: '/Authentication/Login/',
                    data: postData,
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        MatchCore.CPX.ui_done();
                        if (response.Success) {
                            MatchCore.CPX.CurrentUser.LoggedIn(true);
                            MatchCore.CPX.CurrentUser.Token(response.Data.Token);
                            MatchCore.CPX.CurrentUser.Subscribed(!!response.Data.IsSubscriber);
                            MatchCore.CPX.Services.persistCookies(response);
                            var loginCount = ($jq.readCookie('IsRegisteredLoginCounter') != null) ? parseInt($jq.readCookie('IsRegisteredLoginCounter')) : 0;
                            loginCount++;
                            $jq.createCookie('IsRegisteredLoginCounter', loginCount.toString());
                            if (response.RedirectUrl && !MatchCore.CPX.Promo.CurrentKeyword()) {
                                window.location.href = response.RedirectUrl;
                            }
                            success(response);
                        } else { failure(response); }
                    },
                    failure: function (response) {
                        MatchCore.CPX.ui_done();
                        failure({ "Messages": [{ Text: MatchCore.UI.Site.Translate.getTranslation('MatchContent.Account.Login.ProblemInSubmit') }] });
                    }
                });
            } else { success({ "Success": true, "Messages": [{ Text: "Already logged in." }] }); }
            */
        },
        forgotPassword: function () {
            MatchCore.CPX.Messaging.reset();
            _container = $jq(this).parents(".form-forgot-password");
            var errors = [];
            consumeForm(_container);
            if (_userEmail == null || _userEmail == "") {
                errors.push({ Field: "email", Text: MatchCore.CPX.ClientMessages.RegEmail });
            }
            if (errors.length > 0) {
                failureForgot({ "Messages": errors });
                return;
            }
            MatchCore.CPX.ui_busy();
            $jq.ajax({
                url: '/Authentication/ForgotPassword/',
                data: { "userEmail": _userEmail },
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    MatchCore.CPX.ui_done();
                    if (response.Success) 
                        successForgot(response);
                    else
                        failureForgot(response);
                },
                failure: function (response) {
                    MatchCore.CPX.ui_done();
                    failureForgot({ "Messages": [{ Text: "There was a problem submitting your information." }] });
                }
            });

        },
        onSuccess: function (handler) { _successDelegate.add(handler); },
        onFailure: function (handler) { _failureDelegate.add(handler); },
        onForgotSuccess: function (handler) { _successForgotDelegate.add(handler); },
        onForgotFailure: function (handler) { _failureForgotDelegate.add(handler); }
    };
}();

MatchCore.CPX.Promo = function(){
    var _currentKeyword, _currentPromoID, _subscribeUrl, _logPromo = true;
    var _failureDelegate = new MatchCore.Delegate();
    var _successDelegate = new MatchCore.Delegate();
    var _busy = false;
    var failure = function (response) {
        if (_failureDelegate.count() > 0)
            _failureDelegate.fireAndPreserve(response);
        else
            MatchCore.CPX.Messaging.show(response.Messages);
    }
    var success = function (response) {
        if (_successDelegate.count() > 0)
            _successDelegate.fireAndPreserve(response);
        else
            window.location.href = _subscribeUrl;
    }
    var callAgree = function (promoId, logPromo) {
        var postData = {
            "sid": MatchCore.CPX.SID(),
            "theme": MatchCore.CPX.Theme(),
            "promoID": promoId,
            "logPromo": logPromo
        };
        $jq.ajax({
            url: '/Promotion/AgreeToTerms/',
            data: postData,
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.Success) {
                    if (response.SkipRateCard) _subscribeUrl = "/subscribe/subscribe2.aspx?src=true&promoId=" + promoId;
                    success(response);
                } else { failure(response); }
            },
            failure: function (response) {
                failure({ "Messages": [{ Text: "There was a problem submitting your request. <br>Please try again later. We apologize for any inconvenience." }] });
            }
        });
    };
    return {
        init: function (opts) {
            $jq('.btn-promo-terms-agree').bind('click', this.agree);
            $jq('.cp_promo').each(function () {
                var loginView = $jq('.loginView', this);
                var registerView = $jq('.registerView', this);
                var promoTermsView = $jq('.promoTermsView', this);
                if (promoTermsView.length > 0) {
                    if (MatchCore.CPX.CurrentUser.LoggedIn()) {
                        $jq("[class$='View']", this).hide(); promoTermsView.fadeIn("fast");
                    }
                    MatchCore.CPX.Login.onSuccess(function () {
                        MatchCore.CPX.Messaging.reset();
                        loginView.fadeOut('fast', function () {
                            promoTermsView.fadeIn();
                        });
                    });
                    MatchCore.CPX.Registration.onSuccess(function () {
                        MatchCore.CPX.Messaging.reset();
                        registerView.fadeOut('fast', function () {
                            promoTermsView.fadeIn();
                        });
                    });
                } else {
                    MatchCore.CPX.Login.onSuccess(function () {
                        MatchCore.CPX.Messaging.reset();
                        MatchCore.CPX.Promo.agree();
                    });
                    MatchCore.CPX.Registration.onSuccess(function () {
                        MatchCore.CPX.Messaging.reset();
                        MatchCore.CPX.Promo.agree();
                    });
                }
            });
        },
        agree: function () {
            if (_currentPromoID) {
                callAgree(_currentPromoID, _logPromo);
            } else {
                var postData = {
                    "sid": MatchCore.CPX.SID(),
                    "theme": MatchCore.CPX.Theme(),
                    "keyword": _currentKeyword
                };
                $jq.ajax({
                    url: '/Promotion/ValidatePromo/',
                    data: postData,
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response.Success) {
                            _subscribeUrl = response.RedirectURL;
                            callAgree(response.PromoId, _logPromo);
                        } else { failure(response); }
                    }
                });
            }
        },
        CurrentKeyword: function (keyword) {
            if (arguments.length > 0) {
                _currentKeyword = keyword;
            } else {
                return _currentKeyword;
            }
        },
        LogPromo: function (logPromo) {
            if (arguments.length > 0) {
                _logPromo = logPromo;
            } else {
                return _logPromo;
            }
        },
        CurrentPromoID: function (promoID) {
            if (arguments.length > 0) {
                if (promoID > 0) _currentPromoID = promoID;
            } else {
                return _currentPromoID;
            }
        },
        SubscribeUrl: function (subscribeUrl) {
            if (arguments.length > 0) {
                _subscribeUrl = subscribeUrl;
            } else {
                return _subscribeUrl;
            }
        },
        onSuccess: function (handler) { _successDelegate.add(handler); },
        onFailure: function (handler) { _failureDelegate.add(handler); }
    };
}();

MatchCore.CPX.Sweepstakes = function(){
    var _container, _email, _currentKeyword, _currentPromoID, _offers = false, _busy = false;
    var _failureDelegate = new MatchCore.Delegate();
    var _successDelegate = new MatchCore.Delegate();
    var consumeForm = function (container) {
        if ((_email == null || _email == "") && $jq("INPUT[name='email']", container).length > 0) {
            _email = $jq("INPUT[name='email']", container).val();
        }
        _offers = ($jq("INPUT[name='third-party']:checked", container).val() != null);
    }
    var failure = function (response) {
        if (_failureDelegate.count() > 0)
            _failureDelegate.fireAndPreserve(response);
        else
            MatchCore.CPX.Messaging.show(response.Messages);
    }
    var success = function (response) {
        if (_successDelegate.count() > 0) _successDelegate.fireAndPreserve(response);
    }
    var callSubmit = function (promoId) {
        var postData = {
            "promoID": promoId,
            "emailAddress": _email,
            "thirdPartyOffers": _offers
        };
        $jq.ajax({
            url: '/Promotion/SubmitSweepstakesEntry/',
            data: postData,
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.Success) {
                    success(response);
                } else {
                    failure({ "Messages": [{ Text: "There was an issue with your entry submission. <br>Please try again later." }] });
                }
            },
            failure: function (response) {
                MatchCore.CPX.ui_done();
                failure({ "Messages": [{ Text: "There was an issue with your entry submission. <br>Please try again later." }] });
            }
        });
    };
    return {
        init: function (opts) {
            if (opts) {
                if (opts.fail) _failureDelegate.add(opts.fail);
                if (opts.success) _successDelegate.add(opts.success);
            }
            $jq('.btn-sweeps').bind('click', this.submit);
            MatchCore.CPX.CurrentUser.onReady(function () {
                if (MatchCore.CPX.CurrentUser.LoggedIn()) {
                    MatchCore.CPX.CurrentUser.onReady(function () {
                        if ($jq("INPUT[name='email']", $jq(".form-sweepstakes")).val() == "") $jq("INPUT[name='email']", $jq(".form-sweepstakes")).val(MatchCore.CPX.CurrentUser.EmailAddress());
                    });
                }
            });
        },
        submit: function () {
            MatchCore.CPX.Messaging.reset();
            _container = $jq(this).parents(".form-sweepstakes");
            var errors = [];
            consumeForm(_container);
            if (_email == null || _email == "") {
                errors.push({ Field: "email", Text: "Please enter an email address." });
            }
            if (errors.length > 0) {
                failure({ "Messages": errors });
                return;
            }
            if (_currentPromoID) {
                callSubmit(_currentPromoID);
            } else {
                var postData = {
                    "sid": MatchCore.CPX.SID(),
                    "theme": MatchCore.CPX.Theme(),
                    "keyword": _currentKeyword
                };
                $jq.ajax({
                    url: '/Promotion/ValidatePromo/',
                    data: postData,
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response.Success) {
                            callSubmit(response.PromoId);
                        } else { failure(response); }
                    }
                });
            }
        },
        onSuccess: function (handler) { _successDelegate.add(handler); },
        onFailure: function (handler) { _failureDelegate.add(handler); },
        CurrentKeyword: function (keyword) {
            if (arguments.length > 0) {
                _currentKeyword = keyword;
            } else {
                return _currentKeyword;
            }
        },
        CurrentPromoID: function (promoID) {
            if (arguments.length > 0) {
                if (promoID > 0) _currentPromoID = promoID;
            } else {
                return _currentPromoID;
            }
        },
        CurrentEmail: function (eml) {
        if (arguments.length > 0) {
            if (eml != null && eml != '') _email = eml;
        } else {
            return _email;
        }
    }
    };
}();

MatchCore.CPX.Voucher = function(){
    var _currentVoucherCode;
    var _failureDelegate = new MatchCore.Delegate();
    var _successDelegate = new MatchCore.Delegate();
    var _busy = false;
    var failure = function (response) {
        if (_failureDelegate.count() > 0)
            _failureDelegate.fireAndPreserve(response);
        else
            MatchCore.CPX.Messaging.show(response.Messages);
    }
    var success = function (response) {
        if (_successDelegate.count() > 0) _successDelegate.fireAndPreserve(response);
    }
    return {
        validate: function (code) {
            var _code = code; var errors = []; var rexp = /^[a-z0-9]+$/i;
            MatchCore.CPX.Messaging.reset();
            if (_code == null || _code == "") {
                errors.push({ Field: "voucher", Text: "Please enter your redemption code." });
            } else if (_code.length != 12 || !rexp.test(_code)) {
                errors.push({ Field: "voucher", Text: "This does not look like a Match.com redemption code. Make sure you are using the 12 digit code provided to you." });
            }
            if (errors.length > 0) {
                MatchCore.CPX.Messaging.show(errors);
                return;
            }
            var postData = {
                "redemptionKey": _code,
                "promoID": MatchCore.CPX.Promo.CurrentPromoID()
            };
            MatchCore.CPX.ui_busy();
            $jq.ajax({
                url: '/Promotion/ValidateRedemptionKey/',
                data: postData,
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    MatchCore.CPX.ui_done();
                    if (response.Success) {
                        success(response);
                    } else {
                        if (response.Messages.length == 0) {
                            switch (response.ValidationResult) {
                                case 1:
                                    response.Messages.push({ Text: "This does not look like a Match.com redemption code. Make sure you are using the 12 digit code provided to you." });
                                    break;
                                case 2:
                                    response.Messages.push({ Text: "The redemption code entered does not exist." });
                                    break;
                                case 3:
                                    response.Messages.push({ Text: "This redemption code has expired." });
                                    break;
                                case 4:
                                    response.Messages.push({ Text: "This Redemption Code has been used by another account. Please contact customer care if you need assistance." });
                                    break;
                                default:
                                    response.Messages.push({ Text: "There was an issue with your entry submission. <br>Please try again later." });
                            }
                        }
                        failure(response);
                    }
                },
                failure: function (response) {
                    MatchCore.CPX.ui_done();
                    MatchCore.CPX.Messaging.show({ "Messages": [{ Text: "There was a problem submitting your request. <br>Please try again later. We apologize for any inconvenience." }] });
                }
            });
        },
        onSuccess: function (handler) { _successDelegate.add(handler); },
        onFailure: function (handler) { _failureDelegate.add(handler); }
    };
}();

$jq(document).ready(function(){
    MatchCore.CPX.init();
    MatchCore.CPX.StatefulPane.init();
    MatchCore.CPX.Login.init();
    MatchCore.CPX.Registration.init();
    MatchCore.CPX.Promo.init();
    MatchCore.CPX.Sweepstakes.init();
    MatchCore.CPX.Detection.init(); 
    if ($jq('.ajaxGeo').length!=0) {
        Cortado.Bootloader.require(MatchCore.Application.CpServer + "scripts/cp/ajaxGeo.js", function() {
            $jq('.ajaxGeo').each(function() {
                var countryList = $jq('.countryPane SELECT', this);
                var stateList = $jq('.statePane SELECT', this);
                var cityList = $jq('.cityPane SELECT', this);
                var postalField = $jq('.postalPane INPUT', this);
                //trying to preselect the country based on the siteURL
                var selectedCountryCode = $jq('#selectedCountryCode').val();

                //trying to preselect the city and state based on hiddenfield
                var preselectedStateCode = $jq('#preselectedStateCode').val();
                var preselectedCityCode = $jq('#preselectedCityCode').val();
                var geo = new MatchCore.AjaxGeo();
                geo.init({
                    container: this,
                    meta: {
                        "countryList": (countryList.length > 0) ? countryList[0] : null,
                        "stateList": (stateList.length > 0) ? stateList[0] : null,
                        "cityList": (cityList.length > 0) ? cityList[0] : null,
                        "postalField": (postalField.length > 0) ? postalField[0] : null,
                        "selectedCountryCode": (selectedCountryCode > 0) ? selectedCountryCode : null,
                        "preselectedStateCode": (preselectedStateCode > 0) ? preselectedStateCode : null,
                            "preselectedCityCode": (preselectedCityCode > 0) ? preselectedCityCode : null
                    }
                });
            });
        });
    }
});
