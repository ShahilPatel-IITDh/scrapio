
( function() {
function loftloader_finished() {
document.body.classList.add( 'loaded' );
}
var loader = document.getElementById( 'loftloader-wrapper' );
if ( loader ) {
window.addEventListener( 'load', function( e ) {
loftloader_finished();
} );
if ( loader.dataset && loader.dataset.showCloseTime ) {
var showCloseTime = parseInt( loader.dataset.showCloseTime, 10 ), maxLoadTime = false,
closeBtn = loader.getElementsByClassName( 'loader-close-button' );
if ( showCloseTime && closeBtn.length ) {
setTimeout( function() {
closeBtn[0].style.display = '';
}, showCloseTime );
closeBtn[0].addEventListener( 'click', function( e ) {
loftloader_finished();
} );
}
}
if ( loader.dataset.maxLoadTime ) {
maxLoadTime = loader.dataset.maxLoadTime;
maxLoadTime = parseInt( maxLoadTime, 10 );
if ( maxLoadTime ) {
setTimeout( function() {
loftloader_finished();
}, maxLoadTime );
}
}
}
} ) ();
