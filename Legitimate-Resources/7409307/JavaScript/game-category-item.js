

    <img src="https://static.32red.com/img/loader-white.svg"
         alt="<%= name %>"
         data-host="https://static.32red.com/new-games/"
         onerror="this.src='https://static.32red.com/img/basic-image/32red-white.svg'"
    />
    <% if(isRace()){ %>
    <div class="race_overlay"></div>
    <% } %>

    <div class="spinner-loader"></div>

    <% if(ndb_block){ %>
    <div class="lock-overlay"><i class="icon-secure"></i></div>
    <% } %>

    <a href="#open-mobile-options" class="mobile-overlay"></a>
    <h3 class="for-mobile game-name"><span><%= name %></span></h3>
    <% if (exclusive_game > 0) { %>
    <span class="sash exclusive">Exclusive</span>
    <% } %>
    <% if (hasRibbon) { %>
    <span class="ribbon <%= ribbonClass %>"><%= ribbonText %></span>
    <% } %>

    <div class="game-description">
        <div class="game-info info<%= id %>">
                            <% if (!slug) { %>
                <h3><span><%= name %></span></h3>
                <% } else { %>
                <h3><a href="<%= slug %>"><span><%= name %></span></a></h3>
                <% } %>
                    </div>

        <div class="play-buttons">
                <% if(isRace()){ %>
                <a href="/casino/promotions/red-hot-races" class="real-play gameplay big home-promotion-grid" >More Info</a>
                <% }else{ %>
                <% if (hasDemoPlay) { %>
                <a href="#gameplay/<%= id %>/free" class="free-play cta transparent big" data-game-id="<%= id %>">Demo Play</a>
                <% } %>
                <a href="#gameplay/<%= id %>" class="real-play gameplay big" data-game-id="<%= id %>">Play Now</a>
                <% } %>
        </div>

        <a class="close"><i class="icon-close"></i></a>
    </div>
