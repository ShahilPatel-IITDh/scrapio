window.dictionary = {
more: "more",
dynamicForm: "Send us an e-mail.",
didYouMean: "Did you mean",
consentHeading: "Note",
consentText: "<p>Your current cookie settings prevent the display of the requested content, as it is provided by Google Ireland Ltd. (YouTube) or Google LLC (reCAPTCHA). With your agreement, you trust these providers and extend your cookie settings for this website with the categories &#34;Functionalities&#34; and &#34;Marketing&#34;. Google privacy policy and your privacy settings can be viewed / managed <a target=\"_blank\" href=\"https://policies.google.com/privacy?hl=en\" rel=\"nofollow\" >here.<\/a><\/p>",
consentButtonLabel: "I agree",
shipping: "Shipping",
addToCart: "Add to cart",
goToOnlineShop: "To the Online Shop",
details: "Details",
articleNumber: "Article number",
productType: "Model",
productTypes: "Models",
plusVat: "excl. VAT",
addItemFailed: "null"
};
window.disableExternalDocuments = false;
window.articleDetailServiceUrl = '';
window.dynamicFormUrl = 'https://www.wika.com/en-en/dynamic_form.WIKA';
window.searchContainer = 'wika';
window.searchSynonymUrl = 'https://www.wika.com/en-en/synonyms_json.WIKA';
window.contactFormUrl = '/rest-services/forms/contact/save';
window.feedbackFormUrl = '/rest-services/forms/feedback/save';
window.exhibitionFormUrl = '/rest-services/forms/generic/save';
window.regionDataUrl = 'https://www.wika.com/en-en/regions_json.json?_c=1687785196879';
window.shopRegionDataUrl = 'https://www.wika.com/en-en/regions_json_shop.json?_c=1687785196879';
window.externalDocumentDataUrl = 'https://www.wika.com/en-en/keyword_translations_json.WIKA?_c=1687785196879';
window.geoIPUrl = '/rest-services/geoip/getcountry';
window.getQuoteIdUrl = 'https://shop-system.wika.com/eu/m_corp/rest/V1/customer/getQuoteId';
window.reactivateOldBasketUrl = 'https://shop-system.wika.com/eu/m_corp/rest/V1/customer/reactivateOldBasket';
window.addItemUrl = '/rest-services/shop/addItem';
window.getCartUrl = '/rest-services/shop/getCart';
window.removeItemUrl = '/rest-services/shop/removeItem';
window.updateItemQuantityUrl = '/rest-services/shop/updateItemQuantity';
window.getItemInfoUrl = '/rest-services/shop/getiteminfos';
window.loginUrl = "https://shop-system.wika.com/eu/m_corp/rest/V1/customer/login";
window.logoutUrl = "https://shop-system.wika.com/eu/m_corp/rest/V1/customer/logout";
window.checkLoginUrl = "https://shop-system.wika.com/eu/m_corp/rest/V1/customer/checkLogin";
window.combinedSearchUrl = "/rest-services/search/combined";
window.categorySearchUrl = "/rest-services/search/category";
window.suggestSearchUrl = "/rest-services/search/suggest";
window.newsletterSubscribeUrl = "/rest-services/newsletter/subscribe";
window.newsletterGetSubscriptionsUrl = "/rest-services/newsletter/subscriptions";
window.newsletterUnsubscribeUrl = "/rest-services/newsletter/unsubscribe";
window.externalDocumentPrefixes = {
}


function initCustomEventPolyfill() {
	if (typeof window.CustomEvent === "function") return false;

	function CustomEvent(event, params) {
		params = params || { bubbles: false, cancelable: false, detail: null };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	window.CustomEvent = CustomEvent;
}

initCustomEventPolyfill();

window.addEventListener('CookiebotOnDialogDisplay', function() {
	document.querySelectorAll('#CybotCookiebotDialogBodyLevelWrapper label').forEach(function (item, index) {
		var labelSpan = document.createElement('span');
		labelSpan.innerHTML = item.innerHTML;
		item.innerHTML = '';
		item.appendChild(labelSpan);
	});

	let wrapper = document.querySelector('#CybotCookiebotDialogBodyLevelWrapper');
	let details = document.querySelector('#CybotCookiebotDialogDetail');
	let buttons = wrapper.querySelector('#CybotCookiebotDialogBodyLevelButtons');

	wrapper.insertBefore(details, buttons);
});
