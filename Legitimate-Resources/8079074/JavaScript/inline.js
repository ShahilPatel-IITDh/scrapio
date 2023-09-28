
var redirectForm = document.hiddenform;
redirectForm.setAttribute("action", redirectForm.getAttribute("action") + window.location.hash);
SessionContextStoreHelper.storeContextBeforeAction("https://mcasproxy.azureedge.net/proxyweb/1.41.22/html/session-context-restore.html#action=store&contextData=https%3A%2F%2Fviaccess-orca.com%2F", DoSubmit, true);
