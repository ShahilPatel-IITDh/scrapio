
     const acceptedLocales = [
      'en-au',
      'en-ca',
      'en-gb',
      'en-in',
      'en-us',
      'de-de',
      'es-es',
      'fr-fr',
      'it-it',
      'ja-jp',
      'ko-kr',
      'pt-br',
      'zh-tw',
      'zh-cn',
      'zh-Hans-CN',
      'pl-PL'
    ];
    const orphanLocales = [
      'ru-ru',
      'sv-se',
      'nl-nl',
      'vi-vn',
      'th-th',
      'id-id',
      'tr-tr',
      'el-gr',
      'nb-no',
    ];
    const ignoreList = [
      'apps',
      'docs',
      'rate-limit-test',
      'rss',
    ]
    function getPathFromLocale(locale, code, pathString) {
      if ( locale === code || !acceptedLocales.includes(code) || acceptedLocales.includes(locale) || orphanLocales.includes(locale) ) {
        return null;
      } else {
        return [code, locale ? locale : '', pathString].filter(part => part !== '').join('/');
      }
    };
    if(window.location.host !== 'staging.cloudflare-cn.com' && window.location.host !== 'cloudflare-cn.com' && window.location.host !== 'www.cloudflare-cn.com') {
      if (localStorage.getItem('langPreference')) {
        if (localStorage.getItem('langPreference').toLowerCase() != 'en-us') {
            const langPreference = localStorage.getItem('langPreference').toLowerCase();
            const splitPath = window.location.pathname.split('/').filter(part => part !== '');
            const currentLang = splitPath[0];
            if (!acceptedLocales.includes(currentLang) && !orphanLocales.includes(currentLang) && !ignoreList.includes(splitPath[0])) {
              splitPath.splice(0, 0, langPreference.toLowerCase());
              const newUrl = 'https://' + window.location.hostname + '/' + splitPath.join('/') + '/' + window.location.search;
              window.location.replace(newUrl);
            }
          }
      } else if (!window.navigator.userAgent.toLowerCase().includes('googlebot')) {
          const requestedLang = window.navigator.language;
          const splitPath = window.location.pathname.split('/').filter(part => part !== '');
          const maybeLocale = splitPath.shift();
          const splitPathString = splitPath.join('/');

          if (requestedLang && requestedLang.toLowerCase() != "en-us") {
            const requestedLangCode = requestedLang
              .toLowerCase()
              .replace('_', '-');
            const redirectPath = getPathFromLocale(maybeLocale, requestedLangCode, splitPathString);
            if (redirectPath && !ignoreList.includes(maybeLocale)) {
              window.location.replace('https://' + window.location.hostname + '/' + redirectPath + '/' + window.location.search);
            }
          }
      }
    }
    