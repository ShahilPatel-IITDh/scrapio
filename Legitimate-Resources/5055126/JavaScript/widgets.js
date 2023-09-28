var identityConfiguration = {
  "sign-in" : {
    "identifierFirst" : true,
    "enableAccountChoices" : true,
    "enableRememberMe" : true,
    "enableAppFabricPreload" : true
  },
  "sign-up" : {
    "disableTooltips" : true
  }
};

if (typeof onIdentityConfigurationSuccess == "function") {
	onIdentityConfigurationSuccess(identityConfiguration);
}