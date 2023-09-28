export function closeTerm() {
 const element = document.querySelector(".marco-civil-container");
 if (element) {
  element.setAttribute("aria-hidden", "true");
  element.setAttribute("aria-live", "off");
  element.setAttribute("aria-expanded", "false");
  element.parentNode.removeChild(element);
 }
}

export function checkTerm() {
 const signature = localStorage.getItem("dataAssinaturaTermo");
 const element = document.querySelector(
  ".marco-civil-banner .marco-civil-container"
 );
 const dateFormat = new Date().toLocaleDateString("pt-BR");
 if (signature == null && element != null) {
  showBanner(element, dateFormat);
 } else if (element != null && signature != null) {
  const termUpdate =
   element.dataset && element.dataset.term
    ? new Date(element.dataset.term)
    : new Date();
  const [day, month, year] = signature.split("/");
  const signatureDate = new Date(+year, +month - 1, +day);
  const days = 90;
  const expiration = new Date();
  expiration.setDate(signatureDate.getDate() + days);

  if (new Date().getTime() >= expiration.getTime()) {
   showBanner(element, dateFormat);
  } else if (termUpdate.getTime() > signatureDate.getTime()) {
   showBanner(element, dateFormat);
  } else {
   element.style.display = "none";
  }
 }
}

export function showBanner(element, dateFormat) {
 if (element) {
  element.style.display = "flex";
  element.setAttribute("aria-hidden", "false");
  element.setAttribute("aria-expanded", "true");
 }
 const btnOk = document.getElementById("marco-civil-btn-ok");
 const btnLink = document.getElementById("marco-civil-link");
 btnOk.onclick = btnLink.onclick = function () {
  saveToStorage(dateFormat);
 };
}

export function saveToStorage(dateFormat) {
 localStorage.setItem("dataAssinaturaTermo", dateFormat);
 closeTerm();
}

export function getFocusable(context) {
 return Array.from(
  context.querySelectorAll(
   'button, [href], area[href], input:not([type="hidden"]), textarea, select, iframe, [tabindex]:not([tabindex="-1"])'
  )
 ).filter(function (el) {
  return !el.closest("[hidden]");
 });
}

export function onLoad() {
 checkTerm();
}

window.addEventListener("load", onLoad);
