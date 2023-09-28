function YrmClassic() {

	this.id;
}

YrmClassic.prototype = new YrmMore();
YrmClassic.constructor = YrmClassic;

YrmClassic.prototype.init = function () {

	var id = this.id;
	if(typeof readMoreArgs[id] == 'undefined') {
		console.log('Invalid Data');
		return;
	}

	var data = readMoreArgs[id];

	this.initialMutator(data);

	this.setData('readMoreData', data);
	this.setData('id', id);
	this.setStyles();
	this.livePreview();

	var duration = parseInt(data['animation-duration']);
	var hideAfterClick = data['hide-button-after-click'];

	jQuery('.yrm-toggle-expand-'+id).each(function () {
		var position = -1;
		var initialScroll = -1;
		var currentButton = jQuery(this);

		currentButton.unbind('click').bind('click', function () {
            var easings = data['yrm-animate-easings'];

            var currentButtonWrapper = currentButton.parent('.yrm-btn-wrapper');
            var contentGradient = jQuery('.yrm-content-gradient-'+id, currentButtonWrapper);

            var toggleContentId = jQuery(this).attr('data-rel');
            var arrowImage = jQuery(this).find('.yrm-arrow-img').first();
			position = jQuery('#'+toggleContentId).offset().top;
            var currentStatus = JSON.parse(jQuery("#"+toggleContentId).attr('data-show-status'));
            var triggerArgs = {'id': id, 'currentElement': currentButton};

            /*if currentStatus == true must be close read more*/
            if(currentStatus) {
            	var moreName = jQuery(this).data('more');
            	var moreTitle = jQuery(this).data('more-title');
                jQuery("#" + toggleContentId).slideToggle(duration, easings, function () {
	                contentGradient.fadeIn('slow');
                });
	            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
	            var scrollDifference = currentScroll - initialScroll;
	            if (position != -1 && data['vertical'] != 'top' && scrollDifference && data['scroll-to-initial-position']) {
		            jQuery("html ,body").animate({scrollTop: currentScroll-scrollDifference}, duration, easings);
	            }
	            arrowImage.removeClass('yrm-rotate-180');
                jQuery(this).attr('title', moreTitle);
                jQuery(this).parent().removeClass('yrm-less-button-wrapper').addClass('yrm-more-button-wrapper');
                jQuery(this).find('.yrm-button-text-'+id).text(moreName);
                jQuery(window).trigger('YrmClose', triggerArgs);
			}
			else {
	            initialScroll = document.documentElement.scrollTop || document.body.scrollTop;
            	var lessName = jQuery(this).data('less');
            	var lessTitle = jQuery(this).data('less-title');
                jQuery("#"+toggleContentId).slideToggle(duration, easings, function () {
	                contentGradient.fadeOut('slow');
					if(hideAfterClick) {
						currentButton.remove();
					}
                });
                arrowImage.addClass('yrm-rotate-180');
                jQuery(this).attr('title', lessTitle);
	            jQuery(this).parent().addClass('yrm-less-button-wrapper').removeClass('yrm-more-button-wrapper');
                jQuery(this).find('.yrm-button-text-'+id).text(lessName);
                jQuery(window).trigger('YrmOpen', triggerArgs);
			}
            jQuery("#"+toggleContentId).attr('data-show-status', !currentStatus);
        })
	});
};