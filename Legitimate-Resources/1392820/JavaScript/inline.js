// Hide non-JS content
    var nonJSContentNode = document.getElementById('non-js-content')
    if (nonJSContentNode) {
      nonJSContentNode.style.display = 'none'
    }

    // Show the root node
    var rootNode = document.getElementById('root')
    if (rootNode) {
      rootNode.style.display = 'block'
    }