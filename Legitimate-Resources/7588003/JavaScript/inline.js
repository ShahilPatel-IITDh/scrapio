
        if (location.href.indexOf("&a=1") === -1) {
            var newURL = location.href + (location.search ? "&" : "?") + "a=1";
            history.replaceState({}, '', newURL);
        }

        /*<![CDATA[*/
        $(function() {
            $('#tag').select2();
        });
        /*]]>*/
    