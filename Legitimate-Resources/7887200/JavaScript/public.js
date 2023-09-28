jQuery(document).ready(function () {
    jQuery('.in5-iframe-code').each(function (index, el) {
        var newWindow = jQuery(this).data('open-in-new-window');
        var allowFull = jQuery(this).data('allow-fullscreen');
        if (newWindow == 'yes' && allowFull == 'yes') {
            jQuery(this).closest('.in5-iframe-wrapper').prepend(jQuery('<a href="#" class="in5-move-to-right in5-new-window"><i class="fa fa-external-link"></i></a>'));
            jQuery(this).closest('.wp-block-cgb-block-in5-wp-embed').prepend(jQuery('<a href="#" class="in5-move-to-right in5-new-window"><i class="fa fa-external-link"></i></a>'));
        }
        else if (newWindow == 'yes') {
            jQuery(this).closest('.in5-iframe-wrapper').prepend(jQuery('<a href="#" class="in5-new-window"><i class="fa fa-external-link"></i></a>'));
            jQuery(this).closest('.wp-block-cgb-block-in5-wp-embed').prepend(jQuery('<a href="#" class="in5-new-window"><i class="fa fa-external-link"></i></a>'));
        }
        if (allowFull == 'yes') {
            jQuery(this).closest('.in5-iframe-wrapper').prepend(jQuery('<a href="#" class="in5-fullscreen"><i class="fa fa-expand"></i></a>'));
            jQuery(this).closest('.wp-block-cgb-block-in5-wp-embed').prepend(jQuery('<a href="#" class="in5-fullscreen"><i class="fa fa-expand"></i></a>'));
        }
    });

    jQuery(document).on('click', '.in5-new-window', function (e) {
        e.preventDefault();
        window.open(jQuery(this).parent().find('iframe').attr('src'));
    });

    jQuery(document).on('click', '.in5-fullscreen', function (e) {
        e.preventDefault();
        var element = jQuery(this).parent().find('iframe');
        screenfull.request(element[0]);
    });
});

jQuery(window).on('load resize orientationchange', function(e){
	jQuery('iframe.in5-iframe-code[data-responsive-h="yes"]').each(function(index,el){
		clearTimeout(el.resizeTimeout);
		el.resizeTimeout = setTimeout(function() {
        checkResponsiveHeight(el);
        }, 50);
	});
});

function checkResponsiveHeight(el,forceW){
	var cwin = el.contentWindow, cdoc = cwin.document, cbody = cdoc.body, scaledTo = forceW ? 'w' : cbody.getAttribute('data-scaled-to'),
        pageMode = cwin.pageMode, responsive = (cwin.in5.layouts && (cwin.in5.layouts.length > 1));
        if(pageMode === 'liquid') { return; }
		switch(scaledTo) { 
			case undefined: break;
			case 'h':/*reset to avoid infinite shrinkage*/
			var oHeight = el.getAttribute('data-orig-height');
			var oldH = parseInt(el.style.height);
			el.style.height = oHeight + 'px';
			el.setAttribute('height', oHeight);
			setTimeout(function(){ checkResponsiveHeight(el,true);},50);
			break;
			default:
			var zoom = cdoc.querySelector('#container').style.zoom || 1;
			var h = Math.ceil(cdoc.querySelector('.activePage').getBoundingClientRect().height*zoom);
			el.style.height = h + 'px';
			el.setAttribute('height', h);
		}
}
