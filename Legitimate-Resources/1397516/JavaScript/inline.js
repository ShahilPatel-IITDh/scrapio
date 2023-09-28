
            var recaptchaOnloadCallback = function () {
                (function ($) {
                    var $recaptchaForm = $('#recaptcha').parent('form');

                    grecaptcha.render(
                        'recaptcha',
                        {
                            sitekey:  '6LeJs6kUAAAAAKxkdQlDLu8swnP2eNMe5jtx05gm',
                            size:     'invisible',
                            callback: function () {
                                $recaptchaForm.submit();
                            }
                        }
                    );

                    $recaptchaForm.one('submit', function (e) {
                        e.preventDefault();
                        grecaptcha.execute();
                    });
                })(jQuery);
            };
        