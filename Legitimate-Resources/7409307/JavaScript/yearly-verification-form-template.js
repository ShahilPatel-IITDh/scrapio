
    <div class="verification-form-header">
        <div class="icon-wrapper"><i class="<%= headicon %>"></i></div>
        <h2><%= headline %></h2>
        <p><%= subheadline %></p>
    </div>
    <form class="verification-form-wrapper step1">
        <div class="fields-row-wrapper">
            <div class="single-field-wrapper <%= inputIsLocked() %>">
                <label for="verification_email_address">Email</label>
                <input type="text" name="email" value="<%= email %>" <%= isEditable() %>>
            </div>
            <div class="single-field-wrapper <%= inputIsLocked() %>">
                <label for="homePhoneNumber">Telephone numberTelephone Number</label>
                <input type="tel" name="homePhoneNumber" value="<%= homePhoneNumber %>" <%= isEditable() %>>
            </div>
        </div>

        <div class="fields-row-wrapper">
            <div class="single-field-wrapper <%= inputIsLocked() %>">
                <label for="addressLine1">Address 1</label>
                <input type="text" name="addressLine1" value="<%= addressLine1 %>" <%= isEditable() %>>
            </div>
            <div class="single-field-wrapper <%= inputIsLocked() %>">
                <label for="addressLine2">Address 2</label>
                <input type="text" name="addressLine2" value="<%= addressLine2 %>" <%= isEditable() %>>
            </div>
        </div>

        <div class="fields-row-wrapper">
            <div class="single-field-wrapper <%= inputIsLocked() %>">
                <label for="city">Town / City</label>
                <input type="text" name="city" value="<%= city %>" <%= isEditable() %>>
            </div>
            <div class="single-field-wrapper <%= inputIsLocked() %>">
                <label for="state">County / Region</label>
                <input type="text" name="state" value="<%= state %>" <%= isEditable() %>>
            </div>
        </div>

        <div class="fields-row-wrapper">
            <div class="single-field-wrapper <%= inputIsLocked() %>">
                <label for="postalCode">Postal Code</label>
                <input type="text" name="postalCode" value="<%= postalCode %>" <%= isEditable() %>>
            </div>
            <div class="single-field-wrapper">
                <label for="country">Country</label>
                <input type="text" name="country" value="<%= country %>" disabled="disabled">
                <span class="tooltip-wrapper">
                    <i class="icon-error" id="countryEditInfo"></i>
                </span>
            </div>
        </div>

        <div class="cta-btns-wrapper">
            <% if(formIsEditable) { %>
                <a href="#" class="cta" id="validateFields">Validate Address</a>
            <% } else { %>
                <a href="#" class="cta" id="detailsCorrect">My Details are Correct</a>
                <a href="#" class="cta transparent black" id="editDetails">I need to change my details</a>
            <% } %>
        </div>

    </form>
