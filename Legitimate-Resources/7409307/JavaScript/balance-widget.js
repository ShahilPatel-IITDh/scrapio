
    <span>Balance<b>
                            <%= totalBalanceExcBingo %>
            </b></span>
    <a href="/banking" class="cta deposit-mobile icon"><i class="icon-deposit2"></i><%= totalBalance %></a>
    <a href="#" class="open-balance">
        <div class="arrow"></div>
    </a>
    <div class="balance-dropdown">
        <ul>
            <li>Cash<b><%= cashBalance %>&nbsp;<div class="balance-percents">(<%= cashBalancePercent %>)</div></b></li> 
            <li>Bonus<b><%= bonusBalance %>&nbsp;<div class="balance-percents">(<%= bonusBalancePercent %>)</div></b></li>
                            <li class="total-balance">Total Balance:<b><%= totalBalanceExcBingo %></b></li>
                        <li class="next-bet">Next bet split<div class="balance-percents">Cash (<%= cashBalanceExcBingoPercent %>)-Bonus (<%= bonusBalancePercent %>)</div></b></li>
        </ul>
        <a class="refresh-balance" href="#">Refresh balance</a>
        <a class="cta deposit" href="/banking">Launch Banking</a>
    </div>
