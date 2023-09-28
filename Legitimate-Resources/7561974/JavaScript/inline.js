
  if(document.body.clientWidth > 991 && window.location.href.indexOf('desconexion-empresas') < 0){
      function getCookieLlangNewPG(name){
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          if (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
          }
          if (cookie.split('=')[0] == name) {
            return cookie.split('=')[1] != 'es' ? cookie.split('=')[1] : null;
          }
        }
        return null;
      }
      if(window.location.href.indexOf(getCookieLlangNewPG('language') ? 's/' + getCookieLlangNewPG('language') + '/empresas':'s/empresas') < 0){
          function getUrlByEnvCTAAcces() {
            let urlP = '/nimbus/signin.html';
            switch (document.domain) {
              case 'www.bbva.es':
                urlP = '/nimbus/signin.html';
                break;
              case 'qa.grupobbva.com':
                urlP = '/nimbus/release/signin.html';
                break;
              case 'ei.bbva.es':
                urlP = '/nimbus/release/signin.html';
                break;            
              case 'au.bbva.es':
                urlP = '/nimbus/release/signin.html';
                break;          
              default:
                urlP = '/nimbus/signin.html';
                break;
            }
            return urlP
          }
          //const urlP = '/nimbus/signin.html';
          const urlE = '/nimbus-pub/login/empresas.html';
  
          document.querySelectorAll('[data-component=access] a')[0]?.addEventListener('click', function(event) {
              event.stopImmediatePropagation();
              window.location.href = (window.location.href.indexOf('personas') > -1) ? getUrlByEnvCTAAcces() : getUrlByEnvCTAAcces();
          }, true);
      }
  }
  