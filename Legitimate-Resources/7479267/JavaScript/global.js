/**
 * 次の入力ボックスにフォーカスを移す。
 * 
 * input要素のmaxlengthに指定した文字数が入力された場合に
 * 次の入力コンポーネントにフォーカスを移します。
 * 
 * @param currentComponent 現在のコンポーネント（this）
 */
function focusNext(currentComponent) {
  
  maxLength = currentComponent.getAttribute('maxlength');
  if (currentComponent.value.length >= maxLength) {
  
    var childNodes = currentComponent.parentNode.childNodes;
    var beforeElement = null;
    var nextComponent = null;
    
    for(i = 0; i < childNodes.length; i++){
      if(childNodes[i].tagName == 'INPUT'){
        if(beforeElement != null && beforeElement.id == currentComponent.id) {
          nextComponent = childNodes[i];
          break;
        }
        beforeElement = childNodes[i];
      }
    }
    if(nextComponent != null){
      nextComponent.focus();
    }
  }
}

//フォーカスを移す
function focusTo(currentComponent, toComponent) {
  maxLength = currentComponent.getAttribute('maxlength');
  if (currentComponent.value.length >= maxLength) {
    currentComponent.parentNode.elements[toComponent].focus();
  }
}


/**
 * 禁則文字一覧画面の表示
 */
function openProhibitCharactersWindowJcb() {
  var uri = '/addrapp/common/error/prohibitCharacters.html';
  var newwin=window.open(uri,'prohibitCharacters',"width=670,height=530,resizable=yes,scrollbars=yes,location=no,menubar=no,left=0,top=0,status=1");
  newwin.opener=self.window;
  newwin.focus();
  return false;
}

/**
 * 禁則文字一覧画面の表示(IY必要？)
 */
function openProhibitCharactersWindowIy() {
  var uri = '/addrapp/common/error/iy/prohibitCharacters.html';
  var newwin=window.open(uri,'prohibitCharacters',"width=670,height=530,resizable=yes,scrollbars=yes,location=no,menubar=no,left=0,top=0,status=1");
  newwin.opener=self.window;
  newwin.focus();
  return false;
}

/**
 * 誤動作防止の為の他ボタン非活性ファンクション
 * @param id 押下されたボタンのid
 */
function allDisable(id) {
    // ページ内のinput要素を取得
    var elements = window.document.getElementsByTagName('input');

    // input要素数分処理を繰り返す
    for (var i = 0; i < elements.length; i++) {
        // 各input要素のでIDが押下したボタンではなく、かつtypeがボタンかsubmitに物を抽出
        var element = elements[i];
        if (element.id != id && (element.type == 'button' || element.type == 'submit')) {
            // 対象ボタンを非活性にする
            element.disabled = 'true';
        } 
    }
}

/**
 * 指定されたKeyのCookieを取得する
 */
function getCookie(key,  tmp1, tmp2, xx1, xx2, xx3) {
    tmp1 = " " + document.cookie + ";";
    xx1 = xx2 = 0;
    len = tmp1.length;
    while (xx1 < len) {
        xx2 = tmp1.indexOf(";", xx1);
        tmp2 = tmp1.substring(xx1 + 1, xx2);
        xx3 = tmp2.indexOf("=");
        if (tmp2.substring(0, xx3) == key) {
            return(unescape(tmp2.substring(xx3 + 1, xx2 - xx1 - 1)));
        }
        xx1 = xx2 + 1;
    }
    return("");
}
/**
 * 指定されたKeyと値のCookieを設定する
 */
function setCookie(key, val, tmp) {
    tmp = key + "=" + escape(val) + "; ";
    // tmp += "path=" + location.pathname + "; ";
    document.cookie = tmp;
}
/**
 * 指定されたKeyのCookieを削除する
 */
function removeCookie(key, val, tmp) {
    tmp = key + "=" + escape(val) + "; ";
    // tmp += "path=" + location.pathname + "; ";
    tmp += "expires=Tue, 31-Dec-1980 23:59:59; ";
    document.cookie = tmp;
}


/**
 * UAがスマホの場合、true
 */
var RegAndroid = new RegExp('^.*Android (?!(1\\.|2\\.[01]))(?!.* SC-01C ).*Mobile.*Safari.*', '');
var RegiPhone  = new RegExp('^.*iPhone OS (?![0-3]_.*).*Safari.*', '');
function isSmp() {
	var ua = navigator.userAgent;
	if (ua.match(RegAndroid)) {
		return true;
	}
	if (ua.match(RegiPhone)) {
		return true;
	}
	return false;
}

/**
 * スマホ画面を表示する幅767px以下の場合、true
 * RWDのスマホ画面表示幅と同じ
 */
function isSpWidth() {
    return window.matchMedia('(max-width: 767px)').matches;
}

/**
 * URLパラメータの取得を行う
 */
function getUrlParam() {
	var param = new Array();
	if (location.search.length > 1) {
		var urlparam = location.search.substr(1).split('&');
		for (var i=0; i<urlparam.length; i++) {
			var val = urlparam[i].split('=');
			param[val[0]] = val[1];
		}
	}
	return param;
}

/**
 * スマホサイトのドメインを設定する
 */
function getRedirectUrl(dsturi) {
	var newuri = getUrl(dsturi);
	return newuri;
}
function getUrl(dsturi) {
	var newuri = '';
	if (dsturi.indexOf('http') < 0) {
		newuri = location.protocol + '//' + location.host;
		if (dsturi.charAt(0) != '/') {
			newuri += '/';
		}
	}
	newuri += dsturi;
	newuri = newuri.replace(':\/\/www\.', ':\/\/sp\.www\.');
	newuri = newuri.replace(':\/\/my\.',  ':\/\/sp\.my\.');

	return newuri;
}

/**
 * Cookieを削除する（ドメイン指定）
 */
function removeSmpCookieForDomain(key, domain) {
	var tmp = key + '=; domain=' + domain + '; path=/; expires=Tue, 31-Dec-1980 23:59:59 GMT; ';
	document.cookie = tmp;
}

/**
 * UAがスマホの場合にJOCで作ったセッションCookieを削除する
 */
function removeSmpSessionCookie() {
	if (!isSmp()) {
		return;
	}
	for (var i=1; i<=6; i++) {
		removeSmpCookieForDomain('ISS' + i, '');
	}
}

/**
 * UAがスマホの場合、スマホリンクを表示する
 */
function displaySmpLink(tagId) {
	if (!isSpWidth()) {
		return;
	}

	// URL取得
	var elmnt  = document.getElementById(tagId);
	if (typeof(elmnt) != 'object' || elmnt.value == null || elmnt.value.length <= 0) {
		return;
	}
	var dsturi = elmnt.value;

	// ブロック要素のアンカーリンク埋め込み(HTML5)
	var con = '<a style="text-decoration: none; cursor: pointer; display: block; " ';
	con += 'onClick="setRwdFlag();" href="' + dsturi + '">';
	con += '<ul style="padding: 5px; text-align: center; width: 938px; border: 1px solid #CCC; background-color: #D0F0FF; clear: both;">';
	con += '<li style="display: inline; font-size: 230%; font-weight: bold; color: red; white-space: nowrap; height: 90px; line-height: 90px;"><img src="/apl/image/common/smartphone-image.gif" width="90px" height="90px" alt="SmartPhone" />スマートフォン専用サイトはこちら ＞</li></ul></a>';
	document.write(con);
}

/**
 * 画面幅がスマホ（767px以下）の場合、dsturiへのリダイレクトを行う
 * modeCheckがtrueの場合はmode=PCが指定されていない場合のみリダイレクトを行う
 * paramKeysにはリダイレクト先に引き継ぐURLパラメータ名を指定
 */
function smpRedirect(dsturi, modeCheck, paramKeys) {
	if (!isSpWidth()) {
		return;
	}
	var param = null;
	if (modeCheck) {
		param = getUrlParam();
		// mode=PC指定がある場合
		if (param['mode'] == 'PC') {
			// スマホ画面でのPC表示判定用の設定を行う。
			if(sessionStorage){
			sessionStorage.setItem('pc_flag','true');
			}
			// リダイレクトを行わない
			return;
		}
		// mode=PC指定がない場合、スマホ画面でのPC表示判定を行う。
		if (sessionStorage && sessionStorage.getItem('pc_flag')=='true') {
			//リダイレクトを行わない
			return;
		}
	}
	var urlPlus = "";
	if (paramKeys != null && paramKeys.length > 0) {
		// URLパラメータを引き継ぐ
		if (param == null) {
			param = getUrlParam();
		}
		var question = false;
		if (dsturi.indexOf('?') >= 0) {
			question = true;
		}
		for (var i=0; i<paramKeys.length; i++) {
			if (question == false) {
				urlPlus += '?';
				question = true;
			}
			else {
				urlPlus += '&';
			}
			urlPlus += paramKeys[i];
			urlPlus += '=';
			urlPlus += param[paramKeys[i]];
		}
	}
	location.href = (dsturi + urlPlus);
}

/**
 * 画面幅がスマホ（767px以下）であり、mode=PC指定がある場合、dsturiへのリダイレクトを行う
 * paramKeysにはリダイレクト先に引き継ぐURLパラメータ名を指定
 */
function modePcRedirect(dsturi, paramKeys) {
	if (!isSpWidth()) {
		return;
	}
	var param = getUrlParam();
	// mode=PC指定がない場合
	if (param['mode'] != 'PC') {
		// sessionStorageにPC表示判定用の設定がない場合
		if (!(sessionStorage && sessionStorage.getItem('pc_flag')=='true')) {
			// リダイレクトを行わない
			return;
		}
	}
	// mode=PC指定がある場合、スマホ画面でのPC表示判定用の設定を行う。
	else {
		if(sessionStorage){
			sessionStorage.setItem('pc_flag','true');
		}
	}

	var urlPlus = "";
	if (paramKeys != null && paramKeys.length > 0) {
		// URLパラメータを引き継ぐ
		if (param == null) {
			param = getUrlParam();
		}
		var question = false;
		if (dsturi.indexOf('?') >= 0) {
			question = true;
		}
		for (var i=0; i<paramKeys.length; i++) {
			if (question == false) {
				urlPlus += '?';
				question = true;
			}
			else {
				urlPlus += '&';
			}
			urlPlus += paramKeys[i];
			urlPlus += '=';
			urlPlus += param[paramKeys[i]];
		}
	}
	location.href = (dsturi + urlPlus);
}

/**
 * 画面幅がスマホ以外（768px以上）の場合、dsturiへのリダイレクトを行う
 * paramKeysにはリダイレクト先に引き継ぐURLパラメータ名を指定
 */
function pcRedirect(dsturi, paramKeys) {
	if (isSpWidth()) {
		return;
	}
	var param = null;
	var url = dsturi;
	var urlPlus = "";
	if (paramKeys != null && paramKeys.length > 0) {
		// URLパラメータを引き継ぐ
		if (param == null) {
			param = getUrlParam();
		}
		var question = false;
		if (url.indexOf('?') >= 0) {
			question = true;
		}
		for (var i=0; i<paramKeys.length; i++) {
			if (question == false) {
				urlPlus += '?';
				question = true;
			}
			else {
				urlPlus += '&';
			}
			urlPlus += paramKeys[i];
			urlPlus += '=';
			urlPlus += param[paramKeys[i]];
		}
	}
	location.href = (url + urlPlus);
}

/**
 * スマホ画面へ遷移する際、
 * RWD画面でのPC判定用フラグにfalseを設定する。
 */
function setRwdFlag() {
	if(sessionStorage){
		sessionStorage.setItem('pc_flag','false');
	}
}

/**
 * iPhone/iPad/iPod の メジャーバージョン を取得する
 */
function getIOSVersionNumber() {
	var ua = navigator.userAgent;
	var version = "0";
	if(/\(iPhone/.test(ua)) {
		ua.match(/iPhone OS (\d+)/g);
		version = RegExp.$1;
	} else if(/\(iPad/.test(ua)) {
		ua.match(/CPU OS (\d+)/g);
		version = RegExp.$1;
	} else if(/\(iPod/.test(ua)) {
		ua.match(/iPhone OS (\d+)/g);
		version = RegExp.$1;
	}
	if (version == "") {
		version = "1";
	}
	return Number(version);
}

