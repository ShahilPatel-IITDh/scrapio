
        function clean(input) {
            return input.replace('http://blackholemyemail.com/', '');
        }

        $(document).ready(function () {
            var unsubUrl = 'http://blackholemyemail.com//t/complete/r/kriyiry/jiujkilu/c/q?ajax=t';
            var useComplexUnsubscribe = false;

            if (useComplexUnsubscribe) {
                $(".complex-unsubscribe").show();
            } else {
                $.ajax({
                    url: clean(unsubUrl),
                    dataType: 'json',
                    cache: false,
                    type: 'POST',
                    success: function (json) {
                        if (json.redirect) {
                            window.location = json.redirect;
                        } else {
                            $('.completed,#pending').toggle();
                        }
                    }
                });
            }
        });
    