
var redirectForm = document.hiddenform;
redirectForm.setAttribute("action", redirectForm.getAttribute("action") + window.location.hash);
SessionContextStoreHelper.storeContextBeforeAction("https://mcasproxy.azureedge.net/proxyweb/1.42.24/html/session-context-restore.html#action=store&contextData=https%3A%2F%2Flandbank.com%2F", DoSubmit, true);
