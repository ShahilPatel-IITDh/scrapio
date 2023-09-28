/**
 * フォーカスの初期設定
 */
function initFocus( formName ){
	obj = document.getElementsByName( formName )[0];
	for(i=0; i<obj.length; i++){
		if( i == 0 ) {
			obj[i].focus();
		}
		obj[i].onkeypress = moveFocus;

		if(obj[i].type == "text" || obj[i].type == "password") {
			obj[i].onfocus = selectText;
			obj[i].onblur = unselectText;
		}
	}
}

/**
 * テキスト選択
 */
function selectText() {
	this.select();
}

/**
 * テキスト選択解除
 */
function unselectText() {
	this.value=this.value;
}

/**
 * エンターキーでフォーカス移動
 */
function moveFocus() {
	var e = arguments[0] || window.event;

	if(e.keyCode == 13) {
		var obj = new Array();
		orgObj = this.form;
		for(i=0,j=0; i<orgObj.length; i++) {
			if(!orgObj[i].disabled) {
				if(orgObj[i].type != "button" && orgObj[i].type != "hidden" ||
					orgObj[i].type == "button" && orgObj[i].name.substring(0,11) == "focusTarget") {
					obj[j++] = orgObj[i];
				}
			}
		}

		for(i=0; i<obj.length; i++) {
			if( obj[i] == this ) {
				if(obj[i].type == "button" && obj[i].name == "focusTarget"){
					return true;
				}else if( i+1 >= obj.length ) {
					obj[0].focus();
				} else {
					obj[i+1].focus();
				}
				break;
			}
		}
		return false;
	}

	return true;
}

/* テキストボックスをMAX桁入力でフォーカス移動するように制御 */
var TextField = new Array();
function chainTextField( objName ) {
	var obj = document.getElementsByName( objName )[0];
	TextField[TextField.length] = obj
	obj.onkeyup=chainTextField_onKeyUp;
}
function chainTextField_onKeyUp(){
	var e = arguments[0] || window.event;

	if( e.keyCode == 32 ||                       // 空白
		(e.keyCode >= 48 && e.keyCode <= 90) ||  // 数字・アルファベット（58-64は未定義）
		(e.keyCode >= 96 && e.keyCode <= 111) || // テンキー（108は未定義）
		(e.keyCoce >= 186 && e.keyCode <= 226 )  // 記号（193-218は未定義）
		){
		if( this.maxLength == this.value.length ) {
			for(i=0; i<TextField.length; i++) {
				if( TextField[i] == this ) {
					if( i+1 >= TextField.length ) {
						TextField[0].focus();
					} else {
						TextField[i+1].focus();
					}
					break;
				}
			}

		}
	}
}

/* チェックボックスの全選択 */
function allSelected(checkboxname) {
	var obj = document.getElementsByName( checkboxname );
	for(i=0; i<obj.length; i++){
		if(obj[i].type="checkbox") {
			obj[i].checked=true;
		}
	}
}
/* チェックボックスの選択解除 */
function allUnSelected(checkboxname) {
	var obj = document.getElementsByName( checkboxname );
	for(i=0; i<obj.length; i++){
		if(obj[i].type="checkbox") {
			obj[i].checked=false;
		}
	}
}
/* チェックボックスの選択判定 */
function chkSelected(checkboxname) {
	var obj = document.getElementsByName( checkboxname );

	for(i=0; i<obj.length; i++){
		if(obj[i].type="checkbox") {
			if( obj[i].checked ) {
				return true;
			}
		}
	}

	return false;
}

/**
 * ２重送信禁止
 */
flg = false;
function checkSend()
{
	if (flg) {
		return false;
	}
	flg = true;

	return true;
}

function goPage(url) {
	if(!checkSend()) return;

	document.location.href=url;
}

function openPage(url, name) {
	window.open(url, name);
}

function closePage() {
	window.close();
}

/**
 * フレームバスティング
 */
function frameBusting() {
	if (window.top != window.self) {
		window.top.location = window.self.location;
	}
}
