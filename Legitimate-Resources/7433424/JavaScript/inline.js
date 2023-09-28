

        function OnStandardsSearch() {
             var test = "";
            $(".search-container .StandardsSearchTextBox:text").each(function () {
                 test += $(this).val();
             });
        var url = '/en-GB/search-results/';
        window.location.href = url + "?q=" + test + "&tab=Standards";
     }
        $('input.StandardsSearchTextBox').keypress(function (e) {
        if (e.which == 13) {
            var test = "";
            $(".search-container .StandardsSearchTextBox:text").each(function () {
                test += $(this).val();
            });
            var url = '/en-GB/search-results/';
            window.location.href = url + "?q=" + test + "&tab=Standards";
            e.preventDefault();
        }
        });


    $("#CDCSearchButton").click(function (e) {
          SearchResultsPage(e);
    });
    $('#CDCSearchTextBox').keypress(function (e) {
        $('input#CDCSearchTextBox').removeClass('cdnocontentplaceholder');
        if (e.which == 13) {
            SearchResultsPage(e);
        }
    });

      function SearchResultsPage(e) {
          var data = encodeURIComponent($("#CDCSearchTextBox").val());



        if (data.length == 0) {

            $('input#CDCSearchTextBox').addClass('cdnocontentplaceholder');
            if (document.getElementById("tab-cdc-content") != null && document.getElementById("tab-cdc-content").innerHTML != null) {
                document.getElementById("tab-cdc-content").innerHTML = "";
            }
            $(".crt-button").hide();
            $("tab-cdc-content").hide();
            $(".kitemarkResults").hide();
            $('.mob-cdcsearchhint').css('color', 'red');

            return false;
        }
        else {

            var url = '/en-GB/validate-bsi-issued-certificates/client-directory-results/';
           window.location.href = url + "?q=" + data;
            e.preventDefault();

        }
        }
        $(document).on(
            'keydown', function (event) {
                if (event.key == "Escape") {
                    $('.CertificateButton').blur();
                }
            });
    