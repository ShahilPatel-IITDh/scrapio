var AiTelemetry = AiTelemetry || {};
AiTelemetry.TelemetryInitializers = AiTelemetry.TelemetryInitializers || {
	/*
	 * This telemetry filter blocks warnings about 3rd party scripts that we can't get details about due to same-origin policy.
	 * https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-filtering-sampling#javascript-telemetry-initializers
	 * https://github.com/microsoft/ApplicationInsights-JS/issues/1383
	 */
	UnreportableThirdPartyExceptionFilter: function (envelope) {
		try {
			if (envelope && envelope.baseType && envelope.baseType === 'ExceptionData') {

				if (typeof (envelope.baseData.exceptions) === 'undefined' &&
					envelope.baseData.message &&
					envelope.baseData.message.indexOf('same-origin policy prevents us from getting the details of this exception') >= 0) {
					return false;
				}
			}
		} catch (err) {
			console.log(err);
		}
	},
	/*
	 * This filter will block successful remote dependency requests that are not very slow from being logged.
	 */
	SuccessfulDependencyFilter: function (envelope) {
		if (envelope.baseType === 'RemoteDependencyData') {
			if (envelope.baseData.success && envelope.baseData.duration < 3000) {
				return false;
			}
		}
	},
	/*
	 * This filter introduces custom sampling. You'll need to call this factory function to generate your filter
	 */
	CustomSamplingFilterFactory: function (aiSamplePercentage) {
		return function (envelope) {
			if (envelope.baseType === 'EventData' || envelope.baseType === 'MetricData') {
				return true; // No fixed rate filter on Event or Metric Data
			}
			if (!window.customSampleValue) {
				window.customSampleValue = Math.random() * 100;

			}
			var includedSample = (window.customSampleValue < aiSamplePercentage);
			envelope.data.CustomSamplingRate = aiSamplePercentage;
			return includedSample;
		};
	},

	GetConsentCookie : function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
};

