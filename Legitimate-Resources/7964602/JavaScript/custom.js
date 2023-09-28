
var AjaxSubmit = function (data) {
    var resp = data.responseJSON;
    //TODO: clear success message and show all error messages
    if (!resp.result) {
        var errors = "";
        for (var i = 0; i < resp.errors.length; i++)
            errors += "<li>" + resp.errors[i] + "</li>";
        $("#message").empty().html(errors);
        $("#serverError").modal('show');
    }
    else {
        $('#myPopupModal').modal('hide');
        //$('#replacetarget').load(result.url); //  Load data from the server and place the returned HTML into the matched element
        $("#successMessage").empty().html(resp.message);
        $("#successMessageDialog").modal('show');

        if ($('#myPopupModal').find('form').attr('id') == 'addQuestionComments') {
            $('a[href$="rId=' + resp.rId + '&qId=' + resp.qId + '"]').removeClass('btn-default-button').addClass('btn-pdf');  
            $('#myPopupModal').find("a").removeClass("disabled");
            $('#myPopupModal').removeData('bs.modal');
            $('[name="questionFeedbackViewModel.Comments"]').summernote('destroy');
        }
        else {
            $("a#successDialogCloseButton,button#successDialogCloseIcon").on("click", function () { location.reload(); });
        }
        //window.history.back();
    }

    $('button, a, input[type="submit"]').removeClass("disabled");
};

var storage = window.sessionStorage;
function storeData(key, value, name) {
    if (name == undefined)
        storage.setItem(key, value);
    else {
        var values = "";
        $("[name='" + name + "']:checked").each(function () {
            values += "," + $(this).val();
        });
        storage.setItem(key, values);
    }
}


function getCookie(cname) {
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
    }
    return "";
}

//TODO: put secure in
function createCookie(id) {
    if (id == undefined || id == null)
        id = "";
    var cookie = getCookie("eventmode" + id);
    if (cookie == "" || cookie != 1) {
        var date = new Date();
        date.setTime(date.getTime() + (3600 * 1000));
        document.cookie = "eventmode" + id + "=1; expires=" + date.toGMTString() + "; path=/;";
    }
    return true;
}

$(".cookie").click(function () {
    createCookie($("#respID").val());
})

function clearSession(url) {
    sessionStorage.clear();
    if (url != "")
        window.location = url;
}

var alreadySubmitted = false;
function checkValidation(formname) {

    if (alreadySubmitted)
        return false;
    var $form = $(formname).data('formValidation');
    if ($form.isValid() == true) {
        alreadySubmitted = true;
        return true;
    }
    $form.validate();
    return false;
}

function toggleSelfRegistration() {
    var toggle = $("input[name=checkbox-toggle-1]").is(":checked");
    var token = $('input[name="__RequestVerificationToken"]').val();



    var sendData = {
        'toggle': toggle,
        __RequestVerificationToken: token
    };
    $.ajax({
        url: '/Admin/ToggleSelfRegistration',
        type: 'POST',
        data: sendData,
        success: function (data) {
            //change the btn color
            if (toggle) {
                $("input[name=checkbox-toggle-1]").addClass("enabledOn");
                $("input[name=checkbox-toggle-1]").removeClass("enabledOff");
                $("input[name=checkbox-toggle-1]").siblings('i').addClass("enabledOn");
                $("input[name=checkbox-toggle-1]").siblings('i').removeClass("enabledOff");
            }
            else {
                /* #EB3941   #a94442 #FF0000  */
                $("input[name=checkbox-toggle-1]").addClass("enabledOff");
                $("input[name=checkbox-toggle-1]").removeClass("enabledOn");
                $("input[name=checkbox-toggle-1]").siblings('i').addClass("enabledOff");
                $("input[name=checkbox-toggle-1]").siblings('i').removeClass("enabledOn");
            }
            enableAllButtons();
            if (toggle) {
                $("#selfRegistrationURL").show();
                $("#whiteListedDomains").show();
            }
            else {
                $("#selfRegistrationURL").hide();
                $("#whiteListedDomains").hide();
            }
        },
        error: function (data) {

        }
    });
}
function enableAllButtons() {
    $('button, a, input[type="submit"]').removeAttr("disabled");
    $('button, a, input[type="submit"]').removeClass("disabled");
}

