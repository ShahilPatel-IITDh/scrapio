
	<form action="#">
	<fieldset>
		<legend>Add a UK Debit / Credit Card</legend>
		
		<div class="input">
			<label for="CardNumber">Card Number (16 Digits)</label>
			<input type="text" pattern=":0-9+" name="CardInfo:CardNumber" id="CardNumber" required="required" />
			<span class="error"></span>
		</div>
		
		<div class="input">
			<label for="CardName">Name of Cardholder</label>
			<input type="text" name="CardInfo:CardHolder" id="CardName" required="required" maxlength="20" />
			<span class="error"></span>
		</div>
		
		<div class="input">
			<label for="CardMonth">Expiry Date</label>
			<select name="CardInfo:ExpiryMonth" id="CardMonth" required="required">
			<option value="01">01 - January</option><option value="02">02 - February</option><option value="03">03 - March</option><option value="04">04 - April</option><option value="05">05 - May</option><option value="06">06 - June</option><option value="07">07 - July</option><option value="08">08 - August</option><option value="09">09 - September</option><option value="10">10 - October</option><option value="11">11 - November</option><option value="12">12 - December</option>			</select><span class="error"></span>
			<!--<input type="number" name="CardInfo:ExpiryMonth" id="CardMonth" placeholder="MM" size="2" required="required" pattern="^(0[1-9])|(1[0-2])$" /><span class="error"></span>-->
			<span class="divider">/</span>
			<select name="CardInfo:ExpiryYear" id="CardYear" required="required">
			<option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option><option value="2029">2029</option><option value="2030">2030</option><option value="2031">2031</option><option value="2032">2032</option><option value="2033">2033</option><option value="2034">2034</option><option value="2035">2035</option><option value="2036">2036</option><option value="2037">2037</option><option value="2038">2038</option><option value="2039">2039</option><option value="2040">2040</option><option value="2041">2041</option><option value="2042">2042</option><option value="2043">2043</option>			</select><span class="error"></span>
			<!--<input type="number" name="CardInfo:ExpiryYear" id="CardYear" placeholder="YYYY" size="4" required="required" pattern="^(19|20)[0-9][0-9]$" /><span class="error"></span>-->
		</div>
		
		<div class="address-wrapper">
		
		<div class="input checkbox">
			<input type="checkbox" id="AddressAuto"  checked="checked" name="auto_address" />
			<label for="AddressAuto">My registered address is also my billing address</label>
		</div>

		<input type="hidden" name="UserCredentials:LoginName"  value="" />
		<input type="hidden" name="UserInfo:Country"  value="GBR" />
		<input type="hidden" name="UserInfo2:Country"  value="GBR" />
		
		<div id="address-details-holder">
		<div class="address-details-auto">
			<div><%= getUserInfo('Address1') %></div>
			<div><%= getUserInfo('Address2') %></div>
			<div><%= getUserInfo('City') %></div>
			<div><%= getUserInfo('Province') %></div>
			<div><%= getUserInfo('ZipCode') %></div>
			<input type="hidden" name="UserInfo:Address1" value="<%= getUserInfo('Address1') %>" />
			<input type="hidden" name="UserInfo:Address2" value="<%= getUserInfo('Address2') %>" />
			<input type="hidden" name="UserInfo:City"     value="<%= getUserInfo('City') %>" />
			<input type="hidden" name="UserInfo:State"    value="<%= getUserInfo('Province') %>" />
			<input type="hidden" name="UserInfo:ZipCode"  value="<%= getUserInfo('ZipCode') %>" />
		</div>
		
		<div class="address-details-manual" class="hidden">
			<label for="UserInfoAddress1">Address 1</label>
			<input type="text" name="UserInfo2:Address1" value="<%= getUserInfo('Address1') %>" placeholder="Address 1" /><span class="error"></span>
			
			<label for="UserInfoAddress2">Address 2 </label>
			<input type="text" name="UserInfo2:Address2" value="<%= getUserInfo('Address2') %>" placeholder="Address 2" />
			
			<label for="UserInfoCity">Town / City</label>
			<input type="text" name="UserInfo2:City" value="<%= getUserInfo('City') %>" placeholder="City" /><span class="error"></span>
			
			<label for="UserInfoState">County / Region</label>
			<input type="text" name="UserInfo2:State" value="<%= getUserInfo('Province') %>" placeholder="County" /><span class="error"></span>
			
			<label for="UserInfoZipCode">Postal Code</label>
			<input type="text" name="UserInfo2:ZipCode" value="<%= getUserInfo('ZipCode') %>" placeholder="Postcode" /><span class="error"></span>
		</div>
		</div>
		
		</div>
		
		<div class="button-holder">
			<button id="BonusCardClaim" type="submit" class="cta"><big>Claim</big>. Get your bonus by adding your card</button>
		</div>
	</fieldset>
	</form>
