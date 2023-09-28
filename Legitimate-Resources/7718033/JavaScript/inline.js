
  !(function (w, d) {
    let isClientSide = typeof window !== 'undefined'
  
    function getCookie(name = '') {
      const cookieValue =
        isClientSide && document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
      return cookieValue ? cookieValue[2] : null
    }
  
    function setCookie(
      name = '',
      value = '',
      days = 1,
      domain = '',
      sameSite = 'lax'
    ) {
      if (isClientSide) {
        let expires = ''
        if (days) {
          const expireDate = new Date()
          expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000)
          expires = ';expires=' + expireDate.toUTCString()
        }
  
        const domainValue = domain ? ';domain=' + domain : ''
  
        document.cookie =
          '' +
          name +
          '=' +
          (typeof value === 'string' ? value : JSON.stringify(value)) +
          ';path=/;secure;sameSite=' +
          sameSite +
          domainValue +
          expires;
      }
    }
  
    function deleteCookie(name = '', domain = '') {
      setCookie(name, '', -1, domain);
    }
  
    function getCookies() {
      let cookies = d.cookie.split(';');
      const cookiesArray = [];
      for (var i = 1; i <= cookies.length; i++) {
        const index = cookies[i - 1].indexOf('=')
        if (index !== -1) {
          const cookie = cookies[i - 1].substring(0, index).trim();
          cookiesArray.push(cookie);
        }
      }
      return cookiesArray
    }
    if (false) {
      w.tp = w.tp || [];
      w.tp?.push(["init", () => {
        if(w.tp?.pianoId?.isUserValid()){
          w.tp?.pianoId?.logout();
        }
      }]);
      w.localStorage.removeItem('ArcId.USER_INFO');
      w.localStorage.removeItem('ArcId.USER_PROFILE');
      Object.keys(w.localStorage || {})?.forEach((key) => {
        if (
          key.startsWith('_ps_') ||
          key.startsWith('_pc_') ||
          key.startsWith('piano-id-initial-gm-sso-shown')
        ) {
          delete w.localStorage[key]
        }
      })
      getCookies().forEach((key) => {
        if (
          key.startsWith('_pc') ||
          key.startsWith('__ut') ||
          key.startsWith('__p') ||
          key.startsWith('piano-id-initial-gm-sso-shown') ||
          key.endsWith('__ut')
        ) {
          deleteCookie(key);
          deleteCookie(key, "."+w.location.host);
        }
      })
      const cookiesPiano = [
        '_pc_carritoAbandonado',
        '_pc_carritoAbandonado_five_days',
        '_pc_user_status',
        '_pc_single-offer',
        '_pc_dual-offer',
        '_pc_arc-pass',
        '_pc_basic-profile',
        '_pcid',
        '_pctx',
        '__utp',
        '__ut',
        '_pc_uuid',
      ]
      cookiesPiano.forEach((key) => {
        if (getCookie(key)) {
          deleteCookie(key);
          deleteCookie(key, "."+w.location.host);
        }
      })
    }
  })(window, document)