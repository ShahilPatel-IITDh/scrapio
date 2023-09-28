
( function( domain, translations ) {
var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
localeData[""].domain = domain;
wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2023-07-03 20:20:24+0000","generator":"GlotPress\/4.0.0-alpha.4","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n != 1;","lang":"it"},"You are probably offline.":["Sei probabilmente offline."],"Media upload failed. If this is a photo or a large image, please scale it down and try again.":["Upload dei media falliti. Se questa \u00e8 una foto o un'immagine grande, riduci le dimensioni e riprova."],"The response is not a valid JSON response.":["La risposta non \u00e8 una risposta JSON valida."],"An unknown error occurred.":["Si \u00e8 verificato un errore sconosciuto."]}},"comment":{"reference":"wp-includes\/js\/dist\/api-fetch.js"}} );
