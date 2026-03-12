var content = function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  function defineContentScript(definition2) {
    return definition2;
  }
  /**
  * @vue/shared v3.5.30
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map2 = /* @__PURE__ */ Object.create(null);
    for (const key2 of str.split(",")) map2[key2] = 1;
    return (val) => val in map2;
  }
  const EMPTY_OBJ = Object.freeze({});
  const EMPTY_ARR = Object.freeze([]);
  const NOOP = () => {
  };
  const NO = () => false;
  const isOn = (key2) => key2.charCodeAt(0) === 111 && key2.charCodeAt(1) === 110 && // uppercase letter
  (key2.charCodeAt(2) > 122 || key2.charCodeAt(2) < 97);
  const isModelListener = (key2) => key2.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove$1 = (arr, el) => {
    const i2 = arr.indexOf(el);
    if (i2 > -1) {
      arr.splice(i2, 1);
    }
  };
  const hasOwnProperty$6 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key2) => hasOwnProperty$6.call(val, key2);
  const isArray$2 = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isFunction$1 = (val) => typeof val === "function";
  const isString$1 = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject$2 = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return (isObject$2(val) || isFunction$1(val)) && isFunction$1(val.then) && isFunction$1(val.catch);
  };
  const objectToString$1 = Object.prototype.toString;
  const toTypeString = (value) => objectToString$1.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key2) => isString$1(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const isBuiltInDirective = /* @__PURE__ */ makeMap(
    "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
  );
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-\w/g;
  const camelize = cacheStringFunction(
    (str) => {
      return str.replace(camelizeRE, (c2) => c2.slice(1).toUpperCase());
    }
  );
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction(
    (str) => {
      const s2 = str ? `on${capitalize(str)}` : ``;
      return s2;
    }
  );
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, ...arg) => {
    for (let i2 = 0; i2 < fns.length; i2++) {
      fns[i2](...arg);
    }
  };
  const def = (obj, key2, value, writable = false) => {
    Object.defineProperty(obj, key2, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  const looseToNumber = (val) => {
    const n2 = parseFloat(val);
    return isNaN(n2) ? val : n2;
  };
  const toNumber = (val) => {
    const n2 = isString$1(val) ? Number(val) : NaN;
    return isNaN(n2) ? val : n2;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function normalizeStyle$1(value) {
    if (isArray$2(value)) {
      const res = {};
      for (let i2 = 0; i2 < value.length; i2++) {
        const item = value[i2];
        const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle$1(item);
        if (normalized) {
          for (const key2 in normalized) {
            res[key2] = normalized[key2];
          }
        }
      }
      return res;
    } else if (isString$1(value) || isObject$2(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString$1(value)) {
      res = value;
    } else if (isArray$2(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        const normalized = normalizeClass(value[i2]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject$2(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
  const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
  const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
  const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
  const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a2, b2) {
    if (a2.length !== b2.length) return false;
    let equal = true;
    for (let i2 = 0; equal && i2 < a2.length; i2++) {
      equal = looseEqual(a2[i2], b2[i2]);
    }
    return equal;
  }
  function looseEqual(a2, b2) {
    if (a2 === b2) return true;
    let aValidType = isDate(a2);
    let bValidType = isDate(b2);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a2.getTime() === b2.getTime() : false;
    }
    aValidType = isSymbol(a2);
    bValidType = isSymbol(b2);
    if (aValidType || bValidType) {
      return a2 === b2;
    }
    aValidType = isArray$2(a2);
    bValidType = isArray$2(b2);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a2, b2) : false;
    }
    aValidType = isObject$2(a2);
    bValidType = isObject$2(b2);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a2).length;
      const bKeysCount = Object.keys(b2).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key2 in a2) {
        const aHasKey = a2.hasOwnProperty(key2);
        const bHasKey = b2.hasOwnProperty(key2);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a2[key2], b2[key2])) {
          return false;
        }
      }
    }
    return String(a2) === String(b2);
  }
  /**
  * @vue/reactivity v3.5.30
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  function warn$3(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
  }
  let activeEffectScope;
  class EffectScope {
    // TODO isolatedDeclarations "__v_skip"
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this._on = 0;
      this.effects = [];
      this.cleanups = [];
      this._isPaused = false;
      this.__v_skip = true;
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      }
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let i2, l2;
        if (this.scopes) {
          for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
            this.scopes[i2].pause();
          }
        }
        for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
          this.effects[i2].pause();
        }
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active) {
        if (this._isPaused) {
          this._isPaused = false;
          let i2, l2;
          if (this.scopes) {
            for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
              this.scopes[i2].resume();
            }
          }
          for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
            this.effects[i2].resume();
          }
        }
      }
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else {
        warn$3(`cannot run an inactive effect scope.`);
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      if (++this._on === 1) {
        this.prevScope = activeEffectScope;
        activeEffectScope = this;
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      if (this._on > 0 && --this._on === 0) {
        activeEffectScope = this.prevScope;
        this.prevScope = void 0;
      }
    }
    stop(fromParent) {
      if (this._active) {
        this._active = false;
        let i2, l2;
        for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
          this.effects[i2].stop();
        }
        this.effects.length = 0;
        for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
          this.cleanups[i2]();
        }
        this.cleanups.length = 0;
        if (this.scopes) {
          for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
            this.scopes[i2].stop(true);
          }
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
      }
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  let activeSub;
  const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 1 | 4;
      this.next = void 0;
      this.cleanup = void 0;
      this.scheduler = void 0;
      if (activeEffectScope && activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      }
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      if (this.flags & 64) {
        this.flags &= -65;
        if (pausedQueueEffects.has(this)) {
          pausedQueueEffects.delete(this);
          this.trigger();
        }
      }
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags & 2 && !(this.flags & 32)) {
        return;
      }
      if (!(this.flags & 8)) {
        batch(this);
      }
    }
    run() {
      if (!(this.flags & 1)) {
        return this.fn();
      }
      this.flags |= 2;
      cleanupEffect(this);
      prepareDeps(this);
      const prevEffect = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = this;
      shouldTrack = true;
      try {
        return this.fn();
      } finally {
        if (activeSub !== this) {
          warn$3(
            "Active effect was not restored correctly - this is likely a Vue internal bug."
          );
        }
        cleanupDeps(this);
        activeSub = prevEffect;
        shouldTrack = prevShouldTrack;
        this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link = this.deps; link; link = link.nextDep) {
          removeSub(link);
        }
        this.deps = this.depsTail = void 0;
        cleanupEffect(this);
        this.onStop && this.onStop();
        this.flags &= -2;
      }
    }
    trigger() {
      if (this.flags & 64) {
        pausedQueueEffects.add(this);
      } else if (this.scheduler) {
        this.scheduler();
      } else {
        this.runIfDirty();
      }
    }
    /**
     * @internal
     */
    runIfDirty() {
      if (isDirty(this)) {
        this.run();
      }
    }
    get dirty() {
      return isDirty(this);
    }
  }
  let batchDepth = 0;
  let batchedSub;
  let batchedComputed;
  function batch(sub, isComputed = false) {
    sub.flags |= 8;
    if (isComputed) {
      sub.next = batchedComputed;
      batchedComputed = sub;
      return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
  }
  function startBatch() {
    batchDepth++;
  }
  function endBatch() {
    if (--batchDepth > 0) {
      return;
    }
    if (batchedComputed) {
      let e2 = batchedComputed;
      batchedComputed = void 0;
      while (e2) {
        const next2 = e2.next;
        e2.next = void 0;
        e2.flags &= -9;
        e2 = next2;
      }
    }
    let error;
    while (batchedSub) {
      let e2 = batchedSub;
      batchedSub = void 0;
      while (e2) {
        const next2 = e2.next;
        e2.next = void 0;
        e2.flags &= -9;
        if (e2.flags & 1) {
          try {
            ;
            e2.trigger();
          } catch (err) {
            if (!error) error = err;
          }
        }
        e2 = next2;
      }
    }
    if (error) throw error;
  }
  function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      link.version = -1;
      link.prevActiveLink = link.dep.activeLink;
      link.dep.activeLink = link;
    }
  }
  function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
      const prev2 = link.prevDep;
      if (link.version === -1) {
        if (link === tail) tail = prev2;
        removeSub(link);
        removeDep(link);
      } else {
        head = link;
      }
      link.dep.activeLink = link.prevActiveLink;
      link.prevActiveLink = void 0;
      link = prev2;
    }
    sub.deps = head;
    sub.depsTail = tail;
  }
  function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
        return true;
      }
    }
    if (sub._dirty) {
      return true;
    }
    return false;
  }
  function refreshComputed(computed2) {
    if (computed2.flags & 4 && !(computed2.flags & 16)) {
      return;
    }
    computed2.flags &= -17;
    if (computed2.globalVersion === globalVersion) {
      return;
    }
    computed2.globalVersion = globalVersion;
    if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
      return;
    }
    computed2.flags |= 2;
    const dep = computed2.dep;
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed2;
    shouldTrack = true;
    try {
      prepareDeps(computed2);
      const value = computed2.fn(computed2._value);
      if (dep.version === 0 || hasChanged(value, computed2._value)) {
        computed2.flags |= 128;
        computed2._value = value;
        dep.version++;
      }
    } catch (err) {
      dep.version++;
      throw err;
    } finally {
      activeSub = prevSub;
      shouldTrack = prevShouldTrack;
      cleanupDeps(computed2);
      computed2.flags &= -3;
    }
  }
  function removeSub(link, soft = false) {
    const { dep, prevSub, nextSub } = link;
    if (prevSub) {
      prevSub.nextSub = nextSub;
      link.prevSub = void 0;
    }
    if (nextSub) {
      nextSub.prevSub = prevSub;
      link.nextSub = void 0;
    }
    if (dep.subsHead === link) {
      dep.subsHead = nextSub;
    }
    if (dep.subs === link) {
      dep.subs = prevSub;
      if (!prevSub && dep.computed) {
        dep.computed.flags &= -5;
        for (let l2 = dep.computed.deps; l2; l2 = l2.nextDep) {
          removeSub(l2, true);
        }
      }
    }
    if (!soft && !--dep.sc && dep.map) {
      dep.map.delete(dep.key);
    }
  }
  function removeDep(link) {
    const { prevDep, nextDep } = link;
    if (prevDep) {
      prevDep.nextDep = nextDep;
      link.prevDep = void 0;
    }
    if (nextDep) {
      nextDep.prevDep = prevDep;
      link.nextDep = void 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function cleanupEffect(e2) {
    const { cleanup: cleanup2 } = e2;
    e2.cleanup = void 0;
    if (cleanup2) {
      const prevSub = activeSub;
      activeSub = void 0;
      try {
        cleanup2();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  let globalVersion = 0;
  class Link {
    constructor(sub, dep) {
      this.sub = sub;
      this.dep = dep;
      this.version = dep.version;
      this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Dep {
    // TODO isolatedDeclarations "__v_skip"
    constructor(computed2) {
      this.computed = computed2;
      this.version = 0;
      this.activeLink = void 0;
      this.subs = void 0;
      this.map = void 0;
      this.key = void 0;
      this.sc = 0;
      this.__v_skip = true;
      {
        this.subsHead = void 0;
      }
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) {
        return;
      }
      let link = this.activeLink;
      if (link === void 0 || link.sub !== activeSub) {
        link = this.activeLink = new Link(activeSub, this);
        if (!activeSub.deps) {
          activeSub.deps = activeSub.depsTail = link;
        } else {
          link.prevDep = activeSub.depsTail;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
        }
        addSub(link);
      } else if (link.version === -1) {
        link.version = this.version;
        if (link.nextDep) {
          const next2 = link.nextDep;
          next2.prevDep = link.prevDep;
          if (link.prevDep) {
            link.prevDep.nextDep = next2;
          }
          link.prevDep = activeSub.depsTail;
          link.nextDep = void 0;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
          if (activeSub.deps === link) {
            activeSub.deps = next2;
          }
        }
      }
      if (activeSub.onTrack) {
        activeSub.onTrack(
          extend(
            {
              effect: activeSub
            },
            debugInfo
          )
        );
      }
      return link;
    }
    trigger(debugInfo) {
      this.version++;
      globalVersion++;
      this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        if (true) {
          for (let head = this.subsHead; head; head = head.nextSub) {
            if (head.sub.onTrigger && !(head.sub.flags & 8)) {
              head.sub.onTrigger(
                extend(
                  {
                    effect: head.sub
                  },
                  debugInfo
                )
              );
            }
          }
        }
        for (let link = this.subs; link; link = link.prevSub) {
          if (link.sub.notify()) {
            ;
            link.sub.dep.notify();
          }
        }
      } finally {
        endBatch();
      }
    }
  }
  function addSub(link) {
    link.dep.sc++;
    if (link.sub.flags & 4) {
      const computed2 = link.dep.computed;
      if (computed2 && !link.dep.subs) {
        computed2.flags |= 4 | 16;
        for (let l2 = computed2.deps; l2; l2 = l2.nextDep) {
          addSub(l2);
        }
      }
      const currentTail = link.dep.subs;
      if (currentTail !== link) {
        link.prevSub = currentTail;
        if (currentTail) currentTail.nextSub = link;
      }
      if (link.dep.subsHead === void 0) {
        link.dep.subsHead = link;
      }
      link.dep.subs = link;
    }
  }
  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = /* @__PURE__ */ Symbol(
    "Object iterate"
  );
  const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
    "Map keys iterate"
  );
  const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
    "Array iterate"
  );
  function track(target, type, key2) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key2);
      if (!dep) {
        depsMap.set(key2, dep = new Dep());
        dep.map = depsMap;
        dep.key = key2;
      }
      {
        dep.track({
          target,
          type,
          key: key2
        });
      }
    }
  }
  function trigger(target, type, key2, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = (dep) => {
      if (dep) {
        {
          dep.trigger({
            target,
            type,
            key: key2,
            newValue,
            oldValue,
            oldTarget
          });
        }
      }
    };
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray$2(target);
      const isArrayIndex = targetIsArray && isIntegerKey(key2);
      if (targetIsArray && key2 === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key22) => {
          if (key22 === "length" || key22 === ARRAY_ITERATE_KEY || !isSymbol(key22) && key22 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key2 !== void 0 || depsMap.has(void 0)) {
          run(depsMap.get(key2));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  function reactiveReadArray(array) {
    const raw = /* @__PURE__ */ toRaw(array);
    if (raw === array) return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
  }
  function shallowReadArray(arr) {
    track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  function toWrapped(target, item) {
    if (/* @__PURE__ */ isReadonly(target)) {
      return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
    }
    return toReactive(item);
  }
  const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
    },
    concat(...args) {
      return reactiveReadArray(this).concat(
        ...args.map((x2) => isArray$2(x2) ? reactiveReadArray(x2) : x2)
      );
    },
    entries() {
      return iterator(this, "entries", (value) => {
        value[1] = toWrapped(this, value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply(
        this,
        "filter",
        fn,
        thisArg,
        (v2) => v2.map((item) => toWrapped(this, item)),
        arguments
      );
    },
    find(fn, thisArg) {
      return apply(
        this,
        "find",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findIndex(fn, thisArg) {
      return apply(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply(
        this,
        "findLast",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findLastIndex(fn, thisArg) {
      return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(fn, thisArg) {
      return apply(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
    // keys() iterator only reads `length`, no optimization required
    lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(fn, thisArg) {
      return apply(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator(this, "values", (item) => toWrapped(this, item));
    }
  };
  function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
      iter._next = iter.next;
      iter.next = () => {
        const result2 = iter._next();
        if (!result2.done) {
          result2.value = wrapValue(result2.value);
        }
        return result2;
      };
    }
    return iter;
  }
  const arrayProto = Array.prototype;
  function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result22 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result22) : result22;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
      if (needsWrap) {
        wrappedFn = function(item, index) {
          return fn.call(this, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 2) {
        wrappedFn = function(item, index) {
          return fn.call(this, item, index, self2);
        };
      }
    }
    const result2 = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result2) : result2;
  }
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
    let wrappedFn = fn;
    let wrapInitialAccumulator = false;
    if (arr !== self2) {
      if (needsWrap) {
        wrapInitialAccumulator = args.length === 0;
        wrappedFn = function(acc, item, index) {
          if (wrapInitialAccumulator) {
            wrapInitialAccumulator = false;
            acc = toWrapped(self2, acc);
          }
          return fn.call(this, acc, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 3) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, item, index, self2);
        };
      }
    }
    const result2 = arr[method](wrappedFn, ...args);
    return wrapInitialAccumulator ? toWrapped(self2, result2) : result2;
  }
  function searchProxy(self2, method, args) {
    const arr = /* @__PURE__ */ toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
      args[0] = /* @__PURE__ */ toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  function noTracking(self2, method, args = []) {
    pauseTracking();
    startBatch();
    const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key2) => key2 !== "arguments" && key2 !== "caller").map((key2) => Symbol[key2]).filter(isSymbol)
  );
  function hasOwnProperty$5(key2) {
    if (!isSymbol(key2)) key2 = String(key2);
    const obj = /* @__PURE__ */ toRaw(this);
    track(obj, "has", key2);
    return obj.hasOwnProperty(key2);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key2, receiver) {
      if (key2 === "__v_skip") return target["__v_skip"];
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key2 === "__v_isReactive") {
        return !isReadonly2;
      } else if (key2 === "__v_isReadonly") {
        return isReadonly2;
      } else if (key2 === "__v_isShallow") {
        return isShallow2;
      } else if (key2 === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray$2(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key2])) {
          return fn;
        }
        if (key2 === "hasOwnProperty") {
          return hasOwnProperty$5;
        }
      }
      const res = Reflect.get(
        target,
        key2,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        /* @__PURE__ */ isRef(target) ? target : receiver
      );
      if (isSymbol(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key2);
      }
      if (isShallow2) {
        return res;
      }
      if (/* @__PURE__ */ isRef(res)) {
        const value = targetIsArray && isIntegerKey(key2) ? res : res.value;
        return isReadonly2 && isObject$2(value) ? /* @__PURE__ */ readonly(value) : value;
      }
      if (isObject$2(res)) {
        return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key2, value, receiver) {
      let oldValue = target[key2];
      const isArrayWithIntegerKey = isArray$2(target) && isIntegerKey(key2);
      if (!this._isShallow) {
        const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
        if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          oldValue = /* @__PURE__ */ toRaw(oldValue);
          value = /* @__PURE__ */ toRaw(value);
        }
        if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
          if (isOldValueReadonly) {
            {
              warn$3(
                `Set operation on key "${String(key2)}" failed: target is readonly.`,
                target[key2]
              );
            }
            return true;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArrayWithIntegerKey ? Number(key2) < target.length : hasOwn(target, key2);
      const result2 = Reflect.set(
        target,
        key2,
        value,
        /* @__PURE__ */ isRef(target) ? target : receiver
      );
      if (target === /* @__PURE__ */ toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key2, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key2, value, oldValue);
        }
      }
      return result2;
    }
    deleteProperty(target, key2) {
      const hadKey = hasOwn(target, key2);
      const oldValue = target[key2];
      const result2 = Reflect.deleteProperty(target, key2);
      if (result2 && hadKey) {
        trigger(target, "delete", key2, void 0, oldValue);
      }
      return result2;
    }
    has(target, key2) {
      const result2 = Reflect.has(target, key2);
      if (!isSymbol(key2) || !builtInSymbols.has(key2)) {
        track(target, "has", key2);
      }
      return result2;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray$2(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key2) {
      {
        warn$3(
          `Set operation on key "${String(key2)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    }
    deleteProperty(target, key2) {
      {
        warn$3(
          `Delete operation on key "${String(key2)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    }
  }
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
  const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
  const toShallow = (value) => value;
  const getProto = (v2) => Reflect.getPrototypeOf(v2);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return extend(
        // inheriting all iterator properties
        Object.create(innerIterator),
        {
          // iterator protocol
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          }
        }
      );
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      {
        const key2 = args[0] ? `on key "${args[0]}" ` : ``;
        warn$3(
          `${capitalize(type)} operation ${key2}failed: target is readonly.`,
          /* @__PURE__ */ toRaw(this)
        );
      }
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
      get(key2) {
        const target = this["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const rawKey = /* @__PURE__ */ toRaw(key2);
        if (!readonly2) {
          if (hasChanged(key2, rawKey)) {
            track(rawTarget, "get", key2);
          }
          track(rawTarget, "get", rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        if (has.call(rawTarget, key2)) {
          return wrap(target.get(key2));
        } else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
        } else if (target !== rawTarget) {
          target.get(key2);
        }
      },
      get size() {
        const target = this["__v_raw"];
        !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
        return target.size;
      },
      has(key2) {
        const target = this["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const rawKey = /* @__PURE__ */ toRaw(key2);
        if (!readonly2) {
          if (hasChanged(key2, rawKey)) {
            track(rawTarget, "has", key2);
          }
          track(rawTarget, "has", rawKey);
        }
        return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key2) => {
          return callback.call(thisArg, wrap(value), wrap(key2), observed);
        });
      }
    };
    extend(
      instrumentations,
      readonly2 ? {
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear")
      } : {
        add(value) {
          const target = /* @__PURE__ */ toRaw(this);
          const proto = getProto(target);
          const rawValue = /* @__PURE__ */ toRaw(value);
          const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
          const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
          if (!hadKey) {
            target.add(valueToAdd);
            trigger(target, "add", valueToAdd, valueToAdd);
          }
          return this;
        },
        set(key2, value) {
          if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
            value = /* @__PURE__ */ toRaw(value);
          }
          const target = /* @__PURE__ */ toRaw(this);
          const { has, get: get2 } = getProto(target);
          let hadKey = has.call(target, key2);
          if (!hadKey) {
            key2 = /* @__PURE__ */ toRaw(key2);
            hadKey = has.call(target, key2);
          } else {
            checkIdentityKeys(target, has, key2);
          }
          const oldValue = get2.call(target, key2);
          target.set(key2, value);
          if (!hadKey) {
            trigger(target, "add", key2, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key2, value, oldValue);
          }
          return this;
        },
        delete(key2) {
          const target = /* @__PURE__ */ toRaw(this);
          const { has, get: get2 } = getProto(target);
          let hadKey = has.call(target, key2);
          if (!hadKey) {
            key2 = /* @__PURE__ */ toRaw(key2);
            hadKey = has.call(target, key2);
          } else {
            checkIdentityKeys(target, has, key2);
          }
          const oldValue = get2 ? get2.call(target, key2) : void 0;
          const result2 = target.delete(key2);
          if (hadKey) {
            trigger(target, "delete", key2, void 0, oldValue);
          }
          return result2;
        },
        clear() {
          const target = /* @__PURE__ */ toRaw(this);
          const hadItems = target.size !== 0;
          const oldTarget = isMap(target) ? new Map(target) : new Set(target);
          const result2 = target.clear();
          if (hadItems) {
            trigger(
              target,
              "clear",
              void 0,
              void 0,
              oldTarget
            );
          }
          return result2;
        }
      }
    );
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      instrumentations[method] = createIterableMethod(method, readonly2, shallow);
    });
    return instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key2, receiver) => {
      if (key2 === "__v_isReactive") {
        return !isReadonly2;
      } else if (key2 === "__v_isReadonly") {
        return isReadonly2;
      } else if (key2 === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key2) && key2 in target ? instrumentations : target,
        key2,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has, key2) {
    const rawKey = /* @__PURE__ */ toRaw(key2);
    if (rawKey !== key2 && has.call(target, rawKey)) {
      const type = toRawType(target);
      warn$3(
        `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
    }
  }
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
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
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  // @__NO_SIDE_EFFECTS__
  function reactive(target) {
    if (/* @__PURE__ */ isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$2(target)) {
      {
        warn$3(
          `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
            target
          )}`
        );
      }
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  // @__NO_SIDE_EFFECTS__
  function isReactive(value) {
    if (/* @__PURE__ */ isReadonly(value)) {
      return /* @__PURE__ */ isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  // @__NO_SIDE_EFFECTS__
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? /* @__PURE__ */ toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  const toReactive = (value) => isObject$2(value) ? /* @__PURE__ */ reactive(value) : value;
  const toReadonly = (value) => isObject$2(value) ? /* @__PURE__ */ readonly(value) : value;
  // @__NO_SIDE_EFFECTS__
  function isRef(r2) {
    return r2 ? r2["__v_isRef"] === true : false;
  }
  // @__NO_SIDE_EFFECTS__
  function ref(value) {
    return createRef(value, false);
  }
  // @__NO_SIDE_EFFECTS__
  function shallowRef(value) {
    return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
    if (/* @__PURE__ */ isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, isShallow2) {
      this.dep = new Dep();
      this["__v_isRef"] = true;
      this["__v_isShallow"] = false;
      this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
      this._value = isShallow2 ? value : toReactive(value);
      this["__v_isShallow"] = isShallow2;
    }
    get value() {
      {
        this.dep.track({
          target: this,
          type: "get",
          key: "value"
        });
      }
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue;
      const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
      newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
      if (hasChanged(newValue, oldValue)) {
        this._rawValue = newValue;
        this._value = useDirectValue ? newValue : toReactive(newValue);
        {
          this.dep.trigger({
            target: this,
            type: "set",
            key: "value",
            newValue,
            oldValue
          });
        }
      }
    }
  }
  function triggerRef(ref2) {
    if (ref2.dep) {
      {
        ref2.dep.trigger({
          target: ref2,
          type: "set",
          key: "value",
          newValue: ref2._value
        });
      }
    }
  }
  function unref(ref2) {
    return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key2, receiver) => key2 === "__v_raw" ? target : unref(Reflect.get(target, key2, receiver)),
    set: (target, key2, value, receiver) => {
      const oldValue = target[key2];
      if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key2, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
      this.fn = fn;
      this.setter = setter;
      this._value = void 0;
      this.dep = new Dep(this);
      this.__v_isRef = true;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 16;
      this.globalVersion = globalVersion - 1;
      this.next = void 0;
      this.effect = this;
      this["__v_isReadonly"] = !setter;
      this.isSSR = isSSR;
    }
    /**
     * @internal
     */
    notify() {
      this.flags |= 16;
      if (!(this.flags & 8) && // avoid infinite self recursion
      activeSub !== this) {
        batch(this, true);
        return true;
      }
    }
    get value() {
      const link = this.dep.track({
        target: this,
        type: "get",
        key: "value"
      });
      refreshComputed(this);
      if (link) {
        link.version = this.dep.version;
      }
      return this._value;
    }
    set value(newValue) {
      if (this.setter) {
        this.setter(newValue);
      } else {
        warn$3("Write operation failed: computed value is readonly");
      }
    }
  }
  // @__NO_SIDE_EFFECTS__
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction$1(getterOrOptions)) {
      getter = getterOrOptions;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, isSSR);
    return cRef;
  }
  const INITIAL_WATCHER_VALUE = {};
  const cleanupMap = /* @__PURE__ */ new WeakMap();
  let activeWatcher = void 0;
  function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
      let cleanups = cleanupMap.get(owner);
      if (!cleanups) cleanupMap.set(owner, cleanups = []);
      cleanups.push(cleanupFn);
    } else if (!failSilently) {
      warn$3(
        `onWatcherCleanup() was called when there was no active watcher to associate with.`
      );
    }
  }
  function watch$1(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, once, scheduler, augmentJob, call: call2 } = options;
    const warnInvalidSource = (s2) => {
      (options.onWarn || warn$3)(
        `Invalid watch source: `,
        s2,
        `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
      );
    };
    const reactiveGetter = (source2) => {
      if (deep) return source2;
      if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
        return traverse(source2, 1);
      return traverse(source2);
    };
    let effect2;
    let getter;
    let cleanup2;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if (/* @__PURE__ */ isRef(source)) {
      getter = () => source.value;
      forceTrigger = /* @__PURE__ */ isShallow(source);
    } else if (/* @__PURE__ */ isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray$2(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s2) => /* @__PURE__ */ isReactive(s2) || /* @__PURE__ */ isShallow(s2));
      getter = () => source.map((s2) => {
        if (/* @__PURE__ */ isRef(s2)) {
          return s2.value;
        } else if (/* @__PURE__ */ isReactive(s2)) {
          return reactiveGetter(s2);
        } else if (isFunction$1(s2)) {
          return call2 ? call2(s2, 2) : s2();
        } else {
          warnInvalidSource(s2);
        }
      });
    } else if (isFunction$1(source)) {
      if (cb) {
        getter = call2 ? () => call2(source, 2) : source;
      } else {
        getter = () => {
          if (cleanup2) {
            pauseTracking();
            try {
              cleanup2();
            } finally {
              resetTracking();
            }
          }
          const currentEffect = activeWatcher;
          activeWatcher = effect2;
          try {
            return call2 ? call2(source, 3, [boundCleanup]) : source(boundCleanup);
          } finally {
            activeWatcher = currentEffect;
          }
        };
      }
    } else {
      getter = NOOP;
      warnInvalidSource(source);
    }
    if (cb && deep) {
      const baseGetter = getter;
      const depth = deep === true ? Infinity : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
      effect2.stop();
      if (scope && scope.active) {
        remove$1(scope.effects, effect2);
      }
    };
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args);
        watchHandle();
      };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
      if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue))) {
          if (cleanup2) {
            cleanup2();
          }
          const currentWatcher = activeWatcher;
          activeWatcher = effect2;
          try {
            const args = [
              newValue,
              // pass undefined as the old value when it's changed for the first time
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              boundCleanup
            ];
            oldValue = newValue;
            call2 ? call2(cb, 3, args) : (
              // @ts-expect-error
              cb(...args)
            );
          } finally {
            activeWatcher = currentWatcher;
          }
        }
      } else {
        effect2.run();
      }
    };
    if (augmentJob) {
      augmentJob(job);
    }
    effect2 = new ReactiveEffect(getter);
    effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
    cleanup2 = effect2.onStop = () => {
      const cleanups = cleanupMap.get(effect2);
      if (cleanups) {
        if (call2) {
          call2(cleanups, 4);
        } else {
          for (const cleanup22 of cleanups) cleanup22();
        }
        cleanupMap.delete(effect2);
      }
    };
    {
      effect2.onTrack = options.onTrack;
      effect2.onTrigger = options.onTrigger;
    }
    if (cb) {
      if (immediate) {
        job(true);
      } else {
        oldValue = effect2.run();
      }
    } else if (scheduler) {
      scheduler(job.bind(null, true), true);
    } else {
      effect2.run();
    }
    watchHandle.pause = effect2.pause.bind(effect2);
    watchHandle.resume = effect2.resume.bind(effect2);
    watchHandle.stop = watchHandle;
    return watchHandle;
  }
  function traverse(value, depth = Infinity, seen) {
    if (depth <= 0 || !isObject$2(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Map();
    if ((seen.get(value) || 0) >= depth) {
      return value;
    }
    seen.set(value, depth);
    depth--;
    if (/* @__PURE__ */ isRef(value)) {
      traverse(value.value, depth, seen);
    } else if (isArray$2(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        traverse(value[i2], depth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v2) => {
        traverse(v2, depth, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key2 in value) {
        traverse(value[key2], depth, seen);
      }
      for (const key2 of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key2)) {
          traverse(value[key2], depth, seen);
        }
      }
    }
    return value;
  }
  /**
  * @vue/runtime-core v3.5.30
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const stack = [];
  function pushWarningContext(vnode) {
    stack.push(vnode);
  }
  function popWarningContext() {
    stack.pop();
  }
  let isWarning = false;
  function warn$1$1(msg, ...args) {
    if (isWarning) return;
    isWarning = true;
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(
        appWarnHandler,
        instance,
        11,
        [
          // eslint-disable-next-line no-restricted-syntax
          msg + args.map((a2) => {
            var _a, _b;
            return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
          }).join(""),
          instance && instance.proxy,
          trace.map(
            ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
          ).join("\n"),
          trace
        ]
      );
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
    isWarning = false;
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i2) => {
      logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open2 = ` at <${formatComponentName(
      vnode.component,
      vnode.type,
      isRoot
    )}`;
    const close2 = `>` + postfix;
    return vnode.props ? [open2, ...formatProps(vnode.props), close2] : [open2 + close2];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key2) => {
      res.push(...formatProp(key2, props[key2]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key2, value, raw) {
    if (isString$1(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key2}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key2}=${value}`];
    } else if (/* @__PURE__ */ isRef(value)) {
      value = formatProp(key2, /* @__PURE__ */ toRaw(value.value), true);
      return raw ? value : [`${key2}=Ref<`, value, `>`];
    } else if (isFunction$1(value)) {
      return [`${key2}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = /* @__PURE__ */ toRaw(value);
      return raw ? value : [`${key2}=`, value];
    }
  }
  function assertNumber(val, type) {
    if (val === void 0) {
      return;
    } else if (typeof val !== "number") {
      warn$1$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
    } else if (isNaN(val)) {
      warn$1$1(`${type} is NaN - the duration expression might be incorrect.`);
    }
  }
  const ErrorTypeStrings$1 = {
    ["sp"]: "serverPrefetch hook",
    ["bc"]: "beforeCreate hook",
    ["c"]: "created hook",
    ["bm"]: "beforeMount hook",
    ["m"]: "mounted hook",
    ["bu"]: "beforeUpdate hook",
    ["u"]: "updated",
    ["bum"]: "beforeUnmount hook",
    ["um"]: "unmounted hook",
    ["a"]: "activated hook",
    ["da"]: "deactivated hook",
    ["ec"]: "errorCaptured hook",
    ["rtc"]: "renderTracked hook",
    ["rtg"]: "renderTriggered hook",
    [0]: "setup function",
    [1]: "render function",
    [2]: "watcher getter",
    [3]: "watcher callback",
    [4]: "watcher cleanup function",
    [5]: "native event handler",
    [6]: "component event handler",
    [7]: "vnode hook",
    [8]: "directive hook",
    [9]: "transition hook",
    [10]: "app errorHandler",
    [11]: "app warnHandler",
    [12]: "ref function",
    [13]: "async component loader",
    [14]: "scheduler flush",
    [15]: "component update",
    [16]: "app unmount cleanup function"
  };
  function callWithErrorHandling(fn, instance, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction$1(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    if (isArray$2(fn)) {
      const values = [];
      for (let i2 = 0; i2 < fn.length; i2++) {
        values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
      }
      return values;
    } else {
      warn$1$1(
        `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`
      );
    }
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = ErrorTypeStrings$1[type];
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
            if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      if (errorHandler) {
        pauseTracking();
        callWithErrorHandling(errorHandler, null, 10, [
          err,
          exposedInstance,
          errorInfo
        ]);
        resetTracking();
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
  }
  function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
    {
      const info = ErrorTypeStrings$1[type];
      if (contextVNode) {
        pushWarningContext(contextVNode);
      }
      warn$1$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
      if (contextVNode) {
        popWarningContext();
      }
      if (throwInDev) {
        throw err;
      } else {
        console.error(err);
      }
    }
  }
  const queue = [];
  let flushIndex = -1;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  const RECURSION_LIMIT = 100;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!(job.flags & 1)) {
      const jobId = getId(job);
      const lastJob = queue[queue.length - 1];
      if (!lastJob || // fast path when the job id is larger than the tail
      !(job.flags & 2) && jobId >= getId(lastJob)) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(jobId), 0, job);
      }
      job.flags |= 1;
      queueFlush();
    }
  }
  function queueFlush() {
    if (!currentFlushPromise) {
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray$2(cb)) {
      if (activePostFlushCbs && cb.id === -1) {
        activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
      } else if (!(cb.flags & 1)) {
        pendingPostFlushCbs.push(cb);
        cb.flags |= 1;
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance, seen, i2 = flushIndex + 1) {
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (; i2 < queue.length; i2++) {
      const cb = queue[i2];
      if (cb && cb.flags & 2) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        if (checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        queue.splice(i2, 1);
        i2--;
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        cb();
        if (!(cb.flags & 4)) {
          cb.flags &= -2;
        }
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort(
        (a2, b2) => getId(a2) - getId(b2)
      );
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      {
        seen = seen || /* @__PURE__ */ new Map();
      }
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        if (checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        if (!(cb.flags & 8)) cb();
        cb.flags &= -2;
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
  function flushJobs(seen) {
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    const check = (job) => checkRecursiveUpdates(seen, job);
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && !(job.flags & 8)) {
          if (check(job)) {
            continue;
          }
          if (job.flags & 4) {
            job.flags &= ~1;
          }
          callWithErrorHandling(
            job,
            job.i,
            job.i ? 15 : 14
          );
          if (!(job.flags & 4)) {
            job.flags &= ~1;
          }
        }
      }
    } finally {
      for (; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job) {
          job.flags &= -2;
        }
      }
      flushIndex = -1;
      queue.length = 0;
      flushPostFlushCbs(seen);
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function checkRecursiveUpdates(seen, fn) {
    const count = seen.get(fn) || 0;
    if (count > RECURSION_LIMIT) {
      const instance = fn.i;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    }
    seen.set(fn, count + 1);
    return false;
  }
  let isHmrUpdating = false;
  const hmrDirtyComponents = /* @__PURE__ */ new Map();
  {
    getGlobalThis().__VUE_HMR_RUNTIME__ = {
      createRecord: tryWrap(createRecord),
      rerender: tryWrap(rerender),
      reload: tryWrap(reload)
    };
  }
  const map = /* @__PURE__ */ new Map();
  function registerHMR(instance) {
    const id = instance.type.__hmrId;
    let record = map.get(id);
    if (!record) {
      createRecord(id, instance.type);
      record = map.get(id);
    }
    record.instances.add(instance);
  }
  function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances.delete(instance);
  }
  function createRecord(id, initialDef) {
    if (map.has(id)) {
      return false;
    }
    map.set(id, {
      initialDef: normalizeClassComponent(initialDef),
      instances: /* @__PURE__ */ new Set()
    });
    return true;
  }
  function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
  }
  function rerender(id, newRender) {
    const record = map.get(id);
    if (!record) {
      return;
    }
    record.initialDef.render = newRender;
    [...record.instances].forEach((instance) => {
      if (newRender) {
        instance.render = newRender;
        normalizeClassComponent(instance.type).render = newRender;
      }
      instance.renderCache = [];
      isHmrUpdating = true;
      if (!(instance.job.flags & 8)) {
        instance.update();
      }
      isHmrUpdating = false;
    });
  }
  function reload(id, newComp) {
    const record = map.get(id);
    if (!record) return;
    newComp = normalizeClassComponent(newComp);
    updateComponentDef(record.initialDef, newComp);
    const instances = [...record.instances];
    for (let i2 = 0; i2 < instances.length; i2++) {
      const instance = instances[i2];
      const oldComp = normalizeClassComponent(instance.type);
      let dirtyInstances = hmrDirtyComponents.get(oldComp);
      if (!dirtyInstances) {
        if (oldComp !== record.initialDef) {
          updateComponentDef(oldComp, newComp);
        }
        hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set());
      }
      dirtyInstances.add(instance);
      instance.appContext.propsCache.delete(instance.type);
      instance.appContext.emitsCache.delete(instance.type);
      instance.appContext.optionsCache.delete(instance.type);
      if (instance.ceReload) {
        dirtyInstances.add(instance);
        instance.ceReload(newComp.styles);
        dirtyInstances.delete(instance);
      } else if (instance.parent) {
        queueJob(() => {
          if (!(instance.job.flags & 8)) {
            isHmrUpdating = true;
            instance.parent.update();
            isHmrUpdating = false;
            dirtyInstances.delete(instance);
          }
        });
      } else if (instance.appContext.reload) {
        instance.appContext.reload();
      } else if (typeof window !== "undefined") {
        window.location.reload();
      } else {
        console.warn(
          "[HMR] Root or manually mounted instance modified. Full reload required."
        );
      }
      if (instance.root.ce && instance !== instance.root) {
        instance.root.ce._removeChildStyle(oldComp);
      }
    }
    queuePostFlushCb(() => {
      hmrDirtyComponents.clear();
    });
  }
  function updateComponentDef(oldComp, newComp) {
    extend(oldComp, newComp);
    for (const key2 in oldComp) {
      if (key2 !== "__file" && !(key2 in newComp)) {
        delete oldComp[key2];
      }
    }
  }
  function tryWrap(fn) {
    return (id, arg) => {
      try {
        return fn(id, arg);
      } catch (e2) {
        console.error(e2);
        console.warn(
          `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
        );
      }
    };
  }
  let devtools$1;
  let buffer = [];
  let devtoolsNotInstalled = false;
  function emit$1(event, ...args) {
    if (devtools$1) {
      devtools$1.emit(event, ...args);
    } else if (!devtoolsNotInstalled) {
      buffer.push({ event, args });
    }
  }
  function setDevtoolsHook$1(hook, target) {
    var _a, _b;
    devtools$1 = hook;
    if (devtools$1) {
      devtools$1.enabled = true;
      buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
      buffer = [];
    } else if (
      // handle late devtools injection - only do this if we are in an actual
      // browser environment to avoid the timer handle stalling test runner exit
      // (#4815)
      typeof window !== "undefined" && // some envs mock window but not fully
      window.HTMLElement && // also exclude jsdom
      // eslint-disable-next-line no-restricted-syntax
      !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
    ) {
      const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
      replay.push((newHook) => {
        setDevtoolsHook$1(newHook, target);
      });
      setTimeout(() => {
        if (!devtools$1) {
          target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
          devtoolsNotInstalled = true;
          buffer = [];
        }
      }, 3e3);
    } else {
      devtoolsNotInstalled = true;
      buffer = [];
    }
  }
  function devtoolsInitApp(app, version2) {
    emit$1("app:init", app, version2, {
      Fragment,
      Text,
      Comment,
      Static
    });
  }
  function devtoolsUnmountApp(app) {
    emit$1("app:unmount", app);
  }
  const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:added"
    /* COMPONENT_ADDED */
  );
  const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:updated"
    /* COMPONENT_UPDATED */
  );
  const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:removed"
    /* COMPONENT_REMOVED */
  );
  const devtoolsComponentRemoved = (component) => {
    if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
    !devtools$1.cleanupBuffer(component)) {
      _devtoolsComponentRemoved(component);
    }
  };
  // @__NO_SIDE_EFFECTS__
  function createDevtoolsComponentHook(hook) {
    return (component) => {
      emit$1(
        hook,
        component.appContext.app,
        component.uid,
        component.parent ? component.parent.uid : void 0,
        component
      );
    };
  }
  const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
    "perf:start"
    /* PERFORMANCE_START */
  );
  const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
    "perf:end"
    /* PERFORMANCE_END */
  );
  function createDevtoolsPerformanceHook(hook) {
    return (component, type, time) => {
      emit$1(hook, component.appContext.app, component.uid, component, type, time);
    };
  }
  function devtoolsComponentEmit(component, event, params) {
    emit$1(
      "component:emit",
      component.appContext.app,
      component,
      event,
      params
    );
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev2 = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev2;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx) return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      {
        devtoolsComponentUpdated(ctx);
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
      warn$1$1("Do not use built-in directive ids as custom directive id: " + name);
    }
  }
  function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) {
      warn$1$1(`withDirectives can only be used inside render functions.`);
      return vnode;
    }
    const instance = getComponentPublicInstance(currentRenderingInstance);
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i2 = 0; i2 < directives.length; i2++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i2];
      if (dir) {
        if (isFunction$1(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i2 = 0; i2 < bindings.length; i2++) {
      const binding = bindings[i2];
      if (oldBindings) {
        binding.oldValue = oldBindings[i2].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  function provide(key2, value) {
    {
      if (!currentInstance || currentInstance.isMounted) {
        warn$1$1(`provide() can only be used inside setup().`);
      }
    }
    if (currentInstance) {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key2] = value;
    }
  }
  function inject(key2, defaultValue, treatDefaultAsFactory = false) {
    const instance = getCurrentInstance();
    if (instance || currentApp) {
      let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
      if (provides && key2 in provides) {
        return provides[key2];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else {
        warn$1$1(`injection "${String(key2)}" not found.`);
      }
    } else {
      warn$1$1(`inject() can only be used inside setup() or functional components.`);
    }
  }
  const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      if (!ctx) {
        warn$1$1(
          `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
        );
      }
      return ctx;
    }
  };
  function watchEffect(effect2, options) {
    return doWatch(effect2, null, options);
  }
  function watch(source, cb, options) {
    if (!isFunction$1(cb)) {
      warn$1$1(
        `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
      );
    }
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, flush, once } = options;
    if (!cb) {
      if (immediate !== void 0) {
        warn$1$1(
          `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
        );
      }
      if (deep !== void 0) {
        warn$1$1(
          `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
        );
      }
      if (once !== void 0) {
        warn$1$1(
          `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
        );
      }
    }
    const baseWatchOptions = extend({}, options);
    baseWatchOptions.onWarn = warn$1$1;
    const runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else if (!runsImmediately) {
        const watchStopHandle = () => {
        };
        watchStopHandle.stop = NOOP;
        watchStopHandle.resume = NOOP;
        watchStopHandle.pause = NOOP;
        return watchStopHandle;
      }
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = false;
    if (flush === "post") {
      baseWatchOptions.scheduler = (job) => {
        queuePostRenderEffect(job, instance && instance.suspense);
      };
    } else if (flush !== "sync") {
      isPre = true;
      baseWatchOptions.scheduler = (job, isFirstRun) => {
        if (isFirstRun) {
          job();
        } else {
          queueJob(job);
        }
      };
    }
    baseWatchOptions.augmentJob = (job) => {
      if (cb) {
        job.flags |= 4;
      }
      if (isPre) {
        job.flags |= 2;
        if (instance) {
          job.id = instance.uid;
          job.i = instance;
        }
      }
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    if (isInSSRComponentSetup) {
      if (ssrCleanup) {
        ssrCleanup.push(watchHandle);
      } else if (runsImmediately) {
        watchHandle();
      }
    }
    return watchHandle;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction$1(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  function createPathGetter(ctx, path2) {
    const segments = path2.split(".");
    return () => {
      let cur = ctx;
      for (let i2 = 0; i2 < segments.length && cur; i2++) {
        cur = cur[segments[i2]];
      }
      return cur;
    };
  }
  const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
  const isTeleport = (type) => type.__isTeleport;
  const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
  const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
  const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
  const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
  const resolveTarget = (props, select) => {
    const targetSelector = props && props.to;
    if (isString$1(targetSelector)) {
      if (!select) {
        warn$1$1(
          `Current renderer does not support string target for Teleports. (missing querySelector renderer option)`
        );
        return null;
      } else {
        const target = select(targetSelector);
        if (!target && !isTeleportDisabled(props)) {
          warn$1$1(
            `Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`
          );
        }
        return target;
      }
    } else {
      if (!targetSelector && !isTeleportDisabled(props)) {
        warn$1$1(`Invalid Teleport target: ${targetSelector}`);
      }
      return targetSelector;
    }
  };
  const TeleportImpl = {
    name: "Teleport",
    __isTeleport: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
      const {
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        o: { insert, querySelector, createText, createComment }
      } = internals;
      const disabled = isTeleportDisabled(n2.props);
      let { shapeFlag, children, dynamicChildren } = n2;
      if (isHmrUpdating) {
        optimized = false;
        dynamicChildren = null;
      }
      if (n1 == null) {
        const placeholder = n2.el = createComment("teleport start");
        const mainAnchor = n2.anchor = createComment("teleport end");
        insert(placeholder, container, anchor);
        insert(mainAnchor, container, anchor);
        const mount = (container2, anchor2) => {
          if (shapeFlag & 16) {
            mountChildren(
              children,
              container2,
              anchor2,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        };
        const mountToTarget = () => {
          const target = n2.target = resolveTarget(n2.props, querySelector);
          const targetAnchor = prepareAnchor(target, n2, createText, insert);
          if (target) {
            if (namespace !== "svg" && isTargetSVG(target)) {
              namespace = "svg";
            } else if (namespace !== "mathml" && isTargetMathML(target)) {
              namespace = "mathml";
            }
            if (parentComponent && parentComponent.isCE) {
              (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set())).add(target);
            }
            if (!disabled) {
              mount(target, targetAnchor);
              updateCssVars(n2, false);
            }
          } else if (!disabled) {
            warn$1$1(
              "Invalid Teleport target on mount:",
              target,
              `(${typeof target})`
            );
          }
        };
        if (disabled) {
          mount(container, mainAnchor);
          updateCssVars(n2, true);
        }
        if (isTeleportDeferred(n2.props)) {
          n2.el.__isMounted = false;
          queuePostRenderEffect(() => {
            mountToTarget();
            delete n2.el.__isMounted;
          }, parentSuspense);
        } else {
          mountToTarget();
        }
      } else {
        if (isTeleportDeferred(n2.props) && n1.el.__isMounted === false) {
          queuePostRenderEffect(() => {
            TeleportImpl.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          }, parentSuspense);
          return;
        }
        n2.el = n1.el;
        n2.targetStart = n1.targetStart;
        const mainAnchor = n2.anchor = n1.anchor;
        const target = n2.target = n1.target;
        const targetAnchor = n2.targetAnchor = n1.targetAnchor;
        const wasDisabled = isTeleportDisabled(n1.props);
        const currentContainer = wasDisabled ? container : target;
        const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
        if (namespace === "svg" || isTargetSVG(target)) {
          namespace = "svg";
        } else if (namespace === "mathml" || isTargetMathML(target)) {
          namespace = "mathml";
        }
        if (dynamicChildren) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            currentContainer,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          traverseStaticChildren(n1, n2, false);
        } else if (!optimized) {
          patchChildren(
            n1,
            n2,
            currentContainer,
            currentAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            false
          );
        }
        if (disabled) {
          if (!wasDisabled) {
            moveTeleport(
              n2,
              container,
              mainAnchor,
              internals,
              1
            );
          } else {
            if (n2.props && n1.props && n2.props.to !== n1.props.to) {
              n2.props.to = n1.props.to;
            }
          }
        } else {
          if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
            const nextTarget = n2.target = resolveTarget(
              n2.props,
              querySelector
            );
            if (nextTarget) {
              moveTeleport(
                n2,
                nextTarget,
                null,
                internals,
                0
              );
            } else {
              warn$1$1(
                "Invalid Teleport target on update:",
                target,
                `(${typeof target})`
              );
            }
          } else if (wasDisabled) {
            moveTeleport(
              n2,
              target,
              targetAnchor,
              internals,
              1
            );
          }
        }
        updateCssVars(n2, disabled);
      }
    },
    remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
      const {
        shapeFlag,
        children,
        anchor,
        targetStart,
        targetAnchor,
        target,
        props
      } = vnode;
      if (target) {
        hostRemove(targetStart);
        hostRemove(targetAnchor);
      }
      doRemove && hostRemove(anchor);
      if (shapeFlag & 16) {
        const shouldRemove = doRemove || !isTeleportDisabled(props);
        for (let i2 = 0; i2 < children.length; i2++) {
          const child = children[i2];
          unmount(
            child,
            parentComponent,
            parentSuspense,
            shouldRemove,
            !!child.dynamicChildren
          );
        }
      }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
  };
  function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
    if (moveType === 0) {
      insert(vnode.targetAnchor, container, parentAnchor);
    }
    const { el, anchor, shapeFlag, children, props } = vnode;
    const isReorder = moveType === 2;
    if (isReorder) {
      insert(el, container, parentAnchor);
    }
    if (!isReorder || isTeleportDisabled(props)) {
      if (shapeFlag & 16) {
        for (let i2 = 0; i2 < children.length; i2++) {
          move(
            children[i2],
            container,
            parentAnchor,
            2
          );
        }
      }
    }
    if (isReorder) {
      insert(anchor, container, parentAnchor);
    }
  }
  function hydrateTeleport(node2, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
    o: { nextSibling, parentNode, querySelector, insert, createText }
  }, hydrateChildren) {
    function hydrateAnchor(target2, targetNode) {
      let targetAnchor = targetNode;
      while (targetAnchor) {
        if (targetAnchor && targetAnchor.nodeType === 8) {
          if (targetAnchor.data === "teleport start anchor") {
            vnode.targetStart = targetAnchor;
          } else if (targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        targetAnchor = nextSibling(targetAnchor);
      }
    }
    function hydrateDisabledTeleport(node22, vnode2) {
      vnode2.anchor = hydrateChildren(
        nextSibling(node22),
        vnode2,
        parentNode(node22),
        parentComponent,
        parentSuspense,
        slotScopeIds,
        optimized
      );
    }
    const target = vnode.target = resolveTarget(
      vnode.props,
      querySelector
    );
    const disabled = isTeleportDisabled(vnode.props);
    if (target) {
      const targetNode = target._lpa || target.firstChild;
      if (vnode.shapeFlag & 16) {
        if (disabled) {
          hydrateDisabledTeleport(node2, vnode);
          hydrateAnchor(target, targetNode);
          if (!vnode.targetAnchor) {
            prepareAnchor(
              target,
              vnode,
              createText,
              insert,
              // if target is the same as the main view, insert anchors before current node
              // to avoid hydrating mismatch
              parentNode(node2) === target ? node2 : null
            );
          }
        } else {
          vnode.anchor = nextSibling(node2);
          hydrateAnchor(target, targetNode);
          if (!vnode.targetAnchor) {
            prepareAnchor(target, vnode, createText, insert);
          }
          hydrateChildren(
            targetNode && nextSibling(targetNode),
            vnode,
            target,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
      }
      updateCssVars(vnode, disabled);
    } else if (disabled) {
      if (vnode.shapeFlag & 16) {
        hydrateDisabledTeleport(node2, vnode);
        vnode.targetStart = node2;
        vnode.targetAnchor = nextSibling(node2);
      }
    }
    return vnode.anchor && nextSibling(vnode.anchor);
  }
  const Teleport = TeleportImpl;
  function updateCssVars(vnode, isDisabled) {
    const ctx = vnode.ctx;
    if (ctx && ctx.ut) {
      let node2, anchor;
      if (isDisabled) {
        node2 = vnode.el;
        anchor = vnode.anchor;
      } else {
        node2 = vnode.targetStart;
        anchor = vnode.targetAnchor;
      }
      while (node2 && node2 !== anchor) {
        if (node2.nodeType === 1) node2.setAttribute("data-v-owner", ctx.uid);
        node2 = node2.nextSibling;
      }
      ctx.ut();
    }
  }
  function prepareAnchor(target, vnode, createText, insert, anchor = null) {
    const targetStart = vnode.targetStart = createText("");
    const targetAnchor = vnode.targetAnchor = createText("");
    targetStart[TeleportEndKey] = targetAnchor;
    if (target) {
      insert(targetStart, target, anchor);
      insert(targetAnchor, target, anchor);
    }
    return targetAnchor;
  }
  const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
  const enterCbKey$1 = /* @__PURE__ */ Symbol("_enterCb");
  function useTransitionState() {
    const state = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    onMounted(() => {
      state.isMounted = true;
    });
    onBeforeUnmount(() => {
      state.isUnmounting = true;
    });
    return state;
  }
  const TransitionHookValidator = [Function, Array];
  const BaseTransitionPropsValidators = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  };
  const recursiveGetSubtree = (instance) => {
    const subTree = instance.subTree;
    return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
  };
  const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: BaseTransitionPropsValidators,
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      return () => {
        const children = slots.default && getTransitionRawChildren(slots.default(), true);
        if (!children || !children.length) {
          return;
        }
        const child = findNonCommentChild(children);
        const rawProps = /* @__PURE__ */ toRaw(props);
        const { mode } = rawProps;
        if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
          warn$1$1(`invalid <transition> mode: ${mode}`);
        }
        if (state.isLeaving) {
          return emptyPlaceholder(child);
        }
        const innerChild = getInnerChild$1(child);
        if (!innerChild) {
          return emptyPlaceholder(child);
        }
        let enterHooks = resolveTransitionHooks(
          innerChild,
          rawProps,
          state,
          instance,
          // #11061, ensure enterHooks is fresh after clone
          (hooks) => enterHooks = hooks
        );
        if (innerChild.type !== Comment) {
          setTransitionHooks(innerChild, enterHooks);
        }
        let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
        if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(oldInnerChild, innerChild) && recursiveGetSubtree(instance).type !== Comment) {
          let leavingHooks = resolveTransitionHooks(
            oldInnerChild,
            rawProps,
            state,
            instance
          );
          setTransitionHooks(oldInnerChild, leavingHooks);
          if (mode === "out-in" && innerChild.type !== Comment) {
            state.isLeaving = true;
            leavingHooks.afterLeave = () => {
              state.isLeaving = false;
              if (!(instance.job.flags & 8)) {
                instance.update();
              }
              delete leavingHooks.afterLeave;
              oldInnerChild = void 0;
            };
            return emptyPlaceholder(child);
          } else if (mode === "in-out" && innerChild.type !== Comment) {
            leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
              const leavingVNodesCache = getLeavingNodesForType(
                state,
                oldInnerChild
              );
              leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
              el[leaveCbKey] = () => {
                earlyRemove();
                el[leaveCbKey] = void 0;
                delete enterHooks.delayedLeave;
                oldInnerChild = void 0;
              };
              enterHooks.delayedLeave = () => {
                delayedLeave();
                delete enterHooks.delayedLeave;
                oldInnerChild = void 0;
              };
            };
          } else {
            oldInnerChild = void 0;
          }
        } else if (oldInnerChild) {
          oldInnerChild = void 0;
        }
        return child;
      };
    }
  };
  function findNonCommentChild(children) {
    let child = children[0];
    if (children.length > 1) {
      let hasFound = false;
      for (const c2 of children) {
        if (c2.type !== Comment) {
          if (hasFound) {
            warn$1$1(
              "<transition> can only be used on a single element or component. Use <transition-group> for lists."
            );
            break;
          }
          child = c2;
          hasFound = true;
        }
      }
    }
    return child;
  }
  const BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = /* @__PURE__ */ Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  function resolveTransitionHooks(vnode, props, state, instance, postClone) {
    const {
      appear,
      mode,
      persisted = false,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onEnterCancelled,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
      onLeaveCancelled,
      onBeforeAppear,
      onAppear,
      onAfterAppear,
      onAppearCancelled
    } = props;
    const key2 = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook2 = (hook, args) => {
      hook && callWithAsyncErrorHandling(
        hook,
        instance,
        9,
        args
      );
    };
    const callAsyncHook = (hook, args) => {
      const done = args[1];
      callHook2(hook, args);
      if (isArray$2(hook)) {
        if (hook.every((hook2) => hook2.length <= 1)) done();
      } else if (hook.length <= 1) {
        done();
      }
    };
    const hooks = {
      mode,
      persisted,
      beforeEnter(el) {
        let hook = onBeforeEnter;
        if (!state.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el[leaveCbKey]) {
          el[leaveCbKey](
            true
            /* cancelled */
          );
        }
        const leavingVNode = leavingVNodesCache[key2];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
          leavingVNode.el[leaveCbKey]();
        }
        callHook2(hook, [el]);
      },
      enter(el) {
        if (leavingVNodesCache[key2] === vnode) return;
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        el[enterCbKey$1] = (cancelled) => {
          if (called) return;
          called = true;
          if (cancelled) {
            callHook2(cancelHook, [el]);
          } else {
            callHook2(afterHook, [el]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el[enterCbKey$1] = void 0;
        };
        const done = el[enterCbKey$1].bind(null, false);
        if (hook) {
          callAsyncHook(hook, [el, done]);
        } else {
          done();
        }
      },
      leave(el, remove2) {
        const key22 = String(vnode.key);
        if (el[enterCbKey$1]) {
          el[enterCbKey$1](
            true
            /* cancelled */
          );
        }
        if (state.isUnmounting) {
          return remove2();
        }
        callHook2(onBeforeLeave, [el]);
        let called = false;
        el[leaveCbKey] = (cancelled) => {
          if (called) return;
          called = true;
          remove2();
          if (cancelled) {
            callHook2(onLeaveCancelled, [el]);
          } else {
            callHook2(onAfterLeave, [el]);
          }
          el[leaveCbKey] = void 0;
          if (leavingVNodesCache[key22] === vnode) {
            delete leavingVNodesCache[key22];
          }
        };
        const done = el[leaveCbKey].bind(null, false);
        leavingVNodesCache[key22] = vnode;
        if (onLeave) {
          callAsyncHook(onLeave, [el, done]);
        } else {
          done();
        }
      },
      clone(vnode2) {
        const hooks2 = resolveTransitionHooks(
          vnode2,
          props,
          state,
          instance,
          postClone
        );
        if (postClone) postClone(hooks2);
        return hooks2;
      }
    };
    return hooks;
  }
  function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
      vnode = cloneVNode(vnode);
      vnode.children = null;
      return vnode;
    }
  }
  function getInnerChild$1(vnode) {
    if (!isKeepAlive(vnode)) {
      if (isTeleport(vnode.type) && vnode.children) {
        return findNonCommentChild(vnode.children);
      }
      return vnode;
    }
    if (vnode.component) {
      return vnode.component.subTree;
    }
    const { shapeFlag, children } = vnode;
    if (children) {
      if (shapeFlag & 16) {
        return children[0];
      }
      if (shapeFlag & 32 && isFunction$1(children.default)) {
        return children.default();
      }
    }
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      vnode.transition = hooks;
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function getTransitionRawChildren(children, keepComment = false, parentKey) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i2 = 0; i2 < children.length; i2++) {
      let child = children[i2];
      const key2 = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i2);
      if (child.type === Fragment) {
        if (child.patchFlag & 128) keyedFragmentCount++;
        ret = ret.concat(
          getTransitionRawChildren(child.children, keepComment, key2)
        );
      } else if (keepComment || child.type !== Comment) {
        ret.push(key2 != null ? cloneVNode(child, { key: key2 }) : child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i2 = 0; i2 < ret.length; i2++) {
        ret[i2].patchFlag = -2;
      }
    }
    return ret;
  }
  // @__NO_SIDE_EFFECTS__
  function defineComponent(options, extraOptions) {
    return isFunction$1(options) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
    ) : options;
  }
  function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
  }
  const knownTemplateRefs = /* @__PURE__ */ new WeakSet();
  function isTemplateRefKey(refs, key2) {
    let desc;
    return !!((desc = Object.getOwnPropertyDescriptor(refs, key2)) && !desc.configurable);
  }
  const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray$2(rawRef)) {
      rawRef.forEach(
        (r2, i2) => setRef(
          r2,
          oldRawRef && (isArray$2(oldRawRef) ? oldRawRef[i2] : oldRawRef),
          parentSuspense,
          vnode,
          isUnmount
        )
      );
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
        setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
      }
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref3 } = rawRef;
    if (!owner) {
      warn$1$1(
        `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
      );
      return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    const rawSetupState = /* @__PURE__ */ toRaw(setupState);
    const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key2) => {
      {
        if (hasOwn(rawSetupState, key2) && !/* @__PURE__ */ isRef(rawSetupState[key2])) {
          warn$1$1(
            `Template ref "${key2}" used on a non-ref value. It will not work in the production build.`
          );
        }
        if (knownTemplateRefs.has(rawSetupState[key2])) {
          return false;
        }
      }
      if (isTemplateRefKey(refs, key2)) {
        return false;
      }
      return hasOwn(rawSetupState, key2);
    };
    const canSetRef = (ref22, key2) => {
      if (knownTemplateRefs.has(ref22)) {
        return false;
      }
      if (key2 && isTemplateRefKey(refs, key2)) {
        return false;
      }
      return true;
    };
    if (oldRef != null && oldRef !== ref3) {
      invalidatePendingSetRef(oldRawRef);
      if (isString$1(oldRef)) {
        refs[oldRef] = null;
        if (canSetSetupRef(oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (/* @__PURE__ */ isRef(oldRef)) {
        const oldRawRefAtom = oldRawRef;
        if (canSetRef(oldRef, oldRawRefAtom.k)) {
          oldRef.value = null;
        }
        if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
      }
    }
    if (isFunction$1(ref3)) {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } else {
      const _isString = isString$1(ref3);
      const _isRef = /* @__PURE__ */ isRef(ref3);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef(ref3) || !rawRef.k ? ref3.value : refs[rawRef.k];
            if (isUnmount) {
              isArray$2(existing) && remove$1(existing, refValue);
            } else {
              if (!isArray$2(existing)) {
                if (_isString) {
                  refs[ref3] = [refValue];
                  if (canSetSetupRef(ref3)) {
                    setupState[ref3] = refs[ref3];
                  }
                } else {
                  const newVal = [refValue];
                  if (canSetRef(ref3, rawRef.k)) {
                    ref3.value = newVal;
                  }
                  if (rawRef.k) refs[rawRef.k] = newVal;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref3] = value;
            if (canSetSetupRef(ref3)) {
              setupState[ref3] = value;
            }
          } else if (_isRef) {
            if (canSetRef(ref3, rawRef.k)) {
              ref3.value = value;
            }
            if (rawRef.k) refs[rawRef.k] = value;
          } else {
            warn$1$1("Invalid template ref type:", ref3, `(${typeof ref3})`);
          }
        };
        if (value) {
          const job = () => {
            doSet();
            pendingSetRefMap.delete(rawRef);
          };
          job.id = -1;
          pendingSetRefMap.set(rawRef, job);
          queuePostRenderEffect(job, parentSuspense);
        } else {
          invalidatePendingSetRef(rawRef);
          doSet();
        }
      } else {
        warn$1$1("Invalid template ref type:", ref3, `(${typeof ref3})`);
      }
    }
  }
  function invalidatePendingSetRef(rawRef) {
    const pendingSetRef = pendingSetRefMap.get(rawRef);
    if (pendingSetRef) {
      pendingSetRef.flags |= 8;
      pendingSetRefMap.delete(rawRef);
    }
  }
  getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
  getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
  const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove$1(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    } else {
      const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
      warn$1$1(
        `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
      );
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp") {
      injectHook(lifecycle, (...args) => hook(...args), target);
    }
  };
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook(
    "bu"
  );
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook(
    "bum"
  );
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook(
    "sp"
  );
  const onRenderTriggered = createHook("rtg");
  const onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached2 = cache;
    const sourceIsArray = isArray$2(source);
    if (sourceIsArray || isString$1(source)) {
      const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
      let needsWrap = false;
      let isReadonlySource = false;
      if (sourceIsReactiveArray) {
        needsWrap = !/* @__PURE__ */ isShallow(source);
        isReadonlySource = /* @__PURE__ */ isReadonly(source);
        source = shallowReadArray(source);
      }
      ret = new Array(source.length);
      for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
        ret[i2] = renderItem(
          needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i2])) : toReactive(source[i2]) : source[i2],
          i2,
          void 0,
          cached2
        );
      }
    } else if (typeof source === "number") {
      if (!Number.isInteger(source) || source < 0) {
        warn$1$1(
          `The v-for range expects a positive integer value but got ${source}.`
        );
        ret = [];
      } else {
        ret = new Array(source);
        for (let i2 = 0; i2 < source; i2++) {
          ret[i2] = renderItem(i2 + 1, i2, void 0, cached2);
        }
      }
    } else if (isObject$2(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(
          source,
          (item, i2) => renderItem(item, i2, void 0, cached2)
        );
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
          const key2 = keys[i2];
          ret[i2] = renderItem(source[key2], key2, i2, cached2);
        }
      }
    } else {
      ret = [];
    }
    return ret;
  }
  const getPublicInstance = (i2) => {
    if (!i2) return null;
    if (isStatefulComponent(i2)) return getComponentPublicInstance(i2);
    return getPublicInstance(i2.parent);
  };
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: (i2) => i2,
      $el: (i2) => i2.vnode.el,
      $data: (i2) => i2.data,
      $props: (i2) => /* @__PURE__ */ shallowReadonly(i2.props),
      $attrs: (i2) => /* @__PURE__ */ shallowReadonly(i2.attrs),
      $slots: (i2) => /* @__PURE__ */ shallowReadonly(i2.slots),
      $refs: (i2) => /* @__PURE__ */ shallowReadonly(i2.refs),
      $parent: (i2) => getPublicInstance(i2.parent),
      $root: (i2) => getPublicInstance(i2.root),
      $host: (i2) => i2.ce,
      $emit: (i2) => i2.emit,
      $options: (i2) => resolveMergedOptions(i2),
      $forceUpdate: (i2) => i2.f || (i2.f = () => {
        queueJob(i2.update);
      }),
      $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
      $watch: (i2) => instanceWatch.bind(i2)
    })
  );
  const isReservedPrefix = (key2) => key2 === "_" || key2 === "$";
  const hasSetupBinding = (state, key2) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key2);
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key2) {
      if (key2 === "__v_skip") {
        return true;
      }
      const { ctx, setupState, data: data2, props, accessCache, type, appContext } = instance;
      if (key2 === "__isVue") {
        return true;
      }
      if (key2[0] !== "$") {
        const n2 = accessCache[key2];
        if (n2 !== void 0) {
          switch (n2) {
            case 1:
              return setupState[key2];
            case 2:
              return data2[key2];
            case 4:
              return ctx[key2];
            case 3:
              return props[key2];
          }
        } else if (hasSetupBinding(setupState, key2)) {
          accessCache[key2] = 1;
          return setupState[key2];
        } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key2)) {
          accessCache[key2] = 2;
          return data2[key2];
        } else if (hasOwn(props, key2)) {
          accessCache[key2] = 3;
          return props[key2];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key2)) {
          accessCache[key2] = 4;
          return ctx[key2];
        } else if (shouldCacheAccess) {
          accessCache[key2] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key2];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key2 === "$attrs") {
          track(instance.attrs, "get", "");
          markAttrsAccessed();
        } else if (key2 === "$slots") {
          track(instance, "get", key2);
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key2])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key2)) {
        accessCache[key2] = 4;
        return ctx[key2];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key2)
      ) {
        {
          return globalProperties[key2];
        }
      } else if (currentRenderingInstance && (!isString$1(key2) || // #1091 avoid internal isRef/isVNode checks on component instance leading
      // to infinite warning loop
      key2.indexOf("__v") !== 0)) {
        if (data2 !== EMPTY_OBJ && isReservedPrefix(key2[0]) && hasOwn(data2, key2)) {
          warn$1$1(
            `Property ${JSON.stringify(
              key2
            )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
          );
        } else if (instance === currentRenderingInstance) {
          warn$1$1(
            `Property ${JSON.stringify(key2)} was accessed during render but is not defined on instance.`
          );
        }
      }
    },
    set({ _: instance }, key2, value) {
      const { data: data2, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key2)) {
        setupState[key2] = value;
        return true;
      } else if (setupState.__isScriptSetup && hasOwn(setupState, key2)) {
        warn$1$1(`Cannot mutate <script setup> binding "${key2}" from Options API.`);
        return false;
      } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key2)) {
        data2[key2] = value;
        return true;
      } else if (hasOwn(instance.props, key2)) {
        warn$1$1(`Attempting to mutate prop "${key2}". Props are readonly.`);
        return false;
      }
      if (key2[0] === "$" && key2.slice(1) in instance) {
        warn$1$1(
          `Attempting to mutate public property "${key2}". Properties starting with $ are reserved and readonly.`
        );
        return false;
      } else {
        if (key2 in instance.appContext.config.globalProperties) {
          Object.defineProperty(ctx, key2, {
            enumerable: true,
            configurable: true,
            value
          });
        } else {
          ctx[key2] = value;
        }
      }
      return true;
    },
    has({
      _: { data: data2, setupState, accessCache, ctx, appContext, props, type }
    }, key2) {
      let cssModules;
      return !!(accessCache[key2] || data2 !== EMPTY_OBJ && key2[0] !== "$" && hasOwn(data2, key2) || hasSetupBinding(setupState, key2) || hasOwn(props, key2) || hasOwn(ctx, key2) || hasOwn(publicPropertiesMap, key2) || hasOwn(appContext.config.globalProperties, key2) || (cssModules = type.__cssModules) && cssModules[key2]);
    },
    defineProperty(target, key2, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key2] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key2, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key2, descriptor);
    }
  };
  {
    PublicInstanceProxyHandlers.ownKeys = (target) => {
      warn$1$1(
        `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
      );
      return Reflect.ownKeys(target);
    };
  }
  function createDevRenderContext(instance) {
    const target = {};
    Object.defineProperty(target, `_`, {
      configurable: true,
      enumerable: false,
      get: () => instance
    });
    Object.keys(publicPropertiesMap).forEach((key2) => {
      Object.defineProperty(target, key2, {
        configurable: true,
        enumerable: false,
        get: () => publicPropertiesMap[key2](instance),
        // intercepted by the proxy so no need for implementation,
        // but needed to prevent set errors
        set: NOOP
      });
    });
    return target;
  }
  function exposePropsOnRenderContext(instance) {
    const {
      ctx,
      propsOptions: [propsOptions]
    } = instance;
    if (propsOptions) {
      Object.keys(propsOptions).forEach((key2) => {
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          get: () => instance.props[key2],
          set: NOOP
        });
      });
    }
  }
  function exposeSetupStateOnRenderContext(instance) {
    const { ctx, setupState } = instance;
    Object.keys(/* @__PURE__ */ toRaw(setupState)).forEach((key2) => {
      if (!setupState.__isScriptSetup) {
        if (isReservedPrefix(key2[0])) {
          warn$1$1(
            `setup() return property ${JSON.stringify(
              key2
            )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
          );
          return;
        }
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          get: () => setupState[key2],
          set: NOOP
        });
      }
    });
  }
  function normalizePropsOrEmits(props) {
    return isArray$2(props) ? props.reduce(
      (normalized, p2) => (normalized[p2] = null, normalized),
      {}
    ) : props;
  }
  function createDuplicateChecker() {
    const cache = /* @__PURE__ */ Object.create(null);
    return (type, key2) => {
      if (cache[key2]) {
        warn$1$1(`${type} property "${key2}" is already defined in ${cache[key2]}.`);
      } else {
        cache[key2] = type;
      }
    };
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook$1(options.beforeCreate, instance, "bc");
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render: render2,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = createDuplicateChecker();
    {
      const [propsOptions] = instance.propsOptions;
      if (propsOptions) {
        for (const key2 in propsOptions) {
          checkDuplicateProperties("Props", key2);
        }
      }
    }
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key2 in methods) {
        const methodHandler = methods[key2];
        if (isFunction$1(methodHandler)) {
          {
            Object.defineProperty(ctx, key2, {
              value: methodHandler.bind(publicThis),
              configurable: true,
              enumerable: true,
              writable: true
            });
          }
          {
            checkDuplicateProperties("Methods", key2);
          }
        } else {
          warn$1$1(
            `Method "${key2}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
          );
        }
      }
    }
    if (dataOptions) {
      if (!isFunction$1(dataOptions)) {
        warn$1$1(
          `The data option must be a function. Plain object usage is no longer supported.`
        );
      }
      const data2 = dataOptions.call(publicThis, publicThis);
      if (isPromise(data2)) {
        warn$1$1(
          `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
        );
      }
      if (!isObject$2(data2)) {
        warn$1$1(`data() should return an object.`);
      } else {
        instance.data = /* @__PURE__ */ reactive(data2);
        {
          for (const key2 in data2) {
            checkDuplicateProperties("Data", key2);
            if (!isReservedPrefix(key2[0])) {
              Object.defineProperty(ctx, key2, {
                configurable: true,
                enumerable: true,
                get: () => data2[key2],
                set: NOOP
              });
            }
          }
        }
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key2 in computedOptions) {
        const opt = computedOptions[key2];
        const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        if (get2 === NOOP) {
          warn$1$1(`Computed property "${key2}" has no getter.`);
        }
        const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : () => {
          warn$1$1(
            `Write operation failed: computed property "${key2}" is readonly.`
          );
        };
        const c2 = computed({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          get: () => c2.value,
          set: (v2) => c2.value = v2
        });
        {
          checkDuplicateProperties("Computed", key2);
        }
      }
    }
    if (watchOptions) {
      for (const key2 in watchOptions) {
        createWatcher(watchOptions[key2], ctx, publicThis, key2);
      }
    }
    if (provideOptions) {
      const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key2) => {
        provide(key2, provides[key2]);
      });
    }
    if (created) {
      callHook$1(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray$2(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray$2(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key2) => {
          Object.defineProperty(exposed, key2, {
            get: () => publicThis[key2],
            set: (val) => publicThis[key2] = val,
            enumerable: true
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render2 && instance.render === NOOP) {
      instance.render = render2;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
    if (serverPrefetch) {
      markAsyncBoundary(instance);
    }
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray$2(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key2 in injectOptions) {
      const opt = injectOptions[key2];
      let injected;
      if (isObject$2(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key2,
            opt.default,
            true
          );
        } else {
          injected = inject(opt.from || key2);
        }
      } else {
        injected = inject(opt);
      }
      if (/* @__PURE__ */ isRef(injected)) {
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        ctx[key2] = injected;
      }
      {
        checkDuplicateProperties("Inject", key2);
      }
    }
  }
  function callHook$1(hook, instance, type) {
    callWithAsyncErrorHandling(
      isArray$2(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
      instance,
      type
    );
  }
  function createWatcher(raw, ctx, publicThis, key2) {
    let getter = key2.includes(".") ? createPathGetter(publicThis, key2) : () => publicThis[key2];
    if (isString$1(raw)) {
      const handler = ctx[raw];
      if (isFunction$1(handler)) {
        {
          watch(getter, handler);
        }
      } else {
        warn$1$1(`Invalid watch handler specified by key "${raw}"`, handler);
      }
    } else if (isFunction$1(raw)) {
      {
        watch(getter, raw.bind(publicThis));
      }
    } else if (isObject$2(raw)) {
      if (isArray$2(raw)) {
        raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key2));
      } else {
        const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction$1(handler)) {
          watch(getter, handler, raw);
        } else {
          warn$1$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
        }
      }
    } else {
      warn$1$1(`Invalid watch option: "${key2}"`, raw);
    }
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached2 = cache.get(base);
    let resolved;
    if (cached2) {
      resolved = cached2;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(
          (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
        );
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject$2(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from2, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from2;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(
        (m2) => mergeOptions(to, m2, strats, true)
      );
    }
    for (const key2 in from2) {
      if (asMixin && key2 === "expose") {
        warn$1$1(
          `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
        );
      } else {
        const strat = internalOptionMergeStrats[key2] || strats && strats[key2];
        to[key2] = strat ? strat(to[key2], from2[key2]) : from2[key2];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from2) {
    if (!from2) {
      return to;
    }
    if (!to) {
      return from2;
    }
    return function mergedDataFn() {
      return extend(
        isFunction$1(to) ? to.call(this, this) : to,
        isFunction$1(from2) ? from2.call(this, this) : from2
      );
    };
  }
  function mergeInject(to, from2) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from2));
  }
  function normalizeInject(raw) {
    if (isArray$2(raw)) {
      const res = {};
      for (let i2 = 0; i2 < raw.length; i2++) {
        res[raw[i2]] = raw[i2];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from2) {
    return to ? [...new Set([].concat(to, from2))] : from2;
  }
  function mergeObjectOptions(to, from2) {
    return to ? extend(/* @__PURE__ */ Object.create(null), to, from2) : from2;
  }
  function mergeEmitsOrPropsOptions(to, from2) {
    if (to) {
      if (isArray$2(to) && isArray$2(from2)) {
        return [.../* @__PURE__ */ new Set([...to, ...from2])];
      }
      return extend(
        /* @__PURE__ */ Object.create(null),
        normalizePropsOrEmits(to),
        normalizePropsOrEmits(from2 != null ? from2 : {})
      );
    } else {
      return from2;
    }
  }
  function mergeWatchOptions(to, from2) {
    if (!to) return from2;
    if (!from2) return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key2 in from2) {
      merged[key2] = mergeAsArray(to[key2], from2[key2]);
    }
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
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
  let uid$1 = 0;
  function createAppAPI(render2, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction$1(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject$2(rootProps)) {
        warn$1$1(`root props passed to app.mount() must be an object.`);
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new WeakSet();
      const pluginCleanupFns = [];
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version: version$1,
        get config() {
          return context.config;
        },
        set config(v2) {
          {
            warn$1$1(
              `app.config cannot be replaced. Modify individual options instead.`
            );
          }
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) {
            warn$1$1(`Plugin has already been applied to target app.`);
          } else if (plugin && isFunction$1(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction$1(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else {
            warn$1$1(
              `A plugin must either be a function or an object with an "install" function.`
            );
          }
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            } else {
              warn$1$1(
                "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
              );
            }
          }
          return app;
        },
        component(name, component) {
          {
            validateComponentName(name, context.config);
          }
          if (!component) {
            return context.components[name];
          }
          if (context.components[name]) {
            warn$1$1(`Component "${name}" has already been registered in target app.`);
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          {
            validateDirectiveName(name);
          }
          if (!directive) {
            return context.directives[name];
          }
          if (context.directives[name]) {
            warn$1$1(`Directive "${name}" has already been registered in target app.`);
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            if (rootContainer.__vue_app__) {
              warn$1$1(
                `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
              );
            }
            const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            {
              context.reload = () => {
                const cloned = cloneVNode(vnode);
                cloned.el = null;
                render2(cloned, rootContainer, namespace);
              };
            }
            {
              render2(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            {
              app._instance = vnode.component;
              devtoolsInitApp(app, version$1);
            }
            return getComponentPublicInstance(vnode.component);
          } else {
            warn$1$1(
              `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
            );
          }
        },
        onUnmount(cleanupFn) {
          if (typeof cleanupFn !== "function") {
            warn$1$1(
              `Expected function as first argument to app.onUnmount(), but got ${typeof cleanupFn}`
            );
          }
          pluginCleanupFns.push(cleanupFn);
        },
        unmount() {
          if (isMounted) {
            callWithAsyncErrorHandling(
              pluginCleanupFns,
              app._instance,
              16
            );
            render2(null, app._container);
            {
              app._instance = null;
              devtoolsUnmountApp(app);
            }
            delete app._container.__vue_app__;
          } else {
            warn$1$1(`Cannot unmount an app that is not mounted.`);
          }
        },
        provide(key2, value) {
          if (key2 in context.provides) {
            if (hasOwn(context.provides, key2)) {
              warn$1$1(
                `App already provides property with key "${String(key2)}". It will be overwritten with the new value.`
              );
            } else {
              warn$1$1(
                `App already provides property with key "${String(key2)}" inherited from its parent element. It will be overwritten with the new value.`
              );
            }
          }
          context.provides[key2] = value;
          return app;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    };
  }
  let currentApp = null;
  const getModelModifiers = (props, modelName) => {
    return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  };
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted) return;
    const props = instance.vnode.props || EMPTY_OBJ;
    {
      const {
        emitsOptions,
        propsOptions: [propsOptions]
      } = instance;
      if (emitsOptions) {
        if (!(event in emitsOptions) && true) {
          if (!propsOptions || !(toHandlerKey(camelize(event)) in propsOptions)) {
            warn$1$1(
              `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(camelize(event))}" prop.`
            );
          }
        } else {
          const validator2 = emitsOptions[event];
          if (isFunction$1(validator2)) {
            const isValid2 = validator2(...rawArgs);
            if (!isValid2) {
              warn$1$1(
                `Invalid event arguments: event validation failed for event "${event}".`
              );
            }
          }
        }
      }
    }
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    if (modifiers) {
      if (modifiers.trim) {
        args = rawArgs.map((a2) => isString$1(a2) ? a2.trim() : a2);
      }
      if (modifiers.number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    {
      devtoolsComponentEmit(instance, event, args);
    }
    {
      const lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
        warn$1$1(
          `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
            instance,
            instance.type
          )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
            event
          )}" instead of "${event}".`
        );
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(
        handler,
        instance,
        6,
        args
      );
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(
        onceHandler,
        instance,
        6,
        args
      );
    }
  }
  const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
    const cached2 = cache.get(comp);
    if (cached2 !== void 0) {
      return cached2;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction$1(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject$2(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray$2(raw)) {
      raw.forEach((key2) => normalized[key2] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject$2(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key2) {
    if (!options || !isOn(key2)) {
      return false;
    }
    key2 = key2.slice(2).replace(/Once$/, "");
    return hasOwn(options, key2[0].toLowerCase() + key2.slice(1)) || hasOwn(options, hyphenate(key2)) || hasOwn(options, key2);
  }
  let accessedAttrs = false;
  function markAttrsAccessed() {
    accessedAttrs = true;
  }
  function renderComponentRoot(instance) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render: render2,
      renderCache,
      props,
      data: data2,
      setupState,
      ctx,
      inheritAttrs
    } = instance;
    const prev2 = setCurrentRenderingInstance(instance);
    let result2;
    let fallthroughAttrs;
    {
      accessedAttrs = false;
    }
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse, {
          get(target, key2, receiver) {
            warn$1$1(
              `Property '${String(
                key2
              )}' was accessed via 'this'. Avoid using 'this' in templates.`
            );
            return Reflect.get(target, key2, receiver);
          }
        }) : proxyToUse;
        result2 = normalizeVNode(
          render2.call(
            thisProxy,
            proxyToUse,
            renderCache,
            true ? /* @__PURE__ */ shallowReadonly(props) : props,
            setupState,
            data2,
            ctx
          )
        );
        fallthroughAttrs = attrs;
      } else {
        const render22 = Component;
        if (attrs === props) {
          markAttrsAccessed();
        }
        result2 = normalizeVNode(
          render22.length > 1 ? render22(
            true ? /* @__PURE__ */ shallowReadonly(props) : props,
            true ? {
              get attrs() {
                markAttrsAccessed();
                return /* @__PURE__ */ shallowReadonly(attrs);
              },
              slots,
              emit: emit2
            } : { attrs, slots, emit: emit2 }
          ) : render22(
            true ? /* @__PURE__ */ shallowReadonly(props) : props,
            null
          )
        );
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result2 = createVNode(Comment);
    }
    let root2 = result2;
    let setRoot = void 0;
    if (result2.patchFlag > 0 && result2.patchFlag & 2048) {
      [root2, setRoot] = getChildRoot(result2);
    }
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root2;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(
              fallthroughAttrs,
              propsOptions
            );
          }
          root2 = cloneVNode(root2, fallthroughAttrs, false, true);
        } else if (!accessedAttrs && root2.type !== Comment) {
          const allAttrs = Object.keys(attrs);
          const eventAttrs = [];
          const extraAttrs = [];
          for (let i2 = 0, l2 = allAttrs.length; i2 < l2; i2++) {
            const key2 = allAttrs[i2];
            if (isOn(key2)) {
              if (!isModelListener(key2)) {
                eventAttrs.push(key2[2].toLowerCase() + key2.slice(3));
              }
            } else {
              extraAttrs.push(key2);
            }
          }
          if (extraAttrs.length) {
            warn$1$1(
              `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
            );
          }
          if (eventAttrs.length) {
            warn$1$1(
              `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
            );
          }
        }
      }
    }
    if (vnode.dirs) {
      if (!isElementRoot(root2)) {
        warn$1$1(
          `Runtime directive used on component with non-element root node. The directives will not function as intended.`
        );
      }
      root2 = cloneVNode(root2, null, false, true);
      root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      if (!isElementRoot(root2)) {
        warn$1$1(
          `Component inside <Transition> renders non-element root node that cannot be animated.`
        );
      }
      setTransitionHooks(root2, vnode.transition);
    }
    if (setRoot) {
      setRoot(root2);
    } else {
      result2 = root2;
    }
    setCurrentRenderingInstance(prev2);
    return result2;
  }
  const getChildRoot = (vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren, false);
    if (!childRoot) {
      return [vnode, void 0];
    } else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
      return getChildRoot(childRoot);
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot) => {
      rawChildren[index] = updatedRoot;
      if (dynamicChildren) {
        if (dynamicIndex > -1) {
          dynamicChildren[dynamicIndex] = updatedRoot;
        } else if (updatedRoot.patchFlag > 0) {
          vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
        }
      }
    };
    return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children, recurse = true) {
    let singleRoot;
    for (let i2 = 0; i2 < children.length; i2++) {
      const child = children[i2];
      if (isVNode(child)) {
        if (child.type !== Comment || child.children === "v-if") {
          if (singleRoot) {
            return;
          } else {
            singleRoot = child;
            if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
              return filterSingleRoot(singleRoot.children);
            }
          }
        }
      } else {
        return;
      }
    }
    return singleRoot;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key2 in attrs) {
      if (key2 === "class" || key2 === "style" || isOn(key2)) {
        (res || (res = {}))[key2] = attrs[key2];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key2 in attrs) {
      if (!isModelListener(key2) || !(key2.slice(9) in props)) {
        res[key2] = attrs[key2];
      }
    }
    return res;
  };
  const isElementRoot = (vnode) => {
    return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if ((prevChildren || nextChildren) && isHmrUpdating) {
      return true;
    }
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i2 = 0; i2 < dynamicProps.length; i2++) {
          const key2 = dynamicProps[i2];
          if (hasPropValueChanged(nextProps, prevProps, key2) && !isEmitListener(emits, key2)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i2 = 0; i2 < nextKeys.length; i2++) {
      const key2 = nextKeys[i2];
      if (hasPropValueChanged(nextProps, prevProps, key2) && !isEmitListener(emitsOptions, key2)) {
        return true;
      }
    }
    return false;
  }
  function hasPropValueChanged(nextProps, prevProps, key2) {
    const nextProp = nextProps[key2];
    const prevProp = prevProps[key2];
    if (key2 === "style" && isObject$2(nextProp) && isObject$2(prevProp)) {
      return !looseEqual(nextProp, prevProp);
    }
    return nextProp !== prevProp;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent) {
      const root2 = parent.subTree;
      if (root2.suspense && root2.suspense.activeBranch === vnode) {
        root2.el = vnode.el;
      }
      if (root2 === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
  }
  const internalObjectProto = {};
  const createInternalObject = () => Object.create(internalObjectProto);
  const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = createInternalObject();
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key2 in instance.propsOptions[0]) {
      if (!(key2 in props)) {
        props[key2] = void 0;
      }
    }
    {
      validateProps(rawProps || {}, props, instance);
    }
    if (isStateful) {
      instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function isInHmrContext(instance) {
    while (instance) {
      if (instance.type.__hmrId) return true;
      instance = instance.parent;
    }
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance;
    const rawCurrentProps = /* @__PURE__ */ toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
          let key2 = propsToUpdate[i2];
          if (isEmitListener(instance.emitsOptions, key2)) {
            continue;
          }
          const value = rawProps[key2];
          if (options) {
            if (hasOwn(attrs, key2)) {
              if (value !== attrs[key2]) {
                attrs[key2] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key2);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
              );
            }
          } else {
            if (value !== attrs[key2]) {
              attrs[key2] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key2 in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn(rawProps, key2) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key2)) === key2 || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key2] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key2] = resolvePropValue(
                options,
                rawCurrentProps,
                key2,
                void 0,
                instance,
                true
              );
            }
          } else {
            delete props[key2];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key2 in attrs) {
          if (!rawProps || !hasOwn(rawProps, key2) && true) {
            delete attrs[key2];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance.attrs, "set", "");
    }
    {
      validateProps(rawProps || {}, props, instance);
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key2 in rawProps) {
        if (isReservedProp(key2)) {
          continue;
        }
        const value = rawProps[key2];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key2))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key2)) {
          if (!(key2 in attrs) || value !== attrs[key2]) {
            attrs[key2] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = /* @__PURE__ */ toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i2 = 0; i2 < needCastKeys.length; i2++) {
        const key2 = needCastKeys[i2];
        props[key2] = resolvePropValue(
          options,
          rawCurrentProps,
          key2,
          castValues[key2],
          instance,
          !hasOwn(castValues, key2)
        );
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key2, value, instance, isAbsent) {
    const opt = options[key2];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction$1(defaultValue)) {
          const { propsDefaults } = instance;
          if (key2 in propsDefaults) {
            value = propsDefaults[key2];
          } else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key2] = defaultValue.call(
              null,
              props
            );
            reset();
          }
        } else {
          value = defaultValue;
        }
        if (instance.ce) {
          instance.ce._setProp(key2, value);
        }
      }
      if (opt[
        0
        /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* shouldCastTrue */
        ] && (value === "" || value === hyphenate(key2))) {
          value = true;
        }
      }
    }
    return value;
  }
  const mixinPropsCache = /* @__PURE__ */ new WeakMap();
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinPropsCache : appContext.propsCache;
    const cached2 = cache.get(comp);
    if (cached2) {
      return cached2;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction$1(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys) needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject$2(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray$2(raw)) {
      for (let i2 = 0; i2 < raw.length; i2++) {
        if (!isString$1(raw[i2])) {
          warn$1$1(`props must be strings when using array syntax.`, raw[i2]);
        }
        const normalizedKey = camelize(raw[i2]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      if (!isObject$2(raw)) {
        warn$1$1(`invalid props options`, raw);
      }
      for (const key2 in raw) {
        const normalizedKey = camelize(key2);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key2];
          const prop = normalized[normalizedKey] = isArray$2(opt) || isFunction$1(opt) ? { type: opt } : extend({}, opt);
          const propType = prop.type;
          let shouldCast = false;
          let shouldCastTrue = true;
          if (isArray$2(propType)) {
            for (let index = 0; index < propType.length; ++index) {
              const type = propType[index];
              const typeName = isFunction$1(type) && type.name;
              if (typeName === "Boolean") {
                shouldCast = true;
                break;
              } else if (typeName === "String") {
                shouldCastTrue = false;
              }
            }
          } else {
            shouldCast = isFunction$1(propType) && propType.name === "Boolean";
          }
          prop[
            0
            /* shouldCast */
          ] = shouldCast;
          prop[
            1
            /* shouldCastTrue */
          ] = shouldCastTrue;
          if (shouldCast || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject$2(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key2) {
    if (key2[0] !== "$" && !isReservedProp(key2)) {
      return true;
    } else {
      warn$1$1(`Invalid prop name: "${key2}" is a reserved property.`);
    }
    return false;
  }
  function getType(ctor) {
    if (ctor === null) {
      return "null";
    }
    if (typeof ctor === "function") {
      return ctor.name || "";
    } else if (typeof ctor === "object") {
      const name = ctor.constructor && ctor.constructor.name;
      return name || "";
    }
    return "";
  }
  function validateProps(rawProps, props, instance) {
    const resolvedValues = /* @__PURE__ */ toRaw(props);
    const options = instance.propsOptions[0];
    const camelizePropsKey = Object.keys(rawProps).map((key2) => camelize(key2));
    for (const key2 in options) {
      let opt = options[key2];
      if (opt == null) continue;
      validateProp(
        key2,
        resolvedValues[key2],
        opt,
        /* @__PURE__ */ shallowReadonly(resolvedValues),
        !camelizePropsKey.includes(key2)
      );
    }
  }
  function validateProp(name, value, prop, props, isAbsent) {
    const { type, required, validator: validator2, skipCheck } = prop;
    if (required && isAbsent) {
      warn$1$1('Missing required prop: "' + name + '"');
      return;
    }
    if (value == null && !required) {
      return;
    }
    if (type != null && type !== true && !skipCheck) {
      let isValid2 = false;
      const types = isArray$2(type) ? type : [type];
      const expectedTypes = [];
      for (let i2 = 0; i2 < types.length && !isValid2; i2++) {
        const { valid, expectedType } = assertType(value, types[i2]);
        expectedTypes.push(expectedType || "");
        isValid2 = valid;
      }
      if (!isValid2) {
        warn$1$1(getInvalidTypeMessage(name, value, expectedTypes));
        return;
      }
    }
    if (validator2 && !validator2(value, props)) {
      warn$1$1('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
  }
  const isSimpleType = /* @__PURE__ */ makeMap(
    "String,Number,Boolean,Function,Symbol,BigInt"
  );
  function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (expectedType === "null") {
      valid = value === null;
    } else if (isSimpleType(expectedType)) {
      const t2 = typeof value;
      valid = t2 === expectedType.toLowerCase();
      if (!valid && t2 === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isObject$2(value);
    } else if (expectedType === "Array") {
      valid = isArray$2(value);
    } else {
      valid = value instanceof type;
    }
    return {
      valid,
      expectedType
    };
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    if (expectedTypes.length === 0) {
      return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
    }
    let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
      message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    if (isExplicable(receivedType)) {
      message += `with value ${receivedValue}.`;
    }
    return message;
  }
  function styleValue(value, type) {
    if (type === "String") {
      return `"${value}"`;
    } else if (type === "Number") {
      return `${Number(value)}`;
    } else {
      return `${value}`;
    }
  }
  function isExplicable(type) {
    const explicitTypes = ["string", "number", "boolean"];
    return explicitTypes.some((elem) => type.toLowerCase() === elem);
  }
  function isBoolean(...args) {
    return args.some((elem) => elem.toLowerCase() === "boolean");
  }
  const isInternalKey = (key2) => key2 === "_" || key2 === "_ctx" || key2 === "$stable";
  const normalizeSlotValue = (value) => isArray$2(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot = (key2, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (currentInstance && !(ctx === null && currentRenderingInstance) && !(ctx && ctx.root !== currentInstance.root)) {
        warn$1$1(
          `Slot "${key2}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
        );
      }
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key2 in rawSlots) {
      if (isInternalKey(key2)) continue;
      const value = rawSlots[key2];
      if (isFunction$1(value)) {
        slots[key2] = normalizeSlot(key2, value, ctx);
      } else if (value != null) {
        {
          warn$1$1(
            `Non-function value encountered for slot "${key2}". Prefer function slots for better performance.`
          );
        }
        const normalized = normalizeSlotValue(value);
        slots[key2] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    if (!isKeepAlive(instance.vnode) && true) {
      warn$1$1(
        `Non-function value encountered for default slot. Prefer function slots for better performance.`
      );
    }
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const assignSlots = (slots, children, optimized) => {
    for (const key2 in children) {
      if (optimized || !isInternalKey(key2)) {
        slots[key2] = children[key2];
      }
    }
  };
  const initSlots = (instance, children, optimized) => {
    const slots = instance.slots = createInternalObject();
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        assignSlots(slots, children, optimized);
        if (optimized) {
          def(slots, "_", type, true);
        }
      } else {
        normalizeObjectSlots(children, slots);
      }
    } else if (children) {
      normalizeVNodeSlots(instance, children);
    }
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (isHmrUpdating) {
          assignSlots(slots, children, optimized);
          trigger(instance, "set", "$slots");
        } else if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          assignSlots(slots, children, optimized);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key2 in slots) {
        if (!isInternalKey(key2) && deletionComparisonTarget[key2] == null) {
          delete slots[key2];
        }
      }
    }
  };
  let supported;
  let perf;
  function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      perf.mark(`vue-${type}-${instance.uid}`);
    }
    {
      devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      const startTag = `vue-${type}-${instance.uid}`;
      const endTag = startTag + `:end`;
      const measureName = `<${formatComponentName(instance, instance.type)}> ${type}`;
      perf.mark(endTag);
      perf.measure(measureName, startTag, endTag);
      perf.clearMeasures(measureName);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
    }
    {
      devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  function isSupported() {
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function initFeatureFlags() {
    const needWarn = [];
    if (needWarn.length) {
      const multi = needWarn.length > 1;
      console.warn(
        `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
      );
    }
  }
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    {
      initFeatureFlags();
    }
    const target = getGlobalThis();
    target.__VUE__ = true;
    {
      setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref3, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          } else {
            patchStaticNode(n1, n2, container, namespace);
          }
          break;
        case Fragment:
          processFragment(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          break;
        default:
          if (shapeFlag & 1) {
            processElement(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 6) {
            processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 64) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (shapeFlag & 128) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else {
            warn$1$1("Invalid VNode type:", type, `(${typeof type})`);
          }
      }
      if (ref3 != null && parentComponent) {
        setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      } else if (ref3 == null && n1 && n1.ref != null) {
        setRef(n1.ref, null, parentSuspense, n1, true);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateText(n2.children),
          container,
          anchor
        );
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateComment(n2.children || ""),
          container,
          anchor
        );
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace,
        n2.el,
        n2.anchor
      );
    };
    const patchStaticNode = (n1, n2, container, namespace) => {
      if (n2.children !== n1.children) {
        const anchor = hostNextSibling(n1.anchor);
        removeStaticNode(n1);
        [n2.el, n2.anchor] = hostInsertStaticContent(
          n2.children,
          container,
          anchor,
          namespace
        );
      } else {
        n2.el = n1.el;
        n2.anchor = n1.anchor;
      }
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next2;
      while (el && el !== anchor) {
        next2 = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next2;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next2;
      while (el && el !== anchor) {
        next2 = hostNextSibling(el);
        hostRemove(el);
        el = next2;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
        try {
          if (customElement) {
            customElement._beginPatch();
          }
          patchElement(
            n1,
            n2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } finally {
          if (customElement) {
            customElement._endPatch();
          }
        }
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(
        vnode.type,
        namespace,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(vnode, namespace),
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key2 in props) {
          if (key2 !== "value" && !isReservedProp(key2)) {
            hostPatchProp(el, key2, null, props[key2], namespace, parentComponent);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      {
        def(el, "__vnode", vnode, true);
        def(el, "__vueParentComponent", parentComponent, true);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
          hostSetScopeId(el, slotScopeIds[i2]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
          subTree = filterSingleRoot(subTree.children) || subTree;
        }
        if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
          const parentVNode = parentComponent.vnode;
          setScopeId(
            el,
            parentVNode,
            parentVNode.scopeId,
            parentVNode.slotScopeIds,
            parentComponent.parent
          );
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i2 = start; i2 < children.length; i2++) {
        const child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
        patch(
          null,
          child,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      {
        el.__vnode = n2;
      }
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (isHmrUpdating) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
        hostSetElementText(el, "");
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          el,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds
        );
        {
          traverseStaticChildren(n1, n2);
        }
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds,
          false
        );
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, oldProps, newProps, parentComponent, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
              const key2 = propsToUpdate[i2];
              const prev2 = oldProps[key2];
              const next2 = newProps[key2];
              if (next2 !== prev2 || key2 === "value") {
                hostPatchProp(el, key2, prev2, next2, namespace, parentComponent);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i2 = 0; i2 < newChildren.length; i2++) {
        const oldVNode = oldChildren[i2];
        const newVNode = newChildren[i2];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(
          oldVNode,
          newVNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          true
        );
      }
    };
    const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key2 in oldProps) {
            if (!isReservedProp(key2) && !(key2 in newProps)) {
              hostPatchProp(
                el,
                key2,
                oldProps[key2],
                null,
                namespace,
                parentComponent
              );
            }
          }
        }
        for (const key2 in newProps) {
          if (isReservedProp(key2)) continue;
          const next2 = newProps[key2];
          const prev2 = oldProps[key2];
          if (next2 !== prev2 && key2 !== "value") {
            hostPatchProp(el, key2, prev2, next2, namespace, parentComponent);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (
        // #5523 dev root fragment may inherit directives
        isHmrUpdating || patchFlag & 2048
      ) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(
          // #10007
          // such fragment like `<></>` will be compiled into
          // a fragment which doesn't have a children.
          // In this case fallback to an empty array
          n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            container,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          {
            traverseStaticChildren(n1, n2);
          }
        } else {
          patchChildren(
            n1,
            n2,
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(
            n2,
            container,
            anchor,
            namespace,
            optimized
          );
        } else {
          mountComponent(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            optimized
          );
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance = initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      );
      if (instance.type.__hmrId) {
        registerHMR(instance);
      }
      {
        pushWarningContext(initialVNode);
        startMeasure(instance, `mount`);
      }
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        {
          startMeasure(instance, `init`);
        }
        setupComponent(instance, false, optimized);
        {
          endMeasure(instance, `init`);
        }
      }
      if (isHmrUpdating) initialVNode.el = null;
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
          initialVNode.placeholder = placeholder.el;
        }
      } else {
        setupRenderEffect(
          instance,
          initialVNode,
          container,
          anchor,
          parentSuspense,
          namespace,
          optimized
        );
      }
      {
        popWarningContext();
        endMeasure(instance, `mount`);
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          {
            pushWarningContext(n2);
          }
          updateComponentPreRender(instance, n2, optimized);
          {
            popWarningContext();
          }
          return;
        } else {
          instance.next = n2;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m: m2, parent, root: root2, type } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          {
            if (root2.ce && root2.ce._hasShadowRoot()) {
              root2.ce._injectChildStyle(
                type,
                instance.parent ? instance.parent.type : void 0
              );
            }
            {
              startMeasure(instance, `render`);
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            {
              startMeasure(instance, `patch`);
            }
            patch(
              null,
              subTree,
              container,
              anchor,
              instance,
              parentSuspense,
              namespace
            );
            {
              endMeasure(instance, `patch`);
            }
            initialVNode.el = subTree.el;
          }
          if (m2) {
            queuePostRenderEffect(m2, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
              parentSuspense
            );
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          {
            devtoolsComponentAdded(instance);
          }
          initialVNode = container = anchor = null;
        } else {
          let { next: next2, bu, u: u2, parent, vnode } = instance;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next2) {
                next2.el = vnode.el;
                updateComponentPreRender(instance, next2, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                queuePostRenderEffect(() => {
                  if (!instance.isUnmounted) update();
                }, parentSuspense);
              });
              return;
            }
          }
          let originNext = next2;
          let vnodeHook;
          {
            pushWarningContext(next2 || instance.vnode);
          }
          toggleRecurse(instance, false);
          if (next2) {
            next2.el = vnode.el;
            updateComponentPreRender(instance, next2, optimized);
          } else {
            next2 = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next2.props && next2.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next2, vnode);
          }
          toggleRecurse(instance, true);
          {
            startMeasure(instance, `render`);
          }
          const nextTree = renderComponentRoot(instance);
          {
            endMeasure(instance, `render`);
          }
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          {
            startMeasure(instance, `patch`);
          }
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            namespace
          );
          {
            endMeasure(instance, `patch`);
          }
          next2.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u2) {
            queuePostRenderEffect(u2, parentSuspense);
          }
          if (vnodeHook = next2.props && next2.props.onVnodeUpdated) {
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, next2, vnode),
              parentSuspense
            );
          }
          {
            devtoolsComponentUpdated(instance);
          }
          {
            popWarningContext();
          }
        }
      };
      instance.scope.on();
      const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
      instance.scope.off();
      const update = instance.update = effect2.run.bind(effect2);
      const job = instance.job = effect2.runIfDirty.bind(effect2);
      job.i = instance;
      job.id = instance.uid;
      effect2.scheduler = () => queueJob(job);
      toggleRecurse(instance, true);
      {
        effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns(instance.rtc, e2) : void 0;
        effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns(instance.rtg, e2) : void 0;
      }
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i2;
      for (i2 = 0; i2 < commonLength; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        patch(
          c1[i2],
          nextChild,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
      if (oldLength > newLength) {
        unmountChildren(
          c1,
          parentComponent,
          parentSuspense,
          true,
          false,
          commonLength
        );
      } else {
        mountChildren(
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
          commonLength
        );
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i2 = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i2 <= e1 && i2 <= e2) {
        const n1 = c1[i2];
        const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        i2++;
      }
      while (i2 <= e1 && i2 <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i2 > e1) {
        if (i2 <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i2 <= e2) {
            patch(
              null,
              c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]),
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            i2++;
          }
        }
      } else if (i2 > e2) {
        while (i2 <= e1) {
          unmount(c1[i2], parentComponent, parentSuspense, true);
          i2++;
        }
      } else {
        const s1 = i2;
        const s2 = i2;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i2 = s2; i2 <= e2; i2++) {
          const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
          if (nextChild.key != null) {
            if (keyToNewIndexMap.has(nextChild.key)) {
              warn$1$1(
                `Duplicate keys found during update:`,
                JSON.stringify(nextChild.key),
                `Make sure keys are unique.`
              );
            }
            keyToNewIndexMap.set(nextChild.key, i2);
          }
        }
        let j2;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i2 = 0; i2 < toBePatched; i2++) newIndexToOldIndexMap[i2] = 0;
        for (i2 = s1; i2 <= e1; i2++) {
          const prevChild = c1[i2];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j2 = s2; j2 <= e2; j2++) {
              if (newIndexToOldIndexMap[j2 - s2] === 0 && isSameVNodeType(prevChild, c2[j2])) {
                newIndex = j2;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(
              prevChild,
              c2[newIndex],
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j2 = increasingNewIndexSequence.length - 1;
        for (i2 = toBePatched - 1; i2 >= 0; i2--) {
          const nextIndex = s2 + i2;
          const nextChild = c2[nextIndex];
          const anchorVNode = c2[nextIndex + 1];
          const anchor = nextIndex + 1 < l2 ? (
            // #13559, #14173 fallback to el placeholder for unresolved async component
            anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
          ) : parentAnchor;
          if (newIndexToOldIndexMap[i2] === 0) {
            patch(
              null,
              nextChild,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (moved) {
            if (j2 < 0 || i2 !== increasingNewIndexSequence[j2]) {
              move(nextChild, container, anchor, 2);
            } else {
              j2--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i2 = 0; i2 < children.length; i2++) {
          move(children[i2], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = () => {
            if (vnode.ctx.isUnmounted) {
              hostRemove(el);
            } else {
              hostInsert(el, container, anchor);
            }
          };
          const performLeave = () => {
            if (el._isLeaving) {
              el[leaveCbKey](
                true
                /* cancelled */
              );
            }
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref3,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs,
        cacheIndex
      } = vnode;
      if (patchFlag === -2) {
        optimized = false;
      }
      if (ref3 != null) {
        pauseTracking();
        setRef(ref3, null, parentSuspense, vnode, true);
        resetTracking();
      }
      if (cacheIndex != null) {
        parentComponent.renderCache[cacheIndex] = void 0;
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(
            vnode,
            parentComponent,
            parentSuspense,
            internals,
            doRemove
          );
        } else if (dynamicChildren && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(
            dynamicChildren,
            parentComponent,
            parentSuspense,
            false,
            true
          );
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
          vnode.children.forEach((child) => {
            if (child.type === Comment) {
              hostRemove(child.el);
            } else {
              remove2(child);
            }
          });
        } else {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next2;
      while (cur !== end) {
        next2 = hostNextSibling(cur);
        hostRemove(cur);
        cur = next2;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      if (instance.type.__hmrId) {
        unregisterHMR(instance);
      }
      const { bum, scope, job, subTree, um, m: m2, a: a2 } = instance;
      invalidateMount(m2);
      invalidateMount(a2);
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (job) {
        job.flags |= 8;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      {
        devtoolsComponentRemoved(instance);
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i2 = start; i2 < children.length; i2++) {
        unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      const el = hostNextSibling(vnode.anchor || vnode.el);
      const teleportEnd = el && el[TeleportEndKey];
      return teleportEnd ? hostNextSibling(teleportEnd) : el;
    };
    let isFlushing = false;
    const render2 = (vnode, container, namespace) => {
      let instance;
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
          instance = container._vnode.component;
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      container._vnode = vnode;
      if (!isFlushing) {
        isFlushing = true;
        flushPreFlushCbs(instance);
        flushPostFlushCbs();
        isFlushing = false;
      }
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    return {
      render: render2,
      hydrate,
      createApp: createAppAPI(render2)
    };
  }
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse({ effect: effect2, job }, allowed) {
    if (allowed) {
      effect2.flags |= 32;
      job.flags |= 4;
    } else {
      effect2.flags &= -33;
      job.flags &= -5;
    }
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray$2(ch1) && isArray$2(ch2)) {
      for (let i2 = 0; i2 < ch1.length; i2++) {
        const c1 = ch1[i2];
        let c2 = ch2[i2];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
            c2.el = c1.el;
          }
          if (!shallow && c2.patchFlag !== -2)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          if (c2.patchFlag === -1) {
            c2 = ch2[i2] = cloneIfMounted(c2);
          }
          c2.el = c1.el;
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
        {
          c2.el && (c2.el.__vnode = c2);
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result2 = [0];
    let i2, j2, u2, v2, c2;
    const len = arr.length;
    for (i2 = 0; i2 < len; i2++) {
      const arrI = arr[i2];
      if (arrI !== 0) {
        j2 = result2[result2.length - 1];
        if (arr[j2] < arrI) {
          p2[i2] = j2;
          result2.push(i2);
          continue;
        }
        u2 = 0;
        v2 = result2.length - 1;
        while (u2 < v2) {
          c2 = u2 + v2 >> 1;
          if (arr[result2[c2]] < arrI) {
            u2 = c2 + 1;
          } else {
            v2 = c2;
          }
        }
        if (arrI < arr[result2[u2]]) {
          if (u2 > 0) {
            p2[i2] = result2[u2 - 1];
          }
          result2[u2] = i2;
        }
      }
    }
    u2 = result2.length;
    v2 = result2[u2 - 1];
    while (u2-- > 0) {
      result2[u2] = v2;
      v2 = p2[v2];
    }
    return result2;
  }
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  function invalidateMount(hooks) {
    if (hooks) {
      for (let i2 = 0; i2 < hooks.length; i2++)
        hooks[i2].flags |= 8;
    }
  }
  function resolveAsyncComponentPlaceholder(anchorVnode) {
    if (anchorVnode.placeholder) {
      return anchorVnode.placeholder;
    }
    const instance = anchorVnode.component;
    if (instance) {
      return resolveAsyncComponentPlaceholder(instance.subTree);
    }
    return null;
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray$2(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
  const Text = /* @__PURE__ */ Symbol.for("v-txt");
  const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
  const Static = /* @__PURE__ */ Symbol.for("v-stc");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value, inVOnce = false) {
    isBlockTreeEnabled += value;
    if (value < 0 && currentBlock && inVOnce) {
      currentBlock.hasOnce = true;
    }
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(
      createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        true
      )
    );
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(
      createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
      )
    );
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    if (n2.shapeFlag & 6 && n1.component) {
      const dirtyInstances = hmrDirtyComponents.get(n2.type);
      if (dirtyInstances && dirtyInstances.has(n1.component)) {
        n1.shapeFlag &= -257;
        n2.shapeFlag &= -513;
        return false;
      }
    }
    return n1.type === n2.type && n1.key === n2.key;
  }
  const createVNodeWithArgsTransform = (...args) => {
    return _createVNode(
      ...args
    );
  };
  const normalizeKey = ({ key: key2 }) => key2 != null ? key2 : null;
  const normalizeRef = ({
    ref: ref3,
    ref_key,
    ref_for
  }) => {
    if (typeof ref3 === "number") {
      ref3 = "" + ref3;
    }
    return ref3 != null ? isString$1(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction$1(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString$1(children) ? 8 : 16;
    }
    if (vnode.key !== vnode.key) {
      warn$1$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = createVNodeWithArgsTransform;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      if (!type) {
        warn$1$1(`Invalid vnode type when creating vnode: ${type}.`);
      }
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag = -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString$1(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject$2(style)) {
        if (/* @__PURE__ */ isProxy(style) && !isArray$2(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle$1(style);
      }
    }
    const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$2(type) ? 4 : isFunction$1(type) ? 2 : 0;
    if (shapeFlag & 4 && /* @__PURE__ */ isProxy(type)) {
      type = /* @__PURE__ */ toRaw(type);
      warn$1$1(
        `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
        `
Component that was made reactive: `,
        type
      );
    }
    return createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      isBlockNode,
      true
    );
  }
  function guardReactiveProps(props) {
    if (!props) return null;
    return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
    const { props, ref: ref3, patchFlag, children, transition } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref3 ? isArray$2(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref3,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children: patchFlag === -1 && isArray$2(children) ? children.map(deepCloneVNode) : children,
      target: vnode.target,
      targetStart: vnode.targetStart,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      placeholder: vnode.placeholder,
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    if (transition && cloneTransition) {
      setTransitionHooks(
        cloned,
        transition.clone(cloned)
      );
    }
    return cloned;
  }
  function deepCloneVNode(vnode) {
    const cloned = cloneVNode(vnode);
    if (isArray$2(vnode.children)) {
      cloned.children = vnode.children.map(deepCloneVNode);
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray$2(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (isVNode(child)) {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray$2(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !isInternalObject(children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction$1(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i2 = 0; i2 < args.length; i2++) {
      const toMerge = args[i2];
      for (const key2 in toMerge) {
        if (key2 === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key2 === "style") {
          ret.style = normalizeStyle$1([ret.style, toMerge.style]);
        } else if (isOn(key2)) {
          const existing = ret[key2];
          const incoming = toMerge[key2];
          if (incoming && existing !== incoming && !(isArray$2(existing) && existing.includes(incoming))) {
            ret[key2] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key2 !== "") {
          ret[key2] = toMerge[key2];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      job: null,
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      ids: parent ? parent.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
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
    {
      instance.ctx = createDevRenderContext(instance);
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  let internalSetCurrentInstance;
  let setInSSRSetupState;
  {
    const g2 = getGlobalThis();
    const registerGlobalSetter = (key2, setter) => {
      let setters;
      if (!(setters = g2[key2])) setters = g2[key2] = [];
      setters.push(setter);
      return (v2) => {
        if (setters.length > 1) setters.forEach((set2) => set2(v2));
        else setters[0](v2);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter(
      `__VUE_INSTANCE_SETTERS__`,
      (v2) => currentInstance = v2
    );
    setInSSRSetupState = registerGlobalSetter(
      `__VUE_SSR_SETTERS__`,
      (v2) => isInSSRComponentSetup = v2
    );
  }
  const setCurrentInstance = (instance) => {
    const prev2 = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev2);
    };
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
  function validateComponentName(name, { isNativeTag }) {
    if (isBuiltInTag(name) || isNativeTag(name)) {
      warn$1$1(
        "Do not use built-in or reserved HTML elements as component id: " + name
      );
    }
  }
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false, optimized = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized || isSSR);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    {
      if (Component.name) {
        validateComponentName(Component.name, instance.appContext.config);
      }
      if (Component.components) {
        const names2 = Object.keys(Component.components);
        for (let i2 = 0; i2 < names2.length; i2++) {
          validateComponentName(names2[i2], instance.appContext.config);
        }
      }
      if (Component.directives) {
        const names2 = Object.keys(Component.directives);
        for (let i2 = 0; i2 < names2.length; i2++) {
          validateDirectiveName(names2[i2]);
        }
      }
      if (Component.compilerOptions && isRuntimeOnly()) {
        warn$1$1(
          `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
        );
      }
    }
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    {
      exposePropsOnRenderContext(instance);
    }
    const { setup } = Component;
    if (setup) {
      pauseTracking();
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      const reset = setCurrentInstance(instance);
      const setupResult = callWithErrorHandling(
        setup,
        instance,
        0,
        [
          /* @__PURE__ */ shallowReadonly(instance.props),
          setupContext
        ]
      );
      const isAsyncSetup = isPromise(setupResult);
      resetTracking();
      reset();
      if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
        markAsyncBoundary(instance);
      }
      if (isAsyncSetup) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e2) => {
            handleError(e2, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
          if (!instance.suspense) {
            const name = formatComponentName(instance, Component);
            warn$1$1(
              `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
            );
          }
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction$1(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject$2(setupResult)) {
      if (isVNode(setupResult)) {
        warn$1$1(
          `setup() should not return VNodes directly - return a render function instead.`
        );
      }
      {
        instance.devtoolsRawSetupState = setupResult;
      }
      instance.setupState = proxyRefs(setupResult);
      {
        exposeSetupStateOnRenderContext(instance);
      }
    } else if (setupResult !== void 0) {
      warn$1$1(
        `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
      );
    }
    finishComponentSetup(instance, isSSR);
  }
  const isRuntimeOnly = () => true;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      instance.render = Component.render || NOOP;
    }
    {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
    if (!Component.render && instance.render === NOOP && !isSSR) {
      if (Component.template) {
        warn$1$1(
          `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        );
      } else {
        warn$1$1(`Component is missing template or render function: `, Component);
      }
    }
  }
  const attrsProxyHandlers = {
    get(target, key2) {
      markAttrsAccessed();
      track(target, "get", "");
      return target[key2];
    },
    set() {
      warn$1$1(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$1$1(`setupContext.attrs is readonly.`);
      return false;
    }
  };
  function getSlotsProxy(instance) {
    return new Proxy(instance.slots, {
      get(target, key2) {
        track(instance, "get", "$slots");
        return target[key2];
      }
    });
  }
  function createSetupContext(instance) {
    const expose = (exposed) => {
      {
        if (instance.exposed) {
          warn$1$1(`expose() should be called only once per setup().`);
        }
        if (exposed != null) {
          let exposedType = typeof exposed;
          if (exposedType === "object") {
            if (isArray$2(exposed)) {
              exposedType = "array";
            } else if (/* @__PURE__ */ isRef(exposed)) {
              exposedType = "ref";
            }
          }
          if (exposedType !== "object") {
            warn$1$1(
              `expose() should be passed a plain object, received ${exposedType}.`
            );
          }
        }
      }
      instance.exposed = exposed || {};
    };
    {
      let attrsProxy;
      let slotsProxy;
      return Object.freeze({
        get attrs() {
          return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
        },
        get slots() {
          return slotsProxy || (slotsProxy = getSlotsProxy(instance));
        },
        get emit() {
          return (event, ...args) => instance.emit(event, ...args);
        },
        expose
      });
    }
  }
  function getComponentPublicInstance(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key2) {
          if (key2 in target) {
            return target[key2];
          } else if (key2 in publicPropertiesMap) {
            return publicPropertiesMap[key2](instance);
          }
        },
        has(target, key2) {
          return key2 in target || key2 in publicPropertiesMap;
        }
      }));
    } else {
      return instance.proxy;
    }
  }
  const classifyRE = /(?:^|[-_])\w/g;
  const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match2 = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match2) {
        name = match2[1];
      }
    }
    if (!name && instance) {
      const inferFromRegistry = (registry) => {
        for (const key2 in registry) {
          if (registry[key2] === Component) {
            return key2;
          }
        }
      };
      name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
        instance.parent.type.components
      ) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction$1(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    const c2 = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    {
      const i2 = getCurrentInstance();
      if (i2 && i2.appContext.config.warnRecursiveComputed) {
        c2._warnRecursive = true;
      }
    }
    return c2;
  };
  function h$1(type, propsOrChildren, children) {
    try {
      setBlockTracking(-1);
      const l2 = arguments.length;
      if (l2 === 2) {
        if (isObject$2(propsOrChildren) && !isArray$2(propsOrChildren)) {
          if (isVNode(propsOrChildren)) {
            return createVNode(type, null, [propsOrChildren]);
          }
          return createVNode(type, propsOrChildren);
        } else {
          return createVNode(type, null, propsOrChildren);
        }
      } else {
        if (l2 > 3) {
          children = Array.prototype.slice.call(arguments, 2);
        } else if (l2 === 3 && isVNode(children)) {
          children = [children];
        }
        return createVNode(type, propsOrChildren, children);
      }
    } finally {
      setBlockTracking(1);
    }
  }
  function initCustomFormatter() {
    if (typeof window === "undefined") {
      return;
    }
    const vueStyle = { style: "color:#3ba776" };
    const numberStyle = { style: "color:#1677ff" };
    const stringStyle = { style: "color:#f5222d" };
    const keywordStyle = { style: "color:#eb2f96" };
    const formatter = {
      __vue_custom_formatter: true,
      header(obj) {
        if (!isObject$2(obj)) {
          return null;
        }
        if (obj.__isVue) {
          return ["div", vueStyle, `VueInstance`];
        } else if (/* @__PURE__ */ isRef(obj)) {
          pauseTracking();
          const value = obj.value;
          resetTracking();
          return [
            "div",
            {},
            ["span", vueStyle, genRefFlag(obj)],
            "<",
            formatValue(value),
            `>`
          ];
        } else if (/* @__PURE__ */ isReactive(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, /* @__PURE__ */ isShallow(obj) ? "ShallowReactive" : "Reactive"],
            "<",
            formatValue(obj),
            `>${/* @__PURE__ */ isReadonly(obj) ? ` (readonly)` : ``}`
          ];
        } else if (/* @__PURE__ */ isReadonly(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, /* @__PURE__ */ isShallow(obj) ? "ShallowReadonly" : "Readonly"],
            "<",
            formatValue(obj),
            ">"
          ];
        }
        return null;
      },
      hasBody(obj) {
        return obj && obj.__isVue;
      },
      body(obj) {
        if (obj && obj.__isVue) {
          return [
            "div",
            {},
            ...formatInstance(obj.$)
          ];
        }
      }
    };
    function formatInstance(instance) {
      const blocks = [];
      if (instance.type.props && instance.props) {
        blocks.push(createInstanceBlock("props", /* @__PURE__ */ toRaw(instance.props)));
      }
      if (instance.setupState !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("setup", instance.setupState));
      }
      if (instance.data !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("data", /* @__PURE__ */ toRaw(instance.data)));
      }
      const computed2 = extractKeys(instance, "computed");
      if (computed2) {
        blocks.push(createInstanceBlock("computed", computed2));
      }
      const injected = extractKeys(instance, "inject");
      if (injected) {
        blocks.push(createInstanceBlock("injected", injected));
      }
      blocks.push([
        "div",
        {},
        [
          "span",
          {
            style: keywordStyle.style + ";opacity:0.66"
          },
          "$ (internal): "
        ],
        ["object", { object: instance }]
      ]);
      return blocks;
    }
    function createInstanceBlock(type, target) {
      target = extend({}, target);
      if (!Object.keys(target).length) {
        return ["span", {}];
      }
      return [
        "div",
        { style: "line-height:1.25em;margin-bottom:0.6em" },
        [
          "div",
          {
            style: "color:#476582"
          },
          type
        ],
        [
          "div",
          {
            style: "padding-left:1.25em"
          },
          ...Object.keys(target).map((key2) => {
            return [
              "div",
              {},
              ["span", keywordStyle, key2 + ": "],
              formatValue(target[key2], false)
            ];
          })
        ]
      ];
    }
    function formatValue(v2, asRaw = true) {
      if (typeof v2 === "number") {
        return ["span", numberStyle, v2];
      } else if (typeof v2 === "string") {
        return ["span", stringStyle, JSON.stringify(v2)];
      } else if (typeof v2 === "boolean") {
        return ["span", keywordStyle, v2];
      } else if (isObject$2(v2)) {
        return ["object", { object: asRaw ? /* @__PURE__ */ toRaw(v2) : v2 }];
      } else {
        return ["span", stringStyle, String(v2)];
      }
    }
    function extractKeys(instance, type) {
      const Comp = instance.type;
      if (isFunction$1(Comp)) {
        return;
      }
      const extracted = {};
      for (const key2 in instance.ctx) {
        if (isKeyOfType(Comp, key2, type)) {
          extracted[key2] = instance.ctx[key2];
        }
      }
      return extracted;
    }
    function isKeyOfType(Comp, key2, type) {
      const opts = Comp[type];
      if (isArray$2(opts) && opts.includes(key2) || isObject$2(opts) && key2 in opts) {
        return true;
      }
      if (Comp.extends && isKeyOfType(Comp.extends, key2, type)) {
        return true;
      }
      if (Comp.mixins && Comp.mixins.some((m2) => isKeyOfType(m2, key2, type))) {
        return true;
      }
    }
    function genRefFlag(v2) {
      if (/* @__PURE__ */ isShallow(v2)) {
        return `ShallowRef`;
      }
      if (v2.effect) {
        return `ComputedRef`;
      }
      return `Ref`;
    }
    if (window.devtoolsFormatters) {
      window.devtoolsFormatters.push(formatter);
    } else {
      window.devtoolsFormatters = [formatter];
    }
  }
  const version$1 = "3.5.30";
  const warn$2 = warn$1$1;
  /**
  * @vue/runtime-dom v3.5.30
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let policy = void 0;
  const tt = typeof window !== "undefined" && window.trustedTypes;
  if (tt) {
    try {
      policy = /* @__PURE__ */ tt.createPolicy("vue", {
        createHTML: (val) => val
      });
    } catch (e2) {
      warn$2(`Error creating trusted types policy: ${e2}`);
    }
  }
  const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
  const svgNS = "http://www.w3.org/2000/svg";
  const mathmlNS = "http://www.w3.org/1998/Math/MathML";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, namespace, is, props) => {
      const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node2, text) => {
      node2.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node2) => node2.parentNode,
    nextSibling: (node2) => node2.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content2, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling)) break;
        }
      } else {
        templateContainer.innerHTML = unsafeToTrustedHTML(
          namespace === "svg" ? `<svg>${content2}</svg>` : namespace === "mathml" ? `<math>${content2}</math>` : content2
        );
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  const TRANSITION = "transition";
  const ANIMATION = "animation";
  const vtcKey = /* @__PURE__ */ Symbol("_vtc");
  const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
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
  };
  const TransitionPropsValidators = /* @__PURE__ */ extend(
    {},
    BaseTransitionPropsValidators,
    DOMTransitionPropsValidators
  );
  const decorate$1 = (t2) => {
    t2.displayName = "Transition";
    t2.props = TransitionPropsValidators;
    return t2;
  };
  const Transition = /* @__PURE__ */ decorate$1(
    (props, { slots }) => h$1(BaseTransition, resolveTransitionProps(props), slots)
  );
  const callHook = (hook, args = []) => {
    if (isArray$2(hook)) {
      hook.forEach((h2) => h2(...args));
    } else if (hook) {
      hook(...args);
    }
  };
  const hasExplicitCallback = (hook) => {
    return hook ? isArray$2(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
  };
  function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key2 in rawProps) {
      if (!(key2 in DOMTransitionPropsValidators)) {
        baseProps[key2] = rawProps[key2];
      }
    }
    if (rawProps.css === false) {
      return baseProps;
    }
    const {
      name = "v",
      type,
      duration,
      enterFromClass = `${name}-enter-from`,
      enterActiveClass = `${name}-enter-active`,
      enterToClass = `${name}-enter-to`,
      appearFromClass = enterFromClass,
      appearActiveClass = enterActiveClass,
      appearToClass = enterToClass,
      leaveFromClass = `${name}-leave-from`,
      leaveActiveClass = `${name}-leave-active`,
      leaveToClass = `${name}-leave-to`
    } = rawProps;
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const {
      onBeforeEnter,
      onEnter,
      onEnterCancelled,
      onLeave,
      onLeaveCancelled,
      onBeforeAppear = onBeforeEnter,
      onAppear = onEnter,
      onAppearCancelled = onEnterCancelled
    } = baseProps;
    const finishEnter = (el, isAppear, done, isCancelled) => {
      el._enterCancelled = isCancelled;
      removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
      removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
      done && done();
    };
    const finishLeave = (el, done) => {
      el._isLeaving = false;
      removeTransitionClass(el, leaveFromClass);
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
      done && done();
    };
    const makeEnterHook = (isAppear) => {
      return (el, done) => {
        const hook = isAppear ? onAppear : onEnter;
        const resolve = () => finishEnter(el, isAppear, done);
        callHook(hook, [el, resolve]);
        nextFrame(() => {
          removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
          addTransitionClass(el, isAppear ? appearToClass : enterToClass);
          if (!hasExplicitCallback(hook)) {
            whenTransitionEnds(el, type, enterDuration, resolve);
          }
        });
      };
    };
    return extend(baseProps, {
      onBeforeEnter(el) {
        callHook(onBeforeEnter, [el]);
        addTransitionClass(el, enterFromClass);
        addTransitionClass(el, enterActiveClass);
      },
      onBeforeAppear(el) {
        callHook(onBeforeAppear, [el]);
        addTransitionClass(el, appearFromClass);
        addTransitionClass(el, appearActiveClass);
      },
      onEnter: makeEnterHook(false),
      onAppear: makeEnterHook(true),
      onLeave(el, done) {
        el._isLeaving = true;
        const resolve = () => finishLeave(el, done);
        addTransitionClass(el, leaveFromClass);
        if (!el._enterCancelled) {
          forceReflow(el);
          addTransitionClass(el, leaveActiveClass);
        } else {
          addTransitionClass(el, leaveActiveClass);
          forceReflow(el);
        }
        nextFrame(() => {
          if (!el._isLeaving) {
            return;
          }
          removeTransitionClass(el, leaveFromClass);
          addTransitionClass(el, leaveToClass);
          if (!hasExplicitCallback(onLeave)) {
            whenTransitionEnds(el, type, leaveDuration, resolve);
          }
        });
        callHook(onLeave, [el, resolve]);
      },
      onEnterCancelled(el) {
        finishEnter(el, false, void 0, true);
        callHook(onEnterCancelled, [el]);
      },
      onAppearCancelled(el) {
        finishEnter(el, true, void 0, true);
        callHook(onAppearCancelled, [el]);
      },
      onLeaveCancelled(el) {
        finishLeave(el);
        callHook(onLeaveCancelled, [el]);
      }
    });
  }
  function normalizeDuration(duration) {
    if (duration == null) {
      return null;
    } else if (isObject$2(duration)) {
      return [NumberOf(duration.enter), NumberOf(duration.leave)];
    } else {
      const n2 = NumberOf(duration);
      return [n2, n2];
    }
  }
  function NumberOf(val) {
    const res = toNumber(val);
    {
      assertNumber(res, "<transition> explicit duration");
    }
    return res;
  }
  function addTransitionClass(el, cls2) {
    cls2.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
    (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls2);
  }
  function removeTransitionClass(el, cls2) {
    cls2.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
    const _vtc = el[vtcKey];
    if (_vtc) {
      _vtc.delete(cls2);
      if (!_vtc.size) {
        el[vtcKey] = void 0;
      }
    }
  }
  function nextFrame(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
  let endId = 0;
  function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = () => {
      if (id === el._endId) {
        resolve();
      }
    };
    if (explicitTimeout != null) {
      return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type) {
      return resolve();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = () => {
      el.removeEventListener(endEvent, onEnd);
      resolveIfNotStale();
    };
    const onEnd = (e2) => {
      if (e2.target === el && ++ended >= propCount) {
        end();
      }
    };
    setTimeout(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
  }
  function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    const getStyleProperties = (key2) => (styles[key2] || "").split(", ");
    const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
    const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
    const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(
      getStyleProperties(`${TRANSITION}Property`).toString()
    );
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d2, i2) => toMs(d2) + toMs(delays[i2])));
  }
  function toMs(s2) {
    if (s2 === "auto") return 0;
    return Number(s2.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function forceReflow(el) {
    const targetDocument = el ? el.ownerDocument : document;
    return targetDocument.body.offsetHeight;
  }
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
  const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
  const vShow = {
    // used for prop mismatch check during hydration
    name: "show",
    beforeMount(el, { value }, { transition }) {
      el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
      if (transition && value) {
        transition.beforeEnter(el);
      } else {
        setDisplay(el, value);
      }
    },
    mounted(el, { value }, { transition }) {
      if (transition && value) {
        transition.enter(el);
      }
    },
    updated(el, { value, oldValue }, { transition }) {
      if (!value === !oldValue) return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el);
          setDisplay(el, true);
          transition.enter(el);
        } else {
          transition.leave(el, () => {
            setDisplay(el, false);
          });
        }
      } else {
        setDisplay(el, value);
      }
    },
    beforeUnmount(el, { value }) {
      setDisplay(el, value);
    }
  };
  function setDisplay(el, value) {
    el.style.display = value ? el[vShowOriginalDisplay] : "none";
    el[vShowHidden] = !value;
  }
  const CSS_VAR_TEXT = /* @__PURE__ */ Symbol("CSS_VAR_TEXT");
  const displayRE = /(?:^|;)\s*display\s*:/;
  function patchStyle(el, prev2, next2) {
    const style = el.style;
    const isCssString = isString$1(next2);
    let hasControlledDisplay = false;
    if (next2 && !isCssString) {
      if (prev2) {
        if (!isString$1(prev2)) {
          for (const key2 in prev2) {
            if (next2[key2] == null) {
              setStyle(style, key2, "");
            }
          }
        } else {
          for (const prevStyle of prev2.split(";")) {
            const key2 = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next2[key2] == null) {
              setStyle(style, key2, "");
            }
          }
        }
      }
      for (const key2 in next2) {
        if (key2 === "display") {
          hasControlledDisplay = true;
        }
        setStyle(style, key2, next2[key2]);
      }
    } else {
      if (isCssString) {
        if (prev2 !== next2) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next2 += ";" + cssVarText;
          }
          style.cssText = next2;
          hasControlledDisplay = displayRE.test(next2);
        }
      } else if (prev2) {
        el.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  const semicolonRE = /[^\\];\s*$/;
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray$2(val)) {
      val.forEach((v2) => setStyle(style, name, v2));
    } else {
      if (val == null) val = "";
      {
        if (semicolonRE.test(val)) {
          warn$2(
            `Unexpected semicolon at the end of '${name}' style value: '${val}'`
          );
        }
      }
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(prefixed),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached2 = prefixCache[rawName];
    if (cached2) {
      return cached2;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i2 = 0; i2 < prefixes.length; i2++) {
      const prefixed = prefixes[i2] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key2, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key2)) {
    if (isSVG && key2.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key2.slice(6, key2.length));
      } else {
        el.setAttributeNS(xlinkNS, key2, value);
      }
    } else {
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key2);
      } else {
        el.setAttribute(
          key2,
          isBoolean2 ? "" : isSymbol(value) ? String(value) : value
        );
      }
    }
  }
  function patchDOMProp(el, key2, value, parentComponent, attrName) {
    if (key2 === "innerHTML" || key2 === "textContent") {
      if (value != null) {
        el[key2] = key2 === "innerHTML" ? unsafeToTrustedHTML(value) : value;
      }
      return;
    }
    const tag = el.tagName;
    if (key2 === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
    !tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
      const newValue = value == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        el.type === "checkbox" ? "on" : ""
      ) : String(value);
      if (oldValue !== newValue || !("_value" in el)) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key2);
      }
      el._value = value;
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key2];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key2] = value;
    } catch (e2) {
      if (!needRemove) {
        warn$2(
          `Failed setting prop "${key2}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
          e2
        );
      }
    }
    needRemove && el.removeAttribute(attrName || key2);
  }
  function addEventListener$1(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener$1(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  const veiKey = /* @__PURE__ */ Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = sanitizeEventValue(nextValue, rawName);
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(
          sanitizeEventValue(nextValue, rawName),
          instance
        );
        addEventListener$1(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener$1(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m2;
      while (m2 = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m2[0].length);
        options[m2[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p$1 = /* @__PURE__ */ Promise.resolve();
  const getNow = () => cachedNow || (p$1.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e2) => {
      if (!e2._vts) {
        e2._vts = Date.now();
      } else if (e2._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e2, invoker.value),
        instance,
        5,
        [e2]
      );
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function sanitizeEventValue(value, propName) {
    if (isFunction$1(value) || isArray$2(value)) {
      return value;
    }
    warn$2(
      `Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof value}.`
    );
    return NOOP;
  }
  function patchStopImmediatePropagation(e2, value) {
    if (isArray$2(value)) {
      const originalStop = e2.stopImmediatePropagation;
      e2.stopImmediatePropagation = () => {
        originalStop.call(e2);
        e2._stopped = true;
      };
      return value.map(
        (fn) => (e22) => !e22._stopped && fn && fn(e22)
      );
    } else {
      return value;
    }
  }
  const isNativeOn = (key2) => key2.charCodeAt(0) === 111 && key2.charCodeAt(1) === 110 && // lowercase letter
  key2.charCodeAt(2) > 96 && key2.charCodeAt(2) < 123;
  const patchProp = (el, key2, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key2 === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key2 === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key2)) {
      if (!isModelListener(key2)) {
        patchEvent(el, key2, prevValue, nextValue, parentComponent);
      }
    } else if (key2[0] === "." ? (key2 = key2.slice(1), true) : key2[0] === "^" ? (key2 = key2.slice(1), false) : shouldSetAsProp(el, key2, nextValue, isSVG)) {
      patchDOMProp(el, key2, nextValue);
      if (!el.tagName.includes("-") && (key2 === "value" || key2 === "checked" || key2 === "selected")) {
        patchAttr(el, key2, nextValue, isSVG, parentComponent, key2 !== "value");
      }
    } else if (
      // #11081 force set props for possible async custom element
      el._isVueCE && // #12408 check if it's declared prop or it's async custom element
      (shouldSetAsPropForVueCE(el, key2) || // @ts-expect-error _def is private
      el._def.__asyncLoader && (/[A-Z]/.test(key2) || !isString$1(nextValue)))
    ) {
      patchDOMProp(el, camelize(key2), nextValue, parentComponent, key2);
    } else {
      if (key2 === "true-value") {
        el._trueValue = nextValue;
      } else if (key2 === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key2, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key2, value, isSVG) {
    if (isSVG) {
      if (key2 === "innerHTML" || key2 === "textContent") {
        return true;
      }
      if (key2 in el && isNativeOn(key2) && isFunction$1(value)) {
        return true;
      }
      return false;
    }
    if (key2 === "spellcheck" || key2 === "draggable" || key2 === "translate" || key2 === "autocorrect") {
      return false;
    }
    if (key2 === "sandbox" && el.tagName === "IFRAME") {
      return false;
    }
    if (key2 === "form") {
      return false;
    }
    if (key2 === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key2 === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (key2 === "width" || key2 === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key2) && isString$1(value)) {
      return false;
    }
    return key2 in el;
  }
  function shouldSetAsPropForVueCE(el, key2) {
    const props = (
      // @ts-expect-error _def is private
      el._def.props
    );
    if (!props) {
      return false;
    }
    const camelKey = camelize(key2);
    return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
  }
  const positionMap = /* @__PURE__ */ new WeakMap();
  const newPositionMap = /* @__PURE__ */ new WeakMap();
  const moveCbKey = /* @__PURE__ */ Symbol("_moveCb");
  const enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
  const decorate = (t2) => {
    delete t2.props.mode;
    return t2;
  };
  const TransitionGroupImpl = /* @__PURE__ */ decorate({
    name: "TransitionGroup",
    props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
      tag: String,
      moveClass: String
    }),
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      let prevChildren;
      let children;
      onUpdated(() => {
        if (!prevChildren.length) {
          return;
        }
        const moveClass = props.moveClass || `${props.name || "v"}-move`;
        if (!hasCSSTransform(
          prevChildren[0].el,
          instance.vnode.el,
          moveClass
        )) {
          prevChildren = [];
          return;
        }
        prevChildren.forEach(callPendingCbs);
        prevChildren.forEach(recordPosition);
        const movedChildren = prevChildren.filter(applyTranslation);
        forceReflow(instance.vnode.el);
        movedChildren.forEach((c2) => {
          const el = c2.el;
          const style = el.style;
          addTransitionClass(el, moveClass);
          style.transform = style.webkitTransform = style.transitionDuration = "";
          const cb = el[moveCbKey] = (e2) => {
            if (e2 && e2.target !== el) {
              return;
            }
            if (!e2 || e2.propertyName.endsWith("transform")) {
              el.removeEventListener("transitionend", cb);
              el[moveCbKey] = null;
              removeTransitionClass(el, moveClass);
            }
          };
          el.addEventListener("transitionend", cb);
        });
        prevChildren = [];
      });
      return () => {
        const rawProps = /* @__PURE__ */ toRaw(props);
        const cssTransitionProps = resolveTransitionProps(rawProps);
        let tag = rawProps.tag || Fragment;
        prevChildren = [];
        if (children) {
          for (let i2 = 0; i2 < children.length; i2++) {
            const child = children[i2];
            if (child.el && child.el instanceof Element) {
              prevChildren.push(child);
              setTransitionHooks(
                child,
                resolveTransitionHooks(
                  child,
                  cssTransitionProps,
                  state,
                  instance
                )
              );
              positionMap.set(child, getPosition(child.el));
            }
          }
        }
        children = slots.default ? getTransitionRawChildren(slots.default()) : [];
        for (let i2 = 0; i2 < children.length; i2++) {
          const child = children[i2];
          if (child.key != null) {
            setTransitionHooks(
              child,
              resolveTransitionHooks(child, cssTransitionProps, state, instance)
            );
          } else if (child.type !== Text) {
            warn$2(`<TransitionGroup> children must be keyed.`);
          }
        }
        return createVNode(tag, null, children);
      };
    }
  });
  const TransitionGroup = TransitionGroupImpl;
  function callPendingCbs(c2) {
    const el = c2.el;
    if (el[moveCbKey]) {
      el[moveCbKey]();
    }
    if (el[enterCbKey]) {
      el[enterCbKey]();
    }
  }
  function recordPosition(c2) {
    newPositionMap.set(c2, getPosition(c2.el));
  }
  function applyTranslation(c2) {
    const oldPos = positionMap.get(c2);
    const newPos = newPositionMap.get(c2);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
      const el = c2.el;
      const s2 = el.style;
      const rect = el.getBoundingClientRect();
      let scaleX = 1;
      let scaleY = 1;
      if (el.offsetWidth) scaleX = rect.width / el.offsetWidth;
      if (el.offsetHeight) scaleY = rect.height / el.offsetHeight;
      if (!Number.isFinite(scaleX) || scaleX === 0) scaleX = 1;
      if (!Number.isFinite(scaleY) || scaleY === 0) scaleY = 1;
      if (Math.abs(scaleX - 1) < 0.01) scaleX = 1;
      if (Math.abs(scaleY - 1) < 0.01) scaleY = 1;
      s2.transform = s2.webkitTransform = `translate(${dx / scaleX}px,${dy / scaleY}px)`;
      s2.transitionDuration = "0s";
      return c2;
    }
  }
  function getPosition(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top
    };
  }
  function hasCSSTransform(el, root2, moveClass) {
    const clone = el.cloneNode();
    const _vtc = el[vtcKey];
    if (_vtc) {
      _vtc.forEach((cls2) => {
        cls2.split(/\s+/).forEach((c2) => c2 && clone.classList.remove(c2));
      });
    }
    moveClass.split(/\s+/).forEach((c2) => c2 && clone.classList.add(c2));
    clone.style.display = "none";
    const container = root2.nodeType === 1 ? root2 : root2.parentNode;
    container.appendChild(clone);
    const { hasTransform } = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
  }
  const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const render = (...args) => {
    ensureRenderer().render(...args);
  };
  const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args);
    {
      injectNativeTagCheck(app);
      injectCompilerOptionsCheck(app);
    }
    const { mount } = app;
    app.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container) return;
      const component = app._component;
      if (!isFunction$1(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      if (container.nodeType === 1) {
        container.textContent = "";
      }
      const proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  };
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function injectNativeTagCheck(app) {
    Object.defineProperty(app.config, "isNativeTag", {
      value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
      writable: false
    });
  }
  function injectCompilerOptionsCheck(app) {
    {
      const isCustomElement = app.config.isCustomElement;
      Object.defineProperty(app.config, "isCustomElement", {
        get() {
          return isCustomElement;
        },
        set() {
          warn$2(
            `The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`
          );
        }
      });
      const compilerOptions = app.config.compilerOptions;
      const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
      Object.defineProperty(app.config, "compilerOptions", {
        get() {
          warn$2(msg);
          return compilerOptions;
        },
        set() {
          warn$2(msg);
        }
      });
    }
  }
  function normalizeContainer(container) {
    if (isString$1(container)) {
      const res = document.querySelector(container);
      if (!res) {
        warn$2(
          `Failed to mount app: mount target selector "${container}" returned null.`
        );
      }
      return res;
    }
    if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
      warn$2(
        `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
      );
    }
    return container;
  }
  /**
  * vue v3.5.30
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  function initDev() {
    {
      initCustomFormatter();
    }
  }
  {
    initDev();
  }
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var axios$2 = { exports: {} };
  var bind;
  var hasRequiredBind;
  function requireBind() {
    if (hasRequiredBind) return bind;
    hasRequiredBind = 1;
    bind = function bind2(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i2 = 0; i2 < args.length; i2++) {
          args[i2] = arguments[i2];
        }
        return fn.apply(thisArg, args);
      };
    };
    return bind;
  }
  var utils;
  var hasRequiredUtils;
  function requireUtils() {
    if (hasRequiredUtils) return utils;
    hasRequiredUtils = 1;
    var bind2 = requireBind();
    var toString = Object.prototype.toString;
    var kindOf = /* @__PURE__ */ function(cache) {
      return function(thing) {
        var str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      };
    }(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type) {
      type = type.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type;
      };
    }
    function isArray2(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer2(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result2;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result2 = ArrayBuffer.isView(val);
      } else {
        result2 = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result2;
    }
    function isString2(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject2(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject2(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate2 = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction2(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject2(val) && isFunction2(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction2(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim2(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray2(obj)) {
        for (var i2 = 0, l2 = obj.length; i2 < l2; i2++) {
          fn.call(null, obj[i2], i2, obj);
        }
      } else {
        for (var key2 in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key2)) {
            fn.call(null, obj[key2], key2, obj);
          }
        }
      }
    }
    function merge2() {
      var result2 = {};
      function assignValue(val, key2) {
        if (isPlainObject2(result2[key2]) && isPlainObject2(val)) {
          result2[key2] = merge2(result2[key2], val);
        } else if (isPlainObject2(val)) {
          result2[key2] = merge2({}, val);
        } else if (isArray2(val)) {
          result2[key2] = val.slice();
        } else {
          result2[key2] = val;
        }
      }
      for (var i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
        forEach(arguments[i2], assignValue);
      }
      return result2;
    }
    function extend2(a2, b2, thisArg) {
      forEach(b2, function assignValue(val, key2) {
        if (thisArg && typeof val === "function") {
          a2[key2] = bind2(val, thisArg);
        } else {
          a2[key2] = val;
        }
      });
      return a2;
    }
    function stripBOM(content2) {
      if (content2.charCodeAt(0) === 65279) {
        content2 = content2.slice(1);
      }
      return content2;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter) {
      var props;
      var i2;
      var prop;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i2 = props.length;
        while (i2-- > 0) {
          prop = props[i2];
          if (!merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position2) {
      str = String(str);
      if (position2 === void 0 || position2 > str.length) {
        position2 = str.length;
      }
      position2 -= searchString.length;
      var lastIndex = str.indexOf(searchString, position2);
      return lastIndex !== -1 && lastIndex === position2;
    }
    function toArray(thing) {
      if (!thing) return null;
      var i2 = thing.length;
      if (isUndefined(i2)) return null;
      var arr = new Array(i2);
      while (i2-- > 0) {
        arr[i2] = thing[i2];
      }
      return arr;
    }
    var isTypedArray2 = /* @__PURE__ */ function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    utils = {
      isArray: isArray2,
      isArrayBuffer,
      isBuffer: isBuffer2,
      isFormData,
      isArrayBufferView,
      isString: isString2,
      isNumber,
      isObject: isObject2,
      isPlainObject: isPlainObject2,
      isUndefined,
      isDate: isDate2,
      isFile,
      isBlob,
      isFunction: isFunction2,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge: merge2,
      extend: extend2,
      trim: trim2,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray: isTypedArray2,
      isFileList
    };
    return utils;
  }
  var buildURL;
  var hasRequiredBuildURL;
  function requireBuildURL() {
    if (hasRequiredBuildURL) return buildURL;
    hasRequiredBuildURL = 1;
    var utils2 = requireUtils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    buildURL = function buildURL2(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils2.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils2.forEach(params, function serialize2(val, key2) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils2.isArray(val)) {
            key2 = key2 + "[]";
          } else {
            val = [val];
          }
          utils2.forEach(val, function parseValue(v2) {
            if (utils2.isDate(v2)) {
              v2 = v2.toISOString();
            } else if (utils2.isObject(v2)) {
              v2 = JSON.stringify(v2);
            }
            parts.push(encode(key2) + "=" + encode(v2));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
    return buildURL;
  }
  var InterceptorManager_1;
  var hasRequiredInterceptorManager;
  function requireInterceptorManager() {
    if (hasRequiredInterceptorManager) return InterceptorManager_1;
    hasRequiredInterceptorManager = 1;
    var utils2 = requireUtils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils2.forEach(this.handlers, function forEachHandler(h2) {
        if (h2 !== null) {
          fn(h2);
        }
      });
    };
    InterceptorManager_1 = InterceptorManager;
    return InterceptorManager_1;
  }
  var normalizeHeaderName;
  var hasRequiredNormalizeHeaderName;
  function requireNormalizeHeaderName() {
    if (hasRequiredNormalizeHeaderName) return normalizeHeaderName;
    hasRequiredNormalizeHeaderName = 1;
    var utils2 = requireUtils();
    normalizeHeaderName = function normalizeHeaderName2(headers, normalizedName) {
      utils2.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
    return normalizeHeaderName;
  }
  var AxiosError_1;
  var hasRequiredAxiosError;
  function requireAxiosError() {
    if (hasRequiredAxiosError) return AxiosError_1;
    hasRequiredAxiosError = 1;
    var utils2 = requireUtils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils2.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
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
    var prototype = AxiosError.prototype;
    var descriptors = {};
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
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils2.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    AxiosError_1 = AxiosError;
    return AxiosError_1;
  }
  var transitional;
  var hasRequiredTransitional;
  function requireTransitional() {
    if (hasRequiredTransitional) return transitional;
    hasRequiredTransitional = 1;
    transitional = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
    return transitional;
  }
  var toFormData_1;
  var hasRequiredToFormData;
  function requireToFormData() {
    if (hasRequiredToFormData) return toFormData_1;
    hasRequiredToFormData = 1;
    var utils2 = requireUtils();
    function toFormData(obj, formData) {
      formData = formData || new FormData();
      var stack2 = [];
      function convertValue(value) {
        if (value === null) return "";
        if (utils2.isDate(value)) {
          return value.toISOString();
        }
        if (utils2.isArrayBuffer(value) || utils2.isTypedArray(value)) {
          return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function build(data2, parentKey) {
        if (utils2.isPlainObject(data2) || utils2.isArray(data2)) {
          if (stack2.indexOf(data2) !== -1) {
            throw Error("Circular reference detected in " + parentKey);
          }
          stack2.push(data2);
          utils2.forEach(data2, function each(value, key2) {
            if (utils2.isUndefined(value)) return;
            var fullKey = parentKey ? parentKey + "." + key2 : key2;
            var arr;
            if (value && !parentKey && typeof value === "object") {
              if (utils2.endsWith(key2, "{}")) {
                value = JSON.stringify(value);
              } else if (utils2.endsWith(key2, "[]") && (arr = utils2.toArray(value))) {
                arr.forEach(function(el) {
                  !utils2.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value, fullKey);
          });
          stack2.pop();
        } else {
          formData.append(parentKey, convertValue(data2));
        }
      }
      build(obj);
      return formData;
    }
    toFormData_1 = toFormData;
    return toFormData_1;
  }
  var settle;
  var hasRequiredSettle;
  function requireSettle() {
    if (hasRequiredSettle) return settle;
    hasRequiredSettle = 1;
    var AxiosError = requireAxiosError();
    settle = function settle2(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    };
    return settle;
  }
  var cookies;
  var hasRequiredCookies;
  function requireCookies() {
    if (hasRequiredCookies) return cookies;
    hasRequiredCookies = 1;
    var utils2 = requireUtils();
    cookies = utils2.isStandardBrowserEnv() ? (
      // Standard browser envs support document.cookie
      /* @__PURE__ */ function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path2, domain, secure) {
            var cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if (utils2.isNumber(expires)) {
              cookie.push("expires=" + new Date(expires).toGMTString());
            }
            if (utils2.isString(path2)) {
              cookie.push("path=" + path2);
            }
            if (utils2.isString(domain)) {
              cookie.push("domain=" + domain);
            }
            if (secure === true) {
              cookie.push("secure");
            }
            document.cookie = cookie.join("; ");
          },
          read: function read(name) {
            var match2 = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match2 ? decodeURIComponent(match2[3]) : null;
          },
          remove: function remove2(name) {
            this.write(name, "", Date.now() - 864e5);
          }
        };
      }()
    ) : (
      // Non standard browser env (web workers, react-native) lack needed support.
      /* @__PURE__ */ function nonStandardBrowserEnv() {
        return {
          write: function write() {
          },
          read: function read() {
            return null;
          },
          remove: function remove2() {
          }
        };
      }()
    );
    return cookies;
  }
  var isAbsoluteURL;
  var hasRequiredIsAbsoluteURL;
  function requireIsAbsoluteURL() {
    if (hasRequiredIsAbsoluteURL) return isAbsoluteURL;
    hasRequiredIsAbsoluteURL = 1;
    isAbsoluteURL = function isAbsoluteURL2(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
    return isAbsoluteURL;
  }
  var combineURLs;
  var hasRequiredCombineURLs;
  function requireCombineURLs() {
    if (hasRequiredCombineURLs) return combineURLs;
    hasRequiredCombineURLs = 1;
    combineURLs = function combineURLs2(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
    return combineURLs;
  }
  var buildFullPath;
  var hasRequiredBuildFullPath;
  function requireBuildFullPath() {
    if (hasRequiredBuildFullPath) return buildFullPath;
    hasRequiredBuildFullPath = 1;
    var isAbsoluteURL2 = requireIsAbsoluteURL();
    var combineURLs2 = requireCombineURLs();
    buildFullPath = function buildFullPath2(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL2(requestedURL)) {
        return combineURLs2(baseURL, requestedURL);
      }
      return requestedURL;
    };
    return buildFullPath;
  }
  var parseHeaders;
  var hasRequiredParseHeaders;
  function requireParseHeaders() {
    if (hasRequiredParseHeaders) return parseHeaders;
    hasRequiredParseHeaders = 1;
    var utils2 = requireUtils();
    var ignoreDuplicateOf = [
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
    parseHeaders = function parseHeaders2(headers) {
      var parsed = {};
      var key2;
      var val;
      var i2;
      if (!headers) {
        return parsed;
      }
      utils2.forEach(headers.split("\n"), function parser(line2) {
        i2 = line2.indexOf(":");
        key2 = utils2.trim(line2.substr(0, i2)).toLowerCase();
        val = utils2.trim(line2.substr(i2 + 1));
        if (key2) {
          if (parsed[key2] && ignoreDuplicateOf.indexOf(key2) >= 0) {
            return;
          }
          if (key2 === "set-cookie") {
            parsed[key2] = (parsed[key2] ? parsed[key2] : []).concat([val]);
          } else {
            parsed[key2] = parsed[key2] ? parsed[key2] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
    return parseHeaders;
  }
  var isURLSameOrigin;
  var hasRequiredIsURLSameOrigin;
  function requireIsURLSameOrigin() {
    if (hasRequiredIsURLSameOrigin) return isURLSameOrigin;
    hasRequiredIsURLSameOrigin = 1;
    var utils2 = requireUtils();
    isURLSameOrigin = utils2.isStandardBrowserEnv() ? (
      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement("a");
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute("href", href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin2(requestURL) {
          var parsed = utils2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }()
    ) : (
      // Non standard browser envs (web workers, react-native) lack needed support.
      /* @__PURE__ */ function nonStandardBrowserEnv() {
        return function isURLSameOrigin2() {
          return true;
        };
      }()
    );
    return isURLSameOrigin;
  }
  var CanceledError_1;
  var hasRequiredCanceledError;
  function requireCanceledError() {
    if (hasRequiredCanceledError) return CanceledError_1;
    hasRequiredCanceledError = 1;
    var AxiosError = requireAxiosError();
    var utils2 = requireUtils();
    function CanceledError(message) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED);
      this.name = "CanceledError";
    }
    utils2.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    CanceledError_1 = CanceledError;
    return CanceledError_1;
  }
  var parseProtocol;
  var hasRequiredParseProtocol;
  function requireParseProtocol() {
    if (hasRequiredParseProtocol) return parseProtocol;
    hasRequiredParseProtocol = 1;
    parseProtocol = function parseProtocol2(url) {
      var match2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match2 && match2[1] || "";
    };
    return parseProtocol;
  }
  var xhr;
  var hasRequiredXhr;
  function requireXhr() {
    if (hasRequiredXhr) return xhr;
    hasRequiredXhr = 1;
    var utils2 = requireUtils();
    var settle2 = requireSettle();
    var cookies2 = requireCookies();
    var buildURL2 = requireBuildURL();
    var buildFullPath2 = requireBuildFullPath();
    var parseHeaders2 = requireParseHeaders();
    var isURLSameOrigin2 = requireIsURLSameOrigin();
    var transitionalDefaults = requireTransitional();
    var AxiosError = requireAxiosError();
    var CanceledError = requireCanceledError();
    var parseProtocol2 = requireParseProtocol();
    xhr = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils2.isFormData(requestData) && utils2.isStandardBrowserEnv()) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath2(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL2(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders2(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle2(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        request.onerror = function handleError2() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional2 = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request
          ));
          request = null;
        };
        if (utils2.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin2(fullPath)) && config.xsrfCookieName ? cookies2.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils2.forEach(requestHeaders, function setRequestHeader(val, key2) {
            if (typeof requestData === "undefined" && key2.toLowerCase() === "content-type") {
              delete requestHeaders[key2];
            } else {
              request.setRequestHeader(key2, val);
            }
          });
        }
        if (!utils2.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol = parseProtocol2(fullPath);
        if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
          return;
        }
        request.send(requestData);
      });
    };
    return xhr;
  }
  var _null;
  var hasRequired_null;
  function require_null() {
    if (hasRequired_null) return _null;
    hasRequired_null = 1;
    _null = null;
    return _null;
  }
  var defaults_1;
  var hasRequiredDefaults;
  function requireDefaults() {
    if (hasRequiredDefaults) return defaults_1;
    hasRequiredDefaults = 1;
    var utils2 = requireUtils();
    var normalizeHeaderName2 = requireNormalizeHeaderName();
    var AxiosError = requireAxiosError();
    var transitionalDefaults = requireTransitional();
    var toFormData = requireToFormData();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils2.isUndefined(headers) && utils2.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = requireXhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = requireXhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils2.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils2.trim(rawValue);
        } catch (e2) {
          if (e2.name !== "SyntaxError") {
            throw e2;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data2, headers) {
        normalizeHeaderName2(headers, "Accept");
        normalizeHeaderName2(headers, "Content-Type");
        if (utils2.isFormData(data2) || utils2.isArrayBuffer(data2) || utils2.isBuffer(data2) || utils2.isStream(data2) || utils2.isFile(data2) || utils2.isBlob(data2)) {
          return data2;
        }
        if (utils2.isArrayBufferView(data2)) {
          return data2.buffer;
        }
        if (utils2.isURLSearchParams(data2)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data2.toString();
        }
        var isObjectPayload = utils2.isObject(data2);
        var contentType = headers && headers["Content-Type"];
        var isFileList;
        if ((isFileList = utils2.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? { "files[]": data2 } : data2, _FormData && new _FormData());
        } else if (isObjectPayload || contentType === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data2);
        }
        return data2;
      }],
      transformResponse: [function transformResponse(data2) {
        var transitional2 = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        var forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils2.isString(data2) && data2.length) {
          try {
            return JSON.parse(data2);
          } catch (e2) {
            if (strictJSONParsing) {
              if (e2.name === "SyntaxError") {
                throw AxiosError.from(e2, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e2;
            }
          }
        }
        return data2;
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
        FormData: require_null()
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils2.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils2.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils2.merge(DEFAULT_CONTENT_TYPE);
    });
    defaults_1 = defaults;
    return defaults_1;
  }
  var transformData;
  var hasRequiredTransformData;
  function requireTransformData() {
    if (hasRequiredTransformData) return transformData;
    hasRequiredTransformData = 1;
    var utils2 = requireUtils();
    var defaults = requireDefaults();
    transformData = function transformData2(data2, headers, fns) {
      var context = this || defaults;
      utils2.forEach(fns, function transform(fn) {
        data2 = fn.call(context, data2, headers);
      });
      return data2;
    };
    return transformData;
  }
  var isCancel;
  var hasRequiredIsCancel;
  function requireIsCancel() {
    if (hasRequiredIsCancel) return isCancel;
    hasRequiredIsCancel = 1;
    isCancel = function isCancel2(value) {
      return !!(value && value.__CANCEL__);
    };
    return isCancel;
  }
  var dispatchRequest;
  var hasRequiredDispatchRequest;
  function requireDispatchRequest() {
    if (hasRequiredDispatchRequest) return dispatchRequest;
    hasRequiredDispatchRequest = 1;
    var utils2 = requireUtils();
    var transformData2 = requireTransformData();
    var isCancel2 = requireIsCancel();
    var defaults = requireDefaults();
    var CanceledError = requireCanceledError();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new CanceledError();
      }
    }
    dispatchRequest = function dispatchRequest2(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData2.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils2.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils2.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData2.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel2(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData2.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
    return dispatchRequest;
  }
  var mergeConfig$1;
  var hasRequiredMergeConfig;
  function requireMergeConfig() {
    if (hasRequiredMergeConfig) return mergeConfig$1;
    hasRequiredMergeConfig = 1;
    var utils2 = requireUtils();
    mergeConfig$1 = function mergeConfig2(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils2.isPlainObject(target) && utils2.isPlainObject(source)) {
          return utils2.merge(target, source);
        } else if (utils2.isPlainObject(source)) {
          return utils2.merge({}, source);
        } else if (utils2.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils2.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils2.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils2.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils2.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils2.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "beforeRedirect": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils2.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge2 = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge2(prop);
        utils2.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
    return mergeConfig$1;
  }
  var data;
  var hasRequiredData;
  function requireData() {
    if (hasRequiredData) return data;
    hasRequiredData = 1;
    data = {
      "version": "0.27.2"
    };
    return data;
  }
  var validator;
  var hasRequiredValidator;
  function requireValidator() {
    if (hasRequiredValidator) return validator;
    hasRequiredValidator = 1;
    var VERSION = requireData().version;
    var AxiosError = requireAxiosError();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i2) {
      validators[type] = function validator2(thing) {
        return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional2(validator2, version2, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator2 === false) {
          throw new AxiosError(
            formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
            AxiosError.ERR_DEPRECATED
          );
        }
        if (version2 && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version2 + " and will be removed in the near future"
            )
          );
        }
        return validator2 ? validator2(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      var keys = Object.keys(options);
      var i2 = keys.length;
      while (i2-- > 0) {
        var opt = keys[i2];
        var validator2 = schema[opt];
        if (validator2) {
          var value = options[opt];
          var result2 = value === void 0 || validator2(value, opt, options);
          if (result2 !== true) {
            throw new AxiosError("option " + opt + " must be " + result2, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    validator = {
      assertOptions,
      validators
    };
    return validator;
  }
  var Axios_1;
  var hasRequiredAxios$2;
  function requireAxios$2() {
    if (hasRequiredAxios$2) return Axios_1;
    hasRequiredAxios$2 = 1;
    var utils2 = requireUtils();
    var buildURL2 = requireBuildURL();
    var InterceptorManager = requireInterceptorManager();
    var dispatchRequest2 = requireDispatchRequest();
    var mergeConfig2 = requireMergeConfig();
    var buildFullPath2 = requireBuildFullPath();
    var validator2 = requireValidator();
    var validators = validator2.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig2(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional2 = config.transitional;
      if (transitional2 !== void 0) {
        validator2.assertOptions(transitional2, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest2, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest2(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig2(this.defaults, config);
      var fullPath = buildFullPath2(config.baseURL, config.url);
      return buildURL2(fullPath, config.params, config.paramsSerializer);
    };
    utils2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig2(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils2.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data2, config) {
          return this.request(mergeConfig2(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url,
            data: data2
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    Axios_1 = Axios;
    return Axios_1;
  }
  var CancelToken_1;
  var hasRequiredCancelToken;
  function requireCancelToken() {
    if (hasRequiredCancelToken) return CancelToken_1;
    hasRequiredCancelToken = 1;
    var CanceledError = requireCanceledError();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token2 = this;
      this.promise.then(function(cancel) {
        if (!token2._listeners) return;
        var i2;
        var l2 = token2._listeners.length;
        for (i2 = 0; i2 < l2; i2++) {
          token2._listeners[i2](cancel);
        }
        token2._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token2.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token2.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token2.reason) {
          return;
        }
        token2.reason = new CanceledError(message);
        resolvePromise(token2.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token2 = new CancelToken(function executor(c2) {
        cancel = c2;
      });
      return {
        token: token2,
        cancel
      };
    };
    CancelToken_1 = CancelToken;
    return CancelToken_1;
  }
  var spread;
  var hasRequiredSpread;
  function requireSpread() {
    if (hasRequiredSpread) return spread;
    hasRequiredSpread = 1;
    spread = function spread2(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
    return spread;
  }
  var isAxiosError;
  var hasRequiredIsAxiosError;
  function requireIsAxiosError() {
    if (hasRequiredIsAxiosError) return isAxiosError;
    hasRequiredIsAxiosError = 1;
    var utils2 = requireUtils();
    isAxiosError = function isAxiosError2(payload) {
      return utils2.isObject(payload) && payload.isAxiosError === true;
    };
    return isAxiosError;
  }
  var hasRequiredAxios$1;
  function requireAxios$1() {
    if (hasRequiredAxios$1) return axios$2.exports;
    hasRequiredAxios$1 = 1;
    var utils2 = requireUtils();
    var bind2 = requireBind();
    var Axios = requireAxios$2();
    var mergeConfig2 = requireMergeConfig();
    var defaults = requireDefaults();
    function createInstance(defaultConfig2) {
      var context = new Axios(defaultConfig2);
      var instance = bind2(Axios.prototype.request, context);
      utils2.extend(instance, Axios.prototype, context);
      utils2.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig2(defaultConfig2, instanceConfig));
      };
      return instance;
    }
    var axios2 = createInstance(defaults);
    axios2.Axios = Axios;
    axios2.CanceledError = requireCanceledError();
    axios2.CancelToken = requireCancelToken();
    axios2.isCancel = requireIsCancel();
    axios2.VERSION = requireData().version;
    axios2.toFormData = requireToFormData();
    axios2.AxiosError = requireAxiosError();
    axios2.Cancel = axios2.CanceledError;
    axios2.all = function all(promises) {
      return Promise.all(promises);
    };
    axios2.spread = requireSpread();
    axios2.isAxiosError = requireIsAxiosError();
    axios$2.exports = axios2;
    axios$2.exports.default = axios2;
    return axios$2.exports;
  }
  var axios$1;
  var hasRequiredAxios;
  function requireAxios() {
    if (hasRequiredAxios) return axios$1;
    hasRequiredAxios = 1;
    axios$1 = requireAxios$1();
    return axios$1;
  }
  var axiosExports = requireAxios();
  const axios = /* @__PURE__ */ getDefaultExportFromCjs(axiosExports);
  const http = axios.create({});
  content;
  const host = "https://bbs.mobileapi.hupu.com";
  const path = "/3/7.3.8/threads/";
  function getCheckReply(tid, pid) {
    let url = host + path + "getCheckReply";
    return http.get(url, {
      params: {
        tid,
        pid,
        offline: "json",
        fid: 34
      }
    });
  }
  function getsThreadLightReplyList(tid) {
    let url = host + path + "getsThreadLightReplyList";
    return http.get(url, {
      params: {
        tid,
        offline: "json",
        fid: 34
      }
    });
  }
  const Api = {
    getCheckReply,
    getsThreadLightReplyList
  };
  content;
  const DialogProps = /* @__PURE__ */ ref([]);
  function updateActiveDialog() {
    nextTick(() => {
      const dialogEls = Array.from(document.querySelectorAll(".reply-dialog"));
      if (dialogEls.length > 0) {
        const last = dialogEls.pop();
        last.focus();
      }
    });
  }
  const open = (tid, pid) => {
    DialogProps.value.push({
      tid,
      pid
    });
  };
  const close = (pid) => {
    const index = DialogProps.value.findIndex((dp) => dp.pid === pid);
    DialogProps.value.splice(index, 1);
    updateActiveDialog();
  };
  const closeAll = () => {
    DialogProps.value = [];
  };
  const more1 = computed(() => DialogProps.value.length > 1);
  content;
  function bound01(n2, max) {
    if (isOnePointZero(n2)) {
      n2 = "100%";
    }
    var isPercent = isPercentage(n2);
    n2 = max === 360 ? n2 : Math.min(max, Math.max(0, parseFloat(n2)));
    if (isPercent) {
      n2 = parseInt(String(n2 * max), 10) / 100;
    }
    if (Math.abs(n2 - max) < 1e-6) {
      return 1;
    }
    if (max === 360) {
      n2 = (n2 < 0 ? n2 % max + max : n2 % max) / parseFloat(String(max));
    } else {
      n2 = n2 % max / parseFloat(String(max));
    }
    return n2;
  }
  function clamp01(val) {
    return Math.min(1, Math.max(0, val));
  }
  function isOnePointZero(n2) {
    return typeof n2 === "string" && n2.indexOf(".") !== -1 && parseFloat(n2) === 1;
  }
  function isPercentage(n2) {
    return typeof n2 === "string" && n2.indexOf("%") !== -1;
  }
  function boundAlpha(a2) {
    a2 = parseFloat(a2);
    if (isNaN(a2) || a2 < 0 || a2 > 1) {
      a2 = 1;
    }
    return a2;
  }
  function convertToPercentage(n2) {
    if (n2 <= 1) {
      return "".concat(Number(n2) * 100, "%");
    }
    return n2;
  }
  function pad2(c2) {
    return c2.length === 1 ? "0" + c2 : String(c2);
  }
  function rgbToRgb(r2, g2, b2) {
    return {
      r: bound01(r2, 255) * 255,
      g: bound01(g2, 255) * 255,
      b: bound01(b2, 255) * 255
    };
  }
  function rgbToHsl(r2, g2, b2) {
    r2 = bound01(r2, 255);
    g2 = bound01(g2, 255);
    b2 = bound01(b2, 255);
    var max = Math.max(r2, g2, b2);
    var min = Math.min(r2, g2, b2);
    var h2 = 0;
    var s2 = 0;
    var l2 = (max + min) / 2;
    if (max === min) {
      s2 = 0;
      h2 = 0;
    } else {
      var d2 = max - min;
      s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
      switch (max) {
        case r2:
          h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
          break;
        case g2:
          h2 = (b2 - r2) / d2 + 2;
          break;
        case b2:
          h2 = (r2 - g2) / d2 + 4;
          break;
      }
      h2 /= 6;
    }
    return { h: h2, s: s2, l: l2 };
  }
  function hue2rgb(p2, q2, t2) {
    if (t2 < 0) {
      t2 += 1;
    }
    if (t2 > 1) {
      t2 -= 1;
    }
    if (t2 < 1 / 6) {
      return p2 + (q2 - p2) * (6 * t2);
    }
    if (t2 < 1 / 2) {
      return q2;
    }
    if (t2 < 2 / 3) {
      return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
    }
    return p2;
  }
  function hslToRgb(h2, s2, l2) {
    var r2;
    var g2;
    var b2;
    h2 = bound01(h2, 360);
    s2 = bound01(s2, 100);
    l2 = bound01(l2, 100);
    if (s2 === 0) {
      g2 = l2;
      b2 = l2;
      r2 = l2;
    } else {
      var q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
      var p2 = 2 * l2 - q2;
      r2 = hue2rgb(p2, q2, h2 + 1 / 3);
      g2 = hue2rgb(p2, q2, h2);
      b2 = hue2rgb(p2, q2, h2 - 1 / 3);
    }
    return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
  }
  function rgbToHsv(r2, g2, b2) {
    r2 = bound01(r2, 255);
    g2 = bound01(g2, 255);
    b2 = bound01(b2, 255);
    var max = Math.max(r2, g2, b2);
    var min = Math.min(r2, g2, b2);
    var h2 = 0;
    var v2 = max;
    var d2 = max - min;
    var s2 = max === 0 ? 0 : d2 / max;
    if (max === min) {
      h2 = 0;
    } else {
      switch (max) {
        case r2:
          h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
          break;
        case g2:
          h2 = (b2 - r2) / d2 + 2;
          break;
        case b2:
          h2 = (r2 - g2) / d2 + 4;
          break;
      }
      h2 /= 6;
    }
    return { h: h2, s: s2, v: v2 };
  }
  function hsvToRgb(h2, s2, v2) {
    h2 = bound01(h2, 360) * 6;
    s2 = bound01(s2, 100);
    v2 = bound01(v2, 100);
    var i2 = Math.floor(h2);
    var f2 = h2 - i2;
    var p2 = v2 * (1 - s2);
    var q2 = v2 * (1 - f2 * s2);
    var t2 = v2 * (1 - (1 - f2) * s2);
    var mod = i2 % 6;
    var r2 = [v2, q2, p2, p2, t2, v2][mod];
    var g2 = [t2, v2, v2, q2, p2, p2][mod];
    var b2 = [p2, p2, t2, v2, v2, q2][mod];
    return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
  }
  function rgbToHex(r2, g2, b2, allow3Char) {
    var hex = [
      pad2(Math.round(r2).toString(16)),
      pad2(Math.round(g2).toString(16)),
      pad2(Math.round(b2).toString(16))
    ];
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  function rgbaToHex(r2, g2, b2, a2, allow4Char) {
    var hex = [
      pad2(Math.round(r2).toString(16)),
      pad2(Math.round(g2).toString(16)),
      pad2(Math.round(b2).toString(16)),
      pad2(convertDecimalToHex(a2))
    ];
    if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join("");
  }
  function convertDecimalToHex(d2) {
    return Math.round(parseFloat(d2) * 255).toString(16);
  }
  function convertHexToDecimal(h2) {
    return parseIntFromHex(h2) / 255;
  }
  function parseIntFromHex(val) {
    return parseInt(val, 16);
  }
  function numberInputToObject(color) {
    return {
      r: color >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  }
  var names = {
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
  function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a2 = 1;
    var s2 = null;
    var v2 = null;
    var l2 = null;
    var ok = false;
    var format = false;
    if (typeof color === "string") {
      color = stringInputToObject(color);
    }
    if (typeof color === "object") {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        rgb = rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        s2 = convertToPercentage(color.s);
        v2 = convertToPercentage(color.v);
        rgb = hsvToRgb(color.h, s2, v2);
        ok = true;
        format = "hsv";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        s2 = convertToPercentage(color.s);
        l2 = convertToPercentage(color.l);
        rgb = hslToRgb(color.h, s2, l2);
        ok = true;
        format = "hsl";
      }
      if (Object.prototype.hasOwnProperty.call(color, "a")) {
        a2 = color.a;
      }
    }
    a2 = boundAlpha(a2);
    return {
      ok,
      format: color.format || format,
      r: Math.min(255, Math.max(rgb.r, 0)),
      g: Math.min(255, Math.max(rgb.g, 0)),
      b: Math.min(255, Math.max(rgb.b, 0)),
      a: a2
    };
  }
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
  function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
      return false;
    }
    var named = false;
    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color === "transparent") {
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }
    var match2 = matchers.rgb.exec(color);
    if (match2) {
      return { r: match2[1], g: match2[2], b: match2[3] };
    }
    match2 = matchers.rgba.exec(color);
    if (match2) {
      return { r: match2[1], g: match2[2], b: match2[3], a: match2[4] };
    }
    match2 = matchers.hsl.exec(color);
    if (match2) {
      return { h: match2[1], s: match2[2], l: match2[3] };
    }
    match2 = matchers.hsla.exec(color);
    if (match2) {
      return { h: match2[1], s: match2[2], l: match2[3], a: match2[4] };
    }
    match2 = matchers.hsv.exec(color);
    if (match2) {
      return { h: match2[1], s: match2[2], v: match2[3] };
    }
    match2 = matchers.hsva.exec(color);
    if (match2) {
      return { h: match2[1], s: match2[2], v: match2[3], a: match2[4] };
    }
    match2 = matchers.hex8.exec(color);
    if (match2) {
      return {
        r: parseIntFromHex(match2[1]),
        g: parseIntFromHex(match2[2]),
        b: parseIntFromHex(match2[3]),
        a: convertHexToDecimal(match2[4]),
        format: named ? "name" : "hex8"
      };
    }
    match2 = matchers.hex6.exec(color);
    if (match2) {
      return {
        r: parseIntFromHex(match2[1]),
        g: parseIntFromHex(match2[2]),
        b: parseIntFromHex(match2[3]),
        format: named ? "name" : "hex"
      };
    }
    match2 = matchers.hex4.exec(color);
    if (match2) {
      return {
        r: parseIntFromHex(match2[1] + match2[1]),
        g: parseIntFromHex(match2[2] + match2[2]),
        b: parseIntFromHex(match2[3] + match2[3]),
        a: convertHexToDecimal(match2[4] + match2[4]),
        format: named ? "name" : "hex8"
      };
    }
    match2 = matchers.hex3.exec(color);
    if (match2) {
      return {
        r: parseIntFromHex(match2[1] + match2[1]),
        g: parseIntFromHex(match2[2] + match2[2]),
        b: parseIntFromHex(match2[3] + match2[3]),
        format: named ? "name" : "hex"
      };
    }
    return false;
  }
  function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
  }
  var TinyColor = (
    /** @class */
    function() {
      function TinyColor2(color, opts) {
        if (color === void 0) {
          color = "";
        }
        if (opts === void 0) {
          opts = {};
        }
        var _a;
        if (color instanceof TinyColor2) {
          return color;
        }
        if (typeof color === "number") {
          color = numberInputToObject(color);
        }
        this.originalInput = color;
        var rgb = inputToRGB(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
        this.gradientType = opts.gradientType;
        if (this.r < 1) {
          this.r = Math.round(this.r);
        }
        if (this.g < 1) {
          this.g = Math.round(this.g);
        }
        if (this.b < 1) {
          this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
      }
      TinyColor2.prototype.isDark = function() {
        return this.getBrightness() < 128;
      };
      TinyColor2.prototype.isLight = function() {
        return !this.isDark();
      };
      TinyColor2.prototype.getBrightness = function() {
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
      };
      TinyColor2.prototype.getLuminance = function() {
        var rgb = this.toRgb();
        var R2;
        var G;
        var B2;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
          R2 = RsRGB / 12.92;
        } else {
          R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
          G = GsRGB / 12.92;
        } else {
          G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
          B2 = BsRGB / 12.92;
        } else {
          B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R2 + 0.7152 * G + 0.0722 * B2;
      };
      TinyColor2.prototype.getAlpha = function() {
        return this.a;
      };
      TinyColor2.prototype.setAlpha = function(alpha) {
        this.a = boundAlpha(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
      };
      TinyColor2.prototype.isMonochrome = function() {
        var s2 = this.toHsl().s;
        return s2 === 0;
      };
      TinyColor2.prototype.toHsv = function() {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
      };
      TinyColor2.prototype.toHsvString = function() {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        var h2 = Math.round(hsv.h * 360);
        var s2 = Math.round(hsv.s * 100);
        var v2 = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%)") : "hsva(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%, ").concat(this.roundA, ")");
      };
      TinyColor2.prototype.toHsl = function() {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
      };
      TinyColor2.prototype.toHslString = function() {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        var h2 = Math.round(hsl.h * 360);
        var s2 = Math.round(hsl.s * 100);
        var l2 = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%)") : "hsla(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%, ").concat(this.roundA, ")");
      };
      TinyColor2.prototype.toHex = function(allow3Char) {
        if (allow3Char === void 0) {
          allow3Char = false;
        }
        return rgbToHex(this.r, this.g, this.b, allow3Char);
      };
      TinyColor2.prototype.toHexString = function(allow3Char) {
        if (allow3Char === void 0) {
          allow3Char = false;
        }
        return "#" + this.toHex(allow3Char);
      };
      TinyColor2.prototype.toHex8 = function(allow4Char) {
        if (allow4Char === void 0) {
          allow4Char = false;
        }
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
      };
      TinyColor2.prototype.toHex8String = function(allow4Char) {
        if (allow4Char === void 0) {
          allow4Char = false;
        }
        return "#" + this.toHex8(allow4Char);
      };
      TinyColor2.prototype.toHexShortString = function(allowShortChar) {
        if (allowShortChar === void 0) {
          allowShortChar = false;
        }
        return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
      };
      TinyColor2.prototype.toRgb = function() {
        return {
          r: Math.round(this.r),
          g: Math.round(this.g),
          b: Math.round(this.b),
          a: this.a
        };
      };
      TinyColor2.prototype.toRgbString = function() {
        var r2 = Math.round(this.r);
        var g2 = Math.round(this.g);
        var b2 = Math.round(this.b);
        return this.a === 1 ? "rgb(".concat(r2, ", ").concat(g2, ", ").concat(b2, ")") : "rgba(".concat(r2, ", ").concat(g2, ", ").concat(b2, ", ").concat(this.roundA, ")");
      };
      TinyColor2.prototype.toPercentageRgb = function() {
        var fmt = function(x2) {
          return "".concat(Math.round(bound01(x2, 255) * 100), "%");
        };
        return {
          r: fmt(this.r),
          g: fmt(this.g),
          b: fmt(this.b),
          a: this.a
        };
      };
      TinyColor2.prototype.toPercentageRgbString = function() {
        var rnd = function(x2) {
          return Math.round(bound01(x2, 255) * 100);
        };
        return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
      };
      TinyColor2.prototype.toName = function() {
        if (this.a === 0) {
          return "transparent";
        }
        if (this.a < 1) {
          return false;
        }
        var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
          var _b = _a[_i], key2 = _b[0], value = _b[1];
          if (hex === value) {
            return key2;
          }
        }
        return false;
      };
      TinyColor2.prototype.toString = function(format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
        if (needsAlphaFormat) {
          if (format === "name" && this.a === 0) {
            return this.toName();
          }
          return this.toRgbString();
        }
        if (format === "rgb") {
          formattedString = this.toRgbString();
        }
        if (format === "prgb") {
          formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
          formattedString = this.toHexString();
        }
        if (format === "hex3") {
          formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
          formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
          formattedString = this.toHex8String();
        }
        if (format === "name") {
          formattedString = this.toName();
        }
        if (format === "hsl") {
          formattedString = this.toHslString();
        }
        if (format === "hsv") {
          formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
      };
      TinyColor2.prototype.toNumber = function() {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
      };
      TinyColor2.prototype.clone = function() {
        return new TinyColor2(this.toString());
      };
      TinyColor2.prototype.lighten = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.brighten = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor2(rgb);
      };
      TinyColor2.prototype.darken = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.tint = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        return this.mix("white", amount);
      };
      TinyColor2.prototype.shade = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        return this.mix("black", amount);
      };
      TinyColor2.prototype.desaturate = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.saturate = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.greyscale = function() {
        return this.desaturate(100);
      };
      TinyColor2.prototype.spin = function(amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.mix = function(color, amount) {
        if (amount === void 0) {
          amount = 50;
        }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor2(color).toRgb();
        var p2 = amount / 100;
        var rgba = {
          r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
          g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
          b: (rgb2.b - rgb1.b) * p2 + rgb1.b,
          a: (rgb2.a - rgb1.a) * p2 + rgb1.a
        };
        return new TinyColor2(rgba);
      };
      TinyColor2.prototype.analogous = function(results, slices) {
        if (results === void 0) {
          results = 6;
        }
        if (slices === void 0) {
          slices = 30;
        }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
          hsl.h = (hsl.h + part) % 360;
          ret.push(new TinyColor2(hsl));
        }
        return ret;
      };
      TinyColor2.prototype.complement = function() {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.monochromatic = function(results) {
        if (results === void 0) {
          results = 6;
        }
        var hsv = this.toHsv();
        var h2 = hsv.h;
        var s2 = hsv.s;
        var v2 = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
          res.push(new TinyColor2({ h: h2, s: s2, v: v2 }));
          v2 = (v2 + modification) % 1;
        }
        return res;
      };
      TinyColor2.prototype.splitcomplement = function() {
        var hsl = this.toHsl();
        var h2 = hsl.h;
        return [
          this,
          new TinyColor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
          new TinyColor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
        ];
      };
      TinyColor2.prototype.onBackground = function(background) {
        var fg = this.toRgb();
        var bg = new TinyColor2(background).toRgb();
        var alpha = fg.a + bg.a * (1 - fg.a);
        return new TinyColor2({
          r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
          g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
          b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
          a: alpha
        });
      };
      TinyColor2.prototype.triad = function() {
        return this.polyad(3);
      };
      TinyColor2.prototype.tetrad = function() {
        return this.polyad(4);
      };
      TinyColor2.prototype.polyad = function(n2) {
        var hsl = this.toHsl();
        var h2 = hsl.h;
        var result2 = [this];
        var increment = 360 / n2;
        for (var i2 = 1; i2 < n2; i2++) {
          result2.push(new TinyColor2({ h: (h2 + i2 * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result2;
      };
      TinyColor2.prototype.equals = function(color) {
        return this.toRgbString() === new TinyColor2(color).toRgbString();
      };
      return TinyColor2;
    }()
  );
  var hueStep = 2;
  var saturationStep = 0.16;
  var saturationStep2 = 0.05;
  var brightnessStep1 = 0.05;
  var brightnessStep2 = 0.15;
  var lightColorCount = 5;
  var darkColorCount = 4;
  var darkColorMap = [{
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
  function toHsv(_ref) {
    var r2 = _ref.r, g2 = _ref.g, b2 = _ref.b;
    var hsv = rgbToHsv(r2, g2, b2);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v
    };
  }
  function toHex(_ref2) {
    var r2 = _ref2.r, g2 = _ref2.g, b2 = _ref2.b;
    return "#".concat(rgbToHex(r2, g2, b2, false));
  }
  function mix(rgb1, rgb2, amount) {
    var p2 = amount / 100;
    var rgb = {
      r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
      g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
      b: (rgb2.b - rgb1.b) * p2 + rgb1.b
    };
    return rgb;
  }
  function getHue(hsv, i2, light) {
    var hue;
    if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
      hue = light ? Math.round(hsv.h) - hueStep * i2 : Math.round(hsv.h) + hueStep * i2;
    } else {
      hue = light ? Math.round(hsv.h) + hueStep * i2 : Math.round(hsv.h) - hueStep * i2;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return hue;
  }
  function getSaturation(hsv, i2, light) {
    if (hsv.h === 0 && hsv.s === 0) {
      return hsv.s;
    }
    var saturation;
    if (light) {
      saturation = hsv.s - saturationStep * i2;
    } else if (i2 === darkColorCount) {
      saturation = hsv.s + saturationStep;
    } else {
      saturation = hsv.s + saturationStep2 * i2;
    }
    if (saturation > 1) {
      saturation = 1;
    }
    if (light && i2 === lightColorCount && saturation > 0.1) {
      saturation = 0.1;
    }
    if (saturation < 0.06) {
      saturation = 0.06;
    }
    return Number(saturation.toFixed(2));
  }
  function getValue$1(hsv, i2, light) {
    var value;
    if (light) {
      value = hsv.v + brightnessStep1 * i2;
    } else {
      value = hsv.v - brightnessStep2 * i2;
    }
    if (value > 1) {
      value = 1;
    }
    return Number(value.toFixed(2));
  }
  function generate$2(color) {
    var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var patterns = [];
    var pColor = inputToRGB(color);
    for (var i2 = lightColorCount; i2 > 0; i2 -= 1) {
      var hsv = toHsv(pColor);
      var colorString = toHex(inputToRGB({
        h: getHue(hsv, i2, true),
        s: getSaturation(hsv, i2, true),
        v: getValue$1(hsv, i2, true)
      }));
      patterns.push(colorString);
    }
    patterns.push(toHex(pColor));
    for (var _i = 1; _i <= darkColorCount; _i += 1) {
      var _hsv = toHsv(pColor);
      var _colorString = toHex(inputToRGB({
        h: getHue(_hsv, _i),
        s: getSaturation(_hsv, _i),
        v: getValue$1(_hsv, _i)
      }));
      patterns.push(_colorString);
    }
    if (opts.theme === "dark") {
      return darkColorMap.map(function(_ref3) {
        var index = _ref3.index, opacity = _ref3.opacity;
        var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || "#141414"), inputToRGB(patterns[index]), opacity * 100));
        return darkColorString;
      });
    }
    return patterns;
  }
  var presetPrimaryColors = {
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
  };
  var presetPalettes = {};
  var presetDarkPalettes = {};
  Object.keys(presetPrimaryColors).forEach(function(key2) {
    presetPalettes[key2] = generate$2(presetPrimaryColors[key2]);
    presetPalettes[key2].primary = presetPalettes[key2][5];
    presetDarkPalettes[key2] = generate$2(presetPrimaryColors[key2], {
      theme: "dark",
      backgroundColor: "#141414"
    });
    presetDarkPalettes[key2].primary = presetDarkPalettes[key2][5];
  });
  var blue = presetPalettes.blue;
  var containers = [];
  var styleElements = [];
  var usage = "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";
  function createStyleElement() {
    var styleElement = document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    return styleElement;
  }
  function insertCss(css, options) {
    options = options || {};
    if (css === void 0) {
      throw new Error(usage);
    }
    var position2 = options.prepend === true ? "prepend" : "append";
    var container = options.container !== void 0 ? options.container : document.querySelector("head");
    var containerId = containers.indexOf(container);
    if (containerId === -1) {
      containerId = containers.push(container) - 1;
      styleElements[containerId] = {};
    }
    var styleElement;
    if (styleElements[containerId] !== void 0 && styleElements[containerId][position2] !== void 0) {
      styleElement = styleElements[containerId][position2];
    } else {
      styleElement = styleElements[containerId][position2] = createStyleElement();
      if (position2 === "prepend") {
        container.insertBefore(styleElement, container.childNodes[0]);
      } else {
        container.appendChild(styleElement);
      }
    }
    if (css.charCodeAt(0) === 65279) {
      css = css.substr(1, css.length);
    }
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText += css;
    } else {
      styleElement.textContent += css;
    }
    return styleElement;
  }
  function _objectSpread$h(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$i(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$i(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function warn$1(valid, message) {
    if (!valid && console !== void 0) {
      console.error("Warning: ".concat(message));
    }
  }
  function warning$3(valid, message) {
    warn$1(valid, "[@ant-design/icons-vue] ".concat(message));
  }
  function isIconDefinition$1(target) {
    return typeof target === "object" && typeof target.name === "string" && typeof target.theme === "string" && (typeof target.icon === "object" || typeof target.icon === "function");
  }
  function generate$1(node2, key2, rootProps) {
    if (!rootProps) {
      return h$1(node2.tag, _objectSpread$h({
        key: key2
      }, node2.attrs), (node2.children || []).map(function(child, index) {
        return generate$1(child, "".concat(key2, "-").concat(node2.tag, "-").concat(index));
      }));
    }
    return h$1(node2.tag, _objectSpread$h({
      key: key2
    }, rootProps, node2.attrs), (node2.children || []).map(function(child, index) {
      return generate$1(child, "".concat(key2, "-").concat(node2.tag, "-").concat(index));
    }));
  }
  function getSecondaryColor$1(primaryColor) {
    return generate$2(primaryColor)[0];
  }
  function normalizeTwoToneColors$1(twoToneColor) {
    if (!twoToneColor) {
      return [];
    }
    return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
  }
  var iconStyles$1 = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
  var cssInjectedFlag = false;
  var useInsertStyles$1 = function useInsertStyles2() {
    var styleStr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : iconStyles$1;
    nextTick(function() {
      if (!cssInjectedFlag) {
        if (typeof window !== "undefined" && window.document && window.document.documentElement) {
          insertCss(styleStr, {
            prepend: true
          });
        }
        cssInjectedFlag = true;
      }
    });
  };
  var _excluded$3 = ["icon", "primaryColor", "secondaryColor"];
  function _objectWithoutProperties$3(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$3(source, excluded);
    var key2, i2;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
        key2 = sourceSymbolKeys[i2];
        if (excluded.indexOf(key2) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key2)) continue;
        target[key2] = source[key2];
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose$3(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key2, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key2 = sourceKeys[i2];
      if (excluded.indexOf(key2) >= 0) continue;
      target[key2] = source[key2];
    }
    return target;
  }
  function _objectSpread$g(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$h(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$h(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var twoToneColorPalette$1 = {
    primaryColor: "#333",
    secondaryColor: "#E6E6E6",
    calculated: false
  };
  function setTwoToneColors$1(_ref) {
    var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
    twoToneColorPalette$1.primaryColor = primaryColor;
    twoToneColorPalette$1.secondaryColor = secondaryColor || getSecondaryColor$1(primaryColor);
    twoToneColorPalette$1.calculated = !!secondaryColor;
  }
  function getTwoToneColors$1() {
    return _objectSpread$g({}, twoToneColorPalette$1);
  }
  var IconBase$1 = function IconBase2(props, context) {
    var _props$context$attrs = _objectSpread$g({}, props, context.attrs), icon = _props$context$attrs.icon, primaryColor = _props$context$attrs.primaryColor, secondaryColor = _props$context$attrs.secondaryColor, restProps = _objectWithoutProperties$3(_props$context$attrs, _excluded$3);
    var colors = twoToneColorPalette$1;
    if (primaryColor) {
      colors = {
        primaryColor,
        secondaryColor: secondaryColor || getSecondaryColor$1(primaryColor)
      };
    }
    useInsertStyles$1();
    warning$3(isIconDefinition$1(icon), "icon should be icon definiton, but got ".concat(icon));
    if (!isIconDefinition$1(icon)) {
      return null;
    }
    var target = icon;
    if (target && typeof target.icon === "function") {
      target = _objectSpread$g({}, target, {
        icon: target.icon(colors.primaryColor, colors.secondaryColor)
      });
    }
    return generate$1(target.icon, "svg-".concat(target.name), _objectSpread$g({}, restProps, {
      "data-icon": target.name,
      width: "1em",
      height: "1em",
      fill: "currentColor",
      "aria-hidden": "true"
    }));
  };
  IconBase$1.props = {
    icon: Object,
    primaryColor: String,
    secondaryColor: String,
    focusable: String
  };
  IconBase$1.inheritAttrs = false;
  IconBase$1.displayName = "IconBase";
  IconBase$1.getTwoToneColors = getTwoToneColors$1;
  IconBase$1.setTwoToneColors = setTwoToneColors$1;
  function _slicedToArray$3(arr, i2) {
    return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i2) || _unsupportedIterableToArray$3(arr, i2) || _nonIterableRest$3();
  }
  function _nonIterableRest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$3(o2, minLen) {
    if (!o2) return;
    if (typeof o2 === "string") return _arrayLikeToArray$3(o2, minLen);
    var n2 = Object.prototype.toString.call(o2).slice(8, -1);
    if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
    if (n2 === "Map" || n2 === "Set") return Array.from(o2);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$3(o2, minLen);
  }
  function _arrayLikeToArray$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  function _iterableToArrayLimit$3(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles$3(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function setTwoToneColor$1(twoToneColor) {
    var _normalizeTwoToneColo = normalizeTwoToneColors$1(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray$3(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
    return IconBase$1.setTwoToneColors({
      primaryColor,
      secondaryColor
    });
  }
  function getTwoToneColor$1() {
    var colors = IconBase$1.getTwoToneColors();
    if (!colors.calculated) {
      return colors.primaryColor;
    }
    return [colors.primaryColor, colors.secondaryColor];
  }
  var _excluded$2 = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];
  function _slicedToArray$2(arr, i2) {
    return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i2) || _unsupportedIterableToArray$2(arr, i2) || _nonIterableRest$2();
  }
  function _nonIterableRest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$2(o2, minLen) {
    if (!o2) return;
    if (typeof o2 === "string") return _arrayLikeToArray$2(o2, minLen);
    var n2 = Object.prototype.toString.call(o2).slice(8, -1);
    if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
    if (n2 === "Map" || n2 === "Set") return Array.from(o2);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$2(o2, minLen);
  }
  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  function _iterableToArrayLimit$2(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles$2(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _objectSpread$f(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$g(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$g(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _objectWithoutProperties$2(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$2(source, excluded);
    var key2, i2;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
        key2 = sourceSymbolKeys[i2];
        if (excluded.indexOf(key2) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key2)) continue;
        target[key2] = source[key2];
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose$2(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key2, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key2 = sourceKeys[i2];
      if (excluded.indexOf(key2) >= 0) continue;
      target[key2] = source[key2];
    }
    return target;
  }
  setTwoToneColor$1("#1890ff");
  var Icon$1 = function Icon2(props, context) {
    var _classObj;
    var _props$context$attrs = _objectSpread$f({}, props, context.attrs), cls2 = _props$context$attrs["class"], icon = _props$context$attrs.icon, spin = _props$context$attrs.spin, rotate = _props$context$attrs.rotate, tabindex = _props$context$attrs.tabindex, twoToneColor = _props$context$attrs.twoToneColor, onClick = _props$context$attrs.onClick, restProps = _objectWithoutProperties$2(_props$context$attrs, _excluded$2);
    var classObj = (_classObj = {
      anticon: true
    }, _defineProperty$g(_classObj, "anticon-".concat(icon.name), Boolean(icon.name)), _defineProperty$g(_classObj, cls2, cls2), _classObj);
    var svgClassString = spin === "" || !!spin || icon.name === "loading" ? "anticon-spin" : "";
    var iconTabIndex = tabindex;
    if (iconTabIndex === void 0 && onClick) {
      iconTabIndex = -1;
      restProps.tabindex = iconTabIndex;
    }
    var svgStyle = rotate ? {
      msTransform: "rotate(".concat(rotate, "deg)"),
      transform: "rotate(".concat(rotate, "deg)")
    } : void 0;
    var _normalizeTwoToneColo = normalizeTwoToneColors$1(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray$2(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
    return createVNode("span", _objectSpread$f({
      "role": "img",
      "aria-label": icon.name
    }, restProps, {
      "onClick": onClick,
      "class": classObj
    }), [createVNode(IconBase$1, {
      "class": svgClassString,
      "icon": icon,
      "primaryColor": primaryColor,
      "secondaryColor": secondaryColor,
      "style": svgStyle
    }, null)]);
  };
  Icon$1.props = {
    spin: Boolean,
    rotate: Number,
    icon: Object,
    twoToneColor: String
  };
  Icon$1.displayName = "AntdIcon";
  Icon$1.inheritAttrs = false;
  Icon$1.getTwoToneColor = getTwoToneColor$1;
  Icon$1.setTwoToneColor = setTwoToneColor$1;
  var CheckCircleFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" } }] }, "name": "check-circle", "theme": "filled" };
  var CheckCircleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" } }, { "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, "name": "check-circle", "theme": "outlined" };
  var CloseCircleFilled$1 = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, "name": "close-circle", "theme": "filled" };
  var CloseCircleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" } }] }, "name": "close-circle", "theme": "outlined" };
  var CloseOutlined$1 = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z" } }] }, "name": "close", "theme": "outlined" };
  var ExclamationCircleFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "exclamation-circle", "theme": "filled" };
  var ExclamationCircleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" } }] }, "name": "exclamation-circle", "theme": "outlined" };
  var InfoCircleFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "info-circle", "theme": "filled" };
  var InfoCircleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" } }] }, "name": "info-circle", "theme": "outlined" };
  var LikeOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" } }] }, "name": "like", "theme": "outlined" };
  function _objectSpread$e(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$f(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$f(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var LikeOutlined = function LikeOutlined2(props, context) {
    var p2 = _objectSpread$e({}, props, context.attrs);
    return createVNode(Icon$1, _objectSpread$e({}, p2, {
      "icon": LikeOutlined$1
    }), null);
  };
  LikeOutlined.displayName = "LikeOutlined";
  LikeOutlined.inheritAttrs = false;
  var LoadingOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, "name": "loading", "theme": "outlined" };
  var MessageOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z" } }] }, "name": "message", "theme": "outlined" };
  function _objectSpread$d(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$e(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$e(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var MessageOutlined = function MessageOutlined2(props, context) {
    var p2 = _objectSpread$d({}, props, context.attrs);
    return createVNode(Icon$1, _objectSpread$d({}, p2, {
      "icon": MessageOutlined$1
    }), null);
  };
  MessageOutlined.displayName = "MessageOutlined";
  MessageOutlined.inheritAttrs = false;
  const ReplyItem = /* @__PURE__ */ defineComponent({
    name: "ReplyItem",
    props: {
      /**
       * 帖子id
       */
      tid: {
        type: String,
        required: true
      },
      /**
       * 回复信息
       */
      reply: {
        type: Object,
        required: true
      },
      /**
       * 是否是作者
       * 在弹框的顶部，显示当前正在查看的回复
       * 弹框下方的列表，都是回复该作者的。
       */
      isAuthor: Boolean
    },
    setup(props) {
      const {
        reply
      } = props;
      const contentRef = /* @__PURE__ */ ref();
      const userUrl = computed(() => {
        return `//my.hupu.com/` + reply.puid;
      });
      function viewReply() {
        if (reply.check_reply_info) {
          if (reply.check_reply_info.num > 0) {
            open(props.tid, reply.pid);
          }
        }
      }
      onMounted(() => {
        const contentEl = contentRef.value;
        for (const img of contentEl.querySelectorAll("img")) {
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.dataset.src = "";
          }
          if (img.dataset.gif) {
            img.classList.add("is-gif");
            img.addEventListener("click", function() {
              this.src = this.dataset.gif;
            });
          }
        }
      });
      return () => {
        var _a;
        return createVNode("div", {
          "class": "reply-item"
        }, [createVNode("a", {
          "href": userUrl.value,
          "target": "_blank"
        }, [createVNode("img", {
          "class": "user-img",
          "src": reply.userImg,
          "alt": reply.userName
        }, null)]), createVNode("div", {
          "class": "reply-right"
        }, [createVNode("div", {
          "class": "reply-header"
        }, [createVNode("div", {
          "className": "user"
        }, [createVNode("a", {
          "href": userUrl.value,
          "target": "_blank"
        }, [createVNode("div", {
          "class": "user-name"
        }, [reply.userName])]), createVNode("span", {
          "class": "time"
        }, [reply.time]), createVNode("span", null, [reply.location])]), createVNode("div", {
          "class": "reply-info-operate"
        }, [createVNode("div", null, [createVNode(LikeOutlined, null, null), createVNode("span", null, [reply.light_count])]), props.isAuthor ? null : createVNode("div", {
          "class": "reply",
          "onClick": viewReply
        }, [createVNode(MessageOutlined, null, null), createVNode("span", null, [((_a = reply.check_reply_info) == null ? void 0 : _a.num) || 0])])])]), createVNode("p", {
          "class": "content",
          "ref": contentRef,
          "innerHTML": reply.content
        }, null)])]);
      };
    }
  });
  /*!
   * perfect-scrollbar v1.5.6
   * Copyright 2024 Hyunje Jun, MDBootstrap and Contributors
   * Licensed under MIT
   */
  function get(element) {
    return getComputedStyle(element);
  }
  function set(element, obj) {
    for (var key2 in obj) {
      var val = obj[key2];
      if (typeof val === "number") {
        val = val + "px";
      }
      element.style[key2] = val;
    }
    return element;
  }
  function div(className) {
    var div2 = document.createElement("div");
    div2.className = className;
    return div2;
  }
  var elMatches = typeof Element !== "undefined" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
  function matches(element, query) {
    if (!elMatches) {
      throw new Error("No element matching method supported");
    }
    return elMatches.call(element, query);
  }
  function remove(element) {
    if (element.remove) {
      element.remove();
    } else {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }
  function queryChildren(element, selector) {
    return Array.prototype.filter.call(
      element.children,
      function(child) {
        return matches(child, selector);
      }
    );
  }
  var cls = {
    main: "ps",
    rtl: "ps__rtl",
    element: {
      thumb: function(x2) {
        return "ps__thumb-" + x2;
      },
      rail: function(x2) {
        return "ps__rail-" + x2;
      },
      consuming: "ps__child--consume"
    },
    state: {
      focus: "ps--focus",
      clicking: "ps--clicking",
      active: function(x2) {
        return "ps--active-" + x2;
      },
      scrolling: function(x2) {
        return "ps--scrolling-" + x2;
      }
    }
  };
  var scrollingClassTimeout = { x: null, y: null };
  function addScrollingClass(i2, x2) {
    var classList = i2.element.classList;
    var className = cls.state.scrolling(x2);
    if (classList.contains(className)) {
      clearTimeout(scrollingClassTimeout[x2]);
    } else {
      classList.add(className);
    }
  }
  function removeScrollingClass(i2, x2) {
    scrollingClassTimeout[x2] = setTimeout(
      function() {
        return i2.isAlive && i2.element.classList.remove(cls.state.scrolling(x2));
      },
      i2.settings.scrollingThreshold
    );
  }
  function setScrollingClassInstantly(i2, x2) {
    addScrollingClass(i2, x2);
    removeScrollingClass(i2, x2);
  }
  var EventElement = function EventElement2(element) {
    this.element = element;
    this.handlers = {};
  };
  var prototypeAccessors = { isEmpty: { configurable: true } };
  EventElement.prototype.bind = function bind2(eventName, handler) {
    if (typeof this.handlers[eventName] === "undefined") {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, false);
  };
  EventElement.prototype.unbind = function unbind(eventName, target) {
    var this$1$1 = this;
    this.handlers[eventName] = this.handlers[eventName].filter(function(handler) {
      if (target && handler !== target) {
        return true;
      }
      this$1$1.element.removeEventListener(eventName, handler, false);
      return false;
    });
  };
  EventElement.prototype.unbindAll = function unbindAll() {
    for (var name in this.handlers) {
      this.unbind(name);
    }
  };
  prototypeAccessors.isEmpty.get = function() {
    var this$1$1 = this;
    return Object.keys(this.handlers).every(
      function(key2) {
        return this$1$1.handlers[key2].length === 0;
      }
    );
  };
  Object.defineProperties(EventElement.prototype, prototypeAccessors);
  var EventManager = function EventManager2() {
    this.eventElements = [];
  };
  EventManager.prototype.eventElement = function eventElement(element) {
    var ee = this.eventElements.filter(function(ee2) {
      return ee2.element === element;
    })[0];
    if (!ee) {
      ee = new EventElement(element);
      this.eventElements.push(ee);
    }
    return ee;
  };
  EventManager.prototype.bind = function bind2(element, eventName, handler) {
    this.eventElement(element).bind(eventName, handler);
  };
  EventManager.prototype.unbind = function unbind(element, eventName, handler) {
    var ee = this.eventElement(element);
    ee.unbind(eventName, handler);
    if (ee.isEmpty) {
      this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
  };
  EventManager.prototype.unbindAll = function unbindAll() {
    this.eventElements.forEach(function(e2) {
      return e2.unbindAll();
    });
    this.eventElements = [];
  };
  EventManager.prototype.once = function once(element, eventName, handler) {
    var ee = this.eventElement(element);
    var onceHandler = function(evt) {
      ee.unbind(eventName, onceHandler);
      handler(evt);
    };
    ee.bind(eventName, onceHandler);
  };
  function createEvent(name) {
    if (typeof window.CustomEvent === "function") {
      return new CustomEvent(name);
    }
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(name, false, false, void 0);
    return evt;
  }
  function processScrollDiff(i2, axis, diff, useScrollingClass, forceFireReachEvent) {
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;
    var fields;
    if (axis === "top") {
      fields = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
    } else if (axis === "left") {
      fields = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"];
    } else {
      throw new Error("A proper axis should be provided");
    }
    processScrollDiff$1(i2, diff, fields, useScrollingClass, forceFireReachEvent);
  }
  function processScrollDiff$1(i2, diff, ref2, useScrollingClass, forceFireReachEvent) {
    var contentHeight = ref2[0];
    var containerHeight = ref2[1];
    var scrollTop = ref2[2];
    var y2 = ref2[3];
    var up = ref2[4];
    var down = ref2[5];
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;
    var element = i2.element;
    i2.reach[y2] = null;
    if (element[scrollTop] < 1) {
      i2.reach[y2] = "start";
    }
    if (element[scrollTop] > i2[contentHeight] - i2[containerHeight] - 1) {
      i2.reach[y2] = "end";
    }
    if (diff) {
      element.dispatchEvent(createEvent("ps-scroll-" + y2));
      if (diff < 0) {
        element.dispatchEvent(createEvent("ps-scroll-" + up));
      } else if (diff > 0) {
        element.dispatchEvent(createEvent("ps-scroll-" + down));
      }
      if (useScrollingClass) {
        setScrollingClassInstantly(i2, y2);
      }
    }
    if (i2.reach[y2] && (diff || forceFireReachEvent)) {
      element.dispatchEvent(createEvent("ps-" + y2 + "-reach-" + i2.reach[y2]));
    }
  }
  function toInt(x2) {
    return parseInt(x2, 10) || 0;
  }
  function isEditable(el) {
    return matches(el, "input,[contenteditable]") || matches(el, "select,[contenteditable]") || matches(el, "textarea,[contenteditable]") || matches(el, "button,[contenteditable]");
  }
  function outerWidth(element) {
    var styles = get(element);
    return toInt(styles.width) + toInt(styles.paddingLeft) + toInt(styles.paddingRight) + toInt(styles.borderLeftWidth) + toInt(styles.borderRightWidth);
  }
  var env = {
    isWebKit: typeof document !== "undefined" && "WebkitAppearance" in document.documentElement.style,
    supportsTouch: typeof window !== "undefined" && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
    supportsIePointer: typeof navigator !== "undefined" && navigator.msMaxTouchPoints,
    isChrome: typeof navigator !== "undefined" && /Chrome/i.test(navigator && navigator.userAgent)
  };
  function updateGeometry(i2) {
    var element = i2.element;
    var roundedScrollTop = Math.floor(element.scrollTop);
    var rect = element.getBoundingClientRect();
    i2.containerWidth = Math.floor(rect.width);
    i2.containerHeight = Math.floor(rect.height);
    i2.contentWidth = element.scrollWidth;
    i2.contentHeight = element.scrollHeight;
    if (!element.contains(i2.scrollbarXRail)) {
      queryChildren(element, cls.element.rail("x")).forEach(function(el) {
        return remove(el);
      });
      element.appendChild(i2.scrollbarXRail);
    }
    if (!element.contains(i2.scrollbarYRail)) {
      queryChildren(element, cls.element.rail("y")).forEach(function(el) {
        return remove(el);
      });
      element.appendChild(i2.scrollbarYRail);
    }
    if (!i2.settings.suppressScrollX && i2.containerWidth + i2.settings.scrollXMarginOffset < i2.contentWidth) {
      i2.scrollbarXActive = true;
      i2.railXWidth = i2.containerWidth - i2.railXMarginWidth;
      i2.railXRatio = i2.containerWidth / i2.railXWidth;
      i2.scrollbarXWidth = getThumbSize(i2, toInt(i2.railXWidth * i2.containerWidth / i2.contentWidth));
      i2.scrollbarXLeft = toInt(
        (i2.negativeScrollAdjustment + element.scrollLeft) * (i2.railXWidth - i2.scrollbarXWidth) / (i2.contentWidth - i2.containerWidth)
      );
    } else {
      i2.scrollbarXActive = false;
    }
    if (!i2.settings.suppressScrollY && i2.containerHeight + i2.settings.scrollYMarginOffset < i2.contentHeight) {
      i2.scrollbarYActive = true;
      i2.railYHeight = i2.containerHeight - i2.railYMarginHeight;
      i2.railYRatio = i2.containerHeight / i2.railYHeight;
      i2.scrollbarYHeight = getThumbSize(
        i2,
        toInt(i2.railYHeight * i2.containerHeight / i2.contentHeight)
      );
      i2.scrollbarYTop = toInt(
        roundedScrollTop * (i2.railYHeight - i2.scrollbarYHeight) / (i2.contentHeight - i2.containerHeight)
      );
    } else {
      i2.scrollbarYActive = false;
    }
    if (i2.scrollbarXLeft >= i2.railXWidth - i2.scrollbarXWidth) {
      i2.scrollbarXLeft = i2.railXWidth - i2.scrollbarXWidth;
    }
    if (i2.scrollbarYTop >= i2.railYHeight - i2.scrollbarYHeight) {
      i2.scrollbarYTop = i2.railYHeight - i2.scrollbarYHeight;
    }
    updateCss(element, i2);
    if (i2.scrollbarXActive) {
      element.classList.add(cls.state.active("x"));
    } else {
      element.classList.remove(cls.state.active("x"));
      i2.scrollbarXWidth = 0;
      i2.scrollbarXLeft = 0;
      element.scrollLeft = i2.isRtl === true ? i2.contentWidth : 0;
    }
    if (i2.scrollbarYActive) {
      element.classList.add(cls.state.active("y"));
    } else {
      element.classList.remove(cls.state.active("y"));
      i2.scrollbarYHeight = 0;
      i2.scrollbarYTop = 0;
      element.scrollTop = 0;
    }
  }
  function getThumbSize(i2, thumbSize) {
    if (i2.settings.minScrollbarLength) {
      thumbSize = Math.max(thumbSize, i2.settings.minScrollbarLength);
    }
    if (i2.settings.maxScrollbarLength) {
      thumbSize = Math.min(thumbSize, i2.settings.maxScrollbarLength);
    }
    return thumbSize;
  }
  function updateCss(element, i2) {
    var xRailOffset = { width: i2.railXWidth };
    var roundedScrollTop = Math.floor(element.scrollTop);
    if (i2.isRtl) {
      xRailOffset.left = i2.negativeScrollAdjustment + element.scrollLeft + i2.containerWidth - i2.contentWidth;
    } else {
      xRailOffset.left = element.scrollLeft;
    }
    if (i2.isScrollbarXUsingBottom) {
      xRailOffset.bottom = i2.scrollbarXBottom - roundedScrollTop;
    } else {
      xRailOffset.top = i2.scrollbarXTop + roundedScrollTop;
    }
    set(i2.scrollbarXRail, xRailOffset);
    var yRailOffset = { top: roundedScrollTop, height: i2.railYHeight };
    if (i2.isScrollbarYUsingRight) {
      if (i2.isRtl) {
        yRailOffset.right = i2.contentWidth - (i2.negativeScrollAdjustment + element.scrollLeft) - i2.scrollbarYRight - i2.scrollbarYOuterWidth - 9;
      } else {
        yRailOffset.right = i2.scrollbarYRight - element.scrollLeft;
      }
    } else {
      if (i2.isRtl) {
        yRailOffset.left = i2.negativeScrollAdjustment + element.scrollLeft + i2.containerWidth * 2 - i2.contentWidth - i2.scrollbarYLeft - i2.scrollbarYOuterWidth;
      } else {
        yRailOffset.left = i2.scrollbarYLeft + element.scrollLeft;
      }
    }
    set(i2.scrollbarYRail, yRailOffset);
    set(i2.scrollbarX, {
      left: i2.scrollbarXLeft,
      width: i2.scrollbarXWidth - i2.railBorderXWidth
    });
    set(i2.scrollbarY, {
      top: i2.scrollbarYTop,
      height: i2.scrollbarYHeight - i2.railBorderYWidth
    });
  }
  function clickRail(i2) {
    i2.event.bind(i2.scrollbarY, "mousedown", function(e2) {
      return e2.stopPropagation();
    });
    i2.event.bind(i2.scrollbarYRail, "mousedown", function(e2) {
      var positionTop = e2.pageY - window.pageYOffset - i2.scrollbarYRail.getBoundingClientRect().top;
      var direction = positionTop > i2.scrollbarYTop ? 1 : -1;
      i2.element.scrollTop += direction * i2.containerHeight;
      updateGeometry(i2);
      e2.stopPropagation();
    });
    i2.event.bind(i2.scrollbarX, "mousedown", function(e2) {
      return e2.stopPropagation();
    });
    i2.event.bind(i2.scrollbarXRail, "mousedown", function(e2) {
      var positionLeft = e2.pageX - window.pageXOffset - i2.scrollbarXRail.getBoundingClientRect().left;
      var direction = positionLeft > i2.scrollbarXLeft ? 1 : -1;
      i2.element.scrollLeft += direction * i2.containerWidth;
      updateGeometry(i2);
      e2.stopPropagation();
    });
  }
  var activeSlider = null;
  function setupScrollHandlers(i2) {
    bindMouseScrollHandler(i2, [
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
    bindMouseScrollHandler(i2, [
      "containerWidth",
      "contentWidth",
      "pageX",
      "railXWidth",
      "scrollbarX",
      "scrollbarXWidth",
      "scrollLeft",
      "x",
      "scrollbarXRail"
    ]);
  }
  function bindMouseScrollHandler(i2, ref2) {
    var containerDimension = ref2[0];
    var contentDimension = ref2[1];
    var pageAxis = ref2[2];
    var railDimension = ref2[3];
    var scrollbarAxis = ref2[4];
    var scrollbarDimension = ref2[5];
    var scrollAxis = ref2[6];
    var axis = ref2[7];
    var scrollbarRail = ref2[8];
    var element = i2.element;
    var startingScrollPosition = null;
    var startingMousePagePosition = null;
    var scrollBy = null;
    function moveHandler(e2) {
      if (e2.touches && e2.touches[0]) {
        e2[pageAxis] = e2.touches[0]["page" + axis.toUpperCase()];
      }
      if (activeSlider === scrollbarAxis) {
        element[scrollAxis] = startingScrollPosition + scrollBy * (e2[pageAxis] - startingMousePagePosition);
        addScrollingClass(i2, axis);
        updateGeometry(i2);
        e2.stopPropagation();
        e2.preventDefault();
      }
    }
    function endHandler() {
      removeScrollingClass(i2, axis);
      i2[scrollbarRail].classList.remove(cls.state.clicking);
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", endHandler);
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", endHandler);
      activeSlider = null;
    }
    function bindMoves(e2) {
      if (activeSlider === null) {
        activeSlider = scrollbarAxis;
        startingScrollPosition = element[scrollAxis];
        if (e2.touches) {
          e2[pageAxis] = e2.touches[0]["page" + axis.toUpperCase()];
        }
        startingMousePagePosition = e2[pageAxis];
        scrollBy = (i2[contentDimension] - i2[containerDimension]) / (i2[railDimension] - i2[scrollbarDimension]);
        if (!e2.touches) {
          document.addEventListener("mousemove", moveHandler);
          document.addEventListener("mouseup", endHandler);
        } else {
          document.addEventListener("touchmove", moveHandler, { passive: false });
          document.addEventListener("touchend", endHandler);
        }
        i2[scrollbarRail].classList.add(cls.state.clicking);
      }
      e2.stopPropagation();
      if (e2.cancelable) {
        e2.preventDefault();
      }
    }
    i2[scrollbarAxis].addEventListener("mousedown", bindMoves);
    i2[scrollbarAxis].addEventListener("touchstart", bindMoves);
  }
  function keyboard(i2) {
    var element = i2.element;
    var elementHovered = function() {
      return matches(element, ":hover");
    };
    var scrollbarFocused = function() {
      return matches(i2.scrollbarX, ":focus") || matches(i2.scrollbarY, ":focus");
    };
    function shouldPreventDefault(deltaX, deltaY) {
      var scrollTop = Math.floor(element.scrollTop);
      if (deltaX === 0) {
        if (!i2.scrollbarYActive) {
          return false;
        }
        if (scrollTop === 0 && deltaY > 0 || scrollTop >= i2.contentHeight - i2.containerHeight && deltaY < 0) {
          return !i2.settings.wheelPropagation;
        }
      }
      var scrollLeft = element.scrollLeft;
      if (deltaY === 0) {
        if (!i2.scrollbarXActive) {
          return false;
        }
        if (scrollLeft === 0 && deltaX < 0 || scrollLeft >= i2.contentWidth - i2.containerWidth && deltaX > 0) {
          return !i2.settings.wheelPropagation;
        }
      }
      return true;
    }
    i2.event.bind(i2.ownerDocument, "keydown", function(e2) {
      if (e2.isDefaultPrevented && e2.isDefaultPrevented() || e2.defaultPrevented) {
        return;
      }
      if (!elementHovered() && !scrollbarFocused()) {
        return;
      }
      var activeElement = document.activeElement ? document.activeElement : i2.ownerDocument.activeElement;
      if (activeElement) {
        if (activeElement.tagName === "IFRAME") {
          activeElement = activeElement.contentDocument.activeElement;
        } else {
          while (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
          }
        }
        if (isEditable(activeElement)) {
          return;
        }
      }
      var deltaX = 0;
      var deltaY = 0;
      switch (e2.which) {
        case 37:
          if (e2.metaKey) {
            deltaX = -i2.contentWidth;
          } else if (e2.altKey) {
            deltaX = -i2.containerWidth;
          } else {
            deltaX = -30;
          }
          break;
        case 38:
          if (e2.metaKey) {
            deltaY = i2.contentHeight;
          } else if (e2.altKey) {
            deltaY = i2.containerHeight;
          } else {
            deltaY = 30;
          }
          break;
        case 39:
          if (e2.metaKey) {
            deltaX = i2.contentWidth;
          } else if (e2.altKey) {
            deltaX = i2.containerWidth;
          } else {
            deltaX = 30;
          }
          break;
        case 40:
          if (e2.metaKey) {
            deltaY = -i2.contentHeight;
          } else if (e2.altKey) {
            deltaY = -i2.containerHeight;
          } else {
            deltaY = -30;
          }
          break;
        case 32:
          if (e2.shiftKey) {
            deltaY = i2.containerHeight;
          } else {
            deltaY = -i2.containerHeight;
          }
          break;
        case 33:
          deltaY = i2.containerHeight;
          break;
        case 34:
          deltaY = -i2.containerHeight;
          break;
        case 36:
          deltaY = i2.contentHeight;
          break;
        case 35:
          deltaY = -i2.contentHeight;
          break;
        default:
          return;
      }
      if (i2.settings.suppressScrollX && deltaX !== 0) {
        return;
      }
      if (i2.settings.suppressScrollY && deltaY !== 0) {
        return;
      }
      element.scrollTop -= deltaY;
      element.scrollLeft += deltaX;
      updateGeometry(i2);
      if (shouldPreventDefault(deltaX, deltaY)) {
        e2.preventDefault();
      }
    });
  }
  function wheel(i2) {
    var element = i2.element;
    function shouldPreventDefault(deltaX, deltaY) {
      var roundedScrollTop = Math.floor(element.scrollTop);
      var isTop = element.scrollTop === 0;
      var isBottom = roundedScrollTop + element.offsetHeight === element.scrollHeight;
      var isLeft = element.scrollLeft === 0;
      var isRight = element.scrollLeft + element.offsetWidth === element.scrollWidth;
      var hitsBound;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        hitsBound = isTop || isBottom;
      } else {
        hitsBound = isLeft || isRight;
      }
      return hitsBound ? !i2.settings.wheelPropagation : true;
    }
    function getDeltaFromEvent(e2) {
      var deltaX = e2.deltaX;
      var deltaY = -1 * e2.deltaY;
      if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
        deltaX = -1 * e2.wheelDeltaX / 6;
        deltaY = e2.wheelDeltaY / 6;
      }
      if (e2.deltaMode && e2.deltaMode === 1) {
        deltaX *= 10;
        deltaY *= 10;
      }
      if (deltaX !== deltaX && deltaY !== deltaY) {
        deltaX = 0;
        deltaY = e2.wheelDelta;
      }
      if (e2.shiftKey) {
        return [-deltaY, -deltaX];
      }
      return [deltaX, deltaY];
    }
    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      if (!env.isWebKit && element.querySelector("select:focus")) {
        return true;
      }
      if (!element.contains(target)) {
        return false;
      }
      var cursor = target;
      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }
        var style = get(cursor);
        if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (cursor.scrollTop > 0 && deltaY < 0 || cursor.scrollTop < maxScrollTop && deltaY > 0) {
              return true;
            }
          }
        }
        if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
          var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (cursor.scrollLeft > 0 && deltaX < 0 || cursor.scrollLeft < maxScrollLeft && deltaX > 0) {
              return true;
            }
          }
        }
        cursor = cursor.parentNode;
      }
      return false;
    }
    function mousewheelHandler(e2) {
      var ref2 = getDeltaFromEvent(e2);
      var deltaX = ref2[0];
      var deltaY = ref2[1];
      if (shouldBeConsumedByChild(e2.target, deltaX, deltaY)) {
        return;
      }
      var shouldPrevent = false;
      if (!i2.settings.useBothWheelAxes) {
        element.scrollTop -= deltaY * i2.settings.wheelSpeed;
        element.scrollLeft += deltaX * i2.settings.wheelSpeed;
      } else if (i2.scrollbarYActive && !i2.scrollbarXActive) {
        if (deltaY) {
          element.scrollTop -= deltaY * i2.settings.wheelSpeed;
        } else {
          element.scrollTop += deltaX * i2.settings.wheelSpeed;
        }
        shouldPrevent = true;
      } else if (i2.scrollbarXActive && !i2.scrollbarYActive) {
        if (deltaX) {
          element.scrollLeft += deltaX * i2.settings.wheelSpeed;
        } else {
          element.scrollLeft -= deltaY * i2.settings.wheelSpeed;
        }
        shouldPrevent = true;
      }
      updateGeometry(i2);
      shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
      if (shouldPrevent && !e2.ctrlKey) {
        e2.stopPropagation();
        e2.preventDefault();
      }
    }
    if (typeof window.onwheel !== "undefined") {
      i2.event.bind(element, "wheel", mousewheelHandler);
    } else if (typeof window.onmousewheel !== "undefined") {
      i2.event.bind(element, "mousewheel", mousewheelHandler);
    }
  }
  function touch(i2) {
    if (!env.supportsTouch && !env.supportsIePointer) {
      return;
    }
    var element = i2.element;
    var state = {
      startOffset: {},
      startTime: 0,
      speed: {},
      easingLoop: null
    };
    function shouldPrevent(deltaX, deltaY) {
      var scrollTop = Math.floor(element.scrollTop);
      var scrollLeft = element.scrollLeft;
      var magnitudeX = Math.abs(deltaX);
      var magnitudeY = Math.abs(deltaY);
      if (magnitudeY > magnitudeX) {
        if (deltaY < 0 && scrollTop === i2.contentHeight - i2.containerHeight || deltaY > 0 && scrollTop === 0) {
          return window.scrollY === 0 && deltaY > 0 && env.isChrome;
        }
      } else if (magnitudeX > magnitudeY) {
        if (deltaX < 0 && scrollLeft === i2.contentWidth - i2.containerWidth || deltaX > 0 && scrollLeft === 0) {
          return true;
        }
      }
      return true;
    }
    function applyTouchMove(differenceX, differenceY) {
      element.scrollTop -= differenceY;
      element.scrollLeft -= differenceX;
      updateGeometry(i2);
    }
    function getTouch(e2) {
      if (e2.targetTouches) {
        return e2.targetTouches[0];
      }
      return e2;
    }
    function shouldHandle(e2) {
      if (e2.target === i2.scrollbarX || e2.target === i2.scrollbarY) {
        return false;
      }
      if (e2.pointerType && e2.pointerType === "pen" && e2.buttons === 0) {
        return false;
      }
      if (e2.targetTouches && e2.targetTouches.length === 1) {
        return true;
      }
      if (e2.pointerType && e2.pointerType !== "mouse" && e2.pointerType !== e2.MSPOINTER_TYPE_MOUSE) {
        return true;
      }
      return false;
    }
    function touchStart(e2) {
      if (!shouldHandle(e2)) {
        return;
      }
      var touch2 = getTouch(e2);
      state.startOffset.pageX = touch2.pageX;
      state.startOffset.pageY = touch2.pageY;
      state.startTime = (/* @__PURE__ */ new Date()).getTime();
      if (state.easingLoop !== null) {
        clearInterval(state.easingLoop);
      }
    }
    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      if (!element.contains(target)) {
        return false;
      }
      var cursor = target;
      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }
        var style = get(cursor);
        if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (cursor.scrollTop > 0 && deltaY < 0 || cursor.scrollTop < maxScrollTop && deltaY > 0) {
              return true;
            }
          }
        }
        if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
          var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (cursor.scrollLeft > 0 && deltaX < 0 || cursor.scrollLeft < maxScrollLeft && deltaX > 0) {
              return true;
            }
          }
        }
        cursor = cursor.parentNode;
      }
      return false;
    }
    function touchMove(e2) {
      if (shouldHandle(e2)) {
        var touch2 = getTouch(e2);
        var currentOffset = { pageX: touch2.pageX, pageY: touch2.pageY };
        var differenceX = currentOffset.pageX - state.startOffset.pageX;
        var differenceY = currentOffset.pageY - state.startOffset.pageY;
        if (shouldBeConsumedByChild(e2.target, differenceX, differenceY)) {
          return;
        }
        applyTouchMove(differenceX, differenceY);
        state.startOffset = currentOffset;
        var currentTime = (/* @__PURE__ */ new Date()).getTime();
        var timeGap = currentTime - state.startTime;
        if (timeGap > 0) {
          state.speed.x = differenceX / timeGap;
          state.speed.y = differenceY / timeGap;
          state.startTime = currentTime;
        }
        if (shouldPrevent(differenceX, differenceY)) {
          if (e2.cancelable) {
            e2.preventDefault();
          }
        }
      }
    }
    function touchEnd() {
      if (i2.settings.swipeEasing) {
        clearInterval(state.easingLoop);
        state.easingLoop = setInterval(function() {
          if (i2.isInitialized) {
            clearInterval(state.easingLoop);
            return;
          }
          if (!state.speed.x && !state.speed.y) {
            clearInterval(state.easingLoop);
            return;
          }
          if (Math.abs(state.speed.x) < 0.01 && Math.abs(state.speed.y) < 0.01) {
            clearInterval(state.easingLoop);
            return;
          }
          applyTouchMove(state.speed.x * 30, state.speed.y * 30);
          state.speed.x *= 0.8;
          state.speed.y *= 0.8;
        }, 10);
      }
    }
    if (env.supportsTouch) {
      i2.event.bind(element, "touchstart", touchStart);
      i2.event.bind(element, "touchmove", touchMove);
      i2.event.bind(element, "touchend", touchEnd);
    } else if (env.supportsIePointer) {
      if (window.PointerEvent) {
        i2.event.bind(element, "pointerdown", touchStart);
        i2.event.bind(element, "pointermove", touchMove);
        i2.event.bind(element, "pointerup", touchEnd);
      } else if (window.MSPointerEvent) {
        i2.event.bind(element, "MSPointerDown", touchStart);
        i2.event.bind(element, "MSPointerMove", touchMove);
        i2.event.bind(element, "MSPointerUp", touchEnd);
      }
    }
  }
  var defaultSettings = function() {
    return {
      handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
      maxScrollbarLength: null,
      minScrollbarLength: null,
      scrollingThreshold: 1e3,
      scrollXMarginOffset: 0,
      scrollYMarginOffset: 0,
      suppressScrollX: false,
      suppressScrollY: false,
      swipeEasing: true,
      useBothWheelAxes: false,
      wheelPropagation: true,
      wheelSpeed: 1
    };
  };
  var handlers = {
    "click-rail": clickRail,
    "drag-thumb": setupScrollHandlers,
    keyboard,
    wheel,
    touch
  };
  var PerfectScrollbar = function PerfectScrollbar2(element, userSettings) {
    var this$1$1 = this;
    if (userSettings === void 0) userSettings = {};
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    if (!element || !element.nodeName) {
      throw new Error("no element is specified to initialize PerfectScrollbar");
    }
    this.element = element;
    element.classList.add(cls.main);
    this.settings = defaultSettings();
    for (var key2 in userSettings) {
      this.settings[key2] = userSettings[key2];
    }
    this.containerWidth = null;
    this.containerHeight = null;
    this.contentWidth = null;
    this.contentHeight = null;
    var focus = function() {
      return element.classList.add(cls.state.focus);
    };
    var blur = function() {
      return element.classList.remove(cls.state.focus);
    };
    this.isRtl = get(element).direction === "rtl";
    if (this.isRtl === true) {
      element.classList.add(cls.rtl);
    }
    this.isNegativeScroll = function() {
      var originalScrollLeft = element.scrollLeft;
      var result2 = null;
      element.scrollLeft = -1;
      result2 = element.scrollLeft < 0;
      element.scrollLeft = originalScrollLeft;
      return result2;
    }();
    this.negativeScrollAdjustment = this.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
    this.event = new EventManager();
    this.ownerDocument = element.ownerDocument || document;
    this.scrollbarXRail = div(cls.element.rail("x"));
    element.appendChild(this.scrollbarXRail);
    this.scrollbarX = div(cls.element.thumb("x"));
    this.scrollbarXRail.appendChild(this.scrollbarX);
    this.scrollbarX.setAttribute("tabindex", 0);
    this.event.bind(this.scrollbarX, "focus", focus);
    this.event.bind(this.scrollbarX, "blur", blur);
    this.scrollbarXActive = null;
    this.scrollbarXWidth = null;
    this.scrollbarXLeft = null;
    var railXStyle = get(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    if (isNaN(this.scrollbarXBottom)) {
      this.isScrollbarXUsingBottom = false;
      this.scrollbarXTop = toInt(railXStyle.top);
    } else {
      this.isScrollbarXUsingBottom = true;
    }
    this.railBorderXWidth = toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
    set(this.scrollbarXRail, { display: "block" });
    this.railXMarginWidth = toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
    set(this.scrollbarXRail, { display: "" });
    this.railXWidth = null;
    this.railXRatio = null;
    this.scrollbarYRail = div(cls.element.rail("y"));
    element.appendChild(this.scrollbarYRail);
    this.scrollbarY = div(cls.element.thumb("y"));
    this.scrollbarYRail.appendChild(this.scrollbarY);
    this.scrollbarY.setAttribute("tabindex", 0);
    this.event.bind(this.scrollbarY, "focus", focus);
    this.event.bind(this.scrollbarY, "blur", blur);
    this.scrollbarYActive = null;
    this.scrollbarYHeight = null;
    this.scrollbarYTop = null;
    var railYStyle = get(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(railYStyle.right, 10);
    if (isNaN(this.scrollbarYRight)) {
      this.isScrollbarYUsingRight = false;
      this.scrollbarYLeft = toInt(railYStyle.left);
    } else {
      this.isScrollbarYUsingRight = true;
    }
    this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth = toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
    set(this.scrollbarYRail, { display: "block" });
    this.railYMarginHeight = toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
    set(this.scrollbarYRail, { display: "" });
    this.railYHeight = null;
    this.railYRatio = null;
    this.reach = {
      x: element.scrollLeft <= 0 ? "start" : element.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
      y: element.scrollTop <= 0 ? "start" : element.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
    };
    this.isAlive = true;
    this.settings.handlers.forEach(function(handlerName) {
      return handlers[handlerName](this$1$1);
    });
    this.lastScrollTop = Math.floor(element.scrollTop);
    this.lastScrollLeft = element.scrollLeft;
    this.event.bind(this.element, "scroll", function(e2) {
      return this$1$1.onScroll(e2);
    });
    updateGeometry(this);
  };
  PerfectScrollbar.prototype.update = function update() {
    if (!this.isAlive) {
      return;
    }
    this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0;
    set(this.scrollbarXRail, { display: "block" });
    set(this.scrollbarYRail, { display: "block" });
    this.railXMarginWidth = toInt(get(this.scrollbarXRail).marginLeft) + toInt(get(this.scrollbarXRail).marginRight);
    this.railYMarginHeight = toInt(get(this.scrollbarYRail).marginTop) + toInt(get(this.scrollbarYRail).marginBottom);
    set(this.scrollbarXRail, { display: "none" });
    set(this.scrollbarYRail, { display: "none" });
    updateGeometry(this);
    processScrollDiff(this, "top", 0, false, true);
    processScrollDiff(this, "left", 0, false, true);
    set(this.scrollbarXRail, { display: "" });
    set(this.scrollbarYRail, { display: "" });
  };
  PerfectScrollbar.prototype.onScroll = function onScroll(e2) {
    if (!this.isAlive) {
      return;
    }
    updateGeometry(this);
    processScrollDiff(this, "top", this.element.scrollTop - this.lastScrollTop);
    processScrollDiff(this, "left", this.element.scrollLeft - this.lastScrollLeft);
    this.lastScrollTop = Math.floor(this.element.scrollTop);
    this.lastScrollLeft = this.element.scrollLeft;
  };
  PerfectScrollbar.prototype.destroy = function destroy() {
    if (!this.isAlive) {
      return;
    }
    this.event.unbindAll();
    remove(this.scrollbarX);
    remove(this.scrollbarY);
    remove(this.scrollbarXRail);
    remove(this.scrollbarYRail);
    this.removePsClasses();
    this.element = null;
    this.scrollbarX = null;
    this.scrollbarY = null;
    this.scrollbarXRail = null;
    this.scrollbarYRail = null;
    this.isAlive = false;
  };
  PerfectScrollbar.prototype.removePsClasses = function removePsClasses() {
    this.element.className = this.element.className.split(" ").filter(function(name) {
      return !name.match(/^ps([-_].+|)$/);
    }).join(" ");
  };
  function useScrollbar() {
    let ps;
    function resize() {
      if (ps) ps.update();
    }
    return {
      bind(el) {
        ps = new PerfectScrollbar(el);
        window.addEventListener("resize", resize);
      },
      unBind() {
        window.removeEventListener("resize", resize);
      }
    };
  }
  content;
  function _typeof(o2) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
      return typeof o3;
    } : function(o3) {
      return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
    }, _typeof(o2);
  }
  function toPrimitive(t2, r2) {
    if ("object" != _typeof(t2) || !t2) return t2;
    var e2 = t2[Symbol.toPrimitive];
    if (void 0 !== e2) {
      var i2 = e2.call(t2, r2);
      if ("object" != _typeof(i2)) return i2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r2 ? String : Number)(t2);
  }
  function toPropertyKey(t2) {
    var i2 = toPrimitive(t2, "string");
    return "symbol" == _typeof(i2) ? i2 : i2 + "";
  }
  function _defineProperty$d(e2, r2, t2) {
    return (r2 = toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, {
      value: t2,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e2[r2] = t2, e2;
  }
  function ownKeys(e2, r2) {
    var t2 = Object.keys(e2);
    if (Object.getOwnPropertySymbols) {
      var o2 = Object.getOwnPropertySymbols(e2);
      r2 && (o2 = o2.filter(function(r3) {
        return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
      })), t2.push.apply(t2, o2);
    }
    return t2;
  }
  function _objectSpread2(e2) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var t2 = null != arguments[r2] ? arguments[r2] : {};
      r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
        _defineProperty$d(e2, r3, t2[r3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
        Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
      });
    }
    return e2;
  }
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n2) {
      for (var e2 = 1; e2 < arguments.length; e2++) {
        var t2 = arguments[e2];
        for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
      }
      return n2;
    }, _extends.apply(null, arguments);
  }
  const isArray$1 = Array.isArray;
  const isString = (val) => typeof val === "string";
  const isObject$1 = (val) => val !== null && typeof val === "object";
  function renderHelper(v2) {
    let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let defaultV = arguments.length > 2 ? arguments[2] : void 0;
    if (typeof v2 === "function") {
      return v2(props);
    }
    return v2 !== null && v2 !== void 0 ? v2 : defaultV;
  }
  function wrapPromiseFn(openFn) {
    let closeFn;
    const closePromise = new Promise((resolve) => {
      closeFn = openFn(() => {
        resolve(true);
      });
    });
    const result2 = () => {
      closeFn === null || closeFn === void 0 ? void 0 : closeFn();
    };
    result2.then = (filled, rejected) => closePromise.then(filled, rejected);
    result2.promise = closePromise;
    return result2;
  }
  function classNames() {
    const classes = [];
    for (let i2 = 0; i2 < arguments.length; i2++) {
      const value = i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2];
      if (!value) continue;
      if (isString(value)) {
        classes.push(value);
      } else if (isArray$1(value)) {
        for (let i3 = 0; i3 < value.length; i3++) {
          const inner = classNames(value[i3]);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (isObject$1(value)) {
        for (const name in value) {
          if (value[name]) {
            classes.push(name);
          }
        }
      }
    }
    return classes.join(" ");
  }
  const isValid = (value) => {
    return value !== void 0 && value !== null && value !== "";
  };
  const initDefaultProps = (types, defaultProps) => {
    const propTypes = _extends({}, types);
    Object.keys(defaultProps).forEach((k2) => {
      const prop = propTypes[k2];
      if (prop) {
        if (prop.type || prop.default) {
          prop.default = defaultProps[k2];
        } else if (prop.def) {
          prop.def(defaultProps[k2]);
        } else {
          propTypes[k2] = {
            type: prop,
            default: defaultProps[k2]
          };
        }
      } else {
        throw new Error(`not have ${k2} prop`);
      }
    });
    return propTypes;
  };
  const skipFlattenKey = Symbol("skipFlatten");
  const flattenChildren = function() {
    let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let filterEmpty2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const temp = Array.isArray(children) ? children : [children];
    const res = [];
    temp.forEach((child) => {
      if (Array.isArray(child)) {
        res.push(...flattenChildren(child, filterEmpty2));
      } else if (child && child.type === Fragment) {
        if (child.key === skipFlattenKey) {
          res.push(child);
        } else {
          res.push(...flattenChildren(child.children, filterEmpty2));
        }
      } else if (child && isVNode(child)) {
        if (filterEmpty2 && !isEmptyElement(child)) {
          res.push(child);
        } else if (!filterEmpty2) {
          res.push(child);
        }
      } else if (isValid(child)) {
        res.push(child);
      }
    });
    return res;
  };
  const findDOMNode = (instance) => {
    var _a;
    let node2 = ((_a = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a === void 0 ? void 0 : _a.el) || instance && (instance.$el || instance);
    while (node2 && !node2.tagName) {
      node2 = node2.nextSibling;
    }
    return node2;
  };
  function isEmptyElement(c2) {
    return c2 && (c2.type === Comment || c2.type === Fragment && c2.children.length === 0 || c2.type === Text && c2.children.trim() === "");
  }
  function filterEmpty() {
    let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const res = [];
    children.forEach((child) => {
      if (Array.isArray(child)) {
        res.push(...child);
      } else if ((child === null || child === void 0 ? void 0 : child.type) === Fragment) {
        res.push(...filterEmpty(child.children));
      } else {
        res.push(child);
      }
    });
    return res.filter((c2) => !isEmptyElement(c2));
  }
  function getPropsSlot(slots, props) {
    let prop = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "default";
    var _a, _b;
    return (_a = props[prop]) !== null && _a !== void 0 ? _a : (_b = slots[prop]) === null || _b === void 0 ? void 0 : _b.call(slots);
  }
  let raf = (callback) => setTimeout(callback, 16);
  let caf = (num) => clearTimeout(num);
  if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
    raf = (callback) => window.requestAnimationFrame(callback);
    caf = (handle) => window.cancelAnimationFrame(handle);
  }
  let rafUUID = 0;
  const rafIds = /* @__PURE__ */ new Map();
  function cleanup(id) {
    rafIds.delete(id);
  }
  function wrapperRaf(callback) {
    let times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    rafUUID += 1;
    const id = rafUUID;
    function callRef(leftTimes) {
      if (leftTimes === 0) {
        cleanup(id);
        callback();
      } else {
        const realId = raf(() => {
          callRef(leftTimes - 1);
        });
        rafIds.set(id, realId);
      }
    }
    callRef(times);
    return id;
  }
  wrapperRaf.cancel = (id) => {
    const realId = rafIds.get(id);
    cleanup(realId);
    return caf(realId);
  };
  const tuple = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args;
  };
  const withInstall = (comp) => {
    const c2 = comp;
    c2.install = function(app) {
      app.component(c2.displayName || c2.name, comp);
    };
    return comp;
  };
  function eventType() {
    return {
      type: [Function, Array]
    };
  }
  function objectType(defaultVal) {
    return {
      type: Object,
      default: defaultVal
    };
  }
  function booleanType(defaultVal) {
    return {
      type: Boolean,
      default: defaultVal
    };
  }
  function anyType(defaultVal, required) {
    const type = {
      validator: () => true,
      default: defaultVal
    };
    return required ? type : type;
  }
  function arrayType(defaultVal) {
    return {
      type: Array,
      default: defaultVal
    };
  }
  function stringType(defaultVal) {
    return {
      type: String,
      default: defaultVal
    };
  }
  function someType(types, defaultVal) {
    return types ? {
      type: types,
      default: defaultVal
    } : anyType(defaultVal);
  }
  function addEventListenerWrap(target, eventType2, cb, option) {
    if (target && target.addEventListener) {
      let opt = option;
      target.addEventListener(eventType2, cb, opt);
    }
    return {
      remove: () => {
        if (target && target.removeEventListener) {
          target.removeEventListener(eventType2, cb);
        }
      }
    };
  }
  const defaultIconPrefixCls = "anticon";
  const GlobalFormContextKey = Symbol("GlobalFormContextKey");
  const useProvideGlobalForm = (state) => {
    provide(GlobalFormContextKey, state);
  };
  const configProviderProps = () => ({
    iconPrefixCls: String,
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
    csp: objectType(),
    input: objectType(),
    autoInsertSpaceInButton: {
      type: Boolean,
      default: void 0
    },
    locale: objectType(),
    pageHeader: objectType(),
    componentSize: {
      type: String
    },
    componentDisabled: {
      type: Boolean,
      default: void 0
    },
    direction: {
      type: String,
      default: "ltr"
    },
    space: objectType(),
    virtual: {
      type: Boolean,
      default: void 0
    },
    dropdownMatchSelectWidth: {
      type: [Number, Boolean],
      default: true
    },
    form: objectType(),
    pagination: objectType(),
    theme: objectType(),
    select: objectType(),
    wave: objectType()
  });
  const configProviderKey = Symbol("configProvider");
  const defaultConfigProvider = {
    getPrefixCls: (suffixCls, customizePrefixCls) => {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? `ant-${suffixCls}` : "ant";
    },
    iconPrefixCls: computed(() => defaultIconPrefixCls),
    getPopupContainer: computed(() => () => document.body),
    direction: computed(() => "ltr")
  };
  const useConfigContextInject = () => {
    return inject(configProviderKey, defaultConfigProvider);
  };
  const useConfigContextProvider = (props) => {
    return provide(configProviderKey, props);
  };
  const DisabledContextKey = Symbol("DisabledContextKey");
  const useInjectDisabled = () => {
    return inject(DisabledContextKey, /* @__PURE__ */ ref(void 0));
  };
  const useProviderDisabled = (disabled) => {
    const parentDisabled = useInjectDisabled();
    provide(DisabledContextKey, computed(() => {
      var _a;
      return (_a = disabled.value) !== null && _a !== void 0 ? _a : parentDisabled.value;
    }));
    return disabled;
  };
  const enUS = {
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
  const locale$3 = {
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
    monthBeforeYear: true,
    previousMonth: "Previous month (PageUp)",
    nextMonth: "Next month (PageDown)",
    previousYear: "Last year (Control + left)",
    nextYear: "Next year (Control + right)",
    previousDecade: "Last decade",
    nextDecade: "Next decade",
    previousCentury: "Last century",
    nextCentury: "Next century"
  };
  const locale$2 = {
    placeholder: "Select time",
    rangePlaceholder: ["Start time", "End time"]
  };
  const locale$1 = {
    lang: _extends({
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
    }, locale$3),
    timePickerLocale: _extends({}, locale$2)
  };
  const typeTemplate = "${label} is not a valid ${type}";
  const localeValues = {
    locale: "en",
    Pagination: enUS,
    DatePicker: locale$1,
    TimePicker: locale$2,
    Calendar: locale$1,
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
    Tour: {
      Next: "Next",
      Previous: "Previous",
      Finish: "Finish"
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
      description: "No data"
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
          string: typeTemplate,
          method: typeTemplate,
          array: typeTemplate,
          object: typeTemplate,
          number: typeTemplate,
          date: typeTemplate,
          boolean: typeTemplate,
          integer: typeTemplate,
          float: typeTemplate,
          regexp: typeTemplate,
          email: typeTemplate,
          url: typeTemplate,
          hex: typeTemplate
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
    },
    QRCode: {
      expired: "QR code expired",
      refresh: "Refresh",
      scanned: "Scanned"
    }
  };
  const LocaleReceiver = /* @__PURE__ */ defineComponent({
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
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const localeData = inject("localeData", {});
      const locale2 = computed(() => {
        const {
          componentName = "global",
          defaultLocale
        } = props;
        const locale3 = defaultLocale || localeValues[componentName || "global"];
        const {
          antLocale
        } = localeData;
        const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
        return _extends(_extends({}, typeof locale3 === "function" ? locale3() : locale3), localeFromContext || {});
      });
      const localeCode = computed(() => {
        const {
          antLocale
        } = localeData;
        const localeCode2 = antLocale && antLocale.locale;
        if (antLocale && antLocale.exist && !localeCode2) {
          return localeValues.locale;
        }
        return localeCode2;
      });
      return () => {
        const children = props.children || slots.default;
        const {
          antLocale
        } = localeData;
        return children === null || children === void 0 ? void 0 : children(locale2.value, localeCode.value, antLocale);
      };
    }
  });
  function useLocaleReceiver(componentName, defaultLocale, propsLocale) {
    const localeData = inject("localeData", {});
    const componentLocale = computed(() => {
      const {
        antLocale
      } = localeData;
      const locale2 = unref(defaultLocale) || localeValues[componentName];
      const localeFromContext = antLocale ? antLocale[componentName] : {};
      return _extends(_extends(_extends({}, typeof locale2 === "function" ? locale2() : locale2), localeFromContext || {}), unref(propsLocale) || {});
    });
    return [componentLocale];
  }
  function murmur2(str) {
    var h2 = 0;
    var k2, i2 = 0, len = str.length;
    for (; len >= 4; ++i2, len -= 4) {
      k2 = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
      k2 = /* Math.imul(k, m): */
      (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
      k2 ^= /* k >>> r: */
      k2 >>> 24;
      h2 = /* Math.imul(k, m): */
      (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
      (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    }
    switch (len) {
      case 3:
        h2 ^= (str.charCodeAt(i2 + 2) & 255) << 16;
      case 2:
        h2 ^= (str.charCodeAt(i2 + 1) & 255) << 8;
      case 1:
        h2 ^= str.charCodeAt(i2) & 255;
        h2 = /* Math.imul(h, m): */
        (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    }
    h2 ^= h2 >>> 13;
    h2 = /* Math.imul(h, m): */
    (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
  }
  const SPLIT = "%";
  class Entity {
    constructor(instanceId) {
      this.cache = /* @__PURE__ */ new Map();
      this.instanceId = instanceId;
    }
    get(keys) {
      return this.cache.get(Array.isArray(keys) ? keys.join(SPLIT) : keys) || null;
    }
    update(keys, valueFn) {
      const path2 = Array.isArray(keys) ? keys.join(SPLIT) : keys;
      const prevValue = this.cache.get(path2);
      const nextValue = valueFn(prevValue);
      if (nextValue === null) {
        this.cache.delete(path2);
      } else {
        this.cache.set(path2, nextValue);
      }
    }
  }
  const ATTR_TOKEN = "data-token-hash";
  const ATTR_MARK = "data-css-hash";
  const ATTR_CACHE_PATH = "data-cache-path";
  const CSS_IN_JS_INSTANCE = "__cssinjs_instance__";
  function createCache() {
    const cssinjsInstanceId = Math.random().toString(12).slice(2);
    if (typeof document !== "undefined" && document.head && document.body) {
      const styles = document.body.querySelectorAll(`style[${ATTR_MARK}]`) || [];
      const {
        firstChild
      } = document.head;
      Array.from(styles).forEach((style) => {
        style[CSS_IN_JS_INSTANCE] = style[CSS_IN_JS_INSTANCE] || cssinjsInstanceId;
        if (style[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) {
          document.head.insertBefore(style, firstChild);
        }
      });
      const styleHash = {};
      Array.from(document.querySelectorAll(`style[${ATTR_MARK}]`)).forEach((style) => {
        var _a;
        const hash = style.getAttribute(ATTR_MARK);
        if (styleHash[hash]) {
          if (style[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) {
            (_a = style.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(style);
          }
        } else {
          styleHash[hash] = true;
        }
      });
    }
    return new Entity(cssinjsInstanceId);
  }
  const StyleContextKey = Symbol("StyleContextKey");
  const getCache = () => {
    var _a, _b, _c;
    const instance = getCurrentInstance();
    let cache;
    if (instance && instance.appContext) {
      const globalCache = (_c = (_b = (_a = instance.appContext) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.globalProperties) === null || _c === void 0 ? void 0 : _c.__ANTDV_CSSINJS_CACHE__;
      if (globalCache) {
        cache = globalCache;
      } else {
        cache = createCache();
        if (instance.appContext.config.globalProperties) {
          instance.appContext.config.globalProperties.__ANTDV_CSSINJS_CACHE__ = cache;
        }
      }
    } else {
      cache = createCache();
    }
    return cache;
  };
  const defaultStyleContext = {
    cache: createCache(),
    defaultCache: true,
    hashPriority: "low"
  };
  const useStyleInject = () => {
    const cache = getCache();
    return inject(StyleContextKey, /* @__PURE__ */ shallowRef(_extends(_extends({}, defaultStyleContext), {
      cache
    })));
  };
  const useStyleProvider = (props) => {
    const parentContext = useStyleInject();
    const context = /* @__PURE__ */ shallowRef(_extends(_extends({}, defaultStyleContext), {
      cache: createCache()
    }));
    watch([() => unref(props), parentContext], () => {
      const mergedContext = _extends({}, parentContext.value);
      const propsValue = unref(props);
      Object.keys(propsValue).forEach((key2) => {
        const value = propsValue[key2];
        if (propsValue[key2] !== void 0) {
          mergedContext[key2] = value;
        }
      });
      const {
        cache
      } = propsValue;
      mergedContext.cache = mergedContext.cache || createCache();
      mergedContext.defaultCache = !cache && parentContext.value.defaultCache;
      context.value = mergedContext;
    }, {
      immediate: true
    });
    provide(StyleContextKey, context);
    return context;
  };
  const styleProviderProps = () => ({
    autoClear: booleanType(),
    /** @private Test only. Not work in production. */
    mock: stringType(),
    /**
     * Only set when you need ssr to extract style on you own.
     * If not provided, it will auto create <style /> on the end of Provider in server side.
     */
    cache: objectType(),
    /** Tell children that this context is default generated context */
    defaultCache: booleanType(),
    /** Use `:where` selector to reduce hashId css selector priority */
    hashPriority: stringType(),
    /** Tell cssinjs where to inject style in */
    container: someType(),
    /** Component wil render inline  `<style />` for fallback in SSR. Not recommend. */
    ssrInline: booleanType(),
    /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */
    transformers: arrayType(),
    /**
     * Linters to lint css before inject in document.
     * Styles will be linted after transforming.
     * Please note that `linters` do not support dynamic update.
     */
    linters: arrayType()
  });
  withInstall(/* @__PURE__ */ defineComponent({
    name: "AStyleProvider",
    inheritAttrs: false,
    props: styleProviderProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useStyleProvider(props);
      return () => {
        var _a;
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      };
    }
  }));
  let webpackHMR = false;
  function useDevHMR() {
    return webpackHMR;
  }
  const useHMR = useDevHMR;
  if (typeof module !== "undefined" && module && module.hot && typeof window !== "undefined") {
    const win = window;
    if (typeof win.webpackHotUpdate === "function") {
      const originWebpackHotUpdate = win.webpackHotUpdate;
      win.webpackHotUpdate = function() {
        webpackHMR = true;
        setTimeout(() => {
          webpackHMR = false;
        }, 0);
        return originWebpackHotUpdate(...arguments);
      };
    }
  }
  function useClientCache(prefix, keyPath, cacheFn, onCacheRemove) {
    const styleContext = useStyleInject();
    const fullPathStr = /* @__PURE__ */ shallowRef("");
    const res = /* @__PURE__ */ shallowRef();
    watchEffect(() => {
      fullPathStr.value = [prefix, ...keyPath.value].join("%");
    });
    const HMRUpdate = useHMR();
    const clearCache = (pathStr) => {
      styleContext.value.cache.update(pathStr, (prevCache) => {
        const [times = 0, cache] = prevCache || [];
        const nextCount = times - 1;
        if (nextCount === 0) {
          onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(cache, false);
          return null;
        }
        return [times - 1, cache];
      });
    };
    watch(fullPathStr, (newStr, oldStr) => {
      if (oldStr) clearCache(oldStr);
      styleContext.value.cache.update(newStr, (prevCache) => {
        const [times = 0, cache] = prevCache || [];
        let tmpCache = cache;
        if (cache && HMRUpdate) {
          onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(tmpCache, HMRUpdate);
          tmpCache = null;
        }
        const mergedCache = tmpCache || cacheFn();
        return [times + 1, mergedCache];
      });
      res.value = styleContext.value.cache.get(fullPathStr.value)[1];
    }, {
      immediate: true
    });
    onBeforeUnmount(() => {
      clearCache(fullPathStr.value);
    });
    return res;
  }
  function canUseDom$1() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  }
  function contains$1(root2, n2) {
    if (!root2) {
      return false;
    }
    if (root2.contains) {
      return root2.contains(n2);
    }
    return false;
  }
  const APPEND_ORDER$1 = "data-vc-order";
  const MARK_KEY$1 = `vc-util-key`;
  const containerCache$1 = /* @__PURE__ */ new Map();
  function getMark$1() {
    let {
      mark
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (mark) {
      return mark.startsWith("data-") ? mark : `data-${mark}`;
    }
    return MARK_KEY$1;
  }
  function getContainer$2(option) {
    if (option.attachTo) {
      return option.attachTo;
    }
    const head = document.querySelector("head");
    return head || document.body;
  }
  function getOrder$1(prepend) {
    if (prepend === "queue") {
      return "prependQueue";
    }
    return prepend ? "prepend" : "append";
  }
  function findStyles$1(container) {
    return Array.from((containerCache$1.get(container) || container).children).filter((node2) => node2.tagName === "STYLE");
  }
  function injectCSS$1(css) {
    let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!canUseDom$1()) {
      return null;
    }
    const {
      csp,
      prepend
    } = option;
    const styleNode = document.createElement("style");
    styleNode.setAttribute(APPEND_ORDER$1, getOrder$1(prepend));
    if (csp === null || csp === void 0 ? void 0 : csp.nonce) {
      styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
    }
    styleNode.innerHTML = css;
    const container = getContainer$2(option);
    const {
      firstChild
    } = container;
    if (prepend) {
      if (prepend === "queue") {
        const existStyle = findStyles$1(container).filter((node2) => ["prepend", "prependQueue"].includes(node2.getAttribute(APPEND_ORDER$1)));
        if (existStyle.length) {
          container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
          return styleNode;
        }
      }
      container.insertBefore(styleNode, firstChild);
    } else {
      container.appendChild(styleNode);
    }
    return styleNode;
  }
  function findExistNode$1(key2) {
    let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const container = getContainer$2(option);
    return findStyles$1(container).find((node2) => node2.getAttribute(getMark$1(option)) === key2);
  }
  function removeCSS(key2) {
    let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const existNode = findExistNode$1(key2, option);
    if (existNode) {
      const container = getContainer$2(option);
      container.removeChild(existNode);
    }
  }
  function syncRealContainer$1(container, option) {
    const cachedRealContainer = containerCache$1.get(container);
    if (!cachedRealContainer || !contains$1(document, cachedRealContainer)) {
      const placeholderStyle = injectCSS$1("", option);
      const {
        parentNode
      } = placeholderStyle;
      containerCache$1.set(container, parentNode);
      container.removeChild(placeholderStyle);
    }
  }
  function updateCSS$1(css, key2) {
    let option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var _a, _b, _c;
    const container = getContainer$2(option);
    syncRealContainer$1(container, option);
    const existNode = findExistNode$1(key2, option);
    if (existNode) {
      if (((_a = option.csp) === null || _a === void 0 ? void 0 : _a.nonce) && existNode.nonce !== ((_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce)) {
        existNode.nonce = (_c = option.csp) === null || _c === void 0 ? void 0 : _c.nonce;
      }
      if (existNode.innerHTML !== css) {
        existNode.innerHTML = css;
      }
      return existNode;
    }
    const newNode = injectCSS$1(css, option);
    newNode.setAttribute(getMark$1(option), key2);
    return newNode;
  }
  function sameDerivativeOption(left, right) {
    if (left.length !== right.length) {
      return false;
    }
    for (let i2 = 0; i2 < left.length; i2++) {
      if (left[i2] !== right[i2]) {
        return false;
      }
    }
    return true;
  }
  class ThemeCache {
    constructor() {
      this.cache = /* @__PURE__ */ new Map();
      this.keys = [];
      this.cacheCallTimes = 0;
    }
    size() {
      return this.keys.length;
    }
    internalGet(derivativeOption) {
      let updateCallTimes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      let cache = {
        map: this.cache
      };
      derivativeOption.forEach((derivative2) => {
        var _a;
        if (!cache) {
          cache = void 0;
        } else {
          cache = (_a = cache === null || cache === void 0 ? void 0 : cache.map) === null || _a === void 0 ? void 0 : _a.get(derivative2);
        }
      });
      if ((cache === null || cache === void 0 ? void 0 : cache.value) && updateCallTimes) {
        cache.value[1] = this.cacheCallTimes++;
      }
      return cache === null || cache === void 0 ? void 0 : cache.value;
    }
    get(derivativeOption) {
      var _a;
      return (_a = this.internalGet(derivativeOption, true)) === null || _a === void 0 ? void 0 : _a[0];
    }
    has(derivativeOption) {
      return !!this.internalGet(derivativeOption);
    }
    set(derivativeOption, value) {
      if (!this.has(derivativeOption)) {
        if (this.size() + 1 > ThemeCache.MAX_CACHE_SIZE + ThemeCache.MAX_CACHE_OFFSET) {
          const [targetKey] = this.keys.reduce((result2, key2) => {
            const [, callTimes] = result2;
            if (this.internalGet(key2)[1] < callTimes) {
              return [key2, this.internalGet(key2)[1]];
            }
            return result2;
          }, [this.keys[0], this.cacheCallTimes]);
          this.delete(targetKey);
        }
        this.keys.push(derivativeOption);
      }
      let cache = this.cache;
      derivativeOption.forEach((derivative2, index) => {
        if (index === derivativeOption.length - 1) {
          cache.set(derivative2, {
            value: [value, this.cacheCallTimes++]
          });
        } else {
          const cacheValue = cache.get(derivative2);
          if (!cacheValue) {
            cache.set(derivative2, {
              map: /* @__PURE__ */ new Map()
            });
          } else if (!cacheValue.map) {
            cacheValue.map = /* @__PURE__ */ new Map();
          }
          cache = cache.get(derivative2).map;
        }
      });
    }
    deleteByPath(currentCache, derivatives) {
      var _a;
      const cache = currentCache.get(derivatives[0]);
      if (derivatives.length === 1) {
        if (!cache.map) {
          currentCache.delete(derivatives[0]);
        } else {
          currentCache.set(derivatives[0], {
            map: cache.map
          });
        }
        return (_a = cache.value) === null || _a === void 0 ? void 0 : _a[0];
      }
      const result2 = this.deleteByPath(cache.map, derivatives.slice(1));
      if ((!cache.map || cache.map.size === 0) && !cache.value) {
        currentCache.delete(derivatives[0]);
      }
      return result2;
    }
    delete(derivativeOption) {
      if (this.has(derivativeOption)) {
        this.keys = this.keys.filter((item) => !sameDerivativeOption(item, derivativeOption));
        return this.deleteByPath(this.cache, derivativeOption);
      }
      return void 0;
    }
  }
  ThemeCache.MAX_CACHE_SIZE = 20;
  ThemeCache.MAX_CACHE_OFFSET = 5;
  let warned = {};
  function warning$2(valid, message) {
    if (!valid && console !== void 0) {
      console.error(`Warning: ${message}`);
    }
  }
  function call(method, valid, message) {
    if (!valid && !warned[message]) {
      method(false, message);
      warned[message] = true;
    }
  }
  function warningOnce(valid, message) {
    call(warning$2, valid, message);
  }
  function noop$1() {
  }
  let warning$1 = noop$1;
  {
    warning$1 = (valid, component, message) => {
      warningOnce(valid, `[ant-design-vue: ${component}] ${message}`);
    };
  }
  let uuid$3 = 0;
  class Theme {
    constructor(derivatives) {
      this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
      this.id = uuid$3;
      if (derivatives.length === 0) {
        warning$1(derivatives.length > 0, "[Ant Design Vue CSS-in-JS] Theme should have at least one derivative function.");
      }
      uuid$3 += 1;
    }
    getDerivativeToken(token2) {
      return this.derivatives.reduce((result2, derivative2) => derivative2(token2, result2), void 0);
    }
  }
  const cacheThemes = new ThemeCache();
  function createTheme(derivatives) {
    const derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
    if (!cacheThemes.has(derivativeArr)) {
      cacheThemes.set(derivativeArr, new Theme(derivativeArr));
    }
    return cacheThemes.get(derivativeArr);
  }
  const flattenTokenCache = /* @__PURE__ */ new WeakMap();
  function flattenToken(token2) {
    let str = flattenTokenCache.get(token2) || "";
    if (!str) {
      Object.keys(token2).forEach((key2) => {
        const value = token2[key2];
        str += key2;
        if (value instanceof Theme) {
          str += value.id;
        } else if (value && typeof value === "object") {
          str += flattenToken(value);
        } else {
          str += value;
        }
      });
      flattenTokenCache.set(token2, str);
    }
    return str;
  }
  function token2key(token2, salt) {
    return murmur2(`${salt}_${flattenToken(token2)}`);
  }
  const randomSelectorKey = `random-${Date.now()}-${Math.random()}`.replace(/\./g, "");
  const checkContent = "_bAmBoO_";
  function supportSelector(styleStr, handleElement, supportCheck) {
    var _a, _b;
    if (canUseDom$1()) {
      updateCSS$1(styleStr, randomSelectorKey);
      const ele = document.createElement("div");
      ele.style.position = "fixed";
      ele.style.left = "0";
      ele.style.top = "0";
      handleElement === null || handleElement === void 0 ? void 0 : handleElement(ele);
      document.body.appendChild(ele);
      {
        ele.innerHTML = "Test";
        ele.style.zIndex = "9999999";
      }
      const support = supportCheck ? supportCheck(ele) : (_a = getComputedStyle(ele).content) === null || _a === void 0 ? void 0 : _a.includes(checkContent);
      (_b = ele.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(ele);
      removeCSS(randomSelectorKey);
      return support;
    }
    return false;
  }
  let canLayer = void 0;
  function supportLayer() {
    if (canLayer === void 0) {
      canLayer = supportSelector(`@layer ${randomSelectorKey} { .${randomSelectorKey} { content: "${checkContent}"!important; } }`, (ele) => {
        ele.className = randomSelectorKey;
      });
    }
    return canLayer;
  }
  const EMPTY_OVERRIDE = {};
  const hashPrefix = "css-dev-only-do-not-override";
  const tokenKeys = /* @__PURE__ */ new Map();
  function recordCleanToken(tokenKey) {
    tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
  }
  function removeStyleTags(key2, instanceId) {
    if (typeof document !== "undefined") {
      const styles = document.querySelectorAll(`style[${ATTR_TOKEN}="${key2}"]`);
      styles.forEach((style) => {
        var _a;
        if (style[CSS_IN_JS_INSTANCE] === instanceId) {
          (_a = style.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(style);
        }
      });
    }
  }
  const TOKEN_THRESHOLD = 0;
  function cleanTokenStyle(tokenKey, instanceId) {
    tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
    const tokenKeyList = Array.from(tokenKeys.keys());
    const cleanableKeyList = tokenKeyList.filter((key2) => {
      const count = tokenKeys.get(key2) || 0;
      return count <= 0;
    });
    if (tokenKeyList.length - cleanableKeyList.length > TOKEN_THRESHOLD) {
      cleanableKeyList.forEach((key2) => {
        removeStyleTags(key2, instanceId);
        tokenKeys.delete(key2);
      });
    }
  }
  const getComputedToken = (originToken, overrideToken, theme, format) => {
    const derivativeToken = theme.getDerivativeToken(originToken);
    let mergedDerivativeToken = _extends(_extends({}, derivativeToken), overrideToken);
    if (format) {
      mergedDerivativeToken = format(mergedDerivativeToken);
    }
    return mergedDerivativeToken;
  };
  function useCacheToken(theme, tokens) {
    let option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ ref({});
    const style = useStyleInject();
    const mergedToken = computed(() => _extends({}, ...tokens.value));
    const tokenStr = computed(() => flattenToken(mergedToken.value));
    const overrideTokenStr = computed(() => flattenToken(option.value.override || EMPTY_OVERRIDE));
    const cachedToken = useClientCache("token", computed(() => [option.value.salt || "", theme.value.id, tokenStr.value, overrideTokenStr.value]), () => {
      const {
        salt = "",
        override = EMPTY_OVERRIDE,
        formatToken: formatToken2,
        getComputedToken: compute
      } = option.value;
      const mergedDerivativeToken = compute ? compute(mergedToken.value, override, theme.value) : getComputedToken(mergedToken.value, override, theme.value, formatToken2);
      const tokenKey = token2key(mergedDerivativeToken, salt);
      mergedDerivativeToken._tokenKey = tokenKey;
      recordCleanToken(tokenKey);
      const hashId = `${hashPrefix}-${murmur2(tokenKey)}`;
      mergedDerivativeToken._hashId = hashId;
      return [mergedDerivativeToken, hashId];
    }, (cache) => {
      var _a;
      cleanTokenStyle(cache[0]._tokenKey, (_a = style.value) === null || _a === void 0 ? void 0 : _a.cache.instanceId);
    });
    return cachedToken;
  }
  var unitlessKeys = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };
  var COMMENT = "comm";
  var RULESET = "rule";
  var DECLARATION = "decl";
  var IMPORT = "@import";
  var NAMESPACE = "@namespace";
  var KEYFRAMES = "@keyframes";
  var LAYER = "@layer";
  var abs = Math.abs;
  var from = String.fromCharCode;
  function trim(value) {
    return value.trim();
  }
  function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
  }
  function indexof(value, search, position2) {
    return value.indexOf(search, position2);
  }
  function charat(value, index) {
    return value.charCodeAt(index) | 0;
  }
  function substr(value, begin, end) {
    return value.slice(begin, end);
  }
  function strlen(value) {
    return value.length;
  }
  function sizeof(value) {
    return value.length;
  }
  function append(value, array) {
    return array.push(value), value;
  }
  var line = 1;
  var column = 1;
  var length = 0;
  var position = 0;
  var character = 0;
  var characters = "";
  function node(value, root2, parent, type, props, children, length2, siblings) {
    return { value, root: root2, parent, type, props, children, line, column, length: length2, return: "", siblings };
  }
  function char() {
    return character;
  }
  function prev() {
    character = position > 0 ? charat(characters, --position) : 0;
    if (column--, character === 10)
      column = 1, line--;
    return character;
  }
  function next() {
    character = position < length ? charat(characters, position++) : 0;
    if (column++, character === 10)
      column = 1, line++;
    return character;
  }
  function peek() {
    return charat(characters, position);
  }
  function caret() {
    return position;
  }
  function slice(begin, end) {
    return substr(characters, begin, end);
  }
  function token(type) {
    switch (type) {
      // \0 \t \n \r \s whitespace token
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      // ! + , / > @ ~ isolate token
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      // ; { } breakpoint token
      case 59:
      case 123:
      case 125:
        return 4;
      // : accompanied token
      case 58:
        return 3;
      // " ' ( [ opening delimit token
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      // ) ] closing delimit token
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function alloc(value) {
    return line = column = 1, length = strlen(characters = value), position = 0, [];
  }
  function dealloc(value) {
    return characters = "", value;
  }
  function delimit(type) {
    return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
  }
  function whitespace(type) {
    while (character = peek())
      if (character < 33)
        next();
      else
        break;
    return token(type) > 2 || token(character) > 3 ? "" : " ";
  }
  function escaping(index, count) {
    while (--count && next())
      if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
        break;
    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
  }
  function delimiter(type) {
    while (next())
      switch (character) {
        // ] ) " '
        case type:
          return position;
        // " '
        case 34:
        case 39:
          if (type !== 34 && type !== 39)
            delimiter(character);
          break;
        // (
        case 40:
          if (type === 41)
            delimiter(type);
          break;
        // \
        case 92:
          next();
          break;
      }
    return position;
  }
  function commenter(type, index) {
    while (next())
      if (type + character === 47 + 10)
        break;
      else if (type + character === 42 + 42 && peek() === 47)
        break;
    return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
  }
  function identifier(index) {
    while (!token(peek()))
      next();
    return slice(index, position);
  }
  function compile(value) {
    return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
  }
  function parse(value, root2, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0;
    var offset2 = 0;
    var length2 = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character2 = 0;
    var type = "";
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters2 = type;
    while (scanning)
      switch (previous = character2, character2 = next()) {
        // (
        case 40:
          if (previous != 108 && charat(characters2, length2 - 1) == 58) {
            if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1)
              ampersand = -1;
            break;
          }
        // " ' [
        case 34:
        case 39:
        case 91:
          characters2 += delimit(character2);
          break;
        // \t \n \r \s
        case 9:
        case 10:
        case 13:
        case 32:
          characters2 += whitespace(previous);
          break;
        // \
        case 92:
          characters2 += escaping(caret() - 1, 7);
          continue;
        // /
        case 47:
          switch (peek()) {
            case 42:
            case 47:
              append(comment(commenter(next(), caret()), root2, parent, declarations), declarations);
              if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters2) && substr(characters2, -1, void 0) !== " ") characters2 += " ";
              break;
            default:
              characters2 += "/";
          }
          break;
        // {
        case 123 * variable:
          points[index++] = strlen(characters2) * ampersand;
        // } ; \0
        case 125 * variable:
        case 59:
        case 0:
          switch (character2) {
            // \0 }
            case 0:
            case 125:
              scanning = 0;
            // ;
            case 59 + offset2:
              if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
              if (property > 0 && (strlen(characters2) - length2 || variable === 0 && previous === 47))
                append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
              break;
            // @ ;
            case 59:
              characters2 += ";";
            // { rule/at-rule
            default:
              append(reference = ruleset(characters2, root2, parent, index, offset2, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
              if (character2 === 123)
                if (offset2 === 0)
                  parse(characters2, root2, reference, reference, props, rulesets, length2, points, children);
                else {
                  switch (atrule) {
                    // c(ontainer)
                    case 99:
                      if (charat(characters2, 3) === 110) break;
                    // l(ayer)
                    case 108:
                      if (charat(characters2, 2) === 97) break;
                    default:
                      offset2 = 0;
                    // d(ocument) m(edia) s(upports)
                    case 100:
                    case 109:
                    case 115:
                  }
                  if (offset2) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                  else parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
          }
          index = offset2 = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
          break;
        // :
        case 58:
          length2 = 1 + strlen(characters2), property = previous;
        default:
          if (variable < 1) {
            if (character2 == 123)
              --variable;
            else if (character2 == 125 && variable++ == 0 && prev() == 125)
              continue;
          }
          switch (characters2 += from(character2), character2 * variable) {
            // &
            case 38:
              ampersand = offset2 > 0 ? 1 : (characters2 += "\f", -1);
              break;
            // ,
            case 44:
              points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
              break;
            // @
            case 64:
              if (peek() === 45)
                characters2 += delimit(next());
              atrule = peek(), offset2 = length2 = strlen(type = characters2 += identifier(caret())), character2++;
              break;
            // -
            case 45:
              if (previous === 45 && strlen(characters2) == 2)
                variable = 0;
          }
      }
    return rulesets;
  }
  function ruleset(value, root2, parent, index, offset2, rules, points, type, props, children, length2, siblings) {
    var post = offset2 - 1;
    var rule = offset2 === 0 ? rules : [""];
    var size = sizeof(rule);
    for (var i2 = 0, j2 = 0, k2 = 0; i2 < index; ++i2)
      for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i2])), z2 = value; x2 < size; ++x2)
        if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
          props[k2++] = z2;
    return node(value, root2, parent, offset2 === 0 ? RULESET : type, props, children, length2, siblings);
  }
  function comment(value, root2, parent, siblings) {
    return node(value, root2, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
  }
  function declaration(value, root2, parent, length2, siblings) {
    return node(value, root2, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
  }
  function serialize(children, callback) {
    var output = "";
    for (var i2 = 0; i2 < children.length; i2++)
      output += callback(children[i2], i2, children, callback) || "";
    return output;
  }
  function stringify(element, index, children, callback) {
    switch (element.type) {
      case LAYER:
        if (element.children.length) break;
      case IMPORT:
      case NAMESPACE:
      case DECLARATION:
        return element.return = element.return || element.value;
      case COMMENT:
        return "";
      case KEYFRAMES:
        return element.return = element.value + "{" + serialize(element.children, callback) + "}";
      case RULESET:
        if (!strlen(element.value = element.props.join(","))) return "";
    }
    return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
  }
  function lintWarning(message, info) {
    const {
      path: path2,
      parentSelectors
    } = info;
    warningOnce(false, `[Ant Design Vue CSS-in-JS] ${path2 ? `Error in '${path2}': ` : ""}${message}${parentSelectors.length ? ` Selector info: ${parentSelectors.join(" -> ")}` : ""}`);
  }
  const linter$1 = (key2, value, info) => {
    if (key2 === "content") {
      const contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
      const contentValues = ["normal", "none", "initial", "inherit", "unset"];
      if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        lintWarning(`You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${value}"'\`.`, info);
      }
    }
  };
  const linter = (key2, value, info) => {
    if (key2 === "animation") {
      if (info.hashId && value !== "none") {
        lintWarning(`You seem to be using hashed animation '${value}', in which case 'animationName' with Keyframe as value is recommended.`, info);
      }
    }
  };
  const ATTR_CACHE_MAP = "data-ant-cssinjs-cache-path";
  const CSS_FILE_STYLE = "_FILE_STYLE__";
  let cachePathMap;
  let fromCSSFile = true;
  function prepare() {
    var _a;
    if (!cachePathMap) {
      cachePathMap = {};
      if (canUseDom$1()) {
        const div2 = document.createElement("div");
        div2.className = ATTR_CACHE_MAP;
        div2.style.position = "fixed";
        div2.style.visibility = "hidden";
        div2.style.top = "-9999px";
        document.body.appendChild(div2);
        let content2 = getComputedStyle(div2).content || "";
        content2 = content2.replace(/^"/, "").replace(/"$/, "");
        content2.split(";").forEach((item) => {
          const [path2, hash] = item.split(":");
          cachePathMap[path2] = hash;
        });
        const inlineMapStyle = document.querySelector(`style[${ATTR_CACHE_MAP}]`);
        if (inlineMapStyle) {
          fromCSSFile = false;
          (_a = inlineMapStyle.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(inlineMapStyle);
        }
        document.body.removeChild(div2);
      }
    }
  }
  function existPath(path2) {
    prepare();
    return !!cachePathMap[path2];
  }
  function getStyleAndHash(path2) {
    const hash = cachePathMap[path2];
    let styleStr = null;
    if (hash && canUseDom$1()) {
      if (fromCSSFile) {
        styleStr = CSS_FILE_STYLE;
      } else {
        const style = document.querySelector(`style[${ATTR_MARK}="${cachePathMap[path2]}"]`);
        if (style) {
          styleStr = style.innerHTML;
        } else {
          delete cachePathMap[path2];
        }
      }
    }
    return [styleStr, hash];
  }
  const isClientSide = canUseDom$1();
  const SKIP_CHECK = "_skip_check_";
  const MULTI_VALUE = "_multi_value_";
  function normalizeStyle(styleStr) {
    const serialized = serialize(compile(styleStr), stringify);
    return serialized.replace(/\{%%%\:[^;];}/g, ";");
  }
  function isCompoundCSSProperty(value) {
    return typeof value === "object" && value && (SKIP_CHECK in value || MULTI_VALUE in value);
  }
  function injectSelectorHash(key2, hashId, hashPriority) {
    if (!hashId) {
      return key2;
    }
    const hashClassName = `.${hashId}`;
    const hashSelector = hashPriority === "low" ? `:where(${hashClassName})` : hashClassName;
    const keys = key2.split(",").map((k2) => {
      var _a;
      const fullPath = k2.trim().split(/\s+/);
      let firstPath = fullPath[0] || "";
      const htmlElement = ((_a = firstPath.match(/^\w+/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
      firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;
      return [firstPath, ...fullPath.slice(1)].join(" ");
    });
    return keys.join(",");
  }
  const globalEffectStyleKeys = /* @__PURE__ */ new Set();
  const parseStyle = function(interpolation) {
    let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let {
      root: root2,
      injectHash,
      parentSelectors
    } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      root: true,
      parentSelectors: []
    };
    const {
      hashId,
      layer,
      path: path2,
      hashPriority,
      transformers = [],
      linters = []
    } = config;
    let styleStr = "";
    let effectStyle = {};
    function parseKeyframes(keyframes) {
      const animationName = keyframes.getName(hashId);
      if (!effectStyle[animationName]) {
        const [parsedStr] = parseStyle(keyframes.style, config, {
          root: false,
          parentSelectors
        });
        effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
      }
    }
    function flattenList(list) {
      let fullList = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      list.forEach((item) => {
        if (Array.isArray(item)) {
          flattenList(item, fullList);
        } else if (item) {
          fullList.push(item);
        }
      });
      return fullList;
    }
    const flattenStyleList = flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]);
    flattenStyleList.forEach((originStyle) => {
      const style = typeof originStyle === "string" && !root2 ? {} : originStyle;
      if (typeof style === "string") {
        styleStr += `${style}
`;
      } else if (style._keyframe) {
        parseKeyframes(style);
      } else {
        const mergedStyle = transformers.reduce((prev2, trans) => {
          var _a;
          return ((_a = trans === null || trans === void 0 ? void 0 : trans.visit) === null || _a === void 0 ? void 0 : _a.call(trans, prev2)) || prev2;
        }, style);
        Object.keys(mergedStyle).forEach((key2) => {
          var _a;
          const value = mergedStyle[key2];
          if (typeof value === "object" && value && (key2 !== "animationName" || !value._keyframe) && !isCompoundCSSProperty(value)) {
            let subInjectHash = false;
            let mergedKey = key2.trim();
            let nextRoot = false;
            if ((root2 || injectHash) && hashId) {
              if (mergedKey.startsWith("@")) {
                subInjectHash = true;
              } else {
                mergedKey = injectSelectorHash(key2, hashId, hashPriority);
              }
            } else if (root2 && !hashId && (mergedKey === "&" || mergedKey === "")) {
              mergedKey = "";
              nextRoot = true;
            }
            const [parsedStr, childEffectStyle] = parseStyle(value, config, {
              root: nextRoot,
              injectHash: subInjectHash,
              parentSelectors: [...parentSelectors, mergedKey]
            });
            effectStyle = _extends(_extends({}, effectStyle), childEffectStyle);
            styleStr += `${mergedKey}${parsedStr}`;
          } else {
            let appendStyle = function(cssKey, cssValue) {
              if (typeof value !== "object" || !(value === null || value === void 0 ? void 0 : value[SKIP_CHECK])) {
                [linter$1, linter, ...linters].forEach((linter2) => linter2(cssKey, cssValue, {
                  path: path2,
                  hashId,
                  parentSelectors
                }));
              }
              const styleName = cssKey.replace(/[A-Z]/g, (match2) => `-${match2.toLowerCase()}`);
              let formatValue = cssValue;
              if (!unitlessKeys[cssKey] && typeof formatValue === "number" && formatValue !== 0) {
                formatValue = `${formatValue}px`;
              }
              if (cssKey === "animationName" && (cssValue === null || cssValue === void 0 ? void 0 : cssValue._keyframe)) {
                parseKeyframes(cssValue);
                formatValue = cssValue.getName(hashId);
              }
              styleStr += `${styleName}:${formatValue};`;
            };
            const actualValue = (_a = value === null || value === void 0 ? void 0 : value.value) !== null && _a !== void 0 ? _a : value;
            if (typeof value === "object" && (value === null || value === void 0 ? void 0 : value[MULTI_VALUE]) && Array.isArray(actualValue)) {
              actualValue.forEach((item) => {
                appendStyle(key2, item);
              });
            } else {
              appendStyle(key2, actualValue);
            }
          }
        });
      }
    });
    if (!root2) {
      styleStr = `{${styleStr}}`;
    } else if (layer && supportLayer()) {
      const layerCells = layer.split(",");
      const layerName = layerCells[layerCells.length - 1].trim();
      styleStr = `@layer ${layerName} {${styleStr}}`;
      if (layerCells.length > 1) {
        styleStr = `@layer ${layer}{%%%:%}${styleStr}`;
      }
    }
    return [styleStr, effectStyle];
  };
  function uniqueHash(path2, styleStr) {
    return murmur2(`${path2.join("%")}${styleStr}`);
  }
  function useStyleRegister(info, styleFn) {
    const styleContext = useStyleInject();
    const tokenKey = computed(() => info.value.token._tokenKey);
    const fullPath = computed(() => [tokenKey.value, ...info.value.path]);
    let isMergedClientSide = isClientSide;
    if (styleContext.value.mock !== void 0) {
      isMergedClientSide = styleContext.value.mock === "client";
    }
    useClientCache(
      "style",
      fullPath,
      // Create cache if needed
      () => {
        const {
          path: path2,
          hashId,
          layer,
          nonce,
          clientOnly,
          order = 0
        } = info.value;
        const cachePath = fullPath.value.join("|");
        if (existPath(cachePath)) {
          const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
          if (inlineCacheStyleStr) {
            return [inlineCacheStyleStr, tokenKey.value, styleHash, {}, clientOnly, order];
          }
        }
        const styleObj = styleFn();
        const {
          hashPriority,
          container,
          transformers,
          linters,
          cache
        } = styleContext.value;
        const [parsedStyle, effectStyle] = parseStyle(styleObj, {
          hashId,
          hashPriority,
          layer,
          path: path2.join("-"),
          transformers,
          linters
        });
        const styleStr = normalizeStyle(parsedStyle);
        const styleId = uniqueHash(fullPath.value, styleStr);
        if (isMergedClientSide) {
          const mergedCSSConfig = {
            mark: ATTR_MARK,
            prepend: "queue",
            attachTo: container,
            priority: order
          };
          const nonceStr = typeof nonce === "function" ? nonce() : nonce;
          if (nonceStr) {
            mergedCSSConfig.csp = {
              nonce: nonceStr
            };
          }
          const style = updateCSS$1(styleStr, styleId, mergedCSSConfig);
          style[CSS_IN_JS_INSTANCE] = cache.instanceId;
          style.setAttribute(ATTR_TOKEN, tokenKey.value);
          {
            style.setAttribute(ATTR_CACHE_PATH, fullPath.value.join("|"));
          }
          Object.keys(effectStyle).forEach((effectKey) => {
            if (!globalEffectStyleKeys.has(effectKey)) {
              globalEffectStyleKeys.add(effectKey);
              updateCSS$1(normalizeStyle(effectStyle[effectKey]), `_effect-${effectKey}`, {
                mark: ATTR_MARK,
                prepend: "queue",
                attachTo: container
              });
            }
          });
        }
        return [styleStr, tokenKey.value, styleId, effectStyle, clientOnly, order];
      },
      // Remove cache if no need
      (_ref, fromHMR) => {
        let [, , styleId] = _ref;
        if ((fromHMR || styleContext.value.autoClear) && isClientSide) {
          removeCSS(styleId, {
            mark: ATTR_MARK
          });
        }
      }
    );
    return (node2) => {
      return node2;
    };
  }
  class Keyframe {
    constructor(name, style) {
      this._keyframe = true;
      this.name = name;
      this.style = style;
    }
    getName() {
      let hashId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return hashId ? `${hashId}-${this.name}` : this.name;
    }
  }
  function noSplit(list) {
    list.notSplit = true;
    return list;
  }
  ({
    // Border
    borderBlock: noSplit(["borderTop", "borderBottom"]),
    borderBlockStart: noSplit(["borderTop"]),
    borderBlockEnd: noSplit(["borderBottom"]),
    borderInline: noSplit(["borderLeft", "borderRight"]),
    borderInlineStart: noSplit(["borderLeft"]),
    borderInlineEnd: noSplit(["borderRight"])
  });
  const version = "4.2.6";
  const genControlHeight = (token2) => {
    const {
      controlHeight
    } = token2;
    return {
      controlHeightSM: controlHeight * 0.75,
      controlHeightXS: controlHeight * 0.5,
      controlHeightLG: controlHeight * 1.25
    };
  };
  function genSizeMapToken(token2) {
    const {
      sizeUnit,
      sizeStep
    } = token2;
    return {
      sizeXXL: sizeUnit * (sizeStep + 8),
      sizeXL: sizeUnit * (sizeStep + 4),
      sizeLG: sizeUnit * (sizeStep + 2),
      sizeMD: sizeUnit * (sizeStep + 1),
      sizeMS: sizeUnit * sizeStep,
      size: sizeUnit * sizeStep,
      sizeSM: sizeUnit * (sizeStep - 1),
      sizeXS: sizeUnit * (sizeStep - 2),
      sizeXXS: sizeUnit * (sizeStep - 3)
      // 4
    };
  }
  const defaultPresetColors = {
    blue: "#1677ff",
    purple: "#722ED1",
    cyan: "#13C2C2",
    green: "#52C41A",
    magenta: "#EB2F96",
    pink: "#eb2f96",
    red: "#F5222D",
    orange: "#FA8C16",
    yellow: "#FADB14",
    volcano: "#FA541C",
    geekblue: "#2F54EB",
    gold: "#FAAD14",
    lime: "#A0D911"
  };
  const seedToken = _extends(_extends({}, defaultPresetColors), {
    // Color
    colorPrimary: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",
    colorTextBase: "",
    colorBgBase: "",
    // Font
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
    fontSize: 14,
    // Line
    lineWidth: 1,
    lineType: "solid",
    // Motion
    motionUnit: 0.1,
    motionBase: 0,
    motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
    motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
    motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
    motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
    motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
    // Radius
    borderRadius: 6,
    // Size
    sizeUnit: 4,
    sizeStep: 4,
    sizePopupArrow: 16,
    // Control Base
    controlHeight: 32,
    // zIndex
    zIndexBase: 0,
    zIndexPopupBase: 1e3,
    // Image
    opacityImage: 1,
    // Wireframe
    wireframe: false
  });
  function genColorMapToken(seed2, _ref) {
    let {
      generateColorPalettes: generateColorPalettes2,
      generateNeutralColorPalettes: generateNeutralColorPalettes2
    } = _ref;
    const {
      colorSuccess: colorSuccessBase,
      colorWarning: colorWarningBase,
      colorError: colorErrorBase,
      colorInfo: colorInfoBase,
      colorPrimary: colorPrimaryBase,
      colorBgBase,
      colorTextBase
    } = seed2;
    const primaryColors = generateColorPalettes2(colorPrimaryBase);
    const successColors = generateColorPalettes2(colorSuccessBase);
    const warningColors = generateColorPalettes2(colorWarningBase);
    const errorColors = generateColorPalettes2(colorErrorBase);
    const infoColors = generateColorPalettes2(colorInfoBase);
    const neutralColors = generateNeutralColorPalettes2(colorBgBase, colorTextBase);
    return _extends(_extends({}, neutralColors), {
      colorPrimaryBg: primaryColors[1],
      colorPrimaryBgHover: primaryColors[2],
      colorPrimaryBorder: primaryColors[3],
      colorPrimaryBorderHover: primaryColors[4],
      colorPrimaryHover: primaryColors[5],
      colorPrimary: primaryColors[6],
      colorPrimaryActive: primaryColors[7],
      colorPrimaryTextHover: primaryColors[8],
      colorPrimaryText: primaryColors[9],
      colorPrimaryTextActive: primaryColors[10],
      colorSuccessBg: successColors[1],
      colorSuccessBgHover: successColors[2],
      colorSuccessBorder: successColors[3],
      colorSuccessBorderHover: successColors[4],
      colorSuccessHover: successColors[4],
      colorSuccess: successColors[6],
      colorSuccessActive: successColors[7],
      colorSuccessTextHover: successColors[8],
      colorSuccessText: successColors[9],
      colorSuccessTextActive: successColors[10],
      colorErrorBg: errorColors[1],
      colorErrorBgHover: errorColors[2],
      colorErrorBorder: errorColors[3],
      colorErrorBorderHover: errorColors[4],
      colorErrorHover: errorColors[5],
      colorError: errorColors[6],
      colorErrorActive: errorColors[7],
      colorErrorTextHover: errorColors[8],
      colorErrorText: errorColors[9],
      colorErrorTextActive: errorColors[10],
      colorWarningBg: warningColors[1],
      colorWarningBgHover: warningColors[2],
      colorWarningBorder: warningColors[3],
      colorWarningBorderHover: warningColors[4],
      colorWarningHover: warningColors[4],
      colorWarning: warningColors[6],
      colorWarningActive: warningColors[7],
      colorWarningTextHover: warningColors[8],
      colorWarningText: warningColors[9],
      colorWarningTextActive: warningColors[10],
      colorInfoBg: infoColors[1],
      colorInfoBgHover: infoColors[2],
      colorInfoBorder: infoColors[3],
      colorInfoBorderHover: infoColors[4],
      colorInfoHover: infoColors[4],
      colorInfo: infoColors[6],
      colorInfoActive: infoColors[7],
      colorInfoTextHover: infoColors[8],
      colorInfoText: infoColors[9],
      colorInfoTextActive: infoColors[10],
      colorBgMask: new TinyColor("#000").setAlpha(0.45).toRgbString(),
      colorWhite: "#fff"
    });
  }
  const genRadius = (radiusBase) => {
    let radiusLG = radiusBase;
    let radiusSM = radiusBase;
    let radiusXS = radiusBase;
    let radiusOuter = radiusBase;
    if (radiusBase < 6 && radiusBase >= 5) {
      radiusLG = radiusBase + 1;
    } else if (radiusBase < 16 && radiusBase >= 6) {
      radiusLG = radiusBase + 2;
    } else if (radiusBase >= 16) {
      radiusLG = 16;
    }
    if (radiusBase < 7 && radiusBase >= 5) {
      radiusSM = 4;
    } else if (radiusBase < 8 && radiusBase >= 7) {
      radiusSM = 5;
    } else if (radiusBase < 14 && radiusBase >= 8) {
      radiusSM = 6;
    } else if (radiusBase < 16 && radiusBase >= 14) {
      radiusSM = 7;
    } else if (radiusBase >= 16) {
      radiusSM = 8;
    }
    if (radiusBase < 6 && radiusBase >= 2) {
      radiusXS = 1;
    } else if (radiusBase >= 6) {
      radiusXS = 2;
    }
    if (radiusBase > 4 && radiusBase < 8) {
      radiusOuter = 4;
    } else if (radiusBase >= 8) {
      radiusOuter = 6;
    }
    return {
      borderRadius: radiusBase > 16 ? 16 : radiusBase,
      borderRadiusXS: radiusXS,
      borderRadiusSM: radiusSM,
      borderRadiusLG: radiusLG,
      borderRadiusOuter: radiusOuter
    };
  };
  function genCommonMapToken(token2) {
    const {
      motionUnit,
      motionBase,
      borderRadius,
      lineWidth
    } = token2;
    return _extends({
      // motion
      motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
      motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
      motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
      // line
      lineWidthBold: lineWidth + 1
    }, genRadius(borderRadius));
  }
  const getAlphaColor$1 = (baseColor, alpha) => new TinyColor(baseColor).setAlpha(alpha).toRgbString();
  const getSolidColor = (baseColor, brightness) => {
    const instance = new TinyColor(baseColor);
    return instance.darken(brightness).toHexString();
  };
  const generateColorPalettes = (baseColor) => {
    const colors = generate$2(baseColor);
    return {
      1: colors[0],
      2: colors[1],
      3: colors[2],
      4: colors[3],
      5: colors[4],
      6: colors[5],
      7: colors[6],
      8: colors[4],
      9: colors[5],
      10: colors[6]
      // 8: colors[7],
      // 9: colors[8],
      // 10: colors[9],
    };
  };
  const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
    const colorBgBase = bgBaseColor || "#fff";
    const colorTextBase = textBaseColor || "#000";
    return {
      colorBgBase,
      colorTextBase,
      colorText: getAlphaColor$1(colorTextBase, 0.88),
      colorTextSecondary: getAlphaColor$1(colorTextBase, 0.65),
      colorTextTertiary: getAlphaColor$1(colorTextBase, 0.45),
      colorTextQuaternary: getAlphaColor$1(colorTextBase, 0.25),
      colorFill: getAlphaColor$1(colorTextBase, 0.15),
      colorFillSecondary: getAlphaColor$1(colorTextBase, 0.06),
      colorFillTertiary: getAlphaColor$1(colorTextBase, 0.04),
      colorFillQuaternary: getAlphaColor$1(colorTextBase, 0.02),
      colorBgLayout: getSolidColor(colorBgBase, 4),
      colorBgContainer: getSolidColor(colorBgBase, 0),
      colorBgElevated: getSolidColor(colorBgBase, 0),
      colorBgSpotlight: getAlphaColor$1(colorTextBase, 0.85),
      colorBorder: getSolidColor(colorBgBase, 15),
      colorBorderSecondary: getSolidColor(colorBgBase, 6)
    };
  };
  function getFontSizes(base) {
    const fontSizes = new Array(10).fill(null).map((_2, index) => {
      const i2 = index - 1;
      const baseSize = base * Math.pow(2.71828, i2 / 5);
      const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
      return Math.floor(intSize / 2) * 2;
    });
    fontSizes[1] = base;
    return fontSizes.map((size) => {
      const height = size + 8;
      return {
        size,
        lineHeight: height / size
      };
    });
  }
  const genFontMapToken = (fontSize) => {
    const fontSizePairs = getFontSizes(fontSize);
    const fontSizes = fontSizePairs.map((pair) => pair.size);
    const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
    return {
      fontSizeSM: fontSizes[0],
      fontSize: fontSizes[1],
      fontSizeLG: fontSizes[2],
      fontSizeXL: fontSizes[3],
      fontSizeHeading1: fontSizes[6],
      fontSizeHeading2: fontSizes[5],
      fontSizeHeading3: fontSizes[4],
      fontSizeHeading4: fontSizes[3],
      fontSizeHeading5: fontSizes[2],
      lineHeight: lineHeights[1],
      lineHeightLG: lineHeights[2],
      lineHeightSM: lineHeights[0],
      lineHeightHeading1: lineHeights[6],
      lineHeightHeading2: lineHeights[5],
      lineHeightHeading3: lineHeights[4],
      lineHeightHeading4: lineHeights[3],
      lineHeightHeading5: lineHeights[2]
    };
  };
  function derivative(token2) {
    const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
      const colors = generate$2(token2[colorKey]);
      return new Array(10).fill(1).reduce((prev2, _2, i2) => {
        prev2[`${colorKey}-${i2 + 1}`] = colors[i2];
        return prev2;
      }, {});
    }).reduce((prev2, cur) => {
      prev2 = _extends(_extends({}, prev2), cur);
      return prev2;
    }, {});
    return _extends(_extends(_extends(_extends(_extends(_extends(_extends({}, token2), colorPalettes), genColorMapToken(token2, {
      generateColorPalettes,
      generateNeutralColorPalettes
    })), genFontMapToken(token2.fontSize)), genSizeMapToken(token2)), genControlHeight(token2)), genCommonMapToken(token2));
  }
  function isStableColor(color) {
    return color >= 0 && color <= 255;
  }
  function getAlphaColor(frontColor, backgroundColor) {
    const {
      r: fR,
      g: fG,
      b: fB,
      a: originAlpha
    } = new TinyColor(frontColor).toRgb();
    if (originAlpha < 1) {
      return frontColor;
    }
    const {
      r: bR,
      g: bG,
      b: bB
    } = new TinyColor(backgroundColor).toRgb();
    for (let fA = 0.01; fA <= 1; fA += 0.01) {
      const r2 = Math.round((fR - bR * (1 - fA)) / fA);
      const g2 = Math.round((fG - bG * (1 - fA)) / fA);
      const b2 = Math.round((fB - bB * (1 - fA)) / fA);
      if (isStableColor(r2) && isStableColor(g2) && isStableColor(b2)) {
        return new TinyColor({
          r: r2,
          g: g2,
          b: b2,
          a: Math.round(fA * 100) / 100
        }).toRgbString();
      }
    }
    return new TinyColor({
      r: fR,
      g: fG,
      b: fB,
      a: 1
    }).toRgbString();
  }
  var __rest$8 = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  function formatToken(derivativeToken) {
    const {
      override
    } = derivativeToken, restToken = __rest$8(derivativeToken, ["override"]);
    const overrideTokens = _extends({}, override);
    Object.keys(seedToken).forEach((token2) => {
      delete overrideTokens[token2];
    });
    const mergedToken = _extends(_extends({}, restToken), overrideTokens);
    const screenXS = 480;
    const screenSM = 576;
    const screenMD = 768;
    const screenLG = 992;
    const screenXL = 1200;
    const screenXXL = 1600;
    const screenXXXL = 2e3;
    const aliasToken = _extends(_extends(_extends({}, mergedToken), {
      colorLink: mergedToken.colorInfoText,
      colorLinkHover: mergedToken.colorInfoHover,
      colorLinkActive: mergedToken.colorInfoActive,
      // ============== Background ============== //
      colorFillContent: mergedToken.colorFillSecondary,
      colorFillContentHover: mergedToken.colorFill,
      colorFillAlter: mergedToken.colorFillQuaternary,
      colorBgContainerDisabled: mergedToken.colorFillTertiary,
      // ============== Split ============== //
      colorBorderBg: mergedToken.colorBgContainer,
      colorSplit: getAlphaColor(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
      // ============== Text ============== //
      colorTextPlaceholder: mergedToken.colorTextQuaternary,
      colorTextDisabled: mergedToken.colorTextQuaternary,
      colorTextHeading: mergedToken.colorText,
      colorTextLabel: mergedToken.colorTextSecondary,
      colorTextDescription: mergedToken.colorTextTertiary,
      colorTextLightSolid: mergedToken.colorWhite,
      colorHighlight: mergedToken.colorError,
      colorBgTextHover: mergedToken.colorFillSecondary,
      colorBgTextActive: mergedToken.colorFill,
      colorIcon: mergedToken.colorTextTertiary,
      colorIconHover: mergedToken.colorText,
      colorErrorOutline: getAlphaColor(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
      colorWarningOutline: getAlphaColor(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
      // Font
      fontSizeIcon: mergedToken.fontSizeSM,
      // Control
      lineWidth: mergedToken.lineWidth,
      controlOutlineWidth: mergedToken.lineWidth * 2,
      // Checkbox size and expand icon size
      controlInteractiveSize: mergedToken.controlHeight / 2,
      controlItemBgHover: mergedToken.colorFillTertiary,
      controlItemBgActive: mergedToken.colorPrimaryBg,
      controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
      controlItemBgActiveDisabled: mergedToken.colorFill,
      controlTmpOutline: mergedToken.colorFillQuaternary,
      controlOutline: getAlphaColor(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
      lineType: mergedToken.lineType,
      borderRadius: mergedToken.borderRadius,
      borderRadiusXS: mergedToken.borderRadiusXS,
      borderRadiusSM: mergedToken.borderRadiusSM,
      borderRadiusLG: mergedToken.borderRadiusLG,
      fontWeightStrong: 600,
      opacityLoading: 0.65,
      linkDecoration: "none",
      linkHoverDecoration: "none",
      linkFocusDecoration: "none",
      controlPaddingHorizontal: 12,
      controlPaddingHorizontalSM: 8,
      paddingXXS: mergedToken.sizeXXS,
      paddingXS: mergedToken.sizeXS,
      paddingSM: mergedToken.sizeSM,
      padding: mergedToken.size,
      paddingMD: mergedToken.sizeMD,
      paddingLG: mergedToken.sizeLG,
      paddingXL: mergedToken.sizeXL,
      paddingContentHorizontalLG: mergedToken.sizeLG,
      paddingContentVerticalLG: mergedToken.sizeMS,
      paddingContentHorizontal: mergedToken.sizeMS,
      paddingContentVertical: mergedToken.sizeSM,
      paddingContentHorizontalSM: mergedToken.size,
      paddingContentVerticalSM: mergedToken.sizeXS,
      marginXXS: mergedToken.sizeXXS,
      marginXS: mergedToken.sizeXS,
      marginSM: mergedToken.sizeSM,
      margin: mergedToken.size,
      marginMD: mergedToken.sizeMD,
      marginLG: mergedToken.sizeLG,
      marginXL: mergedToken.sizeXL,
      marginXXL: mergedToken.sizeXXL,
      boxShadow: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
      boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
      screenXS,
      screenXSMin: screenXS,
      screenXSMax: screenSM - 1,
      screenSM,
      screenSMMin: screenSM,
      screenSMMax: screenMD - 1,
      screenMD,
      screenMDMin: screenMD,
      screenMDMax: screenLG - 1,
      screenLG,
      screenLGMin: screenLG,
      screenLGMax: screenXL - 1,
      screenXL,
      screenXLMin: screenXL,
      screenXLMax: screenXXL - 1,
      screenXXL,
      screenXXLMin: screenXXL,
      screenXXLMax: screenXXXL - 1,
      screenXXXL,
      screenXXXLMin: screenXXXL,
      // FIXME: component box-shadow, should be removed
      boxShadowPopoverArrow: "3px 3px 7px rgba(0, 0, 0, 0.1)",
      boxShadowCard: `
      0 1px 2px -2px ${new TinyColor("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new TinyColor("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new TinyColor("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
      boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
      boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
      boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
      boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
      boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)"
    }), overrideTokens);
    return aliasToken;
  }
  const resetComponent = (token2) => ({
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    color: token2.colorText,
    fontSize: token2.fontSize,
    // font-variant: @font-variant-base;
    lineHeight: token2.lineHeight,
    listStyle: "none",
    // font-feature-settings: @font-feature-settings-base;
    fontFamily: token2.fontFamily
  });
  const resetIcon = () => ({
    display: "inline-flex",
    alignItems: "center",
    color: "inherit",
    fontStyle: "normal",
    lineHeight: 0,
    textAlign: "center",
    textTransform: "none",
    // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
    verticalAlign: "-0.125em",
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    "> *": {
      lineHeight: 1
    },
    svg: {
      display: "inline-block"
    }
  });
  const clearFix = () => ({
    // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
    "&::before": {
      display: "table",
      content: '""'
    },
    "&::after": {
      // https://github.com/ant-design/ant-design/issues/21864
      display: "table",
      clear: "both",
      content: '""'
    }
  });
  const genLinkStyle = (token2) => ({
    a: {
      color: token2.colorLink,
      textDecoration: token2.linkDecoration,
      backgroundColor: "transparent",
      outline: "none",
      cursor: "pointer",
      transition: `color ${token2.motionDurationSlow}`,
      "-webkit-text-decoration-skip": "objects",
      "&:hover": {
        color: token2.colorLinkHover
      },
      "&:active": {
        color: token2.colorLinkActive
      },
      [`&:active,
  &:hover`]: {
        textDecoration: token2.linkHoverDecoration,
        outline: 0
      },
      // https://github.com/ant-design/ant-design/issues/22503
      "&:focus": {
        textDecoration: token2.linkFocusDecoration,
        outline: 0
      },
      "&[disabled]": {
        color: token2.colorTextDisabled,
        cursor: "not-allowed"
      }
    }
  });
  const genCommonStyle = (token2, componentPrefixCls) => {
    const {
      fontFamily,
      fontSize
    } = token2;
    const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
    return {
      [rootPrefixSelector]: {
        fontFamily,
        fontSize,
        boxSizing: "border-box",
        "&::before, &::after": {
          boxSizing: "border-box"
        },
        [rootPrefixSelector]: {
          boxSizing: "border-box",
          "&::before, &::after": {
            boxSizing: "border-box"
          }
        }
      }
    };
  };
  const genFocusOutline = (token2) => ({
    outline: `${token2.lineWidthBold}px solid ${token2.colorPrimaryBorder}`,
    outlineOffset: 1,
    transition: "outline-offset 0s, outline 0s"
  });
  const genFocusStyle = (token2) => ({
    "&:focus-visible": _extends({}, genFocusOutline(token2))
  });
  function genComponentStyleHook(component, styleFn, getDefaultToken) {
    return (_prefixCls) => {
      const prefixCls = computed(() => _prefixCls === null || _prefixCls === void 0 ? void 0 : _prefixCls.value);
      const [theme, token2, hashId] = useToken();
      const {
        getPrefixCls,
        iconPrefixCls
      } = useConfigContextInject();
      const rootPrefixCls = computed(() => getPrefixCls());
      const sharedInfo = computed(() => {
        return {
          theme: theme.value,
          token: token2.value,
          hashId: hashId.value,
          path: ["Shared", rootPrefixCls.value]
        };
      });
      useStyleRegister(sharedInfo, () => [{
        // Link
        "&": genLinkStyle(token2.value)
      }]);
      const componentInfo = computed(() => {
        return {
          theme: theme.value,
          token: token2.value,
          hashId: hashId.value,
          path: [component, prefixCls.value, iconPrefixCls.value]
        };
      });
      return [useStyleRegister(componentInfo, () => {
        const {
          token: proxyToken,
          flush
        } = statisticToken(token2.value);
        const defaultComponentToken = typeof getDefaultToken === "function" ? getDefaultToken(proxyToken) : getDefaultToken;
        const mergedComponentToken = _extends(_extends({}, defaultComponentToken), token2.value[component]);
        const componentCls = `.${prefixCls.value}`;
        const mergedToken = merge(proxyToken, {
          componentCls,
          prefixCls: prefixCls.value,
          iconCls: `.${iconPrefixCls.value}`,
          antCls: `.${rootPrefixCls.value}`
        }, mergedComponentToken);
        const styleInterpolation = styleFn(mergedToken, {
          hashId: hashId.value,
          prefixCls: prefixCls.value,
          rootPrefixCls: rootPrefixCls.value,
          iconPrefixCls: iconPrefixCls.value,
          overrideComponentToken: token2.value[component]
        });
        flush(component, mergedComponentToken);
        return [genCommonStyle(token2.value, prefixCls.value), styleInterpolation];
      }), hashId];
    };
  }
  let recording = true;
  function merge() {
    for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
      objs[_key] = arguments[_key];
    }
    recording = false;
    const ret = {};
    objs.forEach((obj) => {
      const keys = Object.keys(obj);
      keys.forEach((key2) => {
        Object.defineProperty(ret, key2, {
          configurable: true,
          enumerable: true,
          get: () => obj[key2]
        });
      });
    });
    recording = true;
    return ret;
  }
  function noop() {
  }
  function statisticToken(token2) {
    let tokenKeys2;
    let proxy = token2;
    let flush = noop;
    {
      tokenKeys2 = /* @__PURE__ */ new Set();
      proxy = new Proxy(token2, {
        get(obj, prop) {
          if (recording) {
            tokenKeys2.add(prop);
          }
          return obj[prop];
        }
      });
      flush = (componentName, componentToken) => {
        ({
          global: Array.from(tokenKeys2),
          component: componentToken
        });
      };
    }
    return {
      token: proxy,
      keys: tokenKeys2,
      flush
    };
  }
  const defaultTheme = createTheme(derivative);
  const defaultConfig = {
    token: seedToken,
    hashed: true
  };
  const DesignTokenContextKey = Symbol("DesignTokenContext");
  const globalDesignTokenApi = /* @__PURE__ */ shallowRef();
  const useDesignTokenProvider = (value) => {
    provide(DesignTokenContextKey, value);
    watch(value, () => {
      globalDesignTokenApi.value = unref(value);
      triggerRef(globalDesignTokenApi);
    }, {
      immediate: true,
      deep: true
    });
  };
  const DesignTokenProvider = /* @__PURE__ */ defineComponent({
    props: {
      value: objectType()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useDesignTokenProvider(computed(() => props.value));
      return () => {
        var _a;
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      };
    }
  });
  function useToken() {
    const designTokenContext = inject(DesignTokenContextKey, computed(() => globalDesignTokenApi.value || defaultConfig));
    const salt = computed(() => `${version}-${designTokenContext.value.hashed || ""}`);
    const mergedTheme = computed(() => designTokenContext.value.theme || defaultTheme);
    const cacheToken = useCacheToken(mergedTheme, computed(() => [seedToken, designTokenContext.value.token]), computed(() => ({
      salt: salt.value,
      override: _extends({
        override: designTokenContext.value.token
      }, designTokenContext.value.components),
      formatToken
    })));
    return [mergedTheme, computed(() => cacheToken.value[0]), computed(() => designTokenContext.value.hashed ? cacheToken.value[1] : "")];
  }
  const Empty$2 = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    setup() {
      const [, token2] = useToken();
      const themeStyle = computed(() => {
        const bgColor = new TinyColor(token2.value.colorBgBase);
        if (bgColor.toHsl().l < 0.5) {
          return {
            opacity: 0.65
          };
        }
        return {};
      });
      return () => createVNode("svg", {
        "style": themeStyle.value,
        "width": "184",
        "height": "152",
        "viewBox": "0 0 184 152",
        "xmlns": "http://www.w3.org/2000/svg"
      }, [createVNode("g", {
        "fill": "none",
        "fill-rule": "evenodd"
      }, [createVNode("g", {
        "transform": "translate(24 31.67)"
      }, [createVNode("ellipse", {
        "fill-opacity": ".8",
        "fill": "#F5F5F7",
        "cx": "67.797",
        "cy": "106.89",
        "rx": "67.797",
        "ry": "12.668"
      }, null), createVNode("path", {
        "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z",
        "fill": "#AEB8C2"
      }, null), createVNode("path", {
        "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
        "fill": "url(#linearGradient-1)",
        "transform": "translate(13.56)"
      }, null), createVNode("path", {
        "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z",
        "fill": "#F5F5F7"
      }, null), createVNode("path", {
        "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z",
        "fill": "#DCE0E6"
      }, null)]), createVNode("path", {
        "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z",
        "fill": "#DCE0E6"
      }, null), createVNode("g", {
        "transform": "translate(149.65 15.383)",
        "fill": "#FFF"
      }, [createVNode("ellipse", {
        "cx": "20.654",
        "cy": "3.167",
        "rx": "2.849",
        "ry": "2.815"
      }, null), createVNode("path", {
        "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
      }, null)])])]);
    }
  });
  Empty$2.PRESENTED_IMAGE_DEFAULT = true;
  const Simple = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    setup() {
      const [, token2] = useToken();
      const color = computed(() => {
        const {
          colorFill,
          colorFillTertiary,
          colorFillQuaternary,
          colorBgContainer
        } = token2.value;
        return {
          borderColor: new TinyColor(colorFill).onBackground(colorBgContainer).toHexString(),
          shadowColor: new TinyColor(colorFillTertiary).onBackground(colorBgContainer).toHexString(),
          contentColor: new TinyColor(colorFillQuaternary).onBackground(colorBgContainer).toHexString()
        };
      });
      return () => createVNode("svg", {
        "width": "64",
        "height": "41",
        "viewBox": "0 0 64 41",
        "xmlns": "http://www.w3.org/2000/svg"
      }, [createVNode("g", {
        "transform": "translate(0 1)",
        "fill": "none",
        "fill-rule": "evenodd"
      }, [createVNode("ellipse", {
        "fill": color.value.shadowColor,
        "cx": "32",
        "cy": "33",
        "rx": "32",
        "ry": "7"
      }, null), createVNode("g", {
        "fill-rule": "nonzero",
        "stroke": color.value.borderColor
      }, [createVNode("path", {
        "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
      }, null), createVNode("path", {
        "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
        "fill": color.value.contentColor
      }, null)])])]);
    }
  });
  Simple.PRESENTED_IMAGE_SIMPLE = true;
  const genSharedEmptyStyle = (token2) => {
    const {
      componentCls,
      margin,
      marginXS,
      marginXL,
      fontSize,
      lineHeight
    } = token2;
    return {
      [componentCls]: {
        marginInline: marginXS,
        fontSize,
        lineHeight,
        textAlign: "center",
        // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
        [`${componentCls}-image`]: {
          height: token2.emptyImgHeight,
          marginBottom: marginXS,
          opacity: token2.opacityImage,
          img: {
            height: "100%"
          },
          svg: {
            height: "100%",
            margin: "auto"
          }
        },
        // 原来 &-footer 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
        [`${componentCls}-footer`]: {
          marginTop: margin
        },
        "&-normal": {
          marginBlock: marginXL,
          color: token2.colorTextDisabled,
          [`${componentCls}-image`]: {
            height: token2.emptyImgHeightMD
          }
        },
        "&-small": {
          marginBlock: marginXS,
          color: token2.colorTextDisabled,
          [`${componentCls}-image`]: {
            height: token2.emptyImgHeightSM
          }
        }
      }
    };
  };
  const useStyle$9 = genComponentStyleHook("Empty", (token2) => {
    const {
      componentCls,
      controlHeightLG
    } = token2;
    const emptyToken = merge(token2, {
      emptyImgCls: `${componentCls}-img`,
      emptyImgHeight: controlHeightLG * 2.5,
      emptyImgHeightMD: controlHeightLG,
      emptyImgHeightSM: controlHeightLG * 0.875
    });
    return [genSharedEmptyStyle(emptyToken)];
  });
  var __rest$7 = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  const emptyProps = () => ({
    prefixCls: String,
    imageStyle: objectType(),
    image: anyType(),
    description: anyType()
  });
  const Empty = /* @__PURE__ */ defineComponent({
    name: "AEmpty",
    compatConfig: {
      MODE: 3
    },
    inheritAttrs: false,
    props: emptyProps(),
    setup(props, _ref) {
      let {
        slots = {},
        attrs
      } = _ref;
      const {
        direction,
        prefixCls: prefixClsRef
      } = useConfigInject("empty", props);
      const [wrapSSR, hashId] = useStyle$9(prefixClsRef);
      return () => {
        var _a, _b;
        const prefixCls = prefixClsRef.value;
        const _c = _extends(_extends({}, props), attrs), {
          image: mergedImage = ((_a = slots.image) === null || _a === void 0 ? void 0 : _a.call(slots)) || h$1(Empty$2),
          description = ((_b = slots.description) === null || _b === void 0 ? void 0 : _b.call(slots)) || void 0,
          imageStyle,
          class: className = ""
        } = _c, restProps = __rest$7(_c, ["image", "description", "imageStyle", "class"]);
        const image = typeof mergedImage === "function" ? mergedImage() : mergedImage;
        const isNormal = typeof image === "object" && "type" in image && image.type.PRESENTED_IMAGE_SIMPLE;
        return wrapSSR(createVNode(LocaleReceiver, {
          "componentName": "Empty",
          "children": (locale2) => {
            const des = typeof description !== "undefined" ? description : locale2.description;
            const alt = typeof des === "string" ? des : "empty";
            let imageNode = null;
            if (typeof image === "string") {
              imageNode = createVNode("img", {
                "alt": alt,
                "src": image
              }, null);
            } else {
              imageNode = image;
            }
            return createVNode("div", _objectSpread2({
              "class": classNames(prefixCls, className, hashId.value, {
                [`${prefixCls}-normal`]: isNormal,
                [`${prefixCls}-rtl`]: direction.value === "rtl"
              })
            }, restProps), [createVNode("div", {
              "class": `${prefixCls}-image`,
              "style": imageStyle
            }, [imageNode]), des && createVNode("p", {
              "class": `${prefixCls}-description`
            }, [des]), slots.default && createVNode("div", {
              "class": `${prefixCls}-footer`
            }, [filterEmpty(slots.default())])]);
          }
        }, null));
      };
    }
  });
  Empty.PRESENTED_IMAGE_DEFAULT = () => h$1(Empty$2);
  Empty.PRESENTED_IMAGE_SIMPLE = () => h$1(Simple);
  const Empty$1 = withInstall(Empty);
  const DefaultRenderEmpty = (props) => {
    const {
      prefixCls
    } = useConfigInject("empty", props);
    const renderHtml = (componentName) => {
      switch (componentName) {
        case "Table":
        case "List":
          return createVNode(Empty$1, {
            "image": Empty$1.PRESENTED_IMAGE_SIMPLE
          }, null);
        case "Select":
        case "TreeSelect":
        case "Cascader":
        case "Transfer":
        case "Mentions":
          return createVNode(Empty$1, {
            "image": Empty$1.PRESENTED_IMAGE_SIMPLE,
            "class": `${prefixCls.value}-small`
          }, null);
        default:
          return createVNode(Empty$1, null, null);
      }
    };
    return renderHtml(props.componentName);
  };
  function renderEmpty(componentName) {
    return createVNode(DefaultRenderEmpty, {
      "componentName": componentName
    }, null);
  }
  const SizeContextKey = Symbol("SizeContextKey");
  const useInjectSize = () => {
    return inject(SizeContextKey, /* @__PURE__ */ ref(void 0));
  };
  const useProviderSize = (size) => {
    const parentSize = useInjectSize();
    provide(SizeContextKey, computed(() => size.value || parentSize.value));
    return size;
  };
  const useConfigInject = (name, props) => {
    const sizeContext = useInjectSize();
    const disabledContext = useInjectDisabled();
    const configProvider = inject(configProviderKey, _extends(_extends({}, defaultConfigProvider), {
      renderEmpty: (name2) => h$1(DefaultRenderEmpty, {
        componentName: name2
      })
    }));
    const prefixCls = computed(() => configProvider.getPrefixCls(name, props.prefixCls));
    const direction = computed(() => {
      var _a, _b;
      return (_a = props.direction) !== null && _a !== void 0 ? _a : (_b = configProvider.direction) === null || _b === void 0 ? void 0 : _b.value;
    });
    const iconPrefixCls = computed(() => {
      var _a;
      return (_a = props.iconPrefixCls) !== null && _a !== void 0 ? _a : configProvider.iconPrefixCls.value;
    });
    const rootPrefixCls = computed(() => configProvider.getPrefixCls());
    const autoInsertSpaceInButton = computed(() => {
      var _a;
      return (_a = configProvider.autoInsertSpaceInButton) === null || _a === void 0 ? void 0 : _a.value;
    });
    const renderEmpty2 = configProvider.renderEmpty;
    const space = configProvider.space;
    const pageHeader = configProvider.pageHeader;
    const form = configProvider.form;
    const getTargetContainer = computed(() => {
      var _a, _b;
      return (_a = props.getTargetContainer) !== null && _a !== void 0 ? _a : (_b = configProvider.getTargetContainer) === null || _b === void 0 ? void 0 : _b.value;
    });
    const getPopupContainer = computed(() => {
      var _a, _b, _c;
      return (_b = (_a = props.getContainer) !== null && _a !== void 0 ? _a : props.getPopupContainer) !== null && _b !== void 0 ? _b : (_c = configProvider.getPopupContainer) === null || _c === void 0 ? void 0 : _c.value;
    });
    const dropdownMatchSelectWidth = computed(() => {
      var _a, _b;
      return (_a = props.dropdownMatchSelectWidth) !== null && _a !== void 0 ? _a : (_b = configProvider.dropdownMatchSelectWidth) === null || _b === void 0 ? void 0 : _b.value;
    });
    const virtual = computed(() => {
      var _a;
      return (props.virtual === void 0 ? ((_a = configProvider.virtual) === null || _a === void 0 ? void 0 : _a.value) !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
    });
    const size = computed(() => props.size || sizeContext.value);
    const autocomplete = computed(() => {
      var _a, _b, _c;
      return (_a = props.autocomplete) !== null && _a !== void 0 ? _a : (_c = (_b = configProvider.input) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.autocomplete;
    });
    const disabled = computed(() => {
      var _a;
      return (_a = props.disabled) !== null && _a !== void 0 ? _a : disabledContext.value;
    });
    const csp = computed(() => {
      var _a;
      return (_a = props.csp) !== null && _a !== void 0 ? _a : configProvider.csp;
    });
    const wave = computed(() => {
      var _a, _b;
      return (_a = props.wave) !== null && _a !== void 0 ? _a : (_b = configProvider.wave) === null || _b === void 0 ? void 0 : _b.value;
    });
    return {
      configProvider,
      prefixCls,
      direction,
      size,
      getTargetContainer,
      getPopupContainer,
      space,
      pageHeader,
      form,
      autoInsertSpaceInButton,
      renderEmpty: renderEmpty2,
      virtual,
      dropdownMatchSelectWidth,
      rootPrefixCls,
      getPrefixCls: configProvider.getPrefixCls,
      autocomplete,
      csp,
      iconPrefixCls,
      disabled,
      select: configProvider.select,
      wave
    };
  };
  function omit(obj, fields) {
    const shallowCopy = _extends({}, obj);
    for (let i2 = 0; i2 < fields.length; i2 += 1) {
      const key2 = fields[i2];
      delete shallowCopy[key2];
    }
    return shallowCopy;
  }
  function e(e2, t2) {
    for (var n2 = 0; n2 < t2.length; n2++) {
      var r2 = t2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
    }
  }
  function t(t2, n2, r2) {
    return r2 && e(t2, r2), t2;
  }
  function n() {
    return (n = Object.assign || function(e2) {
      for (var t2 = 1; t2 < arguments.length; t2++) {
        var n2 = arguments[t2];
        for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
      }
      return e2;
    }).apply(this, arguments);
  }
  function r(e2, t2) {
    e2.prototype = Object.create(t2.prototype), e2.prototype.constructor = e2, e2.__proto__ = t2;
  }
  function i(e2, t2) {
    if (null == e2) return {};
    var n2, r2, i2 = {}, o2 = Object.keys(e2);
    for (r2 = 0; r2 < o2.length; r2++) t2.indexOf(n2 = o2[r2]) >= 0 || (i2[n2] = e2[n2]);
    return i2;
  }
  function o(e2) {
    return 1 == (null != (t2 = e2) && "object" == typeof t2 && false === Array.isArray(t2)) && "[object Object]" === Object.prototype.toString.call(e2);
    var t2;
  }
  var u = Object.prototype, a = u.toString, f = u.hasOwnProperty, c = /^\s*function (\w+)/;
  function l(e2) {
    var t2, n2 = null !== (t2 = null == e2 ? void 0 : e2.type) && void 0 !== t2 ? t2 : e2;
    if (n2) {
      var r2 = n2.toString().match(c);
      return r2 ? r2[1] : "";
    }
    return "";
  }
  var s = function(e2) {
    var t2, n2;
    return false !== o(e2) && "function" == typeof (t2 = e2.constructor) && false !== o(n2 = t2.prototype) && false !== n2.hasOwnProperty("isPrototypeOf");
  }, v = function(e2) {
    return e2;
  }, y = v;
  {
    var p = "undefined" != typeof console;
    y = p ? function(e2) {
      console.warn("[VueTypes warn]: " + e2);
    } : v;
  }
  var d = function(e2, t2) {
    return f.call(e2, t2);
  }, h = Number.isInteger || function(e2) {
    return "number" == typeof e2 && isFinite(e2) && Math.floor(e2) === e2;
  }, b = Array.isArray || function(e2) {
    return "[object Array]" === a.call(e2);
  }, O = function(e2) {
    return "[object Function]" === a.call(e2);
  }, g = function(e2) {
    return s(e2) && d(e2, "_vueTypes_name");
  }, m = function(e2) {
    return s(e2) && (d(e2, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function(t2) {
      return d(e2, t2);
    }));
  };
  function j(e2, t2) {
    return Object.defineProperty(e2.bind(t2), "__original", { value: e2 });
  }
  function _(e2, t2, n2) {
    var r2;
    var i2 = true, o2 = "";
    r2 = s(e2) ? e2 : { type: e2 };
    var u2 = g(r2) ? r2._vueTypes_name + " - " : "";
    if (m(r2) && null !== r2.type) {
      if (void 0 === r2.type || true === r2.type) return i2;
      if (!r2.required && void 0 === t2) return i2;
      b(r2.type) ? (i2 = r2.type.some(function(e3) {
        return true === _(e3, t2);
      }), o2 = r2.type.map(function(e3) {
        return l(e3);
      }).join(" or ")) : i2 = "Array" === (o2 = l(r2)) ? b(t2) : "Object" === o2 ? s(t2) : "String" === o2 || "Number" === o2 || "Boolean" === o2 || "Function" === o2 ? function(e3) {
        if (null == e3) return "";
        var t3 = e3.constructor.toString().match(c);
        return t3 ? t3[1] : "";
      }(t2) === o2 : t2 instanceof r2.type;
    }
    if (!i2) {
      var a2 = u2 + 'value "' + t2 + '" should be of type "' + o2 + '"';
      return a2;
    }
    if (d(r2, "validator") && O(r2.validator)) {
      var f2 = y, v2 = [];
      if (y = function(e3) {
        v2.push(e3);
      }, i2 = r2.validator(t2), y = f2, !i2) {
        var p2 = (v2.length > 1 ? "* " : "") + v2.join("\n* ");
        return v2.length = 0, p2;
      }
    }
    return i2;
  }
  function T(e2, t2) {
    var n2 = Object.defineProperties(t2, { _vueTypes_name: { value: e2, writable: true }, isRequired: { get: function() {
      return this.required = true, this;
    } }, def: { value: function(e3) {
      return void 0 !== e3 || this.default ? O(e3) || true === _(this, e3) ? (this.default = b(e3) ? function() {
        return [].concat(e3);
      } : s(e3) ? function() {
        return Object.assign({}, e3);
      } : e3, this) : (y(this._vueTypes_name + ' - invalid default value: "' + e3 + '"'), this) : this;
    } } }), r2 = n2.validator;
    return O(r2) && (n2.validator = j(r2, n2)), n2;
  }
  function w(e2, t2) {
    var n2 = T(e2, t2);
    return Object.defineProperty(n2, "validate", { value: function(e3) {
      return O(this.validator) && y(this._vueTypes_name + " - calling .validate() will overwrite the current custom validator function. Validator info:\n" + JSON.stringify(this)), this.validator = j(e3, this), this;
    } });
  }
  function k(e2, t2, n2) {
    var r2, o2, u2 = (r2 = t2, o2 = {}, Object.getOwnPropertyNames(r2).forEach(function(e3) {
      o2[e3] = Object.getOwnPropertyDescriptor(r2, e3);
    }), Object.defineProperties({}, o2));
    if (u2._vueTypes_name = e2, !s(n2)) return u2;
    var a2, f2, c2 = n2.validator, l2 = i(n2, ["validator"]);
    if (O(c2)) {
      var v2 = u2.validator;
      v2 && (v2 = null !== (f2 = (a2 = v2).__original) && void 0 !== f2 ? f2 : a2), u2.validator = j(v2 ? function(e3) {
        return v2.call(this, e3) && c2.call(this, e3);
      } : c2, u2);
    }
    return Object.assign(u2, l2);
  }
  function P(e2) {
    return e2.replace(/^(?!\s*$)/gm, "  ");
  }
  var x = function() {
    return w("any", {});
  }, A = function() {
    return w("function", { type: Function });
  }, E = function() {
    return w("boolean", { type: Boolean });
  }, N = function() {
    return w("string", { type: String });
  }, q = function() {
    return w("number", { type: Number });
  }, S = function() {
    return w("array", { type: Array });
  }, V = function() {
    return w("object", { type: Object });
  }, F = function() {
    return T("integer", { type: Number, validator: function(e2) {
      return h(e2);
    } });
  }, D = function() {
    return T("symbol", { validator: function(e2) {
      return "symbol" == typeof e2;
    } });
  };
  function L(e2, t2) {
    if (void 0 === t2 && (t2 = "custom validation failed"), "function" != typeof e2) throw new TypeError("[VueTypes error]: You must provide a function as argument");
    return T(e2.name || "<<anonymous function>>", { validator: function(n2) {
      var r2 = e2(n2);
      return r2 || y(this._vueTypes_name + " - " + t2), r2;
    } });
  }
  function Y(e2) {
    if (!b(e2)) throw new TypeError("[VueTypes error]: You must provide an array as argument.");
    var t2 = 'oneOf - value should be one of "' + e2.join('", "') + '".', n2 = e2.reduce(function(e3, t3) {
      if (null != t3) {
        var n3 = t3.constructor;
        -1 === e3.indexOf(n3) && e3.push(n3);
      }
      return e3;
    }, []);
    return T("oneOf", { type: n2.length > 0 ? n2 : void 0, validator: function(n3) {
      var r2 = -1 !== e2.indexOf(n3);
      return r2 || y(t2), r2;
    } });
  }
  function B(e2) {
    if (!b(e2)) throw new TypeError("[VueTypes error]: You must provide an array as argument");
    for (var t2 = false, n2 = [], r2 = 0; r2 < e2.length; r2 += 1) {
      var i2 = e2[r2];
      if (m(i2)) {
        if (g(i2) && "oneOf" === i2._vueTypes_name) {
          n2 = n2.concat(i2.type);
          continue;
        }
        if (O(i2.validator) && (t2 = true), true !== i2.type && i2.type) {
          n2 = n2.concat(i2.type);
          continue;
        }
      }
      n2.push(i2);
    }
    return n2 = n2.filter(function(e3, t3) {
      return n2.indexOf(e3) === t3;
    }), T("oneOfType", t2 ? { type: n2, validator: function(t3) {
      var n3 = [], r3 = e2.some(function(e3) {
        var r4 = _(g(e3) && "oneOf" === e3._vueTypes_name ? e3.type || null : e3, t3);
        return "string" == typeof r4 && n3.push(r4), true === r4;
      });
      return r3 || y("oneOfType - provided value does not match any of the " + n3.length + " passed-in validators:\n" + P(n3.join("\n"))), r3;
    } } : { type: n2 });
  }
  function I(e2) {
    return T("arrayOf", { type: Array, validator: function(t2) {
      var n2, r2 = t2.every(function(t3) {
        return true === (n2 = _(e2, t3));
      });
      return r2 || y("arrayOf - value validation error:\n" + P(n2)), r2;
    } });
  }
  function J(e2) {
    return T("instanceOf", { type: e2 });
  }
  function M(e2) {
    return T("objectOf", { type: Object, validator: function(t2) {
      var n2, r2 = Object.keys(t2).every(function(r3) {
        return true === (n2 = _(e2, t2[r3]));
      });
      return r2 || y("objectOf - value validation error:\n" + P(n2)), r2;
    } });
  }
  function R(e2) {
    var t2 = Object.keys(e2), n2 = t2.filter(function(t3) {
      var n3;
      return !!(null === (n3 = e2[t3]) || void 0 === n3 ? void 0 : n3.required);
    }), r2 = T("shape", { type: Object, validator: function(r3) {
      var i2 = this;
      if (!s(r3)) return false;
      var o2 = Object.keys(r3);
      if (n2.length > 0 && n2.some(function(e3) {
        return -1 === o2.indexOf(e3);
      })) {
        var u2 = n2.filter(function(e3) {
          return -1 === o2.indexOf(e3);
        });
        return y(1 === u2.length ? 'shape - required property "' + u2[0] + '" is not defined.' : 'shape - required properties "' + u2.join('", "') + '" are not defined.'), false;
      }
      return o2.every(function(n3) {
        if (-1 === t2.indexOf(n3)) return true === i2._vueTypes_isLoose || (y('shape - shape definition does not include a "' + n3 + '" property. Allowed keys: "' + t2.join('", "') + '".'), false);
        var o3 = _(e2[n3], r3[n3]);
        return "string" == typeof o3 && y('shape - "' + n3 + '" property validation error:\n ' + P(o3)), true === o3;
      });
    } });
    return Object.defineProperty(r2, "_vueTypes_isLoose", { writable: true, value: false }), Object.defineProperty(r2, "loose", { get: function() {
      return this._vueTypes_isLoose = true, this;
    } }), r2;
  }
  var $ = function() {
    function e2() {
    }
    return e2.extend = function(e3) {
      var t2 = this;
      if (b(e3)) return e3.forEach(function(e4) {
        return t2.extend(e4);
      }), this;
      var n2 = e3.name, r2 = e3.validate, o2 = void 0 !== r2 && r2, u2 = e3.getter, a2 = void 0 !== u2 && u2, f2 = i(e3, ["name", "validate", "getter"]);
      if (d(this, n2)) throw new TypeError('[VueTypes error]: Type "' + n2 + '" already defined');
      var c2, l2 = f2.type;
      return g(l2) ? (delete f2.type, Object.defineProperty(this, n2, a2 ? { get: function() {
        return k(n2, l2, f2);
      } } : { value: function() {
        var e4, t3 = k(n2, l2, f2);
        return t3.validator && (t3.validator = (e4 = t3.validator).bind.apply(e4, [t3].concat([].slice.call(arguments)))), t3;
      } })) : (c2 = a2 ? { get: function() {
        var e4 = Object.assign({}, f2);
        return o2 ? w(n2, e4) : T(n2, e4);
      }, enumerable: true } : { value: function() {
        var e4, t3, r3 = Object.assign({}, f2);
        return e4 = o2 ? w(n2, r3) : T(n2, r3), r3.validator && (e4.validator = (t3 = r3.validator).bind.apply(t3, [e4].concat([].slice.call(arguments)))), e4;
      }, enumerable: true }, Object.defineProperty(this, n2, c2));
    }, t(e2, null, [{ key: "any", get: function() {
      return x();
    } }, { key: "func", get: function() {
      return A().def(this.defaults.func);
    } }, { key: "bool", get: function() {
      return E().def(this.defaults.bool);
    } }, { key: "string", get: function() {
      return N().def(this.defaults.string);
    } }, { key: "number", get: function() {
      return q().def(this.defaults.number);
    } }, { key: "array", get: function() {
      return S().def(this.defaults.array);
    } }, { key: "object", get: function() {
      return V().def(this.defaults.object);
    } }, { key: "integer", get: function() {
      return F().def(this.defaults.integer);
    } }, { key: "symbol", get: function() {
      return D();
    } }]), e2;
  }();
  function z(e2) {
    var i2;
    return void 0 === e2 && (e2 = { func: function() {
    }, bool: true, string: "", number: 0, array: function() {
      return [];
    }, object: function() {
      return {};
    }, integer: 0 }), (i2 = function(i3) {
      function o2() {
        return i3.apply(this, arguments) || this;
      }
      return r(o2, i3), t(o2, null, [{ key: "sensibleDefaults", get: function() {
        return n({}, this.defaults);
      }, set: function(t2) {
        this.defaults = false !== t2 ? n({}, true !== t2 ? t2 : e2) : {};
      } }]), o2;
    }($)).defaults = n({}, e2), i2;
  }
  $.defaults = {}, $.custom = L, $.oneOf = Y, $.instanceOf = J, $.oneOfType = B, $.arrayOf = I, $.objectOf = M, $.shape = R, $.utils = { validate: function(e2, t2) {
    return true === _(t2, e2);
  }, toType: function(e2, t2, n2) {
    return void 0 === n2 && (n2 = false), n2 ? w(e2, t2) : T(e2, t2);
  } };
  (function(e2) {
    function t2() {
      return e2.apply(this, arguments) || this;
    }
    return r(t2, e2), t2;
  })(z());
  const PropTypes = z({
    func: void 0,
    bool: void 0,
    string: void 0,
    number: void 0,
    array: void 0,
    object: void 0,
    integer: void 0
  });
  PropTypes.extend([{
    name: "looseBool",
    getter: true,
    type: Boolean,
    default: void 0
  }, {
    name: "style",
    getter: true,
    type: [String, Object],
    default: void 0
  }, {
    name: "VueNode",
    getter: true,
    type: null
  }]);
  const devWarning = (valid, component, message) => {
    warningOnce(valid, `[ant-design-vue: ${component}] ${message}`);
  };
  function getMotion$1(_ref) {
    let {
      prefixCls,
      animation,
      transitionName: transitionName2
    } = _ref;
    if (animation) {
      return {
        name: `${prefixCls}-${animation}`
      };
    }
    if (transitionName2) {
      return {
        name: transitionName2
      };
    }
    return {};
  }
  function triggerVNodeUpdate(vm, attrs, dom) {
    render(cloneVNode(vm, _extends({}, attrs)), dom);
  }
  const isVisible = (element) => {
    if (!element) {
      return false;
    }
    if (element.offsetParent) {
      return true;
    }
    if (element.getBBox) {
      const box2 = element.getBBox();
      if (box2.width || box2.height) {
        return true;
      }
    }
    if (element.getBoundingClientRect) {
      const box2 = element.getBoundingClientRect();
      if (box2.width || box2.height) {
        return true;
      }
    }
    return false;
  };
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var Symbol$1 = root.Symbol;
  var objectProto$6 = Object.prototype;
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$6.toString;
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$4.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e2) {
    }
    var result2 = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result2;
  }
  var objectProto$5 = Object.prototype;
  var nativeObjectToString = objectProto$5.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid2 = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid2 ? "Symbol(src)_1." + uid2 : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var funcProto$1 = Function.prototype;
  var funcToString$1 = funcProto$1.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e2) {
      }
      try {
        return func + "";
      } catch (e2) {
      }
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto$4 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty$3).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getValue(object, key2) {
    return object == null ? void 0 : object[key2];
  }
  function getNative(object, key2) {
    var value = getValue(object, key2);
    return baseIsNative(value) ? value : void 0;
  }
  var Map$1 = getNative(root, "Map");
  var isArray = Array.isArray;
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var argsTag$1 = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$1;
  }
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
  var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
  var isArguments = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  function stubFalse() {
    return false;
  }
  var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var Buffer$1 = moduleExports$1 ? root.Buffer : void 0;
  var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse;
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag$2 = "[object Set]", stringTag = "[object String]", weakMapTag$1 = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag$2] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag$1] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal.process;
  var nodeUtil = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e2) {
    }
  }();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  var objectProto$2 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$2;
    return value === proto;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var nativeKeys = overArg(Object.keys, Object);
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result2 = [];
    for (var key2 in Object(object)) {
      if (hasOwnProperty$1.call(object, key2) && key2 != "constructor") {
        result2.push(key2);
      }
    }
    return result2;
  }
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  var DataView = getNative(root, "DataView");
  var Promise$1 = getNative(root, "Promise");
  var Set$1 = getNative(root, "Set");
  var WeakMap$1 = getNative(root, "WeakMap");
  var mapTag$1 = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag(new Map$1()) != mapTag$1 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
    getTag = function(value) {
      var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag$1;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag$1;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result2;
    };
  }
  tuple("bottomLeft", "bottomRight", "topLeft", "topRight");
  const getTransitionProps = function(transitionName2) {
    let opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const transitionProps = transitionName2 ? _extends({
      name: transitionName2,
      appear: true,
      // type: 'animation',
      // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
      // appearActiveClass: `antdv-base-transtion`,
      // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
      enterFromClass: `${transitionName2}-enter ${transitionName2}-enter-prepare ${transitionName2}-enter-start`,
      enterActiveClass: `${transitionName2}-enter ${transitionName2}-enter-prepare`,
      enterToClass: `${transitionName2}-enter ${transitionName2}-enter-active`,
      leaveFromClass: ` ${transitionName2}-leave`,
      leaveActiveClass: `${transitionName2}-leave ${transitionName2}-leave-active`,
      leaveToClass: `${transitionName2}-leave ${transitionName2}-leave-active`
    }, opt) : _extends({
      css: false
    }, opt);
    return transitionProps;
  };
  const getTransitionGroupProps = function(transitionName2) {
    let opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const transitionProps = transitionName2 ? _extends({
      name: transitionName2,
      appear: true,
      // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
      appearActiveClass: `${transitionName2}`,
      appearToClass: `${transitionName2}-appear ${transitionName2}-appear-active`,
      enterFromClass: `${transitionName2}-appear ${transitionName2}-enter ${transitionName2}-appear-prepare ${transitionName2}-enter-prepare`,
      enterActiveClass: `${transitionName2}`,
      enterToClass: `${transitionName2}-enter ${transitionName2}-appear ${transitionName2}-appear-active ${transitionName2}-enter-active`,
      leaveActiveClass: `${transitionName2} ${transitionName2}-leave`,
      leaveToClass: `${transitionName2}-leave-active`
    }, opt) : _extends({
      css: false
    }, opt);
    return transitionProps;
  };
  const getTransitionName = (rootPrefixCls, motion, transitionName2) => {
    if (transitionName2 !== void 0) {
      return transitionName2;
    }
    return `${rootPrefixCls}-${motion}`;
  };
  const PortalContextKey = Symbol("PortalContextKey");
  const useProvidePortal = function(instance) {
    let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      inTriggerContext: true
    };
    provide(PortalContextKey, {
      inTriggerContext: config.inTriggerContext,
      shouldRender: computed(() => {
        const {
          sPopupVisible,
          popupRef,
          forceRender,
          autoDestroy
        } = instance || {};
        let shouldRender = false;
        if (sPopupVisible || popupRef || forceRender) {
          shouldRender = true;
        }
        if (!sPopupVisible && autoDestroy) {
          shouldRender = false;
        }
        return shouldRender;
      })
    });
  };
  const useInjectPortal = () => {
    useProvidePortal({}, {
      inTriggerContext: false
    });
    const portalContext = inject(PortalContextKey, {
      shouldRender: computed(() => false),
      inTriggerContext: false
    });
    return {
      shouldRender: computed(() => portalContext.shouldRender.value || portalContext.inTriggerContext === false)
    };
  };
  const Portal$1 = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "Portal",
    inheritAttrs: false,
    props: {
      getContainer: PropTypes.func.isRequired,
      didUpdate: Function
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      let isSSR = true;
      let container;
      const {
        shouldRender
      } = useInjectPortal();
      function setContainer() {
        if (shouldRender.value) {
          container = props.getContainer();
        }
      }
      onBeforeMount(() => {
        isSSR = false;
        setContainer();
      });
      onMounted(() => {
        if (container) return;
        setContainer();
      });
      const stopWatch = watch(shouldRender, () => {
        if (shouldRender.value && !container) {
          container = props.getContainer();
        }
        if (container) {
          stopWatch();
        }
      });
      onUpdated(() => {
        nextTick(() => {
          var _a;
          if (shouldRender.value) {
            (_a = props.didUpdate) === null || _a === void 0 ? void 0 : _a.call(props, props);
          }
        });
      });
      return () => {
        var _a;
        if (!shouldRender.value) return null;
        if (isSSR) {
          return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
        }
        return container ? createVNode(Teleport, {
          "to": container
        }, slots) : null;
      };
    }
  });
  let cached;
  function getScrollBarSize(fresh) {
    if (typeof document === "undefined") {
      return 0;
    }
    if (cached === void 0) {
      const inner = document.createElement("div");
      inner.style.width = "100%";
      inner.style.height = "200px";
      const outer = document.createElement("div");
      const outerStyle = outer.style;
      outerStyle.position = "absolute";
      outerStyle.top = "0";
      outerStyle.left = "0";
      outerStyle.pointerEvents = "none";
      outerStyle.visibility = "hidden";
      outerStyle.width = "200px";
      outerStyle.height = "150px";
      outerStyle.overflow = "hidden";
      outer.appendChild(inner);
      document.body.appendChild(outer);
      const widthContained = inner.offsetWidth;
      outer.style.overflow = "scroll";
      let widthScroll = inner.offsetWidth;
      if (widthContained === widthScroll) {
        widthScroll = outer.clientWidth;
      }
      document.body.removeChild(outer);
      cached = widthContained - widthScroll;
    }
    return cached;
  }
  const UNIQUE_ID = `vc-util-locker-${Date.now()}`;
  let uuid$2 = 0;
  function isBodyOverflowing() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
  }
  function useScrollLocker(lock) {
    const mergedLock = computed(() => !!lock && !!lock.value);
    uuid$2 += 1;
    const id = `${UNIQUE_ID}_${uuid$2}`;
    watchEffect((onClear) => {
      if (!canUseDom$1()) {
        return;
      }
      if (mergedLock.value) {
        const scrollbarSize = getScrollBarSize();
        const isOverflow = isBodyOverflowing();
        updateCSS$1(`
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ""}
}`, id);
      } else {
        removeCSS(id);
      }
      onClear(() => {
        removeCSS(id);
      });
    }, {
      flush: "post"
    });
  }
  let openCount = 0;
  const supportDom = canUseDom$1();
  const getParent = (getContainer2) => {
    if (!supportDom) {
      return null;
    }
    if (getContainer2) {
      if (typeof getContainer2 === "string") {
        return document.querySelectorAll(getContainer2)[0];
      }
      if (typeof getContainer2 === "function") {
        return getContainer2();
      }
      if (typeof getContainer2 === "object" && getContainer2 instanceof window.HTMLElement) {
        return getContainer2;
      }
    }
    return document.body;
  };
  const Portal = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "PortalWrapper",
    inheritAttrs: false,
    props: {
      wrapperClassName: String,
      forceRender: {
        type: Boolean,
        default: void 0
      },
      getContainer: PropTypes.any,
      visible: {
        type: Boolean,
        default: void 0
      },
      autoLock: booleanType(),
      didUpdate: Function
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const container = /* @__PURE__ */ shallowRef();
      const componentRef = /* @__PURE__ */ shallowRef();
      const rafId = /* @__PURE__ */ shallowRef();
      const triggerUpdate = /* @__PURE__ */ shallowRef(1);
      const defaultContainer = canUseDom$1() && document.createElement("div");
      const removeCurrentContainer = () => {
        var _a, _b;
        if (container.value === defaultContainer) {
          (_b = (_a = container.value) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(container.value);
        }
        container.value = null;
      };
      let parent = null;
      const attachToParent = function() {
        let force = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        if (force || container.value && !container.value.parentNode) {
          parent = getParent(props.getContainer);
          if (parent) {
            parent.appendChild(container.value);
            return true;
          }
          return false;
        }
        return true;
      };
      const getContainer2 = () => {
        if (!supportDom) {
          return null;
        }
        if (!container.value) {
          container.value = defaultContainer;
          attachToParent(true);
        }
        setWrapperClassName();
        return container.value;
      };
      const setWrapperClassName = () => {
        const {
          wrapperClassName
        } = props;
        if (container.value && wrapperClassName && wrapperClassName !== container.value.className) {
          container.value.className = wrapperClassName;
        }
      };
      onUpdated(() => {
        setWrapperClassName();
        attachToParent();
      });
      useScrollLocker(computed(() => {
        return props.autoLock && props.visible && canUseDom$1() && (container.value === document.body || container.value === defaultContainer);
      }));
      onMounted(() => {
        let init = false;
        watch([() => props.visible, () => props.getContainer], (_ref2, _ref3) => {
          let [visible, getContainer22] = _ref2;
          let [prevVisible, prevGetContainer] = _ref3;
          if (supportDom) {
            parent = getParent(props.getContainer);
            if (parent === document.body) {
              if (visible && !prevVisible) {
                openCount += 1;
              } else if (init) {
                openCount -= 1;
              }
            }
          }
          if (init) {
            const getContainerIsFunc = typeof getContainer22 === "function" && typeof prevGetContainer === "function";
            if (getContainerIsFunc ? getContainer22.toString() !== prevGetContainer.toString() : getContainer22 !== prevGetContainer) {
              removeCurrentContainer();
            }
          }
          init = true;
        }, {
          immediate: true,
          flush: "post"
        });
        nextTick(() => {
          if (!attachToParent()) {
            rafId.value = wrapperRaf(() => {
              triggerUpdate.value += 1;
            });
          }
        });
      });
      onBeforeUnmount(() => {
        const {
          visible
        } = props;
        if (supportDom && parent === document.body) {
          openCount = visible && openCount ? openCount - 1 : openCount;
        }
        removeCurrentContainer();
        wrapperRaf.cancel(rafId.value);
      });
      return () => {
        const {
          forceRender,
          visible
        } = props;
        let portal = null;
        const childProps = {
          getOpenCount: () => openCount,
          getContainer: getContainer2
        };
        if (triggerUpdate.value && (forceRender || visible || componentRef.value)) {
          portal = createVNode(Portal$1, {
            "getContainer": getContainer2,
            "ref": componentRef,
            "didUpdate": props.didUpdate
          }, {
            default: () => {
              var _a;
              return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, childProps);
            }
          });
        }
        return portal;
      };
    }
  });
  const KeyCode = {
    /**
     * TAB
     */
    TAB: 9,
    /**
     * ESC
     */
    ESC: 27
  };
  const attributes = `accept acceptcharset accesskey action allowfullscreen allowtransparency
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
summary tabindex target title type usemap value width wmode wrap`;
  const eventsName = `onCopy onCut onPaste onCompositionend onCompositionstart onCompositionupdate onKeydown
    onKeypress onKeyup onFocus onBlur onChange onInput onSubmit onClick onContextmenu onDoubleclick onDblclick
    onDrag onDragend onDragenter onDragexit onDragleave onDragover onDragstart onDrop onMousedown
    onMouseenter onMouseleave onMousemove onMouseout onMouseover onMouseup onSelect onTouchcancel
    onTouchend onTouchmove onTouchstart onTouchstartPassive onTouchmovePassive onScroll onWheel onAbort onCanplay onCanplaythrough
    onDurationchange onEmptied onEncrypted onEnded onError onLoadeddata onLoadedmetadata
    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError`;
  const propList = `${attributes} ${eventsName}`.split(/[\s\n]+/);
  const ariaPrefix = "aria-";
  const dataPrefix = "data-";
  function match(key2, prefix) {
    return key2.indexOf(prefix) === 0;
  }
  function pickAttrs(props) {
    let ariaOnly = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let mergedConfig;
    if (ariaOnly === false) {
      mergedConfig = {
        aria: true,
        data: true,
        attr: true
      };
    } else if (ariaOnly === true) {
      mergedConfig = {
        aria: true
      };
    } else {
      mergedConfig = _extends({}, ariaOnly);
    }
    const attrs = {};
    Object.keys(props).forEach((key2) => {
      if (
        // Aria
        mergedConfig.aria && (key2 === "role" || match(key2, ariaPrefix)) || // Data
        mergedConfig.data && match(key2, dataPrefix) || // Attr
        mergedConfig.attr && (propList.includes(key2) || propList.includes(key2.toLowerCase()))
      ) {
        attrs[key2] = props[key2];
      }
    });
    return attrs;
  }
  function useState(defaultStateValue) {
    const initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
    const innerValue = /* @__PURE__ */ ref(initValue);
    function triggerChange(newValue) {
      innerValue.value = newValue;
    }
    return [innerValue, triggerChange];
  }
  var contextKey = Symbol("iconContext");
  var useInjectIconContext = function useInjectIconContext2() {
    return inject(contextKey, {
      prefixCls: /* @__PURE__ */ ref("anticon"),
      rootClassName: /* @__PURE__ */ ref(""),
      csp: /* @__PURE__ */ ref()
    });
  };
  function canUseDom() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  }
  function contains(root2, n2) {
    if (!root2) {
      return false;
    }
    if (root2.contains) {
      return root2.contains(n2);
    }
    return false;
  }
  var APPEND_ORDER = "data-vc-order";
  var MARK_KEY = "vc-icon-key";
  var containerCache = /* @__PURE__ */ new Map();
  function getMark() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
    if (mark) {
      return mark.startsWith("data-") ? mark : "data-".concat(mark);
    }
    return MARK_KEY;
  }
  function getContainer$1(option) {
    if (option.attachTo) {
      return option.attachTo;
    }
    var head = document.querySelector("head");
    return head || document.body;
  }
  function getOrder(prepend) {
    if (prepend === "queue") {
      return "prependQueue";
    }
    return prepend ? "prepend" : "append";
  }
  function findStyles(container) {
    return Array.from((containerCache.get(container) || container).children).filter(function(node2) {
      return node2.tagName === "STYLE";
    });
  }
  function injectCSS(css) {
    var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!canUseDom()) {
      return null;
    }
    var csp = option.csp, prepend = option.prepend;
    var styleNode = document.createElement("style");
    styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
    if (csp && csp.nonce) {
      styleNode.nonce = csp.nonce;
    }
    styleNode.innerHTML = css;
    var container = getContainer$1(option);
    var firstChild = container.firstChild;
    if (prepend) {
      if (prepend === "queue") {
        var existStyle = findStyles(container).filter(function(node2) {
          return ["prepend", "prependQueue"].includes(node2.getAttribute(APPEND_ORDER));
        });
        if (existStyle.length) {
          container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
          return styleNode;
        }
      }
      container.insertBefore(styleNode, firstChild);
    } else {
      container.appendChild(styleNode);
    }
    return styleNode;
  }
  function findExistNode(key2) {
    var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var container = getContainer$1(option);
    return findStyles(container).find(function(node2) {
      return node2.getAttribute(getMark(option)) === key2;
    });
  }
  function syncRealContainer(container, option) {
    var cachedRealContainer = containerCache.get(container);
    if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
      var placeholderStyle = injectCSS("", option);
      var parentNode = placeholderStyle.parentNode;
      containerCache.set(container, parentNode);
      container.removeChild(placeholderStyle);
    }
  }
  function updateCSS(css, key2) {
    var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var container = getContainer$1(option);
    syncRealContainer(container, option);
    var existNode = findExistNode(key2, option);
    if (existNode) {
      if (option.csp && option.csp.nonce && existNode.nonce !== option.csp.nonce) {
        existNode.nonce = option.csp.nonce;
      }
      if (existNode.innerHTML !== css) {
        existNode.innerHTML = css;
      }
      return existNode;
    }
    var newNode = injectCSS(css, option);
    newNode.setAttribute(getMark(option), key2);
    return newNode;
  }
  function _objectSpread$c(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$c(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$c(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function warn(valid, message) {
    if (!valid && console !== void 0) {
      console.error("Warning: ".concat(message));
    }
  }
  function warning(valid, message) {
    warn(valid, "[@ant-design/icons-vue] ".concat(message));
  }
  function isIconDefinition(target) {
    return typeof target === "object" && typeof target.name === "string" && typeof target.theme === "string" && (typeof target.icon === "object" || typeof target.icon === "function");
  }
  function generate(node2, key2, rootProps) {
    if (!rootProps) {
      return h$1(node2.tag, _objectSpread$c({
        key: key2
      }, node2.attrs), (node2.children || []).map(function(child, index) {
        return generate(child, "".concat(key2, "-").concat(node2.tag, "-").concat(index));
      }));
    }
    return h$1(node2.tag, _objectSpread$c({
      key: key2
    }, rootProps, node2.attrs), (node2.children || []).map(function(child, index) {
      return generate(child, "".concat(key2, "-").concat(node2.tag, "-").concat(index));
    }));
  }
  function getSecondaryColor(primaryColor) {
    return generate$2(primaryColor)[0];
  }
  function normalizeTwoToneColors(twoToneColor) {
    if (!twoToneColor) {
      return [];
    }
    return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
  }
  var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
  function getRoot(ele) {
    return ele && ele.getRootNode && ele.getRootNode();
  }
  function inShadow(ele) {
    if (!canUseDom()) {
      return false;
    }
    return getRoot(ele) instanceof ShadowRoot;
  }
  function getShadowRoot(ele) {
    return inShadow(ele) ? getRoot(ele) : null;
  }
  var useInsertStyles = function useInsertStyles2() {
    var _useInjectIconContext = useInjectIconContext(), prefixCls = _useInjectIconContext.prefixCls, csp = _useInjectIconContext.csp;
    var instance = getCurrentInstance();
    var mergedStyleStr = iconStyles;
    if (prefixCls) {
      mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls.value);
    }
    nextTick(function() {
      if (!canUseDom()) {
        return;
      }
      var ele = instance.vnode.el;
      var shadowRoot = getShadowRoot(ele);
      updateCSS(mergedStyleStr, "@ant-design-vue-icons", {
        prepend: true,
        csp: csp.value,
        attachTo: shadowRoot
      });
    });
  };
  var _excluded$1 = ["icon", "primaryColor", "secondaryColor"];
  function _objectWithoutProperties$1(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$1(source, excluded);
    var key2, i2;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
        key2 = sourceSymbolKeys[i2];
        if (excluded.indexOf(key2) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key2)) continue;
        target[key2] = source[key2];
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key2, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key2 = sourceKeys[i2];
      if (excluded.indexOf(key2) >= 0) continue;
      target[key2] = source[key2];
    }
    return target;
  }
  function _objectSpread$b(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$b(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$b(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var twoToneColorPalette = /* @__PURE__ */ reactive({
    primaryColor: "#333",
    secondaryColor: "#E6E6E6",
    calculated: false
  });
  function setTwoToneColors(_ref) {
    var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
    twoToneColorPalette.primaryColor = primaryColor;
    twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
    twoToneColorPalette.calculated = !!secondaryColor;
  }
  function getTwoToneColors() {
    return _objectSpread$b({}, twoToneColorPalette);
  }
  var IconBase = function IconBase2(props, context) {
    var _props$context$attrs = _objectSpread$b({}, props, context.attrs), icon = _props$context$attrs.icon, primaryColor = _props$context$attrs.primaryColor, secondaryColor = _props$context$attrs.secondaryColor, restProps = _objectWithoutProperties$1(_props$context$attrs, _excluded$1);
    var colors = twoToneColorPalette;
    if (primaryColor) {
      colors = {
        primaryColor,
        secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
      };
    }
    warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));
    if (!isIconDefinition(icon)) {
      return null;
    }
    var target = icon;
    if (target && typeof target.icon === "function") {
      target = _objectSpread$b({}, target, {
        icon: target.icon(colors.primaryColor, colors.secondaryColor)
      });
    }
    return generate(target.icon, "svg-".concat(target.name), _objectSpread$b({}, restProps, {
      "data-icon": target.name,
      width: "1em",
      height: "1em",
      fill: "currentColor",
      "aria-hidden": "true"
    }));
  };
  IconBase.props = {
    icon: Object,
    primaryColor: String,
    secondaryColor: String,
    focusable: String
  };
  IconBase.inheritAttrs = false;
  IconBase.displayName = "IconBase";
  IconBase.getTwoToneColors = getTwoToneColors;
  IconBase.setTwoToneColors = setTwoToneColors;
  function _slicedToArray$1(arr, i2) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i2) || _unsupportedIterableToArray$1(arr, i2) || _nonIterableRest$1();
  }
  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$1(o2, minLen) {
    if (!o2) return;
    if (typeof o2 === "string") return _arrayLikeToArray$1(o2, minLen);
    var n2 = Object.prototype.toString.call(o2).slice(8, -1);
    if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
    if (n2 === "Map" || n2 === "Set") return Array.from(o2);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$1(o2, minLen);
  }
  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  function _iterableToArrayLimit$1(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function setTwoToneColor(twoToneColor) {
    var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
    return IconBase.setTwoToneColors({
      primaryColor,
      secondaryColor
    });
  }
  function getTwoToneColor() {
    var colors = IconBase.getTwoToneColors();
    if (!colors.calculated) {
      return colors.primaryColor;
    }
    return [colors.primaryColor, colors.secondaryColor];
  }
  var InsertStyles = /* @__PURE__ */ defineComponent({
    name: "InsertStyles",
    setup: function setup() {
      useInsertStyles();
      return function() {
        return null;
      };
    }
  });
  var _excluded = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];
  function _slicedToArray(arr, i2) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o2, minLen) {
    if (!o2) return;
    if (typeof o2 === "string") return _arrayLikeToArray(o2, minLen);
    var n2 = Object.prototype.toString.call(o2).slice(8, -1);
    if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
    if (n2 === "Map" || n2 === "Set") return Array.from(o2);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray(o2, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _objectSpread$a(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$a(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$a(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key2, i2;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
        key2 = sourceSymbolKeys[i2];
        if (excluded.indexOf(key2) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key2)) continue;
        target[key2] = source[key2];
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key2, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key2 = sourceKeys[i2];
      if (excluded.indexOf(key2) >= 0) continue;
      target[key2] = source[key2];
    }
    return target;
  }
  setTwoToneColor(blue.primary);
  var Icon = function Icon2(props, context) {
    var _classObj;
    var _props$context$attrs = _objectSpread$a({}, props, context.attrs), cls2 = _props$context$attrs["class"], icon = _props$context$attrs.icon, spin = _props$context$attrs.spin, rotate = _props$context$attrs.rotate, tabindex = _props$context$attrs.tabindex, twoToneColor = _props$context$attrs.twoToneColor, onClick = _props$context$attrs.onClick, restProps = _objectWithoutProperties(_props$context$attrs, _excluded);
    var _useInjectIconContext = useInjectIconContext(), prefixCls = _useInjectIconContext.prefixCls, rootClassName = _useInjectIconContext.rootClassName;
    var classObj = (_classObj = {}, _defineProperty$a(_classObj, rootClassName.value, !!rootClassName.value), _defineProperty$a(_classObj, prefixCls.value, true), _defineProperty$a(_classObj, "".concat(prefixCls.value, "-").concat(icon.name), Boolean(icon.name)), _defineProperty$a(_classObj, "".concat(prefixCls.value, "-spin"), !!spin || icon.name === "loading"), _classObj);
    var iconTabIndex = tabindex;
    if (iconTabIndex === void 0 && onClick) {
      iconTabIndex = -1;
    }
    var svgStyle = rotate ? {
      msTransform: "rotate(".concat(rotate, "deg)"),
      transform: "rotate(".concat(rotate, "deg)")
    } : void 0;
    var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
    return createVNode("span", _objectSpread$a({
      "role": "img",
      "aria-label": icon.name
    }, restProps, {
      "onClick": onClick,
      "class": [classObj, cls2],
      "tabindex": iconTabIndex
    }), [createVNode(IconBase, {
      "icon": icon,
      "primaryColor": primaryColor,
      "secondaryColor": secondaryColor,
      "style": svgStyle
    }, null), createVNode(InsertStyles, null, null)]);
  };
  Icon.props = {
    spin: Boolean,
    rotate: Number,
    icon: Object,
    twoToneColor: [String, Array]
  };
  Icon.displayName = "AntdIcon";
  Icon.inheritAttrs = false;
  Icon.getTwoToneColor = getTwoToneColor;
  Icon.setTwoToneColor = setTwoToneColor;
  function _objectSpread$9(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$9(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$9(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var LoadingOutlined = function LoadingOutlined2(props, context) {
    var p2 = _objectSpread$9({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$9({}, p2, {
      "icon": LoadingOutlined$1
    }), null);
  };
  LoadingOutlined.displayName = "LoadingOutlined";
  LoadingOutlined.inheritAttrs = false;
  function _objectSpread$8(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$8(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$8(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var CloseOutlined = function CloseOutlined2(props, context) {
    var p2 = _objectSpread$8({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$8({}, p2, {
      "icon": CloseOutlined$1
    }), null);
  };
  CloseOutlined.displayName = "CloseOutlined";
  CloseOutlined.inheritAttrs = false;
  function _objectSpread$7(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$7(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$7(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var CloseCircleFilled = function CloseCircleFilled2(props, context) {
    var p2 = _objectSpread$7({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$7({}, p2, {
      "icon": CloseCircleFilled$1
    }), null);
  };
  CloseCircleFilled.displayName = "CloseCircleFilled";
  CloseCircleFilled.inheritAttrs = false;
  function createContext(defaultValue) {
    const contextKey2 = Symbol("contextKey");
    const useProvide = (props, newProps) => {
      const mergedProps = /* @__PURE__ */ reactive({});
      provide(contextKey2, mergedProps);
      watchEffect(() => {
        _extends(mergedProps, props, newProps || {});
      });
      return mergedProps;
    };
    const useInject = () => {
      return inject(contextKey2, defaultValue) || {};
    };
    return {
      useProvide,
      useInject
    };
  }
  const genSpaceCompactStyle = (token2) => {
    const {
      componentCls
    } = token2;
    return {
      [componentCls]: {
        display: "inline-flex",
        "&-block": {
          display: "flex",
          width: "100%"
        },
        "&-vertical": {
          flexDirection: "column"
        }
      }
    };
  };
  const genSpaceStyle = (token2) => {
    const {
      componentCls
    } = token2;
    return {
      [componentCls]: {
        display: "inline-flex",
        "&-rtl": {
          direction: "rtl"
        },
        "&-vertical": {
          flexDirection: "column"
        },
        "&-align": {
          flexDirection: "column",
          "&-center": {
            alignItems: "center"
          },
          "&-start": {
            alignItems: "flex-start"
          },
          "&-end": {
            alignItems: "flex-end"
          },
          "&-baseline": {
            alignItems: "baseline"
          }
        },
        [`${componentCls}-item`]: {
          "&:empty": {
            display: "none"
          }
        }
      }
    };
  };
  const useStyle$8 = genComponentStyleHook("Space", (token2) => [genSpaceStyle(token2), genSpaceCompactStyle(token2)]);
  var mapTag = "[object Map]", setTag = "[object Set]";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
      return !value.length;
    }
    var tag = getTag(value);
    if (tag == mapTag || tag == setTag) {
      return !value.size;
    }
    if (isPrototype(value)) {
      return !baseKeys(value).length;
    }
    for (var key2 in value) {
      if (hasOwnProperty.call(value, key2)) {
        return false;
      }
    }
    return true;
  }
  const spaceCompactItemProps = () => ({
    compactSize: String,
    compactDirection: PropTypes.oneOf(tuple("horizontal", "vertical")).def("horizontal"),
    isFirstItem: booleanType(),
    isLastItem: booleanType()
  });
  const SpaceCompactItemContext = createContext(null);
  const useCompactItemContext = (prefixCls, direction) => {
    const compactItemContext = SpaceCompactItemContext.useInject();
    const compactItemClassnames = computed(() => {
      if (!compactItemContext || isEmpty(compactItemContext)) return "";
      const {
        compactDirection,
        isFirstItem,
        isLastItem
      } = compactItemContext;
      const separator = compactDirection === "vertical" ? "-vertical-" : "-";
      return classNames({
        [`${prefixCls.value}-compact${separator}item`]: true,
        [`${prefixCls.value}-compact${separator}first-item`]: isFirstItem,
        [`${prefixCls.value}-compact${separator}last-item`]: isLastItem,
        [`${prefixCls.value}-compact${separator}item-rtl`]: direction.value === "rtl"
      });
    });
    return {
      compactSize: computed(() => compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactSize),
      compactDirection: computed(() => compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactDirection),
      compactItemClassnames
    };
  };
  const spaceCompactProps = () => ({
    prefixCls: String,
    size: {
      type: String
    },
    direction: PropTypes.oneOf(tuple("horizontal", "vertical")).def("horizontal"),
    align: PropTypes.oneOf(tuple("start", "end", "center", "baseline")),
    block: {
      type: Boolean,
      default: void 0
    }
  });
  const CompactItem = /* @__PURE__ */ defineComponent({
    name: "CompactItem",
    props: spaceCompactItemProps(),
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      SpaceCompactItemContext.useProvide(props);
      return () => {
        var _a;
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      };
    }
  });
  const Compact = /* @__PURE__ */ defineComponent({
    name: "ASpaceCompact",
    inheritAttrs: false,
    props: spaceCompactProps(),
    setup(props, _ref3) {
      let {
        attrs,
        slots
      } = _ref3;
      const {
        prefixCls,
        direction: directionConfig
      } = useConfigInject("space-compact", props);
      const compactItemContext = SpaceCompactItemContext.useInject();
      const [wrapSSR, hashId] = useStyle$8(prefixCls);
      const clx = computed(() => {
        return classNames(prefixCls.value, hashId.value, {
          [`${prefixCls.value}-rtl`]: directionConfig.value === "rtl",
          [`${prefixCls.value}-block`]: props.block,
          [`${prefixCls.value}-vertical`]: props.direction === "vertical"
        });
      });
      return () => {
        var _a;
        const childNodes = flattenChildren(((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) || []);
        if (childNodes.length === 0) {
          return null;
        }
        return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
          "class": [clx.value, attrs.class]
        }), [childNodes.map((child, i2) => {
          var _a2;
          const key2 = child && child.key || `${prefixCls.value}-item-${i2}`;
          const noCompactItemContext = !compactItemContext || isEmpty(compactItemContext);
          return createVNode(CompactItem, {
            "key": key2,
            "compactSize": (_a2 = props.size) !== null && _a2 !== void 0 ? _a2 : "middle",
            "compactDirection": props.direction,
            "isFirstItem": i2 === 0 && (noCompactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isFirstItem)),
            "isLastItem": i2 === childNodes.length - 1 && (noCompactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isLastItem))
          }, {
            default: () => [child]
          });
        })]));
      };
    }
  });
  const initMotionCommon = (duration) => ({
    animationDuration: duration,
    animationFillMode: "both"
  });
  const initMotionCommonLeave = (duration) => ({
    animationDuration: duration,
    animationFillMode: "both"
  });
  const initMotion = function(motionCls, inKeyframes, outKeyframes, duration) {
    let sameLevel = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
    const sameLevelPrefix = sameLevel ? "&" : "";
    return {
      [`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: _extends(_extends({}, initMotionCommon(duration)), {
        animationPlayState: "paused"
      }),
      [`${sameLevelPrefix}${motionCls}-leave`]: _extends(_extends({}, initMotionCommonLeave(duration)), {
        animationPlayState: "paused"
      }),
      [`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
        animationName: inKeyframes,
        animationPlayState: "running"
      },
      [`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
        animationName: outKeyframes,
        animationPlayState: "running",
        pointerEvents: "none"
      }
    };
  };
  const fadeIn = new Keyframe("antFadeIn", {
    "0%": {
      opacity: 0
    },
    "100%": {
      opacity: 1
    }
  });
  const fadeOut = new Keyframe("antFadeOut", {
    "0%": {
      opacity: 1
    },
    "100%": {
      opacity: 0
    }
  });
  const initFadeMotion = function(token2) {
    let sameLevel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const {
      antCls
    } = token2;
    const motionCls = `${antCls}-fade`;
    const sameLevelPrefix = sameLevel ? "&" : "";
    return [initMotion(motionCls, fadeIn, fadeOut, token2.motionDurationMid, sameLevel), {
      [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: "linear"
      },
      [`${sameLevelPrefix}${motionCls}-leave`]: {
        animationTimingFunction: "linear"
      }
    }];
  };
  const zoomIn = new Keyframe("antZoomIn", {
    "0%": {
      transform: "scale(0.2)",
      opacity: 0
    },
    "100%": {
      transform: "scale(1)",
      opacity: 1
    }
  });
  const zoomOut = new Keyframe("antZoomOut", {
    "0%": {
      transform: "scale(1)"
    },
    "100%": {
      transform: "scale(0.2)",
      opacity: 0
    }
  });
  const zoomBigIn = new Keyframe("antZoomBigIn", {
    "0%": {
      transform: "scale(0.8)",
      opacity: 0
    },
    "100%": {
      transform: "scale(1)",
      opacity: 1
    }
  });
  const zoomBigOut = new Keyframe("antZoomBigOut", {
    "0%": {
      transform: "scale(1)"
    },
    "100%": {
      transform: "scale(0.8)",
      opacity: 0
    }
  });
  const zoomUpIn = new Keyframe("antZoomUpIn", {
    "0%": {
      transform: "scale(0.8)",
      transformOrigin: "50% 0%",
      opacity: 0
    },
    "100%": {
      transform: "scale(1)",
      transformOrigin: "50% 0%"
    }
  });
  const zoomUpOut = new Keyframe("antZoomUpOut", {
    "0%": {
      transform: "scale(1)",
      transformOrigin: "50% 0%"
    },
    "100%": {
      transform: "scale(0.8)",
      transformOrigin: "50% 0%",
      opacity: 0
    }
  });
  const zoomLeftIn = new Keyframe("antZoomLeftIn", {
    "0%": {
      transform: "scale(0.8)",
      transformOrigin: "0% 50%",
      opacity: 0
    },
    "100%": {
      transform: "scale(1)",
      transformOrigin: "0% 50%"
    }
  });
  const zoomLeftOut = new Keyframe("antZoomLeftOut", {
    "0%": {
      transform: "scale(1)",
      transformOrigin: "0% 50%"
    },
    "100%": {
      transform: "scale(0.8)",
      transformOrigin: "0% 50%",
      opacity: 0
    }
  });
  const zoomRightIn = new Keyframe("antZoomRightIn", {
    "0%": {
      transform: "scale(0.8)",
      transformOrigin: "100% 50%",
      opacity: 0
    },
    "100%": {
      transform: "scale(1)",
      transformOrigin: "100% 50%"
    }
  });
  const zoomRightOut = new Keyframe("antZoomRightOut", {
    "0%": {
      transform: "scale(1)",
      transformOrigin: "100% 50%"
    },
    "100%": {
      transform: "scale(0.8)",
      transformOrigin: "100% 50%",
      opacity: 0
    }
  });
  const zoomDownIn = new Keyframe("antZoomDownIn", {
    "0%": {
      transform: "scale(0.8)",
      transformOrigin: "50% 100%",
      opacity: 0
    },
    "100%": {
      transform: "scale(1)",
      transformOrigin: "50% 100%"
    }
  });
  const zoomDownOut = new Keyframe("antZoomDownOut", {
    "0%": {
      transform: "scale(1)",
      transformOrigin: "50% 100%"
    },
    "100%": {
      transform: "scale(0.8)",
      transformOrigin: "50% 100%",
      opacity: 0
    }
  });
  const zoomMotion = {
    zoom: {
      inKeyframes: zoomIn,
      outKeyframes: zoomOut
    },
    "zoom-big": {
      inKeyframes: zoomBigIn,
      outKeyframes: zoomBigOut
    },
    "zoom-big-fast": {
      inKeyframes: zoomBigIn,
      outKeyframes: zoomBigOut
    },
    "zoom-left": {
      inKeyframes: zoomLeftIn,
      outKeyframes: zoomLeftOut
    },
    "zoom-right": {
      inKeyframes: zoomRightIn,
      outKeyframes: zoomRightOut
    },
    "zoom-up": {
      inKeyframes: zoomUpIn,
      outKeyframes: zoomUpOut
    },
    "zoom-down": {
      inKeyframes: zoomDownIn,
      outKeyframes: zoomDownOut
    }
  };
  const initZoomMotion = (token2, motionName) => {
    const {
      antCls
    } = token2;
    const motionCls = `${antCls}-${motionName}`;
    const {
      inKeyframes,
      outKeyframes
    } = zoomMotion[motionName];
    return [initMotion(motionCls, inKeyframes, outKeyframes, token2.motionDurationMid), {
      [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
        transform: "scale(0)",
        opacity: 0,
        animationTimingFunction: token2.motionEaseOutCirc,
        "&-prepare": {
          transform: "none"
        }
      },
      [`${motionCls}-leave`]: {
        animationTimingFunction: token2.motionEaseInOutCirc
      }
    }];
  };
  function compactItemBorder(token2, parentCls, options) {
    const {
      focusElCls,
      focus,
      borderElCls
    } = options;
    const childCombinator = borderElCls ? "> *" : "";
    const hoverEffects = ["hover", focus ? "focus" : null, "active"].filter(Boolean).map((n2) => `&:${n2} ${childCombinator}`).join(",");
    return {
      [`&-item:not(${parentCls}-last-item)`]: {
        marginInlineEnd: -token2.lineWidth
      },
      "&-item": _extends(_extends({
        [hoverEffects]: {
          zIndex: 2
        }
      }, focusElCls ? {
        [`&${focusElCls}`]: {
          zIndex: 2
        }
      } : {}), {
        [`&[disabled] ${childCombinator}`]: {
          zIndex: 0
        }
      })
    };
  }
  function compactItemBorderRadius(prefixCls, parentCls, options) {
    const {
      borderElCls
    } = options;
    const childCombinator = borderElCls ? `> ${borderElCls}` : "";
    return {
      [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: {
        borderRadius: 0
      },
      [`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: {
        [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
          borderStartEndRadius: 0,
          borderEndEndRadius: 0
        }
      },
      [`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: {
        [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0
        }
      }
    };
  }
  function genCompactItemStyle(token2) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      focus: true
    };
    const {
      componentCls
    } = token2;
    const compactCls = `${componentCls}-compact`;
    return {
      [compactCls]: _extends(_extends({}, compactItemBorder(token2, compactCls, options)), compactItemBorderRadius(componentCls, compactCls, options))
    };
  }
  function _objectSpread$6(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$6(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$6(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var CheckCircleOutlined = function CheckCircleOutlined2(props, context) {
    var p2 = _objectSpread$6({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$6({}, p2, {
      "icon": CheckCircleOutlined$1
    }), null);
  };
  CheckCircleOutlined.displayName = "CheckCircleOutlined";
  CheckCircleOutlined.inheritAttrs = false;
  function _objectSpread$5(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$5(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$5(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var ExclamationCircleOutlined = function ExclamationCircleOutlined2(props, context) {
    var p2 = _objectSpread$5({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$5({}, p2, {
      "icon": ExclamationCircleOutlined$1
    }), null);
  };
  ExclamationCircleOutlined.displayName = "ExclamationCircleOutlined";
  ExclamationCircleOutlined.inheritAttrs = false;
  function _objectSpread$4(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$4(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$4(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var InfoCircleOutlined = function InfoCircleOutlined2(props, context) {
    var p2 = _objectSpread$4({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$4({}, p2, {
      "icon": InfoCircleOutlined$1
    }), null);
  };
  InfoCircleOutlined.displayName = "InfoCircleOutlined";
  InfoCircleOutlined.inheritAttrs = false;
  function _objectSpread$3(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$3(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$3(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var CloseCircleOutlined = function CloseCircleOutlined2(props, context) {
    var p2 = _objectSpread$3({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$3({}, p2, {
      "icon": CloseCircleOutlined$1
    }), null);
  };
  CloseCircleOutlined.displayName = "CloseCircleOutlined";
  CloseCircleOutlined.inheritAttrs = false;
  function _objectSpread$2(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$2(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$2(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var CheckCircleFilled = function CheckCircleFilled2(props, context) {
    var p2 = _objectSpread$2({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$2({}, p2, {
      "icon": CheckCircleFilled$1
    }), null);
  };
  CheckCircleFilled.displayName = "CheckCircleFilled";
  CheckCircleFilled.inheritAttrs = false;
  function _objectSpread$1(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty$1(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty$1(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var ExclamationCircleFilled = function ExclamationCircleFilled2(props, context) {
    var p2 = _objectSpread$1({}, props, context.attrs);
    return createVNode(Icon, _objectSpread$1({}, p2, {
      "icon": ExclamationCircleFilled$1
    }), null);
  };
  ExclamationCircleFilled.displayName = "ExclamationCircleFilled";
  ExclamationCircleFilled.inheritAttrs = false;
  function _objectSpread(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? Object(arguments[i2]) : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key2) {
        _defineProperty(target, key2, source[key2]);
      });
    }
    return target;
  }
  function _defineProperty(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  var InfoCircleFilled = function InfoCircleFilled2(props, context) {
    var p2 = _objectSpread({}, props, context.attrs);
    return createVNode(Icon, _objectSpread({}, p2, {
      "icon": InfoCircleFilled$1
    }), null);
  };
  InfoCircleFilled.displayName = "InfoCircleFilled";
  InfoCircleFilled.inheritAttrs = false;
  const genWaveStyle = (token2) => {
    const {
      componentCls,
      colorPrimary
    } = token2;
    return {
      [componentCls]: {
        position: "absolute",
        background: "transparent",
        pointerEvents: "none",
        boxSizing: "border-box",
        color: `var(--wave-color, ${colorPrimary})`,
        boxShadow: `0 0 0 0 currentcolor`,
        opacity: 0.2,
        // =================== Motion ===================
        "&.wave-motion-appear": {
          transition: [`box-shadow 0.4s ${token2.motionEaseOutCirc}`, `opacity 2s ${token2.motionEaseOutCirc}`].join(","),
          "&-active": {
            boxShadow: `0 0 0 6px currentcolor`,
            opacity: 0
          }
        }
      }
    };
  };
  const useStyle$7 = genComponentStyleHook("Wave", (token2) => [genWaveStyle(token2)]);
  function isNotGrey(color) {
    const match2 = (color || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
    if (match2 && match2[1] && match2[2] && match2[3]) {
      return !(match2[1] === match2[2] && match2[2] === match2[3]);
    }
    return true;
  }
  function isValidWaveColor(color) {
    return color && color !== "#fff" && color !== "#ffffff" && color !== "rgb(255, 255, 255)" && color !== "rgba(255, 255, 255, 1)" && isNotGrey(color) && !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
    color !== "transparent";
  }
  function getTargetWaveColor(node2) {
    const {
      borderTopColor,
      borderColor,
      backgroundColor
    } = getComputedStyle(node2);
    if (isValidWaveColor(borderTopColor)) {
      return borderTopColor;
    }
    if (isValidWaveColor(borderColor)) {
      return borderColor;
    }
    if (isValidWaveColor(backgroundColor)) {
      return backgroundColor;
    }
    return null;
  }
  function validateNum(value) {
    return Number.isNaN(value) ? 0 : value;
  }
  const WaveEffect = /* @__PURE__ */ defineComponent({
    props: {
      target: objectType(),
      className: String
    },
    setup(props) {
      const divRef = /* @__PURE__ */ shallowRef(null);
      const [color, setWaveColor] = useState(null);
      const [borderRadius, setBorderRadius] = useState([]);
      const [left, setLeft] = useState(0);
      const [top, setTop] = useState(0);
      const [width, setWidth] = useState(0);
      const [height, setHeight] = useState(0);
      const [enabled, setEnabled] = useState(false);
      function syncPos() {
        const {
          target
        } = props;
        const nodeStyle = getComputedStyle(target);
        setWaveColor(getTargetWaveColor(target));
        const isStatic = nodeStyle.position === "static";
        const {
          borderLeftWidth,
          borderTopWidth
        } = nodeStyle;
        setLeft(isStatic ? target.offsetLeft : validateNum(-parseFloat(borderLeftWidth)));
        setTop(isStatic ? target.offsetTop : validateNum(-parseFloat(borderTopWidth)));
        setWidth(target.offsetWidth);
        setHeight(target.offsetHeight);
        const {
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius
        } = nodeStyle;
        setBorderRadius([borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius].map((radius) => validateNum(parseFloat(radius))));
      }
      let resizeObserver;
      let rafId;
      let timeoutId;
      const clear = () => {
        clearTimeout(timeoutId);
        wrapperRaf.cancel(rafId);
        resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect();
      };
      const removeDom = () => {
        var _a;
        const holder = (_a = divRef.value) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (holder) {
          render(null, holder);
          if (holder.parentElement) {
            holder.parentElement.removeChild(holder);
          }
        }
      };
      onMounted(() => {
        clear();
        timeoutId = setTimeout(() => {
          removeDom();
        }, 5e3);
        const {
          target
        } = props;
        if (target) {
          rafId = wrapperRaf(() => {
            syncPos();
            setEnabled(true);
          });
          if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(syncPos);
            resizeObserver.observe(target);
          }
        }
      });
      onBeforeUnmount(() => {
        clear();
      });
      const onTransitionend = (e2) => {
        if (e2.propertyName === "opacity") {
          removeDom();
        }
      };
      return () => {
        if (!enabled.value) {
          return null;
        }
        const waveStyle = {
          left: `${left.value}px`,
          top: `${top.value}px`,
          width: `${width.value}px`,
          height: `${height.value}px`,
          borderRadius: borderRadius.value.map((radius) => `${radius}px`).join(" ")
        };
        if (color) {
          waveStyle["--wave-color"] = color.value;
        }
        return createVNode(Transition, {
          "appear": true,
          "name": "wave-motion",
          "appearFromClass": "wave-motion-appear",
          "appearActiveClass": "wave-motion-appear",
          "appearToClass": "wave-motion-appear wave-motion-appear-active"
        }, {
          default: () => [createVNode("div", {
            "ref": divRef,
            "class": props.className,
            "style": waveStyle,
            "onTransitionend": onTransitionend
          }, null)]
        });
      };
    }
  });
  function showWaveEffect(node2, className) {
    const holder = document.createElement("div");
    holder.style.position = "absolute";
    holder.style.left = `0px`;
    holder.style.top = `0px`;
    node2 === null || node2 === void 0 ? void 0 : node2.insertBefore(holder, node2 === null || node2 === void 0 ? void 0 : node2.firstChild);
    render(createVNode(WaveEffect, {
      "target": node2,
      "className": className
    }, null), holder);
    return () => {
      render(null, holder);
      if (holder.parentElement) {
        holder.parentElement.removeChild(holder);
      }
    };
  }
  function useWave(className, wave) {
    const instance = getCurrentInstance();
    let stopWave;
    function showWave() {
      var _a;
      const node2 = findDOMNode(instance);
      stopWave === null || stopWave === void 0 ? void 0 : stopWave();
      if (((_a = wave === null || wave === void 0 ? void 0 : wave.value) === null || _a === void 0 ? void 0 : _a.disabled) || !node2) {
        return;
      }
      stopWave = showWaveEffect(node2, className.value);
    }
    onBeforeUnmount(() => {
      stopWave === null || stopWave === void 0 ? void 0 : stopWave();
    });
    return showWave;
  }
  const Wave = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "Wave",
    props: {
      disabled: Boolean
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const instance = getCurrentInstance();
      const {
        prefixCls,
        wave
      } = useConfigInject("wave", props);
      const [, hashId] = useStyle$7(prefixCls);
      const showWave = useWave(computed(() => classNames(prefixCls.value, hashId.value)), wave);
      let onClick;
      const clear = () => {
        const node2 = findDOMNode(instance);
        node2.removeEventListener("click", onClick, true);
      };
      onMounted(() => {
        watch(() => props.disabled, () => {
          clear();
          nextTick(() => {
            const node2 = findDOMNode(instance);
            node2 === null || node2 === void 0 ? void 0 : node2.removeEventListener("click", onClick, true);
            if (!node2 || node2.nodeType !== 1 || props.disabled) {
              return;
            }
            onClick = (e2) => {
              if (e2.target.tagName === "INPUT" || !isVisible(e2.target) || // No need wave
              !node2.getAttribute || node2.getAttribute("disabled") || node2.disabled || node2.className.includes("disabled") || node2.className.includes("-leave")) {
                return;
              }
              showWave();
            };
            node2.addEventListener("click", onClick, true);
          });
        }, {
          immediate: true,
          flush: "post"
        });
      });
      onBeforeUnmount(() => {
        clear();
      });
      return () => {
        var _a;
        const children = (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)[0];
        return children;
      };
    }
  });
  function convertLegacyProps(type) {
    if (type === "danger") {
      return {
        danger: true
      };
    }
    return {
      type
    };
  }
  const buttonProps = () => ({
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
      default: () => false
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
    icon: PropTypes.any,
    href: String,
    target: String,
    title: String,
    onClick: eventType(),
    onMousedown: eventType()
  });
  const getCollapsedWidth = (node2) => {
    if (node2) {
      node2.style.width = "0px";
      node2.style.opacity = "0";
      node2.style.transform = "scale(0)";
    }
  };
  const getRealWidth = (node2) => {
    nextTick(() => {
      if (node2) {
        node2.style.width = `${node2.scrollWidth}px`;
        node2.style.opacity = "1";
        node2.style.transform = "scale(1)";
      }
    });
  };
  const resetStyle = (node2) => {
    if (node2 && node2.style) {
      node2.style.width = null;
      node2.style.opacity = null;
      node2.style.transform = null;
    }
  };
  const LoadingIcon = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "LoadingIcon",
    props: {
      prefixCls: String,
      loading: [Boolean, Object],
      existIcon: Boolean
    },
    setup(props) {
      return () => {
        const {
          existIcon,
          prefixCls,
          loading
        } = props;
        if (existIcon) {
          return createVNode("span", {
            "class": `${prefixCls}-loading-icon`
          }, [createVNode(LoadingOutlined, null, null)]);
        }
        const visible = !!loading;
        return createVNode(Transition, {
          "name": `${prefixCls}-loading-icon-motion`,
          "onBeforeEnter": getCollapsedWidth,
          "onEnter": getRealWidth,
          "onAfterEnter": resetStyle,
          "onBeforeLeave": getRealWidth,
          "onLeave": (node2) => {
            setTimeout(() => {
              getCollapsedWidth(node2);
            });
          },
          "onAfterLeave": resetStyle
        }, {
          default: () => [visible ? createVNode("span", {
            "class": `${prefixCls}-loading-icon`
          }, [createVNode(LoadingOutlined, null, null)]) : null]
        });
      };
    }
  });
  const genButtonBorderStyle = (buttonTypeCls, borderColor) => ({
    // Border
    [`> span, > ${buttonTypeCls}`]: {
      "&:not(:last-child)": {
        [`&, & > ${buttonTypeCls}`]: {
          "&:not(:disabled)": {
            borderInlineEndColor: borderColor
          }
        }
      },
      "&:not(:first-child)": {
        [`&, & > ${buttonTypeCls}`]: {
          "&:not(:disabled)": {
            borderInlineStartColor: borderColor
          }
        }
      }
    }
  });
  const genGroupStyle = (token2) => {
    const {
      componentCls,
      fontSize,
      lineWidth,
      colorPrimaryHover,
      colorErrorHover
    } = token2;
    return {
      [`${componentCls}-group`]: [
        {
          position: "relative",
          display: "inline-flex",
          // Border
          [`> span, > ${componentCls}`]: {
            "&:not(:last-child)": {
              [`&, & > ${componentCls}`]: {
                borderStartEndRadius: 0,
                borderEndEndRadius: 0
              }
            },
            "&:not(:first-child)": {
              marginInlineStart: -lineWidth,
              [`&, & > ${componentCls}`]: {
                borderStartStartRadius: 0,
                borderEndStartRadius: 0
              }
            }
          },
          [componentCls]: {
            position: "relative",
            zIndex: 1,
            [`&:hover,
          &:focus,
          &:active`]: {
              zIndex: 2
            },
            "&[disabled]": {
              zIndex: 0
            }
          },
          [`${componentCls}-icon-only`]: {
            fontSize
          }
        },
        // Border Color
        genButtonBorderStyle(`${componentCls}-primary`, colorPrimaryHover),
        genButtonBorderStyle(`${componentCls}-danger`, colorErrorHover)
      ]
    };
  };
  function compactItemVerticalBorder(token2, parentCls) {
    return {
      // border collapse
      [`&-item:not(${parentCls}-last-item)`]: {
        marginBottom: -token2.lineWidth
      },
      "&-item": {
        "&:hover,&:focus,&:active": {
          zIndex: 2
        },
        "&[disabled]": {
          zIndex: 0
        }
      }
    };
  }
  function compactItemBorderVerticalRadius(prefixCls, parentCls) {
    return {
      [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: {
        borderRadius: 0
      },
      [`&-item${parentCls}-first-item:not(${parentCls}-last-item)`]: {
        [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
          borderEndEndRadius: 0,
          borderEndStartRadius: 0
        }
      },
      [`&-item${parentCls}-last-item:not(${parentCls}-first-item)`]: {
        [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
          borderStartStartRadius: 0,
          borderStartEndRadius: 0
        }
      }
    };
  }
  function genCompactItemVerticalStyle(token2) {
    const compactCls = `${token2.componentCls}-compact-vertical`;
    return {
      [compactCls]: _extends(_extends({}, compactItemVerticalBorder(token2, compactCls)), compactItemBorderVerticalRadius(token2.componentCls, compactCls))
    };
  }
  const genSharedButtonStyle = (token2) => {
    const {
      componentCls,
      iconCls
    } = token2;
    return {
      [componentCls]: {
        outline: "none",
        position: "relative",
        display: "inline-block",
        fontWeight: 400,
        whiteSpace: "nowrap",
        textAlign: "center",
        backgroundImage: "none",
        backgroundColor: "transparent",
        border: `${token2.lineWidth}px ${token2.lineType} transparent`,
        cursor: "pointer",
        transition: `all ${token2.motionDurationMid} ${token2.motionEaseInOut}`,
        userSelect: "none",
        touchAction: "manipulation",
        lineHeight: token2.lineHeight,
        color: token2.colorText,
        "> span": {
          display: "inline-block"
        },
        // Leave a space between icon and text.
        [`> ${iconCls} + span, > span + ${iconCls}`]: {
          marginInlineStart: token2.marginXS
        },
        "> a": {
          color: "currentColor"
        },
        "&:not(:disabled)": _extends({}, genFocusStyle(token2)),
        // make `btn-icon-only` not too narrow
        [`&-icon-only${componentCls}-compact-item`]: {
          flex: "none"
        },
        // Special styles for Primary Button
        [`&-compact-item${componentCls}-primary`]: {
          [`&:not([disabled]) + ${componentCls}-compact-item${componentCls}-primary:not([disabled])`]: {
            position: "relative",
            "&:before": {
              position: "absolute",
              top: -token2.lineWidth,
              insetInlineStart: -token2.lineWidth,
              display: "inline-block",
              width: token2.lineWidth,
              height: `calc(100% + ${token2.lineWidth * 2}px)`,
              backgroundColor: token2.colorPrimaryHover,
              content: '""'
            }
          }
        },
        // Special styles for Primary Button
        "&-compact-vertical-item": {
          [`&${componentCls}-primary`]: {
            [`&:not([disabled]) + ${componentCls}-compact-vertical-item${componentCls}-primary:not([disabled])`]: {
              position: "relative",
              "&:before": {
                position: "absolute",
                top: -token2.lineWidth,
                insetInlineStart: -token2.lineWidth,
                display: "inline-block",
                width: `calc(100% + ${token2.lineWidth * 2}px)`,
                height: token2.lineWidth,
                backgroundColor: token2.colorPrimaryHover,
                content: '""'
              }
            }
          }
        }
      }
    };
  };
  const genHoverActiveButtonStyle = (hoverStyle, activeStyle) => ({
    "&:not(:disabled)": {
      "&:hover": hoverStyle,
      "&:active": activeStyle
    }
  });
  const genCircleButtonStyle = (token2) => ({
    minWidth: token2.controlHeight,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    borderRadius: "50%"
  });
  const genRoundButtonStyle = (token2) => ({
    borderRadius: token2.controlHeight,
    paddingInlineStart: token2.controlHeight / 2,
    paddingInlineEnd: token2.controlHeight / 2
  });
  const genDisabledStyle = (token2) => ({
    cursor: "not-allowed",
    borderColor: token2.colorBorder,
    color: token2.colorTextDisabled,
    backgroundColor: token2.colorBgContainerDisabled,
    boxShadow: "none"
  });
  const genGhostButtonStyle = (btnCls, textColor, borderColor, textColorDisabled, borderColorDisabled, hoverStyle, activeStyle) => ({
    [`&${btnCls}-background-ghost`]: _extends(_extends({
      color: textColor || void 0,
      backgroundColor: "transparent",
      borderColor: borderColor || void 0,
      boxShadow: "none"
    }, genHoverActiveButtonStyle(_extends({
      backgroundColor: "transparent"
    }, hoverStyle), _extends({
      backgroundColor: "transparent"
    }, activeStyle))), {
      "&:disabled": {
        cursor: "not-allowed",
        color: textColorDisabled || void 0,
        borderColor: borderColorDisabled || void 0
      }
    })
  });
  const genSolidDisabledButtonStyle = (token2) => ({
    "&:disabled": _extends({}, genDisabledStyle(token2))
  });
  const genSolidButtonStyle = (token2) => _extends({}, genSolidDisabledButtonStyle(token2));
  const genPureDisabledButtonStyle = (token2) => ({
    "&:disabled": {
      cursor: "not-allowed",
      color: token2.colorTextDisabled
    }
  });
  const genDefaultButtonStyle = (token2) => _extends(_extends(_extends(_extends(_extends({}, genSolidButtonStyle(token2)), {
    backgroundColor: token2.colorBgContainer,
    borderColor: token2.colorBorder,
    boxShadow: `0 ${token2.controlOutlineWidth}px 0 ${token2.controlTmpOutline}`
  }), genHoverActiveButtonStyle({
    color: token2.colorPrimaryHover,
    borderColor: token2.colorPrimaryHover
  }, {
    color: token2.colorPrimaryActive,
    borderColor: token2.colorPrimaryActive
  })), genGhostButtonStyle(token2.componentCls, token2.colorBgContainer, token2.colorBgContainer, token2.colorTextDisabled, token2.colorBorder)), {
    [`&${token2.componentCls}-dangerous`]: _extends(_extends(_extends({
      color: token2.colorError,
      borderColor: token2.colorError
    }, genHoverActiveButtonStyle({
      color: token2.colorErrorHover,
      borderColor: token2.colorErrorBorderHover
    }, {
      color: token2.colorErrorActive,
      borderColor: token2.colorErrorActive
    })), genGhostButtonStyle(token2.componentCls, token2.colorError, token2.colorError, token2.colorTextDisabled, token2.colorBorder)), genSolidDisabledButtonStyle(token2))
  });
  const genPrimaryButtonStyle = (token2) => _extends(_extends(_extends(_extends(_extends({}, genSolidButtonStyle(token2)), {
    color: token2.colorTextLightSolid,
    backgroundColor: token2.colorPrimary,
    boxShadow: `0 ${token2.controlOutlineWidth}px 0 ${token2.controlOutline}`
  }), genHoverActiveButtonStyle({
    color: token2.colorTextLightSolid,
    backgroundColor: token2.colorPrimaryHover
  }, {
    color: token2.colorTextLightSolid,
    backgroundColor: token2.colorPrimaryActive
  })), genGhostButtonStyle(token2.componentCls, token2.colorPrimary, token2.colorPrimary, token2.colorTextDisabled, token2.colorBorder, {
    color: token2.colorPrimaryHover,
    borderColor: token2.colorPrimaryHover
  }, {
    color: token2.colorPrimaryActive,
    borderColor: token2.colorPrimaryActive
  })), {
    [`&${token2.componentCls}-dangerous`]: _extends(_extends(_extends({
      backgroundColor: token2.colorError,
      boxShadow: `0 ${token2.controlOutlineWidth}px 0 ${token2.colorErrorOutline}`
    }, genHoverActiveButtonStyle({
      backgroundColor: token2.colorErrorHover
    }, {
      backgroundColor: token2.colorErrorActive
    })), genGhostButtonStyle(token2.componentCls, token2.colorError, token2.colorError, token2.colorTextDisabled, token2.colorBorder, {
      color: token2.colorErrorHover,
      borderColor: token2.colorErrorHover
    }, {
      color: token2.colorErrorActive,
      borderColor: token2.colorErrorActive
    })), genSolidDisabledButtonStyle(token2))
  });
  const genDashedButtonStyle = (token2) => _extends(_extends({}, genDefaultButtonStyle(token2)), {
    borderStyle: "dashed"
  });
  const genLinkButtonStyle = (token2) => _extends(_extends(_extends({
    color: token2.colorLink
  }, genHoverActiveButtonStyle({
    color: token2.colorLinkHover
  }, {
    color: token2.colorLinkActive
  })), genPureDisabledButtonStyle(token2)), {
    [`&${token2.componentCls}-dangerous`]: _extends(_extends({
      color: token2.colorError
    }, genHoverActiveButtonStyle({
      color: token2.colorErrorHover
    }, {
      color: token2.colorErrorActive
    })), genPureDisabledButtonStyle(token2))
  });
  const genTextButtonStyle = (token2) => _extends(_extends(_extends({}, genHoverActiveButtonStyle({
    color: token2.colorText,
    backgroundColor: token2.colorBgTextHover
  }, {
    color: token2.colorText,
    backgroundColor: token2.colorBgTextActive
  })), genPureDisabledButtonStyle(token2)), {
    [`&${token2.componentCls}-dangerous`]: _extends(_extends({
      color: token2.colorError
    }, genPureDisabledButtonStyle(token2)), genHoverActiveButtonStyle({
      color: token2.colorErrorHover,
      backgroundColor: token2.colorErrorBg
    }, {
      color: token2.colorErrorHover,
      backgroundColor: token2.colorErrorBg
    }))
  });
  const genDisabledButtonStyle = (token2) => _extends(_extends({}, genDisabledStyle(token2)), {
    [`&${token2.componentCls}:hover`]: _extends({}, genDisabledStyle(token2))
  });
  const genTypeButtonStyle = (token2) => {
    const {
      componentCls
    } = token2;
    return {
      [`${componentCls}-default`]: genDefaultButtonStyle(token2),
      [`${componentCls}-primary`]: genPrimaryButtonStyle(token2),
      [`${componentCls}-dashed`]: genDashedButtonStyle(token2),
      [`${componentCls}-link`]: genLinkButtonStyle(token2),
      [`${componentCls}-text`]: genTextButtonStyle(token2),
      [`${componentCls}-disabled`]: genDisabledButtonStyle(token2)
    };
  };
  const genSizeButtonStyle = function(token2) {
    let sizePrefixCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const {
      componentCls,
      iconCls,
      controlHeight,
      fontSize,
      lineHeight,
      lineWidth,
      borderRadius,
      buttonPaddingHorizontal
    } = token2;
    const paddingVertical = Math.max(0, (controlHeight - fontSize * lineHeight) / 2 - lineWidth);
    const paddingHorizontal = buttonPaddingHorizontal - lineWidth;
    const iconOnlyCls = `${componentCls}-icon-only`;
    return [
      // Size
      {
        [`${componentCls}${sizePrefixCls}`]: {
          fontSize,
          height: controlHeight,
          padding: `${paddingVertical}px ${paddingHorizontal}px`,
          borderRadius,
          [`&${iconOnlyCls}`]: {
            width: controlHeight,
            paddingInlineStart: 0,
            paddingInlineEnd: 0,
            [`&${componentCls}-round`]: {
              width: "auto"
            },
            "> span": {
              transform: "scale(1.143)"
              // 14px -> 16px
            }
          },
          // Loading
          [`&${componentCls}-loading`]: {
            opacity: token2.opacityLoading,
            cursor: "default"
          },
          [`${componentCls}-loading-icon`]: {
            transition: `width ${token2.motionDurationSlow} ${token2.motionEaseInOut}, opacity ${token2.motionDurationSlow} ${token2.motionEaseInOut}`
          },
          [`&:not(${iconOnlyCls}) ${componentCls}-loading-icon > ${iconCls}`]: {
            marginInlineEnd: token2.marginXS
          }
        }
      },
      // Shape - patch prefixCls again to override solid border radius style
      {
        [`${componentCls}${componentCls}-circle${sizePrefixCls}`]: genCircleButtonStyle(token2)
      },
      {
        [`${componentCls}${componentCls}-round${sizePrefixCls}`]: genRoundButtonStyle(token2)
      }
    ];
  };
  const genSizeBaseButtonStyle = (token2) => genSizeButtonStyle(token2);
  const genSizeSmallButtonStyle = (token2) => {
    const smallToken = merge(token2, {
      controlHeight: token2.controlHeightSM,
      padding: token2.paddingXS,
      buttonPaddingHorizontal: 8,
      borderRadius: token2.borderRadiusSM
    });
    return genSizeButtonStyle(smallToken, `${token2.componentCls}-sm`);
  };
  const genSizeLargeButtonStyle = (token2) => {
    const largeToken = merge(token2, {
      controlHeight: token2.controlHeightLG,
      fontSize: token2.fontSizeLG,
      borderRadius: token2.borderRadiusLG
    });
    return genSizeButtonStyle(largeToken, `${token2.componentCls}-lg`);
  };
  const genBlockButtonStyle = (token2) => {
    const {
      componentCls
    } = token2;
    return {
      [componentCls]: {
        [`&${componentCls}-block`]: {
          width: "100%"
        }
      }
    };
  };
  const useStyle$6 = genComponentStyleHook("Button", (token2) => {
    const {
      controlTmpOutline,
      paddingContentHorizontal
    } = token2;
    const buttonToken = merge(token2, {
      colorOutlineDefault: controlTmpOutline,
      buttonPaddingHorizontal: paddingContentHorizontal
    });
    return [
      // Shared
      genSharedButtonStyle(buttonToken),
      // Size
      genSizeSmallButtonStyle(buttonToken),
      genSizeBaseButtonStyle(buttonToken),
      genSizeLargeButtonStyle(buttonToken),
      // Block
      genBlockButtonStyle(buttonToken),
      // Group (type, ghost, danger, disabled, loading)
      genTypeButtonStyle(buttonToken),
      // Button Group
      genGroupStyle(buttonToken),
      // Space Compact
      genCompactItemStyle(token2, {
        focus: false
      }),
      genCompactItemVerticalStyle(token2)
    ];
  });
  const buttonGroupProps = () => ({
    prefixCls: String,
    size: {
      type: String
    }
  });
  const GroupSizeContext = createContext();
  const ButtonGroup = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "AButtonGroup",
    props: buttonGroupProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        prefixCls,
        direction
      } = useConfigInject("btn-group", props);
      const [, , hashId] = useToken();
      GroupSizeContext.useProvide(/* @__PURE__ */ reactive({
        size: computed(() => props.size)
      }));
      const classes = computed(() => {
        const {
          size
        } = props;
        let sizeCls = "";
        switch (size) {
          case "large":
            sizeCls = "lg";
            break;
          case "small":
            sizeCls = "sm";
            break;
          case "middle":
          case void 0:
            break;
          default:
            devWarning(!size, "Button.Group", "Invalid prop `size`.");
        }
        return {
          [`${prefixCls.value}`]: true,
          [`${prefixCls.value}-${sizeCls}`]: sizeCls,
          [`${prefixCls.value}-rtl`]: direction.value === "rtl",
          [hashId.value]: true
        };
      });
      return () => {
        var _a;
        return createVNode("div", {
          "class": classes.value
        }, [flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))]);
      };
    }
  });
  const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
  const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
  function isUnBorderedButtonType(type) {
    return type === "text" || type === "link";
  }
  const Button = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "AButton",
    inheritAttrs: false,
    __ANT_BUTTON: true,
    props: initDefaultProps(buttonProps(), {
      type: "default"
    }),
    slots: Object,
    // emits: ['click', 'mousedown'],
    setup(props, _ref) {
      let {
        slots,
        attrs,
        emit: emit2,
        expose
      } = _ref;
      const {
        prefixCls,
        autoInsertSpaceInButton,
        direction,
        size
      } = useConfigInject("btn", props);
      const [wrapSSR, hashId] = useStyle$6(prefixCls);
      const groupSizeContext = GroupSizeContext.useInject();
      const disabledContext = useInjectDisabled();
      const mergedDisabled = computed(() => {
        var _a;
        return (_a = props.disabled) !== null && _a !== void 0 ? _a : disabledContext.value;
      });
      const buttonNodeRef = /* @__PURE__ */ shallowRef(null);
      const delayTimeoutRef = /* @__PURE__ */ shallowRef(void 0);
      let isNeedInserted = false;
      const innerLoading = /* @__PURE__ */ shallowRef(false);
      const hasTwoCNChar = /* @__PURE__ */ shallowRef(false);
      const autoInsertSpace = computed(() => autoInsertSpaceInButton.value !== false);
      const {
        compactSize,
        compactItemClassnames
      } = useCompactItemContext(prefixCls, direction);
      const loadingOrDelay = computed(() => typeof props.loading === "object" && props.loading.delay ? props.loading.delay || true : !!props.loading);
      watch(loadingOrDelay, (val) => {
        clearTimeout(delayTimeoutRef.value);
        if (typeof loadingOrDelay.value === "number") {
          delayTimeoutRef.value = setTimeout(() => {
            innerLoading.value = val;
          }, loadingOrDelay.value);
        } else {
          innerLoading.value = val;
        }
      }, {
        immediate: true
      });
      const classes = computed(() => {
        const {
          type,
          shape = "default",
          ghost,
          block,
          danger
        } = props;
        const pre = prefixCls.value;
        const sizeClassNameMap = {
          large: "lg",
          small: "sm",
          middle: void 0
        };
        const sizeFullname = compactSize.value || (groupSizeContext === null || groupSizeContext === void 0 ? void 0 : groupSizeContext.size) || size.value;
        const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || "" : "";
        return [compactItemClassnames.value, {
          [hashId.value]: true,
          [`${pre}`]: true,
          [`${pre}-${shape}`]: shape !== "default" && shape,
          [`${pre}-${type}`]: type,
          [`${pre}-${sizeCls}`]: sizeCls,
          [`${pre}-loading`]: innerLoading.value,
          [`${pre}-background-ghost`]: ghost && !isUnBorderedButtonType(type),
          [`${pre}-two-chinese-chars`]: hasTwoCNChar.value && autoInsertSpace.value,
          [`${pre}-block`]: block,
          [`${pre}-dangerous`]: !!danger,
          [`${pre}-rtl`]: direction.value === "rtl"
        }];
      });
      const fixTwoCNChar = () => {
        const node2 = buttonNodeRef.value;
        if (!node2 || autoInsertSpaceInButton.value === false) {
          return;
        }
        const buttonText = node2.textContent;
        if (isNeedInserted && isTwoCNChar(buttonText)) {
          if (!hasTwoCNChar.value) {
            hasTwoCNChar.value = true;
          }
        } else if (hasTwoCNChar.value) {
          hasTwoCNChar.value = false;
        }
      };
      const handleClick = (event) => {
        if (innerLoading.value || mergedDisabled.value) {
          event.preventDefault();
          return;
        }
        emit2("click", event);
      };
      const handleMousedown = (event) => {
        emit2("mousedown", event);
      };
      const insertSpace = (child, needInserted) => {
        const SPACE = needInserted ? " " : "";
        if (child.type === Text) {
          let text = child.children.trim();
          if (isTwoCNChar(text)) {
            text = text.split("").join(SPACE);
          }
          return createVNode("span", null, [text]);
        }
        return child;
      };
      watchEffect(() => {
        devWarning(!(props.ghost && isUnBorderedButtonType(props.type)), "Button", "`link` or `text` button can't be a `ghost` button.");
      });
      onMounted(fixTwoCNChar);
      onUpdated(fixTwoCNChar);
      onBeforeUnmount(() => {
        delayTimeoutRef.value && clearTimeout(delayTimeoutRef.value);
      });
      const focus = () => {
        var _a;
        (_a = buttonNodeRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      };
      const blur = () => {
        var _a;
        (_a = buttonNodeRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      };
      expose({
        focus,
        blur
      });
      return () => {
        var _a, _b;
        const {
          icon = (_a = slots.icon) === null || _a === void 0 ? void 0 : _a.call(slots)
        } = props;
        const children = flattenChildren((_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots));
        isNeedInserted = children.length === 1 && !icon && !isUnBorderedButtonType(props.type);
        const {
          type,
          htmlType,
          href,
          title,
          target
        } = props;
        const iconType = innerLoading.value ? "loading" : icon;
        const buttonProps2 = _extends(_extends({}, attrs), {
          title,
          disabled: mergedDisabled.value,
          class: [classes.value, attrs.class, {
            [`${prefixCls.value}-icon-only`]: children.length === 0 && !!iconType
          }],
          onClick: handleClick,
          onMousedown: handleMousedown
        });
        if (!mergedDisabled.value) {
          delete buttonProps2.disabled;
        }
        const iconNode = icon && !innerLoading.value ? icon : createVNode(LoadingIcon, {
          "existIcon": !!icon,
          "prefixCls": prefixCls.value,
          "loading": !!innerLoading.value
        }, null);
        const kids = children.map((child) => insertSpace(child, isNeedInserted && autoInsertSpace.value));
        if (href !== void 0) {
          return wrapSSR(createVNode("a", _objectSpread2(_objectSpread2({}, buttonProps2), {}, {
            "href": href,
            "target": target,
            "ref": buttonNodeRef
          }), [iconNode, kids]));
        }
        let buttonNode = createVNode("button", _objectSpread2(_objectSpread2({}, buttonProps2), {}, {
          "ref": buttonNodeRef,
          "type": htmlType
        }), [iconNode, kids]);
        if (!isUnBorderedButtonType(type)) {
          const _buttonNode = /* @__PURE__ */ function() {
            return buttonNode;
          }();
          buttonNode = createVNode(Wave, {
            "ref": "wave",
            "disabled": !!innerLoading.value
          }, {
            default: () => [_buttonNode]
          });
        }
        return wrapSSR(buttonNode);
      };
    }
  });
  Button.Group = ButtonGroup;
  Button.install = function(app) {
    app.component(Button.name, Button);
    app.component(ButtonGroup.name, ButtonGroup);
    return app;
  };
  const canUseDocElement = () => canUseDom$1() && window.document.documentElement;
  let flexGapSupported;
  const detectFlexGapSupported = () => {
    if (!canUseDocElement()) {
      return false;
    }
    if (flexGapSupported !== void 0) {
      return flexGapSupported;
    }
    const flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";
    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));
    document.body.appendChild(flex);
    flexGapSupported = flex.scrollHeight === 1;
    document.body.removeChild(flex);
    return flexGapSupported;
  };
  const useFlexGapSupport = () => {
    const flexible = /* @__PURE__ */ shallowRef(false);
    onMounted(() => {
      flexible.value = detectFlexGapSupported();
    });
    return flexible;
  };
  let runtimeLocale = _extends({}, localeValues.Modal);
  function changeConfirmLocale(newLocale) {
    if (newLocale) {
      runtimeLocale = _extends(_extends({}, runtimeLocale), newLocale);
    } else {
      runtimeLocale = _extends({}, localeValues.Modal);
    }
  }
  function getConfirmLocale() {
    return runtimeLocale;
  }
  const ANT_MARK = "internalMark";
  const LocaleProvider = /* @__PURE__ */ defineComponent({
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
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      warning$1(props.ANT_MARK__ === ANT_MARK, "LocaleProvider", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead");
      const state = /* @__PURE__ */ reactive({
        antLocale: _extends(_extends({}, props.locale), {
          exist: true
        }),
        ANT_MARK__: ANT_MARK
      });
      provide("localeData", state);
      watch(() => props.locale, (locale2) => {
        changeConfirmLocale(locale2 && locale2.Modal);
        state.antLocale = _extends(_extends({}, locale2), {
          exist: true
        });
      }, {
        immediate: true
      });
      return () => {
        var _a;
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      };
    }
  });
  LocaleProvider.install = function(app) {
    app.component(LocaleProvider.name, LocaleProvider);
    return app;
  };
  const locale = withInstall(LocaleProvider);
  const Notice = /* @__PURE__ */ defineComponent({
    name: "Notice",
    inheritAttrs: false,
    props: ["prefixCls", "duration", "updateMark", "noticeKey", "closeIcon", "closable", "props", "onClick", "onClose", "holder", "visible"],
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      let closeTimer;
      let isUnMounted = false;
      const duration = computed(() => props.duration === void 0 ? 4.5 : props.duration);
      const startCloseTimer = () => {
        if (duration.value && !isUnMounted) {
          closeTimer = setTimeout(() => {
            close2();
          }, duration.value * 1e3);
        }
      };
      const clearCloseTimer = () => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
      };
      const close2 = (e2) => {
        if (e2) {
          e2.stopPropagation();
        }
        clearCloseTimer();
        const {
          onClose,
          noticeKey
        } = props;
        if (onClose) {
          onClose(noticeKey);
        }
      };
      const restartCloseTimer = () => {
        clearCloseTimer();
        startCloseTimer();
      };
      onMounted(() => {
        startCloseTimer();
      });
      onUnmounted(() => {
        isUnMounted = true;
        clearCloseTimer();
      });
      watch([duration, () => props.updateMark, () => props.visible], (_ref2, _ref3) => {
        let [preDuration, preUpdateMark, preVisible] = _ref2;
        let [newDuration, newUpdateMark, newVisible] = _ref3;
        if (preDuration !== newDuration || preUpdateMark !== newUpdateMark || preVisible !== newVisible && newVisible) {
          restartCloseTimer();
        }
      }, {
        flush: "post"
      });
      return () => {
        var _a, _b;
        const {
          prefixCls,
          closable,
          closeIcon = (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots),
          onClick,
          holder
        } = props;
        const {
          class: className,
          style
        } = attrs;
        const componentClass = `${prefixCls}-notice`;
        const dataOrAriaAttributeProps = Object.keys(attrs).reduce((acc, key2) => {
          if (key2.startsWith("data-") || key2.startsWith("aria-") || key2 === "role") {
            acc[key2] = attrs[key2];
          }
          return acc;
        }, {});
        const node2 = createVNode("div", _objectSpread2({
          "class": classNames(componentClass, className, {
            [`${componentClass}-closable`]: closable
          }),
          "style": style,
          "onMouseenter": clearCloseTimer,
          "onMouseleave": startCloseTimer,
          "onClick": onClick
        }, dataOrAriaAttributeProps), [createVNode("div", {
          "class": `${componentClass}-content`
        }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)]), closable ? createVNode("a", {
          "tabindex": 0,
          "onClick": close2,
          "class": `${componentClass}-close`
        }, [closeIcon || createVNode("span", {
          "class": `${componentClass}-close-x`
        }, null)]) : null]);
        if (holder) {
          return createVNode(Teleport, {
            "to": holder
          }, {
            default: () => node2
          });
        }
        return node2;
      };
    }
  });
  var __rest$6 = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  let seed$1 = 0;
  const now$1 = Date.now();
  function getUuid$1() {
    const id = seed$1;
    seed$1 += 1;
    return `rcNotification_${now$1}_${id}`;
  }
  const Notification$1 = /* @__PURE__ */ defineComponent({
    name: "Notification",
    inheritAttrs: false,
    props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon", "hashId"],
    setup(props, _ref) {
      let {
        attrs,
        expose,
        slots
      } = _ref;
      const hookRefs = /* @__PURE__ */ new Map();
      const notices = /* @__PURE__ */ ref([]);
      const transitionProps = computed(() => {
        const {
          prefixCls,
          animation = "fade"
        } = props;
        let name = props.transitionName;
        if (!name && animation) {
          name = `${prefixCls}-${animation}`;
        }
        return getTransitionGroupProps(name);
      });
      const add = (originNotice, holderCallback) => {
        const key2 = originNotice.key || getUuid$1();
        const notice2 = _extends(_extends({}, originNotice), {
          key: key2
        });
        const {
          maxCount: maxCount2
        } = props;
        const noticeIndex = notices.value.map((v2) => v2.notice.key).indexOf(key2);
        const updatedNotices = notices.value.concat();
        if (noticeIndex !== -1) {
          updatedNotices.splice(noticeIndex, 1, {
            notice: notice2,
            holderCallback
          });
        } else {
          if (maxCount2 && notices.value.length >= maxCount2) {
            notice2.key = updatedNotices[0].notice.key;
            notice2.updateMark = getUuid$1();
            notice2.userPassKey = key2;
            updatedNotices.shift();
          }
          updatedNotices.push({
            notice: notice2,
            holderCallback
          });
        }
        notices.value = updatedNotices;
      };
      const remove2 = (removeKey) => {
        notices.value = (/* @__PURE__ */ toRaw(notices.value)).filter((_ref2) => {
          let {
            notice: {
              key: key2,
              userPassKey
            }
          } = _ref2;
          const mergedKey = userPassKey || key2;
          return mergedKey !== removeKey;
        });
      };
      expose({
        add,
        remove: remove2,
        notices
      });
      return () => {
        var _a;
        const {
          prefixCls,
          closeIcon = (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots, {
            prefixCls
          })
        } = props;
        const noticeNodes = notices.value.map((_ref3, index) => {
          let {
            notice: notice2,
            holderCallback
          } = _ref3;
          const updateMark = index === notices.value.length - 1 ? notice2.updateMark : void 0;
          const {
            key: key2,
            userPassKey
          } = notice2;
          const {
            content: content2
          } = notice2;
          const noticeProps = _extends(_extends(_extends({
            prefixCls,
            closeIcon: typeof closeIcon === "function" ? closeIcon({
              prefixCls
            }) : closeIcon
          }, notice2), notice2.props), {
            key: key2,
            noticeKey: userPassKey || key2,
            updateMark,
            onClose: (noticeKey) => {
              var _a2;
              remove2(noticeKey);
              (_a2 = notice2.onClose) === null || _a2 === void 0 ? void 0 : _a2.call(notice2);
            },
            onClick: notice2.onClick
          });
          if (holderCallback) {
            return createVNode("div", {
              "key": key2,
              "class": `${prefixCls}-hook-holder`,
              "ref": (div2) => {
                if (typeof key2 === "undefined") {
                  return;
                }
                if (div2) {
                  hookRefs.set(key2, div2);
                  holderCallback(div2, noticeProps);
                } else {
                  hookRefs.delete(key2);
                }
              }
            }, null);
          }
          return createVNode(Notice, _objectSpread2(_objectSpread2({}, noticeProps), {}, {
            "class": classNames(noticeProps.class, props.hashId)
          }), {
            default: () => [typeof content2 === "function" ? content2({
              prefixCls
            }) : content2]
          });
        });
        const className = {
          [prefixCls]: 1,
          [attrs.class]: !!attrs.class,
          [props.hashId]: true
        };
        return createVNode("div", {
          "class": className,
          "style": attrs.style || {
            top: "65px",
            left: "50%"
          }
        }, [createVNode(TransitionGroup, _objectSpread2({
          "tag": "div"
        }, transitionProps.value), {
          default: () => [noticeNodes]
        })]);
      };
    }
  });
  Notification$1.newInstance = function newNotificationInstance(properties, callback) {
    const _a = properties || {}, {
      name = "notification",
      getContainer: getContainer2,
      appContext,
      prefixCls: customizePrefixCls,
      rootPrefixCls: customRootPrefixCls,
      transitionName: customTransitionName,
      hasTransitionName: hasTransitionName2,
      useStyle: useStyle2
    } = _a, props = __rest$6(_a, ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName", "useStyle"]);
    const div2 = document.createElement("div");
    if (getContainer2) {
      const root2 = getContainer2();
      root2.appendChild(div2);
    } else {
      document.body.appendChild(div2);
    }
    const Wrapper = /* @__PURE__ */ defineComponent({
      compatConfig: {
        MODE: 3
      },
      name: "NotificationWrapper",
      setup(_props, _ref4) {
        let {
          attrs
        } = _ref4;
        const notiRef = /* @__PURE__ */ shallowRef();
        const prefixCls = computed(() => globalConfigForApi.getPrefixCls(name, customizePrefixCls));
        const [, hashId] = useStyle2(prefixCls);
        onMounted(() => {
          callback({
            notice(noticeProps) {
              var _a2;
              (_a2 = notiRef.value) === null || _a2 === void 0 ? void 0 : _a2.add(noticeProps);
            },
            removeNotice(key2) {
              var _a2;
              (_a2 = notiRef.value) === null || _a2 === void 0 ? void 0 : _a2.remove(key2);
            },
            destroy() {
              render(null, div2);
              if (div2.parentNode) {
                div2.parentNode.removeChild(div2);
              }
            },
            component: notiRef
          });
        });
        return () => {
          const global2 = globalConfigForApi;
          const rootPrefixCls = global2.getRootPrefixCls(customRootPrefixCls, prefixCls.value);
          const transitionName2 = hasTransitionName2 ? customTransitionName : `${prefixCls.value}-${customTransitionName}`;
          return createVNode(ConfigProvider, _objectSpread2(_objectSpread2({}, global2), {}, {
            "prefixCls": rootPrefixCls
          }), {
            default: () => [createVNode(Notification$1, _objectSpread2(_objectSpread2({
              "ref": notiRef
            }, attrs), {}, {
              "prefixCls": prefixCls.value,
              "transitionName": transitionName2,
              "hashId": hashId.value
            }), null)]
          });
        };
      }
    });
    const vm = createVNode(Wrapper, props);
    vm.appContext = appContext || vm.appContext;
    render(vm, div2);
  };
  let seed = 0;
  const now = Date.now();
  function getUuid() {
    const id = seed;
    seed += 1;
    return `rcNotification_${now}_${id}`;
  }
  const Notification = /* @__PURE__ */ defineComponent({
    name: "HookNotification",
    inheritAttrs: false,
    props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon", "hashId", "remove", "notices", "getStyles", "getClassName", "onAllRemoved", "getContainer"],
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const hookRefs = /* @__PURE__ */ new Map();
      const notices = computed(() => props.notices);
      const transitionProps = computed(() => {
        let name = props.transitionName;
        if (!name && props.animation) {
          switch (typeof props.animation) {
            case "string":
              name = props.animation;
              break;
            case "function":
              name = props.animation().name;
              break;
            case "object":
              name = props.animation.name;
              break;
            default:
              name = `${props.prefixCls}-fade`;
              break;
          }
        }
        return getTransitionGroupProps(name);
      });
      const remove2 = (key2) => props.remove(key2);
      const placements = /* @__PURE__ */ ref({});
      watch(notices, () => {
        const nextPlacements = {};
        Object.keys(placements.value).forEach((placement) => {
          nextPlacements[placement] = [];
        });
        props.notices.forEach((config) => {
          const {
            placement = "topRight"
          } = config.notice;
          if (placement) {
            nextPlacements[placement] = nextPlacements[placement] || [];
            nextPlacements[placement].push(config);
          }
        });
        placements.value = nextPlacements;
      });
      const placementList = computed(() => Object.keys(placements.value));
      return () => {
        var _a;
        const {
          prefixCls,
          closeIcon = (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots, {
            prefixCls
          })
        } = props;
        const noticeNodes = placementList.value.map((placement) => {
          var _a2, _b;
          const noticesForPlacement = placements.value[placement];
          const classes = (_a2 = props.getClassName) === null || _a2 === void 0 ? void 0 : _a2.call(props, placement);
          const styles = (_b = props.getStyles) === null || _b === void 0 ? void 0 : _b.call(props, placement);
          const noticeNodesForPlacement = noticesForPlacement.map((_ref2, index) => {
            let {
              notice: notice2,
              holderCallback
            } = _ref2;
            const updateMark = index === notices.value.length - 1 ? notice2.updateMark : void 0;
            const {
              key: key2,
              userPassKey
            } = notice2;
            const {
              content: content2
            } = notice2;
            const noticeProps = _extends(_extends(_extends({
              prefixCls,
              closeIcon: typeof closeIcon === "function" ? closeIcon({
                prefixCls
              }) : closeIcon
            }, notice2), notice2.props), {
              key: key2,
              noticeKey: userPassKey || key2,
              updateMark,
              onClose: (noticeKey) => {
                var _a3;
                remove2(noticeKey);
                (_a3 = notice2.onClose) === null || _a3 === void 0 ? void 0 : _a3.call(notice2);
              },
              onClick: notice2.onClick
            });
            if (holderCallback) {
              return createVNode("div", {
                "key": key2,
                "class": `${prefixCls}-hook-holder`,
                "ref": (div2) => {
                  if (typeof key2 === "undefined") {
                    return;
                  }
                  if (div2) {
                    hookRefs.set(key2, div2);
                    holderCallback(div2, noticeProps);
                  } else {
                    hookRefs.delete(key2);
                  }
                }
              }, null);
            }
            return createVNode(Notice, _objectSpread2(_objectSpread2({}, noticeProps), {}, {
              "class": classNames(noticeProps.class, props.hashId)
            }), {
              default: () => [typeof content2 === "function" ? content2({
                prefixCls
              }) : content2]
            });
          });
          const className = {
            [prefixCls]: 1,
            [`${prefixCls}-${placement}`]: 1,
            [attrs.class]: !!attrs.class,
            [props.hashId]: true,
            [classes]: !!classes
          };
          function onAfterLeave() {
            var _a3;
            if (noticesForPlacement.length > 0) {
              return;
            }
            Reflect.deleteProperty(placements.value, placement);
            (_a3 = props.onAllRemoved) === null || _a3 === void 0 ? void 0 : _a3.call(props);
          }
          return createVNode("div", {
            "key": placement,
            "class": className,
            "style": attrs.style || styles || {
              top: "65px",
              left: "50%"
            }
          }, [createVNode(TransitionGroup, _objectSpread2(_objectSpread2({
            "tag": "div"
          }, transitionProps.value), {}, {
            "onAfterLeave": onAfterLeave
          }), {
            default: () => [noticeNodesForPlacement]
          })]);
        });
        return createVNode(Portal$1, {
          "getContainer": props.getContainer
        }, {
          default: () => [noticeNodes]
        });
      };
    }
  });
  var __rest$5 = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  const defaultGetContainer$1 = () => document.body;
  let uniqueKey = 0;
  function mergeConfig() {
    const clone = {};
    for (var _len = arguments.length, objList = new Array(_len), _key = 0; _key < _len; _key++) {
      objList[_key] = arguments[_key];
    }
    objList.forEach((obj) => {
      if (obj) {
        Object.keys(obj).forEach((key2) => {
          const val = obj[key2];
          if (val !== void 0) {
            clone[key2] = val;
          }
        });
      }
    });
    return clone;
  }
  function useNotification$1() {
    let rootConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      getContainer: getContainer2 = defaultGetContainer$1,
      motion,
      prefixCls,
      maxCount: maxCount2,
      getClassName,
      getStyles,
      onAllRemoved
    } = rootConfig, shareConfig = __rest$5(rootConfig, ["getContainer", "motion", "prefixCls", "maxCount", "getClassName", "getStyles", "onAllRemoved"]);
    const notices = /* @__PURE__ */ shallowRef([]);
    const notificationsRef = /* @__PURE__ */ shallowRef();
    const add = (originNotice, holderCallback) => {
      const key2 = originNotice.key || getUuid();
      const notice2 = _extends(_extends({}, originNotice), {
        key: key2
      });
      const noticeIndex = notices.value.map((v2) => v2.notice.key).indexOf(key2);
      const updatedNotices = notices.value.concat();
      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, {
          notice: notice2,
          holderCallback
        });
      } else {
        if (maxCount2 && notices.value.length >= maxCount2) {
          notice2.key = updatedNotices[0].notice.key;
          notice2.updateMark = getUuid();
          notice2.userPassKey = key2;
          updatedNotices.shift();
        }
        updatedNotices.push({
          notice: notice2,
          holderCallback
        });
      }
      notices.value = updatedNotices;
    };
    const removeNotice = (removeKey) => {
      notices.value = notices.value.filter((_ref) => {
        let {
          notice: {
            key: key2,
            userPassKey
          }
        } = _ref;
        const mergedKey = userPassKey || key2;
        return mergedKey !== removeKey;
      });
    };
    const destroy = () => {
      notices.value = [];
    };
    const contextHolder = () => createVNode(Notification, {
      "ref": notificationsRef,
      "prefixCls": prefixCls,
      "maxCount": maxCount2,
      "notices": notices.value,
      "remove": removeNotice,
      "getClassName": getClassName,
      "getStyles": getStyles,
      "animation": motion,
      "hashId": rootConfig.hashId,
      "onAllRemoved": onAllRemoved,
      "getContainer": getContainer2
    }, null);
    const taskQueue = /* @__PURE__ */ shallowRef([]);
    const api2 = {
      open: (config) => {
        const mergedConfig = mergeConfig(shareConfig, config);
        if (mergedConfig.key === null || mergedConfig.key === void 0) {
          mergedConfig.key = `vc-notification-${uniqueKey}`;
          uniqueKey += 1;
        }
        taskQueue.value = [...taskQueue.value, {
          type: "open",
          config: mergedConfig
        }];
      },
      close: (key2) => {
        taskQueue.value = [...taskQueue.value, {
          type: "close",
          key: key2
        }];
      },
      destroy: () => {
        taskQueue.value = [...taskQueue.value, {
          type: "destroy"
        }];
      }
    };
    watch(taskQueue, () => {
      if (taskQueue.value.length) {
        taskQueue.value.forEach((task) => {
          switch (task.type) {
            case "open":
              add(task.config);
              break;
            case "close":
              removeNotice(task.key);
              break;
            case "destroy":
              destroy();
              break;
          }
        });
        taskQueue.value = [];
      }
    });
    return [api2, contextHolder];
  }
  const genMessageStyle = (token2) => {
    const {
      componentCls,
      iconCls,
      boxShadowSecondary,
      colorBgElevated,
      colorSuccess,
      colorError,
      colorWarning,
      colorInfo,
      fontSizeLG,
      motionEaseInOutCirc,
      motionDurationSlow,
      marginXS,
      paddingXS,
      borderRadiusLG,
      zIndexPopup,
      // Custom token
      messageNoticeContentPadding
    } = token2;
    const messageMoveIn = new Keyframe("MessageMoveIn", {
      "0%": {
        padding: 0,
        transform: "translateY(-100%)",
        opacity: 0
      },
      "100%": {
        padding: paddingXS,
        transform: "translateY(0)",
        opacity: 1
      }
    });
    const messageMoveOut = new Keyframe("MessageMoveOut", {
      "0%": {
        maxHeight: token2.height,
        padding: paddingXS,
        opacity: 1
      },
      "100%": {
        maxHeight: 0,
        padding: 0,
        opacity: 0
      }
    });
    return [
      // ============================ Holder ============================
      {
        [componentCls]: _extends(_extends({}, resetComponent(token2)), {
          position: "fixed",
          top: marginXS,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          pointerEvents: "none",
          zIndex: zIndexPopup,
          [`${componentCls}-move-up`]: {
            animationFillMode: "forwards"
          },
          [`
        ${componentCls}-move-up-appear,
        ${componentCls}-move-up-enter
      `]: {
            animationName: messageMoveIn,
            animationDuration: motionDurationSlow,
            animationPlayState: "paused",
            animationTimingFunction: motionEaseInOutCirc
          },
          [`
        ${componentCls}-move-up-appear${componentCls}-move-up-appear-active,
        ${componentCls}-move-up-enter${componentCls}-move-up-enter-active
      `]: {
            animationPlayState: "running"
          },
          [`${componentCls}-move-up-leave`]: {
            animationName: messageMoveOut,
            animationDuration: motionDurationSlow,
            animationPlayState: "paused",
            animationTimingFunction: motionEaseInOutCirc
          },
          [`${componentCls}-move-up-leave${componentCls}-move-up-leave-active`]: {
            animationPlayState: "running"
          },
          "&-rtl": {
            direction: "rtl",
            span: {
              direction: "rtl"
            }
          }
        })
      },
      // ============================ Notice ============================
      {
        [`${componentCls}-notice`]: {
          padding: paddingXS,
          textAlign: "center",
          [iconCls]: {
            verticalAlign: "text-bottom",
            marginInlineEnd: marginXS,
            fontSize: fontSizeLG
          },
          [`${componentCls}-notice-content`]: {
            display: "inline-block",
            padding: messageNoticeContentPadding,
            background: colorBgElevated,
            borderRadius: borderRadiusLG,
            boxShadow: boxShadowSecondary,
            pointerEvents: "all"
          },
          [`${componentCls}-success ${iconCls}`]: {
            color: colorSuccess
          },
          [`${componentCls}-error ${iconCls}`]: {
            color: colorError
          },
          [`${componentCls}-warning ${iconCls}`]: {
            color: colorWarning
          },
          [`
        ${componentCls}-info ${iconCls},
        ${componentCls}-loading ${iconCls}`]: {
            color: colorInfo
          }
        }
      },
      // ============================= Pure =============================
      {
        [`${componentCls}-notice-pure-panel`]: {
          padding: 0,
          textAlign: "start"
        }
      }
    ];
  };
  const useStyle$5 = genComponentStyleHook("Message", (token2) => {
    const combinedToken = merge(token2, {
      messageNoticeContentPadding: `${(token2.controlHeightLG - token2.fontSize * token2.lineHeight) / 2}px ${token2.paddingSM}px`
    });
    return [genMessageStyle(combinedToken)];
  }, (token2) => ({
    height: 150,
    zIndexPopup: token2.zIndexPopupBase + 10
  }));
  const TypeIcon = {
    info: createVNode(InfoCircleFilled, null, null),
    success: createVNode(CheckCircleFilled, null, null),
    error: createVNode(CloseCircleFilled, null, null),
    warning: createVNode(ExclamationCircleFilled, null, null),
    loading: createVNode(LoadingOutlined, null, null)
  };
  const PureContent$1 = /* @__PURE__ */ defineComponent({
    name: "PureContent",
    inheritAttrs: false,
    props: ["prefixCls", "type", "icon"],
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _a;
        return createVNode("div", {
          "class": classNames(`${props.prefixCls}-custom-content`, `${props.prefixCls}-${props.type}`)
        }, [props.icon || TypeIcon[props.type], createVNode("span", null, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)])]);
      };
    }
  });
  var __rest$4 = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  const DEFAULT_OFFSET$1 = 8;
  const DEFAULT_DURATION$1 = 3;
  const Holder$1 = /* @__PURE__ */ defineComponent({
    name: "Holder",
    inheritAttrs: false,
    props: ["top", "prefixCls", "getContainer", "maxCount", "duration", "rtl", "transitionName", "onAllRemoved", "animation", "staticGetContainer"],
    setup(props, _ref) {
      let {
        expose
      } = _ref;
      var _a, _b;
      const {
        getPrefixCls,
        getPopupContainer
      } = useConfigInject("message", props);
      const prefixCls = computed(() => getPrefixCls("message", props.prefixCls));
      const [, hashId] = useStyle$5(prefixCls);
      const getStyles = () => {
        var _a2;
        const top = (_a2 = props.top) !== null && _a2 !== void 0 ? _a2 : DEFAULT_OFFSET$1;
        return {
          left: "50%",
          transform: "translateX(-50%)",
          top: typeof top === "number" ? `${top}px` : top
        };
      };
      const getClassName = () => classNames(hashId.value, props.rtl ? `${prefixCls.value}-rtl` : "");
      const getNotificationMotion = () => {
        var _a2;
        return getMotion$1({
          prefixCls: prefixCls.value,
          animation: (_a2 = props.animation) !== null && _a2 !== void 0 ? _a2 : `move-up`,
          transitionName: props.transitionName
        });
      };
      const mergedCloseIcon = createVNode("span", {
        "class": `${prefixCls.value}-close-x`
      }, [createVNode(CloseOutlined, {
        "class": `${prefixCls.value}-close-icon`
      }, null)]);
      const [api2, holder] = useNotification$1({
        //@ts-ignore
        getStyles,
        prefixCls: prefixCls.value,
        getClassName,
        motion: getNotificationMotion,
        closable: false,
        closeIcon: mergedCloseIcon,
        duration: (_a = props.duration) !== null && _a !== void 0 ? _a : DEFAULT_DURATION$1,
        getContainer: (_b = props.staticGetContainer) !== null && _b !== void 0 ? _b : getPopupContainer.value,
        maxCount: props.maxCount,
        onAllRemoved: props.onAllRemoved
      });
      expose(_extends(_extends({}, api2), {
        prefixCls,
        hashId
      }));
      return holder;
    }
  });
  let keyIndex = 0;
  function useInternalMessage(messageConfig) {
    const holderRef = /* @__PURE__ */ shallowRef(null);
    const holderKey = Symbol("messageHolderKey");
    const close2 = (key2) => {
      var _a;
      (_a = holderRef.value) === null || _a === void 0 ? void 0 : _a.close(key2);
    };
    const open2 = (config) => {
      if (!holderRef.value) {
        const fakeResult = () => {
        };
        fakeResult.then = () => {
        };
        return fakeResult;
      }
      const {
        open: originOpen,
        prefixCls,
        hashId
      } = holderRef.value;
      const noticePrefixCls = `${prefixCls}-notice`;
      const {
        content: content2,
        icon,
        type,
        key: key2,
        class: className,
        onClose
      } = config, restConfig = __rest$4(config, ["content", "icon", "type", "key", "class", "onClose"]);
      let mergedKey = key2;
      if (mergedKey === void 0 || mergedKey === null) {
        keyIndex += 1;
        mergedKey = `antd-message-${keyIndex}`;
      }
      return wrapPromiseFn((resolve) => {
        originOpen(_extends(_extends({}, restConfig), {
          key: mergedKey,
          content: () => createVNode(PureContent$1, {
            "prefixCls": prefixCls,
            "type": type,
            "icon": typeof icon === "function" ? icon() : icon
          }, {
            default: () => [typeof content2 === "function" ? content2() : content2]
          }),
          placement: "top",
          // @ts-ignore
          class: classNames(type && `${noticePrefixCls}-${type}`, hashId, className),
          onClose: () => {
            onClose === null || onClose === void 0 ? void 0 : onClose();
            resolve();
          }
        }));
        return () => {
          close2(mergedKey);
        };
      });
    };
    const destroy = (key2) => {
      var _a;
      if (key2 !== void 0) {
        close2(key2);
      } else {
        (_a = holderRef.value) === null || _a === void 0 ? void 0 : _a.destroy();
      }
    };
    const wrapAPI = {
      open: open2,
      destroy
    };
    const keys = ["info", "success", "warning", "error", "loading"];
    keys.forEach((type) => {
      const typeOpen = (jointContent, duration, onClose) => {
        let config;
        if (jointContent && typeof jointContent === "object" && "content" in jointContent) {
          config = jointContent;
        } else {
          config = {
            content: jointContent
          };
        }
        let mergedDuration;
        let mergedOnClose;
        if (typeof duration === "function") {
          mergedOnClose = duration;
        } else {
          mergedDuration = duration;
          mergedOnClose = onClose;
        }
        const mergedConfig = _extends(_extends({
          onClose: mergedOnClose,
          duration: mergedDuration
        }, config), {
          type
        });
        return open2(mergedConfig);
      };
      wrapAPI[type] = typeOpen;
    });
    return [wrapAPI, () => createVNode(Holder$1, _objectSpread2(_objectSpread2({
      "key": holderKey
    }, messageConfig), {}, {
      "ref": holderRef
    }), null)];
  }
  function useMessage(messageConfig) {
    return useInternalMessage(messageConfig);
  }
  let defaultDuration$1 = 3;
  let defaultTop$1;
  let messageInstance;
  let key = 1;
  let localPrefixCls = "";
  let transitionName = "move-up";
  let hasTransitionName = false;
  let getContainer = () => document.body;
  let maxCount$1;
  let rtl$1 = false;
  function getKeyThenIncreaseKey() {
    return key++;
  }
  function setMessageConfig(options) {
    if (options.top !== void 0) {
      defaultTop$1 = options.top;
      messageInstance = null;
    }
    if (options.duration !== void 0) {
      defaultDuration$1 = options.duration;
    }
    if (options.prefixCls !== void 0) {
      localPrefixCls = options.prefixCls;
    }
    if (options.getContainer !== void 0) {
      getContainer = options.getContainer;
      messageInstance = null;
    }
    if (options.transitionName !== void 0) {
      transitionName = options.transitionName;
      messageInstance = null;
      hasTransitionName = true;
    }
    if (options.maxCount !== void 0) {
      maxCount$1 = options.maxCount;
      messageInstance = null;
    }
    if (options.rtl !== void 0) {
      rtl$1 = options.rtl;
    }
  }
  function getMessageInstance(args, callback) {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }
    Notification$1.newInstance({
      appContext: args.appContext,
      prefixCls: args.prefixCls || localPrefixCls,
      rootPrefixCls: args.rootPrefixCls,
      transitionName,
      hasTransitionName,
      style: {
        top: defaultTop$1
      },
      getContainer: getContainer || args.getPopupContainer,
      maxCount: maxCount$1,
      name: "message",
      useStyle: useStyle$5
    }, (instance) => {
      if (messageInstance) {
        callback(messageInstance);
        return;
      }
      messageInstance = instance;
      callback(instance);
    });
  }
  const typeToIcon$2 = {
    info: InfoCircleFilled,
    success: CheckCircleFilled,
    error: CloseCircleFilled,
    warning: ExclamationCircleFilled,
    loading: LoadingOutlined
  };
  const typeList = Object.keys(typeToIcon$2);
  function notice$1(args) {
    const duration = args.duration !== void 0 ? args.duration : defaultDuration$1;
    const target = args.key || getKeyThenIncreaseKey();
    const closePromise = new Promise((resolve) => {
      const callback = () => {
        if (typeof args.onClose === "function") {
          args.onClose();
        }
        return resolve(true);
      };
      getMessageInstance(args, (instance) => {
        instance.notice({
          key: target,
          duration,
          style: args.style || {},
          class: args.class,
          content: (_ref) => {
            let {
              prefixCls
            } = _ref;
            const Icon2 = typeToIcon$2[args.type];
            const iconNode = Icon2 ? createVNode(Icon2, null, null) : "";
            const messageClass = classNames(`${prefixCls}-custom-content`, {
              [`${prefixCls}-${args.type}`]: args.type,
              [`${prefixCls}-rtl`]: rtl$1 === true
            });
            return createVNode("div", {
              "class": messageClass
            }, [typeof args.icon === "function" ? args.icon() : args.icon || iconNode, createVNode("span", null, [typeof args.content === "function" ? args.content() : args.content])]);
          },
          onClose: callback,
          onClick: args.onClick
        });
      });
    });
    const result2 = () => {
      if (messageInstance) {
        messageInstance.removeNotice(target);
      }
    };
    result2.then = (filled, rejected) => closePromise.then(filled, rejected);
    result2.promise = closePromise;
    return result2;
  }
  function isArgsProps(content2) {
    return Object.prototype.toString.call(content2) === "[object Object]" && !!content2.content;
  }
  const api$1 = {
    open: notice$1,
    config: setMessageConfig,
    destroy(messageKey) {
      if (messageInstance) {
        if (messageKey) {
          const {
            removeNotice
          } = messageInstance;
          removeNotice(messageKey);
        } else {
          const {
            destroy
          } = messageInstance;
          destroy();
          messageInstance = null;
        }
      }
    }
  };
  function attachTypeApi(originalApi, type) {
    originalApi[type] = (content2, duration, onClose) => {
      if (isArgsProps(content2)) {
        return originalApi.open(_extends(_extends({}, content2), {
          type
        }));
      }
      if (typeof duration === "function") {
        onClose = duration;
        duration = void 0;
      }
      return originalApi.open({
        content: content2,
        duration,
        type,
        onClose
      });
    };
  }
  typeList.forEach((type) => attachTypeApi(api$1, type));
  api$1.warn = api$1.warning;
  api$1.useMessage = useMessage;
  const genNotificationPlacementStyle = (token2) => {
    const {
      componentCls,
      width,
      notificationMarginEdge
    } = token2;
    const notificationTopFadeIn = new Keyframe("antNotificationTopFadeIn", {
      "0%": {
        marginTop: "-100%",
        opacity: 0
      },
      "100%": {
        marginTop: 0,
        opacity: 1
      }
    });
    const notificationBottomFadeIn = new Keyframe("antNotificationBottomFadeIn", {
      "0%": {
        marginBottom: "-100%",
        opacity: 0
      },
      "100%": {
        marginBottom: 0,
        opacity: 1
      }
    });
    const notificationLeftFadeIn = new Keyframe("antNotificationLeftFadeIn", {
      "0%": {
        right: {
          _skip_check_: true,
          value: width
        },
        opacity: 0
      },
      "100%": {
        right: {
          _skip_check_: true,
          value: 0
        },
        opacity: 1
      }
    });
    return {
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        marginInline: 0
      },
      [`&${componentCls}-top`]: {
        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
          animationName: notificationTopFadeIn
        }
      },
      [`&${componentCls}-bottom`]: {
        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
          animationName: notificationBottomFadeIn
        }
      },
      [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
        marginInlineEnd: 0,
        marginInlineStart: notificationMarginEdge,
        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
          animationName: notificationLeftFadeIn
        }
      }
    };
  };
  const genNotificationStyle = (token2) => {
    const {
      iconCls,
      componentCls,
      // .ant-notification
      boxShadowSecondary,
      fontSizeLG,
      notificationMarginBottom,
      borderRadiusLG,
      colorSuccess,
      colorInfo,
      colorWarning,
      colorError,
      colorTextHeading,
      notificationBg,
      notificationPadding,
      notificationMarginEdge,
      motionDurationMid,
      motionEaseInOut,
      fontSize,
      lineHeight,
      width,
      notificationIconSize
    } = token2;
    const noticeCls = `${componentCls}-notice`;
    const notificationFadeIn = new Keyframe("antNotificationFadeIn", {
      "0%": {
        left: {
          _skip_check_: true,
          value: width
        },
        opacity: 0
      },
      "100%": {
        left: {
          _skip_check_: true,
          value: 0
        },
        opacity: 1
      }
    });
    const notificationFadeOut = new Keyframe("antNotificationFadeOut", {
      "0%": {
        maxHeight: token2.animationMaxHeight,
        marginBottom: notificationMarginBottom,
        opacity: 1
      },
      "100%": {
        maxHeight: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0
      }
    });
    return [
      // ============================ Holder ============================
      {
        [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token2)), {
          position: "fixed",
          zIndex: token2.zIndexPopup,
          marginInlineEnd: notificationMarginEdge,
          [`${componentCls}-hook-holder`]: {
            position: "relative"
          },
          [`&${componentCls}-top, &${componentCls}-bottom`]: {
            [`${componentCls}-notice`]: {
              marginInline: "auto auto"
            }
          },
          [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
            [`${componentCls}-notice`]: {
              marginInlineEnd: "auto",
              marginInlineStart: 0
            }
          },
          //  animation
          [`${componentCls}-fade-enter, ${componentCls}-fade-appear`]: {
            animationDuration: token2.motionDurationMid,
            animationTimingFunction: motionEaseInOut,
            animationFillMode: "both",
            opacity: 0,
            animationPlayState: "paused"
          },
          [`${componentCls}-fade-leave`]: {
            animationTimingFunction: motionEaseInOut,
            animationFillMode: "both",
            animationDuration: motionDurationMid,
            animationPlayState: "paused"
          },
          [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
            animationName: notificationFadeIn,
            animationPlayState: "running"
          },
          [`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
            animationName: notificationFadeOut,
            animationPlayState: "running"
          }
        }), genNotificationPlacementStyle(token2)), {
          // RTL
          "&-rtl": {
            direction: "rtl",
            [`${componentCls}-notice-btn`]: {
              float: "left"
            }
          }
        })
      },
      // ============================ Notice ============================
      {
        [noticeCls]: {
          position: "relative",
          width,
          maxWidth: `calc(100vw - ${notificationMarginEdge * 2}px)`,
          marginBottom: notificationMarginBottom,
          marginInlineStart: "auto",
          padding: notificationPadding,
          overflow: "hidden",
          lineHeight,
          wordWrap: "break-word",
          background: notificationBg,
          borderRadius: borderRadiusLG,
          boxShadow: boxShadowSecondary,
          [`${componentCls}-close-icon`]: {
            fontSize,
            cursor: "pointer"
          },
          [`${noticeCls}-message`]: {
            marginBottom: token2.marginXS,
            color: colorTextHeading,
            fontSize: fontSizeLG,
            lineHeight: token2.lineHeightLG
          },
          [`${noticeCls}-description`]: {
            fontSize
          },
          [`&${noticeCls}-closable ${noticeCls}-message`]: {
            paddingInlineEnd: token2.paddingLG
          },
          [`${noticeCls}-with-icon ${noticeCls}-message`]: {
            marginBottom: token2.marginXS,
            marginInlineStart: token2.marginSM + notificationIconSize,
            fontSize: fontSizeLG
          },
          [`${noticeCls}-with-icon ${noticeCls}-description`]: {
            marginInlineStart: token2.marginSM + notificationIconSize,
            fontSize
          },
          // Icon & color style in different selector level
          // https://github.com/ant-design/ant-design/issues/16503
          // https://github.com/ant-design/ant-design/issues/15512
          [`${noticeCls}-icon`]: {
            position: "absolute",
            fontSize: notificationIconSize,
            lineHeight: 0,
            // icon-font
            [`&-success${iconCls}`]: {
              color: colorSuccess
            },
            [`&-info${iconCls}`]: {
              color: colorInfo
            },
            [`&-warning${iconCls}`]: {
              color: colorWarning
            },
            [`&-error${iconCls}`]: {
              color: colorError
            }
          },
          [`${noticeCls}-close`]: {
            position: "absolute",
            top: token2.notificationPaddingVertical,
            insetInlineEnd: token2.notificationPaddingHorizontal,
            color: token2.colorIcon,
            outline: "none",
            width: token2.notificationCloseButtonSize,
            height: token2.notificationCloseButtonSize,
            borderRadius: token2.borderRadiusSM,
            transition: `background-color ${token2.motionDurationMid}, color ${token2.motionDurationMid}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              color: token2.colorIconHover,
              backgroundColor: token2.wireframe ? "transparent" : token2.colorFillContent
            }
          },
          [`${noticeCls}-btn`]: {
            float: "right",
            marginTop: token2.marginSM
          }
        }
      },
      // ============================= Pure =============================
      {
        [`${noticeCls}-pure-panel`]: {
          margin: 0
        }
      }
    ];
  };
  const useStyle$4 = genComponentStyleHook("Notification", (token2) => {
    const notificationPaddingVertical = token2.paddingMD;
    const notificationPaddingHorizontal = token2.paddingLG;
    const notificationToken = merge(token2, {
      // default.less variables
      notificationBg: token2.colorBgElevated,
      notificationPaddingVertical,
      notificationPaddingHorizontal,
      // index.less variables
      notificationPadding: `${token2.paddingMD}px ${token2.paddingContentHorizontalLG}px`,
      notificationMarginBottom: token2.margin,
      notificationMarginEdge: token2.marginLG,
      animationMaxHeight: 150,
      notificationIconSize: token2.fontSizeLG * token2.lineHeightLG,
      notificationCloseButtonSize: token2.controlHeightLG * 0.55
    });
    return [genNotificationStyle(notificationToken)];
  }, (token2) => ({
    zIndexPopup: token2.zIndexPopupBase + 50,
    width: 384
  }));
  function getCloseIcon(prefixCls, closeIcon) {
    return closeIcon || createVNode("span", {
      "class": `${prefixCls}-close-x`
    }, [createVNode(CloseOutlined, {
      "class": `${prefixCls}-close-icon`
    }, null)]);
  }
  ({
    info: createVNode(InfoCircleFilled, null, null),
    success: createVNode(CheckCircleFilled, null, null),
    error: createVNode(CloseCircleFilled, null, null),
    warning: createVNode(ExclamationCircleFilled, null, null),
    loading: createVNode(LoadingOutlined, null, null)
  });
  const typeToIcon$1 = {
    success: CheckCircleFilled,
    info: InfoCircleFilled,
    error: CloseCircleFilled,
    warning: ExclamationCircleFilled
  };
  function PureContent(_ref) {
    let {
      prefixCls,
      icon,
      type,
      message,
      description,
      btn
    } = _ref;
    let iconNode = null;
    if (icon) {
      iconNode = createVNode("span", {
        "class": `${prefixCls}-icon`
      }, [renderHelper(icon)]);
    } else if (type) {
      const Icon2 = typeToIcon$1[type];
      iconNode = createVNode(Icon2, {
        "class": `${prefixCls}-icon ${prefixCls}-icon-${type}`
      }, null);
    }
    return createVNode("div", {
      "class": classNames({
        [`${prefixCls}-with-icon`]: iconNode
      }),
      "role": "alert"
    }, [iconNode, createVNode("div", {
      "class": `${prefixCls}-message`
    }, [message]), createVNode("div", {
      "class": `${prefixCls}-description`
    }, [description]), btn && createVNode("div", {
      "class": `${prefixCls}-btn`
    }, [btn])]);
  }
  function getPlacementStyle(placement, top, bottom) {
    let style;
    top = typeof top === "number" ? `${top}px` : top;
    bottom = typeof bottom === "number" ? `${bottom}px` : bottom;
    switch (placement) {
      case "top":
        style = {
          left: "50%",
          transform: "translateX(-50%)",
          right: "auto",
          top,
          bottom: "auto"
        };
        break;
      case "topLeft":
        style = {
          left: 0,
          top,
          bottom: "auto"
        };
        break;
      case "topRight":
        style = {
          right: 0,
          top,
          bottom: "auto"
        };
        break;
      case "bottom":
        style = {
          left: "50%",
          transform: "translateX(-50%)",
          right: "auto",
          top: "auto",
          bottom
        };
        break;
      case "bottomLeft":
        style = {
          left: 0,
          top: "auto",
          bottom
        };
        break;
      default:
        style = {
          right: 0,
          top: "auto",
          bottom
        };
        break;
    }
    return style;
  }
  function getMotion(prefixCls) {
    return {
      name: `${prefixCls}-fade`
    };
  }
  var __rest$3 = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  const DEFAULT_OFFSET = 24;
  const DEFAULT_DURATION = 4.5;
  const Holder = /* @__PURE__ */ defineComponent({
    name: "Holder",
    inheritAttrs: false,
    props: ["prefixCls", "class", "type", "icon", "content", "onAllRemoved"],
    setup(props, _ref) {
      let {
        expose
      } = _ref;
      const {
        getPrefixCls,
        getPopupContainer
      } = useConfigInject("notification", props);
      const prefixCls = computed(() => props.prefixCls || getPrefixCls("notification"));
      const getStyles = (placement) => {
        var _a, _b;
        return getPlacementStyle(placement, (_a = props.top) !== null && _a !== void 0 ? _a : DEFAULT_OFFSET, (_b = props.bottom) !== null && _b !== void 0 ? _b : DEFAULT_OFFSET);
      };
      const [, hashId] = useStyle$4(prefixCls);
      const getClassName = () => classNames(hashId.value, {
        [`${prefixCls.value}-rtl`]: props.rtl
      });
      const getNotificationMotion = () => getMotion(prefixCls.value);
      const [api2, holder] = useNotification$1({
        prefixCls: prefixCls.value,
        getStyles,
        getClassName,
        motion: getNotificationMotion,
        closable: true,
        closeIcon: getCloseIcon(prefixCls.value),
        duration: DEFAULT_DURATION,
        getContainer: () => {
          var _a, _b;
          return ((_a = props.getPopupContainer) === null || _a === void 0 ? void 0 : _a.call(props)) || ((_b = getPopupContainer.value) === null || _b === void 0 ? void 0 : _b.call(getPopupContainer)) || document.body;
        },
        maxCount: props.maxCount,
        hashId: hashId.value,
        onAllRemoved: props.onAllRemoved
      });
      expose(_extends(_extends({}, api2), {
        prefixCls: prefixCls.value,
        hashId
      }));
      return holder;
    }
  });
  function useInternalNotification(notificationConfig) {
    const holderRef = /* @__PURE__ */ shallowRef(null);
    const holderKey = Symbol("notificationHolderKey");
    const open2 = (config) => {
      if (!holderRef.value) {
        return;
      }
      const {
        open: originOpen,
        prefixCls,
        hashId
      } = holderRef.value;
      const noticePrefixCls = `${prefixCls}-notice`;
      const {
        message,
        description,
        icon,
        type,
        btn,
        class: className
      } = config, restConfig = __rest$3(config, ["message", "description", "icon", "type", "btn", "class"]);
      return originOpen(_extends(_extends({
        placement: "topRight"
      }, restConfig), {
        content: () => createVNode(PureContent, {
          "prefixCls": noticePrefixCls,
          "icon": typeof icon === "function" ? icon() : icon,
          "type": type,
          "message": typeof message === "function" ? message() : message,
          "description": typeof description === "function" ? description() : description,
          "btn": typeof btn === "function" ? btn() : btn
        }, null),
        // @ts-ignore
        class: classNames(type && `${noticePrefixCls}-${type}`, hashId, className)
      }));
    };
    const destroy = (key2) => {
      var _a, _b;
      if (key2 !== void 0) {
        (_a = holderRef.value) === null || _a === void 0 ? void 0 : _a.close(key2);
      } else {
        (_b = holderRef.value) === null || _b === void 0 ? void 0 : _b.destroy();
      }
    };
    const wrapAPI = {
      open: open2,
      destroy
    };
    const keys = ["success", "info", "warning", "error"];
    keys.forEach((type) => {
      wrapAPI[type] = (config) => open2(_extends(_extends({}, config), {
        type
      }));
    });
    return [wrapAPI, () => createVNode(Holder, _objectSpread2(_objectSpread2({
      "key": holderKey
    }, notificationConfig), {}, {
      "ref": holderRef
    }), null)];
  }
  function useNotification(notificationConfig) {
    return useInternalNotification(notificationConfig);
  }
  const notificationInstance = {};
  let defaultDuration = 4.5;
  let defaultTop = "24px";
  let defaultBottom = "24px";
  let defaultPrefixCls$1 = "";
  let defaultPlacement = "topRight";
  let defaultGetContainer = () => document.body;
  let defaultCloseIcon = null;
  let rtl = false;
  let maxCount;
  function setNotificationConfig(options) {
    const {
      duration,
      placement,
      bottom,
      top,
      getContainer: getContainer2,
      closeIcon,
      prefixCls
    } = options;
    if (prefixCls !== void 0) {
      defaultPrefixCls$1 = prefixCls;
    }
    if (duration !== void 0) {
      defaultDuration = duration;
    }
    if (placement !== void 0) {
      defaultPlacement = placement;
    }
    if (bottom !== void 0) {
      defaultBottom = typeof bottom === "number" ? `${bottom}px` : bottom;
    }
    if (top !== void 0) {
      defaultTop = typeof top === "number" ? `${top}px` : top;
    }
    if (getContainer2 !== void 0) {
      defaultGetContainer = getContainer2;
    }
    if (closeIcon !== void 0) {
      defaultCloseIcon = closeIcon;
    }
    if (options.rtl !== void 0) {
      rtl = options.rtl;
    }
    if (options.maxCount !== void 0) {
      maxCount = options.maxCount;
    }
  }
  function getNotificationInstance(_ref, callback) {
    let {
      prefixCls: customizePrefixCls,
      placement = defaultPlacement,
      getContainer: getContainer2 = defaultGetContainer,
      top,
      bottom,
      closeIcon = defaultCloseIcon,
      appContext
    } = _ref;
    const {
      getPrefixCls
    } = globalConfig();
    const prefixCls = getPrefixCls("notification", customizePrefixCls || defaultPrefixCls$1);
    const cacheKey = `${prefixCls}-${placement}-${rtl}`;
    const cacheInstance = notificationInstance[cacheKey];
    if (cacheInstance) {
      Promise.resolve(cacheInstance).then((instance) => {
        callback(instance);
      });
      return;
    }
    const notificationClass = classNames(`${prefixCls}-${placement}`, {
      [`${prefixCls}-rtl`]: rtl === true
    });
    Notification$1.newInstance({
      name: "notification",
      prefixCls: customizePrefixCls || defaultPrefixCls$1,
      useStyle: useStyle$4,
      class: notificationClass,
      style: getPlacementStyle(placement, top !== null && top !== void 0 ? top : defaultTop, bottom !== null && bottom !== void 0 ? bottom : defaultBottom),
      appContext,
      getContainer: getContainer2,
      closeIcon: (_ref2) => {
        let {
          prefixCls: prefixCls2
        } = _ref2;
        const closeIconToRender = createVNode("span", {
          "class": `${prefixCls2}-close-x`
        }, [renderHelper(closeIcon, {}, createVNode(CloseOutlined, {
          "class": `${prefixCls2}-close-icon`
        }, null))]);
        return closeIconToRender;
      },
      maxCount,
      hasTransitionName: true
    }, (notification) => {
      notificationInstance[cacheKey] = notification;
      callback(notification);
    });
  }
  const typeToIcon = {
    success: CheckCircleOutlined,
    info: InfoCircleOutlined,
    error: CloseCircleOutlined,
    warning: ExclamationCircleOutlined
  };
  function notice(args) {
    const {
      icon,
      type,
      description,
      message,
      btn
    } = args;
    const duration = args.duration === void 0 ? defaultDuration : args.duration;
    getNotificationInstance(args, (notification) => {
      notification.notice({
        content: (_ref3) => {
          let {
            prefixCls: outerPrefixCls
          } = _ref3;
          const prefixCls = `${outerPrefixCls}-notice`;
          let iconNode = null;
          if (icon) {
            iconNode = () => createVNode("span", {
              "class": `${prefixCls}-icon`
            }, [renderHelper(icon)]);
          } else if (type) {
            const Icon2 = typeToIcon[type];
            iconNode = () => createVNode(Icon2, {
              "class": `${prefixCls}-icon ${prefixCls}-icon-${type}`
            }, null);
          }
          return createVNode("div", {
            "class": iconNode ? `${prefixCls}-with-icon` : ""
          }, [iconNode && iconNode(), createVNode("div", {
            "class": `${prefixCls}-message`
          }, [!description && iconNode ? createVNode("span", {
            "class": `${prefixCls}-message-single-line-auto-margin`
          }, null) : null, renderHelper(message)]), createVNode("div", {
            "class": `${prefixCls}-description`
          }, [renderHelper(description)]), btn ? createVNode("span", {
            "class": `${prefixCls}-btn`
          }, [renderHelper(btn)]) : null]);
        },
        duration,
        closable: true,
        onClose: args.onClose,
        onClick: args.onClick,
        key: args.key,
        style: args.style || {},
        class: args.class
      });
    });
  }
  const api = {
    open: notice,
    close(key2) {
      Object.keys(notificationInstance).forEach((cacheKey) => Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
        instance.removeNotice(key2);
      }));
    },
    config: setNotificationConfig,
    destroy() {
      Object.keys(notificationInstance).forEach((cacheKey) => {
        Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
          instance.destroy();
        });
        delete notificationInstance[cacheKey];
      });
    }
  };
  const iconTypes = ["success", "info", "warning", "error"];
  iconTypes.forEach((type) => {
    api[type] = (args) => api.open(_extends(_extends({}, args), {
      type
    }));
  });
  api.warn = api.warning;
  api.useNotification = useNotification;
  const dynamicStyleMark = `-ant-${Date.now()}-${Math.random()}`;
  function getStyle(globalPrefixCls, theme) {
    const variables = {};
    const formatColor = (color, updater) => {
      let clone = color.clone();
      clone = (updater === null || updater === void 0 ? void 0 : updater(clone)) || clone;
      return clone.toRgbString();
    };
    const fillColor = (colorVal, type) => {
      const baseColor = new TinyColor(colorVal);
      const colorPalettes = generate$2(baseColor.toRgbString());
      variables[`${type}-color`] = formatColor(baseColor);
      variables[`${type}-color-disabled`] = colorPalettes[1];
      variables[`${type}-color-hover`] = colorPalettes[4];
      variables[`${type}-color-active`] = colorPalettes[6];
      variables[`${type}-color-outline`] = baseColor.clone().setAlpha(0.2).toRgbString();
      variables[`${type}-color-deprecated-bg`] = colorPalettes[0];
      variables[`${type}-color-deprecated-border`] = colorPalettes[2];
    };
    if (theme.primaryColor) {
      fillColor(theme.primaryColor, "primary");
      const primaryColor = new TinyColor(theme.primaryColor);
      const primaryColors = generate$2(primaryColor.toRgbString());
      primaryColors.forEach((color, index) => {
        variables[`primary-${index + 1}`] = color;
      });
      variables["primary-color-deprecated-l-35"] = formatColor(primaryColor, (c2) => c2.lighten(35));
      variables["primary-color-deprecated-l-20"] = formatColor(primaryColor, (c2) => c2.lighten(20));
      variables["primary-color-deprecated-t-20"] = formatColor(primaryColor, (c2) => c2.tint(20));
      variables["primary-color-deprecated-t-50"] = formatColor(primaryColor, (c2) => c2.tint(50));
      variables["primary-color-deprecated-f-12"] = formatColor(primaryColor, (c2) => c2.setAlpha(c2.getAlpha() * 0.12));
      const primaryActiveColor = new TinyColor(primaryColors[0]);
      variables["primary-color-active-deprecated-f-30"] = formatColor(primaryActiveColor, (c2) => c2.setAlpha(c2.getAlpha() * 0.3));
      variables["primary-color-active-deprecated-d-02"] = formatColor(primaryActiveColor, (c2) => c2.darken(2));
    }
    if (theme.successColor) {
      fillColor(theme.successColor, "success");
    }
    if (theme.warningColor) {
      fillColor(theme.warningColor, "warning");
    }
    if (theme.errorColor) {
      fillColor(theme.errorColor, "error");
    }
    if (theme.infoColor) {
      fillColor(theme.infoColor, "info");
    }
    const cssList = Object.keys(variables).map((key2) => `--${globalPrefixCls}-${key2}: ${variables[key2]};`);
    return `
  :root {
    ${cssList.join("\n")}
  }
  `.trim();
  }
  function registerTheme(globalPrefixCls, theme) {
    const style = getStyle(globalPrefixCls, theme);
    if (canUseDom$1()) {
      updateCSS$1(style, `${dynamicStyleMark}-dynamic-theme`);
    } else {
      warning$1(false, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
    }
  }
  const useStyle$3 = (iconPrefixCls) => {
    const [theme, token2] = useToken();
    return useStyleRegister(computed(() => ({
      theme: theme.value,
      token: token2.value,
      hashId: "",
      path: ["ant-design-icons", iconPrefixCls.value]
    })), () => [{
      [`.${iconPrefixCls.value}`]: _extends(_extends({}, resetIcon()), {
        [`.${iconPrefixCls.value} .${iconPrefixCls.value}-icon`]: {
          display: "block"
        }
      })
    }]);
  };
  function useTheme(theme, parentTheme) {
    const themeConfig = computed(() => (theme === null || theme === void 0 ? void 0 : theme.value) || {});
    const parentThemeConfig = computed(() => themeConfig.value.inherit === false || !(parentTheme === null || parentTheme === void 0 ? void 0 : parentTheme.value) ? defaultConfig : parentTheme.value);
    const mergedTheme = computed(() => {
      if (!(theme === null || theme === void 0 ? void 0 : theme.value)) {
        return parentTheme === null || parentTheme === void 0 ? void 0 : parentTheme.value;
      }
      const mergedComponents = _extends({}, parentThemeConfig.value.components);
      Object.keys(theme.value.components || {}).forEach((componentName) => {
        mergedComponents[componentName] = _extends(_extends({}, mergedComponents[componentName]), theme.value.components[componentName]);
      });
      return _extends(_extends(_extends({}, parentThemeConfig.value), themeConfig.value), {
        token: _extends(_extends({}, parentThemeConfig.value.token), themeConfig.value.token),
        components: mergedComponents
      });
    });
    return mergedTheme;
  }
  var __rest$2 = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  const defaultPrefixCls = "ant";
  function getGlobalPrefixCls() {
    return globalConfigForApi.prefixCls || defaultPrefixCls;
  }
  function getGlobalIconPrefixCls() {
    return globalConfigForApi.iconPrefixCls || defaultIconPrefixCls;
  }
  const globalConfigBySet = /* @__PURE__ */ reactive({});
  const globalConfigForApi = /* @__PURE__ */ reactive({});
  watchEffect(() => {
    _extends(globalConfigForApi, globalConfigBySet);
    globalConfigForApi.prefixCls = getGlobalPrefixCls();
    globalConfigForApi.iconPrefixCls = getGlobalIconPrefixCls();
    globalConfigForApi.getPrefixCls = (suffixCls, customizePrefixCls) => {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? `${globalConfigForApi.prefixCls}-${suffixCls}` : globalConfigForApi.prefixCls;
    };
    globalConfigForApi.getRootPrefixCls = () => {
      if (globalConfigForApi.prefixCls) {
        return globalConfigForApi.prefixCls;
      }
      return getGlobalPrefixCls();
    };
  });
  let stopWatchEffect;
  const setGlobalConfig = (params) => {
    if (stopWatchEffect) {
      stopWatchEffect();
    }
    stopWatchEffect = watchEffect(() => {
      _extends(globalConfigBySet, /* @__PURE__ */ reactive(params));
      _extends(globalConfigForApi, /* @__PURE__ */ reactive(params));
    });
    if (params.theme) {
      registerTheme(getGlobalPrefixCls(), params.theme);
    }
  };
  const globalConfig = () => ({
    getPrefixCls: (suffixCls, customizePrefixCls) => {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
    },
    getIconPrefixCls: getGlobalIconPrefixCls,
    getRootPrefixCls: () => {
      if (globalConfigForApi.prefixCls) {
        return globalConfigForApi.prefixCls;
      }
      return getGlobalPrefixCls();
    }
  });
  const ConfigProvider = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "AConfigProvider",
    inheritAttrs: false,
    props: configProviderProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const parentContext = useConfigContextInject();
      const getPrefixCls = (suffixCls, customizePrefixCls) => {
        const {
          prefixCls = "ant"
        } = props;
        if (customizePrefixCls) return customizePrefixCls;
        const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");
        return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
      };
      const iconPrefixCls = computed(() => props.iconPrefixCls || parentContext.iconPrefixCls.value || defaultIconPrefixCls);
      const shouldWrapSSR = computed(() => iconPrefixCls.value !== parentContext.iconPrefixCls.value);
      const csp = computed(() => {
        var _a;
        return props.csp || ((_a = parentContext.csp) === null || _a === void 0 ? void 0 : _a.value);
      });
      const wrapSSR = useStyle$3(iconPrefixCls);
      const mergedTheme = useTheme(computed(() => props.theme), computed(() => {
        var _a;
        return (_a = parentContext.theme) === null || _a === void 0 ? void 0 : _a.value;
      }));
      const renderEmptyComponent = (name) => {
        const renderEmpty$1 = props.renderEmpty || slots.renderEmpty || parentContext.renderEmpty || renderEmpty;
        return renderEmpty$1(name);
      };
      const autoInsertSpaceInButton = computed(() => {
        var _a, _b;
        return (_a = props.autoInsertSpaceInButton) !== null && _a !== void 0 ? _a : (_b = parentContext.autoInsertSpaceInButton) === null || _b === void 0 ? void 0 : _b.value;
      });
      const locale$12 = computed(() => {
        var _a;
        return props.locale || ((_a = parentContext.locale) === null || _a === void 0 ? void 0 : _a.value);
      });
      watch(locale$12, () => {
        globalConfigBySet.locale = locale$12.value;
      }, {
        immediate: true
      });
      const direction = computed(() => {
        var _a;
        return props.direction || ((_a = parentContext.direction) === null || _a === void 0 ? void 0 : _a.value);
      });
      const space = computed(() => {
        var _a, _b;
        return (_a = props.space) !== null && _a !== void 0 ? _a : (_b = parentContext.space) === null || _b === void 0 ? void 0 : _b.value;
      });
      const virtual = computed(() => {
        var _a, _b;
        return (_a = props.virtual) !== null && _a !== void 0 ? _a : (_b = parentContext.virtual) === null || _b === void 0 ? void 0 : _b.value;
      });
      const dropdownMatchSelectWidth = computed(() => {
        var _a, _b;
        return (_a = props.dropdownMatchSelectWidth) !== null && _a !== void 0 ? _a : (_b = parentContext.dropdownMatchSelectWidth) === null || _b === void 0 ? void 0 : _b.value;
      });
      const getTargetContainer = computed(() => {
        var _a;
        return props.getTargetContainer !== void 0 ? props.getTargetContainer : (_a = parentContext.getTargetContainer) === null || _a === void 0 ? void 0 : _a.value;
      });
      const getPopupContainer = computed(() => {
        var _a;
        return props.getPopupContainer !== void 0 ? props.getPopupContainer : (_a = parentContext.getPopupContainer) === null || _a === void 0 ? void 0 : _a.value;
      });
      const pageHeader = computed(() => {
        var _a;
        return props.pageHeader !== void 0 ? props.pageHeader : (_a = parentContext.pageHeader) === null || _a === void 0 ? void 0 : _a.value;
      });
      const input = computed(() => {
        var _a;
        return props.input !== void 0 ? props.input : (_a = parentContext.input) === null || _a === void 0 ? void 0 : _a.value;
      });
      const pagination = computed(() => {
        var _a;
        return props.pagination !== void 0 ? props.pagination : (_a = parentContext.pagination) === null || _a === void 0 ? void 0 : _a.value;
      });
      const form = computed(() => {
        var _a;
        return props.form !== void 0 ? props.form : (_a = parentContext.form) === null || _a === void 0 ? void 0 : _a.value;
      });
      const select = computed(() => {
        var _a;
        return props.select !== void 0 ? props.select : (_a = parentContext.select) === null || _a === void 0 ? void 0 : _a.value;
      });
      const componentSize = computed(() => props.componentSize);
      const componentDisabled = computed(() => props.componentDisabled);
      const wave = computed(() => {
        var _a, _b;
        return (_a = props.wave) !== null && _a !== void 0 ? _a : (_b = parentContext.wave) === null || _b === void 0 ? void 0 : _b.value;
      });
      const configProvider = {
        csp,
        autoInsertSpaceInButton,
        locale: locale$12,
        direction,
        space,
        virtual,
        dropdownMatchSelectWidth,
        getPrefixCls,
        iconPrefixCls,
        theme: computed(() => {
          var _a, _b;
          return (_a = mergedTheme.value) !== null && _a !== void 0 ? _a : (_b = parentContext.theme) === null || _b === void 0 ? void 0 : _b.value;
        }),
        renderEmpty: renderEmptyComponent,
        getTargetContainer,
        getPopupContainer,
        pageHeader,
        input,
        pagination,
        form,
        select,
        componentSize,
        componentDisabled,
        transformCellText: computed(() => props.transformCellText),
        wave
      };
      const memoTheme = computed(() => {
        const _a = mergedTheme.value || {}, {
          algorithm,
          token: token2
        } = _a, rest = __rest$2(_a, ["algorithm", "token"]);
        const themeObj = algorithm && (!Array.isArray(algorithm) || algorithm.length > 0) ? createTheme(algorithm) : void 0;
        return _extends(_extends({}, rest), {
          theme: themeObj,
          token: _extends(_extends({}, seedToken), token2)
        });
      });
      const validateMessagesRef = computed(() => {
        var _a, _b;
        let validateMessages = {};
        if (locale$12.value) {
          validateMessages = ((_a = locale$12.value.Form) === null || _a === void 0 ? void 0 : _a.defaultValidateMessages) || ((_b = localeValues.Form) === null || _b === void 0 ? void 0 : _b.defaultValidateMessages) || {};
        }
        if (props.form && props.form.validateMessages) {
          validateMessages = _extends(_extends({}, validateMessages), props.form.validateMessages);
        }
        return validateMessages;
      });
      useConfigContextProvider(configProvider);
      useProvideGlobalForm({
        validateMessages: validateMessagesRef
      });
      useProviderSize(componentSize);
      useProviderDisabled(componentDisabled);
      const renderProvider = (legacyLocale) => {
        var _a, _b;
        let childNode = shouldWrapSSR.value ? wrapSSR((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) : (_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots);
        if (props.theme) {
          const _childNode = /* @__PURE__ */ function() {
            return childNode;
          }();
          childNode = createVNode(DesignTokenProvider, {
            "value": memoTheme.value
          }, {
            default: () => [_childNode]
          });
        }
        return createVNode(locale, {
          "locale": locale$12.value || legacyLocale,
          "ANT_MARK__": ANT_MARK
        }, {
          default: () => [childNode]
        });
      };
      watchEffect(() => {
        if (direction.value) {
          api$1.config({
            rtl: direction.value === "rtl"
          });
          api.config({
            rtl: direction.value === "rtl"
          });
        }
      });
      return () => createVNode(LocaleReceiver, {
        "children": (_2, __, legacyLocale) => renderProvider(legacyLocale)
      }, null);
    }
  });
  ConfigProvider.config = setGlobalConfig;
  ConfigProvider.install = function(app) {
    app.component(ConfigProvider.name, ConfigProvider);
  };
  const genSharedDividerStyle = (token2) => {
    const {
      componentCls,
      sizePaddingEdgeHorizontal,
      colorSplit,
      lineWidth
    } = token2;
    return {
      [componentCls]: _extends(_extends({}, resetComponent(token2)), {
        borderBlockStart: `${lineWidth}px solid ${colorSplit}`,
        // vertical
        "&-vertical": {
          position: "relative",
          top: "-0.06em",
          display: "inline-block",
          height: "0.9em",
          margin: `0 ${token2.dividerVerticalGutterMargin}px`,
          verticalAlign: "middle",
          borderTop: 0,
          borderInlineStart: `${lineWidth}px solid ${colorSplit}`
        },
        "&-horizontal": {
          display: "flex",
          clear: "both",
          width: "100%",
          minWidth: "100%",
          margin: `${token2.dividerHorizontalGutterMargin}px 0`
        },
        [`&-horizontal${componentCls}-with-text`]: {
          display: "flex",
          alignItems: "center",
          margin: `${token2.dividerHorizontalWithTextGutterMargin}px 0`,
          color: token2.colorTextHeading,
          fontWeight: 500,
          fontSize: token2.fontSizeLG,
          whiteSpace: "nowrap",
          textAlign: "center",
          borderBlockStart: `0 ${colorSplit}`,
          "&::before, &::after": {
            position: "relative",
            width: "50%",
            borderBlockStart: `${lineWidth}px solid transparent`,
            // Chrome not accept `inherit` in `border-top`
            borderBlockStartColor: "inherit",
            borderBlockEnd: 0,
            transform: "translateY(50%)",
            content: "''"
          }
        },
        [`&-horizontal${componentCls}-with-text-left`]: {
          "&::before": {
            width: "5%"
          },
          "&::after": {
            width: "95%"
          }
        },
        [`&-horizontal${componentCls}-with-text-right`]: {
          "&::before": {
            width: "95%"
          },
          "&::after": {
            width: "5%"
          }
        },
        [`${componentCls}-inner-text`]: {
          display: "inline-block",
          padding: "0 1em"
        },
        "&-dashed": {
          background: "none",
          borderColor: colorSplit,
          borderStyle: "dashed",
          borderWidth: `${lineWidth}px 0 0`
        },
        [`&-horizontal${componentCls}-with-text${componentCls}-dashed`]: {
          "&::before, &::after": {
            borderStyle: "dashed none none"
          }
        },
        [`&-vertical${componentCls}-dashed`]: {
          borderInlineStartWidth: lineWidth,
          borderInlineEnd: 0,
          borderBlockStart: 0,
          borderBlockEnd: 0
        },
        [`&-plain${componentCls}-with-text`]: {
          color: token2.colorText,
          fontWeight: "normal",
          fontSize: token2.fontSize
        },
        [`&-horizontal${componentCls}-with-text-left${componentCls}-no-default-orientation-margin-left`]: {
          "&::before": {
            width: 0
          },
          "&::after": {
            width: "100%"
          },
          [`${componentCls}-inner-text`]: {
            paddingInlineStart: sizePaddingEdgeHorizontal
          }
        },
        [`&-horizontal${componentCls}-with-text-right${componentCls}-no-default-orientation-margin-right`]: {
          "&::before": {
            width: "100%"
          },
          "&::after": {
            width: 0
          },
          [`${componentCls}-inner-text`]: {
            paddingInlineEnd: sizePaddingEdgeHorizontal
          }
        }
      })
    };
  };
  const useStyle$2 = genComponentStyleHook("Divider", (token2) => {
    const dividerToken = merge(token2, {
      dividerVerticalGutterMargin: token2.marginXS,
      dividerHorizontalWithTextGutterMargin: token2.margin,
      dividerHorizontalGutterMargin: token2.marginLG
    });
    return [genSharedDividerStyle(dividerToken)];
  }, {
    sizePaddingEdgeHorizontal: 0
  });
  const dividerProps = () => ({
    prefixCls: String,
    type: {
      type: String,
      default: "horizontal"
    },
    dashed: {
      type: Boolean,
      default: false
    },
    orientation: {
      type: String,
      default: "center"
    },
    plain: {
      type: Boolean,
      default: false
    },
    orientationMargin: [String, Number]
  });
  const Divider = /* @__PURE__ */ defineComponent({
    name: "ADivider",
    inheritAttrs: false,
    compatConfig: {
      MODE: 3
    },
    props: dividerProps(),
    setup(props, _ref) {
      let {
        slots,
        attrs
      } = _ref;
      const {
        prefixCls: prefixClsRef,
        direction
      } = useConfigInject("divider", props);
      const [wrapSSR, hashId] = useStyle$2(prefixClsRef);
      const hasCustomMarginLeft = computed(() => props.orientation === "left" && props.orientationMargin != null);
      const hasCustomMarginRight = computed(() => props.orientation === "right" && props.orientationMargin != null);
      const classString = computed(() => {
        const {
          type,
          dashed,
          plain
        } = props;
        const prefixCls = prefixClsRef.value;
        return {
          [prefixCls]: true,
          [hashId.value]: !!hashId.value,
          [`${prefixCls}-${type}`]: true,
          [`${prefixCls}-dashed`]: !!dashed,
          [`${prefixCls}-plain`]: !!plain,
          [`${prefixCls}-rtl`]: direction.value === "rtl",
          [`${prefixCls}-no-default-orientation-margin-left`]: hasCustomMarginLeft.value,
          [`${prefixCls}-no-default-orientation-margin-right`]: hasCustomMarginRight.value
        };
      });
      const innerStyle = computed(() => {
        const marginValue = typeof props.orientationMargin === "number" ? `${props.orientationMargin}px` : props.orientationMargin;
        return _extends(_extends({}, hasCustomMarginLeft.value && {
          marginLeft: marginValue
        }), hasCustomMarginRight.value && {
          marginRight: marginValue
        });
      });
      const orientationPrefix = computed(() => props.orientation.length > 0 ? "-" + props.orientation : props.orientation);
      return () => {
        var _a;
        const children = flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
        return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
          "class": [classString.value, children.length ? `${prefixClsRef.value}-with-text ${prefixClsRef.value}-with-text${orientationPrefix.value}` : "", attrs.class],
          "role": "separator"
        }), [children.length ? createVNode("span", {
          "class": `${prefixClsRef.value}-inner-text`,
          "style": innerStyle.value
        }, [children]) : null]));
      };
    }
  });
  const Divider$1 = withInstall(Divider);
  function dialogPropTypes() {
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
      mousePosition: PropTypes.shape({
        x: Number,
        y: Number
      }).loose,
      title: PropTypes.any,
      footer: PropTypes.any,
      transitionName: String,
      maskTransitionName: String,
      animation: PropTypes.any,
      maskAnimation: PropTypes.any,
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
      bodyProps: PropTypes.any,
      maskProps: PropTypes.any,
      wrapProps: PropTypes.any,
      getContainer: PropTypes.any,
      dialogStyle: {
        type: Object,
        default: void 0
      },
      dialogClass: String,
      closeIcon: PropTypes.any,
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
  function getMotionName(prefixCls, transitionName2, animationName) {
    let motionName = transitionName2;
    if (!motionName && animationName) {
      motionName = `${prefixCls}-${animationName}`;
    }
    return motionName;
  }
  let uuid$1 = -1;
  function getUUID() {
    uuid$1 += 1;
    return uuid$1;
  }
  function getScroll(w2, top) {
    let ret = w2[`page${top ? "Y" : "X"}Offset`];
    const method = `scroll${top ? "Top" : "Left"}`;
    if (typeof ret !== "number") {
      const d2 = w2.document;
      ret = d2.documentElement[method];
      if (typeof ret !== "number") {
        ret = d2.body[method];
      }
    }
    return ret;
  }
  function offset(el) {
    const rect = el.getBoundingClientRect();
    const pos = {
      left: rect.left,
      top: rect.top
    };
    const doc2 = el.ownerDocument;
    const w2 = doc2.defaultView || doc2.parentWindow;
    pos.left += getScroll(w2);
    pos.top += getScroll(w2, true);
    return pos;
  }
  const sentinelStyle = {
    width: 0,
    height: 0,
    overflow: "hidden",
    outline: "none"
  };
  const entityStyle = {
    outline: "none"
  };
  const Content = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "DialogContent",
    inheritAttrs: false,
    props: _extends(_extends({}, dialogPropTypes()), {
      motionName: String,
      ariaId: String,
      onVisibleChanged: Function,
      onMousedown: Function,
      onMouseup: Function
    }),
    setup(props, _ref) {
      let {
        expose,
        slots,
        attrs
      } = _ref;
      const sentinelStartRef = /* @__PURE__ */ ref();
      const sentinelEndRef = /* @__PURE__ */ ref();
      const dialogRef = /* @__PURE__ */ ref();
      expose({
        focus: () => {
          var _a;
          (_a = sentinelStartRef.value) === null || _a === void 0 ? void 0 : _a.focus({
            preventScroll: true
          });
        },
        changeActive: (next2) => {
          const {
            activeElement
          } = document;
          if (next2 && activeElement === sentinelEndRef.value) {
            sentinelStartRef.value.focus({
              preventScroll: true
            });
          } else if (!next2 && activeElement === sentinelStartRef.value) {
            sentinelEndRef.value.focus({
              preventScroll: true
            });
          }
        }
      });
      const transformOrigin = /* @__PURE__ */ ref();
      const contentStyleRef = computed(() => {
        const {
          width,
          height
        } = props;
        const contentStyle = {};
        if (width !== void 0) {
          contentStyle.width = typeof width === "number" ? `${width}px` : width;
        }
        if (height !== void 0) {
          contentStyle.height = typeof height === "number" ? `${height}px` : height;
        }
        if (transformOrigin.value) {
          contentStyle.transformOrigin = transformOrigin.value;
        }
        return contentStyle;
      });
      const onPrepare = () => {
        nextTick(() => {
          if (dialogRef.value) {
            const elementOffset = offset(dialogRef.value);
            transformOrigin.value = props.mousePosition ? `${props.mousePosition.x - elementOffset.left}px ${props.mousePosition.y - elementOffset.top}px` : "";
          }
        });
      };
      const onVisibleChanged = (visible) => {
        props.onVisibleChanged(visible);
      };
      return () => {
        var _a, _b, _c, _d;
        const {
          prefixCls,
          footer = (_a = slots.footer) === null || _a === void 0 ? void 0 : _a.call(slots),
          title = (_b = slots.title) === null || _b === void 0 ? void 0 : _b.call(slots),
          ariaId,
          closable,
          closeIcon = (_c = slots.closeIcon) === null || _c === void 0 ? void 0 : _c.call(slots),
          onClose,
          bodyStyle,
          bodyProps,
          onMousedown,
          onMouseup,
          visible,
          modalRender = slots.modalRender,
          destroyOnClose,
          motionName
        } = props;
        let footerNode;
        if (footer) {
          footerNode = createVNode("div", {
            "class": `${prefixCls}-footer`
          }, [footer]);
        }
        let headerNode;
        if (title) {
          headerNode = createVNode("div", {
            "class": `${prefixCls}-header`
          }, [createVNode("div", {
            "class": `${prefixCls}-title`,
            "id": ariaId
          }, [title])]);
        }
        let closer;
        if (closable) {
          closer = createVNode("button", {
            "type": "button",
            "onClick": onClose,
            "aria-label": "Close",
            "class": `${prefixCls}-close`
          }, [closeIcon || createVNode("span", {
            "class": `${prefixCls}-close-x`
          }, null)]);
        }
        const content2 = createVNode("div", {
          "class": `${prefixCls}-content`
        }, [closer, headerNode, createVNode("div", _objectSpread2({
          "class": `${prefixCls}-body`,
          "style": bodyStyle
        }, bodyProps), [(_d = slots.default) === null || _d === void 0 ? void 0 : _d.call(slots)]), footerNode]);
        const transitionProps = getTransitionProps(motionName);
        return createVNode(Transition, _objectSpread2(_objectSpread2({}, transitionProps), {}, {
          "onBeforeEnter": onPrepare,
          "onAfterEnter": () => onVisibleChanged(true),
          "onAfterLeave": () => onVisibleChanged(false)
        }), {
          default: () => [visible || !destroyOnClose ? withDirectives(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
            "ref": dialogRef,
            "key": "dialog-element",
            "role": "document",
            "style": [contentStyleRef.value, attrs.style],
            "class": [prefixCls, attrs.class],
            "onMousedown": onMousedown,
            "onMouseup": onMouseup
          }), [createVNode("div", {
            "tabindex": 0,
            "ref": sentinelStartRef,
            "style": entityStyle
          }, [modalRender ? modalRender({
            originVNode: content2
          }) : content2]), createVNode("div", {
            "tabindex": 0,
            "ref": sentinelEndRef,
            "style": sentinelStyle
          }, null)]), [[vShow, visible]]) : null]
        });
      };
    }
  });
  const Mask = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "DialogMask",
    props: {
      prefixCls: String,
      visible: Boolean,
      motionName: String,
      maskProps: Object
    },
    setup(props, _ref) {
      return () => {
        const {
          prefixCls,
          visible,
          maskProps,
          motionName
        } = props;
        const transitionProps = getTransitionProps(motionName);
        return createVNode(Transition, transitionProps, {
          default: () => [withDirectives(createVNode("div", _objectSpread2({
            "class": `${prefixCls}-mask`
          }, maskProps), null), [[vShow, visible]])]
        });
      };
    }
  });
  const Dialog = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "VcDialog",
    inheritAttrs: false,
    props: initDefaultProps(_extends(_extends({}, dialogPropTypes()), {
      getOpenCount: Function,
      scrollLocker: Object
    }), {
      mask: true,
      visible: false,
      keyboard: true,
      closable: true,
      maskClosable: true,
      destroyOnClose: false,
      prefixCls: "rc-dialog",
      getOpenCount: () => null,
      focusTriggerAfterClose: true
    }),
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const lastOutSideActiveElementRef = /* @__PURE__ */ shallowRef();
      const wrapperRef = /* @__PURE__ */ shallowRef();
      const contentRef = /* @__PURE__ */ shallowRef();
      const animatedVisible = /* @__PURE__ */ shallowRef(props.visible);
      const ariaIdRef = /* @__PURE__ */ shallowRef(`vcDialogTitle${getUUID()}`);
      const onDialogVisibleChanged = (newVisible) => {
        var _a, _b;
        if (newVisible) {
          if (!contains$1(wrapperRef.value, document.activeElement)) {
            lastOutSideActiveElementRef.value = document.activeElement;
            (_a = contentRef.value) === null || _a === void 0 ? void 0 : _a.focus();
          }
        } else {
          const preAnimatedVisible = animatedVisible.value;
          animatedVisible.value = false;
          if (props.mask && lastOutSideActiveElementRef.value && props.focusTriggerAfterClose) {
            try {
              lastOutSideActiveElementRef.value.focus({
                preventScroll: true
              });
            } catch (e2) {
            }
            lastOutSideActiveElementRef.value = null;
          }
          if (preAnimatedVisible) {
            (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
          }
        }
      };
      const onInternalClose = (e2) => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      };
      const contentClickRef = /* @__PURE__ */ shallowRef(false);
      const contentTimeoutRef = /* @__PURE__ */ shallowRef();
      const onContentMouseDown = () => {
        clearTimeout(contentTimeoutRef.value);
        contentClickRef.value = true;
      };
      const onContentMouseUp = () => {
        contentTimeoutRef.value = setTimeout(() => {
          contentClickRef.value = false;
        });
      };
      const onWrapperClick = (e2) => {
        if (!props.maskClosable) return null;
        if (contentClickRef.value) {
          contentClickRef.value = false;
        } else if (wrapperRef.value === e2.target) {
          onInternalClose(e2);
        }
      };
      const onWrapperKeyDown = (e2) => {
        if (props.keyboard && e2.keyCode === KeyCode.ESC) {
          e2.stopPropagation();
          onInternalClose(e2);
          return;
        }
        if (props.visible) {
          if (e2.keyCode === KeyCode.TAB) {
            contentRef.value.changeActive(!e2.shiftKey);
          }
        }
      };
      watch(() => props.visible, () => {
        if (props.visible) {
          animatedVisible.value = true;
        }
      }, {
        flush: "post"
      });
      onBeforeUnmount(() => {
        var _a;
        clearTimeout(contentTimeoutRef.value);
        (_a = props.scrollLocker) === null || _a === void 0 ? void 0 : _a.unLock();
      });
      watchEffect(() => {
        var _a, _b;
        (_a = props.scrollLocker) === null || _a === void 0 ? void 0 : _a.unLock();
        if (animatedVisible.value) {
          (_b = props.scrollLocker) === null || _b === void 0 ? void 0 : _b.lock();
        }
      });
      return () => {
        const {
          prefixCls,
          mask,
          visible,
          maskTransitionName,
          maskAnimation,
          zIndex,
          wrapClassName,
          rootClassName,
          wrapStyle,
          closable,
          maskProps,
          maskStyle,
          transitionName: transitionName2,
          animation,
          wrapProps,
          title = slots.title
        } = props;
        const {
          style,
          class: className
        } = attrs;
        return createVNode("div", _objectSpread2({
          "class": [`${prefixCls}-root`, rootClassName]
        }, pickAttrs(props, {
          data: true
        })), [createVNode(Mask, {
          "prefixCls": prefixCls,
          "visible": mask && visible,
          "motionName": getMotionName(prefixCls, maskTransitionName, maskAnimation),
          "style": _extends({
            zIndex
          }, maskStyle),
          "maskProps": maskProps
        }, null), createVNode("div", _objectSpread2({
          "tabIndex": -1,
          "onKeydown": onWrapperKeyDown,
          "class": classNames(`${prefixCls}-wrap`, wrapClassName),
          "ref": wrapperRef,
          "onClick": onWrapperClick,
          "role": "dialog",
          "aria-labelledby": title ? ariaIdRef.value : null,
          "style": _extends(_extends({
            zIndex
          }, wrapStyle), {
            display: !animatedVisible.value ? "none" : null
          })
        }, wrapProps), [createVNode(Content, _objectSpread2(_objectSpread2({}, omit(props, ["scrollLocker"])), {}, {
          "style": style,
          "class": className,
          "onMousedown": onContentMouseDown,
          "onMouseup": onContentMouseUp,
          "ref": contentRef,
          "closable": closable,
          "ariaId": ariaIdRef.value,
          "prefixCls": prefixCls,
          "visible": visible,
          "onClose": onInternalClose,
          "onVisibleChanged": onDialogVisibleChanged,
          "motionName": getMotionName(prefixCls, transitionName2, animation)
        }), slots)])]);
      };
    }
  });
  const IDialogPropTypes = dialogPropTypes();
  const DialogWrap = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "DialogWrap",
    inheritAttrs: false,
    props: initDefaultProps(IDialogPropTypes, {
      visible: false
    }),
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const animatedVisible = /* @__PURE__ */ ref(props.visible);
      useProvidePortal({}, {
        inTriggerContext: false
      });
      watch(() => props.visible, () => {
        if (props.visible) {
          animatedVisible.value = true;
        }
      }, {
        flush: "post"
      });
      return () => {
        const {
          visible,
          getContainer: getContainer2,
          forceRender,
          destroyOnClose = false,
          afterClose
        } = props;
        let dialogProps = _extends(_extends(_extends({}, props), attrs), {
          ref: "_component",
          key: "dialog"
        });
        if (getContainer2 === false) {
          return createVNode(Dialog, _objectSpread2(_objectSpread2({}, dialogProps), {}, {
            "getOpenCount": () => 2
          }), slots);
        }
        if (!forceRender && destroyOnClose && !animatedVisible.value) {
          return null;
        }
        return createVNode(Portal, {
          "autoLock": true,
          "visible": visible,
          "forceRender": forceRender,
          "getContainer": getContainer2
        }, {
          default: (childProps) => {
            dialogProps = _extends(_extends(_extends({}, dialogProps), childProps), {
              afterClose: () => {
                afterClose === null || afterClose === void 0 ? void 0 : afterClose();
                animatedVisible.value = false;
              }
            });
            return createVNode(Dialog, dialogProps, slots);
          }
        });
      };
    }
  });
  function box(position2) {
    return {
      position: position2,
      top: 0,
      insetInlineEnd: 0,
      bottom: 0,
      insetInlineStart: 0
    };
  }
  const genModalMaskStyle = (token2) => {
    const {
      componentCls
    } = token2;
    return [{
      [`${componentCls}-root`]: {
        [`${componentCls}${token2.antCls}-zoom-enter, ${componentCls}${token2.antCls}-zoom-appear`]: {
          // reset scale avoid mousePosition bug
          transform: "none",
          opacity: 0,
          animationDuration: token2.motionDurationSlow,
          // https://github.com/ant-design/ant-design/issues/11777
          userSelect: "none"
        },
        [`${componentCls}${token2.antCls}-zoom-leave ${componentCls}-content`]: {
          pointerEvents: "none"
        },
        [`${componentCls}-mask`]: _extends(_extends({}, box("fixed")), {
          zIndex: token2.zIndexPopupBase,
          height: "100%",
          backgroundColor: token2.colorBgMask,
          [`${componentCls}-hidden`]: {
            display: "none"
          }
        }),
        [`${componentCls}-wrap`]: _extends(_extends({}, box("fixed")), {
          overflow: "auto",
          outline: 0,
          WebkitOverflowScrolling: "touch"
        })
      }
    }, {
      [`${componentCls}-root`]: initFadeMotion(token2)
    }];
  };
  const genModalStyle = (token2) => {
    const {
      componentCls
    } = token2;
    return [
      // ======================== Root =========================
      {
        [`${componentCls}-root`]: {
          [`${componentCls}-wrap`]: {
            zIndex: token2.zIndexPopupBase,
            position: "fixed",
            inset: 0,
            overflow: "auto",
            outline: 0,
            WebkitOverflowScrolling: "touch"
          },
          [`${componentCls}-wrap-rtl`]: {
            direction: "rtl"
          },
          [`${componentCls}-centered`]: {
            textAlign: "center",
            "&::before": {
              display: "inline-block",
              width: 0,
              height: "100%",
              verticalAlign: "middle",
              content: '""'
            },
            [componentCls]: {
              top: 0,
              display: "inline-block",
              paddingBottom: 0,
              textAlign: "start",
              verticalAlign: "middle"
            }
          },
          [`@media (max-width: ${token2.screenSMMax})`]: {
            [componentCls]: {
              maxWidth: "calc(100vw - 16px)",
              margin: `${token2.marginXS} auto`
            },
            [`${componentCls}-centered`]: {
              [componentCls]: {
                flex: 1
              }
            }
          }
        }
      },
      // ======================== Modal ========================
      {
        [componentCls]: _extends(_extends({}, resetComponent(token2)), {
          pointerEvents: "none",
          position: "relative",
          top: 100,
          width: "auto",
          maxWidth: `calc(100vw - ${token2.margin * 2}px)`,
          margin: "0 auto",
          paddingBottom: token2.paddingLG,
          [`${componentCls}-title`]: {
            margin: 0,
            color: token2.modalHeadingColor,
            fontWeight: token2.fontWeightStrong,
            fontSize: token2.modalHeaderTitleFontSize,
            lineHeight: token2.modalHeaderTitleLineHeight,
            wordWrap: "break-word"
          },
          [`${componentCls}-content`]: {
            position: "relative",
            backgroundColor: token2.modalContentBg,
            backgroundClip: "padding-box",
            border: 0,
            borderRadius: token2.borderRadiusLG,
            boxShadow: token2.boxShadowSecondary,
            pointerEvents: "auto",
            padding: `${token2.paddingMD}px ${token2.paddingContentHorizontalLG}px`
          },
          [`${componentCls}-close`]: _extends({
            position: "absolute",
            top: (token2.modalHeaderCloseSize - token2.modalCloseBtnSize) / 2,
            insetInlineEnd: (token2.modalHeaderCloseSize - token2.modalCloseBtnSize) / 2,
            zIndex: token2.zIndexPopupBase + 10,
            padding: 0,
            color: token2.modalCloseColor,
            fontWeight: token2.fontWeightStrong,
            lineHeight: 1,
            textDecoration: "none",
            background: "transparent",
            borderRadius: token2.borderRadiusSM,
            width: token2.modalConfirmIconSize,
            height: token2.modalConfirmIconSize,
            border: 0,
            outline: 0,
            cursor: "pointer",
            transition: `color ${token2.motionDurationMid}, background-color ${token2.motionDurationMid}`,
            "&-x": {
              display: "block",
              fontSize: token2.fontSizeLG,
              fontStyle: "normal",
              lineHeight: `${token2.modalCloseBtnSize}px`,
              textAlign: "center",
              textTransform: "none",
              textRendering: "auto"
            },
            "&:hover": {
              color: token2.modalIconHoverColor,
              backgroundColor: token2.wireframe ? "transparent" : token2.colorFillContent,
              textDecoration: "none"
            },
            "&:active": {
              backgroundColor: token2.wireframe ? "transparent" : token2.colorFillContentHover
            }
          }, genFocusStyle(token2)),
          [`${componentCls}-header`]: {
            color: token2.colorText,
            background: token2.modalHeaderBg,
            borderRadius: `${token2.borderRadiusLG}px ${token2.borderRadiusLG}px 0 0`,
            marginBottom: token2.marginXS
          },
          [`${componentCls}-body`]: {
            fontSize: token2.fontSize,
            lineHeight: token2.lineHeight,
            wordWrap: "break-word"
          },
          [`${componentCls}-footer`]: {
            textAlign: "end",
            background: token2.modalFooterBg,
            marginTop: token2.marginSM,
            [`${token2.antCls}-btn + ${token2.antCls}-btn:not(${token2.antCls}-dropdown-trigger)`]: {
              marginBottom: 0,
              marginInlineStart: token2.marginXS
            }
          },
          [`${componentCls}-open`]: {
            overflow: "hidden"
          }
        })
      },
      // ======================== Pure =========================
      {
        [`${componentCls}-pure-panel`]: {
          top: "auto",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          [`${componentCls}-content,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
            display: "flex",
            flexDirection: "column",
            flex: "auto"
          },
          [`${componentCls}-confirm-body`]: {
            marginBottom: "auto"
          }
        }
      }
    ];
  };
  const genModalConfirmStyle = (token2) => {
    const {
      componentCls
    } = token2;
    const confirmComponentCls = `${componentCls}-confirm`;
    return {
      [confirmComponentCls]: {
        "&-rtl": {
          direction: "rtl"
        },
        [`${token2.antCls}-modal-header`]: {
          display: "none"
        },
        [`${confirmComponentCls}-body-wrapper`]: _extends({}, clearFix()),
        [`${confirmComponentCls}-body`]: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          [`${confirmComponentCls}-title`]: {
            flex: "0 0 100%",
            display: "block",
            // create BFC to avoid
            // https://user-images.githubusercontent.com/507615/37702510-ba844e06-2d2d-11e8-9b67-8e19be57f445.png
            overflow: "hidden",
            color: token2.colorTextHeading,
            fontWeight: token2.fontWeightStrong,
            fontSize: token2.modalHeaderTitleFontSize,
            lineHeight: token2.modalHeaderTitleLineHeight,
            [`+ ${confirmComponentCls}-content`]: {
              marginBlockStart: token2.marginXS,
              flexBasis: "100%",
              maxWidth: `calc(100% - ${token2.modalConfirmIconSize + token2.marginSM}px)`
            }
          },
          [`${confirmComponentCls}-content`]: {
            color: token2.colorText,
            fontSize: token2.fontSize
          },
          [`> ${token2.iconCls}`]: {
            flex: "none",
            marginInlineEnd: token2.marginSM,
            fontSize: token2.modalConfirmIconSize,
            [`+ ${confirmComponentCls}-title`]: {
              flex: 1
            },
            // `content` after `icon` should set marginLeft
            [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
              marginInlineStart: token2.modalConfirmIconSize + token2.marginSM
            }
          }
        },
        [`${confirmComponentCls}-btns`]: {
          textAlign: "end",
          marginTop: token2.marginSM,
          [`${token2.antCls}-btn + ${token2.antCls}-btn`]: {
            marginBottom: 0,
            marginInlineStart: token2.marginXS
          }
        }
      },
      [`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token2.iconCls}`]: {
        color: token2.colorError
      },
      [`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token2.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token2.iconCls}`]: {
        color: token2.colorWarning
      },
      [`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token2.iconCls}`]: {
        color: token2.colorInfo
      },
      [`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token2.iconCls}`]: {
        color: token2.colorSuccess
      },
      // https://github.com/ant-design/ant-design/issues/37329
      [`${componentCls}-zoom-leave ${componentCls}-btns`]: {
        pointerEvents: "none"
      }
    };
  };
  const genRTLStyle = (token2) => {
    const {
      componentCls
    } = token2;
    return {
      [`${componentCls}-root`]: {
        [`${componentCls}-wrap-rtl`]: {
          direction: "rtl",
          [`${componentCls}-confirm-body`]: {
            direction: "rtl"
          }
        }
      }
    };
  };
  const genWireframeStyle = (token2) => {
    const {
      componentCls,
      antCls
    } = token2;
    const confirmComponentCls = `${componentCls}-confirm`;
    return {
      [componentCls]: {
        [`${componentCls}-content`]: {
          padding: 0
        },
        [`${componentCls}-header`]: {
          padding: token2.modalHeaderPadding,
          borderBottom: `${token2.modalHeaderBorderWidth}px ${token2.modalHeaderBorderStyle} ${token2.modalHeaderBorderColorSplit}`,
          marginBottom: 0
        },
        [`${componentCls}-body`]: {
          padding: token2.modalBodyPadding
        },
        [`${componentCls}-footer`]: {
          padding: `${token2.modalFooterPaddingVertical}px ${token2.modalFooterPaddingHorizontal}px`,
          borderTop: `${token2.modalFooterBorderWidth}px ${token2.modalFooterBorderStyle} ${token2.modalFooterBorderColorSplit}`,
          borderRadius: `0 0 ${token2.borderRadiusLG}px ${token2.borderRadiusLG}px`,
          marginTop: 0
        }
      },
      [confirmComponentCls]: {
        [`${antCls}-modal-body`]: {
          padding: `${token2.padding * 2}px ${token2.padding * 2}px ${token2.paddingLG}px`
        },
        [`${confirmComponentCls}-body`]: {
          [`> ${token2.iconCls}`]: {
            marginInlineEnd: token2.margin,
            // `content` after `icon` should set marginLeft
            [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
              marginInlineStart: token2.modalConfirmIconSize + token2.margin
            }
          }
        },
        [`${confirmComponentCls}-btns`]: {
          marginTop: token2.marginLG
        }
      }
    };
  };
  const useStyle$1 = genComponentStyleHook("Modal", (token2) => {
    const headerPaddingVertical = token2.padding;
    const headerFontSize = token2.fontSizeHeading5;
    const headerLineHeight = token2.lineHeightHeading5;
    const modalToken = merge(token2, {
      modalBodyPadding: token2.paddingLG,
      modalHeaderBg: token2.colorBgElevated,
      modalHeaderPadding: `${headerPaddingVertical}px ${token2.paddingLG}px`,
      modalHeaderBorderWidth: token2.lineWidth,
      modalHeaderBorderStyle: token2.lineType,
      modalHeaderTitleLineHeight: headerLineHeight,
      modalHeaderTitleFontSize: headerFontSize,
      modalHeaderBorderColorSplit: token2.colorSplit,
      modalHeaderCloseSize: headerLineHeight * headerFontSize + headerPaddingVertical * 2,
      modalContentBg: token2.colorBgElevated,
      modalHeadingColor: token2.colorTextHeading,
      modalCloseColor: token2.colorTextDescription,
      modalFooterBg: "transparent",
      modalFooterBorderColorSplit: token2.colorSplit,
      modalFooterBorderStyle: token2.lineType,
      modalFooterPaddingVertical: token2.paddingXS,
      modalFooterPaddingHorizontal: token2.padding,
      modalFooterBorderWidth: token2.lineWidth,
      modalConfirmTitleFontSize: token2.fontSizeLG,
      modalIconHoverColor: token2.colorIconHover,
      modalConfirmIconSize: token2.fontSize * token2.lineHeight,
      modalCloseBtnSize: token2.controlHeightLG * 0.55
    });
    return [genModalStyle(modalToken), genModalConfirmStyle(modalToken), genRTLStyle(modalToken), genModalMaskStyle(modalToken), token2.wireframe && genWireframeStyle(modalToken), initZoomMotion(modalToken, "zoom")];
  });
  function throttle(delay, callback, options) {
    var _ref = options || {}, _ref$noTrailing = _ref.noTrailing, noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing, _ref$noLeading = _ref.noLeading, noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading, _ref$debounceMode = _ref.debounceMode, debounceMode = _ref$debounceMode === void 0 ? void 0 : _ref$debounceMode;
    var timeoutID;
    var cancelled = false;
    var lastExec = 0;
    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    }
    function cancel(options2) {
      var _ref2 = options2 || {}, _ref2$upcomingOnly = _ref2.upcomingOnly, upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
      clearExistingTimeout();
      cancelled = !upcomingOnly;
    }
    function wrapper() {
      for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
        arguments_[_key] = arguments[_key];
      }
      var self2 = this;
      var elapsed = Date.now() - lastExec;
      if (cancelled) {
        return;
      }
      function exec() {
        lastExec = Date.now();
        callback.apply(self2, arguments_);
      }
      function clear() {
        timeoutID = void 0;
      }
      if (!noLeading && debounceMode && !timeoutID) {
        exec();
      }
      clearExistingTimeout();
      if (debounceMode === void 0 && elapsed > delay) {
        if (noLeading) {
          lastExec = Date.now();
          if (!noTrailing) {
            timeoutID = setTimeout(debounceMode ? clear : exec, delay);
          }
        } else {
          exec();
        }
      } else if (noTrailing !== true) {
        timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
      }
    }
    wrapper.cancel = cancel;
    return wrapper;
  }
  function debounce(delay, callback, options) {
    var _ref = {}, _ref$atBegin = _ref.atBegin, atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;
    return throttle(delay, callback, {
      debounceMode: atBegin !== false
    });
  }
  const antSpinMove = new Keyframe("antSpinMove", {
    to: {
      opacity: 1
    }
  });
  const antRotate = new Keyframe("antRotate", {
    to: {
      transform: "rotate(405deg)"
    }
  });
  const genSpinStyle = (token2) => ({
    [`${token2.componentCls}`]: _extends(_extends({}, resetComponent(token2)), {
      position: "absolute",
      display: "none",
      color: token2.colorPrimary,
      textAlign: "center",
      verticalAlign: "middle",
      opacity: 0,
      transition: `transform ${token2.motionDurationSlow} ${token2.motionEaseInOutCirc}`,
      "&-spinning": {
        position: "static",
        display: "inline-block",
        opacity: 1
      },
      "&-nested-loading": {
        position: "relative",
        [`> div > ${token2.componentCls}`]: {
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          zIndex: 4,
          display: "block",
          width: "100%",
          height: "100%",
          maxHeight: token2.contentHeight,
          [`${token2.componentCls}-dot`]: {
            position: "absolute",
            top: "50%",
            insetInlineStart: "50%",
            margin: -token2.spinDotSize / 2
          },
          [`${token2.componentCls}-text`]: {
            position: "absolute",
            top: "50%",
            width: "100%",
            paddingTop: (token2.spinDotSize - token2.fontSize) / 2 + 2,
            textShadow: `0 1px 2px ${token2.colorBgContainer}`
            // FIXME: shadow
          },
          [`&${token2.componentCls}-show-text ${token2.componentCls}-dot`]: {
            marginTop: -(token2.spinDotSize / 2) - 10
          },
          "&-sm": {
            [`${token2.componentCls}-dot`]: {
              margin: -token2.spinDotSizeSM / 2
            },
            [`${token2.componentCls}-text`]: {
              paddingTop: (token2.spinDotSizeSM - token2.fontSize) / 2 + 2
            },
            [`&${token2.componentCls}-show-text ${token2.componentCls}-dot`]: {
              marginTop: -(token2.spinDotSizeSM / 2) - 10
            }
          },
          "&-lg": {
            [`${token2.componentCls}-dot`]: {
              margin: -(token2.spinDotSizeLG / 2)
            },
            [`${token2.componentCls}-text`]: {
              paddingTop: (token2.spinDotSizeLG - token2.fontSize) / 2 + 2
            },
            [`&${token2.componentCls}-show-text ${token2.componentCls}-dot`]: {
              marginTop: -(token2.spinDotSizeLG / 2) - 10
            }
          }
        },
        [`${token2.componentCls}-container`]: {
          position: "relative",
          transition: `opacity ${token2.motionDurationSlow}`,
          "&::after": {
            position: "absolute",
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            zIndex: 10,
            width: "100%",
            height: "100%",
            background: token2.colorBgContainer,
            opacity: 0,
            transition: `all ${token2.motionDurationSlow}`,
            content: '""',
            pointerEvents: "none"
          }
        },
        [`${token2.componentCls}-blur`]: {
          clear: "both",
          opacity: 0.5,
          userSelect: "none",
          pointerEvents: "none",
          [`&::after`]: {
            opacity: 0.4,
            pointerEvents: "auto"
          }
        }
      },
      // tip
      // ------------------------------
      [`&-tip`]: {
        color: token2.spinDotDefault
      },
      // dots
      // ------------------------------
      [`${token2.componentCls}-dot`]: {
        position: "relative",
        display: "inline-block",
        fontSize: token2.spinDotSize,
        width: "1em",
        height: "1em",
        "&-item": {
          position: "absolute",
          display: "block",
          width: (token2.spinDotSize - token2.marginXXS / 2) / 2,
          height: (token2.spinDotSize - token2.marginXXS / 2) / 2,
          backgroundColor: token2.colorPrimary,
          borderRadius: "100%",
          transform: "scale(0.75)",
          transformOrigin: "50% 50%",
          opacity: 0.3,
          animationName: antSpinMove,
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          animationDirection: "alternate",
          "&:nth-child(1)": {
            top: 0,
            insetInlineStart: 0
          },
          "&:nth-child(2)": {
            top: 0,
            insetInlineEnd: 0,
            animationDelay: "0.4s"
          },
          "&:nth-child(3)": {
            insetInlineEnd: 0,
            bottom: 0,
            animationDelay: "0.8s"
          },
          "&:nth-child(4)": {
            bottom: 0,
            insetInlineStart: 0,
            animationDelay: "1.2s"
          }
        },
        "&-spin": {
          transform: "rotate(45deg)",
          animationName: antRotate,
          animationDuration: "1.2s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear"
        }
      },
      // Sizes
      // ------------------------------
      // small
      [`&-sm ${token2.componentCls}-dot`]: {
        fontSize: token2.spinDotSizeSM,
        i: {
          width: (token2.spinDotSizeSM - token2.marginXXS / 2) / 2,
          height: (token2.spinDotSizeSM - token2.marginXXS / 2) / 2
        }
      },
      // large
      [`&-lg ${token2.componentCls}-dot`]: {
        fontSize: token2.spinDotSizeLG,
        i: {
          width: (token2.spinDotSizeLG - token2.marginXXS) / 2,
          height: (token2.spinDotSizeLG - token2.marginXXS) / 2
        }
      },
      [`&${token2.componentCls}-show-text ${token2.componentCls}-text`]: {
        display: "block"
      }
    })
  });
  const useStyle = genComponentStyleHook("Spin", (token2) => {
    const spinToken = merge(token2, {
      spinDotDefault: token2.colorTextDescription,
      spinDotSize: token2.controlHeightLG / 2,
      spinDotSizeSM: token2.controlHeightLG * 0.35,
      spinDotSizeLG: token2.controlHeight
    });
    return [genSpinStyle(spinToken)];
  }, {
    contentHeight: 400
  });
  var __rest$1 = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  const spinProps = () => ({
    prefixCls: String,
    spinning: {
      type: Boolean,
      default: void 0
    },
    size: String,
    wrapperClassName: String,
    tip: PropTypes.any,
    delay: Number,
    indicator: PropTypes.any
  });
  let defaultIndicator = null;
  function shouldDelay(spinning, delay) {
    return !!spinning && !!delay && !isNaN(Number(delay));
  }
  function setDefaultIndicator(Content2) {
    const Indicator = Content2.indicator;
    defaultIndicator = typeof Indicator === "function" ? Indicator : () => createVNode(Indicator, null, null);
  }
  const Spin = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "ASpin",
    inheritAttrs: false,
    props: initDefaultProps(spinProps(), {
      size: "default",
      spinning: true,
      wrapperClassName: ""
    }),
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        prefixCls,
        size,
        direction
      } = useConfigInject("spin", props);
      const [wrapSSR, hashId] = useStyle(prefixCls);
      const sSpinning = /* @__PURE__ */ shallowRef(props.spinning && !shouldDelay(props.spinning, props.delay));
      let updateSpinning;
      watch([() => props.spinning, () => props.delay], () => {
        updateSpinning === null || updateSpinning === void 0 ? void 0 : updateSpinning.cancel();
        updateSpinning = debounce(props.delay, () => {
          sSpinning.value = props.spinning;
        });
        updateSpinning === null || updateSpinning === void 0 ? void 0 : updateSpinning();
      }, {
        immediate: true,
        flush: "post"
      });
      onBeforeUnmount(() => {
        updateSpinning === null || updateSpinning === void 0 ? void 0 : updateSpinning.cancel();
      });
      return () => {
        var _a, _b;
        const {
          class: cls2
        } = attrs, divProps = __rest$1(attrs, ["class"]);
        const {
          tip = (_a = slots.tip) === null || _a === void 0 ? void 0 : _a.call(slots)
        } = props;
        const children = (_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots);
        const spinClassName = {
          [hashId.value]: true,
          [prefixCls.value]: true,
          [`${prefixCls.value}-sm`]: size.value === "small",
          [`${prefixCls.value}-lg`]: size.value === "large",
          [`${prefixCls.value}-spinning`]: sSpinning.value,
          [`${prefixCls.value}-show-text`]: !!tip,
          [`${prefixCls.value}-rtl`]: direction.value === "rtl",
          [cls2]: !!cls2
        };
        function renderIndicator(prefixCls2) {
          const dotClassName = `${prefixCls2}-dot`;
          let indicator = getPropsSlot(slots, props, "indicator");
          if (indicator === null) {
            return null;
          }
          if (Array.isArray(indicator)) {
            indicator = indicator.length === 1 ? indicator[0] : indicator;
          }
          if (isVNode(indicator)) {
            return cloneVNode(indicator, {
              class: dotClassName
            });
          }
          if (defaultIndicator && isVNode(defaultIndicator())) {
            return cloneVNode(defaultIndicator(), {
              class: dotClassName
            });
          }
          return createVNode("span", {
            "class": `${dotClassName} ${prefixCls2}-dot-spin`
          }, [createVNode("i", {
            "class": `${prefixCls2}-dot-item`
          }, null), createVNode("i", {
            "class": `${prefixCls2}-dot-item`
          }, null), createVNode("i", {
            "class": `${prefixCls2}-dot-item`
          }, null), createVNode("i", {
            "class": `${prefixCls2}-dot-item`
          }, null)]);
        }
        const spinElement = createVNode("div", _objectSpread2(_objectSpread2({}, divProps), {}, {
          "class": spinClassName,
          "aria-live": "polite",
          "aria-busy": sSpinning.value
        }), [renderIndicator(prefixCls.value), tip ? createVNode("div", {
          "class": `${prefixCls.value}-text`
        }, [tip]) : null]);
        if (children && filterEmpty(children).length) {
          const containerClassName = {
            [`${prefixCls.value}-container`]: true,
            [`${prefixCls.value}-blur`]: sSpinning.value
          };
          return wrapSSR(createVNode("div", {
            "class": [`${prefixCls.value}-nested-loading`, props.wrapperClassName, hashId.value]
          }, [sSpinning.value && createVNode("div", {
            "key": "loading"
          }, [spinElement]), createVNode("div", {
            "class": containerClassName,
            "key": "container"
          }, [children])]));
        }
        return wrapSSR(spinElement);
      };
    }
  });
  Spin.setDefaultIndicator = setDefaultIndicator;
  Spin.install = function(app) {
    app.component(Spin.name, Spin);
    return app;
  };
  var __rest = function(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
    return t2;
  };
  let mousePosition;
  const getClickPosition = (e2) => {
    mousePosition = {
      x: e2.pageX,
      y: e2.pageY
    };
    setTimeout(() => mousePosition = null, 100);
  };
  if (canUseDocElement()) {
    addEventListenerWrap(document.documentElement, "click", getClickPosition, true);
  }
  const modalProps = () => ({
    prefixCls: String,
    /** @deprecated Please use `open` instead. */
    visible: {
      type: Boolean,
      default: void 0
    },
    open: {
      type: Boolean,
      default: void 0
    },
    confirmLoading: {
      type: Boolean,
      default: void 0
    },
    title: PropTypes.any,
    closable: {
      type: Boolean,
      default: void 0
    },
    closeIcon: PropTypes.any,
    onOk: Function,
    onCancel: Function,
    "onUpdate:visible": Function,
    "onUpdate:open": Function,
    onChange: Function,
    afterClose: Function,
    centered: {
      type: Boolean,
      default: void 0
    },
    width: [String, Number],
    footer: PropTypes.any,
    okText: PropTypes.any,
    okType: String,
    cancelText: PropTypes.any,
    icon: PropTypes.any,
    maskClosable: {
      type: Boolean,
      default: void 0
    },
    forceRender: {
      type: Boolean,
      default: void 0
    },
    okButtonProps: objectType(),
    cancelButtonProps: objectType(),
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
    bodyStyle: objectType(),
    maskStyle: objectType(),
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
    modalRender: Function,
    mousePosition: objectType()
  });
  const Modal = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "AModal",
    inheritAttrs: false,
    props: initDefaultProps(modalProps(), {
      width: 520,
      confirmLoading: false,
      okType: "primary"
    }),
    setup(props, _ref) {
      let {
        emit: emit2,
        slots,
        attrs
      } = _ref;
      const [locale2] = useLocaleReceiver("Modal");
      const {
        prefixCls,
        rootPrefixCls,
        direction,
        getPopupContainer
      } = useConfigInject("modal", props);
      const [wrapSSR, hashId] = useStyle$1(prefixCls);
      warning$1(props.visible === void 0, "Modal", `\`visible\` will be removed in next major version, please use \`open\` instead.`);
      const handleCancel = (e2) => {
        emit2("update:visible", false);
        emit2("update:open", false);
        emit2("cancel", e2);
        emit2("change", false);
      };
      const handleOk = (e2) => {
        emit2("ok", e2);
      };
      const renderFooter = () => {
        var _a, _b;
        const {
          okText = (_a = slots.okText) === null || _a === void 0 ? void 0 : _a.call(slots),
          okType,
          cancelText = (_b = slots.cancelText) === null || _b === void 0 ? void 0 : _b.call(slots),
          confirmLoading
        } = props;
        return createVNode(Fragment, null, [createVNode(Button, _objectSpread2({
          "onClick": handleCancel
        }, props.cancelButtonProps), {
          default: () => [cancelText || locale2.value.cancelText]
        }), createVNode(Button, _objectSpread2(_objectSpread2({}, convertLegacyProps(okType)), {}, {
          "loading": confirmLoading,
          "onClick": handleOk
        }, props.okButtonProps), {
          default: () => [okText || locale2.value.okText]
        })]);
      };
      return () => {
        var _a, _b;
        const {
          prefixCls: customizePrefixCls,
          visible,
          open: open2,
          wrapClassName,
          centered,
          getContainer: getContainer2,
          closeIcon = (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots),
          focusTriggerAfterClose = true
        } = props, restProps = __rest(props, ["prefixCls", "visible", "open", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose"]);
        const wrapClassNameExtended = classNames(wrapClassName, {
          [`${prefixCls.value}-centered`]: !!centered,
          [`${prefixCls.value}-wrap-rtl`]: direction.value === "rtl"
        });
        return wrapSSR(createVNode(DialogWrap, _objectSpread2(_objectSpread2(_objectSpread2({}, restProps), attrs), {}, {
          "rootClassName": hashId.value,
          "class": classNames(hashId.value, attrs.class),
          "getContainer": getContainer2 || (getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.value),
          "prefixCls": prefixCls.value,
          "wrapClassName": wrapClassNameExtended,
          "visible": open2 !== null && open2 !== void 0 ? open2 : visible,
          "onClose": handleCancel,
          "focusTriggerAfterClose": focusTriggerAfterClose,
          "transitionName": getTransitionName(rootPrefixCls.value, "zoom", props.transitionName),
          "maskTransitionName": getTransitionName(rootPrefixCls.value, "fade", props.maskTransitionName),
          "mousePosition": (_b = restProps.mousePosition) !== null && _b !== void 0 ? _b : mousePosition
        }), _extends(_extends({}, slots), {
          footer: slots.footer || renderFooter,
          closeIcon: () => {
            return createVNode("span", {
              "class": `${prefixCls.value}-close-x`
            }, [closeIcon || createVNode(CloseOutlined, {
              "class": `${prefixCls.value}-close-icon`
            }, null)]);
          }
        })));
      };
    }
  });
  const useDestroyed = () => {
    const destroyed = /* @__PURE__ */ shallowRef(false);
    onBeforeUnmount(() => {
      destroyed.value = true;
    });
    return destroyed;
  };
  const actionButtonProps = {
    type: {
      type: String
    },
    actionFn: Function,
    close: Function,
    autofocus: Boolean,
    prefixCls: String,
    buttonProps: objectType(),
    emitEvent: Boolean,
    quitOnNullishReturnValue: Boolean
  };
  function isThenable(thing) {
    return !!(thing && thing.then);
  }
  const ActionButton = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "ActionButton",
    props: actionButtonProps,
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const clickedRef = /* @__PURE__ */ shallowRef(false);
      const buttonRef = /* @__PURE__ */ shallowRef();
      const loading = /* @__PURE__ */ shallowRef(false);
      let timeoutId;
      const isDestroyed = useDestroyed();
      onMounted(() => {
        if (props.autofocus) {
          timeoutId = setTimeout(() => {
            var _a, _b;
            return (_b = (_a = findDOMNode(buttonRef.value)) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
          });
        }
      });
      onBeforeUnmount(() => {
        clearTimeout(timeoutId);
      });
      const onInternalClose = function() {
        var _a;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        (_a = props.close) === null || _a === void 0 ? void 0 : _a.call(props, ...args);
      };
      const handlePromiseOnOk = (returnValueOfOnOk) => {
        if (!isThenable(returnValueOfOnOk)) {
          return;
        }
        loading.value = true;
        returnValueOfOnOk.then(function() {
          if (!isDestroyed.value) {
            loading.value = false;
          }
          onInternalClose(...arguments);
          clickedRef.value = false;
        }, (e2) => {
          if (!isDestroyed.value) {
            loading.value = false;
          }
          clickedRef.value = false;
          return Promise.reject(e2);
        });
      };
      const onClick = (e2) => {
        const {
          actionFn
        } = props;
        if (clickedRef.value) {
          return;
        }
        clickedRef.value = true;
        if (!actionFn) {
          onInternalClose();
          return;
        }
        let returnValueOfOnOk;
        if (props.emitEvent) {
          returnValueOfOnOk = actionFn(e2);
          if (props.quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
            clickedRef.value = false;
            onInternalClose(e2);
            return;
          }
        } else if (actionFn.length) {
          returnValueOfOnOk = actionFn(props.close);
          clickedRef.value = false;
        } else {
          returnValueOfOnOk = actionFn();
          if (!returnValueOfOnOk) {
            onInternalClose();
            return;
          }
        }
        handlePromiseOnOk(returnValueOfOnOk);
      };
      return () => {
        const {
          type,
          prefixCls,
          buttonProps: buttonProps2
        } = props;
        return createVNode(Button, _objectSpread2(_objectSpread2(_objectSpread2({}, convertLegacyProps(type)), {}, {
          "onClick": onClick,
          "loading": loading.value,
          "prefixCls": prefixCls
        }, buttonProps2), {}, {
          "ref": buttonRef
        }), slots);
      };
    }
  });
  function renderSomeContent(someContent) {
    if (typeof someContent === "function") {
      return someContent();
    }
    return someContent;
  }
  const ConfirmDialog = /* @__PURE__ */ defineComponent({
    name: "ConfirmDialog",
    inheritAttrs: false,
    props: ["icon", "onCancel", "onOk", "close", "closable", "zIndex", "afterClose", "visible", "open", "keyboard", "centered", "getContainer", "maskStyle", "okButtonProps", "cancelButtonProps", "okType", "prefixCls", "okCancel", "width", "mask", "maskClosable", "okText", "cancelText", "autoFocusButton", "transitionName", "maskTransitionName", "type", "title", "content", "direction", "rootPrefixCls", "bodyStyle", "closeIcon", "modalRender", "focusTriggerAfterClose", "wrapClassName", "confirmPrefixCls", "footer"],
    setup(props, _ref) {
      let {
        attrs
      } = _ref;
      const [locale2] = useLocaleReceiver("Modal");
      {
        warning$1(props.visible === void 0, "Modal", `\`visible\` is deprecated, please use \`open\` instead.`);
      }
      return () => {
        const {
          icon,
          onCancel,
          onOk,
          close: close2,
          okText,
          closable = false,
          zIndex,
          afterClose,
          keyboard: keyboard2,
          centered,
          getContainer: getContainer2,
          maskStyle,
          okButtonProps,
          cancelButtonProps,
          okCancel,
          width = 416,
          mask = true,
          maskClosable = false,
          type,
          open: open2,
          title,
          content: content2,
          direction,
          closeIcon,
          modalRender,
          focusTriggerAfterClose,
          rootPrefixCls,
          bodyStyle,
          wrapClassName,
          footer
        } = props;
        let mergedIcon = icon;
        if (!icon && icon !== null) {
          switch (type) {
            case "info":
              mergedIcon = createVNode(InfoCircleFilled, null, null);
              break;
            case "success":
              mergedIcon = createVNode(CheckCircleFilled, null, null);
              break;
            case "error":
              mergedIcon = createVNode(CloseCircleFilled, null, null);
              break;
            default:
              mergedIcon = createVNode(ExclamationCircleFilled, null, null);
          }
        }
        const okType = props.okType || "primary";
        const prefixCls = props.prefixCls || "ant-modal";
        const contentPrefixCls = `${prefixCls}-confirm`;
        const style = attrs.style || {};
        const mergedOkCancel = okCancel !== null && okCancel !== void 0 ? okCancel : type === "confirm";
        const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || "ok";
        const confirmPrefixCls = `${prefixCls}-confirm`;
        const classString = classNames(confirmPrefixCls, `${confirmPrefixCls}-${props.type}`, {
          [`${confirmPrefixCls}-rtl`]: direction === "rtl"
        }, attrs.class);
        const mergedLocal = locale2.value;
        const cancelButton = mergedOkCancel && createVNode(ActionButton, {
          "actionFn": onCancel,
          "close": close2,
          "autofocus": autoFocusButton === "cancel",
          "buttonProps": cancelButtonProps,
          "prefixCls": `${rootPrefixCls}-btn`
        }, {
          default: () => [renderSomeContent(props.cancelText) || mergedLocal.cancelText]
        });
        return createVNode(Modal, {
          "prefixCls": prefixCls,
          "class": classString,
          "wrapClassName": classNames({
            [`${confirmPrefixCls}-centered`]: !!centered
          }, wrapClassName),
          "onCancel": (e2) => close2 === null || close2 === void 0 ? void 0 : close2({
            triggerCancel: true
          }, e2),
          "open": open2,
          "title": "",
          "footer": "",
          "transitionName": getTransitionName(rootPrefixCls, "zoom", props.transitionName),
          "maskTransitionName": getTransitionName(rootPrefixCls, "fade", props.maskTransitionName),
          "mask": mask,
          "maskClosable": maskClosable,
          "maskStyle": maskStyle,
          "style": style,
          "bodyStyle": bodyStyle,
          "width": width,
          "zIndex": zIndex,
          "afterClose": afterClose,
          "keyboard": keyboard2,
          "centered": centered,
          "getContainer": getContainer2,
          "closable": closable,
          "closeIcon": closeIcon,
          "modalRender": modalRender,
          "focusTriggerAfterClose": focusTriggerAfterClose
        }, {
          default: () => [createVNode("div", {
            "class": `${contentPrefixCls}-body-wrapper`
          }, [createVNode("div", {
            "class": `${contentPrefixCls}-body`
          }, [renderSomeContent(mergedIcon), title === void 0 ? null : createVNode("span", {
            "class": `${contentPrefixCls}-title`
          }, [renderSomeContent(title)]), createVNode("div", {
            "class": `${contentPrefixCls}-content`
          }, [renderSomeContent(content2)])]), footer !== void 0 ? renderSomeContent(footer) : createVNode("div", {
            "class": `${contentPrefixCls}-btns`
          }, [cancelButton, createVNode(ActionButton, {
            "type": okType,
            "actionFn": onOk,
            "close": close2,
            "autofocus": autoFocusButton === "ok",
            "buttonProps": okButtonProps,
            "prefixCls": `${rootPrefixCls}-btn`
          }, {
            default: () => [renderSomeContent(okText) || (mergedOkCancel ? mergedLocal.okText : mergedLocal.justOkText)]
          })])])]
        });
      };
    }
  });
  const destroyFns = [];
  const confirm = (config) => {
    const container = document.createDocumentFragment();
    let currentConfig = _extends(_extends({}, omit(config, ["parentContext", "appContext"])), {
      close: close2,
      open: true
    });
    let confirmDialogInstance = null;
    function destroy() {
      if (confirmDialogInstance) {
        render(null, container);
        confirmDialogInstance = null;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const triggerCancel = args.some((param) => param && param.triggerCancel);
      if (config.onCancel && triggerCancel) {
        config.onCancel(() => {
        }, ...args.slice(1));
      }
      for (let i2 = 0; i2 < destroyFns.length; i2++) {
        const fn = destroyFns[i2];
        if (fn === close2) {
          destroyFns.splice(i2, 1);
          break;
        }
      }
    }
    function close2() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      currentConfig = _extends(_extends({}, currentConfig), {
        open: false,
        afterClose: () => {
          if (typeof config.afterClose === "function") {
            config.afterClose();
          }
          destroy.apply(this, args);
        }
      });
      if (currentConfig.visible) {
        delete currentConfig.visible;
      }
      update(currentConfig);
    }
    function update(configUpdate) {
      if (typeof configUpdate === "function") {
        currentConfig = configUpdate(currentConfig);
      } else {
        currentConfig = _extends(_extends({}, currentConfig), configUpdate);
      }
      if (confirmDialogInstance) {
        triggerVNodeUpdate(confirmDialogInstance, currentConfig, container);
      }
    }
    const Wrapper = (p2) => {
      const global2 = globalConfigForApi;
      const rootPrefixCls = global2.prefixCls;
      const prefixCls = p2.prefixCls || `${rootPrefixCls}-modal`;
      const iconPrefixCls = global2.iconPrefixCls;
      const runtimeLocale2 = getConfirmLocale();
      return createVNode(ConfigProvider, _objectSpread2(_objectSpread2({}, global2), {}, {
        "prefixCls": rootPrefixCls
      }), {
        default: () => [createVNode(ConfirmDialog, _objectSpread2(_objectSpread2({}, p2), {}, {
          "rootPrefixCls": rootPrefixCls,
          "prefixCls": prefixCls,
          "iconPrefixCls": iconPrefixCls,
          "locale": runtimeLocale2,
          "cancelText": p2.cancelText || runtimeLocale2.cancelText
        }), null)]
      });
    };
    function render$1(props) {
      const vm = createVNode(Wrapper, _extends({}, props));
      vm.appContext = config.parentContext || config.appContext || vm.appContext;
      render(vm, container);
      return vm;
    }
    confirmDialogInstance = render$1(currentConfig);
    destroyFns.push(close2);
    return {
      destroy: close2,
      update
    };
  };
  function withWarn(props) {
    return _extends(_extends({}, props), {
      type: "warning"
    });
  }
  function withInfo(props) {
    return _extends(_extends({}, props), {
      type: "info"
    });
  }
  function withSuccess(props) {
    return _extends(_extends({}, props), {
      type: "success"
    });
  }
  function withError(props) {
    return _extends(_extends({}, props), {
      type: "error"
    });
  }
  function withConfirm(props) {
    return _extends(_extends({}, props), {
      type: "confirm"
    });
  }
  const comfirmFuncProps = () => ({
    config: Object,
    afterClose: Function,
    destroyAction: Function,
    open: Boolean
  });
  const HookModal = /* @__PURE__ */ defineComponent({
    name: "HookModal",
    inheritAttrs: false,
    props: initDefaultProps(comfirmFuncProps(), {
      config: {
        width: 520,
        okType: "primary"
      }
    }),
    setup(props, _ref) {
      let {
        expose
      } = _ref;
      var _a;
      const open2 = computed(() => props.open);
      const innerConfig = computed(() => props.config);
      const {
        direction,
        getPrefixCls
      } = useConfigContextInject();
      const prefixCls = getPrefixCls("modal");
      const rootPrefixCls = getPrefixCls();
      const afterClose = () => {
        var _a2, _b;
        props === null || props === void 0 ? void 0 : props.afterClose();
        (_b = (_a2 = innerConfig.value).afterClose) === null || _b === void 0 ? void 0 : _b.call(_a2);
      };
      const close2 = function() {
        props.destroyAction(...arguments);
      };
      expose({
        destroy: close2
      });
      const mergedOkCancel = (_a = innerConfig.value.okCancel) !== null && _a !== void 0 ? _a : innerConfig.value.type === "confirm";
      const [contextLocale] = useLocaleReceiver("Modal", localeValues.Modal);
      return () => createVNode(ConfirmDialog, _objectSpread2(_objectSpread2({
        "prefixCls": prefixCls,
        "rootPrefixCls": rootPrefixCls
      }, innerConfig.value), {}, {
        "close": close2,
        "open": open2.value,
        "afterClose": afterClose,
        "okText": innerConfig.value.okText || (mergedOkCancel ? contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.value.okText : contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.value.justOkText),
        "direction": innerConfig.value.direction || direction.value,
        "cancelText": innerConfig.value.cancelText || (contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.value.cancelText)
      }), null);
    }
  });
  let uuid = 0;
  const ElementsHolder = /* @__PURE__ */ defineComponent({
    name: "ElementsHolder",
    inheritAttrs: false,
    setup(_2, _ref) {
      let {
        expose
      } = _ref;
      const modals = /* @__PURE__ */ shallowRef([]);
      const addModal = (modal) => {
        modals.value.push(modal);
        modals.value = modals.value.slice();
        return () => {
          modals.value = modals.value.filter((currentModal) => currentModal !== modal);
        };
      };
      expose({
        addModal
      });
      return () => {
        return modals.value.map((modal) => modal());
      };
    }
  });
  function useModal() {
    const holderRef = /* @__PURE__ */ shallowRef(null);
    const actionQueue = /* @__PURE__ */ shallowRef([]);
    watch(actionQueue, () => {
      if (actionQueue.value.length) {
        const cloneQueue = [...actionQueue.value];
        cloneQueue.forEach((action) => {
          action();
        });
        actionQueue.value = [];
      }
    }, {
      immediate: true
    });
    const getConfirmFunc = (withFunc) => function hookConfirm(config) {
      var _a;
      uuid += 1;
      const open2 = /* @__PURE__ */ shallowRef(true);
      const modalRef = /* @__PURE__ */ shallowRef(null);
      const configRef = /* @__PURE__ */ shallowRef(unref(config));
      const updateConfig = /* @__PURE__ */ shallowRef({});
      watch(() => config, (val) => {
        updateAction(_extends(_extends({}, /* @__PURE__ */ isRef(val) ? val.value : val), updateConfig.value));
      });
      const destroyAction = function() {
        open2.value = false;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        const triggerCancel = args.some((param) => param && param.triggerCancel);
        if (configRef.value.onCancel && triggerCancel) {
          configRef.value.onCancel(() => {
          }, ...args.slice(1));
        }
      };
      let closeFunc;
      const modal = () => createVNode(HookModal, {
        "key": `modal-${uuid}`,
        "config": withFunc(configRef.value),
        "ref": modalRef,
        "open": open2.value,
        "destroyAction": destroyAction,
        "afterClose": () => {
          closeFunc === null || closeFunc === void 0 ? void 0 : closeFunc();
        }
      }, null);
      closeFunc = (_a = holderRef.value) === null || _a === void 0 ? void 0 : _a.addModal(modal);
      if (closeFunc) {
        destroyFns.push(closeFunc);
      }
      const updateAction = (newConfig) => {
        configRef.value = _extends(_extends({}, configRef.value), newConfig);
      };
      const destroy = () => {
        if (modalRef.value) {
          destroyAction();
        } else {
          actionQueue.value = [...actionQueue.value, destroyAction];
        }
      };
      const update = (newConfig) => {
        updateConfig.value = newConfig;
        if (modalRef.value) {
          updateAction(newConfig);
        } else {
          actionQueue.value = [...actionQueue.value, () => updateAction(newConfig)];
        }
      };
      return {
        destroy,
        update
      };
    };
    const fns = computed(() => ({
      info: getConfirmFunc(withInfo),
      success: getConfirmFunc(withSuccess),
      error: getConfirmFunc(withError),
      warning: getConfirmFunc(withWarn),
      confirm: getConfirmFunc(withConfirm)
    }));
    const holderKey = Symbol("modalHolderKey");
    return [fns.value, () => createVNode(ElementsHolder, {
      "key": holderKey,
      "ref": holderRef
    }, null)];
  }
  function modalWarn(props) {
    return confirm(withWarn(props));
  }
  Modal.useModal = useModal;
  Modal.info = function infoFn(props) {
    return confirm(withInfo(props));
  };
  Modal.success = function successFn(props) {
    return confirm(withSuccess(props));
  };
  Modal.error = function errorFn(props) {
    return confirm(withError(props));
  };
  Modal.warning = modalWarn;
  Modal.warn = modalWarn;
  Modal.confirm = function confirmFn(props) {
    return confirm(withConfirm(props));
  };
  Modal.destroyAll = function destroyAllFn() {
    while (destroyFns.length) {
      const close2 = destroyFns.pop();
      if (close2) {
        close2();
      }
    }
  };
  Modal.install = function(app) {
    app.component(Modal.name, Modal);
    return app;
  };
  const spaceSize = {
    small: 8,
    middle: 16,
    large: 24
  };
  const spaceProps = () => ({
    prefixCls: String,
    size: {
      type: [String, Number, Array]
    },
    direction: PropTypes.oneOf(tuple("horizontal", "vertical")).def("horizontal"),
    align: PropTypes.oneOf(tuple("start", "end", "center", "baseline")),
    wrap: booleanType()
  });
  function getNumberSize(size) {
    return typeof size === "string" ? spaceSize[size] : size || 0;
  }
  const Space = /* @__PURE__ */ defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "ASpace",
    inheritAttrs: false,
    props: spaceProps(),
    slots: Object,
    setup(props, _ref) {
      let {
        slots,
        attrs
      } = _ref;
      const {
        prefixCls,
        space,
        direction: directionConfig
      } = useConfigInject("space", props);
      const [wrapSSR, hashId] = useStyle$8(prefixCls);
      const supportFlexGap = useFlexGapSupport();
      const size = computed(() => {
        var _a, _b, _c;
        return (_c = (_a = props.size) !== null && _a !== void 0 ? _a : (_b = space === null || space === void 0 ? void 0 : space.value) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : "small";
      });
      const horizontalSize = /* @__PURE__ */ ref();
      const verticalSize = /* @__PURE__ */ ref();
      watch(size, () => {
        [horizontalSize.value, verticalSize.value] = (Array.isArray(size.value) ? size.value : [size.value, size.value]).map((item) => getNumberSize(item));
      }, {
        immediate: true
      });
      const mergedAlign = computed(() => props.align === void 0 && props.direction === "horizontal" ? "center" : props.align);
      const cn = computed(() => {
        return classNames(prefixCls.value, hashId.value, `${prefixCls.value}-${props.direction}`, {
          [`${prefixCls.value}-rtl`]: directionConfig.value === "rtl",
          [`${prefixCls.value}-align-${mergedAlign.value}`]: mergedAlign.value
        });
      });
      const marginDirection = computed(() => directionConfig.value === "rtl" ? "marginLeft" : "marginRight");
      const style = computed(() => {
        const gapStyle = {};
        if (supportFlexGap.value) {
          gapStyle.columnGap = `${horizontalSize.value}px`;
          gapStyle.rowGap = `${verticalSize.value}px`;
        }
        return _extends(_extends({}, gapStyle), props.wrap && {
          flexWrap: "wrap",
          marginBottom: `${-verticalSize.value}px`
        });
      });
      return () => {
        var _a, _b;
        const {
          wrap,
          direction = "horizontal"
        } = props;
        const children = (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
        const items = filterEmpty(children);
        const len = items.length;
        if (len === 0) {
          return null;
        }
        const split = (_b = slots.split) === null || _b === void 0 ? void 0 : _b.call(slots);
        const itemClassName = `${prefixCls.value}-item`;
        const horizontalSizeVal = horizontalSize.value;
        const latestIndex = len - 1;
        return createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
          "class": [cn.value, attrs.class],
          "style": [style.value, attrs.style]
        }), [items.map((child, index) => {
          let originIndex = children.indexOf(child);
          if (originIndex === -1) {
            originIndex = `$$space-${index}`;
          }
          let itemStyle = {};
          if (!supportFlexGap.value) {
            if (direction === "vertical") {
              if (index < latestIndex) {
                itemStyle = {
                  marginBottom: `${horizontalSizeVal / (split ? 2 : 1)}px`
                };
              }
            } else {
              itemStyle = _extends(_extends({}, index < latestIndex && {
                [marginDirection.value]: `${horizontalSizeVal / (split ? 2 : 1)}px`
              }), wrap && {
                paddingBottom: `${verticalSize.value}px`
              });
            }
          }
          return wrapSSR(createVNode(Fragment, {
            "key": originIndex
          }, [createVNode("div", {
            "class": itemClassName,
            "style": itemStyle
          }, [child]), index < latestIndex && split && createVNode("span", {
            "class": `${itemClassName}-split`,
            "style": itemStyle
          }, [split])]));
        })]);
      };
    }
  });
  Space.Compact = Compact;
  Space.install = function(app) {
    app.component(Space.name, Space);
    app.component(Compact.name, Compact);
    return app;
  };
  const Scrollbar = useScrollbar();
  const ReplyDialogVue = /* @__PURE__ */ defineComponent({
    name: "ReplyModal",
    props: {
      /**
       * 帖子id
       */
      tid: {
        type: String,
        required: true
      },
      /**
       * 回复id
       */
      pid: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const open2 = /* @__PURE__ */ ref(true);
      const loading = /* @__PURE__ */ ref(true);
      const modalRef = /* @__PURE__ */ ref(null);
      const CurrentReply = /* @__PURE__ */ ref();
      const ReplyList = /* @__PURE__ */ ref([]);
      function onClose() {
        open2.value = false;
        Scrollbar.unBind();
      }
      function afterClose() {
        close(props.pid);
      }
      onMounted(() => {
        console.log(modalRef.value);
        if (modalRef.value) {
          const el = modalRef.value;
          Scrollbar.bind(el);
        }
        loading.value = true;
        Api.getCheckReply(props.tid, props.pid).then((res) => {
          loading.value = false;
          const {
            post_info,
            list
          } = res.data.result;
          console.log(post_info, list);
          CurrentReply.value = post_info;
          ReplyList.value.push(...list);
        });
      });
      return () => createVNode(Modal, {
        "zIndex": DialogProps.value.length + 1e3,
        "width": 800,
        "wrapClassName": "reply-dialog",
        "open": open2.value,
        "mask": false,
        "maskClosable": false,
        "footer": null,
        "closable": false,
        "keyboard": true,
        "onCancel": onClose,
        "afterClose": afterClose,
        "destroyOnClose": true,
        "style": {
          left: "calc(50% - 400px)"
        }
      }, {
        default: () => [createVNode("div", {
          "class": "reply-dialog-body",
          "ref": modalRef
        }, [loading.value ? createVNode("div", {
          "class": "is-loading"
        }, [createVNode(Spin, {
          "tip": "正在获取回复列表..."
        }, null)]) : createVNode("div", null, [createVNode(ReplyItem, {
          "isAuthor": true,
          "tid": props.tid,
          "reply": CurrentReply.value
        }, null), createVNode(Divider$1, null, null), ReplyList.value.map((reply) => createVNode(ReplyItem, {
          "tid": props.tid,
          "reply": reply
        }, null))])]), createVNode("div", {
          "class": "reply-dialog-footer"
        }, [createVNode(Space, null, {
          default: () => [more1.value ? createVNode(Button, {
            "type": "link",
            "onClick": closeAll
          }, {
            default: () => [createTextVNode("关闭全部")]
          }) : null, createVNode(Button, {
            "type": "primary",
            "shape": "round",
            "onClick": onClose,
            "style": "width:128px;"
          }, {
            default: () => [createTextVNode("关闭 (Esc)")]
          })]
        })])]
      });
    }
  });
  const _sfc_main = /* @__PURE__ */ defineComponent({
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      const lightThreadList = /* @__PURE__ */ ref([]);
      const generateButtons = (tid) => {
        const $lightContainer = document.querySelector(".wrapper-container");
        if (!$lightContainer) return;
        const replyWrappers = $lightContainer.querySelectorAll(".post-reply-list-wrapper");
        replyWrappers.forEach((el) => {
          const adminEl = el.querySelector(".bbs-admin-reply-post-container");
          if (!adminEl) return;
          let admininfo = null;
          const admininfoRaw = adminEl.getAttribute("data-admininfo");
          try {
            admininfo = admininfoRaw && JSON.parse(admininfoRaw);
          } catch (e2) {
            if (adminEl instanceof HTMLElement && (admininfoRaw === null || admininfoRaw === void 0)) {
              if (adminEl.dataset && adminEl.dataset.admininfo) {
                try {
                  admininfo = JSON.parse(adminEl.dataset.admininfo);
                } catch {
                }
              }
            }
          }
          if (typeof admininfo !== "object" || !(admininfo == null ? void 0 : admininfo.pid)) {
            if (adminEl.data && adminEl.data.admininfo) {
              admininfo = adminEl.data.admininfo;
            } else {
              return;
            }
          }
          const { pid } = admininfo;
          const reply = lightThreadList.value.find((t2) => t2.pid === pid);
          if (!reply) return;
          if (!reply.check_reply_info) return;
          const btnEl = document.createElement("div");
          btnEl.classList.add("todo-list", "todo-list-reply-dialog");
          const span = document.createElement("span");
          span.classList.add("todo-list-text", "bold");
          span.innerHTML = `弹框查看评论(${reply.check_reply_info.num})`;
          btnEl.append(span);
          btnEl.addEventListener("click", () => {
            open(tid, pid);
          });
          const operateEl = el.querySelector(".post-reply-list-operate");
          if (operateEl) {
            operateEl.appendChild(btnEl);
          }
        });
      };
      onMounted(async () => {
        const tidMatch = location.pathname.match(/(\d)+/);
        const tid = tidMatch ? tidMatch[0] : "";
        if (!tid) return;
        Api.getsThreadLightReplyList(tid).then((res) => {
          lightThreadList.value.push(...res.data.data.list);
          generateButtons(tid);
        });
      });
      const __returned__ = { lightThreadList, generateButtons, get ReplyDialogVue() {
        return ReplyDialogVue;
      }, get DialogProps() {
        return DialogProps;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  content;
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key2, val] of props) {
      target[key2] = val;
    }
    return target;
  };
  const _hoisted_1 = { class: "reply-dialog-list" };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("div", _hoisted_1, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.DialogProps, (r2) => {
          return openBlock(), createBlock($setup["ReplyDialogVue"], {
            key: r2.pid,
            tid: r2.tid,
            pid: r2.pid
          }, null, 8, ["tid", "pid"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/0-github/hupu-bbs-ex/entrypoints/content/App.vue"]]);
  const definition = defineContentScript({
    matches: ["*://bbs.hupu.com/*"],
    main() {
      window.addEventListener("load", () => {
        const el = document.createElement("div");
        el.setAttribute("id", "hupu-bbs-ex");
        document.body.appendChild(el);
        const app = createApp({
          render: () => h$1(App)
        });
        app.mount(el);
      });
    }
  });
  content;
  var browserPolyfill$1 = { exports: {} };
  var browserPolyfill = browserPolyfill$1.exports;
  var hasRequiredBrowserPolyfill;
  function requireBrowserPolyfill() {
    if (hasRequiredBrowserPolyfill) return browserPolyfill$1.exports;
    hasRequiredBrowserPolyfill = 1;
    (function(module2, exports$1) {
      (function(global2, factory) {
        {
          factory(module2);
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : browserPolyfill, function(module3) {
        if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key2) {
                if (!this.has(key2)) {
                  this.set(key2, this.createItem(key2));
                }
                return super.get(key2);
              }
            }
            const isThenable2 = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method, wrapper) => {
              return new Proxy(method, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty2 = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers2 = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty2(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty2(wrappers, prop) || hasOwnProperty2(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty2(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers2);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(req, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            });
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result2;
                try {
                  result2 = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result2 = Promise.reject(err);
                }
                const isResultThenable = result2 !== true && isThenable2(result2);
                if (result2 !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result2);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module3.exports = wrapAPIs(chrome);
        } else {
          module3.exports = globalThis.browser;
        }
      });
    })(browserPolyfill$1);
    return browserPolyfill$1.exports;
  }
  var browserPolyfillExports = requireBrowserPolyfill();
  const originalBrowser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
  const browser = originalBrowser;
  function print$1(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger$1 = {
    debug: (...args) => print$1(console.debug, ...args),
    log: (...args) => print$1(console.log, ...args),
    warn: (...args) => print$1(console.warn, ...args),
    error: (...args) => print$1(console.error, ...args)
  };
  const _WxtLocationChangeEvent = class _WxtLocationChangeEvent extends Event {
    constructor(newUrl, oldUrl) {
      super(_WxtLocationChangeEvent.EVENT_NAME, {});
      this.newUrl = newUrl;
      this.oldUrl = oldUrl;
    }
  };
  __publicField(_WxtLocationChangeEvent, "EVENT_NAME", getUniqueEventName("wxt:locationchange"));
  let WxtLocationChangeEvent = _WxtLocationChangeEvent;
  function getUniqueEventName(eventName) {
    var _a;
    return `${(_a = browser == null ? void 0 : browser.runtime) == null ? void 0 : _a.id}:${"content"}:${eventName}`;
  }
  function createLocationWatcher(ctx) {
    let interval;
    let oldUrl;
    return {
      /**
       * Ensure the location watcher is actively looking for URL changes. If it's already watching,
       * this is a noop.
       */
      run() {
        if (interval != null) return;
        oldUrl = new URL(location.href);
        interval = ctx.setInterval(() => {
          let newUrl = new URL(location.href);
          if (newUrl.href !== oldUrl.href) {
            window.dispatchEvent(new WxtLocationChangeEvent(newUrl, oldUrl));
            oldUrl = newUrl;
          }
        }, 1e3);
      }
    };
  }
  const _ContentScriptContext = class _ContentScriptContext {
    constructor(contentScriptName, options) {
      __publicField(this, "isTopFrame", window.self === window.top);
      __publicField(this, "abortController");
      __publicField(this, "locationWatcher", createLocationWatcher(this));
      this.contentScriptName = contentScriptName;
      this.options = options;
      this.abortController = new AbortController();
      if (this.isTopFrame) {
        this.listenForNewerScripts({ ignoreFirstEvent: true });
        this.stopOldScripts();
      } else {
        this.listenForNewerScripts();
      }
    }
    get signal() {
      return this.abortController.signal;
    }
    abort(reason) {
      return this.abortController.abort(reason);
    }
    get isInvalid() {
      if (browser.runtime.id == null) {
        this.notifyInvalidated();
      }
      return this.signal.aborted;
    }
    get isValid() {
      return !this.isInvalid;
    }
    /**
     * Add a listener that is called when the content script's context is invalidated.
     *
     * @returns A function to remove the listener.
     *
     * @example
     * browser.runtime.onMessage.addListener(cb);
     * const removeInvalidatedListener = ctx.onInvalidated(() => {
     *   browser.runtime.onMessage.removeListener(cb);
     * })
     * // ...
     * removeInvalidatedListener();
     */
    onInvalidated(cb) {
      this.signal.addEventListener("abort", cb);
      return () => this.signal.removeEventListener("abort", cb);
    }
    /**
     * Return a promise that never resolves. Useful if you have an async function that shouldn't run
     * after the context is expired.
     *
     * @example
     * const getValueFromStorage = async () => {
     *   if (ctx.isInvalid) return ctx.block();
     *
     *   // ...
     * }
     */
    block() {
      return new Promise(() => {
      });
    }
    /**
     * Wrapper around `window.setInterval` that automatically clears the interval when invalidated.
     */
    setInterval(handler, timeout) {
      const id = setInterval(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearInterval(id));
      return id;
    }
    /**
     * Wrapper around `window.setTimeout` that automatically clears the interval when invalidated.
     */
    setTimeout(handler, timeout) {
      const id = setTimeout(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearTimeout(id));
      return id;
    }
    /**
     * Wrapper around `window.requestAnimationFrame` that automatically cancels the request when
     * invalidated.
     */
    requestAnimationFrame(callback) {
      const id = requestAnimationFrame((...args) => {
        if (this.isValid) callback(...args);
      });
      this.onInvalidated(() => cancelAnimationFrame(id));
      return id;
    }
    /**
     * Wrapper around `window.requestIdleCallback` that automatically cancels the request when
     * invalidated.
     */
    requestIdleCallback(callback, options) {
      const id = requestIdleCallback((...args) => {
        if (!this.signal.aborted) callback(...args);
      }, options);
      this.onInvalidated(() => cancelIdleCallback(id));
      return id;
    }
    addEventListener(target, type, handler, options) {
      var _a;
      if (type === "wxt:locationchange") {
        if (this.isValid) this.locationWatcher.run();
      }
      (_a = target.addEventListener) == null ? void 0 : _a.call(
        target,
        type.startsWith("wxt:") ? getUniqueEventName(type) : type,
        handler,
        {
          ...options,
          signal: this.signal
        }
      );
    }
    /**
     * @internal
     * Abort the abort controller and execute all `onInvalidated` listeners.
     */
    notifyInvalidated() {
      this.abort("Content script context invalidated");
      logger$1.debug(
        `Content script "${this.contentScriptName}" context invalidated`
      );
    }
    stopOldScripts() {
      window.postMessage(
        {
          type: _ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE,
          contentScriptName: this.contentScriptName
        },
        "*"
      );
    }
    listenForNewerScripts(options) {
      let isFirst = true;
      const cb = (event) => {
        var _a, _b;
        if (((_a = event.data) == null ? void 0 : _a.type) === _ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE && ((_b = event.data) == null ? void 0 : _b.contentScriptName) === this.contentScriptName) {
          const wasFirst = isFirst;
          isFirst = false;
          if (wasFirst && (options == null ? void 0 : options.ignoreFirstEvent)) return;
          this.notifyInvalidated();
        }
      };
      addEventListener("message", cb);
      this.onInvalidated(() => removeEventListener("message", cb));
    }
  };
  __publicField(_ContentScriptContext, "SCRIPT_STARTED_MESSAGE_TYPE", getUniqueEventName(
    "wxt:content-script-started"
  ));
  let ContentScriptContext = _ContentScriptContext;
  const nullKey = Symbol("null");
  let keyCounter = 0;
  class ManyKeysMap extends Map {
    constructor() {
      super();
      this._objectHashes = /* @__PURE__ */ new WeakMap();
      this._symbolHashes = /* @__PURE__ */ new Map();
      this._publicKeys = /* @__PURE__ */ new Map();
      const [pairs] = arguments;
      if (pairs === null || pairs === void 0) {
        return;
      }
      if (typeof pairs[Symbol.iterator] !== "function") {
        throw new TypeError(typeof pairs + " is not iterable (cannot read property Symbol(Symbol.iterator))");
      }
      for (const [keys, value] of pairs) {
        this.set(keys, value);
      }
    }
    _getPublicKeys(keys, create = false) {
      if (!Array.isArray(keys)) {
        throw new TypeError("The keys parameter must be an array");
      }
      const privateKey = this._getPrivateKey(keys, create);
      let publicKey;
      if (privateKey && this._publicKeys.has(privateKey)) {
        publicKey = this._publicKeys.get(privateKey);
      } else if (create) {
        publicKey = [...keys];
        this._publicKeys.set(privateKey, publicKey);
      }
      return { privateKey, publicKey };
    }
    _getPrivateKey(keys, create = false) {
      const privateKeys = [];
      for (let key2 of keys) {
        if (key2 === null) {
          key2 = nullKey;
        }
        const hashes = typeof key2 === "object" || typeof key2 === "function" ? "_objectHashes" : typeof key2 === "symbol" ? "_symbolHashes" : false;
        if (!hashes) {
          privateKeys.push(key2);
        } else if (this[hashes].has(key2)) {
          privateKeys.push(this[hashes].get(key2));
        } else if (create) {
          const privateKey = `@@mkm-ref-${keyCounter++}@@`;
          this[hashes].set(key2, privateKey);
          privateKeys.push(privateKey);
        } else {
          return false;
        }
      }
      return JSON.stringify(privateKeys);
    }
    set(keys, value) {
      const { publicKey } = this._getPublicKeys(keys, true);
      return super.set(publicKey, value);
    }
    get(keys) {
      const { publicKey } = this._getPublicKeys(keys);
      return super.get(publicKey);
    }
    has(keys) {
      const { publicKey } = this._getPublicKeys(keys);
      return super.has(publicKey);
    }
    delete(keys) {
      const { publicKey, privateKey } = this._getPublicKeys(keys);
      return Boolean(publicKey && super.delete(publicKey) && this._publicKeys.delete(privateKey));
    }
    clear() {
      super.clear();
      this._symbolHashes.clear();
      this._publicKeys.clear();
    }
    get [Symbol.toStringTag]() {
      return "ManyKeysMap";
    }
    get size() {
      return super.size;
    }
  }
  new ManyKeysMap();
  function initPlugins() {
  }
  function print(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  const result = (async () => {
    try {
      initPlugins();
      const { main, ...options } = definition;
      const ctx = new ContentScriptContext("content", options);
      return await main(ctx);
    } catch (err) {
      logger.error(
        `The content script "${"content"}" crashed on startup!`,
        err
      );
      throw err;
    }
  })();
  return result;
}();
content;
