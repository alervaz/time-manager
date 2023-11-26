/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, z = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Y = Symbol(), D = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Y)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = D.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && D.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const lt = (n) => new ht(typeof n == "string" ? n : n + "", void 0, Y), at = (n, t) => {
  if (z)
    n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = H.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
    }
}, B = z ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return lt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ct, defineProperty: dt, getOwnPropertyDescriptor: pt, getOwnPropertyNames: $t, getOwnPropertySymbols: ut, getPrototypeOf: _t } = Object, f = globalThis, W = f.trustedTypes, ft = W ? W.emptyScript : "", R = f.reactiveElementPolyfillSupport, b = (n, t) => n, j = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ft : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, tt = (n, t) => !ct(n, t), q = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class y extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && dt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = pt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const a = i == null ? void 0 : i.call(this);
      r.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(b("elementProperties")))
      return;
    const t = _t(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(b("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(b("properties"))) {
      const e = this.properties, s = [...$t(e), ...ut(e)];
      for (const i of s)
        this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [s, i] of e)
          this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s)
        e.unshift(B(i));
    } else
      t !== void 0 && e.push(B(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$Eg = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$ES ?? (this._$ES = [])).push(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) == null || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return at(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e) {
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : j).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : j;
      this._$Em = i, this[i] = a.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? tt)(i ? r : this[t], e))
        return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this._$Ep) {
        for (const [r, o] of this._$Ep)
          this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [r, o] of i)
          o.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.C(r, this[r], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$ES) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
      }), this.update(e)) : this._$ET();
    } catch (i) {
      throw t = !1, this._$ET(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$ET() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EO(e, this[e]))), this._$ET();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[b("elementProperties")] = /* @__PURE__ */ new Map(), y[b("finalized")] = /* @__PURE__ */ new Map(), R == null || R({ ReactiveElement: y }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, N = C.trustedTypes, V = N ? N.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, et = "$lit$", _ = `lit$${(Math.random() + "").slice(9)}$`, st = "?" + _, At = `<${st}>`, g = document, w = () => g.createComment(""), x = (n) => n === null || typeof n != "object" && typeof n != "function", it = Array.isArray, mt = (n) => it(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", k = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, K = />/g, A = RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Z = /'/g, F = /"/g, nt = /^(?:script|style|textarea|title)$/i, gt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), yt = gt(1), v = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), G = /* @__PURE__ */ new WeakMap(), m = g.createTreeWalker(g, 129);
function rt(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return V !== void 0 ? V.createHTML(t) : t;
}
const vt = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : "", o = E;
  for (let a = 0; a < e; a++) {
    const h = n[a];
    let c, p, l = -1, $ = 0;
    for (; $ < h.length && (o.lastIndex = $, p = o.exec(h), p !== null); )
      $ = o.lastIndex, o === E ? p[1] === "!--" ? o = J : p[1] !== void 0 ? o = K : p[2] !== void 0 ? (nt.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = A) : p[3] !== void 0 && (o = A) : o === A ? p[0] === ">" ? (o = i ?? E, l = -1) : p[1] === void 0 ? l = -2 : (l = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? A : p[3] === '"' ? F : Z) : o === F || o === Z ? o = A : o === J || o === K ? o = E : (o = A, i = void 0);
    const u = o === A && n[a + 1].startsWith("/>") ? " " : "";
    r += o === E ? h + At : l >= 0 ? (s.push(c), h.slice(0, l) + et + h.slice(l) + _ + u) : h + _ + (l === -2 ? a : u);
  }
  return [rt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class P {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, h = this.parts, [c, p] = vt(t, e);
    if (this.el = P.createElement(c, s), m.currentNode = this.el.content, e === 2) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = m.nextNode()) !== null && h.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const l of i.getAttributeNames())
            if (l.endsWith(et)) {
              const $ = p[o++], u = i.getAttribute(l).split(_), U = /([.?@])?(.*)/.exec($);
              h.push({ type: 1, index: r, name: U[2], strings: u, ctor: U[1] === "." ? Et : U[1] === "?" ? bt : U[1] === "@" ? Ct : M }), i.removeAttribute(l);
            } else
              l.startsWith(_) && (h.push({ type: 6, index: r }), i.removeAttribute(l));
        if (nt.test(i.tagName)) {
          const l = i.textContent.split(_), $ = l.length - 1;
          if ($ > 0) {
            i.textContent = N ? N.emptyScript : "";
            for (let u = 0; u < $; u++)
              i.append(l[u], w()), m.nextNode(), h.push({ type: 2, index: ++r });
            i.append(l[$], w());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === st)
          h.push({ type: 2, index: r });
        else {
          let l = -1;
          for (; (l = i.data.indexOf(_, l + 1)) !== -1; )
            h.push({ type: 7, index: r }), l += _.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const s = g.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(n, t, e = n, s) {
  var o, a;
  if (t === v)
    return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = x(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = S(n, i._$AS(n, t.values), i, s)), t;
}
class St {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? g).importNode(e, !0);
    m.currentNode = i;
    let r = m.nextNode(), o = 0, a = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let c;
        h.type === 2 ? c = new T(r, r.nextSibling, this, t) : h.type === 1 ? c = new h.ctor(r, h.name, h.strings, this, t) : h.type === 6 && (c = new wt(r, this, t)), this._$AV.push(c), h = s[++a];
      }
      o !== (h == null ? void 0 : h.index) && (r = m.nextNode(), o++);
    }
    return m.currentNode = g, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), x(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== v && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : mt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== d && x(this._$AH) ? this._$AA.nextSibling.data = t : this.$(g.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(rt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i)
      this._$AH.p(e);
    else {
      const o = new St(i, this), a = o.u(this.options);
      o.p(e), this.$(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = G.get(t.strings);
    return e === void 0 && G.set(t.strings, e = new P(t)), e;
  }
  T(t) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t)
      i === e.length ? e.push(s = new T(this.k(w()), this.k(w()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class M {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = S(this, t, e, 0), o = !x(t) || t !== this._$AH && t !== v, o && (this._$AH = t);
    else {
      const a = t;
      let h, c;
      for (t = r[0], h = 0; h < r.length - 1; h++)
        c = S(this, a[s + h], e, h), c === v && (c = this._$AH[h]), o || (o = !x(c) || c !== this._$AH[h]), c === d ? t = d : t !== d && (t += (c ?? "") + r[h + 1]), this._$AH[h] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Et extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class bt extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Ct extends M {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? d) === v)
      return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class wt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const L = C.litHtmlPolyfillSupport;
L == null || L(P, T), (C.litHtmlVersions ?? (C.litHtmlVersions = [])).push("3.0.0");
const xt = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new T(t.insertBefore(w(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class O extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return v;
  }
}
var X;
O._$litElement$ = !0, O.finalized = !0, (X = globalThis.litElementHydrateSupport) == null || X.call(globalThis, { LitElement: O });
const I = globalThis.litElementPolyfillSupport;
I == null || I({ LitElement: O });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.0");
var Pt = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, Ut = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Tt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Pt(t, e, i), i;
};
let Q = class extends HTMLElement {
  swapOnClick(n, t) {
    const e = n.innerText;
    n.addEventListener("click", function() {
      n.innerText == e ? (n.innerText = "Stop", t.disabled = !0, localStorage.setItem("current", e)) : (n.innerText = e, t.disabled = !1, localStorage.removeItem("current"));
    });
  }
  connectedCallback() {
    const n = localStorage.getItem("current"), t = this.querySelector("#consume"), e = this.querySelector("#movement"), s = this.querySelector("#clear");
    this.swapOnClick(t, e), this.swapOnClick(e, t), s.addEventListener("click", function() {
      t.disabled = !1, t.innerText = "Consume", e.disabled = !1, e.innerText = "Movement", localStorage.removeItem("current");
    }), n != null && (n == "Consume" ? (t.innerText = "Stop", e.disabled = !0) : (e.innerText = "Stop", t.disabled = !0));
  }
  render() {
    return yt`
      <slot></slot>
    `;
  }
};
Q = Ut([
  ot("custom-controls")
], Q);
export {
  Q as Controls
};
