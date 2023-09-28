<!--
	
	
	function initFlyouts(){
		initPublishedFlyoutMenus(
			[{"id":"356862743225962946","title":"Home Start","url":"index.html","target":"","nav_menu":false,"nonclickable":false},{"id":"423470551666833094","title":"Portrait","url":"portrait.html","target":"","nav_menu":false,"nonclickable":false},{"id":"657342940831414611","title":"Angebot","url":"angebot.html","target":"","nav_menu":false,"nonclickable":false},{"id":"264060306873089948","title":"Termin buchen","url":"termin-buchen.html","target":"","nav_menu":false,"nonclickable":false},{"id":"921388882596205077","title":"Preise","url":"preise.html","target":"","nav_menu":false,"nonclickable":false},{"id":"171080444283681604","title":"Gutscheine","url":"gutscheine.html","target":"","nav_menu":false,"nonclickable":false},{"id":"705772465173141723","title":"Orthop&auml;dische Kopfkissen","url":"orthopaumldische-kopfkissen.html","target":"","nav_menu":false,"nonclickable":false},{"id":"684484748235622950","title":"Krankenkassen","url":"krankenkassen.html","target":"","nav_menu":false,"nonclickable":false},{"id":"663506528249285314","title":"Situationsplan","url":"situationsplan.html","target":"","nav_menu":false,"nonclickable":false},{"id":"622049292191523540","title":"Kontakt","url":"kontakt.html","target":"","nav_menu":false,"nonclickable":false},{"id":"891163462997927673","title":"Links","url":"links.html","target":"","nav_menu":false,"nonclickable":false}],
			"622049292191523540",
			'',
			'active',
			false,
			{"navigation\/item":"<li {{#id}}id=\"{{id}}\"{{\/id}} class=\"wsite-menu-item-wrap\">\n\t<a\n\t\t{{^nonclickable}}\n\t\t\t{{^nav_menu}}\n\t\t\t\thref=\"{{url}}\"\n\t\t\t{{\/nav_menu}}\n\t\t{{\/nonclickable}}\n\t\t{{#target}}\n\t\t\ttarget=\"{{target}}\"\n\t\t{{\/target}}\n\t\t{{#membership_required}}\n\t\t\tdata-membership-required=\"{{.}}\"\n\t\t{{\/membership_required}}\n\t\tclass=\"wsite-menu-item\"\n\t\t>\n\t\t{{{title_html}}}\n\t<\/a>\n\t{{#has_children}}{{> navigation\/flyout\/list}}{{\/has_children}}\n<\/li>\n","navigation\/flyout\/list":"<div class=\"wsite-menu-wrap\" style=\"display:none\">\n\t<ul class=\"wsite-menu\">\n\t\t{{#children}}{{> navigation\/flyout\/item}}{{\/children}}\n\t<\/ul>\n<\/div>\n","navigation\/flyout\/item":"<li {{#id}}id=\"{{id}}\"{{\/id}}\n\tclass=\"wsite-menu-subitem-wrap {{#is_current}}wsite-nav-current{{\/is_current}}\"\n\t>\n\t<a\n\t\t{{^nonclickable}}\n\t\t\t{{^nav_menu}}\n\t\t\t\thref=\"{{url}}\"\n\t\t\t{{\/nav_menu}}\n\t\t{{\/nonclickable}}\n\t\t{{#target}}\n\t\t\ttarget=\"{{target}}\"\n\t\t{{\/target}}\n\t\tclass=\"wsite-menu-subitem\"\n\t\t>\n\t\t<span class=\"wsite-menu-title\">\n\t\t\t{{{title_html}}}\n\t\t<\/span>{{#has_children}}<span class=\"wsite-menu-arrow\">&gt;<\/span>{{\/has_children}}\n\t<\/a>\n\t{{#has_children}}{{> navigation\/flyout\/list}}{{\/has_children}}\n<\/li>\n"},
			{}
		)
	}
//-->
