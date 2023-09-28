
    <p class="popover-header">Deposit Limits</p>
    <div class="deposit-limit-content">
        <h2>Your Deposit Limit</h2>

        <div class="no-deposit-limit">
            <div class="landing-content">
                <i class="icon-depositLimits"></i>
                <h3>Deposit limit not set</h3>
                <p>Seems like you don't have any current deposit limit set up.<br>Would you like to set up a deposit limit now?</p>
                <a href="#" data-action="intro" class="action-btn show-intro">I want to change my Deposit Limits</a>
                <br>
                <a href="#close" class="close-btn cta big">Back to Lobby</a>
            </div>
        </div>

        <div class="deposit-limit-intro">
            <div class="landing-content">
                <i class="icon-depositLimits"></i>
                <h3>Deposit limit not set</h3>
                <p>Seems like you don't have any current deposit limit set up.<br>Would you like to set up a deposit limit now?</p>
                <div class="deposit-limit-list bordered-box">
                    <p>Currently you have no deposit limits. Click "Add" below to set the deposit limit</p>
                    <div class="action-butons">
                        <a href="#" data-action="add" class="action-btn cta">Add</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="deposit-limit-exist">
            <div class="landing-content">
                <i class="icon-depositLimits"></i>
                <p>You have selected to deposit a maximum amount of:</p>
                <div class="deposit-limit-list bordered-box">
                    <ul class="initial-limits">
                        <li><span class="period-column">Period</span><span class="amount-column">Amount</span></li>
                    </ul>
                    
                    <% if (hasActivePendingDepositLimits()) { %>
                        <p class="pending-limits-message">You have pending limits. Changes will be made in <span class="cooling-period"><%= coolingPeriod %></span> hours</p>
                    <% } %>

                    <% if (hasExpiredPendingDepositLimits()) { %>
                        <p class="pending-limits-message">You have pending limits. Changes will be made when you log into banking.</p>
                    <% } %>

                    <div class="success-msg">
                        <p class="pending-msg"><span class="text">Your changes will take effect in 24 hours.</span></p>
                        <p class="updated-msg"><span><i class="icon-tick"></i><span class="text">Your preferences have been updated.</span></p>
                    </div>

                    <div class="action-butons">
                        <% if (canAddLimit()) { %>
                            <a href="#" data-action="add" class="action-btn cta"><i class="fa fa-pencil"></i>Add</a>
                        <% } %>
                        <% if (canEditLimit()) { %>
                            <a href="#" data-action="edit" class="action-btn cta black-background"><i class="fa fa-pencil"></i>Edit</a>
                        <% } %>
                        <a href="#" data-action="delete" class="action-btn cta transparent black"><i class="fa fa-trash"></i>Delete</a>
                    </div>
                </div>
            </div>
        </div>

        <form class="depositLimit-form" method="post" action="">
            <i class="icon-depositLimits"></i>
            <p>Set your deposit limit below</p>
            <fieldset class="bordered-box">
                <div class="deposit-limit-list">
                    <ul class="change-limits">
                        <li><span class="period-column">Period</span><span class="amount-column">Amount</span></li>
                    </ul>
                    <p class="values-check"></p>
                    <div class="action-butons">
                    </div>
                </div>

                <p class="extra-message">
                    <span class="change">Choose a limit which suits your level of play. Requests for a decrease to an existing limit will be effective immediately whilst any requested increase will not be effective for a period of 24 hours.</span>
                                        <span class="delete">By confirming your password, you will delete your current deposit limits. This change will not be effective for a period of 24 hours.</span>
                </p>

                <div class="confirm-selection">
                    <div class="input-wrapper">
                        <p>Confirm your selection above by typing your password in the box below:</p>
                        <input type="password" name="user-password"/>
                        <button class="" type="submit">Confirm</button>
                        <a href="#" data-action="cancel" class="action-btn cta black-background">Cancel</a>
                        <span class="error-msg">Please enter your password</span>
                    </div>
                </div>
                
            </fieldset>
        </form>
        <div class='loader'><picture><img src='/img/loader.svg'/></picture></div>
    </div>
