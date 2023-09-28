// ForeSee Staging Embed Script v2.01
// DO NOT MODIFY BELOW THIS LINE *****************************************
;(function (g) {
  var d = document,
    am = d.createElement("script"),
    h = d.head || d.getElementsByTagName("head")[0],
    fsr = "fsReady",
    aex = {
      src: "//gateway.foresee.com/sites/evri/production/gateway.min.js",
      type: "text/javascript",
      async: "true",
      "data-vendor": "fs",
      "data-role": "gateway",
    }
  for (var attr in aex) {
    am.setAttribute(attr, aex[attr])
  }
  h.appendChild(am)
  g[fsr] ||
    (g[fsr] = function () {
      var aT = "__" + fsr + "_stk__"
      g[aT] = g[aT] || []
      g[aT].push(arguments)
    })
})(window)
// DO NOT MODIFY ABOVE THIS LINE *****************************************

// Un-comment out the function below when you are ready to input your variable
fsReady(function () {
  let params = new URL(document.location).searchParams
  let showSurvey = params.get("survey")
  const surveyHideLocalStorage = localStorage.getItem("foresee-survey-hidden")
  if (surveyHideLocalStorage) {
    FSR.setFSRVisibility(false)
  }
  if (showSurvey === "false") {
    // Hide is inverse boolean for some reason
    // https://developer.foresee.com/docs/suppressing-the-foresee-invitation

    // Nevermind their docs are completely wrong and its actually the opposite of what is says in there
    FSR.setFSRVisibility(false)
    localStorage.setItem("foresee-survey-hidden", true)
  }
  if (showSurvey === "true") {
    FSR.setFSRVisibility(true)
    localStorage.removeItem("foresee-survey-hidden")
  }
})
