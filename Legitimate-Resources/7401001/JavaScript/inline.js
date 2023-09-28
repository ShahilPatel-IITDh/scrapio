<!--
	
	
	function initFlyouts(){
		initPublishedFlyoutMenus(
			[{"id":"412575355482374562","title":"Home","url":"index.html","target":"","nav_menu":false,"nonclickable":false},{"id":"549903265469358206","title":"About","url":"about.html","target":"","nav_menu":false,"nonclickable":false},{"id":"179979443563998511","title":"Services","url":"services.html","target":"","nav_menu":false,"nonclickable":false},{"id":"324255549476980308","title":"Invasive Plants","url":"invasive-plants.html","target":"","nav_menu":false,"nonclickable":false},{"id":"956511569570537937","title":"Beneficial Plants","url":"beneficial-plants.html","target":"","nav_menu":false,"nonclickable":false},{"id":"975613971666947081","title":"Contact","url":"contact.html","target":"","nav_menu":false,"nonclickable":false},{"id":"437764170152587414","title":"Testimonials","url":"testimonials.html","target":"","nav_menu":false,"nonclickable":false}],
			"412575355482374562",
			'',
			'active',
			false,
			{"navigation\/item":"<li {{#id}}id=\"{{id}}\"{{\/id}} class=\"weebly-menu-item-wrap\">\n\t<a\n\t\t{{^nonclickable}}\n\t\t\t{{^nav_menu}}\n\t\t\t\thref=\"{{url}}\"\n\t\t\t{{\/nav_menu}}\n\t\t{{\/nonclickable}}\n\t\t{{#target}}\n\t\t\ttarget=\"{{target}}\"\n\t\t{{\/target}}\n\t\t{{#membership_required}}\n\t\t\tdata-membership-required=\"{{.}}\"\n\t\t{{\/membership_required}}\n\t\tclass=\"weebly-menu-item\"\n\t\t>\n\t\t{{{title_html}}}\n\t<\/a>\n\t{{#has_children}}{{> navigation\/flyout\/list}}{{\/has_children}}\n<\/li>\n","navigation\/flyout\/list":"<div class=\"weebly-menu-wrap\" style=\"display:none\">\n\t<ul class=\"weebly-menu\">\n\t\t{{#children}}{{> navigation\/flyout\/item}}{{\/children}}\n\t<\/ul>\n<\/div>\n","navigation\/flyout\/item":"<li {{#id}}id=\"{{id}}\"{{\/id}}\n\tclass=\"weebly-menu-subitem-wrap {{#is_current}}wsite-nav-current{{\/is_current}}\"\n\t>\n\t<a\n\t\t{{^nonclickable}}\n\t\t\t{{^nav_menu}}\n\t\t\t\thref=\"{{url}}\"\n\t\t\t{{\/nav_menu}}\n\t\t{{\/nonclickable}}\n\t\t{{#target}}\n\t\t\ttarget=\"{{target}}\"\n\t\t{{\/target}}\n\t\tclass=\"weebly-menu-subitem\"\n\t\t>\n\t\t<span class=\"weebly-menu-title\">\n\t\t\t{{{title_html}}}\n\t\t<\/span>{{#has_children}}<span class=\"weebly-menu-arrow\">&gt;<\/span>{{\/has_children}}\n\t<\/a>\n\t{{#has_children}}{{> navigation\/flyout\/list}}{{\/has_children}}\n<\/li>\n"},
			{}
		)
	}
//-->
