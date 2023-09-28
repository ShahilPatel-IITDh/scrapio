
            function onSubmit() {
                document.getElementById('lsrecaptcha-form').submit();
            }

            var onloadCallback = async function () {
                var cont = grecaptcha.render('recaptchadiv', {
                    'sitekey': '6LewU34UAAAAAHvXqFOcQlm8z1MP1xpGAZCYEeZY',
                    'callback': onSubmit,
    'size': 'invisible'
                });
                await grecaptcha.execute(cont);
            };
        