
$(document).ready(function() {

	same_height_elems('.row-eq-height > div');

	//Ziskanie maxima a nastavenie pre kazdy element
	function same_height_elems(selector){
		var max = 0;
		$(selector).each(function(){
			if(max < $(this).height()){
				max = $(this).height();
			}
		});

		$(selector).height(max);
	}
	
	// Pridame wrapper nad table pre responzivitu
	$('table').addClass('table').wrap('<div class="table-responsive"></div>');
	$('table.kurz td b').css('padding-left','5px');
	$('iframe.responsive').contents().find('table#cmp_mzdacalc_res_table,table.sc_frm_table').addClass('table').wrap('<div class="table-responsive"></div>');
	var url = "/libs/js/bootstrap/css/bootstrap.min.css";
	$("iframe.responsive").contents().find("head").append($("<link/>", { rel: "stylesheet", href: url, type: "text/css" } ));

	// Obalime do wrapperu ktory ma oveflow-x:scroll;
	$("iframe.responsive").contents().find('#graf1,#graf2').wrap('<div class="overflow_x" style="overflow-x:auto;"></div>');
	$("iframe.responsive").attr('height','1550');

	//otvorenie a zatvorenie sidebaru
	$('.sidebar-opener').click(function(){
		$('#sidebar').toggleClass('open_sidebar');
	});
});