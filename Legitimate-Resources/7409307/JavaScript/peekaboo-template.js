

    <div class="peekaboo-inner <%= key%>">
        <div class="close">
            <% if (sound == true) { %>
                <% if (mute == false) { %>
                   <span class="mute"></span>
                   <span  class="unmute display-none"></span>
                <% } else { %>
                    <span class="mute display-none"></span>
                    <span  class="unmute "></span>
                <% } %>
            <% } %>
            <div class="close-peekaboo">
                <img src="https://static.32red.com/img/peekaboo/close-icon-white.png" class="close-peekaboo" />
            </div>
        </div>
        <div class="content">
            <div class="content-inner" style="color:<%= color%>">
                <%= content %>
            </div>
        </div>
        <picture>
            <img src="https://static.32red.com/img/peekaboo/desktop/<%= image%>.png"/>
        </picture>
        <div class="loader">
                <picture>
                    <img src="https://static.32red.com/img/loader.svg">
                </picture>
            </div>
    </div>
