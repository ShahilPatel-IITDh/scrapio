function GolfId(clientId, redirectUri, api) {
  this.api = api;
  this.callback = null;
  this.clientId = clientId;
  this.redirectUri = redirectUri;
  this.window = null;
  this.iframe = null;

  // Handle for event listening
  this._postMessageListener = null;

  if (!this.api) {
    this.api = 'https://my.golfid.io';
  } else if (this.api[this.api.length - 1] === '/') {
    this.api = this.api.substring(0, this.api.length - 1);
  }
}

GolfId.prototype.attachIframe = function(uri, selector) {
  this.iframe = document.createElement('iframe');
  this.iframe.style.display = 'none';
  this.iframe.src = uri;

  if (selector) {
    document.getElementById(selector).appendChild(this.iframe);
  } else {
    document.body.appendChild(this.iframe);
  }
}

GolfId.prototype.autoLogin = function(state, selector, callback) {
  if (!this.clientId) {
    throw Error('clientId must be speicifed');
  }

  if (!this.redirectUri) {
    throw Error('redirectUri must be speicifed');
  }

  this.callback = callback;

  // Let's not listen to events multiple times (possibly)
  if (this._postMessageListener === null) {
    this._postMessageListener = this.postMessageListener.bind(this);
    window.addEventListener('message', this._postMessageListener, false);
  }

  this.attachIframe(this.getUri(state, null, 'hidden') + '&op=login', selector);
}

GolfId.prototype.getUri = function(state, type, page) {
  var uri = this.api + '/';
  if (page) uri += page;

  uri += '?response_type=code';
  uri += '&scope=read';
  uri += '&client_id=' + this.clientId;
  uri += '&redirect_uri=' + this.redirectUri;
  uri += '&state=' + encodeURIComponent(state);

  if (type) uri += '&' + type + '=true';

  return uri;
}

GolfId.prototype.login = function(state, callback) {
  // Let's not listen to events multiple times (possibly)
  if (this._postMessageListener === null) {
    this._postMessageListener = this.postMessageListener.bind(this);
    window.addEventListener('message', this._postMessageListener, false);
  }

  this.callback = callback;
  var newWindowWidth = 600;
  var newWindowHeight = 750;

  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  // var systemZoom = width / window.screen.availWidth;
  var left = (width - newWindowWidth) / 2 + dualScreenLeft;
  var top = (height - newWindowHeight) / 2 + dualScreenTop;

  let options = 'location=0,status=0,width=' + newWindowWidth + ',height=' + newWindowHeight + ',top=' + top + ',left=' + left;
  this.window = window.open(this.getUri(state, 'postMessage', 'remote'), 'golfidSignIn', options);
}

GolfId.prototype.logout = function(callback) {
  var uri = this.api + '/hidden';
  uri += '?op=logout';
  uri += '&client_id=' + this.clientId;

  if (this._postMessageListener === null) {
    this._postMessageListener = this.postMessageListener.bind(this);
    window.addEventListener('message', this._postMessageListener, false);
  }

  this.callback = callback;

  this.attachIframe(uri);
}

GolfId.prototype.postMessageListener = function(e) {
  if (e.origin !== this.api) return;
  window.removeEventListener('message', this._postMessageListener);

  if (!this.callback) {
    console.warn('No callback has been set');
    return;
  }

  if (this.iframe && this.iframe.parentNode) {
    this.iframe.parentNode.removeChild(this.iframe);
  }

  if (this.window) {
    this.window.close();
  }

  this._postMessageListener = null;
  this.iframe = null;
  this.window = null;
  this.callback(e.data);
}

GolfId.prototype = new GolfId;
