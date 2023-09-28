
		var isBotOpened = false
var watchInactivityTime = function () {
  var timerId = setTimeout(popChatbot, 10000); 
  window.addEventListener('scroll', resetTimer)
  // DOM Events
  //document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function popChatbot() {
    if (!isBotOpened)
    isBotOpened = true
    openChatonAdmin()
  }

  function resetTimer() {
    if (!isBotOpened) {
      console.log('resetting timer')
      clearTimeout(timerId);
      timerId = setTimeout(popChatbot, 10000)
    }
  }
};
//window.addEventListener('load', watchInactivityTime);
	