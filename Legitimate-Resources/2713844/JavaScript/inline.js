
        $(document).ready(function () {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
            {
                $("body").addClass("IE IE11");
            }
            $(".Horizontal #menuList > li").each(function (e) {
                if (!$(this).hasClass("Highlighted")) {
                    $(this).children("ul").html("");
                    $(this).children("a").find("span").remove();
                    $(this).children("a").removeClass("has-category");
                    $($(this)).one('click', function (e) {
                        var link = $(this).children("a").attr('href');
                        window.location.href = link;
                    });
                }
            });
        });
    