jQuery(function ($) {
	if (typeof top_posts_list !== "undefined" && top_posts_list.length > 0) {
		var read_posts = [];
		var c_posts = jQuery.cookie( 'read_posts' );
		if (typeof c_posts !== "undefined") {
			read_posts = c_posts.split( ',' );
		}

		$('.read-more-empty').each(function () {
			var html = $(this).html();
			var found = false;

			for (var i = 0; i < top_posts_list.length; ++i) {
				if (typeof top_posts_list[i] !== "undefined" &&
					typeof top_posts_list[i].id !== "undefined" &&
					read_posts.indexOf("" + top_posts_list[i].id) === -1
				) {
						html = replaceReadMoreHtml(html, top_posts_list[i]);
						found = true;
						break;
				}
			}

			if (!found && typeof top_posts_list[0] !== "undefined" && typeof top_posts_list[0].id !== "undefined") {
				html = replaceReadMoreHtml(html, top_posts_list[0]);
			}

			$(this).html(html);
			$(this).removeClass('read-more-empty');
		});
	} else {
		$('.read-more-empty').remove();
	}

	function replaceReadMoreHtml(html, obj)
	{
		html = html.replace(/\{PostUrl}/g, obj.url);
		html = html.replace(/\{PostTitle}/g, obj.title);
		html = html.replace(/\{PostImg}/g, obj.img);

		if (!obj.noindex) {
			html = html.replace(/rel="nofollow"/g, '');
		}

		return html;
	}
});
