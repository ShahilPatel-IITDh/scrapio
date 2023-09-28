$(document).ready(function () {
    $(document).on("click", ".closeAlertMsg", function () { closeAlertMsg(this); });
});
var closeAlertMsg = function (thisButton) {
    $(thisButton).closest(".messageKOStyle").fadeOut();
}
var clickButton = function (e, buttonid) {
    var bt = document.getElementById(buttonid);
    if (typeof bt == 'object') {
        if (e.keyCode == 13) {
            bt.click();
            return false;
        }
    }
}
var setCaretPosition = function (ctrlId, pos) {
    var ctrl = document.getElementById(ctrlId);
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

var showPasswordWeb = function () {
    var pwdField = $("#password")[0];
    var eyeDisplay = $("#eye-passwordWeb");
    var eyeHide = $("#eye-no-passwordWeb");
    $(eyeHide).addClass("hidden");
    $(eyeDisplay).addClass("hidden");
    if (pwdField.type === "password") {
        pwdField.type = "text";
        $(eyeHide).removeClass("hidden");
    } else {
        pwdField.type = "password";
        $(eyeDisplay).removeClass("hidden");
    }
}