
  if(document.querySelectorAll('[data-chat-toggle]').length) {
    document.querySelectorAll('[data-chat-toggle]').forEach(
      button =>  button.addEventListener('click',()=>{
          if(window.$crisp) {
            window.$crisp.push(["do", "chat:open"])
            return 
          }
          if(document.querySelector('[chat-toggle-open]')){
            window.open(document.querySelector('[chat-toggle-open]').getAttribute('href'), '_blank');
          }
      })
    );
  }
