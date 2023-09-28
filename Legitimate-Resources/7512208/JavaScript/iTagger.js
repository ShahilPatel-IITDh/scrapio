"use strict";

// Collect page load...
// GA 360 : rule      : pageLoad
// GA4    : event_name : screenView

window.onload = () => {
  setDefaultParameters();
  screenViewTrack();
};

function setDefaultParameters() {
  let pathname = document.location.pathname;
  var defaultParametersGA4 = {};
  let business = "";

  if (pathname.includes("empresas") || pathname.includes("bba")) {
    business = "pj";
  } else {
    business = "pf";
  }

  defaultParametersGA4 = {
    analytics: {
      parameters: {
        business: business,
        business_channel: "institucional",
        environment: "nao-logado",
      },
    },
  };

  ItauDigitalAnalytics.setDefaultParameters(defaultParametersGA4);
}

function screenViewTrack() {
  ItauDigitalAnalytics.track({
    analytics: {
      rule: "pageLoad",
      page: {
        nome: pageName,
        url: document.location.href,
      },
      site: {
        ambiente: "NL",
        negocio: "IN",
        nome: "IT",
        tipoDeCanal: "Web",
        versaoAmbiente: "CMSLess",
      },
      event_name: "screen_view",
      parameters: {
        custom_path: pageNameGA4,
        implementation_team: "est:martech",
      },
    },
  });
}

// Collect event click...
// GA 360 : rule      : customLink
// GA4    : event_name : click

document.addEventListener("DOMContentLoaded", function (DOM) {
  const values = document.getElementById("ignoreAnalytics");
  let listIgnore = [];
  if (values != null && values.textContent) {
    const dataJson = JSON.parse(values.textContent);
    listIgnore = dataJson.analyticsList
      ? dataJson.analyticsList.split(",")
      : [];

    listIgnore = listIgnore.map((element) => {
      return element.trim();
    });
  }

  let dataTagList = Array.from(document.querySelectorAll("[data-tag-link]"));
  let arr = [];
  arr.push(...dataTagList);

  arr.forEach((el) => {
    let closestSection = el.closest('[id*="section-"]');
    if (
      closestSection != null &&
      listIgnore.indexOf("#" + closestSection.id) >= 0
    ) {
      return false;
    }

    let closestComponent = el.closest("[data-component]");
    if (closestComponent == null) {
      return false;
    }
    let component = closestComponent.dataset.component;

    el.addEventListener("click", function () {
      let params = JSON.parse(el.dataset.tag);
      let title;
      if (params.title === "Undefined") {
        title = false;
      } else if (params.title === "[data-tag-content-text]") {
        title = this.closest(params.title).querySelectorAll("h3").length
          ? this.closest(params.title).querySelector("h3").textContent
          : false;
      } else if (params.title === "[data-tag-fragment-title]") {
        title = this.closest(
          "[data-component='" + component + "']"
        ).querySelector(params.title).textContent;
      } else {
        title = params.title;
      }

      let text;
      if (params.text === "Undefined") {
        text = false;
      } else if (params.text === "[data-tag-content-text]") {
        text = this.closest(params.title).querySelectorAll("h3").length
          ? this.closest(params.title).querySelector("h3").textContent
          : false;
      } else {
        text = params.text;
      }

      let itemClicado =
        params.type +
        ":" +
        component +
        (title ? ":" + title : "") +
        (text ? ":" + text : "");

      let itemClicadoSkewer =
        SkewerCase(params.type, true) +
        ":" +
        SkewerCase(component, true) +
        (title ? ":" + SkewerCase(title, true) : "") +
        (text ? ":" + SkewerCase(text, true) : "");

      let itemClicadoPascal = PascalCase(itemClicado);

      ItauDigitalAnalytics.track({
        analytics: {
          rule: "customLink",
          page: {
            nome: pageName,
            url: document.location.href,
          },
          events: {
            category: "Clique",
            action: "objeto clicado",
            label: itemClicadoPascal,
          },
          event_name: "click",
          parameters: {
            detail: itemClicadoSkewer,
            custom_path: pageNameGA4,
            implementation_team: "est:martech",
          },
        },
      });
    });
  });
});

function stripString(str, cleanString) {
  var wm = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ",
    nmw = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr",
    newStr = "",
    found = false;

  for (var i = 0; i < str.length; i++) {
    found = false;

    for (var a = 0; a < wm.length; a++) {
      if (str.substr(i, 1) == wm.substr(a, 1)) {
        newStr += nmw.substr(a, 1);
        found = true;
        break;
      }
    }

    if (found == false) {
      newStr += str.substr(i, 1);
    }
  }

  if (cleanString) {
    return newStr.trim().replace(/[^\w\s]/gi, "");
  } else {
    return newStr.trim().replace(/[^\w\s:\-\/]/gi, "");
  }
}

function PascalCase(str) {
  return str
    .split(":")
    .map(function (c) {
      c = stripString(c, true);
      return (
        c.charAt(0).toUpperCase() +
        c
          .replace(/\s(.)/g, function (a) {
            return a.toUpperCase();
          })
          .replace(/\s/g, "")
          .replace(/^(.)/, function (b) {
            return b.toLowerCase();
          })
          .slice(1)
      );
    })
    .join(":");
}

function SkewerCase(str, cleanString) {
  return stripString(
    str.substring(0, 100).toLowerCase(),
    cleanString
  ).replaceAll(/\s+/gi, "-");
}
