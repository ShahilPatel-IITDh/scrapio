jQuery(document).ready(function () {

    const feedbackHtmlElementId = "feedback-nps3";
    const mobileScreenMaxWidth = 769;
    const footerHtmlElement = jQuery('#footer');
    const feedbackButtonHtmlTemplate = `
		<div id='${feedbackHtmlElementId}' class='2nospeed'>
			<a href='/vas-nazor'>
				<img src='/o/speed-theme/images/speed/comment-alt-smile.svg' alt=''>
				VÃ¡Å¡ nÃ¡zor
			</a>
		</div>
	`;

    footerHtmlElement.append(feedbackButtonHtmlTemplate);

    function getCookie (name) {
        let value = `; ${decodeURIComponent(document.cookie)}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setCookie(name, value) {
        let d = new Date();
        d.setTime(d.getTime() + 60 * 1000);
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    if (jQuery(window).width() < mobileScreenMaxWidth) {
        if (getCookie("nps-popup") === "click") {
            jQuery(`#${feedbackHtmlElementId}`).addClass("d-none");
        } else {
            jQuery(`#${feedbackHtmlElementId}`).removeClass("d-none");
        }
    } else {
        jQuery(`#${feedbackHtmlElementId}`).removeClass("d-none");
    }

    jQuery(`#${feedbackHtmlElementId}`).on("click", function () {

        const browserNps = (function (agent) {
            switch (true) {
                case agent.indexOf("edge") > -1:
                    return "MS Edge (EdgeHtml)";
                case agent.indexOf("edg") > -1:
                    return "MS Edge Chromium";
                case agent.indexOf("opr") > -1 && !!window.opr:
                    return "opera";
                case agent.indexOf("chrome") > -1 && !!window.chrome:
                    return "chrome";
                case agent.indexOf("trident") > -1:
                    return "Internet Explorer";
                case agent.indexOf("firefox") > -1:
                    return "firefox";
                case agent.indexOf("safari") > -1:
                    return "safari";
                default:
                    return "other";
            }
        })(window.navigator.userAgent.toLowerCase());

        const pathnameNps = window.location.pathname;

        const widthNps =
            window.screen.width * window.devicePixelRatio +
            "x" +
            window.screen.height * window.devicePixelRatio;

        const deviceNps = (function (deviceWidth){
            if(deviceWidth < mobileScreenMaxWidth){
                return "Mobile";
            } else {
                return "Desktop";
            }
        })(jQuery(window).width());

        setCookie("nps-popup", "click");
        setCookie("nps-browser", browserNps);
        setCookie("nps-url", pathnameNps);
        setCookie("nps-resolution", widthNps);
        setCookie("nps-device", deviceNps);
    });
});