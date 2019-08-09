window.spb = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return {}.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var n, l, preact_module_u, preact_module_t, preact_module_r = {}, f = [], o = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
    function e(n, l) {
        for (var u in l) n[u] = l[u];
        return n;
    }
    function c(n) {
        var l = n.parentNode;
        l && l.removeChild(n);
    }
    function s(n, l, u) {
        var t, i, r, f, o = arguments;
        if (l = e({}, l), arguments.length > 3) for (u = [ u ], t = 3; t < arguments.length; t++) u.push(o[t]);
        if (null != u && (l.children = u), null != n && null != n.defaultProps) for (i in n.defaultProps) void 0 === l[i] && (l[i] = n.defaultProps[i]);
        return f = l.key, null != (r = l.ref) && delete l.ref, null != f && delete l.key, 
        a(n, l, f, r);
    }
    function a(l, u, t, i) {
        var r = {
            type: l,
            props: u,
            key: t,
            ref: i,
            __k: null,
            __p: null,
            __b: 0,
            __e: null,
            l: null,
            __c: null,
            constructor: void 0
        };
        return n.vnode && n.vnode(r), r;
    }
    function v(n) {
        return n.children;
    }
    function p(n) {
        if (null == n || "boolean" == typeof n) return null;
        if ("string" == typeof n || "number" == typeof n) return a(null, n, null, null);
        if (null != n.__e || null != n.__c) {
            var l = a(n.type, n.props, n.key, null);
            return l.__e = n.__e, l;
        }
        return n;
    }
    function y(n, l) {
        this.props = n, this.context = l;
    }
    function d(n, l) {
        if (null == l) return n.__p ? d(n.__p, n.__p.__k.indexOf(n) + 1) : null;
        for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
        return "function" == typeof n.type ? d(n) : null;
    }
    function w(t) {
        !t.__d && (t.__d = !0) && 1 === l.push(t) && (n.debounceRendering || preact_module_u)(g);
    }
    function g() {
        var n;
        for (l.sort(function(n, l) {
            return l.__v.__b - n.__v.__b;
        }); n = l.pop(); ) n.__d && n.forceUpdate(!1);
    }
    function k(n, l, u, t, i, o, e, s, a) {
        var h, v, y, m, w, g, k, b, x = l.__k || _(l.props.children, l.__k = [], p, !0), C = u && u.__k || f, P = C.length;
        for (s == preact_module_r && (s = null != o ? o[0] : P ? d(u, 0) : null), v = 0; v < x.length; v++) if (null != (h = x[v] = p(x[v]))) {
            if (h.__p = l, h.__b = l.__b + 1, null === (m = C[v]) || m && h.key == m.key && h.type === m.type) C[v] = void 0; else for (y = 0; y < P; y++) {
                if ((m = C[y]) && h.key == m.key && h.type === m.type) {
                    C[y] = void 0;
                    break;
                }
                m = null;
            }
            if (w = N(n, h, m = m || preact_module_r, t, i, o, e, null, s, a), (y = h.ref) && m.ref != y && (b || (b = [])).push(y, h.__c || w, h), 
            null != w) {
                if (null == k && (k = w), null != h.l) w = h.l, h.l = null; else if (o == m || w != s || null == w.parentNode) n: if (null == s || s.parentNode !== n) n.appendChild(w); else {
                    for (g = s, y = 0; (g = g.nextSibling) && y < P; y += 2) if (g == w) break n;
                    n.insertBefore(w, s);
                }
                s = w.nextSibling, "function" == typeof l.type && (l.l = w);
            }
        }
        if (l.__e = k, null != o && "function" != typeof l.type) for (v = o.length; v--; ) null != o[v] && c(o[v]);
        for (v = P; v--; ) null != C[v] && z(C[v], C[v]);
        if (b) for (v = 0; v < b.length; v++) j(b[v], b[++v], b[++v]);
    }
    function _(n, l, u, t) {
        if (null == l && (l = []), null == n || "boolean" == typeof n) t && l.push(null); else if (Array.isArray(n)) for (var i = 0; i < n.length; i++) _(n[i], l, u, t); else l.push(u ? u(n) : n);
        return l;
    }
    function x(n, l, u) {
        "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === o.test(l) ? u + "px" : u;
    }
    function C(n, l, u, t, i) {
        var r, f, o, e, c;
        if ("key" === (l = i ? "className" === l ? "class" : l : "class" === l ? "className" : l) || "children" === l) ; else if ("style" === l) if (r = n.style, 
        "string" == typeof u) r.cssText = u; else {
            if ("string" == typeof t && (r.cssText = "", t = null), t) for (f in t) u && f in u || x(r, f, "");
            if (u) for (o in u) t && u[o] === t[o] || x(r, o, u[o]);
        } else if ("o" === l[0] && "n" === l[1]) e = l !== (l = l.replace(/Capture$/, "")), 
        c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (t || n.addEventListener(l, P, e), 
        (n.u || (n.u = {}))[l] = u) : n.removeEventListener(l, P, e); else if ("list" !== l && "tagName" !== l && !i && l in n) if (n.length && "value" == l) for (l = n.length; l--; ) n.options[l].selected = n.options[l].value == u; else n[l] = null == u ? "" : u; else "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
    }
    function P(l) {
        return this.u[l.type](n.event ? n.event(l) : l);
    }
    function N(l, u, t, i, r, f, o, c, s, a) {
        var h, d, m, w, g, b, x, C, P, N, T = u.type;
        if (void 0 !== u.constructor) return null;
        (h = n.__b) && h(u);
        try {
            n: if ("function" == typeof T) {
                if (C = u.props, P = (h = T.contextType) && i[h.__c], N = h ? P ? P.props.value : h.__p : i, 
                t.__c ? x = (d = u.__c = t.__c).__p = d.__E : (T.prototype && T.prototype.render ? u.__c = d = new T(C, N) : (u.__c = d = new y(C, N), 
                d.constructor = T, d.render = A), P && P.sub(d), d.props = C, d.state || (d.state = {}), 
                d.context = N, d.__n = i, m = d.__d = !0, d.__h = []), null == d.__s && (d.__s = d.state), 
                null != T.getDerivedStateFromProps && e(d.__s == d.state ? d.__s = e({}, d.__s) : d.__s, T.getDerivedStateFromProps(C, d.__s)), 
                m) null == T.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(), 
                null != d.componentDidMount && o.push(d); else {
                    if (null == T.getDerivedStateFromProps && null == c && null != d.componentWillReceiveProps && d.componentWillReceiveProps(C, N), 
                    !c && null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(C, d.__s, N)) {
                        d.props = C, d.state = d.__s, d.__d = !1, d.__v = u, u.__e = t.__e, u.__k = t.__k;
                        break n;
                    }
                    null != d.componentWillUpdate && d.componentWillUpdate(C, d.__s, N);
                }
                for (w = d.props, g = d.state, d.context = N, d.props = C, d.state = d.__s, (h = n.__r) && h(u), 
                d.__d = !1, d.__v = u, d.__P = l, _(null != (h = d.render(d.props, d.state, d.context)) && h.type == v && null == h.key ? h.props.children : h, u.__k = [], p, !0), 
                null != d.getChildContext && (i = e(e({}, i), d.getChildContext())), m || null == d.getSnapshotBeforeUpdate || (b = d.getSnapshotBeforeUpdate(w, g)), 
                k(l, u, t, i, r, f, o, s, a), d.base = u.__e; h = d.__h.pop(); ) h.call(d);
                m || null == w || null == d.componentDidUpdate || d.componentDidUpdate(w, g, b), 
                x && (d.__E = d.__p = null);
            } else u.__e = $(t.__e, u, t, i, r, f, o, a);
            (h = n.diffed) && h(u);
        } catch (l) {
            n.__e(l, u, t);
        }
        return u.__e;
    }
    function T(l, u) {
        for (var t; t = l.pop(); ) try {
            t.componentDidMount();
        } catch (l) {
            n.__e(l, t.__v);
        }
        n.__c && n.__c(u);
    }
    function $(n, l, u, t, i, o, e, c) {
        var s, a, h, v, p = u.props, y = l.props;
        if (i = "svg" === l.type || i, null == n && null != o) for (s = 0; s < o.length; s++) if (null != (a = o[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
            n = a, o[s] = null;
            break;
        }
        if (null == n) {
            if (null === l.type) return document.createTextNode(y);
            n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), 
            o = null;
        }
        return null === l.type ? p !== y && (n.data = y) : l !== u && (null != o && (o = f.slice.call(n.childNodes)), 
        h = (p = u.props || preact_module_r).dangerouslySetInnerHTML, v = y.dangerouslySetInnerHTML, 
        c || (v || h) && (v && h && v.__html == h.__html || (n.innerHTML = v && v.__html || "")), 
        function(n, l, u, t, i) {
            var r;
            for (r in u) r in l || C(n, r, null, u[r], t);
            for (r in l) i && "function" != typeof l[r] || "value" === r || "checked" === r || u[r] === l[r] || C(n, r, l[r], u[r], t);
        }(n, y, p, i, c), v || k(n, l, u, t, "foreignObject" !== l.type && i, o, e, preact_module_r, c), 
        c || ("value" in y && void 0 !== y.value && y.value !== n.value && (n.value = null == y.value ? "" : y.value), 
        "checked" in y && void 0 !== y.checked && y.checked !== n.checked && (n.checked = y.checked))), 
        n;
    }
    function j(l, u, t) {
        try {
            "function" == typeof l ? l(u) : l.current = u;
        } catch (l) {
            n.__e(l, t);
        }
    }
    function z(l, u, t) {
        var i, r, f;
        if (n.unmount && n.unmount(l), (i = l.ref) && j(i, null, u), t || "function" == typeof l.type || (t = null != (r = l.__e)), 
        l.__e = l.l = null, null != (i = l.__c)) {
            if (i.componentWillUnmount) try {
                i.componentWillUnmount();
            } catch (l) {
                n.__e(l, u);
            }
            i.base = i.__P = null;
        }
        if (i = l.__k) for (f = 0; f < i.length; f++) i[f] && z(i[f], u, t);
        null != r && c(r);
    }
    function A(n, l, u) {
        return this.constructor(n, u);
    }
    function Menu(_ref) {
        var choices = _ref.choices, onChoose = _ref.onChoose, _onBlur = _ref.onBlur;
        return s(v, null, s("style", {
            nonce: _ref.cspNonce
        }, "\n                    .menu {\n                        width: 100%;\n                        z-index: 5000;\n                        background: rgba(255, 255, 255, 0.97);\n                        border-radius: 3px;\n                        font-family: Helvetica, sans-serif;\n                        font-size: 14px;\n                        letter-spacing: 0.5px;\n                        box-shadow: 0px 0px 3px 1px rgba(222,222,222,1);\n                        outline-style: none;\n                        user-select: none;\n                    }\n                    \n                    .menu-item {\n                        border-top: 2px solid rgba(230, 230, 230, 0.5);;\n                        padding: 14px 18px;\n                        color: #0070ba;\n                        cursor: pointer;\n                    }\n                    \n                    .menu-item:first-child {\n                        border-top: none;\n                    }\n                    \n                    .menu-item:hover {\n                        background: #fcfcfc;\n                    }\n                "), s("div", {
            class: "menu",
            tabIndex: "0",
            onBlur: function() {
                return _onBlur();
            }
        }, choices.map(function(_ref2) {
            var id = _ref2.id;
            return s("div", {
                class: "menu-item",
                onClick: function() {
                    return onChoose({
                        id: id
                    });
                }
            }, _ref2.label);
        })));
    }
    n = {}, y.prototype.setState = function(n, l) {
        var u = this.__s !== this.state && this.__s || (this.__s = e({}, this.state));
        ("function" != typeof n || (n = n(u, this.props))) && e(u, n), null != n && this.__v && (l && this.__h.push(l), 
        w(this));
    }, y.prototype.forceUpdate = function(n) {
        var l, u, t, i = this.__v, r = this.__v.__e, f = this.__P;
        f && (l = !1 !== n, u = [], t = N(f, i, e({}, i), this.__n, void 0 !== f.ownerSVGElement, null, u, l, null == r ? d(i) : r), 
        T(u, i), t != r && function m(n) {
            var l, u;
            if (null != (n = n.__p) && null != n.__c) {
                for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
                    n.__e = n.__c.base = u.__e;
                    break;
                }
                return m(n);
            }
        }(i)), n && n();
    }, y.prototype.render = v, l = [], preact_module_u = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    n.__e = function(n, l, u) {
        for (var t; l = l.__p; ) if ((t = l.__c) && !t.__p) try {
            if (t.constructor && null != t.constructor.getDerivedStateFromError) t.setState(t.constructor.getDerivedStateFromError(n)); else {
                if (null == t.componentDidCatch) continue;
                t.componentDidCatch(n);
            }
            return w(t.__E = t);
        } catch (l) {
            n = l;
        }
        throw n;
    }, preact_module_t = preact_module_r, Object.create(Error.prototype);
    var hooks_module_t, hooks_module_r, hooks_module_u = [], hooks_module_i = n.__r;
    n.__r = function(n) {
        hooks_module_i && hooks_module_i(n), hooks_module_t = 0, (hooks_module_r = n.__c).__H && (hooks_module_r.__H.t = hooks_module_w(hooks_module_r.__H.t));
    };
    var hooks_module_o = n.diffed;
    n.diffed = function(n) {
        hooks_module_o && hooks_module_o(n);
        var t = n.__c;
        if (t) {
            var r = t.__H;
            r && (r.u = hooks_module_w(r.u));
        }
    };
    var hooks_module_f = n.unmount;
    function hooks_module_c(t) {
        n.__h && n.__h(hooks_module_r);
        var u = hooks_module_r.__H || (hooks_module_r.__H = {
            i: [],
            t: [],
            u: []
        });
        return t >= u.i.length && u.i.push({}), u.i[t];
    }
    n.unmount = function(n) {
        hooks_module_f && hooks_module_f(n);
        var t = n.__c;
        if (t) {
            var r = t.__H;
            r && r.i.forEach(function(n) {
                return n.p && n.p();
            });
        }
    };
    var hooks_module_ = function() {};
    function hooks_module_g() {
        hooks_module_u.some(function(n) {
            n.l = !1, n.__P && (n.__H.t = hooks_module_w(n.__H.t));
        }), hooks_module_u = [];
    }
    function hooks_module_w(n) {
        return n.forEach(hooks_module_A), n.forEach(E), [];
    }
    function hooks_module_A(n) {
        n.p && n.p();
    }
    function E(n) {
        var t = n.o();
        "function" == typeof t && (n.p = t);
    }
    function q(n, t) {
        return "function" == typeof t ? t(n) : t;
    }
    function Page(_ref) {
        var u, i, _useState, xprops, setXProps, cspNonce = _ref.cspNonce, _useXProps = (_useState = function(n, u, i) {
            var o = hooks_module_c(hooks_module_t++);
            return o.__c || (o.__c = hooks_module_r, o.o = [ q(null, u), function(t) {
                var r = n(o.o[0], t);
                o.o[0] !== r && (o.o[0] = r, o.__c.setState({}));
            } ]), o.o;
        }(q, window.xprops), xprops = _useState[0], setXProps = _useState[1], u = [], function(n, t) {
            return !n || u.some(function(t, r) {
                return t !== n[r];
            });
        }((i = hooks_module_c(hooks_module_t++)).v) && (i.o = function() {
            return xprops.onProps(setXProps);
        }, i.v = u, hooks_module_r.__H.t.push(i), hooks_module_(hooks_module_r)), xprops), choices = _useXProps.choices, onChoose = _useXProps.onChoose, onBlur = _useXProps.onBlur;
        return s(v, null, s("style", {
            nonce: cspNonce
        }, "\n                    * {\n                        box-sizing: border-box;\n                    }\n\n                    html, body {\n                        margin: 0;\n                        padding: 0;\n                    }\n\n                    body {\n                        padding: 5px;\n                        display: inline-block;\n                        width: 100%;\n                    }\n                "), s(Menu, {
            choices: choices,
            onChoose: onChoose,
            onBlur: onBlur,
            cspNonce: cspNonce
        }));
    }
    function setupMenu(_ref2) {
        !function(l, u, i) {
            var o, e, c;
            n.__p && n.__p(l, u), e = (o = i === preact_module_t) ? null : u.__k, l = s(v, null, [ l ]), 
            c = [], N(u, u.__k = l, e || preact_module_r, preact_module_r, void 0 !== u.ownerSVGElement, e ? null : f.slice.call(u.childNodes), c, !1, preact_module_r, o), 
            T(c, l);
        }(s(Page, {
            cspNonce: _ref2.cspNonce
        }), function() {
            var body = document.body;
            if (!body) throw new Error("Document body not found");
            return body;
        }());
    }
    "undefined" != typeof window && (hooks_module_ = function(t) {
        !t.l && (t.l = !0) && 1 === hooks_module_u.push(t) && (n.requestAnimationFrame || function(n) {
            var t = function() {
                clearTimeout(r), cancelAnimationFrame(u), setTimeout(n);
            }, r = setTimeout(t, 100), u = requestAnimationFrame(t);
        })(hooks_module_g);
    }), __webpack_require__.d(__webpack_exports__, "setupMenu", function() {
        return setupMenu;
    });
} ]);
//# sourceMappingURL=smart-menu.js.map