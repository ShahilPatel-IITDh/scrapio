// closest() polyfill
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (selector) {
        var element = this;

        if (!document.documentElement.contains(element)) {
            return null;
        }

        do {
            if (element.matches(selector)) {
                return element;
            }

            element = element.parentElement || element.parentNode;
        } while (element !== null && element.nodeType === 1);

        return null;
    };
}


// methode privee pour le traitement des zones et l appel a l API publique
var processZones = function (zones) {
    window.dcaApi.process({zones: getDcaApiZonesData(unique(zones))});
};

// methode pour supprimer les eventuels doublons (sur le zoneId) dans le taleau des zones
var unique = function (array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (result.indexOf(array[i]) == -1) {
            result.push(array[i]);
        } else {
            console.warn("Zone ignoree car deja presente", e);
        }
    }
    return result;
};
// methode pour recuperer le contenu par defaut (element jquery)
var getDefaultContent = function (zone) {
    // On recherche le contenu par defaut par classe dans tout l emplacement
    var parentNode = zone.closest('.dca_emplacement');
    if (parentNode) {
        var searchedZone = parentNode.getElementsByClassName('contenu_defaut');
        if (searchedZone.length > 0) {
            var defaultContent = searchedZone[0];
            parentNode.removeChild(searchedZone[0]);
            return defaultContent;
        }
    }
    return null;
};

// methode pour constituer les infos necessaires pour l appel à l API publique DCAWEB
var getDcaApiZonesData = function (domZones) {
    var apiZones = [];
    for (var i = 0; domZones && i < domZones.length; i++) {
        var domZone = domZones[i]
        var apiZone = {divId: domZone['divId'], zoneId: domZone['zoneId'], zoneName: domZone['zoneName']};
        var zone = document.getElementById(domZone['divId']);
        var defaultContent = getDefaultContent(zone);
        if (defaultContent) {
            // Deplacement du contenu par défaut dans la zone
            if (zone) {
                zone.appendChild(defaultContent);
                if (window.vgnextproperties) {
                    defaultContent.style.display = "";
                }
            }
            apiZone['defaultContent'] = {};
            apiZone['defaultContent']['divId'] = defaultContent.getAttribute("id");
        }
        apiZones.push(apiZone);
    }
    return apiZones;
};

var docReady = function (fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {
    if (window.dcaZones) {

        if (window.vgnextproperties) {
            getDcaApiZonesData(unique(window.dcaZones));
        }
        else {
            if (window.dcaApi && window.dcaApi.init) {
                window.dcaApi.init(window.reviveConfig, function () {
                    processZones(window.dcaZones);
                });
            }
        }
    }
});	