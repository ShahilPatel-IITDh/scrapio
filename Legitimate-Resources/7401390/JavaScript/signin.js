//MAIN okta-login-container Tasks
var regFields_def = ["email", "password", "firstName", "lastName"]; //default input=text fields to show
var isSPAFirstLoad = true;
var currentController = "";

window.onpopstate = function (event) {
  if (event.target.currentController == "primary-auth") {
    if (window.location.pathname == "/") {
      window.history.back();
    } else if (window.location.pathname.indexOf("/signin/refresh-auth-state") != -1) {
      window.history.go(-2);
    }
  }
};

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function addCheckmark(element) {
  const iconBackground = document.createElement("span");
  iconBackground.classList.add("sonos-checkmark-background");
  const icon = document.createElement("i");
  icon.classList.add("sonos-checkmark");
  iconBackground.appendChild(icon);
  insertAfter(iconBackground, element);
}

// Okta specific css rules
(function () {
  // eslint-disable-next-line no-undef
  addCSSRule(".required-fields-label", "display: none");
  // eslint-disable-next-line no-undef
  addCSSRule(".o-form-input-name-password .icon", "display: none");
  // eslint-disable-next-line no-undef
  addCSSRule(".forgot-password .o-form-explain", "display: none");
  // eslint-disable-next-line no-undef
  addCSSRule(".recovery-loading", "display: none");
})();

var navTo = "";
var hasNavigated = 0;
//checks if we should navigate somewhere else
function checkNavToController() {
  var controller = "";
  /*On inital load checkNavToController is called twice
    hasNavigated needs to stop navigation after those two initial calls
    so that navigating can work in the widget instead of returning back 
    to the registration page. */
  if (hasNavigated == 2) return controller;

  // eslint-disable-next-line no-undef
  if (urlParams.has("nav")) {
    // eslint-disable-next-line no-undef
    controller = urlParams.get("nav");
    // eslint-disable-next-line no-undef
  } else if (getContextStateField("nav") !== "") {
    // eslint-disable-next-line no-undef
    controller = getContextStateField("nav");
  }
  navTo = controller;
  hasNavigated++;
  return controller;
}

var hasInviteEmail = false;
var inviteEmail = "";
// Checks if an invite ID has been sent to Okta Widget
function checkForInvite() {
  // eslint-disable-next-line no-undef
  const inviteId = getContextStateField("inviteId");
  // eslint-disable-next-line no-undef
  const email = getContextStateField("email");

  hasInviteEmail = inviteId !== "" && email !== "";
  inviteEmail = email;
}

// eslint-disable-next-line no-unused-vars
function transformUsername(username, operation) {
  if (hasInviteEmail && operation === "PRIMARY_AUTH") {
    return inviteEmail;
  }
  return username;
}

function checkInviteEmail(email) {
  if (!hasInviteEmail) {
    return true;
  } else {
    return email === inviteEmail;
  }
}

//execute clicking on a link to navigate to another controller
function triggerNavTo() {
  //Create Account
  var navToController = checkNavToController();
  if (navToController == "signin/register" || navToController == "registration") {
    var element = document.querySelector('a[class="registration-link"]');
    if (element !== undefined && element !== null) {
      navTo = "complete"; //set it to complete!
      element.click();
      return true;
    }
  }
  //Forgot Password
  else if (navToController == "signin/forgot-password" || navToController == "forgot-password") {
    element = document.querySelector('a[data-se="forgot-password"]');
    if (element !== undefined && element !== null) {
      navTo = "complete"; //set it to complete!
      element.click();
      return true;
    }
  }
  navTo = "complete"; //set it to complete so any post actions will take place on reload
  return false;
}

//Handle some css display when navigating between controllers
function navToggle(stage) {
  //PRE setup
  if (stage == "pre") {
    if (window.variantVars.showNav == false) {
      // eslint-disable-next-line no-undef
      addCSSRule(".registration-container", "display: none");
      // eslint-disable-next-line no-undef
      addCSSRule(".auth-footer", "display: none");
    }
    //hide everything only if first load and there is a navto
    if (isSPAFirstLoad && navTo !== "") {
      // eslint-disable-next-line no-undef
      addCSSRule("#okta-login-container", "display: none");
    }
  }
  //POST setup
  else {
    //Forgot Password is needed as is back to login on some pages!
    if (currentController === "forgot-password" || currentController === "primary-auth") {
      var element = document.querySelector('[class="auth-footer"]');
      if (element !== undefined && element !== null) {
        element.style = "display:block";
      }
    } else if (window.variantVars.showNav == false && currentController === "registration") {
      element = document.querySelector('[class="auth-footer"]');
      if (element !== undefined && element !== null) {
        element.style = "display:none";
      }
    }

    //always show just in case it was hidden!
    if (navTo == "complete") {
      element = document.querySelector('div[id="okta-login-container"]');
      if (element !== undefined && element !== null) {
        element.style = "display:block";
      }
      navTo = "";
    }
  }
}

navToggle("pre");

function addSbizHeader() {
  const container = document.getElementById("okta-login-container");
  const oktaSignIn = document.getElementById("okta-sign-in");

  const headerContainer = document.createElement("header");
  headerContainer.className = "sbiz-header-container";

  const brandImg = document.createElement("div");
  brandImg.className = "sbiz-brand-img";

  const logoContainer = document.createElement("div");
  logoContainer.className = "sbiz-logo-container";

  const sbizLogoEle = document.createElement("img");
  sbizLogoEle.className = "sbiz-sonos-logo";
  sbizLogoEle.alt = "Sonos Pro";

  logoContainer.prepend(sbizLogoEle);

  headerContainer.appendChild(brandImg);
  oktaSignIn.prepend(logoContainer);

  container.insertBefore(headerContainer, oktaSignIn);
}

function addSbizLineElement() {
  const title = document.querySelector(".okta-form-title");

  if (title && title.parentNode) {
    const line = document.createElement("div");
    line.className = "sbiz-line";
    title.parentNode.insertBefore(line, title.nextSibling);
  }
}

function addSbizFormElements() {
  const container = document.querySelector(".o-form-fieldset-container");
  const labelContainer = document.createElement("div");
  labelContainer.className = "sbiz-form-label-container";

  // eslint-disable-next-line no-undef
  const labelContent = getContent("primaryauth.label", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false, true);
  const label = document.createElement("h3");
  label.className = "sbiz-form-label";
  label.innerHTML = labelContent;
  labelContainer.appendChild(label);

  container.parentNode.insertBefore(labelContainer, container);

  const registrationLink = document.createElement("a");
  registrationLink.className = "sbiz-registration-link";
  registrationLink.target = "_blank";
  registrationLink.href = "https://www.sonos.com/en-us/sonos-pro?modalOnLoad=sonos-pro-lead-form";
  // eslint-disable-next-line no-undef
  registrationLink.innerHTML = getContent("registration.signup.text", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false, true);

  const registrationContainer = document.querySelector(".content-container");
  registrationContainer.appendChild(registrationLink);
}

function addSbizFooter() {
  const container = document.getElementById("okta-login-container");
  const oktaSignIn = document.getElementById("okta-sign-in");

  const footerContainer = document.createElement("footer");
  footerContainer.className = "sbiz-footer-container";
  // Footer - copy right
  const copyRightSpan = document.createElement("span");
  const copyRight = document.createTextNode("Â© " + new Date().getFullYear() + " Sonos Inc.");
  copyRightSpan.appendChild(copyRight);
  // Footer - Legal
  const legalLink = document.createElement("a");
  legalLink.className = "sbiz-link";
  legalLink.setAttribute("title", "Legal");
  legalLink.setAttribute("href", "https://www.sonos.com/legal");
  const legalLinkContent = document.createTextNode("Legal");
  legalLink.appendChild(legalLinkContent);
  // Footer - Privacy
  const privacyLink = document.createElement("a");
  privacyLink.className = "sbiz-link";
  privacyLink.setAttribute("title", "Privacy Statement");
  privacyLink.setAttribute("type", "text/css");
  privacyLink.setAttribute("href", "https://www.sonos.com/legal/privacy");
  const privacyLinkContent = document.createTextNode("Privacy Statement");
  privacyLink.appendChild(privacyLinkContent);

  footerContainer.appendChild(copyRightSpan);
  footerContainer.appendChild(legalLink);
  footerContainer.appendChild(privacyLink);

  container.appendChild(footerContainer, oktaSignIn);
}

function addSbizHeaderAndFooter() {
  addSbizHeader();
  addSbizFooter();
}

/***************START ONE TIME OKTA LOAD *******************/
//Task Wrangler - executed by onReady event fired by the OKTA Sign-in Widget!
//this happens once on SPA load and happens SECOND after onOktaRender
// eslint-disable-next-line no-unused-vars
function onOktaReady(context) {
  if (isSPAFirstLoad) {
    //only allow this to happen once on page load!
    isSPAFirstLoad = false;
    //Execute tasks

    //Move content divs into the the okta-sign-in element!
    var sHeaderEle = document.getElementById("sonosHeader");
    var sFooterEle = document.getElementById("sonosFooter");
    var finalEle = document.getElementById("okta-sign-in");
    //move header to top inside okta-sign-in element
    finalEle.insertBefore(sHeaderEle, finalEle.firstChild);
    //move footer to bottom of okta-sign-in element
    finalEle.append(sFooterEle);

    //SONOS LOGO - Show it by moving the logo inside the okta-sign-in element, which will also cause css to display it!
    if (window.variantVars.showLogo) {
      var slogoEle = document.getElementById("sonosLogo");
      finalEle = document.getElementById("okta-sign-in");
      finalEle.insertBefore(slogoEle, finalEle.firstChild);
    } else if (window.variantVars.showBizLogo) {
      addSbizHeaderAndFooter();
    }

    //CSS Overrides
    if (navTo == "") {
      navToggle("post");
    }
  }
}

let restartTimerId;
function restartReloadTimer() {
  const timeToWait = 1000 * 60 * 9;

  if (restartTimerId) {
    clearTimeout(restartTimerId);
  }

  restartTimerId = setTimeout(function () {
    window.location.reload();
  }, timeToWait);
}

/***************END ONE TIME OKTA LOAD *******************/

/***************START CONTROLLER CHANGE LOAD *******************/
//this happens on every controller load and happens FIRST - the name matches what the parent page is calling!
//This is triggered twice so on first page load, don't let it execute!
// eslint-disable-next-line no-unused-vars
function onOktaRender(context) {
  restartReloadTimer();
  checkForInvite();
  currentController = context.controller;

  if (!isSPAFirstLoad && !triggerNavTo()) {
    //Show/Hide Header - needs to happen on each controller load since they are re-loaded!
    if (!window.variantVars.showHeader) {
      var element = document.querySelector('h2[data-se="o-form-head"]');
      if (element != null) {
        element.style.display = "none";
      }
    }
    //load content for this controller
    populateHeadersFooterContent();
    addTestingIdWithQuery(".okta-form-title", "title");
    addTestingIdWithQuery(".okta-form-subtitle", "subTitle");
    //CONTROLLERS WORK - move to switch/case if long enough
    //Main LOGIN Controller

    if (window.variantVars.variant === "sbiz") {
      addSbizLineElement();
    }

    if (currentController === "primary-auth") {
      set_primary_auth();
    }
    //Forgot Password Controller
    else if (currentController === "forgot-password") {
      set_forgot_password();
    }
    // Password Reset Controller
    else if (currentController === "password-reset") {
      password_reset();
    }
    //Registration Controller
    else if (currentController === "registration") {
      set_registration();
    } else if (currentController === "password-reset-email-sent") {
      set_password_reset_email_sent();
    } else if (currentController === "account-unlock") {
      set_account_unlock();
    } else if (currentController === "account-unlock-email-sent") {
      set_account_unlock_email_sent();
    }

    //only execute this after the first time
    if (!isSPAFirstLoad) {
      //CSS Overrides
      navToggle("post");
    }
  }
}

function getVariant() {
  return window.variantVars.variant == "" ? window.variantVars.variantfallback : window.variantVars.variant;
}

// eslint-disable-next-line no-unused-vars
function onOktaRegistrationPreSubmit(postData, onSuccess, onFailure) {
  if (hasInviteEmail) {
    // eslint-disable-next-line no-undef
    const errorSummary = getContent("invite-email-error.errorSummary", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
    const inviteEmailError = {
      errorSummary,
    };

    if (!checkInviteEmail(postData.email)) {
      onFailure(inviteEmailError);
      return;
    }
  }

  if (window.variantVars.oktaLang == "nb") {
    postData.preferredLanguage = "nb";
    postData.countryCode = "NO";
    postData.locale = "nb_NO";
  } else if (window.region == null) {
    postData.preferredLanguage = window.lang;
    postData.locale = window.lang + "_" + window.lang.toUpperCase();
  } else {
    postData.preferredLanguage = window.lang + "-" + window.region;
    postData.countryCode = window.region;
    postData.locale = window.lang + "_" + window.region;
  }

  const authContainer = document.querySelector(".auth-container");
  authContainer.style.display = "none";

  showLoader();
  onSuccess(postData);
}

function showLoader() {
  const oktaLoginContainer = document.getElementById("okta-login-container");
  const loaderContainer = document.createElement("div");
  loaderContainer.className = "loader-container";
  const loader = document.createElement("div");
  loader.className = "loader";
  loaderContainer.appendChild(loader);
  oktaLoginContainer.appendChild(loaderContainer);
}

function removeLoader() {
  const loader = document.querySelector(".loader-container");
  loader.remove();
}

// eslint-disable-next-line no-unused-vars
function onOktaError(context, error) {
  if (context.controller == "recovery-loading") {
    set_recovery_loading();
  } else if (context.controller == "registration") {
    const registration = document.querySelector(".auth-container");
    registration.style.display = "block";
    removeLoader();

    if (error.message) {
      const thisvariant = getVariant();
      let errorMessage = "";
      if (error.message == "E0000001") {
        // eslint-disable-next-line no-undef
        errorMessage = getContent(context.controller + "." + error.message, thisvariant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
      } else if (error.message == "SONOS-001") {
        // eslint-disable-next-line no-undef
        errorMessage = getContent(context.controller + "." + error.message, thisvariant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
      }

      errorMessage = errorMessage != "" ? errorMessage : error.message;
      const oktaErrorInfoBox = document.querySelector(".okta-form-infobox-error p");
      oktaErrorInfoBox.innerHTML = errorMessage;
    }
  } else if (context.controller == "primary-auth") {
    addTestingIdWithQuery(".okta-form-infobox-error p", "errorAlert");
  }
}

//load header and footer content based on JSON data - requires content to be defined!
function populateHeadersFooterContent() {
  var sHeaderEle = document.getElementById("sonosHeader");
  var sFooterEle = document.getElementById("sonosFooter");
  var thisvariant = getVariant();
  //HEADER
  // eslint-disable-next-line no-undef
  var headerContent = getContent(currentController + ".headerContent", thisvariant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
  if (headerContent !== undefined && headerContent !== "") {
    sHeaderEle.innerHTML = headerContent;
    sHeaderEle.style.display = "block";
  } else if (sHeaderEle) {
    //hide element if it has no content
    sHeaderEle.style.display = "none";
  }

  //SUBHEADERS
  // eslint-disable-next-line no-undef
  var subheaderContent = getContent(currentController + ".subheader", thisvariant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
  if (subheaderContent !== undefined && subheaderContent !== "") {
    var formHeader = document.querySelector('h2[data-se="o-form-head"]');
    if (formHeader != null) {
      var subheaderDiv = document.createElement("div");
      subheaderDiv.className = "subHeader";
      subheaderDiv.innerHTML = subheaderContent;
      formHeader.parentElement.insertBefore(subheaderDiv, formHeader.nextSibling);
    }
  }

  //FOOTER
  // eslint-disable-next-line no-undef
  var footerContent = getContent(currentController + ".footerContent", thisvariant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
  let langRegion = window.lang;
  if (window.region == null || window.lang == "en") {
    langRegion = "en";
  } else if (window.lang.length == 2) {
    langRegion = window.lang + "-" + window.region.toLowerCase();
  }

  footerContent = footerContent.replaceAll("{lang}", langRegion);
  if (footerContent !== undefined && footerContent !== "") {
    sFooterEle.innerHTML = footerContent;
    sFooterEle.style.display = "block";
  } else if (sFooterEle) {
    //hide element if it has no content
    sFooterEle.style.display = "none";
  }
}

var submitButtonState = {
  email: false,
  password: false,
  confirmPassword: false,
  firstName: false,
  lastName: false,
};

function submitButtonEnabled() {
  return Object.values(submitButtonState).reduce((acc, cur) => acc && cur);
}

function updateSubmitButton(button, formElem, formElemState) {
  if (Object.prototype.hasOwnProperty.call(submitButtonState, formElem)) {
    submitButtonState[formElem] = formElemState;
  }
  if (submitButtonEnabled()) {
    // okta widget uses an `a` link element for the forgot password button instead
    // of an `input` element, so we have to use a separate 'button-disabled' class
    button.disabled = false;
    button.classList.remove("button-disabled");
    button.removeAttribute("aria-disabled");
  } else {
    button.disabled = true;
    button.classList.add("button-disabled");
    button.setAttribute("aria-disabled", "true");
  }
}

function watchElementInput(element, inputStateName, submitButton) {
  let input = element ? element.querySelector("input") : undefined;
  if (input) {
    updateSubmitButton(submitButton, inputStateName, !!input.value);
    input.oninput = function () {
      updateSubmitButton(submitButton, inputStateName, !!input.value);
    };
  } else {
    updateSubmitButton(submitButton, inputStateName, true);
  }
}

// watch user input into form fields to determine submit button state
function watchFormInput() {
  const submitButton = document.getElementsByClassName("button-primary")[0];
  if (submitButton) {
    const emailDiv = document.getElementsByClassName("o-form-input-name-username")[0] || document.getElementsByClassName("o-form-input-name-email")[0];
    watchElementInput(emailDiv, "email", submitButton);
    const passwordDiv = document.getElementsByClassName("o-form-input-name-password")[0] || document.getElementsByClassName("o-form-input-name-newPassword")[0];
    watchElementInput(passwordDiv, "password", submitButton);
    const confirmPasswordDiv = document.getElementsByClassName("o-form-input-name-confirmPassword")[0];
    watchElementInput(confirmPasswordDiv, "confirmPassword", submitButton);
    const firsNameDiv = document.getElementsByClassName("o-form-input-name-firstName")[0];
    watchElementInput(firsNameDiv, "firstName", submitButton);
    const lastNameDiv = document.getElementsByClassName("o-form-input-name-lastName")[0];
    watchElementInput(lastNameDiv, "lastName", submitButton);
  }
}

function observeElement(targetNode, callback) {
  const config = { attributes: true, childList: false, subtree: true, attributeOldValue: true };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function watchPasswordInput(elementQuery) {
  const targetNode = document.querySelector(elementQuery);
  const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
      const parent = mutation.target.parentElement;
      if (mutation.type == "attributes" && mutation.target.style.backgroundImage.length > 0 && !parent.classList.contains("sonos-has-password-mgr")) {
        parent.classList.add("sonos-has-password-mgr");
      }
    }
  };
  observeElement(targetNode, callback);
}

//SPECIFIC CONTROLLER CONFIGURATIONS

function addAnimatedPlaceholder(inputId, noLabel) {
  let labelText = "";
  const input = document.getElementById(inputId);
  if (!noLabel) {
    const label = document.querySelector('label[for="' + inputId + '"]');
    labelText = label.innerHTML;
    input.placeholder = labelText;
    label.remove();
  } else {
    labelText = input.placeholder;
  }

  const newLabel = document.createElement("label");
  newLabel.setAttribute("for", inputId);
  newLabel.classList.add("sonos-form-label");
  newLabel.innerHTML = labelText;
  insertAfter(newLabel, input);
}

function waitThenAnimateLabel(inputId) {
  setTimeout(function () {
    addAnimatedPlaceholder(inputId);
  }, 500);
}

function animateSignInLabels() {
  addAnimatedPlaceholder("okta-signin-username");
  addAnimatedPlaceholder("okta-signin-password");
  // Second call to animate label because password could be autofilled
  // Calling twice avoid screen flicker with the label being above the input and then moving below.
  waitThenAnimateLabel("okta-signin-password");
}

function animatePasswordLabels() {
  addAnimatedPlaceholder("input4");
  addAnimatedPlaceholder("input6");
}

function addTestingIdWithQuery(query, id) {
  const element = document.querySelector(query);
  if (element) {
    element.setAttribute("data-test", id);
  }
}

function setInviteEmailIfRequired(query) {
  if (hasInviteEmail) {
    const usernameInput = document.querySelector(query);
    usernameInput.value = inviteEmail;
    usernameInput.dispatchEvent(new Event("input", { bubbles: true }));
    usernameInput.readOnly = true;
  }
}

//**********Login*********************
function updatePageTitle(title) {
  window.document.title = title + " | Sonos";
}

function set_primary_auth() {
  watchFormInput();
  animateSignInLabels();

  addTestingIdWithQuery("#okta-signin-username", "username");
  addTestingIdWithQuery("#okta-signin-password", "password");
  addTestingIdWithQuery(".js-forgot-password", "forgotPassword");
  addTestingIdWithQuery("#okta-signin-submit", "signInButton");

  if (window.variantVars.variant === "sbiz") {
    addSbizFormElements();
  }

  /******* Forgot Password work*******/
  //remove Need Help expander
  var needhelpEle = document.querySelector('a[data-se="needhelp"]');
  if (needhelpEle != null) {
    needhelpEle.remove();
  }

  //Show Forgot Password
  var linkContainerEle = document.querySelector('ul[id="help-links-container"]');
  if (linkContainerEle != null) {
    linkContainerEle.style.display = "block";
  }

  //Remove Help Link
  var helpLinkEle = document.querySelector('a[data-se="help-link"]');
  if (helpLinkEle != null) {
    helpLinkEle.remove();
  }

  //Move below password - have to move entire parent div otherwise event doesn't work. Once you move this, querySelector won't find it
  var footerEle = document.querySelector('div[class="auth-footer"]');
  var formContentEle = document.querySelector('span[data-se="o-form-input-password"]');
  if (footerEle != null && formContentEle != null) {
    formContentEle.parentElement.parentElement.appendChild(footerEle);
  }

  watchPasswordInput("#okta-signin-password");

  setInviteEmailIfRequired("#okta-signin-username");

  // eslint-disable-next-line no-undef
  const title = getContent("goback", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, true, true);
  updatePageTitle(title);
}

//**********Forgot Password***********
function set_forgot_password() {
  watchFormInput();
  addAnimatedPlaceholder("account-recovery-username");

  addTestingIdWithQuery(".subHeader", "subHeader");
  addTestingIdWithQuery("#account-recovery-username", "username");
  addTestingIdWithQuery(".email-button", "emailButton");
  addTestingIdWithQuery(".js-back", "signInButton");
}

function password_reset() {
  watchFormInput();
  animatePasswordLabels();

  //Remove Sign Out Link
  var signOutLinkEle = document.querySelector('a[data-se="signout-link"]');
  if (signOutLinkEle != null) {
    signOutLinkEle.remove();
  }
}

function set_password_reset_email_sent() {
  const explain = document.querySelector('p[data-se="o-form-explain"]');
  addCheckmark(explain);

  addTestingIdWithQuery(".sonos-checkmark", "sonosCheckmark");
  addTestingIdWithQuery(".link-button", "signInButton");
}

function set_account_unlock_email_sent() {
  const explain = document.querySelector('p[data-se="o-form-explain"]');
  addCheckmark(explain);
}

function set_recovery_loading() {
  // eslint-disable-next-line no-undef
  const title = getContent("recovery-loading.header", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
  // eslint-disable-next-line no-undef
  const emailNewLinkBtnText = getContent("recovery-loading.emailNewLink-text", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
  // eslint-disable-next-line no-undef
  const signInLinkText = getContent("recovery-loading.signIn-text", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
  const formContent = document.querySelector('div[data-se="o-form-content"]');
  const formHead = document.createElement("h2");
  formHead.className = "okta-form-title o-form-head";
  formHead.setAttribute("data-se", "o-form-head");
  formHead.appendChild(document.createTextNode(title));

  formContent.insertBefore(formHead, formContent.childNodes[0] || null);

  const emailNewLinkBtn = document.createElement("a");
  emailNewLinkBtn.className = "button button-primary button-wide link-button js-forgot-password";
  emailNewLinkBtn.setAttribute("href", "/signin/forgot-password");
  emailNewLinkBtn.appendChild(document.createTextNode(emailNewLinkBtnText));

  const fieldSetContainer = document.querySelector('div[data-se="o-form-fieldset-container"]');
  fieldSetContainer.appendChild(emailNewLinkBtn);

  const signInLink = document.createElement("a");
  signInLink.className = "link help js-back";
  signInLink.setAttribute("data-se", "back-link");
  signInLink.setAttribute("href", "/");
  signInLink.appendChild(document.createTextNode(signInLinkText));

  const authFooter = document.createElement("div");
  authFooter.className = "auth-footer";
  authFooter.style = "display:block";
  authFooter.appendChild(signInLink);

  fieldSetContainer.appendChild(authFooter);

  const recoveryLoadingDiv = document.querySelector(".recovery-loading");
  recoveryLoadingDiv.style = "display:block";
}

//**********Create Account************
function set_registration() {
  watchFormInput();
  //Fields and their Labels
  var regfields = regFields_def;

  //go through and hide any field not specified!
  if (regfields != undefined) {
    var formEles = document.querySelectorAll('div[data-se="o-form-fieldset-container"] input, div[data-se="o-form-fieldset-container"] select');
    for (var i = 0, formElement; (formElement = formEles[i++]); ) {
      //Hide Form Element
      if (regfields.indexOf(formElement.name) === -1) {
        //remove the form field parent
        formElement.closest('div[data-se="o-form-fieldset"]').remove();
      }
      //show Form element, so now see if there is any content
      else {
        // eslint-disable-next-line no-undef
        var thisPlaceholder = getContent("registration.inputlabels." + formElement.name + "-placeholder", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
        if (thisPlaceholder !== "") {
          formElement.placeholder = thisPlaceholder;
        }

        addAnimatedPlaceholder(formElement.id, true);
        if (formElement.name == "password") {
          // Second call to animate label because password could be autofilled
          // Calling twice avoid screen flicker with the label being above the input and then moving below.
          const passwordElementId = formElement.id;
          waitThenAnimateLabel(passwordElementId);
        }
      }
    }
  }
  //SubHeaders
  // eslint-disable-next-line no-undef
  var showSubheaders = getContent("registration.usesubheaders", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
  if (showSubheaders !== undefined && showSubheaders) {
    //ACCOUNT
    // eslint-disable-next-line no-undef
    var accountHeader = getContent("registration.subheaders.account", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
    var formContainerEle = document.querySelector('div[data-se="o-form-fieldset-container"]');
    if (accountHeader !== undefined && formContainerEle != null) {
      var accountHeaderDiv = document.createElement("div");
      accountHeaderDiv.className = "formSectionHeader";
      accountHeaderDiv.innerHTML = accountHeader;
      formContainerEle.prepend(accountHeaderDiv);
    }

    //PROFILE
    var passschemeele = document.querySelector('div[id="subschemas-password"]');
    // eslint-disable-next-line no-undef
    var profileHeader = getContent("registration.subheaders.profile", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
    if (profileHeader !== undefined && passschemeele != null) {
      var profileHeaderDiv = document.createElement("div");
      profileHeaderDiv.className = "formSectionHeader";
      profileHeaderDiv.innerHTML = profileHeader;
      passschemeele.parentElement.insertBefore(profileHeaderDiv, passschemeele.nextSibling);
    }
  }

  setInviteEmailIfRequired('input[name="email"]');

  // eslint-disable-next-line no-undef
  const title = getContent("registration.signup.text", window.variantVars.variant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, true, true);
  updatePageTitle(title);
}

function set_account_unlock() {
  watchFormInput();
  addAnimatedPlaceholder("account-recovery-username");
}

/***************END CONTROLLER CHANGE LOAD *******************/
