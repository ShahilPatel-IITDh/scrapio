(function () {
    const params = {
        RiskPercentageCFD : '74',
    }

    const eToroProcessDisclaimers = function() {
        if (!params || !params.RiskPercentageCFD) {
            return;
        }

        function replaceText(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replaceAll("{etoroCFDrisk}", params.RiskPercentageCFD);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                for (const childNode of node.childNodes) {
                    replaceText(childNode);
                }
            }
        }

        replaceText(document.body);
    }

    if (document.readyState === "complete") {
        eToroProcessDisclaimers();
    } else {
        document.addEventListener("DOMContentLoaded", eToroProcessDisclaimers);
    }

})();