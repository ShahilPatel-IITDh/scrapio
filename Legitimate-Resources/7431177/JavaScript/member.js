/* LOGIN */
//    function renderGoogleButton() {
//        // GOOGLE
//        // https://developers.google.com/+/web/signin/
//        // 새로고침 시 onsuccess가 발동하는 문제가있음
//        gapi.signin2.render('google-login-button', {
//            'scope': 'profile email',
//            'width': 240,
//            'height': 50,
//            'longtitle': false,
//            'theme': 'dark',a
//            'onsuccess': onSuccess_google,
//            'onfailure': onFailure_google
//        });
//    }


$(document).ready(function(){
    if(IS_LOGINED>0){
        $(".login-before").removeClass("active");
        $(".login-after").addClass("active");
    }else{
        $(".login-before").addClass("active");
        $(".login-after").removeClass("active");
    }

    /* 2020.02.13 재헌
     * lang 설정에 따라 header-side-nav 내 텍스트를 변경한다.
     */
    var lang = LANG ? LANG : 'ko';
    switch(lang) {
        case 'en':
            $('.header-side-nav .login-link > a').text('Sign in');
            $('.header-side-nav .join-link > a').text('Sign up');
            $('.header-side-nav .logout-link > a').text('Sign out');
            $('.header-side-nav .mypage-link > a').text('My Page');
            break;
        case 'ko':
        default:
            break;
    }
});

function onSuccess_kakao(authObj, res) {
    // 2019.03.28 카카오 정책변경
    // https://devtalk.kakao.com/t/topic/71560
    var account = res.id;
    var email = res.kaccount_email;
    var name = res.properties.nickname;
    var sid = res.id;
    var token = authObj.access_token;
    var sc_type = 2; // 2 : kakao


    // if (email == undefined) {
    //     // kakao 계정을 id로 지정
    //     email = res.id;
    // }
    snsLoginProcess(account, email, name, sid, token, sc_type);
}

function onFailure_kakao() {

}

function onSuccess_google(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    var email = profile.getEmail();
    var name = profile.getName();
    var sid = profile.getId();
    var token =  googleUser.getAuthResponse().id_token;
    var sc_type = 3; // 3 : google

    snsLoginProcess(sid, email, name, sid, token, sc_type);

    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

function onFailure_google(error) {
    switch (error.error) {
        case "popup_blocked_by_browser":
            alert(lang.blocked_popup);
            break;
        case "popup_closed_by_user":
            // $("#google-login-button").trigger('click');
            break;
    }
}

$('#naver-login-button').on('click', function() {
    // var client_id = NAVER_CLIENT_ID;
    // var redirectURI = encodeURIComponent(document.location.href.replace(/\/$/, "") + "/oauth/callback.php?cliendId=" + NAVER_CLIENT_ID);
    // var state = qv_func.randomId();
    // var apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" + client_id + "&redirect_uri=" + redirectURI + "&state=" + state;
    //
    location.href = $(this).data('authUrl');
});

$("#kakao-login-button").on('click', function() {
    Kakao.Auth.login({
        success: function(authObj) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function(res) { onSuccess_kakao(authObj, res); }
            });
        },
        fail: function(err) {
            alert(JSON.stringify(err));
        }
    });
});

function plusFriendChat() {
    if (KAKAO_PLUS_FRIEND_ID == '') {
        alert(lang.not_complete_kakao_plus);
    }
    else {
        Kakao.PlusFriend.chat({
            plusFriendId: KAKAO_PLUS_FRIEND_ID // 플러스친구 홈 URL에 명시된 id로 설정합니다.
        });
    }
}

// Call login API on a click event
$("#google-login-button").on('click', function() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: GOOGLE_CLIENT_ID,
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        //attachSignin(document.getElementById('customBtn'));

        grantPermissions();

        // API call for Google login
        gapi.auth2.getAuthInstance().signIn().then(
            function(success) {
                // Login API call is successful
                onSuccess_google(success);
            },
            function(error) {
                // Error occurred
                // console.log(error) to find the reason
                onFailure_google(error);
            }
        );
    });
});

// 브라우저에서 팝업을 막고있으면 popup_closed_by_user 에러가 나면서 로그인 인증이 정상적으로 되지않아 아래와 같이 조치
// https://github.com/google/google-api-javascript-client/issues/293
function grantPermissions() {
    var auth2 = gapi.auth2.getAuthInstance();
    var options = new gapi.auth2.SigninOptionsBuilder();
    options.setAppPackageName('quv');
    options.setPrompt('consent');
    options.setScope('https://www.googleapis.com/auth/contacts.readonly');

    auth2.currentUser.get().grant(options).then(function(response){
        console.log('user consent taken');
        console.log(auth2.currentUser.get().getBasicProfile());

        var profile = auth2.currentUser.get().getBasicProfile();
        var successServerSignIn = function() {
            $scope.signingIn = true;
            $state.go('main');
        };
        var failServerSignIn = function() {
            $scope.signingIn = false;
            $scope.error = "Incorrect login or password";
            $state.go('auth.register');
        };
        User.gapiRegister(profile.getEmail(), profile.getName()).then(successServerSignIn, failServerSignIn);
    }, function(err) {
        console.log("something went wrong while granting option");
        console.log(err);
        $state.go('auth.register');
    });
};

function snsLoginProcess(account, email, name, sid, token, sc_type) {
    var sns_array = {0:'일반', 1:'NAVER', 2:'KAKAO', 3:'GOOGLE', 4:'FACEBOOK'};
    var result = [];
    var obj = new Object();

    obj.account = account;
    obj.email = email;
    obj.name = name;
    obj.sid = sid;
    obj.token = token;
    obj.sc_type = sc_type;
    result.push(obj);

    qvjax_direct(
        "login_member_userside_sns",
        "/module/member/member.php",
        'stid=' + QV_BASE_OBJ.stid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
        function (data) {
            if (data.message == "ERROR") {
                switch (data.code) {
                    case 1350 :
                        alert(lang.sns_login_error_1350);
                        break;
                    case 1351 :
                        var sc_type = sns_array[data.sc_type == '' ? 0 : data.sc_type];
                        alert(lang.sns_login_error_1351(sc_type));
                        break;
                    case 1354 :
                        // 회원가입 페이지로 리다이렉트, POST로 데이터를 넘긴다
                        //var url = "/module/member/join.html";
                        var url = "/join";
                        var form = $('<form action="' + url + '" method="post" style="display:none;">' +
                            '<input type="text" name="account" value="' + obj.account + '" />' +
                            '<input type="text" name="email" value="' + obj.email + '" />' +
                            '<input type="text" name="name" value="' + obj.name + '" />' +
                            '<input type="text" name="sc_type" value="' + obj.sc_type + '" />' +
                            '<input type="text" name="sid" value="' + obj.sid + '" />' +
                            '</form>');
                        $('body').append(form);
                        form.submit();
                        break;
                    case 1356 :
                        alert(lang.login_error_1356);
                        break;
                    case 1357 :
                        alert(lang.login_error_1357);
                        break;
                }
            }
            else {
                alert(lang.complete_login);
                location.href="/";
            }
        },
        function (xhr) {

        }
    );
}

$('.login-form-pw').on('keydown',function(e) {
    if (e.keyCode == 13) {
        $(".login-confirm").trigger('click');
    }
});

$('.login-confirm').on('click', function() {
    var basic_result = [];
    var obj = new Object();
    var id = $('.login-form-id').val().replace(/'/g, '\\\'');
    var pw = $('.login-form-pw').val().replace(/'/g, '\\\'');

    // 입력부 체크 필요
    id = id == "undefined" ? "" : id.trim();
    pw = pw == "undefined" ? "" : pw.trim();
    if(!id || id.length<1){ alert(lang.enter_account); return false; }
    if(!pw || pw.length<1){ alert(lang.enter_password); return false; }

    obj.id = id;
    obj.pw = pw;
    basic_result.push(obj);
    var result = basic_result;

    qvjax_direct(
        "login_member_userside",
        "/module/member/member.php",
        'stid=' + QV_BASE_OBJ.stid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
        function (data) {
            if (data.message == "ERROR") {
                switch (data.code) {
                    case 1355 :
                        alert(lang.login_error_1355);
                        break;
                    case 1356 :
                        alert(lang.login_error_1356);
                        break;
                    case 1357 :
                        alert(lang.login_error_1357);
                        break;
                    case 1358 :
                        alert(lang.login_error_1358);
                        break;
                    case 1359 :
                        alert(lang.login_error_1359);
                        break;
                }
            }
            else {
                alert(lang.complete_login);
                location.href="/";
                //$('#LoginModal').modal('hide');
            }
        },
        function (xhr) {}
    );
});

//19.10.29 blueweb-custom loginBox -> .mlBox .LogOutBtn
$('.header #LogOutBtn, .header-mobile #LogOutBtn, .mlBox .LogOutBtn').on('click', function() {
    qvjax_direct(
        "logout_member_userside",
        "/module/member/member.php",
        'stid=' + QV_BASE_OBJ.stid,
        function (data) {
            //alert('로그아웃');
            location.href="/";
        },
        function (xhr) {}
    );
});

$('#login-options-join').on('click', function() {
    //location.href = "/module/member/join.html";
    //location.href = "/join";
    $('#LoginModal').modal('hide');
    if (NAVER_CLIENT_ID == '' && KAKAO_CLIENT_ID == '' && GOOGLE_CLIENT_ID == '') {
        location.href = "/join";
    }
    else {
        $('#JoinModal').modal('show');
    }
});
$('#login-options-find').on('click', function() {
    qvjax_direct(
        "count_mail_setting",
        "/module/mail/mail.php",
        '',
        function (data) {
            if (parseInt(data) > 0) {
                $('#LoginModal').modal('hide');
                $('#FindPasswordModal').modal('show');
            }
            else { alert(lang.not_complete_receive_email); }
        },
        function (xhr) { alert(lang.not_complete_receive_email); }
    );
});

// FIND MODAL
// 2018.10.16 재헌
// recapcha 걷어냄
// var isRecaptchaRender = false;
// $('#FindPasswordModal').on('show.bs.modal', function (e) {
//     if (!isRecaptchaRender) {
//         grecaptcha.render('find-password-recaptcha', {
//             'sitekey': GOOGLE_CAPTCHA_KEY,
//             'callback': recaptchaCallback,
//             'expired-callback': recaptchaExpired
//         });
//         isRecaptchaRender = true;
//     }
//     else {
//         grecaptcha.reset();
//     }
// });
//
// var recaptchaCallback = function(response) {
//     var response = grecaptcha.getResponse();
//     $('#hidden-grecaptcha').val(response);
//     $('.recaptcha-error-message').remove();
// };
// var recaptchaExpired = function(response) {
//     $('#hidden-grecaptcha').val('');
// };
//
// function find_recaptcha_valid() {
//     // ReCaptcha form이 존재하지 않으면 true 리턴
//     if ($('#find-password-recaptcha-form').length == 0) {
//         return true;
//     }
//
//     $('.recaptcha-error-message').remove();
//     var value = $('#hidden-grecaptcha').val();
//     if (value != '' && value != undefined) {
//         return true;
//     }
//     else {
//         var html = '<div class="recaptcha-error-message">* 실제 사용자임을 인증해 주세요.</div>';
//         $('.find-password-captcha').append(html);
//
//         return false;
//     }
// }

function find_password_confirm() {
    $('.find-password-error').remove();
    $('#FindPasswordModal').addClass('proceeding');
    var result = [];
    var obj = new Object();
    obj.account = $('#find-password-form-account').val();
    obj.link = location.origin;
    result.push(obj);

    qvjax_direct(
        "send_mail_find_password",
        "/module/mail/mail.php",
        'stid=' + QV_BASE_OBJ.stid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
        function (data) {
            if (data.message == "ERROR") {
                switch (data.code) {
                    case 1360 :
                        var html = '<div class="find-password-error">' + lang.login_error_1360 + '</div>';
                        $('.find-password-form').after(html);
                        break;
                }
                $('#FindPasswordModal').removeClass('proceeding');
            }
            else {
                alert(lang.success_send_guide_mail);
                $('#FindPasswordModal').removeClass('proceeding');
                $('#FindPasswordModal').modal('hide');
            }
        },
        function (xhr) {
            // console.log("find_password_confirm error");
            $('#FindPasswordModal').removeClass('proceeding');
            alert(lang.failure_send_guide_mail)
        }
    );

    // 2018.10.16 재헌
    // recapcha 걷어냄
    //if (find_recaptcha_valid()) { }
}

function change_password_confirm() {
    $('.change-password-warning').remove();
    $('#ChangePasswordModal').addClass('proceeding');

    var result = [];
    var obj = new Object();

    var pw1 = $('#change-pw1').val();
    var pw2 = $('#change-pw2').val();

    if (pw1 == pw2) {
        if (pw1 == '') {
            $('.change-password-form').after('<div class="change-password-warning">* ' + lang.required_input_element + '</div>');
        }
        else {
            var query = qv_func.getUrlParams();
            obj.key = query.t;
            obj.password = pw1;
            result.push(obj);

            qvjax_direct(
                "update_member_password",
                "/module/member/member.php",
                'stid=' + QV_BASE_OBJ.stid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
                function (data) {
                    alert(lang.complete_change);
                    $('#ChangePasswordModal').removeClass('proceeding');
                    $('#ChangePasswordModal').modal('hide');
                },
                function (xhr) {
                    $('#ChangePasswordModal').removeClass('proceeding');
                    switch(xhr.responseText.trim()) {
                        case 'password':
                            $('.change-password-form').after('<div class="change-password-warning">* ' + lang.invalid_format + '</div>');
                            break;
                        case 'key':
                            $('.change-password-form').after('<div class="change-password-warning">* ' + lang.invalid_access + '</div>');
                            break;
                        case 'date':
                            $('.change-password-form').after('<div class="change-password-warning">* ' + lang.expired_certification + '</div>');
                            break;
                        case 'state':
                            $('.change-password-form').after('<div class="change-password-warning">* ' + lang.already_change_password + '</div>');
                            break;
                    }
                }
            );
        }
    }
    else {
        $('#ChangePasswordModal').removeClass('proceeding');
        alert(lang.different_password);
    }
}




/* JOIN */
function initSocialJoinModal() {

}

function join_terms_init() {
    qvjax_direct(
        "select_terms",
        "/module/member/member.php",
        'stid=' + QV_BASE_OBJ.stid,
        function (data) {
            $.each(data, function() {
                var txt = this.stms_txt
                $('#terms-textarea-' + this.stms_type).val(txt);
            });

            $('.join-content').show();
        },
        function (xhr) {
            alert(lang.problem_term);
        }
    );
}

function join_form_init() {
    // SNS로 회원가입
    if (post_sc_type != '' && post_sc_type != 0) {
        $('#id').val(post_account);
        $('#id').prop('disabled', true);
        $('.join-form-id').css('background', 'rgb(235, 235, 228)');

        if (post_name == '' || post_name == 'undefined') {
            $('#name').val('');
        }
        else {
            $('#name').val(post_name);
            $('#name').prop('disabled', true);
            $('.join-form-name').css('background', 'rgb(235, 235, 228)');
        }

        if (post_email == '' || post_email == 'undefined') {
            $('#email').attr('placeholder', lang.email);
        }
        else {
            //$('.join-form-email').remove();
            $('#email').val(post_email);
            $('#email').prop('disabled', true);
            $('.join-form-email').css('background', 'rgb(235, 235, 228)');
        }

        $('.join-form-group1').hide();
        $('.join-form-pw1').remove();
        $('.join-form-pw2').remove();
        $('.password-notice').remove();

        $('.join-form').data('type', post_sc_type);
    }
    else {
        $('.join-form').data('type', 0);
    }

    qvjax_direct(
        "select_site_info",
        "/module/member/member.php",
        'stid=' + QV_BASE_OBJ.stid,
        function (data) {
            if (data.length > 0) {
                $.each(data, function() {
                    var account_type = this.ssi_member_account_type;
                    if (account_type == 0) {
                        //$('.join-form-email').show();
                    }
                    else if (account_type == 1 && post_sc_type == 0) {
                        $('.join-form-email').remove();
                        $('#id').prop('placeholder', lang.account);
                    }

                    qvjax_direct(
                        "select_member_table_info",
                        "/module/member/member.php",
                        'stid=' + QV_BASE_OBJ.stid,
                        function (data) {
                            var default_field = ['name', 'phone', 'birth', 'address'];
                            $.each(data, function() {
                                if ($.inArray(this.fid, default_field) > -1) {
                                    var description = this.description;
                                    if (this.fid == 'name') {
                                        if (description != '') {
                                            $('#name').prop('placeholder', description);
                                        }
                                        if (this.displayed==0) {
                                            $('.join-form-name').remove();
                                        }
                                        $('.join-form-name').data('required', this.required == 0 ? false : true);
                                    }

                                    if (this.fid == 'phone') {
                                        if (description != '') {
                                            $('#phone').prop('placeholder', description);
                                        }
                                        if (this.displayed==0) {
                                            $('.join-form-phone').remove();
                                        }
                                        $('.join-form-phone').data('required', this.required == 0 ? false : true);
                                    }

                                    if (this.fid == 'address') {
                                        if (this.displayed==0) {
                                            $('.join-form-group3').remove();
                                        }
                                        $('.join-form-address1').data('required', this.required == 0 ? false : true);
                                    }

                                    if (this.fid == 'birth') {
                                        if (this.displayed==0) {
                                            $('.join-form-birth').remove();
                                        }
                                        $('.join-form-birth').data('required', this.required == 0 ? false : true);
                                    }

                                    if ($('.join-form-group2').children().length == 0) {
                                        $('.join-form-group2').remove();
                                    }
                                }
                                else {
                                    join_form_add(this.fid, this.type, this.name, this.description, this.options, this.displayed==1 ? true : false, this.required==1 ? true : false);
                                }
                            });

                            $('.join-content').show();
                        },
                        function (xhr) { alert(xhr.responseText); }
                    );
                });
            }
            else {
            }
        },
        function (xhr) { alert(xhr.responseText); }
    );
}

function join_recaptcha_init(sitekey) {
    if (sitekey == '' || sitekey == undefined) {
        return true;
    }

    var html = '<form id="join-recaptcha-form" method="POST" style="display:none;">'
        + '<div id="join-recaptcha" class="g-recaptcha" data-sitekey="' + sitekey + '" data-callback="recaptchaCallback" data-expired-callback="recaptchaExpired"></div>'
        + '<input id="hidden-grecaptcha" name="hidden-grecaptcha" type="hidden"/>'
        + '</form>';
    $('.join-form-group-captcha').append(html);
}

function join_recaptcha_valid() {
    // ReCaptcha form이 존재하지 않으면 true 리턴
    if ($('#join-recaptcha-form').length == 0) {
        return true;
    }

    $('.recaptcha-error-message').remove();
    var value = $('#hidden-grecaptcha').val();
    if (value != '' && value != undefined) {
        return true;
    }
    else {
        var html = '<div class="recaptcha-error-message">* 실제 사용자임을 인증해 주세요.</div>';
        $('.join-form-group-captcha').append(html);

        return false;
    }
}

function join_form_add(fid, type, name, description, options, displayed, required) {
    if (!displayed) return;

    var html = '<div data-type="' + type + '" data-id="' + fid + '">';

    if (required) {
        html += '<h4 class="required">' + name + '</h4>';
    }
    else {
        html += '<h4>' + name + '</h4>';
    }
    html += '<p>' + description + '</p>';
    html += '<div class="join-form-group-custom">';
    html += '<div class="join-form-' + fid + '">';

    switch(type) {
        case "1": // 짧은 텍스트
            html += '<input type="text" id="' + fid + '">';
            break;
        case "2": // 긴 텍스트
            html += '<textarea id="' + fid + '"></textarea>';
            break;
        case "3": // 체크 박스
            var option = options.split('|').filter(function (v) { return v !== '' });
            $.each(option, function() {
                html += '<label class="checkbox-inline join-form-checkbox">';
                html += '<input type="checkbox" class="form-contents-checkbox-item" value="' + this + '" name="check' + fid + '">';
                html += this + '</label>';
            });
            break;
        case "4": // 옵션 버튼
            var option = options.split('|').filter(function (v) { return v !== '' });
            $.each(option, function() {
                html += '<label class="radio-inline join-form-checkbox">';
                html += '<input type="radio" class="form-contents-checkbox-item" value="' + this + '" name="radio' + fid + '">';
                html += this + '</label>';
            });
            break;
        case "5": // 드롭 다운
            var option = options.split('|').filter(function (v) { return v !== '' });
            html += '<select class="join-form-dropdown">';
            $.each(option, function() {
                html += '<option value="' + this + '">' + this + '</option>';
            });
            html += '</select>';
            break;
        case "6": // 주소
            break;
        case "7": // 연락처
            break;
        case "8": // 이메일
            break;
    }

    html += '</div></div></div>';


    $('.join-form-group4').append(html);
}

function join_form_submit() {
    $('.join-container .join-required-warning').remove();
    $('.join-container .join-validation-warning').remove();

    var basic_result = [];
    var custom_result = [];
    var obj = new Object();
    var valid = true;
    var sc_type = $('.join-form').data('type');

    if (sc_type == 0) {
        // 기본 정보 시작
        var id = $('.join-form-id > input').val();
        var pw1 = $('.join-form-pw1 > input').val().replace(/'/g, '\\\'');
        var pw2 = $('.join-form-pw2 > input').val().replace(/'/g, '\\\'');
        obj.sid = 0;
        // ID
        if (id == '' || id == undefined)
            valid = !join_required_warning($('.join-form-id'));
        else
            obj.account = id.replace(/'/g, '\\\'');

        // NAME
        if ($('.join-form-name').length > 0) {
            var name = $('.join-form-name > input').val();

            if ((name == '' || name == undefined) && $('.join-form-name').data('required'))
                valid = !join_required_warning($('.join-form-name'));
            else
                obj.name = name.replace(/'/g, '\\\'');
        }

        // PHONE
        if ($('.join-form-phone').length > 0) {
            var phone = $('.join-form-phone > input').val();

            if ((phone == '' || phone == undefined) && $('.join-form-phone').data('required'))
                valid = !join_required_warning($('.join-form-phone'));
            else
                obj.phone = phone.replace(/'/g, '\\\'').replace(/-/gi, '');
        }

        // ZIPCODE & ADDRESS
        if ($('.join-form-zipcode').length > 0 && $('.join-form-address1').length > 0 && $('.join-form-address2').length > 0) {
            var zipcode = $('.join-form-zipcode > input').val().replace(/'/g, '\\\'');
            var address1 = $('.join-form-address1 > input').val().replace(/'/g, '\\\'');
            var address2 = $('.join-form-address2 > input').val().replace(/'/g, '\\\'');

            if ((zipcode == '' || address1 == '' || address2 == '') && $('.join-form-address1').data('required'))
                valid = !join_required_warning($('.join-form-address2'));
            else {
                obj.zip = zipcode;
                obj.addr1 = address1;
                obj.addr2 = address2;
            }
        }

        // BIRTH
        if ($('.join-form-birth-y').length > 0 && $('.join-form-birth-m').length > 0 && $('.join-form-birth-d').length > 0) {
            var birth_y = $('.join-form-birth-y > input').val();
            var birth_m = $('.join-form-birth-m > input').val();
            var birth_d = $('.join-form-birth-d > input').val();

            if ((birth_y == '' || birth_m == '' || birth_d == '') && $('.join-form-birth').data('required')) {
                valid = !join_required_warning($('.join-form-birth'));
            }
            else {
                obj.birth = birth_y + birth_m + birth_d;
            }
        }

        // EMAIL
        if ($('.join-form-email').length > 0) {
            var email = $('.join-form-email > input').val().replace(/'/g, '\\\'');

            if (email == '')
                valid = !join_required_warning($('.join-form-email'));
            else
                obj.email = email;
        }

        // PASSWORD
        if (pw1 == pw2) {
            if (pw1 == '')
                valid = !join_required_warning($('.join-form-pw1'));
            else
                obj.password = pw1;
        }
        else {
            alert(lang.different_password);
        }
    }
    else { // SNS로 회원가입
        // 기본 정보 시작
        var id = post_account;
        var name = post_name == "undefined" ? $('#name').val() : post_name;
        var email = post_email == "undefined" ? $('#email').val() : post_email;
        var sid = post_sid;
        var phone = $('.join-form-phone > input').val();

        obj.account = id;
        obj.sid = sid;

        // NAME
        if ($('.join-form-name').length > 0) {
            var name = $('.join-form-name > input').val();

            if ((name == '' || name == undefined) && $('.join-form-name').data('required'))
                valid = !join_required_warning($('.join-form-name'));
            else
                obj.name = name.replace(/'/g, '\\\'');
        }

        // EMAIL
        if ($('.join-form-email').length > 0) {
            var email = $('.join-form-email > input').val().replace(/'/g, '\\\'');

            if (email == '')
                valid = !join_required_warning($('.join-form-email'));
            else
                obj.email = email;
        }

        if ($('.join-form-phone').length > 0) {
            if (phone == '' && $('.join-form-phone').data('required'))
                valid = !join_required_warning($('.join-form-phone'));
            else
                obj.phone = phone.replace(/'/g, '\\\'').replace(/-/gi, '');
        }

        if ($('.join-form-zipcode').length > 0 && $('.join-form-address1').length > 0 && $('.join-form-address2').length > 0) {
            var zipcode = $('.join-form-zipcode > input').val().replace(/'/g, '\\\'');
            var address1 = $('.join-form-address1 > input').val().replace(/'/g, '\\\'');
            var address2 = $('.join-form-address2 > input').val().replace(/'/g, '\\\'');

            if ((zipcode == '' || address1 == '' || address2 == '') && $('.join-form-address1').data('required'))
                valid = !join_required_warning($('.join-form-address2'));
            else {
                obj.zip = zipcode;
                obj.addr1 = address1;
                obj.addr2 = address2;
            }
        }

        if ($('.join-form-birth-y').length > 0 && $('.join-form-birth-m').length > 0 && $('.join-form-birth-d').length > 0) {
            var birth_y = $('.join-form-birth-y > input').val();
            var birth_m = $('.join-form-birth-m > input').val();
            var birth_d = $('.join-form-birth-d > input').val();

            if ((birth_y == '' || birth_m == '' || birth_d == '') && $('.join-form-birth').data('required')) {
                valid = !join_required_warning($('.join-form-birth'));
            }
            else {
                obj.birth = birth_y + birth_m + birth_d;
            }
        }
    }

    obj.alarm = post_terms_alarm == "true" ? 1 : 0;
    obj.sc_type = sc_type;

    basic_result.push(obj);
    // 기본 정보 끝

    // 사용자 지정 정보 시작
    var custom = $('.join-form-group4 > div');
    $.each(custom, function() {
        var custom_obj = new Object();
        var id = $(this).data('id');
        var type = $(this).data('type');

        switch (type) {
            case 1: // 짧은 텍스트
                var val = $(this).find('input').val().replace(/'/g, '\\\'');
                var required = $(this).children('h4').hasClass('required');
                if (val == '' && required) {
                    valid = !join_required_warning($(this));
                }
                else {
                    custom_obj.key = id;
                    custom_obj.value = val;
                    custom_result.push(custom_obj);
                    //join_form_push_array(result, id, val, required);
                }
                break;
            case 2: // 긴 텍스트
                var val = $(this).find('textarea').val().replace(/'/g, '\\\'');
                var required = $(this).children('h4').hasClass('required');
                if (val == '' && required) {
                    valid = !join_required_warning($(this));
                }
                else {
                    custom_obj.key = id;
                    custom_obj.value = val;
                    custom_result.push(custom_obj);
                    //join_form_push_array(result, id, val, required);
                }
                break;
            case 3: // 체크 박스
            case 4: // 옵션 버튼
                var val = '|';
                var required = $(this).children('h4').hasClass('required');
                $(this).find('input:checked').each(function() {
                    val += $(this).val() + '|';
                });
                if (val == '|' && required) {
                    valid = !join_required_warning($(this));
                }
                else {
                    custom_obj.key = id;
                    custom_obj.value = val;
                    custom_result.push(custom_obj);
                    //join_form_push_array(result, id, val, required);
                }
                break;
            case 5: // 드롭 다운
                var val = $(this).find('.join-form-dropdown').val();
                var required = $(this).children('h4').hasClass('required');
                if (val == '' && required) {
                    valid = !join_required_warning($(this));
                }
                else {
                    custom_obj.key = id;
                    custom_obj.value = val;
                    custom_result.push(custom_obj);
                    //join_form_push_array(result, id, val, required);
                }
                break;
            case 6: // 주소
                break;
            case 7: // 연락처
                break;
            case 8: // 이메일
                break;
        }
    });
    // 사용자 지정 정보 끝

    // var recaptcha = join_recaptcha_valid();
    // if (valid && recaptcha) {
    if (valid) {
        var result = {"basic" : basic_result, "custom" : custom_result};

        qvjax_direct(
            "insert_member_userside",
            "/module/member/member.php",
            'stid=' + QV_BASE_OBJ.stid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
            function (data) {
                // setCookie('terms-service', true, 0);
                // setCookie('terms-privacy', true, 0);
                // setCookie('terms-alarm', true, 0);
                qv_func.conversion('join', function () {
                    var result = confirm(lang.complete_join);
                    // 페이지 이동
                    if (result) { location.href = window.location.origin; }
                    else { location.href = window.location.origin; }
                });
            },
            function (xhr) {
                switch(xhr.responseText.trim()) {
                    case 'password':
                        join_validation_warning($('.join-form-pw2'));
                        break;
                    case 'account':
                        join_validation_warning($('.join-form-id'));
                        break;
                    case 'email':
                        join_validation_warning($('.join-form-email'));
                        break;
                    case 'phone':
                        join_validation_warning($('.join-form-phone'));
                        break;
                    case 'exist':
                        alert(lang.already_signed_up_account);
                        break;
                }

                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        );
    }
    else {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}

function join_required_warning(obj) {
    obj.children().last().after('<div class="join-required-warning">* ' + lang.required_input_element + '</div>');
    return true;
}
function join_validation_warning(obj) {
    obj.children().last().after('<div class="join-validation-warning">* ' + lang.invalid_format + '</div>');
    return true;
}

function join_term_disagree() {
    // 페이지 이동
    location.href = window.location.origin;
}
function join_term_agree() {
    var service = $('#terms-check-service').prop('checked');
    var privacy = $('#terms-check-privacy').prop('checked');
    var alarm = $('#terms-check-alarm').prop('checked');
    if (service && privacy) {
        // setCookie('terms-service', service, 1);
        // setCookie('terms-privacy', privacy, 1);
        // setCookie('terms-alarm', alarm, 1);

        // var m = qv_func.getUrlParams().m;
        // if (m == '' || m == undefined) {
        //     location.href = location.href + '?m=join';
        // }
        // else {
        //     location.href = location.href.replace("m=" + m, "m=join");
        // }

        // 가입약관동의 -> 가입정보입력 이동
        // 필요 데이터는 POST로 넘겨준다
        //var url = "/module/member/join.html";
        var url = "/join";
        var html = '<form action="' + url + '" method="post" style="display:none;">';
        if (post_account != '' && post_account != undefined) {
            html += '<input type="text" name="account" value="' + post_account + '" />';
        }
        if (post_email != '' && post_email != undefined) {
            html += '<input type="text" name="email" value="' + post_email + '" />';
        }
        if (post_name != '' && post_name != undefined) {
            html += '<input type="text" name="name" value="' + post_name + '" />';
        }
        if (post_sid != '' && post_sid != undefined) {
            html += '<input type="text" name="sid" value="' + post_sid + '" />';
        }
        if (post_sc_type != '' && post_sc_type != undefined) {
            html += '<input type="text" name="sc_type" value="' + post_sc_type + '" />';
        }
        html += '<input type="text" name="m" value="join" />';
        html += '<input type="text" name="service" value="' + service + '" />';
        html += '<input type="text" name="privacy" value="' + privacy + '" />';
        html += '<input type="text" name="alarm" value="' + alarm + '" />';
        html += '</form>';
        var form = $(html);
        $('body').append(form);
        form.submit();
    }
    else {
        alert(lang.agree_term_privacy_info);
    }
}

$('.join-terms').delegate("#terms-check-all", "click", function(e) {
    var checked = $(this).prop("checked");
    $('.join-terms-check').prop("checked", checked);
});

$('.join-form-birth-y > input').focusout(function () {
    var currentYear = (new Date).getFullYear();
    var birth_y = $(this).val();
    if(/^\d*(\.\d{0, 4})?$/.test(birth_y)) {
        if (parseInt(birth_y.trim()) > currentYear || parseInt(birth_y.trim()) <= 999) {
            $(this).val(currentYear);
        }
    }
    else {
        $(this).val(currentYear);
    }
});

$('.join-form-birth-m > input').focusout(function () {
    var birth_m = $(this).val();
    if(/^\d*(\.\d{0, 2})?$/.test(birth_m)) {
        if (parseInt(birth_m.trim()) < 10 && birth_m.trim().length < 2) {
            $(this).val("0" + birth_m);
        }
        else if (parseInt(birth_m.trim()) > 12 || birth_m.trim().length > 2) {
            $(this).val('12');
        }
        if (parseInt(birth_m.trim()) == 0) {
            $(this).val('01');
        }
    }
    else {
        $(this).val('01');
    }
});

$('.join-form-birth-d > input').focusout(function () {
    var birth_d = $(this).val();
    if(/^\d*(\.\d{0, 2})?$/.test(birth_d)) {
        if (parseInt(birth_d.trim()) < 10 && birth_d.trim().length < 2) {
            $(this).val("0" + birth_d);
        }
        else if (parseInt(birth_d.trim()) > 31 || birth_d.trim().length > 2) {
            $(this).val('31');
        }
        if (parseInt(birth_d.trim()) == 0) {
            $(this).val('01');
        }
    }
    else {
        $(this).val('01');
    }
});

function join_execDaumPostcode() {
    daum.postcode.load(function() {
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 도로명 조합형 주소 변수
                var juso = '';
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraRoadAddr !== '') {
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }
                // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                if (fullRoadAddr !== '') {
                    fullRoadAddr += extraRoadAddr;
                }
                if (data.userSelectedType == "R") {
                    juso = fullRoadAddr;
                } else {
                    juso = data.jibunAddress;
                }

                // var id = $(obj).prev()[0].id.replace('post', '');
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('zipcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('address1').value = juso;
            }
        }).open();
    });
}


/* MYPAGE */
function mypage_form_setData() {
    // 기본 정보
    qvjax_direct(
        "select_login_user",
        "/module/member/member.php",
        '',
        function (data) {
            if (data.length > 0) {
                $.each(data, function() {
                    // 기본 정보 세팅
                    $('#id').val(this.m_account);
                    $('#email').val(this.m_email);
                    $('#name').val(this.m_name);
                    $('#phone').val(this.m_phone);
                    $('#zipcode').val(this.m_zip);
                    $('#address1').val(this.m_addr1);
                    $('#address2').val(this.m_addr2);
                    if (this.m_birth != null && this.m_birth != '') {
                        $('#birth-y').val(this.m_birth.slice(0, 4));
                        $('#birth-m').val(this.m_birth.slice(4, 6));
                        $('#birth-d').val(this.m_birth.slice(6, 8));
                    }
                    $('#terms-check-alarm').prop('checked', this.m_event_alarm == "0" ? false : true);

                    if (this.m_sc_type != 0) {
                        $('.mypage-form-group1').hide();
                        $('.mypage-form-pw1').remove();
                        $('.mypage-form-pw2').remove();
                        $('.password-notice').remove();
                        $('.mypage-form-email').remove();
                    }

                    $('.mypage-form').data('uid', this.m_uid);
                    $('.mypage-form').data('account', this.m_account);
                    $('.mypage-form').data('sc_type', this.m_sc_type);


                    $('.mypage-content').show();

                    // 사용자 지정 정보 세팅
                    $('.modify-member-info-custom-list').children().remove();
                    qvjax_direct(
                        "select_member_custom",
                        "/module/member/member.php",
                        'uid=' + this.m_uid,
                        function (data) {
                            if (data.length > 0) {
                                var mappingData = data;
                                qvjax_direct(
                                    "select_member_table_info",
                                    "/module/member/member.php",
                                    'stid=' + QV_BASE_OBJ.stid,
                                    function (data) {
                                        var default_field = ['name', 'phone', 'birth', 'address'];
                                        var custom_count = 0;
                                        $.each(data, function () {
                                            if ($.inArray(this.fid, default_field) <= -1) {
                                                mypage_form_setData_customItem(this.fid, this.type, mappingData);
                                                custom_count++;
                                            }
                                        });

                                        if (custom_count == 0) {
                                            $('.modify-member-info-custom').hide();
                                        }
                                        else {
                                            $('.modify-member-info-custom').show();
                                        }
                                    },
                                    function (xhr) {
                                    }
                                );
                            }
                        },
                        function (xhr) { }
                    );
                });
            }
            else {
                alert(lang.no_member_info);
                parent.history.back();
            }
        },
        function (xhr) {
            alert(lang.no_member_info);
            parent.history.back();
            return false;
        }
    );
}

function mypage_form_setData_customItem(fid, type, mappingData) {
    var value = mappingData[0][fid];
    if (mappingData.length > 0 && value != null) {
        switch (type) {
            case "1":
            default:
                $('.mypage-form-' + fid + ' input').val(value);
                break;
            case "2":
                $('.mypage-form-' + fid + ' textarea').val(value);
                break;
            case "5":
                $('.mypage-form-' + fid + ' select').val(value);
                break;
            case "3":
            case "4":
                var option = value.split('|').filter(function (v) { return v !== '' });
                $.each(option, function() {
                    $('.mypage-form-' + fid +' input[value="' + this + '"]').prop('checked', true);
                });
                break;
        }
    }
}


function mypage_form_init(callback) {
    qvjax_direct(
        "select_site_info",
        "/module/member/member.php",
        'stid=' + QV_BASE_OBJ.stid,
        function (data) {
            if (data.length > 0) {
                $.each(data, function() {
                    var account_type = this.ssi_member_account_type;
                    if (account_type == 0) {
                        //$('.mypage-form-email').show();
                    }
                    else if (account_type == 1) {
                        $('#id').prop('placeholder', lang.account);
                    }

                    qvjax_direct(
                        "select_member_table_info",
                        "/module/member/member.php",
                        'stid=' + QV_BASE_OBJ.stid,
                        function (data) {
                            var default_field = ['name', 'phone', 'birth', 'address'];
                            $.each(data, function() {
                                if ($.inArray(this.fid, default_field) > -1) {
                                    var description = this.description;
                                    if (this.fid == 'name') {
                                        if (description != '') {
                                            $('#name').prop('placeholder', description);
                                        }
                                        if (this.displayed==0) {
                                            $('.mypage-form-name').remove();
                                        }
                                        $('.mypage-form-name').data('required', this.required == 0 ? false : true);
                                    }

                                    if (this.fid == 'phone') {
                                        if (description != '') {
                                            $('#phone').prop('placeholder', description);
                                        }
                                        if (this.displayed==0) {
                                            $('.mypage-form-phone').remove();
                                        }
                                        $('.mypage-form-phone').data('required', this.required == 0 ? false : true);
                                    }

                                    if (this.fid == 'address') {
                                        if (this.displayed==0) {
                                            $('.mypage-form-group3').remove();
                                        }
                                        $('.mypage-form-address1').data('required', this.required == 0 ? false : true);
                                    }

                                    if (this.fid == 'birth') {
                                        if (this.displayed==0) {
                                            $('.mypage-form-birth').remove();
                                        }
                                        $('.mypage-form-birth').data('required', this.required == 0 ? false : true);
                                    }

                                    if ($('.mypage-form-group2').children().length == 0) {
                                        $('.mypage-form-group2').remove();
                                    }
                                }
                                else {
                                    mypage_form_add(this.fid, this.type, this.name, this.description, this.options, this.displayed==1 ? true : false, this.required==1 ? true : false);
                                }
                            });

                            callback();

                            // 사용자 지정 항목이 없으면 해당 그룹을 삭제한다
                            if ($('.mypage-form-group4').children().length == 0) { $('.mypage-form-group4').remove(); }
                        },
                        function (xhr) { alert(xhr.responseText); }
                    );
                });
            }
            else {
            }
        },
        function (xhr) { alert(xhr.responseText); }
    );
}


function mypage_form_add(fid, type, name, description, options, displayed, required) {
    if (!displayed) return;

    var html = '<div data-type="' + type + '" data-id="' + fid + '">';

    if (required) {
        html += '<h4 class="required">' + name + '</h4>';
    }
    else {
        html += '<h4>' + name + '</h4>';
    }
    html += '<p>' + description + '</p>';
    html += '<div class="mypage-form-group-custom">';
    html += '<div class="mypage-form-' + fid + '">';

    switch(type) {
        case "1": // 짧은 텍스트
            html += '<input type="text" id="' + fid + '">';
            break;
        case "2": // 긴 텍스트
            html += '<textarea id="' + fid + '"></textarea>';
            break;
        case "3": // 체크 박스
            var option = options.split('|').filter(function (v) { return v !== '' });
            $.each(option, function() {
                html += '<label class="checkbox-inline mypage-form-checkbox">';
                html += '<input type="checkbox" class="form-contents-checkbox-item" value="' + this + '" name="check' + fid + '">';
                html += this + '</label>';
            });
            break;
        case "4": // 옵션 버튼
            var option = options.split('|').filter(function (v) { return v !== '' });
            $.each(option, function() {
                html += '<label class="radio-inline mypage-form-checkbox">';
                html += '<input type="radio" class="form-contents-checkbox-item" value="' + this + '" name="radio' + fid + '">';
                html += this + '</label>';
            });
            break;
        case "5": // 드롭 다운
            var option = options.split('|').filter(function (v) { return v !== '' });
            html += '<select class="mypage-form-dropdown">';
            $.each(option, function() {
                html += '<option value="' + this + '">' + this + '</option>';
            });
            html += '</select>';
            break;
        case "6": // 주소
            break;
        case "7": // 연락처
            break;
        case "8": // 이메일
            break;
    }

    html += '</div></div></div>';


    $('.mypage-form-group4').append(html);
}

function mypage_form_withdraw() {
    var res = confirm(lang.withdrawal);
    if (res) {
        qvjax_direct(
            "delete_member",
            "/module/member/member.php",
            'stid=' + QV_BASE_OBJ.stid,
            function (data) {
                if (data) {
                    alert(lang.complete_withdrawal);
                    location.href = '/';
                }
                else {
                    alert(lang.invalid_access);
                }
            },
            function (xhr) { }
        );
    }
}

function mypage_form_submit() {
    $('.mypage-container .mypage-required-warning').remove();
    $('.mypage-container .mypage-validation-warning').remove();

    var basic_result = [];
    var custom_result = [];
    var obj = new Object();
    var valid = true;

    // 기본 정보 시작
    var uid = $('.mypage-form').data('uid');
    var account = $('.mypage-form').data('account');
    var sc_type = $('.mypage-form').data('sc_type');

    // 일반 사용자
    if (sc_type == 0) {
        var id = $('.mypage-form-id > input').val();
        var pw1 = $('.mypage-form-pw1 > input').val().replace(/'/g, '\\\'');
        var pw2 = $('.mypage-form-pw2 > input').val().replace(/'/g, '\\\'');
        var event_alarm = $('#terms-check-alarm').prop('checked') == true ? 1 : 0;

        // ID
        if (id == '' || id == undefined)
            valid = !mypage_required_warning($('.mypage-form-id'));
        else
            obj.account = id.replace(/'/g, '\\\'');

        // NAME
        if ($('.mypage-form-name').length > 0) {
            var name = $('.mypage-form-name > input').val();

            if ((name == '' || name == undefined) && $('.mypage-form-name').data('required'))
                valid = !mypage_required_warning($('.mypage-form-name'));
            else
                obj.name = name.replace(/'/g, '\\\'');
        }

        // PHONE
        if ($('.mypage-form-phone').length > 0) {
            var phone = $('.mypage-form-phone > input').val();

            if ((phone == '' || phone == undefined) && $('.mypage-form-phone').data('required'))
                valid = !mypage_required_warning($('.mypage-form-phone'));
            else
                obj.phone = phone.replace(/'/g, '\\\'').replace(/-/gi, '');
        }

        // ZIPCODE & ADDRESS
        if ($('.mypage-form-zipcode').length > 0 && $('.mypage-form-address1').length > 0 && $('.mypage-form-address2').length > 0) {
            var zipcode = $('.mypage-form-zipcode > input').val().replace(/'/g, '\\\'');
            var address1 = $('.mypage-form-address1 > input').val().replace(/'/g, '\\\'');
            var address2 = $('.mypage-form-address2 > input').val().replace(/'/g, '\\\'');

            if ((zipcode == '' || address1 == '' || address2 == '') && $('.mypage-form-address1').data('required'))
                valid = !mypage_required_warning($('.mypage-form-address2'));
            else {
                obj.zip = zipcode;
                obj.addr1 = address1;
                obj.addr2 = address2;
            }
        }

        // BIRTH
        if ($('.mypage-form-birth-y').length > 0 && $('.mypage-form-birth-m').length > 0 && $('.mypage-form-birth-d').length > 0) {
            var birth_y = $('.mypage-form-birth-y > input').val();
            var birth_m = $('.mypage-form-birth-m > input').val();
            var birth_d = $('.mypage-form-birth-d > input').val();

            if ((birth_y == '' || birth_m == '' || birth_d == '') && $('.mypage-form-birth').data('required')) {
                valid = !mypage_required_warning($('.mypage-form-birth'));
            }
            else {
                obj.birth = birth_y + birth_m + birth_d;
            }
        }

        // EMAIL
        if ($('.mypage-form-email').length > 0) {
            var email = $('.mypage-form-email > input').val().replace(/'/g, '\\\'');

            if (email == '')
                valid = !mypage_required_warning($('.mypage-form-email'));
            else
                obj.email = email;
        }

        if (pw1 == pw2) {
            obj.password = pw1;
        }
        else {
            alert(lang.different_password);
            return;
        }
    }
    // SNS 가입 사용자
    else {
        var event_alarm = $('#terms-check-alarm').prop('checked') == true ? 1 : 0;

        if ($('.mypage-form-name').length > 0) {
            var name = $('.mypage-form-name > input').val();

            if (name == '' && $('.mypage-form-name').data('required'))
                valid = !mypage_required_warning($('.mypage-form-name'));
            else
                obj.name = name.replace(/'/g, '\\\'');
        }

        if ($('.mypage-form-phone').length > 0) {
            var phone = $('.mypage-form-phone > input').val();

            if (phone == '' && $('.mypage-form-phone').data('required'))
                valid = !mypage_required_warning($('.mypage-form-phone'));
            else
                obj.phone = phone.replace(/'/g, '\\\'').replace(/-/gi, '');
        }

        if ($('.mypage-form-zipcode').length > 0 && $('.mypage-form-address1').length > 0 && $('.mypage-form-address2').length > 0) {
            var zipcode = $('.mypage-form-zipcode > input').val().replace(/'/g, '\\\'');
            var address1 = $('.mypage-form-address1 > input').val().replace(/'/g, '\\\'');
            var address2 = $('.mypage-form-address2 > input').val().replace(/'/g, '\\\'');

            if ((zipcode == '' || address1 == '' || address2 == '') && $('.mypage-form-address1').data('required'))
                valid = !mypage_required_warning($('.mypage-form-address2'));
            else {
                obj.zip = zipcode;
                obj.addr1 = address1;
                obj.addr2 = address2;
            }
        }

        if ($('.mypage-form-birth-y').length > 0 && $('.mypage-form-birth-m').length > 0 && $('.mypage-form-birth-d').length > 0) {
            var birth_y = $('.mypage-form-birth-y > input').val();
            var birth_m = $('.mypage-form-birth-m > input').val();
            var birth_d = $('.mypage-form-birth-d > input').val();

            if ((birth_y == '' || birth_m == '' || birth_d == '') && $('.mypage-form-birth').data('required')) {
                valid = !mypage_required_warning($('.mypage-form-birth'));
            }
            else {
                obj.birth = birth_y + birth_m + birth_d;
            }
        }
    }

    obj.uid = uid;
    obj.sc_type = sc_type;
    obj.alarm = event_alarm;

    basic_result.push(obj);
    // 기본 정보 끝

    // 사용자 지정 정보 시작
    var custom = $('.mypage-form-group4 > div');
    $.each(custom, function() {
        var custom_obj = new Object();
        var id = $(this).data('id');
        var type = $(this).data('type');

        switch (type) {
            case 1: // 짧은 텍스트
                var val = $(this).find('input').val().replace(/'/g, '\\\'');
                var required = $(this).children('h4').hasClass('required');
                if (val == '' && required) {
                    valid = !mypage_required_warning($(this));
                }
                else {
                    custom_obj.key = id;
                    custom_obj.value = val;
                    custom_result.push(custom_obj);
                }
                break;
            case 2: // 긴 텍스트
                var val = $(this).find('textarea').val().replace(/'/g, '\\\'');
                var required = $(this).children('h4').hasClass('required');
                if (val == '' && required) {
                    valid = !mypage_required_warning($(this));
                }
                else {
                    custom_obj.key = id;
                    custom_obj.value = val;
                    custom_result.push(custom_obj);
                }
                break;
            case 3: // 체크 박스
            case 4: // 옵션 버튼
                var val = '|';
                var required = $(this).children('h4').hasClass('required');
                $(this).find('input:checked').each(function() {
                    val += $(this).val() + '|';
                });
                if (val == '|' && required) {
                    valid = !mypage_required_warning($(this));
                }
                else {
                    custom_obj.key = id;
                    custom_obj.value = val;
                    custom_result.push(custom_obj);
                }
                break;
            case 5: // 드롭 다운
                var val = $(this).find('.mypage-form-dropdown').val();
                var required = $(this).children('h4').hasClass('required');
                if (val == '' && required) {
                    valid = !mypage_required_warning($(this));
                }
                else {
                    custom_obj.key = id;
                    custom_obj.value = val;
                    custom_result.push(custom_obj);
                }
                break;
            case 6: // 주소
                break;
            case 7: // 연락처
                break;
            case 8: // 이메일
                break;
        }
    });
    // 사용자 지정 정보 끝

    if (valid) {
        var result = {"basic" : basic_result, "custom" : custom_result};

        qvjax_direct(
            "update_member_userside",
            "/module/member/member.php",
            'stid=' + QV_BASE_OBJ.stid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
            function (data) {
                if (data) {
                    alert(lang.complete_modify);
                    // 페이지 이동
                    location.href = "/";
                }
                else {
                    alert(lang.invalid_access);
                }
            },
            function (xhr) {
                switch(xhr.responseText.trim()) {
                    case 'password':
                        mypage_validation_warning($('.mypage-form-pw2'));
                        break;
                    case 'account':
                        mypage_validation_warning($('.mypage-form-id'));
                        break;
                    case 'email':
                        mypage_validation_warning($('.mypage-form-email'));
                        break;
                    case 'phone':
                        mypage_validation_warning($('.mypage-form-phone'));
                        break;
                }

                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        );
    }
    else {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}

function mypage_required_warning(obj) {
    obj.children().last().after('<div class="mypage-required-warning">* ' + lang.required_input_element + '</div>');
    return true;
}
function mypage_validation_warning(obj) {
    obj.children().last().after('<div class="mypage-validation-warning">* ' + lang.invalid_format + '</div>');
    return true;
}

$('.mypage-form-birth-y > input').focusout(function () {
    var birth_y = $(this).val();
    var currentYear = (new Date).getFullYear();
    if(/^\d*(\.\d{0, 4})?$/.test(birth_y)) {
        if (parseInt(birth_y.trim()) > currentYear || parseInt(birth_y.trim()) <= 999) {
            $(this).val(currentYear);
        }
    }
    else {
        $(this).val(currentYear);
    }
});

$('.mypage-form-birth-m > input').focusout(function () {
    var birth_m = $(this).val();
    if(/^\d*(\.\d{0, 2})?$/.test(birth_m)) {
        if (parseInt(birth_m.trim()) < 10 && birth_m.trim().length < 2) {
            $(this).val("0" + birth_m);
        }
        else if (parseInt(birth_m.trim()) > 12 || birth_m.trim().length > 2) {
            $(this).val('12');
        }
        if (parseInt(birth_m.trim()) == 0) {
            $(this).val('01');
        }
    }
    else {
        $(this).val('01');
    }
});

$('.mypage-form-birth-d > input').focusout(function () {
    var birth_d = $(this).val();
    if(/^\d*(\.\d{0, 2})?$/.test(birth_d)) {
        if (parseInt(birth_d.trim()) < 10 && birth_d.trim().length < 2) {
            $(this).val("0" + birth_d);
        }
        else if (parseInt(birth_d.trim()) > 31 || birth_d.trim().length > 2) {
            $(this).val('31');
        }
        if (parseInt(birth_d.trim()) == 0) {
            $(this).val('01');
        }
    }
    else {
        $(this).val('01');
    }
});

function mypage_execDaumPostcode() {
    daum.postcode.load(function() {
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 도로명 조합형 주소 변수
                var juso = '';
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraRoadAddr !== '') {
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }
                // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                if (fullRoadAddr !== '') {
                    fullRoadAddr += extraRoadAddr;
                }
                if (data.userSelectedType == "R") {
                    juso = fullRoadAddr;
                } else {
                    juso = data.jibunAddress;
                }

                // var id = $(obj).prev()[0].id.replace('post', '');
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('zipcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('address1').value = juso;
            }
        }).open();
    });
}