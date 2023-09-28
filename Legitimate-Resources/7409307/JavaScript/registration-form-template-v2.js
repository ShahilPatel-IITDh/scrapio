
	<form>
		<fieldset class="personal" data-rotate="front">
			<div class="fields-holder clearfix" data-fields="firstname,lastname,email,confirm_promo,mobile,dob" class="clearfix"></div>
			<a href="#" class="open-popover details-safe"><span class="icon"><i class="icon-lock"></i></span>Find out why our details are safe with us.</a>
			<a class="next-section" data-section="personal" data-next="2">Continue</a>
			<div class="mobile-date">
				<label for="select-mobile-date"><span class="label-text">DOB mobile</span></label>
				<input id="select-mobile-date" type="date" placeholder="dd/mm/yyyy">
				<div data-error="" class="error-msg">This field is required</div>
			</div>
		</fieldset>
		<fieldset class="address" data-rotate="back">
			<div class="fields-holder clearfix" data-fields="country,address_1,address_2,city,state,zip" class="clearfix"></div>
			<a class="next-section" data-section="address" data-next="3">Continue</a>
		</fieldset>
		<fieldset class="account" data-rotate="none">
			<div class="fields-holder clearfix" data-fields="username_register,password,currency,sex,tandc" class="clearfix"></div>
			<a class="submit-registration" data-section="account">Submit</a>
		</fieldset>

	</form>
	<div class="general-error">
		Ah, something you typed in below doesn't make sense.<br>If you think we're wrong, <a href="/support">click here</a>.	</div>
