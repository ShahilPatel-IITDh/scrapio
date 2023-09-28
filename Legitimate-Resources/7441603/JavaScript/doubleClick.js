/************************************************
 * 
 * 二重処理防止措置
 * 
 ************************************************/

var doubleClick = {
	bDisappearButton: true,
	bAlreadySubmit: false,
	setDisappearButton:
		function(flag) {
			doubleClick.bDisappearButton = flag;
		},
	init:
		function() {
			var ua = navigator.userAgent;
			if ( ua.search(/^(Mozilla.+FOMA.+|Mozilla.+KDDI.+|Mozilla.+SoftBank.+|Mozilla.+NetFront.+|Mozilla.+KYOCERA.+|Mozilla\/5.0 \(PLAYSTATION 3; 1.00\))/) != -1 ) {
				// docomo PCサイトビューア対応
				var elements = document.getElementsByTagName("form");
				var count = elements.length;
				for ( index = 0; index < count; index ++ ) {
					wmcommon.addListener(elements[index], 'submit', doubleClick.ezSubmit);
				}
				return;
			}
		
			var elements = document.getElementsByTagName("form");
			var count = elements.length;
			for ( index = 0; index < count; index ++ ) {
//				var element = elements[index];
				wmcommon.addListener(elements[index], 'submit', doubleClick.submit);
			}
			
			elements = document.getElementsByTagName("input");
			count = elements.length;
			for ( index = 0; index < count; index ++ ) {
				wmcommon.addListener(elements[index], 'keypress', doubleClick.keypress);
				if ( elements[index].getAttribute("type") == "submit" || elements[index].getAttribute("type") == "image" ) {
					wmcommon.addListener(elements[index], 'click', doubleClick.clickSubmit);
				}
			}
		},
	ezSubmit:
		function() {
			if( bAlreadySubmit == false ) {
				bAlreadySubmit = true;
				return true;
			}
			else{
				alert("送信中です。お待ちください。");
			}
			return false;
		},
	submit:
		function() {
			var allElements = document.getElementsByTagName("input");
			var count = allElements.length;
			if ( doubleClick.bDisappearButton == true ) {
				for ( index = 0; index < count; index ++ ) {
					var element = allElements[index];
					if ( element.getAttribute("type") == "submit" || element.getAttribute("type") == "image" ) {
						element.disabled = "true";
						element.style.display = "none";
/*
						if(navigator.appName!="Netscape"){ // Netscape（Mozillaを含む）は、type="image"のボタン情報がsubmit時に送られなくなるため
							element.style.display = "none";
						}
*/
					}
				}
			}
			return true;
		},
	keypress:
		function(event) {
			if ( wmcommon.getKeyCode(event) == 13 ) {
				// Enterキーが押された場合
//				alert("KEYPRESS:" + document.activeElement.name);
				if ( typeof document.activeElement == "undefined" ) {
					// Safari3はactiveElementの救済策も効かないため最初に見つかったsubmitボタンを利用
					doubleClick.clickSubmitButton(document.firstChild);
				} else {
					doubleClick.clickSubmitButton(document.activeElement);
				}
				return false;
			}
		},
	clickSubmit:
		function(event) {
//			alert("CLICK SUBMIT:" + document.activeElement.name);
//			doubleClick.clickSubmitButton(document.activeElement);
			if ( typeof event.target != "undefined" ) {
				doubleClick.clickSubmitButton(event.target);
			} else {
				doubleClick.clickSubmitButton(document.activeElement);
			}
			return true;
		},
	clickSubmitButton:
		function(element) {
			if ( element == null || doubleClick.bAlreadySubmit ) {
				return;
			}
			
			var target = element;
			while( target != null ) {
				if ( target.nodeType != 1 ) {
					target = target.nextSibling;
					continue;
				}

				var submitButton = doubleClick.findSubmitButton(target);
				if ( submitButton != null ) {
					var formObject = wmcommon.getForm(submitButton);
					var hiddenObject1 = formObject.firstChild;
					var hiddenOjbect2 = hiddenObject1.nextSibling;
					if ( hiddenObject1.tagName != "input" ) {
						if ( hiddenObject1.id != "JS_Submit" ) {
							// submitボタン用hidden element追加
							var newObject1 = document.createElement("input");
							newObject1.setAttribute("type", "hidden");
							newObject1.setAttribute("id", "JS_Submit");
							formObject.insertBefore(newObject1, hiddenObject1);
							hiddenObject2 = newObject1;
							// imageボタン用hidden element追加
							newObject2 = document.createElement("input");
							newObject2.setAttribute("type", "hidden");
							newObject2.setAttribute("id", "JS_Submit");
							formObject.insertBefore(newObject2, hiddenObject2);
							hiddenObject1 = newObject2;
						}
					}
					hiddenObject1.setAttribute("name", submitButton.name + ".x");
					hiddenObject1.setAttribute("value", "0");
					hiddenObject2.setAttribute("name", submitButton.name);
					hiddenObject2.setAttribute("value", submitButton.value);
					
					doubleClick.bAlreadySubmit = true; // IEでは下のclick()でclickSubmitがcallされるため多重submit防止の対策をしておく
					submitButton.click();
					return true;
				}
				target = target.nextSibling;
			}
			
			while ( ( newTarget = element.parentNode.nextSibling ) == null ) {
				element = element.parentNode;
			}
			doubleClick.clickSubmitButton(newTarget);
		},
	findSubmitButton:
		function(element) {
			if ( element == null ) {
				return null;
			}

			if ( element.nodeType == 1 ) {
				if (
					element.getAttribute("type") == "submit" ||
					element.getAttribute("type") == "image"
				) {
//					alert("found submit button:" + element.name);
					return element;
				}

				if ( element.hasChildNodes() ) {
					var submitButton = doubleClick.findSubmitButton(element.firstChild);
					if ( submitButton != null ) {
						return submitButton;
					}
				}
			}
			return doubleClick.findSubmitButton(element.nextSibling);
		}
};

/***** ロード完了時の登録 *****/
wmcommon.addListener(window, "load", doubleClick.init);
