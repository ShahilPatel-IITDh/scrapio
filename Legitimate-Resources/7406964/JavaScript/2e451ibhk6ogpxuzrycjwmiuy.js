/**
 * Checks if browser is Firefox, and if so displays a browser support warning message
 */
const isFirefox = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const el = document.getElementById('browser-support-message');
if (isFirefox) {
    el.classList.remove = 'hidden';
}