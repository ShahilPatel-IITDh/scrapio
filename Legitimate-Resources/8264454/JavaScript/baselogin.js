/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
function loader(){try{var b=document.login.username.value;null!==b&&0<b.length?document.login.pw.focus():document.login.username.focus()}catch(a){if(window==top)throw a;}}function checkCaps(b){var a=0,c=!1,a=document.all?b.keyCode:b.which,c=b.shiftKey;b=document.getElementById("pwcaps");var d=65<=a&&90>=a,a=97<=a&&122>=a;if(d&&!c||a&&c)b.style.display="block";else if(a&&!c||d&&c)b.style.display="none"};

//# sourceMappingURL=/javascript/1692303511410/sfdc/source/baselogin.js.map
