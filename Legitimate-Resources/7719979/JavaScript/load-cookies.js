$(document).ready(function () {
    /*************** Cookie Value updation statrs here ******************************/
    function setCookie(c_name, value, exdays, urlPath) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + ";path=" + urlPath;
        document.cookie = c_name + "=" + c_value;
    }

    setCookie("segmentValue", "", "-1", "/");
    var pageURL = window.location.href;

    var pageSegments = pageURL.split('/');
    var pageSegment = "";
    if (pageSegments != null && pageSegments != "") {

        if (pageSegments[3] == "in")
            pageSegment = pageSegments[4];
        else if (pageSegments[3] == "id")
            pageSegment = pageSegments[4];
        else
            pageSegment = pageSegments[3];
    }
    var arrValues = ["treasures", "sme", "corporate", "treasures-private-client", "private-banking", "personal", "posb","i-bank"];
    arrValues.forEach(function (entry) {
        if (pageSegment == entry) {
            "console" in window && console.log("cookie passed here is --->" + pageSegment);
            setCookie("segmentValue", pageSegment, 99999, "/");
        }
    });
    /*************** Cookie Value updation ends here ******************************/
});