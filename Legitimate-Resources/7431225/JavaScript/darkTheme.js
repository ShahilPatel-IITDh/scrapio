var settings = JSON.parse(localStorage.getItem("simpleNote"));
var theme = settings && settings.settings && settings.settings.theme;
var systemDarkTheme =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
if ((theme && theme === "dark") || (!theme && systemDarkTheme)) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
