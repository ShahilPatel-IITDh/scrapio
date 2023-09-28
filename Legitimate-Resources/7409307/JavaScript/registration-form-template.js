
	<form>
        <input type="hidden" id="emailToken"
               value="bmJ6TWR2S2lGeVcya21qdEdLMnhUNkVWSmFCK1RYVjBzZDJDS1hFPQ=="/>
		<fieldset class="personal">
            <div class="default-legend" style="display:none;">Hello, we can't wait to welcome you at 32Red.<br> But first, tell us a little about yourself</div>
			<div class="legend">
				Hello, we can't wait to welcome you at 32Red.<br> But first, tell us a little about yourself			</div>
			<span class="email-loader">
				<picture>
		           <img src="https://static.32red.com/img/loader.svg">
		        </picture>
			</span>
			<div class="fields-holder clearfix" data-fields="firstname,lastname,email,mobile,confirm_promo,dob" class="clearfix"></div>
			<a class="next-section" data-valfields="firstname,lastname,email,mobile,confirm_promo,dob" data-section="personal" data-next="2">Continue</a>
		</fieldset>
		<fieldset class="address">
			<div class="legend">
				Nice to meet you, <span class="user-first-name"></span>.<br> That was easy! Now just two more steps...			</div>
			<div class="fields-holder clearfix" data-fields="country" class="clearfix"></div>
            <div class="fields-holder postal-code-holder clearfix" data-fields="zip" class="clearfix">
            	<a href="#" id="find-address">
            		<span class="find-address-text">Find Address</span>
            		<span class="magnifying-glass"><i class="icon-search"></i></span>
            	</a>
            </div>
            <div class="fields-holder hidden secondary-data-fields clearfix" data-fields="address_1,address_2,city,state" class="clearfix"></div>

            <div class="buttons-holder hidden">
                <a class="next-section confirm-address" data-valfields="country,zip,address_1,address_2,city,state" data-section="address" data-next="3">Confirm Address</a>
                <a href="#" id="try-again">Try Again</a>
            </div>
            <a href="#" id="manual-data-entry">Enter address manually >></a>
		</fieldset>
		<fieldset class="account">
			<div class="legend">
				Almost there... last bit			</div>
			<span class="username-loader">
				<picture>
		           <img src="https://static.32red.com/img/loader.svg">
		        </picture>
			</span>
			<div class="fields-holder clearfix" data-fields="username_register,password,confirm_password,currency,sex,tandc" class="clearfix"></div>
			<a class="submit-registration" data-valfields="username_register,password,confirm_password,currency,sex,tandc" data-section="account">Submit</a>
			<label class="show-password"><input type="checkbox" class="show-password-input" id="show-password" value="Show">Show</br> Password</label>
		</fieldset>

	</form>
	<div class="general-error">
		Ah, something you typed in below doesn't make sense.<br>If you think we're wrong, <a href="/support">click here</a>.
	</div>
