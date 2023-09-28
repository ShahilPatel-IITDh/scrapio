var AnalyticsEngine = /*#__PURE__*/function () {
  function AnalyticsEngine() {}
  AnalyticsEngine.ingestEvent = function ingestEvent(detail) {
    var digitalData = window.digitalData;
    if (digitalData) {
      var _digitalData$event;
      var options = {
        eventType: detail == null ? void 0 : detail.action,
        data: detail == null ? void 0 : detail.data
      };
      (_digitalData$event = digitalData.event) == null ? void 0 : _digitalData$event.push(options);
    }
  };
  AnalyticsEngine.ingestComponent = function ingestComponent(detail) {
    var digitalData = window.digitalData;
    var componentType = detail == null ? void 0 : detail.component;
    if (digitalData && digitalData.components) {
      if (!digitalData.components[componentType]) {
        digitalData.components[componentType] = [];
      }
      var digitalDataComponents = digitalData.components[componentType];
      digitalDataComponents.push(detail == null ? void 0 : detail.data);
    }
  };
  return AnalyticsEngine;
}();

var EventTypes;
(function (EventTypes) {
  EventTypes["INTERACTION"] = "interaction";
  EventTypes["LIFECYCLE"] = "lifecycle";
})(EventTypes || (EventTypes = {}));

var listen = function listen() {
  window.addEventListener(EventTypes.INTERACTION, function (e) {
    var evt = e;
    if (isInteractionEvent(evt)) {
      AnalyticsEngine.ingestEvent(evt.detail);
    }
  });
  window.addEventListener(EventTypes.LIFECYCLE, function (e) {
    var evt = e;
    if (isLifecycleEvent(evt)) {
      AnalyticsEngine.ingestComponent(evt.detail);
    }
  });
};
function isInteractionEvent(event) {
  return event.type === 'interaction';
}
function isLifecycleEvent(event) {
  return event.type === 'lifecycle';
}

listen();
//# sourceMappingURL=nab-module-digitaldata-ingestion.esm.js.map
