
        // Javascript required for site catalyst
        // SiteCatalyst requires this global variable.
        window.adsk = window.adsk || {};
                 adsk['s'] = false;


            function showLearnMoreSection() {
                $('#learn_more_div').show();
                $('#content_div').hide();
            }
            function closeLearnMoreSection() {
                $('#learn_more_div').hide();
                $('#content_div').show();

            }
        