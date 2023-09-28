!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<g.length;t++)o(e,g[t],!1);for(var r=0;r<m.length;r++)o(e,m[r],!0)};r.invoked=!0;var a=t.createElement("script");a.type="text/javascript",a.integrity="sha384-LvaCAT7ChT7o7pMUdi7kGE7XNXWjVFWPh+0qW+1c7D2qL3lpgkadtFJC2wvNhGjm",a.crossOrigin="anonymous",a.async=!0,a.src="https://cdn.amplitude.com/libs/analytics-browser-1.10.3-min.js.gz",a.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(a,c);for(var u=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<p.length;l++)n(u,p[l]);r.Identify=u;for(var d=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],f=0;f<v.length;f++)n(d,v[f]);r.Revenue=d;var g=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],m=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(r),r.createInstance=function(e){return r._iq[e]={_q:[]},i(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

/**
 * This is an example plugin that enriches all events by removing a list of keys from the
 * event payload. This plugin is helpful in cases where users prefer not to use default
 * values set by the @amplitude/analytics-browser library, for example:
 * - `event.time`
 * - `event.idfa`
 * - `event.idva`
 * - `event.ip`
 *
 * @param keysToRemove
 * @returns EnrichmentPlugin
 */
const removeEventKeyEnrichment = (keysToRemove = []) => {
  return {
    name: 'remove-event-key-enrichment',
    type: 'enrichment',
    setup: async () => undefined,
    execute: async (event) => {
      for (var key of keysToRemove) {
        delete event[key]
      }
      return event
    },
  }
}

// remove the time key using the enrichment plugin
const removeTimeEnrichment = removeEventKeyEnrichment(['time'])

/**
 * IMPORTANT: install plugin before calling init to make sure plugin is added by the time
 * init function is called, and events are flushed.
 */
amplitude.add(removeTimeEnrichment)

// initialize the sdk
amplitude.init("9e2bdeb55f3924a7de5241aae43f1d77")
if(typeof window.amplitudeOpenEvent !== "undefined") {
  // Override the videoEmbed for SSR. for embed videos specifically.
  if(window.amplitudeOpenEvent.event === "ArticleOpen") {
    window.amplitudeOpenEvent.eventProperties.videoEmbedded = getMetaValue('hasVideo', 'name', false) ? 'Yes' : 'No'
  }
  amplitude.track(
    window.amplitudeOpenEvent.event,
    window.amplitudeOpenEvent.eventProperties
  )
  delete window.amplitudeOpenEvent
}
