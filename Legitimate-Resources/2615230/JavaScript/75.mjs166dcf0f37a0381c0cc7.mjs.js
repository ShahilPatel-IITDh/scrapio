(window.webpackJsonpDelete=window.webpackJsonpDelete||[]).push([[75],{13:function(e,t,n){"use strict";function r(e){if(!p.is.store(e))throw Error("expect useStore argument to be a store");var t=f.useReducer(d,void 0,e.getState)[1],n=f.useMemo((function(){var n=e.updates.watch((function(e){n.active&&t(e)}));return n.active=1,n}),[e]);return l((function(){return function(){n.active=0,n()}}),[n]),e.getState()}function o(e){var t=e.store,n=e.keys,o=e.fn;if(!p.is.store(t))throw Error("useStoreMap expects a store");if(!Array.isArray(n))throw Error("useStoreMap expects an array as keys");if("function"!=typeof o)throw Error("useStoreMap expects a function");var u=f.useMemo((function(){return p.createStore(o(t.getState(),n)).on(t,(function(e,t){return o(t,n)}))}),n),c=r(u);return l((function(){return function(){u.off(t),p.clearNode(u,{deep:1})}}),n),c}function u(e,t){function n(e){var n=f.useRef(e),o=f.useMemo((function(){return v(e)}),[]),u=r(o);l((function(){return s({props:n.current,state:o.getState()}),function(){d({props:n.current,state:o.getState()})}}),[]);var c=t(e,u);return n.current=e,c}var o,u,c,a;if(p.is.store(e))a=e;else if("function"==typeof e)c=e;else{if("object"!=typeof e||null===e)throw Error("shape should be a store or object with stores");a=p.createStoreObject(e)}var i=null!==(o=null===(u=a)||void 0===u?void 0:u.shortName)&&void 0!==o?o:"Unknown",s=p.createEvent(i+".View mounted"),d=p.createEvent(i+".View unmounted"),v="function"==typeof e?c:function(){return a};return n.displayName=i+".View",n.mounted=s,n.unmounted=d,n}function c(e){return u(e,(function(e,t){return(0,e.children)(t)}))}function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function s(e,t){var n=c(e),r=function(e){return f.createElement(n,null,(function(n){return f.createElement(t,a({},e,n))}))};return r.displayName="Connect("+(t.displayName||t.name||"Unknown")+")",r}Object.defineProperty(t,"__esModule",{value:1});var f=n(0),p=n(16),l="undefined"!=typeof window?f.useLayoutEffect:f.useEffect,d=function(e,t){return t};t.connect=function(e){return function(t){return s(t,e)}},t.createComponent=u,t.createContextComponent=function(e,t,n){var r,o,u=c(e);return o=r=function(e){function t(){for(var t,r=arguments.length,o=new Array(r),u=0;u<r;u++)o[u]=arguments[u];return(t=e.call.apply(e,[this].concat(o))||this).renderProp=function(e){return n(t.props,e,t.context)},t}return i(t,e),t.prototype.render=function(){return f.createElement(u,null,this.renderProp)},t}(f.Component),r.contextType=t,o},t.createGate=function e(t,n){var r;void 0===t&&(t="gate"),void 0===n&&(n={}),"object"==typeof t&&null!==t&&("defaultState"in t&&(n=t.defaultState),t.domain&&(r=t.domain),t=t.name||"gate");var o=p.createStore(Boolean(0)),u=p.createStore(n),c=p.createApi(u,{set:function(e,t){return t}}).set,a=p.createApi(o,{open:function(){return v.predicate()&&Boolean(1)},close:function(){return Boolean(0)},destructor:function(){return Boolean(0)}}),s=a.open,l=a.close,d=a.destructor,v=function(n){function r(){return n.apply(this,arguments)||this}i(r,n),r.childGate=function(n){void 0===n&&(n="Subgate"),console.error("childGate is deprecated");var o=e(t+"/"+n);o.predicate=function(){return r.status.getState()};var u=0,c=0;return o.open.watch((function(){c||(u=1)})),o.close.watch((function(){c||(u=0)})),r.status.watch((function(e){c=1,u&&e&&!o.status.getState()&&o.open(),c=0})),r.close.watch((function(){c=1,o.close(),c=0})),r.destructor.watch((function(){return o.destructor()})),o};var o=r.prototype;return o.componentDidMount=function(){r.open(this.props)},o.componentWillUnmount=function(){r.close(this.props)},o.render=function(){return r.set(this.props),null},r}(f.PureComponent);v.predicate=function(){return Boolean(1)},v.displayName="Gate:"+t,v.isOpen=Boolean(0),v.current=u.getState(),v.open=s,v.close=l,v.status=o,v.state=u,v.set=c,v.destructor=d,v.isTerminated=Boolean(0);var h=o.watch((function(e){return v.isOpen=e})),m=u.watch((function(e){return v.current=e}));o.map((function(e){return e||(v.current=n),null})),u.reset(l);var y=d.watch((function(){v.isTerminated=Boolean(1)})),w=d.watch((function(){w(),h(),m(),y(),v.status.off(v.open),v.status.off(v.close),v.status.off(v.destructor),v.state.off(v.set)}));if(r){var S=r.hooks;p.launch({target:[S.store,S.store,S.event,S.event,S.event],params:[o,u,s,l,c]})}return v},t.createReactState=s,t.createStoreConsumer=c,t.useEvent=function(e){return e},t.useGate=function(e,t){void 0===t&&(t={});var n=f.useRef(t);n.current=t,l((function(){return e.open(n.current),function(){return e.close(n.current)}}),[e]),e.set(t)},t.useList=function(e,t){var n,r=[];if("object"==typeof t&&null!==t?(t.keys&&(r=t.keys),n=t.fn):n=t,!p.is.store(e))throw Error("expect useList first argument to be a store");if("function"!=typeof n)throw Error("expect useList's renderItem to be a function");if(!Array.isArray(r))throw Error("expect useList's keys to be an array");var u=f.useMemo((function(){var t=function(t){var n=t.index,r=o({store:e,keys:[n].concat(t.keys),fn:function(e,t){return e[t[0]]}});return a.current(r,n)};return t.displayName=(e.shortName||"Unknown")+".Item",f.memo(t)}),[e]),c=o({store:e,keys:[e],fn:function(e){return e.length}}),a=f.useRef(n);a.current=n;var i=f.useMemo((function(){return r}),r);return Array.from({length:c},(function(e,t){return f.createElement(u,{index:t,key:t,keys:i})}))},t.useStore=r,t.useStoreMap=o}}]);