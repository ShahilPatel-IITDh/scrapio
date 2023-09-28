{"props":{"pageProps":{"pageType":"consumer","legacySourcesUsed":true,"usedServicesConfigs":{"jsonConfigs":[{"configsSource":"services/auth","configsGroup":"business","value":"{\"min-password-length\":8,\"max-password-length\":32,\"error-messages\":[{\"error\":\"EmailAddress_NotExists\",\"message\":\"This email address is already in use.\"},{\"error\":\"EmailAddress_Length\",\"message\":\"Please enter a valid Email Address\"},{\"error\":\"EmailAddress_ValidEmail\",\"message\":\"Please enter a valid Email Address\"},{\"error\":\"EmailAddress_AlreadyMember\",\"message\":\"Great! You are already a member of \\\"%SITE_TITLE%\\\". Please go ahead and \u003ca href=\\\"/login\\\"\u003elogin\u003c/a\u003e now and you will be entered into the Giveaway.\"},{\"error\":\"EmailAddress_NotBlackList\",\"message\":\"This Email Address is not allowed\"},{\"error\":\"FirstName_NonEmpty\",\"message\":\"Please enter your First Name\"},{\"error\":\"FirstName_Length\",\"message\":\"Please enter a valid First Name\"},{\"error\":\"LastName_NonEmpty\",\"message\":\"Please enter your Last Name\"},{\"error\":\"LastName_Length\",\"message\":\"Please enter a valid Last Name\"},{\"error\":\"LastName_NoExtraSpaces\",\"message\":\"Please enter a valid Last Name\"},{\"error\":\"UserName_NotExists\",\"message\":\"This Username is already in use. Please choose another\"},{\"error\":\"UserName_Length\",\"message\":\"Username needs to be between 4 to 16 characters (alphanumeric)\"},{\"error\":\"UserName_ValidPattern\",\"message\":\"Username must be 4-16 alphanumeric characters with at least one letter\"},{\"error\":\"Dob_NotNull\",\"message\":\"Please enter your Date of Birth\"},{\"error\":\"Dob_Coppa_Checked\",\"message\":\"In accordance with COPPA guidelines, you must be 13 years of age or older to use this site.\"},{\"error\":\"Password_NonEmpty\",\"message\":\"Please enter a password\"},{\"error\":\"Password_Length\",\"message\":\"Please correct the password (its length should be %MIN_PASSWORD_LENGTH% - %MAX_PASSWORD_LENGTH% characters)\"},{\"error\":\"Password_NonBlacklisted\",\"message\":\"Please choose a more secure password\"},{\"error\":\"Password_NotContainName\",\"message\":\"Please choose a more secure password (without your name)\"},{\"error\":\"Login_IsValid\",\"message\":\"That email and password combination does not match our records. Please double-check and try again.\"},{\"error\":\"Login_NotIsBlocked\",\"message\":\"Too many failed login attempts. Please try again later\"},{\"error\":\"Login_IsDeactivated\",\"message\":\"Your account has been deactivated.\u003cbr\u003ePlease contact \u003ca class=\\\"alert-link\\\" id=\\\"deactivationLoginAttemptCta\\\" href=\\\"%CUSTOMER_SUPPORT_URL%\\\" target=\\\"_blank\\\"\u003eCustomer Support\u003c/a\u003e\"},{\"error\":\"SwagCode_IsValid\",\"message\":\"Sign Up Code is Invalid\"},{\"error\":\"EmailUsername_NonEmpty\",\"message\":\"Please enter an Email Address\"},{\"error\":\"Password_IsMatch\",\"message\":\"Your passwords don't match\"},{\"error\":\"Generic_Msg\",\"message\":\"There was an unexpected error processing your request. Please try again or contact our \u003ca href=\\\"%SUPPORT_URL%\\\" target=\\\"_blank\\\"\u003eCustomer Support\u003c/a\u003e\"},{\"error\":\"Location_AcceptsRegistration\",\"message\":\"%SITE_TITLE% is not yet available in your country but we are working hard to get there. We will contact you when we launch\"},{\"error\":\"IPAddress_NotBlacklisted\",\"message\":\"Please contact customer support (Error code C0NR)\"},{\"error\":\"Cxid_Not_Match\",\"message\":\"Please correct your membership number\"},{\"error\":\"SocialMember_NotExists\",\"message\":\"An account is already linked to this social network account. Please login\"},{\"error\":\"SignatureError\",\"message\":\"Unexpected Signature Error, Please \u003ca href=\\\"%SUPPORT_URL%\\\"\u003eContact Support\u003c/a\u003e\"},{\"error\":\"EmailAddress_NoAccess\",\"message\":\"Please provide access to your email address in order to register\"},{\"error\":\"Zip_NonEmpty\",\"message\":\"Please enter a valid Postal (Zip) Code\"},{\"error\":\"Zip_Length\",\"message\":\"Please enter a valid Postal (Zip) Code\"},{\"error\":\"Zip_Location\",\"message\":\"Please enter a valid Postal (Zip) Code\"},{\"error\":\"Vuser_NotExists\",\"message\":\"That account already exists\"},{\"error\":\"RecaptchaExpired\",\"message\":\"Please verify that you are not a robot\"},{\"error\":\"Failed\",\"message\":\"There was an error processing your request. Please contact \u003ca href=\\\"%SUPPORT_URL%\\\" target=\\\"_blank\\\"\u003eCustomer Support\u003c/a\u003e\"},{\"error\":\"Password_Valid\",\"message\":\"Password must be at least %MIN_PASSWORD_LENGTH% characters long, and contain at least one letter and one number.\"},{\"error\":\"Address1_Valid\",\"message\":\"Please enter a valid address\"},{\"error\":\"EmptyPassword\",\"message\":\"Original or new password is invalid.\"},{\"error\":\"PasswordTooShort\",\"message\":\"Passwords must be at least %MIN_PASSWORD_LENGTH% characters.\"},{\"error\":\"PasswordBlackListed\",\"message\":\"Sorry. That password is not permitted.\"},{\"error\":\"PasswordContainsNameOrEmail\",\"message\":\"Password must not contain user name.\"},{\"error\":\"InvalidNewPassword\",\"message\":\"New password is invalid.\"},{\"error\":\"InvalidCurrentPassword\",\"message\":\"Original password is invalid.\"},{\"error\":\"DefaultPassword\",\"message\":\"Error. Could not update password.\"},{\"error\":\"tooLongPassword\",\"message\":\"Sorry. Your password may not exceed %MAX_PASSWORD_LENGTH% characters.\"},{\"error\":\"tooShortPassword\",\"message\":\"Password must be at least %MIN_PASSWORD_LENGTH% characters.\"},{\"error\":\"passwordsMismatch\",\"message\":\"New passwords do not match.\"},{\"error\":\"PasswordMismatch\",\"message\":\"New passwords do not match.\"},{\"error\":\"InvalidPassword\",\"message\":\"The password you entered is invalid.\"},{\"error\":\"InvalidInput\",\"message\":\"You must click the link sent from the reset password email that we sent you.\"},{\"error\":\"ResetFlagUnsettable\",\"message\":\"Could not update password. Try again in a few minutes.\"},{\"error\":\"PasswordUnsettable\",\"message\":\"Could not update password. Try again in a few minutes.\"},{\"error\":\"Expired\",\"message\":\"The link has expired.  You must resend the reset password email.\"},{\"error\":\"PasswordContainsName\",\"message\":\"The password can not contain your first or last name.\"},{\"error\":\"PasswordEmpty\",\"message\":\"The password you entered can't be empty.\"},{\"error\":\"PasswordTooShort_\",\"message\":\"Password must be at least %MIN_PASSWORD_LENGTH% characters.\"}],\"reg-method\":{\"default\":2,\"mobile\":4},\"email-error-message\":\"Use a valid email. Example: \\n\\\"John@domain.com\\\"\",\"sign-up\":{\"has-free-text\":true,\"has-extra-disclaimer\":true}}"},{"configsSource":"services/homepage","configsGroup":"design","value":"{\"be-rewarded-sign-up-banner\":{\"background\":\"url(/_next-static/images/homepage/sites/ibd/main-background.jpg) 50% no-repeat\"},\"how-it-works\":{\"background\":\"url(/_next-static/images/homepage/common/mobile/arrow-double-down.png) no-repeat\"},\"accordion\":{\"background\":\"url(/_next-static/images/homepage/common/mobile/arrow-down.png) no-repeat\"},\"as-seen-on\":{\"background\":\"unset\"}}"},{"configsSource":"services/homepage","configsGroup":"business","value":"{\"promo\":{\"title-mobile\":\"Earn Cash Online\",\"tasks\":[{\"id\":0,\"text\":\"Taking Surveys\",\"image\":\"/_next-static/images/homepage/common/surveys-icon.png\",\"name\":\"Surveys Icon\"},{\"id\":1,\"text\":\"Shopping \u0026 Cash Offers\",\"image\":\"/_next-static/images/homepage/common/shopping-icon.png\",\"name\":\"Shopping Icon\"},{\"id\":2,\"text\":\"Playing Games\",\"image\":\"/_next-static/images/homepage/common/games-icon.png\",\"name\":\"Games icon\"}]},\"how-it-works\":{\"tasks\":[{\"id\":0,\"image\":\"/_next-static/images/homepage/sites/%SITE_NAME%/brand-icon.png\",\"image-mobile\":\"/_next-static/images/homepage/common/brand-icon.png\",\"name\":\"Brand Icon\"},{\"id\":1,\"image\":\"/_next-static/images/homepage/sites/%SITE_NAME%/member-icon.png\",\"image-mobile\":\"/_next-static/images/homepage/common/mobile/people-icon.png\",\"name\":\"Member Icon\"},{\"id\":2,\"image\":\"/_next-static/images/homepage/sites/%SITE_NAME%/device-icon.png\",\"image-mobile\":\"/_next-static/images/homepage/common/mobile/devices-icon.png\",\"name\":\"Device Icon\"},{\"id\":3,\"image\":\"/_next-static/images/homepage/sites/%SITE_NAME%/dollarsign-icon.png\",\"image-mobile\":\"/_next-static/images/homepage/common/dollarsign-icon.png\",\"name\":\"Dollar Icon\"}]},\"how-to-earn\":{\"title\":\"How You'll Earn Free Cash\",\"tasks-mobile\":[],\"tasks\":[{\"id\":0,\"image\":\"/_next-static/images/homepage/common/surveys-icon.png\",\"name\":\"Surveys Icon\",\"title\":\"Take Paid Online Surveys\",\"title-href\":\"/g/paid-surveys\"},{\"id\":1,\"image\":\"/_next-static/images/homepage/common/games-icon.png\",\"name\":\"Games Icon\",\"title\":\"Get Rewarded for Playing Games\",\"title-href\":\"/g/paid-games\"},{\"id\":2,\"image\":\"/_next-static/images/homepage/common/shopping-icon.png\",\"name\":\"Shopping Icon\",\"title\":\"Cashback for Online Shopping\",\"title-href\":\"/g/paid-shopping\"},{\"id\":3,\"image\":\"/_next-static/images/homepage/common/paidemail-icon.png\",\"name\":\"Emails Icon\",\"title\":\"Get Paid to Read Emails\",\"title-href\":\"/g/paid-email\"},{\"id\":4,\"image\":\"/_next-static/images/homepage/sites/%SITE_NAME%/coupon-icon.png\",\"name\":\"Grocery Icon\",\"title\":\"Grocery Cash Rewards\",\"title-href\":\"/magic-receipts\"}]},\"as-seen-on\":{\"has-text-banner\":\"\"},\"rewards\":{\"reward\":\"$80\",\"image\":\"/_next-static/images/homepage/sites/%SITE_NAME%/millions-paid-to-members.png\",\"name\":\"Millions Paid\"},\"partners\":{\"has-image-mobile\":true}}"}],"cssConfigs":[{"configsSource":"services/homepage","configsGroup":"design","value":":root{--homepage-be-rewarded-sign-up-banner-background:url( /_next-static/images/homepage/sites/ibd/main-background.jpg ) 50% no-repeat;--homepage-how-it-works-background:url( /_next-static/images/homepage/common/mobile/arrow-double-down.png ) no-repeat;--homepage-accordion-background:url( /_next-static/images/homepage/common/mobile/arrow-down.png ) no-repeat;--homepage-as-seen-on-background:unset}"}]},"consumerPageInfo":{"layoutSettings":{"headerMode":"base","footerMode":"base"}}},"__N_SSG":true},"page":"/","query":{},"buildId":"HQFDaYgqGhrJFcGy-DvcR","isFallback":false,"gsp":true,"scriptLoader":[]}