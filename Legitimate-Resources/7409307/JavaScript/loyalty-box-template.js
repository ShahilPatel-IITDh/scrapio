
    <% if(isBasePlayer) { %>
    <div class="loyalty-box-inner base-player">
        <h2>Get going</h2>
        <p>
            With just a few spins, you will be taking the first steps towards benefiting from even better offers, as you progress through our loyalty scheme.        </p>
        <% if (isDesktop) { %>
        <div class="loyalty-buttons">
            <a href="#" class="cta transparent account">My Account</a>
            <a href="#" class="cta deposit">Deposit Now</a>
        </div>
        <% } %>
    </div>
    <% } else { %>
    <div class="loyalty-box-inner <%= currentStep %>">
        <div class="loyalty-details">
            <div class="loyalty-top">
            </div>
            <div class="loyalty-balance">
                <div class="loyalty-points">
                    Loyalty Points                    <span class="loyalty-amount icon"><i class="icon-ruby"></i><%= loyaltyBalance %></span>
                    <span class="dots"></span>
                </div>
            </div>
            <div class="slider-buttons">
                <% if(showRedeemButton) { %>
                <a href="#" data-step="slider" class="show-slider cta transparent">Redeem Points</a>
                <% } %>
            </div>
        </div>

        <div class="loyalty-redeem">
            <div class="slider-box">
                <p>Choose the amount of points to redeem</p>
                <div class="slider-bar">
                        <span class="loyalty-money">
                            <span class="amount-points"><%= maxPointsToRedeem %></span>pts. = £<span class="amount-redeem"><%= loyaltyInMoney %></span>
                        </span>
                    <span class="sliding">
                            <span class="sliding-button"></span>
                            <span class="red-bar"></span>
                        </span>
                </div>
            </div>
            <div class="confirm-password">
                <label for="confirm-password">You are about to <b>redeem <span class="amount-points"><%= pointsToRedeem %></span> points for £<span class="amount-redeem"><%= loyaltyInMoney %></span>.</b><br>Please type your password below to confirm.</label>
                <input type="password" class="confirm-password-input">
                <span class="error">Field required</span>
            </div>
            <div class="slider-buttons">
                <a href="#" data-step="submit" class="claim-bonus cta">Submit</a>
                <a href="#" data-step="default" class="cta transparent cancel">Cancel</a>
            </div>
            <div class="loader">
                <picture>
                    <img src="https://static.32red.com/img/loader.svg">
                </picture>
            </div>
        </div>
    </div>
    <% } %>
