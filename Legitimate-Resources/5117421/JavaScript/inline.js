
            var numberOfError = 0;
        var ADDRESS_LOOKUP_ENDPOINT = "/ltl/apps/CustomerAddresses";

        function showSpinner()
        {
            $("#spinnerGIF").show();
        }

        function hideSpinner()
        {
            $("#spinnerGIF").hide();
        }

        $(document).ready(function () {


            $('#preferences_prompt_submit').removeClass('left');

           
             window.scroll = function (e) {
                 alert(e.offset.height);
             }

             $('div.bread-crum-container').find('a').each(function (e) {
                 console.log("href>>" + $(this).attr('href'));
                 var currenturl = window.location.href;
                 console.log("currenturl>>" + currenturl)
                 if (currenturl.indexOf("/apps") !== -1 && $(this).attr('href').indexOf("/myltl") !== -1) {
                     var newurl = $(this).attr('href').replace("/myltl", "/apps")
                     console.log("newurl>>" + newurl);
                     $(this).attr('href', newurl)
                 }
                 else if (currenturl.indexOf("/myltl") !== -1 && $(this).attr('href').indexOf("/apps") !== -1) {
                     var newurl = $(this).attr('href').replace("/apps", "/myltl")
                     console.log("newurl>>" + newurl);
                     $(this).attr('href', newurl)
                 }
            });
            $('div.bread-crum-container').each(function (e) { console.log(e) })

        });

            function TrackSearch(Authenticated) {
            var proNumbers = '';
            var itemIds = $('#TextTrack').val().split("\n");
            for (var x = 0; x < itemIds.length; x++) {
                if (itemIds[x].trim().length > 0) {
                    proNumbers = proNumbers + itemIds[x].trim() + ";";
                }
            }
            if (proNumbers != "") {
                var reloadURL = "/ltl/apps/Tracking";
                reloadURL = reloadURL + "?proNumbers=" + proNumbers;
                window.location.href = reloadURL.toString();
            }
            else {
                var reloadURL = "/ltl/apps/Tracking";
                window.location.href = reloadURL.toString();
            }
        }

            $("#navbartrack").click(
                function () {
                    $('#TextTrack').val('');
                    $("#CommonProNumbers").val('');
                    $("#CommontrackingByProForm").css("display", "block");
                }
        );

        //window.onscroll = function (e) {
        //    alert(e.scrollTop);
        //    if ($("#maincontent").scrollTop > 10) {
        //        $("#maincontent").addClass("fix-head");
        //    } else {
        //        $("#maincontent").removeClass("fix-head");
        //    }
        //};
    