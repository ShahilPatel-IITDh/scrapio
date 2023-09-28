// FOUT fix
var webFontConfig = {
    custom: {
        families: [
            // OKTA-559430: Removing Proxima Nova from DS theme
            // 'proxima-nova' 
        ]
    }
};

// Note: We can't expect jquery to be a global since this is also being used by enduser. Since this logic
// is only being used for the admin dashboard (i.e. not in enduser), this fix should be fine.
if (window.$) {
    webFontConfig.active = function () {
        $('.ajax-include-feedback-content').trigger('font-active');
    };
    webFontConfig.inactive = function () {
        $('.ajax-include-feedback-content').trigger('font-inactive');
    };
}

WebFont.load(webFontConfig);

