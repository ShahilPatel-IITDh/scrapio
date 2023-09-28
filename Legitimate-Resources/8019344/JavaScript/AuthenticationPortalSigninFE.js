(function(f) {
  var haveAUI = typeof P !== 'undefined' && P.AUI_BUILD_DATE;
  if (typeof SiegeCrypto !== 'undefined') {
    if (haveAUI) {
      P.now('siege-cse').register('siege-cse:profile:AuthenticationPortalSigninFE', function(lib) {
        return f(lib || SiegeCrypto);
      });
    } else {
      f(SiegeCrypto);
    }
  } else if (haveAUI) {
    P.when('siege-cse').register('siege-cse:profile:AuthenticationPortalSigninFE', f);
  } else {
    var err = new Error('CSE library not loaded, and no AUI');
    try {
      ueLogError(err, {attribution: 'siege-cse:profile:AuthenticationPortalSigninFE', logLevel: 'WARN'});
    } catch (e) {
      throw err;
    }
  }
})(function(SiegeCrypto) {

SiegeCrypto.addProfile("AuthenticationPortalSigninFE", {
  "password": {dataType: "AuthPortalSigninPasswordFE", requiresTail: false},
  "passwordCheck": {dataType: "AuthPortalSigninPasswordFE", requiresTail: false},
  "passwordNew": {dataType: "AuthPortalSigninPasswordFE", requiresTail: false},
  "passwordNewCheck": {dataType: "AuthPortalSigninPasswordFE", requiresTail: false},
});

var createDeferred = SiegeCrypto.createDeferred || (function() {
  return {
    resolve: function() {},
    reject: function(e) {
      console.error(e);
    }
  };
});

function addMissingDataType(id) {
  var deferred = createDeferred();
  if (SiegeCrypto.addLoadingDataType) {
    SiegeCrypto.addLoadingDataType(id, deferred.promise);
  }
  deferred.reject(new Error('Datatype ' + id + ' is not supported in CSE'));
}

SiegeCrypto.addDataType({
	"dataTypeId": "AuthPortalSigninPasswordFE",
	"jwkPublicKey": {"kty":"RSA","e":"AQAB","n":"wBLjVYIKcWbQj1FOE30RtoWa3IHJ90QLwjAY0-XLt1b6usFvERZTyLeb0Bh0s1Yg5N2T6YF-0aLvKPe7wUemXKW0A8zGHfeI5Zc4xfOPdktl7sERJL-QpQKcUDAYeA2Bih3cQsYiUDiIE7Bp0gKUgCkMMb11X3CqlrYbuC6evhEX4-HrJfirDAOY3hLachdTBAtAcNDPW9zIXlat7zB5dp2DUNpWhvj6sjV-uk0CFVzG504MltcvUoTh4shq5l07vWFQOGIB_w29c201DbNM5vs3XooxfbSIkfCPgXsPOw9jPOWLbZOzU6lHUrTMMRE8428finhCg9RY4resdS565w"},
	"providerId": "si:md5",
	"keyId": "4f39006a56f3bc9c65959107f747cc50"
});

return SiegeCrypto;

});
