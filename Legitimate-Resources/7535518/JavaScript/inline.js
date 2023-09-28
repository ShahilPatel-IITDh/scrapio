
	const gtmChatButton = document.querySelector( ".ContactUs__menu--link.chat" );
	const gtmNewsletterButton = document.querySelector( ".Newsletter__form button" );

	if ( gtmChatButton !== null ) {
		gtmChatButton.addEventListener( "click", () => {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				'event': 'live_chat_contact'
			});
		});
	}

	if ( gtmNewsletterButton !== null ) {
		gtmNewsletterButton.addEventListener( "click", () => {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				'event': 'newsletter_subscription'
			});
		});
	}
