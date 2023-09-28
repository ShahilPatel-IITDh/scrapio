/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./initializer/index.js":
/*!******************************!*\
  !*** ./initializer/index.js ***!
  \******************************/
/***/ (function() {

eval("(function (window) {\n  const widgetUrl = \"https://sandbox.conductiv.co/widget\";\n\n  const checkIframeLoaded = () => {\n    var iframe = document.getElementById('conductiv-iframe');\n    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;\n    iframeDoc.body.style.backgroundColor = 'transparent';\n\n    if (iframeDoc.readyState === 'complete') {\n      console.log('Conductiv Initializer is running');\n      return;\n    }\n\n    window.setTimeout(checkIframeLoaded, 100);\n  };\n\n  const constructIframe = (jwt, templateId, testing) => {\n    const existingIframe = document.getElementById('conductiv-iframe');\n    let iframe = existingIframe || document.createElement('iframe');\n    iframe.setAttribute('id', 'conductiv-iframe');\n    iframe.setAttribute('onload', \"this.style.display = 'block';\");\n    iframe.setAttribute('src', `${widgetUrl}/${testing ? 'test' : templateId}?${jwt}`);\n    iframe.style.width = `100%`;\n    iframe.style.height = '100%';\n    iframe.style.display = `none`;\n    iframe.style.backgroundColor = 'transparent';\n    iframe.style.background = 'transparent';\n    iframe.style.border = 'none';\n    iframe.name = 'Conductiv IFrame';\n    document.body.style.overflow = 'hidden';\n    const conductivRoot = document.createElement('div');\n    conductivRoot.setAttribute('id', 'conductiv-root');\n    const conductivModalRoot = document.createElement('div');\n    conductivModalRoot.style.position = 'absolute';\n    conductivModalRoot.style.width = '100%';\n    conductivModalRoot.style.height = '100%';\n    conductivModalRoot.style.overflow = 'hidden';\n    const conductivModalFade = document.createElement('div');\n    conductivModalFade.style.position = 'fixed';\n    conductivModalFade.style.top = 0;\n    conductivModalFade.style.left = 0;\n    conductivModalFade.style['z-index'] = 1040;\n    conductivModalFade.style.width = '100%';\n    conductivModalFade.style.height = '100%';\n    conductivModalFade.style['background-color'] = '#000';\n    conductivModalFade.style.opacity = 0.5;\n    const conductivModalInner = document.createElement('div');\n    conductivModalInner.style.position = 'fixed';\n    conductivModalInner.style.inset = 0;\n    conductivModalInner.style['z-index'] = 123812312;\n    conductivModalInner.style['border-width'] = 0;\n    conductivModalInner.style.display = 'block';\n    conductivModalInner.appendChild(iframe);\n    conductivModalRoot.appendChild(conductivModalInner);\n    conductivRoot.appendChild(conductivModalRoot);\n    conductivRoot.appendChild(conductivModalFade);\n    document.body.appendChild(conductivRoot);\n    checkIframeLoaded();\n  };\n\n  const removeIframe = () => {\n    try {\n      document.body.style.overflow = 'unset';\n      let node = document.getElementById('conductiv-root');\n\n      if (node.parentNode) {\n        node.parentNode.removeChild(node);\n      }\n    } catch (_e) {}\n  };\n\n  const _init = ({\n    jwtToken = '',\n    templateId = 'api',\n    onEvent,\n    testing = false,\n    closeOnSuccess = false,\n    closeOnError = false\n  }) => {\n    if (jwtToken) {\n      constructIframe(jwtToken, templateId, testing);\n\n      const handleIframeMessage = event => {\n        const message = event.data && event.data.type;\n        if (!event.origin.includes('conductiv') || !message) return;\n\n        if (onEvent && (message === 'CLOSE' || message === 'SUCCESS' || message === 'ERROR')) {\n          onEvent(event.data);\n        }\n\n        if (message === 'CLOSE' || message === 'ERROR' && closeOnError || message === 'SUCCESS' && closeOnSuccess) {\n          removeIframe();\n        }\n      };\n\n      window.addEventListener('message', handleIframeMessage, false);\n    } else {\n      console.error('Missing access token');\n    }\n  };\n\n  window.Initializer = {\n    init: _init\n  };\n})(window);\n\n//# sourceURL=webpack://conductiv-ui/./initializer/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./initializer/index.js"]();
/******/ 	
/******/ })()
;