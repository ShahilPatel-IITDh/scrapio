
    <p class="popover-header">Preference Centre</p>
    <div class="subscription-content">
        <h2>Subscriptions</h2>
        <div class="subscription-landing">
            <div class="landing-content">
                <i class="icon-notepad"></i>
                <h3>OOOOPPPPPSSS</h3>
                <p>Seems like you aren't currently registered to any of our communications.<br>
Click/Tap on the button below and start receiving news about out latest promotions and games</p>
                <a href="#" class="display-subscription gameplay big">Subscribe</a>
            </div>
        </div>
        <form class="subscription-form" method="post" action="" id="import-promo-image">
            <p>We really don't want you to miss out on our great promotions. We regularly give away cash prizes, casino bonuses and more, so please tell us how you would prefer us to reach you.</p>
            <fieldset>
                <p>How do you want us to contact you?</p>
                <ul class="options">
                    <li class="<%= email %>">
                        <label for="email"><i class="icon-tick"></i>Email</label>
                        <input value="email" name="email" id="email" type="checkbox" <%= email %> />
                        
                    </li>
                    <li class="<%= sms %>">
                        <label for="sms"><i class="icon-tick"></i>SMS</label>
                        <input value="SMS" name="sms" id="sms" type="checkbox" <%= sms %> />
                      
                    </li>
                    <li class="<%= phone %>">
                        <label for="phone"><i class="icon-tick"></i>Telephone</label>
                        <input value="telephone" name="phone" id="phone" type="checkbox" <%= phone %> />
                      
                    </li>
                    <li class="<%= post %>">
                        <label for="post"><i class="icon-tick"></i>Post</label>
                        <input value="post" name="post" id="post" type="checkbox" <%= post %> />
                      
                    </li>
                    <li class="<%= social %>">
                        <label for="social"><i class="icon-tick"></i>Social Media</label>
                        <input value="socialMedia" name="social" id="social" type="checkbox" <%= social %> />
                      
                    </li>
                </ul>    
            </fieldset>
            <div data-value="email" class="tooltip"><i class="fa fa-comment unsubscriptionCommentBullet"></i>&nbsp;&nbsp;Are you sure you want to unsubscribe from emails? We won't send too many.</div>
            <div data-value="SMS" class="tooltip"><i class="fa fa-comment unsubscriptionCommentBullet"></i>&nbsp;&nbsp;Are you sure you want to stop sms messages? We only use SMS for our best promotions.</div>
            <div data-value="telephone" class="tooltip"><i class="fa fa-comment unsubscriptionCommentBullet"></i>&nbsp;&nbsp;Are you sure you want to stop promotional phone calls? We will only call you sparingly.</div>
            <div data-value="post" class="tooltip"><i class="fa fa-comment unsubscriptionCommentBullet"></i>&nbsp;&nbsp;Are you sure you want to stop promotional mail?</div>
            <div data-value="socialMedia" class="tooltip"><i class="fa fa-comment unsubscriptionCommentBullet"></i>&nbsp;&nbsp;Are you sure you want to unsubscribe from social? Note we are not able to stop non-targeted ads.</div>

                            <p class="subscriptionCenterTextTwo">We endeavour to send you offers that interest you. To help us determine what to send you, please select the topics you are interested in. Note that it's not always possible to customise promotional marketing communications.</p>
                <fieldset>
                    <p>Select the products that interest you:</p>
                    <ul class="options">
                        <li class="<%= redcasino %>">
                            <label  for="redcasino"><i class="icon-tick"></i>32Red Casino</label>
                            <input name="redcasino" id="redcasino" type="checkbox" <%= redcasino %> />
                        </li>
                        <li class="<%= redsport %>">
                            <label for="redsport"><i class="icon-tick"></i>32Red Sport</label>
                            <input name="redsport" id="redsport" type="checkbox"  <%= redsport %> /> 
                        </li>
                    </ul>
                </fieldset>
                        <div class="confirm-selection">
                <div class="input-wrapper display-none">
                    <p>Confirm your selection above by typing your E-mail address in the box below:</p>
                    <input type="email" name="user-email"/>
                    <button class="" type="submit">Confirm</button>
                    <span class="error-msg">Please enter you email address.</span>
                </div>
                <div class="success-msg">
                    <p>Thank you</p>
                    <span><i class="icon-tick"></i><span class="text"></span></span>
                </div>
            </div>
        </form>
        <div class='loader'><picture><img src='/img/loader.svg'/></picture></div>
    </div>
