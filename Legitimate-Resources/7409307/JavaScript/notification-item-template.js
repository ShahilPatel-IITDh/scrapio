
    <figure>
        <a href="#"><img src="https://static.32red.com/img/notification-icon/desktop/<%= image %>.jpg"/></a>
    </figure>
    <div class="notification-info">
        <h3><%= title %></h3>
        <p><%= text %></p>

        <% if (isLoggedIn()) { %>
            <% if (isMinibonus()) { %>
                <a href="<%= link %>" class=""><%= link_text %></a>
            <% } else { %>
                <%= termsLink %>
                <a href="<%= link %>" class="open-promo"><%= link_text %></a>
            <% } %>
        <% } else { %>
            <a class="login-btn" href="#login">Log In</a>
        <% } %>
    </div>
    <div class="notification-type <%= type %>">
            <% if(type === 'system'){ %>
                <i class="fa fa-exclamation"></i>
            <% } else { %>
                <i class="icon-promos"></i>
            <% } %>
    </div>
   <a href="#" class="close-notification icon"><i class="icon-close"></i></a>
