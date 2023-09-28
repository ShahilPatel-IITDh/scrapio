function initCountrySelector(){
	var countrySelector = $('#country');
	
	countrySelector.change(function(){
		var sel = $(this);
		var selOpt = sel.find('option:selected');
		
		if(selOpt.val() != ''){
			var phoneCountryCodeField = $('#phone-country-code');
			phoneCountryCodeField.val(selOpt.attr('data-phone-code'));
		}
	});
	
	if(countrySelector.val() != ''){
		countrySelector.change();
	}
}

function initExpandCollapseSections(){
	var triggers = $('a.js-expand-collapse');
	
	triggers.click(function(){
		var trigger = $(this);
		
		if(parseInt(trigger.attr('data-level')) == 1){
			var target = trigger.parent().next();
		}else if(parseInt(trigger.attr('data-level')) == 2){
			var target = trigger.next();
		}
		
		var targetCollapsed = trigger.hasClass('collapsed');
		
		if(targetCollapsed){
			trigger.removeClass('collapsed').addClass('expanded');
			target.slideDown('fast');
		}else{
			trigger.removeClass('expanded').addClass('collapsed');
			target.slideUp('fast');
		}
		
		return false;
	});
}

function resizeHistoryCols(){
	var historyContentCols = $("ul.cols");
	
	if(historyContentCols.width() == 916){
		historyContentCols.find('li:nth-child(3n)').css('margin-right', 0);
	}else if(historyContentCols.width() == 640){
		historyContentCols.find('li:nth-child(2n)').css('margin-right', 0);
	}
}

function initDisplayHelpers(){
	$(window).resize(function(){
		resizeHistoryCols();
	});
}

$(function(){
	initCountrySelector();
	initExpandCollapseSections();	
	initDisplayHelpers();
});