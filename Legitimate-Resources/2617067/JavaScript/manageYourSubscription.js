/**
 * September 30, 2011 - Copyright iContact Inc.
 *
 * Add behavior to elements on the manage your subscriptions page
 */

// scope everything so we get no conflict with other
// js libraries.
var mys = {
	myProfile :               null,
	profileContainer:         null,
	listCheckBoxes:           null,
	submitButton:			  null,
	dncConfirmMsgBoxId:       '#dncConfirmMsgBox',
	dncConfirmCheckboxId:     '#dncConfirmCheckbox',
	editProfileId:            '#editProfileLink',
	keepSubscribeId:          '#contRadioButton',
	unsubscribeRadioButtonId: '#unsubRadioButton',
	unsubMsgRadioButtonId:    '#unsubMsgRadioButton',
	dncRadioButtonId:         '#dncRadioButton',
	animateDuration:          250,
	formChanged:              false
}

// the start method
window.jQuery && $(document).ready(function() {

	// get our common selectors
	mys.myProfile          = $("#yourProfile"),
	mys.profileContainer   = $("#profileContainer");
	mys.listCheckBoxes     = $('.listsTable').find('input[type="checkbox"]');
	mys.submitButton       = $('input[type="submit"]');

	// don't collapse the dnc confirmation box if are reposting
	// after they failed to check the box.
	if ( ! /&er=confirm_dnc/.test(window.location) ) {
		$(mys.dncConfirmMsgBoxId).hide();
	}
	else{
		// coming back from a "Do not contact". Make sure that radio button is selected.
		$(mys.dncRadioButtonId).prop('checked', true);
		mys.listCheckBoxes.prop('checked', false);
		mys.doFormChange();

	}
	
	// don't collapse edit profile if reposting from update
	$('#editLegend').css('display', 'block');
	if ( ! /&pd=updated/.test(window.location) ) {
		mys.profileContainer.hide();
		mys.myProfile.removeClass('showProfile');
	}
	else{
		$(mys.editProfileId).html(i18n.root.manageYourSubscription_js.btn_collapse).parent().find('span').hide();
	}

	// open/close the edit profile panel
	$(mys.editProfileId).click(function() {
		mys.profileContainer.slideToggle("slow", "swing", function() {
			if( mys.myProfile.hasClass('showProfile') ) {
				$(mys.editProfileId).html(i18n.root.manageYourSubscription_js.btn_edit).parent().find('span').show();
				mys.myProfile.removeClass('showProfile');
				mys.profileContainer.hide(mys.animateDuration);
			}
			else{
				$(mys.editProfileId).html(i18n.root.manageYourSubscription_js.btn_collapse).parent().find('span').hide();
				mys.myProfile.addClass('showProfile');
				mys.profileContainer.show(mys.animateDuration);
			}
		});
		return false;
	});

	// if any input element changes then make the submit button come to life
	$('input').keyup( function() {
		mys.doFormChange();
	});
	$('input').change( function() {
		mys.doFormChange();
	});

	// let's give some personality to the Update button
	mys.submitButton.hover(
			function(){
				if(mys.formChanged){
					mys.submitButton.addClass('activatedBtnHover');
				}
			},
			function(){
				if(mys.formChanged){
					mys.submitButton.removeClass('activatedBtnHover');
				}
			}
	)

	// process actions after update button is pressed
	$('form').submit(function() {
		return true;
	});

	// if all lists check boxes are unchecked then select unsubscribe radio button
	mys.listCheckBoxes.change(function(){
		mys.listCheckBoxes.each( function(index) {
			if( this.checked ){
				$(mys.keepSubscribeId).prop('checked', true);
				mys.closeDNCConfirmBox();
			}
		});
	});

	// do radio button behaviors
	$('input[name="subscribeChoice"]').change( function(){
		switch( this.value){
			case 'continue':
				mys.closeDNCConfirmBox();
				break;
			case 'unsub':
			case 'unsubMsg':
				mys.listCheckBoxes.prop('checked', false);
				mys.closeDNCConfirmBox();
				break;
			case 'dnc':
				// if do not contact is pressed then open dnc message dialog
				mys.listCheckBoxes.prop('checked', false);
				$(mys.dncConfirmMsgBoxId).show(mys.animateDuration);
				break;
			default:
				break;
		}
	});

});

/**
 * Helper function to add behavior to the page when
 * any input element on the page changes.
 */
mys.doFormChange = function() {
	if( mys.formChanged == false ){
		mys.submitButton.addClass('activatedBtn');
		mys.formChanged = true;
	}
}

/**
 * Helper function used above when the Do not Contact
 * confirmation box needs to be closed.
 */
mys.closeDNCConfirmBox = function() {
		$(mys.dncConfirmMsgBoxId).hide(mys.animateDuration);
		$(mys.dncConfirmCheckboxId).prop('checked', false);
}

