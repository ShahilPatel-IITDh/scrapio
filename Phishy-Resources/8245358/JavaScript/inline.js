
	var AEMManager = {
			autoInitJQMobile : true
	};
	
	var siteSettings = {
		siteDomain : "banking.bnl.it",
		siteProtocol: "https://",
		httpsEnabled: "true",
		cookieDomain : "banking.bnl.it",
		imageDomain : "https://banking.bnl.it",
		sessionTimer : "300",
		cookieManager: {
			pathConfigBannerCookie: "https://bnl.it/it/bnl-config/banner-cookie-law/nuovo-banner-cookie",
			gtmCommonBody: "https://bnl.it/images/bnl/gtm-bnl/gtm_body.js",
			gtmCommonHead: "https://bnl.it/images/bnl/gtm-bnl/gtm_head.js",
			cookielawOrigination: "BNL:",
			urlCelebrusScript: "/rsc/celebrus/new-celebrus-injector.js",
			cookieLawDomain: ".bnl.it",
			cookieLawCookieName: "BNL_disclaimer",
			cookieLawSid: "BNL_cookielawsid",
			cookieLawFailover: "BNL_failover",
			cookieLawPolicyAccess: "BNL_policyaccess",
			cookieLawServiceEndpoint: "https://bnl.it/pubblica/cookie-law/service",
			cookieLawCheckEndpoint: "https://bnl.it/pubblica/cookie-law/check?p=",
			cookieLawPayloadEndpoint: "https://bnl.it/pubblica/cookie-law/payload",
			cookieLawSaveEndpoint: "https://bnl.it/pubblica/cookie-law/save",
			cookieLawNoFireClass: "cookielaw-nofire-opted",
			cookieLawLoginPath: "https://banking.bnl.it/it/login/",
			cookieLawPrivateAreaPath: "banking.bnl.it",
			cookieLawCelebrusCookieBaseName: "BNLCSAP3P",
			cookieLawSessionId: "BNLCSAsession",
			cookieLawFirstPartId: "#cookie-law-first-part",
			cookieLawRadioButton: ".clawradio",
			cookieLawOptInChecked: "optinchecked",
			cookieLawOptOutChecked: "optoutchecked",
			cookieLawFadeIn: 500,
			cookieLawFadeOut: 1000,
			cookieLawDebug: "true",
			cookieLawCookiePolicyPath: "/it/Footer/Cookie",
			sessionIDSeparator: "_",
			cookieLawCSSPath: "/rsc/contrib/graphicaltheme/bnl-public/css/cookie-law.css"			
		}
	};
	
	HeaderConfig = {
			MainMenu : {
				dynamic : {
					link : "https://banking.bnl.it/pubblica/dynamicchannel/#!/"
				},
				doveSiamo : {
					link : "https://bnl.it/trovaFilialenew/InitTrovaFiliale.do?lingua=it&type=individuiefamiglie&source=prendiappuntamentoCF"
				}
			}
	};
