
			var recaptchaBudget;
			var recaptchaRecommend;
      		var recaptchaModal;

      		var verifyCallback = function(response) {
		        $('#g-recaptcha-response').val(response);
		    };

      		 var myCallBack = function() {

      		 	if($('#div-captcha-budget').length > 0){

			       	recaptchaBudget = grecaptcha.render('div-captcha-budget', {
			          	'sitekey' : '6Lclwh8TAAAAANuQOM-N-sXCzOUh3rx-FT1AkoAB',
			          	'callback' : verifyCallback,
			          	'theme' : 'light',
			          	'lang' : 'pt'
	        		});
				}
				
				if($('#div-captcha-recommend-store').length > 0){
					
					recaptchaRecommend = grecaptcha.render('div-captcha-recommend-store', {
			          	'sitekey' : '6Lclwh8TAAAAANuQOM-N-sXCzOUh3rx-FT1AkoAB',
			          	'callback' : verifyCallback,
			          	'theme' : 'light',
			          	'lang' : 'pt'
	        		});
				}
         		
         		if($('#div-captcha').length > 0){

         			recaptchaModal = grecaptcha.render('div-captcha', {
			          	'sitekey' : '6Lclwh8TAAAAANuQOM-N-sXCzOUh3rx-FT1AkoAB',
			          	'callback' : verifyCallback,
			          	'theme' : 'light',
			          	'lang' : 'pt'
	        		});
         		}        		
      		};
		