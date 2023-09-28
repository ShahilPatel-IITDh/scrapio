
(function () {
    if (typeof window.sdmedia !== 'object') {
         window.sdmedia = {};
    }
    if (typeof window.sdmedia.site !== 'object') {
        window.sdmedia.site = {};
    }

    var site = window.sdmedia.site;
    site.rootdir = "//slashdot.org";
}());

var pageload = {
	pagemark: '789912156221769077',
	before_content: (new Date).getTime()
};
function pageload_done( $, console, maybe ){
	pageload.after_readycode	= (new Date).getTime();
	pageload.content_ready_time	= pageload.content_ready - pageload.before_content;
	pageload.script_ready_time	= pageload.after_readycode - pageload.content_ready;
	pageload.ready_time		= pageload.after_readycode - pageload.before_content;
	// Only report 1% of cases.
	maybe || (Math.random()>0.01) || $.ajax({ type: 'POST', data: {
		op: 'page_profile',
		pagemark: pageload.pagemark,
		dom: pageload.content_ready_time,
		js: pageload.script_ready_time
	} });
}
