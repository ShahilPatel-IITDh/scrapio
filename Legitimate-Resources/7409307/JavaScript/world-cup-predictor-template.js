

    <div id="wcp-container">
        <h2><%= title %></h2>
        <div id="flags-container">
            <div class="flag">
                <img src="https://static.32red.com/img/basic-image/wc_<%= country1Flag %>.png"/>
                <h3><%= country1 %></h3>
            </div>
            <h2>vs</h2>
            <div class="flag">
                <img src="https://static.32red.com/img/basic-image/wc_<%= country2Flag %>.png"/>
                <h3><%= country2 %></h3>
            </div>
        </div>
        <% if (loggedIn) {  %>
                <div id="bets-container">
                    <a class="bet-box <% if(playerStatus){ %><% if(playerStatus === 'home-optin'){ %>selected<% } else { %>greyed-out<% } %><% } %>" id="home" data-option="home">
                        <h3 class="bet-type" data-option="home"> Home</h3>
                        <p data-option="home"><%= homePrize %></p>
                    </a>

                    <a class="bet-box <% if(playerStatus){ %><% if(playerStatus === 'draw-optin'){ %>selected<% } else { %>greyed-out<% } %><% } %>" id="draw" data-option="draw">
                        <h3 class="bet-type" data-option="draw" >Draw</h3>
                        <p data-option="draw" ><%= drawPrize %></p>
                    </a>

                    <a class="bet-box <% if(playerStatus){ %><% if(playerStatus === 'away-optin'){ %>selected<% } else { %>greyed-out<% } %><% } %>" id="away" data-option="away">
                        <h3 class="bet-type" data-option="away" >Away</h3>
                        <p data-option="away" ><%= awayPrize %></p>
                    </a>
                </div>
                <% playerCurrentWagering = getPlayerWagePercentage(playerWageAmount, totalWagering) %>

                <% if(!playerStatus){ %><div class="opt-in select">Select one of the options above to Opt In</div><% } %>

                <div class="opt-in wagering-bar <% if(!playerStatus){ %>hidden<% } %> <% if(playerCurrentWagering >=0 && playerCurrentWagering < 100) {%> register <%} else { if ( playerCurrentWagering >= 100 )%> register-ok<% }%>">
                    <% if(playerCurrentWagering >=0 && playerCurrentWagering < 100) { %>
                    <p>Complete £<%= (totalWagering-playerWageAmount) %> Wagering to register</p>
                    <span class="playerWager" style="width:<%= playerCurrentWagering %>%;<% if(playerCurrentWagering>0){ %> min-width:40px<% }%>"></span>
                    <% } else {%>
                    <p ><%= wageringComplete %></p>
                    <% } %>
                </div>
        <% } %>
        <h2>Match Calendar</h2>
        <div id="calendar-container">
            <%
                var maxMatches = 3;
                var counter = 0;
                _.each(matches, function(match) {
                %>
            <div class="calendar-box <% if(counter>2) { %>hidden <% } %>">
                <div class="date-box">
                    <p class="month"><%= match['params']['month']%></p>
                    <p class="day"><%= match['params']['day']%></p>
                    <p class="time"><%= match['params']['time']%></p>
                </div>
                <div class="match-description">
                    <p class="match"><%= match['params']['country1']%> vs <%= match['params']['country1']%></p>
                    <p class="stage"><%= match['params']['stage']%></p>
                </div>
            </div>
            <% counter = counter + 1; });%>
            <button id="eligible-matches">
                Show All Eligible Matches            </button>
        </div>
    </div>
