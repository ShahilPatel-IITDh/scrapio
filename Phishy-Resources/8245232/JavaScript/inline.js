
        $(document).ready(function () {
            setTimeout(function () {
                $('.loadingDiv').fadeOut(100);
                $('#takeSurveyDiv').fadeIn(100);
                $('body').removeClass("spinner-body");
            }, 200);
        })
    