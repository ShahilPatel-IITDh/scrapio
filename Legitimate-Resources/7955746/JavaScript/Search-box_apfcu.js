(function ($) {
	var init = function () {
		var searchBoxIdFields = $('[data-sf-role="searchTextBoxId"]');

		for (var i = 0; i < searchBoxIdFields.length; i++) {
			var searchBoxIdField = $(searchBoxIdFields[i]);
			var controlServerData = {
				resultsUrl: searchBoxIdField.siblings('[data-sf-role="resultsUrl"]').first().val(),
				indexCatalogue: searchBoxIdField.siblings('[data-sf-role="indexCatalogue"]').first().val(),
				wordsMode: searchBoxIdField.siblings('[data-sf-role="wordsMode"]').first().val(),
				disableSuggestions: $.parseJSON(searchBoxIdField.siblings('[data-sf-role="disableSuggestions"]').first().val()),
				minSuggestionLength: searchBoxIdField.siblings('[data-sf-role="minSuggestionLength"]').first().val(),
				suggestionFields: searchBoxIdField.siblings('[data-sf-role="suggestionFields"]').first().val(),
				language: searchBoxIdField.siblings('[data-sf-role="language"]').first().val(),
				siteId: searchBoxIdField.siblings('[data-sf-role="siteId"]').first().val(),
				suggestionsRoute: searchBoxIdField.siblings('[data-sf-role="suggestionsRoute"]').first().val(),
				searchTextBoxSelector: searchBoxIdField.val(),
				searchButtonSelector: searchBoxIdField.siblings('[data-sf-role="searchButtonId"]').first().val(),
				scoringSettingsSelector: searchBoxIdField.siblings('[data-sf-role="scoringSettings"]').first().val(),
			};
			featherSearchBoxWidget(controlServerData);
		}
		//function after selection
		function featherSearchBoxWidget(serverData) {
			var searchTextBox = $(serverData.searchTextBoxSelector),
				searchButton = $(serverData.searchButtonSelector);
			searchTextBox.keypress(keypressHandler);

			/* Initialization */
			if (!serverData.disableSuggestions) {
				searchTextBox.keyup(keyupHandler);

				try {
					searchTextBox.autocomplete({
						source: [],
						messages:
						{
							noResults: '',
							results: function () { }
						},
						select: function (event, ui) {

							if (!event)
								event = window.event;

							if (event.stopPropagation) {
								event.stopPropagation();
							}
							else {
								event.cancelBubble = true;
							}
							if (event.preventDefault) {
								event.preventDefault();
							}
							else {
								event.returnValue = false;
							}

							var query = searchTextBox.val();

							if (query && query.trim() && serverData.indexCatalogue) {
								sendSentence();
								window.location = getLocation();
							}

							window.location = ui.item.value;

						},
						focus: function (event, ui) {
							event.preventDefault();
						},
						minLength:0
					}).autocomplete("widget").addClass("sf-autocomplete");

				}
				catch (e) {
					// Fixes jQuery bug, causing IE7 to throw error "script3 member not found".
					// The try/catch can be removed when the bug is fixed.
				}
			}
			/* Event handlers */
			function keypressHandler(e) {

				if (!e)
					e = window.event;
				var keyCode = null;
				if (e.keyCode) {
					keyCode = e.keyCode;
				}
				else {
					keyCode = e.charCode;
				}

				if (keyCode == 13) {
					navigateToResults(e);
				}
			}


			function suggestionsSuccessHandler(result, args) {

				var dataSource = result.suggestion;
				var suggestions = [];
				for (var result of dataSource) {
					suggestions.push({ label: result.title, value: result.url });
				}
				searchTextBox.autocomplete('option', 'source', suggestions);
				searchTextBox.autocomplete("search","");

			}

			function keyupHandler(e) {

				if (e.keyCode != 38 &&  // up arrow
					e.keyCode != 40 && // down arrow
					e.keyCode != 27) { // esc


					var request = {};
					var searchText = searchTextBox.val().trim();
					if (searchText.length >= serverData.minSuggestionLength) {
						request.IndexName = serverData.indexCatalogue;
						request.SuggestionFields = serverData.suggestionFields;
						request.Text = searchText;
						request.Language = serverData.language;
						request.SiteId = serverData.siteId;
						if (serverData.scoringSettingsSelector) {

							request.ScoringInfo = serverData.scoringSettingsSelector;
						}
						$.ajax({
							type: "GET",
							url: serverData.suggestionsRoute,
							dataType: 'json',
							data: request,
							success: suggestionsSuccessHandler
						});


					}

				}
			}

			/* Helper methods */
			function navigateToResults(e) {
				if (!e)
					e = window.event;

				if (e.stopPropagation) {
					e.stopPropagation();
				}
				else {
					e.cancelBubble = true;
				}
				if (e.preventDefault) {
					e.preventDefault();
				}
				else {
					e.returnValue = false;
				}

				var query = searchTextBox.val();

				if (query && query.trim() && serverData.indexCatalogue) {
					sendSentence();
					window.location = getLocation();
				}
			}

			function getLocation() {

				var query = searchTextBox.val().trim();
				var separator = (serverData.resultsUrl.indexOf("?") == -1) ? "?" : "&";

				var catalogueParam = separator + "indexCatalogue=" + encodeURIComponent(serverData.indexCatalogue),
					searchQueryParam = "&searchQuery=" + encodeURIComponent(query),
					wordsModeParam = "&wordsMode=" + serverData.wordsMode;

				var url = serverData.resultsUrl + catalogueParam + searchQueryParam + wordsModeParam;

				if (serverData.scoringSettingsSelector) {
					url = url + "&scoringInfo=" + serverData.scoringSettingsSelector;
				}

				return url;
			}

			function sendSentence() {
				if (window.DataIntelligenceSubmitScript) {
					DataIntelligenceSubmitScript._client.sentenceClient.writeSentence({
						predicate: "Search for",
						object: searchTextBox.val(),
						objectMetadata: [{
							'K': 'PageUrl',
							'V': location.href
						}]
					});
				}

			}
		}
	};

	if (window.personalizationManager) {
		window.personalizationManager.addPersonalizedContentLoaded(function () {
			init();
		});
	} else {
		document.addEventListener('DOMContentLoaded', function () {
			init();
		});
	}
}(jQuery));
