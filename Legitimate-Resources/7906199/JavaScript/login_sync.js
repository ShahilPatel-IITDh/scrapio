function LoginClass(properties) {
	var login = {};

	login.retry                  = properties.retry;
	login.retryTimeout           = properties.retryTimeout;
	login.url                    = properties.url;
	login.authenticateAction     = properties.authenticateAction;
	login.csrfAction             = properties.csrfAction;
	login.captcha                = properties.captcha;
	login.gCaptchaActive         = properties.gCaptchaActive;
	login.gCaptchaKey	         = properties.gCaptchaKey;
	login.errorMessage           = "Sistema Temporariamente Indisponivel";
	login.onLoading	             = properties.onLoading;
	login.onAnyError             = properties.onAnyError;
	login.onAuthenticationError  = properties.onAuthenticationError;
	login.showCaptchaCallback  = properties.showCaptchaCallback;
	login.onSystemError          = properties.onSystemError;
	login.onServerError	     = properties.onServerError;

	login.onLoadingCallback = function(data) {
		if (login.onLoading != undefined) {
			login.onLoading(data);
		}
	};

	login.onAnyErrorCallback = function(data) {
		if (login.onAnyError != undefined) {
			login.onAnyError(data);
		}
	}

	login.onAuthenticationErrorCallback = function(data) {
		login.onAnyErrorCallback(data);

		if (login.onAuthenticationError != undefined) {
			login.onAuthenticationError(data);
		}
	};

	login.removeCookie = function(cookieName) {
		var cookieDomain = "";
		if (login.cookieDomain == undefined || login.cookieDomain == '') {
			cookieDomain = document.location.hostname.split('.');
			cookieDomain.splice(0, 1);
			cookieDomain = '.' + cookieDomain.join('.');
		} else {
			cookieDomain = login.cookieDomain;
		}

		document.cookie = cookieName + '=; expires=Thu 01 Jan 1970 00:00:00 GMT; path = /; domain=' + cookieDomain + ';';
	}

	login.onSystemErrorCallback = function(data) {
		login.removeCookie('U');
		login.removeCookie('B');
		login.removeCookie('WM');
		login.onAnyErrorCallback(data);
		if (login.onSystemError != undefined) {
			login.onSystemError(data);
		}
	}

	login.onServerErrorCallback = function(data) {
		login.removeCookie('U');
		login.removeCookie('B');
		login.removeCookie('WM');
		if (login.attempts > 0) {
			login.attempts = login.attempts - 1;
			console.log(login);

			return setTimeout(function() {login._send()}, login.retryTimeout);
		}

		login.onAnyErrorCallback(data);

		if (login.onServerError != undefined) {
			login.onServerError(data);
		}
	};

	login.computeURL = function(url) {
		console.log(url);
		return url;
	};

	login._send = function() {
		login.getCSRF(function(key) {
			var params = {
	        	user : login._user,
	        	pass : login._pass,
	        	key : key,
	        	captchaData: login.captchaData
	        };

			if (login.gCaptchaActive) {
				params.gRecaptchaToken = login._gRecaptchaToken;
			}

	        login.authenticate(params, function(answerUrl) {
                var url = login.computeURL(answerUrl);
                window.location = url;
	        });
        });
	}

	login.send = function(user, pass, answer,challenge) {
		var _this = this;
		login.attempts = login.retry;
		login._user = user;
		login._pass = pass;

		if (challenge) {
			login.captchaData = { challenge : challenge, answer: answer };
		}

		if (login.gCaptchaActive) {
			login.getGoogleRecaptchaToken().then( function(gRecaptchaToken) {
				login._gRecaptchaToken = gRecaptchaToken;
				login.onLoadingCallback({});
				login._send();
			});
		} else {
			login.onLoadingCallback({});
			login._send();
		}
	};

	login.getCSRF = function(onSuccess) {
		var action = login.url + login.csrfAction;
		$.ajax({
			type : "GET",
			url: action,
			success: function(data) {
				console.log(data);
				if (data.CSRF != undefined) {
					onSuccess(data.CSRF);
				}
			},
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			statusCode: {
				500: login.onServerErrorCallback,
				400: login.onServerErrorCallback
			},
			error: login.onServerErrorCallback
		});
	};

	login.getGoogleRecaptchaToken = function() {
		document.dispatchEvent(new CustomEvent("abortExistRecaptchaTokenRequest"));
		grecaptcha.execute();

		return new Promise(function(resolve, reject){
			document.addEventListener("abortExistRecaptchaTokenRequest", function(e) {
				reject(new Error('Unknown response'));
			});
			document.addEventListener("getRecaptchaToken", function(e) {
				resolve(e.detail);
			});
		});
	};

	login.loadRecaptchaV2 = function() {
		
		//compatibilidade com IE ao usar o construtor CustomEvent
		(function () {
			if ( typeof window.CustomEvent === "function" ) return false;

			function CustomEvent ( event, params ) {
				params = params || { bubbles: false, cancelable: false, detail: null };
				var evt = document.createEvent( 'CustomEvent' );
				evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
				return evt;
			}

			window.CustomEvent = CustomEvent;
		})();

		window.onloadRecaptcha = function() {
			var recaptchaElement = document.createElement('div');
			recaptchaElement.id = 'recaptcha';
			recaptchaElement.classList.add('g-recaptcha');

			var divLogin = document.getElementsByClassName("mod-login");
			if (divLogin.length > 0) {
    			divLogin[0].appendChild(recaptchaElement);
			} else {
				document.body.appendChild(recaptchaElement);
			}

			var idRecapInstance = grecaptcha.render(recaptchaElement, {
				'sitekey': login.gCaptchaKey,
				'callback' : function (token) {
					resetRecaptcha();
					document.dispatchEvent(new CustomEvent("getRecaptchaToken", { detail: token }));
				},
				'size': 'invisible',
				'expired-callback': resetRecaptcha
			});
			var resetRecaptcha = function(){ grecaptcha.reset(idRecapInstance); };
		};

		var recaptchaScript = document.createElement('script');
		recaptchaScript.setAttribute('async', 'true');
		recaptchaScript.setAttribute('defer', 'true');
		recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=onloadRecaptcha&render=explicit');
		document.head.appendChild(recaptchaScript);
	};

    login.afterAuthenticate = function(data) {
		var _this = this;
        if (typeof data != "object" || data == null) {
        	return _this.onServerErrorCallback();
        }

        if (data.url != undefined) {
        	return onSuccess(data.url);
        }

        if (data.LoginForm_authorization != undefined) {
            data.message = data.LoginForm_authorization;
        	return _this.onAuthenticationErrorCallback(data);
		}

		if (data.LoginForm_password != undefined) {
            data.message = data.LoginForm_password;
        	return _this.onAuthenticationErrorCallback(data);
    	}

		if (data.LoginForm_captcha != undefined) {
            data.message = data.LoginForm_captcha;
			_this.onAnyErrorCallback(data);
        	return _this.showCaptchaCallback(data,_this.captcha);
    	}
    };

	login.authenticate = function(params, onSuccess) {
		var _this = this;
		var values = {
			'YII_CSRF_TOKEN' : params.key,
			'LoginForm[username]' : params.user,
			'LoginForm[password]' : params.pass
		};

		if (login.gCaptchaActive) {
			values['recaptcha'] = params.gRecaptchaToken;
		}

		if (params.captchaData != undefined) {
			values['brand_cap_challenge'] = params.captchaData.challenge;
			values['brand_cap_answer']    = params.captchaData.answer;
		}

        function afterAuthenticate(data) {
            if (typeof data != "object" || data == null) {
                    return _this.onServerErrorCallback();
            }

            if (data.url != undefined) {
                    return onSuccess(data.url);
            }

            if (data.LoginForm_authorization != undefined) {
                    data.message = data.LoginForm_authorization;
                    return _this.onAuthenticationErrorCallback(data);
            }

			if (data.LoginForm_password != undefined) {
            	data.message = data.LoginForm_password;
            	return _this.onAuthenticationErrorCallback(data);
    		}

			if (data.LoginForm_captcha != undefined) {
            	data.message = data.LoginForm_captcha;
                _this.onAnyErrorCallback(data);
                return _this.showCaptchaCallback(data,_this.captcha);
			}
        };

		function sendRequest() {
			var jxhr = $.ajax({
				type: "POST",
				url: _this.url + _this.authenticateAction,
				data: values,
				success: afterAuthenticate,
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				statusCode: {
					500: _this.onServerErrorCallback,
					400: _this.onServerErrorCallback
				},
				error: _this.onServerErrorCallback
			});
		}

		sendRequest();
	};

    login.isAuthenticated = function(onSuccess) {
		var _this = this;
        var result;

        var jxhr = $.ajax({
            type: "GET",
            url: _this.url + _this.authenticateAction,
	        dataType: "json",
	        async: false,
	        xhrFields: {
	                withCredentials: true
	        },
	        success: function(data) {
				if (data.models != undefined && data.models.logged == true) {
					var url = _this.url;
					if (data.models.url != undefined) {
						url=data.models.url;
					}
					onSuccess(url);
				}
			},
        });
    };

	login.isAuthenticated(function(url) {
		console.log('logged. redirecting...');
    	window.location = url;
    });

	if (login.gCaptchaActive) {
		login.loadRecaptchaV2();
	}

	return login;
}