
    <div class="content-holder">
        <div class="top-bar">
            <a href="/" class="go-home close-btn"><i class="icon-home"></i></a>
            <span class="game-name">
                <% if (freePlay) { %>
                Demo Play                <% } else { %>
                Now Playing                <% } %>
                <h3><%= name %></h3>
            </span>

            <a class="logo" href="/">
                <picture>
                    <!--[if IE 9]><video style="display: none;"><![endif]-->
                    <source srcset="https://static.32red.com/img/basic-image/32red-white.svg" type="image/svg+xml">
                    <!--[if IE 9]></video><![endif]-->
                    <img srcset="https://static.32red.com/img/logo.png">
                </picture>
            </a>

            <div class="notifications promotions">
                <a class="show-notifications"></a>
            </div>
            <a class="cta deposit" href="#">Deposit</a>

            <% if (freePlay) { %>
            <a href="#gameplay/<%= id %>" class="real-money-button">Play For Cash </a>
            <% } %>
            <a href="#" class="enable-full-screen"><i class="icon-maximize"></i></a>
            <div class="search-input-image"><i class="icon-search new"></i></div>
            <a href="https://www.32red.com/safer-gambling" class="my-account-player-safety-icon"><i class="icon-my-account-player-safety-icon new"></i> </a>
        </div>

        <div class="otherGames <%= freePlay ? 'freePlay' : 'play-for-real' %> " style="height:<%= desktop_height %>px">
            <span class="next">What Next?</span>
            <div class="more-games">
                            </div>
            <a href="/casino/directory" class="browse">Browse</a>
        </div>

        <div class="play-real-money">
            <h2>
                Would you like to try to win some cash?            </h2>
            <a class="cta big real-money-button" href="#gameplay/<%= id %>">Play For Cash</a>
            <a class="close-btn free-play-button" href="#close">Continue Playing For Free</a>
        </div>
        <div id="game-wrapper" class="<%= desktop_width > 1200 ? 'wide' : '' %>" style="height:<%= desktop_height %>px">
            <% if (!freePlay) { %>
            <div id="net-position-bar" style="max-width:<%= desktop_width %>px"> </div>
            <% } %>
            <a class="disable-full-screen"><i class="icon-minimize"></i></a>
            <iframe id="gameFrame" name="gameFrame" allowfullscreen webkitallowfullscreen mozallowfullscreen  src="about:blank" width="<%= desktop_width %>" height="<%= desktop_height %>" frameborder="0" scrolling="no"></iframe>
            <% if (freePlay) { %>
            <div class="full-screen-option">
                <h3>Would you like to try to win some cash?</h3>
                <a href="#gameplay/<%= id %>" class="cta big real-money-button">Play For Cash</a>
            </div>
            <% } %>
            <div class="background" data-image-host="https://static.32red.com/new-games/" style=""></div>
        </div>

        <div class="background" data-image-host="https://static.32red.com/new-games/" style=""></div>
        <form name="launchForm" action="/game-launch/<%= id %><%= freePlay ? '/free' : '' %>" method="get" target="gameFrame"></form>
        <div class="inGameBanner" style="display: none; height:<%= desktop_height %>px">
            <div class="inGameBanner-box"></div>
        </div>
    </div>
