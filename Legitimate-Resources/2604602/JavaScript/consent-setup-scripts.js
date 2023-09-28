function getPageId(){
    return 'cscg';
}

function setGTMId(){
    return 'GTM-WK7TLL9';
}

var gtmId = setGTMId();

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag(){
	dataLayer.push(arguments);
}

// Default ad_storage to 'denied'.
gtag('consent', 'default', {
	'analytics_storage': 'denied',
	'ad_storage': 'denied',
	'wait_for_update': 500
});


// Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',gtmId);
// End Google Tag Manager