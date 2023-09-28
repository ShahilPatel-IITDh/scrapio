// JavaScript Document

//追尾ウィジェット
(function($) {
	$(document).ready(function() {
		/*
		Ads Sidewinder
		by Hamachiya2. https://d.hatena.ne.jp/Hamachiya2/20120820/adsense_sidewinder
		*/
		var main = $('main'); // メインカラムのID
		var side = $('#sidebar'); // サイドバーのID
		var wrapper = $('#widget-tracking'); // 広告を包む要素のID
		
		var x = 767;
		var inner_w = window.innerWidth;
		
		if(x < inner_w){
			if( main.length && side.length && wrapper.length ){ // ページテンプレートで１カラム表示タイプを選んだときのエラー回避
				var sideMargin = {
					top: side.css('margin-top') ? side.css('margin-top') : 0,
					right: side.css('margin-right') ? side.css('margin-right') : 0,
					bottom: side.css('margin-bottom') ? side.css('margin-bottom') : 0,
					left: side.css('margin-left') ? side.css('margin-left') : 0
				};

				var w = $(window);
				var wrapperHeight = wrapper.outerHeight();
				var wrapperTop = wrapper.offset().top;
				var sideLeft = side.offset().left;

				var winLeft;
				var pos;

				var scrollAdjust = function() {
					var sideHeight = side.outerHeight();
					var mainHeight = main.outerHeight();
					var mainAbs = main.offset().top + mainHeight;
					var winTop = w.scrollTop();
					var winLeft = w.scrollLeft();
					var winHeight = w.height();
					var nf = (winTop > wrapperTop) && (mainHeight > sideHeight) ? true : false;
					var pos = !nf ? 'static' : (winTop + wrapperHeight) > mainAbs ? 'absolute' : 'fixed';
					if (pos === 'fixed') {
						side.css({
							position: pos,
							top: '',
							bottom: winHeight - wrapperHeight - 40,
							left: sideLeft - winLeft,
							margin: 0
						});

					} else if (pos === 'absolute') {
						side.css({
							position: pos,
							top: mainAbs - sideHeight,
							bottom: '',
							left: sideLeft,
							margin: 0
						});

					} else {
						side.css({
							position: pos,
							marginTop: sideMargin.top,
							marginRight: sideMargin.right,
							marginBottom: sideMargin.bottom,
							marginLeft: sideMargin.left
						});
					}
				};

				var resizeAdjust = function() {
					side.css({
						position:'static',
						marginTop: sideMargin.top,
						marginRight: sideMargin.right,
						marginBottom: sideMargin.bottom,
						marginLeft: sideMargin.left
					});
					sideLeft = side.offset().left;
					winLeft = w.scrollLeft();
					if (pos === 'fixed') {
						side.css({
							position: pos,
							left: sideLeft - winLeft,
							margin: 0
						});

					} else if (pos === 'absolute') {
						side.css({
							position: pos,
							left: sideLeft,
							margin: 0
						});
					}
				};
				w.on('load', scrollAdjust);
				w.on('scroll', scrollAdjust);
				w.on('resize', resizeAdjust);
			}
		}
	});
})(jQuery);
