
(function() {
var expirationDate = new Date();
expirationDate.setTime( expirationDate.getTime() + 31536000 * 1000 );
document.cookie = "pll_language=pl; expires=" + expirationDate.toUTCString() + "; path=/; secure; SameSite=Lax";
}());
