/*
Powered by ueeshop.com		http://www.ueeshop.com
å¹¿å·èéç½ç»ç§ææéå¬å¸		020-83226791
*/
var products_list_obj={
	init:function(){
		products_list_obj.price_limit($('#minprice'), $('#maxprice'), $('#submit_btn'));
	},


	price_limit:function(min_obj, max_obj, btn_obj){
		btn_obj.click(function(){
			var url = $(this).next().val(),
				p0 = min_obj.val().replace(/\D*/, ''),
				p1 = max_obj.val().replace(/\D*/, ''),
				p0 = min_obj.val() ? parseFloat(p0) : 0,
				p1 = max_obj.val() ? parseFloat(p1) : 0;

			if (p0 >= 0 && p1 >= 0) {
				if (p0 > p1) {
					min_obj.val(p1);
					max_obj.val(p0);
					p0 = parseFloat(p1),
						p1 = parseFloat(p0);
				}
				if (p0 == 0 && p1 == 0) {
					window.location = url;
				} else {
					window.location=url + '&Price=' + p0 + '-' + p1;
				}
			}
		});
	}
}

products_list_obj.init();