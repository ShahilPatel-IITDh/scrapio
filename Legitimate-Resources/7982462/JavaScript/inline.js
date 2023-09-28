
			//<![CDATA[
				j2w.init({
					"cookiepolicy"   : 3,
					"useSSL"         : true,
					"isUsingSSL"     : true,
					"isResponsive"   : true,
					"categoryId"     : 0,
					"siteTypeId"     : 1,
					"ssoCompanyId"   : 'bancodelapT1',
					"ssoUrl"         : 'https://career4preview.sapsf.com',
					"passwordRegEx"  : '^(?=.{6,20}$)(?!.*(.)\\1{3})(?=.*([\\d]|[^\\w\\d\\s]))(?=.*[A-Za-z])(?!.*[\\u007F-\\uFFFF\\s])',
					"emailRegEx"     : '^(?![+])(?=([a-zA-Z0-9\\\'.+!_-])+[@]([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9])[.]([a-zA-Z]){1,63}$)(?!.*[\\u007F-\\uFFFF\\s,])(?!.*[.]{2})',
					"hasATSUserID"	 : false,
					"useCASWorkflow" : true,
					"brand"          : "",
					"dpcsStateValid" : true
					
				});

				j2w.TC.init({
					"seekConfig" : {
						"url" : 'https\x3A\x2F\x2Fwww.seek.com.au\x2Fapi\x2Fiam\x2Foauth2\x2Fauthorize',
						"id"  : 'AwSKTesT',
						"advertiserid" : ''
					}
				});

				$.ajaxSetup({
					cache   : false,
					headers : {
						"X-CSRF-Token" : "bfca15c7-e1c2-4e76-82c7-fb74b77bc226"
					}
				});
			//]]>
		