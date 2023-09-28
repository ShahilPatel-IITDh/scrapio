
    <div class="verification-form-header">
        <div class="icon-wrapper"><i class="<%= headicon %>"></i></div>
        <h2><%= headline %></h2>
        <p><%= subheadline %></p>
    </div>

    <form class="verification-form-wrapper step2">
        <div class="step2-field-wrapper">
            <label for="email">Email</label>
            <input type="text" name="email" value="<%= email %>">
        </div>
        <div class="step2-field-wrapper">
            <label for="homePhoneNumber">Telephone number</label>
            <input type="tel" name="homePhoneNumber" value="<%= homePhoneNumber %>">
        </div>
        <div class="step2-field-wrapper">
            <label for="country">Country</label>
            <input type="text" name="country" value="<%= country %>" disabled="disabled">
            <span class="tooltip-wrapper">
              <i class="icon-error" id="countryEditInfo"></i>
            </span>
        </div>
        <div class="step2-field-wrapper">
            <label for="postalCodeZip">Postal Code</label>
            <div class="postal-code-wrapper">
                <input type="text" name="postalCode" id="postalCodeZip" value="<%= postalCode %>">
                <button class="postal-code-btn" disabled>Find Address</button>
            </div>
        </div>
        <a href="#" id="enterAddressManually">Enter address manually >></a>

        <div class="cta-btns-wrapper">
            <a href="#" class="cta transparent black" id="goToReview">Review Details</a>
        </div>
    </form>
