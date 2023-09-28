
    <% if (Red.DeviceType !== "desktop") { %>
    <!-- if it's mobile games -->
    <iframe id="gameFrame" class="mobile-live-casino" name="gameFrame" src="/game-launch/<%= id %>" frameborder="0" width="100%" height="auto" style="bottom: -1px;" scrolling="no"></iframe>
    <%} else {%>
    <!-- if it's desktop games -->
    <div class="content-holder live-casino">
        <div class="top-bar">
            <a href="/" class="go-home close-btn"><i class="icon-home"></i></a>
            <span class="game-name">
                    Now Playing                    <h3><%= name %></h3>
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
                <a class="show-notifications">
                    Promotions                </a>
            </div>
            <a class="cta deposit" href="#">Deposit</a>

            <a href="#" class="enable-full-screen"><i class="icon-maximize"></i></a>
            <div class="search-input-image"><i class="icon-search new"></i></div>
            <a href="https://www.32red.com/safer-gambling" class="my-account-player-safety-icon"><i class="icon-my-account-player-safety-icon new"></i> </a>
        </div>

        <div class="otherGames play-for-real" style="height:<%= desktop_height %>px">
            <span class="next">What Next?</span>
            <div class="more-games">
                            </div>
            <a href="/casino/directory" class="browse">Browse</a>
        </div>
        <div id="game-wrapper" class=" live-casino-wrapper <%= desktop_width > 1200 ? 'wide' : '' %>" style="max-width:<%= desktop_width %>px; height:<%= desktop_height %>px">
            <a class="disable-full-screen"><i class="icon-minimize"></i></a>
            <iframe id="gameFrame" name="gameFrame" src="/game-launch/<%= id %>" frameborder="0" width="100%" height="100%" scrolling="no"></iframe>
            <div class="left-character"></div>
            <div class="right-character"></div>
        </div>
        <div class="background" data-image-host="https://static.32red.com/new-games/" style=""></div>
    </div>

    <div class="inGameBanner" style="display: none; height:<%= desktop_height %>px">
        <div class="inGameBanner-box" >
        </div>
    </div>

    <% } %>
