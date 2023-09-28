
$( function () {
    var i;
    for ( i = 0; i < window.q.length; i++ ) {
        $( window.q[i] );
    }
    window.q = [];
} );

if (typeof archive_analytics !== 'undefined') {
  archive_analytics.set_up_event_tracking();
}
