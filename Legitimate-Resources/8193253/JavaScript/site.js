ï»¿const PcsIamClient = (() => {

    const reverseProxyApi = "https://api.ipify.org?format=json";
    const stateControlName = "RequestClientIp";

    const getClientIp = (() => {
        $.getJSON(reverseProxyApi).done(function (data) {
            $("#" + stateControlName).val(data.ip);
        });
    });
 
    var init = (function (options) {
        this.StringUtil.init(options);
        this.Globalization.init(options);
        getClientIp();
    });

    return { init };

})();

/// Document Ready Function
$(function () {
    PcsIamClient.init({
        defaultLanguage : "english"  // defaults the language for any translations need onLoad
    });

    console.log("PcsIamClient", PcsIamClient);
});
