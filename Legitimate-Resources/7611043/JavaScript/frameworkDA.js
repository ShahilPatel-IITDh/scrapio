/**Import framework Interaction Studio**/
var frameworkIS = document.createElement("SCRIPT");

frameworkIS.setAttribute(
  "src",
  "https://bucketfileshiio-prd.cloud.itau.com.br/itau-sdk-interaction-studio/assets/sdk-interaction-studio-web-universal.min.js"
),
  frameworkIS.setAttribute("async", "async"),
  frameworkIS.setAttribute("type", "text/javascript"),
  frameworkIS.setAttribute("id", "frameworkIS");
  window.document.head.appendChild(frameworkIS)

/**FRAMEWORK CORE**/

var handler = function () {
  window._frameworkDA.Track();
};
var ready;
var _containerGTM =
  document.getElementById("frameworkDA") &&
  document.getElementById("frameworkDA").src &&
  document.getElementById("frameworkDA").src.split("?").length > 1
    ? document.getElementById("frameworkDA").src.split("?")[1].toUpperCase()
    : "";

window._satellite = window._satellite || {};

window._frameworkDA = {
  Track: function (trackParameter) {
    if (
      window.analyticsData &&
      window.dataLayer &&
      window._frameworkDA.Validate()
    ) {
      window.analyticsData.frameworkVersion = {
        importLib: "v4-GTM|DMP|H2O",
        tagLib: "v2-GA|DMP",
      };

      var metadata = JSON.parse(JSON.stringify(window.analyticsData));
      metadata.event =
        trackParameter != undefined ? trackParameter : "dataLayerUpdate";
      metadata.analyticsData = JSON.parse(JSON.stringify(window.analyticsData));

      window.dataLayer.push(metadata);
    }
  },
  Validate: function () {
    var retorno = true;

    for (var i = window.dataLayer.length - 1; i >= 0; i--) {
      if (window.dataLayer[i].analyticsData) {
        if (
          window._frameworkDA.CompareObject(
            window.dataLayer[i].analyticsData,
            window.analyticsData
          )
        ) {
          retorno = false;
        }
        i = 0;
      }
    }

    return retorno;
  },
  CompareObject: function (objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
  },
  ContainsListItem: function (listOfGTMs, itemSearch) {
    var returnValue = false;

    listOfGTMs.forEach(function (item) {
      if (item.indexOf(itemSearch) != -1) {
        returnValue = true;
      }
    });

    return returnValue;
  },

  //script para templates do GTM.
  TemplateUtils: function () {
    return {
      sendRequest: function (method, url, data, headers) {
        var xhr = new XMLHttpRequest();
        var json = JSON.stringify(data);
        xhr.open(method, url);
        if (method == "POST") {
          xhr.setRequestHeader("Content-type", "application/json");
        }
        var keys = Object.keys(headers);
        for (var i = 0; i < keys.length; i++) {
          xhr.setRequestHeader(keys[i], headers[keys[i]]);
        }
        xhr.send(json);
        xhr.onload = function () {
          if (xhr.status != 200) {
            console.log("Error " + xhr.status + ": " + xhr.statusText);
          }
          return;
        };
      },
      generateUUID: function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
          /[018]/g,
          function (c) {
            return (
              c ^
              (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16);
          }
        );
      },
      browserInfo: function () {
        return { userAgent: navigator.userAgent };
      },
    };
  },
};

window._satellite.track = function () {
  window._frameworkDA.Track();
};
window._satellite.pageBottom = function () {
  window._frameworkDA.Track();
};
window._Dil = window.DIL = {
  api: {
    signals: function (data, prefix) {
      if (window.analyticsData) {
        window.analyticsData.asyncCallForDMP =
          dataLayerBuilderToAudienceRequest(data, prefix);
      } else {
        window.analyticsData = {
          asyncCallForDMP: dataLayerBuilderToAudienceRequest(data, prefix),
        };
      }

      return this;
    },
    submit: function (direct) {
      window._frameworkDA.Track("dataLayerUpdateForDMP");
    },
  },
  create: function (init) {
    return window.DIL;
  },
};

if (typeof document.addEventListener === "function") {
  ready = function () {
    document.removeEventListener("DOMContentLoaded", ready);
    handler();
  };

  document.addEventListener("DOMContentLoaded", ready);
} else if (typeof document.attachEvent === "function") {
  ready = function () {
    if (document.readyState === "complete") {
      document.detachEvent("onreadystatechange", ready);
      handler();
    }
  };

  document.attachEvent("onreadystatechange", ready);
} else {
  window.onload = function () {
    handler();
  };
}


  
console.log("FrameworkDA - v.2.1.13");
