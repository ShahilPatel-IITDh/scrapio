var dtm_deviceCheck = /Mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
var dataLayer = {
	"application": {
		"applicationID": "",
		"applicationStep": "",
		"applicationName": "",
		"applicationStart": false,
		"applicationComplete": false,
		"applicationValue": "",
		"applicationValueArray": "",
		"applicationProduct" : "",
		"applicationOfferProduct" : "",
	},
	"ecommerce" : {
		"product" : {
			"price": ""
		}
	},
	"quote" : {
		"quoteNumber" : "",
		"quoteComplete" : true,
		"interestRate": ""
	},
	'deviceType': dtm_deviceCheck,
	'domainName': window.location.hostname,
	'formName': '',
	'formisSubmitted': false,
	'formStatus': "",
	'numSearchResults': '',
	'pageCategory': '',
	'pageName': '',
	'pageSubSection1': '',
	'pageSubSection2': '',
	'pageSubSection3': '',
	'pageSubSection4': '',
	'searchTerm': '',
	'selfServiceType': '',
	'siteBusinessUnit': 'digital channels',
	'siteCountry': 'South Africa',
	'siteLanguage': 'English',
	'videoName': '',
	'userInteraction': '',
	'userLoginSuccess': '',
	'userRegistrationSuccess': '',
	'loginStatus': 'guest',
	'userID': '',
	'websiteName': 'Internet Banking Refresh',
	'websiteNameCode': 'IBR',
	'customerSAPBPID': '',
	'customerGUID' : ''
};