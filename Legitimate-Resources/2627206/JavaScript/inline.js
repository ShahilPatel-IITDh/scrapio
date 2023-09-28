
   var theme;

   try {
      function canUseFunctionalCookies() {
         return (document.cookie || '').indexOf('cookieConsent-FUNCTIONAL=true') !== -1;
      }

      theme = canUseFunctionalCookies() ? localStorage.getItem('userPref-appearance') : undefined;

      if (typeof theme === 'string') {
         theme = JSON.parse(theme);
      }

      if (theme === 'dark' || theme === 'light') {
         document.body.classList.add('cc-theme--' + theme);
         document.body.classList.add('mediaPlayer-theme--' + theme);
      }
   } catch(e) {}
