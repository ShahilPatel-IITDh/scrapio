document.addEventListener("DOMContentLoaded", function() {
	$(".nav-tabs a").click(function(event1) {
		event1.preventDefault();
		$(this)
			.parents(".ttsstt")
			.siblings()
			.find(".ins_ttsstt")
			.removeClass("active");
		$(this)
			.parent()
			.addClass("active");
		var tab = $(this).attr("href");
		$(tab)
			.siblings()
			.hide();
		$(tab).fadeIn();
	});

	try {
		//Mobile menu
		//This is a hack for dropdown menus since Eunic wanted certain secitons with submenu's to be canHoverAndClick
		let $submenus = $(".menubxs ul li").has("ul"),
			// Expand this selector to enable clicking for the specified links. This matches only the path of the link with submenus that needs to be clickable
			$canHoverAndClick = $submenus.find(
				"[href$='/members'], [href$='/currentmembers'], [href$='/current_members'], [href$='/current-members'], [href$='/issues'], [href$='/benefits'], [href$='/contracts']"
			),
			$canHoverOnly = $submenus.not($canHoverAndClick);
		$canHoverOnly.addClass("has-sub-menu");
		if ($canHoverOnly.find("ul").length) {
			$('<span class="mobile-sub-menu-activate"></span>').insertAfter(
				$canHoverOnly.find("> a")
			);
		}
		$canHoverAndClick.css({
			"pointer-events": "auto",
			cursor: "pointer"
		});
		$submenus.find(".mobile-sub-menu-activate").click(toggleSubMenus);
		function toggleSubMenus() {
			let $this = $(this);
			if (window.matchMedia("(max-width: 767px)").matches) {
				$this
					.parent()
					.siblings()
					.removeClass("active")
					.find("ul")
					.slideUp("fast", function() {
						$this.next().slideToggle("fast", function() {
							$this.parent().toggleClass("active");
						});
					});
			}
		}
	} catch (e) {
		console.log(e);
	}

	$(".mobile-menu").click(function() {
		$(this).toggleClass("cross");
		//$('').slideToggle();
		$(".menubxs").slideToggle(400, function() {
			$(this)
				.toggleClass("expand")
				.css("display", "");
			$("body").toggleClass("is-menu-open");
		});
	});
});

/**
 * Scroll single items within a container smoothly
 */
class ScrollItems {
	constructor(options) {
		let defaultOptions = {
			timeout: 5000
		};
		this.options = Object.assign({}, defaultOptions, options);
		this.$container = $(options.container);
		this.$content = $(options.content || this.$container.children().first());
		this.containerHeight = options.height || "400px";
		this.delay = options.delay || 5000;
		this.transitionDelay = this.delay - (options.transitionDelay || 500);
		this.timeoutObject = this.$scroller = null;
		//Match the height of this container on start
		this.matchHeight = options.matchHeight || null;
		const self = this;
		$(document).ready(function() {
			self.start();
		});
	}

	/**
	 * Start scrolling
	 * @var [type]
	 */
	start() {
		console.debug("Initing animate scroll on:", this.options.container);

		if (this.matchHeight) {
			//If we were asked to match the height with that of another element...
			let $matchElem = $(this.matchHeight);
			if ($matchElem.length) {
				this.containerHeight = $matchElem.outerHeight(true);
				this.$container.height(this.containerHeight);
			}
		}

		//Set up scroller
		try {
			this.$container.slimScroll({
				height: this.containerHeight
			});
		} catch (error) {
			console.warn(error);
		}
		this.$container.data("slim-scroll", true);
		if (this.$content.children().length) {
			let first = this.$content.first();
			//If there is an element then start scrolling every 5 seconds
			//Initiate the first scroll
			this.indicate(first);
			this.timeoutObject = setTimeout(
				() => this.scroll(first.next(), first),
				this.options.timeout
			);

			//On a user scroll top the animation
			this.$container.on("DOMMouseScroll focus mouseenter", e => {
				if (this.timeoutObject || this.$container.data("slim-scroll")) {
					console.debug(
						"[" + e.type + "]...stopping animations on:",
						this.options.container
					);
					this.$container.data("slim-scroll", false);
					clearTimeout(this.timeoutObject);
				}
			});

			// If the $container loses focus, reanimate it
			this.$container.on("mouseleave blur", () => {
				if (!this.$container.data("slim-scroll")) {
					this.$container.data("slim-scroll", true);
					console.debug("Restarting animations! on:", this.options.container);
					clearTimeout(this.timeoutObject);
					this.timeoutObject = setTimeout(
						() => this.scroll(this.$container.children(":visible").first()),
						this.options.timeout
					);
				}
			});
		}
		this.$container.slideDown();
	}

	/**
	 * Scroll to a specific position
	 * @var [type]
	 */
	scroll(to, previous) {
		//If there is another element then scroll to it
		if (to && to.length) {
			// console.debug('Scrolling to', to);
			try {
				this.$container.slimScroll({
					scrollTo: to.get(0).offsetTop
				});
			} catch (error) {
				console.warn(error);
			}
			clearTimeout(this.timeoutObject);
			//Reset the timeout every time we scroll
			this.indicate(to);
			setTimeout(() => this.indicate(to), this.options.timeout - 500);
			this.timeoutObject = setTimeout(
				() => this.scroll(to.next(), to),
				this.options.timeout
			);
		} else {
			//Otherwise if there is a callback at the end of items then call it
			if (this.options.onEnd) {
				to = this.options.onEnd.call();
				if (to && to.next().length) {
					this.scroll(to.next(), to);
				}
			}
		}
	}

	/**
	 * Update the visual indicators for scrolled elements
	 * @var [type]
	 */
	indicate(to, previous) {
		if (previous) {
			previous.toggleClass("active");
		}
		to.toggleClass("active");
	}
}
