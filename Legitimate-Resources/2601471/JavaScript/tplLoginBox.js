
        <div data-bind="html: Message"></div>
        <div>
            <div class="fl p5">
                <label>E-mail<br />
                <input type="text" id="email" name="email" class="k-textbox large r400" data-bind="value: Email" placeholder="e.g. youremail@jurisdiction.org" data-email-msg="Email format is not valid" required="" />
                <br /><span class="k-invalid-msg" data-for="email"></span>
                </label>
            </div>
            <div class="fl p5">
                <label>
                <span>Password</span>
                <div class="fr"><a href="/forgotpassword/"><small>Forgot password?</small></a></div>
                <br/><input type="password" id="password" name="password" class="k-textbox large" data-bind="value: Password" placeholder="Your password" validationMessage="Please enter your password" required="" />
                <br /><span class="k-invalid-msg" data-for="password"></span>
                </label>
            </div>
            <div class="cb"></div>
            <div id="loginboxStatus"></div>
            <div class="cb"></div>
            <div class="p5">
                <a href="/createaccount/"><span class="btn btn-primary btn-sm">Create New Account</span></a>&nbsp;
                <a id="loginbutton" class="btn btn-success btn-sm">Login</a>
			    <a id="proceedanonymously" class="btn btn-info btn-sm" data-bind="visible: IsProceedAnonymously">Proceed Anonymously</a>
            </div>
        </div>
        <div class="cb"></div>
    