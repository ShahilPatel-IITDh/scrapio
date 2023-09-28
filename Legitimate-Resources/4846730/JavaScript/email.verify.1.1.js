/*
    Email Verify Plugin
    Author: Nick Barna
    Version: 1.1
    Date: 01/02/17

    NOTE: form must have ID and there must be a wrap around the input with class 'email-form-group'

*/
(function($)
{
    'use strict';
    var attempts = 0,
        defaults = {
            totalAttempts: 1,
            audioAlert: false,
            textAlert: true,
            loadingGif: true,
            errorClass: "invalid-email",
            errorWrapClass: "triangle-isosceles top",
            errorLocation: "email-form-group",
            emailValid: function() {}
            };

    $.fn.verify = function(options)
    {
        var $this = this,
            settings = $.extend({}, defaults,options ),
            parentForm = $("#"+this.closest('form').attr('id')+"");



        function error_hide(el)
        {
            email_input.focus(function()
            {
                if (el.is(':visible'))
                {
                    el.fadeOut(100);
                    $(".email-form-group").css("marginBottom","0em");
                }
            });
        }

        function error_message()
        {
            var error_html = $('<span/>')
                .addClass(settings.errorClass)
                .appendTo($("." + settings.errorLocation + "")),
                error_wrap = $('<p/>')
                .addClass(settings.errorWrapClass)
                .appendTo($("." + settings.errorClass+ ""))
                .text("Please Enter A Valid Email Address");

                $("." +settings.errorClass+ "").fadeIn(100);

                error_hide($("." + settings.errorClass + ""));

        }


        function loading_gif()
        {
            $('body').prepend('<div class="loading-gif"><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>');
            $('.loading-gif').fadeIn(100, function() {
                setTimeout(function()
                {
                    $('.sk-fading-circle').append('<span class="too-long">Validating...</span>').hide().fadeIn(200);
                },100);
                setTimeout(function()
                {
                    $('.too-long').hide().text('Hang On, Almost done!').fadeIn(200);
                }, 4000);
                setTimeout(function()
                {
                    $('.too-long').hide().text('Just a Few More Seconds...').fadeIn(200);
                },8000);
            });

        }

        function is_valid_email_address(email_address)
        {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(email_address);
        }

        function valid()
        {
            if (settings.loadingGif) { $('.loading-gif').fadeOut(100); }
            settings.emailValid.call();
            parentForm.submit();
        }

        function invalid()
        {
            if (settings.textAlert) { error_message(); }

            if (settings.loadingGif) { $('.loading-gif').fadeOut(100); }

            attempts++;
        }

        if (settings.loadingGif) { loading_gif(); }

        return this.each(function()
        {
            var email_address = $this.val();

            if (attempts < settings.totalAttempts)
            {
                if (is_valid_email_address(email_address)) //pass the first test
                {
                    var email_results = $.get("/go/api/verify_email/"+email_address, function()
                    {
                        if (email_results.responseText == 'true') //pass the second test
                        {
                            valid();
                        }
                        else
                        {
                            invalid();
                        }

                    });
                }
                else
                {
                    invalid();
                }
            }
            else
            {
                valid();
            }

        });
    };
}(jQuery));