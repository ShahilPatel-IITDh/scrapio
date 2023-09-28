/**
 * This file contain all code necessary to implement a page spinner
 * dependency: /resources/stylesheets/spinner.css
 */

var isSpinnerDisplayed = false;

/**
 * Function used to display the loading spinner.
 */
function showOverlaySpinner() {
	if (!isSpinnerDisplayed) {
		isSpinnerDisplayed = true;
		$('#overlaySpinner').removeClass('hiddenElement');
	}
}

/**
 * Function used to hide the loading spinner.
 */
function hideOverlaySpinner() {
	if (isSpinnerDisplayed) {
		isSpinnerDisplayed = false;
		$('#overlaySpinner').addClass('hiddenElement');
	}
}

/**
 * This will create at the end of page a DIV element which will be used to
 * display the spinner.
 */
function createSpinnerDiv() {
	if ($('#overlaySpinner').length === 0) {
		$('body')
				.append(
						'<div class="overlay hiddenElement" id="overlaySpinner"><div>'
								+ '<img class="loader" src="/images/account-images/SpinningWheel.gif">'
								+ '</div></div>');
	}
}

// run when the document is ready
$j(document).ready(function() {
	createSpinnerDiv();
});