
	if (window.location.pathname.indexOf('/login') > -1) {
      document.body.style.opacity = 0;
      window.addEventListener('load', () => {
        setTimeout(() => {
          window.location.replace('/signin' + window.location.search);
        }, 25);
      });
    }
  
