
        AppleID.auth.init({
          clientId : 'com.gopro.GoProid',
          redirectURI : 'https://gopro.com/login/auth/apple/callback',
          state : '',
          usePopup : false,
          responseMode: 'query',
          scope: 'name email'
        });
    