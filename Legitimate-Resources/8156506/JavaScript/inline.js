
	//JQuery function to add div for reCaptcha widget and load js only on login screen
	$(document).ready(function() {
		var logindiv = document.getElementById('login');
		if (logindiv != null) { //check if we are on login screen
			//getting reCaptcha script by jquery only on login screen
			$.getScript( "https://www.google.com/recaptcha/api.js?onload=loadCaptcha&render=explicit");
			var form = logindiv.innerHTML;
			var index = form.indexOf('<p style="text-align: right;">'); //finding tag before which reCaptcha widget should appear
			document.getElementById('login').innerHTML = form.slice(0, index) + '<div id="captcha_container"></div>' + form.slice(index);	    
		}
    });
	// JavaScript function to explicitly render the reCAPTCHA widget
	var loadCaptcha = function() {
	  captchaContainer = grecaptcha.render('captcha_container', {
		'sitekey' : '6Lf69RsgAAAAABaaLvGZOqXiJlGndgPK55a-XxTG'
	  });
	};
	