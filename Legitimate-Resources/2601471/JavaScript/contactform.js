function getContactForm() {
    var oV = kendo.observable({
        fields: {
            Name: "",
            Phone: "",
            Email: "",
            Subject: "",
            Message: ""
        },
        validationrules: function () {
            return {
            }
        },
        sendcontact_click: function () {
            var validator = $("#contactform").kendoValidator({}).data(kV), status = $("#contactform.statusbox");
            if (!validator.validate()) {
                status.text(gValidatorError).addClass("invalid");
                return false;
            }
            $.post(getApiServer() + "/api/helper/sendcontactemail/" + encodeURIComponent(getUserToken()), { "": kendo.stringify(oV.fields) }, function (data) {
                if (data > 0) {
                    showWindow("E-mail Confirmation", ".emailsentsuccess");
                    oV.set("fields", {
                        Name: "",
                        Phone: "",
                        Email: "",
                        Subject: "",
                        Message: ""
                    });
                    $(".emailsenterror").hide();
                } else {
                    $(".emailsenterror").fadeIn().delay(3500).fadeOut();
                    $(".emailsentsuccess").hide();
                }
            });
        },
        contactrequestsent_close: function () {

            hideWindow(".emailsentsuccess");
            hideWindow(".emailsenterror");
        }
    });
    kendo.bind("#contactform", oV);
}

$(document).bind("MAINCONTENT", function (e, path) {
    getContactForm();
    kendo.ui.progress($("#loader"), false);
    $("#loader").hide();
});