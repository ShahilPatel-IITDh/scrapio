
        $(function () {
            if ($("script[type='text/template']").hasClass("template-marketdata")) {
                var templateData = _.template(
                    $("script.template-marketdata").html()
                );
            }
            $.get("/api/LoanCalculators/GetBistEndexDataResponse").then(function (result, responseText, jqXHR) {
                $(".template-marketdata").html(
                    templateData(result)
                );
                Modules.OwlCarousel();
            });
        })
    