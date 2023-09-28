(function ($, instance) {
    instance.toastTimeoutID = -1;
    instance.showToast = function(message, error, additionalMessage, timeout) {
        if (instance.toastTimeoutID > 0) {
            clearTimeout(instance.toastTimoutID);
            instance.toastTimeoutID = -1;
        }
        $(".instance-toast").remove();
        if (additionalMessage) {
            message += "<br><em>" + additionalMessage + "</em>";
        }
        var type = "success";
        if (error === true) {
            type = "danger";
        }
        $("<div class=\"alert alert-"+type+" alert-dismissible fade in instance-toast show\" role=\"alert\">" + message + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button></div>")
            .appendTo("body");
        timeout = timeout || 5000;
        instance.toastTimeoutID = setTimeout(instance.hideToast, timeout);
    };
    instance.hideToast = function() {
        $(".instance-toast").alert('close');
        instance.toastTimoutID = -1;
    }

})(jQuery, window.instance || (window.instance = {}));