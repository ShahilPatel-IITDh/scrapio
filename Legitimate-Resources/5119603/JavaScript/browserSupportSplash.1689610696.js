// this is a generated file, please edit the source if you need to make changes
(function browserSupport(){
var browserRegex=/Edge?\/(10[3-9]|1[1-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Firefox\/(10[2-9]|1[1-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Chrom(ium|e)\/(8[7-9]|9\d|\d{3,})\.\d+(\.\d+|)|Maci.+ Version\/(15\.\d+|(1[6-9]|[2-9]\d|\d{3,})\.\d+)([,.]\d+|)( \(\w+\)|)( Mobile\/\w+|) Safari\/|Chrome.+OPR\/(89|9\d|\d{3,})\.\d+\.\d+|(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS|CPU iPad OS)[ +]+(14[._]([5-9]|\d{2,})|(1[5-9]|[2-9]\d|\d{3,})[._]\d+)([._]\d+|)|Opera Mini|Android:?[ /-](10[7-9]|1[1-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Mobile Safari.+OPR\/(7[3-9]|[89]\d|\d{3,})\.\d+\.\d+|Android.+Firefox\/(1{2}[5-9]|1[2-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+Chrom(ium|e)\/(1{2}[4-9]|1[2-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+(UC? ?Browser|UCWEB|U3)[ /]?(15\.([5-9]|\d{2,})|(1[6-9]|[2-9]\d|\d{3,})\.\d+)\.\d+|SamsungBrowser\/(10\.([1-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+)|Android.+MQ{2}Browser\/(13(\.([1-9]|\d{2,})|)|(1[4-9]|[2-9]\d|\d{3,})(\.\d+|))(\.\d+|)|K[Aa][Ii]OS\/(2\.([5-9]|\d{2,})|([3-9]|\d{2,})\.\d+)(\.\d+|)/;
var isBrowserSupported = function() {return browserRegex.test(navigator.userAgent);};
var bsPop = document.getElementById('browserSupportPop');
var minutes = 15;
var now = new Date();
now.setMinutes(now.getMinutes() + minutes);
var cookieDef = {
	name: 'browserStatus',
	value: 'outdated',
	expires: now.toUTCString(),
	sameSite: 'None',
	secure: true,
};

function closeModal() {
	bsPop.style.display = 'none';
}

var hasCookie = checkForCookie();

if (bsPop && !isBrowserSupported() && !hasCookie) {
	// console.log('Browser is not supported');

	var bsWrapper = createElements();
	bsPop.appendChild(bsWrapper);

	bsPop.addEventListener('click', function(event){
		var target = event ? event.target : window.event.srcElement;
		console.info('triggering click event');
		if (target.id === "browserSupportPop"){
			console.info('browserSupportPop target');
			closeModal();
		}
	});

	bsPop.style.display = '';

	createCookie();
} 
// else {
// 	console.log('Browser is supported');
// }

function createElements() {
	// create wrapper and closeButton
	var bsWrapper = document.createElement('div');
	bsWrapper.id = 'bsWrapper';
	bsWrapper.className = 'bg-colors-white-text p-20';
	var closeButton = createCloseButton();
	bsWrapper.appendChild(closeButton);

	// create main text
	var mainText = createMainText();
	bsWrapper.appendChild(mainText);

	// create the logos
	var logoContainer = createLogoContainer();
	bsWrapper.appendChild(logoContainer);

	// return
	return bsWrapper;
}

function createCloseButton() {
	// create elements
	var bsCloseButtonWrapper = document.createElement('div');
	var closeBSModal = document.createElement('button');
	var closeImg = document.createElement('img');

	// assign properties
	bsCloseButtonWrapper.id = 'bsCloseButtonWrapper';
	bsCloseButtonWrapper.className = 'flex justify-end';
	closeBSModal.id = 'closeBSModal';
	closeBSModal.type = 'button';
	closeBSModal.tabIndex = 0;
	closeBSModal.setAttribute('aria-label', 'Close Modal');
	closeImg.src = 'https://www.powerequipmentdirect.com/images/icons/icon-popup-close.svg';
	closeImg.style.width = '17px';
	closeImg.style.height = '17px';
	closeImg.alt = "Close Icon";

	// add listeners
	closeBSModal.addEventListener('click', closeModal);

	// append to each other
	closeBSModal.appendChild(closeImg);
	bsCloseButtonWrapper.appendChild(closeBSModal);

	return bsCloseButtonWrapper;
}

function createMainText() {
	// elements
	var bsMainText = document.createElement('div');
	var heading = document.createElement('h4');
	var paragraph1 = document.createElement('p');
	var paragraph2 = document.createElement('p');

	// properties
	bsMainText.id = 'bsMainText';
	heading.className = 'font-colors-red-text font-size-16';
	heading.innerHTML = 'Your Browser is Not Currently Supported';
	paragraph1.innerHTML = 'We recommend using one of the following browsers for an optimal experience. Click a link below to download the latest browser version.';
	paragraph2.innerHTML = 'If you are already using one of these browsers, please make sure you\'re updated to the latest version.';

	// append
	bsMainText.appendChild(heading);
	bsMainText.appendChild(paragraph1);
	bsMainText.appendChild(paragraph2);

	// return
	return bsMainText;
}

function createLogoContainer() {
	// create container element
	var bsLogosContainer = document.createElement('div');
	bsLogosContainer.id = 'bsLogosContainer';
	bsLogosContainer.className = 'flex justify-around';

	var browsers = [
		{
			name: 'Chrome',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg',
			link: 'https://www.google.com/chrome/',
		},
		{
			name: 'Firefox',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg',
			link: 'https://www.mozilla.org/en-US/firefox/new/',
		},
		{
			name: 'Edge',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg',
			link: 'https://www.microsoft.com/en-us/edge?form=MA13FJ',
		},
	];

	for (var i = 0; i < browsers.length; i++) {
		var browser = browsers[i];
		// create elements
		var bsLogoBox = document.createElement('div');
		var bsAnchor = document.createElement('a');
		var bsIconLink = document.createElement('div');
		var bsIcon = document.createElement('img');
		var nameParagraph = document.createElement('p');
		// properties
		bsLogoBox.className = 'bsLogoBox';
		bsAnchor.href = browser.link;
		bsAnchor.target = '_blank';
		bsAnchor.rel = 'noopener noreferrer';
		bsIconLink.className = 'bsIconLink';
		bsIcon.src = browser.icon;
		bsIcon.style.width = '48px';
		bsIcon.style.height = '48px';
		bsIcon.alt = browser.name + ' Icon';
		nameParagraph.innerHTML = browser.name;

		// append
		bsIconLink.appendChild(bsIcon);
		bsIconLink.appendChild(nameParagraph);
		bsAnchor.appendChild(bsIconLink);
		bsLogoBox.appendChild(bsAnchor);
		bsLogosContainer.appendChild(bsLogoBox);
	}

	// return
	return bsLogosContainer;
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }

function checkForCookie(){
	let cookie = getCookie(cookieDef.name);
	if(cookie != ''){
		return true;
	}else{
		return false;
	}
}
function createCookie(){
	var cookieStr = cookieDef.name + "=" + cookieDef.value + ";expires=" + cookieDef.expires + ';SameSite=' + cookieDef.sameSite + (cookieDef.secure ? ';Secure' : '') + ";path=/";
	document.cookie = cookieStr;
}})();