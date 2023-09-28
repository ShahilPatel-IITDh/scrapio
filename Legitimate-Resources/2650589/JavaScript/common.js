// JavaScript Document


// Androidのユーザーエージェント判別（CSSハック用）
(function($){
	if ( navigator.userAgent.indexOf('Android') > 0 ) {
		$("body").addClass("android");
	}
})(jQuery);


//YouTubeの全画面表示対策
(function($){
	var remove = function(){
		$('#sidebar').removeClass('animate');
	};
	setTimeout(remove, 1700);
})(jQuery);


//トップペ戻るボタン
(function($){
  $(window).scroll(function(){
	  
    var now = $(window).scrollTop();
    //最上部から現在位置までの距離(now)が600以上
    if(now > 600){
      //[#page-top]をゆっくりフェードインする
      $('#page-top').fadeIn('slow');
      //それ以外だったらフェードアウトする
    }else{
      $('#page-top').fadeOut('slow');
    }
  });
  //ボタン(id:move-page-top)のクリックイベント
  $(document).on('click', '.totop', function(){
  //ページトップへ移動する
  $('body,html').animate({
          scrollTop: 0
      }, 200);
  });
})(jQuery);

	
(function($){
	$(window).on('load resize',function(){

		var eventTrigger = $('.tabBtn-mag li');//イベントの引き金となる要素

		//高さの調整
		var parentDiv = $('.toppost-list-box-inner');//高さを与える要素
		var hGet = $('.toppost-list-box .autoheight');//高さを持っている要素
		var childrenH;//height設定用変数の宣言

		eventTrigger.on('click',function(){
			var numver = $(this).index();//クリックされた要素のindex番号を取得
			if($(this).hasClass('first-tab')){
				return;
			}else{
				$('.first-tab').removeClass('first-tab');
				$(this).addClass('first-tab');

				$('.hFind').removeClass('hFind');
				hGet.eq(numver).addClass('hFind');
			}

			//クリックした要素の番号と同じindex番号を持つ子要素の高さを設定
			childrenH = $('.hFind').outerHeight();//高さを取得（marginを含めた）
			parentDiv.css({height:childrenH});//要素の高さを親要素に指定
		});
	});
})(jQuery);



//マガジンタイプのインフィード広告のタブレット端末の非表示設定
(function($){
	$(document).ready(function() {
		var w_Size = window.innerWidth;
		if( w_Size <= 838 ){
			$(".pconly").remove();
		}
	});
})(jQuery);


//シンタックスハイライターの行番号クラスをつける
(function($){
	$(document).ready(function() {
		$('.cps-post-main-box pre').addClass('line-numbers');
	});
})(jQuery);


//アコーディオンボックスの開閉
(function($){
    $('.jin-ac-box01-title').click(function(){
		$(this).toggleClass("open");
        $(this).next().toggleClass("open");
    });
	$('.jin-ac-box02-title').click(function(){
		$(this).toggleClass("open");
        $(this).next().toggleClass("open");
    });
})(jQuery);

/*画像の外部リンクの後ろにアイコンがつかないようにする
(function($){
	$(document).ready(function() {
		$('a').has('img').addClass('remove-icon');
	});
})(jQuery);
*/