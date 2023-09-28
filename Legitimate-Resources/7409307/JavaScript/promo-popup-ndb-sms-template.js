
    <fieldset id="BonusMobileVerify">
        <h2>In order to claim your free bonus , all we ask is that you verify your mobile number</h2>
        <p class="legend">1. Send Verification SMS to your mobile</p>
        <input type="text" id="BonusMobileNumber" name="mobile_number" required="required" value="" />
        <a class="cta big" id="BonusMobileInputSend" href="#send">Send Verification SMS</a>
        <a href="#confirm" id="BonusMobileAlready">I've already received my verification SMS</a>
    </fieldset>
    <fieldset id="BonusMobileConfirm">
        <p class="legend">2. Insert your 4 digit verification code</p>
        
        <input type="text" id="BonusMobileVerifyCode" name="verify_code" maxlength="4" style="text-align:center" />
        
        <a class="cta big" id="BonusMobileClaim" href="#send">Submit &amp; Claim your bonus</a>
        
        <a href="#again" id="BonusMobileAgain">I did not receive an SMS... please send it again</a>
    </fieldset>
