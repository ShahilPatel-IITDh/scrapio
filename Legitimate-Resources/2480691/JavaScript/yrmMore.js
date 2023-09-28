function YrmMore() {

	this.data = [];
}

YrmMore.prototype.setData = function (dataName, value) {

	this.data[dataName] = value;
};

YrmMore.prototype.getData = function(dataName) {

	return this.data[dataName];
};

YrmMore.prototype.binding = function() {
	var thaT = this;

	this.styles();

};

YrmMore.prototype.setStyles = function () {

	var data = this.getData('readMoreData');
	var id = this.getData('id');

	this.setChengHorizontalAlign(".yrm-btn-wrapper-"+id,data['horizontal']);

	this.setFontSize(".yrm-button-text-"+id, data['font-size']);
	this.setFontWeight(".yrm-button-text-"+id, data['yrm-btn-font-weight']);
	if(typeof this.proInit == 'function') {
		this.proInit();
	}
	if(typeof this.generalFunctions == 'function') {
		this.generalFunctions();
	}

	if(data['yrm-btn-hover-animate']) {
		jQuery('.yrm-toggle-expand-'+id).attr('data-animate', 'animated '+data['yrm-btn-hover-animate']);
	}
	
	this.buttonHoverEffect();
};

YrmMore.prototype.buttonHoverEffect = function() {
	var id = this.getData('id');
	jQuery('.yrm-toggle-expand-'+id).hover(function() {
		var effect = jQuery(this).attr('data-animate');
		jQuery(this).addClass(effect);
	}, function() {
		var effect = jQuery(this).attr('data-animate');
		jQuery(this).removeClass(effect);
	})
};

YrmMore.prototype.buttonDimensions = function() {

	var data = this.getData('readMoreData');
	var id = this.getData('id');

	var width = data['button-width'];
	var height = data['button-height'];

	jQuery(".yrm-toggle-expand-"+id).css({
		'width': width,
		'height': height
	});
};

YrmMore.prototype.styles = function() {
	
	var data = this.getData('readMoreData');
	var fontSize = data['font-size'];

	this.setFontSize(".yrm-button-text", fontSize);
};

YrmMore.prototype.setFontSize = function (element, fontSize) {

	jQuery(element).css({
		'font-size': fontSize
	})
};

YrmMore.prototype.setFontWeight = function (element, fontWeight) {

	jQuery(element).css({
		'font-weight': fontWeight
	})
};

YrmMore.prototype.setChengHorizontalAlign = function(element, val) {

	jQuery(element).css({"text-align": val});
	var data = this.getData('readMoreData');
	if(data['type'] == 'inline') {
		jQuery(element+' .yrm-toggle-expand').css({"text-align": val});
	}
};

YrmMore.prototype.livePreview = function() {
	
	this.changeButtonWidth();
	this.changeButtonHeight();
	this.changeButtonFontSize();
	this.changeButtonFontWeight();
	this.changeBtnBackgroundColor();
	this.changeBtnTextColor();
	this.changeBtnBorderBottom();
	this.changeBorderRadius();
	this.changeHorizontalAligment();
	this.addFontFamilyOptionsView();
	this.changeButtonFontFamily();
	this.changeHiddenContentFontFamily();
	this.changeHoverEffect();
	this.changeHiddenContentBgColor();
	this.changeHiddenContentTextColor();
	this.changeHiddenContentPadding();
	this.changeButtonTitle();
};

YrmMore.prototype.changeHoverEffect = function() {

	var id = this.getData('id');
	var buttonHoverIcon = jQuery('.yrm-eye-button-hover');
	if (!buttonHoverIcon.length) {
		return;
	}
	var effect = function (enableClass) {
		var button = jQuery('.yrm-toggle-expand');
		var classes = button.attr('data-animate');
		button.removeClass(classes);
		if (enableClass) {
			setTimeout(function () {
				button.addClass(classes);
			}, 0);
		}
	};
	buttonHoverIcon.bind('click', function () {
		setTimeout(function () {
			effect(true);
		}, 0);
	});
	jQuery('[name="yrm-btn-hover-animate"]').change(function() {
		val = jQuery(this).val();
		effect(false);
		jQuery('.yrm-toggle-expand-'+id).attr('data-animate', 'animated '+val);
		effect(true);
	});
};

YrmMore.prototype.changeButtonFontFamily = function() {

	var that = this;
	jQuery('[name="expander-font-family"]').bind("change", function() {
		var val = jQuery(this).find('option:selected').text();
		var element = ".yrm-button-text-span";
		if (typeof that.setButyonFontFamily != "undefined") {
			that.setButyonFontFamily(element, val);
		}
	});
};

YrmMore.prototype.changeHiddenContentFontFamily = function() {

	var that = this;
	jQuery('[name="hidden-content-font-family"]').bind("change", function() {
		var val = jQuery(this).find('option:selected').text();
		var element = ".yrm-inner-content-wrapper";
		if (typeof that.setButyonFontFamily != "undefined") {
			that.setButyonFontFamily(element, val);
		}
	});
};

YrmMore.prototype.addFontFamilyOptionsView = function() {

	jQuery('[name="expander-font-family"]').find('option').each(function() {
		var family = jQuery(this).text();
		jQuery(this).css({'font-family': family})
	})
};

YrmMore.prototype.changeButtonWidth = function() {
	jQuery('.expm-btn-width').change(function() {
		var width = jQuery(this).val();
		jQuery(".yrm-toggle-expand").css({
			"width": width
		});
	});
};

YrmMore.prototype.changeButtonHeight = function() {
	jQuery(".expm-btn-height").change(function() {
		var height = jQuery(this).val();
		jQuery(".yrm-toggle-expand").css({
			"height": height
		});
	});
};

YrmMore.prototype.changeButtonFontSize = function() {
	jQuery('.expm-option-font-size').change(function() {
		var size = jQuery(this).val();
		jQuery(".yrm-button-text-span").css({
			'font-size': size
		})
	});
};

YrmMore.prototype.changeButtonFontWeight = function() {
	jQuery('[name="yrm-btn-font-weight"]').change(function() {
		var fontWeight = jQuery(this).val();
		jQuery(".yrm-button-text-span").css({
			'font-weight': fontWeight
		})
	});
};

YrmMore.prototype.changeBtnBackgroundColor = function() {
	var that = this;
	if(typeof jQuery.fn.minicolors != 'undefined') {
		jQuery('.background-color').minicolors({
			format: 'rgb',
			opacity: 1,
			change: function() {
				var val = jQuery(this).val();
				var element = ".yrm-toggle-expand";
				that.setBackgroundColor(element, val);
			}
		});
	}
};

YrmMore.prototype.changeBorderRadius = function() {

	var that = this;
	jQuery(".btn-border-radius").change(function() {
		
		var value = jQuery(this).val();
		var element = ".yrm-toggle-expand";
		that.setBorderRadius(element, value);
	});
};

YrmMore.prototype.changeBtnTextColor = function() {
	var that = this;
	if(typeof jQuery.fn.minicolors != 'undefined') {
		jQuery(".btn-text-color").minicolors({
			change: function () {
				var val = jQuery(this).val();
				var elemnt = ".yrm-toggle-expand";
				that.setTextColor(elemnt, val);
			}
		});
		jQuery(".btn-hover-color").minicolors({});
	}
};

YrmMore.prototype.changeBtnBorderBottom = function() {
	var that = this;
	if(typeof jQuery.fn.minicolors != 'undefined') {
		jQuery('.yrm-button-bottom-border-color').minicolors({
			change: function () {
				jQuery(window).trigger('yrmChangeBorderBottom');
			}
		});
		jQuery(".btn-hover-color").minicolors({});
	}
	jQuery('[name="yrm-button-bottom-border-style"], #yrm-button-border-bottom, .yrm-button-bottom-border-width').bind('change', function () {
		jQuery(window).trigger('yrmChangeBorderBottom');
	});
};

jQuery(window).bind('yrmChangeBorderBottom', function () {
	var color = jQuery('.yrm-button-bottom-border-color').val();
	var width = jQuery('.yrm-button-bottom-border-width').val();
	var style = jQuery('[name="yrm-button-bottom-border-style"] option:selected').val();
	if (!jQuery('#yrm-button-border-bottom').is(':checked')) {
		width = '0px';
	}

	jQuery('.yrm-button-text-span').css({'border-bottom': width+' '+style+' '+color});
});

YrmMore.prototype.changeHorizontalAligment = function() {

	var that = this;
	jQuery("[name='horizontal']").change(function() {
		var val = jQuery(this).val();
		var element = ".expand-btn-wrappper";
		that.setChengHorizontalAlign(element, val);
	});
};

YrmMore.prototype.changeHiddenContentBgColor = function () {

	if(!jQuery('.hidden-content-bg-color').length || typeof jQuery.fn.minicolors == 'undefined') {
		return;
	}
	var that = this;

	jQuery('.hidden-content-bg-color').minicolors({
		change: function () {
			var val = jQuery(this).val();
			var elemnt = ".yrm-inner-content-wrapper";
			that.setContentBgColor(elemnt, val);
		}
	});
};

YrmMore.prototype.changeHiddenContentPadding = function() {

	var hiddenContent = jQuery('.js-hidden-content-padding');

	if(!hiddenContent) {
		return false;
	}

	hiddenContent.bind('change', function() {
		var padding = parseInt(jQuery(this).val())+'px';
		jQuery('.yrm-inner-content-wrapper').css({'padding': padding});
	});
};

YrmMore.prototype.changeHiddenContentTextColor = function () {

	if(!jQuery('.hidden-content-text-color').length || typeof jQuery.fn.minicolors == 'undefined') {
		return;
	}

	var that = this;

	jQuery('.hidden-content-text-color').minicolors({
		change: function () {
			var val = jQuery(this).val();
			var elemnt = ".yrm-inner-content-wrapper";
			that.setContentTextColor(elemnt, val);
		}
	});
};

YrmMore.prototype.changeButtonTitle = function() {
	var buttonInput = jQuery('.yrm-button-title');

	if(!buttonInput.length) {
		return false;
	}

	buttonInput.bind('input', function() {
		var type = jQuery(this).data('type');
		var value = jQuery(this).val();
		var button = jQuery('.yrm-toggle-expand');
		button.data(type, value);
		var status = jQuery('.yrm-content').data('show-status');

		if(!status && type == 'more') {
			jQuery('.yrm-button-text-span').text(value);
		}
		if(status && type == 'less') {
			jQuery('.yrm-button-text-span').text(value);
		}
	});
};

YrmMore.triggerListener = function () {
	jQuery(window).bind('YrmClose', function (e, args) {
		if (typeof args['currentElement'] != 'undefined') {
			var currentWrapper = args['currentElement'].parent();
			var moreClassName = currentWrapper.data('custom-more-class-name');
			var lessClassName = currentWrapper.data('custom-less-class-name');
			currentWrapper.removeClass(lessClassName).addClass(moreClassName);
		}
	});
	jQuery(window).bind('YrmOpen', function (e, args) {
		if (typeof args['currentElement'] != 'undefined') {
			var currentWrapper = args['currentElement'].parent();
			var moreClassName = currentWrapper.data('custom-more-class-name');
			var lessClassName = currentWrapper.data('custom-less-class-name');
			currentWrapper.removeClass(moreClassName).addClass(lessClassName);
		}
	});
};

YrmMore.prototype.initialMutator = function (data)
{
	if (!data['default-show-hidden-content']) {
		jQuery('.yrm-content-'+this.id).removeAttr('style');
		jQuery('.yrm-content').addClass('yrm-hide').removeClass('yrm-content-hide');
	}
};

jQuery(document).ready(function () {
	YrmMore.triggerListener();
});
