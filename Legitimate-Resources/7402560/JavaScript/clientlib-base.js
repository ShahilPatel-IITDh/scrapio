var blockPanel = $('.block-panel-item');
$(blockPanel).each(function() {
	var elm = $(this);
	$.ajaxSetup({
		// Disable caching of AJAX responses
		cache : false
	});
	var url = elm.data('url');
	var colPC = elm.data('colpc');
	var colSP = elm.data('colsp');
    var layout = " "+colPC+" "+colSP+" ";
	$.ajax({
		url : url,
		type : 'GET',
		async : false,
		dataType : 'html',
		success : function(data) {
			elm.empty();
            var html = "";
			$(data).find('div.promo-item-content').each(function(){
				var category = $(this).data('category');
				html += "<li class='"+category + layout + " is-flex cnts'>";
				html += $(this).html();
                html += "</li>";
			});
            elm.append(html);
			elm.removeAttr('data-url');
		},
		error : function() {
			//
		}
	});
	elm.find('.promo-hidden').each(function(){
		$(this).remove();
	});
});
(function($){
	var widthPagerlist = $('.m-pagerlist');
	widthPagerlist.each(function (index) {
		if ($(this).width() <= 900) {
			$(this).addClass('m-pagerlist-small');
		}
	});
	
	var indentMark = $('.richtext').find('.m-indent_mark');
	indentMark.each(function() {
	    var that = $(this);
	    var iconSclass = that.closest('.richtext');
	    var detectTagHtml = iconSclass.find('p');
	    if(detectTagHtml.length > 0) {
	       that.closest('p').addClass('m-indent');
	    } else {
	       iconSclass.addClass('m-indent');
	    }
	});
	
	setTimeout(function () {
	  	var components = $(".base.aem-GridColumn.aem-GridColumn--default--12");
	  	if(components.length == 0){
	  		components = $(".base.m-GridColumn.m-GridColumn--default--12");
	  	}
	  	components.each(function() {
	          var that = $(this);
	          var classes = that.attr("class");
	          that.attr("class","comp-"+classes);
	      });
	}, 1000);
	
	checkImagePath();
    function checkImagePath(){
        setTimeout(function () {
            var imgAlign = $('img.validate-image-comp');
            imgAlign.each(function() {
                var imagePath = $(this).attr('src');
                if(imagePath == undefined){
					$(this).after('<div>指定された画像のパスは正しくありません。</div>');
                }
            });
        },1000);
    }
	
})(jQuery);
