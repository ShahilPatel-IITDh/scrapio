

    <% if(isFullContent()) { %>
                    <a href="#gameplay/<%= id %>">
                <img src="https://static.32red.com/new-games/game-icon/small/<%= game_image %>.jpg"/>
            </a>
            <% } else { %>
        <a href="#" class="isBlurred">
            <img class="blurred" src="https://static.32red.com/new-games/game-icon/small/<%= game_image %>.jpg"/>
            <img class="padlock" src="https://static.32red.com/img/basic-image/Padlock_1.png"/>
        </a>
    <% } %>

    <div class="game-info">
        <!-- <h3><span><%= game_name %></span></h3> -->
        <ul>
            <li class="star">
                <div class="star-wrapper">
                    <span class="icon"><i class="icon-star"></i></span>
                </div>
                <% if(isFullContent()) { %>
                <div class="hover-box">
                        <img src="https://static.32red.com/img/achievements/mobile/<%= game_image %>-1.jpg"/>
                        <div><%= translations[0] %></div>
                                                    <a href="#gameplay/<%= id %>" class="cta">Play Now</a>
                                        </div>
                <% } %>     
            </li>
            <li class="star">
                <div class="star-wrapper">
                    <span class="icon"><i class="icon-star"></i></span>
                </div>
                <% if(isFullContent()) { %>
                <div class="hover-box">
                        <img src="https://static.32red.com/img/achievements/mobile/<%= game_image %>-2.jpg"/>
                        <div><%= translations[1] %></div>
                                                    <a href="#gameplay/<%= id %>" class="cta">Play Now</a>
                                        </div>
                <% } %>
            </li>
            <li class="star">
                <div class="star-wrapper">
                    <span class="icon"><i class="icon-star"></i></span>
                </div>
                <% if(isFullContent()) { %>
                <div class="hover-box">
                        <img src="https://static.32red.com/img/achievements/mobile/<%= game_image %>-3.jpg"/>
                        <div><%= translations[2] %></div>
                                                    <a href="#gameplay/<%= id %>" class="cta">Play Now</a>
                                        </div>
                <% } %>
            </li>
        </ul>
    </div>
