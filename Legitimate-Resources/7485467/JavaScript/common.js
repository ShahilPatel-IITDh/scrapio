/*=========================================================================
 cookie plugin

 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html

=========================================================================*/


jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};


/*=========================================================================
 Page Top
=========================================================================*/

$(function() {
	var topBtn = $('#pageTop');
	topBtn.hide();
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 100) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});
  topBtn.on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});


/*=========================================================================
高さを揃える
=========================================================================*/
(function($) {
	$.fn.tile = function(columns) {
		var tiles, max, c, h, last = this.length - 1, s;
		if(!columns) columns = this.length;
		this.each(function() {
			s = this.style;
			if(s.removeProperty) s.removeProperty("height");
			else if(s.removeAttribute) s.removeAttribute("height");
		});
		return this.each(function(i) {
			c = i % columns;
			if(c == 0) tiles = [];
			tiles[c] = $(this);
			h = tiles[c].height();
			if(c == 0 || h > max) max = h;
			if(i == last || c == columns - 1)
				$.each(tiles, function() { this.height(max); });
		});
	};
})(jQuery);



/*=========================================================================
以下ローカル編集用のためＵＰ時削除
=========================================================================*/

/*=========================================================================
header
=========================================================================*/
function headergnav(){
	var headergnav = '';
	headergnav += '<ul id="header_gnav">';
	headergnav += '<li><a class="nav1" href="/index.html">TOP</a></li>';
	headergnav += '<li><a class="nav3" href="https://wallet.auone.jp/contents/pc/guide/">ご利用ガイド</a></li>';
	headergnav += '<li><a class="nav4" href="https://wallet.auone.jp/contents/pc/help/">ヘルプ</a></li>';
	headergnav += '</ul>';
	document.write(headergnav);
}

/*=========================================================================
userinfo
=========================================================================*/
function prepaid(){//プリペ
	var prepaid = '';
	prepaid += '<dl>';
	prepaid += '<dt><ul class="prepaid"><li>プリペイドカード</li></ul></dt>';
	prepaid += '<dt>残高</dt>';
	prepaid += '<dd>';
	prepaid += '<p>5,000<span class="pt1">円</span></p>';
	prepaid += '</dd>';
	prepaid += '<dd class="note">';
	prepaid += '<a href="#" class=" ff_n"><span class="note"><span class="triangle"></span>チャージ</span></a>';
	prepaid += '</dd>';
	prepaid += '<dd class="note">';
	prepaid += '<a href="#" class=" ff_n"><span class="note"><span class="triangle"></span>メニュー</span></a>';
	prepaid += '</dd>';
	prepaid += '</dl>';
//	prepaid += '<a href="" class="side_btn">お買いもの履歴照会</a>';
	document.write(prepaid);
}
function credit(){//クレカ
	var credit = '';
	credit += '<dl>';
	credit += '<dt><ul class="credit"><li>クレジットカード</li></ul></dt>';
	credit += '<dt>○月○日ご請求予定額</dt>';
	credit += '<dd>';
	credit += '<p>14,000<span class="pt1">円</span></p>';
	credit += '</dd>';
	credit += '<dd class="note">';
	credit += '<a href="#"><span class="note"><span class="triangle"></span>請求明細照会</span></a>';
	credit += '</dd>';
	credit += '<dd class="note">';
	credit += '<a href="#"><span class="note"><span class="triangle"></span>お支払方法変更</span></a>';
	credit += '</dd>';
	credit += '</dl>';
	document.write(credit);
}
function credit_prepaid(){//クレカプリペじぶん銀行連携で便利な使い方
	var credit_prepaid = '';
	credit_prepaid += '<dl>';
	credit_prepaid += '<dt><ul class="prepaid"><li>プリペイドカード</li></ul></dt>';
	credit_prepaid += '<dt>残高</dt>';
	credit_prepaid += '<dd>';
	credit_prepaid += '<p>5,000<span class="pt1">円</span></p>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>チャージ（入金）</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>メニュー一覧</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>じぶん銀行連携で便利な使い方</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dt><ul class="credit"><li>クレジットカード</li></ul></dt>';
	credit_prepaid += '<dt>○月○日ご請求予定額</dt>';
	credit_prepaid += '<dd>';
	credit_prepaid += '<p>14,000,000,000<span class="pt1">円</span></p>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>請求明細照会</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>お支払方法変更</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '</dl>';
	credit_prepaid += '</dl>';
	document.write(credit_prepaid);
}

function credit_prepaidchu(){//クレカプリペじぶん銀行連携申込み中
	var credit_prepaid = '';
	credit_prepaid += '<dl>';
	credit_prepaid += '<dt><ul class="prepaid"><li>プリペイドカード</li></ul></dt>';
	credit_prepaid += '<dt>残高</dt>';
	credit_prepaid += '<dd>';
	credit_prepaid += '<p>5,000<span class="pt1">円</span></p>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>チャージ（入金）</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>メニュー一覧</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>じぶん銀行連携申込み中</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dt><ul class="credit"><li>クレジットカード</li></ul></dt>';
	credit_prepaid += '<dt>○月○日ご請求予定額</dt>';
	credit_prepaid += '<dd>';
	credit_prepaid += '<p>14,000,000,000<span class="pt1">円</span></p>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>請求明細照会</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>お支払方法変更</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '</dl>';
	credit_prepaid += '</dl>';
	document.write(credit_prepaid);
}

function credit_prepaid_3(){//クレカプリペ
	var credit_prepaid_3 = '';
	credit_prepaid_3 += '<dl>';
	credit_prepaid_3 += '<dt><ul class="prepaid"><li>プリペイドカード</li></ul></dt>';
	credit_prepaid_3 += '<dt>残高</dt>';
	credit_prepaid_3 += '<dd>';
	credit_prepaid_3 += '<p>739<span class="pt1">円</span></p>';
	credit_prepaid_3 += '</dd>';
	credit_prepaid_3 += '<dd class="note">';
	credit_prepaid_3 += '<a href="#"><span class="note"><span class="triangle"></span>チャージ・出金</span></a>';
	credit_prepaid_3 += '</dd>';
	credit_prepaid_3 += '<dd class="note">';
	credit_prepaid_3 += '<a href="#"><span class="note"><span class="triangle"></span>メニュー一覧</span></a>';
	//credit_prepaid_3 += '</dd>';
	//credit_prepaid_3 += '<dd class="note">';
	//credit_prepaid_3 += '<a href="#"><span class="note"><span class="triangle"></span>送金</span></a>';
	//credit_prepaid_3 += '</dd>';
	//credit_prepaid_3 += '<dd class="note">';
	//credit_prepaid_3 += '<a href="#"><span class="note"><span class="triangle"></span>払出</span></a>';
	credit_prepaid_3 += '</dd>';
	credit_prepaid_3 += '<dt><ul class="credit"><li>クレジットカード</li></ul></dt>';
	credit_prepaid_3 += '<dt>○月○日ご請求予定額</dt>';
	credit_prepaid_3 += '<dd>';
	credit_prepaid_3 += '<p>14,000,000,000<span class="pt1">円</span></p>';
	credit_prepaid_3 += '</dd>';
	credit_prepaid_3 += '<dd class="note">';
	credit_prepaid_3 += '<a href="#"><span class="note"><span class="triangle"></span>請求明細照会</span></a>';
	credit_prepaid_3 += '</dd>';
	credit_prepaid_3 += '<dd class="note">';
	credit_prepaid_3 += '<a href="#"><span class="note"><span class="triangle"></span>お支払方法変更</span></a>';
	credit_prepaid_3 += '</dd>';
	credit_prepaid_3 += '</dl>';
	credit_prepaid_3 += '</dl>';
	document.write(credit_prepaid_3);
}


function credit_gold(){//ゴールド
	var credit = '';
	credit += '<dl>';
	credit += '<dt><ul class="credit_gold"><li>ゴールドカード</li></ul></dt>';
	credit += '<dt>○月○日ご請求予定額</dt>';
	credit += '<dd>';
	credit += '<p>14,000<span class="pt1">円</span></p>';
	credit += '</dd>';
	credit += '<dd class="note">';
	credit += '<a href="#"><span class="note"><span class="triangle"></span>請求明細照会</span></a>';
	credit += '</dd>';
	credit += '<dd class="note">';
	credit += '<a href="#"><span class="note"><span class="triangle"></span>お支払方法変更</span></a>';
	credit += '</dd>';
	credit += '</dl>';
	document.write(credit);
}
function credit_prepaid_gold(){//ゴールドプリペ
	var credit_prepaid = '';
	credit_prepaid += '<dl>';
	credit_prepaid += '<dt><ul class="prepaid"><li>プリペイドカード</li></ul></dt>';
	credit_prepaid += '<dt>残高</dt>';
	credit_prepaid += '<dd>';
	credit_prepaid += '<p>739<span class="pt1">円</span></p>';
	credit_prepaid += '</dd>';


	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>チャージ（入金）</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>メニュー一覧</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dt><ul class="credit_gold"><li>ゴールドカード</li></ul></dt>';
	credit_prepaid += '<dt>○月○日ご請求予定額</dt>';
	credit_prepaid += '<dd>';
	credit_prepaid += '<p>14,000,000,000<span class="pt1">円</span></p>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>請求明細照会</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '<dd class="note">';
	credit_prepaid += '<a href="#"><span class="note"><span class="triangle"></span>お支払方法変更</span></a>';
	credit_prepaid += '</dd>';
	credit_prepaid += '</dl>';
	document.write(credit_prepaid);
}
function credit_prepaid_2(){//クレカプリペ
	var credit_prepaid_2 = '';
	credit_prepaid_2 += '<dl>';
	credit_prepaid_2 += '<dt><ul class="prepaid"><li>プリペイドカード</li></ul></dt>';
	credit_prepaid_2 += '<dt>残高</dt>';
	credit_prepaid_2 += '<dd>';
	credit_prepaid_2 += '<p>5,000<span class="pt1">円</span></p>';
	credit_prepaid_2 += '</dd>';
	credit_prepaid_2 += '<dd class="note">';
	credit_prepaid_2 += '<a href="#"><span class="note"><span class="triangle"></span>チャージ（入金）</span></a>';
	credit_prepaid_2 += '</dd>';
	credit_prepaid_2 += '<dd class="note">';
	credit_prepaid_2 += '<a href="#"><span class="note"><span class="triangle"></span>メニュー一覧</span></a>';
	credit_prepaid_2 += '</dd>';
	credit_prepaid_2 += '<dt><ul class="credit"><li>クレジットカード</li></ul></dt>';
	credit_prepaid_2 += '<dd>';
	credit_prepaid_2 += '<p>32,534<span class="pt1">円</span></p>';
	credit_prepaid_2 += '</dd>';
	credit_prepaid_2 += '<dd class="note">';
	credit_prepaid_2 += '<a href="#"><span class="note"><span class="triangle"></span>請求明細照会</span></a>';
	credit_prepaid_2 += '</dd>';
	credit_prepaid_2 += '<dd class="note">';
	credit_prepaid_2 += '<a href="#"><span class="note"><span class="triangle"></span>お支払方法変更</span></a>';
	credit_prepaid_2 += '</dd>';
	credit_prepaid_2 += '</dl>';
	document.write(credit_prepaid_2);
}
function point(){
	var point = '';
	point += '<dl>';
	point += '<dt><ul class="point"><li>ポイント</li></ul></dt>';
	point += '<dd>';
	point += '<p>13,152<span class="pt1">P</span></p>';
	point += '</dd>';
	point += '<div class="userinfo_t_box"><p class="txt_r mb5"><span class="fc_red">200P</span>が4/30で失効します</p></div>';
	point += '<dd class="note">';
	point += '<a href="#"><span class="note"><span class="triangle"></span>ポイント明細</span></a>';
	point += '</dd>';
	point += '<dd class="note">';
	point += '<a href="#"><span class="note"><span class="triangle"></span>ポイントを使う</span></a>';
	point += '</dd>';
	point += '<dd class="note">';
	point += '<a href="#"><span class="note"><span class="triangle"></span>ポイントを貯める</span></a>';
	point += '</dd>';
	point += '</dl>';
	document.write(point);
}
function point_0(){
	var point_0 = '';
	point_0 += '<dl>';
	point_0 += '<dt><ul class="point"><li>ポイント</li></ul></dt>';
	point_0 += '<dd>';
	point_0 += '<p>-----<span class="pt1">P</span></p>';
	point_0 += '</dd>';
	point_0 += '</dl>';
	document.write(point_0);
}
function payment(){
	var payment = '';
	payment += '<dl>';
	payment += '<dt><ul class="payment"><li>auかんたん決済</li></ul></dt>';
	payment += '<dt>ご利用可能額</dt>';
	payment += '<dd class="bb_reset">';
	payment += '<p>77,138<span class="pt1">円</span></p>';
	payment += '</dd>';
	payment += '<dt>チャージ可能額</dt>';
	payment += '<dd>';
	payment += '<p>58,000<span class="pt1">円</span></p>';
	payment += '</dd>';
	payment += '<dd class="note">';
	payment += '<a href="#"><span class="note"><span class="triangle"></span>auかんたん決済でチャージ</span></a>';
	payment += '</dd>';
	payment += '<dd class="note">';
	payment += '<a href="#"><span class="note"><span class="triangle"></span>詳細はこちら</span></a>';
	payment += '</dd>';
	payment += '</dl>';
	payment += '<a href="" class="side_btn">入出金履歴照会</a>';
	document.write(payment);
}

function payment_2(){
	var payment_2 = '';
	payment_2 += '<dl>';
	payment_2 += '<dt><ul class="payment"><li>auかんたん決済</li></ul></dt>';
	payment_2 += '<dd>';
	payment_2 += '<p style="font-size:16px;">情報を更新する</p>';
	payment_2 += '<dd class="note">';
	payment_2 += '<a href="#"><span class="note"><span class="triangle"></span>auかんたん決済でチャージ</span></a>';
	payment_2 += '</dd>';

	payment_2 += '<dd class="note">';
	payment_2 += '<a href="#"><span class="note"><span class="triangle"></span>詳細はこちら</span></a>';
	payment_2 += '</dd>';
	payment_2 += '</dl>';
	payment_2 += '<a href="" class="side_btn">入出金履歴照会</a>';
	document.write(payment_2);
}

function jibunbank(){
	var jibunbank = '';
	jibunbank += '<dl>';
	jibunbank += '<dt><ul class="payment"><li>じぶん銀行</li></ul></dt>';
	jibunbank += '<dd class="bb_reset">';
	jibunbank += '<p style="font-size:16px;">情報を更新する</p>';
	jibunbank += '</dd>';
	document.write(jibunbank);
}

function jigin(){//じぶん銀行
	var jigin = '';
	jigin += '<dl>';
	jigin += '<dt><ul class="jigin"><li>じぶん銀行</li></ul></dt>';
	jigin += '<dd></dd>';
	jigin += '<dd class="note">';
	jigin += '<a href="#" class=" ff_n"><span class="note"><span class="triangle"></span>口座開設・本人確認登録</span></a>';
	jigin += '</dd>';
	jigin += '</dl>';
//	jigin += '<a href="" class="side_btn">text</a>';
	document.write(jigin);
}

function jiginapp(){//じぶん銀行 口座開設後・申し込み中
	var jiginapp = '';
	jiginapp += '<dl>';
	jiginapp += '<dt><ul class="jigin"><li>じぶん銀行</li></ul></dt>';
	jiginapp += '<dd></dd>';
	jiginapp += '<dd class="note">';
	jiginapp += '<a href="#" class=" ff_n"><span class="note"><span class="triangle"></span>口座申し込み中</span></a>';
	jiginapp += '</dd>';
	jiginapp += '</dl>';
//	jigin += '<a href="" class="side_btn">text</a>';
	document.write(jiginapp);
}


function jigin_3(){//じぶん銀行
	var jigin_3 = '';
	jigin_3 += '<dl>';
	jigin_3 += '<dt><ul class="jigin"><li>じぶん銀行</li></ul></dt>';
	jigin_3 += '<dt>残高</dt>';
	jigin_3 += '<dd>';
	jigin_3 += '<p>5,000<span class="pt1">円</span></p>';
	jigin_3 += '</dd>';
	jigin_3 += '<dd class="note">';
	jigin_3 += '<a href="#" class=" ff_n"><span class="note"><span class="triangle"></span>入出金履歴照会</span></a>';
	jigin_3 += '</dd>';
	jigin_3 += '<dd class="note">';
	jigin_3 += '<a href="#" class=" ff_n"><span class="note"><span class="triangle"></span>メニュー</span></a>';
	jigin_3 += '</dd>';
	jigin_3 += '</dl>';
//	jigin += '<a href="" class="side_btn">text</a>';
	document.write(jigin_3);
}


/*=========================================================================
localNav
=========================================================================*/
function localNav(){//クレカプリペ
	var navigation = '';
	// navigation += '<p class="localNav_ttl">プリペイドカード</p>';
	// navigation += '<ul id="localNav">';
	// navigation += '<li><a href="" class="lnav1">チャージ（入金）</a></li>';
	// navigation += '<li><a href="" class="lnav2">メニュー一覧</a></li>';
	// navigation += '</ul>';

//	navigation += '<p class="localNav_ttl">クレジットカード</p>';
//	navigation += '<ul id="localNav">';
//	 navigation += '<li><a href="" class="lnav1">支払い方法変更</a></li>';
//	navigation += '<li><a href="" class="lnav2">メニュー一覧</a></li>';
//	navigation += '</ul>';

	// navigation += '<p class="localNav_ttl">ポイント</p>';
	// navigation += '<ul id="localNav">';
	// navigation += '<li><a href="" class="lnav1">ポイントを使う</a></li>';
	// navigation += '<li><a href="" class="lnav2">ポイントを貯める</a></li>';
	// navigation += '<li><a href="" class="lnav3">ポイントアップ店</a></li>';
	// navigation += '</ul>';

	navigation += '<p class="localNav_ttl">WALLETマーケット</p>';
	navigation += '<ul id="localNav" class="mb40">';
	navigation += '<li><a href="" class="lnav1">TOP</a></li>';
	navigation += '<li><a href="" class="lnav2">新着</a></li>';
	navigation += '</ul>';
	document.write(navigation);
}

function localNav_credit(){//クレカプリペ
	var navigation_credit = '';
	navigation_credit += '<p class="localNav_ttl">プリペイドカード</p>';
	navigation_credit += '<ul id="localNav">';
	navigation_credit += '<li><a href="" class="lnav1">チャージ（入金）</a></li>';
	navigation_credit += '<li><a href="" class="lnav2">メニュー一覧</a></li>';
	navigation_credit += '</ul>';

//	navigation_credit += '<p class="localNav_ttl">クレジットカード</p>';
//	navigation_credit += '<ul id="localNav">';
//	navigation_credit += '<li><a href="" class="lnav2">メニュー一覧</a></li>';
//	navigation_credit += '</ul>';

	navigation_credit += '<p class="localNav_ttl">ポイント</p>';
	navigation_credit += '<ul id="localNav">';
	navigation_credit += '<li><a href="" class="lnav1">ポイントを使う</a></li>';
	navigation_credit += '<li><a href="" class="lnav2">ポイントを貯める</a></li>';
	navigation_credit += '<li><a href="" class="lnav3">ポイントアップ店</a></li>';
	navigation_credit += '</ul>';

	navigation += '<p class="localNav_ttl">WALLETマーケット</p>';
	navigation += '<ul id="localNav" class="mb40">';
	navigation += '<li><a href="" class="lnav1">TOP</a></li>';
	navigation += '<li><a href="" class="lnav2">新着</a></li>';
	navigation += '</ul>';
	document.write(navigation_credit);
}

function localNav_credit_c(){//クレカ
	var navigation_credit_c = '';
//	navigation_credit_c += '<p class="localNav_ttl">プリペイドカード</p>';
//	navigation_credit_c += '<ul id="localNav">';
//	navigation_credit_c += '<li><a href="" class="lnav2">メニュー一覧</a></li>';
//	navigation_credit_c += '</ul>';

//	navigation_credit_c += '<p class="localNav_ttl">クレジットカード</p>';
//	navigation_credit_c += '<ul id="localNav">';
//	navigation_credit_c += '<li><a href="" class="lnav2">メニュー一覧</a></li>';
//	navigation_credit_c += '</ul>';

	navigation_credit_c += '<p class="localNav_ttl">ポイント</p>';
	navigation_credit_c += '<ul id="localNav">';
	navigation_credit_c += '<li><a href="" class="lnav1">ポイントを使う</a></li>';
	navigation_credit_c += '<li><a href="" class="lnav2">ポイントを貯める</a></li>';
	navigation_credit_c += '<li><a href="" class="lnav3">ポイントアップ店</a></li>';
	navigation_credit_c += '</ul>';

	navigation += '<p class="localNav_ttl">WALLETマーケット</p>';
	navigation += '<ul id="localNav" class="mb40">';
	navigation += '<li><a href="" class="lnav1">TOP</a></li>';
	navigation += '<li><a href="" class="lnav2">新着</a></li>';
	navigation += '</ul>';
	document.write(navigation_credit_c);
}

function localNav_prepaid(){//プリペ
	var navigation_prepaid = '';
	navigation_prepaid += '<p class="localNav_ttl">プリペイドカード</p>';
	navigation_prepaid += '<ul id="localNav">';
	navigation_prepaid += '<li><a href="" class="lnav1">チャージ（入金）</a></li>';
	navigation_prepaid += '<li><a href="" class="lnav2">メニュー一覧</a></li>';
	navigation_prepaid += '</ul>';

	navigation_prepaid += '<p class="localNav_ttl">ポイント</p>';
	navigation_prepaid += '<ul id="localNav">';
	navigation_prepaid += '<li><a href="" class="lnav1">ポイントを使う</a></li>';
	navigation_prepaid += '<li><a href="" class="lnav2">ポイントを貯める</a></li>';
	navigation_prepaid += '<li><a href="" class="lnav3">ポイントアップ店</a></li>';
	navigation_prepaid += '</ul>';

	navigation += '<p class="localNav_ttl">WALLETマーケット</p>';
	navigation += '<ul id="localNav" class="mb40">';
	navigation += '<li><a href="" class="lnav1">TOP</a></li>';
	navigation += '<li><a href="" class="lnav2">新着</a></li>';
	navigation += '</ul>';
	document.write(navigation_prepaid);
}

/*=========================================================================
Footer
=========================================================================*/
function footerSnav(){
	var footerSnav = '';
	footerSnav += '<ul>';
	footerSnav += '<li><a href="/contents/pc/lost/index.html"><div>紛失・盗難</div></a></li>';
	footerSnav += '<li><a href="/contents/pc/support/index.html"><div>お問い合わせ</div></a></li>';
	footerSnav += '<li><a href="http://auone.jp/"><div>au Webポータル</div></a></li>';
	footerSnav += '<li><a href="https://id.auone.jp/"><div>au ID</div></a></li> ';
	footerSnav += '</ul>';

	document.write(footerSnav);
}

function footer(){
	var footer = '';
	footer += '<div class="inner">';
	footer += '<h2>KDDI</h2>';
	footer += '<nav>';
	footer += '<ul id="footerNav">';
	footer += '<li><a href="https://connect.auone.jp/net/vw/cca_eu_net/cca?ID=ENET0209" target="_blank">利用規約</a></li>';
	footer += '<li><a href="http://www.kddi.com/corporate/kddi/kokai/kojin/index.html?bid=au_ft_0008" target="_blank">プライバシーポリシー</a></li>';
	footer += '<li><a href="http://www.kddi.com/site_policy/index.html?bid=au_ft_0009">免責事項</a></li>';
	footer += '<li class="logout"><a href="#">ログアウト</a></li>';
	footer += '</ul>';
	footer += '</nav>';
	footer += '<div id="copyright">';
	footer += '<h3>KDDI株式会社</h3>';
	footer += '<p>Copyright © KDDI CORPORATION, All Rights Reserved.</p>';
	footer += '</div>';
	footer += '</div>';
	document.write(footer);
}

function footer2(){
	var footer = '';
	footer += '<div class="inner">';
	footer += '<h2>KDDI</h2>';
	footer += '<nav>';
	footer += '<ul id="footerNav">';
	footer += '<li><a href="https://connect.auone.jp/net/vw/cca_eu_net/cca?ID=ENET0209" target="_blank">利用規約</a></li>';
	footer += '<li><a href="http://www.kddi.com/corporate/kddi/kokai/kojin/index.html?bid=au_ft_0008" target="_blank">プライバシーポリシー</a></li>';
	footer += '<li><a href="http://www.kddi.com/site_policy/index.html?bid=au_ft_0009">免責事項</a></li>';
	footer += '</ul>';
	footer += '</nav>';
	footer += '<div id="copyright">';
	footer += '<h3>KDDI株式会社</h3>';
	footer += '<p>Copyright © KDDI CORPORATION, All Rights Reserved.</p>';
	footer += '</div>';
	footer += '</div>';
	document.write(footer);
}
/*=========================================================================
menu/mailsetting_set.htmlにて削除項目があるため
=========================================================================*/
$(function() {
  var urlload = location.href;
  if (urlload.indexOf('/menu/mailsetting_set.html') != -1) {
    $('#wmSettlementUsable').parent('label').css('display','none');
    $('#wmSettlementErrUsable').parent('label').css('display','none');
  }
});

/**
 * Form送信用の共通関数
 * @param {string} formId 送信するFormのID 必須
 * @param {string} actionUrl action属性に設定するURL 省略可
 */
 function formSubmit(formId, actionUrl) {
  if (typeof actionUrl !== 'undefined' && actionUrl !== '') {
    $(formId).attr('action', actionUrl);
  }
  $(formId).submit();
}

/**
 * Form送信ボタン非活性化の共通関数
 * orange, grayなどの共通クラスが使われている場合はそれも切り替え
 * @param {string|array} submitElement 非活性化したいボタンの要素のclass,id
 * @param {string} isButton クラスの切り替え判定用フラグ 省略可
 */
 function submitDisable(submitElement, isButton) {
  if (typeof isButton === 'undefined') {
    isButton = false;
  }

  if (Array.isArray(submitElement)) {
    for (var i = 0; i < submitElement.length; i++) {
      if ($(submitElement[i])[0]) {
        $(submitElement[i]).addClass('btn_disabled');
      }
    }

    if (isButton) {
      for (var i = 0; i < submitElement.length; i++) {
        addGrayOff(submitElement[i]);
      }
    }
  } else {
    if ($(submitElement)[0]) {
      $(submitElement).addClass('btn_disabled');
    }

    if (isButton) {
      addGrayOff(submitElement);
    }
  }
}

/**
 * Form送信ボタンクラス切り替えの共通関数
 * orange, gray, whiteの共通クラスが使われている場合、gray_offに切り替える
 * @param {string} submitElement 非活性化したいボタンの要素のclass,id
 */
function addGrayOff(submitElement) {
  if ($(submitElement).hasClass('orange')) {
    $(submitElement).removeClass('orange').addClass('gray_off');
  }
  if ($(submitElement).hasClass('gray')) {
    $(submitElement).removeClass('gray').addClass('gray_off');
  }
  if ($(submitElement).hasClass('white')) {
    $(submitElement).removeClass('white').addClass('gray_off');
  }
}
