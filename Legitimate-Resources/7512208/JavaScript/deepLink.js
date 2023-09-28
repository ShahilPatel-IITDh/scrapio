// LIB para inserção do parâmetro do cookieIdMobile (IS) nos DeepLinks

// SuperApp -> https://vul2.adj.st/
// App Cartões -> https://t27f.adj.st/
// App Person -> https://7kwy.adj.st/
// Geral -> app.ajust.com

"use strict";

let cookieIdMobile;

function getCookieId() {
  var match = document.cookie.match(
    new RegExp("(^| )" + "cookieIdMobile" + "=([^;]+)")
  );
  if (match) {
    cookieIdMobile = match[2];
    return true;
  } else {
    return false;
  }
}

function updateDeepLinks() {
  let pathname = document.location.pathname.includes("pontos-e-cashback");

  if (getCookieId() && pathname) {
    let links = document.querySelectorAll("a");

    links.forEach((item) => {
      if (item.href.match("vul2.adj.st")) {
        item.href.match(/\?./)
          ? (item.href += "&cookieIdMobile=" + cookieIdMobile)
          : (item.href += "?cookieIdMobile=" + cookieIdMobile);
      }
    });
  }
}

function onLoad() {
  updateDeepLinks();
}

document.addEventListener("DOMContentLoaded", onLoad);
