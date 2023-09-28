
                                /*<![CDATA[*/
                                $(function () {
                                    var nextLabel = "Seguinte";
                                    var signInLabel = "Login";

                                    var recaptchaEnabled = true;

                                    var passwordStep = false;
                                    var submitButton = $('#submitButton');
                                    var submitLabel = $('#submitLabel');
                                    var usernameInput = $('#username');
                                    var passwordInput = $('#password');
                                    var submitButtonSpinner = $('#submitButtonSpinner');
                                    var loginPasswordGroup = $('#login-password-group');
                                    var rememberMeGroup = $('#remember-me-group');

                                    function displayLoginStep() {
                                        usernameInput.prop('readonly', false);
                                        submitLabel.text(nextLabel);

                                        loginPasswordGroup.hide();
                                        rememberMeGroup.hide();

                                        passwordInput.prop('required', false);

                                        
                                        var val = usernameInput.val();
                                        usernameInput.val('');
                                        usernameInput.focus();
                                        usernameInput.val(val);

                                        passwordStep = false;
                                    }

                                    function displayPasswordStep() {
                                        usernameInput.prop('readonly', true);

                                        submitButtonSpinner.hide();
                                        submitButton.prop('disabled', false);
                                        submitLabel.text(signInLabel);


                                        loginPasswordGroup.show();
                                        rememberMeGroup.show();

                                        passwordInput.prop('required', true);
                                        passwordInput.focus();

                                        
                                        passwordStep = true;
                                    }

                                    usernameInput.click(function (evt) {
                                        if (passwordStep) {
                                            displayLoginStep();
                                        }
                                    });

                                    usernameInput.on('change', function () {
                                        if(usernameInput.val() !== "") {
                                            $('#resetPassword').attr('href', '/mmp/reset-password?email=' + encodeURIComponent(usernameInput.val()));
                                        } else {
                                            $('#resetPassword').attr('href', '/mmp/reset-password');
                                        }
                                    });

                                    $('#loginForm').submit(function (evt) {
                                            if (!passwordStep) {
                                                evt.preventDefault();
                                                evt.stopPropagation();

                                                submitButton.prop('disabled', true);
                                                submitButtonSpinner.show();

                                                $.post("/login/option", {
                                                    "username": usernameInput.val(),
                                                    "_csrf": $("meta[name='_csrf']").attr("content")
                                                })
                                                    .done(function (data) {
                                                        if (data.option !== 'password') {
                                                            window.location.href = data.url;
                                                        } else {
                                                            displayPasswordStep();
                                                        }
                                                    })
                                                    .fail(function (xhr, status, error) {
                                                        submitButton.prop('disabled', false);
                                                        submitButtonSpinner.hide();
                                                        $('#login-error').show();
                                                    });
                                            } else {
                                                if (recaptchaEnabled) {
                                                    evt.preventDefault();
                                                    evt.stopPropagation();
                                                    grecaptcha.execute();
                                                }
                                            }
                                        }
                                    );

                                    var messageBarMessage = null;
                                    
                                    if (usernameInput.val() !== '' && messageBarMessage === undefined) {
                                        $('#loginForm').submit();
                                    } else {
                                        
                                        var val = usernameInput.val();
                                        usernameInput.val('');
                                        usernameInput.focus();
                                        usernameInput.val(val);
                                    }
                                });
                                /*]]>*/
                            