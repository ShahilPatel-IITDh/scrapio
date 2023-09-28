// JavaScript Document

//見出し用JINオリジナルアイコンの読み込み
(function($){
	$(document).ready(function() {
		//チェック
		$('.jin-h2-icons.jin-checkicon-h2 h2,.jin-h3-icons.jin-checkicon-h3 h3,.jin-h4-icons.jin-checkicon-h4 h4').prepend('<i class="jic jin-ifont-check"></i>');
		//チェック丸
		$('.jin-h2-icons.jin-checkcircleicon-h2 h2,.jin-h3-icons.jin-checkcircleicon-h3 h3,.jin-h4-icons.jin-checkcircleicon-h4 h4').prepend('<i class="jic jin-ifont-checkcircle"></i>');
		//クローバー
		$('.jin-h2-icons.jin-clovericon-h2 h2,.jin-h3-icons.jin-clovericon-h3 h3,.jin-h4-icons.jin-clovericon-h4 h4').prepend('<i class="jic jin-ifont-clover"></i>');
		//ブックマーク
		$('.jin-h2-icons.jin-bookmarkicon-h2 h2,.jin-h3-icons.jin-bookmarkicon-h3 h3,.jin-h4-icons.jin-bookmarkicon-h4 h4').prepend('<i class="jic jin-ifont-bookmark"></i>');
	});
})(jQuery);