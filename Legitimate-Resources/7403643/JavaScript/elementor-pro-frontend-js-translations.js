( function( domain, translations ) {
var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
localeData[""].domain = domain;
wp.i18n.setLocaleData( localeData, domain );
} )( "elementor-pro", { "locale_data": { "messages": { "": {} } } } );