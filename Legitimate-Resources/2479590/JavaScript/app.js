jQuery(document).ready(function () {
    jQuery(".inline_issue").prev("p").css("display", "inline");
    jQuery('.ccw-an').hover(add, remove);
    function add() {
        jQuery(this).addClass('animated infinite');
    }
    function remove() {
        jQuery(this).removeClass('animated infinite');
    }
});
var url = window.location.href;
var google_analytics = ht_ccw_var.google_analytics;
var title = ht_ccw_var.page_title;
ht_ccw_clickevent();
function ht_ccw_clickevent() {
    var ccw_plugin = document.querySelector('.ccw_plugin');
    if ( ccw_plugin ) {
        ccw_plugin.addEventListener('click', ht_ccw_clicked);
    }
}
function ht_ccw_clicked() {
    if ( 'true' == google_analytics ) {
        google_analytics_event();
    }
}
function google_analytics_event() {
    var ga_category = ht_ccw_var.ga_category.replace('{{url}}', url).replace('{{title}}', title);
    var ga_action = ht_ccw_var.ga_action.replace('{{url}}', url).replace('{{title}}', title);
    var ga_label = ht_ccw_var.ga_label.replace('{{url}}', url).replace('{{title}}', title);
    // ga('send', 'event', 'Contact', 'Call Now Button', 'Phone');
    if ("ga" in window) {
        tracker = ga.getAll()[0];
        if (tracker) tracker.send("event", ga_category, ga_action, ga_label );
    } else if ("gtag" in window) {
        gtag('event', ga_action, {
            'event_category': ga_category,
            'event_label': ga_label,
        });
    }
}