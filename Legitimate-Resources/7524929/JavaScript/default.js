
/*
 * Focus to next or previous CR response field
 * 
 * If the CR field is empty and backspace has been hitted
 * by the user, it will go back to the previous field.
 * 
 * @param that the current element where the event occured
 * @param event the occured event
 * */
function focusNextWhenFullOrEmpty(that,event) { 
	if( getCaret(that) == that.maxLength ){
		var elems = that.form.elements;
		var i= selectCurrentElem(elems, that);
		setFocus(elems[i + 1]);
		return;
	}
	
	if( getCaret(that) == 0 && 
			event.keyCode == 8 && that.value.length == 0){
		var elems = that.form.elements;
		var i= selectCurrentElem(elems, that);
		setFocus(elems[i-1]);
		return;
	}
	
}

/*
 * Set the focus on the preferred input text element
 * This solution works with IE also.
 * 
 * @param input the textfield what we would lile to focus.
 * */
function setFocus(input){
	if (input != null && input.value.length != 0){
		if (input.createTextRange) {
			var FieldRange = input.createTextRange();
			FieldRange.moveStart('character',input.value.length);
			FieldRange.collapse();
			FieldRange.select();
		}
		else{
			input.focus();
		}
	}
	else{
		input.focus();
	}
}

/*
 * Get Caret position of input text
 * 
 * This Solution supports every browser
 * like IE8-IE10, FF,Chrome
 * 
 * @param that The input text field.
 * */
function getCaret(that) { 
	if (that.selectionStart) { 
		return that.selectionStart; 
	}
	else if (document.selection) {
		that.focus(); 

		var r = document.selection.createRange(); 
		if (r == null) { 
			return 0;
		}

		var re = that.createTextRange(),
			rc = re.duplicate(); 

		re.moveToBookmark(r.getBookmark());
		rc.setEndPoint('EndToStart', re);

		return rc.text.length; 
	}

	return 0;
}

/*
 * Select current HTML Element
 * 
 * @param elems the list of html elements
 * @param the preferred html element
 * @return the position of the html element in the list.
 * */
function selectCurrentElem(elems,that){
	var i=0;
	for (i=0; i<elems.length; i++) {
		if (elems[i] == that) {
			break;
		}
	}
	return i;
}

/*
 * Uppercase the target value.
 * that: the target
 * */
function upperCaseContent(that){
	setTimeout(function() {
		that.value = that.value.toUpperCase()
	}, 50);
}

function hasCssClass(el, cssClass) {
	var re = new RegExp('(?:^|\\s)' + cssClass + '(?!\\S)', 'g');
	return !!el.className.match(re);
}

function removeCssClass(el, cssClass) {
	var re = new RegExp('(?:^|\\s)' + cssClass + '(?!\\S)', 'g');
	el.className = el.className.replace(re, '');
}

function addCssClass(el, cssClass) {
	if (hasCssClass(el, cssClass)) {
		return;
	}
	el.className += ' ' + cssClass;
}

// password strength
function updatePasswordStrengthIndicator(that, htmlId,qualityvalue) {
	var pw = that.value;
	var strength = 0;
	if (pw.length) {
		strength = cgvCheckPwQuality(pw);
	}

	// mark field as (in)valid
	var isInvalid = (strength == 1);
	//validateFieldMarkAsInvalid(that.id, isInvalid, '');
	var qualityArray = qualityvalue.split(",");
	var quality;
	switch(strength) {
		case 2:
			quality = qualityArray[1];
			break;
		case 3:
			quality = qualityArray[2];
			break;
		case 1:
			quality = qualityArray[0];
			break;
		default:
			quality = '';
	}
	var cssClass = 'strength' + strength;
	var pwsiEl = document.getElementById(htmlId);
	removeCssClass(pwsiEl, 'strength\\d');
	addCssClass(pwsiEl, cssClass);
	document.getElementById("passquality").innerHTML=quality;
} 

// client-side validation
function validateFieldSameAs(that, htmlId, message) {
	var sameAsEl = document.getElementById(htmlId);
	var sameAs = sameAsEl.value;
	validateFieldMarkAsInvalid(that.id, that.value != sameAs, message);
}

function validateFieldMarkAsInvalid(htmlId, isInvalid, message) {
	if (isInvalid) {
		uwr.input.message("#" + htmlId, { type: "warning", message: message, tooltip: false });
	} else {
		uwr.input.message("#" + htmlId, { type: "no-message", message: "", tooltip: false });
	}
}

// numpad popup
function numpadShow(numpadHtmlId) {
	var numpadEl = document.getElementById(numpadHtmlId);
	removeCssClass(numpadEl, 'hidden');
}

function numpadHide(numpad){
	$(document).mouseup(function (e){;
		if (numpad.has(e.target).length === 0){
		numpad.parent().addClass("hidden");
		}
	});
}

// numpad click event handler
function numpadClick(inputHtmlId, numpadHtmlId, btnTitle) {
	var inputEl = document.getElementById(inputHtmlId);
	if (btnTitle == 'DEL') {
		// backspace button
		inputEl.value = inputEl.value.substr(0, inputEl.value.length - 1);
	} else if (btnTitle == 'OK') {
		// done button
		var numpadEl = document.getElementById(numpadHtmlId);
		addCssClass(numpadEl, 'hidden');
	} else {
		// number button pressed
		// make sure to respect maxlength
		if (inputEl.value.length == inputEl.maxLength) {
			return;
		}
		inputEl.value += btnTitle;
	}
}

//RegExList
var lowerCaseRegEx = "[a-z]";
var upperCaseRegEx = "[A-Z]";
var numberRegEx = "[0-9]";
var specialCharRegEx = "[<(+&!$*);\\-,%_>?:#@={}./]";
var whiteSpaceRegEx = "[\\s]";
var pwRegex = new Array();
pwRegex[0] = new RegExp(lowerCaseRegEx);
pwRegex[1] = new RegExp(upperCaseRegEx);
pwRegex[2] = new RegExp(numberRegEx);
pwRegex[3] = new RegExp(specialCharRegEx);
var whiteSpaceRegExFunction = new RegExp(whiteSpaceRegEx);

// Check the password quality
// returns 0 if password is empty
//         1 if password does not meet the requirements
//         2 if password is valid
//         3 if password is strong (8+ chars long and has all four char groups)
function cgvCheckPwQuality(pw) {
	var countPatternsOk = 0;
	var passwordLength = pw.length;
	var lengthOk = passwordLength >= 7 && passwordLength <= 32;

	// No whitespace characters are allowed
	if (whiteSpaceRegExFunction.test(pw)) {
		return 1;
	}

	// Validate illegal characters
	for ( var i = 0; i < pw.length; i++) {
		var actualChar = pw.charAt(i);
		var valid = false;
		for ( var j = 0; j < pwRegex.length; j++) {
			if (pwRegex[j] && pwRegex[j].test(actualChar)) {
				valid = true;
				break;
			}
		}
		if (!valid) {
			return 1;
		}
	}
	
	if (isConsecutiveNumbers (pw, 6)) {
		return 1;
	}
		

	// validate character group counts
	for ( var i = 0; i < pwRegex.length; i++) {
		if (pwRegex[i] && pwRegex[i].test(pw)) {
			countPatternsOk++;
		}
	}

	if (pw.length == 0) {
		return 0;
	} else if (!lengthOk || countPatternsOk < 3) {
		return 1;
	} else if (pw.length >= 8 && countPatternsOk >= 4) {
		return 3;
	} else if (lengthOk && countPatternsOk >= 3) {
		return 2;
	}

	return 1;
}

function isConsecutiveNumbers (pw, checkRange) {
	if (pw.length < checkRange) {
		return false;
	}
	consecutives = true;

	for (var i = 0; i < checkRange-1; i++) {
		if (isNumber(pw.charAt(i)) && isNumber(pw.charAt(i+1))){
			if (parseInt(pw.charAt(i)) + 1 != parseInt(pw.charAt(i+1))) {
				consecutives = false;
				break;
			}
		}else{
			return false;
		}
	}
		
	return consecutives;
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function getMaskEl() {
	var mask = document.getElementById('uwr-modal-dialog-mask');
	return mask;
}

function showModalMask() {
	$("#uwr-modal-dialog-mask").addClass("uwr-modal-dialog-mask-visible");
	$(".cuiHeadline.lr-headline").addClass("uwr-dialog-popup");
	
	if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|Mobile)/i)){
		fitModalMaskToScreen();
	}
}

function isMaskShown() {
	var mask = getMaskEl();
	return hasCssClass(mask, 'uwr-modal-dialog-mask-visible');
}

// Support for old browsers
function lrGetElementsByClassName(clazz, rootNode, tag) {
	rootNode = rootNode || document.body;

	// Native check
	if (document.getElementsByClassName) {
		return rootNode.getElementsByClassName(clazz);
	}

	// Checking with querySelector (standard mode of Internet Explorer 8)
	if (rootNode.querySelectorAll) {
		tag = tag || '';
		return rootNode.querySelectorAll(tag + '.' + clazz);
	}

	// Checking for other browsers
	var tag = tag || '*', tempTagsArray = rootNode.getElementsByTagName(tag), nodeArray = [];
	for ( var index = 0, tempTag; tempTag = tempTagsArray[index++];) {
		if (hasClass(tempTag, clazz)) {
			nodeArray.push(tempTag);
		}
	}
	return nodeArray;
}

function dialogRules(dialogName) {
	if (dialogName == 'ZticAuthSignDialog' || dialogName == 'ZticSaveAppidAndContractNr' || dialogName == 'ZticNoCard' || dialogName == 'ZticSupportCodeDialog') {
		// in order to not block ubswidgets from initializing (which happens async) and to allow resources to load. See: UBSCA-2846
		uwr.ready(function () {
				$('form[name="TheAuthForm1"]').submit();
		});
	}
	if (dialogName == 'ZticFWUpdate') {
		document.location.href = $('#FirmwareImgLink').attr('href');
	}
}

function disableFormElements(links,numpadIcon){
	links.removeAttr("href").css({'cursor':'default'});
	numpadIcon.attr('onclick','return false;').css({'cursor':'default'});
}

/*
 * Show confirmationBox on the corresponding Ztic's pages, before the submit
 * oldForm: The Original form - jQuery Object
 * content: The content what will be shown before the submit
 * 
 * The submit handler will be triggered if the button on the form is clicked
 * or other source will trigger the submit event.
 * In the body of the handler during the submit handling the oldForm content will be hidden
 * and the target content will be shown. 
 * The original event will be prevented and stopped to not
 * propagate to the parent handler.
 * The original form declaration contains name="submit" button, and that is forbidden and
 * there is no chance to trigger the event programatically with the original form.
 * The original submit button will be replaced with same hidden input (value).
 * THis will be appended into the original form and submitted with the call function through a new form. 
 * setTimeout with 0 applied to put the submit handling to the end of the browser event Queue.
 * */
function showConfirmationBox(oldForm, content, langLinks){	
	$.browser.safari = ($.browser.webkit && !(/chrome/.test(navigator.userAgent.toLowerCase())));
	
	if ($.browser.safari) {
		extSubmitHandler(oldForm, content, langLinks);
	}
	else {
		baseSubmitHandler(oldForm, content, langLinks);
	}
}

function baseSubmitHandler(oldForm, content, langLinks){
	oldForm.submit(function(e){
		langLinks.remove();
		oldForm.children().css("display","none");
		content.css("display","block");
		// to add the confirm class to differentiate display image
		$(".lr-illustration").addClass('confirm');
		$("#div_operatinginfo_box").css("display","none");
		return true;
	});
}

function extSubmitHandler(oldForm, content, langLinks){
	oldForm.submit(function(e){
		e.preventDefault();	
		e.stopPropagation();
		
		langLinks.remove();
		oldForm.children().css("display","none");
		content.css("display","block");
		// to add the confirm class to differentiate display image
		$(".lr-illustration").addClass('confirm');
		$("#div_operatinginfo_box").css("display","none");
		
		setTimeout(function(){
			document.createElement('form').submit.call(oldForm[0]);
		},0);
			
	});
}

function getContractNumberAndFetch(from,to){
	to.val(from.val());
	
	from.bind('keyup',function(){
		to.val(from.val());
		if($('#lr-input-contact ~ span').hasClass('uwr-input-label-bottom')){
			$('#lr-input-contact ~ span').removeClass('uwr-input-label-bottom');
			$('#lr-input-contact ~ span').addClass('uwr-input-label-top');
		}
	});
}

function ubsDropdownMenu(menu, menuStyle){
	var hoverCssClass = menuStyle;
	var animationTimeout = 300; // ms
	var animationDuration = 500; 
	var menuTimer = false;
	var menuStateOn = false;
	var doAnim = function() {
		var el = that.find('ul');
		el.stop();
		if (menuStateOn) {
			el.slideDown(animationDuration);
		} else {
			el.slideUp(animationDuration);
		}
		menuTimer = false;
		
	}
	menu.hover(
		function() {
			// hover in
			var that = $(this);
			that.addClass(hoverCssClass);
			menuStateOn = true;
			if (menuTimer) {
				clearTimeout(menuTimer);
			}
			menuTimer = setTimeout(function() {
				var el = that.find('ul');
				el.stop();
				if (menuStateOn) {
					el.slideDown(animationDuration);
				} else {
					el.slideUp(animationDuration);
				}
				menuTimer = false;
				
			}, animationTimeout);
		},
		function() {
			// hover out
			var that = $(this);
			that.removeClass(hoverCssClass);
			menuStateOn = false;
			if (menuTimer) {
				clearTimeout(menuTimer);
			}
			menuTimer = setTimeout(function() {
				var el = that.find('ul');
				el.stop();
				if (menuStateOn) {
					el.slideDown(animationDuration);
				} else {
					el.slideUp(animationDuration);
				}
				menuTimer = false;
				
			}, animationTimeout);
		}
	);
}

/*
 * Open a new Help window
 * 
 * @param url The target url
 * @param event the occured event
 * */
function showHelpWnd(url, event){
	if(event.preventDefault) {
		event.preventDefault();	
	}
	else{
		event.returnValue=false;
	}
	
	var rightMargin = screen.availWidth * 0.02;
    var widthInt = (screen.availWidth * 0.65) - rightMargin;
    var heightInt = screen.availHeight * 0.65;
    var leftInt = screen.availWidth-widthInt-rightMargin;
    var topInt = 50;
    var sParam = "location=no,toolbar=yes,menubar=no,status=no,scrollbars=yes," +
    		"resizable=yes,left=" + leftInt + ",top=" + topInt + ",width=" + widthInt + ",height=" + heightInt;
    var strWnd="ubs_userguide";
    var helpWinRef = window.open(url, strWnd, sParam);
    if(helpWinRef.focus) {
        helpWinRef.focus();
    }
}

function mobileCRFrame(pwFrame){
	var $cursor=$('.cursor');
	
	pwFrame.on('focus',function(){	
	    var $this = $(this),
	        act = ['','','','','','','',''];
	        
	    /* clear the field on click/focus */
	    $this.val('');
	    setTimeout(function(){
	    	$this.css('width','5px');
	    },0); /* settimeout is workaround for ipad 1 */
	    
	    setValues(act);
	    
	    if (/Android/.test(navigator.userAgent)) { 
	    	/* cursor set to proper pos for android */
	    	$cursor.addClass('active');
	    } 
	    setTimeout(function(){
	    	poscursor($cursor,0,1);
	    },0);  /* settimeout is workaround for ipad 1 */
	    
	}).on('blur',function(){

	    var $this = $(this);
	    $this.css('width','135px');
	    
	    if(/Android/.test(navigator.userAgent)) { 
	    	/* cursor set to proper pos for android */
	    	$cursor.removeClass('active');
		}

	}).on('keyup',function(e){

	    var $this = $(this),
	        key = String.fromCharCode(e.keyCode),
	        act = ['','','','','','','',''];
	    	    
	    if($this.val().length >= 8) {
	      $this.val($this.val().substr(0,8));
	      $this.blur();
	    } 
	    
	    var chars = $this.val().split(""),
	        cLen = chars.length;
	        
	    for(var i=0; i<cLen; i++) {
	        act[i] = chars[i];
	    }
	    
	    setValues(act);
	    poscursor($cursor,cLen,(e.keyCode == 8 ? 1 : 2));
	});	
}

function setValues(act) {	
	 /* fill the html containers */
	for(var i=1; i<9;i++){
		$('.c'+i).html(act[i-1].toUpperCase());
	}    
	/* fill the hidden inputs to the auth */
	for(var i=1;i<5;i++){
		$('#p'+i).val(act[(i*2)-2].toUpperCase()+act[(i*2)-1].toUpperCase());
	}
}

function poscursor(cursor,cLen,type) {

    var pwLeft = $('.lr-CRFrame').offset().left+4,
        cElement = $('.c'+cLen),
        cLeft = (cLen ? cElement.offset().left + cElement.width() : pwLeft);
        
    if(type == 2 ) {
        var pLeft = (cLen<8 && cLen/2 == parseInt(cLen/2,10) ? $('.p'+((cLen/2)+1)).offset().left+4 : pwLeft);
        cLeft = (cLen/2 == parseInt(cLen/2,10) ? pLeft : cLeft);
    }
    
    cursor.css('left',cLeft-pwLeft+4);
    $('#pwf').css('left',cLeft-pwLeft);
}

/*
 * Add logic which resize the modal mask to overlay the whole
 * screen.
 * 
 * */
function fitModalMaskToScreen(){
	$(window).resize(function(){
		var bodyHeight = $(document).height() + "px";
		var bodyWidth = $(document).width() + "px"; 
		$('#uwr-modal-dialog-mask').css({'width': bodyWidth, 'height': bodyHeight});
	});
}
