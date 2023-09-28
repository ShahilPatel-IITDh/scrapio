$(document).ready(function () {

    var button;
    const loadingCircleContact = $("#loading-circle-contact");

    $(document).on("click", ".btn", function () {
        button = $(this);
        var href = button.attr('href');

        if (typeof href !== "undefined") {
            if (href.indexOf("javascript:__doPostBack") >= 0) {
                var top = button.offset().top;
                var left = button.offset().left;
                var width = button.width();
                var height = button.height();

                button.css("color", "#f69f29");

                loadingCircleContact.css("top", top + (height / 2));
                loadingCircleContact.css("left", left + (width / 2) + 23);
                loadingCircleContact.css("display", "block");
				
				setTimeout(function () {
                    loadingCircleContact.css("display", "");
                    button.css("color", "#000");
                }, 20000);
            }
        }
    });

    var prm = Sys.WebForms.PageRequestManager.getInstance();
    prm.add_endRequest(function (s, e) {
        loadingCircleContact.css("display", "");
        button.css("color", "#000");
    });

    $("form").submit(function () {
        var top = button.offset().top;
        var left = button.offset().left;
        var width = button.width();
        var height = button.height();

        button.css("color", "#f69f29");

        loadingCircleContact.css("top", top + (height / 2));
        loadingCircleContact.css("left", left + (width / 2) + 23);
        loadingCircleContact.css("display", "block");

        //setTimeout(function () {
        //    loadingCircleContact.css("display", "");
        //    button.css("color", "#000");
        //}, 7000);
    });
});