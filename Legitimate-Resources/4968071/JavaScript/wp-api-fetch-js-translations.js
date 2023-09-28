
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2023-07-08 07:12:34+0000","generator":"GlotPress\/4.0.0-alpha.4","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n != 1;","lang":"nl"},"You are probably offline.":["Je bent waarschijnlijk offline."],"Media upload failed. If this is a photo or a large image, please scale it down and try again.":["Uploaden media mislukt. Als dit een foto of een grote afbeelding is, verklein deze dan en probeer opnieuw."],"The response is not a valid JSON response.":["De reactie is geen geldige JSON-reactie."],"An unknown error occurred.":["Er is een onbekende fout opgetreden."]}},"comment":{"reference":"wp-includes\/js\/dist\/api-fetch.js"}} );
