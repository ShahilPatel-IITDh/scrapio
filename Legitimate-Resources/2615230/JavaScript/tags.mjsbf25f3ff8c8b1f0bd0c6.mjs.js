(window.webpackJsonpDelete=window.webpackJsonpDelete||[]).push([[403],{1403:function(e,t,i){"use strict";i.r(t),i(955);var s=i(2),r=(i(4),i(5),i(37)),n=i(9);function o(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class a extends s.a{constructor(...e){super(...e),o(this,"_initSlider",()=>{this.slider||(this.slider=new r.a(this.element,{touchRatio:1,rewind:!1,bound:!0,gap:10}),this.slider.mount())}),o(this,"_destroySlider",()=>{this.slider&&(this.slider.destroy(),this.slider=null)}),o(this,"_checkType",()=>{n.a.is("<","tablet")?this._initSlider():this._destroySlider()})}static getNamespace(){return"tags"}onInit(){n.a.subscribeOnChange(this._checkType),this._checkType()}onDestroy(){this._destroySlider()}}s.b.register(a)},955:function(e,t,i){e.exports={meta:'\'{"e":".tags","f":[]}\''}}},[[1403,0,1,3,2,4,5,6,9,10,11,12,13,14,15,26,32,31,33,34,35,36,45,16,43]]]);