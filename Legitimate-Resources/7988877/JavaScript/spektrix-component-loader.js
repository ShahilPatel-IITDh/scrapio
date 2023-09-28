(function () {

    // add polyfill for module loader - specific to ios9.1
    // https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
    var ios9ModuleSupportPolyfill = '(function () { var d = document; var c = d.createElement(\'script\'); if (!(\'noModule\' in c) && \'onbeforeload\' in c) { var s = false; d.addEventListener(\'beforeload\', function (e) { if (e.target === c) { s = true } else if (!e.target.hasAttribute(\'nomodule\') || !s) { return } e.preventDefault() }, true); c.type = \'module\'; c.src = \'.\'; d.head.appendChild(c); c.remove() } }());'

    var newScript = document.createElement('script')
    var inlineScript = document.createTextNode(ios9ModuleSupportPolyfill)

    newScript.appendChild(inlineScript)
    document.head.appendChild(newScript)

    // get all components to load

    var name = 'spektrix-component-loader.js'
    var script = document.querySelector('script[src*="' + name + '"]')
    var components = script.dataset.components
    var componentsArray = components.split(',')
    
    // code to check for module support
    var checkingElement = document.createElement('script')
    var moduleSupport
    if ('noModule' in checkingElement) {
        moduleSupport = true
    } else {
        moduleSupport = false
    }

    // Code to add components
    function appendESNextScript(component) {
        var scriptForESNext = document.createElement('script')
        var componentScript = component + '-es2015.js'
        var url = script.src.replace(name, componentScript)
        scriptForESNext.src = url
        scriptForESNext.type = 'module'
        document.head.appendChild(scriptForESNext)
    }

    function appendES5Script(component) {
        var scriptForES5 = document.createElement('script')
        var componentScript = component + '-es5.js'
        var url = script.src.replace(name, componentScript)
        scriptForES5.src = url
        scriptForES5.setAttribute('nomodule', '')
        document.head.appendChild(scriptForES5)
    }
    
    function addAllComponents() {
        if (moduleSupport) {
            componentsArray.forEach(function (component) {
                appendESNextScript(component)
            })
        } else {
            componentsArray.forEach(function (component) {
                appendES5Script(component)
            })
        }        
    }

    if (window.WebComponents.ready) {
        addAllComponents()
    } else {
        window.addEventListener('WebComponentsReady', function fireAddAllComponents() {
            addAllComponents()
            window.removeEventListener('WebComponentsReady', fireAddAllComponents)
        })
    }

})()