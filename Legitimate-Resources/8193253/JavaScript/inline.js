
    (() => {

        $("input[name='Username']").on("blur keyup change", ValidateUserPassword);
        $("input[name='Password']").on("blur keyup change", ValidateUserPassword);

        $("#forgotPasswordLink").click(function() {
            const ut = $("#UserType").val();
            location.href="https://axos.invlink.com/ForgotPassword?ut=" + ut;
        });

        $("#submit-button").click(function() {
            // disable button
            $(this).prop("disabled", true);
            // add spinner to button
            $(this).html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
            );
            submitting = true;
            document.forms[0].submit();
        });        

        PcsIamClient.Globalization.setForm($("#loginForm"), 'https://axos.invlink.com/Identity/SetCulture');

        $("input[name='languageSelector']").click(function() {
            PcsIamClient.Globalization.setCurrentCulture(this);
        });

        // default the user type selection
        var userTypeSelection = ('; ' + document.cookie).split(`; PCS.UserTypeSelection=`).pop().split(';')[0];

        if (userTypeSelection) {
            var userTypeButton = $('input:button[name=userTypeButton][id=' + userTypeSelection + ']');

            UpdateUserType(userTypeButton, userTypeSelection);
        } else {
            UpdateUserType(null, 'Participant');
        }
    })();
