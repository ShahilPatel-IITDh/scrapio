$(document).ready(function () {
    $(".galleryLink a").click(function () {
        var url = $(this).attr("href");
        $.fancybox('<iframe src="' + url + '" scrolling="no" frameborder="0" width="600" height="475"></iframe>');
        return false;
    });

    $("#btnGetContent").click(function () {
        $("#pinError").html("");
        $("#pinSuccess").html("");

        var pin = $("#txtPin").val();
        var pinSourceUrl = $("#pinSourceUrl").val();
        var siteLocation = secureLocation + "authorizecustompage/" + customPageID + "?pin=" + pin + "&isStage=" + isStage + "&sourceUrl=" + pinSourceUrl;
        $.getJSON(siteLocation + "&callback=?", function (data) {
            if (!data) {
                $("#pinError").html("Unknown error verifying PIN.");
            }
            if (data.success) {
                // Store PIN in cookie and reload page.
                var expDate = new Date();
                expDate.setTime(expDate.getTime() + (30 * 24 * 60 * 60 * 1000))
                var name = "CustomPagePIN_" + customPageID;
                document.cookie = name + "=" + pin + "; expires=" + expDate.toGMTString();
                $("#pinSuccess").html("Valid PIN. Loading content...");
                location.reload();
            }
            else {
                $("#pinError").html(data.message);
            }
        });
    });
});