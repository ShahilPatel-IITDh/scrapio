
    <% if (status == "eligible") { %>
    <p class="boost-info-text">Opt in, start spinning and win up to <%= currency %><%= upTo %> to boost your winnings</p>
    <% } else { %>
    <p class="boost-info-text">
        <% if (canClaimValue > 0 && claimedValue > 0) { %> Congratulations, you have claimed <%= currency %><%= claimedValue %>!<% } %>
        <% if (leftToClaim > 0) { %>
            You have <%= currency %><%= leftToClaim %> left to claim.
        <% } else { %>
            You have claimed your <%= currency %><%= claimedValue %> Boost!
        <% } %>
    </p>
    <% } %>
    <div class="boost-wins-widget" data-status="<%= status %>">
        <div class="boost-bar">
            <div class="bars">
                <span class="total boost"></span>
                <span style = "width: <%= currentPercentage %>%" class="current boost"></span>
                <span style = "width: <%= claimed %>%" class="claimed boost"></span>
            </div>
            <div class="boost-dividers">
                <ul>
                    <li><i class="icon <%= currentPercentage  > 0 ? 'active':'' %> icon-battery-empty"><%= currency %><%= boostStep %></i></li>
                    <li><i class="icon <%= currentPercentage  > 25 ? 'active':'' %> icon-battery-quarter"><%= currency %><%= boostStep %></i></li>
                    <li><i class="icon <%= currentPercentage  > 50 ? 'active':'' %> icon-battery-half"><%= currency %><%= boostStep %></i></li>
                    <li><i class="icon <%= currentPercentage  > 75 ? 'active':'' %> icon-battery-three-quarters"><%= currency %><%= boostStep %></i></li>
                </ul>
            </div>
        </div>
        <a href="#" class="boost-optin">
            <i class="icon <%= buttonIcon %>"></i>
            <span><%= buttonText %></span>
        </a>
    </div>

    <div class="loader">
        <picture>
            <img src="https://static.32red.com/img/loader.svg">
        </picture>
    </div>
