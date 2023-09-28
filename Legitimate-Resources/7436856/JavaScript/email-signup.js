'use strict';

var $ = window.jQuery;

//ON DOCUMENT READY
$(document).ready(function () {
    $('#c-footer__signup-form').submit(function (e) {
        e.preventDefault();

        $('.email-signup-response').remove();

        var form = $(this),
            email = form.children('input[type=email]').val(),
            ip = form.children('input[type=hidden]').val();
        $.ajax({
            url: emailsignup.ajax_url,
            type: 'post',
            data: {
                action: 'emailsignup',
                email: email,
                ip: ip
            },
            beforeSend: function() {
                form.addClass('loading');
            },
            success: function (response) {
                form.removeClass('loading');
                form.children('input[type=email]').val('');
                form.after('<span class="email-signup-response" id="c-footer__signup-error">' + response + '</span>');
            },
            error: function (response) {
                form.removeClass('loading');
                form.after('<span class="email-signup-response" id="c-footer__signup-error">' + response.responseText + '</span>');
            }
        });
    });
});
