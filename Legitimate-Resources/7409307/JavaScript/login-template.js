
    <div class="error main-error hide">
        Ah, something you typed in below doesn't make sense. If you think we're wrong, <a href="/support">click here</a>.
    </div>
    <form action="#" method="post">
        <div class="ios-safe-area"></div>
        <p class="header">Login</p>
        <label for="username">Username</label>
        <span class="input">
            <input name="username" type="text" placeholder="Username" value="<%- username %>">
        </span>
        <label>Password</label>
        <span class="input">
            <input name="password" type="password" placeholder="Password" value="<%- password %>">
        </span>
        <div class="msg-success hide">You are now logged in.</div>
        <div class="error error-bad-auth hide"><%- stateDetails %></div>
        <div class="error error-unknown hide"><%- stateDetails %></div>
                <span class="forgot-password">Forgot your <a href="#forgotten-password">Password</a>?</span>
                <input type="hidden" name="g-ver" id="g-ver">
        <button type="submit" class="g-recaptcha"
                data-sitekey="6LfH3mQUAAAAAOM8bXMmeZqoHSCT4vVmQnUT3JeU"
                data-callback="recaptchaCallback">Log In</button>
        <p class="sign-up">Not a member? <a href="#sign-up">Click to Sign Up</a></p>
    </form>
    <div class="loader hide">
        <picture>
            <img src="https://static.32red.com/img/loader.svg">
        </picture>
    </div>

    <a href="#close" class="icon close-btn"><i class="icon-close"></i></a>
