
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2023-05-25 15:00:05+0000","generator":"GlotPress\/4.0.0-alpha.4","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n > 1;","lang":"fr"},"Your new password has not been saved.":["Votre nouveau mot de passe n\u2019a pas \u00e9t\u00e9 enregistr\u00e9."],"Hide":["Masquer"],"Show":["Afficher"],"Confirm use of weak password":["Confirmer l\u2019utilisation du mot de passe faible"],"Hide password":["Cacher le mot de passe"],"Show password":["Afficher le mot de passe"]}},"comment":{"reference":"wp-admin\/js\/user-profile.js"}} );
