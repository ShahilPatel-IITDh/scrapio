
EngageBox.onReady (function(){
const owlPopup = EngageBox.getInstance(106);
owlPopup.on('afterOpen', function() {
      window.dispatchEvent(new Event('resize'));
});
});
