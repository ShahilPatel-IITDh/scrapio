
(function($) {
	webDriver.formatNews = function() {
		var $news = $(this);
		var print_url = $news.attr("wd_print_url");
		$news.find("table").each(function() {
			var $table = $(this);
			var $parent = $table.parent();
			if ($parent.innerWidth() < $table.outerWidth()) {
				if ($parent.hasClass("wd_news_table")) {
					$parent.find(".fullscreen-button").show();
				} else {
					var $btn = $("<button>View News Release Full Screen</button>")
						.addClass("fullscreen-button")
						.on("click", function() {
							if (print_url)
								window.open(print_url, "_blank", "");
							else
								view_printable();
						})
					;

					var $div = $("<div></div>)")
						.addClass("wd_news_table")
						.css("overflow-x", "auto")
						.append($btn)
					;

					$table.replaceWith($div);
					$div.append($table);
				}
			} else {
				if ($parent.hasClass("wd_news_table"))
					$parent.find(".fullscreen-button").hide();
			}
		});
	}
})(webDriver.jQuery);
