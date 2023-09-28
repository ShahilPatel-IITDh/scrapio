

    <!--icon-->
    <a class="icon show-notifications">
        <i class="icon-promos"></i>
    </a>

    <!--badge-->
    <span class="notifications-number"><%= count() %></span>

    <!--actual notification list-->
    <div class="notifications-list">
        <a class="close-notifications icon"><i class="icon-close"></i></a>

        <div class="notifications-header">Notifications<span class='notifications-header-count'></span></div>

        <!--When no notifications show this-->
        <div class="notifications-empty">
            <i class="fa fa-envelope-open-o"></i>
            <div>You don't have any notifications at the moment.</div>
            <a class="promotions-link" href="/promotions">Show all promotions</a>
        </div>

        <!--Fill this when there are notifications-->
        <ul>
        </ul>

        <div class="notifications-footer"></div>
    </div>

