/*
Last update: 2013-2-17
*/

/*
A shortcut to console.log
*/
function say(input) {
	console.log(input);
}

(function(window, jQuery) {
	var $ = jQuery;
	
	/*
	Returns the library with the given selection saved to it, so that we can work with that
	selection when executing other functions in the Odf library.
	
	@param string jquery_selector
		The string that is used by jQuery to create a selection, e.g. "div#container".
	*/
	function Odf(jquery_selector) {
		if(!$(jquery_selector).length) {
			console.log('Error: target (' + jquery_selector + ') not found.');
			return false;
		}
		else {
			return new Odf.prototype.select(jquery_selector);
		}
	}
	
	
	
	// Define the Odf library's functions.
	Odf.prototype = {
	
		/*
		Saves the given selection to the object so that we can work with it later on. This function
		is executed when the Odf() function is executed and is returned as an object containing
		the Odf prototype.
	
		@param string jquery_selector
			The string that is used by jQuery to create a selection, e.g. "div#container".
		*/
		select: function(jquery_selector) {
			Odf.selection = $(jquery_selector);
			this.length = Odf.selection.length;
		},
	
		
		settings: {
			loading_image: 'img/loading.gif',
			loading_image_big: 'img/loading_big.gif',
			loading_image_black_bg: 'img/loading_black_bg.gif',
			loading_image_black_bg_big: 'img/loading_black_bg_big.gif'
		},
		
		
		/*
		Sets a var in this.settings, which can be retrieved through this.get() in any function
		you'd like. I'd rather have a function for this than calling this.settings.varname all the 
		time :).
		
		@param string key
			The key for which to set the value.
		@param mixed value
			The value to store.
		@return nothing
		*/
		set: function(key, value) {
			Odf.settings[key] = value;
		},
		
		
		/*
		Returns a var from Odf.settings.
		
		@param string key
			The key of which to retrieve the value.
		@return mixed
			The value of the requested key.
		*/
		get: function(key) {
			return Odf.settings[key];
		},
		
		
		/*
		Initiates the ODF library, enabling stuff like AJAX functionality for forms with the
		"odf_ajax" class.
		*/
		init: function() {
			// Ready href class elements.
			$('.odf_href').click(function() {
				var href = $(this).data('href');
				window.location.href = href;
			});
			
			// Ready <tr> hovers.
			$('.odf_hover').hover(function() {
				$(this).addClass('hovered');
			},
			function() {
				$(this).removeClass('hovered');
			});
			
			// Ready forms.
			$('form.odf_ajax').each(function() {
				$(this).on('submit', function() {
					Odf.ajax.submit.call(this);
					return false;
				});
			});
		},
		
		
		/***********************************************************************
		AJAX functionalities
		*/
		
		ajax: {
			
			/*
			Sets a target to load AJAX results in that are returned by Odf's AJAX functions.
			
			@param string selector
				The jQuery selector for the target. E.g. 'div#ajax_target'.
			@return none
			*/
			setTarget: function(selector) {
				this.selectors.ajax_target = $(selector);
			},
			
			
			/*
			Returns the target previously set by this.setTarget() as jQuery object.
			
			@return object
				The target as jQuery object.
			*/
			getTarget: function() {
				var r = $(this.selectors.ajax_target);
				return r;
			},
			
			
			/*
			Sets the HTML to be parsed by other AJAX functions.
			
			@param object html
				The object used in jQuery's $.ajax() function, in its. success(html) function.
			@return none
			*/
			setHtml: function(html) {
				Odf.set('html', html);
			},
			
			
			/*
			Returns the value of a hidden return <input> from the HTML that was set by this.setHtml().
			
			@param string return_name
				The name of the hidden return input to get the status from. These inputs must be
				have the "odf_return_" prefix.
			@return string
				The value of the targeted hidden <input>.
			*/
			getReturn: function(return_name) {
				html = Odf.get('html');
				
				// Parse the HTML.
				html = $.parseHTML(html);
				
				// Contain the HTML in an invisible <div> so that we can search through it.
				var div = $('<div></div>');
				div.html(html);
				
				// Get the return status.
				var status = div.find('input[name=odf_return_' + return_name + ']').val();
				
				return status;
			},
			
			
			/*
			Removes the hidden return <inputs> in the HTML set by this.setHtml().
			
			@return object
				The HTML object without the hidden return <input>s.
			*/
			removeReturns: function() {
				html = Odf.get('html');
				
				// Parse the HTML.
				// html = $.parseHTML(html);
				
				// Contain the HTML in an invisible <div> so that we can search through it.
				var div = $('<div></div>');
				div.html(html);
				
				// Remove the return status from the returned HTML.
				div.find('input[name^=odf_return_]').remove();
				
				// Remove the container <div> as we're done searching the returned HTML.
				html = div.html();
				
				return html;
			},
			
			/*
			Create a custom XMLHttpRequest object.
			
			@return object
				Returns a custom XMLHttpRequest object.
			*/
			createXhr: function() {
				var xhr = new window.XMLHttpRequest();
				
				// Upload progress
				xhr.upload.addEventListener('progress', function(e) {
					if(e.lengthComputable) {
						var progress_percentage = Math.ceil((e.loaded / e.total) * 100);
						$('span#progress_percentage').html(progress_percentage + ' %');
					}
				}, false);
				
				// Download progress
				xhr.addEventListener('progress', function(e) {
					if(e.lengthComputable) {
						var progress_percentage = Math.ceil((e.loaded / e.total) * 100);
					}
				}, false);
				
				return xhr;
			},

			removeLoadingImage: function(loading_image_id) {
				if(loading_image_id) {
					$('img#' + loading_image_id).remove();
				}
				else {
					$('img.odf_loading_image').remove();
				}
			},
			
			
			/*
			Submits a form through AJAX.
			
			[@param object odf_return_status_functions]
				Contains a function to execute for each status that is returned in the $.ajax()'s
				success() function. E.g. { success: function() { ... } }
			[@param bool use_toggle_instead_of_slide]
				If set to true, the function will not use an animation to display the results of the
				action.
			*/
			submit: function(odf_return_status_functions, use_toggle_instead_of_slide) {
				var self = $(this); // The form that was submitted.
				
				if(self[0].tagName.toLowerCase() != 'form') {
					console.log('Error: cannot submit a non-form.');
					return false;
				}
				
				var action = self.attr('action');
				var method = self.attr('method');
				var target = $('div#' + self.data('target'));
				
				$.ajax({
					url: action,
					type: method.toUpperCase(),
					data: self.serialize(),
					beforeSend: function() {
						// Remove any existing loading images.
						Odf.ajax.removeLoadingImage();
					
						// #
						// # Display loading image.
						// #
							
							var img = $('<img src="' + Odf.get('loading_image') + '" class="odf_loading_image">');
							var submit_button = self.find('input[type=submit]:first');
							
							if(!submit_button.length) {
								if(self.data('submit_button_id'))
									submit_button = $('input#' + self.data('submit_button_id'));
								else
									submit_button = $('input[type=submit]:last');
							}
							
							var offset = submit_button.offset();
							
							// Display the loading image.
							$('body').prepend(img);
							img = $('img.odf_loading_image:first');
							
							
							// Offset top
							if(submit_button.height() > img.height()) {
								var additional_offset_top = (submit_button.height() - img.height()) / 2;
							}
							else {
								var additional_offset_top = (img.height() - submit_button.height()) / 2;
							}
							
							var offset_top = offset.top + additional_offset_top
							
							
							// Offset left
							var additional_offset_left = parseInt(submit_button.css('padding-left')) + parseInt(submit_button.css('padding-right'));
							
							if(self.hasClass('odf_loading_image_left')) {
								//* The loading image is to be displayed to the left of the submit button.
								var offset_left = offset.left - img.width() - 10;
							}
							else {
								//* The loading image is to be displayed to the right of the submit button.
								var offset_left = offset.left + submit_button.width() + additional_offset_left + 10;
							}
							
							img.css({
								position: 'absolute',
								top: offset_top,
								left: offset_left,
								'z-index': 100
							});
						
						// # --/
						
					},
					success: function(html) {
						Odf.ajax.removeLoadingImage();
						Odf.ajax.setHtml(html);
						var slide_speed = 300;
						
						
						// Do we have to execute a redirect?
						var redirect = Odf.ajax.getReturn('redirect');
						
						if(redirect) {
							window.location.href = redirect;
							console.log('redirect');
							return;
						}
						
						
						// Have special return status functions been given? E.g. if a "success" return
						// status should produce a different result as a "error" return status.
						if(odf_return_status_functions) {
							var status = Odf.ajax.getReturn('status');
							var function_to_execute = odf_return_status_functions[status];
							
							// Has a custom function to execute been given?
							if(function_to_execute) {
								var r = function_to_execute(html);
								
								// If the function to execute returns false, this is a special sign
								// to not execute any more default functionality.
								if(r === false)
									return;
							}
							
							var html = Odf.ajax.removeReturns();
						}
						
						
						// Display return HTML.
						if(target && use_toggle_instead_of_slide) {
							target.html(html).show();
						}
						else if(target) {
						
							if(target.is(':hidden')) {
								target.stop().html(html).slideToggle(slide_speed);
							}
							else {
								// Wrap the contents of the target, so that we won't have to change
								// the target's height during the sliding, so that the page height
								// will remain unchanged.
								target.wrapInner('<div id="odf_tmp_ajax_wrapper"></div>');
								var fake_target = $('div#odf_tmp_ajax_wrapper');
								
								
								// Make sure the container will keep the same height, so that the 
								// sliding won't affect the page's height.
								var current_height = target.height();
								target.height(current_height);
								
								fake_target.stop().slideToggle(slide_speed, function() {
									// Set the target's content.
									$(this).stop().html(html);
									
									// Get the content's new height witout revealing the element.
									$(this).show();
									var new_height = $(this).height();
									$(this).hide();
									
									// If there is a height difference, make sure the container
									// takes on a new height.
									if(new_height != current_height) {
										target.animate({
											height: new_height
										});
									}
									
									// Show the content.
									$(this).slideToggle(slide_speed, function() {
										fake_target.remove();
										var contents = fake_target.html();
										target.html(contents);
									});
								});
							}
							
							// Make sure the displayed message is seen by scrolling to it if it is not
							// in the current view.
							var message_offset_top = target.offset().top;
							
							if(message_offset_top < $(window).scrollTop()) {
								var new_scroll_top = message_offset_top - 10;
								new_scroll_top = new_scroll_top < 0 ? 0 : new_scroll_top;
								
								$('html, body').animate({
									scrollTop: new_scroll_top
								});
							}
						}
					},
					error: function(error) {
						alert('Ouch, something has gone terribly, terribly wrong.. The requested page could not be found or loaded :\\.');
						console.log(error.statusText);
					}
				});
				
				return false;
			},
			
			
			/*
			Loads a specific file through AJAX using GET. Creates a neat loading overlay in the
			process.
			
			@param str url
				The URL to load.
			@param str target_element_selector
				The selector of the element in which to load the results. E.g. div#div_id.
			[@param obj data]
				Data to pass to the file that is loaded. E.g. { name: 'Stephan' }.
			*/
			get: function(url, target_element_selector, data) {
				Odf.ajax.load(url, target_element_selector, data, 'get');
			},
			
			/*
			Loads a specific file through AJAX using POST. Creates a neat loading overlay in the
			process.
			
			@param str url
				The URL to load.
			@param str target_element_selector
				The selector of the element in which to load the results. E.g. div#div_id.
			[@param obj data]
				Data to pass to the file that is loaded. E.g. { name: 'Stephan' }.
			*/
			post: function(url, target_element_selector, data) {
				Odf.ajax.load(url, target_element_selector, data, 'post');
			},
			
			/*
			Loads a specific file through AJAX. Creates a neat loading overlay in the process.
			
			@param str url
				The URL to load.
			@param str target_element_selector
				The selector of the element in which to load the results. E.g. div#div_id.
			[@param obj data]
				Data to pass to the file that is loaded. E.g. { name: 'Stephan' }.
			*/
			load: function(url, target_element_selector, data, type) {
				switch(type) {
					default:
						console.log('Error: invalid type (' + type + ').');
						break;
					
					case 'post':
					case 'get':
						break;
				}
				
				var selection = Odf(target_element_selector);
				if(!selection.length) {
					console.log('Warning: selection could not be made with ' + target_element_selector);
					return false;
				}
				
				$.ajax({
					url: url,
					type: type,
					data: data,
					beforeSend: function() {
						Odf(target_element_selector).removeLoadingOverlay();
						Odf(target_element_selector).createLoadingOverlay();
					},
					success: function(html) {
						Odf(target_element_selector).removeLoadingOverlay();
						$(target_element_selector).html(html);
					},
					error: function(error) {
						Odf(target_element_selector).removeLoadingOverlay();
						alert('Error: ' + error.statusText);
					}
				});
			},
		
			/*
			W.I.P.!
			
			Calls to the file specified in results_url for search results based on what has been
			typed in element. This file must return JSON.
			
			@parameter string|object options
				If string:
					The url to the file that will return the search results. This file must return
					JSON.
				If object:
					An object containing the options for this function:
					@key string results_url
						The url to the file that will return the search results. This file must return
						JSON.
					[@key int min_length]
						The minimum number of characters that must have been typed before the
						search is triggered.
			*/
			autoComplete: function(options) {
				var selection = Odf.selection;
				var min_length = 3;
				
				console.log(selection);
				
				if(typeof options == 'string') {
					var results_url = options;
				}
				else if(typeof options == 'object') {
					var results_url = options.results_url;
					min_length = options.min_length || min_length;
				}
				
				
				// We require a results url.
				if(!results_url)
					return false;
				
				
				selection.each(function() {
					$(this).blur(function() {
						// alert('a');
						$('div#odf_autocomplete_results').remove();
					});
					
					$(this).keyup(function() {
						var self = $(this);
						var value = $.trim(self.val());
						
						if(value.length < min_length)
							return;
						
						$.ajax({
							type: 'POST',
							data: { search: value },
							url: results_url,
							beforeSend: function() {
								// Show loading image next to self.
								$('body').prepend('<img src="' + Odf.get('loading_image') + '" class="odf_loading_image">');
								
								$('body img.odf_loading_image:first').css({
									position: 'absolute',
									top: Math.round(
										self.offset().top
										- (self.outerHeight() / 4)
									),
									left: Math.round(
										self.offset().left
										+ self.outerWidth()
										+ 10
									),
									'z-index': 100
								});
								
								
							},
							success: function(html) {
								Odf.ajax.removeLoadingImage();
								
								// Remove any existing results.
								$('div#odf_autocomplete_results').remove();
								
								// Wrap self in a container.
								self.wrap('<div id="odf_autocomplete_container"></div>');
								var container = $('div#odf_autocomplete_container');
								
								// Create results <div>.
								container.append('<div id="odf_autocomplete_results"></div>');
								var div = $('div#odf_autocomplete_results');
								
								div.css({
									width: self.width(),
									top: self.outerHeight(),
									'z-index': 100
								});
								
								
								if(!html) {
									div.html('<p>' + Odf.lang('no_results_found') + '</p>');
								}
								else {
									// Parse JSON.
									var json = $.parseJSON(html);
									console.log(json);
								}
								
								// Make sure focus isn't lost, which is/was somehow happening.
								self.focus();
							}
						});
					});
				});
			}
			
		},
		
		
		/***********************************************************************
		Language functions.
		*/
		
		/*
		Returns the translation with the given key.
		
		@param str key
			The key for which to return the translation.
		*/
		translate: function(key) {
			var language = Odf.get('language');
			
			if(odf_translations[language][key]) {
				return odf_translations[language][key];
			}
			else {
				console.log('No translation found for key ' + key + ' in language ' + language + '.');
				return false;
			}
		},
		
		
		/***********************************************************************
		Utility functions
		*/
		
		utility: {},
		
		
		/***********************************************************************
		Other/general functionalities
		*/
		
		
		/*
		Creates a loading overlay in the ODF selection (Odf(selector)).
		*/
		createLoadingOverlay: function() {
			var selection = Odf.selection;
			if(!selection.length) {
				console.log('Error: no selection.');
				return false;
			}
			
			selection = selection.first();
			
			var div = $('<div></div>');
			div.prependTo(selection);
			div.addClass('odf_loading_overlay');
			div.css({
				position: 'absolute',
				width: selection.innerWidth(),
				height: selection.innerHeight(),
				'background-color': '#000',
				opacity: 0.33,
				'-moz-opacity': 0.33
			});
			
			var loading_image = $('<img src="' + Odf.get('loading_image_black_bg_big') + '" class="odf_loading_image">');
			loading_image.prependTo(div);
			loading_image.css({
				position: 'absolute',
				top: (div.outerHeight() / 2) - (loading_image.height() / 2),
				left: (div.outerWidth() / 2) - (loading_image.width() / 2)
			});
		},
		
		/*
		Removes the loading overlay from the ODF selection (Odf(selector)).
		*/
		removeLoadingOverlay: function() {
			var selection = Odf.selection;
			if(!selection.length) {
				console.log('Error: no selection.');
				return false;
			}
			
			selection = selection.first();
			selection.find('div.odf_loading_overlay').remove();
		},
		
		/*
		Sets the text cursor position or creates a selection range.
		
		@this
			The element in which the range is to be created.
		*/
		setTextCursorPosition: function(start_position, end_position) {
			self = $(this);
			
			if(!self)
				return false;

			if(self.createTextRange) {
				var textRange = self.createTextRange();
				textRange.collapse(true);
				textRange.moveStart(start_position);
				textRange.moveEnd(end_position);
				textRange.select();
				return true;
			}
			else if(self.setSelectionRange) {
				self.setSelectionRange(start_position, end_position);
				return true;
			}

			return false;
		},

		/*
		Checks if the number of characters that are being typed in an element do not
		exceed the maximum number of allowed characters.
		
		@this
			The element in which is being typed.
		@param int max_length
			The maximum number of characters that may be typed in the element.
		*/
		checkLength: function(max_length) {
			var self = $(this), // The textarea that was typed in.
				length = self.val().length;
			
			if(length >= max_length) {
				self.val(self.val().substr(0, max_length));
				$('#textarea_length').html('2000 / ' + max_length);
				return false;
			}
			
			$('#textarea_length').html(length + ' / ' + max_length);
		}
	};
	
	// Make sure the prototype's functions are also directly available.
	for(var key in Odf.prototype) {
		Odf[key] = Odf.prototype[key];
	}
	
	// Make sure the Odf prototype's functions are available to the object that is returned when
	// the Odf() function is called.
	Odf.prototype.select.prototype = Odf.prototype;
	
	
	// Make the Odf library globally available.
	window.Odf = Odf;
	
})(window, jQuery);