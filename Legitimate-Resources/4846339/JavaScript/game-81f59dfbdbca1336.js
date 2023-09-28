!function(n){var g={};function e(t){if(g[t])return g[t].exports;var I=g[t]={i:t,l:!1,exports:{}};return n[t].call(I.exports,I,I.exports,e),I.l=!0,I.exports}e.m=n,e.c=g,e.d=function(n,g,t){e.o(n,g)||Object.defineProperty(n,g,{enumerable:!0,get:t})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,g){if(1&g&&(n=e(n)),8&g)return n;if(4&g&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(e.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&g&&"string"!=typeof n)for(var I in n)e.d(t,I,function(g){return n[g]}.bind(null,I));return t},e.n=function(n){var g=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(g,"a",g),g},e.o=function(n,g){return Object.prototype.hasOwnProperty.call(n,g)},e.p="",e(e.s=2)}({2:
/*!*****************************!*\
  !*** ./src/main/js/game.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(module,exports){eval("/**\n * Created by darcinotti on 19/06/2017.\n * checking omni-api\n */\nwindow.dla = window.dla || {};\n\nfunction Game() {\n  dla.game = dla.game || this;\n}\n\nGame.start = function (settings) {\n  if (!(dla.game instanceof Game)) {\n    dla.game = Object.assign(new Game(), dla.game);\n  }\n\n  const game = dla.game;\n  game.setOptions(settings);\n  game.manageFullScreen();\n  game.setUpListeners();\n  game.setGameUrl();\n  game.setGameProvider();\n  game.setGameClientSize();\n  $(window).trigger('page:enter:game');\n  window.scrollTo(0, 0);\n};\n\nGame.prototype.setOptions = function () {\n  let settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n    gameLaunchParent: false,\n    gameClient: false,\n    gameClientHeader: false,\n    gameId: false,\n    gameMode: false,\n    fullScreen: false,\n    animateFullscreen: false,\n    isMobileFullscreen: false,\n    showTopNavigation: false,\n    pageIds: false,\n    registerLowBalanceEvent: false,\n    gameURL: false,\n    size: false,\n    autoResize: false,\n    staticViewport: false,\n    wideScreen: false\n  };\n  //TODO: use native map once phantomJS will be removed ( HDR-189)\n  this.settings = {\n    set: (key, value) => {\n      this.settings[key] = value;\n    },\n    get: key => {\n      return this.settings[key] || false;\n    }\n  };\n  Object.keys(settings).forEach(key => {\n    if (typeof settings[key] === 'string' && settings[key].match(/^[.\\.#]/g)) {\n      this.settings.set(key, $(settings[key]));\n    } else {\n      this.settings.set(key, settings[key]);\n    }\n  });\n};\n\nGame.prototype.manageFullScreen = function () {\n  this.initFullScreen();\n  this.setFullScreen(this.settings.get('fullScreen') !== false);\n};\n\nGame.prototype.initFullScreen = function () {\n  const fullScreenConfig = this.settings.get('fullScreen');\n\n  if (fullScreenConfig !== false && typeof fullScreenConfig === 'object') {\n    if (fullScreenConfig.target) {\n      fullScreenConfig.target = $(fullScreenConfig.target);\n    }\n\n    if (fullScreenConfig.wrapperElement) {\n      fullScreenConfig.wrapperElement = $(fullScreenConfig.wrapperElement);\n    }\n\n    if (fullScreenConfig.elementsToHide && fullScreenConfig.elementsToHide.length) {\n      fullScreenConfig.elementsToHide.map((selector, i) => {\n        fullScreenConfig.elementsToHide[i] = $(selector);\n      });\n    }\n\n    this.settings.set('fullScreen', fullScreenConfig);\n  }\n\n  if (window.jsf && window.jsf.ajax) {\n    window.jsf.ajax.addOnEvent(e => {\n      if (e.status === 'success' && $('body').hasClass('fullscreen')) {\n        this.setFullScreen(false);\n      }\n    });\n  }\n};\n\nGame.prototype.setFullScreen = function (bool) {\n  let fullScreenConfig = this.settings.get('fullScreen');\n  setTimeout(() => {\n    $(document.body).toggleClass('fullscreen', bool);\n\n    if (fullScreenConfig && fullScreenConfig.elementsToHide.length) {\n      let methodName = bool ? 'hide' : 'show';\n      fullScreenConfig.elementsToHide.forEach(ele => {\n        $(ele)[methodName]();\n      });\n    }\n\n    $(window).trigger('resize');\n  }, 100);\n};\n\nGame.prototype.setGameUrl = function () {\n  const gameUrl = this.settings.get('gameURL');\n  const $iframe = this.settings.get('gameClient');\n\n  if (gameUrl) {\n    $iframe.attr('src', gameUrl);\n  }\n};\n\nGame.prototype.setGameProvider = function () {\n  const gameProvider = this.settings.get('gameProvider');\n  const $iframe = this.settings.get('gameClient');\n\n  if (gameProvider) {\n    $iframe.attr('data-game-provider', gameProvider);\n  }\n};\n\nGame.prototype.setGameClientSize = function (sizesObj) {\n  const sizes = sizesObj || this.settings.get('size');\n  const staticDimensions = this.settings.get(\"staticDimensions\");\n  const wideScreen = this.settings.get(\"wideScreen\");\n  const gameLaunchParent = this.settings.get('gameLaunchParent')[0];\n  const gameClientHeader = this.settings.get('gameClientHeader')[0];\n  const iframe = this.settings.get('gameClient')[0]; // Reset this on window resize and allow for intrinsic resizing.\n\n  iframe.width = '';\n  iframe.height = ''; // Set maxWidth on parent container to adjust to 16:9 aspect ratio\n\n  if (wideScreen) {\n    this.setAspectRatioWidth(gameLaunchParent, gameClientHeader);\n  } // Apply static dimensions if set on CMS\n\n\n  if (staticDimensions) {\n    iframe.style.width = \"\".concat(sizes.width, \"px\");\n    iframe.style.height = \"\".concat(sizes.height, \"px\");\n    iframe.height = sizes.height;\n    iframe.width = sizes.width;\n  } else {\n    iframe.width = iframe.parentNode.offsetWidth;\n    iframe.height = iframe.parentNode.offsetHeight;\n  }\n};\n\nGame.prototype.setAspectRatioWidth = function (gameLaunchParent, gameClientHeader) {\n  gameLaunchParent.style.maxWidth = 'unset';\n  const aspectRatioWidth = (gameLaunchParent.offsetHeight - gameClientHeader.offsetHeight) * (16 / 9);\n  gameLaunchParent.style.maxWidth = \"\".concat(aspectRatioWidth, \"px\");\n};\n\nGame.prototype.onMessage = function (event) {\n  if (event.hasOwnProperty('originalEvent')) {\n    event = event.originalEvent;\n  }\n\n  try {\n    var messageData = JSON.parse(event.data);\n  } catch (e) {\n    // invalid JSON\n    return;\n  } //TEMP: HDR-549\n\n\n  if (dla.gamesErrorLogger) {\n    dla.gamesErrorLogger.throughPostMessages = true;\n  }\n\n  switch (messageData.name) {\n    case 'game.resize':\n      this.setGameClientSize(messageData);\n      break;\n\n    case 'game.gameEnd':\n      const winAmount = messageData.win || '0';\n      this.gameEnd(winAmount);\n      break;\n\n    case 'game.goTo':\n      this.goToPage(messageData.label);\n      break;\n\n    case 'game.track':\n      dla.helper.onAvailability(\"universalTracking\", function () {\n        dla.universalTracking.trackUniversal(messageData.label);\n      });\n      break;\n\n    case 'game.reload':\n      window.location.reload();\n      break;\n\n    case 'game.realMode':\n      let isMobile = $('#trackingInfo').data('mobileDevice');\n\n      if (!$('#trackingInfo').data('playerLoggedIn')) {\n        dla.authentication[isMobile ? 'showLogin' : 'open']();\n      } else {\n        let url = window.location.pathname + '?isDemo=false';\n\n        if (isMobile) {\n          window.location.href = window.location.origin + url;\n        } else {\n          dla.navigate.navigateTo(url);\n        }\n      }\n\n      break;\n\n    default:\n      break;\n  }\n};\n\nGame.prototype.setUpListeners = function () {\n  $(window).on('resize orientationchange', () => {\n    this.setGameClientSize();\n  });\n  $(window).off('message').on('message', ev => {\n    this.onMessage(ev);\n  });\n};\n\nGame.prototype.gameEnd = function (winAmount) {\n  const gameType = this.settings.get('gameType');\n  const gameMode = this.settings.get('gameMode');\n\n  if (winAmount === 0) {\n    dla.helper.onAvailability(\"universalTracking\", function () {\n      dla.universalTracking.trackUniversal('LOSE_' + gameType + gameMode);\n    });\n  } else {\n    dla.helper.onAvailability(\"universalTracking\", function () {\n      dla.universalTracking.trackUniversal('WIN_' + gameType + gameMode + '-' + winAmount);\n    });\n  }\n};\n\nGame.prototype.goToPage = function (pageId) {\n  const pageIds = this.settings.get('pageIds');\n  const url = pageIds[pageId];\n\n  if (url) {\n    dla.frontContent.hide();\n    dla.navigate.navigateTo(url);\n  }\n};\n\nGame.showFlashError = function (e) {\n  document.querySelector(e.overlay).classList.add(\"hidden\");\n  document.querySelector(e.errorContainer).classList.add(\"flashError-visible\");\n};\n\nwindow.Game = window.Game || Game;\n$(window).trigger('available', 'gameJs');//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluL2pzL2dhbWUuanM/MDk3YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgZGFyY2lub3R0aSBvbiAxOS8wNi8yMDE3LlxuICogY2hlY2tpbmcgb21uaS1hcGlcbiAqL1xud2luZG93LmRsYSA9IHdpbmRvdy5kbGEgfHwge307XG5cbmZ1bmN0aW9uIEdhbWUoKSB7XG4gICAgZGxhLmdhbWUgPSBkbGEuZ2FtZSB8fCB0aGlzO1xufVxuXG5HYW1lLnN0YXJ0ID0gZnVuY3Rpb24gKHNldHRpbmdzKSB7XG4gICAgaWYgKCEoZGxhLmdhbWUgaW5zdGFuY2VvZiBHYW1lKSkge1xuICAgICAgICBkbGEuZ2FtZSA9IE9iamVjdC5hc3NpZ24obmV3IEdhbWUoKSwgZGxhLmdhbWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGdhbWUgPSBkbGEuZ2FtZTtcblxuICAgIGdhbWUuc2V0T3B0aW9ucyhzZXR0aW5ncyk7XG5cbiAgICBnYW1lLm1hbmFnZUZ1bGxTY3JlZW4oKTtcblxuICAgIGdhbWUuc2V0VXBMaXN0ZW5lcnMoKTtcblxuICAgIGdhbWUuc2V0R2FtZVVybCgpO1xuXG4gICAgZ2FtZS5zZXRHYW1lUHJvdmlkZXIoKTtcblxuICAgIGdhbWUuc2V0R2FtZUNsaWVudFNpemUoKTtcblxuICAgICQod2luZG93KS50cmlnZ2VyKCdwYWdlOmVudGVyOmdhbWUnKTtcblxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbn07XG5cblxuR2FtZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChzZXR0aW5ncyA9IHtcbiAgICBnYW1lTGF1bmNoUGFyZW50OiBmYWxzZSxcbiAgICBnYW1lQ2xpZW50OiBmYWxzZSxcbiAgICBnYW1lQ2xpZW50SGVhZGVyOiBmYWxzZSxcbiAgICBnYW1lSWQ6IGZhbHNlLFxuICAgIGdhbWVNb2RlOiBmYWxzZSxcbiAgICBmdWxsU2NyZWVuOiBmYWxzZSxcbiAgICBhbmltYXRlRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgaXNNb2JpbGVGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICBzaG93VG9wTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgcGFnZUlkczogZmFsc2UsXG4gICAgcmVnaXN0ZXJMb3dCYWxhbmNlRXZlbnQ6IGZhbHNlLFxuICAgIGdhbWVVUkw6IGZhbHNlLFxuICAgIHNpemU6IGZhbHNlLFxuICAgIGF1dG9SZXNpemU6IGZhbHNlLFxuICAgIHN0YXRpY1ZpZXdwb3J0OiBmYWxzZSxcbiAgICB3aWRlU2NyZWVuOiBmYWxzZVxufSkge1xuICAgIC8vVE9ETzogdXNlIG5hdGl2ZSBtYXAgb25jZSBwaGFudG9tSlMgd2lsbCBiZSByZW1vdmVkICggSERSLTE4OSlcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgICBzZXQ6IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Nba2V5XSB8fCBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhzZXR0aW5ncykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzW2tleV0gPT09ICdzdHJpbmcnICYmIHNldHRpbmdzW2tleV0ubWF0Y2goL15bLlxcLiNdL2cpKSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnNldChrZXksICQoc2V0dGluZ3Nba2V5XSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5zZXQoa2V5LCBzZXR0aW5nc1trZXldKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuR2FtZS5wcm90b3R5cGUubWFuYWdlRnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmluaXRGdWxsU2NyZWVuKCk7XG4gICAgdGhpcy5zZXRGdWxsU2NyZWVuKHRoaXMuc2V0dGluZ3MuZ2V0KCdmdWxsU2NyZWVuJykgIT09IGZhbHNlKTtcbn07XG5cbkdhbWUucHJvdG90eXBlLmluaXRGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZ1bGxTY3JlZW5Db25maWcgPSB0aGlzLnNldHRpbmdzLmdldCgnZnVsbFNjcmVlbicpO1xuICAgIGlmIChmdWxsU2NyZWVuQ29uZmlnICE9PSBmYWxzZSAmJlxuICAgICAgICB0eXBlb2YgZnVsbFNjcmVlbkNvbmZpZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGZ1bGxTY3JlZW5Db25maWcudGFyZ2V0KSB7XG4gICAgICAgICAgICBmdWxsU2NyZWVuQ29uZmlnLnRhcmdldCA9ICQoZnVsbFNjcmVlbkNvbmZpZy50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmdWxsU2NyZWVuQ29uZmlnLndyYXBwZXJFbGVtZW50KSB7XG4gICAgICAgICAgICBmdWxsU2NyZWVuQ29uZmlnLndyYXBwZXJFbGVtZW50ID0gJChmdWxsU2NyZWVuQ29uZmlnLndyYXBwZXJFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnVsbFNjcmVlbkNvbmZpZy5lbGVtZW50c1RvSGlkZSAmJiBmdWxsU2NyZWVuQ29uZmlnLmVsZW1lbnRzVG9IaWRlLmxlbmd0aCkge1xuICAgICAgICAgICAgZnVsbFNjcmVlbkNvbmZpZy5lbGVtZW50c1RvSGlkZS5tYXAoKHNlbGVjdG9yLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgZnVsbFNjcmVlbkNvbmZpZy5lbGVtZW50c1RvSGlkZVtpXSA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZXQoJ2Z1bGxTY3JlZW4nLCBmdWxsU2NyZWVuQ29uZmlnKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmpzZiAmJiB3aW5kb3cuanNmLmFqYXgpIHtcbiAgICAgICAgd2luZG93LmpzZi5hamF4LmFkZE9uRXZlbnQoKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmICQoJ2JvZHknKS5oYXNDbGFzcygnZnVsbHNjcmVlbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGdWxsU2NyZWVuKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59O1xuXG5HYW1lLnByb3RvdHlwZS5zZXRGdWxsU2NyZWVuID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgICBsZXQgZnVsbFNjcmVlbkNvbmZpZyA9IHRoaXMuc2V0dGluZ3MuZ2V0KCdmdWxsU2NyZWVuJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkudG9nZ2xlQ2xhc3MoJ2Z1bGxzY3JlZW4nLCBib29sKTtcbiAgICAgICAgaWYgKGZ1bGxTY3JlZW5Db25maWcgJiYgZnVsbFNjcmVlbkNvbmZpZy5lbGVtZW50c1RvSGlkZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBtZXRob2ROYW1lID0gYm9vbCA/ICdoaWRlJyA6ICdzaG93JztcbiAgICAgICAgICAgIGZ1bGxTY3JlZW5Db25maWcuZWxlbWVudHNUb0hpZGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgJChlbGUpW21ldGhvZE5hbWVdKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgfSwgMTAwKTtcbn07XG5cbkdhbWUucHJvdG90eXBlLnNldEdhbWVVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZ2FtZVVybCA9IHRoaXMuc2V0dGluZ3MuZ2V0KCdnYW1lVVJMJyk7XG4gICAgY29uc3QgJGlmcmFtZSA9IHRoaXMuc2V0dGluZ3MuZ2V0KCdnYW1lQ2xpZW50Jyk7XG4gICAgaWYgKGdhbWVVcmwpIHtcbiAgICAgICAgJGlmcmFtZS5hdHRyKCdzcmMnLCBnYW1lVXJsKTtcbiAgICB9XG59O1xuXG5HYW1lLnByb3RvdHlwZS5zZXRHYW1lUHJvdmlkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZ2FtZVByb3ZpZGVyID0gdGhpcy5zZXR0aW5ncy5nZXQoJ2dhbWVQcm92aWRlcicpO1xuICAgIGNvbnN0ICRpZnJhbWUgPSB0aGlzLnNldHRpbmdzLmdldCgnZ2FtZUNsaWVudCcpO1xuICAgIGlmIChnYW1lUHJvdmlkZXIpIHtcbiAgICAgICAgJGlmcmFtZS5hdHRyKCdkYXRhLWdhbWUtcHJvdmlkZXInLCBnYW1lUHJvdmlkZXIpO1xuICAgIH1cbn07XG5cbkdhbWUucHJvdG90eXBlLnNldEdhbWVDbGllbnRTaXplID0gZnVuY3Rpb24gKHNpemVzT2JqKSB7XG4gICAgY29uc3Qgc2l6ZXMgPSBzaXplc09iaiB8fCB0aGlzLnNldHRpbmdzLmdldCgnc2l6ZScpO1xuICAgIGNvbnN0IHN0YXRpY0RpbWVuc2lvbnMgPSB0aGlzLnNldHRpbmdzLmdldChcInN0YXRpY0RpbWVuc2lvbnNcIik7XG4gICAgY29uc3Qgd2lkZVNjcmVlbiA9IHRoaXMuc2V0dGluZ3MuZ2V0KFwid2lkZVNjcmVlblwiKTtcbiAgICBjb25zdCBnYW1lTGF1bmNoUGFyZW50ID0gdGhpcy5zZXR0aW5ncy5nZXQoJ2dhbWVMYXVuY2hQYXJlbnQnKVswXTtcbiAgICBjb25zdCBnYW1lQ2xpZW50SGVhZGVyID0gdGhpcy5zZXR0aW5ncy5nZXQoJ2dhbWVDbGllbnRIZWFkZXInKVswXTtcbiAgICBjb25zdCBpZnJhbWUgPSB0aGlzLnNldHRpbmdzLmdldCgnZ2FtZUNsaWVudCcpWzBdO1xuXG4gICAgLy8gUmVzZXQgdGhpcyBvbiB3aW5kb3cgcmVzaXplIGFuZCBhbGxvdyBmb3IgaW50cmluc2ljIHJlc2l6aW5nLlxuICAgIGlmcmFtZS53aWR0aCA9ICcnO1xuICAgIGlmcmFtZS5oZWlnaHQgPSAnJztcblxuICAgIC8vIFNldCBtYXhXaWR0aCBvbiBwYXJlbnQgY29udGFpbmVyIHRvIGFkanVzdCB0byAxNjo5IGFzcGVjdCByYXRpb1xuICAgIGlmICh3aWRlU2NyZWVuKSB7XG4gICAgICAgIHRoaXMuc2V0QXNwZWN0UmF0aW9XaWR0aChnYW1lTGF1bmNoUGFyZW50LCBnYW1lQ2xpZW50SGVhZGVyKTtcbiAgICB9XG5cbiAgICAvLyBBcHBseSBzdGF0aWMgZGltZW5zaW9ucyBpZiBzZXQgb24gQ01TXG4gICAgaWYgKHN0YXRpY0RpbWVuc2lvbnMpIHtcbiAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gYCR7c2l6ZXMud2lkdGh9cHhgO1xuICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZXMuaGVpZ2h0fXB4YDtcbiAgICAgICAgaWZyYW1lLmhlaWdodCA9IHNpemVzLmhlaWdodDtcbiAgICAgICAgaWZyYW1lLndpZHRoID0gc2l6ZXMud2lkdGg7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZnJhbWUud2lkdGggPSBpZnJhbWUucGFyZW50Tm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgaWZyYW1lLmhlaWdodCA9IGlmcmFtZS5wYXJlbnROb2RlLm9mZnNldEhlaWdodDtcbiAgICB9XG59O1xuXG5HYW1lLnByb3RvdHlwZS5zZXRBc3BlY3RSYXRpb1dpZHRoID0gZnVuY3Rpb24gKGdhbWVMYXVuY2hQYXJlbnQsIGdhbWVDbGllbnRIZWFkZXIpIHtcbiAgICBnYW1lTGF1bmNoUGFyZW50LnN0eWxlLm1heFdpZHRoID0gJ3Vuc2V0JztcbiAgICBjb25zdCBhc3BlY3RSYXRpb1dpZHRoICA9IChnYW1lTGF1bmNoUGFyZW50Lm9mZnNldEhlaWdodCAtIGdhbWVDbGllbnRIZWFkZXIub2Zmc2V0SGVpZ2h0KSAqICgxNi85KTtcbiAgICBnYW1lTGF1bmNoUGFyZW50LnN0eWxlLm1heFdpZHRoID0gYCR7YXNwZWN0UmF0aW9XaWR0aH1weGA7XG59O1xuXG5HYW1lLnByb3RvdHlwZS5vbk1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuaGFzT3duUHJvcGVydHkoJ29yaWdpbmFsRXZlbnQnKSkge1xuICAgICAgICBldmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIG1lc3NhZ2VEYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGludmFsaWQgSlNPTlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vVEVNUDogSERSLTU0OVxuICAgIGlmIChkbGEuZ2FtZXNFcnJvckxvZ2dlcikge1xuICAgICAgICBkbGEuZ2FtZXNFcnJvckxvZ2dlci50aHJvdWdoUG9zdE1lc3NhZ2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2VEYXRhLm5hbWUpIHtcbiAgICAgICAgY2FzZSAnZ2FtZS5yZXNpemUnOlxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lQ2xpZW50U2l6ZShtZXNzYWdlRGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2FtZS5nYW1lRW5kJzpcbiAgICAgICAgICAgIGNvbnN0IHdpbkFtb3VudCA9IG1lc3NhZ2VEYXRhLndpbiB8fCAnMCc7XG4gICAgICAgICAgICB0aGlzLmdhbWVFbmQod2luQW1vdW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnYW1lLmdvVG8nOlxuICAgICAgICAgICAgdGhpcy5nb1RvUGFnZShtZXNzYWdlRGF0YS5sYWJlbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2FtZS50cmFjayc6XG4gICAgICAgICAgICBkbGEuaGVscGVyLm9uQXZhaWxhYmlsaXR5KFwidW5pdmVyc2FsVHJhY2tpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRsYS51bml2ZXJzYWxUcmFja2luZy50cmFja1VuaXZlcnNhbChtZXNzYWdlRGF0YS5sYWJlbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnYW1lLnJlbG9hZCc6XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2FtZS5yZWFsTW9kZSc6XG4gICAgICAgICAgICBsZXQgaXNNb2JpbGUgPSAkKCcjdHJhY2tpbmdJbmZvJykuZGF0YSgnbW9iaWxlRGV2aWNlJyk7XG5cbiAgICAgICAgICAgIGlmICghJCgnI3RyYWNraW5nSW5mbycpLmRhdGEoJ3BsYXllckxvZ2dlZEluJykpIHtcbiAgICAgICAgICAgICAgICBkbGEuYXV0aGVudGljYXRpb25baXNNb2JpbGUgPyAnc2hvd0xvZ2luJyA6ICdvcGVuJ10oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArICc/aXNEZW1vPWZhbHNlJztcbiAgICAgICAgICAgICAgICBpZiAoaXNNb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgdXJsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRsYS5uYXZpZ2F0ZS5uYXZpZ2F0ZVRvKHVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG5cbkdhbWUucHJvdG90eXBlLnNldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0R2FtZUNsaWVudFNpemUoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KVxuICAgICAgICAub2ZmKCdtZXNzYWdlJylcbiAgICAgICAgLm9uKCdtZXNzYWdlJywgZXYgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2UoZXYpO1xuICAgICAgICB9KTtcbn07XG5cbkdhbWUucHJvdG90eXBlLmdhbWVFbmQgPSBmdW5jdGlvbiAod2luQW1vdW50KSB7XG4gICAgY29uc3QgZ2FtZVR5cGUgPSB0aGlzLnNldHRpbmdzLmdldCgnZ2FtZVR5cGUnKTtcbiAgICBjb25zdCBnYW1lTW9kZSA9IHRoaXMuc2V0dGluZ3MuZ2V0KCdnYW1lTW9kZScpO1xuICAgIGlmICh3aW5BbW91bnQgPT09IDApIHtcbiAgICAgICAgZGxhLmhlbHBlci5vbkF2YWlsYWJpbGl0eShcInVuaXZlcnNhbFRyYWNraW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRsYS51bml2ZXJzYWxUcmFja2luZy50cmFja1VuaXZlcnNhbCgnTE9TRV8nICsgZ2FtZVR5cGUgKyBnYW1lTW9kZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRsYS5oZWxwZXIub25BdmFpbGFiaWxpdHkoXCJ1bml2ZXJzYWxUcmFja2luZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkbGEudW5pdmVyc2FsVHJhY2tpbmcudHJhY2tVbml2ZXJzYWwoJ1dJTl8nICsgZ2FtZVR5cGUgKyBnYW1lTW9kZSArICctJyArIHdpbkFtb3VudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbkdhbWUucHJvdG90eXBlLmdvVG9QYWdlID0gZnVuY3Rpb24gKHBhZ2VJZCkge1xuXG4gICAgY29uc3QgcGFnZUlkcyA9IHRoaXMuc2V0dGluZ3MuZ2V0KCdwYWdlSWRzJyk7XG4gICAgY29uc3QgdXJsID0gcGFnZUlkc1twYWdlSWRdO1xuXG4gICAgaWYgKHVybCkge1xuICAgICAgICBkbGEuZnJvbnRDb250ZW50LmhpZGUoKTtcbiAgICAgICAgZGxhLm5hdmlnYXRlLm5hdmlnYXRlVG8odXJsKTtcbiAgICB9XG59O1xuXG5HYW1lLnNob3dGbGFzaEVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUub3ZlcmxheSkuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUuZXJyb3JDb250YWluZXIpLmNsYXNzTGlzdC5hZGQoXCJmbGFzaEVycm9yLXZpc2libGVcIik7XG59O1xuXG53aW5kb3cuR2FtZSA9IHdpbmRvdy5HYW1lIHx8IEdhbWU7XG5cbiQod2luZG93KS50cmlnZ2VyKCdhdmFpbGFibGUnLCAnZ2FtZUpzJyk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFpQkE7QUFoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBbENBO0FBb0NBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n")}});