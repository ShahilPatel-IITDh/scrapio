
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2023-05-25 15:00:05+0000","generator":"GlotPress\/4.0.0-alpha.4","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n > 1;","lang":"fr"},"%1$s is deprecated since version %2$s! Use %3$s instead. Please consider writing more inclusive code.":["%1$s est obsol\u00e8te depuis la version %2$s\u00a0! Utilisez %3$s \u00e0 la place. Pensons \u00e0 \u00e9crire du code plus inclusif."]}},"comment":{"reference":"wp-admin\/js\/password-strength-meter.js"}} );
