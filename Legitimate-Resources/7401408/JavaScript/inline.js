
            var views = [],
                triggers = document.querySelectorAll('.image-trigger');
            [].forEach.call(triggers, function(element, index) {
                views[index] = new Views(element, {
                    defaultTheme: true,
                    prefix: 'light',
                    loader: 'Loading...',
                    anywhereToClose: true,
                    openAnimationDuration: 400,
                    closeAnimationDuration: 400
                });
            });
        