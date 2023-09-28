
        var require = {
            callback: function () {
                require(["loader"], function (loader) {
                    loader.init([]);
                    $(document).ready(function () {
                        $('[data-ride="carousel"]').each(function () {
                            var $carousel = $(this);
                            $carousel.carousel($carousel.data());
                        });
                    });
                    $.cookieCuttr({
                        cookieMessage: "By using our website you are consenting to our use of cookies in accordance with our <a href='{{cookiePolicyLink}}'>Cookie Policy</a>.",
                        cookiePolicyLink: "",
                        cookieAcceptButtonText: "<i class=\"fa fa-times\"></i>",
                        cookieAnalytics: false
                    });
                });
	}
        };
    