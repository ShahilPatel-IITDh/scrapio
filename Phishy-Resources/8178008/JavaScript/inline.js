
jQuery(function($){

var auto_load = 1;
function globalajax_timer(){

	if(auto_load == 1){
		auto_load = 0;
		
		var param = 'link=%2F';
				
		$('.globalajax_ind').addClass('active');
		$.ajax({
			type: "POST",
			url: "https://evexchange.net/premium_action-globalajax_wp_check.html?meth=post&yid=1ace06117efd&ynd=0&lang=ru",
			dataType: 'json',
			data: param,
			error: function(res, res2, res3){
						console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
				},
			beforeSend: function(res, res2, res3){
							},			
			success: function(res)
			{		
							
				if(res['status'] == 'success'){
					auto_load = 1;						
									}	
				$('.globalajax_ind').removeClass('active');
			}
		});
	}

}	
	setInterval(globalajax_timer, 60000);
	globalajax_timer();
});	
