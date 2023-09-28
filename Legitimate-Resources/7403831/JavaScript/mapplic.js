/*
 * Mapplic - Custom Interactive Map Plugin by @sekler
 * Version 5.0.2
 * https://www.mapplic.com/
 */

;(function($) {
	"use strict";

	var Mapplic = function(element) {

		var self = this;

		self.o = {
			source: 'locations.json',
			selector: '[id^=landmark] > *, svg > #items > *',
			csv: false,
			landmark: false,
			height: 420,
			portrait: 668,
			minimap: false,
			sidebar: true,
			hidenofilter: false,
			search: true,
			searchfields: ['title', 'about'],
			thumbholder: false,
			deeplinking: true,
			clearbutton: true,
			zoombuttons: true,
			zoomoutclose: false,
			closezoomout: true,
			action: 'default',
			linknewtab: false,
			lightbox: true,
			hovertip: true,
			marker: 'default',
			fillcolor: null,
			fullscreen: true,
			mousewheel: true,
			autopopulate: false,
			alphabetic: false,
			maxscale: 3,
			zoom: true,
			zoommargin: 200,
			mapfill: false,
			developer: false
		};

		self.loc = {
			more: 'More',
			search: 'Search',
		}

		self.el = element;

		self.init = function(options) {
			// merging options with defaults
			self.o = $.extend(self.o, options);
			if (typeof mapplic_localization !== 'undefined') self.loc = $.extend(self.loc, mapplic_localization);

			self.el.addClass('mapplic-element mapplic-loading');

			// process map data
			var data = self.el.data('mapdata');
			if (self.el.data('mapdata')) {
				self.el.removeAttr('data-mapdata');
				processData(self.el.data('mapdata'));
				self.el.removeClass('mapplic-loading');
			}
			else if (typeof self.o.source === 'string') {
				// loading .json file with AJAX
				$.getJSON(self.o.source, function(data) {
					processData(data);
					self.el.removeClass('mapplic-loading');
				}).fail(function() { // Failure: couldn't load JSON file or it is invalid.
					console.error('Couldn\'t load map data. (Make sure to run the script through web server)');
					self.el.removeClass('mapplic-loading').addClass('mapplic-error');
					alert('Data file missing or invalid!\nMake sure to run the script through web server.');
				});
			}
			else {
				// inline json object
				processData(self.o.source);
				self.el.removeClass('mapplic-loading');
			}

			return self;
		}

		// tooltip
		function Tooltip() {
			this.el = null;
			this.pin = null;
			this.shift = 6;
			this.drop = 0;
			this.location = null;

			this.init = function() {
				var s = this;

				// Construct
				this.el = $('<div></div>').addClass('mapplic-tooltip');
				this.wrap = $('<div></div>').addClass('mapplic-tooltip-wrap').appendTo(this.el);
				this.close = $('<a></a>').addClass('mapplic-tooltip-close').attr('href', '#').appendTo(this.wrap);
				this.close.on('click touchend', function(e) {
					e.preventDefault();
					self.hideLocation();
					if (!self.o.zoom || self.o.zoomoutclose) self.moveTo(0.5, 0.5, self.fitscale, 400);
				});
				this.image = $('<img>').addClass('mapplic-image').hide().appendTo(this.wrap);
				this.title = $('<h4></h4>').addClass('mapplic-tooltip-title').appendTo(this.wrap);
				this.content = $('<div></div>').addClass('mapplic-tooltip-content').appendTo(this.wrap);
				this.desc = $('<div></div>').addClass('mapplic-tooltip-description').appendTo(this.content);
				this.link = $('<a>' + self.loc.more + '</a>').addClass('mapplic-popup-link').attr('href', '#').hide().appendTo(this.wrap);
				if (self.o.linknewtab) this.link.attr('target', '_blank');
				this.triangle = $('<div></div>').addClass('mapplic-tooltip-triangle').prependTo(this.wrap);

				self.map.append(this.el);

				return this;
			}

			this.show = function(location) {
				if (location) {
					var s = this;

					this.location = location;
					if (self.hovertip) self.hovertip.hide();

					if (location.image) {
						this.el.addClass('has-image');
						this.image.attr('src', '');
						this.image.attr('src', location.image).show();
					}
					else {
						this.el.removeClass('has-image');
						this.image.hide();
					}

					if (location.link) {
						this.link.attr('href', location.link).css('background-color', '').show();
						var color = getColor(location);
						if (color) this.link.css('background-color', color);
					}
					else this.link.hide();

					this.title.text(location.title);
					if (location.description) this.desc.html(location.description);
					else this.desc.empty();
					this.content[0].scrollTop = 0;

					// shift
					this.pin = $('.mapplic-pin[data-location="' + location.id + '"]');
					if (this.pin.length == 0) {
						this.shift = 20;
					}
					else this.shift = Math.abs(parseFloat(this.pin.css('margin-top'))) + 20;

					// loading & positioning
					$('img', this.el).off('load').on('load', function() {
						s.position();
						if (self.o.zoom) s.zoom(location);
					});
					this.position();
				
					// making it visible
					this.el.stop().css({opacity: 1}).show();
					if (self.o.zoom) this.zoom(location);
				}
			}

			this.position = function() {
				if (this.location) {
					this.el.css({
						left: (this.location.x * 100) + '%',
						top: (this.location.y * 100) + '%'
					});

					this.drop = this.el.outerHeight() + this.shift;
				}
			}

			this.zoom = function(location) {
				var ry = 0.5,
					zoom = location.zoom ? parseFloat(location.zoom) : self.o.maxscale;
				
				ry = ((self.container.el.height() - this.drop) / 2 + this.drop) / self.container.el.height();
				self.moveTo(location.x, location.y, zoom, 600, ry);
			}

			this.hide = function() {
				var s = this;

				this.location = null;
				this.el.stop().fadeOut(300, function() {
					if (s.desc) s.desc.empty();
				});
			}

			this.limitSize = function() {
				this.el.css('max-width', '');
				this.content.css('max-height', '');

				var mw = self.container.el.width() - 100,
					mh = self.container.el.height() - 140;

				if (mw < parseFloat(this.el.css('max-width'))) this.el.css('max-width', mw + 'px');
				if (mh < parseFloat(this.content.css('max-height'))) this.content.css('max-height', mh + 'px');
			}
		}

		// lightbox
		function Lightbox() {
			this.el = null;

			this.init = function() {
				// construct
				this.el = $('<div></div>').addClass('mapplic-lightbox mfp-hide');
				this.title = $('<h2></h2>').addClass('mapplic-lightbox-title').appendTo(this.el);
				this.desc = $('<div></div>').addClass('mapplic-lightbox-description').appendTo(this.el);
				this.link = $('<a>' + self.loc.more + '</a>').addClass('mapplic-popup-link').attr('href', '#').hide().appendTo(this.el);
				if (self.o.linknewtab) this.link.attr('target', '_blank');

				// append
				self.el.append(this.el);

				return this;
			}

			this.show = function(location) {
				this.location = location;

				this.title.text(location.title);
				this.desc.html(location.description);

				if (location.link) {
					this.link.attr('href', location.link).css('background-color', '').show();
					var color = getColor(location);
					if (color) this.link.css('background-color', color);
				}
				else this.link.hide();

				var s = this;

				$.magnificPopup.open({
					items: { src: this.el },
					type: 'inline',
					removalDelay: 300,
					mainClass: 'mfp-fade',
					callbacks: {
						beforeClose: function() {
							s.hide();
						}
					}
				});

				// zoom
				var zoom = location.zoom ? parseFloat(location.zoom) : self.o.maxscale;
				if (self.o.zoom) self.moveTo(location.x, location.y, zoom, 600);

				// hide tooltip
				if (self.tooltip) self.tooltip.hide();
			}

			this.showImage = function(location) {
				this.location = location;

				var s = this;

				$.magnificPopup.open({
					items: { src: location.image },
					type: 'image',
					removalDelay: 300,
					mainClass: 'mfp-fade',	
					callbacks: {
						beforeClose: function() {
							s.hide();
						}
					}
				});

				// zoom
				var zoom = location.zoom ? parseFloat(location.zoom) : self.o.maxscale;
				if (self.o.zoom) self.moveTo(location.x, location.y, zoom, 600);
			}

			this.hide = function() {
				this.location = null;
				self.hideLocation();
				if (!self.o.zoom || self.o.zoomoutclose) self.moveTo(0.5, 0.5, self.fitscale, 400);
			}
		}

		// hover tooltip
		function HoverTooltip() {
			this.el = null;
			this.pin = null;
			this.shift = 6;
			this.hovertipdesc = false;

			this.init = function() {
				var s = this;

				// construct
				this.el = $('<div></div>').addClass('mapplic-tooltip mapplic-hovertip');
				this.wrap = $('<div></div>').addClass('mapplic-tooltip-wrap').appendTo(this.el);
				this.title = $('<h4></h4>').addClass('mapplic-tooltip-title').appendTo(this.wrap);
				if (this.hovertipdesc) this.desc = $('<div></div>').addClass('mapplic-tooltip-description').appendTo(this.wrap);
				this.triangle = $('<div></div>').addClass('mapplic-tooltip-triangle').appendTo(this.wrap);

				// events 
				// markers + old svg
				$(self.map).on('mouseover', '.mapplic-layer a', function() {
					var id = '';
					if ($(this).hasClass('mapplic-pin')) {
						id = $(this).data('location');
						s.pin = $('.mapplic-pin[data-location="' + id + '"]');
						s.shift = Math.abs(parseFloat(s.pin.css('margin-top'))) + 20;
					}
					else {
						id = $(this).attr('xlink:href').slice(1);
						s.shift = 20;
					}

					var location = self.l[id];
					if (location && location.title) s.show(location);
				}).on('mouseout', function() {
					s.hide();
				});

				// new svg
				if (self.o.selector) {
					$(self.map).on('mouseover', self.o.selector, function() {
						var location = self.l[$(this).attr('id')];
						s.shift = 20;
						if (location && location.title) s.show(location);
					}).on('mouseout', function() {
						s.hide();
					});
				}

				self.map.append(this.el);

				return this;
			}

			this.show = function(location) {
				if (self.location != location) {
					this.title.text(location.title);
					if (this.hovertipdesc) this.desc.html(location.description);
					this.position(location);

					this.el.stop().fadeIn(100);
				}
			}

			this.position = function(location) {
				if (location) {
					this.el.css({
						left: (location.x * 100) + '%',
						top: (location.y * 100) + '%'
					});

					this.drop = this.el.outerHeight() + this.shift;
				}
			}

			this.hide = function() {
				this.el.stop().fadeOut(200);
			}
		}

		// deeplinking
		function Deeplinking() {
			this.param = 'location';

			this.init = function() {
				var s = this;
				this.check(0);

				window.onpopstate = function(e) {
					if (e.state) s.check(600);
					return false;
				}
			}

			this.check = function(duration) {
				var id = this.getUrlParam(this.param);
				if (id) self.showLocation(id, duration, true);
			}

			this.getUrlParam = function(name) {
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
					results = regex.exec(location.search);
				return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

			this.update = function(id) {
				var url;
				if (typeof window.URL !== 'undefined') {
					url = new URL(window.location.href);
					url.searchParams.set(this.param, id);
					url = url.href
				} else {
					url = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + this.param + '=' + id;
				}
				window.history.pushState({path: url}, '', url);
			}

			this.clear = function() {
				var url;
				if (typeof window.URL !== 'undefined') {
					url = new URL(window.location.href);
					url.searchParams.delete(this.param);
					url = url.href;
				} else {
					url = window.location.pathname;
				}
				history.pushState('', document.title, url);
			}
		}

		// old hash deeplinking method for old browsers
		function DeeplinkingHash() {
			this.param = 'location';

			this.init = function() {
				var s = this;
				this.check(0);

				$(window).on('hashchange', function() {
					s.check(600);
				});
			}

			this.check = function(duration) {
				var id = location.hash.slice(this.param.length + 2);
				self.showLocation(id, duration, true);
			}

			this.update = function(id) {
				window.location.hash = this.param + '-' + id;
			}

			this.clear = function() {
				window.location.hash = this.param;
			}
		}

		// minimap
		function Minimap() {
			this.el = null;
			this.opacity = null;

			this.init = function() {
				this.el = $('<div></div>').addClass('mapplic-minimap').appendTo(self.container.el);
				this.el.click(function(e) {
					e.preventDefault();

					var x = (e.pageX - $(this).offset().left) / $(this).width(),
						y = (e.pageY - $(this).offset().top) / $(this).height();

					self.moveTo(x, y, self.scale / self.fitscale, 100);
				});

				return this;
			}

			this.addLayer = function(data) {
				var layer = $('<div></div>').addClass('mapplic-minimap-layer').attr('data-floor', data.id).appendTo(this.el),
					s = this;

				$('<img>').attr('src', data.minimap).addClass('mapplic-minimap-background').appendTo(layer);
				$('<div></div>').addClass('mapplic-minimap-overlay').appendTo(layer);
				$('<img>').attr('src', data.minimap).addClass('mapplic-minimap-active').on('load', function() {
					s.update();
				}).appendTo(layer);
			}

			this.show = function(target) {
				$('.mapplic-minimap-layer', this.el).hide();
				$('.mapplic-minimap-layer[data-floor="' + target + '"]', this.el).show();
			}

			this.update = function(x, y) {
				var active = $('.mapplic-minimap-active', this.el);

				if (x === undefined) x = self.x;
				if (y === undefined) y = self.y;

				var width = (self.container.el.width() / self.contentWidth / self.scale * this.el.width()),
					height = (self.container.el.height() / self.contentHeight / self.scale * this.el.height()),
					top = (-y / self.contentHeight / self.scale * this.el.height()),
					left = (-x / self.contentWidth / self.scale * this.el.width()),
					right = left + width,
					bottom = top + height;

				active.each(function() {
					$(this)[0].style.clip = 'rect(' + top + 'px, ' + right + 'px, ' + bottom + 'px, ' + left + 'px)';
				});

				// fade out effect
				var s = this;
				this.el.show();
				this.el.css('opacity', 1.0);
				clearTimeout(this.opacity);
				this.opacity = setTimeout(function() {
					s.el.css('opacity', 0);
					setTimeout(function() { s.el.hide(); }, 600);
				}, 2000);
			}
		}

		// legend
		function Legend() {
			this.el = null;
			this.nr = 0;

			this.init = function() {
				this.el = $('<div></div>').addClass('mapplic-legend');
				return this;
			}

			this.build = function(categories) {
				var s = this;
				$.each(categories, function(index, category) {
					if (category.legend == 'true') s.add(category);
				});
				if (this.nr > 0) this.el.appendTo(self.container.el);
			}

			this.add = function(group) {
				var toggle = this.newToggle(group, true);
				if (toggle) toggle.appendTo(this.el);
				else {
					var key = $('<span></span>').addClass('mapplic-legend-key');
					if (group.color) key.css('background-color', group.color);
					$('<span></span>').addClass('mapplic-legend-label').text(group.title).prepend(key).appendTo(this.el);
				}
				this.nr++;
			}

			this.toggle = function(group, state) {
				$('*[id="' + group + '"]', self.map).toggle(state);
				$('*[data-category*="' + group + '"]', self.map).each(function() {
					var attr = $(this).attr('data-category'); 
					if (attr == group) $(this).toggle(state);
					else { // multi-group support
						var groups = attr.split(','),
							show = false;
						groups.forEach(function(g) { if ($('.mapplic-toggle > input[data-group="' + g + '"]')[0].checked) show = true; });
						$(this).toggle(show);
					}
				});
			}

			this.newToggle = function(group, title) {
				var s = this,
					toggle = null;

				if (group.toggle == 'true') {
					toggle = $('<label class="mapplic-toggle"></label>');
					var input = $('<input type="checkbox" checked>').attr('data-group', group.id).appendTo(toggle);
					var circle = $('<span></span>').addClass('mapplic-toggle-circle').appendTo(toggle);
					if (title) $('<span></span>').addClass('mapplic-legend-label').text(group.title).appendTo(toggle);
					if (group.color) circle.css('background-color', group.color);
					if (group.switchoff == 'true') input.prop('checked', false);
					
					input.change(function() {
						$('.mapplic-toggle > input[data-group="' + group.id + '"]', self.el).prop('checked', this.checked);
						s.toggle(group.id, this.checked);
					});
				}
				return toggle;
			}

			this.applyToggles = function() {
				var s = this;
				$('.mapplic-toggle > input', self.el).each(function() {
					s.toggle($(this).attr('data-group'), this.checked);
				});
			}
		}

		// sidebar
		function Sidebar() {
			this.el = null;
			this.g = {};
			this.filter = null;
			this.input = null;
			this.list = null;
			this.tags = null;
			this.taglist = {};

			this.init = function() {
				var s = this;

				this.el = $('<div></div>').addClass('mapplic-sidebar').appendTo(self.el);

					this.filter = $('<div></div>').addClass('mapplic-filter').appendTo(this.el);
					this.tags = $('<div></div>').addClass('mapplic-filter-tags').appendTo(this.filter);

					this.input = $('<input>').attr({'type': 'text', 'spellcheck': 'false', 'placeholder': self.loc.search}).addClass('mapplic-search-input').keyup(function(e) {
						s.search();
						if (e.keyCode == 13) $('li > a', s.el).filter(':visible:first').click();
					});
					if (self.o.search) this.input.prependTo(this.filter);

					self.clear = $('<a></a>').attr('href', '#').addClass('mapplic-search-clear').click(function(e) {
						e.preventDefault();
						s.input.val('');
						s.search();
					}).appendTo(this.filter);

				var container = $('<div></div>').addClass('mapplic-list-container').appendTo(this.el);
				this.list = $('<ol></ol>').addClass('mapplic-list').appendTo(container);

				if (!self.o.search) this.el.addClass('mapplic-sidebar-nosearch');
			}

			this.addTag = function(item) {
				var s = this;
				if (s.taglist[item.id]) return false;

				var tag = $('<div></div>').addClass('mapplic-tag').text(item.title).appendTo(this.tags);
				$('<span></span>').appendTo(tag);
				if (item.color) tag.css('background-color', item.color);

				tag.click(function() {
					tag.remove();
					delete s.taglist[item.id];
					s.search();
				}).appendTo(tag);

				s.taglist[item.id] = true;
				s.search();
			}

			this.placeholder = function(title) {
				var text = '';
				if (title) {
					var words = title.split(' ');
					if (words[0]) text += words[0][0];
					if (words[1]) text += words[1][0];
				}

				return $('<div></div>').addClass('mapplic-thumbnail mapplic-thumbnail-placeholder').text(text.toUpperCase());
			}

			this.addCategories = function(categories) {
				var s = this;
				var expandable = $('<li></li>').addClass('mapplic-list-expandable'),
					expandablelist = $('<ol></ol>').appendTo(expandable);

				this.list.append(expandable);

				if (categories) {
					$.each(categories, function(index, category) {
						self.g[category.id] = category;
						category.nr = 0;

						if (!(category.hide == 'true')) {
							var item = $('<li></li>').addClass('mapplic-list-category').attr('data-category', category.id);
							var link = $('<a></a>').attr('href', '#').prependTo(item);

							var thumbnail = null;
							if (category.icon) thumbnail = $('<img>').attr('src', category.icon).addClass('mapplic-thumbnail').appendTo(link);
							else thumbnail = s.placeholder(category.title).appendTo(link);

							if (category.color) thumbnail.css('background-color', category.color);

							var title = $('<h4></h4').text(category.title).appendTo(link);
							if (!category.about) title.addClass('mapplic-margin');
							category.count = $('<span></span>').text('(0)').addClass('mapplic-list-count').appendTo(title);
							
							if (category.about) $('<span></span>').addClass('mapplic-about').html(category.about).appendTo(link);
							
							var toggle = self.legend.newToggle(category)
							if (toggle) toggle.appendTo(item);

							link.on('click', function(e) {
								e.preventDefault();
								if (category.nr < 1 && toggle) $('> input', toggle).trigger('click');
								else {
									s.input.val('');
									s.addTag(category);
								}
							});

							category.list = item;
							item.appendTo(expandablelist);
						}
					});
				}
			}

			this.countCategory = function() {
				$.each(self.g, function(i, group) {
					if (group.count) {
						group.count.text('(' + group.nr + ')');
						if (group.nr < 1) group.count.hide();
						else group.count.show();
					}
				});
			}

			this.addLocation = function(location) {
				var item = $('<li></li>').addClass('mapplic-list-location').attr('data-location', location.id);
				var link = $('<a></a>').attr('href', '#').click(function(e) {
					e.preventDefault();
					self.showLocation(location.id, 600);

					// scroll back to map on mobile
					if (($(window).width() < 668) && (location.action || self.o.action) != 'lightbox') {
						$('html, body').animate({
							scrollTop: self.container.el.offset().top
						}, 400);
					}
				}).appendTo(item);
				var color = getColor(location);
				if (color) item.css('border-color', color);
				if (self.o.hidenofilter) item.hide();

				if (location.thumbnail) $('<img>').attr('src', location.thumbnail).addClass('mapplic-thumbnail').appendTo(link);
				else if (self.o.thumbholder) this.placeholder(location.title).appendTo(link);
				$('<h4></h4>').text(location.title).appendTo(link);
				$('<span></span>').html(location.about).addClass('mapplic-about').appendTo(link);
			
				// groups
				if (location.category) {
					var groups = location.category.toString().split(',');
					groups.forEach(function(group) { if (self.g[group]) self.g[group].nr++; });
				}

				this.list.append(item);

				return item;
			}

			// search
			this.search = function() {
				var keyword = this.input.val(),
					s = this;
				
				if (keyword) self.clear.fadeIn(100);
				else self.clear.fadeOut(100);

				// groups
				$.each(self.g, function(i, group) {
					if (group.list) {
						var shown = false;
						if (!$.isEmptyObject(s.taglist)) shown = false;
						else $.each(self.o.searchfields, function(i, field) { if (group[field] && !shown) shown = !(group[field].toLowerCase().indexOf(keyword.toLowerCase()) == -1); });

						if (shown) group.list.slideDown(200);
						else group.list.slideUp(200);
					}
				});

				// locations
				$.each(self.l, function(i, location) {
					if (location.list) {
						var shown = false;
						if (!self.o.hidenofilter || (!$.isEmptyObject(s.taglist) || keyword)) {
							$.each(self.o.searchfields, function(i, field) { if (location[field] && !shown) shown = !(location[field].toLowerCase().indexOf(keyword.toLowerCase()) == -1); });
							$.each(s.taglist, function(i, tag) { if (!location.category || location.category.indexOf(i) == -1) shown = false; });
						}

						if (shown) location.list.slideDown(200);
						else location.list.slideUp(200);
					}
				});
			}

			this.sort = function() {
				var s = this,
					listitems = this.list.children('.mapplic-list-location').get();
				listitems.sort(function(a, b) {
					var compA = $(a).text().toUpperCase();
					var compB = $(b).text().toUpperCase();
					return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
				})
				$.each(listitems, function(idx, itm) {  s.list.append(itm); });
			}
		}

		// developer tools
		function DevTools() {
			this.el = null;

			this.init = function() {
				this.el = $('<div></div>').addClass('mapplic-coordinates').appendTo(self.container.el);
				this.el.append('x: ');
				$('<code></code>').addClass('mapplic-coordinates-x').appendTo(this.el);
				this.el.append(' y: ');
				$('<code></code>').addClass('mapplic-coordinates-y').appendTo(this.el);

				$('.mapplic-layer', self.map).on('mousemove', function(e) {
					var x = (e.pageX - self.map.offset().left) / self.map.width(),
						y = (e.pageY - self.map.offset().top) / self.map.height();
					$('.mapplic-coordinates-x').text(parseFloat(x).toFixed(4));
					$('.mapplic-coordinates-y').text(parseFloat(y).toFixed(4));
				});

				return this;
			}
		}		

		// clear button
		function ClearButton() {
			this.el = null;
			
			this.init = function() {
				this.el = $('<a></a>').attr('href', '#').addClass('mapplic-button mapplic-clear-button').appendTo(self.container.el);

				if (!self.o.zoombuttons) this.el.css('bottom', '0');

				this.el.on('click touchstart', function(e) {
					e.preventDefault();
					self.hideLocation();
					self.moveTo(0.5, 0.5, self.fitscale, 400);
				});

				return this;
			}

			this.update = function(scale) {
				if (scale == self.fitscale) this.el.stop().fadeOut(200);
				else this.el.stop().fadeIn(200);
			}
		}

		// zoom buttons
		function ZoomButtons() {
			this.el = null;
		
			this.init = function() {
				this.el = $('<div></div>').addClass('mapplic-zoom-buttons').appendTo(self.container.el);

				// zoom-in button
				this.zoomin = $('<a></ha>').attr('href', '#').addClass('mapplic-button mapplic-zoomin-button').appendTo(this.el);
				this.zoomin.on('click touchstart', function(e) {
					e.preventDefault();
					self.container.stopMomentum();

					var scale = self.scale;
					self.scale = normalizeScale(scale + scale * 0.8);

					self.x = normalizeX(self.x - (self.container.el.width() / 2 - self.x) * (self.scale / scale - 1));
					self.y = normalizeY(self.y - (self.container.el.height() / 2 - self.y) * (self.scale / scale - 1));

					zoomTo(self.x, self.y, self.scale, 400, 'ease');
				});

				// zoom-out button
				this.zoomout = $('<a></ha>').attr('href', '#').addClass('mapplic-button mapplic-zoomout-button').appendTo(this.el);
				this.zoomout.on('click touchstart', function(e) {
					e.preventDefault();
					self.container.stopMomentum();

					var scale = self.scale;
					self.scale = normalizeScale(scale - scale * 0.4);

					self.x = normalizeX(self.x - (self.container.el.width() / 2 - self.x) * (self.scale / scale - 1));
					self.y = normalizeY(self.y - (self.container.el.height() / 2 - self.y) * (self.scale / scale - 1));

					zoomTo(self.x, self.y, self.scale, 400, 'ease');
				});

				return this;
			}

			this.update = function(scale) {
				this.zoomin.removeClass('mapplic-disabled');
				this.zoomout.removeClass('mapplic-disabled');
				if (scale == self.fitscale) this.zoomout.addClass('mapplic-disabled');
				else if (scale == self.o.maxscale) this.zoomin.addClass('mapplic-disabled');
			}
		}

		// fullscreen
		function Fullscreen() {
			this.el = null;

			this.init = function() {
				// fullscreen button
				this.el = $('<a></a>').attr('href', '#').attr('href', '#').addClass('mapplic-button mapplic-fullscreen-button').click(function(e) {
					e.preventDefault();
					self.el.toggleClass('mapplic-fullscreen');
					$(document).resize();
				}).appendTo(self.container.el);

				// esc key
				$(document).keyup(function(e) {
					if ((e.keyCode === 27) && $('.mapplic-fullscreen')[0]) {
						$('.mapplic-element.mapplic-fullscreen').removeClass('mapplic-fullscreen');
						$(document).resize();
					}
				});
			}
		}

		// container
		function Container() {
			this.el = null;
			this.oldW = 0;
			this.oldH = 0;
			this.position = {x: 0, y: 0},
			this.momentum = null;

			this.init = function() {
				this.el = $('<div></div>').addClass('mapplic-container').appendTo(self.el);
				self.map = $('<div></div>').addClass('mapplic-map').appendTo(this.el);

				self.map.css({
					'width': self.contentWidth,
					'height': self.contentHeight
				});

				return this;
			}

			// returns container height (px)
			this.calcHeight = function(x) {
				var val = x.toString().replace('px', '');

				if ((val == 'auto') && (self.container.el))  val = self.container.el.width() * self.contentHeight / self.contentWidth; 
				else if (val.slice(-1) == '%') val = $(window).height() * val.replace('%', '') / 100;

				if ($.isNumeric(val)) return val;
				else return false;
			}

			this.resetZoom = function() {
				var init = self.l['init'];
				if (init) {
					var zoom = init.zoom ? parseFloat(init.zoom) : self.o.maxscale;
					self.switchLevel(init.level);
					self.moveTo(init.x, init.y, zoom, 0);
				}
				else self.moveTo(0.5, 0.5, self.fitscale, 0);
			}

			this.revealChild = function(parent) {
				$('.mapplic-pin[data-location^=' + parent.id + ']', self.map).addClass('mapplic-revealed');
				$('[id^=' + parent.id + ']', self.map).addClass('mapplic-revealed');
			}

			this.revealZoom = function(zoom) {
				$('.mapplic-pin[data-reveal]', self.map).each(function() {
					var reveal = $(this).data('reveal');
					if (zoom >= reveal) $(this).addClass('mapplic-revealed');
					else $(this).removeClass('mapplic-revealed');
				});
			}

			this.coverAll = function() {
				$('.mapplic-revealed', self.map).removeClass('mapplic-revealed');
			}

			this.stopMomentum = function() {
				cancelAnimationFrame(this.momentum);
				if (this.momentum != null) {
					self.x = this.position.x;
					self.y = this.position.y;
				}
				this.momentum = null;
			}

			this.addControls = function() {
				self.map.addClass('mapplic-zoomable');

				document.ondragstart = function() { return false; } // IE drag fix

				// momentum
				var friction = 0.85,
					mouse = {x: 0, y: 0},
					previous = {x: this.position.x, y: this.position.y},
					velocity = {x: 0, y: 0};

				var s = this;
				var momentumStep = function() {
					s.momentum = requestAnimationFrame(momentumStep);

					if (self.map.hasClass('mapplic-dragging')) {
						previous.x = s.position.x;
						previous.y = s.position.y;

						s.position.x = mouse.x;
						s.position.y = mouse.y;
						
						velocity.x = (s.position.x - previous.x);
						velocity.y = (s.position.y - previous.y);
					}
					else {
						s.position.x += velocity.x;
						s.position.y += velocity.y;
						
						velocity.x *= friction;
						velocity.y *= friction;

						if (Math.abs(velocity.x) + Math.abs(velocity.y) < 0.1) {
							s.stopMomentum();
							self.x = s.position.x;
							self.y = s.position.y;
						}
					}
					s.position.x = normalizeX(s.position.x);
					s.position.y = normalizeY(s.position.y);

					zoomTo(s.position.x, s.position.y);
				}

				// drag & drop
				$('.mapplic-map-image', self.map).on('mousedown', function(e) {
					self.dragging = false;
					self.map.addClass('mapplic-dragging');
					
					var initial = {x: e.pageX, y: e.pageY};

					s.stopMomentum();
					mouse.x = normalizeX(e.pageX - initial.x + self.x);
					mouse.y = normalizeY(e.pageY - initial.y + self.y);
					momentumStep();

					self.map.on('mousemove', function(e) {
						self.dragging = true;

						mouse.x = normalizeX(e.pageX - initial.x + self.x);
						mouse.y = normalizeY(e.pageY - initial.y + self.y);
					});
				
					$(document).on('mouseup', function() {
						self.map.off('mousemove');
						$(document).off('mouseup');

						self.map.removeClass('mapplic-dragging');
					});
				});

				// mousewheel
				if (self.o.mousewheel) {
					$('.mapplic-layer', self.el).bind('mousewheel DOMMouseScroll', function(e, delta) {
						e.preventDefault();
						s.stopMomentum();

						var scale = self.scale;

						self.scale = normalizeScale(scale + scale * delta / 5);

						self.x = normalizeX(self.x - (e.pageX - self.container.el.offset().left - self.x) * (self.scale/scale - 1));
						self.y = normalizeY(self.y - (e.pageY - self.container.el.offset().top - self.y) * (self.scale/scale - 1));

						zoomTo(self.x, self.y, self.scale, 200, 'ease');
					});
				}

				// touch
				var init1 = null,
					init2 = null,
					initD = 0,
					initScale = null;

				$('.mapplic-map-image', self.map).on('touchstart', function(e) {
					e.preventDefault();
					var orig = e.originalEvent,
						touches = orig.touches.length;

					if (touches == 1) {
						self.touchTime = new Date().getTime();
						self.dragging = false;
						self.map.addClass('mapplic-dragging');

						s.stopMomentum();
						init1 = {
							x: orig.touches[0].pageX - self.x,
							y: orig.touches[0].pageY - self.y
						};

						mouse.x = normalizeX(orig.touches[0].pageX - init1.x);
						mouse.y = normalizeY(orig.touches[0].pageY - init1.y);
						momentumStep();

						self.map.on('touchmove', function(e) {
							e.preventDefault();
							self.dragging = true;

							var orig = e.originalEvent,
								touches = orig.touches.length;

							if (touches == 1) {
								mouse.x = normalizeX(orig.touches[0].pageX - init1.x);
								mouse.y = normalizeY(orig.touches[0].pageY - init1.y);
							}
						});

						$(document).on('touchend', function(e) {
							e.preventDefault();
							$(document).off('touchend');
							self.map.off('touchmove');
							self.map.removeClass('mapplic-dragging');
						});
					}
				});

				// pinch
				$('.mapplic-map-image', self.map).on('touchstart', function(e) {
					e.preventDefault();
					var orig = e.originalEvent,
						touches = orig.touches.length;

					if (touches == 2) {
						self.dragging = false;
						self.map.addClass('mapplic-dragging');

						s.stopMomentum();

						init1 = { x: orig.touches[0].pageX - self.x, y: orig.touches[0].pageY - self.y };
						init2 = { x: orig.touches[1].pageX - self.x, y: orig.touches[1].pageY - self.y };
						initD = Math.sqrt(Math.pow(init1.x - init2.x, 2) + Math.pow(init1.y - init2.y, 2));
						initScale = self.scale;

						self.map.off('touchmove');
						self.map.on('touchmove', function(e) {
							e.preventDefault();
							self.dragging = true;

							var orig = e.originalEvent,
								touches = orig.touches.length;

							var pos = {
								x: (orig.touches[0].pageX + orig.touches[1].pageX)/2,
								y: (orig.touches[0].pageY + orig.touches[1].pageY)/2
							}

							var dist = Math.sqrt(Math.pow(orig.touches[0].pageX - orig.touches[1].pageX, 2) + Math.pow(orig.touches[0].pageY - orig.touches[1].pageY, 2)) / initD;

							var scale = self.scale;
							self.scale = normalizeScale(initScale * dist);

							self.x = normalizeX(self.x - (pos.x  - self.container.el.offset().left - self.x) * (self.scale/scale - 1));
							self.y = normalizeY(self.y - (pos.y - self.container.el.offset().top - self.y) * (self.scale/scale - 1));

							zoomTo(self.x, self.y, self.scale, 0, 'ease');
						});

						$(document).on('touchend', function(e) {
							$(document).off('touchend');
							self.map.off('touchmove');
							self.map.removeClass('mapplic-dragging');
						});
					}
				});
			}
		}

		// functions
		var processData = function(data) {
			self.data = data;
			self.g = {};
			self.l = {};
			var shownLevel = null;

			// extend options
			self.o = $.extend(self.o, data);
			self.o.zoommargin = parseFloat(self.o.zoommargin);
			self.o.maxscale = parseFloat(self.o.maxscale);

			// height of container
			if (self.el.data('height')) self.o.height = self.el.data('height');

			self.contentWidth = parseFloat(data.mapwidth);
			self.contentHeight = parseFloat(data.mapheight);

			// create container
			self.container = new Container().init();
			self.levelselect = $('<select></select>').addClass('mapplic-levels-select');

			// create minimap
			if (self.o.minimap) self.minimap = new Minimap().init();

			// create legend
			self.legend = new Legend().init();
			self.legend.build(data.groups || data.categories);

			// create sidebar
			if (self.o.sidebar) {
				self.sidebar = new Sidebar();
				self.sidebar.init();
				self.sidebar.addCategories(data.groups || data.categories);
			}
			else self.container.el.css('width', '100%');

			// trigger event
			self.el.trigger('mapstart', self);

			// iterate through levels
			var levelnr = 0,
				toload = 0;

			if (data.levels) {
				$.each(data.levels, function(index, level) {
					var source = level.map,
						extension = source.substr((source.lastIndexOf('.') + 1)).toLowerCase();

					// new map layer
					var layer = $('<div></div>').addClass('mapplic-layer').attr('data-floor', level.id).hide().appendTo(self.map);
					switch (extension) {

						// image formats
						case 'jpg': case 'jpeg': case 'png': case 'gif':
							$('<img>').attr('src', source).addClass('mapplic-map-image').appendTo(layer);
							self.addLocations(level.locations, level.id);
							break;

						// vector format
						case 'svg':
							toload++;
							$('<div></div>').addClass('mapplic-map-image').load(source, function() {
								self.addLocations(level.locations, level.id);

								// click event
								$(self.o.selector, this).on('click touchend', function() {
									var elapsed = new Date().getTime() - self.touchTime;
									if (!self.dragging || (navigator.userAgent.toLowerCase().indexOf('android') > -1 && elapsed < 130)) self.showLocation($(this).attr('id'), 600);
								});

								// autopopulate
								if (self.o.autopopulate) {
									var ap = [];
									$(self.o.selector, this).each(function() {
										var id = $(this).attr('id'),
											location = self.l[id];

										if (!location) {
											location = {
												id: id,
												title: id.charAt(0).toUpperCase() + id.slice(1),
												pin: 'hidden'
											};
											ap.push(location);
										}
									});
									self.addLocations(ap, level.id);
								}

								// backward compatibility - legacy format
								$('svg a', this).each(function() {
									var location = self.l[$(this).attr('xlink:href').substr(1)]; 
									if (location) {
										$(this).attr('class', 'mapplic-clickable');
										location.el = $(this);
									}
								});

								$('svg a', this).click(function(e) {
									var id = $(this).attr('xlink:href').substr(1);
									self.showLocation(id, 600);
									e.preventDefault();
								});

								if (self.deeplinking) self.deeplinking.check(0);

								// trigger event(s)
								self.el.trigger('svgloaded', [this, level.id]);
								toload--;
								if (toload == 0) mapReady();
							}).appendTo(layer);
							break;

						// others 
						default:
							alert('File type ' + extension + ' is not supported!');
					}

					// create new minimap layer
					if (self.minimap) self.minimap.addLayer(level);

					// build layer control
					self.levelselect.prepend($('<option></option>').attr('value', level.id).text(level.title));

					// shown level
					if (!shownLevel || level.show)	shownLevel = level.id;

					levelnr++;
				});
			}

			// COMPONENTS
			self.tooltip = new Tooltip().init();
			if (self.o.lightbox && $.magnificPopup) self.lightbox = new Lightbox().init();
			if (self.o.hovertip) self.hovertip = new HoverTooltip().init();
			if (self.o.clearbutton) self.clearbutton = new ClearButton().init();
			if (self.o.zoombuttons) self.zoombuttons = new ZoomButtons().init();
			if (self.o.fullscreen) self.fullscreen = new Fullscreen().init();
			if (self.o.developer) self.devtools = new DevTools().init();

			// level switcher
			if (levelnr > 1) {
				self.levels = $('<div></div>').addClass('mapplic-levels');
				var up = $('<a href="#"></a>').addClass('mapplic-levels-up').appendTo(self.levels);
				self.levelselect.appendTo(self.levels);
				var down = $('<a href="#"></a>').addClass('mapplic-levels-down').appendTo(self.levels);
				self.container.el.append(self.levels);
			
				self.levelselect.change(function() {
					var value = $(this).val();
					self.switchLevel(value);
				});
			
				up.click(function(e) {
					e.preventDefault();
					if (!$(this).hasClass('mapplic-disabled')) self.switchLevel('+');
				});

				down.click(function(e) {
					e.preventDefault();
					if (!$(this).hasClass('mapplic-disabled')) self.switchLevel('-');
				});
			}
			self.switchLevel(shownLevel);

			if (self.o.portrait === 'true') self.o.portrait = true;

			// browser resize
			$(window).resize(function() {

				if (self.o.portrait == true || $.isNumeric(self.o.portrait) && $(window).width() < parseFloat(self.o.portrait)) {
					self.el.addClass('mapplic-portrait');
					if (self.el.hasClass('mapplic-fullscreen')) self.container.el.height($(window).height());
					else {
						var height = Math.min(Math.max(self.container.el.width() * self.contentHeight / self.contentWidth, $(window).height() * 2/3), $(window).height() - 66); 
						self.container.el.height(height);
					}
				}
				else {
					self.el.removeClass('mapplic-portrait');
					self.container.el.height('100%');
					self.el.height(self.container.calcHeight(self.o.height));
				}

				var wr = self.container.el.width() / self.contentWidth,
					hr = self.container.el.height() / self.contentHeight;

				if (self.o.mapfill) {
					if (wr > hr) self.fitscale = wr;
					else self.fitscale = hr;
				}
				else {
					if (wr < hr) self.fitscale = wr;
					else self.fitscale = hr;
				}

				if (self.container.oldW != self.container.el.width() || self.container.oldH != self.container.el.height()) {

					self.container.oldW = self.container.el.width();
					self.container.oldH = self.container.el.height();

					self.container.resetZoom();
					self.tooltip.limitSize();
				}
			}).resize();

			// deeplinking
			if (self.o.deeplinking) {
				if (history.pushState && (typeof URL == 'function')) self.deeplinking = new Deeplinking();
				else self.deeplinking = new DeeplinkingHash();

				self.deeplinking.init();
			}

			// trigger event
			if (toload == 0) mapReady();

			// controls
			if (self.o.zoom) self.container.addControls();

			// external link to locations
			$(document).on('click', '.mapplic-location', function(e) {
				e.preventDefault();
				self.showLocation($(this).attr('href').substr(1), 400);
				$('html, body').animate({ scrollTop: self.container.el.offset().top }, 400);
			});
		}

		var mapReady = function() {
			// trigger event
			self.el.trigger('mapready', self);

			// alphabetic sort
			if (self.o.alphabetic && self.sidebar) self.sidebar.sort();

			// apply toggle
			self.legend.applyToggles();

			// CSV support
			if (self.o.csv) { 
				Papa.parse(self.o.csv, {
					header: true,
					download: true,
					encoding: "UTF-8",
					skipEmptyLines: true,
					complete: function(results, file) {
						self.addLocations(results.data);
					}
				});
			}

			self.container.resetZoom();
			if (self.deeplinking) self.deeplinking.check(0);

			// landmark mode
			if (self.el.data('landmark')) self.o.landmark = self.el.data('landmark');
			if (self.o.landmark) {
				// Custom settings
				self.o.sidebar = false;
				self.o.zoombuttons = false;
				self.o.deeplinking = false;
				self.showLocation(self.o.landmark, 0);
			}
		}

		/* PRIVATE METHODS */

		// Web Mercator (EPSG:3857) lat/lng projection
		var latlngToPos = function(lat, lng) {
			var deltaLng = self.data.rightLng - self.data.leftLng,
				bottomLatDegree = self.data.bottomLat * Math.PI / 180,
				mapWidth = ((self.data.mapwidth / deltaLng) * 360) / (2 * Math.PI),
				mapOffsetY = (mapWidth / 2 * Math.log((1 + Math.sin(bottomLatDegree)) / (1 - Math.sin(bottomLatDegree))));

			lat = lat * Math.PI / 180;

			return {
				x: ((lng - self.data.leftLng) * (self.data.mapwidth / deltaLng)) / self.data.mapwidth,
				y: (self.data.mapheight - ((mapWidth / 2 * Math.log((1 + Math.sin(lat)) / (1 - Math.sin(lat)))) - mapOffsetY)) / self.data.mapheight
			};
		}

		var estimatedPosition = function(element) {
			if (!element || !(element[0] instanceof SVGElement)) return false;

			var	bbox = element[0].getBBox();
			var	padding = 40,
				wr = self.container.el.width() / (bbox.width + padding),
				hr = self.container.el.height() / (bbox.height + padding);

			return {
				x: (bbox.x + bbox.width/2) / self.contentWidth,
				y: (bbox.y + bbox.height/2) / self.contentHeight,
				scale: Math.min(wr, hr)
			}
		}

		var bboxZoom = function(element) {
			var pos = estimatedPosition(element);
			if (!pos) return false;

			self.moveTo(pos.x, pos.y, pos.scale, 600);
			return true;
		}

		var getColor = function(location) {
			var groups = false;
			if (location.category) groups = location.category.toString().split(',');

			if (location.fill) return location.fill;
			else if (self.g[groups[0]] && self.g[groups[0]].color) return self.g[groups[0]].color;
			else if (self.o.fillcolor) return self.o.fillcolor;
			else return false;
		}

		// normalizing x, y and scale
		var normalizeX = function(x) {
			var minX = (self.container.el.width() - self.contentWidth * self.scale).toFixed(4);
			if (minX < 0) {
				if (x > self.o.zoommargin) x = self.o.zoommargin;
				else if (x < minX - self.o.zoommargin) x = minX - self.o.zoommargin;
			}
			else x = minX/2;

			return x;
		}

		var normalizeY = function(y) {
			var minY = (self.container.el.height() - self.contentHeight * self.scale).toFixed(4);
			if (minY < 0) {
				if (y > self.o.zoommargin) y = self.o.zoommargin;
				else if (y < minY - self.o.zoommargin) y = minY - self.o.zoommargin;
			}
			else y = minY/2;

			return y;
		}

		var normalizeScale = function(scale) {
			if (scale <= self.fitscale) scale = self.fitscale;
			else if (scale > self.o.maxscale) scale = self.o.maxscale;

			// zoom timeout
			clearTimeout(self.zoomTimeout);
			self.zoomTimeout = setTimeout(function() {
				if (self.zoombuttons) self.zoombuttons.update(scale);
				if (self.clearbutton) self.clearbutton.update(scale);
				if (scale == self.fitscale) {
					self.container.coverAll();
					if (self.o.closezoomout) self.hideLocation();
				}
				self.container.revealZoom(scale);
			}, 200);

			return scale;
		}

		var zoomTo = function(x, y, scale, d) {
			d = typeof d !== 'undefined' ? d/1000 : 0;

			self.map.css({
				'transition': 'transform ' + d + 's',
				'transform': 'translate(' + x.toFixed(3) + 'px ,' + y.toFixed(3) + 'px) scale(' + self.scale.toFixed(3) + ')'
			});

			if (scale) {
				$('.mapplic-pin', self.map).css({
					'transition': 'opacity 0.2s, transform ' + d + 's',
					'transform': 'scale(' + 1/self.scale + ')' /*translateZ(0)*/
				});

				$('.mapplic-tooltip', self.map).css({
					'transition': 'transform ' + 0.3 + 's',
					'transform': 'scale(' + 1/self.scale + ') translate(-50%, -100%)' /*translateZ(0)*/
				});
			}

			if (self.minimap) self.minimap.update(x, y);

			// trigger event
			self.el.trigger('positionchanged', location);
		}

		/* PUBLIC METHODS */
		self.switchLevel = function(target) {
			switch (target) {
				case '+':
					target = $('option:selected', self.levelselect).removeAttr('selected').prev().prop('selected', 'selected').val();
					break;
				case '-':
					target = $('option:selected', self.levelselect).removeAttr('selected').next().prop('selected', 'selected').val();
					break;
				default:
					$('option[value="' + target + '"]', self.levelselect).prop('selected', 'selected');
			}

			// no such layer
			if (!target) return;

			var layer = $('.mapplic-layer[data-floor="' + target + '"]', self.el);

			// target layer is already active
			if (layer.is(':visible')) return;

			// hide Tooltip
			if (self.tooltip) self.tooltip.hide();

			// show target layer
			$('.mapplic-layer:visible', self.map).hide();
			layer.show();

			// show target minimap layer
			if (self.minimap) self.minimap.show(target);

			// update control
			var index = self.levelselect.get(0).selectedIndex,
				up = $('.mapplic-levels-up', self.el),
				down = $('.mapplic-levels-down', self.el);

			up.removeClass('mapplic-disabled');
			down.removeClass('mapplic-disabled');
			if (index == 0) up.addClass('mapplic-disabled');
			else if (index == self.levelselect.get(0).length - 1) down.addClass('mapplic-disabled');

			// trigger event
			self.el.trigger('levelswitched', target);
		}

		self.moveTo = function(x, y, s, duration, ry) {
			duration = typeof duration !== 'undefined' ? duration : 400;
			ry = typeof ry !== 'undefined' ? ry : 0.5;
			s = typeof s !== 'undefined' ? s : self.scale/self.fitscale;

			self.container.stopMomentum();

			self.scale = normalizeScale(s);
			self.x = normalizeX(self.container.el.width() * 0.5 - self.scale * self.contentWidth * x);
			self.y = normalizeY(self.container.el.height() * ry - self.scale * self.contentHeight * y);

			zoomTo(self.x, self.y, self.scale, duration);
		}

		self.addLocations = function(locations, levelid) {
			$.each(locations, function(index, location) {

				if (!location.level) {
					if (levelid) location.level = levelid;
					else location.level = self.data.levels[0].id;
				}

				// building the location object
				self.l[location.id] = location;

				// interactive element
				var elem = $('[id^=landmark] > *[id="' + location.id + '"]', self.map);
				if (elem.length > 0) {
					elem.attr('class', 'mapplic-clickable');
					location.el = elem;

					var fill = null;
					if (location.fill) fill = location.fill;
					else if (self.o.fillcolor) fill = self.o.fillcolor

					if (fill) {
						elem.css('fill', fill);
						$('> *', elem).css('fill', fill);
					}
				}

				// geolocation
				if (location.lat && location.lng) {
					var pos = latlngToPos(location.lat, location.lng);
					location.x = pos.x;
					location.y = pos.y;
				}

				// estimated position
				if ((!location.x || !location.y) && elem) {
					var pos = estimatedPosition(location.el);
					location.x = pos.x;
					location.y = pos.y;
				}

				// marker
				if (!location.pin) location.pin = self.o.marker;
				if (location.pin.indexOf('hidden') == -1) {
					var level = $('.mapplic-layer[data-floor=' + location.level + ']', self.el);
					var pin = $('<a></a>').attr('href', '#').addClass('mapplic-pin').css({'top': (location.y * 100) + '%', 'left': (location.x * 100) + '%'}).appendTo(level);
					pin.on('click touchend', function(e) {
						e.preventDefault();
						self.showLocation(location.id, 600);
					});
					if (location.label) $('<span><span>' + location.label + '</span></span>').appendTo(pin);
					if (location.fill) pin.css({'background-color': location.fill, 'border-color': location.fill});
					if (location.pin.indexOf('pin-image') > -1) pin.css('background-image', 'url(' + location.thumbnail + ')');
					if (location.reveal) pin.attr('data-reveal', location.reveal).hide();
					if (location.category) {
						location.category = location.category.toString();
						pin.attr('data-category', location.category);
					}
					pin.attr('data-location', location.id);

					location.el = pin;
				}
				if (location.el) location.el.addClass(location.pin.replace('hidden', ''));

				// reveal mode
				if (location.action == 'reveal') $('.mapplic-pin[data-location^=' + location.id + ']', self.map).hide();

				// add to sidebar
				if (self.sidebar && location.action != 'disabled' && !(location.hide == 'true' || location.hide == true)) location.list = self.sidebar.addLocation(location);
			});

			if (self.sidebar) self.sidebar.countCategory();
		}

		self.getLocationData = function(id) {
			return self.l[id];
		}

		self.showLocation = function(id, duration, check) {
			var location = self.location = self.l[id];
			if (!location) return false;

			var action = (location.action && location.action != 'default') ? location.action : self.o.action;
			if (action == 'disabled') return false;

			switch (action) {
				case 'open-link':
					window.location.href = location.link;
					return false;
				case 'open-link-new-tab':
					window.open(location.link);
					self.location = null;
					return false;
				case 'select':
					if (location.el) {
						if (location.el.hasClass('mapplic-active')) {
							location.el.removeClass('mapplic-active');
							if (location.list) location.list.removeClass('mapplic-active');
						}
						else {
							location.el.addClass('mapplic-active');
							if (location.list) location.list.addClass('mapplic-active');
						}
					}
					return false;
				case 'none':
					var zoom = location.zoom ? parseFloat(location.zoom) : self.o.maxscale;
					self.hideLocation();
					self.switchLevel(location.level);
					bboxZoom(location.el);
					break;
				case 'reveal':
					var zoom = location.zoom ? parseFloat(location.zoom) : self.o.maxscale;
					self.hideLocation();
					self.switchLevel(location.level);
					self.container.revealChild(location);
					if (self.o.zoom) bboxZoom(location.el); 
					break;
				case 'lightbox':
					self.switchLevel(location.level);
					self.lightbox.show(location);
					break;
				case 'image':
					self.switchLevel(location.level);
					self.lightbox.showImage(location);
					break;
				default:
					self.switchLevel(location.level);
					self.tooltip.show(location);
			}

			// active state
			$('.mapplic-active', self.el).removeClass('mapplic-active');
			if (location.el) location.el.addClass('mapplic-active');
			if (location.list) location.list.addClass('mapplic-active');

			// deeplinking
			if ((self.deeplinking) && (!check)) self.deeplinking.update(id);

			// trigger event
			self.el.trigger('locationopened', location);
		}

		self.hideLocation = function() {
			$('.mapplic-active', self.el).removeClass('mapplic-active');
			if (self.deeplinking) self.deeplinking.clear();
			if (self.tooltip) self.tooltip.hide();
			self.location = null;

			// trigger event
			self.el.trigger('locationclosed');
		}

		self.updateLocation = function(id) {
			var location = self.l[id];

			if ((location.id == id) && (location.el.is('a')))  {
				// Geolocation
				if (location.lat && location.lng) {
					var pos = latlngToPos(location.lat, location.lng);
					location.x = pos.x;
					location.y = pos.y;
				}
				
				var top = location.y * 100,
					left = location.x * 100;
				location.el.css({'top': top + '%', 'left': left + '%'});
			}
		}

	};

	// jQuery plugin
	$.fn.mapplic = function(options) {

		return this.each(function() {
			var element = $(this);

			// plugin already initiated on element
			if (element.data('mapplic')) return;

			var instance = (new Mapplic(element)).init(options);

			// store plugin object in element's data
			element.data('mapplic', instance);
		});
	};

})(jQuery);

// call plugin on map instances
jQuery(document).ready(function($) {
	$('[id^=mapplic-id]').mapplic();
});