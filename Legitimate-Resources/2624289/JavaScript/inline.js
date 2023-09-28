
        if (globalParams.goBackTo)
        {
            window.onpopstate = function (event) {
                window.location = globalParams.goBackTo;
            };

            var now = window.location.href;
            now = now.replace(/[?]back=\d?&/, '?');
            now = now.replace(/&back=\d?|[?]back=\d?$/, '');

            window.history.replaceState({url : globalParams.goBackTo}, '', globalParams.goBackTo);
            window.history.pushState({url : now}, '', now);
        }
    