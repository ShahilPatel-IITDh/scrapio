
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2023-07-08 07:12:34+0000","generator":"GlotPress\/4.0.0-alpha.4","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n != 1;","lang":"nl"},"Tilde":["Tilde"],"Period":["Punt"],"Comma":["Komma"],"Backtick":["Accent grave"]}},"comment":{"reference":"wp-includes\/js\/dist\/keycodes.js"}} );
