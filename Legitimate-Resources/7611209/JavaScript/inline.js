
    document.addEventListener("DOMContentLoaded", function(){
		const has_diner_signup_ff = "false" === 'true'

		window.bentobox.overlayAlertComponent.init(
			'div',  { has_diner_signup_ff }
		);
		window.bentobox.bannerAlertComponent.init('.site-content', 'aside');
    });
  