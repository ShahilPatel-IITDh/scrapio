
      if (typeof transformUsername !== "undefined") {
        window.updateObj.transformUsername = transformUsername;
      }

      window.updateObj.registration = {
        parseSchema: function (schema, onSuccess, onFailure) {
          onSuccess(schema);
        },
        preSubmit: function (postData, onSuccess, onFailure) {
          onOktaRegistrationPreSubmit(postData, onSuccess, onFailure);
        },
        postRegistrationSubmit: function (response, onSuccess, onFailure) {
          onSuccess(response);
        },
      };

      //base updateObj Settings
      window.updateObj["features"] = {
        emailRecovery: true,
        restrictRedirectToForeground: false,
        hideDefaultTip: true,
        deviceFingerprinting: true,
        consent: false,
        useDeviceFingerprintForSecurityImage: false,
        router: true,
        showPasswordToggleOnSignInPage: true,
        securityImage: false,
        autoPush: true,
        smsRecovery: false,
        idpDiscovery: false,
        selfServiceUnlock: false,
        webauthn: true,
        registration: window.variantVars.reg,
        rememberMe: window.variantVars.rememberme,
        callRecovery: false,
        multiOptionalFactorEnroll: true,
        windowsVerify: true,
      };

      const updatedConfig = Object.assign(config, window.updateObj);

      // Render the Okta Sign-In Widget
      var oktaSignIn = new OktaSignIn(updatedConfig);
      oktaSignIn.renderEl({ el: "#okta-login-container" }, OktaUtil.completeLogin, function (error) {
        // Logs errors that occur when configuring the widget.
        // Remove or replace this with your own custom error handler.
        console.log(error.message, error);
      });

      //HANDLERS
      // Handle a 'ready' event using an onReady callback
      oktaSignIn.on("ready", function (context) {
        if (typeof onOktaReady == "function") {
          onOktaReady(context);
        }
      });

      // AfterRender - gets called each time a controller changes AND on initial load
      oktaSignIn.on("afterRender", function (context) {
        if (typeof onOktaRender == "function") {
          onOktaRender(context);
        }
      });

      // afterError
      oktaSignIn.on("afterError", function (context, error) {
        if (typeof onOktaError == "function") {
          onOktaError(context, error);
        }
      });

      (function () {
        // disable animation on Sonos Pro
        if (document.body.classList.contains("sbiz")) {
          jQueryCourage.fx.off = true;
        }
      })();
    