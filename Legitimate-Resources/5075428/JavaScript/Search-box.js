(function ($) {
    $(document).ready(function () {
        var searchBoxIdFields = $('[data-sf-role="programSearchTextBoxId"]'); // <-- note the role here is different from site search box

        for (var i = 0; i < searchBoxIdFields.length; i++) {
            var searchBoxIdField = $(searchBoxIdFields[i]);
            var controlServerData = {
                resultsUrl: searchBoxIdField.siblings('[data-sf-role="resultsUrl"]').first().val(),
                indexCatalogue: searchBoxIdField.siblings('[data-sf-role="indexCatalogue"]').first().val(),
                wordsMode: searchBoxIdField.siblings('[data-sf-role="wordsMode"]').first().val(),
                language: searchBoxIdField.siblings('[data-sf-role="language"]').first().val(),
                searchTextBoxSelector: searchBoxIdField.val(),
                searchButtonSelector: searchBoxIdField.siblings('[data-sf-role="searchButtonId"]').first().val()
            };
            featherSearchBoxWidget(controlServerData);
        }

        function featherSearchBoxWidget(serverData) {
            var searchTextBox = $(serverData.searchTextBoxSelector),
                searchButton = $(serverData.searchButtonSelector);

            searchButton.click(navigateToResults);
            searchTextBox.keypress(keypressHandler);
            searchTextBox.keyup(keyupHandler);
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

                if (keyCode === 13) {
                    navigateToResults(e);
                }
            }

            function keyupHandler(e) {
                if (e.keyCode !== 38 &&  // up arrow
                    e.keyCode !== 40 && // down arrow
                    e.keyCode !== 27) { // esc
                    // When the auto complete menu is shown, only this event is detected
                    if (e.keyCode === 13) {
                        // when enter is pressed
                        navigateToResults(e);
                    }

                    var searchText = searchTextBox.val().trim();

                    // homepage shouldn't allow an empty search, but program page empty search is allowed since there are extra filters
                    if ($('body').hasClass('homePage')) {
                        if (searchText === "") {
                            $('.program-search-box .error-message-text').html('Enter a program or keyword to begin your search.');
                            $('.program-search-box').addClass('has-error');
                        } else {
                            $('.program-search-box').removeClass('has-error');
                        }
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
                    // Uncommenting the code below will make program finder purely AJAX driven, but Google Tag Manager based dashboards
                    // must be configured to work off of events instead of page loads

                    //if ($('body').hasClass('program-finder')) {
                        //programFinderApp.filterPrograms(searchTextBox.val().trim());
                    //} else {
                        window.location = getLocation();
                    //}
                }
            }

            function getLocation() {
                var query = searchTextBox.val().trim();

                var separator = serverData.resultsUrl.indexOf("?") === -1 ? "?" : "&";

                var catalogueParam = separator + "indexCatalogue=" + encodeURIComponent(serverData.indexCatalogue),
                    searchQueryParam = "&searchQuery=" + encodeURIComponent(query),
                    wordsModeParam = "&wordsMode=" + serverData.wordsMode;

                var url = serverData.resultsUrl + catalogueParam + searchQueryParam + wordsModeParam;

                return url;
            }

        }

        // this is just for the home page search button
        if ($('body').hasClass('homePage')) {
            $('#program-search').on('click', function () {
                if ($('#program-keyword').val() === "") {
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    $('.program-search-box .error-message-text').html('Enter a program to begin your search.');
                    $('.program-search-box').addClass('has-error');
                }
            });
        }
        
    });
}(jQuery));