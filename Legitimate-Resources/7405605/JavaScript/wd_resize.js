(function($) {
	// Call specified resize method on elements from top down
	webDriver.doResize = function(element, level) {
		var $element = $(element);
		level = level || "children";
		var $items = $([]);
		if (level == "container") {
			$items = $element.parent().closest("[wd_resize]");
			if ($items.length == 0)
				level = "self";
		}
		if (level == "self") {
			if ($element.attr("wd_resize"))
				$items = $element;
			else
				level = "children";
		}
		if (level == "children") {
			$items = $element.find("[wd_resize]");
		}
		$items.each(function() {
			var $this = $(this);
			var $parents = (level == "children") ? $this.parentsUntil($element, "[wd_resize]") : $([]);
			if ($parents.length == 0) {
				$this.addClass("wd_resizing");
				var method = $this.attr("wd_resize");
				var result = webDriver[method].call(this);
				if (result !== false)
					webDriver.doResize(this);
				$this.removeClass("wd_resizing");
			}
		});
	}
	
	$(function() {
		// TODO: debounce resize events
		$(window).resize(function() {webDriver.doResize(document);});
		setTimeout(function() {webDriver.doResize(document);}, 1);
	});
})(webDriver.jQuery);