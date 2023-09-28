
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "give", {"translation-revision-date":"2022-07-05 10:37:04+0000","generator":"GlotPress\/4.0.0-alpha.1","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n != 1;","lang":"en_GB"},"Dismiss this notice.":["Dismiss this notice."]}},"comment":{"reference":"assets\/dist\/js\/give.js"}} );
