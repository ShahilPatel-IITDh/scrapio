function verifyStable(urlStable){
  var element = document.querySelector('body')
  if(urlStable.indexOf('vtex') > -1){
      element.classList.add('stable')
  }
}
verifyStable(window.location.href);

// Armazenando o timestamp atual no localStorage
localStorage.setItem("startTime", Date.now());

// Verificando a diferenÃ§a de tempo a cada minuto
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  var divPromo = document.querySelector('.promoThunder');
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      divPromo.style.display = "none";
      timer = duration;
    }
  }, 1000);
}

setTimeout(function() {
  if(document.cookie.indexOf('thunderPromo') == -1) {
    var template = $(".promo-thunder-template");
    template.addClass("promoThunder");
    template.removeClass("promo-thunder-template");
    $(".vtexsc-wrap").prepend(template);
    var divPromo = document.querySelector('.promoThunder');
    var expires = (new Date(Date.now()+ 259200*1000)).toUTCString();
    document.cookie = "thunderPromo=visto; expires=" + expires + ";path=/;"
    display = document.querySelector('.timer');
    var time = display.getAttribute("tempo");
    startTimer(time, display);
    divPromo.style.display = 'flex'
  }
}, 60000); //60000ms = 1min