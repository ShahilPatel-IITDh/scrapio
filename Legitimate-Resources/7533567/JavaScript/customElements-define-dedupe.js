// https://www.npmjs.com/package/@lrnwebcomponents/deduping-fix
var _customElementsDefine = window.customElements.define || null;
window.customElements.define = function (name, cl, conf){
  if (!customElements.get(name)) {
    _customElementsDefine.call(window.customElements, name, cl, conf);
  } else {
    console.warn(name + ' has been defined twice');
  }
}