
    <div class="net-wrapper">
        <div class="net-bar">
            <span class="net-bar-item">
                <i class="icon-clock"></i>
                <span class="timeInterval"><%= moment().hours((typeof h !== 'undefined') ? h : 0).minutes((typeof m !== 'undefined') ? m : 0).seconds((typeof s !== 'undefined') ? s : 0).format('HH:mm:ss') %></span>
            </span>
            <span class="net-bar-item">
                <i class="icon-wallet"></i>
                <span class="totalBalance"><%= totalBalanceExcBingo %></span>
            </span>
            <span class="net-bar-item">
                <i class="icon-tag"></i>
                <%= totalNetPosition %>
            </span>
            <a href="#" class="open-netPosition icon-netPosition <%= (typeof openNetPositionClass !== 'undefined') ? openNetPositionClass : ''  %>"><i class="arrow"></i></a>
        </div>

        <div class="net-balance-wrapper <%= (typeof openNetPositionClass !== 'undefined') ? openNetPositionClass : ''  %>">
            <div class="net-balance">
                <ul>
                    <ul class="group1">
                        <li>
                            <span>
                                <b>SESSION TIME:</b>
                                <span class="timeInterval"><%= moment().hours((typeof h !== 'undefined') ? h : 0).minutes((typeof m !== 'undefined') ? m : 0).seconds((typeof s !== 'undefined') ? s : 0).format('HH:mm:ss') %></span>
                            </span>
                            <span>
                                <b>NET POSITION:</b>
                                <span><%= totalNetPosition %></span>
                            </span>
                        </li>
                    </ul>
                    <ul class="group2">
                        <li>
                            <span>
                                <b>Balance:</b>
                                <span class="totalBalance"><%= totalBalanceExcBingo %></span>
                            </span>
                            <a class="refresh-balance" href="#">
                                <i class="icon icon-reload"></i>
                                <span>Refresh balance</span>
                            </a>
                        </li>

                        <li>
                            <span>
                                <b>Cash (<%= cashBalancePercent %>) :</b>
                                <span class="totalBalance"><%= cashBalance %></span>
                            </span>
                            <span class="bonus-split">
                                Next bet split:
                                    <%= cashBalanceExcBingoPercent %>
                                Cash,
                                    <%= bonusBalancePercent %>
                                Bonus                            </span>
                        </li>

                        <li>
                            <span>
                                <b>Bonus (<%= bonusBalancePercent %>):</b> <%= bonusBalance %>
                            </span>
                        </li>
                    </ul>
                </ul>

                <a class="cta deposit" href="/banking">Launch Banking</a>
            </div>
        </div>
    </div>
