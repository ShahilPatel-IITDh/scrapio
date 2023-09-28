
// 3284
(function () {
    function runReplacement(replacedItem, removalNeeded, replacementValue) {
        const foundNav = document.querySelector(`.pb-navigation__menu-item[aria-label="${replacedItem}"]`);
        if (!foundNav) {
            return;
        }
        if (removalNeeded) {
            foundNav.parentElement.removeChild(foundNav);
            return;
        }
        const hasSplitter = replacementValue.indexOf('|') >= 0;
        const contentParts = replacementValue.split('|');
        const cleanReplacementValue = hasSplitter ? contentParts.join('') : replacementValue;
        
        foundNav.setAttribute('aria-label', cleanReplacementValue);
        const foundLink = foundNav.firstElementChild;
        foundLink.setAttribute('title', cleanReplacementValue);
        foundLink.href = `/${cleanReplacementValue}.html`;
        if (hasSplitter) {
            const firstPart = contentParts[0];
            const replacedTextElement = document.createElement('i');
            const innerStyledText = document.createElement('b');
            innerStyledText.innerText = firstPart;
            replacedTextElement.appendChild(innerStyledText); // add themen
            replacedTextElement.append(contentParts[1]); // add welten
            while (foundLink.firstChild) { // clean anchor content
                foundLink.removeChild(foundLink.firstChild);
            }
            foundLink.appendChild(replacedTextElement);
            
        } else {
            foundLink.innerText = cleanReplacementValue;
        }
    }

    let fullPathName = window.location.pathname;
    if (window.location.pathname.startsWith('/content/postbank/de')) {
        fullPathName = fullPathName.replace('/content/postbank/de', '');
    }
    const locationBasePath = fullPathName.split(/\/|\./).filter(e => e.length > 0)[0];
    let parsedPath = '';
    if (locationBasePath !== undefined) {
        parsedPath = locationBasePath.split('.')[0];
    }
    
    const parsedBasePath = `/${parsedPath}`;
    console.log(parsedBasePath);
    switch (parsedBasePath) {
        case '/geschaeftskunden':
            runReplacement('Perspektiven', false, 'themen|welten');
            break;
        case '/firmenkunden':
            runReplacement('Perspektiven', true);
            break;
        case '/unternehmen':
            runReplacement('themenwelten', true);
            break;
        case '/':
        case '/privatkunden':
        default:
            console.log('nope');
            break;
  }
})();
// END 3284
