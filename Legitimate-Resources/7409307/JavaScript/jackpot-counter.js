
    <span class="jackpot-text">
        <%= (jackpotIdentifier == 'MUST_BE_WON_MEGA') ?
        '<span class="icon icon-hot-games"></span><span class="jackpot-value-text"> Must win Jackpot</span>'
        :
        '<span class="jackpot-value-text">Jackpot</span>'
        %>
    </span>
    <span class="jackpot-value-wrapper">£<span class="jackpot-value"><%= friendlyValue %></span></span>
