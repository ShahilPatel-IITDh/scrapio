
    let loadedAsyncScriptCount = 0;
    function asyncScriptLoaded(position) {
        loadedAsyncScriptCount++;
        if (position === 'body') {
            if (document.querySelectorAll('.async-script-tag').length === loadedAsyncScriptCount) {
                if (/complete|interactive|loaded/.test(document.readyState)) {
                    document.dispatchEvent(new CustomEvent('asyncScriptsLoaded', {}));
                } else {
                    document.addEventListener('DOMContentLoaded', () => {
                        document.dispatchEvent(new CustomEvent('asyncScriptsLoaded', {}));
                    });
                }
            }
        }
    }
