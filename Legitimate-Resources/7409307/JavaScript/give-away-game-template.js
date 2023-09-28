
        <div class="game-image-wrapper">
            <a href="#" class="giveAwayGameBtn">
                <% if(isOffer) { %>
                <span class="offer"><img class="giveAwayGameBtn" src="<%= offerImg %>" alt="<%= title %>"></span>
                <% } %>
            </a>
            <a href="#" class="giveAwayGameBtn">
                <img src="<%= imgsrc %>" alt="<%= title %>">
            </a>
            <div class="arrow-up hidden"></div>
        </div>
        <div class="game-content <% if(hasOffer) { %>has-offer<% } %> <% if(!isLoggedIn) { %>not-logged-in<% } %>">
            <span class="close"><i class="icon-close"></i></span>
            <div class="image-wrapper">
                <% if(isOffer) { %>
                <span class="offer"><img class="giveAwayGameBtn" src="<%= offerImg %>" alt="<%= title %>"></span>
                <% } %>
                <img src="<%= imgsrc %>" alt="<%= title %>">
            </div>
            <div class="description">
                <h1><%= title %></h1>
                <span class="date"><%= date %></span>
                <% if(hasOffer) { %>
                    <%= content %>
                <% } else { %>
                    <p><%= content %></p>
                    <a href="<%= termsUrl %>" class="terms"><%= terms %></a>
                    <a href="#gameplay/<%= ctaUrl %>" class="cta<% if(!isReleased){ %> disabled-btn<% } %>"><%= ctaText %></a>
                <% } %>
            </div>
        </div>
