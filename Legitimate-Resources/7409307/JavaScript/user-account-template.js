

	<section class="account-area-general active-section">
		<div class="account-area-header">
			<p>My account</p>
			<a href="#close" class="icon close-btn">
				<i class="icon-close"></i>
			</a>
		</div>
        <% if(isFromUK) { %>
            <div class="marketing-box document-verification <% if(isVerified()){ %>hidden<% } %>">
                <i class="icon-error"></i>
                <p>Proof of Address failed verification <br> <a class="try-again" href="#document-verification">Try again</a></p>
            </div>
        <% } %>
        <% if(subscribedEmailSms) { %>
        <div class="marketing-box marketing-box-show-checkbox">
            <p class="has-promo">
                <label for="checkmarketing">
                    View and manage the communications we send you in your <a href="#" class="load-section account-tab preferences-center" data-section="preferences-center">preferences center</a>                </label>
            </p>
        </div>
        <% } %>
        <% if(despositLimits) { %>
        <div class="marketing-box has-deposit-limits">
            <p>You have a deposit limit set on your account. To view or update your limit, click <a  href="#set-deposit-limit">here</a></p>
        </div>
        <% } %>
        <div id="banking-area" class="banking-area">
			<div class="avatar-image">
                <img src="<%= avatarImgUrl %>" alt="">
            </div>
			<div class="cash-container">
				<p class="go-left"><strong><%= username %></strong></p>
				<div class="balance-button" data-section="balance-breakdown">
					<p class="go-left" id="balance-dropdown">Balance <span class="material-icons down"></span></p>
					<p class="cash-ammount" id="cash-total"><%= formattedTotal %></p>
				</div>
				<div class="balance-breakdown hidden">
					<div>
						<p class="go-left cash-text">Cash</p>
						<p class="cash-ammount cash-text" id="real-money"><span class="formatted-cash"><%= formattedCash %></span> <span class="cashPercent balance-percent">(<%= getCashPercent() %>%)</span></p>
					</div>
					<div>
						<p class="go-left cash-text">Bonus</p>
                        <p class="cash-ammount cash-text" id="bonus-money"><span class="formatted-cash"><%= formattedBonus %></span> <span class="bonusPercent balance-percent">(<%= getBonusPercent() %>%)</span></p>
					</div>
                    <div>
                        <p class="go-left next-bet-split">Next bet split</p>
                        <p class="cash-ammount next-bet-split" id="bonus-money">Cash <span class="cashPercent">(<%= getCashPercent() %>%)</span>-Bonus <span class="bonusPercent">(<%= getBonusPercent() %>%)</span></p>
                    </div>
				</div>
                <a href="/banking" class="account-banking-button cta deposit-mobile deposit icon" style="">Banking</a>
			</div>
            <div id="avatar-gallery" class="hidden">
                <% var avatars = getAvatars();
                   for(i=0; i < avatars.length; i++){ %>
                        <a class="avatar-item <% if(avatarImgUrl === avatars[i]) { %>selected<% } %>"><img data-avatarid="<%= (i + 1) %>" src="<%= avatars[i] %>" alt=""></a>
                <% } %>
            </div>
        </div>
        <div class="pending-withdrawals">
        </div>
		<div class="client-account">
			<h2>My account</h2>
            <div class="items-wrapper">
                <a href="#" class="load-section account-tab personal-details" data-section="personal-details">
                    <i class="icon-my-account-personal-details-icon"></i>
                    <span>Personal Details</span>
                </a>

                <a href="#" class="load-section account-tab account-details" data-section="account-details">
                    <i class="icon-my-account-account-details-icon"></i>
                    <span>Account Details</span>
                </a>
                <% if(isFromUK) { %>
                <a href="#" class="load-section account-tab verification-status" data-section="verification-status">
                    <% if(!isVerified()){ %><span class="not-verified"><i class="icon-error"></i></span><% } %>
                    <i class="icon-my-account-verification-status"></i>
                    <span>Verification Status</span>
                </a>
                <% } %>
                <a href="#" class="load-section account-tab preferences-center" data-section="preferences-center">
                    <i class="icon-my-account-preferences-centre"></i>
                    <span>Preferences Center</span>
                </a>
                <a href="/responsible-gaming" class="<%= isFromUK ? 'load section' : '' %> account-tab player-safety">
                    <i class="icon-my-account-player-safety-icon"></i>
                    <span>Safer Gambling</span>
                </a>
            </div>
		</div>
	</section>

	<section class="personal-details-section">
		<div class="account-area-header">
			<a href="#" class="back-button">< Back</a>
			<p class="title">Personal Details</p>
			<a href="#close" class="icon close-btn">
				<i class="icon-close"></i>
			</a>
		</div>
		<h5 class="user-details-header">Personal Details</h5>
		<form data-name="personal-form">
            <div class="locked input-wrapper">
                <label for="first-name">First Name</label>
			    <input type="text" value="<%= firstname %>" readonly="readonly">
            </div>
            <div class="locked input-wrapper">
                <label for="surname">Last Name</label>
			    <input type="text" value="<%= lastname %>" readonly="readonly">
            </div>
            <div class="input-wrapper">
                <label for="addressLine1">Address 1</label>
                <input type="text" id="acc_addressLine1" name="addressLine1" value="<%= addressLine1 %>">
            </div>
            <div class="input-wrapper">
                <label for="address2">Address 2</label>
                <input type="text" id="acc_addressLine2" name="addressLine2" value="<%= addressLine2 %>">
            </div>
            <div class="input-wrapper">
                <label for="city">Town / City</label>
                <input type="text" id="acc_city" name="city" value="<%= city %>">
            </div>

            <div class="locked input-wrapper">
                <label for="country">Country</label>
			    <input id="acc_country" type="text" value="<%= country %>" readonly="readonly">
            </div>
            <div class="input-wrapper">
                <label for="postal-code">Postal Code</label>
                <input type="text" id="acc_postal_code" name="postalCode" value="<%= postalCode %>">
            </div>
            <a href="#" class="cta save-form cta-full-width" data-form="personal-form">Save</a>
		</form>
		<h5 class="user-details-header">Contact Details</h5>
		<form data-name="contact-form">
            <div class="input-wrapper phone-wrapper">
                <label for="mobile">Telephone</label><!-- This can be put into translations for my-account if needed -->
                <input type="tel" name="homePhoneNumber" value="<%= homePhoneNumber %>">
            </div>
            <div class="input-wrapper">
                <label for="email">Email</label><!-- This can be put into translations for my-account if needed -->
                <input type="email" name="email" value="<%= email %>">
            </div>
            <a href="#" class="cta save-form cta-full-width" data-form="contact-form">Save</a>
		</form>
	</section>

	<section class="account-details-section">
		<div class="account-area-header">
			<a href="#" class="back-button">< Back</a>
			<p class="title">Account Details</p>
			<a href="#close" class="icon close-btn">
				<i class="icon-close"></i>
			</a>
		</div>
		<h5 class="user-details-header">Account Details</h5>
        <form data-name="nickname-form">
            <div class="locked input-wrapper">
                <label for="username">Username</label>
                <input type="text" readonly="readonly" value="<%= username %>">
            </div>
        </form>
		<form data-name="account-form">
            <div class="group-fields">
                <div class="field-block old-password-field-block">
                    <label for="old-password">Old Password</label>
                    <input class="password-element old-password-field" type="password" name="oldPassword">
                </div>
                <div class="show-password">
                    <input type="checkbox" id="show-user-password" class="show-old-password" data-target="old-password" value="Show"><label for="show-user-password">Show</label>
                </div>
            </div>
            <div class="group-fields">
                <div class="field-block password-wrapper">
                    <label for="new-password">New Password</label>
                    <input class="password-element new-password-field" type="password" name="newPassword">
                </div>
            </div>
            <div class="input-wrapper repeat-password">
                <label for="repeat-new-password">Confirm Password</label>
                <input class="password-element new-password-field" type="password" name="repeatNewPassword">
            </div>
		</form>
        <div class="account-footer">
            <a href="#" class="block" id="transaction-history">
                <i class="icon-transaction_history"></i>
                <span>Transaction History</span>
            </a>
            <a href="#" class="block" id="gaming-history">
                <i class="icon-gaming_history"></i>
                <span>Gaming History</span>
            </a>

            <a href="#" class="cta cta-full-width save-form" data-form="account-form">Save</a>
        </div>
		<div id="gaming-history-holder">
            <div class="preloader-holder"></div>
            <iframe width='100%' height='100%' scrolling='auto' name='32RedPaycheck' />
		</div>
	</section>

	<section class="player-safety-section">
		<div class="account-area-header">
			<a href="#" class="back-button">< Back</a>
			<p class="title">Safer Gambling</p>
			<a href="#close" class="icon close-btn">
				<i class="icon-close"></i>
			</a>
		</div>
        <div class="player-safety-wrapper">
        <div class="player-safety-block deposit-limits">
        <div class="player-safety-content">
            <h3>Deposit Limits</h3>
            <p>
We are able to limit the amount of money that you are able to deposit in your account on either a daily, weekly or monthly basis. Please <a href="#set-deposit-limit">Click Here</a> to check your deposit limits.
</p>
        </div>
    </div>
    </div>

<style>
.responsive-popover-wrapper.deposit-limit-centre {
z-index: 100010
}
#user-account-dashboard .my-account-area .player-safety-wrapper .player-safety-block.deposit-limits::before { 
    content: '\e977';
}
</style>
    </section>

	<section class="verification-status-section">
		<div class="account-area-header">
			<a href="#" class="back-button">< Back</a>
			<p class="title">Verification Status</p>
			<a href="#close" class="icon close-btn">
				<i class="icon-close"></i>
			</a>
		</div>
        <div class="account-verification-wrapper">
        </div>
    </section>

	<section class="preferences-center-section">
		<div class="account-area-header">
			<a href="#" class="back-button">< Back</a>
			<p class="title">Preferences Center</p>
			<a href="#close" class="icon close-btn">
				<i class="icon-close"></i>
			</a>
		</div>
        <div id="preferences-center-wrapper"></div>
	</section>
