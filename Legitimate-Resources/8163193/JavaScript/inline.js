
			var flow = new PAYPAL.apps.IdentityFlow({
				trigger : new Array("submit-header", "submit-provider-page")
			});
			
			function handleOpenIDResponse(openid_args) {
				window.location = openid_args;
			}
		