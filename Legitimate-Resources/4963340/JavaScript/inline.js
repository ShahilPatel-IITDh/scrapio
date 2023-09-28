
   var handle = document.querySelector('.hidemeproxy__slideout-handle');
   var slideout = document.querySelector('.hidemeproxy__slideout');

   handle.addEventListener('click', function(e){
      let isHidden = slideout.classList.contains('is-hidden');
      if(!isHidden) {
         slideout.classList.add('is-hidden')
         document.cookie = 'slideout_hidden=true';
      } else {
         slideout.classList.remove('is-hidden');
         document.cookie = 'slideout_hidden=';
      }
      
      e.preventDefault();
   });
