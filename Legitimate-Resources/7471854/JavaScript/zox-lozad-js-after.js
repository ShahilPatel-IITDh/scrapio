
	var zoxWidgets = document.querySelectorAll("#zox-home-widget-wrap img");
	lozad(zoxWidgets, {
		rootMargin: "0px 0px",
		loaded: function (el) {
			el.classList.add("is-loaded");
		}
	}).observe();
