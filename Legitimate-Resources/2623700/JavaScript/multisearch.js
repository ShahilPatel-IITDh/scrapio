var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
    if (decorator = decorators[i6])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/@lit/reactive-element/css-tag.js
var t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e = Symbol();
var n = /* @__PURE__ */ new WeakMap();
var s = class {
  constructor(t5, n7, s6) {
    if (this._$cssResult$ = true, s6 !== e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t5, this.t = n7;
  }
  get styleSheet() {
    let e8 = this.o;
    const s6 = this.t;
    if (t && void 0 === e8) {
      const t5 = void 0 !== s6 && 1 === s6.length;
      t5 && (e8 = n.get(s6)), void 0 === e8 && ((this.o = e8 = new CSSStyleSheet()).replaceSync(this.cssText), t5 && n.set(s6, e8));
    }
    return e8;
  }
  toString() {
    return this.cssText;
  }
};
var o = (t5) => new s("string" == typeof t5 ? t5 : t5 + "", void 0, e);
var r = (t5, ...n7) => {
  const o6 = 1 === t5.length ? t5[0] : n7.reduce((e8, n8, s6) => e8 + ((t6) => {
    if (true === t6._$cssResult$)
      return t6.cssText;
    if ("number" == typeof t6)
      return t6;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n8) + t5[s6 + 1], t5[0]);
  return new s(o6, t5, e);
};
var i = (e8, n7) => {
  t ? e8.adoptedStyleSheets = n7.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet) : n7.forEach((t5) => {
    const n8 = document.createElement("style"), s6 = window.litNonce;
    void 0 !== s6 && n8.setAttribute("nonce", s6), n8.textContent = t5.cssText, e8.appendChild(n8);
  });
};
var S = t ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
  let e8 = "";
  for (const n7 of t6.cssRules)
    e8 += n7.cssText;
  return o(e8);
})(t5) : t5;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window.trustedTypes;
var r2 = e2 ? e2.emptyScript : "";
var h = window.reactiveElementPolyfillSupport;
var o2 = { toAttribute(t5, i6) {
  switch (i6) {
    case Boolean:
      t5 = t5 ? r2 : null;
      break;
    case Object:
    case Array:
      t5 = null == t5 ? t5 : JSON.stringify(t5);
  }
  return t5;
}, fromAttribute(t5, i6) {
  let s6 = t5;
  switch (i6) {
    case Boolean:
      s6 = null !== t5;
      break;
    case Number:
      s6 = null === t5 ? null : Number(t5);
      break;
    case Object:
    case Array:
      try {
        s6 = JSON.parse(t5);
      } catch (t6) {
        s6 = null;
      }
  }
  return s6;
} };
var n2 = (t5, i6) => i6 !== t5 && (i6 == i6 || t5 == t5);
var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
var a = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t5) {
    var i6;
    null !== (i6 = this.h) && void 0 !== i6 || (this.h = []), this.h.push(t5);
  }
  static get observedAttributes() {
    this.finalize();
    const t5 = [];
    return this.elementProperties.forEach((i6, s6) => {
      const e8 = this._$Ep(s6, i6);
      void 0 !== e8 && (this._$Ev.set(e8, s6), t5.push(e8));
    }), t5;
  }
  static createProperty(t5, i6 = l) {
    if (i6.state && (i6.attribute = false), this.finalize(), this.elementProperties.set(t5, i6), !i6.noAccessor && !this.prototype.hasOwnProperty(t5)) {
      const s6 = "symbol" == typeof t5 ? Symbol() : "__" + t5, e8 = this.getPropertyDescriptor(t5, s6, i6);
      void 0 !== e8 && Object.defineProperty(this.prototype, t5, e8);
    }
  }
  static getPropertyDescriptor(t5, i6, s6) {
    return { get() {
      return this[i6];
    }, set(e8) {
      const r4 = this[t5];
      this[i6] = e8, this.requestUpdate(t5, r4, s6);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t5) {
    return this.elementProperties.get(t5) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t5 = Object.getPrototypeOf(this);
    if (t5.finalize(), this.elementProperties = new Map(t5.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t6 = this.properties, i6 = [...Object.getOwnPropertyNames(t6), ...Object.getOwnPropertySymbols(t6)];
      for (const s6 of i6)
        this.createProperty(s6, t6[s6]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i6) {
    const s6 = [];
    if (Array.isArray(i6)) {
      const e8 = new Set(i6.flat(1 / 0).reverse());
      for (const i7 of e8)
        s6.unshift(S(i7));
    } else
      void 0 !== i6 && s6.push(S(i6));
    return s6;
  }
  static _$Ep(t5, i6) {
    const s6 = i6.attribute;
    return false === s6 ? void 0 : "string" == typeof s6 ? s6 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
  }
  u() {
    var t5;
    this._$E_ = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t5 = this.constructor.h) || void 0 === t5 || t5.forEach((t6) => t6(this));
  }
  addController(t5) {
    var i6, s6;
    (null !== (i6 = this._$ES) && void 0 !== i6 ? i6 : this._$ES = []).push(t5), void 0 !== this.renderRoot && this.isConnected && (null === (s6 = t5.hostConnected) || void 0 === s6 || s6.call(t5));
  }
  removeController(t5) {
    var i6;
    null === (i6 = this._$ES) || void 0 === i6 || i6.splice(this._$ES.indexOf(t5) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t5, i6) => {
      this.hasOwnProperty(i6) && (this._$Ei.set(i6, this[i6]), delete this[i6]);
    });
  }
  createRenderRoot() {
    var t5;
    const s6 = null !== (t5 = this.shadowRoot) && void 0 !== t5 ? t5 : this.attachShadow(this.constructor.shadowRootOptions);
    return i(s6, this.constructor.elementStyles), s6;
  }
  connectedCallback() {
    var t5;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
      var i6;
      return null === (i6 = t6.hostConnected) || void 0 === i6 ? void 0 : i6.call(t6);
    });
  }
  enableUpdating(t5) {
  }
  disconnectedCallback() {
    var t5;
    null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
      var i6;
      return null === (i6 = t6.hostDisconnected) || void 0 === i6 ? void 0 : i6.call(t6);
    });
  }
  attributeChangedCallback(t5, i6, s6) {
    this._$AK(t5, s6);
  }
  _$EO(t5, i6, s6 = l) {
    var e8, r4;
    const h3 = this.constructor._$Ep(t5, s6);
    if (void 0 !== h3 && true === s6.reflect) {
      const n7 = (null !== (r4 = null === (e8 = s6.converter) || void 0 === e8 ? void 0 : e8.toAttribute) && void 0 !== r4 ? r4 : o2.toAttribute)(i6, s6.type);
      this._$El = t5, null == n7 ? this.removeAttribute(h3) : this.setAttribute(h3, n7), this._$El = null;
    }
  }
  _$AK(t5, i6) {
    var s6, e8;
    const r4 = this.constructor, h3 = r4._$Ev.get(t5);
    if (void 0 !== h3 && this._$El !== h3) {
      const t6 = r4.getPropertyOptions(h3), n7 = t6.converter, l7 = null !== (e8 = null !== (s6 = null == n7 ? void 0 : n7.fromAttribute) && void 0 !== s6 ? s6 : "function" == typeof n7 ? n7 : null) && void 0 !== e8 ? e8 : o2.fromAttribute;
      this._$El = h3, this[h3] = l7(i6, t6.type), this._$El = null;
    }
  }
  requestUpdate(t5, i6, s6) {
    let e8 = true;
    void 0 !== t5 && (((s6 = s6 || this.constructor.getPropertyOptions(t5)).hasChanged || n2)(this[t5], i6) ? (this._$AL.has(t5) || this._$AL.set(t5, i6), true === s6.reflect && this._$El !== t5 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t5, s6))) : e8 = false), !this.isUpdatePending && e8 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t6) {
      Promise.reject(t6);
    }
    const t5 = this.scheduleUpdate();
    return null != t5 && await t5, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t5;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t6, i7) => this[i7] = t6), this._$Ei = void 0);
    let i6 = false;
    const s6 = this._$AL;
    try {
      i6 = this.shouldUpdate(s6), i6 ? (this.willUpdate(s6), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
        var i7;
        return null === (i7 = t6.hostUpdate) || void 0 === i7 ? void 0 : i7.call(t6);
      }), this.update(s6)) : this._$Ek();
    } catch (t6) {
      throw i6 = false, this._$Ek(), t6;
    }
    i6 && this._$AE(s6);
  }
  willUpdate(t5) {
  }
  _$AE(t5) {
    var i6;
    null === (i6 = this._$ES) || void 0 === i6 || i6.forEach((t6) => {
      var i7;
      return null === (i7 = t6.hostUpdated) || void 0 === i7 ? void 0 : i7.call(t6);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t5) {
    return true;
  }
  update(t5) {
    void 0 !== this._$EC && (this._$EC.forEach((t6, i6) => this._$EO(i6, this[i6], t6)), this._$EC = void 0), this._$Ek();
  }
  updated(t5) {
  }
  firstUpdated(t5) {
  }
};
a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, null == h || h({ ReactiveElement: a }), (null !== (s2 = globalThis.reactiveElementVersions) && void 0 !== s2 ? s2 : globalThis.reactiveElementVersions = []).push("1.3.4");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = globalThis.trustedTypes;
var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
var e3 = `lit$${(Math.random() + "").slice(9)}$`;
var o3 = "?" + e3;
var n3 = `<${o3}>`;
var l2 = document;
var h2 = (t5 = "") => l2.createComment(t5);
var r3 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
var d = Array.isArray;
var u = (t5) => d(t5) || "function" == typeof (null == t5 ? void 0 : t5[Symbol.iterator]);
var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var a2 = />/g;
var f = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var _ = /'/g;
var g = /"/g;
var m = /^(?:script|style|textarea|title)$/i;
var p = (t5) => (i6, ...s6) => ({ _$litType$: t5, strings: i6, values: s6 });
var $ = p(1);
var y = p(2);
var b = Symbol.for("lit-noChange");
var w = Symbol.for("lit-nothing");
var x = /* @__PURE__ */ new WeakMap();
var T = (t5, i6, s6) => {
  var e8, o6;
  const n7 = null !== (e8 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== e8 ? e8 : i6;
  let l7 = n7._$litPart$;
  if (void 0 === l7) {
    const t6 = null !== (o6 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== o6 ? o6 : null;
    n7._$litPart$ = l7 = new N(i6.insertBefore(h2(), t6), t6, void 0, null != s6 ? s6 : {});
  }
  return l7._$AI(t5), l7;
};
var A = l2.createTreeWalker(l2, 129, null, false);
var E = (t5, i6) => {
  const o6 = t5.length - 1, l7 = [];
  let h3, r4 = 2 === i6 ? "<svg>" : "", d2 = c;
  for (let i7 = 0; i7 < o6; i7++) {
    const s6 = t5[i7];
    let o7, u3, p2 = -1, $2 = 0;
    for (; $2 < s6.length && (d2.lastIndex = $2, u3 = d2.exec(s6), null !== u3); )
      $2 = d2.lastIndex, d2 === c ? "!--" === u3[1] ? d2 = v : void 0 !== u3[1] ? d2 = a2 : void 0 !== u3[2] ? (m.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d2 = f) : void 0 !== u3[3] && (d2 = f) : d2 === f ? ">" === u3[0] ? (d2 = null != h3 ? h3 : c, p2 = -1) : void 0 === u3[1] ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o7 = u3[1], d2 = void 0 === u3[3] ? f : '"' === u3[3] ? g : _) : d2 === g || d2 === _ ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
    const y2 = d2 === f && t5[i7 + 1].startsWith("/>") ? " " : "";
    r4 += d2 === c ? s6 + n3 : p2 >= 0 ? (l7.push(o7), s6.slice(0, p2) + "$lit$" + s6.slice(p2) + e3 + y2) : s6 + e3 + (-2 === p2 ? (l7.push(void 0), i7) : y2);
  }
  const u2 = r4 + (t5[o6] || "<?>") + (2 === i6 ? "</svg>" : "");
  if (!Array.isArray(t5) || !t5.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== s3 ? s3.createHTML(u2) : u2, l7];
};
var C = class {
  constructor({ strings: t5, _$litType$: s6 }, n7) {
    let l7;
    this.parts = [];
    let r4 = 0, d2 = 0;
    const u2 = t5.length - 1, c2 = this.parts, [v2, a3] = E(t5, s6);
    if (this.el = C.createElement(v2, n7), A.currentNode = this.el.content, 2 === s6) {
      const t6 = this.el.content, i6 = t6.firstChild;
      i6.remove(), t6.append(...i6.childNodes);
    }
    for (; null !== (l7 = A.nextNode()) && c2.length < u2; ) {
      if (1 === l7.nodeType) {
        if (l7.hasAttributes()) {
          const t6 = [];
          for (const i6 of l7.getAttributeNames())
            if (i6.endsWith("$lit$") || i6.startsWith(e3)) {
              const s7 = a3[d2++];
              if (t6.push(i6), void 0 !== s7) {
                const t7 = l7.getAttribute(s7.toLowerCase() + "$lit$").split(e3), i7 = /([.?@])?(.*)/.exec(s7);
                c2.push({ type: 1, index: r4, name: i7[2], strings: t7, ctor: "." === i7[1] ? M : "?" === i7[1] ? k : "@" === i7[1] ? H : S2 });
              } else
                c2.push({ type: 6, index: r4 });
            }
          for (const i6 of t6)
            l7.removeAttribute(i6);
        }
        if (m.test(l7.tagName)) {
          const t6 = l7.textContent.split(e3), s7 = t6.length - 1;
          if (s7 > 0) {
            l7.textContent = i2 ? i2.emptyScript : "";
            for (let i6 = 0; i6 < s7; i6++)
              l7.append(t6[i6], h2()), A.nextNode(), c2.push({ type: 2, index: ++r4 });
            l7.append(t6[s7], h2());
          }
        }
      } else if (8 === l7.nodeType)
        if (l7.data === o3)
          c2.push({ type: 2, index: r4 });
        else {
          let t6 = -1;
          for (; -1 !== (t6 = l7.data.indexOf(e3, t6 + 1)); )
            c2.push({ type: 7, index: r4 }), t6 += e3.length - 1;
        }
      r4++;
    }
  }
  static createElement(t5, i6) {
    const s6 = l2.createElement("template");
    return s6.innerHTML = t5, s6;
  }
};
function P(t5, i6, s6 = t5, e8) {
  var o6, n7, l7, h3;
  if (i6 === b)
    return i6;
  let d2 = void 0 !== e8 ? null === (o6 = s6._$Cl) || void 0 === o6 ? void 0 : o6[e8] : s6._$Cu;
  const u2 = r3(i6) ? void 0 : i6._$litDirective$;
  return (null == d2 ? void 0 : d2.constructor) !== u2 && (null === (n7 = null == d2 ? void 0 : d2._$AO) || void 0 === n7 || n7.call(d2, false), void 0 === u2 ? d2 = void 0 : (d2 = new u2(t5), d2._$AT(t5, s6, e8)), void 0 !== e8 ? (null !== (l7 = (h3 = s6)._$Cl) && void 0 !== l7 ? l7 : h3._$Cl = [])[e8] = d2 : s6._$Cu = d2), void 0 !== d2 && (i6 = P(t5, d2._$AS(t5, i6.values), d2, e8)), i6;
}
var V = class {
  constructor(t5, i6) {
    this.v = [], this._$AN = void 0, this._$AD = t5, this._$AM = i6;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t5) {
    var i6;
    const { el: { content: s6 }, parts: e8 } = this._$AD, o6 = (null !== (i6 = null == t5 ? void 0 : t5.creationScope) && void 0 !== i6 ? i6 : l2).importNode(s6, true);
    A.currentNode = o6;
    let n7 = A.nextNode(), h3 = 0, r4 = 0, d2 = e8[0];
    for (; void 0 !== d2; ) {
      if (h3 === d2.index) {
        let i7;
        2 === d2.type ? i7 = new N(n7, n7.nextSibling, this, t5) : 1 === d2.type ? i7 = new d2.ctor(n7, d2.name, d2.strings, this, t5) : 6 === d2.type && (i7 = new I(n7, this, t5)), this.v.push(i7), d2 = e8[++r4];
      }
      h3 !== (null == d2 ? void 0 : d2.index) && (n7 = A.nextNode(), h3++);
    }
    return o6;
  }
  m(t5) {
    let i6 = 0;
    for (const s6 of this.v)
      void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t5, s6, i6), i6 += s6.strings.length - 2) : s6._$AI(t5[i6])), i6++;
  }
};
var N = class {
  constructor(t5, i6, s6, e8) {
    var o6;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t5, this._$AB = i6, this._$AM = s6, this.options = e8, this._$C_ = null === (o6 = null == e8 ? void 0 : e8.isConnected) || void 0 === o6 || o6;
  }
  get _$AU() {
    var t5, i6;
    return null !== (i6 = null === (t5 = this._$AM) || void 0 === t5 ? void 0 : t5._$AU) && void 0 !== i6 ? i6 : this._$C_;
  }
  get parentNode() {
    let t5 = this._$AA.parentNode;
    const i6 = this._$AM;
    return void 0 !== i6 && 11 === t5.nodeType && (t5 = i6.parentNode), t5;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t5, i6 = this) {
    t5 = P(this, t5, i6), r3(t5) ? t5 === w || null == t5 || "" === t5 ? (this._$AH !== w && this._$AR(), this._$AH = w) : t5 !== this._$AH && t5 !== b && this.T(t5) : void 0 !== t5._$litType$ ? this.$(t5) : void 0 !== t5.nodeType ? this.k(t5) : u(t5) ? this.S(t5) : this.T(t5);
  }
  j(t5, i6 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t5, i6);
  }
  k(t5) {
    this._$AH !== t5 && (this._$AR(), this._$AH = this.j(t5));
  }
  T(t5) {
    this._$AH !== w && r3(this._$AH) ? this._$AA.nextSibling.data = t5 : this.k(l2.createTextNode(t5)), this._$AH = t5;
  }
  $(t5) {
    var i6;
    const { values: s6, _$litType$: e8 } = t5, o6 = "number" == typeof e8 ? this._$AC(t5) : (void 0 === e8.el && (e8.el = C.createElement(e8.h, this.options)), e8);
    if ((null === (i6 = this._$AH) || void 0 === i6 ? void 0 : i6._$AD) === o6)
      this._$AH.m(s6);
    else {
      const t6 = new V(o6, this), i7 = t6.p(this.options);
      t6.m(s6), this.k(i7), this._$AH = t6;
    }
  }
  _$AC(t5) {
    let i6 = x.get(t5.strings);
    return void 0 === i6 && x.set(t5.strings, i6 = new C(t5)), i6;
  }
  S(t5) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i6 = this._$AH;
    let s6, e8 = 0;
    for (const o6 of t5)
      e8 === i6.length ? i6.push(s6 = new N(this.j(h2()), this.j(h2()), this, this.options)) : s6 = i6[e8], s6._$AI(o6), e8++;
    e8 < i6.length && (this._$AR(s6 && s6._$AB.nextSibling, e8), i6.length = e8);
  }
  _$AR(t5 = this._$AA.nextSibling, i6) {
    var s6;
    for (null === (s6 = this._$AP) || void 0 === s6 || s6.call(this, false, true, i6); t5 && t5 !== this._$AB; ) {
      const i7 = t5.nextSibling;
      t5.remove(), t5 = i7;
    }
  }
  setConnected(t5) {
    var i6;
    void 0 === this._$AM && (this._$C_ = t5, null === (i6 = this._$AP) || void 0 === i6 || i6.call(this, t5));
  }
};
var S2 = class {
  constructor(t5, i6, s6, e8, o6) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t5, this.name = i6, this._$AM = e8, this.options = o6, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5, i6 = this, s6, e8) {
    const o6 = this.strings;
    let n7 = false;
    if (void 0 === o6)
      t5 = P(this, t5, i6, 0), n7 = !r3(t5) || t5 !== this._$AH && t5 !== b, n7 && (this._$AH = t5);
    else {
      const e9 = t5;
      let l7, h3;
      for (t5 = o6[0], l7 = 0; l7 < o6.length - 1; l7++)
        h3 = P(this, e9[s6 + l7], i6, l7), h3 === b && (h3 = this._$AH[l7]), n7 || (n7 = !r3(h3) || h3 !== this._$AH[l7]), h3 === w ? t5 = w : t5 !== w && (t5 += (null != h3 ? h3 : "") + o6[l7 + 1]), this._$AH[l7] = h3;
    }
    n7 && !e8 && this.P(t5);
  }
  P(t5) {
    t5 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t5 ? t5 : "");
  }
};
var M = class extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t5) {
    this.element[this.name] = t5 === w ? void 0 : t5;
  }
};
var R = i2 ? i2.emptyScript : "";
var k = class extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t5) {
    t5 && t5 !== w ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }
};
var H = class extends S2 {
  constructor(t5, i6, s6, e8, o6) {
    super(t5, i6, s6, e8, o6), this.type = 5;
  }
  _$AI(t5, i6 = this) {
    var s6;
    if ((t5 = null !== (s6 = P(this, t5, i6, 0)) && void 0 !== s6 ? s6 : w) === b)
      return;
    const e8 = this._$AH, o6 = t5 === w && e8 !== w || t5.capture !== e8.capture || t5.once !== e8.once || t5.passive !== e8.passive, n7 = t5 !== w && (e8 === w || o6);
    o6 && this.element.removeEventListener(this.name, this, e8), n7 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
  }
  handleEvent(t5) {
    var i6, s6;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s6 = null === (i6 = this.options) || void 0 === i6 ? void 0 : i6.host) && void 0 !== s6 ? s6 : this.element, t5) : this._$AH.handleEvent(t5);
  }
};
var I = class {
  constructor(t5, i6, s6) {
    this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s6;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5) {
    P(this, t5);
  }
};
var L = { A: "$lit$", C: e3, M: o3, L: 1, R: E, V, D: u, I: P, H: N, N: S2, U: k, B: H, F: M, W: I };
var z = window.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t2 = globalThis.litHtmlVersions) && void 0 !== t2 ? t2 : globalThis.litHtmlVersions = []).push("2.2.7");

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends a {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t5, e8;
    const i6 = super.createRenderRoot();
    return null !== (t5 = (e8 = this.renderOptions).renderBefore) && void 0 !== t5 || (e8.renderBefore = i6.firstChild), i6;
  }
  update(t5) {
    const i6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = T(i6, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t5;
    super.connectedCallback(), null === (t5 = this._$Do) || void 0 === t5 || t5.setConnected(true);
  }
  disconnectedCallback() {
    var t5;
    super.disconnectedCallback(), null === (t5 = this._$Do) || void 0 === t5 || t5.setConnected(false);
  }
  render() {
    return b;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.2");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var n5 = (n7) => (e8) => "function" == typeof e8 ? ((n8, e9) => (window.customElements.define(n8, e9), e9))(n7, e8) : ((n8, e9) => {
  const { kind: t5, elements: i6 } = e9;
  return { kind: t5, elements: i6, finisher(e10) {
    window.customElements.define(n8, e10);
  } };
})(n7, e8);

// node_modules/@lit/reactive-element/decorators/property.js
var i3 = (i6, e8) => "method" === e8.kind && e8.descriptor && !("value" in e8.descriptor) ? { ...e8, finisher(n7) {
  n7.createProperty(e8.key, i6);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e8.key, initializer() {
  "function" == typeof e8.initializer && (this[e8.key] = e8.initializer.call(this));
}, finisher(n7) {
  n7.createProperty(e8.key, i6);
} };
function e4(e8) {
  return (n7, t5) => void 0 !== t5 ? ((i6, e9, n8) => {
    e9.constructor.createProperty(n8, i6);
  })(e8, n7, t5) : i3(e8, n7);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t3(t5) {
  return e4({ ...t5, state: true });
}

// node_modules/@lit/reactive-element/decorators/base.js
var o5 = ({ finisher: e8, descriptor: t5 }) => (o6, n7) => {
  var r4;
  if (void 0 === n7) {
    const n8 = null !== (r4 = o6.originalKey) && void 0 !== r4 ? r4 : o6.key, i6 = null != t5 ? { kind: "method", placement: "prototype", key: n8, descriptor: t5(o6.key) } : { ...o6, key: n8 };
    return null != e8 && (i6.finisher = function(t6) {
      e8(t6, n8);
    }), i6;
  }
  {
    const r5 = o6.constructor;
    void 0 !== t5 && Object.defineProperty(o6, n7, t5(n7)), null == e8 || e8(r5, n7);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i4(i6, n7) {
  return o5({ descriptor: (o6) => {
    const t5 = { get() {
      var o7, n8;
      return null !== (n8 = null === (o7 = this.renderRoot) || void 0 === o7 ? void 0 : o7.querySelector(i6)) && void 0 !== n8 ? n8 : null;
    }, enumerable: true, configurable: true };
    if (n7) {
      const n8 = "symbol" == typeof o6 ? Symbol() : "__" + o6;
      t5.get = function() {
        var o7, t6;
        return void 0 === this[n8] && (this[n8] = null !== (t6 = null === (o7 = this.renderRoot) || void 0 === o7 ? void 0 : o7.querySelector(i6)) && void 0 !== t6 ? t6 : null), this[n8];
      };
    }
    return t5;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n6;
var e5 = null != (null === (n6 = window.HTMLSlotElement) || void 0 === n6 ? void 0 : n6.prototype.assignedElements) ? (o6, n7) => o6.assignedElements(n7) : (o6, n7) => o6.assignedNodes(n7).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e6 = (t5) => (...e8) => ({ _$litDirective$: t5, values: e8 });
var i5 = class {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e8, i6) {
    this._$Ct = t5, this._$AM = e8, this._$Ci = i6;
  }
  _$AS(t5, e8) {
    return this.update(t5, e8);
  }
  update(t5, e8) {
    return this.render(...e8);
  }
};

// node_modules/lit-html/directive-helpers.js
var { H: l5 } = L;
var e7 = (o6) => void 0 === o6.strings;
var f2 = {};
var s5 = (o6, l7 = f2) => o6._$AH = l7;

// node_modules/lit-html/directives/live.js
var l6 = e6(class extends i5 {
  constructor(r4) {
    if (super(r4), r4.type !== t4.PROPERTY && r4.type !== t4.ATTRIBUTE && r4.type !== t4.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!e7(r4))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r4) {
    return r4;
  }
  update(i6, [t5]) {
    if (t5 === b || t5 === w)
      return t5;
    const o6 = i6.element, l7 = i6.name;
    if (i6.type === t4.PROPERTY) {
      if (t5 === o6[l7])
        return b;
    } else if (i6.type === t4.BOOLEAN_ATTRIBUTE) {
      if (!!t5 === o6.hasAttribute(l7))
        return b;
    } else if (i6.type === t4.ATTRIBUTE && o6.getAttribute(l7) === t5 + "")
      return b;
    return s5(i6), t5;
  }
});

// web-components/const.ts
var tablet = 768;
var desktop = 1024;

// web-components/multisearch/multisearch.styles.ts
var multisearch_styles_default = r`
  :host {
    --margin-sm: 8px;
    contain: content;
    display: block;
    position: relative;
    max-width: 14rem;
    margin-left: auto;
  }

  :host(.fullscreen) {
    position: fixed;
    top: 0;
    left: 0;
    max-width: none;
    width: 100%;
    height: 100%;
    background: white;
  }

  :host(.fullscreen) .dropdown__positioner {
    margin: var(--margin-sm);
    border-top: 1px solid #c2c2c2;
  }

  .form__wrapper.fullscreen {
    padding: 0.8rem 1rem 0;
    background: white;
  }

  form {
    display: flex;
    align-items: center;
  }

  .hover__wrapper {
    border: var(--border-search);
    border-radius: 4px;
    width: 100%;
    display: flex;
    overflow: hidden;
  }

  .hover__wrapper.border {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
  }

  .hover__wrapper:hover,
  .hover__wrapper:focus {
    border-color: var(--border-search-hover-color);
  }

  .hover__wrapper.fullscreen {
    border: 0;
  }

  .input__control {
    margin: 0;
    border: 0;
    height: 2.8rem;
    font-size: 1.6rem;
    line-height: 3rem;
    flex: 1;
    padding: 0 0.8rem;
    min-width: 4rem;
    width: 4rem;
    color: var(--cp-grey-color);
    outline: 0;
    -webkit-appearance: none;
  }

  .input__control::placeholder {
    font-style: normal;
    color: var(--cp-grey-light-4);
  }
  .input__control:focus::placeholder {
    color: var(--cp-grey-light-5);
  }

  .input__control.fullscreen {
    border: 0;
    border-radius: 0;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__submit.fullscreen {
    display: none;
  }

  button {
    background: white;
    border: 0;
    width: 3.2rem;
    height: 2.8rem;
    text-align: center;
    margin: 0;
    position: relative;
  }

  button.compact {
    background: var(--brand-color);
    height: 4.4rem;
    width: 4.4rem;
  }

  button span {
    width: 3.4rem;
    height: 2.8rem;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: 50%;
    position: absolute;
    top: 0;
    left: -2px;
    color: var(--bg-search-color);
  }

  button span:hover {
    cursor: pointer;
  }

  .back-icon {
    background-image: var(--bg-search-back);
  }

  .clear-icon {
    background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iRWJlbmVfNCIgZGF0YS1uYW1lPSJFYmVuZSA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3MTcxNzE7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIyLjg0LDguMjRsLS45My0uOTNhLjU0LjU0LDAsMCwwLS43NiwwTDE1LDEzLjQ1LDguODUsNy4yOWEuNTQuNTQsMCwwLDAtLjc2LDBsLS45My45M2EuNTQuNTQsMCwwLDAsMCwuNzZsNi4xNiw2LjE2TDcuNDQsMjFhLjU0LjU0LDAsMCwwLDAsLjc2bC45My45M2EuNTQuNTQsMCwwLDAsLjc2LDBMMTUsMTYuODNsNS44OCw1Ljg4YS41NC41NCwwLDAsMCwuNzYsMGwuOTQtLjkzYS41NC41NCwwLDAsMCwwLS43NkwxNi43LDE1LjE0LDIyLjg0LDlBLjU0LjU0LDAsMCwwLDIyLjg0LDguMjRaIi8+PC9zdmc+');
  }

  .compact-icon {
    height: 2rem;
    margin-left: 0.6rem;
    margin-top: 1.2rem;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjMuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNSAxNS43IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNSAxNS43OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I2ZmZmZmZjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNC43LDE0bC0zLjgtMy44YzAuOS0xLjEsMS40LTIuNCwxLjQtMy45QzEyLjQsMi44LDkuNiwwLDYuMiwwQzIuOCwwLDAsMi44LDAsNi4yczIuOCw2LjIsNi4yLDYuMgoJYzEuMiwwLDIuMy0wLjMsMy4yLTAuOWwzLjksMy45YzAuMiwwLjIsMC40LDAuMywwLjcsMC4zbDAsMGMwLjMsMCwwLjUtMC4xLDAuNy0wLjNDMTUuMSwxNSwxNS4xLDE0LjQsMTQuNywxNHogTTEuOCw2LjIKCWMwLTIuNCwyLTQuNCw0LjQtNC40YzIuNCwwLDQuNCwyLDQuNCw0LjRzLTIsNC40LTQuNCw0LjRDMy44LDEwLjYsMS44LDguNiwxLjgsNi4yeiIvPgo8L3N2Zz4K');
  }

  .submit-icon {
    background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iRWJlbmVfNCIgZGF0YS1uYW1lPSJFYmVuZSA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3MTcxNzE7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTI0Ljg1LDIzbC00LjUyLTQuNTJhOC41Miw4LjUyLDAsMSwwLTEuNzYsMS44bDQuNSw0LjVhLjUxLjUxLDAsMCwwLC43MSwwbDEuMDctMS4wN0EuNS41LDAsMCwwLDI0Ljg1LDIzWk0xMy40NiwyMEE2LjQ4LDYuNDgsMCwxLDEsMjAsMTMuNTQsNi40OCw2LjQ4LDAsMCwxLDEzLjQ2LDIwWiIvPjwvc3ZnPg==');
  }

  .dropdown__positioner {
    position: relative;
    background: white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .menu {
    list-style: none;
    display: none;
    background: white;
    padding: 0;
    margin: 0;
  }

  .menu li.menu-item a {
    display: flex;
    align-items: center;
    height: 40px;
  }

  .menu li.menu-item a.has__category {
    height: 60px;
  }

  .menu li.menu-item a span {
    display: inline-block;
  }

  .menu li.menu-item a span.image.has__category {
    width: 40px;
    height: 40px;
  }

  .menu li.menu-item a span.image {
    margin-left: var(--margin-sm);
    margin-right: var(--margin-sm);
    width: 20px;
    height: 20px;
  }

  .menu li.menu-item a span.image img {
    width: 100%;
    height: 100%;
    border: 4px;
  }

  .menu li.menu-item a span.result {
    flex: 1;
    align-content: flex-end;
    line-height: 1.8rem;
  }

  .menu li.menu-item a span.suggest {
    color: var(--cp-grey-light-1);
    font-size: 1.6rem;
    font-weight: 700;
  }

  .menu li.menu-item a span.label {
    color: var(--cp-grey-light-4);
    font-size: 1.4rem;
    width: 100%;
  }

  .menu li:not(.menu-item) {
    padding-right: 8px;
    height: 40px;
    display: flex;
    justify-content: end;
    align-items: center;
    color: var(--cp-grey-light-4);
    font-size: 10pt;
    border-top: 1px solid #c2c2c2;
    visibility: hidden;
  }

  .show {
    display: block;
  }

  .highlight {
    background: var(--highlight-search-color);
  }

  .suggest-temperature {
    color: #515151;
    font-size: 30px;
    line-height: 40px;
    margin-right: 12px;
  }

  @media (min-width: ${tablet}px) {
    :host {
      width: 47rem;
      max-width: none;
    }

    .dropdown__positioner {
      border-top: 0;
      padding: 0;
      margin: 0;
    }

    .menu {
      border: 1px solid #c2c2c2;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .menu li.menu-item a span.image {
      margin-left: 12px;
      margin-right: 12px;
    }

    .menu li:not(.menu-item) {
      visibility: initial;
      padding-right: 12px;
    }
  }

  @media (min-width: ${desktop}px) {
    :host {
      width: 63rem;
      max-width: none;
    }
  }
`;

// web-components/multisearch/multisearch.ts
var MultiSearch = class extends s4 {
  constructor() {
    super(...arguments);
    this.action = "";
    this.multiSuggest = "";
    this.brandName = "";
    this.origin = "magazin";
    this.mobileMode = "default";
    this.lang = "de";
    this.show = false;
    this.selectedMenuIndex = -1;
    this.userInput = "";
    this.abortController = new AbortController();
    this.displayInput = "";
    this.hasFocus = false;
    this.mouseOver = false;
    this.suppressFullscreen = false;
    this.formAction = "";
    this.formMethod = "get";
  }
  firstUpdated() {
    this.formAction = this.action;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleKeyboardDown = this.handleKeyboardDown.bind(this);
    addEventListener("keydown", this.handleKeyboardDown);
  }
  disconnectedCallback() {
    removeEventListener("keydown", this.handleKeyboardDown);
  }
  handleKeyboardDown(event) {
    var _a;
    if (this.show && this.suggestions) {
      if (event.key === "ArrowUp") {
        if (this.selectedMenuIndex > 0) {
          this.selectedMenuIndex--;
        } else {
          this.selectedMenuIndex = this.suggestions.length - 1;
        }
      }
      if (event.key === "ArrowDown") {
        if (this.selectedMenuIndex < this.suggestions.length - 1) {
          this.selectedMenuIndex++;
        } else {
          this.selectedMenuIndex = 0;
        }
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const suggestion = this.suggestions[this.selectedMenuIndex];
        this.displayInput = (_a = suggestion == null ? void 0 : suggestion.suggest) != null ? _a : "";
        if (suggestion == null ? void 0 : suggestion.url) {
          this.formAction = suggestion.url;
          this.formMethod = "post";
        } else {
          this.resetFormAttrib();
        }
      }
    }
  }
  handleClearClick(event) {
    this.userInput = "";
    this.displayInput = "";
    this.selectedMenuIndex = -1;
    this.show = false;
    this.input.focus();
    this.resetFormAttrib();
    event.stopPropagation();
  }
  handleBackClick(event) {
    this.userInput = "";
    this.displayInput = "";
    this.selectedMenuIndex = -1;
    this.className = "";
    this.suppressFullscreen = true;
    if (this.mobileMode === "compact") {
      this.hasFocus = false;
    }
    this.resetFormAttrib();
    event.stopPropagation();
  }
  handleCompactClick(event) {
    this.hasFocus = true;
    this.suppressFullscreen = false;
    event.stopPropagation();
  }
  async handleInput() {
    this.userInput = this.input.value;
    if (!this.multiSuggest) {
      return;
    }
    if (this.userInput.length == 0) {
      this.show = false;
      this.selectedMenuIndex = -1;
      this.displayInput = "";
      return;
    }
    this.resetFormAttrib();
    await this.requestSuggestions();
    if (this.result) {
      this.suggestions = this.result.suggests;
      this.show = this.suggestions.length > 0;
    }
    this.selectedMenuIndex = -1;
    this.displayInput = "";
  }
  handleBlur() {
    this.hasFocus = false;
    this.show = this.mouseOver;
    this.userInput = this.userInput.trim();
  }
  handleKeyDown(e8) {
    if (e8.key === "Enter") {
      this.userInput = this.userInput.trim();
    }
  }
  handleDropdownMouseEnter() {
    this.mouseOver = true;
  }
  handleDropdownMouseLeave() {
    this.mouseOver = false;
  }
  handleFocus() {
    this.hasFocus = true;
    this.suppressFullscreen = false;
    if (this.userInput.length > 0 && (this.suggestions && this.suggestions.length > 0)) {
      this.show = true;
    }
  }
  resetFormAttrib() {
    this.formAction = this.action;
    this.formMethod = "get";
  }
  updated() {
    if (this.mobileMode === "compact" && this.className === "fullscreen") {
      this.input.focus();
    }
  }
  render() {
    if (this.hasFocus && this.isMobileViewport() && !this.suppressFullscreen) {
      this.className = "fullscreen";
    }
    return $`
      ${this.mobileMode === "compact" && this.className !== "fullscreen" ? this.mobileCompactTemplate() : this.formInputTemplate()}
      ${this.suggestionListTemplate()}
    `;
  }
  formInputTemplate() {
    return $`
      <div class="${this.className === "fullscreen" ? "form__wrapper fullscreen" : "form__wrapper"}">
        <form action="${this.formAction}" method="${this.formMethod}">
          ${this.className === "fullscreen" ? $`
            <button
              class="${this.className === "fullscreen" ? "input__back fullscreen" : "input__back"}"
              type="button"
              @click=${this.handleBackClick}
              tabindex="-1"
            >
              <span class="back-icon"></span>
            </button>
          ` : ""}
          <div class="${this.getHoverWrapperClasses()}">
            <input type="hidden" name="origin" value="${this.origin}" />
            <input
              class="${this.className === "fullscreen" ? "input__control fullscreen" : "input__control"}"
              type="search"
              maxlength="200"
              aria-label="Sucheingabe"
              name="q"
              autocomplete="off"
              placeholder="${this.getPlaceholderText()}"
              .value="${l6(this.displayInput.length > 0 ? this.displayInput : this.userInput)}"
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
              @keydown=${this.handleKeyDown}
            />
            ${this.userInput.length > 0 ? $`
              <button
                class="${this.className === "fullscreen" ? "input__clear fullscreen" : "input__clear"}"
                type="button"
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <span class="clear-icon"></span>
              </button>
            ` : ""}
            <button
              class="${this.className === "fullscreen" ? "input__submit fullscreen" : "input__submit"}"
              type="submit"
              aria-label="Suchschaltfläche"
            >
              <span class="submit-icon"></span>
            </button>
          </div>
        </form>
      </div>
    `;
  }
  mobileCompactTemplate() {
    return $`
    <button class="compact" @click=${this.handleCompactClick}>
      <span class="compact-icon"></span>
    </button>
  `;
  }
  suggestionListTemplate() {
    return $`
      <div
        role="list"
        class="dropdown__positioner"
        @mouseenter=${this.handleDropdownMouseEnter}
        @mouseleave=${this.handleDropdownMouseLeave}
      >
      ${this.suggestions ? $`
        <ul class="menu ${this.show ? "show" : null}">
          ${this.suggestions.map((suggestion, i6) => $`
            <li class="menu-item ${this.selectedMenuIndex === i6 ? "highlight" : null}" @mousemove="${this.mouseOverOnItem(i6)}">
              <a href="${suggestion.url}" class="${suggestion.category ? "has__category" : ""}">
                <span class="image ${suggestion.category ? "has__category" : null}">
                  <img src="data:${suggestion.type};base64,${suggestion.image}" />
                </span>
                ${this.renderOptionalCategoryDetail(suggestion.categoryDetail)}
                <span class="result">
                  <span class="suggest">${this.markInput(suggestion.suggest)}</span>
                  ${suggestion.label ? $`<span class="label">${suggestion.label}</span>` : null}
                </span>
              </a>
            </li>`)}
          <li><span>Suchvorschläge bereitgestellt durch ${this.brandName}</span></li>
        </ul>
      ` : ""}
      </div>
    `;
  }
  renderOptionalCategoryDetail(rawCategoryDetail) {
    if (rawCategoryDetail && rawCategoryDetail.length > 0) {
      try {
        const categoryDetails = rawCategoryDetail.replace("]", "\xB0C").split(";");
        const temperature = categoryDetails[1];
        if (temperature && temperature.length > 0) {
          return $`
            <div class="suggest-temperature">
              <span>${temperature}</span>
            </div>
          `;
        } else {
          return null;
        }
      } catch (e8) {
        if (e8 instanceof Error) {
          console.log(e8.message);
        }
        return null;
      }
    } else {
      return null;
    }
  }
  getHoverWrapperClasses() {
    let classes = "hover__wrapper";
    if (this.className === "fullscreen") {
      classes += " fullscreen";
    } else {
      if (this.show) {
        classes += " border";
      }
    }
    return classes;
  }
  getPlaceholderText() {
    switch (this.lang) {
      case "de":
        return this.isMobileViewport() ? "Suche" : "Suchen mit " + this.brandName;
      case "fr":
        return this.isMobileViewport() ? "Rechercher" : "Recherche avec " + this.brandName;
      case "es":
        return this.isMobileViewport() ? "Buscar" : "Buscar con " + this.brandName;
      default:
        return this.isMobileViewport() ? "Search" : "Search with " + this.brandName;
    }
  }
  mouseOverOnItem(idx) {
    return () => {
      this.selectedMenuIndex = idx;
    };
  }
  async requestSuggestions() {
    this.abortController.abort();
    this.abortController = new AbortController();
    const signal = this.abortController.signal;
    try {
      const response = await fetch(this.getRequestUri(), { signal });
      this.result = await response.json();
    } catch (e8) {
      if (e8 instanceof Error && e8.name === "AbortError") {
        console.log(e8.message);
      }
    }
  }
  getRequestUri() {
    const uri = new URL(this.multiSuggest);
    uri.searchParams.append("q", this.userInput.trim());
    uri.searchParams.append("device", this.getCurrentViewportDevice());
    uri.searchParams.append("origin", this.origin + "_sg");
    uri.searchParams.append("count", "10");
    return uri.toString();
  }
  getCurrentViewportDevice() {
    if (window.innerWidth < tablet) {
      return "mobile";
    } else if (window.innerWidth < desktop) {
      return "tablet";
    } else {
      return "desktop";
    }
  }
  isMobileViewport() {
    return window.innerWidth < tablet;
  }
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  markInput(suggestText) {
    const searchTerm = this.userInput.trim();
    const suggestParts = suggestText.split(new RegExp(this.escapeRegExp(searchTerm), "ig"));
    const mark = $`<span style="font-weight:normal;">${searchTerm}</span>`;
    const retVal = [];
    suggestParts.forEach((s6, i6) => {
      retVal.push($`${s6}`);
      if (i6 < suggestParts.length - 1) {
        retVal.push(mark);
      }
    });
    return retVal;
  }
};
MultiSearch.styles = multisearch_styles_default;
__decorateClass([
  i4(".input__control")
], MultiSearch.prototype, "input", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "action", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "multiSuggest", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "brandName", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "origin", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "mobileMode", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "lang", 2);
__decorateClass([
  e4({ type: Object })
], MultiSearch.prototype, "result", 2);
__decorateClass([
  e4({ type: Array })
], MultiSearch.prototype, "suggestions", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "show", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "selectedMenuIndex", 2);
__decorateClass([
  e4()
], MultiSearch.prototype, "userInput", 2);
__decorateClass([
  t3()
], MultiSearch.prototype, "abortController", 2);
__decorateClass([
  t3()
], MultiSearch.prototype, "displayInput", 2);
__decorateClass([
  t3()
], MultiSearch.prototype, "hasFocus", 2);
__decorateClass([
  t3()
], MultiSearch.prototype, "mouseOver", 2);
__decorateClass([
  t3()
], MultiSearch.prototype, "suppressFullscreen", 2);
__decorateClass([
  t3()
], MultiSearch.prototype, "formAction", 2);
__decorateClass([
  t3()
], MultiSearch.prototype, "formMethod", 2);
MultiSearch = __decorateClass([
  n5("ui-multisearch")
], MultiSearch);
export {
  MultiSearch
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
