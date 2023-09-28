
  utils.loadFile("https://apis.google.com/js/api:client.js", function () {
    gapi.load('auth2', function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '134491469080-rnfrraakuo4fii80cd8ht798ceo0956j.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        "scope": "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
      });
      // attachSignin(document.getElementById('customBtn'));
      let element = document.getElementById('login-google');
      let element2 = document.getElementById('login-google2');
      auth2.attachClickHandler(element, {},
        function (googleUser) {
          utils.googleLogin({
            helpId: "signUpHelp",
            googleUser: googleUser
          });
        },
        function (error) {
          // alert(JSON.stringify(error, undefined, 2));
        });
      auth2.attachClickHandler(element2, {},
        function (googleUser) {
          utils.googleLogin({
            helpId: "signUpHelp",
            googleUser: googleUser
          });
        },
        function (error) {
          // alert(JSON.stringify(error, undefined, 2));
        });
    });
  });
  (function ($) {
    $(function () {
      let $loginEmail = $("#loginEmail"),
        $loginPassword = $("#loginPassword"),
        $loginHelp = $("#loginHelp"),
        //help error
        $loginEmailHelp = $("#loginEmailHelp"),
        $loginPwdHelp = $("#loginPwdHelp"),
        $loginButton = $("#loginButton"),
        $signUpEmail = $("#signUpEmail"),
        $signUpPassword = $("#signUpPassword"),
        $signUpRePassword = $("#signUpRePassword"),
        $goolgeHelp = $("#google-help"),
        $signUpHelp = $("#signUpHelp"),
        $signUpEmailHelp = $("#signUpEmailHelp"),
        $signUpPwdHelp = $("#signUpPwdHelp"),
        $signUpRePwdHelp = $("#signUpRePwdHelp"),
        $signUpButton = $("#signUpButton"),
        $signUpEmailIcon = $("#signUpEmailIcon"),
        $signUpEmailHints = $("#signUpEmailHints"),
        $confirmEmailTips = $(".confirm-email-tips"),
        $confirmEmail = $(".confirm-email-tips .email"),
        $confirmEmailYes = $(".confirm-email-tips .yes"),
        $confirmEmailNo = $(".confirm-email-tips .no"),
        needToAddConfirm = false,
        isConfirmUseEmail = false,
        signUpSuggestEmail = '',
        $signUpUrlIcon = $("#signUpUrlIcon"),
        $signUpUrlHints = $("#signUpUrlHints"),
        loggingIn = false,
        signingUp = false,
        $signUpCode = $("#signUpCode"),
        $signUpPwdEye = $(".sign-up-container .password .eye-box"),
        $signUpRePwdEye = $(".sign-up-container .re-password .eye-box"),
        $signInEye = $(".sign-in-container .eye-box"),
        $signUpEmailGroup = $(".sign-up-container .email"),
        $signUpPasswordGroup = $(".sign-up-container .password"),
        $signUpRePasswordGroup = $(".sign-up-container .re-password"),
        $loginEmailGroup = $(".sign-in-container .email"),
        $loginPasswordGroup = $(".sign-in-container .password");

      let redirectBox = new RedirectingBox();

      setTimeout(()=>{
        $signUpEmail.removeAttr('readonly');
        $signUpPassword.removeAttr('readonly');
        $signUpRePassword.removeAttr('readonly');
      },200)

      $signUpEmail.on("input", function () {
        $signUpEmailHelp.addClass("cc-hide");
        $signUpEmail.removeClass("cc-validate-fail2");
        $signUpEmailGroup.removeClass("error");
        $confirmEmailTips.addClass("cc-hide");
      });

      $signUpEmail.on("blur", function () {
        let email = $signUpEmail.val().trim();
        if(!$signUpEmailHelp.hasClass("cc-hide")){
          return;
        }
        if (!utils.validate2("email", $signUpEmail, $signUpEmailHelp, false, null, "!", null, "cc-error-font")) {
          $confirmEmailTips.addClass("cc-hide");
          $signUpEmailGroup.addClass("error");
          $signUpEmail.addClass("cc-validate-fail2");
          $signUpEmailHelp.removeClass("cc-hide");
          return;
        }else{
          if(!$signUpEmailHelp.hasClass("cc-hide")){
            $signUpEmailGroup.removeClass("error");
            $signUpEmail.removeClass("cc-validate-fail2");
            $signUpEmailHelp.addClass("cc-hide");
            return;
          }
        }
        $.ajax({
          type: "post",
          url: "/api/user/check-email",
          dataType: "json",
          data: {
            account: email
          },
          success: function(data) {
            if (data.code == "OK") {

            } else {
              $signUpEmailGroup.addClass("error");
              $signUpEmail.addClass("cc-validate-fail2");
              $signUpEmailHelp.html("User already exists.");
              $signUpEmailHelp.removeClass("cc-hide");
            }
          }
        });
      });

      $signUpPassword.on("input", function () {
        if(!$signUpPwdHelp.hasClass("cc-hide")){
          $signUpPasswordGroup.removeClass("error");
          $signUpPwdHelp.addClass("cc-hide");
          $signUpPassword.removeClass("cc-validate-fail2");
        }
      });

      $signUpRePassword.on("input", function () {
        if(!$signUpRePwdHelp.hasClass("cc-hide")){
          $signUpRePasswordGroup.removeClass("error");
          $signUpRePwdHelp.addClass("cc-hide");
          $signUpRePassword.removeClass("cc-validate-fail2");
        }
      });

      $signUpPwdEye.on("click", function () {
        $signUpPwdEye.toggleClass("open")
        if($signUpPassword.attr("type") === "password"){
          $signUpPassword.attr("type", "text")
        }else{
          $signUpPassword.attr("type", "password")
        }
      });

      $signUpRePwdEye.on("click", function () {
        $signUpRePwdEye.toggleClass("open")
        if($signUpRePassword.attr("type") === "password"){
          $signUpRePassword.attr("type", "text")
        }else{
          $signUpRePassword.attr("type", "password")
        }
      });

      $signUpEmail.add($signUpPassword).add($signUpRePassword).on("keypress", function (e) {
        if (e.which === 13) {
          signUp();
        }
      });

      $signUpButton.on("click", function () {
        signUp();
      });

      $signUpEmailIcon.hints({
        content: $signUpEmailHints
      });

      $signUpUrlIcon.hints({
        content: $signUpUrlHints
      });

      $loginEmail.on("input", function () {
        if(!$loginEmailHelp.hasClass("cc-hide")){
          $loginEmailGroup.removeClass("error");
          $loginEmailHelp.addClass("cc-hide");
          $loginEmail.removeClass("cc-validate-fail2");
        }
      });

      $loginPassword.on("input", function () {
        if(!$loginPwdHelp.hasClass("cc-hide")){
          $loginPasswordGroup.removeClass("error");
          $loginPwdHelp.addClass("cc-hide");
          $loginPassword.removeClass("cc-validate-fail2");
        }
      });

      $loginEmail.on("blur", function () {
        if (!utils.validate2("email", $loginEmail, $loginEmailHelp, false, null, "!", null,"cc-error-font")) {
          $loginEmailGroup.addClass("error");
          $loginEmail.addClass("cc-validate-fail2");
          $loginEmailHelp.removeClass("cc-hide");
          return;
        }else{
          if(!$loginEmailHelp.hasClass("cc-hide")){
            $loginEmailGroup.removeClass("error");
            $loginEmail.removeClass("cc-validate-fail2");
            $loginEmailHelp.addClass("cc-hide");
            return
          }
        }
      });

      $signInEye.on("click", function () {
        $signInEye.toggleClass("open")
        if($loginPassword.attr("type") === "password"){
          $loginPassword.attr("type", "text")
        }else{
          $loginPassword.attr("type", "password")
        }
      });

      $loginEmail.add($loginPassword).on("keypress", function (e) {
        if (e.which === 13) {
          login();
        }
      });

      $loginButton.on("click", function () {
        login();
      });

      function login() {
        if (loggingIn) {
          return;
        }

        if (!utils.validate2("email", $loginEmail, $loginEmailHelp, false, null, "!", null,"cc-error-font")) {
          $loginEmailGroup.addClass("error");
          $loginEmail.addClass("cc-validate-fail2")
          $loginEmailHelp.removeClass("cc-hide")
          return;
        } else {
          if($loginEmailHelp.hasClass("cc-hide")){
            $loginEmailGroup.removeClass("error");
            $loginEmailHelp.addClass("cc-hide")
          }
        }

        if (!utils.validate2("password", $loginPassword, $loginPwdHelp, false, null, "!", null,"cc-error-font")) {
          $loginPasswordGroup.addClass("error");
          $loginPassword.addClass("cc-validate-fail2");
          $loginPwdHelp.removeClass("cc-hide");
          return;
        } else {
          if($loginPwdHelp.hasClass("cc-hide")){
            $loginPasswordGroup.removeClass("error");
            $loginPwdHelp.addClass("cc-hide")
          }
        }

        $.ajax({
          url: "/api/user/handle-user-login",
          type: "POST",
          dataType: "json",
          data: {
            account: $loginEmail.val().trim(),
            upass: $loginPassword.val().trim(),
          },
          beforeSend: function () {
            loggingIn = true;
            $loginButton.html("Signing In...");
            $loginEmailGroup.removeClass("error");
            $loginEmailHelp.addClass("cc-hide");
            $loginPasswordGroup.removeClass("error");
            $loginPwdHelp.addClass("cc-hide");
          },
          success: function (data) {
            if (typeof dataLayerFun != 'undefined' && dataLayerFun.uploadBook) {
              // 这里有异步请求, 写个回调函数执行
              dataLayerFun.login(function () {
                let hasError = false;
                switch (data.code) {
                  case "OK":
                    let backUrl = utils.getParamValue("backurl");
                    if (backUrl !== '') {
                      window.location.href = backUrl;
                    } else {
                      let back = utils.getParamValue("back");
                      if (back === "1") {
                        window.location.href = document.referrer
                      } else {
                        var autoTriggerNewDashboard = data.data.hasOwnProperty('autoTriggerNewDashboard') ? data.data.autoTriggerNewDashboard : 0;
                        window.location.href = utils.getLoginLink(autoTriggerNewDashboard);//"/
                      }
                    }
                    break;
                  case "PASSWORD_ERROR":
                    if(data.data){
                      if(data.data.account_type === 'facebook'){
                        $loginEmailGroup.addClass("error");
                        $loginEmail.addClass("cc-validate-fail2");
                        $loginEmailHelp.removeClass("cc-hide").html("This is a Facebook account, try click SIGN IN WITH FACEBOOK or Forget your password to set a  new password.");
                        hasError = true;
                        break
                      }else if(data.data.account_type === 'google'){
                        $loginEmailGroup.addClass("error");
                        $loginEmail.addClass("cc-validate-fail2");
                        $loginEmailHelp.removeClass("cc-hide").html("This is a Google account, try click SIGN IN WITH GOOGLE or Forget your password to set a  new password.");
                        hasError = true;
                        break
                      }
                    }else{
                      $loginPasswordGroup.addClass("error");
                      $loginPassword.addClass("cc-validate-fail2").focus();
                      $loginPwdHelp.removeClass("cc-hide").html("Incorrect Password.");
                      hasError = true;
                      break;
                    }
                  case "ACCOUNT_NOT_EXISTS":
                    $loginEmailGroup.addClass("error");
                    $loginEmail.addClass("cc-validate-fail2");
                    $loginEmailHelp.removeClass("cc-hide").html("User not exist.");
                    hasError = true;
                    break;
                  case "4":

                    break;
                  case "5":

                    break;
                  default:
                    $loginHelp.html(fh5.pageData.tips.UnexpectedError2);
                    hasError = true;
                }

                if (hasError) {
                  $loginButton.html("Sign In");
                }
                loggingIn = false;

              })
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $loginHelp.html(fh5.pageData.tips.UnexpectedError2);
            loggingIn = false;
            $loginButton.html("Sign In");
          }
        });
      }

      function refreshCode(isLoadGoggleCode) {
        if (isLoadGoggleCode) {
          window.grecaptcha.reset();
        } else {
          let oldSrc = $codeImg.attr("src"),
            newSrc = oldSrc.match(/\?\d+/g) ? oldSrc.replace(/\?\d+/g, "?" + new Date().getTime()) : oldSrc + "?" + new Date().getTime();
          $codeImg.attr("src", newSrc);
        }
      }

      function signUp() {
        let isLoadGoggleCode = $(".signup-code").hasClass("cc-hide"); // 是否加载谷歌验证码

        if (signingUp) {
          return;
        }

        if(!$signUpEmailHelp.hasClass("cc-hide") && $signUpEmailHelp[0].innerText==='User already exists.'){
          $confirmEmailTips.addClass("cc-hide");
          return;
        }else {
          if (!utils.validate2("email", $signUpEmail, $signUpEmailHelp, false, null, "!", null, "cc-error-font")) {
            $confirmEmailTips.addClass("cc-hide");
            $signUpEmailGroup.addClass("error");
            $signUpEmail.addClass("cc-validate-fail2");
            $signUpEmailHelp.removeClass("cc-hide");
            return;
          }
        }

        if (!utils.validate2("password", $signUpPassword, $signUpPwdHelp, false, null, "!", null,"cc-error-font")) {
          $signUpPasswordGroup.addClass("error");
          $signUpPassword.addClass("cc-validate-fail2");
          $signUpPwdHelp.removeClass("cc-hide");
          return;
        } else {
          if(!$signUpPwdHelp.hasClass("cc-hide")){
            $signUpPasswordGroup.removeClass("error");
            $signUpPassword.removeClass("cc-validate-fail2");
            $signUpPwdHelp.addClass("cc-hide")
          }
        }

        if (!utils.validate2("repassword", $signUpRePassword, $signUpRePwdHelp, false, $signUpPassword[0].value, "!", null,"cc-error-font")) {
          $signUpRePasswordGroup.addClass("error");
          $signUpRePassword.addClass("cc-validate-fail2");
          $signUpRePwdHelp.removeClass("cc-hide");
          return;
        } else {
          if(!$signUpRePwdHelp.hasClass("cc-hide")){
            $signUpRePasswordGroup.removeClass("error");
            $signUpRePassword.removeClass("cc-validate-fail2");
            $signUpRePwdHelp.addClass("cc-hide");
          }
        }

        if (isLoadGoggleCode && !window._RecaptchaResponse) {
          $goolgeHelp.addClass("error-text").removeClass("cc-hide cc-error-font").html("Please check the above box to let us know you're human.");
          return;
        }

        if (!isLoadGoggleCode) {
          if (!utils.validate2("verificationCode", $signUpCode, $goolgeHelp, false, null, null, null, null)) {
            $("#signUpCode").parent().addClass("error-border");
            $(".code-wrap").addClass("error");
            return;
          }
        }

        let redirectBox = new RedirectingBox();
        redirectBox.show($("body"));

        //注册账号
        let signUpData = {
          account: $signUpEmail.val().trim(),
          upass: $signUpPassword.val().trim(),
          codeType: isLoadGoggleCode ? 2 : 1,
          code: isLoadGoggleCode ? window._RecaptchaResponse : $signUpCode.val().trim(),
        }

        if (isConfirmUseEmail && needToAddConfirm) {
          signUpData.isConfirm = 1
        }

        $.ajax({
          url: '/api/user/handle-user-signup',
          type: "POST",
          dataType: "json",
          data: signUpData,
          beforeSend: function () {
            $signUpEmailGroup.removeClass("error");
            $signUpPasswordGroup.removeClass("error");
            $signUpRePasswordGroup.removeClass("error");
            $signUpEmail.removeClass("cc-validate-fail2");
            $signUpEmailHelp.addClass("cc-hide")
            $confirmEmailTips.addClass("cc-hide");
            signingUp = true;
            $signUpButton.html("Signing Up...");
            $goolgeHelp.addClass("cc-hide");
            $("#signUpCode").parent().removeClass("error-border");
            $(".code-wrap").removeClass("error");
          },
          success: function (data) {
            let hasError = false;
            if(data.data){
              signUpSuggestEmail = data.data.did_you_mean
            }
            switch (data.code) {
              case "OK":
                if (typeof ga == "function") {
                  ga('send', 'event', 'register', 'register.signup', document.location.pathname);
                }
                window.location.href = "/activate-account/"; //添加注册新账户,邮箱激活
                break;
              case "ACCOUNT_ALREADY_EXISTS":
                $signUpEmailGroup.addClass("error");
                $signUpEmail.addClass("cc-validate-fail2").focus();
                $signUpEmailHelp.removeClass("cc-hide").html("User already exists.");
                hasError = true;
                break;
              case "SYSTEM_BLACK_LIST":
                $signUpEmailGroup.addClass("error");
                $signUpEmail.addClass("cc-validate-fail2").focus();
                $signUpEmailHelp.removeClass("cc-hide").html("The email can not be registered because your IP has been blacklisted.");
                hasError = true;
                break
              case "VERIFY_CODE_ERROR":
                $(".code-wrap").addClass("error");
                $("#signUpCode").parent().addClass("error-border");
                $goolgeHelp.removeClass("cc-hide").html(fh5.pageData.tips.VerificationCodeError);
                hasError = true;
                break;
              case "4": //邮箱验证失败
                $signUpEmailGroup.addClass("error");
                $signUpEmail.addClass("cc-validate-fail2").focus();

                if (signUpSuggestEmail) {
                  $signUpEmailHelp.addClass("cc-hide");
                  $confirmEmailTips.removeClass("cc-hide");
                  $confirmEmail.html(signUpSuggestEmail);
                } else {
                  $signUpEmailHelp.removeClass("cc-hide").html("This email address is suspected, it can not be registered.");
                }
                hasError = true;
                break;
              case "5": //邮箱地址错误
                redirectBox.cancel();
                $signUpEmailGroup.addClass("error");
                $signUpEmail.addClass("cc-validate-fail2").focus();
                $signUpEmailHelp.addClass("cc-hide");
                $confirmEmailTips.removeClass("cc-hide");
                $confirmEmail.html(signUpSuggestEmail);
                needToAddConfirm = true
                hasError = true;
                break;
              default:
                $signUpHelp.removeClass("cc-hide").html(fh5.pageData.tips.UnexpectedError2);                hasError = true;
            }

            if (hasError) {
              redirectBox.cancel();
              refreshCode(isLoadGoggleCode);
              $signUpButton.html("Sign Up");
            }
            signingUp = false;
          },
          error: function () {
            redirectBox.cancel();
            refreshCode(isLoadGoggleCode);
            $signUpHelp.html(fh5.pageData.tips.UnexpectedError2);
            signingUp = false;
            $signUpButton.html("Sign Up");
          }
        });
      }

      // 采用推荐邮箱地址
      $confirmEmailYes.on("click", function () {
        $signUpEmailGroup.removeClass("error");
        $confirmEmailTips.addClass("cc-hide");
        $signUpEmail.val(signUpSuggestEmail).removeClass("cc-validate-fail2");
      });

      $confirmEmailNo.on("click", function () {
        $signUpEmailGroup.removeClass("error");
        $confirmEmailTips.addClass("cc-hide");
        $signUpEmail.removeClass("cc-validate-fail2");
        isConfirmUseEmail = true
      })

      // Facebook登录
      $("#signup-facebook").on("click", function () {
        if (typeof window.open === 'undefined') {
          // 浏览器阻止了弹窗
          alert('Please disable your popup blocker and try again.');
        } else {
          // 打开弹窗进行登录
          utils.loginByFB({
            helpId: "signUpHelp",
          });
        }
      });

      $("#login-facebook").on("click", function () {
        if (typeof window.open === 'undefined') {
          // 浏览器阻止了弹窗
          alert('Please disable your popup blocker and try again.');
        } else {
          // 打开弹窗进行登录
          utils.loginByFB({
            helpId: "loginHelp",
          });
        }
      });

      let $codeImg = $(".cc-sign-up-code");

      $codeImg.on("click touchstart", function () {
        $codeImg.attr('src', '/userLoad/code.php?' + new Date().getTime());
      });

      let $window = $(window),
        $loginNetwork = $(".login-network"),
        $loginUser = $(".login-user");

      function resize() {
        if ($window.width() < 992 - 17) {
          if ($loginNetwork.next().is($loginUser)) {
            $loginUser.after($loginNetwork);
          }
        } else {
          if ($loginUser.next().is($loginNetwork)) {
            $loginNetwork.after($loginUser);
          }
        }
      }

      resize();

      $(window).on("resize", function () {
        resize();
      });

    });
  })(window.jQuery);
