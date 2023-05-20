function fl(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const Wv = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Uv = /* @__PURE__ */ fl(Wv);
function rd(e) {
  return !!e || e === "";
}
function dl(e) {
  if (Le(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = vt(r) ? Yv(r) : dl(r);
      if (o)
        for (const a in o)
          t[a] = o[a];
    }
    return t;
  } else {
    if (vt(e))
      return e;
    if (gt(e))
      return e;
  }
}
const qv = /;(?![^(]*\))/g, zv = /:(.+)/;
function Yv(e) {
  const t = {};
  return e.split(qv).forEach((n) => {
    if (n) {
      const r = n.split(zv);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function pl(e) {
  let t = "";
  if (vt(e))
    t = e;
  else if (Le(e))
    for (let n = 0; n < e.length; n++) {
      const r = pl(e[n]);
      r && (t += r + " ");
    }
  else if (gt(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Je = {}, Ur = [], fn = () => {
}, Xv = () => !1, Vv = /^on[^a-z]/, ta = (e) => Vv.test(e), hl = (e) => e.startsWith("onUpdate:"), ht = Object.assign, vl = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Kv = Object.prototype.hasOwnProperty, He = (e, t) => Kv.call(e, t), Le = Array.isArray, Ai = (e) => na(e) === "[object Map]", Gv = (e) => na(e) === "[object Set]", Ie = (e) => typeof e == "function", vt = (e) => typeof e == "string", gl = (e) => typeof e == "symbol", gt = (e) => e !== null && typeof e == "object", id = (e) => gt(e) && Ie(e.then) && Ie(e.catch), Jv = Object.prototype.toString, na = (e) => Jv.call(e), Qv = (e) => na(e).slice(8, -1), Zv = (e) => na(e) === "[object Object]", ml = (e) => vt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ko = /* @__PURE__ */ fl(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ra = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, eg = /-(\w)/g, Xr = ra((e) => e.replace(eg, (t, n) => n ? n.toUpperCase() : "")), tg = /\B([A-Z])/g, ti = ra((e) => e.replace(tg, "-$1").toLowerCase()), od = ra((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ba = ra((e) => e ? `on${od(e)}` : ""), Ii = (e, t) => !Object.is(e, t), Wa = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Ho = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, ad = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Fu;
const ng = () => Fu || (Fu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let hn;
class rg {
  constructor(t = !1) {
    this.active = !0, this.effects = [], this.cleanups = [], !t && hn && (this.parent = hn, this.index = (hn.scopes || (hn.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = hn;
      try {
        return hn = this, t();
      } finally {
        hn = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    hn = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    hn = this.parent;
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
      if (this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.active = !1;
    }
  }
}
function ig(e, t = hn) {
  t && t.active && t.effects.push(e);
}
const yl = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, sd = (e) => (e.w & Qn) > 0, ld = (e) => (e.n & Qn) > 0, og = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Qn;
}, ag = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      sd(o) && !ld(o) ? o.delete(e) : t[n++] = o, o.w &= ~Qn, o.n &= ~Qn;
    }
    t.length = n;
  }
}, _s = /* @__PURE__ */ new WeakMap();
let Ei = 0, Qn = 1;
const As = 30;
let ln;
const br = Symbol(""), Ps = Symbol("");
class bl {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, ig(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ln, n = Kn;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ln, ln = this, Kn = !0, Qn = 1 << ++Ei, Ei <= As ? og(this) : Hu(this), this.fn();
    } finally {
      Ei <= As && ag(this), Qn = 1 << --Ei, ln = this.parent, Kn = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ln === this ? this.deferStop = !0 : this.active && (Hu(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Hu(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Kn = !0;
const ud = [];
function ni() {
  ud.push(Kn), Kn = !1;
}
function ri() {
  const e = ud.pop();
  Kn = e === void 0 ? !0 : e;
}
function zt(e, t, n) {
  if (Kn && ln) {
    let r = _s.get(e);
    r || _s.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = yl()), cd(o);
  }
}
function cd(e, t) {
  let n = !1;
  Ei <= As ? ld(e) || (e.n |= Qn, n = !sd(e)) : n = !e.has(ln), n && (e.add(ln), ln.deps.push(e));
}
function Nn(e, t, n, r, o, a) {
  const c = _s.get(e);
  if (!c)
    return;
  let d = [];
  if (t === "clear")
    d = [...c.values()];
  else if (n === "length" && Le(e))
    c.forEach((p, g) => {
      (g === "length" || g >= r) && d.push(p);
    });
  else
    switch (n !== void 0 && d.push(c.get(n)), t) {
      case "add":
        Le(e) ? ml(n) && d.push(c.get("length")) : (d.push(c.get(br)), Ai(e) && d.push(c.get(Ps)));
        break;
      case "delete":
        Le(e) || (d.push(c.get(br)), Ai(e) && d.push(c.get(Ps)));
        break;
      case "set":
        Ai(e) && d.push(c.get(br));
        break;
    }
  if (d.length === 1)
    d[0] && Ns(d[0]);
  else {
    const p = [];
    for (const g of d)
      g && p.push(...g);
    Ns(yl(p));
  }
}
function Ns(e, t) {
  const n = Le(e) ? e : [...e];
  for (const r of n)
    r.computed && Bu(r);
  for (const r of n)
    r.computed || Bu(r);
}
function Bu(e, t) {
  (e !== ln || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const sg = /* @__PURE__ */ fl("__proto__,__v_isRef,__isVue"), fd = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(gl)
), lg = /* @__PURE__ */ Cl(), ug = /* @__PURE__ */ Cl(!1, !0), cg = /* @__PURE__ */ Cl(!0), Wu = /* @__PURE__ */ fg();
function fg() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = qe(this);
      for (let a = 0, c = this.length; a < c; a++)
        zt(r, "get", a + "");
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
function Cl(e = !1, t = !1) {
  return function(r, o, a) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && a === (e ? t ? _g : gd : t ? vd : hd).get(r))
      return r;
    const c = Le(r);
    if (!e && c && He(Wu, o))
      return Reflect.get(Wu, o, a);
    const d = Reflect.get(r, o, a);
    return (gl(o) ? fd.has(o) : sg(o)) || (e || zt(r, "get", o), t) ? d : xt(d) ? c && ml(o) ? d : d.value : gt(d) ? e ? md(d) : dn(d) : d;
  };
}
const dg = /* @__PURE__ */ dd(), pg = /* @__PURE__ */ dd(!0);
function dd(e = !1) {
  return function(n, r, o, a) {
    let c = n[r];
    if (ji(c) && xt(c) && !xt(o))
      return !1;
    if (!e && !ji(o) && (ks(o) || (o = qe(o), c = qe(c)), !Le(n) && xt(c) && !xt(o)))
      return c.value = o, !0;
    const d = Le(n) && ml(r) ? Number(r) < n.length : He(n, r), p = Reflect.set(n, r, o, a);
    return n === qe(a) && (d ? Ii(o, c) && Nn(n, "set", r, o) : Nn(n, "add", r, o)), p;
  };
}
function hg(e, t) {
  const n = He(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Nn(e, "delete", t, void 0), r;
}
function vg(e, t) {
  const n = Reflect.has(e, t);
  return (!gl(t) || !fd.has(t)) && zt(e, "has", t), n;
}
function gg(e) {
  return zt(e, "iterate", Le(e) ? "length" : br), Reflect.ownKeys(e);
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
}, yg = /* @__PURE__ */ ht({}, pd, {
  get: ug,
  set: pg
}), xl = (e) => e, ia = (e) => Reflect.getPrototypeOf(e);
function vo(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = qe(e), a = qe(t);
  n || (t !== a && zt(o, "get", t), zt(o, "get", a));
  const { has: c } = ia(o), d = r ? xl : n ? El : Di;
  if (c.call(o, t))
    return d(e.get(t));
  if (c.call(o, a))
    return d(e.get(a));
  e !== o && e.get(t);
}
function go(e, t = !1) {
  const n = this.__v_raw, r = qe(n), o = qe(e);
  return t || (e !== o && zt(r, "has", e), zt(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function mo(e, t = !1) {
  return e = e.__v_raw, !t && zt(qe(e), "iterate", br), Reflect.get(e, "size", e);
}
function Uu(e) {
  e = qe(e);
  const t = qe(this);
  return ia(t).has.call(t, e) || (t.add(e), Nn(t, "add", e, e)), this;
}
function qu(e, t) {
  t = qe(t);
  const n = qe(this), { has: r, get: o } = ia(n);
  let a = r.call(n, e);
  a || (e = qe(e), a = r.call(n, e));
  const c = o.call(n, e);
  return n.set(e, t), a ? Ii(t, c) && Nn(n, "set", e, t) : Nn(n, "add", e, t), this;
}
function zu(e) {
  const t = qe(this), { has: n, get: r } = ia(t);
  let o = n.call(t, e);
  o || (e = qe(e), o = n.call(t, e)), r && r.call(t, e);
  const a = t.delete(e);
  return o && Nn(t, "delete", e, void 0), a;
}
function Yu() {
  const e = qe(this), t = e.size !== 0, n = e.clear();
  return t && Nn(e, "clear", void 0, void 0), n;
}
function yo(e, t) {
  return function(r, o) {
    const a = this, c = a.__v_raw, d = qe(c), p = t ? xl : e ? El : Di;
    return !e && zt(d, "iterate", br), c.forEach((g, b) => r.call(o, p(g), p(b), a));
  };
}
function bo(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, a = qe(o), c = Ai(a), d = e === "entries" || e === Symbol.iterator && c, p = e === "keys" && c, g = o[e](...r), b = n ? xl : t ? El : Di;
    return !t && zt(a, "iterate", p ? Ps : br), {
      // iterator protocol
      next() {
        const { value: C, done: y } = g.next();
        return y ? { value: C, done: y } : {
          value: d ? [b(C[0]), b(C[1])] : b(C),
          done: y
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Hn(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function bg() {
  const e = {
    get(a) {
      return vo(this, a);
    },
    get size() {
      return mo(this);
    },
    has: go,
    add: Uu,
    set: qu,
    delete: zu,
    clear: Yu,
    forEach: yo(!1, !1)
  }, t = {
    get(a) {
      return vo(this, a, !1, !0);
    },
    get size() {
      return mo(this);
    },
    has: go,
    add: Uu,
    set: qu,
    delete: zu,
    clear: Yu,
    forEach: yo(!1, !0)
  }, n = {
    get(a) {
      return vo(this, a, !0);
    },
    get size() {
      return mo(this, !0);
    },
    has(a) {
      return go.call(this, a, !0);
    },
    add: Hn(
      "add"
      /* ADD */
    ),
    set: Hn(
      "set"
      /* SET */
    ),
    delete: Hn(
      "delete"
      /* DELETE */
    ),
    clear: Hn(
      "clear"
      /* CLEAR */
    ),
    forEach: yo(!0, !1)
  }, r = {
    get(a) {
      return vo(this, a, !0, !0);
    },
    get size() {
      return mo(this, !0);
    },
    has(a) {
      return go.call(this, a, !0);
    },
    add: Hn(
      "add"
      /* ADD */
    ),
    set: Hn(
      "set"
      /* SET */
    ),
    delete: Hn(
      "delete"
      /* DELETE */
    ),
    clear: Hn(
      "clear"
      /* CLEAR */
    ),
    forEach: yo(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
    e[a] = bo(a, !1, !1), n[a] = bo(a, !0, !1), t[a] = bo(a, !1, !0), r[a] = bo(a, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
const [Cg, xg, wg, Tg] = /* @__PURE__ */ bg();
function wl(e, t) {
  const n = t ? e ? Tg : wg : e ? xg : Cg;
  return (r, o, a) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(He(n, o) && o in r ? n : r, o, a);
}
const Eg = {
  get: /* @__PURE__ */ wl(!1, !1)
}, Sg = {
  get: /* @__PURE__ */ wl(!1, !0)
}, Og = {
  get: /* @__PURE__ */ wl(!0, !1)
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
function dn(e) {
  return ji(e) ? e : Tl(e, !1, pd, Eg, hd);
}
function Ng(e) {
  return Tl(e, !1, yg, Sg, vd);
}
function md(e) {
  return Tl(e, !0, mg, Og, gd);
}
function Tl(e, t, n, r, o) {
  if (!gt(e) || e.__v_raw && !(t && e.__v_isReactive))
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
function qr(e) {
  return ji(e) ? qr(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ji(e) {
  return !!(e && e.__v_isReadonly);
}
function ks(e) {
  return !!(e && e.__v_isShallow);
}
function yd(e) {
  return qr(e) || ji(e);
}
function qe(e) {
  const t = e && e.__v_raw;
  return t ? qe(t) : e;
}
function bd(e) {
  return Ho(e, "__v_skip", !0), e;
}
const Di = (e) => gt(e) ? dn(e) : e, El = (e) => gt(e) ? md(e) : e;
function Cd(e) {
  Kn && ln && (e = qe(e), cd(e.dep || (e.dep = yl())));
}
function xd(e, t) {
  e = qe(e), e.dep && Ns(e.dep);
}
function xt(e) {
  return !!(e && e.__v_isRef === !0);
}
function $e(e) {
  return kg(e, !1);
}
function kg(e, t) {
  return xt(e) ? e : new Lg(e, t);
}
class Lg {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : qe(t), this._value = n ? t : Di(t);
  }
  get value() {
    return Cd(this), this._value;
  }
  set value(t) {
    t = this.__v_isShallow ? t : qe(t), Ii(t, this._rawValue) && (this._rawValue = t, this._value = this.__v_isShallow ? t : Di(t), xd(this));
  }
}
function $i(e) {
  return xt(e) ? e.value : e;
}
const Mg = {
  get: (e, t, n) => $i(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return xt(o) && !xt(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function wd(e) {
  return qr(e) ? e : new Proxy(e, Mg);
}
class Rg {
  constructor(t, n, r, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this._dirty = !0, this.effect = new bl(t, () => {
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
function Ig(e, t, n = !1) {
  let r, o;
  const a = Ie(e);
  return a ? (r = e, o = fn) : (r = e.get, o = e.set), new Rg(r, o, a || !o, n);
}
function Gn(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (a) {
    oa(a, t, n);
  }
  return o;
}
function Gt(e, t, n, r) {
  if (Ie(e)) {
    const a = Gn(e, t, n, r);
    return a && id(a) && a.catch((c) => {
      oa(c, t, n);
    }), a;
  }
  const o = [];
  for (let a = 0; a < e.length; a++)
    o.push(Gt(e[a], t, n, r));
  return o;
}
function oa(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let a = t.parent;
    const c = t.proxy, d = n;
    for (; a; ) {
      const g = a.ec;
      if (g) {
        for (let b = 0; b < g.length; b++)
          if (g[b](e, c, d) === !1)
            return;
      }
      a = a.parent;
    }
    const p = t.appContext.config.errorHandler;
    if (p) {
      Gn(p, null, 10, [e, c, d]);
      return;
    }
  }
  jg(e, n, o, r);
}
function jg(e, t, n, r = !0) {
  console.error(e);
}
let Bo = !1, Ls = !1;
const Ut = [];
let An = 0;
const Pi = [];
let Si = null, Ir = 0;
const Ni = [];
let Un = null, jr = 0;
const Td = /* @__PURE__ */ Promise.resolve();
let Sl = null, Ms = null;
function Mn(e) {
  const t = Sl || Td;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Dg(e) {
  let t = An + 1, n = Ut.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    Fi(Ut[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function Ed(e) {
  (!Ut.length || !Ut.includes(e, Bo && e.allowRecurse ? An + 1 : An)) && e !== Ms && (e.id == null ? Ut.push(e) : Ut.splice(Dg(e.id), 0, e), Sd());
}
function Sd() {
  !Bo && !Ls && (Ls = !0, Sl = Td.then(Ad));
}
function $g(e) {
  const t = Ut.indexOf(e);
  t > An && Ut.splice(t, 1);
}
function Od(e, t, n, r) {
  Le(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e), Sd();
}
function Fg(e) {
  Od(e, Si, Pi, Ir);
}
function Hg(e) {
  Od(e, Un, Ni, jr);
}
function aa(e, t = null) {
  if (Pi.length) {
    for (Ms = t, Si = [...new Set(Pi)], Pi.length = 0, Ir = 0; Ir < Si.length; Ir++)
      Si[Ir]();
    Si = null, Ir = 0, Ms = null, aa(e, t);
  }
}
function _d(e) {
  if (aa(), Ni.length) {
    const t = [...new Set(Ni)];
    if (Ni.length = 0, Un) {
      Un.push(...t);
      return;
    }
    for (Un = t, Un.sort((n, r) => Fi(n) - Fi(r)), jr = 0; jr < Un.length; jr++)
      Un[jr]();
    Un = null, jr = 0;
  }
}
const Fi = (e) => e.id == null ? 1 / 0 : e.id;
function Ad(e) {
  Ls = !1, Bo = !0, aa(e), Ut.sort((n, r) => Fi(n) - Fi(r));
  const t = fn;
  try {
    for (An = 0; An < Ut.length; An++) {
      const n = Ut[An];
      n && n.active !== !1 && Gn(
        n,
        null,
        14
        /* SCHEDULER */
      );
    }
  } finally {
    An = 0, Ut.length = 0, _d(), Bo = !1, Sl = null, (Ut.length || Pi.length || Ni.length) && Ad(e);
  }
}
function Bg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || Je;
  let o = n;
  const a = t.startsWith("update:"), c = a && t.slice(7);
  if (c && c in r) {
    const b = `${c === "modelValue" ? "model" : c}Modifiers`, { number: C, trim: y } = r[b] || Je;
    y && (o = n.map((T) => T.trim())), C && (o = n.map(ad));
  }
  let d, p = r[d = Ba(t)] || // also try camelCase event handler (#2249)
  r[d = Ba(Xr(t))];
  !p && a && (p = r[d = Ba(ti(t))]), p && Gt(p, e, 6, o);
  const g = r[d + "Once"];
  if (g) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[d])
      return;
    e.emitted[d] = !0, Gt(g, e, 6, o);
  }
}
function Pd(e, t, n = !1) {
  const r = t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const a = e.emits;
  let c = {}, d = !1;
  if (!Ie(e)) {
    const p = (g) => {
      const b = Pd(g, t, !0);
      b && (d = !0, ht(c, b));
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  return !a && !d ? (r.set(e, null), null) : (Le(a) ? a.forEach((p) => c[p] = null) : ht(c, a), r.set(e, c), c);
}
function sa(e, t) {
  return !e || !ta(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), He(e, t[0].toLowerCase() + t.slice(1)) || He(e, ti(t)) || He(e, t));
}
let un = null, Nd = null;
function Wo(e) {
  const t = un;
  return un = e, Nd = e && e.type.__scopeId || null, t;
}
function Wg(e, t = un, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && rc(-1);
    const a = Wo(t), c = e(...o);
    return Wo(a), r._d && rc(1), c;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ua(e) {
  const { type: t, vnode: n, proxy: r, withProxy: o, props: a, propsOptions: [c], slots: d, attrs: p, emit: g, render: b, renderCache: C, data: y, setupState: T, ctx: w, inheritAttrs: A } = e;
  let I, P;
  const j = Wo(e);
  try {
    if (n.shapeFlag & 4) {
      const Z = o || r;
      I = gn(b.call(Z, Z, C, a, T, y, w)), P = p;
    } else {
      const Z = t;
      I = gn(Z.length > 1 ? Z(a, { attrs: p, slots: d, emit: g }) : Z(
        a,
        null
        /* we know it doesn't need it */
      )), P = t.props ? p : Ug(p);
    }
  } catch (Z) {
    Li.length = 0, oa(
      Z,
      e,
      1
      /* RENDER_FUNCTION */
    ), I = L(yn);
  }
  let z = I;
  if (P && A !== !1) {
    const Z = Object.keys(P), { shapeFlag: H } = z;
    Z.length && H & 7 && (c && Z.some(hl) && (P = qg(P, c)), z = bn(z, P));
  }
  return n.dirs && (z = bn(z), z.dirs = z.dirs ? z.dirs.concat(n.dirs) : n.dirs), n.transition && (z.transition = n.transition), I = z, Wo(j), I;
}
const Ug = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ta(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, qg = (e, t) => {
  const n = {};
  for (const r in e)
    (!hl(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
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
      return r ? Xu(r, c, g) : !!c;
    if (p & 8) {
      const b = t.dynamicProps;
      for (let C = 0; C < b.length; C++) {
        const y = b[C];
        if (c[y] !== r[y] && !sa(g, y))
          return !0;
      }
    }
  } else
    return (o || d) && (!d || !d.$stable) ? !0 : r === c ? !1 : r ? c ? Xu(r, c, g) : !0 : !!c;
  return !1;
}
function Xu(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    if (t[a] !== e[a] && !sa(n, a))
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
  t && t.pendingBranch ? Le(e) ? t.effects.push(...e) : t.effects.push(e) : Hg(e);
}
function Vi(e, t) {
  if (mt) {
    let n = mt.provides;
    const r = mt.parent && mt.parent.provides;
    r === n && (n = mt.provides = Object.create(r)), n[e] = t;
  }
}
function Jn(e, t, n = !1) {
  const r = mt || un;
  if (r) {
    const o = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && Ie(t) ? t.call(r.proxy) : t;
  }
}
function Ki(e, t) {
  return Ol(e, null, t);
}
const Vu = {};
function qt(e, t, n) {
  return Ol(e, t, n);
}
function Ol(e, t, { immediate: n, deep: r, flush: o, onTrack: a, onTrigger: c } = Je) {
  const d = mt;
  let p, g = !1, b = !1;
  if (xt(e) ? (p = () => e.value, g = ks(e)) : qr(e) ? (p = () => e, r = !0) : Le(e) ? (b = !0, g = e.some((P) => qr(P) || ks(P)), p = () => e.map((P) => {
    if (xt(P))
      return P.value;
    if (qr(P))
      return mr(P);
    if (Ie(P))
      return Gn(
        P,
        d,
        2
        /* WATCH_GETTER */
      );
  })) : Ie(e) ? t ? p = () => Gn(
    e,
    d,
    2
    /* WATCH_GETTER */
  ) : p = () => {
    if (!(d && d.isUnmounted))
      return C && C(), Gt(e, d, 3, [y]);
  } : p = fn, t && r) {
    const P = p;
    p = () => mr(P());
  }
  let C, y = (P) => {
    C = I.onStop = () => {
      Gn(
        P,
        d,
        4
        /* WATCH_CLEANUP */
      );
    };
  };
  if (Ui)
    return y = fn, t ? n && Gt(t, d, 3, [
      p(),
      b ? [] : void 0,
      y
    ]) : p(), fn;
  let T = b ? [] : Vu;
  const w = () => {
    if (I.active)
      if (t) {
        const P = I.run();
        (r || g || (b ? P.some((j, z) => Ii(j, T[z])) : Ii(P, T))) && (C && C(), Gt(t, d, 3, [
          P,
          // pass undefined as the old value when it's changed for the first time
          T === Vu ? void 0 : T,
          y
        ]), T = P);
      } else
        I.run();
  };
  w.allowRecurse = !!t;
  let A;
  o === "sync" ? A = w : o === "post" ? A = () => Nt(w, d && d.suspense) : A = () => Fg(w);
  const I = new bl(p, A);
  return t ? n ? w() : T = I.run() : o === "post" ? Nt(I.run.bind(I), d && d.suspense) : I.run(), () => {
    I.stop(), d && d.scope && vl(d.scope.effects, I);
  };
}
function Kg(e, t, n) {
  const r = this.proxy, o = vt(e) ? e.includes(".") ? kd(r, e) : () => r[e] : e.bind(r, r);
  let a;
  Ie(t) ? a = t : (a = t.handler, n = t);
  const c = mt;
  Vr(this);
  const d = Ol(o, a.bind(r), n);
  return c ? Vr(c) : Cr(), d;
}
function kd(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function mr(e, t) {
  if (!gt(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), xt(e))
    mr(e.value, t);
  else if (Le(e))
    for (let n = 0; n < e.length; n++)
      mr(e[n], t);
  else if (Gv(e) || Ai(e))
    e.forEach((n) => {
      mr(n, t);
    });
  else if (Zv(e))
    for (const n in e)
      mr(e[n], t);
  return e;
}
function Ld() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Qt(() => {
    e.isMounted = !0;
  }), In(() => {
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
    const n = fa(), r = Ld();
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
        return qa(c);
      const g = Ku(c);
      if (!g)
        return qa(c);
      const b = Hi(g, d, r, n);
      Bi(g, b);
      const C = n.subTree, y = C && Ku(C);
      let T = !1;
      const { getTransitionKey: w } = g.type;
      if (w) {
        const A = w();
        o === void 0 ? o = A : A !== o && (o = A, T = !0);
      }
      if (y && y.type !== yn && (!hr(g, y) || T)) {
        const A = Hi(y, d, r, n);
        if (Bi(y, A), p === "out-in")
          return r.isLeaving = !0, A.afterLeave = () => {
            r.isLeaving = !1, n.update();
          }, qa(c);
        p === "in-out" && g.type !== yn && (A.delayLeave = (I, P, j) => {
          const z = Rd(r, y);
          z[String(y.key)] = y, I._leaveCb = () => {
            P(), I._leaveCb = void 0, delete b.delayedLeave;
          }, b.delayedLeave = j;
        });
      }
      return c;
    };
  }
}, Md = Gg;
function Rd(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Hi(e, t, n, r) {
  const { appear: o, mode: a, persisted: c = !1, onBeforeEnter: d, onEnter: p, onAfterEnter: g, onEnterCancelled: b, onBeforeLeave: C, onLeave: y, onAfterLeave: T, onLeaveCancelled: w, onBeforeAppear: A, onAppear: I, onAfterAppear: P, onAppearCancelled: j } = t, z = String(e.key), Z = Rd(n, e), H = (G, re) => {
    G && Gt(G, r, 9, re);
  }, u = (G, re) => {
    const de = re[1];
    H(G, re), Le(G) ? G.every((xe) => xe.length <= 1) && de() : G.length <= 1 && de();
  }, Y = {
    mode: a,
    persisted: c,
    beforeEnter(G) {
      let re = d;
      if (!n.isMounted)
        if (o)
          re = A || d;
        else
          return;
      G._leaveCb && G._leaveCb(
        !0
        /* cancelled */
      );
      const de = Z[z];
      de && hr(e, de) && de.el._leaveCb && de.el._leaveCb(), H(re, [G]);
    },
    enter(G) {
      let re = p, de = g, xe = b;
      if (!n.isMounted)
        if (o)
          re = I || p, de = P || g, xe = j || b;
        else
          return;
      let Q = !1;
      const he = G._enterCb = (Re) => {
        Q || (Q = !0, Re ? H(xe, [G]) : H(de, [G]), Y.delayedLeave && Y.delayedLeave(), G._enterCb = void 0);
      };
      re ? u(re, [G, he]) : he();
    },
    leave(G, re) {
      const de = String(e.key);
      if (G._enterCb && G._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return re();
      H(C, [G]);
      let xe = !1;
      const Q = G._leaveCb = (he) => {
        xe || (xe = !0, re(), he ? H(w, [G]) : H(T, [G]), G._leaveCb = void 0, Z[de] === e && delete Z[de]);
      };
      Z[de] = e, y ? u(y, [G, Q]) : Q();
    },
    clone(G) {
      return Hi(G, t, n, r);
    }
  };
  return Y;
}
function qa(e) {
  if (la(e))
    return e = bn(e), e.children = null, e;
}
function Ku(e) {
  return la(e) ? e.children ? e.children[0] : void 0 : e;
}
function Bi(e, t) {
  e.shapeFlag & 6 && e.component ? Bi(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function _l(e, t = !1, n) {
  let r = [], o = 0;
  for (let a = 0; a < e.length; a++) {
    let c = e[a];
    const d = n == null ? c.key : String(n) + String(c.key != null ? c.key : a);
    c.type === dt ? (c.patchFlag & 128 && o++, r = r.concat(_l(c.children, t, d))) : (t || c.type !== yn) && r.push(d != null ? bn(c, { key: d }) : c);
  }
  if (o > 1)
    for (let a = 0; a < r.length; a++)
      r[a].patchFlag = -2;
  return r;
}
function tt(e) {
  return Ie(e) ? { setup: e, name: e.name } : e;
}
const Lo = (e) => !!e.type.__asyncLoader, la = (e) => e.type.__isKeepAlive;
function Jg(e, t) {
  Id(e, "a", t);
}
function Qg(e, t) {
  Id(e, "da", t);
}
function Id(e, t, n = mt) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (ua(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      la(o.parent.vnode) && Zg(r, t, n, o), o = o.parent;
  }
}
function Zg(e, t, n, r) {
  const o = ua(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Al(() => {
    vl(r[t], o);
  }, n);
}
function ua(e, t, n = mt, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), a = t.__weh || (t.__weh = (...c) => {
      if (n.isUnmounted)
        return;
      ni(), Vr(n);
      const d = Gt(t, n, e, c);
      return Cr(), ri(), d;
    });
    return r ? o.unshift(a) : o.push(a), a;
  }
}
const Rn = (e) => (t, n = mt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Ui || e === "sp") && ua(e, t, n)
), jd = Rn(
  "bm"
  /* BEFORE_MOUNT */
), Qt = Rn(
  "m"
  /* MOUNTED */
), em = Rn(
  "bu"
  /* BEFORE_UPDATE */
), Gi = Rn(
  "u"
  /* UPDATED */
), In = Rn(
  "bum"
  /* BEFORE_UNMOUNT */
), Al = Rn(
  "um"
  /* UNMOUNTED */
), tm = Rn(
  "sp"
  /* SERVER_PREFETCH */
), nm = Rn(
  "rtg"
  /* RENDER_TRIGGERED */
), rm = Rn(
  "rtc"
  /* RENDER_TRACKED */
);
function im(e, t = mt) {
  ua("ec", e, t);
}
function Dd(e, t) {
  const n = un;
  if (n === null)
    return e;
  const r = da(n) || n.proxy, o = e.dirs || (e.dirs = []);
  for (let a = 0; a < t.length; a++) {
    let [c, d, p, g = Je] = t[a];
    Ie(c) && (c = {
      mounted: c,
      updated: c
    }), c.deep && mr(d), o.push({
      dir: c,
      instance: r,
      value: d,
      oldValue: void 0,
      arg: p,
      modifiers: g
    });
  }
  return e;
}
function cr(e, t, n, r) {
  const o = e.dirs, a = t && t.dirs;
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    a && (d.oldValue = a[c].value);
    let p = d.dir[r];
    p && (ni(), Gt(p, n, 8, [
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
  if (Le(e) || vt(e)) {
    o = new Array(e.length);
    for (let c = 0, d = e.length; c < d; c++)
      o[c] = t(e[c], c, void 0, a && a[c]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let c = 0; c < e; c++)
      o[c] = t(c + 1, c, void 0, a && a[c]);
  } else if (gt(e))
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
const Rs = (e) => e ? Gd(e) ? da(e) || e.proxy : Rs(e.parent) : null, Uo = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ht(/* @__PURE__ */ Object.create(null), {
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
    $options: (e) => Fd(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ed(e.update)),
    $nextTick: (e) => e.n || (e.n = Mn.bind(e.proxy)),
    $watch: (e) => Kg.bind(e)
  })
), sm = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: o, props: a, accessCache: c, type: d, appContext: p } = e;
    let g;
    if (t[0] !== "$") {
      const T = c[t];
      if (T !== void 0)
        switch (T) {
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
        if (r !== Je && He(r, t))
          return c[t] = 1, r[t];
        if (o !== Je && He(o, t))
          return c[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (g = e.propsOptions[0]) && He(g, t)
        )
          return c[t] = 3, a[t];
        if (n !== Je && He(n, t))
          return c[t] = 4, n[t];
        Is && (c[t] = 0);
      }
    }
    const b = Uo[t];
    let C, y;
    if (b)
      return t === "$attrs" && zt(e, "get", t), b(e);
    if (
      // css module (injected by vue-loader)
      (C = d.__cssModules) && (C = C[t])
    )
      return C;
    if (n !== Je && He(n, t))
      return c[t] = 4, n[t];
    if (
      // global properties
      y = p.config.globalProperties, He(y, t)
    )
      return y[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: a } = e;
    return o !== Je && He(o, t) ? (o[t] = n, !0) : r !== Je && He(r, t) ? (r[t] = n, !0) : He(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: a } }, c) {
    let d;
    return !!n[c] || e !== Je && He(e, c) || t !== Je && He(t, c) || (d = a[0]) && He(d, c) || He(r, c) || He(Uo, c) || He(o.config.globalProperties, c);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : He(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let Is = !0;
function lm(e) {
  const t = Fd(e), n = e.proxy, r = e.ctx;
  Is = !1, t.beforeCreate && Gu(
    t.beforeCreate,
    e,
    "bc"
    /* BEFORE_CREATE */
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
    created: b,
    beforeMount: C,
    mounted: y,
    beforeUpdate: T,
    updated: w,
    activated: A,
    deactivated: I,
    beforeDestroy: P,
    beforeUnmount: j,
    destroyed: z,
    unmounted: Z,
    render: H,
    renderTracked: u,
    renderTriggered: Y,
    errorCaptured: G,
    serverPrefetch: re,
    // public API
    expose: de,
    inheritAttrs: xe,
    // assets
    components: Q,
    directives: he,
    filters: Re
  } = t;
  if (g && um(g, r, null, e.appContext.config.unwrapInjectedRef), c)
    for (const K in c) {
      const ae = c[K];
      Ie(ae) && (r[K] = ae.bind(n));
    }
  if (o) {
    const K = o.call(n, n);
    gt(K) && (e.data = dn(K));
  }
  if (Is = !0, a)
    for (const K in a) {
      const ae = a[K], ve = Ie(ae) ? ae.bind(n, n) : Ie(ae.get) ? ae.get.bind(n, n) : fn, ge = !Ie(ae) && Ie(ae.set) ? ae.set.bind(n) : fn, Ae = Me({
        get: ve,
        set: ge
      });
      Object.defineProperty(r, K, {
        enumerable: !0,
        configurable: !0,
        get: () => Ae.value,
        set: (We) => Ae.value = We
      });
    }
  if (d)
    for (const K in d)
      $d(d[K], r, n, K);
  if (p) {
    const K = Ie(p) ? p.call(n) : p;
    Reflect.ownKeys(K).forEach((ae) => {
      Vi(ae, K[ae]);
    });
  }
  b && Gu(
    b,
    e,
    "c"
    /* CREATED */
  );
  function B(K, ae) {
    Le(ae) ? ae.forEach((ve) => K(ve.bind(n))) : ae && K(ae.bind(n));
  }
  if (B(jd, C), B(Qt, y), B(em, T), B(Gi, w), B(Jg, A), B(Qg, I), B(im, G), B(rm, u), B(nm, Y), B(In, j), B(Al, Z), B(tm, re), Le(de))
    if (de.length) {
      const K = e.exposed || (e.exposed = {});
      de.forEach((ae) => {
        Object.defineProperty(K, ae, {
          get: () => n[ae],
          set: (ve) => n[ae] = ve
        });
      });
    } else
      e.exposed || (e.exposed = {});
  H && e.render === fn && (e.render = H), xe != null && (e.inheritAttrs = xe), Q && (e.components = Q), he && (e.directives = he);
}
function um(e, t, n = fn, r = !1) {
  Le(e) && (e = js(e));
  for (const o in e) {
    const a = e[o];
    let c;
    gt(a) ? "default" in a ? c = Jn(
      a.from || o,
      a.default,
      !0
      /* treat default function as factory */
    ) : c = Jn(a.from || o) : c = Jn(a), xt(c) && r ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => c.value,
      set: (d) => c.value = d
    }) : t[o] = c;
  }
}
function Gu(e, t, n) {
  Gt(Le(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function $d(e, t, n, r) {
  const o = r.includes(".") ? kd(n, r) : () => n[r];
  if (vt(e)) {
    const a = t[e];
    Ie(a) && qt(o, a);
  } else if (Ie(e))
    qt(o, e.bind(n));
  else if (gt(e))
    if (Le(e))
      e.forEach((a) => $d(a, t, n, r));
    else {
      const a = Ie(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ie(a) && qt(o, a, e);
    }
}
function Fd(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: o, optionsCache: a, config: { optionMergeStrategies: c } } = e.appContext, d = a.get(t);
  let p;
  return d ? p = d : !o.length && !n && !r ? p = t : (p = {}, o.length && o.forEach((g) => qo(p, g, c, !0)), qo(p, t, c)), a.set(t, p), p;
}
function qo(e, t, n, r = !1) {
  const { mixins: o, extends: a } = t;
  a && qo(e, a, n, !0), o && o.forEach((c) => qo(e, c, n, !0));
  for (const c in t)
    if (!(r && c === "expose")) {
      const d = cm[c] || n && n[c];
      e[c] = d ? d(e[c], t[c]) : t[c];
    }
  return e;
}
const cm = {
  data: Ju,
  props: pr,
  emits: pr,
  // objects
  methods: pr,
  computed: pr,
  // lifecycle
  beforeCreate: Tt,
  created: Tt,
  beforeMount: Tt,
  mounted: Tt,
  beforeUpdate: Tt,
  updated: Tt,
  beforeDestroy: Tt,
  beforeUnmount: Tt,
  destroyed: Tt,
  unmounted: Tt,
  activated: Tt,
  deactivated: Tt,
  errorCaptured: Tt,
  serverPrefetch: Tt,
  // assets
  components: pr,
  directives: pr,
  // watch
  watch: dm,
  // provide / inject
  provide: Ju,
  inject: fm
};
function Ju(e, t) {
  return t ? e ? function() {
    return ht(Ie(e) ? e.call(this, this) : e, Ie(t) ? t.call(this, this) : t);
  } : t : e;
}
function fm(e, t) {
  return pr(js(e), js(t));
}
function js(e) {
  if (Le(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Tt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function pr(e, t) {
  return e ? ht(ht(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function dm(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = ht(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Tt(e[r], t[r]);
  return n;
}
function pm(e, t, n, r = !1) {
  const o = {}, a = {};
  Ho(a, ca, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Hd(e, t, o, a);
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
      const b = e.vnode.dynamicProps;
      for (let C = 0; C < b.length; C++) {
        let y = b[C];
        if (sa(e.emitsOptions, y))
          continue;
        const T = t[y];
        if (p)
          if (He(a, y))
            T !== a[y] && (a[y] = T, g = !0);
          else {
            const w = Xr(y);
            o[w] = Ds(
              p,
              d,
              w,
              T,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          T !== a[y] && (a[y] = T, g = !0);
      }
    }
  } else {
    Hd(e, t, o, a) && (g = !0);
    let b;
    for (const C in d)
      (!t || // for camelCase
      !He(t, C) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((b = ti(C)) === C || !He(t, b))) && (p ? n && // for camelCase
      (n[C] !== void 0 || // for kebab-case
      n[b] !== void 0) && (o[C] = Ds(
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
        (!t || !He(t, C)) && (delete a[C], g = !0);
  }
  g && Nn(e, "set", "$attrs");
}
function Hd(e, t, n, r) {
  const [o, a] = e.propsOptions;
  let c = !1, d;
  if (t)
    for (let p in t) {
      if (ko(p))
        continue;
      const g = t[p];
      let b;
      o && He(o, b = Xr(p)) ? !a || !a.includes(b) ? n[b] = g : (d || (d = {}))[b] = g : sa(e.emitsOptions, p) || (!(p in r) || g !== r[p]) && (r[p] = g, c = !0);
    }
  if (a) {
    const p = qe(n), g = d || Je;
    for (let b = 0; b < a.length; b++) {
      const C = a[b];
      n[C] = Ds(o, p, C, g[C], e, !He(g, C));
    }
  }
  return c;
}
function Ds(e, t, n, r, o, a) {
  const c = e[n];
  if (c != null) {
    const d = He(c, "default");
    if (d && r === void 0) {
      const p = c.default;
      if (c.type !== Function && Ie(p)) {
        const { propsDefaults: g } = o;
        n in g ? r = g[n] : (Vr(o), r = g[n] = p.call(null, t), Cr());
      } else
        r = p;
    }
    c[
      0
      /* shouldCast */
    ] && (a && !d ? r = !1 : c[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === ti(n)) && (r = !0));
  }
  return r;
}
function Bd(e, t, n = !1) {
  const r = t.propsCache, o = r.get(e);
  if (o)
    return o;
  const a = e.props, c = {}, d = [];
  let p = !1;
  if (!Ie(e)) {
    const b = (C) => {
      p = !0;
      const [y, T] = Bd(C, t, !0);
      ht(c, y), T && d.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(b), e.extends && b(e.extends), e.mixins && e.mixins.forEach(b);
  }
  if (!a && !p)
    return r.set(e, Ur), Ur;
  if (Le(a))
    for (let b = 0; b < a.length; b++) {
      const C = Xr(a[b]);
      Qu(C) && (c[C] = Je);
    }
  else if (a)
    for (const b in a) {
      const C = Xr(b);
      if (Qu(C)) {
        const y = a[b], T = c[C] = Le(y) || Ie(y) ? { type: y } : y;
        if (T) {
          const w = tc(Boolean, T.type), A = tc(String, T.type);
          T[
            0
            /* shouldCast */
          ] = w > -1, T[
            1
            /* shouldCastTrue */
          ] = A < 0 || w < A, (w > -1 || He(T, "default")) && d.push(C);
        }
      }
    }
  const g = [c, d];
  return r.set(e, g), g;
}
function Qu(e) {
  return e[0] !== "$";
}
function Zu(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function ec(e, t) {
  return Zu(e) === Zu(t);
}
function tc(e, t) {
  return Le(t) ? t.findIndex((n) => ec(n, e)) : Ie(t) && ec(t, e) ? 0 : -1;
}
const Wd = (e) => e[0] === "_" || e === "$stable", Pl = (e) => Le(e) ? e.map(gn) : [gn(e)], vm = (e, t, n) => {
  if (t._n)
    return t;
  const r = Wg((...o) => Pl(t(...o)), n);
  return r._c = !1, r;
}, Ud = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Wd(o))
      continue;
    const a = e[o];
    if (Ie(a))
      t[o] = vm(o, a, r);
    else if (a != null) {
      const c = Pl(a);
      t[o] = () => c;
    }
  }
}, qd = (e, t) => {
  const n = Pl(t);
  e.slots.default = () => n;
}, gm = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = qe(t), Ho(t, "_", n)) : Ud(t, e.slots = {});
  } else
    e.slots = {}, t && qd(e, t);
  Ho(e.slots, ca, 1);
}, mm = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let a = !0, c = Je;
  if (r.shapeFlag & 32) {
    const d = t._;
    d ? n && d === 1 ? a = !1 : (ht(o, t), !n && d === 1 && delete o._) : (a = !t.$stable, Ud(t, o)), c = t;
  } else
    t && (qd(e, t), c = { default: 1 });
  if (a)
    for (const d in o)
      !Wd(d) && !(d in c) && delete o[d];
};
function zd() {
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
    Ie(r) || (r = Object.assign({}, r)), o != null && !gt(o) && (o = null);
    const a = zd(), c = /* @__PURE__ */ new Set();
    let d = !1;
    const p = a.app = {
      _uid: ym++,
      _component: r,
      _props: o,
      _container: null,
      _context: a,
      _instance: null,
      version: Fm,
      get config() {
        return a.config;
      },
      set config(g) {
      },
      use(g, ...b) {
        return c.has(g) || (g && Ie(g.install) ? (c.add(g), g.install(p, ...b)) : Ie(g) && (c.add(g), g(p, ...b))), p;
      },
      mixin(g) {
        return a.mixins.includes(g) || a.mixins.push(g), p;
      },
      component(g, b) {
        return b ? (a.components[g] = b, p) : a.components[g];
      },
      directive(g, b) {
        return b ? (a.directives[g] = b, p) : a.directives[g];
      },
      mount(g, b, C) {
        if (!d) {
          const y = L(r, o);
          return y.appContext = a, b && t ? t(y, g) : e(y, g, C), d = !0, p._container = g, g.__vue_app__ = p, da(y.component) || y.component.proxy;
        }
      },
      unmount() {
        d && (e(null, p._container), delete p._container.__vue_app__);
      },
      provide(g, b) {
        return a.provides[g] = b, p;
      }
    };
    return p;
  };
}
function $s(e, t, n, r, o = !1) {
  if (Le(e)) {
    e.forEach((y, T) => $s(y, t && (Le(t) ? t[T] : t), n, r, o));
    return;
  }
  if (Lo(r) && !o)
    return;
  const a = r.shapeFlag & 4 ? da(r.component) || r.component.proxy : r.el, c = o ? null : a, { i: d, r: p } = e, g = t && t.r, b = d.refs === Je ? d.refs = {} : d.refs, C = d.setupState;
  if (g != null && g !== p && (vt(g) ? (b[g] = null, He(C, g) && (C[g] = null)) : xt(g) && (g.value = null)), Ie(p))
    Gn(p, d, 12, [c, b]);
  else {
    const y = vt(p), T = xt(p);
    if (y || T) {
      const w = () => {
        if (e.f) {
          const A = y ? b[p] : p.value;
          o ? Le(A) && vl(A, a) : Le(A) ? A.includes(a) || A.push(a) : y ? (b[p] = [a], He(C, p) && (C[p] = b[p])) : (p.value = [a], e.k && (b[e.k] = p.value));
        } else
          y ? (b[p] = c, He(C, p) && (C[p] = c)) : T && (p.value = c, e.k && (b[e.k] = c));
      };
      c ? (w.id = -1, Nt(w, n)) : w();
    }
  }
}
const Nt = Vg;
function Cm(e) {
  return xm(e);
}
function xm(e, t) {
  const n = ng();
  n.__VUE__ = !0;
  const { insert: r, remove: o, patchProp: a, createElement: c, createText: d, createComment: p, setText: g, setElementText: b, parentNode: C, nextSibling: y, setScopeId: T = fn, cloneNode: w, insertStaticContent: A } = e, I = (S, k, W, D = null, X = null, se = null, fe = !1, oe = null, le = !!k.dynamicChildren) => {
    if (S === k)
      return;
    S && !hr(S, k) && (D = en(S), je(S, X, se, !0), S = null), k.patchFlag === -2 && (le = !1, k.dynamicChildren = null);
    const { type: ne, ref: ye, shapeFlag: pe } = k;
    switch (ne) {
      case Ji:
        P(S, k, W, D);
        break;
      case yn:
        j(S, k, W, D);
        break;
      case za:
        S == null && z(k, W, D, fe);
        break;
      case dt:
        he(S, k, W, D, X, se, fe, oe, le);
        break;
      default:
        pe & 1 ? u(S, k, W, D, X, se, fe, oe, le) : pe & 6 ? Re(S, k, W, D, X, se, fe, oe, le) : (pe & 64 || pe & 128) && ne.process(S, k, W, D, X, se, fe, oe, le, tn);
    }
    ye != null && X && $s(ye, S && S.ref, se, k || S, !k);
  }, P = (S, k, W, D) => {
    if (S == null)
      r(k.el = d(k.children), W, D);
    else {
      const X = k.el = S.el;
      k.children !== S.children && g(X, k.children);
    }
  }, j = (S, k, W, D) => {
    S == null ? r(k.el = p(k.children || ""), W, D) : k.el = S.el;
  }, z = (S, k, W, D) => {
    [S.el, S.anchor] = A(S.children, k, W, D, S.el, S.anchor);
  }, Z = ({ el: S, anchor: k }, W, D) => {
    let X;
    for (; S && S !== k; )
      X = y(S), r(S, W, D), S = X;
    r(k, W, D);
  }, H = ({ el: S, anchor: k }) => {
    let W;
    for (; S && S !== k; )
      W = y(S), o(S), S = W;
    o(k);
  }, u = (S, k, W, D, X, se, fe, oe, le) => {
    fe = fe || k.type === "svg", S == null ? Y(k, W, D, X, se, fe, oe, le) : de(S, k, X, se, fe, oe, le);
  }, Y = (S, k, W, D, X, se, fe, oe) => {
    let le, ne;
    const { type: ye, props: pe, shapeFlag: me, transition: Te, patchFlag: Fe, dirs: Ue } = S;
    if (S.el && w !== void 0 && Fe === -1)
      le = S.el = w(S.el);
    else {
      if (le = S.el = c(S.type, se, pe && pe.is, pe), me & 8 ? b(le, S.children) : me & 16 && re(S.children, le, null, D, X, se && ye !== "foreignObject", fe, oe), Ue && cr(S, null, D, "created"), pe) {
        for (const Xe in pe)
          Xe !== "value" && !ko(Xe) && a(le, Xe, null, pe[Xe], se, S.children, D, X, wt);
        "value" in pe && a(le, "value", null, pe.value), (ne = pe.onVnodeBeforeMount) && pn(ne, D, S);
      }
      G(le, S, S.scopeId, fe, D);
    }
    Ue && cr(S, null, D, "beforeMount");
    const ze = (!X || X && !X.pendingBranch) && Te && !Te.persisted;
    ze && Te.beforeEnter(le), r(le, k, W), ((ne = pe && pe.onVnodeMounted) || ze || Ue) && Nt(() => {
      ne && pn(ne, D, S), ze && Te.enter(le), Ue && cr(S, null, D, "mounted");
    }, X);
  }, G = (S, k, W, D, X) => {
    if (W && T(S, W), D)
      for (let se = 0; se < D.length; se++)
        T(S, D[se]);
    if (X) {
      let se = X.subTree;
      if (k === se) {
        const fe = X.vnode;
        G(S, fe, fe.scopeId, fe.slotScopeIds, X.parent);
      }
    }
  }, re = (S, k, W, D, X, se, fe, oe, le = 0) => {
    for (let ne = le; ne < S.length; ne++) {
      const ye = S[ne] = oe ? zn(S[ne]) : gn(S[ne]);
      I(null, ye, k, W, D, X, se, fe, oe);
    }
  }, de = (S, k, W, D, X, se, fe) => {
    const oe = k.el = S.el;
    let { patchFlag: le, dynamicChildren: ne, dirs: ye } = k;
    le |= S.patchFlag & 16;
    const pe = S.props || Je, me = k.props || Je;
    let Te;
    W && fr(W, !1), (Te = me.onVnodeBeforeUpdate) && pn(Te, W, k, S), ye && cr(k, S, W, "beforeUpdate"), W && fr(W, !0);
    const Fe = X && k.type !== "foreignObject";
    if (ne ? xe(S.dynamicChildren, ne, oe, W, D, Fe, se) : fe || ve(S, k, oe, null, W, D, Fe, se, !1), le > 0) {
      if (le & 16)
        Q(oe, k, pe, me, W, D, X);
      else if (le & 2 && pe.class !== me.class && a(oe, "class", null, me.class, X), le & 4 && a(oe, "style", pe.style, me.style, X), le & 8) {
        const Ue = k.dynamicProps;
        for (let ze = 0; ze < Ue.length; ze++) {
          const Xe = Ue[ze], Rt = pe[Xe], It = me[Xe];
          (It !== Rt || Xe === "value") && a(oe, Xe, Rt, It, X, S.children, W, D, wt);
        }
      }
      le & 1 && S.children !== k.children && b(oe, k.children);
    } else
      !fe && ne == null && Q(oe, k, pe, me, W, D, X);
    ((Te = me.onVnodeUpdated) || ye) && Nt(() => {
      Te && pn(Te, W, k, S), ye && cr(k, S, W, "updated");
    }, D);
  }, xe = (S, k, W, D, X, se, fe) => {
    for (let oe = 0; oe < k.length; oe++) {
      const le = S[oe], ne = k[oe], ye = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        le.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (le.type === dt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !hr(le, ne) || // - In the case of a component, it could contain anything.
        le.shapeFlag & 70) ? C(le.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          W
        )
      );
      I(le, ne, ye, null, D, X, se, fe, !0);
    }
  }, Q = (S, k, W, D, X, se, fe) => {
    if (W !== D) {
      for (const oe in D) {
        if (ko(oe))
          continue;
        const le = D[oe], ne = W[oe];
        le !== ne && oe !== "value" && a(S, oe, ne, le, fe, k.children, X, se, wt);
      }
      if (W !== Je)
        for (const oe in W)
          !ko(oe) && !(oe in D) && a(S, oe, W[oe], null, fe, k.children, X, se, wt);
      "value" in D && a(S, "value", W.value, D.value);
    }
  }, he = (S, k, W, D, X, se, fe, oe, le) => {
    const ne = k.el = S ? S.el : d(""), ye = k.anchor = S ? S.anchor : d("");
    let { patchFlag: pe, dynamicChildren: me, slotScopeIds: Te } = k;
    Te && (oe = oe ? oe.concat(Te) : Te), S == null ? (r(ne, W, D), r(ye, W, D), re(k.children, W, ye, X, se, fe, oe, le)) : pe > 0 && pe & 64 && me && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    S.dynamicChildren ? (xe(S.dynamicChildren, me, W, X, se, fe, oe), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (k.key != null || X && k === X.subTree) && Nl(
      S,
      k,
      !0
      /* shallow */
    )) : ve(S, k, W, ye, X, se, fe, oe, le);
  }, Re = (S, k, W, D, X, se, fe, oe, le) => {
    k.slotScopeIds = oe, S == null ? k.shapeFlag & 512 ? X.ctx.activate(k, W, D, fe, le) : ie(k, W, D, X, se, fe, le) : B(S, k, le);
  }, ie = (S, k, W, D, X, se, fe) => {
    const oe = S.component = Mm(S, D, X);
    if (la(S) && (oe.ctx.renderer = tn), Rm(oe), oe.asyncDep) {
      if (X && X.registerDep(oe, K), !S.el) {
        const le = oe.subTree = L(yn);
        j(null, le, k, W);
      }
      return;
    }
    K(oe, S, k, W, X, se, fe);
  }, B = (S, k, W) => {
    const D = k.component = S.component;
    if (zg(S, k, W))
      if (D.asyncDep && !D.asyncResolved) {
        ae(D, k, W);
        return;
      } else
        D.next = k, $g(D.update), D.update();
    else
      k.el = S.el, D.vnode = k;
  }, K = (S, k, W, D, X, se, fe) => {
    const oe = () => {
      if (S.isMounted) {
        let { next: ye, bu: pe, u: me, parent: Te, vnode: Fe } = S, Ue = ye, ze;
        fr(S, !1), ye ? (ye.el = Fe.el, ae(S, ye, fe)) : ye = Fe, pe && Wa(pe), (ze = ye.props && ye.props.onVnodeBeforeUpdate) && pn(ze, Te, ye, Fe), fr(S, !0);
        const Xe = Ua(S), Rt = S.subTree;
        S.subTree = Xe, I(
          Rt,
          Xe,
          // parent may have changed if it's in a teleport
          C(Rt.el),
          // anchor may have changed if it's in a fragment
          en(Rt),
          S,
          X,
          se
        ), ye.el = Xe.el, Ue === null && Yg(S, Xe.el), me && Nt(me, X), (ze = ye.props && ye.props.onVnodeUpdated) && Nt(() => pn(ze, Te, ye, Fe), X);
      } else {
        let ye;
        const { el: pe, props: me } = k, { bm: Te, m: Fe, parent: Ue } = S, ze = Lo(k);
        if (fr(S, !1), Te && Wa(Te), !ze && (ye = me && me.onVnodeBeforeMount) && pn(ye, Ue, k), fr(S, !0), pe && nr) {
          const Xe = () => {
            S.subTree = Ua(S), nr(pe, S.subTree, S, X, null);
          };
          ze ? k.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !S.isUnmounted && Xe()
          ) : Xe();
        } else {
          const Xe = S.subTree = Ua(S);
          I(null, Xe, W, D, S, X, se), k.el = Xe.el;
        }
        if (Fe && Nt(Fe, X), !ze && (ye = me && me.onVnodeMounted)) {
          const Xe = k;
          Nt(() => pn(ye, Ue, Xe), X);
        }
        (k.shapeFlag & 256 || Ue && Lo(Ue.vnode) && Ue.vnode.shapeFlag & 256) && S.a && Nt(S.a, X), S.isMounted = !0, k = W = D = null;
      }
    }, le = S.effect = new bl(
      oe,
      () => Ed(ne),
      S.scope
      // track it in component's effect scope
    ), ne = S.update = () => le.run();
    ne.id = S.uid, fr(S, !0), ne();
  }, ae = (S, k, W) => {
    k.component = S;
    const D = S.vnode.props;
    S.vnode = k, S.next = null, hm(S, k.props, D, W), mm(S, k.children, W), ni(), aa(void 0, S.update), ri();
  }, ve = (S, k, W, D, X, se, fe, oe, le = !1) => {
    const ne = S && S.children, ye = S ? S.shapeFlag : 0, pe = k.children, { patchFlag: me, shapeFlag: Te } = k;
    if (me > 0) {
      if (me & 128) {
        Ae(ne, pe, W, D, X, se, fe, oe, le);
        return;
      } else if (me & 256) {
        ge(ne, pe, W, D, X, se, fe, oe, le);
        return;
      }
    }
    Te & 8 ? (ye & 16 && wt(ne, X, se), pe !== ne && b(W, pe)) : ye & 16 ? Te & 16 ? Ae(ne, pe, W, D, X, se, fe, oe, le) : wt(ne, X, se, !0) : (ye & 8 && b(W, ""), Te & 16 && re(pe, W, D, X, se, fe, oe, le));
  }, ge = (S, k, W, D, X, se, fe, oe, le) => {
    S = S || Ur, k = k || Ur;
    const ne = S.length, ye = k.length, pe = Math.min(ne, ye);
    let me;
    for (me = 0; me < pe; me++) {
      const Te = k[me] = le ? zn(k[me]) : gn(k[me]);
      I(S[me], Te, W, null, X, se, fe, oe, le);
    }
    ne > ye ? wt(S, X, se, !0, !1, pe) : re(k, W, D, X, se, fe, oe, le, pe);
  }, Ae = (S, k, W, D, X, se, fe, oe, le) => {
    let ne = 0;
    const ye = k.length;
    let pe = S.length - 1, me = ye - 1;
    for (; ne <= pe && ne <= me; ) {
      const Te = S[ne], Fe = k[ne] = le ? zn(k[ne]) : gn(k[ne]);
      if (hr(Te, Fe))
        I(Te, Fe, W, null, X, se, fe, oe, le);
      else
        break;
      ne++;
    }
    for (; ne <= pe && ne <= me; ) {
      const Te = S[pe], Fe = k[me] = le ? zn(k[me]) : gn(k[me]);
      if (hr(Te, Fe))
        I(Te, Fe, W, null, X, se, fe, oe, le);
      else
        break;
      pe--, me--;
    }
    if (ne > pe) {
      if (ne <= me) {
        const Te = me + 1, Fe = Te < ye ? k[Te].el : D;
        for (; ne <= me; )
          I(null, k[ne] = le ? zn(k[ne]) : gn(k[ne]), W, Fe, X, se, fe, oe, le), ne++;
      }
    } else if (ne > me)
      for (; ne <= pe; )
        je(S[ne], X, se, !0), ne++;
    else {
      const Te = ne, Fe = ne, Ue = /* @__PURE__ */ new Map();
      for (ne = Fe; ne <= me; ne++) {
        const Qe = k[ne] = le ? zn(k[ne]) : gn(k[ne]);
        Qe.key != null && Ue.set(Qe.key, ne);
      }
      let ze, Xe = 0;
      const Rt = me - Fe + 1;
      let It = !1, jn = 0;
      const Dn = new Array(Rt);
      for (ne = 0; ne < Rt; ne++)
        Dn[ne] = 0;
      for (ne = Te; ne <= pe; ne++) {
        const Qe = S[ne];
        if (Xe >= Rt) {
          je(Qe, X, se, !0);
          continue;
        }
        let Ze;
        if (Qe.key != null)
          Ze = Ue.get(Qe.key);
        else
          for (ze = Fe; ze <= me; ze++)
            if (Dn[ze - Fe] === 0 && hr(Qe, k[ze])) {
              Ze = ze;
              break;
            }
        Ze === void 0 ? je(Qe, X, se, !0) : (Dn[Ze - Fe] = ne + 1, Ze >= jn ? jn = Ze : It = !0, I(Qe, k[Ze], W, null, X, se, fe, oe, le), Xe++);
      }
      const ui = It ? wm(Dn) : Ur;
      for (ze = ui.length - 1, ne = Rt - 1; ne >= 0; ne--) {
        const Qe = Fe + ne, Ze = k[Qe], _r = Qe + 1 < ye ? k[Qe + 1].el : D;
        Dn[ne] === 0 ? I(null, Ze, W, _r, X, se, fe, oe, le) : It && (ze < 0 || ne !== ui[ze] ? We(
          Ze,
          W,
          _r,
          2
          /* REORDER */
        ) : ze--);
      }
    }
  }, We = (S, k, W, D, X = null) => {
    const { el: se, type: fe, transition: oe, children: le, shapeFlag: ne } = S;
    if (ne & 6) {
      We(S.component.subTree, k, W, D);
      return;
    }
    if (ne & 128) {
      S.suspense.move(k, W, D);
      return;
    }
    if (ne & 64) {
      fe.move(S, k, W, tn);
      return;
    }
    if (fe === dt) {
      r(se, k, W);
      for (let pe = 0; pe < le.length; pe++)
        We(le[pe], k, W, D);
      r(S.anchor, k, W);
      return;
    }
    if (fe === za) {
      Z(S, k, W);
      return;
    }
    if (D !== 2 && ne & 1 && oe)
      if (D === 0)
        oe.beforeEnter(se), r(se, k, W), Nt(() => oe.enter(se), X);
      else {
        const { leave: pe, delayLeave: me, afterLeave: Te } = oe, Fe = () => r(se, k, W), Ue = () => {
          pe(se, () => {
            Fe(), Te && Te();
          });
        };
        me ? me(se, Fe, Ue) : Ue();
      }
    else
      r(se, k, W);
  }, je = (S, k, W, D = !1, X = !1) => {
    const { type: se, props: fe, ref: oe, children: le, dynamicChildren: ne, shapeFlag: ye, patchFlag: pe, dirs: me } = S;
    if (oe != null && $s(oe, null, W, S, !0), ye & 256) {
      k.ctx.deactivate(S);
      return;
    }
    const Te = ye & 1 && me, Fe = !Lo(S);
    let Ue;
    if (Fe && (Ue = fe && fe.onVnodeBeforeUnmount) && pn(Ue, k, S), ye & 6)
      ot(S.component, W, D);
    else {
      if (ye & 128) {
        S.suspense.unmount(W, D);
        return;
      }
      Te && cr(S, null, k, "beforeUnmount"), ye & 64 ? S.type.remove(S, k, W, X, tn, D) : ne && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (se !== dt || pe > 0 && pe & 64) ? wt(ne, k, W, !1, !0) : (se === dt && pe & 384 || !X && ye & 16) && wt(le, k, W), D && ut(S);
    }
    (Fe && (Ue = fe && fe.onVnodeUnmounted) || Te) && Nt(() => {
      Ue && pn(Ue, k, S), Te && cr(S, null, k, "unmounted");
    }, W);
  }, ut = (S) => {
    const { type: k, el: W, anchor: D, transition: X } = S;
    if (k === dt) {
      at(W, D);
      return;
    }
    if (k === za) {
      H(S);
      return;
    }
    const se = () => {
      o(W), X && !X.persisted && X.afterLeave && X.afterLeave();
    };
    if (S.shapeFlag & 1 && X && !X.persisted) {
      const { leave: fe, delayLeave: oe } = X, le = () => fe(W, se);
      oe ? oe(S.el, se, le) : le();
    } else
      se();
  }, at = (S, k) => {
    let W;
    for (; S !== k; )
      W = y(S), o(S), S = W;
    o(k);
  }, ot = (S, k, W) => {
    const { bum: D, scope: X, update: se, subTree: fe, um: oe } = S;
    D && Wa(D), X.stop(), se && (se.active = !1, je(fe, S, k, W)), oe && Nt(oe, k), Nt(() => {
      S.isUnmounted = !0;
    }, k), k && k.pendingBranch && !k.isUnmounted && S.asyncDep && !S.asyncResolved && S.suspenseId === k.pendingId && (k.deps--, k.deps === 0 && k.resolve());
  }, wt = (S, k, W, D = !1, X = !1, se = 0) => {
    for (let fe = se; fe < S.length; fe++)
      je(S[fe], k, W, D, X);
  }, en = (S) => S.shapeFlag & 6 ? en(S.component.subTree) : S.shapeFlag & 128 ? S.suspense.next() : y(S.anchor || S.el), Ot = (S, k, W) => {
    S == null ? k._vnode && je(k._vnode, null, null, !0) : I(k._vnode || null, S, k, null, null, null, W), _d(), k._vnode = S;
  }, tn = {
    p: I,
    um: je,
    m: We,
    r: ut,
    mt: ie,
    mc: re,
    pc: ve,
    pbc: xe,
    n: en,
    o: e
  };
  let tr, nr;
  return t && ([tr, nr] = t(tn)), {
    render: Ot,
    hydrate: tr,
    createApp: bm(Ot, tr)
  };
}
function fr({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Nl(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (Le(r) && Le(o))
    for (let a = 0; a < r.length; a++) {
      const c = r[a];
      let d = o[a];
      d.shapeFlag & 1 && !d.dynamicChildren && ((d.patchFlag <= 0 || d.patchFlag === 32) && (d = o[a] = zn(o[a]), d.el = c.el), n || Nl(c, d));
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
const Tm = (e) => e.__isTeleport, ki = (e) => e && (e.disabled || e.disabled === ""), nc = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Fs = (e, t) => {
  const n = e && e.to;
  return vt(n) ? t ? t(n) : null : n;
}, Em = {
  __isTeleport: !0,
  process(e, t, n, r, o, a, c, d, p, g) {
    const { mc: b, pc: C, pbc: y, o: { insert: T, querySelector: w, createText: A, createComment: I } } = g, P = ki(t.props);
    let { shapeFlag: j, children: z, dynamicChildren: Z } = t;
    if (e == null) {
      const H = t.el = A(""), u = t.anchor = A("");
      T(H, n, r), T(u, n, r);
      const Y = t.target = Fs(t.props, w), G = t.targetAnchor = A("");
      Y && (T(G, Y), c = c || nc(Y));
      const re = (de, xe) => {
        j & 16 && b(z, de, xe, o, a, c, d, p);
      };
      P ? re(n, u) : Y && re(Y, G);
    } else {
      t.el = e.el;
      const H = t.anchor = e.anchor, u = t.target = e.target, Y = t.targetAnchor = e.targetAnchor, G = ki(e.props), re = G ? n : u, de = G ? H : Y;
      if (c = c || nc(u), Z ? (y(e.dynamicChildren, Z, re, o, a, c, d), Nl(e, t, !0)) : p || C(e, t, re, de, o, a, c, d, !1), P)
        G || Co(
          t,
          n,
          H,
          g,
          1
          /* TOGGLE */
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const xe = t.target = Fs(t.props, w);
        xe && Co(
          t,
          xe,
          null,
          g,
          0
          /* TARGET_CHANGE */
        );
      } else
        G && Co(
          t,
          u,
          Y,
          g,
          1
          /* TOGGLE */
        );
    }
  },
  remove(e, t, n, r, { um: o, o: { remove: a } }, c) {
    const { shapeFlag: d, children: p, anchor: g, targetAnchor: b, target: C, props: y } = e;
    if (C && a(b), (c || !ki(y)) && (a(g), d & 16))
      for (let T = 0; T < p.length; T++) {
        const w = p[T];
        o(w, t, n, !0, !!w.dynamicChildren);
      }
  },
  move: Co,
  hydrate: Sm
};
function Co(e, t, n, { o: { insert: r }, m: o }, a = 2) {
  a === 0 && r(e.targetAnchor, t, n);
  const { el: c, anchor: d, shapeFlag: p, children: g, props: b } = e, C = a === 2;
  if (C && r(c, t, n), (!C || ki(b)) && p & 16)
    for (let y = 0; y < g.length; y++)
      o(
        g[y],
        t,
        n,
        2
        /* REORDER */
      );
  C && r(d, t, n);
}
function Sm(e, t, n, r, o, a, { o: { nextSibling: c, parentNode: d, querySelector: p } }, g) {
  const b = t.target = Fs(t.props, p);
  if (b) {
    const C = b._lpa || b.firstChild;
    if (t.shapeFlag & 16)
      if (ki(t.props))
        t.anchor = g(c(e), t, d(e), n, r, o, a), t.targetAnchor = C;
      else {
        t.anchor = c(e);
        let y = C;
        for (; y; )
          if (y = c(y), y && y.nodeType === 8 && y.data === "teleport anchor") {
            t.targetAnchor = y, b._lpa = t.targetAnchor && c(t.targetAnchor);
            break;
          }
        g(C, t, b, n, r, o, a);
      }
  }
  return t.anchor && c(t.anchor);
}
const Yd = Em, dt = Symbol(void 0), Ji = Symbol(void 0), yn = Symbol(void 0), za = Symbol(void 0), Li = [];
let cn = null;
function Ya(e = !1) {
  Li.push(cn = e ? null : []);
}
function Om() {
  Li.pop(), cn = Li[Li.length - 1] || null;
}
let Wi = 1;
function rc(e) {
  Wi += e;
}
function Xd(e) {
  return e.dynamicChildren = Wi > 0 ? cn || Ur : null, Om(), Wi > 0 && cn && cn.push(e), e;
}
function ic(e, t, n, r, o, a) {
  return Xd(Kd(
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
  return Xd(L(
    e,
    t,
    n,
    r,
    o,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function Zn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function hr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ca = "__vInternal", Vd = ({ key: e }) => e ?? null, Mo = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? vt(e) || xt(e) || Ie(e) ? { i: un, r: e, k: t, f: !!n } : e : null;
function Kd(e, t = null, n = null, r = 0, o = null, a = e === dt ? 0 : 1, c = !1, d = !1) {
  const p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Vd(t),
    ref: t && Mo(t),
    scopeId: Nd,
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
    appContext: null
  };
  return d ? (kl(p, n), a & 128 && e.normalize(p)) : n && (p.shapeFlag |= vt(n) ? 8 : 16), Wi > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  cn && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (p.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  p.patchFlag !== 32 && cn.push(p), p;
}
const L = Am;
function Am(e, t = null, n = null, r = 0, o = null, a = !1) {
  if ((!e || e === om) && (e = yn), Zn(e)) {
    const d = bn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && kl(d, n), Wi > 0 && !a && cn && (d.shapeFlag & 6 ? cn[cn.indexOf(e)] = d : cn.push(d)), d.patchFlag |= -2, d;
  }
  if ($m(e) && (e = e.__vccOpts), t) {
    t = Pm(t);
    let { class: d, style: p } = t;
    d && !vt(d) && (t.class = pl(d)), gt(p) && (yd(p) && !Le(p) && (p = ht({}, p)), t.style = dl(p));
  }
  const c = vt(e) ? 1 : Xg(e) ? 128 : Tm(e) ? 64 : gt(e) ? 4 : Ie(e) ? 2 : 0;
  return Kd(e, t, n, r, o, c, a, !0);
}
function Pm(e) {
  return e ? yd(e) || ca in e ? ht({}, e) : e : null;
}
function bn(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: a, children: c } = e, d = t ? Nm(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Vd(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? Le(o) ? o.concat(Mo(t)) : [o, Mo(t)] : Mo(t)
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
    patchFlag: t && e.type !== dt ? a === -1 ? 16 : a | 16 : a,
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
    anchor: e.anchor
  };
}
function Hs(e = " ", t = 0) {
  return L(Ji, null, e, t);
}
function gn(e) {
  return e == null || typeof e == "boolean" ? L(yn) : Le(e) ? L(
    dt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? zn(e) : L(Ji, null, String(e));
}
function zn(e) {
  return e.el === null || e.memo ? e : bn(e);
}
function kl(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (Le(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), kl(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(ca in t) ? t._ctx = un : o === 3 && un && (un.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    Ie(t) ? (t = { default: t, _ctx: un }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Hs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Nm(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = pl([t.class, r.class]));
      else if (o === "style")
        t.style = dl([t.style, r.style]);
      else if (ta(o)) {
        const a = t[o], c = r[o];
        c && a !== c && !(Le(a) && a.includes(c)) && (t[o] = a ? [].concat(a, c) : c);
      } else
        o !== "" && (t[o] = r[o]);
  }
  return t;
}
function pn(e, t, n, r = null) {
  Gt(e, t, 7, [
    n,
    r
  ]);
}
const km = zd();
let Lm = 0;
function Mm(e, t, n) {
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
    propsOptions: Bd(r, o),
    emitsOptions: Pd(r, o),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: Je,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Je,
    data: Je,
    props: Je,
    attrs: Je,
    slots: Je,
    refs: Je,
    setupState: Je,
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
let mt = null;
const fa = () => mt || un, Vr = (e) => {
  mt = e, e.scope.on();
}, Cr = () => {
  mt && mt.scope.off(), mt = null;
};
function Gd(e) {
  return e.vnode.shapeFlag & 4;
}
let Ui = !1;
function Rm(e, t = !1) {
  Ui = t;
  const { props: n, children: r } = e.vnode, o = Gd(e);
  pm(e, n, o, t), gm(e, r);
  const a = o ? Im(e, t) : void 0;
  return Ui = !1, a;
}
function Im(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = bd(new Proxy(e.ctx, sm));
  const { setup: r } = n;
  if (r) {
    const o = e.setupContext = r.length > 1 ? Dm(e) : null;
    Vr(e), ni();
    const a = Gn(r, e, 0, [e.props, o]);
    if (ri(), Cr(), id(a)) {
      if (a.then(Cr, Cr), t)
        return a.then((c) => {
          oc(e, c, t);
        }).catch((c) => {
          oa(
            c,
            e,
            0
            /* SETUP_FUNCTION */
          );
        });
      e.asyncDep = a;
    } else
      oc(e, a, t);
  } else
    Jd(e, t);
}
function oc(e, t, n) {
  Ie(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : gt(t) && (e.setupState = wd(t)), Jd(e, n);
}
let ac;
function Jd(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && ac && !r.render) {
      const o = r.template;
      if (o) {
        const { isCustomElement: a, compilerOptions: c } = e.appContext.config, { delimiters: d, compilerOptions: p } = r, g = ht(ht({
          isCustomElement: a,
          delimiters: d
        }, c), p);
        r.render = ac(o, g);
      }
    }
    e.render = r.render || fn;
  }
  Vr(e), ni(), lm(e), ri(), Cr();
}
function jm(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return zt(e, "get", "$attrs"), t[n];
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
function da(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(wd(bd(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Uo)
          return Uo[n](e);
      }
    }));
}
function $m(e) {
  return Ie(e) && "__vccOpts" in e;
}
const Me = (e, t) => Ig(e, t, Ui);
function zo(e, t, n) {
  const r = arguments.length;
  return r === 2 ? gt(t) && !Le(t) ? Zn(t) ? L(e, null, [t]) : L(e, t) : L(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Zn(n) && (n = [n]), L(e, t, n));
}
const Fm = "3.2.37", Hm = "http://www.w3.org/2000/svg", vr = typeof document < "u" ? document : null, sc = vr && /* @__PURE__ */ vr.createElement("template"), Bm = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t ? vr.createElementNS(Hm, e) : vr.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => vr.createTextNode(e),
  createComment: (e) => vr.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => vr.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  cloneNode(e) {
    const t = e.cloneNode(!0);
    return "_value" in e && (t._value = e._value), t;
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
      sc.innerHTML = r ? `<svg>${e}</svg>` : e;
      const d = sc.content;
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
function Wm(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Um(e, t, n) {
  const r = e.style, o = vt(n);
  if (n && !o) {
    for (const a in n)
      Bs(r, a, n[a]);
    if (t && !vt(t))
      for (const a in t)
        n[a] == null && Bs(r, a, "");
  } else {
    const a = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = a);
  }
}
const lc = /\s*!important$/;
function Bs(e, t, n) {
  if (Le(n))
    n.forEach((r) => Bs(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = qm(e, t);
    lc.test(n) ? e.setProperty(ti(r), n.replace(lc, ""), "important") : e[r] = n;
  }
}
const uc = ["Webkit", "Moz", "ms"], Xa = {};
function qm(e, t) {
  const n = Xa[t];
  if (n)
    return n;
  let r = Xr(t);
  if (r !== "filter" && r in e)
    return Xa[t] = r;
  r = od(r);
  for (let o = 0; o < uc.length; o++) {
    const a = uc[o] + r;
    if (a in e)
      return Xa[t] = a;
  }
  return t;
}
const cc = "http://www.w3.org/1999/xlink";
function zm(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(cc, t.slice(6, t.length)) : e.setAttributeNS(cc, t, n);
  else {
    const a = Uv(t);
    n == null || a && !rd(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : n);
  }
}
function Ym(e, t, n, r, o, a, c) {
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
    p === "boolean" ? n = rd(n) : n == null && p === "string" ? (n = "", d = !0) : p === "number" && (n = 0, d = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  d && e.removeAttribute(t);
}
const [Qd, Xm] = /* @__PURE__ */ (() => {
  let e = Date.now, t = !1;
  if (typeof window < "u") {
    Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
    const n = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(n && Number(n[1]) <= 53);
  }
  return [e, t];
})();
let Ws = 0;
const Vm = /* @__PURE__ */ Promise.resolve(), Km = () => {
  Ws = 0;
}, Gm = () => Ws || (Vm.then(Km), Ws = Qd());
function Jm(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Qm(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Zm(e, t, n, r, o = null) {
  const a = e._vei || (e._vei = {}), c = a[t];
  if (r && c)
    c.value = r;
  else {
    const [d, p] = ey(t);
    if (r) {
      const g = a[t] = ty(r, o);
      Jm(e, d, g, p);
    } else
      c && (Qm(e, d, c, p), a[t] = void 0);
  }
}
const fc = /(?:Once|Passive|Capture)$/;
function ey(e) {
  let t;
  if (fc.test(e)) {
    t = {};
    let n;
    for (; n = e.match(fc); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [ti(e.slice(2)), t];
}
function ty(e, t) {
  const n = (r) => {
    const o = r.timeStamp || Qd();
    (Xm || o >= n.attached - 1) && Gt(ny(r, n.value), t, 5, [r]);
  };
  return n.value = e, n.attached = Gm(), n;
}
function ny(e, t) {
  if (Le(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (o) => !o._stopped && r && r(o));
  } else
    return t;
}
const dc = /^on[a-z]/, ry = (e, t, n, r, o = !1, a, c, d, p) => {
  t === "class" ? Wm(e, r, o) : t === "style" ? Um(e, n, r) : ta(t) ? hl(t) || Zm(e, t, n, r, c) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : iy(e, t, r, o)) ? Ym(e, t, r, a, c, d, p) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), zm(e, t, r, o));
};
function iy(e, t, n, r) {
  return r ? !!(t === "innerHTML" || t === "textContent" || t in e && dc.test(t) && Ie(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || dc.test(t) && vt(n) ? !1 : t in e;
}
const Bn = "transition", yi = "animation", Qi = (e, { slots: t }) => zo(Md, ep(e), t);
Qi.displayName = "Transition";
const Zd = {
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
}, oy = Qi.props = /* @__PURE__ */ ht({}, Md.props, Zd), dr = (e, t = []) => {
  Le(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, pc = (e) => e ? Le(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function ep(e) {
  const t = {};
  for (const Q in e)
    Q in Zd || (t[Q] = e[Q]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: r, duration: o, enterFromClass: a = `${n}-enter-from`, enterActiveClass: c = `${n}-enter-active`, enterToClass: d = `${n}-enter-to`, appearFromClass: p = a, appearActiveClass: g = c, appearToClass: b = d, leaveFromClass: C = `${n}-leave-from`, leaveActiveClass: y = `${n}-leave-active`, leaveToClass: T = `${n}-leave-to` } = e, w = ay(o), A = w && w[0], I = w && w[1], { onBeforeEnter: P, onEnter: j, onEnterCancelled: z, onLeave: Z, onLeaveCancelled: H, onBeforeAppear: u = P, onAppear: Y = j, onAppearCancelled: G = z } = t, re = (Q, he, Re) => {
    qn(Q, he ? b : d), qn(Q, he ? g : c), Re && Re();
  }, de = (Q, he) => {
    Q._isLeaving = !1, qn(Q, C), qn(Q, T), qn(Q, y), he && he();
  }, xe = (Q) => (he, Re) => {
    const ie = Q ? Y : j, B = () => re(he, Q, Re);
    dr(ie, [he, B]), hc(() => {
      qn(he, Q ? p : a), _n(he, Q ? b : d), pc(ie) || vc(he, r, A, B);
    });
  };
  return ht(t, {
    onBeforeEnter(Q) {
      dr(P, [Q]), _n(Q, a), _n(Q, c);
    },
    onBeforeAppear(Q) {
      dr(u, [Q]), _n(Q, p), _n(Q, g);
    },
    onEnter: xe(!1),
    onAppear: xe(!0),
    onLeave(Q, he) {
      Q._isLeaving = !0;
      const Re = () => de(Q, he);
      _n(Q, C), np(), _n(Q, y), hc(() => {
        Q._isLeaving && (qn(Q, C), _n(Q, T), pc(Z) || vc(Q, r, I, Re));
      }), dr(Z, [Q, Re]);
    },
    onEnterCancelled(Q) {
      re(Q, !1), dr(z, [Q]);
    },
    onAppearCancelled(Q) {
      re(Q, !0), dr(G, [Q]);
    },
    onLeaveCancelled(Q) {
      de(Q), dr(H, [Q]);
    }
  });
}
function ay(e) {
  if (e == null)
    return null;
  if (gt(e))
    return [Va(e.enter), Va(e.leave)];
  {
    const t = Va(e);
    return [t, t];
  }
}
function Va(e) {
  return ad(e);
}
function _n(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function qn(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function hc(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let sy = 0;
function vc(e, t, n, r) {
  const o = e._endId = ++sy, a = () => {
    o === e._endId && r();
  };
  if (n)
    return setTimeout(a, n);
  const { type: c, timeout: d, propCount: p } = tp(e, t);
  if (!c)
    return r();
  const g = c + "end";
  let b = 0;
  const C = () => {
    e.removeEventListener(g, y), a();
  }, y = (T) => {
    T.target === e && ++b >= p && C();
  };
  setTimeout(() => {
    b < p && C();
  }, d + 1), e.addEventListener(g, y);
}
function tp(e, t) {
  const n = window.getComputedStyle(e), r = (w) => (n[w] || "").split(", "), o = r(Bn + "Delay"), a = r(Bn + "Duration"), c = gc(o, a), d = r(yi + "Delay"), p = r(yi + "Duration"), g = gc(d, p);
  let b = null, C = 0, y = 0;
  t === Bn ? c > 0 && (b = Bn, C = c, y = a.length) : t === yi ? g > 0 && (b = yi, C = g, y = p.length) : (C = Math.max(c, g), b = C > 0 ? c > g ? Bn : yi : null, y = b ? b === Bn ? a.length : p.length : 0);
  const T = b === Bn && /\b(transform|all)(,|$)/.test(n[Bn + "Property"]);
  return {
    type: b,
    timeout: C,
    propCount: y,
    hasTransform: T
  };
}
function gc(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => mc(n) + mc(e[r])));
}
function mc(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function np() {
  return document.body.offsetHeight;
}
const rp = /* @__PURE__ */ new WeakMap(), ip = /* @__PURE__ */ new WeakMap(), ly = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ ht({}, oy, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = fa(), r = Ld();
    let o, a;
    return Gi(() => {
      if (!o.length)
        return;
      const c = e.moveClass || `${e.name || "v"}-move`;
      if (!py(o[0].el, n.vnode.el, c))
        return;
      o.forEach(cy), o.forEach(fy);
      const d = o.filter(dy);
      np(), d.forEach((p) => {
        const g = p.el, b = g.style;
        _n(g, c), b.transform = b.webkitTransform = b.transitionDuration = "";
        const C = g._moveCb = (y) => {
          y && y.target !== g || (!y || /transform$/.test(y.propertyName)) && (g.removeEventListener("transitionend", C), g._moveCb = null, qn(g, c));
        };
        g.addEventListener("transitionend", C);
      });
    }), () => {
      const c = qe(e), d = ep(c);
      let p = c.tag || dt;
      o = a, a = t.default ? _l(t.default()) : [];
      for (let g = 0; g < a.length; g++) {
        const b = a[g];
        b.key != null && Bi(b, Hi(b, d, r, n));
      }
      if (o)
        for (let g = 0; g < o.length; g++) {
          const b = o[g];
          Bi(b, Hi(b, d, r, n)), rp.set(b, b.el.getBoundingClientRect());
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
  ip.set(e, e.el.getBoundingClientRect());
}
function dy(e) {
  const t = rp.get(e), n = ip.get(e), r = t.left - n.left, o = t.top - n.top;
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
  const { hasTransform: a } = tp(r);
  return o.removeChild(r), a;
}
const op = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : bi(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), bi(e, !0), r.enter(e)) : r.leave(e, () => {
      bi(e, !1);
    }) : bi(e, t));
  },
  beforeUnmount(e, { value: t }) {
    bi(e, t);
  }
};
function bi(e, t) {
  e.style.display = t ? e._vod : "none";
}
const hy = /* @__PURE__ */ ht({ patchProp: ry }, Bm);
let yc;
function ap() {
  return yc || (yc = Cm(hy));
}
const Yo = (...e) => {
  ap().render(...e);
}, vy = (...e) => {
  const t = ap().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = gy(r);
    if (!o)
      return;
    const a = t._component;
    !Ie(a) && !a.render && !a.template && (a.template = o.innerHTML), o.innerHTML = "";
    const c = n(o, !1, o instanceof SVGElement);
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), c;
  }, t;
};
function gy(e) {
  return vt(e) ? document.querySelector(e) : e;
}
var my = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function yy(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Us = {}, by = {
  get exports() {
    return Us;
  },
  set exports(e) {
    Us = e;
  }
};
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
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
    }, d = r.push, p = r.indexOf, g = {}, b = g.toString, C = g.hasOwnProperty, y = C.toString, T = y.call(Object), w = {}, A = function(s) {
      return typeof s == "function" && typeof s.nodeType != "number" && typeof s.item != "function";
    }, I = function(s) {
      return s != null && s === s.window;
    }, P = t.document, j = {
      type: !0,
      src: !0,
      nonce: !0,
      noModule: !0
    };
    function z(i, s, l) {
      l = l || P;
      var f, h, v = l.createElement("script");
      if (v.text = i, s)
        for (f in j)
          h = s[f] || s.getAttribute && s.getAttribute(f), h && v.setAttribute(f, h);
      l.head.appendChild(v).parentNode.removeChild(v);
    }
    function Z(i) {
      return i == null ? i + "" : typeof i == "object" || typeof i == "function" ? g[b.call(i)] || "object" : typeof i;
    }
    var H = "3.6.0", u = function(i, s) {
      return new u.fn.init(i, s);
    };
    u.fn = u.prototype = {
      // The current version of jQuery being used
      jquery: H,
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
      var i, s, l, f, h, v, m = arguments[0] || {}, O = 1, _ = arguments.length, M = !1;
      for (typeof m == "boolean" && (M = m, m = arguments[O] || {}, O++), typeof m != "object" && !A(m) && (m = {}), O === _ && (m = this, O--); O < _; O++)
        if ((i = arguments[O]) != null)
          for (s in i)
            f = i[s], !(s === "__proto__" || m === f) && (M && f && (u.isPlainObject(f) || (h = Array.isArray(f))) ? (l = m[s], h && !Array.isArray(l) ? v = [] : !h && !u.isPlainObject(l) ? v = {} : v = l, h = !1, m[s] = u.extend(M, v, f)) : f !== void 0 && (m[s] = f));
      return m;
    }, u.extend({
      // Unique for each copy of jQuery on the page
      expando: "jQuery" + (H + Math.random()).replace(/\D/g, ""),
      // Assume jQuery is ready without the ready module
      isReady: !0,
      error: function(i) {
        throw new Error(i);
      },
      noop: function() {
      },
      isPlainObject: function(i) {
        var s, l;
        return !i || b.call(i) !== "[object Object]" ? !1 : (s = o(i), s ? (l = C.call(s, "constructor") && s.constructor, typeof l == "function" && y.call(l) === T) : !0);
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
        z(i, { nonce: s && s.nonce }, l);
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
      var s = !!i && "length" in i && i.length, l = Z(i);
      return A(i) || I(i) ? !1 : l === "array" || s === 0 || typeof s == "number" && s > 0 && s - 1 in i;
    }
    var G = (
      /*!
       * Sizzle CSS Selector Engine v2.3.6
       * https://sizzlejs.com/
       *
       * Copyright JS Foundation and other contributors
       * Released under the MIT license
       * https://js.foundation/
       *
       * Date: 2021-02-16
       */
      function(i) {
        var s, l, f, h, v, m, O, _, M, F, ee, $, U, be, ke, Ce, ct, st, jt, Ve = "sizzle" + 1 * new Date(), Ne = i.document, At = 0, Be = 0, rt = co(), hi = co(), so = co(), Dt = co(), or = function(x, E) {
          return x === E && (ee = !0), 0;
        }, ar = {}.hasOwnProperty, Pt = [], $n = Pt.pop, Xt = Pt.push, Fn = Pt.push, Nu = Pt.slice, sr = function(x, E) {
          for (var N = 0, q = x.length; N < q; N++)
            if (x[N] === E)
              return N;
          return -1;
        }, Ma = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", Ye = "[\\x20\\t\\r\\n\\f]", lr = "(?:\\\\[\\da-fA-F]{1,6}" + Ye + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", ku = "\\[" + Ye + "*(" + lr + ")(?:" + Ye + // Operator (capture 2)
        "*([*^$|!~]?=)" + Ye + // "Attribute values must be CSS identifiers [capture 5]
        // or strings [capture 3 or capture 4]"
        `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + lr + "))|)" + Ye + "*\\]", Ra = ":(" + lr + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + ku + ")*)|.*)\\)|)", Av = new RegExp(Ye + "+", "g"), lo = new RegExp("^" + Ye + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Ye + "+$", "g"), Pv = new RegExp("^" + Ye + "*," + Ye + "*"), Lu = new RegExp("^" + Ye + "*([>+~]|" + Ye + ")" + Ye + "*"), Nv = new RegExp(Ye + "|>"), kv = new RegExp(Ra), Lv = new RegExp("^" + lr + "$"), uo = {
          ID: new RegExp("^#(" + lr + ")"),
          CLASS: new RegExp("^\\.(" + lr + ")"),
          TAG: new RegExp("^(" + lr + "|[*])"),
          ATTR: new RegExp("^" + ku),
          PSEUDO: new RegExp("^" + Ra),
          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + Ye + "*(even|odd|(([+-]|)(\\d*)n|)" + Ye + "*(?:([+-]|)" + Ye + "*(\\d+)|))" + Ye + "*\\)|)", "i"),
          bool: new RegExp("^(?:" + Ma + ")$", "i"),
          // For use in libraries implementing .is()
          // We use this for POS matching in `select`
          needsContext: new RegExp("^" + Ye + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + Ye + "*((?:-\\d)?\\d*)" + Ye + "*\\)|)(?=[^-]|$)", "i")
        }, Mv = /HTML$/i, Rv = /^(?:input|select|textarea|button)$/i, Iv = /^h\d$/i, vi = /^[^{]+\{\s*\[native \w/, jv = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Ia = /[+~]/, Tn = new RegExp("\\\\[\\da-fA-F]{1,6}" + Ye + "?|\\\\([^\\r\\n\\f])", "g"), En = function(x, E) {
          var N = "0x" + x.slice(1) - 65536;
          return E || // Replace a hexadecimal escape sequence with the encoded Unicode code point
          // Support: IE <=11+
          // For values outside the Basic Multilingual Plane (BMP), manually construct a
          // surrogate pair
          (N < 0 ? String.fromCharCode(N + 65536) : String.fromCharCode(N >> 10 | 55296, N & 1023 | 56320));
        }, Mu = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, Ru = function(x, E) {
          return E ? x === "\0" ? "�" : x.slice(0, -1) + "\\" + x.charCodeAt(x.length - 1).toString(16) + " " : "\\" + x;
        }, Iu = function() {
          $();
        }, Dv = po(
          function(x) {
            return x.disabled === !0 && x.nodeName.toLowerCase() === "fieldset";
          },
          { dir: "parentNode", next: "legend" }
        );
        try {
          Fn.apply(
            Pt = Nu.call(Ne.childNodes),
            Ne.childNodes
          ), Pt[Ne.childNodes.length].nodeType;
        } catch {
          Fn = {
            apply: Pt.length ? (
              // Leverage slice if possible
              function(E, N) {
                Xt.apply(E, Nu.call(N));
              }
            ) : (
              // Support: IE<9
              // Otherwise append directly
              function(E, N) {
                for (var q = E.length, R = 0; E[q++] = N[R++]; )
                  ;
                E.length = q - 1;
              }
            )
          };
        }
        function Ke(x, E, N, q) {
          var R, V, te, ue, ce, Ee, we, Oe = E && E.ownerDocument, De = E ? E.nodeType : 9;
          if (N = N || [], typeof x != "string" || !x || De !== 1 && De !== 9 && De !== 11)
            return N;
          if (!q && ($(E), E = E || U, ke)) {
            if (De !== 11 && (ce = jv.exec(x)))
              if (R = ce[1]) {
                if (De === 9)
                  if (te = E.getElementById(R)) {
                    if (te.id === R)
                      return N.push(te), N;
                  } else
                    return N;
                else if (Oe && (te = Oe.getElementById(R)) && jt(E, te) && te.id === R)
                  return N.push(te), N;
              } else {
                if (ce[2])
                  return Fn.apply(N, E.getElementsByTagName(x)), N;
                if ((R = ce[3]) && l.getElementsByClassName && E.getElementsByClassName)
                  return Fn.apply(N, E.getElementsByClassName(R)), N;
              }
            if (l.qsa && !Dt[x + " "] && (!Ce || !Ce.test(x)) && // Support: IE 8 only
            // Exclude object elements
            (De !== 1 || E.nodeName.toLowerCase() !== "object")) {
              if (we = x, Oe = E, De === 1 && (Nv.test(x) || Lu.test(x))) {
                for (Oe = Ia.test(x) && Da(E.parentNode) || E, (Oe !== E || !l.scope) && ((ue = E.getAttribute("id")) ? ue = ue.replace(Mu, Ru) : E.setAttribute("id", ue = Ve)), Ee = m(x), V = Ee.length; V--; )
                  Ee[V] = (ue ? "#" + ue : ":scope") + " " + fo(Ee[V]);
                we = Ee.join(",");
              }
              try {
                return Fn.apply(
                  N,
                  Oe.querySelectorAll(we)
                ), N;
              } catch {
                Dt(x, !0);
              } finally {
                ue === Ve && E.removeAttribute("id");
              }
            }
          }
          return _(x.replace(lo, "$1"), E, N, q);
        }
        function co() {
          var x = [];
          function E(N, q) {
            return x.push(N + " ") > f.cacheLength && delete E[x.shift()], E[N + " "] = q;
          }
          return E;
        }
        function rn(x) {
          return x[Ve] = !0, x;
        }
        function on(x) {
          var E = U.createElement("fieldset");
          try {
            return !!x(E);
          } catch {
            return !1;
          } finally {
            E.parentNode && E.parentNode.removeChild(E), E = null;
          }
        }
        function ja(x, E) {
          for (var N = x.split("|"), q = N.length; q--; )
            f.attrHandle[N[q]] = E;
        }
        function ju(x, E) {
          var N = E && x, q = N && x.nodeType === 1 && E.nodeType === 1 && x.sourceIndex - E.sourceIndex;
          if (q)
            return q;
          if (N) {
            for (; N = N.nextSibling; )
              if (N === E)
                return -1;
          }
          return x ? 1 : -1;
        }
        function $v(x) {
          return function(E) {
            var N = E.nodeName.toLowerCase();
            return N === "input" && E.type === x;
          };
        }
        function Fv(x) {
          return function(E) {
            var N = E.nodeName.toLowerCase();
            return (N === "input" || N === "button") && E.type === x;
          };
        }
        function Du(x) {
          return function(E) {
            return "form" in E ? E.parentNode && E.disabled === !1 ? "label" in E ? "label" in E.parentNode ? E.parentNode.disabled === x : E.disabled === x : E.isDisabled === x || // Where there is no isDisabled, check manually
            /* jshint -W018 */
            E.isDisabled !== !x && Dv(E) === x : E.disabled === x : "label" in E ? E.disabled === x : !1;
          };
        }
        function ur(x) {
          return rn(function(E) {
            return E = +E, rn(function(N, q) {
              for (var R, V = x([], N.length, E), te = V.length; te--; )
                N[R = V[te]] && (N[R] = !(q[R] = N[R]));
            });
          });
        }
        function Da(x) {
          return x && typeof x.getElementsByTagName < "u" && x;
        }
        l = Ke.support = {}, v = Ke.isXML = function(x) {
          var E = x && x.namespaceURI, N = x && (x.ownerDocument || x).documentElement;
          return !Mv.test(E || N && N.nodeName || "HTML");
        }, $ = Ke.setDocument = function(x) {
          var E, N, q = x ? x.ownerDocument || x : Ne;
          return q == U || q.nodeType !== 9 || !q.documentElement || (U = q, be = U.documentElement, ke = !v(U), Ne != U && (N = U.defaultView) && N.top !== N && (N.addEventListener ? N.addEventListener("unload", Iu, !1) : N.attachEvent && N.attachEvent("onunload", Iu)), l.scope = on(function(R) {
            return be.appendChild(R).appendChild(U.createElement("div")), typeof R.querySelectorAll < "u" && !R.querySelectorAll(":scope fieldset div").length;
          }), l.attributes = on(function(R) {
            return R.className = "i", !R.getAttribute("className");
          }), l.getElementsByTagName = on(function(R) {
            return R.appendChild(U.createComment("")), !R.getElementsByTagName("*").length;
          }), l.getElementsByClassName = vi.test(U.getElementsByClassName), l.getById = on(function(R) {
            return be.appendChild(R).id = Ve, !U.getElementsByName || !U.getElementsByName(Ve).length;
          }), l.getById ? (f.filter.ID = function(R) {
            var V = R.replace(Tn, En);
            return function(te) {
              return te.getAttribute("id") === V;
            };
          }, f.find.ID = function(R, V) {
            if (typeof V.getElementById < "u" && ke) {
              var te = V.getElementById(R);
              return te ? [te] : [];
            }
          }) : (f.filter.ID = function(R) {
            var V = R.replace(Tn, En);
            return function(te) {
              var ue = typeof te.getAttributeNode < "u" && te.getAttributeNode("id");
              return ue && ue.value === V;
            };
          }, f.find.ID = function(R, V) {
            if (typeof V.getElementById < "u" && ke) {
              var te, ue, ce, Ee = V.getElementById(R);
              if (Ee) {
                if (te = Ee.getAttributeNode("id"), te && te.value === R)
                  return [Ee];
                for (ce = V.getElementsByName(R), ue = 0; Ee = ce[ue++]; )
                  if (te = Ee.getAttributeNode("id"), te && te.value === R)
                    return [Ee];
              }
              return [];
            }
          }), f.find.TAG = l.getElementsByTagName ? function(R, V) {
            if (typeof V.getElementsByTagName < "u")
              return V.getElementsByTagName(R);
            if (l.qsa)
              return V.querySelectorAll(R);
          } : function(R, V) {
            var te, ue = [], ce = 0, Ee = V.getElementsByTagName(R);
            if (R === "*") {
              for (; te = Ee[ce++]; )
                te.nodeType === 1 && ue.push(te);
              return ue;
            }
            return Ee;
          }, f.find.CLASS = l.getElementsByClassName && function(R, V) {
            if (typeof V.getElementsByClassName < "u" && ke)
              return V.getElementsByClassName(R);
          }, ct = [], Ce = [], (l.qsa = vi.test(U.querySelectorAll)) && (on(function(R) {
            var V;
            be.appendChild(R).innerHTML = "<a id='" + Ve + "'></a><select id='" + Ve + "-\r\\' msallowcapture=''><option selected=''></option></select>", R.querySelectorAll("[msallowcapture^='']").length && Ce.push("[*^$]=" + Ye + `*(?:''|"")`), R.querySelectorAll("[selected]").length || Ce.push("\\[" + Ye + "*(?:value|" + Ma + ")"), R.querySelectorAll("[id~=" + Ve + "-]").length || Ce.push("~="), V = U.createElement("input"), V.setAttribute("name", ""), R.appendChild(V), R.querySelectorAll("[name='']").length || Ce.push("\\[" + Ye + "*name" + Ye + "*=" + Ye + `*(?:''|"")`), R.querySelectorAll(":checked").length || Ce.push(":checked"), R.querySelectorAll("a#" + Ve + "+*").length || Ce.push(".#.+[+~]"), R.querySelectorAll("\\\f"), Ce.push("[\\r\\n\\f]");
          }), on(function(R) {
            R.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
            var V = U.createElement("input");
            V.setAttribute("type", "hidden"), R.appendChild(V).setAttribute("name", "D"), R.querySelectorAll("[name=d]").length && Ce.push("name" + Ye + "*[*^$|!~]?="), R.querySelectorAll(":enabled").length !== 2 && Ce.push(":enabled", ":disabled"), be.appendChild(R).disabled = !0, R.querySelectorAll(":disabled").length !== 2 && Ce.push(":enabled", ":disabled"), R.querySelectorAll("*,:x"), Ce.push(",.*:");
          })), (l.matchesSelector = vi.test(st = be.matches || be.webkitMatchesSelector || be.mozMatchesSelector || be.oMatchesSelector || be.msMatchesSelector)) && on(function(R) {
            l.disconnectedMatch = st.call(R, "*"), st.call(R, "[s!='']:x"), ct.push("!=", Ra);
          }), Ce = Ce.length && new RegExp(Ce.join("|")), ct = ct.length && new RegExp(ct.join("|")), E = vi.test(be.compareDocumentPosition), jt = E || vi.test(be.contains) ? function(R, V) {
            var te = R.nodeType === 9 ? R.documentElement : R, ue = V && V.parentNode;
            return R === ue || !!(ue && ue.nodeType === 1 && (te.contains ? te.contains(ue) : R.compareDocumentPosition && R.compareDocumentPosition(ue) & 16));
          } : function(R, V) {
            if (V) {
              for (; V = V.parentNode; )
                if (V === R)
                  return !0;
            }
            return !1;
          }, or = E ? function(R, V) {
            if (R === V)
              return ee = !0, 0;
            var te = !R.compareDocumentPosition - !V.compareDocumentPosition;
            return te || (te = (R.ownerDocument || R) == (V.ownerDocument || V) ? R.compareDocumentPosition(V) : (
              // Otherwise we know they are disconnected
              1
            ), te & 1 || !l.sortDetached && V.compareDocumentPosition(R) === te ? R == U || R.ownerDocument == Ne && jt(Ne, R) ? -1 : V == U || V.ownerDocument == Ne && jt(Ne, V) ? 1 : F ? sr(F, R) - sr(F, V) : 0 : te & 4 ? -1 : 1);
          } : function(R, V) {
            if (R === V)
              return ee = !0, 0;
            var te, ue = 0, ce = R.parentNode, Ee = V.parentNode, we = [R], Oe = [V];
            if (!ce || !Ee)
              return R == U ? -1 : V == U ? 1 : (
                /* eslint-enable eqeqeq */
                ce ? -1 : Ee ? 1 : F ? sr(F, R) - sr(F, V) : 0
              );
            if (ce === Ee)
              return ju(R, V);
            for (te = R; te = te.parentNode; )
              we.unshift(te);
            for (te = V; te = te.parentNode; )
              Oe.unshift(te);
            for (; we[ue] === Oe[ue]; )
              ue++;
            return ue ? (
              // Do a sibling check if the nodes have a common ancestor
              ju(we[ue], Oe[ue])
            ) : (
              // Otherwise nodes in our document sort first
              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
              // two documents; shallow comparisons work.
              /* eslint-disable eqeqeq */
              we[ue] == Ne ? -1 : Oe[ue] == Ne ? 1 : (
                /* eslint-enable eqeqeq */
                0
              )
            );
          }), U;
        }, Ke.matches = function(x, E) {
          return Ke(x, null, null, E);
        }, Ke.matchesSelector = function(x, E) {
          if ($(x), l.matchesSelector && ke && !Dt[E + " "] && (!ct || !ct.test(E)) && (!Ce || !Ce.test(E)))
            try {
              var N = st.call(x, E);
              if (N || l.disconnectedMatch || // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              x.document && x.document.nodeType !== 11)
                return N;
            } catch {
              Dt(E, !0);
            }
          return Ke(E, U, null, [x]).length > 0;
        }, Ke.contains = function(x, E) {
          return (x.ownerDocument || x) != U && $(x), jt(x, E);
        }, Ke.attr = function(x, E) {
          (x.ownerDocument || x) != U && $(x);
          var N = f.attrHandle[E.toLowerCase()], q = N && ar.call(f.attrHandle, E.toLowerCase()) ? N(x, E, !ke) : void 0;
          return q !== void 0 ? q : l.attributes || !ke ? x.getAttribute(E) : (q = x.getAttributeNode(E)) && q.specified ? q.value : null;
        }, Ke.escape = function(x) {
          return (x + "").replace(Mu, Ru);
        }, Ke.error = function(x) {
          throw new Error("Syntax error, unrecognized expression: " + x);
        }, Ke.uniqueSort = function(x) {
          var E, N = [], q = 0, R = 0;
          if (ee = !l.detectDuplicates, F = !l.sortStable && x.slice(0), x.sort(or), ee) {
            for (; E = x[R++]; )
              E === x[R] && (q = N.push(R));
            for (; q--; )
              x.splice(N[q], 1);
          }
          return F = null, x;
        }, h = Ke.getText = function(x) {
          var E, N = "", q = 0, R = x.nodeType;
          if (R) {
            if (R === 1 || R === 9 || R === 11) {
              if (typeof x.textContent == "string")
                return x.textContent;
              for (x = x.firstChild; x; x = x.nextSibling)
                N += h(x);
            } else if (R === 3 || R === 4)
              return x.nodeValue;
          } else
            for (; E = x[q++]; )
              N += h(E);
          return N;
        }, f = Ke.selectors = {
          // Can be adjusted by the user
          cacheLength: 50,
          createPseudo: rn,
          match: uo,
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
              return x[1] = x[1].replace(Tn, En), x[3] = (x[3] || x[4] || x[5] || "").replace(Tn, En), x[2] === "~=" && (x[3] = " " + x[3] + " "), x.slice(0, 4);
            },
            CHILD: function(x) {
              return x[1] = x[1].toLowerCase(), x[1].slice(0, 3) === "nth" ? (x[3] || Ke.error(x[0]), x[4] = +(x[4] ? x[5] + (x[6] || 1) : 2 * (x[3] === "even" || x[3] === "odd")), x[5] = +(x[7] + x[8] || x[3] === "odd")) : x[3] && Ke.error(x[0]), x;
            },
            PSEUDO: function(x) {
              var E, N = !x[6] && x[2];
              return uo.CHILD.test(x[0]) ? null : (x[3] ? x[2] = x[4] || x[5] || "" : N && kv.test(N) && // Get excess from tokenize (recursively)
              (E = m(N, !0)) && // advance to the next closing parenthesis
              (E = N.indexOf(")", N.length - E) - N.length) && (x[0] = x[0].slice(0, E), x[2] = N.slice(0, E)), x.slice(0, 3));
            }
          },
          filter: {
            TAG: function(x) {
              var E = x.replace(Tn, En).toLowerCase();
              return x === "*" ? function() {
                return !0;
              } : function(N) {
                return N.nodeName && N.nodeName.toLowerCase() === E;
              };
            },
            CLASS: function(x) {
              var E = rt[x + " "];
              return E || (E = new RegExp("(^|" + Ye + ")" + x + "(" + Ye + "|$)")) && rt(
                x,
                function(N) {
                  return E.test(
                    typeof N.className == "string" && N.className || typeof N.getAttribute < "u" && N.getAttribute("class") || ""
                  );
                }
              );
            },
            ATTR: function(x, E, N) {
              return function(q) {
                var R = Ke.attr(q, x);
                return R == null ? E === "!=" : E ? (R += "", E === "=" ? R === N : E === "!=" ? R !== N : E === "^=" ? N && R.indexOf(N) === 0 : E === "*=" ? N && R.indexOf(N) > -1 : E === "$=" ? N && R.slice(-N.length) === N : E === "~=" ? (" " + R.replace(Av, " ") + " ").indexOf(N) > -1 : E === "|=" ? R === N || R.slice(0, N.length + 1) === N + "-" : !1) : !0;
              };
            },
            CHILD: function(x, E, N, q, R) {
              var V = x.slice(0, 3) !== "nth", te = x.slice(-4) !== "last", ue = E === "of-type";
              return q === 1 && R === 0 ? (
                // Shortcut for :nth-*(n)
                function(ce) {
                  return !!ce.parentNode;
                }
              ) : function(ce, Ee, we) {
                var Oe, De, Ge, Se, ft, Ct, $t = V !== te ? "nextSibling" : "previousSibling", nt = ce.parentNode, gi = ue && ce.nodeName.toLowerCase(), mi = !we && !ue, Ft = !1;
                if (nt) {
                  if (V) {
                    for (; $t; ) {
                      for (Se = ce; Se = Se[$t]; )
                        if (ue ? Se.nodeName.toLowerCase() === gi : Se.nodeType === 1)
                          return !1;
                      Ct = $t = x === "only" && !Ct && "nextSibling";
                    }
                    return !0;
                  }
                  if (Ct = [te ? nt.firstChild : nt.lastChild], te && mi) {
                    for (Se = nt, Ge = Se[Ve] || (Se[Ve] = {}), De = Ge[Se.uniqueID] || (Ge[Se.uniqueID] = {}), Oe = De[x] || [], ft = Oe[0] === At && Oe[1], Ft = ft && Oe[2], Se = ft && nt.childNodes[ft]; Se = ++ft && Se && Se[$t] || // Fallback to seeking `elem` from the start
                    (Ft = ft = 0) || Ct.pop(); )
                      if (Se.nodeType === 1 && ++Ft && Se === ce) {
                        De[x] = [At, ft, Ft];
                        break;
                      }
                  } else if (mi && (Se = ce, Ge = Se[Ve] || (Se[Ve] = {}), De = Ge[Se.uniqueID] || (Ge[Se.uniqueID] = {}), Oe = De[x] || [], ft = Oe[0] === At && Oe[1], Ft = ft), Ft === !1)
                    for (; (Se = ++ft && Se && Se[$t] || (Ft = ft = 0) || Ct.pop()) && !((ue ? Se.nodeName.toLowerCase() === gi : Se.nodeType === 1) && ++Ft && (mi && (Ge = Se[Ve] || (Se[Ve] = {}), De = Ge[Se.uniqueID] || (Ge[Se.uniqueID] = {}), De[x] = [At, Ft]), Se === ce)); )
                      ;
                  return Ft -= R, Ft === q || Ft % q === 0 && Ft / q >= 0;
                }
              };
            },
            PSEUDO: function(x, E) {
              var N, q = f.pseudos[x] || f.setFilters[x.toLowerCase()] || Ke.error("unsupported pseudo: " + x);
              return q[Ve] ? q(E) : q.length > 1 ? (N = [x, x, "", E], f.setFilters.hasOwnProperty(x.toLowerCase()) ? rn(function(R, V) {
                for (var te, ue = q(R, E), ce = ue.length; ce--; )
                  te = sr(R, ue[ce]), R[te] = !(V[te] = ue[ce]);
              }) : function(R) {
                return q(R, 0, N);
              }) : q;
            }
          },
          pseudos: {
            // Potentially complex pseudos
            not: rn(function(x) {
              var E = [], N = [], q = O(x.replace(lo, "$1"));
              return q[Ve] ? rn(function(R, V, te, ue) {
                for (var ce, Ee = q(R, null, ue, []), we = R.length; we--; )
                  (ce = Ee[we]) && (R[we] = !(V[we] = ce));
              }) : function(R, V, te) {
                return E[0] = R, q(E, null, te, N), E[0] = null, !N.pop();
              };
            }),
            has: rn(function(x) {
              return function(E) {
                return Ke(x, E).length > 0;
              };
            }),
            contains: rn(function(x) {
              return x = x.replace(Tn, En), function(E) {
                return (E.textContent || h(E)).indexOf(x) > -1;
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
              return Lv.test(x || "") || Ke.error("unsupported lang: " + x), x = x.replace(Tn, En).toLowerCase(), function(E) {
                var N;
                do
                  if (N = ke ? E.lang : E.getAttribute("xml:lang") || E.getAttribute("lang"))
                    return N = N.toLowerCase(), N === x || N.indexOf(x + "-") === 0;
                while ((E = E.parentNode) && E.nodeType === 1);
                return !1;
              };
            }),
            // Miscellaneous
            target: function(x) {
              var E = i.location && i.location.hash;
              return E && E.slice(1) === x.id;
            },
            root: function(x) {
              return x === be;
            },
            focus: function(x) {
              return x === U.activeElement && (!U.hasFocus || U.hasFocus()) && !!(x.type || x.href || ~x.tabIndex);
            },
            // Boolean properties
            enabled: Du(!1),
            disabled: Du(!0),
            checked: function(x) {
              var E = x.nodeName.toLowerCase();
              return E === "input" && !!x.checked || E === "option" && !!x.selected;
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
              return Iv.test(x.nodeName);
            },
            input: function(x) {
              return Rv.test(x.nodeName);
            },
            button: function(x) {
              var E = x.nodeName.toLowerCase();
              return E === "input" && x.type === "button" || E === "button";
            },
            text: function(x) {
              var E;
              return x.nodeName.toLowerCase() === "input" && x.type === "text" && // Support: IE<8
              // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
              ((E = x.getAttribute("type")) == null || E.toLowerCase() === "text");
            },
            // Position-in-collection
            first: ur(function() {
              return [0];
            }),
            last: ur(function(x, E) {
              return [E - 1];
            }),
            eq: ur(function(x, E, N) {
              return [N < 0 ? N + E : N];
            }),
            even: ur(function(x, E) {
              for (var N = 0; N < E; N += 2)
                x.push(N);
              return x;
            }),
            odd: ur(function(x, E) {
              for (var N = 1; N < E; N += 2)
                x.push(N);
              return x;
            }),
            lt: ur(function(x, E, N) {
              for (var q = N < 0 ? N + E : N > E ? E : N; --q >= 0; )
                x.push(q);
              return x;
            }),
            gt: ur(function(x, E, N) {
              for (var q = N < 0 ? N + E : N; ++q < E; )
                x.push(q);
              return x;
            })
          }
        }, f.pseudos.nth = f.pseudos.eq;
        for (s in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
          f.pseudos[s] = $v(s);
        for (s in { submit: !0, reset: !0 })
          f.pseudos[s] = Fv(s);
        function $u() {
        }
        $u.prototype = f.filters = f.pseudos, f.setFilters = new $u(), m = Ke.tokenize = function(x, E) {
          var N, q, R, V, te, ue, ce, Ee = hi[x + " "];
          if (Ee)
            return E ? 0 : Ee.slice(0);
          for (te = x, ue = [], ce = f.preFilter; te; ) {
            (!N || (q = Pv.exec(te))) && (q && (te = te.slice(q[0].length) || te), ue.push(R = [])), N = !1, (q = Lu.exec(te)) && (N = q.shift(), R.push({
              value: N,
              // Cast descendant combinators to space
              type: q[0].replace(lo, " ")
            }), te = te.slice(N.length));
            for (V in f.filter)
              (q = uo[V].exec(te)) && (!ce[V] || (q = ce[V](q))) && (N = q.shift(), R.push({
                value: N,
                type: V,
                matches: q
              }), te = te.slice(N.length));
            if (!N)
              break;
          }
          return E ? te.length : te ? Ke.error(x) : (
            // Cache the tokens
            hi(x, ue).slice(0)
          );
        };
        function fo(x) {
          for (var E = 0, N = x.length, q = ""; E < N; E++)
            q += x[E].value;
          return q;
        }
        function po(x, E, N) {
          var q = E.dir, R = E.next, V = R || q, te = N && V === "parentNode", ue = Be++;
          return E.first ? (
            // Check against closest ancestor/preceding element
            function(ce, Ee, we) {
              for (; ce = ce[q]; )
                if (ce.nodeType === 1 || te)
                  return x(ce, Ee, we);
              return !1;
            }
          ) : (
            // Check against all ancestor/preceding elements
            function(ce, Ee, we) {
              var Oe, De, Ge, Se = [At, ue];
              if (we) {
                for (; ce = ce[q]; )
                  if ((ce.nodeType === 1 || te) && x(ce, Ee, we))
                    return !0;
              } else
                for (; ce = ce[q]; )
                  if (ce.nodeType === 1 || te)
                    if (Ge = ce[Ve] || (ce[Ve] = {}), De = Ge[ce.uniqueID] || (Ge[ce.uniqueID] = {}), R && R === ce.nodeName.toLowerCase())
                      ce = ce[q] || ce;
                    else {
                      if ((Oe = De[V]) && Oe[0] === At && Oe[1] === ue)
                        return Se[2] = Oe[2];
                      if (De[V] = Se, Se[2] = x(ce, Ee, we))
                        return !0;
                    }
              return !1;
            }
          );
        }
        function $a(x) {
          return x.length > 1 ? function(E, N, q) {
            for (var R = x.length; R--; )
              if (!x[R](E, N, q))
                return !1;
            return !0;
          } : x[0];
        }
        function Hv(x, E, N) {
          for (var q = 0, R = E.length; q < R; q++)
            Ke(x, E[q], N);
          return N;
        }
        function ho(x, E, N, q, R) {
          for (var V, te = [], ue = 0, ce = x.length, Ee = E != null; ue < ce; ue++)
            (V = x[ue]) && (!N || N(V, q, R)) && (te.push(V), Ee && E.push(ue));
          return te;
        }
        function Fa(x, E, N, q, R, V) {
          return q && !q[Ve] && (q = Fa(q)), R && !R[Ve] && (R = Fa(R, V)), rn(function(te, ue, ce, Ee) {
            var we, Oe, De, Ge = [], Se = [], ft = ue.length, Ct = te || Hv(
              E || "*",
              ce.nodeType ? [ce] : ce,
              []
            ), $t = x && (te || !E) ? ho(Ct, Ge, x, ce, Ee) : Ct, nt = N ? (
              // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
              R || (te ? x : ft || q) ? (
                // ...intermediate processing is necessary
                []
              ) : (
                // ...otherwise use results directly
                ue
              )
            ) : $t;
            if (N && N($t, nt, ce, Ee), q)
              for (we = ho(nt, Se), q(we, [], ce, Ee), Oe = we.length; Oe--; )
                (De = we[Oe]) && (nt[Se[Oe]] = !($t[Se[Oe]] = De));
            if (te) {
              if (R || x) {
                if (R) {
                  for (we = [], Oe = nt.length; Oe--; )
                    (De = nt[Oe]) && we.push($t[Oe] = De);
                  R(null, nt = [], we, Ee);
                }
                for (Oe = nt.length; Oe--; )
                  (De = nt[Oe]) && (we = R ? sr(te, De) : Ge[Oe]) > -1 && (te[we] = !(ue[we] = De));
              }
            } else
              nt = ho(
                nt === ue ? nt.splice(ft, nt.length) : nt
              ), R ? R(null, ue, nt, Ee) : Fn.apply(ue, nt);
          });
        }
        function Ha(x) {
          for (var E, N, q, R = x.length, V = f.relative[x[0].type], te = V || f.relative[" "], ue = V ? 1 : 0, ce = po(function(Oe) {
            return Oe === E;
          }, te, !0), Ee = po(function(Oe) {
            return sr(E, Oe) > -1;
          }, te, !0), we = [function(Oe, De, Ge) {
            var Se = !V && (Ge || De !== M) || ((E = De).nodeType ? ce(Oe, De, Ge) : Ee(Oe, De, Ge));
            return E = null, Se;
          }]; ue < R; ue++)
            if (N = f.relative[x[ue].type])
              we = [po($a(we), N)];
            else {
              if (N = f.filter[x[ue].type].apply(null, x[ue].matches), N[Ve]) {
                for (q = ++ue; q < R && !f.relative[x[q].type]; q++)
                  ;
                return Fa(
                  ue > 1 && $a(we),
                  ue > 1 && fo(
                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                    x.slice(0, ue - 1).concat({ value: x[ue - 2].type === " " ? "*" : "" })
                  ).replace(lo, "$1"),
                  N,
                  ue < q && Ha(x.slice(ue, q)),
                  q < R && Ha(x = x.slice(q)),
                  q < R && fo(x)
                );
              }
              we.push(N);
            }
          return $a(we);
        }
        function Bv(x, E) {
          var N = E.length > 0, q = x.length > 0, R = function(V, te, ue, ce, Ee) {
            var we, Oe, De, Ge = 0, Se = "0", ft = V && [], Ct = [], $t = M, nt = V || q && f.find.TAG("*", Ee), gi = At += $t == null ? 1 : Math.random() || 0.1, mi = nt.length;
            for (Ee && (M = te == U || te || Ee); Se !== mi && (we = nt[Se]) != null; Se++) {
              if (q && we) {
                for (Oe = 0, !te && we.ownerDocument != U && ($(we), ue = !ke); De = x[Oe++]; )
                  if (De(we, te || U, ue)) {
                    ce.push(we);
                    break;
                  }
                Ee && (At = gi);
              }
              N && ((we = !De && we) && Ge--, V && ft.push(we));
            }
            if (Ge += Se, N && Se !== Ge) {
              for (Oe = 0; De = E[Oe++]; )
                De(ft, Ct, te, ue);
              if (V) {
                if (Ge > 0)
                  for (; Se--; )
                    ft[Se] || Ct[Se] || (Ct[Se] = $n.call(ce));
                Ct = ho(Ct);
              }
              Fn.apply(ce, Ct), Ee && !V && Ct.length > 0 && Ge + E.length > 1 && Ke.uniqueSort(ce);
            }
            return Ee && (At = gi, M = $t), ft;
          };
          return N ? rn(R) : R;
        }
        return O = Ke.compile = function(x, E) {
          var N, q = [], R = [], V = so[x + " "];
          if (!V) {
            for (E || (E = m(x)), N = E.length; N--; )
              V = Ha(E[N]), V[Ve] ? q.push(V) : R.push(V);
            V = so(
              x,
              Bv(R, q)
            ), V.selector = x;
          }
          return V;
        }, _ = Ke.select = function(x, E, N, q) {
          var R, V, te, ue, ce, Ee = typeof x == "function" && x, we = !q && m(x = Ee.selector || x);
          if (N = N || [], we.length === 1) {
            if (V = we[0] = we[0].slice(0), V.length > 2 && (te = V[0]).type === "ID" && E.nodeType === 9 && ke && f.relative[V[1].type]) {
              if (E = (f.find.ID(te.matches[0].replace(Tn, En), E) || [])[0], E)
                Ee && (E = E.parentNode);
              else
                return N;
              x = x.slice(V.shift().value.length);
            }
            for (R = uo.needsContext.test(x) ? 0 : V.length; R-- && (te = V[R], !f.relative[ue = te.type]); )
              if ((ce = f.find[ue]) && (q = ce(
                te.matches[0].replace(Tn, En),
                Ia.test(V[0].type) && Da(E.parentNode) || E
              ))) {
                if (V.splice(R, 1), x = q.length && fo(V), !x)
                  return Fn.apply(N, q), N;
                break;
              }
          }
          return (Ee || O(x, we))(
            q,
            E,
            !ke,
            N,
            !E || Ia.test(x) && Da(E.parentNode) || E
          ), N;
        }, l.sortStable = Ve.split("").sort(or).join("") === Ve, l.detectDuplicates = !!ee, $(), l.sortDetached = on(function(x) {
          return x.compareDocumentPosition(U.createElement("fieldset")) & 1;
        }), on(function(x) {
          return x.innerHTML = "<a href='#'></a>", x.firstChild.getAttribute("href") === "#";
        }) || ja("type|href|height|width", function(x, E, N) {
          if (!N)
            return x.getAttribute(E, E.toLowerCase() === "type" ? 1 : 2);
        }), (!l.attributes || !on(function(x) {
          return x.innerHTML = "<input/>", x.firstChild.setAttribute("value", ""), x.firstChild.getAttribute("value") === "";
        })) && ja("value", function(x, E, N) {
          if (!N && x.nodeName.toLowerCase() === "input")
            return x.defaultValue;
        }), on(function(x) {
          return x.getAttribute("disabled") == null;
        }) || ja(Ma, function(x, E, N) {
          var q;
          if (!N)
            return x[E] === !0 ? E.toLowerCase() : (q = x.getAttributeNode(E)) && q.specified ? q.value : null;
        }), Ke;
      }(t)
    );
    u.find = G, u.expr = G.selectors, u.expr[":"] = u.expr.pseudos, u.uniqueSort = u.unique = G.uniqueSort, u.text = G.getText, u.isXMLDoc = G.isXML, u.contains = G.contains, u.escapeSelector = G.escape;
    var re = function(i, s, l) {
      for (var f = [], h = l !== void 0; (i = i[s]) && i.nodeType !== 9; )
        if (i.nodeType === 1) {
          if (h && u(i).is(l))
            break;
          f.push(i);
        }
      return f;
    }, de = function(i, s) {
      for (var l = []; i; i = i.nextSibling)
        i.nodeType === 1 && i !== s && l.push(i);
      return l;
    }, xe = u.expr.match.needsContext;
    function Q(i, s) {
      return i.nodeName && i.nodeName.toLowerCase() === s.toLowerCase();
    }
    var he = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function Re(i, s, l) {
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
        return this.pushStack(Re(this, i || [], !1));
      },
      not: function(i) {
        return this.pushStack(Re(this, i || [], !0));
      },
      is: function(i) {
        return !!Re(
          this,
          // If this is a positional/relative selector, check membership in the returned set
          // so $("p:first").is("p:last") won't return true for a doc with two "p".
          typeof i == "string" && xe.test(i) ? u(i) : i || [],
          !1
        ).length;
      }
    });
    var ie, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, K = u.fn.init = function(i, s, l) {
      var f, h;
      if (!i)
        return this;
      if (l = l || ie, typeof i == "string")
        if (i[0] === "<" && i[i.length - 1] === ">" && i.length >= 3 ? f = [null, i, null] : f = B.exec(i), f && (f[1] || !s))
          if (f[1]) {
            if (s = s instanceof u ? s[0] : s, u.merge(this, u.parseHTML(
              f[1],
              s && s.nodeType ? s.ownerDocument || s : P,
              !0
            )), he.test(f[1]) && u.isPlainObject(s))
              for (f in s)
                A(this[f]) ? this[f](s[f]) : this.attr(f, s[f]);
            return this;
          } else
            return h = P.getElementById(f[2]), h && (this[0] = h, this.length = 1), this;
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
    K.prototype = u.fn, ie = u(P);
    var ae = /^(?:parents|prev(?:Until|All))/, ve = {
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
        if (!xe.test(i)) {
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
    function ge(i, s) {
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
        return re(i, "parentNode");
      },
      parentsUntil: function(i, s, l) {
        return re(i, "parentNode", l);
      },
      next: function(i) {
        return ge(i, "nextSibling");
      },
      prev: function(i) {
        return ge(i, "previousSibling");
      },
      nextAll: function(i) {
        return re(i, "nextSibling");
      },
      prevAll: function(i) {
        return re(i, "previousSibling");
      },
      nextUntil: function(i, s, l) {
        return re(i, "nextSibling", l);
      },
      prevUntil: function(i, s, l) {
        return re(i, "previousSibling", l);
      },
      siblings: function(i) {
        return de((i.parentNode || {}).firstChild, i);
      },
      children: function(i) {
        return de(i.firstChild);
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
        return i.slice(-5) !== "Until" && (f = l), f && typeof f == "string" && (h = u.filter(f, h)), this.length > 1 && (ve[i] || u.uniqueSort(h), ae.test(i) && h.reverse()), this.pushStack(h);
      };
    });
    var Ae = /[^\x20\t\r\n\f]+/g;
    function We(i) {
      var s = {};
      return u.each(i.match(Ae) || [], function(l, f) {
        s[f] = !0;
      }), s;
    }
    u.Callbacks = function(i) {
      i = typeof i == "string" ? We(i) : u.extend({}, i);
      var s, l, f, h, v = [], m = [], O = -1, _ = function() {
        for (h = h || i.once, f = s = !0; m.length; O = -1)
          for (l = m.shift(); ++O < v.length; )
            v[O].apply(l[0], l[1]) === !1 && i.stopOnFalse && (O = v.length, l = !1);
        i.memory || (l = !1), s = !1, h && (l ? v = [] : v = "");
      }, M = {
        // Add a callback or a collection of callbacks to the list
        add: function() {
          return v && (l && !s && (O = v.length - 1, m.push(l)), function F(ee) {
            u.each(ee, function($, U) {
              A(U) ? (!i.unique || !M.has(U)) && v.push(U) : U && U.length && Z(U) !== "string" && F(U);
            });
          }(arguments), l && !s && _()), this;
        },
        // Remove a callback from the list
        remove: function() {
          return u.each(arguments, function(F, ee) {
            for (var $; ($ = u.inArray(ee, v, $)) > -1; )
              v.splice($, 1), $ <= O && O--;
          }), this;
        },
        // Check if a given callback is in the list.
        // If no argument is given, return whether or not list has callbacks attached.
        has: function(F) {
          return F ? u.inArray(F, v) > -1 : v.length > 0;
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
        fireWith: function(F, ee) {
          return h || (ee = ee || [], ee = [F, ee.slice ? ee.slice() : ee], m.push(ee), s || _()), this;
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
    function je(i) {
      return i;
    }
    function ut(i) {
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
              u.each(s, function(O, _) {
                var M = A(v[_[4]]) && v[_[4]];
                h[_[1]](function() {
                  var F = M && M.apply(this, arguments);
                  F && A(F.promise) ? F.promise().progress(m.notify).done(m.resolve).fail(m.reject) : m[_[0] + "With"](
                    this,
                    M ? [F] : arguments
                  );
                });
              }), v = null;
            }).promise();
          },
          then: function(v, m, O) {
            var _ = 0;
            function M(F, ee, $, U) {
              return function() {
                var be = this, ke = arguments, Ce = function() {
                  var st, jt;
                  if (!(F < _)) {
                    if (st = $.apply(be, ke), st === ee.promise())
                      throw new TypeError("Thenable self-resolution");
                    jt = st && // Support: Promises/A+ section 2.3.4
                    // https://promisesaplus.com/#point-64
                    // Only check objects and functions for thenability
                    (typeof st == "object" || typeof st == "function") && st.then, A(jt) ? U ? jt.call(
                      st,
                      M(_, ee, je, U),
                      M(_, ee, ut, U)
                    ) : (_++, jt.call(
                      st,
                      M(_, ee, je, U),
                      M(_, ee, ut, U),
                      M(
                        _,
                        ee,
                        je,
                        ee.notifyWith
                      )
                    )) : ($ !== je && (be = void 0, ke = [st]), (U || ee.resolveWith)(be, ke));
                  }
                }, ct = U ? Ce : function() {
                  try {
                    Ce();
                  } catch (st) {
                    u.Deferred.exceptionHook && u.Deferred.exceptionHook(
                      st,
                      ct.stackTrace
                    ), F + 1 >= _ && ($ !== ut && (be = void 0, ke = [st]), ee.rejectWith(be, ke));
                  }
                };
                F ? ct() : (u.Deferred.getStackHook && (ct.stackTrace = u.Deferred.getStackHook()), t.setTimeout(ct));
              };
            }
            return u.Deferred(function(F) {
              s[0][3].add(
                M(
                  0,
                  F,
                  A(O) ? O : je,
                  F.notifyWith
                )
              ), s[1][3].add(
                M(
                  0,
                  F,
                  A(v) ? v : je
                )
              ), s[2][3].add(
                M(
                  0,
                  F,
                  A(m) ? m : ut
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
          var O = m[2], _ = m[5];
          f[m[1]] = O.add, _ && O.add(
            function() {
              l = _;
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
          return function(_) {
            f[O] = this, h[O] = arguments.length > 1 ? a.call(arguments) : _, --s || v.resolveWith(f, h);
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
    var ot = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    u.Deferred.exceptionHook = function(i, s) {
      t.console && t.console.warn && i && ot.test(i.name) && t.console.warn("jQuery.Deferred exception: " + i.message, i.stack, s);
    }, u.readyException = function(i) {
      t.setTimeout(function() {
        throw i;
      });
    };
    var wt = u.Deferred();
    u.fn.ready = function(i) {
      return wt.then(i).catch(function(s) {
        u.readyException(s);
      }), this;
    }, u.extend({
      // Is the DOM ready to be used? Set to true once it occurs.
      isReady: !1,
      // A counter to track how many items to wait for before
      // the ready event fires. See #6781
      readyWait: 1,
      // Handle when the DOM is ready
      ready: function(i) {
        (i === !0 ? --u.readyWait : u.isReady) || (u.isReady = !0, !(i !== !0 && --u.readyWait > 0) && wt.resolveWith(P, [u]));
      }
    }), u.ready.then = wt.then;
    function en() {
      P.removeEventListener("DOMContentLoaded", en), t.removeEventListener("load", en), u.ready();
    }
    P.readyState === "complete" || P.readyState !== "loading" && !P.documentElement.doScroll ? t.setTimeout(u.ready) : (P.addEventListener("DOMContentLoaded", en), t.addEventListener("load", en));
    var Ot = function(i, s, l, f, h, v, m) {
      var O = 0, _ = i.length, M = l == null;
      if (Z(l) === "object") {
        h = !0;
        for (O in l)
          Ot(i, s, O, l[O], !0, v, m);
      } else if (f !== void 0 && (h = !0, A(f) || (m = !0), M && (m ? (s.call(i, f), s = null) : (M = s, s = function(F, ee, $) {
        return M.call(u(F), $);
      })), s))
        for (; O < _; O++)
          s(
            i[O],
            l,
            m ? f : f.call(i[O], O, s(i[O], l))
          );
      return h ? i : M ? s.call(i) : _ ? s(i[0], l) : v;
    }, tn = /^-ms-/, tr = /-([a-z])/g;
    function nr(i, s) {
      return s.toUpperCase();
    }
    function S(i) {
      return i.replace(tn, "ms-").replace(tr, nr);
    }
    var k = function(i) {
      return i.nodeType === 1 || i.nodeType === 9 || !+i.nodeType;
    };
    function W() {
      this.expando = u.expando + W.uid++;
    }
    W.uid = 1, W.prototype = {
      cache: function(i) {
        var s = i[this.expando];
        return s || (s = {}, k(i) && (i.nodeType ? i[this.expando] = s : Object.defineProperty(i, this.expando, {
          value: s,
          configurable: !0
        }))), s;
      },
      set: function(i, s, l) {
        var f, h = this.cache(i);
        if (typeof s == "string")
          h[S(s)] = l;
        else
          for (f in s)
            h[S(f)] = s[f];
        return h;
      },
      get: function(i, s) {
        return s === void 0 ? this.cache(i) : (
          // Always use camelCase key (gh-2257)
          i[this.expando] && i[this.expando][S(s)]
        );
      },
      access: function(i, s, l) {
        return s === void 0 || s && typeof s == "string" && l === void 0 ? this.get(i, s) : (this.set(i, s, l), l !== void 0 ? l : s);
      },
      remove: function(i, s) {
        var l, f = i[this.expando];
        if (f !== void 0) {
          if (s !== void 0)
            for (Array.isArray(s) ? s = s.map(S) : (s = S(s), s = s in f ? [s] : s.match(Ae) || []), l = s.length; l--; )
              delete f[s[l]];
          (s === void 0 || u.isEmptyObject(f)) && (i.nodeType ? i[this.expando] = void 0 : delete i[this.expando]);
        }
      },
      hasData: function(i) {
        var s = i[this.expando];
        return s !== void 0 && !u.isEmptyObject(s);
      }
    };
    var D = new W(), X = new W(), se = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, fe = /[A-Z]/g;
    function oe(i) {
      return i === "true" ? !0 : i === "false" ? !1 : i === "null" ? null : i === +i + "" ? +i : se.test(i) ? JSON.parse(i) : i;
    }
    function le(i, s, l) {
      var f;
      if (l === void 0 && i.nodeType === 1)
        if (f = "data-" + s.replace(fe, "-$&").toLowerCase(), l = i.getAttribute(f), typeof l == "string") {
          try {
            l = oe(l);
          } catch {
          }
          X.set(i, s, l);
        } else
          l = void 0;
      return l;
    }
    u.extend({
      hasData: function(i) {
        return X.hasData(i) || D.hasData(i);
      },
      data: function(i, s, l) {
        return X.access(i, s, l);
      },
      removeData: function(i, s) {
        X.remove(i, s);
      },
      // TODO: Now that all calls to _data and _removeData have been replaced
      // with direct calls to dataPriv methods, these can be deprecated.
      _data: function(i, s, l) {
        return D.access(i, s, l);
      },
      _removeData: function(i, s) {
        D.remove(i, s);
      }
    }), u.fn.extend({
      data: function(i, s) {
        var l, f, h, v = this[0], m = v && v.attributes;
        if (i === void 0) {
          if (this.length && (h = X.get(v), v.nodeType === 1 && !D.get(v, "hasDataAttrs"))) {
            for (l = m.length; l--; )
              m[l] && (f = m[l].name, f.indexOf("data-") === 0 && (f = S(f.slice(5)), le(v, f, h[f])));
            D.set(v, "hasDataAttrs", !0);
          }
          return h;
        }
        return typeof i == "object" ? this.each(function() {
          X.set(this, i);
        }) : Ot(this, function(O) {
          var _;
          if (v && O === void 0)
            return _ = X.get(v, i), _ !== void 0 || (_ = le(v, i), _ !== void 0) ? _ : void 0;
          this.each(function() {
            X.set(this, i, O);
          });
        }, null, s, arguments.length > 1, null, !0);
      },
      removeData: function(i) {
        return this.each(function() {
          X.remove(this, i);
        });
      }
    }), u.extend({
      queue: function(i, s, l) {
        var f;
        if (i)
          return s = (s || "fx") + "queue", f = D.get(i, s), l && (!f || Array.isArray(l) ? f = D.access(i, s, u.makeArray(l)) : f.push(l)), f || [];
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
        return D.get(i, l) || D.access(i, l, {
          empty: u.Callbacks("once memory").add(function() {
            D.remove(i, [s + "queue", l]);
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
          l = D.get(v[m], i + "queueHooks"), l && l.empty && (f++, l.empty.add(O));
        return O(), h.promise(s);
      }
    });
    var ne = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ye = new RegExp("^(?:([+-])=|)(" + ne + ")([a-z%]*)$", "i"), pe = ["Top", "Right", "Bottom", "Left"], me = P.documentElement, Te = function(i) {
      return u.contains(i.ownerDocument, i);
    }, Fe = { composed: !0 };
    me.getRootNode && (Te = function(i) {
      return u.contains(i.ownerDocument, i) || i.getRootNode(Fe) === i.ownerDocument;
    });
    var Ue = function(i, s) {
      return i = s || i, i.style.display === "none" || i.style.display === "" && // Otherwise, check computed style
      // Support: Firefox <=43 - 45
      // Disconnected elements can have computed display: none, so first confirm that elem is
      // in the document.
      Te(i) && u.css(i, "display") === "none";
    };
    function ze(i, s, l, f) {
      var h, v, m = 20, O = f ? function() {
        return f.cur();
      } : function() {
        return u.css(i, s, "");
      }, _ = O(), M = l && l[3] || (u.cssNumber[s] ? "" : "px"), F = i.nodeType && (u.cssNumber[s] || M !== "px" && +_) && ye.exec(u.css(i, s));
      if (F && F[3] !== M) {
        for (_ = _ / 2, M = M || F[3], F = +_ || 1; m--; )
          u.style(i, s, F + M), (1 - v) * (1 - (v = O() / _ || 0.5)) <= 0 && (m = 0), F = F / v;
        F = F * 2, u.style(i, s, F + M), l = l || [];
      }
      return l && (F = +F || +_ || 0, h = l[1] ? F + (l[1] + 1) * l[2] : +l[2], f && (f.unit = M, f.start = F, f.end = h)), h;
    }
    var Xe = {};
    function Rt(i) {
      var s, l = i.ownerDocument, f = i.nodeName, h = Xe[f];
      return h || (s = l.body.appendChild(l.createElement(f)), h = u.css(s, "display"), s.parentNode.removeChild(s), h === "none" && (h = "block"), Xe[f] = h, h);
    }
    function It(i, s) {
      for (var l, f, h = [], v = 0, m = i.length; v < m; v++)
        f = i[v], f.style && (l = f.style.display, s ? (l === "none" && (h[v] = D.get(f, "display") || null, h[v] || (f.style.display = "")), f.style.display === "" && Ue(f) && (h[v] = Rt(f))) : l !== "none" && (h[v] = "none", D.set(f, "display", l)));
      for (v = 0; v < m; v++)
        h[v] != null && (i[v].style.display = h[v]);
      return i;
    }
    u.fn.extend({
      show: function() {
        return It(this, !0);
      },
      hide: function() {
        return It(this);
      },
      toggle: function(i) {
        return typeof i == "boolean" ? i ? this.show() : this.hide() : this.each(function() {
          Ue(this) ? u(this).show() : u(this).hide();
        });
      }
    });
    var jn = /^(?:checkbox|radio)$/i, Dn = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, ui = /^$|^module$|\/(?:java|ecma)script/i;
    (function() {
      var i = P.createDocumentFragment(), s = i.appendChild(P.createElement("div")), l = P.createElement("input");
      l.setAttribute("type", "radio"), l.setAttribute("checked", "checked"), l.setAttribute("name", "t"), s.appendChild(l), w.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, s.innerHTML = "<textarea>x</textarea>", w.noCloneChecked = !!s.cloneNode(!0).lastChild.defaultValue, s.innerHTML = "<option></option>", w.option = !!s.lastChild;
    })();
    var Qe = {
      // XHTML parsers do not magically insert elements in the
      // same way that tag soup parsers do. So we cannot shorten
      // this by omitting <tbody> or other required elements.
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
    Qe.tbody = Qe.tfoot = Qe.colgroup = Qe.caption = Qe.thead, Qe.th = Qe.td, w.option || (Qe.optgroup = Qe.option = [1, "<select multiple='multiple'>", "</select>"]);
    function Ze(i, s) {
      var l;
      return typeof i.getElementsByTagName < "u" ? l = i.getElementsByTagName(s || "*") : typeof i.querySelectorAll < "u" ? l = i.querySelectorAll(s || "*") : l = [], s === void 0 || s && Q(i, s) ? u.merge([i], l) : l;
    }
    function _r(i, s) {
      for (var l = 0, f = i.length; l < f; l++)
        D.set(
          i[l],
          "globalEval",
          !s || D.get(s[l], "globalEval")
        );
    }
    var Yh = /<|&#?\w+;/;
    function iu(i, s, l, f, h) {
      for (var v, m, O, _, M, F, ee = s.createDocumentFragment(), $ = [], U = 0, be = i.length; U < be; U++)
        if (v = i[U], v || v === 0)
          if (Z(v) === "object")
            u.merge($, v.nodeType ? [v] : v);
          else if (!Yh.test(v))
            $.push(s.createTextNode(v));
          else {
            for (m = m || ee.appendChild(s.createElement("div")), O = (Dn.exec(v) || ["", ""])[1].toLowerCase(), _ = Qe[O] || Qe._default, m.innerHTML = _[1] + u.htmlPrefilter(v) + _[2], F = _[0]; F--; )
              m = m.lastChild;
            u.merge($, m.childNodes), m = ee.firstChild, m.textContent = "";
          }
      for (ee.textContent = "", U = 0; v = $[U++]; ) {
        if (f && u.inArray(v, f) > -1) {
          h && h.push(v);
          continue;
        }
        if (M = Te(v), m = Ze(ee.appendChild(v), "script"), M && _r(m), l)
          for (F = 0; v = m[F++]; )
            ui.test(v.type || "") && l.push(v);
      }
      return ee;
    }
    var ou = /^([^.]*)(?:\.(.+)|)/;
    function Ar() {
      return !0;
    }
    function Pr() {
      return !1;
    }
    function Xh(i, s) {
      return i === Vh() == (s === "focus");
    }
    function Vh() {
      try {
        return P.activeElement;
      } catch {
      }
    }
    function xa(i, s, l, f, h, v) {
      var m, O;
      if (typeof s == "object") {
        typeof l != "string" && (f = f || l, l = void 0);
        for (O in s)
          xa(i, O, l, f, s[O], v);
        return i;
      }
      if (f == null && h == null ? (h = l, f = l = void 0) : h == null && (typeof l == "string" ? (h = f, f = void 0) : (h = f, f = l, l = void 0)), h === !1)
        h = Pr;
      else if (!h)
        return i;
      return v === 1 && (m = h, h = function(_) {
        return u().off(_), m.apply(this, arguments);
      }, h.guid = m.guid || (m.guid = u.guid++)), i.each(function() {
        u.event.add(this, s, h, f, l);
      });
    }
    u.event = {
      global: {},
      add: function(i, s, l, f, h) {
        var v, m, O, _, M, F, ee, $, U, be, ke, Ce = D.get(i);
        if (k(i))
          for (l.handler && (v = l, l = v.handler, h = v.selector), h && u.find.matchesSelector(me, h), l.guid || (l.guid = u.guid++), (_ = Ce.events) || (_ = Ce.events = /* @__PURE__ */ Object.create(null)), (m = Ce.handle) || (m = Ce.handle = function(ct) {
            return typeof u < "u" && u.event.triggered !== ct.type ? u.event.dispatch.apply(i, arguments) : void 0;
          }), s = (s || "").match(Ae) || [""], M = s.length; M--; )
            O = ou.exec(s[M]) || [], U = ke = O[1], be = (O[2] || "").split(".").sort(), U && (ee = u.event.special[U] || {}, U = (h ? ee.delegateType : ee.bindType) || U, ee = u.event.special[U] || {}, F = u.extend({
              type: U,
              origType: ke,
              data: f,
              handler: l,
              guid: l.guid,
              selector: h,
              needsContext: h && u.expr.match.needsContext.test(h),
              namespace: be.join(".")
            }, v), ($ = _[U]) || ($ = _[U] = [], $.delegateCount = 0, (!ee.setup || ee.setup.call(i, f, be, m) === !1) && i.addEventListener && i.addEventListener(U, m)), ee.add && (ee.add.call(i, F), F.handler.guid || (F.handler.guid = l.guid)), h ? $.splice($.delegateCount++, 0, F) : $.push(F), u.event.global[U] = !0);
      },
      // Detach an event or set of events from an element
      remove: function(i, s, l, f, h) {
        var v, m, O, _, M, F, ee, $, U, be, ke, Ce = D.hasData(i) && D.get(i);
        if (!(!Ce || !(_ = Ce.events))) {
          for (s = (s || "").match(Ae) || [""], M = s.length; M--; ) {
            if (O = ou.exec(s[M]) || [], U = ke = O[1], be = (O[2] || "").split(".").sort(), !U) {
              for (U in _)
                u.event.remove(i, U + s[M], l, f, !0);
              continue;
            }
            for (ee = u.event.special[U] || {}, U = (f ? ee.delegateType : ee.bindType) || U, $ = _[U] || [], O = O[2] && new RegExp("(^|\\.)" + be.join("\\.(?:.*\\.|)") + "(\\.|$)"), m = v = $.length; v--; )
              F = $[v], (h || ke === F.origType) && (!l || l.guid === F.guid) && (!O || O.test(F.namespace)) && (!f || f === F.selector || f === "**" && F.selector) && ($.splice(v, 1), F.selector && $.delegateCount--, ee.remove && ee.remove.call(i, F));
            m && !$.length && ((!ee.teardown || ee.teardown.call(i, be, Ce.handle) === !1) && u.removeEvent(i, U, Ce.handle), delete _[U]);
          }
          u.isEmptyObject(_) && D.remove(i, "handle events");
        }
      },
      dispatch: function(i) {
        var s, l, f, h, v, m, O = new Array(arguments.length), _ = u.event.fix(i), M = (D.get(this, "events") || /* @__PURE__ */ Object.create(null))[_.type] || [], F = u.event.special[_.type] || {};
        for (O[0] = _, s = 1; s < arguments.length; s++)
          O[s] = arguments[s];
        if (_.delegateTarget = this, !(F.preDispatch && F.preDispatch.call(this, _) === !1)) {
          for (m = u.event.handlers.call(this, _, M), s = 0; (h = m[s++]) && !_.isPropagationStopped(); )
            for (_.currentTarget = h.elem, l = 0; (v = h.handlers[l++]) && !_.isImmediatePropagationStopped(); )
              (!_.rnamespace || v.namespace === !1 || _.rnamespace.test(v.namespace)) && (_.handleObj = v, _.data = v.data, f = ((u.event.special[v.origType] || {}).handle || v.handler).apply(h.elem, O), f !== void 0 && (_.result = f) === !1 && (_.preventDefault(), _.stopPropagation()));
          return F.postDispatch && F.postDispatch.call(this, _), _.result;
        }
      },
      handlers: function(i, s) {
        var l, f, h, v, m, O = [], _ = s.delegateCount, M = i.target;
        if (_ && // Support: IE <=9
        // Black-hole SVG <use> instance trees (trac-13180)
        M.nodeType && // Support: Firefox <=42
        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
        // Support: IE 11 only
        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
        !(i.type === "click" && i.button >= 1)) {
          for (; M !== this; M = M.parentNode || this)
            if (M.nodeType === 1 && !(i.type === "click" && M.disabled === !0)) {
              for (v = [], m = {}, l = 0; l < _; l++)
                f = s[l], h = f.selector + " ", m[h] === void 0 && (m[h] = f.needsContext ? u(h, this).index(M) > -1 : u.find(h, this, null, [M]).length), m[h] && v.push(f);
              v.length && O.push({ elem: M, handlers: v });
            }
        }
        return M = this, _ < s.length && O.push({ elem: M, handlers: s.slice(_) }), O;
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
            return jn.test(s.type) && s.click && Q(s, "input") && ro(s, "click", Ar), !1;
          },
          trigger: function(i) {
            var s = this || i;
            return jn.test(s.type) && s.click && Q(s, "input") && ro(s, "click"), !0;
          },
          // For cross-browser consistency, suppress native .click() on links
          // Also prevent it if we're currently inside a leveraged native-event stack
          _default: function(i) {
            var s = i.target;
            return jn.test(s.type) && s.click && Q(s, "input") && D.get(s, "click") || Q(s, "a");
          }
        },
        beforeunload: {
          postDispatch: function(i) {
            i.result !== void 0 && i.originalEvent && (i.originalEvent.returnValue = i.result);
          }
        }
      }
    };
    function ro(i, s, l) {
      if (!l) {
        D.get(i, s) === void 0 && u.event.add(i, s, Ar);
        return;
      }
      D.set(i, s, !1), u.event.add(i, s, {
        namespace: !1,
        handler: function(f) {
          var h, v, m = D.get(this, s);
          if (f.isTrigger & 1 && this[s]) {
            if (m.length)
              (u.event.special[s] || {}).delegateType && f.stopPropagation();
            else if (m = a.call(arguments), D.set(this, s, m), h = l(this, s), this[s](), v = D.get(this, s), m !== v || h ? D.set(this, s, !1) : v = {}, m !== v)
              return f.stopImmediatePropagation(), f.preventDefault(), v && v.value;
          } else
            m.length && (D.set(this, s, {
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
          return ro(this, i, Xh), !1;
        },
        trigger: function() {
          return ro(this, i), !0;
        },
        // Suppress native focus or blur as it's already being fired
        // in leverageNative.
        _default: function() {
          return !0;
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
        return xa(this, i, s, l, f);
      },
      one: function(i, s, l, f) {
        return xa(this, i, s, l, f, 1);
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
    var Kh = /<script|<style|<link/i, Gh = /checked\s*(?:[^=]|=\s*.checked.)/i, Jh = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function au(i, s) {
      return Q(i, "table") && Q(s.nodeType !== 11 ? s : s.firstChild, "tr") && u(i).children("tbody")[0] || i;
    }
    function Qh(i) {
      return i.type = (i.getAttribute("type") !== null) + "/" + i.type, i;
    }
    function Zh(i) {
      return (i.type || "").slice(0, 5) === "true/" ? i.type = i.type.slice(5) : i.removeAttribute("type"), i;
    }
    function su(i, s) {
      var l, f, h, v, m, O, _;
      if (s.nodeType === 1) {
        if (D.hasData(i) && (v = D.get(i), _ = v.events, _)) {
          D.remove(s, "handle events");
          for (h in _)
            for (l = 0, f = _[h].length; l < f; l++)
              u.event.add(s, h, _[h][l]);
        }
        X.hasData(i) && (m = X.access(i), O = u.extend({}, m), X.set(s, O));
      }
    }
    function ev(i, s) {
      var l = s.nodeName.toLowerCase();
      l === "input" && jn.test(i.type) ? s.checked = i.checked : (l === "input" || l === "textarea") && (s.defaultValue = i.defaultValue);
    }
    function Nr(i, s, l, f) {
      s = c(s);
      var h, v, m, O, _, M, F = 0, ee = i.length, $ = ee - 1, U = s[0], be = A(U);
      if (be || ee > 1 && typeof U == "string" && !w.checkClone && Gh.test(U))
        return i.each(function(ke) {
          var Ce = i.eq(ke);
          be && (s[0] = U.call(this, ke, Ce.html())), Nr(Ce, s, l, f);
        });
      if (ee && (h = iu(s, i[0].ownerDocument, !1, i, f), v = h.firstChild, h.childNodes.length === 1 && (h = v), v || f)) {
        for (m = u.map(Ze(h, "script"), Qh), O = m.length; F < ee; F++)
          _ = h, F !== $ && (_ = u.clone(_, !0, !0), O && u.merge(m, Ze(_, "script"))), l.call(i[F], _, F);
        if (O)
          for (M = m[m.length - 1].ownerDocument, u.map(m, Zh), F = 0; F < O; F++)
            _ = m[F], ui.test(_.type || "") && !D.access(_, "globalEval") && u.contains(M, _) && (_.src && (_.type || "").toLowerCase() !== "module" ? u._evalUrl && !_.noModule && u._evalUrl(_.src, {
              nonce: _.nonce || _.getAttribute("nonce")
            }, M) : z(_.textContent.replace(Jh, ""), _, M));
      }
      return i;
    }
    function lu(i, s, l) {
      for (var f, h = s ? u.filter(s, i) : i, v = 0; (f = h[v]) != null; v++)
        !l && f.nodeType === 1 && u.cleanData(Ze(f)), f.parentNode && (l && Te(f) && _r(Ze(f, "script")), f.parentNode.removeChild(f));
      return i;
    }
    u.extend({
      htmlPrefilter: function(i) {
        return i;
      },
      clone: function(i, s, l) {
        var f, h, v, m, O = i.cloneNode(!0), _ = Te(i);
        if (!w.noCloneChecked && (i.nodeType === 1 || i.nodeType === 11) && !u.isXMLDoc(i))
          for (m = Ze(O), v = Ze(i), f = 0, h = v.length; f < h; f++)
            ev(v[f], m[f]);
        if (s)
          if (l)
            for (v = v || Ze(i), m = m || Ze(O), f = 0, h = v.length; f < h; f++)
              su(v[f], m[f]);
          else
            su(i, O);
        return m = Ze(O, "script"), m.length > 0 && _r(m, !_ && Ze(i, "script")), O;
      },
      cleanData: function(i) {
        for (var s, l, f, h = u.event.special, v = 0; (l = i[v]) !== void 0; v++)
          if (k(l)) {
            if (s = l[D.expando]) {
              if (s.events)
                for (f in s.events)
                  h[f] ? u.event.remove(l, f) : u.removeEvent(l, f, s.handle);
              l[D.expando] = void 0;
            }
            l[X.expando] && (l[X.expando] = void 0);
          }
      }
    }), u.fn.extend({
      detach: function(i) {
        return lu(this, i, !0);
      },
      remove: function(i) {
        return lu(this, i);
      },
      text: function(i) {
        return Ot(this, function(s) {
          return s === void 0 ? u.text(this) : this.empty().each(function() {
            (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = s);
          });
        }, null, i, arguments.length);
      },
      append: function() {
        return Nr(this, arguments, function(i) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var s = au(this, i);
            s.appendChild(i);
          }
        });
      },
      prepend: function() {
        return Nr(this, arguments, function(i) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var s = au(this, i);
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
          i.nodeType === 1 && (u.cleanData(Ze(i, !1)), i.textContent = "");
        return this;
      },
      clone: function(i, s) {
        return i = i ?? !1, s = s ?? i, this.map(function() {
          return u.clone(this, i, s);
        });
      },
      html: function(i) {
        return Ot(this, function(s) {
          var l = this[0] || {}, f = 0, h = this.length;
          if (s === void 0 && l.nodeType === 1)
            return l.innerHTML;
          if (typeof s == "string" && !Kh.test(s) && !Qe[(Dn.exec(s) || ["", ""])[1].toLowerCase()]) {
            s = u.htmlPrefilter(s);
            try {
              for (; f < h; f++)
                l = this[f] || {}, l.nodeType === 1 && (u.cleanData(Ze(l, !1)), l.innerHTML = s);
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
          u.inArray(this, i) < 0 && (u.cleanData(Ze(this)), l && l.replaceChild(s, this));
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
    var wa = new RegExp("^(" + ne + ")(?!px)[a-z%]+$", "i"), io = function(i) {
      var s = i.ownerDocument.defaultView;
      return (!s || !s.opener) && (s = t), s.getComputedStyle(i);
    }, uu = function(i, s, l) {
      var f, h, v = {};
      for (h in s)
        v[h] = i.style[h], i.style[h] = s[h];
      f = l.call(i);
      for (h in s)
        i.style[h] = v[h];
      return f;
    }, tv = new RegExp(pe.join("|"), "i");
    (function() {
      function i() {
        if (M) {
          _.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", M.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", me.appendChild(_).appendChild(M);
          var F = t.getComputedStyle(M);
          l = F.top !== "1%", O = s(F.marginLeft) === 12, M.style.right = "60%", v = s(F.right) === 36, f = s(F.width) === 36, M.style.position = "absolute", h = s(M.offsetWidth / 3) === 12, me.removeChild(_), M = null;
        }
      }
      function s(F) {
        return Math.round(parseFloat(F));
      }
      var l, f, h, v, m, O, _ = P.createElement("div"), M = P.createElement("div");
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
          var F, ee, $, U;
          return m == null && (F = P.createElement("table"), ee = P.createElement("tr"), $ = P.createElement("div"), F.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", ee.style.cssText = "border:1px solid", ee.style.height = "1px", $.style.height = "9px", $.style.display = "block", me.appendChild(F).appendChild(ee).appendChild($), U = t.getComputedStyle(ee), m = parseInt(U.height, 10) + parseInt(U.borderTopWidth, 10) + parseInt(U.borderBottomWidth, 10) === ee.offsetHeight, me.removeChild(F)), m;
        }
      }));
    })();
    function ci(i, s, l) {
      var f, h, v, m, O = i.style;
      return l = l || io(i), l && (m = l.getPropertyValue(s) || l[s], m === "" && !Te(i) && (m = u.style(i, s)), !w.pixelBoxStyles() && wa.test(m) && tv.test(s) && (f = O.width, h = O.minWidth, v = O.maxWidth, O.minWidth = O.maxWidth = O.width = m, m = l.width, O.width = f, O.minWidth = h, O.maxWidth = v)), m !== void 0 ? (
        // Support: IE <=9 - 11 only
        // IE returns zIndex value as an integer.
        m + ""
      ) : m;
    }
    function cu(i, s) {
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
    var fu = ["Webkit", "Moz", "ms"], du = P.createElement("div").style, pu = {};
    function nv(i) {
      for (var s = i[0].toUpperCase() + i.slice(1), l = fu.length; l--; )
        if (i = fu[l] + s, i in du)
          return i;
    }
    function Ta(i) {
      var s = u.cssProps[i] || pu[i];
      return s || (i in du ? i : pu[i] = nv(i) || i);
    }
    var rv = /^(none|table(?!-c[ea]).+)/, hu = /^--/, iv = { position: "absolute", visibility: "hidden", display: "block" }, vu = {
      letterSpacing: "0",
      fontWeight: "400"
    };
    function gu(i, s, l) {
      var f = ye.exec(s);
      return f ? (
        // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max(0, f[2] - (l || 0)) + (f[3] || "px")
      ) : s;
    }
    function Ea(i, s, l, f, h, v) {
      var m = s === "width" ? 1 : 0, O = 0, _ = 0;
      if (l === (f ? "border" : "content"))
        return 0;
      for (; m < 4; m += 2)
        l === "margin" && (_ += u.css(i, l + pe[m], !0, h)), f ? (l === "content" && (_ -= u.css(i, "padding" + pe[m], !0, h)), l !== "margin" && (_ -= u.css(i, "border" + pe[m] + "Width", !0, h))) : (_ += u.css(i, "padding" + pe[m], !0, h), l !== "padding" ? _ += u.css(i, "border" + pe[m] + "Width", !0, h) : O += u.css(i, "border" + pe[m] + "Width", !0, h));
      return !f && v >= 0 && (_ += Math.max(0, Math.ceil(
        i["offset" + s[0].toUpperCase() + s.slice(1)] - v - _ - O - 0.5
        // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
        // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0), _;
    }
    function mu(i, s, l) {
      var f = io(i), h = !w.boxSizingReliable() || l, v = h && u.css(i, "boxSizing", !1, f) === "border-box", m = v, O = ci(i, s, f), _ = "offset" + s[0].toUpperCase() + s.slice(1);
      if (wa.test(O)) {
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
      i.getClientRects().length && (v = u.css(i, "boxSizing", !1, f) === "border-box", m = _ in i, m && (O = i[_])), O = parseFloat(O) || 0, O + Ea(
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
              var l = ci(i, "opacity");
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
          var h, v, m, O = S(s), _ = hu.test(s), M = i.style;
          if (_ || (s = Ta(O)), m = u.cssHooks[s] || u.cssHooks[O], l !== void 0) {
            if (v = typeof l, v === "string" && (h = ye.exec(l)) && h[1] && (l = ze(i, s, h), v = "number"), l == null || l !== l)
              return;
            v === "number" && !_ && (l += h && h[3] || (u.cssNumber[O] ? "" : "px")), !w.clearCloneStyle && l === "" && s.indexOf("background") === 0 && (M[s] = "inherit"), (!m || !("set" in m) || (l = m.set(i, l, f)) !== void 0) && (_ ? M.setProperty(s, l) : M[s] = l);
          } else
            return m && "get" in m && (h = m.get(i, !1, f)) !== void 0 ? h : M[s];
        }
      },
      css: function(i, s, l, f) {
        var h, v, m, O = S(s), _ = hu.test(s);
        return _ || (s = Ta(O)), m = u.cssHooks[s] || u.cssHooks[O], m && "get" in m && (h = m.get(i, !0, l)), h === void 0 && (h = ci(i, s, f)), h === "normal" && s in vu && (h = vu[s]), l === "" || l ? (v = parseFloat(h), l === !0 || isFinite(v) ? v || 0 : h) : h;
      }
    }), u.each(["height", "width"], function(i, s) {
      u.cssHooks[s] = {
        get: function(l, f, h) {
          if (f)
            return rv.test(u.css(l, "display")) && // Support: Safari 8+
            // Table columns in Safari have non-zero offsetWidth & zero
            // getBoundingClientRect().width unless display is changed.
            // Support: IE <=11 only
            // Running getBoundingClientRect on a disconnected node
            // in IE throws an error.
            (!l.getClientRects().length || !l.getBoundingClientRect().width) ? uu(l, iv, function() {
              return mu(l, s, h);
            }) : mu(l, s, h);
        },
        set: function(l, f, h) {
          var v, m = io(l), O = !w.scrollboxSize() && m.position === "absolute", _ = O || h, M = _ && u.css(l, "boxSizing", !1, m) === "border-box", F = h ? Ea(
            l,
            s,
            h,
            M,
            m
          ) : 0;
          return M && O && (F -= Math.ceil(
            l["offset" + s[0].toUpperCase() + s.slice(1)] - parseFloat(m[s]) - Ea(l, s, "border", !1, m) - 0.5
          )), F && (v = ye.exec(f)) && (v[3] || "px") !== "px" && (l.style[s] = f, f = u.css(l, s)), gu(l, f, F);
        }
      };
    }), u.cssHooks.marginLeft = cu(
      w.reliableMarginLeft,
      function(i, s) {
        if (s)
          return (parseFloat(ci(i, "marginLeft")) || i.getBoundingClientRect().left - uu(i, { marginLeft: 0 }, function() {
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
            h[i + pe[f] + s] = v[f] || v[f - 2] || v[0];
          return h;
        }
      }, i !== "margin" && (u.cssHooks[i + s].set = gu);
    }), u.fn.extend({
      css: function(i, s) {
        return Ot(this, function(l, f, h) {
          var v, m, O = {}, _ = 0;
          if (Array.isArray(f)) {
            for (v = io(l), m = f.length; _ < m; _++)
              O[f[_]] = u.css(l, f[_], !1, v);
            return O;
          }
          return h !== void 0 ? u.style(l, f, h) : u.css(l, f);
        }, i, s, arguments.length > 1);
      }
    });
    function _t(i, s, l, f, h) {
      return new _t.prototype.init(i, s, l, f, h);
    }
    u.Tween = _t, _t.prototype = {
      constructor: _t,
      init: function(i, s, l, f, h, v) {
        this.elem = i, this.prop = l, this.easing = h || u.easing._default, this.options = s, this.start = this.now = this.cur(), this.end = f, this.unit = v || (u.cssNumber[l] ? "" : "px");
      },
      cur: function() {
        var i = _t.propHooks[this.prop];
        return i && i.get ? i.get(this) : _t.propHooks._default.get(this);
      },
      run: function(i) {
        var s, l = _t.propHooks[this.prop];
        return this.options.duration ? this.pos = s = u.easing[this.easing](
          i,
          this.options.duration * i,
          0,
          1,
          this.options.duration
        ) : this.pos = s = i, this.now = (this.end - this.start) * s + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), l && l.set ? l.set(this) : _t.propHooks._default.set(this), this;
      }
    }, _t.prototype.init.prototype = _t.prototype, _t.propHooks = {
      _default: {
        get: function(i) {
          var s;
          return i.elem.nodeType !== 1 || i.elem[i.prop] != null && i.elem.style[i.prop] == null ? i.elem[i.prop] : (s = u.css(i.elem, i.prop, ""), !s || s === "auto" ? 0 : s);
        },
        set: function(i) {
          u.fx.step[i.prop] ? u.fx.step[i.prop](i) : i.elem.nodeType === 1 && (u.cssHooks[i.prop] || i.elem.style[Ta(i.prop)] != null) ? u.style(i.elem, i.prop, i.now + i.unit) : i.elem[i.prop] = i.now;
        }
      }
    }, _t.propHooks.scrollTop = _t.propHooks.scrollLeft = {
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
    }, u.fx = _t.prototype.init, u.fx.step = {};
    var kr, oo, ov = /^(?:toggle|show|hide)$/, av = /queueHooks$/;
    function Sa() {
      oo && (P.hidden === !1 && t.requestAnimationFrame ? t.requestAnimationFrame(Sa) : t.setTimeout(Sa, u.fx.interval), u.fx.tick());
    }
    function yu() {
      return t.setTimeout(function() {
        kr = void 0;
      }), kr = Date.now();
    }
    function ao(i, s) {
      var l, f = 0, h = { height: i };
      for (s = s ? 1 : 0; f < 4; f += 2 - s)
        l = pe[f], h["margin" + l] = h["padding" + l] = i;
      return s && (h.opacity = h.width = i), h;
    }
    function bu(i, s, l) {
      for (var f, h = (nn.tweeners[s] || []).concat(nn.tweeners["*"]), v = 0, m = h.length; v < m; v++)
        if (f = h[v].call(l, s, i))
          return f;
    }
    function sv(i, s, l) {
      var f, h, v, m, O, _, M, F, ee = "width" in s || "height" in s, $ = this, U = {}, be = i.style, ke = i.nodeType && Ue(i), Ce = D.get(i, "fxshow");
      l.queue || (m = u._queueHooks(i, "fx"), m.unqueued == null && (m.unqueued = 0, O = m.empty.fire, m.empty.fire = function() {
        m.unqueued || O();
      }), m.unqueued++, $.always(function() {
        $.always(function() {
          m.unqueued--, u.queue(i, "fx").length || m.empty.fire();
        });
      }));
      for (f in s)
        if (h = s[f], ov.test(h)) {
          if (delete s[f], v = v || h === "toggle", h === (ke ? "hide" : "show"))
            if (h === "show" && Ce && Ce[f] !== void 0)
              ke = !0;
            else
              continue;
          U[f] = Ce && Ce[f] || u.style(i, f);
        }
      if (_ = !u.isEmptyObject(s), !(!_ && u.isEmptyObject(U))) {
        ee && i.nodeType === 1 && (l.overflow = [be.overflow, be.overflowX, be.overflowY], M = Ce && Ce.display, M == null && (M = D.get(i, "display")), F = u.css(i, "display"), F === "none" && (M ? F = M : (It([i], !0), M = i.style.display || M, F = u.css(i, "display"), It([i]))), (F === "inline" || F === "inline-block" && M != null) && u.css(i, "float") === "none" && (_ || ($.done(function() {
          be.display = M;
        }), M == null && (F = be.display, M = F === "none" ? "" : F)), be.display = "inline-block")), l.overflow && (be.overflow = "hidden", $.always(function() {
          be.overflow = l.overflow[0], be.overflowX = l.overflow[1], be.overflowY = l.overflow[2];
        })), _ = !1;
        for (f in U)
          _ || (Ce ? "hidden" in Ce && (ke = Ce.hidden) : Ce = D.access(i, "fxshow", { display: M }), v && (Ce.hidden = !ke), ke && It([i], !0), $.done(function() {
            ke || It([i]), D.remove(i, "fxshow");
            for (f in U)
              u.style(i, f, U[f]);
          })), _ = bu(ke ? Ce[f] : 0, f, $), f in Ce || (Ce[f] = _.start, ke && (_.end = _.start, _.start = 0));
      }
    }
    function lv(i, s) {
      var l, f, h, v, m;
      for (l in i)
        if (f = S(l), h = s[f], v = i[l], Array.isArray(v) && (h = v[1], v = i[l] = v[0]), l !== f && (i[f] = v, delete i[l]), m = u.cssHooks[f], m && "expand" in m) {
          v = m.expand(v), delete i[f];
          for (l in v)
            l in i || (i[l] = v[l], s[l] = h);
        } else
          s[f] = h;
    }
    function nn(i, s, l) {
      var f, h, v = 0, m = nn.prefilters.length, O = u.Deferred().always(function() {
        delete _.elem;
      }), _ = function() {
        if (h)
          return !1;
        for (var ee = kr || yu(), $ = Math.max(0, M.startTime + M.duration - ee), U = $ / M.duration || 0, be = 1 - U, ke = 0, Ce = M.tweens.length; ke < Ce; ke++)
          M.tweens[ke].run(be);
        return O.notifyWith(i, [M, be, $]), be < 1 && Ce ? $ : (Ce || O.notifyWith(i, [M, 1, 0]), O.resolveWith(i, [M]), !1);
      }, M = O.promise({
        elem: i,
        props: u.extend({}, s),
        opts: u.extend(!0, {
          specialEasing: {},
          easing: u.easing._default
        }, l),
        originalProperties: s,
        originalOptions: l,
        startTime: kr || yu(),
        duration: l.duration,
        tweens: [],
        createTween: function(ee, $) {
          var U = u.Tween(
            i,
            M.opts,
            ee,
            $,
            M.opts.specialEasing[ee] || M.opts.easing
          );
          return M.tweens.push(U), U;
        },
        stop: function(ee) {
          var $ = 0, U = ee ? M.tweens.length : 0;
          if (h)
            return this;
          for (h = !0; $ < U; $++)
            M.tweens[$].run(1);
          return ee ? (O.notifyWith(i, [M, 1, 0]), O.resolveWith(i, [M, ee])) : O.rejectWith(i, [M, ee]), this;
        }
      }), F = M.props;
      for (lv(F, M.opts.specialEasing); v < m; v++)
        if (f = nn.prefilters[v].call(M, i, F, M.opts), f)
          return A(f.stop) && (u._queueHooks(M.elem, M.opts.queue).stop = f.stop.bind(f)), f;
      return u.map(F, bu, M), A(M.opts.start) && M.opts.start.call(i, M), M.progress(M.opts.progress).done(M.opts.done, M.opts.complete).fail(M.opts.fail).always(M.opts.always), u.fx.timer(
        u.extend(_, {
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
          return ze(l.elem, i, ye.exec(s), l), l;
        }]
      },
      tweener: function(i, s) {
        A(i) ? (s = i, i = ["*"]) : i = i.match(Ae);
        for (var l, f = 0, h = i.length; f < h; f++)
          l = i[f], nn.tweeners[l] = nn.tweeners[l] || [], nn.tweeners[l].unshift(s);
      },
      prefilters: [sv],
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
        return this.filter(Ue).css("opacity", 0).show().end().animate({ opacity: s }, i, l, f);
      },
      animate: function(i, s, l, f) {
        var h = u.isEmptyObject(i), v = u.speed(s, l, f), m = function() {
          var O = nn(this, u.extend({}, i), v);
          (h || D.get(this, "finish")) && O.stop(!0);
        };
        return m.finish = m, h || v.queue === !1 ? this.each(m) : this.queue(v.queue, m);
      },
      stop: function(i, s, l) {
        var f = function(h) {
          var v = h.stop;
          delete h.stop, v(l);
        };
        return typeof i != "string" && (l = s, s = i, i = void 0), s && this.queue(i || "fx", []), this.each(function() {
          var h = !0, v = i != null && i + "queueHooks", m = u.timers, O = D.get(this);
          if (v)
            O[v] && O[v].stop && f(O[v]);
          else
            for (v in O)
              O[v] && O[v].stop && av.test(v) && f(O[v]);
          for (v = m.length; v--; )
            m[v].elem === this && (i == null || m[v].queue === i) && (m[v].anim.stop(l), h = !1, m.splice(v, 1));
          (h || !l) && u.dequeue(this, i);
        });
      },
      finish: function(i) {
        return i !== !1 && (i = i || "fx"), this.each(function() {
          var s, l = D.get(this), f = l[i + "queue"], h = l[i + "queueHooks"], v = u.timers, m = f ? f.length : 0;
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
        return f == null || typeof f == "boolean" ? l.apply(this, arguments) : this.animate(ao(s, !0), f, h, v);
      };
    }), u.each({
      slideDown: ao("show"),
      slideUp: ao("hide"),
      slideToggle: ao("toggle"),
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
      oo || (oo = !0, Sa());
    }, u.fx.stop = function() {
      oo = null;
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
      var i = P.createElement("input"), s = P.createElement("select"), l = s.appendChild(P.createElement("option"));
      i.type = "checkbox", w.checkOn = i.value !== "", w.optSelected = l.selected, i = P.createElement("input"), i.value = "t", i.type = "radio", w.radioValue = i.value === "t";
    }();
    var Cu, fi = u.expr.attrHandle;
    u.fn.extend({
      attr: function(i, s) {
        return Ot(this, u.attr, i, s, arguments.length > 1);
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
          if ((v !== 1 || !u.isXMLDoc(i)) && (h = u.attrHooks[s.toLowerCase()] || (u.expr.match.bool.test(s) ? Cu : void 0)), l !== void 0) {
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
        var l, f = 0, h = s && s.match(Ae);
        if (h && i.nodeType === 1)
          for (; l = h[f++]; )
            i.removeAttribute(l);
      }
    }), Cu = {
      set: function(i, s, l) {
        return s === !1 ? u.removeAttr(i, l) : i.setAttribute(l, l), l;
      }
    }, u.each(u.expr.match.bool.source.match(/\w+/g), function(i, s) {
      var l = fi[s] || u.find.attr;
      fi[s] = function(f, h, v) {
        var m, O, _ = h.toLowerCase();
        return v || (O = fi[_], fi[_] = m, m = l(f, h, v) != null ? _ : null, fi[_] = O), m;
      };
    });
    var uv = /^(?:input|select|textarea|button)$/i, cv = /^(?:a|area)$/i;
    u.fn.extend({
      prop: function(i, s) {
        return Ot(this, u.prop, i, s, arguments.length > 1);
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
            return s ? parseInt(s, 10) : uv.test(i.nodeName) || cv.test(i.nodeName) && i.href ? 0 : -1;
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
      var s = i.match(Ae) || [];
      return s.join(" ");
    }
    function ir(i) {
      return i.getAttribute && i.getAttribute("class") || "";
    }
    function Oa(i) {
      return Array.isArray(i) ? i : typeof i == "string" ? i.match(Ae) || [] : [];
    }
    u.fn.extend({
      addClass: function(i) {
        var s, l, f, h, v, m, O, _ = 0;
        if (A(i))
          return this.each(function(M) {
            u(this).addClass(i.call(this, M, ir(this)));
          });
        if (s = Oa(i), s.length) {
          for (; l = this[_++]; )
            if (h = ir(l), f = l.nodeType === 1 && " " + rr(h) + " ", f) {
              for (m = 0; v = s[m++]; )
                f.indexOf(" " + v + " ") < 0 && (f += v + " ");
              O = rr(f), h !== O && l.setAttribute("class", O);
            }
        }
        return this;
      },
      removeClass: function(i) {
        var s, l, f, h, v, m, O, _ = 0;
        if (A(i))
          return this.each(function(M) {
            u(this).removeClass(i.call(this, M, ir(this)));
          });
        if (!arguments.length)
          return this.attr("class", "");
        if (s = Oa(i), s.length) {
          for (; l = this[_++]; )
            if (h = ir(l), f = l.nodeType === 1 && " " + rr(h) + " ", f) {
              for (m = 0; v = s[m++]; )
                for (; f.indexOf(" " + v + " ") > -1; )
                  f = f.replace(" " + v + " ", " ");
              O = rr(f), h !== O && l.setAttribute("class", O);
            }
        }
        return this;
      },
      toggleClass: function(i, s) {
        var l = typeof i, f = l === "string" || Array.isArray(i);
        return typeof s == "boolean" && f ? s ? this.addClass(i) : this.removeClass(i) : A(i) ? this.each(function(h) {
          u(this).toggleClass(
            i.call(this, h, ir(this), s),
            s
          );
        }) : this.each(function() {
          var h, v, m, O;
          if (f)
            for (v = 0, m = u(this), O = Oa(i); h = O[v++]; )
              m.hasClass(h) ? m.removeClass(h) : m.addClass(h);
          else
            (i === void 0 || l === "boolean") && (h = ir(this), h && D.set(this, "__className__", h), this.setAttribute && this.setAttribute(
              "class",
              h || i === !1 ? "" : D.get(this, "__className__") || ""
            ));
        });
      },
      hasClass: function(i) {
        var s, l, f = 0;
        for (s = " " + i + " "; l = this[f++]; )
          if (l.nodeType === 1 && (" " + rr(ir(l)) + " ").indexOf(s) > -1)
            return !0;
        return !1;
      }
    });
    var fv = /\r/g;
    u.fn.extend({
      val: function(i) {
        var s, l, f, h = this[0];
        return arguments.length ? (f = A(i), this.each(function(v) {
          var m;
          this.nodeType === 1 && (f ? m = i.call(this, v, u(this).val()) : m = i, m == null ? m = "" : typeof m == "number" ? m += "" : Array.isArray(m) && (m = u.map(m, function(O) {
            return O == null ? "" : O + "";
          })), s = u.valHooks[this.type] || u.valHooks[this.nodeName.toLowerCase()], (!s || !("set" in s) || s.set(this, m, "value") === void 0) && (this.value = m));
        })) : h ? (s = u.valHooks[h.type] || u.valHooks[h.nodeName.toLowerCase()], s && "get" in s && (l = s.get(h, "value")) !== void 0 ? l : (l = h.value, typeof l == "string" ? l.replace(fv, "") : l ?? "")) : void 0;
      }
    }), u.extend({
      valHooks: {
        option: {
          get: function(i) {
            var s = u.find.attr(i, "value");
            return s ?? // Support: IE <=10 - 11 only
            // option.text throws exceptions (#14686, #14858)
            // Strip and collapse whitespace
            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
            rr(u.text(i));
          }
        },
        select: {
          get: function(i) {
            var s, l, f, h = i.options, v = i.selectedIndex, m = i.type === "select-one", O = m ? null : [], _ = m ? v + 1 : h.length;
            for (v < 0 ? f = _ : f = m ? v : 0; f < _; f++)
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
    var xu = /^(?:focusinfocus|focusoutblur)$/, wu = function(i) {
      i.stopPropagation();
    };
    u.extend(u.event, {
      trigger: function(i, s, l, f) {
        var h, v, m, O, _, M, F, ee, $ = [l || P], U = C.call(i, "type") ? i.type : i, be = C.call(i, "namespace") ? i.namespace.split(".") : [];
        if (v = ee = m = l = l || P, !(l.nodeType === 3 || l.nodeType === 8) && !xu.test(U + u.event.triggered) && (U.indexOf(".") > -1 && (be = U.split("."), U = be.shift(), be.sort()), _ = U.indexOf(":") < 0 && "on" + U, i = i[u.expando] ? i : new u.Event(U, typeof i == "object" && i), i.isTrigger = f ? 2 : 3, i.namespace = be.join("."), i.rnamespace = i.namespace ? new RegExp("(^|\\.)" + be.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.result = void 0, i.target || (i.target = l), s = s == null ? [i] : u.makeArray(s, [i]), F = u.event.special[U] || {}, !(!f && F.trigger && F.trigger.apply(l, s) === !1))) {
          if (!f && !F.noBubble && !I(l)) {
            for (O = F.delegateType || U, xu.test(O + U) || (v = v.parentNode); v; v = v.parentNode)
              $.push(v), m = v;
            m === (l.ownerDocument || P) && $.push(m.defaultView || m.parentWindow || t);
          }
          for (h = 0; (v = $[h++]) && !i.isPropagationStopped(); )
            ee = v, i.type = h > 1 ? O : F.bindType || U, M = (D.get(v, "events") || /* @__PURE__ */ Object.create(null))[i.type] && D.get(v, "handle"), M && M.apply(v, s), M = _ && v[_], M && M.apply && k(v) && (i.result = M.apply(v, s), i.result === !1 && i.preventDefault());
          return i.type = U, !f && !i.isDefaultPrevented() && (!F._default || F._default.apply($.pop(), s) === !1) && k(l) && _ && A(l[U]) && !I(l) && (m = l[_], m && (l[_] = null), u.event.triggered = U, i.isPropagationStopped() && ee.addEventListener(U, wu), l[U](), i.isPropagationStopped() && ee.removeEventListener(U, wu), u.event.triggered = void 0, m && (l[_] = m)), i.result;
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
          var f = this.ownerDocument || this.document || this, h = D.access(f, s);
          h || f.addEventListener(i, l, !0), D.access(f, s, (h || 0) + 1);
        },
        teardown: function() {
          var f = this.ownerDocument || this.document || this, h = D.access(f, s) - 1;
          h ? D.access(f, s, h) : (f.removeEventListener(i, l, !0), D.remove(f, s));
        }
      };
    });
    var di = t.location, Tu = { guid: Date.now() }, _a = /\?/;
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
    var dv = /\[\]$/, Eu = /\r?\n/g, pv = /^(?:submit|button|image|reset|file)$/i, hv = /^(?:input|select|textarea|keygen)/i;
    function Aa(i, s, l, f) {
      var h;
      if (Array.isArray(s))
        u.each(s, function(v, m) {
          l || dv.test(i) ? f(i, m) : Aa(
            i + "[" + (typeof m == "object" && m != null ? v : "") + "]",
            m,
            l,
            f
          );
        });
      else if (!l && Z(s) === "object")
        for (h in s)
          Aa(i + "[" + h + "]", s[h], l, f);
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
          Aa(l, i[l], s, h);
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
          return this.name && !u(this).is(":disabled") && hv.test(this.nodeName) && !pv.test(i) && (this.checked || !jn.test(i));
        }).map(function(i, s) {
          var l = u(this).val();
          return l == null ? null : Array.isArray(l) ? u.map(l, function(f) {
            return { name: s.name, value: f.replace(Eu, `\r
`) };
          }) : { name: s.name, value: l.replace(Eu, `\r
`) };
        }).get();
      }
    });
    var vv = /%20/g, gv = /#.*$/, mv = /([?&])_=[^&]*/, yv = /^(.*?):[ \t]*([^\r\n]*)$/mg, bv = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Cv = /^(?:GET|HEAD)$/, xv = /^\/\//, Su = {}, Pa = {}, Ou = "*/".concat("*"), Na = P.createElement("a");
    Na.href = di.href;
    function _u(i) {
      return function(s, l) {
        typeof s != "string" && (l = s, s = "*");
        var f, h = 0, v = s.toLowerCase().match(Ae) || [];
        if (A(l))
          for (; f = v[h++]; )
            f[0] === "+" ? (f = f.slice(1) || "*", (i[f] = i[f] || []).unshift(l)) : (i[f] = i[f] || []).push(l);
      };
    }
    function Au(i, s, l, f) {
      var h = {}, v = i === Pa;
      function m(O) {
        var _;
        return h[O] = !0, u.each(i[O] || [], function(M, F) {
          var ee = F(s, l, f);
          if (typeof ee == "string" && !v && !h[ee])
            return s.dataTypes.unshift(ee), m(ee), !1;
          if (v)
            return !(_ = ee);
        }), _;
      }
      return m(s.dataTypes[0]) || !h["*"] && m("*");
    }
    function ka(i, s) {
      var l, f, h = u.ajaxSettings.flatOptions || {};
      for (l in s)
        s[l] !== void 0 && ((h[l] ? i : f || (f = {}))[l] = s[l]);
      return f && u.extend(!0, i, f), i;
    }
    function wv(i, s, l) {
      for (var f, h, v, m, O = i.contents, _ = i.dataTypes; _[0] === "*"; )
        _.shift(), f === void 0 && (f = i.mimeType || s.getResponseHeader("Content-Type"));
      if (f) {
        for (h in O)
          if (O[h] && O[h].test(f)) {
            _.unshift(h);
            break;
          }
      }
      if (_[0] in l)
        v = _[0];
      else {
        for (h in l) {
          if (!_[0] || i.converters[h + " " + _[0]]) {
            v = h;
            break;
          }
          m || (m = h);
        }
        v = v || m;
      }
      if (v)
        return v !== _[0] && _.unshift(v), l[v];
    }
    function Tv(i, s, l, f) {
      var h, v, m, O, _, M = {}, F = i.dataTypes.slice();
      if (F[1])
        for (m in i.converters)
          M[m.toLowerCase()] = i.converters[m];
      for (v = F.shift(); v; )
        if (i.responseFields[v] && (l[i.responseFields[v]] = s), !_ && f && i.dataFilter && (s = i.dataFilter(s, i.dataType)), _ = v, v = F.shift(), v) {
          if (v === "*")
            v = _;
          else if (_ !== "*" && _ !== v) {
            if (m = M[_ + " " + v] || M["* " + v], !m) {
              for (h in M)
                if (O = h.split(" "), O[1] === v && (m = M[_ + " " + O[0]] || M["* " + O[0]], m)) {
                  m === !0 ? m = M[h] : M[h] !== !0 && (v = O[0], F.unshift(O[1]));
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
                    error: m ? ee : "No conversion from " + _ + " to " + v
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
        url: di.href,
        type: "GET",
        isLocal: bv.test(di.protocol),
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
          "*": Ou,
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
          ka(ka(i, u.ajaxSettings), s)
        ) : (
          // Extending ajaxSettings
          ka(u.ajaxSettings, i)
        );
      },
      ajaxPrefilter: _u(Su),
      ajaxTransport: _u(Pa),
      // Main method
      ajax: function(i, s) {
        typeof i == "object" && (s = i, i = void 0), s = s || {};
        var l, f, h, v, m, O, _, M, F, ee, $ = u.ajaxSetup({}, s), U = $.context || $, be = $.context && (U.nodeType || U.jquery) ? u(U) : u.event, ke = u.Deferred(), Ce = u.Callbacks("once memory"), ct = $.statusCode || {}, st = {}, jt = {}, Ve = "canceled", Ne = {
          readyState: 0,
          // Builds headers hashtable if needed
          getResponseHeader: function(Be) {
            var rt;
            if (_) {
              if (!v)
                for (v = {}; rt = yv.exec(h); )
                  v[rt[1].toLowerCase() + " "] = (v[rt[1].toLowerCase() + " "] || []).concat(rt[2]);
              rt = v[Be.toLowerCase() + " "];
            }
            return rt == null ? null : rt.join(", ");
          },
          // Raw string
          getAllResponseHeaders: function() {
            return _ ? h : null;
          },
          // Caches the header
          setRequestHeader: function(Be, rt) {
            return _ == null && (Be = jt[Be.toLowerCase()] = jt[Be.toLowerCase()] || Be, st[Be] = rt), this;
          },
          // Overrides response content-type header
          overrideMimeType: function(Be) {
            return _ == null && ($.mimeType = Be), this;
          },
          // Status-dependent callbacks
          statusCode: function(Be) {
            var rt;
            if (Be)
              if (_)
                Ne.always(Be[Ne.status]);
              else
                for (rt in Be)
                  ct[rt] = [ct[rt], Be[rt]];
            return this;
          },
          // Cancel the request
          abort: function(Be) {
            var rt = Be || Ve;
            return l && l.abort(rt), At(0, rt), this;
          }
        };
        if (ke.promise(Ne), $.url = ((i || $.url || di.href) + "").replace(xv, di.protocol + "//"), $.type = s.method || s.type || $.method || $.type, $.dataTypes = ($.dataType || "*").toLowerCase().match(Ae) || [""], $.crossDomain == null) {
          O = P.createElement("a");
          try {
            O.href = $.url, O.href = O.href, $.crossDomain = Na.protocol + "//" + Na.host != O.protocol + "//" + O.host;
          } catch {
            $.crossDomain = !0;
          }
        }
        if ($.data && $.processData && typeof $.data != "string" && ($.data = u.param($.data, $.traditional)), Au(Su, $, s, Ne), _)
          return Ne;
        M = u.event && $.global, M && u.active++ === 0 && u.event.trigger("ajaxStart"), $.type = $.type.toUpperCase(), $.hasContent = !Cv.test($.type), f = $.url.replace(gv, ""), $.hasContent ? $.data && $.processData && ($.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && ($.data = $.data.replace(vv, "+")) : (ee = $.url.slice(f.length), $.data && ($.processData || typeof $.data == "string") && (f += (_a.test(f) ? "&" : "?") + $.data, delete $.data), $.cache === !1 && (f = f.replace(mv, "$1"), ee = (_a.test(f) ? "&" : "?") + "_=" + Tu.guid++ + ee), $.url = f + ee), $.ifModified && (u.lastModified[f] && Ne.setRequestHeader("If-Modified-Since", u.lastModified[f]), u.etag[f] && Ne.setRequestHeader("If-None-Match", u.etag[f])), ($.data && $.hasContent && $.contentType !== !1 || s.contentType) && Ne.setRequestHeader("Content-Type", $.contentType), Ne.setRequestHeader(
          "Accept",
          $.dataTypes[0] && $.accepts[$.dataTypes[0]] ? $.accepts[$.dataTypes[0]] + ($.dataTypes[0] !== "*" ? ", " + Ou + "; q=0.01" : "") : $.accepts["*"]
        );
        for (F in $.headers)
          Ne.setRequestHeader(F, $.headers[F]);
        if ($.beforeSend && ($.beforeSend.call(U, Ne, $) === !1 || _))
          return Ne.abort();
        if (Ve = "abort", Ce.add($.complete), Ne.done($.success), Ne.fail($.error), l = Au(Pa, $, s, Ne), !l)
          At(-1, "No Transport");
        else {
          if (Ne.readyState = 1, M && be.trigger("ajaxSend", [Ne, $]), _)
            return Ne;
          $.async && $.timeout > 0 && (m = t.setTimeout(function() {
            Ne.abort("timeout");
          }, $.timeout));
          try {
            _ = !1, l.send(st, At);
          } catch (Be) {
            if (_)
              throw Be;
            At(-1, Be);
          }
        }
        function At(Be, rt, hi, so) {
          var Dt, or, ar, Pt, $n, Xt = rt;
          _ || (_ = !0, m && t.clearTimeout(m), l = void 0, h = so || "", Ne.readyState = Be > 0 ? 4 : 0, Dt = Be >= 200 && Be < 300 || Be === 304, hi && (Pt = wv($, Ne, hi)), !Dt && u.inArray("script", $.dataTypes) > -1 && u.inArray("json", $.dataTypes) < 0 && ($.converters["text script"] = function() {
          }), Pt = Tv($, Pt, Ne, Dt), Dt ? ($.ifModified && ($n = Ne.getResponseHeader("Last-Modified"), $n && (u.lastModified[f] = $n), $n = Ne.getResponseHeader("etag"), $n && (u.etag[f] = $n)), Be === 204 || $.type === "HEAD" ? Xt = "nocontent" : Be === 304 ? Xt = "notmodified" : (Xt = Pt.state, or = Pt.data, ar = Pt.error, Dt = !ar)) : (ar = Xt, (Be || !Xt) && (Xt = "error", Be < 0 && (Be = 0))), Ne.status = Be, Ne.statusText = (rt || Xt) + "", Dt ? ke.resolveWith(U, [or, Xt, Ne]) : ke.rejectWith(U, [Ne, Xt, ar]), Ne.statusCode(ct), ct = void 0, M && be.trigger(
            Dt ? "ajaxSuccess" : "ajaxError",
            [Ne, $, Dt ? or : ar]
          ), Ce.fireWith(U, [Ne, Xt]), M && (be.trigger("ajaxComplete", [Ne, $]), --u.active || u.event.trigger("ajaxStop")));
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
        // Make this explicit, since user can override this through ajaxSetup (#11264)
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
    var Ev = {
      // File protocol always yields status code 0, assume 200
      0: 200,
      // Support: IE <=9 only
      // #1450: sometimes IE returns 1223 when it should be 204
      1223: 204
    }, pi = u.ajaxSettings.xhr();
    w.cors = !!pi && "withCredentials" in pi, w.ajax = pi = !!pi, u.ajaxTransport(function(i) {
      var s, l;
      if (w.cors || pi && !i.crossDomain)
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
                  // File: protocol always yields status 0; see #8605, #14207
                  m.status,
                  m.statusText
                ) : h(
                  Ev[m.status] || m.status,
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
            }), P.head.appendChild(s[0]);
          },
          abort: function() {
            l && l();
          }
        };
      }
    });
    var Pu = [], La = /(=)\?(?=&|$)|\?\?/;
    u.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        var i = Pu.pop() || u.expando + "_" + Tu.guid++;
        return this[i] = !0, i;
      }
    }), u.ajaxPrefilter("json jsonp", function(i, s, l) {
      var f, h, v, m = i.jsonp !== !1 && (La.test(i.url) ? "url" : typeof i.data == "string" && (i.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && La.test(i.data) && "data");
      if (m || i.dataTypes[0] === "jsonp")
        return f = i.jsonpCallback = A(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, m ? i[m] = i[m].replace(La, "$1" + f) : i.jsonp !== !1 && (i.url += (_a.test(i.url) ? "&" : "?") + i.jsonp + "=" + f), i.converters["script json"] = function() {
          return v || u.error(f + " was not called"), v[0];
        }, i.dataTypes[0] = "json", h = t[f], t[f] = function() {
          v = arguments;
        }, l.always(function() {
          h === void 0 ? u(t).removeProp(f) : t[f] = h, i[f] && (i.jsonpCallback = s.jsonpCallback, Pu.push(f)), v && A(h) && h(v[0]), v = h = void 0;
        }), "script";
    }), w.createHTMLDocument = function() {
      var i = P.implementation.createHTMLDocument("").body;
      return i.innerHTML = "<form></form><form></form>", i.childNodes.length === 2;
    }(), u.parseHTML = function(i, s, l) {
      if (typeof i != "string")
        return [];
      typeof s == "boolean" && (l = s, s = !1);
      var f, h, v;
      return s || (w.createHTMLDocument ? (s = P.implementation.createHTMLDocument(""), f = s.createElement("base"), f.href = P.location.href, s.head.appendChild(f)) : s = P), h = he.exec(i), v = !l && [], h ? [s.createElement(h[1])] : (h = iu([i], s, v), v && v.length && u(v).remove(), u.merge([], h.childNodes));
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
      }).done(function(_) {
        v = arguments, m.html(f ? (
          // If a selector was specified, locate the right elements in a dummy div
          // Exclude scripts to avoid IE 'Permission Denied' errors
          u("<div>").append(u.parseHTML(_)).find(f)
        ) : (
          // Otherwise use the full result
          _
        ));
      }).always(l && function(_, M) {
        m.each(function() {
          l.apply(this, v || [_.responseText, M, _]);
        });
      }), this;
    }, u.expr.pseudos.animated = function(i) {
      return u.grep(u.timers, function(s) {
        return i === s.elem;
      }).length;
    }, u.offset = {
      setOffset: function(i, s, l) {
        var f, h, v, m, O, _, M, F = u.css(i, "position"), ee = u(i), $ = {};
        F === "static" && (i.style.position = "relative"), O = ee.offset(), v = u.css(i, "top"), _ = u.css(i, "left"), M = (F === "absolute" || F === "fixed") && (v + _).indexOf("auto") > -1, M ? (f = ee.position(), m = f.top, h = f.left) : (m = parseFloat(v) || 0, h = parseFloat(_) || 0), A(s) && (s = s.call(i, l, u.extend({}, O))), s.top != null && ($.top = s.top - O.top + m), s.left != null && ($.left = s.left - O.left + h), "using" in s ? s.using.call(i, $) : ee.css($);
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
          return i || me;
        });
      }
    }), u.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(i, s) {
      var l = s === "pageYOffset";
      u.fn[i] = function(f) {
        return Ot(this, function(h, v, m) {
          var O;
          if (I(h) ? O = h : h.nodeType === 9 && (O = h.defaultView), m === void 0)
            return O ? O[s] : h[v];
          O ? O.scrollTo(
            l ? O.pageXOffset : m,
            l ? m : O.pageYOffset
          ) : h[v] = m;
        }, i, f, arguments.length);
      };
    }), u.each(["top", "left"], function(i, s) {
      u.cssHooks[s] = cu(
        w.pixelPosition,
        function(l, f) {
          if (f)
            return f = ci(l, s), wa.test(f) ? u(l).position()[s] + "px" : f;
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
          return Ot(this, function(_, M, F) {
            var ee;
            return I(_) ? f.indexOf("outer") === 0 ? _["inner" + i] : _.document.documentElement["client" + i] : _.nodeType === 9 ? (ee = _.documentElement, Math.max(
              _.body["scroll" + i],
              ee["scroll" + i],
              _.body["offset" + i],
              ee["offset" + i],
              ee["client" + i]
            )) : F === void 0 ? (
              // Get width or height on the element, requesting but not forcing parseFloat
              u.css(_, M, O)
            ) : (
              // Set width or height on the element
              u.style(_, M, F, O)
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
    var Sv = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    u.proxy = function(i, s) {
      var l, f, h;
      if (typeof s == "string" && (l = i[s], s = i, i = l), !!A(i))
        return f = a.call(arguments, 2), h = function() {
          return i.apply(s || this, f.concat(a.call(arguments)));
        }, h.guid = i.guid = i.guid || u.guid++, h;
    }, u.holdReady = function(i) {
      i ? u.readyWait++ : u.ready(!0);
    }, u.isArray = Array.isArray, u.parseJSON = JSON.parse, u.nodeName = Q, u.isFunction = A, u.isWindow = I, u.camelCase = S, u.type = Z, u.now = Date.now, u.isNumeric = function(i) {
      var s = u.type(i);
      return (s === "number" || s === "string") && // parseFloat NaNs numeric-cast false positives ("")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      !isNaN(i - parseFloat(i));
    }, u.trim = function(i) {
      return i == null ? "" : (i + "").replace(Sv, "");
    };
    var Ov = t.jQuery, _v = t.$;
    return u.noConflict = function(i) {
      return t.$ === u && (t.$ = _v), i && t.jQuery === u && (t.jQuery = Ov), u;
    }, typeof n > "u" && (t.jQuery = t.$ = u), u;
  });
})(by);
const Ka = Us;
var qs = {}, Cy = {
  get exports() {
    return qs;
  },
  set exports(e) {
    qs = e;
  }
}, Xo = {}, xy = {
  get exports() {
    return Xo;
  },
  set exports(e) {
    Xo = e;
  }
}, sp = function(t, n) {
  return function() {
    for (var o = new Array(arguments.length), a = 0; a < o.length; a++)
      o[a] = arguments[a];
    return t.apply(n, o);
  };
}, wy = sp, Ll = Object.prototype.toString, Ml = function(e) {
  return function(t) {
    var n = Ll.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function Sr(e) {
  return e = e.toLowerCase(), function(n) {
    return Ml(n) === e;
  };
}
function Rl(e) {
  return Array.isArray(e);
}
function Vo(e) {
  return typeof e > "u";
}
function Ty(e) {
  return e !== null && !Vo(e) && e.constructor !== null && !Vo(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
var lp = Sr("ArrayBuffer");
function Ey(e) {
  var t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && lp(e.buffer), t;
}
function Sy(e) {
  return typeof e == "string";
}
function Oy(e) {
  return typeof e == "number";
}
function up(e) {
  return e !== null && typeof e == "object";
}
function Ro(e) {
  if (Ml(e) !== "object")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
var _y = Sr("Date"), Ay = Sr("File"), Py = Sr("Blob"), Ny = Sr("FileList");
function Il(e) {
  return Ll.call(e) === "[object Function]";
}
function ky(e) {
  return up(e) && Il(e.pipe);
}
function Ly(e) {
  var t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Ll.call(e) === t || Il(e.toString) && e.toString() === t);
}
var My = Sr("URLSearchParams");
function Ry(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Iy() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function jl(e, t) {
  if (!(e === null || typeof e > "u"))
    if (typeof e != "object" && (e = [e]), Rl(e))
      for (var n = 0, r = e.length; n < r; n++)
        t.call(null, e[n], n, e);
    else
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
}
function zs() {
  var e = {};
  function t(o, a) {
    Ro(e[a]) && Ro(o) ? e[a] = zs(e[a], o) : Ro(o) ? e[a] = zs({}, o) : Rl(o) ? e[a] = o.slice() : e[a] = o;
  }
  for (var n = 0, r = arguments.length; n < r; n++)
    jl(arguments[n], t);
  return e;
}
function jy(e, t, n) {
  return jl(t, function(o, a) {
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
  if (Vo(t))
    return null;
  for (var n = new Array(t); t-- > 0; )
    n[t] = e[t];
  return n;
}
var Wy = function(e) {
  return function(t) {
    return e && t instanceof e;
  };
}(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)), bt = {
  isArray: Rl,
  isArrayBuffer: lp,
  isBuffer: Ty,
  isFormData: Ly,
  isArrayBufferView: Ey,
  isString: Sy,
  isNumber: Oy,
  isObject: up,
  isPlainObject: Ro,
  isUndefined: Vo,
  isDate: _y,
  isFile: Ay,
  isBlob: Py,
  isFunction: Il,
  isStream: ky,
  isURLSearchParams: My,
  isStandardBrowserEnv: Iy,
  forEach: jl,
  merge: zs,
  extend: jy,
  trim: Ry,
  stripBOM: Dy,
  inherits: $y,
  toFlatObject: Fy,
  kindOf: Ml,
  kindOfTest: Sr,
  endsWith: Hy,
  toArray: By,
  isTypedArray: Wy,
  isFileList: Ny
}, Lr = bt;
function bc(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var cp = function(t, n, r) {
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
        Lr.isDate(C) ? C = C.toISOString() : Lr.isObject(C) && (C = JSON.stringify(C)), a.push(bc(g) + "=" + bc(C));
      }));
    }), o = a.join("&");
  }
  if (o) {
    var c = t.indexOf("#");
    c !== -1 && (t = t.slice(0, c)), t += (t.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return t;
}, Uy = bt;
function pa() {
  this.handlers = [];
}
pa.prototype.use = function(t, n, r) {
  return this.handlers.push({
    fulfilled: t,
    rejected: n,
    synchronous: r ? r.synchronous : !1,
    runWhen: r ? r.runWhen : null
  }), this.handlers.length - 1;
};
pa.prototype.eject = function(t) {
  this.handlers[t] && (this.handlers[t] = null);
};
pa.prototype.forEach = function(t) {
  Uy.forEach(this.handlers, function(r) {
    r !== null && t(r);
  });
};
var qy = pa, zy = bt, Yy = function(t, n) {
  zy.forEach(t, function(o, a) {
    a !== n && a.toUpperCase() === n.toUpperCase() && (t[n] = o, delete t[a]);
  });
}, fp = bt;
function Kr(e, t, n, r, o) {
  Error.call(this), this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o);
}
fp.inherits(Kr, Error, {
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
var dp = Kr.prototype, pp = {};
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
  pp[e] = { value: e };
});
Object.defineProperties(Kr, pp);
Object.defineProperty(dp, "isAxiosError", { value: !0 });
Kr.from = function(e, t, n, r, o, a) {
  var c = Object.create(dp);
  return fp.toFlatObject(e, c, function(p) {
    return p !== Error.prototype;
  }), Kr.call(c, e.message, t, n, r, o), c.name = e.name, a && Object.assign(c, a), c;
};
var ii = Kr, hp = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, an = bt;
function Xy(e, t) {
  t = t || new FormData();
  var n = [];
  function r(a) {
    return a === null ? "" : an.isDate(a) ? a.toISOString() : an.isArrayBuffer(a) || an.isTypedArray(a) ? typeof Blob == "function" ? new Blob([a]) : Buffer.from(a) : a;
  }
  function o(a, c) {
    if (an.isPlainObject(a) || an.isArray(a)) {
      if (n.indexOf(a) !== -1)
        throw Error("Circular reference detected in " + c);
      n.push(a), an.forEach(a, function(p, g) {
        if (!an.isUndefined(p)) {
          var b = c ? c + "." + g : g, C;
          if (p && !c && typeof p == "object") {
            if (an.endsWith(g, "{}"))
              p = JSON.stringify(p);
            else if (an.endsWith(g, "[]") && (C = an.toArray(p))) {
              C.forEach(function(y) {
                !an.isUndefined(y) && t.append(b, r(y));
              });
              return;
            }
          }
          o(p, b);
        }
      }), n.pop();
    } else
      t.append(c, r(a));
  }
  return o(e), t;
}
var vp = Xy, Ga, Cc;
function Vy() {
  if (Cc)
    return Ga;
  Cc = 1;
  var e = ii;
  return Ga = function(n, r, o) {
    var a = o.config.validateStatus;
    !o.status || !a || a(o.status) ? n(o) : r(new e(
      "Request failed with status code " + o.status,
      [e.ERR_BAD_REQUEST, e.ERR_BAD_RESPONSE][Math.floor(o.status / 100) - 4],
      o.config,
      o.request,
      o
    ));
  }, Ga;
}
var Ja, xc;
function Ky() {
  if (xc)
    return Ja;
  xc = 1;
  var e = bt;
  return Ja = e.isStandardBrowserEnv() ? (
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
  ), Ja;
}
var Gy = function(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}, Jy = function(t, n) {
  return n ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t;
}, Qy = Gy, Zy = Jy, gp = function(t, n) {
  return t && !Qy(n) ? Zy(t, n) : n;
}, Qa, wc;
function eb() {
  if (wc)
    return Qa;
  wc = 1;
  var e = bt, t = [
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
  return Qa = function(r) {
    var o = {}, a, c, d;
    return r && e.forEach(r.split(`
`), function(g) {
      if (d = g.indexOf(":"), a = e.trim(g.substr(0, d)).toLowerCase(), c = e.trim(g.substr(d + 1)), a) {
        if (o[a] && t.indexOf(a) >= 0)
          return;
        a === "set-cookie" ? o[a] = (o[a] ? o[a] : []).concat([c]) : o[a] = o[a] ? o[a] + ", " + c : c;
      }
    }), o;
  }, Qa;
}
var Za, Tc;
function tb() {
  if (Tc)
    return Za;
  Tc = 1;
  var e = bt;
  return Za = e.isStandardBrowserEnv() ? (
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
  ), Za;
}
var es, Ec;
function ha() {
  if (Ec)
    return es;
  Ec = 1;
  var e = ii, t = bt;
  function n(r) {
    e.call(this, r ?? "canceled", e.ERR_CANCELED), this.name = "CanceledError";
  }
  return t.inherits(n, e, {
    __CANCEL__: !0
  }), es = n, es;
}
var ts, Sc;
function nb() {
  return Sc || (Sc = 1, ts = function(t) {
    var n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
    return n && n[1] || "";
  }), ts;
}
var ns, Oc;
function _c() {
  if (Oc)
    return ns;
  Oc = 1;
  var e = bt, t = Vy(), n = Ky(), r = cp, o = gp, a = eb(), c = tb(), d = hp, p = ii, g = ha(), b = nb();
  return ns = function(y) {
    return new Promise(function(w, A) {
      var I = y.data, P = y.headers, j = y.responseType, z;
      function Z() {
        y.cancelToken && y.cancelToken.unsubscribe(z), y.signal && y.signal.removeEventListener("abort", z);
      }
      e.isFormData(I) && e.isStandardBrowserEnv() && delete P["Content-Type"];
      var H = new XMLHttpRequest();
      if (y.auth) {
        var u = y.auth.username || "", Y = y.auth.password ? unescape(encodeURIComponent(y.auth.password)) : "";
        P.Authorization = "Basic " + btoa(u + ":" + Y);
      }
      var G = o(y.baseURL, y.url);
      H.open(y.method.toUpperCase(), r(G, y.params, y.paramsSerializer), !0), H.timeout = y.timeout;
      function re() {
        if (H) {
          var Q = "getAllResponseHeaders" in H ? a(H.getAllResponseHeaders()) : null, he = !j || j === "text" || j === "json" ? H.responseText : H.response, Re = {
            data: he,
            status: H.status,
            statusText: H.statusText,
            headers: Q,
            config: y,
            request: H
          };
          t(function(B) {
            w(B), Z();
          }, function(B) {
            A(B), Z();
          }, Re), H = null;
        }
      }
      if ("onloadend" in H ? H.onloadend = re : H.onreadystatechange = function() {
        !H || H.readyState !== 4 || H.status === 0 && !(H.responseURL && H.responseURL.indexOf("file:") === 0) || setTimeout(re);
      }, H.onabort = function() {
        H && (A(new p("Request aborted", p.ECONNABORTED, y, H)), H = null);
      }, H.onerror = function() {
        A(new p("Network Error", p.ERR_NETWORK, y, H, H)), H = null;
      }, H.ontimeout = function() {
        var he = y.timeout ? "timeout of " + y.timeout + "ms exceeded" : "timeout exceeded", Re = y.transitional || d;
        y.timeoutErrorMessage && (he = y.timeoutErrorMessage), A(new p(
          he,
          Re.clarifyTimeoutError ? p.ETIMEDOUT : p.ECONNABORTED,
          y,
          H
        )), H = null;
      }, e.isStandardBrowserEnv()) {
        var de = (y.withCredentials || c(G)) && y.xsrfCookieName ? n.read(y.xsrfCookieName) : void 0;
        de && (P[y.xsrfHeaderName] = de);
      }
      "setRequestHeader" in H && e.forEach(P, function(he, Re) {
        typeof I > "u" && Re.toLowerCase() === "content-type" ? delete P[Re] : H.setRequestHeader(Re, he);
      }), e.isUndefined(y.withCredentials) || (H.withCredentials = !!y.withCredentials), j && j !== "json" && (H.responseType = y.responseType), typeof y.onDownloadProgress == "function" && H.addEventListener("progress", y.onDownloadProgress), typeof y.onUploadProgress == "function" && H.upload && H.upload.addEventListener("progress", y.onUploadProgress), (y.cancelToken || y.signal) && (z = function(Q) {
        H && (A(!Q || Q && Q.type ? new g() : Q), H.abort(), H = null);
      }, y.cancelToken && y.cancelToken.subscribe(z), y.signal && (y.signal.aborted ? z() : y.signal.addEventListener("abort", z))), I || (I = null);
      var xe = b(G);
      if (xe && ["http", "https", "file"].indexOf(xe) === -1) {
        A(new p("Unsupported protocol " + xe + ":", p.ERR_BAD_REQUEST, y));
        return;
      }
      H.send(I);
    });
  }, ns;
}
var rs, Ac;
function rb() {
  return Ac || (Ac = 1, rs = null), rs;
}
var pt = bt, Pc = Yy, Nc = ii, ib = hp, ob = vp, ab = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function kc(e, t) {
  !pt.isUndefined(e) && pt.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function sb() {
  var e;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e = _c()), e;
}
function lb(e, t, n) {
  if (pt.isString(e))
    try {
      return (t || JSON.parse)(e), pt.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
var va = {
  transitional: ib,
  adapter: sb(),
  transformRequest: [function(t, n) {
    if (Pc(n, "Accept"), Pc(n, "Content-Type"), pt.isFormData(t) || pt.isArrayBuffer(t) || pt.isBuffer(t) || pt.isStream(t) || pt.isFile(t) || pt.isBlob(t))
      return t;
    if (pt.isArrayBufferView(t))
      return t.buffer;
    if (pt.isURLSearchParams(t))
      return kc(n, "application/x-www-form-urlencoded;charset=utf-8"), t.toString();
    var r = pt.isObject(t), o = n && n["Content-Type"], a;
    if ((a = pt.isFileList(t)) || r && o === "multipart/form-data") {
      var c = this.env && this.env.FormData;
      return ob(a ? { "files[]": t } : t, c && new c());
    } else if (r || o === "application/json")
      return kc(n, "application/json"), lb(t);
    return t;
  }],
  transformResponse: [function(t) {
    var n = this.transitional || va.transitional, r = n && n.silentJSONParsing, o = n && n.forcedJSONParsing, a = !r && this.responseType === "json";
    if (a || o && pt.isString(t) && t.length)
      try {
        return JSON.parse(t);
      } catch (c) {
        if (a)
          throw c.name === "SyntaxError" ? Nc.from(c, Nc.ERR_BAD_RESPONSE, this, null, this.response) : c;
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
pt.forEach(["delete", "get", "head"], function(t) {
  va.headers[t] = {};
});
pt.forEach(["post", "put", "patch"], function(t) {
  va.headers[t] = pt.merge(ab);
});
var Dl = va, ub = bt, cb = Dl, fb = function(t, n, r) {
  var o = this || cb;
  return ub.forEach(r, function(c) {
    t = c.call(o, t, n);
  }), t;
}, is, Lc;
function mp() {
  return Lc || (Lc = 1, is = function(t) {
    return !!(t && t.__CANCEL__);
  }), is;
}
var Mc = bt, os = fb, db = mp(), pb = Dl, hb = ha();
function as(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new hb();
}
var vb = function(t) {
  as(t), t.headers = t.headers || {}, t.data = os.call(
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
    return as(t), o.data = os.call(
      t,
      o.data,
      o.headers,
      t.transformResponse
    ), o;
  }, function(o) {
    return db(o) || (as(t), o && o.response && (o.response.data = os.call(
      t,
      o.response.data,
      o.response.headers,
      t.transformResponse
    ))), Promise.reject(o);
  });
}, Ht = bt, yp = function(t, n) {
  n = n || {};
  var r = {};
  function o(b, C) {
    return Ht.isPlainObject(b) && Ht.isPlainObject(C) ? Ht.merge(b, C) : Ht.isPlainObject(C) ? Ht.merge({}, C) : Ht.isArray(C) ? C.slice() : C;
  }
  function a(b) {
    if (Ht.isUndefined(n[b])) {
      if (!Ht.isUndefined(t[b]))
        return o(void 0, t[b]);
    } else
      return o(t[b], n[b]);
  }
  function c(b) {
    if (!Ht.isUndefined(n[b]))
      return o(void 0, n[b]);
  }
  function d(b) {
    if (Ht.isUndefined(n[b])) {
      if (!Ht.isUndefined(t[b]))
        return o(void 0, t[b]);
    } else
      return o(void 0, n[b]);
  }
  function p(b) {
    if (b in n)
      return o(t[b], n[b]);
    if (b in t)
      return o(void 0, t[b]);
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
    var y = g[C] || a, T = y(C);
    Ht.isUndefined(T) && y !== p || (r[C] = T);
  }), r;
}, ss, Rc;
function bp() {
  return Rc || (Rc = 1, ss = {
    version: "0.27.2"
  }), ss;
}
var gb = bp().version, Yn = ii, $l = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e, t) {
  $l[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var Ic = {};
$l.transitional = function(t, n, r) {
  function o(a, c) {
    return "[Axios v" + gb + "] Transitional option '" + a + "'" + c + (r ? ". " + r : "");
  }
  return function(a, c, d) {
    if (t === !1)
      throw new Yn(
        o(c, " has been removed" + (n ? " in " + n : "")),
        Yn.ERR_DEPRECATED
      );
    return n && !Ic[c] && (Ic[c] = !0, console.warn(
      o(
        c,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(a, c, d) : !0;
  };
};
function mb(e, t, n) {
  if (typeof e != "object")
    throw new Yn("options must be an object", Yn.ERR_BAD_OPTION_VALUE);
  for (var r = Object.keys(e), o = r.length; o-- > 0; ) {
    var a = r[o], c = t[a];
    if (c) {
      var d = e[a], p = d === void 0 || c(d, a, e);
      if (p !== !0)
        throw new Yn("option " + a + " must be " + p, Yn.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new Yn("Unknown option " + a, Yn.ERR_BAD_OPTION);
  }
}
var yb = {
  assertOptions: mb,
  validators: $l
}, Cp = bt, bb = cp, jc = qy, Dc = vb, ga = yp, Cb = gp, xp = yb, Mr = xp.validators;
function Gr(e) {
  this.defaults = e, this.interceptors = {
    request: new jc(),
    response: new jc()
  };
}
Gr.prototype.request = function(t, n) {
  typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = ga(this.defaults, n), n.method ? n.method = n.method.toLowerCase() : this.defaults.method ? n.method = this.defaults.method.toLowerCase() : n.method = "get";
  var r = n.transitional;
  r !== void 0 && xp.assertOptions(r, {
    silentJSONParsing: Mr.transitional(Mr.boolean),
    forcedJSONParsing: Mr.transitional(Mr.boolean),
    clarifyTimeoutError: Mr.transitional(Mr.boolean)
  }, !1);
  var o = [], a = !0;
  this.interceptors.request.forEach(function(T) {
    typeof T.runWhen == "function" && T.runWhen(n) === !1 || (a = a && T.synchronous, o.unshift(T.fulfilled, T.rejected));
  });
  var c = [];
  this.interceptors.response.forEach(function(T) {
    c.push(T.fulfilled, T.rejected);
  });
  var d;
  if (!a) {
    var p = [Dc, void 0];
    for (Array.prototype.unshift.apply(p, o), p = p.concat(c), d = Promise.resolve(n); p.length; )
      d = d.then(p.shift(), p.shift());
    return d;
  }
  for (var g = n; o.length; ) {
    var b = o.shift(), C = o.shift();
    try {
      g = b(g);
    } catch (y) {
      C(y);
      break;
    }
  }
  try {
    d = Dc(g);
  } catch (y) {
    return Promise.reject(y);
  }
  for (; c.length; )
    d = d.then(c.shift(), c.shift());
  return d;
};
Gr.prototype.getUri = function(t) {
  t = ga(this.defaults, t);
  var n = Cb(t.baseURL, t.url);
  return bb(n, t.params, t.paramsSerializer);
};
Cp.forEach(["delete", "get", "head", "options"], function(t) {
  Gr.prototype[t] = function(n, r) {
    return this.request(ga(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
Cp.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(a, c, d) {
      return this.request(ga(d || {}, {
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
var xb = Gr, ls, $c;
function wb() {
  if ($c)
    return ls;
  $c = 1;
  var e = ha();
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
  }, ls = t, ls;
}
var us, Fc;
function Tb() {
  return Fc || (Fc = 1, us = function(t) {
    return function(r) {
      return t.apply(null, r);
    };
  }), us;
}
var cs, Hc;
function Eb() {
  if (Hc)
    return cs;
  Hc = 1;
  var e = bt;
  return cs = function(n) {
    return e.isObject(n) && n.isAxiosError === !0;
  }, cs;
}
var Bc = bt, Sb = sp, Io = xb, Ob = yp, _b = Dl;
function wp(e) {
  var t = new Io(e), n = Sb(Io.prototype.request, t);
  return Bc.extend(n, Io.prototype, t), Bc.extend(n, t), n.create = function(o) {
    return wp(Ob(e, o));
  }, n;
}
var Mt = wp(_b);
Mt.Axios = Io;
Mt.CanceledError = ha();
Mt.CancelToken = wb();
Mt.isCancel = mp();
Mt.VERSION = bp().version;
Mt.toFormData = vp;
Mt.AxiosError = ii;
Mt.Cancel = Mt.CanceledError;
Mt.all = function(t) {
  return Promise.all(t);
};
Mt.spread = Tb();
Mt.isAxiosError = Eb();
xy.exports = Mt;
Xo.default = Mt;
(function(e) {
  e.exports = Xo;
})(Cy);
const Ab = /* @__PURE__ */ yy(qs), Tp = Ab.create({}), Ep = "https://bbs.mobileapi.hupu.com", Sp = "/3/7.3.8/threads/";
function Pb(e, t) {
  let n = Ep + Sp + "getCheckReply";
  return Tp.get(n, {
    params: {
      tid: e,
      pid: t,
      offline: "json",
      fid: 34
    }
  });
}
function Nb(e) {
  let t = Ep + Sp + "getsThreadLightReplyList";
  return Tp.get(t, {
    params: {
      tid: e,
      offline: "json",
      fid: 34
    }
  });
}
const Op = {
  getCheckReply: Pb,
  getsThreadLightReplyList: Nb
};
function er(e) {
  return er = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, er(e);
}
function kb(e, t) {
  if (er(e) !== "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (er(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _p(e) {
  var t = kb(e, "string");
  return er(t) === "symbol" ? t : String(t);
}
function _e(e, t, n) {
  return t = _p(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Wc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function J(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wc(Object(n), !0).forEach(function(r) {
      _e(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Wc(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function kn() {
  return kn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, kn.apply(this, arguments);
}
var Lb = Array.isArray, Mb = function(t) {
  return typeof t == "string";
}, Rb = function(t) {
  return t !== null && er(t) === "object";
};
function Oi(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  return typeof e == "function" ? e(t) : e ?? n;
}
function Cn() {
  for (var e = [], t = 0; t < arguments.length; t++) {
    var n = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (n) {
      if (Mb(n))
        e.push(n);
      else if (Lb(n))
        for (var r = 0; r < n.length; r++) {
          var o = Cn(n[r]);
          o && e.push(o);
        }
      else if (Rb(n))
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
    } catch (b) {
      g = !0, o = b;
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
function Ys(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function Ap(e, t) {
  if (e) {
    if (typeof e == "string")
      return Ys(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ys(e, t);
  }
}
function Db() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function wr(e, t) {
  return Ib(e) || jb(e, t) || Ap(e, t) || Db();
}
function $b(e) {
  if (Array.isArray(e))
    return Ys(e);
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
  return $b(e) || Fb(e) || Ap(e) || Hb();
}
var Bb = typeof global == "object" && global && global.Object === Object && global;
const Wb = Bb;
var Ub = typeof self == "object" && self && self.Object === Object && self, qb = Wb || Ub || Function("return this")();
const Pp = qb;
var zb = Pp.Symbol;
const Ko = zb;
var Np = Object.prototype, Yb = Np.hasOwnProperty, Xb = Np.toString, Ci = Ko ? Ko.toStringTag : void 0;
function Vb(e) {
  var t = Yb.call(e, Ci), n = e[Ci];
  try {
    e[Ci] = void 0;
    var r = !0;
  } catch {
  }
  var o = Xb.call(e);
  return r && (t ? e[Ci] = n : delete e[Ci]), o;
}
var Kb = Object.prototype, Gb = Kb.toString;
function Jb(e) {
  return Gb.call(e);
}
var Qb = "[object Null]", Zb = "[object Undefined]", Uc = Ko ? Ko.toStringTag : void 0;
function e0(e) {
  return e == null ? e === void 0 ? Zb : Qb : Uc && Uc in Object(e) ? Vb(e) : Jb(e);
}
function t0(e) {
  return e != null && typeof e == "object";
}
var n0 = function(t) {
  return t != null && t !== "";
};
const r0 = n0;
var i0 = function(t, n) {
  var r = J({}, t);
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
const Zi = i0;
var xr = function e() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = Array.isArray(t) ? t : [t], o = [];
  return r.forEach(function(a) {
    Array.isArray(a) ? o.push.apply(o, Jr(e(a, n))) : a && a.type === dt ? o.push.apply(o, Jr(e(a.children, n))) : a && Zn(a) ? n && !kp(a) ? o.push(a) : n || o.push(a) : r0(a) && o.push(a);
  }), o;
}, o0 = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default", r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (Zn(t))
    return t.type === dt ? n === "default" ? xr(t.children) : [] : t.children && t.children[n] ? xr(t.children[n](r)) : [];
  var o = t.$slots[n] && t.$slots[n](r);
  return xr(o);
}, qc = function(t) {
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
  } else if (Zn(t)) {
    var d = t.props && t.props[n];
    if (d !== void 0 && t.props !== null)
      return typeof d == "function" && o ? d(r) : d;
    t.type === dt ? a = t.children : t.children && t.children[n] && (a = t.children[n], a = o && a ? a(r) : a);
  }
  return Array.isArray(a) && (a = xr(a), a = a.length === 1 ? a[0] : a, a = a.length === 0 ? void 0 : a), a;
};
function kp(e) {
  return e && (e.type === yn || e.type === dt && e.children.length === 0 || e.type === Ji && e.children.trim() === "");
}
function Fl() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = [];
  return e.forEach(function(n) {
    Array.isArray(n) ? t.push.apply(t, Jr(n)) : (n == null ? void 0 : n.type) === dt ? t.push.apply(t, Jr(Fl(n.children))) : t.push(n);
  }), t.filter(function(n) {
    return !kp(n);
  });
}
var Lp = function(t) {
  return setTimeout(t, 16);
}, Mp = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (Lp = function(t) {
  return window.requestAnimationFrame(t);
}, Mp = function(t) {
  return window.cancelAnimationFrame(t);
});
var zc = 0, Hl = /* @__PURE__ */ new Map();
function Rp(e) {
  Hl.delete(e);
}
function qi(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  zc += 1;
  var n = zc;
  function r(o) {
    if (o === 0)
      Rp(n), e();
    else {
      var a = Lp(function() {
        r(o - 1);
      });
      Hl.set(n, a);
    }
  }
  return r(t), n;
}
qi.cancel = function(e) {
  var t = Hl.get(e);
  return Rp(t), Mp(t);
};
var Xs = function() {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  return n;
}, ma = function(t) {
  var n = t;
  return n.install = function(r) {
    r.component(n.displayName || n.name, t);
  }, t;
}, Ip = !1;
try {
  var Yc = Object.defineProperty({}, "passive", {
    get: function() {
      Ip = !0;
    }
  });
  window.addEventListener("testPassive", null, Yc), window.removeEventListener("testPassive", null, Yc);
} catch {
}
const s0 = Ip;
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
function ya(e, t) {
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
const jp = p0;
var h0 = {
  lang: J({
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
  timePickerLocale: J({}, jp)
};
const Xc = h0;
var Bt = "${label} is not a valid ${type}", v0 = {
  locale: "en",
  Pagination: c0,
  DatePicker: Xc,
  TimePicker: jp,
  Calendar: Xc,
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
const Go = v0, Dp = tt({
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
    var r = n.slots, o = Jn("localeData", {}), a = Me(function() {
      var d = t.componentName, p = d === void 0 ? "global" : d, g = t.defaultLocale, b = g || Go[p || "global"], C = o.antLocale, y = p && C ? C[p] : {};
      return J(J({}, typeof b == "function" ? b() : b), y || {});
    }), c = Me(function() {
      var d = o.antLocale, p = d && d.locale;
      return d && d.exist && !p ? Go.locale : p;
    });
    return function() {
      var d = t.children || r.default, p = o.antLocale;
      return d == null ? void 0 : d(a.value, c.value, p);
    };
  }
});
function $p(e, t, n) {
  var r = Jn("localeData", {}), o = Me(function() {
    var a = r.antLocale, c = $i(t) || Go[e || "global"], d = e && a ? a[e] : {};
    return J(J(J({}, typeof c == "function" ? c() : c), d || {}), $i(n) || {});
  });
  return [o];
}
var Fp = function() {
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
Fp.PRESENTED_IMAGE_DEFAULT = !0;
const g0 = Fp;
var Hp = function() {
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
Hp.PRESENTED_IMAGE_SIMPLE = !0;
const m0 = Hp;
function Vc(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Bp(e, t, n) {
  return t && Vc(e.prototype, t), n && Vc(e, n), e;
}
function jo() {
  return (jo = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
function Wp(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
function Up(e, t) {
  if (e == null)
    return {};
  var n, r, o = {}, a = Object.keys(e);
  for (r = 0; r < a.length; r++)
    t.indexOf(n = a[r]) >= 0 || (o[n] = e[n]);
  return o;
}
function Kc(e) {
  return ((t = e) != null && typeof t == "object" && Array.isArray(t) === !1) == 1 && Object.prototype.toString.call(e) === "[object Object]";
  var t;
}
var qp = Object.prototype, zp = qp.toString, y0 = qp.hasOwnProperty, Yp = /^\s*function (\w+)/;
function Gc(e) {
  var t, n = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e;
  if (n) {
    var r = n.toString().match(Yp);
    return r ? r[1] : "";
  }
  return "";
}
var Tr = function(e) {
  var t, n;
  return Kc(e) !== !1 && typeof (t = e.constructor) == "function" && Kc(n = t.prototype) !== !1 && n.hasOwnProperty("isPrototypeOf") !== !1;
}, b0 = function(e) {
  return e;
}, Et = b0, zi = function(e, t) {
  return y0.call(e, t);
}, C0 = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, Qr = Array.isArray || function(e) {
  return zp.call(e) === "[object Array]";
}, Zr = function(e) {
  return zp.call(e) === "[object Function]";
}, Jo = function(e) {
  return Tr(e) && zi(e, "_vueTypes_name");
}, Xp = function(e) {
  return Tr(e) && (zi(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function(t) {
    return zi(e, t);
  }));
};
function Bl(e, t) {
  return Object.defineProperty(e.bind(t), "__original", { value: e });
}
function Or(e, t, n) {
  var r;
  n === void 0 && (n = !1);
  var o = !0, a = "";
  r = Tr(e) ? e : { type: e };
  var c = Jo(r) ? r._vueTypes_name + " - " : "";
  if (Xp(r) && r.type !== null) {
    if (r.type === void 0 || r.type === !0 || !r.required && t === void 0)
      return o;
    Qr(r.type) ? (o = r.type.some(function(C) {
      return Or(C, t, !0) === !0;
    }), a = r.type.map(function(C) {
      return Gc(C);
    }).join(" or ")) : o = (a = Gc(r)) === "Array" ? Qr(t) : a === "Object" ? Tr(t) : a === "String" || a === "Number" || a === "Boolean" || a === "Function" ? function(C) {
      if (C == null)
        return "";
      var y = C.constructor.toString().match(Yp);
      return y ? y[1] : "";
    }(t) === a : t instanceof r.type;
  }
  if (!o) {
    var d = c + 'value "' + t + '" should be of type "' + a + '"';
    return n === !1 ? (Et(d), !1) : d;
  }
  if (zi(r, "validator") && Zr(r.validator)) {
    var p = Et, g = [];
    if (Et = function(C) {
      g.push(C);
    }, o = r.validator(t), Et = p, !o) {
      var b = (g.length > 1 ? "* " : "") + g.join(`
* `);
      return g.length = 0, n === !1 ? (Et(b), o) : b;
    }
  }
  return o;
}
function Yt(e, t) {
  var n = Object.defineProperties(t, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get: function() {
    return this.required = !0, this;
  } }, def: { value: function(o) {
    return o !== void 0 || this.default ? Zr(o) || Or(this, o, !0) === !0 ? (this.default = Qr(o) ? function() {
      return [].concat(o);
    } : Tr(o) ? function() {
      return Object.assign({}, o);
    } : o, this) : (Et(this._vueTypes_name + ' - invalid default value: "' + o + '"'), this) : this;
  } } }), r = n.validator;
  return Zr(r) && (n.validator = Bl(r, n)), n;
}
function xn(e, t) {
  var n = Yt(e, t);
  return Object.defineProperty(n, "validate", { value: function(r) {
    return Zr(this.validator) && Et(this._vueTypes_name + ` - calling .validate() will overwrite the current custom validator function. Validator info:
` + JSON.stringify(this)), this.validator = Bl(r, this), this;
  } });
}
function Jc(e, t, n) {
  var r, o, a = (r = t, o = {}, Object.getOwnPropertyNames(r).forEach(function(C) {
    o[C] = Object.getOwnPropertyDescriptor(r, C);
  }), Object.defineProperties({}, o));
  if (a._vueTypes_name = e, !Tr(n))
    return a;
  var c, d, p = n.validator, g = Up(n, ["validator"]);
  if (Zr(p)) {
    var b = a.validator;
    b && (b = (d = (c = b).__original) !== null && d !== void 0 ? d : c), a.validator = Bl(b ? function(C) {
      return b.call(this, C) && p.call(this, C);
    } : p, a);
  }
  return Object.assign(a, g);
}
function ba(e) {
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
  return Yt("integer", { type: Number, validator: function(e) {
    return C0(e);
  } });
}, P0 = function() {
  return Yt("symbol", { validator: function(e) {
    return typeof e == "symbol";
  } });
};
function N0(e, t) {
  if (t === void 0 && (t = "custom validation failed"), typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return Yt(e.name || "<<anonymous function>>", { validator: function(n) {
    var r = e(n);
    return r || Et(this._vueTypes_name + " - " + t), r;
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
  return Yt("oneOf", { type: n.length > 0 ? n : void 0, validator: function(r) {
    var o = e.indexOf(r) !== -1;
    return o || Et(t), o;
  } });
}
function L0(e) {
  if (!Qr(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  for (var t = !1, n = [], r = 0; r < e.length; r += 1) {
    var o = e[r];
    if (Xp(o)) {
      if (Jo(o) && o._vueTypes_name === "oneOf") {
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
  }), Yt("oneOfType", t ? { type: n, validator: function(a) {
    var c = [], d = e.some(function(p) {
      var g = Or(Jo(p) && p._vueTypes_name === "oneOf" ? p.type || null : p, a, !0);
      return typeof g == "string" && c.push(g), g === !0;
    });
    return d || Et("oneOfType - provided value does not match any of the " + c.length + ` passed-in validators:
` + ba(c.join(`
`))), d;
  } } : { type: n });
}
function M0(e) {
  return Yt("arrayOf", { type: Array, validator: function(t) {
    var n, r = t.every(function(o) {
      return (n = Or(e, o, !0)) === !0;
    });
    return r || Et(`arrayOf - value validation error:
` + ba(n)), r;
  } });
}
function R0(e) {
  return Yt("instanceOf", { type: e });
}
function I0(e) {
  return Yt("objectOf", { type: Object, validator: function(t) {
    var n, r = Object.keys(t).every(function(o) {
      return (n = Or(e, t[o], !0)) === !0;
    });
    return r || Et(`objectOf - value validation error:
` + ba(n)), r;
  } });
}
function j0(e) {
  var t = Object.keys(e), n = t.filter(function(o) {
    var a;
    return !!(!((a = e[o]) === null || a === void 0) && a.required);
  }), r = Yt("shape", { type: Object, validator: function(o) {
    var a = this;
    if (!Tr(o))
      return !1;
    var c = Object.keys(o);
    if (n.length > 0 && n.some(function(p) {
      return c.indexOf(p) === -1;
    })) {
      var d = n.filter(function(p) {
        return c.indexOf(p) === -1;
      });
      return Et(d.length === 1 ? 'shape - required property "' + d[0] + '" is not defined.' : 'shape - required properties "' + d.join('", "') + '" are not defined.'), !1;
    }
    return c.every(function(p) {
      if (t.indexOf(p) === -1)
        return a._vueTypes_isLoose === !0 || (Et('shape - shape definition does not include a "' + p + '" property. Allowed keys: "' + t.join('", "') + '".'), !1);
      var g = Or(e[p], o[p], !0);
      return typeof g == "string" && Et('shape - "' + p + `" property validation error:
 ` + ba(g)), g === !0;
    });
  } });
  return Object.defineProperty(r, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(r, "loose", { get: function() {
    return this._vueTypes_isLoose = !0, this;
  } }), r;
}
var vn = function() {
  function e() {
  }
  return e.extend = function(t) {
    var n = this;
    if (Qr(t))
      return t.forEach(function(C) {
        return n.extend(C);
      }), this;
    var r = t.name, o = t.validate, a = o !== void 0 && o, c = t.getter, d = c !== void 0 && c, p = Up(t, ["name", "validate", "getter"]);
    if (zi(this, r))
      throw new TypeError('[VueTypes error]: Type "' + r + '" already defined');
    var g, b = p.type;
    return Jo(b) ? (delete p.type, Object.defineProperty(this, r, d ? { get: function() {
      return Jc(r, b, p);
    } } : { value: function() {
      var C, y = Jc(r, b, p);
      return y.validator && (y.validator = (C = y.validator).bind.apply(C, [y].concat([].slice.call(arguments)))), y;
    } })) : (g = d ? { get: function() {
      var C = Object.assign({}, p);
      return a ? xn(r, C) : Yt(r, C);
    }, enumerable: !0 } : { value: function() {
      var C, y, T = Object.assign({}, p);
      return C = a ? xn(r, T) : Yt(r, T), T.validator && (C.validator = (y = T.validator).bind.apply(y, [C].concat([].slice.call(arguments)))), C;
    }, enumerable: !0 }, Object.defineProperty(this, r, g));
  }, Bp(e, null, [{ key: "any", get: function() {
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
function Vp(e) {
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
    return Wp(r, n), Bp(r, null, [{ key: "sensibleDefaults", get: function() {
      return jo({}, this.defaults);
    }, set: function(o) {
      this.defaults = o !== !1 ? jo({}, o !== !0 ? o : e) : {};
    } }]), r;
  }(vn)).defaults = jo({}, e), t;
}
vn.defaults = {}, vn.custom = N0, vn.oneOf = k0, vn.instanceOf = R0, vn.oneOfType = L0, vn.arrayOf = M0, vn.objectOf = I0, vn.shape = j0, vn.utils = { validate: function(e, t) {
  return Or(t, e, !0) === !0;
}, toType: function(e, t, n) {
  return n === void 0 && (n = !1), n ? xn(e, t) : Yt(e, t);
} };
(function(e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  return Wp(t, e), t;
})(Vp());
var Kp = Vp({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
});
Kp.extend([{
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
const et = Kp;
var D0 = ["image", "description", "imageStyle", "class"], Gp = L(g0, null, null), Jp = L(m0, null, null), oi = function(t, n) {
  var r, o = n.slots, a = o === void 0 ? {} : o, c = n.attrs, d = wn("empty", t), p = d.direction, g = d.prefixCls, b = g.value, C = J(J({}, t), c), y = C.image, T = y === void 0 ? Gp : y, w = C.description, A = w === void 0 ? ((r = a.description) === null || r === void 0 ? void 0 : r.call(a)) || void 0 : w, I = C.imageStyle, P = C.class, j = P === void 0 ? "" : P, z = ya(C, D0);
  return L(Dp, {
    componentName: "Empty",
    children: function(H) {
      var u, Y = typeof A < "u" ? A : H.description, G = typeof Y == "string" ? Y : "empty", re = null;
      return typeof T == "string" ? re = L("img", {
        alt: G,
        src: T
      }, null) : re = T, L("div", J({
        class: Cn(b, j, (u = {}, _e(u, "".concat(b, "-normal"), T === Jp), _e(u, "".concat(b, "-rtl"), p.value === "rtl"), u))
      }, z), [L("div", {
        class: "".concat(b, "-image"),
        style: I
      }, [re]), Y && L("p", {
        class: "".concat(b, "-description")
      }, [Y]), a.default && L("div", {
        class: "".concat(b, "-footer")
      }, [Fl(a.default())])]);
    }
  }, null);
};
oi.displayName = "AEmpty";
oi.PRESENTED_IMAGE_DEFAULT = Gp;
oi.PRESENTED_IMAGE_SIMPLE = Jp;
oi.inheritAttrs = !1;
oi.props = {
  prefixCls: String,
  image: et.any,
  description: et.any,
  imageStyle: {
    type: Object,
    default: void 0
  }
};
const xi = ma(oi);
var $0 = function(t) {
  var n = wn("empty", t), r = n.prefixCls, o = function(c) {
    switch (c) {
      case "Table":
      case "List":
        return L(xi, {
          image: xi.PRESENTED_IMAGE_SIMPLE
        }, null);
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return L(xi, {
          image: xi.PRESENTED_IMAGE_SIMPLE,
          class: "".concat(r.value, "-small")
        }, null);
      default:
        return L(xi, null, null);
    }
  };
  return o(t.componentName);
};
function Qp(e) {
  return L($0, {
    componentName: e
  }, null);
}
var Qc = {};
function F0(e, t) {
}
function H0(e, t, n) {
  !t && !Qc[n] && (e(!1, n), Qc[n] = !0);
}
function Zp(e, t) {
  H0(F0, e, t);
}
const B0 = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  Zp(e, "[antdv: ".concat(t, "] ").concat(n));
};
var Vs = "internalMark", Do = tt({
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
    B0(t.ANT_MARK__ === Vs, "LocaleProvider", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead");
    var o = dn({
      antLocale: J(J({}, t.locale), {}, {
        exist: !0
      }),
      ANT_MARK__: Vs
    });
    return Vi("localeData", o), qt(function() {
      return t.locale;
    }, function() {
      o.antLocale = J(J({}, t.locale), {}, {
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
Do.install = function(e) {
  return e.component(Do.name, Do), e;
};
const W0 = ma(Do);
Xs("bottomLeft", "bottomRight", "topLeft", "topRight");
var eh = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = J(t ? {
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
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = J(t ? {
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
}, Qo = function(t, n, r) {
  return r !== void 0 ? r : "".concat(t, "-").concat(n);
};
const q0 = tt({
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
    }, g = function(y) {
      y && y.stopPropagation(), p();
      var T = t.onClose, w = t.noticeKey;
      T && T(w);
    }, b = function() {
      p(), d();
    };
    return Qt(function() {
      d();
    }), Al(function() {
      p();
    }), qt([c, function() {
      return t.updateMark;
    }, function() {
      return t.visible;
    }], function(C, y) {
      var T = wr(C, 3), w = T[0], A = T[1], I = T[2], P = wr(y, 3), j = P[0], z = P[1], Z = P[2];
      (w !== j || A !== z || I !== Z && Z) && b();
    }, {
      flush: "post"
    }), function() {
      var C, y, T = t.prefixCls, w = t.closable, A = t.closeIcon, I = A === void 0 ? (C = o.closeIcon) === null || C === void 0 ? void 0 : C.call(o) : A, P = t.onClick, j = t.holder, z = r.class, Z = r.style, H = "".concat(T, "-notice"), u = Object.keys(r).reduce(function(G, re) {
        return (re.substr(0, 5) === "data-" || re.substr(0, 5) === "aria-" || re === "role") && (G[re] = r[re]), G;
      }, {}), Y = L("div", J({
        class: Cn(H, z, _e({}, "".concat(H, "-closable"), w)),
        style: Z,
        onMouseenter: p,
        onMouseleave: d,
        onClick: P
      }, u), [L("div", {
        class: "".concat(H, "-content")
      }, [(y = o.default) === null || y === void 0 ? void 0 : y.call(o)]), w ? L("a", {
        tabindex: 0,
        onClick: g,
        class: "".concat(H, "-close")
      }, [I || L("span", {
        class: "".concat(H, "-close-x")
      }, null)]) : null]);
      return j ? L(Yd, {
        to: j
      }, {
        default: function() {
          return Y;
        }
      }) : Y;
    };
  }
});
var z0 = ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName"], Zc = 0, Y0 = Date.now();
function ef() {
  var e = Zc;
  return Zc += 1, "rcNotification_".concat(Y0, "_").concat(e);
}
var Ks = tt({
  name: "Notification",
  inheritAttrs: !1,
  props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon"],
  setup: function(t, n) {
    var r = n.attrs, o = n.expose, a = n.slots, c = /* @__PURE__ */ new Map(), d = $e([]), p = Me(function() {
      var C = t.prefixCls, y = t.animation, T = y === void 0 ? "fade" : y, w = t.transitionName;
      return !w && T && (w = "".concat(C, "-").concat(T)), U0(w);
    }), g = function(y, T) {
      var w = y.key || ef(), A = J(J({}, y), {}, {
        key: w
      }), I = t.maxCount, P = d.value.map(function(z) {
        return z.notice.key;
      }).indexOf(w), j = d.value.concat();
      P !== -1 ? j.splice(P, 1, {
        notice: A,
        holderCallback: T
      }) : (I && d.value.length >= I && (A.key = j[0].notice.key, A.updateMark = ef(), A.userPassKey = w, j.shift()), j.push({
        notice: A,
        holderCallback: T
      })), d.value = j;
    }, b = function(y) {
      d.value = d.value.filter(function(T) {
        var w = T.notice, A = w.key, I = w.userPassKey, P = I || A;
        return P !== y;
      });
    };
    return o({
      add: g,
      remove: b,
      notices: d
    }), function() {
      var C, y, T = t.prefixCls, w = t.closeIcon, A = w === void 0 ? (C = a.closeIcon) === null || C === void 0 ? void 0 : C.call(a, {
        prefixCls: T
      }) : w, I = d.value.map(function(j, z) {
        var Z = j.notice, H = j.holderCallback, u = z === d.value.length - 1 ? Z.updateMark : void 0, Y = Z.key, G = Z.userPassKey, re = Z.content, de = J(J(J({
          prefixCls: T,
          closeIcon: typeof A == "function" ? A({
            prefixCls: T
          }) : A
        }, Z), Z.props), {}, {
          key: Y,
          noticeKey: G || Y,
          updateMark: u,
          onClose: function(Q) {
            var he;
            b(Q), (he = Z.onClose) === null || he === void 0 || he.call(Z);
          },
          onClick: Z.onClick
        });
        return H ? L("div", {
          key: Y,
          class: "".concat(T, "-hook-holder"),
          ref: function(Q) {
            typeof Y > "u" || (Q ? (c.set(Y, Q), H(Q, de)) : c.delete(Y));
          }
        }, null) : L(q0, de, {
          default: function() {
            return [typeof re == "function" ? re({
              prefixCls: T
            }) : re];
          }
        });
      }), P = (y = {}, _e(y, T, 1), _e(y, r.class, !!r.class), y);
      return L("div", {
        class: P,
        style: r.style || {
          top: "65px",
          left: "50%"
        }
      }, [L(uy, J({
        tag: "div"
      }, p.value), {
        default: function() {
          return [I];
        }
      })]);
    };
  }
});
Ks.newInstance = function(t, n) {
  var r = t || {}, o = r.name, a = o === void 0 ? "notification" : o, c = r.getContainer, d = r.appContext, p = r.prefixCls, g = r.rootPrefixCls, b = r.transitionName, C = r.hasTransitionName, y = ya(r, z0), T = document.createElement("div");
  if (c) {
    var w = c();
    w.appendChild(T);
  } else
    document.body.appendChild(T);
  var A = tt({
    compatConfig: {
      MODE: 3
    },
    name: "NotificationWrapper",
    setup: function(j, z) {
      var Z = z.attrs, H = $e();
      return Qt(function() {
        n({
          notice: function(Y) {
            var G;
            (G = H.value) === null || G === void 0 || G.add(Y);
          },
          removeNotice: function(Y) {
            var G;
            (G = H.value) === null || G === void 0 || G.remove(Y);
          },
          destroy: function() {
            Yo(null, T), T.parentNode && T.parentNode.removeChild(T);
          },
          component: H
        });
      }), function() {
        var u = kt, Y = u.getPrefixCls(a, p), G = u.getRootPrefixCls(g, Y), re = C ? b : "".concat(G, "-").concat(b);
        return L(Yr, J(J({}, u), {}, {
          notUpdateGlobalConfig: !0,
          prefixCls: G
        }), {
          default: function() {
            return [L(Ks, J(J({
              ref: H
            }, Z), {}, {
              prefixCls: Y,
              transitionName: re
            }), null)];
          }
        });
      };
    }
  }), I = L(A, y);
  I.appContext = d || I.appContext, Yo(I, T);
};
const th = Ks;
var X0 = { icon: { tag: "svg", attrs: { viewBox: "0 0 1024 1024", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, name: "loading", theme: "outlined" };
const V0 = X0;
function yt(e, t) {
  K0(e) && (e = "100%");
  var n = G0(e);
  return e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e))), n && (e = parseInt(String(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / parseFloat(String(t)) : e = e % t / parseFloat(String(t)), e);
}
function xo(e) {
  return Math.min(1, Math.max(0, e));
}
function K0(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function G0(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function nh(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function wo(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function yr(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function J0(e, t, n) {
  return {
    r: yt(e, 255) * 255,
    g: yt(t, 255) * 255,
    b: yt(n, 255) * 255
  };
}
function tf(e, t, n) {
  e = yt(e, 255), t = yt(t, 255), n = yt(n, 255);
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
function fs(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * (6 * n) : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Q0(e, t, n) {
  var r, o, a;
  if (e = yt(e, 360), t = yt(t, 100), n = yt(n, 100), t === 0)
    o = n, a = n, r = n;
  else {
    var c = n < 0.5 ? n * (1 + t) : n + t - n * t, d = 2 * n - c;
    r = fs(d, c, e + 1 / 3), o = fs(d, c, e), a = fs(d, c, e - 1 / 3);
  }
  return { r: r * 255, g: o * 255, b: a * 255 };
}
function Gs(e, t, n) {
  e = yt(e, 255), t = yt(t, 255), n = yt(n, 255);
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
  e = yt(e, 360) * 6, t = yt(t, 100), n = yt(n, 100);
  var r = Math.floor(e), o = e - r, a = n * (1 - t), c = n * (1 - o * t), d = n * (1 - (1 - o) * t), p = r % 6, g = [n, c, a, a, d, n][p], b = [d, n, n, c, a, a][p], C = [a, a, d, n, n, c][p];
  return { r: g * 255, g: b * 255, b: C * 255 };
}
function Js(e, t, n, r) {
  var o = [
    yr(Math.round(e).toString(16)),
    yr(Math.round(t).toString(16)),
    yr(Math.round(n).toString(16))
  ];
  return r && o[0].startsWith(o[0].charAt(1)) && o[1].startsWith(o[1].charAt(1)) && o[2].startsWith(o[2].charAt(1)) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) : o.join("");
}
function e1(e, t, n, r, o) {
  var a = [
    yr(Math.round(e).toString(16)),
    yr(Math.round(t).toString(16)),
    yr(Math.round(n).toString(16)),
    yr(t1(r))
  ];
  return o && a[0].startsWith(a[0].charAt(1)) && a[1].startsWith(a[1].charAt(1)) && a[2].startsWith(a[2].charAt(1)) && a[3].startsWith(a[3].charAt(1)) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) + a[3].charAt(0) : a.join("");
}
function t1(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function nf(e) {
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
var Qs = {
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
function Dr(e) {
  var t = { r: 0, g: 0, b: 0 }, n = 1, r = null, o = null, a = null, c = !1, d = !1;
  return typeof e == "string" && (e = o1(e)), typeof e == "object" && (Sn(e.r) && Sn(e.g) && Sn(e.b) ? (t = J0(e.r, e.g, e.b), c = !0, d = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : Sn(e.h) && Sn(e.s) && Sn(e.v) ? (r = wo(e.s), o = wo(e.v), t = Z0(e.h, r, o), c = !0, d = "hsv") : Sn(e.h) && Sn(e.s) && Sn(e.l) && (r = wo(e.s), a = wo(e.l), t = Q0(e.h, r, a), c = !0, d = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)), n = nh(n), {
    ok: c,
    format: e.format || d,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: n
  };
}
var r1 = "[-\\+]?\\d+%?", i1 = "[-\\+]?\\d*\\.\\d+%?", Xn = "(?:".concat(i1, ")|(?:").concat(r1, ")"), ds = "[\\s|\\(]+(".concat(Xn, ")[,|\\s]+(").concat(Xn, ")[,|\\s]+(").concat(Xn, ")\\s*\\)?"), ps = "[\\s|\\(]+(".concat(Xn, ")[,|\\s]+(").concat(Xn, ")[,|\\s]+(").concat(Xn, ")[,|\\s]+(").concat(Xn, ")\\s*\\)?"), sn = {
  CSS_UNIT: new RegExp(Xn),
  rgb: new RegExp("rgb" + ds),
  rgba: new RegExp("rgba" + ps),
  hsl: new RegExp("hsl" + ds),
  hsla: new RegExp("hsla" + ps),
  hsv: new RegExp("hsv" + ds),
  hsva: new RegExp("hsva" + ps),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function o1(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var t = !1;
  if (Qs[e])
    e = Qs[e], t = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = sn.rgb.exec(e);
  return n ? { r: n[1], g: n[2], b: n[3] } : (n = sn.rgba.exec(e), n ? { r: n[1], g: n[2], b: n[3], a: n[4] } : (n = sn.hsl.exec(e), n ? { h: n[1], s: n[2], l: n[3] } : (n = sn.hsla.exec(e), n ? { h: n[1], s: n[2], l: n[3], a: n[4] } : (n = sn.hsv.exec(e), n ? { h: n[1], s: n[2], v: n[3] } : (n = sn.hsva.exec(e), n ? { h: n[1], s: n[2], v: n[3], a: n[4] } : (n = sn.hex8.exec(e), n ? {
    r: Wt(n[1]),
    g: Wt(n[2]),
    b: Wt(n[3]),
    a: nf(n[4]),
    format: t ? "name" : "hex8"
  } : (n = sn.hex6.exec(e), n ? {
    r: Wt(n[1]),
    g: Wt(n[2]),
    b: Wt(n[3]),
    format: t ? "name" : "hex"
  } : (n = sn.hex4.exec(e), n ? {
    r: Wt(n[1] + n[1]),
    g: Wt(n[2] + n[2]),
    b: Wt(n[3] + n[3]),
    a: nf(n[4] + n[4]),
    format: t ? "name" : "hex8"
  } : (n = sn.hex3.exec(e), n ? {
    r: Wt(n[1] + n[1]),
    g: Wt(n[2] + n[2]),
    b: Wt(n[3] + n[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function Sn(e) {
  return Boolean(sn.CSS_UNIT.exec(String(e)));
}
var hs = (
  /** @class */
  function() {
    function e(t, n) {
      t === void 0 && (t = ""), n === void 0 && (n = {});
      var r;
      if (t instanceof e)
        return t;
      typeof t == "number" && (t = n1(t)), this.originalInput = t;
      var o = Dr(t);
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
      return this.a = nh(t), this.roundA = Math.round(100 * this.a) / 100, this;
    }, e.prototype.isMonochrome = function() {
      var t = this.toHsl().s;
      return t === 0;
    }, e.prototype.toHsv = function() {
      var t = Gs(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }, e.prototype.toHsvString = function() {
      var t = Gs(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), o = Math.round(t.v * 100);
      return this.a === 1 ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(o, "%)") : "hsva(".concat(n, ", ").concat(r, "%, ").concat(o, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHsl = function() {
      var t = tf(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }, e.prototype.toHslString = function() {
      var t = tf(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), o = Math.round(t.l * 100);
      return this.a === 1 ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(o, "%)") : "hsla(".concat(n, ", ").concat(r, "%, ").concat(o, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHex = function(t) {
      return t === void 0 && (t = !1), Js(this.r, this.g, this.b, t);
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
        return "".concat(Math.round(yt(n, 255) * 100), "%");
      };
      return {
        r: t(this.r),
        g: t(this.g),
        b: t(this.b),
        a: this.a
      };
    }, e.prototype.toPercentageRgbString = function() {
      var t = function(n) {
        return Math.round(yt(n, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%)") : "rgba(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%, ").concat(this.roundA, ")");
    }, e.prototype.toName = function() {
      if (this.a === 0)
        return "transparent";
      if (this.a < 1)
        return !1;
      for (var t = "#" + Js(this.r, this.g, this.b, !1), n = 0, r = Object.entries(Qs); n < r.length; n++) {
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
      return n.l += t / 100, n.l = xo(n.l), new e(n);
    }, e.prototype.brighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100)))), n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100)))), n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100)))), new e(n);
    }, e.prototype.darken = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l -= t / 100, n.l = xo(n.l), new e(n);
    }, e.prototype.tint = function(t) {
      return t === void 0 && (t = 10), this.mix("white", t);
    }, e.prototype.shade = function(t) {
      return t === void 0 && (t = 10), this.mix("black", t);
    }, e.prototype.desaturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s -= t / 100, n.s = xo(n.s), new e(n);
    }, e.prototype.saturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s += t / 100, n.s = xo(n.s), new e(n);
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
), To = 2, rf = 0.16, a1 = 0.05, s1 = 0.05, l1 = 0.15, rh = 5, ih = 4, u1 = [{
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
function of(e) {
  var t = e.r, n = e.g, r = e.b, o = Gs(t, n, r);
  return {
    h: o.h * 360,
    s: o.s,
    v: o.v
  };
}
function Eo(e) {
  var t = e.r, n = e.g, r = e.b;
  return "#".concat(Js(t, n, r, !1));
}
function c1(e, t, n) {
  var r = n / 100, o = {
    r: (t.r - e.r) * r + e.r,
    g: (t.g - e.g) * r + e.g,
    b: (t.b - e.b) * r + e.b
  };
  return o;
}
function af(e, t, n) {
  var r;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? r = n ? Math.round(e.h) - To * t : Math.round(e.h) + To * t : r = n ? Math.round(e.h) + To * t : Math.round(e.h) - To * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function sf(e, t, n) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var r;
  return n ? r = e.s - rf * t : t === ih ? r = e.s + rf : r = e.s + a1 * t, r > 1 && (r = 1), n && t === rh && r > 0.1 && (r = 0.1), r < 0.06 && (r = 0.06), Number(r.toFixed(2));
}
function lf(e, t, n) {
  var r;
  return n ? r = e.v + s1 * t : r = e.v - l1 * t, r > 1 && (r = 1), Number(r.toFixed(2));
}
function Yi(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [], r = Dr(e), o = rh; o > 0; o -= 1) {
    var a = of(r), c = Eo(Dr({
      h: af(a, o, !0),
      s: sf(a, o, !0),
      v: lf(a, o, !0)
    }));
    n.push(c);
  }
  n.push(Eo(r));
  for (var d = 1; d <= ih; d += 1) {
    var p = of(r), g = Eo(Dr({
      h: af(p, d),
      s: sf(p, d),
      v: lf(p, d)
    }));
    n.push(g);
  }
  return t.theme === "dark" ? u1.map(function(b) {
    var C = b.index, y = b.opacity, T = Eo(c1(Dr(t.backgroundColor || "#141414"), Dr(n[C]), y * 100));
    return T;
  }) : n;
}
var vs = {
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
}, gs = {}, ms = {};
Object.keys(vs).forEach(function(e) {
  gs[e] = Yi(vs[e]), gs[e].primary = gs[e][5], ms[e] = Yi(vs[e], {
    theme: "dark",
    backgroundColor: "#141414"
  }), ms[e].primary = ms[e][5];
});
var uf = [], wi = [], f1 = "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";
function d1() {
  var e = document.createElement("style");
  return e.setAttribute("type", "text/css"), e;
}
function p1(e, t) {
  if (t = t || {}, e === void 0)
    throw new Error(f1);
  var n = t.prepend === !0 ? "prepend" : "append", r = t.container !== void 0 ? t.container : document.querySelector("head"), o = uf.indexOf(r);
  o === -1 && (o = uf.push(r) - 1, wi[o] = {});
  var a;
  return wi[o] !== void 0 && wi[o][n] !== void 0 ? a = wi[o][n] : (a = wi[o][n] = d1(), n === "prepend" ? r.insertBefore(a, r.childNodes[0]) : r.appendChild(a)), e.charCodeAt(0) === 65279 && (e = e.substr(1, e.length)), a.styleSheet ? a.styleSheet.cssText += e : a.textContent += e, a;
}
function cf(e) {
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
function ff(e) {
  return typeof e == "object" && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function Zs(e, t, n) {
  return n ? zo(e.tag, cf({
    key: t
  }, n, e.attrs), (e.children || []).map(function(r, o) {
    return Zs(r, "".concat(t, "-").concat(e.tag, "-").concat(o));
  })) : zo(e.tag, cf({
    key: t
  }, e.attrs), (e.children || []).map(function(r, o) {
    return Zs(r, "".concat(t, "-").concat(e.tag, "-").concat(o));
  }));
}
function oh(e) {
  return Yi(e)[0];
}
function ah(e) {
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
`, df = !1, g1 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : v1;
  Mn(function() {
    df || (typeof window < "u" && window.document && window.document.documentElement && p1(t, {
      prepend: !0
    }), df = !0);
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
function $o(e) {
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
var Mi = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function x1(e) {
  var t = e.primaryColor, n = e.secondaryColor;
  Mi.primaryColor = t, Mi.secondaryColor = n || oh(t), Mi.calculated = !!n;
}
function w1() {
  return $o({}, Mi);
}
var ai = function(t, n) {
  var r = $o({}, t, n.attrs), o = r.icon, a = r.primaryColor, c = r.secondaryColor, d = y1(r, m1), p = Mi;
  if (a && (p = {
    primaryColor: a,
    secondaryColor: c || oh(a)
  }), g1(), ff(o), !ff(o))
    return null;
  var g = o;
  return g && typeof g.icon == "function" && (g = $o({}, g, {
    icon: g.icon(p.primaryColor, p.secondaryColor)
  })), Zs(g.icon, "svg-".concat(g.name), $o({}, d, {
    "data-icon": g.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }));
};
ai.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
};
ai.inheritAttrs = !1;
ai.displayName = "IconBase";
ai.getTwoToneColors = w1;
ai.setTwoToneColors = x1;
const Wl = ai;
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
      return pf(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return pf(e, t);
  }
}
function pf(e, t) {
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
function sh(e) {
  var t = ah(e), n = T1(t, 2), r = n[0], o = n[1];
  return Wl.setTwoToneColors({
    primaryColor: r,
    secondaryColor: o
  });
}
function A1() {
  var e = Wl.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var P1 = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];
function N1(e, t) {
  return R1(e) || M1(e, t) || L1(e, t) || k1();
}
function k1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function L1(e, t) {
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
function M1(e, t) {
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
function R1(e) {
  if (Array.isArray(e))
    return e;
}
function vf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      el(e, o, n[o]);
    });
  }
  return e;
}
function el(e, t, n) {
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
sh("#1890ff");
var si = function(t, n) {
  var r, o = vf({}, t, n.attrs), a = o.class, c = o.icon, d = o.spin, p = o.rotate, g = o.tabindex, b = o.twoToneColor, C = o.onClick, y = I1(o, P1), T = (r = {
    anticon: !0
  }, el(r, "anticon-".concat(c.name), Boolean(c.name)), el(r, a, a), r), w = d === "" || d || c.name === "loading" ? "anticon-spin" : "", A = g;
  A === void 0 && C && (A = -1, y.tabindex = A);
  var I = p ? {
    msTransform: "rotate(".concat(p, "deg)"),
    transform: "rotate(".concat(p, "deg)")
  } : void 0, P = ah(b), j = N1(P, 2), z = j[0], Z = j[1];
  return L("span", vf({
    role: "img",
    "aria-label": c.name
  }, y, {
    onClick: C,
    class: T
  }), [L(Wl, {
    class: w,
    icon: c,
    primaryColor: z,
    secondaryColor: Z,
    style: I
  }, null)]);
};
si.props = {
  spin: Boolean,
  rotate: Number,
  icon: Object,
  twoToneColor: String
};
si.displayName = "AntdIcon";
si.inheritAttrs = !1;
si.getTwoToneColor = A1;
si.setTwoToneColor = sh;
const Zt = si;
function gf(e) {
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
var Ul = function(t, n) {
  var r = gf({}, t, n.attrs);
  return L(Zt, gf({}, r, {
    icon: V0
  }), null);
};
Ul.displayName = "LoadingOutlined";
Ul.inheritAttrs = !1;
const tl = Ul;
var $1 = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, name: "exclamation-circle", theme: "filled" };
const F1 = $1;
function mf(e) {
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
var ql = function(t, n) {
  var r = mf({}, t, n.attrs);
  return L(Zt, mf({}, r, {
    icon: F1
  }), null);
};
ql.displayName = "ExclamationCircleFilled";
ql.inheritAttrs = !1;
const B1 = ql;
var W1 = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" } }] }, name: "close-circle", theme: "filled" };
const U1 = W1;
function yf(e) {
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
var zl = function(t, n) {
  var r = yf({}, t, n.attrs);
  return L(Zt, yf({}, r, {
    icon: U1
  }), null);
};
zl.displayName = "CloseCircleFilled";
zl.inheritAttrs = !1;
const z1 = zl;
var Y1 = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" } }] }, name: "check-circle", theme: "filled" };
const X1 = Y1;
function bf(e) {
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
var Yl = function(t, n) {
  var r = bf({}, t, n.attrs);
  return L(Zt, bf({}, r, {
    icon: X1
  }), null);
};
Yl.displayName = "CheckCircleFilled";
Yl.inheritAttrs = !1;
const K1 = Yl;
var G1 = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, name: "info-circle", theme: "filled" };
const J1 = G1;
function Cf(e) {
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
var Xl = function(t, n) {
  var r = Cf({}, t, n.attrs);
  return L(Zt, Cf({}, r, {
    icon: J1
  }), null);
};
Xl.displayName = "InfoCircleFilled";
Xl.inheritAttrs = !1;
const Z1 = Xl;
var lh = 3, uh, St, eC = 1, ch = "", fh = "move-up", dh = !1, ph = function() {
  return document.body;
}, hh, vh = !1;
function tC() {
  return eC++;
}
function nC(e) {
  e.top !== void 0 && (uh = e.top, St = null), e.duration !== void 0 && (lh = e.duration), e.prefixCls !== void 0 && (ch = e.prefixCls), e.getContainer !== void 0 && (ph = e.getContainer, St = null), e.transitionName !== void 0 && (fh = e.transitionName, St = null, dh = !0), e.maxCount !== void 0 && (hh = e.maxCount, St = null), e.rtl !== void 0 && (vh = e.rtl);
}
function rC(e, t) {
  if (St) {
    t(St);
    return;
  }
  th.newInstance({
    appContext: e.appContext,
    prefixCls: e.prefixCls || ch,
    rootPrefixCls: e.rootPrefixCls,
    transitionName: fh,
    hasTransitionName: dh,
    style: {
      top: uh
    },
    getContainer: ph || e.getPopupContainer,
    maxCount: hh,
    name: "message"
  }, function(n) {
    if (St) {
      t(St);
      return;
    }
    St = n, t(n);
  });
}
var iC = {
  info: Z1,
  success: K1,
  error: z1,
  warning: B1,
  loading: tl
};
function oC(e) {
  var t = e.duration !== void 0 ? e.duration : lh, n = e.key || tC(), r = new Promise(function(a) {
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
          var b, C = g.prefixCls, y = iC[e.type], T = y ? L(y, null, null) : "", w = Cn("".concat(C, "-custom-content"), (b = {}, _e(b, "".concat(C, "-").concat(e.type), e.type), _e(b, "".concat(C, "-rtl"), vh === !0), b));
          return L("div", {
            class: w
          }, [typeof e.icon == "function" ? e.icon() : e.icon || T, L("span", null, [typeof e.content == "function" ? e.content() : e.content])]);
        },
        onClose: c,
        onClick: e.onClick
      });
    });
  }), o = function() {
    St && St.removeNotice(n);
  };
  return o.then = function(a, c) {
    return r.then(a, c);
  }, o.promise = r, o;
}
function aC(e) {
  return Object.prototype.toString.call(e) === "[object Object]" && !!e.content;
}
var Zo = {
  open: oC,
  config: nC,
  destroy: function(t) {
    if (St)
      if (t) {
        var n = St, r = n.removeNotice;
        r(t);
      } else {
        var o = St, a = o.destroy;
        a(), St = null;
      }
  }
};
function sC(e, t) {
  e[t] = function(n, r, o) {
    return aC(n) ? e.open(J(J({}, n), {}, {
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
  return sC(Zo, e);
});
Zo.warn = Zo.warning;
const lC = Zo;
var nl = {}, uC = {
  get exports() {
    return nl;
  },
  set exports(e) {
    nl = e;
  }
}, rl = {}, cC = {
  get exports() {
    return rl;
  },
  set exports(e) {
    rl = e;
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
  var t = rl.default;
  function n() {
    e.exports = n = function() {
      return r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports;
    var r = {}, o = Object.prototype, a = o.hasOwnProperty, c = Object.defineProperty || function(ie, B, K) {
      ie[B] = K.value;
    }, d = typeof Symbol == "function" ? Symbol : {}, p = d.iterator || "@@iterator", g = d.asyncIterator || "@@asyncIterator", b = d.toStringTag || "@@toStringTag";
    function C(ie, B, K) {
      return Object.defineProperty(ie, B, {
        value: K,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), ie[B];
    }
    try {
      C({}, "");
    } catch {
      C = function(K, ae, ve) {
        return K[ae] = ve;
      };
    }
    function y(ie, B, K, ae) {
      var ve = B && B.prototype instanceof A ? B : A, ge = Object.create(ve.prototype), Ae = new Q(ae || []);
      return c(ge, "_invoke", {
        value: G(ie, K, Ae)
      }), ge;
    }
    function T(ie, B, K) {
      try {
        return {
          type: "normal",
          arg: ie.call(B, K)
        };
      } catch (ae) {
        return {
          type: "throw",
          arg: ae
        };
      }
    }
    r.wrap = y;
    var w = {};
    function A() {
    }
    function I() {
    }
    function P() {
    }
    var j = {};
    C(j, p, function() {
      return this;
    });
    var z = Object.getPrototypeOf, Z = z && z(z(he([])));
    Z && Z !== o && a.call(Z, p) && (j = Z);
    var H = P.prototype = A.prototype = Object.create(j);
    function u(ie) {
      ["next", "throw", "return"].forEach(function(B) {
        C(ie, B, function(K) {
          return this._invoke(B, K);
        });
      });
    }
    function Y(ie, B) {
      function K(ve, ge, Ae, We) {
        var je = T(ie[ve], ie, ge);
        if (je.type !== "throw") {
          var ut = je.arg, at = ut.value;
          return at && t(at) == "object" && a.call(at, "__await") ? B.resolve(at.__await).then(function(ot) {
            K("next", ot, Ae, We);
          }, function(ot) {
            K("throw", ot, Ae, We);
          }) : B.resolve(at).then(function(ot) {
            ut.value = ot, Ae(ut);
          }, function(ot) {
            return K("throw", ot, Ae, We);
          });
        }
        We(je.arg);
      }
      var ae;
      c(this, "_invoke", {
        value: function(ge, Ae) {
          function We() {
            return new B(function(je, ut) {
              K(ge, Ae, je, ut);
            });
          }
          return ae = ae ? ae.then(We, We) : We();
        }
      });
    }
    function G(ie, B, K) {
      var ae = "suspendedStart";
      return function(ve, ge) {
        if (ae === "executing")
          throw new Error("Generator is already running");
        if (ae === "completed") {
          if (ve === "throw")
            throw ge;
          return Re();
        }
        for (K.method = ve, K.arg = ge; ; ) {
          var Ae = K.delegate;
          if (Ae) {
            var We = re(Ae, K);
            if (We) {
              if (We === w)
                continue;
              return We;
            }
          }
          if (K.method === "next")
            K.sent = K._sent = K.arg;
          else if (K.method === "throw") {
            if (ae === "suspendedStart")
              throw ae = "completed", K.arg;
            K.dispatchException(K.arg);
          } else
            K.method === "return" && K.abrupt("return", K.arg);
          ae = "executing";
          var je = T(ie, B, K);
          if (je.type === "normal") {
            if (ae = K.done ? "completed" : "suspendedYield", je.arg === w)
              continue;
            return {
              value: je.arg,
              done: K.done
            };
          }
          je.type === "throw" && (ae = "completed", K.method = "throw", K.arg = je.arg);
        }
      };
    }
    function re(ie, B) {
      var K = B.method, ae = ie.iterator[K];
      if (ae === void 0)
        return B.delegate = null, K === "throw" && ie.iterator.return && (B.method = "return", B.arg = void 0, re(ie, B), B.method === "throw") || K !== "return" && (B.method = "throw", B.arg = new TypeError("The iterator does not provide a '" + K + "' method")), w;
      var ve = T(ae, ie.iterator, B.arg);
      if (ve.type === "throw")
        return B.method = "throw", B.arg = ve.arg, B.delegate = null, w;
      var ge = ve.arg;
      return ge ? ge.done ? (B[ie.resultName] = ge.value, B.next = ie.nextLoc, B.method !== "return" && (B.method = "next", B.arg = void 0), B.delegate = null, w) : ge : (B.method = "throw", B.arg = new TypeError("iterator result is not an object"), B.delegate = null, w);
    }
    function de(ie) {
      var B = {
        tryLoc: ie[0]
      };
      1 in ie && (B.catchLoc = ie[1]), 2 in ie && (B.finallyLoc = ie[2], B.afterLoc = ie[3]), this.tryEntries.push(B);
    }
    function xe(ie) {
      var B = ie.completion || {};
      B.type = "normal", delete B.arg, ie.completion = B;
    }
    function Q(ie) {
      this.tryEntries = [{
        tryLoc: "root"
      }], ie.forEach(de, this), this.reset(!0);
    }
    function he(ie) {
      if (ie) {
        var B = ie[p];
        if (B)
          return B.call(ie);
        if (typeof ie.next == "function")
          return ie;
        if (!isNaN(ie.length)) {
          var K = -1, ae = function ve() {
            for (; ++K < ie.length; )
              if (a.call(ie, K))
                return ve.value = ie[K], ve.done = !1, ve;
            return ve.value = void 0, ve.done = !0, ve;
          };
          return ae.next = ae;
        }
      }
      return {
        next: Re
      };
    }
    function Re() {
      return {
        value: void 0,
        done: !0
      };
    }
    return I.prototype = P, c(H, "constructor", {
      value: P,
      configurable: !0
    }), c(P, "constructor", {
      value: I,
      configurable: !0
    }), I.displayName = C(P, b, "GeneratorFunction"), r.isGeneratorFunction = function(ie) {
      var B = typeof ie == "function" && ie.constructor;
      return !!B && (B === I || (B.displayName || B.name) === "GeneratorFunction");
    }, r.mark = function(ie) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(ie, P) : (ie.__proto__ = P, C(ie, b, "GeneratorFunction")), ie.prototype = Object.create(H), ie;
    }, r.awrap = function(ie) {
      return {
        __await: ie
      };
    }, u(Y.prototype), C(Y.prototype, g, function() {
      return this;
    }), r.AsyncIterator = Y, r.async = function(ie, B, K, ae, ve) {
      ve === void 0 && (ve = Promise);
      var ge = new Y(y(ie, B, K, ae), ve);
      return r.isGeneratorFunction(B) ? ge : ge.next().then(function(Ae) {
        return Ae.done ? Ae.value : ge.next();
      });
    }, u(H), C(H, b, "Generator"), C(H, p, function() {
      return this;
    }), C(H, "toString", function() {
      return "[object Generator]";
    }), r.keys = function(ie) {
      var B = Object(ie), K = [];
      for (var ae in B)
        K.push(ae);
      return K.reverse(), function ve() {
        for (; K.length; ) {
          var ge = K.pop();
          if (ge in B)
            return ve.value = ge, ve.done = !1, ve;
        }
        return ve.done = !0, ve;
      };
    }, r.values = he, Q.prototype = {
      constructor: Q,
      reset: function(B) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(xe), !B)
          for (var K in this)
            K.charAt(0) === "t" && a.call(this, K) && !isNaN(+K.slice(1)) && (this[K] = void 0);
      },
      stop: function() {
        this.done = !0;
        var B = this.tryEntries[0].completion;
        if (B.type === "throw")
          throw B.arg;
        return this.rval;
      },
      dispatchException: function(B) {
        if (this.done)
          throw B;
        var K = this;
        function ae(ut, at) {
          return Ae.type = "throw", Ae.arg = B, K.next = ut, at && (K.method = "next", K.arg = void 0), !!at;
        }
        for (var ve = this.tryEntries.length - 1; ve >= 0; --ve) {
          var ge = this.tryEntries[ve], Ae = ge.completion;
          if (ge.tryLoc === "root")
            return ae("end");
          if (ge.tryLoc <= this.prev) {
            var We = a.call(ge, "catchLoc"), je = a.call(ge, "finallyLoc");
            if (We && je) {
              if (this.prev < ge.catchLoc)
                return ae(ge.catchLoc, !0);
              if (this.prev < ge.finallyLoc)
                return ae(ge.finallyLoc);
            } else if (We) {
              if (this.prev < ge.catchLoc)
                return ae(ge.catchLoc, !0);
            } else {
              if (!je)
                throw new Error("try statement without catch or finally");
              if (this.prev < ge.finallyLoc)
                return ae(ge.finallyLoc);
            }
          }
        }
      },
      abrupt: function(B, K) {
        for (var ae = this.tryEntries.length - 1; ae >= 0; --ae) {
          var ve = this.tryEntries[ae];
          if (ve.tryLoc <= this.prev && a.call(ve, "finallyLoc") && this.prev < ve.finallyLoc) {
            var ge = ve;
            break;
          }
        }
        ge && (B === "break" || B === "continue") && ge.tryLoc <= K && K <= ge.finallyLoc && (ge = null);
        var Ae = ge ? ge.completion : {};
        return Ae.type = B, Ae.arg = K, ge ? (this.method = "next", this.next = ge.finallyLoc, w) : this.complete(Ae);
      },
      complete: function(B, K) {
        if (B.type === "throw")
          throw B.arg;
        return B.type === "break" || B.type === "continue" ? this.next = B.arg : B.type === "return" ? (this.rval = this.arg = B.arg, this.method = "return", this.next = "end") : B.type === "normal" && K && (this.next = K), w;
      },
      finish: function(B) {
        for (var K = this.tryEntries.length - 1; K >= 0; --K) {
          var ae = this.tryEntries[K];
          if (ae.finallyLoc === B)
            return this.complete(ae.completion, ae.afterLoc), xe(ae), w;
        }
      },
      catch: function(B) {
        for (var K = this.tryEntries.length - 1; K >= 0; --K) {
          var ae = this.tryEntries[K];
          if (ae.tryLoc === B) {
            var ve = ae.completion;
            if (ve.type === "throw") {
              var ge = ve.arg;
              xe(ae);
            }
            return ge;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(B, K, ae) {
        return this.delegate = {
          iterator: he(B),
          resultName: K,
          nextLoc: ae
        }, this.method === "next" && (this.arg = void 0), w;
      }
    }, r;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(uC);
var ys = nl();
try {
  regeneratorRuntime = ys;
} catch {
  typeof globalThis == "object" ? globalThis.regeneratorRuntime = ys : Function("r", "regeneratorRuntime = r")(ys);
}
var fC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" } }, { tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, name: "check-circle", theme: "outlined" };
const dC = fC;
function xf(e) {
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
var Vl = function(t, n) {
  var r = xf({}, t, n.attrs);
  return L(Zt, xf({}, r, {
    icon: dC
  }), null);
};
Vl.displayName = "CheckCircleOutlined";
Vl.inheritAttrs = !1;
const gh = Vl;
var hC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attrs: { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" } }] }, name: "info-circle", theme: "outlined" };
const vC = hC;
function wf(e) {
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
var Kl = function(t, n) {
  var r = wf({}, t, n.attrs);
  return L(Zt, wf({}, r, {
    icon: vC
  }), null);
};
Kl.displayName = "InfoCircleOutlined";
Kl.inheritAttrs = !1;
const mh = Kl;
var mC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" } }, { tag: "path", attrs: { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, name: "close-circle", theme: "outlined" };
const yC = mC;
function Tf(e) {
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
var Gl = function(t, n) {
  var r = Tf({}, t, n.attrs);
  return L(Zt, Tf({}, r, {
    icon: yC
  }), null);
};
Gl.displayName = "CloseCircleOutlined";
Gl.inheritAttrs = !1;
const yh = Gl;
var CC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attrs: { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" } }] }, name: "exclamation-circle", theme: "outlined" };
const xC = CC;
function Ef(e) {
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
var Jl = function(t, n) {
  var r = Ef({}, t, n.attrs);
  return L(Zt, Ef({}, r, {
    icon: xC
  }), null);
};
Jl.displayName = "ExclamationCircleOutlined";
Jl.inheritAttrs = !1;
const Ql = Jl;
var TC = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" } }] }, name: "close", theme: "outlined" };
const EC = TC;
function Sf(e) {
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
var Zl = function(t, n) {
  var r = Sf({}, t, n.attrs);
  return L(Zt, Sf({}, r, {
    icon: EC
  }), null);
};
Zl.displayName = "CloseOutlined";
Zl.inheritAttrs = !1;
const bh = Zl;
var gr = {}, Ch = 4.5, xh = "24px", wh = "24px", il = "", Th = "topRight", Eh = function() {
  return document.body;
}, Sh = null, ol = !1, Oh;
function OC(e) {
  var t = e.duration, n = e.placement, r = e.bottom, o = e.top, a = e.getContainer, c = e.closeIcon, d = e.prefixCls;
  d !== void 0 && (il = d), t !== void 0 && (Ch = t), n !== void 0 && (Th = n), r !== void 0 && (wh = typeof r == "number" ? "".concat(r, "px") : r), o !== void 0 && (xh = typeof o == "number" ? "".concat(o, "px") : o), a !== void 0 && (Eh = a), c !== void 0 && (Sh = c), e.rtl !== void 0 && (ol = e.rtl), e.maxCount !== void 0 && (Oh = e.maxCount);
}
function _C(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : xh, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wh, r;
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
  var n = e.prefixCls, r = e.placement, o = r === void 0 ? Th : r, a = e.getContainer, c = a === void 0 ? Eh : a, d = e.top, p = e.bottom, g = e.closeIcon, b = g === void 0 ? Sh : g, C = e.appContext, y = UC(), T = y.getPrefixCls, w = T("notification", n || il), A = "".concat(w, "-").concat(o, "-").concat(ol), I = gr[A];
  if (I) {
    Promise.resolve(I).then(function(j) {
      t(j);
    });
    return;
  }
  var P = Cn("".concat(w, "-").concat(o), _e({}, "".concat(w, "-rtl"), ol === !0));
  th.newInstance({
    name: "notification",
    prefixCls: n || il,
    class: P,
    style: _C(o, d, p),
    appContext: C,
    getContainer: c,
    closeIcon: function(z) {
      var Z = z.prefixCls, H = L("span", {
        class: "".concat(Z, "-close-x")
      }, [Oi(b, {}, L(bh, {
        class: "".concat(Z, "-close-icon")
      }, null))]);
      return H;
    },
    maxCount: Oh,
    hasTransitionName: !0
  }, function(j) {
    gr[A] = j, t(j);
  });
}
var PC = {
  success: gh,
  info: mh,
  error: yh,
  warning: Ql
};
function NC(e) {
  var t = e.icon, n = e.type, r = e.description, o = e.message, a = e.btn, c = e.duration === void 0 ? Ch : e.duration;
  AC(e, function(d) {
    d.notice({
      content: function(g) {
        var b = g.prefixCls, C = "".concat(b, "-notice"), y = null;
        if (t)
          y = function() {
            return L("span", {
              class: "".concat(C, "-icon")
            }, [Oi(t)]);
          };
        else if (n) {
          var T = PC[n];
          y = function() {
            return L(T, {
              class: "".concat(C, "-icon ").concat(C, "-icon-").concat(n)
            }, null);
          };
        }
        return L("div", {
          class: y ? "".concat(C, "-with-icon") : ""
        }, [y && y(), L("div", {
          class: "".concat(C, "-message")
        }, [!r && y ? L("span", {
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
var Xi = {
  open: NC,
  close: function(t) {
    Object.keys(gr).forEach(function(n) {
      return Promise.resolve(gr[n]).then(function(r) {
        r.removeNotice(t);
      });
    });
  },
  config: OC,
  destroy: function() {
    Object.keys(gr).forEach(function(t) {
      Promise.resolve(gr[t]).then(function(n) {
        n.destroy();
      }), delete gr[t];
    });
  }
}, kC = ["success", "info", "warning", "error"];
kC.forEach(function(e) {
  Xi[e] = function(t) {
    return Xi.open(J(J({}, t), {}, {
      type: e
    }));
  };
});
Xi.warn = Xi.warning;
const LC = Xi;
function Ca() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var MC = "vc-util-key";
function _h() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : MC;
}
function eu(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function Of(e) {
  var t, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Ca())
    return null;
  var r = document.createElement("style");
  if ((t = n.csp) !== null && t !== void 0 && t.nonce) {
    var o;
    r.nonce = (o = n.csp) === null || o === void 0 ? void 0 : o.nonce;
  }
  r.innerHTML = e;
  var a = eu(n), c = a.firstChild;
  return n.prepend && a.prepend ? a.prepend(r) : n.prepend && c ? a.insertBefore(r, c) : a.appendChild(r), r;
}
var al = /* @__PURE__ */ new Map();
function RC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = eu(t);
  return Array.from(al.get(n).children).find(function(r) {
    return r.tagName === "STYLE" && r.getAttribute(_h(t)) === e;
  });
}
function IC(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = eu(n);
  if (!al.has(r)) {
    var o = Of("", n), a = o.parentNode;
    al.set(r, a), a.removeChild(o);
  }
  var c = RC(t, n);
  if (c) {
    var d, p;
    if ((d = n.csp) !== null && d !== void 0 && d.nonce && c.nonce !== ((p = n.csp) === null || p === void 0 ? void 0 : p.nonce)) {
      var g;
      c.nonce = (g = n.csp) === null || g === void 0 ? void 0 : g.nonce;
    }
    return c.innerHTML !== e && (c.innerHTML = e), c;
  }
  var b = Of(e, n);
  return b.setAttribute(_h(n), t), b;
}
const Ah = function(e, t, n) {
  Zp(e, "[ant-design-vue: ".concat(t, "] ").concat(n));
};
var jC = "-ant-".concat(Date.now(), "-").concat(Math.random());
function DC(e, t) {
  var n = {}, r = function(b, C) {
    var y = b.clone();
    return y = (C == null ? void 0 : C(y)) || y, y.toRgbString();
  }, o = function(b, C) {
    var y = new hs(b), T = Yi(y.toRgbString());
    n["".concat(C, "-color")] = r(y), n["".concat(C, "-color-disabled")] = T[1], n["".concat(C, "-color-hover")] = T[4], n["".concat(C, "-color-active")] = T[6], n["".concat(C, "-color-outline")] = y.clone().setAlpha(0.2).toRgbString(), n["".concat(C, "-color-deprecated-bg")] = T[1], n["".concat(C, "-color-deprecated-border")] = T[3];
  };
  if (t.primaryColor) {
    o(t.primaryColor, "primary");
    var a = new hs(t.primaryColor), c = Yi(a.toRgbString());
    c.forEach(function(g, b) {
      n["primary-".concat(b + 1)] = g;
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
    var d = new hs(c[0]);
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
  Ca() ? IC(`
  :root {
    `.concat(p.join(`
`), `
  }
  `), "".concat(jC, "-dynamic-theme")) : Ah(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
var $C = Symbol("GlobalFormContextKey"), FC = function(t) {
  Vi($C, t);
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
function zr() {
  return kt.prefixCls || BC;
}
var sl = dn({}), Ph = dn({}), kt = dn({});
Ki(function() {
  kn(kt, sl, Ph), kt.prefixCls = zr(), kt.getPrefixCls = function(e, t) {
    return t || (e ? "".concat(kt.prefixCls, "-").concat(e) : kt.prefixCls);
  }, kt.getRootPrefixCls = function(e, t) {
    return e || (kt.prefixCls ? kt.prefixCls : t && t.includes("-") ? t.replace(/^(.*)-[^-]*$/, "$1") : zr());
  };
});
var bs, WC = function(t) {
  bs && bs(), bs = Ki(function() {
    kn(Ph, dn(t)), kn(kt, dn(t));
  }), t.theme && DC(zr(), t.theme);
}, UC = function() {
  return {
    getPrefixCls: function(n, r) {
      return r || (n ? "".concat(zr(), "-").concat(n) : zr());
    },
    getRootPrefixCls: function(n, r) {
      return n || (kt.prefixCls ? kt.prefixCls : r && r.includes("-") ? r.replace(/^(.*)-[^-]*$/, "$1") : zr());
    }
  };
}, Yr = tt({
  compatConfig: {
    MODE: 3
  },
  name: "AConfigProvider",
  inheritAttrs: !1,
  props: HC(),
  setup: function(t, n) {
    var r = n.slots, o = function(C, y) {
      var T = t.prefixCls, w = T === void 0 ? "ant" : T;
      return y || (C ? "".concat(w, "-").concat(C) : w);
    }, a = function(C) {
      var y = t.renderEmpty || r.renderEmpty || Qp;
      return y(C);
    }, c = function(C, y) {
      var T = t.prefixCls;
      if (y)
        return y;
      var w = T || o("");
      return C ? "".concat(w, "-").concat(C) : w;
    }, d = dn(J(J({}, t), {}, {
      getPrefixCls: c,
      renderEmpty: a
    }));
    Object.keys(t).forEach(function(b) {
      qt(function() {
        return t[b];
      }, function() {
        d[b] = t[b];
      });
    }), t.notUpdateGlobalConfig || (kn(sl, d), qt(d, function() {
      kn(sl, d);
    }));
    var p = Me(function() {
      var b = {};
      if (t.locale) {
        var C, y;
        b = ((C = t.locale.Form) === null || C === void 0 ? void 0 : C.defaultValidateMessages) || ((y = Go.Form) === null || y === void 0 ? void 0 : y.defaultValidateMessages) || {};
      }
      return t.form && t.form.validateMessages && (b = J(J({}, b), t.form.validateMessages)), b;
    });
    FC({
      validateMessages: p
    }), Vi("configProvider", d);
    var g = function(C) {
      var y;
      return L(W0, {
        locale: t.locale || C,
        ANT_MARK__: Vs
      }, {
        default: function() {
          return [(y = r.default) === null || y === void 0 ? void 0 : y.call(r)];
        }
      });
    };
    return Ki(function() {
      t.direction && (lC.config({
        rtl: t.direction === "rtl"
      }), LC.config({
        rtl: t.direction === "rtl"
      }));
    }), function() {
      return L(Dp, {
        children: function(C, y, T) {
          return g(T);
        }
      }, null);
    };
  }
}), Nh = dn({
  getPrefixCls: function(t, n) {
    return n || (t ? "ant-".concat(t) : "ant");
  },
  renderEmpty: Qp,
  direction: "ltr"
});
Yr.config = WC;
Yr.install = function(e) {
  e.component(Yr.name, Yr);
};
const wn = function(e, t) {
  var n = Jn("configProvider", Nh), r = Me(function() {
    return n.getPrefixCls(e, t.prefixCls);
  }), o = Me(function() {
    var j;
    return (j = t.direction) !== null && j !== void 0 ? j : n.direction;
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
  }), b = Me(function() {
    return n.form;
  }), C = Me(function() {
    return t.getTargetContainer || n.getTargetContainer;
  }), y = Me(function() {
    return t.getPopupContainer || n.getPopupContainer;
  }), T = Me(function() {
    var j;
    return (j = t.dropdownMatchSelectWidth) !== null && j !== void 0 ? j : n.dropdownMatchSelectWidth;
  }), w = Me(function() {
    return (t.virtual === void 0 ? n.virtual !== !1 : t.virtual !== !1) && T.value !== !1;
  }), A = Me(function() {
    return t.size || n.componentSize;
  }), I = Me(function() {
    var j;
    return t.autocomplete || ((j = n.input) === null || j === void 0 ? void 0 : j.autocomplete);
  }), P = Me(function() {
    return n.csp;
  });
  return {
    configProvider: n,
    prefixCls: r,
    direction: o,
    size: A,
    getTargetContainer: C,
    getPopupContainer: y,
    space: p,
    pageHeader: g,
    form: b,
    autoInsertSpaceInButton: c,
    renderEmpty: d,
    virtual: w,
    dropdownMatchSelectWidth: T,
    rootPrefixCls: a,
    getPrefixCls: n.getPrefixCls,
    autocomplete: I,
    csp: P
  };
};
function kh(e, t) {
  for (var n = kn({}, e), r = 0; r < t.length; r += 1) {
    var o = t[r];
    delete n[o];
  }
  return n;
}
function qC(e, t) {
  return e ? e.contains(t) : !1;
}
function ll(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Lh = Symbol("PortalContextKey"), Mh = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    inTriggerContext: !0
  };
  Vi(Lh, {
    inTriggerContext: n.inTriggerContext,
    shouldRender: Me(function() {
      var r = t || {}, o = r.sPopupVisible, a = r.popupRef, c = r.forceRender, d = r.autoDestroy, p = !1;
      return (o || a || c) && (p = !0), !o && d && (p = !1), p;
    })
  });
}, zC = function() {
  Mh({}, {
    inTriggerContext: !1
  });
  var t = Jn(Lh, {
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
const YC = tt({
  compatConfig: {
    MODE: 3
  },
  name: "Portal",
  inheritAttrs: !1,
  props: {
    getContainer: et.func.isRequired,
    didUpdate: Function
  },
  setup: function(t, n) {
    var r = n.slots, o = !0, a, c = zC(), d = c.shouldRender;
    jd(function() {
      o = !1, d.value && (a = t.getContainer());
    });
    var p = qt(d, function() {
      d.value && !a && (a = t.getContainer()), a && p();
    });
    return Gi(function() {
      Mn(function() {
        if (d.value) {
          var g;
          (g = t.didUpdate) === null || g === void 0 || g.call(t, t);
        }
      });
    }), In(function() {
      a && a.parentNode && a.parentNode.removeChild(a);
    }), function() {
      if (!d.value)
        return null;
      if (o) {
        var g;
        return (g = r.default) === null || g === void 0 ? void 0 : g.call(r);
      }
      return a ? L(Yd, {
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
const _f = Pe;
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
    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError`, Af = "".concat(XC, " ").concat(VC).split(/[\s\n]+/), KC = "aria-", GC = "data-";
function Pf(e, t) {
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
  } : n = J({}, t);
  var r = {};
  return Object.keys(e).forEach(function(o) {
    // Aria
    (n.aria && (o === "role" || Pf(o, KC)) || // Data
    n.data && Pf(o, GC) || // Attr
    n.attr && (Af.includes(o) || Af.includes(o.toLowerCase()))) && (r[o] = e[o]);
  }), r;
}
var Cs = {
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
}, xs = {
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
}, $r = [], Fr = [];
function QC() {
  var e = document.createElement("div"), t = e.style;
  "AnimationEvent" in window || (delete Cs.animationstart.animation, delete xs.animationend.animation), "TransitionEvent" in window || (delete Cs.transitionstart.transition, delete xs.transitionend.transition);
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
  n(Cs, $r), n(xs, Fr);
}
typeof window < "u" && typeof document < "u" && QC();
function Nf(e, t, n) {
  e.addEventListener(t, n, !1);
}
function kf(e, t, n) {
  e.removeEventListener(t, n, !1);
}
var ZC = {
  // Start events
  startEvents: $r,
  addStartEventListener: function(t, n) {
    if ($r.length === 0) {
      setTimeout(n, 0);
      return;
    }
    $r.forEach(function(r) {
      Nf(t, r, n);
    });
  },
  removeStartEventListener: function(t, n) {
    $r.length !== 0 && $r.forEach(function(r) {
      kf(t, r, n);
    });
  },
  // End events
  endEvents: Fr,
  addEndEventListener: function(t, n) {
    if (Fr.length === 0) {
      setTimeout(n, 0);
      return;
    }
    Fr.forEach(function(r) {
      Nf(t, r, n);
    });
  },
  removeEndEventListener: function(t, n) {
    Fr.length !== 0 && Fr.forEach(function(r) {
      kf(t, r, n);
    });
  }
};
const So = ZC;
var Wn;
function Lf(e) {
  return !e || e.offsetParent === null;
}
function ex(e) {
  var t = (e || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
  return t && t[1] && t[2] && t[3] ? !(t[1] === t[2] && t[2] === t[3]) : !0;
}
const tx = tt({
  compatConfig: {
    MODE: 3
  },
  name: "Wave",
  props: {
    insertExtraNode: Boolean,
    disabled: Boolean
  },
  setup: function(t, n) {
    var r = n.slots, o = n.expose, a = fa(), c = wn("", t), d = c.csp, p = c.prefixCls;
    o({
      csp: d
    });
    var g = null, b = null, C = null, y = !1, T = null, w = !1, A = function(u) {
      if (!w) {
        var Y = qc(a);
        !u || u.target !== Y || y || z(Y);
      }
    }, I = function(u) {
      !u || u.animationName !== "fadeEffect" || z(u.target);
    }, P = function() {
      var u = t.insertExtraNode;
      return u ? "".concat(p.value, "-click-animating") : "".concat(p.value, "-click-animating-without-extra-node");
    }, j = function(u, Y) {
      var G = t.insertExtraNode, re = t.disabled;
      if (!(re || !u || Lf(u) || u.className.indexOf("-leave") >= 0)) {
        T = document.createElement("div"), T.className = "".concat(p.value, "-click-animating-node");
        var de = P();
        if (u.removeAttribute(de), u.setAttribute(de, "true"), Wn = Wn || document.createElement("style"), Y && Y !== "#ffffff" && Y !== "rgb(255, 255, 255)" && ex(Y) && !/rgba\(\d*, \d*, \d*, 0\)/.test(Y) && // any transparent rgba color
        Y !== "transparent") {
          var xe;
          (xe = d.value) !== null && xe !== void 0 && xe.nonce && (Wn.nonce = d.value.nonce), T.style.borderColor = Y, Wn.innerHTML = `
        [`.concat(p.value, "-click-animating-without-extra-node='true']::after, .").concat(p.value, `-click-animating-node {
          --antd-wave-shadow-color: `).concat(Y, `;
        }`), document.body.contains(Wn) || document.body.appendChild(Wn);
        }
        G && u.appendChild(T), So.addStartEventListener(u, A), So.addEndEventListener(u, I);
      }
    }, z = function(u) {
      if (!(!u || u === T || !(u instanceof Element))) {
        var Y = t.insertExtraNode, G = P();
        u.setAttribute(G, "false"), Wn && (Wn.innerHTML = ""), Y && T && u.contains(T) && u.removeChild(T), So.removeStartEventListener(u, A), So.removeEndEventListener(u, I);
      }
    }, Z = function(u) {
      if (!(!u || !u.getAttribute || u.getAttribute("disabled") || u.className.indexOf("disabled") >= 0)) {
        var Y = function(re) {
          if (!(re.target.tagName === "INPUT" || Lf(re.target))) {
            z(u);
            var de = getComputedStyle(u).getPropertyValue("border-top-color") || // Firefox Compatible
            getComputedStyle(u).getPropertyValue("border-color") || getComputedStyle(u).getPropertyValue("background-color");
            b = setTimeout(function() {
              return j(u, de);
            }, 0), qi.cancel(C), y = !0, C = qi(function() {
              y = !1;
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
    return Qt(function() {
      Mn(function() {
        var H = qc(a);
        H.nodeType === 1 && (g = Z(H));
      });
    }), In(function() {
      g && g.cancel(), clearTimeout(b), w = !0;
    }), function() {
      var H;
      return (H = r.default) === null || H === void 0 ? void 0 : H.call(r)[0];
    };
  }
});
function Rh(e) {
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
    icon: et.any,
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
}, Rf = function(t) {
  Mn(function() {
    t && (t.style.width = "".concat(t.scrollWidth, "px"), t.style.opacity = "1", t.style.transform = "scale(1)");
  });
}, If = function(t) {
  t && t.style && (t.style.width = null, t.style.opacity = null, t.style.transform = null);
};
const ix = tt({
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
        }, [L(tl, null, null)]);
      var a = !!o;
      return L(Qi, {
        name: "".concat(r, "-loading-icon-motion"),
        onBeforeEnter: Mf,
        onEnter: Rf,
        onAfterEnter: If,
        onBeforeLeave: Rf,
        onLeave: function(d) {
          setTimeout(function() {
            Mf(d);
          });
        },
        onAfterLeave: If
      }, {
        default: function() {
          return [a ? L("span", {
            class: "".concat(r, "-loading-icon")
          }, [L(tl, null, null)]) : null];
        }
      });
    };
  }
});
var jf = /^[\u4e00-\u9fa5]{2}$/, Df = jf.test.bind(jf);
function Oo(e) {
  return e === "text" || e === "link";
}
const Pn = tt({
  compatConfig: {
    MODE: 3
  },
  name: "AButton",
  inheritAttrs: !1,
  __ANT_BUTTON: !0,
  props: Zi(rx(), {
    type: "default"
  }),
  slots: ["icon"],
  // emits: ['click', 'mousedown'],
  setup: function(t, n) {
    var r = n.slots, o = n.attrs, a = n.emit, c = wn("btn", t), d = c.prefixCls, p = c.autoInsertSpaceInButton, g = c.direction, b = c.size, C = $e(null), y = $e(void 0), T = !1, w = $e(!1), A = $e(!1), I = Me(function() {
      return p.value !== !1;
    }), P = Me(function() {
      return er(t.loading) === "object" && t.loading.delay ? t.loading.delay || !0 : !!t.loading;
    });
    qt(P, function(u) {
      clearTimeout(y.value), typeof P.value == "number" ? y.value = setTimeout(function() {
        w.value = u;
      }, P.value) : w.value = u;
    }, {
      immediate: !0
    });
    var j = Me(function() {
      var u, Y = t.type, G = t.shape, re = G === void 0 ? "default" : G, de = t.ghost, xe = t.block, Q = t.danger, he = d.value, Re = {
        large: "lg",
        small: "sm",
        middle: void 0
      }, ie = b.value, B = ie && Re[ie] || "";
      return u = {}, _e(u, "".concat(he), !0), _e(u, "".concat(he, "-").concat(Y), Y), _e(u, "".concat(he, "-").concat(re), re !== "default" && re), _e(u, "".concat(he, "-").concat(B), B), _e(u, "".concat(he, "-loading"), w.value), _e(u, "".concat(he, "-background-ghost"), de && !Oo(Y)), _e(u, "".concat(he, "-two-chinese-chars"), A.value && I.value), _e(u, "".concat(he, "-block"), xe), _e(u, "".concat(he, "-dangerous"), !!Q), _e(u, "".concat(he, "-rtl"), g.value === "rtl"), u;
    }), z = function() {
      var Y = C.value;
      if (!(!Y || p.value === !1)) {
        var G = Y.textContent;
        T && Df(G) ? A.value || (A.value = !0) : A.value && (A.value = !1);
      }
    }, Z = function(Y) {
      if (w.value || t.disabled) {
        Y.preventDefault();
        return;
      }
      a("click", Y);
    }, H = function(Y, G) {
      var re = G ? " " : "";
      if (Y.type === Ji) {
        var de = Y.children.trim();
        return Df(de) && (de = de.split("").join(re)), L("span", null, [de]);
      }
      return Y;
    };
    return Ki(function() {
      Ah(!(t.ghost && Oo(t.type)), "Button", "`link` or `text` button can't be a `ghost` button.");
    }), Qt(z), Gi(z), In(function() {
      y.value && clearTimeout(y.value);
    }), function() {
      var u, Y, G = t.icon, re = G === void 0 ? (u = r.icon) === null || u === void 0 ? void 0 : u.call(r) : G, de = xr((Y = r.default) === null || Y === void 0 ? void 0 : Y.call(r));
      T = de.length === 1 && !re && !Oo(t.type);
      var xe = t.type, Q = t.htmlType, he = t.disabled, Re = t.href, ie = t.title, B = t.target, K = t.onMousedown, ae = w.value ? "loading" : re, ve = J(J({}, o), {}, {
        title: ie,
        disabled: he,
        class: [j.value, o.class, _e({}, "".concat(d.value, "-icon-only"), de.length === 0 && !!ae)],
        onClick: Z,
        onMousedown: K
      });
      he || delete ve.disabled;
      var ge = re && !w.value ? re : L(ix, {
        existIcon: !!re,
        prefixCls: d.value,
        loading: !!w.value
      }, null), Ae = de.map(function(je) {
        return H(je, T && I.value);
      });
      if (Re !== void 0)
        return L("a", J(J({}, ve), {}, {
          href: Re,
          target: B,
          ref: C
        }), [ge, Ae]);
      var We = L("button", J(J({}, ve), {}, {
        ref: C,
        type: Q
      }), [ge, Ae]);
      return Oo(xe) ? We : L(tx, {
        ref: "wave",
        disabled: !!w.value
      }, {
        default: function() {
          return [We];
        }
      });
    };
  }
});
function $f(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, _p(r.key), r);
  }
}
function Ih(e, t, n) {
  return t && $f(e.prototype, t), n && $f(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function jh(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
var ox = /* @__PURE__ */ Ih(function e(t) {
  jh(this, e), this.error = new Error("unreachable case: ".concat(JSON.stringify(t)));
}), ax = function() {
  return {
    prefixCls: String,
    size: {
      type: String
    }
  };
};
const ul = tt({
  compatConfig: {
    MODE: 3
  },
  name: "AButtonGroup",
  props: ax(),
  setup: function(t, n) {
    var r = n.slots, o = wn("btn-group", t), a = o.prefixCls, c = o.direction, d = Me(function() {
      var p, g = t.size, b = "";
      switch (g) {
        case "large":
          b = "lg";
          break;
        case "small":
          b = "sm";
          break;
        case "middle":
        case void 0:
          break;
        default:
          console.warn(new ox(g).error);
      }
      return p = {}, _e(p, "".concat(a.value), !0), _e(p, "".concat(a.value, "-").concat(b), b), _e(p, "".concat(a.value, "-rtl"), c.value === "rtl"), p;
    });
    return function() {
      var p;
      return L("div", {
        class: d.value
      }, [xr((p = r.default) === null || p === void 0 ? void 0 : p.call(r))]);
    };
  }
});
Pn.Group = ul;
Pn.install = function(e) {
  return e.component(Pn.name, Pn), e.component(ul.name, ul), e;
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
var Ff = 0 / 0, px = /^[-+]0x[0-9a-f]+$/i, hx = /^0b[01]+$/i, vx = /^0o[0-7]+$/i, gx = parseInt;
function Hf(e) {
  if (typeof e == "number")
    return e;
  if (lx(e))
    return Ff;
  if (ll(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ll(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = dx(e);
  var n = hx.test(e);
  return n || vx.test(e) ? gx(e.slice(2), n ? 2 : 8) : px.test(e) ? Ff : +e;
}
var Dh = function() {
  return Ca() && window.document.documentElement;
}, _o, mx = function() {
  if (!Dh())
    return !1;
  if (_o !== void 0)
    return _o;
  var t = document.createElement("div");
  return t.style.display = "flex", t.style.flexDirection = "column", t.style.rowGap = "1px", t.appendChild(document.createElement("div")), t.appendChild(document.createElement("div")), document.body.appendChild(t), _o = t.scrollHeight === 1, document.body.removeChild(t), _o;
};
const yx = function() {
  var e = $e(!1);
  return Qt(function() {
    e.value = mx();
  }), e;
};
var bx = function() {
  return Pp.Date.now();
};
const ws = bx;
var Cx = "Expected a function", xx = Math.max, wx = Math.min;
function Tx(e, t, n) {
  var r, o, a, c, d, p, g = 0, b = !1, C = !1, y = !0;
  if (typeof e != "function")
    throw new TypeError(Cx);
  t = Hf(t) || 0, ll(n) && (b = !!n.leading, C = "maxWait" in n, a = C ? xx(Hf(n.maxWait) || 0, t) : a, y = "trailing" in n ? !!n.trailing : y);
  function T(u) {
    var Y = r, G = o;
    return r = o = void 0, g = u, c = e.apply(G, Y), c;
  }
  function w(u) {
    return g = u, d = setTimeout(P, t), b ? T(u) : c;
  }
  function A(u) {
    var Y = u - p, G = u - g, re = t - Y;
    return C ? wx(re, a - G) : re;
  }
  function I(u) {
    var Y = u - p, G = u - g;
    return p === void 0 || Y >= t || Y < 0 || C && G >= a;
  }
  function P() {
    var u = ws();
    if (I(u))
      return j(u);
    d = setTimeout(P, A(u));
  }
  function j(u) {
    return d = void 0, y && r ? T(u) : (r = o = void 0, c);
  }
  function z() {
    d !== void 0 && clearTimeout(d), g = 0, r = p = o = d = void 0;
  }
  function Z() {
    return d === void 0 ? c : j(ws());
  }
  function H() {
    var u = ws(), Y = I(u);
    if (r = arguments, o = this, p = u, Y) {
      if (d === void 0)
        return w(p);
      if (C)
        return clearTimeout(d), d = setTimeout(P, t), T(p);
    }
    return d === void 0 && (d = setTimeout(P, t)), c;
  }
  return H.cancel = z, H.flush = Z, H;
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
}, Sx = tt({
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
      var y, T = t.type, w = t.dashed, A = t.plain, I = a.value;
      return y = {}, _e(y, I, !0), _e(y, "".concat(I, "-").concat(T), !0), _e(y, "".concat(I, "-dashed"), !!w), _e(y, "".concat(I, "-plain"), !!A), _e(y, "".concat(I, "-rtl"), c.value === "rtl"), _e(y, "".concat(I, "-no-default-orientation-margin-left"), d.value), _e(y, "".concat(I, "-no-default-orientation-margin-right"), p.value), y;
    }), b = Me(function() {
      var y = typeof t.orientationMargin == "number" ? "".concat(t.orientationMargin, "px") : t.orientationMargin;
      return J(J({}, d.value && {
        marginLeft: y
      }), p.value && {
        marginRight: y
      });
    }), C = Me(function() {
      return t.orientation.length > 0 ? "-" + t.orientation : t.orientation;
    });
    return function() {
      var y, T = xr((y = r.default) === null || y === void 0 ? void 0 : y.call(r));
      return L("div", {
        class: [g.value, T.length ? "".concat(a.value, "-with-text ").concat(a.value, "-with-text").concat(C.value) : ""],
        role: "separator"
      }, [T.length ? L("span", {
        class: "".concat(a.value, "-inner-text"),
        style: b.value
      }, [T]) : null]);
    };
  }
});
const Ox = ma(Sx);
var Ts;
function $h(e) {
  if (typeof document > "u")
    return 0;
  if (e || Ts === void 0) {
    var t = document.createElement("div");
    t.style.width = "100%", t.style.height = "200px";
    var n = document.createElement("div"), r = n.style;
    r.position = "absolute", r.top = "0", r.left = "0", r.pointerEvents = "none", r.visibility = "hidden", r.width = "200px", r.height = "150px", r.overflow = "hidden", n.appendChild(t), document.body.appendChild(n);
    var o = t.offsetWidth;
    n.style.overflow = "scroll";
    var a = t.offsetWidth;
    o === a && (a = n.clientWidth), document.body.removeChild(n), Ts = o - a;
  }
  return Ts;
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
var Es = {};
const Bf = function(e) {
  if (!(!_x() && !e)) {
    var t = "ant-scrolling-effect", n = new RegExp("".concat(t), "g"), r = document.body.className;
    if (e) {
      if (!n.test(r))
        return;
      ei(Es), Es = {}, document.body.className = r.replace(n, "").trim();
      return;
    }
    var o = $h();
    if (o && (Es = ei({
      position: "relative",
      width: "calc(100% - ".concat(o, "px)")
    }), !n.test(r))) {
      var a = "".concat(r, " ").concat(t);
      document.body.className = a.trim();
    }
  }
};
var Kt = [], Fh = "ant-scrolling-effect", Ss = new RegExp("".concat(Fh), "g"), Ax = 0, Os = /* @__PURE__ */ new Map(), Px = /* @__PURE__ */ Ih(function e(t) {
  var n = this;
  jh(this, e), _e(this, "getContainer", function() {
    var r;
    return (r = n.options) === null || r === void 0 ? void 0 : r.container;
  }), _e(this, "reLock", function(r) {
    var o = Kt.find(function(a) {
      var c = a.target;
      return c === n.lockTarget;
    });
    o && n.unLock(), n.options = r, o && (o.options = r, n.lock());
  }), _e(this, "lock", function() {
    var r;
    if (!Kt.some(function(p) {
      var g = p.target;
      return g === n.lockTarget;
    })) {
      if (Kt.some(function(p) {
        var g, b = p.options;
        return (b == null ? void 0 : b.container) === ((g = n.options) === null || g === void 0 ? void 0 : g.container);
      })) {
        Kt = [].concat(Jr(Kt), [{
          target: n.lockTarget,
          options: n.options
        }]);
        return;
      }
      var o = 0, a = ((r = n.options) === null || r === void 0 ? void 0 : r.container) || document.body;
      (a === document.body && window.innerWidth - document.documentElement.clientWidth > 0 || a.scrollHeight > a.clientHeight) && (o = $h());
      var c = a.className;
      if (Kt.filter(function(p) {
        var g, b = p.options;
        return (b == null ? void 0 : b.container) === ((g = n.options) === null || g === void 0 ? void 0 : g.container);
      }).length === 0 && Os.set(a, ei({
        width: o !== 0 ? "calc(100% - ".concat(o, "px)") : void 0,
        overflow: "hidden",
        overflowX: "hidden",
        overflowY: "hidden"
      }, {
        element: a
      })), !Ss.test(c)) {
        var d = "".concat(c, " ").concat(Fh);
        a.className = d.trim();
      }
      Kt = [].concat(Jr(Kt), [{
        target: n.lockTarget,
        options: n.options
      }]);
    }
  }), _e(this, "unLock", function() {
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
      Ss.test(c) && (ei(Os.get(a), {
        element: a
      }), Os.delete(a), a.className = a.className.replace(Ss, "").trim());
    }
  }), this.lockTarget = Ax++, this.options = t;
}), On = 0, _i = Ca(), Ao = {}, Rr = function(t) {
  if (!_i)
    return null;
  if (t) {
    if (typeof t == "string")
      return document.querySelectorAll(t)[0];
    if (typeof t == "function")
      return t();
    if (er(t) === "object" && t instanceof window.HTMLElement)
      return t;
  }
  return document.body;
};
const Nx = tt({
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
    getContainer: et.any,
    visible: {
      type: Boolean,
      default: void 0
    }
  },
  setup: function(t, n) {
    var r = n.slots, o = $e(), a = $e(), c = $e(), d = new Px({
      container: Rr(t.getContainer)
    }), p = function() {
      var A, I;
      (A = o.value) === null || A === void 0 || (I = A.parentNode) === null || I === void 0 || I.removeChild(o.value);
    }, g = function() {
      var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
      if (A || o.value && !o.value.parentNode) {
        var I = Rr(t.getContainer);
        return I ? (I.appendChild(o.value), !0) : !1;
      }
      return !0;
    }, b = function() {
      return _i ? (o.value || (o.value = document.createElement("div"), g(!0)), C(), o.value) : null;
    }, C = function() {
      var A = t.wrapperClassName;
      o.value && A && A !== o.value.className && (o.value.className = A);
    };
    Gi(function() {
      C(), g();
    });
    var y = function() {
      On === 1 && !Object.keys(Ao).length ? (Bf(), Ao = ei({
        overflow: "hidden",
        overflowX: "hidden",
        overflowY: "hidden"
      })) : On || (ei(Ao), Ao = {}, Bf(!0));
    }, T = fa();
    return Qt(function() {
      var w = !1;
      qt([function() {
        return t.visible;
      }, function() {
        return t.getContainer;
      }], function(A, I) {
        var P = wr(A, 2), j = P[0], z = P[1], Z = wr(I, 2), H = Z[0], u = Z[1];
        if (_i && Rr(t.getContainer) === document.body && (j && !H ? On += 1 : w && (On -= 1)), w) {
          var Y = typeof z == "function" && typeof u == "function";
          (Y ? z.toString() !== u.toString() : z !== u) && p(), j && j !== H && _i && Rr(z) !== d.getContainer() && d.reLock({
            container: Rr(z)
          });
        }
        w = !0;
      }, {
        immediate: !0,
        flush: "post"
      }), Mn(function() {
        g() || (c.value = qi(function() {
          T.update();
        }));
      });
    }), In(function() {
      var w = t.visible, A = t.getContainer;
      _i && Rr(A) === document.body && (On = w && On ? On - 1 : On), p(), qi.cancel(c.value);
    }), function() {
      var w = t.forceRender, A = t.visible, I = null, P = {
        getOpenCount: function() {
          return On;
        },
        getContainer: b,
        switchScrollingEffect: y,
        scrollLocker: d
      };
      return (w || A || a.value) && (I = L(YC, {
        getContainer: b,
        ref: a
      }, {
        default: function() {
          var z;
          return (z = r.default) === null || z === void 0 ? void 0 : z.call(r, P);
        }
      })), I;
    };
  }
});
function tu() {
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
    mousePosition: et.shape({
      x: Number,
      y: Number
    }).loose,
    title: et.any,
    footer: et.any,
    transitionName: String,
    maskTransitionName: String,
    animation: et.any,
    maskAnimation: et.any,
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
    bodyProps: et.any,
    maskProps: et.any,
    wrapProps: et.any,
    getContainer: et.any,
    dialogStyle: {
      type: Object,
      default: void 0
    },
    dialogClass: String,
    closeIcon: et.any,
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
function Wf(e, t, n) {
  var r = t;
  return !r && n && (r = "".concat(e, "-").concat(n)), r;
}
var Uf = -1;
function kx() {
  return Uf += 1, Uf;
}
function qf(e, t) {
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
  return n.left += qf(o), n.top += qf(o, !0), n;
}
var zf = {
  width: 0,
  height: 0,
  overflow: "hidden",
  outline: "none"
};
const Mx = tt({
  compatConfig: {
    MODE: 3
  },
  name: "Content",
  inheritAttrs: !1,
  props: J(J({}, tu()), {}, {
    motionName: String,
    ariaId: String,
    onVisibleChanged: Function,
    onMousedown: Function,
    onMouseup: Function
  }),
  setup: function(t, n) {
    var r = n.expose, o = n.slots, a = n.attrs, c = $e(), d = $e(), p = $e();
    r({
      focus: function() {
        var w;
        (w = c.value) === null || w === void 0 || w.focus();
      },
      changeActive: function(w) {
        var A = document, I = A.activeElement;
        w && I === d.value ? c.value.focus() : !w && I === c.value && d.value.focus();
      }
    });
    var g = $e(), b = Me(function() {
      var T = t.width, w = t.height, A = {};
      return T !== void 0 && (A.width = typeof T == "number" ? "".concat(T, "px") : T), w !== void 0 && (A.height = typeof w == "number" ? "".concat(w, "px") : w), g.value && (A.transformOrigin = g.value), A;
    }), C = function() {
      Mn(function() {
        if (p.value) {
          var w = Lx(p.value);
          g.value = t.mousePosition ? "".concat(t.mousePosition.x - w.left, "px ").concat(t.mousePosition.y - w.top, "px") : "";
        }
      });
    }, y = function(w) {
      t.onVisibleChanged(w);
    };
    return function() {
      var T, w, A, I, P = t.prefixCls, j = t.footer, z = j === void 0 ? (T = o.footer) === null || T === void 0 ? void 0 : T.call(o) : j, Z = t.title, H = Z === void 0 ? (w = o.title) === null || w === void 0 ? void 0 : w.call(o) : Z, u = t.ariaId, Y = t.closable, G = t.closeIcon, re = G === void 0 ? (A = o.closeIcon) === null || A === void 0 ? void 0 : A.call(o) : G, de = t.onClose, xe = t.bodyStyle, Q = t.bodyProps, he = t.onMousedown, Re = t.onMouseup, ie = t.visible, B = t.modalRender, K = B === void 0 ? o.modalRender : B, ae = t.destroyOnClose, ve = t.motionName, ge;
      z && (ge = L("div", {
        class: "".concat(P, "-footer")
      }, [z]));
      var Ae;
      H && (Ae = L("div", {
        class: "".concat(P, "-header")
      }, [L("div", {
        class: "".concat(P, "-title"),
        id: u
      }, [H])]));
      var We;
      Y && (We = L("button", {
        type: "button",
        onClick: de,
        "aria-label": "Close",
        class: "".concat(P, "-close")
      }, [re || L("span", {
        class: "".concat(P, "-close-x")
      }, null)]));
      var je = L("div", {
        class: "".concat(P, "-content")
      }, [We, Ae, L("div", J({
        class: "".concat(P, "-body"),
        style: xe
      }, Q), [(I = o.default) === null || I === void 0 ? void 0 : I.call(o)]), ge]), ut = eh(ve);
      return L(Qi, J(J({}, ut), {}, {
        onBeforeEnter: C,
        onAfterEnter: function() {
          return y(!0);
        },
        onAfterLeave: function() {
          return y(!1);
        }
      }), {
        default: function() {
          return [ie || !ae ? Dd(L("div", J(J({}, a), {}, {
            ref: p,
            key: "dialog-element",
            role: "document",
            style: [b.value, a.style],
            class: [P, a.class],
            onMousedown: he,
            onMouseup: Re
          }), [L("div", {
            tabindex: 0,
            ref: c,
            style: zf,
            "aria-hidden": "true"
          }, null), K ? K({
            originVNode: je
          }) : je, L("div", {
            tabindex: 0,
            ref: d,
            style: zf,
            "aria-hidden": "true"
          }, null)]), [[op, ie]]) : null];
        }
      });
    };
  }
});
function Rx(e) {
  if (e == null)
    throw new TypeError("Cannot destructure " + e);
}
const Ix = tt({
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
    return Rx(n), function() {
      var r = t.prefixCls, o = t.visible, a = t.maskProps, c = t.motionName, d = eh(c);
      return L(Qi, d, {
        default: function() {
          return [Dd(L("div", J({
            class: "".concat(r, "-mask")
          }, a), null), [[op, o]])];
        }
      });
    };
  }
}), Yf = tt({
  compatConfig: {
    MODE: 3
  },
  name: "Dialog",
  inheritAttrs: !1,
  props: Zi(J(J({}, tu()), {}, {
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
    var r = n.attrs, o = n.slots, a = $e(), c = $e(), d = $e(), p = $e(t.visible), g = $e("vcDialogTitle".concat(kx())), b = function(z) {
      if (z) {
        if (!qC(c.value, document.activeElement)) {
          var Z;
          a.value = document.activeElement, (Z = d.value) === null || Z === void 0 || Z.focus();
        }
      } else {
        var H = p.value;
        if (p.value = !1, t.mask && a.value && t.focusTriggerAfterClose) {
          try {
            a.value.focus({
              preventScroll: !0
            });
          } catch {
          }
          a.value = null;
        }
        if (H) {
          var u;
          (u = t.afterClose) === null || u === void 0 || u.call(t);
        }
      }
    }, C = function(z) {
      var Z;
      (Z = t.onClose) === null || Z === void 0 || Z.call(t, z);
    }, y = $e(!1), T = $e(), w = function() {
      clearTimeout(T.value), y.value = !0;
    }, A = function() {
      T.value = setTimeout(function() {
        y.value = !1;
      });
    }, I = function(z) {
      if (!t.maskClosable)
        return null;
      y.value ? y.value = !1 : c.value === z.target && C(z);
    }, P = function(z) {
      if (t.keyboard && z.keyCode === _f.ESC) {
        z.stopPropagation(), C(z);
        return;
      }
      t.visible && z.keyCode === _f.TAB && d.value.changeActive(!z.shiftKey);
    };
    return qt(function() {
      return t.visible;
    }, function() {
      t.visible && (p.value = !0);
    }, {
      flush: "post"
    }), In(function() {
      var j;
      clearTimeout(T.value), (j = t.scrollLocker) === null || j === void 0 || j.unLock();
    }), Ki(function() {
      var j;
      if ((j = t.scrollLocker) === null || j === void 0 || j.unLock(), p.value) {
        var z;
        (z = t.scrollLocker) === null || z === void 0 || z.lock();
      }
    }), function() {
      var j = t.prefixCls, z = t.mask, Z = t.visible, H = t.maskTransitionName, u = t.maskAnimation, Y = t.zIndex, G = t.wrapClassName, re = t.rootClassName, de = t.wrapStyle, xe = t.closable, Q = t.maskProps, he = t.maskStyle, Re = t.transitionName, ie = t.animation, B = t.wrapProps, K = t.title, ae = K === void 0 ? o.title : K, ve = r.style, ge = r.class;
      return L("div", J({
        class: ["".concat(j, "-root"), re]
      }, JC(t, {
        data: !0
      })), [L(Ix, {
        prefixCls: j,
        visible: z && Z,
        motionName: Wf(j, H, u),
        style: J({
          zIndex: Y
        }, he),
        maskProps: Q
      }, null), L("div", J({
        tabIndex: -1,
        onKeydown: P,
        class: Cn("".concat(j, "-wrap"), G),
        ref: c,
        onClick: I,
        role: "dialog",
        "aria-labelledby": ae ? g.value : null,
        style: J(J({
          zIndex: Y
        }, de), {}, {
          display: p.value ? null : "none"
        })
      }, B), [L(Mx, J(J({}, kh(t, ["scrollLocker"])), {}, {
        style: ve,
        class: ge,
        onMousedown: w,
        onMouseup: A,
        ref: d,
        closable: xe,
        ariaId: g.value,
        prefixCls: j,
        visible: Z,
        onClose: C,
        onVisibleChanged: b,
        motionName: Wf(j, Re, ie)
      }), o)])]);
    };
  }
});
var jx = tu(), Dx = tt({
  compatConfig: {
    MODE: 3
  },
  name: "DialogWrap",
  inheritAttrs: !1,
  props: Zi(jx, {
    visible: !1
  }),
  setup: function(t, n) {
    var r = n.attrs, o = n.slots, a = $e(t.visible);
    return Mh({}, {
      inTriggerContext: !1
    }), qt(function() {
      return t.visible;
    }, function() {
      t.visible && (a.value = !0);
    }, {
      flush: "post"
    }), function() {
      var c = t.visible, d = t.getContainer, p = t.forceRender, g = t.destroyOnClose, b = g === void 0 ? !1 : g, C = t.afterClose, y = J(J(J({}, t), r), {}, {
        ref: "_component",
        key: "dialog"
      });
      return d === !1 ? L(Yf, J(J({}, y), {}, {
        getOpenCount: function() {
          return 2;
        }
      }), o) : !p && b && !a.value ? null : L(Nx, {
        visible: c,
        forceRender: p,
        getContainer: d
      }, {
        default: function(w) {
          return y = J(J(J({}, y), w), {}, {
            afterClose: function() {
              C == null || C(), a.value = !1;
            }
          }), L(Yf, y, o);
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
    tip: et.any,
    delay: Number,
    indicator: et.any
  };
}, Fo = null;
function Bx(e, t) {
  return !!e && !!t && !isNaN(Number(t));
}
function Wx(e) {
  var t = e.indicator;
  Fo = typeof t == "function" ? t : function() {
    return L(t, null, null);
  };
}
const Ri = tt({
  compatConfig: {
    MODE: 3
  },
  name: "ASpin",
  inheritAttrs: !1,
  props: Zi(Hx(), {
    size: "default",
    spinning: !0,
    wrapperClassName: ""
  }),
  setup: function() {
    return {
      originalUpdateSpinning: null,
      configProvider: Jn("configProvider", Nh)
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
    Mn(function() {
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
      return r === null ? null : (Array.isArray(r) && (r = r.length === 1 ? r[0] : r), Zn(r) ? bn(r, {
        class: n
      }) : Fo && Zn(Fo()) ? bn(Fo(), {
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
    var t, n, r, o = this.$props, a = o.size, c = o.prefixCls, d = o.tip, p = d === void 0 ? (t = (n = this.$slots).tip) === null || t === void 0 ? void 0 : t.call(n) : d, g = o.wrapperClassName, b = this.$attrs, C = b.class, y = b.style, T = ya(b, Fx), w = this.configProvider, A = w.getPrefixCls, I = w.direction, P = A("spin", c), j = this.sSpinning, z = (r = {}, _e(r, P, !0), _e(r, "".concat(P, "-sm"), a === "small"), _e(r, "".concat(P, "-lg"), a === "large"), _e(r, "".concat(P, "-spinning"), j), _e(r, "".concat(P, "-show-text"), !!p), _e(r, "".concat(P, "-rtl"), I === "rtl"), _e(r, C, !!C), r), Z = L("div", J(J({}, T), {}, {
      style: y,
      class: z
    }), [this.renderIndicator(P), p ? L("div", {
      class: "".concat(P, "-text")
    }, [p]) : null]), H = o0(this);
    if (H && H.length) {
      var u, Y = (u = {}, _e(u, "".concat(P, "-container"), !0), _e(u, "".concat(P, "-blur"), j), u);
      return L("div", {
        class: ["".concat(P, "-nested-loading"), g]
      }, [j && L("div", {
        key: "loading"
      }, [Z]), L("div", {
        class: Y,
        key: "container"
      }, [H])]);
    }
    return Z;
  }
});
Ri.setDefaultIndicator = Wx;
Ri.install = function(e) {
  return e.component(Ri.name, Ri), e;
};
var Ux = ["prefixCls", "visible", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose"], cl = null, qx = function(t) {
  cl = {
    x: t.pageX,
    y: t.pageY
  }, setTimeout(function() {
    return cl = null;
  }, 100);
};
Dh() && l0(document.documentElement, "click", qx, !0);
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
    title: et.any,
    closable: {
      type: Boolean,
      default: void 0
    },
    closeIcon: et.any,
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
    footer: et.any,
    okText: et.any,
    okType: String,
    cancelText: et.any,
    icon: et.any,
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
}, Br = [];
const Jt = tt({
  compatConfig: {
    MODE: 3
  },
  name: "AModal",
  inheritAttrs: !1,
  props: Zi(zx(), {
    width: 520,
    transitionName: "zoom",
    maskTransitionName: "fade",
    confirmLoading: !1,
    visible: !1,
    okType: "primary"
  }),
  setup: function(t, n) {
    var r = n.emit, o = n.slots, a = n.attrs, c = $p("Modal"), d = wr(c, 1), p = d[0], g = wn("modal", t), b = g.prefixCls, C = g.rootPrefixCls, y = g.direction, T = g.getPopupContainer, w = function(j) {
      r("update:visible", !1), r("cancel", j), r("change", !1);
    }, A = function(j) {
      r("ok", j);
    }, I = function() {
      var j, z, Z = t.okText, H = Z === void 0 ? (j = o.okText) === null || j === void 0 ? void 0 : j.call(o) : Z, u = t.okType, Y = t.cancelText, G = Y === void 0 ? (z = o.cancelText) === null || z === void 0 ? void 0 : z.call(o) : Y, re = t.confirmLoading;
      return L(dt, null, [L(Pn, J({
        onClick: w
      }, t.cancelButtonProps), {
        default: function() {
          return [G || p.value.cancelText];
        }
      }), L(Pn, J(J({}, Rh(u)), {}, {
        loading: re,
        onClick: A
      }, t.okButtonProps), {
        default: function() {
          return [H || p.value.okText];
        }
      })]);
    };
    return function() {
      var P, j;
      t.prefixCls;
      var z = t.visible, Z = t.wrapClassName, H = t.centered, u = t.getContainer, Y = t.closeIcon, G = Y === void 0 ? (P = o.closeIcon) === null || P === void 0 ? void 0 : P.call(o) : Y, re = t.focusTriggerAfterClose, de = re === void 0 ? !0 : re, xe = ya(t, Ux), Q = Cn(Z, (j = {}, _e(j, "".concat(b.value, "-centered"), !!H), _e(j, "".concat(b.value, "-wrap-rtl"), y.value === "rtl"), j));
      return L($x, J(J(J({}, xe), a), {}, {
        getContainer: u || T.value,
        prefixCls: b.value,
        wrapClassName: Q,
        visible: z,
        mousePosition: cl,
        onClose: w,
        focusTriggerAfterClose: de,
        transitionName: Qo(C.value, "zoom", t.transitionName),
        maskTransitionName: Qo(C.value, "fade", t.maskTransitionName)
      }), J(J({}, o), {}, {
        footer: o.footer || I,
        closeIcon: function() {
          return L("span", {
            class: "".concat(b.value, "-close-x")
          }, [G || L(bh, {
            class: "".concat(b.value, "-close-icon")
          }, null)]);
        }
      }));
    };
  }
});
var Yx = function() {
  var t = $e(!1);
  return In(function() {
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
function Xf(e) {
  return !!(e && e.then);
}
const Vf = tt({
  compatConfig: {
    MODE: 3
  },
  name: "ActionButton",
  props: Vx,
  setup: function(t, n) {
    var r = n.slots, o = $e(!1), a = $e(), c = $e(!1), d, p = Xx();
    Qt(function() {
      t.autofocus && (d = setTimeout(function() {
        var C;
        return (C = a.value.$el) === null || C === void 0 ? void 0 : C.focus();
      }));
    }), In(function() {
      clearTimeout(d);
    });
    var g = function(y) {
      var T = t.close;
      Xf(y) && (c.value = !0, y.then(function() {
        p.value || (c.value = !1), T.apply(void 0, arguments), o.value = !1;
      }, function(w) {
        console.error(w), p.value || (c.value = !1), o.value = !1;
      }));
    }, b = function(y) {
      var T = t.actionFn, w = t.close, A = w === void 0 ? function() {
      } : w;
      if (!o.value) {
        if (o.value = !0, !T) {
          A();
          return;
        }
        var I;
        if (t.emitEvent) {
          if (I = T(y), t.quitOnNullishReturnValue && !Xf(I)) {
            o.value = !1, A(y);
            return;
          }
        } else if (T.length)
          I = T(A), o.value = !1;
        else if (I = T(), !I) {
          A();
          return;
        }
        g(I);
      }
    };
    return function() {
      var C = t.type, y = t.prefixCls, T = t.buttonProps;
      return L(Pn, J(J(J({}, Rh(C)), {}, {
        onClick: b,
        loading: c.value,
        prefixCls: y
      }, T), {}, {
        ref: a
      }), r);
    };
  }
});
function Ti(e) {
  return typeof e == "function" ? e() : e;
}
const Kx = tt({
  name: "ConfirmDialog",
  inheritAttrs: !1,
  props: ["icon", "onCancel", "onOk", "close", "closable", "zIndex", "afterClose", "visible", "keyboard", "centered", "getContainer", "maskStyle", "okButtonProps", "cancelButtonProps", "okType", "prefixCls", "okCancel", "width", "mask", "maskClosable", "okText", "cancelText", "autoFocusButton", "transitionName", "maskTransitionName", "type", "title", "content", "direction", "rootPrefixCls", "bodyStyle", "closeIcon", "modalRender", "focusTriggerAfterClose", "wrapClassName"],
  setup: function(t, n) {
    var r = n.attrs, o = $p("Modal"), a = wr(o, 1), c = a[0];
    return function() {
      var d = t.icon, p = t.onCancel, g = t.onOk, b = t.close, C = t.closable, y = C === void 0 ? !1 : C, T = t.zIndex, w = t.afterClose, A = t.visible, I = t.keyboard, P = t.centered, j = t.getContainer, z = t.maskStyle, Z = t.okButtonProps, H = t.cancelButtonProps, u = t.okCancel, Y = u === void 0 ? !0 : u, G = t.width, re = G === void 0 ? 416 : G, de = t.mask, xe = de === void 0 ? !0 : de, Q = t.maskClosable, he = Q === void 0 ? !1 : Q, Re = t.type, ie = t.title, B = t.content, K = t.direction, ae = t.closeIcon, ve = t.modalRender, ge = t.focusTriggerAfterClose, Ae = t.rootPrefixCls, We = t.bodyStyle, je = t.wrapClassName, ut = t.okType || "primary", at = t.prefixCls || "ant-modal", ot = "".concat(at, "-confirm"), wt = r.style || {}, en = Ti(t.okText) || (Y ? c.value.okText : c.value.justOkText), Ot = Ti(t.cancelText) || c.value.cancelText, tn = t.autoFocusButton === null ? !1 : t.autoFocusButton || "ok", tr = Cn(ot, "".concat(ot, "-").concat(Re), "".concat(at, "-").concat(Re), _e({}, "".concat(ot, "-rtl"), K === "rtl"), r.class), nr = Y && L(Vf, {
        actionFn: p,
        close: b,
        autofocus: tn === "cancel",
        buttonProps: H,
        prefixCls: "".concat(Ae, "-btn")
      }, {
        default: function() {
          return [Ot];
        }
      });
      return L(Jt, {
        prefixCls: at,
        class: tr,
        wrapClassName: Cn(_e({}, "".concat(ot, "-centered"), !!P), je),
        onCancel: function(k) {
          return b({
            triggerCancel: !0
          }, k);
        },
        visible: A,
        title: "",
        footer: "",
        transitionName: Qo(Ae, "zoom", t.transitionName),
        maskTransitionName: Qo(Ae, "fade", t.maskTransitionName),
        mask: xe,
        maskClosable: he,
        maskStyle: z,
        style: wt,
        bodyStyle: We,
        width: re,
        zIndex: T,
        afterClose: w,
        keyboard: I,
        centered: P,
        getContainer: j,
        closable: y,
        closeIcon: ae,
        modalRender: ve,
        focusTriggerAfterClose: ge
      }, {
        default: function() {
          return [L("div", {
            class: "".concat(ot, "-body-wrapper")
          }, [L("div", {
            class: "".concat(ot, "-body")
          }, [Ti(d), ie === void 0 ? null : L("span", {
            class: "".concat(ot, "-title")
          }, [Ti(ie)]), L("div", {
            class: "".concat(ot, "-content")
          }, [Ti(B)])]), L("div", {
            class: "".concat(ot, "-btns")
          }, [nr, L(Vf, {
            type: ut,
            actionFn: g,
            close: b,
            autofocus: tn === "ok",
            buttonProps: Z,
            prefixCls: "".concat(Ae, "-btn")
          }, {
            default: function() {
              return [en];
            }
          })])])];
        }
      });
    };
  }
});
var Gx = function(t) {
  var n = document.createDocumentFragment(), r = J(J({}, kh(t, ["parentContext", "appContext"])), {}, {
    close: c,
    visible: !0
  }), o = null;
  function a() {
    o && (Yo(null, n), o.component.update(), o = null);
    for (var b = arguments.length, C = new Array(b), y = 0; y < b; y++)
      C[y] = arguments[y];
    var T = C.some(function(I) {
      return I && I.triggerCancel;
    });
    t.onCancel && T && t.onCancel.apply(t, C);
    for (var w = 0; w < Br.length; w++) {
      var A = Br[w];
      if (A === c) {
        Br.splice(w, 1);
        break;
      }
    }
  }
  function c() {
    for (var b = this, C = arguments.length, y = new Array(C), T = 0; T < C; T++)
      y[T] = arguments[T];
    r = J(J({}, r), {}, {
      visible: !1,
      afterClose: function() {
        typeof t.afterClose == "function" && t.afterClose(), a.apply(b, y);
      }
    }), d(r);
  }
  function d(b) {
    typeof b == "function" ? r = b(r) : r = J(J({}, r), b), o && (kn(o.component.props, r), o.component.update());
  }
  var p = function(C) {
    var y = kt, T = y.prefixCls, w = C.prefixCls || "".concat(T, "-modal");
    return L(Yr, J(J({}, y), {}, {
      notUpdateGlobalConfig: !0,
      prefixCls: T
    }), {
      default: function() {
        return [L(Kx, J(J({}, C), {}, {
          rootPrefixCls: T,
          prefixCls: w
        }), null)];
      }
    });
  };
  function g(b) {
    var C = L(p, J({}, b));
    return C.appContext = t.parentContext || t.appContext || C.appContext, Yo(C, n), C;
  }
  return o = g(r), Br.push(c), {
    destroy: c,
    update: d
  };
};
const eo = Gx;
function Jx(e) {
  return J(J({
    icon: function() {
      return L(Ql, null, null);
    },
    okCancel: !1
  }, e), {}, {
    type: "warning"
  });
}
function Qx(e) {
  return J(J({
    icon: function() {
      return L(mh, null, null);
    },
    okCancel: !1
  }, e), {}, {
    type: "info"
  });
}
function Zx(e) {
  return J(J({
    icon: function() {
      return L(gh, null, null);
    },
    okCancel: !1
  }, e), {}, {
    type: "success"
  });
}
function ew(e) {
  return J(J({
    icon: function() {
      return L(yh, null, null);
    },
    okCancel: !1
  }, e), {}, {
    type: "error"
  });
}
function tw(e) {
  return J(J({
    icon: function() {
      return L(Ql, null, null);
    },
    okCancel: !0
  }, e), {}, {
    type: "confirm"
  });
}
function Hh(e) {
  return eo(Jx(e));
}
Jt.info = function(t) {
  return eo(Qx(t));
};
Jt.success = function(t) {
  return eo(Zx(t));
};
Jt.error = function(t) {
  return eo(ew(t));
};
Jt.warning = Hh;
Jt.warn = Hh;
Jt.confirm = function(t) {
  return eo(tw(t));
};
Jt.destroyAll = function() {
  for (; Br.length; ) {
    var t = Br.pop();
    t && t();
  }
};
Jt.install = function(e) {
  return e.component(Jt.name, Jt), e;
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
    direction: et.oneOf(Xs("horizontal", "vertical")).def("horizontal"),
    align: et.oneOf(Xs("start", "end", "center", "baseline")),
    wrap: {
      type: Boolean,
      default: void 0
    }
  };
};
function iw(e) {
  return typeof e == "string" ? nw[e] : e || 0;
}
var ow = tt({
  compatConfig: {
    MODE: 3
  },
  name: "ASpace",
  props: rw(),
  slots: ["split"],
  setup: function(t, n) {
    var r = n.slots, o = wn("space", t), a = o.prefixCls, c = o.space, d = o.direction, p = yx(), g = Me(function() {
      var I, P, j;
      return (I = (P = t.size) !== null && P !== void 0 ? P : (j = c.value) === null || j === void 0 ? void 0 : j.size) !== null && I !== void 0 ? I : "small";
    }), b = $e(), C = $e();
    qt(g, function() {
      var I = (Array.isArray(g.value) ? g.value : [g.value, g.value]).map(function(j) {
        return iw(j);
      }), P = wr(I, 2);
      b.value = P[0], C.value = P[1];
    }, {
      immediate: !0
    });
    var y = Me(function() {
      return t.align === void 0 && t.direction === "horizontal" ? "center" : t.align;
    }), T = Me(function() {
      var I;
      return Cn(a.value, "".concat(a.value, "-").concat(t.direction), (I = {}, _e(I, "".concat(a.value, "-rtl"), d.value === "rtl"), _e(I, "".concat(a.value, "-align-").concat(y.value), y.value), I));
    }), w = Me(function() {
      return d.value === "rtl" ? "marginLeft" : "marginRight";
    }), A = Me(function() {
      var I = {};
      return p.value && (I.columnGap = "".concat(b.value, "px"), I.rowGap = "".concat(C.value, "px")), J(J({}, I), t.wrap && {
        flexWrap: "wrap",
        marginBottom: "".concat(-C.value, "px")
      });
    });
    return function() {
      var I, P, j = t.wrap, z = t.direction, Z = z === void 0 ? "horizontal" : z, H = Fl((I = r.default) === null || I === void 0 ? void 0 : I.call(r)), u = H.length;
      if (u === 0)
        return null;
      var Y = (P = r.split) === null || P === void 0 ? void 0 : P.call(r), G = "".concat(a.value, "-item"), re = b.value, de = u - 1;
      return L("div", {
        class: T.value,
        style: A.value
      }, [H.map(function(xe, Q) {
        var he = {};
        return p.value || (Z === "vertical" ? Q < de && (he = {
          marginBottom: "".concat(re / (Y ? 2 : 1), "px")
        }) : he = J(J({}, Q < de && _e({}, w.value, "".concat(re / (Y ? 2 : 1), "px"))), j && {
          paddingBottom: "".concat(C.value, "px")
        })), L(dt, null, [L("div", {
          class: G,
          style: he
        }, [xe]), Q < de && Y && L("span", {
          class: "".concat(G, "-split"),
          style: he
        }, [Y])]);
      })]);
    };
  }
});
const aw = ma(ow);
const Er = $e([]);
function sw() {
  Mn(() => {
    const e = Array.from(document.querySelectorAll(".reply-dialog"));
    e.length > 0 && e.pop().focus();
  });
}
const Bh = (e, t) => {
  Er.value.push({
    tid: e,
    pid: t
  });
}, lw = (e) => {
  const t = Er.value.findIndex((n) => n.pid === e);
  Er.value.splice(t, 1), sw();
}, uw = () => {
  Er.value = [];
}, cw = Me(() => Er.value.length > 1);
var fw = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" } }] }, name: "like", theme: "outlined" };
const dw = fw;
function Kf(e) {
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
var nu = function(t, n) {
  var r = Kf({}, t, n.attrs);
  return L(Zt, Kf({}, r, {
    icon: dw
  }), null);
};
nu.displayName = "LikeOutlined";
nu.inheritAttrs = !1;
const hw = nu;
var vw = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z" } }] }, name: "message", theme: "outlined" };
const gw = vw;
function Gf(e) {
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
var ru = function(t, n) {
  var r = Gf({}, t, n.attrs);
  return L(Zt, Gf({}, r, {
    icon: gw
  }), null);
};
ru.displayName = "MessageOutlined";
ru.inheritAttrs = !1;
const yw = ru, Jf = /* @__PURE__ */ tt({
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
    } = e, n = $e(), r = Me(() => "//my.hupu.com/" + t.puid);
    function o() {
      t.check_reply_info && t.check_reply_info.num > 0 && Bh(e.tid, t.pid);
    }
    return Qt(() => {
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
function Lt(e, t) {
  for (var n in t) {
    var r = t[n];
    typeof r == "number" && (r = r + "px"), e.style[n] = r;
  }
  return e;
}
function Po(e) {
  var t = document.createElement("div");
  return t.className = e, t;
}
var Qf = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function Vn(e, t) {
  if (!Qf)
    throw new Error("No element matching method supported");
  return Qf.call(e, t);
}
function Wr(e) {
  e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
}
function Zf(e, t) {
  return Array.prototype.filter.call(
    e.children,
    function(n) {
      return Vn(n, t);
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
}, Wh = { x: null, y: null };
function Uh(e, t) {
  var n = e.element.classList, r = lt.state.scrolling(t);
  n.contains(r) ? clearTimeout(Wh[t]) : n.add(r);
}
function qh(e, t) {
  Wh[t] = setTimeout(
    function() {
      return e.isAlive && e.element.classList.remove(lt.state.scrolling(t));
    },
    e.settings.scrollingThreshold
  );
}
function bw(e, t) {
  Uh(e, t), qh(e, t);
}
var to = function(t) {
  this.element = t, this.handlers = {};
}, zh = { isEmpty: { configurable: !0 } };
to.prototype.bind = function(t, n) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(n), this.element.addEventListener(t, n, !1);
};
to.prototype.unbind = function(t, n) {
  var r = this;
  this.handlers[t] = this.handlers[t].filter(function(o) {
    return n && o !== n ? !0 : (r.element.removeEventListener(t, o, !1), !1);
  });
};
to.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
zh.isEmpty.get = function() {
  var e = this;
  return Object.keys(this.handlers).every(
    function(t) {
      return e.handlers[t].length === 0;
    }
  );
};
Object.defineProperties(to.prototype, zh);
var li = function() {
  this.eventElements = [];
};
li.prototype.eventElement = function(t) {
  var n = this.eventElements.filter(function(r) {
    return r.element === t;
  })[0];
  return n || (n = new to(t), this.eventElements.push(n)), n;
};
li.prototype.bind = function(t, n, r) {
  this.eventElement(t).bind(n, r);
};
li.prototype.unbind = function(t, n, r) {
  var o = this.eventElement(t);
  o.unbind(n, r), o.isEmpty && this.eventElements.splice(this.eventElements.indexOf(o), 1);
};
li.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t) {
    return t.unbindAll();
  }), this.eventElements = [];
};
li.prototype.once = function(t, n, r) {
  var o = this.eventElement(t), a = function(c) {
    o.unbind(n, a), r(c);
  };
  o.bind(n, a);
};
function No(e) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(e);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(e, !1, !1, void 0), t;
}
function ea(e, t, n, r, o) {
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
  var a = n[0], c = n[1], d = n[2], p = n[3], g = n[4], b = n[5];
  r === void 0 && (r = !0), o === void 0 && (o = !1);
  var C = e.element;
  e.reach[p] = null, C[d] < 1 && (e.reach[p] = "start"), C[d] > e[a] - e[c] - 1 && (e.reach[p] = "end"), t && (C.dispatchEvent(No("ps-scroll-" + p)), t < 0 ? C.dispatchEvent(No("ps-scroll-" + g)) : t > 0 && C.dispatchEvent(No("ps-scroll-" + b)), r && bw(e, p)), e.reach[p] && (t || o) && C.dispatchEvent(No("ps-" + p + "-reach-" + e.reach[p]));
}
function it(e) {
  return parseInt(e, 10) || 0;
}
function xw(e) {
  return Vn(e, "input,[contenteditable]") || Vn(e, "select,[contenteditable]") || Vn(e, "textarea,[contenteditable]") || Vn(e, "button,[contenteditable]");
}
function ww(e) {
  var t = mn(e);
  return it(t.width) + it(t.paddingLeft) + it(t.paddingRight) + it(t.borderLeftWidth) + it(t.borderRightWidth);
}
var Hr = {
  isWebKit: typeof document < "u" && "WebkitAppearance" in document.documentElement.style,
  supportsTouch: typeof window < "u" && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
function Ln(e) {
  var t = e.element, n = Math.floor(t.scrollTop), r = t.getBoundingClientRect();
  e.containerWidth = Math.round(r.width), e.containerHeight = Math.round(r.height), e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (Zf(t, lt.element.rail("x")).forEach(
    function(o) {
      return Wr(o);
    }
  ), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (Zf(t, lt.element.rail("y")).forEach(
    function(o) {
      return Wr(o);
    }
  ), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = ed(
    e,
    it(e.railXWidth * e.containerWidth / e.contentWidth)
  ), e.scrollbarXLeft = it(
    (e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth)
  )) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = ed(
    e,
    it(e.railYHeight * e.containerHeight / e.contentHeight)
  ), e.scrollbarYTop = it(
    n * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight)
  )) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), Tw(t, e), e.scrollbarXActive ? t.classList.add(lt.state.active("x")) : (t.classList.remove(lt.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = e.isRtl === !0 ? e.contentWidth : 0), e.scrollbarYActive ? t.classList.add(lt.state.active("y")) : (t.classList.remove(lt.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0);
}
function ed(e, t) {
  return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t;
}
function Tw(e, t) {
  var n = { width: t.railXWidth }, r = Math.floor(e.scrollTop);
  t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft, t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - r : n.top = t.scrollbarXTop + r, Lt(t.scrollbarXRail, n);
  var o = { top: r, height: t.railYHeight };
  t.isScrollbarYUsingRight ? t.isRtl ? o.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth - 9 : o.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? o.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth * 2 - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : o.left = t.scrollbarYLeft + e.scrollLeft, Lt(t.scrollbarYRail, o), Lt(t.scrollbarX, {
    left: t.scrollbarXLeft,
    width: t.scrollbarXWidth - t.railBorderXWidth
  }), Lt(t.scrollbarY, {
    top: t.scrollbarYTop,
    height: t.scrollbarYHeight - t.railBorderYWidth
  });
}
function Ew(e) {
  e.element, e.event.bind(e.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarYRail, "mousedown", function(t) {
    var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top, r = n > e.scrollbarYTop ? 1 : -1;
    e.element.scrollTop += r * e.containerHeight, Ln(e), t.stopPropagation();
  }), e.event.bind(e.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarXRail, "mousedown", function(t) {
    var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left, r = n > e.scrollbarXLeft ? 1 : -1;
    e.element.scrollLeft += r * e.containerWidth, Ln(e), t.stopPropagation();
  });
}
function Sw(e) {
  td(e, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), td(e, [
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
function td(e, t) {
  var n = t[0], r = t[1], o = t[2], a = t[3], c = t[4], d = t[5], p = t[6], g = t[7], b = t[8], C = e.element, y = null, T = null, w = null;
  function A(j) {
    j.touches && j.touches[0] && (j[o] = j.touches[0].pageY), C[p] = y + w * (j[o] - T), Uh(e, g), Ln(e), j.stopPropagation(), j.type.startsWith("touch") && j.changedTouches.length > 1 && j.preventDefault();
  }
  function I() {
    qh(e, g), e[b].classList.remove(lt.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", A);
  }
  function P(j, z) {
    y = C[p], z && j.touches && (j[o] = j.touches[0].pageY), T = j[o], w = (e[r] - e[n]) / (e[a] - e[d]), z ? e.event.bind(e.ownerDocument, "touchmove", A) : (e.event.bind(e.ownerDocument, "mousemove", A), e.event.once(e.ownerDocument, "mouseup", I), j.preventDefault()), e[b].classList.add(lt.state.clicking), j.stopPropagation();
  }
  e.event.bind(e[c], "mousedown", function(j) {
    P(j);
  }), e.event.bind(e[c], "touchstart", function(j) {
    P(j, !0);
  });
}
function Ow(e) {
  var t = e.element, n = function() {
    return Vn(t, ":hover");
  }, r = function() {
    return Vn(e.scrollbarX, ":focus") || Vn(e.scrollbarY, ":focus");
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
      e.settings.suppressScrollX && d !== 0 || e.settings.suppressScrollY && p !== 0 || (t.scrollTop -= p, t.scrollLeft += d, Ln(e), o(d, p) && a.preventDefault());
    }
  });
}
function _w(e) {
  var t = e.element;
  function n(c, d) {
    var p = Math.floor(t.scrollTop), g = t.scrollTop === 0, b = p + t.offsetHeight === t.scrollHeight, C = t.scrollLeft === 0, y = t.scrollLeft + t.offsetWidth === t.scrollWidth, T;
    return Math.abs(d) > Math.abs(c) ? T = g || b : T = C || y, T ? !e.settings.wheelPropagation : !0;
  }
  function r(c) {
    var d = c.deltaX, p = -1 * c.deltaY;
    return (typeof d > "u" || typeof p > "u") && (d = -1 * c.wheelDeltaX / 6, p = c.wheelDeltaY / 6), c.deltaMode && c.deltaMode === 1 && (d *= 10, p *= 10), d !== d && p !== p && (d = 0, p = c.wheelDelta), c.shiftKey ? [-p, -d] : [d, p];
  }
  function o(c, d, p) {
    if (!Hr.isWebKit && t.querySelector("select:focus"))
      return !0;
    if (!t.contains(c))
      return !1;
    for (var g = c; g && g !== t; ) {
      if (g.classList.contains(lt.element.consuming))
        return !0;
      var b = mn(g);
      if (p && b.overflowY.match(/(scroll|auto)/)) {
        var C = g.scrollHeight - g.clientHeight;
        if (C > 0 && (g.scrollTop > 0 && p < 0 || g.scrollTop < C && p > 0))
          return !0;
      }
      if (d && b.overflowX.match(/(scroll|auto)/)) {
        var y = g.scrollWidth - g.clientWidth;
        if (y > 0 && (g.scrollLeft > 0 && d < 0 || g.scrollLeft < y && d > 0))
          return !0;
      }
      g = g.parentNode;
    }
    return !1;
  }
  function a(c) {
    var d = r(c), p = d[0], g = d[1];
    if (!o(c.target, p, g)) {
      var b = !1;
      e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (g ? t.scrollTop -= g * e.settings.wheelSpeed : t.scrollTop += p * e.settings.wheelSpeed, b = !0) : e.scrollbarXActive && !e.scrollbarYActive && (p ? t.scrollLeft += p * e.settings.wheelSpeed : t.scrollLeft -= g * e.settings.wheelSpeed, b = !0) : (t.scrollTop -= g * e.settings.wheelSpeed, t.scrollLeft += p * e.settings.wheelSpeed), Ln(e), b = b || n(p, g), b && !c.ctrlKey && (c.stopPropagation(), c.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? e.event.bind(t, "wheel", a) : typeof window.onmousewheel < "u" && e.event.bind(t, "mousewheel", a);
}
function Aw(e) {
  if (!Hr.supportsTouch && !Hr.supportsIePointer)
    return;
  var t = e.element;
  function n(w, A) {
    var I = Math.floor(t.scrollTop), P = t.scrollLeft, j = Math.abs(w), z = Math.abs(A);
    if (z > j) {
      if (A < 0 && I === e.contentHeight - e.containerHeight || A > 0 && I === 0)
        return window.scrollY === 0 && A > 0 && Hr.isChrome;
    } else if (j > z && (w < 0 && P === e.contentWidth - e.containerWidth || w > 0 && P === 0))
      return !0;
    return !0;
  }
  function r(w, A) {
    t.scrollTop -= A, t.scrollLeft -= w, Ln(e);
  }
  var o = {}, a = 0, c = {}, d = null;
  function p(w) {
    return w.targetTouches ? w.targetTouches[0] : w;
  }
  function g(w) {
    return w.pointerType && w.pointerType === "pen" && w.buttons === 0 ? !1 : !!(w.targetTouches && w.targetTouches.length === 1 || w.pointerType && w.pointerType !== "mouse" && w.pointerType !== w.MSPOINTER_TYPE_MOUSE);
  }
  function b(w) {
    if (g(w)) {
      var A = p(w);
      o.pageX = A.pageX, o.pageY = A.pageY, a = new Date().getTime(), d !== null && clearInterval(d);
    }
  }
  function C(w, A, I) {
    if (!t.contains(w))
      return !1;
    for (var P = w; P && P !== t; ) {
      if (P.classList.contains(lt.element.consuming))
        return !0;
      var j = mn(P);
      if (I && j.overflowY.match(/(scroll|auto)/)) {
        var z = P.scrollHeight - P.clientHeight;
        if (z > 0 && (P.scrollTop > 0 && I < 0 || P.scrollTop < z && I > 0))
          return !0;
      }
      if (A && j.overflowX.match(/(scroll|auto)/)) {
        var Z = P.scrollWidth - P.clientWidth;
        if (Z > 0 && (P.scrollLeft > 0 && A < 0 || P.scrollLeft < Z && A > 0))
          return !0;
      }
      P = P.parentNode;
    }
    return !1;
  }
  function y(w) {
    if (g(w)) {
      var A = p(w), I = { pageX: A.pageX, pageY: A.pageY }, P = I.pageX - o.pageX, j = I.pageY - o.pageY;
      if (C(w.target, P, j))
        return;
      r(P, j), o = I;
      var z = new Date().getTime(), Z = z - a;
      Z > 0 && (c.x = P / Z, c.y = j / Z, a = z), n(P, j) && w.preventDefault();
    }
  }
  function T() {
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
  Hr.supportsTouch ? (e.event.bind(t, "touchstart", b), e.event.bind(t, "touchmove", y), e.event.bind(t, "touchend", T)) : Hr.supportsIePointer && (window.PointerEvent ? (e.event.bind(t, "pointerdown", b), e.event.bind(t, "pointermove", y), e.event.bind(t, "pointerup", T)) : window.MSPointerEvent && (e.event.bind(t, "MSPointerDown", b), e.event.bind(t, "MSPointerMove", y), e.event.bind(t, "MSPointerUp", T)));
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
}, no = function(t, n) {
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
    var g = t.scrollLeft, b = null;
    return t.scrollLeft = -1, b = t.scrollLeft < 0, t.scrollLeft = g, b;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new li(), this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = Po(lt.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = Po(lt.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", a), this.event.bind(this.scrollbarX, "blur", c), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var d = mn(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(d.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = it(d.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = it(d.borderLeftWidth) + it(d.borderRightWidth), Lt(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = it(d.marginLeft) + it(d.marginRight), Lt(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = Po(lt.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = Po(lt.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", a), this.event.bind(this.scrollbarY, "blur", c), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var p = mn(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(p.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = it(p.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? ww(this.scrollbarY) : null, this.railBorderYWidth = it(p.borderTopWidth) + it(p.borderBottomWidth), Lt(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = it(p.marginTop) + it(p.marginBottom), Lt(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = !0, this.settings.handlers.forEach(function(g) {
    return Nw[g](r);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(g) {
    return r.onScroll(g);
  }), Ln(this);
};
no.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, Lt(this.scrollbarXRail, { display: "block" }), Lt(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = it(mn(this.scrollbarXRail).marginLeft) + it(mn(this.scrollbarXRail).marginRight), this.railYMarginHeight = it(mn(this.scrollbarYRail).marginTop) + it(mn(this.scrollbarYRail).marginBottom), Lt(this.scrollbarXRail, { display: "none" }), Lt(this.scrollbarYRail, { display: "none" }), Ln(this), ea(this, "top", 0, !1, !0), ea(this, "left", 0, !1, !0), Lt(this.scrollbarXRail, { display: "" }), Lt(this.scrollbarYRail, { display: "" }));
};
no.prototype.onScroll = function(t) {
  this.isAlive && (Ln(this), ea(this, "top", this.element.scrollTop - this.lastScrollTop), ea(
    this,
    "left",
    this.element.scrollLeft - this.lastScrollLeft
  ), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
no.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Wr(this.scrollbarX), Wr(this.scrollbarY), Wr(this.scrollbarXRail), Wr(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
};
no.prototype.removePsClasses = function() {
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
      e = new no(n), window.addEventListener("resize", t);
    },
    unBind() {
      window.removeEventListener("resize", t);
    }
  };
}
const nd = kw(), Lw = /* @__PURE__ */ tt({
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
    const t = $e(!0), n = $e(!0), r = $e(null), o = $e(), a = $e([]);
    function c() {
      t.value = !1, nd.unBind();
    }
    function d() {
      lw(e.pid);
    }
    return Qt(() => {
      if (console.log(r.value), r.value) {
        const p = r.value;
        nd.bind(p);
      }
      n.value = !0, Op.getCheckReply(e.tid, e.pid).then((p) => {
        n.value = !1;
        const {
          post_info: g,
          list: b
        } = p.data.result;
        console.log(g, b), o.value = g, a.value.push(...b);
      });
    }), () => L(Jt, {
      zIndex: Er.value.length + 1e3,
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
      }, null)]) : L("div", null, [L(Jf, {
        isAuthor: !0,
        tid: e.tid,
        reply: o.value
      }, null), L(Ox, null, null), a.value.map((p) => L(Jf, {
        tid: e.tid,
        reply: p
      }, null))])]), L("div", {
        class: "reply-dialog-footer"
      }, [L(aw, null, {
        default: () => [cw.value ? L(Pn, {
          type: "link",
          onClick: uw
        }, {
          default: () => [Hs("关闭全部")]
        }) : null, L(Pn, {
          type: "primary",
          shape: "round",
          onClick: c,
          style: "width:128px;"
        }, {
          default: () => [Hs("关闭 (Esc)")]
        })]
      })])]
    });
  }
}), Mw = { class: "reply-dialog-list" }, Rw = /* @__PURE__ */ tt({
  __name: "App",
  setup(e) {
    const t = $e([]), n = (r) => {
      Ka(".wrapper-container").eq(0).find(".post-reply-list-wrapper").each((c, d) => {
        const g = Ka(d).find(".bbs-admin-reply-post-container").data("admininfo"), { pid: b } = g, C = t.value.find((w) => w.pid === b);
        if (!C || !C.check_reply_info)
          return;
        const y = document.createElement("div");
        y.classList.add("todo-list", "todo-list-reply-dialog");
        const T = document.createElement("span");
        T.classList.add("todo-list-text", "bold"), T.innerHTML = `弹框查看评论(${C.check_reply_info.num})`, y.append(T), y.addEventListener("click", () => {
          Bh(r, b);
        }), Ka(d).find(".post-reply-list-operate").append(y);
      });
    };
    return Qt(() => {
      const [r] = /(\d)+/.exec(location.pathname);
      Op.getsThreadLightReplyList(r).then((o) => {
        t.value.push(...o.data.data.list), n(r);
      });
    }), (r, o) => (Ya(), ic("div", Mw, [
      (Ya(!0), ic(dt, null, am($i(Er), (a) => (Ya(), _m($i(Lw), {
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
    render: () => zo(Rw)
  }).mount(e);
});
