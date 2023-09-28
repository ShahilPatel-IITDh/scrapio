
		<p class="popover-header"><span class="user-name"><%= firstname %></span>'s Account Details</p>
		<div class="account-content">
				<div class="marketing-box marketing-box-show-checkbox">
                    <% if(subscribedEmailSms) { %>
                        <div class="has-promo">
                            <label for="checkmarketing">
                            <span>View and manage the communications we send you in your <a href="#" class="load-section account-tab preferences-center" data-section="preferences-center">preferences center</a></span> <a href="#subscription-centre" class="show-terms">Subscription Centre</a>
                            </label>
                        </div>
                     <% } %>
				</div>
				<% if(displayDocumentVerificationInfo()) { %> 
					<div class="marketing-box document-verification"> 
						<p class="pending">Your document verification is pending, please come back later.</p>                  
						<p class="pass">Thank you, your uploaded document has been approved. <a class="icon document-notification-check">[Dismiss <i class="icon-close"></i>]</a></p>                  
						<p class="fail">Seems that there was an issue with the document that you have uploaded.<a href="#document-verification">Click here</a> to try again or <a href="https://www.32red.com/support">Contact Us</a></p>                  
					</div>
				<% } %>

				<% if(hasDepositLimits()) { %> 
					<div class="marketing-box has-deposit-limits"> 
						<p>[error]</p>                  
					</div>
				<% } %>
			<section class="funds">
				<h3 class="opened">Funds</h3>
				<div class="section-content opened">
					<span class="legend">Casino Balance</span>
					<div class="user-balance">
						<p>
							<span class="label">
								Casino Balance:
							</span>
							<span class="amount casino">
								<%= cashBalance %>
							</span>
						</p>
						<p>
							<span class="label">
								Bonus Balance:							</span>
							<span class="amount bonus">
								<%= bonusBalance %>
							</span>
						</p>
						<p>
							<span class="label">
								Total Balance:							</span>
							<span class="amount total">
								<%= totalBalance %>
							</span>
						</p>
						<a href="#" class="refresh-balance">Refresh balance</a>
					</div>
					<a href="/banking" class="deposit banking">Launch Banking</a>
					<a href="/banking" class="deposit-mobile banking">Launch Banking</a>
					<div class="info-links">
						<a href="#" class="transactions">Transaction History</a>
						<a href="#" class="playcheck">Your PlayCheck</a>
					</div>
				</div>
			</section>
			<section class="profile">
				<div class="section-content">
					<div class="has-promo for-desktop">
						 View and manage the communications we send you in your <a href="#" class="load-section account-tab preferences-center" data-section="preferences-center">preferences center</a>					</div>
				</div>
			</section>
		</div>
	
