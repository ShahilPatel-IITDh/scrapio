
		$(function() {
			
			var opts = iusHosted.getWidgetSetup("sign-in");


			if (!iusHosted.themeOverrideAllowed) {
				opts.headerLogoParent="#ius-sign-in-ecosystem-logos";

				if(iusHosted.uiConfig && (iusHosted.uiConfig.theme === 'intuit-ecosystem')) {
                    iusHosted.setEcosystemBranding(opts);

	                opts.animateLogos = queryStrings['ius_animate_logos'] === "true";
				}
			}

			intuit.ius.signIn.setup(opts);
		});
	