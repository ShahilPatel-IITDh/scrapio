$(function(){
	$body = $('body');
	$overlay = $('.overlay');
	$gnav = $('.gnav');
	$fixed_btn = $('.fixed_btn');
	$gnav_clone = $('.gnav > ul').clone();
//	$('.drawer .contents_menu').prepend($gnav_clone);
//	$fixed_btn.addClass('appear');
//	$('.gnav > ul > li').on('click',function(e){
//		$(this).find('.sub').slideToggle('fast');
//	});
	$('.sp_btn,.overlay,.btn_close').on('click',function(e){
		if(!$body.hasClass('menu_open')){
			$body.addClass('menu_open');
		}else{
			$body.removeClass('menu_open');
		}
	});
	$('.btn-confirm').on('click',function(e){
		if($(this).hasClass('btn-delete')){
			var msg = 'この内容を削除してよろしいでしょうか？';
			return window.confirm(msg);
		}else if($(this).hasClass('btn-edit')){
	    	var msg = 'この内容で更新いたします。よろしいでしょうか？';
	    	return window.confirm(msg);
		}else if($(this).hasClass('btn-create')){
			var msg = 'この内容で登録します。よろしいでしょうか？';
			return window.confirm(msg);
		}else if($(this).hasClass('alert-send')){
			var msg = 'メッセージを送信しますか？';
			return window.confirm(msg);
		}else if($(this).hasClass('alert-conditions')){
			var msg = '取引条件確認書作成しますか？';
			return window.confirm(msg);
		}else if($(this).hasClass('alert-shipping')){
			var msg = '出荷完了しますか？';
			return window.confirm(msg);
		}else if($(this).hasClass('alert-acceptance')){
			var msg = '受取確認しますか？';
			return window.confirm(msg);
		}else{
			var msg = 'こちらの内容でよろしいでしょうか？';
			return window.confirm(msg);
		}

	});
});
