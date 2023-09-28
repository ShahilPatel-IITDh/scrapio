
        try {
            if (typeof (Typekit) !== "undefined") {
                Typekit.load({
                    async: false,
                    active: function () { $('.wait-4-typekit').addClass('tk-loaded'); }
                });
            }
        } catch (e) {
            console.log(e);
            $('.wait-4-typekit').addClass('tk-loaded');
        }
    