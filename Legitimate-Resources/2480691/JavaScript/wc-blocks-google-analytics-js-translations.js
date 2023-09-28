
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "woocommerce", {"translation-revision-date":"2023-03-14 14:28:18+0000","generator":"GlotPress\/4.0.0-alpha.4","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n != 1;","lang":"nl"},"Viewing products":["Producten aan het bekijken"],"Product List":["Productlijst"],"Change Cart Item Quantity":["Aantal artikelen winkelwagen wijzigen"],"Remove Cart Item":["Artikel winkelwagen verwijderen"],"Add to Cart":["Toevoegen aan winkelwagen"],"Payment Method":["Betaalmethodes"],"Shipping Method":["Verzendmethode"]}},"comment":{"reference":"packages\/woocommerce-blocks\/build\/wc-blocks-google-analytics.js"}} );
