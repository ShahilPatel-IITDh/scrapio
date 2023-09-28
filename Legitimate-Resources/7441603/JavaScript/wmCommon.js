/*********************************************************
  汎用設定
*********************************************************/

// スマートフォンフラグ設定
var handheldFlag = false;
if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|Windows Phone OS|BL-TerminalName-BL-121|PlayStation Portable|PSP BROWSER|Nintendo DSi|compatible; MSIE 6.0; Nitro)/i)){
	handheldFlag = true;
}

// クロスブラウザ対策
var wmcommon = {
	addListener:
		function(element, type, handler) {
			if ( !element ) {
				return false;
			} else if ( element.addEventListener ) {
				element.addEventListener(type, handler, false);
			} else if ( element.attachEvent ) {
				element.attachEvent('on' + type, handler);
			} else {
				return false;
			}
			return true;
		},
	initFocus:
		function() {
			// document.activeElementが利用できないブラウザ対策
			if ( typeof document.activeElement == "undefined" ) {
				document.addEventListener(
					"focus",
					function(event) {
						if ( event.target.nodeType == Node.TEXT_NODE ) {
							document.activeElement = event.target.parentNode;
						} else {
							document.activeElement = event.target;
						}
					},
					false
				);
			}

			// Google Chrome対策(imageボタンがクリックされてもfocusが移らない)
			var allElements = document.getElementsByTagName("input");
			var count = allElements.length;
			for ( index = 0; index < count; index ++ ) {
				var element = allElements[index];
				if ( element.getAttribute("type") == "submit" || element.getAttribute("type") == "image" ) {
					wmcommon.addListener(element, "click", element.focus);
				}
			}
		},
	getForm:
		// 指定したelementが含まれるformのオブジェクトを取得
		function(element) {
			if ( element.tagName.toLowerCase() == "form" ) {
				return element;
			} else {
				return wmcommon.getForm(element.parentNode);
			}
		},
	getKeyCode:
		// キーコード取得
		function(event) {
			if ( document.all ) {
				// IE,Opera
				return event.keyCode;
			} else if ( document.getElementById ) {
				// FireFox
				return ( event.keyCode ) ? event.keyCode : event.charCode;
			} else if ( document.layers ) {
				// Safari
				return event.which;
			}
		}
};

/***** ロード完了時の登録 *****/
wmcommon.addListener(window, "load", wmcommon.initFocus);


/*********************************************************
  ツールチップ表示
*********************************************************/
function balloon(targetId,action){
	if(action == "f"){
		document.getElementById(targetId).style.display = "inline";
	} else if(action == "b"){
		document.getElementById(targetId).style.display = "none";
	} else {
		document.getElementById(targetId).style.display = "none";
	}
}

/*********************************************************
  フェードイン効果
*********************************************************/

var start_opacity = 0; // 透明度の初期値 0〜10(整数)
var end_opacity = 7; // 透明度の終了値 0〜10(整数)
var value_opacity; // 透明度を保持する変数

// クリックイベント
function fade(targetBg,targetObj,flag) {
	// 該当UAの場合は、オブジェクトの表示/非表示の切り替え
	if(handheldFlag){
		if(flag=="in"){
			document.getElementById(targetObj).style.display = "block";
			document.getElementById("main").style.display = "none";
			document.getElementById("short_nav").style.display = "none";
			document.getElementById("settlement_act_funds_link").style.display = "none";
		} else {
			document.getElementById(targetObj).style.display = "none";
			document.getElementById("main").style.display = "block";
			document.getElementById("short_nav").style.display = "block";
			document.getElementById("settlement_act_funds_link").style.display = "block";
		}
		y = document.offsetTop; 
		scrollTo(0,y); 
	// 該当UAでない場合は、フェードアウトでオブジェクトの表示/非表示の切り替え
	} else {
		//透明度を初期化します
		if(flag=="in"){
			document.getElementById(targetBg).style.display = "block";
			value_opacity = start_opacity;
			setOpacityZero(targetBg,targetObj);
		} else {
			value_opacity = end_opacity;
			setOpacityTen(targetBg,targetObj);
		}
	}
	return false;
}

// 透明度が10になるまで+1加算する（タイマー）
function setOpacityZero(targetBg,targetObj) {
	if(value_opacity < end_opacity){
		value_opacity += 1;
		setTimeout("setOpacityZero('" + targetBg + "','" + targetObj + "')",20);
		setOpacity(targetBg,targetObj);
	} else {
		document.getElementById(targetObj).style.display = "block";
	}
}
// 透明度が0になるまで-1する（タイマー）
function setOpacityTen(targetBg,targetObj) {
	if(value_opacity > start_opacity){
		value_opacity -= 1;
		setTimeout("setOpacityTen('" + targetBg + "','" + targetObj + "')",20);
		setOpacity(targetBg,targetObj);
	} else {
		document.getElementById(targetBg).style.display = "none";
		document.getElementById(targetObj).style.display = "none";
	}
}

// 透明度をセットする処理
function setOpacity (targetBg) {
	var elem_target = document.getElementById(targetBg);
	elem_target.style.filter = 'alpha(opacity=' + (value_opacity * 10) + ')';
	elem_target.style.MozOpacity = value_opacity / 10;
	elem_target.style.opacity = value_opacity / 10;
//	obj = document.getElementById("header"); 
	y = document.offsetTop; 
	scrollTo(0,y); 
}


/*********************************************************
  プリペイド番号入力(残高照会)
*********************************************************/

var pnoFocus = {
	bEmp1:true,
	bEmp2:true,
	bEmp3:true,
	bEmp4:true,
	singleFlag:true,
	init:
		function() {
			elements = document.getElementsByTagName("input");
			count = elements.length;
			for ( index = 0; index < count; index ++ ) {
				if(elements[index].id == "pno1" || elements[index].id == "pno2" || elements[index].id == "pno3" || elements[index].id == "pno4" ) {
					wmcommon.addListener(elements[index], 'keyup', pnoFocus.setFocus);
					pnoFocus.singleFlag = false;
				}
				if( elements[index].id == "pno1" ) {
					elements[index].maxLength = "16";
				}
			}
			if(!pnoFocus.singleFlag){
				setTimeout("pnoFocus.timerCheck()",100);
			}
			pnoFocus.firstFocus();
			pnoFocus.clearPnoLoad();
		},
	firstFocus:
		function() {
			if(document.getElementById("pno1")){
			 	document.getElementById("pno1").focus();
			} else if(document.getElementById("pnoStr")) {
			 	document.getElementById("pnoStr").focus();
			}
		},
	setFocus:
		function(event) {
			var srcElement;
			if( navigator.appName == "Netscape" ) {
				srcElement = event.target;
			} else {
				srcElement = event.srcElement;
			}

			if(srcElement.id == "pno1") {
				pnoFocus.changeText1(srcElement.id);
			} else if(srcElement.id == "pno2") {
				pnoFocus.changeText2(srcElement.id);
			} else if(srcElement.id == "pno3") {
				pnoFocus.changeText3(srcElement.id);
			} else if(srcElement.id == "pno4") {
				pnoFocus.changeText4(srcElement.id);
			}
		},
	castScratch:
		function() {
			scratch = document.getElementById("pno1").value + document.getElementById("pno2").value + document.getElementById("pno3").value + document.getElementById("pno4").value;
			document.getElementById("pno1").value = scratch.substring(0,4);
			document.getElementById("pno2").value = scratch.substring(4,8);
			document.getElementById("pno3").value = scratch.substring(8,12);
			document.getElementById("pno4").value = scratch.substring(12,16);
		},
	changeText1:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocus.bEmp1=true;
			}
			if( 4==len && pnoFocus.bEmp1 ){
				pnoFocus.bEmp1=false;
				document.getElementById("pno2").focus();
			}
			if( 4 < len ){
				pnoFocus.castScratch();
				pnoFocus.changeText1("pno1");
				pnoFocus.changeText2("pno2");
				pnoFocus.changeText3("pno3");
				pnoFocus.changeText4("pno4");
			}
		},
	changeText2:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocus.bEmp2=true;
			}
			if( 4<=len && pnoFocus.bEmp2 ){
				pnoFocus.bEmp2=false;
				document.getElementById("pno3").focus();
			}
		},
	changeText3:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocus.bEmp3=true;
			}
			if( 4<=len && pnoFocus.bEmp3 ){
				pnoFocus.bEmp3=false;
				document.getElementById("pno4").focus();
			}
		},
	changeText4:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocus.bEmp4=true;
			}
			if( 4<=len && pnoFocus.bEmp4 ){
				pnoFocus.bEmp4=false;
				if(document.getElementById("btn_settle_pin")) {
					document.getElementById("btn_settle_pin").focus();
				} else if(document.getElementById("btn_prepaid")) {
					document.getElementById("btn_prepaid").focus();
				}
			}
		},
	checkChangeCore:
		function(no,me) {
			if( 4<=document.getElementById(me).value.length && no ) {
				return true;
			}
			return false;
		},
	checkChange:
		function() {
			if( pnoFocus.checkChangeCore(pnoFocus.bEmp1,"pno1") ){
				pnoFocus.changeText1("pno1");
			} else if( pnoFocus.checkChangeCore(pnoFocus.bEmp2,"pno2") ){
				pnoFocus.changeText2("pno2");
			} else if( pnoFocus.checkChangeCore(pnoFocus.bEmp3,"pno3") ){
				pnoFocus.changeText3("pno3");
			} else if( pnoFocus.checkChangeCore(pnoFocus.bEmp4,"pno4") ){
				pnoFocus.changeText4("pno4");
			}
		},
	timerCheck:
		function() {
			pnoFocus.checkChange();
			setTimeout("pnoFocus.timerCheck()",100);
		},
	clearPnoLoad:
		function() {
			var clearBtnobj = document.getElementById("clearBtn");
			wmcommon.addListener(clearBtnobj , 'click' , pnoFocus.clearPno);
		},
	clearPno:
		function() {
			if(document.getElementById("pnoStr")){
				document.getElementById("pnoStr").value = "";
			} else {
				document.getElementById("pno1").value = "";
				document.getElementById("pno2").value = "";
				document.getElementById("pno3").value = "";
				document.getElementById("pno4").value = "";

				pnoFocus.firstFocus();
			}
		}
}
/***** ロード完了時の登録 *****/
/*
wmcommon.addListener(window, "load", pnoFocus.init);
*/
/*********************************************************
  プリペイド番号入力(残高引継)
*********************************************************/

var pnoFocusBefore = {
	bEmp1:true,
	bEmp2:true,
	bEmp3:true,
	bEmp4:true,
	singleFlag:true,
	init:
		function() {
			if(document.getElementById("clearBtn")){
				var clearBtnobj = document.getElementById("clearBtn");
				wmcommon.addListener(clearBtnobj , 'click' , pnoFocusBefore.clearPno);
			}

			elements = document.getElementsByTagName("input");
			count = elements.length;
			for ( index = 0; index < count; index ++ ) {
				if(handheldFlag !== true && ( elements[index].id == "pnoBefore1" || elements[index].id == "pnoBefore2" || elements[index].id == "pnoBefore3" || elements[index].id == "pnoBefore4" )) {
					wmcommon.addListener(elements[index], 'keyup', pnoFocusBefore.setFocus);
					if(elements[index].id == "pnoBefore1") {
						elements[index].maxLength = 16;
					}
					pnoFocusBefore.singleFlag = false;
				}
			}
			if(!pnoFocusBefore.singleFlag){
				setTimeout("pnoFocusBefore.timerCheck()",100);
			}
			pnoFocusBefore.firstFocus();
		},
	firstFocus:
		function() {
			if(document.getElementById("pnoBefore1")){
			 	document.getElementById("pnoBefore1").focus();
			} else if(document.getElementById("pno_str_pre")) {
			 	document.getElementById("pno_str_pre").focus();
			}
		},
	setFocus:
		function(event) {
			var srcElement;
			if( navigator.appName == "Netscape" ) {
				srcElement = event.target;
			} else {
				srcElement = event.srcElement;
			}

			if(srcElement.id == "pnoBefore1") {
				pnoFocusBefore.changeText1(srcElement.id);
			} else if(srcElement.id == "pnoBefore2") {
				pnoFocusBefore.changeText2(srcElement.id);
			} else if(srcElement.id == "pnoBefore3") {
				pnoFocusBefore.changeText3(srcElement.id);
			} else if(srcElement.id == "pnoBefore4") {
				pnoFocusBefore.changeText4(srcElement.id);
			}
		},
	castScratch:
		function() {
			scratch = document.getElementById("pnoBefore1").value + document.getElementById("pnoBefore2").value + document.getElementById("pnoBefore3").value + document.getElementById("pnoBefore4").value;
			document.getElementById("pnoBefore1").value = scratch.substring(0,4);
			document.getElementById("pnoBefore2").value = scratch.substring(4,8);
			document.getElementById("pnoBefore3").value = scratch.substring(8,12);
			document.getElementById("pnoBefore4").value = scratch.substring(12,16);
		},
	changeText1:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocusBefore.bEmp1=true;
			}
			if( 4==len && pnoFocusBefore.bEmp1 ){
				pnoFocusBefore.bEmp1=false;
				document.getElementById("pnoBefore2").focus();
			}
			if( 4 < len ){
				pnoFocusBefore.castScratch();
				pnoFocusBefore.changeText1("pnoBefore1");
				pnoFocusBefore.changeText2("pnoBefore2");
				pnoFocusBefore.changeText3("pnoBefore3");
				pnoFocusBefore.changeText4("pnoBefore4");
			}
		},
	changeText2:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocusBefore.bEmp2=true;
			}
			if( 4<=len && pnoFocusBefore.bEmp2 ){
				pnoFocusBefore.bEmp2=false;
				document.getElementById("pnoBefore3").focus();
			}
		},
	changeText3:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocusBefore.bEmp3=true;
			}
			if( 4<=len && pnoFocusBefore.bEmp3 ){
				pnoFocusBefore.bEmp3=false;
				document.getElementById("pnoBefore4").focus();
			}
		},
	changeText4:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocusBefore.bEmp4=true;
			}
			if( 4<=len && pnoFocusBefore.bEmp4 ){
				pnoFocusBefore.bEmp4=false;
				if(document.getElementById("pnoAfter1")) {
					document.getElementById("pnoAfter1").focus();
				}
			}
		},
	checkChangeCore:
		function(no,me) {
			if( 4<=document.getElementById(me).value.length && no ) {
				return true;
			}
			return false;
		},
	checkChange:
		function() {
			if( pnoFocusBefore.checkChangeCore(pnoFocusBefore.bEmp1,"pnoBefore1") ){
				pnoFocusBefore.changeText1("pnoBefore1");
			}
			else if( pnoFocusBefore.checkChangeCore(pnoFocusBefore.bEmp2,"pnoBefore2") ){
				pnoFocusBefore.changeText2("pnoBefore2");
			}
			else if( pnoFocusBefore.checkChangeCore(pnoFocusBefore.bEmp3,"pnoBefore3") ){
				pnoFocusBefore.changeText3("pnoBefore3");
			}
			else if( pnoFocusBefore.checkChangeCore(pnoFocusBefore.bEmp4,"pnoBefore4") ){
				pnoFocusBefore.changeText4("pnoBefore4");
			}
		},
	timerCheck:
		function() {
			pnoFocusBefore.checkChange();
			setTimeout("pnoFocusBefore.timerCheck()",100);
		},
	clearPno:
		function() {
			if(document.getElementById("pno_str_pre")){
				document.getElementById("pno_str_pre").value = "";
				document.getElementById("pno_str_aft").value = "";
			}
			document.getElementById("pnoBefore1").value = "";
			document.getElementById("pnoBefore2").value = "";
			document.getElementById("pnoBefore3").value = "";
			document.getElementById("pnoBefore4").value = "";
			document.getElementById("pnoAfter1").value = "";
			document.getElementById("pnoAfter2").value = "";
			document.getElementById("pnoAfter3").value = "";
			document.getElementById("pnoAfter4").value = "";
			pnoFocusBefore.bEmp1 = true;
			pnoFocusBefore.bEmp2 = true;
			pnoFocusBefore.bEmp3 = true;
			pnoFocusBefore.bEmp4 = true;
			pnoFocusAfter.bEmp1 = true;
			pnoFocusAfter.bEmp2 = true;
			pnoFocusAfter.bEmp3 = true;
			pnoFocusAfter.bEmp4 = true;

			pnoFocusBefore.firstFocus();
		}
}

var pnoFocusAfter = {
	bEmp1:true,
	bEmp2:true,
	bEmp3:true,
	bEmp4:true,
	singleFlag:true,
	init:
		function() {

			elements = document.getElementsByTagName("input");
			count = elements.length;
			for ( index = 0; index < count; index ++ ) {
				if(handheldFlag !== true && ( elements[index].id == "pnoAfter1" || elements[index].id == "pnoAfter2" || elements[index].id == "pnoAfter3" || elements[index].id == "pnoAfter4" )) {
					wmcommon.addListener(elements[index], 'keyup', pnoFocusAfter.setFocus);
					if(elements[index].id == "pnoAfter1") {
						elements[index].setAttribute("maxLength",16);
					}
					pnoFocusAfter.singleFlag = false;
				}
			}
			if(!pnoFocusAfter.singleFlag){
				setTimeout("pnoFocusAfter.timerCheck()",100);
			}
		},
	firstFocus:
		function() {
			if(document.getElementById("pnoAfter1")){
			 	document.getElementById("pnoAfter1").focus();
			} else if(document.getElementById("pno_str")) {
			 	document.getElementById("pno_str").focus();
			}
		},
	setFocus:
		function(event) {
			var srcElement;
			if( navigator.appName == "Netscape" ) {
				srcElement = event.target;
			} else {
				srcElement = event.srcElement;
			}

			if(srcElement.id == "pnoAfter1") {
				pnoFocusAfter.changeText1(srcElement.id);
			} else if(srcElement.id == "pnoAfter2") {
				pnoFocusAfter.changeText2(srcElement.id);
			} else if(srcElement.id == "pnoAfter3") {
				pnoFocusAfter.changeText3(srcElement.id);
			} else if(srcElement.id == "pnoAfter4") {
				pnoFocusAfter.changeText4(srcElement.id);
			}
		},
	castScratch:
		function() {
			scratch = document.getElementById("pnoAfter1").value + document.getElementById("pnoAfter2").value + document.getElementById("pnoAfter3").value + document.getElementById("pnoAfter4").value;
			document.getElementById("pnoAfter1").value = scratch.substring(0,4);
			document.getElementById("pnoAfter2").value = scratch.substring(4,8);
			document.getElementById("pnoAfter3").value = scratch.substring(8,12);
			document.getElementById("pnoAfter4").value = scratch.substring(12,16);
		},
	changeText1:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocusAfter.bEmp1=true;
			}
			if( 4==len && pnoFocusAfter.bEmp1 ){
				pnoFocusAfter.bEmp1=false;
				document.getElementById("pnoAfter2").focus();
			}
			if( 4 < len ){
				pnoFocusAfter.castScratch();
				pnoFocusAfter.changeText1("pnoAfter1");
				pnoFocusAfter.changeText2("pnoAfter2");
				pnoFocusAfter.changeText3("pnoAfter3");
				pnoFocusAfter.changeText4("pnoAfter4");
			}
		},
	changeText2:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocusAfter.bEmp2=true;
			}
			if( 4<=len && pnoFocusAfter.bEmp2 ){
				pnoFocusAfter.bEmp2=false;
				document.getElementById("pnoAfter3").focus();
			}
		},
	changeText3:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocusAfter.bEmp3=true;
			}
			if( 4<=len && pnoFocusAfter.bEmp3 ){
				pnoFocusAfter.bEmp3=false;
				document.getElementById("pnoAfter4").focus();
			}
		},
	changeText4:
		function(id) {
			len = document.getElementById(id).value.length;
			if( 4>len ) {
				pnoFocusAfter.bEmp4=true;
			}
			if( 4<=len && pnoFocusAfter.bEmp4 ){
				pnoFocusAfter.bEmp4=false;
				if(document.getElementById("submitBtn")) {
					document.getElementById("submitBtn").focus();
				}
			}
		},
	checkChangeCore:
		function(no,me) {
			if( 4<=document.getElementById(me).value.length && no ) {
				return true;
			}
			return false;
		},
	checkChange:
		function() {
			if( pnoFocusAfter.checkChangeCore(pnoFocusAfter.bEmp1,"pnoAfter1") ){
				pnoFocusAfter.changeText1("pnoAfter1");
			}
			else if( pnoFocusAfter.checkChangeCore(pnoFocusAfter.bEmp2,"pnoAfter2") ){
				pnoFocusAfter.changeText2("pnoAfter2");
			}
			else if( pnoFocusAfter.checkChangeCore(pnoFocusAfter.bEmp3,"pnoAfter3") ){
				pnoFocusAfter.changeText3("pnoAfter3");
			}
			else if( pnoFocusAfter.checkChangeCore(pnoFocusAfter.bEmp4,"pnoAfter4") ){
				pnoFocusAfter.changeText4("pnoAfter4");
			}
		},
	timerCheck:
		function() {
			pnoFocusAfter.checkChange();
			setTimeout("pnoFocusAfter.timerCheck()",100);
		}
}
/***** ロード完了時の登録 *****/
/*
wmcommon.addListener(window, "load", pnoFocusBefore.init);
wmcommon.addListener(window, "load", pnoFocusAfter.init);
*/
/*********************************************************
  プリペイド番号整形
*********************************************************/
function pre(str)	{
	for ( cnt = 0 ; cnt < 13 ; cnt += 4 ) {
		document.write("<span class='txt-prepaid'>",str.substr(cnt,4),"</span>");
	}
}

/*********************************************************
  特定端末対応
*********************************************************/
var blCommon = {
	init:
		function() {
			if(!navigator.userAgent.match(/.*BL-TerminalName-BL-121.*/i)){
				return false;
			}
			// 画像ボタンを、submitボタンに変更
			var all = document.getElementsByTagName('input');
			for (var i=0; i<all.length; i++) {
				if(all[i].type == 'image') {
					all[i].removeAttribute('type');
					all[i].removeAttribute('src');
					all[i].setAttribute('type','submit');
					all[i].className = 'btn';
					if(all[i].id.match(/(btn_activatecode|btn_back|btn_cancel)/)) {
						all[i].className = 'btn small';
					}
					// 帯ボタン　文字大
					if(all[i].id.match(/(btn_comp)/)) {
						all[i].className = 'btn bnr large';
					}
					// 戻るボタン　name属性変更
					if(all[i].id.match(/(btn_back)/)) {
						all[i].name = all[i].name + '.x';
					}
				}
			}
			// ボタンリンクを変更
			var all = document.getElementsByTagName('img');
			for (var i=0; i<all.length; i++) {
				var reg = new RegExp(blCommon.blBtnTgt);
				if(all[i].id.match(reg)) {
					var newElement = document.createElement("span"); 
					newElement.innerHTML = all[i].alt;
					newElement.className = 'btn';
					// 文字小
					if(all[i].id.match(/(btn_activatecode|btn_back|btn_cancel)/)) {
						newElement.className = 'btn small';
					}
					// 帯ボタン　文字大
					if(all[i].id.match(/(btn_comp)/)) {
						newElement.className = 'btn bnr large';
					}
					all[i].parentNode.replaceChild(newElement, all[i]);
					i--;
				}
			}
		},
	blinkFlag: false,
	blinkloop:
		function() {
			if ( blCommon.blinkFlag ) {
				blCommon.blinkElm.style.background='#3f3f3f';
				blCommon.blinkFlag = false ;
			} else {
				blCommon.blinkElm.style.background='#7f7f7f';
				blCommon.blinkFlag = true ;
			}
		},
		blBtnTgt: "(btn_activatecode|btn_next|btn_back|btn_cancel|btn_charge_credit|btn_comp|btn_download|btn_prepaid|btn_settle_comp|btn_settle_comp_download|btn_settle_comp_gate|btn_settle_mail_set|btn_settle_pin|btn_settle_sp_new|btn_settle_sp_prev|btn_settle_wallet)"
}
/***** ロード完了時の登録 *****/
wmcommon.addListener(window, "load", blCommon.init);


