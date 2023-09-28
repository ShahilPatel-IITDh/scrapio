
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2023-07-08 07:12:34+0000","generator":"GlotPress\/4.0.0-alpha.4","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n != 1;","lang":"nl"},"%1$s Block. Row %2$d":["%1$s blok. Rij %2$d"],"Design":["Ontwerp"],"%s Block":["%s blok"],"%1$s Block. %2$s":["%1$s blok. %2$s"],"%1$s Block. Column %2$d. %3$s":["%1$s blok. Kolom %2$d. %3$s"],"%1$s Block. Row %2$d. %3$s":["%1$s blok. Rij %2$d. %3$s"],"%1$s Block. Column %2$d":["%1$s blok. Kolom %2$d"],"Embeds":["Insluitingen"],"Reusable blocks":["Herbruikbare blokken"],"Text":["Tekst"],"Widgets":["Widgets"],"Theme":["Thema"],"Media":["Media"]}},"comment":{"reference":"wp-includes\/js\/dist\/blocks.js"}} );
