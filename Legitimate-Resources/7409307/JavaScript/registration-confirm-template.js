
            <p class="popover-header">32Red Registration</p>

		<div class="confirm-content">
			<p>
									<span class="registration-confirm-welcome">Welcome to our award-winning casino, </span><span class="player-name"></span><span class="dot">.</span><br>
								Don’t forget your username: <span class="player-username"></span><span class="dot">.</span>

			</p>
            <div class="tracking-holder"></div>

            <% if (noBonus) { %>
            <h3>All that is left now is to pop some credits into your account. Please click below to launch banking.</h3>

<p><a href="banking" data-promo="launchBanking"  class="cta big green confirm-promo">Continue and Deposit</a></p>
            <% } else { %>
            <h3>All that is left now is to pop some credits into your account. Here are your options:</h3>
			<div class="client-options">
				<ul class="options-list">
					<% if (bonusNDB) { %>
				        <li class="radio">
							<input checked="checked" data-promoKey="<%= NDBKey %>" class="BonusNDB" id="promo1" type="radio" name="client-option"/>
							<label for="promo1">
								<%= textBonusNDB %>
								<span>
								Yes, that's right, absolutely no deposit required.</span>
							</label>

						</li>
				    <% } %>

					<li class="radio">
						<% if (bonusNDB) { %>
					    	<input id="promo2" data-promoKey="<%= WBKey %>" class="BonusWBTop10" type="radio" name="client-option"/>
					    <% } else { %>
							<input id="promo2" data-promoKey="<%= WBKey %>" checked="checked" class="BonusWBTop10" type="radio" name="client-option"/>
					    <% } %>
												<label for="promo2">Deposit and <%= textBonusWB %>
														<span><%= textBonusWBSecond %></span>
						</label>
					</li>

					<li class="radio">
						<input id="promo3" data-promoKey="launchBanking" class="launchBanking" type="radio" name="client-option"/>
						<label for="promo3">Deposit without claiming a bonus						<span>If bonuses aren't your thing, this one is for you. </span>
						</label>
					</li>

				</ul>
				<% if (bonusNDB) { %>
					<a href="#" data-promo="<%= NDBKey %>" class="confirm-promo big">Continue</a>
			    <% } else { %>
					<a href="#" data-promo="<%= WBKey %>" class="confirm-promo big">Continue</a>
			    <% } %>
			</div>
            <% } %>
		</div>
					<div class="banking-launched">
	    		<p>We have launched your banking page in a new window. </p>
<p>If you can’t find it, then don’t worry, you can launch it again below.</p>
<a class="deposit" href="/banking">Banking</a>	    	</div>
	        
