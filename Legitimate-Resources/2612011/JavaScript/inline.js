(function () {
  if (!window.__SCRIPTS_LOADED__['main']) {
    document.getElementById('ScriptLoadFailure').style.display = 'block';
    var criticalScripts = ["polyfills","vendor","main"];
    for (var i = 0; i < criticalScripts.length; i++) {
      var criticalScript = criticalScripts[i];
      if (!window.__SCRIPTS_LOADED__[criticalScript]) {
        document.getElementsByName('failedScript')[0].value = criticalScript;
        break;
      }
    }
  }
})();