function ul(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
function cl(e) {
  if (Re(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = dt(r) ? qv(r) : cl(r);
      if (o)
        for (const a in o)
          t[a] = o[a];
    }
    return t;
  } else {
    if (dt(e))
      return e;
    if (ot(e))
      return e;
  }
}
const Bv = /;(?![^(]*\))/g, Wv = /:([^]+)/, Uv = /\/\*.*?\*\//gs;
function qv(e) {
  const t = {};
  return e.replace(Uv, "").split(Bv).forEach((n) => {
    if (n) {
      const r = n.split(Wv);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function fl(e) {
  let t = "";
  if (dt(e))
    t = e;
  else if (Re(e))
    for (let n = 0; n < e.length; n++) {
      const r = fl(e[n]);
      r && (t += r + " ");
    }
  else if (ot(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const zv = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Yv = /* @__PURE__ */ ul(zv);
function id(e) {
  return !!e || e === "";
}
const Qe = {}, Br = [], un = () => {
}, Xv = () => !1, Vv = /^on[^a-z]/, Zo = (e) => Vv.test(e), dl = (e) => e.startsWith("onUpdate:"), gt = Object.assign, pl = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Kv = Object.prototype.hasOwnProperty, We = (e, t) => Kv.call(e, t), Re = Array.isArray, Ai = (e) => ea(e) === "[object Map]", Gv = (e) => ea(e) === "[object Set]", je = (e) => typeof e == "function", dt = (e) => typeof e == "string", hl = (e) => typeof e == "symbol", ot = (e) => e !== null && typeof e == "object", od = (e) => ot(e) && je(e.then) && je(e.catch), Jv = Object.prototype.toString, ea = (e) => Jv.call(e), Qv = (e) => ea(e).slice(8, -1), Zv = (e) => ea(e) === "[object Object]", vl = (e) => dt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, No = /* @__PURE__ */ ul(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ta = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, eg = /-(\w)/g, Yr = ta((e) => e.replace(eg, (t, n) => n ? n.toUpperCase() : "")), tg = /\B([A-Z])/g, ti = ta((e) => e.replace(tg, "-$1").toLowerCase()), ad = ta((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ha = ta((e) => e ? `on${ad(e)}` : ""), Mi = (e, t) => !Object.is(e, t), Ba = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Fo = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, gl = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Hu;
const ng = () => Hu || (Hu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let pn;
class rg {
  constructor(t = !1) {
    this.detached = t, this.active = !0, this.effects = [], this.cleanups = [], this.parent = pn, !t && pn && (this.index = (pn.scopes || (pn.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = pn;
      try {
        return pn = this, t();
      } finally {
        pn = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    pn = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    pn = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this.active = !1;
    }
  }
}
function ig(e, t = pn) {
  t && t.active && t.effects.push(e);
}
const ml = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, sd = (e) => (e.w & Zn) > 0, ld = (e) => (e.n & Zn) > 0, og = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Zn;
}, ag = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      sd(o) && !ld(o) ? o.delete(e) : t[n++] = o, o.w &= ~Zn, o.n &= ~Zn;
    }
    t.length = n;
  }
}, As = /* @__PURE__ */ new WeakMap();
let Si = 0, Zn = 1;
const Ps = 30;
let sn;
const Cr = Symbol(""), Ns = Symbol("");
class yl {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, ig(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = sn, n = Jn;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = sn, sn = this, Jn = !0, Zn = 1 << ++Si, Si <= Ps ? og(this) : Bu(this), this.fn();
    } finally {
      Si <= Ps && ag(this), Zn = 1 << --Si, sn = this.parent, Jn = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    sn === this ? this.deferStop = !0 : this.active && (Bu(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Bu(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Jn = !0;
const ud = [];
function ni() {
  ud.push(Jn), Jn = !1;
}
function ri() {
  const e = ud.pop();
  Jn = e === void 0 ? !0 : e;
}
function qt(e, t, n) {
  if (Jn && sn) {
    let r = As.get(e);
    r || As.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = ml()), cd(o);
  }
}
function cd(e, t) {
  let n = !1;
  Si <= Ps ? ld(e) || (e.n |= Zn, n = !sd(e)) : n = !e.has(sn), n && (e.add(sn), sn.deps.push(e));
}
function Rn(e, t, n, r, o, a) {
  const c = As.get(e);
  if (!c)
    return;
  let d = [];
  if (t === "clear")
    d = [...c.values()];
  else if (n === "length" && Re(e)) {
    const p = gl(r);
    c.forEach((g, y) => {
      (y === "length" || y >= p) && d.push(g);
    });
  } else
    switch (n !== void 0 && d.push(c.get(n)), t) {
      case "add":
        Re(e) ? vl(n) && d.push(c.get("length")) : (d.push(c.get(Cr)), Ai(e) && d.push(c.get(Ns)));
        break;
      case "delete":
        Re(e) || (d.push(c.get(Cr)), Ai(e) && d.push(c.get(Ns)));
        break;
      case "set":
        Ai(e) && d.push(c.get(Cr));
        break;
    }
  if (d.length === 1)
    d[0] && ks(d[0]);
  else {
    const p = [];
    for (const g of d)
      g && p.push(...g);
    ks(ml(p));
  }
}
function ks(e, t) {
  const n = Re(e) ? e : [...e];
  for (const r of n)
    r.computed && Wu(r);
  for (const r of n)
    r.computed || Wu(r);
}
function Wu(e, t) {
  (e !== sn || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const sg = /* @__PURE__ */ ul("__proto__,__v_isRef,__isVue"), fd = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(hl)
), lg = /* @__PURE__ */ bl(), ug = /* @__PURE__ */ bl(!1, !0), cg = /* @__PURE__ */ bl(!0), Uu = /* @__PURE__ */ fg();
function fg() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = qe(this);
      for (let a = 0, c = this.length; a < c; a++)
        qt(r, "get", a + "");
      const o = r[t](...n);
      return o === -1 || o === !1 ? r[t](...n.map(qe)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ni();
      const r = qe(this)[t].apply(this, n);
      return ri(), r;
    };
  }), e;
}
function bl(e = !1, t = !1) {
  return function(r, o, a) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && a === (e ? t ? _g : gd : t ? vd : hd).get(r))
      return r;
    const c = Re(r);
    if (!e && c && We(Uu, o))
      return Reflect.get(Uu, o, a);
    const d = Reflect.get(r, o, a);
    return (hl(o) ? fd.has(o) : sg(o)) || (e || qt(r, "get", o), t) ? d : Et(d) ? c && vl(o) ? d : d.value : ot(d) ? e ? md(d) : cn(d) : d;
  };
}
const dg = /* @__PURE__ */ dd(), pg = /* @__PURE__ */ dd(!0);
function dd(e = !1) {
  return function(n, r, o, a) {
    let c = n[r];
    if (Xr(c) && Et(c) && !Et(o))
      return !1;
    if (!e && (!Ho(o) && !Xr(o) && (c = qe(c), o = qe(o)), !Re(n) && Et(c) && !Et(o)))
      return c.value = o, !0;
    const d = Re(n) && vl(r) ? Number(r) < n.length : We(n, r), p = Reflect.set(n, r, o, a);
    return n === qe(a) && (d ? Mi(o, c) && Rn(n, "set", r, o) : Rn(n, "add", r, o)), p;
  };
}
function hg(e, t) {
  const n = We(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Rn(e, "delete", t, void 0), r;
}
function vg(e, t) {
  const n = Reflect.has(e, t);
  return (!hl(t) || !fd.has(t)) && qt(e, "has", t), n;
}
function gg(e) {
  return qt(e, "iterate", Re(e) ? "length" : Cr), Reflect.ownKeys(e);
}
const pd = {
  get: lg,
  set: dg,
  deleteProperty: hg,
  has: vg,
  ownKeys: gg
}, mg = {
  get: cg,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, yg = /* @__PURE__ */ gt({}, pd, {
  get: ug,
  set: pg
}), Cl = (e) => e, na = (e) => Reflect.getPrototypeOf(e);
function po(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = qe(e), a = qe(t);
  n || (t !== a && qt(o, "get", t), qt(o, "get", a));
  const { has: c } = na(o), d = r ? Cl : n ? Tl : Ii;
  if (c.call(o, t))
    return d(e.get(t));
  if (c.call(o, a))
    return d(e.get(a));
  e !== o && e.get(t);
}
function ho(e, t = !1) {
  const n = this.__v_raw, r = qe(n), o = qe(e);
  return t || (e !== o && qt(r, "has", e), qt(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function vo(e, t = !1) {
  return e = e.__v_raw, !t && qt(qe(e), "iterate", Cr), Reflect.get(e, "size", e);
}
function qu(e) {
  e = qe(e);
  const t = qe(this);
  return na(t).has.call(t, e) || (t.add(e), Rn(t, "add", e, e)), this;
}
function zu(e, t) {
  t = qe(t);
  const n = qe(this), { has: r, get: o } = na(n);
  let a = r.call(n, e);
  a || (e = qe(e), a = r.call(n, e));
  const c = o.call(n, e);
  return n.set(e, t), a ? Mi(t, c) && Rn(n, "set", e, t) : Rn(n, "add", e, t), this;
}
function Yu(e) {
  const t = qe(this), { has: n, get: r } = na(t);
  let o = n.call(t, e);
  o || (e = qe(e), o = n.call(t, e)), r && r.call(t, e);
  const a = t.delete(e);
  return o && Rn(t, "delete", e, void 0), a;
}
function Xu() {
  const e = qe(this), t = e.size !== 0, n = e.clear();
  return t && Rn(e, "clear", void 0, void 0), n;
}
function go(e, t) {
  return function(r, o) {
    const a = this, c = a.__v_raw, d = qe(c), p = t ? Cl : e ? Tl : Ii;
    return !e && qt(d, "iterate", Cr), c.forEach((g, y) => r.call(o, p(g), p(y), a));
  };
}
function mo(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, a = qe(o), c = Ai(a), d = e === "entries" || e === Symbol.iterator && c, p = e === "keys" && c, g = o[e](...r), y = n ? Cl : t ? Tl : Ii;
    return !t && qt(a, "iterate", p ? Ns : Cr), {
      // iterator protocol
      next() {
        const { value: C, done: b } = g.next();
        return b ? { value: C, done: b } : {
          value: d ? [y(C[0]), y(C[1])] : y(C),
          done: b
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Un(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function bg() {
  const e = {
    get(a) {
      return po(this, a);
    },
    get size() {
      return vo(this);
    },
    has: ho,
    add: qu,
    set: zu,
    delete: Yu,
    clear: Xu,
    forEach: go(!1, !1)
  }, t = {
    get(a) {
      return po(this, a, !1, !0);
    },
    get size() {
      return vo(this);
    },
    has: ho,
    add: qu,
    set: zu,
    delete: Yu,
    clear: Xu,
    forEach: go(!1, !0)
  }, n = {
    get(a) {
      return po(this, a, !0);
    },
    get size() {
      return vo(this, !0);
    },
    has(a) {
      return ho.call(this, a, !0);
    },
    add: Un(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Un(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Un(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Un(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: go(!0, !1)
  }, r = {
    get(a) {
      return po(this, a, !0, !0);
    },
    get size() {
      return vo(this, !0);
    },
    has(a) {
      return ho.call(this, a, !0);
    },
    add: Un(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Un(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Un(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Un(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: go(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
    e[a] = mo(a, !1, !1), n[a] = mo(a, !0, !1), t[a] = mo(a, !1, !0), r[a] = mo(a, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
const [Cg, xg, wg, Tg] = /* @__PURE__ */ bg();
function xl(e, t) {
  const n = t ? e ? Tg : wg : e ? xg : Cg;
  return (r, o, a) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(We(n, o) && o in r ? n : r, o, a);
}
const Eg = {
  get: /* @__PURE__ */ xl(!1, !1)
}, Sg = {
  get: /* @__PURE__ */ xl(!1, !0)
}, Og = {
  get: /* @__PURE__ */ xl(!0, !1)
}, hd = /* @__PURE__ */ new WeakMap(), vd = /* @__PURE__ */ new WeakMap(), gd = /* @__PURE__ */ new WeakMap(), _g = /* @__PURE__ */ new WeakMap();
function Ag(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Pg(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ag(Qv(e));
}
function cn(e) {
  return Xr(e) ? e : wl(e, !1, pd, Eg, hd);
}
function Ng(e) {
  return wl(e, !1, yg, Sg, vd);
}
function md(e) {
  return wl(e, !0, mg, Og, gd);
}
function wl(e, t, n, r, o) {
  if (!ot(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = o.get(e);
  if (a)
    return a;
  const c = Pg(e);
  if (c === 0)
    return e;
  const d = new Proxy(e, c === 2 ? r : n);
  return o.set(e, d), d;
}
function Wr(e) {
  return Xr(e) ? Wr(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Xr(e) {
  return !!(e && e.__v_isReadonly);
}
function Ho(e) {
  return !!(e && e.__v_isShallow);
}
function yd(e) {
  return Wr(e) || Xr(e);
}
function qe(e) {
  const t = e && e.__v_raw;
  return t ? qe(t) : e;
}
function bd(e) {
  return Fo(e, "__v_skip", !0), e;
}
const Ii = (e) => ot(e) ? cn(e) : e, Tl = (e) => ot(e) ? md(e) : e;
function Cd(e) {
  Jn && sn && (e = qe(e), cd(e.dep || (e.dep = ml())));
}
function xd(e, t) {
  e = qe(e), e.dep && ks(e.dep);
}
function Et(e) {
  return !!(e && e.__v_isRef === !0);
}
function Fe(e) {
  return kg(e, !1);
}
function kg(e, t) {
  return Et(e) ? e : new Lg(e, t);
}
class Lg {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : qe(t), this._value = n ? t : Ii(t);
  }
  get value() {
    return Cd(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Ho(t) || Xr(t);
    t = n ? t : qe(t), Mi(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Ii(t), xd(this));
  }
}
function ji(e) {
  return Et(e) ? e.value : e;
}
const Rg = {
  get: (e, t, n) => ji(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return Et(o) && !Et(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function wd(e) {
  return Wr(e) ? e : new Proxy(e, Rg);
}
var Td;
class Mg {
  constructor(t, n, r, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Td] = !1, this._dirty = !0, this.effect = new yl(t, () => {
      this._dirty || (this._dirty = !0, xd(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
  }
  get value() {
    const t = qe(this);
    return Cd(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Td = "__v_isReadonly";
function Ig(e, t, n = !1) {
  let r, o;
  const a = je(e);
  return a ? (r = e, o = un) : (r = e.get, o = e.set), new Mg(r, o, a || !o, n);
}
function Qn(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (a) {
    ra(a, t, n);
  }
  return o;
}
function Jt(e, t, n, r) {
  if (je(e)) {
    const a = Qn(e, t, n, r);
    return a && od(a) && a.catch((c) => {
      ra(c, t, n);
    }), a;
  }
  const o = [];
  for (let a = 0; a < e.length; a++)
    o.push(Jt(e[a], t, n, r));
  return o;
}
function ra(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let a = t.parent;
    const c = t.proxy, d = n;
    for (; a; ) {
      const g = a.ec;
      if (g) {
        for (let y = 0; y < g.length; y++)
          if (g[y](e, c, d) === !1)
            return;
      }
      a = a.parent;
    }
    const p = t.appContext.config.errorHandler;
    if (p) {
      Qn(p, null, 10, [e, c, d]);
      return;
    }
  }
  jg(e, n, o, r);
}
function jg(e, t, n, r = !0) {
  console.error(e);
}
let Di = !1, Ls = !1;
const Tt = [];
let gn = 0;
const Ur = [];
let Nn = null, hr = 0;
const Ed = /* @__PURE__ */ Promise.resolve();
let El = null;
function jn(e) {
  const t = El || Ed;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Dg(e) {
  let t = gn + 1, n = Tt.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    $i(Tt[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function Sl(e) {
  (!Tt.length || !Tt.includes(e, Di && e.allowRecurse ? gn + 1 : gn)) && (e.id == null ? Tt.push(e) : Tt.splice(Dg(e.id), 0, e), Sd());
}
function Sd() {
  !Di && !Ls && (Ls = !0, El = Ed.then(_d));
}
function $g(e) {
  const t = Tt.indexOf(e);
  t > gn && Tt.splice(t, 1);
}
function Fg(e) {
  Re(e) ? Ur.push(...e) : (!Nn || !Nn.includes(e, e.allowRecurse ? hr + 1 : hr)) && Ur.push(e), Sd();
}
function Vu(e, t = Di ? gn + 1 : 0) {
  for (; t < Tt.length; t++) {
    const n = Tt[t];
    n && n.pre && (Tt.splice(t, 1), t--, n());
  }
}
function Od(e) {
  if (Ur.length) {
    const t = [...new Set(Ur)];
    if (Ur.length = 0, Nn) {
      Nn.push(...t);
      return;
    }
    for (Nn = t, Nn.sort((n, r) => $i(n) - $i(r)), hr = 0; hr < Nn.length; hr++)
      Nn[hr]();
    Nn = null, hr = 0;
  }
}
const $i = (e) => e.id == null ? 1 / 0 : e.id, Hg = (e, t) => {
  const n = $i(e) - $i(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function _d(e) {
  Ls = !1, Di = !0, Tt.sort(Hg);
  const t = un;
  try {
    for (gn = 0; gn < Tt.length; gn++) {
      const n = Tt[gn];
      n && n.active !== !1 && Qn(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    gn = 0, Tt.length = 0, Od(), Di = !1, El = null, (Tt.length || Ur.length) && _d();
  }
}
function Bg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || Qe;
  let o = n;
  const a = t.startsWith("update:"), c = a && t.slice(7);
  if (c && c in r) {
    const y = `${c === "modelValue" ? "model" : c}Modifiers`, { number: C, trim: b } = r[y] || Qe;
    b && (o = n.map((E) => dt(E) ? E.trim() : E)), C && (o = n.map(gl));
  }
  let d, p = r[d = Ha(t)] || // also try camelCase event handler (#2249)
  r[d = Ha(Yr(t))];
  !p && a && (p = r[d = Ha(ti(t))]), p && Jt(p, e, 6, o);
  const g = r[d + "Once"];
  if (g) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[d])
      return;
    e.emitted[d] = !0, Jt(g, e, 6, o);
  }
}
function Ad(e, t, n = !1) {
  const r = t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const a = e.emits;
  let c = {}, d = !1;
  if (!je(e)) {
    const p = (g) => {
      const y = Ad(g, t, !0);
      y && (d = !0, gt(c, y));
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  return !a && !d ? (ot(e) && r.set(e, null), null) : (Re(a) ? a.forEach((p) => c[p] = null) : gt(c, a), ot(e) && r.set(e, c), c);
}
function ia(e, t) {
  return !e || !Zo(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), We(e, t[0].toLowerCase() + t.slice(1)) || We(e, ti(t)) || We(e, t));
}
let Gt = null, Pd = null;
function Bo(e) {
  const t = Gt;
  return Gt = e, Pd = e && e.type.__scopeId || null, t;
}
function Wg(e, t = Gt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && ic(-1);
    const a = Bo(t);
    let c;
    try {
      c = e(...o);
    } finally {
      Bo(a), r._d && ic(1);
    }
    return c;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Wa(e) {
  const { type: t, vnode: n, proxy: r, withProxy: o, props: a, propsOptions: [c], slots: d, attrs: p, emit: g, render: y, renderCache: C, data: b, setupState: E, ctx: w, inheritAttrs: A } = e;
  let D, N;
  const I = Bo(e);
  try {
    if (n.shapeFlag & 4) {
      const J = o || r;
      D = vn(y.call(J, J, C, a, E, b, w)), N = p;
    } else {
      const J = t;
      D = vn(J.length > 1 ? J(a, { attrs: p, slots: d, emit: g }) : J(
        a,
        null
        /* we know it doesn't need it */
      )), N = t.props ? p : Ug(p);
    }
  } catch (J) {
    ki.length = 0, ra(
      J,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), D = L(yn);
  }
  let F = D;
  if (N && A !== !1) {
    const J = Object.keys(N), { shapeFlag: B } = F;
    J.length && B & 7 && (c && J.some(dl) && (N = qg(N, c)), F = bn(F, N));
  }
  return n.dirs && (F = bn(F), F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs), n.transition && (F.transition = n.transition), D = F, Bo(I), D;
}
const Ug = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Zo(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, qg = (e, t) => {
  const n = {};
  for (const r in e)
    (!dl(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function zg(e, t, n) {
  const { props: r, children: o, component: a } = e, { props: c, children: d, patchFlag: p } = t, g = a.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && p >= 0) {
    if (p & 1024)
      return !0;
    if (p & 16)
      return r ? Ku(r, c, g) : !!c;
    if (p & 8) {
      const y = t.dynamicProps;
      for (let C = 0; C < y.length; C++) {
        const b = y[C];
        if (c[b] !== r[b] && !ia(g, b))
          return !0;
      }
    }
  } else
    return (o || d) && (!d || !d.$stable) ? !0 : r === c ? !1 : r ? c ? Ku(r, c, g) : !0 : !!c;
  return !1;
}
function Ku(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    if (t[a] !== e[a] && !ia(n, a))
      return !0;
  }
  return !1;
}
function Yg({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Xg = (e) => e.__isSuspense;
function Vg(e, t) {
  t && t.pendingBranch ? Re(e) ? t.effects.push(...e) : t.effects.push(e) : Fg(e);
}
function Xi(e, t) {
  if (yt) {
    let n = yt.provides;
    const r = yt.parent && yt.parent.provides;
    r === n && (n = yt.provides = Object.create(r)), n[e] = t;
  }
}
function kn(e, t, n = !1) {
  const r = yt || Gt;
  if (r) {
    const o = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && je(t) ? t.call(r.proxy) : t;
  }
}
function Vi(e, t) {
  return Ol(e, null, t);
}
const yo = {};
function Ut(e, t, n) {
  return Ol(e, t, n);
}
function Ol(e, t, { immediate: n, deep: r, flush: o, onTrack: a, onTrigger: c } = Qe) {
  const d = yt;
  let p, g = !1, y = !1;
  if (Et(e) ? (p = () => e.value, g = Ho(e)) : Wr(e) ? (p = () => e, r = !0) : Re(e) ? (y = !0, g = e.some((F) => Wr(F) || Ho(F)), p = () => e.map((F) => {
    if (Et(F))
      return F.value;
    if (Wr(F))
      return yr(F);
    if (je(F))
      return Qn(
        F,
        d,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : je(e) ? t ? p = () => Qn(
    e,
    d,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : p = () => {
    if (!(d && d.isUnmounted))
      return C && C(), Jt(e, d, 3, [b]);
  } : p = un, t && r) {
    const F = p;
    p = () => yr(F());
  }
  let C, b = (F) => {
    C = N.onStop = () => {
      Qn(
        F,
        d,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, E;
  if (Wi)
    if (b = un, t ? n && Jt(t, d, 3, [
      p(),
      y ? [] : void 0,
      b
    ]) : p(), o === "sync") {
      const F = Hm();
      E = F.__watcherHandles || (F.__watcherHandles = []);
    } else
      return un;
  let w = y ? new Array(e.length).fill(yo) : yo;
  const A = () => {
    if (N.active)
      if (t) {
        const F = N.run();
        (r || g || (y ? F.some((J, B) => Mi(J, w[B])) : Mi(F, w))) && (C && C(), Jt(t, d, 3, [
          F,
          // pass undefined as the old value when it's changed for the first time
          w === yo ? void 0 : y && w[0] === yo ? [] : w,
          b
        ]), w = F);
      } else
        N.run();
  };
  A.allowRecurse = !!t;
  let D;
  o === "sync" ? D = A : o === "post" ? D = () => Lt(A, d && d.suspense) : (A.pre = !0, d && (A.id = d.uid), D = () => Sl(A));
  const N = new yl(p, D);
  t ? n ? A() : w = N.run() : o === "post" ? Lt(N.run.bind(N), d && d.suspense) : N.run();
  const I = () => {
    N.stop(), d && d.scope && pl(d.scope.effects, N);
  };
  return E && E.push(I), I;
}
function Kg(e, t, n) {
  const r = this.proxy, o = dt(e) ? e.includes(".") ? Nd(r, e) : () => r[e] : e.bind(r, r);
  let a;
  je(t) ? a = t : (a = t.handler, n = t);
  const c = yt;
  Vr(this);
  const d = Ol(o, a.bind(r), n);
  return c ? Vr(c) : xr(), d;
}
function Nd(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function yr(e, t) {
  if (!ot(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Et(e))
    yr(e.value, t);
  else if (Re(e))
    for (let n = 0; n < e.length; n++)
      yr(e[n], t);
  else if (Gv(e) || Ai(e))
    e.forEach((n) => {
      yr(n, t);
    });
  else if (Zv(e))
    for (const n in e)
      yr(e[n], t);
  return e;
}
function kd() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Zt(() => {
    e.isMounted = !0;
  }), $n(() => {
    e.isUnmounting = !0;
  }), e;
}
const Vt = [Function, Array], Gg = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: Vt,
    onEnter: Vt,
    onAfterEnter: Vt,
    onEnterCancelled: Vt,
    // leave
    onBeforeLeave: Vt,
    onLeave: Vt,
    onAfterLeave: Vt,
    onLeaveCancelled: Vt,
    // appear
    onBeforeAppear: Vt,
    onAppear: Vt,
    onAfterAppear: Vt,
    onAppearCancelled: Vt
  },
  setup(e, { slots: t }) {
    const n = la(), r = kd();
    let o;
    return () => {
      const a = t.default && _l(t.default(), !0);
      if (!a || !a.length)
        return;
      let c = a[0];
      if (a.length > 1) {
        for (const A of a)
          if (A.type !== yn) {
            c = A;
            break;
          }
      }
      const d = qe(e), { mode: p } = d;
      if (r.isLeaving)
        return Ua(c);
      const g = Gu(c);
      if (!g)
        return Ua(c);
      const y = Fi(g, d, r, n);
      Hi(g, y);
      const C = n.subTree, b = C && Gu(C);
      let E = !1;
      const { getTransitionKey: w } = g.type;
      if (w) {
        const A = w();
        o === void 0 ? o = A : A !== o && (o = A, E = !0);
      }
      if (b && b.type !== yn && (!vr(g, b) || E)) {
        const A = Fi(b, d, r, n);
        if (Hi(b, A), p === "out-in")
          return r.isLeaving = !0, A.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && n.update();
          }, Ua(c);
        p === "in-out" && g.type !== yn && (A.delayLeave = (D, N, I) => {
          const F = Rd(r, b);
          F[String(b.key)] = b, D._leaveCb = () => {
            N(), D._leaveCb = void 0, delete y.delayedLeave;
          }, y.delayedLeave = I;
        });
      }
      return c;
    };
  }
}, Ld = Gg;
function Rd(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Fi(e, t, n, r) {
  const { appear: o, mode: a, persisted: c = !1, onBeforeEnter: d, onEnter: p, onAfterEnter: g, onEnterCancelled: y, onBeforeLeave: C, onLeave: b, onAfterLeave: E, onLeaveCancelled: w, onBeforeAppear: A, onAppear: D, onAfterAppear: N, onAppearCancelled: I } = t, F = String(e.key), J = Rd(n, e), B = (X, oe) => {
    X && Jt(X, r, 9, oe);
  }, u = (X, oe) => {
    const fe = oe[1];
    B(X, oe), Re(X) ? X.every((we) => we.length <= 1) && fe() : X.length <= 1 && fe();
  }, Y = {
    mode: a,
    persisted: c,
    beforeEnter(X) {
      let oe = d;
      if (!n.isMounted)
        if (o)
          oe = A || d;
        else
          return;
      X._leaveCb && X._leaveCb(
        !0
        /* cancelled */
      );
      const fe = J[F];
      fe && vr(e, fe) && fe.el._leaveCb && fe.el._leaveCb(), B(oe, [X]);
    },
    enter(X) {
      let oe = p, fe = g, we = y;
      if (!n.isMounted)
        if (o)
          oe = D || p, fe = N || g, we = I || y;
        else
          return;
      let Q = !1;
      const pe = X._enterCb = (Ie) => {
        Q || (Q = !0, Ie ? B(we, [X]) : B(fe, [X]), Y.delayedLeave && Y.delayedLeave(), X._enterCb = void 0);
      };
      oe ? u(oe, [X, pe]) : pe();
    },
    leave(X, oe) {
      const fe = String(e.key);
      if (X._enterCb && X._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return oe();
      B(C, [X]);
      let we = !1;
      const Q = X._leaveCb = (pe) => {
        we || (we = !0, oe(), pe ? B(w, [X]) : B(E, [X]), X._leaveCb = void 0, J[fe] === e && delete J[fe]);
      };
      J[fe] = e, b ? u(b, [X, Q]) : Q();
    },
    clone(X) {
      return Fi(X, t, n, r);
    }
  };
  return Y;
}
function Ua(e) {
  if (oa(e))
    return e = bn(e), e.children = null, e;
}
function Gu(e) {
  return oa(e) ? e.children ? e.children[0] : void 0 : e;
}
function Hi(e, t) {
  e.shapeFlag & 6 && e.component ? Hi(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function _l(e, t = !1, n) {
  let r = [], o = 0;
  for (let a = 0; a < e.length; a++) {
    let c = e[a];
    const d = n == null ? c.key : String(n) + String(c.key != null ? c.key : a);
    c.type === ft ? (c.patchFlag & 128 && o++, r = r.concat(_l(c.children, t, d))) : (t || c.type !== yn) && r.push(d != null ? bn(c, { key: d }) : c);
  }
  if (o > 1)
    for (let a = 0; a < r.length; a++)
      r[a].patchFlag = -2;
  return r;
}
function Ze(e) {
  return je(e) ? { setup: e, name: e.name } : e;
}
const ko = (e) => !!e.type.__asyncLoader, oa = (e) => e.type.__isKeepAlive;
function Jg(e, t) {
  Md(e, "a", t);
}
function Qg(e, t) {
  Md(e, "da", t);
}
function Md(e, t, n = yt) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (aa(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      oa(o.parent.vnode) && Zg(r, t, n, o), o = o.parent;
  }
}
function Zg(e, t, n, r) {
  const o = aa(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Al(() => {
    pl(r[t], o);
  }, n);
}
function aa(e, t, n = yt, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), a = t.__weh || (t.__weh = (...c) => {
      if (n.isUnmounted)
        return;
      ni(), Vr(n);
      const d = Jt(t, n, e, c);
      return xr(), ri(), d;
    });
    return r ? o.unshift(a) : o.push(a), a;
  }
}
const Dn = (e) => (t, n = yt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Wi || e === "sp") && aa(e, (...r) => t(...r), n)
), Id = Dn(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), Zt = Dn(
  "m"
  /* LifecycleHooks.MOUNTED */
), em = Dn(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), Ki = Dn(
  "u"
  /* LifecycleHooks.UPDATED */
), $n = Dn(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), Al = Dn(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), tm = Dn(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), nm = Dn(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), rm = Dn(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function im(e, t = yt) {
  aa("ec", e, t);
}
function jd(e, t) {
  const n = Gt;
  if (n === null)
    return e;
  const r = ua(n) || n.proxy, o = e.dirs || (e.dirs = []);
  for (let a = 0; a < t.length; a++) {
    let [c, d, p, g = Qe] = t[a];
    c && (je(c) && (c = {
      mounted: c,
      updated: c
    }), c.deep && yr(d), o.push({
      dir: c,
      instance: r,
      value: d,
      oldValue: void 0,
      arg: p,
      modifiers: g
    }));
  }
  return e;
}
function cr(e, t, n, r) {
  const o = e.dirs, a = t && t.dirs;
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    a && (d.oldValue = a[c].value);
    let p = d.dir[r];
    p && (ni(), Jt(p, n, 8, [
      e.el,
      d,
      e,
      t
    ]), ri());
  }
}
const om = Symbol();
function am(e, t, n, r) {
  let o;
  const a = n && n[r];
  if (Re(e) || dt(e)) {
    o = new Array(e.length);
    for (let c = 0, d = e.length; c < d; c++)
      o[c] = t(e[c], c, void 0, a && a[c]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let c = 0; c < e; c++)
      o[c] = t(c + 1, c, void 0, a && a[c]);
  } else if (ot(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (c, d) => t(c, d, void 0, a && a[d]));
    else {
      const c = Object.keys(e);
      o = new Array(c.length);
      for (let d = 0, p = c.length; d < p; d++) {
        const g = c[d];
        o[d] = t(e[g], g, d, a && a[d]);
      }
    }
  else
    o = [];
  return n && (n[r] = o), o;
}
const Rs = (e) => e ? Kd(e) ? ua(e) || e.proxy : Rs(e.parent) : null, Pi = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ gt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Rs(e.parent),
    $root: (e) => Rs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Pl(e),
    $forceUpdate: (e) => e.f || (e.f = () => Sl(e.update)),
    $nextTick: (e) => e.n || (e.n = jn.bind(e.proxy)),
    $watch: (e) => Kg.bind(e)
  })
), qa = (e, t) => e !== Qe && !e.__isScriptSetup && We(e, t), sm = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: o, props: a, accessCache: c, type: d, appContext: p } = e;
    let g;
    if (t[0] !== "$") {
      const E = c[t];
      if (E !== void 0)
        switch (E) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return a[t];
        }
      else {
        if (qa(r, t))
          return c[t] = 1, r[t];
        if (o !== Qe && We(o, t))
          return c[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (g = e.propsOptions[0]) && We(g, t)
        )
          return c[t] = 3, a[t];
        if (n !== Qe && We(n, t))
          return c[t] = 4, n[t];
        Ms && (c[t] = 0);
      }
    }
    const y = Pi[t];
    let C, b;
    if (y)
      return t === "$attrs" && qt(e, "get", t), y(e);
    if (
      // css module (injected by vue-loader)
      (C = d.__cssModules) && (C = C[t])
    )
      return C;
    if (n !== Qe && We(n, t))
      return c[t] = 4, n[t];
    if (
      // global properties
      b = p.config.globalProperties, We(b, t)
    )
      return b[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: a } = e;
    return qa(o, t) ? (o[t] = n, !0) : r !== Qe && We(r, t) ? (r[t] = n, !0) : We(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: a } }, c) {
    let d;
    return !!n[c] || e !== Qe && We(e, c) || qa(t, c) || (d = a[0]) && We(d, c) || We(r, c) || We(Pi, c) || We(o.config.globalProperties, c);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : We(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let Ms = !0;
function lm(e) {
  const t = Pl(e), n = e.proxy, r = e.ctx;
  Ms = !1, t.beforeCreate && Ju(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: o,
    computed: a,
    methods: c,
    watch: d,
    provide: p,
    inject: g,
    // lifecycle
    created: y,
    beforeMount: C,
    mounted: b,
    beforeUpdate: E,
    updated: w,
    activated: A,
    deactivated: D,
    beforeDestroy: N,
    beforeUnmount: I,
    destroyed: F,
    unmounted: J,
    render: B,
    renderTracked: u,
    renderTriggered: Y,
    errorCaptured: X,
    serverPrefetch: oe,
    // public API
    expose: fe,
    inheritAttrs: we,
    // assets
    components: Q,
    directives: pe,
    filters: Ie
  } = t;
  if (g && um(g, r, null, e.appContext.config.unwrapInjectedRef), c)
    for (const K in c) {
      const se = c[K];
      je(se) && (r[K] = se.bind(n));
    }
  if (o) {
    const K = o.call(n, n);
    ot(K) && (e.data = cn(K));
  }
  if (Ms = !0, a)
    for (const K in a) {
      const se = a[K], me = je(se) ? se.bind(n, n) : je(se.get) ? se.get.bind(n, n) : un, ve = !je(se) && je(se.set) ? se.set.bind(n) : un, Ee = Me({
        get: me,
        set: ve
      });
      Object.defineProperty(r, K, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: ($e) => Ee.value = $e
      });
    }
  if (d)
    for (const K in d)
      Dd(d[K], r, n, K);
  if (p) {
    const K = je(p) ? p.call(n) : p;
    Reflect.ownKeys(K).forEach((se) => {
      Xi(se, K[se]);
    });
  }
  y && Ju(
    y,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function U(K, se) {
    Re(se) ? se.forEach((me) => K(me.bind(n))) : se && K(se.bind(n));
  }
  if (U(Id, C), U(Zt, b), U(em, E), U(Ki, w), U(Jg, A), U(Qg, D), U(im, X), U(rm, u), U(nm, Y), U($n, I), U(Al, J), U(tm, oe), Re(fe))
    if (fe.length) {
      const K = e.exposed || (e.exposed = {});
      fe.forEach((se) => {
        Object.defineProperty(K, se, {
          get: () => n[se],
          set: (me) => n[se] = me
        });
      });
    } else
      e.exposed || (e.exposed = {});
  B && e.render === un && (e.render = B), we != null && (e.inheritAttrs = we), Q && (e.components = Q), pe && (e.directives = pe);
}
function um(e, t, n = un, r = !1) {
  Re(e) && (e = Is(e));
  for (const o in e) {
    const a = e[o];
    let c;
    ot(a) ? "default" in a ? c = kn(
      a.from || o,
      a.default,
      !0
      /* treat default function as factory */
    ) : c = kn(a.from || o) : c = kn(a), Et(c) && r ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => c.value,
      set: (d) => c.value = d
    }) : t[o] = c;
  }
}
function Ju(e, t, n) {
  Jt(Re(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Dd(e, t, n, r) {
  const o = r.includes(".") ? Nd(n, r) : () => n[r];
  if (dt(e)) {
    const a = t[e];
    je(a) && Ut(o, a);
  } else if (je(e))
    Ut(o, e.bind(n));
  else if (ot(e))
    if (Re(e))
      e.forEach((a) => Dd(a, t, n, r));
    else {
      const a = je(e.handler) ? e.handler.bind(n) : t[e.handler];
      je(a) && Ut(o, a, e);
    }
}
function Pl(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: o, optionsCache: a, config: { optionMergeStrategies: c } } = e.appContext, d = a.get(t);
  let p;
  return d ? p = d : !o.length && !n && !r ? p = t : (p = {}, o.length && o.forEach((g) => Wo(p, g, c, !0)), Wo(p, t, c)), ot(t) && a.set(t, p), p;
}
function Wo(e, t, n, r = !1) {
  const { mixins: o, extends: a } = t;
  a && Wo(e, a, n, !0), o && o.forEach((c) => Wo(e, c, n, !0));
  for (const c in t)
    if (!(r && c === "expose")) {
      const d = cm[c] || n && n[c];
      e[c] = d ? d(e[c], t[c]) : t[c];
    }
  return e;
}
const cm = {
  data: Qu,
  props: pr,
  emits: pr,
  // objects
  methods: pr,
  computed: pr,
  // lifecycle
  beforeCreate: St,
  created: St,
  beforeMount: St,
  mounted: St,
  beforeUpdate: St,
  updated: St,
  beforeDestroy: St,
  beforeUnmount: St,
  destroyed: St,
  unmounted: St,
  activated: St,
  deactivated: St,
  errorCaptured: St,
  serverPrefetch: St,
  // assets
  components: pr,
  directives: pr,
  // watch
  watch: dm,
  // provide / inject
  provide: Qu,
  inject: fm
};
function Qu(e, t) {
  return t ? e ? function() {
    return gt(je(e) ? e.call(this, this) : e, je(t) ? t.call(this, this) : t);
  } : t : e;
}
function fm(e, t) {
  return pr(Is(e), Is(t));
}
function Is(e) {
  if (Re(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function St(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function pr(e, t) {
  return e ? gt(gt(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function dm(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = gt(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = St(e[r], t[r]);
  return n;
}
function pm(e, t, n, r = !1) {
  const o = {}, a = {};
  Fo(a, sa, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), $d(e, t, o, a);
  for (const c in e.propsOptions[0])
    c in o || (o[c] = void 0);
  n ? e.props = r ? o : Ng(o) : e.type.props ? e.props = o : e.props = a, e.attrs = a;
}
function hm(e, t, n, r) {
  const { props: o, attrs: a, vnode: { patchFlag: c } } = e, d = qe(o), [p] = e.propsOptions;
  let g = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const y = e.vnode.dynamicProps;
      for (let C = 0; C < y.length; C++) {
        let b = y[C];
        if (ia(e.emitsOptions, b))
          continue;
        const E = t[b];
        if (p)
          if (We(a, b))
            E !== a[b] && (a[b] = E, g = !0);
          else {
            const w = Yr(b);
            o[w] = js(
              p,
              d,
              w,
              E,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          E !== a[b] && (a[b] = E, g = !0);
      }
    }
  } else {
    $d(e, t, o, a) && (g = !0);
    let y;
    for (const C in d)
      (!t || // for camelCase
      !We(t, C) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((y = ti(C)) === C || !We(t, y))) && (p ? n && // for camelCase
      (n[C] !== void 0 || // for kebab-case
      n[y] !== void 0) && (o[C] = js(
        p,
        d,
        C,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[C]);
    if (a !== d)
      for (const C in a)
        (!t || !We(t, C)) && (delete a[C], g = !0);
  }
  g && Rn(e, "set", "$attrs");
}
function $d(e, t, n, r) {
  const [o, a] = e.propsOptions;
  let c = !1, d;
  if (t)
    for (let p in t) {
      if (No(p))
        continue;
      const g = t[p];
      let y;
      o && We(o, y = Yr(p)) ? !a || !a.includes(y) ? n[y] = g : (d || (d = {}))[y] = g : ia(e.emitsOptions, p) || (!(p in r) || g !== r[p]) && (r[p] = g, c = !0);
    }
  if (a) {
    const p = qe(n), g = d || Qe;
    for (let y = 0; y < a.length; y++) {
      const C = a[y];
      n[C] = js(o, p, C, g[C], e, !We(g, C));
    }
  }
  return c;
}
function js(e, t, n, r, o, a) {
  const c = e[n];
  if (c != null) {
    const d = We(c, "default");
    if (d && r === void 0) {
      const p = c.default;
      if (c.type !== Function && je(p)) {
        const { propsDefaults: g } = o;
        n in g ? r = g[n] : (Vr(o), r = g[n] = p.call(null, t), xr());
      } else
        r = p;
    }
    c[
      0
      /* BooleanFlags.shouldCast */
    ] && (a && !d ? r = !1 : c[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (r === "" || r === ti(n)) && (r = !0));
  }
  return r;
}
function Fd(e, t, n = !1) {
  const r = t.propsCache, o = r.get(e);
  if (o)
    return o;
  const a = e.props, c = {}, d = [];
  let p = !1;
  if (!je(e)) {
    const y = (C) => {
      p = !0;
      const [b, E] = Fd(C, t, !0);
      gt(c, b), E && d.push(...E);
    };
    !n && t.mixins.length && t.mixins.forEach(y), e.extends && y(e.extends), e.mixins && e.mixins.forEach(y);
  }
  if (!a && !p)
    return ot(e) && r.set(e, Br), Br;
  if (Re(a))
    for (let y = 0; y < a.length; y++) {
      const C = Yr(a[y]);
      Zu(C) && (c[C] = Qe);
    }
  else if (a)
    for (const y in a) {
      const C = Yr(y);
      if (Zu(C)) {
        const b = a[y], E = c[C] = Re(b) || je(b) ? { type: b } : Object.assign({}, b);
        if (E) {
          const w = nc(Boolean, E.type), A = nc(String, E.type);
          E[
            0
            /* BooleanFlags.shouldCast */
          ] = w > -1, E[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = A < 0 || w < A, (w > -1 || We(E, "default")) && d.push(C);
        }
      }
    }
  const g = [c, d];
  return ot(e) && r.set(e, g), g;
}
function Zu(e) {
  return e[0] !== "$";
}
function ec(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function tc(e, t) {
  return ec(e) === ec(t);
}
function nc(e, t) {
  return Re(t) ? t.findIndex((n) => tc(n, e)) : je(t) && tc(t, e) ? 0 : -1;
}
const Hd = (e) => e[0] === "_" || e === "$stable", Nl = (e) => Re(e) ? e.map(vn) : [vn(e)], vm = (e, t, n) => {
  if (t._n)
    return t;
  const r = Wg((...o) => Nl(t(...o)), n);
  return r._c = !1, r;
}, Bd = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Hd(o))
      continue;
    const a = e[o];
    if (je(a))
      t[o] = vm(o, a, r);
    else if (a != null) {
      const c = Nl(a);
      t[o] = () => c;
    }
  }
}, Wd = (e, t) => {
  const n = Nl(t);
  e.slots.default = () => n;
}, gm = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = qe(t), Fo(t, "_", n)) : Bd(t, e.slots = {});
  } else
    e.slots = {}, t && Wd(e, t);
  Fo(e.slots, sa, 1);
}, mm = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let a = !0, c = Qe;
  if (r.shapeFlag & 32) {
    const d = t._;
    d ? n && d === 1 ? a = !1 : (gt(o, t), !n && d === 1 && delete o._) : (a = !t.$stable, Bd(t, o)), c = t;
  } else
    t && (Wd(e, t), c = { default: 1 });
  if (a)
    for (const d in o)
      !Hd(d) && !(d in c) && delete o[d];
};
function Ud() {
  return {
    app: null,
    config: {
      isNativeTag: Xv,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let ym = 0;
function bm(e, t) {
  return function(r, o = null) {
    je(r) || (r = Object.assign({}, r)), o != null && !ot(o) && (o = null);
    const a = Ud(), c = /* @__PURE__ */ new Set();
    let d = !1;
    const p = a.app = {
      _uid: ym++,
      _component: r,
      _props: o,
      _container: null,
      _context: a,
      _instance: null,
      version: Bm,
      get config() {
        return a.config;
      },
      set config(g) {
      },
      use(g, ...y) {
        return c.has(g) || (g && je(g.install) ? (c.add(g), g.install(p, ...y)) : je(g) && (c.add(g), g(p, ...y))), p;
      },
      mixin(g) {
        return a.mixins.includes(g) || a.mixins.push(g), p;
      },
      component(g, y) {
        return y ? (a.components[g] = y, p) : a.components[g];
      },
      directive(g, y) {
        return y ? (a.directives[g] = y, p) : a.directives[g];
      },
      mount(g, y, C) {
        if (!d) {
          const b = L(r, o);
          return b.appContext = a, y && t ? t(b, g) : e(b, g, C), d = !0, p._container = g, g.__vue_app__ = p, ua(b.component) || b.component.proxy;
        }
      },
      unmount() {
        d && (e(null, p._container), delete p._container.__vue_app__);
      },
      provide(g, y) {
        return a.provides[g] = y, p;
      }
    };
    return p;
  };
}
function Ds(e, t, n, r, o = !1) {
  if (Re(e)) {
    e.forEach((b, E) => Ds(b, t && (Re(t) ? t[E] : t), n, r, o));
    return;
  }
  if (ko(r) && !o)
    return;
  const a = r.shapeFlag & 4 ? ua(r.component) || r.component.proxy : r.el, c = o ? null : a, { i: d, r: p } = e, g = t && t.r, y = d.refs === Qe ? d.refs = {} : d.refs, C = d.setupState;
  if (g != null && g !== p && (dt(g) ? (y[g] = null, We(C, g) && (C[g] = null)) : Et(g) && (g.value = null)), je(p))
    Qn(p, d, 12, [c, y]);
  else {
    const b = dt(p), E = Et(p);
    if (b || E) {
      const w = () => {
        if (e.f) {
          const A = b ? We(C, p) ? C[p] : y[p] : p.value;
          o ? Re(A) && pl(A, a) : Re(A) ? A.includes(a) || A.push(a) : b ? (y[p] = [a], We(C, p) && (C[p] = y[p])) : (p.value = [a], e.k && (y[e.k] = p.value));
        } else
          b ? (y[p] = c, We(C, p) && (C[p] = c)) : E && (p.value = c, e.k && (y[e.k] = c));
      };
      c ? (w.id = -1, Lt(w, n)) : w();
    }
  }
}
const Lt = Vg;
function Cm(e) {
  return xm(e);
}
function xm(e, t) {
  const n = ng();
  n.__VUE__ = !0;
  const { insert: r, remove: o, patchProp: a, createElement: c, createText: d, createComment: p, setText: g, setElementText: y, parentNode: C, nextSibling: b, setScopeId: E = un, insertStaticContent: w } = e, A = (_, k, W, Z = null, j = null, ne = null, de = !1, ae = null, ue = !!k.dynamicChildren) => {
    if (_ === k)
      return;
    _ && !vr(_, k) && (Z = fn(_), $e(_, j, ne, !0), _ = null), k.patchFlag === -2 && (ue = !1, k.dynamicChildren = null);
    const { type: re, ref: Ce, shapeFlag: he } = k;
    switch (re) {
      case ii:
        D(_, k, W, Z);
        break;
      case yn:
        N(_, k, W, Z);
        break;
      case za:
        _ == null && I(k, W, Z, de);
        break;
      case ft:
        Q(_, k, W, Z, j, ne, de, ae, ue);
        break;
      default:
        he & 1 ? B(_, k, W, Z, j, ne, de, ae, ue) : he & 6 ? pe(_, k, W, Z, j, ne, de, ae, ue) : (he & 64 || he & 128) && re.process(_, k, W, Z, j, ne, de, ae, ue, ht);
    }
    Ce != null && j && Ds(Ce, _ && _.ref, ne, k || _, !k);
  }, D = (_, k, W, Z) => {
    if (_ == null)
      r(k.el = d(k.children), W, Z);
    else {
      const j = k.el = _.el;
      k.children !== _.children && g(j, k.children);
    }
  }, N = (_, k, W, Z) => {
    _ == null ? r(k.el = p(k.children || ""), W, Z) : k.el = _.el;
  }, I = (_, k, W, Z) => {
    [_.el, _.anchor] = w(_.children, k, W, Z, _.el, _.anchor);
  }, F = ({ el: _, anchor: k }, W, Z) => {
    let j;
    for (; _ && _ !== k; )
      j = b(_), r(_, W, Z), _ = j;
    r(k, W, Z);
  }, J = ({ el: _, anchor: k }) => {
    let W;
    for (; _ && _ !== k; )
      W = b(_), o(_), _ = W;
    o(k);
  }, B = (_, k, W, Z, j, ne, de, ae, ue) => {
    de = de || k.type === "svg", _ == null ? u(k, W, Z, j, ne, de, ae, ue) : oe(_, k, j, ne, de, ae, ue);
  }, u = (_, k, W, Z, j, ne, de, ae) => {
    let ue, re;
    const { type: Ce, props: he, shapeFlag: ge, transition: Te, dirs: Le } = _;
    if (ue = _.el = c(_.type, ne, he && he.is, he), ge & 8 ? y(ue, _.children) : ge & 16 && X(_.children, ue, null, Z, j, ne && Ce !== "foreignObject", de, ae), Le && cr(_, null, Z, "created"), he) {
      for (const He in he)
        He !== "value" && !No(He) && a(ue, He, null, he[He], ne, _.children, Z, j, Ye);
      "value" in he && a(ue, "value", null, he.value), (re = he.onVnodeBeforeMount) && dn(re, Z, _);
    }
    Y(ue, _, _.scopeId, de, Z), Le && cr(_, null, Z, "beforeMount");
    const Xe = (!j || j && !j.pendingBranch) && Te && !Te.persisted;
    Xe && Te.beforeEnter(ue), r(ue, k, W), ((re = he && he.onVnodeMounted) || Xe || Le) && Lt(() => {
      re && dn(re, Z, _), Xe && Te.enter(ue), Le && cr(_, null, Z, "mounted");
    }, j);
  }, Y = (_, k, W, Z, j) => {
    if (W && E(_, W), Z)
      for (let ne = 0; ne < Z.length; ne++)
        E(_, Z[ne]);
    if (j) {
      let ne = j.subTree;
      if (k === ne) {
        const de = j.vnode;
        Y(_, de, de.scopeId, de.slotScopeIds, j.parent);
      }
    }
  }, X = (_, k, W, Z, j, ne, de, ae, ue = 0) => {
    for (let re = ue; re < _.length; re++) {
      const Ce = _[re] = ae ? Xn(_[re]) : vn(_[re]);
      A(null, Ce, k, W, Z, j, ne, de, ae);
    }
  }, oe = (_, k, W, Z, j, ne, de) => {
    const ae = k.el = _.el;
    let { patchFlag: ue, dynamicChildren: re, dirs: Ce } = k;
    ue |= _.patchFlag & 16;
    const he = _.props || Qe, ge = k.props || Qe;
    let Te;
    W && fr(W, !1), (Te = ge.onVnodeBeforeUpdate) && dn(Te, W, k, _), Ce && cr(k, _, W, "beforeUpdate"), W && fr(W, !0);
    const Le = j && k.type !== "foreignObject";
    if (re ? fe(_.dynamicChildren, re, ae, W, Z, Le, ne) : de || se(_, k, ae, null, W, Z, Le, ne, !1), ue > 0) {
      if (ue & 16)
        we(ae, k, he, ge, W, Z, j);
      else if (ue & 2 && he.class !== ge.class && a(ae, "class", null, ge.class, j), ue & 4 && a(ae, "style", he.style, ge.style, j), ue & 8) {
        const Xe = k.dynamicProps;
        for (let He = 0; He < Xe.length; He++) {
          const tt = Xe[He], At = he[tt], Hn = ge[tt];
          (Hn !== At || tt === "value") && a(ae, tt, At, Hn, j, _.children, W, Z, Ye);
        }
      }
      ue & 1 && _.children !== k.children && y(ae, k.children);
    } else
      !de && re == null && we(ae, k, he, ge, W, Z, j);
    ((Te = ge.onVnodeUpdated) || Ce) && Lt(() => {
      Te && dn(Te, W, k, _), Ce && cr(k, _, W, "updated");
    }, Z);
  }, fe = (_, k, W, Z, j, ne, de) => {
    for (let ae = 0; ae < k.length; ae++) {
      const ue = _[ae], re = k[ae], Ce = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        ue.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (ue.type === ft || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !vr(ue, re) || // - In the case of a component, it could contain anything.
        ue.shapeFlag & 70) ? C(ue.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          W
        )
      );
      A(ue, re, Ce, null, Z, j, ne, de, !0);
    }
  }, we = (_, k, W, Z, j, ne, de) => {
    if (W !== Z) {
      if (W !== Qe)
        for (const ae in W)
          !No(ae) && !(ae in Z) && a(_, ae, W[ae], null, de, k.children, j, ne, Ye);
      for (const ae in Z) {
        if (No(ae))
          continue;
        const ue = Z[ae], re = W[ae];
        ue !== re && ae !== "value" && a(_, ae, re, ue, de, k.children, j, ne, Ye);
      }
      "value" in Z && a(_, "value", W.value, Z.value);
    }
  }, Q = (_, k, W, Z, j, ne, de, ae, ue) => {
    const re = k.el = _ ? _.el : d(""), Ce = k.anchor = _ ? _.anchor : d("");
    let { patchFlag: he, dynamicChildren: ge, slotScopeIds: Te } = k;
    Te && (ae = ae ? ae.concat(Te) : Te), _ == null ? (r(re, W, Z), r(Ce, W, Z), X(k.children, W, Ce, j, ne, de, ae, ue)) : he > 0 && he & 64 && ge && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    _.dynamicChildren ? (fe(_.dynamicChildren, ge, W, j, ne, de, ae), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (k.key != null || j && k === j.subTree) && kl(
      _,
      k,
      !0
      /* shallow */
    )) : se(_, k, W, Ce, j, ne, de, ae, ue);
  }, pe = (_, k, W, Z, j, ne, de, ae, ue) => {
    k.slotScopeIds = ae, _ == null ? k.shapeFlag & 512 ? j.ctx.activate(k, W, Z, de, ue) : Ie(k, W, Z, j, ne, de, ue) : ie(_, k, ue);
  }, Ie = (_, k, W, Z, j, ne, de) => {
    const ae = _.component = Rm(_, Z, j);
    if (oa(_) && (ae.ctx.renderer = ht), Mm(ae), ae.asyncDep) {
      if (j && j.registerDep(ae, U), !_.el) {
        const ue = ae.subTree = L(yn);
        N(null, ue, k, W);
      }
      return;
    }
    U(ae, _, k, W, j, ne, de);
  }, ie = (_, k, W) => {
    const Z = k.component = _.component;
    if (zg(_, k, W))
      if (Z.asyncDep && !Z.asyncResolved) {
        K(Z, k, W);
        return;
      } else
        Z.next = k, $g(Z.update), Z.update();
    else
      k.el = _.el, Z.vnode = k;
  }, U = (_, k, W, Z, j, ne, de) => {
    const ae = () => {
      if (_.isMounted) {
        let { next: Ce, bu: he, u: ge, parent: Te, vnode: Le } = _, Xe = Ce, He;
        fr(_, !1), Ce ? (Ce.el = Le.el, K(_, Ce, de)) : Ce = Le, he && Ba(he), (He = Ce.props && Ce.props.onVnodeBeforeUpdate) && dn(He, Te, Ce, Le), fr(_, !0);
        const tt = Wa(_), At = _.subTree;
        _.subTree = tt, A(
          At,
          tt,
          // parent may have changed if it's in a teleport
          C(At.el),
          // anchor may have changed if it's in a fragment
          fn(At),
          _,
          j,
          ne
        ), Ce.el = tt.el, Xe === null && Yg(_, tt.el), ge && Lt(ge, j), (He = Ce.props && Ce.props.onVnodeUpdated) && Lt(() => dn(He, Te, Ce, Le), j);
      } else {
        let Ce;
        const { el: he, props: ge } = k, { bm: Te, m: Le, parent: Xe } = _, He = ko(k);
        if (fr(_, !1), Te && Ba(Te), !He && (Ce = ge && ge.onVnodeBeforeMount) && dn(Ce, Xe, k), fr(_, !0), he && nr) {
          const tt = () => {
            _.subTree = Wa(_), nr(he, _.subTree, _, j, null);
          };
          He ? k.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !_.isUnmounted && tt()
          ) : tt();
        } else {
          const tt = _.subTree = Wa(_);
          A(null, tt, W, Z, _, j, ne), k.el = tt.el;
        }
        if (Le && Lt(Le, j), !He && (Ce = ge && ge.onVnodeMounted)) {
          const tt = k;
          Lt(() => dn(Ce, Xe, tt), j);
        }
        (k.shapeFlag & 256 || Xe && ko(Xe.vnode) && Xe.vnode.shapeFlag & 256) && _.a && Lt(_.a, j), _.isMounted = !0, k = W = Z = null;
      }
    }, ue = _.effect = new yl(
      ae,
      () => Sl(re),
      _.scope
      // track it in component's effect scope
    ), re = _.update = () => ue.run();
    re.id = _.uid, fr(_, !0), re();
  }, K = (_, k, W) => {
    k.component = _;
    const Z = _.vnode.props;
    _.vnode = k, _.next = null, hm(_, k.props, Z, W), mm(_, k.children, W), ni(), Vu(), ri();
  }, se = (_, k, W, Z, j, ne, de, ae, ue = !1) => {
    const re = _ && _.children, Ce = _ ? _.shapeFlag : 0, he = k.children, { patchFlag: ge, shapeFlag: Te } = k;
    if (ge > 0) {
      if (ge & 128) {
        ve(re, he, W, Z, j, ne, de, ae, ue);
        return;
      } else if (ge & 256) {
        me(re, he, W, Z, j, ne, de, ae, ue);
        return;
      }
    }
    Te & 8 ? (Ce & 16 && Ye(re, j, ne), he !== re && y(W, he)) : Ce & 16 ? Te & 16 ? ve(re, he, W, Z, j, ne, de, ae, ue) : Ye(re, j, ne, !0) : (Ce & 8 && y(W, ""), Te & 16 && X(he, W, Z, j, ne, de, ae, ue));
  }, me = (_, k, W, Z, j, ne, de, ae, ue) => {
    _ = _ || Br, k = k || Br;
    const re = _.length, Ce = k.length, he = Math.min(re, Ce);
    let ge;
    for (ge = 0; ge < he; ge++) {
      const Te = k[ge] = ue ? Xn(k[ge]) : vn(k[ge]);
      A(_[ge], Te, W, null, j, ne, de, ae, ue);
    }
    re > Ce ? Ye(_, j, ne, !0, !1, he) : X(k, W, Z, j, ne, de, ae, ue, he);
  }, ve = (_, k, W, Z, j, ne, de, ae, ue) => {
    let re = 0;
    const Ce = k.length;
    let he = _.length - 1, ge = Ce - 1;
    for (; re <= he && re <= ge; ) {
      const Te = _[re], Le = k[re] = ue ? Xn(k[re]) : vn(k[re]);
      if (vr(Te, Le))
        A(Te, Le, W, null, j, ne, de, ae, ue);
      else
        break;
      re++;
    }
    for (; re <= he && re <= ge; ) {
      const Te = _[he], Le = k[ge] = ue ? Xn(k[ge]) : vn(k[ge]);
      if (vr(Te, Le))
        A(Te, Le, W, null, j, ne, de, ae, ue);
      else
        break;
      he--, ge--;
    }
    if (re > he) {
      if (re <= ge) {
        const Te = ge + 1, Le = Te < Ce ? k[Te].el : Z;
        for (; re <= ge; )
          A(null, k[re] = ue ? Xn(k[re]) : vn(k[re]), W, Le, j, ne, de, ae, ue), re++;
      }
    } else if (re > ge)
      for (; re <= he; )
        $e(_[re], j, ne, !0), re++;
    else {
      const Te = re, Le = re, Xe = /* @__PURE__ */ new Map();
      for (re = Le; re <= ge; re++) {
        const xt = k[re] = ue ? Xn(k[re]) : vn(k[re]);
        xt.key != null && Xe.set(xt.key, re);
      }
      let He, tt = 0;
      const At = ge - Le + 1;
      let Hn = !1, En = 0;
      const tn = new Array(At);
      for (re = 0; re < At; re++)
        tn[re] = 0;
      for (re = Te; re <= he; re++) {
        const xt = _[re];
        if (tt >= At) {
          $e(xt, j, ne, !0);
          continue;
        }
        let nt;
        if (xt.key != null)
          nt = Xe.get(xt.key);
        else
          for (He = Le; He <= ge; He++)
            if (tn[He - Le] === 0 && vr(xt, k[He])) {
              nt = He;
              break;
            }
        nt === void 0 ? $e(xt, j, ne, !0) : (tn[nt - Le] = re + 1, nt >= En ? En = nt : Hn = !0, A(xt, k[nt], W, null, j, ne, de, ae, ue), tt++);
      }
      const ci = Hn ? wm(tn) : Br;
      for (He = ci.length - 1, re = At - 1; re >= 0; re--) {
        const xt = Le + re, nt = k[xt], mt = xt + 1 < Ce ? k[xt + 1].el : Z;
        tn[re] === 0 ? A(null, nt, W, mt, j, ne, de, ae, ue) : Hn && (He < 0 || re !== ci[He] ? Ee(
          nt,
          W,
          mt,
          2
          /* MoveType.REORDER */
        ) : He--);
      }
    }
  }, Ee = (_, k, W, Z, j = null) => {
    const { el: ne, type: de, transition: ae, children: ue, shapeFlag: re } = _;
    if (re & 6) {
      Ee(_.component.subTree, k, W, Z);
      return;
    }
    if (re & 128) {
      _.suspense.move(k, W, Z);
      return;
    }
    if (re & 64) {
      de.move(_, k, W, ht);
      return;
    }
    if (de === ft) {
      r(ne, k, W);
      for (let he = 0; he < ue.length; he++)
        Ee(ue[he], k, W, Z);
      r(_.anchor, k, W);
      return;
    }
    if (de === za) {
      F(_, k, W);
      return;
    }
    if (Z !== 2 && re & 1 && ae)
      if (Z === 0)
        ae.beforeEnter(ne), r(ne, k, W), Lt(() => ae.enter(ne), j);
      else {
        const { leave: he, delayLeave: ge, afterLeave: Te } = ae, Le = () => r(ne, k, W), Xe = () => {
          he(ne, () => {
            Le(), Te && Te();
          });
        };
        ge ? ge(ne, Le, Xe) : Xe();
      }
    else
      r(ne, k, W);
  }, $e = (_, k, W, Z = !1, j = !1) => {
    const { type: ne, props: de, ref: ae, children: ue, dynamicChildren: re, shapeFlag: Ce, patchFlag: he, dirs: ge } = _;
    if (ae != null && Ds(ae, null, W, _, !0), Ce & 256) {
      k.ctx.deactivate(_);
      return;
    }
    const Te = Ce & 1 && ge, Le = !ko(_);
    let Xe;
    if (Le && (Xe = de && de.onVnodeBeforeUnmount) && dn(Xe, k, _), Ce & 6)
      at(_.component, W, Z);
    else {
      if (Ce & 128) {
        _.suspense.unmount(W, Z);
        return;
      }
      Te && cr(_, null, k, "beforeUnmount"), Ce & 64 ? _.type.remove(_, k, W, j, ht, Z) : re && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ne !== ft || he > 0 && he & 64) ? Ye(re, k, W, !1, !0) : (ne === ft && he & 384 || !j && Ce & 16) && Ye(ue, k, W), Z && Ue(_);
    }
    (Le && (Xe = de && de.onVnodeUnmounted) || Te) && Lt(() => {
      Xe && dn(Xe, k, _), Te && cr(_, null, k, "unmounted");
    }, W);
  }, Ue = (_) => {
    const { type: k, el: W, anchor: Z, transition: j } = _;
    if (k === ft) {
      pt(W, Z);
      return;
    }
    if (k === za) {
      J(_);
      return;
    }
    const ne = () => {
      o(W), j && !j.persisted && j.afterLeave && j.afterLeave();
    };
    if (_.shapeFlag & 1 && j && !j.persisted) {
      const { leave: de, delayLeave: ae } = j, ue = () => de(W, ne);
      ae ? ae(_.el, ne, ue) : ue();
    } else
      ne();
  }, pt = (_, k) => {
    let W;
    for (; _ !== k; )
      W = b(_), o(_), _ = W;
    o(k);
  }, at = (_, k, W) => {
    const { bum: Z, scope: j, update: ne, subTree: de, um: ae } = _;
    Z && Ba(Z), j.stop(), ne && (ne.active = !1, $e(de, _, k, W)), ae && Lt(ae, k), Lt(() => {
      _.isUnmounted = !0;
    }, k), k && k.pendingBranch && !k.isUnmounted && _.asyncDep && !_.asyncResolved && _.suspenseId === k.pendingId && (k.deps--, k.deps === 0 && k.resolve());
  }, Ye = (_, k, W, Z = !1, j = !1, ne = 0) => {
    for (let de = ne; de < _.length; de++)
      $e(_[de], k, W, Z, j);
  }, fn = (_) => _.shapeFlag & 6 ? fn(_.component.subTree) : _.shapeFlag & 128 ? _.suspense.next() : b(_.anchor || _.el), Tn = (_, k, W) => {
    _ == null ? k._vnode && $e(k._vnode, null, null, !0) : A(k._vnode || null, _, k, null, null, null, W), Vu(), Od(), k._vnode = _;
  }, ht = {
    p: A,
    um: $e,
    m: Ee,
    r: Ue,
    mt: Ie,
    mc: X,
    pc: se,
    pbc: fe,
    n: fn,
    o: e
  };
  let Fn, nr;
  return t && ([Fn, nr] = t(ht)), {
    render: Tn,
    hydrate: Fn,
    createApp: bm(Tn, Fn)
  };
}
function fr({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function kl(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (Re(r) && Re(o))
    for (let a = 0; a < r.length; a++) {
      const c = r[a];
      let d = o[a];
      d.shapeFlag & 1 && !d.dynamicChildren && ((d.patchFlag <= 0 || d.patchFlag === 32) && (d = o[a] = Xn(o[a]), d.el = c.el), n || kl(c, d)), d.type === ii && (d.el = c.el);
    }
}
function wm(e) {
  const t = e.slice(), n = [0];
  let r, o, a, c, d;
  const p = e.length;
  for (r = 0; r < p; r++) {
    const g = e[r];
    if (g !== 0) {
      if (o = n[n.length - 1], e[o] < g) {
        t[r] = o, n.push(r);
        continue;
      }
      for (a = 0, c = n.length - 1; a < c; )
        d = a + c >> 1, e[n[d]] < g ? a = d + 1 : c = d;
      g < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
    }
  }
  for (a = n.length, c = n[a - 1]; a-- > 0; )
    n[a] = c, c = t[c];
  return n;
}
const Tm = (e) => e.__isTeleport, Ni = (e) => e && (e.disabled || e.disabled === ""), rc = (e) => typeof SVGElement < "u" && e instanceof SVGElement, $s = (e, t) => {
  const n = e && e.to;
  return dt(n) ? t ? t(n) : null : n;
}, Em = {
  __isTeleport: !0,
  process(e, t, n, r, o, a, c, d, p, g) {
    const { mc: y, pc: C, pbc: b, o: { insert: E, querySelector: w, createText: A, createComment: D } } = g, N = Ni(t.props);
    let { shapeFlag: I, children: F, dynamicChildren: J } = t;
    if (e == null) {
      const B = t.el = A(""), u = t.anchor = A("");
      E(B, n, r), E(u, n, r);
      const Y = t.target = $s(t.props, w), X = t.targetAnchor = A("");
      Y && (E(X, Y), c = c || rc(Y));
      const oe = (fe, we) => {
        I & 16 && y(F, fe, we, o, a, c, d, p);
      };
      N ? oe(n, u) : Y && oe(Y, X);
    } else {
      t.el = e.el;
      const B = t.anchor = e.anchor, u = t.target = e.target, Y = t.targetAnchor = e.targetAnchor, X = Ni(e.props), oe = X ? n : u, fe = X ? B : Y;
      if (c = c || rc(u), J ? (b(e.dynamicChildren, J, oe, o, a, c, d), kl(e, t, !0)) : p || C(e, t, oe, fe, o, a, c, d, !1), N)
        X || bo(
          t,
          n,
          B,
          g,
          1
          /* TeleportMoveTypes.TOGGLE */
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const we = t.target = $s(t.props, w);
        we && bo(
          t,
          we,
          null,
          g,
          0
          /* TeleportMoveTypes.TARGET_CHANGE */
        );
      } else
        X && bo(
          t,
          u,
          Y,
          g,
          1
          /* TeleportMoveTypes.TOGGLE */
        );
    }
    zd(t);
  },
  remove(e, t, n, r, { um: o, o: { remove: a } }, c) {
    const { shapeFlag: d, children: p, anchor: g, targetAnchor: y, target: C, props: b } = e;
    if (C && a(y), (c || !Ni(b)) && (a(g), d & 16))
      for (let E = 0; E < p.length; E++) {
        const w = p[E];
        o(w, t, n, !0, !!w.dynamicChildren);
      }
  },
  move: bo,
  hydrate: Sm
};
function bo(e, t, n, { o: { insert: r }, m: o }, a = 2) {
  a === 0 && r(e.targetAnchor, t, n);
  const { el: c, anchor: d, shapeFlag: p, children: g, props: y } = e, C = a === 2;
  if (C && r(c, t, n), (!C || Ni(y)) && p & 16)
    for (let b = 0; b < g.length; b++)
      o(
        g[b],
        t,
        n,
        2
        /* MoveType.REORDER */
      );
  C && r(d, t, n);
}
function Sm(e, t, n, r, o, a, { o: { nextSibling: c, parentNode: d, querySelector: p } }, g) {
  const y = t.target = $s(t.props, p);
  if (y) {
    const C = y._lpa || y.firstChild;
    if (t.shapeFlag & 16)
      if (Ni(t.props))
        t.anchor = g(c(e), t, d(e), n, r, o, a), t.targetAnchor = C;
      else {
        t.anchor = c(e);
        let b = C;
        for (; b; )
          if (b = c(b), b && b.nodeType === 8 && b.data === "teleport anchor") {
            t.targetAnchor = b, y._lpa = t.targetAnchor && c(t.targetAnchor);
            break;
          }
        g(C, t, y, n, r, o, a);
      }
    zd(t);
  }
  return t.anchor && c(t.anchor);
}
const qd = Em;
function zd(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const ft = Symbol(void 0), ii = Symbol(void 0), yn = Symbol(void 0), za = Symbol(void 0), ki = [];
let ln = null;
function Ya(e = !1) {
  ki.push(ln = e ? null : []);
}
function Om() {
  ki.pop(), ln = ki[ki.length - 1] || null;
}
let Bi = 1;
function ic(e) {
  Bi += e;
}
function Yd(e) {
  return e.dynamicChildren = Bi > 0 ? ln || Br : null, Om(), Bi > 0 && ln && ln.push(e), e;
}
function oc(e, t, n, r, o, a) {
  return Yd(Vd(
    e,
    t,
    n,
    r,
    o,
    a,
    !0
    /* isBlock */
  ));
}
function _m(e, t, n, r, o) {
  return Yd(L(
    e,
    t,
    n,
    r,
    o,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function er(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function vr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const sa = "__vInternal", Xd = ({ key: e }) => e ?? null, Lo = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? dt(e) || Et(e) || je(e) ? { i: Gt, r: e, k: t, f: !!n } : e : null;
function Vd(e, t = null, n = null, r = 0, o = null, a = e === ft ? 0 : 1, c = !1, d = !1) {
  const p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xd(t),
    ref: t && Lo(t),
    scopeId: Pd,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Gt
  };
  return d ? (Ll(p, n), a & 128 && e.normalize(p)) : n && (p.shapeFlag |= dt(n) ? 8 : 16), Bi > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  ln && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (p.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  p.patchFlag !== 32 && ln.push(p), p;
}
const L = Am;
function Am(e, t = null, n = null, r = 0, o = null, a = !1) {
  if ((!e || e === om) && (e = yn), er(e)) {
    const d = bn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ll(d, n), Bi > 0 && !a && ln && (d.shapeFlag & 6 ? ln[ln.indexOf(e)] = d : ln.push(d)), d.patchFlag |= -2, d;
  }
  if ($m(e) && (e = e.__vccOpts), t) {
    t = Pm(t);
    let { class: d, style: p } = t;
    d && !dt(d) && (t.class = fl(d)), ot(p) && (yd(p) && !Re(p) && (p = gt({}, p)), t.style = cl(p));
  }
  const c = dt(e) ? 1 : Xg(e) ? 128 : Tm(e) ? 64 : ot(e) ? 4 : je(e) ? 2 : 0;
  return Vd(e, t, n, r, o, c, a, !0);
}
function Pm(e) {
  return e ? yd(e) || sa in e ? gt({}, e) : e : null;
}
function bn(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: a, children: c } = e, d = t ? Nm(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Xd(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? Re(o) ? o.concat(Lo(t)) : [o, Lo(t)] : Lo(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: c,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ft ? a === -1 ? 16 : a | 16 : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && bn(e.ssContent),
    ssFallback: e.ssFallback && bn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function Fs(e = " ", t = 0) {
  return L(ii, null, e, t);
}
function vn(e) {
  return e == null || typeof e == "boolean" ? L(yn) : Re(e) ? L(
    ft,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Xn(e) : L(ii, null, String(e));
}
function Xn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : bn(e);
}
function Ll(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (Re(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ll(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(sa in t) ? t._ctx = Gt : o === 3 && Gt && (Gt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    je(t) ? (t = { default: t, _ctx: Gt }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Fs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Nm(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = fl([t.class, r.class]));
      else if (o === "style")
        t.style = cl([t.style, r.style]);
      else if (Zo(o)) {
        const a = t[o], c = r[o];
        c && a !== c && !(Re(a) && a.includes(c)) && (t[o] = a ? [].concat(a, c) : c);
      } else
        o !== "" && (t[o] = r[o]);
  }
  return t;
}
function dn(e, t, n, r = null) {
  Jt(e, t, 7, [
    n,
    r
  ]);
}
const km = Ud();
let Lm = 0;
function Rm(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || km, a = {
    uid: Lm++,
    vnode: e,
    type: r,
    parent: t,
    appContext: o,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new rg(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Fd(r, o),
    emitsOptions: Ad(r, o),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: Qe,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Qe,
    data: Qe,
    props: Qe,
    attrs: Qe,
    slots: Qe,
    refs: Qe,
    setupState: Qe,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = Bg.bind(null, a), e.ce && e.ce(a), a;
}
let yt = null;
const la = () => yt || Gt, Vr = (e) => {
  yt = e, e.scope.on();
}, xr = () => {
  yt && yt.scope.off(), yt = null;
};
function Kd(e) {
  return e.vnode.shapeFlag & 4;
}
let Wi = !1;
function Mm(e, t = !1) {
  Wi = t;
  const { props: n, children: r } = e.vnode, o = Kd(e);
  pm(e, n, o, t), gm(e, r);
  const a = o ? Im(e, t) : void 0;
  return Wi = !1, a;
}
function Im(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = bd(new Proxy(e.ctx, sm));
  const { setup: r } = n;
  if (r) {
    const o = e.setupContext = r.length > 1 ? Dm(e) : null;
    Vr(e), ni();
    const a = Qn(r, e, 0, [e.props, o]);
    if (ri(), xr(), od(a)) {
      if (a.then(xr, xr), t)
        return a.then((c) => {
          ac(e, c, t);
        }).catch((c) => {
          ra(
            c,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = a;
    } else
      ac(e, a, t);
  } else
    Gd(e, t);
}
function ac(e, t, n) {
  je(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ot(t) && (e.setupState = wd(t)), Gd(e, n);
}
let sc;
function Gd(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && sc && !r.render) {
      const o = r.template || Pl(e).template;
      if (o) {
        const { isCustomElement: a, compilerOptions: c } = e.appContext.config, { delimiters: d, compilerOptions: p } = r, g = gt(gt({
          isCustomElement: a,
          delimiters: d
        }, c), p);
        r.render = sc(o, g);
      }
    }
    e.render = r.render || un;
  }
  Vr(e), ni(), lm(e), ri(), xr();
}
function jm(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return qt(e, "get", "$attrs"), t[n];
    }
  });
}
function Dm(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = jm(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ua(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(wd(bd(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Pi)
          return Pi[n](e);
      },
      has(t, n) {
        return n in t || n in Pi;
      }
    }));
}
function $m(e) {
  return je(e) && "__vccOpts" in e;
}
const Me = (e, t) => Ig(e, t, Wi);
function Uo(e, t, n) {
  const r = arguments.length;
  return r === 2 ? ot(t) && !Re(t) ? er(t) ? L(e, null, [t]) : L(e, t) : L(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && er(n) && (n = [n]), L(e, t, n));
}
const Fm = Symbol(""), Hm = () => kn(Fm), Bm = "3.2.45", Wm = "http://www.w3.org/2000/svg", gr = typeof document < "u" ? document : null, lc = gr && /* @__PURE__ */ gr.createElement("template"), Um = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t ? gr.createElementNS(Wm, e) : gr.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => gr.createTextNode(e),
  createComment: (e) => gr.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => gr.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, a) {
    const c = n ? n.previousSibling : t.lastChild;
    if (o && (o === a || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === a || !(o = o.nextSibling)); )
        ;
    else {
      lc.innerHTML = r ? `<svg>${e}</svg>` : e;
      const d = lc.content;
      if (r) {
        const p = d.firstChild;
        for (; p.firstChild; )
          d.appendChild(p.firstChild);
        d.removeChild(p);
      }
      t.insertBefore(d, n);
    }
    return [
      // first
      c ? c.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function qm(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function zm(e, t, n) {
  const r = e.style, o = dt(n);
  if (n && !o) {
    for (const a in n)
      Hs(r, a, n[a]);
    if (t && !dt(t))
      for (const a in t)
        n[a] == null && Hs(r, a, "");
  } else {
    const a = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = a);
  }
}
const uc = /\s*!important$/;
function Hs(e, t, n) {
  if (Re(n))
    n.forEach((r) => Hs(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = Ym(e, t);
    uc.test(n) ? e.setProperty(ti(r), n.replace(uc, ""), "important") : e[r] = n;
  }
}
const cc = ["Webkit", "Moz", "ms"], Xa = {};
function Ym(e, t) {
  const n = Xa[t];
  if (n)
    return n;
  let r = Yr(t);
  if (r !== "filter" && r in e)
    return Xa[t] = r;
  r = ad(r);
  for (let o = 0; o < cc.length; o++) {
    const a = cc[o] + r;
    if (a in e)
      return Xa[t] = a;
  }
  return t;
}
const fc = "http://www.w3.org/1999/xlink";
function Xm(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(fc, t.slice(6, t.length)) : e.setAttributeNS(fc, t, n);
  else {
    const a = Yv(t);
    n == null || a && !id(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : n);
  }
}
function Vm(e, t, n, r, o, a, c) {
  if (t === "innerHTML" || t === "textContent") {
    r && c(r, o, a), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const p = n ?? "";
    (e.value !== p || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = p), n == null && e.removeAttribute(t);
    return;
  }
  let d = !1;
  if (n === "" || n == null) {
    const p = typeof e[t];
    p === "boolean" ? n = id(n) : n == null && p === "string" ? (n = "", d = !0) : p === "number" && (n = 0, d = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  d && e.removeAttribute(t);
}
function Km(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Gm(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Jm(e, t, n, r, o = null) {
  const a = e._vei || (e._vei = {}), c = a[t];
  if (r && c)
    c.value = r;
  else {
    const [d, p] = Qm(t);
    if (r) {
      const g = a[t] = ty(r, o);
      Km(e, d, g, p);
    } else
      c && (Gm(e, d, c, p), a[t] = void 0);
  }
}
const dc = /(?:Once|Passive|Capture)$/;
function Qm(e) {
  let t;
  if (dc.test(e)) {
    t = {};
    let r;
    for (; r = e.match(dc); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ti(e.slice(2)), t];
}
let Va = 0;
const Zm = /* @__PURE__ */ Promise.resolve(), ey = () => Va || (Zm.then(() => Va = 0), Va = Date.now());
function ty(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Jt(ny(r, n.value), t, 5, [r]);
  };
  return n.value = e, n.attached = ey(), n;
}
function ny(e, t) {
  if (Re(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (o) => !o._stopped && r && r(o));
  } else
    return t;
}
const pc = /^on[a-z]/, ry = (e, t, n, r, o = !1, a, c, d, p) => {
  t === "class" ? qm(e, r, o) : t === "style" ? zm(e, n, r) : Zo(t) ? dl(t) || Jm(e, t, n, r, c) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : iy(e, t, r, o)) ? Vm(e, t, r, a, c, d, p) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Xm(e, t, r, o));
};
function iy(e, t, n, r) {
  return r ? !!(t === "innerHTML" || t === "textContent" || t in e && pc.test(t) && je(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || pc.test(t) && dt(n) ? !1 : t in e;
}
const qn = "transition", bi = "animation", Gi = (e, { slots: t }) => Uo(Ld, Qd(e), t);
Gi.displayName = "Transition";
const Jd = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, oy = Gi.props = /* @__PURE__ */ gt({}, Ld.props, Jd), dr = (e, t = []) => {
  Re(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, hc = (e) => e ? Re(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Qd(e) {
  const t = {};
  for (const Q in e)
    Q in Jd || (t[Q] = e[Q]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: r, duration: o, enterFromClass: a = `${n}-enter-from`, enterActiveClass: c = `${n}-enter-active`, enterToClass: d = `${n}-enter-to`, appearFromClass: p = a, appearActiveClass: g = c, appearToClass: y = d, leaveFromClass: C = `${n}-leave-from`, leaveActiveClass: b = `${n}-leave-active`, leaveToClass: E = `${n}-leave-to` } = e, w = ay(o), A = w && w[0], D = w && w[1], { onBeforeEnter: N, onEnter: I, onEnterCancelled: F, onLeave: J, onLeaveCancelled: B, onBeforeAppear: u = N, onAppear: Y = I, onAppearCancelled: X = F } = t, oe = (Q, pe, Ie) => {
    Yn(Q, pe ? y : d), Yn(Q, pe ? g : c), Ie && Ie();
  }, fe = (Q, pe) => {
    Q._isLeaving = !1, Yn(Q, C), Yn(Q, E), Yn(Q, b), pe && pe();
  }, we = (Q) => (pe, Ie) => {
    const ie = Q ? Y : I, U = () => oe(pe, Q, Ie);
    dr(ie, [pe, U]), vc(() => {
      Yn(pe, Q ? p : a), Pn(pe, Q ? y : d), hc(ie) || gc(pe, r, A, U);
    });
  };
  return gt(t, {
    onBeforeEnter(Q) {
      dr(N, [Q]), Pn(Q, a), Pn(Q, c);
    },
    onBeforeAppear(Q) {
      dr(u, [Q]), Pn(Q, p), Pn(Q, g);
    },
    onEnter: we(!1),
    onAppear: we(!0),
    onLeave(Q, pe) {
      Q._isLeaving = !0;
      const Ie = () => fe(Q, pe);
      Pn(Q, C), ep(), Pn(Q, b), vc(() => {
        Q._isLeaving && (Yn(Q, C), Pn(Q, E), hc(J) || gc(Q, r, D, Ie));
      }), dr(J, [Q, Ie]);
    },
    onEnterCancelled(Q) {
      oe(Q, !1), dr(F, [Q]);
    },
    onAppearCancelled(Q) {
      oe(Q, !0), dr(X, [Q]);
    },
    onLeaveCancelled(Q) {
      fe(Q), dr(B, [Q]);
    }
  });
}
function ay(e) {
  if (e == null)
    return null;
  if (ot(e))
    return [Ka(e.enter), Ka(e.leave)];
  {
    const t = Ka(e);
    return [t, t];
  }
}
function Ka(e) {
  return gl(e);
}
function Pn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function Yn(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function vc(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let sy = 0;
function gc(e, t, n, r) {
  const o = e._endId = ++sy, a = () => {
    o === e._endId && r();
  };
  if (n)
    return setTimeout(a, n);
  const { type: c, timeout: d, propCount: p } = Zd(e, t);
  if (!c)
    return r();
  const g = c + "end";
  let y = 0;
  const C = () => {
    e.removeEventListener(g, b), a();
  }, b = (E) => {
    E.target === e && ++y >= p && C();
  };
  setTimeout(() => {
    y < p && C();
  }, d + 1), e.addEventListener(g, b);
}
function Zd(e, t) {
  const n = window.getComputedStyle(e), r = (w) => (n[w] || "").split(", "), o = r(`${qn}Delay`), a = r(`${qn}Duration`), c = mc(o, a), d = r(`${bi}Delay`), p = r(`${bi}Duration`), g = mc(d, p);
  let y = null, C = 0, b = 0;
  t === qn ? c > 0 && (y = qn, C = c, b = a.length) : t === bi ? g > 0 && (y = bi, C = g, b = p.length) : (C = Math.max(c, g), y = C > 0 ? c > g ? qn : bi : null, b = y ? y === qn ? a.length : p.length : 0);
  const E = y === qn && /\b(transform|all)(,|$)/.test(r(`${qn}Property`).toString());
  return {
    type: y,
    timeout: C,
    propCount: b,
    hasTransform: E
  };
}
function mc(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => yc(n) + yc(e[r])));
}
function yc(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function ep() {
  return document.body.offsetHeight;
}
const tp = /* @__PURE__ */ new WeakMap(), np = /* @__PURE__ */ new WeakMap(), ly = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ gt({}, oy, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = la(), r = kd();
    let o, a;
    return Ki(() => {
      if (!o.length)
        return;
      const c = e.moveClass || `${e.name || "v"}-move`;
      if (!py(o[0].el, n.vnode.el, c))
        return;
      o.forEach(cy), o.forEach(fy);
      const d = o.filter(dy);
      ep(), d.forEach((p) => {
        const g = p.el, y = g.style;
        Pn(g, c), y.transform = y.webkitTransform = y.transitionDuration = "";
        const C = g._moveCb = (b) => {
          b && b.target !== g || (!b || /transform$/.test(b.propertyName)) && (g.removeEventListener("transitionend", C), g._moveCb = null, Yn(g, c));
        };
        g.addEventListener("transitionend", C);
      });
    }), () => {
      const c = qe(e), d = Qd(c);
      let p = c.tag || ft;
      o = a, a = t.default ? _l(t.default()) : [];
      for (let g = 0; g < a.length; g++) {
        const y = a[g];
        y.key != null && Hi(y, Fi(y, d, r, n));
      }
      if (o)
        for (let g = 0; g < o.length; g++) {
          const y = o[g];
          Hi(y, Fi(y, d, r, n)), tp.set(y, y.el.getBoundingClientRect());
        }
      return L(p, null, a);
    };
  }
}, uy = ly;
function cy(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function fy(e) {
  np.set(e, e.el.getBoundingClientRect());
}
function dy(e) {
  const t = tp.get(e), n = np.get(e), r = t.left - n.left, o = t.top - n.top;
  if (r || o) {
    const a = e.el.style;
    return a.transform = a.webkitTransform = `translate(${r}px,${o}px)`, a.transitionDuration = "0s", e;
  }
}
function py(e, t, n) {
  const r = e.cloneNode();
  e._vtc && e._vtc.forEach((c) => {
    c.split(/\s+/).forEach((d) => d && r.classList.remove(d));
  }), n.split(/\s+/).forEach((c) => c && r.classList.add(c)), r.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: a } = Zd(r);
  return o.removeChild(r), a;
}
const rp = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Ci(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), Ci(e, !0), r.enter(e)) : r.leave(e, () => {
      Ci(e, !1);
    }) : Ci(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ci(e, t);
  }
};
function Ci(e, t) {
  e.style.display = t ? e._vod : "none";
}
const hy = /* @__PURE__ */ gt({ patchProp: ry }, Um);
let bc;
function ip() {
  return bc || (bc = Cm(hy));
}
const qo = (...e) => {
  ip().render(...e);
}, vy = (...e) => {
  const t = ip().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = gy(r);
    if (!o)
      return;
    const a = t._component;
    !je(a) && !a.render && !a.template && (a.template = o.innerHTML), o.innerHTML = "";
    const c = n(o, !1, o instanceof SVGElement);
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), c;
  }, t;
};
function gy(e) {
  return dt(e) ? document.querySelector(e) : e;
}
var my = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function yy(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bs = {}, by = {
  get exports() {
    return Bs;
  },
  set exports(e) {
    Bs = e;
  }
};
/*!
 * jQuery JavaScript Library v3.6.3
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2022-12-20T21:28Z
 */
(function(e) {
  (function(t, n) {
    e.exports = t.document ? n(t, !0) : function(r) {
      if (!r.document)
        throw new Error("jQuery requires a window with a document");
      return n(r);
    };
  })(typeof window < "u" ? window : my, function(t, n) {
    var r = [], o = Object.getPrototypeOf, a = r.slice, c = r.flat ? function(i) {
      return r.flat.call(i);
    } : function(i) {
      return r.concat.apply([], i);
    }, d = r.push, p = r.indexOf, g = {}, y = g.toString, C = g.hasOwnProperty, b = C.toString, E = b.call(Object), w = {}, A = function(s) {
      return typeof s == "function" && typeof s.nodeType != "number" && typeof s.item != "function";
    }, D = function(s) {
      return s != null && s === s.window;
    }, N = t.document, I = {
      type: !0,
      src: !0,
      nonce: !0,
      noModule: !0
    };
    function F(i, s, l) {
      l = l || N;
      var f, h, v = l.createElement("script");
      if (v.text = i, s)
        for (f in I)
          h = s[f] || s.getAttribute && s.getAttribute(f), h && v.setAttribute(f, h);
      l.head.appendChild(v).parentNode.removeChild(v);
    }
    function J(i) {
      return i == null ? i + "" : typeof i == "object" || typeof i == "function" ? g[y.call(i)] || "object" : typeof i;
    }
    var B = "3.6.3", u = function(i, s) {
      return new u.fn.init(i, s);
    };
    u.fn = u.prototype = {
      // The current version of jQuery being used
      jquery: B,
      constructor: u,
      // The default length of a jQuery object is 0
      length: 0,
      toArray: function() {
        return a.call(this);
      },
      // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function(i) {
        return i == null ? a.call(this) : i < 0 ? this[i + this.length] : this[i];
      },
      // Take an array of elements and push it onto the stack
      // (returning the new matched element set)
      pushStack: function(i) {
        var s = u.merge(this.constructor(), i);
        return s.prevObject = this, s;
      },
      // Execute a callback for every element in the matched set.
      each: function(i) {
        return u.each(this, i);
      },
      map: function(i) {
        return this.pushStack(u.map(this, function(s, l) {
          return i.call(s, l, s);
        }));
      },
      slice: function() {
        return this.pushStack(a.apply(this, arguments));
      },
      first: function() {
        return this.eq(0);
      },
      last: function() {
        return this.eq(-1);
      },
      even: function() {
        return this.pushStack(u.grep(this, function(i, s) {
          return (s + 1) % 2;
        }));
      },
      odd: function() {
        return this.pushStack(u.grep(this, function(i, s) {
          return s % 2;
        }));
      },
      eq: function(i) {
        var s = this.length, l = +i + (i < 0 ? s : 0);
        return this.pushStack(l >= 0 && l < s ? [this[l]] : []);
      },
      end: function() {
        return this.prevObject || this.constructor();
      },
      // For internal use only.
      // Behaves like an Array's method, not like a jQuery method.
      push: d,
      sort: r.sort,
      splice: r.splice
    }, u.extend = u.fn.extend = function() {
      var i, s, l, f, h, v, m = arguments[0] || {}, O = 1, T = arguments.length, M = !1;
      for (typeof m == "boolean" && (M = m, m = arguments[O] || {}, O++), typeof m != "object" && !A(m) && (m = {}), O === T && (m = this, O--); O < T; O++)
        if ((i = arguments[O]) != null)
          for (s in i)
            f = i[s], !(s === "__proto__" || m === f) && (M && f && (u.isPlainObject(f) || (h = Array.isArray(f))) ? (l = m[s], h && !Array.isArray(l) ? v = [] : !h && !u.isPlainObject(l) ? v = {} : v = l, h = !1, m[s] = u.extend(M, v, f)) : f !== void 0 && (m[s] = f));
      return m;
    }, u.extend({
      // Unique for each copy of jQuery on the page
      expando: "jQuery" + (B + Math.random()).replace(/\D/g, ""),
      // Assume jQuery is ready without the ready module
      isReady: !0,
      error: function(i) {
        throw new Error(i);
      },
      noop: function() {
      },
      isPlainObject: function(i) {
        var s, l;
        return !i || y.call(i) !== "[object Object]" ? !1 : (s = o(i), s ? (l = C.call(s, "constructor") && s.constructor, typeof l == "function" && b.call(l) === E) : !0);
      },
      isEmptyObject: function(i) {
        var s;
        for (s in i)
          return !1;
        return !0;
      },
      // Evaluates a script in a provided context; falls back to the global one
      // if not specified.
      globalEval: function(i, s, l) {
        F(i, { nonce: s && s.nonce }, l);
      },
      each: function(i, s) {
        var l, f = 0;
        if (Y(i))
          for (l = i.length; f < l && s.call(i[f], f, i[f]) !== !1; f++)
            ;
        else
          for (f in i)
            if (s.call(i[f], f, i[f]) === !1)
              break;
        return i;
      },
      // results is for internal usage only
      makeArray: function(i, s) {
        var l = s || [];
        return i != null && (Y(Object(i)) ? u.merge(
          l,
          typeof i == "string" ? [i] : i
        ) : d.call(l, i)), l;
      },
      inArray: function(i, s, l) {
        return s == null ? -1 : p.call(s, i, l);
      },
      // Support: Android <=4.0 only, PhantomJS 1 only
      // push.apply(_, arraylike) throws on ancient WebKit
      merge: function(i, s) {
        for (var l = +s.length, f = 0, h = i.length; f < l; f++)
          i[h++] = s[f];
        return i.length = h, i;
      },
      grep: function(i, s, l) {
        for (var f, h = [], v = 0, m = i.length, O = !l; v < m; v++)
          f = !s(i[v], v), f !== O && h.push(i[v]);
        return h;
      },
      // arg is for internal usage only
      map: function(i, s, l) {
        var f, h, v = 0, m = [];
        if (Y(i))
          for (f = i.length; v < f; v++)
            h = s(i[v], v, l), h != null && m.push(h);
        else
          for (v in i)
            h = s(i[v], v, l), h != null && m.push(h);
        return c(m);
      },
      // A global GUID counter for objects
      guid: 1,
      // jQuery.support is not used in Core but other projects attach their
      // properties to it so it needs to exist.
      support: w
    }), typeof Symbol == "function" && (u.fn[Symbol.iterator] = r[Symbol.iterator]), u.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
      function(i, s) {
        g["[object " + s + "]"] = s.toLowerCase();
      }
    );
    function Y(i) {
      var s = !!i && "length" in i && i.length, l = J(i);
      return A(i) || D(i) ? !1 : l === "array" || s === 0 || typeof s == "number" && s > 0 && s - 1 in i;
    }
    var X = (
      /*!
       * Sizzle CSS Selector Engine v2.3.9
       * https://sizzlejs.com/
       *
       * Copyright JS Foundation and other contributors
       * Released under the MIT license
       * https://js.foundation/
       *
       * Date: 2022-12-19
       */
      function(i) {
        var s, l, f, h, v, m, O, T, M, H, ee, $, q, be, ke, ye, ut, st, jt, Ve = "sizzle" + 1 * new Date(), Ne = i.document, Nt = 0, Be = 0, rt = lo(), vi = lo(), oo = lo(), Dt = lo(), or = function(x, S) {
          return x === S && (ee = !0), 0;
        }, ar = {}.hasOwnProperty, kt = [], Bn = kt.pop, Yt = kt.push, Wn = kt.push, ku = kt.slice, sr = function(x, S) {
          for (var P = 0, z = x.length; P < z; P++)
            if (x[P] === S)
              return P;
          return -1;
        }, La = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ze = "[\\x20\\t\\r\\n\\f]", lr = "(?:\\\\[\\da-fA-F]{1,6}" + ze + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", Lu = "\\[" + ze + "*(" + lr + ")(?:" + ze + // Operator (capture 2)
        "*([*^$|!~]?=)" + ze + // "Attribute values must be CSS identifiers [capture 5]
        // or strings [capture 3 or capture 4]"
        `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + lr + "))|)" + ze + "*\\]", Ra = ":(" + lr + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + Lu + ")*)|.*)\\)|)", _v = new RegExp(ze + "+", "g"), ao = new RegExp("^" + ze + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ze + "+$", "g"), Av = new RegExp("^" + ze + "*," + ze + "*"), Ru = new RegExp("^" + ze + "*([>+~]|" + ze + ")" + ze + "*"), Pv = new RegExp(ze + "|>"), Nv = new RegExp(Ra), kv = new RegExp("^" + lr + "$"), so = {
          ID: new RegExp("^#(" + lr + ")"),
          CLASS: new RegExp("^\\.(" + lr + ")"),
          TAG: new RegExp("^(" + lr + "|[*])"),
          ATTR: new RegExp("^" + Lu),
          PSEUDO: new RegExp("^" + Ra),
          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ze + "*(even|odd|(([+-]|)(\\d*)n|)" + ze + "*(?:([+-]|)" + ze + "*(\\d+)|))" + ze + "*\\)|)", "i"),
          bool: new RegExp("^(?:" + La + ")$", "i"),
          // For use in libraries implementing .is()
          // We use this for POS matching in `select`
          needsContext: new RegExp("^" + ze + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ze + "*((?:-\\d)?\\d*)" + ze + "*\\)|)(?=[^-]|$)", "i")
        }, Lv = /HTML$/i, Rv = /^(?:input|select|textarea|button)$/i, Mv = /^h\d$/i, gi = /^[^{]+\{\s*\[native \w/, Iv = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Ma = /[+~]/, Sn = new RegExp("\\\\[\\da-fA-F]{1,6}" + ze + "?|\\\\([^\\r\\n\\f])", "g"), On = function(x, S) {
          var P = "0x" + x.slice(1) - 65536;
          return S || // Replace a hexadecimal escape sequence with the encoded Unicode code point
          // Support: IE <=11+
          // For values outside the Basic Multilingual Plane (BMP), manually construct a
          // surrogate pair
          (P < 0 ? String.fromCharCode(P + 65536) : String.fromCharCode(P >> 10 | 55296, P & 1023 | 56320));
        }, Mu = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, Iu = function(x, S) {
          return S ? x === "\0" ? "�" : x.slice(0, -1) + "\\" + x.charCodeAt(x.length - 1).toString(16) + " " : "\\" + x;
        }, ju = function() {
          $();
        }, jv = co(
          function(x) {
            return x.disabled === !0 && x.nodeName.toLowerCase() === "fieldset";
          },
          { dir: "parentNode", next: "legend" }
        );
        try {
          Wn.apply(
            kt = ku.call(Ne.childNodes),
            Ne.childNodes
          ), kt[Ne.childNodes.length].nodeType;
        } catch {
          Wn = {
            apply: kt.length ? (
              // Leverage slice if possible
              function(S, P) {
                Yt.apply(S, ku.call(P));
              }
            ) : (
              // Support: IE<9
              // Otherwise append directly
              function(S, P) {
                for (var z = S.length, R = 0; S[z++] = P[R++]; )
                  ;
                S.length = z - 1;
              }
            )
          };
        }
        function Ke(x, S, P, z) {
          var R, V, te, le, ce, Se, xe, _e = S && S.ownerDocument, De = S ? S.nodeType : 9;
          if (P = P || [], typeof x != "string" || !x || De !== 1 && De !== 9 && De !== 11)
            return P;
          if (!z && ($(S), S = S || q, ke)) {
            if (De !== 11 && (ce = Iv.exec(x)))
              if (R = ce[1]) {
                if (De === 9)
                  if (te = S.getElementById(R)) {
                    if (te.id === R)
                      return P.push(te), P;
                  } else
                    return P;
                else if (_e && (te = _e.getElementById(R)) && jt(S, te) && te.id === R)
                  return P.push(te), P;
              } else {
                if (ce[2])
                  return Wn.apply(P, S.getElementsByTagName(x)), P;
                if ((R = ce[3]) && l.getElementsByClassName && S.getElementsByClassName)
                  return Wn.apply(P, S.getElementsByClassName(R)), P;
              }
            if (l.qsa && !Dt[x + " "] && (!ye || !ye.test(x)) && // Support: IE 8 only
            // Exclude object elements
            (De !== 1 || S.nodeName.toLowerCase() !== "object")) {
              if (xe = x, _e = S, De === 1 && (Pv.test(x) || Ru.test(x))) {
                for (_e = Ma.test(x) && ja(S.parentNode) || S, (_e !== S || !l.scope) && ((le = S.getAttribute("id")) ? le = le.replace(Mu, Iu) : S.setAttribute("id", le = Ve)), Se = m(x), V = Se.length; V--; )
                  Se[V] = (le ? "#" + le : ":scope") + " " + uo(Se[V]);
                xe = Se.join(",");
              }
              try {
                if (l.cssSupportsSelector && // eslint-disable-next-line no-undef
                !CSS.supports("selector(:is(" + xe + "))"))
                  throw new Error();
                return Wn.apply(
                  P,
                  _e.querySelectorAll(xe)
                ), P;
              } catch {
                Dt(x, !0);
              } finally {
                le === Ve && S.removeAttribute("id");
              }
            }
          }
          return T(x.replace(ao, "$1"), S, P, z);
        }
        function lo() {
          var x = [];
          function S(P, z) {
            return x.push(P + " ") > f.cacheLength && delete S[x.shift()], S[P + " "] = z;
          }
          return S;
        }
        function rn(x) {
          return x[Ve] = !0, x;
        }
        function Xt(x) {
          var S = q.createElement("fieldset");
          try {
            return !!x(S);
          } catch {
            return !1;
          } finally {
            S.parentNode && S.parentNode.removeChild(S), S = null;
          }
        }
        function Ia(x, S) {
          for (var P = x.split("|"), z = P.length; z--; )
            f.attrHandle[P[z]] = S;
        }
        function Du(x, S) {
          var P = S && x, z = P && x.nodeType === 1 && S.nodeType === 1 && x.sourceIndex - S.sourceIndex;
          if (z)
            return z;
          if (P) {
            for (; P = P.nextSibling; )
              if (P === S)
                return -1;
          }
          return x ? 1 : -1;
        }
        function Dv(x) {
          return function(S) {
            var P = S.nodeName.toLowerCase();
            return P === "input" && S.type === x;
          };
        }
        function $v(x) {
          return function(S) {
            var P = S.nodeName.toLowerCase();
            return (P === "input" || P === "button") && S.type === x;
          };
        }
        function $u(x) {
          return function(S) {
            return "form" in S ? S.parentNode && S.disabled === !1 ? "label" in S ? "label" in S.parentNode ? S.parentNode.disabled === x : S.disabled === x : S.isDisabled === x || // Where there is no isDisabled, check manually
            /* jshint -W018 */
            S.isDisabled !== !x && jv(S) === x : S.disabled === x : "label" in S ? S.disabled === x : !1;
          };
        }
        function ur(x) {
          return rn(function(S) {
            return S = +S, rn(function(P, z) {
              for (var R, V = x([], P.length, S), te = V.length; te--; )
                P[R = V[te]] && (P[R] = !(z[R] = P[R]));
            });
          });
        }
        function ja(x) {
          return x && typeof x.getElementsByTagName < "u" && x;
        }
        l = Ke.support = {}, v = Ke.isXML = function(x) {
          var S = x && x.namespaceURI, P = x && (x.ownerDocument || x).documentElement;
          return !Lv.test(S || P && P.nodeName || "HTML");
        }, $ = Ke.setDocument = function(x) {
          var S, P, z = x ? x.ownerDocument || x : Ne;
          return z == q || z.nodeType !== 9 || !z.documentElement || (q = z, be = q.documentElement, ke = !v(q), Ne != q && (P = q.defaultView) && P.top !== P && (P.addEventListener ? P.addEventListener("unload", ju, !1) : P.attachEvent && P.attachEvent("onunload", ju)), l.scope = Xt(function(R) {
            return be.appendChild(R).appendChild(q.createElement("div")), typeof R.querySelectorAll < "u" && !R.querySelectorAll(":scope fieldset div").length;
          }), l.cssSupportsSelector = Xt(function() {
            return CSS.supports("selector(*)") && // Support: Firefox 78-81 only
            // In old Firefox, `:is()` didn't use forgiving parsing. In that case,
            // fail this test as there's no selector to test against that.
            // `CSS.supports` uses unforgiving parsing
            q.querySelectorAll(":is(:jqfake)") && // `*` is needed as Safari & newer Chrome implemented something in between
            // for `:has()` - it throws in `qSA` if it only contains an unsupported
            // argument but multiple ones, one of which is supported, are fine.
            // We want to play safe in case `:is()` gets the same treatment.
            !CSS.supports("selector(:is(*,:jqfake))");
          }), l.attributes = Xt(function(R) {
            return R.className = "i", !R.getAttribute("className");
          }), l.getElementsByTagName = Xt(function(R) {
            return R.appendChild(q.createComment("")), !R.getElementsByTagName("*").length;
          }), l.getElementsByClassName = gi.test(q.getElementsByClassName), l.getById = Xt(function(R) {
            return be.appendChild(R).id = Ve, !q.getElementsByName || !q.getElementsByName(Ve).length;
          }), l.getById ? (f.filter.ID = function(R) {
            var V = R.replace(Sn, On);
            return function(te) {
              return te.getAttribute("id") === V;
            };
          }, f.find.ID = function(R, V) {
            if (typeof V.getElementById < "u" && ke) {
              var te = V.getElementById(R);
              return te ? [te] : [];
            }
          }) : (f.filter.ID = function(R) {
            var V = R.replace(Sn, On);
            return function(te) {
              var le = typeof te.getAttributeNode < "u" && te.getAttributeNode("id");
              return le && le.value === V;
            };
          }, f.find.ID = function(R, V) {
            if (typeof V.getElementById < "u" && ke) {
              var te, le, ce, Se = V.getElementById(R);
              if (Se) {
                if (te = Se.getAttributeNode("id"), te && te.value === R)
                  return [Se];
                for (ce = V.getElementsByName(R), le = 0; Se = ce[le++]; )
                  if (te = Se.getAttributeNode("id"), te && te.value === R)
                    return [Se];
              }
              return [];
            }
          }), f.find.TAG = l.getElementsByTagName ? function(R, V) {
            if (typeof V.getElementsByTagName < "u")
              return V.getElementsByTagName(R);
            if (l.qsa)
              return V.querySelectorAll(R);
          } : function(R, V) {
            var te, le = [], ce = 0, Se = V.getElementsByTagName(R);
            if (R === "*") {
              for (; te = Se[ce++]; )
                te.nodeType === 1 && le.push(te);
              return le;
            }
            return Se;
          }, f.find.CLASS = l.getElementsByClassName && function(R, V) {
            if (typeof V.getElementsByClassName < "u" && ke)
              return V.getElementsByClassName(R);
          }, ut = [], ye = [], (l.qsa = gi.test(q.querySelectorAll)) && (Xt(function(R) {
            var V;
            be.appendChild(R).innerHTML = "<a id='" + Ve + "'></a><select id='" + Ve + "-\r\\' msallowcapture=''><option selected=''></option></select>", R.querySelectorAll("[msallowcapture^='']").length && ye.push("[*^$]=" + ze + `*(?:''|"")`), R.querySelectorAll("[selected]").length || ye.push("\\[" + ze + "*(?:value|" + La + ")"), R.querySelectorAll("[id~=" + Ve + "-]").length || ye.push("~="), V = q.createElement("input"), V.setAttribute("name", ""), R.appendChild(V), R.querySelectorAll("[name='']").length || ye.push("\\[" + ze + "*name" + ze + "*=" + ze + `*(?:''|"")`), R.querySelectorAll(":checked").length || ye.push(":checked"), R.querySelectorAll("a#" + Ve + "+*").length || ye.push(".#.+[+~]"), R.querySelectorAll("\\\f"), ye.push("[\\r\\n\\f]");
          }), Xt(function(R) {
            R.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
            var V = q.createElement("input");
            V.setAttribute("type", "hidden"), R.appendChild(V).setAttribute("name", "D"), R.querySelectorAll("[name=d]").length && ye.push("name" + ze + "*[*^$|!~]?="), R.querySelectorAll(":enabled").length !== 2 && ye.push(":enabled", ":disabled"), be.appendChild(R).disabled = !0, R.querySelectorAll(":disabled").length !== 2 && ye.push(":enabled", ":disabled"), R.querySelectorAll("*,:x"), ye.push(",.*:");
          })), (l.matchesSelector = gi.test(st = be.matches || be.webkitMatchesSelector || be.mozMatchesSelector || be.oMatchesSelector || be.msMatchesSelector)) && Xt(function(R) {
            l.disconnectedMatch = st.call(R, "*"), st.call(R, "[s!='']:x"), ut.push("!=", Ra);
          }), l.cssSupportsSelector || ye.push(":has"), ye = ye.length && new RegExp(ye.join("|")), ut = ut.length && new RegExp(ut.join("|")), S = gi.test(be.compareDocumentPosition), jt = S || gi.test(be.contains) ? function(R, V) {
            var te = R.nodeType === 9 && R.documentElement || R, le = V && V.parentNode;
            return R === le || !!(le && le.nodeType === 1 && (te.contains ? te.contains(le) : R.compareDocumentPosition && R.compareDocumentPosition(le) & 16));
          } : function(R, V) {
            if (V) {
              for (; V = V.parentNode; )
                if (V === R)
                  return !0;
            }
            return !1;
          }, or = S ? function(R, V) {
            if (R === V)
              return ee = !0, 0;
            var te = !R.compareDocumentPosition - !V.compareDocumentPosition;
            return te || (te = (R.ownerDocument || R) == (V.ownerDocument || V) ? R.compareDocumentPosition(V) : (
              // Otherwise we know they are disconnected
              1
            ), te & 1 || !l.sortDetached && V.compareDocumentPosition(R) === te ? R == q || R.ownerDocument == Ne && jt(Ne, R) ? -1 : V == q || V.ownerDocument == Ne && jt(Ne, V) ? 1 : H ? sr(H, R) - sr(H, V) : 0 : te & 4 ? -1 : 1);
          } : function(R, V) {
            if (R === V)
              return ee = !0, 0;
            var te, le = 0, ce = R.parentNode, Se = V.parentNode, xe = [R], _e = [V];
            if (!ce || !Se)
              return R == q ? -1 : V == q ? 1 : (
                /* eslint-enable eqeqeq */
                ce ? -1 : Se ? 1 : H ? sr(H, R) - sr(H, V) : 0
              );
            if (ce === Se)
              return Du(R, V);
            for (te = R; te = te.parentNode; )
              xe.unshift(te);
            for (te = V; te = te.parentNode; )
              _e.unshift(te);
            for (; xe[le] === _e[le]; )
              le++;
            return le ? (
              // Do a sibling check if the nodes have a common ancestor
              Du(xe[le], _e[le])
            ) : (
              // Otherwise nodes in our document sort first
              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
              // two documents; shallow comparisons work.
              /* eslint-disable eqeqeq */
              xe[le] == Ne ? -1 : _e[le] == Ne ? 1 : (
                /* eslint-enable eqeqeq */
                0
              )
            );
          }), q;
        }, Ke.matches = function(x, S) {
          return Ke(x, null, null, S);
        }, Ke.matchesSelector = function(x, S) {
          if ($(x), l.matchesSelector && ke && !Dt[S + " "] && (!ut || !ut.test(S)) && (!ye || !ye.test(S)))
            try {
              var P = st.call(x, S);
              if (P || l.disconnectedMatch || // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              x.document && x.document.nodeType !== 11)
                return P;
            } catch {
              Dt(S, !0);
            }
          return Ke(S, q, null, [x]).length > 0;
        }, Ke.contains = function(x, S) {
          return (x.ownerDocument || x) != q && $(x), jt(x, S);
        }, Ke.attr = function(x, S) {
          (x.ownerDocument || x) != q && $(x);
          var P = f.attrHandle[S.toLowerCase()], z = P && ar.call(f.attrHandle, S.toLowerCase()) ? P(x, S, !ke) : void 0;
          return z !== void 0 ? z : l.attributes || !ke ? x.getAttribute(S) : (z = x.getAttributeNode(S)) && z.specified ? z.value : null;
        }, Ke.escape = function(x) {
          return (x + "").replace(Mu, Iu);
        }, Ke.error = function(x) {
          throw new Error("Syntax error, unrecognized expression: " + x);
        }, Ke.uniqueSort = function(x) {
          var S, P = [], z = 0, R = 0;
          if (ee = !l.detectDuplicates, H = !l.sortStable && x.slice(0), x.sort(or), ee) {
            for (; S = x[R++]; )
              S === x[R] && (z = P.push(R));
            for (; z--; )
              x.splice(P[z], 1);
          }
          return H = null, x;
        }, h = Ke.getText = function(x) {
          var S, P = "", z = 0, R = x.nodeType;
          if (R) {
            if (R === 1 || R === 9 || R === 11) {
              if (typeof x.textContent == "string")
                return x.textContent;
              for (x = x.firstChild; x; x = x.nextSibling)
                P += h(x);
            } else if (R === 3 || R === 4)
              return x.nodeValue;
          } else
            for (; S = x[z++]; )
              P += h(S);
          return P;
        }, f = Ke.selectors = {
          // Can be adjusted by the user
          cacheLength: 50,
          createPseudo: rn,
          match: so,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" }
          },
          preFilter: {
            ATTR: function(x) {
              return x[1] = x[1].replace(Sn, On), x[3] = (x[3] || x[4] || x[5] || "").replace(Sn, On), x[2] === "~=" && (x[3] = " " + x[3] + " "), x.slice(0, 4);
            },
            CHILD: function(x) {
              return x[1] = x[1].toLowerCase(), x[1].slice(0, 3) === "nth" ? (x[3] || Ke.error(x[0]), x[4] = +(x[4] ? x[5] + (x[6] || 1) : 2 * (x[3] === "even" || x[3] === "odd")), x[5] = +(x[7] + x[8] || x[3] === "odd")) : x[3] && Ke.error(x[0]), x;
            },
            PSEUDO: function(x) {
              var S, P = !x[6] && x[2];
              return so.CHILD.test(x[0]) ? null : (x[3] ? x[2] = x[4] || x[5] || "" : P && Nv.test(P) && // Get excess from tokenize (recursively)
              (S = m(P, !0)) && // advance to the next closing parenthesis
              (S = P.indexOf(")", P.length - S) - P.length) && (x[0] = x[0].slice(0, S), x[2] = P.slice(0, S)), x.slice(0, 3));
            }
          },
          filter: {
            TAG: function(x) {
              var S = x.replace(Sn, On).toLowerCase();
              return x === "*" ? function() {
                return !0;
              } : function(P) {
                return P.nodeName && P.nodeName.toLowerCase() === S;
              };
            },
            CLASS: function(x) {
              var S = rt[x + " "];
              return S || (S = new RegExp("(^|" + ze + ")" + x + "(" + ze + "|$)")) && rt(
                x,
                function(P) {
                  return S.test(
                    typeof P.className == "string" && P.className || typeof P.getAttribute < "u" && P.getAttribute("class") || ""
                  );
                }
              );
            },
            ATTR: function(x, S, P) {
              return function(z) {
                var R = Ke.attr(z, x);
                return R == null ? S === "!=" : S ? (R += "", S === "=" ? R === P : S === "!=" ? R !== P : S === "^=" ? P && R.indexOf(P) === 0 : S === "*=" ? P && R.indexOf(P) > -1 : S === "$=" ? P && R.slice(-P.length) === P : S === "~=" ? (" " + R.replace(_v, " ") + " ").indexOf(P) > -1 : S === "|=" ? R === P || R.slice(0, P.length + 1) === P + "-" : !1) : !0;
              };
            },
            CHILD: function(x, S, P, z, R) {
              var V = x.slice(0, 3) !== "nth", te = x.slice(-4) !== "last", le = S === "of-type";
              return z === 1 && R === 0 ? (
                // Shortcut for :nth-*(n)
                function(ce) {
                  return !!ce.parentNode;
                }
              ) : function(ce, Se, xe) {
                var _e, De, Ge, Oe, ct, wt, $t = V !== te ? "nextSibling" : "previousSibling", et = ce.parentNode, mi = le && ce.nodeName.toLowerCase(), yi = !xe && !le, Ft = !1;
                if (et) {
                  if (V) {
                    for (; $t; ) {
                      for (Oe = ce; Oe = Oe[$t]; )
                        if (le ? Oe.nodeName.toLowerCase() === mi : Oe.nodeType === 1)
                          return !1;
                      wt = $t = x === "only" && !wt && "nextSibling";
                    }
                    return !0;
                  }
                  if (wt = [te ? et.firstChild : et.lastChild], te && yi) {
                    for (Oe = et, Ge = Oe[Ve] || (Oe[Ve] = {}), De = Ge[Oe.uniqueID] || (Ge[Oe.uniqueID] = {}), _e = De[x] || [], ct = _e[0] === Nt && _e[1], Ft = ct && _e[2], Oe = ct && et.childNodes[ct]; Oe = ++ct && Oe && Oe[$t] || // Fallback to seeking `elem` from the start
                    (Ft = ct = 0) || wt.pop(); )
                      if (Oe.nodeType === 1 && ++Ft && Oe === ce) {
                        De[x] = [Nt, ct, Ft];
                        break;
                      }
                  } else if (yi && (Oe = ce, Ge = Oe[Ve] || (Oe[Ve] = {}), De = Ge[Oe.uniqueID] || (Ge[Oe.uniqueID] = {}), _e = De[x] || [], ct = _e[0] === Nt && _e[1], Ft = ct), Ft === !1)
                    for (; (Oe = ++ct && Oe && Oe[$t] || (Ft = ct = 0) || wt.pop()) && !((le ? Oe.nodeName.toLowerCase() === mi : Oe.nodeType === 1) && ++Ft && (yi && (Ge = Oe[Ve] || (Oe[Ve] = {}), De = Ge[Oe.uniqueID] || (Ge[Oe.uniqueID] = {}), De[x] = [Nt, Ft]), Oe === ce)); )
                      ;
                  return Ft -= R, Ft === z || Ft % z === 0 && Ft / z >= 0;
                }
              };
            },
            PSEUDO: function(x, S) {
              var P, z = f.pseudos[x] || f.setFilters[x.toLowerCase()] || Ke.error("unsupported pseudo: " + x);
              return z[Ve] ? z(S) : z.length > 1 ? (P = [x, x, "", S], f.setFilters.hasOwnProperty(x.toLowerCase()) ? rn(function(R, V) {
                for (var te, le = z(R, S), ce = le.length; ce--; )
                  te = sr(R, le[ce]), R[te] = !(V[te] = le[ce]);
              }) : function(R) {
                return z(R, 0, P);
              }) : z;
            }
          },
          pseudos: {
            // Potentially complex pseudos
            not: rn(function(x) {
              var S = [], P = [], z = O(x.replace(ao, "$1"));
              return z[Ve] ? rn(function(R, V, te, le) {
                for (var ce, Se = z(R, null, le, []), xe = R.length; xe--; )
                  (ce = Se[xe]) && (R[xe] = !(V[xe] = ce));
              }) : function(R, V, te) {
                return S[0] = R, z(S, null, te, P), S[0] = null, !P.pop();
              };
            }),
            has: rn(function(x) {
              return function(S) {
                return Ke(x, S).length > 0;
              };
            }),
            contains: rn(function(x) {
              return x = x.replace(Sn, On), function(S) {
                return (S.textContent || h(S)).indexOf(x) > -1;
              };
            }),
            // "Whether an element is represented by a :lang() selector
            // is based solely on the element's language value
            // being equal to the identifier C,
            // or beginning with the identifier C immediately followed by "-".
            // The matching of C against the element's language value is performed case-insensitively.
            // The identifier C does not have to be a valid language name."
            // http://www.w3.org/TR/selectors/#lang-pseudo
            lang: rn(function(x) {
              return kv.test(x || "") || Ke.error("unsupported lang: " + x), x = x.replace(Sn, On).toLowerCase(), function(S) {
                var P;
                do
                  if (P = ke ? S.lang : S.getAttribute("xml:lang") || S.getAttribute("lang"))
                    return P = P.toLowerCase(), P === x || P.indexOf(x + "-") === 0;
                while ((S = S.parentNode) && S.nodeType === 1);
                return !1;
              };
            }),
            // Miscellaneous
            target: function(x) {
              var S = i.location && i.location.hash;
              return S && S.slice(1) === x.id;
            },
            root: function(x) {
              return x === be;
            },
            focus: function(x) {
              return x === q.activeElement && (!q.hasFocus || q.hasFocus()) && !!(x.type || x.href || ~x.tabIndex);
            },
            // Boolean properties
            enabled: $u(!1),
            disabled: $u(!0),
            checked: function(x) {
              var S = x.nodeName.toLowerCase();
              return S === "input" && !!x.checked || S === "option" && !!x.selected;
            },
            selected: function(x) {
              return x.parentNode && x.parentNode.selectedIndex, x.selected === !0;
            },
            // Contents
            empty: function(x) {
              for (x = x.firstChild; x; x = x.nextSibling)
                if (x.nodeType < 6)
                  return !1;
              return !0;
            },
            parent: function(x) {
              return !f.pseudos.empty(x);
            },
            // Element/input types
            header: function(x) {
              return Mv.test(x.nodeName);
            },
            input: function(x) {
              return Rv.test(x.nodeName);
            },
            button: function(x) {
              var S = x.nodeName.toLowerCase();
              return S === "input" && x.type === "button" || S === "button";
            },
            text: function(x) {
              var S;
              return x.nodeName.toLowerCase() === "input" && x.type === "text" && // Support: IE <10 only
              // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
              ((S = x.getAttribute("type")) == null || S.toLowerCase() === "text");
            },
            // Position-in-collection
            first: ur(function() {
              return [0];
            }),
            last: ur(function(x, S) {
              return [S - 1];
            }),
            eq: ur(function(x, S, P) {
              return [P < 0 ? P + S : P];
            }),
            even: ur(function(x, S) {
              for (var P = 0; P < S; P += 2)
                x.push(P);
              return x;
            }),
            odd: ur(function(x, S) {
              for (var P = 1; P < S; P += 2)
                x.push(P);
              return x;
            }),
            lt: ur(function(x, S, P) {
              for (var z = P < 0 ? P + S : P > S ? S : P; --z >= 0; )
                x.push(z);
              return x;
            }),
            gt: ur(function(x, S, P) {
              for (var z = P < 0 ? P + S : P; ++z < S; )
                x.push(z);
              return x;
            })
          }
        }, f.pseudos.nth = f.pseudos.eq;
        for (s in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
          f.pseudos[s] = Dv(s);
        for (s in { submit: !0, reset: !0 })
          f.pseudos[s] = $v(s);
        function Fu() {
        }
        Fu.prototype = f.filters = f.pseudos, f.setFilters = new Fu(), m = Ke.tokenize = function(x, S) {
          var P, z, R, V, te, le, ce, Se = vi[x + " "];
          if (Se)
            return S ? 0 : Se.slice(0);
          for (te = x, le = [], ce = f.preFilter; te; ) {
            (!P || (z = Av.exec(te))) && (z && (te = te.slice(z[0].length) || te), le.push(R = [])), P = !1, (z = Ru.exec(te)) && (P = z.shift(), R.push({
              value: P,
              // Cast descendant combinators to space
              type: z[0].replace(ao, " ")
            }), te = te.slice(P.length));
            for (V in f.filter)
              (z = so[V].exec(te)) && (!ce[V] || (z = ce[V](z))) && (P = z.shift(), R.push({
                value: P,
                type: V,
                matches: z
              }), te = te.slice(P.length));
            if (!P)
              break;
          }
          return S ? te.length : te ? Ke.error(x) : (
            // Cache the tokens
            vi(x, le).slice(0)
          );
        };
        function uo(x) {
          for (var S = 0, P = x.length, z = ""; S < P; S++)
            z += x[S].value;
          return z;
        }
        function co(x, S, P) {
          var z = S.dir, R = S.next, V = R || z, te = P && V === "parentNode", le = Be++;
          return S.first ? (
            // Check against closest ancestor/preceding element
            function(ce, Se, xe) {
              for (; ce = ce[z]; )
                if (ce.nodeType === 1 || te)
                  return x(ce, Se, xe);
              return !1;
            }
          ) : (
            // Check against all ancestor/preceding elements
            function(ce, Se, xe) {
              var _e, De, Ge, Oe = [Nt, le];
              if (xe) {
                for (; ce = ce[z]; )
                  if ((ce.nodeType === 1 || te) && x(ce, Se, xe))
                    return !0;
              } else
                for (; ce = ce[z]; )
                  if (ce.nodeType === 1 || te)
                    if (Ge = ce[Ve] || (ce[Ve] = {}), De = Ge[ce.uniqueID] || (Ge[ce.uniqueID] = {}), R && R === ce.nodeName.toLowerCase())
                      ce = ce[z] || ce;
                    else {
                      if ((_e = De[V]) && _e[0] === Nt && _e[1] === le)
                        return Oe[2] = _e[2];
                      if (De[V] = Oe, Oe[2] = x(ce, Se, xe))
                        return !0;
                    }
              return !1;
            }
          );
        }
        function Da(x) {
          return x.length > 1 ? function(S, P, z) {
            for (var R = x.length; R--; )
              if (!x[R](S, P, z))
                return !1;
            return !0;
          } : x[0];
        }
        function Fv(x, S, P) {
          for (var z = 0, R = S.length; z < R; z++)
            Ke(x, S[z], P);
          return P;
        }
        function fo(x, S, P, z, R) {
          for (var V, te = [], le = 0, ce = x.length, Se = S != null; le < ce; le++)
            (V = x[le]) && (!P || P(V, z, R)) && (te.push(V), Se && S.push(le));
          return te;
        }
        function $a(x, S, P, z, R, V) {
          return z && !z[Ve] && (z = $a(z)), R && !R[Ve] && (R = $a(R, V)), rn(function(te, le, ce, Se) {
            var xe, _e, De, Ge = [], Oe = [], ct = le.length, wt = te || Fv(
              S || "*",
              ce.nodeType ? [ce] : ce,
              []
            ), $t = x && (te || !S) ? fo(wt, Ge, x, ce, Se) : wt, et = P ? (
              // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
              R || (te ? x : ct || z) ? (
                // ...intermediate processing is necessary
                []
              ) : (
                // ...otherwise use results directly
                le
              )
            ) : $t;
            if (P && P($t, et, ce, Se), z)
              for (xe = fo(et, Oe), z(xe, [], ce, Se), _e = xe.length; _e--; )
                (De = xe[_e]) && (et[Oe[_e]] = !($t[Oe[_e]] = De));
            if (te) {
              if (R || x) {
                if (R) {
                  for (xe = [], _e = et.length; _e--; )
                    (De = et[_e]) && xe.push($t[_e] = De);
                  R(null, et = [], xe, Se);
                }
                for (_e = et.length; _e--; )
                  (De = et[_e]) && (xe = R ? sr(te, De) : Ge[_e]) > -1 && (te[xe] = !(le[xe] = De));
              }
            } else
              et = fo(
                et === le ? et.splice(ct, et.length) : et
              ), R ? R(null, le, et, Se) : Wn.apply(le, et);
          });
        }
        function Fa(x) {
          for (var S, P, z, R = x.length, V = f.relative[x[0].type], te = V || f.relative[" "], le = V ? 1 : 0, ce = co(function(_e) {
            return _e === S;
          }, te, !0), Se = co(function(_e) {
            return sr(S, _e) > -1;
          }, te, !0), xe = [function(_e, De, Ge) {
            var Oe = !V && (Ge || De !== M) || ((S = De).nodeType ? ce(_e, De, Ge) : Se(_e, De, Ge));
            return S = null, Oe;
          }]; le < R; le++)
            if (P = f.relative[x[le].type])
              xe = [co(Da(xe), P)];
            else {
              if (P = f.filter[x[le].type].apply(null, x[le].matches), P[Ve]) {
                for (z = ++le; z < R && !f.relative[x[z].type]; z++)
                  ;
                return $a(
                  le > 1 && Da(xe),
                  le > 1 && uo(
                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                    x.slice(0, le - 1).concat({ value: x[le - 2].type === " " ? "*" : "" })
                  ).replace(ao, "$1"),
                  P,
                  le < z && Fa(x.slice(le, z)),
                  z < R && Fa(x = x.slice(z)),
                  z < R && uo(x)
                );
              }
              xe.push(P);
            }
          return Da(xe);
        }
        function Hv(x, S) {
          var P = S.length > 0, z = x.length > 0, R = function(V, te, le, ce, Se) {
            var xe, _e, De, Ge = 0, Oe = "0", ct = V && [], wt = [], $t = M, et = V || z && f.find.TAG("*", Se), mi = Nt += $t == null ? 1 : Math.random() || 0.1, yi = et.length;
            for (Se && (M = te == q || te || Se); Oe !== yi && (xe = et[Oe]) != null; Oe++) {
              if (z && xe) {
                for (_e = 0, !te && xe.ownerDocument != q && ($(xe), le = !ke); De = x[_e++]; )
                  if (De(xe, te || q, le)) {
                    ce.push(xe);
                    break;
                  }
                Se && (Nt = mi);
              }
              P && ((xe = !De && xe) && Ge--, V && ct.push(xe));
            }
            if (Ge += Oe, P && Oe !== Ge) {
              for (_e = 0; De = S[_e++]; )
                De(ct, wt, te, le);
              if (V) {
                if (Ge > 0)
                  for (; Oe--; )
                    ct[Oe] || wt[Oe] || (wt[Oe] = Bn.call(ce));
                wt = fo(wt);
              }
              Wn.apply(ce, wt), Se && !V && wt.length > 0 && Ge + S.length > 1 && Ke.uniqueSort(ce);
            }
            return Se && (Nt = mi, M = $t), ct;
          };
          return P ? rn(R) : R;
        }
        return O = Ke.compile = function(x, S) {
          var P, z = [], R = [], V = oo[x + " "];
          if (!V) {
            for (S || (S = m(x)), P = S.length; P--; )
              V = Fa(S[P]), V[Ve] ? z.push(V) : R.push(V);
            V = oo(
              x,
              Hv(R, z)
            ), V.selector = x;
          }
          return V;
        }, T = Ke.select = function(x, S, P, z) {
          var R, V, te, le, ce, Se = typeof x == "function" && x, xe = !z && m(x = Se.selector || x);
          if (P = P || [], xe.length === 1) {
            if (V = xe[0] = xe[0].slice(0), V.length > 2 && (te = V[0]).type === "ID" && S.nodeType === 9 && ke && f.relative[V[1].type]) {
              if (S = (f.find.ID(te.matches[0].replace(Sn, On), S) || [])[0], S)
                Se && (S = S.parentNode);
              else
                return P;
              x = x.slice(V.shift().value.length);
            }
            for (R = so.needsContext.test(x) ? 0 : V.length; R-- && (te = V[R], !f.relative[le = te.type]); )
              if ((ce = f.find[le]) && (z = ce(
                te.matches[0].replace(Sn, On),
                Ma.test(V[0].type) && ja(S.parentNode) || S
              ))) {
                if (V.splice(R, 1), x = z.length && uo(V), !x)
                  return Wn.apply(P, z), P;
                break;
              }
          }
          return (Se || O(x, xe))(
            z,
            S,
            !ke,
            P,
            !S || Ma.test(x) && ja(S.parentNode) || S
          ), P;
        }, l.sortStable = Ve.split("").sort(or).join("") === Ve, l.detectDuplicates = !!ee, $(), l.sortDetached = Xt(function(x) {
          return x.compareDocumentPosition(q.createElement("fieldset")) & 1;
        }), Xt(function(x) {
          return x.innerHTML = "<a href='#'></a>", x.firstChild.getAttribute("href") === "#";
        }) || Ia("type|href|height|width", function(x, S, P) {
          if (!P)
            return x.getAttribute(S, S.toLowerCase() === "type" ? 1 : 2);
        }), (!l.attributes || !Xt(function(x) {
          return x.innerHTML = "<input/>", x.firstChild.setAttribute("value", ""), x.firstChild.getAttribute("value") === "";
        })) && Ia("value", function(x, S, P) {
          if (!P && x.nodeName.toLowerCase() === "input")
            return x.defaultValue;
        }), Xt(function(x) {
          return x.getAttribute("disabled") == null;
        }) || Ia(La, function(x, S, P) {
          var z;
          if (!P)
            return x[S] === !0 ? S.toLowerCase() : (z = x.getAttributeNode(S)) && z.specified ? z.value : null;
        }), Ke;
      }(t)
    );
    u.find = X, u.expr = X.selectors, u.expr[":"] = u.expr.pseudos, u.uniqueSort = u.unique = X.uniqueSort, u.text = X.getText, u.isXMLDoc = X.isXML, u.contains = X.contains, u.escapeSelector = X.escape;
    var oe = function(i, s, l) {
      for (var f = [], h = l !== void 0; (i = i[s]) && i.nodeType !== 9; )
        if (i.nodeType === 1) {
          if (h && u(i).is(l))
            break;
          f.push(i);
        }
      return f;
    }, fe = function(i, s) {
      for (var l = []; i; i = i.nextSibling)
        i.nodeType === 1 && i !== s && l.push(i);
      return l;
    }, we = u.expr.match.needsContext;
    function Q(i, s) {
      return i.nodeName && i.nodeName.toLowerCase() === s.toLowerCase();
    }
    var pe = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function Ie(i, s, l) {
      return A(s) ? u.grep(i, function(f, h) {
        return !!s.call(f, h, f) !== l;
      }) : s.nodeType ? u.grep(i, function(f) {
        return f === s !== l;
      }) : typeof s != "string" ? u.grep(i, function(f) {
        return p.call(s, f) > -1 !== l;
      }) : u.filter(s, i, l);
    }
    u.filter = function(i, s, l) {
      var f = s[0];
      return l && (i = ":not(" + i + ")"), s.length === 1 && f.nodeType === 1 ? u.find.matchesSelector(f, i) ? [f] : [] : u.find.matches(i, u.grep(s, function(h) {
        return h.nodeType === 1;
      }));
    }, u.fn.extend({
      find: function(i) {
        var s, l, f = this.length, h = this;
        if (typeof i != "string")
          return this.pushStack(u(i).filter(function() {
            for (s = 0; s < f; s++)
              if (u.contains(h[s], this))
                return !0;
          }));
        for (l = this.pushStack([]), s = 0; s < f; s++)
          u.find(i, h[s], l);
        return f > 1 ? u.uniqueSort(l) : l;
      },
      filter: function(i) {
        return this.pushStack(Ie(this, i || [], !1));
      },
      not: function(i) {
        return this.pushStack(Ie(this, i || [], !0));
      },
      is: function(i) {
        return !!Ie(
          this,
          // If this is a positional/relative selector, check membership in the returned set
          // so $("p:first").is("p:last") won't return true for a doc with two "p".
          typeof i == "string" && we.test(i) ? u(i) : i || [],
          !1
        ).length;
      }
    });
    var ie, U = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, K = u.fn.init = function(i, s, l) {
      var f, h;
      if (!i)
        return this;
      if (l = l || ie, typeof i == "string")
        if (i[0] === "<" && i[i.length - 1] === ">" && i.length >= 3 ? f = [null, i, null] : f = U.exec(i), f && (f[1] || !s))
          if (f[1]) {
            if (s = s instanceof u ? s[0] : s, u.merge(this, u.parseHTML(
              f[1],
              s && s.nodeType ? s.ownerDocument || s : N,
              !0
            )), pe.test(f[1]) && u.isPlainObject(s))
              for (f in s)
                A(this[f]) ? this[f](s[f]) : this.attr(f, s[f]);
            return this;
          } else
            return h = N.getElementById(f[2]), h && (this[0] = h, this.length = 1), this;
        else
          return !s || s.jquery ? (s || l).find(i) : this.constructor(s).find(i);
      else {
        if (i.nodeType)
          return this[0] = i, this.length = 1, this;
        if (A(i))
          return l.ready !== void 0 ? l.ready(i) : (
            // Execute immediately if ready is not present
            i(u)
          );
      }
      return u.makeArray(i, this);
    };
    K.prototype = u.fn, ie = u(N);
    var se = /^(?:parents|prev(?:Until|All))/, me = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
    u.fn.extend({
      has: function(i) {
        var s = u(i, this), l = s.length;
        return this.filter(function() {
          for (var f = 0; f < l; f++)
            if (u.contains(this, s[f]))
              return !0;
        });
      },
      closest: function(i, s) {
        var l, f = 0, h = this.length, v = [], m = typeof i != "string" && u(i);
        if (!we.test(i)) {
          for (; f < h; f++)
            for (l = this[f]; l && l !== s; l = l.parentNode)
              if (l.nodeType < 11 && (m ? m.index(l) > -1 : (
                // Don't pass non-elements to Sizzle
                l.nodeType === 1 && u.find.matchesSelector(l, i)
              ))) {
                v.push(l);
                break;
              }
        }
        return this.pushStack(v.length > 1 ? u.uniqueSort(v) : v);
      },
      // Determine the position of an element within the set
      index: function(i) {
        return i ? typeof i == "string" ? p.call(u(i), this[0]) : p.call(
          this,
          // If it receives a jQuery object, the first element is used
          i.jquery ? i[0] : i
        ) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      },
      add: function(i, s) {
        return this.pushStack(
          u.uniqueSort(
            u.merge(this.get(), u(i, s))
          )
        );
      },
      addBack: function(i) {
        return this.add(
          i == null ? this.prevObject : this.prevObject.filter(i)
        );
      }
    });
    function ve(i, s) {
      for (; (i = i[s]) && i.nodeType !== 1; )
        ;
      return i;
    }
    u.each({
      parent: function(i) {
        var s = i.parentNode;
        return s && s.nodeType !== 11 ? s : null;
      },
      parents: function(i) {
        return oe(i, "parentNode");
      },
      parentsUntil: function(i, s, l) {
        return oe(i, "parentNode", l);
      },
      next: function(i) {
        return ve(i, "nextSibling");
      },
      prev: function(i) {
        return ve(i, "previousSibling");
      },
      nextAll: function(i) {
        return oe(i, "nextSibling");
      },
      prevAll: function(i) {
        return oe(i, "previousSibling");
      },
      nextUntil: function(i, s, l) {
        return oe(i, "nextSibling", l);
      },
      prevUntil: function(i, s, l) {
        return oe(i, "previousSibling", l);
      },
      siblings: function(i) {
        return fe((i.parentNode || {}).firstChild, i);
      },
      children: function(i) {
        return fe(i.firstChild);
      },
      contents: function(i) {
        return i.contentDocument != null && // Support: IE 11+
        // <object> elements with no `data` attribute has an object
        // `contentDocument` with a `null` prototype.
        o(i.contentDocument) ? i.contentDocument : (Q(i, "template") && (i = i.content || i), u.merge([], i.childNodes));
      }
    }, function(i, s) {
      u.fn[i] = function(l, f) {
        var h = u.map(this, s, l);
        return i.slice(-5) !== "Until" && (f = l), f && typeof f == "string" && (h = u.filter(f, h)), this.length > 1 && (me[i] || u.uniqueSort(h), se.test(i) && h.reverse()), this.pushStack(h);
      };
    });
    var Ee = /[^\x20\t\r\n\f]+/g;
    function $e(i) {
      var s = {};
      return u.each(i.match(Ee) || [], function(l, f) {
        s[f] = !0;
      }), s;
    }
    u.Callbacks = function(i) {
      i = typeof i == "string" ? $e(i) : u.extend({}, i);
      var s, l, f, h, v = [], m = [], O = -1, T = function() {
        for (h = h || i.once, f = s = !0; m.length; O = -1)
          for (l = m.shift(); ++O < v.length; )
            v[O].apply(l[0], l[1]) === !1 && i.stopOnFalse && (O = v.length, l = !1);
        i.memory || (l = !1), s = !1, h && (l ? v = [] : v = "");
      }, M = {
        // Add a callback or a collection of callbacks to the list
        add: function() {
          return v && (l && !s && (O = v.length - 1, m.push(l)), function H(ee) {
            u.each(ee, function($, q) {
              A(q) ? (!i.unique || !M.has(q)) && v.push(q) : q && q.length && J(q) !== "string" && H(q);
            });
          }(arguments), l && !s && T()), this;
        },
        // Remove a callback from the list
        remove: function() {
          return u.each(arguments, function(H, ee) {
            for (var $; ($ = u.inArray(ee, v, $)) > -1; )
              v.splice($, 1), $ <= O && O--;
          }), this;
        },
        // Check if a given callback is in the list.
        // If no argument is given, return whether or not list has callbacks attached.
        has: function(H) {
          return H ? u.inArray(H, v) > -1 : v.length > 0;
        },
        // Remove all callbacks from the list
        empty: function() {
          return v && (v = []), this;
        },
        // Disable .fire and .add
        // Abort any current/pending executions
        // Clear all callbacks and values
        disable: function() {
          return h = m = [], v = l = "", this;
        },
        disabled: function() {
          return !v;
        },
        // Disable .fire
        // Also disable .add unless we have memory (since it would have no effect)
        // Abort any pending executions
        lock: function() {
          return h = m = [], !l && !s && (v = l = ""), this;
        },
        locked: function() {
          return !!h;
        },
        // Call all callbacks with the given context and arguments
        fireWith: function(H, ee) {
          return h || (ee = ee || [], ee = [H, ee.slice ? ee.slice() : ee], m.push(ee), s || T()), this;
        },
        // Call all the callbacks with the given arguments
        fire: function() {
          return M.fireWith(this, arguments), this;
        },
        // To know if the callbacks have already been called at least once
        fired: function() {
          return !!f;
        }
      };
      return M;
    };
    function Ue(i) {
      return i;
    }
    function pt(i) {
      throw i;
    }
    function at(i, s, l, f) {
      var h;
      try {
        i && A(h = i.promise) ? h.call(i).done(s).fail(l) : i && A(h = i.then) ? h.call(i, s, l) : s.apply(void 0, [i].slice(f));
      } catch (v) {
        l.apply(void 0, [v]);
      }
    }
    u.extend({
      Deferred: function(i) {
        var s = [
          // action, add listener, callbacks,
          // ... .then handlers, argument index, [final state]
          [
            "notify",
            "progress",
            u.Callbacks("memory"),
            u.Callbacks("memory"),
            2
          ],
          [
            "resolve",
            "done",
            u.Callbacks("once memory"),
            u.Callbacks("once memory"),
            0,
            "resolved"
          ],
          [
            "reject",
            "fail",
            u.Callbacks("once memory"),
            u.Callbacks("once memory"),
            1,
            "rejected"
          ]
        ], l = "pending", f = {
          state: function() {
            return l;
          },
          always: function() {
            return h.done(arguments).fail(arguments), this;
          },
          catch: function(v) {
            return f.then(null, v);
          },
          // Keep pipe for back-compat
          pipe: function() {
            var v = arguments;
            return u.Deferred(function(m) {
              u.each(s, function(O, T) {
                var M = A(v[T[4]]) && v[T[4]];
                h[T[1]](function() {
                  var H = M && M.apply(this, arguments);
                  H && A(H.promise) ? H.promise().progress(m.notify).done(m.resolve).fail(m.reject) : m[T[0] + "With"](
                    this,
                    M ? [H] : arguments
                  );
                });
              }), v = null;
            }).promise();
          },
          then: function(v, m, O) {
            var T = 0;
            function M(H, ee, $, q) {
              return function() {
                var be = this, ke = arguments, ye = function() {
                  var st, jt;
                  if (!(H < T)) {
                    if (st = $.apply(be, ke), st === ee.promise())
                      throw new TypeError("Thenable self-resolution");
                    jt = st && // Support: Promises/A+ section 2.3.4
                    // https://promisesaplus.com/#point-64
                    // Only check objects and functions for thenability
                    (typeof st == "object" || typeof st == "function") && st.then, A(jt) ? q ? jt.call(
                      st,
                      M(T, ee, Ue, q),
                      M(T, ee, pt, q)
                    ) : (T++, jt.call(
                      st,
                      M(T, ee, Ue, q),
                      M(T, ee, pt, q),
                      M(
                        T,
                        ee,
                        Ue,
                        ee.notifyWith
                      )
                    )) : ($ !== Ue && (be = void 0, ke = [st]), (q || ee.resolveWith)(be, ke));
                  }
                }, ut = q ? ye : function() {
                  try {
                    ye();
                  } catch (st) {
                    u.Deferred.exceptionHook && u.Deferred.exceptionHook(
                      st,
                      ut.stackTrace
                    ), H + 1 >= T && ($ !== pt && (be = void 0, ke = [st]), ee.rejectWith(be, ke));
                  }
                };
                H ? ut() : (u.Deferred.getStackHook && (ut.stackTrace = u.Deferred.getStackHook()), t.setTimeout(ut));
              };
            }
            return u.Deferred(function(H) {
              s[0][3].add(
                M(
                  0,
                  H,
                  A(O) ? O : Ue,
                  H.notifyWith
                )
              ), s[1][3].add(
                M(
                  0,
                  H,
                  A(v) ? v : Ue
                )
              ), s[2][3].add(
                M(
                  0,
                  H,
                  A(m) ? m : pt
                )
              );
            }).promise();
          },
          // Get a promise for this deferred
          // If obj is provided, the promise aspect is added to the object
          promise: function(v) {
            return v != null ? u.extend(v, f) : f;
          }
        }, h = {};
        return u.each(s, function(v, m) {
          var O = m[2], T = m[5];
          f[m[1]] = O.add, T && O.add(
            function() {
              l = T;
            },
            // rejected_callbacks.disable
            // fulfilled_callbacks.disable
            s[3 - v][2].disable,
            // rejected_handlers.disable
            // fulfilled_handlers.disable
            s[3 - v][3].disable,
            // progress_callbacks.lock
            s[0][2].lock,
            // progress_handlers.lock
            s[0][3].lock
          ), O.add(m[3].fire), h[m[0]] = function() {
            return h[m[0] + "With"](this === h ? void 0 : this, arguments), this;
          }, h[m[0] + "With"] = O.fireWith;
        }), f.promise(h), i && i.call(h, h), h;
      },
      // Deferred helper
      when: function(i) {
        var s = arguments.length, l = s, f = Array(l), h = a.call(arguments), v = u.Deferred(), m = function(O) {
          return function(T) {
            f[O] = this, h[O] = arguments.length > 1 ? a.call(arguments) : T, --s || v.resolveWith(f, h);
          };
        };
        if (s <= 1 && (at(
          i,
          v.done(m(l)).resolve,
          v.reject,
          !s
        ), v.state() === "pending" || A(h[l] && h[l].then)))
          return v.then();
        for (; l--; )
          at(h[l], m(l), v.reject);
        return v.promise();
      }
    });
    var Ye = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    u.Deferred.exceptionHook = function(i, s) {
      t.console && t.console.warn && i && Ye.test(i.name) && t.console.warn("jQuery.Deferred exception: " + i.message, i.stack, s);
    }, u.readyException = function(i) {
      t.setTimeout(function() {
        throw i;
      });
    };
    var fn = u.Deferred();
    u.fn.ready = function(i) {
      return fn.then(i).catch(function(s) {
        u.readyException(s);
      }), this;
    }, u.extend({
      // Is the DOM ready to be used? Set to true once it occurs.
      isReady: !1,
      // A counter to track how many items to wait for before
      // the ready event fires. See trac-6781
      readyWait: 1,
      // Handle when the DOM is ready
      ready: function(i) {
        (i === !0 ? --u.readyWait : u.isReady) || (u.isReady = !0, !(i !== !0 && --u.readyWait > 0) && fn.resolveWith(N, [u]));
      }
    }), u.ready.then = fn.then;
    function Tn() {
      N.removeEventListener("DOMContentLoaded", Tn), t.removeEventListener("load", Tn), u.ready();
    }
    N.readyState === "complete" || N.readyState !== "loading" && !N.documentElement.doScroll ? t.setTimeout(u.ready) : (N.addEventListener("DOMContentLoaded", Tn), t.addEventListener("load", Tn));
    var ht = function(i, s, l, f, h, v, m) {
      var O = 0, T = i.length, M = l == null;
      if (J(l) === "object") {
        h = !0;
        for (O in l)
          ht(i, s, O, l[O], !0, v, m);
      } else if (f !== void 0 && (h = !0, A(f) || (m = !0), M && (m ? (s.call(i, f), s = null) : (M = s, s = function(H, ee, $) {
        return M.call(u(H), $);
      })), s))
        for (; O < T; O++)
          s(
            i[O],
            l,
            m ? f : f.call(i[O], O, s(i[O], l))
          );
      return h ? i : M ? s.call(i) : T ? s(i[0], l) : v;
    }, Fn = /^-ms-/, nr = /-([a-z])/g;
    function _(i, s) {
      return s.toUpperCase();
    }
    function k(i) {
      return i.replace(Fn, "ms-").replace(nr, _);
    }
    var W = function(i) {
      return i.nodeType === 1 || i.nodeType === 9 || !+i.nodeType;
    };
    function Z() {
      this.expando = u.expando + Z.uid++;
    }
    Z.uid = 1, Z.prototype = {
      cache: function(i) {
        var s = i[this.expando];
        return s || (s = {}, W(i) && (i.nodeType ? i[this.expando] = s : Object.defineProperty(i, this.expando, {
          value: s,
          configurable: !0
        }))), s;
      },
      set: function(i, s, l) {
        var f, h = this.cache(i);
        if (typeof s == "string")
          h[k(s)] = l;
        else
          for (f in s)
            h[k(f)] = s[f];
        return h;
      },
      get: function(i, s) {
        return s === void 0 ? this.cache(i) : (
          // Always use camelCase key (gh-2257)
          i[this.expando] && i[this.expando][k(s)]
        );
      },
      access: function(i, s, l) {
        return s === void 0 || s && typeof s == "string" && l === void 0 ? this.get(i, s) : (this.set(i, s, l), l !== void 0 ? l : s);
      },
      remove: function(i, s) {
        var l, f = i[this.expando];
        if (f !== void 0) {
          if (s !== void 0)
            for (Array.isArray(s) ? s = s.map(k) : (s = k(s), s = s in f ? [s] : s.match(Ee) || []), l = s.length; l--; )
              delete f[s[l]];
          (s === void 0 || u.isEmptyObject(f)) && (i.nodeType ? i[this.expando] = void 0 : delete i[this.expando]);
        }
      },
      hasData: function(i) {
        var s = i[this.expando];
        return s !== void 0 && !u.isEmptyObject(s);
      }
    };
    var j = new Z(), ne = new Z(), de = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ae = /[A-Z]/g;
    function ue(i) {
      return i === "true" ? !0 : i === "false" ? !1 : i === "null" ? null : i === +i + "" ? +i : de.test(i) ? JSON.parse(i) : i;
    }
    function re(i, s, l) {
      var f;
      if (l === void 0 && i.nodeType === 1)
        if (f = "data-" + s.replace(ae, "-$&").toLowerCase(), l = i.getAttribute(f), typeof l == "string") {
          try {
            l = ue(l);
          } catch {
          }
          ne.set(i, s, l);
        } else
          l = void 0;
      return l;
    }
    u.extend({
      hasData: function(i) {
        return ne.hasData(i) || j.hasData(i);
      },
      data: function(i, s, l) {
        return ne.access(i, s, l);
      },
      removeData: function(i, s) {
        ne.remove(i, s);
      },
      // TODO: Now that all calls to _data and _removeData have been replaced
      // with direct calls to dataPriv methods, these can be deprecated.
      _data: function(i, s, l) {
        return j.access(i, s, l);
      },
      _removeData: function(i, s) {
        j.remove(i, s);
      }
    }), u.fn.extend({
      data: function(i, s) {
        var l, f, h, v = this[0], m = v && v.attributes;
        if (i === void 0) {
          if (this.length && (h = ne.get(v), v.nodeType === 1 && !j.get(v, "hasDataAttrs"))) {
            for (l = m.length; l--; )
              m[l] && (f = m[l].name, f.indexOf("data-") === 0 && (f = k(f.slice(5)), re(v, f, h[f])));
            j.set(v, "hasDataAttrs", !0);
          }
          return h;
        }
        return typeof i == "object" ? this.each(function() {
          ne.set(this, i);
        }) : ht(this, function(O) {
          var T;
          if (v && O === void 0)
            return T = ne.get(v, i), T !== void 0 || (T = re(v, i), T !== void 0) ? T : void 0;
          this.each(function() {
            ne.set(this, i, O);
          });
        }, null, s, arguments.length > 1, null, !0);
      },
      removeData: function(i) {
        return this.each(function() {
          ne.remove(this, i);
        });
      }
    }), u.extend({
      queue: function(i, s, l) {
        var f;
        if (i)
          return s = (s || "fx") + "queue", f = j.get(i, s), l && (!f || Array.isArray(l) ? f = j.access(i, s, u.makeArray(l)) : f.push(l)), f || [];
      },
      dequeue: function(i, s) {
        s = s || "fx";
        var l = u.queue(i, s), f = l.length, h = l.shift(), v = u._queueHooks(i, s), m = function() {
          u.dequeue(i, s);
        };
        h === "inprogress" && (h = l.shift(), f--), h && (s === "fx" && l.unshift("inprogress"), delete v.stop, h.call(i, m, v)), !f && v && v.empty.fire();
      },
      // Not public - generate a queueHooks object, or return the current one
      _queueHooks: function(i, s) {
        var l = s + "queueHooks";
        return j.get(i, l) || j.access(i, l, {
          empty: u.Callbacks("once memory").add(function() {
            j.remove(i, [s + "queue", l]);
          })
        });
      }
    }), u.fn.extend({
      queue: function(i, s) {
        var l = 2;
        return typeof i != "string" && (s = i, i = "fx", l--), arguments.length < l ? u.queue(this[0], i) : s === void 0 ? this : this.each(function() {
          var f = u.queue(this, i, s);
          u._queueHooks(this, i), i === "fx" && f[0] !== "inprogress" && u.dequeue(this, i);
        });
      },
      dequeue: function(i) {
        return this.each(function() {
          u.dequeue(this, i);
        });
      },
      clearQueue: function(i) {
        return this.queue(i || "fx", []);
      },
      // Get a promise resolved when queues of a certain type
      // are emptied (fx is the type by default)
      promise: function(i, s) {
        var l, f = 1, h = u.Deferred(), v = this, m = this.length, O = function() {
          --f || h.resolveWith(v, [v]);
        };
        for (typeof i != "string" && (s = i, i = void 0), i = i || "fx"; m--; )
          l = j.get(v[m], i + "queueHooks"), l && l.empty && (f++, l.empty.add(O));
        return O(), h.promise(s);
      }
    });
    var Ce = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, he = new RegExp("^(?:([+-])=|)(" + Ce + ")([a-z%]*)$", "i"), ge = ["Top", "Right", "Bottom", "Left"], Te = N.documentElement, Le = function(i) {
      return u.contains(i.ownerDocument, i);
    }, Xe = { composed: !0 };
    Te.getRootNode && (Le = function(i) {
      return u.contains(i.ownerDocument, i) || i.getRootNode(Xe) === i.ownerDocument;
    });
    var He = function(i, s) {
      return i = s || i, i.style.display === "none" || i.style.display === "" && // Otherwise, check computed style
      // Support: Firefox <=43 - 45
      // Disconnected elements can have computed display: none, so first confirm that elem is
      // in the document.
      Le(i) && u.css(i, "display") === "none";
    };
    function tt(i, s, l, f) {
      var h, v, m = 20, O = f ? function() {
        return f.cur();
      } : function() {
        return u.css(i, s, "");
      }, T = O(), M = l && l[3] || (u.cssNumber[s] ? "" : "px"), H = i.nodeType && (u.cssNumber[s] || M !== "px" && +T) && he.exec(u.css(i, s));
      if (H && H[3] !== M) {
        for (T = T / 2, M = M || H[3], H = +T || 1; m--; )
          u.style(i, s, H + M), (1 - v) * (1 - (v = O() / T || 0.5)) <= 0 && (m = 0), H = H / v;
        H = H * 2, u.style(i, s, H + M), l = l || [];
      }
      return l && (H = +H || +T || 0, h = l[1] ? H + (l[1] + 1) * l[2] : +l[2], f && (f.unit = M, f.start = H, f.end = h)), h;
    }
    var At = {};
    function Hn(i) {
      var s, l = i.ownerDocument, f = i.nodeName, h = At[f];
      return h || (s = l.body.appendChild(l.createElement(f)), h = u.css(s, "display"), s.parentNode.removeChild(s), h === "none" && (h = "block"), At[f] = h, h);
    }
    function En(i, s) {
      for (var l, f, h = [], v = 0, m = i.length; v < m; v++)
        f = i[v], f.style && (l = f.style.display, s ? (l === "none" && (h[v] = j.get(f, "display") || null, h[v] || (f.style.display = "")), f.style.display === "" && He(f) && (h[v] = Hn(f))) : l !== "none" && (h[v] = "none", j.set(f, "display", l)));
      for (v = 0; v < m; v++)
        h[v] != null && (i[v].style.display = h[v]);
      return i;
    }
    u.fn.extend({
      show: function() {
        return En(this, !0);
      },
      hide: function() {
        return En(this);
      },
      toggle: function(i) {
        return typeof i == "boolean" ? i ? this.show() : this.hide() : this.each(function() {
          He(this) ? u(this).show() : u(this).hide();
        });
      }
    });
    var tn = /^(?:checkbox|radio)$/i, ci = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, xt = /^$|^module$|\/(?:java|ecma)script/i;
    (function() {
      var i = N.createDocumentFragment(), s = i.appendChild(N.createElement("div")), l = N.createElement("input");
      l.setAttribute("type", "radio"), l.setAttribute("checked", "checked"), l.setAttribute("name", "t"), s.appendChild(l), w.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, s.innerHTML = "<textarea>x</textarea>", w.noCloneChecked = !!s.cloneNode(!0).lastChild.defaultValue, s.innerHTML = "<option></option>", w.option = !!s.lastChild;
    })();
    var nt = {
      // XHTML parsers do not magically insert elements in the
      // same way that tag soup parsers do. So we cannot shorten
      // this by omitting <tbody> or other required elements.
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
    nt.tbody = nt.tfoot = nt.colgroup = nt.caption = nt.thead, nt.th = nt.td, w.option || (nt.optgroup = nt.option = [1, "<select multiple='multiple'>", "</select>"]);
    function mt(i, s) {
      var l;
      return typeof i.getElementsByTagName < "u" ? l = i.getElementsByTagName(s || "*") : typeof i.querySelectorAll < "u" ? l = i.querySelectorAll(s || "*") : l = [], s === void 0 || s && Q(i, s) ? u.merge([i], l) : l;
    }
    function ya(i, s) {
      for (var l = 0, f = i.length; l < f; l++)
        j.set(
          i[l],
          "globalEval",
          !s || j.get(s[l], "globalEval")
        );
    }
    var qh = /<|&#?\w+;/;
    function ou(i, s, l, f, h) {
      for (var v, m, O, T, M, H, ee = s.createDocumentFragment(), $ = [], q = 0, be = i.length; q < be; q++)
        if (v = i[q], v || v === 0)
          if (J(v) === "object")
            u.merge($, v.nodeType ? [v] : v);
          else if (!qh.test(v))
            $.push(s.createTextNode(v));
          else {
            for (m = m || ee.appendChild(s.createElement("div")), O = (ci.exec(v) || ["", ""])[1].toLowerCase(), T = nt[O] || nt._default, m.innerHTML = T[1] + u.htmlPrefilter(v) + T[2], H = T[0]; H--; )
              m = m.lastChild;
            u.merge($, m.childNodes), m = ee.firstChild, m.textContent = "";
          }
      for (ee.textContent = "", q = 0; v = $[q++]; ) {
        if (f && u.inArray(v, f) > -1) {
          h && h.push(v);
          continue;
        }
        if (M = Le(v), m = mt(ee.appendChild(v), "script"), M && ya(m), l)
          for (H = 0; v = m[H++]; )
            xt.test(v.type || "") && l.push(v);
      }
      return ee;
    }
    var au = /^([^.]*)(?:\.(.+)|)/;
    function Ar() {
      return !0;
    }
    function Pr() {
      return !1;
    }
    function zh(i, s) {
      return i === Yh() == (s === "focus");
    }
    function Yh() {
      try {
        return N.activeElement;
      } catch {
      }
    }
    function ba(i, s, l, f, h, v) {
      var m, O;
      if (typeof s == "object") {
        typeof l != "string" && (f = f || l, l = void 0);
        for (O in s)
          ba(i, O, l, f, s[O], v);
        return i;
      }
      if (f == null && h == null ? (h = l, f = l = void 0) : h == null && (typeof l == "string" ? (h = f, f = void 0) : (h = f, f = l, l = void 0)), h === !1)
        h = Pr;
      else if (!h)
        return i;
      return v === 1 && (m = h, h = function(T) {
        return u().off(T), m.apply(this, arguments);
      }, h.guid = m.guid || (m.guid = u.guid++)), i.each(function() {
        u.event.add(this, s, h, f, l);
      });
    }
    u.event = {
      global: {},
      add: function(i, s, l, f, h) {
        var v, m, O, T, M, H, ee, $, q, be, ke, ye = j.get(i);
        if (W(i))
          for (l.handler && (v = l, l = v.handler, h = v.selector), h && u.find.matchesSelector(Te, h), l.guid || (l.guid = u.guid++), (T = ye.events) || (T = ye.events = /* @__PURE__ */ Object.create(null)), (m = ye.handle) || (m = ye.handle = function(ut) {
            return typeof u < "u" && u.event.triggered !== ut.type ? u.event.dispatch.apply(i, arguments) : void 0;
          }), s = (s || "").match(Ee) || [""], M = s.length; M--; )
            O = au.exec(s[M]) || [], q = ke = O[1], be = (O[2] || "").split(".").sort(), q && (ee = u.event.special[q] || {}, q = (h ? ee.delegateType : ee.bindType) || q, ee = u.event.special[q] || {}, H = u.extend({
              type: q,
              origType: ke,
              data: f,
              handler: l,
              guid: l.guid,
              selector: h,
              needsContext: h && u.expr.match.needsContext.test(h),
              namespace: be.join(".")
            }, v), ($ = T[q]) || ($ = T[q] = [], $.delegateCount = 0, (!ee.setup || ee.setup.call(i, f, be, m) === !1) && i.addEventListener && i.addEventListener(q, m)), ee.add && (ee.add.call(i, H), H.handler.guid || (H.handler.guid = l.guid)), h ? $.splice($.delegateCount++, 0, H) : $.push(H), u.event.global[q] = !0);
      },
      // Detach an event or set of events from an element
      remove: function(i, s, l, f, h) {
        var v, m, O, T, M, H, ee, $, q, be, ke, ye = j.hasData(i) && j.get(i);
        if (!(!ye || !(T = ye.events))) {
          for (s = (s || "").match(Ee) || [""], M = s.length; M--; ) {
            if (O = au.exec(s[M]) || [], q = ke = O[1], be = (O[2] || "").split(".").sort(), !q) {
              for (q in T)
                u.event.remove(i, q + s[M], l, f, !0);
              continue;
            }
            for (ee = u.event.special[q] || {}, q = (f ? ee.delegateType : ee.bindType) || q, $ = T[q] || [], O = O[2] && new RegExp("(^|\\.)" + be.join("\\.(?:.*\\.|)") + "(\\.|$)"), m = v = $.length; v--; )
              H = $[v], (h || ke === H.origType) && (!l || l.guid === H.guid) && (!O || O.test(H.namespace)) && (!f || f === H.selector || f === "**" && H.selector) && ($.splice(v, 1), H.selector && $.delegateCount--, ee.remove && ee.remove.call(i, H));
            m && !$.length && ((!ee.teardown || ee.teardown.call(i, be, ye.handle) === !1) && u.removeEvent(i, q, ye.handle), delete T[q]);
          }
          u.isEmptyObject(T) && j.remove(i, "handle events");
        }
      },
      dispatch: function(i) {
        var s, l, f, h, v, m, O = new Array(arguments.length), T = u.event.fix(i), M = (j.get(this, "events") || /* @__PURE__ */ Object.create(null))[T.type] || [], H = u.event.special[T.type] || {};
        for (O[0] = T, s = 1; s < arguments.length; s++)
          O[s] = arguments[s];
        if (T.delegateTarget = this, !(H.preDispatch && H.preDispatch.call(this, T) === !1)) {
          for (m = u.event.handlers.call(this, T, M), s = 0; (h = m[s++]) && !T.isPropagationStopped(); )
            for (T.currentTarget = h.elem, l = 0; (v = h.handlers[l++]) && !T.isImmediatePropagationStopped(); )
              (!T.rnamespace || v.namespace === !1 || T.rnamespace.test(v.namespace)) && (T.handleObj = v, T.data = v.data, f = ((u.event.special[v.origType] || {}).handle || v.handler).apply(h.elem, O), f !== void 0 && (T.result = f) === !1 && (T.preventDefault(), T.stopPropagation()));
          return H.postDispatch && H.postDispatch.call(this, T), T.result;
        }
      },
      handlers: function(i, s) {
        var l, f, h, v, m, O = [], T = s.delegateCount, M = i.target;
        if (T && // Support: IE <=9
        // Black-hole SVG <use> instance trees (trac-13180)
        M.nodeType && // Support: Firefox <=42
        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
        // Support: IE 11 only
        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
        !(i.type === "click" && i.button >= 1)) {
          for (; M !== this; M = M.parentNode || this)
            if (M.nodeType === 1 && !(i.type === "click" && M.disabled === !0)) {
              for (v = [], m = {}, l = 0; l < T; l++)
                f = s[l], h = f.selector + " ", m[h] === void 0 && (m[h] = f.needsContext ? u(h, this).index(M) > -1 : u.find(h, this, null, [M]).length), m[h] && v.push(f);
              v.length && O.push({ elem: M, handlers: v });
            }
        }
        return M = this, T < s.length && O.push({ elem: M, handlers: s.slice(T) }), O;
      },
      addProp: function(i, s) {
        Object.defineProperty(u.Event.prototype, i, {
          enumerable: !0,
          configurable: !0,
          get: A(s) ? function() {
            if (this.originalEvent)
              return s(this.originalEvent);
          } : function() {
            if (this.originalEvent)
              return this.originalEvent[i];
          },
          set: function(l) {
            Object.defineProperty(this, i, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: l
            });
          }
        });
      },
      fix: function(i) {
        return i[u.expando] ? i : new u.Event(i);
      },
      special: {
        load: {
          // Prevent triggered image.load events from bubbling to window.load
          noBubble: !0
        },
        click: {
          // Utilize native event to ensure correct state for checkable inputs
          setup: function(i) {
            var s = this || i;
            return tn.test(s.type) && s.click && Q(s, "input") && to(s, "click", Ar), !1;
          },
          trigger: function(i) {
            var s = this || i;
            return tn.test(s.type) && s.click && Q(s, "input") && to(s, "click"), !0;
          },
          // For cross-browser consistency, suppress native .click() on links
          // Also prevent it if we're currently inside a leveraged native-event stack
          _default: function(i) {
            var s = i.target;
            return tn.test(s.type) && s.click && Q(s, "input") && j.get(s, "click") || Q(s, "a");
          }
        },
        beforeunload: {
          postDispatch: function(i) {
            i.result !== void 0 && i.originalEvent && (i.originalEvent.returnValue = i.result);
          }
        }
      }
    };
    function to(i, s, l) {
      if (!l) {
        j.get(i, s) === void 0 && u.event.add(i, s, Ar);
        return;
      }
      j.set(i, s, !1), u.event.add(i, s, {
        namespace: !1,
        handler: function(f) {
          var h, v, m = j.get(this, s);
          if (f.isTrigger & 1 && this[s]) {
            if (m.length)
              (u.event.special[s] || {}).delegateType && f.stopPropagation();
            else if (m = a.call(arguments), j.set(this, s, m), h = l(this, s), this[s](), v = j.get(this, s), m !== v || h ? j.set(this, s, !1) : v = {}, m !== v)
              return f.stopImmediatePropagation(), f.preventDefault(), v && v.value;
          } else
            m.length && (j.set(this, s, {
              value: u.event.trigger(
                // Support: IE <=9 - 11+
                // Extend with the prototype to reset the above stopImmediatePropagation()
                u.extend(m[0], u.Event.prototype),
                m.slice(1),
                this
              )
            }), f.stopImmediatePropagation());
        }
      });
    }
    u.removeEvent = function(i, s, l) {
      i.removeEventListener && i.removeEventListener(s, l);
    }, u.Event = function(i, s) {
      if (!(this instanceof u.Event))
        return new u.Event(i, s);
      i && i.type ? (this.originalEvent = i, this.type = i.type, this.isDefaultPrevented = i.defaultPrevented || i.defaultPrevented === void 0 && // Support: Android <=2.3 only
      i.returnValue === !1 ? Ar : Pr, this.target = i.target && i.target.nodeType === 3 ? i.target.parentNode : i.target, this.currentTarget = i.currentTarget, this.relatedTarget = i.relatedTarget) : this.type = i, s && u.extend(this, s), this.timeStamp = i && i.timeStamp || Date.now(), this[u.expando] = !0;
    }, u.Event.prototype = {
      constructor: u.Event,
      isDefaultPrevented: Pr,
      isPropagationStopped: Pr,
      isImmediatePropagationStopped: Pr,
      isSimulated: !1,
      preventDefault: function() {
        var i = this.originalEvent;
        this.isDefaultPrevented = Ar, i && !this.isSimulated && i.preventDefault();
      },
      stopPropagation: function() {
        var i = this.originalEvent;
        this.isPropagationStopped = Ar, i && !this.isSimulated && i.stopPropagation();
      },
      stopImmediatePropagation: function() {
        var i = this.originalEvent;
        this.isImmediatePropagationStopped = Ar, i && !this.isSimulated && i.stopImmediatePropagation(), this.stopPropagation();
      }
    }, u.each({
      altKey: !0,
      bubbles: !0,
      cancelable: !0,
      changedTouches: !0,
      ctrlKey: !0,
      detail: !0,
      eventPhase: !0,
      metaKey: !0,
      pageX: !0,
      pageY: !0,
      shiftKey: !0,
      view: !0,
      char: !0,
      code: !0,
      charCode: !0,
      key: !0,
      keyCode: !0,
      button: !0,
      buttons: !0,
      clientX: !0,
      clientY: !0,
      offsetX: !0,
      offsetY: !0,
      pointerId: !0,
      pointerType: !0,
      screenX: !0,
      screenY: !0,
      targetTouches: !0,
      toElement: !0,
      touches: !0,
      which: !0
    }, u.event.addProp), u.each({ focus: "focusin", blur: "focusout" }, function(i, s) {
      u.event.special[i] = {
        // Utilize native event if possible so blur/focus sequence is correct
        setup: function() {
          return to(this, i, zh), !1;
        },
        trigger: function() {
          return to(this, i), !0;
        },
        // Suppress native focus or blur if we're currently inside
        // a leveraged native-event stack
        _default: function(l) {
          return j.get(l.target, i);
        },
        delegateType: s
      };
    }), u.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function(i, s) {
      u.event.special[i] = {
        delegateType: s,
        bindType: s,
        handle: function(l) {
          var f, h = this, v = l.relatedTarget, m = l.handleObj;
          return (!v || v !== h && !u.contains(h, v)) && (l.type = m.origType, f = m.handler.apply(this, arguments), l.type = s), f;
        }
      };
    }), u.fn.extend({
      on: function(i, s, l, f) {
        return ba(this, i, s, l, f);
      },
      one: function(i, s, l, f) {
        return ba(this, i, s, l, f, 1);
      },
      off: function(i, s, l) {
        var f, h;
        if (i && i.preventDefault && i.handleObj)
          return f = i.handleObj, u(i.delegateTarget).off(
            f.namespace ? f.origType + "." + f.namespace : f.origType,
            f.selector,
            f.handler
          ), this;
        if (typeof i == "object") {
          for (h in i)
            this.off(h, s, i[h]);
          return this;
        }
        return (s === !1 || typeof s == "function") && (l = s, s = void 0), l === !1 && (l = Pr), this.each(function() {
          u.event.remove(this, i, l, s);
        });
      }
    });
    var Xh = /<script|<style|<link/i, Vh = /checked\s*(?:[^=]|=\s*.checked.)/i, Kh = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function su(i, s) {
      return Q(i, "table") && Q(s.nodeType !== 11 ? s : s.firstChild, "tr") && u(i).children("tbody")[0] || i;
    }
    function Gh(i) {
      return i.type = (i.getAttribute("type") !== null) + "/" + i.type, i;
    }
    function Jh(i) {
      return (i.type || "").slice(0, 5) === "true/" ? i.type = i.type.slice(5) : i.removeAttribute("type"), i;
    }
    function lu(i, s) {
      var l, f, h, v, m, O, T;
      if (s.nodeType === 1) {
        if (j.hasData(i) && (v = j.get(i), T = v.events, T)) {
          j.remove(s, "handle events");
          for (h in T)
            for (l = 0, f = T[h].length; l < f; l++)
              u.event.add(s, h, T[h][l]);
        }
        ne.hasData(i) && (m = ne.access(i), O = u.extend({}, m), ne.set(s, O));
      }
    }
    function Qh(i, s) {
      var l = s.nodeName.toLowerCase();
      l === "input" && tn.test(i.type) ? s.checked = i.checked : (l === "input" || l === "textarea") && (s.defaultValue = i.defaultValue);
    }
    function Nr(i, s, l, f) {
      s = c(s);
      var h, v, m, O, T, M, H = 0, ee = i.length, $ = ee - 1, q = s[0], be = A(q);
      if (be || ee > 1 && typeof q == "string" && !w.checkClone && Vh.test(q))
        return i.each(function(ke) {
          var ye = i.eq(ke);
          be && (s[0] = q.call(this, ke, ye.html())), Nr(ye, s, l, f);
        });
      if (ee && (h = ou(s, i[0].ownerDocument, !1, i, f), v = h.firstChild, h.childNodes.length === 1 && (h = v), v || f)) {
        for (m = u.map(mt(h, "script"), Gh), O = m.length; H < ee; H++)
          T = h, H !== $ && (T = u.clone(T, !0, !0), O && u.merge(m, mt(T, "script"))), l.call(i[H], T, H);
        if (O)
          for (M = m[m.length - 1].ownerDocument, u.map(m, Jh), H = 0; H < O; H++)
            T = m[H], xt.test(T.type || "") && !j.access(T, "globalEval") && u.contains(M, T) && (T.src && (T.type || "").toLowerCase() !== "module" ? u._evalUrl && !T.noModule && u._evalUrl(T.src, {
              nonce: T.nonce || T.getAttribute("nonce")
            }, M) : F(T.textContent.replace(Kh, ""), T, M));
      }
      return i;
    }
    function uu(i, s, l) {
      for (var f, h = s ? u.filter(s, i) : i, v = 0; (f = h[v]) != null; v++)
        !l && f.nodeType === 1 && u.cleanData(mt(f)), f.parentNode && (l && Le(f) && ya(mt(f, "script")), f.parentNode.removeChild(f));
      return i;
    }
    u.extend({
      htmlPrefilter: function(i) {
        return i;
      },
      clone: function(i, s, l) {
        var f, h, v, m, O = i.cloneNode(!0), T = Le(i);
        if (!w.noCloneChecked && (i.nodeType === 1 || i.nodeType === 11) && !u.isXMLDoc(i))
          for (m = mt(O), v = mt(i), f = 0, h = v.length; f < h; f++)
            Qh(v[f], m[f]);
        if (s)
          if (l)
            for (v = v || mt(i), m = m || mt(O), f = 0, h = v.length; f < h; f++)
              lu(v[f], m[f]);
          else
            lu(i, O);
        return m = mt(O, "script"), m.length > 0 && ya(m, !T && mt(i, "script")), O;
      },
      cleanData: function(i) {
        for (var s, l, f, h = u.event.special, v = 0; (l = i[v]) !== void 0; v++)
          if (W(l)) {
            if (s = l[j.expando]) {
              if (s.events)
                for (f in s.events)
                  h[f] ? u.event.remove(l, f) : u.removeEvent(l, f, s.handle);
              l[j.expando] = void 0;
            }
            l[ne.expando] && (l[ne.expando] = void 0);
          }
      }
    }), u.fn.extend({
      detach: function(i) {
        return uu(this, i, !0);
      },
      remove: function(i) {
        return uu(this, i);
      },
      text: function(i) {
        return ht(this, function(s) {
          return s === void 0 ? u.text(this) : this.empty().each(function() {
            (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = s);
          });
        }, null, i, arguments.length);
      },
      append: function() {
        return Nr(this, arguments, function(i) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var s = su(this, i);
            s.appendChild(i);
          }
        });
      },
      prepend: function() {
        return Nr(this, arguments, function(i) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var s = su(this, i);
            s.insertBefore(i, s.firstChild);
          }
        });
      },
      before: function() {
        return Nr(this, arguments, function(i) {
          this.parentNode && this.parentNode.insertBefore(i, this);
        });
      },
      after: function() {
        return Nr(this, arguments, function(i) {
          this.parentNode && this.parentNode.insertBefore(i, this.nextSibling);
        });
      },
      empty: function() {
        for (var i, s = 0; (i = this[s]) != null; s++)
          i.nodeType === 1 && (u.cleanData(mt(i, !1)), i.textContent = "");
        return this;
      },
      clone: function(i, s) {
        return i = i ?? !1, s = s ?? i, this.map(function() {
          return u.clone(this, i, s);
        });
      },
      html: function(i) {
        return ht(this, function(s) {
          var l = this[0] || {}, f = 0, h = this.length;
          if (s === void 0 && l.nodeType === 1)
            return l.innerHTML;
          if (typeof s == "string" && !Xh.test(s) && !nt[(ci.exec(s) || ["", ""])[1].toLowerCase()]) {
            s = u.htmlPrefilter(s);
            try {
              for (; f < h; f++)
                l = this[f] || {}, l.nodeType === 1 && (u.cleanData(mt(l, !1)), l.innerHTML = s);
              l = 0;
            } catch {
            }
          }
          l && this.empty().append(s);
        }, null, i, arguments.length);
      },
      replaceWith: function() {
        var i = [];
        return Nr(this, arguments, function(s) {
          var l = this.parentNode;
          u.inArray(this, i) < 0 && (u.cleanData(mt(this)), l && l.replaceChild(s, this));
        }, i);
      }
    }), u.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(i, s) {
      u.fn[i] = function(l) {
        for (var f, h = [], v = u(l), m = v.length - 1, O = 0; O <= m; O++)
          f = O === m ? this : this.clone(!0), u(v[O])[s](f), d.apply(h, f.get());
        return this.pushStack(h);
      };
    });
    var Ca = new RegExp("^(" + Ce + ")(?!px)[a-z%]+$", "i"), xa = /^--/, no = function(i) {
      var s = i.ownerDocument.defaultView;
      return (!s || !s.opener) && (s = t), s.getComputedStyle(i);
    }, cu = function(i, s, l) {
      var f, h, v = {};
      for (h in s)
        v[h] = i.style[h], i.style[h] = s[h];
      f = l.call(i);
      for (h in s)
        i.style[h] = v[h];
      return f;
    }, Zh = new RegExp(ge.join("|"), "i"), fu = "[\\x20\\t\\r\\n\\f]", ev = new RegExp(
      "^" + fu + "+|((?:^|[^\\\\])(?:\\\\.)*)" + fu + "+$",
      "g"
    );
    (function() {
      function i() {
        if (M) {
          T.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", M.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", Te.appendChild(T).appendChild(M);
          var H = t.getComputedStyle(M);
          l = H.top !== "1%", O = s(H.marginLeft) === 12, M.style.right = "60%", v = s(H.right) === 36, f = s(H.width) === 36, M.style.position = "absolute", h = s(M.offsetWidth / 3) === 12, Te.removeChild(T), M = null;
        }
      }
      function s(H) {
        return Math.round(parseFloat(H));
      }
      var l, f, h, v, m, O, T = N.createElement("div"), M = N.createElement("div");
      M.style && (M.style.backgroundClip = "content-box", M.cloneNode(!0).style.backgroundClip = "", w.clearCloneStyle = M.style.backgroundClip === "content-box", u.extend(w, {
        boxSizingReliable: function() {
          return i(), f;
        },
        pixelBoxStyles: function() {
          return i(), v;
        },
        pixelPosition: function() {
          return i(), l;
        },
        reliableMarginLeft: function() {
          return i(), O;
        },
        scrollboxSize: function() {
          return i(), h;
        },
        // Support: IE 9 - 11+, Edge 15 - 18+
        // IE/Edge misreport `getComputedStyle` of table rows with width/height
        // set in CSS while `offset*` properties report correct values.
        // Behavior in IE 9 is more subtle than in newer versions & it passes
        // some versions of this test; make sure not to make it pass there!
        //
        // Support: Firefox 70+
        // Only Firefox includes border widths
        // in computed dimensions. (gh-4529)
        reliableTrDimensions: function() {
          var H, ee, $, q;
          return m == null && (H = N.createElement("table"), ee = N.createElement("tr"), $ = N.createElement("div"), H.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", ee.style.cssText = "border:1px solid", ee.style.height = "1px", $.style.height = "9px", $.style.display = "block", Te.appendChild(H).appendChild(ee).appendChild($), q = t.getComputedStyle(ee), m = parseInt(q.height, 10) + parseInt(q.borderTopWidth, 10) + parseInt(q.borderBottomWidth, 10) === ee.offsetHeight, Te.removeChild(H)), m;
        }
      }));
    })();
    function fi(i, s, l) {
      var f, h, v, m, O = xa.test(s), T = i.style;
      return l = l || no(i), l && (m = l.getPropertyValue(s) || l[s], O && m && (m = m.replace(ev, "$1") || void 0), m === "" && !Le(i) && (m = u.style(i, s)), !w.pixelBoxStyles() && Ca.test(m) && Zh.test(s) && (f = T.width, h = T.minWidth, v = T.maxWidth, T.minWidth = T.maxWidth = T.width = m, m = l.width, T.width = f, T.minWidth = h, T.maxWidth = v)), m !== void 0 ? (
        // Support: IE <=9 - 11 only
        // IE returns zIndex value as an integer.
        m + ""
      ) : m;
    }
    function du(i, s) {
      return {
        get: function() {
          if (i()) {
            delete this.get;
            return;
          }
          return (this.get = s).apply(this, arguments);
        }
      };
    }
    var pu = ["Webkit", "Moz", "ms"], hu = N.createElement("div").style, vu = {};
    function tv(i) {
      for (var s = i[0].toUpperCase() + i.slice(1), l = pu.length; l--; )
        if (i = pu[l] + s, i in hu)
          return i;
    }
    function wa(i) {
      var s = u.cssProps[i] || vu[i];
      return s || (i in hu ? i : vu[i] = tv(i) || i);
    }
    var nv = /^(none|table(?!-c[ea]).+)/, rv = { position: "absolute", visibility: "hidden", display: "block" }, gu = {
      letterSpacing: "0",
      fontWeight: "400"
    };
    function mu(i, s, l) {
      var f = he.exec(s);
      return f ? (
        // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max(0, f[2] - (l || 0)) + (f[3] || "px")
      ) : s;
    }
    function Ta(i, s, l, f, h, v) {
      var m = s === "width" ? 1 : 0, O = 0, T = 0;
      if (l === (f ? "border" : "content"))
        return 0;
      for (; m < 4; m += 2)
        l === "margin" && (T += u.css(i, l + ge[m], !0, h)), f ? (l === "content" && (T -= u.css(i, "padding" + ge[m], !0, h)), l !== "margin" && (T -= u.css(i, "border" + ge[m] + "Width", !0, h))) : (T += u.css(i, "padding" + ge[m], !0, h), l !== "padding" ? T += u.css(i, "border" + ge[m] + "Width", !0, h) : O += u.css(i, "border" + ge[m] + "Width", !0, h));
      return !f && v >= 0 && (T += Math.max(0, Math.ceil(
        i["offset" + s[0].toUpperCase() + s.slice(1)] - v - T - O - 0.5
        // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
        // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0), T;
    }
    function yu(i, s, l) {
      var f = no(i), h = !w.boxSizingReliable() || l, v = h && u.css(i, "boxSizing", !1, f) === "border-box", m = v, O = fi(i, s, f), T = "offset" + s[0].toUpperCase() + s.slice(1);
      if (Ca.test(O)) {
        if (!l)
          return O;
        O = "auto";
      }
      return (!w.boxSizingReliable() && v || // Support: IE 10 - 11+, Edge 15 - 18+
      // IE/Edge misreport `getComputedStyle` of table rows with width/height
      // set in CSS while `offset*` properties report correct values.
      // Interestingly, in some cases IE 9 doesn't suffer from this issue.
      !w.reliableTrDimensions() && Q(i, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
      // This happens for inline elements with no explicit setting (gh-3571)
      O === "auto" || // Support: Android <=4.1 - 4.3 only
      // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
      !parseFloat(O) && u.css(i, "display", !1, f) === "inline") && // Make sure the element is visible & connected
      i.getClientRects().length && (v = u.css(i, "boxSizing", !1, f) === "border-box", m = T in i, m && (O = i[T])), O = parseFloat(O) || 0, O + Ta(
        i,
        s,
        l || (v ? "border" : "content"),
        m,
        f,
        // Provide the current computed size to request scroll gutter calculation (gh-3589)
        O
      ) + "px";
    }
    u.extend({
      // Add in style property hooks for overriding the default
      // behavior of getting and setting a style property
      cssHooks: {
        opacity: {
          get: function(i, s) {
            if (s) {
              var l = fi(i, "opacity");
              return l === "" ? "1" : l;
            }
          }
        }
      },
      // Don't automatically add "px" to these possibly-unitless properties
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      // Add in properties whose names you wish to fix before
      // setting or getting the value
      cssProps: {},
      // Get and set the style property on a DOM Node
      style: function(i, s, l, f) {
        if (!(!i || i.nodeType === 3 || i.nodeType === 8 || !i.style)) {
          var h, v, m, O = k(s), T = xa.test(s), M = i.style;
          if (T || (s = wa(O)), m = u.cssHooks[s] || u.cssHooks[O], l !== void 0) {
            if (v = typeof l, v === "string" && (h = he.exec(l)) && h[1] && (l = tt(i, s, h), v = "number"), l == null || l !== l)
              return;
            v === "number" && !T && (l += h && h[3] || (u.cssNumber[O] ? "" : "px")), !w.clearCloneStyle && l === "" && s.indexOf("background") === 0 && (M[s] = "inherit"), (!m || !("set" in m) || (l = m.set(i, l, f)) !== void 0) && (T ? M.setProperty(s, l) : M[s] = l);
          } else
            return m && "get" in m && (h = m.get(i, !1, f)) !== void 0 ? h : M[s];
        }
      },
      css: function(i, s, l, f) {
        var h, v, m, O = k(s), T = xa.test(s);
        return T || (s = wa(O)), m = u.cssHooks[s] || u.cssHooks[O], m && "get" in m && (h = m.get(i, !0, l)), h === void 0 && (h = fi(i, s, f)), h === "normal" && s in gu && (h = gu[s]), l === "" || l ? (v = parseFloat(h), l === !0 || isFinite(v) ? v || 0 : h) : h;
      }
    }), u.each(["height", "width"], function(i, s) {
      u.cssHooks[s] = {
        get: function(l, f, h) {
          if (f)
            return nv.test(u.css(l, "display")) && // Support: Safari 8+
            // Table columns in Safari have non-zero offsetWidth & zero
            // getBoundingClientRect().width unless display is changed.
            // Support: IE <=11 only
            // Running getBoundingClientRect on a disconnected node
            // in IE throws an error.
            (!l.getClientRects().length || !l.getBoundingClientRect().width) ? cu(l, rv, function() {
              return yu(l, s, h);
            }) : yu(l, s, h);
        },
        set: function(l, f, h) {
          var v, m = no(l), O = !w.scrollboxSize() && m.position === "absolute", T = O || h, M = T && u.css(l, "boxSizing", !1, m) === "border-box", H = h ? Ta(
            l,
            s,
            h,
            M,
            m
          ) : 0;
          return M && O && (H -= Math.ceil(
            l["offset" + s[0].toUpperCase() + s.slice(1)] - parseFloat(m[s]) - Ta(l, s, "border", !1, m) - 0.5
          )), H && (v = he.exec(f)) && (v[3] || "px") !== "px" && (l.style[s] = f, f = u.css(l, s)), mu(l, f, H);
        }
      };
    }), u.cssHooks.marginLeft = du(
      w.reliableMarginLeft,
      function(i, s) {
        if (s)
          return (parseFloat(fi(i, "marginLeft")) || i.getBoundingClientRect().left - cu(i, { marginLeft: 0 }, function() {
            return i.getBoundingClientRect().left;
          })) + "px";
      }
    ), u.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(i, s) {
      u.cssHooks[i + s] = {
        expand: function(l) {
          for (var f = 0, h = {}, v = typeof l == "string" ? l.split(" ") : [l]; f < 4; f++)
            h[i + ge[f] + s] = v[f] || v[f - 2] || v[0];
          return h;
        }
      }, i !== "margin" && (u.cssHooks[i + s].set = mu);
    }), u.fn.extend({
      css: function(i, s) {
        return ht(this, function(l, f, h) {
          var v, m, O = {}, T = 0;
          if (Array.isArray(f)) {
            for (v = no(l), m = f.length; T < m; T++)
              O[f[T]] = u.css(l, f[T], !1, v);
            return O;
          }
          return h !== void 0 ? u.style(l, f, h) : u.css(l, f);
        }, i, s, arguments.length > 1);
      }
    });
    function Pt(i, s, l, f, h) {
      return new Pt.prototype.init(i, s, l, f, h);
    }
    u.Tween = Pt, Pt.prototype = {
      constructor: Pt,
      init: function(i, s, l, f, h, v) {
        this.elem = i, this.prop = l, this.easing = h || u.easing._default, this.options = s, this.start = this.now = this.cur(), this.end = f, this.unit = v || (u.cssNumber[l] ? "" : "px");
      },
      cur: function() {
        var i = Pt.propHooks[this.prop];
        return i && i.get ? i.get(this) : Pt.propHooks._default.get(this);
      },
      run: function(i) {
        var s, l = Pt.propHooks[this.prop];
        return this.options.duration ? this.pos = s = u.easing[this.easing](
          i,
          this.options.duration * i,
          0,
          1,
          this.options.duration
        ) : this.pos = s = i, this.now = (this.end - this.start) * s + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), l && l.set ? l.set(this) : Pt.propHooks._default.set(this), this;
      }
    }, Pt.prototype.init.prototype = Pt.prototype, Pt.propHooks = {
      _default: {
        get: function(i) {
          var s;
          return i.elem.nodeType !== 1 || i.elem[i.prop] != null && i.elem.style[i.prop] == null ? i.elem[i.prop] : (s = u.css(i.elem, i.prop, ""), !s || s === "auto" ? 0 : s);
        },
        set: function(i) {
          u.fx.step[i.prop] ? u.fx.step[i.prop](i) : i.elem.nodeType === 1 && (u.cssHooks[i.prop] || i.elem.style[wa(i.prop)] != null) ? u.style(i.elem, i.prop, i.now + i.unit) : i.elem[i.prop] = i.now;
        }
      }
    }, Pt.propHooks.scrollTop = Pt.propHooks.scrollLeft = {
      set: function(i) {
        i.elem.nodeType && i.elem.parentNode && (i.elem[i.prop] = i.now);
      }
    }, u.easing = {
      linear: function(i) {
        return i;
      },
      swing: function(i) {
        return 0.5 - Math.cos(i * Math.PI) / 2;
      },
      _default: "swing"
    }, u.fx = Pt.prototype.init, u.fx.step = {};
    var kr, ro, iv = /^(?:toggle|show|hide)$/, ov = /queueHooks$/;
    function Ea() {
      ro && (N.hidden === !1 && t.requestAnimationFrame ? t.requestAnimationFrame(Ea) : t.setTimeout(Ea, u.fx.interval), u.fx.tick());
    }
    function bu() {
      return t.setTimeout(function() {
        kr = void 0;
      }), kr = Date.now();
    }
    function io(i, s) {
      var l, f = 0, h = { height: i };
      for (s = s ? 1 : 0; f < 4; f += 2 - s)
        l = ge[f], h["margin" + l] = h["padding" + l] = i;
      return s && (h.opacity = h.width = i), h;
    }
    function Cu(i, s, l) {
      for (var f, h = (nn.tweeners[s] || []).concat(nn.tweeners["*"]), v = 0, m = h.length; v < m; v++)
        if (f = h[v].call(l, s, i))
          return f;
    }
    function av(i, s, l) {
      var f, h, v, m, O, T, M, H, ee = "width" in s || "height" in s, $ = this, q = {}, be = i.style, ke = i.nodeType && He(i), ye = j.get(i, "fxshow");
      l.queue || (m = u._queueHooks(i, "fx"), m.unqueued == null && (m.unqueued = 0, O = m.empty.fire, m.empty.fire = function() {
        m.unqueued || O();
      }), m.unqueued++, $.always(function() {
        $.always(function() {
          m.unqueued--, u.queue(i, "fx").length || m.empty.fire();
        });
      }));
      for (f in s)
        if (h = s[f], iv.test(h)) {
          if (delete s[f], v = v || h === "toggle", h === (ke ? "hide" : "show"))
            if (h === "show" && ye && ye[f] !== void 0)
              ke = !0;
            else
              continue;
          q[f] = ye && ye[f] || u.style(i, f);
        }
      if (T = !u.isEmptyObject(s), !(!T && u.isEmptyObject(q))) {
        ee && i.nodeType === 1 && (l.overflow = [be.overflow, be.overflowX, be.overflowY], M = ye && ye.display, M == null && (M = j.get(i, "display")), H = u.css(i, "display"), H === "none" && (M ? H = M : (En([i], !0), M = i.style.display || M, H = u.css(i, "display"), En([i]))), (H === "inline" || H === "inline-block" && M != null) && u.css(i, "float") === "none" && (T || ($.done(function() {
          be.display = M;
        }), M == null && (H = be.display, M = H === "none" ? "" : H)), be.display = "inline-block")), l.overflow && (be.overflow = "hidden", $.always(function() {
          be.overflow = l.overflow[0], be.overflowX = l.overflow[1], be.overflowY = l.overflow[2];
        })), T = !1;
        for (f in q)
          T || (ye ? "hidden" in ye && (ke = ye.hidden) : ye = j.access(i, "fxshow", { display: M }), v && (ye.hidden = !ke), ke && En([i], !0), $.done(function() {
            ke || En([i]), j.remove(i, "fxshow");
            for (f in q)
              u.style(i, f, q[f]);
          })), T = Cu(ke ? ye[f] : 0, f, $), f in ye || (ye[f] = T.start, ke && (T.end = T.start, T.start = 0));
      }
    }
    function sv(i, s) {
      var l, f, h, v, m;
      for (l in i)
        if (f = k(l), h = s[f], v = i[l], Array.isArray(v) && (h = v[1], v = i[l] = v[0]), l !== f && (i[f] = v, delete i[l]), m = u.cssHooks[f], m && "expand" in m) {
          v = m.expand(v), delete i[f];
          for (l in v)
            l in i || (i[l] = v[l], s[l] = h);
        } else
          s[f] = h;
    }
    function nn(i, s, l) {
      var f, h, v = 0, m = nn.prefilters.length, O = u.Deferred().always(function() {
        delete T.elem;
      }), T = function() {
        if (h)
          return !1;
        for (var ee = kr || bu(), $ = Math.max(0, M.startTime + M.duration - ee), q = $ / M.duration || 0, be = 1 - q, ke = 0, ye = M.tweens.length; ke < ye; ke++)
          M.tweens[ke].run(be);
        return O.notifyWith(i, [M, be, $]), be < 1 && ye ? $ : (ye || O.notifyWith(i, [M, 1, 0]), O.resolveWith(i, [M]), !1);
      }, M = O.promise({
        elem: i,
        props: u.extend({}, s),
        opts: u.extend(!0, {
          specialEasing: {},
          easing: u.easing._default
        }, l),
        originalProperties: s,
        originalOptions: l,
        startTime: kr || bu(),
        duration: l.duration,
        tweens: [],
        createTween: function(ee, $) {
          var q = u.Tween(
            i,
            M.opts,
            ee,
            $,
            M.opts.specialEasing[ee] || M.opts.easing
          );
          return M.tweens.push(q), q;
        },
        stop: function(ee) {
          var $ = 0, q = ee ? M.tweens.length : 0;
          if (h)
            return this;
          for (h = !0; $ < q; $++)
            M.tweens[$].run(1);
          return ee ? (O.notifyWith(i, [M, 1, 0]), O.resolveWith(i, [M, ee])) : O.rejectWith(i, [M, ee]), this;
        }
      }), H = M.props;
      for (sv(H, M.opts.specialEasing); v < m; v++)
        if (f = nn.prefilters[v].call(M, i, H, M.opts), f)
          return A(f.stop) && (u._queueHooks(M.elem, M.opts.queue).stop = f.stop.bind(f)), f;
      return u.map(H, Cu, M), A(M.opts.start) && M.opts.start.call(i, M), M.progress(M.opts.progress).done(M.opts.done, M.opts.complete).fail(M.opts.fail).always(M.opts.always), u.fx.timer(
        u.extend(T, {
          elem: i,
          anim: M,
          queue: M.opts.queue
        })
      ), M;
    }
    u.Animation = u.extend(nn, {
      tweeners: {
        "*": [function(i, s) {
          var l = this.createTween(i, s);
          return tt(l.elem, i, he.exec(s), l), l;
        }]
      },
      tweener: function(i, s) {
        A(i) ? (s = i, i = ["*"]) : i = i.match(Ee);
        for (var l, f = 0, h = i.length; f < h; f++)
          l = i[f], nn.tweeners[l] = nn.tweeners[l] || [], nn.tweeners[l].unshift(s);
      },
      prefilters: [av],
      prefilter: function(i, s) {
        s ? nn.prefilters.unshift(i) : nn.prefilters.push(i);
      }
    }), u.speed = function(i, s, l) {
      var f = i && typeof i == "object" ? u.extend({}, i) : {
        complete: l || !l && s || A(i) && i,
        duration: i,
        easing: l && s || s && !A(s) && s
      };
      return u.fx.off ? f.duration = 0 : typeof f.duration != "number" && (f.duration in u.fx.speeds ? f.duration = u.fx.speeds[f.duration] : f.duration = u.fx.speeds._default), (f.queue == null || f.queue === !0) && (f.queue = "fx"), f.old = f.complete, f.complete = function() {
        A(f.old) && f.old.call(this), f.queue && u.dequeue(this, f.queue);
      }, f;
    }, u.fn.extend({
      fadeTo: function(i, s, l, f) {
        return this.filter(He).css("opacity", 0).show().end().animate({ opacity: s }, i, l, f);
      },
      animate: function(i, s, l, f) {
        var h = u.isEmptyObject(i), v = u.speed(s, l, f), m = function() {
          var O = nn(this, u.extend({}, i), v);
          (h || j.get(this, "finish")) && O.stop(!0);
        };
        return m.finish = m, h || v.queue === !1 ? this.each(m) : this.queue(v.queue, m);
      },
      stop: function(i, s, l) {
        var f = function(h) {
          var v = h.stop;
          delete h.stop, v(l);
        };
        return typeof i != "string" && (l = s, s = i, i = void 0), s && this.queue(i || "fx", []), this.each(function() {
          var h = !0, v = i != null && i + "queueHooks", m = u.timers, O = j.get(this);
          if (v)
            O[v] && O[v].stop && f(O[v]);
          else
            for (v in O)
              O[v] && O[v].stop && ov.test(v) && f(O[v]);
          for (v = m.length; v--; )
            m[v].elem === this && (i == null || m[v].queue === i) && (m[v].anim.stop(l), h = !1, m.splice(v, 1));
          (h || !l) && u.dequeue(this, i);
        });
      },
      finish: function(i) {
        return i !== !1 && (i = i || "fx"), this.each(function() {
          var s, l = j.get(this), f = l[i + "queue"], h = l[i + "queueHooks"], v = u.timers, m = f ? f.length : 0;
          for (l.finish = !0, u.queue(this, i, []), h && h.stop && h.stop.call(this, !0), s = v.length; s--; )
            v[s].elem === this && v[s].queue === i && (v[s].anim.stop(!0), v.splice(s, 1));
          for (s = 0; s < m; s++)
            f[s] && f[s].finish && f[s].finish.call(this);
          delete l.finish;
        });
      }
    }), u.each(["toggle", "show", "hide"], function(i, s) {
      var l = u.fn[s];
      u.fn[s] = function(f, h, v) {
        return f == null || typeof f == "boolean" ? l.apply(this, arguments) : this.animate(io(s, !0), f, h, v);
      };
    }), u.each({
      slideDown: io("show"),
      slideUp: io("hide"),
      slideToggle: io("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" }
    }, function(i, s) {
      u.fn[i] = function(l, f, h) {
        return this.animate(s, l, f, h);
      };
    }), u.timers = [], u.fx.tick = function() {
      var i, s = 0, l = u.timers;
      for (kr = Date.now(); s < l.length; s++)
        i = l[s], !i() && l[s] === i && l.splice(s--, 1);
      l.length || u.fx.stop(), kr = void 0;
    }, u.fx.timer = function(i) {
      u.timers.push(i), u.fx.start();
    }, u.fx.interval = 13, u.fx.start = function() {
      ro || (ro = !0, Ea());
    }, u.fx.stop = function() {
      ro = null;
    }, u.fx.speeds = {
      slow: 600,
      fast: 200,
      // Default speed
      _default: 400
    }, u.fn.delay = function(i, s) {
      return i = u.fx && u.fx.speeds[i] || i, s = s || "fx", this.queue(s, function(l, f) {
        var h = t.setTimeout(l, i);
        f.stop = function() {
          t.clearTimeout(h);
        };
      });
    }, function() {
      var i = N.createElement("input"), s = N.createElement("select"), l = s.appendChild(N.createElement("option"));
      i.type = "checkbox", w.checkOn = i.value !== "", w.optSelected = l.selected, i = N.createElement("input"), i.value = "t", i.type = "radio", w.radioValue = i.value === "t";
    }();
    var xu, di = u.expr.attrHandle;
    u.fn.extend({
      attr: function(i, s) {
        return ht(this, u.attr, i, s, arguments.length > 1);
      },
      removeAttr: function(i) {
        return this.each(function() {
          u.removeAttr(this, i);
        });
      }
    }), u.extend({
      attr: function(i, s, l) {
        var f, h, v = i.nodeType;
        if (!(v === 3 || v === 8 || v === 2)) {
          if (typeof i.getAttribute > "u")
            return u.prop(i, s, l);
          if ((v !== 1 || !u.isXMLDoc(i)) && (h = u.attrHooks[s.toLowerCase()] || (u.expr.match.bool.test(s) ? xu : void 0)), l !== void 0) {
            if (l === null) {
              u.removeAttr(i, s);
              return;
            }
            return h && "set" in h && (f = h.set(i, l, s)) !== void 0 ? f : (i.setAttribute(s, l + ""), l);
          }
          return h && "get" in h && (f = h.get(i, s)) !== null ? f : (f = u.find.attr(i, s), f ?? void 0);
        }
      },
      attrHooks: {
        type: {
          set: function(i, s) {
            if (!w.radioValue && s === "radio" && Q(i, "input")) {
              var l = i.value;
              return i.setAttribute("type", s), l && (i.value = l), s;
            }
          }
        }
      },
      removeAttr: function(i, s) {
        var l, f = 0, h = s && s.match(Ee);
        if (h && i.nodeType === 1)
          for (; l = h[f++]; )
            i.removeAttribute(l);
      }
    }), xu = {
      set: function(i, s, l) {
        return s === !1 ? u.removeAttr(i, l) : i.setAttribute(l, l), l;
      }
    }, u.each(u.expr.match.bool.source.match(/\w+/g), function(i, s) {
      var l = di[s] || u.find.attr;
      di[s] = function(f, h, v) {
        var m, O, T = h.toLowerCase();
        return v || (O = di[T], di[T] = m, m = l(f, h, v) != null ? T : null, di[T] = O), m;
      };
    });
    var lv = /^(?:input|select|textarea|button)$/i, uv = /^(?:a|area)$/i;
    u.fn.extend({
      prop: function(i, s) {
        return ht(this, u.prop, i, s, arguments.length > 1);
      },
      removeProp: function(i) {
        return this.each(function() {
          delete this[u.propFix[i] || i];
        });
      }
    }), u.extend({
      prop: function(i, s, l) {
        var f, h, v = i.nodeType;
        if (!(v === 3 || v === 8 || v === 2))
          return (v !== 1 || !u.isXMLDoc(i)) && (s = u.propFix[s] || s, h = u.propHooks[s]), l !== void 0 ? h && "set" in h && (f = h.set(i, l, s)) !== void 0 ? f : i[s] = l : h && "get" in h && (f = h.get(i, s)) !== null ? f : i[s];
      },
      propHooks: {
        tabIndex: {
          get: function(i) {
            var s = u.find.attr(i, "tabindex");
            return s ? parseInt(s, 10) : lv.test(i.nodeName) || uv.test(i.nodeName) && i.href ? 0 : -1;
          }
        }
      },
      propFix: {
        for: "htmlFor",
        class: "className"
      }
    }), w.optSelected || (u.propHooks.selected = {
      get: function(i) {
        var s = i.parentNode;
        return s && s.parentNode && s.parentNode.selectedIndex, null;
      },
      set: function(i) {
        var s = i.parentNode;
        s && (s.selectedIndex, s.parentNode && s.parentNode.selectedIndex);
      }
    }), u.each([
      "tabIndex",
      "readOnly",
      "maxLength",
      "cellSpacing",
      "cellPadding",
      "rowSpan",
      "colSpan",
      "useMap",
      "frameBorder",
      "contentEditable"
    ], function() {
      u.propFix[this.toLowerCase()] = this;
    });
    function rr(i) {
      var s = i.match(Ee) || [];
      return s.join(" ");
    }
    function ir(i) {
      return i.getAttribute && i.getAttribute("class") || "";
    }
    function Sa(i) {
      return Array.isArray(i) ? i : typeof i == "string" ? i.match(Ee) || [] : [];
    }
    u.fn.extend({
      addClass: function(i) {
        var s, l, f, h, v, m;
        return A(i) ? this.each(function(O) {
          u(this).addClass(i.call(this, O, ir(this)));
        }) : (s = Sa(i), s.length ? this.each(function() {
          if (f = ir(this), l = this.nodeType === 1 && " " + rr(f) + " ", l) {
            for (v = 0; v < s.length; v++)
              h = s[v], l.indexOf(" " + h + " ") < 0 && (l += h + " ");
            m = rr(l), f !== m && this.setAttribute("class", m);
          }
        }) : this);
      },
      removeClass: function(i) {
        var s, l, f, h, v, m;
        return A(i) ? this.each(function(O) {
          u(this).removeClass(i.call(this, O, ir(this)));
        }) : arguments.length ? (s = Sa(i), s.length ? this.each(function() {
          if (f = ir(this), l = this.nodeType === 1 && " " + rr(f) + " ", l) {
            for (v = 0; v < s.length; v++)
              for (h = s[v]; l.indexOf(" " + h + " ") > -1; )
                l = l.replace(" " + h + " ", " ");
            m = rr(l), f !== m && this.setAttribute("class", m);
          }
        }) : this) : this.attr("class", "");
      },
      toggleClass: function(i, s) {
        var l, f, h, v, m = typeof i, O = m === "string" || Array.isArray(i);
        return A(i) ? this.each(function(T) {
          u(this).toggleClass(
            i.call(this, T, ir(this), s),
            s
          );
        }) : typeof s == "boolean" && O ? s ? this.addClass(i) : this.removeClass(i) : (l = Sa(i), this.each(function() {
          if (O)
            for (v = u(this), h = 0; h < l.length; h++)
              f = l[h], v.hasClass(f) ? v.removeClass(f) : v.addClass(f);
          else
            (i === void 0 || m === "boolean") && (f = ir(this), f && j.set(this, "__className__", f), this.setAttribute && this.setAttribute(
              "class",
              f || i === !1 ? "" : j.get(this, "__className__") || ""
            ));
        }));
      },
      hasClass: function(i) {
        var s, l, f = 0;
        for (s = " " + i + " "; l = this[f++]; )
          if (l.nodeType === 1 && (" " + rr(ir(l)) + " ").indexOf(s) > -1)
            return !0;
        return !1;
      }
    });
    var cv = /\r/g;
    u.fn.extend({
      val: function(i) {
        var s, l, f, h = this[0];
        return arguments.length ? (f = A(i), this.each(function(v) {
          var m;
          this.nodeType === 1 && (f ? m = i.call(this, v, u(this).val()) : m = i, m == null ? m = "" : typeof m == "number" ? m += "" : Array.isArray(m) && (m = u.map(m, function(O) {
            return O == null ? "" : O + "";
          })), s = u.valHooks[this.type] || u.valHooks[this.nodeName.toLowerCase()], (!s || !("set" in s) || s.set(this, m, "value") === void 0) && (this.value = m));
        })) : h ? (s = u.valHooks[h.type] || u.valHooks[h.nodeName.toLowerCase()], s && "get" in s && (l = s.get(h, "value")) !== void 0 ? l : (l = h.value, typeof l == "string" ? l.replace(cv, "") : l ?? "")) : void 0;
      }
    }), u.extend({
      valHooks: {
        option: {
          get: function(i) {
            var s = u.find.attr(i, "value");
            return s ?? // Support: IE <=10 - 11 only
            // option.text throws exceptions (trac-14686, trac-14858)
            // Strip and collapse whitespace
            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
            rr(u.text(i));
          }
        },
        select: {
          get: function(i) {
            var s, l, f, h = i.options, v = i.selectedIndex, m = i.type === "select-one", O = m ? null : [], T = m ? v + 1 : h.length;
            for (v < 0 ? f = T : f = m ? v : 0; f < T; f++)
              if (l = h[f], (l.selected || f === v) && // Don't return options that are disabled or in a disabled optgroup
              !l.disabled && (!l.parentNode.disabled || !Q(l.parentNode, "optgroup"))) {
                if (s = u(l).val(), m)
                  return s;
                O.push(s);
              }
            return O;
          },
          set: function(i, s) {
            for (var l, f, h = i.options, v = u.makeArray(s), m = h.length; m--; )
              f = h[m], (f.selected = u.inArray(u.valHooks.option.get(f), v) > -1) && (l = !0);
            return l || (i.selectedIndex = -1), v;
          }
        }
      }
    }), u.each(["radio", "checkbox"], function() {
      u.valHooks[this] = {
        set: function(i, s) {
          if (Array.isArray(s))
            return i.checked = u.inArray(u(i).val(), s) > -1;
        }
      }, w.checkOn || (u.valHooks[this].get = function(i) {
        return i.getAttribute("value") === null ? "on" : i.value;
      });
    }), w.focusin = "onfocusin" in t;
    var wu = /^(?:focusinfocus|focusoutblur)$/, Tu = function(i) {
      i.stopPropagation();
    };
    u.extend(u.event, {
      trigger: function(i, s, l, f) {
        var h, v, m, O, T, M, H, ee, $ = [l || N], q = C.call(i, "type") ? i.type : i, be = C.call(i, "namespace") ? i.namespace.split(".") : [];
        if (v = ee = m = l = l || N, !(l.nodeType === 3 || l.nodeType === 8) && !wu.test(q + u.event.triggered) && (q.indexOf(".") > -1 && (be = q.split("."), q = be.shift(), be.sort()), T = q.indexOf(":") < 0 && "on" + q, i = i[u.expando] ? i : new u.Event(q, typeof i == "object" && i), i.isTrigger = f ? 2 : 3, i.namespace = be.join("."), i.rnamespace = i.namespace ? new RegExp("(^|\\.)" + be.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.result = void 0, i.target || (i.target = l), s = s == null ? [i] : u.makeArray(s, [i]), H = u.event.special[q] || {}, !(!f && H.trigger && H.trigger.apply(l, s) === !1))) {
          if (!f && !H.noBubble && !D(l)) {
            for (O = H.delegateType || q, wu.test(O + q) || (v = v.parentNode); v; v = v.parentNode)
              $.push(v), m = v;
            m === (l.ownerDocument || N) && $.push(m.defaultView || m.parentWindow || t);
          }
          for (h = 0; (v = $[h++]) && !i.isPropagationStopped(); )
            ee = v, i.type = h > 1 ? O : H.bindType || q, M = (j.get(v, "events") || /* @__PURE__ */ Object.create(null))[i.type] && j.get(v, "handle"), M && M.apply(v, s), M = T && v[T], M && M.apply && W(v) && (i.result = M.apply(v, s), i.result === !1 && i.preventDefault());
          return i.type = q, !f && !i.isDefaultPrevented() && (!H._default || H._default.apply($.pop(), s) === !1) && W(l) && T && A(l[q]) && !D(l) && (m = l[T], m && (l[T] = null), u.event.triggered = q, i.isPropagationStopped() && ee.addEventListener(q, Tu), l[q](), i.isPropagationStopped() && ee.removeEventListener(q, Tu), u.event.triggered = void 0, m && (l[T] = m)), i.result;
        }
      },
      // Piggyback on a donor event to simulate a different one
      // Used only for `focus(in | out)` events
      simulate: function(i, s, l) {
        var f = u.extend(
          new u.Event(),
          l,
          {
            type: i,
            isSimulated: !0
          }
        );
        u.event.trigger(f, null, s);
      }
    }), u.fn.extend({
      trigger: function(i, s) {
        return this.each(function() {
          u.event.trigger(i, s, this);
        });
      },
      triggerHandler: function(i, s) {
        var l = this[0];
        if (l)
          return u.event.trigger(i, s, l, !0);
      }
    }), w.focusin || u.each({ focus: "focusin", blur: "focusout" }, function(i, s) {
      var l = function(f) {
        u.event.simulate(s, f.target, u.event.fix(f));
      };
      u.event.special[s] = {
        setup: function() {
          var f = this.ownerDocument || this.document || this, h = j.access(f, s);
          h || f.addEventListener(i, l, !0), j.access(f, s, (h || 0) + 1);
        },
        teardown: function() {
          var f = this.ownerDocument || this.document || this, h = j.access(f, s) - 1;
          h ? j.access(f, s, h) : (f.removeEventListener(i, l, !0), j.remove(f, s));
        }
      };
    });
    var pi = t.location, Eu = { guid: Date.now() }, Oa = /\?/;
    u.parseXML = function(i) {
      var s, l;
      if (!i || typeof i != "string")
        return null;
      try {
        s = new t.DOMParser().parseFromString(i, "text/xml");
      } catch {
      }
      return l = s && s.getElementsByTagName("parsererror")[0], (!s || l) && u.error("Invalid XML: " + (l ? u.map(l.childNodes, function(f) {
        return f.textContent;
      }).join(`
`) : i)), s;
    };
    var fv = /\[\]$/, Su = /\r?\n/g, dv = /^(?:submit|button|image|reset|file)$/i, pv = /^(?:input|select|textarea|keygen)/i;
    function _a(i, s, l, f) {
      var h;
      if (Array.isArray(s))
        u.each(s, function(v, m) {
          l || fv.test(i) ? f(i, m) : _a(
            i + "[" + (typeof m == "object" && m != null ? v : "") + "]",
            m,
            l,
            f
          );
        });
      else if (!l && J(s) === "object")
        for (h in s)
          _a(i + "[" + h + "]", s[h], l, f);
      else
        f(i, s);
    }
    u.param = function(i, s) {
      var l, f = [], h = function(v, m) {
        var O = A(m) ? m() : m;
        f[f.length] = encodeURIComponent(v) + "=" + encodeURIComponent(O ?? "");
      };
      if (i == null)
        return "";
      if (Array.isArray(i) || i.jquery && !u.isPlainObject(i))
        u.each(i, function() {
          h(this.name, this.value);
        });
      else
        for (l in i)
          _a(l, i[l], s, h);
      return f.join("&");
    }, u.fn.extend({
      serialize: function() {
        return u.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
          var i = u.prop(this, "elements");
          return i ? u.makeArray(i) : this;
        }).filter(function() {
          var i = this.type;
          return this.name && !u(this).is(":disabled") && pv.test(this.nodeName) && !dv.test(i) && (this.checked || !tn.test(i));
        }).map(function(i, s) {
          var l = u(this).val();
          return l == null ? null : Array.isArray(l) ? u.map(l, function(f) {
            return { name: s.name, value: f.replace(Su, `\r
`) };
          }) : { name: s.name, value: l.replace(Su, `\r
`) };
        }).get();
      }
    });
    var hv = /%20/g, vv = /#.*$/, gv = /([?&])_=[^&]*/, mv = /^(.*?):[ \t]*([^\r\n]*)$/mg, yv = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, bv = /^(?:GET|HEAD)$/, Cv = /^\/\//, Ou = {}, Aa = {}, _u = "*/".concat("*"), Pa = N.createElement("a");
    Pa.href = pi.href;
    function Au(i) {
      return function(s, l) {
        typeof s != "string" && (l = s, s = "*");
        var f, h = 0, v = s.toLowerCase().match(Ee) || [];
        if (A(l))
          for (; f = v[h++]; )
            f[0] === "+" ? (f = f.slice(1) || "*", (i[f] = i[f] || []).unshift(l)) : (i[f] = i[f] || []).push(l);
      };
    }
    function Pu(i, s, l, f) {
      var h = {}, v = i === Aa;
      function m(O) {
        var T;
        return h[O] = !0, u.each(i[O] || [], function(M, H) {
          var ee = H(s, l, f);
          if (typeof ee == "string" && !v && !h[ee])
            return s.dataTypes.unshift(ee), m(ee), !1;
          if (v)
            return !(T = ee);
        }), T;
      }
      return m(s.dataTypes[0]) || !h["*"] && m("*");
    }
    function Na(i, s) {
      var l, f, h = u.ajaxSettings.flatOptions || {};
      for (l in s)
        s[l] !== void 0 && ((h[l] ? i : f || (f = {}))[l] = s[l]);
      return f && u.extend(!0, i, f), i;
    }
    function xv(i, s, l) {
      for (var f, h, v, m, O = i.contents, T = i.dataTypes; T[0] === "*"; )
        T.shift(), f === void 0 && (f = i.mimeType || s.getResponseHeader("Content-Type"));
      if (f) {
        for (h in O)
          if (O[h] && O[h].test(f)) {
            T.unshift(h);
            break;
          }
      }
      if (T[0] in l)
        v = T[0];
      else {
        for (h in l) {
          if (!T[0] || i.converters[h + " " + T[0]]) {
            v = h;
            break;
          }
          m || (m = h);
        }
        v = v || m;
      }
      if (v)
        return v !== T[0] && T.unshift(v), l[v];
    }
    function wv(i, s, l, f) {
      var h, v, m, O, T, M = {}, H = i.dataTypes.slice();
      if (H[1])
        for (m in i.converters)
          M[m.toLowerCase()] = i.converters[m];
      for (v = H.shift(); v; )
        if (i.responseFields[v] && (l[i.responseFields[v]] = s), !T && f && i.dataFilter && (s = i.dataFilter(s, i.dataType)), T = v, v = H.shift(), v) {
          if (v === "*")
            v = T;
          else if (T !== "*" && T !== v) {
            if (m = M[T + " " + v] || M["* " + v], !m) {
              for (h in M)
                if (O = h.split(" "), O[1] === v && (m = M[T + " " + O[0]] || M["* " + O[0]], m)) {
                  m === !0 ? m = M[h] : M[h] !== !0 && (v = O[0], H.unshift(O[1]));
                  break;
                }
            }
            if (m !== !0)
              if (m && i.throws)
                s = m(s);
              else
                try {
                  s = m(s);
                } catch (ee) {
                  return {
                    state: "parsererror",
                    error: m ? ee : "No conversion from " + T + " to " + v
                  };
                }
          }
        }
      return { state: "success", data: s };
    }
    u.extend({
      // Counter for holding the number of active queries
      active: 0,
      // Last-Modified header cache for next request
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: pi.href,
        type: "GET",
        isLocal: yv.test(pi.protocol),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */
        accepts: {
          "*": _u,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {
          xml: /\bxml\b/,
          html: /\bhtml/,
          json: /\bjson\b/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },
        // Data converters
        // Keys separate source (or catchall "*") and destination types with a single space
        converters: {
          // Convert anything to text
          "* text": String,
          // Text to html (true = no transformation)
          "text html": !0,
          // Evaluate text as a json expression
          "text json": JSON.parse,
          // Parse text as xml
          "text xml": u.parseXML
        },
        // For options that shouldn't be deep extended:
        // you can add your own custom options here if
        // and when you create one that shouldn't be
        // deep extended (see ajaxExtend)
        flatOptions: {
          url: !0,
          context: !0
        }
      },
      // Creates a full fledged settings object into target
      // with both ajaxSettings and settings fields.
      // If target is omitted, writes into ajaxSettings.
      ajaxSetup: function(i, s) {
        return s ? (
          // Building a settings object
          Na(Na(i, u.ajaxSettings), s)
        ) : (
          // Extending ajaxSettings
          Na(u.ajaxSettings, i)
        );
      },
      ajaxPrefilter: Au(Ou),
      ajaxTransport: Au(Aa),
      // Main method
      ajax: function(i, s) {
        typeof i == "object" && (s = i, i = void 0), s = s || {};
        var l, f, h, v, m, O, T, M, H, ee, $ = u.ajaxSetup({}, s), q = $.context || $, be = $.context && (q.nodeType || q.jquery) ? u(q) : u.event, ke = u.Deferred(), ye = u.Callbacks("once memory"), ut = $.statusCode || {}, st = {}, jt = {}, Ve = "canceled", Ne = {
          readyState: 0,
          // Builds headers hashtable if needed
          getResponseHeader: function(Be) {
            var rt;
            if (T) {
              if (!v)
                for (v = {}; rt = mv.exec(h); )
                  v[rt[1].toLowerCase() + " "] = (v[rt[1].toLowerCase() + " "] || []).concat(rt[2]);
              rt = v[Be.toLowerCase() + " "];
            }
            return rt == null ? null : rt.join(", ");
          },
          // Raw string
          getAllResponseHeaders: function() {
            return T ? h : null;
          },
          // Caches the header
          setRequestHeader: function(Be, rt) {
            return T == null && (Be = jt[Be.toLowerCase()] = jt[Be.toLowerCase()] || Be, st[Be] = rt), this;
          },
          // Overrides response content-type header
          overrideMimeType: function(Be) {
            return T == null && ($.mimeType = Be), this;
          },
          // Status-dependent callbacks
          statusCode: function(Be) {
            var rt;
            if (Be)
              if (T)
                Ne.always(Be[Ne.status]);
              else
                for (rt in Be)
                  ut[rt] = [ut[rt], Be[rt]];
            return this;
          },
          // Cancel the request
          abort: function(Be) {
            var rt = Be || Ve;
            return l && l.abort(rt), Nt(0, rt), this;
          }
        };
        if (ke.promise(Ne), $.url = ((i || $.url || pi.href) + "").replace(Cv, pi.protocol + "//"), $.type = s.method || s.type || $.method || $.type, $.dataTypes = ($.dataType || "*").toLowerCase().match(Ee) || [""], $.crossDomain == null) {
          O = N.createElement("a");
          try {
            O.href = $.url, O.href = O.href, $.crossDomain = Pa.protocol + "//" + Pa.host != O.protocol + "//" + O.host;
          } catch {
            $.crossDomain = !0;
          }
        }
        if ($.data && $.processData && typeof $.data != "string" && ($.data = u.param($.data, $.traditional)), Pu(Ou, $, s, Ne), T)
          return Ne;
        M = u.event && $.global, M && u.active++ === 0 && u.event.trigger("ajaxStart"), $.type = $.type.toUpperCase(), $.hasContent = !bv.test($.type), f = $.url.replace(vv, ""), $.hasContent ? $.data && $.processData && ($.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && ($.data = $.data.replace(hv, "+")) : (ee = $.url.slice(f.length), $.data && ($.processData || typeof $.data == "string") && (f += (Oa.test(f) ? "&" : "?") + $.data, delete $.data), $.cache === !1 && (f = f.replace(gv, "$1"), ee = (Oa.test(f) ? "&" : "?") + "_=" + Eu.guid++ + ee), $.url = f + ee), $.ifModified && (u.lastModified[f] && Ne.setRequestHeader("If-Modified-Since", u.lastModified[f]), u.etag[f] && Ne.setRequestHeader("If-None-Match", u.etag[f])), ($.data && $.hasContent && $.contentType !== !1 || s.contentType) && Ne.setRequestHeader("Content-Type", $.contentType), Ne.setRequestHeader(
          "Accept",
          $.dataTypes[0] && $.accepts[$.dataTypes[0]] ? $.accepts[$.dataTypes[0]] + ($.dataTypes[0] !== "*" ? ", " + _u + "; q=0.01" : "") : $.accepts["*"]
        );
        for (H in $.headers)
          Ne.setRequestHeader(H, $.headers[H]);
        if ($.beforeSend && ($.beforeSend.call(q, Ne, $) === !1 || T))
          return Ne.abort();
        if (Ve = "abort", ye.add($.complete), Ne.done($.success), Ne.fail($.error), l = Pu(Aa, $, s, Ne), !l)
          Nt(-1, "No Transport");
        else {
          if (Ne.readyState = 1, M && be.trigger("ajaxSend", [Ne, $]), T)
            return Ne;
          $.async && $.timeout > 0 && (m = t.setTimeout(function() {
            Ne.abort("timeout");
          }, $.timeout));
          try {
            T = !1, l.send(st, Nt);
          } catch (Be) {
            if (T)
              throw Be;
            Nt(-1, Be);
          }
        }
        function Nt(Be, rt, vi, oo) {
          var Dt, or, ar, kt, Bn, Yt = rt;
          T || (T = !0, m && t.clearTimeout(m), l = void 0, h = oo || "", Ne.readyState = Be > 0 ? 4 : 0, Dt = Be >= 200 && Be < 300 || Be === 304, vi && (kt = xv($, Ne, vi)), !Dt && u.inArray("script", $.dataTypes) > -1 && u.inArray("json", $.dataTypes) < 0 && ($.converters["text script"] = function() {
          }), kt = wv($, kt, Ne, Dt), Dt ? ($.ifModified && (Bn = Ne.getResponseHeader("Last-Modified"), Bn && (u.lastModified[f] = Bn), Bn = Ne.getResponseHeader("etag"), Bn && (u.etag[f] = Bn)), Be === 204 || $.type === "HEAD" ? Yt = "nocontent" : Be === 304 ? Yt = "notmodified" : (Yt = kt.state, or = kt.data, ar = kt.error, Dt = !ar)) : (ar = Yt, (Be || !Yt) && (Yt = "error", Be < 0 && (Be = 0))), Ne.status = Be, Ne.statusText = (rt || Yt) + "", Dt ? ke.resolveWith(q, [or, Yt, Ne]) : ke.rejectWith(q, [Ne, Yt, ar]), Ne.statusCode(ut), ut = void 0, M && be.trigger(
            Dt ? "ajaxSuccess" : "ajaxError",
            [Ne, $, Dt ? or : ar]
          ), ye.fireWith(q, [Ne, Yt]), M && (be.trigger("ajaxComplete", [Ne, $]), --u.active || u.event.trigger("ajaxStop")));
        }
        return Ne;
      },
      getJSON: function(i, s, l) {
        return u.get(i, s, l, "json");
      },
      getScript: function(i, s) {
        return u.get(i, void 0, s, "script");
      }
    }), u.each(["get", "post"], function(i, s) {
      u[s] = function(l, f, h, v) {
        return A(f) && (v = v || h, h = f, f = void 0), u.ajax(u.extend({
          url: l,
          type: s,
          dataType: v,
          data: f,
          success: h
        }, u.isPlainObject(l) && l));
      };
    }), u.ajaxPrefilter(function(i) {
      var s;
      for (s in i.headers)
        s.toLowerCase() === "content-type" && (i.contentType = i.headers[s] || "");
    }), u._evalUrl = function(i, s, l) {
      return u.ajax({
        url: i,
        // Make this explicit, since user can override this through ajaxSetup (trac-11264)
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        // Only evaluate the response if it is successful (gh-4126)
        // dataFilter is not invoked for failure responses, so using it instead
        // of the default converter is kludgy but it works.
        converters: {
          "text script": function() {
          }
        },
        dataFilter: function(f) {
          u.globalEval(f, s, l);
        }
      });
    }, u.fn.extend({
      wrapAll: function(i) {
        var s;
        return this[0] && (A(i) && (i = i.call(this[0])), s = u(i, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && s.insertBefore(this[0]), s.map(function() {
          for (var l = this; l.firstElementChild; )
            l = l.firstElementChild;
          return l;
        }).append(this)), this;
      },
      wrapInner: function(i) {
        return A(i) ? this.each(function(s) {
          u(this).wrapInner(i.call(this, s));
        }) : this.each(function() {
          var s = u(this), l = s.contents();
          l.length ? l.wrapAll(i) : s.append(i);
        });
      },
      wrap: function(i) {
        var s = A(i);
        return this.each(function(l) {
          u(this).wrapAll(s ? i.call(this, l) : i);
        });
      },
      unwrap: function(i) {
        return this.parent(i).not("body").each(function() {
          u(this).replaceWith(this.childNodes);
        }), this;
      }
    }), u.expr.pseudos.hidden = function(i) {
      return !u.expr.pseudos.visible(i);
    }, u.expr.pseudos.visible = function(i) {
      return !!(i.offsetWidth || i.offsetHeight || i.getClientRects().length);
    }, u.ajaxSettings.xhr = function() {
      try {
        return new t.XMLHttpRequest();
      } catch {
      }
    };
    var Tv = {
      // File protocol always yields status code 0, assume 200
      0: 200,
      // Support: IE <=9 only
      // trac-1450: sometimes IE returns 1223 when it should be 204
      1223: 204
    }, hi = u.ajaxSettings.xhr();
    w.cors = !!hi && "withCredentials" in hi, w.ajax = hi = !!hi, u.ajaxTransport(function(i) {
      var s, l;
      if (w.cors || hi && !i.crossDomain)
        return {
          send: function(f, h) {
            var v, m = i.xhr();
            if (m.open(
              i.type,
              i.url,
              i.async,
              i.username,
              i.password
            ), i.xhrFields)
              for (v in i.xhrFields)
                m[v] = i.xhrFields[v];
            i.mimeType && m.overrideMimeType && m.overrideMimeType(i.mimeType), !i.crossDomain && !f["X-Requested-With"] && (f["X-Requested-With"] = "XMLHttpRequest");
            for (v in f)
              m.setRequestHeader(v, f[v]);
            s = function(O) {
              return function() {
                s && (s = l = m.onload = m.onerror = m.onabort = m.ontimeout = m.onreadystatechange = null, O === "abort" ? m.abort() : O === "error" ? typeof m.status != "number" ? h(0, "error") : h(
                  // File: protocol always yields status 0; see trac-8605, trac-14207
                  m.status,
                  m.statusText
                ) : h(
                  Tv[m.status] || m.status,
                  m.statusText,
                  // Support: IE <=9 only
                  // IE9 has no XHR2 but throws on binary (trac-11426)
                  // For XHR2 non-text, let the caller handle it (gh-2498)
                  (m.responseType || "text") !== "text" || typeof m.responseText != "string" ? { binary: m.response } : { text: m.responseText },
                  m.getAllResponseHeaders()
                ));
              };
            }, m.onload = s(), l = m.onerror = m.ontimeout = s("error"), m.onabort !== void 0 ? m.onabort = l : m.onreadystatechange = function() {
              m.readyState === 4 && t.setTimeout(function() {
                s && l();
              });
            }, s = s("abort");
            try {
              m.send(i.hasContent && i.data || null);
            } catch (O) {
              if (s)
                throw O;
            }
          },
          abort: function() {
            s && s();
          }
        };
    }), u.ajaxPrefilter(function(i) {
      i.crossDomain && (i.contents.script = !1);
    }), u.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /\b(?:java|ecma)script\b/
      },
      converters: {
        "text script": function(i) {
          return u.globalEval(i), i;
        }
      }
    }), u.ajaxPrefilter("script", function(i) {
      i.cache === void 0 && (i.cache = !1), i.crossDomain && (i.type = "GET");
    }), u.ajaxTransport("script", function(i) {
      if (i.crossDomain || i.scriptAttrs) {
        var s, l;
        return {
          send: function(f, h) {
            s = u("<script>").attr(i.scriptAttrs || {}).prop({ charset: i.scriptCharset, src: i.url }).on("load error", l = function(v) {
              s.remove(), l = null, v && h(v.type === "error" ? 404 : 200, v.type);
            }), N.head.appendChild(s[0]);
          },
          abort: function() {
            l && l();
          }
        };
      }
    });
    var Nu = [], ka = /(=)\?(?=&|$)|\?\?/;
    u.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        var i = Nu.pop() || u.expando + "_" + Eu.guid++;
        return this[i] = !0, i;
      }
    }), u.ajaxPrefilter("json jsonp", function(i, s, l) {
      var f, h, v, m = i.jsonp !== !1 && (ka.test(i.url) ? "url" : typeof i.data == "string" && (i.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && ka.test(i.data) && "data");
      if (m || i.dataTypes[0] === "jsonp")
        return f = i.jsonpCallback = A(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, m ? i[m] = i[m].replace(ka, "$1" + f) : i.jsonp !== !1 && (i.url += (Oa.test(i.url) ? "&" : "?") + i.jsonp + "=" + f), i.converters["script json"] = function() {
          return v || u.error(f + " was not called"), v[0];
        }, i.dataTypes[0] = "json", h = t[f], t[f] = function() {
          v = arguments;
        }, l.always(function() {
          h === void 0 ? u(t).removeProp(f) : t[f] = h, i[f] && (i.jsonpCallback = s.jsonpCallback, Nu.push(f)), v && A(h) && h(v[0]), v = h = void 0;
        }), "script";
    }), w.createHTMLDocument = function() {
      var i = N.implementation.createHTMLDocument("").body;
      return i.innerHTML = "<form></form><form></form>", i.childNodes.length === 2;
    }(), u.parseHTML = function(i, s, l) {
      if (typeof i != "string")
        return [];
      typeof s == "boolean" && (l = s, s = !1);
      var f, h, v;
      return s || (w.createHTMLDocument ? (s = N.implementation.createHTMLDocument(""), f = s.createElement("base"), f.href = N.location.href, s.head.appendChild(f)) : s = N), h = pe.exec(i), v = !l && [], h ? [s.createElement(h[1])] : (h = ou([i], s, v), v && v.length && u(v).remove(), u.merge([], h.childNodes));
    }, u.fn.load = function(i, s, l) {
      var f, h, v, m = this, O = i.indexOf(" ");
      return O > -1 && (f = rr(i.slice(O)), i = i.slice(0, O)), A(s) ? (l = s, s = void 0) : s && typeof s == "object" && (h = "POST"), m.length > 0 && u.ajax({
        url: i,
        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: h || "GET",
        dataType: "html",
        data: s
      }).done(function(T) {
        v = arguments, m.html(f ? (
          // If a selector was specified, locate the right elements in a dummy div
          // Exclude scripts to avoid IE 'Permission Denied' errors
          u("<div>").append(u.parseHTML(T)).find(f)
        ) : (
          // Otherwise use the full result
          T
        ));
      }).always(l && function(T, M) {
        m.each(function() {
          l.apply(this, v || [T.responseText, M, T]);
        });
      }), this;
    }, u.expr.pseudos.animated = function(i) {
      return u.grep(u.timers, function(s) {
        return i === s.elem;
      }).length;
    }, u.offset = {
      setOffset: function(i, s, l) {
        var f, h, v, m, O, T, M, H = u.css(i, "position"), ee = u(i), $ = {};
        H === "static" && (i.style.position = "relative"), O = ee.offset(), v = u.css(i, "top"), T = u.css(i, "left"), M = (H === "absolute" || H === "fixed") && (v + T).indexOf("auto") > -1, M ? (f = ee.position(), m = f.top, h = f.left) : (m = parseFloat(v) || 0, h = parseFloat(T) || 0), A(s) && (s = s.call(i, l, u.extend({}, O))), s.top != null && ($.top = s.top - O.top + m), s.left != null && ($.left = s.left - O.left + h), "using" in s ? s.using.call(i, $) : ee.css($);
      }
    }, u.fn.extend({
      // offset() relates an element's border box to the document origin
      offset: function(i) {
        if (arguments.length)
          return i === void 0 ? this : this.each(function(h) {
            u.offset.setOffset(this, i, h);
          });
        var s, l, f = this[0];
        if (f)
          return f.getClientRects().length ? (s = f.getBoundingClientRect(), l = f.ownerDocument.defaultView, {
            top: s.top + l.pageYOffset,
            left: s.left + l.pageXOffset
          }) : { top: 0, left: 0 };
      },
      // position() relates an element's margin box to its offset parent's padding box
      // This corresponds to the behavior of CSS absolute positioning
      position: function() {
        if (this[0]) {
          var i, s, l, f = this[0], h = { top: 0, left: 0 };
          if (u.css(f, "position") === "fixed")
            s = f.getBoundingClientRect();
          else {
            for (s = this.offset(), l = f.ownerDocument, i = f.offsetParent || l.documentElement; i && (i === l.body || i === l.documentElement) && u.css(i, "position") === "static"; )
              i = i.parentNode;
            i && i !== f && i.nodeType === 1 && (h = u(i).offset(), h.top += u.css(i, "borderTopWidth", !0), h.left += u.css(i, "borderLeftWidth", !0));
          }
          return {
            top: s.top - h.top - u.css(f, "marginTop", !0),
            left: s.left - h.left - u.css(f, "marginLeft", !0)
          };
        }
      },
      // This method will return documentElement in the following cases:
      // 1) For the element inside the iframe without offsetParent, this method will return
      //    documentElement of the parent window
      // 2) For the hidden or detached element
      // 3) For body or html element, i.e. in case of the html node - it will return itself
      //
      // but those exceptions were never presented as a real life use-cases
      // and might be considered as more preferable results.
      //
      // This logic, however, is not guaranteed and can change at any point in the future
      offsetParent: function() {
        return this.map(function() {
          for (var i = this.offsetParent; i && u.css(i, "position") === "static"; )
            i = i.offsetParent;
          return i || Te;
        });
      }
    }), u.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(i, s) {
      var l = s === "pageYOffset";
      u.fn[i] = function(f) {
        return ht(this, function(h, v, m) {
          var O;
          if (D(h) ? O = h : h.nodeType === 9 && (O = h.defaultView), m === void 0)
            return O ? O[s] : h[v];
          O ? O.scrollTo(
            l ? O.pageXOffset : m,
            l ? m : O.pageYOffset
          ) : h[v] = m;
        }, i, f, arguments.length);
      };
    }), u.each(["top", "left"], function(i, s) {
      u.cssHooks[s] = du(
        w.pixelPosition,
        function(l, f) {
          if (f)
            return f = fi(l, s), Ca.test(f) ? u(l).position()[s] + "px" : f;
        }
      );
    }), u.each({ Height: "height", Width: "width" }, function(i, s) {
      u.each({
        padding: "inner" + i,
        content: s,
        "": "outer" + i
      }, function(l, f) {
        u.fn[f] = function(h, v) {
          var m = arguments.length && (l || typeof h != "boolean"), O = l || (h === !0 || v === !0 ? "margin" : "border");
          return ht(this, function(T, M, H) {
            var ee;
            return D(T) ? f.indexOf("outer") === 0 ? T["inner" + i] : T.document.documentElement["client" + i] : T.nodeType === 9 ? (ee = T.documentElement, Math.max(
              T.body["scroll" + i],
              ee["scroll" + i],
              T.body["offset" + i],
              ee["offset" + i],
              ee["client" + i]
            )) : H === void 0 ? (
              // Get width or height on the element, requesting but not forcing parseFloat
              u.css(T, M, O)
            ) : (
              // Set width or height on the element
              u.style(T, M, H, O)
            );
          }, s, m ? h : void 0, m);
        };
      });
    }), u.each([
      "ajaxStart",
      "ajaxStop",
      "ajaxComplete",
      "ajaxError",
      "ajaxSuccess",
      "ajaxSend"
    ], function(i, s) {
      u.fn[s] = function(l) {
        return this.on(s, l);
      };
    }), u.fn.extend({
      bind: function(i, s, l) {
        return this.on(i, null, s, l);
      },
      unbind: function(i, s) {
        return this.off(i, null, s);
      },
      delegate: function(i, s, l, f) {
        return this.on(s, i, l, f);
      },
      undelegate: function(i, s, l) {
        return arguments.length === 1 ? this.off(i, "**") : this.off(s, i || "**", l);
      },
      hover: function(i, s) {
        return this.mouseenter(i).mouseleave(s || i);
      }
    }), u.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
      function(i, s) {
        u.fn[s] = function(l, f) {
          return arguments.length > 0 ? this.on(s, null, l, f) : this.trigger(s);
        };
      }
    );
    var Ev = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    u.proxy = function(i, s) {
      var l, f, h;
      if (typeof s == "string" && (l = i[s], s = i, i = l), !!A(i))
        return f = a.call(arguments, 2), h = function() {
          return i.apply(s || this, f.concat(a.call(arguments)));
        }, h.guid = i.guid = i.guid || u.guid++, h;
    }, u.holdReady = function(i) {
      i ? u.readyWait++ : u.ready(!0);
    }, u.isArray = Array.isArray, u.parseJSON = JSON.parse, u.nodeName = Q, u.isFunction = A, u.isWindow = D, u.camelCase = k, u.type = J, u.now = Date.now, u.isNumeric = function(i) {
      var s = u.type(i);
      return (s === "number" || s === "string") && // parseFloat NaNs numeric-cast false positives ("")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      !isNaN(i - parseFloat(i));
    }, u.trim = function(i) {
      return i == null ? "" : (i + "").replace(Ev, "$1");
    };
    var Sv = t.jQuery, Ov = t.$;
    return u.noConflict = function(i) {
      return t.$ === u && (t.$ = Ov), i && t.jQuery === u && (t.jQuery = Sv), u;
    }, typeof n > "u" && (t.jQuery = t.$ = u), u;
  });
})(by);
const Ga = Bs;
var Ws = {}, Cy = {
  get exports() {
    return Ws;
  },
  set exports(e) {
    Ws = e;
  }
}, zo = {}, xy = {
  get exports() {
    return zo;
  },
  set exports(e) {
    zo = e;
  }
}, op = function(t, n) {
  return function() {
    for (var o = new Array(arguments.length), a = 0; a < o.length; a++)
      o[a] = arguments[a];
    return t.apply(n, o);
  };
}, wy = op, Rl = Object.prototype.toString, Ml = function(e) {
  return function(t) {
    var n = Rl.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function Or(e) {
  return e = e.toLowerCase(), function(n) {
    return Ml(n) === e;
  };
}
function Il(e) {
  return Array.isArray(e);
}
function Yo(e) {
  return typeof e > "u";
}
function Ty(e) {
  return e !== null && !Yo(e) && e.constructor !== null && !Yo(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
var ap = Or("ArrayBuffer");
function Ey(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && ap(e.buffer), t;
}
function Sy(e) {
  return typeof e == "string";
}
function Oy(e) {
  return typeof e == "number";
}
function sp(e) {
  return e !== null && typeof e == "object";
}
function Ro(e) {
  if (Ml(e) !== "object")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
var _y = Or("Date"), Ay = Or("File"), Py = Or("Blob"), Ny = Or("FileList");
function jl(e) {
  return Rl.call(e) === "[object Function]";
}
function ky(e) {
  return sp(e) && jl(e.pipe);
}
function Ly(e) {
  var t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Rl.call(e) === t || jl(e.toString) && e.toString() === t);
}
var Ry = Or("URLSearchParams");
function My(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Iy() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Dl(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Il(e))
      for (var n = 0, r = e.length; n < r; n++)
        t.call(null, e[n], n, e);
    else
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
}
function Us() {
  var e = {};
  function t(o, a) {
    Ro(e[a]) && Ro(o) ? e[a] = Us(e[a], o) : Ro(o) ? e[a] = Us({}, o) : Il(o) ? e[a] = o.slice() : e[a] = o;
  }
  for (var n = 0, r = arguments.length; n < r; n++)
    Dl(arguments[n], t);
  return e;
}
function jy(e, t, n) {
  return Dl(t, function(o, a) {
    n && typeof o == "function" ? e[a] = wy(o, n) : e[a] = o;
  }), e;
}
function Dy(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
function $y(e, t, n, r) {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, n && Object.assign(e.prototype, n);
}
function Fy(e, t, n) {
  var r, o, a, c = {};
  t = t || {};
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      a = r[o], c[a] || (t[a] = e[a], c[a] = !0);
    e = Object.getPrototypeOf(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}
function Hy(e, t, n) {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  var r = e.indexOf(t, n);
  return r !== -1 && r === n;
}
function By(e) {
  if (!e)
    return null;
  var t = e.length;
  if (Yo(t))
    return null;
  for (var n = new Array(t); t-- > 0; )
    n[t] = e[t];
  return n;
}
var Wy = function(e) {
  return function(t) {
    return e && t instanceof e;
  };
}(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)), Ct = {
  isArray: Il,
  isArrayBuffer: ap,
  isBuffer: Ty,
  isFormData: Ly,
  isArrayBufferView: Ey,
  isString: Sy,
  isNumber: Oy,
  isObject: sp,
  isPlainObject: Ro,
  isUndefined: Yo,
  isDate: _y,
  isFile: Ay,
  isBlob: Py,
  isFunction: jl,
  isStream: ky,
  isURLSearchParams: Ry,
  isStandardBrowserEnv: Iy,
  forEach: Dl,
  merge: Us,
  extend: jy,
  trim: My,
  stripBOM: Dy,
  inherits: $y,
  toFlatObject: Fy,
  kindOf: Ml,
  kindOfTest: Or,
  endsWith: Hy,
  toArray: By,
  isTypedArray: Wy,
  isFileList: Ny
}, Lr = Ct;
function Cc(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var lp = function(t, n, r) {
  if (!n)
    return t;
  var o;
  if (r)
    o = r(n);
  else if (Lr.isURLSearchParams(n))
    o = n.toString();
  else {
    var a = [];
    Lr.forEach(n, function(p, g) {
      p === null || typeof p > "u" || (Lr.isArray(p) ? g = g + "[]" : p = [p], Lr.forEach(p, function(C) {
        Lr.isDate(C) ? C = C.toISOString() : Lr.isObject(C) && (C = JSON.stringify(C)), a.push(Cc(g) + "=" + Cc(C));
      }));
    }), o = a.join("&");
  }
  if (o) {
    var c = t.indexOf("#");
    c !== -1 && (t = t.slice(0, c)), t += (t.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return t;
}, Uy = Ct;
function ca() {
  this.handlers = [];
}
ca.prototype.use = function(t, n, r) {
  return this.handlers.push({
    fulfilled: t,
    rejected: n,
    synchronous: r ? r.synchronous : !1,
    runWhen: r ? r.runWhen : null
  }), this.handlers.length - 1;
};
ca.prototype.eject = function(t) {
  this.handlers[t] && (this.handlers[t] = null);
};
ca.prototype.forEach = function(t) {
  Uy.forEach(this.handlers, function(r) {
    r !== null && t(r);
  });
};
var qy = ca, zy = Ct, Yy = function(t, n) {
  zy.forEach(t, function(o, a) {
    a !== n && a.toUpperCase() === n.toUpperCase() && (t[n] = o, delete t[a]);
  });
}, up = Ct;
function Kr(e, t, n, r, o) {
  Error.call(this), this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o);
}
up.inherits(Kr, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var cp = Kr.prototype, fp = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
  // eslint-disable-next-line func-names
].forEach(function(e) {
  fp[e] = { value: e };
});
Object.defineProperties(Kr, fp);
Object.defineProperty(cp, "isAxiosError", { value: !0 });
Kr.from = function(e, t, n, r, o, a) {
  var c = Object.create(cp);
  return up.toFlatObject(e, c, function(p) {
    return p !== Error.prototype;
  }), Kr.call(c, e.message, t, n, r, o), c.name = e.name, a && Object.assign(c, a), c;
};
var oi = Kr, dp = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, on = Ct;
function Xy(e, t) {
  t = t || new FormData();
  var n = [];
  function r(a) {
    return a === null ? "" : on.isDate(a) ? a.toISOString() : on.isArrayBuffer(a) || on.isTypedArray(a) ? typeof Blob == "function" ? new Blob([a]) : Buffer.from(a) : a;
  }
  function o(a, c) {
    if (on.isPlainObject(a) || on.isArray(a)) {
      if (n.indexOf(a) !== -1)
        throw Error("Circular reference detected in " + c);
      n.push(a), on.forEach(a, function(p, g) {
        if (!on.isUndefined(p)) {
          var y = c ? c + "." + g : g, C;
          if (p && !c && typeof p == "object") {
            if (on.endsWith(g, "{}"))
              p = JSON.stringify(p);
            else if (on.endsWith(g, "[]") && (C = on.toArray(p))) {
              C.forEach(function(b) {
                !on.isUndefined(b) && t.append(y, r(b));
              });
              return;
            }
          }
          o(p, y);
        }
      }), n.pop();
    } else
      t.append(c, r(a));
  }
  return o(e), t;
}
var pp = Xy, Ja, xc;
function Vy() {
  if (xc)
    return Ja;
  xc = 1;
  var e = oi;
  return Ja = function(n, r, o) {
    var a = o.config.validateStatus;
    !o.status || !a || a(o.status) ? n(o) : r(new e(
      "Request failed with status code " + o.status,
      [e.ERR_BAD_REQUEST, e.ERR_BAD_RESPONSE][Math.floor(o.status / 100) - 4],
      o.config,
      o.request,
      o
    ));
  }, Ja;
}
var Qa, wc;
function Ky() {
  if (wc)
    return Qa;
  wc = 1;
  var e = Ct;
  return Qa = e.isStandardBrowserEnv() ? (
    // Standard browser envs support document.cookie
    function() {
      return {
        write: function(r, o, a, c, d, p) {
          var g = [];
          g.push(r + "=" + encodeURIComponent(o)), e.isNumber(a) && g.push("expires=" + new Date(a).toGMTString()), e.isString(c) && g.push("path=" + c), e.isString(d) && g.push("domain=" + d), p === !0 && g.push("secure"), document.cookie = g.join("; ");
        },
        read: function(r) {
          var o = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
          return o ? decodeURIComponent(o[3]) : null;
        },
        remove: function(r) {
          this.write(r, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function() {
      return {
        write: function() {
        },
        read: function() {
          return null;
        },
        remove: function() {
        }
      };
    }()
  ), Qa;
}
var Gy = function(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}, Jy = function(t, n) {
  return n ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t;
}, Qy = Gy, Zy = Jy, hp = function(t, n) {
  return t && !Qy(n) ? Zy(t, n) : n;
}, Za, Tc;
function eb() {
  if (Tc)
    return Za;
  Tc = 1;
  var e = Ct, t = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  return Za = function(r) {
    var o = {}, a, c, d;
    return r && e.forEach(r.split(`
`), function(g) {
      if (d = g.indexOf(":"), a = e.trim(g.substr(0, d)).toLowerCase(), c = e.trim(g.substr(d + 1)), a) {
        if (o[a] && t.indexOf(a) >= 0)
          return;
        a === "set-cookie" ? o[a] = (o[a] ? o[a] : []).concat([c]) : o[a] = o[a] ? o[a] + ", " + c : c;
      }
    }), o;
  }, Za;
}
var es, Ec;
function tb() {
  if (Ec)
    return es;
  Ec = 1;
  var e = Ct;
  return es = e.isStandardBrowserEnv() ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function() {
      var n = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a"), o;
      function a(c) {
        var d = c;
        return n && (r.setAttribute("href", d), d = r.href), r.setAttribute("href", d), {
          href: r.href,
          protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
          host: r.host,
          search: r.search ? r.search.replace(/^\?/, "") : "",
          hash: r.hash ? r.hash.replace(/^#/, "") : "",
          hostname: r.hostname,
          port: r.port,
          pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
        };
      }
      return o = a(window.location.href), function(d) {
        var p = e.isString(d) ? a(d) : d;
        return p.protocol === o.protocol && p.host === o.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function() {
      return function() {
        return !0;
      };
    }()
  ), es;
}
var ts, Sc;
function fa() {
  if (Sc)
    return ts;
  Sc = 1;
  var e = oi, t = Ct;
  function n(r) {
    e.call(this, r ?? "canceled", e.ERR_CANCELED), this.name = "CanceledError";
  }
  return t.inherits(n, e, {
    __CANCEL__: !0
  }), ts = n, ts;
}
var ns, Oc;
function nb() {
  return Oc || (Oc = 1, ns = function(t) {
    var n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
    return n && n[1] || "";
  }), ns;
}
var rs, _c;
function Ac() {
  if (_c)
    return rs;
  _c = 1;
  var e = Ct, t = Vy(), n = Ky(), r = lp, o = hp, a = eb(), c = tb(), d = dp, p = oi, g = fa(), y = nb();
  return rs = function(b) {
    return new Promise(function(w, A) {
      var D = b.data, N = b.headers, I = b.responseType, F;
      function J() {
        b.cancelToken && b.cancelToken.unsubscribe(F), b.signal && b.signal.removeEventListener("abort", F);
      }
      e.isFormData(D) && e.isStandardBrowserEnv() && delete N["Content-Type"];
      var B = new XMLHttpRequest();
      if (b.auth) {
        var u = b.auth.username || "", Y = b.auth.password ? unescape(encodeURIComponent(b.auth.password)) : "";
        N.Authorization = "Basic " + btoa(u + ":" + Y);
      }
      var X = o(b.baseURL, b.url);
      B.open(b.method.toUpperCase(), r(X, b.params, b.paramsSerializer), !0), B.timeout = b.timeout;
      function oe() {
        if (B) {
          var Q = "getAllResponseHeaders" in B ? a(B.getAllResponseHeaders()) : null, pe = !I || I === "text" || I === "json" ? B.responseText : B.response, Ie = {
            data: pe,
            status: B.status,
            statusText: B.statusText,
            headers: Q,
            config: b,
            request: B
          };
          t(function(U) {
            w(U), J();
          }, function(U) {
            A(U), J();
          }, Ie), B = null;
        }
      }
      if ("onloadend" in B ? B.onloadend = oe : B.onreadystatechange = function() {
        !B || B.readyState !== 4 || B.status === 0 && !(B.responseURL && B.responseURL.indexOf("file:") === 0) || setTimeout(oe);
      }, B.onabort = function() {
        B && (A(new p("Request aborted", p.ECONNABORTED, b, B)), B = null);
      }, B.onerror = function() {
        A(new p("Network Error", p.ERR_NETWORK, b, B, B)), B = null;
      }, B.ontimeout = function() {
        var pe = b.timeout ? "timeout of " + b.timeout + "ms exceeded" : "timeout exceeded", Ie = b.transitional || d;
        b.timeoutErrorMessage && (pe = b.timeoutErrorMessage), A(new p(
          pe,
          Ie.clarifyTimeoutError ? p.ETIMEDOUT : p.ECONNABORTED,
          b,
          B
        )), B = null;
      }, e.isStandardBrowserEnv()) {
        var fe = (b.withCredentials || c(X)) && b.xsrfCookieName ? n.read(b.xsrfCookieName) : void 0;
        fe && (N[b.xsrfHeaderName] = fe);
      }
      "setRequestHeader" in B && e.forEach(N, function(pe, Ie) {
        typeof D > "u" && Ie.toLowerCase() === "content-type" ? delete N[Ie] : B.setRequestHeader(Ie, pe);
      }), e.isUndefined(b.withCredentials) || (B.withCredentials = !!b.withCredentials), I && I !== "json" && (B.responseType = b.responseType), typeof b.onDownloadProgress == "function" && B.addEventListener("progress", b.onDownloadProgress), typeof b.onUploadProgress == "function" && B.upload && B.upload.addEventListener("progress", b.onUploadProgress), (b.cancelToken || b.signal) && (F = function(Q) {
        B && (A(!Q || Q && Q.type ? new g() : Q), B.abort(), B = null);
      }, b.cancelToken && b.cancelToken.subscribe(F), b.signal && (b.signal.aborted ? F() : b.signal.addEventListener("abort", F))), D || (D = null);
      var we = y(X);
      if (we && ["http", "https", "file"].indexOf(we) === -1) {
        A(new p("Unsupported protocol " + we + ":", p.ERR_BAD_REQUEST, b));
        return;
      }
      B.send(D);
    });
  }, rs;
}
var is, Pc;
function rb() {
  return Pc || (Pc = 1, is = null), is;
}
var vt = Ct, Nc = Yy, kc = oi, ib = dp, ob = pp, ab = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function Lc(e, t) {
  !vt.isUndefined(e) && vt.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function sb() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = Ac()), e;
}
function lb(e, t, n) {
  if (vt.isString(e))
    try {
      return (t || JSON.parse)(e), vt.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
var da = {
  transitional: ib,
  adapter: sb(),
  transformRequest: [function(t, n) {
    if (Nc(n, "Accept"), Nc(n, "Content-Type"), vt.isFormData(t) || vt.isArrayBuffer(t) || vt.isBuffer(t) || vt.isStream(t) || vt.isFile(t) || vt.isBlob(t))
      return t;
    if (vt.isArrayBufferView(t))
      return t.buffer;
    if (vt.isURLSearchParams(t))
      return Lc(n, "application/x-www-form-urlencoded;charset=utf-8"), t.toString();
    var r = vt.isObject(t), o = n && n["Content-Type"], a;
    if ((a = vt.isFileList(t)) || r && o === "multipart/form-data") {
      var c = this.env && this.env.FormData;
      return ob(a ? { "files[]": t } : t, c && new c());
    } else if (r || o === "application/json")
      return Lc(n, "application/json"), lb(t);
    return t;
  }],
  transformResponse: [function(t) {
    var n = this.transitional || da.transitional, r = n && n.silentJSONParsing, o = n && n.forcedJSONParsing, a = !r && this.responseType === "json";
    if (a || o && vt.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (c) {
        if (a)
          throw c.name === "SyntaxError" ? kc.from(c, kc.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: rb()
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
vt.forEach(["delete", "get", "head"], function(t) {
  da.headers[t] = {};
});
vt.forEach(["post", "put", "patch"], function(t) {
  da.headers[t] = vt.merge(ab);
});
var $l = da, ub = Ct, cb = $l, fb = function(t, n, r) {
  var o = this || cb;
  return ub.forEach(r, function(c) {
    t = c.call(o, t, n);
  }), t;
}, os, Rc;
function vp() {
  return Rc || (Rc = 1, os = function(t) {
    return !!(t && t.__CANCEL__);
  }), os;
}
var Mc = Ct, as = fb, db = vp(), pb = $l, hb = fa();
function ss(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new hb();
}
var vb = function(t) {
  ss(t), t.headers = t.headers || {}, t.data = as.call(
    t,
    t.data,
    t.headers,
    t.transformRequest
  ), t.headers = Mc.merge(
    t.headers.common || {},
    t.headers[t.method] || {},
    t.headers
  ), Mc.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(o) {
      delete t.headers[o];
    }
  );
  var n = t.adapter || pb.adapter;
  return n(t).then(function(o) {
    return ss(t), o.data = as.call(
      t,
      o.data,
      o.headers,
      t.transformResponse
    ), o;
  }, function(o) {
    return db(o) || (ss(t), o && o.response && (o.response.data = as.call(
      t,
      o.response.data,
      o.response.headers,
      t.transformResponse
    ))), Promise.reject(o);
  });
}, Ht = Ct, gp = function(t, n) {
  n = n || {};
  var r = {};
  function o(y, C) {
    return Ht.isPlainObject(y) && Ht.isPlainObject(C) ? Ht.merge(y, C) : Ht.isPlainObject(C) ? Ht.merge({}, C) : Ht.isArray(C) ? C.slice() : C;
  }
  function a(y) {
    if (Ht.isUndefined(n[y])) {
      if (!Ht.isUndefined(t[y]))
        return o(void 0, t[y]);
    } else
      return o(t[y], n[y]);
  }
  function c(y) {
    if (!Ht.isUndefined(n[y]))
      return o(void 0, n[y]);
  }
  function d(y) {
    if (Ht.isUndefined(n[y])) {
      if (!Ht.isUndefined(t[y]))
        return o(void 0, t[y]);
    } else
      return o(void 0, n[y]);
  }
  function p(y) {
    if (y in n)
      return o(t[y], n[y]);
    if (y in t)
      return o(void 0, t[y]);
  }
  var g = {
    url: c,
    method: c,
    data: c,
    baseURL: d,
    transformRequest: d,
    transformResponse: d,
    paramsSerializer: d,
    timeout: d,
    timeoutMessage: d,
    withCredentials: d,
    adapter: d,
    responseType: d,
    xsrfCookieName: d,
    xsrfHeaderName: d,
    onUploadProgress: d,
    onDownloadProgress: d,
    decompress: d,
    maxContentLength: d,
    maxBodyLength: d,
    beforeRedirect: d,
    transport: d,
    httpAgent: d,
    httpsAgent: d,
    cancelToken: d,
    socketPath: d,
    responseEncoding: d,
    validateStatus: p
  };
  return Ht.forEach(Object.keys(t).concat(Object.keys(n)), function(C) {
    var b = g[C] || a, E = b(C);
    Ht.isUndefined(E) && b !== p || (r[C] = E);
  }), r;
}, ls, Ic;
function mp() {
  return Ic || (Ic = 1, ls = {
    version: "0.27.2"
  }), ls;
}
var gb = mp().version, Vn = oi, Fl = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  Fl[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var jc = {};
Fl.transitional = function(t, n, r) {
  function o(a, c) {
    return "[Axios v" + gb + "] Transitional option '" + a + "'" + c + (r ? ". " + r : "");
  }
  return function(a, c, d) {
    if (t === !1)
      throw new Vn(
        o(c, " has been removed" + (n ? " in " + n : "")),
        Vn.ERR_DEPRECATED
      );
    return n && !jc[c] && (jc[c] = !0, console.warn(
      o(
        c,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(a, c, d) : !0;
  };
};
function mb(e, t, n) {
  if (typeof e != "object")
    throw new Vn("options must be an object", Vn.ERR_BAD_OPTION_VALUE);
  for (var r = Object.keys(e), o = r.length; o-- > 0; ) {
    var a = r[o], c = t[a];
    if (c) {
      var d = e[a], p = d === void 0 || c(d, a, e);
      if (p !== !0)
        throw new Vn("option " + a + " must be " + p, Vn.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new Vn("Unknown option " + a, Vn.ERR_BAD_OPTION);
  }
}
var yb = {
  assertOptions: mb,
  validators: Fl
}, yp = Ct, bb = lp, Dc = qy, $c = vb, pa = gp, Cb = hp, bp = yb, Rr = bp.validators;
function Gr(e) {
  this.defaults = e, this.interceptors = {
    request: new Dc(),
    response: new Dc()
  };
}
Gr.prototype.request = function(t, n) {
  typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = pa(this.defaults, n), n.method ? n.method = n.method.toLowerCase() : this.defaults.method ? n.method = this.defaults.method.toLowerCase() : n.method = "get";
  var r = n.transitional;
  r !== void 0 && bp.assertOptions(r, {
    silentJSONParsing: Rr.transitional(Rr.boolean),
    forcedJSONParsing: Rr.transitional(Rr.boolean),
    clarifyTimeoutError: Rr.transitional(Rr.boolean)
  }, !1);
  var o = [], a = !0;
  this.interceptors.request.forEach(function(E) {
    typeof E.runWhen == "function" && E.runWhen(n) === !1 || (a = a && E.synchronous, o.unshift(E.fulfilled, E.rejected));
  });
  var c = [];
  this.interceptors.response.forEach(function(E) {
    c.push(E.fulfilled, E.rejected);
  });
  var d;
  if (!a) {
    var p = [$c, void 0];
    for (Array.prototype.unshift.apply(p, o), p = p.concat(c), d = Promise.resolve(n); p.length; )
      d = d.then(p.shift(), p.shift());
    return d;
  }
  for (var g = n; o.length; ) {
    var y = o.shift(), C = o.shift();
    try {
      g = y(g);
    } catch (b) {
      C(b);
      break;
    }
  }
  try {
    d = $c(g);
  } catch (b) {
    return Promise.reject(b);
  }
  for (; c.length; )
    d = d.then(c.shift(), c.shift());
  return d;
};
Gr.prototype.getUri = function(t) {
  t = pa(this.defaults, t);
  var n = Cb(t.baseURL, t.url);
  return bb(n, t.params, t.paramsSerializer);
};
yp.forEach(["delete", "get", "head", "options"], function(t) {
  Gr.prototype[t] = function(n, r) {
    return this.request(pa(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
yp.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(a, c, d) {
      return this.request(pa(d || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: c
      }));
    };
  }
  Gr.prototype[t] = n(), Gr.prototype[t + "Form"] = n(!0);
});
var xb = Gr, us, Fc;
function wb() {
  if (Fc)
    return us;
  Fc = 1;
  var e = fa();
  function t(n) {
    if (typeof n != "function")
      throw new TypeError("executor must be a function.");
    var r;
    this.promise = new Promise(function(c) {
      r = c;
    });
    var o = this;
    this.promise.then(function(a) {
      if (o._listeners) {
        var c, d = o._listeners.length;
        for (c = 0; c < d; c++)
          o._listeners[c](a);
        o._listeners = null;
      }
    }), this.promise.then = function(a) {
      var c, d = new Promise(function(p) {
        o.subscribe(p), c = p;
      }).then(a);
      return d.cancel = function() {
        o.unsubscribe(c);
      }, d;
    }, n(function(c) {
      o.reason || (o.reason = new e(c), r(o.reason));
    });
  }
  return t.prototype.throwIfRequested = function() {
    if (this.reason)
      throw this.reason;
  }, t.prototype.subscribe = function(r) {
    if (this.reason) {
      r(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(r) : this._listeners = [r];
  }, t.prototype.unsubscribe = function(r) {
    if (this._listeners) {
      var o = this._listeners.indexOf(r);
      o !== -1 && this._listeners.splice(o, 1);
    }
  }, t.source = function() {
    var r, o = new t(function(c) {
      r = c;
    });
    return {
      token: o,
      cancel: r
    };
  }, us = t, us;
}
var cs, Hc;
function Tb() {
  return Hc || (Hc = 1, cs = function(t) {
    return function(r) {
      return t.apply(null, r);
    };
  }), cs;
}
var fs, Bc;
function Eb() {
  if (Bc)
    return fs;
  Bc = 1;
  var e = Ct;
  return fs = function(n) {
    return e.isObject(n) && n.isAxiosError === !0;
  }, fs;
}
var Wc = Ct, Sb = op, Mo = xb, Ob = gp, _b = $l;
function Cp(e) {
  var t = new Mo(e), n = Sb(Mo.prototype.request, t);
  return Wc.extend(n, Mo.prototype, t), Wc.extend(n, t), n.create = function(o) {
    return Cp(Ob(e, o));
  }, n;
}
var It = Cp(_b);
It.Axios = Mo;
It.CanceledError = fa();
It.CancelToken = wb();
It.isCancel = vp();
It.VERSION = mp().version;
It.toFormData = pp;
It.AxiosError = oi;
It.Cancel = It.CanceledError;
It.all = function(t) {
  return Promise.all(t);
};
It.spread = Tb();
It.isAxiosError = Eb();
xy.exports = It;
zo.default = It;
(function(e) {
  e.exports = zo;
})(Cy);
const Ab = /* @__PURE__ */ yy(Ws), xp = Ab.create({}), wp = "https://bbs.mobileapi.hupu.com", Tp = "/3/7.3.8/threads/";
function Pb(e, t) {
  let n = wp + Tp + "getCheckReply";
  return xp.get(n, {
    params: {
      tid: e,
      pid: t,
      offline: "json",
      fid: 34
    }
  });
}
function Nb(e) {
  let t = wp + Tp + "getsThreadLightReplyList";
  return xp.get(t, {
    params: {
      tid: e,
      offline: "json",
      fid: 34
    }
  });
}
const Ep = {
  getCheckReply: Pb,
  getsThreadLightReplyList: Nb
};
function tr(e) {
  return tr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tr(e);
}
function kb(e, t) {
  if (tr(e) !== "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (tr(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Sp(e) {
  var t = kb(e, "string");
  return tr(t) === "symbol" ? t : String(t);
}
function Ae(e, t, n) {
  return t = Sp(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Uc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function G(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Uc(Object(n), !0).forEach(function(r) {
      Ae(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Uc(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Mn() {
  return Mn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Mn.apply(this, arguments);
}
var Lb = Array.isArray, Rb = function(t) {
  return typeof t == "string";
}, Mb = function(t) {
  return t !== null && tr(t) === "object";
};
function Oi(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  return typeof e == "function" ? e(t) : e ?? n;
}
function Cn() {
  for (var e = [], t = 0; t < arguments.length; t++) {
    var n = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (n) {
      if (Rb(n))
        e.push(n);
      else if (Lb(n))
        for (var r = 0; r < n.length; r++) {
          var o = Cn(n[r]);
          o && e.push(o);
        }
      else if (Mb(n))
        for (var a in n)
          n[a] && e.push(a);
    }
  }
  return e.join(" ");
}
function Ib(e) {
  if (Array.isArray(e))
    return e;
}
function jb(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, a, c, d = [], p = !0, g = !1;
    try {
      if (a = (n = n.call(e)).next, t === 0) {
        if (Object(n) !== n)
          return;
        p = !1;
      } else
        for (; !(p = (r = a.call(n)).done) && (d.push(r.value), d.length !== t); p = !0)
          ;
    } catch (y) {
      g = !0, o = y;
    } finally {
      try {
        if (!p && n.return != null && (c = n.return(), Object(c) !== c))
          return;
      } finally {
        if (g)
          throw o;
      }
    }
    return d;
  }
}
function qs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function Op(e, t) {
  if (e) {
    if (typeof e == "string")
      return qs(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return qs(e, t);
  }
}
function Db() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Tr(e, t) {
  return Ib(e) || jb(e, t) || Op(e, t) || Db();
}
function $b(e) {
  if (Array.isArray(e))
    return qs(e);
}
function Fb(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Hb() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Jr(e) {
  return $b(e) || Fb(e) || Op(e) || Hb();
}
var Bb = typeof global == "object" && global && global.Object === Object && global;
const Wb = Bb;
var Ub = typeof self == "object" && self && self.Object === Object && self, qb = Wb || Ub || Function("return this")();
const _p = qb;
var zb = _p.Symbol;
const Xo = zb;
var Ap = Object.prototype, Yb = Ap.hasOwnProperty, Xb = Ap.toString, xi = Xo ? Xo.toStringTag : void 0;
function Vb(e) {
  var t = Yb.call(e, xi), n = e[xi];
  try {
    e[xi] = void 0;
    var r = !0;
  } catch {
  }
  var o = Xb.call(e);
  return r && (t ? e[xi] = n : delete e[xi]), o;
}
var Kb = Object.prototype, Gb = Kb.toString;
function Jb(e) {
  return Gb.call(e);
}
var Qb = "[object Null]", Zb = "[object Undefined]", qc = Xo ? Xo.toStringTag : void 0;
function e0(e) {
  return e == null ? e === void 0 ? Zb : Qb : qc && qc in Object(e) ? Vb(e) : Jb(e);
}
function t0(e) {
  return e != null && typeof e == "object";
}
var n0 = function(t) {
  return t != null && t !== "";
};
const r0 = n0;
var i0 = function(t, n) {
  var r = G({}, t);
  return Object.keys(n).forEach(function(o) {
    var a = r[o];
    if (a)
      a.type || a.default ? a.default = n[o] : a.def ? a.def(n[o]) : r[o] = {
        type: a,
        default: n[o]
      };
    else
      throw new Error("not have ".concat(o, " prop"));
  }), r;
};
const Ji = i0;
var wr = function e() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = Array.isArray(t) ? t : [t], o = [];
  return r.forEach(function(a) {
    Array.isArray(a) ? o.push.apply(o, Jr(e(a, n))) : a && a.type === ft ? o.push.apply(o, Jr(e(a.children, n))) : a && er(a) ? n && !Pp(a) ? o.push(a) : n || o.push(a) : r0(a) && o.push(a);
  }), o;
}, o0 = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default", r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (er(t))
    return t.type === ft ? n === "default" ? wr(t.children) : [] : t.children && t.children[n] ? wr(t.children[n](r)) : [];
  var o = t.$slots[n] && t.$slots[n](r);
  return wr(o);
}, zc = function(t) {
  for (var n, r = (t == null || (n = t.vnode) === null || n === void 0 ? void 0 : n.el) || t && (t.$el || t); r && !r.tagName; )
    r = r.nextSibling;
  return r;
}, a0 = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default", r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, a = void 0;
  if (t.$) {
    var c = t[n];
    if (c !== void 0)
      return typeof c == "function" && o ? c(r) : c;
    a = t.$slots[n], a = o && a ? a(r) : a;
  } else if (er(t)) {
    var d = t.props && t.props[n];
    if (d !== void 0 && t.props !== null)
      return typeof d == "function" && o ? d(r) : d;
    t.type === ft ? a = t.children : t.children && t.children[n] && (a = t.children[n], a = o && a ? a(r) : a);
  }
  return Array.isArray(a) && (a = wr(a), a = a.length === 1 ? a[0] : a, a = a.length === 0 ? void 0 : a), a;
};
function Pp(e) {
  return e && (e.type === yn || e.type === ft && e.children.length === 0 || e.type === ii && e.children.trim() === "");
}
function Hl() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = [];
  return e.forEach(function(n) {
    Array.isArray(n) ? t.push.apply(t, Jr(n)) : (n == null ? void 0 : n.type) === ft ? t.push.apply(t, Jr(Hl(n.children))) : t.push(n);
  }), t.filter(function(n) {
    return !Pp(n);
  });
}
var Np = function(t) {
  return setTimeout(t, 16);
}, kp = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (Np = function(t) {
  return window.requestAnimationFrame(t);
}, kp = function(t) {
  return window.cancelAnimationFrame(t);
});
var Yc = 0, Bl = /* @__PURE__ */ new Map();
function Lp(e) {
  Bl.delete(e);
}
function Ui(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Yc += 1;
  var n = Yc;
  function r(o) {
    if (o === 0)
      Lp(n), e();
    else {
      var a = Np(function() {
        r(o - 1);
      });
      Bl.set(n, a);
    }
  }
  return r(t), n;
}
Ui.cancel = function(e) {
  var t = Bl.get(e);
  return Lp(t), kp(t);
};
var zs = function() {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  return n;
}, ha = function(t) {
  var n = t;
  return n.install = function(r) {
    r.component(n.displayName || n.name, t);
  }, t;
}, Rp = !1;
try {
  var Xc = Object.defineProperty({}, "passive", {
    get: function() {
      Rp = !0;
    }
  });
  window.addEventListener("testPassive", null, Xc), window.removeEventListener("testPassive", null, Xc);
} catch {
}
const s0 = Rp;
function l0(e, t, n, r) {
  if (e && e.addEventListener) {
    var o = r;
    o === void 0 && s0 && (t === "touchstart" || t === "touchmove" || t === "wheel") && (o = {
      passive: !1
    }), e.addEventListener(t, n, o);
  }
  return {
    remove: function() {
      e && e.removeEventListener && e.removeEventListener(t, n);
    }
  };
}
function u0(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function va(e, t) {
  if (e == null)
    return {};
  var n = u0(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (o = 0; o < a.length; o++)
      r = a[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
const c0 = {
  // Options.jsx
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "",
  // Pagination.jsx
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages"
};
var f0 = {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "Ok",
  clear: "Clear",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthBeforeYear: !0,
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
};
const d0 = f0;
var p0 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const Mp = p0;
var h0 = {
  lang: G({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, d0),
  timePickerLocale: G({}, Mp)
};
const Vc = h0;
var Bt = "${label} is not a valid ${type}", v0 = {
  locale: "en",
  Pagination: c0,
  DatePicker: Vc,
  TimePicker: Mp,
  Calendar: Vc,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckall: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No Data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: Bt,
        method: Bt,
        array: Bt,
        object: Bt,
        number: Bt,
        date: Bt,
        boolean: Bt,
        integer: Bt,
        float: Bt,
        regexp: Bt,
        email: Bt,
        url: Bt,
        hex: Bt
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  }
};
const Vo = v0, Ip = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "LocaleReceiver",
  props: {
    componentName: String,
    defaultLocale: {
      type: [Object, Function]
    },
    children: {
      type: Function
    }
  },
  setup: function(t, n) {
    var r = n.slots, o = kn("localeData", {}), a = Me(function() {
      var d = t.componentName, p = d === void 0 ? "global" : d, g = t.defaultLocale, y = g || Vo[p || "global"], C = o.antLocale, b = p && C ? C[p] : {};
      return G(G({}, typeof y == "function" ? y() : y), b || {});
    }), c = Me(function() {
      var d = o.antLocale, p = d && d.locale;
      return d && d.exist && !p ? Vo.locale : p;
    });
    return function() {
      var d = t.children || r.default, p = o.antLocale;
      return d == null ? void 0 : d(a.value, c.value, p);
    };
  }
});
function jp(e, t, n) {
  var r = kn("localeData", {}), o = Me(function() {
    var a = r.antLocale, c = ji(t) || Vo[e || "global"], d = e && a ? a[e] : {};
    return G(G(G({}, typeof c == "function" ? c() : c), d || {}), ji(n) || {});
  });
  return [o];
}
var Dp = function() {
  var t = wn("empty", {}), n = t.getPrefixCls, r = n("empty-img-default");
  return L("svg", {
    class: r,
    width: "184",
    height: "152",
    viewBox: "0 0 184 152"
  }, [L("g", {
    fill: "none",
    "fill-rule": "evenodd"
  }, [L("g", {
    transform: "translate(24 31.67)"
  }, [L("ellipse", {
    class: "".concat(r, "-ellipse"),
    cx: "67.797",
    cy: "106.89",
    rx: "67.797",
    ry: "12.668"
  }, null), L("path", {
    class: "".concat(r, "-path-1"),
    d: "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
  }, null), L("path", {
    class: "".concat(r, "-path-2"),
    d: "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
    transform: "translate(13.56)"
  }, null), L("path", {
    class: "".concat(r, "-path-3"),
    d: "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
  }, null), L("path", {
    class: "".concat(r, "-path-4"),
    d: "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
  }, null)]), L("path", {
    class: "".concat(r, "-path-5"),
    d: "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
  }, null), L("g", {
    class: "".concat(r, "-g"),
    transform: "translate(149.65 15.383)"
  }, [L("ellipse", {
    cx: "20.654",
    cy: "3.167",
    rx: "2.849",
    ry: "2.815"
  }, null), L("path", {
    d: "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
  }, null)])])]);
};
Dp.PRESENTED_IMAGE_DEFAULT = !0;
const g0 = Dp;
var $p = function() {
  var t = wn("empty", {}), n = t.getPrefixCls, r = n("empty-img-simple");
  return L("svg", {
    class: r,
    width: "64",
    height: "41",
    viewBox: "0 0 64 41"
  }, [L("g", {
    transform: "translate(0 1)",
    fill: "none",
    "fill-rule": "evenodd"
  }, [L("ellipse", {
    class: "".concat(r, "-ellipse"),
    fill: "#F5F5F5",
    cx: "32",
    cy: "33",
    rx: "32",
    ry: "7"
  }, null), L("g", {
    class: "".concat(r, "-g"),
    "fill-rule": "nonzero",
    stroke: "#D9D9D9"
  }, [L("path", {
    d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
  }, null), L("path", {
    d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
    fill: "#FAFAFA",
    class: "".concat(r, "-path")
  }, null)])])]);
};
$p.PRESENTED_IMAGE_SIMPLE = !0;
const m0 = $p;
function Kc(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Fp(e, t, n) {
  return t && Kc(e.prototype, t), n && Kc(e, n), e;
}
function Io() {
  return (Io = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
function Hp(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
function Bp(e, t) {
  if (e == null)
    return {};
  var n, r, o = {}, a = Object.keys(e);
  for (r = 0; r < a.length; r++)
    t.indexOf(n = a[r]) >= 0 || (o[n] = e[n]);
  return o;
}
function Gc(e) {
  return ((t = e) != null && typeof t == "object" && Array.isArray(t) === !1) == 1 && Object.prototype.toString.call(e) === "[object Object]";
  var t;
}
var Wp = Object.prototype, Up = Wp.toString, y0 = Wp.hasOwnProperty, qp = /^\s*function (\w+)/;
function Jc(e) {
  var t, n = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e;
  if (n) {
    var r = n.toString().match(qp);
    return r ? r[1] : "";
  }
  return "";
}
var Er = function(e) {
  var t, n;
  return Gc(e) !== !1 && typeof (t = e.constructor) == "function" && Gc(n = t.prototype) !== !1 && n.hasOwnProperty("isPrototypeOf") !== !1;
}, b0 = function(e) {
  return e;
}, Ot = b0, qi = function(e, t) {
  return y0.call(e, t);
}, C0 = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, Qr = Array.isArray || function(e) {
  return Up.call(e) === "[object Array]";
}, Zr = function(e) {
  return Up.call(e) === "[object Function]";
}, Ko = function(e) {
  return Er(e) && qi(e, "_vueTypes_name");
}, zp = function(e) {
  return Er(e) && (qi(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function(t) {
    return qi(e, t);
  }));
};
function Wl(e, t) {
  return Object.defineProperty(e.bind(t), "__original", { value: e });
}
function _r(e, t, n) {
  var r;
  n === void 0 && (n = !1);
  var o = !0, a = "";
  r = Er(e) ? e : { type: e };
  var c = Ko(r) ? r._vueTypes_name + " - " : "";
  if (zp(r) && r.type !== null) {
    if (r.type === void 0 || r.type === !0 || !r.required && t === void 0)
      return o;
    Qr(r.type) ? (o = r.type.some(function(C) {
      return _r(C, t, !0) === !0;
    }), a = r.type.map(function(C) {
      return Jc(C);
    }).join(" or ")) : o = (a = Jc(r)) === "Array" ? Qr(t) : a === "Object" ? Er(t) : a === "String" || a === "Number" || a === "Boolean" || a === "Function" ? function(C) {
      if (C == null)
        return "";
      var b = C.constructor.toString().match(qp);
      return b ? b[1] : "";
    }(t) === a : t instanceof r.type;
  }
  if (!o) {
    var d = c + 'value "' + t + '" should be of type "' + a + '"';
    return n === !1 ? (Ot(d), !1) : d;
  }
  if (qi(r, "validator") && Zr(r.validator)) {
    var p = Ot, g = [];
    if (Ot = function(C) {
      g.push(C);
    }, o = r.validator(t), Ot = p, !o) {
      var y = (g.length > 1 ? "* " : "") + g.join(`
* `);
      return g.length = 0, n === !1 ? (Ot(y), o) : y;
    }
  }
  return o;
}
function zt(e, t) {
  var n = Object.defineProperties(t, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get: function() {
    return this.required = !0, this;
  } }, def: { value: function(o) {
    return o !== void 0 || this.default ? Zr(o) || _r(this, o, !0) === !0 ? (this.default = Qr(o) ? function() {
      return [].concat(o);
    } : Er(o) ? function() {
      return Object.assign({}, o);
    } : o, this) : (Ot(this._vueTypes_name + ' - invalid default value: "' + o + '"'), this) : this;
  } } }), r = n.validator;
  return Zr(r) && (n.validator = Wl(r, n)), n;
}
function xn(e, t) {
  var n = zt(e, t);
  return Object.defineProperty(n, "validate", { value: function(r) {
    return Zr(this.validator) && Ot(this._vueTypes_name + ` - calling .validate() will overwrite the current custom validator function. Validator info:
` + JSON.stringify(this)), this.validator = Wl(r, this), this;
  } });
}
function Qc(e, t, n) {
  var r, o, a = (r = t, o = {}, Object.getOwnPropertyNames(r).forEach(function(C) {
    o[C] = Object.getOwnPropertyDescriptor(r, C);
  }), Object.defineProperties({}, o));
  if (a._vueTypes_name = e, !Er(n))
    return a;
  var c, d, p = n.validator, g = Bp(n, ["validator"]);
  if (Zr(p)) {
    var y = a.validator;
    y && (y = (d = (c = y).__original) !== null && d !== void 0 ? d : c), a.validator = Wl(y ? function(C) {
      return y.call(this, C) && p.call(this, C);
    } : p, a);
  }
  return Object.assign(a, g);
}
function ga(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
var x0 = function() {
  return xn("any", {});
}, w0 = function() {
  return xn("function", { type: Function });
}, T0 = function() {
  return xn("boolean", { type: Boolean });
}, E0 = function() {
  return xn("string", { type: String });
}, S0 = function() {
  return xn("number", { type: Number });
}, O0 = function() {
  return xn("array", { type: Array });
}, _0 = function() {
  return xn("object", { type: Object });
}, A0 = function() {
  return zt("integer", { type: Number, validator: function(e) {
    return C0(e);
  } });
}, P0 = function() {
  return zt("symbol", { validator: function(e) {
    return typeof e == "symbol";
  } });
};
function N0(e, t) {
  if (t === void 0 && (t = "custom validation failed"), typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return zt(e.name || "<<anonymous function>>", { validator: function(n) {
    var r = e(n);
    return r || Ot(this._vueTypes_name + " - " + t), r;
  } });
}
function k0(e) {
  if (!Qr(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  var t = 'oneOf - value should be one of "' + e.join('", "') + '".', n = e.reduce(function(r, o) {
    if (o != null) {
      var a = o.constructor;
      r.indexOf(a) === -1 && r.push(a);
    }
    return r;
  }, []);
  return zt("oneOf", { type: n.length > 0 ? n : void 0, validator: function(r) {
    var o = e.indexOf(r) !== -1;
    return o || Ot(t), o;
  } });
}
function L0(e) {
  if (!Qr(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  for (var t = !1, n = [], r = 0; r < e.length; r += 1) {
    var o = e[r];
    if (zp(o)) {
      if (Ko(o) && o._vueTypes_name === "oneOf") {
        n = n.concat(o.type);
        continue;
      }
      if (Zr(o.validator) && (t = !0), o.type !== !0 && o.type) {
        n = n.concat(o.type);
        continue;
      }
    }
    n.push(o);
  }
  return n = n.filter(function(a, c) {
    return n.indexOf(a) === c;
  }), zt("oneOfType", t ? { type: n, validator: function(a) {
    var c = [], d = e.some(function(p) {
      var g = _r(Ko(p) && p._vueTypes_name === "oneOf" ? p.type || null : p, a, !0);
      return typeof g == "string" && c.push(g), g === !0;
    });
    return d || Ot("oneOfType - provided value does not match any of the " + c.length + ` passed-in validators:
` + ga(c.join(`
`))), d;
  } } : { type: n });
}
function R0(e) {
  return zt("arrayOf", { type: Array, validator: function(t) {
    var n, r = t.every(function(o) {
      return (n = _r(e, o, !0)) === !0;
    });
    return r || Ot(`arrayOf - value validation error:
` + ga(n)), r;
  } });
}
function M0(e) {
  return zt("instanceOf", { type: e });
}
function I0(e) {
  return zt("objectOf", { type: Object, validator: function(t) {
    var n, r = Object.keys(t).every(function(o) {
      return (n = _r(e, t[o], !0)) === !0;
    });
    return r || Ot(`objectOf - value validation error:
` + ga(n)), r;
  } });
}
function j0(e) {
  var t = Object.keys(e), n = t.filter(function(o) {
    var a;
    return !!(!((a = e[o]) === null || a === void 0) && a.required);
  }), r = zt("shape", { type: Object, validator: function(o) {
    var a = this;
    if (!Er(o))
      return !1;
    var c = Object.keys(o);
    if (n.length > 0 && n.some(function(p) {
      return c.indexOf(p) === -1;
    })) {
      var d = n.filter(function(p) {
        return c.indexOf(p) === -1;
      });
      return Ot(d.length === 1 ? 'shape - required property "' + d[0] + '" is not defined.' : 'shape - required properties "' + d.join('", "') + '" are not defined.'), !1;
    }
    return c.every(function(p) {
      if (t.indexOf(p) === -1)
        return a._vueTypes_isLoose === !0 || (Ot('shape - shape definition does not include a "' + p + '" property. Allowed keys: "' + t.join('", "') + '".'), !1);
      var g = _r(e[p], o[p], !0);
      return typeof g == "string" && Ot('shape - "' + p + `" property validation error:
 ` + ga(g)), g === !0;
    });
  } });
  return Object.defineProperty(r, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(r, "loose", { get: function() {
    return this._vueTypes_isLoose = !0, this;
  } }), r;
}
var hn = function() {
  function e() {
  }
  return e.extend = function(t) {
    var n = this;
    if (Qr(t))
      return t.forEach(function(C) {
        return n.extend(C);
      }), this;
    var r = t.name, o = t.validate, a = o !== void 0 && o, c = t.getter, d = c !== void 0 && c, p = Bp(t, ["name", "validate", "getter"]);
    if (qi(this, r))
      throw new TypeError('[VueTypes error]: Type "' + r + '" already defined');
    var g, y = p.type;
    return Ko(y) ? (delete p.type, Object.defineProperty(this, r, d ? { get: function() {
      return Qc(r, y, p);
    } } : { value: function() {
      var C, b = Qc(r, y, p);
      return b.validator && (b.validator = (C = b.validator).bind.apply(C, [b].concat([].slice.call(arguments)))), b;
    } })) : (g = d ? { get: function() {
      var C = Object.assign({}, p);
      return a ? xn(r, C) : zt(r, C);
    }, enumerable: !0 } : { value: function() {
      var C, b, E = Object.assign({}, p);
      return C = a ? xn(r, E) : zt(r, E), E.validator && (C.validator = (b = E.validator).bind.apply(b, [C].concat([].slice.call(arguments)))), C;
    }, enumerable: !0 }, Object.defineProperty(this, r, g));
  }, Fp(e, null, [{ key: "any", get: function() {
    return x0();
  } }, { key: "func", get: function() {
    return w0().def(this.defaults.func);
  } }, { key: "bool", get: function() {
    return T0().def(this.defaults.bool);
  } }, { key: "string", get: function() {
    return E0().def(this.defaults.string);
  } }, { key: "number", get: function() {
    return S0().def(this.defaults.number);
  } }, { key: "array", get: function() {
    return O0().def(this.defaults.array);
  } }, { key: "object", get: function() {
    return _0().def(this.defaults.object);
  } }, { key: "integer", get: function() {
    return A0().def(this.defaults.integer);
  } }, { key: "symbol", get: function() {
    return P0();
  } }]), e;
}();
function Yp(e) {
  var t;
  return e === void 0 && (e = { func: function() {
  }, bool: !0, string: "", number: 0, array: function() {
    return [];
  }, object: function() {
    return {};
  }, integer: 0 }), (t = function(n) {
    function r() {
      return n.apply(this, arguments) || this;
    }
    return Hp(r, n), Fp(r, null, [{ key: "sensibleDefaults", get: function() {
      return Io({}, this.defaults);
    }, set: function(o) {
      this.defaults = o !== !1 ? Io({}, o !== !0 ? o : e) : {};
    } }]), r;
  }(hn)).defaults = Io({}, e), t;
}
hn.defaults = {}, hn.custom = N0, hn.oneOf = k0, hn.instanceOf = M0, hn.oneOfType = L0, hn.arrayOf = R0, hn.objectOf = I0, hn.shape = j0, hn.utils = { validate: function(e, t) {
  return _r(t, e, !0) === !0;
}, toType: function(e, t, n) {
  return n === void 0 && (n = !1), n ? xn(e, t) : zt(e, t);
} };
(function(e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  return Hp(t, e), t;
})(Yp());
var Xp = Yp({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
});
Xp.extend([{
  name: "looseBool",
  getter: !0,
  type: Boolean,
  default: void 0
}, {
  name: "style",
  getter: !0,
  type: [String, Object],
  default: void 0
}, {
  name: "VueNode",
  getter: !0,
  type: null
}]);
const Je = Xp;
var D0 = ["image", "description", "imageStyle", "class"], Vp = L(g0, null, null), Kp = L(m0, null, null), ai = function(t, n) {
  var r, o = n.slots, a = o === void 0 ? {} : o, c = n.attrs, d = wn("empty", t), p = d.direction, g = d.prefixCls, y = g.value, C = G(G({}, t), c), b = C.image, E = b === void 0 ? Vp : b, w = C.description, A = w === void 0 ? ((r = a.description) === null || r === void 0 ? void 0 : r.call(a)) || void 0 : w, D = C.imageStyle, N = C.class, I = N === void 0 ? "" : N, F = va(C, D0);
  return L(Ip, {
    componentName: "Empty",
    children: function(B) {
      var u, Y = typeof A < "u" ? A : B.description, X = typeof Y == "string" ? Y : "empty", oe = null;
      return typeof E == "string" ? oe = L("img", {
        alt: X,
        src: E
      }, null) : oe = E, L("div", G({
        class: Cn(y, I, (u = {}, Ae(u, "".concat(y, "-normal"), E === Kp), Ae(u, "".concat(y, "-rtl"), p.value === "rtl"), u))
      }, F), [L("div", {
        class: "".concat(y, "-image"),
        style: D
      }, [oe]), Y && L("p", {
        class: "".concat(y, "-description")
      }, [Y]), a.default && L("div", {
        class: "".concat(y, "-footer")
      }, [Hl(a.default())])]);
    }
  }, null);
};
ai.displayName = "AEmpty";
ai.PRESENTED_IMAGE_DEFAULT = Vp;
ai.PRESENTED_IMAGE_SIMPLE = Kp;
ai.inheritAttrs = !1;
ai.props = {
  prefixCls: String,
  image: Je.any,
  description: Je.any,
  imageStyle: {
    type: Object,
    default: void 0
  }
};
const wi = ha(ai);
var $0 = function(t) {
  var n = wn("empty", t), r = n.prefixCls, o = function(c) {
    switch (c) {
      case "Table":
      case "List":
        return L(wi, {
          image: wi.PRESENTED_IMAGE_SIMPLE
        }, null);
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return L(wi, {
          image: wi.PRESENTED_IMAGE_SIMPLE,
          class: "".concat(r.value, "-small")
        }, null);
      default:
        return L(wi, null, null);
    }
  };
  return o(t.componentName);
};
function Gp(e) {
  return L($0, {
    componentName: e
  }, null);
}
var Zc = {};
function F0(e, t) {
}
function H0(e, t, n) {
  !t && !Zc[n] && (e(!1, n), Zc[n] = !0);
}
function Jp(e, t) {
  H0(F0, e, t);
}
const B0 = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  Jp(e, "[antdv: ".concat(t, "] ").concat(n));
};
var Ys = "internalMark", jo = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "ALocaleProvider",
  props: {
    locale: {
      type: Object
    },
    ANT_MARK__: String
  },
  setup: function(t, n) {
    var r = n.slots;
    B0(t.ANT_MARK__ === Ys, "LocaleProvider", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead");
    var o = cn({
      antLocale: G(G({}, t.locale), {}, {
        exist: !0
      }),
      ANT_MARK__: Ys
    });
    return Xi("localeData", o), Ut(function() {
      return t.locale;
    }, function() {
      o.antLocale = G(G({}, t.locale), {}, {
        exist: !0
      });
    }, {
      immediate: !0
    }), function() {
      var a;
      return (a = r.default) === null || a === void 0 ? void 0 : a.call(r);
    };
  }
});
jo.install = function(e) {
  return e.component(jo.name, jo), e;
};
const W0 = ha(jo);
zs("bottomLeft", "bottomRight", "topLeft", "topRight");
var Qp = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = G(t ? {
    name: t,
    appear: !0,
    // type: 'animation',
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    // appearActiveClass: `antdv-base-transtion`,
    // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
    enterFromClass: "".concat(t, "-enter ").concat(t, "-enter-prepare"),
    enterActiveClass: "".concat(t, "-enter ").concat(t, "-enter-prepare"),
    enterToClass: "".concat(t, "-enter ").concat(t, "-enter-active"),
    leaveFromClass: " ".concat(t, "-leave"),
    leaveActiveClass: "".concat(t, "-leave ").concat(t, "-leave-active"),
    leaveToClass: "".concat(t, "-leave ").concat(t, "-leave-active")
  } : {
    css: !1
  }, n);
  return r;
}, U0 = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = G(t ? {
    name: t,
    appear: !0,
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    appearActiveClass: "".concat(t),
    appearToClass: "".concat(t, "-appear ").concat(t, "-appear-active"),
    enterFromClass: "".concat(t, "-appear ").concat(t, "-enter ").concat(t, "-appear-prepare ").concat(t, "-enter-prepare"),
    enterActiveClass: "".concat(t),
    enterToClass: "".concat(t, "-enter ").concat(t, "-appear ").concat(t, "-appear-active ").concat(t, "-enter-active"),
    leaveActiveClass: "".concat(t, " ").concat(t, "-leave"),
    leaveToClass: "".concat(t, "-leave-active")
  } : {
    css: !1
  }, n);
  return r;
}, Go = function(t, n, r) {
  return r !== void 0 ? r : "".concat(t, "-").concat(n);
};
const q0 = Ze({
  name: "Notice",
  inheritAttrs: !1,
  props: ["prefixCls", "duration", "updateMark", "noticeKey", "closeIcon", "closable", "props", "onClick", "onClose", "holder", "visible"],
  setup: function(t, n) {
    var r = n.attrs, o = n.slots, a, c = Me(function() {
      return t.duration === void 0 ? 1.5 : t.duration;
    }), d = function() {
      c.value && (a = setTimeout(function() {
        g();
      }, c.value * 1e3));
    }, p = function() {
      a && (clearTimeout(a), a = null);
    }, g = function(b) {
      b && b.stopPropagation(), p();
      var E = t.onClose, w = t.noticeKey;
      E && E(w);
    }, y = function() {
      p(), d();
    };
    return Zt(function() {
      d();
    }), Al(function() {
      p();
    }), Ut([c, function() {
      return t.updateMark;
    }, function() {
      return t.visible;
    }], function(C, b) {
      var E = Tr(C, 3), w = E[0], A = E[1], D = E[2], N = Tr(b, 3), I = N[0], F = N[1], J = N[2];
      (w !== I || A !== F || D !== J && J) && y();
    }, {
      flush: "post"
    }), function() {
      var C, b, E = t.prefixCls, w = t.closable, A = t.closeIcon, D = A === void 0 ? (C = o.closeIcon) === null || C === void 0 ? void 0 : C.call(o) : A, N = t.onClick, I = t.holder, F = r.class, J = r.style, B = "".concat(E, "-notice"), u = Object.keys(r).reduce(function(X, oe) {
        return (oe.substr(0, 5) === "data-" || oe.substr(0, 5) === "aria-" || oe === "role") && (X[oe] = r[oe]), X;
      }, {}), Y = L("div", G({
        class: Cn(B, F, Ae({}, "".concat(B, "-closable"), w)),
        style: J,
        onMouseenter: p,
        onMouseleave: d,
        onClick: N
      }, u), [L("div", {
        class: "".concat(B, "-content")
      }, [(b = o.default) === null || b === void 0 ? void 0 : b.call(o)]), w ? L("a", {
        tabindex: 0,
        onClick: g,
        class: "".concat(B, "-close")
      }, [D || L("span", {
        class: "".concat(B, "-close-x")
      }, null)]) : null]);
      return I ? L(qd, {
        to: I
      }, {
        default: function() {
          return Y;
        }
      }) : Y;
    };
  }
});
var z0 = ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName"], ef = 0, Y0 = Date.now();
function tf() {
  var e = ef;
  return ef += 1, "rcNotification_".concat(Y0, "_").concat(e);
}
var Xs = Ze({
  name: "Notification",
  inheritAttrs: !1,
  props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon"],
  setup: function(t, n) {
    var r = n.attrs, o = n.expose, a = n.slots, c = /* @__PURE__ */ new Map(), d = Fe([]), p = Me(function() {
      var C = t.prefixCls, b = t.animation, E = b === void 0 ? "fade" : b, w = t.transitionName;
      return !w && E && (w = "".concat(C, "-").concat(E)), U0(w);
    }), g = function(b, E) {
      var w = b.key || tf(), A = G(G({}, b), {}, {
        key: w
      }), D = t.maxCount, N = d.value.map(function(F) {
        return F.notice.key;
      }).indexOf(w), I = d.value.concat();
      N !== -1 ? I.splice(N, 1, {
        notice: A,
        holderCallback: E
      }) : (D && d.value.length >= D && (A.key = I[0].notice.key, A.updateMark = tf(), A.userPassKey = w, I.shift()), I.push({
        notice: A,
        holderCallback: E
      })), d.value = I;
    }, y = function(b) {
      d.value = d.value.filter(function(E) {
        var w = E.notice, A = w.key, D = w.userPassKey, N = D || A;
        return N !== b;
      });
    };
    return o({
      add: g,
      remove: y,
      notices: d
    }), function() {
      var C, b, E = t.prefixCls, w = t.closeIcon, A = w === void 0 ? (C = a.closeIcon) === null || C === void 0 ? void 0 : C.call(a, {
        prefixCls: E
      }) : w, D = d.value.map(function(I, F) {
        var J = I.notice, B = I.holderCallback, u = F === d.value.length - 1 ? J.updateMark : void 0, Y = J.key, X = J.userPassKey, oe = J.content, fe = G(G(G({
          prefixCls: E,
          closeIcon: typeof A == "function" ? A({
            prefixCls: E
          }) : A
        }, J), J.props), {}, {
          key: Y,
          noticeKey: X || Y,
          updateMark: u,
          onClose: function(Q) {
            var pe;
            y(Q), (pe = J.onClose) === null || pe === void 0 || pe.call(J);
          },
          onClick: J.onClick
        });
        return B ? L("div", {
          key: Y,
          class: "".concat(E, "-hook-holder"),
          ref: function(Q) {
            typeof Y > "u" || (Q ? (c.set(Y, Q), B(Q, fe)) : c.delete(Y));
          }
        }, null) : L(q0, fe, {
          default: function() {
            return [typeof oe == "function" ? oe({
              prefixCls: E
            }) : oe];
          }
        });
      }), N = (b = {}, Ae(b, E, 1), Ae(b, r.class, !!r.class), b);
      return L("div", {
        class: N,
        style: r.style || {
          top: "65px",
          left: "50%"
        }
      }, [L(uy, G({
        tag: "div"
      }, p.value), {
        default: function() {
          return [D];
        }
      })]);
    };
  }
});
Xs.newInstance = function(t, n) {
  var r = t || {}, o = r.name, a = o === void 0 ? "notification" : o, c = r.getContainer, d = r.appContext, p = r.prefixCls, g = r.rootPrefixCls, y = r.transitionName, C = r.hasTransitionName, b = va(r, z0), E = document.createElement("div");
  if (c) {
    var w = c();
    w.appendChild(E);
  } else
    document.body.appendChild(E);
  var A = Ze({
    compatConfig: {
      MODE: 3
    },
    name: "NotificationWrapper",
    setup: function(I, F) {
      var J = F.attrs, B = Fe();
      return Zt(function() {
        n({
          notice: function(Y) {
            var X;
            (X = B.value) === null || X === void 0 || X.add(Y);
          },
          removeNotice: function(Y) {
            var X;
            (X = B.value) === null || X === void 0 || X.remove(Y);
          },
          destroy: function() {
            qo(null, E), E.parentNode && E.parentNode.removeChild(E);
          },
          component: B
        });
      }), function() {
        var u = Rt, Y = u.getPrefixCls(a, p), X = u.getRootPrefixCls(g, Y), oe = C ? y : "".concat(X, "-").concat(y);
        return L(zr, G(G({}, u), {}, {
          notUpdateGlobalConfig: !0,
          prefixCls: X
        }), {
          default: function() {
            return [L(Xs, G(G({
              ref: B
            }, J), {}, {
              prefixCls: Y,
              transitionName: oe
            }), null)];
          }
        });
      };
    }
  }), D = L(A, b);
  D.appContext = d || D.appContext, qo(D, E);
};
const Zp = Xs;
var X0 = { icon: { tag: "svg", attrs: { viewBox: "0 0 1024 1024", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, name: "loading", theme: "outlined" };
const V0 = X0;
function bt(e, t) {
  K0(e) && (e = "100%");
  var n = G0(e);
  return e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e))), n && (e = parseInt(String(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / parseFloat(String(t)) : e = e % t / parseFloat(String(t)), e);
}
function Co(e) {
  return Math.min(1, Math.max(0, e));
}
function K0(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function G0(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function eh(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function xo(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function br(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function J0(e, t, n) {
  return {
    r: bt(e, 255) * 255,
    g: bt(t, 255) * 255,
    b: bt(n, 255) * 255
  };
}
function nf(e, t, n) {
  e = bt(e, 255), t = bt(t, 255), n = bt(n, 255);
  var r = Math.max(e, t, n), o = Math.min(e, t, n), a = 0, c = 0, d = (r + o) / 2;
  if (r === o)
    c = 0, a = 0;
  else {
    var p = r - o;
    switch (c = d > 0.5 ? p / (2 - r - o) : p / (r + o), r) {
      case e:
        a = (t - n) / p + (t < n ? 6 : 0);
        break;
      case t:
        a = (n - e) / p + 2;
        break;
      case n:
        a = (e - t) / p + 4;
        break;
    }
    a /= 6;
  }
  return { h: a, s: c, l: d };
}
function ds(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * (6 * n) : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Q0(e, t, n) {
  var r, o, a;
  if (e = bt(e, 360), t = bt(t, 100), n = bt(n, 100), t === 0)
    o = n, a = n, r = n;
  else {
    var c = n < 0.5 ? n * (1 + t) : n + t - n * t, d = 2 * n - c;
    r = ds(d, c, e + 1 / 3), o = ds(d, c, e), a = ds(d, c, e - 1 / 3);
  }
  return { r: r * 255, g: o * 255, b: a * 255 };
}
function Vs(e, t, n) {
  e = bt(e, 255), t = bt(t, 255), n = bt(n, 255);
  var r = Math.max(e, t, n), o = Math.min(e, t, n), a = 0, c = r, d = r - o, p = r === 0 ? 0 : d / r;
  if (r === o)
    a = 0;
  else {
    switch (r) {
      case e:
        a = (t - n) / d + (t < n ? 6 : 0);
        break;
      case t:
        a = (n - e) / d + 2;
        break;
      case n:
        a = (e - t) / d + 4;
        break;
    }
    a /= 6;
  }
  return { h: a, s: p, v: c };
}
function Z0(e, t, n) {
  e = bt(e, 360) * 6, t = bt(t, 100), n = bt(n, 100);
  var r = Math.floor(e), o = e - r, a = n * (1 - t), c = n * (1 - o * t), d = n * (1 - (1 - o) * t), p = r % 6, g = [n, c, a, a, d, n][p], y = [d, n, n, c, a, a][p], C = [a, a, d, n, n, c][p];
  return { r: g * 255, g: y * 255, b: C * 255 };
}
function Ks(e, t, n, r) {
  var o = [
    br(Math.round(e).toString(16)),
    br(Math.round(t).toString(16)),
    br(Math.round(n).toString(16))
  ];
  return r && o[0].startsWith(o[0].charAt(1)) && o[1].startsWith(o[1].charAt(1)) && o[2].startsWith(o[2].charAt(1)) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) : o.join("");
}
function e1(e, t, n, r, o) {
  var a = [
    br(Math.round(e).toString(16)),
    br(Math.round(t).toString(16)),
    br(Math.round(n).toString(16)),
    br(t1(r))
  ];
  return o && a[0].startsWith(a[0].charAt(1)) && a[1].startsWith(a[1].charAt(1)) && a[2].startsWith(a[2].charAt(1)) && a[3].startsWith(a[3].charAt(1)) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) + a[3].charAt(0) : a.join("");
}
function t1(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function rf(e) {
  return Wt(e) / 255;
}
function Wt(e) {
  return parseInt(e, 16);
}
function n1(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255
  };
}
var Gs = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function Ir(e) {
  var t = { r: 0, g: 0, b: 0 }, n = 1, r = null, o = null, a = null, c = !1, d = !1;
  return typeof e == "string" && (e = o1(e)), typeof e == "object" && (_n(e.r) && _n(e.g) && _n(e.b) ? (t = J0(e.r, e.g, e.b), c = !0, d = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : _n(e.h) && _n(e.s) && _n(e.v) ? (r = xo(e.s), o = xo(e.v), t = Z0(e.h, r, o), c = !0, d = "hsv") : _n(e.h) && _n(e.s) && _n(e.l) && (r = xo(e.s), a = xo(e.l), t = Q0(e.h, r, a), c = !0, d = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)), n = eh(n), {
    ok: c,
    format: e.format || d,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: n
  };
}
var r1 = "[-\\+]?\\d+%?", i1 = "[-\\+]?\\d*\\.\\d+%?", Kn = "(?:".concat(i1, ")|(?:").concat(r1, ")"), ps = "[\\s|\\(]+(".concat(Kn, ")[,|\\s]+(").concat(Kn, ")[,|\\s]+(").concat(Kn, ")\\s*\\)?"), hs = "[\\s|\\(]+(".concat(Kn, ")[,|\\s]+(").concat(Kn, ")[,|\\s]+(").concat(Kn, ")[,|\\s]+(").concat(Kn, ")\\s*\\)?"), an = {
  CSS_UNIT: new RegExp(Kn),
  rgb: new RegExp("rgb" + ps),
  rgba: new RegExp("rgba" + hs),
  hsl: new RegExp("hsl" + ps),
  hsla: new RegExp("hsla" + hs),
  hsv: new RegExp("hsv" + ps),
  hsva: new RegExp("hsva" + hs),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function o1(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var t = !1;
  if (Gs[e])
    e = Gs[e], t = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = an.rgb.exec(e);
  return n ? { r: n[1], g: n[2], b: n[3] } : (n = an.rgba.exec(e), n ? { r: n[1], g: n[2], b: n[3], a: n[4] } : (n = an.hsl.exec(e), n ? { h: n[1], s: n[2], l: n[3] } : (n = an.hsla.exec(e), n ? { h: n[1], s: n[2], l: n[3], a: n[4] } : (n = an.hsv.exec(e), n ? { h: n[1], s: n[2], v: n[3] } : (n = an.hsva.exec(e), n ? { h: n[1], s: n[2], v: n[3], a: n[4] } : (n = an.hex8.exec(e), n ? {
    r: Wt(n[1]),
    g: Wt(n[2]),
    b: Wt(n[3]),
    a: rf(n[4]),
    format: t ? "name" : "hex8"
  } : (n = an.hex6.exec(e), n ? {
    r: Wt(n[1]),
    g: Wt(n[2]),
    b: Wt(n[3]),
    format: t ? "name" : "hex"
  } : (n = an.hex4.exec(e), n ? {
    r: Wt(n[1] + n[1]),
    g: Wt(n[2] + n[2]),
    b: Wt(n[3] + n[3]),
    a: rf(n[4] + n[4]),
    format: t ? "name" : "hex8"
  } : (n = an.hex3.exec(e), n ? {
    r: Wt(n[1] + n[1]),
    g: Wt(n[2] + n[2]),
    b: Wt(n[3] + n[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function _n(e) {
  return Boolean(an.CSS_UNIT.exec(String(e)));
}
var vs = (
  /** @class */
  function() {
    function e(t, n) {
      t === void 0 && (t = ""), n === void 0 && (n = {});
      var r;
      if (t instanceof e)
        return t;
      typeof t == "number" && (t = n1(t)), this.originalInput = t;
      var o = Ir(t);
      this.originalInput = t, this.r = o.r, this.g = o.g, this.b = o.b, this.a = o.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (r = n.format) !== null && r !== void 0 ? r : o.format, this.gradientType = n.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = o.ok;
    }
    return e.prototype.isDark = function() {
      return this.getBrightness() < 128;
    }, e.prototype.isLight = function() {
      return !this.isDark();
    }, e.prototype.getBrightness = function() {
      var t = this.toRgb();
      return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
    }, e.prototype.getLuminance = function() {
      var t = this.toRgb(), n, r, o, a = t.r / 255, c = t.g / 255, d = t.b / 255;
      return a <= 0.03928 ? n = a / 12.92 : n = Math.pow((a + 0.055) / 1.055, 2.4), c <= 0.03928 ? r = c / 12.92 : r = Math.pow((c + 0.055) / 1.055, 2.4), d <= 0.03928 ? o = d / 12.92 : o = Math.pow((d + 0.055) / 1.055, 2.4), 0.2126 * n + 0.7152 * r + 0.0722 * o;
    }, e.prototype.getAlpha = function() {
      return this.a;
    }, e.prototype.setAlpha = function(t) {
      return this.a = eh(t), this.roundA = Math.round(100 * this.a) / 100, this;
    }, e.prototype.isMonochrome = function() {
      var t = this.toHsl().s;
      return t === 0;
    }, e.prototype.toHsv = function() {
      var t = Vs(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }, e.prototype.toHsvString = function() {
      var t = Vs(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), o = Math.round(t.v * 100);
      return this.a === 1 ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(o, "%)") : "hsva(".concat(n, ", ").concat(r, "%, ").concat(o, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHsl = function() {
      var t = nf(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }, e.prototype.toHslString = function() {
      var t = nf(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), o = Math.round(t.l * 100);
      return this.a === 1 ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(o, "%)") : "hsla(".concat(n, ", ").concat(r, "%, ").concat(o, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHex = function(t) {
      return t === void 0 && (t = !1), Ks(this.r, this.g, this.b, t);
    }, e.prototype.toHexString = function(t) {
      return t === void 0 && (t = !1), "#" + this.toHex(t);
    }, e.prototype.toHex8 = function(t) {
      return t === void 0 && (t = !1), e1(this.r, this.g, this.b, this.a, t);
    }, e.prototype.toHex8String = function(t) {
      return t === void 0 && (t = !1), "#" + this.toHex8(t);
    }, e.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    }, e.prototype.toRgbString = function() {
      var t = Math.round(this.r), n = Math.round(this.g), r = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(t, ", ").concat(n, ", ").concat(r, ")") : "rgba(".concat(t, ", ").concat(n, ", ").concat(r, ", ").concat(this.roundA, ")");
    }, e.prototype.toPercentageRgb = function() {
      var t = function(n) {
        return "".concat(Math.round(bt(n, 255) * 100), "%");
      };
      return {
        r: t(this.r),
        g: t(this.g),
        b: t(this.b),
        a: this.a
      };
    }, e.prototype.toPercentageRgbString = function() {
      var t = function(n) {
        return Math.round(bt(n, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%)") : "rgba(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%, ").concat(this.roundA, ")");
    }, e.prototype.toName = function() {
      if (this.a === 0)
        return "transparent";
      if (this.a < 1)
        return !1;
      for (var t = "#" + Ks(this.r, this.g, this.b, !1), n = 0, r = Object.entries(Gs); n < r.length; n++) {
        var o = r[n], a = o[0], c = o[1];
        if (t === c)
          return a;
      }
      return !1;
    }, e.prototype.toString = function(t) {
      var n = Boolean(t);
      t = t ?? this.format;
      var r = !1, o = this.a < 1 && this.a >= 0, a = !n && o && (t.startsWith("hex") || t === "name");
      return a ? t === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (t === "rgb" && (r = this.toRgbString()), t === "prgb" && (r = this.toPercentageRgbString()), (t === "hex" || t === "hex6") && (r = this.toHexString()), t === "hex3" && (r = this.toHexString(!0)), t === "hex4" && (r = this.toHex8String(!0)), t === "hex8" && (r = this.toHex8String()), t === "name" && (r = this.toName()), t === "hsl" && (r = this.toHslString()), t === "hsv" && (r = this.toHsvString()), r || this.toHexString());
    }, e.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    }, e.prototype.clone = function() {
      return new e(this.toString());
    }, e.prototype.lighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l += t / 100, n.l = Co(n.l), new e(n);
    }, e.prototype.brighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100)))), n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100)))), n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100)))), new e(n);
    }, e.prototype.darken = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l -= t / 100, n.l = Co(n.l), new e(n);
    }, e.prototype.tint = function(t) {
      return t === void 0 && (t = 10), this.mix("white", t);
    }, e.prototype.shade = function(t) {
      return t === void 0 && (t = 10), this.mix("black", t);
    }, e.prototype.desaturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s -= t / 100, n.s = Co(n.s), new e(n);
    }, e.prototype.saturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s += t / 100, n.s = Co(n.s), new e(n);
    }, e.prototype.greyscale = function() {
      return this.desaturate(100);
    }, e.prototype.spin = function(t) {
      var n = this.toHsl(), r = (n.h + t) % 360;
      return n.h = r < 0 ? 360 + r : r, new e(n);
    }, e.prototype.mix = function(t, n) {
      n === void 0 && (n = 50);
      var r = this.toRgb(), o = new e(t).toRgb(), a = n / 100, c = {
        r: (o.r - r.r) * a + r.r,
        g: (o.g - r.g) * a + r.g,
        b: (o.b - r.b) * a + r.b,
        a: (o.a - r.a) * a + r.a
      };
      return new e(c);
    }, e.prototype.analogous = function(t, n) {
      t === void 0 && (t = 6), n === void 0 && (n = 30);
      var r = this.toHsl(), o = 360 / n, a = [this];
      for (r.h = (r.h - (o * t >> 1) + 720) % 360; --t; )
        r.h = (r.h + o) % 360, a.push(new e(r));
      return a;
    }, e.prototype.complement = function() {
      var t = this.toHsl();
      return t.h = (t.h + 180) % 360, new e(t);
    }, e.prototype.monochromatic = function(t) {
      t === void 0 && (t = 6);
      for (var n = this.toHsv(), r = n.h, o = n.s, a = n.v, c = [], d = 1 / t; t--; )
        c.push(new e({ h: r, s: o, v: a })), a = (a + d) % 1;
      return c;
    }, e.prototype.splitcomplement = function() {
      var t = this.toHsl(), n = t.h;
      return [
        this,
        new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
        new e({ h: (n + 216) % 360, s: t.s, l: t.l })
      ];
    }, e.prototype.onBackground = function(t) {
      var n = this.toRgb(), r = new e(t).toRgb();
      return new e({
        r: r.r + (n.r - r.r) * n.a,
        g: r.g + (n.g - r.g) * n.a,
        b: r.b + (n.b - r.b) * n.a
      });
    }, e.prototype.triad = function() {
      return this.polyad(3);
    }, e.prototype.tetrad = function() {
      return this.polyad(4);
    }, e.prototype.polyad = function(t) {
      for (var n = this.toHsl(), r = n.h, o = [this], a = 360 / t, c = 1; c < t; c++)
        o.push(new e({ h: (r + c * a) % 360, s: n.s, l: n.l }));
      return o;
    }, e.prototype.equals = function(t) {
      return this.toRgbString() === new e(t).toRgbString();
    }, e;
  }()
), wo = 2, of = 0.16, a1 = 0.05, s1 = 0.05, l1 = 0.15, th = 5, nh = 4, u1 = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function af(e) {
  var t = e.r, n = e.g, r = e.b, o = Vs(t, n, r);
  return {
    h: o.h * 360,
    s: o.s,
    v: o.v
  };
}
function To(e) {
  var t = e.r, n = e.g, r = e.b;
  return "#".concat(Ks(t, n, r, !1));
}
function c1(e, t, n) {
  var r = n / 100, o = {
    r: (t.r - e.r) * r + e.r,
    g: (t.g - e.g) * r + e.g,
    b: (t.b - e.b) * r + e.b
  };
  return o;
}
function sf(e, t, n) {
  var r;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? r = n ? Math.round(e.h) - wo * t : Math.round(e.h) + wo * t : r = n ? Math.round(e.h) + wo * t : Math.round(e.h) - wo * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function lf(e, t, n) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var r;
  return n ? r = e.s - of * t : t === nh ? r = e.s + of : r = e.s + a1 * t, r > 1 && (r = 1), n && t === th && r > 0.1 && (r = 0.1), r < 0.06 && (r = 0.06), Number(r.toFixed(2));
}
function uf(e, t, n) {
  var r;
  return n ? r = e.v + s1 * t : r = e.v - l1 * t, r > 1 && (r = 1), Number(r.toFixed(2));
}
function zi(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [], r = Ir(e), o = th; o > 0; o -= 1) {
    var a = af(r), c = To(Ir({
      h: sf(a, o, !0),
      s: lf(a, o, !0),
      v: uf(a, o, !0)
    }));
    n.push(c);
  }
  n.push(To(r));
  for (var d = 1; d <= nh; d += 1) {
    var p = af(r), g = To(Ir({
      h: sf(p, d),
      s: lf(p, d),
      v: uf(p, d)
    }));
    n.push(g);
  }
  return t.theme === "dark" ? u1.map(function(y) {
    var C = y.index, b = y.opacity, E = To(c1(Ir(t.backgroundColor || "#141414"), Ir(n[C]), b * 100));
    return E;
  }) : n;
}
var gs = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
}, ms = {}, ys = {};
Object.keys(gs).forEach(function(e) {
  ms[e] = zi(gs[e]), ms[e].primary = ms[e][5], ys[e] = zi(gs[e], {
    theme: "dark",
    backgroundColor: "#141414"
  }), ys[e].primary = ys[e][5];
});
var cf = [], Ti = [], f1 = "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";
function d1() {
  var e = document.createElement("style");
  return e.setAttribute("type", "text/css"), e;
}
function p1(e, t) {
  if (t = t || {}, e === void 0)
    throw new Error(f1);
  var n = t.prepend === !0 ? "prepend" : "append", r = t.container !== void 0 ? t.container : document.querySelector("head"), o = cf.indexOf(r);
  o === -1 && (o = cf.push(r) - 1, Ti[o] = {});
  var a;
  return Ti[o] !== void 0 && Ti[o][n] !== void 0 ? a = Ti[o][n] : (a = Ti[o][n] = d1(), n === "prepend" ? r.insertBefore(a, r.childNodes[0]) : r.appendChild(a)), e.charCodeAt(0) === 65279 && (e = e.substr(1, e.length)), a.styleSheet ? a.styleSheet.cssText += e : a.textContent += e, a;
}
function ff(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      h1(e, o, n[o]);
    });
  }
  return e;
}
function h1(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function df(e) {
  return typeof e == "object" && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function Js(e, t, n) {
  return n ? Uo(e.tag, ff({
    key: t
  }, n, e.attrs), (e.children || []).map(function(r, o) {
    return Js(r, "".concat(t, "-").concat(e.tag, "-").concat(o));
  })) : Uo(e.tag, ff({
    key: t
  }, e.attrs), (e.children || []).map(function(r, o) {
    return Js(r, "".concat(t, "-").concat(e.tag, "-").concat(o));
  }));
}
function rh(e) {
  return zi(e)[0];
}
function ih(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var v1 = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, pf = !1, g1 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : v1;
  jn(function() {
    pf || (typeof window < "u" && window.document && window.document.documentElement && p1(t, {
      prepend: !0
    }), pf = !0);
  });
}, m1 = ["icon", "primaryColor", "secondaryColor"];
function y1(e, t) {
  if (e == null)
    return {};
  var n = b1(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (o = 0; o < a.length; o++)
      r = a[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function b1(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Do(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      C1(e, o, n[o]);
    });
  }
  return e;
}
function C1(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Li = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function x1(e) {
  var t = e.primaryColor, n = e.secondaryColor;
  Li.primaryColor = t, Li.secondaryColor = n || rh(t), Li.calculated = !!n;
}
function w1() {
  return Do({}, Li);
}
var si = function(t, n) {
  var r = Do({}, t, n.attrs), o = r.icon, a = r.primaryColor, c = r.secondaryColor, d = y1(r, m1), p = Li;
  if (a && (p = {
    primaryColor: a,
    secondaryColor: c || rh(a)
  }), g1(), df(o), !df(o))
    return null;
  var g = o;
  return g && typeof g.icon == "function" && (g = Do({}, g, {
    icon: g.icon(p.primaryColor, p.secondaryColor)
  })), Js(g.icon, "svg-".concat(g.name), Do({}, d, {
    "data-icon": g.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }));
};
si.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
};
si.inheritAttrs = !1;
si.displayName = "IconBase";
si.getTwoToneColors = w1;
si.setTwoToneColors = x1;
const Ul = si;
function T1(e, t) {
  return _1(e) || O1(e, t) || S1(e, t) || E1();
}
function E1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function S1(e, t) {
  if (e) {
    if (typeof e == "string")
      return hf(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return hf(e, t);
  }
}
function hf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function O1(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], o = !0, a = !1, c, d;
    try {
      for (n = n.call(e); !(o = (c = n.next()).done) && (r.push(c.value), !(t && r.length === t)); o = !0)
        ;
    } catch (p) {
      a = !0, d = p;
    } finally {
      try {
        !o && n.return != null && n.return();
      } finally {
        if (a)
          throw d;
      }
    }
    return r;
  }
}
function _1(e) {
  if (Array.isArray(e))
    return e;
}
function oh(e) {
  var t = ih(e), n = T1(t, 2), r = n[0], o = n[1];
  return Ul.setTwoToneColors({
    primaryColor: r,
    secondaryColor: o
  });
}
function A1() {
  var e = Ul.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var P1 = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];
function N1(e, t) {
  return M1(e) || R1(e, t) || L1(e, t) || k1();
}
function k1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function L1(e, t) {
  if (e) {
    if (typeof e == "string")
      return vf(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return vf(e, t);
  }
}
function vf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function R1(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], o = !0, a = !1, c, d;
    try {
      for (n = n.call(e); !(o = (c = n.next()).done) && (r.push(c.value), !(t && r.length === t)); o = !0)
        ;
    } catch (p) {
      a = !0, d = p;
    } finally {
      try {
        !o && n.return != null && n.return();
      } finally {
        if (a)
          throw d;
      }
    }
    return r;
  }
}
function M1(e) {
  if (Array.isArray(e))
    return e;
}
function gf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      Qs(e, o, n[o]);
    });
  }
  return e;
}
function Qs(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function I1(e, t) {
  if (e == null)
    return {};
  var n = j1(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (o = 0; o < a.length; o++)
      r = a[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function j1(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
oh("#1890ff");
var li = function(t, n) {
  var r, o = gf({}, t, n.attrs), a = o.class, c = o.icon, d = o.spin, p = o.rotate, g = o.tabindex, y = o.twoToneColor, C = o.onClick, b = I1(o, P1), E = (r = {
    anticon: !0
  }, Qs(r, "anticon-".concat(c.name), Boolean(c.name)), Qs(r, a, a), r), w = d === "" || d || c.name === "loading" ? "anticon-spin" : "", A = g;
  A === void 0 && C && (A = -1, b.tabindex = A);
  var D = p ? {
    msTransform: "rotate(".concat(p, "deg)"),
    transform: "rotate(".concat(p, "deg)")
  } : void 0, N = ih(y), I = N1(N, 2), F = I[0], J = I[1];
  return L("span", gf({
    role: "img",
    "aria-label": c.name
  }, b, {
    onClick: C,
    class: E
  }), [L(Ul, {
    class: w,
    icon: c,
    primaryColor: F,
    secondaryColor: J,
    style: D
  }, null)]);
};
li.props = {
  spin: Boolean,
  rotate: Number,
  icon: Object,
  twoToneColor: String
};
li.displayName = "AntdIcon";
li.inheritAttrs = !1;
li.getTwoToneColor = A1;
li.setTwoToneColor = oh;
const en = li;
function mf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      D1(e, o, n[o]);
    });
  }
  return e;
}
function D1(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var ql = function(t, n) {
  var r = mf({}, t, n.attrs);
  return L(en, mf({}, r, {
    icon: V0
  }), null);
};
ql.displayName = "LoadingOutlined";
ql.inheritAttrs = !1;
const Zs = ql;
var $1 = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, name: "exclamation-circle", theme: "filled" };
const F1 = $1;
function yf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      H1(e, o, n[o]);
    });
  }
  return e;
}
function H1(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var zl = function(t, n) {
  var r = yf({}, t, n.attrs);
  return L(en, yf({}, r, {
    icon: F1
  }), null);
};
zl.displayName = "ExclamationCircleFilled";
zl.inheritAttrs = !1;
const B1 = zl;
var W1 = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" } }] }, name: "close-circle", theme: "filled" };
const U1 = W1;
function bf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      q1(e, o, n[o]);
    });
  }
  return e;
}
function q1(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Yl = function(t, n) {
  var r = bf({}, t, n.attrs);
  return L(en, bf({}, r, {
    icon: U1
  }), null);
};
Yl.displayName = "CloseCircleFilled";
Yl.inheritAttrs = !1;
const z1 = Yl;
var Y1 = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" } }] }, name: "check-circle", theme: "filled" };
const X1 = Y1;
function Cf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      V1(e, o, n[o]);
    });
  }
  return e;
}
function V1(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Xl = function(t, n) {
  var r = Cf({}, t, n.attrs);
  return L(en, Cf({}, r, {
    icon: X1
  }), null);
};
Xl.displayName = "CheckCircleFilled";
Xl.inheritAttrs = !1;
const K1 = Xl;
var G1 = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, name: "info-circle", theme: "filled" };
const J1 = G1;
function xf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      Q1(e, o, n[o]);
    });
  }
  return e;
}
function Q1(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Vl = function(t, n) {
  var r = xf({}, t, n.attrs);
  return L(en, xf({}, r, {
    icon: J1
  }), null);
};
Vl.displayName = "InfoCircleFilled";
Vl.inheritAttrs = !1;
const Z1 = Vl;
var ah = 3, sh, _t, eC = 1, lh = "", uh = "move-up", ch = !1, fh = function() {
  return document.body;
}, dh, ph = !1;
function tC() {
  return eC++;
}
function nC(e) {
  e.top !== void 0 && (sh = e.top, _t = null), e.duration !== void 0 && (ah = e.duration), e.prefixCls !== void 0 && (lh = e.prefixCls), e.getContainer !== void 0 && (fh = e.getContainer, _t = null), e.transitionName !== void 0 && (uh = e.transitionName, _t = null, ch = !0), e.maxCount !== void 0 && (dh = e.maxCount, _t = null), e.rtl !== void 0 && (ph = e.rtl);
}
function rC(e, t) {
  if (_t) {
    t(_t);
    return;
  }
  Zp.newInstance({
    appContext: e.appContext,
    prefixCls: e.prefixCls || lh,
    rootPrefixCls: e.rootPrefixCls,
    transitionName: uh,
    hasTransitionName: ch,
    style: {
      top: sh
    },
    getContainer: fh || e.getPopupContainer,
    maxCount: dh,
    name: "message"
  }, function(n) {
    if (_t) {
      t(_t);
      return;
    }
    _t = n, t(n);
  });
}
var iC = {
  info: Z1,
  success: K1,
  error: z1,
  warning: B1,
  loading: Zs
};
function oC(e) {
  var t = e.duration !== void 0 ? e.duration : ah, n = e.key || tC(), r = new Promise(function(a) {
    var c = function() {
      return typeof e.onClose == "function" && e.onClose(), a(!0);
    };
    rC(e, function(d) {
      d.notice({
        key: n,
        duration: t,
        style: e.style || {},
        class: e.class,
        content: function(g) {
          var y, C = g.prefixCls, b = iC[e.type], E = b ? L(b, null, null) : "", w = Cn("".concat(C, "-custom-content"), (y = {}, Ae(y, "".concat(C, "-").concat(e.type), e.type), Ae(y, "".concat(C, "-rtl"), ph === !0), y));
          return L("div", {
            class: w
          }, [typeof e.icon == "function" ? e.icon() : e.icon || E, L("span", null, [typeof e.content == "function" ? e.content() : e.content])]);
        },
        onClose: c,
        onClick: e.onClick
      });
    });
  }), o = function() {
    _t && _t.removeNotice(n);
  };
  return o.then = function(a, c) {
    return r.then(a, c);
  }, o.promise = r, o;
}
function aC(e) {
  return Object.prototype.toString.call(e) === "[object Object]" && !!e.content;
}
var Jo = {
  open: oC,
  config: nC,
  destroy: function(t) {
    if (_t)
      if (t) {
        var n = _t, r = n.removeNotice;
        r(t);
      } else {
        var o = _t, a = o.destroy;
        a(), _t = null;
      }
  }
};
function sC(e, t) {
  e[t] = function(n, r, o) {
    return aC(n) ? e.open(G(G({}, n), {}, {
      type: t
    })) : (typeof r == "function" && (o = r, r = void 0), e.open({
      content: n,
      duration: r,
      type: t,
      onClose: o
    }));
  };
}
["success", "info", "warning", "error", "loading"].forEach(function(e) {
  return sC(Jo, e);
});
Jo.warn = Jo.warning;
const lC = Jo;
var el = {}, uC = {
  get exports() {
    return el;
  },
  set exports(e) {
    el = e;
  }
}, tl = {}, cC = {
  get exports() {
    return tl;
  },
  set exports(e) {
    tl = e;
  }
};
(function(e) {
  function t(n) {
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
      return typeof r;
    } : function(r) {
      return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(cC);
(function(e) {
  var t = tl.default;
  function n() {
    e.exports = n = function() {
      return r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports;
    var r = {}, o = Object.prototype, a = o.hasOwnProperty, c = Object.defineProperty || function(ie, U, K) {
      ie[U] = K.value;
    }, d = typeof Symbol == "function" ? Symbol : {}, p = d.iterator || "@@iterator", g = d.asyncIterator || "@@asyncIterator", y = d.toStringTag || "@@toStringTag";
    function C(ie, U, K) {
      return Object.defineProperty(ie, U, {
        value: K,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), ie[U];
    }
    try {
      C({}, "");
    } catch {
      C = function(K, se, me) {
        return K[se] = me;
      };
    }
    function b(ie, U, K, se) {
      var me = U && U.prototype instanceof A ? U : A, ve = Object.create(me.prototype), Ee = new Q(se || []);
      return c(ve, "_invoke", {
        value: X(ie, K, Ee)
      }), ve;
    }
    function E(ie, U, K) {
      try {
        return {
          type: "normal",
          arg: ie.call(U, K)
        };
      } catch (se) {
        return {
          type: "throw",
          arg: se
        };
      }
    }
    r.wrap = b;
    var w = {};
    function A() {
    }
    function D() {
    }
    function N() {
    }
    var I = {};
    C(I, p, function() {
      return this;
    });
    var F = Object.getPrototypeOf, J = F && F(F(pe([])));
    J && J !== o && a.call(J, p) && (I = J);
    var B = N.prototype = A.prototype = Object.create(I);
    function u(ie) {
      ["next", "throw", "return"].forEach(function(U) {
        C(ie, U, function(K) {
          return this._invoke(U, K);
        });
      });
    }
    function Y(ie, U) {
      function K(me, ve, Ee, $e) {
        var Ue = E(ie[me], ie, ve);
        if (Ue.type !== "throw") {
          var pt = Ue.arg, at = pt.value;
          return at && t(at) == "object" && a.call(at, "__await") ? U.resolve(at.__await).then(function(Ye) {
            K("next", Ye, Ee, $e);
          }, function(Ye) {
            K("throw", Ye, Ee, $e);
          }) : U.resolve(at).then(function(Ye) {
            pt.value = Ye, Ee(pt);
          }, function(Ye) {
            return K("throw", Ye, Ee, $e);
          });
        }
        $e(Ue.arg);
      }
      var se;
      c(this, "_invoke", {
        value: function(ve, Ee) {
          function $e() {
            return new U(function(Ue, pt) {
              K(ve, Ee, Ue, pt);
            });
          }
          return se = se ? se.then($e, $e) : $e();
        }
      });
    }
    function X(ie, U, K) {
      var se = "suspendedStart";
      return function(me, ve) {
        if (se === "executing")
          throw new Error("Generator is already running");
        if (se === "completed") {
          if (me === "throw")
            throw ve;
          return Ie();
        }
        for (K.method = me, K.arg = ve; ; ) {
          var Ee = K.delegate;
          if (Ee) {
            var $e = oe(Ee, K);
            if ($e) {
              if ($e === w)
                continue;
              return $e;
            }
          }
          if (K.method === "next")
            K.sent = K._sent = K.arg;
          else if (K.method === "throw") {
            if (se === "suspendedStart")
              throw se = "completed", K.arg;
            K.dispatchException(K.arg);
          } else
            K.method === "return" && K.abrupt("return", K.arg);
          se = "executing";
          var Ue = E(ie, U, K);
          if (Ue.type === "normal") {
            if (se = K.done ? "completed" : "suspendedYield", Ue.arg === w)
              continue;
            return {
              value: Ue.arg,
              done: K.done
            };
          }
          Ue.type === "throw" && (se = "completed", K.method = "throw", K.arg = Ue.arg);
        }
      };
    }
    function oe(ie, U) {
      var K = U.method, se = ie.iterator[K];
      if (se === void 0)
        return U.delegate = null, K === "throw" && ie.iterator.return && (U.method = "return", U.arg = void 0, oe(ie, U), U.method === "throw") || K !== "return" && (U.method = "throw", U.arg = new TypeError("The iterator does not provide a '" + K + "' method")), w;
      var me = E(se, ie.iterator, U.arg);
      if (me.type === "throw")
        return U.method = "throw", U.arg = me.arg, U.delegate = null, w;
      var ve = me.arg;
      return ve ? ve.done ? (U[ie.resultName] = ve.value, U.next = ie.nextLoc, U.method !== "return" && (U.method = "next", U.arg = void 0), U.delegate = null, w) : ve : (U.method = "throw", U.arg = new TypeError("iterator result is not an object"), U.delegate = null, w);
    }
    function fe(ie) {
      var U = {
        tryLoc: ie[0]
      };
      1 in ie && (U.catchLoc = ie[1]), 2 in ie && (U.finallyLoc = ie[2], U.afterLoc = ie[3]), this.tryEntries.push(U);
    }
    function we(ie) {
      var U = ie.completion || {};
      U.type = "normal", delete U.arg, ie.completion = U;
    }
    function Q(ie) {
      this.tryEntries = [{
        tryLoc: "root"
      }], ie.forEach(fe, this), this.reset(!0);
    }
    function pe(ie) {
      if (ie) {
        var U = ie[p];
        if (U)
          return U.call(ie);
        if (typeof ie.next == "function")
          return ie;
        if (!isNaN(ie.length)) {
          var K = -1, se = function me() {
            for (; ++K < ie.length; )
              if (a.call(ie, K))
                return me.value = ie[K], me.done = !1, me;
            return me.value = void 0, me.done = !0, me;
          };
          return se.next = se;
        }
      }
      return {
        next: Ie
      };
    }
    function Ie() {
      return {
        value: void 0,
        done: !0
      };
    }
    return D.prototype = N, c(B, "constructor", {
      value: N,
      configurable: !0
    }), c(N, "constructor", {
      value: D,
      configurable: !0
    }), D.displayName = C(N, y, "GeneratorFunction"), r.isGeneratorFunction = function(ie) {
      var U = typeof ie == "function" && ie.constructor;
      return !!U && (U === D || (U.displayName || U.name) === "GeneratorFunction");
    }, r.mark = function(ie) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(ie, N) : (ie.__proto__ = N, C(ie, y, "GeneratorFunction")), ie.prototype = Object.create(B), ie;
    }, r.awrap = function(ie) {
      return {
        __await: ie
      };
    }, u(Y.prototype), C(Y.prototype, g, function() {
      return this;
    }), r.AsyncIterator = Y, r.async = function(ie, U, K, se, me) {
      me === void 0 && (me = Promise);
      var ve = new Y(b(ie, U, K, se), me);
      return r.isGeneratorFunction(U) ? ve : ve.next().then(function(Ee) {
        return Ee.done ? Ee.value : ve.next();
      });
    }, u(B), C(B, y, "Generator"), C(B, p, function() {
      return this;
    }), C(B, "toString", function() {
      return "[object Generator]";
    }), r.keys = function(ie) {
      var U = Object(ie), K = [];
      for (var se in U)
        K.push(se);
      return K.reverse(), function me() {
        for (; K.length; ) {
          var ve = K.pop();
          if (ve in U)
            return me.value = ve, me.done = !1, me;
        }
        return me.done = !0, me;
      };
    }, r.values = pe, Q.prototype = {
      constructor: Q,
      reset: function(U) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(we), !U)
          for (var K in this)
            K.charAt(0) === "t" && a.call(this, K) && !isNaN(+K.slice(1)) && (this[K] = void 0);
      },
      stop: function() {
        this.done = !0;
        var U = this.tryEntries[0].completion;
        if (U.type === "throw")
          throw U.arg;
        return this.rval;
      },
      dispatchException: function(U) {
        if (this.done)
          throw U;
        var K = this;
        function se(pt, at) {
          return Ee.type = "throw", Ee.arg = U, K.next = pt, at && (K.method = "next", K.arg = void 0), !!at;
        }
        for (var me = this.tryEntries.length - 1; me >= 0; --me) {
          var ve = this.tryEntries[me], Ee = ve.completion;
          if (ve.tryLoc === "root")
            return se("end");
          if (ve.tryLoc <= this.prev) {
            var $e = a.call(ve, "catchLoc"), Ue = a.call(ve, "finallyLoc");
            if ($e && Ue) {
              if (this.prev < ve.catchLoc)
                return se(ve.catchLoc, !0);
              if (this.prev < ve.finallyLoc)
                return se(ve.finallyLoc);
            } else if ($e) {
              if (this.prev < ve.catchLoc)
                return se(ve.catchLoc, !0);
            } else {
              if (!Ue)
                throw new Error("try statement without catch or finally");
              if (this.prev < ve.finallyLoc)
                return se(ve.finallyLoc);
            }
          }
        }
      },
      abrupt: function(U, K) {
        for (var se = this.tryEntries.length - 1; se >= 0; --se) {
          var me = this.tryEntries[se];
          if (me.tryLoc <= this.prev && a.call(me, "finallyLoc") && this.prev < me.finallyLoc) {
            var ve = me;
            break;
          }
        }
        ve && (U === "break" || U === "continue") && ve.tryLoc <= K && K <= ve.finallyLoc && (ve = null);
        var Ee = ve ? ve.completion : {};
        return Ee.type = U, Ee.arg = K, ve ? (this.method = "next", this.next = ve.finallyLoc, w) : this.complete(Ee);
      },
      complete: function(U, K) {
        if (U.type === "throw")
          throw U.arg;
        return U.type === "break" || U.type === "continue" ? this.next = U.arg : U.type === "return" ? (this.rval = this.arg = U.arg, this.method = "return", this.next = "end") : U.type === "normal" && K && (this.next = K), w;
      },
      finish: function(U) {
        for (var K = this.tryEntries.length - 1; K >= 0; --K) {
          var se = this.tryEntries[K];
          if (se.finallyLoc === U)
            return this.complete(se.completion, se.afterLoc), we(se), w;
        }
      },
      catch: function(U) {
        for (var K = this.tryEntries.length - 1; K >= 0; --K) {
          var se = this.tryEntries[K];
          if (se.tryLoc === U) {
            var me = se.completion;
            if (me.type === "throw") {
              var ve = me.arg;
              we(se);
            }
            return ve;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(U, K, se) {
        return this.delegate = {
          iterator: pe(U),
          resultName: K,
          nextLoc: se
        }, this.method === "next" && (this.arg = void 0), w;
      }
    }, r;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(uC);
var bs = el();
try {
  regeneratorRuntime = bs;
} catch {
  typeof globalThis == "object" ? globalThis.regeneratorRuntime = bs : Function("r", "regeneratorRuntime = r")(bs);
}
var fC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" } }, { tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, name: "check-circle", theme: "outlined" };
const dC = fC;
function wf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      pC(e, o, n[o]);
    });
  }
  return e;
}
function pC(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Kl = function(t, n) {
  var r = wf({}, t, n.attrs);
  return L(en, wf({}, r, {
    icon: dC
  }), null);
};
Kl.displayName = "CheckCircleOutlined";
Kl.inheritAttrs = !1;
const hh = Kl;
var hC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attrs: { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" } }] }, name: "info-circle", theme: "outlined" };
const vC = hC;
function Tf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      gC(e, o, n[o]);
    });
  }
  return e;
}
function gC(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Gl = function(t, n) {
  var r = Tf({}, t, n.attrs);
  return L(en, Tf({}, r, {
    icon: vC
  }), null);
};
Gl.displayName = "InfoCircleOutlined";
Gl.inheritAttrs = !1;
const vh = Gl;
var mC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" } }, { tag: "path", attrs: { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, name: "close-circle", theme: "outlined" };
const yC = mC;
function Ef(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      bC(e, o, n[o]);
    });
  }
  return e;
}
function bC(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Jl = function(t, n) {
  var r = Ef({}, t, n.attrs);
  return L(en, Ef({}, r, {
    icon: yC
  }), null);
};
Jl.displayName = "CloseCircleOutlined";
Jl.inheritAttrs = !1;
const gh = Jl;
var CC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attrs: { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" } }] }, name: "exclamation-circle", theme: "outlined" };
const xC = CC;
function Sf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      wC(e, o, n[o]);
    });
  }
  return e;
}
function wC(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Ql = function(t, n) {
  var r = Sf({}, t, n.attrs);
  return L(en, Sf({}, r, {
    icon: xC
  }), null);
};
Ql.displayName = "ExclamationCircleOutlined";
Ql.inheritAttrs = !1;
const Zl = Ql;
var TC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" } }] }, name: "close", theme: "outlined" };
const EC = TC;
function Of(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      SC(e, o, n[o]);
    });
  }
  return e;
}
function SC(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var eu = function(t, n) {
  var r = Of({}, t, n.attrs);
  return L(en, Of({}, r, {
    icon: EC
  }), null);
};
eu.displayName = "CloseOutlined";
eu.inheritAttrs = !1;
const mh = eu;
var mr = {}, yh = 4.5, bh = "24px", Ch = "24px", nl = "", xh = "topRight", wh = function() {
  return document.body;
}, Th = null, rl = !1, Eh;
function OC(e) {
  var t = e.duration, n = e.placement, r = e.bottom, o = e.top, a = e.getContainer, c = e.closeIcon, d = e.prefixCls;
  d !== void 0 && (nl = d), t !== void 0 && (yh = t), n !== void 0 && (xh = n), r !== void 0 && (Ch = typeof r == "number" ? "".concat(r, "px") : r), o !== void 0 && (bh = typeof o == "number" ? "".concat(o, "px") : o), a !== void 0 && (wh = a), c !== void 0 && (Th = c), e.rtl !== void 0 && (rl = e.rtl), e.maxCount !== void 0 && (Eh = e.maxCount);
}
function _C(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bh, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ch, r;
  switch (e) {
    case "topLeft":
      r = {
        left: "0px",
        top: t,
        bottom: "auto"
      };
      break;
    case "topRight":
      r = {
        right: "0px",
        top: t,
        bottom: "auto"
      };
      break;
    case "bottomLeft":
      r = {
        left: "0px",
        top: "auto",
        bottom: n
      };
      break;
    default:
      r = {
        right: "0px",
        top: "auto",
        bottom: n
      };
      break;
  }
  return r;
}
function AC(e, t) {
  var n = e.prefixCls, r = e.placement, o = r === void 0 ? xh : r, a = e.getContainer, c = a === void 0 ? wh : a, d = e.top, p = e.bottom, g = e.closeIcon, y = g === void 0 ? Th : g, C = e.appContext, b = UC(), E = b.getPrefixCls, w = E("notification", n || nl), A = "".concat(w, "-").concat(o, "-").concat(rl), D = mr[A];
  if (D) {
    Promise.resolve(D).then(function(I) {
      t(I);
    });
    return;
  }
  var N = Cn("".concat(w, "-").concat(o), Ae({}, "".concat(w, "-rtl"), rl === !0));
  Zp.newInstance({
    name: "notification",
    prefixCls: n || nl,
    class: N,
    style: _C(o, d, p),
    appContext: C,
    getContainer: c,
    closeIcon: function(F) {
      var J = F.prefixCls, B = L("span", {
        class: "".concat(J, "-close-x")
      }, [Oi(y, {}, L(mh, {
        class: "".concat(J, "-close-icon")
      }, null))]);
      return B;
    },
    maxCount: Eh,
    hasTransitionName: !0
  }, function(I) {
    mr[A] = I, t(I);
  });
}
var PC = {
  success: hh,
  info: vh,
  error: gh,
  warning: Zl
};
function NC(e) {
  var t = e.icon, n = e.type, r = e.description, o = e.message, a = e.btn, c = e.duration === void 0 ? yh : e.duration;
  AC(e, function(d) {
    d.notice({
      content: function(g) {
        var y = g.prefixCls, C = "".concat(y, "-notice"), b = null;
        if (t)
          b = function() {
            return L("span", {
              class: "".concat(C, "-icon")
            }, [Oi(t)]);
          };
        else if (n) {
          var E = PC[n];
          b = function() {
            return L(E, {
              class: "".concat(C, "-icon ").concat(C, "-icon-").concat(n)
            }, null);
          };
        }
        return L("div", {
          class: b ? "".concat(C, "-with-icon") : ""
        }, [b && b(), L("div", {
          class: "".concat(C, "-message")
        }, [!r && b ? L("span", {
          class: "".concat(C, "-message-single-line-auto-margin")
        }, null) : null, Oi(o)]), L("div", {
          class: "".concat(C, "-description")
        }, [Oi(r)]), a ? L("span", {
          class: "".concat(C, "-btn")
        }, [Oi(a)]) : null]);
      },
      duration: c,
      closable: !0,
      onClose: e.onClose,
      onClick: e.onClick,
      key: e.key,
      style: e.style || {},
      class: e.class
    });
  });
}
var Yi = {
  open: NC,
  close: function(t) {
    Object.keys(mr).forEach(function(n) {
      return Promise.resolve(mr[n]).then(function(r) {
        r.removeNotice(t);
      });
    });
  },
  config: OC,
  destroy: function() {
    Object.keys(mr).forEach(function(t) {
      Promise.resolve(mr[t]).then(function(n) {
        n.destroy();
      }), delete mr[t];
    });
  }
}, kC = ["success", "info", "warning", "error"];
kC.forEach(function(e) {
  Yi[e] = function(t) {
    return Yi.open(G(G({}, t), {}, {
      type: e
    }));
  };
});
Yi.warn = Yi.warning;
const LC = Yi;
function ma() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var RC = "vc-util-key";
function Sh() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : RC;
}
function tu(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function _f(e) {
  var t, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ma())
    return null;
  var r = document.createElement("style");
  if ((t = n.csp) !== null && t !== void 0 && t.nonce) {
    var o;
    r.nonce = (o = n.csp) === null || o === void 0 ? void 0 : o.nonce;
  }
  r.innerHTML = e;
  var a = tu(n), c = a.firstChild;
  return n.prepend && a.prepend ? a.prepend(r) : n.prepend && c ? a.insertBefore(r, c) : a.appendChild(r), r;
}
var il = /* @__PURE__ */ new Map();
function MC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = tu(t);
  return Array.from(il.get(n).children).find(function(r) {
    return r.tagName === "STYLE" && r.getAttribute(Sh(t)) === e;
  });
}
function IC(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = tu(n);
  if (!il.has(r)) {
    var o = _f("", n), a = o.parentNode;
    il.set(r, a), a.removeChild(o);
  }
  var c = MC(t, n);
  if (c) {
    var d, p;
    if ((d = n.csp) !== null && d !== void 0 && d.nonce && c.nonce !== ((p = n.csp) === null || p === void 0 ? void 0 : p.nonce)) {
      var g;
      c.nonce = (g = n.csp) === null || g === void 0 ? void 0 : g.nonce;
    }
    return c.innerHTML !== e && (c.innerHTML = e), c;
  }
  var y = _f(e, n);
  return y.setAttribute(Sh(n), t), y;
}
const Oh = function(e, t, n) {
  Jp(e, "[ant-design-vue: ".concat(t, "] ").concat(n));
};
var jC = "-ant-".concat(Date.now(), "-").concat(Math.random());
function DC(e, t) {
  var n = {}, r = function(y, C) {
    var b = y.clone();
    return b = (C == null ? void 0 : C(b)) || b, b.toRgbString();
  }, o = function(y, C) {
    var b = new vs(y), E = zi(b.toRgbString());
    n["".concat(C, "-color")] = r(b), n["".concat(C, "-color-disabled")] = E[1], n["".concat(C, "-color-hover")] = E[4], n["".concat(C, "-color-active")] = E[6], n["".concat(C, "-color-outline")] = b.clone().setAlpha(0.2).toRgbString(), n["".concat(C, "-color-deprecated-bg")] = E[1], n["".concat(C, "-color-deprecated-border")] = E[3];
  };
  if (t.primaryColor) {
    o(t.primaryColor, "primary");
    var a = new vs(t.primaryColor), c = zi(a.toRgbString());
    c.forEach(function(g, y) {
      n["primary-".concat(y + 1)] = g;
    }), n["primary-color-deprecated-l-35"] = r(a, function(g) {
      return g.lighten(35);
    }), n["primary-color-deprecated-l-20"] = r(a, function(g) {
      return g.lighten(20);
    }), n["primary-color-deprecated-t-20"] = r(a, function(g) {
      return g.tint(20);
    }), n["primary-color-deprecated-t-50"] = r(a, function(g) {
      return g.tint(50);
    }), n["primary-color-deprecated-f-12"] = r(a, function(g) {
      return g.setAlpha(g.getAlpha() * 0.12);
    });
    var d = new vs(c[0]);
    n["primary-color-active-deprecated-f-30"] = r(d, function(g) {
      return g.setAlpha(g.getAlpha() * 0.3);
    }), n["primary-color-active-deprecated-d-02"] = r(d, function(g) {
      return g.darken(2);
    });
  }
  t.successColor && o(t.successColor, "success"), t.warningColor && o(t.warningColor, "warning"), t.errorColor && o(t.errorColor, "error"), t.infoColor && o(t.infoColor, "info");
  var p = Object.keys(n).map(function(g) {
    return "--".concat(e, "-").concat(g, ": ").concat(n[g], ";");
  });
  ma() ? IC(`
  :root {
    `.concat(p.join(`
`), `
  }
  `), "".concat(jC, "-dynamic-theme")) : Oh(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
var $C = Symbol("GlobalFormContextKey"), FC = function(t) {
  Xi($C, t);
}, HC = function() {
  return {
    getTargetContainer: {
      type: Function
    },
    getPopupContainer: {
      type: Function
    },
    prefixCls: String,
    getPrefixCls: {
      type: Function
    },
    renderEmpty: {
      type: Function
    },
    transformCellText: {
      type: Function
    },
    csp: {
      type: Object,
      default: void 0
    },
    input: {
      type: Object
    },
    autoInsertSpaceInButton: {
      type: Boolean,
      default: void 0
    },
    locale: {
      type: Object,
      default: void 0
    },
    pageHeader: {
      type: Object
    },
    componentSize: {
      type: String
    },
    direction: {
      type: String
    },
    space: {
      type: Object
    },
    virtual: {
      type: Boolean,
      default: void 0
    },
    dropdownMatchSelectWidth: {
      type: [Number, Boolean],
      default: !0
    },
    form: {
      type: Object,
      default: void 0
    },
    // internal use
    notUpdateGlobalConfig: Boolean
  };
}, BC = "ant";
function qr() {
  return Rt.prefixCls || BC;
}
var ol = cn({}), _h = cn({}), Rt = cn({});
Vi(function() {
  Mn(Rt, ol, _h), Rt.prefixCls = qr(), Rt.getPrefixCls = function(e, t) {
    return t || (e ? "".concat(Rt.prefixCls, "-").concat(e) : Rt.prefixCls);
  }, Rt.getRootPrefixCls = function(e, t) {
    return e || (Rt.prefixCls ? Rt.prefixCls : t && t.includes("-") ? t.replace(/^(.*)-[^-]*$/, "$1") : qr());
  };
});
var Cs, WC = function(t) {
  Cs && Cs(), Cs = Vi(function() {
    Mn(_h, cn(t)), Mn(Rt, cn(t));
  }), t.theme && DC(qr(), t.theme);
}, UC = function() {
  return {
    getPrefixCls: function(n, r) {
      return r || (n ? "".concat(qr(), "-").concat(n) : qr());
    },
    getRootPrefixCls: function(n, r) {
      return n || (Rt.prefixCls ? Rt.prefixCls : r && r.includes("-") ? r.replace(/^(.*)-[^-]*$/, "$1") : qr());
    }
  };
}, zr = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "AConfigProvider",
  inheritAttrs: !1,
  props: HC(),
  setup: function(t, n) {
    var r = n.slots, o = function(C, b) {
      var E = t.prefixCls, w = E === void 0 ? "ant" : E;
      return b || (C ? "".concat(w, "-").concat(C) : w);
    }, a = function(C) {
      var b = t.renderEmpty || r.renderEmpty || Gp;
      return b(C);
    }, c = function(C, b) {
      var E = t.prefixCls;
      if (b)
        return b;
      var w = E || o("");
      return C ? "".concat(w, "-").concat(C) : w;
    }, d = cn(G(G({}, t), {}, {
      getPrefixCls: c,
      renderEmpty: a
    }));
    Object.keys(t).forEach(function(y) {
      Ut(function() {
        return t[y];
      }, function() {
        d[y] = t[y];
      });
    }), t.notUpdateGlobalConfig || (Mn(ol, d), Ut(d, function() {
      Mn(ol, d);
    }));
    var p = Me(function() {
      var y = {};
      if (t.locale) {
        var C, b;
        y = ((C = t.locale.Form) === null || C === void 0 ? void 0 : C.defaultValidateMessages) || ((b = Vo.Form) === null || b === void 0 ? void 0 : b.defaultValidateMessages) || {};
      }
      return t.form && t.form.validateMessages && (y = G(G({}, y), t.form.validateMessages)), y;
    });
    FC({
      validateMessages: p
    }), Xi("configProvider", d);
    var g = function(C) {
      var b;
      return L(W0, {
        locale: t.locale || C,
        ANT_MARK__: Ys
      }, {
        default: function() {
          return [(b = r.default) === null || b === void 0 ? void 0 : b.call(r)];
        }
      });
    };
    return Vi(function() {
      t.direction && (lC.config({
        rtl: t.direction === "rtl"
      }), LC.config({
        rtl: t.direction === "rtl"
      }));
    }), function() {
      return L(Ip, {
        children: function(C, b, E) {
          return g(E);
        }
      }, null);
    };
  }
}), Ah = cn({
  getPrefixCls: function(t, n) {
    return n || (t ? "ant-".concat(t) : "ant");
  },
  renderEmpty: Gp,
  direction: "ltr"
});
zr.config = WC;
zr.install = function(e) {
  e.component(zr.name, zr);
};
const wn = function(e, t) {
  var n = kn("configProvider", Ah), r = Me(function() {
    return n.getPrefixCls(e, t.prefixCls);
  }), o = Me(function() {
    var I;
    return (I = t.direction) !== null && I !== void 0 ? I : n.direction;
  }), a = Me(function() {
    return n.getPrefixCls();
  }), c = Me(function() {
    return n.autoInsertSpaceInButton;
  }), d = Me(function() {
    return n.renderEmpty;
  }), p = Me(function() {
    return n.space;
  }), g = Me(function() {
    return n.pageHeader;
  }), y = Me(function() {
    return n.form;
  }), C = Me(function() {
    return t.getTargetContainer || n.getTargetContainer;
  }), b = Me(function() {
    return t.getPopupContainer || n.getPopupContainer;
  }), E = Me(function() {
    var I;
    return (I = t.dropdownMatchSelectWidth) !== null && I !== void 0 ? I : n.dropdownMatchSelectWidth;
  }), w = Me(function() {
    return (t.virtual === void 0 ? n.virtual !== !1 : t.virtual !== !1) && E.value !== !1;
  }), A = Me(function() {
    return t.size || n.componentSize;
  }), D = Me(function() {
    var I;
    return t.autocomplete || ((I = n.input) === null || I === void 0 ? void 0 : I.autocomplete);
  }), N = Me(function() {
    return n.csp;
  });
  return {
    configProvider: n,
    prefixCls: r,
    direction: o,
    size: A,
    getTargetContainer: C,
    getPopupContainer: b,
    space: p,
    pageHeader: g,
    form: y,
    autoInsertSpaceInButton: c,
    renderEmpty: d,
    virtual: w,
    dropdownMatchSelectWidth: E,
    rootPrefixCls: a,
    getPrefixCls: n.getPrefixCls,
    autocomplete: D,
    csp: N
  };
};
function Ph(e, t) {
  for (var n = Mn({}, e), r = 0; r < t.length; r += 1) {
    var o = t[r];
    delete n[o];
  }
  return n;
}
function qC(e, t) {
  return e ? e.contains(t) : !1;
}
function al(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Nh = Symbol("PortalContextKey"), kh = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    inTriggerContext: !0
  };
  Xi(Nh, {
    inTriggerContext: n.inTriggerContext,
    shouldRender: Me(function() {
      var r = t || {}, o = r.sPopupVisible, a = r.popupRef, c = r.forceRender, d = r.autoDestroy, p = !1;
      return (o || a || c) && (p = !0), !o && d && (p = !1), p;
    })
  });
}, zC = function() {
  kh({}, {
    inTriggerContext: !1
  });
  var t = kn(Nh, {
    shouldRender: Me(function() {
      return !1;
    }),
    inTriggerContext: !1
  });
  return {
    shouldRender: Me(function() {
      return t.shouldRender.value || t.inTriggerContext === !1;
    })
  };
};
const YC = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "Portal",
  inheritAttrs: !1,
  props: {
    getContainer: Je.func.isRequired,
    didUpdate: Function
  },
  setup: function(t, n) {
    var r = n.slots, o = !0, a, c = zC(), d = c.shouldRender;
    Id(function() {
      o = !1, d.value && (a = t.getContainer());
    });
    var p = Ut(d, function() {
      d.value && !a && (a = t.getContainer()), a && p();
    });
    return Ki(function() {
      jn(function() {
        if (d.value) {
          var g;
          (g = t.didUpdate) === null || g === void 0 || g.call(t, t);
        }
      });
    }), $n(function() {
      a && a.parentNode && a.parentNode.removeChild(a);
    }), function() {
      if (!d.value)
        return null;
      if (o) {
        var g;
        return (g = r.default) === null || g === void 0 ? void 0 : g.call(r);
      }
      return a ? L(qd, {
        to: a
      }, r) : null;
    };
  }
});
var Pe = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  /**
   * END
   */
  END: 35,
  /**
   * HOME
   */
  HOME: 36,
  /**
   * LEFT
   */
  LEFT: 37,
  /**
   * UP
   */
  UP: 38,
  /**
   * RIGHT
   */
  RIGHT: 39,
  /**
   * DOWN
   */
  DOWN: 40,
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45,
  /**
   * DELETE
   */
  DELETE: 46,
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91,
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  /**
   * DASH
   */
  DASH: 189,
  /**
   * EQUALS
   */
  EQUALS: 187,
  /**
   * COMMA
   */
  COMMA: 188,
  /**
   * PERIOD
   */
  PERIOD: 190,
  /**
   * SLASH
   */
  SLASH: 191,
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,
  /**
   * BACKSLASH
   */
  BACKSLASH: 220,
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,
  /**
   * WIN_IME
   */
  WIN_IME: 229,
  // ======================== Function ========================
  /**
   * whether text and modified key is entered at the same time.
   */
  isTextModifyingKeyEvent: function(t) {
    var n = t.keyCode;
    if (t.altKey && !t.ctrlKey || t.metaKey || // Function keys don't generate text
    n >= Pe.F1 && n <= Pe.F12)
      return !1;
    switch (n) {
      case Pe.ALT:
      case Pe.CAPS_LOCK:
      case Pe.CONTEXT_MENU:
      case Pe.CTRL:
      case Pe.DOWN:
      case Pe.END:
      case Pe.ESC:
      case Pe.HOME:
      case Pe.INSERT:
      case Pe.LEFT:
      case Pe.MAC_FF_META:
      case Pe.META:
      case Pe.NUMLOCK:
      case Pe.NUM_CENTER:
      case Pe.PAGE_DOWN:
      case Pe.PAGE_UP:
      case Pe.PAUSE:
      case Pe.PRINT_SCREEN:
      case Pe.RIGHT:
      case Pe.SHIFT:
      case Pe.UP:
      case Pe.WIN_KEY:
      case Pe.WIN_KEY_RIGHT:
        return !1;
      default:
        return !0;
    }
  },
  /**
   * whether character is entered.
   */
  isCharacterKey: function(t) {
    if (t >= Pe.ZERO && t <= Pe.NINE || t >= Pe.NUM_ZERO && t <= Pe.NUM_MULTIPLY || t >= Pe.A && t <= Pe.Z || window.navigator.userAgent.indexOf("WebKit") !== -1 && t === 0)
      return !0;
    switch (t) {
      case Pe.SPACE:
      case Pe.QUESTION_MARK:
      case Pe.NUM_PLUS:
      case Pe.NUM_MINUS:
      case Pe.NUM_PERIOD:
      case Pe.NUM_DIVISION:
      case Pe.SEMICOLON:
      case Pe.DASH:
      case Pe.EQUALS:
      case Pe.COMMA:
      case Pe.PERIOD:
      case Pe.SLASH:
      case Pe.APOSTROPHE:
      case Pe.SINGLE_QUOTE:
      case Pe.OPEN_SQUARE_BRACKET:
      case Pe.BACKSLASH:
      case Pe.CLOSE_SQUARE_BRACKET:
        return !0;
      default:
        return !1;
    }
  }
};
const Af = Pe;
var XC = `accept acceptcharset accesskey action allowfullscreen allowtransparency
alt async autocomplete autofocus autoplay capture cellpadding cellspacing challenge
charset checked classid classname colspan cols content contenteditable contextmenu
controls coords crossorigin data datetime default defer dir disabled download draggable
enctype form formaction formenctype formmethod formnovalidate formtarget frameborder
headers height hidden high href hreflang htmlfor for httpequiv icon id inputmode integrity
is keyparams keytype kind label lang list loop low manifest marginheight marginwidth max maxlength media
mediagroup method min minlength multiple muted name novalidate nonce open
optimum pattern placeholder poster preload radiogroup readonly rel required
reversed role rowspan rows sandbox scope scoped scrolling seamless selected
shape size sizes span spellcheck src srcdoc srclang srcset start step style
summary tabindex target title type usemap value width wmode wrap`, VC = `onCopy onCut onPaste onCompositionend onCompositionstart onCompositionupdate onKeydown
    onKeypress onKeyup onFocus onBlur onChange onInput onSubmit onClick onContextmenu onDoubleclick onDblclick
    onDrag onDragend onDragenter onDragexit onDragleave onDragover onDragstart onDrop onMousedown
    onMouseenter onMouseleave onMousemove onMouseout onMouseover onMouseup onSelect onTouchcancel
    onTouchend onTouchmove onTouchstart onTouchstartPassive onTouchmovePassive onScroll onWheel onAbort onCanplay onCanplaythrough
    onDurationchange onEmptied onEncrypted onEnded onError onLoadeddata onLoadedmetadata
    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError`, Pf = "".concat(XC, " ").concat(VC).split(/[\s\n]+/), KC = "aria-", GC = "data-";
function Nf(e, t) {
  return e.indexOf(t) === 0;
}
function JC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n;
  t === !1 ? n = {
    aria: !0,
    data: !0,
    attr: !0
  } : t === !0 ? n = {
    aria: !0
  } : n = G({}, t);
  var r = {};
  return Object.keys(e).forEach(function(o) {
    // Aria
    (n.aria && (o === "role" || Nf(o, KC)) || // Data
    n.data && Nf(o, GC) || // Attr
    n.attr && (Pf.includes(o) || Pf.includes(o.toLowerCase()))) && (r[o] = e[o]);
  }), r;
}
var xs = {
  transitionstart: {
    transition: "transitionstart",
    WebkitTransition: "webkitTransitionStart",
    MozTransition: "mozTransitionStart",
    OTransition: "oTransitionStart",
    msTransition: "MSTransitionStart"
  },
  animationstart: {
    animation: "animationstart",
    WebkitAnimation: "webkitAnimationStart",
    MozAnimation: "mozAnimationStart",
    OAnimation: "oAnimationStart",
    msAnimation: "MSAnimationStart"
  }
}, ws = {
  transitionend: {
    transition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "mozTransitionEnd",
    OTransition: "oTransitionEnd",
    msTransition: "MSTransitionEnd"
  },
  animationend: {
    animation: "animationend",
    WebkitAnimation: "webkitAnimationEnd",
    MozAnimation: "mozAnimationEnd",
    OAnimation: "oAnimationEnd",
    msAnimation: "MSAnimationEnd"
  }
}, jr = [], Dr = [];
function QC() {
  var e = document.createElement("div"), t = e.style;
  "AnimationEvent" in window || (delete xs.animationstart.animation, delete ws.animationend.animation), "TransitionEvent" in window || (delete xs.transitionstart.transition, delete ws.transitionend.transition);
  function n(r, o) {
    for (var a in r)
      if (r.hasOwnProperty(a)) {
        var c = r[a];
        for (var d in c)
          if (d in t) {
            o.push(c[d]);
            break;
          }
      }
  }
  n(xs, jr), n(ws, Dr);
}
typeof window < "u" && typeof document < "u" && QC();
function kf(e, t, n) {
  e.addEventListener(t, n, !1);
}
function Lf(e, t, n) {
  e.removeEventListener(t, n, !1);
}
var ZC = {
  // Start events
  startEvents: jr,
  addStartEventListener: function(t, n) {
    if (jr.length === 0) {
      setTimeout(n, 0);
      return;
    }
    jr.forEach(function(r) {
      kf(t, r, n);
    });
  },
  removeStartEventListener: function(t, n) {
    jr.length !== 0 && jr.forEach(function(r) {
      Lf(t, r, n);
    });
  },
  // End events
  endEvents: Dr,
  addEndEventListener: function(t, n) {
    if (Dr.length === 0) {
      setTimeout(n, 0);
      return;
    }
    Dr.forEach(function(r) {
      kf(t, r, n);
    });
  },
  removeEndEventListener: function(t, n) {
    Dr.length !== 0 && Dr.forEach(function(r) {
      Lf(t, r, n);
    });
  }
};
const Eo = ZC;
var zn;
function Rf(e) {
  return !e || e.offsetParent === null;
}
function ex(e) {
  var t = (e || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
  return t && t[1] && t[2] && t[3] ? !(t[1] === t[2] && t[2] === t[3]) : !0;
}
const tx = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "Wave",
  props: {
    insertExtraNode: Boolean,
    disabled: Boolean
  },
  setup: function(t, n) {
    var r = n.slots, o = n.expose, a = la(), c = wn("", t), d = c.csp, p = c.prefixCls;
    o({
      csp: d
    });
    var g = null, y = null, C = null, b = !1, E = null, w = !1, A = function(u) {
      if (!w) {
        var Y = zc(a);
        !u || u.target !== Y || b || F(Y);
      }
    }, D = function(u) {
      !u || u.animationName !== "fadeEffect" || F(u.target);
    }, N = function() {
      var u = t.insertExtraNode;
      return u ? "".concat(p.value, "-click-animating") : "".concat(p.value, "-click-animating-without-extra-node");
    }, I = function(u, Y) {
      var X = t.insertExtraNode, oe = t.disabled;
      if (!(oe || !u || Rf(u) || u.className.indexOf("-leave") >= 0)) {
        E = document.createElement("div"), E.className = "".concat(p.value, "-click-animating-node");
        var fe = N();
        if (u.removeAttribute(fe), u.setAttribute(fe, "true"), zn = zn || document.createElement("style"), Y && Y !== "#ffffff" && Y !== "rgb(255, 255, 255)" && ex(Y) && !/rgba\(\d*, \d*, \d*, 0\)/.test(Y) && // any transparent rgba color
        Y !== "transparent") {
          var we;
          (we = d.value) !== null && we !== void 0 && we.nonce && (zn.nonce = d.value.nonce), E.style.borderColor = Y, zn.innerHTML = `
        [`.concat(p.value, "-click-animating-without-extra-node='true']::after, .").concat(p.value, `-click-animating-node {
          --antd-wave-shadow-color: `).concat(Y, `;
        }`), document.body.contains(zn) || document.body.appendChild(zn);
        }
        X && u.appendChild(E), Eo.addStartEventListener(u, A), Eo.addEndEventListener(u, D);
      }
    }, F = function(u) {
      if (!(!u || u === E || !(u instanceof Element))) {
        var Y = t.insertExtraNode, X = N();
        u.setAttribute(X, "false"), zn && (zn.innerHTML = ""), Y && E && u.contains(E) && u.removeChild(E), Eo.removeStartEventListener(u, A), Eo.removeEndEventListener(u, D);
      }
    }, J = function(u) {
      if (!(!u || !u.getAttribute || u.getAttribute("disabled") || u.className.indexOf("disabled") >= 0)) {
        var Y = function(oe) {
          if (!(oe.target.tagName === "INPUT" || Rf(oe.target))) {
            F(u);
            var fe = getComputedStyle(u).getPropertyValue("border-top-color") || // Firefox Compatible
            getComputedStyle(u).getPropertyValue("border-color") || getComputedStyle(u).getPropertyValue("background-color");
            y = setTimeout(function() {
              return I(u, fe);
            }, 0), Ui.cancel(C), b = !0, C = Ui(function() {
              b = !1;
            }, 10);
          }
        };
        return u.addEventListener("click", Y, !0), {
          cancel: function() {
            u.removeEventListener("click", Y, !0);
          }
        };
      }
    };
    return Zt(function() {
      jn(function() {
        var B = zc(a);
        B.nodeType === 1 && (g = J(B));
      });
    }), $n(function() {
      g && g.cancel(), clearTimeout(y), w = !0;
    }), function() {
      var B;
      return (B = r.default) === null || B === void 0 ? void 0 : B.call(r)[0];
    };
  }
});
function Lh(e) {
  return e === "danger" ? {
    danger: !0
  } : {
    type: e
  };
}
var nx = function() {
  return {
    prefixCls: String,
    type: String,
    htmlType: {
      type: String,
      default: "button"
    },
    shape: {
      type: String
    },
    size: {
      type: String
    },
    loading: {
      type: [Boolean, Object],
      default: function() {
        return !1;
      }
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    ghost: {
      type: Boolean,
      default: void 0
    },
    block: {
      type: Boolean,
      default: void 0
    },
    danger: {
      type: Boolean,
      default: void 0
    },
    icon: Je.any,
    href: String,
    target: String,
    title: String,
    onClick: {
      type: Function
    },
    onMousedown: {
      type: Function
    }
  };
};
const rx = nx;
var Mf = function(t) {
  t && (t.style.width = "0px", t.style.opacity = "0", t.style.transform = "scale(0)");
}, If = function(t) {
  jn(function() {
    t && (t.style.width = "".concat(t.scrollWidth, "px"), t.style.opacity = "1", t.style.transform = "scale(1)");
  });
}, jf = function(t) {
  t && t.style && (t.style.width = null, t.style.opacity = null, t.style.transform = null);
};
const ix = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "LoadingIcon",
  props: {
    prefixCls: String,
    loading: [Boolean, Object],
    existIcon: Boolean
  },
  setup: function(t) {
    return function() {
      var n = t.existIcon, r = t.prefixCls, o = t.loading;
      if (n)
        return L("span", {
          class: "".concat(r, "-loading-icon")
        }, [L(Zs, null, null)]);
      var a = !!o;
      return L(Gi, {
        name: "".concat(r, "-loading-icon-motion"),
        onBeforeEnter: Mf,
        onEnter: If,
        onAfterEnter: jf,
        onBeforeLeave: If,
        onLeave: function(d) {
          setTimeout(function() {
            Mf(d);
          });
        },
        onAfterLeave: jf
      }, {
        default: function() {
          return [a ? L("span", {
            class: "".concat(r, "-loading-icon")
          }, [L(Zs, null, null)]) : null];
        }
      });
    };
  }
});
var Df = /^[\u4e00-\u9fa5]{2}$/, $f = Df.test.bind(Df);
function So(e) {
  return e === "text" || e === "link";
}
const Ln = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "AButton",
  inheritAttrs: !1,
  __ANT_BUTTON: !0,
  props: Ji(rx(), {
    type: "default"
  }),
  slots: ["icon"],
  // emits: ['click', 'mousedown'],
  setup: function(t, n) {
    var r = n.slots, o = n.attrs, a = n.emit, c = wn("btn", t), d = c.prefixCls, p = c.autoInsertSpaceInButton, g = c.direction, y = c.size, C = Fe(null), b = Fe(void 0), E = !1, w = Fe(!1), A = Fe(!1), D = Me(function() {
      return p.value !== !1;
    }), N = Me(function() {
      return tr(t.loading) === "object" && t.loading.delay ? t.loading.delay || !0 : !!t.loading;
    });
    Ut(N, function(u) {
      clearTimeout(b.value), typeof N.value == "number" ? b.value = setTimeout(function() {
        w.value = u;
      }, N.value) : w.value = u;
    }, {
      immediate: !0
    });
    var I = Me(function() {
      var u, Y = t.type, X = t.shape, oe = X === void 0 ? "default" : X, fe = t.ghost, we = t.block, Q = t.danger, pe = d.value, Ie = {
        large: "lg",
        small: "sm",
        middle: void 0
      }, ie = y.value, U = ie && Ie[ie] || "";
      return u = {}, Ae(u, "".concat(pe), !0), Ae(u, "".concat(pe, "-").concat(Y), Y), Ae(u, "".concat(pe, "-").concat(oe), oe !== "default" && oe), Ae(u, "".concat(pe, "-").concat(U), U), Ae(u, "".concat(pe, "-loading"), w.value), Ae(u, "".concat(pe, "-background-ghost"), fe && !So(Y)), Ae(u, "".concat(pe, "-two-chinese-chars"), A.value && D.value), Ae(u, "".concat(pe, "-block"), we), Ae(u, "".concat(pe, "-dangerous"), !!Q), Ae(u, "".concat(pe, "-rtl"), g.value === "rtl"), u;
    }), F = function() {
      var Y = C.value;
      if (!(!Y || p.value === !1)) {
        var X = Y.textContent;
        E && $f(X) ? A.value || (A.value = !0) : A.value && (A.value = !1);
      }
    }, J = function(Y) {
      if (w.value || t.disabled) {
        Y.preventDefault();
        return;
      }
      a("click", Y);
    }, B = function(Y, X) {
      var oe = X ? " " : "";
      if (Y.type === ii) {
        var fe = Y.children.trim();
        return $f(fe) && (fe = fe.split("").join(oe)), L("span", null, [fe]);
      }
      return Y;
    };
    return Vi(function() {
      Oh(!(t.ghost && So(t.type)), "Button", "`link` or `text` button can't be a `ghost` button.");
    }), Zt(F), Ki(F), $n(function() {
      b.value && clearTimeout(b.value);
    }), function() {
      var u, Y, X = t.icon, oe = X === void 0 ? (u = r.icon) === null || u === void 0 ? void 0 : u.call(r) : X, fe = wr((Y = r.default) === null || Y === void 0 ? void 0 : Y.call(r));
      E = fe.length === 1 && !oe && !So(t.type);
      var we = t.type, Q = t.htmlType, pe = t.disabled, Ie = t.href, ie = t.title, U = t.target, K = t.onMousedown, se = w.value ? "loading" : oe, me = G(G({}, o), {}, {
        title: ie,
        disabled: pe,
        class: [I.value, o.class, Ae({}, "".concat(d.value, "-icon-only"), fe.length === 0 && !!se)],
        onClick: J,
        onMousedown: K
      });
      pe || delete me.disabled;
      var ve = oe && !w.value ? oe : L(ix, {
        existIcon: !!oe,
        prefixCls: d.value,
        loading: !!w.value
      }, null), Ee = fe.map(function(Ue) {
        return B(Ue, E && D.value);
      });
      if (Ie !== void 0)
        return L("a", G(G({}, me), {}, {
          href: Ie,
          target: U,
          ref: C
        }), [ve, Ee]);
      var $e = L("button", G(G({}, me), {}, {
        ref: C,
        type: Q
      }), [ve, Ee]);
      return So(we) ? $e : L(tx, {
        ref: "wave",
        disabled: !!w.value
      }, {
        default: function() {
          return [$e];
        }
      });
    };
  }
});
function Ff(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Sp(r.key), r);
  }
}
function Rh(e, t, n) {
  return t && Ff(e.prototype, t), n && Ff(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function Mh(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
var ox = /* @__PURE__ */ Rh(function e(t) {
  Mh(this, e), this.error = new Error("unreachable case: ".concat(JSON.stringify(t)));
}), ax = function() {
  return {
    prefixCls: String,
    size: {
      type: String
    }
  };
};
const sl = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "AButtonGroup",
  props: ax(),
  setup: function(t, n) {
    var r = n.slots, o = wn("btn-group", t), a = o.prefixCls, c = o.direction, d = Me(function() {
      var p, g = t.size, y = "";
      switch (g) {
        case "large":
          y = "lg";
          break;
        case "small":
          y = "sm";
          break;
        case "middle":
        case void 0:
          break;
        default:
          console.warn(new ox(g).error);
      }
      return p = {}, Ae(p, "".concat(a.value), !0), Ae(p, "".concat(a.value, "-").concat(y), y), Ae(p, "".concat(a.value, "-rtl"), c.value === "rtl"), p;
    });
    return function() {
      var p;
      return L("div", {
        class: d.value
      }, [wr((p = r.default) === null || p === void 0 ? void 0 : p.call(r))]);
    };
  }
});
Ln.Group = sl;
Ln.install = function(e) {
  return e.component(Ln.name, Ln), e.component(sl.name, sl), e;
};
var sx = "[object Symbol]";
function lx(e) {
  return typeof e == "symbol" || t0(e) && e0(e) == sx;
}
var ux = /\s/;
function cx(e) {
  for (var t = e.length; t-- && ux.test(e.charAt(t)); )
    ;
  return t;
}
var fx = /^\s+/;
function dx(e) {
  return e && e.slice(0, cx(e) + 1).replace(fx, "");
}
var Hf = 0 / 0, px = /^[-+]0x[0-9a-f]+$/i, hx = /^0b[01]+$/i, vx = /^0o[0-7]+$/i, gx = parseInt;
function Bf(e) {
  if (typeof e == "number")
    return e;
  if (lx(e))
    return Hf;
  if (al(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = al(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = dx(e);
  var n = hx.test(e);
  return n || vx.test(e) ? gx(e.slice(2), n ? 2 : 8) : px.test(e) ? Hf : +e;
}
var Ih = function() {
  return ma() && window.document.documentElement;
}, Oo, mx = function() {
  if (!Ih())
    return !1;
  if (Oo !== void 0)
    return Oo;
  var t = document.createElement("div");
  return t.style.display = "flex", t.style.flexDirection = "column", t.style.rowGap = "1px", t.appendChild(document.createElement("div")), t.appendChild(document.createElement("div")), document.body.appendChild(t), Oo = t.scrollHeight === 1, document.body.removeChild(t), Oo;
};
const yx = function() {
  var e = Fe(!1);
  return Zt(function() {
    e.value = mx();
  }), e;
};
var bx = function() {
  return _p.Date.now();
};
const Ts = bx;
var Cx = "Expected a function", xx = Math.max, wx = Math.min;
function Tx(e, t, n) {
  var r, o, a, c, d, p, g = 0, y = !1, C = !1, b = !0;
  if (typeof e != "function")
    throw new TypeError(Cx);
  t = Bf(t) || 0, al(n) && (y = !!n.leading, C = "maxWait" in n, a = C ? xx(Bf(n.maxWait) || 0, t) : a, b = "trailing" in n ? !!n.trailing : b);
  function E(u) {
    var Y = r, X = o;
    return r = o = void 0, g = u, c = e.apply(X, Y), c;
  }
  function w(u) {
    return g = u, d = setTimeout(N, t), y ? E(u) : c;
  }
  function A(u) {
    var Y = u - p, X = u - g, oe = t - Y;
    return C ? wx(oe, a - X) : oe;
  }
  function D(u) {
    var Y = u - p, X = u - g;
    return p === void 0 || Y >= t || Y < 0 || C && X >= a;
  }
  function N() {
    var u = Ts();
    if (D(u))
      return I(u);
    d = setTimeout(N, A(u));
  }
  function I(u) {
    return d = void 0, b && r ? E(u) : (r = o = void 0, c);
  }
  function F() {
    d !== void 0 && clearTimeout(d), g = 0, r = p = o = d = void 0;
  }
  function J() {
    return d === void 0 ? c : I(Ts());
  }
  function B() {
    var u = Ts(), Y = D(u);
    if (r = arguments, o = this, p = u, Y) {
      if (d === void 0)
        return w(p);
      if (C)
        return clearTimeout(d), d = setTimeout(N, t), E(p);
    }
    return d === void 0 && (d = setTimeout(N, t)), c;
  }
  return B.cancel = F, B.flush = J, B;
}
var Ex = function() {
  return {
    prefixCls: String,
    type: {
      type: String,
      default: "horizontal"
    },
    dashed: {
      type: Boolean,
      default: !1
    },
    orientation: {
      type: String,
      default: "center"
    },
    plain: {
      type: Boolean,
      default: !1
    },
    orientationMargin: [String, Number]
  };
}, Sx = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "ADivider",
  props: Ex(),
  setup: function(t, n) {
    var r = n.slots, o = wn("divider", t), a = o.prefixCls, c = o.direction, d = Me(function() {
      return t.orientation === "left" && t.orientationMargin != null;
    }), p = Me(function() {
      return t.orientation === "right" && t.orientationMargin != null;
    }), g = Me(function() {
      var b, E = t.type, w = t.dashed, A = t.plain, D = a.value;
      return b = {}, Ae(b, D, !0), Ae(b, "".concat(D, "-").concat(E), !0), Ae(b, "".concat(D, "-dashed"), !!w), Ae(b, "".concat(D, "-plain"), !!A), Ae(b, "".concat(D, "-rtl"), c.value === "rtl"), Ae(b, "".concat(D, "-no-default-orientation-margin-left"), d.value), Ae(b, "".concat(D, "-no-default-orientation-margin-right"), p.value), b;
    }), y = Me(function() {
      var b = typeof t.orientationMargin == "number" ? "".concat(t.orientationMargin, "px") : t.orientationMargin;
      return G(G({}, d.value && {
        marginLeft: b
      }), p.value && {
        marginRight: b
      });
    }), C = Me(function() {
      return t.orientation.length > 0 ? "-" + t.orientation : t.orientation;
    });
    return function() {
      var b, E = wr((b = r.default) === null || b === void 0 ? void 0 : b.call(r));
      return L("div", {
        class: [g.value, E.length ? "".concat(a.value, "-with-text ").concat(a.value, "-with-text").concat(C.value) : ""],
        role: "separator"
      }, [E.length ? L("span", {
        class: "".concat(a.value, "-inner-text"),
        style: y.value
      }, [E]) : null]);
    };
  }
});
const Ox = ha(Sx);
var Es;
function jh(e) {
  if (typeof document > "u")
    return 0;
  if (e || Es === void 0) {
    var t = document.createElement("div");
    t.style.width = "100%", t.style.height = "200px";
    var n = document.createElement("div"), r = n.style;
    r.position = "absolute", r.top = "0", r.left = "0", r.pointerEvents = "none", r.visibility = "hidden", r.width = "200px", r.height = "150px", r.overflow = "hidden", n.appendChild(t), document.body.appendChild(n);
    var o = t.offsetWidth;
    n.style.overflow = "scroll";
    var a = t.offsetWidth;
    o === a && (a = n.clientWidth), document.body.removeChild(n), Es = o - a;
  }
  return Es;
}
function ei(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.element, r = n === void 0 ? document.body : n, o = {}, a = Object.keys(e);
  return a.forEach(function(c) {
    o[c] = r.style[c];
  }), a.forEach(function(c) {
    r.style[c] = e[c];
  }), o;
}
function _x() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
var Ss = {};
const Wf = function(e) {
  if (!(!_x() && !e)) {
    var t = "ant-scrolling-effect", n = new RegExp("".concat(t), "g"), r = document.body.className;
    if (e) {
      if (!n.test(r))
        return;
      ei(Ss), Ss = {}, document.body.className = r.replace(n, "").trim();
      return;
    }
    var o = jh();
    if (o && (Ss = ei({
      position: "relative",
      width: "calc(100% - ".concat(o, "px)")
    }), !n.test(r))) {
      var a = "".concat(r, " ").concat(t);
      document.body.className = a.trim();
    }
  }
};
var Kt = [], Dh = "ant-scrolling-effect", Os = new RegExp("".concat(Dh), "g"), Ax = 0, _s = /* @__PURE__ */ new Map(), Px = /* @__PURE__ */ Rh(function e(t) {
  var n = this;
  Mh(this, e), Ae(this, "getContainer", function() {
    var r;
    return (r = n.options) === null || r === void 0 ? void 0 : r.container;
  }), Ae(this, "reLock", function(r) {
    var o = Kt.find(function(a) {
      var c = a.target;
      return c === n.lockTarget;
    });
    o && n.unLock(), n.options = r, o && (o.options = r, n.lock());
  }), Ae(this, "lock", function() {
    var r;
    if (!Kt.some(function(p) {
      var g = p.target;
      return g === n.lockTarget;
    })) {
      if (Kt.some(function(p) {
        var g, y = p.options;
        return (y == null ? void 0 : y.container) === ((g = n.options) === null || g === void 0 ? void 0 : g.container);
      })) {
        Kt = [].concat(Jr(Kt), [{
          target: n.lockTarget,
          options: n.options
        }]);
        return;
      }
      var o = 0, a = ((r = n.options) === null || r === void 0 ? void 0 : r.container) || document.body;
      (a === document.body && window.innerWidth - document.documentElement.clientWidth > 0 || a.scrollHeight > a.clientHeight) && (o = jh());
      var c = a.className;
      if (Kt.filter(function(p) {
        var g, y = p.options;
        return (y == null ? void 0 : y.container) === ((g = n.options) === null || g === void 0 ? void 0 : g.container);
      }).length === 0 && _s.set(a, ei({
        width: o !== 0 ? "calc(100% - ".concat(o, "px)") : void 0,
        overflow: "hidden",
        overflowX: "hidden",
        overflowY: "hidden"
      }, {
        element: a
      })), !Os.test(c)) {
        var d = "".concat(c, " ").concat(Dh);
        a.className = d.trim();
      }
      Kt = [].concat(Jr(Kt), [{
        target: n.lockTarget,
        options: n.options
      }]);
    }
  }), Ae(this, "unLock", function() {
    var r, o = Kt.find(function(d) {
      var p = d.target;
      return p === n.lockTarget;
    });
    if (Kt = Kt.filter(function(d) {
      var p = d.target;
      return p !== n.lockTarget;
    }), !(!o || Kt.some(function(d) {
      var p, g = d.options;
      return (g == null ? void 0 : g.container) === ((p = o.options) === null || p === void 0 ? void 0 : p.container);
    }))) {
      var a = ((r = n.options) === null || r === void 0 ? void 0 : r.container) || document.body, c = a.className;
      Os.test(c) && (ei(_s.get(a), {
        element: a
      }), _s.delete(a), a.className = a.className.replace(Os, "").trim());
    }
  }), this.lockTarget = Ax++, this.options = t;
}), An = 0, _i = ma(), _o = {}, Mr = function(t) {
  if (!_i)
    return null;
  if (t) {
    if (typeof t == "string")
      return document.querySelectorAll(t)[0];
    if (typeof t == "function")
      return t();
    if (tr(t) === "object" && t instanceof window.HTMLElement)
      return t;
  }
  return document.body;
};
const Nx = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "PortalWrapper",
  inheritAttrs: !1,
  props: {
    wrapperClassName: String,
    forceRender: {
      type: Boolean,
      default: void 0
    },
    getContainer: Je.any,
    visible: {
      type: Boolean,
      default: void 0
    }
  },
  setup: function(t, n) {
    var r = n.slots, o = Fe(), a = Fe(), c = Fe(), d = new Px({
      container: Mr(t.getContainer)
    }), p = function() {
      var A, D;
      (A = o.value) === null || A === void 0 || (D = A.parentNode) === null || D === void 0 || D.removeChild(o.value);
    }, g = function() {
      var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
      if (A || o.value && !o.value.parentNode) {
        var D = Mr(t.getContainer);
        return D ? (D.appendChild(o.value), !0) : !1;
      }
      return !0;
    }, y = function() {
      return _i ? (o.value || (o.value = document.createElement("div"), g(!0)), C(), o.value) : null;
    }, C = function() {
      var A = t.wrapperClassName;
      o.value && A && A !== o.value.className && (o.value.className = A);
    };
    Ki(function() {
      C(), g();
    });
    var b = function() {
      An === 1 && !Object.keys(_o).length ? (Wf(), _o = ei({
        overflow: "hidden",
        overflowX: "hidden",
        overflowY: "hidden"
      })) : An || (ei(_o), _o = {}, Wf(!0));
    }, E = la();
    return Zt(function() {
      var w = !1;
      Ut([function() {
        return t.visible;
      }, function() {
        return t.getContainer;
      }], function(A, D) {
        var N = Tr(A, 2), I = N[0], F = N[1], J = Tr(D, 2), B = J[0], u = J[1];
        if (_i && Mr(t.getContainer) === document.body && (I && !B ? An += 1 : w && (An -= 1)), w) {
          var Y = typeof F == "function" && typeof u == "function";
          (Y ? F.toString() !== u.toString() : F !== u) && p(), I && I !== B && _i && Mr(F) !== d.getContainer() && d.reLock({
            container: Mr(F)
          });
        }
        w = !0;
      }, {
        immediate: !0,
        flush: "post"
      }), jn(function() {
        g() || (c.value = Ui(function() {
          E.update();
        }));
      });
    }), $n(function() {
      var w = t.visible, A = t.getContainer;
      _i && Mr(A) === document.body && (An = w && An ? An - 1 : An), p(), Ui.cancel(c.value);
    }), function() {
      var w = t.forceRender, A = t.visible, D = null, N = {
        getOpenCount: function() {
          return An;
        },
        getContainer: y,
        switchScrollingEffect: b,
        scrollLocker: d
      };
      return (w || A || a.value) && (D = L(YC, {
        getContainer: y,
        ref: a
      }, {
        default: function() {
          var F;
          return (F = r.default) === null || F === void 0 ? void 0 : F.call(r, N);
        }
      })), D;
    };
  }
});
function nu() {
  return {
    keyboard: {
      type: Boolean,
      default: void 0
    },
    mask: {
      type: Boolean,
      default: void 0
    },
    afterClose: Function,
    closable: {
      type: Boolean,
      default: void 0
    },
    maskClosable: {
      type: Boolean,
      default: void 0
    },
    visible: {
      type: Boolean,
      default: void 0
    },
    destroyOnClose: {
      type: Boolean,
      default: void 0
    },
    mousePosition: Je.shape({
      x: Number,
      y: Number
    }).loose,
    title: Je.any,
    footer: Je.any,
    transitionName: String,
    maskTransitionName: String,
    animation: Je.any,
    maskAnimation: Je.any,
    wrapStyle: {
      type: Object,
      default: void 0
    },
    bodyStyle: {
      type: Object,
      default: void 0
    },
    maskStyle: {
      type: Object,
      default: void 0
    },
    prefixCls: String,
    wrapClassName: String,
    rootClassName: String,
    width: [String, Number],
    height: [String, Number],
    zIndex: Number,
    bodyProps: Je.any,
    maskProps: Je.any,
    wrapProps: Je.any,
    getContainer: Je.any,
    dialogStyle: {
      type: Object,
      default: void 0
    },
    dialogClass: String,
    closeIcon: Je.any,
    forceRender: {
      type: Boolean,
      default: void 0
    },
    getOpenCount: Function,
    // https://github.com/ant-design/ant-design/issues/19771
    // https://github.com/react-component/dialog/issues/95
    focusTriggerAfterClose: {
      type: Boolean,
      default: void 0
    },
    onClose: Function,
    modalRender: Function
  };
}
function Uf(e, t, n) {
  var r = t;
  return !r && n && (r = "".concat(e, "-").concat(n)), r;
}
var qf = -1;
function kx() {
  return qf += 1, qf;
}
function zf(e, t) {
  var n = e["page".concat(t ? "Y" : "X", "Offset")], r = "scroll".concat(t ? "Top" : "Left");
  if (typeof n != "number") {
    var o = e.document;
    n = o.documentElement[r], typeof n != "number" && (n = o.body[r]);
  }
  return n;
}
function Lx(e) {
  var t = e.getBoundingClientRect(), n = {
    left: t.left,
    top: t.top
  }, r = e.ownerDocument, o = r.defaultView || r.parentWindow;
  return n.left += zf(o), n.top += zf(o, !0), n;
}
var Yf = {
  width: 0,
  height: 0,
  overflow: "hidden",
  outline: "none"
};
const Rx = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "Content",
  inheritAttrs: !1,
  props: G(G({}, nu()), {}, {
    motionName: String,
    ariaId: String,
    onVisibleChanged: Function,
    onMousedown: Function,
    onMouseup: Function
  }),
  setup: function(t, n) {
    var r = n.expose, o = n.slots, a = n.attrs, c = Fe(), d = Fe(), p = Fe();
    r({
      focus: function() {
        var w;
        (w = c.value) === null || w === void 0 || w.focus();
      },
      changeActive: function(w) {
        var A = document, D = A.activeElement;
        w && D === d.value ? c.value.focus() : !w && D === c.value && d.value.focus();
      }
    });
    var g = Fe(), y = Me(function() {
      var E = t.width, w = t.height, A = {};
      return E !== void 0 && (A.width = typeof E == "number" ? "".concat(E, "px") : E), w !== void 0 && (A.height = typeof w == "number" ? "".concat(w, "px") : w), g.value && (A.transformOrigin = g.value), A;
    }), C = function() {
      jn(function() {
        if (p.value) {
          var w = Lx(p.value);
          g.value = t.mousePosition ? "".concat(t.mousePosition.x - w.left, "px ").concat(t.mousePosition.y - w.top, "px") : "";
        }
      });
    }, b = function(w) {
      t.onVisibleChanged(w);
    };
    return function() {
      var E, w, A, D, N = t.prefixCls, I = t.footer, F = I === void 0 ? (E = o.footer) === null || E === void 0 ? void 0 : E.call(o) : I, J = t.title, B = J === void 0 ? (w = o.title) === null || w === void 0 ? void 0 : w.call(o) : J, u = t.ariaId, Y = t.closable, X = t.closeIcon, oe = X === void 0 ? (A = o.closeIcon) === null || A === void 0 ? void 0 : A.call(o) : X, fe = t.onClose, we = t.bodyStyle, Q = t.bodyProps, pe = t.onMousedown, Ie = t.onMouseup, ie = t.visible, U = t.modalRender, K = U === void 0 ? o.modalRender : U, se = t.destroyOnClose, me = t.motionName, ve;
      F && (ve = L("div", {
        class: "".concat(N, "-footer")
      }, [F]));
      var Ee;
      B && (Ee = L("div", {
        class: "".concat(N, "-header")
      }, [L("div", {
        class: "".concat(N, "-title"),
        id: u
      }, [B])]));
      var $e;
      Y && ($e = L("button", {
        type: "button",
        onClick: fe,
        "aria-label": "Close",
        class: "".concat(N, "-close")
      }, [oe || L("span", {
        class: "".concat(N, "-close-x")
      }, null)]));
      var Ue = L("div", {
        class: "".concat(N, "-content")
      }, [$e, Ee, L("div", G({
        class: "".concat(N, "-body"),
        style: we
      }, Q), [(D = o.default) === null || D === void 0 ? void 0 : D.call(o)]), ve]), pt = Qp(me);
      return L(Gi, G(G({}, pt), {}, {
        onBeforeEnter: C,
        onAfterEnter: function() {
          return b(!0);
        },
        onAfterLeave: function() {
          return b(!1);
        }
      }), {
        default: function() {
          return [ie || !se ? jd(L("div", G(G({}, a), {}, {
            ref: p,
            key: "dialog-element",
            role: "document",
            style: [y.value, a.style],
            class: [N, a.class],
            onMousedown: pe,
            onMouseup: Ie
          }), [L("div", {
            tabindex: 0,
            ref: c,
            style: Yf,
            "aria-hidden": "true"
          }, null), K ? K({
            originVNode: Ue
          }) : Ue, L("div", {
            tabindex: 0,
            ref: d,
            style: Yf,
            "aria-hidden": "true"
          }, null)]), [[rp, ie]]) : null];
        }
      });
    };
  }
});
function Mx(e) {
  if (e == null)
    throw new TypeError("Cannot destructure " + e);
}
const Ix = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "Mask",
  props: {
    prefixCls: String,
    visible: Boolean,
    motionName: String,
    maskProps: Object
  },
  setup: function(t, n) {
    return Mx(n), function() {
      var r = t.prefixCls, o = t.visible, a = t.maskProps, c = t.motionName, d = Qp(c);
      return L(Gi, d, {
        default: function() {
          return [jd(L("div", G({
            class: "".concat(r, "-mask")
          }, a), null), [[rp, o]])];
        }
      });
    };
  }
}), Xf = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "Dialog",
  inheritAttrs: !1,
  props: Ji(G(G({}, nu()), {}, {
    getOpenCount: Function,
    scrollLocker: Object
  }), {
    mask: !0,
    visible: !1,
    keyboard: !0,
    closable: !0,
    maskClosable: !0,
    destroyOnClose: !1,
    prefixCls: "rc-dialog",
    getOpenCount: function() {
      return null;
    },
    focusTriggerAfterClose: !0
  }),
  setup: function(t, n) {
    var r = n.attrs, o = n.slots, a = Fe(), c = Fe(), d = Fe(), p = Fe(t.visible), g = Fe("vcDialogTitle".concat(kx())), y = function(F) {
      if (F) {
        if (!qC(c.value, document.activeElement)) {
          var J;
          a.value = document.activeElement, (J = d.value) === null || J === void 0 || J.focus();
        }
      } else {
        var B = p.value;
        if (p.value = !1, t.mask && a.value && t.focusTriggerAfterClose) {
          try {
            a.value.focus({
              preventScroll: !0
            });
          } catch {
          }
          a.value = null;
        }
        if (B) {
          var u;
          (u = t.afterClose) === null || u === void 0 || u.call(t);
        }
      }
    }, C = function(F) {
      var J;
      (J = t.onClose) === null || J === void 0 || J.call(t, F);
    }, b = Fe(!1), E = Fe(), w = function() {
      clearTimeout(E.value), b.value = !0;
    }, A = function() {
      E.value = setTimeout(function() {
        b.value = !1;
      });
    }, D = function(F) {
      if (!t.maskClosable)
        return null;
      b.value ? b.value = !1 : c.value === F.target && C(F);
    }, N = function(F) {
      if (t.keyboard && F.keyCode === Af.ESC) {
        F.stopPropagation(), C(F);
        return;
      }
      t.visible && F.keyCode === Af.TAB && d.value.changeActive(!F.shiftKey);
    };
    return Ut(function() {
      return t.visible;
    }, function() {
      t.visible && (p.value = !0);
    }, {
      flush: "post"
    }), $n(function() {
      var I;
      clearTimeout(E.value), (I = t.scrollLocker) === null || I === void 0 || I.unLock();
    }), Vi(function() {
      var I;
      if ((I = t.scrollLocker) === null || I === void 0 || I.unLock(), p.value) {
        var F;
        (F = t.scrollLocker) === null || F === void 0 || F.lock();
      }
    }), function() {
      var I = t.prefixCls, F = t.mask, J = t.visible, B = t.maskTransitionName, u = t.maskAnimation, Y = t.zIndex, X = t.wrapClassName, oe = t.rootClassName, fe = t.wrapStyle, we = t.closable, Q = t.maskProps, pe = t.maskStyle, Ie = t.transitionName, ie = t.animation, U = t.wrapProps, K = t.title, se = K === void 0 ? o.title : K, me = r.style, ve = r.class;
      return L("div", G({
        class: ["".concat(I, "-root"), oe]
      }, JC(t, {
        data: !0
      })), [L(Ix, {
        prefixCls: I,
        visible: F && J,
        motionName: Uf(I, B, u),
        style: G({
          zIndex: Y
        }, pe),
        maskProps: Q
      }, null), L("div", G({
        tabIndex: -1,
        onKeydown: N,
        class: Cn("".concat(I, "-wrap"), X),
        ref: c,
        onClick: D,
        role: "dialog",
        "aria-labelledby": se ? g.value : null,
        style: G(G({
          zIndex: Y
        }, fe), {}, {
          display: p.value ? null : "none"
        })
      }, U), [L(Rx, G(G({}, Ph(t, ["scrollLocker"])), {}, {
        style: me,
        class: ve,
        onMousedown: w,
        onMouseup: A,
        ref: d,
        closable: we,
        ariaId: g.value,
        prefixCls: I,
        visible: J,
        onClose: C,
        onVisibleChanged: y,
        motionName: Uf(I, Ie, ie)
      }), o)])]);
    };
  }
});
var jx = nu(), Dx = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "DialogWrap",
  inheritAttrs: !1,
  props: Ji(jx, {
    visible: !1
  }),
  setup: function(t, n) {
    var r = n.attrs, o = n.slots, a = Fe(t.visible);
    return kh({}, {
      inTriggerContext: !1
    }), Ut(function() {
      return t.visible;
    }, function() {
      t.visible && (a.value = !0);
    }, {
      flush: "post"
    }), function() {
      var c = t.visible, d = t.getContainer, p = t.forceRender, g = t.destroyOnClose, y = g === void 0 ? !1 : g, C = t.afterClose, b = G(G(G({}, t), r), {}, {
        ref: "_component",
        key: "dialog"
      });
      return d === !1 ? L(Xf, G(G({}, b), {}, {
        getOpenCount: function() {
          return 2;
        }
      }), o) : !p && y && !a.value ? null : L(Nx, {
        visible: c,
        forceRender: p,
        getContainer: d
      }, {
        default: function(w) {
          return b = G(G(G({}, b), w), {}, {
            afterClose: function() {
              C == null || C(), a.value = !1;
            }
          }), L(Xf, b, o);
        }
      });
    };
  }
});
const $x = Dx;
var Fx = ["class", "style"], Hx = function() {
  return {
    prefixCls: String,
    spinning: {
      type: Boolean,
      default: void 0
    },
    size: String,
    wrapperClassName: String,
    tip: Je.any,
    delay: Number,
    indicator: Je.any
  };
}, $o = null;
function Bx(e, t) {
  return !!e && !!t && !isNaN(Number(t));
}
function Wx(e) {
  var t = e.indicator;
  $o = typeof t == "function" ? t : function() {
    return L(t, null, null);
  };
}
const Ri = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "ASpin",
  inheritAttrs: !1,
  props: Ji(Hx(), {
    size: "default",
    spinning: !0,
    wrapperClassName: ""
  }),
  setup: function() {
    return {
      originalUpdateSpinning: null,
      configProvider: kn("configProvider", Ah)
    };
  },
  data: function() {
    var t = this.spinning, n = this.delay, r = Bx(t, n);
    return {
      sSpinning: t && !r
    };
  },
  created: function() {
    this.originalUpdateSpinning = this.updateSpinning, this.debouncifyUpdateSpinning(this.$props);
  },
  mounted: function() {
    this.updateSpinning();
  },
  updated: function() {
    var t = this;
    jn(function() {
      t.debouncifyUpdateSpinning(), t.updateSpinning();
    });
  },
  beforeUnmount: function() {
    this.cancelExistingSpin();
  },
  methods: {
    debouncifyUpdateSpinning: function(t) {
      var n = t || this.$props, r = n.delay;
      r && (this.cancelExistingSpin(), this.updateSpinning = Tx(this.originalUpdateSpinning, r));
    },
    updateSpinning: function() {
      var t = this.spinning, n = this.sSpinning;
      n !== t && (this.sSpinning = t);
    },
    cancelExistingSpin: function() {
      var t = this.updateSpinning;
      t && t.cancel && t.cancel();
    },
    renderIndicator: function(t) {
      var n = "".concat(t, "-dot"), r = a0(this, "indicator");
      return r === null ? null : (Array.isArray(r) && (r = r.length === 1 ? r[0] : r), er(r) ? bn(r, {
        class: n
      }) : $o && er($o()) ? bn($o(), {
        class: n
      }) : L("span", {
        class: "".concat(n, " ").concat(t, "-dot-spin")
      }, [L("i", {
        class: "".concat(t, "-dot-item")
      }, null), L("i", {
        class: "".concat(t, "-dot-item")
      }, null), L("i", {
        class: "".concat(t, "-dot-item")
      }, null), L("i", {
        class: "".concat(t, "-dot-item")
      }, null)]));
    }
  },
  render: function() {
    var t, n, r, o = this.$props, a = o.size, c = o.prefixCls, d = o.tip, p = d === void 0 ? (t = (n = this.$slots).tip) === null || t === void 0 ? void 0 : t.call(n) : d, g = o.wrapperClassName, y = this.$attrs, C = y.class, b = y.style, E = va(y, Fx), w = this.configProvider, A = w.getPrefixCls, D = w.direction, N = A("spin", c), I = this.sSpinning, F = (r = {}, Ae(r, N, !0), Ae(r, "".concat(N, "-sm"), a === "small"), Ae(r, "".concat(N, "-lg"), a === "large"), Ae(r, "".concat(N, "-spinning"), I), Ae(r, "".concat(N, "-show-text"), !!p), Ae(r, "".concat(N, "-rtl"), D === "rtl"), Ae(r, C, !!C), r), J = L("div", G(G({}, E), {}, {
      style: b,
      class: F
    }), [this.renderIndicator(N), p ? L("div", {
      class: "".concat(N, "-text")
    }, [p]) : null]), B = o0(this);
    if (B && B.length) {
      var u, Y = (u = {}, Ae(u, "".concat(N, "-container"), !0), Ae(u, "".concat(N, "-blur"), I), u);
      return L("div", {
        class: ["".concat(N, "-nested-loading"), g]
      }, [I && L("div", {
        key: "loading"
      }, [J]), L("div", {
        class: Y,
        key: "container"
      }, [B])]);
    }
    return J;
  }
});
Ri.setDefaultIndicator = Wx;
Ri.install = function(e) {
  return e.component(Ri.name, Ri), e;
};
var Ux = ["prefixCls", "visible", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose"], ll = null, qx = function(t) {
  ll = {
    x: t.pageX,
    y: t.pageY
  }, setTimeout(function() {
    return ll = null;
  }, 100);
};
Ih() && l0(document.documentElement, "click", qx, !0);
var zx = function() {
  return {
    prefixCls: String,
    visible: {
      type: Boolean,
      default: void 0
    },
    confirmLoading: {
      type: Boolean,
      default: void 0
    },
    title: Je.any,
    closable: {
      type: Boolean,
      default: void 0
    },
    closeIcon: Je.any,
    onOk: Function,
    onCancel: Function,
    "onUpdate:visible": Function,
    onChange: Function,
    afterClose: Function,
    centered: {
      type: Boolean,
      default: void 0
    },
    width: [String, Number],
    footer: Je.any,
    okText: Je.any,
    okType: String,
    cancelText: Je.any,
    icon: Je.any,
    maskClosable: {
      type: Boolean,
      default: void 0
    },
    forceRender: {
      type: Boolean,
      default: void 0
    },
    okButtonProps: Object,
    cancelButtonProps: Object,
    destroyOnClose: {
      type: Boolean,
      default: void 0
    },
    wrapClassName: String,
    maskTransitionName: String,
    transitionName: String,
    getContainer: {
      type: [String, Function, Boolean, Object],
      default: void 0
    },
    zIndex: Number,
    bodyStyle: {
      type: Object,
      default: void 0
    },
    maskStyle: {
      type: Object,
      default: void 0
    },
    mask: {
      type: Boolean,
      default: void 0
    },
    keyboard: {
      type: Boolean,
      default: void 0
    },
    wrapProps: Object,
    focusTriggerAfterClose: {
      type: Boolean,
      default: void 0
    },
    modalRender: Function
  };
}, Fr = [];
const Qt = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "AModal",
  inheritAttrs: !1,
  props: Ji(zx(), {
    width: 520,
    transitionName: "zoom",
    maskTransitionName: "fade",
    confirmLoading: !1,
    visible: !1,
    okType: "primary"
  }),
  setup: function(t, n) {
    var r = n.emit, o = n.slots, a = n.attrs, c = jp("Modal"), d = Tr(c, 1), p = d[0], g = wn("modal", t), y = g.prefixCls, C = g.rootPrefixCls, b = g.direction, E = g.getPopupContainer, w = function(I) {
      r("update:visible", !1), r("cancel", I), r("change", !1);
    }, A = function(I) {
      r("ok", I);
    }, D = function() {
      var I, F, J = t.okText, B = J === void 0 ? (I = o.okText) === null || I === void 0 ? void 0 : I.call(o) : J, u = t.okType, Y = t.cancelText, X = Y === void 0 ? (F = o.cancelText) === null || F === void 0 ? void 0 : F.call(o) : Y, oe = t.confirmLoading;
      return L(ft, null, [L(Ln, G({
        onClick: w
      }, t.cancelButtonProps), {
        default: function() {
          return [X || p.value.cancelText];
        }
      }), L(Ln, G(G({}, Lh(u)), {}, {
        loading: oe,
        onClick: A
      }, t.okButtonProps), {
        default: function() {
          return [B || p.value.okText];
        }
      })]);
    };
    return function() {
      var N, I;
      t.prefixCls;
      var F = t.visible, J = t.wrapClassName, B = t.centered, u = t.getContainer, Y = t.closeIcon, X = Y === void 0 ? (N = o.closeIcon) === null || N === void 0 ? void 0 : N.call(o) : Y, oe = t.focusTriggerAfterClose, fe = oe === void 0 ? !0 : oe, we = va(t, Ux), Q = Cn(J, (I = {}, Ae(I, "".concat(y.value, "-centered"), !!B), Ae(I, "".concat(y.value, "-wrap-rtl"), b.value === "rtl"), I));
      return L($x, G(G(G({}, we), a), {}, {
        getContainer: u || E.value,
        prefixCls: y.value,
        wrapClassName: Q,
        visible: F,
        mousePosition: ll,
        onClose: w,
        focusTriggerAfterClose: fe,
        transitionName: Go(C.value, "zoom", t.transitionName),
        maskTransitionName: Go(C.value, "fade", t.maskTransitionName)
      }), G(G({}, o), {}, {
        footer: o.footer || D,
        closeIcon: function() {
          return L("span", {
            class: "".concat(y.value, "-close-x")
          }, [X || L(mh, {
            class: "".concat(y.value, "-close-icon")
          }, null)]);
        }
      }));
    };
  }
});
var Yx = function() {
  var t = Fe(!1);
  return $n(function() {
    t.value = !0;
  }), t;
};
const Xx = Yx;
var Vx = {
  type: {
    type: String
  },
  actionFn: Function,
  close: Function,
  autofocus: Boolean,
  prefixCls: String,
  buttonProps: Object,
  emitEvent: Boolean,
  quitOnNullishReturnValue: Boolean
};
function Vf(e) {
  return !!(e && e.then);
}
const Kf = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "ActionButton",
  props: Vx,
  setup: function(t, n) {
    var r = n.slots, o = Fe(!1), a = Fe(), c = Fe(!1), d, p = Xx();
    Zt(function() {
      t.autofocus && (d = setTimeout(function() {
        var C;
        return (C = a.value.$el) === null || C === void 0 ? void 0 : C.focus();
      }));
    }), $n(function() {
      clearTimeout(d);
    });
    var g = function(b) {
      var E = t.close;
      Vf(b) && (c.value = !0, b.then(function() {
        p.value || (c.value = !1), E.apply(void 0, arguments), o.value = !1;
      }, function(w) {
        console.error(w), p.value || (c.value = !1), o.value = !1;
      }));
    }, y = function(b) {
      var E = t.actionFn, w = t.close, A = w === void 0 ? function() {
      } : w;
      if (!o.value) {
        if (o.value = !0, !E) {
          A();
          return;
        }
        var D;
        if (t.emitEvent) {
          if (D = E(b), t.quitOnNullishReturnValue && !Vf(D)) {
            o.value = !1, A(b);
            return;
          }
        } else if (E.length)
          D = E(A), o.value = !1;
        else if (D = E(), !D) {
          A();
          return;
        }
        g(D);
      }
    };
    return function() {
      var C = t.type, b = t.prefixCls, E = t.buttonProps;
      return L(Ln, G(G(G({}, Lh(C)), {}, {
        onClick: y,
        loading: c.value,
        prefixCls: b
      }, E), {}, {
        ref: a
      }), r);
    };
  }
});
function Ei(e) {
  return typeof e == "function" ? e() : e;
}
const Kx = Ze({
  name: "ConfirmDialog",
  inheritAttrs: !1,
  props: ["icon", "onCancel", "onOk", "close", "closable", "zIndex", "afterClose", "visible", "keyboard", "centered", "getContainer", "maskStyle", "okButtonProps", "cancelButtonProps", "okType", "prefixCls", "okCancel", "width", "mask", "maskClosable", "okText", "cancelText", "autoFocusButton", "transitionName", "maskTransitionName", "type", "title", "content", "direction", "rootPrefixCls", "bodyStyle", "closeIcon", "modalRender", "focusTriggerAfterClose", "wrapClassName"],
  setup: function(t, n) {
    var r = n.attrs, o = jp("Modal"), a = Tr(o, 1), c = a[0];
    return function() {
      var d = t.icon, p = t.onCancel, g = t.onOk, y = t.close, C = t.closable, b = C === void 0 ? !1 : C, E = t.zIndex, w = t.afterClose, A = t.visible, D = t.keyboard, N = t.centered, I = t.getContainer, F = t.maskStyle, J = t.okButtonProps, B = t.cancelButtonProps, u = t.okCancel, Y = u === void 0 ? !0 : u, X = t.width, oe = X === void 0 ? 416 : X, fe = t.mask, we = fe === void 0 ? !0 : fe, Q = t.maskClosable, pe = Q === void 0 ? !1 : Q, Ie = t.type, ie = t.title, U = t.content, K = t.direction, se = t.closeIcon, me = t.modalRender, ve = t.focusTriggerAfterClose, Ee = t.rootPrefixCls, $e = t.bodyStyle, Ue = t.wrapClassName, pt = t.okType || "primary", at = t.prefixCls || "ant-modal", Ye = "".concat(at, "-confirm"), fn = r.style || {}, Tn = Ei(t.okText) || (Y ? c.value.okText : c.value.justOkText), ht = Ei(t.cancelText) || c.value.cancelText, Fn = t.autoFocusButton === null ? !1 : t.autoFocusButton || "ok", nr = Cn(Ye, "".concat(Ye, "-").concat(Ie), "".concat(at, "-").concat(Ie), Ae({}, "".concat(Ye, "-rtl"), K === "rtl"), r.class), _ = Y && L(Kf, {
        actionFn: p,
        close: y,
        autofocus: Fn === "cancel",
        buttonProps: B,
        prefixCls: "".concat(Ee, "-btn")
      }, {
        default: function() {
          return [ht];
        }
      });
      return L(Qt, {
        prefixCls: at,
        class: nr,
        wrapClassName: Cn(Ae({}, "".concat(Ye, "-centered"), !!N), Ue),
        onCancel: function(W) {
          return y({
            triggerCancel: !0
          }, W);
        },
        visible: A,
        title: "",
        footer: "",
        transitionName: Go(Ee, "zoom", t.transitionName),
        maskTransitionName: Go(Ee, "fade", t.maskTransitionName),
        mask: we,
        maskClosable: pe,
        maskStyle: F,
        style: fn,
        bodyStyle: $e,
        width: oe,
        zIndex: E,
        afterClose: w,
        keyboard: D,
        centered: N,
        getContainer: I,
        closable: b,
        closeIcon: se,
        modalRender: me,
        focusTriggerAfterClose: ve
      }, {
        default: function() {
          return [L("div", {
            class: "".concat(Ye, "-body-wrapper")
          }, [L("div", {
            class: "".concat(Ye, "-body")
          }, [Ei(d), ie === void 0 ? null : L("span", {
            class: "".concat(Ye, "-title")
          }, [Ei(ie)]), L("div", {
            class: "".concat(Ye, "-content")
          }, [Ei(U)])]), L("div", {
            class: "".concat(Ye, "-btns")
          }, [_, L(Kf, {
            type: pt,
            actionFn: g,
            close: y,
            autofocus: Fn === "ok",
            buttonProps: J,
            prefixCls: "".concat(Ee, "-btn")
          }, {
            default: function() {
              return [Tn];
            }
          })])])];
        }
      });
    };
  }
});
var Gx = function(t) {
  var n = document.createDocumentFragment(), r = G(G({}, Ph(t, ["parentContext", "appContext"])), {}, {
    close: c,
    visible: !0
  }), o = null;
  function a() {
    o && (qo(null, n), o.component.update(), o = null);
    for (var y = arguments.length, C = new Array(y), b = 0; b < y; b++)
      C[b] = arguments[b];
    var E = C.some(function(D) {
      return D && D.triggerCancel;
    });
    t.onCancel && E && t.onCancel.apply(t, C);
    for (var w = 0; w < Fr.length; w++) {
      var A = Fr[w];
      if (A === c) {
        Fr.splice(w, 1);
        break;
      }
    }
  }
  function c() {
    for (var y = this, C = arguments.length, b = new Array(C), E = 0; E < C; E++)
      b[E] = arguments[E];
    r = G(G({}, r), {}, {
      visible: !1,
      afterClose: function() {
        typeof t.afterClose == "function" && t.afterClose(), a.apply(y, b);
      }
    }), d(r);
  }
  function d(y) {
    typeof y == "function" ? r = y(r) : r = G(G({}, r), y), o && (Mn(o.component.props, r), o.component.update());
  }
  var p = function(C) {
    var b = Rt, E = b.prefixCls, w = C.prefixCls || "".concat(E, "-modal");
    return L(zr, G(G({}, b), {}, {
      notUpdateGlobalConfig: !0,
      prefixCls: E
    }), {
      default: function() {
        return [L(Kx, G(G({}, C), {}, {
          rootPrefixCls: E,
          prefixCls: w
        }), null)];
      }
    });
  };
  function g(y) {
    var C = L(p, G({}, y));
    return C.appContext = t.parentContext || t.appContext || C.appContext, qo(C, n), C;
  }
  return o = g(r), Fr.push(c), {
    destroy: c,
    update: d
  };
};
const Qi = Gx;
function Jx(e) {
  return G(G({
    icon: function() {
      return L(Zl, null, null);
    },
    okCancel: !1
  }, e), {}, {
    type: "warning"
  });
}
function Qx(e) {
  return G(G({
    icon: function() {
      return L(vh, null, null);
    },
    okCancel: !1
  }, e), {}, {
    type: "info"
  });
}
function Zx(e) {
  return G(G({
    icon: function() {
      return L(hh, null, null);
    },
    okCancel: !1
  }, e), {}, {
    type: "success"
  });
}
function ew(e) {
  return G(G({
    icon: function() {
      return L(gh, null, null);
    },
    okCancel: !1
  }, e), {}, {
    type: "error"
  });
}
function tw(e) {
  return G(G({
    icon: function() {
      return L(Zl, null, null);
    },
    okCancel: !0
  }, e), {}, {
    type: "confirm"
  });
}
function $h(e) {
  return Qi(Jx(e));
}
Qt.info = function(t) {
  return Qi(Qx(t));
};
Qt.success = function(t) {
  return Qi(Zx(t));
};
Qt.error = function(t) {
  return Qi(ew(t));
};
Qt.warning = $h;
Qt.warn = $h;
Qt.confirm = function(t) {
  return Qi(tw(t));
};
Qt.destroyAll = function() {
  for (; Fr.length; ) {
    var t = Fr.pop();
    t && t();
  }
};
Qt.install = function(e) {
  return e.component(Qt.name, Qt), e;
};
var nw = {
  small: 8,
  middle: 16,
  large: 24
}, rw = function() {
  return {
    prefixCls: String,
    size: {
      type: [String, Number, Array]
    },
    direction: Je.oneOf(zs("horizontal", "vertical")).def("horizontal"),
    align: Je.oneOf(zs("start", "end", "center", "baseline")),
    wrap: {
      type: Boolean,
      default: void 0
    }
  };
};
function iw(e) {
  return typeof e == "string" ? nw[e] : e || 0;
}
var ow = Ze({
  compatConfig: {
    MODE: 3
  },
  name: "ASpace",
  props: rw(),
  slots: ["split"],
  setup: function(t, n) {
    var r = n.slots, o = wn("space", t), a = o.prefixCls, c = o.space, d = o.direction, p = yx(), g = Me(function() {
      var D, N, I;
      return (D = (N = t.size) !== null && N !== void 0 ? N : (I = c.value) === null || I === void 0 ? void 0 : I.size) !== null && D !== void 0 ? D : "small";
    }), y = Fe(), C = Fe();
    Ut(g, function() {
      var D = (Array.isArray(g.value) ? g.value : [g.value, g.value]).map(function(I) {
        return iw(I);
      }), N = Tr(D, 2);
      y.value = N[0], C.value = N[1];
    }, {
      immediate: !0
    });
    var b = Me(function() {
      return t.align === void 0 && t.direction === "horizontal" ? "center" : t.align;
    }), E = Me(function() {
      var D;
      return Cn(a.value, "".concat(a.value, "-").concat(t.direction), (D = {}, Ae(D, "".concat(a.value, "-rtl"), d.value === "rtl"), Ae(D, "".concat(a.value, "-align-").concat(b.value), b.value), D));
    }), w = Me(function() {
      return d.value === "rtl" ? "marginLeft" : "marginRight";
    }), A = Me(function() {
      var D = {};
      return p.value && (D.columnGap = "".concat(y.value, "px"), D.rowGap = "".concat(C.value, "px")), G(G({}, D), t.wrap && {
        flexWrap: "wrap",
        marginBottom: "".concat(-C.value, "px")
      });
    });
    return function() {
      var D, N, I = t.wrap, F = t.direction, J = F === void 0 ? "horizontal" : F, B = Hl((D = r.default) === null || D === void 0 ? void 0 : D.call(r)), u = B.length;
      if (u === 0)
        return null;
      var Y = (N = r.split) === null || N === void 0 ? void 0 : N.call(r), X = "".concat(a.value, "-item"), oe = y.value, fe = u - 1;
      return L("div", {
        class: E.value,
        style: A.value
      }, [B.map(function(we, Q) {
        var pe = {};
        return p.value || (J === "vertical" ? Q < fe && (pe = {
          marginBottom: "".concat(oe / (Y ? 2 : 1), "px")
        }) : pe = G(G({}, Q < fe && Ae({}, w.value, "".concat(oe / (Y ? 2 : 1), "px"))), I && {
          paddingBottom: "".concat(C.value, "px")
        })), L(ft, null, [L("div", {
          class: X,
          style: pe
        }, [we]), Q < fe && Y && L("span", {
          class: "".concat(X, "-split"),
          style: pe
        }, [Y])]);
      })]);
    };
  }
});
const aw = ha(ow);
const Sr = Fe([]);
function sw() {
  jn(() => {
    const e = Array.from(document.querySelectorAll(".reply-dialog"));
    e.length > 0 && e.pop().focus();
  });
}
const Fh = (e, t) => {
  Sr.value.push({
    tid: e,
    pid: t
  });
}, lw = (e) => {
  const t = Sr.value.findIndex((n) => n.pid === e);
  Sr.value.splice(t, 1), sw();
}, uw = () => {
  Sr.value = [];
}, cw = Me(() => Sr.value.length > 1);
var fw = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" } }] }, name: "like", theme: "outlined" };
const dw = fw;
function Gf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      pw(e, o, n[o]);
    });
  }
  return e;
}
function pw(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var ru = function(t, n) {
  var r = Gf({}, t, n.attrs);
  return L(en, Gf({}, r, {
    icon: dw
  }), null);
};
ru.displayName = "LikeOutlined";
ru.inheritAttrs = !1;
const hw = ru;
var vw = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z" } }] }, name: "message", theme: "outlined" };
const gw = vw;
function Jf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      mw(e, o, n[o]);
    });
  }
  return e;
}
function mw(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var iu = function(t, n) {
  var r = Jf({}, t, n.attrs);
  return L(en, Jf({}, r, {
    icon: gw
  }), null);
};
iu.displayName = "MessageOutlined";
iu.inheritAttrs = !1;
const yw = iu, Qf = /* @__PURE__ */ Ze({
  name: "ReplyItem",
  props: {
    /**
     * 帖子id
     */
    tid: {
      type: String,
      required: !0
    },
    /**
     * 回复信息
     */
    reply: {
      type: Object,
      required: !0
    },
    /**
     * 是否是作者
     * 在弹框的顶部，显示当前正在查看的回复
     * 弹框下方的列表，都是回复该作者的。
     */
    isAuthor: Boolean
  },
  setup(e) {
    const {
      reply: t
    } = e, n = Fe(), r = Me(() => "//my.hupu.com/" + t.puid);
    function o() {
      t.check_reply_info && t.check_reply_info.num > 0 && Fh(e.tid, t.pid);
    }
    return Zt(() => {
      const a = n.value;
      for (const c of a.querySelectorAll("img"))
        c.dataset.src && (c.src = c.dataset.src, c.dataset.src = ""), c.dataset.gif && (c.classList.add("is-gif"), c.addEventListener("click", function() {
          this.src = this.dataset.gif;
        }));
    }), () => {
      var a;
      return L("div", {
        class: "reply-item"
      }, [L("a", {
        href: r.value,
        target: "_blank"
      }, [L("img", {
        class: "user-img",
        src: t.userImg,
        alt: t.userName
      }, null)]), L("div", {
        class: "reply-right"
      }, [L("div", {
        class: "reply-header"
      }, [L("div", {
        className: "user"
      }, [L("a", {
        href: r.value,
        target: "_blank"
      }, [L("div", {
        class: "user-name"
      }, [t.userName])]), L("span", {
        class: "time"
      }, [t.time]), L("span", null, [t.location])]), L("div", {
        class: "reply-info-operate"
      }, [L("div", null, [L(hw, null, null), L("span", null, [t.light_count])]), e.isAuthor ? null : L("div", {
        class: "reply",
        onClick: o
      }, [L(yw, null, null), L("span", null, [((a = t.check_reply_info) == null ? void 0 : a.num) || 0])])])]), L("p", {
        class: "content",
        ref: n,
        innerHTML: t.content
      }, null)])]);
    };
  }
});
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
function mn(e) {
  return getComputedStyle(e);
}
function Mt(e, t) {
  for (var n in t) {
    var r = t[n];
    typeof r == "number" && (r = r + "px"), e.style[n] = r;
  }
  return e;
}
function Ao(e) {
  var t = document.createElement("div");
  return t.className = e, t;
}
var Zf = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function Gn(e, t) {
  if (!Zf)
    throw new Error("No element matching method supported");
  return Zf.call(e, t);
}
function Hr(e) {
  e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
}
function ed(e, t) {
  return Array.prototype.filter.call(
    e.children,
    function(n) {
      return Gn(n, t);
    }
  );
}
var lt = {
  main: "ps",
  rtl: "ps__rtl",
  element: {
    thumb: function(e) {
      return "ps__thumb-" + e;
    },
    rail: function(e) {
      return "ps__rail-" + e;
    },
    consuming: "ps__child--consume"
  },
  state: {
    focus: "ps--focus",
    clicking: "ps--clicking",
    active: function(e) {
      return "ps--active-" + e;
    },
    scrolling: function(e) {
      return "ps--scrolling-" + e;
    }
  }
}, Hh = { x: null, y: null };
function Bh(e, t) {
  var n = e.element.classList, r = lt.state.scrolling(t);
  n.contains(r) ? clearTimeout(Hh[t]) : n.add(r);
}
function Wh(e, t) {
  Hh[t] = setTimeout(
    function() {
      return e.isAlive && e.element.classList.remove(lt.state.scrolling(t));
    },
    e.settings.scrollingThreshold
  );
}
function bw(e, t) {
  Bh(e, t), Wh(e, t);
}
var Zi = function(t) {
  this.element = t, this.handlers = {};
}, Uh = { isEmpty: { configurable: !0 } };
Zi.prototype.bind = function(t, n) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(n), this.element.addEventListener(t, n, !1);
};
Zi.prototype.unbind = function(t, n) {
  var r = this;
  this.handlers[t] = this.handlers[t].filter(function(o) {
    return n && o !== n ? !0 : (r.element.removeEventListener(t, o, !1), !1);
  });
};
Zi.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
Uh.isEmpty.get = function() {
  var e = this;
  return Object.keys(this.handlers).every(
    function(t) {
      return e.handlers[t].length === 0;
    }
  );
};
Object.defineProperties(Zi.prototype, Uh);
var ui = function() {
  this.eventElements = [];
};
ui.prototype.eventElement = function(t) {
  var n = this.eventElements.filter(function(r) {
    return r.element === t;
  })[0];
  return n || (n = new Zi(t), this.eventElements.push(n)), n;
};
ui.prototype.bind = function(t, n, r) {
  this.eventElement(t).bind(n, r);
};
ui.prototype.unbind = function(t, n, r) {
  var o = this.eventElement(t);
  o.unbind(n, r), o.isEmpty && this.eventElements.splice(this.eventElements.indexOf(o), 1);
};
ui.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t) {
    return t.unbindAll();
  }), this.eventElements = [];
};
ui.prototype.once = function(t, n, r) {
  var o = this.eventElement(t), a = function(c) {
    o.unbind(n, a), r(c);
  };
  o.bind(n, a);
};
function Po(e) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(e);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(e, !1, !1, void 0), t;
}
function Qo(e, t, n, r, o) {
  r === void 0 && (r = !0), o === void 0 && (o = !1);
  var a;
  if (t === "top")
    a = [
      "contentHeight",
      "containerHeight",
      "scrollTop",
      "y",
      "up",
      "down"
    ];
  else if (t === "left")
    a = [
      "contentWidth",
      "containerWidth",
      "scrollLeft",
      "x",
      "left",
      "right"
    ];
  else
    throw new Error("A proper axis should be provided");
  Cw(e, n, a, r, o);
}
function Cw(e, t, n, r, o) {
  var a = n[0], c = n[1], d = n[2], p = n[3], g = n[4], y = n[5];
  r === void 0 && (r = !0), o === void 0 && (o = !1);
  var C = e.element;
  e.reach[p] = null, C[d] < 1 && (e.reach[p] = "start"), C[d] > e[a] - e[c] - 1 && (e.reach[p] = "end"), t && (C.dispatchEvent(Po("ps-scroll-" + p)), t < 0 ? C.dispatchEvent(Po("ps-scroll-" + g)) : t > 0 && C.dispatchEvent(Po("ps-scroll-" + y)), r && bw(e, p)), e.reach[p] && (t || o) && C.dispatchEvent(Po("ps-" + p + "-reach-" + e.reach[p]));
}
function it(e) {
  return parseInt(e, 10) || 0;
}
function xw(e) {
  return Gn(e, "input,[contenteditable]") || Gn(e, "select,[contenteditable]") || Gn(e, "textarea,[contenteditable]") || Gn(e, "button,[contenteditable]");
}
function ww(e) {
  var t = mn(e);
  return it(t.width) + it(t.paddingLeft) + it(t.paddingRight) + it(t.borderLeftWidth) + it(t.borderRightWidth);
}
var $r = {
  isWebKit: typeof document < "u" && "WebkitAppearance" in document.documentElement.style,
  supportsTouch: typeof window < "u" && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
function In(e) {
  var t = e.element, n = Math.floor(t.scrollTop), r = t.getBoundingClientRect();
  e.containerWidth = Math.round(r.width), e.containerHeight = Math.round(r.height), e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (ed(t, lt.element.rail("x")).forEach(
    function(o) {
      return Hr(o);
    }
  ), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (ed(t, lt.element.rail("y")).forEach(
    function(o) {
      return Hr(o);
    }
  ), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = td(
    e,
    it(e.railXWidth * e.containerWidth / e.contentWidth)
  ), e.scrollbarXLeft = it(
    (e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth)
  )) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = td(
    e,
    it(e.railYHeight * e.containerHeight / e.contentHeight)
  ), e.scrollbarYTop = it(
    n * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight)
  )) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), Tw(t, e), e.scrollbarXActive ? t.classList.add(lt.state.active("x")) : (t.classList.remove(lt.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = e.isRtl === !0 ? e.contentWidth : 0), e.scrollbarYActive ? t.classList.add(lt.state.active("y")) : (t.classList.remove(lt.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0);
}
function td(e, t) {
  return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t;
}
function Tw(e, t) {
  var n = { width: t.railXWidth }, r = Math.floor(e.scrollTop);
  t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft, t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - r : n.top = t.scrollbarXTop + r, Mt(t.scrollbarXRail, n);
  var o = { top: r, height: t.railYHeight };
  t.isScrollbarYUsingRight ? t.isRtl ? o.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth - 9 : o.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? o.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth * 2 - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : o.left = t.scrollbarYLeft + e.scrollLeft, Mt(t.scrollbarYRail, o), Mt(t.scrollbarX, {
    left: t.scrollbarXLeft,
    width: t.scrollbarXWidth - t.railBorderXWidth
  }), Mt(t.scrollbarY, {
    top: t.scrollbarYTop,
    height: t.scrollbarYHeight - t.railBorderYWidth
  });
}
function Ew(e) {
  e.element, e.event.bind(e.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarYRail, "mousedown", function(t) {
    var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top, r = n > e.scrollbarYTop ? 1 : -1;
    e.element.scrollTop += r * e.containerHeight, In(e), t.stopPropagation();
  }), e.event.bind(e.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarXRail, "mousedown", function(t) {
    var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left, r = n > e.scrollbarXLeft ? 1 : -1;
    e.element.scrollLeft += r * e.containerWidth, In(e), t.stopPropagation();
  });
}
function Sw(e) {
  nd(e, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), nd(e, [
    "containerHeight",
    "contentHeight",
    "pageY",
    "railYHeight",
    "scrollbarY",
    "scrollbarYHeight",
    "scrollTop",
    "y",
    "scrollbarYRail"
  ]);
}
function nd(e, t) {
  var n = t[0], r = t[1], o = t[2], a = t[3], c = t[4], d = t[5], p = t[6], g = t[7], y = t[8], C = e.element, b = null, E = null, w = null;
  function A(I) {
    I.touches && I.touches[0] && (I[o] = I.touches[0].pageY), C[p] = b + w * (I[o] - E), Bh(e, g), In(e), I.stopPropagation(), I.type.startsWith("touch") && I.changedTouches.length > 1 && I.preventDefault();
  }
  function D() {
    Wh(e, g), e[y].classList.remove(lt.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", A);
  }
  function N(I, F) {
    b = C[p], F && I.touches && (I[o] = I.touches[0].pageY), E = I[o], w = (e[r] - e[n]) / (e[a] - e[d]), F ? e.event.bind(e.ownerDocument, "touchmove", A) : (e.event.bind(e.ownerDocument, "mousemove", A), e.event.once(e.ownerDocument, "mouseup", D), I.preventDefault()), e[y].classList.add(lt.state.clicking), I.stopPropagation();
  }
  e.event.bind(e[c], "mousedown", function(I) {
    N(I);
  }), e.event.bind(e[c], "touchstart", function(I) {
    N(I, !0);
  });
}
function Ow(e) {
  var t = e.element, n = function() {
    return Gn(t, ":hover");
  }, r = function() {
    return Gn(e.scrollbarX, ":focus") || Gn(e.scrollbarY, ":focus");
  };
  function o(a, c) {
    var d = Math.floor(t.scrollTop);
    if (a === 0) {
      if (!e.scrollbarYActive)
        return !1;
      if (d === 0 && c > 0 || d >= e.contentHeight - e.containerHeight && c < 0)
        return !e.settings.wheelPropagation;
    }
    var p = t.scrollLeft;
    if (c === 0) {
      if (!e.scrollbarXActive)
        return !1;
      if (p === 0 && a < 0 || p >= e.contentWidth - e.containerWidth && a > 0)
        return !e.settings.wheelPropagation;
    }
    return !0;
  }
  e.event.bind(e.ownerDocument, "keydown", function(a) {
    if (!(a.isDefaultPrevented && a.isDefaultPrevented() || a.defaultPrevented) && !(!n() && !r())) {
      var c = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
      if (c) {
        if (c.tagName === "IFRAME")
          c = c.contentDocument.activeElement;
        else
          for (; c.shadowRoot; )
            c = c.shadowRoot.activeElement;
        if (xw(c))
          return;
      }
      var d = 0, p = 0;
      switch (a.which) {
        case 37:
          a.metaKey ? d = -e.contentWidth : a.altKey ? d = -e.containerWidth : d = -30;
          break;
        case 38:
          a.metaKey ? p = e.contentHeight : a.altKey ? p = e.containerHeight : p = 30;
          break;
        case 39:
          a.metaKey ? d = e.contentWidth : a.altKey ? d = e.containerWidth : d = 30;
          break;
        case 40:
          a.metaKey ? p = -e.contentHeight : a.altKey ? p = -e.containerHeight : p = -30;
          break;
        case 32:
          a.shiftKey ? p = e.containerHeight : p = -e.containerHeight;
          break;
        case 33:
          p = e.containerHeight;
          break;
        case 34:
          p = -e.containerHeight;
          break;
        case 36:
          p = e.contentHeight;
          break;
        case 35:
          p = -e.contentHeight;
          break;
        default:
          return;
      }
      e.settings.suppressScrollX && d !== 0 || e.settings.suppressScrollY && p !== 0 || (t.scrollTop -= p, t.scrollLeft += d, In(e), o(d, p) && a.preventDefault());
    }
  });
}
function _w(e) {
  var t = e.element;
  function n(c, d) {
    var p = Math.floor(t.scrollTop), g = t.scrollTop === 0, y = p + t.offsetHeight === t.scrollHeight, C = t.scrollLeft === 0, b = t.scrollLeft + t.offsetWidth === t.scrollWidth, E;
    return Math.abs(d) > Math.abs(c) ? E = g || y : E = C || b, E ? !e.settings.wheelPropagation : !0;
  }
  function r(c) {
    var d = c.deltaX, p = -1 * c.deltaY;
    return (typeof d > "u" || typeof p > "u") && (d = -1 * c.wheelDeltaX / 6, p = c.wheelDeltaY / 6), c.deltaMode && c.deltaMode === 1 && (d *= 10, p *= 10), d !== d && p !== p && (d = 0, p = c.wheelDelta), c.shiftKey ? [-p, -d] : [d, p];
  }
  function o(c, d, p) {
    if (!$r.isWebKit && t.querySelector("select:focus"))
      return !0;
    if (!t.contains(c))
      return !1;
    for (var g = c; g && g !== t; ) {
      if (g.classList.contains(lt.element.consuming))
        return !0;
      var y = mn(g);
      if (p && y.overflowY.match(/(scroll|auto)/)) {
        var C = g.scrollHeight - g.clientHeight;
        if (C > 0 && (g.scrollTop > 0 && p < 0 || g.scrollTop < C && p > 0))
          return !0;
      }
      if (d && y.overflowX.match(/(scroll|auto)/)) {
        var b = g.scrollWidth - g.clientWidth;
        if (b > 0 && (g.scrollLeft > 0 && d < 0 || g.scrollLeft < b && d > 0))
          return !0;
      }
      g = g.parentNode;
    }
    return !1;
  }
  function a(c) {
    var d = r(c), p = d[0], g = d[1];
    if (!o(c.target, p, g)) {
      var y = !1;
      e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (g ? t.scrollTop -= g * e.settings.wheelSpeed : t.scrollTop += p * e.settings.wheelSpeed, y = !0) : e.scrollbarXActive && !e.scrollbarYActive && (p ? t.scrollLeft += p * e.settings.wheelSpeed : t.scrollLeft -= g * e.settings.wheelSpeed, y = !0) : (t.scrollTop -= g * e.settings.wheelSpeed, t.scrollLeft += p * e.settings.wheelSpeed), In(e), y = y || n(p, g), y && !c.ctrlKey && (c.stopPropagation(), c.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? e.event.bind(t, "wheel", a) : typeof window.onmousewheel < "u" && e.event.bind(t, "mousewheel", a);
}
function Aw(e) {
  if (!$r.supportsTouch && !$r.supportsIePointer)
    return;
  var t = e.element;
  function n(w, A) {
    var D = Math.floor(t.scrollTop), N = t.scrollLeft, I = Math.abs(w), F = Math.abs(A);
    if (F > I) {
      if (A < 0 && D === e.contentHeight - e.containerHeight || A > 0 && D === 0)
        return window.scrollY === 0 && A > 0 && $r.isChrome;
    } else if (I > F && (w < 0 && N === e.contentWidth - e.containerWidth || w > 0 && N === 0))
      return !0;
    return !0;
  }
  function r(w, A) {
    t.scrollTop -= A, t.scrollLeft -= w, In(e);
  }
  var o = {}, a = 0, c = {}, d = null;
  function p(w) {
    return w.targetTouches ? w.targetTouches[0] : w;
  }
  function g(w) {
    return w.pointerType && w.pointerType === "pen" && w.buttons === 0 ? !1 : !!(w.targetTouches && w.targetTouches.length === 1 || w.pointerType && w.pointerType !== "mouse" && w.pointerType !== w.MSPOINTER_TYPE_MOUSE);
  }
  function y(w) {
    if (g(w)) {
      var A = p(w);
      o.pageX = A.pageX, o.pageY = A.pageY, a = new Date().getTime(), d !== null && clearInterval(d);
    }
  }
  function C(w, A, D) {
    if (!t.contains(w))
      return !1;
    for (var N = w; N && N !== t; ) {
      if (N.classList.contains(lt.element.consuming))
        return !0;
      var I = mn(N);
      if (D && I.overflowY.match(/(scroll|auto)/)) {
        var F = N.scrollHeight - N.clientHeight;
        if (F > 0 && (N.scrollTop > 0 && D < 0 || N.scrollTop < F && D > 0))
          return !0;
      }
      if (A && I.overflowX.match(/(scroll|auto)/)) {
        var J = N.scrollWidth - N.clientWidth;
        if (J > 0 && (N.scrollLeft > 0 && A < 0 || N.scrollLeft < J && A > 0))
          return !0;
      }
      N = N.parentNode;
    }
    return !1;
  }
  function b(w) {
    if (g(w)) {
      var A = p(w), D = { pageX: A.pageX, pageY: A.pageY }, N = D.pageX - o.pageX, I = D.pageY - o.pageY;
      if (C(w.target, N, I))
        return;
      r(N, I), o = D;
      var F = new Date().getTime(), J = F - a;
      J > 0 && (c.x = N / J, c.y = I / J, a = F), n(N, I) && w.preventDefault();
    }
  }
  function E() {
    e.settings.swipeEasing && (clearInterval(d), d = setInterval(function() {
      if (e.isInitialized) {
        clearInterval(d);
        return;
      }
      if (!c.x && !c.y) {
        clearInterval(d);
        return;
      }
      if (Math.abs(c.x) < 0.01 && Math.abs(c.y) < 0.01) {
        clearInterval(d);
        return;
      }
      if (!e.element) {
        clearInterval(d);
        return;
      }
      r(c.x * 30, c.y * 30), c.x *= 0.8, c.y *= 0.8;
    }, 10));
  }
  $r.supportsTouch ? (e.event.bind(t, "touchstart", y), e.event.bind(t, "touchmove", b), e.event.bind(t, "touchend", E)) : $r.supportsIePointer && (window.PointerEvent ? (e.event.bind(t, "pointerdown", y), e.event.bind(t, "pointermove", b), e.event.bind(t, "pointerup", E)) : window.MSPointerEvent && (e.event.bind(t, "MSPointerDown", y), e.event.bind(t, "MSPointerMove", b), e.event.bind(t, "MSPointerUp", E)));
}
var Pw = function() {
  return {
    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollingThreshold: 1e3,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: !1,
    suppressScrollY: !1,
    swipeEasing: !0,
    useBothWheelAxes: !1,
    wheelPropagation: !0,
    wheelSpeed: 1
  };
}, Nw = {
  "click-rail": Ew,
  "drag-thumb": Sw,
  keyboard: Ow,
  wheel: _w,
  touch: Aw
}, eo = function(t, n) {
  var r = this;
  if (n === void 0 && (n = {}), typeof t == "string" && (t = document.querySelector(t)), !t || !t.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t, t.classList.add(lt.main), this.settings = Pw();
  for (var o in n)
    this.settings[o] = n[o];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var a = function() {
    return t.classList.add(lt.state.focus);
  }, c = function() {
    return t.classList.remove(lt.state.focus);
  };
  this.isRtl = mn(t).direction === "rtl", this.isRtl === !0 && t.classList.add(lt.rtl), this.isNegativeScroll = function() {
    var g = t.scrollLeft, y = null;
    return t.scrollLeft = -1, y = t.scrollLeft < 0, t.scrollLeft = g, y;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new ui(), this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = Ao(lt.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = Ao(lt.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", a), this.event.bind(this.scrollbarX, "blur", c), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var d = mn(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(d.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = it(d.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = it(d.borderLeftWidth) + it(d.borderRightWidth), Mt(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = it(d.marginLeft) + it(d.marginRight), Mt(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = Ao(lt.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = Ao(lt.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", a), this.event.bind(this.scrollbarY, "blur", c), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var p = mn(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(p.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = it(p.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? ww(this.scrollbarY) : null, this.railBorderYWidth = it(p.borderTopWidth) + it(p.borderBottomWidth), Mt(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = it(p.marginTop) + it(p.marginBottom), Mt(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = !0, this.settings.handlers.forEach(function(g) {
    return Nw[g](r);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(g) {
    return r.onScroll(g);
  }), In(this);
};
eo.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, Mt(this.scrollbarXRail, { display: "block" }), Mt(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = it(mn(this.scrollbarXRail).marginLeft) + it(mn(this.scrollbarXRail).marginRight), this.railYMarginHeight = it(mn(this.scrollbarYRail).marginTop) + it(mn(this.scrollbarYRail).marginBottom), Mt(this.scrollbarXRail, { display: "none" }), Mt(this.scrollbarYRail, { display: "none" }), In(this), Qo(this, "top", 0, !1, !0), Qo(this, "left", 0, !1, !0), Mt(this.scrollbarXRail, { display: "" }), Mt(this.scrollbarYRail, { display: "" }));
};
eo.prototype.onScroll = function(t) {
  this.isAlive && (In(this), Qo(this, "top", this.element.scrollTop - this.lastScrollTop), Qo(
    this,
    "left",
    this.element.scrollLeft - this.lastScrollLeft
  ), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
eo.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Hr(this.scrollbarX), Hr(this.scrollbarY), Hr(this.scrollbarXRail), Hr(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
};
eo.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t) {
    return !t.match(/^ps([-_].+|)$/);
  }).join(" ");
};
function kw() {
  let e;
  function t() {
    e && e.update();
  }
  return {
    bind(n) {
      e = new eo(n), window.addEventListener("resize", t);
    },
    unBind() {
      window.removeEventListener("resize", t);
    }
  };
}
const rd = kw(), Lw = /* @__PURE__ */ Ze({
  name: "ReplyModal",
  props: {
    /**
     * 帖子id
     */
    tid: {
      type: String,
      required: !0
    },
    /**
     * 回复id
     */
    pid: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    const t = Fe(!0), n = Fe(!0), r = Fe(null), o = Fe(), a = Fe([]);
    function c() {
      t.value = !1, rd.unBind();
    }
    function d() {
      lw(e.pid);
    }
    return Zt(() => {
      if (console.log(r.value), r.value) {
        const p = r.value;
        rd.bind(p);
      }
      n.value = !0, Ep.getCheckReply(e.tid, e.pid).then((p) => {
        n.value = !1;
        const {
          post_info: g,
          list: y
        } = p.data.result;
        console.log(g, y), o.value = g, a.value.push(...y);
      });
    }), () => L(Qt, {
      zIndex: Sr.value.length + 1e3,
      width: 800,
      wrapClassName: "reply-dialog",
      visible: t.value,
      mask: !1,
      maskClosable: !1,
      footer: null,
      closable: !1,
      keyboard: !0,
      onCancel: c,
      afterClose: d,
      destroyOnClose: !0,
      style: {
        left: "calc(50% - 400px)"
      }
    }, {
      default: () => [L("div", {
        class: "reply-dialog-body",
        ref: r
      }, [n.value ? L("div", {
        class: "is-loading"
      }, [L(Ri, {
        tip: "正在获取回复列表..."
      }, null)]) : L("div", null, [L(Qf, {
        isAuthor: !0,
        tid: e.tid,
        reply: o.value
      }, null), L(Ox, null, null), a.value.map((p) => L(Qf, {
        tid: e.tid,
        reply: p
      }, null))])]), L("div", {
        class: "reply-dialog-footer"
      }, [L(aw, null, {
        default: () => [cw.value ? L(Ln, {
          type: "link",
          onClick: uw
        }, {
          default: () => [Fs("关闭全部")]
        }) : null, L(Ln, {
          type: "primary",
          shape: "round",
          onClick: c,
          style: "width:128px;"
        }, {
          default: () => [Fs("关闭 (Esc)")]
        })]
      })])]
    });
  }
}), Rw = { class: "reply-dialog-list" }, Mw = /* @__PURE__ */ Ze({
  __name: "App",
  setup(e) {
    const t = Fe([]), n = (r) => {
      Ga(".bbs-post-wrapper.light").find(".bbs-post-wrapper-content").find(".post-reply-list").each((d, p) => {
        const y = Ga(p).find(".bbs-admin-reply-post-container").data("admininfo"), { pid: C } = y, b = t.value.find((A) => A.pid === C);
        if (!b || !b.check_reply_info)
          return;
        const E = document.createElement("div");
        E.classList.add("todo-list", "todo-list-reply-dialog");
        const w = document.createElement("span");
        w.classList.add("todo-list-text", "bold"), w.innerHTML = `弹框查看评论(${b.check_reply_info.num})`, E.append(w), E.addEventListener("click", () => {
          Fh(r, C);
        }), Ga(p).find(".post-reply-list-operate").append(E);
      });
    };
    return Zt(() => {
      const [r] = /(\d)+/.exec(location.pathname);
      Ep.getsThreadLightReplyList(r).then((o) => {
        t.value.push(...o.data.data.list), n(r);
      });
    }), (r, o) => (Ya(), oc("div", Rw, [
      (Ya(!0), oc(ft, null, am(ji(Sr), (a) => (Ya(), _m(ji(Lw), {
        key: a.pid,
        tid: a.tid,
        pid: a.pid
      }, null, 8, ["tid", "pid"]))), 128))
    ]));
  }
});
window.addEventListener("load", () => {
  const e = document.createElement("div");
  e.setAttribute("id", "hupu-bbs-ex"), document.body.appendChild(e), vy({
    render: () => Uo(Mw)
  }).mount(e);
});
