
	var initESW = function(gslbBaseURL) {
		embedded_svc.settings.displayHelpButton = true; //Or false
		embedded_svc.settings.language = 'en'; //For example, enter 'en' or 'en-US'

		//embedded_svc.settings.defaultMinimizedText = 'Chat'; //(Defaults to Chat)
		//embedded_svc.settings.disabledMinimizedText = 'We'll be back later'; //(Defaults to We'll be back later)

		//embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
		//embedded_svc.settings.storageDomain = 'hubspot.com'; 'us.confirmation.com'; 'confirmation.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

		// Settings for Chat
		//embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
			// Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
			// Returns a valid button ID.
		//};
		//embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
		//embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
		//embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

		embedded_svc.settings.enabledFeatures = ['LiveAgent'];
		embedded_svc.settings.entryFeature = 'LiveAgent';

		embedded_svc.init(
			'https://confirmation.my.salesforce.com/',
			'https://confirmation.force.com/support',
			gslbBaseURL,
			'00DA0000000aVb4',
			'Support_Team_Chat',
			{
				baseLiveAgentContentURL: ' https://c.la4-c1-ia5.salesforceliveagent.com/content',
				deploymentId: '5721H000000gnWy',
				buttonId: '5731H000000YPkf',
				baseLiveAgentURL: 'https://d.la4-c1-ia5.salesforceliveagent.com/chat',
				eswLiveAgentDevName: 'Live_Agent_Chat',
				isOfflineSupportEnabled: false
			}
		);
	};

	if (!window.embedded_svc) {
		var s = document.createElement('script');
		s.setAttribute('src', 'https://confirmation.my.salesforce.com/embeddedservice/5.0/esw.min.js');
		s.onload = function() {
			initESW(null);
		};
		document.body.appendChild(s);
	} else {
		initESW('https://service.force.com/');
	}
